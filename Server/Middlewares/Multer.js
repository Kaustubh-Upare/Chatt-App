const multer=require("multer");
const path = require('path');
const { ErrorHandler } = require("../Util/utility");

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        const uploadDir=path.join(__dirname,'..','Temp');
        return cb(null,uploadDir);
    },
    filename:function(req,file,cb){
        return cb(null,file.fieldname + "-" + Date.now()+"-"+file.originalname)
    }
})

const multerUpload=multer({
    limits:{fileSize:1024*1024*10}
})

const attachImageUpload=multer({
    storage,
    limits:{
        fileSize:1024*1024*10
    }
    ,fileFilter:(req,file,cb)=>{
        if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' ){
            cb(null,true);
        }else{
            return cb(new ErrorHandler("Invalid Image Please upload jpg,jpeg or png only",404));
        }
    },
    
})

const attachyMulter=attachImageUpload.array("Afiles",5)

const attachmentsMulter=multerUpload.array('files',5);

module.exports={multerUpload,attachmentsMulter,attachyMulter}