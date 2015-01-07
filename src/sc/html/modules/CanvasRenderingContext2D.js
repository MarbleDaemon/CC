goog.require("sc.constants");
goog.require("sc.core.Maths");
goog.require("sc.core.Utils");
goog.require("sc.html.DOMCanvasElement");
goog.require("sc.html.IDOMCanvasElement");
goog.require("sc.html.IDOMModule");
goog.require("sc.html.modules.RenderingContext2D");

goog.provide("sc.html.modules.CanvasRenderingContext2D");
goog.scope(function ()
{
	var constants = sc.constants;

	var ArrayUtils = sc.core.ArrayUtils;
	var FunctionUtils = sc.core.FunctionUtils;
	var Maths = sc.core.Maths;
	var Operations = sc.html.modules.context2d.Operations;
	var RenderingContext2D = sc.html.modules.RenderingContext2D;

	/**
	 * @private
	 *
	 * @param {CanvasGradient} gradient
	 * @param {*} colorStops
	 * @param {number} skip
	 */
	function _addColorStop(gradient, colorStops, skip)
	{
		ArrayUtils.forEachBatch(colorStops,
			/**
			 * @param {number} offset
			 * @param {string} color
			 */
			function (offset, color)
			{
				gradient.addColorStop(offset, color);
			}, 2, skip);

		return gradient;
	}

	/**
	 * @constructor
	 * @implements {sc.html.modules.IRenderingContext2D}
	 * @extends {sc.html.modules.RenderingContext2D}
	 *
	 * @param {sc.html.IDOMCanvasElement} element
	 */
	sc.html.modules.CanvasRenderingContext2D = goog.defineClass(RenderingContext2D, {
		constructor: function (element)
		{
			FunctionUtils.invoke(RenderingContext2D, this);

			/**
			 *
			 * @type {sc.html.IDOMCanvasElement}
			 */
			this.element = element;

			/**
			 *
			 * @private
			 *
			 * @type {HTMLCanvasElement}
			 */
			this._canvas = element.element;

			/**
			 *
			 * @private
			 *
			 * @type {CanvasRenderingContext2D}
			 */
			this._context2D = /** @type {CanvasRenderingContext2D} */(this._canvas.getContext("2d"));
		},

		/**
		 * @private
		 *
		 * @param {string} key
		 * @param {?} value
		 *
		 * @return {?|sc.html.modules.CanvasRenderingContext2D}
		 */
		_getSetValue: function (key, value)
		{
			if (value == undefined)
			{
				return /** @type {?} */ (this._context2D[key]);
			}

			this._context2D[key] = value;

			return this;
		},

		/**
		 *
		 * @param {number} x
		 * @param {number} y
		 * @param {number} radius
		 * @param {number} startAngle
		 * @param {number} endAngle
		 * @param {boolean=} antiClockWise
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		arc: function (x, y, radius, startAngle, endAngle, antiClockWise)
		{
			this._context2D.arc(x, y, radius, startAngle, endAngle, antiClockWise);

			return this;
		},

		/**
		 *
		 * @param {number} x1
		 * @param {number} y1
		 * @param {number} x2
		 * @param {number} y2
		 * @param {number} radius
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		arcTo: function (x1, y1, x2, y2, radius)
		{
			this._context2D.arcTo(x1, y1, x2, y2, radius);

			return this;
		},

		/**
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		beginPath: function ()
		{
			this._context2D.beginPath();

			return this;
		},

		/**
		 *
		 * @param {Array<number>} coordinates
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		bezierCurves: function (coordinates)
		{
			/**
			 * @type {sc.html.modules.CanvasRenderingContext2D}
			 */
			var thi$ = this;
			ArrayUtils.forEachBatch(coordinates, function (cp1x, cp1y, cp2x, cp2y, x, y)
			{
				thi$.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
			}, 6);

			return this;
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
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		bezierCurveTo: function (cp1x, cp1y, cp2x, cp2y, x, y)
		{
			this._context2D.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);

			return this;
		},

		/**
		 *
		 * @param {string} color
		 * @param {?number=} blur
		 * @param {?number=} offsetX
		 * @param {?number=} offsetY
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		castShadow: function (color, blur, offsetX, offsetY)
		{
			this._context2D[Operations.SHADOW_COLOR] = color;
			(undefined !== blur) && (this._context2D[Operations.SHADOW_BLUR] = blur || 0);
			(undefined !== offsetX) && (this._context2D[Operations.SHADOW_OFFSET_X] = offsetX || 0);
			(undefined !== offsetY) && (this._context2D[Operations.SHADOW_OFFSET_Y] = offsetY || 0);

			return this;
		},

		/**
		 *
		 * @param x
		 * @param y
		 * @param radius
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		circle: function (x, y, radius)
		{
			this.arc(x, y, radius, 0, Maths.PI2);

			return this;
		},

		/**
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		clear: function ()
		{
			this._context2D[Operations.CLEAR_RECT](0, 0, this._canvas[constants.WIDTH], this._canvas[constants.HEIGHT]);
			this.element.invalidate();

			return this;
		},

		/**
		 *
		 * @param {number} x
		 * @param {number} y
		 * @param {number} w
		 * @param {number} h
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		clearRect: function (x, y, w, h)
		{
			this._context2D.clearRect(x, y, w, h);
			this.element.invalidate();

			return this;
		},

		/**
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		clip: function ()
		{
			this._context2D.clip();
			this.element.invalidate();

			return this;
		},

		/**
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		closePath: function ()
		{
			this._context2D.closePath();

			return this;
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
			//return sh ? this._context2D.createImageData(/** @type {number} */(imageData_or_sw), sh) :
			// this._context2D.createImageData(/** @type {ImageData} */(imageData_or_sw));
			return this._context2D.createImageData.apply(this._context2D, arguments);
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
			return _addColorStop(this._context2D.createLinearGradient(x0, y0, x1, y1), arguments, 4);
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
			return this._context2D.createPattern(/** @type {(HTMLCanvasElement|HTMLImageElement)} */(image),
				repetition);
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
			return _addColorStop(this._context2D.createRadialGradient(x0, y0, r0, x1, y1, r1), arguments, 6);
		},

		/**
		 *
		 * @param {Element} element
		 * @param {number} xCaret
		 * @param {number} yCaret
		 * @param {boolean=} [canDrawCustom]
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		drawFocusRing: function (element, xCaret, yCaret, canDrawCustom)
		{
			// Not supported
			//this._context2D.drawFocusRing(element, xCaret, yCaret, canDrawCustom);
			this.element.invalidate();

			return this;
		},

		/**
		 * @this {sc.html.modules.CanvasRenderingContext2D}
		 *
		 * @param {(HTMLCanvasElement|HTMLImageElement|HTMLVideoElement)} img_elem
		 * @param {number} dx
		 * @param {number} dy
		 * @param {number=} dw
		 * @param {number=} dh
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		drawImageAt: function (img_elem, dx, dy, dw, dh)
		{
			this._context2D[Operations.DRAW_IMAGE](img_elem, dx, dy, dw, dh);
			this.element.invalidate();

			return this;
		},

		/**
		 * @this {sc.html.modules.CanvasRenderingContext2D}
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
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		drawPartialImageAt: function (img_elem, sx, sy, sw, sh, dx, dy, dw, dh)
		{
			this._context2D[Operations.DRAW_IMAGE](img_elem, sx, sy, sw, sh, dx, dy, dw, dh);
			this.element.invalidate();

			return this;
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
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		drawRotatedImageAt: function (img_elem, angle, x, y, w, h)
		{
			this
				.save()

				.translate(x, y)
				.rotate(angle)
				.drawImageAt(img_elem, -w / 2, -h / 2, w, h)

				.restore();

			this.element.invalidate();

			return this;
		},

		/**
		 *
		 * @param {number} x
		 * @param {number} y
		 * @param {number} hRadius
		 * @param {number} vRadius
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		ellipse: function (x, y, hRadius, vRadius)
		{
			this.save()
				.translate(x, y);

			if (hRadius > vRadius)
			{
				this.scale(1, vRadius / hRadius)
					.circle(0, 0, hRadius);
			}
			else
			{
				this.scale(hRadius / vRadius, 1)
					.circle(0, 0, vRadius);
			}

			return this
				.closePath()
				.restore();
		},

		/**
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		fill: function ()
		{
			this._context2D.fill();
			this.element.invalidate();

			return this;
		},

		/**
		 *
		 * @param {number} x
		 * @param {number} y
		 * @param {number} w
		 * @param {number} h
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		fillRect: function (x, y, w, h)
		{
			this._context2D.fillRect(x, y, w, h);
			this.element.invalidate();

			return this;
		},

		/**
		 *
		 * @param {?string|CanvasGradient|CanvasPattern=} style
		 *
		 * @return {string|CanvasGradient|CanvasPattern|sc.html.modules.CanvasRenderingContext2D}
		 */
		fillStyle: function (style)
		{
			return this._getSetValue("fillStyle", style);
		},

		/**
		 *
		 * @param {string} text
		 * @param {number} x
		 * @param {number} y
		 * @param {number=} maxWidth
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		fillText: function (text, x, y, maxWidth)
		{
			this._context2D.fillText(text, x, y, maxWidth);

			return this;
		},

		/**
		 *
		 * @param {?string=} fontFamily
		 * @param {?number|string=} size
		 * @param {?string=} style
		 *
		 * @return {(sc.html.modules.CanvasRenderingContext2D|string)}
		 */
		font: function (fontFamily, size, style)
		{
			var key = "font";
			if (0 == arguments.length)
			{
				return this._context2D[key];
			}
			else
			{
				this._context2D[key] = ArrayUtils.join([style || "", size ? (size + "pt") : "", fontFamily], ' ');

				return this;
			}
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
			return this._context2D.getImageData(sx, sy, sw, sh);
		},

		/**
		 *
		 * @param {?number=} value
		 *
		 * @return {(sc.html.modules.CanvasRenderingContext2D|number)}
		 */
		globalAlpha: function (value)
		{
			return this._getSetValue("globalAlpha", value);
		},

		/**
		 *
		 * @param {string=} value
		 *
		 * @return {(sc.html.modules.CanvasRenderingContext2D|string)}
		 */
		globalCompositeOperation: function (value)
		{
			return this._getSetValue("globalCompositeOperation", value);
		},

		/**
		 *
		 * @param {?boolean=} value
		 *
		 * @return {(sc.html.modules.CanvasRenderingContext2D|boolean)}
		 */
		imageSmoothingEnabled: function (value)
		{
			return this._getSetValue("imageSmoothingEnabled", value);
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
			return this._context2D.isPointInPath(x, y);
		},

		/**
		 *
		 * @param {?number=} value
		 *
		 * @return {(sc.html.modules.CanvasRenderingContext2D|number)}
		 */
		lineCap: function (value)
		{
			return this._getSetValue("lineCap", value);
		},

		/**
		 *
		 * @param {?number=} value
		 *
		 * @return {(sc.html.modules.CanvasRenderingContext2D|number)}
		 */
		lineJoin: function (value)
		{
			return this._getSetValue("lineJoin", value);
		},

		/**
		 *
		 * @param {Array<number>} coordinates
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		lines: function (coordinates)
		{
			/**
			 * @type {sc.html.modules.CanvasRenderingContext2D}
			 */
			var thi$ = this;
			ArrayUtils.forEachBatch(coordinates, function (x, y)
			{
				thi$.lineTo(x, y);
			}, 2);

			return this;
		},

		/**
		 *
		 * @param {number} x
		 * @param {number} y
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		lineTo: function (x, y)
		{
			this._context2D.lineTo(x, y);

			return this;
		},

		/**
		 *
		 * @param {?number=} value
		 *
		 * @return {(sc.html.modules.CanvasRenderingContext2D|number)}
		 */
		lineWidth: function (value)
		{
			return this._getSetValue("lineWidth", value);
		},

		/**
		 *
		 * @param {string} text
		 *
		 * @return {TextMetrics}
		 */
		measureText: function (text)
		{
			return this._context2D.measureText(text);
		},

		/**
		 *
		 * @param {?number=} value
		 *
		 * @return {(sc.html.modules.CanvasRenderingContext2D|number)}
		 */
		miterLimit: function (value)
		{
			return this._getSetValue("miterLimit", value);
		},

		/**
		 *
		 * @param {number} x
		 * @param {number} y
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		moveTo: function (x, y)
		{
			var context2D = this._context2D;
			context2D.moveTo(x, y);

			return this;
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
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		putImageData: function (image_data, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight)
		{
			this._context2D.putImageData(image_data, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
			this.element.invalidate();

			return this;
		},

		/**
		 *
		 * @param {number} cpx
		 * @param {number} cpy
		 * @param {number} x
		 * @param {number} y
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		quadraticCurveTo: function (cpx, cpy, x, y)
		{
			this._context2D.quadraticCurveTo(cpx, cpy, x, y);

			return this;
		},

		/**
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		restore: function ()
		{
			this._context2D.restore();

			return this;
		},

		/**
		 *
		 * @param {number} angle
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		rotate: function (angle)
		{
			this._context2D.rotate(angle);

			return this;
		},

		/**
		 *
		 * @param {number} x
		 * @param {number} y
		 * @param {number} width
		 * @param {number} height
		 * @param {number} radius
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		roundedRect: function (x, y, width, height, radius)
		{
			return this
				.translate(x, y)

				.beginPath()
				.moveTo(radius, 0)
				.lineTo(width - radius, 0)
				.quadraticCurveTo(width, 0, width, radius)
				.lineTo(width, height - radius)
				.quadraticCurveTo(width, height, width - radius, height)
				.lineTo(radius, height)
				.quadraticCurveTo(0, height, 0, height - radius)
				.lineTo(0, radius)
				.quadraticCurveTo(0, 0, radius, 0)
				.closePath()

				.translate(-x, -y);
		},

		/**
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		save: function ()
		{
			this._context2D.save();

			return this;
		},

		/**
		 *
		 * @param {number} x
		 * @param {number} y
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		scale: function (x, y)
		{
			this._context2D.scale(x, y);

			return this;
		},

		/**
		 *
		 * @param {Array<number>} segments
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		setLineDash: function (segments)
		{
			if (this._context2D[Operations.SET_LINE_DASH])
			{
				this._context2D[Operations.SET_LINE_DASH](segments);
			}

			return this;
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
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		setTransform: function (m11, m12, m21, m22, dx, dy)
		{
			this._context2D.setTransform(m11, m12, m21, m22, dx, dy);

			return this;
		},

		/**
		 *
		 * @param {?number=} value
		 *
		 * @return {(sc.html.modules.CanvasRenderingContext2D|number)}
		 */
		shadowBlur: function (value)
		{
			return this._getSetValue('shadowBlur', value);
		},

		/**
		 *
		 * @param {?string=} value
		 *
		 * @return {(sc.html.modules.CanvasRenderingContext2D|string)}
		 */
		shadowColor: function (value)
		{
			return this._getSetValue('shadowColor', value);
		},

		/**
		 *
		 * @param {?number=} value
		 *
		 * @return {(sc.html.modules.CanvasRenderingContext2D|number)}
		 */
		shadowOffsetX: function (value)
		{
			return this._getSetValue('shadowOffsetX', value);
		},

		/**
		 *
		 * @param {?number=} value
		 *
		 * @return {(sc.html.modules.CanvasRenderingContext2D|number)}
		 */
		shadowOffsetY: function (value)
		{
			return this._getSetValue('shadowOffsetX', value);
		},

		/**
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		stroke: function ()
		{
			this._context2D.stroke();
			this.element.invalidate();

			return this;
		},

		/**
		 *
		 * @param {number} x
		 * @param {number} y
		 * @param {number} w
		 * @param {number} h
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		strokeRect: function (x, y, w, h)
		{
			this._context2D.strokeRect(x, y, w, h);
			this.element.invalidate();

			return this;
		},

		/**
		 *
		 * @param {?string|CanvasGradient|CanvasPattern=} style
		 * @param {number=} lineWidth
		 * @param {number=} lineCap
		 * @param {number=} lineJoin
		 * @param {number=} miterLimit
		 *
		 * @return {string|CanvasGradient|CanvasPattern|sc.html.modules.CanvasRenderingContext2D}
		 */
		strokeStyle: function (style, lineWidth, lineCap, lineJoin, miterLimit)
		{
			(undefined !== lineWidth) && (this.lineWidth(lineWidth || 0));
			(undefined !== lineCap) && (this.lineCap(lineCap || 0));
			(undefined !== lineJoin) && (this.lineJoin(lineJoin || 0));
			(undefined !== miterLimit) && (this.miterLimit(miterLimit || 0));

			return this._getSetValue('strokeStyle', style);
		},

		/**
		 *
		 * @param {string} text
		 * @param {number} x
		 * @param {number} y
		 * @param {number=} maxWidth
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		strokeText: function (text, x, y, maxWidth)
		{
			this._context2D.strokeText(text, x, y, maxWidth);
			this.element.invalidate();

			return this;
		},

		/**
		 *
		 * @param {?string=} value
		 *
		 * @return {(sc.html.modules.CanvasRenderingContext2D|string)}
		 */
		textAlign: function (value)
		{
			return this._getSetValue('textAlign', value);
		},

		/**
		 *
		 * @param {?string=} value
		 *
		 * @return {(sc.html.modules.CanvasRenderingContext2D|string)}
		 */
		textBaseline: function (value)
		{
			return this._getSetValue('textBaseline', value);
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
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		transform: function (m11, m12, m21, m22, dx, dy)
		{
			this._context2D.transform(m11, m12, m21, m22, dx, dy);

			return this;
		},

		/**
		 *
		 * @param {number} x
		 * @param {number} y
		 *
		 * @return {sc.html.modules.CanvasRenderingContext2D}
		 */
		translate: function (x, y)
		{
			this._context2D.translate(x, y);

			return this;
		}
	});

	sc.html.modules.CanvasRenderingContext2D[sc.html.isModule] = true;

	/**
	 * @type {sc.html.modules.IRenderingContext2D}
	 */
	sc.html.DOMCanvasElement.prototype.context2D = /** @type {sc.html.modules.CanvasRenderingContext2D} */(/** @type {Object} */(sc.html.modules.CanvasRenderingContext2D));
})
;
