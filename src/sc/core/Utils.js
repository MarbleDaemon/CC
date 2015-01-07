{
	goog.require("sc.constants");
	goog.require("sc.globals");
	goog.require("sc.core.Types");
}
goog.provide("sc.core.Utils");
goog.scope(function ()
{
	var globals = sc.globals;

	var Types = sc.core.Types;
	var Utils = sc.core.Utils;

	/**
	 * Create anonymous function from lambda expression string
	 *
	 * @param {?(Function|string)} expression
	 * @returns {Function}
	 */
	Utils.createLambda = function (expression)
	{
		if (expression == null)
		{
			return sc.core.FunctionUtils.IDENTITY;
		}

		if (typeof expression == Types.STRING)
		{
			if (expression == "")
			{
				return sc.core.FunctionUtils.IDENTITY;
			}
			else if (expression.indexOf("=>") == -1)
			{
				var regexp = new RegExp("[$]+", "g");

				var maxLength = 0;
				var match;
				while (match = regexp.exec(expression))
				{
					var paramNumber = match[0].length;
					if (paramNumber > maxLength)
					{
						maxLength = paramNumber;
					}
				}

				var argArray = [];
				for (var i = 1; i <= maxLength; i++)
				{
					var dollar = "";
					for (var j = 0; j < i; j++)
					{
						dollar += "$";
					}
					sc.core.ArrayUtils.push(argArray, dollar);
				}

				var args = sc.core.ArrayUtils.join(argArray, ",");

				return /** @type {Function} */(new globals.Function(args, "return " + expression));
			}
			else
			{
				var expr = expression.match(/^[(\s]*([^()]*?)[)\s]*=>(.*)/);
				return /** @type {Function} */(new globals.Function(expr[1], "return " + expr[2]));
			}
		}

		return /** @type {Function} */(expression);
	};
});

