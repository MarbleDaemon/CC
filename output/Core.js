(function ()
{
	function k(a, b)
	{
		var c = l.U, d = new n;
		d[c] = b[c];
		d[c].fa = b;
		a[c] = new d;
		a[c].constructor = a
	};
	var aa = [[[179, 84], [174, 162], [186, 182], [179, 224], [180, 261], [187, 278], [178, 337], [194, 345], [228, 325], [254, 340], [281, 325], [316, 295], [318, 241], [316, 224], [330, 165],
	           [328, 98], [323, 71], [328, 54], [343, 44], [343, -1E3], [302, -1E3], [287, 57], [286, 106], [291, 118], [284, 212], [274, 202], [257, 236], [239, 209], [228, 229], [216, 194],
	           [213, 158], [220, 140], [204, 98], [196, 126], [188, 86]]];

	function ca(a, b)
	{
		this.a = a;
		this.b = b || 1
	};
	var da = new Function;
	da.prototype = {R: "apply", r: "call", k: "height", n: "length", U: "prototype", V: "setTimeout", W: "splice", l: "width"};
	var l = new da;
	var p = 0, ea = Array, n = Function, q = Math, t = document, fa = {}.toString, u = window;
	var ga = new n;
	ga.prototype = {X: "string"};
	var ha = new ga;
	fa.call(u);
	function w(a)
	{
		return void 0 === a
	};
	var x = [];

	function ia(a, b)
	{
		return x.concat.apply(a, x.slice[l.r](arguments, 1, void 0))
	}

	function y(a, b, c)
	{
		var d = a[l.n];
		for (c = c || 0; c < d; c++)if (!1 === b(a[c], c, a))return !1;
		return !0
	}

	function z(a, b)
	{
		return A(x.indexOf, a, b)
	}

	function B(a)
	{
		return a[a[l.n] - 1]
	}

	function ja(a, b)
	{
		var c = [];
		y(a, function (a, e)
		{
			var f = b(a, e);
			!w(f) && C(c, f)
		}, 0);
		return c
	}

	function C(a, b)
	{
		a[a[l.n]] = b
	}

	function ka(a, b)
	{
		var c = z(a, b);
		-1 < c && la(a, c, 1)
	}

	function la(a, b, c, d)
	{
		x[l.W].apply(a, x.slice[l.r](arguments, 1, void 0))
	}

	function ma(a, b)
	{
		var c = 0;
		y(a, function (a, e, f)
		{
			c = b(c, a, e, f)
		}, void 0);
		return c
	}

	function D(a, b)
	{
		return y(a, b, void 0)
	}

	function na(a, b)
	{
		return ja(a, b)
	}

	function A(a, b, c)
	{
		var d = x.slice[l.r](arguments, 2, void 0);
		return a[l.R](b, d)
	}

	function oa(a)
	{
		var b;
		b = 1;
		for (var c = 0; c < b; c++)a(c, b)
	};
	var pa = q.abs, qa = 2 * q.PI, ra = q.random, sa = q.round, ta = q.sqrt, ua = q.SQRT2;

	function E(a)
	{
		this.Z = a
	}

	E.prototype.a = !1;
	E.prototype.b = 1;
	E.prototype.c = 1;
	E.prototype.g = -1;
	E.prototype.i = 0;
	function va(a)
	{
		if (w(!0))return a.a;
		a.a = !0;
		return a
	}

	function wa(a)
	{
		if (w(72))return a.b;
		a.b = 72;
		return a
	}

	function xa(a)
	{
		if (w(1))return a.c;
		a.c = 1;
		return a
	}

	function ya(a, b)
	{
		if (w(b))return a.g;
		a.g = b;
		return a
	}

	function za(a)
	{
		if (w(0))return a.i;
		a.i = 0;
		return a
	};
	var Aa = p++, F = p++;
	p++;
	p++;
	var G = p++;
	p++;
	p++;
	p++;
	function Ba()
	{
		this.b = {}
	}

	Ba.prototype.a = function (a)
	{
		var b = new E(this);
		return this.b[a] = b
	};
	var Ca = new Ba;
	ya(xa(za(va(wa(ya(xa(za(va(wa(Ca.a(F))))), F).Z.a(G))))), G);
	function Da(a, b)
	{
		for (var c in a)c in a && b(a[c], c)
	}

	function Ea(a, b)
	{
		for (var c in a)if (c in a && a[c] == b)return !0;
		return !1
	};
	function Fa()
	{
		this.c = {};
		this.b = {}
	}

	Fa.prototype.a = function (a, b, c, d)
	{
		a in this.c || (this.c[a] = [], this.b[a] = 0);
		b = new ca(this, d);
		C(this.c[a], b);
		this.b[a] += b.b;
		return b
	};
	var Ga = (new Fa).a(F, Aa, F).a.a(G, Aa, G).a;

	function H(a)
	{
		this.a = ea.apply(null, a || []);
		return this
	}

	function Ha(a)
	{
		var b = Ia(aa), c = new H;
		Ja(b, function (b, e, f)
		{
			b = a(b, e, f);
			e = c.a;
			e[e[l.n]] = b
		});
		return c
	}

	function Ja(a, b)
	{
		for (var c = a.a, d = c[l.n], e = 0; e < d && !1 !== b(c[e], e, c); e++);
	}

	function Ka(a, b)
	{
		return new H(a.a.filter(b))
	}

	function La(a)
	{
		var b = new H;
		oa(function (c, d)
		{
			var e = a(c, d), f = b.a;
			f[f[l.n]] = e
		});
		return b
	}

	function Ia(a)
	{
		return new H(a instanceof H ? a.a : a)
	};
	function Ma(a, b, c, d)
	{
		return "rgba(" + [a || 0, b || 0, c || 0, void 0 == d ? 1 : d].join() + ")"
	};
	var Na = Ma(0, 0, 0, .25);

	function Oa()
	{
		var a = p++, b;
		this.P = function (a, d)
		{
			d ? a.O(this) : b = a
		};
		this.ca = function ()
		{
			return a
		};
		this.i = function (a)
		{
			a = a || [];
			C(a, this);
			!b || 0 <= z(a, b) || b.i(a);
			return this
		}
	};
	function Pa()
	{
		var a = [];
		A(Oa, this);
		this.O = function (b)
		{
			0 <= z(a, b) || (C(a, b), b.P(this))
		};
		this.$ = this.i;
		this.i = function (b)
		{
			b = b || [];
			this.$(b);
			y(a, function (a)
			{
				0 <= z(b, a) || a.i(b)
			});
			return this
		}
	}

	k(Pa, Oa);
	var I = {F: "mousedown", G: "mousemove", t: "mouseup"};
	var J = {J: "touchcancel", u: "touchend", v: "touchmove", p: "touchstart"};

	function K(a, b)
	{
		this.d = a || 0;
		this.e = b || 0
	}

	K.prototype.toString = function ()
	{
		return "[" + this.d + ", " + this.e + "]"
	};
	function L(a, b)
	{
		this.a = a;
		this.b = b;
		var c = pa(a.d - b.d), d = pa(a.e - b.e);
		this.c = c == d ? c * ua : ta(c * c + d * d)
	}

	function Qa(a, b)
	{
		var c = a.a, d = c.d, e = c.e, f = a.b, c = b.a, g = c.d, h = c.e, v = b.b, c = d - g, r = e - h, d = f.d - d, e = f.e - e, f = v.d - g, h = v.e - h, g = d * h - e * f;
		if (0 == g)return !1;
		h = r * f - c * h;
		if (0 == h)return !1;
		c = r * d - c * e;
		if (0 == c)return !1;
		r = h / g;
		c /= g;
		return 0 < r && 1 > r && 0 < c && 1 > c
	};
	function Ra(a, b, c)
	{
		A(L, this, b, c);
		b.b = c.a = this
	}

	k(Ra, L);
	function M(a, b, c, d, e)
	{
		A(K, this, b, c);
		this.a = d;
		this.b = e
	}

	k(M, K);
	M.prototype.toJSON = function ()
	{
		return [this.d, this.e]
	};
	function O(a)
	{
		var b = this, c = na(a, function (a)
		{
			return a instanceof ea ? a : [a.d, a.e]
		});
		0 < ma(c, function (a, b, f)
		{
			f = f < c.length - 1 ? c[f + 1] : c[0];
			return a += (f[0] - b[0]) * (f[1] + b[1])
		}) && (c = c.reverse());
		this.a = [];
		this.b = na(c, function (a, c)
		{
			var f, g = new M(0, a[0], a[1]);
			0 < c && (f = new Ra(0, B(b.a), g));
			C(b.a, g);
			return f
		});
		C(this.b, new Ra(0, B(b.a), b.a[0]))
	}

	function Sa(a, b)
	{
		return D(a.b, function (a)
		{
			if (Qa(b, a))return !1
		})
	}

	O.prototype.toString = function ()
	{
		return na(this.a, function (a)
		{
			return a.toString()
		}).join(", ")
	};
	O.prototype.toJSON = function ()
	{
		return this.a
	};
	var P = {}, Ta = l.k, Ua = l.l;

	function Q(a, b)
	{
		var c = t.createElement(a);
		b && (b instanceof u.HTMLElement ? b : b.element).appendChild(c);
		return c
	}

	function Va(a)
	{
		return new (P[a.tagName.toUpperCase()] || P.TAGNAME)(a)
	};
	var Wa = p++;

	function Xa(a)
	{
		A(O, this, a)
	}

	k(Xa, O);
	function Ya(a, b, c)
	{
		var d = R;
		Za(S(b));
		D(a.b, function (a, c)
		{
			if (0 == c)
			{
				var g = d ? d(a.a) : a.a;
				b.f.moveTo(g.d, g.e)
			}
			g = d ? d(a.b) : a.b;
			b.lineTo(g.d, g.e)
		});
		$a(ab(bb(cb(db(eb(fb(b), c.fillColor)), c.strokeColor, c.ea || 1), c.da || [])))
	};
	function T(a, b)
	{
		A(L, this, a, b);
		a.a[b.id] = b.a[a.id] = this
	}

	k(T, L);
	T.prototype.a = null;
	T.prototype.b = null;
	function gb(a, b)
	{
		A(K, this, b.d, b.e);
		this.id = a;
		this.c = [51, 51, 51];
		var c;
		if (b instanceof M)
		{
			var d = b.a.a;
			c = b.b.b;
			d = new K(b.d - d.d, b.e - d.e);
			c = new K(c.d - b.d, c.e - b.e);
			c = 0 > d.d * c.e - d.e * c.d
		}
		else c = !1;
		this.b = c;
		this.a = {}
	}

	k(gb, K);
	function hb()
	{
		var a = ib.a, b = this;
		this.a = [];
		this.m = [];
		this.c = a;
		this.b = null;
		D(a, function (a)
		{
			var d = null, e = null, f = [];
			D(a.a, function (a)
			{
				a = new gb(p++, a);
				d || (d = a);
				a.c = a.b ? [255, 127, 127] : [51, 255, 51];
				a.b || jb(b, a);
				e && (e.b || a.b || C(b.a, new T(e, a)));
				C(f, a);
				e = a
			});
			var g = B(f);
			D(f, function (a, c)
			{
				if (a.b)
				{
					var d = 0 == c ? g : f[c - 1], e = a == g ? f[0] : f[c + 1], N = new L(d, e);
					kb(b, N) && C(b.a, new T(d, e))
				}
			});
			C(b.a, new T(e, d));
			b.m = ia(b.m, f)
		})
	}

	function lb(a, b)
	{
		var c = new gb(p++, b);
		jb(a, c);
		C(a.m, c);
		return c
	}

	function kb(a, b)
	{
		return !1 !== D(a.c, function (a)
			{
				return Sa(a, b)
			})
	}

	function mb(a, b)
	{
		0 <= z(a.m, b) && (Da(b.a, function (c)
		{
			delete (c.a == b ? c.b : c.a).a[b.id];
			ka(a.a, c)
		}), ka(a.m, b));
		return a
	}

	function jb(a, b)
	{
		D(a.m, function (c)
		{
			if (b != c && !c.b)
			{
				var d = new L(b, c);
				kb(a, d) && C(a.a, new T(b, c))
			}
		})
	};
	function nb(a, b)
	{
		this.a = a;
		this.m = b
	};
	function ob()
	{
	};
	var pb = 1E3 / 3600;
	var qb = new function ()
	{
		var a = 0, b = [], c;
		this.a = function ()
		{
			return [u.innerWidth, u.innerHeight]
		};
		this.c = function (a)
		{
			var b = this.a(), c = this;
			b[0] ? a(b) : this.g(function ()
			{
				a(c.a());
				return c
			})
		};
		this.b = function ()
		{
			if (void 0 == c)
			{
				var a = u.DocumentTouch;
				c = "on" + J.p in u || a && t instanceof a
			}
			return c
		};
		this.g = function (c)
		{
			2 == a && C(b, c);
			a || (u.onload = function ()
			{
				y(b, function (a)
				{
					a()
				});
				a = 2
			}, a = 1)
		}
	};
	var rb = new n;
	rb.prototype = {w: ++p, B: ++p, s: ++p, M: ++p, H: ++p, A: ++p, I: ++p, T: ++p, D: ++p, L: ++p};
	function sb(a, b, c, d)
	{
		var e = b || new tb;
		if (qb.b())
		{
			var f = a.touches[0];
			a = a.target.getBoundingClientRect();
			b = f.clientX - a.left;
			a = f.clientY - a.top
		}
		else b = a.layerX || a.offsetX, a = a.layerY || a.offsetY;
		b /= c || 1;
		a /= d || 1;
		e.g = b - e.a;
		e.i = a - e.b;
		e.a = b;
		e.b = a;
		return e
	}

	function ub(a, b, c)
	{
		var d = U.T;
		"which"in a ? (a = a.which, 2 == a ? d = U.D : 3 == a && (d = U.L)) : "button"in a && (a = a.button, 2 == a ? d = U.L : 3 == a && (d = U.D));
		b.j[d] = !c;
		return d
	}

	var U = new rb;

	function tb()
	{
		this.h = this.i = this.g = this.b = this.a = 0;
		this.j = {};
		this.c = function ()
		{
			return new K(this.a, this.b)
		}
	};
	function vb(a, b)
	{
		for (var c = wb[0], d = [], e = lb(c, a), f = lb(c, b), g = [], h = [new nb(0, [e])], v, r = 0; 0 < h.length;)
		{
			r++;
			v = A(x.shift, h);
			var m = B(v.m);
			if (!(0 <= z(g, m)))
			{
				if (m == f)
				{
					d = v.m;
					break
				}
				C(g, m);
				Da(m.a, function (a, b)
				{
					var c;
					c = v;
					var d = B(c.m), e = d.a[b], d = e.a == d ? e.b : e.a;
					c = new nb(c.a + e.c + (new L(d, f)).c, ia(c.m, [d]));
					C(h, c)
				});
				h.sort(function (a, b)
				{
					var c = a.a, d = b.a;
					return c < d ? -1 : c > d ? 1 : 0
				})
			}
		}
		mb(mb(c, e), f);
		return d
	};
	var wb = [], ib = new H;

	function xb(a)
	{
		return new K(a.d, sa(a.e / .40625))
	}

	function R(a)
	{
		return new K(a.d, .40625 * a.e)
	}

	function yb()
	{
		ib = Ha(function (a)
		{
			return new Xa(a)
		});
		wb[0] = new hb;
		wb[0].b = zb.b
	};
	function Ab(a)
	{
		a.element && Da(a, function (b, c)
		{
			b && b[Wa] && (a[c] = new b(a))
		})
	}

	function V(a)
	{
		function b(a)
		{
			N = !1;
			f(U.B, m);
			var b = e(U.B, a);
			ba && (f(U.H, m), b |= e(U.H, a), ba = !1);
			ub(a, m, !0);
			return !b
		}

		function c(a)
		{
			var b = !1;
			m = sb(a, m, h.c, h.g);
			N ? (ba || (f(U.I, m), b = e(U.I, a), ba = !0), f(U.A, m), b |= e(U.A, a)) : (f(U.s, m), b |= e(U.s, a));
			return !b
		}

		function d(a)
		{
			N = !0;
			m = sb(a, m, h.c, h.g);
			m.h = ub(a, m);
			var b = m.a, c = m.b;
			f(U.M, m);
			u[l.V](function ()
			{
				N || m.a !== b || m.b !== c || f(U.w, m)
			}, 200);
			return !e(U.M, a)
		}

		function e(a, b)
		{
			v[a] && b.preventDefault && b.preventDefault();
			return v[a]
		}

		function f(a, b)
		{
			y(r[a] || [], function (a)
			{
				A(a, h, b)
			});
			return !e(a, b)
		}

		function g(b, c, d, e)
		{
			if (Ea(I, b) || Ea(J,
					b))qb.b() ? (I.F == b && (b = J.p), I.G == b && (b = J.v), I.t == b && (b = J.u)) : (J.p == b && (b = I.F), J.v == b && (b = I.G), J.J == b && (b = I.t), J.u == b && (b = I.t));
			var g = r[b], h = !!g;
			!h && (g = r[b] = []);
			!c || 0 <= z(g, c) || C(g, c);
			e || h || (c = f.bind(0, b), a.addEventListener ? a.addEventListener(b, c, d) : a["on" + b] = c)
		}

		A(Pa, this);
		a && (a.id = "sc.dom." + this.ca());
		var h = this;
		this.element = a;
		Ab(this);
		this.g = this.c = 1;
		var v = {}, r = {};
		this.Q = function (a, e)
		{
			Ea(U, a) && (g(J.p, d), g(J.v, c), g(J.u, b), g(J.J, b));
			g(a, e, void 0, !0);
			return this
		};
		var m = null, N = !1, ba = !1
	}

	k(V, Pa);
	V.prototype.query = function (a)
	{
		return (a = ((this ? this.element || this : void 0) || t).querySelector(a)) ? Va(a) : null
	};
	V.prototype.o = function (a, b)
	{
		var c = this.element;
		0 < arguments[l.n] && (a && (c[Ua] = parseInt(a, 10)), b && (c[Ta] = parseInt(b, 10)))
	};
	P.TAGNAME = V;
	function Bb(a)
	{
		return isNaN(a) && (-1 < a.indexOf("%") || -1 < a.indexOf("px")) ? a : a + "px"
	}

	var Cb = new n;
	Cb.prototype = {S: "display", k: l.k, C: "left", K: "position", Y: "style", N: "top", l: l.l};
	var W = new Cb;

	function Db(a)
	{
		function b(b, f)
		{
			if (1 < arguments.length)return d[b] = f;
			if (void 0 != d[b])return d[b];
			c || (c = u.getComputedStyle(a.element));
			return c.getPropertyValue(b)
		}

		var c = {}, d = a.element[W.Y];
		this.b = b;
		this.c = function (a, c, d)
		{
			0 < arguments[l.n] ? (b(W.K, d ? "fixed" : "absolute"), void 0 != a && b(W.C, Bb(a)), void 0 != c && b(W.N, Bb(c))) : (b(W.C), b(W.N))
		};
		this.a = function (a, c)
		{
			if (0 < arguments[l.n])return void 0 != a && b(W.l, Bb(a)), void 0 != c && b(W.k, Bb(c)), this;
			var d = {};
			d[W.l] = b(W.l);
			d[W.k] = b(W.k);
			return d
		}
	}

	Db[Wa] = !0;
	V.prototype.a = Db;
	var Eb = new n;
	Eb.prototype = {};
	new Eb;
	function X(a)
	{
		A(V, this, a)
	}

	k(X, V);
	P.CANVAS = X;
	function Fb()
	{
		A(X, this, Q("CANVAS"));
		this.h = function (a)
		{
			this.P(a, void 0);
			a = a.a.a();
			this.a.c(0, 0);
			this.o(a[l.l], a[l.k]);
			return this
		}
	}

	k(Fb, X);
	function Gb(a)
	{
		A(ob, this);
		this.element = a;
		this.a = a.element;
		this.f = this.a.getContext("2d")
	}

	k(Gb, ob);
	function Hb(a, b, c)
	{
		if (void 0 == c)return a.f[b];
		a.f[b] = c;
		return a
	}

	function Za(a)
	{
		a.f.beginPath();
		return a
	}

	function Ib(a)
	{
		a.f.clearRect(0, 0, a.a[l.l], a.a[l.k]);
		return a
	}

	function fb(a)
	{
		a.f.closePath();
		return a
	}

	function db(a)
	{
		a.f.fill();
		return a
	}

	function eb(a, b)
	{
		return Hb(a, "fillStyle", b)
	}

	Gb.prototype.lineTo = function (a, b)
	{
		this.f.lineTo(a, b);
		return this
	};
	function $a(a)
	{
		a.f.restore()
	}

	function S(a)
	{
		a.f.save();
		return a
	}

	function bb(a, b)
	{
		a.f.setLineDash && a.f.setLineDash(b);
		return a
	}

	function ab(a)
	{
		a.f.stroke();
		return a
	}

	function cb(a, b, c)
	{
		void 0 !== c && Hb(a, "lineWidth", c || 0);
		return Hb(a, "strokeStyle", b)
	}

	Gb[Wa] = !0;
	X.prototype.b = Gb;
	function Jb(a, b, c)
	{
		if (typeof a == ha.X)
		{
			var d = a;
			a = t.getElementById(d);
			a || (a = t.querySelector("[data-sc-element=" + d + "]")) || (a = Q("DIV", t.querySelector("[data-sc-app=" + d + "]")))
		}
		A(V, this, a);
		this.a.b(W.K, "relative");
		this.a.a(b, c)
	}

	k(Jb, V);
	function Kb(a)
	{
		var b = new Fb;
		a.element.appendChild(b.element);
		a.O(b);
		return b.h(a)
	}

	function Lb(a)
	{
		qb.c(function (b)
		{
			a.a.b(W.S, "block");
			a.a.a(b[0], b[1])
		})
	};
	function Mb(a, b, c, d, e, f, g)
	{
		var h = this, v = b || 0, r = c || 0;
		this.c = f || 1;
		this.g = g || 1;
		this.j = d || 0;
		this.h = e || 0;
		A(X, this, Q("CANVAS"));
		a.c(function ()
		{
			h.j || (h.j = a.a[l.l]);
			h.h || (h.h = a.a[l.k]);
			var b = h.j, c = h.h, d = b * h.c, e = c * h.g;
			h.o(d, e);
			h.b.f.drawImage(a.a, v, r, b, c, 0, 0, d, e)
		})
	}

	k(Mb, X);
	function Nb()
	{
		this.c = 0;
		this.g = null;
		this.o = [];
		this.b = new K(0, 0);
		this.q = new K(0, 0);
		this.i = 0;
		this.j = this.h = null;
		this.a = !1;
		return this
	}

	function Ob(a)
	{
		if (w(Ca))return a.g;
		a.g = Ca;
		return a
	}

	function Pb(a)
	{
		if (w(0) && w(0))return a.b;
		a.b.d = 0;
		a.b.e = 0;
		return a
	}

	function Qb(a)
	{
		if (w(1))return a.i;
		a.i = 1;
		return a
	}

	function Rb(a, b)
	{
		if (w(b))return a.h;
		a.h = b;
		return a
	}

	function Sb(a)
	{
		if (w(Ga))return a.j;
		a.j = Ga;
		return a
	};
	function Tb()
	{
		Ub--;
		0 == Ub && y(Vb, function (a)
		{
			a()
		})
	}

	var Wb = "", Ub = 0, Vb = [];

	function Xb(a)
	{
		0 <= z(Vb, a) || C(Vb, a)
	}

	var Yb = p++, Zb = p++;
	p++;
	var $b = p++;

	function ac(a, b)
	{
		function c()
		{
			var a = e;
			e = [];
			y(a, function (a)
			{
				a(d)
			});
			Tb()
		}

		var d = this, e = [], f = Yb;
		this.a = null;
		this.b = function ()
		{
			var c = this;
			if (f == Yb)
			{
				Ub++;
				f = Zb;
				var d = Q("IMG");
				d.src = Wb + "/" + a + "." + b;
				d.onload = function ()
				{
					this.onload = null;
					c.g()
				};
				this.a = d
			}
			return this
		};
		this.c = function (a, b)
		{
			f == $b ? a(this) : (C(e, a), b && this.b())
		};
		this.g = function ()
		{
			f = $b;
			c()
		}
	}

	function bc(a, b, c, d, e)
	{
		return new Mb(a, b, c, d, e, void 0, void 0)
	}

	function cc(a)
	{
		var b = 72, c = [];
		a.c(function ()
		{
			var d = a.a[l.l] / b, e = 1 == d % 2 ? d + 1 : d, f = a.a[l.k];
			1 == f % 2 && f++;
			for (var g = 0; 0 < b;)C(c, bc(a, g, 0, e, f)), g += d, b--
		});
		return c
	};
	var Y = new ac("M1AbramsTurret", "png"), dc = cc(Y);
	cc(function ()
	{
		var a = new ac;
		Ub++;
		Y.c(function ()
		{
			var b = Y.a[l.l], c = Y.a[l.k], d;
			d = Va(Q("CANVAS", void 0));
			d.o(b, c);
			var e = eb(d.b, Na);
			e.f.fillRect(0, 0, b, c);
			Hb(e, "globalCompositeOperation", "destination-in").f.drawImage(Y.a, 0, 0, b, c);
			a.a = d.element;
			a.g()
		}, void 0);
		return a
	}());
	function ec()
	{
		Qb(Pb(Rb(Sb(Ob(A(Nb, this))), dc)))
	}

	k(ec, Nb);
	var fc = new ac("M1Abrams", "png"), gc = cc(fc), hc = 72.4205 * pb;

	function ic()
	{
		var a;
		a = Qb(Pb(Rb(Sb(Ob(A(Nb, this))), gc)));
		w(hc) ? a = a.c : a.c = hc;
		var b = new ec;
		C(a.o, b)
	}

	k(ic, Nb);
	function Z(a)
	{
		var b = this;
		A(Jb, this, a);
		Lb(this);
		Kb(this);
		this.j = Kb(this);
		this.ba = Kb(this);
		this.b = Kb(this);
		setTimeout(function ()
		{
			jc(b)
		}, 1)
	}

	k(Z, Jb);
	Z.prototype.j = null;
	Z.prototype.b = null;
	Z.prototype.aa = {fillColor: Ma(255, 102, 102, .25), strokeColor: Ma(255, 102, 102), da: [5], ea: 2};
	function jc(a)
	{
		yb();
		Wb = "cc/resources/maps";
		bc((new ac("scb01ea", "jpg")).b());
		Wb = "cc/resources/entities/vehicles";
		fc.b();
		Y.b();
		Xb(function ()
		{
			Ja(ib, function (b)
			{
				Ya(b, a.j.b, a.aa)
			});
			kc(lc(mc(a)))
		})
	}

	function mc(a)
	{
		a.h = La(function ()
		{
			var a = new ic, c = 200 * ra() + 500, d = 450 * ra() + 50;
			!w(c) && (a.q.d = c);
			!w(d) && (a.q.e = d);
			a.a = !1;
			return a
		});
		return a
	}

	function lc(a)
	{
		a.Q(U.w, function (a)
		{
			xb(a.c())
		}).Q(U.s, function (b)
		{
			b = xb(b.c());
			var c = Ib(a.b.b);
			b = vb(a.h.a[0].q, b);
			D(b, function (a)
			{
				a = R(a);
				var b = Za(S(c));
				b.f.arc(a.d, a.e, 5, 0, qa, void 0);
				$a(db(eb(fb(b), "#933")))
			});
			Za(S(c));
			D(b, function (a, b)
			{
				a = R(a);
				0 == b ? c.f.moveTo(a.d, a.e) : c.lineTo(a.d, a.e)
			});
			$a(fb(ab(cb(c, "#933", 2))))
		});
		return a
	}

	function kc(a)
	{
		var b = a.ba.b;
		Ja(Ka(Ia(a.h), function (a)
		{
			return !a.a
		}), function (a, d)
		{
			0 == d && Ib(b);
			if (!a.a)
			{
				var e = R(a.q), f = Rb(a)[0], g = f.element, h = e.d, e = e.e, v = f.j * f.c * 1, f = f.h * f.g * 1, r = S(b);
				r.f.translate(h, e);
				r.f.rotate(0);
				r.f.drawImage(g, -v / 2, -f / 2, v, f);
				$a(r);
				a.a = !0
			}
			console.log("ok")
		})
	};
	var zb = new Z("Commander");
})();
