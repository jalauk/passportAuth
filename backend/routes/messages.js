const express = require('express')
const {ensureAuth,ensureGuest} = require('../middlewares/auth')
const router = express.Router()
const Messages = require('../models/Message')
const mongoose = require('mongoose')
const {cloudinary} = require('../config/cloudinary');

router.post("/getmsg", ensureAuth,async (req, res) => {
    try {
      const { from, to } = req.body;
  
      const messages = await Messages.find({
        users: {
          $all: [from, to],
        },
      }).sort({ updatedAt: 1 });
  
      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
        };
      });
      res.json(projectedMessages);
    } catch (ex) {
      console.log(ex);
    }
  });


router.post("/addmsg", ensureAuth,async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    console.log(ex);
  } 
});

module.exports = router