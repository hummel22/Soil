angular.module('soil.directives.datalistitem',['soil.factories.panel'])
  .controller('DataListItemController', function (PanelFactory){

    var listitemVm  = this;

    //Generate and open display here
    listitemVm.openEdit = function()  {
      //TODO replace with local scope variables
      var tmpData = {
        name : "Wall Red Rock Humidity",
        type : "Humidity",
        value : 100,
        date : "2017-05-16T10:55:00.000Z",
        id : 12934,
        group : "WhitePot"
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
