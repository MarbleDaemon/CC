goog.require("sc.core.Maths");
goog.require("sc.core.Utils");
goog.require("sc.display.Colors");
goog.require("sc.events.PointerEvent");
goog.require("sc.geom.Point");
goog.require("sc.geom.Segment");
goog.require("sc.html.layers.CanvasLayer");
goog.require("sc.html.modules.CanvasRenderingContext2D");
goog.require("sc.html.stages.DOMStage");

goog.require("labs.pathfinder.AStarGraph");
goog.require("labs.pathfinder.Graph");
goog.require("labs.pathfinder.Node");
goog.require("labs.pathfinder.Obstacle");

goog.provide("labs.pathfinder.NavMesh");
goog.scope(function ()
{
	var ArrayUtils = sc.core.ArrayUtils;
	var AStarGraph = labs.pathfinder.AStarGraph;
	var CanvasLayer = sc.html.layers.CanvasLayer;
	var Colors = sc.display.Colors;
	var FunctionUtils = sc.core.FunctionUtils;
	var Graph = labs.pathfinder.Graph;
	var Maths = sc.core.Maths;
	var Node = labs.pathfinder.Node;
	var Obstacle = labs.pathfinder.Obstacle;
	var Point = sc.geom.Point;
	var PointerEvents = sc.events.PointerEvents;
	var Segment = sc.geom.Segment;
	var TypedArrayUtils = sc.core.TypedArrayUtils;

	var STAGE_WIDTH = 1024;
	var STAGE_HEIGHT = 768;

	/**
	 * @constructor
	 * @extends {sc.html.stages.DOMStage}
	 *
	 * @param {string} id
	 */
	labs.pathfinder.NavMesh = goog.defineClass(sc.html.stages.DOMStage, {
		/**
		 *
		 * @param {string} id
		 */
		constructor: function (id)
		{
			FunctionUtils.invoke(sc.html.stages.DOMStage, this, id, STAGE_WIDTH, STAGE_HEIGHT);

			var backgroundLayer = /** @type {sc.html.layers.CanvasLayer} */(this.addDOMLayer(new CanvasLayer()));
			var graphLayer = /** @type {sc.html.layers.CanvasLayer} */(this.addDOMLayer(new CanvasLayer()));
			var midLaidLayer = /** @type {sc.html.layers.CanvasLayer} */(this.addDOMLayer(new CanvasLayer()));
			var overlaidLayer = /** @type {sc.html.layers.CanvasLayer} */(this.addDOMLayer(new CanvasLayer()));

			var obstacleStyle = {fillColor: Colors.toStyleString(0xff, 0x66, 0x66, 0.25), strokeColor: Colors.toStyleString(0xff, 0x66, 0x66), strokeDash: [5], strokeWidth: 2};

			function randomX()
			{
				return Maths.random() * STAGE_WIDTH;
			}

			function randomY()
			{
				return Maths.random() * STAGE_HEIGHT;
			}

			/**
			 * @type {Array<labs.pathfinder.Obstacle>}
			 */
			var obstacles = [];

			var obstacle = new Obstacle([[179, 84], [174, 162], [186, 182], [179, 224], [180, 261], [187, 278], [178, 337], [194, 345], [228, 325], [254, 340], [281, 325], [316, 295], [318, 241],
				[316, 224], [330, 165], [328, 98], [323, 71], [328, 54], [343, 44], [343, 0], [302, 0], [287, 57], [286, 106], [291, 118], [284, 212], [274, 202], [257, 236], [239, 209], [228, 229],
				[216, 194], [213, 158], [220, 140], [204, 98], [196, 126], [188, 86]].reverse());
			obstacle.output = midLaidLayer;
			obstacle.render(backgroundLayer, obstacleStyle);
			ArrayUtils.push(obstacles, obstacle);

			var startPoint = new Point(10, 10);

			var graph = new Graph(obstacles);
			graph.output = graphLayer;

			var pathFinder = new AStarGraph();

			function findPath(endPoint)
			{
				var context2D = overlaidLayer.context2D;
				var route = new Segment(startPoint, endPoint);

				context2D
					.clear()

					.save()
					.beginPath()
					.drawSegment(route, true)
					.closePath()
					.strokeStyle("#666")
					.stroke()
					.restore()

					.save()
					.beginPath()
					.circle(startPoint.x, startPoint.y, 10)
					.closePath()
					.fillStyle("red")
					.fill()
					.restore();

				midLaidLayer.context2D.clear();
				var points = pathFinder.findPath(startPoint, endPoint, graph);
				TypedArrayUtils.forEachItem(points, function (point)
				{
					context2D
						.save()
						.beginPath()
						.circle(point.x, point.y, 5)
						.closePath()
						.fillStyle("#933")
						.fill()
						.restore();
				});

				if (points.length > 0)
				{
					context2D
						.save()
						.beginPath()
						.moveToPoint(points[0]);
					TypedArrayUtils.forEachItem(points, function (point)
					{
						context2D.lineToPoint(point);
					}, 1);
					context2D
						.strokeStyle("#933", 2)
						.stroke()
						.closePath()
						.restore();
				}
			}

			//findPath(new Point(400, 383));

			this.on(PointerEvents.MOVE,
				/**
				 * @param {sc.events.PointerEvent} event
				 */
				function (event)
				{
					var endPoint = event.getPosition();

					findPath(endPoint);
				});
		}
	})
});