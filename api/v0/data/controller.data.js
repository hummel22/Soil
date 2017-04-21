
var SensorData = require.main.require('./app/models/SensorData.js');

exports.index = function(req, res) {
  console.log("Access Data API");
  var dataArray = [];
  SensorData.find({}, function(err, dataPoints) {
    if(err)   {
      console.log("Error");
      throw err;
    };
    console.log(dataPoints);
    dataArray = dataPoints;
    console.log("Data Loaded");
    var data = { "data" : dataPoints };
    res.json(data);
  })
};


exports.add = function(req, res) {
  console.log("Putting Data");
  console.log(req.body);
  console.log(req.body.sensor);

  //TODO Validation
  var data = new SensorData({
    sensor : req.body.sensor,
    value : req.body.value,
    date : req.body.date,
    type : req.body.type
  });
  data.save(function(err, dataPoint) {
      if (err) throw err;
      console.log('User saved successfully! ID: ' + dataPoint.id);
      uid = dataPoint.id;
      res.json({ message : "Success", uniqueID : uid });
  });
};
