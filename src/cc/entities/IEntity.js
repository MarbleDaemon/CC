goog.provide("cc.entities.IEntity");
goog.scope(function ()
{
	/**
	 * @interface
	 */
	cc.entities.IEntity = function ()
	{
	};
	cc.entities.IEntity.prototype =
	{
		/**
		 *
		 * @return {cc.entities.IEntity}
		 */
		thi$: function()
		{
		},

		/**
		 *
		 * @param {cc.entities.IEntity} attachment
		 *
		 * @return {cc.entities.IEntity}
		 */
		attach: function (attachment)
		{
		},


		/**
		 *
		 * @return {cc.entities.IEntity}
		 */
		invalidate: function ()
		{
		},

		/**
		 *
		 * @param {sc.html.modules.IRenderingContext2D} output
		 *
		 * @return {cc.entities.IEntity}
		 */
		render: function (output)
		{
		},

		/**
		 *
		 * @return {cc.entities.IEntity}
		 */
		validate: function ()
		{
		},


		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(number|cc.entities.IEntity)}
		 */
		accelerator: function (value)
		{
		},

		/**
		 *
		 * @param {cc.animations.Animations=} value
		 *
		 * @return {(cc.animations.Animations|cc.entities.IEntity)}
		 */
		animations: function (value)
		{
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
		},

		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(number|cc.entities.IEntity)}
		 */
		decelerator: function (value)
		{
		},

		/**
		 *
		 * @return {boolean}
		 */
		isValid: function ()
		{
		},

		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(number|cc.entities.IEntity)}
		 */
		maximumSteeringVelocity: function (value)
		{
		},

		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(number|cc.entities.IEntity)}
		 */
		maximumVelocity: function (value)
		{
		},

		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(number|cc.entities.IEntity)}
		 */
		minimumSteeringVelocity: function (value)
		{
		},

		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(number|cc.entities.IEntity)}
		 */
		orientation: function (value)
		{
		},

		/**
		 *
		 * @return {sc.geom.Point}
		 */
		getPosition: function ()
		{
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
		},

		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(number|cc.entities.IEntity)}
		 */
		scale: function (value)
		{
		},

		/**
		 *
		 * @param {Array.<sc.imaging.Sprite>=} value
		 *
		 * @return {(Array.<sc.imaging.Sprite>|cc.entities.IEntity)}
		 */
		sprites: function (value)
		{
		},

		/**
		 *
		 * @param {cc.states.IStateMachine=} value
		 *
		 * @return {(cc.states.IStateMachine|cc.entities.IEntity)}
		 */
		stateMachine: function (value)
		{
		},

		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(number|cc.entities.IEntity)}
		 */
		steering: function (value)
		{
		},

		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(number|cc.entities.IEntity)}
		 */
		velocity: function (value)
		{
		}
	};
});