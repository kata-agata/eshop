const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));// doing parsing of form automatically
app.use(cookieSession({
  keys:['bgvfcrtxchgvtcy']
}))//keys property encrypt information for user id
app.use(authRouter);

app.listen(3000, () => {
  console.log('Listening');
}); // localhost:3000
