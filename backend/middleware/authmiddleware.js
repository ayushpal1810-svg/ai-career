const jwt = require("jsonwebtoken");
const authMiddleware= (req,res,next)=>{
    try {
        
   
const authorizationheader=req.headers.authorization;
if(!authorizationheader){
    return res.status(401).json({
        message:"authorization not done"
    })}
   const token= authorizationheader.split(" ")[1];
   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   req.user = decoded;
   next();

 } catch (error) {
        return res.status(401).json( {
            message: "invalid or expired token",
        }
        )
    } 
}





module.exports = authMiddleware;