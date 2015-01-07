goog.require("sc.core.Utils");
goog.require("sc.html.layers.IDOMLayer");
goog.require("sc.html.stages.DOMStage");

goog.provide("sc.html.stages.VirtualCanvasStage");
goog.scope(function ()
{
	var core = sc.core;
	var stages = sc.html.stages;

	var ArrayUtils = core.ArrayUtils;
	var DOMStage = stages.DOMStage;
	var FunctionUtils = core.FunctionUtils;

	/**
	 * @constructor
	 * @extends {sc.html.stages.DOMStage}
	 * @param {?string|HTMLElement=} idOrElement
	 * @param {?number=} width
	 * @param {?number=} height
	 */
	sc.html.stages.VirtualCanvasStage = function (idOrElement, width, height)
	{
		/**
		 *
		 * @private
		 *
		 * @type {Array<sc.html.layers.IDOMLayer>}
		 */
		var _virtualLayers = [];

		// Constructor
		{
			FunctionUtils.invoke(DOMStage, this, idOrElement, width, height);
		}

		/**
		 *
		 * @param {sc.html.layers.IDOMLayer} layer
		 *
		 * @return {sc.html.layers.IDOMLayer}
		 */
		this.addVirtualLayer = function (layer)
		{
			if (!ArrayUtils.contain(_virtualLayers, layer))
			{
				ArrayUtils.push(_virtualLayers, layer);
				layer.attachToDOMStage(this);
			}

			return layer;
		};
	};
});