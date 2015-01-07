goog.require("sc.enumerable.IEnumerator");
goog.require("sc.enumerable.Yielder");

goog.provide("sc.enumerable.DefaultEnumerator");
goog.scope(function ()
{
	var Yielder = sc.enumerable.Yielder;

	/**
	 * @enum {number}
	 */
	var State =
	{
		BEFORE: 0,
		RUNNING: 1,
		AFTER: 2
	};

	/**
	 *
	 * @constructor
	 * @implements {sc.enumerable.IEnumerator}
	 *
	 * @param {Function} initialize
	 * @param {function():boolean} tryGetNext
	 * @param {Function} dispose
	 */
	sc.enumerable.DefaultEnumerator = function (initialize, tryGetNext, dispose)
	{
		var yielder = new Yielder();
		var state = State.BEFORE;

		/**
		 * @type {function():*}
		 */
		this.current = yielder.current;

		/**
		 *
		 * @return {boolean}
		 */
		this.moveNext = function ()
		{
			try
			{
				switch (state)
				{
					case State.BEFORE:
						state = State.RUNNING;
						initialize();
					// fall through

					case State.RUNNING:
						if (tryGetNext.apply(yielder))
						{
							return true;
						}
						else
						{
							this.dispose();
							return false;
						}

					case State.AFTER:
						return false;
				}

				return false;
			}
			catch (error)
			{
				this.dispose();
				throw error;
			}
		};

		/**
		 *
		 */
		this.dispose = function ()
		{
			if (state != State.RUNNING) return;

			try
			{
				dispose();
			}
			finally
			{
				state = State.AFTER;
			}
		};
	};
});