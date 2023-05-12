import { resolveComponent, openBlock, createElementBlock, createVNode } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const _sfc_main = {
  props: {
    value: {}
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ui_date = resolveComponent("ui-date");
  return openBlock(), createElementBlock("div", null, [
    createVNode(_component_ui_date, { timestamp: $props.value }, null, 8, ["timestamp"])
  ]);
}
const ResourceDate = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ResourceDate as default
};
