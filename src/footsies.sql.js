footsies.extend({
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
  innerJoin: function (whereObj, tableOne, tableTwo) {
    //definitely needs to be refactored
    var keys = _.keys(whereObj);
    var switchRowNames = footsies.rename(whereObj);
    return _.reduce(function (accum, val, key) {
      var switched = switchRowNames(footsies.findValues(keys, val));

      var selectAll = footsies.selectAll(switched, tableTwo);
      var thisJoins = _.map(function (joinRow) {
            return _.merge(val, joinRow);
        }, selectAll);
      return accum.concat(thisJoins);
    }, [], tableOne);
  },
  leftJoin: function (whereObj, tableOne, tableTwo) {
    //definitely needs to be refactored
    var keys = _.keys(whereObj);
    var switchRowNames = footsies.rename(whereObj);
    return _.reduce(function (accum, val, key) {
      var switched = switchRowNames(footsies.findValues(keys, val));

      var selectAll = footsies.selectAll(switched, tableTwo);
      var thisJoins = _.map(function (joinRow) {
            return _.merge(val, joinRow);
        }, selectAll);
      return accum.concat(selectAll.length > 0 ? thisJoins : val);
    }, [], tableOne);
  },
  findValues: function (propArr, row) {
    return _.reduce(function (accum, val, key) {
      accum[val] = row[val];
      return accum;
    }, {}, propArr);
  },
  getRowValues: function (row, columnNamesArr) {
    return _.reduce(function (acc, key, val) {
      if (row[val]) {
        acc[val] = row[val];
      } 
      return acc;
    }, {}, columnNamesArr);
  },
  rename: (function (newNameObj, row) {
      return _.reduce(function (o, nu, old) {
        if (_.has(row, old)) {
          o[nu] = row[old];
          delete o[old];
        }
        return o;
      },
      _.clone(row), newNameObj);
    }).autoCurry(2),
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
});