angular.module('soil.factories.groups' ,[])
  .factory("GroupFactory", function ()  {

    //The group factory should be the single source of updateing and edint grousp
    //Data factory will load group names using the id. This way when chages are made.data doesn/t car aboue the meta

    //Groups are arranged with and object ID to a
    var groups = new Map();

    groups.set(25232,"WhitePot");
    groups.set(142342,"GreenPot");

    //TODO init load groups

    function getID(value) {
      console.log("Search for " + value);
      for(var[key, val] of groups)  {
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
        var id = Math.floor(Math.random() * (100000 - 0 + 1));
        groups.set(id, newGroup);
      },
      deleteGroupByID : function (id) {
        groups.delete(id);
      },
      deleteGroupByName : function (name) {
        for(var [key, value] of groups)  {
          console.log("Key: " + key + " Value: " + value + " Search: " + name);
          if(value === name)  {
            groups.delete(key);
            break;
          }
        }
      },
      updateGroup : function (oldGroup, newGroup) {
        try {
          //TODO PUT to Service
          var id = getID(oldGroup);
          groups.set(id, newGroup);
        }catch(err) {
          console.log(err);
        }
      },
      getGroupByID : function (id)  {
        if(!groups.has(Number(id))) {
          console.log("OOHHHHH BOYYY");
          console.log(id);
          console.log(groups);
        }
        return groups.get(Number(id));
      }
    }
  });
