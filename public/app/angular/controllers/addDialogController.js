
var myapp = angular.module('dialogModule', []);

myapp.factory("HumidPoint", function() {

  var data = {
    "Sensor" : "-",
    "Date" : "N/A",
    "Humidity" : "0%"
  }

  return {
      getPoint: function() {
        return data;
      },
      setPoint: function(name, date, humidity)  {
        data.Sensor = name;
        data.Date = date;
        data.Humidity = humidity;
      }
    };
});

myapp.controller('showDialogController', function ($scope,  $mdDialog, HumidPoint, Humidity) {
  $scope.showAddDialog = function(ev)  {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: '/angular/templates/add-dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
        console.log("Adding" + answer.Humidity);
        HumidPoint.setPoint(answer.Sensor, answer.Date, answer.Humidity)
        Humidity.put(answer);
      }, function() {
        console.log("Cancelled");
      });
  }

  function DialogController($scope, $mdDialog) {
      $scope.cancel = function() {
        console.log("Cancel");
        $mdDialog.cancel();
      };

      $scope.add = function(answer) {
        console.log("Add " + answer.Sensor);
        $mdDialog.hide(answer);
      };
    }


});



myapp.controller("newPointMonitor", function($scope, HumidPoint)  {
  $scope.newPoint = HumidPoint.getPoint();
});



