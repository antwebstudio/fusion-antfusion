import { F as Form } from "./Form-5165edca.js";
import { resolveComponent, openBlock, createElementBlock, createElementVNode, Fragment, renderList, createBlock, resolveDynamicComponent, mergeProps, createCommentVNode, createVNode, withCtx, withDirectives, toDisplayString, vModelSelect, withModifiers, createTextVNode } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
import "./_commonjsHelpers-7a77ea84.js";
import "./lodash-7a9c3582.js";
const _sfc_main = {
  emits: [],
  props: {
    id: {
      required: true,
      type: String
    },
    bulk: {
      type: Boolean,
      default: true
    },
    metrics: {},
    filters: {},
    refresh: {
      type: [Number, Boolean],
      default: false
    },
    noRecords: {
      type: String,
      default: "No records to display"
    },
    endpoint: {
      required: true,
      type: String
    },
    sortBy: {
      type: String,
      default: "id"
    },
    saveSortBy: {
      type: Boolean,
      default: true
    },
    perPage: {
      type: Number,
      default: 10
    },
    sortIn: {
      type: String,
      default: "asc"
    },
    noSearch: {
      type: Boolean,
      default: false
    },
    primaryKey: {
      required: false,
      type: String,
      default: "id"
    },
    showPageStatus: {
      type: Boolean,
      default: false
    },
    showPageNumbers: {
      type: Boolean,
      default: false
    },
    showPageNav: {
      type: Boolean,
      default: false
    },
    showPageEnds: {
      type: Boolean,
      default: false
    },
    hidePageSelect: {
      type: Boolean,
      default: false
    },
    pageSelectLabel: {
      type: String,
      default: "Page"
    },
    reorder_route: {
      type: String,
      default: ""
    },
    link_name: {
      type: String,
      default: ""
    },
    link_param: {
      type: String,
      default: ""
    },
    show_status: {
      type: Boolean,
      default: false
    },
    show_order: {
      type: Boolean,
      default: true
    },
    actions: {}
  },
  watch: {
    showBulkActionConfirmation(value) {
      if (value == false) {
        this.action = null;
      }
    }
  },
  data() {
    return {
      filterValues: {},
      metricValues: {},
      form: null,
      action: null,
      fields: [],
      working: false,
      showBulkActionConfirmation: false
    };
  },
  computed: {},
  mounted() {
    bus().$on("refresh", () => {
      this.reload();
    });
  },
  methods: {
    updateMetrics(metricValues) {
      this.metricValues = metricValues;
    },
    cancelBulkAction(dataTable) {
      this.action = null;
      this.showBulkActionConfirmation = false;
    },
    confirmBulkAction(dataTable) {
      let action = dataTable.allowedBulkActions[this.action];
      let vm = this;
      let formData = this.form.formdata();
      dataTable.selected.forEach((selected) => {
        formData.append("records[]", selected);
      });
      this.working = true;
      this.form.submit("post", `${action.route}`, formData).then((response) => {
        toast("Bulk action completed successfully.", "success");
        dataTable.selected = [];
        vm.reload();
        vm.showBulkActionConfirmation = false;
        vm.action = null;
        vm.working = false;
      }).catch((error) => {
        vm.working = false;
        if (error.errors) {
          var message = Object.keys(error.errors).map((key) => {
            return error.errors[key].join(" ");
          }).join(" ");
          toast(message, "failed");
        } else {
          toast(error.message, "failed");
        }
      });
    },
    initForm(dataTable) {
      let action = dataTable.allowedBulkActions[this.action];
      if (action.params) {
        let fields = {};
        action.params.fields.forEach((field) => {
          fields[field.handle] = null;
        });
        this.form = new Form(fields);
      }
    },
    reload() {
      bus().$emit("refresh-datatable-" + this.id);
    }
  }
};
const _hoisted_1 = { class: "flex" };
const _hoisted_2 = { class: "ml-auto" };
const _hoisted_3 = ["onChange"];
const _hoisted_4 = /* @__PURE__ */ createElementVNode("option", {
  selected: "",
  disabled: "",
  value: null
}, "Bulk Actions", -1);
const _hoisted_5 = ["value"];
const _hoisted_6 = { key: 0 };
const _hoisted_7 = { key: 0 };
const _hoisted_8 = { key: 1 };
const _hoisted_9 = {
  key: 0,
  class: "flex"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ui_button = resolveComponent("ui-button");
  const _component_ui_modal = resolveComponent("ui-modal");
  const _component_portal = resolveComponent("portal");
  const _component_antfusion_datatable = resolveComponent("antfusion-datatable");
  return openBlock(), createElementBlock("div", null, [
    createElementVNode("div", _hoisted_1, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.metrics, (card) => {
        return openBlock(), createBlock(resolveDynamicComponent(card.component), mergeProps(card, {
          key: card.handle
        }, {
          modelValue: $data.metricValues[card.handle],
          "onUpdate:modelValue": ($event) => $data.metricValues[card.handle] = $event
        }), null, 16, ["modelValue", "onUpdate:modelValue"]);
      }), 128))
    ]),
    (openBlock(true), createElementBlock(Fragment, null, renderList($props.filters, (filter) => {
      return openBlock(), createElementBlock("span", {
        key: filter.handle
      }, [
        !filter.builtin ? (openBlock(), createBlock(resolveDynamicComponent(filter.component), mergeProps({ key: 0 }, filter, {
          modelValue: $data.filterValues[filter.handle],
          "onUpdate:modelValue": ($event) => $data.filterValues[filter.handle] = $event
        }), null, 16, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true)
      ]);
    }), 128)),
    createVNode(_component_antfusion_datatable, mergeProps(_ctx.$props, {
      filters: $data.filterValues,
      onUpdateMetrics: $options.updateMetrics
    }), {
      bulkActions: withCtx(({ parent }) => [
        createElementVNode("div", _hoisted_2, [
          withDirectives(createElementVNode("select", {
            name: "bulk-actions",
            id: "bulk-actions",
            class: "field-select field-select--sm field-select--bordered",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.action = $event),
            onChange: ($event) => {
              $options.initForm(parent);
              $data.showBulkActionConfirmation = true;
            }
          }, [
            _hoisted_4,
            (openBlock(true), createElementBlock(Fragment, null, renderList(parent.allowedBulkActions, (action, index) => {
              return openBlock(), createElementBlock("option", {
                key: action.name,
                value: index
              }, toDisplayString(action.name), 9, _hoisted_5);
            }), 128))
          ], 40, _hoisted_3), [
            [vModelSelect, $data.action]
          ])
        ]),
        createVNode(_component_portal, { to: "modals" }, {
          default: withCtx(() => [
            $data.action !== null ? (openBlock(), createBlock(_component_ui_modal, {
              key: 0,
              name: "confirm-bulk-action",
              title: "Confirm Bulk " + parent.allowedBulkActions[$data.action].name,
              modelValue: $data.showBulkActionConfirmation,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.showBulkActionConfirmation = $event)
            }, {
              footer: withCtx(() => [
                createVNode(_component_ui_button, {
                  onClick: withModifiers(($event) => $options.confirmBulkAction(parent), ["prevent"]),
                  loading: $data.working,
                  class: "ml-3",
                  variant: "primary"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Confirm")
                  ], void 0, true),
                  _: 2
                }, 1032, ["onClick", "loading"]),
                !$data.working ? (openBlock(), createBlock(_component_ui_button, {
                  key: 0,
                  onClick: withModifiers(($event) => $options.cancelBulkAction(parent), ["prevent"]),
                  variant: "secondary"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Cancel")
                  ], void 0, true),
                  _: 2
                }, 1032, ["onClick"])) : createCommentVNode("", true)
              ]),
              default: withCtx(() => [
                parent.allowedBulkActions[$data.action].params && parent.allowedBulkActions[$data.action].params.fields.length ? (openBlock(), createElementBlock("div", _hoisted_6, [
                  $data.form ? (openBlock(), createElementBlock("span", _hoisted_7, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(parent.allowedBulkActions[$data.action].params.fields, (field, index) => {
                      return openBlock(), createBlock(resolveDynamicComponent(field.component), mergeProps(field, {
                        modelValue: $data.form[field.handle],
                        "onUpdate:modelValue": ($event) => $data.form[field.handle] = $event,
                        key: field.handle
                      }, {
                        parent: _ctx.componentData,
                        record: _ctx.record,
                        "has-error": $data.form.errors.has(field.handle),
                        "error-message": $data.form.errors.get(field.handle),
                        errors: $data.form.errors
                      }), null, 16, ["modelValue", "onUpdate:modelValue", "parent", "record", "has-error", "error-message", "errors"]);
                    }), 128))
                  ])) : createCommentVNode("", true)
                ])) : (openBlock(), createElementBlock("p", _hoisted_8, [
                  createTextVNode("Are you sure you want to perform this action against "),
                  createElementVNode("b", null, toDisplayString(parent.selected.length), 1),
                  createTextVNode(" record" + toDisplayString(parent.selected.length > 1 ? "s" : "") + "?", 1)
                ]))
              ], void 0, true),
              _: 2
            }, 1032, ["title", "modelValue"])) : createCommentVNode("", true)
          ], void 0, true),
          _: 2
        }, 1024)
      ]),
      actions: withCtx((table) => [
        table.record.actions && table.record.actions.length ? (openBlock(), createElementBlock("div", _hoisted_9, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(table.record.actions, (action, index) => {
            return openBlock(), createBlock(resolveDynamicComponent(action.component), mergeProps(action, {
              record: table.record,
              onSubmitted: $options.reload,
              onUpdated: $options.reload,
              key: index
            }), {
              default: withCtx(() => [
                createTextVNode(toDisplayString(action.text), 1)
              ], void 0, true),
              _: 2
            }, 1040, ["record", "onSubmitted", "onUpdated"]);
          }), 128))
        ])) : createCommentVNode("", true)
      ]),
      _: 1
    }, 16, ["filters", "onUpdateMetrics"])
  ]);
}
const ResourceDataTable = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ResourceDataTable as default
};
