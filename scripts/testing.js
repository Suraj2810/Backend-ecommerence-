const CryptoJS = require('crypto-js');

const SECRET = '12345678901234567890123456789012'; // same as backend
const id = '694596185172ae8fd061f584';

// Encrypt ONLY the ID string
const encrypted = CryptoJS.AES.encrypt(id, SECRET).toString();

// URL encode for query safety
const safeEncrypted = encodeURIComponent(encrypted);

// Set encrypted ID as variable
// pm.environment.set('encryptedId', safeEncrypted);

console.log('Encrypted ID:', encrypted);
console.log('Encoded ID:', safeEncrypted);
