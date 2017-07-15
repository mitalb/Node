var http = require('http');

// Options to be used by request
var options = {
    host: 'localhost',
    port: '8085',
    path: '/demo.html'
};

// Callback function is used to deal with response
var callback = function(res){
    // Continuously update stream with data
    var body = '';
    res.on('data', function(data) {
        body += data;
    });

    res.on('end', function() {
        // Data received completely.
        console.log(body);
    });
}
// Make a request to the server
var req = http.req(options, callback);
req.end();