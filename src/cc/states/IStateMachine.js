{
	goog.require("sc.collections.IDictionary");
}
goog.provide("cc.states.IStateMachine");
goog.scope(function ()
{
	/**
	 * @interface
	 * @extends {sc.collections.IDictionary.<(number|string),cc.states.IStateTransition>}
	 */
	cc.states.IStateMachine = function ()
	{
	};
	cc.states.IStateMachine.prototype =
	{
		/**
		 *
		 * @param {(number|string)} triggerId
		 * @param {(number|string)} fromState
		 * @param {(number|string)} toState
		 * @param {number=} weight
		 *
		 * @return {cc.states.IStateTransition}
		 */
		add: function (triggerId, fromState, toState, weight)
		{
		},

		/**
		 *
		 * @param {(number|string)} triggerId
		 *
		 * @return {cc.states.IStateTransition}
		 */
		get: function (triggerId)
		{
		},

		/**
		 *
		 * @param {(number|string)} triggerId
		 *
		 * @return {(number|string)}
		 */
		activateTrigger: function (triggerId)
		{
		}
	};
});