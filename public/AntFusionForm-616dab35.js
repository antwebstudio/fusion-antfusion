import { F as Form } from "./Form-5165edca.js";
import { resolveComponent, openBlock, createElementBlock, createVNode, withCtx, createElementVNode, Fragment, renderList, createBlock, resolveDynamicComponent, mergeProps, createTextVNode, toDisplayString, createCommentVNode, normalizeClass, withDirectives, vShow } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
import "./_commonjsHelpers-7a77ea84.js";
import "./lodash-7a9c3582.js";
const DependantField = {
  methods: {
    registerComponentsDependency(children, form) {
      _.each(children, (component, fieldKey) => {
        if (component.dependsOn) {
          this.registerWatch(form, component, children, fieldKey);
        }
        if (component.children) {
          this.registerComponentsDependency(component.children, form);
        }
      });
    },
    registerWatch(form, fieldToBeUpdated, fieldCollections, fieldKey) {
      fieldToBeUpdated.dependsOn.forEach((attribute) => {
        this.$watch("form." + attribute, (value, oldValue) => {
          this.syncDependantFields(form, fieldToBeUpdated, attribute, fieldCollections, fieldKey);
        }, { deep: true });
      });
    },
    syncDependantFields(form, fieldToBeUpdated, dependsOnAttribute, fieldCollections, fieldKey) {
      let params = {
        field: fieldToBeUpdated.handle,
        path: fieldToBeUpdated.path,
        attribute: dependsOnAttribute,
        form: form.data()
      };
      axios.patch(this.syncDependantFieldUrl, params).then((response) => {
        let field = response.data;
        this.$set(fieldCollections, fieldKey, field);
      });
    }
  }
};
const _sfc_main = {
  mixins: [DependantField],
  props: {
    classes: {},
    debug: {
      default: false
    },
    name: {
      default: "_antfusion_form"
    },
    loading: {
      default: false
    },
    actions: {},
    children: {},
    fields: {},
    values: {
      default: {}
    },
    errors: {
      default: {}
    },
    syncDependantFieldUrl: {}
  },
  data() {
    return {
      // componentsByHandle: {},
      form: new Form()
    };
  },
  methods: {
    submitted() {
      this.$emit("submitted", this.form);
    },
    refreshed() {
      bus().$emit("refresh-form", this.form);
    }
  },
  mounted() {
    let form = {};
    _.each(this.fields, (field) => {
      form[field.handle] = this.values[field.handle] || field.default;
      console.log("field", field);
      console.log("set " + field.handle, this.values[field.handle], field.default);
      console.log("value", form[field.handle]);
    });
    this.form = new Form(form, true);
    this.form.errors.record({ errors: this.errors });
    this.registerComponentsDependency(this.children, this.form);
  },
  computed: {
    componentData() {
      return this.form;
    }
  }
};
const _hoisted_1 = { class: "print:hidden" };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = ["name", "value"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_portal = resolveComponent("portal");
  return openBlock(), createElementBlock("div", null, [
    createVNode(_component_portal, { to: "actions" }, {
      default: withCtx(() => [
        createElementVNode("span", _hoisted_1, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($props.actions, (action, index) => {
            return openBlock(), createBlock(resolveDynamicComponent(action.component), mergeProps(action, {
              onLoad: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("load")),
              onLoaded: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("loaded")),
              onSubmitted: $options.submitted,
              onRefreshed: $options.refreshed,
              loading: $props.loading,
              parent: $options.componentData,
              key: index
            }), {
              default: withCtx(() => [
                createTextVNode(toDisplayString(action.text), 1)
              ], void 0, true),
              _: 2
            }, 1040, ["onSubmitted", "onRefreshed", "loading", "parent"]);
          }), 128))
        ])
      ], void 0, true),
      _: 1
    }),
    $props.debug ? (openBlock(), createElementBlock("div", _hoisted_2, toDisplayString($data.form), 1)) : createCommentVNode("", true),
    createElementVNode("div", {
      class: normalizeClass($props.classes)
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.children, (field) => {
        return openBlock(), createElementBlock(Fragment, null, [
          !field.is_panel ? withDirectives((openBlock(), createBlock(resolveDynamicComponent(field.component), mergeProps({ key: 0 }, field, {
            key: field.id,
            onRefreshed: $options.refreshed,
            onLoad: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("load")),
            onLoaded: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("loaded")),
            loading: $props.loading,
            parent: $options.componentData,
            modelValue: $data.form[field.handle],
            "onUpdate:modelValue": ($event) => $data.form[field.handle] = $event
          }, {
            form: $data.form,
            "has-error": $data.form.errors.has(field.handle),
            "error-message": $data.form.errors.get(field.handle)
          }), {
            default: withCtx(() => [
              createTextVNode(toDisplayString(field.text), 1)
            ], void 0, true),
            _: 2
          }, 1040, ["onRefreshed", "loading", "parent", "modelValue", "onUpdate:modelValue", "form", "has-error", "error-message"])), [
            [vShow, !field.hide]
          ]) : withDirectives((openBlock(), createBlock(resolveDynamicComponent(field.component), mergeProps({ key: 1 }, field, {
            key: field.id
          }, {
            onRefreshed: $options.refreshed,
            form: $data.form,
            "sync-dependant-field-url": $props.syncDependantFieldUrl
          }), {
            default: withCtx(() => [
              createTextVNode(toDisplayString(field.text), 1)
            ], void 0, true),
            _: 2
          }, 1040, ["onRefreshed", "form", "sync-dependant-field-url"])), [
            [vShow, !field.hide]
          ])
        ], 64);
      }), 256))
    ], 2),
    createElementVNode("input", {
      type: "hidden",
      name: $props.name,
      value: JSON.stringify(this.form.data())
    }, null, 8, _hoisted_3)
  ]);
}
const AntFusionForm = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  AntFusionForm as default
};
