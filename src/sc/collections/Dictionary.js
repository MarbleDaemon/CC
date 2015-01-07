goog.require("sc.constants");
goog.require("sc.globals");
goog.require("sc.core.ObjectUtils");
goog.require("sc.core.Types");
goog.require("sc.core.Utils");

goog.provide("sc.collections.Dictionary");
goog.provide("sc.collections.EntryList");
goog.provide("sc.collections.HashEntry");
goog.scope(function ()
{
	var constants = sc.constants;
	var globals = sc.globals;

	var FunctionUtils = sc.core.FunctionUtils;
	var ObjectUtils = sc.core.ObjectUtils;
	var Types = sc.core.Types;

	var computeHashCode = function (obj)
	{
		if (obj === null) return Types.NULL;
		if (obj === undefined) return Types.UNDEFINED;

		return (typeof obj[constants.TO_STRING] === Types.FUNCTION)
			? obj[constants.TO_STRING]()
			: globals.objectToString.call(obj);
	};

	/**
	 * LinkedList for Dictionary
	 *
	 * @constructor
	 * @template Key, Value
	 *
	 * @param {Key} key
	 * @param {Value} value
	 */
	sc.collections.HashEntry = function (key, value)
	{
		/**
		 * @type {Key}
		 */
		this.key = key;

		/**
		 * @type {Value}
		 */
		this.value = value;

		/**
		 *
		 * @type {sc.collections.HashEntry<Key, Value>}
		 */
		this.previousEntry = null;

		/**
		 *
		 * @type {sc.collections.HashEntry<Key, Value>}
		 */
		this.nextEntry = null;
	};

	/**
	 * @constructor
	 * @template Key, Value
	 */
	sc.collections.EntryList = function ()
	{
		/**
		 *
		 * @type {sc.collections.HashEntry<Key, Value>}
		 */
		this.firstEntry = null;

		/**
		 *
		 * @type {sc.collections.HashEntry<Key, Value>}
		 */
		this.lastEntry = null;
	};

	sc.collections.EntryList.prototype =
	{
		/**
		 *
		 * @param {sc.collections.HashEntry<Key, Value>} entry
		 */
		addLast: function (entry)
		{
			if (this.lastEntry != null)
			{
				this.lastEntry.nextEntry = entry;
				entry.previousEntry = this.lastEntry;
				this.lastEntry = entry;
			}
			else this.firstEntry = this.lastEntry = entry;
		},

		/**
		 *
		 * @param {sc.collections.HashEntry<Key, Value>} entry
		 * @param {sc.collections.HashEntry<Key, Value>} newEntry
		 */
		replace: function (entry, newEntry)
		{
			if (entry.previousEntry != null)
			{
				entry.previousEntry.nextEntry = newEntry;
				newEntry.previousEntry = entry.previousEntry;
			}
			else this.firstEntry = newEntry;

			if (entry.nextEntry != null)
			{
				entry.nextEntry.previousEntry = newEntry;
				newEntry.nextEntry = entry.nextEntry;
			}
			else this.lastEntry = newEntry;
		},

		/**
		 *
		 * @param {sc.collections.HashEntry<Key, Value>} entry
		 */
		remove: function (entry)
		{
			if (entry.previousEntry != null) entry.previousEntry.nextEntry = entry.nextEntry;
			else this.firstEntry = entry.nextEntry;

			if (entry.nextEntry != null) entry.nextEntry.previousEntry = entry.previousEntry;
			else this.lastEntry = entry.previousEntry;
		}
	};

	/**
	 *
	 * @constructor
	 * @template Key, Value
	 *
	 * @param {?Function=} compareSelector
	 */
	sc.collections.Dictionary = goog.defineClass(null, {
		constructor: function (compareSelector)
		{
			/**
			 *
			 * @type {number}
			 */
			this.countField = 0;

			/**
			 *
			 * @type {sc.collections.EntryList<Key, Value>}
			 */
			this.entryList = new sc.collections.EntryList();

			/**
			 *
			 * @type {Object<string, Array<sc.collections.HashEntry<Key, Value>>>}
			 */
			this.buckets = {}; // as Dictionary<string,List<object>>

			/**
			 *
			 * @type {Function}
			 */
			this.compareSelector = (compareSelector == null) ? FunctionUtils.IDENTITY : compareSelector;
		},

		/**
		 *
		 * @param {Key} key
		 * @param {Value} value
		 *
		 * @returns {sc.collections.Dictionary}
		 */
		add: function (key, value)
		{
			var compareKey = this.compareSelector(key);
			var hash = computeHashCode(compareKey);

			/**
			 * @type {sc.collections.HashEntry<Key, Value>}
			 */
			var entry = new sc.collections.HashEntry(key, value);

			if (ObjectUtils.hasProperty(this.buckets, hash))
			{
				/**
				 * @type {Array<sc.collections.HashEntry<Key, Value>>}
				 */
				var array = this.buckets[hash];
				for (var i = 0; i < array.length; i++)
				{
					if (this.compareSelector(array[i].key) === compareKey)
					{
						this.entryList.replace(array[i], entry);
						array[i] = entry;
						return this;
					}
				}
				array.push(entry);
			}
			else
			{
				this.buckets[hash] = [entry];
			}
			this.countField++;
			this.entryList.addLast(entry);

			return this;
		},

		/**
		 *
		 * @param {Key} key
		 *
		 * @return {boolean}
		 */
		contains: function (key)
		{
			var compareKey = this.compareSelector(key);
			var hash = computeHashCode(compareKey);
			if (!ObjectUtils.hasProperty(this.buckets, hash)) return false;

			var array = this.buckets[hash];
			for (var i = 0; i < array.length; i++)
			{
				if (this.compareSelector(array[i].key) === compareKey) return true;
			}
			return false;
		},

		/**
		 *
		 */
		clear: function ()
		{
			this.countField = 0;
			this.buckets = {};
			this.entryList = new sc.collections.EntryList();
		},

		/**
		 *
		 * @return {number}
		 */
		count: function ()
		{
			return this.countField;
		},

		/**
		 *
		 * @param {Key} key
		 *
		 * @return {Value}
		 */
		get: function (key)
		{
			var compareKey = this.compareSelector(key);
			var hash = computeHashCode(compareKey);
			if (!ObjectUtils.hasProperty(this.buckets, hash)) return undefined;

			var array = this.buckets[hash];
			for (var i = 0; i < array.length; i++)
			{
				var entry = array[i];
				if (this.compareSelector(entry.key) === compareKey)
				{
					return entry.value;
				}
			}
			return undefined;
		},

		/**
		 *
		 * @param {Key} key
		 */
		remove: function (key)
		{
			var compareKey = this.compareSelector(key);
			var hash = computeHashCode(compareKey);
			if (!ObjectUtils.hasProperty(this.buckets, hash)) return;

			/**
			 * @type {Array<sc.collections.HashEntry<Key, Value>>}
			 */
			var array = this.buckets[hash];
			for (var i = 0; i < array.length; i++)
			{
				if (this.compareSelector(array[i].key) === compareKey)
				{
					this.entryList.remove(array[i]);
					array.splice(i, 1);
					if (array.length == 0) delete this.buckets[hash];
					this.countField--;
					return;
				}
			}
		},

		/**
		 *
		 * @param {Key} key
		 * @param {Value} value
		 *
		 * @return {boolean}
		 */
		set: function (key, value)
		{
			var compareKey = this.compareSelector(key);
			var hash = computeHashCode(compareKey);
			if (ObjectUtils.hasProperty(this.buckets, hash))
			{
				var array = this.buckets[hash];
				for (var i = 0; i < array.length; i++)
				{
					if (this.compareSelector(array[i].key) === compareKey)
					{
						var newEntry = new sc.collections.HashEntry(key, value);
						this.entryList.replace(array[i], newEntry);
						array[i] = newEntry;
						return true;
					}
				}
			}
			return false;
		},

		/**
		 *
		 * @param {Object.<Key, Value>} values
		 *
		 * @return {sc.collections.Dictionary}
		 */
		setMany: function(values)
		{
			var thi$ = this;

			ObjectUtils.forEachItem(values, function(value, key)
			{
				thi$.set(key, value);
			});

			return this;
		}
	});
});