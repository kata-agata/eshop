const express = require( 'express');
const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
<<<<<<< HEAD
const productsIndexTemplate = require('../../views/admin/products/index');
const productsEditTemplate = require('../../views/admin/products/edit');
=======
<<<<<<< Updated upstream
=======
const productsIndexTemplate = require('../../views/admin/products/index');
const productsEditTemplate = require('../../views/admin/products/edit');
>>>>>>> Stashed changes
>>>>>>> 2097d6f0f2460e5387ceb4946d42709c26df33ec
const {requireTitle, requirePrice} = require('./validators');
const multer = require('multer');
const {handleErrors, requireAuth} = require('./middlewares');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/admin/products',
requireAuth,
async(req,res)=>{
  const products = await productsRepo.getAll();

  res.send(productsIndexTemplate({products,errors}));
});

router.get('/admin/products/new', (req,res)=>{
  res.send(productsNewTemplate({}));
});

router.post('/admin/products/new',
upload.single('image'),
[
  requireTitle,
  requirePrice
],
handleErrors(productsNewTemplate),
async (req,res) => {
  const image = req.file.buffer.toString('base64');
  const { title, price } = req.body;

  await productsRepo.create({ title, price, image });

<<<<<<< HEAD
=======
<<<<<<< Updated upstream
  res.send('submitted')
})
=======
>>>>>>> 2097d6f0f2460e5387ceb4946d42709c26df33ec
  res.redirect('/admin/products');
});

// :id is a wild card for id
router.get('/admin/products/:id/edit', requireAuth,
async (req,res) => {
  const product = await productsRepo.getOne(req.params.id);

  if(!product) {
    return res.send('Product not found');
  }

  res.send(productsEditTemplate({product}));
<<<<<<< HEAD
=======

});
>>>>>>> Stashed changes
>>>>>>> 2097d6f0f2460e5387ceb4946d42709c26df33ec

});

router.post('/admin/products/:id/edit',
  requireAuth,
  upload.single('image'),
  [requireTitle,requirePrice],
  handleErrors(productsEditTemplate),
async (req,res) => {

});

module.exports = router;
