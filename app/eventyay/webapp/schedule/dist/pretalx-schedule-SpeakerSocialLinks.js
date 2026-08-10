import { G as e, L as t, Q as n, Y as r, Z as i, bt as a, lt as o, ut as s, v as c, yt as l } from "./pretalx-schedule-chunk-grid.js";
//#region src/components/SpeakerSocialLinks.vue?vue&type=template&lang.js
var u = [
	"href",
	"aria-label",
	"title"
], d = ["innerHTML"];
function f(t, c, f, p, m, h) {
	return f.links && f.links.length ? (o(), n("div", {
		key: 0,
		class: "speaker-social-links",
		style: a({ justifyContent: f.alignment })
	}, [(o(!0), n(e, null, s(f.links, (e) => (o(), n("a", {
		class: l(["speaker-social-link", "speaker-social-link--" + e.key]),
		key: e.key + e.url,
		href: e.url,
		style: a({ color: e.color || void 0 }),
		"aria-label": e.label,
		title: e.label,
		target: "_blank",
		rel: "noopener noreferrer"
	}, [r("span", {
		class: "speaker-social-svg",
		innerHTML: h.getSocialIconHtml(e)
	}, null, 8, d)], 14, u))), 128))], 4)) : i("", !0);
}
var p = /*#__PURE__*/ t({
	name: "SpeakerSocialLinks",
	props: {
		links: {
			type: Array,
			default: () => []
		},
		alignment: {
			type: String,
			default: "center"
		}
	},
	methods: { getSocialIconHtml(e) {
		return c(e);
	} }
}, [["render", f], ["styles", [".speaker-social-links{flex-wrap:wrap;gap:8px;margin-bottom:4px;display:flex}.speaker-social-link{width:32px;height:32px;color:inherit;background:#0000000f;border-radius:6px;justify-content:center;align-items:center;font-size:16px;text-decoration:none;transition:background-color .15s,transform .15s;display:inline-flex}.speaker-social-link:hover,.speaker-social-link:focus-visible{background:#0000001f;transform:translateY(-2px)}.speaker-social-link:active{transform:translateY(0)}.speaker-social-svg{justify-content:center;align-items:center;width:20px;height:20px;display:flex}.speaker-social-svg svg{fill:currentColor;width:100%;height:100%}"]]]);
//#endregion
export { p as t };
