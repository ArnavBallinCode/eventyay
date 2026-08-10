import { o as e, t } from "./pretalx-schedule-rolldown-runtime.js";
import { G as n, H as r, J as i, K as a, L as o, Q as s, R as c, U as l, V as u, W as d, X as f, Y as p, Z as m, _t as h, at as g, bt as _, ct as v, dt as y, et as ee, ft as b, gt as x, ht as te, it as ne, lt as S, mt as re, ot as ie, pt as C, q as ae, rt as w, st as oe, tt as se, ut as ce, vt as T, xt as E, yt as D } from "./pretalx-schedule-chunk-grid.js";
//#region node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js
var le = (function() {
	if (typeof Map < "u") return Map;
	function e(e, t) {
		var n = -1;
		return e.some(function(e, r) {
			return e[0] === t && (n = r, !0);
		}), n;
	}
	return function() {
		function t() {
			this.__entries__ = [];
		}
		return Object.defineProperty(t.prototype, "size", {
			get: function() {
				return this.__entries__.length;
			},
			enumerable: !0,
			configurable: !0
		}), t.prototype.get = function(t) {
			var n = e(this.__entries__, t), r = this.__entries__[n];
			return r && r[1];
		}, t.prototype.set = function(t, n) {
			var r = e(this.__entries__, t);
			~r ? this.__entries__[r][1] = n : this.__entries__.push([t, n]);
		}, t.prototype.delete = function(t) {
			var n = this.__entries__, r = e(n, t);
			~r && n.splice(r, 1);
		}, t.prototype.has = function(t) {
			return !!~e(this.__entries__, t);
		}, t.prototype.clear = function() {
			this.__entries__.splice(0);
		}, t.prototype.forEach = function(e, t) {
			t === void 0 && (t = null);
			for (var n = 0, r = this.__entries__; n < r.length; n++) {
				var i = r[n];
				e.call(t, i[1], i[0]);
			}
		}, t;
	}();
})(), ue = typeof window < "u" && typeof document < "u" && window.document === document, O = (function() {
	return typeof global < "u" && global.Math === Math ? global : typeof self < "u" && self.Math === Math ? self : typeof window < "u" && window.Math === Math ? window : Function("return this")();
})(), de = (function() {
	return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(O) : function(e) {
		return setTimeout(function() {
			return e(Date.now());
		}, 1e3 / 60);
	};
})(), fe = 2;
function pe(e, t) {
	var n = !1, r = !1, i = 0;
	function a() {
		n && (n = !1, e()), r && s();
	}
	function o() {
		de(a);
	}
	function s() {
		var e = Date.now();
		if (n) {
			if (e - i < fe) return;
			r = !0;
		} else n = !0, r = !1, setTimeout(o, t);
		i = e;
	}
	return s;
}
var me = 20, he = [
	"top",
	"right",
	"bottom",
	"left",
	"width",
	"height",
	"size",
	"weight"
], ge = typeof MutationObserver < "u", _e = function() {
	function e() {
		this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = pe(this.refresh.bind(this), me);
	}
	return e.prototype.addObserver = function(e) {
		~this.observers_.indexOf(e) || this.observers_.push(e), this.connected_ || this.connect_();
	}, e.prototype.removeObserver = function(e) {
		var t = this.observers_, n = t.indexOf(e);
		~n && t.splice(n, 1), !t.length && this.connected_ && this.disconnect_();
	}, e.prototype.refresh = function() {
		this.updateObservers_() && this.refresh();
	}, e.prototype.updateObservers_ = function() {
		var e = this.observers_.filter(function(e) {
			return e.gatherActive(), e.hasActive();
		});
		return e.forEach(function(e) {
			return e.broadcastActive();
		}), e.length > 0;
	}, e.prototype.connect_ = function() {
		!ue || this.connected_ || (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), ge ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
			attributes: !0,
			childList: !0,
			characterData: !0,
			subtree: !0
		})) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
	}, e.prototype.disconnect_ = function() {
		!ue || !this.connected_ || (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
	}, e.prototype.onTransitionEnd_ = function(e) {
		var t = e.propertyName, n = t === void 0 ? "" : t;
		he.some(function(e) {
			return !!~n.indexOf(e);
		}) && this.refresh();
	}, e.getInstance = function() {
		return this.instance_ ||= new e(), this.instance_;
	}, e.instance_ = null, e;
}(), ve = (function(e, t) {
	for (var n = 0, r = Object.keys(t); n < r.length; n++) {
		var i = r[n];
		Object.defineProperty(e, i, {
			value: t[i],
			enumerable: !1,
			writable: !1,
			configurable: !0
		});
	}
	return e;
}), k = (function(e) {
	return e && e.ownerDocument && e.ownerDocument.defaultView || O;
}), ye = j(0, 0, 0, 0);
function A(e) {
	return parseFloat(e) || 0;
}
function be(e) {
	return [...arguments].slice(1).reduce(function(t, n) {
		var r = e["border-" + n + "-width"];
		return t + A(r);
	}, 0);
}
function xe(e) {
	for (var t = [
		"top",
		"right",
		"bottom",
		"left"
	], n = {}, r = 0, i = t; r < i.length; r++) {
		var a = i[r], o = e["padding-" + a];
		n[a] = A(o);
	}
	return n;
}
function Se(e) {
	var t = e.getBBox();
	return j(0, 0, t.width, t.height);
}
function Ce(e) {
	var t = e.clientWidth, n = e.clientHeight;
	if (!t && !n) return ye;
	var r = k(e).getComputedStyle(e), i = xe(r), a = i.left + i.right, o = i.top + i.bottom, s = A(r.width), c = A(r.height);
	if (r.boxSizing === "border-box" && (Math.round(s + a) !== t && (s -= be(r, "left", "right") + a), Math.round(c + o) !== n && (c -= be(r, "top", "bottom") + o)), !Te(e)) {
		var l = Math.round(s + a) - t, u = Math.round(c + o) - n;
		Math.abs(l) !== 1 && (s -= l), Math.abs(u) !== 1 && (c -= u);
	}
	return j(i.left, i.top, s, c);
}
var we = (function() {
	return typeof SVGGraphicsElement < "u" ? function(e) {
		return e instanceof k(e).SVGGraphicsElement;
	} : function(e) {
		return e instanceof k(e).SVGElement && typeof e.getBBox == "function";
	};
})();
function Te(e) {
	return e === k(e).document.documentElement;
}
function Ee(e) {
	return ue ? we(e) ? Se(e) : Ce(e) : ye;
}
function De(e) {
	var t = e.x, n = e.y, r = e.width, i = e.height, a = Object.create((typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object).prototype);
	return ve(a, {
		x: t,
		y: n,
		width: r,
		height: i,
		top: n,
		right: t + r,
		bottom: i + n,
		left: t
	}), a;
}
function j(e, t, n, r) {
	return {
		x: e,
		y: t,
		width: n,
		height: r
	};
}
var Oe = function() {
	function e(e) {
		this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = j(0, 0, 0, 0), this.target = e;
	}
	return e.prototype.isActive = function() {
		var e = Ee(this.target);
		return this.contentRect_ = e, e.width !== this.broadcastWidth || e.height !== this.broadcastHeight;
	}, e.prototype.broadcastRect = function() {
		var e = this.contentRect_;
		return this.broadcastWidth = e.width, this.broadcastHeight = e.height, e;
	}, e;
}(), ke = function() {
	function e(e, t) {
		var n = De(t);
		ve(this, {
			target: e,
			contentRect: n
		});
	}
	return e;
}(), Ae = function() {
	function e(e, t, n) {
		if (this.activeObservations_ = [], this.observations_ = new le(), typeof e != "function") throw TypeError("The callback provided as parameter 1 is not a function.");
		this.callback_ = e, this.controller_ = t, this.callbackCtx_ = n;
	}
	return e.prototype.observe = function(e) {
		if (!arguments.length) throw TypeError("1 argument required, but only 0 present.");
		if (!(typeof Element > "u" || !(Element instanceof Object))) {
			if (!(e instanceof k(e).Element)) throw TypeError("parameter 1 is not of type \"Element\".");
			var t = this.observations_;
			t.has(e) || (t.set(e, new Oe(e)), this.controller_.addObserver(this), this.controller_.refresh());
		}
	}, e.prototype.unobserve = function(e) {
		if (!arguments.length) throw TypeError("1 argument required, but only 0 present.");
		if (!(typeof Element > "u" || !(Element instanceof Object))) {
			if (!(e instanceof k(e).Element)) throw TypeError("parameter 1 is not of type \"Element\".");
			var t = this.observations_;
			t.has(e) && (t.delete(e), t.size || this.controller_.removeObserver(this));
		}
	}, e.prototype.disconnect = function() {
		this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this);
	}, e.prototype.gatherActive = function() {
		var e = this;
		this.clearActive(), this.observations_.forEach(function(t) {
			t.isActive() && e.activeObservations_.push(t);
		});
	}, e.prototype.broadcastActive = function() {
		if (this.hasActive()) {
			var e = this.callbackCtx_, t = this.activeObservations_.map(function(e) {
				return new ke(e.target, e.broadcastRect());
			});
			this.callback_.call(e, t, e), this.clearActive();
		}
	}, e.prototype.clearActive = function() {
		this.activeObservations_.splice(0);
	}, e.prototype.hasActive = function() {
		return this.activeObservations_.length > 0;
	}, e;
}(), je = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new le(), Me = function() {
	function e(t) {
		if (!(this instanceof e)) throw TypeError("Cannot call a class as a function.");
		if (!arguments.length) throw TypeError("1 argument required, but only 0 present.");
		var n = new Ae(t, _e.getInstance(), this);
		je.set(this, n);
	}
	return e;
}();
[
	"observe",
	"unobserve",
	"disconnect"
].forEach(function(e) {
	Me.prototype[e] = function() {
		var t;
		return (t = je.get(this))[e].apply(t, arguments);
	};
});
var M = (function() {
	return O.ResizeObserver === void 0 ? Me : O.ResizeObserver;
})(), Ne = class {
	constructor(e, t) {
		if (this.options = t, this.onScroll = this.onScroll.bind(this), this.onDocumentMousemove = this.onDocumentMousemove.bind(this), this.onDocumentMouseup = this.onDocumentMouseup.bind(this), this.onThumbMousedownX = this.onThumbMousedown.bind(this, "x"), this.onThumbMousedownY = this.onThumbMousedown.bind(this, "y"), this.onResize = this.onResize.bind(this), this.el = e, this.railsParent = t.railsParent || this.el, this.refreshStyling(), t.scrollX && this.createRail("x"), t.scrollY && this.createRail("y"), t.manualCompute || (this.computeDimensions(), this.computeThumbPositions(), this.update()), this.el.addEventListener("scroll", this.onScroll), !t.manualUpdate) {
			this.resizeObserver = new M(this.onResize), this.resizeObserver.observe(this.el);
			for (let e of this.el.children) this.resizeObserver.observe(e);
			this.mutationObserver = new MutationObserver((e) => {
				for (let t of e) {
					for (let e of t.addedNodes) e.nodeType === Node.ELEMENT_NODE && this.resizeObserver.observe(e);
					for (let e of t.removedNodes) e.nodeType === Node.ELEMENT_NODE && this.resizeObserver.unobserve(e);
				}
				this.onResize();
			}), this.mutationObserver.observe(this.el, { childList: !0 });
		}
	}
	createRail(e) {
		let t = document.createElement("div");
		t.classList.add(`bunt-scrollbar-rail-wrapper-${e}`);
		let n = document.createElement("div");
		n.classList.add(`bunt-scrollbar-rail-${e}`);
		let r = document.createElement("div");
		r.classList.add("bunt-scrollbar-thumb"), t.appendChild(n), n.appendChild(r), this.railsParent.appendChild(t), r.addEventListener("mousedown", this[`onThumbMousedown${e.toUpperCase()}`]), this[e] = {
			railEl: n,
			thumbEl: r
		};
	}
	destroy() {
		this.resizeObserver?.disconnect(), this.mutationObserver?.disconnect(), document.removeEventListener("mousemove", this.onDocumentMousemove), document.removeEventListener("mouseup", this.onDocumentMouseup, { capture: !0 }), this.el.removeEventListener("scroll", this.onScroll), this.x?.thumbEl.removeEventListener("mousedown", this.onThumbMousedownX), this.y?.thumbEl.removeEventListener("mousedown", this.onThumbMousedownY);
	}
	refreshStyling() {
		this.el.classList.add("bunt-scrollbar");
	}
	update() {
		this.updateThumb("x"), this.updateThumb("y");
	}
	onScroll(e) {
		this.options.onScroll && this.options.onScroll(e), this.computeThumbPositions(), this.update();
	}
	onThumbMousedown(e, t) {
		t.stopPropagation(), this.options._preventMousedown && t.preventDefault(), this.dragging = e, this.draggingOffset = t[`offset${e.toUpperCase()}`], this.el.style.userSelect = "none", document.body.style["-moz-user-select"] = "none", this[e].railEl.classList.add("active"), document.addEventListener("mousemove", this.onDocumentMousemove), document.addEventListener("mouseup", this.onDocumentMouseup, { capture: !0 });
	}
	onDocumentMousemove(e) {
		if (this.dragging === "x") {
			let t = this.el.clientWidth - this.x.thumbLength, n = e.clientX - this.el.getBoundingClientRect().left - this.draggingOffset;
			this.x.thumbPosition = Math.min(Math.max(0, n), t), this.el.scrollLeft = this.x.thumbPosition / t * (this.el.scrollWidth - this.el.clientWidth);
		}
		if (this.dragging === "y") {
			let t = this.el.clientHeight - this.y.thumbLength, n = e.clientY - this.el.getBoundingClientRect().top - this.draggingOffset;
			this.y.thumbPosition = Math.min(Math.max(0, n), t), this.el.scrollTop = this.y.thumbPosition / t * (this.el.scrollHeight - this.el.clientHeight);
		}
		this.updateThumb(this.dragging);
	}
	onDocumentMouseup(e) {
		this[this.dragging].railEl.classList.remove("active"), this.dragging = null, this.el.style.userSelect = "", document.body.style["-moz-user-select"] = "", document.removeEventListener("mousemove", this.onDocumentMousemove), document.removeEventListener("mouseup", this.onDocumentMouseup, { capture: !0 });
	}
	onResize(e) {
		this.computeDimensions(), this.computeThumbPositions(), this.update();
	}
	computeDimensions() {
		this.x && (this.x.railLength = this.el.clientWidth, this.x.visibleRatio = this.el.clientWidth / this.el.scrollWidth, this.x.thumbLength = this.el.clientWidth * this.x.visibleRatio), this.y && (this.y.railLength = this.el.clientHeight, this.y.visibleRatio = this.el.clientHeight / this.el.scrollHeight, this.y.thumbLength = this.el.clientHeight * this.y.visibleRatio);
	}
	computeThumbPositions() {
		this.x && (this.x.thumbPosition = this.el.scrollLeft / (this.el.scrollWidth - this.el.clientWidth) * (this.el.clientWidth - this.x.thumbLength)), this.y && (this.y.thumbPosition = this.el.scrollTop / (this.el.scrollHeight - this.el.clientHeight) * (this.el.clientHeight - this.y.thumbLength));
	}
	updateThumb(e) {
		let t = this[e];
		t && (t.visibleRatio >= 1 ? t.thumbEl.style.display = "none" : (t.thumbEl.style.display = null, e === "x" ? (t.railEl.style.width = t.railLength + "px", t.thumbEl.style.width = t.thumbLength + "px", t.thumbEl.style.left = t.thumbPosition + "px") : e === "y" && (t.railEl.style.height = t.railLength + "px", t.thumbEl.style.height = t.thumbLength + "px", t.thumbEl.style.top = t.thumbPosition + "px")));
	}
};
function Pe(e) {
	e.directive("scrollbar", {
		mounted(e, t, n) {
			e.__buntpapier__scrollbar = new Ne(e, {
				scrollX: t.modifiers.x,
				scrollY: t.modifiers.y,
				_preventMousedown: t.value?._preventMousedown
			}), e.__buntpapier__scrollbar.refreshStyling(), e.__buntpapier__scrollbar.update();
		},
		updated(e, t, n, r) {
			e.__buntpapier__scrollbar ? (e.__buntpapier__scrollbar.refreshStyling(), e.__buntpapier__scrollbar.update()) : e.__buntpapier__scrollbar = new Ne(e, {
				scrollX: t.modifiers.x,
				scrollY: t.modifiers.y
			});
		},
		beforeUnmount(e, t, n, r) {
			e.__buntpapier__scrollbar && e.__buntpapier__scrollbar.destroy();
		}
	});
}
//#endregion
//#region node_modules/popper.js/dist/esm/popper.js
var N = typeof window < "u" && typeof document < "u" && typeof navigator < "u", Fe = function() {
	for (var e = [
		"Edge",
		"Trident",
		"Firefox"
	], t = 0; t < e.length; t += 1) if (N && navigator.userAgent.indexOf(e[t]) >= 0) return 1;
	return 0;
}();
function Ie(e) {
	var t = !1;
	return function() {
		t || (t = !0, window.Promise.resolve().then(function() {
			t = !1, e();
		}));
	};
}
function Le(e) {
	var t = !1;
	return function() {
		t || (t = !0, setTimeout(function() {
			t = !1, e();
		}, Fe));
	};
}
var Re = N && window.Promise ? Ie : Le;
function ze(e) {
	return e && {}.toString.call(e) === "[object Function]";
}
function P(e, t) {
	if (e.nodeType !== 1) return [];
	var n = e.ownerDocument.defaultView.getComputedStyle(e, null);
	return t ? n[t] : n;
}
function Be(e) {
	return e.nodeName === "HTML" ? e : e.parentNode || e.host;
}
function F(e) {
	if (!e) return document.body;
	switch (e.nodeName) {
		case "HTML":
		case "BODY": return e.ownerDocument.body;
		case "#document": return e.body;
	}
	var t = P(e), n = t.overflow, r = t.overflowX, i = t.overflowY;
	return /(auto|scroll|overlay)/.test(n + i + r) ? e : F(Be(e));
}
function Ve(e) {
	return e && e.referenceNode ? e.referenceNode : e;
}
var He = N && !!(window.MSInputMethodContext && document.documentMode), Ue = N && /MSIE 10/.test(navigator.userAgent);
function I(e) {
	return e === 11 ? He : e === 10 ? Ue : He || Ue;
}
function L(e) {
	if (!e) return document.documentElement;
	for (var t = I(10) ? document.body : null, n = e.offsetParent || null; n === t && e.nextElementSibling;) n = (e = e.nextElementSibling).offsetParent;
	var r = n && n.nodeName;
	return !r || r === "BODY" || r === "HTML" ? e ? e.ownerDocument.documentElement : document.documentElement : [
		"TH",
		"TD",
		"TABLE"
	].indexOf(n.nodeName) !== -1 && P(n, "position") === "static" ? L(n) : n;
}
function We(e) {
	var t = e.nodeName;
	return t === "BODY" ? !1 : t === "HTML" || L(e.firstElementChild) === e;
}
function R(e) {
	return e.parentNode === null ? e : R(e.parentNode);
}
function z(e, t) {
	if (!e || !e.nodeType || !t || !t.nodeType) return document.documentElement;
	var n = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING, r = n ? e : t, i = n ? t : e, a = document.createRange();
	a.setStart(r, 0), a.setEnd(i, 0);
	var o = a.commonAncestorContainer;
	if (e !== o && t !== o || r.contains(i)) return We(o) ? o : L(o);
	var s = R(e);
	return s.host ? z(s.host, t) : z(e, R(t).host);
}
function B(e) {
	var t = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "top") === "top" ? "scrollTop" : "scrollLeft", n = e.nodeName;
	if (n === "BODY" || n === "HTML") {
		var r = e.ownerDocument.documentElement;
		return (e.ownerDocument.scrollingElement || r)[t];
	}
	return e[t];
}
function Ge(e, t) {
	var n = arguments.length > 2 && arguments[2] !== void 0 && arguments[2], r = B(t, "top"), i = B(t, "left"), a = n ? -1 : 1;
	return e.top += r * a, e.bottom += r * a, e.left += i * a, e.right += i * a, e;
}
function Ke(e, t) {
	var n = t === "x" ? "Left" : "Top", r = n === "Left" ? "Right" : "Bottom";
	return parseFloat(e["border" + n + "Width"]) + parseFloat(e["border" + r + "Width"]);
}
function qe(e, t, n, r) {
	return Math.max(t["offset" + e], t["scroll" + e], n["client" + e], n["offset" + e], n["scroll" + e], I(10) ? parseInt(n["offset" + e]) + parseInt(r["margin" + (e === "Height" ? "Top" : "Left")]) + parseInt(r["margin" + (e === "Height" ? "Bottom" : "Right")]) : 0);
}
function Je(e) {
	var t = e.body, n = e.documentElement, r = I(10) && getComputedStyle(n);
	return {
		height: qe("Height", t, n, r),
		width: qe("Width", t, n, r)
	};
}
var Ye = function(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}, Xe = function() {
	function e(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
		}
	}
	return function(t, n, r) {
		return n && e(t.prototype, n), r && e(t, r), t;
	};
}(), V = function(e, t, n) {
	return t in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}, H = Object.assign || function(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t];
		for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
	}
	return e;
};
function U(e) {
	return H({}, e, {
		right: e.left + e.width,
		bottom: e.top + e.height
	});
}
function Ze(e) {
	var t = {};
	try {
		if (I(10)) {
			t = e.getBoundingClientRect();
			var n = B(e, "top"), r = B(e, "left");
			t.top += n, t.left += r, t.bottom += n, t.right += r;
		} else t = e.getBoundingClientRect();
	} catch {}
	var i = {
		left: t.left,
		top: t.top,
		width: t.right - t.left,
		height: t.bottom - t.top
	}, a = e.nodeName === "HTML" ? Je(e.ownerDocument) : {}, o = a.width || e.clientWidth || i.width, s = a.height || e.clientHeight || i.height, c = e.offsetWidth - o, l = e.offsetHeight - s;
	if (c || l) {
		var u = P(e);
		c -= Ke(u, "x"), l -= Ke(u, "y"), i.width -= c, i.height -= l;
	}
	return U(i);
}
function W(e, t) {
	var n = arguments.length > 2 && arguments[2] !== void 0 && arguments[2], r = I(10), i = t.nodeName === "HTML", a = Ze(e), o = Ze(t), s = F(e), c = P(t), l = parseFloat(c.borderTopWidth), u = parseFloat(c.borderLeftWidth);
	n && i && (o.top = Math.max(o.top, 0), o.left = Math.max(o.left, 0));
	var d = U({
		top: a.top - o.top - l,
		left: a.left - o.left - u,
		width: a.width,
		height: a.height
	});
	if (d.marginTop = 0, d.marginLeft = 0, !r && i) {
		var f = parseFloat(c.marginTop), p = parseFloat(c.marginLeft);
		d.top -= l - f, d.bottom -= l - f, d.left -= u - p, d.right -= u - p, d.marginTop = f, d.marginLeft = p;
	}
	return (r && !n ? t.contains(s) : t === s && s.nodeName !== "BODY") && (d = Ge(d, t)), d;
}
function Qe(e) {
	var t = arguments.length > 1 && arguments[1] !== void 0 && arguments[1], n = e.ownerDocument.documentElement, r = W(e, n), i = Math.max(n.clientWidth, window.innerWidth || 0), a = Math.max(n.clientHeight, window.innerHeight || 0), o = t ? 0 : B(n), s = t ? 0 : B(n, "left");
	return U({
		top: o - r.top + r.marginTop,
		left: s - r.left + r.marginLeft,
		width: i,
		height: a
	});
}
function $e(e) {
	var t = e.nodeName;
	if (t === "BODY" || t === "HTML") return !1;
	if (P(e, "position") === "fixed") return !0;
	var n = Be(e);
	return n ? $e(n) : !1;
}
function et(e) {
	if (!e || !e.parentElement || I()) return document.documentElement;
	for (var t = e.parentElement; t && P(t, "transform") === "none";) t = t.parentElement;
	return t || document.documentElement;
}
function G(e, t, n, r) {
	var i = arguments.length > 4 && arguments[4] !== void 0 && arguments[4], a = {
		top: 0,
		left: 0
	}, o = i ? et(e) : z(e, Ve(t));
	if (r === "viewport") a = Qe(o, i);
	else {
		var s = void 0;
		r === "scrollParent" ? (s = F(Be(t)), s.nodeName === "BODY" && (s = e.ownerDocument.documentElement)) : s = r === "window" ? e.ownerDocument.documentElement : r;
		var c = W(s, o, i);
		if (s.nodeName === "HTML" && !$e(o)) {
			var l = Je(e.ownerDocument), u = l.height, d = l.width;
			a.top += c.top - c.marginTop, a.bottom = u + c.top, a.left += c.left - c.marginLeft, a.right = d + c.left;
		} else a = c;
	}
	n ||= 0;
	var f = typeof n == "number";
	return a.left += f ? n : n.left || 0, a.top += f ? n : n.top || 0, a.right -= f ? n : n.right || 0, a.bottom -= f ? n : n.bottom || 0, a;
}
function tt(e) {
	return e.width * e.height;
}
function nt(e, t, n, r, i) {
	var a = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 0;
	if (e.indexOf("auto") === -1) return e;
	var o = G(n, r, a, i), s = {
		top: {
			width: o.width,
			height: t.top - o.top
		},
		right: {
			width: o.right - t.right,
			height: o.height
		},
		bottom: {
			width: o.width,
			height: o.bottom - t.bottom
		},
		left: {
			width: t.left - o.left,
			height: o.height
		}
	}, c = Object.keys(s).map(function(e) {
		return H({ key: e }, s[e], { area: tt(s[e]) });
	}).sort(function(e, t) {
		return t.area - e.area;
	}), l = c.filter(function(e) {
		var t = e.width, r = e.height;
		return t >= n.clientWidth && r >= n.clientHeight;
	}), u = l.length > 0 ? l[0].key : c[0].key, d = e.split("-")[1];
	return u + (d ? "-" + d : "");
}
function rt(e, t, n) {
	var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
	return W(n, r ? et(t) : z(t, Ve(n)), r);
}
function it(e) {
	var t = e.ownerDocument.defaultView.getComputedStyle(e), n = parseFloat(t.marginTop || 0) + parseFloat(t.marginBottom || 0), r = parseFloat(t.marginLeft || 0) + parseFloat(t.marginRight || 0);
	return {
		width: e.offsetWidth + r,
		height: e.offsetHeight + n
	};
}
function K(e) {
	var t = {
		left: "right",
		right: "left",
		bottom: "top",
		top: "bottom"
	};
	return e.replace(/left|right|bottom|top/g, function(e) {
		return t[e];
	});
}
function at(e, t, n) {
	n = n.split("-")[0];
	var r = it(e), i = {
		width: r.width,
		height: r.height
	}, a = ["right", "left"].indexOf(n) !== -1, o = a ? "top" : "left", s = a ? "left" : "top", c = a ? "height" : "width", l = a ? "width" : "height";
	return i[o] = t[o] + t[c] / 2 - r[c] / 2, i[s] = n === s ? t[s] - r[l] : t[K(s)], i;
}
function q(e, t) {
	return Array.prototype.find ? e.find(t) : e.filter(t)[0];
}
function ot(e, t, n) {
	if (Array.prototype.findIndex) return e.findIndex(function(e) {
		return e[t] === n;
	});
	var r = q(e, function(e) {
		return e[t] === n;
	});
	return e.indexOf(r);
}
function st(e, t, n) {
	return (n === void 0 ? e : e.slice(0, ot(e, "name", n))).forEach(function(e) {
		e.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
		var n = e.function || e.fn;
		e.enabled && ze(n) && (t.offsets.popper = U(t.offsets.popper), t.offsets.reference = U(t.offsets.reference), t = n(t, e));
	}), t;
}
function ct() {
	if (!this.state.isDestroyed) {
		var e = {
			instance: this,
			styles: {},
			arrowStyles: {},
			attributes: {},
			flipped: !1,
			offsets: {}
		};
		e.offsets.reference = rt(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = nt(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = at(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", e = st(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e));
	}
}
function lt(e, t) {
	return e.some(function(e) {
		var n = e.name;
		return e.enabled && n === t;
	});
}
function J(e) {
	for (var t = [
		!1,
		"ms",
		"Webkit",
		"Moz",
		"O"
	], n = e.charAt(0).toUpperCase() + e.slice(1), r = 0; r < t.length; r++) {
		var i = t[r], a = i ? "" + i + n : e;
		if (document.body.style[a] !== void 0) return a;
	}
	return null;
}
function ut() {
	return this.state.isDestroyed = !0, lt(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[J("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this;
}
function dt(e) {
	var t = e.ownerDocument;
	return t ? t.defaultView : window;
}
function ft(e, t, n, r) {
	var i = e.nodeName === "BODY", a = i ? e.ownerDocument.defaultView : e;
	a.addEventListener(t, n, { passive: !0 }), i || ft(F(a.parentNode), t, n, r), r.push(a);
}
function pt(e, t, n, r) {
	n.updateBound = r, dt(e).addEventListener("resize", n.updateBound, { passive: !0 });
	var i = F(e);
	return ft(i, "scroll", n.updateBound, n.scrollParents), n.scrollElement = i, n.eventsEnabled = !0, n;
}
function mt() {
	this.state.eventsEnabled || (this.state = pt(this.reference, this.options, this.state, this.scheduleUpdate));
}
function ht(e, t) {
	return dt(e).removeEventListener("resize", t.updateBound), t.scrollParents.forEach(function(e) {
		e.removeEventListener("scroll", t.updateBound);
	}), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t;
}
function gt() {
	this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = ht(this.reference, this.state));
}
function Y(e) {
	return e !== "" && !isNaN(parseFloat(e)) && isFinite(e);
}
function _t(e, t) {
	Object.keys(t).forEach(function(n) {
		var r = "";
		[
			"width",
			"height",
			"top",
			"right",
			"bottom",
			"left"
		].indexOf(n) !== -1 && Y(t[n]) && (r = "px"), e.style[n] = t[n] + r;
	});
}
function vt(e, t) {
	Object.keys(t).forEach(function(n) {
		t[n] === !1 ? e.removeAttribute(n) : e.setAttribute(n, t[n]);
	});
}
function yt(e) {
	return _t(e.instance.popper, e.styles), vt(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && _t(e.arrowElement, e.arrowStyles), e;
}
function bt(e, t, n, r, i) {
	var a = rt(i, t, e, n.positionFixed), o = nt(n.placement, a, t, e, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
	return t.setAttribute("x-placement", o), _t(t, { position: n.positionFixed ? "fixed" : "absolute" }), n;
}
function xt(e, t) {
	var n = e.offsets, r = n.popper, i = n.reference, a = Math.round, o = Math.floor, s = function(e) {
		return e;
	}, c = a(i.width), l = a(r.width), u = ["left", "right"].indexOf(e.placement) !== -1, d = e.placement.indexOf("-") !== -1, f = c % 2 == l % 2, p = c % 2 == 1 && l % 2 == 1, m = t ? u || d || f ? a : o : s, h = t ? a : s;
	return {
		left: m(p && !d && t ? r.left - 1 : r.left),
		top: h(r.top),
		bottom: h(r.bottom),
		right: m(r.right)
	};
}
var St = N && /Firefox/i.test(navigator.userAgent);
function Ct(e, t) {
	var n = t.x, r = t.y, i = e.offsets.popper, a = q(e.instance.modifiers, function(e) {
		return e.name === "applyStyle";
	}).gpuAcceleration;
	a !== void 0 && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
	var o = a === void 0 ? t.gpuAcceleration : a, s = L(e.instance.popper), c = Ze(s), l = { position: i.position }, u = xt(e, window.devicePixelRatio < 2 || !St), d = n === "bottom" ? "top" : "bottom", f = r === "right" ? "left" : "right", p = J("transform"), m = void 0, h = void 0;
	if (h = d === "bottom" ? s.nodeName === "HTML" ? -s.clientHeight + u.bottom : -c.height + u.bottom : u.top, m = f === "right" ? s.nodeName === "HTML" ? -s.clientWidth + u.right : -c.width + u.right : u.left, o && p) l[p] = "translate3d(" + m + "px, " + h + "px, 0)", l[d] = 0, l[f] = 0, l.willChange = "transform";
	else {
		var g = d === "bottom" ? -1 : 1, _ = f === "right" ? -1 : 1;
		l[d] = h * g, l[f] = m * _, l.willChange = d + ", " + f;
	}
	return e.attributes = H({}, { "x-placement": e.placement }, e.attributes), e.styles = H({}, l, e.styles), e.arrowStyles = H({}, e.offsets.arrow, e.arrowStyles), e;
}
function wt(e, t, n) {
	var r = q(e, function(e) {
		return e.name === t;
	}), i = !!r && e.some(function(e) {
		return e.name === n && e.enabled && e.order < r.order;
	});
	if (!i) {
		var a = "`" + t + "`", o = "`" + n + "`";
		console.warn(o + " modifier is required by " + a + " modifier in order to work, be sure to include it before " + a + "!");
	}
	return i;
}
function Tt(e, t) {
	var n;
	if (!wt(e.instance.modifiers, "arrow", "keepTogether")) return e;
	var r = t.element;
	if (typeof r == "string") {
		if (r = e.instance.popper.querySelector(r), !r) return e;
	} else if (!e.instance.popper.contains(r)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;
	var i = e.placement.split("-")[0], a = e.offsets, o = a.popper, s = a.reference, c = ["left", "right"].indexOf(i) !== -1, l = c ? "height" : "width", u = c ? "Top" : "Left", d = u.toLowerCase(), f = c ? "left" : "top", p = c ? "bottom" : "right", m = it(r)[l];
	s[p] - m < o[d] && (e.offsets.popper[d] -= o[d] - (s[p] - m)), s[d] + m > o[p] && (e.offsets.popper[d] += s[d] + m - o[p]), e.offsets.popper = U(e.offsets.popper);
	var h = s[d] + s[l] / 2 - m / 2, g = P(e.instance.popper), _ = parseFloat(g["margin" + u]), v = parseFloat(g["border" + u + "Width"]), y = h - e.offsets.popper[d] - _ - v;
	return y = Math.max(Math.min(o[l] - m, y), 0), e.arrowElement = r, e.offsets.arrow = (n = {}, V(n, d, Math.round(y)), V(n, f, ""), n), e;
}
function Et(e) {
	return e === "end" ? "start" : e === "start" ? "end" : e;
}
var Dt = [
	"auto-start",
	"auto",
	"auto-end",
	"top-start",
	"top",
	"top-end",
	"right-start",
	"right",
	"right-end",
	"bottom-end",
	"bottom",
	"bottom-start",
	"left-end",
	"left",
	"left-start"
], Ot = Dt.slice(3);
function kt(e) {
	var t = arguments.length > 1 && arguments[1] !== void 0 && arguments[1], n = Ot.indexOf(e), r = Ot.slice(n + 1).concat(Ot.slice(0, n));
	return t ? r.reverse() : r;
}
var At = {
	FLIP: "flip",
	CLOCKWISE: "clockwise",
	COUNTERCLOCKWISE: "counterclockwise"
};
function jt(e, t) {
	if (lt(e.instance.modifiers, "inner") || e.flipped && e.placement === e.originalPlacement) return e;
	var n = G(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed), r = e.placement.split("-")[0], i = K(r), a = e.placement.split("-")[1] || "", o = [];
	switch (t.behavior) {
		case At.FLIP:
			o = [r, i];
			break;
		case At.CLOCKWISE:
			o = kt(r);
			break;
		case At.COUNTERCLOCKWISE:
			o = kt(r, !0);
			break;
		default: o = t.behavior;
	}
	return o.forEach(function(s, c) {
		if (r !== s || o.length === c + 1) return e;
		r = e.placement.split("-")[0], i = K(r);
		var l = e.offsets.popper, u = e.offsets.reference, d = Math.floor, f = r === "left" && d(l.right) > d(u.left) || r === "right" && d(l.left) < d(u.right) || r === "top" && d(l.bottom) > d(u.top) || r === "bottom" && d(l.top) < d(u.bottom), p = d(l.left) < d(n.left), m = d(l.right) > d(n.right), h = d(l.top) < d(n.top), g = d(l.bottom) > d(n.bottom), _ = r === "left" && p || r === "right" && m || r === "top" && h || r === "bottom" && g, v = ["top", "bottom"].indexOf(r) !== -1, y = !!t.flipVariations && (v && a === "start" && p || v && a === "end" && m || !v && a === "start" && h || !v && a === "end" && g), ee = !!t.flipVariationsByContent && (v && a === "start" && m || v && a === "end" && p || !v && a === "start" && g || !v && a === "end" && h), b = y || ee;
		(f || _ || b) && (e.flipped = !0, (f || _) && (r = o[c + 1]), b && (a = Et(a)), e.placement = r + (a ? "-" + a : ""), e.offsets.popper = H({}, e.offsets.popper, at(e.instance.popper, e.offsets.reference, e.placement)), e = st(e.instance.modifiers, e, "flip"));
	}), e;
}
function Mt(e) {
	var t = e.offsets, n = t.popper, r = t.reference, i = e.placement.split("-")[0], a = Math.floor, o = ["top", "bottom"].indexOf(i) !== -1, s = o ? "right" : "bottom", c = o ? "left" : "top", l = o ? "width" : "height";
	return n[s] < a(r[c]) && (e.offsets.popper[c] = a(r[c]) - n[l]), n[c] > a(r[s]) && (e.offsets.popper[c] = a(r[s])), e;
}
function Nt(e, t, n, r) {
	var i = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/), a = +i[1], o = i[2];
	if (!a) return e;
	if (o.indexOf("%") === 0) {
		var s = void 0;
		switch (o) {
			case "%p":
				s = n;
				break;
			default: s = r;
		}
		return U(s)[t] / 100 * a;
	}
	if (o === "vh" || o === "vw") {
		var c = void 0;
		return c = o === "vh" ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0), c / 100 * a;
	}
	return a;
}
function Pt(e, t, n, r) {
	var i = [0, 0], a = ["right", "left"].indexOf(r) !== -1, o = e.split(/(\+|\-)/).map(function(e) {
		return e.trim();
	}), s = o.indexOf(q(o, function(e) {
		return e.search(/,|\s/) !== -1;
	}));
	o[s] && o[s].indexOf(",") === -1 && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
	var c = /\s*,\s*|\s+/, l = s === -1 ? [o] : [o.slice(0, s).concat([o[s].split(c)[0]]), [o[s].split(c)[1]].concat(o.slice(s + 1))];
	return l = l.map(function(e, r) {
		var i = (r === 1 ? !a : a) ? "height" : "width", o = !1;
		return e.reduce(function(e, t) {
			return e[e.length - 1] === "" && ["+", "-"].indexOf(t) !== -1 ? (e[e.length - 1] = t, o = !0, e) : o ? (e[e.length - 1] += t, o = !1, e) : e.concat(t);
		}, []).map(function(e) {
			return Nt(e, i, t, n);
		});
	}), l.forEach(function(e, t) {
		e.forEach(function(n, r) {
			Y(n) && (i[t] += n * (e[r - 1] === "-" ? -1 : 1));
		});
	}), i;
}
function Ft(e, t) {
	var n = t.offset, r = e.placement, i = e.offsets, a = i.popper, o = i.reference, s = r.split("-")[0], c = void 0;
	return c = Y(+n) ? [+n, 0] : Pt(n, a, o, s), s === "left" ? (a.top += c[0], a.left -= c[1]) : s === "right" ? (a.top += c[0], a.left += c[1]) : s === "top" ? (a.left += c[0], a.top -= c[1]) : s === "bottom" && (a.left += c[0], a.top += c[1]), e.popper = a, e;
}
function It(e, t) {
	var n = t.boundariesElement || L(e.instance.popper);
	e.instance.reference === n && (n = L(n));
	var r = J("transform"), i = e.instance.popper.style, a = i.top, o = i.left, s = i[r];
	i.top = "", i.left = "", i[r] = "";
	var c = G(e.instance.popper, e.instance.reference, t.padding, n, e.positionFixed);
	i.top = a, i.left = o, i[r] = s, t.boundaries = c;
	var l = t.priority, u = e.offsets.popper, d = {
		primary: function(e) {
			var n = u[e];
			return u[e] < c[e] && !t.escapeWithReference && (n = Math.max(u[e], c[e])), V({}, e, n);
		},
		secondary: function(e) {
			var n = e === "right" ? "left" : "top", r = u[n];
			return u[e] > c[e] && !t.escapeWithReference && (r = Math.min(u[n], c[e] - (e === "right" ? u.width : u.height))), V({}, n, r);
		}
	};
	return l.forEach(function(e) {
		var t = ["left", "top"].indexOf(e) === -1 ? "secondary" : "primary";
		u = H({}, u, d[t](e));
	}), e.offsets.popper = u, e;
}
function Lt(e) {
	var t = e.placement, n = t.split("-")[0], r = t.split("-")[1];
	if (r) {
		var i = e.offsets, a = i.reference, o = i.popper, s = ["bottom", "top"].indexOf(n) !== -1, c = s ? "left" : "top", l = s ? "width" : "height", u = {
			start: V({}, c, a[c]),
			end: V({}, c, a[c] + a[l] - o[l])
		};
		e.offsets.popper = H({}, o, u[r]);
	}
	return e;
}
function Rt(e) {
	if (!wt(e.instance.modifiers, "hide", "preventOverflow")) return e;
	var t = e.offsets.reference, n = q(e.instance.modifiers, function(e) {
		return e.name === "preventOverflow";
	}).boundaries;
	if (t.bottom < n.top || t.left > n.right || t.top > n.bottom || t.right < n.left) {
		if (e.hide === !0) return e;
		e.hide = !0, e.attributes["x-out-of-boundaries"] = "";
	} else {
		if (e.hide === !1) return e;
		e.hide = !1, e.attributes["x-out-of-boundaries"] = !1;
	}
	return e;
}
function zt(e) {
	var t = e.placement, n = t.split("-")[0], r = e.offsets, i = r.popper, a = r.reference, o = ["left", "right"].indexOf(n) !== -1, s = ["top", "left"].indexOf(n) === -1;
	return i[o ? "left" : "top"] = a[n] - (s ? i[o ? "width" : "height"] : 0), e.placement = K(t), e.offsets.popper = U(i), e;
}
var Bt = {
	placement: "bottom",
	positionFixed: !1,
	eventsEnabled: !0,
	removeOnDestroy: !1,
	onCreate: function() {},
	onUpdate: function() {},
	modifiers: {
		shift: {
			order: 100,
			enabled: !0,
			fn: Lt
		},
		offset: {
			order: 200,
			enabled: !0,
			fn: Ft,
			offset: 0
		},
		preventOverflow: {
			order: 300,
			enabled: !0,
			fn: It,
			priority: [
				"left",
				"right",
				"top",
				"bottom"
			],
			padding: 5,
			boundariesElement: "scrollParent"
		},
		keepTogether: {
			order: 400,
			enabled: !0,
			fn: Mt
		},
		arrow: {
			order: 500,
			enabled: !0,
			fn: Tt,
			element: "[x-arrow]"
		},
		flip: {
			order: 600,
			enabled: !0,
			fn: jt,
			behavior: "flip",
			padding: 5,
			boundariesElement: "viewport",
			flipVariations: !1,
			flipVariationsByContent: !1
		},
		inner: {
			order: 700,
			enabled: !1,
			fn: zt
		},
		hide: {
			order: 800,
			enabled: !0,
			fn: Rt
		},
		computeStyle: {
			order: 850,
			enabled: !0,
			fn: Ct,
			gpuAcceleration: !0,
			x: "bottom",
			y: "right"
		},
		applyStyle: {
			order: 900,
			enabled: !0,
			fn: yt,
			onLoad: bt,
			gpuAcceleration: void 0
		}
	}
}, X = function() {
	function e(t, n) {
		var r = this, i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
		Ye(this, e), this.scheduleUpdate = function() {
			return requestAnimationFrame(r.update);
		}, this.update = Re(this.update.bind(this)), this.options = H({}, e.Defaults, i), this.state = {
			isDestroyed: !1,
			isCreated: !1,
			scrollParents: []
		}, this.reference = t && t.jquery ? t[0] : t, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(H({}, e.Defaults.modifiers, i.modifiers)).forEach(function(t) {
			r.options.modifiers[t] = H({}, e.Defaults.modifiers[t] || {}, i.modifiers ? i.modifiers[t] : {});
		}), this.modifiers = Object.keys(this.options.modifiers).map(function(e) {
			return H({ name: e }, r.options.modifiers[e]);
		}).sort(function(e, t) {
			return e.order - t.order;
		}), this.modifiers.forEach(function(e) {
			e.enabled && ze(e.onLoad) && e.onLoad(r.reference, r.popper, r.options, e, r.state);
		}), this.update();
		var a = this.options.eventsEnabled;
		a && this.enableEventListeners(), this.state.eventsEnabled = a;
	}
	return Xe(e, [
		{
			key: "update",
			value: function() {
				return ct.call(this);
			}
		},
		{
			key: "destroy",
			value: function() {
				return ut.call(this);
			}
		},
		{
			key: "enableEventListeners",
			value: function() {
				return mt.call(this);
			}
		},
		{
			key: "disableEventListeners",
			value: function() {
				return gt.call(this);
			}
		}
	]), e;
}();
X.Utils = (typeof window < "u" ? window : global).PopperUtils, X.placements = Dt, X.Defaults = Bt;
//#endregion
//#region node_modules/buntpapier/src/directives/tooltip.js
var Z = 32;
function Vt(e) {
	class t {
		constructor(e, t) {
			this.el = e, this.options = t, this.show = this.show.bind(this), this.hide = this.hide.bind(this), this.options.placement = t.placement || "auto", this.el.addEventListener("mouseenter", this.show), this.el.addEventListener("mouseleave", this.hide);
		}
		createTooltip() {
			this.tooltipEl || (this.tooltipEl = document.createElement("div"), this.tooltipEl.classList.add("bunt-tooltip"), this.tooltipEl.style.position = this.options.fixed ? "fixed" : "absolute", this.tooltipEl.textContent = this.text, this.el.appendChild(this.tooltipEl), this.popper = new X(this.el, this.tooltipEl, {
				removeOnDestroy: !0,
				placement: this.options.placement,
				positionFixed: this.options.fixed,
				modifiers: {
					offset: { offset: "0, 8" },
					applyStyle: { enabled: !1 },
					preventOverflow: { boundariesElement: this.options.boundariesElement || "scrollParent" },
					applyTooltipStyle: {
						enabled: !0,
						fn: (e) => {
							this.positions = e.popper, this.tooltipEl.style.transform = `translate3d(${Math.round(this.positions.left)}px, ${Math.round(this.positions.top)}px, 0)`;
						},
						order: 900
					}
				}
			}));
		}
		update(e, t) {
			this.text = e;
			let n = this.forceDisplay;
			this.forceDisplay = t, g(() => {
				t ? n || this.show() : n && this.hide(), this.tooltipEl && (this.tooltipEl.textContent = this.text), this.popper && this.popper.update();
			});
		}
		destroyTooltip() {
			this.popper && (this.popper.destroy(), this.popper = null, this.tooltipEl = null);
		}
		destroy() {
			this.destroyTooltip(), this.el.removeEventListener("mouseenter", this.show), this.el.removeEventListener("mouseleave", this.hide);
		}
		show() {
			this.displaying || !this.text || (this.createTooltip(), this.displaying = !0, g(() => {
				if (this.animation) this.animation.reverse();
				else {
					let e;
					e = this.options.placement.startsWith("top") ? {
						top: Math.round(this.positions.top) + Z,
						left: Math.round(this.positions.left)
					} : this.options.placement.startsWith("left") ? {
						top: Math.round(this.positions.top),
						left: Math.round(this.positions.left) + Z
					} : this.options.placement.startsWith("right") ? {
						top: Math.round(this.positions.top),
						left: Math.round(this.positions.left) - Z
					} : {
						top: Math.round(this.positions.top) - Z,
						left: Math.round(this.positions.left)
					}, this.animation = this.tooltipEl.animate([{
						transform: `translate3d(${e.left}px, ${e.top}px, 0)`,
						opacity: 0
					}, {
						transform: `translate3d(${Math.round(this.positions.left)}px, ${Math.round(this.positions.top)}px, 0)`,
						opacity: 1
					}], {
						duration: 200,
						easing: "ease-in-out"
					}), this.animation.onfinish = () => {
						this.animation && this.animation.playbackRate < 0 && (this.destroyTooltip(), this.animation = null);
					};
				}
			}));
		}
		hide() {
			!this.displaying || this.forceDisplay || (this.displaying = !1, this.animation && this.animation.reverse(), this.text || this.destroyTooltip());
		}
	}
	e.directive("tooltip", {
		mounted(e, n, r) {
			let i;
			i = typeof n.value == "string" ? n.value : n.value.text, e.__buntpapier__tooltip = new t(e, {
				placement: n.value.placement || Object.keys(n.modifiers).find((e) => [
					"auto",
					"top",
					"right",
					"bottom",
					"left"
				].find((t) => e.startsWith(t))),
				fixed: n.value.fixed || n.modifiers.fixed,
				boundariesElement: n.value.boundariesElement
			}), e.__buntpapier__tooltip.update(i, n.value.show);
		},
		updated(e, t, n, r) {
			if (!e.__buntpapier__tooltip || t.value === t.oldValue) return;
			let i;
			i = typeof t.value == "string" ? t.value : t.value.text, e.__buntpapier__tooltip.update(i, t.value.show);
		},
		unmounted(e, t, n, r) {
			e.__buntpapier__tooltip && e.__buntpapier__tooltip.destroy();
		}
	});
}
//#endregion
//#region node_modules/buntpapier/src/directives/index.js
function Ht(e) {
	e.directive("resizeObserver", {
		beforeMount(e, t) {
			let n = new M((t) => {
				if (e.__buntpapier__resize_observer) for (let n of e.__buntpapier__resize_observer.handlers) n(t);
			});
			e.__buntpapier__resize_observer ? e.__buntpapier__resize_observer.handlers.push(t.value) : e.__buntpapier__resize_observer = {
				observer: n,
				handlers: [t.value]
			}, n.observe(e);
		},
		beforeUnmount(e, t, n, r) {
			e.__buntpapier__resize_observer &&= (e.__buntpapier__resize_observer.observer.disconnect(), null);
		}
	}), Pe(e), Vt(e);
}
//#endregion
//#region node_modules/buntpapier/src/ripple-ink.vue?vue&type=template&lang.js
function Ut(e, t, n, r, i, a) {
	return S(), s("div", {
		class: "bunt-ripple-ink",
		onMousedown: t[0] ||= (e) => a.mousedown(e),
		onTouchstartPassive: t[1] ||= (e) => a.touchstart(e)
	}, [se(c, { name: "ripple-ink" }, {
		default: te(() => [i.show ? (S(), s("div", {
			key: 0,
			class: "ripple",
			style: _(i.style)
		}, null, 4)) : m("", !0)]),
		_: 1
	})], 32);
}
//#endregion
//#region node_modules/buntpapier/src/mixins/ripple-ink.js
var Q = { components: { RippleInk: /* @__PURE__ */ o({
	name: "bunt-ripple-ink",
	data() {
		return {
			show: !1,
			style: null
		};
	},
	methods: {
		mousedown(e) {
			e.button === 0 && this.ripple(e.type, e);
		},
		touchstart(e) {
			if (e.changedTouches) for (let t = 0; t < e.changedTouches.length; ++t) this.ripple(e.type, e.changedTouches[t]);
		},
		ripple(e, t) {
			let n = this.$el, r = n.getAttribute("data-ui-event");
			if (r && r !== e) return;
			n.setAttribute("data-ui-event", e);
			let i = n.getBoundingClientRect(), a = t.offsetX, o;
			a === void 0 ? (a = t.clientX - i.left, o = t.clientY - i.top) : o = t.offsetY;
			let s = i.width === i.height ? i.width * 1.412 : Math.sqrt(i.width * i.width + i.height * i.height), c = s * 2 + "px";
			this.style = {
				width: c,
				height: c,
				marginLeft: -s + a + "px",
				marginTop: -s + o + "px"
			}, this.show = !0;
			let l = [
				"mouseleave",
				"mouseup",
				"touchend"
			], u = () => {
				l.forEach((e) => {
					n.removeEventListener(e, u);
				}), setTimeout(() => {
					this.show = !1, this.style = null, n.removeAttribute("data-ui-event");
				}, 200);
			};
			l.forEach((e) => {
				n.addEventListener(e, u);
			});
		}
	}
}, [["render", Ut]]) } };
//#endregion
//#region node_modules/buntpapier/src/progress-circular.vue?vue&type=template&lang.js
function Wt(e, t, n, r, i, a) {
	return S(), s("div", { class: D(["bunt-progress-circular active", [n.size, {
		"progress-center": n.center,
		"progress-page": n.page
	}]]) }, [...t[0] ||= [p("svg", { viewBox: "25 25 50 50" }, [p("circle", {
		cx: "50",
		cy: "50",
		r: "20"
	})], -1)]], 2);
}
var Gt = /*#__PURE__*/ o({
	props: {
		center: {
			type: Boolean,
			default: !1
		},
		page: {
			type: Boolean,
			default: !1
		},
		size: {
			type: String,
			default: "normal"
		}
	},
	data() {
		return {};
	},
	created() {},
	beforeUnmount() {},
	methods: {}
}, [["render", Wt]]), Kt = {
	add: "plus",
	done: "check",
	remove: "minus",
	search: "magnify",
	help_outline: "help-circle-outline"
}, $ = { getClass(e) {
	return e ? "mdi-" + (Kt[e] || e).replace("_", "-") : "";
} }, qt = ["type", "aria-disabled"], Jt = { class: "bunt-button-text" }, Yt = ["textContent"], Xt = {
	key: 0,
	class: "bunt-icon mdi mdi-replay error"
}, Zt = {
	key: 1,
	class: "bunt-icon mdi mdi-check success"
};
function Qt(e, t, n, i, a, o) {
	let c = b("progress-circular"), l = b("ripple-ink"), u = C("tooltip");
	return x((S(), s("button", {
		class: D(["bunt-button", {
			disabled: n.disabled || n.loading || a.showSuccess,
			error: n.errorMessage || n.error,
			success: a.showSuccess
		}]),
		type: n.type,
		ref: "button",
		onClick: t[0] ||= (...e) => o.onClick && o.onClick(...e),
		"aria-disabled": n.disabled
	}, [
		p("div", { class: D(["bunt-button-content", { invisible: n.loading || n.errorMessage || n.error || a.showSuccess }]) }, [n.icon ? (S(), s("i", {
			key: 0,
			class: D(["bunt-icon mdi", [o.iconClass]])
		}, null, 2)) : m("", !0), p("div", Jt, [y(e.$slots, "default", {}, () => [p("span", { textContent: E(n.text) }, null, 8, Yt)])])], 2),
		x(se(c, { size: "small" }, null, 512), [[r, n.loading]]),
		n.errorMessage || n.error ? (S(), s("i", Xt)) : m("", !0),
		a.showSuccess ? (S(), s("i", Zt)) : m("", !0),
		n.disabled ? m("", !0) : (S(), f(l, { key: 2 }))
	], 10, qt)), [[u, n.tooltipOptions || {
		text: o._tooltip,
		show: !!this.errorMessage,
		placement: n.tooltipPlacement,
		fixed: n.tooltipFixed
	}]]);
}
var $t = /*#__PURE__*/ o({
	name: "bunt-button",
	components: { ProgressCircular: Gt },
	mixins: [Q],
	props: {
		text: String,
		icon: String,
		iconRight: {
			type: Boolean,
			default: !1
		},
		loading: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		type: {
			type: String,
			default: "button"
		},
		error: Boolean,
		errorMessage: String,
		successAfterLoading: {
			type: Boolean,
			default: !0
		},
		tooltip: String,
		tooltipPlacement: {
			type: String,
			default: "bottom"
		},
		tooltipFixed: {
			type: Boolean,
			default: !1
		},
		tooltipOptions: Object
	},
	emits: ["click"],
	data() {
		return {
			_loading: !1,
			showSuccess: !1
		};
	},
	computed: {
		_tooltip() {
			return this.errorMessage ? this.errorMessage : this.tooltip;
		},
		iconClass() {
			return $.getClass(this.icon);
		}
	},
	watch: {
		loading: "loadingChanged",
		errorMessage: "errorChanged",
		error: "errorChanged"
	},
	methods: {
		loadingChanged(e) {
			if (e) this._loading = e, this.userShowTooltip = !1, this.showSuccess = !1, this.$successTimeout && clearTimeout(this.$successTimeout);
			else {
				if (this._loading = e, this.errorMessage || this.error) return;
				this.showSuccess = !0, this.$successTimeout = setTimeout(() => {
					this.showSuccess = !1;
				}, 3e3);
			}
		},
		errorChanged(e) {
			e !== null && (this.showSuccess = !1);
		},
		onClick(e) {
			this.disabled || this.loading || this.showSuccess || this.$emit("click", e);
		}
	}
}, [["render", Qt]]), en = { key: 0 }, tn = [
	"name",
	"checked",
	"disabled",
	"readonly"
];
function nn(e, t, n, r, i, a) {
	return S(), s("div", { class: D(["bunt-checkbox", {
		checked: n.modelValue,
		disabled: n.disabled
	}]) }, [p("label", null, [
		t[3] ||= p("div", { class: "bunt-checkbox-box" }, null, -1),
		n.label ? (S(), s("span", en, E(n.label), 1)) : y(e.$slots, "default", {}, void 0, void 0, 1),
		p("input", {
			type: "checkbox",
			name: n.name,
			checked: n.modelValue,
			disabled: n.disabled,
			readonly: n.readonly,
			onChange: t[0] ||= (e) => a.onChange(e),
			onFocus: t[1] ||= (e) => i.focused = !0,
			onBlur: t[2] ||= (...e) => a.onBlur && a.onBlur(...e)
		}, null, 40, tn)
	])], 2);
}
var rn = /*#__PURE__*/ o({
	name: "bunt-checkbox",
	components: {},
	props: {
		modelValue: {
			type: Boolean,
			default: !1
		},
		name: {
			type: String,
			required: !0
		},
		label: String,
		disabled: {
			type: Boolean,
			default: !1
		},
		readonly: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue"],
	data() {
		return { focused: !1 };
	},
	methods: {
		onChange(e) {
			this.$emit("update:modelValue", e.target.checked), this.validation && this.validation.$touch();
		},
		onBlur() {
			this.focused = !1, this.validation && this.validation.$touch();
		}
	}
}, [["render", nn]]), an = [
	"name",
	"value",
	"checked",
	"disabled",
	"readonly"
], on = { key: 0 }, sn = { key: 1 };
function cn(e, t, n, r, i, a) {
	return S(), s("div", { class: D(["bunt-radio", { checked: a.isChecked }]) }, [
		p("input", {
			type: "radio",
			name: n.name,
			value: n.modelValue,
			checked: a.isChecked,
			disabled: n.disabled,
			readonly: n.readonly,
			onChange: t[0] ||= (e) => a.onChange(e),
			onFocus: t[1] ||= (e) => i.focused = !0,
			onBlur: t[2] ||= (...e) => a.onBlur && a.onBlur(...e)
		}, null, 40, an),
		t[3] ||= p("div", { class: "bunt-radio-circle" }, null, -1),
		n.label ? (S(), s("label", on, E(n.label), 1)) : (S(), s("label", sn, [y(e.$slots, "default")]))
	], 2);
}
var ln = /*#__PURE__*/ o({
	name: "bunt-radio",
	props: {
		modelValue: [Boolean, String],
		value: String,
		name: {
			type: String,
			required: !0
		},
		label: String,
		disabled: {
			type: Boolean,
			default: !1
		},
		readonly: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue"],
	data() {
		return { focused: !1 };
	},
	computed: { isChecked() {
		return this.value === this.modelValue;
	} },
	methods: {
		onChange(e) {
			this.$emit("update:modelValue", this.value), this.validation && this.validation.$touch();
		},
		onBlur() {
			this.focused = !1, this.validation && this.validation.$touch();
		}
	}
}, [["render", cn]]);
//#endregion
//#region node_modules/buntpapier/src/icon.vue?vue&type=template&lang.js
function un(e, t, n, r, i, a) {
	return S(), s("i", { class: D(["bunt-icon mdi", [a.iconClass]]) }, null, 2);
}
var dn = /*#__PURE__*/ o({
	name: "bunt-icon",
	props: { icon: {
		type: String,
		required: !0
	} },
	computed: { iconClass() {
		return $.getClass(this.icon);
	} }
}, [["render", un]]), fn = ["type", "aria-disabled"];
function pn(e, t, n, r, i, a) {
	let o = b("ripple-ink"), c = C("tooltip");
	return x((S(), s("button", {
		class: D(["bunt-icon-button", { disabled: n.disabled }]),
		type: n.type,
		"aria-disabled": n.disabled,
		ref: "button",
		onClick: t[0] ||= (...e) => a.onClick && a.onClick(...e)
	}, [a.iconClass() ? (S(), s("i", {
		key: 0,
		class: D(["bunt-icon mdi", [a.iconClass()]])
	}, null, 2)) : y(e.$slots, "default", {}, void 0, void 0, 1), n.disabled ? m("", !0) : (S(), f(o, { key: 2 }))], 10, fn)), [[c, n.tooltipOptions || {
		text: n.tooltip,
		placement: n.tooltipPlacement,
		fixed: n.tooltipFixed
	}]]);
}
var mn = /*#__PURE__*/ o({
	name: "bunt-icon-button",
	mixins: [Q],
	props: {
		disabled: {
			type: Boolean,
			default: !1
		},
		type: {
			type: String,
			default: "button"
		},
		tooltip: String,
		tooltipPlacement: {
			type: String,
			default: "bottom"
		},
		tooltipFixed: {
			type: Boolean,
			default: !1
		},
		tooltipOptions: Object
	},
	emits: ["click"],
	data() {
		return { showTooltip: !1 };
	},
	methods: {
		iconClass() {
			let e = this.$slots.default()[0];
			if (e?.type === ae) return $.getClass(e.children);
		},
		onClick(e) {
			this.disabled || this.$emit("click", e);
		}
	}
}, [["render", pn]]), hn = typeof window < "u" && document.createElement("canvas");
function gn(e, t) {
	if (typeof window > "u") return 0;
	var n = hn.getContext("2d");
	return n.font = t, n.measureText(e || "");
}
//#endregion
//#region node_modules/buntpapier/src/mixins/input-outline.js
var _n = {
	data: function() {
		return { outlineStroke: "" };
	},
	computed: { floatingLabelWidth() {
		return this.label ? gn(this.label, "12px 'Roboto', \"Helvetica Neue\", HelveticaNeue, Helvetica, Arial, sans-serif").width + 8 : 0;
	} },
	mounted() {
		this.$nextTick(() => {
			this.generateOutline();
		});
	},
	methods: { generateOutline() {
		let { width: e, height: t } = this.$refs.outline.getBoundingClientRect();
		this.outlineStroke = `M 5 1
			h ${e - 10}
			a 4 4 0 0 1 4 4
			v ${t - 10}
			a 4 4 0 0 1 -4 4
			h ${-e + 10}
			a 4 4 0 0 1 -4 -4
			v ${-t + 10}
			a 4 4 0 0 1 4 -4`;
	} }
}, vn = { class: "label-input-container" }, yn = ["for"], bn = [
	"type",
	"name",
	"value",
	"disabled",
	"readonly",
	"placeholder"
], xn = ["title"], Sn = {
	class: "outline",
	ref: "outline"
}, Cn = ["d"], wn = ["innerHTML"], Tn = {
	key: 1,
	class: "hint"
};
function En(e, t, n, i, a, o) {
	let c = C("resize-observer");
	return x((S(), s("div", {
		class: D(["bunt-input", {
			focused: e.focused,
			"floating-label": o.floatingLabel,
			invalid: o.invalid,
			disabled: n.disabled,
			"with-icon": n.icon
		}]),
		style: _({ "--label-gap": e.floatingLabelWidth })
	}, [p("div", vn, [
		p("label", { for: n.name }, E(n.label), 9, yn),
		n.icon ? (S(), s("div", {
			key: 0,
			class: D(["icon mdi", [o.iconClass]])
		}, null, 2)) : m("", !0),
		p("input", {
			ref: "input",
			type: n.type,
			name: n.name,
			value: n.modelValue,
			disabled: n.disabled,
			readonly: n.readonly,
			onInput: t[0] ||= (e) => o.onInput(e),
			onFocus: t[1] ||= (t) => e.focused = !0,
			onBlur: t[2] ||= (...e) => o.onBlur && o.onBlur(...e),
			placeholder: n.placeholder
		}, null, 40, bn),
		x(p("div", {
			class: "error-icon mdi mdi-alert-circle",
			title: o.hintText
		}, null, 8, xn), [[r, o.invalid]]),
		(S(), s("svg", Sn, [p("path", { d: e.outlineStroke }, null, 8, Cn)], 512))
	]), n.hintIsHtml ? (S(), s("div", {
		key: 0,
		class: "hint",
		innerHTML: o.hintText
	}, null, 8, wn)) : (S(), s("div", Tn, E(o.hintText), 1))], 6)), [[c, e.generateOutline]]);
}
var Dn = /*#__PURE__*/ o({
	name: "bunt-input",
	mixins: [_n],
	props: {
		type: {
			type: String,
			default: "text"
		},
		name: {
			type: String,
			required: !0
		},
		label: String,
		placeholder: String,
		modelValue: {
			type: [String, Number],
			default: ""
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		readonly: {
			type: Boolean,
			default: !1
		},
		icon: String,
		iconRight: {
			type: Boolean,
			default: !1
		},
		hint: String,
		hintIsHtml: {
			type: Boolean,
			default: !1
		},
		validation: Object
	},
	emits: ["update:modelValue"],
	data: function() {
		return { focused: !1 };
	},
	computed: {
		iconClass() {
			return $.getClass(this.icon);
		},
		invalid() {
			return this.validation && this.validation.$error;
		},
		hintText() {
			return this.invalid && this.validation.$errors ? this.validation.$errors.map((e) => e.$message).filter(Boolean).join() : this.hint;
		},
		floatingLabel() {
			return !!(this.placeholder || this.modelValue || this.modelValue === 0);
		}
	},
	methods: {
		onInput(e) {
			this.$emit("update:modelValue", e.target.value), this.validation && this.validation.$touch();
		},
		onBlur() {
			this.focused = !1, this.validation && this.validation.$touch();
		}
	}
}, [["render", En]]), On = {
	class: "outline",
	ref: "outline"
}, kn = ["d"];
function An(e, t, n, r, i, a) {
	let o = C("resize-observer");
	return x((S(), s("div", {
		class: D(["bunt-input-outline-container", { focused: i.focused }]),
		style: _({ "--label-gap": e.floatingLabelWidth })
	}, [
		p("label", null, E(n.label), 1),
		y(e.$slots, "default", {
			focus: a.focus,
			blur: a.blur
		}),
		(S(), s("svg", On, [p("path", { d: e.outlineStroke }, null, 8, kn)], 512))
	], 6)), [[o, e.generateOutline]]);
}
var jn = /*#__PURE__*/ o({
	name: "bunt-input-outline-container",
	mixins: [_n],
	props: { label: String },
	data() {
		return { focused: !1 };
	},
	computed: {},
	created() {},
	mounted() {
		this.$nextTick(() => {});
	},
	methods: {
		focus() {
			this.focused = !0;
		},
		blur() {
			this.focused = !1;
		}
	}
}, [["render", An]]), Mn = ["href", "onClick"];
function Nn(e, t, n, r, i, a) {
	let o = b("ripple-ink"), s = b("router-link");
	return S(), f(s, {
		to: n.to,
		custom: ""
	}, {
		default: te(({ href: t, navigate: n, isActive: r, isExactActive: i }) => [p("a", ne({ class: "bunt-link-button" }, e.$attrs, {
			class: {
				"router-link-active": r,
				"router-link-exact-active": i
			},
			href: t,
			onClick: (t) => {
				n(t), e.$emit("click", t);
			}
		}), [y(e.$slots, "default"), se(o)], 16, Mn)]),
		_: 3
	}, 8, ["to"]);
}
var Pn = /*#__PURE__*/ o({
	name: "bunt-link-button",
	components: {},
	mixins: [Q],
	props: { to: Object },
	emits: ["click"]
}, [["render", Nn]]), Fn = {
	watch: { typeAheadPointer() {
		this.maybeAdjustScroll();
	} },
	methods: {
		maybeAdjustScroll() {
			if (!this.$refs.dropdownMenu) return;
			let e = this.pixelsToPointerTop(), t = this.pixelsToPointerBottom();
			if (e <= this.viewport().top) return this.scrollTo(e);
			if (t >= this.viewport().bottom) return this.scrollTo(this.viewport().top + this.pointerHeight());
		},
		pixelsToPointerTop() {
			let e = 0, t = this.$refs.dropdownMenu.children;
			for (let n = 0; n < this.typeAheadPointer; n++) e += t[n] ? t[n].offsetHeight : 0;
			return e;
		},
		pixelsToPointerBottom() {
			return this.pixelsToPointerTop() + this.pointerHeight();
		},
		pointerHeight() {
			let e = this.$refs.dropdownMenu.children[this.typeAheadPointer];
			return e ? e.offsetHeight : 0;
		},
		viewport() {
			return {
				top: this.$refs.dropdownMenu.scrollTop,
				bottom: this.$refs.dropdownMenu.offsetHeight + this.$refs.dropdownMenu.scrollTop
			};
		},
		scrollTo(e) {
			return this.$refs.dropdownMenu.scrollTop = e;
		}
	}
}, In = {
	data() {
		return { typeAheadPointer: -1 };
	},
	watch: { filteredOptions() {
		this.typeAheadPointer = 0;
	} },
	methods: {
		typeAheadUp() {
			this.typeAheadPointer > 0 && (this.typeAheadPointer--, this.maybeAdjustScroll && this.maybeAdjustScroll());
		},
		typeAheadDown() {
			this.typeAheadPointer < this.filteredOptions.length - 1 && (this.typeAheadPointer++, this.maybeAdjustScroll && this.maybeAdjustScroll());
		},
		typeAheadSelect() {
			this.filteredOptions[this.typeAheadPointer] ? this.select(this.filteredOptions[this.typeAheadPointer]) : this.taggable && this.search.length && this.select(this.search);
		}
	}
}, Ln = /* @__PURE__ */ e((/* @__PURE__ */ t(((e, t) => {
	function n(e, t) {
		var n = t.length, r = e.length;
		if (r > n) return !1;
		if (r === n) return e === t;
		outer: for (var i = 0, a = 0; i < r; i++) {
			for (var o = e.charCodeAt(i); a < n;) if (t.charCodeAt(a++) === o) continue outer;
			return !1;
		}
		return !0;
	}
	t.exports = n;
})))()), Rn = { class: "label-input-container" }, zn = ["for"], Bn = [
	"name",
	"disabled",
	"placeholder"
], Vn = {
	class: "outline",
	ref: "outline"
}, Hn = ["d"], Un = ["innerHTML"], Wn = {
	key: 1,
	class: "hint"
}, Gn = { class: "scrollable-menu" }, Kn = ["onMouseover", "onClick"], qn = {
	key: 0,
	class: "divider",
	transition: "fade"
}, Jn = {
	key: 1,
	class: "text-center",
	transition: "fade"
};
function Yn(e, t, r, i, o, c) {
	let h = C("scrollbar"), g = C("resize-observer");
	return x((S(), s("div", { class: D(["bunt-select dropdown", c.dropdownClasses]) }, [p("div", {
		class: D(["bunt-input dense", {
			focused: o.open,
			"floating-label": o.rawSearch.length != 0 || !c.isValueEmpty,
			invalid: c.invalid,
			disabled: r.disabled
		}]),
		ref: "searchContainer",
		style: _({ "--label-gap": e.floatingLabelWidth })
	}, [p("div", Rn, [
		p("label", { for: r.name }, E(r.label), 9, zn),
		r.icon ? (S(), s("div", {
			key: 0,
			class: D(["icon mdi", [c.iconClass]])
		}, null, 2)) : m("", !0),
		x(p("input", {
			type: "text",
			ref: "search",
			name: r.name,
			"onUpdate:modelValue": t[0] ||= (e) => o.rawSearch = e,
			disabled: r.disabled,
			onKeydown: [
				t[1] ||= l((...e) => c.maybeDeleteValue && c.maybeDeleteValue(...e), ["delete"]),
				t[3] ||= l(d((...t) => e.typeAheadUp && e.typeAheadUp(...t), ["prevent"]), ["up"]),
				t[4] ||= l(d((...t) => e.typeAheadDown && e.typeAheadDown(...t), ["prevent"]), ["down"])
			],
			onKeyup: [t[2] ||= l((...e) => c.onEscape && c.onEscape(...e), ["esc"]), t[5] ||= l(d((...t) => e.typeAheadSelect && e.typeAheadSelect(...t), ["prevent"]), ["enter"])],
			onBlur: t[6] ||= (...e) => c.onBlur && c.onBlur(...e),
			onFocus: t[7] ||= (...e) => c.onFocus && c.onFocus(...e),
			placeholder: c.searchPlaceholder,
			autocomplete: "off"
		}, null, 40, Bn), [[u, o.rawSearch]]),
		p("i", {
			class: "open-indicator mdi mdi-menu-down",
			ref: "openIndicator",
			role: "presentation",
			onMousedown: t[8] ||= d(() => {}, ["prevent", "stop"]),
			onClick: t[9] ||= d((...e) => c.toggleDropdown && c.toggleDropdown(...e), ["prevent", "stop"])
		}, null, 544),
		(S(), s("svg", Vn, [p("path", { d: e.outlineStroke }, null, 8, Hn)], 512))
	]), r.hintIsHtml ? (S(), s("div", {
		key: 0,
		class: "hint",
		innerHTML: c.hintText
	}, null, 8, Un)) : (S(), s("div", Wn, E(c.hintText), 1))], 6), o.open ? (S(), f(a, {
		key: 0,
		to: c.buntTeleportTarget
	}, [p("div", {
		class: D(["bunt-select-dropdown-menu", [r.dropdownClass]]),
		ref: "dropdownMenu",
		style: _({
			"max-height": r.maxHeight,
			width: o.width + "px"
		}),
		onMousedown: t[10] ||= d(() => {}, ["prevent", "stop"])
	}, [y(e.$slots, "result-header"), x((S(), s("div", Gn, [p("ul", null, [
		(S(!0), s(n, null, ce(c.filteredOptions, (t, n) => (S(), s("li", {
			key: n,
			class: D({
				active: c.isOptionSelected(t),
				highlight: n === e.typeAheadPointer
			}),
			onMouseover: (t) => e.typeAheadPointer = n,
			onClick: d((e) => c.select(t), ["prevent", "stop"])
		}, [y(e.$slots, "default", { option: t }, () => [ee(E(r.getOptionLabel(t)), 1)])], 42, Kn))), 128)),
		c.filteredOptions.length ? m("", !0) : (S(), s("li", qn)),
		c.filteredOptions.length ? m("", !0) : (S(), s("li", Jn, [y(e.$slots, "no-options", {}, () => [t[11] ||= ee("Sorry, no matching options.", -1)])]))
	])])), [[
		h,
		{ _preventMousedown: !0 },
		void 0,
		{ y: !0 }
	]])], 38)], 8, ["to"])) : m("", !0)], 2)), [[g, e.generateOutline]]);
}
var Xn = /*#__PURE__*/ o({
	name: "bunt-select",
	mixins: [
		_n,
		In,
		Fn
	],
	props: {
		name: {
			type: String,
			required: !0
		},
		label: String,
		modelValue: {
			type: [
				String,
				Object,
				Number
			],
			default: null
		},
		icon: String,
		options: {
			type: Array,
			default() {
				return [];
			}
		},
		placeholder: {
			type: String,
			default: ""
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		maxHeight: {
			type: String,
			default: "400px"
		},
		optionLabel: {
			type: String,
			default: "label"
		},
		getOptionLabel: {
			type: Function,
			default(e) {
				return typeof e == "object" && this.optionLabel !== void 0 && e[this.optionLabel] !== void 0 ? e[this.optionLabel] : e;
			}
		},
		optionValue: {
			type: String,
			default: "id"
		},
		getOptionValue: {
			type: Function,
			default(e) {
				return typeof e == "object" && this.optionValue !== void 0 && e[this.optionValue] !== void 0 ? e[this.optionValue] : e;
			}
		},
		findOptionByValue: {
			type: Function,
			default(e) {
				return this.options.find((t) => typeof t == "object" && this.optionValue ? t[this.optionValue] === e : t === e);
			}
		},
		hint: String,
		hintIsHtml: {
			type: Boolean,
			default: !1
		},
		validation: Object,
		dropdownClass: String,
		dropdownOverflowElement: [String, Object],
		filterByFunction: {
			type: Function,
			default(e, t, n) {
				return n(e, this.getOptionLabel(t).toLowerCase());
			}
		}
	},
	emits: [
		"update:modelValue",
		"focus",
		"blur"
	],
	inject: { buntTeleportTarget: { default: "#bunt-teleport-target" } },
	data() {
		return {
			search: "",
			rawSearch: "",
			open: !1,
			width: 0
		};
	},
	computed: {
		dropdownClasses() {
			return { open: this.open };
		},
		searchPlaceholder() {
			if (this.isValueEmpty && this.placeholder) return this.placeholder;
		},
		filteredOptions() {
			return this.search ? this.options.filter((e) => this.filterByFunction(this.search.toLowerCase(), e, Ln.default)) : this.options;
		},
		isValueEmpty() {
			return this.modelValue ? typeof this.modelValue == "object" ? !Object.keys(this.modelValue).length : !this.modelValue.length : !0;
		},
		iconClass() {
			return $.getClass(this.icon);
		},
		invalid() {
			return this.validation && this.validation.$error;
		},
		hintText() {
			return this.invalid && this.validation.$errors ? this.validation.$errors.map((e) => e.$message).filter(Boolean).join() : this.hint;
		}
	},
	watch: {
		modelValue(e) {
			this.selectValue(e);
		},
		rawSearch(e) {
			this.open && (this.search = e);
		},
		filteredOptions() {
			this._popper?.scheduleUpdate();
		},
		options: {
			handler() {
				this.open || this.selectValue(this.modelValue);
			},
			deep: !0
		}
	},
	mounted() {
		this.selectValue(this.modelValue);
	},
	beforeUnmount() {
		this._popper?.destroy();
	},
	methods: {
		focus() {
			this.$refs.search.focus();
		},
		blur() {
			this.$refs.search.blur();
		},
		selectValue(e) {
			let t = this.findOptionByValue(e);
			this.rawSearch = this.getOptionLabel(t) || "";
		},
		select(e) {
			this.isOptionSelected(e) ? this.deselect(e) : this.$emit("update:modelValue", this.getOptionValue(e)), this.onAfterSelect(e);
		},
		deselect(e) {
			this.$emit("update:modelValue", null);
		},
		onAfterSelect(e) {
			this.$refs.search.blur(), this.rawSearch = this.getOptionLabel(e) || "";
		},
		toggleDropdown(e) {
			(e.target === this.$refs.openIndicator || e.target === this.$refs.search || e.target === this.$refs.toggle || e.target === this.$el) && (this.open ? this.blur() : this.focus());
		},
		isOptionSelected(e) {
			return this.modelValue === e;
		},
		async onFocus() {
			this.open = !0, this.search = "", this.$refs.search.select(), this.width = this.$refs.searchContainer.getBoundingClientRect().width, await this.$nextTick();
			let e = {
				placement: "bottom",
				positionFixed: !0,
				modifiers: {}
			};
			this.icon && (e.modifiers.offset = { offset: "-15, 0" }), this.dropdownOverflowElement && (e.modifiers.preventOverflow = { boundariesElement: this.dropdownOverflowElement }), this._popper = new X(this.$refs.search, this.$refs.dropdownMenu, e), this.$emit("focus");
		},
		onBlur() {
			this.open = !1, this.$nextTick(() => this._popper?.destroy()), this.validation && this.validation.$touch(), this.$emit("blur");
		},
		onEscape() {
			this.rawSearch.length ? (this.deselect(), this.rawSearch = "") : this.$refs.search.blur();
		},
		maybeDeleteValue() {
			!this.$refs.search.value.length && this.modelValue && this.$emit("update:modelValue", null);
		}
	}
}, [["render", Yn]]), Zn = [
	"name",
	"checked",
	"disabled",
	"readonly"
];
function Qn(e, t, n, r, i, a) {
	return S(), s("div", { class: D(["bunt-switch", { checked: n.modelValue }]) }, [
		p("input", {
			type: "checkbox",
			name: n.name,
			checked: n.modelValue,
			disabled: n.disabled,
			readonly: n.readonly,
			onChange: t[0] ||= (e) => a.onChange(e),
			onFocus: t[1] ||= (e) => i.focused = !0,
			onBlur: t[2] ||= (...e) => a.onBlur && a.onBlur(...e)
		}, null, 40, Zn),
		t[3] ||= p("div", { class: "bunt-switch-track" }, [p("div", { class: "bunt-switch-thumb" })], -1),
		p("label", null, E(n.label), 1)
	], 2);
}
var $n = /*#__PURE__*/ o({
	name: "bunt-switch",
	components: {},
	props: {
		modelValue: {
			type: Boolean,
			default: !1
		},
		name: {
			type: String,
			required: !0
		},
		label: String,
		disabled: {
			type: Boolean,
			default: !1
		},
		readonly: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue"],
	data() {
		return { focused: !1 };
	},
	methods: {
		onChange(e) {
			this.$emit("update:modelValue", e.target.checked), this.validation && this.validation.$touch();
		},
		onBlur() {
			this.focused = !1, this.validation && this.validation.$touch();
		}
	}
}, [["render", Qn]]), er = [
	"tabindex",
	"aria-controls",
	"aria-selected",
	"disabled"
], tr = {
	key: 0,
	class: "bunt-tab-header-item-icon"
}, nr = ["textContent"];
function rr(e, t, n, r, i, a) {
	let o = b("ripple-ink");
	return S(), s("li", {
		class: D(["bunt-tab-header-item", ["type-" + n.type, {
			active: n.active,
			disabled: n.disabled
		}]]),
		role: "tab",
		tabindex: n.active ? 0 : -1,
		"aria-controls": n.id,
		"aria-selected": n.active ? "true" : null,
		disabled: n.disabled,
		ref: "item"
	}, [y(e.$slots, "default", {}, () => [n.type === "icon" || n.type === "icon-and-text" ? (S(), s("div", tr, [p("i", { class: D(["bunt-icon mdi", [a.iconClass]]) }, null, 2)])) : m("", !0), n.type === "text" || n.type === "icon-and-text" ? (S(), s("div", {
		key: 1,
		class: "bunt-tab-header-item-text",
		textContent: E(n.text)
	}, null, 8, nr)) : m("", !0)]), n.disabled ? m("", !0) : (S(), f(o, { key: 0 }))], 10, er);
}
var ir = /*#__PURE__*/ o({
	name: "bunt-tab-header-item",
	mixins: [Q],
	props: {
		id: String,
		type: {
			type: String,
			default: "text"
		},
		text: String,
		icon: String,
		active: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	computed: { iconClass() {
		return $.getClass(this.icon);
	} }
}, [["render", rr]]), ar = function(e) {
	return e.length === 1 && e[0].type === n ? ar(e[0].children) : e.filter((e) => e.type.name === "bunt-tab");
}, or = {
	name: "bunt-tabs",
	props: {
		type: {
			type: String,
			default: "text"
		},
		modelValue: { type: [
			Number,
			String,
			Object,
			Function
		] }
	},
	emits: ["update:modelValue"],
	setup(e, { slots: t, emit: n }) {
		let r = h({
			tabs: ar(t.default()),
			activeTab: null,
			indicatorTargetTransform: null,
			indicatorState: null,
			indicatorTransform: null,
			indicatorStyle: i(() => {
				if (r.indicatorTransform) return { transform: `translateX(${r.indicatorTransform.left}%) scaleX(${r.indicatorTransform.width})` };
			})
		}), a = T(null), o = T(null), s = T([]);
		oe(() => {
			s.value = [];
		});
		let c = (e) => e ? e.props.id || r.tabs.indexOf(e) : null;
		re(() => t.default(), (t) => {
			r.tabs = ar(t);
			let n = s.value.findIndex((e) => e.id === r.activeTab);
			n < 0 && e.modelValue === void 0 && (n = 0), u(n);
		}, { flush: "post" }), re(() => e.modelValue, () => {
			c(r.activeTab) !== e.modelValue && u(s.value.findIndex((t) => t.id === e.modelValue));
		});
		let l = (e, t) => {
			if (e == null || e < 0) {
				r.indicatorTransform = {
					width: 0,
					left: 0
				};
				return;
			}
			let n = o.value.getBoundingClientRect(), i = n.width;
			Array.from(o.value.children);
			let a = s.value[e].$el.getBoundingClientRect(), c = a.left - n.left;
			if (r.indicatorTargetTransform = {
				width: a.width / i,
				left: c / i * 100
			}, t === void 0 || t < 0) r.indicatorState = "", r.indicatorTransform = {
				width: r.indicatorTargetTransform.width,
				left: r.indicatorTargetTransform.left
			};
			else {
				let n = s.value[t].$el.getBoundingClientRect();
				r.indicatorState = "expand", t < e ? r.indicatorTransform.width = (a.left + a.width - n.left) / i : r.indicatorTransform = {
					width: (n.left + n.width - a.left) / i,
					left: c / i * 100
				};
			}
		}, u = (t) => {
			let i = r.tabs.find((e) => e.props.id === t) || r.tabs[t], a = r.tabs.indexOf(i), o = r.tabs.indexOf(r.activeTab), s = c(r.activeTab);
			s && r.activeTab.props.onDeselected?.(s), r.activeTab = i;
			let u = c(r.activeTab);
			u !== e.modelValue && n("update:modelValue", u), r.activeTab?.props.onSelected?.(u), l(a, o);
		}, d;
		return v(() => {
			u(e.modelValue || 0), d = new M((e) => {
				o.value && r.activeTab && l(r.tabs.indexOf(r.activeTab));
			}), d.observe(a.value);
		}), ie(() => {
			d.disconnect();
		}), () => w("div", {
			class: "bunt-tabs",
			ref: a
		}, [w("div", { class: "bunt-tabs-header" }, [w("ul", {
			class: "bunt-tabs-header-items",
			role: "tablist",
			ref: o
		}, r.tabs.map((e, n) => w(ir, {
			id: e.props.id,
			text: typeof e.props.header == "string" ? e.props.header : null,
			active: e === r.activeTab,
			disabled: e.props.disabled,
			key: e.props.id,
			ref(e) {
				e && (s.value[n] = e);
			},
			onClick() {
				e.props.disabled || u(n, r.tabs);
			}
		}, t.headerItem ? () => t.headerItem({
			id: e.props.id,
			...e.props.header
		}) : null))), w("div", {
			class: ["bunt-tabs-indicator", r.indicatorState],
			style: r.indicatorStyle,
			onTransitionend() {
				r.indicatorState === "expand" ? (r.indicatorState = "contract", r.indicatorTransform = {
					width: r.indicatorTargetTransform.width,
					left: r.indicatorTargetTransform.left
				}) : r.indicatorState = "";
			}
		})]), w("div", {
			class: "bunt-tabs-body",
			role: "tabpanel",
			tabindex: 0,
			key: r.activeTab?.props.id
		}, r.activeTab?.children?.default())]);
	}
};
//#endregion
//#region node_modules/buntpapier/src/tab.vue?vue&type=template&lang.js
function sr(e, t, n, r, i, a) {
	return null;
}
var cr = /*#__PURE__*/ o({
	name: "bunt-tab",
	props: {
		header: [String, Object],
		icon: String,
		disabled: {
			type: Boolean,
			default: !1
		},
		id: String
	},
	emits: ["selected", "deselected"]
}, [["render", sr]]), lr = {
	key: 0,
	class: "bunt-dialog-container"
}, ur = { class: "bunt-dialog" };
function dr(e, t, n, r, i, a) {
	return n.open ? (S(), s("div", lr, [p("div", ur, [y(e.$slots, "default")]), p("div", {
		class: "bunt-backdrop",
		onClick: t[0] ||= (...e) => a.close && a.close(...e),
		"keyup.esc": "close"
	})])) : m("", !0);
}
var fr = /*#__PURE__*/ o({
	props: { open: {
		type: Boolean,
		default: !1
	} },
	emits: ["close"],
	mounted() {
		this.$nextTick(() => {
			document.body.appendChild(this.$el);
		});
	},
	beforeUnmount() {
		this.$el.parentNode === document.body && document.body.removeChild(this.$el);
	},
	methods: { close() {
		this.$emit("close");
	} }
}, [["render", dr]]), pr = { install(e) {
	Ht(e), e.component("bunt-button", $t), e.component("bunt-checkbox", rn), e.component("bunt-radio", ln), e.component("bunt-icon", dn), e.component("bunt-icon-button", mn), e.component("bunt-input", Dn), e.component("bunt-input-outline-container", jn), e.component("bunt-link-button", Pn), e.component("bunt-select", Xn), e.component("bunt-progress-circular", Gt), e.component("bunt-switch", $n), e.component("bunt-tabs", or), e.component("bunt-tab", cr), e.component("bunt-dialog", fr);
} };
//#endregion
export { pr as t };
