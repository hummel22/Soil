angular.module('soil.factories.groups' ,[])
  .factory("GroupFactory", function ()  {
    //Groups are arranged with and object ID to a
    var groups = new Map();

    groups.set(25232,"WhitePot");
    groups.set(142342,"GreenPot");

    //TODO init load groups

    function getID(value) {
      for(var[key, val] in groups)  {
        if(value === val) {
          return key;
        }
      }
      throw "Not Found";
    }

    return {
      getGroups : function () {
        console.log(Array.from(groups.values()));
        return Array.from(groups.values());
      },
      addGroup : function (newGroup) {
        //TODO Service to post
        groups.set(id, newGroup);
      },
      deleteGroup : function (id) {
        groups.delete(id);
      },
      updateGroup : function (oldGroup, newGroup) {
        try {
          //TODO PUT to Service
          var id = getID(oldGroup);
          groups.set(id, newGroup);
        }catch(err) {
          log.console(err);
        }
      }
    }
  });
