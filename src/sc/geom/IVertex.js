goog.require("sc.geom.IPoint");

goog.provide("sc.geom.IVertex");
goog.scope(function ()
{
	/**
	 * @interface
	 * @extends {sc.geom.IPoint}
	 *
	 * @param {sc.geom.IPolygon} parent
	 * @param {sc.geom.IEdge=} edgeA
	 * @param {sc.geom.IEdge=} edgeB
	 */
	sc.geom.IVertex = function (parent, edgeA, edgeB)
	{
	};

	sc.geom.IVertex.prototype =
	{
		/**
		 * @type {sc.geom.IPolygon}
		 */
		parent: null,

		/**
		 * @type {sc.geom.IEdge}
		 */
		edgeA: null,

		/**
		 * @type {sc.geom.IEdge}
		 */
		edgeB: null,

		/**
		 *
		 * @return {boolean}
		 */
		isConcave: function ()
		{
		}
	};
});