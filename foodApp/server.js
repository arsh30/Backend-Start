const express = require("express");
const app = express();

app.listen("5000", function () {
  console.log("server is listening on 5000");
});

app.use(express.json());
app.use(function (req, res,next) {  //this middleware aate hi run hojega or niche kuch chlega hi nhi ab isme 3rd parameter hot hai next
   //do some work
    console.log("i am a middleware function");
    next();  //yeh next krne se next function execute hojega
});

app.use(express.static("public"));
const userRouter = express.Router(); 
const authRouter = express.Router();

// app.use(function (req, res,next) { 
//     //do some work
//      console.log("i am a middleware function 2nd time");
//      next(); 
// });
 
app.use("/user", userRouter);
app.use("/auth", authRouter);

//mounting in express
userRouter
  .route("/")
  .get(getUser)
  .post(createUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter
    .route("/:id")
    .get(getUserbyId);

authRouter
    .route("/signup")
    .post(signupUser);

authRouter
    .route('/forgetPassword')
    .get(getForgetPassword)
    .post(postForgetPassword,validateEmail);

let user = [];

// A
app.get("/", function (req, res) {
  //[server send data to client]
  res.send("Home Page");
});

//(CRUD OPERATION starts)

//read
// app.get('/user', getUser);
function getUser(req, res) {
  console.log("getUser called");
    res.json(user); //B -> A nd B are same but we write in a different way
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

function signupUser(req, res) {
  // let userDetails = req.body;
  // let name = userDetails.name;
  // let email = userDetails.email;
  // let password = userDetails.password;
  let { email, name, password } = req.body;
  user.push({ email, name, password });
  console.log("user", req.body);
  res.json({
    message: "user Signedup",
    user : req.body,  
  });
}

function getForgetPassword(req, res) {  //fetch only file
    res.sendFile('/public/forgetPassword.html', { root: __dirname });
}
function postForgetPassword(req, res , next) {
    let data = req.body;

    console.log('data', data);
    next(); //upr pass krege
    //  res.json({
    //     message: "data recieved",
    //     data: data.email  
    // })
}

function validateEmail(req, res) { 
    console.log('validate function email');
    console.log(req.body);

    //to check email is correct or not means @ hai ya nahi or ya (.com) ho
 
    res.json({
        message: "data recieved",
        data: req.body
    })
}

//Redirect
app.get("/user-all", function (req, res) {
  res.redirect("/user");
});

//404 Page
app.use(function (req, res) {
  res.sendFile("./public/404.html", { root: __dirname });
});
