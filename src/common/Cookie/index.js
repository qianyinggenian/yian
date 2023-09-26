import Cookies from 'js-cookie';

export const yiAnToken = 'yiAnToken';
export const refreshTokenKey = 'refreshTokenKey';
export const getTokenTimeKey = 'getTokenTimeKey';
export const getExpiredTimeKey = 'getExpiredTimeKey';

/**
 * @Description 获取Cookie
 * @author qianyinggenian
 * @date 2023/9/26
 */
export function getToKen () {
  return Cookies.get(yiAnToken);
}

/**
 * @Description 刷新Cookie
 * @author qianyinggenian
 * @date 2023/9/26
 */
export function getRefreshToken () {
  return Cookies.get(refreshTokenKey);
}

/**
 * @Description 设置Cookie
 * @author qianyinggenian
 * @date 2023/9/26
 */
export function setToken (name, value, expireTime) {
  const expires = new Date(new Date() * 1 + expireTime * 1000);
  Cookies.set(name, value, { expires: expires }); // 10 秒后失效
}

/**
 * @Description 移除Cookie
 * @author qianyinggenian
 * @date 2023/9/26
 */
export function removeToken () {
  Cookies.remove(yiAnToken);
  Cookies.remove(getTokenTimeKey);
}

/**
 * @Description 设置获取token时间
 * @author qianyinggenian
 * @date 2023/9/26
 */
export function setGetTokenTime () {
  Cookies.set(getTokenTimeKey, Number(new Date().getTime()));
}

/**
 * @Description 设置超时时间
 * @author qianyinggenian
 * @date 2023/9/26
 */
export function getExpiredTime () {
  return Cookies.get(getExpiredTimeKey);
}

/**
 * @Description 获取当前时间
 * @author qianyinggenian
 * @date 2023/9/26
 */
export function getGetTokenTime () {
  return Cookies.get(getTokenTimeKey);
}

/**
 * @Description 判断是否过期
 * @author qianyinggenian
 * @date 2023/9/26
 */

export function isTokenExpired () {
  /* 毫秒之间的较量了，这里没有秒这个单位 */
  const expiredTime = parseInt(getExpiredTime());
  const getTokenTime = getGetTokenTime();
  return new Date().getTime() - Number(getTokenTime) > expiredTime;
}
