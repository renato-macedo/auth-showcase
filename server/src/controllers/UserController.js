const UserController = {
  index(req, res) {
    return res.json({ text: 'Some Data from the server', email: req.user });
  }
};

module.exports = UserController;
