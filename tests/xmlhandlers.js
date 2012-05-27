var handlers = require('../xmlhandlers');

// When passed data describing a testsuite element,
// an object should be returned containing the attributes
// and their values of the element.
exports.testTestSuiteElement = function( test ) {
  var doc = {},
      attrs = [
        ['name', null, null, 'Firefox.ShowMoreTest'],
        ['errors', null, null, '0'],
        ['failures', null, null, '1'],
        ['tests', null, null, '6'],
        ['time', null, null, '2.5']
      ],
      result;

  result = handlers.testsuiteStart( attrs ) + handlers.testsuiteEnd();
  test.equal( result, '"testsuite":{"name":"Firefox.ShowMoreTest","errors":"0","failures":"1","tests":"6","time":"2.5"},"tests":[]');
  test.done();
};

// When passed data describing a testcase element,
// an object should be returned containing the attributes
// and their values of the element.
exports.testTestCaseElement = function( test ) {
  var doc = {},
      attrs = [
        ['name', null, null, 'testClick'],
        ['time', null, null, '1']
      ],
      result;

  result = handlers.testcaseStart( attrs ) + handlers.testcaseEnd();
  test.equal( result, '{"name":"testClick","time":"1","failures":[]},');
  test.done();
};

// When passed data describing a failure element,
// an object should be returned containing the attributes
// and their values of the element.
exports.testFailureElement = function( test ) {
  var doc = {},
      attrs = [
        ['type', null, null, 'fail'],
        ['message', null, null, 'error went bad']
      ],
      result;

  result = handlers.failureStart( attrs ) + handlers.failureEnd();
  test.equal( result, '{"type":"fail","message":"error went bad"},');
  test.done();
};
