{
	goog.require("sc.globals");

	goog.require("sc.collections.IDictionary");

	goog.require("cc.animations.Animation");
}
goog.provide("cc.animations.Animations");
goog.scope(function ()
{
	var globals = sc.globals;

	var Animation = cc.animations.Animation;

	cc.animations.ANY = globals.UID++;
	cc.animations.IDLE = globals.UID++;
	cc.animations.IDLE0 = globals.UID++;
	cc.animations.IDLE1 = globals.UID++;
	cc.animations.RUNNING = globals.UID++;
	cc.animations.HIT_CRIT = globals.UID++;
	cc.animations.HIT_HEAD = globals.UID++;
	cc.animations.HIT_GROIN = globals.UID++;

	/**
	 * @constructor
	 * @implements {sc.collections.IDictionary.<number,cc.animations.Animation>}
	 */
	cc.animations.Animations = goog.defineClass(null, {
		constructor: function ()
		{
			/**
			 * @private
			 * @type {Object.<number,cc.animations.Animation>}
			 */
			this._transistions = {};
		},

		/**
		 *
		 * @param {number} animationId
		 *
		 * @return {cc.animations.Animation}
		 */
		add: function (animationId)
		{
			var animation = new Animation(this);

			this._transistions[animationId] = animation;

			return animation;
		},

		/**
		 *
		 * @param {number} animationId
		 *
		 * @return {cc.animations.Animation}
		 */
		get: function (animationId)
		{
			return this._transistions[animationId];
		}
	});
});