{
	goog.require("sc.core.Types");
	goog.require("sc.core.Utils");
	goog.require("sc.imaging.SpriteSheet");

	goog.require("cc.animations.Vehicle");
	goog.require("cc.display.Colors");
	goog.require("cc.entities.Entity");
	goog.require("cc.states.Vehicle");
}
goog.provide("cc.entities.attachments.M1AbramsTurret");
goog.provide("cc.entities.definitions.attachments.M1AbramsTurret");
goog.scope(function ()
{
	var animations = cc.animations;
	var core = sc.core;
	var states = cc.states;

	var Colors = cc.display.Colors;
	var Entity = cc.entities.Entity;
	var FunctionUtils = core.FunctionUtils;
	var SpriteSheets = sc.imaging.SpriteSheets;

	var M1AbramsTurretDefinition = cc.entities.definitions.attachments.M1AbramsTurret;
	M1AbramsTurretDefinition.load = function ()
	{
		M1AbramsTurretDefinition.spriteSheet.load();
	};
	M1AbramsTurretDefinition.spriteSheet = SpriteSheets.createSheet("M1AbramsTurret", "png");
	M1AbramsTurretDefinition.sprites = M1AbramsTurretDefinition.spriteSheet.createSprites(72, true);
	M1AbramsTurretDefinition.shadowSprites = M1AbramsTurretDefinition.spriteSheet.createShadow(Colors.SHADOW).createSprites(72, true);

	/**
	 * @constructor
	 * @extends {cc.entities.Entity}
	 */
	cc.entities.attachments.M1AbramsTurret = goog.defineClass(Entity, {
		constructor: function ()
		{
			(/** @type {cc.entities.Entity} */(FunctionUtils.invoke(Entity, this)))
				.animations(animations.Vehicle)
				.stateMachine(states.Vehicle)
				.sprites(M1AbramsTurretDefinition.sprites)
				.center(0, 0)
				.scale(1);
		}
	});
});