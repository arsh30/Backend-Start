const mongoose = require('mongoose');
const {db_link} = require('../secret');

const validator = require("email-validator");

mongoose.connect(db_link).then(function () {
    console.log("db is connected");
})
    .catch(function (err) {
    console.log(err);
    })

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,  //means dalna hi pdhega   
    },
    age: {
        type: Number,
    },
    email: {     
        type: String,   
        require: true,
        unique: true,
        validate: function () {  
        return   validator.validate(this.email); // true            
        }
    }, createdAt: {
        type:String  //coz hm chahte h yeh mongo pr show ho
    },
    password: {
        type: String,
        require: true,
        min: 8,   //this is validation
    },
    confirmPassword: {
        type: String,
        require: true,
        min: 8,
        validate: function () {
            return this.password = this.confirmPassword  //agar sahi hoga to return krdega
        }
    }
});

//hooks -> pre is mongoose concept and express is middleware concept
userSchema.pre('save', function () {  //save is a event listner
    this.confirmPassword = undefined;   
})

// #make model
const userModel = mongoose.model('userModel', userSchema); 


// (async function createUser() { 
//     let user = {
//         name: " arsh",
//         age: 20,
//         email: "as3@gmail.com",
//         password: 12345678,
//         confirmPassword: 12345678
//     };
//     console.log(userObj);
// })()

// createUser(); 

//export the user modal file
module.exports = userModel;