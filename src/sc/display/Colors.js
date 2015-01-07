goog.require("sc.core.Maths");
goog.require("sc.core.Utils");

goog.provide("sc.display.Colors");
goog.scope(function ()
{
	var Colors = sc.display.Colors;
	var Maths = sc.core.Maths;

	/**
	 *
	 * @param {?number} rgb
	 * @param {?number=} alpha
	 *
	 * @returns {Array.<number>}
	 */
	Colors.from = function (rgb, alpha)
	{
		(rgb > 0xffffff) && (alpha = ((rgb & 0xff000000) >> 24) / 255);
		(undefined == alpha) && (alpha = 1);
		var red = (rgb & 0xff0000) >> 16;
		var green = (rgb & 0xff00) >> 8;
		var blue = rgb & 0xff;
		return [red, green, blue, alpha];
	};

	/**
	 * @param {?boolean=} randomAlpha
	 *
	 * @return {string}
	 */
	Colors.randomColor = function (randomAlpha)
	{
		return Colors.toStyleString(Maths.round(Maths.random() * 255), Maths.round(Maths.random() * 255), Maths.round(Maths.random() * 255), randomAlpha ? Maths.random() : 1);
	};

	/**
	 *
	 * @param {?number=} red
	 * @param {?number=} green
	 * @param {?number=} blue
	 * @param {?number=} alpha
	 *
	 * @returns {string}
	 */
	Colors.toStyleString = function (red, green, blue, alpha)
	{
		return "rgba(" + [red || 0, green || 0, blue || 0, (undefined == alpha) ? 1 : alpha].join(',') + ")";
	};

	/**
	 *
	 * @param {Array.<number>} color
	 *
	 * @returns {string}
	 */
	Colors.arrayToStyleString = function (color)
	{
		return Colors.toStyleString(color[0], color[1], color[2], color[3]);
	};

	/**
	 *
	 * @param {?number} red
	 * @param {?number=} green
	 * @param {?number=} blue
	 * @param {?number=} alpha
	 * @returns {string}
	 */
	Colors.toStyleString2 = function (red, green, blue, alpha)
	{
		if (arguments.length < 3)
		{
			var parts = Colors.from(red, green);
			red = parts[0];
			green = parts[1];
			blue = parts[2];
			alpha = parts[3];
		}

		(undefined == alpha) && (alpha = 1);

		if (alpha != 1)
		{
			return "rgba(" + [red, green, blue, alpha].join(',') + ")";
		}
		else
		{
			var result = ((red << 16) | (green << 8) | blue).toString(16);
			while (result.length < 6)
			{
				result = "0" + result;
			}

			return "#" + result;
		}
	};
});