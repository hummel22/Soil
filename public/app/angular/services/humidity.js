//TODO
//
//This module will load humidiy points
//
// V1 - Load canned data
// V2 - Request all data from server
// V3 - Handling Paging of data
//

angular.module('humidityService', [])
  .factory('Humidity', function() {
    return {
      get : function () {
        return [
          {
            "Date" : "01/02/2017 11:33",
            "UniqueID" : 0,
            "Name" : "Stone Sensor",
            "Humidity" : 84
          },
          {
            "Date" : "01/02/2017 12:33",
            "UniqueID" : 1,
            "Name" : "Stone Sensor",
            "Humidity" : 21
          },
          {
            "Date" : "01/02/2017 14:33",
            "UniqueID" : 2,
            "Name" : "Gray Sensor",
            "Humidity" : 56
          },
          {
            "Date" : "01/02/2017 18:33",
            "UniqueID" : 03,
            "Name" : "Stone Sensor",
            "Humidity" :36
          }
        ]
      }
    }
  });
