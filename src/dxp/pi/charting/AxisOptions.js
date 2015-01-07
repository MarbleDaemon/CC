goog.provide("dxp.pi.charting.AxisOptions");
goog.provide("dxp.pi.charting.AxisOptionsProperties");
goog.scope(function ()
{
	/**
	 * @typedef {{
	 *              color: Array.<number>
	 *          }}
	 */
	dxp.pi.charting.AxisOptionsProperties;

	/**
	 *
	 * @constructor
	 * @template P
	 *
	 * @param {P} parent
	 */
	dxp.pi.charting.AxisOptions = goog.defineClass(null, {
		/**
		 *
		 * @template P
		 *
		 * @param {P} parent
		 */
		constructor: function (parent)
		{
			/**
			 * @type {P}
			 */
			this.done = parent;
		},

		/**
		 *
		 * @type {Array.<number>}
		 */
		color: [0, 0, 0, 1],

		/**
		 *
		 * @param {Array.<number>} value
		 *
		 * return {dxp.pi.charting.AxisOptions.<P>}
		 */
		setColor: function (value)
		{
			this.color = value;

			return this;
		},

		/**
		 *
		 * @type {number}
		 */
		interval: 0.15,

		/**
		 *
		 * @param {number} value
		 *
		 * return {dxp.pi.charting.AxisOptions.<P>}
		 */
		setIntervalSize: function (value)
		{
			this.interval = value;

			return this;
		},

		/**
		 *
		 * @type {number}
		 */
		lineWidth: 1,

		/**
		 *
		 * @param {number} value
		 *
		 * return {dxp.pi.charting.AxisOptions.<P>}
		 */
		setLineWidth: function (value)
		{
			this.lineWidth = value;

			return this;
		},

		/**
		 *
		 * @type {number}
		 */
		min: 0,

		/**
		 *
		 * @param {number} value
		 *
		 * return {dxp.pi.charting.AxisOptions.<P>}
		 */
		setMin: function (value)
		{
			this.min = value;

			return this;
		},

		/**
		 *
		 * @type {number}
		 */
		max: 1,

		/**
		 *
		 * @param {number} value
		 *
		 * return {dxp.pi.charting.AxisOptions.<P>}
		 */
		setMax: function (value)
		{
			this.max = value;

			return this;
		}
	});
});
