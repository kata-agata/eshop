const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));// doing parsing of form automatically
app.use(cookieSession({
  keys:['bgvfcrtxchgvtcy']
}))//keys property encrypt information for user id

//req - request
//res - response
app.get('/signup', (req, res) => {
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
app.post('/signup', async (req, res) => {
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

app.get('/signout', (req,res)=>{
  req.session = null; //forget all information inside cookie
  res.send('You are loged out');
});

app.get('/signin', (req,res)=>{
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

app.post('/signin', async (req,res)=>{
  const {email, password} = req.body;
  const currUser = await usersRepo.getOneBy({email});


  if(!currUser){
    res.send('User does not exist');
  }

  if(currUser.password !== password){
    res.send('wrong password');
  }

  req.session.userId = currUser.id;
  res.send('you are logged');
});

app.listen(3000, () => {
  console.log('Listening');
}); // localhost:3000
