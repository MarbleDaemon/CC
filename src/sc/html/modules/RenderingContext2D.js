goog.require("sc.constants");
goog.require("sc.core.Utils");
goog.require("sc.geom.Point");
goog.require("sc.geom.Segment");
goog.require("sc.html.modules.IRenderingContext2D");

goog.provide("sc.html.modules.RenderingContext2D");
goog.provide("sc.html.modules.context2d.Operations");
goog.provide("sc.html.modules.context2d.CompositeOperations");
goog.scope(function ()
{
	var ArrayUtils = sc.core.ArrayUtils;
	var CompositeOperations = sc.html.modules.context2d.CompositeOperations;
	var Operations = sc.html.modules.context2d.Operations;

	Operations.CLEAR_RECT = "clearRect";
	Operations.DRAW_IMAGE = "drawImage";
	Operations.LINE_CAP = "lineCap";
	Operations.LINE_JOIN = "lineJoin";
	Operations.LINE_WIDTH = "lineWidth";
	Operations.MITER_LIMIT = "miterLimit";
	Operations.SET_LINE_DASH = "setLineDash";
	Operations.SHADOW_BLUR = "shadowBlur";
	Operations.SHADOW_COLOR = "shadowColor";
	Operations.SHADOW_OFFSET_X = "shadowOffsetX";
	Operations.SHADOW_OFFSET_Y = "shadowOffsetY";

	CompositeOperations.COPY = "copy";
	CompositeOperations.DARKER = "darker";
	CompositeOperations.DESTINATION_ATOP = "destination-atop";
	CompositeOperations.DESTINATION_IN = "destination-in";
	CompositeOperations.DESTINATION_OUT = "destination-out";
	CompositeOperations.DESTINATION_OVER = "destination-over";
	CompositeOperations.LIGHTER = "lighter";
	CompositeOperations.SOURCE_ATOP = "source-atop";
	CompositeOperations.SOURCE_IN = "source-in";
	CompositeOperations.SOURCE_OUT = "source-out";
	CompositeOperations.SOURCE_OVER = "source-over";
	CompositeOperations.XOR = "xor";

	/**
	 * @constructor
	 * @implements {sc.html.modules.IRenderingContext2D}
	 */
	sc.html.modules.RenderingContext2D = goog.defineClass(null, {
		constructor: function ()
		{
		},

		arc:                      goog.abstractMethod,
		arcTo:                    goog.abstractMethod,
		beginPath:                goog.abstractMethod,
		bezierCurves:             goog.abstractMethod,
		bezierCurveTo:            goog.abstractMethod,
		castShadow:               goog.abstractMethod,
		circle:                   goog.abstractMethod,
		clear:                    goog.abstractMethod,
		clearRect:                goog.abstractMethod,
		clip:                     goog.abstractMethod,
		closePath:                goog.abstractMethod,
		createImageData:          goog.abstractMethod,
		createLinearGradient:     goog.abstractMethod,
		createPattern:            goog.abstractMethod,
		createRadialGradient:     goog.abstractMethod,
		drawFocusRing:            goog.abstractMethod,
		drawImageAt:              goog.abstractMethod,
		drawPartialImageAt:       goog.abstractMethod,
		drawRotatedImageAt:       goog.abstractMethod,
		ellipse:                  goog.abstractMethod,
		fill:                     goog.abstractMethod,
		fillRect:                 goog.abstractMethod,
		fillStyle:                goog.abstractMethod,
		fillText:                 goog.abstractMethod,
		font:                     goog.abstractMethod,
		getImageData:             goog.abstractMethod,
		globalAlpha:              goog.abstractMethod,
		globalCompositeOperation: goog.abstractMethod,
		imageSmoothingEnabled:    goog.abstractMethod,
		isPointInPath:            goog.abstractMethod,
		lineCap:                  goog.abstractMethod,
		lineJoin:                 goog.abstractMethod,
		lines:                    goog.abstractMethod,
		lineTo:                   goog.abstractMethod,
		lineWidth:                goog.abstractMethod,
		measureText:              goog.abstractMethod,
		miterLimit:               goog.abstractMethod,
		moveTo:                   goog.abstractMethod,
		putImageData:             goog.abstractMethod,
		quadraticCurveTo:         goog.abstractMethod,
		restore:                  goog.abstractMethod,
		rotate:                   goog.abstractMethod,
		roundedRect:              goog.abstractMethod,
		save:                     goog.abstractMethod,
		scale:                    goog.abstractMethod,
		setLineDash:              goog.abstractMethod,
		setTransform:             goog.abstractMethod,
		shadowBlur:               goog.abstractMethod,
		shadowColor:              goog.abstractMethod,
		shadowOffsetX:            goog.abstractMethod,
		shadowOffsetY:            goog.abstractMethod,
		stroke:                   goog.abstractMethod,
		strokeRect:               goog.abstractMethod,
		strokeStyle:              goog.abstractMethod,
		strokeText:               goog.abstractMethod,
		textAlign:                goog.abstractMethod,
		textBaseline:             goog.abstractMethod,
		transform:                goog.abstractMethod,
		translate:                goog.abstractMethod,

		/**
		 *
		 * @param {sc.geom.ISegment} segment
		 * @param {boolean=} moveTo
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		drawSegment: function (segment, moveTo)
		{
			return (moveTo ? this.moveToPoint(segment.pointA) : this.lineToPoint(segment.pointA))
				.lineToPoint(segment.pointB);
		},

		/**
		 *
		 * @param {sc.geom.IPoint} point
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		lineToPoint: function (point)
		{
			return this.lineTo(point.x, point.y);
		},

		/**
		 *
		 * @param {Array<sc.geom.IPoint>} points
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		lineToPoints: function (points)
		{
			ArrayUtils.forEachItem(points,
				/**
				 * @param {sc.geom.Point} point
				 */
				function (point)
				{
					this.lineTo(point.x, point.y);
				});

			return this;
		},

		/**
		 *
		 * @param {sc.geom.IPoint} point
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		moveToPoint: function (point)
		{
			return this.moveTo(point.x, point.y);
		}
	});
})
;
