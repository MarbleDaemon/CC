goog.provide("sc.display.IStage");
goog.scope(function ()
{
	/**
	 * @interface
	 * @extends {sc.display.IDisplayObject}
	 *
	 * @param {string} id
	 * @param {?number=} width
	 * @param {?number=} height
	 */
	sc.display.IStage = function (id, width, height)
	{
	};

	sc.display.IStage.prototype =
	{
		/**
		 *
		 * @param {sc.display.ILayer} layer
		 *
		 * @return {sc.display.ILayer}
		 */
		addLayer: function (layer)
		{
		}
	};
});
