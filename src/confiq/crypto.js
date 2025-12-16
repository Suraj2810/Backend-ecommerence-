import CryptoJS from 'crypto-js';

const SECRET = process.env.AES_SECRET;
console.log('SECRET',SECRET)

export const encrypt = (data) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    SECRET
  ).toString();
};

export const decrypt = (cipherText) => {
  console.log('SECRETwd',SECRET)
  if (!cipherText || typeof cipherText !== 'string') {
    throw new Error('Cipher text missing or invalid');
  }

  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET);
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

  if (!decryptedText) {
    throw new Error('Decryption failed');
  }

  return JSON.parse(decryptedText);
};
