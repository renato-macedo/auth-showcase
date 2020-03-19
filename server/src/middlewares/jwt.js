const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const VerifyToken = promisify(jwt.verify);

const { TOKEN_SECRET } = require('../config');
module.exports = async (req, res, next) => {
  const token = req.header('Authorization');
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }
  try {
    const payload = await VerifyToken(token, TOKEN_SECRET);
    req.user = payload.email;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid Token' });
  }
};
