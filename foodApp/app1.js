//install -> npm init -y
// npm i express
// npm i nodemon -g
const express = require("express");
const app = express();

//server create
let port = "7080";
app.listen(port, function () {
    console.log("server is started");
})


//BASIC FUNCTIONS START CRUD
//types of request -> get,post,patch,delete

app.get('/', function (req, res) {    
    // console.log(req);   //req is also a object
    console.log(req.path);
    console.log(req.hostname);
    console.log(req.method);
    console.log("hello from home page");
    res.send('<h1>hello hi from backend </h1>');     //we send the html also,automatically append in html 
})

let obj = {
    "name" : "Arshdeep Singh"  
}
app.get('/user', function (req, res) {
    res.send(obj);
    // res.json(obj);  both are same send and json
})

// TO SEND WHOLE HTML FILE from frontend
app.get('/home', function (req, res) {
    // res.sendFile("C:\Users\HP\Desktop\Backend\foodApp\views\index.html");  //isme hm full path bhjte hai folder ka  -> copy relative path
    res.sendFile('./views/index.html', { root: __dirname });
})


