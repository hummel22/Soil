

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
}


exports.page = function(req, res)  {
  console.log("Recevived Page Request");
  res.send("Page API");
}
