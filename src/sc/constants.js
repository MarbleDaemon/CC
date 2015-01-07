goog.provide("sc.Constants");
goog.provide("sc.constants");
goog.scope(function ()
{
	sc.Constants = new Function;
	sc.Constants.prototype =
	{
		APPLY:                  "apply",
		CALL:                   "call",
		HEIGHT:                 "height",
		/**
		 * @const
		 */
		LENGTH:                 "length",
		NULL:                   null,
		PROPERTY_IS_ENUMERABLE: "propertyIsEnumerable",
		PROTOTYPE:              "prototype",
		SET_TIME_OUT:           "setTimeout",
		SLICE:                  "slice",
		SPLICE:                 "splice",
		TO_STRING:              "toString",
		UNDEFINED:              undefined,
		WIDTH:                  "width"
	};

	/**
	 * @const
	 * @type {sc.Constants}
	 */
	sc.constants = new sc.Constants();
});
