// GET POST PUT DELETE ROUTING WITH DATABASE WITHOUT CREATING FORM
//DATABASE FILE- mongo.js

// SET UP SERVER

var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require("body-parser");
var mongoOp = require("./model/mongo");
var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": false}));

router.get('/', function (req, res) {
    res.json({"message": "Hello World"});
});
// GET USERS
router.route("/users")
    .get(function (req, res) {
        var response = {};
        mongoOp.find({}, function (err, data) {
            // Mongo command to fetch all data from collection.
            if (err)
            {
                response = {"error": true, "message": "Error fetching data"};
            }
            else
            {
                response = {"error": false, "message": data};
            }
            res.json(response);
        });
    })

    //POST- ADD DATA
    .post(function (req, res) {
        var db = new mongoOp();
        var response = {};
        // fetch email and password from REST request.
        // Add strict validation when you use this in Production.
        db.userEmail = req.body.email;
        db.userPassword = req.body.password;
        db.save(function (err) {
            // save() will run insert() command of MongoDB.
            // it will add new data in collection.
            if (err)
            {
                response = {"error": true, "message": "Error adding data"};
            }
            else
            {
                response = {"message": "Data added"};
                res.json(response);
            }
        });
    })

//GET-SEARCH BY ID
router.route("/users/:id")
    .get(function (req, res) {
        var response = {};
        mongoOp.findById(req.params.id, function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err)
            {
                response = {"error": true, "message": "Error fetching data"};
            }
            else
            {
                response = {"error": false, "message": data};
            }
            res.json(response);
        });
    })

    //PUT-UPDATE DATA

    .put(function (req, res) {
        var response = {};
        // first find out record exists or not
        // if it does then update the record
        mongoOp.findById(req.params.id, function (err, data) {
            //console.log("id:",req.params.id);
            if (err)
            {
                response = {"error": true, "message": "Error fetching data"};
            }
            else
            {
                // we got data from Mongo.
                // change it accordingly.
                if (req.body.userEmail !== undefined)
                {
                    // case where email needs to be updated.
                    data.userEmail = req.body.userEmail;
                }
                if (req.body.userPassword !== undefined)
                {
                    // case where password needs to be updated
                    data.userPassword = req.body.userPassword;
                }
                // save the data
                data.save(function (err)
                {
                    if (err)
                    {
                        response = {"error": true, "message": "Error updating data"};
                    }
                    else
                    {
                        response = {"error": false, "message": "Data is updated for " + req.params.id};
                    }
                    res.json(response);
                })
            }
        });
    })

    //DELETE- DELETE DATA

    .delete(function (req, res) {
        var response = {};
        // find the data
        mongoOp.findById(req.params.id, function (err, data) {
            if (err)
            {
                response = {"error": true, "message": "Error fetching data"};
            }
            else
            {
                // data exists, remove it.
                mongoOp.remove({_id: req.params.id}, function (err) {
                    if (err)
                    {
                        response = {"error": true, "message": "Error deleting data"};
                    }
                    else
                    {
                        response = {"error": true, "message": "Data associated with " + req.params.id + "is deleted"};
                    }
                    res.json(response);
                });
            }
        });
    })

// ROUTING USING TEMPLATE


app.use('/', router);

app.listen(3000);
console.log("Listening to PORT 3000");