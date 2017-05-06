angular.module('soil.factories.panel',[])
  .controller('PanelDataEditController',function($mdDialog){
    var dialogVm = this;

    dialogVm.close = function ()  {
      $mdDialog.cancel();
    }

    dialogVm.update = function () {
      $mdDialog.hide();
    }
  })

  .controller('PanelGroupEditController',function($mdDialog){

  })
  .controller('PanelTypeEditController',function($mdDialog){

  })
  .factory('PanelFactory', function($mdDialog){
    var deletePanel = $mdDialog.confirm()
          .title('Delete Data Point')
          .ariaLabel('Deletethe data')
          .ok('Delete')
          .cancel('Cancel')
          .clickOutsideToClose(true);


    var editPanelConfig = {
            templateUrl: '/angular/templates/datapanel.template.html',
            parent: angular.element(document.body),
            controller: "PanelDataEditController",
            controllerAs: 'dialogVm',
            bindToController: true,
            clickOutsideToClose: true,
            escapeToClose: true
          };

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
        $mdDialog.show(editPanelConfig)
          .then(function(answer) {
            console.log("Updating")
          }, function() {
            console.log("Cancelled");
          });
      },
      opendGroupEditPanel : function()  {

      },
      openTypeEditPanel : function()  {

      },
      openDataNewPanel : function(data) {
        //Update For adding panel
        $mdDialog.show(editPanelConfig)
          .then(function(answer) {
            console.log("Updating")
          }, function() {
            console.log("Cancelled");
          });
      }
    }
  })
