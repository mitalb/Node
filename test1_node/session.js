var express=require('express');
var app=express();
var http=require('http');
var session=require('express-session');
var cookieParser = require('cookie-parser');
app.use(cookieParser());


app.use(session({
    secret : 'test session',
    resave : false,
    saveUninitialized : true
}));

app.get('/setsession',function(req,res) {
    sess=req.session;
    sess.sessdata={};
    sess.sessdata.email="inaam";
    sess.sessdata.pass="inaam123";

    var data = {
        "Data":""
    };
    data["Data"] = 'Session set';
    console.log('Set Session:', req.session);
    res.json(data);
});

app.get('/destroysession',function(req,res){
    sess=req.session;
    console.log('Destroy Session:', sess);
    var data = {
        "Data":""
    };
    sess.destroy(function(err) {
        if(err){
            data["Data"] = 'Error destroying session';
            res.json(data);
        }else{
            data["Data"] = 'Session destroy successfully';
            console.log('Destroy Session:', sess);
            res.json(data);
        }
    });
});

app.get('/reloadsession',function(req,res){
    sess=req.session;
    var data = {
        "Data":""
    };
    sess.reload(function(err) {
        if(err){
            data["Data"] = 'Error Reloading session';
            res.json(data);
        }else{
            data["Data"] = 'Session Reloaded successfully';
            res.json(data);
        }
    })
});

app.get('/savesession',function(req,res){
    sess=req.session;
    var data = {
        "Data":""
    };
    sess.save(function(err) {
        if(err){
            data["Data"] = 'Error saving session';
            res.json(data);
        }else{
            data["Data"] = 'Session saved successfully';
            res.json(data);
        }
    })
});

app.get('/cookie',function(req, res){
    res.cookie('Name' , 'Node').send('Cookie is set');
});

app.get('/show', function(req, res) {
    console.log("Cookies :  ", req.cookies);
});

app.get('/clearcookie', function(req,res){
   res.clearCookie('Name');
    res.send('Cookie deleted');
});

app.listen(3000);