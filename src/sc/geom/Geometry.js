goog.require("sc.globals");
goog.require("sc.core.Maths");
goog.require("sc.core.Utils");

goog.provide("sc.geom.Geometry");
goog.scope(function ()
{
	var Geometry = sc.geom.Geometry;
	var Maths = sc.core.Maths;

	/**
	 *
	 * @param {number} percent
	 *
	 * @return {boolean}
	 */
	Geometry.distance = function (percent)
	{
		return Maths.random() * 100 <= percent;
	};
})
;
