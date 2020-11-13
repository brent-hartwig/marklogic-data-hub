'use strict';

const test = require("/test/test-helper.xqy");
const utils = require('/test/suites/data-hub/5/data-services/lib/mappingService.sjs').DocumentForTestingUtils;
const xmlToJson = require('/data-hub/5/data-services/mapping/xmlToJsonForMapping.sjs');

let assertions = [];

const result = utils.invokeService(utils.STEP_NAME, '/content/sampleCustomerDoc.xml');
const orderProp = result.data['OrderNS:Order'];
let markupScenariosProp;
if (orderProp) {
  markupScenariosProp = orderProp['OrderNS:MarkupScenarios'];
}

const expectedNamespaces = {
  "OD": "https://www.w3schools.com/OD",
  "OtherNS": "https://www.w3schools.com/OtherNS",
  "Wash": "https://www.w3schools.com/Washington",
  "Omega": "Omega",
  "Cali": "https://www.w3schools.com/California",
  "Product": "https://www.w3schools.com/ProductNS",
  "SD": "https://www.w3schools.com/SD1",
  "SD2": "https://www.w3schools.com/SD2",
  "OrderNS": "https://www.w3schools.com/OrderNS",
  "SV": "https://www.w3schools.com/SV",
  "Gamma": "https://www.microsoft.com/Gamma",
  "Gamma2": "https://www.amazon.com/Gamma"
};

