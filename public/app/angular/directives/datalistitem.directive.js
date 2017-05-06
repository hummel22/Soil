angular.module('soil.directives.datalistitem',['soil.factories.panel'])
  .controller('DataListItemController', function (PanelFactory){

    var listitemVm  = this;

    listitemVm.openEdit = function()  {
      //Generate and open display here
      console.log("EDIT");
      var tmpData = {
        sensor : "Wall Red Rock Humidity",
        type : "Humidity",
        value : 100,
      };
      PanelFactory.openDataEditPanel(tmpData);
    }

    listitemVm.delete = function () {
      //open are you sure you want to delete that panel
      console.log("Delete");
      PanelFactory.openDeletePanel(listitemVm.id);
    }

  })

  .directive("slDataListItem", function(){
    return {
      restrict: 'E',
      templateUrl: '/angular/templates/datalistitem.template.html',
      replace: true,
      controller: 'DataListItemController',
      controllerAs: 'listitemVm',
      bindToController: true,
      scope: {
        name : '=slSDataName',
        type : '=slDataType',
        value : '=slDataValue',
        date : '=slDataDate',
        id : '=slDataId',
        group : '=slDataGroup'
      }
    }
  })
