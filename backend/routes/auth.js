const express = require('express')
const passport = require('passport')
const {ensureAuth,ensureGuest} = require('../middlewares/auth')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const {cloudinary} = require('../config/cloudinary');
const nodemailer = require('nodemailer');


/*****************************************google auth******************************************** */
// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google',ensureGuest,passport.authenticate('google', { scope: ['profile'] }))

// @desc    Google auth callback 
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login',successRedirect:'http://localhost:3000/success/login' }),
  (req, res) => {
    console.log('user:',req.user)
    res.send('done')
  }
)

/*****************************************local login*********************************** */
router.post("/login",ensureGuest,
  passport.authenticate("local"), 
  (req, res) => {
    console.log('user:',req.user)
    res.send('done')
  })  

router.post("/register",ensureGuest, (req, res) => {
  User.findOne({ email: req.body.email }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        email:req.body.email,
        password: hashedPassword,
      });
      await newUser.save();
      console.log("User Created")
      res.send("User Created");
    }
  });
});

/*****************************************************user info******************************************** */
router.get('/user',ensureAuth,(req,res) => {
  res.json(req.user);
});


/*******************************************************Profile Image upload************************************** */
router.post('/upload',ensureAuth,async (req,res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.
    upload(fileStr,{
        upload_preset:'internship',
    })
    console.log(uploadedResponse);
    const photo = await User.findByIdAndUpdate(req.user._id,{image:uploadedResponse.url})
    
    console.log(photo) 
    res.json({msg:"sent"})
  } catch (error) {
    console.log(error) 
    res.status(500).json({err:'something went wrong'});
  }
});

/********************************************************Forget password *******************************************/
router.post('/forget-password',async (req,res) => {
  const {email} = req.body;
  try {
    let user = await User.findOne({ email: email })
    
    var transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: '##############@outlook.com',
        pass: '#########'
      }
    });
     
    var mailOptions = {
      from: 'jalauksinghmaurya2021@outlook.com',
      to: `${email}`,
      subject: 'Sending Email using Node.js',
      text: `http://localhost:3000/reset-password/${user._id}`
    };
     
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  } catch (error) {
    console.log(err);
  } 
});

router.post('/reset-password/:_id',async (req,res) => {
  const _id = req.params;
  const {password,confirmPassword} = req.body;
  console.log(password);

  try {
    if(password === confirmPassword) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.findByIdAndUpdate(_id,{password:hashedPassword});
      console.log(user);
      res.send(user)
    }
  } catch (error) {
      console.log(error)
      res.send(error)
  }
});


module.exports = router
