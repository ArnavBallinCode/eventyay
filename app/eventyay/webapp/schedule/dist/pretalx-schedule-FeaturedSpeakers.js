import { o as e } from "./pretalx-schedule-rolldown-runtime.js";
import { A as t, C as n, G as r, I as i, L as a, M as o, Q as s, X as c, Y as l, Z as u, bt as d, c as f, ft as p, h as m, k as h, lt as g, s as _, tt as v, ut as y, xt as b, yt as x } from "./pretalx-schedule-chunk-grid.js";
import { t as S } from "./pretalx-schedule-MarkdownContent.js";
import { t as C } from "./pretalx-schedule-SpeakerSocialLinks.js";
//#region src/components/FeaturedSpeakers.vue?vue&type=template&lang.js
var w = /* @__PURE__ */ e(i()), T = {
	key: 0,
	class: "c-featured-speakers"
}, E = { id: "featured-speakers-heading" }, D = { class: "featured-speakers-grid" }, O = { class: "featured-speaker-card" }, k = { class: "featured-speaker-summary" }, A = { class: "thumbnail" }, j = ["src", "alt"], M = {
	key: 1,
	class: "avatar-placeholder"
}, N = { class: "caption text-center" }, P = { class: "featured-speaker-details" }, F = {
	key: 0,
	class: "featured-speaker-divider"
}, I = {
	key: 1,
	class: "featured-speaker-divider"
}, L = { class: "featured-speaker-sessions" }, R = { class: "featured-speaker-session-time" }, z = ["href", "onClick"], B = {
	key: 0,
	class: "featured-speaker-session-slot"
}, V = { class: "featured-speaker-session-title" }, H = { class: "featured-speaker-profile-link" }, U = ["href", "onClick"], W = {
	key: 0,
	class: "featured-speakers-more"
}, G = ["href"];
function K(e, t, n, i, a, o) {
	let f = p("markdown-content"), m = p("speaker-social-links");
	return o.featuredSpeakers.length ? (g(), s("div", T, [
		l("h3", E, b(o.t.featured_speakers), 1),
		l("div", D, [(g(!0), s(r, null, y(o.featuredSpeakers, (e) => (g(), s("div", {
			class: "featured-speaker-column",
			key: e.code
		}, [l("details", O, [l("summary", k, [l("div", A, [e.avatar_thumbnail_default || e.avatar || e.avatar_url ? (g(), s("img", {
			key: 0,
			src: e.avatar_thumbnail_default || e.avatar || e.avatar_url,
			alt: e.name || o.t.speaker_fallback,
			loading: "lazy"
		}, null, 8, j)) : (g(), s("div", M, [...t[0] ||= [l("svg", { viewBox: "0 0 24 24" }, [l("path", {
			fill: "currentColor",
			d: "M12,1A5.8,5.8 0 0,1 17.8,6.8A5.8,5.8 0 0,1 12,12.6A5.8,5.8 0 0,1 6.2,6.8A5.8,5.8 0 0,1 12,1M12,15C18.63,15 24,17.67 24,21V23H0V21C0,17.67 5.37,15 12,15Z"
		})], -1)]])), l("div", N, [l("h4", null, b(e.name || o.t.speaker_fallback), 1), e.biography ? (g(), c(f, {
			key: 0,
			class: "featured-speaker-preview-bio",
			markdown: e.biography
		}, null, 8, ["markdown"])) : u("", !0)])])]), l("div", P, [
			v(m, {
				links: e.social_links,
				alignment: "flex-start"
			}, null, 8, ["links"]),
			e.sessions && e.sessions.length ? (g(), s(r, { key: 0 }, [e.social_links && e.social_links.length ? (g(), s("hr", F)) : (g(), s("hr", I)), l("div", L, [l("h4", null, b(o.t.sessions), 1), (g(!0), s(r, null, y(e.sessions, (e) => (g(), s("div", {
				class: x(["featured-speaker-session", { "featured-speaker-session-pending": a.isTalkSchedulePending(e) }]),
				key: e.id
			}, [l("small", R, b(a.isTalkSchedulePending(e) ? o.t.schedule_pending : o.formatSessionDateTime(e)), 1), l("a", {
				class: "featured-speaker-session-link",
				href: o.getSessionLink(e),
				style: d(o.getSessionStyle(e)),
				onClick: (t) => o.onSessionClick(t, e)
			}, [a.isTalkSchedulePending(e) ? u("", !0) : (g(), s("span", B, b(o.formatSessionSlot(e)), 1)), l("span", V, b(a.getLocalizedString(e.title)), 1)], 12, z)], 2))), 128))])], 64)) : u("", !0),
			l("div", H, [l("a", {
				href: o.getSpeakerLink(e),
				onClick: (t) => o.onSpeakerClick(t, e)
			}, b(o.t.view_profile), 9, U)])
		])])]))), 128))]),
		o.showMoreSpeakersLink ? (g(), s("p", W, [l("a", {
			class: "more-link",
			href: o.moreSpeakersUrl
		}, b(o.t.more_speakers), 9, G)])) : u("", !0)
	])) : u("", !0);
}
var q = /*#__PURE__*/ a({
	name: "FeaturedSpeakers",
	components: {
		MarkdownContent: S,
		SpeakerSocialLinks: C
	},
	inject: {
		scheduleData: { default: null },
		eventUrl: { default: "" },
		generateSpeakerLinkUrl: { default() {
			return ({ speaker: e }) => `#speakers/${e.code}`;
		} },
		onSpeakerLinkClick: { default() {
			return () => {};
		} },
		onSessionLinkClick: { default() {
			return () => {};
		} },
		translationMessages: { default: () => ({}) },
		speakersListPublic: { default: null }
	},
	props: { showAll: {
		type: Boolean,
		default: !1
	} },
	data() {
		return {
			getLocalizedString: m,
			isTalkSchedulePending: n
		};
	},
	computed: {
		t() {
			let e = this.translationMessages || {};
			return {
				featured_speakers: this.showAll ? e.speakers || "Speakers" : e.featured_speakers || "Featured Speakers",
				speaker_fallback: e.speaker_fallback || "Speaker",
				sessions: e.sessions || "Sessions",
				view_profile: e.view_profile || "View speaker profile",
				more_speakers: e.more_speakers || "More speakers",
				schedule_pending: e.schedule_pending_secondary || "Coming soon"
			};
		},
		moreSpeakersUrl() {
			return `${(this.eventUrl || "").replace(/\/?$/, "/")}speakers/`;
		},
		showMoreSpeakersLink() {
			if (this.speakersListPublic === !1) return !1;
			let e = this.scheduleData?.schedule;
			return !(!e?.speakers_list_public || e.exports_disabled);
		},
		trackById() {
			return (this.scheduleData?.schedule?.tracks || []).reduce((e, t) => (t?.id != null && (e[t.id] = t), e), {});
		},
		featuredSpeakers() {
			let e = this.scheduleData?.schedule, n = this.scheduleData?.sessions || [], r = e?.talks || [], i = this.scheduleData?.timezone || e?.timezone;
			if (!e?.speakers?.length) return [];
			let a = e.speakers.filter((e) => this.showAll || e?.is_featured).slice().sort((e, t) => f(e, t, { featuredFirst: this.showAll })), s = (e.speakers || []).reduce((e, t) => (t?.code && (e[t.code] = t), e), {}), c = this.trackById, l = (e.rooms || []).reduce((e, t) => (t?.id != null && (e[t.id] = t), e), {}), u = o(r, {
				timezone: i,
				speakersLookup: s,
				tracksLookup: c,
				roomsLookup: l
			}).filter((e) => e.schedule_pending || e.start && e.end), d = n.length ? n : u, p = n.length && this.scheduleData?.sessionsBySpeaker ? this.scheduleData.sessionsBySpeaker : _(d, { lowercaseKeys: !1 });
			return a.map((e) => {
				let n = t(h(p, e.code));
				return {
					...e,
					sessions: n
				};
			});
		}
	},
	methods: {
		getSpeakerLink(e) {
			return this.eventUrl ? `${(this.eventUrl || "").replace(/\/?$/, "/")}speakers/${e.code}/` : this.generateSpeakerLinkUrl({ speaker: e });
		},
		onSpeakerClick(e, t) {
			this.onSpeakerLinkClick(e, t);
		},
		getSessionLink(e) {
			let t = (this.eventUrl || "").replace(/\/?$/, "/");
			return e?.id ? `${t}talk/${e.id}/` : "#";
		},
		onSessionClick(e, t) {
			this.onSessionLinkClick(e, t);
		},
		getSessionStyle(e) {
			return { "--session-color": (typeof e?.track == "object" ? e.track : this.trackById[e?.track])?.color || "var(--pretalx-clr-primary)" };
		},
		formatSessionSlot(e) {
			let t = this.scheduleData?.timezone, n = this.scheduleData?.hasAmPm;
			if (!t || !e?.start || !e?.end) return "";
			let r = w.default.isMoment(e.start) ? e.start : w.default.tz(e.start, t), i = w.default.isMoment(e.end) ? e.end : w.default.tz(e.end, t), a = n ? "h:mm A" : "HH:mm";
			return `${r.clone().tz(t).format(a)} - ${i.clone().tz(t).format(a)}`;
		},
		formatSessionDateTime(e) {
			let t = this.scheduleData?.timezone, n = this.scheduleData?.hasAmPm;
			if (!t || !e?.start) return "";
			let r = w.default.isMoment(e.start) ? e.start : w.default.tz(e.start, t), i = n ? "MMM D, YYYY h:mm A" : "MMM D, YYYY HH:mm";
			return r.clone().tz(t).format(i);
		}
	}
}, [["render", K], ["styles", [".c-featured-speakers h3#featured-speakers-heading{color:inherit;margin-top:0;font-family:inherit;font-size:24px;font-weight:500;line-height:1.1}.c-featured-speakers .featured-speakers-grid{flex-wrap:wrap;justify-content:center;gap:18px;display:flex}.c-featured-speakers .featured-speaker-column{width:400px;max-width:100%}@media (width>=768px){.c-featured-speakers .featured-speaker-column{width:360px;max-width:100%}}.c-featured-speakers .featured-speaker-card{background:#fff;border:1px solid #e0e0e0;border-radius:6px;margin:0;overflow:hidden}.c-featured-speakers .featured-speaker-summary{cursor:pointer;list-style:none}.c-featured-speakers .featured-speaker-summary::-webkit-details-marker{display:none}.c-featured-speakers .featured-speaker-summary .thumbnail{background:0 0;border:none;margin:0;padding:0}.c-featured-speakers .featured-speaker-summary .thumbnail img{aspect-ratio:1;object-fit:cover;border-radius:6px;width:100%;display:block}.c-featured-speakers .featured-speaker-summary .thumbnail .caption{padding:10px 6px 12px}.c-featured-speakers .featured-speaker-summary .thumbnail .caption h4{color:#000000de;margin:8px 0 0;font-size:18px;font-weight:500;line-height:1.3}.c-featured-speakers .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio{color:#0000008a;-webkit-line-clamp:2;line-clamp:2;overflow-wrap:anywhere;text-overflow:ellipsis;-webkit-box-orient:vertical;margin:4px 0 0;font-size:12px;line-height:1.35;display:-webkit-box;overflow:hidden}.c-featured-speakers .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content{font-size:inherit;line-height:inherit;color:inherit}.c-featured-speakers .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content p,.c-featured-speakers .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content ul,.c-featured-speakers .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content ol,.c-featured-speakers .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content table,.c-featured-speakers .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content pre{margin-top:.25em;margin-bottom:.25em}.c-featured-speakers .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content p:first-child,.c-featured-speakers .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content ul:first-child,.c-featured-speakers .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content ol:first-child,.c-featured-speakers .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content table:first-child,.c-featured-speakers .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content pre:first-child{margin-top:0}.c-featured-speakers .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content p:last-child,.c-featured-speakers .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content ul:last-child,.c-featured-speakers .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content ol:last-child,.c-featured-speakers .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content table:last-child,.c-featured-speakers .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content pre:last-child{margin-bottom:0}.c-featured-speakers .featured-speaker-card[open] .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio{-webkit-line-clamp:unset;line-clamp:unset;-webkit-box-orient:unset;white-space:normal;text-overflow:clip;display:block;overflow:visible}.c-featured-speakers .featured-speaker-card[open] .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content{display:block}.c-featured-speakers .avatar-placeholder{aspect-ratio:1;color:#9e9e9e;background:#f5f5f5;justify-content:center;align-items:center;width:100%;display:flex}.c-featured-speakers .avatar-placeholder svg{width:45%;height:45%}.c-featured-speakers .featured-speaker-details{background:#f5f5f5;border-top:1px solid #e0e0e0;margin-top:8px;padding:12px}.c-featured-speakers .featured-speaker-divider{border-color:#e0e0e0;margin:12px 0 8px}.c-featured-speakers .featured-speaker-sessions{margin-top:0;padding:0}.c-featured-speakers .featured-speaker-sessions h4{color:#000000de;margin:0 0 10px;font-size:16px;font-weight:600}.c-featured-speakers .featured-speaker-session{margin-bottom:12px}.c-featured-speakers .featured-speaker-session:last-child{margin-bottom:0}.c-featured-speakers .featured-speaker-session-pending .featured-speaker-session-time{color:var(--pretalx-clr-primary,var(--clr-primary))}.c-featured-speakers .featured-speaker-session-time{color:#0000008a;margin-bottom:4px;font-size:13px;font-weight:600;line-height:1.35;display:block}.c-featured-speakers .featured-speaker-session-link{background-color:var(--session-color,var(--pretalx-clr-primary));color:#fff;border-radius:4px;padding:9px 11px;text-decoration:none;display:block}.c-featured-speakers .featured-speaker-session-link:hover{opacity:.92;text-decoration:none}.c-featured-speakers .featured-speaker-session-slot{opacity:.92;margin-bottom:2px;font-size:12px;line-height:1.2;display:block}.c-featured-speakers .featured-speaker-session-title{font-size:14px;font-weight:600;line-height:1.3;display:block}.c-featured-speakers .featured-speaker-profile-link{text-align:right;margin-top:12px}.c-featured-speakers .featured-speaker-profile-link a{color:var(--pretalx-clr-primary,var(--clr-primary));text-decoration:none}.c-featured-speakers .featured-speaker-profile-link a:hover{text-decoration:underline}.c-featured-speakers .featured-speakers-more{text-align:center;margin-top:12px}.c-featured-speakers .featured-speakers-more .more-link{color:var(--pretalx-clr-primary,var(--clr-primary));font-weight:600;text-decoration:none}.c-featured-speakers .featured-speakers-more .more-link:hover{text-decoration:underline}"]]]);
//#endregion
export { q as default };
