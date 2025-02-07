const express=require('express');
const { userAdmin, userMsgs, userDashboard, AdminLogin,AdminLogout, getAdminData } = require('../Controllers/adminController');
const { adminAuth } = require('../Middlewares/Auth.js');

const route=express.Router();

route.post("/verify",AdminLogin);
route.get('/logout',AdminLogout)

route.use(adminAuth);

route.get("/",getAdminData);
route.get("/user",userAdmin);
route.get("/message",userMsgs);
route.get('/dashboard',userDashboard)


module.exports=route;