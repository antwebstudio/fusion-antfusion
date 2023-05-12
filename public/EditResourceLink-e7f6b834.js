import { resolveComponent, openBlock, createElementBlock, createVNode, withCtx, createTextVNode, toDisplayString } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const _sfc_main = {
  props: {
    value: {},
    record: {},
    resource: {}
  }
};
const _hoisted_1 = { class: "items-center" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_router_link, {
      to: { name: "antfusion.resource.edit", params: { resource: $props.record.resource.slug, id: $props.record.id } }
    }, {
      default: withCtx(() => [
        createTextVNode(toDisplayString($props.value), 1)
      ], void 0, true),
      _: 1
    }, 8, ["to"])
  ]);
}
const EditResourceLink = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  EditResourceLink as default
};
