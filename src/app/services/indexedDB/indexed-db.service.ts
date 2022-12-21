import { Injectable } from '@angular/core';
import { CommonService } from '../common/common.service';
import { IDB_CURRENT_VERSION, IDB_DB_NAME, Indexed_tables, I_IDB_TABLE } from './indexedDB';
export interface I_IndexedDB_INSERT<T> {
  data: T | T[];
  tableName: string;
}

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService<T> {

  databaseVersion!: number;
  constructor(
    private common: CommonService
  ) { }


  //*****************[IDB OPEN DATABASE ]*****************/
  openDB(): IDBOpenDBRequest {
    return indexedDB.open(IDB_DB_NAME, IDB_CURRENT_VERSION);
  }
  //*****************[IDB INSERT NEW DATA]*****************/
  insertNewData(e: I_IndexedDB_INSERT<T>[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let idb = this.openDB();
      idb.onerror = (ev) => {
        return reject(false);
      }
      idb.onupgradeneeded = (ev) => {
        let res = idb.result;
      }
      idb.onsuccess = (ev) => {
        this.commonInsertUpdateDelete('INSERT', idb, e);
        return resolve(true);
      }
    })

  }
  //*****************[IDB UPDATE NEW DATA]*****************/
  updateInsertedData(e: I_IndexedDB_INSERT<T>[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let idb = this.openDB();
      idb.onsuccess = () => {
        this.commonInsertUpdateDelete('UPDATE', idb, e);
        return resolve(true);
      }
      idb.onupgradeneeded = (ev) => {
        let res = idb.result;
      }
      idb.onerror = (ev) => {
        return reject(false);
      }
    })
  }

  //*****************[IDB COMMON INSERT/UPDATE ]*****************/
  deleteInsertedData(e: I_IndexedDB_INSERT<T>[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let idb = this.openDB();
      idb.onsuccess = () => {
        this.commonInsertUpdateDelete('DELETE', idb, e);
        return resolve(true);
      }
      idb.onupgradeneeded = (ev) => {
        let res = idb.result;
      }
      idb.onerror = (ev) => {
        return reject(false);
      }
    })
  }
  //*****************[IDB COMMON INSERT/UPDATE ]*****************/
  commonInsertUpdateDelete(flag: 'INSERT' | 'UPDATE' | 'DELETE', idbRef: IDBOpenDBRequest, data: I_IndexedDB_INSERT<T>[]) {
    let res = idbRef.result;
    data.forEach((element: I_IndexedDB_INSERT<T>) => {
      if (res.objectStoreNames.contains(element.tableName)) {
        let tx = res.transaction(element.tableName, 'readwrite');
        let store = tx.objectStore(element.tableName);
        if (flag == 'INSERT') store.put({ ...element.data });
        else if (flag == 'UPDATE') store.put({ ...element.data }, element.data['key']);
        else store.delete(element.data['key']);
      }
    });
  }


  //*****************[IDB COMMON INSERT/UPDATE ]*****************/
  getAllInsertedData(e: string): Promise<T[] | boolean> {
    return new Promise((resolve, reject) => {
      let listArr: T[] = [];
      let idb = this.openDB();
      idb.onsuccess = () => {
        let res = idb.result;
        let tx = res.transaction(e, 'readwrite');
        let store = tx.objectStore(e);
        let cursor = store.openCursor();
        cursor.onsuccess = () => {
          let cursorResult = cursor.result;
          if (cursorResult) {
            let key = { 'key': cursorResult.key };
            let singleData: T = { ...cursorResult.value, ...key };
            listArr.push(singleData);
            cursorResult.continue();
          }
        }
        return resolve(listArr);
      }
      idb.onupgradeneeded = (ev) => {
        let res = idb.result;
      }
      idb.onerror = (ev) => {
        return reject(false);
      }
    })
  }


  //*****************[IDB APP LAUNCH DB INIT]*****************/
  onInitIndexedDb() { // creating the IDB for the first time
    let idb = this.openDB();
    idb.onupgradeneeded = (ev) => {
      let res = idb.result;
      this.databaseVersion = res.version;
      Indexed_tables.forEach((element: I_IDB_TABLE) => {
        element.tableName.forEach((table: string) => {
          if (!res.objectStoreNames.contains(table)) {
            let objectStoreOne = res.createObjectStore(table, { autoIncrement: true });
          } else {
            // console.log("Already exists");
          }
        })
      })
    }
    idb.onerror = (ev) => {
      alert(`error ${idb.error}`)
      this.common.presentToast('Error occured during indexedDB table open.', 'error')
    }
  }

}
