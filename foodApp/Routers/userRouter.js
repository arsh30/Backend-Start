const express = require("express");
const userModel = require("../models/usermodel");
const userRouter = express.Router();

//router
userRouter
  .route("/")
  .get(protectRoute,getUsers)  //protect route is the middle ware that the check the user has logged in or not
  .post(createUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/:id").get(getUserbyId);

//(CRUD OPERATION starts)
//read
async function getUsers(req, res) {
  //it will give all user present in db
  try {
    console.log("getUser called");
    let users = await userModel.find(); //find : it will give all the user which are present in the Db
    if (users) {
      //jo managwaya hai json data me aayega
      return res.json(users);
    } else {
      return res.json({
        message: "user not found",
      });
    }
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
}

//post request [client -> server ko data bhjta hai or and the data comes in the request]
//means create
// app.post('/user', createUser);
function createUser(req, res) {
  user = req.body;
  console.log(req.body);
  res.send("data has been added successfully");
}

//patch req  [it will update by adding something]
// app.patch('/user', updateUser);
function updateUser(req, res) {
  let obj = req.body;
  for (let key in obj) {
    user[key] = obj;
  }
  res.json(user);
}
//delete req
// app.delete('/user', deleteUser);
function deleteUser(req, res) {
  user = {};
  res.json(user);
}

//parameter route
// app.get('/user/:id', getUserbyId);
function getUserbyId(req, res) {
  console.log(req.params);
  res.send(req.params);
}

let flag = false;
function protectRoute(req, res, next) {
  try {
    if (flag) {
      //means if flag has true then only logged in
      next();
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
module.exports = userRouter;
