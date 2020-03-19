const router = require('express').Router();
const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const jwt = require('./middlewares/jwt');
router.get('/', (req, res) => {
  return res.send('<h1>Home</h1>');
});

router.post('/login', AuthController.login);
router.get('/user', jwt, UserController.index);

module.exports = router;
