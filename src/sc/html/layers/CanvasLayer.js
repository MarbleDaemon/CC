goog.require("sc.constants");
goog.require("sc.core.Utils");
goog.require("sc.html.CSS");
goog.require("sc.html.DOM");
goog.require("sc.html.DOMCanvasElement");
goog.require("sc.html.layers.ICanvasLayer");
goog.require("sc.html.stages.IDOMStage");

goog.provide("sc.html.layers.CanvasLayer");
goog.scope(function ()
{
	var constants = sc.constants;
	var core = sc.core;
	var html = sc.html;

	var DOM = html.DOM;
	var DOMCanvasElement = html.DOMCanvasElement;
	var FunctionUtils = core.FunctionUtils;

	/**
	 *
	 * @constructor
	 * @implements {sc.html.layers.ICanvasLayer}
	 * @extends {sc.html.DOMCanvasElement}
	 */
	sc.html.layers.CanvasLayer = goog.defineClass(DOMCanvasElement, {
		constructor: function ()
		{
			FunctionUtils.invoke(DOMCanvasElement, this, /** @type {HTMLCanvasElement} */(DOM._create(DOM.TAG_CANVAS)));

			/**
			 *
			 * @param {sc.html.stages.IDOMStage} stage
			 * @param {?boolean=} doAdding
			 *
			 * @return {sc.html.layers.ICanvasLayer}
			 */
			this.attachToDOMStage = function (stage, doAdding)
			{
				this.attachToDisplayObject(stage, doAdding);

				/**
				 * @type {sc.html.CSSModule|Object}
				 */
				var stageSize = stage.css.size();
				this.css.getPosition(0, 0);
				this.size(stageSize[constants.WIDTH], stageSize[constants.HEIGHT]);

				return this;
			};

			(function ()
			{
			})();
		}
	});
});