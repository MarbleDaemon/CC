goog.require("sc.enumerable.Yielder");

goog.provide("sc.enumerable.IEnumerator");
goog.scope(function ()
{
	/**
	 *
	 * @interface
	 */
	sc.enumerable.IEnumerator = function()
	{
	};

	/**
	 * @type {function():*}
	 */
	sc.enumerable.IEnumerator.prototype.current;

	/**
	 *
	 * @return {boolean}
	 */
	sc.enumerable.IEnumerator.prototype.moveNext = function()
	{
	};

	/**
	 *
	 */
	sc.enumerable.IEnumerator.prototype.dispose = function()
	{
	};
});