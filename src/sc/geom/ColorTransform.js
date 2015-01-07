goog.provide("sc.geom.ColorTransform");

goog.scope(function ()
{
	//sc.geom.ColorUtils =

	/**
	 * The ColorTransform class lets you adjust the color values in a display object.
	 * The color adjustment or color transformation can be applied to all four channels: red, green, blue, and alpha transparency.
	 * @constructor
	 * @param {?number=} redMultiplier Default 1.0
	 * @param {?number=} greenMultiplier Default 1.0
	 * @param {?number=} blueMultiplier Default 1.0
	 * @param {?number=} alphaMultiplier Default 1.0
	 * @param {?number=} redOffset Default 0
	 * @param {?number=} greenOffset Default 0
	 * @param {?number=} blueOffset Default 0
	 * @param {?number=} alphaOffset Default 0
	 */
	sc.geom.ColorTransform = function (redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset)
	{
		/**
		 * A decimal value that is multiplied with the alpha transparency channel value.
		 * @type {number}
		 */
		this.alphaOffset = alphaOffset || 0;
		/**
		 * A number from -255 to 255 that is added to the alpha transparency channel value after it has been multiplied by the alphaMultiplier value.
		 * @type {number}
		 */
		this.alphaMultiplier = alphaMultiplier || 1.0;
		/**
		 * A decimal value that is multiplied with the red channel value.
		 * @type {number}
		 */
		this.redOffset = redOffset || 0;
		/**
		 * A number from -255 to 255 that is added to the red channel value after it has been multiplied by the redMultiplier value.
		 * @type {number}
		 */
		this.redMultiplier = redMultiplier || 1.0;
		/**
		 * A decimal value that is multiplied with the green channel value.
		 * @type {number}
		 */
		this.greenOffset = greenOffset || 0;
		/**
		 * A number from -255 to 255 that is added to the green channel value after it has been multiplied by the greenMultiplier value.
		 * @type {number}
		 */
		this.greenMultiplier = greenMultiplier || 1.0;
		/**
		 * A decimal value that is multiplied with the blue channel value.
		 * @type {number}
		 */
		this.blueOffset = blueOffset || 0;
		/**
		 * A number from -255 to 255 that is added to the blue channel value after it has been multiplied by the blueMultiplier value.
		 * @type {number}
		 */
		this.blueMultiplier = blueMultiplier || 1.0;

		/**
		 * Set/get the RGB color value for a ColorTransform object.
		 * @param {?number=} value
		 * @returns {number|sc.geom.ColorTransform}
		 */
		this.rgb = function (value)
		{
			if (arguments.length > 0)
			{
				this.redMultiplier = this.greenMultiplier = this.blueMultiplier = 0.0;
				this.redOffset = (value & 0xff0000) >> 0x10;
				this.greenOffset = (value & 0xff00) >> 0x08;
				this.blueOffset = value & 0xff;

				return this;
			}
			else
			{
				return (this.redOffset << 0x10) | (this.greenOffset << 0x08) | this.blueOffset;
			}
		};

		/**
		 * Concatenates the ColorTranform object specified by the second parameter with the current ColorTransform object and sets the current object as the result,
		 * which is an additive combination of the two color transformations.
		 * @param {sc.geom.ColorTransform} second
		 */
		this.concatenate = function (second)
		{
			this.alphaOffset += second.alphaOffset;
			this.redOffset += second.redOffset;
			this.greenOffset += second.greenOffset;
			this.blueOffset += second.blueOffset;

			this.alphaMultiplier *= second.alphaMultiplier;
			this.redMultiplier *= second.redMultiplier;
			this.greenMultiplier *= second.greenMultiplier;
			this.blueMultiplier *= second.blueMultiplier;
		};

		this.toRGBString = function()
		{
			if (this.alphaOffset != 0)
			{
				return "rgba(" + [this.redOffset, this.greenOffset, this.blueOffset, this.alphaOffset / 255].join(',') + ")";
			}
			else
			{
				var result = this.rgb().toString(16);
				while(result.length < 6)
				{
					result = "#0" + result;
				}
			}
		};
	};
});