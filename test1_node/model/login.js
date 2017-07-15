var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/demo');
var schema = mongoose.schema;

var loginSchema = {
    "email": String,
    "password": String
};

module.exports = mongoose.model('Login', loginSchema);