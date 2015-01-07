{
	goog.require("cc.animations.Animations");
}
{
	goog.provide("cc.animations.Vehicle");
}
goog.scope(function ()
{
	var animations = cc.animations;

	var Animations = animations.Animations;

	cc.animations.Vehicle = new Animations();
	cc.animations.Vehicle
		.add(animations.IDLE)
		/***/.directions(72)
		/***/.counterClockWise(true)
		/***/.startFrame(0)
		/***/.numberOfFrames(1)
		/***/.onEnd(animations.IDLE)
		/***/.done
		/***/
		.add(animations.RUNNING)
		/***/.directions(72)
		/***/.counterClockWise(true)
		/***/.startFrame(0)
		/***/.numberOfFrames(1)
		/***/.onEnd(animations.RUNNING);
});