var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var User = require('./model/login');
mongoose.Promise = require('bluebird');
var jwt1 = require('jwt-simple');
var jws = require('jws');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));



app.get('/', function (req, res) {
    console.log(JSON.stringify(req.headers));
    res.send('Token based Authentication');

});

app.post('/signup', function (req, res) {

    var db = new User();

    db.email = req.body.email;
    db.password = req.body.password;

    db.save(function (err) {
        if (err) {
            return res.json({error: err});
        }
        res.json({message: 'user added successfully'});
    })
});

app.post('/authenticate', function (req, res) {

    var secret='xxx';
    var data = {
        email: req.body.email,
        password: req.body.password
    };
    User.findOne(data).lean().exec(function (err, user)
    {
        if (err)
        {
            return res.json({error: true});
        }
        if (!user)
        {
            return res.status(404).json({'message': 'User not found!'});
        }
        console.log(user);
        var token = jwt1.encode(user, secret);
        console.log('Token:',token);
        res.json({token: token});
    })
});

app.get('/protected',function(req, res){
        var secret='xxx';
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token)
        {
            // var decoded = jws.decode(token);
            var decoded = jwt1.decode(token,secret);
            res.json({Decoded:decoded});
            next(); //no error, proceed
        }
        else
        {
            // forbidden without token
            return res.status(403).send({
                "error": true
            });
        }
});

app.listen(3000);
console.log("Server Listening on Port 3000");