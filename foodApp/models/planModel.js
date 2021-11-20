const { Mongoose } = require("mongoose");

const planSchema = Mongoose.Schema({
    id: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: true,        
    },
    rating: {
        type: Number,
    },
    price: {
        type: Number,
        require: true,  
    },
    delivery: {
        type:Boolean,
    },
    meals: {
        type:Number,
    },
    description: {
        type:String,
    }
})