const express=require("express")
const router=express.Router();
const multer=require("multer")
const fetchUser=require("./middleware/fetchUser")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './server/my-uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

router.post("/upload",fetchUser,upload.single("userFile"),(req,res)=>{
    console.log(req.body)
    console.log(req.file)
    // res.send({msg:"File Sent"})
    // res.redirect("localhost:5173/upload")

})

module.exports=router;