const jwt=require("jsonwebtoken")
require("dotenv").config();

const fetchUser=async (req,res,next)=>{
    const token=req.header("authToken");
    if(!token) res.status(401).json({msg:"Unauthorized access"})
    else{
        try {
            const data= jwt.verify(token,process.env.JWT_SECRET)
            req.user=data;
            next();
        } catch (error) {
            res.send({msg:"Something went wrong"})
        }
    }
}

module.exports=fetchUser