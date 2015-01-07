goog.require("sc.html.IDOMElement");
goog.require("sc.html.modules.IRenderingContext2D");

goog.provide("sc.html.IDOMCanvasElement");
goog.scope(function ()
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

	/**
	 * @type {sc.html.modules.IRenderingContext2D}
	 */
	sc.html.IDOMCanvasElement.prototype.context2D;
});
