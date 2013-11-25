/*
 * footsies
 * https://github.com/marcmartino/footsiesjs
 *
 * Copyright (c) 2013 marcmartino
 * Licensed under the MIT license.
 */

function existy(x) {  return x != null; }
function truthy(x) {  return (x !== false) && existy(x); }
function cat() {
  var head = _.first(arguments);
  if (existy(head)) {
    return head.concat.apply(head, _.rest(arguments));
  }
  return [];
}
function construct(head, tail) {
  return cat([head], _.toArray(tail));
}

var footsies = {
  extend: function (obj) {
    //adds attributes from obj  to this obj
    var prop;
    for (prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        this[prop] = obj[prop];
      }
    }
    return this;
  },
  storeDB: function(data, tabletop) {
    var sheet;
    for (sheet in data) {
      if (data.hasOwnProperty(sheet)) {
        var thisSheet = data[sheet];
        var updated = new Date(thisSheet.raw.feed.updated["$t"]).toDateString();
        // console.log(sheet + " updated: " + updated);
        // console.log(thisSheet.elements);
        footsies.db[sheet] = thisSheet.elements;
         
      }
    }
    console.log(footsies.db.Users);
    console.log(
      footsies.leftJoin({rowNumber: "userid"}, footsies.db.Users, footsies.db.Comments)
    );
  },
  init: function (startObj) {
    startObj.callback = footsies.storeDB;
    Tabletop.init(startObj);
    return this;
  }
}