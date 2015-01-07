goog.require("sc.globals");
goog.require("sc.core.Utils");
goog.require("sc.events.TouchEvent");

goog.provide("sc.system.Browser");
goog.scope(function ()
{
	var globals = sc.globals;
	var system = sc.system;

	var ArrayUtils = sc.core.ArrayUtils;
	var TouchEvents = sc.events.TouchEvents;

	/**
	 * @const
	 * @type {number}
	 */
	var WATCHED_INACTIVE = 0;

	/**
	 * @const
	 * @type {number}
	 */
	var WATCHED_ACTIVE = 1;

	/**
	 * @const
	 * @type {number}
	 */
	var WATCHED_DONE = 2;

	/**
	 * @constructor
	 */
	system.BrowserStatic = function ()
	{
		var _onLoadWatched = WATCHED_INACTIVE;
		var _onLoadHandlers = [];
		/**
		 * @type {boolean}
		 */
		var _touchEnabled;

		/**
		 *
		 * @type {number}
		 */
		this.width = 0;

		/**
		 *
		 * @type {number}
		 */
		this.height = 0;

		/**
		 * @return {Array.<number>}
		 */
		this.getWindowSize = function ()
		{
			var width = this.width = globals.window.innerWidth;
			var height = this.height = globals.window.innerHeight;

			return [width, height];
		};

		/**
		 * @param {?Function=} callBack
		 * @return {sc.system.BrowserStatic}
		 */
		this.getWindowSizeAsync = function (callBack)
		{
			var result = this.getWindowSize();
			var thi$ = this;

			if (!result[0])
			{
				this.onLoad(function ()
				{
					callBack(thi$.getWindowSize());

					return thi$;
				});

				return this;
			}

			callBack(result);

			return this;
		};

		/**
		 * @return {boolean}
		 */
		this.isTouchEnabled = function ()
		{
			if (undefined == _touchEnabled)
			{
				var documentTouch = globals.window["DocumentTouch"];
				var onTouchStart = 'on' + TouchEvents.ON_TOUCH_START;
				_touchEnabled = (onTouchStart in globals.window) || documentTouch && (globals.document instanceof documentTouch);
			}

			return _touchEnabled;
		};

		/**
		 *
		 * @param callBack
		 * @return {sc.system.BrowserStatic}
		 */
		this.onLoad = function (callBack)
		{
			if (WATCHED_DONE == _onLoadWatched)
			{
				ArrayUtils.push(_onLoadHandlers, callBack);
			}

			if (!_onLoadWatched)
			{
				globals.window["onload"] = function ()
				{
					ArrayUtils.forEachItem(_onLoadHandlers, function (handler)
					{
						handler();
					});

					_onLoadWatched = WATCHED_DONE;
				};

				_onLoadWatched = WATCHED_ACTIVE;
			}

			return this;
		};
	};

	/**
	 * @const
	 * @type {sc.system.BrowserStatic}
	 */
	system.Browser = new system.BrowserStatic();
});