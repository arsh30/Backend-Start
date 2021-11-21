const nodemailer = require('nodemailer');
const { nodemailer_Password } = require('./secret');

//asume : signup time hmne email, password, name bhja vo aajega

module.exports = async function sendMail(user) {  //yeh hmne aage se pass kra jo bnaya tha

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({  //1st yeh copy kra 
        host: "smtp.gmail.com",
        port: 587,  //yeh bydefault dedicated port hota hai
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'as3096734@gmail.com', // generated ethereal user
            pass: nodemailer_Password, // generated ethereal password and and it is in secret.js
        },
    });
    var Osubject, Otext, Ohtml;

    Osubject = `Thank you for Visiting Kotak811.com`
    Otext = `Hope you are doing well and taking neccessary precautions from the pandemic
        Here are you some details when your card has swipped`
    Ohtml = `<h1>kotak811</h1>`

    let info = await transporter.sendMail({
        from: '"Kotak811" <kotak811@gmail.com>', // sender address
        to: "as3096734@gmail.com", // list of receivers
        subject: Osubject, // Subject line
        text: Otext, // plain text body
        html: Ohtml, // html body
    });
    console.log("Message Sent ", info.messageId);  //infor me message ID milti hai boht kuch hai
};

