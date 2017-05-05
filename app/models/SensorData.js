var mongoose = require('mongoose');

// define our nerd model
// // module.exports allows us to pass this to other files when it is called
//
//
//
var Schema = mongoose.Schema;
var sensorSchema = new Schema({
     sensor : {type : String, default: 'None'},
     date : Date,
     value : Number,
     type : {type : String, default: ''},
});

var SensorData = mongoose.model('SensorData', sensorSchema);

SensorData.validateData = function (data) {

}

module.exports = SensorData;
