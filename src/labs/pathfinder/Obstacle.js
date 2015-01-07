goog.require("sc.core.Maths");
goog.require("sc.core.Utils");
goog.require("sc.display.Colors");
goog.require("sc.geom.Point");
goog.require("sc.geom.Polygon");
goog.require("sc.geom.Segment");
goog.require("sc.html.modules.IRenderingContext2D");

goog.provide("labs.pathfinder.Obstacle");
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
	 * @extends {sc.geom.Polygon}
	 *
	 * @param {Array<(sc.geom.Point|Array.<number>)>} points
	 */
	labs.pathfinder.Obstacle = goog.defineClass(Polygon, {
		/**
		 * @param {Array<(sc.geom.Point|Array.<number>)>} points
		 */
		constructor: function (points)
		{
			FunctionUtils.invoke(Polygon, this, points);

			/**
			 * @type {sc.html.modules.IRenderingContext2D}
			 */
			this.output = null;
		},

		isPointVisible: function (vertex, point)
		{
			var thi$ = this;
			var segment = new Segment(vertex, point);

			/*thi$.output.context2D
			 .save()
			 .beginPath()
			 .moveToPoint(segment.pointA)
			 .lineToPoint(segment.pointB)
			 .closePath()
			 .strokeStyle("blue")
			 .stroke()
			 .restore();*/

			return TypedArrayUtils.forEachItem(this.edges, function (edge)
			{
				if ((edge.pointA != vertex) && (edge.pointB != vertex))
				{
					var intersection = segment.intersection(edge, true);
					if (intersection)
					{
						/*thi$.output.context2D
						 .save()
						 .beginPath()
						 .circle(intersection.x, intersection.y, 5)
						 .closePath()
						 .strokeStyle("green")
						 .stroke()
						 .restore();*/

						return false;
					}
				}
			});
		},

		/**
		 *
		 * @param {sc.geom.Vertex} vertex
		 * @param {sc.geom.Point} point
		 * @param {boolean=} goB
		 *
		 * @returns {Array<sc.geom.Point>}
		 */
		findContour: function (vertex, point, goB)
		{
			var path = [vertex];
			var count = 0;

			while (!this.isPointVisible(vertex, point) && (count < this.edges.length))
			{
				vertex = /** @type {sc.geom.Vertex} */(goB ? vertex.edgeB.pointB : vertex.edgeA.pointA);
				ArrayUtils.push(path, vertex);
				count++;
			}

			return path;
		},

		/**
		 *
		 * @param {sc.html.modules.IRenderingContext2D} output
		 * @param {{fillColor:string, strokeColor:string, strokeWidth:number, strokeDash:Array.<number>}} style
		 * @param {(function(sc.geom.IPoint):sc.geom.IPoint)=} transformer
		 *
		 * @return {labs.pathfinder.Obstacle}
		 */
		render: function (output, style, transformer)
		{
			output
				.save()
				.beginPath()

			TypedArrayUtils.forEachItem(this.edges, function (edge, index)
			{
				if (index == 0)
				{
					output.moveToPoint(transformer ? transformer(edge.pointA) : edge.pointA);
				}

				output.lineToPoint(transformer ? transformer(edge.pointB) : edge.pointB);
			});

			output
				.closePath()
				.fillStyle(style.fillColor)
				.fill()
				.strokeStyle(style.strokeColor, style.strokeWidth || 1)
				.setLineDash(style.strokeDash || [])
				.stroke()
				.restore();

			return this;
		}
	})
});