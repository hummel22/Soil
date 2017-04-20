var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8081

require('./routes')(app)


var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/Soil", function (err, db) {
 if(err) throw err;
});

var server = app.listen(port, function () {
     var host = server.address().address;
     var port = server.address().port;
     console.log("Soil Server listening at http://%s:%s", host, port);
})
