//TODO


angular.module('soil.controllers.datalist', [])

  .controller('DataListController', function($scope, DataService) {
    $scope.humidity = DataService.get();
  });
