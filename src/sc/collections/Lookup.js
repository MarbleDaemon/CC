goog.require("sc.collections.Dictionary");
goog.require("sc.collections.Grouping");
goog.require("sc.enumerable.Enumerable");

goog.provide("sc.collections.Lookup");
goog.scope(function ()
{
	var Enumerable = sc.enumerable.Enumerable;
	var Grouping = sc.collections.Grouping;

	/**
	 *
	 * @param {sc.collections.Dictionary} dictionary
	 * @constructor
	 */
	sc.collections.Lookup = function (dictionary)
	{
		this.count = function ()
		{
			return dictionary.count();
		};

		this.get = function (key)
		{
			return Enumerable.from(dictionary.get(key));
		};

		this.contains = function (key)
		{
			return dictionary.contains(key);
		};

		this.toEnumerable = function ()
		{
			return dictionary.toEnumerable().select(function (kvp)
			{
				return new Grouping(kvp.key, kvp.value);
			});
		};
	};
});