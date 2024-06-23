const { Router } = require("express");
const User=require('../model/user')
const router=Router();
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

router.post('/signup',async (req,res)=>{
    let login=false; 
    try {
        const {username,email,password}=req.body;
        const isEmail = await User.findOne({email});
        if(!isEmail){
            const files=[
                {
                    "name": "My_Vista",
                    "type":"",
                    "isFolder": true,
                    "children": [],
                    "address":"My_Vista/"
                },
                {
                    "name": "Assets",
                    "type":"",
                    "isFolder": true,
                    "children": [],
                    "address":"Assets/"
                }
            ]
            const secPassword= await bcrypt.hash(password,10)
            const user=new User({username,email,password:secPassword,files});
            await user.save();
            const data={
                name:user.name,
                email:user.email
            }
            login=true;
            const authToken= jwt.sign(data,process.env.SEC_KEY)
            res.send({msg:"User created succesfully", authToken,login})
        }
        else{
            res.json({msg:"Email already exist!!",login})
        }
    } catch (error) {
        res.send({msg:"Internal Server Error, Try again later!!",login})
        console.log(error)
    }
})

router.post('/login',async (req,res)=>{
    let login=false; 
    try {
        const {email,password}=req.body;
        const oldUser = await User.findOne({email});
        if(oldUser){
            const checkPass= bcrypt.compareSync(password,oldUser.password);
            if(checkPass){
                const data={
                    name:oldUser.name,
                    email:oldUser.email
                }
                login=true;
                const authToken= jwt.sign(data,process.env.SEC_KEY)
                res.send({msg:"You have succesfully logged in !!", authToken,login})
            }else{
                res.json({msg:"Wrong Password",login})
            }
        }
        else{
            res.json({msg:"Wrong Email Id",login})
        }
    } catch (error) {
        res.send({msg:"Internal Server Error, Try again later!!",login})
        console.log(error)
    }
})

router.get("/getUser",async (req,res)=>{
    try {
        const authToken=req.headers.authtoken;
        const checkToken=jwt.verify(authToken,process.env.SEC_KEY)
        if(checkToken){
            const user=await User.find({"email":checkToken.email})
            res.status(200).send({"user":user[0]});
        }
    } catch (error) {
        res.send({"msg":"Something went wrong"})
        console.log(error)
    }
})
router.put("/updateUser",async(req,res)=>{
    try {
        const authToken=req.headers.authtoken;
        const checkToken=jwt.verify(authToken,process.env.SEC_KEY)
        if(!checkToken) res.status(401).json({success:false,msg:"Unauthorized Access!! Please Login first!"})
        else{
            const {username,email,password}=req.body;
            const checkUser=await User.find({"email":checkToken.email})
            if(!checkUser) res.status(404).json({success:false,msg:"User doesn't exists !!"})
            else{
                let secPass=checkUser.password;
                if(password!="") secPass=bcrypt.hashSync(password,bcrypt.genSaltSync(10));
                const updUser= await User.findOneAndUpdate({email},{$set:{username,email,password:secPass}},{new:true});
                if(updUser.email) res.status(200).send({success:true,msg:"Updated Successfully!"})
            }     
        }
    } catch (error) {
        res.send({"msg":"Something went wrong"})
        console.log(error)
    }
})


module.exports=router