import { openBlock, createElementBlock, Fragment, renderList, createBlock, resolveDynamicComponent, mergeProps } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const _sfc_main = {
  props: {
    components: {}
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($props.components, (component, index) => {
      return openBlock(), createBlock(resolveDynamicComponent(component.component), mergeProps(component, { key: index }), null, 16);
    }), 128))
  ]);
}
const PageAsComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  PageAsComponent as default
};
