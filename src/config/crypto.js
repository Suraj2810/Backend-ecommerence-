import CryptoJS from "crypto-js";
import dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.AES_SECRET;

export const encrypt = (data) => {
  const plainText = typeof data === "string" ? data : JSON.stringify(data);
  return CryptoJS.AES.encrypt(plainText, SECRET).toString();
};

export const decrypt = (cipherText) => {
  if (!cipherText || typeof cipherText !== "string") return null;
 console.log(SECRET)
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedText) {
     
        console.error("Decryption produced empty string. Check your Secret Key.");
        return null;
    }

    try {
      return JSON.parse(decryptedText);
    } catch (e) {
      return decryptedText; 
    }
  } catch (error) {
    console.error("CryptoJS Decrypt Error:", error.message);
    return null;
  }
};