const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const router = require('express').Router();

const jwtMiddleware = require('./middlewares/jwt');
const { TOKEN_SECRET, COOKIE_MAX_AGE } = require('./config');

const SignAsync = promisify(jwt.sign);

// POST /login
// PUBLIC
// return the access token and set the cookie
router.post('/login', async (req, res) => {
  const { email, remember } = req.body;

  // sign the jwt
  const token = await SignAsync({ email }, TOKEN_SECRET, {
    expiresIn: '10s'
  });

  if (remember) {
    // set the cookie with the refresh token, the content does not matter
    res.cookie('refresh_token', email, {
      httpOnly: true,
      sameSite: true,
      maxAge: COOKIE_MAX_AGE
    });
  }

  return res.json({ token });
});

// GET /user
// PRIVATE
// return data to the user if the token is valid
router.get('/user', jwtMiddleware, (req, res) => {
  return res.json({ text: 'Some Data from the server', email: req.user });
});

// GET /logout
// PUBLIC
// clear cookie
router.get('/logout', (req, res) => {
  res.clearCookie('refresh_token');
  return res.json({ message: 'ok' });
});

// GET /token
// PUBLIC
// refresh token
router.get('/token', async (req, res) => {
  const { refresh_token } = req.cookies;
  if (refresh_token) {
    // generate the access token
    const token = await SignAsync({ email: refresh_token }, TOKEN_SECRET, {
      expiresIn: '10s'
    });

    // set the a new refresh token again
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      sameSite: true,
      maxAge: COOKIE_MAX_AGE
    });

    return res.json({ token });
  }

  return res.status(401).json({ error: 'Token Expired' });
});

router.all('*', (req, res) => {
  res.status(404).send('NOT FOUND');
});

module.exports = router;
