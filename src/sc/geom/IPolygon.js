goog.provide("sc.geom.IPolygon");
goog.scope(function ()
{
	/**
	 * @interface
	 *
	 *  @param {Array<sc.geom.IPoint>} points
	 */
	sc.geom.IPolygon = function (points)
	{
	};

	sc.geom.IPolygon.prototype =
	{
		/**
		 * @type {Array<sc.geom.IEdge>}
		 */
		edges: [],

		/**
		 * @type {Array<sc.geom.IVertex>}
		 */
		vertices: [],

		/**
		 *
		 * @param {sc.geom.ISegment} segment
		 *
		 * @return {boolean}
		 */
		intersectSegment: function (segment)
		{
		},

		/**
		 *
		 * @param {sc.geom.IVertex} pointA
		 * @param {sc.geom.IVertex} pointB
		 *
		 * @return {boolean}
		 */
		isJoinedVertices: function(pointA, pointB)
		{
		},

		/**
		 * @return {string}
		 */
		toString: function ()
		{
		}
	};
});