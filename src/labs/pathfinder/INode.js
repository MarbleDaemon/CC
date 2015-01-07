goog.require("sc.geom.IPoint");

goog.provide("labs.pathfinder.INode");
goog.scope(function ()
{
	/**
	 * @interface
	 * @extends {sc.geom.IPoint}
	 *
	 * @param {sc.geom.IPoint} point
	 */
	labs.pathfinder.INode = function (point)
	{
	};

	labs.pathfinder.INode.prototype =
	{
		/**
		 * @type {number}
		 */
		id: 0,

		/**
		 * @type {Object<number, labs.pathfinder.ILink>}
		 */
		links: {},

		/**
		 *
		 * @param {sc.html.IDOMCanvasElement} output
		 * @param {number=} red
		 * @param {number=} green
		 * @param {number=} blue
		 *
		 * @return {labs.pathfinder.INode}
		 */
		render: function (output, red, green, blue)
		{
		}
	};
});