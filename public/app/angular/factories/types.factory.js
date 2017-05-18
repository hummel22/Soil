angular.module('soil.factories.types', [])
  .factory("TypeFactory", function ()  {

    //The group factory should be the single source of updateing and edint grousp
    //Data factory will load group names using the id. This way when chages are made.data doesn/t car aboue the meta

    //Groups are arranged with and object ID to a
    var types = new Map();

    types.set(75798,"Humidity");
    types.set(142342,"Temperature");
    types.set(47545,"Light");
    types.set(3425,"UVLight");


    //TODO init load groups

    function getID(value) {
      for(var[key, val] of types)  {
        if(value === val) {
          return key;
        }
      }
      throw "Not Found";
    }

    return {
      getTypes : function () {
        return Array.from(types.values());
      },
      addType : function (newType) {
        //TODO Service to post
        var id = Math.floor(Math.random() * (100000 - 0 + 1));
        types.set(id, newType);
      },
      deleteTypeByID : function (id) {
        types.delete(id);
      },
      deleteTypeByName : function (name) {
        for(var [key, value] of types)  {
          if(value === name)  {
            types.delete(key);
            break;
          }
        }
      },
      updateType : function (oldType, newType) {
        try {
          //TODO PUT to Service
          var id = getID(oldType);
          types.set(id, newType);
        }catch(err) {
          console.log(err);
        }
      },
      getTypeByID : function (id)  {
        return types.get(Number(id));
      },
      getIDByType : function(value) {
        return getID(value);
      }
    }
  });
