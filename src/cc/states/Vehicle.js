{
	goog.require("cc.animations.Animations");
	goog.require("cc.states.StateMachine");
}
{
	goog.provide("cc.states.Vehicle");
}
goog.scope(function ()
{
	var animations = cc.animations;

	var StateMachine = cc.states.StateMachine;

	cc.states.Vehicle = new StateMachine()
		.add(animations.IDLE, animations.ANY, animations.IDLE).done
		.add(animations.RUNNING, animations.ANY, animations.RUNNING).done;
});