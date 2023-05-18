"use strict";
(self["webpackChunktinymcefieldtype"] = self["webpackChunktinymcefieldtype"] || []).push([["resources_js_components_DataTable_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/DataTable.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/DataTable.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ui_Table_Table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/ui/Table/Table */ "../../fusioncms/cms/resources/js/ui/Table/Table.vue");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    filters: {}
  },
  "extends": _ui_Table_Table__WEBPACK_IMPORTED_MODULE_0__["default"],
  watch: {
    filters: {
      handler: function handler(value) {
        this.getRecords();
      },
      deep: true
    }
  },
  methods: {
    getRecords: function getRecords() {
      var _this = this;

      this.loading = true;
      return axios.get("".concat(this.endpoint, "?").concat(this.getQueryParameters())).then(function (response) {
        _this.records = response.data.records.data;
        _this.displayable = response.data.displayable;
        _this.sortable = response.data.sortable;
        _this.column_names = response.data.column_names;
        _this.column_types = response.data.column_types;
        _this.bulk_actions = response.data.bulk_actions;
        _this.bulk_actions_exempt = response.data.bulk_actions_exempt;
        _this.pagination.totalRecords = response.data.records.total;
        _this.pagination.totalPages = response.data.records.last_page;

        _this.$emit('update-metrics', response.data.metrics);

        _this.loading = false;
        _this.initialLoad = false;

        if (_this.refresh && !self._timer) {
          _this._timer = setTimeout(function () {
            return _this.getRecords();
          }, _this.refresh);
        }

        _this.$emit('loaded', _this.records);
      });
    },
    getQueryParameters: function getQueryParameters() {
      var _this2 = this;

      var params = {
        sort: (this.sort.order === 'desc' ? '-' : '') + this.sort.key,
        page: this.pagination.currentPage,
        perPage: this.pagination.perPage
      };

      if (this.filters) {
        Object.keys(this.filters).forEach(function (key) {
          if (_typeof(_this2.filters[key]) == 'object') {
            params['filter[' + key + '][]'] = _this2.filters[key];
          } else {
            params['filter[' + key + ']'] = _this2.filters[key];
          }
        });
      }

      if (this.search !== '') {
        params['filter[search]'] = this.search;
      }

      return query_string__WEBPACK_IMPORTED_MODULE_1__.stringify(params);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../fusioncms/cms/resources/js/ui/Table/Table.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../fusioncms/cms/resources/js/ui/Table/Table.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'lodash'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'axios'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'query-string'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'vue-nestable'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
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
  name: 'ui-table',
  components: {
    VueNestable: Object(function webpackMissingModule() { var e = new Error("Cannot find module 'vue-nestable'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()),
    VueNestableHandle: Object(function webpackMissingModule() { var e = new Error("Cannot find module 'vue-nestable'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())
  },
  props: {
    id: {
      required: true,
      type: String
    },
    bulk: {
      type: Boolean,
      "default": true
    },
    refresh: {
      type: Number | Boolean,
      "default": false
    },
    noRecords: {
      type: String,
      "default": 'No records to display'
    },
    endpoint: {
      required: true,
      type: String
    },
    sortBy: {
      type: String,
      "default": 'id'
    },
    saveSortBy: {
      type: Boolean,
      "default": true
    },
    perPage: {
      type: Number,
      "default": 10
    },
    sortIn: {
      type: String,
      "default": 'asc'
    },
    noSearch: {
      type: Boolean,
      "default": false
    },
    primaryKey: {
      required: false,
      type: String,
      "default": 'id'
    },
    showPageStatus: {
      type: Boolean,
      "default": false
    },
    showPageNumbers: {
      type: Boolean,
      "default": false
    },
    showPageNav: {
      type: Boolean,
      "default": false
    },
    showPageEnds: {
      type: Boolean,
      "default": false
    },
    hidePageSelect: {
      type: Boolean,
      "default": false
    },
    pageSelectLabel: {
      type: String,
      "default": 'Page'
    },
    reorder_route: {
      type: String,
      "default": ''
    },
    link_name: {
      type: String,
      "default": ''
    },
    link_param: {
      type: String,
      "default": ''
    },
    show_status: {
      type: Boolean,
      "default": false
    },
    show_order: {
      type: Boolean,
      "default": true
    }
  },
  data: function data() {
    return {
      action: null,
      showBulkActionConfirmation: false,
      initialLoad: true,
      loading: true,
      working: false,
      displayable: [],
      column_names: [],
      column_types: [],
      bulk_actions: [],
      bulk_actions_exempt: [],
      sortable: [],
      records: [],
      search: '',
      pagination: {
        totalRecords: 0,
        currentPage: 1,
        totalPages: 0,
        perPage: this.perPage,
        perPageOptions: [10, 50, 100, 250]
      },
      sort: {
        key: this.sortBy,
        order: this.sortIn
      },
      selected: [],
      order: 'Order'
    };
  },
  computed: {
    columns: function (_columns) {
      function columns() {
        return _columns.apply(this, arguments);
      }

      columns.toString = function () {
        return _columns.toString();
      };

      return columns;
    }(function () {
      var _this = this;

      return Object(function webpackMissingModule() { var e = new Error("Cannot find module 'lodash'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this.displayable, function (option) {
        columns.push({
          'label': _this.column_names[option],
          'value': option
        });
      });
    }),
    hasActions: function hasActions() {
      return !!this.$slots.actions || !!this.$scopedSlots.actions;
    },
    hasBulkActions: function hasBulkActions() {
      console.log(this.bulk, this.selectable.length, this.allowedBulkActions.length);
      if (!this.bulk) return false;
      if (!this.selectable.length > 0) return false;
      if (!this.allowedBulkActions.length > 0) return false;
      return true;
    },
    hasSelections: function hasSelections() {
      return this.selected.length > 0;
    },
    selectable: function selectable() {
      var vm = this;
      return Object(function webpackMissingModule() { var e = new Error("Cannot find module 'lodash'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this.records, function (record) {
        return !vm.bulk_actions_exempt.includes(record[vm.primaryKey]);
      });
    },
    allowedBulkActions: function allowedBulkActions() {
      var vm = this;
      return Object(function webpackMissingModule() { var e = new Error("Cannot find module 'lodash'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this.bulk_actions, function (action) {
        if (!action.permission) return true;
        return vm.$can(action.permission);
      });
    }
  },
  watch: {
    endpoint: function endpoint() {
      this.getRecords();
    },
    showBulkActionConfirmation: function showBulkActionConfirmation(value) {
      if (value == false) {
        this.action = null;
      }
    },
    search: Object(function webpackMissingModule() { var e = new Error("Cannot find module 'lodash'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(function (value) {
      this.pagination.currentPage = 1;
      this.getRecords();
    }, 300)
  },
  methods: {
    toggleOrder: function toggleOrder() {
      var _this2 = this;

      if (this.order === 'Order') {
        this.order = 'Save';
        this.changePerPage(this.pagination.totalRecords + 1);
      } else {
        var matrix_id = this.endpoint.split('/').at(-1);
        this.loading = true;
        Object(function webpackMissingModule() { var e = new Error("Cannot find module 'axios'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this.reorder_route, {
          records: this.records
        }).then(function (response) {
          toast('Entries successfully saved.', 'success');
          _this2.loading = false;

          _this2.changePerPage(10);
        })["catch"](function (response) {
          toast(response.message, 'failed');
          _this2.loading = false;

          _this2.changePerPage(10);
        });
        this.order = 'Order';
      }
    },
    cancelBulkAction: function cancelBulkAction() {
      this.showBulkActionConfirmation = false;
      this.action = null;
    },
    confirmBulkAction: function confirmBulkAction() {
      var vm = this;
      this.working = true;
      Object(function webpackMissingModule() { var e = new Error("Cannot find module 'axios'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())("".concat(this.bulk_actions[this.action].route), {
        records: this.selected
      }).then(function (response) {
        toast('Bulk action completed successfully.', 'success');
        vm.getRecords();
        vm.showBulkActionConfirmation = false;
        vm.selected = [];
        vm.action = null;
        vm.working = false;
      });
    },
    isSelectable: function isSelectable(id) {
      return !this.bulk_actions_exempt.includes(id);
    },
    toggleSelectAll: function toggleSelectAll() {
      if (this.selected.length > 0) {
        this.selected = [];
        return;
      }

      this.selected = Object(function webpackMissingModule() { var e = new Error("Cannot find module 'lodash'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this.selectable, 'id');
    },
    getRecords: function getRecords() {
      var _this3 = this;

      this.loading = true;
      return Object(function webpackMissingModule() { var e = new Error("Cannot find module 'axios'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())("".concat(this.endpoint, "?").concat(this.getQueryParameters())).then(function (response) {
        _this3.records = response.data.records.data;
        _this3.displayable = response.data.displayable;
        _this3.sortable = response.data.sortable;
        _this3.column_names = response.data.column_names;
        _this3.column_types = response.data.column_types;
        _this3.bulk_actions = response.data.bulk_actions;
        _this3.bulk_actions_exempt = response.data.bulk_actions_exempt;
        _this3.pagination.totalRecords = response.data.records.total;
        _this3.pagination.totalPages = response.data.records.last_page;
        _this3.loading = false;
        _this3.initialLoad = false;

        if (_this3.refresh && !self._timer) {
          _this3._timer = setTimeout(function () {
            return _this3.getRecords();
          }, _this3.refresh);
        }

        _this3.$emit('loaded', _this3.records);
      });
    },
    isSortable: function isSortable(column) {
      return Object(function webpackMissingModule() { var e = new Error("Cannot find module 'lodash'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this.sortable, column);
    },
    getQueryParameters: function getQueryParameters() {
      var params = {
        sort: (this.sort.order === 'desc' ? '-' : '') + this.sort.key,
        page: this.pagination.currentPage,
        perPage: this.pagination.perPage
      };

      if (this.search !== '') {
        params['filter[search]'] = this.search;
      }

      return Object(function webpackMissingModule() { var e = new Error("Cannot find module 'query-string'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(params);
    },
    sortRecordsBy: function sortRecordsBy(column) {
      var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.sort.key = column;

      if (!order) {
        this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc';
      } else {
        this.sort.order = order;
      }

      this.getRecords();
      this.saveSortProperty();
    },
    saveSortProperty: function saveSortProperty() {
      if (this.saveSortBy) {
        window.localStorage.setItem('ui-table-sort-' + this.id + '-' + this.endpoint + '-' + window.location.pathname, JSON.stringify(this.sort));
      }
    },
    loadSortProperty: function loadSortProperty() {
      try {
        var sort = window.localStorage.getItem('ui-table-sort-' + this.id + '-' + this.endpoint + '-' + window.location.pathname);

        if (sort) {
          sort = JSON.parse(sort);
          this.sort = sort;
        }
      } catch (error) {}
    },
    changePage: function changePage(page) {
      this.pagination.currentPage = page;
      this.getRecords();
    },
    changePerPage: function changePerPage(page) {
      this.pagination.currentPage = 1;
      this.pagination.perPage = page;
      this.getRecords();
    },
    destroy: function destroy(id) {
      var _this4 = this;

      Object(function webpackMissingModule() { var e = new Error("Cannot find module 'axios'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())("".concat(this.endpoint, "/").concat(id)).then(function () {
        _this4.getRecords();
      });
    },
    listenForEvents: function listenForEvents() {
      var _this5 = this;

      bus().$on('refresh-datatable-' + this.id, function (data) {
        _this5.getRecords();
      });
    },
    isComponentExist: function isComponentExist(componentName) {
      return componentName in this.$options.components;
    }
  },
  created: function created() {
    this.loadSortProperty();
    this.getRecords();
    this.listenForEvents();
  },
  destroyed: function destroyed() {
    clearTimeout(this._timer);
  }
});

/***/ }),

/***/ "./node_modules/decode-uri-component/index.js":
/*!****************************************************!*\
  !*** ./node_modules/decode-uri-component/index.js ***!
  \****************************************************/
/***/ ((module) => {


var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return decodeURIComponent(components.join(''));
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher);

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher);
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

module.exports = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};


/***/ }),

/***/ "./node_modules/filter-obj/index.js":
/*!******************************************!*\
  !*** ./node_modules/filter-obj/index.js ***!
  \******************************************/
/***/ ((module) => {


module.exports = function (obj, predicate) {
	var ret = {};
	var keys = Object.keys(obj);
	var isArr = Array.isArray(predicate);

	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		var val = obj[key];

		if (isArr ? predicate.indexOf(key) !== -1 : predicate(key, val, obj)) {
			ret[key] = val;
		}
	}

	return ret;
};


/***/ }),

/***/ "./node_modules/query-string/index.js":
/*!********************************************!*\
  !*** ./node_modules/query-string/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


const strictUriEncode = __webpack_require__(/*! strict-uri-encode */ "./node_modules/strict-uri-encode/index.js");
const decodeComponent = __webpack_require__(/*! decode-uri-component */ "./node_modules/decode-uri-component/index.js");
const splitOnFirst = __webpack_require__(/*! split-on-first */ "./node_modules/split-on-first/index.js");
const filterObject = __webpack_require__(/*! filter-obj */ "./node_modules/filter-obj/index.js");

const isNullOrUndefined = value => value === null || value === undefined;

const encodeFragmentIdentifier = Symbol('encodeFragmentIdentifier');

function encoderForArrayFormat(options) {
	switch (options.arrayFormat) {
		case 'index':
			return key => (result, value) => {
				const index = result.length;

				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), '[', index, ']'].join('')];
				}

				return [
					...result,
					[encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')
				];
			};

		case 'bracket':
			return key => (result, value) => {
				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), '[]'].join('')];
				}

				return [...result, [encode(key, options), '[]=', encode(value, options)].join('')];
			};

		case 'colon-list-separator':
			return key => (result, value) => {
				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), ':list='].join('')];
				}

				return [...result, [encode(key, options), ':list=', encode(value, options)].join('')];
			};

		case 'comma':
		case 'separator':
		case 'bracket-separator': {
			const keyValueSep = options.arrayFormat === 'bracket-separator' ?
				'[]=' :
				'=';

			return key => (result, value) => {
				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				// Translate null to an empty string so that it doesn't serialize as 'null'
				value = value === null ? '' : value;

				if (result.length === 0) {
					return [[encode(key, options), keyValueSep, encode(value, options)].join('')];
				}

				return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
			};
		}

		default:
			return key => (result, value) => {
				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, encode(key, options)];
				}

				return [...result, [encode(key, options), '=', encode(value, options)].join('')];
			};
	}
}

function parserForArrayFormat(options) {
	let result;

	switch (options.arrayFormat) {
		case 'index':
			return (key, value, accumulator) => {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return (key, value, accumulator) => {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		case 'colon-list-separator':
			return (key, value, accumulator) => {
				result = /(:list)$/.exec(key);
				key = key.replace(/:list$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		case 'comma':
		case 'separator':
			return (key, value, accumulator) => {
				const isArray = typeof value === 'string' && value.includes(options.arrayFormatSeparator);
				const isEncodedArray = (typeof value === 'string' && !isArray && decode(value, options).includes(options.arrayFormatSeparator));
				value = isEncodedArray ? decode(value, options) : value;
				const newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map(item => decode(item, options)) : value === null ? value : decode(value, options);
				accumulator[key] = newValue;
			};

		case 'bracket-separator':
			return (key, value, accumulator) => {
				const isArray = /(\[\])$/.test(key);
				key = key.replace(/\[\]$/, '');

				if (!isArray) {
					accumulator[key] = value ? decode(value, options) : value;
					return;
				}

				const arrayValue = value === null ?
					[] :
					value.split(options.arrayFormatSeparator).map(item => decode(item, options));

				if (accumulator[key] === undefined) {
					accumulator[key] = arrayValue;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], arrayValue);
			};

		default:
			return (key, value, accumulator) => {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function validateArrayFormatSeparator(value) {
	if (typeof value !== 'string' || value.length !== 1) {
		throw new TypeError('arrayFormatSeparator must be single character string');
	}
}

function encode(value, options) {
	if (options.encode) {
		return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function decode(value, options) {
	if (options.decode) {
		return decodeComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	}

	if (typeof input === 'object') {
		return keysSorter(Object.keys(input))
			.sort((a, b) => Number(a) - Number(b))
			.map(key => input[key]);
	}

	return input;
}

function removeHash(input) {
	const hashStart = input.indexOf('#');
	if (hashStart !== -1) {
		input = input.slice(0, hashStart);
	}

	return input;
}

function getHash(url) {
	let hash = '';
	const hashStart = url.indexOf('#');
	if (hashStart !== -1) {
		hash = url.slice(hashStart);
	}

	return hash;
}

function extract(input) {
	input = removeHash(input);
	const queryStart = input.indexOf('?');
	if (queryStart === -1) {
		return '';
	}

	return input.slice(queryStart + 1);
}

function parseValue(value, options) {
	if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === 'string' && value.trim() !== '')) {
		value = Number(value);
	} else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
		value = value.toLowerCase() === 'true';
	}

	return value;
}

function parse(query, options) {
	options = Object.assign({
		decode: true,
		sort: true,
		arrayFormat: 'none',
		arrayFormatSeparator: ',',
		parseNumbers: false,
		parseBooleans: false
	}, options);

	validateArrayFormatSeparator(options.arrayFormatSeparator);

	const formatter = parserForArrayFormat(options);

	// Create an object with no prototype
	const ret = Object.create(null);

	if (typeof query !== 'string') {
		return ret;
	}

	query = query.trim().replace(/^[?#&]/, '');

	if (!query) {
		return ret;
	}

	for (const param of query.split('&')) {
		if (param === '') {
			continue;
		}

		let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, ' ') : param, '=');

		// Missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		value = value === undefined ? null : ['comma', 'separator', 'bracket-separator'].includes(options.arrayFormat) ? value : decode(value, options);
		formatter(decode(key, options), value, ret);
	}

	for (const key of Object.keys(ret)) {
		const value = ret[key];
		if (typeof value === 'object' && value !== null) {
			for (const k of Object.keys(value)) {
				value[k] = parseValue(value[k], options);
			}
		} else {
			ret[key] = parseValue(value, options);
		}
	}

	if (options.sort === false) {
		return ret;
	}

	return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
		const value = ret[key];
		if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
			// Sort object keys, not values
			result[key] = keysSorter(value);
		} else {
			result[key] = value;
		}

		return result;
	}, Object.create(null));
}

exports.extract = extract;
exports.parse = parse;

exports.stringify = (object, options) => {
	if (!object) {
		return '';
	}

	options = Object.assign({
		encode: true,
		strict: true,
		arrayFormat: 'none',
		arrayFormatSeparator: ','
	}, options);

	validateArrayFormatSeparator(options.arrayFormatSeparator);

	const shouldFilter = key => (
		(options.skipNull && isNullOrUndefined(object[key])) ||
		(options.skipEmptyString && object[key] === '')
	);

	const formatter = encoderForArrayFormat(options);

	const objectCopy = {};

	for (const key of Object.keys(object)) {
		if (!shouldFilter(key)) {
			objectCopy[key] = object[key];
		}
	}

	const keys = Object.keys(objectCopy);

	if (options.sort !== false) {
		keys.sort(options.sort);
	}

	return keys.map(key => {
		const value = object[key];

		if (value === undefined) {
			return '';
		}

		if (value === null) {
			return encode(key, options);
		}

		if (Array.isArray(value)) {
			if (value.length === 0 && options.arrayFormat === 'bracket-separator') {
				return encode(key, options) + '[]';
			}

			return value
				.reduce(formatter(key), [])
				.join('&');
		}

		return encode(key, options) + '=' + encode(value, options);
	}).filter(x => x.length > 0).join('&');
};

exports.parseUrl = (url, options) => {
	options = Object.assign({
		decode: true
	}, options);

	const [url_, hash] = splitOnFirst(url, '#');

	return Object.assign(
		{
			url: url_.split('?')[0] || '',
			query: parse(extract(url), options)
		},
		options && options.parseFragmentIdentifier && hash ? {fragmentIdentifier: decode(hash, options)} : {}
	);
};

exports.stringifyUrl = (object, options) => {
	options = Object.assign({
		encode: true,
		strict: true,
		[encodeFragmentIdentifier]: true
	}, options);

	const url = removeHash(object.url).split('?')[0] || '';
	const queryFromUrl = exports.extract(object.url);
	const parsedQueryFromUrl = exports.parse(queryFromUrl, {sort: false});

	const query = Object.assign(parsedQueryFromUrl, object.query);
	let queryString = exports.stringify(query, options);
	if (queryString) {
		queryString = `?${queryString}`;
	}

	let hash = getHash(object.url);
	if (object.fragmentIdentifier) {
		hash = `#${options[encodeFragmentIdentifier] ? encode(object.fragmentIdentifier, options) : object.fragmentIdentifier}`;
	}

	return `${url}${queryString}${hash}`;
};

exports.pick = (input, filter, options) => {
	options = Object.assign({
		parseFragmentIdentifier: true,
		[encodeFragmentIdentifier]: false
	}, options);

	const {url, query, fragmentIdentifier} = exports.parseUrl(input, options);
	return exports.stringifyUrl({
		url,
		query: filterObject(query, filter),
		fragmentIdentifier
	}, options);
};

exports.exclude = (input, filter, options) => {
	const exclusionFilter = Array.isArray(filter) ? key => !filter.includes(key) : (key, value) => !filter(key, value);

	return exports.pick(input, exclusionFilter, options);
};


/***/ }),

/***/ "./node_modules/split-on-first/index.js":
/*!**********************************************!*\
  !*** ./node_modules/split-on-first/index.js ***!
  \**********************************************/
/***/ ((module) => {



module.exports = (string, separator) => {
	if (!(typeof string === 'string' && typeof separator === 'string')) {
		throw new TypeError('Expected the arguments to be of type `string`');
	}

	if (separator === '') {
		return [string];
	}

	const separatorIndex = string.indexOf(separator);

	if (separatorIndex === -1) {
		return [string];
	}

	return [
		string.slice(0, separatorIndex),
		string.slice(separatorIndex + separator.length)
	];
};


/***/ }),

/***/ "./node_modules/strict-uri-encode/index.js":
/*!*************************************************!*\
  !*** ./node_modules/strict-uri-encode/index.js ***!
  \*************************************************/
/***/ ((module) => {


module.exports = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);


/***/ }),

/***/ "./resources/js/components/DataTable.vue":
/*!***********************************************!*\
  !*** ./resources/js/components/DataTable.vue ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DataTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DataTable.vue?vue&type=script&lang=js& */ "./resources/js/components/DataTable.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns
;



/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _DataTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/DataTable.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "../../fusioncms/cms/resources/js/ui/Table/Table.vue":
/*!***********************************************************!*\
  !*** ../../fusioncms/cms/resources/js/ui/Table/Table.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Table_vue_vue_type_template_id_bd798900___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Table.vue?vue&type=template&id=bd798900& */ "../../fusioncms/cms/resources/js/ui/Table/Table.vue?vue&type=template&id=bd798900&");
/* harmony import */ var _Table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Table.vue?vue&type=script&lang=js& */ "../../fusioncms/cms/resources/js/ui/Table/Table.vue?vue&type=script&lang=js&");
/* harmony import */ var _antweb_fusion_antfusion_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../antweb/fusion-antfusion/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_antweb_fusion_antfusion_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Table_vue_vue_type_template_id_bd798900___WEBPACK_IMPORTED_MODULE_0__.render,
  _Table_vue_vue_type_template_id_bd798900___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "fusioncms/cms/resources/js/ui/Table/Table.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/DataTable.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/components/DataTable.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DataTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./DataTable.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/DataTable.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DataTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "../../fusioncms/cms/resources/js/ui/Table/Table.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ../../fusioncms/cms/resources/js/ui/Table/Table.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _antweb_fusion_antfusion_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_antweb_fusion_antfusion_node_modules_vue_loader_lib_index_js_vue_loader_options_Table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../antweb/fusion-antfusion/node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../antweb/fusion-antfusion/node_modules/vue-loader/lib/index.js??vue-loader-options!./Table.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../fusioncms/cms/resources/js/ui/Table/Table.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_antweb_fusion_antfusion_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_antweb_fusion_antfusion_node_modules_vue_loader_lib_index_js_vue_loader_options_Table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "../../fusioncms/cms/resources/js/ui/Table/Table.vue?vue&type=template&id=bd798900&":
/*!******************************************************************************************!*\
  !*** ../../fusioncms/cms/resources/js/ui/Table/Table.vue?vue&type=template&id=bd798900& ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _antweb_fusion_antfusion_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_antweb_fusion_antfusion_node_modules_vue_loader_lib_index_js_vue_loader_options_Table_vue_vue_type_template_id_bd798900___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _antweb_fusion_antfusion_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_antweb_fusion_antfusion_node_modules_vue_loader_lib_index_js_vue_loader_options_Table_vue_vue_type_template_id_bd798900___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _antweb_fusion_antfusion_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_antweb_fusion_antfusion_node_modules_vue_loader_lib_index_js_vue_loader_options_Table_vue_vue_type_template_id_bd798900___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../antweb/fusion-antfusion/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../antweb/fusion-antfusion/node_modules/vue-loader/lib/index.js??vue-loader-options!./Table.vue?vue&type=template&id=bd798900& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../fusioncms/cms/resources/js/ui/Table/Table.vue?vue&type=template&id=bd798900&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../fusioncms/cms/resources/js/ui/Table/Table.vue?vue&type=template&id=bd798900&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../fusioncms/cms/resources/js/ui/Table/Table.vue?vue&type=template&id=bd798900& ***!
  \*********************************************************************************************************************************************************************************************************************************/
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
      !_vm.noSearch
        ? _c(
            "ui-toolbar",
            [
              _vm._t("toolbarPrepend"),
              _vm._v(" "),
              _c(
                "ui-toolbar-group",
                { attrs: { grow: "" } },
                [
                  _c(
                    "ui-label",
                    {
                      attrs: {
                        fieldId: _vm.id + "-table-search",
                        hideLabel: "",
                      },
                    },
                    [_vm._v("Search")]
                  ),
                  _vm._v(" "),
                  _c("ui-input", {
                    attrs: {
                      id: _vm.id + "-table-search",
                      name: "search",
                      type: "search",
                      placeholder: "Search",
                      autocomplete: "off",
                      "aria-controls": _vm.id,
                    },
                    model: {
                      value: _vm.search,
                      callback: function ($$v) {
                        _vm.search = $$v
                      },
                      expression: "search",
                    },
                  }),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "ui-toolbar-group",
                [
                  _c(
                    "ui-dropdown",
                    {
                      attrs: {
                        disabled: _vm.order === "Save",
                        noArrow: "",
                        id: "per-page-options",
                        right: "",
                      },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "menu",
                            fn: function () {
                              return [
                                _c("ui-dropdown-item", [
                                  _c("p", [_vm._v("Results per page:")]),
                                ]),
                                _vm._v(" "),
                                _c("ui-dropdown-divider"),
                                _vm._v(" "),
                                _vm._l(
                                  _vm.pagination.perPageOptions,
                                  function (pages, index) {
                                    return _c(
                                      "ui-dropdown-link",
                                      {
                                        key: index,
                                        on: {
                                          click: function ($event) {
                                            $event.preventDefault()
                                            return _vm.changePerPage(pages)
                                          },
                                        },
                                      },
                                      [
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "flex justify-between w-full items-center",
                                          },
                                          [
                                            _c("span", [_vm._v(_vm._s(pages))]),
                                            _vm._v(" "),
                                            pages === _vm.pagination.perPage
                                              ? _c("fa-icon", {
                                                  staticClass: "icon",
                                                  attrs: { icon: "check" },
                                                })
                                              : _vm._e(),
                                          ],
                                          1
                                        ),
                                      ]
                                    )
                                  }
                                ),
                              ]
                            },
                            proxy: true,
                          },
                        ],
                        null,
                        false,
                        1828232658
                      ),
                    },
                    [
                      _c("fa-icon", { attrs: { icon: "list" } }),
                      _vm._v(" "),
                      _c("span", { staticClass: "sr-only-mobile" }, [
                        _vm._v("View"),
                      ]),
                    ],
                    1
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "ui-toolbar-group",
                [
                  _c(
                    "ui-dropdown",
                    {
                      attrs: { noArrow: "", id: "sorting-options", right: "" },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "menu",
                            fn: function () {
                              return [
                                _c("ui-dropdown-item", [
                                  _c("p", [_vm._v("Sort by:")]),
                                ]),
                                _vm._v(" "),
                                _c("ui-dropdown-divider"),
                                _vm._v(" "),
                                _vm._l(_vm.sortable, function (column, index) {
                                  return _c(
                                    "ui-dropdown-link",
                                    {
                                      key: column + "-sort" || 0,
                                      on: {
                                        click: function ($event) {
                                          $event.preventDefault()
                                          return _vm.sortRecordsBy(
                                            column,
                                            _vm.sort.order
                                          )
                                        },
                                      },
                                    },
                                    [
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "flex justify-between w-full items-center",
                                        },
                                        [
                                          _c("span", [
                                            _vm._v(
                                              _vm._s(
                                                _vm.column_names[column] ||
                                                  column
                                              )
                                            ),
                                          ]),
                                          _vm._v(" "),
                                          _vm.sort.key === column
                                            ? _c("fa-icon", {
                                                staticClass: "icon",
                                                attrs: { icon: "check" },
                                              })
                                            : _vm._e(),
                                        ],
                                        1
                                      ),
                                    ]
                                  )
                                }),
                                _vm._v(" "),
                                _c("ui-dropdown-divider"),
                                _vm._v(" "),
                                _c(
                                  "ui-dropdown-link",
                                  {
                                    on: {
                                      click: function ($event) {
                                        $event.preventDefault()
                                        return _vm.sortRecordsBy(
                                          _vm.sort.key,
                                          "asc"
                                        )
                                      },
                                    },
                                  },
                                  [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "flex justify-between w-full items-center",
                                      },
                                      [
                                        _c("span", [_vm._v("Ascending")]),
                                        _vm._v(" "),
                                        _vm.sort.order === "asc"
                                          ? _c("fa-icon", {
                                              staticClass: "icon",
                                              attrs: { icon: "check" },
                                            })
                                          : _vm._e(),
                                      ],
                                      1
                                    ),
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "ui-dropdown-link",
                                  {
                                    on: {
                                      click: function ($event) {
                                        $event.preventDefault()
                                        return _vm.sortRecordsBy(
                                          _vm.sort.key,
                                          "desc"
                                        )
                                      },
                                    },
                                  },
                                  [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "flex justify-between w-full items-center",
                                      },
                                      [
                                        _c("span", [_vm._v("Descending")]),
                                        _vm._v(" "),
                                        _vm.sort.order === "desc"
                                          ? _c("fa-icon", {
                                              staticClass: "icon",
                                              attrs: { icon: "check" },
                                            })
                                          : _vm._e(),
                                      ],
                                      1
                                    ),
                                  ]
                                ),
                              ]
                            },
                            proxy: true,
                          },
                        ],
                        null,
                        false,
                        2962496269
                      ),
                    },
                    [
                      _c("fa-icon", { attrs: { icon: "sort-amount-down" } }),
                      _vm._v(" "),
                      _c("span", { staticClass: "sr-only-mobile" }, [
                        _vm._v("Sort"),
                      ]),
                    ],
                    1
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.show_order,
                      expression: "show_order",
                    },
                  ],
                },
                [
                  _c(
                    "ui-button",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.order === "Order",
                          expression: "order === 'Order' ",
                        },
                      ],
                      attrs: { disabled: _vm.loading },
                      on: {
                        click: function ($event) {
                          $event.preventDefault()
                          return _vm.toggleOrder.apply(null, arguments)
                        },
                      },
                    },
                    [
                      _c("fa-icon", {
                        staticClass: "mr-1",
                        attrs: { icon: "ellipsis-v" },
                      }),
                      _vm._v(_vm._s(_vm.order)),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "ui-button",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.order === "Save",
                          expression: "order === 'Save' ",
                        },
                      ],
                      attrs: { disabled: _vm.loading, variant: "primary" },
                      on: {
                        click: function ($event) {
                          $event.preventDefault()
                          return _vm.toggleOrder.apply(null, arguments)
                        },
                      },
                    },
                    [
                      _c("fa-icon", {
                        staticClass: "mr-1",
                        attrs: { icon: "ellipsis-v" },
                      }),
                      _vm._v(_vm._s(_vm.order)),
                    ],
                    1
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _vm._t("toolbarAppend"),
            ],
            2
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.loading,
              expression: "loading",
            },
          ],
          staticClass: "pb-2",
        },
        [_vm._v("Loading...")]
      ),
      _vm._v(" "),
      _vm.records.length
        ? _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.order === "Order",
                  expression: "order === 'Order' ",
                },
              ],
              staticClass: "table-wrapper",
              class: { loading: _vm.loading },
            },
            [
              _c(
                "table",
                {
                  staticClass: "table",
                  attrs: { id: _vm.id, "aria-live": "polite" },
                },
                [
                  _c("thead", [
                    _c(
                      "tr",
                      [
                        _vm.hasBulkActions
                          ? _c("th", { attrs: { width: "50px" } }, [
                              _c(
                                "div",
                                { staticClass: "table__select-all" },
                                [
                                  _c("ui-checkbox", {
                                    attrs: {
                                      name: "toggle-select-all",
                                      id: "toggle-select-all",
                                      checked:
                                        _vm.selectable.length ===
                                        _vm.selected.length,
                                      indeterminate:
                                        _vm.selected.length > 0 &&
                                        _vm.selectable.length !==
                                          _vm.selected.length,
                                    },
                                    on: { input: _vm.toggleSelectAll },
                                  }),
                                ],
                                1
                              ),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm._l(_vm.displayable, function (column, index) {
                          var _obj
                          return _c(
                            "th",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: !_vm.hasSelections,
                                  expression: "! hasSelections",
                                },
                              ],
                              key: column[_vm.primaryKey] || index,
                              class:
                                ((_obj = {
                                  sortable: _vm.isSortable(column),
                                  active: _vm.sort.key === column,
                                  "w-96": column === "url",
                                }),
                                (_obj["th-" + column] = true),
                                _obj),
                            },
                            [
                              _vm.isSortable(column)
                                ? _c(
                                    "a",
                                    {
                                      staticClass:
                                        "table__heading table__heading--link",
                                      attrs: {
                                        href: "#",
                                        "aria-label":
                                          "Sort by " +
                                            _vm.column_names[column] || 0,
                                      },
                                      on: {
                                        click: function ($event) {
                                          $event.preventDefault()
                                          _vm.isSortable(column) &&
                                            _vm.sortRecordsBy(column)
                                        },
                                      },
                                    },
                                    [
                                      _c("span", [
                                        _vm._v(
                                          _vm._s(
                                            _vm.column_names[column] || column
                                          )
                                        ),
                                      ]),
                                      _vm._v(" "),
                                      _vm.isSortable(column)
                                        ? _c(
                                            "div",
                                            {
                                              staticClass: "inline",
                                              attrs: { "aria-hidden": "true" },
                                            },
                                            [
                                              _vm.sort.key !== column
                                                ? _c("fa-icon", {
                                                    staticClass: "fa-fw",
                                                    attrs: { icon: "sort" },
                                                  })
                                                : _vm._e(),
                                              _vm._v(" "),
                                              _vm.sort.order === "asc" &&
                                              _vm.sort.key === column
                                                ? _c("fa-icon", {
                                                    staticClass: "fa-fw",
                                                    attrs: { icon: "sort-up" },
                                                  })
                                                : _vm._e(),
                                              _vm._v(" "),
                                              _vm.sort.order === "desc" &&
                                              _vm.sort.key === column
                                                ? _c("fa-icon", {
                                                    staticClass: "fa-fw",
                                                    attrs: {
                                                      icon: "sort-down",
                                                    },
                                                  })
                                                : _vm._e(),
                                            ],
                                            1
                                          )
                                        : _vm._e(),
                                    ]
                                  )
                                : _c(
                                    "span",
                                    { staticClass: "table__heading" },
                                    [
                                      _vm._v(
                                        "\n                            " +
                                          _vm._s(
                                            _vm.column_names[column] || column
                                          ) +
                                          "\n                        "
                                      ),
                                    ]
                                  ),
                            ]
                          )
                        }),
                        _vm._v(" "),
                        _c(
                          "th",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: _vm.hasSelections,
                                expression: "hasSelections",
                              },
                            ],
                            attrs: {
                              colspan: _vm.hasActions
                                ? _vm.displayable.length + 1
                                : _vm.displayable.length,
                            },
                          },
                          [
                            _c(
                              "span",
                              { staticClass: "table__heading flex" },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(this.selected.length) +
                                    " record" +
                                    _vm._s(
                                      this.selected.length > 1 ? "s" : ""
                                    ) +
                                    " selected\n                        \n                            "
                                ),
                                _vm._t(
                                  "bulkActions",
                                  function () {
                                    return [
                                      _c("div", { staticClass: "ml-auto" }, [
                                        _c(
                                          "select",
                                          {
                                            directives: [
                                              {
                                                name: "model",
                                                rawName: "v-model",
                                                value: _vm.action,
                                                expression: "action",
                                              },
                                            ],
                                            staticClass:
                                              "field-select field-select--sm field-select--bordered",
                                            attrs: {
                                              name: "bulk-actions",
                                              id: "bulk-actions",
                                            },
                                            on: {
                                              change: [
                                                function ($event) {
                                                  var $$selectedVal =
                                                    Array.prototype.filter
                                                      .call(
                                                        $event.target.options,
                                                        function (o) {
                                                          return o.selected
                                                        }
                                                      )
                                                      .map(function (o) {
                                                        var val =
                                                          "_value" in o
                                                            ? o._value
                                                            : o.value
                                                        return val
                                                      })
                                                  _vm.action = $event.target
                                                    .multiple
                                                    ? $$selectedVal
                                                    : $$selectedVal[0]
                                                },
                                                function ($event) {
                                                  _vm.showBulkActionConfirmation = true
                                                },
                                              ],
                                            },
                                          },
                                          [
                                            _c(
                                              "option",
                                              {
                                                attrs: {
                                                  selected: "",
                                                  disabled: "",
                                                },
                                                domProps: { value: null },
                                              },
                                              [_vm._v("Bulk Actions")]
                                            ),
                                            _vm._v(" "),
                                            _vm._l(
                                              _vm.allowedBulkActions,
                                              function (action, index) {
                                                return _c(
                                                  "option",
                                                  {
                                                    key: action.name,
                                                    domProps: { value: index },
                                                  },
                                                  [_vm._v(_vm._s(action.name))]
                                                )
                                              }
                                            ),
                                          ],
                                          2
                                        ),
                                      ]),
                                      _vm._v(" "),
                                      _c(
                                        "portal",
                                        { attrs: { to: "modals" } },
                                        [
                                          _vm.action !== null
                                            ? _c(
                                                "ui-modal",
                                                {
                                                  attrs: {
                                                    name: "confirm-bulk-action",
                                                    title:
                                                      "Confirm Bulk " +
                                                      _vm.allowedBulkActions[
                                                        _vm.action
                                                      ].name,
                                                  },
                                                  scopedSlots: _vm._u(
                                                    [
                                                      {
                                                        key: "footer",
                                                        fn: function () {
                                                          return [
                                                            _c(
                                                              "ui-button",
                                                              {
                                                                staticClass:
                                                                  "ml-3",
                                                                attrs: {
                                                                  loading:
                                                                    _vm.working,
                                                                  variant:
                                                                    "primary",
                                                                },
                                                                on: {
                                                                  click:
                                                                    function (
                                                                      $event
                                                                    ) {
                                                                      $event.preventDefault()
                                                                      return _vm.confirmBulkAction.apply(
                                                                        null,
                                                                        arguments
                                                                      )
                                                                    },
                                                                },
                                                              },
                                                              [
                                                                _vm._v(
                                                                  "Confirm"
                                                                ),
                                                              ]
                                                            ),
                                                            _vm._v(" "),
                                                            !_vm.working
                                                              ? _c(
                                                                  "ui-button",
                                                                  {
                                                                    attrs: {
                                                                      variant:
                                                                        "secondary",
                                                                    },
                                                                    on: {
                                                                      click:
                                                                        function (
                                                                          $event
                                                                        ) {
                                                                          $event.preventDefault()
                                                                          return _vm.cancelBulkAction.apply(
                                                                            null,
                                                                            arguments
                                                                          )
                                                                        },
                                                                    },
                                                                  },
                                                                  [
                                                                    _vm._v(
                                                                      "Cancel"
                                                                    ),
                                                                  ]
                                                                )
                                                              : _vm._e(),
                                                          ]
                                                        },
                                                        proxy: true,
                                                      },
                                                    ],
                                                    null,
                                                    false,
                                                    907495711
                                                  ),
                                                  model: {
                                                    value:
                                                      _vm.showBulkActionConfirmation,
                                                    callback: function ($$v) {
                                                      _vm.showBulkActionConfirmation =
                                                        $$v
                                                    },
                                                    expression:
                                                      "showBulkActionConfirmation",
                                                  },
                                                },
                                                [
                                                  _c("p", [
                                                    _vm._v(
                                                      "Are you sure you want to perform this action against "
                                                    ),
                                                    _c("b", [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.selected.length
                                                        )
                                                      ),
                                                    ]),
                                                    _vm._v(
                                                      " record" +
                                                        _vm._s(
                                                          _vm.selected.length >
                                                            1
                                                            ? "s"
                                                            : ""
                                                        ) +
                                                        "?"
                                                    ),
                                                  ]),
                                                ]
                                              )
                                            : _vm._e(),
                                        ],
                                        1
                                      ),
                                    ]
                                  },
                                  {
                                    allowedBulkActions: _vm.allowedBulkActions,
                                    selected: _vm.selected,
                                    parent: this,
                                  }
                                ),
                              ],
                              2
                            ),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "th",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: _vm.hasActions && !_vm.hasSelections,
                                expression: "hasActions && ! hasSelections",
                              },
                            ],
                            staticClass: "w-20 col-actions",
                          },
                          [_vm._v(" ")]
                        ),
                      ],
                      2
                    ),
                  ]),
                  _vm._v(" "),
                  _c(
                    "tbody",
                    _vm._l(_vm.records, function (record, index) {
                      return _c(
                        "tr",
                        { key: record[_vm.primaryKey] || index },
                        [
                          _vm.hasBulkActions
                            ? _c("td", [
                                _c(
                                  "div",
                                  { staticClass: "flex flex-1" },
                                  [
                                    _vm.isSelectable(record[_vm.primaryKey])
                                      ? _c("ui-checkbox", {
                                          attrs: {
                                            name:
                                              "select-" +
                                                record[_vm.primaryKey] || 0,
                                            id:
                                              "select-" +
                                                record[_vm.primaryKey] || 0,
                                            "native-value":
                                              record[_vm.primaryKey],
                                          },
                                          model: {
                                            value: _vm.selected,
                                            callback: function ($$v) {
                                              _vm.selected = $$v
                                            },
                                            expression: "selected",
                                          },
                                        })
                                      : _vm._e(),
                                  ],
                                  1
                                ),
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          _vm._l(_vm.displayable, function (column) {
                            return _c(
                              "td",
                              { key: column, class: "td-" + column },
                              [
                                _c("span", { staticClass: "column-label" }, [
                                  _vm._v(
                                    _vm._s(_vm.column_names[column] || column)
                                  ),
                                ]),
                                _vm._v(" "),
                                _vm._t(
                                  column,
                                  function () {
                                    return [
                                      _vm.column_types[column] &&
                                      _vm.isComponentExist(
                                        _vm.column_types[column]
                                      )
                                        ? _c(_vm.column_types[column], {
                                            tag: "component",
                                            attrs: {
                                              value: record[column],
                                              record: record,
                                            },
                                          })
                                        : _c("span", [
                                            _vm._v(_vm._s(record[column])),
                                          ]),
                                    ]
                                  },
                                  { record: record }
                                ),
                              ],
                              2
                            )
                          }),
                          _vm._v(" "),
                          _vm.hasActions
                            ? _c(
                                "td",
                                {
                                  staticClass:
                                    "'table__actions w-20 col-actions'",
                                },
                                [_vm._t("actions", null, { record: record })],
                                2
                              )
                            : _vm._e(),
                        ],
                        2
                      )
                    }),
                    0
                  ),
                ]
              ),
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.order === "Save" && !_vm.loading,
              expression: "order === 'Save' && ! loading",
            },
          ],
          staticClass: "mb-4 xl:mb-6",
        },
        [
          _c("VueNestable", {
            attrs: { threshold: 32 },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function (ref) {
                  var _obj

                  var item = ref.item
                  return [
                    _c(
                      "div",
                      { staticClass: "flex" },
                      [
                        _c(
                          "VueNestableHandle",
                          {
                            staticClass:
                              "flex items-center justify-center border-r w-8 text-gray-500 bg-gray-50 rounded-l",
                            attrs: { item: item },
                          },
                          [
                            _c("fa-icon", {
                              attrs: { icon: ["fas", "grip-vertical"] },
                            }),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "flex flex-1 items-center justify-between",
                          },
                          [
                            _c(
                              "div",
                              {
                                staticClass: "p-3 flex items-center",
                                class: {
                                  "font-bold":
                                    item.url == "" || item.url == "#",
                                },
                              },
                              [
                                _c("ui-status", {
                                  directives: [
                                    {
                                      name: "show",
                                      rawName: "v-show",
                                      value: _vm.show_status,
                                      expression: "show_status",
                                    },
                                  ],
                                  staticClass: "mr-2",
                                  attrs: { value: item.status },
                                }),
                                _vm._v(" "),
                                _c(
                                  "router-link",
                                  {
                                    attrs: {
                                      to: {
                                        name: _vm.link_name,
                                        params:
                                          ((_obj = {}),
                                          (_obj[_vm.link_param] = item.id),
                                          _obj),
                                      },
                                    },
                                  },
                                  [_vm._v(_vm._s(item.name))]
                                ),
                              ],
                              1
                            ),
                          ]
                        ),
                      ],
                      1
                    ),
                  ]
                },
              },
            ]),
            model: {
              value: _vm.records,
              callback: function ($$v) {
                _vm.records = $$v
              },
              expression: "records",
            },
          }),
        ],
        1
      ),
      _vm._v(" "),
      this.pagination.totalPages > 1
        ? _c("div", { staticClass: "pagination-group" }, [
            _vm.showPageStatus
              ? _c(
                  "div",
                  { staticClass: "pagination-group__item" },
                  [
                    _c("ui-pagination-status", {
                      attrs: {
                        total: this.pagination.totalPages,
                        value: this.pagination.currentPage,
                      },
                    }),
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.showPageNumbers || _vm.showPageNav || _vm.showPageEnds
              ? _c(
                  "div",
                  { staticClass: "pagination-group__item" },
                  [
                    _c("ui-pagination", {
                      attrs: {
                        showNumbers: _vm.showPageNumbers,
                        showNav: _vm.showPageNav,
                        showEnds: _vm.showPageEnds,
                        total: this.pagination.totalPages,
                        value: this.pagination.currentPage,
                      },
                      on: {
                        input: function ($event) {
                          return _vm.changePage($event)
                        },
                      },
                    }),
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            !_vm.hidePageSelect
              ? _c(
                  "div",
                  { staticClass: "pagination-group__item" },
                  [
                    _c("ui-pagination-select", {
                      attrs: {
                        label: _vm.pageSelectLabel,
                        total: this.pagination.totalPages,
                        value: this.pagination.currentPage,
                      },
                      on: {
                        input: function ($event) {
                          return _vm.changePage($event)
                        },
                      },
                    }),
                  ],
                  1
                )
              : _vm._e(),
          ])
        : _vm._e(),
      _vm._v(" "),
      !_vm.records.length && !_vm.initialLoad
        ? _c(
            "div",
            { staticClass: "no-bottom text-heading--md mb-0" },
            [
              _vm._t("empty-state", function () {
                return [_c("p", [_vm._v("No results found.")])]
              }),
            ],
            2
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