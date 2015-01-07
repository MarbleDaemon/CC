goog.require("sc.geom.IPoint");
goog.require("sc.geom.ISegment");
goog.require("sc.html.IDOMModule");

goog.provide("sc.html.modules.IRenderingContext2D");
goog.scope(function ()
{
	/**
	 * @interface
	 * @extends {sc.html.IDOMModule}
	 */
	sc.html.modules.IRenderingContext2D = function ()
	{
	};

	sc.html.modules.IRenderingContext2D.prototype =
	{
		/**
		 *
		 * @param {number} x
		 * @param {number} y
		 * @param {number} radius
		 * @param {number} startAngle
		 * @param {number} endAngle
		 * @param {boolean=} antiClockWise
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		arc: function (x, y, radius, startAngle, endAngle, antiClockWise)
		{
		},

		/**
		 *
		 * @param {number} x1
		 * @param {number} y1
		 * @param {number} x2
		 * @param {number} y2
		 * @param {number} radius
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		arcTo: function (x1, y1, x2, y2, radius)
		{
		},

		/**
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		beginPath: function ()
		{
		},

		/**
		 *
		 * @param {Array<number>} coordinates
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		bezierCurves: function (coordinates)
		{
		},

		/**
		 *
		 * @param {number} cp1x
		 * @param {number} cp1y
		 * @param {number} cp2x
		 * @param {number} cp2y
		 * @param {number} x
		 * @param {number} y
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		bezierCurveTo: function (cp1x, cp1y, cp2x, cp2y, x, y)
		{
		},

		/**
		 *
		 * @param {string} color
		 * @param {number=} blur
		 * @param {number=} offsetX
		 * @param {number=} offsetY
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		castShadow: function (color, blur, offsetX, offsetY)
		{
		},

		/**
		 *
		 * @param x
		 * @param y
		 * @param radius
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		circle: function (x, y, radius)
		{
		},

		/**
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		clear: function ()
		{
		},

		/**
		 *
		 * @param {number} x
		 * @param {number} y
		 * @param {number} w
		 * @param {number} h
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		clearRect: function (x, y, w, h)
		{
		},

		/**
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		clip: function ()
		{
		},

		/**
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		closePath: function ()
		{
		},

		/**
		 *
		 * @param {ImageData|number} imageData_or_sw
		 * @param {number=} sh
		 *
		 * @return {ImageData}
		 */
		createImageData: function (imageData_or_sw, sh)
		{
		},

		/**
		 *
		 * @param {number} x0
		 * @param {number} y0
		 * @param {number} x1
		 * @param {number} y1
		 * @param {...(number,string)} var_args
		 *
		 * @return {CanvasGradient}
		 */
		createLinearGradient: function (x0, y0, x1, y1, var_args)
		{
		},

		/**
		 *
		 * @param {(HTMLImageElement|HTMLCanvasElement|HTMLVideoElement)} image
		 * @param {string} repetition
		 *
		 * @return {CanvasPattern}
		 */
		createPattern: function (image, repetition)
		{
		},

		/**
		 *
		 * @param {number} x0
		 * @param {number} y0
		 * @param {number} r0
		 * @param {number} x1
		 * @param {number} y1
		 * @param {number} r1
		 * @param {...(number,string)} var_args
		 *
		 * @return {CanvasGradient}
		 */
		createRadialGradient: function (x0, y0, r0, x1, y1, r1, var_args)
		{
		},

		/**
		 *
		 * @param {Element} element
		 * @param {number} xCaret
		 * @param {number} yCaret
		 * @param {boolean=} [canDrawCustom]
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		drawFocusRing: function (element, xCaret, yCaret, canDrawCustom)
		{
		},

		/**
		 * @this {sc.html.modules.IRenderingContext2D}
		 *
		 * @param {(HTMLCanvasElement|HTMLImageElement|HTMLVideoElement)} img_elem
		 * @param {number} dx_or_sx
		 * @param {number} dy_or_sy
		 * @param {number=} dw_or_sw
		 * @param {number=} dh_or_sh
		 * @param {number=} dx
		 * @param {number=} dy
		 * @param {number=} dw
		 * @param {number=} dh
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		drawImageAt: function (img_elem, dx_or_sx, dy_or_sy, dw_or_sw, dh_or_sh, dx, dy, dw, dh)
		{
		},

		/**
		 * @this {sc.html.modules.IRenderingContext2D}
		 *
		 * @param {(HTMLCanvasElement|HTMLImageElement|HTMLVideoElement)} img_elem
		 * @param {number} sx
		 * @param {number} sy
		 * @param {number} sw
		 * @param {number} sh
		 * @param {number} dx
		 * @param {number} dy
		 * @param {number=} dw
		 * @param {number=} dh
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		drawPartialImageAt: function (img_elem, sx, sy, sw, sh, dx, dy, dw, dh)
		{
		},

		/**
		 *
		 * @param {(HTMLCanvasElement|HTMLImageElement|HTMLVideoElement)} img_elem
		 * @param {number} angle
		 * @param {number} x
		 * @param {number} y
		 * @param {number} w
		 * @param {number} h
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		drawRotatedImageAt: function (img_elem, angle, x, y, w, h)
		{
		},

		/**
		 *
		 * @param {sc.geom.ISegment} segment
		 * @param {boolean=} moveTo
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		drawSegment: function (segment, moveTo)
		{
		},

		/**
		 *
		 * @param {number} x
		 * @param {number} y
		 * @param {number} hRadius
		 * @param {number} vRadius
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		ellipse: function (x, y, hRadius, vRadius)
		{
		},

		/**
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		fill: function ()
		{
		},

		/**
		 *
		 * @param {number} x
		 * @param {number} y
		 * @param {number} w
		 * @param {number} h
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		fillRect: function (x, y, w, h)
		{
		},

		/**
		 *
		 * @param {?string|CanvasGradient|CanvasPattern=} style
		 *
		 * @return {string|CanvasGradient|CanvasPattern|sc.html.modules.IRenderingContext2D}
		 */
		fillStyle: function (style)
		{
		},

		/**
		 *
		 * @param {string} text
		 * @param {number} x
		 * @param {number} y
		 * @param {number=} maxWidth
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		fillText: function (text, x, y, maxWidth)
		{
		},

		/**
		 *
		 * @param {string=} fontFamily
		 * @param {number|string=} size
		 * @param {string=} style
		 *
		 * @return {(sc.html.modules.IRenderingContext2D|string)}
		 */
		font: function (fontFamily, size, style)
		{
		},

		/**
		 *
		 * @param {number} sx
		 * @param {number} sy
		 * @param {number} sw
		 * @param {number} sh
		 *
		 * @return {ImageData}
		 */
		getImageData: function (sx, sy, sw, sh)
		{
		},

		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(sc.html.modules.IRenderingContext2D|number)}
		 */
		globalAlpha: function (value)
		{
		},

		/**
		 *
		 * @param {string=} value
		 *
		 * @return {(sc.html.modules.IRenderingContext2D|string)}
		 */
		globalCompositeOperation: function (value)
		{
		},

		/**
		 *
		 * @param {boolean=} value
		 *
		 * @return {(sc.html.modules.IRenderingContext2D|boolean)}
		 */
		imageSmoothingEnabled: function (value)
		{
		},

		/**
		 *
		 * @param {number} x
		 * @param {number} y
		 *
		 * @return {boolean}
		 */
		isPointInPath: function (x, y)
		{
		},

		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(sc.html.modules.IRenderingContext2D|number)}
		 */
		lineCap: function (value)
		{
		},

		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(sc.html.modules.IRenderingContext2D|number)}
		 */
		lineJoin: function (value)
		{
		},

		/**
		 *
		 * @param {Array<number>} coordinates
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		lines: function (coordinates)
		{
		},

		/**
		 *
		 * @param {number} x
		 * @param {number} y
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		lineTo: function (x, y)
		{
		},

		/**
		 *
		 * @param {sc.geom.IPoint} point
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		lineToPoint: function (point)
		{
		},

		/**
		 *
		 * @param {Array<sc.geom.Point>} points
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		lineToPoints: function (points)
		{
		},

		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(sc.html.modules.IRenderingContext2D|number)}
		 */
		lineWidth: function (value)
		{
		},

		/**
		 *
		 * @param {string} text
		 *
		 * @return {TextMetrics}
		 */
		measureText: function (text)
		{
		},

		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(sc.html.modules.IRenderingContext2D|number)}
		 */
		miterLimit: function (value)
		{
		},

		/**
		 *
		 * @param {number} x
		 * @param {number} y
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		moveTo: function (x, y)
		{
		},

		/**
		 *
		 * @param {sc.geom.IPoint} point
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		moveToPoint: function (point)
		{
		},

		/**
		 *
		 * @param {ImageData} image_data
		 * @param {number} dx
		 * @param {number} dy
		 * @param {number=} dirtyX
		 * @param {number=} dirtyY
		 * @param {number=} dirtyWidth
		 * @param {number=} dirtyHeight
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		putImageData: function (image_data, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight)
		{
		},

		/**
		 *
		 * @param {number} cpx
		 * @param {number} cpy
		 * @param {number} x
		 * @param {number} y
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		quadraticCurveTo: function (cpx, cpy, x, y)
		{
		},

		/**
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		restore: function ()
		{
		},

		/**
		 *
		 * @param {number} angle
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		rotate: function (angle)
		{
		},

		/**
		 *
		 * @param {number} x
		 * @param {number} y
		 * @param {number} width
		 * @param {number} height
		 * @param {number} radius
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		roundedRect: function (x, y, width, height, radius)
		{
		},

		/**
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		save: function ()
		{
		},

		/**
		 *
		 * @param {number} x
		 * @param {number} y
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		scale: function (x, y)
		{
		},

		/**
		 *
		 * @param {Array<number>} segments
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		setLineDash: function (segments)
		{
		},

		/**
		 *
		 * @param {number} m11
		 * @param {number} m12
		 * @param {number} m21
		 * @param {number} m22
		 * @param {number} dx
		 * @param {number} dy
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		setTransform: function (m11, m12, m21, m22, dx, dy)
		{
		},

		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(sc.html.modules.IRenderingContext2D|number)}
		 */
		shadowBlur: function (value)
		{
		},

		/**
		 *
		 * @param {string=} value
		 *
		 * @return {(sc.html.modules.IRenderingContext2D|string)}
		 */
		shadowColor: function (value)
		{
		},

		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(sc.html.modules.IRenderingContext2D|number)}
		 */
		shadowOffsetX: function (value)
		{
		},

		/**
		 *
		 * @param {number=} value
		 *
		 * @return {(sc.html.modules.IRenderingContext2D|number)}
		 */
		shadowOffsetY: function (value)
		{
		},

		/**
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		stroke: function ()
		{
		},

		/**
		 *
		 * @param {number} x
		 * @param {number} y
		 * @param {number} w
		 * @param {number} h
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		strokeRect: function (x, y, w, h)
		{
		},

		/**
		 *
		 * @param {?string|CanvasGradient|CanvasPattern=} style
		 * @param {number=} lineWidth
		 * @param {number=} lineCap
		 * @param {number=} lineJoin
		 * @param {number=} miterLimit
		 *
		 * @return {string|CanvasGradient|CanvasPattern|sc.html.modules.IRenderingContext2D}
		 */
		strokeStyle: function (style, lineWidth, lineCap, lineJoin, miterLimit)
		{
		},

		/**
		 *
		 * @param {string} text
		 * @param {number} x
		 * @param {number} y
		 * @param {number=} maxWidth
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		strokeText: function (text, x, y, maxWidth)
		{
		},

		/**
		 *
		 * @param {string=} value
		 *
		 * @return {(sc.html.modules.IRenderingContext2D|string)}
		 */
		textAlign: function (value)
		{
		},

		/**
		 *
		 * @param {string=} value
		 *
		 * @return {(sc.html.modules.IRenderingContext2D|string)}
		 */
		textBaseline: function (value)
		{
		},

		/**
		 *
		 * @param {number} m11
		 * @param {number} m12
		 * @param {number} m21
		 * @param {number} m22
		 * @param {number} dx
		 * @param {number} dy
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		transform: function (m11, m12, m21, m22, dx, dy)
		{
		},

		/**
		 *
		 * @param {number} x
		 * @param {number} y
		 *
		 * @return {sc.html.modules.IRenderingContext2D}
		 */
		translate: function (x, y)
		{
		}
	};
});
