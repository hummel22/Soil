angular.module('soil.directives.datalistitem',['soil.factories.panel','soil.factories.groups','soil.factories.types','soil.factories.sensors'])
  .controller('DataListItemController', function ($scope, PanelFactory, GroupFactory, TypeFactory, SensorFactory){
    var listitemVm  = this;

    //Generate and open display here
    listitemVm.openEdit = function()  {
      //TODO replace with local scope variables

      var sensor = SensorFactory.getSensorById(listitemVm.sensorId);
      listitemVm.name =sensor.name;
      listitemVm.group = GroupFactory.getGroupByID(sensor.groupId);
      listitemVm.type = TypeFactory.getTypeByID(sensor.typeId);
      PanelFactory.openDataEditPanel(listitemVm);
    }

    listitemVm.delete = function () {
      //open are you sure you want to delete that panel
      listitemVm.name = SensorFactory.getSensorById(listitemVm.sensorId).name; // For UX puposes
      console.log(listitemVm.name)
      PanelFactory.openDeletePanel(listitemVm);
    }
    return this;
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
        sensorId : '=slSensorId', //Used to display the what sensor this is under - UX purposes only!!
        datasetId : '=slDatasetId',
        value : '=slDataValue',
        date : '=slDataDate',
        id : '=slDataId',
      }
    }
  })
