goog.require("sc.core.Types");
goog.require("sc.core.Utils");
goog.require("sc.display.ILayer");
goog.require("sc.html.DOM");
goog.require("sc.html.DOMCanvasElement");
goog.require("sc.html.layers.ICanvasLayer");
goog.require("sc.html.stages.ICanvasStage");

goog.provide("sc.html.stages.CanvasStage");
goog.scope(function ()
{
	var core = sc.core;
	var html = sc.html;

	var DOM = html.DOM;
	var DOMCanvasElement = html.DOMCanvasElement;
	var FunctionUtils = core.FunctionUtils;
	var Types = core.Types;

	/**
	 *
	 * @constructor
	 * @implements {sc.html.stages.ICanvasStage}
	 * @extends {sc.html.DOMCanvasElement}
	 * @param {(string|HTMLCanvasElement)} idOrElement
	 * @param {?number=} width
	 * @param {?number=} height
	 */
	sc.html.stages.CanvasStage = function (idOrElement, width, height)
	{
		// Constructor
		{
			if (typeof idOrElement == Types.STRING)
			{
				/**
				 * @type {string}
				 */
				var idOrTag = /** @type {string} */(idOrElement);
				idOrElement = /** @type {HTMLCanvasElement} */(DOM._getById(idOrTag));
				if (!idOrElement)
				{
					idOrElement = /** @type {HTMLCanvasElement} */(DOM._create(DOM.TAG_CANVAS, DOM._query("[data-sc-app=" + idOrTag + "]")));
				}
			}

			FunctionUtils.invoke(DOMCanvasElement, this, idOrElement);
			this.size(width, height);
		}

		// Base
		{
			this.__base__update = this.update;
		}

		/**
		 *
		 * @param {sc.html.layers.ICanvasLayer} child
		 *
		 * @return {sc.html.layers.ICanvasLayer}
		 */
		this.addCanvasLayer = function (child)
		{
			return child;
		};

		/**
		 *
		 * @param {sc.display.ILayer} layer
		 *
		 * @return {sc.display.ILayer}
		 */
		this.addLayer = function (layer)
		{
			return layer;
		};

		/**
		 *
		 * @param {?sc.display.UpdateDirections=} direction
		 *
		 * @return {sc.display.IDisplayObject}
		 */
		this.update = function (direction)
		{
			this.__base__update(direction);

			return this;
		};
	};
});