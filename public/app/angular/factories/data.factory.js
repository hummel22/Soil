angular.module('soil.factory.data',['soil.factories.groups'])
  .factory('DataFactory', function(GroupFactory)  {

    //tmp bock of data
    var dataset = {
      "SpinySensor" : {
        name : "SpinySensor",
        type : "Humidity",
        group : "WhitePot",
        groupID : 142342,
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
        };
          //Add to data to the end for now. may sort in future is there a std container?
        dataset[data.name].data.push({value : data.value, date : data.date});

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
            console.log("Magic");
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
          console.log("HELLO");
          var metaData = [];
          for(var key in dataset) {
            metaData.push({
              name : dataset[key].name,
              type : dataset[key].type,
              group : GroupFactory.getGroupByID(dataset[key].groupID),
              groupID : dataset[key].groupID
            });
          }
          console.log(metaData);
          return metaData;
        },
        getMetaDataByName :function(name) {
          return {
            name : name,
            type : dataset[name].type,
            group : GroupFactory.getGroupByID(dataset[key].groupID),
            groupID : dataset[key].groupID
          }
        },
        addMetaData : function(metaData)  {
          if(metaData.name in dataset) {
            console.log("Sensor already Exists");
          } else {
            {
              dataset[metaData.name] = {
                name : metaData.name,
                type : metaData.type,
                group : metaData.group
              }
            }
          }
        }
      }
  });
