angular.module("soil.directives.sensorlist",['soil.directives.datalistitem', 'soil.factory.data', 'soil.factories.panel'])
  .controller('SensorListController', function(DataFactory, PanelFactory, $scope){
    var sensorlistVm = this;
    
    var tmpSet = DataFactory.getDataById($scope.sensor.datasetId);
    if(tmpSet !== undefined)  {
      sensorlistVm.dataset = Array.from(tmpSet);
    } else {
      sensorlistVm.dataset = [];
    }
    sensorlistVm.sensor = $scope.sensor;
    return sensorlistVm;
  })


  .directive("slSensorList", function() {
    return {
      restrict: 'E',
      templateUrl: '/angular/templates/sensorlist.template.html',
      replace: true,
      controller: 'SensorListController',
      controllerAs: 'sensorlistVm',
      scope: {
        sensor : '=slSensor'
      }
    }

  })
