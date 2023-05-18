"use strict";
(self["webpackChunktinymcefieldtype"] = self["webpackChunktinymcefieldtype"] || []).push([["resources_js_components_AntFusionForm_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/AntFusionForm.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/AntFusionForm.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_Form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/Form */ "../../fusioncms/cms/resources/js/services/Form.js");
/* harmony import */ var _mixins_dependant_field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mixins/dependant-field */ "./resources/js/mixins/dependant-field.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  mixins: [_mixins_dependant_field__WEBPACK_IMPORTED_MODULE_1__["default"]],
  props: {
    classes: {},
    debug: {
      "default": false
    },
    name: {
      "default": '_antfusion_form'
    },
    loading: {
      "default": false
    },
    actions: {},
    children: {},
    fields: {},
    values: {
      "default": {}
    },
    errors: {
      "default": {}
    },
    syncDependantFieldUrl: {}
  },
  data: function data() {
    return {
      // componentsByHandle: {},
      form: new _services_Form__WEBPACK_IMPORTED_MODULE_0__["default"]()
    };
  },
  methods: {
    submitted: function submitted() {
      this.$emit('submitted', this.form);
    },
    refreshed: function refreshed() {
      bus().$emit('refresh-form', this.form);
    }
  },
  mounted: function mounted() {
    var _this = this;

    var form = {};

    _.each(this.fields, function (field) {
      form[field.handle] = _this.values[field.handle] || field["default"];
      console.log('field', field);
      console.log('set ' + field.handle, _this.values[field.handle], field["default"]);
      console.log('value', form[field.handle]);
    });

    this.form = new _services_Form__WEBPACK_IMPORTED_MODULE_0__["default"](form, true);
    this.form.errors.record({
      errors: this.errors
    }); // Register after the form is initialized

    this.registerComponentsDependency(this.children, this.form);
  },
  computed: {
    componentData: function componentData() {
      return this.form;
    }
  }
});

/***/ }),

/***/ "./resources/js/mixins/dependant-field.js":
/*!************************************************!*\
  !*** ./resources/js/mixins/dependant-field.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  methods: {
    registerComponentsDependency: function registerComponentsDependency(children, form) {
      var _this = this;

      _.each(children, function (component, fieldKey) {
        // this.$set(this.componentsByHandle, component.id, component)
        if (component.dependsOn) {
          _this.registerWatch(form, component, children, fieldKey);
        }

        if (component.children) {
          // console.log('register for children', component.children)
          _this.registerComponentsDependency(component.children, form);
        }
      });
    },
    registerWatch: function registerWatch(form, fieldToBeUpdated, fieldCollections, fieldKey) {
      var _this2 = this;

      fieldToBeUpdated.dependsOn.forEach(function (attribute) {
        // console.log('register watch for form ' + attribute)
        _this2.$watch('form.' + attribute, function (value, oldValue) {
          // form[attribute] = value
          // console.log('attribute '+ attribute + ' updated', form.data(), this.form.formdata())
          _this2.syncDependantFields(form, fieldToBeUpdated, attribute, fieldCollections, fieldKey);
        }, {
          deep: true
        });
      });
    },
    syncDependantFields: function syncDependantFields(form, fieldToBeUpdated, dependsOnAttribute, fieldCollections, fieldKey) {
      var _this3 = this;

      var params = {
        field: fieldToBeUpdated.handle,
        path: fieldToBeUpdated.path,
        attribute: dependsOnAttribute,
        form: form.data()
      }; // console.log('sync field', this.form.data(), form.data())

      axios.patch(this.syncDependantFieldUrl, params).then(function (response) {
        var field = response.data; // console.log('before', fieldCollections[fieldKey])

        _this3.$set(fieldCollections, fieldKey, field); // console.log('field updated '+ fieldKey)
        // console.log('after', fieldCollections[fieldKey])
        // this.$set(this.componentsByHandle, field.id, field)
        // console.log(field)

      });
    }
  }
});

/***/ }),

/***/ "../../fusioncms/cms/resources/js/services/Errors.js":
/*!***********************************************************!*\
  !*** ../../fusioncms/cms/resources/js/services/Errors.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Errors)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Errors = /*#__PURE__*/function () {
  function Errors() {
    var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Errors);

    this.errors = errors;
  }

  _createClass(Errors, [{
    key: "has",
    value: function has(field) {
      return this.errors.hasOwnProperty(field);
    }
  }, {
    key: "any",
    value: function any() {
      return Object.keys(this.errors).length > 0;
    }
  }, {
    key: "get",
    value: function get(field) {
      if (this.errors[field]) {
        return this.errors[field][0];
      }
    }
  }, {
    key: "record",
    value: function record(response) {
      this.errors = response.errors;
    }
  }, {
    key: "clear",
    value: function clear(field) {
      if (field) {
        delete this.errors[field];
        return;
      }

      this.errors = {};
    }
  }]);

  return Errors;
}();



/***/ }),

/***/ "../../fusioncms/cms/resources/js/services/Form.js":
/*!*********************************************************!*\
  !*** ../../fusioncms/cms/resources/js/services/Form.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Form)
/* harmony export */ });
/* harmony import */ var _services_Errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/Errors */ "../../fusioncms/cms/resources/js/services/Errors.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/store */ "../../fusioncms/cms/resources/js/store/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



/**
 * [Event]
 * Checks for updates to form.
 * 
 */

var onUpdate = _.debounce(function (obj) {
  var hasChanges = !_.isEqual(obj.orig, obj.data());
  if (obj.blockNav && obj.hasChanges != hasChanges) _store__WEBPACK_IMPORTED_MODULE_1__["default"].commit('form/setPreventNavigation', hasChanges);
  obj.hasChanges = hasChanges;
}, 250);
/**
 * Form object.
 * 
 */


