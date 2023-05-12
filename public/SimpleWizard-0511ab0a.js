import "./Form-5165edca.js";
import { resolveComponent, openBlock, createElementBlock, Fragment, renderList, withDirectives, createBlock, resolveDynamicComponent, mergeProps, withCtx, createTextVNode, toDisplayString, vShow, createCommentVNode, createElementVNode, normalizeProps, guardReactiveProps, createVNode, withModifiers } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
import "./_commonjsHelpers-7a77ea84.js";
import "./lodash-7a9c3582.js";
const _sfc_main = {
  props: {
    validateUrl: {},
    syncDependantFieldUrl: {},
    path: {},
    steps: {},
    value: {},
    form: {},
    footer: {},
    validateOnLastStep: {
      default: true
    },
    nextButton: {
      default: {}
    },
    prevButton: {
      default: {}
    },
    submitButton: {
      default: {}
    }
  },
  watch: {
    fieldValues: {
      handler(value) {
        Object.keys(value).forEach((key) => {
          this.form[key] = value[key];
        });
        this.$emit("input", this.form);
      },
      deep: true
    }
  },
  data() {
    return {
      loading: false,
      componentsByHandle: {},
      currentStep: 0,
      fieldValues: this.form
    };
  },
  computed: {
    hasPreviousStep() {
      return this.currentStep > 0;
    },
    hasNextStep() {
      return this.currentStep < this.steps.length - 1;
    }
  },
  mounted() {
    _.each(this.steps, (step) => {
      _.each(step.children, (component, fieldKey) => {
        this.$set(this.componentsByHandle, component.id, component);
        if (component.dependsOn) {
          this.registerWatch(component, step.children, fieldKey);
        }
      });
    });
  },
  methods: {
    registerWatch(fieldToBeUpdated, fieldCollections, fieldKey) {
      fieldToBeUpdated.dependsOn.forEach((attribute) => {
        this.$watch("form." + attribute, (value, oldValue) => {
          this.syncDependantFields(fieldToBeUpdated, attribute, fieldCollections, fieldKey);
        }, { deep: true });
      });
    },
    syncDependantFields(fieldToBeUpdated, dependsOnAttribute, fieldCollections, fieldKey) {
      let params = {
        field: fieldToBeUpdated.handle,
        path: fieldToBeUpdated.path,
        attribute: dependsOnAttribute,
        form: this.form.data()
      };
      axios.patch(this.syncDependantFieldUrl, params).then((response) => {
        let field = response.data;
        console.log("before", fieldCollections[fieldKey]);
        this.$set(fieldCollections, fieldKey, field);
        console.log("after", fieldCollections[fieldKey]);
      });
    },
    validate() {
      let params = {
        step: this.currentStep,
        path: this.path,
        form: this.form.data()
      };
      return axios.post(this.validateUrl, params);
    },
    submit() {
      this.next();
    },
    next() {
      if (this.hasNextStep || this.validateOnLastStep) {
        this.loading = true;
        this.validate().then((response) => {
          this.loading = false;
          if (this.hasNextStep) {
            this.currentStep++;
          } else {
            this.$refs.submit.click();
          }
        }).catch((error) => {
          this.loading = false;
          console.log(error.response.data);
          this.form.errors.record(error.response.data);
        });
      } else {
        this.$refs.submit.click();
      }
    },
    prev() {
      if (this.hasPreviousStep) {
        this.currentStep--;
      }
    }
  }
};
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { ref: "submit" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ui_button = resolveComponent("ui-button");
  return openBlock(), createElementBlock("div", null, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($props.steps, (step, index) => {
      return openBlock(), createElementBlock("div", { key: index }, [
        index == $data.currentStep ? (openBlock(), createElementBlock("div", _hoisted_1, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(step.children, (field, index2) => {
            return openBlock(), createElementBlock("div", { key: index2 }, [
              !field.is_panel ? withDirectives((openBlock(), createBlock(resolveDynamicComponent(field.component), mergeProps({ key: 0 }, field, {
                modelValue: $data.fieldValues[field.field.handle],
                "onUpdate:modelValue": ($event) => $data.fieldValues[field.field.handle] = $event
              }, {
                errors: $props.form.errors,
                hasError: $props.form.errors.has(field.field.handle),
                errorMessage: $props.form.errors.get(field.field.handle)
              }), {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(field.text), 1)
                ], void 0, true),
                _: 2
              }, 1040, ["modelValue", "onUpdate:modelValue", "errors", "hasError", "errorMessage"])), [
                [vShow, !field.hide]
              ]) : withDirectives((openBlock(), createBlock(resolveDynamicComponent(field.component), mergeProps({ key: 1 }, field, {
                modelValue: $data.fieldValues,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.fieldValues = $event),
                form: $props.form,
                errors: $props.form.errors
              }), {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(field.text), 1)
                ], void 0, true),
                _: 2
              }, 1040, ["modelValue", "form", "errors"])), [
                [vShow, !field.hide]
              ])
            ]);
          }), 128))
        ])) : createCommentVNode("", true)
      ]);
    }), 128)),
    createElementVNode("div", normalizeProps(guardReactiveProps($props.footer)), [
      withDirectives(createVNode(_component_ui_button, mergeProps($props.prevButton, { disabled: $data.loading }, {
        onClick: withModifiers($options.prev, ["prevent"])
      }), {
        default: withCtx(() => [
          createTextVNode(toDisplayString($props.prevButton.text), 1)
        ], void 0, true),
        _: 1
      }, 16, ["disabled", "onClick"]), [
        [vShow, $options.hasPreviousStep]
      ]),
      withDirectives(createVNode(_component_ui_button, mergeProps($props.nextButton, { disabled: $data.loading }, {
        onClick: withModifiers($options.next, ["prevent"])
      }), {
        default: withCtx(() => [
          createTextVNode(toDisplayString($props.nextButton.text), 1)
        ], void 0, true),
        _: 1
      }, 16, ["disabled", "onClick"]), [
        [vShow, $options.hasNextStep]
      ]),
      withDirectives(createVNode(_component_ui_button, mergeProps($props.submitButton, { disabled: $data.loading }, {
        onClick: withModifiers($options.submit, ["prevent"])
      }), {
        default: withCtx(() => [
          createTextVNode(toDisplayString($props.submitButton.text), 1)
        ], void 0, true),
        _: 1
      }, 16, ["disabled", "onClick"]), [
        [vShow, !$options.hasNextStep]
      ]),
      withDirectives(createElementVNode("button", _hoisted_2, null, 512), [
        [vShow, false]
      ])
    ], 16)
  ]);
}
const SimpleWizard = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  SimpleWizard as default
};
