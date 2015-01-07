goog.require("sc.constants");
goog.require("sc.globals");
goog.require("sc.core.Utils");
goog.require("sc.core.ObjectUtils");
goog.require("sc.display.DisplayContainer");
goog.require("sc.events.MouseEvent");
goog.require("sc.events.PointerEvent");
goog.require("sc.events.TouchEvent");
goog.require("sc.geom.Point");
goog.require("sc.html.DOM");
goog.require("sc.html.IDOMModule");
goog.require("sc.html.IDOMElement");

goog.provide("sc.html.DOMElement");
goog.scope(function ()
{
	var constants = sc.constants;
	var core = sc.core;
	var display = sc.display;
	var globals = sc.globals;

	var ArrayUtils = core.ArrayUtils;
	var DisplayContainer = display.DisplayContainer;
	var FunctionUtils = core.FunctionUtils;
	var DOM = sc.html.DOM;
	var MouseEvents = sc.events.MouseEvents;
	var ObjectUtils = sc.core.ObjectUtils;
	var Point = sc.geom.Point;
	var PointerEvents = sc.events.PointerEvents;
	var TouchEvents = sc.events.TouchEvents;

	/**
	 * @private
	 * @param {sc.html.DOMElement} element
	 */
	function _setUpModules(element)
	{
		var theElement = /** @type {Object} */(element);

		if (element.element)
		{
			ObjectUtils.forEachItem(element, /**
			 * @param {function(new:sc.html.IDOMModule, sc.html.DOMElement):void} module
			 * @param {?string=} key
			 */function (module, key)
			{
				if (module && module[sc.html.isModule])
				{
					theElement[key] = new module(element);
				}
			});
		}
	}

	/**
	 * @constructor
	 * @implements {sc.html.IDOMElement}
	 * @extends {sc.display.DisplayContainer}
	 * @unrestricted
	 *
	 * @param {(HTMLElement|Element)=} element
	 */
	sc.html.DOMElement = goog.defineClass(DisplayContainer, {
			constructor: function (element)
			{
				// Constructor
				{
					FunctionUtils.invoke(DisplayContainer, this);
					//FunctionUtils.base(this);

					element && (element.id = "sc.dom." + this.getId());
				}

				/**
				 * @type {sc.html.DOMElement}
				 */
				var thi$ = this;

				/**
				 * @type {Element}
				 */
				this.element = /** @type {Element} */(element);

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
					 * @type {Object<*,boolean>}
					 */
					var _defaultHandlerPrevented = {};
					/**
					 * @private
					 * @type {Object<Array<Function>>}
					 */
					var _eventHandlers = {};

					/**
					 * @private
					 * @param {number|string} eventName
					 * @param {?Function=} handler
					 * @param {?boolean=} useCapture
					 * @param {?boolean=} customEvent
					 */
					var _addEventHandler = function (eventName, handler, useCapture, customEvent)
					{
						if (ObjectUtils.hasValue(MouseEvents, eventName) || ObjectUtils.hasValue(TouchEvents, eventName))
						{
							eventName = PointerEvents.getPointerEvent(eventName);
						}

						var handlers = _eventHandlers[eventName];
						var watched = !!handlers;
						!watched && (handlers = _eventHandlers[eventName] = []);

						handler && !ArrayUtils.contain(handlers, handler) && ArrayUtils.push(handlers, handler);

						if (!customEvent && !watched)
						{
							var eventListener = _handleEvent.bind(0, eventName);

							if (element[DOM.ADD_EVENT_LISTENER])
							{
								element[DOM.ADD_EVENT_LISTENER](eventName, eventListener, useCapture);
							}
							else
							{
								element["on" + eventName] = eventListener;
							}
						}

						return eventName;
					};

					/**
					 * @private
					 *
					 * @param {number|string} eventName
					 * @param {Event|Object} event
					 *
					 * return {boolean}
					 */
					var _handleEvent = function (eventName, event)
					{
						ArrayUtils.forEachItem(_eventHandlers[eventName] || [], function (handler)
						{
							FunctionUtils.invoke(handler, thi$, event);
						});

						return !_preventDefault(eventName, event);
					};

					var _preventDefault = function (eventName, event)
					{
						if (_defaultHandlerPrevented[eventName] && event.preventDefault)
						{
							event.preventDefault();
						}

						return _defaultHandlerPrevented[eventName];
					};

					/**
					 *
					 * @param {number|string} eventName
					 * @param {Function} handler
					 * @param {?boolean=} useCapture
					 *
					 * @return {sc.html.IDOMElement}
					 */
					this.on = function (eventName, handler, useCapture)
					{
						if (ObjectUtils.hasValue(PointerEvents, eventName))
						{
							_addPointerEventHandlers();
						}

						_addEventHandler(eventName, handler, useCapture, true);

						return this;
					};

					/**
					 *
					 * @param eventName
					 * @param isPrevented
					 *
					 * @return {sc.html.IDOMElement|boolean}
					 */
					this.preventDefaultHandler = function (eventName, isPrevented)
					{
						if (arguments[constants.LENGTH] > 1)
						{
							if (isPrevented)
							{
								eventName = _addEventHandler(eventName);
							}

							_defaultHandlerPrevented[eventName] = isPrevented;
							return this;
						}
						else
						{
							return _defaultHandlerPrevented[eventName];
						}
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
						_pointer.button = PointerEvents.getPointerButton(event, _pointer);

						var px = _pointer.x;
						var py = _pointer.y;

						_handleEvent(PointerEvents.START, _pointer);

						globals.window[constants.SET_TIME_OUT](function ()
						{
							if (!_pointerStarted && (_pointer.x === px) && (_pointer.y === py))
							{
								_handleEvent(PointerEvents.CLICK, _pointer);
							}
						}, 200);

						return !_preventDefault(PointerEvents.START, event);
					};

					/**
					 * @private
					 * @param {Event} event
					 */
					var _handlePointerMove = function (event)
					{
						var result = false;
						_pointer = PointerEvents.getPointerPosition(event, _pointer, thi$.scaleX, thi$.scaleY);

						if (_pointerStarted)
						{
							if (!_dragStarted)
							{
								_handleEvent(PointerEvents.ON_POINTER_DRAG_START, _pointer);
								result = _preventDefault(PointerEvents.ON_POINTER_DRAG_START, event);

								_dragStarted = true;
							}

							_handleEvent(PointerEvents.DRAG_MOVE, _pointer);
							result |= _preventDefault(PointerEvents.DRAG_MOVE, event);
						}
						else
						{
							_handleEvent(PointerEvents.MOVE, _pointer);
							result |= _preventDefault(PointerEvents.MOVE, event);
						}

						return !result;
					};

					/**
					 * @private
					 * @param {Event} event
					 */
					var _handlePointerEnd = function (event)
					{
						_pointerStarted = false;

						_handleEvent(PointerEvents.END, _pointer);
						var result = _preventDefault(PointerEvents.END, event);

						if (_dragStarted)
						{
							_handleEvent(PointerEvents.ON_POINTER_DRAG_END, _pointer);
							result |= _preventDefault(PointerEvents.ON_POINTER_DRAG_END, event);
							_dragStarted = false;
						}

						PointerEvents.getPointerButton(event, _pointer, true);

						return !result;
					};
				}
			},

			/**
			 *
			 * @param {sc.html.IDOMElement} child
			 * @param {?boolean=} virtual
			 *
			 * @return {sc.html.IDOMElement}
			 */
			addElement: function (child, virtual)
			{
				if (!virtual)
				{
					this.element.appendChild(child.element);
				}

				return /** @type {sc.html.IDOMElement} */(this.addDisplayObject(child)) || this;
			},

			/**
			 *
			 * @param {sc.html.IDOMElement} child
			 * @param {number} index
			 * @param {?boolean=} virtual
			 *
			 * @return {sc.html.IDOMElement}
			 */
			addElementAt: function (child, index, virtual)
			{
				if (!virtual)
				{
					var element = this.element;
					element.insertBefore(child.element, ArrayUtils.getItemAt(element.children, index));
				}

				return /** @type {sc.html.IDOMElement} */(this.addDisplayObjectAt(child, index)) || this;
			},

			/**
			 *
			 * @param {string} tagName
			 * @param {?boolean=} virtual
			 *
			 * @return {sc.html.IDOMElement}
			 */
			createElement: function (tagName, virtual)
			{
				var child = DOM.wrap(DOM._create(tagName, /** @type {(HTMLElement|sc.html.IDOMElement)} */(virtual ? undefined : this.element)));

				return /** @type {sc.html.IDOMElement} */(this.addDisplayObject(child)) || this;
			},

			/**
			 *
			 * @param {string} query
			 *
			 * @return {sc.html.IDOMElement}
			 */
			query: function (query)
			{
				return DOM.query(query, this);
			},

			/**
			 *
			 * @param {?number|string=} width
			 * @param {?number|string=} height
			 *
			 * @return {(sc.geom.Point|sc.html.IDOMElement)}
			 */
			size: function (width, height)
			{
				var element = this.element;

				if (arguments[constants.LENGTH] > 0)
				{
					width && (element[sc.html.DOM.WIDTH] = parseInt(width, 10));
					height && (element[sc.html.DOM.HEIGHT] = parseInt(height, 10));

					return this;
				}
				else
				{
					return new Point(element[sc.html.DOM.WIDTH], element[sc.html.DOM.HEIGHT]);
				}
			}
		}
	);

	DOM.addWrapper(DOM.TAG_NAME, sc.html.DOMElement);

	/**
	 * @param {string} tag
	 * @param {?(HTMLElement|sc.html.IDOMElement)=} parent
	 * @return {sc.html.IDOMElement}
	 */
	DOM.createSheet = function (tag, parent)
	{
		return DOM.wrap(DOM._create(tag, parent));
	};
});
