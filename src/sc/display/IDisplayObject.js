goog.require("sc.globals");
goog.require("sc.core.IBaseObject");

goog.provide("sc.display.IDisplayObject");
goog.provide("sc.display.UpdateDirections");
goog.scope(function ()
{
	var globals = sc.globals;

	/**
	 * @interface
	 * @extends {sc.core.IBaseObject}
	 */
	sc.display.IDisplayObject = function ()
	{
	};

	sc.display.IDisplayObject.prototype =
	{
		/**
		 *
		 * @param {sc.display.IDisplayContainer} parent
		 * @param {?boolean=} doAdding
		 *
		 * @return {sc.display.IDisplayObject}
		 */
		attachToDisplayObject: function (parent, doAdding)
		{
		},

		/**
		 *
		 * @return {number}
		 */
		getId: function ()
		{
		},

		/**
		 *
		 * @return {sc.display.IDisplayObject}
		 */
		getParent: function ()
		{
		},

		/**
		 *
		 * @return {sc.display.IDisplayObject}
		 */
		invalidate: function()
		{
		},

		/**
		 *
		 * @return {boolean}
		 */
		isValid: function()
		{
		},

		/**
		 *
		 * @param {?Array<sc.display.IDisplayObject>=} updated
		 *
		 * @return {sc.display.IDisplayObject}
		 */
		update: function (updated)
		{
		},

		/**
		 *
		 * @return {sc.display.IDisplayObject}
		 */
		validate: function()
		{
		}
	};
});