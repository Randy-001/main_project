const Auth=require('../models/auth');
const hash=require('../Hashing')
const home=(req,res)=>{
    res.render('login');
}
const register=(req,res)=>{
    
    req.body.password=hash(req.body.password)
    //console.log(req.body)
    const auth= new Auth(req.body);
  auth.save()
    .then(result => {
        console.log(result)
      res.redirect('otp');
    })
    .catch(err => {
      console.log(err);
    });
}
const signup=(req,res)=>{
    res.render('register');
}
const login=(req,res)=>{
    req.body.password=hash(req.body.password)
    Auth.find(req.body,function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            console.log("First function call : ", docs);
        }
    })
    res.render('otp')
}
module.exports={
    home,
    register,
    signup,
    login
}