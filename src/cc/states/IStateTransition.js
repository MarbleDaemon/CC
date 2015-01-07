{
	goog.provide("cc.states.IStateTransition");
}
goog.scope(function ()
{
	/**
	 * @interface
	 *
	 * @param {cc.states.IStateMachine} parent
	 * @param {(number|string)} fromState
	 * @param {(number|string)} toState
	 * @param {number=} weight
	 */
	cc.states.IStateTransition = function (parent, fromState, toState, weight)
	{
	};
	cc.states.IStateTransition.prototype =
	{
		/**
		 * @type {cc.states.IStateMachine}
		 */
		done:      null,
		/**
		 * @type {(number|string)}
		 */
		fromState: 0,
		/**
		 * @type {number}
		 */
		roll:      0,
		/**
		 * @type {(number|string)}
		 */
		toState:   0,
		/**
		 * @type {number}
		 */
		weight:    0
	};
});