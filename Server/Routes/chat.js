const express=require("express");
const {isAuth} = require("../Middlewares/Auth.js");
const { newGroupChat, getMyChat, getMyGroups, addMembers, removeMembers, leaveGroup ,sendAttachments, getChatDetails, renameGroup, deleteGroup, getMsgs} = require("../Controllers/chatController.js");
const { attachmentsMulter, attachyMulter } = require("../Middlewares/Multer.js");
const { newGroupChatvalidator, validateHandler } = require("../lib/Validators.js");

const route=express.Router();


// from this onwards isAuth will use
route.use(isAuth)


route.post('/new',newGroupChatvalidator(),validateHandler,newGroupChat);
route.get('/my',getMyChat);
route.get('/my/groups',getMyGroups)
route.put('/addmembers',addMembers)
route.put('/removemembers',removeMembers)

route.delete('/leave/:id',leaveGroup)
route.post('/message',attachyMulter,sendAttachments)

route.get('/message/:id',getMsgs)


route.route('/:id')
    .get(getChatDetails)
    .put(renameGroup)
    .delete(deleteGroup)


module.exports=route