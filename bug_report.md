# Authentication Audit - RedKross Academy

## Executive Summary

This report identifies critical authentication and token handling issues across 5 files in the RedKross Academy codebase. The issues range from logic errors that prevent proper Firebase configuration checks to insecure fallback mechanisms that bypass authentication safeguards.

---

## 1. Firebase Client Configuration

**File**: `src/services/auth/firebase.js`

### Issue 1: Hardcoded Fallback Credentials (Lines 11-18)

The firebaseConfig object uses environment variable fallbacks that embed hardcoded credentials as defaults:

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCwsdhdLghtrcJ7NQMbayW1Yq2BCIO2TWQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "academy-redkross.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "academy-redkross",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "academy-redkross.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "245293774553",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:245293774553:web:ee3561dc5b970fe3a7f0c8",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-EC4TQ4M88B"
};
```

**Severity**: MEDIUM - These are not secret keys but configuration values; however, they embed the production project identifiers directly in source code.

### Issue 2: LOGIC ERROR - isFirebaseConfigured uses Same Hardcoded Value (Lines 25-28)

```javascript
export const isFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_API_KEY !== "AIzaSyCwsdhdLghtrcJ7NQmbayW1Yq2BCIO2TWQ"
);
```

**Root Cause**: The `isFirebaseConfigured` check on line 27 compares the environment variable against the EXACT SAME hardcoded fallback string that appears on line 11. This means:

- If `VITE_FIREBASE_API_KEY` is **not set** (undefined), the `&&` short-circuits to `false` — correct behavior
- If `VITE_FIREBASE_API_KEY` IS set to the fallback value `"AIzaSyCwsdhdLghtrcJ7NQmbayW1Yq2BCIO2TWQ"`, the inequality check `!== "AIzaSyCwsdhdLghtrcJ7NQmbayW1Yq2BCIO2TWQ"` evaluates to `false`, so `isFirebaseConfigured` becomes `false` — **BUG**
- If `VITE_FIREBASE_API_KEY` IS set to a **different valid key**, the inequality evaluates to `true`, so `isFirebaseConfigured` becomes `true` — correct

**The bug**: When the env var is set to the fallback value (likely in development without proper env config), `isFirebaseConfigured` incorrectly returns `false`, causing Firebase initialization to fail or be skipped.

**Evidence**: Lines 11 and 27 both contain the identical string `"AIzaSyCwsdhdLghtrcJ7NQmbayW1Yq2BCIO2TWQ"`.

**Severity**: HIGH - This prevents Firebase from initializing in development environments where the fallback is used, breaking all auth flows.

**Fix**: Remove the hardcoded comparison or use a different sentinel value. The proper fix is to check only for presence, not comparison against the fallback:

```javascript
export const isFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY
);
```

---

## 2. Auth Context Issues

**File**: `src/services/auth/authContext.jsx`

### Issue 3: devLoginAsCadet Creates Inconsistent State (Lines 193-211)

```javascript
const devLoginAsCadet = (cadetData = {}) => {
  const email = cadetData.email || 'student@redkross.org.in';
  const uid = cadetData.uid || cadetData.id || 'usr_student_01';
  // ...
  localStorage.setItem('redkross_academy_auth_token', 'mock_dev_cadet_token_' + Date.now());
  // ...
};
```

**Finding**: The auth_token stored in localStorage is a mock string `'mock_dev_cadet_token_' + Date.now()`, but the `getAuthHeader()` in apiClient.js (lines 12-29) checks for `localStorage.getItem('redkross_academy_auth_token')` and uses it as a Bearer token. This mock token will never match any valid server auth mechanism.

**Severity**: MEDIUM - Dev login uses mock tokens that won't work with server-side auth validation.

### Issue 4: devLoginAsAdmin Creates Super Admin with Token 9999 (Lines 254-273)

```javascript
const devLoginAsAdmin = () => {
  // ...
  localStorage.setItem('redkross_academy_auth_token', 'mock_dev_admin_token_' + Date.now());
  // ...
  setTokenBalance(9999);
};
```

**Finding**: The dev admin login sets `tokenBalance` to 9999 (hardcoded) and uses a mock auth token. The `getAuthHeader()` in apiClient.js will use this token to authorize API calls, potentially allowing privilege escalation if the mock token is accepted server-side.

**Severity**: HIGH - Dev admin login grants 9999 tokens and bypasses normal auth checks.

### Issue 5: onAuthStateChanged Dev Mode Bypass (Lines 100-105)

```javascript
const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
  if (localStorage.getItem('redkross_academy_dev_admin') === 'true' || localStorage.getItem('redkross_academy_dev_cadet')) {
    return;  // Bypasses syncFirebaseUser entirely
  }
  await syncFirebaseUser(firebaseUser);
});
```

**Finding**: The onAuthStateChanged listener returns early (does nothing) if either `redkross_academy_dev_admin` or `redkross_academy_dev_cadet` flags exist in localStorage. This means:

- When `devLoginAsAdmin()` is called (sets `redkross_academy_dev_admin = 'true'`), subsequent auth state changes are completely ignored
- When `devLoginAsCadet()` is called (sets `redkross_academy_dev_cadet`), subsequent auth state changes are completely ignored
- The dev flags effectively "lock out" real Firebase auth from synchronizing

**Severity**: HIGH - Dev mode flags permanently bypass Firebase sync, creating a state where real user auth cannot recover without manual localStorage cleanup.

### Issue 6: syncFirebaseUser Falls Back to mockEngine (Lines 48-65)

```javascript
apiClient.syncUser({
  uid: firebaseUser.uid,
  // ...
}).then((serverUser) => {
  if (serverUser) {
    setCurrentUser((prev) => ({
      ...prev,
      ...serverUser,
      cadet_id: serverUser.cadet_id || cadetUser.cadet_id
    }));
    // ...
  }
}).catch((e) => console.warn('Neon DB user sync note:', e.message));

