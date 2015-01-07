goog.require("sc.core.Utils");
goog.require("sc.geom.IEdge");
goog.require("sc.geom.IPoint");
goog.require("sc.geom.IPolygon");
goog.require("sc.geom.Point");

goog.provide("sc.geom.Vertex");
goog.scope(function ()
{
	var FunctionUtils = sc.core.FunctionUtils;
	var Point = sc.geom.Point;

	/**
	 * @constructor
	 * @implements {sc.geom.IVertex}
	 * @extends {sc.geom.Point}
	 *
	 * @param {sc.geom.IPolygon} parent
	 * @param {number} x
	 * @param {number} y
	 * @param {sc.geom.IEdge=} edgeA
	 * @param {sc.geom.IEdge=} edgeB
	 */
	sc.geom.Vertex = goog.defineClass(Point, {
		/**
		 *
		 * @param {sc.geom.IPolygon} parent
		 * @param {number} x
		 * @param {number} y
		 * @param {sc.geom.IEdge=} edgeA
		 * @param {sc.geom.IEdge=} edgeB
		 */
		constructor: function (parent, x, y, edgeA, edgeB)
		{
			FunctionUtils.invoke(Point, this, x, y);

			/**
			 * @type {sc.geom.IPolygon}
			 */
			this.parent = parent;

			/**
			 * @type {sc.geom.IEdge}
			 */
			this.edgeA = /** @type {sc.geom.IEdge} */(edgeA);

			/**
			 * @type {sc.geom.IEdge}
			 */
			this.edgeB = /** @type {sc.geom.IEdge} */(edgeB);
		},

		/**
		 *
		 * @return {boolean}
		 */
		isConcave: function ()
		{
			var previousPoint = this.edgeA.pointA;
			var nextPoint = this.edgeB.pointB;
			var previous = new Point(this.x - previousPoint.x, this.y - previousPoint.y);
			var next = new Point(nextPoint.x - this.x, nextPoint.y - this.y);

			var cross = (previous.x * next.y) - (previous.y * next.x);
			return cross < 0;
		},

		toJSON: function ()
		{
			return [this.x, this.y];
		}
	});
});