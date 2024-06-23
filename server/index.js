const express=require('express');
const app= express();
const dotenv=require('dotenv')
const cors=require('cors')
dotenv.config({ path: './.env'});

app.use(cors())

const connectDB=require('./connetToDb/connect')
connectDB(process.env.MONGO_URI)

app.use(express.json(express.urlencoded({extended:false})))
app.use("/api/auth",require('./api/user'));
app.use("/api/file",require("./api/file"))


app.listen(3000,()=>{
    try {
        console.log("Server is successfully runnig on port 3000")
    } catch (error) {
        console.log(error)
    }
})