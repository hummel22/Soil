angular.module("soil.directives.datalist",['soil.directives.datalistitem', 'soil.factory.data', 'soil.factories.panel'])
  .controller('DataListController', function(DataFactory, PanelFactory){
    var datalistVm = this;

    datalistVm.data = DataFactory.getData();

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
