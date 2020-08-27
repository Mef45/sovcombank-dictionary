import { Bookmark } from '@/store/bookmarks';
import { Word } from '@/store/dictionary';

const DB_NAME = 'dictionary-db';
const STORAGE_NAME = 'bookmarks';

const DB_VERSION = 1;

let DB: IDBDatabase;

export default {
    async getDB(): Promise<IDBDatabase> {
        return new Promise((res, rej) => {
            if (DB) return res(DB);

            const request = window.indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = (e): void => {
                rej(`Error ${e}`)
            };

            request.onsuccess = (e: any): void => {
                DB = e.target.result;
                res(DB);
            };

            request.onupgradeneeded = (e: any): void => {
                const db = e.target.result;
                db.createObjectStore(STORAGE_NAME, { autoIncrement: true, keyPath: 'id' });
            }
        });
    },
    async addBookmark(word: Word): Promise<IDBDatabase> {
        const db = await this.getDB();

        return new Promise(res => {
            const transaction = db.transaction([STORAGE_NAME], 'readwrite');
            transaction.oncomplete = (): void => {
                res();
            };

            const store = transaction.objectStore(STORAGE_NAME);
            store.put(word);
        });
    },
    async removeBookmark(word: Bookmark): Promise<IDBDatabase> {
        const db = await this.getDB();

        return new Promise(res => {
            const transaction = db.transaction([STORAGE_NAME], 'readwrite');
            transaction.oncomplete = (): void => {
                res();
            };

            const store = transaction.objectStore(STORAGE_NAME);
            store.delete(word.id);
        })
    },
    async getBookmarks(): Promise<Bookmark[]> {
        const db = await this.getDB();
        return new Promise(res => {
            const transaction = db.transaction([STORAGE_NAME], 'readonly');
            transaction.oncomplete = (): void => {
                res(bookmarks);
            };

            const store = transaction.objectStore(STORAGE_NAME);
            const bookmarks: any = [];

            store.openCursor().onsuccess = (e: any): void => {
                const cursor = e.target.result;
                if (cursor) {
                    bookmarks.push(cursor.value);
                    cursor.continue();
                }
            }
        });
    },
    async setBookmarks(bookmarks: Bookmark[]): Promise<IDBDatabase> {
        const db = await this.getDB();
        return new Promise(res => {
            const transaction = db.transaction([STORAGE_NAME], 'readwrite');
            transaction.oncomplete = (): void => {
                res();
            }

            const store = transaction.objectStore(STORAGE_NAME);
            for (const bookmark of bookmarks) {
                store.put(bookmark);
            }
        })
    },
}
