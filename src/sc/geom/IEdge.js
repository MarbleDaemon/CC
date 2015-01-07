goog.require("sc.geom.ISegment");

goog.provide("sc.geom.IEdge");
goog.scope(function ()
{
	/**
	 * @interface
	 * @extends {sc.geom.ISegment}
	 *
	 * @param {sc.geom.IPolygon} parent
	 * @param {sc.geom.IVertex=} vertexA
	 * @param {sc.geom.IVertex=} vertexB
	 */
	sc.geom.IEdge = function (parent, vertexA, vertexB)
	{
	};

	sc.geom.IEdge.prototype =
	{
		/**
		 * @type {sc.geom.IPolygon}
		 */
		parent: null
	};
});