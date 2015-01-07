goog.require("sc.constants");
goog.require("sc.globals");

goog.provide("sc.core.Types");
goog.provide("sc.core.TypesStatic");
goog.scope(function ()
{
	var globals = sc.globals;

	sc.core.TypesStatic = new globals.Function();
	sc.core.TypesStatic.prototype = {
		ARRAY:     ++globals.UID,
		BOOLEAN:   typeof true,
		FUNCTION:  typeof function ()
		{
		},
		NULL:      ++globals.UID,
		NUMBER:    typeof 0,
		OBJECT:    typeof {},
		STRING:    typeof "",
		UNDEFINED: typeof undefined
	};

	/**
	 * @const
	 * @type {sc.core.TypesStatic}
	 */
	sc.core.Types = new sc.core.TypesStatic();
});

goog.provide("sc.core.TypeCheck");
goog.scope(function ()
{
	var constants = sc.constants;
	var globals = sc.globals;

	var TypeCheck = sc.core.TypeCheck;
	var Types = sc.core.Types;

	var TYPE_ARRAY = '[' + Types.OBJECT + ' Array]';
	var TYPE_FUNCTION = '[' + Types.OBJECT + ' Function]';
	var TYPE_WINDOW = globals.objectToString.call(globals.window);

	/**
	 * Returns true if the specified value is an array.
	 *
	 * @param {?} val Variable to test.
	 *
	 * @return {boolean} Whether variable is an array.
	 */
	TypeCheck.isArray = function (val)
	{
		return TypeCheck.typeOf(val) == Types.ARRAY;
	};

	/**
	 * Returns true if the object looks like an array. To qualify as array like
	 * the value needs to be either a NodeList or an object with a Number length
	 * property. As a special case, a function value is not array like, because its
	 * length property is fixed to correspond to the number of expected arguments.
	 *
	 * @param {?} val Variable to test.
	 *
	 * @return {boolean} Whether variable is an array.
	 */
	TypeCheck.isArrayLike = function (val)
	{
		var type = TypeCheck.typeOf(val);
		return type == Types.ARRAY || type == Types.OBJECT && typeof val.length == Types.NUMBER;
	};

	/**
	 * Returns true if the specified value is a boolean.
	 *
	 * @param {?} val Variable to test.
	 *
	 * @return {boolean} Whether variable is a boolean.
	 */
	TypeCheck.isBoolean = function (val)
	{
		return typeof val == Types.BOOLEAN;
	};

	/**
	 * Returns true if the object looks like a Date. To qualify as Date-like the
	 * value needs to be an object and have a getFullYear() function.
	 *
	 * @param {?} val Variable to test.
	 *
	 * @return {boolean} Whether variable is a like a Date.
	 */
	TypeCheck.isDateLike = function (val)
	{
		return TypeCheck.isObject(val) && typeof val.getFullYear == Types.FUNCTION;
	};

	/**
	 * Returns true if the specified value is defined and not null.
	 *
	 * @param {?} val Variable to test.
	 *
	 * @return {boolean} Whether variable is defined and not null.
	 */
	TypeCheck.isDefAndNotNull = function (val)
	{
		return val != null;
	};

	/**
	 * Returns true if the specified value is a function.
	 *
	 * @param {?} val Variable to test.
	 *
	 * @return {boolean} Whether variable is a function.
	 */
	TypeCheck.isFunction = function (val)
	{
		return Types.typeOf(val) == Types.FUNCTION;
	};

	/**
	 * Returns true if the specified value is null.
	 *
	 * @param {?} val Variable to test.
	 *
	 * @return {boolean} Whether variable is null.
	 */
	TypeCheck.isNull = function (val)
	{
		return val === null;
	};

	/**
	 * Returns true if the specified value is a number.
	 *
	 * @param {?} val Variable to test.
	 *
	 * @return {boolean} Whether variable is a number.
	 */
	TypeCheck.isNumber = function (val)
	{
		return typeof val == Types.NUMBER;
	};

	/**
	 * Returns true if the specified value is an object. This includes arrays and functions.
	 *
	 * @param {?} val Variable to test.
	 *
	 * @return {boolean} Whether variable is an object.
	 */
	TypeCheck.isObject = function (val)
	{
		var type = typeof val;
		return type == Types.OBJECT && val != null || type == Types.FUNCTION;
	};

	/**
	 * Returns true if the specified value is undefined.
	 *
	 * @param {?} val Variable to test.
	 *
	 * @return {boolean}
	 */
	TypeCheck.isUndefined = function (val)
	{
		return void 0 === val;
	};

	/**
	 * Returns true if the specified value is a string.
	 *
	 * @param {?} val Variable to test.
	 *
	 * @return {boolean} Whether variable is a string.
	 */
	TypeCheck.isString = function (val)
	{
		return typeof val == Types.STRING;
	};

	TypeCheck.typeOf = function (value)
	{
		var result = typeof value;
		if (result == Types.OBJECT)
		{
			if (value)
			{
				if (value instanceof Array)
				{
					return Types.ARRAY;
				}
				else if (value instanceof Object)
				{
					return result;
				}

				var className = globals.objectToString[constants.CALL](/** @type {Object} */ (value));
				if (className == TYPE_WINDOW)
				{
					return Types.OBJECT;
				}

				if ((className == TYPE_ARRAY ||
					typeof value[constants.LENGTH] == Types.NUMBER &&
					typeof value[constants.SPLICE] != Types.UNDEFINED &&
					typeof value[constants.PROPERTY_IS_ENUMERABLE] != Types.UNDEFINED && !value[constants.PROPERTY_IS_ENUMERABLE](constants.SPLICE)))
				{
					return Types.ARRAY;
				}

				if ((className == TYPE_FUNCTION ||
					typeof value[constants.CALL] != Types.UNDEFINED &&
					typeof value[constants.PROPERTY_IS_ENUMERABLE] != Types.UNDEFINED && !value[constants.PROPERTY_IS_ENUMERABLE](constants.CALL)))
				{
					return Types.FUNCTION;
				}
			}
			else
			{
				return Types.NULL;
			}
		}
		else if (result == Types.FUNCTION && typeof value[constants.CALL] == Types.UNDEFINED)
		{
			return Types.OBJECT;
		}

		return result;
	};
});
