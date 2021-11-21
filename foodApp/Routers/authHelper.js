const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../secret');

// let flag = true;

function protectRoute(req, res, next) {
    try {
      if (req.cookies.login) { //means hmari cookie jo rakhi hai agar vo hai  toh verify krdege
        console.log('cookies:',req.cookies);  //this is token
        let isVerified = jwt.verify(req.cookies.login, JWT_KEY);
        if (isVerified) {
          next();  
        } else {
          res.json({
            message:"Not Authorized"
          })
        }
      } else {
        res.json({
          message: "Operation Not Allowed",
        });
      }
    } catch (err) {
      return res.json({
        message: err.message,
      });
    }
}
  
module.exports = protectRoute;