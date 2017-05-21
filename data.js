var mclient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/mydb";
var http = require('http') ;
http.createServer(function(err,mk){

mclient.connect(url,function(err,db){
	db.collection("customer").find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    mk.writeHead(200, {
            'content-type': 'text/plain'
        });
    	 
      mk.write('received the data:\n\n');
      mk.end();
    db.close();
  });
});

}).listen(8071);
