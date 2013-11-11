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
    selectAll: function (whereObj, table) {
      return _.findWhere(whereObj, table);
    },
    selectOne: function (whereObj, table) {
      return _.find(whereObj, table);
    },
    rename: function (newNameObj, row) {
      return _.reduce(function (o, nu, old) {
        if (_.has(row, old)) {
          o[nu] = row[old];
          delete o[old];
          return o;
        }
        return o;
      },
      row, newNameObj);
    },
    as: function (newNames, table) {
      return _.map(function (obj) {
        return footsies.rename(newNames, obj);
      }, table);
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
    console.log(footsies.db.Comments);
    // console.log(
    //   footsies.as({"name": "fullName"}, footsies.db.Users)
    // );
    console.log(
      footsies.db.Comments, footsies.selectOne({"postid": 1})
      );
    console.log(
      footsies.selectOne({"postid": 1}, footsies.db.Comments)
      );


  };
   
  Tabletop.init({ key: '0Aj-Lur_rakjTdGI3S1E4S3FlcHIxUWwzYVN2RTFKTEE',
    callback: showDB,
    simpleSheet: false });

}(jQuery));
