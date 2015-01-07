goog.require("sc.core.StringUtils");
goog.require("sc.debug.CustomError");

goog.provide("sc.test.AssertionError");
goog.scope(function ()
{
	var CustomError = sc.debug.CustomError;
	var StringUtils = sc.core.StringUtils;

	/**
	 * Error object for failed assertions.
	 * @param {string} messagePattern The pattern that was used to form message.
	 * @param {!Array.<*>} messageArgs The items to substitute into the pattern.
	 * @constructor
	 * @extends {sc.debug.CustomError}
	 */
	sc.test.AssertionError = function (messagePattern, messageArgs)
	{
		messageArgs.unshift(messagePattern);
		CustomError.call(this, StringUtils.subs.apply(null, messageArgs));
		// Remove the messagePattern afterwards to avoid permanently modifying the
		// passed in array.
		messageArgs.shift();

		/**
		 * The message pattern used to format the error message. Error handlers can
		 * use this to uniquely identify the assertion.
		 * @type {string}
		 */
		this.messagePattern = messagePattern;
	};

	sc.test.AssertionError.prototype = new CustomError();


	/** @override */
	sc.test.AssertionError.prototype.name = 'AssertionError';
});