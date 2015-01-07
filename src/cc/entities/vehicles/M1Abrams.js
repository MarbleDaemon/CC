{
	goog.require("sc.core.Types");
	goog.require("sc.core.Utils");
	goog.require("sc.imaging.SpriteSheet");
	goog.require("sc.measurements.Distance");

	goog.require("cc.animations.Vehicle");
	goog.require("cc.entities.Entity");
	goog.require("cc.entities.attachments.M1AbramsTurret");
	goog.require("cc.states.Vehicle");
}
goog.provide("cc.entities.vehicles.M1Abrams");
goog.provide("cc.entities.definitions.vehicles.M1Abrams");
goog.scope(function ()
{
	var animations = cc.animations;
	var core = sc.core;
	var definitions = cc.entities.definitions;
	var states = cc.states;

	var Distance = sc.measurements.Distance;
	var M1AbramsTurret = cc.entities.attachments.M1AbramsTurret;
	var Entity = cc.entities.Entity;
	var FunctionUtils = core.FunctionUtils;
	var SpriteSheets = sc.imaging.SpriteSheets;

	var M1AbramsDefinition = definitions.vehicles.M1Abrams;
	M1AbramsDefinition.load = function ()
	{
		M1AbramsDefinition.spriteSheet.load();
		definitions.attachments.M1AbramsTurret.spriteSheet.load();
	};
	M1AbramsDefinition.spriteSheet = SpriteSheets.createSheet("M1Abrams", "png");
	M1AbramsDefinition.sprites = M1AbramsDefinition.spriteSheet.createSprites(72, true);
	M1AbramsDefinition.scale = 1;

	M1AbramsDefinition.accelerator = Distance.kMHToMS(72.4205);

	/**
	 * @constructor
	 * @extends {cc.entities.Entity}
	 */
	cc.entities.vehicles.M1Abrams = goog.defineClass(Entity, {
		constructor: function ()
		{
			(/** @type {cc.entities.Entity} */(FunctionUtils.invoke(Entity, this)))
				.animations(animations.Vehicle)
				.stateMachine(states.Vehicle)
				.sprites(M1AbramsDefinition.sprites)
				.center(0, 0)
				.scale(M1AbramsDefinition.scale)

				.accelerator(M1AbramsDefinition.accelerator)

				.attach(new M1AbramsTurret());
		}
	});
});