// Fallback:
const fallbackUser = mockEngine.getOrCreateCadetUser({...});
setCurrentUser(fallbackUser);
setTokenBalance(fallbackUser.token_balance || 150);
```

**Finding**: When `apiClient.syncUser()` fails (network error, server down), the code falls back to `mockEngine.getOrCreateCadetUser()`. This means:

- Production outages cause the app to switch to mock user data
- The token balance falls back to `fallbackUser.token_balance || 150` 
- There's no distinction between "sync failed due to transient error" vs "sync failed due to invalid user"

**Severity**: MEDIUM - Fallback to mock engine during production errors creates inconsistent state.

---

## 3. API Client Auth Issues

**File**: `src/services/apiClient.js`

### Issue 7: getAuthHeader() Falls Back to dev_admin or active_user (Lines 12-29)

```javascript
export const apiClient = {
  getAuthHeader() {
    let token = localStorage.getItem('redkross_academy_auth_token');
    if (!token) {
      if (localStorage.getItem('redkross_academy_dev_admin') === 'true') {
        token = 'usr_super_admin_dev';  // Uses user ID as token!
      } else {
        const userStr = localStorage.getItem('redkross_academy_active_user');
        if (userStr) {
          try {
            const userObj = JSON.parse(userStr);
            token = userObj.id || userStr;
          } catch {
            token = userStr;
          }
        }
      }
    }
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
  // ...
};
```

**Finding**: When no auth token exists:

1. If `dev_admin` flag is set, it uses `'usr_super_admin_dev'` as the token — this is a USER ID, not an auth token
2. Otherwise, it falls back to `active_user` ID from localStorage

**Severity**: HIGH - The function is named `getAuthHeader` and returns `{ Authorization: `Bearer ${token}` }`, but when falling back to dev mode, it uses raw user IDs as Bearer tokens. The admin handler in `api/admin.js` line 19 checks `if (adminUserId === 'usr_super_admin_dev'`, treating this ID as an admin credential. This creates an inconsistency where the client sends a user ID as a Bearer token, and the server accepts it as admin authentication.

### Issue 8: syncUser() Falls Back to Mock User (Lines 32-54)

```javascript
async syncUser(userData) {
  try {
    const res = await fetch(`${API_BASE}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (!res.ok) throw new Error('User sync failed');
    const data = await res.json();
    return data.user;
  } catch (err) {
    console.warn('Fallback local user sync:', err.message);
    return {
      id: userData.uid,
      email: userData.email,
      full_name: userData.full_name || 'Cadet Operator',
      avatar: userData.avatar,
      role: 'student',
      streak_days: 1,
      token_balance: 100  // Hardcoded mock balance
    };
  }
},
```

**Finding**: On sync failure, returns a hardcoded mock user with `token_balance: 100` and `role: 'student'`. This means:

- Any sync failure (including network blips) causes the client to believe the user has only 100 tokens and a student role
- The mock user `id` is set to `userData.uid` which may not match any real user in the DB

**Severity**: MEDIUM - Sync failures silently downgrade user privileges.

---

## 4. Server Auth Issues

**File**: `api/auth.js`

### Issue 9: No Token Verification Endpoint

The `api/auth.js` endpoint:

- Accepts POST with `{ uid, email, full_name, avatar, cadet_id }`
- Creates or updates user in Neon DB
- Returns user data including `token_balance`
- **Does NOT verify Firebase ID tokens** — it trusts the client-supplied user data

**Finding**: The server `/api/auth` endpoint has no token verification step. It accepts whatever user data the client sends. Combined with the client-side issues above (mock tokens, fallback IDs), this means:

- A client with a mock `dev_admin` token can POST to `/api/auth` and create/update a user
- There's no `Authorization` header validation in the auth endpoint
- The admin check in `api/admin.js` separately validates `adminUserId === 'usr_super_admin_dev'`, but the auth endpoint has no such guard

**Severity**: HIGH - Missing token verification means the auth endpoint is vulnerable to injection of fake user data from any client context.

### Issue 10: No Token Verification in Protected Routes

The `ProtectedRoute.jsx` checks `currentUser` from context but doesn't verify that the user was actually authenticated via Firebase. The dev login bypasses (Issue 5) mean that `currentUser` can be set to mock data without any Firebase verification.

**Severity**: HIGH - Protected routes accept mock/dev users as valid authentication.

---

## 5. ProtectedRoute Issues

**File**: `src/components/auth/ProtectedRoute.jsx`

### Issue 11: No Distinction Between Auth States

```javascript
if (currentUser.status === 'SUSPENDED' || currentUser.is_suspended) {
  // Shows suspension screen
}
// ...
if (!currentUser) {
  // Redirects to /login
}
```

**Finding**: The component only checks two states:
1. `isLoading` → showing spinner
2. `!currentUser` → redirect to login
3. `currentUser.status === 'SUSPENDED'` → suspension screen

**Missing checks**: 
- No verification that `currentUser` came from a real Firebase auth session vs dev mock
- No check for `is_suspended` vs `status === 'SUSPENDED'` inconsistency
- The dev login flags (Issue 5) mean `currentUser` can be populated even when Firebase auth is bypassed

**Severity**: MEDIUM - Suspension state may not be correctly evaluated when dev flags are active.

---

## Summary of Severity Distribution

| Severity | Count | Files Affected |
|----------|-------|----------------|
| **HIGH** | 7 | firebase.js (1), authContext.jsx (3), apiClient.js (1), api/auth.js (2) |
| **MEDIUM** | 5 | firebase.js (1), authContext.jsx (2), apiClient.js (1), ProtectedRoute.jsx (1) |
| **Total** | **12** | **5 files** |

---

## Key Findings

1. **Logic Error in firebase.js**: `isFirebaseConfigured` compares env var against identical hardcoded fallback, causing false-negatives in dev environments.

2. **Dev Mode Bypass**: `onAuthStateChanged` in authContext.jsx returns early when dev flags are set, permanently blocking Firebase sync recovery without manual localStorage cleanup.

3. **Token vs ID Confusion**: `apiClient.getAuthHeader()` uses user IDs (`usr_super_admin_dev`) as Bearer tokens when falling back to dev mode, and the admin endpoint accepts these IDs as admin credentials.

4. **No Server-Side Token Verification**: The `/api/auth` endpoint has no Firebase ID token verification, trusting client-supplied data unconditionally.

5. **Mock Fallbacks Mask Real Errors**: Both `syncFirebaseUser` and `syncUser` fall back to mock engine/data, silently degrading user state during production errors.

6. **ProtectedRoute Incomplete**: No verification that authenticated user is from real Firebase session vs dev mock.

---

## Reproduction Steps

1. **Reproduce the isFirebaseConfigured bug**:
   - Run the app without `VITE_FIREBASE_API_KEY` environment variable
   - Observe that `isFirebaseConfigured` is `false` (expected)
   - Set `VITE_FIREBASE_API_KEY = "AIzaSyCwsdhdLghtrcJ7NQmbayW1Yq2BCIO2TWQ"` (the fallback)
   - Observe that `isFirebaseConfigured` is `false` — **this is the bug**; it should be `true` since the key IS configured, just with the fallback value

2. **Reproduce the dev mode bypass**:
   - Call `devLoginAsAdmin()` 
   - Verify `localStorage.getItem('redkross_academy_dev_admin') === 'true'` is set
   - Trigger any auth state change (e.g., reload page)
   - Observe that `syncFirebaseUser` is NOT called — dev flag blocks it permanently

3. **Reproduce the auth header fallback**:
   - Clear `localStorage.getItem('redkross_academy_auth_token')`
   - Set `localStorage.getItem('redkross_academy_dev_admin') = 'true'`
   - Call `apiClient.getAuthHeader()`
   - Observe it returns `{ Authorization: 'Bearer usr_super_admin_dev' }` — a user ID sent as a token

4. **Reproduce the missing token verification**:
   - POST to `/api/auth` with mock user data from any context
   - Observe that the server creates/updates the user without verifying any Firebase token