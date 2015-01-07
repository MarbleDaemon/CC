goog.require("sc.globals");
goog.require("sc.core.Types");
goog.require("sc.core.Utils");
goog.require("sc.test.AssertionError");

goog.provide("sc.test.Asserts");
goog.scope(function ()
{
	var ArrayUtils = sc.core.ArrayUtils;
	var Asserts = sc.test.Asserts;
	var AssertionError = sc.test.AssertionError;
	var globals = sc.globals;
	var FunctionUtils = sc.core.FunctionUtils;
	var TypeCheck = sc.core.TypeCheck;
	var Types = sc.core.Types;

	/**
	 * @define {boolean} Whether to strip out asserts or to leave them in.
	 */
	goog.define('sc.test.ENABLE_ASSERTS', globals.DEBUG);

	sc.test.Asserts.assertFailure = function (defaultMessage, defaultArgs, givenMessage, givenArgs)
	{
		var message = 'Assertion failed';
		if (givenMessage)
		{
			message += ': ' + givenMessage;
			var args = givenArgs;
		}
		else if (defaultMessage)
		{
			message += ': ' + defaultMessage;
			args = defaultArgs;
		}
		// The '' + works around an Opera 10 bug in the unit tests. Without it,
		// a stack trace is added to var message above. With this, a stack trace is
		// not added until this line (it causes the extra garbage to be added after
		// the assertion message instead of in the middle of it).
		throw new AssertionError('' + message, args || []);
	};

	/**
	 * Checks if the condition evaluates to true if sc.test.ENABLE_ASSERTS is
	 * true.
	 *
	 * @param {*} condition The condition to check.
	 * @param {string=} opt_message Error message in case of failure.
	 * @param {...*} var_args The items to substitute into the failure message.
	 *
	 * @return {*} The value of the condition.
	 *
	 * @throws {sc.test.AssertionError} When the condition evaluates to false.
	 */
	sc.test.Asserts.assert = function (condition, opt_message, var_args)
	{
		if (sc.test.ENABLE_ASSERTS && !condition)
		{
			Asserts.assertFailure('', null, opt_message, ArrayUtils.slice(arguments, 2));
		}
		return condition;
	};

	/**
	 * Checks if the value is equal to the expected value if sc.test.ENABLE_ASSERTS is
	 * true.
	 *
	 * @param {*} value The value to check.
	 * @param {*} expected The expected value.
	 * @param {string=} opt_message Error message in case of failure.
	 * @param {...*} var_args The items to substitute into the failure message.
	 *
	 * @return {*} The value.
	 *
	 * @throws {sc.test.AssertionError} When the condition evaluates to false.
	 */
	sc.test.Asserts.assertEqual = function (value, expected, opt_message, var_args)
	{
		if (sc.test.ENABLE_ASSERTS && (value !== expected))
		{
			Asserts.assertFailure('Expected %s but got %s.', [expected, value], opt_message, ArrayUtils.slice(arguments, 3));
		}
		return value;
	};

	/**
	 * Checks if the value is a boolean if sc.test.ENABLE_ASSERTS is true.
	 *
	 * @param {*} value The value to check.
	 * @param {string=} opt_message Error message in case of failure.
	 * @param {...*} var_args The items to substitute into the failure message.
	 *
	 * @return {boolean} The value, guaranteed to be a boolean when asserts enabled.
	 *
	 * @throws {sc.test.AssertionError} When the value is not a boolean.
	 */
	sc.test.Asserts.assertBoolean = function (value, opt_message, var_args)
	{
		if (sc.test.ENABLE_ASSERTS && !TypeCheck.isBoolean(value))
		{
			Asserts.assertFailure('Expected string but got %s: %s.', [TypeCheck.typeOf(value), value], opt_message, ArrayUtils.slice(arguments, 2));
		}
		return /** @type {boolean} */ (value);
	};

	/**
	 * Checks if the value is a number if sc.test.ENABLE_ASSERTS is true.
	 *
	 * @param {*} value The value to check.
	 * @param {string=} opt_message Error message in case of failure.
	 * @param {...*} var_args The items to substitute into the failure message.
	 *
	 * @return {number} The value, guaranteed to be a number when asserts enabled.
	 *
	 * @throws {sc.test.AssertionError} When the value is not a number.
	 */
	sc.test.Asserts.assertNumber = function (value, opt_message, var_args)
	{
		if (sc.test.ENABLE_ASSERTS && !TypeCheck.isNumber(value))
		{
			Asserts.assertFailure('Expected number but got %s: %s.', [TypeCheck.typeOf(value), value], opt_message, ArrayUtils.slice(arguments, 2));
		}
		return /** @type {number} */ (value);
	};

	/**
	 * Checks if the value is a string if sc.test.ENABLE_ASSERTS is true.
	 *
	 * @param {*} value The value to check.
	 * @param {string=} opt_message Error message in case of failure.
	 * @param {...*} var_args The items to substitute into the failure message.
	 *
	 * @return {string} The value, guaranteed to be a string when asserts enabled.
	 *
	 * @throws {sc.test.AssertionError} When the value is not a string.
	 */
	sc.test.Asserts.assertString = function (value, opt_message, var_args)
	{
		if (sc.test.ENABLE_ASSERTS && !TypeCheck.isString(value))
		{
			Asserts.assertFailure('Expected string but got %s: %s.', [TypeCheck.typeOf(value), value], opt_message, ArrayUtils.slice(arguments, 2));
		}
		return /** @type {string} */ (value);
	};
});
