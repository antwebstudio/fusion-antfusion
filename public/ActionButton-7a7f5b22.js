import { F as Form } from "./Form-5165edca.js";
import { _ } from "./lodash-71c3a29b.js";
import { resolveComponent, resolveDirective, openBlock, createElementBlock, createBlock, mergeProps, withCtx, createTextVNode, toDisplayString, withModifiers, createVNode, withDirectives, vShow, Fragment, renderList, resolveDynamicComponent, createCommentVNode } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
import "./_commonjsHelpers-7a77ea84.js";
import "./lodash-7a9c3582.js";
const _sfc_main = {
  emits: [],
  props: {
    id: {},
    variant: {},
    route: {},
    parent: {},
    asDropdown: {
      default: false
    },
    confirmButtonText: {
      default: "OK"
    },
    resetWhenClose: {
      default: true
    },
    url: {
      default: null
    },
    formMethod: {
      default: "post"
    },
    text: {
      default: null
    },
    title: {
      default: null
    },
    fields: {},
    record: {
      default: {}
    },
    load_record: {
      default: {}
    }
  },
  data() {
    return {
      loading: false,
      form: null
    };
  },
  computed: {
    modalName() {
      return "action-" + this._uid;
    },
    modalTitle() {
      if (this.confirmTitle) {
        return this.confirmTitle;
      }
      return this.title;
    },
    componentData() {
      return {
        parent: this.parent
      };
    }
  },
  mounted() {
    this.initForm();
  },
  methods: {
    initForm() {
      let fields = {};
      this.fields.forEach((field) => {
        if (this.load_record[field.handle]) {
          fields[field.handle] = _.get(this.record, this.load_record[field.handle]);
        } else {
          fields[field.handle] = null;
        }
      });
      this.form = new Form(fields);
    },
    openModalForm() {
      this.openModal(this.modalName);
    },
    submit() {
      this.loading = true;
      let params = this.form.formdata();
      params.append("route", this.route);
      if (this.record.id) {
        params.append("resourceIds[]", this.record.id);
      }
      this.form.submit("post", this.url, params).then((response) => {
        this.loading = false;
        this.$emit("submitted");
        this.closeModal(this.modalName);
        if (response.message) {
          toast(response.message, "success");
        }
        if (response.redirect) {
          if (response.target) {
            window.open(response.redirect, response.target);
          } else {
            this.$router.push(response.redirect);
          }
        }
      }).catch((error) => {
        this.loading = false;
        if (error.errors) {
          this.errors = error.errors;
          var message = Object.keys(error.errors).map((key) => {
            return error.errors[key].join(" ");
          }).join(" ");
          toast(message, "failed");
        } else {
          toast(error.message, "failed");
        }
      });
    },
    closeModal(name, value) {
      this.$bus.$emit("toggle-modal-" + name, { value });
    },
    openModal(name, value) {
      this.$bus.$emit("toggle-modal-" + name, { value });
    },
    modalChanged(isActive) {
      if (isActive && this.resetWhenClose) {
        this.initForm();
      }
    },
    toggle() {
      if (this.$parent && this.$parent.toggle) {
        this.$parent.toggle();
      }
    }
  }
};
const _hoisted_1 = { key: 0 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ui_dropdown_link = resolveComponent("ui-dropdown-link");
  const _component_ui_button = resolveComponent("ui-button");
  const _component_spinner = resolveComponent("spinner");
  const _component_ui_modal = resolveComponent("ui-modal");
  const _component_portal = resolveComponent("portal");
  const _directive_modal = resolveDirective("modal");
  return openBlock(), createElementBlock("div", null, [
    $props.asDropdown ? (openBlock(), createBlock(_component_ui_dropdown_link, mergeProps({ key: 0 }, _ctx.$props, {
      onClick: _cache[0] || (_cache[0] = ($event) => $options.openModalForm())
    }), {
      default: withCtx(() => [
        createTextVNode(toDisplayString($props.text), 1)
      ], void 0, true),
      _: 1
    }, 16)) : (openBlock(), createBlock(_component_ui_button, {
      key: 1,
      variant: $props.variant,
      onClick: _cache[1] || (_cache[1] = withModifiers(($event) => $options.openModalForm(), ["prevent"]))
    }, {
      default: withCtx(() => [
        createTextVNode(toDisplayString($props.text), 1)
      ], void 0, true),
      _: 1
    }, 8, ["variant"])),
    createVNode(_component_portal, { to: "modals" }, {
      default: withCtx(() => [
        (openBlock(), createBlock(_component_ui_modal, {
          name: $options.modalName,
          title: $options.modalTitle,
          key: $options.modalName,
          onInput: $options.modalChanged
        }, {
          footer: withCtx((entry) => [
            createVNode(_component_ui_button, {
              disabled: $data.loading,
              onClick: $options.submit,
              class: "ml-3 button--primary"
            }, {
              default: withCtx(() => [
                withDirectives(createVNode(_component_spinner, null, null, 512), [
                  [vShow, $data.loading]
                ]),
                createTextVNode(" " + toDisplayString($props.confirmButtonText), 1)
              ], void 0, true),
              _: 1
            }, 8, ["disabled", "onClick"]),
            withDirectives((openBlock(), createBlock(_component_ui_button, null, {
              default: withCtx(() => [
                createTextVNode("Cancel")
              ], void 0, true),
              _: 1
            })), [
              [_directive_modal, void 0, $options.modalName]
            ])
          ]),
          default: withCtx(() => [
            $data.form ? (openBlock(), createElementBlock("span", _hoisted_1, [
              (openBlock(true), createElementBlock(Fragment, null, renderList($props.fields, (field, index) => {
                return openBlock(), createBlock(resolveDynamicComponent(field.component), mergeProps(field, {
                  modelValue: $data.form[field.handle],
                  "onUpdate:modelValue": ($event) => $data.form[field.handle] = $event,
                  key: field.handle
                }, {
                  parent: $options.componentData,
                  record: $props.record,
                  "has-error": $data.form.errors.has(field.handle),
                  "error-message": $data.form.errors.get(field.handle),
                  errors: $data.form.errors
                }), null, 16, ["modelValue", "onUpdate:modelValue", "parent", "record", "has-error", "error-message", "errors"]);
              }), 128))
            ])) : createCommentVNode("", true)
          ], void 0, true),
          _: 1
        }, 8, ["name", "title", "onInput"]))
      ], void 0, true),
      _: 1
    })
  ]);
}
const ActionButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ActionButton as default
};
