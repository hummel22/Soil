//TODO


angular.module('soil.controllers.data-list', [])

  .controller('DataListController', function($scope, DataService) {
    $scope.humidity = DataService.get();
  });
