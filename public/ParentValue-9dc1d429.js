import { _ } from "./lodash-71c3a29b.js";
import { resolveComponent, openBlock, createElementBlock, createVNode, withCtx, createTextVNode, toDisplayString, createElementVNode } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
import "./_commonjsHelpers-7a77ea84.js";
const _sfc_main = {
  props: {
    name: {},
    parent: {},
    attribute: {},
    label: {}
  },
  computed: {
    value() {
      if (this.parent && this.attribute) {
        let value = _.get(this.parent, this.attribute);
        this.$emit("input", value);
        return value;
      }
    }
  }
};
const _hoisted_1 = { class: "form-group" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ui_label = resolveComponent("ui-label");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_ui_label, null, {
      default: withCtx(() => [
        createTextVNode(toDisplayString($props.name), 1)
      ], void 0, true),
      _: 1
    }),
    createElementVNode("div", null, toDisplayString($options.value), 1)
  ]);
}
const ParentValue = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ParentValue as default
};
