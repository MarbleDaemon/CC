goog.require('sc.globals');

goog.provide('sc.debug.CustomError');
goog.scope(function ()
{
	var globals = sc.globals;

	globals.CAPTURE_STACK_TRACE = "captureStackTrace";

	/**
	 * @constructor
	 */
	globals.ERROR = Error;

	/**
	 * Base class for custom error objects.
	 * @param {*=} message The message associated with the error.
	 * @constructor
	 * @extends {Error}
	 */
	sc.debug.CustomError = function (message)
	{
		// Ensure there is a stack trace.
		if (globals.ERROR[globals.CAPTURE_STACK_TRACE])
		{
			globals.ERROR[globals.CAPTURE_STACK_TRACE](this, sc.debug.CustomError);
		}
		else
		{
			this.stack = new globals.ERROR().stack || '';
		}

		if (message)
		{
			this.message = String(message);
		}
	};

	sc.debug.CustomError.prototype = new globals.ERROR();

	/** @override */
	sc.debug.CustomError.prototype.name = 'CustomError';
});