var Form = /*#__PURE__*/function () {
  function Form(data) {
    var _this = this;

    var blockNav = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, Form);

    this.blockNav = blockNav;
    this.orig = data;
    this.errors = new _services_Errors__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.hasChanges = false; // --

    var form = this;
    var handler = {
      set: function set(obj, key, val, rcvr) {
        Reflect.set.apply(Reflect, arguments);
        onUpdate(form);
        return true;
      }
    };

    _.each(data, function (v, k) {
      _this[k] = _this.proxify(v, handler);
    });

    return new Proxy(this, handler);
  }

  _createClass(Form, [{
    key: "proxify",
    value: function proxify(data) {
      var _this2 = this;

      var handler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (_.isArray(data)) return _.map(data, function (v, k) {
        return _this2.proxify(v, handler);
      });else if (_.isObject(data)) return new Proxy(_.mapValues(data, function (v, k) {
        return _this2.proxify(v, handler);
      }), handler);
      return data;
    }
  }, {
    key: "data",
    value: function data() {
      var _this3 = this;

      return _.mapValues(this.orig, function (v, k) {
        return _this3[k];
      });
    }
  }, {
    key: "formdata",
    value: function formdata() {
      var additional = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var data = new FormData();
      var json = {};

      _.each(this.data(), function (v, k) {
        if (v instanceof FileList) _.each(v, function (val) {
          return data.append("".concat(k, "[]"), val);
        });else if (v instanceof File) data.append(k, v);else json[k] = v;
      }); // non-file data will be decoded on back-end..


      if (!_.isEmpty(json)) data.append('_json', JSON.stringify(json)); // add additional data..

      _.each(additional, function (v, k) {
        return data.append(k, v);
      });

      return data;
    }
  }, {
    key: "post",
    value: function post(url) {
      return this.submit('post', url, this.formdata());
    }
  }, {
    key: "patch",
    value: function patch(url) {
      return this.submit('post', url, this.formdata({
        '_method': 'PATCH'
      }));
    }
  }, {
    key: "put",
    value: function put(url) {
      return this.submit('post', url, this.formdata({
        '_method': 'PUT'
      }));
    }
  }, {
    key: "delete",
    value: function _delete(url) {
      return this.submit('post', url, this.formdata({
        '_method': 'DELETE'
      }));
    }
  }, {
    key: "submit",
    value: function submit(rType, url, data) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        axios[rType](url, data).then(function (response) {
          _this4.onSuccess(response.data);

          resolve(response.data);
        })["catch"](function (errors) {
          _this4.onFailure(errors.response.data);

          reject(errors.response.data);
        });
      });
    }
  }, {
    key: "onSuccess",
    value: function onSuccess(data) {
      this.orig = _.cloneDeep(this.data());
      this.hasChanges = false;
      this.errors.clear();
      if (this.blockNav) _store__WEBPACK_IMPORTED_MODULE_1__["default"].commit('form/setPreventNavigation', false);
    }
  }, {
    key: "onFailure",
    value: function onFailure(errors) {
      this.errors.record(errors);
    }
  }]);

  return Form;
}();



/***/ }),

/***/ "../../fusioncms/cms/resources/js/store/auth.js":
/*!******************************************************!*\
  !*** ../../fusioncms/cms/resources/js/store/auth.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'js-cookie'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: {
    user: null,
    isAuthenticated: false,
    requiresAuth: null
  },
  getters: {
    getUser: function getUser(state) {
      return state.user;
    },
    isAuthenticated: function isAuthenticated(state) {
      return state.isAuthenticated;
    },
    requiresAuth: function requiresAuth(state) {
      return state.requiresAuth;
    }
  },
  mutations: {
    setUser: function setUser(state, user) {
      state.user = user;
    },
    setIsAuthenticated: function setIsAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    setRequiresAuth: function setRequiresAuth(state, requiresAuth) {
      state.requiresAuth = requiresAuth;
    }
  },
  actions: {
    authenticate: function authenticate(_ref, payload) {
      var state = _ref.state,
          rootState = _ref.rootState,
          commit = _ref.commit;
      var session = Object(function webpackMissingModule() { var e = new Error("Cannot find module 'js-cookie'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('XSRF-TOKEN'); // Is session still alive?

      var user = state.user; // Has `user` been set?

      var isAuthenticated = !!session && !!user;
      commit('setIsAuthenticated', isAuthenticated); // ...for guests only.

      if (state.requiresAuth == true && !state.isAuthenticated) {
        Fusion.router.push(payload.guestNext);
      } // ...for admins only.


      if (state.requiresAuth == false && state.isAuthenticated) {
        Fusion.router.push(payload.adminNext);
      }
    }
  }
});

/***/ }),

/***/ "../../fusioncms/cms/resources/js/store/blueprint.js":
/*!***********************************************************!*\
  !*** ../../fusioncms/cms/resources/js/store/blueprint.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: {
    remove_index: null
  },
  getters: {
    getRemoveIndex: function getRemoveIndex(state) {
      return state.remove_index;
    }
  },
  mutations: {
    setRemoveIndex: function setRemoveIndex(state, remove_index) {
      state.remove_index = remove_index;
    }
  }
});

/***/ }),

