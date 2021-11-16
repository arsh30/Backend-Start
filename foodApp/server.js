const express = require('express');
const app = express();

app.listen('5000', function () {
    console.log("server is listening on 5000");
})

app.use(express.json());
app.use(express.static('public')); 
const userRouter = express.Router();  //used to create the router when multiple routes(get,post,patch,delete) has created.Now we specify the route that our this userRouter have and userRouter.route().post()
const authRouter = express.Router();

app.use('/user', userRouter);
app.use('/auth', authRouter);

//mounting in express
userRouter
    .route('/')
    .get(getUser) 
    .post(createUser)
    .patch(updateUser)
    .delete(deleteUser);

userRouter
    .route('/:id')
    .get(getUserbyId)

authRouter
    .route('/signup')
    .post(signupUser);

let user = [];

// A
app.get('/', function (req, res) {  //[server send data to client]
    res.send('Home Page');
})

//(CRUD OPERATION starts)

//read
// app.get('/user', getUser);
function getUser(req, res) {
    res.json(user); //B -> A nd B are same but we write in a different way
}

//post request [client -> server ko data bhjta hai or and the data comes in the request]
//means create

// app.post('/user', createUser);
function createUser(req, res) {
    user = req.body;
    console.log(req.body);
    res.send("data has been added successfully")
}

//patch req  [it will update by adding something]

// app.patch('/user', updateUser);
function updateUser (req, res) {  
    let obj = req.body;   
    for (let key in obj) {  
        user[key] = obj;   
                            
    }
    res.json(user)
};
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
    console.log('user', req.body);
    res.json({
        message: "user Signedup",
        user: req.body 
    })
}


