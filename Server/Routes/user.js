const express=require("express");
const {login, newUSer, getMyProfile, logout, searchUser, sendFriendRequest, acceptFriendRequest, getAllNotifications, getFriends,getProfileDetails}=require("../Controllers/userController.js");
const  {multerUpload, attachImageUpload} = require("../Middlewares/Multer.js");
const {isAuth} = require("../Middlewares/Auth.js");
const { registerValidator, validateHandler, loginValidator } = require("../lib/Validators.js");

const route=express.Router();

route.post("/new",attachImageUpload.single("avatar")
// ,registerValidator(),validateHandler
,newUSer);
route.post("/login",loginValidator(),validateHandler,login)

// from this onwards isAuth will use
route.use(isAuth)

route.get('/me',getMyProfile)
route.get('/logout',logout)
route.get('/search',searchUser);
route.put('/sendRequest',sendFriendRequest)
route.put('/acceptRequest',acceptFriendRequest)
route.get('/notifications',getAllNotifications)
route.get('/friends',getFriends)
route.get('/profile',getProfileDetails)

module.exports=route