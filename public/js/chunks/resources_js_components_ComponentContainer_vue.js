"use strict";
(self["webpackChunktinymcefieldtype"] = self["webpackChunktinymcefieldtype"] || []).push([["resources_js_components_ComponentContainer_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ComponentContainer.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ComponentContainer.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue_fragment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-fragment */ "./node_modules/vue-fragment/dist/vue-fragment.esm.js");
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
  props: {
    value: {},
    record: {
      "default": {}
    },
    wrap: {
      "default": false
    },
    suffix: {},
    components: {
      Fragment: vue_fragment__WEBPACK_IMPORTED_MODULE_0__.Fragment
    }
  },
  watch: {
    value: {
      handler: function handler(value) {
        this.loadedRecord = value;
      }
    },
    loadedRecord: {
      deep: true,
      handler: function handler(value) {
        this.$emit('input', value);
      }
    }
  },
  data: function data() {
    return {
      loadedRecord: Object.assign({}, this.value, this.record),
      loadingCount: 0
    };
  },
  methods: {
    componentExist: function componentExist(componentName) {
      return this.$options.components && this.$options.components[componentName];
    },
    onLoading: function onLoading() {
      this.loadingCount++;
    },
    onLoaded: function onLoaded() {
      this.loadingCount--;
    }
  },
  computed: {
    processedComponents: function processedComponents() {
      var _this = this;

      if (this.suffix) {
        return this.components.map(function (component) {
          var componentName = component.component + _this.suffix;

          if (_this.componentExist(componentName)) {
            component.component = componentName;
          }

          return component;
        });
      }

      return this.components;
    },
    loading: function loading() {
      return this.loadingCount > 0;
    }
  }
});

/***/ }),

/***/ "./resources/js/components/ComponentContainer.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/ComponentContainer.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ComponentContainer_vue_vue_type_template_id_2206e3af___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ComponentContainer.vue?vue&type=template&id=2206e3af& */ "./resources/js/components/ComponentContainer.vue?vue&type=template&id=2206e3af&");
/* harmony import */ var _ComponentContainer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ComponentContainer.vue?vue&type=script&lang=js& */ "./resources/js/components/ComponentContainer.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ComponentContainer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ComponentContainer_vue_vue_type_template_id_2206e3af___WEBPACK_IMPORTED_MODULE_0__.render,
  _ComponentContainer_vue_vue_type_template_id_2206e3af___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/ComponentContainer.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/ComponentContainer.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/ComponentContainer.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ComponentContainer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ComponentContainer.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ComponentContainer.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ComponentContainer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/ComponentContainer.vue?vue&type=template&id=2206e3af&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/ComponentContainer.vue?vue&type=template&id=2206e3af& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ComponentContainer_vue_vue_type_template_id_2206e3af___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ComponentContainer_vue_vue_type_template_id_2206e3af___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ComponentContainer_vue_vue_type_template_id_2206e3af___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ComponentContainer.vue?vue&type=template&id=2206e3af& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ComponentContainer.vue?vue&type=template&id=2206e3af&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ComponentContainer.vue?vue&type=template&id=2206e3af&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ComponentContainer.vue?vue&type=template&id=2206e3af& ***!
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
  return _vm.wrap
    ? _c(
        "div",
        _vm._b({ staticClass: "flex flex-wrap" }, "div", _vm.$props, false),
        _vm._l(_vm.processedComponents, function (component, index) {
          return _c(
            component.component,
            _vm._b(
              {
                key: index,
                tag: "component",
                attrs: { loading: _vm.loading },
                on: { load: _vm.onLoading, loaded: _vm.onLoaded },
                model: {
                  value: _vm.loadedRecord[component.handle],
                  callback: function ($$v) {
                    _vm.$set(_vm.loadedRecord, component.handle, $$v)
                  },
                  expression: "loadedRecord[component.handle]",
                },
              },
              "component",
              component,
              false
            )
          )
        }),
        1
      )
    : _c(
        "fragment",
        _vm._l(_vm.processedComponents, function (component, index) {
          return _c(
            component.component,
            _vm._b(
              {
                key: index,
                tag: "component",
                attrs: { loading: _vm.loading },
                on: { load: _vm.onLoading, loaded: _vm.onLoaded },
                model: {
                  value: _vm.loadedRecord[component.handle],
                  callback: function ($$v) {
                    _vm.$set(_vm.loadedRecord, component.handle, $$v)
                  },
                  expression: "loadedRecord[component.handle]",
                },
              },
              "component",
              component,
              false
            )
          )
        }),
        1
      )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);