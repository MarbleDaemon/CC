goog.require("sc.core.Utils");
goog.require("sc.display.Colors");
goog.require("sc.events.PointerEvent");
goog.require("sc.html.layers.CanvasLayer");
goog.require("sc.html.modules.CanvasRenderingContext2D");
goog.require("sc.html.stages.DOMStage");
goog.require("sc.imaging.SpriteSheet");

goog.require("labs.pathfinder.Obstacle");

goog.require("cc.geom.PolyMap");
goog.require("cc.resources.maps.Test");

goog.provide("cc.MapEditor");
goog.scope(function ()
{
	var core = sc.core;
	var layers = sc.html.layers;
	var stages = sc.html.stages;

	var ArrayUtils = core.ArrayUtils;
	var CanvasLayer = layers.CanvasLayer;
	var Colors = sc.display.Colors;
	var DOMStage = stages.DOMStage;
	var FunctionUtils = core.FunctionUtils;
	var Map = cc.geom.Map;
	var Obstacle = labs.pathfinder.Obstacle;
	var PointerEvents = sc.events.PointerEvents;
	var Sprites = sc.imaging.Sprites;
	var SpriteSheets = sc.imaging.SpriteSheets;
	var TypedArrayUtils = core.TypedArrayUtils;

	/**
	 * @class
	 * @constructor
	 * @extends {sc.html.stages.DOMStage}
	 *
	 * @param {?string|HTMLElement=} idOrElement
	 */
	cc.MapEditor = goog.defineClass(DOMStage, {
		constructor: function (idOrElement)
		{
			FunctionUtils.invoke(DOMStage, this, idOrElement);

			this.fitToScreen()
				/*.css
				 .styleValue("cursor", "none")*/;

			var backgroundLayer = /** @type {sc.html.layers.ICanvasLayer} */(this.addDOMLayer(new CanvasLayer()));
			var gridLayer = /** @type {sc.html.layers.ICanvasLayer} */(this.addDOMLayer(new CanvasLayer()));
			var interactiveLayer = /** @type {sc.html.layers.ICanvasLayer} */(this.addDOMLayer(new CanvasLayer()));

			var obstacleStyle = {fillColor: Colors.toStyleString(0xff, 0x66, 0x66, 0.25), strokeColor: Colors.toStyleString(0xff, 0x66, 0x66), strokeDash: [5], strokeWidth: 2};
			var pathStyle = {fillColor: Colors.toStyleString(0xff, 0x99, 0x99, 0.25), strokeColor: Colors.toStyleString(0xff, 0x99, 0x99), strokeDash: [5], strokeWidth: 2};

			/**
			 * @type {Array.<sc.geom.Point>}
			 */
			var currentPath = null;
			/**
			 * @type {Array.<labs.pathfinder.Obstacle>}
			 */
			var obstacles = TypedArrayUtils.produce(cc.resources.maps.Test.obstacles, function (points)
			{
				return new Obstacle(points);
			});

			window.dumpMap = function ()
			{
				console.log(JSON.stringify(obstacles));
			};

			SpriteSheets.setBasePath("cc/resources/maps");
			{
				Sprites.Map = SpriteSheets.createSheet("scb01ea", "jpg").load().createSprite();
			}

			SpriteSheets.setBasePath("cc/resources/entities/vehicles");
			{
				Sprites.M1Abrams = SpriteSheets.createSheet("M1Abrams", "png").load().createSprites(72, true);
				Sprites.M1AbramsTurret = SpriteSheets.createSheet("M1AbramsTurret", "png").load().createSprites(72, true);
			}

			SpriteSheets.onAllReady(function ()
			{
				var scale = 1.2;
				Sprites.Map.renderTo(backgroundLayer, Sprites.Map.width / 2 * scale, Sprites.Map.height / 2 * scale, 0, scale, scale);
				Map.setUp(Sprites.Map.width, Sprites.Map.height);

				TypedArrayUtils.forEachItem(obstacles, function (obstacle)
				{
					obstacle.render(gridLayer, obstacleStyle, Map.realToDisplay);
				});

				var frame = 18;
				scale = 1;
				Sprites.M1Abrams[frame].renderTo(gridLayer, 40, 40, 0, scale, scale);
				Sprites.M1AbramsTurret[frame].renderTo(gridLayer, 40, 40 - 8 * scale, 0, scale, scale);
			});

			/**
			 * @param {sc.events.PointerEvent} event
			 */
			function onPointerClick(event)
			{
				var newPoint = Map.displayToReal(event.getPosition());
				if (currentPath)
				{
					if (newPoint.distanceToPoint(currentPath[0]) < 5)
					{
						var obstacle = new Obstacle(currentPath);

						ArrayUtils.push(obstacles, obstacle);

						interactiveLayer.context2D.clear();

						obstacle.render(gridLayer, obstacleStyle, Map.realToDisplay);

						currentPath = null;
					}
					else
					{
						ArrayUtils.push(currentPath, newPoint);
					}
				}
				else
				{
					currentPath = [newPoint];
				}
			}

			/**
			 * @param {sc.events.PointerEvent} event
			 */
			function onPointerMove(event)
			{
				if (currentPath)
				{
					var obstacle = new Obstacle(ArrayUtils.concat(currentPath, [Map.displayToReal(event.getPosition())]));

					var context2D = interactiveLayer.context2D;
					context2D
						.clear();

					obstacle.render(interactiveLayer, pathStyle, Map.realToDisplay);
				}
			}

			this
				.on(PointerEvents.CLICK, onPointerClick)
				.on(PointerEvents.MOVE, onPointerMove)
				.on(PointerEvents.DRAG_MOVE, onPointerMove)
				.on(PointerEvents.START, function (event)
				{
				})
				.on(PointerEvents.END, function (event)
				{
				});
		}
	});
});
