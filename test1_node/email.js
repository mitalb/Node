//SENDING MAIL

var express = require("express");
var app = express();
var nodemailer = require('nodemailer');

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.get('/',function(req,res)
{
    res.render('mail.html');
});

var transporter=nodemailer.createTransport(
    {
        host: 'smtp.example.com',
        port: 465,
        secure: true,
        service:'gmail',
        auth:{
            user:'lanetteam.mitalb@gmail.com',
            pass:'lanetteam1'
        }
    });

app.get('/send',function(req,res)
{
    //req.query take the data from the form
    var mailoptions={
        to:req.query.to,
        subject:req.query.subject,
        text:req.query.text
    };

    console.log(mailoptions);
    transporter.sendMail(mailoptions,function(error,response)
    {
        if(error)
            console.log(error);
        else
            console.log('Email Sent:'+response);
            response.send('Email sent');
    });

});

app.listen(3000);
console.log("Listening to PORT 3000");