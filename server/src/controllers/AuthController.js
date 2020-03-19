const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../config');

const SignAsync = promisify(jwt.sign);

const AuthController = {
  async login(req, res) {
    const { email } = req.body;
    const token = await SignAsync({ email }, TOKEN_SECRET, {
      expiresIn: '30s'
    });
    return res.json({ token });
  }
};

module.exports = AuthController;
