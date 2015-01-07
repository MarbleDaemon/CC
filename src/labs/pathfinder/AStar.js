goog.require("sc.core.Maths");
goog.require("sc.core.Utils");
goog.require("sc.events.PointerEvent");
goog.require("sc.geom.Edge");
goog.require("sc.geom.Point");
goog.require("sc.geom.Segment");
goog.require("sc.geom.Vertex");

goog.require("labs.pathfinder.Obstacle");

goog.provide("labs.pathfinder.AStar");
goog.scope(function ()
{
	var ArrayUtils = sc.core.ArrayUtils;
	var FunctionUtils = sc.core.FunctionUtils;
	var Maths = sc.core.Maths;
	var Obstacle = labs.pathfinder.Obstacle;
	var Point = sc.geom.Point;
	var PointerEvents = sc.events.PointerEvents;
	var Segment = sc.geom.Segment;
	var TypedArrayUtils = sc.core.TypedArrayUtils;

	/**
	 *
	 * @param {Array<sc.geom.Point>} path
	 *
	 * @returns {number}
	 */
	function calculatePathLength(path)
	{
		var result = 0;
		var startPoint = path[0];
		TypedArrayUtils.forEachItem(path, function (point)
		{
			result += startPoint.distanceToPoint(point);
			startPoint = point;
		}, 1);

		return result;
	}

	/**
	 * @constructor
	 */
	labs.pathfinder.AStar = goog.defineClass(null, {
		constructor: function ()
		{
		},

		/**
		 *
		 * @param {sc.geom.Point} startPoint
		 * @param {sc.geom.Point} endPoint
		 * @param {Array<labs.pathfinder.Obstacle>} obstacles
		 * @param {Array<sc.geom.Segment>=} excluded
		 *
		 * @return {sc.geom.Edge}
		 */
		checkPath: function (startPoint, endPoint, obstacles, excluded)
		{
			var route = new Segment(startPoint, endPoint);
			var distance = Infinity;
			var closest = null;

			TypedArrayUtils.forEachItem(obstacles, function (obstacle)
			{
				TypedArrayUtils.forEachItem(obstacle.edges, function (edge)
				{
					if (!ArrayUtils.contain(excluded, edge))
					{
						var intersection = route.intersect(edge, true);
						if (intersection)
						{
							var newDistance = startPoint.distanceToPoint(intersection);
							if (newDistance < distance)
							{
								distance = newDistance;
								closest = edge;
							}
						}
					}
				});
			});

			return closest;
		},

		findContour: function (edge, startPoint, endPoint, obstacles, excluded, goB)
		{
			var thi$ = this;

			/**
			 * @type {labs.pathfinder.Obstacle}
			 */
			var obstacle = /** @type {labs.pathfinder.Obstacle} */(edge.parent);

			/**
			 * @type {sc.geom.Vertex}
			 */
			var vertex = /** @type {sc.geom.Vertex} */(goB ? edge.pointB : edge.pointA);

			/**
			 *
			 * @type {Array<sc.geom.Segment>}
			 */
			var tempExcluded = excluded;
			var contour = obstacle.findContour(vertex, endPoint, goB);
			var distance = Infinity;
			/**
			 * @type Array<sc.geom.Point>
			 */
			var result = [];

			/*TypedArrayUtils.forEachItem(contour, function (point, index)
			 {
			 tempExcluded = ArrayUtils.concat(excluded);
			 var path = ArrayUtils.concat(
			 thi$.findPath(startPoint, point, obstacles, tempExcluded),
			 ArrayUtils.slice(contour, index + 1)
			 );
			 var length = calculatePathLength(path);
			 if (length < distance)
			 {
			 result = path;
			 distance = length;
			 }
			 });*/

			return ArrayUtils.concat(
				thi$.findPath(startPoint, vertex, obstacles, excluded),
				contour,
				this.findPath(ArrayUtils.lastEntry(contour), endPoint, obstacles, tempExcluded)
			);
		},

		/**
		 *
		 * @param {sc.geom.Point} startPoint
		 * @param {sc.geom.Point} endPoint
		 * @param {Array<labs.pathfinder.Obstacle>} obstacles
		 * @param {Array<sc.geom.Segment>=} excluded
		 *
		 * @return {Array<sc.geom.Point>}
		 */
		findPath: function (startPoint, endPoint, obstacles, excluded)
		{
			excluded = excluded || [];

			var result = [];

			var intersection = this.checkPath(startPoint, endPoint, obstacles, excluded);

			if (intersection)
			{
				var path;
				ArrayUtils.push(excluded, intersection);
				/*if (fromPoint == intersection.pointA)
				 {
				 path = ArrayUtils.concat(this.findPath(fromPoint, intersection.pointB, obstacles, excluded),
				 this.findPath(intersection.pointB, endPoint, obstacles, excluded));
				 }
				 else if (fromPoint == intersection.pointB)
				 {
				 path = ArrayUtils.concat(this.findPath(fromPoint, intersection.pointA, obstacles, excluded),
				 this.findPath(intersection.pointA, endPoint, obstacles, excluded));
				 }
				 else*/
				{
					var obstacle = /** @type {labs.pathfinder.Obstacle} */(intersection.parent);

					var vertexA = /** @type {sc.geom.Vertex} */(intersection.pointA);
					var pathA = obstacle.findContour(vertexA, endPoint);
					//var pathA = this.findContour(intersection, startPoint, endPoint, obstacles,
					// ArrayUtils.concat(excluded));
					var lengthA = calculatePathLength(pathA);

					var vertexB = /** @type {sc.geom.Vertex} */(intersection.pointB);
					var pathB = obstacle.findContour(vertexB, endPoint, true);
					//var pathB = this.findContour(intersection, startPoint, endPoint, obstacles,
					// ArrayUtils.concat(excluded), true);
					var lengthB = calculatePathLength(pathB);

					var vertex;
					if (lengthA < lengthB)
					{
						path = pathA;
						vertex = vertexA;
					}
					else
					{
						path = pathB;
						vertex = vertexB;
					}

					TypedArrayUtils.forEachItem(obstacle.edges, function (edge)
					{
						ArrayUtils.push(excluded, edge);
					})

					ArrayUtils.shift(path);

					path = ArrayUtils.concat(
						this.findPath(startPoint, vertex, obstacles, excluded),
						path,
						this.findPath(path.length > 0 ? ArrayUtils.lastEntry(path) : vertex, endPoint, obstacles, excluded)
					);
				}

				result = ArrayUtils.concat(result, path);

				//intersection = this.checkPath(ArrayUtils.lastEntry(result), endPoint, obstacles, excluded);

				//loop++;
			}
			else
			{
				ArrayUtils.push(result, startPoint);
				ArrayUtils.push(result, endPoint);
			}

			return result;
		},

		/**
		 *
		 * @param {Array<sc.geom.Point>} path
		 * @param {Array<labs.pathfinder.Obstacle>} obstacles
		 *
		 * @return {Array<sc.geom.Point>}
		 */
		smoothPath: function (path, obstacles)
		{
			for (var count = 2; count < path.length; count++)
			{
				var pointA = /** @type {sc.geom.Vertex} */(path[count - 2]);
				var pointB = /** @type {sc.geom.Vertex} */(path[count]);
				var segment = new Segment(pointA, pointB);
				var intersection = false;
				TypedArrayUtils.forEachItem(obstacles, function (obstacle)
				{
					if (obstacle.intersectSegment(segment))
					{
						intersection = true;

						return false;
					}
				});
				/*var intersection = this.checkPath(pointA, pointB, obstacles, []);*/
				if (!intersection)
				{
					path.splice(count - 1, 1);
					count--;
				}
			}

			return path;
		}
	})
});