(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery#footsies', {
    // This will run before each test in this module.
    setup: function() {
      // this.elems = $('#qunit-fixture').children();
    }
  });

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
    db: {},
    selectAll: _.filter, //whereObj, table
    selectOne: _.find, //whereObj
    selectColumns: (function (keysArray, table) {
      return _.map(
        footsies.rowFunc(footsies.pick, keysArray)
        , table);
    }).autoCurry(2),
    as: (function (newNames, table) {
      return _.map(footsies.rowFunc(footsies.rename, newNames)
        , table);
    }).autoCurry(2),
    restrict: (function (pred, table) {
      return _.reduce(function (newTable, obj) {
        if (truthy(pred(obj))) {
          return newTable;
        } else {
          return _.without(newTable, obj);
        }
      }, table, table);
    }).autoCurry(2),
    sort: _.sortBy, //propertyName, table
    rename: function (newNameObj, row) {
      return _.reduce(function (o, nu, old) {
        if (_.has(row, old)) {
          o[nu] = row[old];
          delete o[old];
        }
        return o;
      },
      row, newNameObj);
    },
    pick: function (propArray, row) {
      return _.reduce(function (accum, val) {
        if (existy(row[val])) {
          accum[val] = row[val];
        }
        return accum;
      }, {}, propArray);
    },
    rowFunc: function (fun, params) {
      return function (obj) {
        return fun(params, obj);
      }
    }
  }

  var showDB = function(data, tabletop) {
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
      // footsies.as({"name": "fullName"}, footsies.db.Users)
      // footsies.selectColumns(["name", "private"], footsies.db.Users)
      footsies.sort("name", footsies.db.Users)
    );



  };
   
  Tabletop.init({ key: '0Aj-Lur_rakjTdGI3S1E4S3FlcHIxUWwzYVN2RTFKTEE',
    callback: showDB,
    simpleSheet: false });

}(jQuery));