/***/ "../../fusioncms/cms/resources/js/store/disks.js":
/*!*******************************************************!*\
  !*** ../../fusioncms/cms/resources/js/store/disks.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: {
    disks: []
  },
  getters: {
    getDisks: function getDisks(state) {
      return state.disks;
    }
  },
  mutations: {
    setDisks: function setDisks(state, disks) {
      state.disks = disks;
    }
  },
  actions: {
    fetchDisks: function fetchDisks(context) {
      axios.get('/api/disks').then(function (response) {
        return context.commit('setDisks', response.data.data);
      })["catch"](function (error) {
        return console.log(error);
      });
    }
  }
});

/***/ }),

/***/ "../../fusioncms/cms/resources/js/store/fieldtypes.js":
/*!************************************************************!*\
  !*** ../../fusioncms/cms/resources/js/store/fieldtypes.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: {
    structure: false,
    structures: {},
    fieldtypes: {}
  },
  getters: {
    getFilteredFieldtypes: function getFilteredFieldtypes(state) {
      var fieldtypes = {};

      if (state.structure && _.has(state.structures, state.structure)) {
        fieldtypes = _.reject(state.fieldtypes, function (fieldtype) {
          var structure = state.structures[state.structure];
          var excluded = structure.excluded;
          return excluded.includes(fieldtype.handle);
        });
      }

      return _.keyBy(fieldtypes, 'handle');
    },
    getFieldtypes: function getFieldtypes(state) {
      return state.fieldtypes;
    },
    getStructures: function getStructures(state) {
      return state.structures;
    }
  },
  mutations: {
    setStructure: function setStructure(state, structure) {
      state.structure = _.isEmpty(structure) ? false : structure;
    },
    setStructures: function setStructures(state, structures) {
      state.structures = _.keyBy(structures, 'handle');
    },
    setFieldtypes: function setFieldtypes(state, fieldtypes) {
      state.fieldtypes = _.keyBy(fieldtypes, 'handle');
    },
    updateStructure: function updateStructure(state, payload) {
      if (_.has(state.structures, payload.handle)) {
        state.structures[payload.handle] = payload.structure;
      }
    }
  },
  actions: {
    updateStructure: function updateStructure(_ref, payload) {
      var commit = _ref.commit;
      commit('updateStructure', payload);
    },
    fetch: function fetch(_ref2) {
      var state = _ref2.state,
          commit = _ref2.commit;
      axios.all([axios.get('/api/structures'), axios.get('/api/fieldtypes')]).then(axios.spread(function (structures, fieldtypes) {
        commit('setStructures', structures.data.data);
        commit('setFieldtypes', fieldtypes.data.data);
      }));
    }
  }
});

/***/ }),

