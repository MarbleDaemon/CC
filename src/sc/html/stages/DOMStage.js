goog.require("sc.core.Types");
goog.require("sc.core.Utils");
goog.require("sc.display.ILayer");
goog.require("sc.html.CSS");
goog.require("sc.html.DOM");
goog.require("sc.html.DOMElement");
goog.require("sc.html.layers.IDOMLayer");
goog.require("sc.html.stages.IDOMStage");
goog.require("sc.system.Browser");

goog.provide("sc.html.stages.DOMStage");
goog.scope(function ()
{
	var core = sc.core;
	var html = sc.html;
	var system = sc.system;

	var Browser = system.Browser;
	var CSS = html.CSS;
	var CSSDisplay = html.CSSDisplay;
	var CSSPosition = html.CSSPosition;
	var DOM = html.DOM;
	var DOMElement = html.DOMElement;
	var FunctionUtils = core.FunctionUtils;
	var Types = core.Types;

	/**
	 * @constructor
	 * @implements {sc.html.stages.IDOMStage}
	 * @extends {sc.html.DOMElement}
	 *
	 * @param {?string|HTMLElement=} idOrElement
	 * @param {?number=} width
	 * @param {?number=} height
	 */
	sc.html.stages.DOMStage = goog.defineClass(DOMElement, {
		constructor: function (idOrElement, width, height)
		{
			// Constructor
			{
				if (typeof idOrElement == Types.STRING)
				{
					/**
					 * @type {string}
					 */
					var idOrTag = /** @type {string} */(idOrElement);
					idOrElement = /** @type {HTMLElement} */(DOM._getById(idOrTag));
					if (!idOrElement)
					{
						idOrElement = DOM._query("[data-sc-element=" + idOrTag + "]");

						if(!idOrElement)
						{
							idOrElement = /** @type {HTMLElement} */(DOM._create(DOM.TAG_DIV, DOM._query("[data-sc-app=" + idOrTag + "]")));
						}
					}
				}

				FunctionUtils.invoke(DOMElement, this, idOrElement);

				this.css.styleValue(CSS.POSITION, CSSPosition.RELATIVE);
				this.css.size(width, height);
			}
		},

		/**
		 *
		 * @param {sc.display.ILayer} layer
		 *
		 * @return {sc.display.ILayer}
		 */
		addLayer: function (layer)
		{
			return layer;
		},

		/**
		 *
		 * @param {sc.html.layers.IDOMLayer} layer
		 *
		 * @return {sc.html.layers.IDOMLayer}
		 */
		addDOMLayer: function (layer)
		{
			this.addElement(layer);

			return layer.attachToDOMStage(this);
		},

		/**
		 *
		 * @return {sc.html.stages.DOMStage}
		 */
		fitToScreen: function ()
		{
			var thi$ = this;

			Browser.getWindowSizeAsync(function (size)
			{
				thi$.css.styleValue(CSS.DISPLAY, CSSDisplay.BLOCK);
				thi$.css.size(size[0], size[1]);
			});

			return this;
		}
	});
});