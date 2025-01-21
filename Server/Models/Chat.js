const mongoose=require("mongoose");
const {Schema}=mongoose;

const chatSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    groupChat:{
        type:Boolean,
        default:false,
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    members:[
        {
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    ]
},{
    timestamps:true
})

module.exports=mongoose.model("Chat",chatSchema);