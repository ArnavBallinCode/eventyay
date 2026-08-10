import { o as e } from "./pretalx-schedule-rolldown-runtime.js";
import { A as t, C as n, F as r, G as i, I as a, J as o, L as s, M as c, N as l, O as u, Q as d, S as f, T as p, X as m, Y as h, Z as g, _, b as v, bt as y, d as b, f as x, ft as S, g as ee, gt as te, h as C, i as w, j as T, lt as E, n as D, nt as O, p as ne, pt as k, r as A, s as j, t as M, tt as N, u as P, ut as F, w as I, x as L, xt as R, y as z, yt as B, z as V } from "./pretalx-schedule-chunk-grid.js";
import { t as H } from "./pretalx-schedule-vendor.js";
import { t as U } from "./pretalx-schedule-chunk-toolbar.js";
import { t as W } from "./pretalx-schedule-chunk-modal.js";
//#region src/components/LinearSchedule.vue?vue&type=template&lang.js
var G = /* @__PURE__ */ e(a()), K = { class: "bucket" }, q = ["data-date"], J = {
	key: 0,
	class: "day"
}, re = {
	key: 1,
	class: "break"
}, Y = { class: "title" };
function X(e, t, n, r, a, o) {
	let s = S("session"), c = k("scrollbar");
	return te((E(), d("div", { class: B(["c-linear-schedule", "density-" + n.density]) }, [(E(!0), d(i, null, F(o.sessionBuckets, ({ date: t, sessions: r }, c) => (E(), d("div", K, [h("div", {
		class: "bucket-label",
		ref_for: !0,
		ref: o.getBucketName(t),
		"data-date": t.toISOString()
	}, [o.showDayHeaders && (c === 0 || t.clone().startOf("day").diff(o.sessionBuckets[c - 1].date.clone().startOf("day"), "days") > 0) ? (E(), d("div", J, R(t.clone().tz(n.timezone).format("dddd, D MMMM")), 1)) : g("", !0), (E(!0), d(i, null, F(r, (t) => (E(), d(i, null, [o.isProperSession(t) ? (E(), m(s, {
		key: 0,
		session: t,
		now: n.now,
		timezone: n.timezone,
		locale: n.locale,
		hasAmPm: n.hasAmPm,
		showFavCount: n.showFavCount,
		faved: t.id && o.favSet.has(t.id),
		onHomeServer: n.onHomeServer,
		showDate: o.showsMultiDay,
		onFav: (n) => e.$emit("fav", t.id),
		onUnfav: (n) => e.$emit("unfav", t.id)
	}, null, 8, [
		"session",
		"now",
		"timezone",
		"locale",
		"hasAmPm",
		"showFavCount",
		"faved",
		"onHomeServer",
		"showDate",
		"onFav",
		"onUnfav"
	])) : n.showBreaks ? (E(), d("div", re, [h("div", Y, R(a.getLocalizedString(t.title)), 1)])) : g("", !0)], 64))), 256))], 8, q)]))), 256))], 2)), [[
		c,
		,
		void 0,
		{ y: !0 }
	]]);
}
var ie = /*#__PURE__*/ s({
	components: { Session: D },
	props: {
		sessions: Array,
		rooms: Array,
		locale: String,
		hasAmPm: Boolean,
		timezone: String,
		showFavCount: {
			type: Boolean,
			default: !1
		},
		favs: {
			type: Array,
			default() {
				return [];
			}
		},
		currentDay: String,
		forceScrollDay: {
			type: Number,
			default: 0
		},
		now: Object,
		scrollParent: Element,
		onHomeServer: Boolean,
		disableAutoScroll: Boolean,
		sortBy: {
			type: String,
			default: "title",
			validator: (e) => [
				"title",
				"title_desc",
				"popularity"
			].includes(e)
		},
		includeRoomSortKey: {
			type: Boolean,
			default: !1
		},
		includeDateSortKey: {
			type: Boolean,
			default: !1
		},
		includePopularitySortKey: {
			type: Boolean,
			default: !1
		},
		showBreaks: {
			type: Boolean,
			default: !0
		},
		density: {
			type: String,
			default: "default"
		}
	},
	data() {
		return {
			getLocalizedString: C,
			scrolledDay: null,
			_scrollDayUpdate: !1
		};
	},
	computed: {
		popularitySortEnabled() {
			return this.includePopularitySortKey || this.sortBy === "popularity";
		},
		favSet() {
			return new Set(this.favs || []);
		},
		showsMultiDay() {
			return !this.includeDateSortKey;
		},
		bucketFirstByDay() {
			let e = Object.create(null);
			for (let t of this.sessionBuckets) {
				let n = t.date.format("YYYY-MM-DD");
				e[n] === void 0 && (e[n] = t);
			}
			return e;
		},
		showDayHeaders() {
			return this.includeDateSortKey;
		},
		sessionBuckets() {
			if (!this.includeDateSortKey) {
				let e = this.sortBucketSessions(this.sessions), t = e.find((e) => e.start)?.start;
				return [{
					date: t ? t.clone().startOf("day") : (0, G.default)(),
					sessions: e
				}];
			}
			let e = {}, t = {}, n = [];
			for (let r of this.sessions) {
				if (!r.start) {
					r.id && n.push(r);
					continue;
				}
				let i = this.getBucketName(r.start);
				if (e[i] || (e[i] = [], t[i] = /* @__PURE__ */ new Set()), r.id) e[i].push(r);
				else {
					let n = `${r.start}${r.end}${r.title}`;
					r.break_id = n, t[i].has(n) || (t[i].add(n), e[i].push(r));
				}
			}
			let r = ["title", "title_desc"].includes(this.sortBy) && !this.includeDateSortKey, i = Object.entries(e).map(([e, t]) => {
				let n = this.sortBucketSessions(t), i = {
					date: t[0].start,
					sessions: n
				};
				if (r) {
					let e = null;
					for (let t of n) if (this.isProperSession(t)) {
						e = t;
						break;
					}
					i._sortKey = e || n[0];
				}
				return i;
			});
			if (r) return i.sort((e, t) => {
				let n = this.sessionComparator(e._sortKey, t._sortKey);
				return n === 0 ? e.date.diff(t.date) : n;
			});
			if (n.length) {
				let e = this.sortBucketSessions(n);
				i.push({
					date: (0, G.default)(),
					sessions: e
				});
			}
			return i;
		},
		sortObserverKey() {
			return [
				this.sortBy,
				this.includeRoomSortKey,
				this.includeDateSortKey,
				this.includePopularitySortKey
			].join("|");
		}
	},
	watch: {
		forceScrollDay() {
			this.scrollToDay(this.currentDay, { force: !0 });
		},
		async sortObserverKey() {
			await this.$nextTick(), this.observer && this.observer.disconnect(), this.observer = new IntersectionObserver(this.onIntersect, {
				root: this.scrollParent,
				rootMargin: "-45% 0px"
			});
			let e;
			for (let [t, n] of Object.entries(this.$refs)) {
				if (!t.startsWith("bucket")) continue;
				let r = (0, G.default)(n[0].dataset.date).tz(this.timezone);
				e && e.format("YYYY-MM-DD") === r.format("YYYY-MM-DD") || (e = r, this.observer.observe(n[0]));
			}
		},
		currentDay(e) {
			if (this._scrollDayUpdate) {
				this._scrollDayUpdate = !1;
				return;
			}
			this.scrollToDay(e);
		}
	},
	async mounted() {
		await this.$nextTick(), this.observer = new IntersectionObserver(this.onIntersect, {
			root: this.scrollParent,
			rootMargin: "-45% 0px"
		});
		let e;
		for (let [t, n] of Object.entries(this.$refs)) {
			if (!t.startsWith("bucket")) continue;
			let r = (0, G.default)(n[0].dataset.date).tz(this.timezone);
			e && e.format("YYYY-MM-DD") === r.format("YYYY-MM-DD") || (e = r, this.observer.observe(n[0]));
		}
		let t = !1, n = window.location.hash.slice(1);
		if (n && n.length === 10 && G.default.tz(n, this.timezone).isValid() && (t = !0), t || this.disableAutoScroll) return;
		let r = this.sessionBuckets.findIndex((e) => this.now < e.date);
		if (r < 0) return;
		let i = this.sessionBuckets[Math.max(0, r - 1)], a = this.$refs[this.getBucketName(i.date)]?.[0]?.offsetTop - 90;
		this.scrollParent ? this.scrollParent.scrollTop = a : window.scroll({ top: a + this.getOffsetTop() });
	},
	methods: {
		titleSortKey(e) {
			return (C(e?.title) || "").toString().toLowerCase();
		},
		roomSortKey(e) {
			return (C(e?.room?.name) || "").toString().toLowerCase();
		},
		sessionComparator(e, t) {
			if (!e?.id && t?.id) return 1;
			if (e?.id && !t?.id) return -1;
			if (!e?.id && !t?.id) return 0;
			if (this.popularitySortEnabled) {
				let n = p(e), r = p(t) - n;
				if (r !== 0) return r;
			}
			if (this.includeRoomSortKey) {
				let n = this.roomSortKey(e).localeCompare(this.roomSortKey(t));
				if (n !== 0) return n;
			}
			if (this.includeDateSortKey) {
				if (e.schedule_pending && !t.schedule_pending) return 1;
				if (!e.schedule_pending && t.schedule_pending) return -1;
				if (e.schedule_pending || t.schedule_pending || !e.start || !t.start) {
					let n = this.sortBy === "title_desc" ? -1 : 1;
					return this.titleSortKey(e).localeCompare(this.titleSortKey(t)) * n;
				}
				let n = e.start.diff(t.start);
				if (n !== 0) return n;
			}
			let n = this.sortBy === "title_desc" ? -1 : 1, r = this.titleSortKey(e).localeCompare(this.titleSortKey(t));
			return r === 0 ? 0 : r * n;
		},
		sortBucketSessions(e) {
			return [...e].sort((e, t) => this.sessionComparator(e, t));
		},
		isProperSession(e) {
			return !!e.id;
		},
		getBucketName(e) {
			return `bucket-${e.format("YYYY-MM-DD-HH-mm")}`;
		},
		getOffsetTop() {
			return this.$parent.$el.getBoundingClientRect().top + window.scrollY;
		},
		scrollToDay(e, { force: t = !1 } = {}) {
			if (!this.showDayHeaders || !e) return;
			let n = e.format ? e.format("YYYY-MM-DD") : e;
			if (!t && this.scrolledDay?.format("YYYY-MM-DD") === n) return;
			let r = this.bucketFirstByDay[n];
			if (!r) return;
			let i = this.$refs[this.getBucketName(r.date)]?.[0];
			if (i) {
				if (this.scrollParent) {
					let e = i.getBoundingClientRect().top - this.scrollParent.getBoundingClientRect().top + this.scrollParent.scrollTop - 8;
					this.scrollParent.scrollTop = e;
				} else window.scroll({ top: i.offsetTop + this.getOffsetTop() - 8 });
				this.scrolledDay = G.default.tz(n, "YYYY-MM-DD", this.timezone).startOf("day");
			}
		},
		onIntersect(e) {
			if (!this.showDayHeaders) return;
			let t = e[0], n = (0, G.default)(t.target.dataset.date).tz(this.timezone).startOf("day");
			t.isIntersecting ? (this.scrolledDay = n, this._scrollDayUpdate = !0, this.$emit("changeDay", this.scrolledDay)) : t.rootBounds && t.boundingClientRect.y - t.rootBounds.y > 0 && (this.scrolledDay = n.clone().subtract(1, "day"), this._scrollDayUpdate = !0, this.$emit("changeDay", this.scrolledDay));
		}
	}
}, [["render", X], ["styles", [".c-linear-schedule{flex-direction:column;min-height:0;display:flex}.c-linear-schedule .bucket{padding-top:8px}.c-linear-schedule .bucket .bucket-label{color:#0000008a;padding-left:5px;font-size:14px;font-weight:500}.c-linear-schedule .bucket .bucket-label .day{font-weight:600}.c-linear-schedule .bucket .break{z-index:10;background-color:#eee;border-radius:4px;justify-content:center;align-items:center;margin:8px;padding:8px;display:flex}.c-linear-schedule .bucket .break .title{color:#0000008a;font-size:20px;font-weight:500}@media (width<=600px){.c-linear-schedule .bucket .bucket-label{padding-left:8px;font-size:13px}.c-linear-schedule .bucket .break{margin:6px 4px}.c-linear-schedule .bucket .break .title{font-size:16px}}.c-linear-schedule.density-compact .bucket{padding-top:4px}.c-linear-schedule.density-compact .bucket .bucket-label{font-size:12px}.c-linear-schedule.density-compact .bucket .break{margin:4px;padding:4px}.c-linear-schedule.density-compact .bucket .break .title{font-size:16px}.c-linear-schedule.density-comfortable .bucket{padding-top:14px}.c-linear-schedule.density-comfortable .bucket .bucket-label{font-size:16px}.c-linear-schedule.density-comfortable .bucket .break{margin:12px;padding:12px}.c-linear-schedule.density-comfortable .bucket .break .title{font-size:22px}"]]]), ae = {
	key: 0,
	class: "schedule-unavailable"
}, oe = { class: "info-message" }, se = {
	key: 1,
	class: "schedule-error"
}, ce = {
	key: 3,
	class: "no-results"
}, le = {
	key: 6,
	class: "error-messages"
}, ue = ["onClick"], de = { class: "message" }, fe = {
	id: "bunt-teleport-target",
	ref: "teleportTarget"
};
function pe(e, t, n, r, a, o) {
	let s = S("talk-detail"), c = S("featured-speakers"), l = S("speakers-list"), u = S("speaker-detail"), f = S("schedule-toolbar"), p = S("grid-schedule-wrapper"), _ = S("linear-schedule"), v = S("bunt-progress-circular"), b = S("session-modal");
	return E(), d("div", {
		class: B(["pretalx-schedule", o.isSpeakerView ? ["speaker-view"] : o.isTalkView ? ["talk-view"] : a.sessionsMode ? ["sessions-view", "list-schedule"] : o.showGrid ? ["grid-schedule"] : ["list-schedule"]]),
		style: y({
			"--scrollparent-width": a.scrollParentWidth + "px",
			"--schedule-max-width": o.scheduleMaxWidth + "px",
			"--pretalx-sticky-date-offset": "0px"
		})
	}, [
		a.scheduleUnavailable ? (E(), d("div", ae, [h("div", oe, R(o.noScheduleMessage), 1)])) : a.scheduleError ? (E(), d("div", se, [...t[22] ||= [h("div", { class: "error-message" }, "An error occurred while loading the schedule. Please try again later.", -1)]])) : o.isTalkView && a.schedule && o.resolvedTalk ? (E(), m(s, {
			key: 2,
			talk: o.resolvedTalk,
			baseUrl: n.eventUrl
		}, null, 8, ["talk", "baseUrl"])) : o.isSpeakerView && a.schedule ? (E(), d(i, { key: 3 }, [n.view === "featured-speakers" ? (E(), m(c, { key: 0 })) : n.view === "speakers" ? (E(), m(l, { key: 1 })) : n.view === "speaker" ? (E(), m(u, {
			key: 2,
			speakerId: n.speakerCode,
			onHomeServer: a.onHomeServer
		}, null, 8, ["speakerId", "onHomeServer"])) : g("", !0)], 64)) : a.schedule && a.schedule.talks.length ? (E(), d(i, { key: 4 }, [
			(a.scheduleMeta || a.schedule) && !n.publicFavsUrl ? (E(), m(f, {
				key: 0,
				version: n.version || a.scheduleMeta?.version || "",
				isCurrent: a.scheduleMeta?.is_current !== !1,
				isFeaturedPage: n.isFeaturedPage,
				isListView: !o.showGrid || a.sessionsMode,
				changelogUrl: a.scheduleMeta?.changelog_url || "",
				currentScheduleUrl: a.scheduleMeta?.current_schedule_url || "",
				exporters: a.scheduleMeta?.exporters || [],
				versions: a.scheduleMeta?.versions || [],
				fullscreenTarget: e.$el,
				filterGroups: o.filterGroups,
				showRecordingFilter: o.showRecordingFilter,
				recordingFilter: a.recordingFilter,
				"onUpdate:recordingFilter": t[0] ||= (e) => a.recordingFilter = e,
				sortOptions: o.sortOptions,
				sortBy: a.sortBy,
				"onUpdate:sortBy": t[1] ||= (e) => a.sortBy = e,
				favsCount: a.favs.length,
				onlyFavs: a.onlyFavs,
				shareStarredSessions: a.shareStarredSessions,
				"onUpdate:shareStarredSessions": [t[2] ||= (e) => a.shareStarredSessions = e, o.updateShareStarredSessions],
				scheduleUserLoggedIn: a.loggedIn,
				hasActiveFilters: a.onlyFavs || o.hasActiveFilterSelections || a.recordingFilter !== "all",
				currentTimezone: a.currentTimezone,
				"onUpdate:currentTimezone": t[3] ||= (e) => a.currentTimezone = e,
				scheduleTimezone: a.schedule.timezone,
				userTimezone: a.userTimezone,
				days: o.allDays,
				currentDay: a.currentDay,
				sessionsMode: a.sessionsMode,
				timeDensityMinutes: a.timeDensityMinutes,
				searchQuery: a.searchQuery,
				"onUpdate:searchQuery": t[4] ||= (e) => a.searchQuery = e,
				includeRoomSortKey: a.sortIncludeRoom,
				"onUpdate:includeRoomSortKey": t[5] ||= (e) => a.sortIncludeRoom = e,
				includeDateSortKey: a.sortIncludeDate,
				"onUpdate:includeDateSortKey": t[6] ||= (e) => a.sortIncludeDate = e,
				includePopularitySortKey: a.sortIncludePopularity,
				"onUpdate:includePopularitySortKey": t[7] ||= (e) => a.sortIncludePopularity = e,
				popularityFeatureEnabled: o.popularityFeatureEnabled,
				popularitySortAvailable: o.popularitySortAvailable,
				exportsDisabled: o.exportsDisabled,
				onSelectDay: t[8] ||= (e) => o.selectDay(e),
				onFilterToggle: t[9] ||= (e) => a.onlyFavs = !1,
				onToggleFavs: t[10] ||= (e) => {
					a.onlyFavs = !a.onlyFavs, a.onlyFavs && o.resetAllFilters();
				},
				onResetFilters: t[11] ||= (e) => {
					a.onlyFavs = !1, o.resetAllFilters();
				},
				onSaveTimezone: o.saveTimezone,
				onToggleSessionsMode: t[12] ||= (e) => a.sessionsMode = !a.sessionsMode,
				onSetTimeDensityMinutes: t[13] ||= (e) => o.setTimeDensityMinutes(e)
			}, null, 8, /* @__PURE__ */ "version.isCurrent.isFeaturedPage.isListView.changelogUrl.currentScheduleUrl.exporters.versions.fullscreenTarget.filterGroups.showRecordingFilter.recordingFilter.sortOptions.sortBy.favsCount.onlyFavs.shareStarredSessions.scheduleUserLoggedIn.hasActiveFilters.currentTimezone.scheduleTimezone.userTimezone.days.currentDay.sessionsMode.timeDensityMinutes.searchQuery.includeRoomSortKey.includeDateSortKey.includePopularitySortKey.popularityFeatureEnabled.popularitySortAvailable.exportsDisabled.onUpdate:shareStarredSessions.onSaveTimezone".split("."))) : g("", !0),
			o.showGrid && !a.sessionsMode ? (E(), m(p, {
				key: 1,
				sessions: o.sessions,
				rooms: o.rooms,
				days: o.days,
				currentDay: a.currentDay,
				now: a.now,
				hasAmPm: o.hasAmPm,
				timezone: a.currentTimezone,
				locale: n.locale,
				scrollParent: a.scrollParent,
				favs: a.favs,
				showFavCount: o.showPopularityOnSchedule,
				onHomeServer: a.onHomeServer,
				disableAutoScroll: n.disableAutoScroll,
				forceScrollDay: a.forceScrollDay,
				density: "default",
				timeDensityMinutes: a.timeDensityMinutes,
				onChangeDay: t[14] ||= (e) => o.setCurrentDay(e),
				onFav: t[15] ||= (e) => o.fav(e),
				onUnfav: t[16] ||= (e) => o.unfav(e)
			}, null, 8, [
				"sessions",
				"rooms",
				"days",
				"currentDay",
				"now",
				"hasAmPm",
				"timezone",
				"locale",
				"scrollParent",
				"favs",
				"showFavCount",
				"onHomeServer",
				"disableAutoScroll",
				"forceScrollDay",
				"timeDensityMinutes"
			])) : (E(), m(_, {
				key: 2,
				sessions: a.sessionsMode ? o.properSessions : o.sessions,
				rooms: o.rooms,
				currentDay: a.currentDay,
				now: a.now,
				hasAmPm: o.hasAmPm,
				timezone: a.currentTimezone,
				locale: n.locale,
				scrollParent: a.scrollParent,
				favs: a.favs,
				showFavCount: o.showPopularityOnSchedule,
				sortBy: o.effectiveSortBy,
				includeRoomSortKey: a.sortIncludeRoom,
				includeDateSortKey: a.sortIncludeDate,
				includePopularitySortKey: a.sortIncludePopularity,
				onHomeServer: a.onHomeServer,
				disableAutoScroll: n.disableAutoScroll,
				showBreaks: !a.sessionsMode,
				density: "default",
				onChangeDay: t[17] ||= (e) => o.setCurrentDay(e),
				onFav: t[18] ||= (e) => o.fav(e),
				onUnfav: t[19] ||= (e) => o.unfav(e)
			}, null, 8, [
				"sessions",
				"rooms",
				"currentDay",
				"now",
				"hasAmPm",
				"timezone",
				"locale",
				"scrollParent",
				"favs",
				"showFavCount",
				"sortBy",
				"includeRoomSortKey",
				"includeDateSortKey",
				"includePopularitySortKey",
				"onHomeServer",
				"disableAutoScroll",
				"showBreaks"
			])),
			o.sessions && !o.sessions.length && a.searchQuery ? (E(), d("div", ce, [...t[23] ||= [h("div", { class: "no-results-text" }, "No sessions match your search.", -1)]])) : g("", !0)
		], 64)) : (E(), m(v, {
			key: 5,
			size: "huge",
			page: !0
		})),
		a.errorMessages.length ? (E(), d("div", le, [(E(!0), d(i, null, F(a.errorMessages, (e) => (E(), d("div", {
			class: "error-message",
			key: e
		}, [h("div", {
			class: "btn btn-danger",
			onClick: (t) => a.errorMessages = a.errorMessages.filter((t) => t !== e)
		}, "x", 8, ue), h("div", de, R(e), 1)]))), 128))])) : g("", !0),
		h("div", fe, null, 512),
		N(b, {
			ref: "sessionModal",
			modalContent: a.modalContent,
			currentTimezone: a.currentTimezone,
			locale: n.locale,
			hasAmPm: o.hasAmPm,
			now: a.now,
			onHomeServer: a.onHomeServer,
			favs: a.favs,
			showJoinRoom: n.showJoinRoom,
			onToggleFav: o.toggleSessionModalFav,
			onShowSpeaker: o.showSpeakerDetails,
			onFav: t[20] ||= (e) => o.fav(e),
			onUnfav: t[21] ||= (e) => o.unfav(e)
		}, null, 8, [
			"modalContent",
			"currentTimezone",
			"locale",
			"hasAmPm",
			"now",
			"onHomeServer",
			"favs",
			"showJoinRoom",
			"onToggleFav",
			"onShowSpeaker"
		])
	], 6);
}
//#endregion
//#region src/App.vue?vue&type=style&index=0&inline&lang.stylus
var me = "html{font-size:87.5%}body{color:#000000de;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;font-size-adjust:auto;font-family:Roboto,Helvetica Neue,HelveticaNeue,Helvetica,Arial,sans-serif}b{font-weight:700}i{font-style:italic}strong{font-weight:700}em{font-style:italic}h1{text-rendering:optimizelegibility;margin:.75em 0;font-size:2.4rem;font-weight:700;line-height:1.6em}h2{text-rendering:optimizelegibility;margin:.75em 0;font-size:1.8rem;font-weight:700;line-height:1.6em}h3{text-rendering:optimizelegibility;margin:.75em 0;font-size:1.5rem;font-weight:700;line-height:1.6em}h4{text-rendering:optimizelegibility;margin:.75em 0;font-size:1.3rem;font-weight:700;line-height:1.6em}h5{text-rendering:optimizelegibility;margin:.75em 0;font-size:1rem;font-weight:700;line-height:1.6em}h6{text-rendering:optimizelegibility;text-transform:uppercase;margin:.75em 0;font-size:.9rem;font-weight:700;line-height:1.6em}ul{margin:.32rem .94rem;padding-left:1rem}ul li{padding:.125rem;list-style-type:disc}ol{margin:.32rem 1.125rem;padding-left:1rem}ol li{padding:.125rem;list-style-type:decimal}::selection{color:#fff;background:#2196f3}p{margin:.75em 0;font-size:1rem;line-height:1.6em}small{opacity:.6;font-size:55%;font-weight:400}a[href]:not([class]){color:#2196f3;text-decoration:none}a[href]:not([class]):hover{color:#0c81df}a[href]:not([class]):visited{opacity:.8}blockquote{border-left:4px solid #2196f3;margin:1em 0;padding-left:1.5em}blockquote>p{margin-top:0;font-size:1.27rem;font-weight:300;line-height:1.27rem}blockquote>cite,blockquote>footer,blockquote>figcaption{color:#888}blockquote>cite:before,blockquote>footer:before,blockquote>figcaption:before{content:\"—\"}.hyphenation{-ms-word-break:break-all;word-break:break-all;word-break:break-word;-webkit-hyphens:auto;hyphens:auto;-webkit-hyphenate-before:2;-webkit-hyphenate-after:3;hyphenate-lines:3}.bunt-ripple-ink{border-radius:inherit;display:block;position:absolute;inset:0;overflow:hidden;-webkit-mask-image:-webkit-radial-gradient(circle,#fff,#000)}.ripple{pointer-events:none;-webkit-user-select:none;user-select:none;opacity:.1;background-color:currentColor;background-clip:padding-box;border-radius:50%;transition:transform .4s ease-out,opacity .4s ease-out;position:absolute;transform:scale(1)}.ripple-ink-enter-from{opacity:.2;transform:scale(0)}.ripple-ink-leave-active{opacity:0;transition:transform .1s ease-out,opacity .1s ease-out}.bunt-icon{width:24px;height:24px;cursor:inherit;font-size:24px;line-height:24px;display:inline-block}.bunt-button,.bunt-link-button{text-transform:uppercase;vertical-align:middle;cursor:default;white-space:nowrap;border:none;border-radius:4px;outline:none;flex-shrink:0;justify-content:center;align-items:center;min-width:80px;height:36px;padding:0 16px;font-family:Roboto,Helvetica Neue,HelveticaNeue,Helvetica,Arial,sans-serif;font-size:14px;font-weight:500;line-height:36px;display:inline-flex;position:relative}.bunt-button::-moz-focus-inner{border:0}.bunt-link-button::-moz-focus-inner{border:0}.bunt-button.autofocus:focus,.bunt-link-button.autofocus:focus,body[modality=keyboard] .bunt-button:focus,body[modality=keyboard] .bunt-link-button:focus{outline-style:solid}.bunt-button.disabled .bunt-button-content,.bunt-link-button.disabled .bunt-button-content{opacity:.6}.bunt-button:not(.disabled),.bunt-link-button:not(.disabled){cursor:pointer}.bunt-button .bunt-progress-circular,.bunt-link-button .bunt-progress-circular{position:absolute;top:50%;left:50%}.bunt-button .bunt-progress-circular.active,.bunt-link-button .bunt-progress-circular.active{animation:1.568s linear infinite button-container-rotate}@keyframes button-container-rotate{0%{transform:translate(-50%,-50%)rotate(0)}to{transform:translate(-50%,-50%)rotate(360deg)}}.bunt-button .bunt-icon.error,.bunt-link-button .bunt-icon.error,.bunt-button .bunt-icon.success,.bunt-link-button .bunt-icon.success{position:absolute}.bunt-button.error .bunt-tooltip,.bunt-link-button.error .bunt-tooltip{background-color:#f44336}.bunt-button-content{display:flex}.bunt-button-content.invisible{visibility:hidden}.bunt-icon{height:36px;font-size:20px;line-height:36px}.bunt-button-raised{transition:box-shadow .1s;box-shadow:0 0 2px #0000001f,0 2px 2px #0003}.bunt-button-raised.autofocus:focus,body[modality=keyboard] .bunt-button-raised:focus{outline:none;box-shadow:0 0 5px #00000038,0 3px 6px #0000004d}.bunt-checkbox{flex-shrink:0;align-items:center;display:flex;position:relative}.bunt-checkbox input{opacity:0;cursor:pointer;width:1px;height:1px;position:absolute;top:0;left:0}.bunt-checkbox label{cursor:pointer;align-items:center;font-size:14px;line-height:24px;display:flex}.bunt-checkbox .bunt-checkbox-box{border:2px solid #0000008a;border-radius:2px;width:20px;height:20px;margin-right:8px;transition:all .2s ease-out;position:relative}.bunt-checkbox .bunt-checkbox-box:after{opacity:0;content:\" \";border:2px solid #fff;border-top:0;border-left:0;width:6px;height:13px;transition:all .3s cubic-bezier(.55,0,.55,.2);position:absolute;top:0;left:6px;transform:rotate(45deg)scale(.15)}.bunt-checkbox.checked .bunt-checkbox-box{background-color:#2196f3;border-color:#2196f3}.bunt-checkbox.checked .bunt-checkbox-box:after{opacity:1;transition:all .4s cubic-bezier(.25,.8,.25,1);transform:rotate(45deg)scale(1)}.bunt-checkbox.disabled label{cursor:not-allowed;color:#0000008a}.bunt-checkbox.disabled .bunt-checkbox-box{border-color:#bdbdbd}.bunt-checkbox.disabled.checked .bunt-checkbox-box{background-color:#bdbdbd}.bunt-radio{cursor:pointer;flex-shrink:0;padding-top:16px;display:flex;position:relative}.bunt-radio input{cursor:inherit;pointer-events:all;opacity:0;z-index:2;box-sizing:border-box;width:100%;height:100%;margin:0;padding:0;position:absolute;left:0}.bunt-radio label{font-size:14px;line-height:20px}.bunt-radio .bunt-radio-circle{box-sizing:border-box;border:2px solid #0000008a;border-radius:50%;width:20px;height:20px;margin-right:8px;transition:all .2s ease-out;position:relative}.bunt-radio .bunt-radio-circle:after{opacity:0;content:\" \";background-color:#2196f3;border-radius:50%;width:10px;height:10px;transition:all .4s cubic-bezier(.25,.8,.25,1);position:absolute;top:3px;left:3px}.bunt-radio.checked .bunt-radio-circle{border-color:#2196f3}.bunt-radio.checked .bunt-radio-circle:after{opacity:1}.bunt-icon-button{vertical-align:middle;cursor:default;background:0 0;border:none;border-radius:50%;outline:none;flex-shrink:0;justify-content:center;align-items:center;width:36px;height:36px;padding:0;line-height:36px;display:inline-flex;position:relative}.bunt-icon-button::-moz-focus-inner{border:0}.bunt-icon-button.autofocus:focus,body[modality=keyboard] .bunt-icon-button:focus{outline-style:solid}.bunt-icon-button.disabled .bunt-icon,.bunt-icon-button.disabled svg{opacity:.6}.bunt-icon-button:not(.disabled){cursor:pointer}.bunt-icon-button.autofocus:focus,body[modality=keyboard] .bunt-icon-button:focus{outline-offset:0;outline-width:2px}.bunt-icon-button .bunt-icon{width:auto;height:36px;font-size:20px;line-height:36px}.bunt-icon-button svg{height:20px}.bunt-input{flex-direction:column;flex-shrink:0;height:56px;padding-top:16px;display:flex}.bunt-input .label-input-container{align-items:center;display:flex;position:relative}.bunt-input .icon{color:#0000008a;padding:0 0 0 8px;font-size:22px}.bunt-input input{box-sizing:border-box;background-color:#0000;border:none;border-radius:4px;outline:none;flex:auto;width:100%;height:37px;padding:8px 8px 8px 12px;font-family:Roboto,Helvetica Neue,HelveticaNeue,Helvetica,Arial,sans-serif;font-size:16px;font-weight:400}.bunt-input label{pointer-events:none;color:#0000008a;transform-origin:0 0;font-size:16px;font-weight:400;line-height:21px;transition:transform .25s,width .25s;position:absolute;top:8px;left:12px}.bunt-input ::placeholder{color:#0000008a}.bunt-input .error-icon{color:#f44336;padding-right:8px;font-size:22px}.bunt-input .outline{stroke:#00000061;stroke-width:1px;fill:none;pointer-events:none;width:100%;height:100%;stroke-dasharray:calc(var(--label-gap) / 2 + 4) 0 100000;transition:stroke .15s cubic-bezier(.4,0,.2,1),stroke-width .15s cubic-bezier(.4,0,.2,1),stroke-dasharray .15s cubic-bezier(.4,0,.2,1);position:absolute;top:0;left:0}.bunt-input .hint{color:#0000008a;padding-top:0;padding-left:16px;font-size:13px;line-height:18px}.bunt-input .hint p{margin:0}.bunt-input.with-icon input{padding-left:4px}.bunt-input.focused .outline{stroke:#2196f3;stroke-width:2px}.bunt-input.focused label{color:#2196f3}.bunt-input.floating-label .outline,.bunt-input.focused .outline{stroke-dasharray:3 var(--label-gap) 10000}.bunt-input.floating-label label,.bunt-input.focused label{transform:translateY(-15px)scale(.75)}.bunt-input.disabled{cursor:not-allowed}.bunt-input.disabled input{cursor:not-allowed;color:#00000061;background-color:#00000014}.bunt-input.disabled .outline{stroke-dasharray:10}.bunt-input.disabled.floating-label .outline,.bunt-input.disabled.focused .outline{stroke-dasharray:3 var(--label-gap) 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10}.bunt-input.invalid .hint,.bunt-input.invalid label{color:#f44336}.bunt-input.invalid .outline{stroke:#f44336;stroke-width:2px}.bunt-input-outline-container{flex-direction:column;flex-shrink:0;padding-top:16px;display:flex;position:relative}.bunt-input-outline-container>label{pointer-events:none;color:#0000008a;transform-origin:0 0;font-size:16px;font-weight:400;line-height:21px;position:absolute;top:8px;left:12px;transform:translateY(-15px)scale(.75)}.bunt-input-outline-container>.outline{stroke:#00000061;stroke-width:1px;fill:none;pointer-events:none;width:100%;height:100%;stroke-dasharray:3 var(--label-gap) 10000;transition:stroke .15s cubic-bezier(.4,0,.2,1),stroke-width .15s cubic-bezier(.4,0,.2,1),stroke-dasharray .15s cubic-bezier(.4,0,.2,1);position:absolute;top:0;left:0}.bunt-input-outline-container.focused>.outline{stroke:#2196f3;stroke-width:2px}.bunt-input-outline-container.focused>label{color:#2196f3}a.bunt-link-button{color:#000000de;background-color:#eee;text-decoration:none;display:inline-flex}.bunt-drop-element{z-index:$z-index-dropdown;opacity:0;max-width:100%;max-height:100%;transition:opacity .2s;display:none;position:absolute}.bunt-drop-element,.bunt-drop-element:after,.bunt-drop-element:before,.bunt-drop-element *,.bunt-drop-element :after,.bunt-drop-element :before{box-sizing:border-box}.bunt-drop-element.bunt-drop-open{display:block}.bunt-drop-element.bunt-drop-after-open{opacity:1}.bunt-progress-circular{width:48px;height:48px;display:inline-block;position:relative}.bunt-progress-circular.tiny{width:14px;height:14px}.bunt-progress-circular.tiny circle{stroke-width:8px}.bunt-progress-circular.small{width:24px;height:24px}.bunt-progress-circular.small circle{stroke-width:7px}.bunt-progress-circular.big{width:64px;height:64px}.bunt-progress-circular.big circle{stroke-width:4px}.bunt-progress-circular.huge{width:128px;height:128px}.bunt-progress-circular.huge circle{stroke-width:3px}.bunt-progress-circular.progress-center{margin:auto;display:block}.bunt-progress-circular.progress-page{margin:7rem auto;display:block}.bunt-progress-circular svg{width:100%;height:100%;animation:1.568s linear infinite bunt-progress-circular-rotate;position:relative}.bunt-progress-circular svg circle{fill:none;stroke:#2196f3;stroke-width:5px;stroke-miterlimit:10;stroke-dasharray:1 200;stroke-dashoffset:0;stroke-linecap:square;animation:1.333s ease-in-out infinite bunt-progress-circular-dash}@keyframes bunt-progress-circular-rotate{to{transform:rotate(360deg)}}@keyframes bunt-progress-circular-dash{0%{stroke-dasharray:1 200;stroke-dashoffset:0}50%{stroke-dasharray:89 200;stroke-dashoffset:-35px}to{stroke-dasharray:89 200;stroke-dashoffset:-124px}}.bunt-select{position:relative}.bunt-select .open-indicator{color:#0000008a;cursor:pointer;font-size:28px;line-height:20px;transition:all .25s ease-in-out;position:absolute;top:8px;right:4px}.bunt-select.open .open-indicator{transform-origin:50%;transform:rotate(180deg)}.bunt-select .bunt-input input{padding-right:20px}.bunt-select-dropdown-menu{z-index:100;background-color:#fff;border-top:none;border-radius:0 0 2px 2px;flex-direction:column;transition:box-shadow .3s;display:flex;box-shadow:0 2px 5px #00000029,0 2px 10px #0000001f}.bunt-select-dropdown-menu .scrollable-menu{flex-direction:column;flex:auto;min-height:0;display:flex}.bunt-select-dropdown-menu ul{margin:0;padding:0}.bunt-select-dropdown-menu li{text-overflow:ellipsis;white-space:nowrap;height:32px;padding:0 8px;line-height:32px;list-style-type:none;overflow:hidden}.bunt-select-dropdown-menu li.highlight{background-color:#2196f3}.bunt-switch{cursor:pointer;flex-shrink:0;height:20px;margin-bottom:8px;display:flex;position:relative}.bunt-switch input{cursor:inherit;pointer-events:all;opacity:0;z-index:2;box-sizing:border-box;width:100%;height:100%;margin:0;padding:0;position:absolute;left:0}.bunt-switch label{font-size:14px;line-height:14px}.bunt-switch .bunt-switch-track{background-color:#00000061;border-radius:30px;width:36px;height:14px;margin-right:8px;transition:all .4s ease-out;position:relative}.bunt-switch .bunt-switch-thumb{background-color:#fafafa;border-radius:50%;width:20px;height:20px;transition:all .3s;position:absolute;top:50%;left:0;transform:translate(-1px,-50%);box-shadow:0 1px 1px #00000024,0 1px 3px #0000001f,0 2px 1px -1px #0003}.bunt-switch.checked .bunt-switch-track{background-color:#2196f380}.bunt-switch.checked .bunt-switch-thumb{background-color:#2196f3;transform:translate(75%,-50%);box-shadow:0 2px 2px #00000024,0 1px 5px #0000001f,0 3px 1px -2px #0003}.bunt-tabs{width:100%;margin-bottom:24px}.bunt-tabs-header{width:100%;position:relative}.bunt-tabs-header .bunt-tab-header-item .bunt-ripple-ink .ripple.held{opacity:.7}.bunt-tabs-header-items{margin:0;padding:0;list-style:none;display:flex;position:relative}.bunt-tab-header-item{text-transform:uppercase;cursor:pointer;outline:none;justify-content:center;align-items:center;min-width:80px;height:48px;padding:0 12px;font-family:Roboto,Helvetica Neue,HelveticaNeue,Helvetica,Arial,sans-serif;display:flex;position:relative}.bunt-tab-header-item.type-icon-and-text{flex-direction:column;height:72px;display:flex}.bunt-tab-header-item.type-icon-and-text .bunt-tab-header-item-icon{margin-bottom:4px}.bunt-tab-header-item.disabled{opacity:.4;cursor:default}.bunt-tabs-indicator{transform-origin:0;height:2px;transition:transform;position:absolute;bottom:0;left:0;right:0;transform:scale(0)}.bunt-tabs-indicator.align-bottom{top:0;bottom:auto}.bunt-tabs-indicator.expand{transition-duration:75ms;transition-timing-function:cubic-bezier(.4,0,1,1)}.bunt-tabs-indicator.contract{transition-duration:90ms;transition-timing-function:cubic-bezier(0,0,.2,1)}.bunt-tooltip{will-change:transform, opacity;color:#fff;white-space:nowrap;text-transform:none;pointer-events:none;-webkit-user-select:none;user-select:none;z-index:90000;background-color:#0000008a;border-radius:2px;height:24px;padding:0 8px;font-size:14px;font-weight:400;line-height:24px;top:0;left:0}.bunt-dialog-container{z-index:90001;justify-content:center;align-items:center;display:flex;position:fixed;inset:0}.bunt-dialog-container .bunt-dialog{z-index:90003;background-color:#fff;border-radius:2px;width:50vw;transition:box-shadow .3s;box-shadow:0 2px 5px #00000029,0 2px 10px #0000001f}.bunt-dialog-container .bunt-backdrop{z-index:90002;background-color:#0000008a;position:absolute;inset:0}.bunt-scrollbar{box-sizing:border-box;scrollbar-width:none;position:relative;overflow:scroll}.bunt-scrollbar:hover .bunt-scrollbar-thumb{opacity:.4}.bunt-scrollbar::-webkit-scrollbar{display:none}.bunt-scrollbar .bunt-scrollbar-rail-wrapper-x,.bunt-scrollbar .bunt-scrollbar-rail-wrapper-y{-webkit-user-select:none;user-select:none;position:sticky;margin:0!important}.bunt-scrollbar .bunt-scrollbar-rail-x,.bunt-scrollbar .bunt-scrollbar-rail-y{-webkit-user-select:none;user-select:none;position:absolute}.bunt-scrollbar .bunt-scrollbar-thumb{opacity:.2;background-color:#546e7a;border-radius:6px;transition:height .3s cubic-bezier(.4,0,.2,1),width .3s cubic-bezier(.4,0,.2,1),opacity .3s cubic-bezier(.4,0,.2,1);position:absolute}.bunt-scrollbar .bunt-scrollbar-rail-wrapper-x{width:0;height:0;top:100%;bottom:0;left:0}.bunt-scrollbar .bunt-scrollbar-rail-wrapper-x .bunt-scrollbar-rail-x{height:15px;bottom:0}.bunt-scrollbar .bunt-scrollbar-rail-wrapper-x .bunt-scrollbar-rail-x .bunt-scrollbar-thumb{height:6px;bottom:2px}.bunt-scrollbar .bunt-scrollbar-rail-wrapper-x .bunt-scrollbar-rail-x:hover .bunt-scrollbar-thumb,.bunt-scrollbar .bunt-scrollbar-rail-wrapper-x .bunt-scrollbar-rail-x.active .bunt-scrollbar-thumb{opacity:.8;height:12px}.bunt-scrollbar .bunt-scrollbar-rail-wrapper-y{width:0;height:0;bottom:100%;left:100%;right:0}.bunt-scrollbar .bunt-scrollbar-rail-wrapper-y .bunt-scrollbar-rail-y{width:15px;top:0;right:0}.bunt-scrollbar .bunt-scrollbar-rail-wrapper-y .bunt-scrollbar-rail-y .bunt-scrollbar-thumb{width:6px;right:2px}.bunt-scrollbar .bunt-scrollbar-rail-wrapper-y .bunt-scrollbar-rail-y:hover .bunt-scrollbar-thumb,.bunt-scrollbar .bunt-scrollbar-rail-wrapper-y .bunt-scrollbar-rail-y.active .bunt-scrollbar-thumb{opacity:.8;width:12px}a{color:var(--pretalx-clr-primary);text-decoration:none}html,body{--pretalx-clr-primary:#673ab7;margin:0}.bunt-scrollbar{min-height:0}.schedule-error{color:$clr-error;text-align:center;padding:32px;font-size:18px}.schedule-error .error-message{margin-top:16px}.schedule-unavailable{color:var(--pretalx-clr-text,#0d0f10);text-align:center;padding:32px;font-size:18px}.schedule-unavailable .info-message{margin-top:16px;line-height:1.5}.pretalx-schedule,dialog.pretalx-modal{color:#0d0f10}.pretalx-schedule{--pretalx-clr-text:#0d0f10;flex-direction:column;min-height:0;font-size:14px;display:flex}.pretalx-schedule:fullscreen{--pretalx-sticky-top-offset:0px;background:#fff;margin:0;padding:0;overflow:auto}.pretalx-schedule:fullscreen>.c-schedule-toolbar{border-bottom:1px solid #0000001f}.pretalx-schedule.grid-schedule{margin:0 auto;overflow-x:clip}.pretalx-schedule.list-schedule,.pretalx-schedule.speaker-view{min-width:0}.pretalx-schedule .days{top:calc(var(--pretalx-sticky-top-offset,0px) + 40px);z-index:30;background-color:#fff;flex:none;min-width:0;height:48px;margin-bottom:0;display:none;position:sticky;left:0;overflow-x:auto}.pretalx-schedule .days .bunt-tabs-header{background-color:#0000}.pretalx-schedule .days .bunt-tabs-header .bunt-tabs-header-items,.pretalx-schedule .days .bunt-tabs-header .bunt-tabs-header-items .bunt-tab-header-item-icon{color:#0000008a}body[modality=keyboard] .pretalx-schedule .days .bunt-tabs-header .bunt-tab-header-item:focus{outline:1px solid var(--pretalx-clr-primary)}.pretalx-schedule .days .bunt-tabs-header .bunt-tab-header-item.active,.pretalx-schedule .days .bunt-tabs-header .bunt-tab-header-item.active .bunt-tab-header-item-icon{color:var(--pretalx-clr-primary)}.pretalx-schedule .days .bunt-tabs-indicator{background-color:var(--pretalx-clr-primary)}.pretalx-schedule .days .bunt-tabs-header{min-width:min-content}.pretalx-schedule .days .bunt-tabs-header-items{justify-content:center;min-width:min-content}.pretalx-schedule .days .bunt-tabs-header-items .bunt-tab-header-item{min-width:min-content}.pretalx-schedule .days .bunt-tabs-header-items .bunt-tab-header-item-text{white-space:nowrap}.error-messages{z-index:1000;width:250px;padding:12px;position:fixed;bottom:0;right:0}.error-messages .error-message{color:#f44336;background-color:#fff;border:2px solid #f44336;border-radius:6px;margin-top:8px;padding:8px;position:relative;box-shadow:0 2px 4px #0003}.error-messages .error-message .btn{cursor:pointer;border:1px solid #f44336;border-radius:2px;justify-content:center;align-items:center;width:18px;height:18px;display:flex;position:absolute;top:4px;right:4px;box-shadow:1px 1px 2px #0003}.error-messages .error-message .message{margin-right:22px}.no-results{text-align:center;color:#888;padding:48px 16px;font-size:16px}.powered-by{text-align:center;color:#757575;margin-top:16px;margin-bottom:16px;font-size:12px}.powered-by .pretalx{color:#757575;margin-left:4px;font-weight:700;transition:all .1s ease-in}.powered-by:hover .pretalx{color:#3aa57c}@media print{.pretalx-schedule{height:auto!important;overflow:visible!important}.pretalx-schedule:fullscreen{padding:0}.pretalx-schedule .days{position:static!important}.pretalx-schedule .error-messages{display:none}.pretalx-modal{display:none!important}.c-linear-schedule-session,.break{break-inside:avoid;page-break-inside:avoid;-webkit-print-color-adjust:exact;print-color-adjust:exact;color-adjust:exact;box-shadow:none!important;border:1px solid #ccc!important}.c-linear-schedule-session .time-box,.break .time-box{-webkit-print-color-adjust:exact;print-color-adjust:exact;color-adjust:exact}.c-linear-schedule-session .info,.break .info{-webkit-print-color-adjust:exact;print-color-adjust:exact;color-adjust:exact;border:1px solid #ccc!important;border-left:none!important}.c-linear-schedule-session .session-icons,.break .session-icons{display:none}.c-linear-schedule-session .info{background:#fff!important}.break .info{-webkit-print-color-adjust:exact;print-color-adjust:exact;color-adjust:exact}.c-grid-schedule{overflow:visible!important}.c-grid-schedule .timeslice{-webkit-print-color-adjust:exact;print-color-adjust:exact;color-adjust:exact;position:static!important}.c-grid-schedule .timeslice.gap:before{display:none}.c-grid-schedule .c-linear-schedule-session .time-box,.c-grid-schedule .break .time-box{-webkit-print-color-adjust:exact;print-color-adjust:exact;color-adjust:exact}.powered-by{display:none}}", he = O(() => import("./pretalx-schedule-SpeakersList.js")), Z = O(() => import("./pretalx-schedule-FeaturedSpeakers.js")), ge = O(() => import("./pretalx-schedule-SpeakerDetail.js")), _e = O(() => import("./pretalx-schedule-TalkDetail.js"));
function Q(e) {
	return e ? e.toString().trim().toLowerCase().replace(/_/g, "-") : "";
}
function $(e) {
	let t = Q(e);
	return t.split("-")[0] || t;
}
var ve = r({
	linkify: !1,
	breaks: !0
}), ye = V(/* @__PURE__ */ s({
	name: "PretalxSchedule",
	components: {
		FavButton: A,
		LinearSchedule: ie,
		GridScheduleWrapper: M,
		Session: D,
		SessionModal: W,
		ScheduleToolbar: U,
		SpeakersList: he,
		FeaturedSpeakers: Z,
		SpeakerDetail: ge,
		TalkDetail: _e
	},
	props: {
		eventUrl: String,
		locale: String,
		format: {
			type: String,
			default: "grid"
		},
		version: {
			type: String,
			default: ""
		},
		isFeaturedPage: {
			type: Boolean,
			default: !1
		},
		view: {
			type: String,
			default: "schedule"
		},
		speakerCode: {
			type: String,
			default: ""
		},
		talkCode: {
			type: String,
			default: ""
		},
		publicFavsUrl: {
			type: String,
			default: ""
		},
		dateFilter: {
			type: String,
			default: ""
		},
		disableAutoScroll: {
			type: Boolean,
			default: !1
		},
		showJoinRoom: {
			type: Boolean,
			default: !0
		},
		joinRoomBaseUrl: {
			type: String,
			default: ""
		},
		enrichData: {
			type: Boolean,
			default: !1
		},
		speakersListPublic: {
			type: [Boolean, String],
			default: null
		}
	},
	provide() {
		let e = () => (this.version || this.scheduleMeta?.version || "") === "wip" ? "schedule/v/wip/" : "";
		return {
			eventUrl: this.eventUrl,
			remoteApiUrl: o(() => this.remoteApiUrl),
			buntTeleportTarget: o(() => this.$refs.teleportTarget),
			onSessionLinkClick: (e, t) => {
				this.onHomeServer || (e.preventDefault(), this.showSessionDetails(t, e));
			},
			generateSessionLinkUrl: ({ eventUrl: t, session: n }) => this.onHomeServer ? `${t}${e()}talk/${n.id}/` : `#session/${n.id}/`,
			scheduleFav: (e) => this.fav(e),
			scheduleUnfav: (e) => this.unfav(e),
			scheduleData: o(() => ({
				schedule: this.schedule,
				sessions: this.sessions || this.inlineScheduleSessions || [],
				sessionsBySpeaker: this.sessionsBySpeaker,
				sessionsLookup: this.sessionsLookup,
				speakersLookup: this.speakersLookup,
				favs: this.favs,
				favSet: this.favSet,
				timezone: this.currentTimezone,
				now: this.now,
				hasAmPm: this.hasAmPm
			})),
			showJoinRoom: o(() => this.showJoinRoom),
			getJoinRoomLink: (e) => {
				if (!this.showJoinRoom) return "";
				let t = this.joinRoomBaseUrl || (e?.stream_url ? this.defaultJoinRoomBaseUrl : "");
				if (!t || !e?.room) return "";
				let n = typeof e.room == "object" ? e.room.id : e.room;
				return n ? `${t}${n}/` : "";
			},
			generateSpeakerLinkUrl: ({ speaker: t }) => this.onHomeServer ? `${this.eventUrl}${e()}speakers/${t.code}/` : `#speakers/${t.code}`,
			onSpeakerLinkClick: (e, t) => {
				this.onHomeServer || (e.preventDefault(), this.showSpeakerDetails(t, e));
			},
			favsReadOnly: o(() => this.favsReadOnly),
			translationMessages: o(() => this.translationMessages),
			isWipPreview: o(() => (this.version || this.scheduleMeta?.version || "") === "wip"),
			exportsDisabled: o(() => this.exportsDisabled),
			speakersListPublic: o(() => this.resolvedSpeakersListPublic)
		};
	},
	data() {
		return {
			getLocalizedString: C,
			getSessionTime: ee,
			markdownIt: ve,
			sortBy: "title",
			scrollParent: null,
			scrollParentWidth: Infinity,
			schedule: null,
			userTimezone: null,
			now: (0, G.default)(),
			currentDay: null,
			forceScrollDay: 0,
			userNavigatingToDay: null,
			_dayNavTimeout: null,
			currentTimezone: null,
			favs: [],
			userCode: null,
			favsReadOnly: !1,
			allTracks: [],
			allRooms: [],
			allTypes: [],
			allLanguages: [],
			onlyFavs: !1,
			shareStarredSessions: !1,
			scheduleError: !1,
			scheduleUnavailable: !1,
			onHomeServer: !1,
			loggedIn: !1,
			_initialized: !1,
			apiUrl: null,
			translationMessages: {},
			errorMessages: [],
			displayDates: this.dateFilter?.split(",").filter((e) => e.length === 10) || [],
			modalContent: null,
			scheduleMeta: null,
			sessionsMode: !1,
			searchQuery: "",
			recordingFilter: "all",
			timeDensityMinutes: Number(localStorage.getItem("schedule-time-density-minutes") || 30),
			sortIncludeRoom: !1,
			sortIncludePopularity: !1,
			sortIncludeDate: (() => {
				try {
					let e = localStorage.getItem("schedule-include-datetime");
					return e !== null && e === "true";
				} catch {
					return !1;
				}
			})()
		};
	},
	computed: {
		defaultJoinRoomBaseUrl() {
			return this.eventUrl ? `${this.eventUrl.replace(/\/$/, "")}/video/rooms/` : "";
		},
		scheduleMaxWidth() {
			return this.schedule ? Math.min(this.scrollParentWidth, 78 + (this.schedule.rooms?.length || 0) * 365) : this.scrollParentWidth;
		},
		showGrid() {
			return this.format !== "list";
		},
		exportsDisabled() {
			return w({
				version: this.version,
				scheduleMetaVersion: this.scheduleMeta?.version,
				isFeaturedPage: this.isFeaturedPage,
				exportersCount: this.scheduleMeta?.exporters?.length || 0,
				isWipPreview: this.isWipPreview,
				scheduleExportsDisabled: !!this.schedule?.exports_disabled
			}) || this.isTalkView && !!this.resolvedTalk?.schedule_pending;
		},
		resolvedSpeakersListPublic() {
			let e = this.speakersListPublic;
			return e === !1 || e === "false" ? !1 : e === !0 || e === "true" || !!this.schedule?.speakers_list_public && !this.schedule?.exports_disabled;
		},
		roomsLookup() {
			return this.schedule ? (this.schedule.rooms || []).reduce((e, t) => (e[t.id] = t, e), {}) : {};
		},
		tracksLookup() {
			return this.schedule ? (this.schedule.tracks || []).reduce((e, t) => (e[t.id] = t, e), {}) : {};
		},
		filteredTracks() {
			return this.allTracks.filter((e) => e.selected);
		},
		filteredRooms() {
			return this.allRooms.filter((e) => e.selected);
		},
		filteredTypes() {
			return this.allTypes.filter((e) => e.selected);
		},
		filteredLanguages() {
			return this.allLanguages.filter((e) => e.selected);
		},
		hasActiveFilterSelections() {
			return this.filteredTracks.length > 0 || this.filteredRooms.length > 0 || this.filteredTypes.length > 0 || this.filteredLanguages.length > 0;
		},
		showRecordingFilter() {
			if (!this.schedule?.talks?.length) return !1;
			let e = !1, t = !1;
			for (let n of this.schedule.talks) if (n?.do_not_record === !0 ? t = !0 : n?.do_not_record === !1 && (e = !0), e && t) return !0;
			return !1;
		},
		filterGroups() {
			let e = [
				{
					refKey: "track",
					title: "Tracks",
					data: this.allTracks
				},
				{
					refKey: "room",
					title: "Rooms",
					data: this.allRooms
				},
				{
					refKey: "type",
					title: "Types",
					data: this.allTypes
				}
			];
			return this.allLanguages.length > 1 && e.push({
				refKey: "language",
				title: "Language",
				data: this.allLanguages
			}), e;
		},
		speakersLookup() {
			return this.schedule ? (this.schedule.speakers || []).reduce((e, t) => (e[t.code] = t, e), {}) : {};
		},
		talksLookup() {
			return this.schedule ? (this.schedule.talks || []).reduce((e, t) => (e[t.code] = t, e), {}) : {};
		},
		sessionsBySpeaker() {
			let e = this.sessions || this.inlineScheduleSessions;
			return j(e);
		},
		favSet() {
			return new Set(this.favs || []);
		},
		baseSessions() {
			if (!this.schedule || !this.currentTimezone) return;
			let e = this.filteredTracks.length ? new Set(this.filteredTracks.map((e) => e.id)) : null, r = this.filteredRooms.length ? new Set(this.filteredRooms.map((e) => e.id)) : null, i = this.filteredTypes.length ? new Set(this.filteredTypes.map((e) => e.value)) : null, a = this.onlyFavs ? this.favSet : null, o = this.displayDates.length ? new Set(this.displayDates) : null, s = null, c = null;
			this.filteredLanguages.length && (s = new Set(this.filteredLanguages.map((e) => Q(e.value))), c = new Set(this.filteredLanguages.map((e) => Q(e.value)).map((e) => $(e)).filter(Boolean)));
			let l = {
				timezone: this.currentTimezone,
				speakersLookup: this.speakersLookup,
				tracksLookup: this.tracksLookup,
				roomsLookup: this.roomsLookup,
				includePopularity: !0
			}, u = [];
			for (let t of this.schedule.talks) if (!(a && !a.has(t.code)) && !(this.showRecordingFilter && (this.recordingFilter === "yes" && t.do_not_record !== !1 || this.recordingFilter === "no" && t.do_not_record !== !0)) && !(e && !e.has(t.track)) && !(r && !r.has(t.room)) && !(i && !i.has(_(t.session_type)))) {
				if (s) {
					let e = this.schedule?.content_locales?.[0] || null, n = Q(t.content_locale || e);
					if (!n) continue;
					let r = $(n);
					if (!s.has(n) && !(r && c.has(r))) continue;
				}
				if (!n(t)) {
					let e = G.default.tz(t.start, this.currentTimezone);
					if (o && !o.has(e.clone().tz(this.schedule.timezone).format("YYYY-MM-DD"))) continue;
				}
				u.push(T(t, l));
			}
			return t(u);
		},
		inlineScheduleSessions() {
			return c(this.schedule?.talks, {
				timezone: this.currentTimezone,
				speakersLookup: this.speakersLookup,
				tracksLookup: this.tracksLookup,
				roomsLookup: this.roomsLookup,
				includePopularity: !0
			});
		},
		sessions() {
			if (!this.baseSessions) return;
			if (!this.searchQuery) return this.baseSessions;
			let e = this.searchQuery.toLowerCase();
			return this.baseSessions.filter((t) => {
				let n = (t.speakers || []).map((e) => (e?.name || "").toLowerCase()).join(" "), r = (t.track && C(t.track.name) || "").toLowerCase(), i = (t.room && C(t.room.name) || "").toLowerCase(), a = (C(t.title) || "").toLowerCase(), o = (C(t.abstract) || "").toLowerCase();
				return a.includes(e) || o.includes(e) || n.includes(e) || r.includes(e) || i.includes(e);
			});
		},
		sessionsLookup() {
			return this.sessions ? this.sessions.reduce((e, t) => (e[t.id] = t, e), {}) : {};
		},
		rooms() {
			if (!this.baseSessions) return [];
			let e = /* @__PURE__ */ new Set();
			for (let t of this.baseSessions) t.room && e.add(t.room);
			return this.schedule.rooms.filter((t) => e.has(t));
		},
		allDays() {
			if (!this.baseSessions) return [];
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let n of this.baseSessions) {
				if (!n.start) continue;
				let r = n.start.clone().tz(this.currentTimezone).startOf("day"), i = r.valueOf();
				e.has(i) || (e.add(i), t.push(r));
			}
			return t.sort((e, t) => e.diff(t)), t;
		},
		days() {
			if (!this.baseSessions) return;
			let e = [];
			for (let t of this.baseSessions) {
				if (!t.start) continue;
				let n = t.start.clone().tz(this.currentTimezone).startOf("day");
				e.find((e) => e.valueOf() === n.valueOf()) || e.push(n);
			}
			return e.sort((e, t) => e.diff(t)), this.sessionsMode && !this.sortIncludeDate ? e.length ? [e[0]] : [] : e;
		},
		hasAmPm() {
			return new Intl.DateTimeFormat(this.locale, { hour: "numeric" }).resolvedOptions().hour12;
		},
		isSpeakerView() {
			return this.view === "speakers" || this.view === "speaker" || this.view === "featured-speakers";
		},
		isTalkView() {
			return this.view === "talk";
		},
		properSessions() {
			return this.sessions ? this.sessions.filter((e) => f(e)) : [];
		},
		resolvedTalk() {
			return !this.talkCode || !this.sessions ? null : this.sessionsLookup[this.talkCode] || null;
		},
		eventSlug() {
			let e = "";
			e = this.eventUrl.startsWith("http") ? new URL(this.eventUrl) : new URL("http://example.org/" + this.eventUrl);
			let t = e.pathname.split("/").filter((e) => e.length > 0);
			return t[t.length - 1] || e.pathname.replace(/\//g, "");
		},
		remoteApiUrl() {
			if (!this.eventUrl) return "";
			let e;
			try {
				e = new URL(this.eventUrl);
			} catch {
				e = new URL(this.eventUrl, window.location.origin);
			}
			return `${e.protocol}//${e.host}/api/v1/events/${this.eventSlug}/`;
		},
		popularityFeatureEnabled() {
			return z(this.schedule?.feature_flags || {});
		},
		showPopularityOnSchedule() {
			return L({ flags: this.schedule?.feature_flags || {} });
		},
		popularitySortAvailable() {
			return v({ flags: this.schedule?.feature_flags || {} });
		},
		sortOptions() {
			let e = ["title", "title_desc"];
			return this.popularitySortAvailable && e.push("popularity"), e;
		},
		effectiveSortBy() {
			return this.sortOptions.includes(this.sortBy) ? this.sortBy : "title";
		},
		noScheduleMessage() {
			return (this.translationMessages || {}).no_schedule_available || "No schedule has been published yet. Please check back later.";
		}
	},
	watch: {
		popularityFeatureEnabled(e) {
			e || (this.sortIncludePopularity = !1, this.sortBy === "popularity" && (this.sortBy = "title"));
		},
		popularitySortAvailable(e) {
			e || (this.sortIncludePopularity = !1, this.sortBy === "popularity" && (this.sortBy = "title"));
		},
		loggedIn(e) {
			this._initialized && (e || (this.shareStarredSessions = !1), !(!this.schedule || !this.remoteApiUrl) && (this.apiUrl ||= this.remoteApiUrl, this.loadFavs().then((e) => {
				this.favs = this.pruneFavs(e, this.schedule);
			})));
		},
		recordingFilter() {
			this.writeRecordingQueryParam();
		},
		sortIncludeDate() {
			try {
				localStorage.setItem("schedule-include-datetime", String(this.sortIncludeDate));
			} catch {}
		}
	},
	async created() {
		let e = window.location.hash.slice(1);
		this.readRecordingQueryParam(), G.default.locale(this.locale), this.userTimezone = G.default.tz.guess(), this.view === "sessions" && (this.sessionsMode = !0), this.isFeaturedPage && (this.sessionsMode = !0);
		let t = document.querySelector("#pretalx-messages");
		t && (this.onHomeServer = !0, this.userCode = t.dataset.userCode ?? null, this.apiUrl = this.remoteApiUrl, t.dataset.loggedIn === "true" && (this.loggedIn = !0)), typeof PRETALX_MESSAGES < "u" && (this.translationMessages = PRETALX_MESSAGES);
		let n = document.getElementById("pretalx-schedule-data");
		if (n && n.textContent.trim()) try {
			let e = JSON.parse(n.textContent);
			e && typeof e == "object" && (e.timezone || e.schedule_unavailable || Array.isArray(e.talks)) && (this.schedule = e, Array.isArray(this.schedule.talks) || (this.schedule.talks = []));
		} catch {}
		if (this.schedule) this.onHomeServer = !0;
		else if (this.isSpeakerView && this.view === "speakers") this.schedule = {
			talks: [],
			rooms: [],
			schedule_unavailable: !1
		};
		else {
			try {
				this.schedule = await b(this.eventUrl, {
					version: this.version || "",
					enrichData: this.enrichData
				});
			} catch {
				this.scheduleError = !0;
				return;
			}
			if (!this.schedule) {
				this.scheduleUnavailable = !0;
				return;
			}
		}
		let r = document.getElementById("pretalx-schedule-meta");
		if (r) try {
			this.scheduleMeta = JSON.parse(r.textContent);
		} catch {}
		if (this.isSpeakerView || this.isTalkView) {
			if (!this.schedule || this.schedule.schedule_unavailable) {
				this.scheduleUnavailable = !0;
				return;
			}
			this.currentTimezone = localStorage.getItem(`${this.eventSlug}_timezone`), this.currentTimezone = [this.schedule.timezone, this.userTimezone].includes(this.currentTimezone) ? this.currentTimezone : this.schedule.timezone, this.now = G.default.tz(this.currentTimezone), setInterval(() => this.now = G.default.tz(this.currentTimezone), 3e4), this.apiUrl = this.remoteApiUrl || window.location.origin + "/api/v1/events/" + this.eventSlug + "/", this.publicFavsUrl ? (this.favsReadOnly = !0, this.onlyFavs = !0, this.favs = this.pruneFavs(await this.loadPublicFavs(), this.schedule)) : (this.favs = this.pruneFavs(await this.loadFavs(), this.schedule), !this.loggedIn && this.favs.length && this.showAnonymousFavsInfo()), this.view === "speaker" && this.speakerCode && this.fetchSpeakerApiContentIfNeeded(this.speakerCode);
			return;
		}
		if (this.schedule.schedule_unavailable || !this.schedule.talks.length && !this.isFeaturedPage) {
			this.scheduleUnavailable = !0;
			return;
		}
		this.currentTimezone = localStorage.getItem(`${this.eventSlug}_timezone`), this.currentTimezone = [this.schedule.timezone, this.userTimezone].includes(this.currentTimezone) ? this.currentTimezone : this.schedule.timezone, this.days?.length && (this.currentDay = this.days[0].format("YYYY-MM-DD")), this.now = G.default.tz(this.currentTimezone), setInterval(() => this.now = G.default.tz(this.currentTimezone), 3e4), this.scrollParentResizeObserver || (await this.$nextTick(), this.onWindowResize()), this.schedule.tracks.forEach((e) => {
			e.value = e.id, e.label = C(e.name), this.allTracks.push(e);
		}), this.schedule.rooms.forEach((e) => {
			this.allRooms.push({
				id: e.id,
				value: e.id,
				label: C(e.name),
				selected: !1
			});
		});
		let i = /* @__PURE__ */ new Set();
		this.schedule.talks.forEach((e) => {
			let t = _(e.session_type);
			t && !i.has(t) && (i.add(t), this.allTypes.push({
				value: t,
				label: t,
				selected: !1
			}));
		});
		let a = /* @__PURE__ */ new Set();
		if ((this.schedule.content_locales || []).forEach((e) => {
			if (e && !a.has(e)) {
				a.add(e);
				let t = (() => {
					try {
						return new Intl.DisplayNames([this.locale], { type: "language" }).of(e);
					} catch {
						return e;
					}
				})();
				this.allLanguages.push({
					value: e,
					label: t,
					selected: !1
				});
			}
		}), this.schedule.talks.forEach((e) => {
			if (e.content_locale && !a.has(e.content_locale)) {
				a.add(e.content_locale);
				let t = (() => {
					try {
						return new Intl.DisplayNames([this.locale], { type: "language" }).of(e.content_locale);
					} catch {
						return e.content_locale;
					}
				})();
				this.allLanguages.push({
					value: e.content_locale,
					label: t,
					selected: !1
				});
			}
		}), this.apiUrl = this.remoteApiUrl || window.location.origin + "/api/v1/events/" + this.eventSlug + "/", this.publicFavsUrl ? (this.favsReadOnly = !0, this.onlyFavs = !0, this.favs = this.pruneFavs(await this.loadPublicFavs(), this.schedule)) : (this.favs = this.pruneFavs(await this.loadFavs(), this.schedule), !this.loggedIn && this.favs.length && this.showAnonymousFavsInfo()), this.shareStarredSessions = await I(this.eventUrl), e && e.length === 10) {
			let t = G.default.tz(e, this.currentTimezone), n = this.days.filter((e) => e.clone().tz(this.currentTimezone).format("YYYY-MM-DD") === t.format("YYYY-MM-DD"));
			n.length && (this.currentDay = n[0].format("YYYY-MM-DD"));
		}
		this._initialized = !0;
	},
	async mounted() {
		await new Promise((e) => {
			let t = () => {
				if (this.$el.parentElement || this.$el.getRootNode().host) return e();
				setTimeout(t, 100);
			};
			t();
		}), this.scrollParent = x(this.$el.parentElement || this.$el.getRootNode().host), this.scrollParent ? (this.scrollParentResizeObserver = new ResizeObserver(this.onScrollParentResize), this.scrollParentResizeObserver.observe(this.scrollParent), this.scrollParentWidth = this.scrollParent.offsetWidth) : (window.addEventListener("resize", this.onWindowResize), this.onWindowResize());
	},
	destroyed() {},
	methods: {
		getFavStorageKey(e = null) {
			return this.loggedIn && e ? `${this.eventSlug}_${e}_favs` : `${this.eventSlug}_favs`;
		},
		readLocalFavs(e) {
			let t = localStorage.getItem(e);
			if (!t) return [];
			try {
				let e = JSON.parse(t);
				return Array.isArray(e) ? e : [];
			} catch {
				return localStorage.setItem(e, "[]"), [];
			}
		},
		readRecordingQueryParam() {
			try {
				let e = new URL(window.location.href).searchParams.get("recording");
				(e === "yes" || e === "no" || e === "all") && (this.recordingFilter = e);
			} catch {}
		},
		writeRecordingQueryParam() {
			try {
				let e = new URL(window.location.href), t = this.recordingFilter === "yes" || this.recordingFilter === "no" || this.recordingFilter === "all" ? this.recordingFilter : "all";
				e.searchParams.set("recording", t), window.history.replaceState({}, "", e.pathname + e.search + e.hash);
			} catch {}
		},
		setCurrentDay(e) {
			let t = e.format("YYYY-MM-DD");
			if (this.userNavigatingToDay && t !== this.userNavigatingToDay) return;
			let n = this.days.filter((e) => e.format("YYYY-MM-DD") === t);
			if (!n.length) return;
			let r = n[0].format("YYYY-MM-DD");
			if (r === this.currentDay) {
				this.userNavigatingToDay === r && this.clearDayNavigationLock();
				return;
			}
			this.currentDay = r, this.userNavigatingToDay === r && this.clearDayNavigationLock();
		},
		clearDayNavigationLock() {
			this._dayNavTimeout &&= (clearTimeout(this._dayNavTimeout), null), this.userNavigatingToDay = null;
		},
		beginDayNavigation(e) {
			this.clearDayNavigationLock(), this.userNavigatingToDay = e, this._dayNavTimeout = setTimeout(() => this.clearDayNavigationLock(), 2e3);
		},
		changeDay(e) {
			if (e.clone().startOf("day").format("YYYY-MM-DD") !== this.currentDay) {
				this.currentDay = e.clone().startOf("day").format("YYYY-MM-DD");
				try {
					window.history.replaceState(null, null, "#" + e.format("YYYY-MM-DD"));
				} catch {
					window.location.hash = e.format("YYYY-MM-DD");
				}
			}
		},
		selectDay(e) {
			try {
				window.history.replaceState(null, null, "#" + e);
			} catch {
				window.location.hash = e;
			}
			e !== this.currentDay && (this.beginDayNavigation(e), this.currentDay = e), this.forceScrollDay++;
		},
		onWindowResize() {
			this.scrollParentWidth = document.body.offsetWidth;
		},
		saveTimezone() {
			localStorage.setItem(`${this.eventSlug}_timezone`, this.currentTimezone);
		},
		onScrollParentResize(e) {
			this.scrollParentWidth = e[0].contentRect.width;
		},
		async remoteApiRequest(e, t, n) {
			let r = `${new URL(this.eventUrl, window.location.origin).origin}/api/v1/events/${this.eventSlug}/`;
			return this.apiRequest(e, t, n, r);
		},
		async apiRequest(e, t, n, r) {
			let i = u({
				baseUrl: r,
				apiUrl: this.apiUrl,
				remoteApiUrl: this.remoteApiUrl,
				onHomeServer: this.onHomeServer
			});
			if (!i) throw Error("schedule API base URL is not configured");
			let a = `${i}${e}`, o = new Headers();
			this.onHomeServer && o.append("Content-Type", "application/json"), (t === "POST" || t === "DELETE" || t === "PATCH") && o.append("X-CSRFToken", ne());
			let s = await fetch(a, {
				method: t,
				headers: o,
				body: JSON.stringify(n),
				credentials: this.onHomeServer ? "same-origin" : "omit"
			});
			if (!s.ok) throw Error(`HTTP error! status: ${s.status}`);
			return s.json();
		},
		async updateShareStarredSessions(e) {
			let t = this.shareStarredSessions;
			if (this.shareStarredSessions = !!e, this.loggedIn) try {
				this.shareStarredSessions = await l(this.eventUrl, this.shareStarredSessions);
			} catch {
				this.shareStarredSessions = t;
			}
		},
		async loadFavs() {
			let e = this.getFavStorageKey(null), t = this.readLocalFavs(e);
			if (!this.loggedIn) return t;
			let n = this.getFavStorageKey(this.userCode), r = [.../* @__PURE__ */ new Set([...this.readLocalFavs(n), ...t])];
			try {
				let t = await this.apiRequest("submissions/favourites/merge/", "POST", r, this.remoteApiUrl);
				if (Array.isArray(t)) return localStorage.setItem(n, JSON.stringify(t)), localStorage.removeItem(e), t;
			} catch {}
			return r;
		},
		async loadPublicFavs() {
			if (!this.publicFavsUrl) return [];
			try {
				let e = await fetch(this.publicFavsUrl);
				if (!e.ok) return [];
				let t = await e.json();
				if (Array.isArray(t)) return t;
				if (t && Array.isArray(t.favs)) return t.favs;
			} catch {
				return [];
			}
			return [];
		},
		pushErrorMessage(e) {
			!e || !e.length || this.errorMessages.includes(e) || this.errorMessages.push(e);
		},
		showAnonymousFavsInfo() {
			if (this.loggedIn || this.favsReadOnly) return;
			let e = this.translationMessages.favs_anonymous_notice;
			e && this.pushErrorMessage(e);
		},
		pruneFavs(e, t) {
			let n = new Set((t.talks || []).map((e) => e.code));
			return e.filter((e) => n.has(e));
		},
		saveFavs() {
			let e = this.getFavStorageKey(this.loggedIn ? this.userCode : null);
			try {
				return localStorage.setItem(e, JSON.stringify(this.favs)), !0;
			} catch (e) {
				return console.error("Failed to save favourites locally:", e), this.pushErrorMessage(this.translationMessages.favs_not_saved), !1;
			}
		},
		toggleSessionModalFav(e) {
			this.favsReadOnly || (this.favSet.has(e) ? this.unfav(e) : this.fav(e));
		},
		async fav(e) {
			if (this.favsReadOnly || this.favSet.has(e)) return;
			let t = [...this.favs];
			this.favs.push(e);
			let n = this.schedule?.talks?.find((t) => t.code === e), r = n ? Number(n.fav_count || 0) : 0;
			if (n && (n.fav_count = Math.max(0, r + 1)), !this.saveFavs()) {
				this.favs = t, n && (n.fav_count = r);
				return;
			}
			if (!this.loggedIn) {
				this.showAnonymousFavsInfo();
				return;
			}
			try {
				await this.apiRequest(`submissions/${e}/favourite/`, "POST", void 0, this.remoteApiUrl);
			} catch {}
		},
		async unfav(e) {
			if (this.favsReadOnly) return;
			let t = [...this.favs];
			this.favs = this.favs.filter((t) => t !== e);
			let n = this.schedule?.talks?.find((t) => t.code === e), r = n ? Number(n.fav_count || 0) : 0;
			if (n && (n.fav_count = Math.max(0, r - 1)), !this.saveFavs()) {
				this.favs = t, n && (n.fav_count = r);
				return;
			}
			if (!this.loggedIn) {
				this.favs.length || (this.onlyFavs = !1);
				return;
			}
			try {
				await this.apiRequest(`submissions/${e}/favourite/`, "DELETE", void 0, this.remoteApiUrl);
			} catch {}
			this.favs.length || (this.onlyFavs = !1);
		},
		async fetchSpeakerApiContentIfNeeded(e) {
			let t = this.speakersLookup[e];
			if (!t) {
				console.warn(`Speaker with code ${e} not found in speakersLookup.`);
				return;
			}
			if (!(t.apiContent || t.isLoadingApiContent)) {
				t.isLoadingApiContent = !0;
				try {
					t.apiContent = await this.remoteApiRequest(`speakers/${e}/?expand=answers.question`, "GET");
				} catch (t) {
					console.error(`Failed to fetch API content for speaker ${e}:`, t);
				} finally {
					t.isLoadingApiContent = !1;
				}
			}
		},
		async showSpeakerDetails(e, t) {
			t.preventDefault();
			let n = this.speakersLookup[e.code];
			if (!n) {
				console.warn(`Speaker ${e.code} not found for details view.`);
				return;
			}
			let r = this.sessionsBySpeaker[e.code?.toLowerCase()] || this.sessionsBySpeaker[e.code] || [];
			this.modalContent = {
				contentType: "speaker",
				contentObject: {
					...n,
					sessions: r.map((e) => ({
						...e,
						faved: this.favSet.has(e.id)
					})),
					isLoading: !n.apiContent
				}
			}, this.$refs.sessionModal?.showModal(), await this.fetchSpeakerApiContentIfNeeded(e.code), this.modalContent && this.modalContent.contentType === "speaker" && this.modalContent.contentObject.code === e.code && (this.modalContent = {
				contentType: "speaker",
				contentObject: {
					...this.speakersLookup[e.code],
					sessions: r.map((e) => ({
						...e,
						faved: this.favSet.has(e.id)
					})),
					isLoading: !1
				}
			});
		},
		computedExporters(e) {
			return P(this.eventUrl, e);
		},
		async showSessionDetails(e, t) {
			t.preventDefault();
			let n = this.talksLookup[e.id], r = e.exporters || (this.onHomeServer && !this.exportsDisabled ? this.computedExporters(e.id) : null);
			if (this.modalContent = {
				contentType: "session",
				contentObject: {
					...e,
					exporters: r,
					apiContent: n.apiContent,
					isLoading: !n.apiContent,
					faved: this.favSet.has(e.id)
				}
			}, this.$refs.sessionModal?.showModal(), !n.apiContent) try {
				this.modalContent && this.modalContent.contentType === "session" && this.modalContent.contentObject.id === e.id && (this.modalContent.contentObject.isLoading = !0), n.apiContent = await this.remoteApiRequest(`submissions/${e.id}/?expand=answers.question,resources`, "GET"), this.modalContent && this.modalContent.contentType === "session" && this.modalContent.contentObject.id === e.id && (this.modalContent = {
					contentType: "session",
					contentObject: {
						...e,
						exporters: r,
						apiContent: n.apiContent,
						isLoading: !1,
						faved: this.favSet.has(e.id)
					}
				});
			} catch (t) {
				console.error("Failed to fetch session details:", t), this.modalContent && this.modalContent.contentType === "session" && this.modalContent.contentObject.id === e.id && (this.modalContent.contentObject.isLoading = !1);
			}
			if (e.speakers && e.speakers.length > 0) {
				let t = e.speakers.map((e) => this.fetchSpeakerApiContentIfNeeded(e.code));
				Promise.allSettled(t);
			}
		},
		resetAllFilters() {
			this.allTracks.forEach((e) => e.selected = !1), this.allRooms.forEach((e) => e.selected = !1), this.allTypes.forEach((e) => e.selected = !1), this.allLanguages.forEach((e) => e.selected = !1), this.recordingFilter = "all";
		},
		setTimeDensityMinutes(e) {
			let t = Number(e), n = Number.isFinite(t) && t > 0 ? t : 30;
			this.timeDensityMinutes = n;
			try {
				localStorage.setItem("schedule-time-density-minutes", String(this.timeDensityMinutes));
			} catch {}
		}
	}
}, [["render", pe], ["styles", [me]]]), { configureApp(e) {
	e.use(H);
} });
customElements.define("pretalx-schedule", ye);
//#endregion
