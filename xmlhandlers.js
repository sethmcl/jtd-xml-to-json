/**
 * Handle parsing a "testsuite" element.
 * @param attrs {Array} attributes of this element
 * @returns {Object} representation of XML element as a JavaScript object
 */
exports.testsuiteStart = function( attrs ) {
  var obj = exports.parseAttributes( attrs );
  return '"testsuite":' + JSON.stringify(obj) + ',"tests":[';
};

exports.testsuiteEnd = function() {
  return ']';
};

/**
 * Handle parsing a "testcase" element.
 * @param doc {Object} the JavaScript object that we want to add this element to
 * @param attrs {Array} attributes of this element
 * @returns {Object} representation of XML element as a JavaScript object
 */
exports.testcaseStart = function( attrs ) {
  var obj = exports.parseAttributes( attrs, ['name', 'time'] );
  return JSON.stringify(obj).slice(0, -1) + ',"failures":[';
};

exports.testcaseEnd = function() {
  return ']},';
};

/**
 * Handle parsing a "failure" element.
 * @param attrs {Array} attributes of this element
 * @returns {Object} representation of XML element as a JavaScript object
 */
exports.failureStart = function( attrs ) {
  var obj = exports.parseAttributes( attrs );
  return JSON.stringify(obj);
};

exports.failureEnd = function() {
 return ',';
};

/**
 * Turn an array of element attributes into an object of key/value pairs
 * @param attrs {Array} element attributes
 * @param filter {Array} optional. If present, only include these attributes
 * @return {Object} key/value pairs
 */
exports.parseAttributes = function( attrs, filter ) {
  var obj = {},
      attrName,
      attrValue;

  attrs.forEach(function( value, idx ) {
    attrName = value[0];
    attrValue = value[3];

    if(!filter || (filter && filter.indexOf(attrName) !== -1)) {
      obj[attrName] = attrValue;
    }
  });

  return obj;
};
