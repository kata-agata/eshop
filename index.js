const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts')


const app = express();

app.use(express.static('public'));// if there is a request e.g main.css it is looking in public directory, every static request is checked here
app.use(bodyParser.urlencoded({extended: true}));// doing parsing of form automatically
app.use(cookieSession({
  keys:['bgvfcrtxchgvtcy']
}))//keys property encrypt information for user id
app.use(authRouter);
app.use(adminProductsRouter);
app.use(productsRouter);
app.use(cartsRouter);

app.listen(3000, () => {
  console.log('Listening');
}); // localhost:3000
