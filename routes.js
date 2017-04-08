var router = require('express').Router();
var express = require('express');
var fs = require('fs');

//This should load all index.js files located in the api directory.
//To extend the api you only need to add/edit those files
var loadAPI = function(app, dirPath) {
  fs.readdirSync(__dirname + dirPath).forEach(function(file) {
    if (file === "index.js")    {
      console.log("Loading API: " + dirPath);
      var name = file.substr(0, file.indexOf('.'));
      app.use(dirPath, require('.' + dirPath));
      //console.log("app.use(" +dirPath +", require(" +'.' + dirPath  +"))");
    } else if (fs.lstatSync(__dirname + dirPath +'/' + file).isDirectory()) {
      loadAPI(app, dirPath +'/' + file);
    } else {
      return;
    }
  });
}


module.exports = function(app) {

  // Static ROutes
  //
  /*
   *  API DocumentaionA - Auto generated
   */
  app.use('/apidocs', express.static('public/apidocs'));
  app.use('/', express.static('public/app'));
  //app.get('/apidocs', function (req, res) {
  //      console.log("Got a GET request for /apidocs");
  //      res.sendFile(__dirname + '/public/apidocs/index.html');
  //})    


  /**
   * HOME Page
   */
  app.get('/', function (req, res) {
       console.log("Homepage");
       res.send("HOme");
  })


  /**
   * API's
   */
  //app.use('/api', require('/api'))
 
 //All index.js files are auto loaded in api directory 
  loadAPI(app, "/api");


}
