{
	goog.require("sc.collections.Collection");
	goog.require("sc.core.Maths");
	goog.require("sc.core.Utils");
	goog.require("sc.geom.Point");

	goog.require("labs.pathfinder.AStarGraph");
	goog.require("labs.pathfinder.Graph");
	goog.require("labs.pathfinder.Obstacle");

	goog.require("cc.geom.Map");
}
goog.provide("cc.geom.PolyMap");
goog.scope(function ()
{
	var collections = sc.collections;
	var core = sc.core;
	var pathfinder = labs.pathfinder;

	var AStarGraph = pathfinder.AStarGraph;
	var Graph = pathfinder.Graph;
	var Map = cc.geom.Map;
	var Maths = core.Maths;
	var Obstacle = pathfinder.Obstacle;
	var Point = sc.geom.Point;

	var YX_RATIO = 13 / 32;

	Map.VIRTUAL_CELL_WIDTH = 12;
	Map.VIRTUAL_CELL_HEIGHT = Map.VIRTUAL_CELL_WIDTH * YX_RATIO;

	/**
	 * @type {Object.<number,labs.pathfinder.Graph>}
	 */
	Map.graphs = [];

	/**
	 * @type {sc.collections.Collection.<labs.pathfinder.Obstacle>}
	 */
	Map.obstacles = new collections.Collection();

	/**
	 *
	 * @type {labs.pathfinder.AStarGraph}
	 */
	Map.pathFinder = new AStarGraph();

	/**
	 *
	 * @param {sc.geom.IPoint} point
	 *
	 * @return {sc.geom.IPoint}
	 */
	Map.displayToReal = function (point)
	{
		return new Point(point.x, Maths.round(point.y / YX_RATIO));
	};

	/**
	 *
	 * @param {sc.geom.IPoint} point
	 *
	 * @return {sc.geom.IPoint}
	 */
	Map.realToDisplay = function (point)
	{
		return new Point(point.x, point.y * YX_RATIO);
	};

	/**
	 *
	 * @param {Array<Array<Array<number>>>} obstacles
	 */
	Map.setUp = function (obstacles)
	{
		Map.obstacles = collections
			.fromCollection(obstacles)
			.convertTo(function (points)
			{
				return new Obstacle(points);
			});

		Map.updateGraphs();
	};

	Map.updateGraphs = function ()
	{
		Map.graphs[0] = new Graph(Map.obstacles.data);
		Map.graphs[0].output = sc.core.application.interactiveLayer;
	};
});