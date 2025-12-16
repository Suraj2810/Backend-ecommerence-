import { encrypt } from '../confiq/crypto.js';

export default (req, res, next) => {
  const oldJson = res.json;
  res.json = (data) => oldJson.call(res, { data: encrypt(data) });
  next();


};
