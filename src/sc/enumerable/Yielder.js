goog.provide("sc.enumerable.Yielder");
goog.scope(function ()
{
	/**
	 * @constructor
	 */
	sc.enumerable.Yielder = function ()
	{
		var _current = null;

		/**
		 *
		 * @return {*}
		 */
		this.current = function ()
		{
			return _current;
		};

		/**
		 *
		 * @param {*} value
		 * @return {boolean}
		 */
		this.yieldReturn = function (value)
		{
			_current = value;
			return true;
		};

		/**
		 *
		 * @return {boolean}
		 */
		this.yieldBreak = function ()
		{
			return false;
		};
	};
});
