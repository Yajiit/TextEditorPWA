import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const db = await initdb();
  const transaction = db.transaction('jate', 'readwrite');
  const jateStore = transaction.objectStore('jate');
  await jateStore.add({ content });
};

export const getDb = async () => {
  const db = await initdb();
  const transaction = db.transaction('jate', 'readonly');
  const jateStore = transaction.objectStore('jate');
  const data = await jateStore.getAll();
  return data[0] ? data[0].content : null;
};

initdb();