/***/ "../../fusioncms/cms/resources/js/store/filemanager.js":
/*!*************************************************************!*\
  !*** ../../fusioncms/cms/resources/js/store/filemanager.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'lodash'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: {
    disk: {},
    loading: true,
    files: [],
    directory: 0,
    directories: [],
    selected: {
      files: [],
      directories: []
    },
    rootDirectory: 0,
    currentDirectory: 0,
    parentDirectory: 0,
    breadcrumbs: [],
    search: '',
    display: 'everything',
    sort: 'name',
    direction: 'asc',
    view: 'grid',
    currentPage: 1,
    totalPages: 1,
    uploadProgress: 0,
    uploadsVisible: false,
    uploadsMinimized: false,
    fileUploads: [],
    dropzoneVisible: false,
    dropzoneEnabled: true
  },
  getters: {
    getDisk: function getDisk(state) {
      return state.disk;
    },
    getLoading: function getLoading(state) {
      return state.loading;
    },
    getFiles: function getFiles(state) {
      return state.files;
    },
    getDirectories: function getDirectories(state) {
      return state.directories;
    },
    getBreadcrumbs: function getBreadcrumbs(state) {
      return state.breadcrumbs;
    },
    getView: function getView(state) {
      return state.view;
    },
    getSearch: function getSearch(state) {
      return state.search;
    },
    getRootDirectory: function getRootDirectory(state) {
      return state.rootDirectory;
    },
    getCurrentDirectory: function getCurrentDirectory(state) {
      return state.currentDirectory;
    },
    getParentDirectory: function getParentDirectory(state) {
      return state.parentDirectory;
    },
    getDisplay: function getDisplay(state) {
      return state.display;
    },
    getSort: function getSort(state) {
      return state.sort;
    },
    getDirection: function getDirection(state) {
      return state.direction;
    },
    getSelectedFiles: function getSelectedFiles(state) {
      return state.selected.files;
    },
    getSelectedDirectories: function getSelectedDirectories(state) {
      return state.selected.directories;
    },
    hasSelection: function hasSelection(state) {
      return state.selected.files.length + state.selected.directories.length > 0;
    },
    selectionCount: function selectionCount(state) {
      return state.selected.files.length + state.selected.directories.length;
    },
    getCurrentPage: function getCurrentPage(state) {
      return state.currentPage;
    },
    getTotalPages: function getTotalPages(state) {
      return state.totalPages;
    },
    getUploadProgress: function getUploadProgress(state) {
      return state.uploadProgress;
    },
    getUploadsVisible: function getUploadsVisible(state) {
      return state.uploadsVisible;
    },
    getUploadsMinimized: function getUploadsMinimized(state) {
      return state.uploadsMinimized;
    },
    getFileUploads: function getFileUploads(state) {
      return state.fileUploads;
    },
    getDropzoneVisible: function getDropzoneVisible(state) {
      return state.dropzoneVisible && state.dropzoneEnabled;
    },
    getFileFilters: function getFileFilters(state) {
      return {
        'filter[directory_id]': state.currentDirectory,
        'filter[display]': state.display !== 'everything' ? state.display : null,
        'filter[search]': state.search !== '' ? state.search : null,
        'sort': (state.direction === 'asc' ? '' : '-') + state.sort,
        'page': state.currentPage,
        'perPage': state.perPage
      };
    },
    getDirectoryFilters: function getDirectoryFilters(state) {
      return {
        'filter[search]': state.search !== '' ? state.search : null,
        'filter[parent_id]': state.currentDirectory,
        'sort': state.sort == 'name' ? state.direction === 'asc' ? 'name' : '-name' : null
      };
    }
  },
  mutations: {
    setDisk: function setDisk(state, disk) {
      state.disk = disk;
    },
    setLoading: function setLoading(state, loading) {
      state.loading = loading;
    },
    setFiles: function setFiles(state, files) {
      state.files = files;
    },
    setDirectory: function setDirectory(state, directory) {
      state.directory = directory;
    },
    setDirectories: function setDirectories(state, directories) {
      state.directories = directories;
    },
    setRootDirectory: function setRootDirectory(state, directory) {
      state.rootDirectory = directory;
    },
    setCurrentDirectory: function setCurrentDirectory(state, directory) {
      state.currentDirectory = directory;
    },
    setParentDirectory: function setParentDirectory(state, directory) {
      state.parentDirectory = directory;
    },
    setBreadcrumbs: function setBreadcrumbs(state, breadcrumbs) {
      state.breadcrumbs = breadcrumbs;
    },
    setView: function setView(state, view) {
      state.view = view;
    },
    setSearch: function setSearch(state, query) {
      state.search = query;
    },
    setDisplay: function setDisplay(state, display) {
      state.display = display;
    },
    setSort: function setSort(state, sortBy) {
      state.sort = sortBy;
    },
    setDirection: function setDirection(state, direction) {
      state.direction = direction;
    },
    addFile: function addFile(state, file) {
      state.files.push(file);
    },
    toggleFileSelection: function toggleFileSelection(state, file) {
      state.selected.files = Object(function webpackMissingModule() { var e = new Error("Cannot find module 'lodash'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(state.selected.files, [file]);
    },
    clearFileSelection: function clearFileSelection(state) {
      state.selected.files = [];
    },
    toggleDirectorySelection: function toggleDirectorySelection(state, directory) {
      state.selected.directories = Object(function webpackMissingModule() { var e = new Error("Cannot find module 'lodash'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(state.selected.directories, [directory]);
    },
    clearDirectorySelection: function clearDirectorySelection(state) {
      state.selected.directories = [];
    },
    removeFiles: function removeFiles(state, files) {
      Object(function webpackMissingModule() { var e = new Error("Cannot find module 'lodash'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(files, function (id) {
        var index = Object(function webpackMissingModule() { var e = new Error("Cannot find module 'lodash'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(state.files, function (file) {
          return file.id == id;
        });

        state.files.splice(index, 1);
      });
    },
    clearFiles: function clearFiles(state) {
      state.files = [];
    },
    setCurrentPage: function setCurrentPage(state, page) {
      state.currentPage = page;
    },
    setTotalPages: function setTotalPages(state, pages) {
      state.totalPages = pages;
    },
    setUploadProgress: function setUploadProgress(state, progress) {
      state.uploadProgress = progress;
    },
    setUploadsMinimized: function setUploadsMinimized(state, value) {
      state.uploadsMinimized = value;
    },
    setUploadsVisible: function setUploadsVisible(state, value) {
      state.uploadsVisible = value;
    },
    setFileUploads: function setFileUploads(state, files) {
      state.fileUploads = files;
    },
    addFileUpload: function addFileUpload(state, file) {
      state.fileUploads.push(file);
    },
    setDropzoneVisible: function setDropzoneVisible(state, value) {
      state.dropzoneVisible = value;
    },
    setDropzoneEnabled: function setDropzoneEnabled(state, value) {
      state.dropzoneEnabled = value;
    }
  },
  actions: {
    reset: function reset(_ref) {
      var commit = _ref.commit;
      commit('setRootDirectory', 0);
      commit('setCurrentDirectory', null);
      commit('setParentDirectory', null);
      commit('clearFileSelection');
      commit('clearDirectorySelection');
    },
    setLoading: function setLoading(context, loading) {
      context.commit('setLoading', loading);
    },
    setFiles: function setFiles(context, files) {
      context.commit('setFiles', files);
    },
    addFile: function addFile(context, file) {
      context.commit('addFile', file);
    },
    toggleFileSelection: function toggleFileSelection(context, file) {
      context.commit('toggleFileSelection', file);
    },
    toggleDirectorySelection: function toggleDirectorySelection(context, directory) {
      context.commit('toggleDirectorySelection', directory);
    },
    clearFiles: function clearFiles(context) {
      context.commit('clearFiles');
    },
    removeFiles: function removeFiles(context, files) {
      context.commit('removeFiles', files);
    },
    clearFileSelection: function clearFileSelection(context) {
      context.commit('clearFileSelection');
    },
    clearDirectorySelection: function clearDirectorySelection(context) {
      context.commit('clearDirectorySelection');
    },
    fetchDisk: function fetchDisk(_ref2, disk) {
      var commit = _ref2.commit,
          dispatch = _ref2.dispatch;
      axios.get("/api/disks/".concat(disk)).then(function (_ref3) {
        var data = _ref3.data;
        commit('setDisk', data.data);
        dispatch('fetchFilesAndDirectories');
      })["catch"](function (errors) {
        return console.log(errors);
      });
    },
    fetchFilesAndDirectories: Object(function webpackMissingModule() { var e = new Error("Cannot find module 'lodash'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(function (_ref4) {
      var state = _ref4.state,
          getters = _ref4.getters,
          commit = _ref4.commit,
          dispatch = _ref4.dispatch;
      commit('setLoading', true);
      var getDirectory = null;
      if (state.currentDirectory > 0) getDirectory = axios.get("/api/directories/".concat(state.disk.id, "/").concat(state.currentDirectory));
      axios.all([axios.get("/api/files/".concat(state.disk.id), {
        params: getters.getFileFilters
      }), axios.get("/api/directories/".concat(state.disk.id), {
        params: getters.getDirectoryFilters
      }), getDirectory]).then(axios.spread(function (files, directories, currentDirectory) {
        commit('setFiles', files.data.data);
        commit('setTotalPages', files.data.meta.last_page);
        commit('setDirectories', directories.data.data);
        commit('setDirectory', currentDirectory ? currentDirectory.data.data : null);
        commit('setLoading', false);
        dispatch('setBreadcrumbs');
      }))["catch"](function (errors) {
        console.error(errors);
      });
    }, 500),
    fetchFiles: Object(function webpackMissingModule() { var e = new Error("Cannot find module 'lodash'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(function (_ref5) {
      var state = _ref5.state,
          getters = _ref5.getters,
          commit = _ref5.commit,
          dispatch = _ref5.dispatch;
      commit('setLoading', true);
      var getDirectory = null;
      if (state.currentDirectory > 0) getDirectory = axios.get("/api/directories/".concat(state.disk.id, "/").concat(state.currentDirectory));
      axios.all([axios.get("/api/files/".concat(state.disk.id), {
        params: getters.getFileFilters
      }), getDirectory]).then(axios.spread(function (files, currentDirectory) {
        commit('setFiles', files.data.data);
        commit('setTotalPages', files.data.meta.last_page);
        commit('setDirectory', currentDirectory ? currentDirectory.data.data : null);
        commit('setLoading', false);
        dispatch('setBreadcrumbs');
      }))["catch"](function (errors) {
        console.error(errors);
      });
    }, 500),
    fetchDirectories: Object(function webpackMissingModule() { var e = new Error("Cannot find module 'lodash'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(function (_ref6) {
      var state = _ref6.state,
          getters = _ref6.getters,
          commit = _ref6.commit,
          dispatch = _ref6.dispatch;
      commit('setLoading', true);
      var getDirectory = null;
      if (state.currentDirectory > 0) getDirectory = axios.get("/api/directories/".concat(state.disk.id, "/").concat(state.currentDirectory));
      axios.all([axios.get("/api/directories/".concat(state.disk.id), {
        params: getters.getDirectoryFilters
      }), getDirectory]).then(axios.spread(function (directories, currentDirectory) {
        commit('setDirectories', directories.data.data);
        commit('setDirectory', currentDirectory ? currentDirectory.data.data : null);
        commit('setLoading', false);
        dispatch('setBreadcrumbs');
      }))["catch"](function (errors) {
        console.error(errors);
      });
    }, 500),
    moveFileToDirectory: function moveFileToDirectory(_ref7, payload) {
      var commit = _ref7.commit,
          state = _ref7.state,
          dispatch = _ref7.dispatch;
      axios.post("/api/files/".concat(state.disk.id, "/move"), {
        directory: payload.directory,
        moving: payload.moving
      }).then(function (response) {
        dispatch('fetchFilesAndDirectories');
        toast('File(s) have been successfully moved!', 'success');
      })["catch"](function (errors) {
        toast(errors.response.data.errors.moving[0], 'failed');
      });
    },
    setSearch: function setSearch(context, query) {
      context.commit('setSearch', query);
    },
    setDisplay: function setDisplay(context, display) {
      context.commit('setDisplay', display);
    },
    setSort: function setSort(context, sortBy) {
      context.commit('setSort', sortBy);
    },
    setDirection: function setDirection(context, direction) {
      context.commit('setDirection', direction);
    },
    setBreadcrumbs: function setBreadcrumbs(_ref8) {
      var state = _ref8.state,
          commit = _ref8.commit;
      var breadcrumbs = [];
      var directory = state.directory;
      var root = state.rootDirectory;

      while (Object(function webpackMissingModule() { var e = new Error("Cannot find module 'lodash'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(directory, 'id') && directory.id != root) {
        breadcrumbs.unshift(directory);
        directory = directory.parent;
      }

      if (root == 0) {
        breadcrumbs.unshift({
          id: null,
          name: 'Root'
        });
      } else {
        breadcrumbs.unshift(directory);
      }

      commit('setBreadcrumbs', breadcrumbs);
    },
    setDirectories: function setDirectories(context, directories) {
      context.commit('setDirectories', directories);
    },
    setRootDirectory: function setRootDirectory(context, directory) {
      context.commit('setRootDirectory', directory);
    },
    setCurrentDirectory: function setCurrentDirectory(context, directory) {
      context.commit('setCurrentDirectory', directory);
    },
    setParentDirectory: function setParentDirectory(context, directory) {
      context.commit('setParentDirectory', directory);
    },
    setCurrentPage: function setCurrentPage(context, page) {
      context.commit('setCurrentPage', page);
    },
    setTotalPages: function setTotalPages(context, pages) {
      context.commit('setTotalPages', pages);
    },
    setUploadProgress: function setUploadProgress(context, progress) {
      context.commit('setUploadProgress', progress);
    },
    setUploadsVisible: function setUploadsVisible(context, value) {
      context.commit('setUploadsVisible', value);
    },
    setUploadsMinimized: function setUploadsMinimized(context, value) {
      context.commit('setUploadsMinimized', value);
    },
    setFileUploads: function setFileUploads(context, files) {
      context.commit('fileUploads', files);
    },
    addFileUpload: function addFileUpload(context, file) {
      context.commit('addFileUpload', file);
    },
    setDropzoneVisible: function setDropzoneVisible(context, value) {
      context.commit('setDropzoneVisible', value);
    },
    setDropzoneEnabled: function setDropzoneEnabled(context, value) {
      context.commit('setDropzoneEnabled', value);
    },
    toggleView: function toggleView(context) {
      if (context.state.view === 'grid') {
        context.commit('setView', 'list');
      } else {
        context.commit('setView', 'grid');
      }
    },
    toggleDirection: function toggleDirection(context) {
      if (context.state.direction === 'asc') {
        context.commit('setDirection', 'desc');
      } else {
        context.commit('setDirection', 'asc');
      }
    }
  }
});

/***/ }),

