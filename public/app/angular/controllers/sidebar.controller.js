angular.module('soil.controllers.sidebar', [])
  .controller('SideBarController', function ($scope, $timeout, $mdSidenav) {
    $scope.toggleSideBar = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
        console.log("Toggling");
      };
    }
  });
