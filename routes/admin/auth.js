const express = require('express');
const {check, validationResult} = require('express-validator'); // we dont have to write expressValidator.check
const usersRepo = require('../../repositories/users');
const signinTemplate = require('../../views/admin/auth/signin');
const signupTemplate = require('../../views/admin/auth/signup');

const router = express.Router();

//req - request
//res - response
router.get('/signup', (req, res) => {
  res.send(signupTemplate({req})); // resposne send
});

//with library bodyParser
router.post('/signup', [
  check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be valid email')
    .custom(async email => {
      const existingUser = await usersRepo.getOneBy({email});
      if(existingUser){
        throw new Error('Email in use');
      }
    }),
  check('password')
    .trim()
    .isLength({min:4, max:20})
    .withMessage('Must be between 4 and 20 characters'),
  check('passwordConfirmation')
    .trim()
    .isLength({min:4, max:20})
    .withMessage('Must be between 4 and 20 characters')
    .custom((passwordConfirmation, {req}) => { //{req} is same as obj.req
      if(passwordConfirmation !== req.body.password){
        throw new Error('Passwords must much');
      }
    }),
],
async (req, res) => {
  const errors = validationResult(req);
  console.log(errors);
  const {email, password, passwordConfirmation } = req.body;





  //create user in user repo
  const user = await usersRepo.create({email, password});// method create return attrs

  //store id inside users cookie
  //req.session === {} // added by cookieSession
  req.session.userId = user.id;//userId is name, so it can be any other name like userNumber


  res.send('account created');
});

router.get('/signout', (req,res)=>{
  req.session = null; //forget all information inside cookie
  res.send('You are loged out');
});

router.get('/signin', (req,res)=>{
  res.send(signinTemplate());
});

router.post('/signin', async (req,res)=>{
  const {email, password} = req.body;
  const currUser = await usersRepo.getOneBy({email});


  if(!currUser){
    res.send('User does not exist');
  }

  const validPassword = await usersRepo.comparePasswords(currUser.password,password);

  if(!validPassword){
    res.send('wrong password');
  }

  req.session.userId = currUser.id;
  res.send('you are logged');
});

module.exports = router;
