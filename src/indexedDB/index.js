/**
 * 打开数据库
 * @param {object} dbName 数据库的名字
 * @param {string} storeName 仓库名称
 * @param {string} version 数据库的版本
 * @return {object} 该函数会返回一个数据库实例
 */
export function openDB (dbName, version = '1') {
  return new Promise((resolve, reject) => {
    //  兼容浏览器
    var indexedDB =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB;
    let db;
    // 打开数据库，若没有则会创建
    const request = indexedDB.open(dbName, version);
    // 数据库打开成功回调
    request.onsuccess = function (event) {
      db = event.target.result; // 数据库对象
      console.log('数据库打开成功');
      resolve(db);
    };
    // 数据库打开失败的回调
    request.onerror = function (event) {
      console.log('数据库打开报错');
    };
    // 数据库有更新时候的回调
    request.onupgradeneeded = function (event) {
      // 数据库创建或升级的时候会触发
      db = event.target.result; // 数据库对象
      var objectStore;
      // 创建存储库
      objectStore = db.createObjectStore('menuList', {
        keyPath: 'id' // 这是主键
        // autoIncrement: true // 实现自增
      });
      // 创建索引，在后面查询数据的时候可以根据索引查
      objectStore.createIndex('id', 'id', { unique: false });
      objectStore.createIndex('code', 'code', { unique: false });
      objectStore.createIndex('type', 'type', { unique: false });
      objectStore.createIndex('name', 'name', { unique: false });
      objectStore.createIndex('permission', 'permission', { unique: false });
      objectStore.createIndex('path', 'path', { unique: false });
      objectStore.createIndex('comp', 'comp', { unique: false });
      objectStore.createIndex('parentId', 'parentId', { unique: false });
      objectStore.createIndex('parentIds', 'parentIds', { unique: false });
      var userObjectStore = db.createObjectStore('userList', {
        keyPath: 'id'
      });
      userObjectStore.createIndex('id', 'id', { unique: false });
      userObjectStore.createIndex('name', 'name', { unique: false });
      userObjectStore.createIndex('account', 'account', { unique: false });
      userObjectStore.createIndex('password', 'password', { unique: false });
      userObjectStore.createIndex('status', 'status', { unique: false });
      userObjectStore.createIndex('creatDate', 'creatDate', { unique: false });
      userObjectStore.createIndex('creator', 'creator', { unique: false });
    };
  });
}

/**
 * 新增数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} data 数据
 */
export function addData (db, storeName, data) {
  return new Promise((resolve, reject) => {
    var request = db
      .transaction(storeName, 'readwrite') // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
      .objectStore(storeName) // 仓库对象
      .add(data);
    request.onsuccess = function (event) {
      console.log('数据写入成功');
      resolve({ code: 200, msg: '操作成功' });
    };

    request.onerror = function (event) {
      console.log('数据写入失败');
      resolve({ code: 500, msg: '操作失败' });
    };
  });
}

// 通过游标查所有的数据
export function cursorGetData (db, storeName) {
  return new Promise((resolve, reject) => {
    const list = [];
    var store = db
      .transaction(storeName, 'readwrite') // 事务
      .objectStore(storeName); // 仓库对象
    var request = store.openCursor(); // 指针对象
    // 游标开启成功，逐行读数据
    request.onsuccess = (e) => {
      var cursor = e.target.result;
      if (cursor) {
        // 必须要检查
        list.push(cursor.value);
        cursor.continue(); // 遍历了存储对象中的所有内容
      } else {
        resolve({ code: 200, list });
      }
    };
    request.onerror = (e) => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({ code: 500, msg: '网络错误' });
    };
  });
}

/**
 * 通过主键读取数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} key 主键值
 */
export function getDataByKey (db, storeName, key) {
  return new Promise((resolve, reject) => {
    var transaction = db.transaction([storeName]); // 事务
    var objectStore = transaction.objectStore(storeName); // 仓库对象
    var request = objectStore.get(key); // 通过主键获取数据

    request.onerror = function (event) {
      console.log('事务失败');
    };

    request.onsuccess = function (event) {
      resolve(request.result);
    };
  });
}

const promise = openDB('yian', '1');
// const that = this;

export let instanceDB;
promise.then(function (value) {
  instanceDB = value;
}, function (error) {
  console.log('error', error);
});

/**
 * 更新数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {object} data 数据
 */
export function updateDB (db, storeName, data) {
  return new Promise((resolve, reject) => {
    var request = db
      .transaction([storeName], 'readwrite') // 事务对象
      .objectStore(storeName) // 仓库对象
      .put(data);

    request.onsuccess = () => {
      console.log('数据更新成功');
      resolve(200);
    };

    request.onerror = () => {
      console.log('数据更新失败');
      // eslint-disable-next-line prefer-promise-reject-errors
      reject(500);
    };
  });
}

// 通过主键删除数据（数据库对象，表名，主键值）
export function deleteDB (db, storeName, id) {
  return new Promise((resolve, reject) => {
    var request = db
      .transaction([storeName], 'readwrite')
      .objectStore(storeName)
      .delete(id);

    request.onsuccess = function () {
      //   console.log("数据删除成功");
      resolve({ code: 200, msg: '删除成功！' });
    };

    request.onerror = function () {
      //   console.log("数据删除失败");
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({ code: 500, msg: '删除失败' });
    };
  });
}
