angular.module("soil.directives.datalist",["soil.directives.sensorlist", 'soil.factory.data', 'soil.factories.panel', 'soil.factories.sensors'])
  .controller('DataListController', function(DataFactory, SensorFactory, PanelFactory){
    var datalistVm = this;

    datalistVm.data = DataFactory.getData();
    datalistVm.sensors = SensorFactory.getSensors();  //This will miss new entries to the map
    function getUnassignedData()  {
      var unassigned = new Set();
      for(var datasetId in datalistVm.data)  {
        unassigned.add(Number(datasetId));
      }
      for(var sensorId in datalistVm.sensors) {
        unassigned.delete(datalistVm.sensors[sensorId].datasetId);
      }
      unassignedSensors = {};
      var theSet = unassigned.entries()
      unassigned.forEach(function(value1, value2, set)  {
        unassignedSensors[value1] = {
              name : "Unassigned",
              datasetId : value1
            }
      });
      return unassignedSensors;
    }
    datalistVm.unassignedData = getUnassignedData();



    //Get data that has not been assigned yet.

    datalistVm.addPointGen = function() {
      PanelFactory.openDataNewPanelGen();
    };

    datalistVm.addPoint = function(sensor) {
      PanelFactory.openDataNewPanel(sensor);
    };

    datalistVm.editSensor = function(sensor) {
      PanelFactory.openSensorEditPanel(sensor);
    };

    datalistVm.addSensor = function() {
      PanelFactory.openNewSensorPanel();
    }

    datalistVm.editGroups = function()  {
      PanelFactory.opendGroupEditPanel();
    }

    datalistVm.editTypes = function()  {
      console.log("Edit TYpes");
      PanelFactory.openTypeEditPanel();
    }
  })
  .directive("slDataList", function() {
    return {
      restrict: 'E',
      templateUrl: '/angular/templates/datalist.template.html',
      replace: true,
      controller: 'DataListController',
      controllerAs: 'datalistVm',
      bindToController: true,
      scope: {
        filterBy : '@filterBy'
      }
    }

  })
