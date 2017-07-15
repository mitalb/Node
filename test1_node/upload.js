var express = require("express");
var app = express();

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

//multer object creation
var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('file:',file);
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage });

app.get('/',function(req,res)
{
    res.render('upload.html');
});

app.post('/send', upload.single('file1'), function (req, res, next) {
    console.log('req',req.file);
    // req.file is the `file1` file
    // req.body will hold the text fields, if there were any
    res.send("File upload successfully.");
})

app.listen(3000);
console.log("Listening to PORT 3000");