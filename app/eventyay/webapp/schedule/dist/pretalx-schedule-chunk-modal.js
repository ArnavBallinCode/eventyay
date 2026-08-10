import { o as e, t } from "./pretalx-schedule-rolldown-runtime.js";
import { E as n, F as r, G as i, L as a, P as o, Q as s, W as c, X as l, Y as u, Z as d, a as f, bt as p, et as m, ft as h, g, h as _, l as v, lt as y, m as b, n as ee, o as x, r as S, tt as C, ut as w, xt as T, yt as E } from "./pretalx-schedule-chunk-grid.js";
//#region node_modules/dompurify/dist/purify.es.mjs
function D(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function O(e) {
	if (Array.isArray(e)) return e;
}
function te(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t !== 0) for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function ne() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function re(e, t) {
	return O(e) || te(e, t) || ie(e, t) || ne();
}
function ie(e, t) {
	if (e) {
		if (typeof e == "string") return D(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? D(e, t) : void 0;
	}
}
var ae = Object.entries, oe = Object.setPrototypeOf, se = Object.isFrozen, ce = Object.getPrototypeOf, k = Object.getOwnPropertyDescriptor, A = Object.freeze, j = Object.seal, le = Object.create, ue = typeof Reflect < "u" && Reflect, de = ue.apply, fe = ue.construct;
A ||= function(e) {
	return e;
}, j ||= function(e) {
	return e;
}, de ||= function(e, t) {
	var n = [...arguments].slice(2);
	return e.apply(t, n);
}, fe ||= function(e) {
	return new e(...[...arguments].slice(1));
};
var pe = F(Array.prototype.forEach), me = F(Array.prototype.lastIndexOf), he = F(Array.prototype.pop), ge = F(Array.prototype.push), _e = F(Array.prototype.splice), M = Array.isArray, ve = F(String.prototype.toLowerCase), ye = F(String.prototype.toString), be = F(String.prototype.match), xe = F(String.prototype.replace), Se = F(String.prototype.indexOf), Ce = F(String.prototype.trim), we = F(Number.prototype.toString), Te = F(Boolean.prototype.toString), Ee = typeof BigInt > "u" ? null : F(BigInt.prototype.toString), De = typeof Symbol > "u" ? null : F(Symbol.prototype.toString), N = F(Object.prototype.hasOwnProperty), Oe = F(Object.prototype.toString), P = F(RegExp.prototype.test), ke = I(TypeError);
function F(e) {
	return function(t) {
		t instanceof RegExp && (t.lastIndex = 0);
		var n = [...arguments].slice(1);
		return de(e, t, n);
	};
}
function I(e) {
	return function() {
		return fe(e, [...arguments]);
	};
}
function L(e, t) {
	let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ve;
	if (oe && oe(e, null), !M(t)) return e;
	let r = t.length;
	for (; r--;) {
		let i = t[r];
		if (typeof i == "string") {
			let e = n(i);
			e !== i && (se(t) || (t[r] = e), i = e);
		}
		e[i] = !0;
	}
	return e;
}
function Ae(e) {
	for (let t = 0; t < e.length; t++) N(e, t) || (e[t] = null);
	return e;
}
function R(e) {
	let t = le(null);
	for (let r of ae(e)) {
		var n = re(r, 2);
		let i = n[0], a = n[1];
		N(e, i) && (t[i] = M(a) ? Ae(a) : a && typeof a == "object" && a.constructor === Object ? R(a) : a);
	}
	return t;
}
function je(e) {
	switch (typeof e) {
		case "string": return e;
		case "number": return we(e);
		case "boolean": return Te(e);
		case "bigint": return Ee ? Ee(e) : "0";
		case "symbol": return De ? De(e) : "Symbol()";
		case "undefined": return Oe(e);
		case "function":
		case "object": {
			if (e === null) return Oe(e);
			let t = e, n = z(t, "toString");
			if (typeof n == "function") {
				let e = n(t);
				return typeof e == "string" ? e : Oe(e);
			}
			return Oe(e);
		}
		default: return Oe(e);
	}
}
function z(e, t) {
	for (; e !== null;) {
		let n = k(e, t);
		if (n) {
			if (n.get) return F(n.get);
			if (typeof n.value == "function") return F(n.value);
		}
		e = ce(e);
	}
	function n() {
		return null;
	}
	return n;
}
function Me(e) {
	try {
		return P(e, ""), !0;
	} catch {
		return !1;
	}
}
var Ne = A(/* @__PURE__ */ "a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.shadow.slot.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr".split(".")), Pe = A(/* @__PURE__ */ "svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.enterkeyhint.exportparts.filter.font.g.glyph.glyphref.hkern.image.inputmode.line.lineargradient.marker.mask.metadata.mpath.part.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern".split(".")), Fe = A([
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feDropShadow",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence"
]), Ie = A([
	"animate",
	"color-profile",
	"cursor",
	"discard",
	"font-face",
	"font-face-format",
	"font-face-name",
	"font-face-src",
	"font-face-uri",
	"foreignobject",
	"hatch",
	"hatchpath",
	"mesh",
	"meshgradient",
	"meshpatch",
	"meshrow",
	"missing-glyph",
	"script",
	"set",
	"solidcolor",
	"unknown",
	"use"
]), Le = A(/* @__PURE__ */ "math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts".split(".")), Re = A([
	"maction",
	"maligngroup",
	"malignmark",
	"mlongdiv",
	"mscarries",
	"mscarry",
	"msgroup",
	"mstack",
	"msline",
	"msrow",
	"semantics",
	"annotation",
	"annotation-xml",
	"mprescripts",
	"none"
]), ze = A(["#text"]), Be = A(/* @__PURE__ */ "accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.command.commandfor.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.exportparts.face.for.headers.height.hidden.high.href.hreflang.id.inert.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.part.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.slot.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns".split(".")), Ve = A(/* @__PURE__ */ "accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dominant-baseline.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.mask-type.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-orientation.text-rendering.textlength.type.u1.u2.unicode.values.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan".split(".")), He = A(/* @__PURE__ */ "accent.accentunder.align.bevelled.close.columnalign.columnlines.columnspacing.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lquote.lspace.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns".split(".")), Ue = A([
	"xlink:href",
	"xml:id",
	"xlink:title",
	"xml:space",
	"xmlns:xlink"
]), We = j(/{{[\w\W]*|^[\w\W]*}}/g), Ge = j(/<%[\w\W]*|^[\w\W]*%>/g), Ke = j(/\${[\w\W]*/g), qe = j(/^data-[\-\w.\u00B7-\uFFFF]+$/), Je = j(/^aria-[\-\w]+$/), Ye = j(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i), Xe = j(/^(?:\w+script|data):/i), Ze = j(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g), Qe = j(/^html$/i), $e = j(/^[a-z][.\w]*(-[.\w]+)+$/i), et = j(/<[/\w!]/g), tt = j(/<[/\w]/g), nt = j(/<\/no(script|embed|frames)/i), rt = j(/\/>/i), B = {
	element: 1,
	attribute: 2,
	text: 3,
	cdataSection: 4,
	entityReference: 5,
	entityNode: 6,
	processingInstruction: 7,
	comment: 8,
	document: 9,
	documentType: 10,
	documentFragment: 11,
	notation: 12
}, it = function() {
	return typeof window > "u" ? null : window;
}, at = function(e, t) {
	if (typeof e != "object" || typeof e.createPolicy != "function") return null;
	let n = null, r = "data-tt-policy-suffix";
	t && t.hasAttribute(r) && (n = t.getAttribute(r));
	let i = "dompurify" + (n ? "#" + n : "");
	try {
		return e.createPolicy(i, {
			createHTML(e) {
				return e;
			},
			createScriptURL(e) {
				return e;
			}
		});
	} catch {
		return console.warn("TrustedTypes policy " + i + " could not be created."), null;
	}
}, ot = function() {
	return {
		afterSanitizeAttributes: [],
		afterSanitizeElements: [],
		afterSanitizeShadowDOM: [],
		beforeSanitizeAttributes: [],
		beforeSanitizeElements: [],
		beforeSanitizeShadowDOM: [],
		uponSanitizeAttribute: [],
		uponSanitizeElement: [],
		uponSanitizeShadowNode: []
	};
}, V = function(e, t, n, r) {
	return N(e, t) && M(e[t]) ? L(r.base ? R(r.base) : {}, e[t], r.transform) : n;
};
function st() {
	let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : it(), t = (e) => st(e);
	if (t.version = "3.4.13", t.removed = [], !e || !e.document || e.document.nodeType !== B.document || !e.Element) return t.isSupported = !1, t;
	let n = e.document, r = n, i = r.currentScript;
	e.DocumentFragment;
	let a = e.HTMLTemplateElement, o = e.Node, s = e.Element, c = e.NodeFilter;
	e.NamedNodeMap === void 0 && (e.NamedNodeMap || e.MozNamedAttrMap), e.HTMLFormElement;
	let l = e.DOMParser, u = e.trustedTypes, d = s.prototype, f = z(d, "cloneNode"), p = z(d, "remove"), m = z(d, "nextSibling"), h = z(d, "childNodes"), g = z(d, "parentNode"), _ = z(d, "shadowRoot"), v = z(d, "attributes"), y = o && o.prototype ? z(o.prototype, "nodeType") : null, b = o && o.prototype ? z(o.prototype, "nodeName") : null, ee = o && o.prototype ? z(o.prototype, "ownerDocument") : null;
	if (typeof a == "function") {
		let e = n.createElement("template");
		e.content && e.content.ownerDocument && (n = e.content.ownerDocument);
	}
	let x, S = "", C, w = !1, T = 0, E = function() {
		if (T > 0) throw ke("A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the \"DOMPurify and Trusted Types\" section of the README.");
	}, D = function(e) {
		E(), T++;
		try {
			return x.createHTML(e);
		} finally {
			T--;
		}
	}, O = function(e) {
		E(), T++;
		try {
			return x.createScriptURL(e);
		} finally {
			T--;
		}
	}, te = function() {
		return w ||= (C = at(u, i), !0), C;
	}, ne = n, re = ne.implementation, ie = ne.createNodeIterator, oe = ne.createDocumentFragment, se = ne.getElementsByTagName, ce = r.importNode, k = ot();
	t.isSupported = typeof ae == "function" && typeof g == "function" && re && re.createHTMLDocument !== void 0;
	let ue = We, de = Ge, fe = Ke, we = qe, Te = Je, Ee = Xe, De = Ze, Oe = $e, F = Ye, I = null, Ae = L({}, [
		...Ne,
		...Pe,
		...Fe,
		...Le,
		...ze
	]), H = null, ct = L({}, [
		...Be,
		...Ve,
		...He,
		...Ue
	]), U = Object.seal(le(null, {
		tagNameCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		attributeNameCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		allowCustomizedBuiltInElements: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: !1
		}
	})), lt = null, ut = null, W = Object.seal(le(null, {
		tagCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		attributeCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		}
	})), dt = !0, ft = !0, pt = !1, mt = !0, G = !1, K = !0, q = !1, ht = !1, gt = null, _t = null, vt = !1, yt = !1, bt = !1, xt = !1, St = !0, Ct = !1, wt = "user-content-", Tt = !0, Et = !1, Dt = {}, J = null, Ot = L({}, /* @__PURE__ */ "annotation-xml.audio.colgroup.desc.foreignobject.head.iframe.math.mi.mn.mo.ms.mtext.noembed.noframes.noscript.plaintext.script.selectedcontent.style.svg.template.thead.title.video.xmp".split(".")), kt = null, At = L({}, [
		"audio",
		"video",
		"img",
		"source",
		"image",
		"track"
	]), jt = null, Mt = L({}, [
		"alt",
		"class",
		"for",
		"id",
		"label",
		"name",
		"pattern",
		"placeholder",
		"role",
		"summary",
		"title",
		"value",
		"style",
		"xmlns"
	]), Nt = "http://www.w3.org/1998/Math/MathML", Pt = "http://www.w3.org/2000/svg", Y = "http://www.w3.org/1999/xhtml", Ft = Y, It = !1, Lt = null, Rt = L({}, [
		Nt,
		Pt,
		Y
	], ye), zt = A([
		"mi",
		"mo",
		"mn",
		"ms",
		"mtext"
	]), Bt = L({}, zt), Vt = A(["annotation-xml"]), Ht = L({}, Vt), Ut = L({}, [
		"title",
		"style",
		"font",
		"a",
		"script"
	]), Wt = null, Gt = ["application/xhtml+xml", "text/html"], X = null, Kt = null, qt = n.createElement("form"), Jt = function(e) {
		return e instanceof RegExp || e instanceof Function;
	}, Yt = function() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		if (Kt && Kt === e) return;
		(!e || typeof e != "object") && (e = {}), e = R(e), Wt = Gt.indexOf(e.PARSER_MEDIA_TYPE) === -1 ? "text/html" : e.PARSER_MEDIA_TYPE, X = Wt === "application/xhtml+xml" ? ye : ve, I = V(e, "ALLOWED_TAGS", Ae, { transform: X }), H = V(e, "ALLOWED_ATTR", ct, { transform: X }), Lt = V(e, "ALLOWED_NAMESPACES", Rt, { transform: ye }), jt = V(e, "ADD_URI_SAFE_ATTR", Mt, {
			transform: X,
			base: Mt
		}), kt = V(e, "ADD_DATA_URI_TAGS", At, {
			transform: X,
			base: At
		}), J = V(e, "FORBID_CONTENTS", Ot, { transform: X }), lt = V(e, "FORBID_TAGS", R({}), { transform: X }), ut = V(e, "FORBID_ATTR", R({}), { transform: X }), Dt = N(e, "USE_PROFILES") ? e.USE_PROFILES && typeof e.USE_PROFILES == "object" ? R(e.USE_PROFILES) : e.USE_PROFILES : !1, dt = e.ALLOW_ARIA_ATTR !== !1, ft = e.ALLOW_DATA_ATTR !== !1, pt = e.ALLOW_UNKNOWN_PROTOCOLS || !1, mt = e.ALLOW_SELF_CLOSE_IN_ATTR !== !1, G = e.SAFE_FOR_TEMPLATES || !1, K = e.SAFE_FOR_XML !== !1, q = e.WHOLE_DOCUMENT || !1, yt = e.RETURN_DOM || !1, bt = e.RETURN_DOM_FRAGMENT || !1, xt = e.RETURN_TRUSTED_TYPE || !1, vt = e.FORCE_BODY || !1, St = e.SANITIZE_DOM !== !1, Ct = e.SANITIZE_NAMED_PROPS || !1, Tt = e.KEEP_CONTENT !== !1, Et = e.IN_PLACE || !1, F = Me(e.ALLOWED_URI_REGEXP) ? e.ALLOWED_URI_REGEXP : Ye, Ft = typeof e.NAMESPACE == "string" ? e.NAMESPACE : Y, Bt = N(e, "MATHML_TEXT_INTEGRATION_POINTS") && e.MATHML_TEXT_INTEGRATION_POINTS && typeof e.MATHML_TEXT_INTEGRATION_POINTS == "object" ? R(e.MATHML_TEXT_INTEGRATION_POINTS) : L({}, zt), Ht = N(e, "HTML_INTEGRATION_POINTS") && e.HTML_INTEGRATION_POINTS && typeof e.HTML_INTEGRATION_POINTS == "object" ? R(e.HTML_INTEGRATION_POINTS) : L({}, Vt);
		let t = N(e, "CUSTOM_ELEMENT_HANDLING") && e.CUSTOM_ELEMENT_HANDLING && typeof e.CUSTOM_ELEMENT_HANDLING == "object" ? R(e.CUSTOM_ELEMENT_HANDLING) : le(null);
		if (U = le(null), N(t, "tagNameCheck") && Jt(t.tagNameCheck) && (U.tagNameCheck = t.tagNameCheck), N(t, "attributeNameCheck") && Jt(t.attributeNameCheck) && (U.attributeNameCheck = t.attributeNameCheck), N(t, "allowCustomizedBuiltInElements") && typeof t.allowCustomizedBuiltInElements == "boolean" && (U.allowCustomizedBuiltInElements = t.allowCustomizedBuiltInElements), j(U), G && (ft = !1), bt && (yt = !0), Dt && (I = L({}, ze), H = le(null), Dt.html === !0 && (L(I, Ne), L(H, Be)), Dt.svg === !0 && (L(I, Pe), L(H, Ve), L(H, Ue)), Dt.svgFilters === !0 && (L(I, Fe), L(H, Ve), L(H, Ue)), Dt.mathMl === !0 && (L(I, Le), L(H, He), L(H, Ue))), W.tagCheck = null, W.attributeCheck = null, N(e, "ADD_TAGS") && (typeof e.ADD_TAGS == "function" ? W.tagCheck = e.ADD_TAGS : M(e.ADD_TAGS) && (I === Ae && (I = R(I)), L(I, e.ADD_TAGS, X))), N(e, "ADD_ATTR") && (typeof e.ADD_ATTR == "function" ? W.attributeCheck = e.ADD_ATTR : M(e.ADD_ATTR) && (H === ct && (H = R(H)), L(H, e.ADD_ATTR, X))), N(e, "ADD_URI_SAFE_ATTR") && M(e.ADD_URI_SAFE_ATTR) && L(jt, e.ADD_URI_SAFE_ATTR, X), N(e, "FORBID_CONTENTS") && M(e.FORBID_CONTENTS) && (J === Ot && (J = R(J)), L(J, e.FORBID_CONTENTS, X)), N(e, "ADD_FORBID_CONTENTS") && M(e.ADD_FORBID_CONTENTS) && (J === Ot && (J = R(J)), L(J, e.ADD_FORBID_CONTENTS, X)), Tt && (I["#text"] = !0), q && L(I, [
			"html",
			"head",
			"body"
		]), I.table && (L(I, ["tbody"]), delete lt.tbody), e.TRUSTED_TYPES_POLICY) {
			if (typeof e.TRUSTED_TYPES_POLICY.createHTML != "function") throw ke("TRUSTED_TYPES_POLICY configuration option must provide a \"createHTML\" hook.");
			if (typeof e.TRUSTED_TYPES_POLICY.createScriptURL != "function") throw ke("TRUSTED_TYPES_POLICY configuration option must provide a \"createScriptURL\" hook.");
			let t = x;
			x = e.TRUSTED_TYPES_POLICY;
			try {
				S = D("");
			} catch (e) {
				throw x = t, e;
			}
		} else e.TRUSTED_TYPES_POLICY === null ? (x = void 0, S = "") : (x === void 0 && (x = te()), x && typeof S == "string" && (S = D("")));
		A && A(e), Kt = e;
	}, Xt = L({}, [
		...Pe,
		...Fe,
		...Ie
	]), Zt = L({}, [...Le, ...Re]), Qt = function(e, t, n) {
		return t.namespaceURI === Y ? e === "svg" : t.namespaceURI === Nt ? e === "svg" && (n === "annotation-xml" || Bt[n]) : !!Xt[e];
	}, $t = function(e, t, n) {
		return t.namespaceURI === Y ? e === "math" : t.namespaceURI === Pt ? e === "math" && Ht[n] : !!Zt[e];
	}, en = function(e, t, n) {
		return t.namespaceURI === Pt && !Ht[n] || t.namespaceURI === Nt && !Bt[n] ? !1 : !Zt[e] && (Ut[e] || !Xt[e]);
	}, tn = function(e) {
		let t = g(e);
		(!t || !t.tagName) && (t = {
			namespaceURI: Ft,
			tagName: "template"
		});
		let n = ve(e.tagName), r = ve(t.tagName);
		return Lt[e.namespaceURI] ? e.namespaceURI === Pt ? Qt(n, t, r) : e.namespaceURI === Nt ? $t(n, t, r) : e.namespaceURI === Y ? en(n, t, r) : !!(Wt === "application/xhtml+xml" && Lt[e.namespaceURI]) : !1;
	}, Z = function(e) {
		ge(t.removed, { element: e });
		try {
			g(e).removeChild(e);
		} catch {
			if (p(e), !g(e)) throw ke("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
		}
	}, nn = function(e) {
		an(e);
		let t = h(e);
		if (t) {
			let e = [];
			pe(t, (t) => {
				ge(e, t);
			}), pe(e, (e) => {
				try {
					p(e);
				} catch {}
			});
		}
		let n = v(e);
		if (n) for (let t = n.length - 1; t >= 0; --t) {
			let r = n[t], i = r && r.name;
			if (typeof i == "string") try {
				e.removeAttribute(i);
			} catch {}
		}
	}, Q = function(e, n) {
		try {
			ge(t.removed, {
				attribute: n.getAttributeNode(e),
				from: n
			});
		} catch {
			ge(t.removed, {
				attribute: null,
				from: n
			});
		}
		if (n.removeAttribute(e), e === "is") if (yt || bt) try {
			Z(n);
		} catch {}
		else try {
			n.setAttribute(e, "");
		} catch {}
	}, rn = function(e) {
		let t = v(e);
		if (t) for (let n = t.length - 1; n >= 0; --n) {
			let r = t[n], i = r && r.name;
			if (!(typeof i != "string" || H[X(i)])) try {
				e.removeAttribute(i);
			} catch {}
		}
	}, an = function(e) {
		let t = [e];
		for (; t.length > 0;) {
			let e = t.pop();
			(y ? y(e) : e.nodeType) === B.element && rn(e);
			let n = h(e);
			if (n) for (let e = n.length - 1; e >= 0; --e) t.push(n[e]);
		}
	}, on = function(e) {
		if (!K) return;
		let t = [e];
		for (; t.length > 0;) {
			let e = t.pop(), n = y ? y(e) : e.nodeType;
			if (n === B.processingInstruction || n === B.comment && P(tt, e.data)) {
				try {
					p(e);
				} catch {}
				continue;
			}
			if (n === B.element) {
				let t = e, n = X(b ? b(e) : e.nodeName);
				try {
					t.hasAttribute && t.hasAttribute("patchsrc") && t.removeAttribute("patchsrc"), t.hasAttribute && t.hasAttribute("for") && n !== "label" && n !== "output" && t.removeAttribute("for");
				} catch {}
			}
			let r = h(e);
			if (r) for (let e = r.length - 1; e >= 0; --e) t.push(r[e]);
		}
	}, sn = function(e) {
		let t = null, r = null;
		if (vt) e = "<remove></remove>" + e;
		else {
			let t = be(e, /^[\r\n\t ]+/);
			r = t && t[0];
		}
		Wt === "application/xhtml+xml" && Ft === Y && (e = "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head></head><body>" + e + "</body></html>");
		let i = x ? D(e) : e;
		if (Ft === Y) try {
			t = new l().parseFromString(i, Wt);
		} catch {}
		if (!t || !t.documentElement) {
			t = re.createDocument(Ft, "template", null);
			try {
				t.documentElement.innerHTML = It ? S : i;
			} catch {}
		}
		let a = t.body || t.documentElement;
		return e && r && a.insertBefore(n.createTextNode(r), a.childNodes[0] || null), Ft === Y ? se.call(t, q ? "html" : "body")[0] : q ? t.documentElement : a;
	}, cn = function(e) {
		let t = ee ? ee(e) : e.ownerDocument;
		return ie.call(t || e, e, c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION, null);
	}, ln = function(e) {
		return e = xe(e, ue, " "), e = xe(e, de, " "), e = xe(e, fe, " "), e;
	}, un = function(e) {
		e.normalize();
		let t = ee ? ee(e) : e.ownerDocument, n = ie.call(t || e, e, c.SHOW_TEXT | c.SHOW_COMMENT | c.SHOW_CDATA_SECTION | c.SHOW_PROCESSING_INSTRUCTION, null), r = n.nextNode();
		for (; r;) r.data = ln(r.data), r = n.nextNode();
		let i = e.querySelectorAll?.call(e, "template");
		i && pe(i, (e) => {
			fn(e.content) && un(e.content);
		});
	}, dn = function(e) {
		let t = b ? b(e) : null;
		return typeof t != "string" || X(t) !== "form" ? !1 : typeof e.nodeName != "string" || typeof e.textContent != "string" || typeof e.removeChild != "function" || e.attributes !== v(e) || typeof e.removeAttribute != "function" || typeof e.setAttribute != "function" || typeof e.namespaceURI != "string" || typeof e.insertBefore != "function" || typeof e.hasChildNodes != "function" || e.nodeType !== y(e) || e.childNodes !== h(e);
	}, fn = function(e) {
		if (!y || typeof e != "object" || !e) return !1;
		try {
			return y(e) === B.documentFragment;
		} catch {
			return !1;
		}
	}, pn = function(e) {
		if (!y || typeof e != "object" || !e) return !1;
		try {
			return typeof y(e) == "number";
		} catch {
			return !1;
		}
	};
	function $(e, n, r) {
		e.length !== 0 && pe(e, (e) => {
			e.call(t, n, r, Kt);
		});
	}
	let mn = function(e, t) {
		return !!(K && e.hasChildNodes() && !pn(e.firstElementChild) && P(et, e.textContent) && P(et, e.innerHTML) || K && e.namespaceURI === Y && t === "style" && pn(e.firstElementChild) || e.nodeType === B.processingInstruction || K && e.nodeType === B.comment && P(tt, e.data));
	}, hn = function(e, t, n) {
		if (!lt[t] && bn(t) && (U.tagNameCheck instanceof RegExp && P(U.tagNameCheck, t) || U.tagNameCheck instanceof Function && U.tagNameCheck(t))) return !1;
		if (Tt && !J[t]) {
			let t = g(e), r = h(e);
			if (r && t) {
				let i = r.length;
				for (let a = i - 1; a >= 0; --a) {
					let i = e === n ? f(r[a], !0) : r[a];
					t.insertBefore(i, m(e));
				}
			}
		}
		return Z(e), !0;
	}, gn = function(e, t, n, r) {
		return e.length === 0 ? t : t === n || t === r ? R(t) : t;
	}, _n = function(e, n) {
		if ($(k.beforeSanitizeElements, e, null), e !== n && g(e) === null) return Et && an(e), !0;
		if (dn(e)) return Z(e), !0;
		let r = X(b ? b(e) : e.nodeName);
		if (I = gn(k.uponSanitizeElement, I, Ae, gt), $(k.uponSanitizeElement, e, {
			tagName: r,
			allowedTags: I
		}), e !== n && g(e) === null) return Et && an(e), !0;
		if (mn(e, r)) return Z(e), !0;
		if (lt[r] || !(W.tagCheck instanceof Function && W.tagCheck(r)) && !I[r]) {
			let t = hn(e, r, n);
			return t === !1 && $(k.afterSanitizeElements, e, null), t;
		}
		if ((y ? y(e) : e.nodeType) === B.element && !tn(e) || (r === "noscript" || r === "noembed" || r === "noframes") && P(nt, e.innerHTML)) return Z(e), !0;
		if (G && e.nodeType === B.text) {
			let n = ln(e.textContent);
			e.textContent !== n && (ge(t.removed, { element: e.cloneNode() }), e.textContent = n);
		}
		return $(k.afterSanitizeElements, e, null), !1;
	}, vn = function(e, t, r) {
		if (ut[t] || K && t === "patchsrc" || K && t === "for" && e !== "label" && e !== "output" || St && (t === "id" || t === "name") && (r in n || r in qt)) return !1;
		let i = H[t] || W.attributeCheck instanceof Function && W.attributeCheck(t, e);
		if (!(ft && P(we, t)) && !(dt && P(Te, t))) {
			if (!i) {
				if (!(bn(e) && (U.tagNameCheck instanceof RegExp && P(U.tagNameCheck, e) || U.tagNameCheck instanceof Function && U.tagNameCheck(e)) && (U.attributeNameCheck instanceof RegExp && P(U.attributeNameCheck, t) || U.attributeNameCheck instanceof Function && U.attributeNameCheck(t, e)) || t === "is" && U.allowCustomizedBuiltInElements && (U.tagNameCheck instanceof RegExp && P(U.tagNameCheck, r) || U.tagNameCheck instanceof Function && U.tagNameCheck(r)))) return !1;
			} else if (!jt[t] && !P(F, xe(r, De, "")) && !((t === "src" || t === "xlink:href" || t === "href") && e !== "script" && Se(r, "data:") === 0 && kt[e]) && !(pt && !P(Ee, xe(r, De, ""))) && r) return !1;
		}
		return !0;
	}, yn = L({}, [
		"annotation-xml",
		"color-profile",
		"font-face",
		"font-face-format",
		"font-face-name",
		"font-face-src",
		"font-face-uri",
		"missing-glyph"
	]), bn = function(e) {
		return !yn[ve(e)] && P(Oe, e);
	}, xn = function(e, t, n, r) {
		if (x && typeof u == "object" && typeof u.getAttributeType == "function" && !n) switch (u.getAttributeType(e, t)) {
			case "TrustedHTML": return D(r);
			case "TrustedScriptURL": return O(r);
		}
		return r;
	}, Sn = function(e, n, r, i) {
		try {
			r ? e.setAttributeNS(r, n, i) : e.setAttribute(n, i), dn(e) ? Z(e) : he(t.removed);
		} catch {
			Q(n, e);
		}
	}, Cn = function(e) {
		$(k.beforeSanitizeAttributes, e, null);
		let t = e.attributes;
		if (!t || dn(e)) return;
		H = gn(k.uponSanitizeAttribute, H, ct, _t);
		let n = {
			attrName: "",
			attrValue: "",
			keepAttr: !0,
			allowedAttributes: H,
			forceKeepAttr: void 0
		}, r = t.length, i = X(e.nodeName);
		for (; r--;) {
			let a = t[r], o = a.name, s = a.namespaceURI, c = a.value, l = X(o), u = c, d = o === "value" ? u : Ce(u);
			if (n.attrName = l, n.attrValue = d, n.keepAttr = !0, n.forceKeepAttr = void 0, $(k.uponSanitizeAttribute, e, n), d = n.attrValue, Ct && (l === "id" || l === "name") && Se(d, wt) !== 0 && (Q(o, e), d = wt + d), K && P(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, d)) {
				Q(o, e);
				continue;
			}
			if (l === "attributename" && be(d, "href")) {
				Q(o, e);
				continue;
			}
			if (!n.forceKeepAttr) {
				if (!n.keepAttr) {
					Q(o, e);
					continue;
				}
				if (!mt && P(rt, d)) {
					Q(o, e);
					continue;
				}
				if (G && (d = ln(d)), !vn(i, l, d)) {
					Q(o, e);
					continue;
				}
				d = xn(i, l, s, d), d !== u && Sn(e, o, s, d);
			}
		}
		$(k.afterSanitizeAttributes, e, null);
	}, wn = function(e) {
		let t = null, n = cn(e);
		for ($(k.beforeSanitizeShadowDOM, e, null); t = n.nextNode();) if ($(k.uponSanitizeShadowNode, t, null), _n(t, e), Cn(t), fn(t.content) && wn(t.content), (y ? y(t) : t.nodeType) === B.element) {
			let e = _(t);
			fn(e) && (Tn(e), wn(e));
		}
		$(k.afterSanitizeShadowDOM, e, null);
	}, Tn = function(e) {
		let t = [{
			node: e,
			shadow: null
		}];
		for (; t.length > 0;) {
			let e = t.pop();
			if (e.shadow) {
				wn(e.shadow);
				continue;
			}
			let n = e.node, r = (y ? y(n) : n.nodeType) === B.element, i = h(n);
			if (i) for (let e = i.length - 1; e >= 0; --e) t.push({
				node: i[e],
				shadow: null
			});
			if (r) {
				let e = b ? b(n) : null;
				if (typeof e == "string" && X(e) === "template") {
					let e = n.content;
					fn(e) && t.push({
						node: e,
						shadow: null
					});
				}
			}
			if (r) {
				let e = _(n);
				fn(e) && t.push({
					node: null,
					shadow: e
				}, {
					node: e,
					shadow: null
				});
			}
		}
	};
	return t.sanitize = function(e) {
		let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = null, a = null, o = null, s = null;
		if (It = !e, It && (e = "<!-->"), typeof e != "string" && !pn(e) && (e = je(e), typeof e != "string")) throw ke("dirty is not a string, aborting");
		if (!t.isSupported) return e;
		ht ? (I = gt, H = _t) : Yt(n), (k.uponSanitizeElement.length > 0 || k.uponSanitizeAttribute.length > 0) && (I = R(I)), k.uponSanitizeAttribute.length > 0 && (H = R(H)), t.removed = [];
		let c = Et && typeof e != "string" && pn(e);
		if (c) {
			on(e);
			let t = b ? b(e) : e.nodeName;
			if (typeof t == "string") {
				let n = X(t);
				if (!I[n] || lt[n]) throw nn(e), ke("root node is forbidden and cannot be sanitized in-place");
			}
			if (dn(e)) throw nn(e), ke("root node is clobbered and cannot be sanitized in-place");
			try {
				Tn(e);
			} catch (t) {
				throw nn(e), t;
			}
		} else if (pn(e)) i = sn("<!---->"), a = i.ownerDocument.importNode(e, !0), a.nodeType === B.element && a.nodeName === "BODY" || a.nodeName === "HTML" ? i = a : i.appendChild(a), Tn(a);
		else {
			if (!yt && !G && !q && e.indexOf("<") === -1) return x && xt ? D(e) : e;
			if (i = sn(e), !i) return yt ? null : xt ? S : "";
		}
		i && vt && Z(i.firstChild);
		let l = c ? e : i;
		try {
			let e = cn(l);
			for (; o = e.nextNode();) _n(o, l), Cn(o), fn(o.content) && wn(o.content);
		} catch (n) {
			throw c && (nn(e), pe(t.removed, (e) => {
				e.element && an(e.element);
			})), n;
		}
		if (c) return pe(t.removed, (e) => {
			e.element && an(e.element);
		}), G && un(e), e;
		if (yt) {
			if (G && un(i), bt) for (s = oe.call(i.ownerDocument); i.firstChild;) s.appendChild(i.firstChild);
			else s = i;
			return (H.shadowroot || H.shadowrootmode) && (s = ce.call(r, s, !0)), s;
		}
		let u = q ? i.outerHTML : i.innerHTML;
		return q && I["!doctype"] && i.ownerDocument && i.ownerDocument.doctype && i.ownerDocument.doctype.name && P(Qe, i.ownerDocument.doctype.name) && (u = "<!DOCTYPE " + i.ownerDocument.doctype.name + ">\n" + u), G && (u = ln(u)), x && xt ? D(u) : u;
	}, t.setConfig = function() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		Yt(e), ht = !0, gt = I, _t = H;
	}, t.clearConfig = function() {
		Kt = null, ht = !1, gt = null, _t = null, x = C, S = "";
	}, t.isValidAttribute = function(e, t, n) {
		Kt || Yt({});
		let r = X(e), i = X(t);
		return vn(r, i, n);
	}, t.addHook = function(e, t) {
		typeof t == "function" && N(k, e) && ge(k[e], t);
	}, t.removeHook = function(e, t) {
		if (N(k, e)) {
			if (t !== void 0) {
				let n = me(k[e], t);
				return n === -1 ? void 0 : _e(k[e], n, 1)[0];
			}
			return he(k[e]);
		}
	}, t.removeHooks = function(e) {
		N(k, e) && (k[e] = []);
	}, t.removeAllHooks = function() {
		k = ot();
	}, t;
}
var H = st(), ct = /* @__PURE__ */ t(((e, t) => {
	function n() {
		this.__highest_alphabet__ = 0, this.__match_alphabets__ = {}, this.__initial_state__ = 0, this.__accept_states__ = {}, this.__transitions__ = {}, this.__actions__ = {};
	}
	n.prototype.set_highest_alphabet = function(e) {
		this.__highest_alphabet__ = e;
	}, n.prototype.set_match_alphabets = function(e) {
		this.__match_alphabets__ = e;
	}, n.prototype.set_initial_state = function(e) {
		this.__initial_state__ = e;
	}, n.prototype.set_accept_states = function(e) {
		for (var t = 0; t < e.length; t++) this.__accept_states__[e[t]] = !0;
	}, n.prototype.set_transitions = function(e) {
		this.__transitions__ = e;
	}, n.prototype.set_actions = function(e) {
		this.__actions__ = e;
	}, n.prototype.update_transition = function(e, t) {
		this.__transitions__[e] = Object.assign(this.__transitions__[e] || {}, t);
	}, n.prototype.execute = function(e, t) {
		var n, r, i;
		for (n = this.__initial_state__, r = e; n && r < t; r++) {
			for (i = this.__highest_alphabet__; i > 0 && !(n & i && this.__match_alphabets__[i].call(this, r, n, i)); i >>= 4);
			if (this.__actions__(r, n, i), i === 0) break;
			n = this.__transitions__[n][i] || 0;
		}
		return !!this.__accept_states__[n];
	}, t.exports = n;
})), U = /* @__PURE__ */ e((/* @__PURE__ */ t(((e, t) => {
	var n = ct();
	t.exports = function(e, t) {
		t = e.utils.assign({}, {
			multiline: !1,
			rowspan: !1,
			headerless: !1,
			multibody: !0,
			autolabel: !0
		}, t || {});
		function r(e, t) {
			var n = e.bMarks[t] + e.sCount[t], r = e.bMarks[t] + e.blkIndent, i = e.skipSpacesBack(e.eMarks[t], r), a = [], o, s, c = !1, l = !1, u = 0;
			for (o = n; o < i; o++) switch (e.src.charCodeAt(o)) {
				case 92:
					c = !0;
					break;
				case 96:
					s = e.skipChars(o, 96) - 1, s > o ? (l || (u === 0 ? u = s - o : u === s - o && (u = 0)), o = s) : (l || !c && !u) && (l = !l), c = !1;
					break;
				case 124:
					!l && !c && a.push(o), c = !1;
					break;
				default: c = !1;
			}
			return a.length === 0 ? a : (a[0] > r && a.unshift(r - 1), a[a.length - 1] < i - 1 && a.push(i), a);
		}
		function i(e, n, r) {
			var i = {
				text: null,
				label: null
			}, a = e.bMarks[r] + e.sCount[r], o = e.eMarks[r], s = e.src.slice(a, o).match(/^\[(.+?)\](\[([^\[\]]+)\])?\s*$/);
			return s ? n ? !0 : (i.text = s[1], !t.autolabel && !s[2] ? i : (i.label = s[2] || s[1], i.label = i.label.toLowerCase().replace(/\W+/g, ""), i)) : !1;
		}
		function a(e, n, i) {
			var a = {
				bounds: null,
				multiline: null
			}, o = r(e, i), s, c, l;
			return o.length < 2 ? !1 : n ? !0 : (a.bounds = o, t.multiline && (s = e.bMarks[i] + e.sCount[i], c = e.eMarks[i] - 1, a.multiline = e.src.charCodeAt(c) === 92, a.multiline && (l = e.eMarks[i], e.eMarks[i] = e.skipSpacesBack(c, s), a.bounds = r(e, i), e.eMarks[i] = l)), a);
		}
		function o(e, t, n) {
			var i = {
				aligns: [],
				wraps: []
			}, a = r(e, n), o = /^:?(-+|=+):?\+?$/, s, c, l;
			if (e.sCount[n] - e.blkIndent >= 4 || a.length === 0) return !1;
			for (s = 0; s < a.length - 1; s++) {
				if (c = e.src.slice(a[s] + 1, a[s + 1]).trim(), !o.test(c)) return !1;
				switch (i.wraps.push(c.charCodeAt(c.length - 1) === 43), l = (c.charCodeAt(0) === 58) << 4 | c.charCodeAt(c.length - 1 - i.wraps[s]) === 58, l) {
					case 0:
						i.aligns.push("");
						break;
					case 1:
						i.aligns.push("right");
						break;
					case 16:
						i.aligns.push("left");
						break;
					case 17: i.aligns.push("center");
				}
			}
			return t ? !0 : i;
		}
		function s(e, t, n) {
			return e.isEmpty(n);
		}
		function c(e, r, c, l) {
			var u = new n(), d = 16, f = -1, p, m, h, g, _, v, y = [], b, ee, x, S, C, w, T, E, D, O;
			if (r + 2 > c || (m = new e.Token("table_open", "table", 1), m.meta = {
				sep: null,
				cap: null,
				tr: []
			}, u.set_highest_alphabet(65536), u.set_initial_state(65792), u.set_accept_states([
				65552,
				65553,
				0
			]), u.set_match_alphabets({
				65536: i.bind(this, e, !0),
				4096: o.bind(this, e, !0),
				256: a.bind(this, e, !0),
				16: a.bind(this, e, !0),
				1: s.bind(this, e, !0)
			}), u.set_transitions({
				65792: {
					65536: 256,
					256: 4352
				},
				256: { 256: 4352 },
				4352: {
					4096: 65552,
					256: 4352
				},
				65552: {
					65536: 0,
					16: 65553
				},
				65553: {
					65536: 0,
					16: 65553,
					1: 65552
				}
			}), t.headerless && (u.set_initial_state(69888), u.update_transition(69888, {
				65536: 4352,
				4096: 65552,
				256: 4352
			}), h = new e.Token("tr_placeholder", "tr", 0), h.meta = {}), t.multibody || u.update_transition(65552, {
				65536: 0,
				16: 65552
			}), u.set_actions(function(n, s, c) {
				switch (c) {
					case 65536:
						if (m.meta.cap) break;
						m.meta.cap = i(e, !1, n), m.meta.cap.map = [n, n + 1], m.meta.cap.first = n === r;
						break;
					case 4096:
						m.meta.sep = o(e, !1, n), m.meta.sep.map = [n, n + 1], h.meta.grp |= 1, d = 16;
						break;
					case 256:
					case 16:
						h = new e.Token("tr_open", "tr", 1), h.map = [n, n + 1], h.meta = a(e, !1, n), h.meta.type = c, h.meta.grp = d, d = 0, m.meta.tr.push(h), t.multiline && (h.meta.multiline && f < 0 ? f = m.meta.tr.length - 1 : !h.meta.multiline && f >= 0 && (p = m.meta.tr[f], p.meta.mbounds = m.meta.tr.slice(f).map(function(e) {
							return e.meta.bounds;
						}), p.map[1] = h.map[1], m.meta.tr = m.meta.tr.slice(0, f + 1), f = -1));
						break;
					case 1: h.meta.grp |= 1, d = 16;
				}
			}), u.execute(r, c) === !1) || !m.meta.tr.length) return !1;
			if (l) return !0;
			if (m.meta.tr[m.meta.tr.length - 1].meta.grp |= 1, m.map = b = [r, 0], m.block = !0, m.level = e.level++, e.tokens.push(m), m.meta.cap) {
				p = e.push("caption_open", "caption", 1), p.map = m.meta.cap.map;
				var te = [], ne = m.meta.cap.first ? "top" : "bottom";
				m.meta.cap.label !== null && te.push(["id", m.meta.cap.label]), ne !== "top" && te.push(["style", "caption-side: " + ne]), p.attrs = te, p = e.push("inline", "", 0), p.content = m.meta.cap.text, p.map = m.meta.cap.map, p.children = [], p = e.push("caption_close", "caption", -1);
			}
			for (w = 0; w < m.meta.tr.length; w++) {
				for (_ = new e.Token("td_th_placeholder", "", 0), h = m.meta.tr[w], h.meta.grp & 16 && (x = h.meta.type === 256 ? "thead" : "tbody", p = e.push(x + "_open", x, 1), p.map = ee = [h.map[0], 0], y = []), h.block = !0, h.level = e.level++, e.tokens.push(h), T = 0; T < h.meta.bounds.length - 1; T++) {
					if (C = [h.meta.bounds[T] + 1, h.meta.bounds[T + 1]], S = e.src.slice.apply(e.src, C), S === "") {
						g = _.attrGet("colspan"), _.attrSet("colspan", g === null ? 2 : g + 1);
						continue;
					}
					if (t.rowspan && y[T] && S.trim() === "^^") {
						v = y[T].attrGet("rowspan"), y[T].attrSet("rowspan", v === null ? 2 : v + 1), _ = new e.Token("td_th_placeholder", "", 0);
						continue;
					}
					if (x = h.meta.type === 256 ? "th" : "td", p = e.push(x + "_open", x, 1), p.map = h.map, p.attrs = [], m.meta.sep.aligns[T] && p.attrs.push(["style", "text-align:" + m.meta.sep.aligns[T]]), m.meta.sep.wraps[T] && p.attrs.push(["class", "extend"]), _ = y[T] = p, t.multiline && h.meta.multiline && h.meta.mbounds) {
						for (S = Array(h.map[0]).fill("").concat([S.trimRight()]), E = 1; E < h.meta.mbounds.length; E++) T > h.meta.mbounds[E].length - 2 || (C = [h.meta.mbounds[E][T] + 1, h.meta.mbounds[E][T + 1]], S.push(e.src.slice.apply(e.src, C).trimRight()));
						for (O = new e.md.block.State(S.join("\n"), e.md, e.env, []), O.level = h.level + 1, e.md.block.tokenize(O, h.map[0], O.lineMax), D = 0; D < O.tokens.length; D++) e.tokens.push(O.tokens[D]);
					} else p = e.push("inline", "", 0), p.content = S.trim(), p.map = h.map, p.level = h.level + 1, p.children = [];
					p = e.push(x + "_close", x, -1);
				}
				e.push("tr_close", "tr", -1), h.meta.grp & 1 && (x = h.meta.type === 256 ? "thead" : "tbody", p = e.push(x + "_close", x, -1), ee[1] = h.map[1]);
			}
			return b[1] = Math.max(ee[1], m.meta.sep.map[1], m.meta.cap ? m.meta.cap.map[1] : -1), p = e.push("table_close", "table", -1), e.line = b[1], !0;
		}
		e.block.ruler.at("table", c, { alt: ["paragraph", "reference"] });
	};
})))(), 1);
function lt(e, t) {
	return typeof e.utils.assign != "function" && (e.utils.assign = Object.assign), (0, U.default)(e, t);
}
var ut = /* @__PURE__ */ "a.abbr.acronym.b.blockquote.br.code.del.div.em.hr.i.li.ol.strong.u.ul.p.pre.span.table.tbody.thead.tr.td.th.h1.h2.h3.h4.h5.h6".split("."), W = {
	a: [
		"href",
		"title",
		"class"
	],
	abbr: ["title"],
	acronym: ["title"],
	table: ["width"],
	td: ["width", "align"],
	div: ["class"],
	p: ["class"],
	span: ["class", "title"]
}, dt = [...new Set(Object.values(W).flat())], ft = new r({
	html: !0,
	linkify: !0,
	breaks: !0
}).use(lt), pt = new r({
	html: !1,
	linkify: !0,
	breaks: !0
}).use(lt), mt = {
	ALLOWED_TAGS: ut,
	ALLOWED_ATTR: dt,
	ALLOW_DATA_ATTR: !1,
	ALLOW_UNKNOWN_PROTOCOLS: !1,
	ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):[\s\S]*|(?![a-z][a-z0-9+.-]*:)[\s\S]*)$/i
}, G = null, K = !1, q = !1;
function ht(e) {
	K || (K = !0, e.addHook("uponSanitizeAttribute", (e, t) => {
		let n = e.tagName.toLowerCase(), r = t.attrName.toLowerCase();
		W[n]?.includes(r) || (t.keepAttr = !1);
	}));
}
function gt(e) {
	q || (q = !0, e.addHook("afterSanitizeAttributes", (e) => {
		if (!e || e.tagName !== "A") return;
		let t = e.getAttribute("href");
		if (t && /^https?:\/\//i.test(t)) {
			e.setAttribute("target", "_blank");
			let t = (e.getAttribute("rel") || "").split(/\s+/).filter(Boolean), n = new Set(t);
			n.add("noopener"), n.add("noreferrer"), n.add("nofollow"), e.setAttribute("rel", Array.from(n).join(" "));
		}
	}));
}
function _t() {
	return typeof window > "u" ? null : (G || (G = H(window), ht(G), gt(G)), G);
}
function vt(e) {
	if (!e) return "";
	let t = typeof window > "u" ? pt : ft, n;
	try {
		n = t.render(String(e));
	} catch {
		return "";
	}
	let r = _t();
	return r ? r.sanitize(n, mt) : n;
}
//#endregion
//#region src/components/ExportDropdown.vue?vue&type=template&lang.js
var yt = {
	class: "c-export-dropdown",
	ref: "dropdown"
}, bt = ["aria-label"], xt = {
	key: 0,
	class: "exporter-divider"
}, St = ["href", "onMouseover"], Ct = {
	key: 0,
	class: "exporter-icon"
}, wt = ["innerHTML"], Tt = { class: "exporter-name" }, Et = ["innerHTML"];
function Dt(e, t, n, r, a, o) {
	return y(), s("div", yt, [
		u("button", {
			class: E(["export-toggle", { disabled: n.disabled }]),
			onClick: t[0] ||= (...e) => o.toggle && o.toggle(...e),
			"aria-label": n.disabled ? o.resolvedDisabledHint : void 0
		}, [t[2] ||= u("svg", {
			class: "export-icon",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2"
		}, [
			u("path", { d: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" }),
			u("polyline", { points: "7 10 12 15 17 10" }),
			u("line", {
				x1: "12",
				y1: "15",
				x2: "12",
				y2: "3"
			})
		], -1), m(" " + T(o.t.exports), 1)], 10, bt),
		a.isOpen ? (y(), s("div", {
			key: 0,
			class: "exporter-menu",
			style: p(a.menuStyle)
		}, [(y(!0), s(i, null, w(o.exportOptions, (e, n) => (y(), s(i, { key: e.divider ? `div-${n}` : e.id }, [e.divider ? (y(), s("div", xt)) : (y(), s("a", {
			key: 1,
			class: "exporter-item",
			href: e.url,
			target: "_blank",
			onMouseover: (t) => o.onItemHover(t, e),
			onMouseleave: t[1] ||= (e) => a.hoveredOption = null
		}, [e.icon ? (y(), s("span", Ct, [(y(), s("svg", {
			class: "tb-icon",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2",
			innerHTML: o.faIconSvg(e.icon)
		}, null, 8, wt))])) : d("", !0), u("span", Tt, T(e.label), 1)], 40, St))], 64))), 128))], 4)) : d("", !0),
		a.hoveredOption && a.hoveredOption.qrcode_svg ? (y(), s("div", {
			key: 1,
			class: "qr-hover",
			style: p(a.qrStyle),
			innerHTML: a.hoveredOption.qrcode_svg
		}, null, 12, Et)) : d("", !0)
	], 512);
}
//#endregion
//#region src/components/ExportDropdown.vue?vue&type=style&index=0&inline&lang.stylus
var J = ".c-export-dropdown{z-index:100;display:inline-block;position:relative}.c-export-dropdown .export-toggle{cursor:pointer;background:0 0;border:none;border-radius:2px;align-items:center;gap:4px;height:32px;padding:0 10px;font-size:14px;display:flex}.c-export-dropdown .export-toggle:hover{background-color:#0000000d}.c-export-dropdown .export-toggle.disabled{opacity:.5;cursor:not-allowed}.c-export-dropdown .export-toggle.disabled[aria-label]{position:relative}.c-export-dropdown .export-toggle.disabled[aria-label]:after{content:attr(aria-label);opacity:0;pointer-events:none;color:#fff;white-space:normal;z-index:1000;background-color:#000000de;border-radius:4px;width:max-content;max-width:280px;padding:6px 8px;font-size:12px;line-height:1.3;position:absolute;top:calc(100% + 6px);right:0;transform:translateY(-2px)}.c-export-dropdown .export-toggle.disabled[aria-label]:hover:after,.c-export-dropdown .export-toggle.disabled[aria-label]:focus-visible:after{opacity:1;transition:opacity 50ms,transform 50ms;transform:translateY(0)}.c-export-dropdown .export-toggle.disabled:hover{background-color:#0000}.c-export-dropdown .export-icon{width:16px;height:16px}.c-export-dropdown .exporter-menu{z-index:10000;white-space:nowrap;background:#fff;border-radius:4px;min-width:280px;padding:4px 0;position:fixed;box-shadow:0 4px 16px #00000026}.c-export-dropdown .exporter-divider{background:#e0e0e0;height:1px;margin:4px 0}.c-export-dropdown .exporter-item{color:#333;align-items:center;gap:8px;padding:6px 12px;text-decoration:none;display:flex;position:relative}.c-export-dropdown .exporter-item:hover{background-color:#f5f5f5}.c-export-dropdown .exporter-item .exporter-icon{text-align:center;width:20px}.c-export-dropdown .exporter-item .exporter-icon .tb-icon{width:16px;height:16px}.c-export-dropdown .qr-hover{z-index:10001;pointer-events:none;background:#fff;border:1px solid #ddd;border-radius:4px;padding:8px;position:fixed;box-shadow:2px 2px 8px #0000001a}.c-export-dropdown .qr-hover svg{width:128px;height:128px;display:block}.c-export-dropdown .fade-enter-active,.c-export-dropdown .fade-leave-active{transition:opacity .3s}.c-export-dropdown .fade-enter-from,.c-export-dropdown .fade-leave-to{opacity:0}", Ot = {
	"fa-calendar": "<rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"/><line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"/><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"/><line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"/>",
	"fa-code": "<polyline points=\"16 18 22 12 16 6\"/><polyline points=\"8 6 2 12 8 18\"/>",
	"fa-google": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 8v8\"/><path d=\"M8 12h8\"/>",
	"fa-star": "<polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/>"
}, kt = /*#__PURE__*/ a({
	name: "ExportDropdown",
	inject: { translationMessages: { default: () => ({}) } },
	props: {
		options: {
			type: Array,
			default: () => []
		},
		qrcodesUrl: {
			type: String,
			default: ""
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		disabledHint: {
			type: String,
			default: ""
		}
	},
	emits: ["export"],
	data() {
		return {
			isOpen: !1,
			hoveredOption: null,
			loadedQrcodes: !1,
			loadingQrcodes: !1,
			qrcodes: {},
			menuStyle: {},
			qrStyle: {}
		};
	},
	watch: { qrcodesUrl() {
		this.loadedQrcodes = !1, this.loadingQrcodes = !1, this.qrcodes = {}, this.hoveredOption = null;
	} },
	computed: {
		t() {
			let e = this.translationMessages || {};
			return {
				exports: e.exports || "Exports",
				public_schedule_only: e.public_schedule_only || "Only available on the public schedule once a schedule is released and public."
			};
		},
		resolvedDisabledHint() {
			return this.disabledHint || this.t.public_schedule_only;
		},
		exportOptions() {
			let e = this.qrcodes || {};
			return (this.options || []).map((t) => !t || t.divider || t.qrcode_svg ? t : t.id && e[t.id] ? {
				...t,
				qrcode_svg: e[t.id]
			} : t);
		}
	},
	mounted() {
		document.addEventListener("click", this.outsideClick);
	},
	beforeUnmount() {
		document.removeEventListener("click", this.outsideClick);
	},
	methods: {
		faIconSvg(e) {
			return e ? Ot[e] || "<circle cx=\"12\" cy=\"12\" r=\"10\"/>" : "";
		},
		toggle() {
			this.disabled || (this.isOpen = !this.isOpen, this.isOpen ? (this.ensureQrcodesLoaded(), this.$nextTick(() => this.positionMenu())) : this.hoveredOption = null);
		},
		async ensureQrcodesLoaded() {
			if (!this.loadedQrcodes && this.qrcodesUrl && !this.loadingQrcodes) {
				this.loadingQrcodes = !0;
				try {
					let e = await fetch(this.qrcodesUrl);
					if (!e.ok) return;
					let t = await e.json();
					this.qrcodes = t?.qrcodes || {}, this.loadedQrcodes = !0;
				} catch {} finally {
					this.loadingQrcodes = !1;
				}
			}
		},
		positionMenu() {
			let e = this.$refs.dropdown;
			if (!e) return;
			let t = e.getBoundingClientRect();
			this.menuStyle = {
				position: "fixed",
				top: `${t.bottom + 2}px`,
				right: `${window.innerWidth - t.right}px`
			};
		},
		onItemHover(e, t) {
			if (this.hoveredOption = t, !t.qrcode_svg) return;
			let n = e.currentTarget.getBoundingClientRect(), r = n.left - 148 - 4;
			r < 0 && (r = n.right + 4), this.qrStyle = {
				position: "fixed",
				top: `${n.top}px`,
				left: `${r}px`
			};
		},
		outsideClick(e) {
			e.composedPath().includes(this.$refs.dropdown) || (this.isOpen = !1);
		}
	}
}, [["render", Dt], ["styles", [J]]]), At = { class: "card-content" }, jt = { class: "facts" }, Mt = { class: "time" }, Nt = {
	key: 0,
	class: "ampm"
}, Pt = {
	key: 0,
	class: "room"
}, Y = { class: "text-content" }, Ft = ["innerHTML"], It = {
	key: 1,
	class: "field-section"
}, Lt = ["innerHTML"], Rt = {
	key: 2,
	class: "field-section"
}, zt = ["innerHTML"], Bt = { class: "video-embed" }, Vt = ["src"], Ht = {
	key: 0,
	class: "video-embed"
}, Ut = ["src"], Wt = ["href"], Gt = { class: "field-heading" }, X = ["innerHTML"], Kt = { class: "field-heading" }, qt = {
	key: 0,
	class: "field-content"
}, Jt = ["href"], Yt = ["innerHTML"], Xt = { class: "answers" }, Zt = {
	key: 0,
	class: "icon-group"
}, Qt = ["href"], $t = ["src", "alt"], en = { key: 1 }, tn = {
	key: 0,
	class: "question"
}, Z = ["href"], nn = { class: "question" }, Q = {
	key: 0,
	class: "answer"
}, rn = ["href"], an = { key: 1 }, on = {
	key: 1,
	class: "answer"
}, sn = ["innerHTML"], cn = {
	key: 3,
	class: "answer"
}, ln = {
	key: 4,
	class: "downloads"
}, un = ["href"], dn = {
	class: "download-icon",
	viewBox: "0 0 24 24",
	width: "16",
	height: "16",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": "2",
	"stroke-linecap": "round",
	"stroke-linejoin": "round",
	style: {
		"margin-right": "6px",
		"flex-shrink": "0",
		opacity: "0.7"
	}
}, fn = { class: "filename" }, pn = ["href"], $ = {
	key: 0,
	class: "speakers"
}, mn = ["onClick", "href"], hn = { class: "img-wrapper" }, gn = ["src", "alt"], _n = {
	key: 1,
	class: "avatar-placeholder"
}, vn = { class: "inner-card-content" }, yn = ["innerHTML"], bn = { class: "speaker-details" }, xn = { class: "speaker-header" }, Sn = { class: "speaker-avatar" }, Cn = ["src", "alt"], wn = {
	key: 1,
	class: "avatar-placeholder"
}, Tn = { class: "speaker-title" }, En = { class: "speaker-content card-content" }, Dn = ["innerHTML"], On = {
	key: 0,
	class: "answers"
}, kn = {
	key: 0,
	class: "icon-group"
}, An = ["href"], jn = ["src", "alt"], Mn = { key: 1 }, Nn = {
	key: 0,
	class: "question"
}, Pn = ["href"], Fn = { class: "question" }, In = {
	key: 0,
	class: "answer"
}, Ln = ["href"], Rn = { key: 1 }, zn = {
	key: 1,
	class: "answer"
}, Bn = ["innerHTML"], Vn = {
	key: 3,
	class: "answer"
}, Hn = { class: "speaker-sessions" };
function Un(e, t, n, r, a, o) {
	let f = h("fav-button"), g = h("export-dropdown"), _ = h("bunt-progress-circular"), v = h("session");
	return y(), s("dialog", {
		class: "pretalx-modal",
		id: "session-modal",
		ref: "modal",
		onClick: t[4] ||= c((e) => o.close(), ["stop"])
	}, [u("div", {
		class: "dialog-inner",
		onClick: t[3] ||= c(() => {}, ["stop"])
	}, [
		u("button", {
			class: "close-button",
			onClick: t[0] ||= (e) => o.close()
		}, "✕"),
		n.modalContent && n.modalContent.contentType === "session" ? (y(), s(i, { key: 0 }, [
			u("h3", null, [m(T(n.modalContent.contentObject.title), 1), o.favsReadOnly ? d("", !0) : (y(), s("div", {
				key: 0,
				class: E(["button-container", o.isFaved ? "faved" : ""])
			}, [C(f, { onToggleFav: t[1] ||= (t) => e.$emit("toggleFav", n.modalContent.contentObject.id) })], 2))]),
			u("div", At, [u("div", jt, [
				u("div", Mt, [u("span", null, T(n.modalContent.contentObject.start.clone().tz(n.currentTimezone).format("dddd, D MMMM")) + ", " + T(a.getSessionTime(n.modalContent.contentObject, n.currentTimezone, n.locale, n.hasAmPm).time), 1), a.getSessionTime(n.modalContent.contentObject, n.currentTimezone, n.locale, n.hasAmPm).ampm ? (y(), s("span", Nt, T(a.getSessionTime(n.modalContent.contentObject, n.currentTimezone, n.locale, n.hasAmPm).ampm), 1)) : d("", !0)]),
				n.modalContent.contentObject.room ? (y(), s("div", Pt, T(a.getLocalizedString(n.modalContent.contentObject.room.name)), 1)) : d("", !0),
				n.modalContent.contentObject.track ? (y(), s("div", {
					key: 1,
					class: "track",
					style: p({ color: n.modalContent.contentObject.track.color })
				}, T(a.getLocalizedString(n.modalContent.contentObject.track.name)), 5)) : d("", !0),
				o.talkExportOptions.length || o.exportsDisabled ? (y(), l(g, {
					key: 2,
					class: "session-export-area",
					options: o.talkExportOptions,
					qrcodesUrl: o.talkQrcodesUrl,
					disabled: o.exportsDisabled
				}, null, 8, [
					"options",
					"qrcodesUrl",
					"disabled"
				])) : d("", !0)
			]), u("div", Y, [
				n.modalContent.contentObject.recording_iframe ? (y(), s("div", {
					key: 0,
					class: "recording-embed",
					innerHTML: n.modalContent.contentObject.recording_iframe
				}, null, 8, Ft)) : d("", !0),
				n.modalContent.contentObject.abstract ? (y(), s("div", It, [t[5] ||= u("h4", { class: "field-heading" }, "Abstract", -1), u("div", {
					class: "field-content",
					innerHTML: o.renderRichText(n.modalContent.contentObject.abstract)
				}, null, 8, Lt)])) : d("", !0),
				n.modalContent.contentObject.apiContent?.description?.length > 0 || n.modalContent.contentObject.description?.length > 0 ? (y(), s("div", Rt, [t[6] ||= u("h4", { class: "field-heading" }, "Description", -1), u("div", {
					class: "field-content",
					innerHTML: o.renderRichText(n.modalContent.contentObject.apiContent?.description || n.modalContent.contentObject.description)
				}, null, 8, zt)])) : d("", !0),
				(y(!0), s(i, null, w(o.videoAnswers, (e, t) => (y(), s("div", {
					class: "field-section video-embed-section",
					key: "api-video-" + t + "-" + o.videoEmbedSrc(e)
				}, [u("div", Bt, [u("iframe", {
					src: o.videoEmbedSrc(e),
					title: "Session video",
					allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
					allowfullscreen: "",
					loading: "lazy",
					referrerpolicy: "strict-origin-when-cross-origin"
				}, null, 8, Vt)])]))), 128)),
				n.modalContent.contentObject.isLoading ? (y(), l(_, {
					key: 3,
					size: "big",
					page: !0
				})) : (y(), s(i, { key: 4 }, [
					o.publicVideoScheduleAnswers.length > 0 ? (y(!0), s(i, { key: 0 }, w(o.publicVideoScheduleAnswers, (e, t) => (y(), s("div", {
						class: "field-section video-embed-section",
						key: "video-" + e.question_id + "-" + t + "-" + o.videoEmbedSrc(e)
					}, [o.videoEmbedSrc(e) ? (y(), s("div", Ht, [u("iframe", {
						src: o.videoEmbedSrc(e),
						title: "Session video",
						allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
						allowfullscreen: "",
						loading: "lazy",
						referrerpolicy: "strict-origin-when-cross-origin"
					}, null, 8, Ut)])) : e.answer ? (y(), s("a", {
						key: 1,
						href: e.answer,
						target: "_blank",
						rel: "noopener noreferrer"
					}, T(e.answer), 9, Wt)) : d("", !0)]))), 128)) : d("", !0),
					o.textAnswers.length > 0 ? (y(!0), s(i, { key: 1 }, w(o.textAnswers, (e) => (y(), s("div", {
						class: "field-section",
						key: e.id || e.question_id
					}, [u("h4", Gt, T(a.getLocalizedString(e.question.question)), 1), u("div", {
						class: "field-content",
						innerHTML: o.renderRichText(e.answer)
					}, null, 8, X)]))), 128)) : d("", !0),
					o.publicOtherScheduleAnswers.length > 0 ? (y(!0), s(i, { key: 2 }, w(o.publicOtherScheduleAnswers, (e) => (y(), s("div", {
						class: "field-section",
						key: e.question_id
					}, [u("h4", Kt, T(e.question), 1), e.variant === "url" ? (y(), s("div", qt, [u("a", {
						href: e.answer,
						target: "_blank",
						rel: "noopener noreferrer"
					}, T(e.answer), 9, Jt)])) : (y(), s("div", {
						key: 1,
						class: "field-content",
						innerHTML: o.renderRichText(e.answer)
					}, null, 8, Yt))]))), 128)) : d("", !0),
					o.shortAnswers.length > 0 || o.iconAnswers.length > 0 ? (y(), s(i, { key: 3 }, [t[8] ||= u("hr", null, null, -1), u("div", Xt, [o.iconAnswers.length > 0 ? (y(), s("div", Zt, [(y(!0), s(i, null, w(o.iconAnswers, (e) => (y(), s("div", {
						class: "icon-link",
						key: e.id
					}, [u("a", {
						href: e.answer,
						target: "_blank",
						rel: "noopener noreferrer"
					}, [e.question.icon && o.remoteApiUrl ? (y(), s("img", {
						key: 0,
						src: `${o.remoteApiUrl}questions/${e.question.id}/icon/`,
						alt: a.getLocalizedString(e.question.question),
						width: "16",
						height: "16"
					}, null, 8, $t)) : (y(), s("span", en, T(a.getLocalizedString(e.question.question)), 1))], 8, Qt)]))), 128))])) : d("", !0), (y(!0), s(i, null, w(o.shortAnswers, (e) => (y(), s("div", {
						class: "inline-answer",
						key: e.id
					}, [(e.question.variant === "url" || e.question.variant === "video") && e.answer ? (y(), s("strong", tn, [u("a", {
						href: e.answer,
						target: "_blank",
						rel: "noopener noreferrer"
					}, T(a.getLocalizedString(e.question.question)), 9, Z)])) : (y(), s(i, { key: 1 }, [u("span", nn, [u("strong", null, T(a.getLocalizedString(e.question.question)) + ":", 1)]), e.question.variant === "file" ? (y(), s("span", Q, [t[7] ||= u("i", { class: "fa fa-file-o" }, null, -1), e.answer_file ? (y(), s("a", {
						key: 0,
						href: e.answer_file.url
					}, T(e.answer_file), 9, rn)) : (y(), s("span", an, T(o.t.no_file_provided), 1))])) : e.question.variant === "boolean" ? (y(), s("span", on, T(a.parseBooleanAnswer(e.answer) ? o.t.yes : o.t.no), 1)) : e.answer ? (y(), s("span", {
						key: 2,
						class: "answer",
						innerHTML: o.renderRichText(e.answer)
					}, null, 8, sn)) : (y(), s("span", cn, T(o.t.no_response), 1))], 64))]))), 128))])], 64)) : d("", !0),
					o.displayResources.length > 0 ? (y(), s("div", ln, [
						t[10] ||= u("hr", null, null, -1),
						u("h4", null, T(o.t.downloads), 1),
						(y(!0), s(i, null, w(o.displayResources, ({ resource: e, description: n }) => (y(), s("a", {
							class: "download",
							href: e,
							target: "_blank"
						}, [(y(), s("svg", dn, [...t[9] ||= [u("path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }, null, -1), u("path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" }, null, -1)]])), u("div", fn, T(n), 1)], 8, un))), 256))
					])) : d("", !0),
					o.showJoinRoom && o.computedJoinRoomLink ? (y(), s("a", {
						key: 5,
						class: "join-room-btn",
						href: o.computedJoinRoomLink,
						onClick: t[2] ||= (t) => e.$emit("joinRoom", t)
					}, T(o.t.join_room), 9, pn)) : d("", !0)
				], 64))
			])]),
			n.modalContent.contentObject.speakers ? (y(), s("div", $, [(y(!0), s(i, null, w(n.modalContent.contentObject.speakers, (e) => (y(), s("a", {
				class: "speaker inner-card",
				onClick: (t) => o.handleSpeakerClick(e, t),
				href: `#speakers/${e.code}`,
				key: e.code
			}, [u("div", hn, [e.avatar ? (y(), s("img", {
				key: 0,
				src: e.avatar,
				alt: e.name
			}, null, 8, gn)) : (y(), s("div", _n, [...t[11] ||= [u("svg", { viewBox: "0 0 24 24" }, [u("path", {
				fill: "currentColor",
				d: "M12,1A5.8,5.8 0 0,1 17.8,6.8A5.8,5.8 0 0,1 12,12.6A5.8,5.8 0 0,1 6.2,6.8A5.8,5.8 0 0,1 12,1M12,15C18.63,15 24,17.67 24,21V23H0V21C0,17.67 5.37,15 12,15Z"
			})], -1)]]))]), u("div", vn, [u("span", null, T(e.name), 1), (e.apiContent?.biography || e.biography)?.length > 0 ? (y(), s("p", {
				key: 0,
				class: "biography",
				innerHTML: o.renderRichText(e.apiContent?.biography || e.biography)
			}, null, 8, yn)) : d("", !0)])], 8, mn))), 128))])) : d("", !0)
		], 64)) : d("", !0),
		n.modalContent && n.modalContent.contentType === "speaker" ? (y(), s(i, { key: 1 }, [u("div", bn, [u("div", xn, [u("div", Sn, [n.modalContent.contentObject.avatar ? (y(), s("img", {
			key: 0,
			src: n.modalContent.contentObject.avatar,
			alt: n.modalContent.contentObject.name
		}, null, 8, Cn)) : (y(), s("div", wn, [...t[12] ||= [u("svg", { viewBox: "0 0 24 24" }, [u("path", {
			fill: "currentColor",
			d: "M12,1A5.8,5.8 0 0,1 17.8,6.8A5.8,5.8 0 0,1 12,12.6A5.8,5.8 0 0,1 6.2,6.8A5.8,5.8 0 0,1 12,1M12,15C18.63,15 24,17.67 24,21V23H0V21C0,17.67 5.37,15 12,15Z"
		})], -1)]]))]), u("div", Tn, [u("h3", null, T(n.modalContent.contentObject.name), 1), o.speakerExportOptions.length || o.exportsDisabled ? (y(), l(g, {
			key: 0,
			class: "speaker-export",
			options: o.speakerExportOptions,
			qrcodesUrl: o.speakerQrcodesUrl,
			disabled: o.exportsDisabled
		}, null, 8, [
			"options",
			"qrcodesUrl",
			"disabled"
		])) : d("", !0)])]), u("div", En, [(n.modalContent.contentObject.apiContent?.biography || n.modalContent.contentObject.biography)?.length > 0 ? (y(), s("div", {
			key: 0,
			class: "biography",
			innerHTML: o.renderRichText(n.modalContent.contentObject.apiContent?.biography || n.modalContent.contentObject.biography)
		}, null, 8, Dn)) : d("", !0), n.modalContent.contentObject.isLoading ? (y(), l(_, {
			key: 1,
			size: "big",
			page: !0
		})) : (y(), s(i, { key: 2 }, [o.shortAnswers.length > 0 || o.iconAnswers.length > 0 ? (y(), s("div", On, [
			t[14] ||= u("hr", null, null, -1),
			o.iconAnswers.length > 0 ? (y(), s("div", kn, [(y(!0), s(i, null, w(o.iconAnswers, (e) => (y(), s("div", {
				class: "icon-link",
				key: e.id
			}, [u("a", {
				href: e.answer,
				target: "_blank",
				rel: "noopener noreferrer"
			}, [e.question.icon && o.remoteApiUrl ? (y(), s("img", {
				key: 0,
				src: `${o.remoteApiUrl}questions/${e.question.id}/icon/`,
				alt: a.getLocalizedString(e.question.question),
				width: "16",
				height: "16"
			}, null, 8, jn)) : (y(), s("span", Mn, T(a.getLocalizedString(e.question.question)), 1))], 8, An)]))), 128))])) : d("", !0),
			(y(!0), s(i, null, w(o.shortAnswers, (e) => (y(), s("div", {
				class: "inline-answer",
				key: e.id
			}, [e.question.variant === "url" && e.answer ? (y(), s("strong", Nn, [u("a", {
				href: e.answer,
				target: "_blank",
				rel: "noopener noreferrer"
			}, T(a.getLocalizedString(e.question.question)), 9, Pn)])) : (y(), s(i, { key: 1 }, [u("span", Fn, [u("strong", null, T(a.getLocalizedString(e.question.question)) + ":", 1)]), e.question.variant === "file" ? (y(), s("span", In, [t[13] ||= u("i", { class: "fa fa-file-o" }, null, -1), e.answer_file ? (y(), s("a", {
				key: 0,
				href: e.answer_file.url
			}, T(e.answer_file), 9, Ln)) : (y(), s("span", Rn, T(o.t.no_file_provided), 1))])) : e.question.variant === "boolean" ? (y(), s("span", zn, T(a.parseBooleanAnswer(e.answer) ? o.t.yes : o.t.no), 1)) : e.answer ? (y(), s("span", {
				key: 2,
				class: "answer",
				innerHTML: o.renderRichText(e.answer)
			}, null, 8, Bn)) : (y(), s("span", Vn, T(o.t.no_response), 1))], 64))]))), 128))
		])) : d("", !0)], 64))])]), u("div", Hn, [(y(!0), s(i, null, w(n.modalContent.contentObject.sessions, (t) => (y(), l(v, {
			session: t,
			showDate: !0,
			now: n.now,
			timezone: n.currentTimezone,
			locale: n.locale,
			hasAmPm: n.hasAmPm,
			faved: t.faved,
			onHomeServer: n.onHomeServer,
			onFav: (n) => e.$emit("fav", t.id),
			onUnfav: (n) => e.$emit("unfav", t.id)
		}, null, 8, [
			"session",
			"now",
			"timezone",
			"locale",
			"hasAmPm",
			"faved",
			"onHomeServer",
			"onFav",
			"onUnfav"
		]))), 256))])], 64)) : d("", !0)
	])], 512);
}
var Wn = /*#__PURE__*/ a({
	name: "SessionModal",
	components: {
		FavButton: S,
		Session: ee,
		ExportDropdown: kt
	},
	inject: {
		remoteApiUrl: { default: "" },
		eventUrl: { default: "" },
		favsReadOnly: { default: !1 },
		showJoinRoom: { default: !1 },
		getJoinRoomLink: { default: () => () => "" },
		translationMessages: { default: () => ({}) },
		exportsDisabled: { default: !1 }
	},
	props: {
		modalContent: Object,
		currentTimezone: String,
		locale: String,
		hasAmPm: Boolean,
		now: Object,
		onHomeServer: Boolean,
		favs: {
			type: Array,
			default: () => []
		}
	},
	emits: [
		"toggleFav",
		"showSpeaker",
		"fav",
		"unfav",
		"joinRoom"
	],
	data() {
		return {
			getLocalizedString: _,
			getSessionTime: g,
			getIconByFileEnding: b,
			parseBooleanAnswer: n
		};
	},
	computed: {
		displayResources() {
			let e = this.modalContent?.contentObject;
			return e ? (e.apiContent?.resources ?? e.resources ?? []).map((e) => {
				let t = e.resource || e.link;
				return t && t.toLowerCase().endsWith(".pdf") ? {
					...e,
					resource: e.resource ? `${e.resource}#resource` : void 0,
					link: e.link ? `${e.link}#resource` : void 0
				} : e;
			}) : [];
		},
		talkQrcodesUrl() {
			let e = this.modalContent?.contentObject?.id;
			return x(this.eventUrl, "talk", e);
		},
		speakerQrcodesUrl() {
			let e = this.modalContent?.contentObject?.code;
			return x(this.eventUrl, "speaker", e);
		},
		favSet() {
			return new Set(this.favs || []);
		},
		t() {
			let e = this.translationMessages || {};
			return {
				yes: e.yes || "Yes",
				no: e.no || "No",
				join_room: e.join_room || "Join room",
				downloads: e.downloads || "Downloads",
				no_file_provided: e.no_file_provided || "No file provided",
				no_response: e.no_response || "No response",
				ical: e.ical || "iCal"
			};
		},
		isFaved() {
			let e = this.modalContent?.contentObject;
			return e ? this.favSet.has(e.id) : !1;
		},
		computedJoinRoomLink() {
			let e = this.modalContent?.contentObject;
			return e && this.getJoinRoomLink(e) || "";
		},
		talkExportOptions() {
			return f(this.modalContent?.contentObject?.exporters);
		},
		speakerExportOptions() {
			let e = this.modalContent?.contentObject;
			if (!e || this.modalContent.contentType !== "speaker" || !e.exporters && !this.eventUrl) return [];
			let t = `${this.eventUrl || ""}speakers/${e.code}`, n = {
				...v(t),
				...e.exporters || {}
			};
			return f(n);
		},
		videoAnswers() {
			let e = this.modalContent?.contentObject?.apiContent;
			return !e || !e.answers || !e.answers.length ? [] : this.expandVideoAnswers(e.answers.filter((e) => e.question?.variant === "video"));
		},
		shortAnswers() {
			let e = this.modalContent.contentObject.apiContent;
			return !e || !e.answers || !e.answers.length ? [] : e.answers.filter((e) => !(e.question.variant === "text" || e.question.variant === "string" || e.question.variant === "url" && e.question.icon || e.question.variant === "video" && this.expandVideoAnswers([e]).length));
		},
		iconAnswers() {
			let e = this.modalContent.contentObject.apiContent;
			return !e || !e.answers || !e.answers.length ? [] : e.answers.filter((e) => e.question.variant === "url" && e.question.icon);
		},
		textAnswers() {
			let e = this.modalContent.contentObject.apiContent;
			return !e || !e.answers || !e.answers.length ? [] : e.answers.filter((e) => e.question.variant === "text" || e.question.variant === "string");
		},
		publicScheduleAnswers() {
			let e = this.modalContent?.contentObject?.apiContent;
			if (e && e.answers && e.answers.length > 0) return [];
			let t = this.modalContent?.contentObject?.answers;
			if (!t || !t.length) return [];
			if (!this.displayResources.length && !this.modalContent?.contentObject?.resources?.length) return t;
			let n = (this.t.downloads || "").trim().toLowerCase();
			return t.filter((e) => (e.question || "").trim().toLowerCase() !== n);
		},
		publicVideoScheduleAnswers() {
			return this.publicScheduleAnswers.filter((e) => e.variant === "video");
		},
		publicOtherScheduleAnswers() {
			return this.publicScheduleAnswers.filter((e) => e.variant !== "video");
		}
	},
	methods: {
		expandVideoAnswers(e) {
			let t = [];
			for (let n of e || []) {
				let e = n?.answer || "", r = String(e).split(/\r?\n/).map((e) => e.trim()).filter(Boolean);
				if (r.length <= 1) {
					this.videoEmbedSrc(n) && t.push(n);
					continue;
				}
				for (let e of r) {
					let r = o(e);
					r && t.push({
						...n,
						answer: e,
						embed_url: r
					});
				}
			}
			return t;
		},
		videoEmbedSrc(e) {
			return e ? e.embed_url ? e.embed_url : o(e.answer) : "";
		},
		renderRichText(e) {
			return vt(e || "");
		},
		showModal() {
			this.$refs.modal?.showModal();
		},
		close() {
			this.$refs.modal?.close();
		},
		handleSpeakerClick(e, t) {
			this.$emit("showSpeaker", e, t);
		}
	}
}, [["render", Un], ["styles", [".pretalx-modal{border:0;border-radius:8px;width:calc(100vw - 32px);max-width:848px;max-height:calc(100vh - 64px);padding:0;font-size:16px;overflow-y:auto;box-shadow:0 -2px 4px #0000000f,0 1px 3px #0000001f,0 8px 24px #00000026,0 16px 32px #00000017}.pretalx-modal .dialog-inner{margin:0;padding:16px 24px}.pretalx-modal .close-button{cursor:pointer;color:#757575;background:0 0;border:none;padding:8px;font-size:22px;font-weight:700;position:absolute;top:0;right:4px}.pretalx-modal .close-button:hover{color:#212121}.pretalx-modal h3{align-items:center;margin:8px 0;display:flex}.pretalx-modal .ampm{margin-left:4px}.pretalx-modal .facts{color:#757575;border-bottom:1px solid #e0e0e0;flex-wrap:wrap;align-items:center;margin-bottom:8px;display:flex}.pretalx-modal .facts>*{margin-bottom:8px;margin-right:4px}.pretalx-modal .facts>:not(:last-child):not(.session-export-area):after{content:\",\"}.pretalx-modal .facts .session-export-area{margin-left:auto}.pretalx-modal .card-content{flex-direction:column;display:flex}.pretalx-modal .card-content .downloads{margin-top:8px}.pretalx-modal .card-content .downloads h4{margin:4px 0}.pretalx-modal .card-content .downloads .download{height:40px;color:var(--pretalx-clr-text);align-items:center;font-size:14px;font-weight:600;text-decoration:none;transition:color .2s;display:flex}.pretalx-modal .card-content .downloads .download:hover{color:var(--pretalx-clr-primary)}.pretalx-modal .card-content .downloads .download:hover .download-icon{opacity:1;color:var(--pretalx-clr-primary)}.pretalx-modal .card-content .downloads .download .download-icon{opacity:.7;flex-shrink:0;margin-right:6px;transition:opacity .2s,color .2s}.pretalx-modal .card-content .downloads .download .filename{flex:1}.pretalx-modal .card-content .join-room-btn{color:#fff;background-color:var(--pretalx-clr-primary,var(--clr-primary));border-radius:4px;width:fit-content;margin-top:12px;padding:8px 24px;font-weight:600;text-decoration:none;display:inline-block}.pretalx-modal .card-content .join-room-btn:hover{opacity:.9}.pretalx-modal .text-content{margin-bottom:8px}.pretalx-modal .text-content .recording-embed,.pretalx-modal .text-content .video-embed{margin-bottom:16px}.pretalx-modal .text-content .recording-embed iframe,.pretalx-modal .text-content .video-embed iframe{aspect-ratio:16/9;border:none;border-radius:4px;width:100%;display:block}.pretalx-modal .text-content .field-section{margin-bottom:12px}.pretalx-modal .text-content .field-section .field-heading{color:#757575;margin:0 0 4px;font-size:14px;font-weight:700}.pretalx-modal .text-content .field-section .field-content{padding:8px 12px}.pretalx-modal .text-content .field-section .field-content p{margin:.25em 0}.pretalx-modal .text-content .field-section .field-content p:first-child{margin-top:0}.pretalx-modal .text-content .field-section .field-content p:last-child{margin-bottom:0}.pretalx-modal .text-content p{font-size:16px}.pretalx-modal .text-content hr{color:#ced4da;border:0;border-top:1px solid #e0e0e0;height:0;margin:16px 0}.pretalx-modal .answers .icon-group{flex-wrap:wrap;gap:8px;margin-top:2px;margin-bottom:0;display:flex}.pretalx-modal .answers .icon-group .icon-link{align-items:center;margin-right:8px;display:inline-flex}.pretalx-modal .answers .icon-group .icon-link:last-child{margin-right:0}.pretalx-modal .answers .icon-group .icon-link a{color:var(--pretalx-clr-primary);align-items:center;text-decoration:none;display:flex}.pretalx-modal .answers .icon-group .icon-link a:hover{text-decoration:underline}.pretalx-modal .answers .icon-group .icon-link a img{margin-right:4px}.pretalx-modal .answers .inline-answer{margin-bottom:8px;display:block}.pretalx-modal .answers .inline-answer .question{color:var(--pretalx-clr-text);margin-right:4px}.pretalx-modal .answers .inline-answer .question strong{font-weight:600}.pretalx-modal .answers .inline-answer .answer{color:var(--pretalx-clr-text)}.pretalx-modal .answers .inline-answer .answer p{margin:0;display:inline}.pretalx-modal .answers .inline-answer .answer .fa{margin-right:4px}.pretalx-modal .answers .inline-answer .answer a{color:var(--pretalx-clr-primary);text-decoration:none}.pretalx-modal .answers .inline-answer .answer a:hover{text-decoration:underline}.pretalx-modal .inner-card{cursor:pointer;min-height:96px;color:var(--pretalx-clr-primary);border:1px solid #ced4da;border-radius:6px;align-items:flex-start;margin-bottom:12px;padding:8px;text-decoration:none;display:flex}.pretalx-modal .inner-card .inner-card-content{margin-top:8px;margin-left:8px}.pretalx-modal .inner-card .inner-card-content p{color:var(--pretalx-clr-text);font-size:14px}.pretalx-modal .inner-card .img-wrapper,.pretalx-modal .inner-card .img-wrapper img,.pretalx-modal .inner-card .img-wrapper .avatar-placeholder{width:100px;height:100px}.pretalx-modal .img-wrapper{width:140px;height:140px;padding:4px 16px 4px 4px}.pretalx-modal .img-wrapper img,.pretalx-modal .img-wrapper .avatar-placeholder{border-radius:50%;width:140px;height:140px;box-shadow:0 1px 3px #0000001f,0 1px 2px #0000003d}.pretalx-modal .img-wrapper img{object-fit:cover}.pretalx-modal .img-wrapper .avatar-placeholder{background:#0000001a;justify-content:center;align-items:center;display:flex}.pretalx-modal .img-wrapper .avatar-placeholder svg{color:#0000004d;width:60%;height:60%}.pretalx-modal .speaker-details h3{margin:0}.pretalx-modal .speaker-details .speaker-header{align-items:center;gap:16px;margin-bottom:16px;display:flex}.pretalx-modal .speaker-details .speaker-avatar{flex-shrink:0;width:100px;height:100px}.pretalx-modal .speaker-details .speaker-avatar img,.pretalx-modal .speaker-details .speaker-avatar .avatar-placeholder{object-fit:cover;border-radius:50%;width:100px;height:100px;box-shadow:0 1px 3px #0000001f,0 1px 2px #0000003d}.pretalx-modal .speaker-details .speaker-avatar .avatar-placeholder{background:#0000001a;justify-content:center;align-items:center;display:flex}.pretalx-modal .speaker-details .speaker-avatar .avatar-placeholder svg{color:#0000004d;width:60%;height:60%}.pretalx-modal .speaker-details .speaker-title{flex-direction:column;gap:8px;display:flex}.pretalx-modal .speaker-details .speaker-export{align-self:flex-start}.pretalx-modal .speaker-details .speaker-content{margin-bottom:16px}.pretalx-modal .speaker-details .speaker-content .biography{margin-top:8px}"]]]);
//#endregion
export { kt as n, vt as r, Wn as t };
