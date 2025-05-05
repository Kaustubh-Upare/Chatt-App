const cloudinary=require('cloudinary').v2
const {v4:uuid}=require('uuid')
const { ErrorHandler } = require('../Util/utility')


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
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