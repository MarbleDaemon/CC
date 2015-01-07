{
	goog.require("sc.constants");
	goog.require("sc.globals");

	goog.require("sc.core.ObjectUtils");
	goog.require("sc.core.Utils");
}
goog.provide("sc.collections.Collection");
goog.scope(function ()
{
	var constants = sc.constants;
	var globals = sc.globals;

	var FunctionUtils = sc.core.FunctionUtils;
	var ObjectUtils = sc.core.ObjectUtils;

	/**
	 * @constructor
	 * @template I
	 *
	 * @param {Array.<I>=} array
	 *
	 * @return {sc.collections.Collection.<I>}
	 */
	sc.collections.Collection = goog.defineClass(null, {
		/**
		 * @param {Array.<I>=} array
		 *
		 * @return {sc.collections.Collection.<I>}
		 */
		constructor: function (array)
		{
			/**
			 * @type {Array.<I>}
			 */
			this.data = globals.Array.apply(null, array || []);

			return this;
		},

		/**
		 *
		 * @param {I} item
		 *
		 * @return {sc.collections.Collection.<I>}
		 */
		add: function (item)
		{
			var data = this.data;
			data[data[constants.LENGTH]] = item;

			return this;
		},

		/**
		 *
		 * @template O
		 *
		 * @param {function(I, number=, Array.<I>=):O} convertFunction
		 *
		 * @return {sc.collections.Collection.<O>}
		 */
		convertTo: function (convertFunction)
		{
			var result = new sc.collections.Collection();

			this.doForEach(function (item, index, array)
			{
				result.add(convertFunction(item, index, array));
			});

			return result;
		},

		/**
		 *
		 * @param {function(I, number=, Array.<I>=):?} delegate
		 * @param {number=} fromIndex
		 *
		 * @return {sc.collections.Collection.<I>}
		 */
		doForEach: function (delegate, fromIndex)
		{
			var array = this.data;
			var len = array[constants.LENGTH];
			for (var index = (fromIndex || 0); index < len; index++)
			{
				if (delegate(array[index], index, array) === false)
				{
					break;
				}
			}

			return this;
		},

		/**
		 *
		 * @param {function(I, number=, Array.<I>=):boolean} filterFunction
		 *
		 * @return {sc.collections.Collection.<I>}
		 */
		filter: function (filterFunction)
		{
			return new sc.collections.Collection(this.data.filter(filterFunction));
		},

		/**
		 * @param {number} index
		 *
		 * @return {I}
		 */
		get: function (index)
		{
			return this.data[index];
		},

		/**
		 *
		 * @param {number} index
		 * @param {I} item
		 *
		 * @return {sc.collections.Collection.<I>}
		 */
		set: function (index, item)
		{
			this.data[index] = item;

			return this;
		}
	});

	/**
	 * @template I
	 *
	 * @param {function(number=, number=):I} createFunction
	 * @param {number=} times
	 *
	 * @return {sc.collections.Collection.<I>}
	 */
	sc.collections.create = function (createFunction, times)
	{
		var result = new sc.collections.Collection();

		FunctionUtils.repeat(function (count, total)
		{
			result.add(createFunction(count, total));
		}, times);

		return result;
	};

	/**
	 * @template I
	 *
	 * @param {(Array.<I>|sc.collections.Collection.<I>)=} collection
	 *
	 * @return {sc.collections.Collection.<I>}
	 */
	sc.collections.fromCollection = function (collection)
	{
		var array = /** @type {Array} */(ObjectUtils.instanceOf(collection, sc.collections.Collection) ? collection.data: collection);
		return new sc.collections.Collection(array);
	};
});