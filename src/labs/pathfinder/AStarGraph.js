goog.require("sc.core.Maths");
goog.require("sc.core.ObjectUtils");
goog.require("sc.core.Utils");
goog.require("sc.events.PointerEvent");
goog.require("sc.geom.Edge");
goog.require("sc.geom.Point");
goog.require("sc.geom.Segment");
goog.require("sc.geom.Vertex");

goog.require("labs.pathfinder.Graph");
goog.require("labs.pathfinder.Link");
goog.require("labs.pathfinder.Node");
goog.require("labs.pathfinder.Obstacle");
goog.require("labs.pathfinder.Path");

goog.provide("labs.pathfinder.AStarGraph");
goog.scope(function ()
{
	var ArrayUtils = sc.core.ArrayUtils;
	var Maths = sc.core.Maths;
	var ObjectUtils = sc.core.ObjectUtils;
	var Path = labs.pathfinder.Path;
	var Point = sc.geom.Point;
	var Segment = sc.geom.Segment;
	var TypedArrayUtils = sc.core.TypedArrayUtils;

	function _getPathCost(path)
	{
		return path.cost;
	}

	function _sortByPropertyValue(arr, getter)
	{
		arr.sort(function (item1, item2)
		{
			var value1 = getter(item1);
			var value2 = getter(item2);
			return value1 < value2 ? -1 : (value1 > value2 ? 1 : 0);
		});
	};

	/**
	 *
	 * @param {Array<sc.geom.IPoint>} path
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
	labs.pathfinder.AStarGraph = goog.defineClass(null, {
		constructor: function ()
		{
		},

		/**
		 *
		 * @param {sc.geom.IPoint} startPoint
		 * @param {sc.geom.IPoint} endPoint
		 * @param {labs.pathfinder.Graph} graph
		 *
		 * @return {Array<sc.geom.IPoint>}
		 */
		findPath: function (startPoint, endPoint, graph)
		{
			var result = [];

			//if (!graph.checkSegment(new Segment(startPoint, endPoint)))
			{
				/**
				 * @type {labs.pathfinder.INode}
				 */
				var startNode = graph.addPoint(startPoint);
				/**
				 * @type {labs.pathfinder.INode}
				 */
				var endNode = graph.addPoint(endPoint);

				//console.log(this.browseNode(result, startNode, endNode));
				var closed = [];
				/**
				 * @type {Array<labs.pathfinder.Path>}
				 */
				var queue = [new Path(0, [startNode])];

				/**
				 * @type {labs.pathfinder.Path}
				 */
				var path;
				var count = 0;

				while (queue.length > 0)
				{
					count++;

					path = ArrayUtils.shift(queue);
					/**
					 * @type {labs.pathfinder.INode}
					 */
					var lastNode = ArrayUtils.lastEntry(path.nodes);

					if (ArrayUtils.contain(closed, lastNode))
					{
						continue;
					}

					if (lastNode == endNode)
					{
						//console.log(path.cost);
						result = path.nodes;
						break;
					}

					ArrayUtils.push(closed, lastNode);

					ObjectUtils.forEachItem(lastNode.links, function (link, id)
					{
						ArrayUtils.push(queue, path.createNewPath(id, endNode));
					});

					queue.sort(
						/**
						 *
						 * @param {labs.pathfinder.Path} path1
						 * @param {labs.pathfinder.Path} path2
						 */
						function (path1, path2)
						{
							var cost1 = path1.cost;
							var cost2 = path2.cost;
							return cost1 < cost2 ? -1 : (cost1 > cost2 ? 1 : 0);
						});
				}

				graph
					//.render(0x99, 0x99, 0x99)
					.removeNode(startNode)
					.removeNode(endNode);

				//console.log(count, graph.links.length);
			}
			/*else
			 {
			 ArrayUtils.push(result, startPoint);
			 ArrayUtils.push(result, endPoint);
			 }*/

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
			return path;
		}
	})
});