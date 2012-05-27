/**
 * jtd-xml-to-json
 * A simple node.js script which will convert XML output from JS Test Driver to JSON format
 * @author Seth McLaughlin
 */
module.exports = function JtdXml2Json(file) {
  var libxmljs  = require('libxmljs'),
      handlers  = require('./xmlhandlers'),
      fs        = require('fs'),
      colors    = require('colors'),
      output    = [],
      xml,
      json,
      runCb;

  // Load XML
  xml = fs.readFileSync(file).toString();

  // Create SAX parser
  parser = new libxmljs.SaxParser({
    startDocument:  onStartDocument,
    endDocument:    onEndDocument,
    startElementNS: onStartElementNS,
    endElementNS:   onEndElementNS
  });

  function run(cb) {
    runCb = cb;

    // Parse document
    parser.parseString(xml);
  }

  // Called when parse completes
  function onParseComplete() {
    json = output.join('');
    json = json.replace(/,\}/g, '}');
    json = json.replace(/,\]/g, ']');
    runCb(JSON.stringify(JSON.parse(json)));
  }

  // Handle document start SAX event
  function onStartDocument() {
    output.push('{');
  }

  // Handle document end SAX event
  function onEndDocument() {
    output.push('}');
    onParseComplete();
  }

  // Handle start element SAX event
  function onStartElementNS( el, attrs, prefix, uri, namespace ) {
    var handler = handlers[el + 'Start'];
    if( typeof handler === 'function' ) {
      output.push( handler( attrs ) );
    }
  }

  // Handle end element SAX event
  function onEndElementNS( el, prefix, uri ) {
    var handler = handlers[el + 'End'];

    if( typeof handler === 'function' ) {
      output.push( handler() );
    }
  }

  // public methods
  return {
    run: run
  };
};
