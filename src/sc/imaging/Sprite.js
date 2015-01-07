{
	goog.require("sc.constants");

	goog.require("sc.core.Utils");

	goog.require("sc.html.DOM");
	goog.require("sc.html.DOMCanvasElement");
	goog.require("sc.html.modules.IRenderingContext2D");
}
{
	goog.forwardDeclare("sc.imaging.SpriteSheet");
}
{
	goog.provide("sc.imaging.Sprite");
	goog.provide("sc.imaging.Sprites");
}
goog.scope(function ()
{
	var constants = sc.constants;

	var DOM = sc.html.DOM;
	var DOMCanvasElement = sc.html.DOMCanvasElement;
	var FunctionUtils = sc.core.FunctionUtils;

	/**
	 *
	 * @constructor
	 * @extends {sc.html.DOMCanvasElement}
	 */
	sc.imaging.Sprite = goog.defineClass(DOMCanvasElement, {
		/**
		 *
		 * @param {sc.imaging.SpriteSheet} spriteSheet
		 * @param {?number=} x
		 * @param {?number=} y
		 * @param {?number=} width
		 * @param {?number=} height
		 * @param {?number=} scaleX
		 * @param {?number=} scaleY
		 */
		constructor: function (spriteSheet, x, y, width, height, scaleX, scaleY)
		{
			/**
			 * @type {sc.imaging.Sprite}
			 */
			var thi$ = this;

			var _x = x || 0;
			var _y = y || 0;

			/**
			 *
			 * @type {number}
			 */
			this.scaleX = scaleX || 1;
			/**
			 *
			 * @type {number}
			 */
			this.scaleY = scaleY || 1;

			/**
			 *
			 * @type {number}
			 */
			this.width = width || 0;
			/**
			 *
			 * @type {number}
			 */
			this.height = height || 0;

			/**
			 *
			 * @type {sc.imaging.SpriteSheet}
			 */
			this.spriteSheet = spriteSheet;

			FunctionUtils.invoke(DOMCanvasElement, this, DOM._create(DOM.TAG_CANVAS));

			spriteSheet.onReady(function ()
			{
				if (!thi$.width)
				{
					thi$.width = spriteSheet.data[constants.WIDTH];
				}

				if (!thi$.height)
				{
					thi$.height = spriteSheet.data[constants.HEIGHT];
				}

				var width = thi$.width;
				var height = thi$.height;
				var scaledWidth = width * thi$.scaleX;
				var scaledHeight = height * thi$.scaleY;

				thi$.size(scaledWidth, scaledHeight);
				thi$.context2D
					.drawPartialImageAt(spriteSheet.data, _x, _y, width, height, 0, 0, scaledWidth, scaledHeight);
			});
		},

		/**
		 *
		 * @param {sc.html.modules.IRenderingContext2D} target
		 * @param {number} x
		 * @param {number} y
		 * @param {?number=} angle
		 * @param {?number=} scaleX
		 * @param {?number=} scaleY
		 *
		 * @returns {sc.imaging.Sprite}
		 */
		renderTo: function (target, x, y, angle, scaleX, scaleY)
		{
			target
				.drawRotatedImageAt(/** @type {(HTMLCanvasElement|HTMLImageElement|HTMLVideoElement)} */(this.element), angle || 0, x, y, this.width * this.scaleX * (scaleX || 1),
				this.height * this.scaleY * (scaleY || 1));

			return this;
		}
	});
});