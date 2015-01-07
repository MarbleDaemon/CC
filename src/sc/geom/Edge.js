goog.require("sc.core.Utils");
goog.require("sc.geom.IEdge");
goog.require("sc.geom.IVertex");
goog.require("sc.geom.Point");
goog.require("sc.geom.Segment");

goog.provide("sc.geom.Edge");
goog.scope(function ()
{
	var FunctionUtils = sc.core.FunctionUtils;
	var Segment = sc.geom.Segment;

	/**
	 * @constructor
	 * @implements {sc.geom.IEdge}
	 * @extends {sc.geom.Segment}
	 *
	 * @param {sc.geom.IPolygon} parent
	 * @param {sc.geom.IVertex} pointA
	 * @param {sc.geom.IVertex} pointB
	 */
	sc.geom.Edge = goog.defineClass(Segment, {
		/**
		 *
		 *
		 * @param {sc.geom.IPolygon} parent
		 * @param {sc.geom.IVertex} pointA
		 * @param {sc.geom.IVertex} pointB
		 */
		constructor: function (parent, pointA, pointB)
		{
			FunctionUtils.invoke(Segment, this, pointA, pointB);

			pointA.edgeB = pointB.edgeA = this;

			this.parent = parent;
		}
	});
});