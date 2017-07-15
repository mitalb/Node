var http = require('http');
var fs = require('fs');

http.createServer(function(req,res)
    {
        /*
            READ FILE
            fs.readFile('demo.html', function(err,data)
            {
                res.writeHead(200,{'content-Type': 'text/html'});
                res.write(data);
                res.end();
            }
        );
        */

        /*
        APPEND FILE
        fs.appendFile('new.txt','Text FIle',function(err)
            {
                if(err) throw err;
                console.log('saved');
            }
        );
        */


        /*
        OPEN FILE
        fs.open('new.txt','w',function(err,file)
            {
                if(err) throw err;
                console.log('open');
            }
        );
         */

        //WRITE FILE

    }
).listen(8083);

