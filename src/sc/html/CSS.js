goog.require("sc.constants");
goog.require("sc.globals");
goog.require("sc.core.StringUtils");
goog.require("sc.core.Utils");
goog.require("sc.html.DOMElement");
goog.require("sc.html.IDOMElement");
goog.require("sc.html.IDOMModule");

goog.provide("sc.html.CSS");
goog.provide("sc.html.CSSModule");
goog.scope(function ()
{
	var constants = sc.constants;
	var core = sc.core;
	var globals = sc.globals;

	var FunctionUtils = core.FunctionUtils;
	var StringUtils = core.StringUtils;

	var GET_COMPUTED_STYLE = "getComputedStyle";

	/**
	 * @param {string|number} value
	 * @return {string}
	 * @private
	 */
	function _parseMeasurement(value)
	{
		if (isNaN(value) && (StringUtils.contains(/** @type {string} */(value), '%') || StringUtils.contains(/** @type {string} */(value), 'px')))
		{
			return /** @type {string} */(value);
		}
		else
		{
			return value + "px";
		}
	}

	/**
	 * @constructor
	 */
	sc.html.CSSStatic = FunctionUtils.createEmptyFunction();
	sc.html.CSSStatic.prototype =
	{
		DISPLAY:    "display",
		HEIGHT:     constants.HEIGHT,
		LEFT:       "left",
		POSITION:   "position",
		STYLE:      "style",
		TOP:        "top",
		WIDTH:      constants.WIDTH,
		VISIBILITY: "visibility",

		parseMeasurement: _parseMeasurement
	};

	/**
	 * @const
	 * @type {sc.html.CSSStatic}
	 */
	var CSS = new sc.html.CSSStatic();

	/**
	 * @enum {string}
	 */
	sc.html.CSSDisplay =
	{
		BLOCK:  "block",
		INLINE: "inline",
		NONE:   "none"
	};

	sc.html.CSSDisplay.INLINE_BLOCK = sc.html.CSSDisplay.INLINE + '-' + sc.html.CSSDisplay.BLOCK;

	/**
	 * @enum {string}
	 */
	sc.html.CSSPosition =
	{
		ABSOLUTE: "absolute",
		FIXED:    "fixed",
		RELATIVE: "relative"
	};

	/**
	 * @const
	 * @type {sc.html.CSSStatic}
	 */
	sc.html.CSS = CSS;

	/**
	 * @constructor
	 * @implements {sc.html.IDOMModule}
	 *
	 * @param {sc.html.DOMElement} element
	 */
	sc.html.CSSModule = function (element)
	{
		var _computed = {};
		/**
		 * @type {Object}
		 */
		var _current = element.element[CSS.STYLE];

		/**
		 * @private
		 */
		function _compute()
		{
			_computed = globals.window[GET_COMPUTED_STYLE](element.element);
		}

		/**
		 * @private
		 * @param {string} key
		 * @param {?=} value
		 * @return {*}
		 */
		function _styleValue(key, value)
		{
			if (arguments.length > 1)
			{
				return (_current[key] = value);
			}

			if (undefined != _current[key])
			{
				return _current[key];
			}

			!_computed && _compute();
			return _computed.getPropertyValue(key);
		}

		/**
		 *
		 * @type {function(string,?=):*}
		 */
		this.styleValue = _styleValue;

		/**
		 *
		 * @param {string|number} x
		 * @param {?string|number=} y
		 * @param {?boolean=} fixed
		 *
		 * @return {sc.html.CSSModule|Object}
		 */
		this.getPosition = function (x, y, fixed)
		{
			if (arguments[constants.LENGTH] > 0)
			{
				_styleValue(sc.html.CSS.POSITION, fixed ? "fixed" : "absolute");
				(undefined != x) && _styleValue(CSS.LEFT, _parseMeasurement(x));
				(undefined != y) && _styleValue(CSS.TOP, _parseMeasurement(y));

				return this;
			}
			else
			{
				var result = {};
				result[CSS.LEFT] = _styleValue(CSS.LEFT);
				result[CSS.TOP] = _styleValue(CSS.TOP);

				return result;
			}
		};

		/**
		 *
		 * @param {?string|number=} width
		 * @param {?string|number=} height
		 *
		 * @return {sc.html.CSSModule|Object}
		 */
		this.size = function (width, height)
		{
			if (arguments[constants.LENGTH] > 0)
			{
				(undefined != width) && _styleValue(CSS.WIDTH, _parseMeasurement(width));
				(undefined != height) && _styleValue(CSS.HEIGHT, _parseMeasurement(height));

				return this;
			}
			else
			{
				var result = {};
				result[CSS.WIDTH] = _styleValue(CSS.WIDTH);
				result[CSS.HEIGHT] = _styleValue(CSS.HEIGHT);

				return result;
			}
		};
	};

	sc.html.CSSModule[sc.html.isModule] = true;

	/**
	 * @type {sc.html.CSSModule}
	 */
	sc.html.IDOMElement.prototype.css;

	/**
	 * @type {sc.html.CSSModule}
	 */
	sc.html.DOMElement.prototype.css = /** @type {sc.html.CSSModule} */(/** @type {Object} */(sc.html.CSSModule));

});
