const express = require('express');
const {handleErrors} = require('./middlewares');
const usersRepo = require('../../repositories/users');
const signinTemplate = require('../../views/admin/auth/signin');
const signupTemplate = require('../../views/admin/auth/signup');
const {
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  requireEmailExists,
  requireValidPasswordForUser
} = require('./validators');

const router = express.Router();

//req - request
//res - response
router.get('/signup', (req, res) => {
  res.send(signupTemplate({req})); // resposne send
});

//with library bodyParser
router.post('/signup', [
  requireEmail,
  requirePassword,
  requirePasswordConfirmation
],
handleErrors(signupTemplate),
async (req, res) => {

  const {email, password } = req.body;

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
  res.send(signinTemplate({}));
});

router.post('/signin', [
  requireEmailExists,
  requireValidPasswordForUser
],
handleErrors(signinTemplate),
async (req,res)=>{
  const {email} = req.body;
  const currUser = await usersRepo.getOneBy({email});

  req.session.userId = currUser.id;
  res.send('you are logged');
});

module.exports = router;
