import { openBlock, createElementBlock, normalizeClass, createTextVNode, toDisplayString, createElementVNode } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const Spinner_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  props: {
    variant: {
      default: "white"
    },
    text: {
      default: ""
    },
    containerClass: {}
  },
  computed: {
    containerClassName() {
      return "mx-1 align-middle inline-flex " + this.containerClass;
    },
    className() {
      return "text-" + this.variant;
    }
  }
};
const _hoisted_1 = /* @__PURE__ */ createElementVNode("circle", {
  class: "opacity-25",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4"
}, null, -1);
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", {
  class: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
}, null, -1);
const _hoisted_3 = [
  _hoisted_1,
  _hoisted_2
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.containerClassName)
  }, [
    (openBlock(), createElementBlock("svg", {
      class: normalizeClass("animate-spin -ml-1 mb-1 h-5 w-5 " + $options.className),
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24"
    }, _hoisted_3, 2)),
    createTextVNode(toDisplayString($props.text), 1)
  ], 2);
}
const Spinner = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Spinner as default
};
