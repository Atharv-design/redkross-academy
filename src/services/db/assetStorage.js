/**
 * Persistent Asset Storage for RedKross Academy
 * Handles client-side resolution of attached PDFs, documents, and static assets.
 */

const DB_NAME = 'RedKross_Asset_Storage';
const DB_VERSION = 1;
const STORE_NAME = 'asset_blobs';

function openAssetDB() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return resolve(null);
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = (err) => {
      console.warn('Failed to open IndexedDB for asset storage:', err);
      resolve(null);
    };
  });
}

/**
 * Saves a file or blob to IndexedDB
 * @param {string} assetId
 * @param {Blob|File} file
 * @returns {Promise<string>} Returns an idb-file:// identifier or blob URL
 */
export async function saveAssetBlob(assetId, file) {
  try {
    const db = await openAssetDB();
    if (!db) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => resolve(URL.createObjectURL(file));
        reader.readAsDataURL(file);
      });
    }

    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(file, assetId);
      tx.oncomplete = () => resolve(`idb-file://${assetId}`);
      tx.onerror = () => resolve(URL.createObjectURL(file));
    });
  } catch (err) {
    console.warn('Error saving asset blob to IndexedDB:', err);
    return URL.createObjectURL(file);
  }
}

export const savePdfBlob = saveAssetBlob;

/**
 * Resolves an attached PDF URL. If it's an idb-file:// URL, loads the blob from IndexedDB.
 * @param {string} urlOrId
 * @returns {Promise<string|null>}
 */
export async function resolvePdfUrl(urlOrId) {
  if (!urlOrId) return null;

  if (urlOrId.startsWith('idb-file://')) {
    const assetId = urlOrId.replace('idb-file://', '');
    try {
      const db = await openAssetDB();
      if (!db) return null;

      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(assetId);

        req.onsuccess = () => {
          if (req.result) {
            const objectUrl = URL.createObjectURL(req.result);
            resolve(objectUrl);
          } else {
            resolve(null);
          }
        };
        req.onerror = () => resolve(null);
      });
    } catch (err) {
      console.error('Error reading PDF from IndexedDB:', err);
      return null;
    }
  }

  return urlOrId;
}
