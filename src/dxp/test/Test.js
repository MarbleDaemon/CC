goog.provide("dxp.test.Test");
goog.scope(function ()
{
	/**
	 * @interface
	 */
	dxp.test.IA = function ()
	{
	};
	dxp.test.IA.prototype =
	{
		logA: function ()
		{
		}
	};

	/**
	 * @constructor
	 * @implements {dxp.test.IA}
	 */
	dxp.test.A = goog.defineClass(Object, {
		constructor: function ()
		{
			this.logA = function ()
			{
				console.log("a");
			};
		},
		x:           5,
		y:           6,
		logX:        function ()
		{
			console.log(this.getX());
		},
		getX:        function ()
		{
			return this.x;
		},
		setX:        function (value)
		{
			this.x = value;
		},
		statics:     {
			hello: function ()
			{
				var a = new dxp.test.A();
				a.x = Math.random();
				console.log(a.getX());
			}
		}
	});

	/**
	 * @constructor
	 * @extends {dxp.test.A}
	 */
	dxp.test.B = goog.defineClass(dxp.test.A, {
		constructor: function ()
		{
			dxp.test.A.apply(this);

			this.logB = function ()
			{
				console.log("b");
			};
		}
	});

	/**
	 * @constructor
	 * @extends {dxp.test.B}
	 */
	dxp.test.C = goog.defineClass(dxp.test.B, {
		constructor: function ()
		{
			dxp.test.B.apply(this);

			this.logC = function ()
			{
				console.log("c");
			};
		}
	});

	//dxp.test.B.prototype =

	/**
	 *
	 * @constructor
	 *
	 * @param id
	 */
	dxp.test.Test = function (id)
	{
		var x = new dxp.test.A();
		x.setX(15);
		console.log(x.getX());
	};
});
