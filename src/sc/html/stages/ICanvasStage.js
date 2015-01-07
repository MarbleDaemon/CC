goog.require("sc.display.IStage");
goog.require("sc.html.IDOMCanvasElement");

goog.provide("sc.html.stages.ICanvasStage");
goog.scope(function ()
{
	goog.forwardDeclare("sc.html.layers.ICanvasLayer");

	/**
	 * @interface
	 * @extends {sc.display.IStage}
	 * @extends {sc.html.IDOMCanvasElement}
	 * @param {string} id
	 * @param {?number=} width
	 * @param {?number=} height
	 */
	sc.html.stages.ICanvasStage = function (id, width, height)
	{
	};

	sc.html.stages.ICanvasStage.prototype =
	{
		/**
		 *
		 * @param {sc.html.layers.ICanvasLayer} child
		 *
		 * @return {sc.html.layers.ICanvasLayer}
		 */
		addCanvasLayer: function (child)
		{
		}
	};
});
