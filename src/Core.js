goog.require("sc.constants");
goog.require("sc.globals");

goog.require("cc.Commander");
//goog.require("cc.MapEditor");
//goog.require("dxp.demo.pi.charting.Charts");
//goog.require("labs.pathfinder.NavMesh");

goog.provide("sc.core.application");
goog.scope(function ()
{
	//sc.core.application = new labs.pathfinder.NavMesh("Commander");
	/**
	 * @type {cc.Commander}
	 */
	sc.core.application = new cc.Commander("Commander");
	//sc.core.application = new cc.MapEditor("Commander");
	//sc.core.application = new dxp.demo.pi.charting.Charts("Commander");
});
