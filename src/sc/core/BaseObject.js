goog.require("sc.globals");

goog.provide("sc.core.BaseObject");
goog.scope(function ()
{
	/**
	 * @constructor
	 */
	sc.core.BaseObject = goog.defineClass(null, {
		constructor: new sc.globals.Function
	});

	/**
	 * @type {function(...[?]):void}
	 */
	sc.core.BaseObject.prototype.superClass_;
});