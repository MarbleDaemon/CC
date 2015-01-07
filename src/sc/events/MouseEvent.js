// import sc/core/Functions
goog.require("sc.core.Utils");

goog.provide("sc.events.MouseEvent");
goog.provide("sc.events.MouseEvents");
goog.scope(function ()
{
	var MouseEvents = sc.events.MouseEvents;

	/**
	 * @const
	 */
	MouseEvents.ON_MOUSE_DOWN = "mousedown";
	/**
	 * @const
	 */
	MouseEvents.ON_MOUSE_MOVE = "mousemove";
	/**
	 * @const
	 */
	MouseEvents.ON_MOUSE_UP = "mouseup";
});