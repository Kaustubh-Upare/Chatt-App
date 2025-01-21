const mongoose=require("mongoose");
const {Schema}=mongoose;

const reqSchema=new Schema(
{
    
    status:{
        type:String,
        default:"pending",
        enum:["pending","accepted","rejected"],
    },
    sender:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    reciever:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
    
},{
    timestamps:true
})

module.exports=mongoose.model("Request",reqSchema);