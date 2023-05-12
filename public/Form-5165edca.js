import { watch, effectScope, reactive, computed } from "vue";
import { g as getDefaultExportFromCjs } from "./_commonjsHelpers-7a77ea84.js";
import { _ as _$1 } from "./lodash-7a9c3582.js";
class Errors {
  constructor(errors = {}) {
    this.errors = errors;
  }
  has(field) {
    return this.errors.hasOwnProperty(field);
  }
  any() {
    return Object.keys(this.errors).length > 0;
  }
  get(field) {
    if (this.errors[field]) {
      return this.errors[field][0];
    }
  }
  record(response) {
    this.errors = response.errors;
  }
  clear(field) {
    if (field) {
      delete this.errors[field];
      return;
    }
    this.errors = {};
  }
}
function getDevtoolsGlobalHook() {
  return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function getTarget() {
  return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
}
const isProxyAvailable = typeof Proxy === "function";
const HOOK_SETUP = "devtools-plugin:setup";
const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
let supported;
let perf;
function isPerformanceSupported() {
  var _a;
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else if (typeof global !== "undefined" && ((_a = global.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
    supported = true;
    perf = global.perf_hooks.performance;
  } else {
    supported = false;
  }
  return supported;
}
function now() {
  return isPerformanceSupported() ? perf.now() : Date.now();
}
class ApiProxy {
  constructor(plugin, hook) {
    this.target = null;
    this.targetQueue = [];
    this.onQueue = [];
    this.plugin = plugin;
    this.hook = hook;
    const defaultSettings = {};
    if (plugin.settings) {
      for (const id in plugin.settings) {
        const item = plugin.settings[id];
        defaultSettings[id] = item.defaultValue;
      }
    }
    const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
    let currentSettings = Object.assign({}, defaultSettings);
    try {
      const raw = localStorage.getItem(localSettingsSaveId);
      const data = JSON.parse(raw);
      Object.assign(currentSettings, data);
    } catch (e) {
    }
    this.fallbacks = {
      getSettings() {
        return currentSettings;
      },
      setSettings(value) {
        try {
          localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
        } catch (e) {
        }
        currentSettings = value;
      },
      now() {
        return now();
      }
    };
    if (hook) {
      hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
        if (pluginId === this.plugin.id) {
          this.fallbacks.setSettings(value);
        }
      });
    }
    this.proxiedOn = new Proxy({}, {
      get: (_target, prop) => {
        if (this.target) {
          return this.target.on[prop];
        } else {
          return (...args) => {
            this.onQueue.push({
              method: prop,
              args
            });
          };
        }
      }
    });
    this.proxiedTarget = new Proxy({}, {
      get: (_target, prop) => {
        if (this.target) {
          return this.target[prop];
        } else if (prop === "on") {
          return this.proxiedOn;
        } else if (Object.keys(this.fallbacks).includes(prop)) {
          return (...args) => {
            this.targetQueue.push({
              method: prop,
              args,
              resolve: () => {
              }
            });
            return this.fallbacks[prop](...args);
          };
        } else {
          return (...args) => {
            return new Promise((resolve) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve
              });
            });
          };
        }
      }
    });
  }
  async setRealTarget(target) {
    this.target = target;
    for (const item of this.onQueue) {
      this.target.on[item.method](...item.args);
    }
    for (const item of this.targetQueue) {
      item.resolve(await this.target[item.method](...item.args));
    }
  }
}
function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
  const descriptor = pluginDescriptor;
  const target = getTarget();
  const hook = getDevtoolsGlobalHook();
  const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
  if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
    hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
  } else {
    const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
    const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
    list.push({
      pluginDescriptor: descriptor,
      setupFn,
      proxy
    });
    if (proxy)
      setupFn(proxy.proxiedTarget);
  }
}
/*!
 * vuex v4.1.0
 * (c) 2022 Evan You
 * @license MIT
 */
