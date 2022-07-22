const express = require('express')
const passport = require('passport')
const {ensureAuth,ensureGuest} = require('../middlewares/auth')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')


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
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
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
})

module.exports = router