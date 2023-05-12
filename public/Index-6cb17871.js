import { resolveComponent, openBlock, createElementBlock, createVNode, withCtx, createTextVNode, toDisplayString, createElementVNode, Fragment, renderList, createBlock, resolveDynamicComponent, mergeProps, createCommentVNode } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const _sfc_main = {
  data() {
    return {
      loadingCount: 0,
      meta: null,
      page: null,
      resource: null,
      actions: null
    };
  },
  methods: {
    onLoading() {
      this.loadingCount++;
    },
    onLoaded() {
      this.loadingCount--;
    }
  },
  computed: {
    loading() {
      return this.loadingCount > 0;
    }
  },
  beforeRouteUpdate(to, from, next) {
    axios.get("/api/antfusion/page/" + to.params.page).then((response) => {
      this.meta = response.data;
      this.page = response.data.page;
      this.actions = response.data.actions;
      console.log(response.data);
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
    axios.get("/api/antfusion/page/" + to.params.page).then((response) => {
      next((vm) => {
        vm.meta = response.data;
        vm.page = response.data.page;
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
const _hoisted_1 = { class: "print:hidden" };
const _hoisted_2 = { key: 0 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_page_title = resolveComponent("page-title");
  const _component_portal = resolveComponent("portal");
  return openBlock(), createElementBlock("div", null, [
    createVNode(_component_portal, { to: "title" }, {
      default: withCtx(() => [
        createVNode(_component_page_title, {
          icon: $data.page.icon || "layer-group"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString($data.page.title), 1)
          ], void 0, true),
          _: 1
        }, 8, ["icon"])
      ], void 0, true),
      _: 1
    }),
    createVNode(_component_portal, { to: "actions" }, {
      default: withCtx(() => [
        createElementVNode("span", _hoisted_1, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($data.actions, (action, index) => {
            return openBlock(), createBlock(resolveDynamicComponent(action.component), mergeProps(action, {
              loading: $options.loading,
              onLoad: $options.onLoading,
              onLoaded: $options.onLoaded,
              onSubmitted: _ctx.load,
              key: index
            }), {
              default: withCtx(() => [
                createTextVNode(toDisplayString(action.text), 1)
              ], void 0, true),
              _: 2
            }, 1040, ["loading", "onLoad", "onLoaded", "onSubmitted"]);
          }), 128))
        ])
      ], void 0, true),
      _: 1
    }),
    $data.meta && $data.meta.components ? (openBlock(), createElementBlock("div", _hoisted_2, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($data.meta.components, (component, index) => {
        return openBlock(), createBlock(resolveDynamicComponent(component.component), mergeProps(component, {
          loading: $options.loading,
          onLoad: $options.onLoading,
          onLoaded: $options.onLoaded,
          key: index
        }), null, 16, ["loading", "onLoad", "onLoaded"]);
      }), 128))
    ])) : createCommentVNode("", true)
  ]);
}
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Index as default
};
