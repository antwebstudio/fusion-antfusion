"use strict";
(self["webpackChunktinymcefieldtype"] = self["webpackChunktinymcefieldtype"] || []).push([["resources_js_components_Timer_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Timer.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Timer.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************/
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
var MILLISECONDS_SECOND = 1000;
var MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND;
var MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE;
var MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    value: {},
    record: {},
    allowNegative: {
      "default": false
    }
  },
  data: function data() {
    return {
      timeLeft: null
    };
  },
  computed: {
    days: function days() {
      var value = this.timeLeft / MILLISECONDS_DAY;
      return this.timeLeft > 0 ? Math.floor(value) : Math.ceil(value);
    },
    hours: function hours() {
      var value = this.timeLeft % MILLISECONDS_DAY / MILLISECONDS_HOUR;
      return this.timeLeft > 0 ? Math.floor(value) : Math.ceil(value);
    },
    minutes: function minutes() {
      var value = this.timeLeft % MILLISECONDS_HOUR / MILLISECONDS_MINUTE;
      return this.timeLeft > 0 ? Math.floor(value) : Math.ceil(value);
    },
    seconds: function seconds() {
      var value = this.timeLeft % MILLISECONDS_MINUTE / MILLISECONDS_SECOND;
      return this.timeLeft > 0 ? Math.floor(value) : Math.ceil(value);
    },
    endTime: function endTime() {
      return new Date(this.value);
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.updateTime();
    setInterval(function () {
      _this.updateTime();

      if (_this.timeLeft <= 0) {
        _this.submit();
      }
    }, 1000);
  },
  methods: {
    updateTime: function updateTime() {
      if (this.allowNegative) {
        this.timeLeft = this.endTime - new Date();
      } else {
        Math.max(0, this.timeLeft = this.endTime - new Date());
      }
    },
    submit: function submit() {
      this.$refs.submitButton.click();
    }
  }
});

/***/ }),

/***/ "./resources/js/components/Timer.vue":
/*!*******************************************!*\
  !*** ./resources/js/components/Timer.vue ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Timer_vue_vue_type_template_id_54f9552c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Timer.vue?vue&type=template&id=54f9552c& */ "./resources/js/components/Timer.vue?vue&type=template&id=54f9552c&");
/* harmony import */ var _Timer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Timer.vue?vue&type=script&lang=js& */ "./resources/js/components/Timer.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Timer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Timer_vue_vue_type_template_id_54f9552c___WEBPACK_IMPORTED_MODULE_0__.render,
  _Timer_vue_vue_type_template_id_54f9552c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Timer.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/Timer.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./resources/js/components/Timer.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Timer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Timer.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Timer.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Timer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Timer.vue?vue&type=template&id=54f9552c&":
/*!**************************************************************************!*\
  !*** ./resources/js/components/Timer.vue?vue&type=template&id=54f9552c& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Timer_vue_vue_type_template_id_54f9552c___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Timer_vue_vue_type_template_id_54f9552c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Timer_vue_vue_type_template_id_54f9552c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Timer.vue?vue&type=template&id=54f9552c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Timer.vue?vue&type=template&id=54f9552c&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Timer.vue?vue&type=template&id=54f9552c&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Timer.vue?vue&type=template&id=54f9552c& ***!
  \*****************************************************************************************************************************************************************************************************************/
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
  return _c("div", [
    _vm._v("\n    Time Remaining: \n    "),
    _vm.days ? _c("span", [_vm._v(_vm._s(_vm.days) + " days, ")]) : _vm._e(),
    _vm._v(" "),
    _vm.hours || _vm.days
      ? _c("span", [_vm._v(_vm._s(_vm.hours) + " hours, ")])
      : _vm._e(),
    _vm._v(" "),
    _vm.minutes || _vm.hours || _vm.days
      ? _c("span", [_vm._v(_vm._s(_vm.minutes) + " minutes, ")])
      : _vm._e(),
    _vm._v(" "),
    _vm.seconds || _vm.minutes || _vm.hours || _vm.days
      ? _c("span", [_vm._v(_vm._s(_vm.seconds) + " seconds.")])
      : _vm._e(),
    _vm._v(" "),
    _c(
      "button",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: false,
            expression: "false",
          },
        ],
        ref: "submitButton",
      },
      [_vm._v("Submit")]
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);