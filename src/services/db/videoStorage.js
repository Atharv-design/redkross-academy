/**
 * IndexedDB Persistent Video Asset Storage for RedKross Academy
 * Allows client-side persistence of uploaded MP4/WebM videos across tabs,
 * page reloads, and student/admin portal transitions.
 */

const DB_NAME = 'RedKross_Video_Storage';
const DB_VERSION = 1;
const STORE_NAME = 'video_blobs';

function openVideoDB() {
  return new Promise((resolve, reject) => {
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
    request.onerror = () => {
      console.warn('Failed to open IndexedDB for video storage:', request.error);
      resolve(null);
    };
  });
}

/**
 * Saves a Video File or Blob to IndexedDB
 * @param {string} assetId
 * @param {Blob|File} file
 * @returns {Promise<string>} Returns an idb:// identifier or direct blob URL
 */
export async function saveVideoBlob(assetId, file) {
  try {
    const db = await openVideoDB();
    if (!db) {
      return URL.createObjectURL(file);
    }

    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(file, assetId);

      tx.oncomplete = () => {
        resolve(`idb://${assetId}`);
      };
      tx.onerror = () => {
        console.warn('Failed to save video to IndexedDB, fallback to object URL');
        resolve(URL.createObjectURL(file));
      };
    });
  } catch (err) {
    console.error('Error saving video blob:', err);
    return URL.createObjectURL(file);
  }
}

/**
 * Resolves a video URL. If it's an idb:// URL, loads the blob from IndexedDB and returns an object URL.
 * @param {string} urlOrId
 * @returns {Promise<string>}
 */
export async function resolveVideoUrl(urlOrId) {
  if (!urlOrId) return '/assets/sample-lesson.mp4';

  if (urlOrId.startsWith('idb://')) {
    const assetId = urlOrId.replace('idb://', '');
    try {
      const db = await openVideoDB();
      if (!db) return '/assets/sample-lesson.mp4';

      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(assetId);

        req.onsuccess = () => {
          if (req.result) {
            const objectUrl = URL.createObjectURL(req.result);
            resolve(objectUrl);
          } else {
            resolve('/assets/sample-lesson.mp4');
          }
        };
        req.onerror = () => resolve('/assets/sample-lesson.mp4');
      });
    } catch (err) {
      console.error('Error reading video from IndexedDB:', err);
      return '/assets/sample-lesson.mp4';
    }
  }

  return urlOrId;
}

/**
 * Saves a PDF Document or Blob to IndexedDB for lesson study resources
 * @param {string} assetId
 * @param {Blob|File} file
 * @returns {Promise<string>} Returns an idb-file:// identifier or Data URL
 */
export async function savePdfBlob(assetId, file) {
  try {
    const db = await openVideoDB();
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

      tx.oncomplete = () => {
        resolve(`idb-file://${assetId}`);
      };
      tx.onerror = () => {
        console.warn('Failed to save PDF to IndexedDB, fallback to Data URL');
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      };
    });
  } catch (err) {
    console.error('Error saving PDF blob:', err);
    return URL.createObjectURL(file);
  }
}

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
      const db = await openVideoDB();
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
