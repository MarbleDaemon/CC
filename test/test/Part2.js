goog.require("test.Part1");
goog.provide("test.Part2");
goog.scope(function ()
{
	var a = "part 2";

	/**
	 * @constructor
	 */
	test.Part2 = function ()
	{
		new test.Part1();
		console.log(a);
	};
});