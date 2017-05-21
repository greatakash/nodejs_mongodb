var http = require('http');
var util = require('util');
var formidable = require('formidable');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

http.createServer(function (req, res) {
	if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
    	 

         MongoClient.connect(url, function(err, db) {
				  if (err) throw err;
				  
				  db.collection("customer").insert(fields,function(err, result) {
				    if (err) throw err;
		res.writeHead(200, {
            'content-type': 'text/plain'
        });
    	 
      res.write('received the data:\n\n');
      res.end(util.inspect({
            fields: fields,
            files: files
        }));
				    /*db.close();*/
				  });
				});
   	

    });
}
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("customer").find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result[0]['name']);

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
  res.write('<input type="text" placeholder="your name please" name="filetoupload" value="'+result[0]['name']+'"><br>');
  res.write('<input type="submit">');
  res.write('</form>');
  return res.end();

   /* db.close();*/
  });
});

}).listen(8071);