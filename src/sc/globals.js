goog.provide("sc.globals");
goog.scope(function ()
{
	/** @define {boolean} */
	sc.globals.DEBUG = true;

	/**
	 * @type {number}
	 */
	sc.globals.UID = /*0x19e020e0*/0;

	sc.globals.Array = Array;
	/**
	 * @type {function(new:?, ...?)}
	 */
	sc.globals.Function = Function;
	sc.globals.Math = Math;
	sc.globals.Object = Object;
	sc.globals.String = String;

	sc.globals.console = console;
	sc.globals.document = document;
	sc.globals.object = {};
	sc.globals.objectToString = sc.globals.object.toString;
	sc.globals.window = window;

	/**
	 *
	 * @param {Function} childCtor Child class.
	 * @param {Function} parentCtor Parent class.
	 */
	goog.inherits3 = function (childCtor, parentCtor)
	{
		var PROTOTYPE = sc.constants.PROTOTYPE;

		/** @constructor */
		function tempCtor()
		{
		};
		tempCtor[PROTOTYPE] = parentCtor[PROTOTYPE];
		//childCtor.superClass_ = parentCtor.prototype;
		childCtor[PROTOTYPE] = new tempCtor();
		/** @override */
		childCtor[PROTOTYPE].constructor = childCtor;
	};
});
