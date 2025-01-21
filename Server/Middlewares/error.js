const errorMiddleware=(err,req,res,next)=>{
    err.message=err.message || "Internal Server Error";
    err.statusCode=err.statusCode || 500;

    return res.status(err.statusCode).json({
        success:"false",
        message:err.message
    })
}


const tryCatcher=(func)=>async(req,res,next)=>{
    try{
        await func(req,res,next);
    }catch(er){
        next(er);
    }
}



module.exports={
    errorMiddleware,tryCatcher
}