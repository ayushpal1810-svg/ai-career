const express= require('express')
const router=express.Router();
const {createprofile, getprofile, updateprofile} = require("../Controllers/profileController")
const authMiddleware = require("../middleware/authmiddleware")

router.post("/",authMiddleware,createprofile);
router.get("/getprofile",authMiddleware,getprofile);
router.put("/",authMiddleware,updateprofile)
module.exports=router;