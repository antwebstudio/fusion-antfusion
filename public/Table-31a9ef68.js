import { openBlock, createElementBlock, normalizeProps, guardReactiveProps, renderSlot } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const _sfc_main = {
  props: {
    children: {}
  },
  watch: {},
  data() {
    return {};
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("table", normalizeProps(guardReactiveProps(_ctx.$props)), [
    renderSlot(_ctx.$slots, "default")
  ], 16);
}
const Table = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Table as default
};
