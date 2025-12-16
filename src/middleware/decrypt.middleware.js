import { decrypt } from '../confiq/crypto.js';

const decryptMiddleware = (req, res, next) => {

  try {
    // Only decrypt if encrypted payload exists
    if (req.body && typeof req.body.data === 'string') {
      // const encryptedData = req.body.data;
      const encryptedData = req.body.data.replace(/\s/g, "");

      // 🔍 Log BEFORE decrypt
      console.log('Encrypted payload:', encryptedData);

      // Decrypt and replace body
      req.body = decrypt(encryptedData);

      // 🔍 Log AFTER decrypt
      console.log('Decrypted payload:', req.body);
    }

    next();
  } catch (error) {
    console.error('Decrypt middleware error:', error.message);

    return res.status(400).json({
      message: 'Invalid encrypted request'
    });
  }
};

export default decryptMiddleware;

