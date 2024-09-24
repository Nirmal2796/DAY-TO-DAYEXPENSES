const express=require('express');

const router=express.Router();

const userController=require('../controller/user');


router.post('/signup',userController.postSignupUser);

router.post('/login',userController.postLoginUser);

router.get('/logout',userController.getLogoutUser);


module.exports=router;