goog.provide("sc.core.ArrayUtils");
goog.provide("sc.core.TypedArrayUtils");
goog.scope(function ()
{
	var constants = sc.constants;
	var ArrayUtils = sc.core.ArrayUtils;
	var TypeCheck = sc.core.TypeCheck;
	var TypedArrayUtils = sc.core.TypedArrayUtils;

	var _prototype = [];

	/**
	 *
	 * @param {?} value1
	 * @param {?} value2
	 *
	 * @return {number}
	 */
	ArrayUtils.COMPARE_ASCENDING = function (value1, value2)
	{
		return value1 < value2 ? -1 : (value1 > value2 ? 1 : 0);
	};

	/**
	 *
	 * @param {?} value1
	 * @param {?} value2
	 *
	 * @return {number}
	 */
	ArrayUtils.COMPARE_DESCENDING = function (value1, value2)
	{
		return -ArrayUtils.COMPARE_ASCENDING(value1, value2);
	};

	/**
	 *
	 * @param {?} arr
	 * @param {...?} var_args
	 * @return {Array}
	 */
	ArrayUtils.concat = function (arr, var_args)
	{
		return _prototype.concat.apply(arr, ArrayUtils.slice(arguments, 1));
	};

	/**
	 *
	 * @param {?} arr
	 * @param {?} item
	 * @return {boolean}
	 */
	ArrayUtils.contain = function (arr, item)
	{
		return ArrayUtils.index(arr, item) >= 0;
	};

	/**
	 * @static
	 *
	 * @param {?} arr
	 * @param {?number=} fromIndex
	 * @param {?number=} toIndex
	 *
	 * @return {Array}
	 */
	ArrayUtils.copy = function (arr, fromIndex, toIndex)
	{
		var result = [];
		var length = arr[constants.LENGTH] - 1;
		var actualFrom = fromIndex >= 0 ? fromIndex : 0;
		var actualTo = toIndex <= length ? toIndex + 1 : length;
		for (var count = actualFrom; count < actualTo; count++)
		{
			result[count - 1] = arr[count];
		}

		return result;
	};

	/**
	 *
	 * @param {?} arr
	 * @param {Function} callBack
	 *
	 * @return {boolean}
	 */
	ArrayUtils.forEveryItem = function (arr, callBack)
	{
		return sc.core.FunctionUtils.invoke(_prototype.every, arr, callBack);
	};

	/**
	 * @template I
	 *
	 * @param {?} arr
	 * @param {Function} callBack
	 * @param {?number=} fromIndex
	 *
	 * @return {boolean}
	 */
	ArrayUtils.forEachItem = function (arr, callBack, fromIndex)
	{
		var len = arr[constants.LENGTH];
		for (var index = (fromIndex || 0); index < len; index++)
		{
			if (callBack(arr[index], index, arr) === false)
			{
				return false;
			}
		}

		return true;
	};

	/**
	 *
	 * @param {?} arr
	 * @param {Function} callBack
	 * @param {?number=} batchSize
	 * @param {?number=} fromIndex
	 */
	ArrayUtils.forEachBatch = function (arr, callBack, batchSize, fromIndex)
	{
		var APPLY = constants.APPLY;
		var len = arr[constants.LENGTH];
		batchSize = batchSize || 1;
		for (var count = (fromIndex || 0); count < len; count += batchSize)
		{
			callBack[APPLY](null, ArrayUtils.concat(ArrayUtils.slice(arr, count, count + batchSize), [count]));
		}
	};

	/**
	 *
	 * @param {?} arr
	 * @param {?number} fromIndex
	 * @param {?number} toIndex
	 * @param {Function} callBack
	 */
	ArrayUtils.forRange = function (arr, fromIndex, toIndex, callBack)
	{
		var length = arr[constants.LENGTH] - 1;
		var actualFrom = fromIndex >= 0 ? fromIndex : 0;
		var actualTo = toIndex >= 0 && toIndex <= length ? toIndex + 1 : length;
		for (var count = actualFrom; count < actualTo; count++)
		{
			callBack(arr[count], count);
		}
	};

	ArrayUtils.getItemAt = function (arr, index)
	{
		if (index < 0)
		{
			index = 0;
		}
		var lastPosition = arr[constants.LENGTH] - 1;
		return (index > lastPosition ? arr[lastPosition] : arr[index]);
	};

	/**
	 *
	 * @param {?} arr
	 * @param {?} item
	 * @return {number}
	 */
	ArrayUtils.index = function (arr, item)
	{
		return sc.core.FunctionUtils.invoke(_prototype.indexOf, arr, item);
	};

	/**
	 * @static
	 * @param {?} arr
	 * @param {?string=} delimiter
	 * @return {string}
	 */
	ArrayUtils.join = function (arr, delimiter)
	{
		return sc.core.FunctionUtils.invoke(_prototype.join, arr, delimiter);
	};

	/**
	 *
	 * @param {?} arr
	 * @return {?}
	 */
	ArrayUtils.lastEntry = function (arr)
	{
		return arr[arr[constants.LENGTH] - 1];
	};

	/**
	 * @static
	 *
	 * @param {?} arr
	 * @param {Function} callBack
	 * @param {?number=} fromIndex
	 *
	 * @return {Array}
	 */
	ArrayUtils.produce = function (arr, callBack, fromIndex)
	{
		var result = [];

		ArrayUtils.forEachItem(arr, function (item, index)
		{
			var product = callBack(item, index);
			!TypeCheck.isUndefined(product) && ArrayUtils.push(result, product);
		}, fromIndex || 0);

		return result;
	};

	/**
	 *
	 * @param {?} arr
	 * @param {?} item
	 * @return {number}
	 */
	ArrayUtils.push = function (arr, item)
	{
		var index = arr[constants.LENGTH];
		arr[index] = item;
		return index;
	};

	/**
	 *
	 * @param {?} arr
	 * @param {?} item
	 */
	ArrayUtils.removeItem = function (arr, item)
	{
		var index = ArrayUtils.index(arr, item);
		if (index > -1)
		{
			ArrayUtils.splice(arr, index, 1);
		}
	};

	/**
	 *
	 * @param {?} arr
	 * @return {?}
	 */
	ArrayUtils.shift = function (arr)
	{
		return sc.core.FunctionUtils.invoke(_prototype.shift, arr);
	};

	/**
	 *
	 * @param {?} arr
	 * @param {number} from
	 * @param {?number=} to
	 * @return {Array}
	 */
	ArrayUtils.slice = function (arr, from, to)
	{
		return _prototype.slice[constants.CALL](arr, from, to);
	};

	/**
	 * @static
	 * @param {?} arr
	 * @param {?number=} start
	 * @param {?number=} deleteCount
	 * @param {...?} items
	 * @return {Array}
	 */
	ArrayUtils.splice = function (arr, start, deleteCount, items)
	{
		return _prototype[constants.SPLICE].apply(arr, ArrayUtils.slice(arguments, 1));
	};

	/**
	 *
	 * @param {?} arr
	 * @param {?} item
	 * @return {Array}
	 */
	ArrayUtils.unshift = function (arr, item)
	{
		_prototype.unshift.call(arr, item);
		return arr;
	};

	/**
	 *
	 * @param {Array} arr
	 * @param {function(?):?} getter
	 * @param {(function(?,?):number)=} compareFunction
	 */
	ArrayUtils.sortBy = function (arr, getter, compareFunction)
	{
		TypedArrayUtils.sortBy(arr, getter, compareFunction);
	};

	/**
	 * @template I,O
	 *
	 * @param {Array<I>} arr
	 * @param {O} initial
	 * @param {function(O, I, ?number=, ?Array<I>=):O} callBack
	 * @param {?number=} fromIndex
	 *
	 * @return {O}
	 */
	TypedArrayUtils.aggregate = function (arr, initial, callBack, fromIndex)
	{
		var result = initial;

		ArrayUtils.forEachItem(arr, function (item, index, arr)
		{
			result = callBack(result, item, index, arr);
		}, fromIndex);

		return result;
	};

	/**
	 * @static
	 * @template P
	 *
	 * @param {function(?number=,?number=):P} callBack
	 * @param {number=} total
	 *
	 * @return {Array.<P>}
	 */
	TypedArrayUtils.create = function (callBack, total)
	{
		var result = [];
		sc.core.FunctionUtils.repeat(function (count, times)
		{
			ArrayUtils.push(result, callBack(count, times));
		}, total);

		return result;
	};

	/**
	 * @template I
	 *
	 * @param {Array<I>} arr
	 * @param {function(I, ?number=, ?Array<I>=):boolean} callBack
	 * @param {?number=} fromIndex
	 *
	 * @return {Array<I>}
	 */
	TypedArrayUtils.filterItems = function (arr, callBack, fromIndex)
	{
		return arr.filter(callBack);
	};

	/**
	 * @template I
	 *
	 * @param {Array<I>} arr
	 * @param {function(I, ?number=, ?Array<I>=)} callBack
	 * @param {?number=} fromIndex
	 *
	 * @return {boolean}
	 */
	TypedArrayUtils.forEachItem = function (arr, callBack, fromIndex)
	{
		return ArrayUtils.forEachItem(arr, callBack, fromIndex);
	};

	/**
	 * @static
	 * @template I,O
	 *
	 * @param {Array<I>} arr
	 * @param {function(I,?number=):O} callBack
	 * @param {?number=} fromIndex
	 *
	 * @return {Array<O>}
	 */
	TypedArrayUtils.produce = function (arr, callBack, fromIndex)
	{
		return ArrayUtils.produce(arr, callBack, fromIndex);
	};

	/**
	 * @template I
	 *
	 * @param {Array.<I>} arr
	 * @param {function(I):?} getter
	 * @param {(function(?,?):number)=} compareFunction
	 */
	TypedArrayUtils.sortBy = function (arr, getter, compareFunction)
	{
		compareFunction = compareFunction || ArrayUtils.COMPARE_ASCENDING;
		arr.sort(function (item1, item2)
		{
			var value1 = getter(item1);
			var value2 = getter(item2);
			return compareFunction(value1, value2);
		});
	};
});

