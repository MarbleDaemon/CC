goog.require("sc.globals");
goog.require("sc.events.MouseEvent");
goog.require("sc.events.TouchEvent");
goog.require("sc.geom.Point");
goog.require("sc.system.Browser");

goog.provide("sc.events.PointerEvent");
goog.provide("sc.events.PointerEvents");
goog.scope(function ()
{
	var events = sc.events;
	var Browser = sc.system.Browser;
	var globals = sc.globals;
	var MouseEvents = events.MouseEvents;
	var Point = sc.geom.Point;
	var TouchEvents = events.TouchEvents;

	(function ()
	{
	})();

	/**
	 * @constructor
	 */
	sc.events.PointerEventsStatic = sc.core.FunctionUtils.createEmptyFunction();
	sc.events.PointerEventsStatic.prototype =
	{
		/**
		 * @const
		 */
		CLICK:      ++globals.UID,
		/**
		 * @const
		 */
		END:        ++globals.UID,
		/**
		 * @const
		 */
		MOVE:       ++globals.UID,
		/**
		 * @const
		 */
		START:      ++globals.UID,
		/**
		 * @const
		 */
		ON_POINTER_DRAG_END:   ++globals.UID,
		/**
		 * @const
		 */
		DRAG_MOVE:  ++globals.UID,
		/**
		 * @const
		 */
		ON_POINTER_DRAG_START: ++globals.UID,

		LEFT_BUTTON:   ++globals.UID,
		MIDDLE_BUTTON: ++globals.UID,
		RIGHT_BUTTON:  ++globals.UID,

		/**
		 *
		 * @param {number|string} eventName
		 *
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
		 * @param {Event} event
		 * @param {sc.events.PointerEvent} pointer
		 * @param {?boolean=} negate
		 *
		 * @return {number}
		 */
		getPointerButton: function (event, pointer, negate)
		{
			var result = sc.events.PointerEvents.LEFT_BUTTON;
			var whichButton;
			var button = "button";
			var which = "which";
			if (which in event)
			{
				whichButton = event[which];
				if (2 == whichButton)
				{
					result = sc.events.PointerEvents.MIDDLE_BUTTON;
				}
				else if (3 == whichButton)
				{
					result = sc.events.PointerEvents.RIGHT_BUTTON;
				}
			}
			else if (button in event)
			{
				whichButton = event[button];
				if (2 == whichButton)
				{
					result = sc.events.PointerEvents.RIGHT_BUTTON;
				}
				else if (3 == whichButton)
				{
					result = sc.events.PointerEvents.MIDDLE_BUTTON;
				}
			}

			pointer.buttons[result] = !negate;

			return result;
		},

		/**
		 *
		 * @param {Event} event
		 * @param {?sc.events.PointerEvent=} lastPointer
		 * @param {?number=} scaleX
		 * @param {?number=} scaleY
		 *
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
			var pointerEvent = lastPointer || new events.PointerEvent(event, 0, 0);
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
	 * @type {sc.events.PointerEventsStatic}
	 */
	sc.events.PointerEvents = new events.PointerEventsStatic();

	/**
	 * @constructor
	 * @param {?number=} x
	 * @param {?number=} y
	 */
	sc.events.PointerEvent = function (sourceEvent, x, y)
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

		/**
		 *
		 * @type {number}
		 */
		this.button = 0;

		/**
		 *
		 * @type {Object<number,boolean>}
		 */
		this.buttons = {};

		/**
		 *
		 * @type {Event}
		 */
		this.sourceEvent = sourceEvent;

		/**
		 *
		 * @return {sc.geom.Point}
		 */
		this.getDistance = function ()
		{
			return new Point(this.dx, this.dy);
		};

		/**
		 *
		 * @return {sc.geom.Point}
		 */
		this.getPosition = function ()
		{
			return new Point(this.x, this.y);
		};
	};
});
