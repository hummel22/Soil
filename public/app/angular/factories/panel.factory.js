angular.module('soil.factories.panel',['soil.factory.data', 'soil.factories.groups','soil.factories.types'])
  .controller('PanelDataEditController',function($scope, $mdDialog, PanelFactory, GroupFactory, TypeFactory, DataFactory){
    var dialogVm = this;

    dialogVm.groups = GroupFactory.getGroups();
    dialogVm.types = TypeFactory.getTypes();

    //List of sensor names and there correspondng groups and type
    dialogVm.sensorData = {};
    dialogVm.sensors = DataFactory.getMetaData();

    //dialog.listItems - in view
    dialogVm.newItemOrig = [];  //Map used  to overcome updates to new items;
    //inf future use ids to replace all of this
    dialogVm.list = {
      newItems : [],
      deleteItems : [],
      updatedItems : {
        origVals : [],
        newVals : []
      }
    };

     dialogVm.saveList = function() {
        $mdDialog.hide(dialogVm.list);
     };

     function updateArray(array, oldVal, newVal)  {
       var index = array.findIndex(function(element) {
         return element === oldVal;
       })
       if(index !== undefined)  {
         array[index] = newVal;
         return true;
       }
       return false;
     }

     function getValue(array, oldVal) {
       var index = array.findIndex(function(element) {
         return element === oldVal;
       })
       return {
         exists : function()  {
           return index !== -1;
         },
         index : function() {
           return index;
         },
         replace : function(newVal) {
           if(index !== -1)  {
             array[index] = newVal;
             return true;
           }
           return false;
         },
         delete : function()  {
           if(index !== -1)  {
             array = array.splice(index, 1);
           }
         },
         value : function() {
           if(index !== -1)  {
             return array[index];
           }
           return undefined;
         }

       }
     }


     dialogVm.updateItem = function(oldVal, newVal) {
       //TODO no duplicates!!
       //
       //check to see if an original value has been updated
       var alreadyChagned = getValue(dialogVm.list.updatedItems.origVals, oldVal);
       if(alreadyChagned.exists()) {
         //It has been changedIndex
         dialogVm.list.updatedItems.newVals[alreadyChagned.index()] = newVal;
       } else {
         //Did a new itme get upadated
         var isNew = getValue(dialogVm.newItemOrig, oldVal);
         if(isNew.exists()) {
           dialogVm.list.newItems[isNew.index()] = newVal;
           //getValue(dialogVm.listItems, oldVal).replace(newVal);
         } else {
           var isOriginal = getValue(dialogVm.listItems, oldVal);
           if(isOriginal.exists())  {
             //It is and is had changed so lets add it to updatedItems
             dialogVm.list.updatedItems.newVals.push(newVal);
             dialogVm.list.updatedItems.origVals.push(oldVal);
           }
         }
       }
     };

     dialogVm.addItem = function(val)  {
       //TODO check duplicates
       var isDup = getValue(dialogVm.listItems, val).exists();
       if(!isDup)  {
         dialogVm.list.newItems.push(val);
         dialogVm.listItems.push(val);
         dialogVm.newItemOrig.push(val);
       }
     }

     dialogVm.deleteItem = function (val) {
       getValue(dialogVm.listItems, val).delete();
       var isNew = getValue(dialogVm.list.newItems, val);
       if(isNew.exists()) {
         dialogVm.newItemOrig = dialogVm.newItemOrig.splice(isNew.index(), 1);
         isNew.delete();
       } else {
         dialogVm.list.deleteItems.push(val);
       }
       getValue(dialogVm.list.updatedItems.newVals, val).delete();
       getValue(dialogVm.list.updatedItems.origVals, val).delete();

   }

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
  .factory('PanelFactory', function($mdDialog, DataFactory, GroupFactory, TypeFactory){
    var deletePanel = $mdDialog.confirm()
          .title('Delete Data Point')
          .ariaLabel('Delete the data')
          .ok('Delete')
          .cancel('Cancel')
          .clickOutsideToClose(true);


    //Data to fill
    //Info to display in panel
    //Callback function returned on Create
    function loadPanel(data, info, callback) {
      data.group = GroupFactory.getGroupByID(data.groupID);
      data.type = TypeFactory.getTypeByID(data.typeID);
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

    function loadListPanel(data, info, callback)  {
      $mdDialog.show({
              templateUrl: '/angular/templates/dialog-list.html',
              parent: angular.element(document.body),
              controller: "PanelDataEditController",
              controllerAs: 'dialogVm',
              bindToController: true,
              clickOutsideToClose: true,
              escapeToClose: true,
              locals : {
                listItems : data,
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
          disableGroup : true,
          disableType : true,
          disableID : true,
          disableDelete : false};
        loadPanel(data, info, DataFactory.updatePoint);
      },
      opendGroupEditPanel : function()  {
        groups = GroupFactory.getGroups();
        info = {
          title : "Group Editor"
        };
        loadListPanel(groups, info, function(data) {
          for(var index in data.deleteItems)  {
            GroupFactory.deleteGroupByName(data.deleteItems[index]);
          }
          for(var index in data.newItems)  {
            GroupFactory.addGroup(data.newItems[index]);
          }
          for(var index in data.updatedItems.origVals)  {
            GroupFactory.updateGroup(data.updatedItems.origVals[index], data.updatedItems.newVals[index]);
          }
        });
      },
      openTypeEditPanel : function()  {
        types = TypeFactory.getTypes();
        info = {
          title : "Type Editor"
        };
        loadListPanel(types, info, function(data) {
          for(var index in data.deleteItems)  {
            TypeFactory.deleteTypeByName(data.deleteItems[index]);
          }
          for(var index in data.newItems)  {
            TypeFactory.addType(data.newItems[index]);
          }
          for(var index in data.updatedItems.origVals)  {
            TypeFactory.updateType(data.updatedItems.origVals[index], data.updatedItems.newVals[index]);
          }
        });
      },
      openDataNewPanel : function() {
        //Update For adding panel
        info = {
          title : "Point Editor",
          accept : "Create",
          content : "Create Data Point",
          selectSensor : true,
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
      },
      openNewSensorPanel : function() {
        info = {
          title : "Point Editor",
          accept : "Create",
          content : "Create Data Point",
          disableDelete : true,
          hideID : true,
          hideDate : true,
          hideValue : true,
          editName : true,
          disableDelete : true
        };
        var data = {
          name : undefined,
          type : undefined,
          group : undefined,
          value : undefined,
          date : "2017-05-16T10:55:00.000Z"
        };
        loadPanel(data, info, DataFactory.addMetaData);
      }
    }
  })
