const Auth=require('../models/auth');
const hash=require('../Hashing')
var gen = require('random-seed');

require('dotenv').config()

const home=(req,res)=>{
    res.render('login');
}
const register=(req,res)=>{
    
    req.body.password=hash(req.body.password)
     console.log(req.body)
    const auth= new Auth(req.body);
  auth.save()
    .then(result => {
        console.log(result)
        let h=req.body.geolocation.split(",")
      res.render('otp',{location:h[0],phonenumber:req.body.phonenumber});
    })
    .catch(err => {
      console.log(err);
    });
}
const signup=(req,res)=>{
    res.render('register',{sec:""});
}
const login=(req,res)=>{
    req.body.password=hash(req.body.password)
    console.log(req.body.password)
    Auth.find({username:req.body.username,password:req.body.password},function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            console.log(docs)
            let g=docs[0].geolocation.split(",")
            let f=req.body.geolocation.split(",")
            let dis=distance(parseFloat(g[0]),parseFloat(g[1]),parseFloat(f[0]),parseFloat(f[1]))
            console.log(dis)
           
                res.render('otp',{location:g[0],phonenumber:docs[0].phonenumber})
            
        }
        res.render('404')
    })
    
}
const genotp=(req,res)=>{
                var ot=gen.create(req.body.location)(1000000)
                const accountSid = process.env.TWILIO_ACCOUNT_SID;
                const authToken = process.env.TWILIO_AUTH_TOKEN;
                const client = require('twilio')(accountSid, authToken);

                client.messages
                .create({
                    body: 'Your OTP for registering the account is '+ot,
                    from: '+15134509830',
                    to: "+91"+req.body.phonenumber
                })
                .then(message => {console.log(message.sid)
                    res.json({otp:ot})});
}
const otpfunction= (req,res)=>{
   
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    var digits = '0123456789';
    OTP = '';
    for (let i = 0; i < 6; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    client.messages
      .create({
        body: 'Your OTP for registering the account is '+OTP,
        from: '+15134509830',
        to: '+91'+req.body.phonenumber
      })
      .then(message => {console.log(message.sid)
        res.json({otp:OTP})});
}
const security =(req,res)=>{
    res.render('security')
}
const forgot=(req,res)=>{
    Auth.find(req.body,function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            qn1=docs[0].secqn
            qn2=docs[0].secqn1
            vl1=docs[0].secqnvalue
            vl2=docs[0].secqnvalue1
            res.json({qn1:qn1,qn2:qn2,vl1:vl1,vl2:vl2})
        }
    })
}
function distance(lat1, lon1, lat2, lon2) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		return dist*1609.344;
	}
}

module.exports={
    home,
    register,
    signup,
    login,
    otpfunction,
    genotp,
    security,
    forgot
}