/***/ "../../fusioncms/cms/resources/js/store/form.js":
/*!******************************************************!*\
  !*** ../../fusioncms/cms/resources/js/store/form.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: {
    preventNavigation: false,
    confirmModalVisible: false,
    confirmModalCallback: null
  },
  getters: {
    preventNavigation: function preventNavigation(state) {
      return state.preventNavigation;
    },
    confirmModalVisible: function confirmModalVisible(state) {
      return state.confirmModalVisible;
    },
    confirmModalCallback: function confirmModalCallback(state) {
      return state.confirmModalCallback;
    }
  },
  mutations: {
    setPreventNavigation: function setPreventNavigation(state, preventNavigation) {
      state.preventNavigation = preventNavigation;
    },
    setConfirmModalVisible: function setConfirmModalVisible(state, confirmModalVisible) {
      state.confirmModalVisible = confirmModalVisible;
    },
    setConfirmModalCallback: function setConfirmModalCallback(state, confirmModalCallback) {
      state.confirmModalCallback = confirmModalCallback;
    }
  }
});

/***/ }),

/***/ "../../fusioncms/cms/resources/js/store/fusion.js":
/*!********************************************************!*\
  !*** ../../fusioncms/cms/resources/js/store/fusion.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: {
    version: null
  },
  getters: {
    getVersion: function getVersion(state) {
      return state.version;
    },
    getConfig: function getConfig(state) {
      return state.config;
    }
  },
  mutations: {
    setVersion: function setVersion(state, version) {
      state.version = version;
    },
    setConfig: function setConfig(state, config) {
      state.config = config;
    }
  }
});

/***/ }),

