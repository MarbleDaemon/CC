goog.require("sc.core.Maths");
goog.require("sc.core.Utils");
goog.require("sc.display.Colors");
goog.require("sc.geom.Point");
goog.require("sc.geom.Polygon");
goog.require("sc.geom.Segment");
goog.require("sc.html.IDOMCanvasElement");

goog.require("labs.pathfinder.ILink");
goog.require("labs.pathfinder.INode");

goog.provide("labs.pathfinder.Link");
goog.scope(function ()
{
	var ArrayUtils = sc.core.ArrayUtils;
	var Colors = sc.display.Colors;
	var FunctionUtils = sc.core.FunctionUtils;
	var Maths = sc.core.Maths;
	var Point = sc.geom.Point;
	var Polygon = sc.geom.Polygon;
	var Segment = sc.geom.Segment;
	var TypedArrayUtils = sc.core.TypedArrayUtils;

	/**
	 * @constructor
	 * @implements {labs.pathfinder.ILink}
	 * @extends {sc.geom.Segment}
	 */
	labs.pathfinder.Link = goog.defineClass(Segment, {
		/**
		 *
		 * @param {labs.pathfinder.INode=} pointA
		 * @param {labs.pathfinder.INode=} pointB
		 */
		constructor: function (pointA, pointB)
		{
			FunctionUtils.invoke(Segment, this, pointA, pointB);

			pointA.links[pointB.id] = pointB.links[pointA.id] = this;
		},

		/**
		 * @type {labs.pathfinder.Node}
		 */
		pointA: null,

		/**
		 * @type {labs.pathfinder.Node}
		 */
		pointB: null,

		/**
		 *
		 * @param {labs.pathfinder.INode} node
		 *
		 * @return {labs.pathfinder.INode}
		 */
		getOtherNode: function (node)
		{
			return this.pointA == node? this.pointB: this.pointA;
		},

		/**
		 *
		 * @param {sc.html.IDOMCanvasElement} output
		 * @param {number=} red
		 * @param {number=} green
		 * @param {number=} blue
		 *
		 * @return {labs.pathfinder.ILink}
		 */
		render: function (output, red, green, blue)
		{
			output.context2D
				.beginPath()
				.moveToPoint(this.pointA)
				.lineToPoint(this.pointB)
				.closePath()
				.setLineDash([5])
				.strokeStyle(Colors.toStyleString(red, green, blue, 1))
				.stroke();

			return this;
		}
	})
});