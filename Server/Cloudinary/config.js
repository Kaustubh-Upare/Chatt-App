const cloudinary=require('cloudinary').v2
const {v4:uuid}=require('uuid')
const { ErrorHandler } = require('../Util/utility')


cloudinary.config({
    cloud_name:"dverurr4w",
    api_key:"937462588262341",
    api_secret:"cIp9MY_gE3R_FlfG6KTGVculRBM",
})

const uploadToCloudinary=async(files)=>{
    const UploadPromises=files.map((fil)=>{
        return new Promise((resolve,reject)=>{
            console.log(fil.path)

             cloudinary.uploader.upload(
                fil.path,{
                    resource_type:"auto",
                    public_id:uuid()
                },(error,result)=>{
                    if(error) {
                        return reject(error);
                    }
                    resolve(result)
                }
            )
        
        })
    })

    try {
        const results=await Promise.all(UploadPromises);   
        
        const formattedResult=results.map((e)=>({
            public_id:e.public_id,
            url:e.secure_url
        }))
        return formattedResult;
    } catch (error) {
        console.error("Once again Error uploading files:", error)
        throw new ErrorHandler("Error Uploading Files to CLoudinary")
    }

}

module.exports={cloudinary,uploadToCloudinary}