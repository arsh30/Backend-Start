const express = require("express");

const authRouter = express.Router();
const userModel = require("../models/usermodel");
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../secret');
const sendMail = require('../nodemailer');

// ===========ROUTES==================
authRouter.route("/signup").post(setCreatedAt, signupUser);

//mounting in express
authRouter
  .route("/forgetPassword")
  .get(getForgetPassword)
  .post(postForgetPassword, validateEmail);

authRouter.route("/login").post(loginUser);

// ========FUNCTIONS============
function setCreatedAt(req, res, next) {
  let obj = req.body;
  let length = Object.keys(obj).length;
  if (length == 0) {
    return res.status(400).json({ message: "cannot create if user is empty" });
  }
  req.body.createdAt = new Date().toISOString();
  next();
}

async function signupUser(req, res) {
  let userObj = req.body; //destructure
  //  user.push({ email, name, password });
  // so instead of this we save the data in database
  try {
    //put all data in database
    // create document im userModel  && email bhjde
   
    let user = await userModel.create(userObj);
    console.log("user", user);
    sendMail(user);  //mail se phle yeh send krdege because hmne sendMail function bnaya
    res.json({
      message: "user Signedup",
      user: userObj,
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: err.message,
    });
  }
}

function getForgetPassword(req, res) {
  //fetch only file
  res.sendFile("/public/forgetPassword.html", { root: __dirname });
}

function postForgetPassword(req, res, next) {
  let data = req.body;

  console.log("data", data);
  next(); //upr pass krege
  //  res.json({
  //     message: "data recieved",
  //     data: data.email
  // })
}
function validateEmail(req, res) {
  console.log("validate function email");
  console.log(req.body);

  //to check email is correct or not means @ hai ya nahi or ya (.com) ho

  res.json({
    message: "data recieved",
    data: req.body,
  });
}

async function loginUser(req, res) {
  try {
    //email or password
    if (req.body.email) {
      let user = await userModel.findOne({ email: req.body.email });
      if (user) {
        if (req.body.password == user.password) {
          let payload = user['_id'];  //user se hmne id nikali
        let token = jwt.sign({id:payload},JWT_KEY);  //3rd option optional hai ie Algorithm kyoki bydefault yeh leta 
          res.cookie("login", token, { httpOnly: true });   //idhr token bhja ab hum jo verify hora tha protect route me verify krege
          return res.json({
            message: "userlogged in",
          });
        } else {
          return res.json({
            message: "email or password is wrong", //if password does not match show this error
          });
        }
      } else {
        return res.json({
          message: "email or password is incorrect",
        });
      }
    } else {
      res.json({
        message: "user is not presented", //now put all these in a try catch block
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

module.exports = authRouter;
