goog.require("sc.display.IDisplayContainer");
goog.require("sc.geom.IPoint");

goog.provide("sc.html.IDOMElement");
goog.scope(function ()
{
	/**
	 * @interface
	 * @extends {sc.display.IDisplayContainer}
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
		 *
		 * @param {sc.html.IDOMElement} child
		 * @param {?boolean=} virtual
		 *
		 * @return {sc.html.IDOMElement}
		 */
		addElement: function (child, virtual)
		{
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
		},

		/**
		 *
		 * @param {number|string} eventName
		 * @param {Function} handler
		 * @param {?boolean=} useCapture
		 *
		 * @return {sc.html.IDOMElement}
		 */
		on: function (eventName, handler, useCapture)
		{
		},

		/**
		 *
		 * @param eventName
		 * @param isPrevented
		 *
		 * @return {sc.html.IDOMElement|boolean}
		 */
		preventDefaultHandler: function (eventName, isPrevented)
		{
		},

		/**
		 *
		 * @param {string} query
		 *
		 * @return {sc.html.IDOMElement}
		 */
		query: function (query)
		{
		},

		/**
		 *
		 * @param {?number|string=} width
		 * @param {?number|string=} height
		 *
		 * @return {(sc.geom.IPoint|sc.html.IDOMElement)}
		 */
		size: function (width, height)
		{
		}
	};
});
