const layout = require('../layout');

const getError = (errors, prop) => {
  //prop === 'email' || 'password' || 'passwordConfirmation'
  try {
    //errors.mapped() === { email: {msg:'Invalid email'}, password: {msg: 'password too short'}, passwordConfirmation: {msg:'passwords must match'}}
    return errors.mapped()[prop].msg; //return the message
  } catch (err) {
    return ''; //cheat, when errors doesnt exist return empty string
  }
};


module.exports = ({req,errors}) => {
  return layout({
    content: `
      <div>
        Your id is: ${req.session.userId}
        <form method="POST">
          <input name="email" placeholder="email"/>
          ${getError(errors, 'email')}
          <input name="password" placeholder="password"/>
          ${getError(errors, 'password')}
          <input name="passwordConfirmation" placeholder="password confirmation"/>
          ${getError(errors, 'passwordConfirmation')}
          <button>Sign up</button>
        </form>
      </div>
    `
  });
};
