let db;

const dbRequest = window.indexedDB.open('MiniNoteDatabase', 4);

dbRequest.onerror = function (event) {
  console.log("error: ");
};

dbRequest.onsuccess = function (event) {
  console.log("success");
  db = dbRequest.result;
};

dbRequest.onupgradeneeded = function (event: any) {
  console.log('onupgradeneeded');
  const db = event.target.result;
  const objectStore = db.createObjectStore("notes", { keyPath: "id" });
}

/**
 * 新增笔记数据
 * @param content 笔记内容
 */
export function add(content) {
  return new Promise((resolve, reject) => {
    const request = db.transaction(["notes"], "readwrite")
      .objectStore("notes")
      .add(content);

    request.onsuccess = function (event) {
      console.log('add success');
      resolve(0);
    };

    request.onerror = function (event) {
      console.log('add error', event);
      reject();
    }
  })
}

/**
 * 获取笔记数据
 * @param key index
 */
export function get(key) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["notes"]);
    const objectStore = transaction.objectStore("notes");
    const request = objectStore.get(key);

    request.onerror = function (event) {
      console.log('get error');
      reject();
    };

    request.onsuccess = function (event) {
      console.log('get success');
      resolve(request.result);
    };
  });
}

/**
 * 删除数据
 * @param key index
 */
export function remove(key) {
  return new Promise((resolve, reject) => {
    const request = db.transaction(["notes"], "readwrite")
      .objectStore("notes")
      .delete(key);

    request.onsuccess = function (event) {
      console.log('remove success');
      resolve(0);
    };

    request.onerror = function (event) {
      console.log('remove error');
      reject();
    }
  })
}

export function put(content) {
  return new Promise((resolve, reject) => {
    const request = db.transaction(["notes"], "readwrite")
      .objectStore("notes")
      .put(content);

    request.onerror = function (event) {
      console.log('get error');
      reject();
    };

    request.onsuccess = function (event) {
      console.log('get success');
      resolve(0);
    };
  });
}

/**
 * 获取全部笔记数据
 */
export function getAll() {
  return new Promise((resolve, reject) => {
    const objectStore = db.transaction("notes")
    .objectStore("notes");

    const request = objectStore.getAll();

    request.onsuccess = function (event) {
      console.log('getAll success');
      resolve(request.result);
    };

    request.onerror = function (event) {
      console.log('getAll error');
      reject();
    };
  });
}