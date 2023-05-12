import { resolveComponent, openBlock, createElementBlock, createVNode, mergeProps, withCtx, createTextVNode, toDisplayString } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const _sfc_main = {
  props: {
    text: {},
    parent: {},
    variant: {}
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ui_button = resolveComponent("ui-button");
  return openBlock(), createElementBlock("span", null, [
    createVNode(_component_ui_button, mergeProps(_ctx.$props, {
      onClick: $props.parent.submit
    }), {
      default: withCtx(() => [
        createTextVNode(toDisplayString($props.text), 1)
      ], void 0, true),
      _: 1
    }, 16, ["onClick"])
  ]);
}
const SubmitButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  SubmitButton as default
};
