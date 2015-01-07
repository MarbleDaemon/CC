{
	goog.provide("sc.collections.ICollection");
}
goog.scope(function ()
{
	/**
	 * @interface
	 * @template I
	 */
	sc.collections.ICollection = function ()
	{
	};
	sc.collections.ICollection.prototype =
	{
		/**
		 *
		 * @param {I} item
		 *
		 * @return {I}
		 */
		add: function (item)
		{
		},

		/**
		 *
		 * @return {I}
		 */
		get: function ()
		{
		}
	};
});