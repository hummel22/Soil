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
    var data = [
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
                       ]

    return {
      get : function () {
        return data;
      },
      put : function (newData) {
        data.push(newData)
      }
    }
  });
