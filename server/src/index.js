const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use(express.static('../client/build'));
app.use(require('./routes'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
  console.log(`Server running on http://127.0.0.1:${PORT}`)
);
