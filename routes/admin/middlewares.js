const {validationResult} = require('express-validator');
//all middlewares must be functions
//next is reference
module.exports = {
  handleErrors(templateFunc) {
    return (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.send(templateFunc({errors}));
      }
      next();
    };
  }
};
