goog.require("sc.core.Utils");
goog.require("sc.html.stages.DOMStage");

goog.require("dxp.pi.charting.Axis");
goog.require("dxp.pi.charting.AxisOptions");
goog.require("dxp.pi.charting.ChartsOptions");

goog.provide("dxp.pi.charting.Charts");
goog.scope(function ()
{
	var Axis = dxp.pi.charting.Axis;
	var AxisOptions = dxp.pi.charting.AxisOptions;
	var AxisOrientation = dxp.pi.charting.AxisOrientation;
	var DOMStage = sc.html.stages.DOMStage;
	var FunctionUtils = sc.core.FunctionUtils;
	var ChartsOptions = dxp.pi.charting.ChartsOptions;

	/**
	 *
	 * @constructor
	 * @extends {sc.html.stages.DOMStage}
	 *
	 * @param {?string|HTMLElement=} idOrElement
	 * @param {?number=} width
	 * @param {?number=} height
	 */
	dxp.pi.charting.Charts = goog.defineClass(DOMStage, {
		constructor: function (idOrElement, width, height)
		{
			FunctionUtils.invoke(DOMStage, this, idOrElement, width, height);

			this.axisOptions = /** @type {dxp.pi.charting.AxisOptions.<dxp.pi.charting.Charts>} */(new AxisOptions(this));
			this.options = /** @type {dxp.pi.charting.ChartsOptions.<dxp.pi.charting.Charts>} */(new ChartsOptions(this));

			/**
			 *
			 * @type {dxp.pi.charting.Axis}
			 */
			this.xAxis = /** @type {dxp.pi.charting.Axis} */(this.addDOMLayer(new Axis(AxisOrientation.HORIZONTAL)));

			/**
			 *
			 * @type {dxp.pi.charting.Axis}
			 */
			this.yAxis = /** @type {dxp.pi.charting.Axis} */(this.addDOMLayer(new Axis(AxisOrientation.VERTICAL)));
		},

		/**
		 * @type {dxp.pi.charting.AxisOptions.<dxp.pi.charting.Charts>}
		 */
		axisOptions: null,

		/**
		 * @type {dxp.pi.charting.ChartsOptions.<dxp.pi.charting.Charts>}
		 */
		options: null
	});
});
