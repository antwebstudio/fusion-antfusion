import { resolveComponent, openBlock, createElementBlock, createElementVNode, createBlock, createCommentVNode, toDisplayString } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const MetricItem_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  props: {
    icon: {},
    label: {},
    value: {},
    url: {},
    format: {
      default: false
    },
    decimalDigits: {
      default: 0
    }
  },
  computed: {
    valueString() {
      if (this.value && this.format) {
        return Number(this.value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      return this.value;
    }
  }
};
const _hoisted_1 = { class: "col px-1 w-1/2 sm:w-1/4" };
const _hoisted_2 = { class: "card" };
const _hoisted_3 = { class: "card__body" };
const _hoisted_4 = { class: "font-semibold uppercase" };
const _hoisted_5 = { class: "text-2xl font-bold" };
const _hoisted_6 = {
  key: 1,
  class: "text-right"
};
const _hoisted_7 = ["href"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_fa_icon = resolveComponent("fa-icon");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("div", _hoisted_2, [
      createElementVNode("div", _hoisted_3, [
        $props.icon ? (openBlock(), createBlock(_component_fa_icon, {
          key: 0,
          icon: ["fas", $props.icon],
          "fixed-width": "",
          size: "2x"
        }, null, 8, ["icon"])) : createCommentVNode("", true),
        createElementVNode("div", _hoisted_4, toDisplayString($props.label), 1),
        createElementVNode("div", _hoisted_5, toDisplayString($options.valueString), 1),
        $props.url ? (openBlock(), createElementBlock("div", _hoisted_6, [
          createElementVNode("a", {
            href: $props.url,
            class: ""
          }, "More", 8, _hoisted_7)
        ])) : createCommentVNode("", true)
      ])
    ])
  ]);
}
const MetricItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  MetricItem as default
};
