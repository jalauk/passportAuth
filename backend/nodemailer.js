var nodemailer = require('nodemailer');
 
var transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'jalauksinghmaurya2021@outlook.com',
    pass: 'Laptop-2#'
  }
});
 
var mailOptions = {
  from: 'jalauksinghmaurya2021@outlook.com',
  to: 'jalauksinghmaurya@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};
 
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});