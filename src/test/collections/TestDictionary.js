goog.require("sc.constants");
goog.require("sc.collections.Dictionary");
goog.require("sc.test.Asserts");

goog.provide("test.collections.TestDictionary");
goog.scope(function ()
{
	var constants = sc.constants;

	var Asserts = sc.test.Asserts;

	/**
	 * @constructor
	 */
	sc.enumerable.TestDictionary = function ()
	{
		this.test_StringStringDictionary = function ()
		{
			/**
			 * @type {sc.collections.Dictionary.<string, string>}
			 */
			var dictionary = new sc.collections.Dictionary();

			var stringKey1 = "testKey1";
			var stringKey2 = "testKey2";
			var stringValue1 = "testValue1";
			var stringValue2 = "testValue2";

			Asserts.assertEqual(dictionary.count(), 0);

			dictionary.add(stringKey1, stringValue1);
			Asserts.assertEqual(dictionary.count(), 1);
			Asserts.assert(dictionary.contains(stringKey1));
			Asserts.assert(!dictionary.contains(stringKey2));

			var value = dictionary.get(stringKey1);
			Asserts.assertString(value);
			Asserts.assertEqual(value, stringValue1);

			dictionary.set(stringKey1, stringValue2);
			Asserts.assertEqual(dictionary.count(), 1);
			Asserts.assertEqual(dictionary.get(stringKey1), stringValue2);

			Asserts.assert(!dictionary.set(stringKey2, stringValue2));
			Asserts.assertEqual(dictionary.count(), 1);

			dictionary.add(stringKey2, stringValue2);
			Asserts.assertEqual(dictionary.count(), 2);

			dictionary.remove(stringKey1);
			Asserts.assertEqual(dictionary.count(), 1);
			Asserts.assertEqual(dictionary.get(stringKey2), stringValue2);
			Asserts.assertEqual(dictionary.get(stringKey1), constants.UNDEFINED);
		};
	};

	var test = new sc.enumerable.TestDictionary();
	test.test_StringStringDictionary();
});
