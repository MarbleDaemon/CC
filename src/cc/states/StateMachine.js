{
	goog.require("sc.collections.IDictionary");

	goog.require("sc.core.Maths");
	goog.require("sc.core.ObjectUtils");
	goog.require("sc.core.Utils");

	goog.require("cc.states.IStateMachine");
	goog.require("cc.states.StateTransition");
}
{
	goog.provide("cc.states.StateMachine");
}
goog.scope(function ()
{
	var ArrayUtils = sc.core.ArrayUtils;
	var Maths = sc.core.Maths;
	var ObjectUtils = sc.core.ObjectUtils;
	var StateTransition = cc.states.StateTransition;
	var TypedArrayUtils = sc.core.TypedArrayUtils;

	/**
	 * @constructor
	 * @implements {cc.states.IStateMachine}
	 */
	cc.states.StateMachine = goog.defineClass(null, {
		constructor: function ()
		{
			/**
			 * @private
			 * @type {Object.<(number|string),Array.<cc.states.IStateTransition>>}
			 */
			this._transistions = {};
			/**
			 * @private
			 * @type {Object.<(number|string),number>}
			 */
			this._totalWeight = {};
		},

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
			if (!ObjectUtils.hasProperty(this._transistions, triggerId))
			{
				this._transistions[triggerId] = [];
				this._totalWeight[triggerId] = 0;
			}

			var transition = new StateTransition(this, fromState, toState, weight);

			ArrayUtils.push(this._transistions[triggerId], transition);
			this._totalWeight[triggerId] += transition.weight;

			return transition;
		},

		/**
		 *
		 * @param {(number|string)} triggerId
		 *
		 * @return {cc.states.IStateTransition}
		 */
		get: function (triggerId)
		{
			return this._transistions[triggerId][0];
		},

		/**
		 *
		 * @param {(number|string)} triggerId
		 *
		 * @return {(number|string)}
		 */
		activateTrigger: function (triggerId)
		{
			var transitions = this._transistions[triggerId];
			var total = this._totalWeight[triggerId];
			try
			{
				TypedArrayUtils.forEachItem(transitions, function (transition)
				{
					transition.roll = Maths.randomRange(0, transition.weight / total);
				});
			}
			catch (error)
			{
				console.log(triggerId);
				throw(error);
			}

			TypedArrayUtils.sortBy(transitions, function (item)
			{
				return item.roll;
			}, ArrayUtils.COMPARE_DESCENDING);

			return transitions[0].toState;
		}
	});
});