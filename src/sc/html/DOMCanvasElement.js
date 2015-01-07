goog.require("sc.constants");
goog.require("sc.core.Maths");
goog.require("sc.core.Utils");
goog.require("sc.html.DOM");
goog.require("sc.html.DOMElement");
goog.require("sc.html.IDOMCanvasElement");

goog.provide("sc.html.DOMCanvasElement");
goog.scope(function ()
{
	var DOM = sc.html.DOM;
	var DOMElement = sc.html.DOMElement;
	var FunctionUtils = sc.core.FunctionUtils;

	/**
	 * @constructor
	 */
	sc.html.CompositeOperationsStatic = FunctionUtils.createEmptyFunction();
	sc.html.CompositeOperationsStatic.prototype =
	{
		COPY:             "copy",
		DARKER:           "darker",
		DESTINATION_ATOP: "destination-atop",
		DESTINATION_IN:   "destination-in",
		DESTINATION_OUT:  "destination-out",
		DESTINATION_OVER: "destination-over",
		LIGHTER:          "lighter",
		SOURCE_ATOP:      "source-atop",
		SOURCE_IN:        "source-in",
		SOURCE_OUT:       "source-out",
		SOURCE_OVER:      "source-over",
		XOR:              "xor"
	};
	/**
	 * @const
	 * @type {sc.html.CompositeOperationsStatic}
	 */
	sc.html.CompositeOperations = new sc.html.CompositeOperationsStatic();

	/**
	 * @class
	 * @constructor
	 * @extends {sc.html.DOMElement}
	 * @implements {sc.html.IDOMCanvasElement}
	 * @unrestricted
	 *
	 * @param {HTMLCanvasElement} element
	 */
	sc.html.DOMCanvasElement = goog.defineClass(DOMElement, {
		constructor: function (element)
		{
			// Constructor
			{
				FunctionUtils.invoke(DOMElement, this, element);
				//FunctionUtils.base(this, [element]);
			}
		}
	});

	DOM.addWrapper(DOM.TAG_CANVAS, sc.html.DOMCanvasElement);

	/**
	 * @param {?number=} width
	 * @param {?number=} height
	 * @param {?HTMLElement|sc.html.DOMElement=} parent
	 * @returns {sc.html.DOMCanvasElement}
	 */
	DOM.createCanvas = function (width, height, parent)
	{
		var canvas = /** @type {sc.html.DOMCanvasElement} */(DOM.createSheet(DOM.TAG_CANVAS, parent));
		canvas.size(width, height);

		return canvas;
	};
});
