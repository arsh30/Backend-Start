const express = require('express');
const app = express();

app.listen('5000', function () {
    console.log("server is listening on 5000");
})

app.use(express.json()); 
let user = {};

app.get('/', function (req, res) {  //[server send data to client]
    res.send('Home Page');
})
app.get('/user', function (req, res) {
    res.json(user);
});

//post request [client -> server ko data bhjta hai or and the data comes in the request]
app.post('/user', function (req, res) {
    user = req.body;
    console.log(req.body);
    res.send("data has been added successfully")
})

//patch req  [it will update by adding something]
app.patch('/user', function (req, res) {  
    let obj = req.body;   
    for (let key in obj) {  
        user[key] = obj;   
                            
    }
    res.json(user)
})

//delete req
app.delete('/user', function (req, res) {
    user = {};
    res.json(user);
})