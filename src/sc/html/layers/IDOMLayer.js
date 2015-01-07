goog.require("sc.display.ILayer");
goog.require("sc.html.IDOMElement");

goog.provide("sc.html.layers.IDOMLayer");
goog.scope(function ()
{
	goog.forwardDeclare("sc.html.stages.IDOMStage");

	/**
	 * @interface
	 * @extends {sc.display.ILayer}
	 * @extends {sc.html.IDOMElement}
	 *
	 * @param {string} id
	 */
	sc.html.layers.IDOMLayer = function (id)
	{
	};

	sc.html.layers.IDOMLayer.prototype =
	{
		/**
		 *
		 * @param {sc.html.stages.IDOMStage} stage
		 * @param {?boolean=} doAdding
		 *
		 * @return {sc.html.layers.IDOMLayer}
		 */
		attachToDOMStage: function (stage, doAdding)
		{
		}
	};
});
