
import { encrypt } from "../confiq/crypto.js";

const encryptMiddleware = (req, res, next) => {
  console.log('working')
  const originalJson = res.json.bind(res);
  console.log('originalJson',originalJson)

  res.json = (payload) => {
    // ❌ do not encrypt errors
    if (res.statusCode >= 400) {
      return originalJson(payload);
    }

    // ❌ avoid double encryption
    if (payload?.data && typeof payload.data === "string") {
      return originalJson(payload);
    }

    const encrypted = encrypt(payload);
    console.log('encrypted',encrypted)

    return originalJson({
      data: encrypted,
    });
  };

  next();
};

export default encryptMiddleware;