assertions = assertions.concat([
  test.assertExists(result.data, 'Top-level "data" property does not exist'),
  test.assertExists(orderProp, "The data's first property is expected to be 'OrderNS:Order'"),
  // Are the namespaces of these attributes correct in the output?
  test.assertEqual("this attr should be 'in' in the output", String(orderProp['OD:OrderDetails']['@in']),
    "Unexpected value for the 'in' attribute value in " + JSON.stringify(orderProp['OD:OrderDetails'])),
  test.assertEqual("this attr should be 'in2' in the output", String(orderProp['OD:OrderDetails']['@in2']),
    "Unexpected value for the 'in2' attribute value in " + JSON.stringify(orderProp['OD:OrderDetails'])),
  test.assertEqual("this attr should be '@OtherNS:out' in the output", String(orderProp['OD:OrderDetails']['@OtherNS:out']),
    "Unexpected value for the 'OrderNS:out' attribute value in " + JSON.stringify(orderProp['OD:OrderDetails'])),
  // The two OrderDetail elements should be an array but namespace of children should be different.
  test.assertExists(orderProp['OD:OrderDetails']['OD:OrderDetail']),
  test.assertTrue(Array.isArray(orderProp['OD:OrderDetails']['OD:OrderDetail']) && orderProp['OD:OrderDetails']['OD:OrderDetail'].length === 2,
    "OD:OrderDetail should be an array with two items but is " + JSON.stringify(orderProp['OD:OrderDetails']['OD:OrderDetail'])),
  test.assertExists(orderProp['OD:OrderDetails']['OD:OrderDetail'][0]['Wash:UnitPrice'],
    "The first OD:OrderDetails element should have a Wash:UnitPrice child"),
  test.assertExists(orderProp['OD:OrderDetails']['OD:OrderDetail'][1]['Cali:UnitPrice'],
    "The second OD:OrderDetails element should have a Cali:UnitPrice child"),
  // ShippedDate should be an array.
  test.assertExists(orderProp['OrderNS:ShippedDate']),
  test.assertTrue(Array.isArray(orderProp['OrderNS:ShippedDate']) && orderProp['OrderNS:ShippedDate'].length === 2,
    "OrderNS:ShippedDate should be an array with two items but is " + JSON.stringify(orderProp['OrderNS:ShippedDate'])),
  // Verify the default namespace changed.
  test.assertExists(orderProp['SV:ShipVia']),
  // Verify the default namespace immediately reverted.
  test.assertExists(orderProp['OrderNS:ShipPostalCode'], "Looks like the default namespace did not revert"),
  // More should and should-not-be array tests
  test.assertEqual("Should *not* be in an array.", String(orderProp['Gamma:Element1']),
    "Gamma:Element1 should just be a string as next Element1 is in a different namespace"),
  test.assertEqual("Should *not* be in an array.", String(orderProp['Gamma2:Element1']),
    "Gamma2:Element1 should just be a string as previous Element1 is in a different namespace"),
  test.assertTrue(Array.isArray(orderProp['OrderNS:Element2']) && orderProp['OrderNS:Element2'].length === 2,
    "OrderNS:Element2 should be an array with two items but is " + JSON.stringify(orderProp['OrderNS:Element2'])),
  // Entering MarkupScenarios
  test.assertExists(markupScenariosProp, 'Missing OrderNS:Order.OrderNS:MarkupScenarios in ' +
    JSON.stringify(result.data)),
  // EmptyElementWithoutAttributes
  test.assertExists(markupScenariosProp['OrderNS:EmptyElementWithoutAttributes']),
  test.assertEqual('', String(markupScenariosProp['OrderNS:EmptyElementWithoutAttributes']),
    'Expected the OrderNS:EmptyElementWithoutAttributes property value to be an empty string'),
  // EmptyElementWithAttribute
  test.assertExists(markupScenariosProp['OrderNS:EmptyElementWithAttribute']),
  test.assertEqual('hello', String(markupScenariosProp['OrderNS:EmptyElementWithAttribute']['@attr']),
    'Expected OrderNS:EmptyElementWithAttribute to have the "@attr" property set to "hello"'),
  // NoTextOrAttrs
  test.assertExists(markupScenariosProp['OrderNS:NoTextOrAttrs']),
  test.assertEqual('', String(markupScenariosProp['OrderNS:NoTextOrAttrs']),
    'Expected the OrderNS:NoTextOrAttrs property value to be an empty string'),
  // JustText
  test.assertExists(markupScenariosProp['OrderNS:JustText']),
  test.assertEqual('Hello', String(markupScenariosProp['OrderNS:JustText']),
    'Expected the OrderNS:JustText property value to be "Hello"'),
  // JustAttr
  test.assertExists(markupScenariosProp['OrderNS:JustAttr']),
  test.assertEqual('Howdy', String(markupScenariosProp['OrderNS:JustAttr']['@attr']),
    'Expected OrderNS:JustAttr to have the "@attr" property set to "Howdy"'),
  // AttrAndText
  test.assertExists(markupScenariosProp['OrderNS:AttrAndText']),
  test.assertEqual('Some Text', String(markupScenariosProp['OrderNS:AttrAndText']['#text']),
    'Expected OrderNS:AttrAndText to have text of "Some Text"'),
  test.assertEqual('myattr', String(markupScenariosProp['OrderNS:AttrAndText']['@attr']),
    'Expected OrderNS:AttrAndText to have the "@attr" property set to "myattr"'),
  // AttrTextAndChild
  test.assertExists(markupScenariosProp['OrderNS:AttrTextAndChild']),
  test.assertEqual('How aredoing?', String(markupScenariosProp['OrderNS:AttrTextAndChild']['#text']),
    'Expected OrderNS:AttrTextAndChild to have text of "How aredoing?"'),
  test.assertEqual('woohoo!', String(markupScenariosProp['OrderNS:AttrTextAndChild']['@attr']),
    'Expected OrderNS:AttrTextAndChild to have the "@attr" property set to "woohoo!"'),
  test.assertEqual('you', String(markupScenariosProp['OrderNS:AttrTextAndChild']['OrderNS:b']),
    'Expected OrderNS:AttrTextAndChild to have a property named "b" with a value of "you"'),
  // MultipleTextNodes
  test.assertExists(markupScenariosProp['OrderNS:MultipleTextNodes']),
  test.assertEqual('1st text node2nd text node', String(markupScenariosProp['OrderNS:MultipleTextNodes']['#text']),
    'While not desired, expected the two text nodes in OrderNS:MultipleTextNodes to be concatenated'),
  // ExampleWithCDATA
  test.assertExists(markupScenariosProp['OrderNS:ExampleWithCDATA']),
  test.assertEqual('Text outside Text inside More text outside', String(markupScenariosProp['OrderNS:ExampleWithCDATA']),
    'Expected text nodes to be concatenated with CDATA content.'),
  // Verify the namespace map is correct.
  test.assertEqualJson(expectedNamespaces, result.namespaces, 'The namespaces do not match; expected ' +
    JSON.stringify(expectedNamespaces) + ' but got ' + JSON.stringify(result.namespaces)),
  // And finally the format test.
  test.assertEqual('XML', String(result.format))
]);

