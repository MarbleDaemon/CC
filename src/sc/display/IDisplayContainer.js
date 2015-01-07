goog.require("sc.display.IDisplayObject");

goog.provide("sc.display.IDisplayContainer");
goog.scope(function ()
{
	/**
	 * @interface
	 * @extends {sc.display.IDisplayObject}
	 */
	sc.display.IDisplayContainer = function()
	{
	};

	sc.display.IDisplayContainer.prototype =
	{
		/**
		 *
		 * @param {sc.display.IDisplayObject} child
		 *
		 * @return {sc.display.IDisplayObject}
		 */
		addDisplayObject: function (child)
		{
		},

		/**
		 *
		 * @param {sc.display.IDisplayObject} child
		 * @param {number} index
		 *
		 * @return {sc.display.IDisplayObject}
		 */
		addDisplayObjectAt: function (child, index)
		{
		}
	};
});