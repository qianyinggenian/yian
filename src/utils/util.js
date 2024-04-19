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

/**
 * @Description 升序
 * @author qianyinggenian
 * @date 2023/10/11 011
 */
export function sortUpDate (a, b) {
  return Date.parse(a.creatDate) - Date.parse(b.creatDate);
}

/**
 * @Description 降序
 * @author qianyinggenian
 * @date 2023/10/11 011
 */
export function sortDownDate (a, b, sortValue = 'creatDate') {
  return Date.parse(b[sortValue]) - Date.parse(a[sortValue]);
}

/**
 * @Description 文件就下载
 * @author qianyinggenian
 * @date 2024/3/14
 */
export function download (blob, filename = '新建文件.xlsx') {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.style.display = 'none';
  a.click();
  document.body.removeChild(a);
}
/**
 * @Description 下载txt
 * @author qianyinggenian
 * @date 2024/3/14
 */
export function downloadFile (resultValue, filename = '新建文本文档', filetype = 'txt') {
  if (resultValue) {
    const blob = new Blob([resultValue], { type: 'text/plain' });
    const downloadElement = document.createElement('a');
    const href = window.URL.createObjectURL(blob); // 创建下载的链接
    downloadElement.href = href;
    downloadElement.download = `${filename}.${filetype}`; // 下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); // 点击下载
    document.body.removeChild(downloadElement); // 下载完成移除元素
    window.URL.revokeObjectURL(href); // 释放掉blob对象
  } else {
    this.$message.error('内容为空，不可保存');
  }
}
/**
 * @Description 生成随机数
 * @author qianyinggenian
 * @date 2024/01/09
 */
export function generateRandomNumbers () {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

/**
 * @Description
 * @author qianyinggenian
 * @date 2024/4/19
 * @str str 字符串
 * @separatorChar separatorChar 分割字符
 * @isIncludes isIncludes 是否包含分割字符
 * @isLastIndex isLastIndex 是否从最后出现的分割字符
 */
export function getStr (str, separatorChar, isIncludes = false, isLastIndex = false) {
  let index = str.indexOf(separatorChar);
  if (isLastIndex) {
    index = str.lastIndexOf(separatorChar);
  } else {
    index = str.indexOf(separatorChar);
  }
  if (index !== -1) {
    const endStr = isIncludes ? str.slice(index) : str.slice(index + 1);
    const startStr = isIncludes ? str.slice(0, index + 1) : str.slice(0, index);
    return {
      endStr,
      startStr
    };
  } else {
    return '';
  }
}
