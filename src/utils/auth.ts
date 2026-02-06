// import { User } from "@/types/User";

import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import CryptoJS from 'crypto-js';

export const setToken = (token: string) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 7); //temporarily set 7days expire time
  const cipherText = CryptoJS.AES.encrypt(JSON.stringify(token), 'token').toString();
  setCookie('token', cipherText, {
    expires,
  });
};

export const setUserInfo = (userInfo: any) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);
  const cipherUserInfo = CryptoJS.AES.encrypt(JSON.stringify(userInfo), 'userInfo').toString();
  setCookie('userInfo', cipherUserInfo, {
    expires,
  });
};

export const getUserInfo = () => {
  const userinfo = getCookie('userInfo');
  if (!userinfo) {
    return null;
  }
  const userInfoBytes = CryptoJS.AES.decrypt(userinfo as string, 'userInfo');
  try {
    const decryptedUserInfo = JSON.parse(userInfoBytes.toString(CryptoJS.enc.Utf8));
    return decryptedUserInfo;
  } catch (err) {
    console.error('error', err);
  }
};

export const getToken = () => {
  const session = getCookie('token');
  if (!session) return false;
  const bytes = CryptoJS.AES.decrypt(session as string, 'token');
  try {
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (err) {
    console.error('error', err);
  }
};

export const logout = () => {
  deleteCookie('token');
  deleteCookie('userInfo');
};
