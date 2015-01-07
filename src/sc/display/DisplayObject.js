goog.require("sc.globals");
goog.require("sc.core.Utils");
goog.require("sc.display.IDisplayObject");

goog.provide("sc.display.DisplayObject");
goog.scope(function ()
{
	var globals = sc.globals;

	var ArrayUtils = sc.core.ArrayUtils;

	/**
	 * @constructor
	 * @implements {sc.display.IDisplayObject}
	 */
	sc.display.DisplayObject = goog.defineClass(null,
		{
			constructor: function ()
			{
				/**
				 * @private
				 *
				 * @type {number}
				 */
				var _id = globals.UID++;

				/**
				 * @private
				 *
				 * @type {boolean}
				 */
				var _isValid = true;

				/**
				 * @private
				 *
				 * @type {sc.display.IDisplayObject}
				 */
				var _parent;

				/**
				 *
				 * @param {sc.display.IDisplayContainer} parent
				 * @param {?boolean=} doAdding
				 *
				 * @return {sc.display.IDisplayObject}
				 */
				this.attachToDisplayObject = function (parent, doAdding)
				{
					if (doAdding)
					{
						parent.addDisplayObject(this);
					}
					else
					{
						_parent = parent;
					}

					return this;
				};

				/**
				 *
				 * @return {number}
				 */
				this.getId = function ()
				{
					return _id;
				};

				/**
				 *
				 * @return {sc.display.IDisplayObject}
				 */
				this.getParent = function ()
				{
					return _parent;
				};

				/**
				 *
				 * @return {sc.display.IDisplayObject}
				 */
				this.invalidate = function ()
				{
					_isValid = false;

					return this;
				};

				/**
				 *
				 * @return {boolean}
				 */
				this.isValid = function ()
				{
					return _isValid;
				};

				/**
				 *
				 * @param {?Array<sc.display.IDisplayObject>=} updated
				 *
				 * @return {sc.display.IDisplayObject}
				 */
				this.update = function (updated)
				{
					updated = updated || [];

					ArrayUtils.push(updated, this);

					_parent && !ArrayUtils.contain(updated, _parent) && _parent.update(updated);

					return this;
				};

				/**
				 *
				 * @return {sc.display.IDisplayObject}
				 */
				this.validate = function ()
				{
					_isValid = true;

					return this;
				};
			}
		});

	/**
	 * @type {function(...[?]):void}
	 */
	sc.display.DisplayObject.prototype.superClass_;
});