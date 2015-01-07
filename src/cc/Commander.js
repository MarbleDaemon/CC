{
	goog.require("sc.collections.Collection");
	goog.require("sc.core.Maths");
	goog.require("sc.core.Utils");
	goog.require("sc.display.Colors");
	goog.require("sc.events.PointerEvent");
	goog.require("sc.html.layers.CanvasLayer");
	goog.require("sc.html.modules.CanvasRenderingContext2D");
	goog.require("sc.html.stages.DOMStage");
	goog.require("sc.imaging.SpriteSheet");

	goog.require("labs.pathfinder.Obstacle");

	goog.require("cc.animations.Vehicle");
	goog.require("cc.entities.vehicles.M1Abrams");
	goog.require("cc.geom.PolyMap");
	goog.require("cc.resources.maps.Test");
	goog.require("cc.states.Vehicle");
}
{
	goog.provide("cc.Commander");
}
goog.scope(function ()
{
	var collections = sc.collections;
	var core = sc.core;
	var imaging = sc.imaging;
	var layers = sc.html.layers;
	var stages = sc.html.stages;
	var vehicleDef = cc.entities.definitions.vehicles;
	var vehicles = cc.entities.vehicles;

	var CanvasLayer = layers.CanvasLayer;
	var Colors = sc.display.Colors;
	var DOMStage = stages.DOMStage;
	var FunctionUtils = core.FunctionUtils;
	var Map = cc.geom.Map;
	var Maths = sc.core.Maths;
	var PointerEvents = sc.events.PointerEvents;
	var Sprites = imaging.Sprites;
	var SpriteSheets = imaging.SpriteSheets;
	var TypedArrayUtils = core.TypedArrayUtils;

	/**
	 * @class
	 * @constructor
	 * @extends {sc.html.stages.DOMStage}
	 *
	 * @param {?string|HTMLElement=} idOrElement
	 */
	cc.Commander = goog.defineClass(DOMStage, {
		constructor: function (idOrElement)
		{
			var thi$ = this;

			FunctionUtils.invoke(DOMStage, this, idOrElement);

			this.fitToScreen()
				/*.css
				 .styleValue("cursor", "none")*/;

			this.backgroundLayer = /** @type {sc.html.layers.ICanvasLayer} */(this.addDOMLayer(new CanvasLayer()));
			this.gridLayer = /** @type {sc.html.layers.ICanvasLayer} */(this.addDOMLayer(new CanvasLayer()));
			this.entitiesLayer = /** @type {sc.html.layers.ICanvasLayer} */(this.addDOMLayer(new CanvasLayer()));
			this.interactiveLayer = /** @type {sc.html.layers.ICanvasLayer} */(this.addDOMLayer(new CanvasLayer()));

			setTimeout(function ()
			{
				thi$._loadResources();
			}, 1);
		},

		/**
		 * @type {sc.html.layers.ICanvasLayer}
		 */
		backgroundLayer:  null,
		/**
		 * @type {sc.html.layers.ICanvasLayer}
		 */
		gridLayer:        null,
		/**
		 * @type {sc.html.layers.ICanvasLayer}
		 */
		interactiveLayer: null,

		/**
		 * @private
		 */
		_obstacleStyle: {fillColor: Colors.toStyleString(0xff, 0x66, 0x66, 0.25), strokeColor: Colors.toStyleString(0xff, 0x66, 0x66), strokeDash: [5], strokeWidth: 2},
		/**
		 * @private
		 */
		_pathStyle:     {fillColor: Colors.toStyleString(0xff, 0x99, 0x99, 0.25), strokeColor: Colors.toStyleString(0xff, 0x99, 0x99), strokeDash: [5], strokeWidth: 2},

		/**
		 * @private
		 *
		 * @return {cc.Commander}
		 */
		_loadResources: function ()
		{
			var thi$ = this;

			Map.setUp(cc.resources.maps.Test.obstacles);

			SpriteSheets.setBasePath("cc/resources/maps");
			{
				Sprites.Map = SpriteSheets.createSheet("scb01ea", "jpg").load().createSprite();
			}

			SpriteSheets.setBasePath("cc/resources/entities/vehicles");
			{
				vehicleDef.M1Abrams.load();
			}

			SpriteSheets.onAllReady(function ()
			{
				var scale = 1.2;
				//Sprites.Map.renderTo(thi$.backgroundLayer.context2D, Sprites.Map.width / 2 * scale, Sprites.Map.height / 2 * scale, 0, scale, scale);

				Map.obstacles.doForEach(function (obstacle)
				{
					obstacle.render(thi$.gridLayer.context2D, thi$._obstacleStyle, Map.realToDisplay);
				});

				/*var frame = 18;
				 scale = 1;
				 attachmentDef.M1AbramsTurret.shadowSprites[frame + 15].renderTo(thi$.gridLayer, 40, 40, 0, scale, scale);
				 vehicleDef.M1Abrams.sprites[frame].renderTo(thi$.gridLayer, 40, 40, 0, scale, scale);
				 attachmentDef.M1AbramsTurret.sprites[frame + 15].renderTo(thi$.gridLayer, 40, 40 - 8 * scale, 0, scale, scale);*/

				thi$
					._setUpEntities()
					._setUpEvents()
					._start();
			});

			return this;
		},

		/**
		 * @private
		 *
		 * @return {cc.Commander}
		 */
		_setUpEntities: function ()
		{
			var thi$ = this;

			/**
			 * @type {sc.collections.Collection.<cc.entities.IEntity>}
			 */
			this.entities = collections.create(
				/**
				 * @returns {cc.entities.IEntity}
				 */function ()
				{
					return new vehicles.M1Abrams()
						.setPosition(Maths.randomRange(500, 700), Maths.randomRange(50, 500))
						.invalidate();
				}, 1);

			return thi$;
		},

		/**
		 * @private
		 *
		 * @return {cc.Commander}
		 */
		_setUpEvents: function ()
		{
			var thi$ = this;

			/**
			 * @param {sc.events.PointerEvent} event
			 */
			function onPointerClick(event)
			{
				var point = Map.displayToReal(event.getPosition());
			}

			/**
			 * @param {sc.events.PointerEvent} event
			 */
			function onPointerMove(event)
			{
				var point = Map.displayToReal(event.getPosition());

				var context2D = thi$.interactiveLayer.context2D
					.clear();

				var path = Map.pathFinder.findPath(thi$.entities.get(0).getPosition(), point, Map.graphs[0]);

				TypedArrayUtils.forEachItem(path, function (point)
				{
					point = Map.realToDisplay(point);
					context2D
						.save()
						.beginPath()
						.circle(point.x, point.y, 5)
						.closePath()
						.fillStyle("#933")
						.fill()
						.restore();
				});

				context2D
					.save()
					.beginPath()
				TypedArrayUtils.forEachItem(path, function (point, index)
				{
					point = Map.realToDisplay(point);
					if (index == 0)
					{
						context2D.moveToPoint(point);
					}
					else
					{
						context2D.lineToPoint(point);
					}
				});
				context2D
					.strokeStyle("#933", 2)
					.stroke()
					.closePath()
					.restore();
			}

			this
				.on(PointerEvents.CLICK, onPointerClick)
				.on(PointerEvents.MOVE, onPointerMove);

			return this;
		},

		/**
		 * @private
		 *
		 * @return {cc.Commander}
		 */
		_start: function ()
		{
			var thi$ = this;
			var context2D = thi$.entitiesLayer.context2D;

			collections
				.fromCollection(thi$.entities)
				.filter(function (entity)
				{
					return !entity.isValid();
				})
				.doForEach(function (entity, index)
				{
					if (index == 0)
					{
						context2D.clear();
					}

					entity.render(context2D);
				});

			return thi$;
		},

		/**
		 * @private
		 *
		 * @return {cc.Commander}
		 */
		_startEntityRenderer: function ()
		{
			this.entitiesLayer

			return this;
		}
	});
});
