{
	goog.provide("sc.collections.IDictionary");
}
goog.scope(function ()
{
	/**
	 * @interface
	 * @template Key, Value
	 */
	sc.collections.IDictionary = function ()
	{
	};
	sc.collections.IDictionary.prototype =
	{
		/**
		 *
		 * @param {Key} key
		 * @param {...?} var_args
		 *
		 * @return {Value}
		 */
		add: function (key, var_args)
		{
		},

		/**
		 *
		 * @param {Key} key
		 *
		 * @return {Value}
		 */
		get: function (key)
		{
		}
	};
});