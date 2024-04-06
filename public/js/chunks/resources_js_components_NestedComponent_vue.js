"use strict";
(self["webpackChunktinymcefieldtype"] = self["webpackChunktinymcefieldtype"] || []).push([["resources_js_components_NestedComponent_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/NestedComponent.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/NestedComponent.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************/
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    debug: {
      "default": false
    },
    form: {
      "default": {}
    },
    text: {},
    props: {},
    as: {},
    record: {},
    value: {},
    children: {}
  },
  data: function data() {
    return {
      fieldValues: this.form
    };
  },
  watch: {
    form: function form(value) {
      this.fieldValues = value;
    },
    fieldValues: {
      handler: function handler(value) {
        var _this = this;

        // let form = 
        Object.keys(value).forEach(function (key) {
          _this.form[key] = value[key];
        });
        this.$emit('input', this.form);
      },
      deep: true
    }
  }
});

/***/ }),

/***/ "./resources/js/components/NestedComponent.vue":
/*!*****************************************************!*\
  !*** ./resources/js/components/NestedComponent.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _NestedComponent_vue_vue_type_template_id_5228bb2b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NestedComponent.vue?vue&type=template&id=5228bb2b& */ "./resources/js/components/NestedComponent.vue?vue&type=template&id=5228bb2b&");
/* harmony import */ var _NestedComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NestedComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/NestedComponent.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NestedComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NestedComponent_vue_vue_type_template_id_5228bb2b___WEBPACK_IMPORTED_MODULE_0__.render,
  _NestedComponent_vue_vue_type_template_id_5228bb2b___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/NestedComponent.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/NestedComponent.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/NestedComponent.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NestedComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./NestedComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/NestedComponent.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NestedComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/NestedComponent.vue?vue&type=template&id=5228bb2b&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/NestedComponent.vue?vue&type=template&id=5228bb2b& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NestedComponent_vue_vue_type_template_id_5228bb2b___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NestedComponent_vue_vue_type_template_id_5228bb2b___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NestedComponent_vue_vue_type_template_id_5228bb2b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./NestedComponent.vue?vue&type=template&id=5228bb2b& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/NestedComponent.vue?vue&type=template&id=5228bb2b&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/NestedComponent.vue?vue&type=template&id=5228bb2b&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/NestedComponent.vue?vue&type=template&id=5228bb2b& ***!
  \***************************************************************************************************************************************************************************************************************************/
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
    _vm.as,
    _vm._b(
      { tag: "component", attrs: { form: _vm.form, errors: _vm.form.errors } },
      "component",
      _vm.props,
      false
    ),
    [
      _vm.debug ? _c("div", [_vm._v(_vm._s(_vm.as))]) : _vm._e(),
      _vm._v("\n\n    " + _vm._s(_vm.text) + "\n    "),
      _vm._l(_vm.children, function (childComponent, index) {
        return _vm.children
          ? _c(
              childComponent.component,
              _vm._g(
                _vm._b(
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: !childComponent.hide,
                        expression: "! childComponent.hide",
                      },
                    ],
                    key: childComponent.handle + "_" + index,
                    tag: "component",
                    attrs: {
                      form: _vm.form,
                      errors: _vm.form.errors,
                      record: Object.assign(
                        {},
                        _vm.record,
                        childComponent.record
                      ),
                    },
                    model: {
                      value: _vm.fieldValues[childComponent.handle],
                      callback: function ($$v) {
                        _vm.$set(_vm.fieldValues, childComponent.handle, $$v)
                      },
                      expression: "fieldValues[childComponent.handle]",
                    },
                  },
                  "component",
                  childComponent,
                  false
                ),
                _vm.$listeners
              ),
              [
                _vm.debug
                  ? _c("div", [_vm._v(_vm._s(childComponent.component))])
                  : _vm._e(),
                _vm._v(
                  "\n\n        " + _vm._s(childComponent.text) + "\n\n        "
                ),
                _vm._l(
                  childComponent.children,
                  function (grandchild, grandchildIndex) {
                    return childComponent.children
                      ? _c(
                          grandchild.component,
                          _vm._g(
                            _vm._b(
                              {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: !grandchild.hide,
                                    expression: "! grandchild.hide",
                                  },
                                ],
                                key:
                                  grandchild.handle +
                                  "_" +
                                  index +
                                  "_" +
                                  grandchildIndex,
                                tag: "component",
                                attrs: {
                                  form: _vm.form,
                                  errors: _vm.form.errors,
                                  record: Object.assign(
                                    {},
                                    _vm.record,
                                    grandchild.record
                                  ),
                                },
                                model: {
                                  value: _vm.fieldValues[grandchild.handle],
                                  callback: function ($$v) {
                                    _vm.$set(
                                      _vm.fieldValues,
                                      grandchild.handle,
                                      $$v
                                    )
                                  },
                                  expression: "fieldValues[grandchild.handle]",
                                },
                              },
                              "component",
                              grandchild,
                              false
                            ),
                            _vm.$listeners
                          ),
                          [
                            _vm.debug
                              ? _c("div", [
                                  _vm._v(_vm._s(grandchild.component)),
                                ])
                              : _vm._e(),
                            _vm._v(
                              "\n\n            " +
                                _vm._s(grandchild.text) +
                                "\n        "
                            ),
                          ]
                        )
                      : _vm._e()
                  }
                ),
              ],
              2
            )
          : _vm._e()
      }),
    ],
    2
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