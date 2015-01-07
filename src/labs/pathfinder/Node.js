goog.require("sc.core.Maths");
goog.require("sc.core.Utils");
goog.require("sc.display.Colors");
goog.require("sc.geom.Point");
goog.require("sc.geom.Polygon");
goog.require("sc.geom.Vertex");
goog.require("sc.html.IDOMCanvasElement");

goog.require("labs.pathfinder.ILink");
goog.require("labs.pathfinder.INode");

goog.provide("labs.pathfinder.Node");
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
	var Vertex = sc.geom.Vertex;

	/**
	 * @constructor
	 * @implements {labs.pathfinder.INode}
	 * @extends {sc.geom.Point}
	 */
	labs.pathfinder.Node = goog.defineClass(Point, {
		/**
		 *
		 * @param {number} id
		 * @param {sc.geom.IPoint} point
		 */
		constructor: function (id, point)
		{
			FunctionUtils.invoke(Point, this, point.x, point.y);

			/**
			 *
			 * @type {number}
			 */
			this.id = id;

			/**
			 *
			 * @type {Array<number>}
			 */
			this.color =  [0x33, 0x33, 0x33];

			/**
			 *
			 * @type {boolean}
			 */
			this.isConcave = (point instanceof Vertex)? (/** @type {sc.geom.Vertex} */(point)).isConcave(): false;

			/**
			 * @type {Object<number, labs.pathfinder.ILink>}
			 */
			this.links = {};
		},

		/**
		 *
		 * @param {sc.html.IDOMCanvasElement} output
		 *
		 * @return {labs.pathfinder.Node}
		 */
		render: function (output)
		{
			var color = this.color;
			output.context2D
				.beginPath()
				.circle(this.x, this.y, 2)
				.closePath()
				.fillStyle(Colors.toStyleString(color[0], color[1], color[2], 0.5))
				.fill()
				.strokeStyle(Colors.toStyleString(color[0], color[1], color[2], 1))
				.stroke();

			return this;
		}
	})
});