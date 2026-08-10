import { o as e } from "./pretalx-schedule-rolldown-runtime.js";
import { $ as t, B as n, G as r, I as i, L as a, Q as o, V as ee, X as te, Y as s, Z as c, bt as l, et as u, ft as d, gt as f, h as ne, lt as p, pt as re, tt as m, ut as h, xt as g, yt as _ } from "./pretalx-schedule-chunk-grid.js";
import { t as v } from "./pretalx-schedule-MarkdownContent.js";
import { t as y } from "./pretalx-schedule-SpeakerSocialLinks.js";
//#region src/components/SpeakersList.vue?vue&type=template&lang.js
var b = /* @__PURE__ */ e(i()), x = { class: "c-speakers-list" }, S = {
	key: 0,
	class: "speakers-toolbar"
}, C = { class: "search-box" }, w = ["placeholder"], T = ["aria-expanded", "aria-label"], E = { class: "btn-label" }, D = {
	key: 0,
	class: "mobile-toggle-badge"
}, O = {
	key: 0,
	class: "filter-group"
}, k = { class: "dropdown-wrapper" }, A = { class: "btn-label" }, j = {
	key: 0,
	class: "filter-dot"
}, M = {
	key: 0,
	class: "dropdown-menu"
}, N = ["value"], P = {
	key: 1,
	class: "filter-group"
}, F = { class: "dropdown-wrapper" }, I = { class: "btn-label" }, L = {
	key: 0,
	class: "filter-dot"
}, R = {
	key: 0,
	class: "dropdown-menu"
}, z = ["value"], B = {
	key: 0,
	class: "dropdown-actions"
}, V = ["title", "aria-label"], H = ["aria-expanded", "aria-label"], U = { class: "btn-label" }, W = { class: "sort-group" }, G = { class: "dropdown-wrapper" }, K = { class: "btn-label" }, q = {
	key: 0,
	class: "dropdown-menu"
}, J = ["onClick"], Y = {
	key: 0,
	class: "view-toggle"
}, X = ["title"], ie = {
	key: 0,
	class: "filter-icon",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": "2"
}, ae = {
	key: 1,
	class: "filter-icon",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": "2"
}, oe = {
	key: 1,
	class: "speakers-grid"
}, se = ["href", "onClick"], ce = { class: "speaker-avatar" }, le = ["src", "alt"], ue = {
	key: 1,
	class: "avatar-placeholder"
}, de = { class: "speaker-info" }, fe = { class: "name" }, pe = {
	key: 0,
	class: "biography"
}, me = {
	key: 1,
	class: "sessions-list"
}, he = {
	key: 0,
	class: "separator"
}, ge = {
	key: 2,
	class: "speakers-details"
}, _e = { class: "featured-speakers-grid" }, ve = { class: "featured-speaker-card" }, ye = { class: "featured-speaker-summary" }, be = { class: "thumbnail" }, xe = ["src", "alt"], Se = {
	key: 1,
	class: "avatar-placeholder"
}, Ce = { class: "caption text-center" }, we = { class: "featured-speaker-details" }, Te = {
	key: 0,
	class: "featured-speaker-divider"
}, Ee = {
	key: 1,
	class: "featured-speaker-divider"
}, De = { class: "featured-speaker-sessions" }, Oe = { class: "featured-speaker-session-time" }, ke = ["href", "onClick"], Z = { class: "featured-speaker-session-slot" }, Ae = { class: "featured-speaker-session-title" }, je = { class: "featured-speaker-profile-link" }, Me = ["href", "onClick"], Ne = {
	key: 3,
	class: "empty"
}, Pe = {
	key: 4,
	class: "empty"
}, Fe = {
	key: 5,
	class: "loading"
}, Ie = {
	key: 6,
	class: "sentinel",
	ref: "sentinel"
};
function Q(e, i, a, ne, v, y) {
	let b = d("markdown-content"), Q = d("speaker-social-links"), $ = re("scrollbar");
	return f((p(), o("div", x, [
		a.hideToolbar ? c("", !0) : (p(), o("div", S, [
			s("div", C, [
				i[14] ||= s("svg", {
					class: "search-icon",
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
				})], -1),
				f(s("input", {
					class: "search-input",
					"onUpdate:modelValue": i[0] ||= (e) => v.searchQuery = e,
					placeholder: y.t.search_speakers
				}, null, 8, w), [[ee, v.searchQuery]]),
				v.searchQuery ? (p(), o("button", {
					key: 0,
					class: "search-clear",
					onClick: i[1] ||= (e) => v.searchQuery = ""
				}, [...i[13] ||= [s("svg", {
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					"stroke-width": "2"
				}, [s("path", { d: "M18 6L6 18M6 6l12 12" })], -1)]])) : c("", !0)
			]),
			s("button", {
				class: _(["filter-btn mobile-toggle-btn mobile-filter-toggle", { active: v.mobileFiltersOpen || y.hasActiveFilters }]),
				onClick: i[2] ||= (...e) => y.toggleMobileFilters && y.toggleMobileFilters(...e),
				"aria-expanded": v.mobileFiltersOpen ? "true" : "false",
				"aria-label": y.t.filters
			}, [
				i[15] ||= s("svg", {
					class: "filter-icon",
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
				], -1),
				s("span", E, g(y.t.filters), 1),
				y.hasActiveFilters ? (p(), o("span", D)) : c("", !0)
			], 10, T),
			s("div", {
				class: _(["toolbar-filters", { open: v.mobileFiltersOpen }]),
				ref: "mobileFiltersPanel"
			}, [
				y.availableLanguages.length > 1 ? (p(), o("div", O, [s("div", k, [s("button", {
					class: _(["filter-btn", { active: v.selectedLanguages.length }]),
					onClick: i[3] ||= (e) => y.toggleDropdown("language")
				}, [
					i[16] ||= s("svg", {
						class: "filter-icon",
						viewBox: "0 0 24 24",
						fill: "currentColor",
						"aria-hidden": "true"
					}, [s("path", { d: "M12.87 15.07l-2.54-2.51c.86-1.02 1.52-2.12 1.99-3.28H14V7h-4V5H8v2H4v2h7.17c-.39 1.17-.96 2.27-1.7 3.25-.48-.63-.9-1.31-1.25-2.03H6.1c.5 1.09 1.17 2.14 2 3.11L3 20h2l5-5 3.11 3.11.76-3.04z" }), s("path", { d: "M15.5 11h-2L9 22h2l1-3h4l1 3h2l-3.5-11zm-2.3 6 .8-2.8.8 2.8h-1.6z" })], -1),
					s("span", A, g(y.t.language), 1),
					v.selectedLanguages.length ? (p(), o("span", j)) : c("", !0)
				], 2), v.openDropdown === "language" ? (p(), o("div", M, [(p(!0), o(r, null, h(y.availableLanguages, (e) => (p(), o("label", {
					class: "dropdown-item",
					key: e
				}, [f(s("input", {
					type: "checkbox",
					value: e,
					"onUpdate:modelValue": i[4] ||= (e) => v.selectedLanguages = e
				}, null, 8, N), [[n, v.selectedLanguages]]), u(g(y.formatLanguageLabel(e)), 1)]))), 128))])) : c("", !0)])])) : c("", !0),
				y.availableTracks.length > 1 ? (p(), o("div", P, [s("div", F, [s("button", {
					class: _(["filter-btn", { active: v.selectedTracks.length }]),
					onClick: i[5] ||= (e) => y.toggleDropdown("track")
				}, [
					i[17] ||= s("svg", {
						class: "filter-icon",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						"stroke-width": "2"
					}, [s("path", { d: "M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" }), s("path", { d: "M6 6h.008v.008H6V6Z" })], -1),
					s("span", I, g(y.t.track), 1),
					v.selectedTracks.length ? (p(), o("span", L)) : c("", !0)
				], 2), v.openDropdown === "track" ? (p(), o("div", R, [(p(!0), o(r, null, h(y.availableTracks, (e) => (p(), o("label", {
					class: "dropdown-item",
					key: e.id
				}, [
					f(s("input", {
						type: "checkbox",
						value: e.id,
						"onUpdate:modelValue": i[6] ||= (e) => v.selectedTracks = e
					}, null, 8, z), [[n, v.selectedTracks]]),
					e.color ? (p(), o("span", {
						key: 0,
						class: "track-color",
						style: l({ "background-color": e.color })
					}, null, 4)) : c("", !0),
					u(g(v.getLocalizedString(e.name)), 1)
				]))), 128)), v.selectedTracks.length ? (p(), o("div", B, [s("button", {
					class: "clear-btn",
					onClick: i[7] ||= (e) => v.selectedTracks = []
				}, g(y.t.clear), 1)])) : c("", !0)])) : c("", !0)])])) : c("", !0),
				y.hasActiveFilters ? (p(), o("button", {
					key: 2,
					class: "filter-btn clear-filters-btn",
					title: y.t.reset_all_filters,
					"aria-label": y.t.reset_all_filters,
					onClick: i[8] ||= (...e) => y.clearAllFilters && y.clearAllFilters(...e)
				}, [...i[18] ||= [t("<svg class=\"filter-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"4\" y1=\"4\" x2=\"20\" y2=\"4\"></line><line x1=\"7\" y1=\"9\" x2=\"17\" y2=\"9\"></line><line x1=\"10\" y1=\"14\" x2=\"14\" y2=\"14\"></line><path d=\"M17 17l4 4m0-4l-4 4\"></path></svg>", 1)]], 8, V)) : c("", !0)
			], 2),
			s("button", {
				class: _(["filter-btn mobile-toggle-btn mobile-more-toggle", { active: v.mobileMoreOpen }]),
				onClick: i[9] ||= (...e) => y.toggleMobileMore && y.toggleMobileMore(...e),
				"aria-expanded": v.mobileMoreOpen ? "true" : "false",
				"aria-label": y.t.more
			}, [i[19] ||= s("svg", {
				class: "filter-icon",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2"
			}, [
				s("circle", {
					cx: "5",
					cy: "12",
					r: "1.5"
				}),
				s("circle", {
					cx: "12",
					cy: "12",
					r: "1.5"
				}),
				s("circle", {
					cx: "19",
					cy: "12",
					r: "1.5"
				})
			], -1), s("span", U, g(y.t.more), 1)], 10, H),
			s("div", {
				class: _(["toolbar-secondary", { open: v.mobileMoreOpen }]),
				ref: "mobileMorePanel"
			}, [s("div", W, [s("div", G, [s("button", {
				class: "filter-btn",
				onClick: i[10] ||= (e) => y.toggleDropdown("sort")
			}, [i[20] ||= s("svg", {
				class: "filter-icon",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2"
			}, [s("path", { d: "M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" })], -1), s("span", K, g(y.currentSortLabel), 1)]), v.openDropdown === "sort" ? (p(), o("div", q, [(p(!0), o(r, null, h(y.sortOptions, (e) => (p(), o("button", {
				class: _(["dropdown-item", { selected: v.sortBy === e.value }]),
				key: e.value,
				onClick: (t) => y.setSort(e.value)
			}, g(e.label), 11, J))), 128))])) : c("", !0)])]), a.speakers && a.speakers.length ? (p(), o("div", Y, [s("button", {
				class: "filter-btn view-btn",
				onClick: i[11] ||= (...e) => y.toggleView && y.toggleView(...e),
				title: y.effectiveViewMode === "list" ? y.t.view_details : y.t.view_list
			}, [y.effectiveViewMode === "list" ? (p(), o("svg", ie, [...i[21] ||= [s("path", { d: "M4 6h16M4 12h16M4 18h16" }, null, -1)]])) : (p(), o("svg", ae, [...i[22] ||= [
				s("rect", {
					x: "3",
					y: "3",
					width: "7",
					height: "7"
				}, null, -1),
				s("rect", {
					x: "14",
					y: "3",
					width: "7",
					height: "7"
				}, null, -1),
				s("rect", {
					x: "3",
					y: "14",
					width: "7",
					height: "7"
				}, null, -1),
				s("rect", {
					x: "14",
					y: "14",
					width: "7",
					height: "7"
				}, null, -1)
			]]))], 8, X)])) : c("", !0)], 2)
		])),
		y.filteredSpeakers.length && y.effectiveViewMode === "list" ? (p(), o("div", oe, [(p(!0), o(r, null, h(y.filteredSpeakers, (e, t) => (p(), o("a", {
			class: "speaker-card",
			key: e.code || t,
			href: y.getSpeakerLink(e),
			onClick: (t) => y.onSpeakerClick(t, e)
		}, [s("div", ce, [e.avatar_thumbnail_tiny || e.avatar_thumbnail_default || e.avatar || e.avatar_url ? (p(), o("img", {
			key: 0,
			src: e.avatar_thumbnail_tiny || e.avatar_thumbnail_default || e.avatar || e.avatar_url,
			alt: e.name,
			loading: "lazy"
		}, null, 8, le)) : (p(), o("div", ue, [...i[23] ||= [s("svg", { viewBox: "0 0 24 24" }, [s("path", {
			fill: "currentColor",
			d: "M12,1A5.8,5.8 0 0,1 17.8,6.8A5.8,5.8 0 0,1 12,12.6A5.8,5.8 0 0,1 6.2,6.8A5.8,5.8 0 0,1 12,1M12,15C18.63,15 24,17.67 24,21V23H0V21C0,17.67 5.37,15 12,15Z"
		})], -1)]]))]), s("div", de, [
			s("div", fe, g(e.name || y.t.speaker_fallback), 1),
			e.biography ? (p(), o("div", pe, [m(b, { markdown: e.biography }, null, 8, ["markdown"])])) : c("", !0),
			e.sessions && e.sessions.length ? (p(), o("div", me, [(p(!0), o(r, null, h(e.sessions, (t, n) => (p(), o("span", {
				class: "session-title",
				key: t.id || n
			}, [u(g(v.getLocalizedString(t.title)), 1), n < e.sessions.length - 1 ? (p(), o("span", he, ",\xA0")) : c("", !0)]))), 128))])) : c("", !0)
		])], 8, se))), 128))])) : y.filteredSpeakers.length && y.effectiveViewMode === "details" ? (p(), o("div", ge, [s("div", _e, [(p(!0), o(r, null, h(y.filteredSpeakers, (e) => (p(), o("div", {
			class: "featured-speaker-column",
			key: e.code
		}, [s("details", ve, [s("summary", ye, [s("div", be, [e.avatar || e.avatar_url ? (p(), o("img", {
			key: 0,
			src: e.avatar || e.avatar_url,
			alt: e.name || y.t.speaker_fallback,
			loading: "lazy"
		}, null, 8, xe)) : (p(), o("div", Se, [...i[24] ||= [s("svg", { viewBox: "0 0 24 24" }, [s("path", {
			fill: "currentColor",
			d: "M12,1A5.8,5.8 0 0,1 17.8,6.8A5.8,5.8 0 0,1 12,12.6A5.8,5.8 0 0,1 6.2,6.8A5.8,5.8 0 0,1 12,1M12,15C18.63,15 24,17.67 24,21V23H0V21C0,17.67 5.37,15 12,15Z"
		})], -1)]])), s("div", Ce, [s("h4", null, g(e.name || y.t.speaker_fallback), 1), e.biography ? (p(), te(b, {
			key: 0,
			class: "featured-speaker-preview-bio",
			markdown: e.biography
		}, null, 8, ["markdown"])) : c("", !0)])])]), s("div", we, [
			m(Q, {
				links: e.social_links,
				alignment: "flex-start"
			}, null, 8, ["links"]),
			e.sessions && e.sessions.length ? (p(), o(r, { key: 0 }, [e.social_links && e.social_links.length ? (p(), o("hr", Te)) : (p(), o("hr", Ee)), s("div", De, [s("h4", null, g(y.t.sessions), 1), (p(!0), o(r, null, h(e.sessions, (e) => (p(), o("div", {
				class: "featured-speaker-session",
				key: e.id
			}, [s("small", Oe, g(y.formatSessionDateTime(e)), 1), s("a", {
				class: "featured-speaker-session-link",
				href: y.getSessionLink(e),
				style: l(y.getSessionStyle(e)),
				onClick: (t) => y.onSessionClick(t, e)
			}, [s("span", Z, g(y.formatSessionSlot(e)), 1), s("span", Ae, g(v.getLocalizedString(e.title)), 1)], 12, ke)]))), 128))])], 64)) : c("", !0),
			s("div", je, [s("a", {
				href: y.getSpeakerLink(e),
				onClick: (t) => y.onSpeakerClick(t, e)
			}, g(y.t.view_profile), 9, Me)])
		])])]))), 128))])])) : c("", !0),
		v.loadError ? (p(), o("div", Ne, g(y.t.load_error), 1)) : !v.isLoadingMore && !y.filteredSpeakers.length ? (p(), o("div", Pe, g(y.t.no_speakers_found), 1)) : c("", !0),
		v.isLoadingMore ? (p(), o("div", Fe, "Loading...")) : c("", !0),
		y.hasMore ? (p(), o("div", Ie, null, 512)) : c("", !0),
		v.openDropdown || v.mobileFiltersOpen || v.mobileMoreOpen ? (p(), o("div", {
			key: 7,
			class: "backdrop",
			onClick: i[12] ||= (...e) => y.closeToolbarOverlays && y.closeToolbarOverlays(...e)
		})) : c("", !0)
	])), [[
		$,
		,
		void 0,
		{ y: !0 }
	]]);
}
var $ = /*#__PURE__*/ a({
	name: "SpeakersList",
	components: {
		MarkdownContent: v,
		SpeakerSocialLinks: y
	},
	inject: {
		scheduleData: { default: null },
		eventUrl: { default: "" },
		generateSpeakerLinkUrl: { default() {
			return ({ speaker: e }) => `#speakers/${e.code}`;
		} },
		onSessionLinkClick: { default() {
			return () => {};
		} },
		onSpeakerLinkClick: { default() {
			return () => {};
		} },
		translationMessages: { default: () => ({}) }
	},
	props: {
		speakers: {
			type: Array,
			default: () => []
		},
		hideToolbar: {
			type: Boolean,
			default: !1
		},
		viewMode: {
			type: String,
			default: "details",
			validator: (e) => ["list", "details"].includes(e)
		}
	},
	data() {
		return {
			getLocalizedString: ne,
			searchQuery: "",
			speakersFromApi: [],
			nextPageUrl: null,
			isLoadingMore: !1,
			loadError: !1,
			searchTimeout: null,
			sortBy: "featured",
			openDropdown: null,
			activeViewMode: this.viewMode,
			mobileFiltersOpen: !1,
			mobileMoreOpen: !1,
			selectedLanguages: [],
			selectedTracks: [],
			metaData: null
		};
	},
	mounted() {
		document.addEventListener("click", this.onOutsideClick, !0);
		let e = new URLSearchParams(window.location.search);
		e.has("q") && (this.searchQuery = e.get("q")), e.has("language") && (this.selectedLanguages = e.getAll("language")), e.has("track") && (this.selectedTracks = e.getAll("track"));
		let t = document.getElementById("pretalx-speakers-meta");
		if (t) try {
			this.metaData = JSON.parse(t.textContent);
		} catch {}
		this.speakers && this.speakers.length > 0 || this.fetchSpeakers(), this.observer = new IntersectionObserver((e) => {
			e[0].isIntersecting && this.nextPageUrl && this.fetchSpeakers(this.nextPageUrl, !0);
		});
		let n = this.$el.querySelector(".sentinel");
		n && this.observer.observe(n);
	},
	watch: {
		searchQuery(e) {
			this.searchTimeout && clearTimeout(this.searchTimeout), this.searchTimeout = setTimeout(() => {
				this.updateUrlAndFetch();
			}, 300);
		},
		selectedLanguages() {
			this.updateUrlAndFetch();
		},
		selectedTracks() {
			this.updateUrlAndFetch();
		},
		nextPageUrl() {
			if (!this.nextPageUrl) return;
			let e = this.$el.querySelector(".sentinel");
			e && this.observer && (this.observer.unobserve(e), this.observer.observe(e));
		}
	},
	beforeUnmount() {
		document.removeEventListener("click", this.onOutsideClick, !0), this.searchTimeout && clearTimeout(this.searchTimeout), this.observer && this.observer.disconnect();
	},
	computed: {
		speakerCodeFromAny() {
			return (e) => e ? typeof e == "string" ? e : e.code || null : null;
		},
		t() {
			let e = this.translationMessages || {};
			return {
				speaker_fallback: e.speaker_fallback || "Speaker",
				no_speakers_found: e.no_speakers_found || "No speakers found.",
				load_error: e.load_error || "Could not load speakers. Please try again.",
				search_speakers: e.search_speakers || "Search speakers…",
				language: e.language || "Language",
				track: e.track || "Track",
				sort: e.sort || "Sort",
				a_to_z: e.a_to_z || "A → Z",
				z_to_a: e.z_to_a || "Z → A",
				featured: e.featured || "Featured",
				sessions: e.sessions || "Sessions",
				view_profile: e.view_profile || "View speaker profile",
				view_list: e.view_list || "Switch to list view",
				view_details: e.view_details || "Switch to details view",
				clear: e.clear || "Clear",
				reset_all_filters: e.reset_all_filters || "Reset all filters",
				filters: e.filters || "Filters",
				more: e.more || "More"
			};
		},
		availableLanguages() {
			return this.metaData && this.metaData.content_locales ? this.metaData.content_locales : [];
		},
		availableTracks() {
			return this.metaData && this.metaData.tracks ? this.metaData.tracks : [];
		},
		hasActiveFilters() {
			return !!this.searchQuery || this.selectedLanguages.length > 0 || this.selectedTracks.length > 0;
		},
		sortOptions() {
			return [
				{
					value: "featured",
					label: this.t.featured
				},
				{
					value: "a-z",
					label: this.t.a_to_z
				},
				{
					value: "z-a",
					label: this.t.z_to_a
				}
			];
		},
		currentSortLabel() {
			let e = this.sortOptions.find((e) => e.value === this.sortBy);
			return e ? e.label : this.t.a_to_z;
		},
		filteredSpeakers() {
			if (this.speakers && this.speakers.length > 0) {
				let e = [...this.speakers];
				if (this.searchQuery) {
					let t = this.searchQuery.toLowerCase();
					e = e.filter((e) => (e.name || e.public_name || "").toLowerCase().includes(t));
				}
				return this.sortBy === "a-z" ? e.sort((e, t) => (e.name || e.public_name || "").localeCompare(t.name || t.public_name)) : this.sortBy === "z-a" && e.sort((e, t) => (t.name || t.public_name || "").localeCompare(e.name || e.public_name)), e;
			}
			return this.speakersFromApi;
		},
		hasMore() {
			return this.speakers && this.speakers.length > 0 ? !1 : !!this.nextPageUrl;
		},
		effectiveViewMode() {
			return this.activeViewMode;
		}
	},
	methods: {
		onOutsideClick(e) {
			(typeof e.composedPath == "function" ? e.composedPath() : (() => {
				let t = [], n = e.target || null;
				for (; n;) t.push(n), n = n.parentNode;
				return t;
			})()).includes(this.$el) || this.closeToolbarOverlays();
		},
		updateUrlAndFetch() {
			let e = new URL(window.location.href);
			this.searchQuery ? e.searchParams.set("q", this.searchQuery) : e.searchParams.delete("q"), e.searchParams.delete("language"), this.selectedLanguages.forEach((t) => e.searchParams.append("language", t)), e.searchParams.delete("track"), this.selectedTracks.forEach((t) => e.searchParams.append("track", t)), window.history.replaceState({}, "", e), this.fetchSpeakers();
		},
		formatLanguageLabel(e) {
			return e ? e.toString().trim().toLowerCase().replace(/_/g, "-") : "";
		},
		clearAllFilters() {
			this.searchQuery = "", this.selectedLanguages = [], this.selectedTracks = [];
		},
		toggleDropdown(e) {
			this.openDropdown = this.openDropdown === e ? null : e;
		},
		closeToolbarOverlays() {
			this.openDropdown = null, this.mobileFiltersOpen = !1, this.mobileMoreOpen = !1;
		},
		toggleMobileFilters() {
			this.mobileFiltersOpen = !this.mobileFiltersOpen, this.mobileFiltersOpen && (this.mobileMoreOpen = !1, this.openDropdown = null);
		},
		toggleMobileMore() {
			this.mobileMoreOpen = !this.mobileMoreOpen, this.mobileMoreOpen && (this.mobileFiltersOpen = !1, this.openDropdown = null);
		},
		getSpeakerLink(e) {
			return this.generateSpeakerLinkUrl({ speaker: e });
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
		async fetchSpeakers(e = null, t = !1) {
			if (!(this.isLoadingMore && t)) {
				this.isLoadingMore = !0, this.loadError = !1, this.fetchController && this.fetchController.abort(), this.fetchController = new AbortController();
				try {
					if (!e) {
						let t = new URL(window.location.href);
						t.searchParams.set("format", "json"), this.searchQuery && t.searchParams.set("q", this.searchQuery), t.searchParams.delete("language"), this.selectedLanguages.forEach((e) => t.searchParams.append("language", e)), t.searchParams.delete("track"), this.selectedTracks.forEach((e) => t.searchParams.append("track", e)), this.sortBy && this.sortBy !== "featured" && t.searchParams.set("sort", this.sortBy), e = t.toString();
					}
					let n = await fetch(e, { signal: this.fetchController.signal });
					if (!n.ok) throw Error(`HTTP error! status: ${n.status}`);
					let r = await n.json();
					this.speakersFromApi = t ? this.speakersFromApi.concat(r.results) : r.results, this.nextPageUrl = r.next || null;
				} catch (e) {
					e.name !== "AbortError" && (console.error("Failed to load speakers", e), this.loadError = !0);
				} finally {
					this.isLoadingMore = !1;
				}
			}
		},
		getSessionStyle(e) {
			return { "--session-color": e?.track?.color || "var(--pretalx-clr-primary)" };
		},
		formatSessionSlot(e) {
			let t = this.scheduleData?.timezone, n = this.scheduleData?.hasAmPm;
			if (!t || !e?.start || !e?.end) return "";
			let r = b.default.isMoment(e.start) ? e.start : b.default.tz(e.start, t), i = b.default.isMoment(e.end) ? e.end : b.default.tz(e.end, t), a = n ? "h:mm A" : "HH:mm";
			return `${r.clone().tz(t).format(a)} - ${i.clone().tz(t).format(a)}`;
		},
		formatSessionDateTime(e) {
			let t = this.scheduleData?.timezone, n = this.scheduleData?.hasAmPm;
			if (!t || !e?.start) return "";
			let r = b.default.isMoment(e.start) ? e.start : b.default.tz(e.start, t), i = n ? "MMM D, YYYY h:mm A" : "MMM D, YYYY HH:mm";
			return r.clone().tz(t).format(i);
		},
		toggleDropdown(e) {
			this.openDropdown = this.openDropdown === e ? null : e;
		},
		setSort(e) {
			this.sortBy = e, this.openDropdown = null, this.fetchSpeakers();
		},
		clearAllFilters() {
			this.searchQuery = "", this.openDropdown = null;
		},
		toggleView() {
			this.activeViewMode = this.activeViewMode === "list" ? "details" : "list";
		}
	}
}, [["render", Q], ["styles", [".c-speakers-list{flex-direction:column;min-height:0;display:flex;position:relative}.c-speakers-list .speakers-toolbar{box-sizing:border-box;flex-wrap:wrap;align-items:center;gap:8px;width:100%;min-width:0;max-width:100%;padding:6px 8px 0;display:flex;position:relative}.c-speakers-list .speakers-toolbar .toolbar-filters,.c-speakers-list .speakers-toolbar .toolbar-secondary{flex-wrap:wrap;align-items:center;gap:8px;display:flex}.c-speakers-list .speakers-toolbar .search-box{background:#fff;border:1px solid #ddd;border-radius:6px;flex:260px;align-items:center;gap:8px;min-width:220px;max-width:100%;padding:6px 10px;display:flex}.c-speakers-list .speakers-toolbar .search-box:focus-within{border-color:var(--pretalx-clr-primary,#3aa57c);box-shadow:0 0 0 2px #3aa57c26}.c-speakers-list .speakers-toolbar .search-box .search-icon{color:#999;flex-shrink:0;width:16px;height:16px}.c-speakers-list .speakers-toolbar .search-box .search-input{background:0 0;border:none;outline:none;flex:1;min-width:0;font-size:14px}.c-speakers-list .speakers-toolbar .search-box .search-input::placeholder{color:#999}.c-speakers-list .speakers-toolbar .search-box .search-clear{cursor:pointer;color:#999;background:0 0;border:none;align-items:center;padding:2px;display:flex}.c-speakers-list .speakers-toolbar .search-box .search-clear:hover{color:#333}.c-speakers-list .speakers-toolbar .search-box .search-clear svg{width:14px;height:14px}.c-speakers-list .speakers-toolbar .filter-group,.c-speakers-list .speakers-toolbar .sort-group,.c-speakers-list .speakers-toolbar .view-toggle{flex:0 auto;min-width:0;position:relative}.c-speakers-list .speakers-toolbar .filter-group .dropdown-wrapper,.c-speakers-list .speakers-toolbar .sort-group .dropdown-wrapper,.c-speakers-list .speakers-toolbar .view-toggle .dropdown-wrapper{max-width:100%;position:relative}.c-speakers-list .speakers-toolbar .filter-btn{cursor:pointer;white-space:nowrap;text-overflow:ellipsis;color:#555;background:#fff;border:1px solid #ddd;border-radius:6px;align-items:center;gap:5px;min-width:0;max-width:100%;padding:6px 12px;font-size:13px;display:flex;overflow:hidden}.c-speakers-list .speakers-toolbar .filter-btn .btn-label{text-overflow:ellipsis;flex:1;min-width:0;overflow:hidden}.c-speakers-list .speakers-toolbar .filter-btn:hover{background:#f8f8f8;border-color:#bbb}.c-speakers-list .speakers-toolbar .filter-btn.active{border-color:var(--pretalx-clr-primary,#3aa57c);color:var(--pretalx-clr-primary,#3aa57c);background:#3aa57c0f}.c-speakers-list .speakers-toolbar .filter-btn .filter-icon{flex-shrink:0;width:14px;height:14px}.c-speakers-list .speakers-toolbar .filter-btn .filter-dot,.c-speakers-list .speakers-toolbar .filter-btn .mobile-toggle-badge{background:var(--pretalx-clr-primary,#3aa57c);border-radius:50%;flex-shrink:0;width:7px;height:7px;margin-left:6px;display:inline-block}.c-speakers-list .speakers-toolbar .filter-btn.clear-filters-btn{justify-content:center;padding:6px 10px}.c-speakers-list .speakers-toolbar .filter-btn.mobile-toggle-btn{padding:6px 10px;font-weight:600;display:none}.c-speakers-list .speakers-toolbar .dropdown-menu{z-index:100;box-sizing:border-box;background:#fff;border:1px solid #ddd;border-radius:6px;min-width:180px;max-width:360px;max-height:260px;padding:4px 0;position:absolute;top:calc(100% + 4px);left:0;overflow:hidden auto;box-shadow:0 4px 12px #0000001f}.c-speakers-list .speakers-toolbar .dropdown-menu .dropdown-item{cursor:pointer;text-align:left;white-space:normal;overflow-wrap:anywhere;color:#333;background:0 0;border:none;align-items:center;gap:6px;width:auto;min-width:0;padding:7px 12px;font-size:13px;display:flex}.c-speakers-list .speakers-toolbar .dropdown-menu .dropdown-item:hover{background:#f5f5f5}.c-speakers-list .speakers-toolbar .dropdown-menu .dropdown-item.selected{color:var(--pretalx-clr-primary,#3aa57c);font-weight:600}.c-speakers-list .speakers-toolbar .dropdown-menu .dropdown-item input[type=checkbox]{accent-color:var(--pretalx-clr-primary,#3aa57c)}.c-speakers-list .speakers-toolbar .dropdown-menu .dropdown-item .track-color{border-radius:2px;flex-shrink:0;width:10px;height:10px;display:inline-block}@media (width<=420px){.c-speakers-list .speakers-toolbar .dropdown-menu{max-width:90vw}}.c-speakers-list .speakers-toolbar .sort-group .dropdown-menu{width:max-content;min-width:unset;left:auto;right:0}.c-speakers-list .speakers-toolbar .sort-group .dropdown-actions{border-top:1px solid #eee;padding:4px 8px}.c-speakers-list .speakers-toolbar .sort-group .dropdown-actions .clear-btn{color:var(--pretalx-clr-primary,#3aa57c);cursor:pointer;background:0 0;border:none;padding:4px;font-size:12px}.c-speakers-list .speakers-toolbar .sort-group .dropdown-actions .clear-btn:hover{text-decoration:underline}.c-speakers-list .backdrop{z-index:50;position:fixed;inset:0}.c-speakers-list .speakers-grid{flex-direction:column;gap:12px;padding:10px;display:flex}.c-speakers-list .speakers-details{flex-direction:column;gap:12px;padding:16px;display:flex}.c-speakers-list .speakers-details .featured-speakers-grid{flex-wrap:wrap;justify-content:center;gap:18px;display:flex}.c-speakers-list .speakers-details .featured-speaker-column{width:400px;max-width:100%}@media (width>=768px){.c-speakers-list .speakers-details .featured-speaker-column{width:360px;max-width:100%}}.c-speakers-list .speakers-details .featured-speaker-card{background:#fff;border:1px solid #e0e0e0;border-radius:6px;margin:0;overflow:hidden}.c-speakers-list .speakers-details .featured-speaker-summary{cursor:pointer;list-style:none}.c-speakers-list .speakers-details .featured-speaker-summary::-webkit-details-marker{display:none}.c-speakers-list .speakers-details .featured-speaker-summary .thumbnail{background:0 0;border:none;margin:0;padding:0}.c-speakers-list .speakers-details .featured-speaker-summary .thumbnail img{aspect-ratio:1;object-fit:cover;border-radius:6px;width:100%;display:block}.c-speakers-list .speakers-details .featured-speaker-summary .thumbnail .caption{padding:10px 6px 12px}.c-speakers-list .speakers-details .featured-speaker-summary .thumbnail .caption h4{color:#000000de;margin:8px 0 0;font-size:18px;font-weight:500;line-height:1.3}.c-speakers-list .speakers-details .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio{color:#0000008a;-webkit-line-clamp:2;line-clamp:2;overflow-wrap:anywhere;text-overflow:ellipsis;-webkit-box-orient:vertical;margin:4px 0 0;font-size:12px;line-height:1.35;display:-webkit-box;overflow:hidden}.c-speakers-list .speakers-details .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content{font-size:inherit;line-height:inherit;color:inherit}.c-speakers-list .speakers-details .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content p,.c-speakers-list .speakers-details .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content ul,.c-speakers-list .speakers-details .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content ol,.c-speakers-list .speakers-details .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content table,.c-speakers-list .speakers-details .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content pre{margin-top:.25em;margin-bottom:.25em}.c-speakers-list .speakers-details .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content p:first-child,.c-speakers-list .speakers-details .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content ul:first-child,.c-speakers-list .speakers-details .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content ol:first-child,.c-speakers-list .speakers-details .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content table:first-child,.c-speakers-list .speakers-details .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content pre:first-child{margin-top:0}.c-speakers-list .speakers-details .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content p:last-child,.c-speakers-list .speakers-details .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content ul:last-child,.c-speakers-list .speakers-details .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content ol:last-child,.c-speakers-list .speakers-details .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content table:last-child,.c-speakers-list .speakers-details .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content pre:last-child{margin-bottom:0}.c-speakers-list .speakers-details .featured-speaker-card[open] .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio{-webkit-line-clamp:unset;line-clamp:unset;-webkit-box-orient:unset;white-space:normal;text-overflow:clip;display:block;overflow:visible}.c-speakers-list .speakers-details .featured-speaker-card[open] .featured-speaker-summary .thumbnail .caption .featured-speaker-preview-bio.c-markdown-content{display:block}.c-speakers-list .speakers-details .avatar-placeholder{aspect-ratio:1;color:#9e9e9e;background:#f5f5f5;justify-content:center;align-items:center;width:100%;display:flex}.c-speakers-list .speakers-details .avatar-placeholder svg{width:45%;height:45%}.c-speakers-list .speakers-details .featured-speaker-details{background:#f5f5f5;border-top:1px solid #e0e0e0;margin-top:8px;padding:12px}.c-speakers-list .speakers-details .featured-speaker-divider{border-color:#e0e0e0;margin:12px 0 8px}.c-speakers-list .speakers-details .featured-speaker-sessions{margin-top:0;padding:0}.c-speakers-list .speakers-details .featured-speaker-sessions h4{color:#000000de;margin:0 0 10px;font-size:16px;font-weight:600}.c-speakers-list .speakers-details .featured-speaker-session{margin-bottom:12px}.c-speakers-list .speakers-details .featured-speaker-session:last-child{margin-bottom:0}.c-speakers-list .speakers-details .featured-speaker-session-time{color:#0000008a;margin-bottom:4px;font-size:13px;font-weight:600;line-height:1.35;display:block}.c-speakers-list .speakers-details .featured-speaker-session-link{background-color:var(--session-color,var(--pretalx-clr-primary));color:#fff;border-radius:4px;padding:9px 11px;text-decoration:none;display:block}.c-speakers-list .speakers-details .featured-speaker-session-link:hover{opacity:.92;text-decoration:none}.c-speakers-list .speakers-details .featured-speaker-session-slot{opacity:.92;margin-bottom:2px;font-size:12px;line-height:1.2;display:block}.c-speakers-list .speakers-details .featured-speaker-session-title{font-size:14px;font-weight:600;line-height:1.3;display:block}.c-speakers-list .speakers-details .featured-speaker-profile-link{text-align:right;margin-top:12px}.c-speakers-list .speakers-details .featured-speaker-profile-link a{color:var(--pretalx-clr-primary,var(--clr-primary));text-decoration:none}.c-speakers-list .speakers-details .featured-speaker-profile-link a:hover{text-decoration:underline}.c-speakers-list .speaker-card{color:#000000de;cursor:pointer;border:1px solid #e0e0e0;border-radius:6px;align-items:flex-start;gap:12px;padding:12px;text-decoration:none;display:flex}.c-speakers-list .speaker-card:hover{background-color:#f5f5f5}.c-speakers-list .speaker-card:hover .name{color:var(--pretalx-clr-primary,var(--clr-primary));text-decoration:underline}.c-speakers-list .speaker-avatar{flex-shrink:0;width:64px;height:64px}.c-speakers-list .speaker-avatar img,.c-speakers-list .speaker-avatar .avatar-placeholder{object-fit:cover;border-radius:50%;width:64px;height:64px;box-shadow:0 1px 3px #0000001f,0 1px 2px #0000003d}.c-speakers-list .speaker-avatar .avatar-placeholder{background:#0000001a;justify-content:center;align-items:center;display:flex}.c-speakers-list .speaker-avatar .avatar-placeholder svg{color:#0000004d;width:60%;height:60%}.c-speakers-list .speaker-info{flex:1;min-width:0}.c-speakers-list .speaker-info .name{margin-bottom:4px;font-size:16px;font-weight:600}.c-speakers-list .speaker-info .biography{color:#0000008a;-webkit-line-clamp:1;line-clamp:1;overflow-wrap:anywhere;text-overflow:ellipsis;-webkit-box-orient:vertical;margin-bottom:4px;font-size:14px;display:-webkit-box;overflow:hidden}.c-speakers-list .speaker-info .biography .c-markdown-content{font-size:inherit;color:inherit;line-height:1.4}.c-speakers-list .speaker-info .biography .c-markdown-content p,.c-speakers-list .speaker-info .biography .c-markdown-content ul,.c-speakers-list .speaker-info .biography .c-markdown-content ol{margin:.15em 0}.c-speakers-list .speaker-info .biography .c-markdown-content p:first-child,.c-speakers-list .speaker-info .biography .c-markdown-content ul:first-child,.c-speakers-list .speaker-info .biography .c-markdown-content ol:first-child{margin-top:0}.c-speakers-list .speaker-info .biography .c-markdown-content p:last-child,.c-speakers-list .speaker-info .biography .c-markdown-content ul:last-child,.c-speakers-list .speaker-info .biography .c-markdown-content ol:last-child{margin-bottom:0}.c-speakers-list .speaker-info .sessions-list{color:#0000008a;font-size:13px}.c-speakers-list .speaker-info .sessions-list .session-title{font-style:italic}.c-speakers-list .empty{text-align:center;color:#0000008a;min-height:400px;padding:32px}@media (width<=600px){.c-speakers-list .speakers-toolbar{flex-wrap:nowrap;gap:6px;padding:6px 8px 0}.c-speakers-list .speakers-toolbar .search-box{flex:auto;order:1;min-width:0}.c-speakers-list .speakers-toolbar .filter-btn.mobile-toggle-btn{flex:none;order:2;display:inline-flex}.c-speakers-list .speakers-toolbar .toolbar-filters,.c-speakers-list .speakers-toolbar .toolbar-secondary{z-index:120;background:#fff;border:1px solid #e5e5e5;border-radius:10px;width:max-content;max-width:94vw;max-height:70vh;padding:8px;display:none;position:absolute;top:calc(100% + 4px);overflow:auto visible;box-shadow:0 10px 24px #0000001f}.c-speakers-list .speakers-toolbar .toolbar-filters.open,.c-speakers-list .speakers-toolbar .toolbar-secondary.open{-webkit-overflow-scrolling:touch;flex-wrap:nowrap;align-items:flex-start;display:flex}.c-speakers-list .speakers-toolbar .toolbar-filters,.c-speakers-list .speakers-toolbar .toolbar-secondary{left:auto;right:0}.c-speakers-list .speakers-toolbar .toolbar-secondary>*{flex:none;min-width:0}.c-speakers-list .speakers-toolbar .toolbar-secondary .filter-btn,.c-speakers-list .speakers-toolbar .toolbar-secondary .dropdown-item{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.c-speakers-list .speakers-toolbar .filter-group .dropdown-wrapper,.c-speakers-list .speakers-toolbar .sort-group .dropdown-wrapper{flex-direction:column;align-items:stretch;display:flex;position:relative}.c-speakers-list .speakers-toolbar .filter-group,.c-speakers-list .speakers-toolbar .sort-group,.c-speakers-list .speakers-toolbar .view-toggle{flex:none}.c-speakers-list .speakers-toolbar .dropdown-wrapper{width:max-content;max-width:94vw}.c-speakers-list .speakers-toolbar .dropdown-menu{min-width:max-content;max-width:90vw;max-height:none;box-shadow:none;background:#fff;border:1px solid #e8e8e8;border-radius:8px;padding:4px 0;position:static;overflow:visible}.c-speakers-list .backdrop{z-index:110}}"]]]);
//#endregion
export { $ as default };
