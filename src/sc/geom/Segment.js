goog.require("sc.core.Maths");
goog.require("sc.geom.ISegment");
goog.require("sc.geom.Point");

goog.provide("sc.geom.Segment");
goog.scope(function ()
{
	var Maths = sc.core.Maths;
	var Point = sc.geom.Point;

	/**
	 * @constructor
	 * @implements {sc.geom.ISegment}
	 *
	 * @param {sc.geom.Point} pointA
	 * @param {sc.geom.Point} pointB
	 */
	sc.geom.Segment = goog.defineClass(null, {
		constructor: function (pointA, pointB)
		{
			/**
			 *
			 * @type {sc.geom.Point}
			 */
			this.pointA = pointA;
			/**
			 *
			 * @type {sc.geom.Point}
			 */
			this.pointB = pointB;

			/**
			 *
			 * @type {number}
			 */
			this.size = pointA.distanceToPoint(pointB);
		},

		/**
		 *
		 * @param {sc.geom.IPoint} point
		 *
		 * @return {boolean}
		 */
		containsPoint: function (point)
		{
			var pointA = this.pointA;
			var pointB = this.pointB;
			return Maths.between(point.x, pointA.x, pointB.x) && ((point.x - pointA.x) / (pointB.x - pointA.x) == (point.y - pointA.y) / (pointB.y - pointA.y));
		},

		/**
		 *
		 * @param {sc.geom.ISegment} segment
		 *
		 * @return {boolean}
		 */
		intersect: function (segment)
		{
			var a = this.pointA;
			var aX = a.x;
			var aY = a.y;

			var b = this.pointB;
			var bX = b.x;
			var bY = b.y;

			var c = segment.pointA;
			var cX = c.x;
			var cY = c.y;

			var d = segment.pointB;
			var dX = d.x;
			var dY = d.y;

			var aX_cX = aX - cX;
			var aY_cY = aY - cY;
			var bX_aX = bX - aX;
			var bY_aY = bY - aY;
			var dX_cX = dX - cX;
			var dY_cY = dY - cY;

			var denominator = bX_aX * dY_cY - bY_aY * dX_cX;
			if (denominator == 0)
			{
				return false;
			}

			var numerator1 = aY_cY * dX_cX - aX_cX * dY_cY;

			if (numerator1 == 0)
			{
				return false;
			}

			var numerator2 = aY_cY * bX_aX - aX_cX * bY_aY;

			if (numerator2 == 0)
			{
				return false;
			}

			var r = numerator1 / denominator;
			var s = numerator2 / denominator;

			return (r > 0 && r < 1) && (s > 0 && s < 1);
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
			var a1 = this.pointA;
			var x1 = a1.x;
			var y1 = a1.y;

			var b1 = this.pointB;
			var x2 = b1.x;
			var y2 = b1.y;

			var a2 = segment.pointA;
			var x3 = a2.x;
			var y3 = a2.y;

			var b2 = segment.pointB;
			var x4 = b2.x;
			var y4 = b2.y;

			var x1_x2 = x1 - x2;
			var y1_y2 = y1 - y2;
			var x3_x4 = x3 - x4;
			var y3_y4 = y3 - y4;

			var x1y2_y1x2 = (x1 * y2 - y1 * x2);
			var x3y4_y3x4 = (x3 * y4 - y3 * x4);

			var denominator = x1_x2 * y3_y4 - y1_y2 * x3_x4;
			if (denominator == 0)
			{
				return undefined;
			}

			var intersection = new Point(
				(x1y2_y1x2 * x3_x4 - x1_x2 * x3y4_y3x4) / denominator,
				(x1y2_y1x2 * y3_y4 - y1_y2 * x3y4_y3x4) / denominator
			);

			if (loose)
			{
				return intersection;
			}
			else
			{
				return (
				((x1 != x2) ? Maths.between(intersection.x, x1, x2, exclude) : Maths.between(intersection.x, x1, x2, exclude)) &&
				((x3 != x4) ? Maths.between(intersection.x, x3, x4, exclude) : Maths.between(intersection.y, y3, y4, exclude))
				) ? intersection : null;
			}
		}
	});
});