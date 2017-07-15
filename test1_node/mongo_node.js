//SIMPLE MONGODB CREATE COLLECTION INSERT RECORD AND FETCH RECORDS

var MongoClient = require('mongodb').MongoClient;
var url='mongodb://localhost/demo';
MongoClient.connect(url,function(err,db)
    {
        console.log('connected');

        //CREATE COLLECTION
        db.createCollection("Employee",function(err,res)
        {
           console.log('Table Created');
        });

        //INSERT RECORD IN COLLECTION
        var data=[
            {'id':1,name:"mohit"},
            {'id':2,name:"meera"},
            {'id':3,name:"mahesh"}
        ];
        db.collection("Employee").insert(data,function(err,res)
        {
            console.log("Number of record inserted:" +res.insertedCount);
        });


       //FIND FIRST RECORD FINDONE
        db.collection("Employee").findOne({}, function(err, result) {
            if (err) throw err;
            //console.log("result:",result);
            console.log(result.id);
        });

        //FIND ALL RECORD FIND
        db.collection('Employee').find({}).toArray(function(err,doc)
        {
            //console.log(doc); // DISPLAY ALL RECORD
            console.log("result:",doc[1].id,doc[1].name);
        });


       /*
        // DROP COLLECTION
        db.collection("api").drop(function(err, delOK) {
            if (err) throw err;
            if (delOK)
                console.log("Table deleted");
            db.close();
        });
        */


        db.close();
    }
);

