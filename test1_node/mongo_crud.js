var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var PORT = 3000;
mongoose.Promise = require('bluebird');

// REQUIRE MIDDLEWARE
var crud = require('express-mongo-crud'); // require the module
mongoose.connect('localhost:27017/demo');

var options = { //specify options
    host: `localhost:${PORT}`
};

//USE AS MIDDLEWARE
app.use(bodyParser.json()); // add body parser
app.use(crud(options)); // use as middleware

app.get('/myapi', function(req, res){
    res.send('works well');
});

app.listen(PORT, ()=>{
    console.log('started PORT 3000');
});