goog.provide("sc.core.FunctionUtils");
goog.scope(function ()
{
	var constants = sc.constants;
	var globals = sc.globals;

	var FUNCTION = globals.Function;

	var FunctionUtils = sc.core.FunctionUtils;

	FunctionUtils.BLANK = function ()
	{
	};

	FunctionUtils.IDENTITY = function (x)
	{
		return x;
	};

	/**
	 * @return {boolean}
	 */
	FunctionUtils.TRUE = function ()
	{
		return true;
	};

	/**
	 *
	 * @this {?}
	 * @template T
	 * @param {T} obj
	 * @param {string} method
	 * @return {function(this:T)}
	 */
	FunctionUtils.autoBind = function (obj, method)
	{
		return FunctionUtils.bindToObject(obj[method], obj);
	};

	/**
	 * @param {!Object} thi$ Should always be "this".
	 * @param {...*} var_args The rest of the arguments.
	 * @suppress {es5Strict}
	 */
	FunctionUtils.base2 = function (thi$, var_args)
	{
		var args = arguments;
		var caller = args.callee.caller;
		while (caller && !caller.superClass_)
		{
			caller = caller.caller;
		}
		if (caller.superClass_)
		{
			caller.superClass_[constants.APPLY](thi$, sc.core.ArrayUtils.copy(args, 1, -1));
		}
	};

	/**
	 * @param {!Object} thi$ Should always be "this".
	 * @param {?Array=} args The arguments.
	 */
	FunctionUtils.base = function (thi$, args)
	{
		thi$.superClass_[constants.APPLY](thi$, args || []);
	};

	/**
	 * @this {?}
	 * @param {Function} func
	 * @param {Array} var_args
	 * @return {Function}
	 */
	FunctionUtils.bindDefaultArguments = function (func, var_args)
	{
		/*var args = sc.core.ArrayUtils.concat([0], var_args);
		 return func[Functions.BIND].apply(func, args);*/
		return function ()
		{
			var args = sc.core.ArrayUtils.concat([], var_args, sc.core.ArrayUtils.slice(arguments, 0));
			return func[constants.APPLY](0, args);
		}
	};

	/**
	 * @this {?}
	 * @param {Function} func
	 * @param {T} obj
	 * @return {function(this:T)}
	 * @template T
	 */
	FunctionUtils.bindToObject = function (func, obj)
	{
		return func.bind(obj);
	};

	/**
	 * @return {function (new:?)}
	 */
	FunctionUtils.createEmptyFunction = function ()
	{
		return /** @type {function (new:?)} */(new FUNCTION());
	};

	/**
	 *
	 * @param {function(new:?)} host
	 * @param {Object} prototypeObj
	 */
	FunctionUtils.createPrototype = function (host, prototypeObj)
	{
		host.prototype = prototypeObj;
	};

	/**
	 *
	 * @param {Object} self
	 * @param {?Object=} host
	 * @return {function(string, ?Array=):Function}
	 */
	FunctionUtils.createSelfReturnBoundFunction = function (self, host)
	{
		/*function autoReturn(method)
		 {
		 var args = sc.collections.ArrayUtils.slice(arguments, 1);
		 var obj = host || self;
		 obj[method].apply(obj, args);
		 return self;
		 }*/
		function autoReturn(method, args)
		{
			//var theArgs = sc.collections.ArrayUtils.slice(arguments, 1);
			var theArgs = sc.core.ArrayUtils.slice(args, 0);
			var obj = host || self;
			obj[method][constants.APPLY](obj, theArgs);
			return self;
		}

		return (/**
		 * @param {string} method
		 *
		 * @return {Function}
		 */function (method)
		{
			return function ()
			{
				var theArgs = sc.core.ArrayUtils.slice(arguments, 0);
				return autoReturn(method, theArgs);
			}
		});
	};

	/**
	 *
	 * @this {?}
	 * @template H,R
	 *
	 * @param {function(...[?]):R} func
	 * @param {H=} obj
	 * @param {Array=} args
	 *
	 * @return {R}
	 */
	FunctionUtils.forwardCall = function (func, obj, args)
	{
		return func[constants.APPLY](obj, args);
	};

	/**
	 *
	 * @this {?}
	 * @template H,R
	 *
	 * @param {function(...[?]):R} func
	 * @param {H=} obj
	 * @param {...?} var_args
	 *
	 * @return {R}
	 */
	FunctionUtils.invoke = function (func, obj, var_args)
	{
		//var args = sc.core.ArrayUtils.slice(arguments, 2);
		return FunctionUtils.forwardCall(func, obj, sc.core.ArrayUtils.slice(arguments, 2));
	};

	/**
	 *
	 * @param {function(number=, number=):?} func
	 * @param {number=} times
	 */
	FunctionUtils.repeat = function (func, times)
	{
		times = times || 1;
		for (var count = 0; count < times; count++)
		{
			func(count, times);
		}
	};
});
