angular.module('soil.factory.data',[])
  .factory('DataFactory', function()  {

    datasets = {
      12412231 : {
          1235124345234 : {
            datasetId : 12412231,
            id : 1235124345234,
            value : 100,
            date : "2017-05-16T10:55:00.000Z"
          },
          678596757 : {
            datasetId : 12412231,
            id : 678596757,
            value : 85,
            date : "2017-05-16T10:57:00.000Z"
          }
        },
        45742342 : {
            5344574 : {
              datasetId : 45742342,
              id : 5344574,
              value : 654,
              date : "2017-05-16T10:23:00.000Z"
            },
            2342353454 : {
              datasetId : 45742342,
              id : 2342353454,
              value : 23,
              date : "2017-05-16T10:10:00.000Z"
            }
          }
        };



      /*
      * Add a data point to the dataset.
      * The data should be defined as
      *   sensorId - The Id of the sensor this data is from
      *   id - the id for this data Point
      *   value - the value of the data Point
      *   date - the date of the data point
      */
      function addDataPoint(data) {
        //Does this sensor exist
        //Validate here
        //Create a new data set if this does not exists
        if(datasets[data.datasetId] === undefined) {
          datasets[data.datasetId] = {};
        }
        //make a new copy of the object in the the arary
        datasets[data.datasetId][data.id] = {
            datasetId : data.datasetId,
            id : data.id,
            value : data.value,
            date : data.date
        };
      };

      /*
      * Update a data point
      * data should be in the form
      *   sensorId - The Id of the sensor this data is from
      *   id - the id for this data Point
      *   value - the value of the data Point
      *   date - the date of the data point
      *
      * Options
      * - Move to different datasetId - TODO
      * - Change id (BAD) - TODO
      * - Change value or date.
      */
      function updateDataPoint(oldData, newData)  {
        if(datasets[oldData.datasetId] !== undefined) {
          var dataset = datasets[oldData.datasetId]
          if(dataset[oldData.id] !== undefined) {
            //check if sensor ID chagned
            //check if id changed ?? Not allowed?
            if(oldData.datasetId !== newData.datasetId || oldData.id !== newData.id)  {
              //delete the data point and then just make a new one
              deleteDataPoint(oldData);
              addDataPoint(newData);
            } else {
              var dataPoint = dataset[oldData.id];
              dataPoint.value = newData.value;
              dataPoint.date = newData.date;
            }
          } else {
            console.log("Unable to update data point. Original data point not found: " + oldData.id);
          }

        } else {
          console.log("Unable to update data point. Original dataset not found: " + oldData.datasetId);
        }
      };

      function deleteDataPoint(data)  {
        if(datasets[data.datasetId] !== undefined && datasets[data.datasetId][data.id] !== undefined) {
          delete datasets[data.datasetId][data.id];
        } else {
          console.log("Unable to delete data point. Dataset does not exist: " + data.datasetId);
        }
      }


      return {
        getData : function () {
          return datasets;
        },

        getDataById : function(id) {
          return datasets[id];
        },

        addPoint : function(data) {
          //TODO Add With service
          //Get ID returned
          //If return succesfull add to dataset!
          data.id = Math.floor(Math.random() * (1000000 - 0 + 1));
          addDataPoint(data);
        },

        updatePoint : function (oldData, newData) {
          //TODO Update with service
          // Get Real new data from service
          var addedSucces = true;
          if(addedSucces){
            //If returns Created with ID
            //Addpoint
            //data.id = Math.floor(Math.random() * (1000000 - 0 + 1));
            updateDataPoint(oldData, newData);
          }
        },

        deletePoint : function(data)  {
          deleteDataPoint(data);
        },

        printData : function () {
          console.log(datasets);
        }
      }
  });
