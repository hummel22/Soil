angular.module('soil.factory.data',['soil.factories.groups','soil.factories.types'])
  .factory('DataFactory', function(GroupFactory, TypeFactory)  {

    //tmp bock of data
    var dataset = {
      "SpinySensor" : {
        name : "SpinySensor",
        type : "Humidity",
        typeID : 75798,
        group : "WhitePot",
        groupID : 25232,
        dataID : 523233432,
        data : [
          {
            id : 1235124345234,
            value : 100,
            date : "2017-05-16T10:55:00.000Z"
          }, {
            id : 1235124345235,
            value : 85,
            date : "2017-05-16T10:57:00.000Z"
          }
        ]
      }
    };


      function addDataPoint(data) {
        //Does this sensor exist
        if(!(data.name in dataset)) {
          //didn't exist so add a new Point!
          console.log("Sensor does not exist");
          console.log(data);
        } else {
          dataset[data.name].data.push({value : data.value, date : data.date, id : data.id});
        }
          //Add to data to the end for now. may sort in future is there a std container?
      };

      //user is only allowed to chagned date and value
      //Only call if verifed by
      function updateDataPoint(data)  {
        var sensorData = dataset[data.name].data;
        for(var index in sensorData)  {
          if(sensorData[index].id === data.id) {
            sensorData[index].value = data.value;
            sensorData[index].date = data.date;
            break;
          }
        }
      };

      function isPoint(name, id)  {
        if(name in dataset) {
          var sensorData = dataset[name].data
          for(var index in sensorData)  {
            if(sensorData[index].id === id) {
              return true;
            }
          }
        }
        return false;
      };


      return {
        getData : function () {
          return dataset;
        },

        addPoint : function(data) {
          //TODO Add With service
          //Get ID returned
          //If return succesfull add to dataset!
          data.id = Math.floor(Math.random() * (1000000 - 0 + 1));
          addDataPoint(data);
        },

        updatePoint : function (data) {
          //TODO Update with service
          var addedSucces = true;
          if(isPoint(data.name, data.id)) { //replace with service call
            //If returns updated
              //Update dataset
              updateDataPoint(data);
          } else if(addedSucces){
            //If returns Created with ID
            //Addpoint
            data.id = Math.floor(Math.random() * (1000000 - 0 + 1));
            addDataPoint(data);
          } else {
            //TODO launch error dialog
            //alert.error
          }
        },

        deletePoint : function(name, id)  {
          //TODO delete with service
          //If succesull delete from set
          if(name in dataset) {
            var sensorData = dataset[name].data
            for(var index in sensorData)  {
              if(sensorData[index].id === id) {
                dataset[name].data.splice(index, 1);
                break;
              }
            }
          }
        },
        printData : function () {
          console.log(dataset);
        },
        getMetaData : function()  {
          var metaData = [];
          for(var key in dataset) {
            metaData.push({
              name : dataset[key].name,
              type : TypeFactory.getTypeByID(dataset[key].typeID),
              typeID : dataset[key].typeID,
              group : GroupFactory.getGroupByID(dataset[key].groupID),
              groupID : dataset[key].groupID
            });
          }
          return metaData;
        },
        getMetaDataByName : function(name) {
          return {
            name : name,
            type : dataset[name].type,
            typeID : dataset[name].typeID,
            group : dataset[name].group,
            groupID : dataset[name].groupID
          }
        },
        addMetaData : function(metaData)  {
          if(metaData.name in dataset) {
            console.log("Sensor already Exists");
          } else {
              dataset[metaData.name] = {
                name : metaData.name,
                type : metaData.type,
                typeID : metaData.typeID,
                group : metaData.group,
                groupID : metaData.groupID,
                data : []
              }
          }
        },
        updateSensor : function(sensorOriginalName, data) {
            if(sensorOriginalName in dataset) {
              if(data.name !== sensorOriginalName)  {
                dataset[data.name] = dataset[sensorOriginalName];
                delete dataset[sensorOriginalName]
              }
              if(data.typeID !== dataset[data.name].typeID) {
                dataset[data.name].typeID = data.typeID;
                dataset[data.name].type = TypeFactory.getTypeByID(data.typeID);
              }
              if(data.groupID !== dataset[data.name].groupID) {
                dataset[data.name].groupID = data.groupID;
                dataset[data.name].group = GroupFactory.getGroupByID(data.groupID);
              }
              return this.getMetaDataByName(data.name);
            }
            return this.getMetaDataByName(sensorOriginalName);
        }
      }
  });
