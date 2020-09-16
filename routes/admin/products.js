const express = require( 'express');
const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
<<<<<<< Updated upstream
=======
const productsIndexTemplate = require('../../views/admin/products/index');
const productsEditTemplate = require('../../views/admin/products/edit');
>>>>>>> Stashed changes
const {requireTitle, requirePrice} = require('./validators');
const multer = require('multer');
const {handleErrors} = require('./middlewares');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/admin/products', (req,res)=>{

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

<<<<<<< Updated upstream
  res.send('submitted')
})
=======
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

});
>>>>>>> Stashed changes


module.exports = router;
