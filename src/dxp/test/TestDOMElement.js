goog.require("sc.html.CSS");
goog.require("sc.html.DOM");
goog.require("sc.html.DOMElement");
goog.require("sc.events.PointerEvent");

goog.provide("dxp.test.TestDOMElement");
goog.scope(function ()
{
	var DOM = sc.html.DOM;
	var DOMElement = sc.html.DOMElement;
	var PointerEvents = sc.events.PointerEvents;

	/**
	 *
	 * @constructor
	 *
	 * @param {string} idOrTag
	 */
	dxp.test.TestDOMElement = function (idOrTag)
	{
		var element = new DOMElement(DOM._query("[data-sc-app=" + idOrTag + "]"));
		element.css.size(800, 600);
		element.on(PointerEvents.CLICK, function(event)
		{
			console.log(event);
		});
	};
});
