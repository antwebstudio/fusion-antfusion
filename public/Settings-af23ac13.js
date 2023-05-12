import { resolveComponent, openBlock, createElementBlock, createVNode } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const fieldtype = {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    settings: {
      get() {
        return this.value.settings || {};
      },
      set(value) {
        this.$set(this.value.settings, value);
      }
    },
    errors() {
      return this.value.errors || {};
    }
  }
};
const _sfc_main = {
  name: "taxonomy-fieldtype-settings",
  mixins: [fieldtype],
  data() {
    return {
      taxonomies: []
    };
  },
  computed: {
    options() {
      return _.map(this.taxonomies, (taxonomy) => {
        return {
          label: taxonomy.name,
          value: taxonomy.id
        };
      });
    }
  },
  created() {
    axios.get("/api/taxonomies").then((response) => this.taxonomies = response.data.data);
  }
};
const _hoisted_1 = { class: "row" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ui_select_group = resolveComponent("ui-select-group");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_ui_select_group, {
      class: "col w-full sm:w-1/2",
      name: "taxonomy",
      label: "Taxonomy",
      help: "The taxonomy from which to show terms.",
      autocomplete: "off",
      options: $options.options,
      "has-error": _ctx.errors.has("settings.taxonomy"),
      "error-message": _ctx.errors.get("settings.taxonomy"),
      modelValue: _ctx.settings.taxonomy,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.settings.taxonomy = $event)
    }, null, 8, ["options", "has-error", "error-message", "modelValue"])
  ]);
}
const Settings = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Settings as default
};
