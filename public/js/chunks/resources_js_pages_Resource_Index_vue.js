"use strict";
(self["webpackChunktinymcefieldtype"] = self["webpackChunktinymcefieldtype"] || []).push([["resources_js_pages_Resource_Index_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Resource/Index.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Resource/Index.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************/
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
  data: function data() {
    return {
      meta: null,
      resource: null,
      actions: null
    };
  },
  computed: {
    dropdownActions: function dropdownActions() {
      return this.actions.filter(function (action) {
        return action.dropdown;
      });
    }
  },
  beforeRouteUpdate: function beforeRouteUpdate(to, from, next) {
    var _this = this;

    axios.get('/api/antfusion/resource/' + to.params.resource + '').then(function (response) {
      _this.meta = response.data;
      _this.resource = response.data.resource;
      _this.actions = response.data.actions;
      next();
    })["catch"](function (error) {
      if (error.response.data.errors && error.response.data.errors['*']) {
        var errors = error.response.data.errors['*'];
        toast(errors.join(' '), 'error');
      } else {
        toast(error.response.data.message, 'error');
      }
    });
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    axios.get('/api/antfusion/resource/' + to.params.resource + '').then(function (response) {
      next(function (vm) {
        vm.meta = response.data;
        vm.resource = response.data.resource;
        vm.actions = response.data.actions;
      });
    })["catch"](function (error) {
      if (error.response.data.errors && error.response.data.errors['*']) {
        var errors = error.response.data.errors['*'];
        toast(errors.join(' '), 'error');
      } else {
        toast(error.response.data.message, 'error');
      }
    });
  }
});

/***/ }),

/***/ "./resources/js/pages/Resource/Index.vue":
/*!***********************************************!*\
  !*** ./resources/js/pages/Resource/Index.vue ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Index_vue_vue_type_template_id_274970ba___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Index.vue?vue&type=template&id=274970ba& */ "./resources/js/pages/Resource/Index.vue?vue&type=template&id=274970ba&");
/* harmony import */ var _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Index.vue?vue&type=script&lang=js& */ "./resources/js/pages/Resource/Index.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Index_vue_vue_type_template_id_274970ba___WEBPACK_IMPORTED_MODULE_0__.render,
  _Index_vue_vue_type_template_id_274970ba___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Resource/Index.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Resource/Index.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/pages/Resource/Index.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Resource/Index.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Resource/Index.vue?vue&type=template&id=274970ba&":
/*!******************************************************************************!*\
  !*** ./resources/js/pages/Resource/Index.vue?vue&type=template&id=274970ba& ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_274970ba___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_274970ba___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_274970ba___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Index.vue?vue&type=template&id=274970ba& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Resource/Index.vue?vue&type=template&id=274970ba&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Resource/Index.vue?vue&type=template&id=274970ba&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Resource/Index.vue?vue&type=template&id=274970ba& ***!
  \*********************************************************************************************************************************************************************************************************************/
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
        "portal",
        { attrs: { to: "title" } },
        [
          _c("page-title", { attrs: { icon: _vm.resource.icon } }, [
            _vm._v(_vm._s(_vm.meta.title)),
          ]),
        ],
        1
      ),
      _vm._v(" "),
      _c("portal", { attrs: { to: "actions" } }, [
        _vm.actions && _vm.actions.length
          ? _c(
              "div",
              [
                _vm._l(_vm.actions, function (action, index) {
                  return _c(
                    "span",
                    { key: index },
                    [
                      !action.dropdown
                        ? _c(
                            action.component,
                            _vm._b(
                              { tag: "component", on: { submitted: _vm.load } },
                              "component",
                              action,
                              false
                            ),
                            [
                              _vm._v(
                                "\n                    " +
                                  _vm._s(action.text) +
                                  "\n                "
                              ),
                            ]
                          )
                        : _vm._e(),
                    ],
                    1
                  )
                }),
                _vm._v(" "),
                _vm.dropdownActions && _vm.dropdownActions.length
                  ? _c(
                      "ui-actions",
                      { key: "entry_actions", attrs: { id: "entry_actions" } },
                      _vm._l(_vm.dropdownActions, function (action, index) {
                        return _c(
                          "div",
                          { key: index },
                          [
                            action.dropdown
                              ? _c(
                                  action.component,
                                  _vm._b(
                                    {
                                      tag: "component",
                                      attrs: { form: _vm.meta },
                                      on: { submitted: _vm.load },
                                    },
                                    "component",
                                    action,
                                    false
                                  ),
                                  [
                                    _vm._v(
                                      "\n                        " +
                                        _vm._s(action.text) +
                                        "\n                    "
                                    ),
                                  ]
                                )
                              : _vm._e(),
                          ],
                          1
                        )
                      }),
                      0
                    )
                  : _vm._e(),
              ],
              2
            )
          : _vm._e(),
      ]),
      _vm._v(" "),
      _vm.meta && _vm.meta.components
        ? _c(
            "div",
            _vm._l(_vm.meta.components, function (component, index) {
              return _c(
                component.is,
                _vm._b(
                  {
                    key: component.id,
                    tag: "component",
                    staticClass: "form__group",
                  },
                  "component",
                  component,
                  false
                )
              )
            }),
            1
          )
        : _vm._e(),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);