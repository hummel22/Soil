angular.module('soil.factory.data',[])
  .factory('DataFactory', function()  {

    //tmp bock of data
    var dataset = {
      "SpinySensor" : {
        name : "SpinySensor",
        type : "Humidity",
        group : "WhitePot",
        data : [
          {
            value : 100,
            date : "2017-05-16T10:55:00.000Z"
          }, {
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
          dataset[data.name] = {
            name : data.name,
            type : data.type,
            group : data.group,
            data : []
          };
          //Add to data to the end for now. may sort in future is there a std container?
          dataset[data.name].data.push({value : data.value, date : data.date});
        };
      };


      return {
        getData : function () {
          return dataset;
        },
        addPoint : function(data) {
          addDataPoint(data);
          //Add With service
          //If return succesfull add to dataset!
        },
        printData : function () {
          console.log(dataset);
        }
      }
  });
