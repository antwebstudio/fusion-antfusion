import { openBlock, createElementBlock, normalizeClass, createElementVNode, toDisplayString, createCommentVNode, renderSlot } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const _sfc_main = {
  props: {
    label: {}
  },
  name: "panel-body"
};
const _hoisted_1 = {
  key: 0,
  class: "section-card__header card-col__header"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["card__body", { "card-col": $props.label }])
  }, [
    $props.label ? (openBlock(), createElementBlock("div", _hoisted_1, [
      createElementVNode("h2", null, toDisplayString($props.label), 1)
    ])) : createCommentVNode("", true),
    createElementVNode("div", {
      class: normalizeClass({ "section-card__body card-col__body": $props.label })
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 2)
  ], 2);
}
const PanelBody = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  PanelBody as default
};
