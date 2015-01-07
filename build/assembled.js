goog.provide("dxp.lego");
goog.provide("sc.collections");
goog.provide("sc.Constants");
goog.provide("sc.core");
goog.provide("sc.display");
goog.provide("sc.events");
goog.provide("sc.geom");
goog.provide("sc.system");
goog.provide("sc.html");
goog.scope(function(){(function(console,Math,window,document){
//******************************************** sc/collections/ArrayUtils
//******************************************** sc/Constants



sc.Constants.HEIGHT = "height";
sc.Constants.LENGTH = "length";
sc.Constants.SET_TIME_OUT = "setTimeout";
sc.Constants.WIDTH = "width";

//******************************************** sc/core/Functions

(function ()
{
	/**
	 * @return {function (new:?)}
	 */
	function _createEmptyFunction()
	{
		return new Function();
	}

	/**
	 * @type {FunctionsStatic}
	 */
	var Functions;

	/**
	 * @constructor
	 */
	var FunctionsStatic = _createEmptyFunction();
	FunctionsStatic.prototype =
	{
		BLANK: function ()
		{
		},

		IDENTITY: function (x)
		{
			return x;
		},

		TRUE: function ()
		{
			return true;
		},

		/**
		 * @this {?}
		 * @param {T} obj
		 * @param {string} method
		 * @return {function(this:T)}
		 * @template T
		 */
		autoBind: function (obj, method)
		{
			return Functions.bindToObject(obj[method], obj);
		},

		/**
		 * @this {?}
		 * @param {Function} func
		 * @param {?} obj
		 * @param {...?} var_args
		 * @return {?}
		 */
		invoke: function (func, obj, var_args)
		{
			var args = sc.collections.ArrayUtils.slice(arguments, 2);
			return func.apply(obj, args);
		},

		/**
		 * @return {function (new:?)}
		 */
		createEmptyFunction: _createEmptyFunction,

		/**
		 *
		 * @param {Object} self
		 * @param {?Object=} host
		 * @return {function(string, ?Array=):Function}
		 */
		createSelfReturnBoundFunction: function (self, host)
		{
			/*function autoReturn(method)
			 {
			 var args = sc.collections.ArrayUtils.slice(arguments, 1);
			 var obj = host || self;
			 obj[method].apply(obj, args);
			 return self;
			 }*/
			function autoReturn(method, args)
			{
				//var theArgs = sc.collections.ArrayUtils.slice(arguments, 1);
				var theArgs = sc.collections.ArrayUtils.slice(args,0);
				var obj = host || self;
				obj[method].apply(obj, theArgs);
				return self;
			}

			return (/**
			 * @param {string} method
			 * @return {Function}
			 */function (method)
			{
				return function ()
				{
					var theArgs = sc.collections.ArrayUtils.slice(arguments, 0);
					return autoReturn(method, theArgs);
				}
			});
		},

		/**
		 * @this {?}
		 * @param {Function} func
		 * @param {Array} var_args
		 * @return {Function}
		 */
		bindDefaultArguments: function (func, var_args)
		{
			/*var args = sc.collections.ArrayUtils.concat([0], var_args);
			 return func[Functions.BIND].apply(func, args);*/
			return function ()
			{
				var args = sc.collections.ArrayUtils.concat([], var_args, sc.collections.ArrayUtils.slice(arguments, 0));
				func.apply(0, args);
			}
		},

		/**
		 * @this {?}
		 * @param {Function} func
		 * @param {T} obj
		 * @return {function(this:T)}
		 * @template T
		 */
		bindToObject: function (func, obj)
		{
			return func.bind(obj);
		}
	};

	Functions = new FunctionsStatic();

	/**
	 * @const
	 * @type {FunctionsStatic}
	 */
	sc.core.Functions = Functions;
})();

(function ()
{
	var _prototype = [];

	/**
	 * @constructor
	 */
	var ArrayUtils = function ()
	{
	};
	ArrayUtils.prototype = {
		/**
		 * @param {?} arr
		 * @param {...?} var_args
		 * @return {Array}
		 */
		concat: function (arr, var_args)
		{
			return _prototype.concat.apply(arr, sc.collections.ArrayUtils.slice(arguments, 1));
		},

		/**
		 * @param {?} arr
		 * @param {?} item
		 * @return {boolean}
		 */
		contain: function (arr, item)
		{
			return this.index(arr, item) > 0;
		},

		/**
		 * @param {?} arr
		 * @param {?} item
		 * @return {number}
		 */
		index: function (arr, item)
		{
			return sc.core.Functions.invoke(_prototype.indexOf, arr, item);
		},

		/**
		 * @param {?} arr
		 * @param {?string=} delimiter
		 * @return {string}
		 */
		join: function (arr, delimiter)
		{
			return sc.core.Functions.invoke(_prototype.join, arr, delimiter);
		},

		/**
		 * @param {?} arr
		 * @param {number} from
		 * @param {?number=} to
		 * @return {Array}
		 */
		slice: function (arr, from, to)
		{
			return _prototype.slice.call(arr, from, to);
		},

		/**
		 * @param {?} arr
		 * @param {Function} callBack
		 * @return {boolean}
		 */
		everyItem_: function (arr, callBack)
		{
			return _prototype.every.call(arr, callBack);
		},

		/**
		 * @param {?} arr
		 * @param {Function} callBack
		 */
		forEachItem: function (arr, callBack)
		{
			_prototype.forEach.call(arr, callBack);
		},

		/**
		 * @param {?} arr
		 * @param {Function} callBack
		 * @param {?number=} batchSize
		 */
		forEachBatch: function (arr, callBack, batchSize)
		{
			var len = arr[sc.Constants.LENGTH];
			batchSize = batchSize || 1;
			for (var count = 0; count < len; count += batchSize)
			{
				callBack.apply(null, _prototype.slice.call(arr, count, count + batchSize).concat([count]));
			}
		},

		/**
		 * @param {?} arr
		 * @return {?}
		 */
		last: function (arr)
		{
			return arr[arr[sc.Constants.LENGTH] - 1];
		},

		/**
		 * @param {?} arr
		 * @param {?} item
		 * @return {number}
		 */
		push: function (arr, item)
		{
			var index = arr[sc.Constants.LENGTH];
			arr[index] = item;
			return index;
		},

		/**
		 * @param {?} arr
		 * @param {?} item
		 * @return {Array}
		 */
		unshift: function (arr, item)
		{
			_prototype.unshift.call(arr, item);
			return arr;
		}
	};

	/**
	 * @const
	 * @type {ArrayUtils}
	 */
	sc.collections.ArrayUtils = new ArrayUtils();
})();

//******************************************** sc/core/Application



sc.core.application = undefined;

//******************************************** sc/core/Maths

(function ()
{
	/**
	 * @type {MathsStatic}
	 */
	var Maths;

	/**
	 * @constructor
	 */
	var MathsStatic = sc.core.Functions.createEmptyFunction();
	MathsStatic.prototype =
	{
		/**
		 * @type {function(number):number}
		 */
		abs_:     Math.abs,
		/**
		 * @type {function(number):number}
		 */
		acos_:    Math.acos,
		/**
		 * @type {function(number):number}
		 */
		asin_:    Math.asin,
		/**
		 * @type {function(number):number}
		 */
		atan_:    Math.atan,
		/**
		 * @type {function(number, number):number}
		 */
		atan2_:   Math.atan2,
		/**
		 * @type {function(number):number}
		 */
		ceil_:    Math.ceil,
		/**
		 * @type {function(number):number}
		 */
		cos_:     Math.cos,
		/**
		 * @const
		 * @type {number}
		 */
		E_:       Math.E,
		/**
		 * @type {function(number):number}
		 */
		exp_:     Math.exp,
		/**
		 * @type {function(number):number}
		 */
		floor_:   Math.floor,
		/**
		 * @const
		 * @type {number}
		 */
		LN10_:    Math.LN10,
		/**
		 * @const
		 * @type {number}
		 */
		LN2_:     Math.LN2,
		/**
		 * @type {function(number):number}
		 */
		log_:     Math.log,
		/**
		 * @const
		 * @type {number}
		 */
		LOG10E_:  Math.LOG10E,
		/**
		 * @const
		 * @type {number}
		 */
		LOG2E_:   Math.LOG2E,
		/**
		 * @type {function(...[number]):number}
		 */
		max_:     Math.max,
		/**
		 * @type {function(...[number]):number}
		 */
		min_:     Math.min,
		/**
		 * @const
		 * @type {number}
		 */
		PI_:      Math.PI,
		/**
		 * @type {function(number, number):number}
		 */
		pow_:     Math.pow,
		/**
		 * @type {function():number}
		 */
		random_:  Math.random,
		/**
		 * @type {function(number):number}
		 */
		round_:   Math.round,
		/**
		 * @type {function(number):number}
		 */
		sin_:     Math.sin,
		/**
		 * @type {function(number):number}
		 */
		sqrt_:    Math.sqrt,
		/**
		 * @const
		 * @type {number}
		 */
		SQRT1_2_: Math.SQRT1_2,
		/**
		 * @const
		 * @type {number}
		 */
		SQRT2_:   Math.SQRT2,
		/**
		 * @type {function(number):number}
		 */
		tan_:     Math.tan,

		/**
		 *
		 * @param {number} percent
		 * @return {boolean}
		 */
		randomPercent: function (percent)
		{
			return Maths.random_() * 100 <= percent;
		}
	};

	Maths = new MathsStatic();

	/**
	 * @const
	 * @type {MathsStatic}
	 */
	sc.core.Maths = Maths;
})();

//******************************************** sc/core/StringUtils



String.prototype.hashCode = function ()
{
	var hash = 0, i, chr, len;
	if (this.length == 0) return hash;
	for (i = 0, len = this.length; i < len; i++)
	{
		chr = this.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
};

//******************************************** sc/display/Colors

(function ()
{
	/**
	 * @constructor
	 */
	var ColorsStatic = sc.core.Functions.createEmptyFunction();
	ColorsStatic.prototype = {
		/**
		 *
		 * @param {?number} rgb
		 * @param {?number=} alpha
		 * @returns {Array.<number>}
		 */
		from: function (rgb, alpha)
		{
			(rgb > 0xffffff) && (alpha = ((rgb & 0xff000000) >> 24) / 255);
			(undefined == alpha) && (alpha = 1);
			var red = (rgb & 0xff0000) >> 16;
			var green = (rgb & 0xff00) >> 8;
			var blue = rgb & 0xff;
			return [red, green, blue, alpha];
		},

		/**
		 *
		 * @param {?number} red
		 * @param {?number=} green
		 * @param {?number=} blue
		 * @param {?number=} alpha
		 * @returns {string}
		 */
		toStyleString: function (red, green, blue, alpha)
		{
			if (arguments.length < 3)
			{
				var parts = this.from(red, green);
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
		}
	};

	/**
	 * @const
	 * @type {ColorsStatic}
	 */
	sc.display.Colors = new ColorsStatic();
})();
//******************************************** sc/display/DOMStage

//******************************************** sc/core/Types

(function()
{
	/**
	 * @constructor
	 */
	var TypesStatic = sc.core.Functions.createEmptyFunction();
	TypesStatic.prototype =
	{
		BOOLEAN:   typeof true,
		NUMBER:    typeof 0,
		STRING:    typeof "",
		OBJECT:    typeof {},
		UNDEFINED: typeof undefined,
		FUNCTION:  typeof function ()
		{
		}
	};

	/**
	 * @const
	 * @type {TypesStatic}
	 */
	sc.core.Types = new TypesStatic();
})();

//******************************************** sc/display/IStage



/**
 * @interface
 * @param {string} id
 * @param {?number=} width
 * @param {?number=} height
 */
sc.display.IStage = function(id, width, height)
{
};

//******************************************** sc/events/MouseEvent

(function ()
{
	/**
	 * @constructor
	 */
	var MouseEventsStatic = sc.core.Functions.createEmptyFunction();
	MouseEventsStatic.prototype =
	{
		/**
		 * @const
		 */
		ON_MOUSE_DOWN: "mousedown",
		/**
		 * @const
		 */
		ON_MOUSE_MOVE: "mousemove",
		/**
		 * @const
		 */
		ON_MOUSE_UP:   "mouseup"
	};

	/**
	 * @const
	 * @type {MouseEventsStatic}
	 */
	sc.events.MouseEvents = new MouseEventsStatic();
})();
//******************************************** sc/events/PointerEvent

//******************************************** sc/events/TouchEvent

(function ()
{
	/**
	 * @constructor
	 */
	var TouchEventsStatic = sc.core.Functions.createEmptyFunction();
	TouchEventsStatic.prototype =
	{
		/**
		 * @const
		 */
		ON_TOUCH_CANCEL: "touchcancel",
		/**
		 * @const
		 */
		ON_TOUCH_END:    "touchend",
		/**
		 * @const
		 */
		ON_TOUCH_MOVE:   "touchmove",
		/**
		 * @const
		 */
		ON_TOUCH_START:  "touchstart"
	};

	/**
	 * @const
	 * @type {TouchEventsStatic}
	 */
	sc.events.TouchEvents = new TouchEventsStatic();
})();


//******************************************** sc/geom/Point


{
	/**
	 * @constructor
	 * @param {?number=} x
	 * @param {?number=} y
	 */
	sc.geom.Point = function (x, y)
	{
		/**
		 *
		 * @type {number}
		 */
		this.x = x || 0;
		/**
		 *
		 * @type {number}
		 */
		this.y = y || 0;
	};
}
//******************************************** sc/system/Browser


(function ()
{
	/**
	 * const
	 * @type {number}
	 */
	var WATCHED_INACTIVE = 0;

	/**
	 * const
	 * @type {number}
	 */
	var WATCHED_ACTIVE = 1;

	/**
	 * const
	 * @type {number}
	 */
	var WATCHED_DONE = 2;

	/**
	 * @constructor
	 */
	sc.system.BrowserStatic = function ()
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
			var width = this.width = window.innerWidth;
			var height = this.height = window.innerHeight;

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
				var documentTouch = window["DocumentTouch"];
				var onTouchStart = 'on' + sc.events.TouchEvents.ON_TOUCH_START;
				if ((onTouchStart in window) || documentTouch && (document instanceof documentTouch))
				{
					_touchEnabled = true;
				}
				else
				{
					_touchEnabled = false;
				}
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
				sc.collections.ArrayUtils.push(_onLoadHandlers, callBack);
			}

			if (!_onLoadWatched)
			{
				window["onload"] = function ()
				{
					sc.collections.ArrayUtils.forEachItem(_onLoadHandlers, function (handler)
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
	 */
	sc.system.Browser = new sc.system.BrowserStatic();

})();
(function ()
{
	var Browser = sc.system.Browser;
	var MouseEvents = sc.events.MouseEvents;
	var TouchEvents = sc.events.TouchEvents;

	var HASH = 0xb65f;

	/**
	 * @constructor
	 */
	var PointerEventsStatic = sc.core.Functions.createEmptyFunction();
	PointerEventsStatic.prototype =
	{
		/**
		 * @const
		 */
		ON_POINTER_CLICK: HASH,
		/**
		 * @const
		 */
		ON_POINTER_END:   ++HASH,
		/**
		 * @const
		 */
		ON_POINTER_MOVE:  ++HASH,
		/**
		 * @const
		 */
		ON_POINTER_START: ++HASH,
		/**
		 * @const
		 */
		ON_POINTER_DRAG_END:   ++HASH,
		/**
		 * @const
		 */
		ON_POINTER_DRAG_MOVE:  ++HASH,
		/**
		 * @const
		 */
		ON_POINTER_DRAG_START: ++HASH,

		/**
		 * @const
		 * @param {number|string} eventName
		 * @return {number|string}
		 */
		getPointerEvent: function (eventName)
		{
			if (Browser.isTouchEnabled())
			{
				(MouseEvents.ON_MOUSE_DOWN == eventName) && (eventName = TouchEvents.ON_TOUCH_START);
				(MouseEvents.ON_MOUSE_MOVE == eventName) && (eventName = TouchEvents.ON_TOUCH_MOVE);
				(MouseEvents.ON_MOUSE_UP == eventName) && (eventName = TouchEvents.ON_TOUCH_END);
			}
			else
			{
				(TouchEvents.ON_TOUCH_START == eventName) && (eventName = MouseEvents.ON_MOUSE_DOWN);
				(TouchEvents.ON_TOUCH_MOVE == eventName) && (eventName = MouseEvents.ON_MOUSE_MOVE);
				(TouchEvents.ON_TOUCH_CANCEL == eventName) && (eventName = MouseEvents.ON_MOUSE_UP);
				(TouchEvents.ON_TOUCH_END == eventName) && (eventName = MouseEvents.ON_MOUSE_UP);
			}

			return eventName;
		},

		/**
		 *
		 * @const
		 * @param {Event} event
		 * @param {?sc.events.PointerEvent=} lastPointer
		 * @param {?number=} scaleX
		 * @param {?number=} scaleY
		 * @return {sc.events.PointerEvent}
		 */
		getPointerPosition: function (event, lastPointer, scaleX, scaleY)
		{
			/**
			 * @type {number}
			 */
			var x;
			/**
			 * @type {number}
			 */
			var y;
			/**
			 * @type {sc.events.PointerEvent}
			 */
			var pointerEvent = lastPointer || new sc.events.PointerEvent(0, 0);
			if (Browser.isTouchEnabled())
			{
				var touch = event['touches'][0];
				var boundingClientRect = event.target.getBoundingClientRect();
				x = touch['clientX'] - boundingClientRect['left'];
				y = touch['clientY'] - boundingClientRect['top'];
			}
			else
			{
				x = event['layerX'] || event['offsetX'];
				y = event['layerY'] || event['offsetY']
			}

			x /= scaleX || 1;
			y /= scaleY || 1;

			pointerEvent.dx = x - pointerEvent.x;
			pointerEvent.dy = y - pointerEvent.y;
			pointerEvent.x = x;
			pointerEvent.y = y;

			return pointerEvent;
		}
	};

	/**
	 * @const
	 * @type {PointerEventsStatic}
	 */
	sc.events.PointerEvents = new PointerEventsStatic();

	/**
	 * @constructor
	 * @param {?number=} x
	 * @param {?number=} y
	 */
	sc.events.PointerEvent = function (x, y)
	{
		/**
		 *
		 * @type {number}
		 */
		this.x = x || 0;

		/**
		 *
		 * @type {number}
		 */
		this.y = y || 0;

		/**
		 *
		 * @type {number}
		 */
		this.dx = 0;

		/**
		 *
		 * @type {number}
		 */
		this.dy = 0;

		this.getDistance = function()
		{
			return new sc.geom.Point(this.dx, this.dy);
		};

		this.getPosition = function()
		{
			return new sc.geom.Point(this.x, this.y);
		};
	};
})();


//******************************************** sc/html/DOM



(function ()
{
	/**
	 * @type {sc.html.DOMStatic}
	 */
	var DOM;

	/**
	 *
	 * @private
	 * @type {Object}
	 */
	var _wrappers = {};

	/**
	 * @constructor
	 */
	sc.html.DOMStatic = sc.core.Functions.createEmptyFunction();
	sc.html.DOMStatic.prototype =
	{
		ADD_EVENT_LISTENER: "addEventListener",
		GET_ELEMENT_BY_ID:  "getElementById",

		HEIGHT:       sc.Constants.HEIGHT,
		HTML_ELEMENT: "HTMLElement",

		TAG_CANVAS: "CANVAS",
		TAG_NAME:   "tagName",

		WIDTH: sc.Constants.WIDTH,

		/**
		 * @param {string} tagName
		 * @param {function(new:sc.html.DOMElement, (?|null)):undefined} wrapper
		 */
		addWrapper: function (tagName, wrapper)
		{
			_wrappers[tagName.toUpperCase()] = wrapper;
		},

		/**
		 * @param {string} tag
		 * @param {?(HTMLElement|sc.html.DOMElement)=} parent
		 * @return {HTMLElement}
		 */
		_create: function (tag, parent)
		{
			/**
			 * @type {HTMLElement}
			 */
			var element = /** @type {HTMLElement} */(document.createElement(tag));
			parent && ((parent instanceof window[DOM.HTML_ELEMENT]) ? parent : parent.element).appendChild(element);

			return element;
		},

		/**
		 *
		 * @param {string} id
		 * @return {HTMLElement}
		 */
		_getById: function (id)
		{
			return document[DOM.GET_ELEMENT_BY_ID](id);
		},

		/**
		 *
		 * @param {string} id
		 * @return {sc.html.DOMElement}
		 */
		getById: function (id)
		{
			return DOM.wrap(DOM._getById(id));
		},

		/**
		 *
		 * @param {string} query
		 * @return {HTMLElement}
		 */
		_query: function (query)
		{
			return /** @type {HTMLElement} */(document.querySelector(query));
		},

		/**
		 *
		 * @param {string} query
		 * @return {sc.html.DOMElement}
		 */
		query: function (query)
		{
			return DOM.wrap(DOM._query(query));
		},

		/**
		 * @param {(HTMLElement|Element)} element
		 * @return {sc.html.DOMElement}
		 */
		wrap: function (element)
		{
			/**
			 * @constructor
			 */
			var wrapper = _wrappers[element[DOM.TAG_NAME].toUpperCase()] || _wrappers[DOM.TAG_NAME.toUpperCase()];
			return /** @type {sc.html.DOMElement} */(new wrapper(element));
		}
	};

	DOM = new sc.html.DOMStatic();

	/**
	 * @const
	 * @type {sc.html.DOMStatic}
	 */
	sc.html.DOM = DOM;
})();

//******************************************** sc/html/DOMElement


//******************************************** sc/core/ObjectUtils

/**
 * @type {function(?):boolean}
 */
var $isUndefined = function (obj)
{
	return void 0 === obj;
};

var NULL = null;



(function ()
{
	var _prototype = {};

	/**
	 * @const
	 * @type {Array.<string>}
	 */
	var PROTOTYPE_FIELDS =
		[
			'constructor',
			'hasOwnProperty',
			'isPrototypeOf',
			'propertyIsEnumerable',
			'toLocaleString',
			'toString',
			'valueOf'
		];

	/**
	 * @constructor
	 */
	var ObjectUtilsStatic = sc.core.Functions.createEmptyFunction();
	ObjectUtilsStatic.prototype =
	{
		NULL:      NULL,
		UNDEFINED: undefined,

		/**
		 * @param {Object} obj
		 * @param {function(?, ?string=)} callBack
		 */
		forEachItem: function (obj, callBack)
		{
			for (var key in obj)
			{
				callBack(obj[key], key);
			}
		},

		/**
		 * @param {*} obj
		 * @param {*} key
		 * @param {?} value
		 * @return {?}
		 */
		getSetValue: function (obj, key, value)
		{
			return (2 == arguments.length) ? obj[key] : (obj[key] = value);
		},

		/**
		 * @param {*} obj
		 * @param {*} value
		 * @return {boolean}
		 */
		hasValue: function (obj, value)
		{
			for (var key in obj)
			{
				if (obj[key] == value)
				{
					return true;
				}
			}

			return false;
		},

		/**
		 * @param {Object} target
		 * @param {...Object} var_args
		 */
		mixin: function (target, var_args)
		{
			var key, source;
			for (var i = 1; i < arguments.length; i++)
			{
				source = arguments[i];
				for (key in source)
				{
					target[key] = source[key];
				}

				// For IE the for-in-loop does not contain any properties that are not
				// enumerable on the prototype object (for example isPrototypeOf from
				// Object.prototype) and it will also not include 'replace' on objects that
				// extend String and change 'replace' (not that it is common for anyone to
				// extend anything except Object).

				for (var j = 0; j < PROTOTYPE_FIELDS.length; j++)
				{
					key = PROTOTYPE_FIELDS[j];
					if (_prototype.hasOwnProperty.call(source, key))
					{
						target[key] = source[key];
					}
				}
			}
		},

		/**
		 * @type {function(?):boolean}
		 */
		isUndefined: $isUndefined
	};

	/**
	 * @const
	 * @type {ObjectUtilsStatic}
	 */
	sc.core.ObjectUtils = new ObjectUtilsStatic();
})();





//******************************************** sc/html/IDOMModule



/**
 *
 * @interface
 * @param {sc.html.DOMElement} element
 */
sc.html.IDOMModule = function(element)
{
};

/**
 *
 * @interface
 */
sc.html.IDOMModuleClass = function()
{
	/**
	 * @type {boolean}
	 */
	this.isModule = true;
};

//******************************************** sc/html/IDOMElement


/**
 * @interface
 */
sc.html.IDOMElement = function ()
{
};

sc.html.IDOMElement.prototype =
{
	/**
	 * @type {(HTMLElement|Element)}
	 */
	element: null,

	/**
	 * @param {number|string} eventName
	 * @param {Function} handler
	 */
	on: function (eventName, handler)
	{
	},

	/**
	 * @param {?number|string=} width
	 * @param {?number|string=} height
	 */
	setSize: function (width, height)
	{
	}
};

(function ()
{
	var ArrayUtils = sc.collections.ArrayUtils;
	var DOM = sc.html.DOM;
	var MouseEvents = sc.events.MouseEvents;
	var ObjectUtils = sc.core.ObjectUtils;
	var PointerEvents = sc.events.PointerEvents;
	var TouchEvents = sc.events.TouchEvents;

	/**
	 * @private
	 * @param {sc.html.DOMElement} element
	 */
	function _setUpModules(element)
	{
		if (element.element)
		{
			ObjectUtils.forEachItem(element, /**
			 * @param {function(new:sc.html.IDOMModule, sc.html.DOMElement):void} module
			 * @param {?string=} key
			 */function (module, key)
			{
				if (module && (/** @type {sc.html.IDOMModuleClass} */(module)).isModule)
				{
					element[key] = new module(element);
				}
			});
		}
	}

	/**
	 * @constructor
	 * @implements {sc.html.IDOMElement}
	 * @param {(HTMLElement|Element)=} element
	 */
	sc.html.DOMElement = function (element)
	{
		/**
		 * @type {sc.html.DOMElement}
		 */
		var thi$ = this;

		/**
		 * @type {(HTMLElement|Element)}
		 */
		this.element = /** @type {(HTMLElement|Element)} */(element);

		_setUpModules(this);

		/**
		 *
		 * @type {number}
		 */
		this.scaleX = 1;

		/**
		 *
		 * @type {number}
		 */
		this.scaleY = 1;

		/* Event handling */
		{
			/**
			 * @private
			 * @type {Object}
			 */
			var _eventHandlers = {};

			/**
			 * @private
			 * @param {number|string} eventName
			 * @param {Function} handler
			 * @param {?boolean=} customEvent
			 */
			var _addEventHandler = function (eventName, handler, customEvent)
			{
				if (ObjectUtils.hasValue(MouseEvents, eventName) || ObjectUtils.hasValue(TouchEvents, eventName))
				{
					eventName = PointerEvents.getPointerEvent(eventName);
				}

				var handlers = _eventHandlers[eventName];
				var watched = !!handlers;
				!watched && (handlers = _eventHandlers[eventName] = []);

				!ArrayUtils.contain(handlers, handler) && ArrayUtils.push(handlers, handler);

				if (!customEvent && !watched)
				{
					var eventListener = _handleEvent.bind(0, eventName);

					if (element[DOM.ADD_EVENT_LISTENER])
					{
						element[DOM.ADD_EVENT_LISTENER](eventName, eventListener, false);
					}
					else
					{
						element["on" + eventName] = eventListener;
					}
				}
			};

			/**
			 * @private
			 * @param {number|string} eventName
			 * @param {Object} event
			 */
			var _handleEvent = function (eventName, event)
			{
				sc.collections.ArrayUtils.forEachItem(_eventHandlers[eventName] || [], function (handler)
				{
					handler(event);
				});
			};

			/**
			 * @param {number|string} eventName
			 * @param {Function} handler
			 */
			this.on = function (eventName, handler)
			{
				if (ObjectUtils.hasValue(PointerEvents, eventName))
				{
					_addPointerEventHandlers();
				}

				_addEventHandler(eventName, handler, true);
			};
		}

		/* Pointer handling */
		{
			/**
			 *
			 * @type {sc.events.PointerEvent}
			 * @private
			 */
			var _pointer = null;

			var _pointerStarted = false;
			var _dragStarted = false;

			/**
			 * @private
			 */
			var _addPointerEventHandlers = function ()
			{
				_addEventHandler(TouchEvents.ON_TOUCH_START, _handlePointerStart);
				_addEventHandler(TouchEvents.ON_TOUCH_MOVE, _handlePointerMove);
				_addEventHandler(TouchEvents.ON_TOUCH_END, _handlePointerEnd);
				_addEventHandler(TouchEvents.ON_TOUCH_CANCEL, _handlePointerEnd);
			};

			/**
			 * @private
			 * @param {Event} event
			 */
			var _handlePointerStart = function (event)
			{
				_pointerStarted = true;
				_pointer = PointerEvents.getPointerPosition(event, _pointer, thi$.scaleX, thi$.scaleY);

				var px = _pointer.x;
				var py = _pointer.y;

				_handleEvent(PointerEvents.ON_POINTER_START, _pointer);

				window[sc.Constants.SET_TIME_OUT](function ()
				{
					if (!_pointerStarted && (_pointer.x === px) && (_pointer.y === py))
					{
						_handleEvent(PointerEvents.ON_POINTER_CLICK, _pointer);
					}
				}, 200);
			};

			/**
			 * @private
			 * @param {Event} event
			 */
			var _handlePointerMove = function (event)
			{
				_pointer = PointerEvents.getPointerPosition(event, _pointer, 1, 1);

				if (_pointerStarted)
				{
					if (!_dragStarted)
					{
						_handleEvent(PointerEvents.ON_POINTER_DRAG_START, _pointer);
						_dragStarted = true;
					}

					_handleEvent(PointerEvents.ON_POINTER_DRAG_MOVE, _pointer);
				}
				else
				{
					_handleEvent(PointerEvents.ON_POINTER_MOVE, _pointer);
				}
			};

			/**
			 * @private
			 * @param {Event} event
			 */
			var _handlePointerEnd = function (event)
			{
				_pointerStarted = false;

				_handleEvent(PointerEvents.ON_POINTER_END, _pointer);

				if (_dragStarted)
				{
					_handleEvent(PointerEvents.ON_POINTER_DRAG_END, _pointer);
					_dragStarted = false;
				}
			};
		}

		/**
		 * @param {?number|string=} width
		 * @param {?number|string=} height
		 */
		this.setSize = function (width, height)
		{
			width && (element[sc.html.DOM.WIDTH] = width);
			height && (element[sc.html.DOM.HEIGHT] = height);
		};
	};

	DOM.addWrapper(DOM.TAG_NAME, sc.html.DOMElement);

	/**
	 * @param {string} tag
	 * @param {?(HTMLElement|sc.html.DOMElement)=} parent
	 * @return {sc.html.DOMElement}
	 */
	sc.html.DOMStatic.prototype.create = function (tag, parent)
	{
		return DOM.wrap(DOM._create(tag, parent));
	};
})();

//******************************************** sc/html/CSS





(function ()
{
	sc.Constants.GET_COMPUTED_STYLE = "getComputedStyle";

	/**
	 * @param {string|number} value
	 * @return {string}
	 * @private
	 */
	function _parseMeasurement(value)
	{
		if (isNaN(value) && value.indexOf('%') > -1)
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
	var CSSStatic = sc.core.Functions.createEmptyFunction();
	CSSStatic.prototype = {
		HEIGHT:     sc.Constants.HEIGHT,
		LEFT:       "left",
		POSITION:   "position",
		STYLE:      "style",
		TOP:        "top",
		WIDTH:      sc.Constants.WIDTH,
		VISIBILITY: "visibility",

		parseMeasurement: _parseMeasurement
	};

	/**
	 * @const
	 * @type {CSSStatic}
	 */
	var CSS = new CSSStatic();

	/**
	 * @const
	 * @type {CSSStatic}
	 */
	sc.html.CSS = CSS;

	/**
	 * @constructor
	 * @implements {sc.html.IDOMModule}
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
			_computed = window[sc.Constants.GET_COMPUTED_STYLE](element.element);
		}

		/**
		 * @private
		 * @param {string} key
		 * @param {?} value
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
		 * @type {function(string,?):*}
		 */
		this.styleValue = _styleValue;

		/**
		 *
		 * @param {string|number} x
		 * @param {?string|number=} y
		 * @param {?boolean=} fixed
		 */
		this.setPosition = function (x, y, fixed)
		{
			_styleValue(sc.html.CSS.POSITION, fixed ? "fixed" : "absolute");
			(undefined != x) && _styleValue(CSS.LEFT, _parseMeasurement(x));
			(undefined != y) && _styleValue(CSS.TOP, _parseMeasurement(y));
		};

		/**
		 *
		 * @param width
		 * @param height
		 */
		this.setSize = function (width, height)
		{
			(undefined != width) && _styleValue(CSS.WIDTH, _parseMeasurement(width));
			(undefined != height) && _styleValue(CSS.HEIGHT, _parseMeasurement(height));
		};
	};

	(/** @type {sc.html.IDOMModuleClass} */(sc.html.CSSModule)).isModule = true;

	/**
	 * @type {sc.html.CSSModule}
	 */
	sc.html.IDOMElement.prototype.css;

	/**
	 * @type {sc.html.CSSModule}
	 */
	sc.html.DOMElement.prototype.css = /** @type {sc.html.CSSModule} */(/** @type {Object} */(sc.html.CSSModule));

})();


(function ()
{
	/**
	 * @constructor
	 * @implements {sc.display.IStage}
	 * @extends {sc.html.DOMElement}
	 * @param {string|HTMLElement} element
	 * @param {?number=} width
	 * @param {?number=} height
	 */
	sc.display.DOMStage = function (element, width, height)
	{
		/**
		 * @private
		 * @type {number}
		 */
		var _height = height || 0;

		/**
		 * @lends {this}
		 */
		var _base = {};

		/**
		 * @private
		 * @type {number}
		 */
		var _width = width || 0;

		/**
		 * @protected
		 * @param {string|HTMLElement} element
		 * @return {HTMLElement}
		 */
		this._create_ = function (element)
		{
			delete this._create_;

			if (typeof element == sc.core.Types.STRING)
			{
				/**
				 * @type {string}
				 */
				var idOrTag = /** @type {string} */(element);
				element = sc.html.DOM._getById(idOrTag);
				if (!element)
				{
					element = sc.html.DOM._create("div", sc.html.DOM._query("[data-sc-app=" + idOrTag + "]"));
				}
			}

			return /** @type {HTMLElement} */(element);
		};

		/**
		 * @protected
		 * @param {HTMLElement} element
		 */
		this._inherit_ = function (element)
		{
			delete this._inherit_;

			sc.core.Functions.invoke(sc.html.DOMElement, this, element);

			for (var key in this)
			{
				_base[key] = sc.core.Functions.bindToObject(this[key], this);
			}
		};

		// Constructor
		{
			this._inherit_(this._create_(element));
			this.setSize(_width, _height);
		}

		{
			/**
			 * @type {number}
			 * @readonly
			 */
			this.width = _width;

			/**
			 * @type {number}
			 * @readonly
			 */
			this.height = _height;
		}

		/**
		 *
		 * @return {sc.display.IStage}
		 */
		this.fitToScreen = function ()
		{
			sc.system.Browser.getWindowSizeAsync(function (size)
			{
				this.element.style.display = "block";
				this.css.setSize(size[0], size[1]);
			});

			return this;
		};

		//this.construct(element, width, height);
	};

})();



//******************************************** sc/html/DOMCanvasElement





//******************************************** sc/html/IDOMCanvasElement

{
	/**
	 * @interface
	 * @extends {sc.html.IDOMElement}
	 * @static
	 * @global
	 */
	sc.html.IDOMCanvasElement = function ()
	{
	};

	sc.html.IDOMCanvasElement.prototype =
	{
		/**
		 * @param {number} x1
		 * @param {number} y1
		 * @param {number} x2
		 * @param {number} y2
		 * @param {number} radius
		 * @return {sc.html.IDOMCanvasElement}
		 */
		arcTo: function (x1, y1, x2, y2, radius)
		{
		},

		/**
		 * @return {sc.html.IDOMCanvasElement}
		 */
		beginPath: function ()
		{
		},

		/**
		 * @param {number} cp1x
		 * @param {number} cp1y
		 * @param {number} cp2x
		 * @param {number} cp2y
		 * @param {number} x
		 * @param {number} y
		 * @return {sc.html.IDOMCanvasElement}
		 */
		bezierCurveTo: function (cp1x, cp1y, cp2x, cp2y, x, y)
		{
		},

		/**
		 *
		 * @return {sc.html.IDOMCanvasElement}
		 */
		clear: function ()
		{
		},

		/**
		 * @param {number} x
		 * @param {number} y
		 * @param {number} w
		 * @param {number} h
		 * @return {sc.html.IDOMCanvasElement}
		 */
		clearRect: function (x, y, w, h)
		{
		},

		/**
		 *
		 * @return {sc.html.IDOMCanvasElement}
		 */
		clip: function ()
		{
		},

		/**
		 *
		 * @return {sc.html.IDOMCanvasElement}
		 */
		closePath: function ()
		{
		},

		/**
		 * @param {ImageData|number} imageData_or_sw
		 * @param {number=} sh
		 * @return {ImageData}
		 */
		createImageData: function (imageData_or_sw, sh)
		{
		},

		/**
		 * @param {number} x0
		 * @param {number} y0
		 * @param {number} x1
		 * @param {number} y1
		 * @return {CanvasGradient}
		 */
		createLinearGradient: function (x0, y0, x1, y1)
		{
		},

		/**
		 * @param {HTMLImageElement|HTMLCanvasElement|HTMLVideoElement} image
		 * @param {string} repetition
		 * @return {CanvasPattern}
		 */
		createPattern: function (image, repetition)
		{
		},

		/**
		 * @param {number} x0
		 * @param {number} y0
		 * @param {number} r0
		 * @param {number} x1
		 * @param {number} y1
		 * @param {number} r1
		 * @return {CanvasGradient}
		 */
		createRadialGradient: function (x0, y0, r0, x1, y1, r1)
		{
		},

		/**
		 * @param {Element} element
		 * @param {number} xCaret
		 * @param {number} yCaret
		 * @param {boolean} [canDrawCustom]
		 * @return {sc.html.IDOMCanvasElement}
		 */
		drawFocusRing: function (element, xCaret, yCaret, canDrawCustom)
		{
		},

		/**
		 * @param {Element} img_elem
		 * @param {number} dx_or_sx
		 * @param {number} dy_or_sy
		 * @param {number=} dw_or_sw
		 * @param {number=} dh_or_sh
		 * @param {number=} dx
		 * @param {number=} dy
		 * @param {number=} dw
		 * @param {number=} dh
		 * @return {sc.html.IDOMCanvasElement}
		 */
		drawImage: function (img_elem, dx_or_sx, dy_or_sy, dw_or_sw, dh_or_sh, dx, dy, dw, dh)
		{
		},

		/**
		 *
		 * @return {sc.html.IDOMCanvasElement}
		 */
		fill: function ()
		{
		},

		/**
		 * @param {number} x
		 * @param {number} y
		 * @param {number} w
		 * @param {number} h
		 * @return {sc.html.IDOMCanvasElement}
		 */
		fillRect: function (x, y, w, h)
		{
		},

		/**
		 * @param {?string|CanvasGradient|CanvasPattern=} style
		 * @return {string|CanvasGradient|CanvasPattern|sc.html.IDOMCanvasElement}
		 */
		fillStyle: function (style)
		{
		},

		/**
		 * @param {string} text
		 * @param {number} x
		 * @param {number} y
		 * @param {number=} maxWidth
		 * @return {sc.html.IDOMCanvasElement}
		 */
		fillText: function (text, x, y, maxWidth)
		{
		},

		/**
		 * @param {number} sx
		 * @param {number} sy
		 * @param {number} sw
		 * @param {number} sh
		 * @return {ImageData}
		 */
		getImageData: function (sx, sy, sw, sh)
		{
		},

		/**
		 * @param {number} x
		 * @param {number} y
		 * @return {boolean}
		 */
		isPointInPath: function (x, y)
		{
		},

		/**
		 * @param {?number=} value
		 * @return {(sc.html.IDOMCanvasElement|number)}
		 */
		lineCap: function (value)
		{
		},

		/**
		 * @param {?number=} value
		 * @return {(sc.html.IDOMCanvasElement|number)}
		 */
		lineJoin: function (value)
		{
		},

		/**
		 * @param {...number} coordination
		 * @return {sc.html.IDOMCanvasElement}
		 */
		lines: function (coordination)
		{
		},

		/**
		 * @param {number} x
		 * @param {number} y
		 * @return {sc.html.IDOMCanvasElement}
		 */
		lineTo: function (x, y)
		{
		},

		/**
		 * @param {?number=} value
		 * @return {(sc.html.IDOMCanvasElement|number)}
		 */
		lineWidth: function (value)
		{
		},

		/**
		 * @param {string} text
		 * @return {TextMetrics}
		 */
		measureText: function (text)
		{
		},

		/**
		 * @param {number} x
		 * @param {number} y
		 * @return {sc.html.IDOMCanvasElement}
		 */
		moveTo: function (x, y)
		{
		},

		/**
		 * @param {ImageData} image_data
		 * @param {number} dx
		 * @param {number} dy
		 * @param {number=} dirtyX
		 * @param {number=} dirtyY
		 * @param {number=} dirtyWidth
		 * @param {number=} dirtyHeight
		 * @return {sc.html.IDOMCanvasElement}
		 */
		putImageData: function (image_data, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight)
		{
		},

		/**
		 * @param {number} cpx
		 * @param {number} cpy
		 * @param {number} x
		 * @param {number} y
		 * @return {sc.html.IDOMCanvasElement}
		 */
		quadraticCurveTo: function (cpx, cpy, x, y)
		{
		},

		/**
		 *
		 * @return {sc.html.IDOMCanvasElement}
		 */
		restore: function ()
		{
		},

		/**
		 * @param {number} angle
		 * @return {sc.html.IDOMCanvasElement}
		 */
		rotate: function (angle)
		{
		},

		/**
		 *
		 * @return {sc.html.IDOMCanvasElement}
		 */
		save: function ()
		{
		},

		/**
		 * @param {number} x
		 * @param {number} y
		 * @return {sc.html.IDOMCanvasElement}
		 */
		scale: function (x, y)
		{
		},

		/**
		 *
		 * @return {sc.html.IDOMCanvasElement}
		 */
		stroke: function ()
		{
		},

		/**
		 * @param {number} x
		 * @param {number} y
		 * @param {number} w
		 * @param {number} h
		 * @return {sc.html.IDOMCanvasElement}
		 */
		strokeRect: function (x, y, w, h)
		{
		},

		/**
		 * @param {?string|CanvasGradient|CanvasPattern=} style
		 * @param {?number=} lineWidth
		 * @param {?number=} lineCap
		 * @param {?number=} lineJoin
		 * @param {?number=} miterLimit
		 * @return {string|CanvasGradient|CanvasPattern|sc.html.IDOMCanvasElement}
		 */
		strokeStyle: function (style, lineWidth, lineCap, lineJoin, miterLimit)
		{
		},

		/**
		 * @param {string} text
		 * @param {number} x
		 * @param {number} y
		 * @param {number=} maxWidth
		 * @return {sc.html.IDOMCanvasElement}
		 */
		strokeText: function (text, x, y, maxWidth)
		{
		},

		/**
		 * @param {number} m11
		 * @param {number} m12
		 * @param {number} m21
		 * @param {number} m22
		 * @param {number} dx
		 * @param {number} dy
		 * @return {sc.html.IDOMCanvasElement}
		 */
		transform: function (m11, m12, m21, m22, dx, dy)
		{
		},

		/**
		 * @param {number} x
		 * @param {number} y
		 * @return {sc.html.IDOMCanvasElement}
		 */
		translate: function (x, y)
		{
		},

		/**
		 * @param {number} m11
		 * @param {number} m12
		 * @param {number} m21
		 * @param {number} m22
		 * @param {number} dx
		 * @param {number} dy
		 * @return {sc.html.IDOMCanvasElement}
		 */
		setTransform: function (m11, m12, m21, m22, dx, dy)
		{
		}
	};
}

(function ()
{
	var DOM = sc.html.DOM;
	var Functions = sc.core.Functions;

	/**
	 * @constructor
	 */
	var Context2DOperations = Functions.createEmptyFunction();
	Context2DOperations.prototype =
	{
		_clearRect:     "clearRect",
		_lineCap:       "lineCap",
		_lineJoin:      "lineJoin",
		_lineWidth:     "lineWidth",
		_miterLimit:    "miterLimit",
		_shadowBlur:    "shadowBlur",
		_shadowOffsetX: "shadowOffsetX",
		_shadowOffsetY: "shadowOffsetY"
	};
	var context2DOperations = new Context2DOperations();

	/**
	 * @class
	 * @constructor
	 * @extends {sc.html.DOMElement}
	 * @implements {sc.html.IDOMCanvasElement}
	 * @param {?HTMLCanvasElement=} element
	 */
	sc.html.DOMCanvasElement = function (element)
	{
		var thi$ = this;

		sc.core.Functions.invoke(sc.html.DOMElement, this, element);

		var _context2D = element.getContext("2d");

		/**
		 * @param {string} method
		 * @param {?Array=} args
		 * @return {Function}
		 */
		function _bind2(method, args)
		{
			return function ()
			{
				var theArgs = arguments;
				_context2D[method].apply(_context2D, args ? theArgs : sc.collections.ArrayUtils.concat(args || [], sc.collections.ArrayUtils.slice(theArgs, 0)));
				return thi$;
			}
		}

		/**
		 * @param {string} method
		 * @param {?Array=} args
		 * @return {Function}
		 */
		function _bind(method, args)
		{
			return function ()
			{
				_context2D[method].apply(_context2D, arguments);
				return thi$;
			}
		}

		/**
		 * @param {string} key
		 * @param {?} value
		 * @return {?|sc.html.DOMCanvasElement}
		 * @private
		 */
		function _getSetValue(key, value)
		{
			if (arguments.length == 1)
			{
				return /** @type {boolean} */ (_context2D[key]);
			}

			_context2D[key] = value;

			return thi$;
		}

		this.arcTo = /** @type {Function} */(_bind("arcTo"));

		this.beginPath = /** @type {Function} */(_bind("beginPath"));

		this.bezierCurveTo = /** @type {Function} */(_bind("bezierCurveTo"));

		/**
		 * @return {sc.html.DOMCanvasElement}
		 */
		this.clear = function ()
		{
			_context2D[context2DOperations._clearRect](0, 0, element[sc.Constants.WIDTH], element[sc.Constants.HEIGHT]);
			return this;
		};

		this.clip = /** @type {Function} */(_bind("clip"));

		this.clearRect = /** @type {Function} */(_bind("clearRect"));

		this.closePath = /** @type {Function} */(_bind("closePath"));

		this.createImageData = /** @type {Function} */(_bind("createImageData"));

		this.createLinearGradient = /** @type {Function} */(_bind("createLinearGradient"));

		this.createPattern = /** @type {Function} */(_bind("createPattern"));

		this.createRadialGradient = /** @type {Function} */(_bind("createRadialGradient"));

		this.drawFocusRing = /** @type {Function} */(_bind("createRadialGradient"));

		this.drawImage = /** @type {Function} */(_bind("drawImage"));

		this.fill = /** @type {Function} */(_bind("fill"));

		this.fillRect = /** @type {Function} */(_bind("fillRect"));

		this.fillStyle = Functions.bindDefaultArguments(_getSetValue, ["fillStyle"]);

		this.fillText = /** @type {Function} */(_bind("fillText"));

		this.getImageData = /** @type {Function} */(_bind("getImageData"));

		this.isPointInPath = /** @type {Function} */(_bind("isPointInPath"));

		/**
		 * @private
		 * @type {*}
		 */
		var _lineTo = _bind("lineTo");

		this.lineCap = Functions.bindDefaultArguments(_getSetValue, [context2DOperations._lineCap]);

		this.lineJoin = Functions.bindDefaultArguments(_getSetValue, [context2DOperations._lineJoin]);

		/**
		 * @param {...number} coordination
		 * @return {sc.html.DOMCanvasElement}
		 */
		this.lines = function (coordination)
		{
			sc.collections.ArrayUtils.forEachBatch(arguments, /** @type {Function} */(_lineTo), 2);

			return this;
		};

		this.lineTo = /** @type {Function} */(_lineTo);

		this.lineWidth = Functions.bindDefaultArguments(_getSetValue, [context2DOperations._lineWidth]);

		this.measureText = /** @type {Function} */(_bind("measureText"));

		this.miterLimit = Functions.bindDefaultArguments(_getSetValue, [context2DOperations._miterLimit]);

		this.moveTo = /** @type {Function} */(_bind("moveTo"));

		this.putImageData = /** @type {Function} */(_bind("putImageData"));

		this.quadraticCurveTo = /** @type {Function} */(_bind("quadraticCurveTo"));

		this.restore = /** @type {Function} */(_bind("restore"));

		this.rotate = /** @type {Function} */(_bind("rotate"));

		this.save = /** @type {Function} */(_bind("save"));

		this.scale = /** @type {Function} */(_bind("scale"));

		this.stroke = /** @type {Function} */(_bind("stroke"));

		this.strokeRect = /** @type {Function} */(_bind("strokeRect"));

		/**
		 * @param {?(string|CanvasGradient|CanvasPattern)=} style
		 * @param {?number=} lineWidth
		 * @param {?number=} lineCap
		 * @param {?number=} lineJoin
		 * @param {?number=} miterLimit
		 * @return {(string|CanvasGradient|CanvasPattern|sc.html.DOMCanvasElement)}
		 */
		this.strokeStyle = function (style, lineWidth, lineCap, lineJoin, miterLimit)
		{
			/*(undefined !== lineWidth) && (this.lineWidth(lineWidth || 0));
			 (undefined !== lineCap) && (this.lineCap(lineCap || 0));
			 (undefined !== lineJoin) && (this.lineJoin(lineJoin || 0));
			 (undefined !== miterLimit) && (this.miterLimit(miterLimit || 0));*/
			(undefined !== lineWidth) && (_context2D[context2DOperations._lineWidth] = lineWidth || 0);
			(undefined !== lineCap) && (_context2D[context2DOperations._lineCap] = lineCap || 0);
			(undefined !== lineJoin) && (_context2D[context2DOperations._lineJoin] = lineJoin || 0);
			(undefined !== miterLimit) && (_context2D[context2DOperations._miterLimit] = miterLimit || 0);
			var key = "strokeStyle";
			if (0 == arguments.length)
			{
				return _context2D[key];
			}
			else
			{
				_context2D[key] = style;

				return this;
			}
		};

		this.strokeText = /** @type {Function} */(_bind("strokeText"));

		this.transform = /** @type {Function} */(_bind("transform"));

		this.translate = /** @type {Function} */(_bind("translate"));

		this.setTransform = /** @type {Function} */(_bind("setTransform"));
	};

	sc.html.DOMCanvasElement.prototype = new sc.html.DOMElement();

	DOM.addWrapper(DOM.TAG_CANVAS, sc.html.DOMCanvasElement);

	/**
	 * @param {?number=} width
	 * @param {?number=} height
	 * @param {?HTMLElement|sc.html.DOMElement=} parent
	 * @returns {sc.html.DOMCanvasElement}
	 */
	sc.html.DOMStatic.prototype.createCanvas = function (width, height, parent)
	{
		var canvas = sc.html.DOM.create(sc.html.DOM.TAG_CANVAS, parent);
		canvas.setSize(width, height);

		return /** @type {sc.html.DOMCanvasElement} */(canvas);
	};
})();


/**
 * @class
 * @constructor
 */
dxp.lego.Core = function ()
{
	var ArrayUtils = sc.collections.ArrayUtils;
	var Colors = sc.display.Colors;
	var Maths = sc.core.Maths;
	var PointerEvents = sc.events.PointerEvents;

	/**
	 * @type {sc.html.IDOMCanvasElement}
	 */
	var canvas = sc.html.DOM.createCanvas(800, 600, sc.html.DOM.query("[data-sc-app=Commander]"));
	var lines = [];

	canvas.on(PointerEvents.ON_POINTER_DRAG_START, /**
	 * @param {sc.events.PointerEvent} event
	 */function (event)
	{
		ArrayUtils.push(lines, {
			color:  Colors.toStyleString(Maths.round_(Maths.random_() * 255), Maths.round_(Maths.random_() * 255), Maths.round_(Maths.random_() * 255)),
			points: [event.getPosition()]});
	});

	canvas.on(PointerEvents.ON_POINTER_DRAG_MOVE, /**
	 * @param {sc.events.PointerEvent} event
	 */function (event)
	{
		ArrayUtils.push(ArrayUtils.last(lines).points, event.getPosition());

		canvas.clear();
		ArrayUtils.forEachItem(lines, function (line)
		{
			canvas.beginPath()
				.fillStyle(line.color);
			ArrayUtils.forEachItem(line.points, /**
			 * @param {sc.geom.Point} point
			 */function (point, index)
			{
				if (index == 0)
				{
					canvas.moveTo(point.x, point.y);
				}
				else
				{
					canvas.lineTo(point.x, point.y);
				}
			});
			canvas.closePath()
				.fill();
		});
	});

	canvas.on(PointerEvents.ON_POINTER_DRAG_END, /**
	 * @param {sc.events.PointerEvent} event
	 */function (event)
	{
	});

	/*this.stage = new sc.display.DOMStage("dxp_lego_lsc_mobile");
	 console.log(this.stage);*/

	/*this.stage = new sc.display.Stage("dxp_lego_lsc_mobile", 640, 372);
	 var stage = this.stage;

	 console.log(sc.events.TouchEvents.ON_TOUCH_START);*/

	/*stage.onTouchStart(function(){
	 console.log("ok");
	 });*/

	//console.log(this.stage.getHeight());
};

sc.core.application = new dxp.lego.Core();

})(console,Math,window,document);});