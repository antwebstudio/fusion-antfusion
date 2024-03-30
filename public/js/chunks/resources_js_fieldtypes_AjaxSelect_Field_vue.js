"use strict";
(self["webpackChunktinymcefieldtype"] = self["webpackChunktinymcefieldtype"] || []).push([["resources_js_fieldtypes_AjaxSelect_Field_vue"],{

/***/ "../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/fieldtypes/AjaxSelect/Field.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/fieldtypes/AjaxSelect/Field.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'fusioncms-helper-js/mixins/datatable'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'vue-multiselect'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mixins: [Object(function webpackMissingModule() { var e = new Error("Cannot find module 'fusioncms-helper-js/mixins/datatable'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())],
  components: {
    Multiselect: Object(function webpackMissingModule() { var e = new Error("Cannot find module 'vue-multiselect'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())
  },
  directives: {
    focus: {
      inserted: function inserted(el, binding) {
        el.focus();
      }
    }
  },
  props: {
    actions: {},
    field: {
      type: Object,
      required: true
    },
    value: {
      required: false,
      "default": function _default() {
        return [];
      }
    }
  },
  watch: {
    value: function value(_value) {
      this.selected = _value;
    },
    selected: function selected() {
      if (this.field.settings.multiple || this.field.settings.allow_auto_new || this.field.settings.object_as_value) {
        this.$emit('input', this.selected);
      } else {
        this.$emit('input', this.selected.id);
      }

      if (this.field.settings.clear_selected_on_select) {
        this.selected = null;
      }

      if (this.field.settings.clear_options_on_select) {
        this.clearOptions();
      }
    }
  },
  data: function data() {
    return {
      loading: false,
      selected: this.value,
      options: [],
      delayTimer: null
    };
  },
  computed: {
    endpoint: function endpoint() {
      return this.field.settings.endpoint;
    }
  },
  mounted: function mounted() {
    return this.loadSavedData();
  },
  methods: {
    clearOptions: function clearOptions() {
      this.options = [];
    },
    select: function select() {},
    remove: function remove() {},
    loadSavedData: function loadSavedData() {
      var _this = this;

      if (this.value && this.field.settings.saved_data_endpoint) {
        var url = this.field.settings.saved_data_endpoint.replace('{value}', this.value);
        axios.get(url, {
          params: {
            id: this.value,
            resourceId: this.value
          }
        }).then(function (response) {
          _this.options = [response.data];
          _this.selected = response.data;
          console.log(_this.options);
        });
      }
    },
    addTag: function addTag(newTag) {
      this.selected.push(_defineProperty({}, this.field.settings.label, newTag));
    },
    asyncFind: function asyncFind(query, id) {
      var _this2 = this;

      if (query.length > this.field.settings.query_min_length) {
        this.search = query;
        this.loading = true;
        this.pagination.perPage = 10;
        clearTimeout(this.delayTimer);
        this.delayTimer = setTimeout(function () {
          _this2.getRecords(_this2.field.settings.query_params).then(function (response) {
            // this.options = response.data.records.data.map(this.itemMap)
            _this2.options = response.data.records.data;

            if (_this2.field.settings.allow_auto_new) {
              _this2.options.push({
                id: 'new_' + query,
                name: '[NEW]: ' + query,
                real_name: query
              });
            }

            _this2.loading = false;
          });
        }, 1000);
      }
    }
  }
});

/***/ }),

/***/ "./resources/js/fieldtypes/AjaxSelect/Field.vue":
/*!******************************************************!*\
  !*** ./resources/js/fieldtypes/AjaxSelect/Field.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Field_vue_vue_type_template_id_340c5e29___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Field.vue?vue&type=template&id=340c5e29& */ "./resources/js/fieldtypes/AjaxSelect/Field.vue?vue&type=template&id=340c5e29&");
/* harmony import */ var _Field_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Field.vue?vue&type=script&lang=js& */ "./resources/js/fieldtypes/AjaxSelect/Field.vue?vue&type=script&lang=js&");
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'vue-multiselect/dist/vue-multiselect.min.css?vue&type=style&index=0&lang=css&'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Field_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Field_vue_vue_type_template_id_340c5e29___WEBPACK_IMPORTED_MODULE_0__.render,
  _Field_vue_vue_type_template_id_340c5e29___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/fieldtypes/AjaxSelect/Field.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/fieldtypes/AjaxSelect/Field.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/fieldtypes/AjaxSelect/Field.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Field_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Field.vue?vue&type=script&lang=js& */ "../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/fieldtypes/AjaxSelect/Field.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Field_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/fieldtypes/AjaxSelect/Field.vue?vue&type=template&id=340c5e29&":
/*!*************************************************************************************!*\
  !*** ./resources/js/fieldtypes/AjaxSelect/Field.vue?vue&type=template&id=340c5e29& ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Field_vue_vue_type_template_id_340c5e29___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Field_vue_vue_type_template_id_340c5e29___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Field_vue_vue_type_template_id_340c5e29___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Field.vue?vue&type=template&id=340c5e29& */ "../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/fieldtypes/AjaxSelect/Field.vue?vue&type=template&id=340c5e29&");


/***/ }),

/***/ "../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/fieldtypes/AjaxSelect/Field.vue?vue&type=template&id=340c5e29&":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/fieldtypes/AjaxSelect/Field.vue?vue&type=template&id=340c5e29& ***!
  \******************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "label",
        { staticClass: "form__label label", attrs: { for: _vm.field.handle } },
        [_vm._v(_vm._s(_vm.field.name))]
      ),
      _vm._v(" "),
      _c("multiselect", {
        attrs: {
          id: _vm.field.id,
          "track-by": _vm.field.settings.track_by,
          label: _vm.field.settings.label,
          options: _vm.options,
          loading: _vm.loading,
          "internal-search": false,
          "clear-on-select": true,
          placeholder: _vm.field.settings.placeholder,
          taggable: _vm.field.settings.true,
          multiple: _vm.field.settings.multiple,
        },
        on: { "search-change": _vm.asyncFind, tag: _vm.addTag },
        scopedSlots: _vm._u(
          [
            {
              key: "option",
              fn: function (ref) {
                var option = ref.option
                var search = ref.search
                return [
                  _vm._t(
                    "option",
                    function () {
                      return [_vm._v(_vm._s(option))]
                    },
                    { option: option, search: search }
                  ),
                ]
              },
            },
            {
              key: "noOptions",
              fn: function () {
                return [_vm._v("\n          No result.\n      ")]
              },
              proxy: true,
            },
            {
              key: "afterList",
              fn: function () {
                return [
                  _c(
                    "div",
                    { staticStyle: { position: "sticky", bottom: "0px" } },
                    _vm._l(_vm.actions, function (action, index) {
                      return _c(
                        action.component,
                        _vm._b(
                          {
                            key: index,
                            tag: "component",
                            on: { submitted: _vm.reload, updated: _vm.reload },
                          },
                          "component",
                          action,
                          false
                        ),
                        [
                          _vm._v(
                            "\n                  " +
                              _vm._s(action.text) +
                              "\n              "
                          ),
                        ]
                      )
                    }),
                    1
                  ),
                ]
              },
              proxy: true,
            },
          ],
          null,
          true
        ),
        model: {
          value: _vm.selected,
          callback: function ($$v) {
            _vm.selected = $$v
          },
          expression: "selected",
        },
      }),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!***************************************************************************!*\
  !*** ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ normalizeComponent)
/* harmony export */ });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })

}]);