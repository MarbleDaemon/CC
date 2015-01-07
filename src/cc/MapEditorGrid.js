goog.require("sc.core.Maths");
goog.require("sc.core.Utils");
goog.require("sc.display.Colors");
goog.require("sc.events.PointerEvent");
goog.require("sc.geom.Point");
goog.require("sc.html.layers.CanvasLayer");
goog.require("sc.html.modules.CanvasRenderingContext2D");
goog.require("sc.html.stages.DOMStage");
goog.require("sc.imaging.SpriteSheet");

goog.require("cc.geom.Map");

goog.provide("cc.GridMapEditor");
goog.scope(function ()
{
	var core = sc.core;
	var layers = sc.html.layers;
	var stages = sc.html.stages;

	var CanvasLayer = layers.CanvasLayer;
	var Colors = sc.display.Colors;
	var DOMStage = stages.DOMStage;
	var FunctionUtils = core.FunctionUtils;
	var Map = cc.geom.Map;
	var Maths = sc.core.Maths;
	var Point = sc.geom.Point;
	var PointerEvents = sc.events.PointerEvents;
	var Sprites = sc.imaging.Sprites;
	var SpriteSheets = sc.imaging.SpriteSheets;

	/**
	 * @class
	 * @constructor
	 *
	 * @param {?string|HTMLElement=} idOrElement
	 */
	cc.GridMapEditor = goog.defineClass(DOMStage, {
		constructor: function (idOrElement)
		{
			FunctionUtils.invoke(DOMStage, this, idOrElement);

			this.fitToScreen()
				.css
				.styleValue("cursor", "none");

			var backgroundLayer = /** @type {sc.html.layers.ICanvasLayer} */(this.addDOMLayer(new CanvasLayer()));
			var gridLayer = /** @type {sc.html.layers.ICanvasLayer} */(this.addDOMLayer(new CanvasLayer()));
			var interactiveLayer = /** @type {sc.html.layers.ICanvasLayer} */(this.addDOMLayer(new CanvasLayer()));

			var grid = [];
			var mouseDown = false;

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

				var frame = 18;
				scale = 1;
				Sprites.M1Abrams[frame].renderTo(gridLayer, 40, 40, 0, scale, scale);
				Sprites.M1AbramsTurret[frame].renderTo(gridLayer, 40, 40 - 8 * scale, 0, scale, scale);
			});

			/**
			 * @param {sc.events.PointerEvent} event
			 */
			function onPointerMove(event)
			{
				var cell = Map.pointToCell(event.getPosition());
				cell.x = Maths.floor(cell.x) + 0.5;
				cell.y = Maths.floor(cell.y) + 0.5;
				var cellCenter = Map.cellToPoint(cell);

				interactiveLayer
					.context2D
					.clear()
					.beginPath()
					.moveTo(cellCenter.x - Map.VIRTUAL_CELL_WIDTH / 2, cellCenter.y)
					.lines([
						cellCenter.x, cellCenter.y - Map.VIRTUAL_CELL_HEIGHT / 2,
						cellCenter.x + Map.VIRTUAL_CELL_WIDTH / 2, cellCenter.y,
						cellCenter.x, cellCenter.y + Map.VIRTUAL_CELL_HEIGHT / 2
					])
					.closePath()
					.fillStyle(Colors.toStyleString(0x99, 0x99, 0x99, 0.25))
					.fill()
					.strokeStyle("#eee", 1)
					.stroke();

				if (mouseDown)
				{
					gridLayer
						.context2D
						//.clear()
						.beginPath()
						.moveTo(cellCenter.x - Map.VIRTUAL_CELL_WIDTH / 2, cellCenter.y)
						.lines([
							cellCenter.x, cellCenter.y - Map.VIRTUAL_CELL_HEIGHT / 2,
							cellCenter.x + Map.VIRTUAL_CELL_WIDTH / 2, cellCenter.y,
							cellCenter.x, cellCenter.y + Map.VIRTUAL_CELL_HEIGHT / 2
						])
						.closePath()
						.fillStyle(Colors.toStyleString(0x99, 0, 0, 0.25))
						.fill()
						.strokeStyle(Colors.toStyleString(0x99, 0x99, 0x99, 0.1), 1)
						.stroke();
				}
			}

			this
				.on(PointerEvents.MOVE, onPointerMove)
				.on(PointerEvents.DRAG_MOVE, onPointerMove)
				.on(PointerEvents.START,
				function (event)
				{
					mouseDown = true;
				})
				.on(PointerEvents.END,
				function (event)
				{
					mouseDown = false;
				});
		}
	});
});
