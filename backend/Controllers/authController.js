const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User= require("../models/user")



const register=async (req,res)=>{
    try {
        const{ name , email , password} = req.body;
        const hashedpassword = await bcrypt.hash(password,10)
        const verifyuser = await User.findOne({email});
        if(verifyuser) {
            return res.status(400).json({
                message:"user already exist",
            });
        }

        const user= new User({
            name:name,
            email:email,
            password:hashedpassword,
        });
        await user.save();
        res.status(201).json({
            message : "user registered successfully",
            user,
        })
    } catch (error) {
        res.status(501).json({
            message: error.message,
        });
    }
}

const login = async (req, res) => {
    console.log("login controller working")
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const iscorrectpassword= await bcrypt.compare(password,user.password)
        if (!iscorrectpassword) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }
        console.log(process.env.JWT_SECRET);
        const token=jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn:"3h"}
        )
        res.status(200).json({
            
            message: "User logged in successfully",
            token:token,

        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
module.exports={register , login}