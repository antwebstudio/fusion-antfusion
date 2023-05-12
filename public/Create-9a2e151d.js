import { F as Form } from "./Form-5165edca.js";
import { S as SharedForm } from "./SharedForm-3d3b60ef.js";
import { resolveComponent, openBlock, createElementBlock, createVNode, withCtx, createTextVNode, toDisplayString, createBlock, createCommentVNode } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
import "./_commonjsHelpers-7a77ea84.js";
import "./lodash-7a9c3582.js";
const _sfc_main = {
  head: {
    title() {
      return {
        inner: this.resource.name || "Loading..."
      };
    }
  },
  data() {
    return {
      meta: null,
      resource: null,
      form: null,
      loading: false
    };
  },
  components: {
    "shared-form": SharedForm
  },
  methods: {
    submit() {
      this.loading = true;
      this.form.post(`/api/antfusion/resource/${this.resource.slug}`).then((response) => {
        toast("Entry saved successfully", "success");
        this.$router.push(`/resource/${this.resource.slug}`);
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
    }
  },
  beforeRouteEnter(to, from, next) {
    axios.get(`/api/antfusion/resource/${to.params.resource}/create`).then((response) => {
      next((vm2) => {
        let meta = response.data;
        let resource = response.data.resource;
        let form = {
          name: "",
          slug: "",
          publish_at: null,
          expire_at: null,
          status: 1
        };
        _.each(meta.fields, (field) => {
          form[field.field.handle] = field.field.default;
        });
        vm2.meta = meta;
        vm2.resource = resource;
        vm2.form = new Form(form, true);
        vm2.$emit("updateHead");
      });
    }).catch(() => {
      vm.$router.push(`/resource/${vm.$router.currentRoute.params.resource}`);
      toast("Requested entry could not be found.", "danger");
    });
  }
};
const _hoisted_1 = { class: "resource-page" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_page_title = resolveComponent("page-title");
  const _component_portal = resolveComponent("portal");
  const _component_shared_form = resolveComponent("shared-form");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_portal, { to: "title" }, {
      default: withCtx(() => [
        createVNode(_component_page_title, {
          icon: $data.resource.icon || "pencil-alt",
          subtitle: $data.meta.subtitle
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString($data.meta.title), 1)
          ], void 0, true),
          _: 1
        }, 8, ["icon", "subtitle"])
      ], void 0, true),
      _: 1
    }),
    $data.form ? (openBlock(), createBlock(_component_shared_form, {
      key: 0,
      loading: $data.loading,
      form: $data.form,
      actions: $data.meta.actions,
      meta: $data.meta,
      resource: $data.resource
    }, null, 8, ["loading", "form", "actions", "meta", "resource"])) : createCommentVNode("", true)
  ]);
}
const Create = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Create as default
};
