goog.require("sc.geom.ISegment");

goog.provide("labs.pathfinder.ILink");
goog.scope(function ()
{
	/**
	 * @interface
	 * @extends {sc.geom.ISegment}
	 *
	 * @param {labs.pathfinder.INode=} pointA
	 * @param {labs.pathfinder.INode=} pointB
	 */
	labs.pathfinder.ILink = function (pointA, pointB)
	{
	};

	labs.pathfinder.ILink.prototype =
	{
		/**
		 * @type {labs.pathfinder.INode}
		 */
		pointA: null,

		/**
		 * @type {labs.pathfinder.INode}
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
		}
	};
});