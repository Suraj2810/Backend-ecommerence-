import { encrypt, decrypt } from '../config/crypto.js';

export const decryptMiddleware = (req, res, next) => {
  try {
    // --- DECRYPT BODY (POST/PUT) ---
    if (req.body && req.body.data) {
      const decodedBody = decrypt(req.body.data);
      if (decodedBody === null) {
        return res.status(400).json({ message: "Invalid encrypted body" });
      }
      req.body = decodedBody; 
    }

    // --- DECRYPT QUERY (GET) ---
    if (req.query && req.query.payload) {
      const decodedQuery = decrypt(decodeURIComponent(req.query.payload));
      if (decodedQuery) {
        // If it's an object, merge it into req.query
        if (typeof decodedQuery === 'object') {
          Object.assign(req.query, decodedQuery);
        } else {
          req.query.id = decodedQuery;
        }
        delete req.query.payload; // Remove the encrypted blob
      }
    }

    // --- DECRYPT PARAMS (URL) ---
    if (req.params && req.params.id) {
      const decodedParam = decrypt(decodeURIComponent(req.params.id));
      if (decodedParam) {
        req.params.id = decodedParam;
      }
    }

    next();
  } catch (error) {
    console.error("Middleware processing error:", error.message);
    return res.status(400).json({ message: "Decryption processing error" });
  }
};

export const encryptMiddleware = (req, res, next) => {
  const originalJson = res.json.bind(res);

  res.json = (data) => {
    if (res.statusCode >= 400 || !data) {
      return originalJson(data);
    }
    const encryptedData = encrypt(data.content);
    console.log('encryptedData',encryptedData)
    let newDecryptData = decrypt(encryptedData);
    console.log('Yeh_decrypt',newDecryptData)
    return originalJson({ data: encryptedData,status:data.status,message:data.message });
  };

  next();
};