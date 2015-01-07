goog.require("sc.core.Utils");
goog.require("sc.geom.Point");

goog.provide("labs.pathfinder.WayPoint");
goog.scope(function ()
{
	var FunctionUtils = sc.core.FunctionUtils;

	/**
	 * @constructor
	 * @extends {sc.geom.Point}
	 *
	 * @param {number} x
	 * @param {number} y
	 */
	labs.pathfinder.WayPoint = goog.defineClass(sc.geom.Point, {
		/**
		 *
		 * @param {number} x
		 * @param {number} y
		 */
		constructor: function (x, y)
		{
			FunctionUtils.invoke(sc.geom.Point, this, x, y);
		}
	})
});