goog.require("sc.core.Application");
goog.require("sc.core.Maths");
goog.require("sc.core.Utils");
goog.require("sc.core.StringUtils");
goog.require("sc.display.Colors");
goog.require("sc.events.PointerEvent");
goog.require("sc.events.TouchEvent");
goog.require("sc.html.CSS");
goog.require("sc.html.layers.CanvasLayer");
goog.require("sc.html.layers.ICanvasLayer");
goog.require("sc.html.stages.DOMStage");
goog.require("sc.html.stages.IDOMStage");
goog.require("sc.system.Console");

goog.provide("dxp.demo.canvas.CanvasLayerPainting");
goog.scope(function ()
{
	var core = sc.core;

	var ArrayUtils = core.ArrayUtils;
	var CanvasLayer = sc.html.layers.CanvasLayer;
	var DOMStage = sc.html.stages.DOMStage;
	var Colors = sc.display.Colors;
	var Console = sc.system.Console;
	var Maths = core.Maths;
	var PointerEvents = sc.events.PointerEvents;

	/**
	 * @class
	 * @constructor
	 */
	dxp.demo.canvas.CanvasLayerPainting = function (rootId)
	{
		/**
		 * @type {sc.html.stages.IDOMStage}
		 */
		var stage = new DOMStage(rootId, 800, 600);
		/**
		 * @type {sc.html.layers.ICanvasLayer}
		 */
		var layer;
		/**
		 * @type {Array<{color: string, points: Array<sc.geom.Point>}>}
		 */
		var lines;

		stage.on(PointerEvents.ON_POINTER_DRAG_START,
			/**
			 * @param {sc.events.PointerEvent} event
			 */
			function (event)
			{
				Console.writeLog("Event " + PointerEvents.ON_POINTER_DRAG_START);

				layer = /** @type {sc.html.layers.ICanvasLayer} */(stage.addDOMLayer(new CanvasLayer()));

				lines = [{
					         color:  Colors.toStyleString(Maths.round_(Maths.randomize() * 255), Maths.round_(Maths.randomize() * 255), Maths.round_(Maths.randomize() * 255)),
					         points: [event.getPosition()]
				         }];
			});

		stage.on(PointerEvents.DRAG_MOVE,
			/**
			 * @param {sc.events.PointerEvent} event
			 */
			function (event)
			{
				ArrayUtils.push(ArrayUtils.lastEntry(lines).points, event.getPosition());

				layer.clear();
				ArrayUtils.forEachItem(lines, function (line)
				{
					layer.castShadow(line.color, 2, 0, 0);
					layer.beginPath()
						.fillStyle(line.color);
					ArrayUtils.forEachItem(line.points, /**
					 * @param {sc.geom.Point} point
					 * @param {?number=} index
					 */function (point, index)
					{
						if (index == 0)
						{
							layer.moveTo(point.x, point.y);
						}
						else
						{
							layer.lineTo(point.x, point.y);
						}
					});
					layer.closePath()
						.fill();
				});
			});

		stage.on(PointerEvents.ON_POINTER_DRAG_END,
			/**
			 * @param {sc.events.PointerEvent} event
			 */
			function (event)
			{
				Console.writeLog("Event " + PointerEvents.ON_POINTER_DRAG_END);
			});
	};
});
