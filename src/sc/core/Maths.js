goog.require("sc.globals");
goog.require("sc.core.Utils");

goog.provide("sc.core.Maths");
goog.scope(function ()
{
	var Maths = sc.core.Maths;

	var MATH = sc.globals.Math;

	/**
	 * @type {function(number):number}
	 */
	Maths.abs = MATH.abs;
	/**
	 * @type {function(number):number}
	 */
	Maths.acos = MATH.acos;
	/**
	 * @type {function(number):number}
	 */
	Maths.asin = MATH.asin;
	/**
	 * @type {function(number):number}
	 */
	Maths.atan = MATH.atan;
	/**
	 * @type {function(number, number):number}
	 */
	Maths.atan2 = MATH.atan2;

	/**
	 *
	 * @param {number} num
	 * @param {number} num1
	 * @param {number} num2
	 * @param {?boolean=} exclude
	 *
	 * @return {boolean}
	 */
	Maths.between = function (num, num1, num2, exclude)
	{
		if (exclude)
		{
			return num1 < num2 ? ((num > num1) && (num < num2)) : ((num > num2) && (num < num1));
		}
		else
		{
			return num1 < num2 ? ((num >= num1) && (num <= num2)) : ((num >= num2) && (num <= num1));
		}
	};

	/**
	 * @type {function(number):number}
	 */
	Maths.ceil = MATH.ceil;
	/**
	 * @type {function(number):number}
	 */
	Maths.cos = MATH.cos;
	/**
	 * @const
	 * @type {number}
	 */
	Maths.E = MATH.E;
	/**
	 * @type {function(number):number}
	 */
	Maths.exp = MATH.exp;
	/**
	 * @type {function(number):number}
	 */
	Maths.floor = MATH.floor;
	/**
	 * @const
	 * @type {number}
	 */
	Maths.LN10 = MATH.LN10;
	/**
	 * @const
	 * @type {number}
	 */
	Maths.LN2 = MATH.LN2;
	/**
	 * @type {function(number):number}
	 */
	Maths.log = MATH.log;
	/**
	 * @const
	 * @type {number}
	 */
	Maths.LOG10E = MATH.LOG10E;
	/**
	 * @const
	 * @type {number}
	 */
	Maths.LOG2E = MATH.LOG2E;
	/**
	 * @type {function(...[number]):number}
	 */
	Maths.max = MATH.max;
	/**
	 * @type {function(...[number]):number}
	 */
	Maths.min = MATH.min;

	/**
	 *
	 * @param {number} degree
	 *
	 * @return {number}
	 */
	Maths.normalizeDegree = function(degree)
	{
		var result = degree % 360;
		if (result < 0)
		{
			result = 360 + result;
		}
		return result;
	};

	/**
	 * @const
	 * @type {number}
	 */
	Maths.PI = MATH.PI;
	/**
	 * @const
	 * @type {number}
	 */
	Maths.PI2 = Maths.PI * 2;

	/**
	 *
	 * @param {number} num
	 *
	 * @return {number}
	 */
	Maths.positiveOnly = function(num)
	{
		return num < 0? 0: num;
	};

	/**
	 * @type {function(number, number):number}
	 */
	Maths.pow = MATH.pow;
	/**
	 * @type {function():number}
	 */
	Maths.random = MATH.random;

	/**
	 *
	 * @param {number} percent
	 *
	 * @return {boolean}
	 */
	Maths.randomPercent = function (percent)
	{
		return Maths.random() * 100 <= percent;
	};

	/**
	 *
	 * @param {number} fromNum
	 * @param {number} toNum
	 *
	 * @return {number}
	 */
	Maths.randomRange = function (fromNum, toNum)
	{
		return Maths.random() * (toNum - fromNum) + fromNum;
	};

	/**
	 * @type {function(number):number}
	 */
	Maths.round = MATH.round;

	/**
	 *
	 * @param {number} num
	 * @param {?number=} decimal
	 *
	 * @return {number}
	 */
	Maths.roundTo = function (num, decimal)
	{
		var power = Maths.pow(10, decimal || 0);
		return Maths.round(num * power) / power;
	};

	/**
	 * @type {function(number):number}
	 */
	Maths.sin = MATH.sin;

	/**
	 *
	 * @param {number} num
	 *
	 * @return {number}
	 */
	Maths.sqr = function (num)
	{
		return num * num;
	};

	/**
	 * @type {function(number):number}
	 */
	Maths.sqrt = MATH.sqrt;

	/**
	 * @const
	 * @type {number}
	 */
	Maths.SQRT1_2 = MATH.SQRT1_2;
	/**
	 * @const
	 * @type {number}
	 */
	Maths.SQRT2 = MATH.SQRT2;

	/**
	 * @type {function(number):number}
	 */
	Maths.tan = MATH.tan;
})
;
