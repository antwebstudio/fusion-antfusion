"use strict";
(self["webpackChunktinymcefieldtype"] = self["webpackChunktinymcefieldtype"] || []).push([["resources_js_components_ActionDropDownLink_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ActionDropDownLink.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ActionDropDownLink.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
  props: {
    cssClass: {},
    url: {},
    confirmButtonText: {
      "default": "Confirm"
    },
    cancelButtonLabel: {
      "default": "Cancel"
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
  data: function data() {
    return {
      loading: false
    };
  },
  computed: {
    needConfirmation: function needConfirmation() {
      return this.confirmText;
    },
    modalName: function modalName() {
      return 'action-link-confirmation-' + this._uid;
    }
  },
  methods: {
    toggle: function toggle() {
      if (this.$parent && this.$parent.toggle) {
        this.$parent.toggle();
      }
    },
    performAction: function performAction() {
      console.log('need ', this.needConfirmation);

      if (this.needConfirmation) {
        this.askConfirmation();
      } else {
        this.confirm();
      }
    },
    askConfirmation: function askConfirmation() {
      this.openModal(this.modalName);
    },
    confirm: function confirm() {
      var _this = this;

      console.log('confirm', this);
      this.loading = true;
      axios.post(this.url, {
        resourceIds: [this.record.id]
      }).then(function (response) {
        console.log('action button', response);

        if (response.data.redirect) {
          _this.$router.push(response.data.redirect);
        } else {
          _this.loading = false;
          toast(response.data.message, 'success');

          _this.closeModal(_this.modalName);

          _this.$emit('updated');
        }
      })["catch"](function (error) {
        _this.loading = false;
        toast(error.response.data.message, 'error');
      });
    },
    closeModal: function closeModal(name, value) {
      this.$bus.$emit('toggle-modal-' + name, value);
    },
    openModal: function openModal(name, value) {
      this.$bus.$emit('toggle-modal-' + name, value);
    }
  }
});

/***/ }),

/***/ "./resources/js/components/ActionDropDownLink.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/ActionDropDownLink.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ActionDropDownLink_vue_vue_type_template_id_097a0368___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActionDropDownLink.vue?vue&type=template&id=097a0368& */ "./resources/js/components/ActionDropDownLink.vue?vue&type=template&id=097a0368&");
/* harmony import */ var _ActionDropDownLink_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ActionDropDownLink.vue?vue&type=script&lang=js& */ "./resources/js/components/ActionDropDownLink.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ActionDropDownLink_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ActionDropDownLink_vue_vue_type_template_id_097a0368___WEBPACK_IMPORTED_MODULE_0__.render,
  _ActionDropDownLink_vue_vue_type_template_id_097a0368___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/ActionDropDownLink.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/ActionDropDownLink.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/ActionDropDownLink.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionDropDownLink_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ActionDropDownLink.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ActionDropDownLink.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionDropDownLink_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/ActionDropDownLink.vue?vue&type=template&id=097a0368&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/ActionDropDownLink.vue?vue&type=template&id=097a0368& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionDropDownLink_vue_vue_type_template_id_097a0368___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionDropDownLink_vue_vue_type_template_id_097a0368___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionDropDownLink_vue_vue_type_template_id_097a0368___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ActionDropDownLink.vue?vue&type=template&id=097a0368& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ActionDropDownLink.vue?vue&type=template&id=097a0368&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ActionDropDownLink.vue?vue&type=template&id=097a0368&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ActionDropDownLink.vue?vue&type=template&id=097a0368& ***!
  \******************************************************************************************************************************************************************************************************************************/
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
        "ui-dropdown-link",
        _vm._b(
          {
            class: _vm.cssClass,
            on: {
              click: function ($event) {
                $event.preventDefault()
                return _vm.performAction.apply(null, arguments)
              },
            },
          },
          "ui-dropdown-link",
          _vm.$props,
          false
        ),
        [_vm._v("\n        " + _vm._s(_vm.text) + "\n    ")]
      ),
      _vm._v(" "),
      _vm.needConfirmation
        ? _c(
            "portal",
            { attrs: { to: "modals" } },
            [
              _c(
                "ui-modal",
                {
                  key: _vm.modalName,
                  attrs: { name: _vm.modalName, title: _vm.confirmTitle },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "footer",
                        fn: function (entry) {
                          return [
                            _c(
                              "ui-button",
                              {
                                staticClass: "ml-3",
                                attrs: {
                                  disabled: _vm.loading,
                                  variant: "danger",
                                },
                                on: {
                                  click: function ($event) {
                                    return _vm.confirm()
                                  },
                                },
                              },
                              [_vm._v(_vm._s(_vm.confirmButtonText))]
                            ),
                            _vm._v(" "),
                            _c(
                              "ui-button",
                              {
                                attrs: {
                                  disabled: _vm.loading,
                                  variant: "secondary",
                                },
                                on: {
                                  click: function ($event) {
                                    return _vm.closeModal(_vm.modalName)
                                  },
                                },
                              },
                              [_vm._v(_vm._s(_vm.cancelButtonLabel))]
                            ),
                          ]
                        },
                      },
                    ],
                    null,
                    false,
                    4211464818
                  ),
                },
                [_c("p", [_vm._v(_vm._s(_vm.confirmText))])]
              ),
            ],
            1
          )
        : _vm._e(),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
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