{
	goog.require("sc.core.Maths");
	goog.require("sc.core.Types");
	goog.require("sc.core.Utils");
	goog.require("sc.geom.Point");
	goog.require("sc.imaging.Sprite");
	goog.require("sc.html.modules.IRenderingContext2D");

	goog.require("cc.animations.Animations");
	goog.require("cc.entities.IEntity");
	goog.require("cc.geom.Map");

	goog.require("cc.states.IStateMachine");
}
goog.provide("cc.entities.Entity");
goog.scope(function ()
{
	var core = sc.core;

	var ArrayUtils = core.ArrayUtils;
	var Map = cc.geom.Map;
	var Maths = core.Maths;
	var Point = sc.geom.Point;
	var TypeCheck = core.TypeCheck;

	/**
	 * @constructor
	 * @implements {cc.entities.IEntity}
	 */
	cc.entities.Entity = goog.defineClass(null, {
		/**
		 * @return {cc.entities.Entity}
		 */
		constructor: function ()
		{
			/**
			 * @private
			 * @type {number}
			 */
			this._accelerator = 0;
			/**
			 * @private
			 * @type {cc.animations.Animations}
			 */
			this._animations = null;
			/**
			 * @private
			 * @type {Array.<cc.entities.IEntity>}
			 */
			this._attachments = [];
			/**
			 * @private
			 * @type {sc.geom.Point}
			 */
			this._center = new Point(0, 0);
			/**
			 * @private
			 * @type {number}
			 */
			this._decelerator = 0;
			/**
			 * @private
			 * @type {number}
			 */
			this._maximumSteeringVelocity = 0;
			/**
			 * @private
			 * @type {number}
			 */
			this._maximumVelocity = 0;
			/**
			 * @private
			 * @type {number}
			 */
			this._minimumSteeringVelocity = 0;
			/**
			 * @private
			 * @type {number}
			 */
			this._orientation = 0;
			/**
			 * @private
			 * @type {sc.geom.Point}
			 */
			this._position = new Point(0, 0);
			/**
			 * @private
			 * @type {number}
			 */
			this._scale = 0;
			/**
			 * @private
			 * @type {Array.<sc.imaging.Sprite>}
			 */
			this._sprites = null;
			/**
			 * @private
			 * @type {cc.states.IStateMachine}
			 */
			this._stateMachine = null;
			/**
			 * @private
			 * @type {number}
			 */
			this._steering = 0;
			/**
			 * @private
			 * @type {boolean}
			 */
			this._valid = false;
			/**
			 * @private
			 * @type {number}
			 */
			this._velocity = 0;

			return this;
		},

		/**
		 *
		 * @return {cc.entities.IEntity}
		 */
		thi$: function ()
		{
			return this;
		},

		/**
		 *
		 * @param {cc.entities.IEntity} attachment
		 *
		 * @return {cc.entities.IEntity}
		 */
		attach: function (attachment)
		{
			ArrayUtils.push(this._attachments, attachment);

			return this;
		},


		/**
		 *
		 * @return {cc.entities.IEntity}
		 */
		invalidate: function ()
		{
			this._valid = false;

			return this;
		},

		/**
		 *
		 * @param {sc.html.modules.IRenderingContext2D} output
		 *
		 * @return {cc.entities.IEntity}
		 */
		render: function (output)
		{
			if (!this._valid)
			{
				var position = Map.realToDisplay(/** @type {sc.geom.IPoint} */(this.getPosition()));
				this.sprites()[0].renderTo(output, position.x, position.y);

				this._valid = true;
			}

			return this;
		},

		/**
		 *
		 * @return {cc.entities.IEntity}
		 */
		validate: function ()
		{
			this._valid = true;

			return this;
		},

		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(number|cc.entities.IEntity)}
		 */
		accelerator: function (value)
		{
			if (TypeCheck.isUndefined(value))
			{
				return this._accelerator;
			}
			else
			{
				this._accelerator = /** @type {number} */(value);

				return this;
			}
		},

		/**
		 *
		 * @param {cc.animations.Animations=} value
		 *
		 * @return {(cc.animations.Animations|cc.entities.IEntity)}
		 */
		animations: function (value)
		{
			if (TypeCheck.isUndefined(value))
			{
				return this._animations;
			}
			else
			{
				this._animations = /** @type {cc.animations.Animations} */(value);

				return this;
			}
		},

		/**
		 *
		 * @param {number=} x
		 * @param {number=} y
		 *
		 * @return {(sc.geom.Point|cc.entities.IEntity)}
		 */
		center: function (x, y)
		{
			if (TypeCheck.isUndefined(x) && TypeCheck.isUndefined(y))
			{
				return this._center;
			}
			else
			{
				this._center.x = /** @type {number} */(x);
				this._center.y = /** @type {number} */(y);

				return this;
			}
		},

		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(number|cc.entities.IEntity)}
		 */
		decelerator: function (value)
		{
			if (TypeCheck.isUndefined(value))
			{
				return this._decelerator;
			}
			else
			{
				this._decelerator = /** @type {number} */(value);

				return this;
			}
		},

		/**
		 *
		 * @return {boolean}
		 */
		isValid: function ()
		{
			return this._valid;
		},

		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(number|cc.entities.IEntity)}
		 */
		maximumSteeringVelocity: function (value)
		{
			if (TypeCheck.isUndefined(value))
			{
				return this._maximumSteeringVelocity;
			}
			else
			{
				this._maximumSteeringVelocity = Maths.positiveOnly(/** @type {number} */(value));

				return this;
			}
		},

		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(number|cc.entities.IEntity)}
		 */
		maximumVelocity: function (value)
		{
			if (TypeCheck.isUndefined(value))
			{
				return this._maximumVelocity;
			}
			else
			{
				this._maximumVelocity = Maths.positiveOnly(/** @type {number} */(value));

				return this;
			}
		},

		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(number|cc.entities.IEntity)}
		 */
		minimumSteeringVelocity: function (value)
		{
			if (TypeCheck.isUndefined(value))
			{
				return this._minimumSteeringVelocity;
			}
			else
			{
				this._minimumSteeringVelocity = Maths.positiveOnly(/** @type {number} */(value));

				return this;
			}
		},

		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(number|cc.entities.IEntity)}
		 */
		orientation: function (value)
		{
			if (TypeCheck.isUndefined(value))
			{
				return this._orientation;
			}
			else
			{
				this._orientation = Maths.normalizeDegree(/** @type {number} */(value));

				return this;
			}
		},

		/**
		 *
		 * @return {sc.geom.Point}
		 */
		getPosition: function ()
		{
			return this._position;
		},

		/**
		 *
		 * @param {number=} x
		 * @param {number=} y
		 *
		 * @return {cc.entities.IEntity}
		 */
		setPosition: function (x, y)
		{
			!TypeCheck.isUndefined(x) && (this._position.x = /** @type {number} */(x));
			!TypeCheck.isUndefined(y) && (this._position.y = /** @type {number} */(y));

			return this;
		},

		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(number|cc.entities.IEntity)}
		 */
		scale: function (value)
		{
			if (TypeCheck.isUndefined(value))
			{
				return this._scale;
			}
			else
			{
				this._scale = Maths.positiveOnly(/** @type {number} */(value));

				return this;
			}
		},

		/**
		 *
		 * @param {Array.<sc.imaging.Sprite>=} value
		 *
		 * @return {(Array.<sc.imaging.Sprite>|cc.entities.IEntity)}
		 */
		sprites: function (value)
		{
			if (TypeCheck.isUndefined(value))
			{
				return this._sprites;
			}
			else
			{
				this._sprites = /** @type {Array.<sc.imaging.Sprite>} */(value);

				return this;
			}
		},

		/**
		 *
		 * @param {cc.states.IStateMachine=} value
		 *
		 * @return {(cc.states.IStateMachine|cc.entities.IEntity)}
		 */
		stateMachine: function (value)
		{
			if (TypeCheck.isUndefined(value))
			{
				return this._stateMachine;
			}
			else
			{
				this._stateMachine = /** @type {cc.states.IStateMachine} */(value);

				return this;
			}
		},

		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(number|cc.entities.IEntity)}
		 */
		steering: function (value)
		{
			if (TypeCheck.isUndefined(value))
			{
				return this._steering;
			}
			else
			{
				this._steering = Maths.positiveOnly(/** @type {number} */(value));

				return this;
			}
		},

		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(number|cc.entities.IEntity)}
		 */
		velocity: function (value)
		{
			if (TypeCheck.isUndefined(value))
			{
				return this._velocity;
			}
			else
			{
				this._velocity = Maths.positiveOnly(/** @type {number} */(value));

				return this;
			}
		}
	});
});