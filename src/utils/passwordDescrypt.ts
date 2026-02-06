import CryptoJS from 'crypto-js';

export const passwordDecrypt = (
  encryptedPassword: string,
  ivBase64: string,
  keyBase64: string,
): string => {
  const key = CryptoJS.enc.Base64.parse(keyBase64);
  const iv = CryptoJS.enc.Base64.parse(ivBase64);
  const encrypted = CryptoJS.enc.Base64.parse(encryptedPassword);

  const decrypted = CryptoJS.AES.decrypt({ ciphertext: encrypted }, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

  return decryptedText;
};
