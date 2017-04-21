
var myapp = angular.module('dialogModule', []);

myapp.factory("HumidPoint", function() {

  var data = {
    "sensor" : "BlueSensor",
    "date" : "N/A",
    "value" : "12",
    "type" : "Humidity"
  }

  return {
      getPoint: function() {
        return data;
      },
      setPoint: function(name, date, humidity, type)  {
        data.sensor = name;
        data.date = date;
        data.value = humidity;
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
        console.log("Adding" + answer.value);
        HumidPoint.setPoint(answer.sensor, answer.date, answer.value, answer.type)
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
        console.log("Add " + answer.sensor);
        $mdDialog.hide(answer);
      };
    }


});



myapp.controller("newPointMonitor", function($scope, HumidPoint)  {
  $scope.newPoint = HumidPoint.getPoint();
});
