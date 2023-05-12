import { resolveComponent, openBlock, createElementBlock, createVNode } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const _sfc_main = {
  props: {
    value: {}
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ui_datetime = resolveComponent("ui-datetime");
  return openBlock(), createElementBlock("div", null, [
    createVNode(_component_ui_datetime, { timestamp: $props.value }, null, 8, ["timestamp"])
  ]);
}
const ResourceDateTime = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ResourceDateTime as default
};
