const IDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// const IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || { READ_WRITE: 'readwrite' }

export class Database {
  constructor (name, version) {
    if (!name) {
      throw new Error('E-DB-NM');
    }
    if (!version) {
      throw new Error('E-DB-V');
    }
    this.name = name;
    this.version = version;
    this.instance = null;
    this.active = false;

    // Allows all methods to wait for connection opening
    this.configure = Promise.resolve().then(() => {
      return this.open();
    });
  }

  open () {
    return new Promise((resolve, reject) => {
      if (this.active) {
        console.warn('E-DB-OP-DUP', this.name); // db already opened
        resolve();
      }
      var request = IDB.open(this.name, this.version);
      request.onupgradeneeded = event => {
        this.migrate(event);
        // do not resolve() yet - onsuccess will be called afterwards
      };
      request.onsuccess = event => {
        this.instance = event.target.result;
        this.active = true;
        resolve();
      };
      request.onerror = event => {
        reject(new Error('E-DB-OP'));
      };
    });
  }

  list (table, id) {
    //
  }

  // Creates table for the first time.
  migrate (event) {
    var db = event.target.result;
    if (db.objectStoreNames.contains('resources')) {
      // Destructive operation: rebuilds the table from scratch whenever version changes
      db.deleteObjectStore('resources');
    }
    db.createObjectStore('resources', { keyPath: ['type', 'id'] });
  }
}
