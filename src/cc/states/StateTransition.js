{
	goog.require("sc.collections.IDictionary");

	goog.require("cc.states.IStateMachine");
	goog.require("cc.states.IStateTransition");
}
{
	goog.provide("cc.states.StateTransition");
}
goog.scope(function ()
{
	/**
	 * @constructor
	 * @implements {cc.states.IStateTransition}
	 */
	cc.states.StateTransition = goog.defineClass(null, {
		/**
		 *
		 * @param {cc.states.IStateMachine} parent
		 * @param {(number|string)} fromState
		 * @param {(number|string)} toState
		 * @param {number=} weight
		 */
		constructor: function (parent, fromState, toState, weight)
		{
			/**
			 * @type {cc.states.IStateMachine}
			 */
			this.done = parent;
			/**
			 * @type {(number|string)}
			 */
			this.fromState = fromState;
			/**
			 * @type {number}
			 */
			this.roll = 0;
			/**
			 * @type {(number|string)}
			 */
			this.toState = toState;
			/**
			 * @type {number}
			 */
			this.weight = weight || 1;
		}
	});
});