//SIMPLE ROUTING GET POST PUT DELETE USING USER.JSON FILE WITHOUT CREATING DATABASE

var express=require('express');
var app=express();
var fs = require('fs');

app.get('/',function(req,res)
    {
        res.send('Hello World!');
    }
);

// CREATE ROUTE NODE
// RUN localhost:3000/node
app.get('/node',function(req,res)
    {
        res.send('Tutorial on node js');
    }
);

//CREATE ROUTE EXPRESS
app.get('/express',function(req,res)
    {
        res.send('Tutorial on node js express framework');
    }
);

//GET POST PUT DELETE

//LIST USERS
app.get('/listUsers', function (req, res) {
    fs.readFile( "user.json", 'utf8', function (err, data) {
        console.log( data );
        res.end( data );
    });
})

//ADD USERS
var user = {
    "user4" : {
        "name" : "mohit",
        "password" : "password4",
        "profession" : "teacher",
        "id": 4
    }
}

app.post('/addUsers',function(req,res)
    {
        fs.readFile("user.json",'utf8',function(err,data)
            {
                data = JSON.parse( data );
                data["user4"] = user["user4"];
                console.log( data );
                res.send(data);
                res.end( JSON.stringify(data));
            }
        );
    }
)


app.get('/addUsers',function(req,res)
    {
        fs.readFile("user.json",'utf8',function(err,data)
            {
                data = JSON.parse( data );
                data["user4"] = user["user4"];
                console.log( data );
                res.send(data);
                res.end( JSON.stringify(data));
            }
        );
    }
)

//SHOW USERS

app.get('/:id', function (req, res) {
    // First read existing users.
    fs.readFile("users.json", 'utf8', function (err, data) {
        users = JSON.parse( data );
        var user = users["user" + req.params.id];
        console.log( user );
        res.end( JSON.stringify(user));
    });
})

//DELETE USERS

var id = 2;

app.delete('/deleteUser', function (req, res) {

    // First read existing users.
    fs.readFile("user.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        delete data["user" + 2];
        console.log( data );
        res.end( JSON.stringify(data));
    });
})

var server=app.listen(4000,function() {});