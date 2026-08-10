import { o as e } from "./pretalx-schedule-rolldown-runtime.js";
import { D as t, E as n, G as r, I as i, L as a, P as o, Q as s, X as c, Y as l, Z as u, a as d, dt as ee, ft as f, h as p, ht as m, lt as h, m as g, o as _, tt as v, u as te, ut as y, xt as b, yt as x } from "./pretalx-schedule-chunk-grid.js";
import { t as S } from "./pretalx-schedule-MarkdownContent.js";
import { n as C, t as w } from "./pretalx-schedule-DetailTopActions.js";
//#region src/components/TalkDetail.vue?vue&type=template&lang.js
var T = /* @__PURE__ */ e(i()), E = { class: "c-talk-detail" }, D = {
	key: 0,
	class: "talk-wrapper"
}, O = { class: "talk" }, k = { class: "talk-header" }, A = { class: "info" }, j = { class: "info-main" }, M = {
	key: 0,
	class: "session-language"
}, N = ["innerHTML"], P = {
	key: 1,
	class: "field-section abstract-section"
}, F = { class: "field-content" }, I = {
	key: 2,
	class: "field-section description-section"
}, L = { class: "field-content" }, R = { class: "video-embed" }, z = ["src"], B = {
	key: 0,
	class: "video-embed"
}, V = ["src"], H = ["href"], U = { class: "field-heading" }, W = { class: "field-content" }, G = { class: "field-heading" }, K = { class: "field-content" }, q = ["href"], J = ["href"], Y = { key: 2 }, X = { key: 3 }, Z = {
	key: 3,
	class: "public-answers"
}, Q = { class: "field-heading" }, ne = {
	key: 0,
	class: "field-content"
}, re = ["href"], ie = {
	key: 1,
	class: "field-content"
}, ae = {
	key: 4,
	class: "video-stream"
}, oe = ["href"], se = ["href"], ce = {
	key: 0,
	class: "downloads"
}, le = { class: "header" }, ue = ["href"], de = { class: "filename-container" }, fe = { class: "filename" }, pe = { class: "file-meta" }, me = {
	key: 1,
	class: "speakers"
}, he = { class: "header" }, ge = { class: "speakers-list" }, _e = ["href", "onClick"], ve = ["src"], ye = {
	key: 1,
	class: "avatar-placeholder avatar-circle"
}, be = {
	key: 2,
	class: "starrers"
}, xe = { class: "header" }, Se = { class: "avatars-line" }, Ce = [
	"href",
	"onClick",
	"title"
], we = ["src", "alt"], Te = {
	key: 1,
	class: "avatar-placeholder avatar-circle"
}, Ee = ["title"], De = {
	key: 0,
	class: "starrers-expanded"
}, $ = { class: "starrers-list" }, Oe = ["href", "onClick"], ke = ["src", "alt"], Ae = {
	key: 1,
	class: "avatar-placeholder avatar-circle"
}, je = { class: "name" }, Me = {
	key: 1,
	class: "starrer-row"
}, Ne = { class: "name" };
function Pe(e, t, n, i, a, o) {
	let d = f("detail-top-actions"), p = f("detail-back-nav"), g = f("markdown-content"), _ = f("bunt-progress-circular");
	return h(), s("div", E, [v(p, null, {
		default: m(() => [v(d, {
			"export-options": o.talkExportOptions,
			"qrcodes-url": o.talkQrcodesUrl,
			"show-fav": !o.favsReadOnly,
			faved: o.isFaved,
			onToggleFav: o.toggleFav
		}, null, 8, [
			"export-options",
			"qrcodes-url",
			"show-fav",
			"faved",
			"onToggleFav"
		])]),
		_: 1
	}), o.talkDetailReady ? (h(), s("div", D, [
		l("div", O, [
			l("div", k, [l("h1", null, b(a.getLocalizedString(o.resolvedTalk.title)), 1)]),
			l("div", A, [l("span", j, b(o.sessionTimeLabel), 1), !o.isSchedulePending && o.sessionLanguageLabel ? (h(), s("span", M, " · " + b(o.t.session_language) + ": " + b(o.sessionLanguageLabel), 1)) : u("", !0)]),
			o.resolvedTalk.recording_iframe ? (h(), s("div", {
				key: 0,
				class: "recording-embed",
				innerHTML: o.resolvedTalk.recording_iframe
			}, null, 8, N)) : u("", !0),
			o.resolvedTalk.abstract ? (h(), s("div", P, [t[3] ||= l("h2", { class: "field-heading" }, "Abstract", -1), l("div", F, [v(g, { markdown: o.resolvedTalk.abstract }, null, 8, ["markdown"])])])) : u("", !0),
			o.resolvedTalk.description ? (h(), s("div", I, [t[4] ||= l("h2", { class: "field-heading" }, "Description", -1), l("div", L, [v(g, { markdown: o.resolvedTalk.description }, null, 8, ["markdown"])])])) : u("", !0),
			(h(!0), s(r, null, y(o.videoAnswers, (e, t) => (h(), s("div", {
				class: "field-section video-embed-section",
				key: "api-video-" + t + "-" + (e.embed_url || e.answer)
			}, [l("div", R, [l("iframe", {
				src: o.videoEmbedSrc(e),
				title: "Session video",
				allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
				allowfullscreen: "",
				loading: "lazy",
				referrerpolicy: "strict-origin-when-cross-origin"
			}, null, 8, z)])]))), 128)),
			(h(!0), s(r, null, y(o.publicVideoScheduleAnswers, (e, t) => (h(), s("div", {
				class: "field-section video-embed-section",
				key: "sched-video-" + e.question_id + "-" + t + "-" + (e.embed_url || e.answer)
			}, [o.videoEmbedSrc(e) ? (h(), s("div", B, [l("iframe", {
				src: o.videoEmbedSrc(e),
				title: "Session video",
				allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
				allowfullscreen: "",
				loading: "lazy",
				referrerpolicy: "strict-origin-when-cross-origin"
			}, null, 8, V)])) : e.answer ? (h(), s("a", {
				key: 1,
				class: "answer-link",
				href: e.answer,
				target: "_blank",
				rel: "noopener noreferrer"
			}, b(e.answer), 9, H)) : u("", !0)]))), 128)),
			(h(!0), s(r, null, y(o.longAnswers, (e) => (h(), s("div", {
				class: "field-section",
				key: e.id
			}, [l("h2", U, b(a.getLocalizedString(e.question.question) || String(e.question.question)), 1), l("div", W, [v(g, { markdown: e.answer }, null, 8, ["markdown"])])]))), 128)),
			(h(!0), s(r, null, y(o.inlineAnswers, (e) => (h(), s("div", {
				class: "field-section",
				key: e.id
			}, [l("h2", G, b(a.getLocalizedString(e.question.question) || String(e.question.question)), 1), l("div", K, [(e.question.variant === "url" || e.question.variant === "file" || e.question.variant === "video") && e.answer_file && e.answer_file.url ? (h(), s("a", {
				key: 0,
				class: "answer-link",
				href: e.answer_file.url,
				target: "_blank",
				rel: "noopener noreferrer"
			}, b(e.answer || e.answer_file.url), 9, q)) : (e.question.variant === "url" || e.question.variant === "file" || e.question.variant === "video") && e.answer ? (h(), s("a", {
				key: 1,
				class: "answer-link",
				href: e.answer,
				target: "_blank",
				rel: "noopener noreferrer"
			}, b(e.answer), 9, J)) : e.question.variant === "boolean" ? (h(), s("span", Y, b(a.parseBooleanAnswer(e.answer) ? o.t.yes : o.t.no), 1)) : e.answer ? (h(), s("span", X, b(e.answer), 1)) : u("", !0)])]))), 128)),
			o.publicOtherScheduleAnswers.length > 0 ? (h(), s("div", Z, [(h(!0), s(r, null, y(o.publicOtherScheduleAnswers, (e) => (h(), s("div", {
				class: "field-section",
				key: e.question_id
			}, [l("h2", Q, b(e.question), 1), e.variant === "url" ? (h(), s("div", ne, [l("a", {
				class: "answer-link",
				href: e.answer,
				target: "_blank",
				rel: "noopener noreferrer"
			}, b(e.answer), 9, re)])) : (h(), s("div", ie, [v(g, { markdown: e.answer }, null, 8, ["markdown"])]))]))), 128))])) : u("", !0),
			o.resolvedTalk.stream_url && o.computedJoinRoomLink && o.isLive ? (h(), s("div", ae, [l("a", {
				class: "view-video-btn",
				href: o.computedJoinRoomLink
			}, [t[5] ||= l("svg", {
				viewBox: "0 0 24 24",
				width: "18",
				height: "18",
				fill: "currentColor"
			}, [l("path", { d: "M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" })], -1), l("span", null, b(o.t.view_video), 1)], 8, oe)])) : u("", !0),
			ee(e.$slots, "actions", {}, () => [o.showJoinRoom && o.computedJoinRoomLink ? (h(), s("a", {
				key: 0,
				class: "join-room-btn",
				href: o.computedJoinRoomLink,
				onClick: t[0] ||= (...e) => o.onJoinRoomClick && o.onJoinRoomClick(...e)
			}, b(o.t.join_room), 9, se)) : u("", !0)])
		]),
		o.displayResources.length > 0 ? (h(), s("div", ce, [l("div", le, b(o.t.downloads), 1), (h(!0), s(r, null, y(o.displayResources, ({ resource: e, link: n, description: r }) => (h(), s("a", {
			class: "download",
			href: o.getAbsoluteResourceUrl(e || n),
			target: "_blank",
			rel: "noopener noreferrer"
		}, [
			t[6] ||= l("div", { class: "icon-container" }, [l("svg", {
				class: "download-icon",
				viewBox: "0 0 24 24",
				width: "18",
				height: "18",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2",
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			}, [l("path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }), l("path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" })])], -1),
			l("div", de, [l("div", fe, b(r), 1), l("div", pe, b(o.getFileExtensionLabel(e || n)), 1)]),
			t[7] ||= l("svg", {
				class: "download-action-icon",
				viewBox: "0 0 24 24",
				width: "18",
				height: "18",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2",
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			}, [
				l("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
				l("polyline", { points: "7 10 12 15 17 10" }),
				l("line", {
					x1: "12",
					y1: "15",
					x2: "12",
					y2: "3"
				})
			], -1)
		], 8, ue))), 256))])) : u("", !0),
		o.resolvedTalk.speakers && o.resolvedTalk.speakers.length > 0 ? (h(), s("div", me, [l("div", he, b(o.t.speakers) + " (" + b(o.resolvedTalk.speakers.length) + ")", 1), l("div", ge, [(h(!0), s(r, null, y(o.resolvedTalk.speakers, (e) => (h(), s("div", {
			class: "speaker",
			key: e.code
		}, [l("a", {
			class: "speaker-link",
			href: o.getSpeakerLink(e),
			onClick: (t) => o.onSpeakerClick(t, e)
		}, [e.avatar_thumbnail_default || e.avatar || e.avatar_url ? (h(), s("img", {
			key: 0,
			class: "avatar-circle",
			src: e.avatar_thumbnail_default || e.avatar || e.avatar_url,
			loading: "lazy",
			decoding: "async"
		}, null, 8, ve)) : (h(), s("div", ye, [...t[8] ||= [l("svg", { viewBox: "0 0 24 24" }, [l("path", {
			fill: "currentColor",
			d: "M12,1A5.8,5.8 0 0,1 17.8,6.8A5.8,5.8 0 0,1 12,12.6A5.8,5.8 0 0,1 6.2,6.8A5.8,5.8 0 0,1 12,1M12,15C18.63,15 24,17.67 24,21V23H0V21C0,17.67 5.37,15 12,15Z"
		})], -1)]])), l("div", { class: x(["name", { "no-name": !e.name }]) }, b(e.name || o.t.speaker_name_not_provided), 3)], 8, _e), e.biography ? (h(), c(g, {
			key: 0,
			class: "biography",
			markdown: e.biography
		}, null, 8, ["markdown"])) : u("", !0)]))), 128))])])) : u("", !0),
		o.popularityFeatureEnabled && a.starrers && a.starrers.total > 0 ? (h(), s("div", be, [
			l("div", xe, [l("span", null, b(o.t.starred_by) + " (" + b(a.starrers.total) + ")", 1), l("button", {
				class: "expand-toggle",
				type: "button",
				onClick: t[1] ||= (...e) => o.toggleStarrersExpanded && o.toggleStarrersExpanded(...e)
			}, b(a.starrersExpanded ? o.t.hide_list : o.t.view_all), 1)]),
			l("div", Se, [(h(!0), s(r, null, y(o.starrersInlineItems, (e) => (h(), s(r, { key: e.code }, [o.starrerUrl(e) ? (h(), s("a", {
				key: 0,
				class: "starrer",
				href: o.starrerUrl(e),
				onClick: (t) => o.onStarrerClick(t, e),
				title: o.starrerTitle(e)
			}, [e.avatar_url ? (h(), s("img", {
				key: 0,
				class: "avatar-circle",
				src: e.avatar_url,
				alt: o.starrerTitle(e)
			}, null, 8, we)) : (h(), s("div", Te, [...t[9] ||= [l("svg", { viewBox: "0 0 24 24" }, [l("path", {
				fill: "currentColor",
				d: "M12,1A5.8,5.8 0 0,1 17.8,6.8A5.8,5.8 0 0,1 12,12.6A5.8,5.8 0 0,1 6.2,6.8A5.8,5.8 0 0,1 12,1M12,15C18.63,15 24,17.67 24,21V23H0V21C0,17.67 5.37,15 12,15Z"
			})], -1)]]))], 8, Ce)) : (h(), s("span", {
				key: 1,
				class: "starrer",
				title: o.t.anonymous_attendee
			}, [...t[10] ||= [l("div", { class: "avatar-placeholder avatar-circle" }, [l("svg", { viewBox: "0 0 24 24" }, [l("path", {
				fill: "currentColor",
				d: "M12,1A5.8,5.8 0 0,1 17.8,6.8A5.8,5.8 0 0,1 12,12.6A5.8,5.8 0 0,1 6.2,6.8A5.8,5.8 0 0,1 12,1M12,15C18.63,15 24,17.67 24,21V23H0V21C0,17.67 5.37,15 12,15Z"
			})])], -1)]], 8, Ee))], 64))), 128)), o.starrersOverflowCount > 0 ? (h(), s("button", {
				key: 0,
				class: "more-chip",
				type: "button",
				onClick: t[2] ||= (...e) => o.toggleStarrersExpanded && o.toggleStarrersExpanded(...e)
			}, "+" + b(o.starrersOverflowCount), 1)) : u("", !0)]),
			a.starrersExpanded ? (h(), s("div", De, [l("div", $, [(h(!0), s(r, null, y(a.starrers.items, (e) => (h(), s(r, { key: e.code }, [o.starrerUrl(e) ? (h(), s("a", {
				key: 0,
				class: "starrer-row",
				href: o.starrerUrl(e),
				onClick: (t) => o.onStarrerClick(t, e)
			}, [e.avatar_url ? (h(), s("img", {
				key: 0,
				class: "avatar-circle",
				src: e.avatar_url,
				alt: o.starrerTitle(e)
			}, null, 8, ke)) : (h(), s("div", Ae, [...t[11] ||= [l("svg", { viewBox: "0 0 24 24" }, [l("path", {
				fill: "currentColor",
				d: "M12,1A5.8,5.8 0 0,1 17.8,6.8A5.8,5.8 0 0,1 12,12.6A5.8,5.8 0 0,1 6.2,6.8A5.8,5.8 0 0,1 12,1M12,15C18.63,15 24,17.67 24,21V23H0V21C0,17.67 5.37,15 12,15Z"
			})], -1)]])), l("span", je, b(o.starrerTitle(e)), 1)], 8, Oe)) : (h(), s("span", Me, [t[12] ||= l("div", { class: "avatar-placeholder avatar-circle" }, [l("svg", { viewBox: "0 0 24 24" }, [l("path", {
				fill: "currentColor",
				d: "M12,1A5.8,5.8 0 0,1 17.8,6.8A5.8,5.8 0 0,1 12,12.6A5.8,5.8 0 0,1 6.2,6.8A5.8,5.8 0 0,1 12,1M12,15C18.63,15 24,17.67 24,21V23H0V21C0,17.67 5.37,15 12,15Z"
			})])], -1), l("span", Ne, b(o.t.anonymous_attendee), 1)]))], 64))), 128))])])) : u("", !0)
		])) : u("", !0)
	])) : (h(), c(_, {
		key: 1,
		size: "huge",
		page: !0
	}))]);
}
var Fe = /*#__PURE__*/ a({
	name: "TalkDetail",
	components: {
		MarkdownContent: S,
		DetailBackNav: C,
		DetailTopActions: w
	},
	inject: {
		scheduleData: { default: null },
		scheduleFav: { default() {
			return () => {};
		} },
		scheduleUnfav: { default() {
			return () => {};
		} },
		generateSpeakerLinkUrl: { default() {
			return ({ speaker: e }) => `#speakers/${e.code}`;
		} },
		onSpeakerLinkClick: { default() {
			return () => {};
		} },
		showJoinRoom: { default: !1 },
		getJoinRoomLink: { default: () => () => "" },
		generateStarrerLinkUrl: { default: () => (e) => e.url || "" },
		onStarrerLinkClick: { default: () => () => {} },
		favsReadOnly: { default: !1 },
		translationMessages: { default: () => ({}) },
		isWipPreview: { default: !1 },
		exportsDisabled: { default: !1 },
		remoteApiUrl: { default: null }
	},
	props: {
		talk: Object,
		talkId: String,
		baseUrl: {
			type: String,
			default: ""
		},
		apiContent: {
			type: Object,
			default: null
		}
	},
	emits: ["joinRoom"],
	data() {
		return {
			getLocalizedString: p,
			getIconByFileEnding: g,
			parseBooleanAnswer: n,
			starrers: {
				total: 0,
				public_total: 0,
				items: []
			},
			starrersLoading: !1,
			starrersExpanded: !1,
			fetchedApiContent: null,
			fetchedSubmission: null,
			apiContentLoaded: !1
		};
	},
	computed: {
		talkQrcodesUrl() {
			let e = this.resolvedTalk?.code || this.resolvedTalk?.id || this.talkId;
			return _(this.baseUrl, "talk", e);
		},
		t() {
			let e = this.translationMessages || {};
			return {
				join_room: e.join_room || "Join room",
				speaker_name_not_provided: e.speaker_name_not_provided || "Speaker name not provided",
				downloads: e.downloads || "Downloads",
				speakers: e.speakers || "Speakers",
				view_video: e.view_video || "View Video",
				starred_by: e.starred_by || "Starred by",
				anonymous_attendee: e.anonymous_attendee || "Anonymous (name not shared)",
				view_all: e.view_all || "View all",
				hide_list: e.hide_list || "Hide",
				session_language: e.session_language || "Language",
				yes: e.yes || "Yes",
				no: e.no || "No"
			};
		},
		uiLocale() {
			return typeof document > "u" ? "en" : (document.documentElement.lang || "en").trim().split(",")[0] || "en";
		},
		sessionLanguageLabel() {
			let e = this.resolvedTalk?.content_locale;
			if (!e || typeof e != "string") return "";
			let t = e.replace(/_/g, "-");
			try {
				return new Intl.DisplayNames([this.uiLocale], { type: "language" }).of(t) || e;
			} catch {
				try {
					let n = t.split("-")[0] || t;
					return new Intl.DisplayNames([this.uiLocale], { type: "language" }).of(n) || e;
				} catch {
					return e;
				}
			}
		},
		inlineStarrersLimit() {
			return 15;
		},
		starrersInlineItems() {
			return (this.starrers?.items || []).slice(0, this.inlineStarrersLimit);
		},
		starrersOverflowCount() {
			if (this.starrersExpanded) return 0;
			let e = this.starrers?.total || 0;
			return Math.max(0, e - this.starrersInlineItems.length);
		},
		popularityFeatureEnabled() {
			return !!this.scheduleData?.schedule?.feature_flags?.session_popularity_enabled;
		},
		resolvedTalk() {
			if (this.talk) return this.talk;
			if (this.talkId && this.scheduleData) {
				let e = this.scheduleData.sessionsLookup;
				if (e && e[this.talkId]) return e[this.talkId];
				let t = this.scheduleData.sessions || [];
				for (let e = 0; e < t.length; e++) if (t[e].code === this.talkId || t[e].id === this.talkId) return t[e];
				return null;
			}
			return this.fetchedSubmission ? this.fetchedSubmission : null;
		},
		computedJoinRoomLink() {
			return this.resolvedTalk && this.getJoinRoomLink(this.resolvedTalk) || "";
		},
		isFaved() {
			if (!this.resolvedTalk) return !1;
			let e = this.scheduleData?.favSet, t = this.resolvedTalk.code || this.resolvedTalk.id || this.talkId;
			return e && typeof e.has == "function" ? e.has(t) : (this.scheduleData?.favs || []).includes(t);
		},
		datetime() {
			return !this.resolvedTalk || this.isSchedulePending ? "" : (0, T.default)(this.resolvedTalk.start).format("L LT") + " - " + (0, T.default)(this.resolvedTalk.end).format("LT");
		},
		isSchedulePending() {
			return !!(this.resolvedTalk?.schedule_pending || !this.resolvedTalk?.start);
		},
		schedulePendingText() {
			return (this.translationMessages || {}).schedule_pending_secondary || "Coming soon";
		},
		sessionTimeLabel() {
			return this.isSchedulePending ? this.schedulePendingText : [this.datetime, this.roomName].filter(Boolean).join(" ");
		},
		roomName() {
			if (!this.resolvedTalk) return "";
			let e = this.resolvedTalk.room;
			return e ? typeof e == "string" ? e : p(e.name || e) : "";
		},
		isLive() {
			let e = this.scheduleData?.now;
			return !e || !this.resolvedTalk ? !1 : this.resolvedTalk.start < e && this.resolvedTalk.end > e;
		},
		effectiveApiContent() {
			return this.apiContent || this.fetchedApiContent;
		},
		talkDetailReady() {
			return this.resolvedTalk && (this.effectiveApiContent || this.apiContentLoaded || !this.computedApiBaseUrl);
		},
		computedApiBaseUrl() {
			if (this.remoteApiUrl) return this.remoteApiUrl;
			if (!this.baseUrl) return null;
			try {
				let e = new URL(this.baseUrl, window.location.origin), t = e.pathname.split("/").filter((e) => e.length > 0), n = t[t.length - 1] || "";
				return `${e.origin}/api/v1/events/${n}/`;
			} catch {
				return null;
			}
		},
		longAnswers() {
			let e = this.effectiveApiContent?.answers;
			return Array.isArray(e) ? e.filter((e) => e.question && e.question.is_public !== !1 && (e.question.variant === "text" || e.question.variant === "string")) : [];
		},
		videoAnswers() {
			let e = this.effectiveApiContent?.answers;
			return Array.isArray(e) ? this.expandVideoAnswers(e.filter((e) => e.question && e.question.is_public !== !1 && e.question.variant === "video")) : [];
		},
		inlineAnswers() {
			let e = this.effectiveApiContent?.answers;
			return Array.isArray(e) ? e.filter((e) => !(!e.question || e.question.is_public === !1 || e.question.variant === "text" || e.question.variant === "string" || e.question.variant === "video" && this.expandVideoAnswers([e]).length)) : [];
		},
		publicScheduleAnswers() {
			if (this.effectiveApiContent?.answers?.length) return [];
			let e = this.resolvedTalk?.answers || [];
			if (!this.resolvedTalk?.resources?.length && !this.displayResources.length) return e;
			let t = (this.t.downloads || "").trim().toLowerCase();
			return e.filter((e) => (e.question || "").trim().toLowerCase() !== t);
		},
		publicVideoScheduleAnswers() {
			return this.publicScheduleAnswers.filter((e) => e.variant === "video");
		},
		publicOtherScheduleAnswers() {
			return this.publicScheduleAnswers.filter((e) => e.variant !== "video");
		},
		displayResources() {
			return (this.effectiveApiContent?.resources ?? this.resolvedTalk?.resources ?? []).map((e) => {
				let t = e.resource || e.link;
				return t && t.split(/[?#]/)[0].toLowerCase().endsWith(".pdf") && !t.includes("#") ? {
					...e,
					resource: e.resource ? `${e.resource}#resource` : void 0,
					link: e.link ? `${e.link}#resource` : void 0
				} : e;
			});
		},
		talkExportOptions() {
			if (this.exportsDisabled || this.isSchedulePending) return [];
			let e = this.resolvedTalk?.code || this.resolvedTalk?.id || this.talkId, t = this.resolvedTalk?.exporters || (this.baseUrl && e ? te(this.baseUrl, e) : null);
			return d(t);
		}
	},
	watch: {
		talkId: { handler() {
			this.fetchedApiContent = null, this.fetchedSubmission = null, this.apiContentLoaded = !1;
		} },
		resolvedTalk: {
			handler() {
				this.starrersExpanded = !1, this.loadStarrers({ limit: this.inlineStarrersLimit }), this.apiContent || this.fetchApiContent();
			},
			immediate: !0
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
		starrerTitle(e) {
			return !e || !e.url ? this.t.anonymous_attendee : e.name || this.t.anonymous_attendee;
		},
		starrerUrl(e) {
			return e && (this.generateStarrerLinkUrl(e) || e.url) || "";
		},
		onStarrerClick(e, t) {
			this.onStarrerLinkClick(e, t);
		},
		getStarrersUrl({ limit: e } = {}) {
			let t = this.resolvedTalk?.code || this.resolvedTalk?.id || this.talkId;
			if (!this.baseUrl || !t) return "";
			try {
				let n = new URL(`talk/${t}/starrers.json`, this.baseUrl);
				return typeof e == "number" && n.searchParams.set("limit", String(e)), n.href;
			} catch {
				let n = this.baseUrl.replace(/\/$/, "");
				return typeof e == "number" ? `${n}/talk/${t}/starrers.json?limit=${encodeURIComponent(String(e))}` : `${n}/talk/${t}/starrers.json`;
			}
		},
		async loadStarrers({ limit: e } = {}) {
			if (!this.popularityFeatureEnabled) return;
			let t = this.getStarrersUrl({ limit: e });
			if (t) {
				this.starrersLoading = !0;
				try {
					let e = await fetch(t);
					if (!e.ok) return;
					let n = await e.json();
					if (!n || typeof n != "object") return;
					let r = Array.isArray(n.items) ? n.items : [];
					this.starrers = {
						total: Number.isFinite(n.total) ? n.total : 0,
						public_total: Number.isFinite(n.public_total) ? n.public_total : 0,
						items: r.filter((e) => e && typeof e == "object" && e.code)
					};
				} catch {} finally {
					this.starrersLoading = !1;
				}
			}
		},
		async toggleStarrersExpanded() {
			this.starrersExpanded = !this.starrersExpanded, this.starrersExpanded && (this.starrers?.items || []).length < (this.starrers?.total || 0) && await this.loadStarrers({ limit: 0 });
		},
		getAbsoluteResourceUrl(e) {
			return t(e, this.baseUrl);
		},
		getFileExtensionLabel(e) {
			if (!e) return "Resource";
			if (/^https?:\/\//i.test(e) && !/\.[a-z0-9]+$/i.test(e)) return "External Link";
			let t = e.split(/[#?]/)[0].split(".");
			return t.length < 2 ? "Resource" : `${t[t.length - 1].toUpperCase()} Document`;
		},
		getSpeakerLink(e) {
			return this.generateSpeakerLinkUrl({ speaker: e });
		},
		onSpeakerClick(e, t) {
			this.onSpeakerLinkClick(e, t);
		},
		onJoinRoomClick(e) {
			this.$emit("joinRoom", e);
		},
		async toggleFav() {
			if (this.favsReadOnly || !this.resolvedTalk) return;
			let e = this.resolvedTalk.code || this.resolvedTalk.id || this.talkId;
			this.isFaved ? await this.scheduleUnfav(e) : await this.scheduleFav(e), await this.loadStarrers({ limit: this.starrersExpanded ? 0 : this.inlineStarrersLimit });
		},
		async fetchApiContent() {
			if (this.apiContent || this.fetchedApiContent !== null || this.apiContentLoaded) return;
			if (!this.computedApiBaseUrl) {
				this.apiContentLoaded = !0;
				return;
			}
			let e = this.resolvedTalk?.code || this.resolvedTalk?.id || this.talkId;
			if (!e) {
				this.apiContentLoaded = !0;
				return;
			}
			try {
				let t = `${this.computedApiBaseUrl}submissions/${e}/?expand=answers.question,resources`, n = await fetch(t);
				if (!n.ok) return;
				let r = await n.json();
				this.fetchedApiContent = r, !this.talk && !this.scheduleData && (this.fetchedSubmission = r);
			} catch {} finally {
				this.apiContentLoaded = !0;
			}
		}
	}
}, [["render", Pe], ["styles", [".c-talk-detail{background-color:#fff;flex-direction:column;display:flex}.c-talk-detail .talk-wrapper{flex-direction:column;flex:auto;display:flex}.c-talk-detail .talk{flex:none;margin:16px}.c-talk-detail .talk .talk-header{margin-bottom:8px}.c-talk-detail .talk .talk-header h1{margin:0}.c-talk-detail .talk .info{color:#0000008a;font-size:18px}.c-talk-detail .talk .info .session-language{white-space:nowrap}.c-talk-detail .talk .field-section{margin:16px 0 0}.c-talk-detail .talk .field-section .field-heading{color:#0000008a;margin:0 0 6px;font-size:14px;font-weight:700}.c-talk-detail .talk .field-section .field-content{padding:8px 12px}.c-talk-detail .talk .field-section .field-content p{margin:.25em 0}.c-talk-detail .talk .field-section .field-content p:first-child{margin-top:0}.c-talk-detail .talk .field-section .field-content p:last-child{margin-bottom:0}.c-talk-detail .talk .field-section.abstract-section .field-content{font-size:16px;font-weight:600}.c-talk-detail .talk .answer-link{color:var(--pretalx-clr-primary,var(--clr-primary));word-break:break-all;text-decoration:none}.c-talk-detail .talk .answer-link:hover{text-decoration:underline}.c-talk-detail .talk .recording-embed,.c-talk-detail .talk .video-embed{margin:16px 0 0}.c-talk-detail .talk .recording-embed iframe,.c-talk-detail .talk .video-embed iframe{aspect-ratio:16/9;border:none;border-radius:4px;width:100%;display:block}.c-talk-detail .talk .video-stream{margin-top:16px}.c-talk-detail .talk .video-stream .view-video-btn{color:#fff;background-color:#f44336;border-radius:4px;align-items:center;gap:8px;padding:8px 20px;font-weight:600;text-decoration:none;display:inline-flex}.c-talk-detail .talk .video-stream .view-video-btn:hover{opacity:.9}.c-talk-detail .talk .video-stream .view-video-btn svg{flex-shrink:0}.c-talk-detail .talk .join-room-btn{color:#fff;background-color:var(--pretalx-clr-primary,var(--clr-primary));border-radius:4px;margin-top:16px;padding:8px 24px;font-weight:600;text-decoration:none;display:inline-block}.c-talk-detail .talk .join-room-btn:hover{opacity:.9}.c-talk-detail .starrers{flex-direction:column;gap:8px;margin:0 16px 32px;display:flex}.c-talk-detail .starrers .header{justify-content:space-between;align-items:baseline;gap:8px;font-size:16px;font-weight:600;display:flex}.c-talk-detail .starrers .header .expand-toggle{appearance:none;font:inherit;color:var(--pretalx-clr-primary,var(--clr-primary));cursor:pointer;background:0 0;border:none;padding:0;font-weight:600;text-decoration:underline}.c-talk-detail .starrers .avatars-line{flex-wrap:nowrap;align-items:center;gap:6px;display:flex;overflow:auto hidden}.c-talk-detail .starrers .avatars-line .starrer{flex-shrink:0;text-decoration:none;display:inline-flex}.c-talk-detail .starrers .avatars-line .avatar-circle{object-fit:cover;border-radius:50%;flex-shrink:0;width:36px;height:36px}.c-talk-detail .starrers .avatars-line .avatar-placeholder.avatar-circle{background:#0000001a;justify-content:center;align-items:center;display:flex}.c-talk-detail .starrers .avatars-line .avatar-placeholder.avatar-circle svg{color:#0000004d;width:60%;height:60%}.c-talk-detail .starrers .avatars-line .more-chip{appearance:none;color:#000000de;cursor:pointer;background:#fff;border:1px solid #0000001f;border-radius:999px;flex-shrink:0;padding:3px 10px;font-size:14px;font-weight:600}.c-talk-detail .starrers .avatars-line .more-chip:hover{background-color:#f5f5f5}.c-talk-detail .starrers .starrers-expanded{border:1px solid #0000001f;border-radius:4px;padding:8px}.c-talk-detail .starrers .starrers-expanded .starrers-list{flex-direction:column;gap:6px;display:flex}.c-talk-detail .starrers .starrers-expanded .starrers-list .starrer-row{color:#000000de;align-items:center;gap:8px;text-decoration:none;display:flex}.c-talk-detail .starrers .starrers-expanded .starrers-list .starrer-row:hover .name{color:var(--pretalx-clr-primary,var(--clr-primary));text-decoration:underline}.c-talk-detail .starrers .starrers-expanded .starrers-list .starrer-row .avatar-circle{object-fit:cover;border-radius:50%;flex-shrink:0;width:32px;height:32px}.c-talk-detail .starrers .starrers-expanded .starrers-list .starrer-row .avatar-placeholder.avatar-circle{background:#0000001a;justify-content:center;align-items:center;display:flex}.c-talk-detail .starrers .starrers-expanded .starrers-list .starrer-row .avatar-placeholder.avatar-circle svg{color:#0000004d;width:60%;height:60%}.c-talk-detail .starrers .starrers-expanded .starrers-list .starrer-row .name{font-weight:600}.c-talk-detail .speakers{border:1px solid #0000001f;border-radius:4px;flex-direction:column;margin:0 16px 32px;display:flex}.c-talk-detail .speakers .header{border-bottom:1px solid #0000001f;padding:8px}.c-talk-detail .speakers .speaker{flex-direction:column;padding:8px;display:flex}.c-talk-detail .speakers .speaker .speaker-link{color:#000000de;align-items:center;gap:8px;text-decoration:none;display:flex}.c-talk-detail .speakers .speaker .speaker-link:hover .name{color:var(--pretalx-clr-primary,var(--clr-primary));text-decoration:underline}.c-talk-detail .speakers .speaker .avatar-circle{object-fit:cover;border-radius:50%;flex-shrink:0;width:32px;height:32px}.c-talk-detail .speakers .speaker .avatar-placeholder.avatar-circle{background:#0000001a;justify-content:center;align-items:center;display:flex}.c-talk-detail .speakers .speaker .avatar-placeholder.avatar-circle svg{color:#0000004d;width:60%;height:60%}.c-talk-detail .speakers .speaker .name{font-weight:600}.c-talk-detail .speakers .speaker .name.no-name{color:#0000008a;font-style:italic}.c-talk-detail .downloads{background-color:#fff;border:1px solid #0000001f;border-radius:6px;flex-direction:column;margin:0 16px 32px;display:flex;overflow:hidden}.c-talk-detail .downloads .header{color:#000000de;background-color:#fafafa;border-bottom:1px solid #0000001f;padding:10px 12px;font-size:16px;font-weight:600}.c-talk-detail .downloads .download{color:#000000de;border-top:1px solid #0000001f;align-items:center;gap:12px;padding:12px;text-decoration:none;transition:background-color .2s,transform .15s;display:flex}.c-talk-detail .downloads .download:first-child{border-top:none}.c-talk-detail .downloads .download:hover{background-color:color-mix(in srgb, var(--pretalx-clr-primary) 8%, transparent)}.c-talk-detail .downloads .download:hover .icon-container{background-color:var(--pretalx-clr-primary);color:#fff}.c-talk-detail .downloads .download:hover .filename{color:var(--pretalx-clr-primary);text-decoration:none}.c-talk-detail .downloads .download:hover .download-action-icon{opacity:1;color:var(--pretalx-clr-primary)}.c-talk-detail .downloads .download .icon-container{color:#0000008a;background-color:#f5f5f5;border-radius:50%;flex-shrink:0;justify-content:center;align-items:center;width:36px;height:36px;transition:background-color .2s,color .2s;display:flex}.c-talk-detail .downloads .download .icon-container .mdi{font-size:20px;line-height:1}.c-talk-detail .downloads .download .filename-container{flex-direction:column;flex:1;gap:2px;min-width:0;display:flex}.c-talk-detail .downloads .download .filename-container .filename{text-overflow:ellipsis;white-space:nowrap;font-size:14px;font-weight:600;transition:color .2s;overflow:hidden}.c-talk-detail .downloads .download .filename-container .file-meta{color:#0000008a;font-size:11px}.c-talk-detail .downloads .download .download-action-icon{color:#bdbdbd;opacity:0;justify-content:center;align-items:center;margin-left:auto;font-size:20px;transition:opacity .2s,color .2s;display:flex}@media (width<=768px){.c-talk-detail .speakers,.c-talk-detail .downloads,.c-talk-detail .starrers{margin:0 16px 16px}.c-talk-detail .talk{max-width:100%}}@media (width<=480px){.c-talk-detail .talk{margin:10px}.c-talk-detail .talk .talk-header h1{font-size:20px}.c-talk-detail .talk .info{font-size:15px}.c-talk-detail .talk .abstract{font-size:14px}.c-talk-detail .speakers,.c-talk-detail .downloads,.c-talk-detail .starrers{margin:0 10px 12px}}"]]]);
//#endregion
export { Fe as default };
