'use strict';

const test = require("/test/test-helper.xqy");
const utils = require('/test/suites/data-hub/5/data-services/lib/mappingService.sjs').DocumentForTestingUtils;

const assertions = [];

const result = utils.invokeService(utils.STEP_NAME, '/content/sampleCustomerDoc.json');
assertions.concat([
  test.assertExists(result.data, 'Top-level "data" property does not exist'),
  test.assertEqual(204, Number(result.data.CustOrders.CustomerID)),
  test.assertEqual('Sparrow', String(result.data.CustOrders.Nicknames.Nickname[1])),
  test.assertEqualJson({}, result.namespaces, 'The "namespaces" property should be an empty object for JSON input.'),
  test.assertEqual('JSON', String(result.format), 'The "format" property should be set to "JSON".')
]);

const sourceProperties = result.sourceProperties;

let name = '$id';
assertions.concat(utils.getSourcePropertyAssertions(sourceProperties, name, `/CustOrders/invalidQNames/node('${name}')`, false, 2));
name = '$array-of-objects';
assertions.concat(utils.getSourcePropertyAssertions(sourceProperties, name, `/CustOrders/invalidQNames/node('${name}')`, true, 2));
name = '$array-of-values';
assertions.concat(utils.getSourcePropertyAssertions(sourceProperties, name, `/CustOrders/invalidQNames/array-node('${name}')/node()`, true, 2));

/*
let name = 'invalidLocalName:asdf';
assertions.concat(utils.getSourcePropertyAssertions(sourceProperties, name, `/CustOrders/OddPropertyNames/node('${name}')`, false, 2));
name = 'propName\u{EFFFF}IncludesUnicode';
assertions.concat(utils.getSourcePropertyAssertions(sourceProperties, name, `/CustOrders/OddPropertyNames/${name}`, false, 2));
*/

assertions;
