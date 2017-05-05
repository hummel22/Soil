
var SensorData = require.main.require('./app/models/SensorData.js');


//Load all data points
exports.index = function(req, res, next) {
  console.log("Access Data API");

  //Load all data
  SensorData.find({}, function(err, dataPoints) {
    if(err)   {
      console.log("Error");
      //Error will be handled by middleware
      return next(err);
    } else if(dataPoints.length === 0){
      //Return a error for not finding any data
      return next(new Error({name : "NoData", message : "No data in database"}))
    } else {
      var data = { "data" : dataPoints };
      res.json(data);
    }
  })
};



exports.post = function(req, res) {
  console.log("Putting Data");
  console.log(req.body);


  //Load data in mongoose schema
  var data = new SensorData({
    sensor : req.body.sensor,
    value : req.body.value,
    date : req.body.date,
    type : req.body.type
  });


  data.save(function(err, dataPoint) {
      if (err) {

        console.log("")
        return next(err);

      } else {

        console.log('User saved successfully! ID: ' + dataPoint.id);

        //This is the unique id created by mongodb when adding. return to client;
        uid = dataPoint.id;
        res.json({ message : "Success", uniqueID : uid });
      }

  });
};
