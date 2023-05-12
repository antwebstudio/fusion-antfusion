import { openBlock, createElementBlock } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const _sfc_main = {
  props: {
    content: {},
    children: {}
  },
  watch: {},
  data() {
    return {};
  }
};
const _hoisted_1 = ["innerHTML"];
const _hoisted_2 = { key: 1 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return $props.content ? (openBlock(), createElementBlock("tr", {
    key: 0,
    innerHTML: $props.content
  }, null, 8, _hoisted_1)) : (openBlock(), createElementBlock("tr", _hoisted_2));
}
const TableHeaderRow = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  TableHeaderRow as default
};
