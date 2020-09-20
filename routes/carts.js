const express = require('express');
const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');
const cartShowTemplate = require('../views/carts/show');

const router = express.Router();


//post when clicking 'add to cart' button
router.post('/cart/products', async (req,res)=>{
  //Figure out the cart
  let cart;
  if(!req.session.cartId){
    //if there is no cart create a new one`
    cart = await cartsRepo.create({ items: [] });
    //store cartId on the req.session.cartId
    req.session.cartId = cart.id;
  } else {
    //we have cart, lets get it from repository
    cart = await cartsRepo.getOne(req.session.cartId);
  }

  //increment quantity for existing product
  const existingItem = cart.items.find(item => item.id === req.body.productId);
  if(existingItem){
    //increment quantity and save cart
    existingItem.quantity++;
  }else{
    //add new product
    cart.items.push({id: req.body.productId, quantity:1 });
  }
  await cartsRepo.update(cart.id, {
    items: cart.items
  });

  //or add new item do the cart

  console.log(cart);
  res.send('product added to cart');
});



//get to show all items in our cart
router.get('/cart', async (req,res) =>{
  //when no existing cart, go to products list
  if(!req.session.cartId){
    return res.redirect('/');
  }

  const cart = await cartsRepo.getOne(req.session.cartId);

  for(let item of cart.items){
    const product = await productsRepo.getOne(item.id);

    item.product = product;
  }

  res.send(cartShowTemplate({items: cart.items}));
});

//delete button to delete item inside cart


module.exports = router;
