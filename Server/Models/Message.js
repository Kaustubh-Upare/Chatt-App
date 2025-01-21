const mongoose=require("mongoose");
const {Schema}=mongoose;

const msgSchema=new Schema(
{
    
    sender:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    chat:{
        type:Schema.Types.ObjectId,
        ref:"Chat",
        required:true
    },
    content:{
        type:String
    },
    attachments:[
        {
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            }
        }
    ]
    
},{
    timestamps:true
})

module.exports=mongoose.model("Message",msgSchema);