/***/ "../../fusioncms/cms/resources/js/store/inbox.js":
/*!*******************************************************!*\
  !*** ../../fusioncms/cms/resources/js/store/inbox.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'lodash'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: {
    page: 1,
    totalPages: 1,
    form: {},
    forms: [],
    fields: [],
    response: {},
    responses: [],
    loading: false
  },
  getters: {
    getPage: function getPage(state) {
      return state.page;
    },
    getTotalPages: function getTotalPages(state) {
      return state.totalPages;
    },
    getLoading: function getLoading(state) {
      return state.loading;
    },
    getResponse: function getResponse(state) {
      return state.response;
    },
    getResponses: function getResponses(state) {
      return state.responses;
    },
    getForm: function getForm(state) {
      return state.form;
    },
    getForms: function getForms(state) {
      return state.forms;
    },
    getFields: function getFields(state) {
      return state.fields;
    }
  },
  mutations: {
    setPage: function setPage(state, page) {
      state.page = page;
    },
    setTotalPages: function setTotalPages(state, pages) {
      state.totalPages = pages;
    },
    setLoading: function setLoading(state, loading) {
      state.loading = loading;
    },
    setResponse: function setResponse(state, response) {
      state.response = response;
    },
    setResponses: function setResponses(state, responses) {
      state.responses = responses;
    },
    setForm: function setForm(state, form) {
      state.form = form;
    },
    setForms: function setForms(state, forms) {
      state.forms = forms;
    },
    setFields: function setFields(state, fields) {
      state.fields = fields;
    }
  },
  actions: {
    fetchForms: function fetchForms(context) {
      return axios.get('/api/forms').then(function (response) {
        context.commit('setForms', response.data.data);
      });
    },
    fetchResponses: function fetchResponses(context) {
      if (context.state.form.slug) {
        context.dispatch('isLoading');
        return axios.get('/api/forms/' + context.state.form.slug + '/responses?page=' + context.state.page).then(function (response) {
          context.commit('setResponses', response.data.data);
          context.commit('setTotalPages', response.data.meta.last_page);
          context.dispatch('doneLoading');
        });
      }
    },
    selectForm: function selectForm(context, form) {
      context.dispatch('reset');
      context.commit('setForm', form);
      context.dispatch('fetchResponses');
    },
    selectResponse: function selectResponse(context, response) {
      context.commit('setResponse', response);
      context.dispatch('extractFields', response);
    },
    clearResponse: function clearResponse(context) {
      context.commit('setResponse', {});
    },
    selectFirstResponse: function selectFirstResponse(context) {
      if (context.state.responses.length) {
        context.dispatch('selectResponse', Object(function webpackMissingModule() { var e = new Error("Cannot find module 'lodash'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(context.state.responses));
      }
    },
    extractFields: function extractFields(context, response) {
      var fields = [];
      var sections = response.form.blueprint.sections;

      Object(function webpackMissingModule() { var e = new Error("Cannot find module 'lodash'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(sections, function (section) {
        Object(function webpackMissingModule() { var e = new Error("Cannot find module 'lodash'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(section.fields, function (field) {
          fields.push(field);
        });
      });

      context.commit('setFields', fields);
    },
    isLoading: function isLoading(context) {
      context.commit('setLoading', true);
    },
    doneLoading: function doneLoading(context) {
      context.commit('setLoading', false);
    },
    jumpPage: function jumpPage(context, page) {
      context.commit('setPage', page);
    },
    nextPage: function nextPage(context) {
      if (context.state.page !== context.state.totalPages) {
        context.commit('setPage', context.state.page + 1);
      }
    },
    prevPage: function prevPage(context) {
      if (context.state.page !== 1) {
        context.commit('setPage', context.state.page - 1);
      }
    },
    firstPage: function firstPage(context) {
      context.commit('setPage', 1);
    },
    lastPage: function lastPage(context) {
      context.commit('setPage', context.state.totalPages);
    },
    reset: function reset(context) {
      context.commit('setPage', 1);
      context.commit('setTotalPages', 1);
      context.commit('setForm', {});
      context.commit('setFields', []);
      context.commit('setResponse', {});
      context.commit('setResponses', []);
      context.commit('setLoading', false);
    }
  }
});

/***/ }),

