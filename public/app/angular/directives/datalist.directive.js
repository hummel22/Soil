angular.module("soil.directives.datalist",['soil.directives.datalistitem', 'soil.factory.data', 'soil.factories.panel'])
  .controller('DataListController', function(DataFactory, PanelFactory){
    var datalistVm = this;

    datalistVm.data = DataFactory.getData();

    datalistVm.addPoint = function() {
      PanelFactory.openDataNewPanel();
    };

    datalistVm.addSensor = function() {
      PanelFactory.openNewSensorPanel();
    }

    datalistVm.editGroups = function()  {
      PanelFactory.opendGroupEditPanel();
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
