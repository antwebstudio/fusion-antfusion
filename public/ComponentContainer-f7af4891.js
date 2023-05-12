import { openBlock, createElementBlock, normalizeProps, guardReactiveProps, Fragment, renderList, createBlock, resolveDynamicComponent, mergeProps } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const _sfc_main = {
  props: {
    components: {}
  },
  data() {
    return {
      loading: false
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
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", normalizeProps(guardReactiveProps(_ctx.$props)), [
    (openBlock(true), createElementBlock(Fragment, null, renderList($props.components, (component, index) => {
      return openBlock(), createBlock(resolveDynamicComponent(component.component), mergeProps(component, {
        loading: $options.loading,
        onLoad: $options.onLoading,
        onLoaded: $options.onLoaded,
        key: index
      }), null, 16, ["loading", "onLoad", "onLoaded"]);
    }), 128))
  ], 16);
}
const ComponentContainer = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ComponentContainer as default
};
