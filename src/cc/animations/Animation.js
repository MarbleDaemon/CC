{
	goog.require("sc.collections.IDictionary");

	goog.require("sc.core.Maths");
	goog.require("sc.core.Types");
}
goog.provide("cc.animations.Animation");
goog.scope(function ()
{
	var core = sc.core;

	var Maths = core.Maths;
	var TypeCheck = core.TypeCheck;

	/**
	 * @constructor
	 */
	cc.animations.Animation = goog.defineClass(null, {
		/**
		 *
		 * @param {sc.collections.IDictionary.<number,cc.animations.Animation>} parent
		 */
		constructor: function (parent)
		{
			/**
			 * @type {sc.collections.IDictionary.<number,cc.animations.Animation>}
			 */
			this.done = parent;
		},

		/**
		 * @private
		 * @type {boolean}
		 */
		_counterClockWise: false,
		/**
		 * @private
		 * @type {number}
		 */
		_directions:       1,
		/**
		 * @private
		 * @type {number}
		 */
		_numberOfFrames:   1,
		/**
		 * @private
		 * @type {number}
		 */
		_onEnd:            -1,
		/**
		 * @private
		 * @type {number}
		 */
		_startFrame:       0,

		/**
		 *
		 * @param {boolean=} value
		 *
		 * @return {(boolean|cc.animations.Animation)}
		 */
		counterClockWise: function (value)
		{
			if (TypeCheck.isUndefined(value))
			{
				return this._counterClockWise;
			}
			else
			{
				this._counterClockWise = /** @type {boolean} */(value);

				return this;
			}
		},

		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(number|cc.animations.Animation)}
		 */
		directions: function (value)
		{
			if (TypeCheck.isUndefined(value))
			{
				return this._directions;
			}
			else
			{
				this._directions = /** @type {number} */(value);

				return this;
			}
		},

		/**
		 *
		 * @param {number} angle
		 *
		 * @return {number}
		 */
		getAngleFrame: function (angle)
		{
			if (this._counterClockWise)
			{
				angle = 360 - angle;
			}

			var direction = Maths.round(angle / (360 / this._directions));
			(direction > this._directions - 1) && (direction = 0);

			return direction * this._numberOfFrames;
		},

		/**
		 *
		 * @param {number} angle
		 * @param {number} animFrame
		 *
		 * @return {number}
		 */
		getFrame: function (angle, animFrame)
		{
			return this._startFrame + this.getAngleFrame(angle) + animFrame;
		},

		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(number|cc.animations.Animation)}
		 */
		numberOfFrames: function (value)
		{
			if (TypeCheck.isUndefined(value))
			{
				return this._numberOfFrames;
			}
			else
			{
				this._numberOfFrames = /** @type {number} */(value);

				return this;
			}
		},

		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(number|cc.animations.Animation)}
		 */
		onEnd: function (value)
		{
			if (TypeCheck.isUndefined(value))
			{
				return this._onEnd;
			}
			else
			{
				this._onEnd = /** @type {number} */(value);

				return this;
			}
		},

		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(number|cc.animations.Animation)}
		 */
		startFrame: function (value)
		{
			if (TypeCheck.isUndefined(value))
			{
				return this._startFrame;
			}
			else
			{
				this._startFrame = /** @type {number} */(value);

				return this;
			}
		}
	});
});