var storeKey = "store";
function forEachValue(obj, fn) {
  Object.keys(obj).forEach(function(key) {
    return fn(obj[key], key);
  });
}
function isObject(obj) {
  return obj !== null && typeof obj === "object";
}
function isPromise(val) {
  return val && typeof val.then === "function";
}
function partial(fn, arg) {
  return function() {
    return fn(arg);
  };
}
function genericSubscribe(fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend ? subs.unshift(fn) : subs.push(fn);
  }
  return function() {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  };
}
function resetStore(store2, hot) {
  store2._actions = /* @__PURE__ */ Object.create(null);
  store2._mutations = /* @__PURE__ */ Object.create(null);
  store2._wrappedGetters = /* @__PURE__ */ Object.create(null);
  store2._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
  var state = store2.state;
  installModule(store2, state, [], store2._modules.root, true);
  resetStoreState(store2, state, hot);
}
function resetStoreState(store2, state, hot) {
  var oldState = store2._state;
  var oldScope = store2._scope;
  store2.getters = {};
  store2._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
  var wrappedGetters = store2._wrappedGetters;
  var computedObj = {};
  var computedCache = {};
  var scope = effectScope(true);
  scope.run(function() {
    forEachValue(wrappedGetters, function(fn, key) {
      computedObj[key] = partial(fn, store2);
      computedCache[key] = computed(function() {
        return computedObj[key]();
      });
      Object.defineProperty(store2.getters, key, {
        get: function() {
          return computedCache[key].value;
        },
        enumerable: true
        // for local getters
      });
    });
  });
  store2._state = reactive({
    data: state
  });
  store2._scope = scope;
  if (store2.strict) {
    enableStrictMode(store2);
  }
  if (oldState) {
    if (hot) {
      store2._withCommit(function() {
        oldState.data = null;
      });
    }
  }
  if (oldScope) {
    oldScope.stop();
  }
}
function installModule(store2, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store2._modules.getNamespace(path);
  if (module.namespaced) {
    if (store2._modulesNamespaceMap[namespace] && { "NODE_ENV": "production" }.NODE_ENV !== "production") {
      console.error("[vuex] duplicate namespace " + namespace + " for the namespaced module " + path.join("/"));
    }
    store2._modulesNamespaceMap[namespace] = module;
  }
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store2._withCommit(function() {
      parentState[moduleName] = module.state;
    });
  }
  var local = module.context = makeLocalContext(store2, namespace, path);
  module.forEachMutation(function(mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store2, namespacedType, mutation, local);
  });
  module.forEachAction(function(action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store2, type, handler, local);
  });
  module.forEachGetter(function(getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store2, namespacedType, getter, local);
  });
  module.forEachChild(function(child, key) {
    installModule(store2, rootState, path.concat(key), child, hot);
  });
}
function makeLocalContext(store2, namespace, path) {
  var noNamespace = namespace === "";
  var local = {
    dispatch: noNamespace ? store2.dispatch : function(_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;
      if (!options || !options.root) {
        type = namespace + type;
      }
      return store2.dispatch(type, payload);
    },
    commit: noNamespace ? store2.commit : function(_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;
      if (!options || !options.root) {
        type = namespace + type;
      }
      store2.commit(type, payload, options);
    }
  };
  Object.defineProperties(local, {
    getters: {
      get: noNamespace ? function() {
        return store2.getters;
      } : function() {
        return makeLocalGetters(store2, namespace);
      }
    },
    state: {
      get: function() {
        return getNestedState(store2.state, path);
      }
    }
  });
  return local;
}
function makeLocalGetters(store2, namespace) {
  if (!store2._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store2.getters).forEach(function(type) {
      if (type.slice(0, splitPos) !== namespace) {
        return;
      }
      var localType = type.slice(splitPos);
      Object.defineProperty(gettersProxy, localType, {
        get: function() {
          return store2.getters[type];
        },
        enumerable: true
      });
    });
    store2._makeLocalGettersCache[namespace] = gettersProxy;
  }
  return store2._makeLocalGettersCache[namespace];
}
function registerMutation(store2, type, handler, local) {
  var entry = store2._mutations[type] || (store2._mutations[type] = []);
  entry.push(function wrappedMutationHandler(payload) {
    handler.call(store2, local.state, payload);
  });
}
function registerAction(store2, type, handler, local) {
  var entry = store2._actions[type] || (store2._actions[type] = []);
  entry.push(function wrappedActionHandler(payload) {
    var res = handler.call(store2, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store2.getters,
      rootState: store2.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store2._devtoolHook) {
      return res.catch(function(err) {
        store2._devtoolHook.emit("vuex:error", err);
        throw err;
      });
    } else {
      return res;
    }
  });
}
function registerGetter(store2, type, rawGetter, local) {
  if (store2._wrappedGetters[type]) {
    return;
  }
  store2._wrappedGetters[type] = function wrappedGetter(store3) {
    return rawGetter(
      local.state,
      // local state
      local.getters,
      // local getters
      store3.state,
      // root state
      store3.getters
      // root getters
    );
  };
}
function enableStrictMode(store2) {
  watch(function() {
    return store2._state.data;
  }, function() {
  }, { deep: true, flush: "sync" });
}
function getNestedState(state, path) {
  return path.reduce(function(state2, key) {
    return state2[key];
  }, state);
}
function unifyObjectStyle(type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }
  return { type, payload, options };
}
var LABEL_VUEX_BINDINGS = "vuex bindings";
var MUTATIONS_LAYER_ID = "vuex:mutations";
var ACTIONS_LAYER_ID = "vuex:actions";
var INSPECTOR_ID = "vuex";
var actionId = 0;
function addDevtools(app, store2) {
  setupDevtoolsPlugin(
    {
      id: "org.vuejs.vuex",
      app,
      label: "Vuex",
      homepage: "https://next.vuex.vuejs.org/",
      logo: "https://vuejs.org/images/icons/favicon-96x96.png",
      packageName: "vuex",
      componentStateTypes: [LABEL_VUEX_BINDINGS]
    },
    function(api) {
      api.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: "Vuex Mutations",
        color: COLOR_LIME_500
      });
      api.addTimelineLayer({
        id: ACTIONS_LAYER_ID,
        label: "Vuex Actions",
        color: COLOR_LIME_500
      });
      api.addInspector({
        id: INSPECTOR_ID,
        label: "Vuex",
        icon: "storage",
        treeFilterPlaceholder: "Filter stores..."
      });
      api.on.getInspectorTree(function(payload) {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          if (payload.filter) {
            var nodes = [];
            flattenStoreForInspectorTree(nodes, store2._modules.root, payload.filter, "");
            payload.rootNodes = nodes;
          } else {
            payload.rootNodes = [
              formatStoreForInspectorTree(store2._modules.root, "")
            ];
          }
        }
      });
      api.on.getInspectorState(function(payload) {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          var modulePath = payload.nodeId;
          makeLocalGetters(store2, modulePath);
          payload.state = formatStoreForInspectorState(
            getStoreModule(store2._modules, modulePath),
            modulePath === "root" ? store2.getters : store2._makeLocalGettersCache,
            modulePath
          );
        }
      });
      api.on.editInspectorState(function(payload) {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          var modulePath = payload.nodeId;
          var path = payload.path;
          if (modulePath !== "root") {
            path = modulePath.split("/").filter(Boolean).concat(path);
          }
          store2._withCommit(function() {
            payload.set(store2._state.data, path, payload.state.value);
          });
        }
      });
      store2.subscribe(function(mutation, state) {
        var data = {};
        if (mutation.payload) {
          data.payload = mutation.payload;
        }
        data.state = state;
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: Date.now(),
            title: mutation.type,
            data
          }
        });
      });
      store2.subscribeAction({
        before: function(action, state) {
          var data = {};
          if (action.payload) {
            data.payload = action.payload;
          }
          action._id = actionId++;
          action._time = Date.now();
          data.state = state;
          api.addTimelineEvent({
            layerId: ACTIONS_LAYER_ID,
            event: {
              time: action._time,
              title: action.type,
              groupId: action._id,
              subtitle: "start",
              data
            }
          });
        },
        after: function(action, state) {
          var data = {};
          var duration = Date.now() - action._time;
          data.duration = {
            _custom: {
              type: "duration",
              display: duration + "ms",
              tooltip: "Action duration",
              value: duration
            }
          };
          if (action.payload) {
            data.payload = action.payload;
          }
          data.state = state;
          api.addTimelineEvent({
            layerId: ACTIONS_LAYER_ID,
            event: {
              time: Date.now(),
              title: action.type,
              groupId: action._id,
              subtitle: "end",
              data
            }
          });
        }
      });
    }
  );
}
var COLOR_LIME_500 = 8702998;
var COLOR_DARK = 6710886;
var COLOR_WHITE = 16777215;
var TAG_NAMESPACED = {
  label: "namespaced",
  textColor: COLOR_WHITE,
  backgroundColor: COLOR_DARK
};
function extractNameFromPath(path) {
  return path && path !== "root" ? path.split("/").slice(-2, -1)[0] : "Root";
}
function formatStoreForInspectorTree(module, path) {
  return {
    id: path || "root",
    // all modules end with a `/`, we want the last segment only
    // cart/ -> cart
    // nested/cart/ -> cart
    label: extractNameFromPath(path),
    tags: module.namespaced ? [TAG_NAMESPACED] : [],
    children: Object.keys(module._children).map(
      function(moduleName) {
        return formatStoreForInspectorTree(
          module._children[moduleName],
          path + moduleName + "/"
        );
      }
    )
  };
}
function flattenStoreForInspectorTree(result, module, filter, path) {
  if (path.includes(filter)) {
    result.push({
      id: path || "root",
      label: path.endsWith("/") ? path.slice(0, path.length - 1) : path || "Root",
      tags: module.namespaced ? [TAG_NAMESPACED] : []
    });
  }
  Object.keys(module._children).forEach(function(moduleName) {
    flattenStoreForInspectorTree(result, module._children[moduleName], filter, path + moduleName + "/");
  });
}
function formatStoreForInspectorState(module, getters, path) {
  getters = path === "root" ? getters : getters[path];
  var gettersKeys = Object.keys(getters);
  var storeState = {
    state: Object.keys(module.state).map(function(key) {
      return {
        key,
        editable: true,
        value: module.state[key]
      };
    })
  };
  if (gettersKeys.length) {
    var tree = transformPathsToObjectTree(getters);
    storeState.getters = Object.keys(tree).map(function(key) {
      return {
        key: key.endsWith("/") ? extractNameFromPath(key) : key,
        editable: false,
        value: canThrow(function() {
          return tree[key];
        })
      };
    });
  }
  return storeState;
}
function transformPathsToObjectTree(getters) {
  var result = {};
  Object.keys(getters).forEach(function(key) {
    var path = key.split("/");
    if (path.length > 1) {
      var target = result;
      var leafKey = path.pop();
      path.forEach(function(p) {
        if (!target[p]) {
          target[p] = {
            _custom: {
              value: {},
              display: p,
              tooltip: "Module",
              abstract: true
            }
          };
        }
        target = target[p]._custom.value;
      });
      target[leafKey] = canThrow(function() {
        return getters[key];
      });
    } else {
      result[key] = canThrow(function() {
        return getters[key];
      });
    }
  });
  return result;
}
function getStoreModule(moduleMap, path) {
  var names = path.split("/").filter(function(n) {
    return n;
  });
  return names.reduce(
    function(module, moduleName, i) {
      var child = module[moduleName];
      if (!child) {
        throw new Error('Missing module "' + moduleName + '" for path "' + path + '".');
      }
      return i === names.length - 1 ? child : child._children;
    },
    path === "root" ? moduleMap : moduleMap.root._children
  );
}
function canThrow(cb) {
  try {
    return cb();
  } catch (e) {
    return e;
  }
}
var Module = function Module2(rawModule, runtime) {
  this.runtime = runtime;
  this._children = /* @__PURE__ */ Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === "function" ? rawState() : rawState) || {};
};
var prototypeAccessors$1 = { namespaced: { configurable: true } };
prototypeAccessors$1.namespaced.get = function() {
  return !!this._rawModule.namespaced;
};
Module.prototype.addChild = function addChild(key, module) {
  this._children[key] = module;
};
Module.prototype.removeChild = function removeChild(key) {
  delete this._children[key];
};
Module.prototype.getChild = function getChild(key) {
  return this._children[key];
};
Module.prototype.hasChild = function hasChild(key) {
  return key in this._children;
};
Module.prototype.update = function update(rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};
Module.prototype.forEachChild = function forEachChild(fn) {
  forEachValue(this._children, fn);
};
Module.prototype.forEachGetter = function forEachGetter(fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};
Module.prototype.forEachAction = function forEachAction(fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};
Module.prototype.forEachMutation = function forEachMutation(fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};
Object.defineProperties(Module.prototype, prototypeAccessors$1);
var ModuleCollection = function ModuleCollection2(rawRootModule) {
  this.register([], rawRootModule, false);
};
ModuleCollection.prototype.get = function get(path) {
  return path.reduce(function(module, key) {
    return module.getChild(key);
  }, this.root);
};
ModuleCollection.prototype.getNamespace = function getNamespace(path) {
  var module = this.root;
  return path.reduce(function(namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + "/" : "");
  }, "");
};
ModuleCollection.prototype.update = function update$1(rawRootModule) {
  update2([], this.root, rawRootModule);
};
ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
  var this$1$1 = this;
  if (runtime === void 0)
    runtime = true;
  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function(rawChildModule, key) {
      this$1$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};
