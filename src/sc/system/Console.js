goog.require("sc.globals");
goog.require("sc.core.Utils");

goog.provide("sc.system.Console");
goog.scope(function ()
{
	var globals = sc.globals;

	var Console = sc.system.Console;

	/**
	 * @param {...?} messages
	 */
	Console.writeLog = function (messages)
	{
		globals.DEBUG && globals.console.log.apply(globals.console, arguments);
	};

	Console.writeTrace = function ()
	{
		globals.DEBUG && globals.console.trace();
	};
});
