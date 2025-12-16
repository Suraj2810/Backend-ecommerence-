
import CryptoJS from "crypto-js";

import dotenv from 'dotenv';
dotenv.config();

// const SECRET_KEY = CryptoJS.enc.Utf8.parse(
//   "12345678901234567890123456789012"
// ); 
const SECRET_KEY = CryptoJS.enc.Utf8.parse(
process.env.AES_SECRET
); 


export const encrypt = (data) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
  
    SECRET_KEY,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  ).toString(); // Base64
  
};

export const decrypt = (cipherText) => {
  if (!cipherText || typeof cipherText !== "string") {
    throw new Error("Invalid cipher text");
  }
  console.log('SECRET_KEY',SECRET_KEY)

  const bytes = CryptoJS.AES.decrypt(
    cipherText,
    SECRET_KEY,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

  if (!decryptedText) {
    throw new Error("Decryption failed");
  }

  return JSON.parse(decryptedText);
};
