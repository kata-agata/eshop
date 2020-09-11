const express = require('express');
const usersRepo = require('../../repositories/users');

const router = express.Router();

//req - request
//res - response
router.get('/signup', (req, res) => {
  res.send(`
      <div>
        Your id is: ${req.session.userId}
        <form method="POST">
          <input name="email" placeholder="email"/>
          <input name="password" placeholder="password"/>
          <input name="passwordConfirmation" placeholder="password confirmation"/>
          <button>Sign up</button>
        </form>
      </div>
    `); // resposne send
});

//with library bodyParser
router.post('/signup', async (req, res) => {
  const {email, password, passwordConfirmation } = req.body;
  const existingUser = await usersRepo.getOneBy({email});
  if(existingUser){
    return res.send('Email in use');
  }

  if(password !== passwordConfirmation){
    return res.send('passwords must much');
  }

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
  res.send(`
    <div>

      <form method="POST">
        <input name="email" placeholder="email"/>
        <input name="password" placeholder="password"/>
        <button>Sign in</button>
      </form>
    </div>
    `);
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
