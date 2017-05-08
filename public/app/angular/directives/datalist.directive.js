angular.module("soil.directives.datalist",['soil.directives.datalistitem', 'soil.factory.data'])
  .controller('DataListController', function(DataFactory){
    var datalistVm = this;

    datalistVm.data = DataFactory.getData();
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
