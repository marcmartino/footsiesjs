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
      footsies.db = {"Posts":[{"text":"wowzers first poast! very exciting<br />much contents<p style=\"text-align: left\">wow</p>","rowNumber":1}],
      "Users":[{"name":"Marc Martino","email":"mrmarc772@yahoo.com","private":1,"rowNumber":1},{"name":"Brandon Diaz","email":"bcaturand@gmail.com","private":0,"rowNumber":2},{"name":"Kevin Stratton","email":"krstratton09@gmail.com","private":0,"rowNumber":3},{"name":"Devon Bellman","email":"n/a","private":0,"rowNumber":4}],
      "Comments":[{"userid":2,"postid":1,"comment":"this is cool","rowNumber":1},{"userid":1,"postid":1,"comment":"awesome stuffs","rowNumber":2},{"userid":1,"postid":2,"comment":"sweetness bro!","rowNumber":3}]};
    }
  })

  test('basic#footsies', function () {
    // This will run before each test in this module.
    var f = footsies.init({ key: '0Aj-Lur_rakjTdGI3S1E4S3FlcHIxUWwzYVN2RTFKTEE',
      simpleSheet: false,
      parseNumbers: true });
    equal(1, 1, "reality exists");
  });

  test('sql#footsies', function () {
    deepEqual(footsies.as({name: "fullName"}, footsies.db.Users),
      [{"fullName":"Marc Martino","email":"mrmarc772@yahoo.com","private":1,"rowNumber":1},
            {"fullName":"Brandon Diaz","email":"bcaturand@gmail.com","private":0,"rowNumber":2},
            {"fullName":"Kevin Stratton","email":"krstratton09@gmail.com","private":0,"rowNumber":3},
            {"fullName":"Devon Bellman","email":"n/a","private":0,"rowNumber":4}],
      "rename table with one renaming param");
  })

}(jQuery));
