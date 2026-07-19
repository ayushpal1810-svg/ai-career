const mongoose=require('mongoose')
const userschema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
    type: String,
    required: true,
    validate: {
        validator: function(value) {
            return /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(value);
        },
        message: "Password must be at least 8 characters and contain one uppercase letter and one number and one special character(!@#$%^&*)"
    }
}


})
module.exports= mongoose.model("user",userschema)