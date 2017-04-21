var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8081

require('./routes')(app)



// Connect to the db
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/Soil");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("DataBase Connected");
});



var server = app.listen(port, function () {
     var host = server.address().address;
     var port = server.address().port;
     console.log("Soil Server listening at http://%s:%s", host, port);
})
