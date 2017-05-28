angular.module("soil.directives.sensorlist",['soil.directives.datalistitem', 'soil.factory.data', 'soil.factories.panel'])
  .controller('SensorListController', function(DataFactory, PanelFactory, $scope){
    var sensorlistVm = this;

    sensorlistVm.dataset = DataFactory.getDataById($scope.sensor.datasetId);
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
