goog.require("sc.globals");
goog.require("sc.core.Maths");
goog.require("sc.core.Utils");
goog.require("sc.display.Colors");
goog.require("sc.html.layers.CanvasLayer");

goog.provide("dxp.pi.charting.Axis");
goog.scope(function ()
{
	var globals = sc.globals;

	var CanvasLayer = sc.html.layers.CanvasLayer;
	var Colors = sc.display.Colors;
	var FunctionUtils = sc.core.FunctionUtils;
	var Maths = sc.core.Maths;

	/**
	 * @enum {number}
	 */
	dxp.pi.charting.AxisOrientation =
	{
		HORIZONTAL: globals.UID++,
		VERTICAL:   globals.UID++
	};

	/**
	 *
	 * @constructor
	 * @extends {sc.html.layers.CanvasLayer}
	 *
	 * @param {dxp.pi.charting.AxisOrientation} orientation
	 */
	dxp.pi.charting.Axis = goog.defineClass(CanvasLayer, {
		/**
		 * @param {dxp.pi.charting.AxisOrientation} orientation
		 */
		constructor: function (orientation)
		{
			FunctionUtils.invoke(CanvasLayer, this);

			/**
			 *
			 * @type {dxp.pi.charting.AxisOrientation}
			 */
			this.orientation = orientation;

			/**
			 *
			 * @param {?Array<sc.display.IDisplayObject>=} updated
			 *
			 * @return {sc.display.IDisplayObject}
			 */
			this._CanvasLayer_update = this.update;

			/**
			 *
			 * @param {?Array<sc.display.IDisplayObject>=} updated
			 *
			 * @return {sc.display.IDisplayObject}
			 */
			this.update = function (updated)
			{
				updated = updated || [];

				var context2D = this.context2D;
				var parent = /** @type {dxp.pi.charting.Charts} */(this.getParent());
				var axisOptions = parent.axisOptions;
				var options = parent.options;
				var size = this.size();
				var x = size.x - options.marginRight;
				var y = size.y - options.marginBottom;

				context2D
					.clear()
					.save()
					.strokeStyle(Colors.arrayToStyleString(axisOptions.color), axisOptions.lineWidth);

				var intervals;
				var intervalSize;

				if (this.orientation == dxp.pi.charting.AxisOrientation.HORIZONTAL)
				{
					context2D
						.beginPath()
						.moveTo(options.marginLeft, y)
						.lineTo(x, y)
						.closePath()
						.stroke();

					intervals = (axisOptions.max - axisOptions.min) / axisOptions.interval;
					intervalSize = (x - options.marginLeft) / intervals;
					FunctionUtils.repeat(function (count)
					{
						console.log(count);
						count = count + 1;
						context2D
							.beginPath()
							.moveTo(options.marginLeft + count * intervalSize, options.marginTop)
							.lineTo(options.marginLeft + count * intervalSize, y + 5)
							.closePath()
							.stroke();
					}, intervals - 1);
				}
				else
				{
					context2D
						.beginPath()
						.moveTo(options.marginLeft, y)
						.lineTo(options.marginLeft, options.marginTop)
						.closePath()
						.stroke();

					intervals = (axisOptions.max - axisOptions.min) / axisOptions.interval;
					intervalSize = (y - options.marginBottom) / intervals;
					FunctionUtils.repeat(function (count)
					{
						count = count + 1;
						context2D
							.beginPath()
							.moveTo(options.marginLeft, y - count * intervalSize)
							.lineTo(x + 5, y - count * intervalSize)
							.closePath()
							.stroke();
					}, intervals - 1);
				}

				context2D
					.restore();

				return this._CanvasLayer_update(updated);
			};
		}
	});
});
