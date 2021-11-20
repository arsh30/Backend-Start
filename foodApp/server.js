const express = require("express");
const app = express();

app.listen("5000", function () {
  console.log("server is listening on 5000");
});

app.use(express.json());

app.use(function (req, res,next) {  //this middleware aate hi run hojega or niche kuch chlega hi nhi ab isme 3rd parameter hot hai next
   //do some work
    console.log("i am a middleware function");
    next(); 
});

app.use(express.static("public"));

const userRouter = require('./Routers/userRouter');
const authRouter = require('./Routers/authRouter');


// app.use(function (req, res,next) { 
//     //do some work
//      console.log("i am a middleware function 2nd time");
//      next(); 
// });
 
app.use("/user", userRouter);  //midleware
app.use("/auth", authRouter);

let user = [];

// A
app.get("/", function (req, res) {
  //[server send data to client]
  res.send("Home Page");
});

const userModel = require('./models/usermodel');

function getForgetPassword(req, res) {  //fetch only file
  res.sendFile('/public/forgetPassword.html', { root: __dirname });
}

//Redirect
app.get("/user-all", function (req, res) {
  res.redirect("/user");
});

//404 Page
app.use(function (req, res) {
  res.sendFile("./public/404.html", { root: __dirname });
});
