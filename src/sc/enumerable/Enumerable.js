goog.require("sc.globals");
goog.require("sc.core.ObjectUtils");
goog.require("sc.core.Utils");
goog.require("sc.enumerable.DefaultEnumerator");

goog.provide("sc.enumerable.Enumerable");
goog.scope(function ()
{
	var globals = sc.globals;
	var objects = globals.objects;

	var ArrayUtils = sc.core.ArrayUtils;
	var DefaultEnumerator = sc.enumerable.DefaultEnumerator;
	var FunctionUtils = sc.core.FunctionUtils;
	var ObjectUtils = sc.core.ObjectUtils;
	var Utils = sc.core.Utils;

	/**
	 * @constructor
	 * @implements {sc.enumerable.IEnumerable}
	 *
	 * @param {function():sc.enumerable.IEnumerator} getEnumerator
	 */
	sc.enumerable.Enumerable = function (getEnumerator)
	{
		/**
		 *
		 * @type {function(): sc.enumerable.IEnumerator}
		 */
		this.getEnumerator = getEnumerator;
	};

	sc.enumerable.Enumerable.prototype =
	{
		// Overload:function(func)
		// Overload:function(func, resultSelector<element>)
		// Overload:function(func, resultSelector<element, nestLevel>)
		/**
		 *
		 * @param {?(Function|string)} expression
		 * @param {?(Function|string)=} resultSelector
		 * @return {sc.enumerable.Enumerable}
		 */
		traverseBreadthFirst: function (expression, resultSelector)
		{
			/**
			 * @type {sc.enumerable.Enumerable}
			 */
			var source = this;

			expression = Utils.createLambda(expression);
			resultSelector = Utils.createLambda(resultSelector);

			return new sc.enumerable.Enumerable(function ()
			{
				/**
				 * @type {sc.enumerable.IEnumerator}
				 */
				var enumerator;
				var nestLevel = 0;
				var buffer = [];

				return new DefaultEnumerator(
					function ()
					{
						enumerator = source.getEnumerator();
					},
					function ()
					{
						while (true)
						{
							if (enumerator.moveNext())
							{
								buffer.push(enumerator.current());
								return this.yieldReturn(resultSelector(enumerator.current(), nestLevel));
							}

							var next = sc.enumerable.Enumerable.from(buffer).selectMany(function (x)
							{
								return expression(x);
							});

							if (!next.any())
							{
								return false;
							}
							else
							{
								nestLevel++;
								buffer = [];
								ObjectUtils.dispose(enumerator);
								enumerator = next.getEnumerator();
							}
						}
					},
					function ()
					{
						ObjectUtils.dispose(enumerator);
					});
			});
		},

		// Overload:function(func)
		// Overload:function(func, resultSelector<element>)
		// Overload:function(func, resultSelector<element, nestLevel>)
		/**
		 *
		 * @param {?(Function|string)} expression
		 * @param {?(Function|string)=} resultSelector
		 * @return {sc.enumerable.Enumerable}
		 */
		traverseDepthFirst:   function (expression, resultSelector)
		{
			/**
			 * @type {sc.enumerable.Enumerable}
			 */
			var source = this;

			expression = Utils.createLambda(expression);
			resultSelector = Utils.createLambda(resultSelector);

			return new sc.enumerable.Enumerable(function ()
			{
				/**
				 *
				 * @type {Array<sc.enumerable.IEnumerator>}
				 */
				var enumeratorStack = [];
				/**
				 * @type {sc.enumerable.IEnumerator}
				 */
				var enumerator;

				return new DefaultEnumerator(
					function ()
					{
						enumerator = source.getEnumerator();
					},
					function ()
					{
						while (true)
						{
							if (enumerator.moveNext())
							{
								var value = resultSelector(enumerator.current(), enumeratorStack.length);
								enumeratorStack.push(enumerator);
								enumerator = sc.enumerable.Enumerable.from(expression(enumerator.current())).getEnumerator();
								return this.yieldReturn(value);
							}

							if (enumeratorStack.length <= 0) return false;
							ObjectUtils.dispose(enumerator);
							enumerator = enumeratorStack.pop();
						}
					},
					function ()
					{
						try
						{
							ObjectUtils.dispose(enumerator);
						}
						finally
						{
							sc.enumerable.Enumerable.from(enumeratorStack).forEach(/**
							 *
							 * @param {sc.enumerable.IEnumerator} enumerator
							 */function (enumerator)
							{
								enumerator.dispose();
							});
						}
					});
			});
		},

		/**
		 *
		 * @return {sc.enumerable.Enumerable}
		 */
		flatten: function ()
		{
			/**
			 * @type {sc.enumerable.Enumerable}
			 */
			var source = this;

			return new sc.enumerable.Enumerable(function ()
			{
				/**
				 * @type {sc.enumerable.IEnumerator}
				 */
				var enumerator;

				/**
				 * @type {sc.enumerable.IEnumerator}
				 */
				var middleEnumerator = null;

				return new DefaultEnumerator(
					function ()
					{
						enumerator = source.getEnumerator();
					},
					/**
					 * @this {sc.enumerable.Yielder}
					 *
					 * @return {boolean}
					 */function ()
					{
						while (true)
						{
							if (middleEnumerator != null)
							{
								if (middleEnumerator.moveNext())
								{
									return this.yieldReturn(middleEnumerator.current());
								}
								else
								{
									middleEnumerator = null;
								}
							}

							if (enumerator.moveNext())
							{
								if (enumerator.current() instanceof objects.ARRAY)
								{
									ObjectUtils.dispose(middleEnumerator);
									middleEnumerator = sc.enumerable.Enumerable.from(enumerator.current())
										.selectMany(FunctionUtils.IDENTITY)
										.flatten()
										.getEnumerator();
									continue;
								}
								else
								{
									return this.yieldReturn(enumerator.current());
								}
							}

							return false;
						}
					},
					function ()
					{
						try
						{
							ObjectUtils.dispose(enumerator);
						}
						finally
						{
							ObjectUtils.dispose(middleEnumerator);
						}
					});
			});
		},

		/**
		 *
		 * @param {?(Function|string)} selector
		 * @return {sc.enumerable.Enumerable}
		 */
		pairwise:   function (selector)
		{
			/**
			 * @type {sc.enumerable.Enumerable}
			 */
			var source = this;

			selector = Utils.createLambda(selector);

			return new sc.enumerable.Enumerable(function ()
			{
				/**
				 * @type {sc.enumerable.IEnumerator|*}
				 */
				var enumerator;

				return new DefaultEnumerator(
					function ()
					{
						enumerator = source.getEnumerator();
						enumerator.moveNext();
					},
					function ()
					{
						var prev = enumerator.current();
						return (enumerator.moveNext())
							? this.yieldReturn(selector(prev, enumerator.current()))
							: false;
					},
					function ()
					{
						ObjectUtils.dispose(enumerator);
					});
			});
		},

		// Overload:function(func)
		// Overload:function(seed,func<value,element>)
		/**
		 *
		 * @param {?(Function|string)} seed
		 * @param {?(Function|string)=} expression
		 * @return {sc.enumerable.Enumerable}
		 */
		scan:       function (seed, expression)
		{
			/**
			 * @type {boolean}
			 */
			var usingSeed;
			if (expression == null)
			{
				expression = Utils.createLambda(seed); // arguments[0]
				usingSeed = false;
			}
			else
			{
				expression = Utils.createLambda(expression);
				usingSeed = true;
			}

			/**
			 * @type {sc.enumerable.Enumerable}
			 */
			var source = this;

			return new sc.enumerable.Enumerable(function ()
			{
				/**
				 * @type {sc.enumerable.IEnumerator|*}
				 */
				var enumerator;
				var value;
				var isFirst = true;

				return new DefaultEnumerator(
					function ()
					{
						enumerator = source.getEnumerator();
					},
					function ()
					{
						if (isFirst)
						{
							isFirst = false;
							if (!usingSeed)
							{
								if (enumerator.moveNext())
								{
									return this.yieldReturn(value = enumerator.current());
								}
							}
							else
							{
								return this.yieldReturn(value = seed);
							}
						}

						return (enumerator.moveNext())
							? this.yieldReturn(value = expression(value, enumerator.current()))
							: false;
					},
					function ()
					{
						ObjectUtils.dispose(enumerator);
					});
			});
		},

		// Overload:function(selector<element>)
		// Overload:function(selector<element,index>)
		/**
		 *
		 * @param {?(Function|string)} selector
		 *
		 * @return {sc.enumerable.Enumerable|sc.enumerable.WhereSelectEnumerable}
		 */
		select:     function (selector)
		{
			selector = Utils.createLambda(selector);

			if (selector.length <= 1)
			{
				return new sc.enumerable.WhereSelectEnumerable(this, null, selector);
			}
			else
			{
				/**
				 * @type {sc.enumerable.Enumerable}
				 */
				var source = this;

				return new sc.enumerable.Enumerable(function ()
				{
					/**
					 * @type {sc.enumerable.IEnumerator|*}
					 */
					var enumerator;
					var index = 0;

					return new IEnumerator(
						function ()
						{
							enumerator = source.getEnumerator();
						},
						function ()
						{
							return (enumerator.moveNext())
								? this.yieldReturn(selector(enumerator.current(), index++))
								: false;
						},
						function ()
						{
							ObjectUtils.dispose(enumerator);
						});
				});
			}
		},

		// Overload:function(collectionSelector<element>)
		// Overload:function(collectionSelector<element,index>)
		// Overload:function(collectionSelector<element>,resultSelector)
		// Overload:function(collectionSelector<element,index>,resultSelector)
		/**
		 *
		 * @param {?function(?,number=)|string} collectionSelector
		 * @param {?Function|string=} resultSelector
		 * @returns {sc.enumerable.Enumerable}
		 */
		selectMany: function (collectionSelector, resultSelector)
		{
			/**
			 * @type {sc.enumerable.Enumerable}
			 */

			var source = this;
			/**
			 * @type {Function}
			 */
			var collectionSelectorFunc = Utils.createLambda(collectionSelector);
			if (resultSelector == null) resultSelector = function (a, b)
			{
				return b;
			};
			var resultSelectorFunc = Utils.createLambda(resultSelector);

			return new sc.enumerable.Enumerable(function ()
			{
				/**
				 * @type {sc.enumerable.IEnumerator|*}
				 */
				var enumerator;
				/**
				 * @type {sc.enumerable.IEnumerator|*}
				 */
				var middleEnumerator = ObjectUtils.UNDEFINED;
				var index = 0;

				return new IEnumerator(
					function ()
					{
						enumerator = source.getEnumerator();
					},
					function ()
					{
						if (middleEnumerator === undefined)
						{
							if (!enumerator.moveNext()) return false;
						}
						do {
							if (middleEnumerator == null)
							{
								var middleSeq = collectionSelectorFunc(enumerator.current(), index++);
								middleEnumerator = sc.enumerable.Enumerable.from(middleSeq).getEnumerator();
							}
							if (middleEnumerator.moveNext())
							{
								return this.yieldReturn(resultSelectorFunc(enumerator.current(), middleEnumerator.current()));
							}
							ObjectUtils.dispose(middleEnumerator);
							middleEnumerator = null;
						} while (enumerator.moveNext());

						return false;
					},
					function ()
					{
						try
						{
							ObjectUtils.dispose(enumerator);
						}
						finally
						{
							ObjectUtils.dispose(middleEnumerator);
						}
					});
			});
		},

		// Overload:function(predicate<element>)
		// Overload:function(predicate<element,index>)
		/**
		 *
		 * @param {?function(?,number=):boolean|string|Object} predicate
		 * @returns {sc.enumerable.Enumerable|sc.enumerable.WhereEnumerable}
		 */
		where:      function (predicate)
		{
			if (predicate.length <= 1)
			{
				return new sc.enumerable.WhereEnumerable(this, predicate);
			}
			else
			{
				var predicateExpression = /** @type {?(Function|string)} */ (predicate);
				/**
				 * @type {?(Function|string)}
				 */
				var predicateFunc = Utils.createLambda(predicate);
				/**
				 * @type {sc.enumerable.Enumerable}
				 */
				var source = this;

				return new sc.enumerable.Enumerable(function ()
				{
					/**
					 * @type {sc.enumerable.IEnumerator|*}
					 */
					var enumerator;
					var index = 0;

					return new IEnumerator(
						function ()
						{
							enumerator = source.getEnumerator();
						},
						function ()
						{
							while (enumerator.moveNext())
							{
								if (predicateFunc(enumerator.current(), index++))
								{
									return this.yieldReturn(enumerator.current());
								}
							}
							return false;
						},
						function ()
						{
							ObjectUtils.dispose(enumerator);
						});
				});
			}
		},


		// Overload:function(selector<element>)
		// Overload:function(selector<element,index>)
		/**
		 *
		 * @param {?(Function|string)} selector
		 * @return {sc.enumerable.Enumerable}
		 */
		choose:     function (selector)
		{
			selector = Utils.createLambda(selector);
			var source = this;

			return new sc.enumerable.Enumerable(function ()
			{
				/**
				 * @type {sc.enumerable.IEnumerator|*}
				 */
				var enumerator;
				var index = 0;

				return new DefaultEnumerator(
					function ()
					{
						enumerator = source.getEnumerator();
					},
					function ()
					{
						while (enumerator.moveNext())
						{
							var result = selector(enumerator.current(), index++);
							if (result != null)
							{
								return this.yieldReturn(result);
							}
						}
						return this.yieldBreak();
					},
					function ()
					{
						ObjectUtils.dispose(enumerator);
					});
			});
		},

		/**
		 * @param type
		 * @return {sc.enumerable.Enumerable|sc.enumerable.WhereEnumerable}
		 */
		ofType: function (type)
		{
			var typeName;
			switch (type)
			{
				case Number:
					typeName = Types.NUMBER;
					break;
				case objects.STRING:
					typeName = Types.STRING;
					break;
				case Boolean:
					typeName = Types.BOOLEAN;
					break;
				case objects.FUNCTION:
					typeName = Types.FUNCTION;
					break;
				default:
					typeName = null;
					break;
			}
			return (typeName === null)
				? this.where(function (x)
			{
				return x instanceof type;
			})
				: this.where(function (x)
			{
				return typeof x === typeName;
			});
		},

		// mutiple arguments, lastEntry one is selector, others are enumerable
		/**
		 *
		 * @param {...?} var_args
		 *
		 * @return {sc.enumerable.Enumerable}
		 */
		zip:    function (var_args)
		{
			var args = arguments;
			var selector = Utils.createLambda(args[args.length - 1]);

			var source = this;
			// optimized case:argument is 2
			if (args.length == 2)
			{
				var second = args[0];

				return new sc.enumerable.Enumerable(function ()
				{
					/**
					 * @type {sc.enumerable.IEnumerator}
					 */
					var firstEnumerator;
					/**
					 * @type {sc.enumerable.IEnumerator}
					 */
					var secondEnumerator;
					var index = 0;

					return new DefaultEnumerator(
						function ()
						{
							firstEnumerator = source.getEnumerator();
							secondEnumerator = sc.enumerable.Enumerable.from(second).getEnumerator();
						},
						function ()
						{
							if (firstEnumerator.moveNext() && secondEnumerator.moveNext())
							{
								return this.yieldReturn(selector(firstEnumerator.current(), secondEnumerator.current(), index++));
							}
							return false;
						},
						function ()
						{
							try
							{
								ObjectUtils.dispose(firstEnumerator);
							} finally
							{
								ObjectUtils.dispose(secondEnumerator);
							}
						});
				});
			}
			else
			{
				return new sc.enumerable.Enumerable(function ()
				{
					/**
					 * @type {Array.<number>|sc.enumerable.Enumerable|sc.enumerable.ArrayEnumerable}
					 */
					var enumerators;
					var index = 0;

					return new DefaultEnumerator(
						function ()
						{
							/**
							 * @type {Array<sc.enumerable.IEnumerator>}
							 */
							var array = sc.enumerable.Enumerable.make(source)
								.concat(sc.enumerable.Enumerable.from(args).takeExceptLast().select(sc.enumerable.Enumerable.from))
								.select(function (x)
								{
									return x.getEnumerator()
								})
								.toArray();
							enumerators = sc.enumerable.Enumerable.from(array);
						},
						function ()
						{
							if (enumerators.all(function (x)
							{
								return x.moveNext()
							}))
							{
								/**
								 * @type {Array<sc.enumerable.IEnumerator>}
								 */
								var array = enumerators
									.select(function (x)
									{
										return x.current()
									})
									.toArray();
								ArrayUtils.push(array, index++);
								return this.yieldReturn(selector.apply(null, array));
							}
							else
							{
								return this.yieldBreak();
							}
						},
						function ()
						{
							Enumerable.from(enumerators).forEach(ObjectUtils.dispose);
						});
				});
			}
		},

		/**
		 *
		 * @param {...?} var_args
		 *
		 * @return {sc.enumerable.Enumerable}
		 */
		merge:     function (var_args)
		{
			var args = arguments;
			var source = this;

			return new sc.enumerable.Enumerable(function ()
			{
				/**
				 * @type {Array<sc.enumerable.IEnumerator>}
				 */
				var enumerators;
				var index = -1;

				return new DefaultEnumerator(
					function ()
					{
						enumerators = sc.enumerable.Enumerable.make(source)
							.concat(sc.enumerable.Enumerable.from(args).select(Enumerable.from))
							.select(/**
							 * @param {sc.enumerable.Enumerable} x
							 * @return {sc.enumerable.IEnumerator}
							 */function (x)
							{
								return x.getEnumerator()
							})
							.toArray();
					},
					function ()
					{
						while (enumerators.length > 0)
						{
							index = (index >= enumerators.length - 1) ? 0 : index + 1;

							/**
							 * @type {sc.enumerable.IEnumerator}
							 */
							var enumerator = enumerators[index];
							if (enumerator.moveNext())
							{
								return this.yieldReturn(enumerator.current());
							}
							else
							{
								enumerator.dispose();
								ArrayUtils.splice(enumerators, index--, 1);
							}
						}
						return this.yieldBreak();
					},
					function ()
					{
						sc.enumerable.Enumerable.from(enumerators).forEach(ObjectUtils.dispose);
					});
			});
		},

		/* Join Methods */

		// Overload:function (inner, outerKeySelector, innerKeySelector, resultSelector)
		// Overload:function (inner, outerKeySelector, innerKeySelector, resultSelector, compareSelector)
		/**
		 *
		 * @param inner
		 * @param {?(Function|string)} outerKeySelector
		 * @param {?(Function|string)} innerKeySelector
		 * @param {?(Function|string)} resultSelector
		 * @param {?(Function|string)=} compareSelector
		 *
		 * @return {sc.enumerable.Enumerable}
		 */
		join:      function (inner, outerKeySelector, innerKeySelector, resultSelector, compareSelector)
		{
			outerKeySelector = Utils.createLambda(outerKeySelector);
			innerKeySelector = Utils.createLambda(innerKeySelector);
			resultSelector = Utils.createLambda(resultSelector);
			compareSelector = Utils.createLambda(compareSelector);

			/**
			 * @type {sc.enumerable.Enumerable}
			 */
			var source = this;

			return new sc.enumerable.Enumerable(function ()
			{
				/**
				 * @type {sc.enumerable.IEnumerator}
				 */
				var outerEnumerator;
				var lookup;
				/**
				 * @type {?}
				 */
				var innerElements = null;
				var innerCount = 0;

				return new DefaultEnumerator(
					function ()
					{
						outerEnumerator = source.getEnumerator();
						lookup = sc.enumerable.Enumerable.from(inner).toLookup(innerKeySelector, FunctionUtils.IDENTITY, compareSelector);
					},
					function ()
					{
						while (true)
						{
							if (innerElements != null)
							{
								var innerElement = innerElements[innerCount++];
								if (innerElement !== undefined)
								{
									return this.yieldReturn(resultSelector(outerEnumerator.current(), innerElement));
								}

								innerElement = null;
								innerCount = 0;
							}

							if (outerEnumerator.moveNext())
							{
								var key = outerKeySelector(outerEnumerator.current());
								innerElements = lookup.get(key).toArray();
							}
							else
							{
								return false;
							}
						}
					},
					function ()
					{
						ObjectUtils.dispose(outerEnumerator);
					});
			});
		},

		// Overload:function (inner, outerKeySelector, innerKeySelector, resultSelector)
		// Overload:function (inner, outerKeySelector, innerKeySelector, resultSelector, compareSelector)
		/**
		 *
		 * @param inner
		 * @param {?(Function|string)} outerKeySelector
		 * @param {?(Function|string)} innerKeySelector
		 * @param {?(Function|string)} resultSelector
		 * @param {?(Function|string)=} compareSelector
		 *
		 * @return {sc.enumerable.Enumerable}
		 */
		groupJoin: function (inner, outerKeySelector, innerKeySelector, resultSelector, compareSelector)
		{
			outerKeySelector = Utils.createLambda(outerKeySelector);
			innerKeySelector = Utils.createLambda(innerKeySelector);
			resultSelector = Utils.createLambda(resultSelector);
			compareSelector = Utils.createLambda(compareSelector);
			var source = this;

			return new sc.enumerable.Enumerable(function ()
			{
				var enumerator = source.getEnumerator();
				var lookup = null;

				return new IEnumerator(
					function ()
					{
						enumerator = source.getEnumerator();
						lookup = sc.enumerable.Enumerable.from(inner).toLookup(innerKeySelector, Functions.IDENTITY, compareSelector);
					},
					function ()
					{
						if (enumerator.moveNext())
						{
							var innerElement = lookup.get(outerKeySelector(enumerator.current()));
							return this.yieldReturn(resultSelector(enumerator.current(), innerElement));
						}
						return false;
					},
					function ()
					{
						ObjectUtils.dispose(enumerator);
					});
			});
		},

		/* Set Methods */

		all: function (predicate)
		{
			predicate = Utils.createLambda(predicate);

			var result = true;
			this.forEach(function (x)
			{
				if (!predicate(x))
				{
					result = false;
					return false; // break
				}
			});
			return result;
		},

// Overload:function()
// Overload:function(predicate)
		any: function (predicate)
		{
			predicate = Utils.createLambda(predicate);

			var enumerator = this.getEnumerator();
			try
			{
				if (arguments.length == 0) return enumerator.moveNext(); // case:function()

				while (enumerator.moveNext()) // case:function(predicate)
				{
					if (predicate(enumerator.current())) return true;
				}
				return false;
			}
			finally
			{
				Utils.dispose(enumerator);
			}
		},

		isEmpty: function ()
		{
			return !this.any();
		},

// multiple arguments
		concat:  function ()
		{
			var source = this;

			if (arguments.length == 1)
			{
				var second = arguments[0];

				return new Enumerable(function ()
				{
					var firstEnumerator;
					var secondEnumerator;

					return new IEnumerator(
						function ()
						{
							firstEnumerator = source.getEnumerator();
						},
						function ()
						{
							if (secondEnumerator == null)
							{
								if (firstEnumerator.moveNext()) return this.yieldReturn(firstEnumerator.current());
								secondEnumerator = Enumerable.from(second).getEnumerator();
							}
							if (secondEnumerator.moveNext()) return this.yieldReturn(secondEnumerator.current());
							return false;
						},
						function ()
						{
							try
							{
								Utils.dispose(firstEnumerator);
							}
							finally
							{
								Utils.dispose(secondEnumerator);
							}
						});
				});
			}
			else
			{
				var args = arguments;

				return new Enumerable(function ()
				{
					var enumerators;

					return new IEnumerator(
						function ()
						{
							enumerators = Enumerable.make(source)
								.concat(Enumerable.from(args).select(Enumerable.from))
								.select(function (x)
								{
									return x.getEnumerator()
								})
								.toArray();
						},
						function ()
						{
							while (enumerators.length > 0)
							{
								var enumerator = enumerators[0];

								if (enumerator.moveNext())
								{
									return this.yieldReturn(enumerator.current());
								}
								else
								{
									enumerator.dispose();
									enumerators.splice(0, 1);
								}
							}
							return this.yieldBreak();
						},
						function ()
						{
							Enumerable.from(enumerators).forEach(Utils.dispose);
						});
				});
			}
		},

		insert: function (index, second)
		{
			var source = this;

			return new Enumerable(function ()
			{
				var firstEnumerator;
				var secondEnumerator;
				var count = 0;
				var isEnumerated = false;

				return new IEnumerator(
					function ()
					{
						firstEnumerator = source.getEnumerator();
						secondEnumerator = Enumerable.from(second).getEnumerator();
					},
					function ()
					{
						if (count == index && secondEnumerator.moveNext())
						{
							isEnumerated = true;
							return this.yieldReturn(secondEnumerator.current());
						}
						if (firstEnumerator.moveNext())
						{
							count++;
							return this.yieldReturn(firstEnumerator.current());
						}
						if (!isEnumerated && secondEnumerator.moveNext())
						{
							return this.yieldReturn(secondEnumerator.current());
						}
						return false;
					},
					function ()
					{
						try
						{
							Utils.dispose(firstEnumerator);
						}
						finally
						{
							Utils.dispose(secondEnumerator);
						}
					});
			});
		},

		alternate: function (alternateValueOrSequence)
		{
			var source = this;

			return new Enumerable(function ()
			{
				var buffer;
				var enumerator;
				var alternateSequence;
				var alternateEnumerator;

				return new IEnumerator(
					function ()
					{
						if (alternateValueOrSequence instanceof Array || alternateValueOrSequence.getEnumerator != null)
						{
							alternateSequence = Enumerable.from(Enumerable.from(alternateValueOrSequence).toArray()); // freeze
						}
						else
						{
							alternateSequence = Enumerable.make(alternateValueOrSequence);
						}
						enumerator = source.getEnumerator();
						if (enumerator.moveNext()) buffer = enumerator.current();
					},
					function ()
					{
						while (true)
						{
							if (alternateEnumerator != null)
							{
								if (alternateEnumerator.moveNext())
								{
									return this.yieldReturn(alternateEnumerator.current());
								}
								else
								{
									alternateEnumerator = null;
								}
							}

							if (buffer == null && enumerator.moveNext())
							{
								buffer = enumerator.current(); // hasNext
								alternateEnumerator = alternateSequence.getEnumerator();
								continue; // GOTO
							}
							else if (buffer != null)
							{
								var retVal = buffer;
								buffer = null;
								return this.yieldReturn(retVal);
							}

							return this.yieldBreak();
						}
					},
					function ()
					{
						try
						{
							Utils.dispose(enumerator);
						}
						finally
						{
							Utils.dispose(alternateEnumerator);
						}
					});
			});
		},

// Overload:function(value)
// Overload:function(value, compareSelector)
		contains:  function (value, compareSelector)
		{
			compareSelector = Utils.createLambda(compareSelector);
			var enumerator = this.getEnumerator();
			try
			{
				while (enumerator.moveNext())
				{
					if (compareSelector(enumerator.current()) === value) return true;
				}
				return false;
			}
			finally
			{
				Utils.dispose(enumerator);
			}
		},

		defaultIfEmpty: function (defaultValue)
		{
			var source = this;
			if (defaultValue === undefined) defaultValue = null;

			return new Enumerable(function ()
			{
				var enumerator;
				var isFirst = true;

				return new IEnumerator(
					function ()
					{
						enumerator = source.getEnumerator();
					},
					function ()
					{
						if (enumerator.moveNext())
						{
							isFirst = false;
							return this.yieldReturn(enumerator.current());
						}
						else if (isFirst)
						{
							isFirst = false;
							return this.yieldReturn(defaultValue);
						}
						return false;
					},
					function ()
					{
						Utils.dispose(enumerator);
					});
			});
		},

		// Overload:function()
		// Overload:function(compareSelector)
		distinct:       function (compareSelector)
		{
			return this.except(Enumerable.empty(), compareSelector);
		},

		distinctUntilChanged: function (compareSelector)
		{
			compareSelector = Utils.createLambda(compareSelector);
			var source = this;

			return new Enumerable(function ()
			{
				var enumerator;
				var compareKey;
				var initial;

				return new IEnumerator(
					function ()
					{
						enumerator = source.getEnumerator();
					},
					function ()
					{
						while (enumerator.moveNext())
						{
							var key = compareSelector(enumerator.current());

							if (initial)
							{
								initial = false;
								compareKey = key;
								return this.yieldReturn(enumerator.current());
							}

							if (compareKey === key)
							{
								continue;
							}

							compareKey = key;
							return this.yieldReturn(enumerator.current());
						}
						return this.yieldBreak();
					},
					function ()
					{
						Utils.dispose(enumerator);
					});
			});
		},

		// Overload:function(second)
		// Overload:function(second, compareSelector)
		except:               function (second, compareSelector)
		{
			compareSelector = Utils.createLambda(compareSelector);
			var source = this;

			return new Enumerable(function ()
			{
				var enumerator;
				var keys;

				return new IEnumerator(
					function ()
					{
						enumerator = source.getEnumerator();
						keys = new Dictionary(compareSelector);
						Enumerable.from(second).forEach(function (key)
						{
							keys.add(key);
						});
					},
					function ()
					{
						while (enumerator.moveNext())
						{
							var current = enumerator.current();
							if (!keys.contains(current))
							{
								keys.add(current);
								return this.yieldReturn(current);
							}
						}
						return false;
					},
					function ()
					{
						Utils.dispose(enumerator);
					});
			});
		},

// Overload:function(second)
// Overload:function(second, compareSelector)
		intersect:            function (second, compareSelector)
		{
			compareSelector = Utils.createLambda(compareSelector);
			var source = this;

			return new Enumerable(function ()
			{
				var enumerator;
				var keys;
				var outs;

				return new IEnumerator(
					function ()
					{
						enumerator = source.getEnumerator();

						keys = new Dictionary(compareSelector);
						Enumerable.from(second).forEach(function (key)
						{
							keys.add(key);
						});
						outs = new Dictionary(compareSelector);
					},
					function ()
					{
						while (enumerator.moveNext())
						{
							var current = enumerator.current();
							if (!outs.contains(current) && keys.contains(current))
							{
								outs.add(current);
								return this.yieldReturn(current);
							}
						}
						return false;
					},
					function ()
					{
						Utils.dispose(enumerator);
					});
			});
		},

		// Overload:function(second)
		// Overload:function(second, compareSelector)
		sequenceEqual:        function (second, compareSelector)
		{
			compareSelector = Utils.createLambda(compareSelector);

			var firstEnumerator = this.getEnumerator();
			try
			{
				var secondEnumerator = Enumerable.from(second).getEnumerator();
				try
				{
					while (firstEnumerator.moveNext())
					{
						if (!secondEnumerator.moveNext()
							|| compareSelector(firstEnumerator.current()) !== compareSelector(secondEnumerator.current()))
						{
							return false;
						}
					}

					return !secondEnumerator.moveNext();

				}
				finally
				{
					Utils.dispose(secondEnumerator);
				}
			}
			finally
			{
				Utils.dispose(firstEnumerator);
			}
		},

		union: function (second, compareSelector)
		{
			compareSelector = Utils.createLambda(compareSelector);
			var source = this;

			return new Enumerable(function ()
			{
				var firstEnumerator;
				var secondEnumerator;
				var keys;

				return new IEnumerator(
					function ()
					{
						firstEnumerator = source.getEnumerator();
						keys = new Dictionary(compareSelector);
					},
					function ()
					{
						var current;
						if (secondEnumerator === undefined)
						{
							while (firstEnumerator.moveNext())
							{
								current = firstEnumerator.current();
								if (!keys.contains(current))
								{
									keys.add(current);
									return this.yieldReturn(current);
								}
							}
							secondEnumerator = Enumerable.from(second).getEnumerator();
						}
						while (secondEnumerator.moveNext())
						{
							current = secondEnumerator.current();
							if (!keys.contains(current))
							{
								keys.add(current);
								return this.yieldReturn(current);
							}
						}
						return false;
					},
					function ()
					{
						try
						{
							Utils.dispose(firstEnumerator);
						}
						finally
						{
							Utils.dispose(secondEnumerator);
						}
					});
			});
		},

		/* Ordering Methods */

		orderBy: function (keySelector)
		{
			return new OrderedEnumerable(this, keySelector, false);
		},

		orderByDescending: function (keySelector)
		{
			return new OrderedEnumerable(this, keySelector, true);
		},

		reverse: function ()
		{
			var source = this;

			return new Enumerable(function ()
			{
				var buffer;
				var index;

				return new IEnumerator(
					function ()
					{
						buffer = source.toArray();
						index = buffer.length;
					},
					function ()
					{
						return (index > 0)
							? this.yieldReturn(buffer[--index])
							: false;
					},
					Functions.BLANK);
			});
		},

		shuffle: function ()
		{
			var source = this;

			return new Enumerable(function ()
			{
				var buffer;

				return new IEnumerator(
					function ()
					{
						buffer = source.toArray();
					},
					function ()
					{
						if (buffer.length > 0)
						{
							var i = Math.floor(Math.random() * buffer.length);
							return this.yieldReturn(buffer.splice(i, 1)[0]);
						}
						return false;
					},
					Functions.BLANK);
			});
		},

		weightedSample: function (weightSelector)
		{
			weightSelector = Utils.createLambda(weightSelector);
			var source = this;

			return new Enumerable(function ()
			{
				var sortedByBound;
				var totalWeight = 0;

				return new IEnumerator(
					function ()
					{
						sortedByBound = source
							.choose(function (x)
							{
								var weight = weightSelector(x);
								if (weight <= 0) return null; // ignore 0

								totalWeight += weight;
								return { value: x, bound: totalWeight };
							})
							.toArray();
					},
					function ()
					{
						if (sortedByBound.length > 0)
						{
							var draw = Math.floor(Math.random() * totalWeight) + 1;

							var lower = -1;
							var upper = sortedByBound.length;
							while (upper - lower > 1)
							{
								var index = Math.floor((lower + upper) / 2);
								if (sortedByBound[index].bound >= draw)
								{
									upper = index;
								}
								else
								{
									lower = index;
								}
							}

							return this.yieldReturn(sortedByBound[upper].value);
						}

						return this.yieldBreak();
					},
					Functions.BLANK);
			});
		},

		/* Grouping Methods */

		// Overload:function(keySelector)
		// Overload:function(keySelector,elementSelector)
		// Overload:function(keySelector,elementSelector,resultSelector)
		// Overload:function(keySelector,elementSelector,resultSelector,compareSelector)
		groupBy:        function (keySelector, elementSelector, resultSelector, compareSelector)
		{
			var source = this;
			keySelector = Utils.createLambda(keySelector);
			elementSelector = Utils.createLambda(elementSelector);
			if (resultSelector != null) resultSelector = Utils.createLambda(resultSelector);
			compareSelector = Utils.createLambda(compareSelector);

			return new Enumerable(function ()
			{
				var enumerator;

				return new IEnumerator(
					function ()
					{
						enumerator = source.toLookup(keySelector, elementSelector, compareSelector)
							.toEnumerable()
							.getEnumerator();
					},
					function ()
					{
						if (enumerator.moveNext())
						{
							return (resultSelector == null)
								? this.yieldReturn(enumerator.current())
								: this.yieldReturn(resultSelector(enumerator.current().key(), enumerator.current()));
						}
						return false;
					},
					function ()
					{
						Utils.dispose(enumerator);
					});
			});
		},

// Overload:function(keySelector)
// Overload:function(keySelector,elementSelector)
// Overload:function(keySelector,elementSelector,resultSelector)
// Overload:function(keySelector,elementSelector,resultSelector,compareSelector)
		partitionBy:    function (keySelector, elementSelector, resultSelector, compareSelector)
		{

			var source = this;
			keySelector = Utils.createLambda(keySelector);
			elementSelector = Utils.createLambda(elementSelector);
			compareSelector = Utils.createLambda(compareSelector);
			var hasResultSelector;
			if (resultSelector == null)
			{
				hasResultSelector = false;
				resultSelector = function (key, group)
				{
					return new Grouping(key, group);
				};
			}
			else
			{
				hasResultSelector = true;
				resultSelector = Utils.createLambda(resultSelector);
			}

			return new Enumerable(function ()
			{
				var enumerator;
				var key;
				var compareKey;
				var group = [];

				return new IEnumerator(
					function ()
					{
						enumerator = source.getEnumerator();
						if (enumerator.moveNext())
						{
							key = keySelector(enumerator.current());
							compareKey = compareSelector(key);
							group.push(elementSelector(enumerator.current()));
						}
					},
					function ()
					{
						var hasNext;
						while ((hasNext = enumerator.moveNext()) == true)
						{
							if (compareKey === compareSelector(keySelector(enumerator.current())))
							{
								group.push(elementSelector(enumerator.current()));
							}
							else break;
						}

						if (group.length > 0)
						{
							var result = (hasResultSelector)
								? resultSelector(key, Enumerable.from(group))
								: resultSelector(key, group);
							if (hasNext)
							{
								key = keySelector(enumerator.current());
								compareKey = compareSelector(key);
								group = [elementSelector(enumerator.current())];
							}
							else group = [];

							return this.yieldReturn(result);
						}

						return false;
					},
					function ()
					{
						Utils.dispose(enumerator);
					});
			});
		},

		buffer:    function (count)
		{
			var source = this;

			return new Enumerable(function ()
			{
				var enumerator;

				return new IEnumerator(
					function ()
					{
						enumerator = source.getEnumerator();
					},
					function ()
					{
						var array = [];
						var index = 0;
						while (enumerator.moveNext())
						{
							array.push(enumerator.current());
							if (++index >= count) return this.yieldReturn(array);
						}
						if (array.length > 0) return this.yieldReturn(array);
						return false;
					},
					function ()
					{
						Utils.dispose(enumerator);
					});
			});
		},

		/* Aggregate Methods */

// Overload:function(func)
// Overload:function(seed,func)
// Overload:function(seed,func,resultSelector)
		aggregate: function (seed, func, resultSelector)
		{
			resultSelector = Utils.createLambda(resultSelector);
			return resultSelector(this.scan(seed, func, resultSelector).lastEntry());
		},

// Overload:function()
// Overload:function(selector)
		average:   function (selector)
		{
			selector = Utils.createLambda(selector);

			var sum = 0;
			var count = 0;
			this.forEach(function (x)
			{
				sum += selector(x);
				++count;
			});

			return sum / count;
		},

		// Overload:function()
		// Overload:function(predicate)
		/**
		 *
		 * @param {?Function|string=} predicate
		 * @returns {number}
		 */
		count:     function (predicate)
		{
			var func = (predicate == null) ? Functions.TRUE : Utils.createLambda(predicate);

			var count = 0;
			this.forEach(function (x, i)
			{
				if (func(x, i))++count;
			});

			return count;
		},

// Overload:function()
// Overload:function(selector)
		max:       function (selector)
		{
			if (selector == null) selector = Functions.IDENTITY;
			return this.select(selector).aggregate(function (a, b)
			{
				return (a > b) ? a : b;
			});
		},

// Overload:function()
// Overload:function(selector)
		min:       function (selector)
		{
			if (selector == null) selector = Functions.IDENTITY;
			return this.select(selector).aggregate(function (a, b)
			{
				return (a < b) ? a : b;
			});
		},

		maxBy: function (keySelector)
		{
			keySelector = Utils.createLambda(keySelector);
			return this.aggregate(function (a, b)
			{
				return (keySelector(a) > keySelector(b)) ? a : b;
			});
		},

		minBy: function (keySelector)
		{
			keySelector = Utils.createLambda(keySelector);
			return this.aggregate(function (a, b)
			{
				return (keySelector(a) < keySelector(b)) ? a : b;
			});
		},

// Overload:function()
// Overload:function(selector)
		sum:   function (selector)
		{
			if (selector == null) selector = Functions.IDENTITY;
			return this.select(selector).aggregate(0, function (a, b)
			{
				return a + b;
			});
		},

		/* Paging Methods */

		elementAt: function (index)
		{
			var value = undefined;
			var found = false;
			this.forEach(function (x, i)
			{
				if (i == index)
				{
					value = x;
					found = true;
					return false;
				}
			});

			if (!found) throw new Error("index is less than 0 or greater than or equal to the number of elements in source.");
			return value;
		},

		elementAtOrDefault: function (index, defaultValue)
		{
			if (defaultValue === undefined) defaultValue = null;
			var value = undefined;
			var found = false;
			this.forEach(function (x, i)
			{
				if (i == index)
				{
					value = x;
					found = true;
					return false;
				}
			});

			return (!found) ? defaultValue : value;
		},

// Overload:function()
// Overload:function(predicate)
		first:              function (predicate)
		{
			if (predicate != null) return this.where(predicate).firstEntry();

			var value = undefined;
			var found = false;
			this.forEach(function (x)
			{
				value = x;
				found = true;
				return false;
			});

			if (!found) throw new Error("firstEntry:No element satisfies the condition.");
			return value;
		},

		firstOrDefault:  function (predicate, defaultValue)
		{
			if (defaultValue === undefined) defaultValue = null;
			if (predicate != null) return this.where(predicate).firstOrDefault(null, defaultValue);

			var value = undefined;
			var found = false;
			this.forEach(function (x)
			{
				value = x;
				found = true;
				return false;
			});
			return (!found) ? defaultValue : value;
		},

// Overload:function()
// Overload:function(predicate)
		last:            function (predicate)
		{
			if (predicate != null) return this.where(predicate).lastEntry();

			var value = undefined;
			var found = false;
			this.forEach(function (x)
			{
				found = true;
				value = x;
			});

			if (!found) throw new Error("lastEntry:No element satisfies the condition.");
			return value;
		},

		// Overload:function(defaultValue)
		// Overload:function(defaultValue,predicate)
		lastOrDefault:   function (predicate, defaultValue)
		{
			if (defaultValue === undefined) defaultValue = null;
			if (predicate != null) return this.where(predicate).lastOrDefault(null, defaultValue);

			var value = undefined;
			var found = false;
			this.forEach(function (x)
			{
				found = true;
				value = x;
			});
			return (!found) ? defaultValue : value;
		},

		// Overload:function()
		// Overload:function(predicate)
		single:          function (predicate)
		{
			if (predicate != null) return this.where(predicate).single();

			var value = undefined;
			var found = false;
			this.forEach(function (x)
			{
				if (!found)
				{
					found = true;
					value = x;
				}
				else throw new Error("single:sequence contains more than one element.");
			});

			if (!found) throw new Error("single:No element satisfies the condition.");
			return value;
		},

		// Overload:function(defaultValue)
		// Overload:function(defaultValue,predicate)
		singleOrDefault: function (predicate, defaultValue)
		{
			if (defaultValue === undefined) defaultValue = null;
			if (predicate != null) return this.where(predicate).singleOrDefault(null, defaultValue);

			var value = undefined;
			var found = false;
			this.forEach(function (x)
			{
				if (!found)
				{
					found = true;
					value = x;
				}
				else throw new Error("single:sequence contains more than one element.");
			});

			return (!found) ? defaultValue : value;
		},

		skip:      function (count)
		{
			var source = this;

			return new Enumerable(function ()
			{
				var enumerator;
				var index = 0;

				return new IEnumerator(
					function ()
					{
						enumerator = source.getEnumerator();
						while (index++ < count && enumerator.moveNext())
						{
						}
					},
					function ()
					{
						return (enumerator.moveNext())
							? this.yieldReturn(enumerator.current())
							: false;
					},
					function ()
					{
						Utils.dispose(enumerator);
					});
			});
		},

		// Overload:function(predicate<element>)
		// Overload:function(predicate<element,index>)
		skipWhile: function (predicate)
		{
			predicate = Utils.createLambda(predicate);
			var source = this;

			return new Enumerable(function ()
			{
				var enumerator;
				var index = 0;
				var isSkipEnd = false;

				return new IEnumerator(
					function ()
					{
						enumerator = source.getEnumerator();
					},
					function ()
					{
						while (!isSkipEnd)
						{
							if (enumerator.moveNext())
							{
								if (!predicate(enumerator.current(), index++))
								{
									isSkipEnd = true;
									return this.yieldReturn(enumerator.current());
								}
							}
							else return false;
						}

						return (enumerator.moveNext())
							? this.yieldReturn(enumerator.current())
							: false;

					},
					function ()
					{
						Utils.dispose(enumerator);
					});
			});
		},

		take:           function (count)
		{
			var source = this;

			return new Enumerable(function ()
			{
				var enumerator;
				var index = 0;

				return new IEnumerator(
					function ()
					{
						enumerator = source.getEnumerator();
					},
					function ()
					{
						return (index++ < count && enumerator.moveNext())
							? this.yieldReturn(enumerator.current())
							: false;
					},
					function ()
					{
						Utils.dispose(enumerator);
					}
				);
			});
		},

		// Overload:function(predicate<element>)
		// Overload:function(predicate<element,index>)
		takeWhile:      function (predicate)
		{
			predicate = Utils.createLambda(predicate);
			var source = this;

			return new Enumerable(function ()
			{
				var enumerator;
				var index = 0;

				return new IEnumerator(
					function ()
					{
						enumerator = source.getEnumerator();
					},
					function ()
					{
						return (enumerator.moveNext() && predicate(enumerator.current(), index++))
							? this.yieldReturn(enumerator.current())
							: false;
					},
					function ()
					{
						Utils.dispose(enumerator);
					});
			});
		},

		// Overload:function()
		// Overload:function(count)
		takeExceptLast: function (count)
		{
			if (count == null) count = 1;
			var source = this;

			return new Enumerable(function ()
			{
				if (count <= 0) return source.getEnumerator(); // do nothing

				var enumerator;
				var q = [];

				return new IEnumerator(
					function ()
					{
						enumerator = source.getEnumerator();
					},
					function ()
					{
						while (enumerator.moveNext())
						{
							if (q.length == count)
							{
								q.push(enumerator.current());
								return this.yieldReturn(q.shift());
							}
							q.push(enumerator.current());
						}
						return false;
					},
					function ()
					{
						Utils.dispose(enumerator);
					});
			});
		},

		takeFromLast: function (count)
		{
			if (count <= 0 || count == null) return Enumerable.empty();
			var source = this;

			return new Enumerable(function ()
			{
				var sourceEnumerator;
				var enumerator;
				var q = [];

				return new IEnumerator(
					function ()
					{
						sourceEnumerator = source.getEnumerator();
					},
					function ()
					{
						while (sourceEnumerator.moveNext())
						{
							if (q.length == count) q.shift();
							q.push(sourceEnumerator.current());
						}
						if (enumerator == null)
						{
							enumerator = Enumerable.from(q).getEnumerator();
						}
						return (enumerator.moveNext())
							? this.yieldReturn(enumerator.current())
							: false;
					},
					function ()
					{
						Utils.dispose(enumerator);
					});
			});
		},

		// Overload:function(item)
		// Overload:function(predicate)
		indexOf:      function (item)
		{
			var found = null;

			// item as predicate
			if (typeof (item) === Types.FUNCTION)
			{
				this.forEach(function (x, i)
				{
					if (item(x, i))
					{
						found = i;
						return false;
					}
				});
			}
			else
			{
				this.forEach(function (x, i)
				{
					if (x === item)
					{
						found = i;
						return false;
					}
				});
			}

			return (found !== null) ? found : -1;
		},

		// Overload:function(item)
		// Overload:function(predicate)
		lastIndexOf:  function (item)
		{
			var result = -1;

			// item as predicate
			if (typeof (item) === Types.FUNCTION)
			{
				this.forEach(function (x, i)
				{
					if (item(x, i)) result = i;
				});
			}
			else
			{
				this.forEach(function (x, i)
				{
					if (x === item) result = i;
				});
			}

			return result;
		},

		/* Convert Methods */

		asEnumerable: function ()
		{
			return Enumerable.from(this);
		},

		toArray:  function ()
		{
			var array = [];
			this.forEach(function (x)
			{
				array.push(x);
			});
			return array;
		},

		// Overload:function(keySelector)
		// Overload:function(keySelector, elementSelector)
		// Overload:function(keySelector, elementSelector, compareSelector)
		toLookup: function (keySelector, elementSelector, compareSelector)
		{
			keySelector = Utils.createLambda(keySelector);
			elementSelector = Utils.createLambda(elementSelector);
			compareSelector = Utils.createLambda(compareSelector);

			var dict = new Dictionary(compareSelector);
			this.forEach(function (x)
			{
				var key = keySelector(x);
				var element = elementSelector(x);

				var array = dict.get(key);
				if (array !== undefined) array.push(element);
				else dict.add(key, [element]);
			});
			return new Lookup(dict);
		},

		toObject:       function (keySelector, elementSelector)
		{
			keySelector = Utils.createLambda(keySelector);
			elementSelector = Utils.createLambda(elementSelector);

			var obj = {};
			this.forEach(function (x)
			{
				obj[keySelector(x)] = elementSelector(x);
			});
			return obj;
		},

		// Overload:function(keySelector, elementSelector)
		// Overload:function(keySelector, elementSelector, compareSelector)
		toDictionary:   function (keySelector, elementSelector, compareSelector)
		{
			keySelector = Utils.createLambda(keySelector);
			elementSelector = Utils.createLambda(elementSelector);
			compareSelector = Utils.createLambda(compareSelector);

			var dict = new Dictionary(compareSelector);
			this.forEach(function (x)
			{
				dict.add(keySelector(x), elementSelector(x));
			});
			return dict;
		},

// Overload:function()
// Overload:function(replacer)
// Overload:function(replacer, space)
		toJSONString:   function (replacer, space)
		{
			if (typeof JSON === Types.UNDEFINED || JSON.stringify == null)
			{
				throw new Error("toJSONString can't find JSON.stringify. This works native JSON support Browser or include json2.js");
			}
			return JSON.stringify(this.toArray(), replacer, space);
		},

// Overload:function()
// Overload:function(separator)
// Overload:function(separator,selector)
		toJoinedString: function (separator, selector)
		{
			if (separator == null) separator = "";
			if (selector == null) selector = Functions.IDENTITY;

			return this.select(selector).toArray().join(separator);
		},


		/* Action Methods */

		// Overload:function(action<element>)
		// Overload:function(action<element,index>)
		doAction:       function (action)
		{
			var source = this;
			action = Utils.createLambda(action);

			return new Enumerable(function ()
			{
				var enumerator;
				var index = 0;

				return new IEnumerator(
					function ()
					{
						enumerator = source.getEnumerator();
					},
					function ()
					{
						if (enumerator.moveNext())
						{
							action(enumerator.current(), index++);
							return this.yieldReturn(enumerator.current());
						}
						return false;
					},
					function ()
					{
						Utils.dispose(enumerator);
					});
			});
		},

		// Overload:function(action<element>)
		// Overload:function(action<element,index>)
		// Overload:function(func<element,bool>)
		// Overload:function(func<element,index,bool>)
		forEach:        function (action)
		{
			action = Utils.createLambda(action);

			var index = 0;
			var enumerator = this.getEnumerator();
			try
			{
				while (enumerator.moveNext())
				{
					if (action(enumerator.current(), index++) === false) break;
				}
			} finally
			{
				Utils.dispose(enumerator);
			}
		},

		// Overload:function()
		// Overload:function(separator)
		// Overload:function(separator,selector)
		write:          function (separator, selector)
		{
			if (separator == null) separator = "";
			selector = Utils.createLambda(selector);

			var isFirst = true;
			this.forEach(function (item)
			{
				if (isFirst) isFirst = false;
				else document.write(separator);
				document.write(selector(item));
			});
		},

		// Overload:function()
		// Overload:function(selector)
		writeLine:      function (selector)
		{
			selector = Utils.createLambda(selector);

			this.forEach(function (item)
			{
				document.writeln(selector(item) + "<br />");
			});
		},

		force: function ()
		{
			var enumerator = this.getEnumerator();

			try
			{
				while (enumerator.moveNext())
				{
				}
			}
			finally
			{
				Utils.dispose(enumerator);
			}
		},

		/* Functional Methods */

		letBind: function (func)
		{
			func = Utils.createLambda(func);
			var source = this;

			return new Enumerable(function ()
			{
				var enumerator;

				return new IEnumerator(
					function ()
					{
						enumerator = Enumerable.from(func(source)).getEnumerator();
					},
					function ()
					{
						return (enumerator.moveNext())
							? this.yieldReturn(enumerator.current())
							: false;
					},
					function ()
					{
						Utils.dispose(enumerator);
					});
			});
		},

		share: function ()
		{
			var source = this;
			var sharedEnumerator;
			var disposed = false;

			return new DisposableEnumerable(function ()
			{
				return new IEnumerator(
					function ()
					{
						if (sharedEnumerator == null)
						{
							sharedEnumerator = source.getEnumerator();
						}
					},
					function ()
					{
						if (disposed) throw new Error("enumerator is disposed");

						return (sharedEnumerator.moveNext())
							? this.yieldReturn(sharedEnumerator.current())
							: false;
					},
					Functions.BLANK
				);
			}, function ()
			{
				disposed = true;
				Utils.dispose(sharedEnumerator);
			});
		},

		memorize: function ()
		{
			var source = this;
			var cache;
			var enumerator;
			var disposed = false;

			return new DisposableEnumerable(function ()
			{
				var index = -1;

				return new IEnumerator(
					function ()
					{
						if (enumerator == null)
						{
							enumerator = source.getEnumerator();
							cache = [];
						}
					},
					function ()
					{
						if (disposed) throw new Error("enumerator is disposed");

						index++;
						if (cache.length <= index)
						{
							return (enumerator.moveNext())
								? this.yieldReturn(cache[index] = enumerator.current())
								: false;
						}

						return this.yieldReturn(cache[index]);
					},
					Functions.BLANK
				);
			}, function ()
			{
				disposed = true;
				Utils.dispose(enumerator);
				cache = null;
			});
		},

		/* Error Handling Methods */

		catchError: function (handler)
		{
			handler = Utils.createLambda(handler);
			var source = this;

			return new Enumerable(function ()
			{
				var enumerator;

				return new IEnumerator(
					function ()
					{
						enumerator = source.getEnumerator();
					},
					function ()
					{
						try
						{
							return (enumerator.moveNext())
								? this.yieldReturn(enumerator.current())
								: false;
						} catch (e)
						{
							handler(e);
							return false;
						}
					},
					function ()
					{
						Utils.dispose(enumerator);
					});
			});
		},

		finallyAction: function (finallyAction)
		{
			finallyAction = Utils.createLambda(finallyAction);
			var source = this;

			return new Enumerable(function ()
			{
				var enumerator;

				return new IEnumerator(
					function ()
					{
						enumerator = source.getEnumerator();
					},
					function ()
					{
						return (enumerator.moveNext())
							? this.yieldReturn(enumerator.current())
							: false;
					},
					function ()
					{
						try
						{
							Utils.dispose(enumerator);
						} finally
						{
							finallyAction();
						}
					});
			});
		},

		/* For Debug Methods */

		// Overload:function()
		// Overload:function(selector)
		log:           function (selector)
		{
			selector = Utils.createLambda(selector);

			return this.doAction(function (item)
			{
				if (typeof console !== Types.UNDEFINED)
				{
					console.log(selector(item));
				}
			});
		},

		// Overload:function()
		// Overload:function(message)
		// Overload:function(message,selector)
		trace:         function (message, selector)
		{
			if (message == null) message = "Trace";
			selector = Utils.createLambda(selector);

			return this.doAction(function (item)
			{
				if (typeof console !== Types.UNDEFINED)
				{
					console.log(message, selector(item));
				}
			});
		}
	};

	/**
	 *
	 * @return {sc.enumerable.Enumerable}
	 */
	sc.collections.Dictionary.prototype.toEnumerable = function ()
	{
		/**
		 * @type {sc.collections.Dictionary}
		 */
		var self = this;

		return new sc.enumerable.Enumerable(function ()
		{
			/**
			 * @type {sc.collections.HashEntry}
			 */
			var currentEntry;

			return new DefaultEnumerator(
				function ()
				{
					currentEntry = self.entryList.firstEntry;
				},
				function ()
				{
					if (currentEntry != null)
					{
						var result = { key: currentEntry.key, value: currentEntry.value };
						currentEntry = currentEntry.nextEntry;

						return this.yieldReturn(result);
					}

					return false;
				},
				FunctionUtils.BLANK);
		});
	};
});
