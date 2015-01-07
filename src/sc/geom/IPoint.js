goog.provide("sc.geom.IPoint");
goog.scope(function ()
{
	/**
	 * @interface
	 *
	 * @param {?number=} x
	 * @param {?number=} y
	 */
	sc.geom.IPoint = function (x, y)
	{
	};

	sc.geom.IPoint.prototype =
	{
		/**
		 * @type {number}
		 */
		x: 0,

		/**
		 * @type {number}
		 */
		y: 0,

		/**
		 *
		 * @param {sc.geom.IPoint} point
		 *
		 * @returns {number}
		 */
		distanceToPoint: function(point)
		{
		}
	};
});