/*
 * BEGIN: source property tests
 */
const sourceProperties = result.sourceProperties;

// First source property.
let xpath = '/OrderNS:Order';
let prop = sourceProperties[0];
assertions = assertions.concat([
  test.assertEqual(xpath.substr(1), prop.name, "Unexpected name for the first source property"),
  test.assertEqual(xpath, prop.xpath, "Unexpected xpath for the first source property"),
  test.assertTrue(prop.struct, `Expected true for the first source property's struct property but got "${prop.struct}"`),
  test.assertEqual(0, prop.level, 'Unexpected level for the first source property')
]);

// Test struct=false and level=1
xpath = '/OrderNS:Order/OrderNS:RequiredDate';
prop = utils.getSourcePropertyByXPath(sourceProperties, xpath);
assertions = assertions.concat([
  test.assertFalse(prop.struct, `Unexpected struct for the ${xpath} source property`),
  test.assertEqual(1, prop.level, `Unexpected level for the ${xpath} source property`)
]);

// Namespace changed
xpath = '/OrderNS:Order/OD:OrderDetails';
prop = utils.getSourcePropertyByXPath(sourceProperties, xpath);
assertions.push(test.assertExists(prop, `Expected to find a source property where xpath=${xpath} but did not`));

// Attribute without namespace prefix.
let name = '@in';
let props = utils.getSourcePropertiesByName(sourceProperties, name);
assertions = assertions.concat([
  test.assertTrue(props.length === 1, `Expected 1 source property where name=${name} but found ${props.length}`),
  test.assertEqual(`/OrderNS:Order/OD:OrderDetails/${name}`, props[0].xpath, `Unexpected xpath property value for the "${name}" source property`),
  test.assertFalse(props[0].struct, `Unexpected struct for the "${name}" source property`),
  test.assertEqual(2, props[0].level, `Unexpected level for the "${name}" source property`)
])

// Attribute with namespace prefix.
xpath = '/OrderNS:Order/OD:OrderDetails/@OtherNS:out';
prop = utils.getSourcePropertyByXPath(sourceProperties, xpath);
assertions.push(test.assertExists(prop, `Expected to find a source property where xpath=${xpath} but did not`));

// Array (struct=true)
xpath = '/OrderNS:Order/OD:OrderDetails/OD:OrderDetail';
prop = utils.getSourcePropertyByXPath(sourceProperties, xpath);
assertions = assertions.concat([
  test.assertExists(prop, `Expected to find a source property where xpath=${xpath} but did not`),
  test.assertTrue(prop.struct, `Unexpected struct for the "${xpath}" source property`)
]);

// Level 3
xpath = '/OrderNS:Order/OrderNS:MarkupScenarios/OrderNS:AttrTextAndChild/OrderNS:b';
prop = utils.getSourcePropertyByXPath(sourceProperties, xpath);
assertions = assertions.concat([
  test.assertExists(prop, `Expected to find a source property where xpath=${xpath} but did not`),
  test.assertEqual(3, prop.level, `Unexpected level for the "${xpath}" source property`)
]);

// Verify there are the correct number of properties where name=@attr but that they each have a unique xpath.
let expectedCount = 4;
let uniqueXPaths = [];
name = '@attr';
props = utils.getSourcePropertiesByName(sourceProperties, name);
for (let p of props) {
  if (!uniqueXPaths.some(val => val === p.xpath)) {
    uniqueXPaths.push(p.xpath);
  }
}
assertions.push(test.assertEqual(expectedCount, props.length,
  `Expected ${expectedCount} source properties where name=${name} but found ${props.length}`))
assertions.push(test.assertEqual(expectedCount, uniqueXPaths.length,
  `Expected ${expectedCount} unique XPaths on source properties where name=${name} but found ${uniqueXPaths.length}`))

// Verify #text data properties didn't also become source properties.
const textNodes = utils.getSourcePropertiesByName(sourceProperties, xmlToJson.PROP_NAME_FOR_TEXT);
assertions.push(test.assertTrue(textNodes.length === 0,
  `sourceProperties not expected to include "name" properties with a value of "${xmlToJson.PROP_NAME_FOR_TEXT}" yet ${textNodes.length} were found`));
/*
 * END: source property tests
 */

assertions;
