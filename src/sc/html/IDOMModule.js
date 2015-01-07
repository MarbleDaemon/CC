goog.require("sc.globals");

goog.provide("sc.html.IDOMModule");
goog.scope(function ()
{
	sc.html.isModule = sc.globals.UID++;

	/**
	 *
	 * @interface
	 */
	sc.html.IDOMModule = function ()
	{
	};
});
