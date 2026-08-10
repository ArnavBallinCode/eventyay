import { L as e, Q as t, Z as n, lt as r } from "./pretalx-schedule-chunk-grid.js";
import { r as i } from "./pretalx-schedule-chunk-modal.js";
//#region src/components/MarkdownContent.vue?vue&type=template&lang.js
var a = ["innerHTML"];
function o(e, i, o, s, c, l) {
	return o.markdown ? (r(), t("div", {
		key: 0,
		class: "c-markdown-content",
		innerHTML: l.rendered
	}, null, 8, a)) : n("", !0);
}
var s = /*#__PURE__*/ e({
	name: "MarkdownContent",
	props: { markdown: {
		type: String,
		default: ""
	} },
	computed: { rendered() {
		return i(this.markdown);
	} }
}, [["render", o], ["styles", [".c-markdown-content{font-size:16px;line-height:1.45}.c-markdown-content p{font-size:inherit;margin:.5em 0}.c-markdown-content p:first-child{margin-top:0}.c-markdown-content p:last-child{margin-bottom:0}.c-markdown-content a{color:var(--pretalx-clr-primary,#3aa57c)}.c-markdown-content table{border-collapse:collapse;width:100%;margin:.5em 0;font-size:.95em}.c-markdown-content th,.c-markdown-content td{border:1px solid var(--color-border,#ddd);padding:.35em .5em}.c-markdown-content pre{background:var(--color-bg-secondary,#f5f5f5);border-radius:4px;margin:.5em 0;padding:.5em .75em;font-size:.9em;overflow-x:auto}.c-markdown-content code{font-size:.9em}.c-markdown-content blockquote{border-left:3px solid var(--color-border,#ccc);margin:.5em 0;padding-left:.75em}.c-markdown-content ul,.c-markdown-content ol{margin:.5em 0;padding-left:1.25em}"]]]);
//#endregion
export { s as t };
