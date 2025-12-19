
import { encrypt } from "../confiq/crypto.js";

const encryptMiddleware = (req, res, next) => {
  console.log('working')
  const originalJson = res.json.bind(res);
  console.log('originalJson',originalJson)

  res.json = (payload) => {
    if (res.statusCode >= 400) {
      return originalJson(payload);
    }

    if (payload?.data && typeof payload.data === "string") {
      return originalJson(payload);
    }

    const encrypted = encrypt(payload.data);
    console.log('encrypted',encrypted)

    return originalJson({
      data: encrypted,
      status:payload.status,
      message:payload.message
    });
  };

  next();
};

export default encryptMiddleware;
