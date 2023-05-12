import { resolveComponent, openBlock, createElementBlock, createVNode, mergeProps, withModifiers, withCtx, createTextVNode, toDisplayString, createBlock, createElementVNode, createCommentVNode } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const _sfc_main = {
  emits: [],
  props: {
    cssClass: {},
    url: {},
    confirmButtonText: {
      default: "Confirm"
    },
    cancelButtonLabel: {
      default: "Cancel"
    },
    title: {},
    record: {},
    resourceId: {},
    resourceHandle: {},
    actionHandle: {},
    confirmTitle: {},
    confirmText: {},
    to: {},
    text: {}
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    needConfirmation() {
      return this.confirmText;
    },
    modalTitle() {
      if (this.confirmTitle) {
        return this.confirmTitle;
      }
      return this.title;
    },
    modalName() {
      return "action-link-confirmation-" + this._uid;
    }
  },
  methods: {
    toggle() {
      if (this.$parent && this.$parent.toggle) {
        this.$parent.toggle();
      }
    },
    performAction() {
      console.log("need ", this.needConfirmation);
      if (this.needConfirmation) {
        this.askConfirmation();
      } else {
        this.confirm();
      }
    },
    askConfirmation() {
      this.openModal(this.modalName);
    },
    confirm() {
      console.log("confirm", this);
      this.loading = true;
      axios.post(this.url, { resourceIds: [this.record.id] }).then((response) => {
        console.log("action button", response);
        if (response.data.redirect) {
          if (response.data.target) {
            window.open(response.data.redirect, response.data.target);
          } else {
            this.$router.push(response.data.redirect);
          }
        } else {
          this.loading = false;
          toast(response.data.message, "success");
          this.closeModal(this.modalName);
          this.$emit("updated");
        }
      }).catch((error) => {
        this.loading = false;
        toast(error.response.data.message, "error");
      });
    },
    closeModal(name, value) {
      this.$bus.$emit("toggle-modal-" + name, { value });
    },
    openModal(name, value) {
      this.$bus.$emit("toggle-modal-" + name, { value });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ui_dropdown_link = resolveComponent("ui-dropdown-link");
  const _component_ui_button = resolveComponent("ui-button");
  const _component_ui_modal = resolveComponent("ui-modal");
  const _component_portal = resolveComponent("portal");
  return openBlock(), createElementBlock("div", null, [
    createVNode(_component_ui_dropdown_link, mergeProps(_ctx.$props, {
      onClick: withModifiers($options.performAction, ["prevent"])
    }, { class: $props.cssClass }), {
      default: withCtx(() => [
        createTextVNode(toDisplayString($props.text), 1)
      ], void 0, true),
      _: 1
    }, 16, ["onClick", "class"]),
    $options.needConfirmation ? (openBlock(), createBlock(_component_portal, {
      key: 0,
      to: "modals"
    }, {
      default: withCtx(() => [
        (openBlock(), createBlock(_component_ui_modal, {
          name: $options.modalName,
          title: $options.modalTitle,
          key: $options.modalName
        }, {
          footer: withCtx((entry) => [
            createVNode(_component_ui_button, {
              disabled: $data.loading,
              onClick: _cache[0] || (_cache[0] = ($event) => $options.confirm()),
              variant: "danger",
              class: "ml-3"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString($props.confirmButtonText), 1)
              ], void 0, true),
              _: 1
            }, 8, ["disabled"]),
            createVNode(_component_ui_button, {
              disabled: $data.loading,
              onClick: _cache[1] || (_cache[1] = ($event) => $options.closeModal($options.modalName)),
              variant: "secondary"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString($props.cancelButtonLabel), 1)
              ], void 0, true),
              _: 1
            }, 8, ["disabled"])
          ]),
          default: withCtx(() => [
            createElementVNode("p", null, toDisplayString($props.confirmText), 1)
          ], void 0, true),
          _: 1
        }, 8, ["name", "title"]))
      ], void 0, true),
      _: 1
    })) : createCommentVNode("", true)
  ]);
}
const ActionDropDownLink = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ActionDropDownLink as default
};
