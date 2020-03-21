const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use(express.static('../client/build'));

app.use(require('./routes'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve('..', 'client', 'build', 'index.html'));
});
const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
