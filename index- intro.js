const express = require('express');

const app = express();


//req - request
//res - response
app.get('/', (req, res) => {
  res.send(`
      <div>
        <form method="POST">
          <input name="email" placeholder="email"/>
          <input name="password" placeholder="password"/>
          <input name="passwordConfirmation" placeholder="password confirmation"/>
          <button>Sign up</button>
        </form>
      </div>
    `); // resposne send
});

const bodyParser = (req, res, next) => {
    if (req.method === 'POST') {
      req.on('data', data => {
          const parsed = data.toString('utf-8').split('&');
          const formData = {};
          for (let pair of parsed) {
            const [key, value] = pair.split('=');
            formData[key] = value;
          }
          req.body = formData;
          next();
        });
      }
      else {
        next(); // gives us callback that everything is done
      };
    }; //inspect and modify req, res
    //next is callback function
    //bodyParser is middeware, do this, and then can go to other functions

    app.post('/', bodyParser, (req, res) => {
      //get access to email and password
      // req.on('data', data => {
      //   //console.log(data);// buffer is loged, hex values
      //   //console.log(data.toString('utf-8'));//query string
      //   const parsed = data.toString('utf-8').split('&');
      //   const formData = {};
      //   for (let pair of parsed){
      //     const [key, value] = pair.split('=');
      //     formData[key]=value;
      //   }
      //   console.log(formData);
      // }); // on is addEventListener, data is event
      console.log(req.body);


      res.send('account created');
    });

    app.listen(3000, () => {
      console.log('Listening');
    }); // localhost:3000
