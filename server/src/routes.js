const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const router = require('express').Router();
const crypto = require('crypto');

const jwtMiddleware = require('./middlewares/jwt');
const { TOKEN_SECRET, COOKIE_MAX_AGE, EXPIRY_TIME } = require('./config');

const SignAsync = promisify(jwt.sign);

const users = {};

// return the access token and set the cookie
router.post('/api/login', async (req, res) => {
  const { email, remember } = req.body;

  // sign the jwt
  const token = await SignAsync({ email }, TOKEN_SECRET, {
    expiresIn: EXPIRY_TIME
  });

  // if the user wants to be remembered
  if (remember) {
    // set the cookie with the refresh token
    const refresh_token = crypto.randomBytes(50).toString('base64');

    users[email] = refresh_token;

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      sameSite: true,
      maxAge: COOKIE_MAX_AGE
    });
  }

  return res.json({ token, email });
});

// return data to the user if the token is valid
router.get('/api/user', jwtMiddleware, (req, res) => {
  return res.json({ text: 'Some Data from the server' });
});

// clear cookie and delete the refresh token
router.post('/api/logout', (req, res) => {
  const { email } = req.body;
  if (email) {
    users[email] = '';
    res.clearCookie('refresh_token');

    return res.json({ message: 'ok fine' });
  }

  return res.status(400).json({ error: 'What?' });
});

// refresh token
router.get('/api/token', async (req, res) => {
  const { refresh_token } = req.cookies;
  if (refresh_token) {
    const user = Object.entries(users).find(user => user[1] === refresh_token);

    if (!user) {
      return res.status(401).json({ error: 'Token Expired' });
    }

    // sign a new JWT
    const token = await SignAsync({ email: user[0] }, TOKEN_SECRET, {
      expiresIn: EXPIRY_TIME
    });

    // generate a new refrest token
    const newToken = crypto.randomBytes(50).toString('base64');

    const email = user[0];
    // replace the old one
    users[email] = newToken;

    // set the a new refresh token again
    res.cookie('refresh_token', newToken, {
      httpOnly: true,
      sameSite: true,
      maxAge: COOKIE_MAX_AGE
    });

    return res.json({ token, email });
  }

  return res.status(401).json({ error: 'Token Expired' });
});

router.get('/users', (req, res) => {
  return res.json({ users });
});

module.exports = router;
