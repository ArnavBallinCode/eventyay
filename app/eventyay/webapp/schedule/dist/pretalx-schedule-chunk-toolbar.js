import { $ as e, G as t, L as n, Q as r, R as i, U as a, V as ee, W as o, Y as s, Z as c, bt as l, gt as te, ht as ne, lt as u, tt as re, ut as d, xt as f, yt as p } from "./pretalx-schedule-chunk-grid.js";
//#region src/components/ScheduleToolbar.vue?vue&type=template&lang.js
var ie = {
	key: 0,
	class: "version-warning-banner",
	ref: "versionBanner"
}, ae = { class: "version-warning-text" }, m = ["href"], h = {
	class: "toolbar-row",
	ref: "toolbarRow"
}, g = { class: "toolbar-left" }, _ = ["aria-expanded", "aria-label"], v = {
	key: 0,
	class: "mobile-toggle-badge"
}, y = ["aria-label", "onClick"], b = { class: "filter-title" }, x = { class: "filter-title-text" }, S = {
	key: 0,
	class: "filter-dot"
}, C = {
	key: 0,
	class: "filter-dropdown-menu"
}, w = ["checked", "onChange"], T = {
	key: 1,
	class: "filter-dropdown-empty"
}, E = {
	key: 0,
	class: "recording-filter-area",
	ref: "recordingDropdown"
}, D = ["aria-label", "aria-expanded"], O = ["aria-checked"], k = ["aria-checked"], A = ["aria-checked"], j = {
	key: 0,
	class: "filter-dropdown-area language-filter-area",
	ref: "filterDrop_language"
}, M = ["aria-label"], N = { class: "filter-title filter-icon-title" }, P = {
	key: 0,
	class: "filter-dot"
}, F = {
	key: 0,
	class: "filter-dropdown-menu"
}, I = ["checked", "onChange"], L = { class: "filter-dropdown-label" }, R = {
	key: 1,
	class: "filter-dropdown-empty"
}, z = [
	"disabled",
	"aria-label",
	"aria-pressed"
], B = {
	class: "star-icon",
	viewBox: "0 0 24 24",
	"aria-hidden": "true"
}, V = ["aria-label", "aria-pressed"], H = ["aria-label"], U = {
	key: 4,
	class: "sort-area",
	ref: "sortDropdown"
}, W = ["aria-label", "aria-expanded"], G = ["aria-checked", "onClick"], K = { class: "template-sort-inclusion" }, q = { class: "sort-inclusion-row" }, J = { class: "sort-inclusion-label" }, oe = ["aria-label", "aria-checked"], se = { class: "sort-inclusion-row" }, ce = { class: "sort-inclusion-label" }, le = ["aria-label", "aria-checked"], ue = {
	key: 0,
	class: "sort-inclusion-row"
}, de = { class: "sort-inclusion-label" }, fe = ["aria-label", "aria-checked"], pe = ["title", "aria-label"], me = {
	key: 0,
	class: "tb-icon",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": "2"
}, he = {
	key: 1,
	class: "tb-icon",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": "2",
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
}, ge = { class: "sessions-toggle-label" }, _e = {
	key: 0,
	class: "toolbar-center",
	ref: "dayNavCenter"
}, ve = [
	"disabled",
	"title",
	"aria-label"
], ye = ["onClick"], be = [
	"disabled",
	"title",
	"aria-label"
], xe = { class: "toolbar-right" }, Se = {
	class: "search-area",
	ref: "searchArea"
}, Ce = ["aria-label"], we = ["value", "placeholder"], Te = ["aria-label"], Ee = ["aria-label"], De = {
	key: 0,
	class: "tb-icon",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": "2"
}, Oe = {
	key: 1,
	class: "tb-icon",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": "2"
}, ke = ["aria-expanded", "aria-label"], Ae = { class: "toolbar-right-quick" }, je = { class: "timezone-area" }, Me = {
	class: "timezone-compact",
	ref: "timezoneDropdown"
}, Ne = ["title"], Pe = { class: "tz-label" }, Fe = {
	key: 0,
	class: "tz-dropdown-menu"
}, Ie = ["onClick"], Le = { class: "tz-section-label" }, Re = { class: "tz-scroll" }, ze = ["onClick"], Be = {
	key: 0,
	class: "exporter-area"
}, Ve = {
	class: "exporter-dropdown",
	ref: "exportDropdown"
}, He = ["aria-label", "aria-expanded"], Ue = {
	key: 0,
	class: "exporter-menu"
}, We = ["href", "onMouseover"], Ge = {
	key: 0,
	class: "exporter-icon"
}, Ke = ["innerHTML"], qe = { class: "exporter-name" }, Je = ["innerHTML"], Ye = {
	key: 0,
	class: "version-area"
}, Xe = {
	class: "version-dropdown",
	ref: "versionDropdown"
}, Ze = ["aria-label"], Qe = { class: "version-current" }, Y = {
	key: 0,
	class: "version-menu"
}, $e = ["href"], et = {
	key: 0,
	class: "version-current-badge"
}, tt = {
	key: 0,
	class: "version-menu-divider"
}, nt = ["href"], rt = {
	class: "density-area",
	ref: "densityDropdown"
}, it = ["aria-label", "aria-expanded"], at = ["aria-checked", "onClick"], ot = ["aria-label"], st = ["aria-label"], ct = {
	key: 0,
	class: "tb-icon",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": "2"
}, lt = {
	key: 1,
	class: "tb-icon",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": "2"
};
function X(n, X, Z, ut, Q, $) {
	return u(), r("div", { class: p(["c-schedule-toolbar", {
		"mobile-filters-open": Q.mobileFiltersOpen,
		"mobile-more-open": Q.mobileMoreOpen
	}]) }, [!Z.isFeaturedPage && $.showVersionWarningBanner ? (u(), r("div", ie, [s("span", ae, f($.versionWarningText), 1), Z.currentScheduleUrl && !$.isWipPreview ? (u(), r("a", {
		key: 0,
		class: "current-version-link",
		href: Z.currentScheduleUrl
	}, f($.t.go_to_current_version), 9, m)) : c("", !0)], 512)) : c("", !0), s("div", h, [
		s("div", g, [
			s("button", {
				class: p(["toolbar-btn mobile-toggle-btn mobile-filter-toggle icon-only tooltip-align-left", { active: Q.mobileFiltersOpen || $.effectiveHasActiveFilters }]),
				onClick: X[0] ||= (...e) => $.toggleMobileFilters && $.toggleMobileFilters(...e),
				"aria-expanded": Q.mobileFiltersOpen ? "true" : "false",
				"aria-label": $.t.filters
			}, [X[37] ||= s("svg", {
				class: "tb-icon",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2"
			}, [
				s("line", {
					x1: "4",
					y1: "6",
					x2: "20",
					y2: "6"
				}),
				s("line", {
					x1: "7",
					y1: "12",
					x2: "17",
					y2: "12"
				}),
				s("line", {
					x1: "10",
					y1: "18",
					x2: "14",
					y2: "18"
				})
			], -1), $.effectiveHasActiveFilters ? (u(), r("span", v)) : c("", !0)], 10, _),
			s("div", {
				class: p(["toolbar-filters", { open: Q.mobileFiltersOpen }]),
				ref: "mobileFiltersPanel"
			}, [(u(!0), r(t, null, d($.nonLanguageFilterGroups, (e) => (u(), r("div", {
				key: e.refKey,
				class: "filter-dropdown-area",
				ref_for: !0,
				ref: "filterDrop_" + e.refKey
			}, [s("button", {
				class: "toolbar-btn",
				"aria-label": e.title,
				onClick: (t) => $.toggleFilterDropdown(e.refKey)
			}, [s("span", b, [s("span", x, f(e.title), 1), $.selectedCount(e) > 0 ? (u(), r("span", S)) : c("", !0)]), (u(), r("svg", {
				class: p(["chevron-icon", { open: Q.openFilterDropdowns[e.refKey] }]),
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2"
			}, [...X[38] ||= [s("path", { d: "M6 9l6 6 6-6" }, null, -1)]], 2))], 8, y), Q.openFilterDropdowns[e.refKey] ? (u(), r("div", C, [e.data.length ? (u(!0), r(t, { key: 0 }, d(e.data, (e) => (u(), r("label", {
				class: "filter-dropdown-item",
				key: e.value
			}, [
				s("input", {
					class: "filter-checkbox",
					type: "checkbox",
					checked: e.selected,
					onChange: (t) => $.toggleFilter(e)
				}, null, 40, w),
				e.color ? (u(), r("span", {
					key: 0,
					class: "track-color-dot",
					style: l({ backgroundColor: e.color })
				}, null, 4)) : c("", !0),
				s("span", {
					class: "filter-dropdown-label",
					style: l(e.color ? { "--track-color": e.color } : {})
				}, f(e.label), 5)
			]))), 128)) : (u(), r("div", T, "No " + f(e.title.toLowerCase()) + " available", 1))])) : c("", !0)], 512))), 128)), Z.showRecordingFilter ? (u(), r("div", E, [s("button", {
				class: p(["toolbar-btn icon-only recording-btn", { active: $.recordingModel !== "all" }]),
				onClick: X[1] ||= (...e) => $.toggleRecordingDropdown && $.toggleRecordingDropdown(...e),
				onKeydown: X[2] ||= a(o((...e) => $.closeRecordingDropdown && $.closeRecordingDropdown(...e), ["prevent", "stop"]), ["esc"]),
				"aria-label": $.t.filter_by_recording,
				"aria-expanded": Q.recordingOpen ? "true" : "false",
				"aria-haspopup": "menu"
			}, [...X[39] ||= [s("svg", {
				class: "tb-icon",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2",
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			}, [s("path", { d: "M4 7a2 2 0 012-2h8l2 2h2a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V7z" }), s("path", { d: "M15 12l5-3v6l-5-3z" })], -1)]], 42, D), Q.recordingOpen ? (u(), r("div", {
				key: 0,
				class: "recording-dropdown-menu",
				role: "menu",
				onKeydown: [
					X[6] ||= a(o((...e) => $.closeRecordingDropdown && $.closeRecordingDropdown(...e), ["prevent", "stop"]), ["esc"]),
					X[7] ||= a(o((...e) => $.focusNextRecordingOption && $.focusNextRecordingOption(...e), ["prevent", "stop"]), ["down"]),
					X[8] ||= a(o((...e) => $.focusPrevRecordingOption && $.focusPrevRecordingOption(...e), ["prevent", "stop"]), ["up"])
				]
			}, [
				s("button", {
					class: p(["recording-item", { active: $.recordingModel === "all" }]),
					ref: "recordingOptionButtons",
					role: "menuitemradio",
					"aria-checked": $.recordingModel === "all" ? "true" : "false",
					onClick: X[3] ||= (e) => $.selectRecording("all")
				}, f($.t.all_sessions), 11, O),
				s("button", {
					class: p(["recording-item", { active: $.recordingModel === "yes" }]),
					ref: "recordingOptionButtons",
					role: "menuitemradio",
					"aria-checked": $.recordingModel === "yes" ? "true" : "false",
					onClick: X[4] ||= (e) => $.selectRecording("yes")
				}, f($.t.recorded_only), 11, k),
				s("button", {
					class: p(["recording-item", { active: $.recordingModel === "no" }]),
					ref: "recordingOptionButtons",
					role: "menuitemradio",
					"aria-checked": $.recordingModel === "no" ? "true" : "false",
					onClick: X[5] ||= (e) => $.selectRecording("no")
				}, f($.t.not_recorded), 11, A)
			], 32)) : c("", !0)], 512)) : c("", !0)], 2),
			$.languageGroup ? (u(), r("div", j, [s("button", {
				class: "toolbar-btn icon-only",
				"aria-label": $.languageGroup.title,
				onClick: X[9] ||= (e) => $.toggleFilterDropdown($.languageGroup.refKey)
			}, [s("span", N, [X[40] ||= s("svg", {
				class: "tb-icon",
				viewBox: "0 0 24 24",
				fill: "currentColor",
				"aria-hidden": "true"
			}, [s("path", { d: "M12.87 15.07l-2.54-2.51c.86-1.02 1.52-2.12 1.99-3.28H14V7h-4V5H8v2H4v2h7.17c-.39 1.17-.96 2.27-1.7 3.25-.48-.63-.9-1.31-1.25-2.03H6.1c.5 1.09 1.17 2.14 2 3.11L3 20h2l5-5 3.11 3.11.76-3.04z" }), s("path", { d: "M15.5 11h-2L9 22h2l1-3h4l1 3h2l-3.5-11zm-2.3 6 .8-2.8.8 2.8h-1.6z" })], -1), $.selectedCount($.languageGroup) > 0 ? (u(), r("span", P)) : c("", !0)])], 8, M), Q.openFilterDropdowns[$.languageGroup.refKey] ? (u(), r("div", F, [$.languageGroup.data.length ? (u(!0), r(t, { key: 0 }, d($.languageGroup.data, (e) => (u(), r("label", {
				class: "filter-dropdown-item",
				key: e.value
			}, [s("input", {
				class: "filter-checkbox",
				type: "checkbox",
				checked: e.selected,
				onChange: (t) => $.toggleFilter(e)
			}, null, 40, I), s("span", L, f(e.label), 1)]))), 128)) : (u(), r("div", R, "No " + f($.languageGroup.title.toLowerCase()) + " available", 1))])) : c("", !0)], 512)) : c("", !0),
			Z.favsCount ? (u(), r("button", {
				key: 1,
				class: "toolbar-btn icon-only fav-toggle",
				disabled: !Z.favsCount,
				"aria-label": $.t.starred,
				"aria-pressed": Z.onlyFavs ? "true" : "false",
				onClick: X[10] ||= (e) => n.$emit("toggleFavs")
			}, [(u(), r("svg", B, [s("polygon", {
				style: l(Z.onlyFavs ? {
					fill: "#FFA000",
					stroke: "#FFA000"
				} : {
					fill: "none",
					stroke: "#B0B0B0"
				}),
				points: "14.43,10 12,2 9.57,10 2,10 8.18,14.41 5.83,22 12,17.31 18.18,22 15.83,14.41 22,10"
			}, null, 4)]))], 8, z)) : c("", !0),
			Z.onlyFavs && Z.popularityFeatureEnabled && Z.scheduleUserLoggedIn ? (u(), r("button", {
				key: 2,
				class: p(["toolbar-btn icon-only share-starred-toggle tooltip-align-left", { active: Z.shareStarredSessions }]),
				"aria-label": $.t.show_talk_starrers_tooltip,
				"aria-pressed": Z.shareStarredSessions ? "true" : "false",
				onClick: X[11] ||= (...e) => $.toggleShareStarredSessions && $.toggleShareStarredSessions(...e)
			}, [...X[41] ||= [e("<svg class=\"tb-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"18\" cy=\"5\" r=\"3\"></circle><circle cx=\"6\" cy=\"12\" r=\"3\"></circle><circle cx=\"18\" cy=\"19\" r=\"3\"></circle><line x1=\"8.59\" y1=\"13.51\" x2=\"15.42\" y2=\"17.49\"></line><line x1=\"15.41\" y1=\"6.51\" x2=\"8.59\" y2=\"10.49\"></line></svg>", 1)]], 10, V)) : c("", !0),
			Z.hasActiveFilters ? (u(), r("button", {
				key: 3,
				class: "toolbar-btn icon-only clear-filters-btn",
				"aria-label": $.t.reset_all_filters,
				onClick: X[12] ||= (e) => n.$emit("resetFilters")
			}, [...X[42] ||= [e("<svg class=\"tb-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"4\" y1=\"4\" x2=\"20\" y2=\"4\"></line><line x1=\"7\" y1=\"9\" x2=\"17\" y2=\"9\"></line><line x1=\"10\" y1=\"14\" x2=\"14\" y2=\"14\"></line><path d=\"M17 17l4 4m0-4l-4 4\"></path></svg>", 1)]], 8, H)) : c("", !0),
			Z.sessionsMode ? (u(), r("div", U, [s("button", {
				class: p(["toolbar-btn icon-only sort-btn", { open: Q.sortOpen }]),
				onClick: X[13] ||= (e) => Q.sortOpen = !Q.sortOpen,
				"aria-label": $.t.sort_by,
				"aria-expanded": Q.sortOpen ? "true" : "false",
				"aria-haspopup": "menu"
			}, [...X[43] ||= [e("<svg class=\"tb-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"4\" y1=\"6\" x2=\"8\" y2=\"6\"></line><line x1=\"4\" y1=\"12\" x2=\"14\" y2=\"12\"></line><line x1=\"4\" y1=\"18\" x2=\"20\" y2=\"18\"></line><line x1=\"18\" y1=\"3\" x2=\"18\" y2=\"15\"></line><polyline points=\"15 12 18 15 21 12\"></polyline></svg>", 1)]], 10, W), Q.sortOpen ? (u(), r("div", {
				key: 0,
				class: "sort-dropdown-menu",
				role: "menu",
				onKeydown: X[17] ||= a(o((e) => Q.sortOpen = !1, ["prevent", "stop"]), ["esc"])
			}, [
				(u(!0), r(t, null, d($.resolvedSortOptions, (e) => (u(), r("button", {
					class: p(["sort-item", { active: $.sortModel === e.value }]),
					key: e.value,
					role: "menuitemradio",
					"aria-checked": $.sortModel === e.value ? "true" : "false",
					onClick: (t) => $.selectSort(e.value)
				}, f(e.label), 11, G))), 128)),
				X[47] ||= s("div", { class: "sort-menu-divider" }, null, -1),
				s("div", K, [
					s("div", q, [s("span", J, f($.t.sort_include_room), 1), s("button", {
						class: p(["sort-toggle-slider", { on: $.includeRoomSortKeyModel }]),
						type: "button",
						role: "menuitemcheckbox",
						"aria-label": $.t.sort_include_room,
						"aria-checked": $.includeRoomSortKeyModel ? "true" : "false",
						onClick: X[14] ||= o((...e) => $.toggleRoomSort && $.toggleRoomSort(...e), ["prevent", "stop"])
					}, [...X[44] ||= [s("span", {
						class: "toggle-slider",
						"aria-hidden": "true"
					}, null, -1)]], 10, oe)]),
					s("div", se, [s("span", ce, f($.t.sort_include_datetime), 1), s("button", {
						class: p(["sort-toggle-slider", { on: $.includeDateSortKeyModel }]),
						type: "button",
						role: "menuitemcheckbox",
						"aria-label": $.t.sort_include_datetime,
						"aria-checked": $.includeDateSortKeyModel ? "true" : "false",
						onClick: X[15] ||= o((...e) => $.toggleDatetimeSort && $.toggleDatetimeSort(...e), ["prevent", "stop"])
					}, [...X[45] ||= [s("span", {
						class: "toggle-slider",
						"aria-hidden": "true"
					}, null, -1)]], 10, le)]),
					Z.popularitySortAvailable ? (u(), r("div", ue, [s("span", de, f($.t.sort_include_popularity), 1), s("button", {
						class: p(["sort-toggle-slider", { on: $.includePopularitySortKeyModel }]),
						type: "button",
						role: "menuitemcheckbox",
						"aria-label": $.t.sort_include_popularity,
						"aria-checked": $.includePopularitySortKeyModel ? "true" : "false",
						onClick: X[16] ||= o((...e) => $.togglePopularitySort && $.togglePopularitySort(...e), ["prevent", "stop"])
					}, [...X[46] ||= [s("span", {
						class: "toggle-slider",
						"aria-hidden": "true"
					}, null, -1)]], 10, fe)])) : c("", !0)
				])
			], 32)) : c("", !0)], 512)) : c("", !0),
			Z.isFeaturedPage ? c("", !0) : (u(), r("button", {
				key: 5,
				class: p(["toolbar-btn sessions-toggle", { active: Z.sessionsMode }]),
				onClick: X[18] ||= (e) => n.$emit("toggleSessionsMode"),
				title: Z.sessionsMode ? $.t.cal : $.t.list,
				"aria-label": Z.sessionsMode ? $.t.cal : $.t.list
			}, [Z.sessionsMode ? (u(), r("svg", me, [...X[48] ||= [
				s("rect", {
					x: "3",
					y: "4",
					width: "18",
					height: "18",
					rx: "2",
					ry: "2"
				}, null, -1),
				s("line", {
					x1: "16",
					y1: "2",
					x2: "16",
					y2: "6"
				}, null, -1),
				s("line", {
					x1: "8",
					y1: "2",
					x2: "8",
					y2: "6"
				}, null, -1),
				s("line", {
					x1: "3",
					y1: "10",
					x2: "21",
					y2: "10"
				}, null, -1)
			]])) : (u(), r("svg", he, [...X[49] ||= [e("<line x1=\"8\" y1=\"6\" x2=\"21\" y2=\"6\"></line><line x1=\"8\" y1=\"12\" x2=\"21\" y2=\"12\"></line><line x1=\"8\" y1=\"18\" x2=\"21\" y2=\"18\"></line><line x1=\"3\" y1=\"6\" x2=\"3.01\" y2=\"6\"></line><line x1=\"3\" y1=\"12\" x2=\"3.01\" y2=\"12\"></line><line x1=\"3\" y1=\"18\" x2=\"3.01\" y2=\"18\"></line>", 6)]])), s("span", ge, f(Z.sessionsMode ? $.t.cal : $.t.list), 1)], 10, pe))
		]),
		!Z.isListView && Z.days && Z.days.length > 1 ? (u(), r("div", _e, [
			$.showDayArrows ? (u(), r("button", {
				key: 0,
				class: "day-arrow",
				disabled: Q.dayWindowStart <= 0,
				onClick: X[19] ||= (e) => $.shiftDays(-1),
				title: $.t.previous_days,
				"aria-label": $.t.previous_days
			}, [...X[50] ||= [s("svg", {
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2"
			}, [s("path", { d: "M15 18l-6-6 6-6" })], -1)]], 8, ve)) : c("", !0),
			(u(!0), r(t, null, d($.visibleDays, (e) => (u(), r("button", {
				class: p(["day-btn", { active: Z.currentDay === e.id }]),
				key: e.id,
				onClick: (t) => n.$emit("selectDay", e.id)
			}, f(e.label), 11, ye))), 128)),
			$.showDayArrows ? (u(), r("button", {
				key: 1,
				class: "day-arrow",
				disabled: Q.dayWindowStart + $.dayWindowSize >= Z.days.length,
				onClick: X[20] ||= (e) => $.shiftDays(1),
				title: $.t.next_days,
				"aria-label": $.t.next_days
			}, [...X[51] ||= [s("svg", {
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2"
			}, [s("path", { d: "M9 18l6-6-6-6" })], -1)]], 8, be)) : c("", !0)
		], 512)) : c("", !0),
		s("div", xe, [
			s("div", Se, [s("div", { class: p(["search-compact", { expanded: Q.searchExpanded }]) }, [
				s("button", {
					class: "toolbar-btn icon-only search-toggle",
					onClick: X[21] ||= (...e) => $.toggleSearch && $.toggleSearch(...e),
					"aria-label": $.t.search
				}, [...X[52] ||= [s("svg", {
					class: "tb-icon",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					"stroke-width": "2"
				}, [s("circle", {
					cx: "11",
					cy: "11",
					r: "8"
				}), s("line", {
					x1: "21",
					y1: "21",
					x2: "16.65",
					y2: "16.65"
				})], -1)]], 8, Ce),
				Q.searchExpanded ? (u(), r("input", {
					key: 0,
					class: "search-input",
					ref: "searchInput",
					value: Z.searchQuery,
					onInput: X[22] ||= (e) => n.$emit("update:searchQuery", e.target.value),
					placeholder: $.t.search_placeholder,
					onKeydown: X[23] ||= a((...e) => $.closeSearch && $.closeSearch(...e), ["esc"])
				}, null, 40, we)) : c("", !0),
				Q.searchExpanded && Z.searchQuery ? (u(), r("button", {
					key: 1,
					class: "search-clear",
					onClick: X[24] ||= (e) => {
						n.$emit("update:searchQuery", ""), n.$refs.searchInput.focus();
					},
					"aria-label": $.t.clear_search
				}, [...X[53] ||= [s("svg", {
					class: "tb-icon",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					"stroke-width": "2"
				}, [s("path", { d: "M18 6L6 18M6 6l12 12" })], -1)]], 8, Te)) : c("", !0)
			], 2)], 512),
			Z.showFullscreen ? (u(), r("button", {
				key: 0,
				class: "toolbar-btn icon-only fullscreen-quick tooltip-align-right",
				onClick: X[25] ||= (...e) => $.toggleFullscreen && $.toggleFullscreen(...e),
				"aria-label": Q.isFullscreen ? $.t.exit_fullscreen : $.t.fullscreen
			}, [Q.isFullscreen ? (u(), r("svg", Oe, [...X[55] ||= [
				s("polyline", { points: "4 14 10 14 10 20" }, null, -1),
				s("polyline", { points: "20 10 14 10 14 4" }, null, -1),
				s("line", {
					x1: "14",
					y1: "10",
					x2: "21",
					y2: "3"
				}, null, -1),
				s("line", {
					x1: "3",
					y1: "21",
					x2: "10",
					y2: "14"
				}, null, -1)
			]])) : (u(), r("svg", De, [...X[54] ||= [
				s("polyline", { points: "15 3 21 3 21 9" }, null, -1),
				s("polyline", { points: "9 21 3 21 3 15" }, null, -1),
				s("line", {
					x1: "21",
					y1: "3",
					x2: "14",
					y2: "10"
				}, null, -1),
				s("line", {
					x1: "3",
					y1: "21",
					x2: "10",
					y2: "14"
				}, null, -1)
			]]))], 8, Ee)) : c("", !0),
			s("button", {
				class: p(["toolbar-btn mobile-toggle-btn mobile-more-toggle", { active: Q.mobileMoreOpen }]),
				onClick: X[26] ||= (...e) => $.toggleMobileMore && $.toggleMobileMore(...e),
				"aria-expanded": Q.mobileMoreOpen ? "true" : "false",
				"aria-label": $.t.more
			}, [...X[56] ||= [s("svg", {
				class: "tb-icon",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2"
			}, [
				s("line", {
					x1: "4",
					y1: "7",
					x2: "20",
					y2: "7"
				}),
				s("line", {
					x1: "4",
					y1: "12",
					x2: "20",
					y2: "12"
				}),
				s("line", {
					x1: "4",
					y1: "17",
					x2: "20",
					y2: "17"
				})
			], -1)]], 10, ke),
			s("div", Ae, [s("div", je, [s("div", Me, [s("button", {
				class: "toolbar-btn tz-btn",
				onClick: X[27] ||= (...e) => $.toggleTzDropdown && $.toggleTzDropdown(...e),
				title: $.timezoneModel
			}, [
				X[58] ||= s("svg", {
					class: "tb-icon",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					"stroke-width": "2"
				}, [
					s("circle", {
						cx: "12",
						cy: "12",
						r: "10"
					}),
					s("line", {
						x1: "2",
						y1: "12",
						x2: "22",
						y2: "12"
					}),
					s("path", { d: "M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" })
				], -1),
				s("span", Pe, f($.timezoneModel.replace(/^.*\//, "").replace(/_/g, " ")), 1),
				(u(), r("svg", {
					class: p(["chevron-icon", { open: Q.tzOpen }]),
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					"stroke-width": "2"
				}, [...X[57] ||= [s("path", { d: "M6 9l6 6 6-6" }, null, -1)]], 2))
			], 8, Ne), Q.tzOpen ? (u(), r("div", Fe, [
				X[59] ||= s("div", { class: "tz-section-label" }, "Pinned", -1),
				(u(!0), r(t, null, d($.pinnedTimezones, (e) => (u(), r("div", {
					class: p(["tz-option", { active: $.timezoneModel === e.id }]),
					key: e.id,
					onClick: (t) => {
						$.selectTimezone(e.id), Q.tzOpen = !1;
					}
				}, [s("span", null, f(e.label), 1)], 10, Ie))), 128)),
				X[60] ||= s("div", { class: "tz-divider" }, null, -1),
				s("div", Le, f($.t.other_timezones), 1),
				te(s("input", {
					class: "tz-search",
					"onUpdate:modelValue": X[28] ||= (e) => Q.tzSearch = e,
					placeholder: "Search timezones...",
					onClick: X[29] ||= o(() => {}, ["stop"])
				}, null, 512), [[ee, Q.tzSearch]]),
				s("div", Re, [(u(!0), r(t, null, d($.filteredOtherTimezones, (e) => (u(), r("div", {
					class: p(["tz-option", { active: $.timezoneModel === e.id }]),
					key: e.id,
					onClick: (t) => {
						$.selectTimezone(e.id), Q.tzOpen = !1;
					}
				}, [s("span", null, f(e.label), 1)], 10, ze))), 128))])
			])) : c("", !0)], 512)]), $.resolvedExporters.length || Z.exportsDisabled ? (u(), r("div", Be, [s("div", Ve, [s("button", {
				class: p(["toolbar-btn icon-only tooltip-align-right", { disabled: Z.exportsDisabled }]),
				onClick: X[30] ||= (e) => !Z.exportsDisabled && (Q.exportOpen = !Q.exportOpen),
				"aria-label": Z.exportsDisabled ? $.publicOnlyFeatureHint : $.t.add_to_calendar,
				"aria-expanded": Q.exportOpen ? "true" : "false",
				"aria-haspopup": "menu"
			}, [...X[61] ||= [e("<svg class=\"tb-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"></line><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"></line><line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"></line><line x1=\"12\" y1=\"14\" x2=\"12\" y2=\"18\"></line><line x1=\"10\" y1=\"16\" x2=\"14\" y2=\"16\"></line></svg>", 1)]], 10, He), Q.exportOpen ? (u(), r("div", Ue, [(u(!0), r(t, null, d($.resolvedExporters, (e) => (u(), r("a", {
				class: "exporter-item",
				key: e.identifier,
				href: e.export_url,
				target: "_blank",
				onMouseover: (t) => Q.hoveredExporter = e,
				onMouseleave: X[31] ||= (e) => Q.hoveredExporter = null
			}, [
				e.icon ? (u(), r("span", Ge, [(u(), r("svg", {
					class: "tb-icon",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					"stroke-width": "2",
					innerHTML: $.faIconSvg(e.icon)
				}, null, 8, Ke))])) : c("", !0),
				s("span", qe, f(e.verbose_name), 1),
				re(i, { name: "fade" }, {
					default: ne(() => [Q.hoveredExporter === e && e.qrcode_svg ? (u(), r("div", {
						key: 0,
						class: "qr-hover",
						innerHTML: e.qrcode_svg
					}, null, 8, Je)) : c("", !0)]),
					_: 2
				}, 1024)
			], 40, We))), 128))])) : c("", !0)], 512)])) : c("", !0)]),
			s("div", {
				class: p(["toolbar-secondary", { open: Q.mobileMoreOpen }]),
				ref: "mobileMorePanel"
			}, [
				!Z.isFeaturedPage && ($.versionOptions.length || Z.changelogUrl || $.isWipPreview) ? (u(), r("div", Ye, [s("div", Xe, [s("button", {
					class: p(["toolbar-btn version-btn tooltip-align-right", { disabled: $.isWipPreview }]),
					onClick: X[32] ||= (e) => !$.isWipPreview && (Q.versionOpen = !Q.versionOpen),
					"aria-label": $.isWipPreview ? $.publicOnlyFeatureHint : void 0
				}, [
					X[63] ||= s("svg", {
						class: "tb-icon",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						"stroke-width": "2"
					}, [s("path", { d: "M12 8v4l3 3" }), s("circle", {
						cx: "12",
						cy: "12",
						r: "10"
					})], -1),
					s("span", Qe, f($.currentVersionLabel), 1),
					(u(), r("svg", {
						class: p(["chevron-icon", { open: Q.versionOpen }]),
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						"stroke-width": "2"
					}, [...X[62] ||= [s("path", { d: "M6 9l6 6 6-6" }, null, -1)]], 2))
				], 10, Ze), Q.versionOpen ? (u(), r("div", Y, [
					(u(!0), r(t, null, d($.versionOptions, (e) => (u(), r("a", {
						class: p(["version-item", { active: e.version === Z.version }]),
						key: e.version,
						href: e.url
					}, [s("span", null, f($.formatVersionLabel(e.version)), 1), e.isCurrent ? (u(), r("span", et, f($.t.current), 1)) : c("", !0)], 10, $e))), 128)),
					Z.changelogUrl && $.versionOptions.length ? (u(), r("div", tt)) : c("", !0),
					Z.changelogUrl ? (u(), r("a", {
						key: 1,
						class: "version-item changelog-link",
						href: Z.changelogUrl
					}, [X[64] ||= s("svg", {
						class: "tb-icon",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						"stroke-width": "2"
					}, [s("path", { d: "M4 19.5A2.5 2.5 0 016.5 17H20" }), s("path", { d: "M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" })], -1), s("span", null, f($.t.view_changelog), 1)], 8, nt)) : c("", !0)
				])) : c("", !0)], 512)])) : c("", !0),
				s("div", rt, [s("button", {
					class: "toolbar-btn icon-only density-btn",
					onClick: X[33] ||= (e) => Q.densityOpen = !Q.densityOpen,
					"aria-label": $.currentTimeDensityLabel,
					"aria-expanded": Q.densityOpen ? "true" : "false",
					"aria-haspopup": "menu"
				}, [...X[65] ||= [e("<svg class=\"tb-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"6\"></line><line x1=\"6\" y1=\"18\" x2=\"18\" y2=\"18\"></line><line x1=\"6\" y1=\"12\" x2=\"18\" y2=\"12\"></line><polyline points=\"12 9 12 6\"></polyline><polyline points=\"12 15 12 18\"></polyline><polyline points=\"10 9 12 7 14 9\"></polyline><polyline points=\"10 15 12 17 14 15\"></polyline></svg>", 1)]], 8, it), Q.densityOpen ? (u(), r("div", {
					key: 0,
					class: "density-menu",
					role: "menu",
					onKeydown: X[34] ||= a(o((e) => Q.densityOpen = !1, ["prevent", "stop"]), ["esc"])
				}, [(u(!0), r(t, null, d($.timeDensityOptions, (e) => (u(), r("button", {
					class: p(["density-item", { active: Z.timeDensityMinutes === e.value }]),
					key: e.value,
					role: "menuitemradio",
					"aria-checked": Z.timeDensityMinutes === e.value ? "true" : "false",
					onClick: (t) => $.selectTimeDensity(e.value)
				}, f(e.label), 11, at))), 128))], 32)) : c("", !0)], 512),
				Z.showPrint ? (u(), r("button", {
					key: 1,
					class: "toolbar-btn icon-only",
					onClick: X[35] ||= (...e) => $.printSchedule && $.printSchedule(...e),
					"aria-label": $.t.print
				}, [...X[66] ||= [s("svg", {
					class: "tb-icon",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					"stroke-width": "2"
				}, [
					s("polyline", { points: "6 9 6 2 18 2 18 9" }),
					s("path", { d: "M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" }),
					s("rect", {
						x: "6",
						y: "14",
						width: "12",
						height: "8"
					})
				], -1)]], 8, ot)) : c("", !0),
				Z.showFullscreen ? (u(), r("button", {
					key: 2,
					class: "toolbar-btn icon-only fullscreen-desktop tooltip-align-right",
					onClick: X[36] ||= (...e) => $.toggleFullscreen && $.toggleFullscreen(...e),
					"aria-label": Q.isFullscreen ? $.t.exit_fullscreen : $.t.fullscreen
				}, [Q.isFullscreen ? (u(), r("svg", lt, [...X[68] ||= [
					s("polyline", { points: "4 14 10 14 10 20" }, null, -1),
					s("polyline", { points: "20 10 14 10 14 4" }, null, -1),
					s("line", {
						x1: "14",
						y1: "10",
						x2: "21",
						y2: "3"
					}, null, -1),
					s("line", {
						x1: "3",
						y1: "21",
						x2: "10",
						y2: "14"
					}, null, -1)
				]])) : (u(), r("svg", ct, [...X[67] ||= [
					s("polyline", { points: "15 3 21 3 21 9" }, null, -1),
					s("polyline", { points: "9 21 3 21 3 15" }, null, -1),
					s("line", {
						x1: "21",
						y1: "3",
						x2: "14",
						y2: "10"
					}, null, -1),
					s("line", {
						x1: "3",
						y1: "21",
						x2: "10",
						y2: "14"
					}, null, -1)
				]]))], 8, st)) : c("", !0)
			], 2)
		])
	], 512)], 2);
}
//#endregion
//#region src/components/ScheduleToolbar.vue?vue&type=style&index=0&inline&lang.stylus
var Z = ".c-schedule-toolbar{top:var(--pretalx-sticky-top-offset,0px);z-index:100;box-sizing:border-box;background-color:#fff;flex-direction:column;justify-content:flex-start;align-items:stretch;gap:0;font-size:14px;display:flex;position:sticky}.c-schedule-toolbar .version-warning-banner{color:#856404;background:#fff3cd;flex-wrap:wrap;justify-content:center;align-items:center;gap:4px;padding:6px 10px;font-size:13px;line-height:1.3;display:flex}.c-schedule-toolbar .version-warning-banner .version-warning-text{color:inherit;font-size:inherit;line-height:inherit}.c-schedule-toolbar .version-warning-banner .current-version-link{color:#856404;white-space:nowrap;font-size:13px;font-weight:600;text-decoration:underline}.c-schedule-toolbar .version-warning-banner .current-version-link:hover{color:#533f03}.c-schedule-toolbar .toolbar-row{flex-wrap:nowrap;justify-content:space-between;align-items:center;gap:8px;min-height:40px;display:flex}.c-schedule-toolbar .tb-icon{flex-shrink:0;width:16px;height:16px}.c-schedule-toolbar .toolbar-left{flex-wrap:nowrap;flex:1;align-items:center;gap:6px;min-width:0;display:flex}.c-schedule-toolbar .toolbar-left .mobile-toggle-btn{display:none}.c-schedule-toolbar .toolbar-left .toolbar-filters{align-items:center;gap:6px;min-width:0;display:flex}.c-schedule-toolbar .toolbar-left .fav-toggle{white-space:nowrap;align-items:center;gap:6px;display:flex;position:relative}.c-schedule-toolbar .toolbar-left .fav-toggle.disabled{opacity:.6}.c-schedule-toolbar .toolbar-left .fav-toggle:disabled{opacity:.5;cursor:default}.c-schedule-toolbar .toolbar-left .fav-toggle:disabled:hover{background-color:#0000}.c-schedule-toolbar .toolbar-left .fav-toggle .star-icon{width:18px;height:18px}.c-schedule-toolbar .toolbar-left .clear-filters-btn{color:#666}.c-schedule-toolbar .toolbar-left .filter-dropdown-area{position:relative}.c-schedule-toolbar .toolbar-left .filter-dropdown-menu{z-index:200;background:#fff;border-radius:4px;min-width:200px;max-height:260px;padding:4px 0;position:absolute;top:100%;left:0;overflow-y:auto;box-shadow:0 4px 16px #00000026}.c-schedule-toolbar .toolbar-left .filter-dropdown-item{cursor:pointer;align-items:center;gap:6px;padding:6px 12px;font-size:13px;display:flex}.c-schedule-toolbar .toolbar-left .filter-dropdown-item:hover{background-color:#f5f5f5}.c-schedule-toolbar .toolbar-left .filter-dropdown-item .filter-checkbox{accent-color:var(--track-color,var(--pretalx-clr-primary,#3aa57c));margin:0}.c-schedule-toolbar .toolbar-left .filter-dropdown-item .track-color-dot{border-radius:50%;flex-shrink:0;width:10px;height:10px}.c-schedule-toolbar .toolbar-left .filter-dropdown-item .filter-dropdown-label{white-space:nowrap}.c-schedule-toolbar .toolbar-left .filter-title{display:inline-block;position:relative}.c-schedule-toolbar .toolbar-left .filter-dot{background:var(--pretalx-clr-primary,#3aa57c);pointer-events:none;border-radius:50%;flex-shrink:0;width:7px;height:7px;display:block;position:absolute;top:-4px;right:-4px}.c-schedule-toolbar .toolbar-left .filter-icon-title .tb-icon{display:block}.c-schedule-toolbar .toolbar-left .filter-dropdown-empty{color:#999;padding:10px 14px;font-size:13px;font-style:italic}.c-schedule-toolbar .toolbar-left .recording-filter-area{flex-shrink:0;position:relative}.c-schedule-toolbar .toolbar-left .recording-filter-area .recording-dropdown-menu{z-index:200;background:#fff;border-radius:4px;flex-direction:column;gap:0;min-width:180px;padding:4px 0;display:flex;position:absolute;top:100%;left:0;box-shadow:0 4px 16px #00000026}.c-schedule-toolbar .toolbar-left .recording-filter-area .recording-dropdown-menu .recording-item{text-align:left;cursor:pointer;color:#333;background:0 0;border:none;padding:8px 12px;font-size:13px}.c-schedule-toolbar .toolbar-left .recording-filter-area .recording-dropdown-menu .recording-item:hover,.c-schedule-toolbar .toolbar-left .recording-filter-area .recording-dropdown-menu .recording-item:focus{background-color:#f5f5f5}.c-schedule-toolbar .toolbar-left .recording-filter-area .recording-dropdown-menu .recording-item.active{font-weight:600}.c-schedule-toolbar .toolbar-left .sort-area{flex-shrink:0;position:relative}.c-schedule-toolbar .toolbar-left .sort-btn svg.tb-icon{transition:transform .2s}.c-schedule-toolbar .toolbar-left .sort-btn.open svg.tb-icon{transform:rotate(180deg)}.c-schedule-toolbar .toolbar-left .sort-dropdown-menu{z-index:200;background:#fff;border-radius:4px;flex-direction:column;gap:0;min-width:180px;padding:4px 0;display:flex;position:absolute;top:100%;left:0;box-shadow:0 4px 16px #00000026}.c-schedule-toolbar .toolbar-left .sort-dropdown-menu .sort-item{text-align:left;cursor:pointer;color:#333;background:0 0;border:none;padding:8px 12px;font-size:13px}.c-schedule-toolbar .toolbar-left .sort-dropdown-menu .sort-item:hover,.c-schedule-toolbar .toolbar-left .sort-dropdown-menu .sort-item:focus{background-color:#f5f5f5}.c-schedule-toolbar .toolbar-left .sort-dropdown-menu .sort-item.active{font-weight:600}.c-schedule-toolbar .toolbar-left .sort-dropdown-menu .template-sort-inclusion{padding:8px 12px 6px}.c-schedule-toolbar .toolbar-left .sort-dropdown-menu .template-sort-inclusion .sort-inclusion-row{justify-content:space-between;align-items:center;gap:12px;display:flex}.c-schedule-toolbar .toolbar-left .sort-dropdown-menu .template-sort-inclusion .sort-inclusion-row:not(:last-child){margin-bottom:8px}.c-schedule-toolbar .toolbar-left .sort-dropdown-menu .template-sort-inclusion .sort-inclusion-label{color:#333;font-size:13px}.c-schedule-toolbar .toolbar-left .sort-dropdown-menu .template-sort-inclusion .sort-toggle-slider{cursor:pointer;-webkit-user-select:none;user-select:none;background:0 0;border:0;justify-content:center;align-items:center;padding:0;display:inline-flex}.c-schedule-toolbar .toolbar-left .sort-dropdown-menu .template-sort-inclusion .sort-toggle-slider.on .toggle-slider{background-color:var(--pretalx-clr-primary,#3aa57c)}.c-schedule-toolbar .toolbar-left .sort-dropdown-menu .template-sort-inclusion .sort-toggle-slider.on .toggle-slider:after{transform:translate(20px)}.c-schedule-toolbar .toolbar-left .sort-dropdown-menu .template-sort-inclusion .sort-toggle-slider .toggle-slider{background-color:#ccc;border-radius:12px;width:44px;height:24px;transition:background-color .3s;display:inline-block;position:relative}.c-schedule-toolbar .toolbar-left .sort-dropdown-menu .template-sort-inclusion .sort-toggle-slider .toggle-slider:after{content:\"\";background-color:#fff;border-radius:50%;width:20px;height:20px;transition:transform .3s;display:block;position:absolute;top:2px;left:2px}.c-schedule-toolbar .toolbar-left .sort-dropdown-menu .sort-menu-divider{background:#ececec;height:1px;margin:6px 0}.c-schedule-toolbar .toolbar-center{flex-shrink:1;align-items:center;gap:2px;min-width:0;display:flex;overflow:hidden}.c-schedule-toolbar .toolbar-center .day-arrow{cursor:pointer;color:#555;background:0 0;border:none;border-radius:2px;justify-content:center;align-items:center;padding:2px;display:flex}.c-schedule-toolbar .toolbar-center .day-arrow:hover:not(:disabled){background-color:#0000000f}.c-schedule-toolbar .toolbar-center .day-arrow:disabled{opacity:.25;cursor:default}.c-schedule-toolbar .toolbar-center .day-arrow svg{width:18px;height:18px}.c-schedule-toolbar .toolbar-center .day-btn{cursor:pointer;white-space:nowrap;color:#555;background:0 0;border:none;border-radius:3px;flex-shrink:0;padding:4px 10px;font-size:13px;font-weight:500}.c-schedule-toolbar .toolbar-center .day-btn:hover{background-color:#0000000d}.c-schedule-toolbar .toolbar-center .day-btn.active{background-color:var(--pretalx-clr-primary,#3aa57c);color:#fff;font-weight:600}.c-schedule-toolbar .toolbar-right{flex:1;justify-content:flex-end;align-items:center;gap:4px;display:flex;position:relative}.c-schedule-toolbar .toolbar-right .mobile-toggle-btn{display:none}.c-schedule-toolbar .toolbar-right .toolbar-right-quick{align-items:center;gap:4px;display:flex}.c-schedule-toolbar .toolbar-right .sessions-toggle{padding:0 5px}.c-schedule-toolbar .toolbar-right .fullscreen-quick{padding:0 5px;display:none}.c-schedule-toolbar .toolbar-right .toolbar-secondary{align-items:center;gap:4px;display:flex}.c-schedule-toolbar .toolbar-right .sessions-toggle-menu{display:none}.c-schedule-toolbar .toolbar-right .density-area{flex-shrink:0;display:flex;position:relative}.c-schedule-toolbar .toolbar-right .density-area .density-menu{z-index:200;background:#fff;border-radius:4px;flex-direction:column;gap:0;min-width:180px;padding:4px 0;display:flex;position:absolute;top:100%;right:0;box-shadow:0 4px 16px #00000026}.c-schedule-toolbar .toolbar-right .density-area .density-menu .density-item{text-align:left;cursor:pointer;color:#333;background:0 0;border:none;padding:8px 12px;font-size:13px}.c-schedule-toolbar .toolbar-right .density-area .density-menu .density-item:hover,.c-schedule-toolbar .toolbar-right .density-area .density-menu .density-item:focus{background-color:#f5f5f5}.c-schedule-toolbar .toolbar-right .density-area .density-menu .density-item.active{font-weight:600}.c-schedule-toolbar .toolbar-right .sessions-toggle{white-space:nowrap}.c-schedule-toolbar .toolbar-right .search-area{align-items:center;display:flex;position:relative}.c-schedule-toolbar .toolbar-right .search-area .search-compact{border-radius:4px;align-items:center;gap:0;transition:all .2s;display:flex}.c-schedule-toolbar .toolbar-right .search-area .search-compact.expanded{background:#f5f5f5;border:1px solid #ddd}.c-schedule-toolbar .toolbar-right .search-area .search-compact .search-toggle{flex-shrink:0}.c-schedule-toolbar .toolbar-right .search-area .search-compact .search-input{background:0 0;border:none;outline:none;width:140px;max-width:180px;padding:4px 4px 4px 0;font-size:13px}.c-schedule-toolbar .toolbar-right .search-area .search-compact .search-input::placeholder{color:#999}.c-schedule-toolbar .toolbar-right .search-area .search-compact .search-clear{cursor:pointer;color:#999;background:0 0;border:none;align-items:center;padding:2px 4px;display:flex}.c-schedule-toolbar .toolbar-right .search-area .search-compact .search-clear[aria-label]{position:relative}.c-schedule-toolbar .toolbar-right .search-area .search-compact .search-clear[aria-label]:after{content:attr(aria-label);opacity:0;pointer-events:none;color:#fff;white-space:nowrap;z-index:1000;background-color:#000000de;border-radius:4px;padding:4px 8px;font-size:12px;line-height:1.2;position:absolute;bottom:calc(100% + 6px);left:50%;transform:translate(-50%)translateY(2px)}.c-schedule-toolbar .toolbar-right .search-area .search-compact .search-clear[aria-label]:hover:after,.c-schedule-toolbar .toolbar-right .search-area .search-compact .search-clear[aria-label]:focus-visible:after{opacity:1;transition:opacity 50ms,transform 50ms;transform:translate(-50%)translateY(0)}.c-schedule-toolbar .toolbar-right .search-area .search-compact .search-clear:hover{color:#333}.c-schedule-toolbar .toolbar-right .search-area .search-compact .search-clear .tb-icon{width:14px;height:14px}.c-schedule-toolbar .toolbar-right .timezone-area{margin-right:4px;position:relative}.c-schedule-toolbar .toolbar-right .timezone-area .timezone-compact{display:inline-block;position:relative}.c-schedule-toolbar .toolbar-right .timezone-area .tz-btn{gap:4px}.c-schedule-toolbar .toolbar-right .timezone-area .tz-btn .tz-label{color:#555;white-space:nowrap;text-overflow:ellipsis;max-width:120px;font-size:12px;overflow:hidden}.c-schedule-toolbar .toolbar-right .timezone-area .tz-dropdown-menu{z-index:200;background:#fff;border-radius:4px;width:260px;padding:4px 0;position:absolute;top:100%;right:0;box-shadow:0 4px 16px #0000002e}.c-schedule-toolbar .toolbar-right .timezone-area .tz-section-label{color:#0000008a;text-transform:uppercase;letter-spacing:.03em;padding:6px 12px 2px;font-size:11px;font-weight:600;display:block}.c-schedule-toolbar .toolbar-right .timezone-area .tz-option{cursor:pointer;align-items:center;padding:6px 12px;font-size:13px;display:flex}.c-schedule-toolbar .toolbar-right .timezone-area .tz-option:hover{background-color:#f5f5f5}.c-schedule-toolbar .toolbar-right .timezone-area .tz-option.active{background-color:#e8f4fd;font-weight:600}.c-schedule-toolbar .toolbar-right .timezone-area .tz-divider{background:#e0e0e0;height:1px;margin:4px 0}.c-schedule-toolbar .toolbar-right .timezone-area .tz-search{box-sizing:border-box;border:1px solid #ccc;border-radius:3px;outline:none;width:calc(100% - 16px);margin:4px 8px;padding:5px 8px;font-size:13px;display:block}.c-schedule-toolbar .toolbar-right .timezone-area .tz-search:focus{border-color:var(--pretalx-clr-primary,#3aa57c)}.c-schedule-toolbar .toolbar-right .timezone-area .tz-scroll{max-height:200px;overflow-y:auto}.c-schedule-toolbar .toolbar-right .timezone-label{cursor:default;color:#0000008a;margin-right:8px;padding:4px 8px}.c-schedule-toolbar .toolbar-right .version-area{position:relative}.c-schedule-toolbar .toolbar-right .version-dropdown{display:inline-block;position:relative}.c-schedule-toolbar .toolbar-right .version-btn{font-weight:600}.c-schedule-toolbar .toolbar-right .version-btn .version-current{margin:0 4px}.c-schedule-toolbar .toolbar-right .version-menu{z-index:200;background:#fff;border-radius:4px;min-width:180px;max-height:300px;padding:4px 0;position:absolute;top:100%;right:0;overflow-y:auto;box-shadow:0 4px 16px #00000026}.c-schedule-toolbar .toolbar-right .version-menu-divider{background:#e0e0e0;height:1px;margin:4px 0}.c-schedule-toolbar .toolbar-right .version-item{color:#333;cursor:pointer;justify-content:space-between;align-items:center;gap:8px;padding:6px 12px;text-decoration:none;display:flex}.c-schedule-toolbar .toolbar-right .version-item:hover{background-color:#f5f5f5}.c-schedule-toolbar .toolbar-right .version-item.active{background-color:#e8f4fd;font-weight:600}.c-schedule-toolbar .toolbar-right .version-item .version-current-badge{color:#fff;background:#4caf50;border-radius:10px;padding:1px 6px;font-size:11px}.c-schedule-toolbar .toolbar-right .version-item.changelog-link{justify-content:flex-start;gap:6px}.c-schedule-toolbar .toolbar-right .version-warning{color:#856404;background:#fff3cd;border-radius:4px;align-items:center;gap:4px;padding:2px 8px;font-size:12px;display:flex}.c-schedule-toolbar .toolbar-right .version-warning .current-version-link{color:#856404;white-space:nowrap;font-size:12px;font-weight:600;text-decoration:underline}.c-schedule-toolbar .toolbar-right .version-warning .current-version-link:hover{color:#533f03}.c-schedule-toolbar .toolbar-right .exporter-area{position:relative}.c-schedule-toolbar .toolbar-right .exporter-area .exporter-dropdown{display:inline-block;position:relative}.c-schedule-toolbar .toolbar-right .exporter-area .exporter-menu{z-index:200;white-space:nowrap;background:#fff;border-radius:4px;min-width:280px;padding:4px 0;position:absolute;top:100%;right:0;box-shadow:0 4px 16px #00000026}.c-schedule-toolbar .toolbar-right .exporter-area .exporter-item{color:#333;align-items:center;gap:8px;padding:6px 12px;text-decoration:none;display:flex;position:relative}.c-schedule-toolbar .toolbar-right .exporter-area .exporter-item:hover{background-color:#f5f5f5}.c-schedule-toolbar .toolbar-right .exporter-area .exporter-item .exporter-icon{text-align:center;width:20px}.c-schedule-toolbar .toolbar-right .exporter-area .exporter-item .qr-hover{z-index:210;background:#fff;border:1px solid #ddd;border-radius:4px;padding:8px;position:absolute;top:0;right:100%;box-shadow:2px 2px 8px #0000001a}.c-schedule-toolbar .toolbar-btn{cursor:pointer;background:0 0;border:none;border-radius:2px;align-items:center;gap:4px;height:28px;padding:0 6px;font-size:14px;display:flex}.c-schedule-toolbar .toolbar-btn.icon-only[aria-label]{position:relative}.c-schedule-toolbar .toolbar-btn.icon-only[aria-label]:after{content:attr(aria-label);opacity:0;pointer-events:none;color:#fff;white-space:nowrap;z-index:1000;background-color:#000000de;border-radius:4px;padding:4px 8px;font-size:12px;line-height:1.2;position:absolute;top:calc(100% + 6px);left:50%;transform:translate(-50%)translateY(-2px)}.c-schedule-toolbar .toolbar-btn.icon-only[aria-label]:hover:after,.c-schedule-toolbar .toolbar-btn.icon-only[aria-label]:focus-visible:after{opacity:1;transition:opacity 50ms,transform 50ms;transform:translate(-50%)translateY(0)}.c-schedule-toolbar .toolbar-btn.disabled{opacity:.5;cursor:not-allowed}.c-schedule-toolbar .toolbar-btn.disabled[aria-label]{position:relative}.c-schedule-toolbar .toolbar-btn.disabled[aria-label]:after{content:attr(aria-label);opacity:0;pointer-events:none;color:#fff;white-space:normal;z-index:1000;background-color:#000000de;border-radius:4px;width:max-content;max-width:280px;padding:6px 8px;font-size:12px;line-height:1.3;position:absolute;top:calc(100% + 6px);right:0;transform:translateY(-2px)}.c-schedule-toolbar .toolbar-btn.disabled[aria-label]:hover:after,.c-schedule-toolbar .toolbar-btn.disabled[aria-label]:focus-visible:after{opacity:1;transition:opacity 50ms,transform 50ms;transform:translateY(0)}.c-schedule-toolbar .toolbar-btn.icon-only.tooltip-align-left[aria-label]:after{left:0;transform:translateY(-2px)}.c-schedule-toolbar .toolbar-btn.icon-only.tooltip-align-left[aria-label]:hover:after,.c-schedule-toolbar .toolbar-btn.icon-only.tooltip-align-left[aria-label]:focus-visible:after{transform:translateY(0)}.c-schedule-toolbar .toolbar-btn.icon-only.tooltip-align-right[aria-label]:after{left:auto;right:0;transform:translateY(-2px)}.c-schedule-toolbar .toolbar-btn.icon-only.tooltip-align-right[aria-label]:hover:after,.c-schedule-toolbar .toolbar-btn.icon-only.tooltip-align-right[aria-label]:focus-visible:after{transform:translateY(0)}.c-schedule-toolbar .toolbar-btn.icon-only{gap:3px;padding:0 5px}.c-schedule-toolbar .toolbar-btn:hover{background-color:#0000000d}.c-schedule-toolbar .toolbar-btn.sessions-toggle.active{color:var(--pretalx-clr-primary,#3aa57c);border-radius:4px;font-weight:600}.c-schedule-toolbar .toolbar-btn .sessions-toggle-label{margin-left:4px;font-size:13px;font-weight:500}.c-schedule-toolbar .toolbar-btn.recording-btn{position:relative}.c-schedule-toolbar .toolbar-btn.recording-btn.active:before{content:\"\";aspect-ratio:1;background:var(--pretalx-clr-primary,#3aa57c);z-index:2;border:1px solid #fff;border-radius:50%;width:5px;height:5px;position:absolute;top:2px;right:2px}.c-schedule-toolbar .toolbar-btn.fav-toggle.icon-only[aria-label]:after{left:0;transform:translateY(-2px)}.c-schedule-toolbar .toolbar-btn.fav-toggle.icon-only[aria-label]:hover:after,.c-schedule-toolbar .toolbar-btn.fav-toggle.icon-only[aria-label]:focus-visible:after{transform:translateY(0)}.c-schedule-toolbar .toolbar-btn.starrers-visibility-toggle,.c-schedule-toolbar .toolbar-btn.share-starred-toggle{position:relative}.c-schedule-toolbar .toolbar-btn.starrers-visibility-toggle.active,.c-schedule-toolbar .toolbar-btn.share-starred-toggle.active{color:var(--pretalx-clr-primary,#3aa57c)}.c-schedule-toolbar .toolbar-btn.starrers-visibility-toggle.active:before,.c-schedule-toolbar .toolbar-btn.share-starred-toggle.active:before{content:\"\";aspect-ratio:1;background:var(--pretalx-clr-primary,#3aa57c);z-index:2;border:1px solid #fff;border-radius:50%;width:5px;height:5px;position:absolute;top:2px;right:2px}.c-schedule-toolbar .toolbar-btn.starrers-visibility-toggle.icon-only[aria-label]:after,.c-schedule-toolbar .toolbar-btn.share-starred-toggle.icon-only[aria-label]:after{left:0;transform:translateY(-2px)}.c-schedule-toolbar .toolbar-btn.starrers-visibility-toggle.icon-only[aria-label]:hover:after,.c-schedule-toolbar .toolbar-btn.starrers-visibility-toggle.icon-only[aria-label]:focus-visible:after,.c-schedule-toolbar .toolbar-btn.share-starred-toggle.icon-only[aria-label]:hover:after,.c-schedule-toolbar .toolbar-btn.share-starred-toggle.icon-only[aria-label]:focus-visible:after{transform:translateY(0)}.c-schedule-toolbar .toolbar-btn.mobile-toggle-btn{border:1px solid #d8d8d8;border-radius:6px;gap:6px;padding:0 6px}.c-schedule-toolbar .toolbar-btn.mobile-toggle-btn .mobile-toggle-label{font-size:12px;font-weight:600}.c-schedule-toolbar .toolbar-btn.mobile-toggle-btn .mobile-toggle-badge{background:var(--pretalx-clr-primary,#3aa57c);border-radius:50%;width:7px;height:7px}.c-schedule-toolbar .toolbar-btn.mobile-toggle-btn.active{border-color:var(--pretalx-clr-primary,#3aa57c);color:var(--pretalx-clr-primary,#3aa57c)}.c-schedule-toolbar .fade-enter-active,.c-schedule-toolbar .fade-leave-active{transition:opacity .3s}.c-schedule-toolbar .fade-enter-from,.c-schedule-toolbar .fade-leave-to{opacity:0}.chevron-icon{flex-shrink:0;width:14px;height:14px;transition:transform .2s}.chevron-icon.open{transform:rotate(180deg)}@media (width>=1025px){.c-schedule-toolbar .toolbar-row{grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:8px;display:grid}.c-schedule-toolbar .toolbar-left{flex:none;min-width:0}.c-schedule-toolbar .toolbar-center{flex:none;justify-content:center;min-width:0;max-width:100%}.c-schedule-toolbar .toolbar-right{flex:none;justify-self:end;min-width:0}}@media (width<=1024px){.c-schedule-toolbar .toolbar-row{grid-template-columns:minmax(0,1fr) auto;grid-template-areas:\"left right\"\"center center\";align-items:center;gap:6px;height:auto;min-height:40px;padding:6px 8px;display:grid}.c-schedule-toolbar .toolbar-row .toolbar-left{flex:none;grid-area:left;gap:4px;min-width:0;max-width:100%;position:relative}.c-schedule-toolbar .toolbar-row .toolbar-left .language-filter-area,.c-schedule-toolbar .toolbar-row .toolbar-left .mobile-toggle-btn{display:inline-flex}.c-schedule-toolbar .toolbar-row .toolbar-left .toolbar-filters{z-index:240;-webkit-overflow-scrolling:touch;background:#fff;border:1px solid #e5e5e5;border-radius:10px;flex-wrap:nowrap;align-items:flex-start;gap:8px;width:max-content;max-width:94vw;max-height:80vh;padding:8px;display:none;position:absolute;top:calc(100% + 8px);left:0;overflow:auto;box-shadow:0 10px 24px #0000001f}.c-schedule-toolbar .toolbar-row .toolbar-left .toolbar-filters.open{display:flex}.c-schedule-toolbar .toolbar-row .toolbar-left .toolbar-filters .filter-dropdown-area,.c-schedule-toolbar .toolbar-row .toolbar-left .toolbar-filters .recording-filter-area,.c-schedule-toolbar .toolbar-row .toolbar-left .toolbar-filters .sort-area{flex-direction:column;align-items:stretch;display:flex;position:relative}.c-schedule-toolbar .toolbar-row .toolbar-left .toolbar-filters .filter-dropdown-menu,.c-schedule-toolbar .toolbar-row .toolbar-left .toolbar-filters .recording-dropdown-menu,.c-schedule-toolbar .toolbar-row .toolbar-left .toolbar-filters .sort-dropdown-menu{min-width:100%;max-height:350px;box-shadow:none;background:#fff;border:1px solid #e8e8e8;border-radius:8px;padding:4px 0;position:static;overflow:hidden auto}.c-schedule-toolbar .toolbar-row .toolbar-left .toolbar-filters .filter-dropdown-menu .filter-dropdown-item,.c-schedule-toolbar .toolbar-row .toolbar-left .toolbar-filters .recording-dropdown-menu .filter-dropdown-item,.c-schedule-toolbar .toolbar-row .toolbar-left .toolbar-filters .sort-dropdown-menu .filter-dropdown-item,.c-schedule-toolbar .toolbar-row .toolbar-left .toolbar-filters .filter-dropdown-menu .recording-item,.c-schedule-toolbar .toolbar-row .toolbar-left .toolbar-filters .recording-dropdown-menu .recording-item,.c-schedule-toolbar .toolbar-row .toolbar-left .toolbar-filters .sort-dropdown-menu .recording-item,.c-schedule-toolbar .toolbar-row .toolbar-left .toolbar-filters .filter-dropdown-menu .sort-item,.c-schedule-toolbar .toolbar-row .toolbar-left .toolbar-filters .recording-dropdown-menu .sort-item,.c-schedule-toolbar .toolbar-row .toolbar-left .toolbar-filters .sort-dropdown-menu .sort-item{padding:8px 12px;font-size:14px}.c-schedule-toolbar .toolbar-row .toolbar-left .toolbar-filters .filter-dropdown-menu .filter-checkbox,.c-schedule-toolbar .toolbar-row .toolbar-left .toolbar-filters .recording-dropdown-menu .filter-checkbox,.c-schedule-toolbar .toolbar-row .toolbar-left .toolbar-filters .sort-dropdown-menu .filter-checkbox{width:14px;height:14px}.c-schedule-toolbar .toolbar-row .toolbar-center{flex:none;grid-area:center;justify-content:center;width:100%;max-width:100%;padding-top:2px}.c-schedule-toolbar .toolbar-row .toolbar-center .day-btn{padding:4px 8px;font-size:12px}.c-schedule-toolbar .toolbar-row .day-arrow svg{width:16px;height:16px}.c-schedule-toolbar .toolbar-right{flex-wrap:nowrap;flex:none;grid-area:right;justify-content:flex-end;align-items:center;gap:4px;max-width:100%}.c-schedule-toolbar .toolbar-right .fullscreen-quick{order:98;display:inline-flex}.c-schedule-toolbar .toolbar-right .mobile-toggle-btn{order:99;margin-left:2px;display:inline-flex}.c-schedule-toolbar .toolbar-right .toolbar-right-quick{align-items:center;gap:2px;display:flex}.c-schedule-toolbar .toolbar-right .toolbar-secondary{z-index:240;-webkit-overflow-scrolling:touch;background:#fff;border:1px solid #e5e5e5;border-radius:10px;flex-flow:row;align-items:center;gap:6px;width:max-content;max-width:94vw;max-height:70vh;padding:8px;display:none;position:absolute;top:calc(100% + 8px);right:0;overflow:auto;box-shadow:0 10px 24px #0000001f}.c-schedule-toolbar .toolbar-right .toolbar-secondary.open{align-items:flex-start;display:flex}.c-schedule-toolbar .toolbar-right .toolbar-secondary .density-area{order:-1;display:flex}.c-schedule-toolbar .toolbar-right .toolbar-secondary .fullscreen-desktop{display:none}.c-schedule-toolbar .toolbar-right .toolbar-secondary>*{flex:none;min-width:0}.c-schedule-toolbar .toolbar-right .toolbar-secondary .toolbar-btn,.c-schedule-toolbar .toolbar-right .toolbar-secondary .version-btn,.c-schedule-toolbar .toolbar-right .toolbar-secondary .version-item,.c-schedule-toolbar .toolbar-right .toolbar-secondary .density-item,.c-schedule-toolbar .toolbar-right .toolbar-secondary .tz-option{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.c-schedule-toolbar .toolbar-right .toolbar-secondary .version-dropdown,.c-schedule-toolbar .toolbar-right .toolbar-secondary .exporter-dropdown,.c-schedule-toolbar .toolbar-right .toolbar-secondary .density-area,.c-schedule-toolbar .toolbar-right .toolbar-secondary .timezone-compact{flex-direction:column;align-items:stretch;display:flex;position:relative}.c-schedule-toolbar .toolbar-right .toolbar-secondary .version-menu,.c-schedule-toolbar .toolbar-right .toolbar-secondary .exporter-menu,.c-schedule-toolbar .toolbar-right .toolbar-secondary .density-menu,.c-schedule-toolbar .toolbar-right .toolbar-secondary .tz-dropdown-menu{min-width:100%;max-height:300px;box-shadow:none;background:#fff;border:1px solid #e8e8e8;border-radius:8px;padding:4px 0;position:static;overflow:hidden auto}.c-schedule-toolbar .toolbar-right .toolbar-secondary .sessions-toggle-menu{justify-content:flex-start;display:flex}}@media (width<=600px){.c-schedule-toolbar .filter-title,.c-schedule-toolbar .filter-title-text,.c-schedule-toolbar .filter-dot,.c-schedule-toolbar .filter-dropdown-label,.c-schedule-toolbar label.filter-dropdown-item,.c-schedule-toolbar button.toolbar-btn,.c-schedule-toolbar button.toolbar-btn span,.c-schedule-toolbar button.toolbar-btn .filter-title,.c-schedule-toolbar button.toolbar-btn .filter-title-text{color:#111}.c-schedule-toolbar svg.tb-icon,.c-schedule-toolbar svg.chevron-icon{stroke:#111;color:#111;fill:none}.c-schedule-toolbar .language-filter-area svg.tb-icon{fill:#111;color:#111;stroke:none}.c-schedule-toolbar .sessions-toggle-label{display:none}.c-schedule-toolbar .sessions-toggle[aria-label]{position:relative}.c-schedule-toolbar .sessions-toggle[aria-label]:after{content:attr(aria-label);opacity:0;pointer-events:none;color:#fff;white-space:nowrap;z-index:1000;background-color:#000000de;border-radius:4px;padding:4px 8px;font-size:12px;line-height:1.2;position:absolute;top:calc(100% + 6px);left:50%;transform:translate(-50%)translateY(-2px)}.c-schedule-toolbar .sessions-toggle[aria-label]:hover:after,.c-schedule-toolbar .sessions-toggle[aria-label]:focus-visible:after{opacity:1;transition:opacity 50ms,transform 50ms;transform:translate(-50%)translateY(0)}.c-schedule-toolbar .toolbar-right .fullscreen-quick{order:98;display:inline-flex}.c-schedule-toolbar .toolbar-btn.icon-only[aria-label]:after{display:none}.c-schedule-toolbar .toolbar-row{padding:6px}.c-schedule-toolbar .toolbar-row .toolbar-center .day-btn{font-size:13px}.c-schedule-toolbar .toolbar-right .search-area .search-compact .search-input{width:130px;font-size:13px}.c-schedule-toolbar .toolbar-right .toolbar-right-quick .timezone-label{display:none}.c-schedule-toolbar .toolbar-right .toolbar-btn,.c-schedule-toolbar .toolbar-right .toolbar-btn.icon-only,.c-schedule-toolbar .toolbar-right button.toolbar-btn,.c-schedule-toolbar .toolbar-right button.toolbar-btn.icon-only{color:#111}.c-schedule-toolbar .toolbar-btn{height:30px;padding:0 6px;font-size:13px}.c-schedule-toolbar .toolbar-btn.mobile-toggle-btn{gap:4px;padding:0 6px}}@media print{.c-schedule-toolbar{display:none}}", ut = {
	"fa-calendar": "<rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"/><line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"/><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"/><line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"/>",
	"fa-code": "<polyline points=\"16 18 22 12 16 6\"/><polyline points=\"8 6 2 12 8 18\"/>",
	"fa-google": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 8v8\"/><path d=\"M8 12h8\"/>",
	"fa-users": "<path d=\"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M23 21v-2a4 4 0 00-3-3.87\"/><path d=\"M16 3.13a4 4 0 010 7.75\"/>",
	"fa-question-circle": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3\"/><line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"/>",
	"fa-question-circle-o": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3\"/><line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"/>"
}, Q = 1024, $ = /*#__PURE__*/ n({
	name: "ScheduleToolbar",
	inject: { translationMessages: { default: () => ({}) } },
	props: {
		version: {
			type: String,
			default: ""
		},
		isCurrent: {
			type: Boolean,
			default: !0
		},
		changelogUrl: {
			type: String,
			default: ""
		},
		currentScheduleUrl: {
			type: String,
			default: ""
		},
		versions: {
			type: Array,
			default: () => []
		},
		exporters: {
			type: Array,
			default: () => []
		},
		filterGroups: {
			type: Array,
			default: () => []
		},
		showFullscreen: {
			type: Boolean,
			default: !0
		},
		showPrint: {
			type: Boolean,
			default: !0
		},
		fullscreenTarget: {
			type: Object,
			default: null
		},
		sessionsMode: {
			type: Boolean,
			default: !1
		},
		searchQuery: {
			type: String,
			default: ""
		},
		favsCount: {
			type: Number,
			default: 0
		},
		onlyFavs: {
			type: Boolean,
			default: !1
		},
		shareStarredSessions: {
			type: Boolean,
			default: !1
		},
		scheduleUserLoggedIn: {
			type: Boolean,
			default: !1
		},
		hasActiveFilters: {
			type: Boolean,
			default: !1
		},
		currentTimezone: String,
		scheduleTimezone: String,
		userTimezone: String,
		days: {
			type: Array,
			default: () => []
		},
		currentDay: {
			type: String,
			default: ""
		},
		showRecordingFilter: {
			type: Boolean,
			default: !1
		},
		recordingFilter: {
			type: String,
			default: "all"
		},
		sortBy: {
			type: String,
			default: "title"
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
		popularityFeatureEnabled: {
			type: Boolean,
			default: !1
		},
		popularitySortAvailable: {
			type: Boolean,
			default: !1
		},
		exportsDisabled: {
			type: Boolean,
			default: !1
		},
		sortOptions: {
			type: Array,
			default: () => ["title", "title_desc"]
		},
		timeDensityMinutes: {
			type: Number,
			default: 30
		},
		isFeaturedPage: {
			type: Boolean,
			default: !1
		},
		isListView: {
			type: Boolean,
			default: !1
		}
	},
	emits: [
		"fullscreen-change",
		"toggleFavs",
		"resetFilters",
		"saveTimezone",
		"update:currentTimezone",
		"update:searchQuery",
		"update:recordingFilter",
		"update:sortBy",
		"update:includeRoomSortKey",
		"update:includeDateSortKey",
		"update:includePopularitySortKey",
		"update:shareStarredSessions",
		"filterToggle",
		"selectDay",
		"toggleSessionsMode",
		"setTimeDensityMinutes"
	],
	data() {
		return {
			exportOpen: !1,
			versionOpen: !1,
			tzOpen: !1,
			searchExpanded: !1,
			tzSearch: "",
			hoveredExporter: null,
			isFullscreen: !1,
			openFilterDropdowns: {},
			dayWindowStart: 0,
			maxVisibleDays: Infinity,
			recordingOpen: !1,
			sortOpen: !1,
			densityOpen: !1,
			mobileFiltersOpen: !1,
			mobileMoreOpen: !1,
			cachedOtherTimezones: null
		};
	},
	computed: {
		effectiveHasActiveFilters() {
			let e = (this.filterGroups || []).some((e) => e.refKey !== "language" && Array.isArray(e.data) && e.data.some((e) => e.selected)), t = this.showRecordingFilter && this.recordingModel !== "all";
			return e || t;
		},
		t() {
			let e = this.translationMessages || {};
			return {
				no_matching_options: e.no_matching_options || "Sorry, no matching options.",
				other_timezones: e.other_timezones || "Other Timezones",
				view_changelog: e.view_changelog || "View Changelog",
				go_to_current_version: e.go_to_current_version || "Go to current version",
				reset_all_filters: e.reset_all_filters || "Reset all filters",
				sort_by: e.sort_by || "Sort",
				sort_by_room: e.sort_by_room || "By room",
				sort_by_title: e.sort_by_title || "A–Z",
				sort_by_title_desc: e.sort_by_title_desc || "Z–A",
				sort_by_popularity: e.sort_by_popularity || "Most popular",
				starred: e.starred || "Starred",
				show_talk_starrers: e.show_talk_starrers || "Share starred sessions",
				show_talk_starrers_tooltip: e.show_talk_starrers_tooltip || "Make your starred sessions visible to others. You can open someone else's starred list only if they have enabled sharing.",
				no_schedule_available: e.no_schedule_available || "No schedule has been published yet. Please check back later.",
				print: e.print || "Print",
				fullscreen: e.fullscreen || "Fullscreen",
				exit_fullscreen: e.exit_fullscreen || "Exit Fullscreen",
				latest: e.latest || "Latest",
				version_warning_editable: e.version_warning_editable || "You are currently viewing the editable schedule version, which is unreleased and may change at any time.",
				version_warning_wip: e.version_warning_wip || "You are currently viewing the unreleased schedule preview. It may change at any time and is not visible to the public.",
				version_warning_old: e.version_warning_old || "You are currently viewing an older schedule version.",
				add_to_calendar: e.add_to_calendar || "Add to calendar",
				public_schedule_only: e.public_schedule_only || "Only available on the public schedule once a schedule is released and public.",
				export: e.export || "Export",
				current: e.current || "current",
				list_view: e.list_view || "List View",
				calendar_view: e.calendar_view || "Calendar View",
				search: e.search || "Search",
				clear_search: e.clear_search || "Clear search",
				search_placeholder: e.search_placeholder || "Search sessions…",
				previous_days: e.previous_days || "Previous days",
				next_days: e.next_days || "Next days",
				filter_by_recording: e.filter_by_recording || "Filter by recording",
				all_sessions: e.all_sessions || "All sessions",
				recorded_only: e.recorded_only || "Recorded only",
				not_recorded: e.not_recorded || "Not recorded",
				sort_include_room: e.sort_include_room || "Include room",
				sort_include_datetime: e.sort_include_datetime || "Include datetime",
				sort_include_popularity: e.sort_include_popularity || "Most popular first",
				filters: e.filters || "Filters",
				more: e.more || "More",
				density_compact_view: e.density_compact_view || "compact view",
				density_default_view: e.density_default_view || "default view",
				density_comfortable_view: e.density_comfortable_view || "comfortable view",
				minutes: e.minutes || "min",
				list: (e.list_view || "List").replace(" View", ""),
				cal: (e.calendar_view || "Cal").replace("endar View", "").replace(" View", "")
			};
		},
		timeDensityOptions() {
			let e = this.t.minutes || "min";
			return [
				{
					value: 5,
					label: `5 ${e}`
				},
				{
					value: 15,
					label: `15 ${e}`
				},
				{
					value: 30,
					label: `30 ${e}`
				},
				{
					value: 60,
					label: `60 ${e}`
				}
			];
		},
		currentTimeDensityLabel() {
			let e = this.timeDensityOptions.find((e) => e.value === this.timeDensityMinutes);
			return e ? e.label : "30 min";
		},
		sortModel: {
			get() {
				return this.sortBy;
			},
			set(e) {
				this.$emit("update:sortBy", e);
			}
		},
		includeRoomSortKeyModel: {
			get() {
				return this.includeRoomSortKey;
			},
			set(e) {
				this.$emit("update:includeRoomSortKey", !!e);
			}
		},
		includeDateSortKeyModel: {
			get() {
				return this.includeDateSortKey;
			},
			set(e) {
				this.$emit("update:includeDateSortKey", !!e);
			}
		},
		includePopularitySortKeyModel: {
			get() {
				return this.includePopularitySortKey;
			},
			set(e) {
				this.$emit("update:includePopularitySortKey", !!e);
			}
		},
		resolvedSortOptions() {
			let e = Array.isArray(this.sortOptions) ? this.sortOptions : [], t = {
				title: this.t.sort_by_title,
				title_desc: this.t.sort_by_title_desc,
				popularity: this.t.sort_by_popularity
			};
			return e.filter((e) => [
				"title",
				"title_desc",
				"popularity"
			].includes(e)).filter((e) => e !== "popularity" || this.popularitySortAvailable).map((e) => ({
				value: e,
				label: t[e] || e
			}));
		},
		currentSortLabel() {
			let e = this.resolvedSortOptions.find((e) => e.value === this.sortModel);
			return e ? e.label : this.t.sort_by_title;
		},
		resolvedExporters() {
			let e = this.exporters || [];
			return this.isFeaturedPage && (e = e.filter((e) => !e.identifier.includes("-my") && !e.identifier.includes("my-") && e.identifier !== "faved.ics")), e;
		},
		isWipPreview() {
			return this.version === "wip" || typeof window < "u" && window.location.pathname.includes("/schedule/v/wip/");
		},
		showVersionWarningBanner() {
			return this.isWipPreview ? !0 : !!(this.version && !this.isCurrent);
		},
		publicOnlyFeatureHint() {
			return this.t.public_schedule_only;
		},
		languageGroup() {
			return (this.filterGroups || []).find((e) => e.refKey === "language") || null;
		},
		nonLanguageFilterGroups() {
			return (this.filterGroups || []).filter((e) => e.refKey !== "language");
		},
		currentVersionLabel() {
			return this.version ? this.formatVersionLabel(this.version) : this.t.latest;
		},
		versionOptions() {
			if (!this.versions || !this.versions.length) return [];
			let e = this.versions.find((e) => e.isCurrent)?.version;
			return this.versions.map((t) => ({
				...t,
				isCurrent: t.version === e || t.isCurrent
			}));
		},
		versionWarningText() {
			return this.isWipPreview ? this.t.version_warning_wip : this.version ? this.t.version_warning_old : this.t.version_warning_editable;
		},
		availableTimezones() {
			return typeof Intl?.supportedValuesOf == "function" && Intl.supportedValuesOf("timeZone") || [];
		},
		pinnedTimezones() {
			let e = [], t = /* @__PURE__ */ new Set(), n = (n, r) => {
				!n || t.has(n) || (e.push({
					id: n,
					label: `${n} (${r})`
				}), t.add(n));
			};
			return n(this.userTimezone, "local"), n(this.scheduleTimezone, "event"), e;
		},
		otherTimezones() {
			return this.cachedOtherTimezones || [];
		},
		allTimezoneOptions() {
			return [...this.pinnedTimezones, ...this.otherTimezones];
		},
		filteredOtherTimezones() {
			if (!this.tzSearch) return this.otherTimezones;
			let e = this.tzSearch.toLowerCase();
			return this.otherTimezones.filter((t) => t.label.toLowerCase().includes(e));
		},
		timezoneModel: {
			get() {
				return this.currentTimezone;
			},
			set(e) {
				this.$emit("update:currentTimezone", e);
			}
		},
		recordingModel: {
			get() {
				return this.recordingFilter || "all";
			},
			set(e) {
				this.$emit("update:recordingFilter", e);
			}
		},
		dayWindowSize() {
			return !this.days || this.days.length <= 1 ? 0 : !Number.isFinite(this.maxVisibleDays) || this.maxVisibleDays >= this.days.length ? this.days.length : Math.max(1, this.maxVisibleDays);
		},
		showDayArrows() {
			return !!(this.days && this.days.length > 1 && this.days.length > this.dayWindowSize);
		},
		visibleDays() {
			return !this.days || this.days.length <= 1 ? [] : this.days.slice(this.dayWindowStart, this.dayWindowStart + this.dayWindowSize).map((e) => ({
				id: e.format("YYYY-MM-DD"),
				label: e.format("ddd D MMM")
			}));
		}
	},
	watch: {
		currentDay() {
			this.ensureCurrentDayVisible();
		},
		days: {
			immediate: !0,
			handler() {
				this.$nextTick(() => this.updateDayNavigation());
			}
		},
		showDayArrows() {
			this.ensureCurrentDayVisible();
		},
		searchExpanded() {
			this.$nextTick(() => this.updateDayNavigation());
		}
	},
	mounted() {
		document.addEventListener("click", this.outsideClick, !0), document.addEventListener("fullscreenchange", this.onFullscreenChange), typeof window < "u" && typeof window.matchMedia == "function" && (this._stackedToolbarMq = window.matchMedia(`(max-width: ${Q}px)`), this._onStackedToolbarMqChange = () => {
			this.$nextTick(() => this.updateDayNavigation());
		}, typeof this._stackedToolbarMq.addEventListener == "function" ? this._stackedToolbarMq.addEventListener("change", this._onStackedToolbarMqChange) : typeof this._stackedToolbarMq.addListener == "function" && this._stackedToolbarMq.addListener(this._onStackedToolbarMqChange)), this.$nextTick(() => {
			if (this.updateVersionBannerHeight(), this.updateToolbarHeight(), typeof ResizeObserver < "u" && (this._versionBannerResizeObserver = new ResizeObserver(() => {
				this.scheduleToolbarLayoutUpdate();
			}), this.$refs.versionBanner && this._versionBannerResizeObserver.observe(this.$refs.versionBanner), this._versionBannerResizeObserver.observe(this.$el), this.$refs.toolbarRow)) {
				this._versionBannerResizeObserver.observe(this.$refs.toolbarRow);
				for (let e of [
					".toolbar-left",
					".toolbar-center",
					".toolbar-right"
				]) {
					let t = this.$refs.toolbarRow.querySelector(e);
					t && this._versionBannerResizeObserver.observe(t);
				}
			}
			this.updateDayNavigation();
		});
	},
	beforeUnmount() {
		document.removeEventListener("click", this.outsideClick, !0), document.removeEventListener("fullscreenchange", this.onFullscreenChange), this._stackedToolbarMq && this._onStackedToolbarMqChange && (typeof this._stackedToolbarMq.removeEventListener == "function" ? this._stackedToolbarMq.removeEventListener("change", this._onStackedToolbarMqChange) : typeof this._stackedToolbarMq.removeListener == "function" && this._stackedToolbarMq.removeListener(this._onStackedToolbarMqChange)), this._toolbarLayoutRaf &&= (cancelAnimationFrame(this._toolbarLayoutRaf), null), this._versionBannerResizeObserver?.disconnect?.();
	},
	methods: {
		toggleShareStarredSessions() {
			this.$emit("update:shareStarredSessions", !this.shareStarredSessions);
		},
		scheduleToolbarLayoutUpdate() {
			this._toolbarLayoutRaf ||= requestAnimationFrame(() => {
				this._toolbarLayoutRaf = null, this.updateVersionBannerHeight(), this.updateToolbarHeight(), this.updateDayNavigation();
			});
		},
		updateVersionBannerHeight() {
			let e = this.$el?.parentElement;
			if (!e) return;
			let t = this.$refs.versionBanner, n = t ? t.getBoundingClientRect().height : 0;
			e.style.setProperty("--pretalx-version-warning-height", `${n}px`);
		},
		updateToolbarHeight() {
			let e = this.$el?.parentElement;
			if (!e) return;
			let t = this.$el ? this.$el.getBoundingClientRect().height : 0, n = this.$refs.versionBanner, r = t - (n ? n.getBoundingClientRect().height : 0);
			e.style.setProperty("--pretalx-toolbar-height", `${r}px`);
		},
		formatVersionLabel(e) {
			return e ? e.startsWith("v") ? e : "v" + e : "";
		},
		outsideClick(e) {
			let t;
			if (typeof e.composedPath == "function") t = e.composedPath();
			else if (Array.isArray(e.path) && e.path.length > 0) t = e.path;
			else {
				t = [];
				let n = e.target || null;
				for (; n;) t.push(n), n = n.parentNode;
			}
			let n = this.$refs.exportDropdown, r = Array.isArray(n) ? n[0] : n;
			r && !t.includes(r) && (this.exportOpen = !1), this.$refs.versionDropdown && !t.includes(this.$refs.versionDropdown) && (this.versionOpen = !1), this.$refs.timezoneDropdown && !t.includes(this.$refs.timezoneDropdown) && this.tzOpen && (this.tzOpen = !1, this.tzSearch = "", this.$emit("saveTimezone"));
			for (let e of Object.keys(this.openFilterDropdowns)) {
				let n = "filterDrop_" + e, r = this.$refs[n], i = Array.isArray(r) ? r[0] : r;
				i && !t.includes(i) && (this.openFilterDropdowns[e] = !1);
			}
			this.$refs.recordingDropdown && !t.includes(this.$refs.recordingDropdown) && (this.recordingOpen = !1), this.$refs.sortDropdown && !t.includes(this.$refs.sortDropdown) && (this.sortOpen = !1), this.$refs.densityDropdown && !t.includes(this.$refs.densityDropdown) && (this.densityOpen = !1), this.searchExpanded && this.$refs.searchArea && !t.includes(this.$refs.searchArea) && this.closeSearch(), t.includes(this.$el) || (this.mobileFiltersOpen = !1, this.mobileMoreOpen = !1);
		},
		toggleMobileFilters() {
			this.mobileFiltersOpen = !this.mobileFiltersOpen, this.mobileFiltersOpen && (this.mobileMoreOpen = !1);
		},
		toggleMobileMore() {
			this.mobileMoreOpen = !this.mobileMoreOpen, this.mobileMoreOpen && (this.mobileFiltersOpen = !1);
		},
		selectTimeDensity(e) {
			this.$emit("setTimeDensityMinutes", e), this.densityOpen = !1, this.$nextTick(() => this.$refs.densityDropdown?.querySelector?.("button")?.focus?.());
		},
		selectSort(e) {
			this.sortModel = e, this.sortOpen = !1, this.$nextTick(() => this.$refs.sortDropdown?.querySelector?.("button")?.focus?.());
		},
		toggleRoomSort() {
			let e = !this.includeRoomSortKey;
			this.$emit("update:includeRoomSortKey", e);
		},
		toggleDatetimeSort() {
			let e = !this.includeDateSortKey;
			this.$emit("update:includeDateSortKey", e);
		},
		togglePopularitySort() {
			let e = !this.includePopularitySortKey;
			this.$emit("update:includePopularitySortKey", e);
		},
		toggleRecordingDropdown() {
			this.recordingOpen = !this.recordingOpen, this.recordingOpen && this.$nextTick(() => this.focusSelectedRecordingOption());
		},
		closeRecordingDropdown() {
			this.recordingOpen = !1;
		},
		selectRecording(e) {
			this.recordingModel = e, this.recordingOpen = !1, this.$nextTick(() => this.$refs.recordingDropdown?.querySelector?.("button")?.focus?.());
		},
		getRecordingOptionButtons() {
			let e = this.$refs.recordingOptionButtons;
			return e ? Array.isArray(e) ? e : [e] : [];
		},
		focusSelectedRecordingOption() {
			let e = this.getRecordingOptionButtons();
			if (!e.length) return;
			let t = [
				"all",
				"yes",
				"no"
			].indexOf(this.recordingModel);
			(e[Math.max(0, t)] || e[0])?.focus?.();
		},
		focusNextRecordingOption() {
			let e = this.getRecordingOptionButtons();
			e.length && (e[(e.findIndex((e) => e === document.activeElement) + 1 + e.length) % e.length] || e[0])?.focus?.();
		},
		focusPrevRecordingOption() {
			let e = this.getRecordingOptionButtons();
			e.length && (e[(e.findIndex((e) => e === document.activeElement) - 1 + e.length) % e.length] || e[e.length - 1])?.focus?.();
		},
		toggleFilterDropdown(e) {
			let t = !this.openFilterDropdowns[e], n = {};
			for (let e of Object.keys(this.openFilterDropdowns || {})) n[e] = !1;
			n[e] = t, this.openFilterDropdowns = n, t && (this.recordingOpen = !1, this.sortOpen = !1, this.densityOpen = !1, this.exportOpen = !1, this.versionOpen = !1, this.tzOpen && (this.tzOpen = !1, this.tzSearch = ""), this.searchExpanded = !1);
		},
		selectedCount(e) {
			return e.data.filter((e) => e.selected).length;
		},
		toggleFullscreen() {
			let e = this.fullscreenTarget || this.$el.closest(".pretalx-schedule") || document.documentElement;
			document.fullscreenElement ? document.exitFullscreen?.() : e.requestFullscreen?.().catch((e) => {
				console.error("Fullscreen request failed:", e);
			});
		},
		onFullscreenChange() {
			this.isFullscreen = !!document.fullscreenElement, this.$emit("fullscreen-change", this.isFullscreen);
		},
		printSchedule() {
			window.print();
		},
		faIconSvg(e) {
			return e ? ut[e] || "<circle cx=\"12\" cy=\"12\" r=\"10\"/>" : "";
		},
		findTimezoneOption(e) {
			return this.allTimezoneOptions.find((t) => t.id === e);
		},
		getTimezoneLabel(e) {
			return e?.label || e || "";
		},
		selectTimezone(e) {
			this.$emit("update:currentTimezone", e), this.$emit("saveTimezone");
		},
		toggleTzDropdown() {
			this.tzOpen = !this.tzOpen, this.tzSearch = "", this.tzOpen && this.ensureOtherTimezones();
		},
		ensureOtherTimezones() {
			if (this.cachedOtherTimezones) return;
			let e = new Set(this.pinnedTimezones.map((e) => e.id)), t = /* @__PURE__ */ new Set(), n = [], r = this.availableTimezones.length ? this.availableTimezones : [], i = (r) => {
				!r || e.has(r) || t.has(r) || (t.add(r), n.push(r));
			};
			for (let e of r) i(e);
			i(this.scheduleTimezone), i(this.userTimezone), this.cachedOtherTimezones = n.sort((e, t) => e.localeCompare(t)).map((e) => ({
				id: e,
				label: e
			}));
		},
		toggleFilter(e) {
			e.selected = !e.selected, this.$emit("filterToggle", e);
		},
		ensureCurrentDayVisible() {
			if (!this.days || this.days.length <= 1) return;
			if (!this.showDayArrows) {
				this.dayWindowStart = 0;
				return;
			}
			let e = this.days.findIndex((e) => e.format("YYYY-MM-DD") === this.currentDay);
			if (e < 0) return;
			let t = this.dayWindowSize;
			e < this.dayWindowStart ? this.dayWindowStart = Math.max(0, e) : e >= this.dayWindowStart + t && (this.dayWindowStart = Math.min(this.days.length - t, e - t + 1));
		},
		async updateDayNavigation() {
			if (this._updatingDayNav) return;
			let e = this.$refs.dayNavCenter;
			if (!e || !this.days?.length || this.days.length <= 1) {
				this.maxVisibleDays = Infinity;
				return;
			}
			this._updatingDayNav = !0;
			try {
				let t = () => {
					let t = this.getDayNavAvailableWidth();
					return t <= 0 ? !1 : e.scrollWidth <= t + 1;
				};
				if (this.maxVisibleDays = this.days.length, await this.$nextTick(), await new Promise((e) => requestAnimationFrame(e)), t()) {
					this.dayWindowStart = 0;
					return;
				}
				let n = 1, r = this.days.length - 1, i = 1;
				for (; n <= r;) {
					let e = Math.floor((n + r) / 2);
					this.maxVisibleDays = e, await this.$nextTick(), t() ? (i = e, n = e + 1) : r = e - 1;
				}
				this.maxVisibleDays = i, await this.$nextTick(), this.ensureCurrentDayVisible();
			} finally {
				this._updatingDayNav = !1;
			}
		},
		getDayNavAvailableWidth() {
			let e = this.$refs.dayNavCenter;
			return e ? Math.max(0, e.clientWidth) : 0;
		},
		shiftDays(e) {
			let t = Math.max(1, this.dayWindowSize - 1), n = e < 0 ? -t : t, r = Math.max(0, this.days.length - this.dayWindowSize);
			this.dayWindowStart = Math.max(0, Math.min(r, this.dayWindowStart + n));
		},
		toggleSearch() {
			this.searchExpanded = !this.searchExpanded, this.searchExpanded ? this.$nextTick(() => this.$refs.searchInput?.focus()) : this.$emit("update:searchQuery", "");
		},
		closeSearch() {
			this.searchExpanded = !1, this.$emit("update:searchQuery", "");
		}
	}
}, [["render", X], ["styles", [Z]]]);
//#endregion
export { $ as t };