/***/ "../../fusioncms/cms/resources/js/store/index.js":
/*!*******************************************************!*\
  !*** ../../fusioncms/cms/resources/js/store/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'vue'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'vuex'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth */ "../../fusioncms/cms/resources/js/store/auth.js");
/* harmony import */ var _blueprint__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blueprint */ "../../fusioncms/cms/resources/js/store/blueprint.js");
/* harmony import */ var _disks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./disks */ "../../fusioncms/cms/resources/js/store/disks.js");
/* harmony import */ var _fieldtypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fieldtypes */ "../../fusioncms/cms/resources/js/store/fieldtypes.js");
/* harmony import */ var _filemanager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./filemanager */ "../../fusioncms/cms/resources/js/store/filemanager.js");
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./form */ "../../fusioncms/cms/resources/js/store/form.js");
/* harmony import */ var _fusion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./fusion */ "../../fusioncms/cms/resources/js/store/fusion.js");
/* harmony import */ var _inbox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./inbox */ "../../fusioncms/cms/resources/js/store/inbox.js");
/* harmony import */ var _navigation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./navigation */ "../../fusioncms/cms/resources/js/store/navigation.js");
/* harmony import */ var _notifications__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./notifications */ "../../fusioncms/cms/resources/js/store/notifications.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./settings */ "../../fusioncms/cms/resources/js/store/settings.js");













Object(function webpackMissingModule() { var e = new Error("Cannot find module 'vue'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'vuex'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new Object(function webpackMissingModule() { var e = new Error("Cannot find module 'vuex'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({
  modules: {
    auth: _auth__WEBPACK_IMPORTED_MODULE_1__["default"],
    blueprint: _blueprint__WEBPACK_IMPORTED_MODULE_2__["default"],
    disks: _disks__WEBPACK_IMPORTED_MODULE_3__["default"],
    fieldtypes: _fieldtypes__WEBPACK_IMPORTED_MODULE_4__["default"],
    filemanager: _filemanager__WEBPACK_IMPORTED_MODULE_5__["default"],
    form: _form__WEBPACK_IMPORTED_MODULE_6__["default"],
    fusion: _fusion__WEBPACK_IMPORTED_MODULE_7__["default"],
    inbox: _inbox__WEBPACK_IMPORTED_MODULE_8__["default"],
    navigation: _navigation__WEBPACK_IMPORTED_MODULE_9__["default"],
    notifications: _notifications__WEBPACK_IMPORTED_MODULE_10__["default"],
    settings: _settings__WEBPACK_IMPORTED_MODULE_11__["default"]
  }
}));

/***/ }),

/***/ "../../fusioncms/cms/resources/js/store/navigation.js":
/*!************************************************************!*\
  !*** ../../fusioncms/cms/resources/js/store/navigation.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: {
    navigation: []
  },
  getters: {
    getNavigation: function getNavigation(state) {
      return state.navigation;
    }
  },
  mutations: {
    SET_NAVIGATION: function SET_NAVIGATION(state, links) {
      state.navigation = links;
    }
  },
  actions: {
    fetchAdminNavigation: function fetchAdminNavigation(context) {
      axios.get('/api/admin/navigation').then(function (response) {
        context.commit('SET_NAVIGATION', response.data.data);
      })["catch"](function (error) {
        console.log('There was an error fetching the navigation...');
      });
    }
  }
});

/***/ }),

/***/ "../../fusioncms/cms/resources/js/store/notifications.js":
/*!***************************************************************!*\
  !*** ../../fusioncms/cms/resources/js/store/notifications.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: {
    channels: [],
    notifications: []
  },
  getters: {
    getChannels: function getChannels(state) {
      return state.channels;
    },
    getNotifications: function getNotifications(state) {
      return state.notifications;
    }
  },
  mutations: {
    setChannels: function setChannels(state, channels) {
      state.channels = channels;
    },
    setNotifications: function setNotifications(state, notifications) {
      state.notifications = notifications;
    }
  },
  actions: {
    fetch: function fetch(_ref) {
      var commit = _ref.commit;
      axios.all([axios.get('/api/channels'), axios.get('/api/notifications')]).then(axios.spread(function (channels, notifications) {
        commit('setChannels', channels.data.data);
        commit('setNotifications', notifications.data.data);
      }));
    }
  }
});

/***/ }),

