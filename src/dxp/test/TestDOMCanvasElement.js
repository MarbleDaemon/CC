goog.require("sc.core.Utils");
goog.require("sc.display.Colors");
goog.require("sc.html.CSS");
goog.require("sc.html.DOM");
goog.require("sc.html.DOMCanvasElement");
goog.require("sc.html.modules.RenderingContext2D");
goog.require("sc.events.PointerEvent");

goog.provide("dxp.test.TestDOMCanvasElement");
goog.scope(function ()
{
	var Colors = sc.display.Colors;
	var DOM = sc.html.DOM;
	var PointerEvents = sc.events.PointerEvents;

	/**
	 *
	 * @constructor
	 *
	 * @param {string} idOrTag
	 */
	dxp.test.TestDOMCanvasElement = goog.defineClass(Object, {
		/**
		 *
		 * @param {string} idOrTag
		 */
		constructor: function (idOrTag)
		{
			var element = DOM.createCanvas(800, 600, DOM._query("[data-sc-app=" + idOrTag + "]"));
			element
				.context2D
				.beginPath()
				.element
				.on(PointerEvents.DRAG_MOVE,
				/**
				 * @this {sc.html.DOMCanvasElement}
				 *
				 * @param {sc.events.PointerEvent} event
				 */
				function (event)
				{
					this
						.context2D
						.lineTo(event.x, event.y)
						.closePath()
						.strokeStyle(Colors.randomColor())
						.stroke()
						.beginPath()
						.moveTo(event.x, event.y);
				});
		}
	});
});
