var mongoose = require('mongoose');

// define our nerd model
// // module.exports allows us to pass this to other files when it is called
//
//
//
var Schema = mongoose.Schema;
var sensorSchema = new Schema({
     sensor : {type : String, default: ''},
     date : Date,
     value : Number,
     uniqueID : {type : String, default: '', required: true, unique: true},
     type : {type : String, default: ''},
});

//TODO - Gerneate unique ID
//var ObjectID = require('mongodb').ObjectID;
//
//var objectId = new ObjectID();

var SensorData = mongoose.model('SensorData', sensorSchema);

module.exports = SensorData;
