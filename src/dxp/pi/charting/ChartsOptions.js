goog.provide("dxp.pi.charting.ChartsOptions");
goog.provide("dxp.pi.charting.ChartsOptionsProperties");
goog.scope(function ()
{
	/**
	 * @typedef {{
	 *              marginBottom: number,
	 *              marginLeft: number,
	 *              marginRight: number,
	 *              marginTop: number
	 *          }}
	 */
	dxp.pi.charting.ChartsOptionsProperties;

	/**
	 *
	 * @constructor
	 * @template P
	 *
	 * @param {P} parent
	 */
	dxp.pi.charting.ChartsOptions = goog.defineClass(null, {
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
		 * @type {number}
		 */
		marginBottom: 0,
		/**
		 *
		 * @type {number}
		 */
		marginLeft:   0,
		/**
		 *
		 * @type {number}
		 */
		marginRight:  0,
		/**
		 *
		 * @type {number}
		 */
		marginTop:    0,

		/**
		 *
		 * @param {number=} left
		 * @param {number=} top
		 * @param {number=} right
		 * @param {number=} bottom
		 *
		 * @return {dxp.pi.charting.ChartsOptions.<P>}
		 */
		setMargin: function (left, top, right, bottom)
		{
			if (arguments.length > 1)
			{
				if (left != undefined)
				{
					this.marginLeft = left;
				}

				if (top != undefined)
				{
					this.marginTop = top;
				}

				if (right != undefined)
				{
					this.marginRight = right;
				}

				if (bottom != undefined)
				{
					this.marginBottom = bottom;
				}
			}
			else
			{
				this.marginLeft = this.marginTop = this.marginRight = this.marginBottom = left || 0;
			}

			return this;
		}
	});
});
