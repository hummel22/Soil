

exports.index = function(req, res) {
  console.log("Access Data API");
  res.send('Data API');
}


exports.page = function(req, res)  {
  console.log("Recevived Page Request");
  res.send("Page API");
}