ModuleCollection.prototype.unregister = function unregister(path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);
  if (!child) {
    return;
  }
  if (!child.runtime) {
    return;
  }
  parent.removeChild(key);
};
ModuleCollection.prototype.isRegistered = function isRegistered(path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (parent) {
    return parent.hasChild(key);
  }
  return false;
};
function update2(path, targetModule, newModule) {
  targetModule.update(newModule);
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        return;
      }
      update2(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}
function createStore(options) {
  return new Store(options);
}
var Store = function Store2(options) {
  var this$1$1 = this;
  if (options === void 0)
    options = {};
  var plugins = options.plugins;
  if (plugins === void 0)
    plugins = [];
  var strict = options.strict;
  if (strict === void 0)
    strict = false;
  var devtools = options.devtools;
  this._committing = false;
  this._actions = /* @__PURE__ */ Object.create(null);
  this._actionSubscribers = [];
  this._mutations = /* @__PURE__ */ Object.create(null);
  this._wrappedGetters = /* @__PURE__ */ Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
  this._subscribers = [];
  this._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
  this._scope = null;
  this._devtools = devtools;
  var store2 = this;
  var ref = this;
  var dispatch2 = ref.dispatch;
  var commit2 = ref.commit;
  this.dispatch = function boundDispatch(type, payload) {
    return dispatch2.call(store2, type, payload);
  };
  this.commit = function boundCommit(type, payload, options2) {
    return commit2.call(store2, type, payload, options2);
  };
  this.strict = strict;
  var state = this._modules.root.state;
  installModule(this, state, [], this._modules.root);
  resetStoreState(this, state);
  plugins.forEach(function(plugin) {
    return plugin(this$1$1);
  });
};
var prototypeAccessors = { state: { configurable: true } };
Store.prototype.install = function install(app, injectKey) {
  app.provide(injectKey || storeKey, this);
  app.config.globalProperties.$store = this;
  var useDevtools = this._devtools !== void 0 ? this._devtools : false;
  if (useDevtools) {
    addDevtools(app, this);
  }
};
prototypeAccessors.state.get = function() {
  return this._state.data;
};
prototypeAccessors.state.set = function(v) {
};
Store.prototype.commit = function commit(_type, _payload, _options) {
  var this$1$1 = this;
  var ref = unifyObjectStyle(_type, _payload, _options);
  var type = ref.type;
  var payload = ref.payload;
  var mutation = { type, payload };
  var entry = this._mutations[type];
  if (!entry) {
    return;
  }
  this._withCommit(function() {
    entry.forEach(function commitIterator(handler) {
      handler(payload);
    });
  });
  this._subscribers.slice().forEach(function(sub) {
    return sub(mutation, this$1$1.state);
  });
};
Store.prototype.dispatch = function dispatch(_type, _payload) {
  var this$1$1 = this;
  var ref = unifyObjectStyle(_type, _payload);
  var type = ref.type;
  var payload = ref.payload;
  var action = { type, payload };
  var entry = this._actions[type];
  if (!entry) {
    return;
  }
  try {
    this._actionSubscribers.slice().filter(function(sub) {
      return sub.before;
    }).forEach(function(sub) {
      return sub.before(action, this$1$1.state);
    });
  } catch (e) {
  }
  var result = entry.length > 1 ? Promise.all(entry.map(function(handler) {
    return handler(payload);
  })) : entry[0](payload);
  return new Promise(function(resolve, reject) {
    result.then(function(res) {
      try {
        this$1$1._actionSubscribers.filter(function(sub) {
          return sub.after;
        }).forEach(function(sub) {
          return sub.after(action, this$1$1.state);
        });
      } catch (e) {
      }
      resolve(res);
    }, function(error) {
      try {
        this$1$1._actionSubscribers.filter(function(sub) {
          return sub.error;
        }).forEach(function(sub) {
          return sub.error(action, this$1$1.state, error);
        });
      } catch (e) {
      }
      reject(error);
    });
  });
};
Store.prototype.subscribe = function subscribe(fn, options) {
  return genericSubscribe(fn, this._subscribers, options);
};
Store.prototype.subscribeAction = function subscribeAction(fn, options) {
  var subs = typeof fn === "function" ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options);
};
Store.prototype.watch = function watch$1(getter, cb, options) {
  var this$1$1 = this;
  return watch(function() {
    return getter(this$1$1.state, this$1$1.getters);
  }, cb, Object.assign({}, options));
};
Store.prototype.replaceState = function replaceState(state) {
  var this$1$1 = this;
  this._withCommit(function() {
    this$1$1._state.data = state;
  });
};
Store.prototype.registerModule = function registerModule(path, rawModule, options) {
  if (options === void 0)
    options = {};
  if (typeof path === "string") {
    path = [path];
  }
  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  resetStoreState(this, this.state);
};
Store.prototype.unregisterModule = function unregisterModule(path) {
  var this$1$1 = this;
  if (typeof path === "string") {
    path = [path];
  }
  this._modules.unregister(path);
  this._withCommit(function() {
    var parentState = getNestedState(this$1$1.state, path.slice(0, -1));
    delete parentState[path[path.length - 1]];
  });
  resetStore(this);
};
Store.prototype.hasModule = function hasModule(path) {
  if (typeof path === "string") {
    path = [path];
  }
  return this._modules.isRegistered(path);
};
Store.prototype.hotUpdate = function hotUpdate(newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};
Store.prototype._withCommit = function _withCommit(fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};
Object.defineProperties(Store.prototype, prototypeAccessors);
var js_cookie = { exports: {} };
/*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
(function(module, exports) {
  (function(factory) {
    var registeredInModuleLoader;
    {
      module.exports = factory();
      registeredInModuleLoader = true;
    }
    if (!registeredInModuleLoader) {
      var OldCookies = window.Cookies;
      var api = window.Cookies = factory();
      api.noConflict = function() {
        window.Cookies = OldCookies;
        return api;
      };
    }
  })(function() {
    function extend() {
      var i = 0;
      var result = {};
      for (; i < arguments.length; i++) {
        var attributes = arguments[i];
        for (var key in attributes) {
          result[key] = attributes[key];
        }
      }
      return result;
    }
    function decode(s) {
      return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
    }
    function init(converter) {
      function api() {
      }
      function set(key, value, attributes) {
        if (typeof document === "undefined") {
          return;
        }
        attributes = extend({
          path: "/"
        }, api.defaults, attributes);
        if (typeof attributes.expires === "number") {
          attributes.expires = new Date(/* @__PURE__ */ new Date() * 1 + attributes.expires * 864e5);
        }
        attributes.expires = attributes.expires ? attributes.expires.toUTCString() : "";
        try {
          var result = JSON.stringify(value);
          if (/^[\{\[]/.test(result)) {
            value = result;
          }
        } catch (e) {
        }
        value = converter.write ? converter.write(value, key) : encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
        key = encodeURIComponent(String(key)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
        var stringifiedAttributes = "";
        for (var attributeName in attributes) {
          if (!attributes[attributeName]) {
            continue;
          }
          stringifiedAttributes += "; " + attributeName;
          if (attributes[attributeName] === true) {
            continue;
          }
          stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
        }
        return document.cookie = key + "=" + value + stringifiedAttributes;
      }
      function get2(key, json) {
        if (typeof document === "undefined") {
          return;
        }
        var jar = {};
        var cookies = document.cookie ? document.cookie.split("; ") : [];
        var i = 0;
        for (; i < cookies.length; i++) {
          var parts = cookies[i].split("=");
          var cookie = parts.slice(1).join("=");
          if (!json && cookie.charAt(0) === '"') {
            cookie = cookie.slice(1, -1);
          }
          try {
            var name = decode(parts[0]);
            cookie = (converter.read || converter)(cookie, name) || decode(cookie);
            if (json) {
              try {
                cookie = JSON.parse(cookie);
              } catch (e) {
              }
            }
            jar[name] = cookie;
            if (key === name) {
              break;
            }
          } catch (e) {
          }
        }
        return key ? jar[key] : jar;
      }
      api.set = set;
      api.get = function(key) {
        return get2(
          key,
          false
          /* read as raw */
        );
      };
      api.getJSON = function(key) {
        return get2(
          key,
          true
          /* read as json */
        );
      };
      api.remove = function(key, attributes) {
        set(key, "", extend(attributes, {
          expires: -1
        }));
      };
      api.defaults = {};
      api.withConverter = init;
      return api;
    }
    return init(function() {
    });
  });
})(js_cookie);
var js_cookieExports = js_cookie.exports;
const Cookies = /* @__PURE__ */ getDefaultExportFromCjs(js_cookieExports);
const auth = {
  namespaced: true,
  state: {
    user: null,
    isAuthenticated: false,
    requiresAuth: null
  },
  getters: {
    getUser: (state) => state.user,
    isAuthenticated: (state) => state.isAuthenticated,
    requiresAuth: (state) => state.requiresAuth
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },
    setIsAuthenticated: (state, isAuthenticated) => {
      state.isAuthenticated = isAuthenticated;
    },
    setRequiresAuth: (state, requiresAuth) => {
      state.requiresAuth = requiresAuth;
    }
  },
  actions: {
    authenticate({ state, rootState, commit: commit2 }, payload) {
      const session = Cookies.get("XSRF-TOKEN");
      const user = state.user;
      const isAuthenticated = !!session && !!user;
      commit2("setIsAuthenticated", isAuthenticated);
      if (state.requiresAuth == true && !state.isAuthenticated) {
        Fusion.router.push(payload.guestNext);
      }
      if (state.requiresAuth == false && state.isAuthenticated) {
        Fusion.router.push(payload.adminNext);
      }
    }
  }
};
const blueprint = {
  namespaced: true,
  state: {
    remove_index: null
  },
  getters: {
    getRemoveIndex: (state) => {
      return state.remove_index;
    }
  },
  mutations: {
    setRemoveIndex: (state, remove_index) => {
      state.remove_index = remove_index;
    }
  }
};
const disks = {
  namespaced: true,
  state: {
    disks: []
  },
  getters: {
    getDisks: (state) => {
      return state.disks;
    }
  },
  mutations: {
    setDisks: (state, disks2) => {
      state.disks = disks2;
    }
  },
  actions: {
    fetchDisks: (context) => {
      axios.get("/api/disks").then((response) => context.commit("setDisks", response.data.data)).catch((error) => console.log(error));
    }
  }
};
const fieldtypes = {
  namespaced: true,
  state: {
    structure: false,
    structures: {},
    fieldtypes: {}
  },
  getters: {
    getFilteredFieldtypes: (state) => {
      let fieldtypes2 = {};
      if (state.structure && _.has(state.structures, state.structure)) {
        fieldtypes2 = _.reject(state.fieldtypes, (fieldtype) => {
          const structure = state.structures[state.structure];
          const excluded = structure.excluded;
          return excluded.includes(fieldtype.handle);
        });
      }
      return _.keyBy(fieldtypes2, "handle");
    },
    getFieldtypes: (state) => {
      return state.fieldtypes;
    },
    getStructures: (state) => {
      return state.structures;
    }
  },
  mutations: {
    setStructure: (state, structure) => {
      state.structure = _.isEmpty(structure) ? false : structure;
    },
    setStructures: (state, structures) => {
      state.structures = _.keyBy(structures, "handle");
    },
    setFieldtypes: (state, fieldtypes2) => {
      state.fieldtypes = _.keyBy(fieldtypes2, "handle");
    },
    updateStructure: (state, payload) => {
      if (_.has(state.structures, payload.handle)) {
        state.structures[payload.handle] = payload.structure;
      }
    }
  },
  actions: {
    updateStructure: ({ commit: commit2 }, payload) => {
      commit2("updateStructure", payload);
    },
    fetch: ({ state, commit: commit2 }) => {
      axios.all([
        axios.get("/api/structures"),
        axios.get("/api/fieldtypes")
      ]).then(axios.spread((structures, fieldtypes2) => {
        commit2("setStructures", structures.data.data);
        commit2("setFieldtypes", fieldtypes2.data.data);
      }));
    }
  }
};
const filemanager = {
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
    search: "",
    display: "everything",
    sort: "name",
    direction: "asc",
    view: "grid",
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
    getDisk(state) {
      return state.disk;
    },
    getLoading(state) {
      return state.loading;
    },
    getFiles(state) {
      return state.files;
    },
    getDirectories(state) {
      return state.directories;
    },
    getBreadcrumbs(state) {
      return state.breadcrumbs;
    },
    getView(state) {
      return state.view;
    },
    getSearch(state) {
      return state.search;
    },
    getRootDirectory(state) {
      return state.rootDirectory;
    },
    getCurrentDirectory(state) {
      return state.currentDirectory;
    },
    getParentDirectory(state) {
      return state.parentDirectory;
    },
    getDisplay(state) {
      return state.display;
    },
    getSort(state) {
      return state.sort;
    },
    getDirection(state) {
      return state.direction;
    },
    getSelectedFiles(state) {
      return state.selected.files;
    },
    getSelectedDirectories(state) {
      return state.selected.directories;
    },
    hasSelection(state) {
      return state.selected.files.length + state.selected.directories.length > 0;
    },
    selectionCount(state) {
      return state.selected.files.length + state.selected.directories.length;
    },
    getCurrentPage(state) {
      return state.currentPage;
    },
    getTotalPages(state) {
      return state.totalPages;
    },
    getUploadProgress(state) {
      return state.uploadProgress;
    },
    getUploadsVisible(state) {
      return state.uploadsVisible;
    },
    getUploadsMinimized(state) {
      return state.uploadsMinimized;
    },
    getFileUploads(state) {
      return state.fileUploads;
    },
    getDropzoneVisible(state) {
      return state.dropzoneVisible && state.dropzoneEnabled;
    },
    getFileFilters(state) {
      return {
        "filter[directory_id]": state.currentDirectory,
        "filter[display]": state.display !== "everything" ? state.display : null,
        "filter[search]": state.search !== "" ? state.search : null,
        "sort": (state.direction === "asc" ? "" : "-") + state.sort,
        "page": state.currentPage,
        "perPage": state.perPage
      };
    },
    getDirectoryFilters(state) {
      return {
        "filter[search]": state.search !== "" ? state.search : null,
        "filter[parent_id]": state.currentDirectory,
        "sort": state.sort == "name" ? state.direction === "asc" ? "name" : "-name" : null
      };
    }
  },
  mutations: {
    setDisk(state, disk) {
      state.disk = disk;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setFiles(state, files) {
      state.files = files;
    },
    setDirectory(state, directory) {
      state.directory = directory;
    },
    setDirectories(state, directories) {
      state.directories = directories;
    },
    setRootDirectory(state, directory) {
      state.rootDirectory = directory;
    },
    setCurrentDirectory(state, directory) {
      state.currentDirectory = directory;
    },
    setParentDirectory(state, directory) {
      state.parentDirectory = directory;
    },
    setBreadcrumbs(state, breadcrumbs) {
      state.breadcrumbs = breadcrumbs;
    },
    setView(state, view) {
      state.view = view;
    },
    setSearch(state, query) {
      state.search = query;
    },
    setDisplay(state, display) {
      state.display = display;
    },
    setSort(state, sortBy) {
      state.sort = sortBy;
    },
    setDirection(state, direction) {
      state.direction = direction;
    },
    addFile(state, file) {
      state.files.push(file);
    },
    toggleFileSelection(state, file) {
      state.selected.files = _$1.xor(state.selected.files, [file]);
    },
    clearFileSelection(state) {
      state.selected.files = [];
    },
    toggleDirectorySelection(state, directory) {
      state.selected.directories = _$1.xor(state.selected.directories, [directory]);
    },
    clearDirectorySelection(state) {
      state.selected.directories = [];
    },
    removeFiles(state, files) {
      _$1.each(files, function(id) {
        let index = _$1.findIndex(state.files, function(file) {
          return file.id == id;
        });
        state.files.splice(index, 1);
      });
    },
    clearFiles(state) {
      state.files = [];
    },
    setCurrentPage(state, page) {
      state.currentPage = page;
    },
    setTotalPages(state, pages) {
      state.totalPages = pages;
    },
    setUploadProgress(state, progress) {
      state.uploadProgress = progress;
    },
    setUploadsMinimized(state, value) {
      state.uploadsMinimized = value;
    },
    setUploadsVisible(state, value) {
      state.uploadsVisible = value;
    },
    setFileUploads(state, files) {
      state.fileUploads = files;
    },
    addFileUpload(state, file) {
      state.fileUploads.push(file);
    },
    setDropzoneVisible(state, value) {
      state.dropzoneVisible = value;
    },
    setDropzoneEnabled(state, value) {
      state.dropzoneEnabled = value;
    }
  },
  actions: {
    reset({ commit: commit2 }) {
      commit2("setRootDirectory", 0);
      commit2("setCurrentDirectory", null);
      commit2("setParentDirectory", null);
      commit2("clearFileSelection");
      commit2("clearDirectorySelection");
    },
    setLoading(context, loading) {
      context.commit("setLoading", loading);
    },
    setFiles(context, files) {
      context.commit("setFiles", files);
    },
    addFile(context, file) {
      context.commit("addFile", file);
    },
    toggleFileSelection(context, file) {
      context.commit("toggleFileSelection", file);
    },
    toggleDirectorySelection(context, directory) {
      context.commit("toggleDirectorySelection", directory);
    },
    clearFiles(context) {
      context.commit("clearFiles");
    },
    removeFiles(context, files) {
      context.commit("removeFiles", files);
    },
    clearFileSelection(context) {
      context.commit("clearFileSelection");
    },
    clearDirectorySelection(context) {
      context.commit("clearDirectorySelection");
    },
    fetchDisk({ commit: commit2, dispatch: dispatch2 }, disk) {
      axios.get(`/api/disks/${disk}`).then(({ data }) => {
        commit2("setDisk", data.data);
        dispatch2("fetchFilesAndDirectories");
      }).catch((errors) => console.log(errors));
    },
    fetchFilesAndDirectories: _$1.throttle(({ state, getters, commit: commit2, dispatch: dispatch2 }) => {
      commit2("setLoading", true);
      let getDirectory = null;
      if (state.currentDirectory > 0)
        getDirectory = axios.get(`/api/directories/${state.disk.id}/${state.currentDirectory}`);
      axios.all([
        axios.get(`/api/files/${state.disk.id}`, { params: getters.getFileFilters }),
        axios.get(`/api/directories/${state.disk.id}`, { params: getters.getDirectoryFilters }),
        getDirectory
      ]).then(
        axios.spread((files, directories, currentDirectory) => {
          commit2("setFiles", files.data.data);
          commit2("setTotalPages", files.data.meta.last_page);
          commit2("setDirectories", directories.data.data);
          commit2("setDirectory", currentDirectory ? currentDirectory.data.data : null);
          commit2("setLoading", false);
          dispatch2("setBreadcrumbs");
        })
      ).catch((errors) => {
        console.error(errors);
      });
    }, 500),
    fetchFiles: _$1.throttle(({ state, getters, commit: commit2, dispatch: dispatch2 }) => {
      commit2("setLoading", true);
      let getDirectory = null;
      if (state.currentDirectory > 0)
        getDirectory = axios.get(`/api/directories/${state.disk.id}/${state.currentDirectory}`);
      axios.all([
        axios.get(`/api/files/${state.disk.id}`, { params: getters.getFileFilters }),
        getDirectory
      ]).then(
        axios.spread((files, currentDirectory) => {
          commit2("setFiles", files.data.data);
          commit2("setTotalPages", files.data.meta.last_page);
          commit2("setDirectory", currentDirectory ? currentDirectory.data.data : null);
          commit2("setLoading", false);
          dispatch2("setBreadcrumbs");
        })
      ).catch((errors) => {
        console.error(errors);
      });
    }, 500),
    fetchDirectories: _$1.throttle(({ state, getters, commit: commit2, dispatch: dispatch2 }) => {
      commit2("setLoading", true);
      let getDirectory = null;
      if (state.currentDirectory > 0)
        getDirectory = axios.get(`/api/directories/${state.disk.id}/${state.currentDirectory}`);
      axios.all([
        axios.get(`/api/directories/${state.disk.id}`, { params: getters.getDirectoryFilters }),
        getDirectory
      ]).then(
        axios.spread((directories, currentDirectory) => {
          commit2("setDirectories", directories.data.data);
          commit2("setDirectory", currentDirectory ? currentDirectory.data.data : null);
          commit2("setLoading", false);
          dispatch2("setBreadcrumbs");
        })
      ).catch((errors) => {
        console.error(errors);
      });
    }, 500),
    moveFileToDirectory({ commit: commit2, state, dispatch: dispatch2 }, payload) {
      axios.post(`/api/files/${state.disk.id}/move`, {
        directory: payload.directory,
        moving: payload.moving
      }).then((response) => {
        dispatch2("fetchFilesAndDirectories");
        toast("File(s) have been successfully moved!", "success");
      }).catch((errors) => {
        toast(errors.response.data.errors.moving[0], "failed");
      });
    },
    setSearch(context, query) {
      context.commit("setSearch", query);
    },
    setDisplay(context, display) {
      context.commit("setDisplay", display);
    },
    setSort(context, sortBy) {
      context.commit("setSort", sortBy);
    },
    setDirection(context, direction) {
      context.commit("setDirection", direction);
    },
    setBreadcrumbs({ state, commit: commit2 }) {
      let breadcrumbs = [];
      let directory = state.directory;
      let root = state.rootDirectory;
      while (_$1.has(directory, "id") && directory.id != root) {
        breadcrumbs.unshift(directory);
        directory = directory.parent;
      }
      if (root == 0) {
        breadcrumbs.unshift({ id: null, name: "Root" });
      } else {
        breadcrumbs.unshift(directory);
      }
      commit2("setBreadcrumbs", breadcrumbs);
    },
    setDirectories(context, directories) {
      context.commit("setDirectories", directories);
    },
    setRootDirectory(context, directory) {
      context.commit("setRootDirectory", directory);
    },
    setCurrentDirectory(context, directory) {
      context.commit("setCurrentDirectory", directory);
    },
    setParentDirectory(context, directory) {
      context.commit("setParentDirectory", directory);
    },
    setCurrentPage(context, page) {
      context.commit("setCurrentPage", page);
    },
    setTotalPages(context, pages) {
      context.commit("setTotalPages", pages);
    },
    setUploadProgress(context, progress) {
      context.commit("setUploadProgress", progress);
    },
    setUploadsVisible(context, value) {
      context.commit("setUploadsVisible", value);
    },
    setUploadsMinimized(context, value) {
      context.commit("setUploadsMinimized", value);
    },
    setFileUploads(context, files) {
      context.commit("fileUploads", files);
    },
    addFileUpload(context, file) {
      context.commit("addFileUpload", file);
    },
    setDropzoneVisible(context, value) {
      context.commit("setDropzoneVisible", value);
    },
    setDropzoneEnabled(context, value) {
      context.commit("setDropzoneEnabled", value);
    },
    toggleView(context) {
      if (context.state.view === "grid") {
        context.commit("setView", "list");
      } else {
        context.commit("setView", "grid");
      }
    },
    toggleDirection(context) {
      if (context.state.direction === "asc") {
        context.commit("setDirection", "desc");
      } else {
        context.commit("setDirection", "asc");
      }
    }
  }
};
const form = {
  namespaced: true,
  state: {
    preventNavigation: false,
    confirmModalVisible: false,
    confirmModalCallback: null
  },
  getters: {
    preventNavigation: (state) => state.preventNavigation,
    confirmModalVisible: (state) => state.confirmModalVisible,
    confirmModalCallback: (state) => state.confirmModalCallback
  },
  mutations: {
    setPreventNavigation: (state, preventNavigation) => {
      state.preventNavigation = preventNavigation;
    },
    setConfirmModalVisible: (state, confirmModalVisible) => {
      state.confirmModalVisible = confirmModalVisible;
    },
    setConfirmModalCallback: (state, confirmModalCallback) => {
      state.confirmModalCallback = confirmModalCallback;
    }
  }
};
const fusion = {
  namespaced: true,
  state: {
    version: null
  },
  getters: {
    getVersion: (state) => {
      return state.version;
    },
    getConfig: (state) => {
      return state.config;
    }
  },
  mutations: {
    setVersion: (state, version) => {
      state.version = version;
    },
    setConfig: (state, config) => {
      state.config = config;
    }
  }
};
const inbox = {
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
    getPage(state) {
      return state.page;
    },
    getTotalPages(state) {
      return state.totalPages;
    },
    getLoading(state) {
      return state.loading;
    },
    getResponse(state) {
      return state.response;
    },
    getResponses(state) {
      return state.responses;
    },
    getForm(state) {
      return state.form;
    },
    getForms(state) {
      return state.forms;
    },
    getFields(state) {
      return state.fields;
    }
  },
  mutations: {
    setPage(state, page) {
      state.page = page;
    },
    setTotalPages(state, pages) {
      state.totalPages = pages;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setResponse(state, response) {
      state.response = response;
    },
    setResponses(state, responses) {
      state.responses = responses;
    },
    setForm(state, form2) {
      state.form = form2;
    },
    setForms(state, forms) {
      state.forms = forms;
    },
    setFields(state, fields) {
      state.fields = fields;
    }
  },
  actions: {
    fetchForms(context) {
      return axios.get("/api/forms").then((response) => {
        context.commit("setForms", response.data.data);
      });
    },
    fetchResponses(context) {
      if (context.state.form.slug) {
        context.dispatch("isLoading");
        return axios.get("/api/forms/" + context.state.form.slug + "/responses?page=" + context.state.page).then((response) => {
          context.commit("setResponses", response.data.data);
          context.commit("setTotalPages", response.data.meta.last_page);
          context.dispatch("doneLoading");
        });
      }
    },
    selectForm(context, form2) {
      context.dispatch("reset");
      context.commit("setForm", form2);
      context.dispatch("fetchResponses");
    },
    selectResponse(context, response) {
      context.commit("setResponse", response);
      context.dispatch("extractFields", response);
    },
    clearResponse(context) {
      context.commit("setResponse", {});
    },
    selectFirstResponse(context) {
      if (context.state.responses.length) {
        context.dispatch("selectResponse", _$1.head(context.state.responses));
      }
    },
    extractFields(context, response) {
      let fields = [];
      let sections = response.form.blueprint.sections;
      _$1.each(sections, (section) => {
        _$1.each(section.fields, (field) => {
          fields.push(field);
        });
      });
      context.commit("setFields", fields);
    },
    isLoading(context) {
      context.commit("setLoading", true);
    },
    doneLoading(context) {
      context.commit("setLoading", false);
    },
    jumpPage(context, page) {
      context.commit("setPage", page);
    },
    nextPage(context) {
      if (context.state.page !== context.state.totalPages) {
        context.commit("setPage", context.state.page + 1);
      }
    },
    prevPage(context) {
      if (context.state.page !== 1) {
        context.commit("setPage", context.state.page - 1);
      }
    },
    firstPage(context) {
      context.commit("setPage", 1);
    },
    lastPage(context) {
      context.commit("setPage", context.state.totalPages);
    },
    reset(context) {
      context.commit("setPage", 1);
      context.commit("setTotalPages", 1);
      context.commit("setForm", {});
      context.commit("setFields", []);
      context.commit("setResponse", {});
      context.commit("setResponses", []);
      context.commit("setLoading", false);
    }
  }
};
const navigation = {
  namespaced: true,
  state: {
    navigation: []
  },
  getters: {
    getNavigation: (state) => {
      return state.navigation;
    }
  },
  mutations: {
    SET_NAVIGATION: (state, links) => {
      state.navigation = links;
    }
  },
  actions: {
    fetchAdminNavigation: (context) => {
      axios.get("/api/admin/navigation").then((response) => {
        context.commit("SET_NAVIGATION", response.data.data);
      }).catch((error) => {
        console.log("There was an error fetching the navigation...");
      });
    }
  }
};
const notifications = {
  namespaced: true,
  state: {
    channels: [],
    notifications: []
  },
  getters: {
    getChannels: (state) => state.channels,
    getNotifications: (state) => state.notifications
  },
  mutations: {
    setChannels: (state, channels) => {
      state.channels = channels;
    },
    setNotifications: (state, notifications2) => {
      state.notifications = notifications2;
    }
  },
  actions: {
    fetch: ({ commit: commit2 }) => {
      axios.all([
        axios.get("/api/channels"),
        axios.get("/api/notifications")
      ]).then(axios.spread((channels, notifications2) => {
        commit2("setChannels", channels.data.data);
        commit2("setNotifications", notifications2.data.data);
      }));
    }
  }
};
const settings = {
  namespaced: true,
  state: {
    groups: {},
    settings: {}
  },
  getters: {
    getGroup: (state) => (key) => {
      return state.groups[key];
    },
    getGroups: (state) => {
      return state.groups;
    },
    getGroupSections: (state) => {
      return _.groupBy(state.groups, "group");
    },
    getSetting: (state) => (key) => {
      return state.settings[key];
    },
    getSettings: (state) => {
      return state.settings;
    }
  },
  mutations: {
    setGroups(state, payload) {
      state.groups = _.keyBy(payload, "handle");
    },
    setSettings(state, payload) {
      let items = _.map(payload, "settings");
      let settings2 = {};
      _.forEach(items, (item) => _.merge(settings2, item));
      state.settings = settings2;
    }
  },
  actions: {
    fetchSettings(context) {
      axios.get("/api/settings").then((response) => {
        context.commit("setGroups", response.data.data);
        context.commit("setSettings", response.data.data);
      }).catch((error) => {
        console.error("There was an error fetching the system settings...");
        console.error(error.message);
      });
    }
  }
};
const store = createStore({
  modules: {
    auth,
    blueprint,
    disks,
    fieldtypes,
    filemanager,
    form,
    fusion,
    inbox,
    navigation,
    notifications,
    settings
  }
});
let onUpdate = _.debounce((obj) => {
  const hasChanges = !_.isEqual(obj.orig, obj.data());
  if (obj.blockNav && obj.hasChanges != hasChanges)
    store.commit("form/setPreventNavigation", hasChanges);
  obj.hasChanges = hasChanges;
}, 250);
class Form {
  constructor(data, blockNav = false) {
    this.blockNav = blockNav;
    this.orig = data;
    this.errors = new Errors();
    this.hasChanges = false;
    let form2 = this;
    let handler = {
      set(obj, key, val, rcvr) {
        Reflect.set(...arguments);
        onUpdate(form2);
        return true;
      }
    };
    _.each(data, (v, k) => {
      this[k] = this.proxify(v, handler);
    });
    return new Proxy(this, handler);
  }
  proxify(data, handler = {}) {
    if (_.isArray(data))
      return _.map(data, (v, k) => this.proxify(v, handler));
    else if (_.isObject(data))
      return new Proxy(_.mapValues(data, (v, k) => {
        return this.proxify(v, handler);
      }), handler);
    return data;
  }
  data() {
    return _.mapValues(this.orig, (v, k) => this[k]);
  }
  formdata(additional = {}) {
    let data = new FormData();
    let json = {};
    _.each(this.data(), (v, k) => {
      if (v instanceof FileList)
        _.each(v, (val) => data.append(`${k}[]`, val));
      else if (v instanceof File)
        data.append(k, v);
      else
        json[k] = v;
    });
    if (!_.isEmpty(json))
      data.append("_json", JSON.stringify(json));
    _.each(additional, (v, k) => data.append(k, v));
    return data;
  }
  post(url) {
    return this.submit("post", url, this.formdata());
  }
  patch(url) {
    return this.submit("post", url, this.formdata({ "_method": "PATCH" }));
  }
  put(url) {
    return this.submit("post", url, this.formdata({ "_method": "PUT" }));
  }
  delete(url) {
    return this.submit("post", url, this.formdata({ "_method": "DELETE" }));
  }
  submit(rType, url, data) {
    return new Promise((resolve, reject) => {
      axios[rType](url, data).then((response) => {
        this.onSuccess(response.data);
        resolve(response.data);
      }).catch((errors) => {
        this.onFailure(errors.response.data);
        reject(errors.response.data);
      });
    });
  }
  onSuccess(data) {
    this.orig = _.cloneDeep(this.data());
    this.hasChanges = false;
    this.errors.clear();
    if (this.blockNav)
      store.commit("form/setPreventNavigation", false);
  }
  onFailure(errors) {
    this.errors.record(errors);
  }
}
export {
  Form as F
};
