import { resolveComponent, openBlock, createElementBlock, createBlock, withModifiers, withCtx, createTextVNode, toDisplayString, createCommentVNode } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const _sfc_main = {
  props: {
    loading: {
      default: false
    },
    text: {
      default: "Print"
    }
  },
  methods: {
    print() {
      window.print();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ui_button = resolveComponent("ui-button");
  return openBlock(), createElementBlock("span", null, [
    !$props.loading ? (openBlock(), createBlock(_component_ui_button, {
      key: 0,
      onClick: withModifiers($options.print, ["prevent"])
    }, {
      default: withCtx(() => [
        createTextVNode(toDisplayString($props.text), 1)
      ], void 0, true),
      _: 1
    }, 8, ["onClick"])) : createCommentVNode("", true)
  ]);
}
const PrintButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  PrintButton as default
};
