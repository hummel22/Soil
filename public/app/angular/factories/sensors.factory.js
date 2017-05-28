angular.module('soil.factories.sensors',[])
  .factory('SensorFactory', function()  {

    sensors = {
        2793423 : {
          name : "SpinySensor",
          sensorId : 2793423,
          typeId : 75798,
          groupId : 25232,
          datasetId : 12412231
        },
        89792342 : {
          name : "SmallSensor",
          sensorId :89792342,
          typeId : 75798,
          groupId : 25232,
          datasetId : 45742342
        },
        4745647 : {
          name : "DupSensor",
          sensorId :4745647,
          typeId : 75798,
          groupId : 25232,
          datasetId : 45742342
        }
    };

    /*
    * Add Sensor Data to the list.
    *   No duplicate IDs allowed
    */
    function addSensorData(sensor)  {
      sensors[sensor.id] = sensor;
    }

    function deleteSensorData(sensor) {
      delete sensors[sensor.id];
    }

    function updateSensorData(oldSensor, newSensor) {
      if(sensors[oldSensor.id] !== undefined) {
        if(oldSensor.id !== newSensor.id)  {
          deleteSensorData(oldSensor);
          addSensorData(newSensor);
        } else {
          var sensor = sensors[oldSensor.id];
          sensor.name = newSensor.name;
          sensor.typeId = newSensor.typeId;
          sensor.groupId = newSensor.groupId;
          sensor.datasetId = newSensor.datasetId;
        }
      } else {
        console.log("Unable to update sensor. Does not exist");
      }
    }

    return {
      printData : function () {
        console.log(sensors);
      },

      getSensors: function()  {
        return sensors;
      },

      getSensorDataByName : function(sensorName) {
        for(var key in sensors)  {
          if(sensors[key].name === sensorName)  {
            return sensors[key];
          }
        }
        console.log("Sensor Load By Name Failed");
        return undefined;
      },

      getSensorById : function (id) {
        return sensors[id];
      },

      addSensor : function(sensor)  {
        //TODO Validate
        //TODO Service - get ID
        sensor.id = Math.floor(Math.random() * (1000000 - 0 + 1));
        addSensorData(sensor);
      },
      updateSensor : function(oldSensor, newSensor) {
        //TODO Validate
        //TODO Service Update PUT
        //Theoretically there is no way that the sensor id can change.
        updateSensorData(oldSensor, newSensor);
      }
    }
  });
