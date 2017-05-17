angular.module('soil.directives.datalistitem',['soil.factories.panel'])
  .controller('DataListItemController', function ($scope, PanelFactory){

    var listitemVm  = this;

    //Generate and open display here
    listitemVm.openEdit = function()  {
      //TODO replace with local scope variables

      PanelFactory.openDataEditPanel(listitemVm);
    }

    listitemVm.delete = function () {
      //open are you sure you want to delete that panel
      PanelFactory.openDeletePanel(listitemVm.name, listitemVm.id);
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
        name : '@slDataName',
        type : '@slDataType',
        value : '=slDataValue',
        date : '=slDataDate',
        id : '=slDataId',
        group : '@slDataGroup',
        groupID : '@slDataGroupId',
        typeID : '@slDataTypeId'
      }
    }
  })
