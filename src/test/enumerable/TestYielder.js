goog.require("sc.enumerable.Yielder");
goog.require("sc.test.Asserts");

goog.provide("test.enumerable.TestYielder");
goog.scope(function ()
{
	var Asserts = sc.test.Asserts;

	/**
	 * @constructor
	 */
	sc.enumerable.TestYielder = function ()
	{
		var yielder = new sc.enumerable.Yielder();

		this.test_yieldBreak = function ()
		{
			Asserts.assertEqual(yielder.yieldBreak(), false);
		};

		this.test_yieldReturn = function ()
		{
			Asserts.assertEqual(yielder.yieldReturn(5), true);
			Asserts.assertEqual(yielder.current(), 5);

			Asserts.assertEqual(yielder.yieldReturn("test"), true);
			Asserts.assertEqual(yielder.current(), "test");

			var testObject = {test: "true"};
			Asserts.assertEqual(yielder.yieldReturn(testObject), true);
			Asserts.assertEqual(yielder.current(), testObject);
		};

		this.test_yieldReturn = function ()
		{
			Asserts.assertEqual(yielder.yieldReturn(5), true);
		};
	};

	var test = new sc.enumerable.TestYielder();
	test.test_yieldBreak();
	test.test_yieldReturn();
});
