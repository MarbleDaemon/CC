goog.require("sc.globals");

goog.provide("sc.core.IBaseObject");
goog.scope(function ()
{
	/**
	 * @interface
	 */
	sc.core.IBaseObject = function()
	{
	};

	/**
	 * @type {function(...[?]):void}
	 */
	sc.core.IBaseObject.prototype.superClass_;
});