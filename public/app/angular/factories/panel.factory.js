angular.module('soil.factories.panel',['soil.factory.data', 'soil.factories.groups','soil.factories.types','soil.factories.sensors'])
  .controller('PanelDataEditController',function($scope, $mdDialog, PanelFactory, GroupFactory, TypeFactory, DataFactory, SensorFactory){
    var dialogVm = this;

    //Data passed
    //
    dialogVm.groups = GroupFactory.getGroups();
    dialogVm.types = TypeFactory.getTypes();
    dialogVm.sensors = SensorFactory.getSensors();
    dialogVm.datasets = DataFactory.getDataSetIds();
      dialogVm.tmp = {
        name : dialogVm.data.name,
        date : dialogVm.data.date,
        value : dialogVm.data.value,
        type : dialogVm.data.type,
        group : dialogVm.data.group,
        id : dialogVm.data.id,
        sensorId : dialogVm.data.sensorId,
        datasetId : dialogVm.data.datasetId
      };
      dialogVm.sensor = dialogVm.data.name;

    //Copy by Value, so if live edits are made to sensor they dont go to name


    dialogVm.close = function ()  {
      $mdDialog.cancel();
    }

    dialogVm.update = function () {
      //Validate data here
      if(dialogVm.panelForm.$valid) {
        dialogVm.tmp.date = new Date(dialogVm.tmp.date).toISOString();
        $mdDialog.hide(dialogVm.tmp);
      }
    }

    dialogVm.delete = function () {
      PanelFactory.openDeletePanel(dialogVm.tmp.name, dialogVm.tmp.id);
    }


    //Set Other fields(type and group) based on sensor chosen.
    dialogVm.setData = function() {
      var sensor = dialogVm.sensorData;
      for(var index in dialogVm.sensors)  {
        if(dialogVm.sensors[index].name === dialogVm.tmp.name) {
          dialogVm.tmp.type = dialogVm.sensors[index].type;
          dialogVm.tmp.group = dialogVm.sensors[index].group;
        }
      }
    }

  })

  .controller('PanelListEditController',function($scope, $mdDialog){
    var dialogVm = this;

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
      console.log("Save List");
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


  })


  .factory('PanelFactory', function($mdDialog, DataFactory, GroupFactory, TypeFactory, SensorFactory){
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
        .then(function(rData){
          rData.groupId = GroupFactory.getIDByGroup(rData.group);
          rData.typeId = TypeFactory.getIDByType(rData.type);
          rData.sensorId = SensorFactory.getSensorDataByName(rData.name).sensorId;
          callback(rData);
        }, function() {
          console.log("Cancelled");
        });
    }

    function loadListPanel(data, info, callback)  {
      $mdDialog.show({
              templateUrl: '/angular/templates/dialog-list.html',
              parent: angular.element(document.body),
              controller: "PanelListEditController",
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
      openDeletePanel : function(data)  {
        deletePanel._options.textContent = "Are you sure you want to delete data object " + data.id + " for sensor " + data.name+ "?";
        $mdDialog.show(deletePanel).then(function() {
          DataFactory.deletePoint(data);
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
          disableDelete : false
        };
        data.type = TypeFactory.getTypeByID(data.typeId);
        data.group = GroupFactory.getGroupByID(data.groupId);
        console.log("DATA***");
        console.log(data);
        loadPanel(data, info, function(rData) {
          rData.datasetId = data.datasetId;
          DataFactory.updatePoint(rData, rData);
        });
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
      openDataNewPanelGen : function() {
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
      openDataNewPanel : function(data) {
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
        loadPanel(data, info, DataFactory.addPoint);
      },
      openSensorEditPanel : function(sensor) {
        //Update For adding panel
        info = {
          title : "Sensor Editor",
          accept : "Update",
          content : "Edit Sensor Info",
          editName : true,
          selectType : true,
          selectGroup : true,
          selectDataset : true,
          disableID : true,
          hideDate : true,
          hideValue : true
        };
        var data = {
          name : sensor.name,
          type : TypeFactory.getTypeByID(sensor.typeId),
          group : GroupFactory.getGroupByID(sensor.groupId),
          id : sensor.sensorId,
          datasetId : sensor.datasetId,
          date : "2017-05-16T10:55:00.000Z" // Garbarge date to fill feild
        }
        loadPanel(data, info, function(newData) {
          var updatedData = SensorFactory.updateSensor(sensor, newData);
          // sensor.name = updatedData.name;
          // sensor.type = updatedData.type;
          // sensor.typeID = updatedData.typeID;
          // sensor.group = updatedData.group;
          // sensor.groupID = updatedData.groupID;
        });
      },
      openNewSensorPanel : function() {
        info = {
          title : "Sensor Editor",
          accept : "Create",
          content : "Create Sensor",
          disableDelete : true,
          hideID : true,
          hideDate : true,
          hideValue : true,
          editName : true,
          disableDelete : true
        };
        var data = {
          name : undefined,
          type : TypeFactory.getTypes()[0],
          group : GroupFactory.getGroups()[0],
          value : undefined,
          date : "2017-05-16T10:55:00.000Z"
        };
        loadPanel(data, info, DataFactory.addMetaData);
      }
    }
  })
