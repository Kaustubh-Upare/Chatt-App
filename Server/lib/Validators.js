const {body,validationResult} =require('express-validator');
const { ErrorHandler } = require('../Util/utility');

const validateHandler=(req,res,next)=>{
    const errors=validationResult(req);

    const errorMsgs=errors.array().map((error)=> error.msg).join(",")

    console.log(errors);
    if(errors.isEmpty()) return next();
    else{
        next(new ErrorHandler(errorMsgs,403))
    }
}

const registerValidator=()=>[
    body("name","Please Enter Name").notEmpty(),
    body("username","Please Enter the UserName").notEmpty(),
    body("password","Please Enter the Password").notEmpty(),
    
];
const loginValidator=()=>[
    body("username","Please Enter the UserName").notEmpty(),
    body("password","Please Enter the Password").notEmpty(),
];

const newGroupChatvalidator=()=>[
    body("name","Please Enter THe Name of the Group").notEmpty(),
    body("members")
        .notEmpty()
        .withMessage("Please Enter Members")
        .isArray({min:2})
        .withMessage("Members must be between 2-50")
]



module.exports={registerValidator,validateHandler,loginValidator,newGroupChatvalidator}