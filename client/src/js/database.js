// client/src/js/database.js
import { openDB } from 'idb';

const initdb = async () => {
  try {
    const db = await openDB('jate', 1, {
      upgrade(db) {
        if (db.objectStoreNames.contains('jate')){return}
        db.createObjectStore('jate', {keyPath: 'id', autoIncrement: true});
      },
    });
    return db;
  } catch (err) {console.error('jate database creation failed', err)}
}
export const getDb = async () => { try {
  const contactDb = await openDB('jate', 1);
  const tx = contactDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  if ('getAllKeys' in store) {
    const keys = await store.getAllKeys();
    if (keys.length === 0){return null;}
  } else {
    const count = await store.count();
    if (count === 0) {return null}
  }

  const request = store.getAll();
  const result = await request;
  return result;
} catch (err) {
  console.error('GET all data failed', err); 
return null;
}
}

export const putDb = async (content) => {
  try {
    const contactDb = await openDB('jate', 1);
    const tx = contactDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.put({content:content});
    const result = await request;
  } catch (err) { console.error('PUT data failed', err)}
}
 
initdb();
