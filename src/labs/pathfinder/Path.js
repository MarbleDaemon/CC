goog.require("sc.core.Maths");
goog.require("sc.core.Utils");
goog.require("sc.geom.Segment");

goog.require("labs.pathfinder.ILink");
goog.require("labs.pathfinder.Node");

goog.provide("labs.pathfinder.Path");
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
	 */
	labs.pathfinder.Path = goog.defineClass(null, {
		/**
		 *
		 * @param {number} cost
		 * @param {Array<labs.pathfinder.INode>} nodes
		 */
		constructor: function (cost, nodes)
		{
			/**
			 *
			 * @type {number}
			 */
			this.cost = cost;

			/**
			 *
			 * @type {Array.<labs.pathfinder.INode>}
			 */
			this.nodes = nodes;
		},

		/**
		 *
		 * @param {number} id
		 * @param {labs.pathfinder.INode} endPoint
		 *
		 * @return {labs.pathfinder.Path}
		 */
		createNewPath: function (id, endPoint)
		{
			/**
			 *
			 * @type {labs.pathfinder.Node}
			 */
			var lastNode = ArrayUtils.lastEntry(this.nodes);
			/**
			 * @type {labs.pathfinder.ILink}
			 */
			var link = lastNode.links[id];
			var node = link.getOtherNode(lastNode);
			return new labs.pathfinder.Path(this.cost + link.size + new Segment(node, endPoint).size, ArrayUtils.concat(this.nodes, [node]));
		}
	})
});