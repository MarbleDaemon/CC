{
	goog.require("sc.globals");

	goog.require("sc.core.ObjectUtils");
	goog.require("sc.core.Utils");

	goog.require("sc.geom.Edge");
	goog.require("sc.geom.IPoint");
	goog.require("sc.geom.IPolygon");
	goog.require("sc.geom.ISegment");
	goog.require("sc.geom.Vertex");
}
goog.provide("sc.geom.Polygon");
goog.scope(function ()
{
	var globals = sc.globals;

	var ArrayUtils = sc.core.ArrayUtils;
	var Edge = sc.geom.Edge;
	var ObjectUtils = sc.core.ObjectUtils;
	var TypedArrayUtils = sc.core.TypedArrayUtils;
	var Vertex = sc.geom.Vertex;

	/**
	 * @constructor
	 * @implements {sc.geom.IPolygon}
	 *
	 * @param {Array<(sc.geom.Point|Array.<number>)>} points
	 */
	sc.geom.Polygon = goog.defineClass(null, {
		/**
		 * @param {Array<(sc.geom.Point|Array.<number>)>} points
		 */
		constructor: function (points)
		{
			var thi$ = this;

			/**
			 * @type {Array.<Array.<number>>}
			 */
			var pointArray = TypedArrayUtils.produce(points, function (point)
			{
				return ObjectUtils.instanceOf(point, globals.Array) ? /** @type {Array.<number>} */(point) : [point.x, point.y];
			});

			/*var sum = 0;
			 TypedArrayUtils.forEachItem(pointArray, function (point, index)
			 {
			 var nextPoint = index < pointArray.length - 1 ? pointArray[index + 1] : pointArray[0];
			 sum += (nextPoint[0] - point[0]) * (nextPoint[1] + point[1]);
			 });
			 if (sum > 0)
			 {
			 pointArray = pointArray.reverse();
			 }*/
			if (TypedArrayUtils.aggregate(pointArray, 0, function (sum, point, index)
				{
					var nextPoint = index < pointArray.length - 1 ? pointArray[index + 1] : pointArray[0];
					sum += (nextPoint[0] - point[0]) * (nextPoint[1] + point[1]);
					return sum;
				}) > 0)
			{
				pointArray = pointArray.reverse();
			}

			/**
			 * @type {Array<sc.geom.IVertex>}
			 */
			this.vertices = [];

			/**
			 *
			 * @type {Array.<sc.geom.IEdge>}
			 */
			this.edges = TypedArrayUtils.produce(pointArray, function (point, index)
			{
				/**
				 * @type {sc.geom.IEdge}
				 */
				var edge;
				var vertexB = new Vertex(thi$, point[0], point[1]);

				if (index > 0)
				{
					var vertexA = ArrayUtils.lastEntry(thi$.vertices);
					edge = new Edge(thi$, vertexA, vertexB);
				}

				ArrayUtils.push(thi$.vertices, vertexB);

				return edge;
			});

			ArrayUtils.push(this.edges, new Edge(this, ArrayUtils.lastEntry(thi$.vertices), thi$.vertices[0]));
		},

		/**
		 *
		 * @param {sc.geom.ISegment} segment
		 *
		 * @return {boolean}
		 */
		intersectSegment: function (segment)
		{
			return TypedArrayUtils.forEachItem(this.edges, function (edge)
			{
				if (segment.intersect(edge))
				{
					return false;
				}
			});
		},

		/**
		 *
		 * @param {sc.geom.IVertex} pointA
		 * @param {sc.geom.IVertex} pointB
		 *
		 * @return {boolean}
		 */
		isJoinedVertices: function (pointA, pointB)
		{
			return (pointA.edgeA == pointB.edgeB) || (pointA.edgeB == pointB.edgeA);
		},

		/**
		 *
		 * @return {string}
		 */
		toString: function ()
		{
			return TypedArrayUtils.produce(this.vertices, function (vertex)
			{
				return vertex.toString();
			}).join(", ");
		},

		toJSON: function ()
		{
			return this.vertices;
		}
	});
});