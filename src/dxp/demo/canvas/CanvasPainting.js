goog.require("sc.core.Application");
goog.require("sc.core.Maths");
goog.require("sc.core.Utils");
goog.require("sc.core.StringUtils");
goog.require("sc.display.Colors");
goog.require("sc.events.PointerEvent");
goog.require("sc.events.TouchEvent");
goog.require("sc.html.stages.ICanvasStage");
goog.require("sc.html.stages.CanvasStage");
goog.require("sc.html.CSS");
goog.require("sc.system.Console");

goog.provide("dxp.demo.canvas.CanvasPainting");
goog.scope(function ()
{
	var ArrayUtils = sc.core.ArrayUtils;
	var CanvasStage = sc.html.stages.CanvasStage;
	var Colors = sc.display.Colors;
	var Console = sc.system.Console;
	var Maths = sc.core.Maths;
	var PointerEvents = sc.events.PointerEvents;

	/**
	 * @class
	 * @constructor
	 */
	dxp.demo.canvas.CanvasPainting = function (rootId)
	{
		/**
		 * @type {sc.html.stages.ICanvasStage}
		 */
		var canvas = new CanvasStage(rootId, 800, 600);
		var lines = [];

		canvas.on(PointerEvents.ON_POINTER_DRAG_START,
			/**
			 * @param {sc.events.PointerEvent} event
			 */
			function (event)
			{
				Console.writeLog("Event " + PointerEvents.ON_POINTER_DRAG_START);

				ArrayUtils.push(lines,
					{
						color:  Colors.toStyleString(Maths.round_(Maths.randomize() * 255), Maths.round_(Maths.randomize() * 255), Maths.round_(Maths.randomize() * 255)),
						points: [event.getPosition()]
					});
			});

		canvas.on(PointerEvents.DRAG_MOVE,
			/**
			 * @param {sc.events.PointerEvent} event
			 */
			function (event)
			{
				ArrayUtils.push(ArrayUtils.lastEntry(lines).points, event.getPosition());

				canvas.clear();
				ArrayUtils.forEachItem(lines, function (line)
				{
					canvas.castShadow(line.color, 2, 0, 0);
					canvas.beginPath()
						.fillStyle(line.color);
					ArrayUtils.forEachItem(line.points, /**
					 * @param {sc.geom.Point} point
					 * @param {?number=} index
					 */function (point, index)
					{
						if (index == 0)
						{
							canvas.moveTo(point.x, point.y);
						}
						else
						{
							canvas.lineTo(point.x, point.y);
						}
					});
					canvas.closePath()
						.fill();
				});
			});

		canvas.on(PointerEvents.ON_POINTER_DRAG_END,
			/**
			 * @param {sc.events.PointerEvent} event
			 */
			function (event)
			{
				Console.writeLog("Event " + PointerEvents.ON_POINTER_DRAG_END);
			});
	};
});
