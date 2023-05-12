import { resolveComponent, openBlock, createBlock, withCtx, createElementBlock, Fragment, renderList } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const _sfc_main = {
  props: {
    value: {},
    options: {}
  },
  methods: {
    activated(value) {
      this.$emit("input", value);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ui_tab = resolveComponent("ui-tab");
  const _component_ui_tabs = resolveComponent("ui-tabs");
  return openBlock(), createBlock(_component_ui_tabs, null, {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.options, (optionValue, name) => {
        return openBlock(), createBlock(_component_ui_tab, {
          key: optionValue,
          name,
          onActivated: ($event) => $options.activated(optionValue)
        }, null, 8, ["name", "onActivated"]);
      }), 128))
    ], void 0, true),
    _: 1
  });
}
const FilterTabs = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  FilterTabs as default
};
