goog.require("sc.core.Utils");
goog.require("sc.enumerable.ArrayEnumerable");

goog.provide("sc.collections.Grouping");
goog.scope(function ()
{
	var ArrayEnumerable = sc.enumerable.ArrayEnumerable;

	/**
	 * Represents a collection of objects that have a common key.
	 *
	 * @constructor
	 * @extends {sc.enumerable.ArrayEnumerable}
	 *
	 * @param {*} groupKey
	 * @param {Array} elements
	 */
	sc.collections.Grouping = function (groupKey, elements)
	{
		/**
		 *
		 * @return {*}
		 */
		this.key = function ()
		{
			return groupKey;
		};

		sc.core.FunctionUtils.invoke(ArrayEnumerable, this, elements);
	};

	sc.collections.Grouping.prototype = new ArrayEnumerable();
});
