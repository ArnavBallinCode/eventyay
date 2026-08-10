import { o as e } from "./pretalx-schedule-rolldown-runtime.js";
import { E as t, G as n, I as r, L as i, Q as a, X as o, Y as s, Z as c, a as l, ft as u, h as d, ht as f, k as p, l as m, lt as h, n as g, o as _, tt as v, ut as y, xt as b } from "./pretalx-schedule-chunk-grid.js";
import { t as x } from "./pretalx-schedule-MarkdownContent.js";
import { t as S } from "./pretalx-schedule-SpeakerSocialLinks.js";
import { n as C, t as w } from "./pretalx-schedule-DetailTopActions.js";
//#region src/components/SpeakerDetail.vue?vue&type=template&lang.js
var T = /* @__PURE__ */ e(r()), E = { class: "c-speaker-detail" }, D = {
	key: 0,
	class: "speaker-wrapper"
}, O = { class: "speaker-header" }, k = { class: "speaker-avatar" }, A = ["src", "alt"], j = {
	key: 1,
	class: "avatar-placeholder"
}, M = { class: "speaker-content-area" }, N = { class: "speaker-title" }, P = {
	key: 0,
	class: "field-section biography-section"
}, F = { class: "field-heading" }, I = { class: "field-content" }, L = { class: "field-heading" }, R = { class: "field-content" }, z = { class: "field-heading" }, B = { class: "field-content" }, V = ["href"], H = ["href"], U = { key: 2 }, W = { key: 3 }, G = {
	key: 1,
	class: "speaker-sessions"
};
function K(e, t, r, i, l, d) {
	let p = u("detail-top-actions"), m = u("detail-back-nav"), g = u("speaker-social-links"), _ = u("markdown-content"), x = u("session"), S = u("bunt-progress-circular");
	return h(), a("div", E, [v(m, { "event-url": d.eventUrl }, {
		default: f(() => [v(p, {
			"export-options": d.speakerExportOptions,
			"qrcodes-url": d.speakerQrcodesUrl
		}, null, 8, ["export-options", "qrcodes-url"])]),
		_: 1
	}, 8, ["event-url"]), d.speakerDetailReady ? (h(), a("div", D, [
		s("div", O, [s("div", k, [d.resolvedSpeaker.avatar || d.resolvedSpeaker.avatar_url ? (h(), a("img", {
			key: 0,
			src: d.resolvedSpeaker.avatar || d.resolvedSpeaker.avatar_url,
			alt: d.resolvedSpeaker.name
		}, null, 8, A)) : (h(), a("div", j, [...t[0] ||= [s("svg", { viewBox: "0 0 24 24" }, [s("path", {
			fill: "currentColor",
			d: "M12,1A5.8,5.8 0 0,1 17.8,6.8A5.8,5.8 0 0,1 12,12.6A5.8,5.8 0 0,1 6.2,6.8A5.8,5.8 0 0,1 12,1M12,15C18.63,15 24,17.67 24,21V23H0V21C0,17.67 5.37,15 12,15Z"
		})], -1)]]))]), s("div", M, [s("div", N, [s("h2", null, b(d.resolvedSpeaker.name || d.t.speaker_fallback), 1)]), v(g, {
			links: d.socialLinks,
			alignment: "flex-start"
		}, null, 8, ["links"])])]),
		d.resolvedSpeaker.biography ? (h(), a("div", P, [s("h2", F, b(d.t.biography), 1), s("div", I, [v(_, { markdown: d.resolvedSpeaker.biography }, null, 8, ["markdown"])])])) : c("", !0),
		(h(!0), a(n, null, y(d.longAnswers, (e) => (h(), a("div", {
			class: "field-section",
			key: e.id
		}, [s("h2", L, b(l.getLocalizedString(e.question.question) || String(e.question.question)), 1), s("div", R, [v(_, { markdown: e.answer_string || e.answer }, null, 8, ["markdown"])])]))), 128)),
		(h(!0), a(n, null, y(d.inlineAnswers, (e) => (h(), a("div", {
			class: "field-section",
			key: e.id
		}, [s("h2", z, b(l.getLocalizedString(e.question.question) || String(e.question.question)), 1), s("div", B, [(e.question.variant === "url" || e.question.variant === "file") && e.answer_file && e.answer_file.url ? (h(), a("a", {
			key: 0,
			class: "answer-link",
			href: e.answer_file.url,
			target: "_blank",
			rel: "noopener noreferrer"
		}, b(e.answer || e.answer_file.url), 9, V)) : (e.question.variant === "url" || e.question.variant === "file") && e.answer ? (h(), a("a", {
			key: 1,
			class: "answer-link",
			href: e.answer,
			target: "_blank",
			rel: "noopener noreferrer"
		}, b(e.answer), 9, H)) : e.question.variant === "boolean" ? (h(), a("span", U, b(l.parseBooleanAnswer(e.answer) ? d.t.yes : d.t.no), 1)) : e.answer_string || e.answer ? (h(), a("span", W, b(e.answer_string || e.answer), 1)) : c("", !0)])]))), 128)),
		d.resolvedSessions && d.resolvedSessions.length ? (h(), a("div", G, [s("h3", null, b(d.t.sessions), 1), (h(!0), a(n, null, y(d.resolvedSessions, (e) => (h(), o(x, {
			key: e.id,
			session: e,
			showDate: !0,
			now: d.resolvedNow,
			timezone: d.resolvedTimezone,
			locale: r.locale,
			hasAmPm: d.resolvedHasAmPm,
			faved: e.id && d.resolvedFavSet.has(e.id),
			onHomeServer: r.onHomeServer,
			onFav: (t) => d.onFav(e.id),
			onUnfav: (t) => d.onUnfav(e.id)
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
		]))), 128))])) : c("", !0)
	])) : (h(), o(S, {
		key: 1,
		size: "huge",
		page: !0
	}))]);
}
var q = /*#__PURE__*/ i({
	name: "SpeakerDetail",
	components: {
		MarkdownContent: x,
		Session: g,
		DetailBackNav: C,
		DetailTopActions: w,
		SpeakerSocialLinks: S
	},
	inject: {
		eventUrl: { default: null },
		remoteApiUrl: { default: "" },
		scheduleData: { default: null },
		scheduleFav: { default: null },
		scheduleUnfav: { default: null },
		generateSessionLinkUrl: { default() {
			return ({ session: e }) => `#talk/${e.id}`;
		} },
		onSessionLinkClick: { default() {
			return () => {};
		} },
		translationMessages: { default: () => ({}) },
		isWipPreview: { default: !1 },
		exportsDisabled: { default: !1 }
	},
	props: {
		speaker: Object,
		speakerId: String,
		sessions: {
			type: Array,
			default: () => []
		},
		now: Object,
		timezone: String,
		locale: String,
		hasAmPm: {
			type: Boolean,
			default: !1
		},
		favs: {
			type: Array,
			default: () => []
		},
		onHomeServer: Boolean
	},
	emits: ["fav", "unfav"],
	data() {
		return {
			getLocalizedString: d,
			parseBooleanAnswer: t,
			fetchedApiContent: null,
			apiContentLoaded: !1
		};
	},
	computed: {
		speakerQrcodesUrl() {
			let e = this.speakerId || this.speaker?.code || this.resolvedSpeaker?.code;
			return _(this.eventUrl, "speaker", e);
		},
		t() {
			let e = this.translationMessages || {};
			return {
				speaker_fallback: e.speaker_fallback || "Speaker",
				ical: e.ical || "iCal",
				sessions: e.sessions || "Sessions",
				export: e.export || "Exports",
				yes: e.yes || "Yes",
				no: e.no || "No",
				biography: e.biography || "Biography"
			};
		},
		resolvedSpeaker() {
			if (this.speaker) return this.speaker;
			if (this.speakerId && this.scheduleData) {
				let e = this.scheduleData.speakersLookup;
				if (e && e[this.speakerId]) return e[this.speakerId];
				let t = this.scheduleData.schedule;
				if (t?.speakers) {
					for (let e = 0; e < t.speakers.length; e++) if (t.speakers[e].code === this.speakerId) return t.speakers[e];
				}
				let n = this.scheduleData.sessionsBySpeaker?.[this.speakerId];
				if (n?.length) {
					let e = n[0].speakers || [];
					for (let t = 0; t < e.length; t++) if (e[t].code === this.speakerId) return e[t];
				}
			}
			return null;
		},
		resolvedSessions() {
			if (this.sessions?.length) return this.sessions;
			let e = this.speakerId || this.speaker?.code;
			if (!e) return [];
			let t = p(this.scheduleData?.sessionsBySpeaker, e);
			if (t.length) return t;
			let n = this.scheduleData?.sessions || [], r = e.toLowerCase();
			return n.filter((e) => (e.speakers || []).some((e) => {
				let t = typeof e == "string" ? e : e?.code;
				return t && t.toLowerCase() === r;
			}));
		},
		resolvedFavs() {
			return this.favs?.length ? this.favs : this.scheduleData?.favs || [];
		},
		resolvedFavSet() {
			let e = this.scheduleData?.favSet;
			return e && typeof e.has == "function" ? e : new Set(this.resolvedFavs);
		},
		resolvedNow() {
			return this.now || this.scheduleData?.now || (0, T.default)();
		},
		resolvedTimezone() {
			return this.timezone || this.scheduleData?.timezone || T.default.tz.guess();
		},
		resolvedHasAmPm() {
			return this.hasAmPm === void 0 ? this.scheduleData?.hasAmPm === void 0 ? new Intl.DateTimeFormat(void 0, { hour: "numeric" }).resolvedOptions().hour12 : this.scheduleData.hasAmPm : this.hasAmPm;
		},
		effectiveSpeakerApiContent() {
			return this.resolvedSpeaker?.apiContent || this.fetchedApiContent;
		},
		speakerDetailReady() {
			return this.resolvedSpeaker && (this.effectiveSpeakerApiContent || this.apiContentLoaded || !this.computedApiBaseUrl);
		},
		computedApiBaseUrl() {
			if (this.remoteApiUrl) return this.remoteApiUrl;
			if (!this.eventUrl) return null;
			try {
				let e = new URL(this.eventUrl, window.location.origin), t = e.pathname.split("/").filter((e) => e.length > 0), n = t[t.length - 1] || "";
				return `${e.origin}/api/v1/events/${n}/`;
			} catch {
				return null;
			}
		},
		longAnswers() {
			let e = this.effectiveSpeakerApiContent?.answers;
			return Array.isArray(e) ? e.filter((e) => e.question && e.question.is_public !== !1 && (e.question.variant === "text" || e.question.variant === "string")) : [];
		},
		inlineAnswers() {
			let e = this.effectiveSpeakerApiContent?.answers;
			return Array.isArray(e) ? e.filter((e) => e.question && e.question.is_public !== !1 && e.question.variant !== "text" && e.question.variant !== "string") : [];
		},
		socialLinks() {
			let e = this.effectiveSpeakerApiContent?.social_links;
			return Array.isArray(e) ? e.filter((e) => e && e.url) : [];
		},
		speakerBaseUrl() {
			let e = this.speakerId || this.speaker?.code || this.resolvedSpeaker?.code;
			return !e || !this.eventUrl ? null : `${this.eventUrl}speakers/${e}`;
		},
		speakerExportOptions() {
			if (this.exportsDisabled || !this.resolvedSessions?.length) return [];
			let e = this.resolvedSpeaker?.exporters, t = this.speakerBaseUrl;
			if (!e && !t) return [];
			let n = t ? {
				...m(t),
				...e || {}
			} : e;
			return l(n);
		}
	},
	watch: {
		resolvedSpeaker: {
			handler() {
				this.effectiveSpeakerApiContent || this.fetchApiContent();
			},
			immediate: !0
		},
		speakerId() {
			this.fetchedApiContent = null, this.apiContentLoaded = !1;
		}
	},
	methods: {
		onFav(e) {
			this.scheduleFav && this.scheduleFav(e), this.$emit("fav", e);
		},
		onUnfav(e) {
			this.scheduleUnfav && this.scheduleUnfav(e), this.$emit("unfav", e);
		},
		async fetchApiContent() {
			if (this.effectiveSpeakerApiContent || this.fetchedApiContent !== null || this.apiContentLoaded) return;
			if (!this.computedApiBaseUrl) {
				this.apiContentLoaded = !0;
				return;
			}
			let e = this.speakerId || this.resolvedSpeaker?.code;
			if (!e) {
				this.apiContentLoaded = !0;
				return;
			}
			try {
				let t = `${this.computedApiBaseUrl}speakers/${e}/?expand=answers.question`, n = await fetch(t);
				if (!n.ok) {
					console.warn("[SpeakerDetail] API response not ok:", n.status, t);
					return;
				}
				let r = await n.json();
				this.fetchedApiContent = r;
			} catch (e) {
				console.warn("[SpeakerDetail] fetch failed:", e);
			} finally {
				this.apiContentLoaded = !0;
			}
		}
	}
}, [["render", K], ["styles", [".c-speaker-detail{background-color:#fff;flex-direction:column;display:flex}.c-speaker-detail .speaker-wrapper{flex-direction:column;flex:auto;padding:16px;display:flex}.c-speaker-detail .speaker-header{align-items:center;gap:16px;margin-bottom:16px;display:flex;position:relative}.c-speaker-detail .speaker-header h2{margin:0}.c-speaker-detail .speaker-content-area{flex:1;min-width:0}.c-speaker-detail .speaker-title{flex-direction:column;width:100%;display:flex}.c-speaker-detail .speaker-title h2{text-align:left;margin:0}.c-speaker-detail .speaker-avatar{flex-shrink:0;width:128px;height:128px}.c-speaker-detail .speaker-avatar img,.c-speaker-detail .speaker-avatar .avatar-placeholder{object-fit:cover;border-radius:50%;width:128px;height:128px;box-shadow:0 1px 3px #0000001f,0 1px 2px #0000003d}.c-speaker-detail .speaker-avatar .avatar-placeholder{background:#0000001a;justify-content:center;align-items:center;display:flex}.c-speaker-detail .speaker-avatar .avatar-placeholder svg{color:#0000004d;width:60%;height:60%}.c-speaker-detail .field-section{margin:16px 0 0}.c-speaker-detail .field-section .field-heading{color:#0000008a;margin:0 0 6px;font-size:14px;font-weight:700}.c-speaker-detail .field-section .field-content{padding:8px 12px}.c-speaker-detail .field-section .field-content p{margin:.25em 0}.c-speaker-detail .field-section .field-content p:first-child{margin-top:0}.c-speaker-detail .field-section .field-content p:last-child{margin-bottom:0}.c-speaker-detail .field-section.biography-section .field-content{font-size:16px}.c-speaker-detail .answer-link{color:var(--pretalx-clr-primary,var(--clr-primary));word-break:break-all;text-decoration:none}.c-speaker-detail .answer-link:hover{text-decoration:underline}.c-speaker-detail .speaker-sessions h3{margin-bottom:8px}.c-speaker-detail .speaker-sessions .c-linear-schedule-session{border-radius:6px;margin:8px 0;box-shadow:0 1px 3px #0000001f,0 1px 2px #00000014}@media (width<=768px){.c-speaker-detail .speaker-header{text-align:center;flex-direction:column;align-items:center}.c-speaker-detail .speaker-header .speaker-content-area{flex-direction:column;align-items:center;gap:4px;width:100%}.c-speaker-detail .speaker-header .speaker-content-area .speaker-title h2{text-align:center}.c-speaker-detail .speaker-avatar,.c-speaker-detail .speaker-avatar img,.c-speaker-detail .speaker-avatar .avatar-placeholder{width:96px;height:96px}}@media (width<=480px){.c-speaker-detail .speaker-wrapper{padding:10px}.c-speaker-detail .speaker-avatar,.c-speaker-detail .speaker-avatar img,.c-speaker-detail .speaker-avatar .avatar-placeholder{width:72px;height:72px}.c-speaker-detail .biography{font-size:14px}}"]]]);
//#endregion
export { q as default };
