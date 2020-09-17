const {validationResult} = require('express-validator');
//all middlewares must be functions
//next is reference
module.exports = {
  handleErrors(templateFunc, dataCb) {
    return async (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        let data = {}; // to prevent undefined

        if(dataCb){
          data = await dataCb(req);
        }

        return res.send(templateFunc({errors, ...data}));
      }
      next();
    };
  },
  requireAuth(req, res, next) {
    if (!req.session.userId) {
      return res.redirect('/signin');
    }

    next();
  }
};
