goog.provide("sc.geom.ISegment");
goog.scope(function ()
{
	/**
	 * @interface
	 *
	 * @param {sc.geom.IPoint} pointA
	 * @param {sc.geom.IPoint} pointB
	 */
	sc.geom.ISegment = function (pointA, pointB)
	{
	};

	sc.geom.ISegment.prototype =
	{
		/**
		 * @type {sc.geom.IPoint}
		 */
		pointA: null,

		/**
		 * @type {sc.geom.IPoint}
		 */
		pointB: null,

		/**
		 * @type {number}
		 */
		size: 0,

		/**
		 *
		 * @param {sc.geom.IPoint} point
		 *
		 * @return {boolean}
		 */
		containsPoint: function (point)
		{
		},

		/**
		 *
		 * @param {sc.geom.ISegment} segment
		 *
		 * @return {boolean}
		 */
		intersect: function (segment)
		{
		},

		/**
		 *
		 * @param {sc.geom.ISegment} segment
		 * @param {?boolean=} exclude
		 * @param {?boolean=} loose
		 *
		 * @return {sc.geom.IPoint|undefined}
		 */
		intersection: function (segment, exclude, loose)
		{
		}
	};
});