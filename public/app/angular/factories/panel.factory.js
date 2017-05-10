angular.module('soil.factories.panel',['soil.factory.data', 'soil.factories.groups'])
  .controller('PanelDataEditController',function($scope, $mdDialog, PanelFactory, GroupFactory, DataFactory){
    var dialogVm = this;

    dialogVm.groups = GroupFactory.getGroups();

    //List of sensor names and there correspondng groups and type
    dialogVm.sensorData = {};
    dialogVm.sensors = DataFactory.getMetaData();
    // [
    //   {
    //     name : "WhitePotLeft",
    //     type : "Humidity",
    //     group : "WhitePotSensors"
    //   }, {
    //     name : "WhitePotRight",
    //     type : "Tempature",
    //     group : "WhitePotSensors"
    //   }, {
    //     name : "ApartmentTemp",
    //     type : "Tempature",
    //     group : "HouseSensors"
    //   }
    // ]

    dialogVm.close = function ()  {
      $mdDialog.cancel();
    }

    dialogVm.update = function () {
      //Validate data here
      dialogVm.data.date = new Date(dialogVm.data.date).toISOString();
      $mdDialog.hide(dialogVm.data);
    }

    dialogVm.delete = function () {
      PanelFactory.openDeletePanel(dialogVm.data.name, dialogVm.data.id);
    }

    //Set Other fields(type and group) based on sensor chosen.
    dialogVm.setData = function() {
      var sensor = dialogVm.sensorData;
      dialogVm.data.name = sensor.name;
      dialogVm.data.type = sensor.type;
      dialogVm.data.group = sensor.group;
    }

  })

  .controller('PanelGroupEditController',function($mdDialog){

  })
  .controller('PanelTypeEditController',function($mdDialog){

  })
  .factory('PanelFactory', function($mdDialog, DataFactory){
    var deletePanel = $mdDialog.confirm()
          .title('Delete Data Point')
          .ariaLabel('Delete the data')
          .ok('Delete')
          .cancel('Cancel')
          .clickOutsideToClose(true);


    function loadPanel(data, info, callback) {
      $mdDialog.show({
              templateUrl: '/angular/templates/datapanel.template.html',
              parent: angular.element(document.body),
              controller: "PanelDataEditController",
              controllerAs: 'dialogVm',
              bindToController: true,
              clickOutsideToClose: true,
              escapeToClose: true,
              locals : {
                data : data,
                info : info
              }
            })
        .then(callback, function() {
          console.log("Cancelled");
        });
    }

    //Factory Interface
    return {
      openDeletePanel : function(name, id)  {
        deletePanel._options.textContent = "Are you sure you want to delete data object " + id + " for sensor " +name+ "?";
        $mdDialog.show(deletePanel).then(function() {
          DataFactory.deletePoint(name, id);
        }, function() {
          console.log("Canceled");
        });
      },
      openDataEditPanel : function(data) {
        //Update edit panel
        info = {
          title : "Point Editor",
          accept : "Update",
          content : "Edit Data Point",
          disableName : true,
          disableGroup : true,
          disableType : true,
          disableID : true,
          disableDelete : false};
        loadPanel(data, info, DataFactory.updatePoint);
      },
      opendGroupEditPanel : function()  {

      },
      openTypeEditPanel : function()  {

      },
      openDataNewPanel : function() {
        //Update For adding panel
        info = {
          title : "Point Editor",
          accept : "Create",
          content : "Create Data Point",
          disableID : true,
          disableGroup : true,
          disableType : true,
          disableDelete : true
        };
        var data = {
          name : undefined,
          type : undefined,
          group : undefined,
          value : undefined,
          date : undefined
        };
        loadPanel(data, info, DataFactory.addPoint);
      }
    }
  })
