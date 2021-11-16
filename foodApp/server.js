const express = require('express');
const app = express();

app.listen('5000', function () {
    console.log("server is listening on 5000");
})

let user = {};

app.get('/', function (req, res) {
    res.send('Home Page');
})
app.get('/user', function (req, res) {
    res.json(user);
});

