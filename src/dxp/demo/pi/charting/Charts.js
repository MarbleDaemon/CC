goog.require("sc.core.Utils");
goog.require("sc.html.modules.CanvasRenderingContext2D");

goog.require("dxp.pi.charting.Charts");

goog.provide("dxp.demo.pi.charting.Charts");
goog.scope(function ()
{
	var Charts = dxp.pi.charting.Charts;
	var FunctionUtils = sc.core.FunctionUtils;

	/**
	 * @class
	 * @constructor
	 * @extends {dxp.pi.charting.Charts}
	 *
	 * @param {?string|HTMLElement=} idOrElement
	 */
	dxp.demo.pi.charting.Charts = goog.defineClass(Charts, {
		constructor: function (idOrElement)
		{
			FunctionUtils.invoke(Charts, this, idOrElement, 700, 700);

			this
				.options
				.setMargin(20, 30, 0, 20)
				.done
				.axisOptions
				.setColor([0x66, 0x66, 0x66, 0.5])
				.setLineWidth(0.25)
				.setMin(0)
				.setMax(5.5)
				.setIntervalSize(1)
				.done
				.update();
		}
	});
});
