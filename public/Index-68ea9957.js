import { resolveComponent, openBlock, createElementBlock, createVNode, withCtx, createTextVNode, toDisplayString, createElementVNode, Fragment, renderList, createBlock, resolveDynamicComponent, mergeProps, createCommentVNode } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const _sfc_main = {
  data() {
    return {
      meta: null,
      resource: null,
      actions: null
    };
  },
  computed: {
    dropdownActions() {
      return this.actions.filter((action) => action.dropdown);
    }
  },
  beforeRouteUpdate(to, from, next) {
    axios.get("/api/antfusion/resource/" + to.params.resource).then((response) => {
      this.meta = response.data;
      this.resource = response.data.resource;
      this.actions = response.data.actions;
      console.log(response.data);
      next();
    }).catch((error) => {
      if (error.response.data.errors && error.response.data.errors["*"]) {
        let errors = error.response.data.errors["*"];
        toast(errors.join(" "), "error");
      } else {
        toast(error.response.data.message, "error");
      }
    });
  },
  beforeRouteEnter(to, from, next) {
    axios.get("/api/antfusion/resource/" + to.params.resource).then((response) => {
      next((vm) => {
        vm.meta = response.data;
        vm.resource = response.data.resource;
        vm.actions = response.data.actions;
        console.log(response.data);
      });
    }).catch((error) => {
      if (error.response.data.errors && error.response.data.errors["*"]) {
        let errors = error.response.data.errors["*"];
        toast(errors.join(" "), "error");
      } else {
        toast(error.response.data.message, "error");
      }
    });
  }
};
const _hoisted_1 = { key: 0 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_page_title = resolveComponent("page-title");
  const _component_portal = resolveComponent("portal");
  const _component_ui_actions = resolveComponent("ui-actions");
  return openBlock(), createElementBlock("div", null, [
    createVNode(_component_portal, { to: "title" }, {
      default: withCtx(() => [
        createVNode(_component_page_title, {
          icon: $data.resource.icon
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString($data.meta.title), 1)
          ], void 0, true),
          _: 1
        }, 8, ["icon"])
      ], void 0, true),
      _: 1
    }),
    createVNode(_component_portal, { to: "actions" }, {
      default: withCtx(() => [
        createElementVNode("div", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($data.actions, (action, index) => {
            return openBlock(), createElementBlock("span", { key: index }, [
              !action.dropdown ? (openBlock(), createBlock(resolveDynamicComponent(action.component), mergeProps({ key: 0 }, action, { onSubmitted: _ctx.load }), {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(action.text), 1)
                ], void 0, true),
                _: 2
              }, 1040, ["onSubmitted"])) : createCommentVNode("", true)
            ]);
          }), 128)),
          $options.dropdownActions && $options.dropdownActions.length ? (openBlock(), createBlock(_component_ui_actions, {
            id: "entry_actions",
            key: "entry_actions"
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList($data.actions, (action, index) => {
                return openBlock(), createElementBlock("div", { key: index }, [
                  action.dropdown ? (openBlock(), createBlock(resolveDynamicComponent(action.component), mergeProps({ key: 0 }, action, { onSubmitted: _ctx.load }), {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(action.text), 1)
                    ], void 0, true),
                    _: 2
                  }, 1040, ["onSubmitted"])) : createCommentVNode("", true)
                ]);
              }), 128))
            ], void 0, true),
            _: 1
          })) : createCommentVNode("", true)
        ])
      ], void 0, true),
      _: 1
    }),
    $data.meta && $data.meta.components ? (openBlock(), createElementBlock("div", _hoisted_1, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($data.meta.components, (component, index) => {
        return openBlock(), createBlock(resolveDynamicComponent(component.is), mergeProps(component, {
          class: "form__group",
          key: component.id
        }), null, 16);
      }), 128))
    ])) : createCommentVNode("", true)
  ]);
}
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Index as default
};