/***/ "../../fusioncms/cms/resources/js/store/settings.js":
/*!**********************************************************!*\
  !*** ../../fusioncms/cms/resources/js/store/settings.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: {
    groups: {},
    settings: {}
  },
  getters: {
    getGroup: function getGroup(state) {
      return function (key) {
        return state.groups[key];
      };
    },
    getGroups: function getGroups(state) {
      return state.groups;
    },
    getGroupSections: function getGroupSections(state) {
      return _.groupBy(state.groups, 'group');
    },
    getSetting: function getSetting(state) {
      return function (key) {
        return state.settings[key];
      };
    },
    getSettings: function getSettings(state) {
      return state.settings;
    }
  },
  mutations: {
    setGroups: function setGroups(state, payload) {
      state.groups = _.keyBy(payload, 'handle');
    },
    setSettings: function setSettings(state, payload) {
      var items = _.map(payload, 'settings');

      var settings = {};

      _.forEach(items, function (item) {
        return _.merge(settings, item);
      });

      state.settings = settings;
    }
  },
  actions: {
    fetchSettings: function fetchSettings(context) {
      axios.get('/api/settings').then(function (response) {
        context.commit('setGroups', response.data.data);
        context.commit('setSettings', response.data.data);
      })["catch"](function (error) {
        console.error('There was an error fetching the system settings...');
        console.error(error.message);
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/components/AntFusionForm.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/AntFusionForm.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AntFusionForm_vue_vue_type_template_id_31989854___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AntFusionForm.vue?vue&type=template&id=31989854& */ "./resources/js/components/AntFusionForm.vue?vue&type=template&id=31989854&");
/* harmony import */ var _AntFusionForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AntFusionForm.vue?vue&type=script&lang=js& */ "./resources/js/components/AntFusionForm.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AntFusionForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AntFusionForm_vue_vue_type_template_id_31989854___WEBPACK_IMPORTED_MODULE_0__.render,
  _AntFusionForm_vue_vue_type_template_id_31989854___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/AntFusionForm.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/AntFusionForm.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/AntFusionForm.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AntFusionForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AntFusionForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/AntFusionForm.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AntFusionForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/AntFusionForm.vue?vue&type=template&id=31989854&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/AntFusionForm.vue?vue&type=template&id=31989854& ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AntFusionForm_vue_vue_type_template_id_31989854___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AntFusionForm_vue_vue_type_template_id_31989854___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AntFusionForm_vue_vue_type_template_id_31989854___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AntFusionForm.vue?vue&type=template&id=31989854& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/AntFusionForm.vue?vue&type=template&id=31989854&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/AntFusionForm.vue?vue&type=template&id=31989854&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/AntFusionForm.vue?vue&type=template&id=31989854& ***!
  \*************************************************************************************************************************************************************************************************************************/
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
      _c("portal", { attrs: { to: "actions" } }, [
        _c(
          "span",
          { staticClass: "print:hidden" },
          _vm._l(_vm.actions, function (action, index) {
            return _c(
              action.component,
              _vm._b(
                {
                  key: index,
                  tag: "component",
                  attrs: { loading: _vm.loading, parent: _vm.componentData },
                  on: {
                    load: function ($event) {
                      return _vm.$emit("load")
                    },
                    loaded: function ($event) {
                      return _vm.$emit("loaded")
                    },
                    submitted: _vm.submitted,
                    refreshed: _vm.refreshed,
                  },
                },
                "component",
                action,
                false
              ),
              [
                _vm._v(
                  "\n                " + _vm._s(action.text) + "\n            "
                ),
              ]
            )
          }),
          1
        ),
      ]),
      _vm._v(" "),
      _vm.debug ? _c("div", [_vm._v(_vm._s(_vm.form))]) : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        { class: _vm.classes },
        [
          _vm._l(_vm.children, function (field) {
            return [
              !field.is_panel
                ? _c(
                    field.component,
                    _vm._b(
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: !field.hide,
                            expression: "!field.hide",
                          },
                        ],
                        key: field.id,
                        tag: "component",
                        attrs: {
                          loading: _vm.loading,
                          parent: _vm.componentData,
                          form: _vm.form,
                          "has-error": _vm.form.errors.has(field.handle),
                          "error-message": _vm.form.errors.get(field.handle),
                        },
                        on: {
                          refreshed: _vm.refreshed,
                          load: function ($event) {
                            return _vm.$emit("load")
                          },
                          loaded: function ($event) {
                            return _vm.$emit("loaded")
                          },
                        },
                        model: {
                          value: _vm.form[field.handle],
                          callback: function ($$v) {
                            _vm.$set(_vm.form, field.handle, $$v)
                          },
                          expression: "form[field.handle]",
                        },
                      },
                      "component",
                      field,
                      false
                    ),
                    [
                      _vm._v(
                        "\n            " + _vm._s(field.text) + "\n        "
                      ),
                    ]
                  )
                : _c(
                    field.component,
                    _vm._b(
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: !field.hide,
                            expression: "!field.hide",
                          },
                        ],
                        key: field.id,
                        tag: "component",
                        attrs: {
                          form: _vm.form,
                          "sync-dependant-field-url": _vm.syncDependantFieldUrl,
                        },
                        on: { refreshed: _vm.refreshed },
                      },
                      "component",
                      field,
                      false
                    ),
                    [
                      _vm._v(
                        "\n            " + _vm._s(field.text) + "\n        "
                      ),
                    ]
                  ),
            ]
          }),
        ],
        2
      ),
      _vm._v(" "),
      _c("input", {
        attrs: { type: "hidden", name: _vm.name },
        domProps: { value: JSON.stringify(this.form.data()) },
      }),
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