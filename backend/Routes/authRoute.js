const express=require('express');
const router=express.Router();
const authMiddleware = require("../middleware/authmiddleware")
const {register , login} = require("../Controllers/authController");
router.post("/register",register)

// router.post("/login",login)
router.post("/login", (req,res)=>{
    console.log("login route reached");
    login(req,res);
});
router.get("/profile",authMiddleware , (req,res)=>{
    res.json({
        message:"profile data",
        user:req.user,
    })
})

module.exports=router;