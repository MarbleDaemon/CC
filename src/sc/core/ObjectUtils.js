goog.require("sc.constants");
goog.require("sc.core.Utils");

goog.provide("sc.core.ObjectUtils");
goog.scope(function ()
{
	var ObjectUtils = sc.core.ObjectUtils;

	var LENGTH = sc.constants.LENGTH;

	/**
	 * @const
	 * @type {Array.<string>}
	 */
	var PROTOTYPE_FIELDS =
		[
			'constructor',
			'hasOwnProperty',
			'isPrototypeOf',
			'propertyIsEnumerable',
			'toLocaleString',
			'toString',
			'valueOf'
		];

	/**
	 *
	 * @param {Object} obj
	 */
	ObjectUtils.dispose = function (obj)
	{
		if (obj != null)
		{
			obj.dispose();
		}
	};

	/**
	 * @param {Object} obj
	 * @param {function(?, ?)} callBack
	 */
	ObjectUtils.forEachItem = function (obj, callBack)
	{
		for (var key in obj)
		{
			ObjectUtils.hasProperty(obj, key) && callBack(obj[key], key);
		}
	};

	/**
	 *
	 * @param {*} obj
	 * @param {*} key
	 * @param {?} value
	 *
	 * @return {?}
	 */
	ObjectUtils.getSetValue = function (obj, key, value)
	{
		return (2 == arguments[LENGTH]) ? obj[key] : (obj[key] = value);
	};

	/**
	 *
	 * @param {?} obj
	 * @param {?} key
	 *
	 * @return {boolean}
	 */
	ObjectUtils.hasProperty = function (obj, key)
	{
		//return FunctionUtils.invoke(_hasOwnProperty, obj, key);
		return (key in obj);
	};

	/**
	 * @param {*} obj
	 * @param {*} value
	 * @return {boolean}
	 */
	ObjectUtils.hasValue = function (obj, value)
	{
		for (var key in obj)
		{
			if (ObjectUtils.hasProperty(obj, key) && (obj[key] == value))
			{
				return true;
			}
		}

		return false;
	};

	/**
	 *
	 * @param {?} obj
	 *
	 * @return {boolean}
	 */
	ObjectUtils.instanceOf = function (obj, objType)
	{
		return (obj instanceof objType);
	};

	/**
	 *
	 * @param {Object} target
	 * @param {...Object} var_args
	 */
	ObjectUtils.mixin = function (target, var_args)
	{
		var key, source;
		for (var i = 1; i < arguments[LENGTH]; i++)
		{
			source = arguments[i];
			for (key in source)
			{
				target[key] = source[key];
			}

			// For IE the for-in-loop does not contain any properties that are not
			// enumerable on the prototype object (for example isPrototypeOf from
			// Object.prototype) and it will also not include 'replace' on objects that
			// extend String and change 'replace' (not that it is common for anyone to
			// extend anything except Object).

			var length = PROTOTYPE_FIELDS[LENGTH];
			for (var j = 0; j < length; j++)
			{
				key = PROTOTYPE_FIELDS[j];
				if (ObjectUtils.hasProperty(source, key))
				{
					target[key] = source[key];
				}
			}
		}
	};
});
