export function uniqueArray (arr, key) {
  const obj = {};
  arr = arr.reduce(function (item, next) {
    // eslint-disable-next-line no-unused-expressions
    obj[next[key]] = obj[next[key]] ? '' : item.push(next);
    // obj[next[key]] ? '' : obj[next[key]] = item.push(next);
    return item;
  }, []);
  return arr;
}

/**
 *判断对象是否是一个纯粹的对象
 */
function isPlainObject (obj) {
  return typeof obj === 'object' && Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 *深度合并多个对象的方法
 */
export function deepAssign () {
  const len = arguments.length;
  let target = arguments[0];
  if (!isPlainObject(target)) {
    target = {};
  }
  for (let i = 1; i < len; i++) {
    const source = arguments[i];
    if (isPlainObject(source)) {
      for (const s in source) {
        if (s === '__proto__' || target === source[s]) {
          continue;
        }
        if (isPlainObject(source[s])) {
          target[s] = deepAssign(target[s], source[s]);
        } else {
          target[s] = source[s];
        }
      }
    }
  }
  return target;
}
