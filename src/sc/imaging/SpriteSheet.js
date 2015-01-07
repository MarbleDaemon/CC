{
	goog.require("sc.constants");
	goog.require("sc.globals");
	goog.require("sc.core.Utils");
	goog.require("sc.html.DOM");
	goog.require("sc.html.modules.RenderingContext2D");
	goog.require("sc.imaging.Sprite");
}
goog.provide("sc.imaging.SpriteSheet");
goog.provide("sc.imaging.SpriteSheets");
goog.provide("sc.imaging.SpriteSheetStatus");
goog.scope(function ()
{
	var constants = sc.constants;
	var globals = sc.globals;

	var ArrayUtils = sc.core.ArrayUtils;
	var CompositeOperations = sc.html.modules.context2d.CompositeOperations;
	var DOM = sc.html.DOM;
	var Sprite = sc.imaging.Sprite;

	var _basePath = "";
	var _loading = 0;
	/**
	 *
	 * @private
	 *
	 * @type {Array<Function>}
	 */
	var _onAllReadyHandlers = [];

	function _handleOnSpriteSheetReady()
	{
		_loading--;

		if (_loading == 0)
		{
			ArrayUtils.forEachItem(_onAllReadyHandlers, function (handler)
			{
				handler();
			});
		}
	}

	/**
	 *
	 * @param {string} path
	 * @param {string} extension
	 * @param {?boolean=} hasAlpha
	 *
	 * @return {sc.imaging.SpriteSheet}
	 */
	sc.imaging.SpriteSheets.createSheet = function (path, extension, hasAlpha)
	{
		return new sc.imaging.SpriteSheet(path, extension, hasAlpha);
	};

	/**
	 *
	 * @param {Function} callBack
	 */
	sc.imaging.SpriteSheets.onAllReady = function (callBack)
	{
		!ArrayUtils.contain(_onAllReadyHandlers, callBack) && ArrayUtils.push(_onAllReadyHandlers, callBack);
	}

	/**
	 *
	 * @param {Array<sc.imaging.SpriteSheet>} spriteSheets
	 * @param {Function} callBack
	 * @param {?boolean=} doLoad
	 */
	sc.imaging.SpriteSheets.onReady = function (spriteSheets, callBack, doLoad)
	{
		var toLoad = spriteSheets.length;

		function onReady()
		{
			toLoad--;

			if (toLoad == 0)
			{
				callBack();
			}
		}

		ArrayUtils.forEachItem(spriteSheets,
			/**
			 * @param {sc.imaging.SpriteSheet} spriteSheet
			 */
			function (spriteSheet)
			{
				spriteSheet.onReady(onReady, doLoad);
			});
	};

	sc.imaging.SpriteSheets.setBasePath = function (value)
	{
		_basePath = value;
	};

	/**
	 * @enum {number}
	 */
	sc.imaging.SpriteSheetStatus =
	{
		NOT_READY: globals.UID++,
		LOADING:   globals.UID++,
		LOADED:    globals.UID++,
		READY:     globals.UID++
	};

	var SpriteSheetStatus = sc.imaging.SpriteSheetStatus;

	/**
	 * @constructor
	 *
	 * @param {string=} path
	 * @param {string=} extension
	 * @param {?boolean=} hasAlpha
	 */
	sc.imaging.SpriteSheet = goog.defineClass(null, {
		/**
		 * @param {string=} path
		 * @param {string=} extension
		 * @param {?boolean=} hasAlpha
		 */
		constructor: function (path, extension, hasAlpha)
		{
			var thi$ = this;

			var _onReadyHandlers = [];
			var _status = SpriteSheetStatus.NOT_READY;

			function _handleOnReady()
			{
				var handlers = _onReadyHandlers;
				_onReadyHandlers = [];

				ArrayUtils.forEachItem(handlers, function (handler)
				{
					handler(thi$);
				});

				_handleOnSpriteSheetReady();
			}

			/**
			 *
			 * @type {(HTMLCanvasElement|HTMLImageElement|HTMLVideoElement)}
			 */
			this.data = null;

			/**
			 *
			 * @return {sc.imaging.SpriteSheet}
			 */
			this.load = function ()
			{
				var thi$ = this;
				if (_status == SpriteSheetStatus.NOT_READY)
				{
					_loading++;
					_status = SpriteSheetStatus.LOADING;

					/**
					 * @type {HTMLImageElement}
					 */
					var img = /** @type {HTMLImageElement} */(DOM._create(DOM.TAG_IMG));
					img.src = _basePath + "/" + path + "." + extension;
					img.onload = function ()
					{
						this.onload = null;
						thi$.ready();
					};

					this.data = img;
				}

				return this;
			};

			/**
			 *
			 * @param {function(sc.imaging.SpriteSheet?)} handler
			 * @param {?boolean=} doLoad
			 *
			 * @return {sc.imaging.SpriteSheet}
			 */
			this.onReady = function (handler, doLoad)
			{
				if (_status == SpriteSheetStatus.READY)
				{
					handler(this);
				}
				else
				{
					ArrayUtils.push(_onReadyHandlers, handler);

					if (doLoad)
					{
						this.load();
					}
				}

				return this;
			};

			this.ready = function ()
			{
				_status = SpriteSheetStatus.READY;
				_handleOnReady();
			};
		},

		/**
		 *
		 * @param {string} color
		 * @param {?boolean=} doLoad
		 *
		 * @return {sc.imaging.SpriteSheet}
		 */
		createShadow: function (color, doLoad)
		{
			var thi$ = this;
			var result = new sc.imaging.SpriteSheet();
			_loading++;

			this.onReady(function ()
			{
				var width = thi$.data[constants.WIDTH];
				var height = thi$.data[constants.HEIGHT];
				var canvas = DOM.createCanvas(width, height);
				canvas.context2D
					.fillStyle(color)
					.fillRect(0, 0, width, height)
					.globalCompositeOperation(CompositeOperations.DESTINATION_IN)
					.drawImageAt(thi$.data, 0, 0, width, height);
				result.data = /** @type {HTMLCanvasElement} */(canvas.element);
				result.ready();
			}, doLoad);

			return result;
		},

		/**
		 *
		 * @param {?number=} x
		 * @param {?number=} y
		 * @param {?number=} width
		 * @param {?number=} height
		 * @param {?number=} scaleX
		 * @param {?number=} scaleY
		 *
		 * @return {sc.imaging.Sprite}
		 */
		createSprite: function (x, y, width, height, scaleX, scaleY)
		{
			return new Sprite(this, x, y, width, height, scaleX, scaleY);
		},

		/**
		 *
		 * @param {number} total
		 * @param {?boolean=} evenOnly
		 *
		 * @return {Array.<sc.imaging.Sprite>}
		 */
		createSprites: function (total, evenOnly)
		{
			var result = [];
			var thi$ = this;

			thi$.onReady(function ()
			{
				var step = thi$.data[constants.WIDTH] / total;
				var width = evenOnly && (step % 2 == 1) ? step + 1 : step;
				var height = thi$.data[constants.HEIGHT];
				if (evenOnly && (height % 2 == 1))
				{
					height++;
				}
				var x = 0;
				while (total > 0)
				{
					ArrayUtils.push(result, thi$.createSprite(x, 0, width, height));
					x += step;
					total--;
				}
			});

			return result;
		},

		/**
		 *
		 * @param {function(sc.imaging.SpriteSheet?)} callBack
		 *
		 * @return {sc.imaging.SpriteSheet}
		 */
		enclose: function (callBack)
		{
			callBack(this);

			return this;
		}
	})
});
