//TODO


angular.module('humidityListController', [])

  .controller('mainController', function($scope, Humidity) {
    $scope.humidity = Humidity.get();
  });
      
