goog.require("sc.display.IStage");
goog.require("sc.html.IDOMElement");

goog.provide("sc.html.stages.IDOMStage");
goog.scope(function ()
{
	goog.forwardDeclare("sc.html.layers.IDOMLayer");

	/**
	 * @interface
	 * @extends {sc.display.IStage}
	 * @extends {sc.html.IDOMElement}
	 *
	 * @param {string} id
	 * @param {?number=} width
	 * @param {?number=} height
	 */
	sc.html.stages.IDOMStage = function (id, width, height)
	{
	};

	sc.html.stages.IDOMStage.prototype =
	{
		/**
		 *
		 * @param {sc.html.layers.IDOMLayer} layer
		 *
		 * @return {sc.html.layers.IDOMLayer}
		 */
		addDOMLayer: function (layer)
		{
		}
	};
});
