goog.require("sc.globals");
goog.require("sc.core.Utils");
goog.require("sc.display.DisplayObject");
goog.require("sc.display.IDisplayContainer");

goog.provide("sc.display.DisplayContainer");
goog.scope(function ()
{
	var core = sc.core;
	var display = sc.display;

	var ArrayUtils = core.ArrayUtils;
	var DisplayObject = display.DisplayObject;
	var FunctionUtils = core.FunctionUtils;

	/**
	 * @constructor
	 * @implements {sc.display.IDisplayContainer}
	 * @extends {sc.display.DisplayObject}
	 */
	sc.display.DisplayContainer = goog.defineClass(DisplayObject, {
		constructor: function ()
		{
			/**
			 * @private
			 *
			 * @type {Array<sc.display.IDisplayObject>}
			 */
			var _children = [];

			// Constructor
			{
				FunctionUtils.invoke(DisplayObject, this);
				//FunctionUtils.base(this);
			}

			/**
			 *
			 * @param {sc.display.IDisplayObject} child
			 *
			 * @return {sc.display.IDisplayObject}
			 */
			this.addDisplayObject = function (child)
			{
				if (!ArrayUtils.contain(_children, child))
				{
					ArrayUtils.push(_children, child);
					child.attachToDisplayObject(this);
				}

				return child || this;
			};

			/**
			 *
			 * @param {sc.display.IDisplayObject} child
			 * @param {number} index
			 *
			 * @return {sc.display.IDisplayObject}
			 */
			this.addDisplayObjectAt = function (child, index)
			{
				if (!ArrayUtils.contain(_children, child))
				{
					ArrayUtils.splice(_children, index, 0, child);
					child.attachToDisplayObject(this);
				}

				return child || this;
			};

			this._DisplayObject_update = this.update;

			/**
			 *
			 * @param {?Array<sc.display.IDisplayObject>=} updated
			 *
			 * @return {sc.display.IDisplayObject}
			 */
			this.update = function (updated)
			{
				updated = updated || [];

				this._DisplayObject_update(updated);

				ArrayUtils.forEachItem(_children, /**
				 * @param {sc.display.IDisplayObject} child
				 */function (child)
				{
					!ArrayUtils.contain(updated, child) && child.update(updated);
				});

				return this;
			};
		}
	});
});