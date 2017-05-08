angular.module('soil.factories.panel',['soil.factory.data'])
  .controller('PanelDataEditController',function($scope, $mdDialog, PanelFactory){
    var dialogVm = this;

    dialogVm.close = function ()  {
      $mdDialog.cancel();
    }

    dialogVm.update = function () {
      //Validate data here
      dialogVm.data.date = dialogVm.data.date._i;
      dialogVm.data.group= "WhitePot",
      $mdDialog.hide(dialogVm.data);
    }

    dialogVm.delete = function () {
      PanelFactory.openDeletePanel(dialogVm.data.id);
    }

  })

  .controller('PanelGroupEditController',function($mdDialog){

  })
  .controller('PanelTypeEditController',function($mdDialog){

  })
  .factory('PanelFactory', function($mdDialog, DataFactory){
    var deletePanel = $mdDialog.confirm()
          .title('Delete Data Point')
          .ariaLabel('Deletethe data')
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
      openDeletePanel : function(id)  {
        deletePanel._options.textContent = "Are you sure you want to delete data object " + id + "?";
        $mdDialog.show(deletePanel).then(function() {
          console.log("Deleted");
          //TODO Delete the data point
        }, function() {
          console.log("Canceled");
        });
      },
      openDataEditPanel : function(data) {
        //Update edit panel
        info = {
          title : "Point Editor",
          accept : " Update",
          content : "Edit Data Point",
          disableName : true,
          disableGroup : true,
          disableType : true,
          disableID : true,
          disableDelete : false};
        loadPanel(data, info, function(dataReturn) {
          DataFactory.addPoint(dataReturn);
          DataFactory.printData();
        });
      },
      opendGroupEditPanel : function()  {

      },
      openTypeEditPanel : function()  {

      },
      openDataNewPanel : function(data) {
        //Update For adding panel
      }
    }
  })
