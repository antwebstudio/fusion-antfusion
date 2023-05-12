import { openBlock, createBlock, resolveDynamicComponent, mergeProps, withCtx, createElementBlock, toDisplayString, createCommentVNode, createTextVNode, Fragment, renderList, withDirectives, toHandlers, vShow } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const _sfc_main = {
  props: {
    debug: {
      default: false
    },
    form: {
      default: {}
    },
    text: {},
    props: {},
    as: {},
    record: {},
    children: {}
  }
};
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = { key: 0 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent($props.as), mergeProps($props.props, {
    form: $props.form,
    errors: $props.form.errors
  }), {
    default: withCtx(() => [
      $props.debug ? (openBlock(), createElementBlock("span", _hoisted_1, toDisplayString($props.as), 1)) : createCommentVNode("", true),
      createTextVNode(" " + toDisplayString($props.text) + " ", 1),
      $props.children ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList($props.children, (childComponent, index) => {
        return withDirectives((openBlock(), createBlock(resolveDynamicComponent(childComponent.component), mergeProps(childComponent, {
          modelValue: $props.form[childComponent.handle],
          "onUpdate:modelValue": ($event) => $props.form[childComponent.handle] = $event,
          form: $props.form,
          errors: $props.form.errors,
          record: $props.record
        }, toHandlers(_ctx.$listeners), { key: index }), {
          default: withCtx(() => [
            $props.debug ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(childComponent.component), 1)) : createCommentVNode("", true),
            createTextVNode(" " + toDisplayString(childComponent.text) + " ", 1),
            childComponent.children ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(childComponent.children, (grandchild, index2) => {
              return withDirectives((openBlock(), createBlock(resolveDynamicComponent(grandchild.component), mergeProps(grandchild, {
                modelValue: $props.form[grandchild.handle],
                "onUpdate:modelValue": ($event) => $props.form[grandchild.handle] = $event,
                form: $props.form,
                errors: $props.form.errors,
                record: $props.record
              }, toHandlers(_ctx.$listeners), { key: index2 }), {
                default: withCtx(() => [
                  $props.debug ? (openBlock(), createElementBlock("span", _hoisted_3, toDisplayString(grandchild.component), 1)) : createCommentVNode("", true),
                  createTextVNode(" " + toDisplayString(grandchild.text), 1)
                ], void 0, true),
                _: 2
              }, 1040, ["modelValue", "onUpdate:modelValue", "form", "errors", "record"])), [
                [vShow, !grandchild.hide]
              ]);
            }), 128)) : createCommentVNode("", true)
          ], void 0, true),
          _: 2
        }, 1040, ["modelValue", "onUpdate:modelValue", "form", "errors", "record"])), [
          [vShow, !childComponent.hide]
        ]);
      }), 128)) : createCommentVNode("", true)
    ], void 0, true),
    _: 1
  }, 16, ["form", "errors"]);
}
const NestedComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  NestedComponent as default
};
