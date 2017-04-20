
require.main.require('./app/models/SensorData.js');

exports.index = function(req, res) {
  console.log("Access Data API");
  var data = { "data" : [
    {
      "Date" : "01/02/2017 11:33",
      "UniqueID" : 0,
      "Sensor" : "Stone",
      "Humidity" : 84,
      "Type" : "Humidity"
    },
    {
      "Date" : "01/02/2017 12:33",
      "UniqueID" : 1,
      "Sensor" : "Stone",
      "Humidity" : 21,
      "Type" : "Humidity"
    },
    {
      "Date" : "01/02/2017 14:33",
      "UniqueID" : 2,
      "Sensor" : "Stone",
      "Humidity" : 56,
      "Type" : "Humidity"
    },
    {
      "Date" : "01/02/2017 18:33",
      "UniqueID" : 03,
      "Sensor" : "Stone",
      "Humidity" :36,
      "Type" : "Humidity"
    }
  ]};
  res.json(data);
};


exports.add = function(req, res) {
  console.log("Putting Data");
  //TODO Validation
  //TODO Generate Unique ID
  var data = new SensorData({
    sensor : req.data.sensor,
    value : req.data.value,
    data : req.data.date,
    type : req.data.type,
    uniqueID: 7  
  });
  data.save(function(err) {
      if (err) throw err;
        console.log('User saved successfully!');
  });
  res.json({ message : "Success", UniqueID : Math.floor(Math.random() * 6) + 1 });
};
