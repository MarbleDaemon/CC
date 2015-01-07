goog.require("sc.core.Utils");

goog.provide("sc.events.TouchEvent");
goog.provide("sc.events.TouchEvents");
goog.scope(function ()
{
	var TouchEvents = sc.events.TouchEvents;
	TouchEvents.ON_TOUCH_CANCEL = "touchcancel";
	TouchEvents.ON_TOUCH_END = "touchend";
	TouchEvents.ON_TOUCH_MOVE = "touchmove";
	TouchEvents.ON_TOUCH_START = "touchstart";
});

