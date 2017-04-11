angular.module('datasetViewController', [])
  .controller('datasetViewToggler', function ($scope, $timeout, $mdSidenav) {
    $scope.toggleDataSet = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
        console.log("Toggling");
      };
    }
  });