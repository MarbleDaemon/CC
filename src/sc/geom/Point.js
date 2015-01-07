goog.require("sc.core.Maths");
goog.require("sc.geom.IPoint");

goog.provide("sc.geom.Point");
goog.scope(function ()
{
	var Maths = sc.core.Maths;

	/**
	 * @constructor
	 * @implements {sc.geom.IPoint}
	 *
	 * @param {?number=} x
	 * @param {?number=} y
	 */
	sc.geom.Point = goog.defineClass(null, {
		/**
		 *
		 * @param {?number=} x
		 * @param {?number=} y
		 */
		constructor: function (x, y)
		{
			/**
			 *
			 * @type {number}
			 */
			this.x = x || 0;
			/**
			 *
			 * @type {number}
			 */
			this.y = y || 0;
		},

		/**
		 *
		 * @param {sc.geom.IPoint} point
		 *
		 * @returns {number}
		 */
		distanceToPoint: function (point)
		{
			var dx = Maths.abs(this.x - point.x);
			var dy = Maths.abs(this.y - point.y);

			return dx == dy ? dx * Maths.SQRT2 : Maths.sqrt(Maths.sqr(dx) + Maths.sqr(dy));
		},

		toString: function ()
		{
			return "[" + this.x + ", " + this.y + "]";
		}
	});
});