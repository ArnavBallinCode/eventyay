import { G as e, L as t, Q as n, X as r, Y as i, Z as a, dt as o, ft as s, lt as c, r as l, tt as u, xt as d, yt as f } from "./pretalx-schedule-chunk-grid.js";
import { n as p } from "./pretalx-schedule-chunk-modal.js";
//#region src/components/DetailBackNav.vue?vue&type=template&lang.js
var m = {
	key: 0,
	class: "c-detail-top-bar"
}, h = ["aria-label"], g = { class: "back-label" }, _ = {
	key: 1,
	class: "detail-top-actions"
};
function v(e, t, r, s, l, u) {
	return u.showBack || e.$slots.default ? (c(), n("div", m, [u.showBack ? (c(), n("nav", {
		key: 0,
		class: "back-nav",
		"aria-label": u.backLabel
	}, [i("button", {
		class: "back-link",
		type: "button",
		onClick: t[0] ||= (...e) => u.goBack && u.goBack(...e)
	}, [t[1] ||= i("svg", {
		class: "back-icon",
		viewBox: "0 0 24 24",
		"aria-hidden": "true"
	}, [i("path", {
		fill: "currentColor",
		d: "M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"
	})], -1), i("span", g, d(u.backLabel), 1)])], 8, h)) : a("", !0), e.$slots.default ? (c(), n("div", _, [o(e.$slots, "default")])) : a("", !0)])) : a("", !0);
}
var y = /*#__PURE__*/ t({
	name: "DetailBackNav",
	inject: {
		parentEventUrl: {
			from: "eventUrl",
			default: ""
		},
		translationMessages: { default: () => ({}) }
	},
	props: { eventUrl: {
		type: String,
		default: ""
	} },
	computed: {
		resolvedEventUrl() {
			return this.eventUrl || this.parentEventUrl || "";
		},
		backLabel() {
			return (this.translationMessages || {}).back || "Back";
		},
		showBack() {
			return !!(this.resolvedEventUrl || typeof window < "u" && window.history.length > 1);
		}
	},
	methods: { goBack() {
		if (typeof window < "u" && window.history.length > 1) {
			window.history.back();
			return;
		}
		this.resolvedEventUrl && (window.location.href = this.resolvedEventUrl);
	} }
}, [["render", v], ["styles", [".c-detail-top-bar{flex-wrap:nowrap;justify-content:space-between;align-items:center;gap:12px;padding:12px 16px 0;display:flex}.c-detail-top-bar .back-nav{flex-shrink:1;min-width:0}.c-detail-top-bar .back-link{color:#000000de;cursor:pointer;background-color:#fff;border:1px solid #e0e0e0;border-radius:999px;align-items:center;gap:6px;max-width:100%;padding:7px 14px 7px 10px;font-size:14px;font-weight:600;line-height:1.2;text-decoration:none;transition:background-color .2s,border-color .2s,color .2s,box-shadow .2s,transform .15s;display:inline-flex;box-shadow:0 1px 2px #0000000a}.c-detail-top-bar .back-link .back-icon{flex-shrink:0;width:18px;height:18px}.c-detail-top-bar .back-link .back-label{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.c-detail-top-bar .back-link:hover{background-color:color-mix(in srgb, var(--pretalx-clr-primary,var(--clr-primary)) 8%, white);border-color:var(--pretalx-clr-primary,var(--clr-primary));color:var(--pretalx-clr-primary,var(--clr-primary));box-shadow:0 2px 6px #00000014}.c-detail-top-bar .back-link:active{transform:translateY(1px)}.c-detail-top-bar .back-link:focus-visible{outline:2px solid var(--pretalx-clr-primary,var(--clr-primary));outline-offset:2px}.c-detail-top-bar .detail-top-actions{flex-shrink:0;align-items:center;gap:8px;margin-left:auto;display:flex}@media (width<=480px){.c-detail-top-bar{gap:8px;padding:10px 10px 0}.c-detail-top-bar .back-link{padding:6px 12px 6px 8px;font-size:13px}.c-detail-top-bar .detail-top-actions{gap:4px}}"]]]);
//#endregion
//#region src/components/DetailTopActions.vue?vue&type=template&lang.js
function b(t, i, o, l, d, p) {
	let m = s("export-dropdown"), h = s("fav-button");
	return c(), n(e, null, [p.showExport ? (c(), r(m, {
		key: 0,
		options: o.exportOptions,
		qrcodesUrl: o.qrcodesUrl,
		disabled: p.exportControlDisabled
	}, null, 8, [
		"options",
		"qrcodesUrl",
		"disabled"
	])) : a("", !0), o.showFav ? (c(), n("div", {
		key: 1,
		class: f(["button-container", { faved: o.faved }])
	}, [u(h, { onToggleFav: i[0] ||= (e) => t.$emit("toggleFav") })], 2)) : a("", !0)], 64);
}
var x = /*#__PURE__*/ t({
	name: "DetailTopActions",
	components: {
		ExportDropdown: p,
		FavButton: l
	},
	emits: ["toggleFav"],
	inject: {
		isWipPreview: { default: !1 },
		exportsDisabled: { default: !1 }
	},
	props: {
		exportOptions: {
			type: Array,
			default: () => []
		},
		qrcodesUrl: {
			type: String,
			default: ""
		},
		showFav: {
			type: Boolean,
			default: !1
		},
		faved: {
			type: Boolean,
			default: !1
		}
	},
	computed: {
		exportControlDisabled() {
			return this.isWipPreview || this.exportsDisabled;
		},
		showExport() {
			return this.exportOptions.length > 0 || this.exportControlDisabled;
		}
	}
}, [["render", b]]);
//#endregion
export { y as n, x as t };
