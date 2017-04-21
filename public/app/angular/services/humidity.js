//TODO
//
//This module will load humidiy points
//
// V1 - Load canned data
// V2 - Request all data from server
// V3 - Handling Paging of data
//

angular.module('humidityService', [])

.factory('Humidity', ['$http', function($http) {
  var data = [];

  return {
    get : function () {
      console.log("Attempting Get");
      $http.get('/api/v0/data')
      .then(function(response){
        console.log(response.status);
        console.log(response.data);
        angular.forEach(response.data.data, function(item){
          data.push(item);
        });
      }, function(response){
        console.log("No answer from the Mr Server");
      });
      return data;
    },
    put : function (newData) {
      console.log("Posting Data");
      $http.post('/api/v0/data', newData)
      .then(function(response){
        console.log(response.data);
        console.log("Unique ID: " + response.data.uniqueID);
        newData.uniqueID = response.data.uniqueID;
        data.push(newData)
      }, function (reponse){
        console.log("Somethings gone terrible wrong");
      })
    }
  }
}]);
