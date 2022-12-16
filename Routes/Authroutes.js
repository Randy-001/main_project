const express=require('express');
const authcontroller=require('../controllers/Authcontroller');
const router=express.Router();
router.get('/',authcontroller.home);
router.get('/signup',authcontroller.signup);
router.post('/register',authcontroller.register)
router.post('/login',authcontroller.login)
module.exports=router;