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

  module("setup#footsies", {
    setup: function () {
      console.log("setup func");
    }
  })

  test('basic#footsies', function () {
    // This will run before each test in this module.
    var f = footsies.init({ key: '0Aj-Lur_rakjTdGI3S1E4S3FlcHIxUWwzYVN2RTFKTEE',
      simpleSheet: false,
      parseNumbers: true });
    equal(1, 1, "reality exists");
  });

}(jQuery));
