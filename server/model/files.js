const mongoose=require("mongoose");

const FileSchema=mongoose.Schema({
    userId:String,
    name:String,
    src:String
});
const File=mongoose.model("files",FileSchema,"RawFiles");

module.exports=File;