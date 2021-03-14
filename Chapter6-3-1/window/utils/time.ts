/**
 * 时间戳变成类似2018/01/12这样的字符串
 * @param {Number} num 时间戳整数
 */
export function intToDateString(num: number, unit = '/') {
  if (num) {
    const date = new Date(num);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}${unit}${month >= 10 ? month : '0' + month}${unit}${
      day >= 10 ? day : '0' + day
    }`;
  } else {
    return '';
  }
}

/**
 * 时间戳变成类似14:28:19这样的字符串
 * @param {Number}  num 时间戳整数
 */
export function intToTimeString(num?: number) {
  let date;
  if (!num) {
    date = new Date();
  } else {
    date = new Date(num);
  }
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${hour >= 10 ? hour : '0' + hour}:${
    minute >= 10 ? minute : '0' + minute
  }:${second >= 10 ? second : '0' + second}`;
}

/**
 * 时间戳变成类似2018/01/12 12:32:21这样的字符串
 * @param {Number} num 时间戳整数
 */
export function formatToString(num: number, unit = '/') {
  const date = new Date(num);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${year}${unit}${month >= 10 ? month : '0' + month}${unit}${
    day >= 10 ? day : '0' + day
  } ${hour >= 10 ? hour : '0' + hour}:${minute >= 10 ? minute : '0' + minute}:${
    second >= 10 ? second : '0' + second
  }`;
}
