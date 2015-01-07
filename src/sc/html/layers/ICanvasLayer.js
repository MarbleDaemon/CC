goog.require("sc.html.IDOMCanvasElement");
goog.require("sc.html.layers.IDOMLayer");

goog.provide("sc.html.layers.ICanvasLayer");
goog.scope(function ()
{
	goog.forwardDeclare("sc.html.stages.IDOMStage");

	/**
	 * @interface
	 * @extends {sc.html.IDOMCanvasElement}
	 * @extends {sc.html.layers.IDOMLayer}
	 *
	 * @param {string} id
	 */
	sc.html.layers.ICanvasLayer = function (id)
	{
	};

	sc.html.layers.ICanvasLayer.prototype =
	{
		/**
		 *
		 * @param {sc.html.stages.IDOMStage} stage
		 * @param {?boolean=} doAdding
		 *
		 * @return {sc.html.layers.ICanvasLayer}
		 */
		attachToDOMStage: function (stage, doAdding)
		{
		}
	};
});
