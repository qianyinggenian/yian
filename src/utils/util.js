import Decimal from 'decimal.js';
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
/**
 * @Description 数组求和
 * @author qianyinggenian
 * @date 2024/4/26
 */
export function getArraySum (list, field) {
  if (list?.length > 0) {
    if (field) {
      return list.reduce((acc, item) => {
        return getValue(acc, item[field]);
      }, 0);
    } else {
      return list.reduce((acc, val) => {
        return getValue(acc, val);
      }, 0);
    }
  } else {
    return 0;
  }
  function getValue (acc, value) {
    const fieldType = typeof value;
    if (['number', 'string'].includes(fieldType) && Number(value)) {
      return acc + Number(value);
    } else {
      return acc;
    }
  }
}
/**
 * @Description 数据格式化
 * @author qianyinggenian
 * @date 2024/4/28
 */
export function useMoneyFormatter (val, length = 2) {
  if (val === null || val === undefined) {
    return val;
  }
  const [a, b = ''] = String(val).split('.');

  return `${a.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${`${b}0000`.slice(
      0,
      length
  )}`;
}
export function largeIntegerSum (a, b) {
  a = a.toString();
  b = b.toString();
  if (isNumericWithoutLeadingZeros(a) && isNumericWithoutLeadingZeros(b)) {
    const obj = decimalZero(String(a), String(b));
    let firstValue = obj.str1;
    let lastValue = obj.str2;
    const len = Math.max(firstValue.length, lastValue.length);
    firstValue = firstValue.padStart(len, '0');
    lastValue = lastValue.padStart(len, '0');
    let carry = 0;
    let result = '';
    for (let i = len - 1; i >= 0; i--) {
      // if (a[i] !== '.' && b[i] !== '.') {
      //   const sum = +a[i] + +b[i] + carry;
      if (firstValue[i] !== '.' && lastValue[i] !== '.') {
        const sum = +firstValue[i] + +lastValue[i] + carry;
        const r = sum % 10;
        // const carry = Math.floor(sum / 10);
        carry = Math.floor(sum / 10);
        result = r + result;
      } else {
        result = '.' + result;
      }
    }
    return result;
  }

  function isNumericWithoutLeadingZeros (str) {
    // 此正则表达式匹配整数和浮点数，不允许数字前有前导零（除了整数部分为0的情况）
    const numericPattern = /^-?(0|[1-9]\d*)((\.\d+)?([eE][+-]?\d+)?)?$/;
    return numericPattern.test(str);
  }
  function decimalZero (str1, str2) {
    const flag1 = str1.includes('.');
    const flag2 = str2.includes('.');
    if (flag1 && flag2) {
      const len1 = str1.split('.')[1].length;
      const len2 = str2.split('.')[1].length;
      const len = Math.max(len1, len2);
      if (len1 > len2) {
        str2 = str2.padEnd((len - len2) + str2.length, '0');
      }
      if (len2 > len1) {
        str1 = str1.padEnd((len - len1) + str1.length, '0');
      }
      return {
        str1,
        str2
      };
    } else if (flag1 && !flag2) {
      // 1有，2没有
      return targetValue(str2, str1, 'str2');
    } else if (!flag1 && flag2) {
      // 1没有，2有
      return targetValue(str1, str2, 'str1');
    } else {
      return {
        str1,
        str2
      };
    }
    function targetValue (currentValue, comparisonValue, filed) {
      const len1 = comparisonValue.split('.')[1].length;
      const len2 = `${currentValue}.`.length;
      const len = len1 + len2;
      currentValue = `${currentValue}.`.padEnd(len, '0');
      let params = {};
      if (filed === 'str1') {
        params = {
          str1: currentValue,
          str2: comparisonValue
        };
      } else {
        params = {
          str1: comparisonValue,
          str2: currentValue
        };
      }
      return params;
    }
  }
}
/**
 * @Description
 * @author qianyinggenian
 * @date 2024/4/29
 * @x 第一个参数值
 * @y 第二个参数值
 * @len 保留小数位数
 * @type add-加法/sub-减法/div-除法/mul-乘法
 */
export function getTargetValue (x, y, len, type = 'add') {
  return new Decimal(x)[type](new Decimal(y)).toNumber().toFixed(len);
}
/**
 * @Description 跨标签页通信
 * @author qianyinggenian
 * @date 2024/4/29
 */
const channel = new BroadcastChannel('my-channel');
/**
 * @Description 发送信息
 * @author qianyinggenian
 * @date 2024/4/29
 */
export function sendMsg (type, msg) {
  channel.postMessage({ type, msg });
}
/**
 * @Description 监听通信
 * @author qianyinggenian
 * @date 2024/4/29
 */

export function listenMsg (callback) {
  const handler = (evt) => {
    callback && callback(evt.data);
  };
  channel.addEventListener('message', handler);
  return () => {
    channel.removeEventListener('message', handler);
  };
}
