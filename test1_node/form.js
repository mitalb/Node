//CREATE SIMPLE FORM THAT ADDING DATA TO DATABASE USING MONGODB AND RETRIEVING DATA USING ROUTING
//FORM INDEX.EJS

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");
// var mongoOp     =   require("./model/mongo");

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/demo";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',function(req,res)
{
     res.render('index.ejs');
});

app.post('/adduser', function (req,res) {

    response = {
        name:req.body.name,
        age:req.body.age,
        nationality:req.body.nationality
    };

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("person").insertOne(response, function(err, res) {
            if (err) throw err;
            console.log("RECORD INSERTED");
            db.close();
        });
    });
    res.redirect('/listuser');
});

app.get('/listuser', function (req, res) {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        db.collection("person").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
            db.close();
        });
    });
})

/*
app.delete('/deleteuser', function (req, res) {
    var id=req.body;
    console.log(id);
    // First read existing users.
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("customers").remove(id, function(err, obj) {
            if (err) throw err;
            console.log(obj.result + " document(s) deleted");
            res.end(JSON.stringify(req.body));
            db.close();
        });
    });

})


app.put('/updateuser/:id', function (req, res) {

    // First read existing users.
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var newvalues = { name: "pankaj",
            "password" : "password2",
            "profession" : "librarian",
            "id": 6};
        db.collection("person").update(id, newvalues, function(err, result) {
            if (err) throw err;
            console.log( " document(s) update");
            res.end( JSON.stringify(result));
            db.close();
        });
    });

})


*/
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on http://localhost:' + port);


