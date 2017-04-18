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
      data.push(newData)
    }
  }
}]);
