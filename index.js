const express = require('express');
const mongoose = require('mongoose');
const app=express()
const bodyparser = require('body-parser')
const authroutes=require('./Routes/Authroutes')
const dburi="mongodb+srv://Ranjith:ranvi40700@minihackathon.jyfgb.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log("Database connected!!");
    app.listen(3000)})
  .catch(err => console.log(err));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use('/',authroutes);
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });