import { _ } from "./lodash-7a9c3582.js";
import { g as getDefaultExportFromCjs, c as commonjsGlobal } from "./_commonjsHelpers-7a77ea84.js";
import require$$0$1, { resolveComponent, openBlock, createElementBlock, createBlock, withCtx, renderSlot, createVNode, createTextVNode, Fragment, renderList, withModifiers, createElementVNode, toDisplayString, createCommentVNode, withDirectives, vShow, normalizeClass, vModelSelect, resolveDynamicComponent } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
import { q as queryString$2 } from "./base-881bd533.js";
var axios$4 = { exports: {} };
var bind$2 = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};
var bind$1 = bind$2;
var toString = Object.prototype.toString;
function isArray(val) {
  return toString.call(val) === "[object Array]";
}
function isUndefined(val) {
  return typeof val === "undefined";
}
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
}
function isArrayBuffer(val) {
  return toString.call(val) === "[object ArrayBuffer]";
}
function isFormData(val) {
  return typeof FormData !== "undefined" && val instanceof FormData;
}
function isArrayBufferView(val) {
  var result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
  }
  return result;
}
function isString(val) {
  return typeof val === "string";
}
function isNumber(val) {
  return typeof val === "number";
}
function isObject(val) {
  return val !== null && typeof val === "object";
}
function isPlainObject(val) {
  if (toString.call(val) !== "[object Object]") {
    return false;
  }
  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}
function isDate(val) {
  return toString.call(val) === "[object Date]";
}
function isFile(val) {
  return toString.call(val) === "[object File]";
}
function isBlob(val) {
  return toString.call(val) === "[object Blob]";
}
function isFunction(val) {
  return toString.call(val) === "[object Function]";
}
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}
function isURLSearchParams(val) {
  return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
}
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
}
function isStandardBrowserEnv() {
  if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
    return false;
  }
  return typeof window !== "undefined" && typeof document !== "undefined";
}
function forEach(obj, fn) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
function merge() {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }
  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}
function extend(a2, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === "function") {
      a2[key] = bind$1(val, thisArg);
    } else {
      a2[key] = val;
    }
  });
  return a2;
}
function stripBOM(content) {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
}
var utils$9 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isObject,
  isPlainObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isFunction,
  isStream,
  isURLSearchParams,
  isStandardBrowserEnv,
  forEach,
  merge,
  extend,
  trim,
  stripBOM
};
var utils$8 = utils$9;
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var buildURL$1 = function buildURL(url, params, paramsSerializer) {
  if (!params) {
    return url;
  }
  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils$8.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils$8.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === "undefined") {
        return;
      }
      if (utils$8.isArray(val)) {
        key = key + "[]";
      } else {
        val = [val];
      }
      utils$8.forEach(val, function parseValue(v) {
        if (utils$8.isDate(v)) {
          v = v.toISOString();
        } else if (utils$8.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + "=" + encode(v));
      });
    });
    serializedParams = parts.join("&");
  }
  if (serializedParams) {
    var hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
};
var utils$7 = utils$9;
function InterceptorManager$1() {
  this.handlers = [];
}
InterceptorManager$1.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled,
    rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};
InterceptorManager$1.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
InterceptorManager$1.prototype.forEach = function forEach2(fn) {
  utils$7.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};
var InterceptorManager_1 = InterceptorManager$1;
var utils$6 = utils$9;
var normalizeHeaderName$1 = function normalizeHeaderName(headers, normalizedName) {
  utils$6.forEach(headers, function processHeader(value, name2) {
    if (name2 !== normalizedName && name2.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name2];
    }
  });
};
var enhanceError$1 = function enhanceError(error, config, code, request2, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request2;
  error.response = response;
  error.isAxiosError = true;
  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};
var createError;
var hasRequiredCreateError;
function requireCreateError() {
  if (hasRequiredCreateError)
    return createError;
  hasRequiredCreateError = 1;
  var enhanceError3 = enhanceError$1;
  createError = function createError2(message, config, code, request2, response) {
    var error = new Error(message);
    return enhanceError3(error, config, code, request2, response);
  };
  return createError;
}
var settle;
var hasRequiredSettle;
function requireSettle() {
  if (hasRequiredSettle)
    return settle;
  hasRequiredSettle = 1;
  var createError2 = requireCreateError();
  settle = function settle2(resolve, reject, response) {
    var validateStatus2 = response.config.validateStatus;
    if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
      resolve(response);
    } else {
      reject(createError2(
        "Request failed with status code " + response.status,
        response.config,
        null,
        response.request,
        response
      ));
    }
  };
  return settle;
}
var cookies;
var hasRequiredCookies;
function requireCookies() {
  if (hasRequiredCookies)
    return cookies;
  hasRequiredCookies = 1;
  var utils2 = utils$9;
  cookies = utils2.isStandardBrowserEnv() ? (
    // Standard browser envs support document.cookie
    function standardBrowserEnv() {
      return {
        write: function write(name2, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name2 + "=" + encodeURIComponent(value));
          if (utils2.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils2.isString(path)) {
            cookie.push("path=" + path);
          }
          if (utils2.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read(name2) {
          var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name2 + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name2) {
          this.write(name2, "", Date.now() - 864e5);
        }
      };
    }()
  ) : (
    // Non standard browser env (web workers, react-native) lack needed support.
    function nonStandardBrowserEnv() {
      return {
        write: function write() {
        },
        read: function read() {
          return null;
        },
        remove: function remove() {
        }
      };
    }()
  );
  return cookies;
}
var isAbsoluteURL;
var hasRequiredIsAbsoluteURL;
function requireIsAbsoluteURL() {
  if (hasRequiredIsAbsoluteURL)
    return isAbsoluteURL;
  hasRequiredIsAbsoluteURL = 1;
  isAbsoluteURL = function isAbsoluteURL2(url) {
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
  };
  return isAbsoluteURL;
}
var combineURLs;
var hasRequiredCombineURLs;
function requireCombineURLs() {
  if (hasRequiredCombineURLs)
    return combineURLs;
  hasRequiredCombineURLs = 1;
  combineURLs = function combineURLs2(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
  };
  return combineURLs;
}
var buildFullPath;
var hasRequiredBuildFullPath;
function requireBuildFullPath() {
  if (hasRequiredBuildFullPath)
    return buildFullPath;
  hasRequiredBuildFullPath = 1;
  var isAbsoluteURL2 = requireIsAbsoluteURL();
  var combineURLs2 = requireCombineURLs();
  buildFullPath = function buildFullPath2(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL2(requestedURL)) {
      return combineURLs2(baseURL, requestedURL);
    }
    return requestedURL;
  };
  return buildFullPath;
}
var parseHeaders;
var hasRequiredParseHeaders;
function requireParseHeaders() {
  if (hasRequiredParseHeaders)
    return parseHeaders;
  hasRequiredParseHeaders = 1;
  var utils2 = utils$9;
  var ignoreDuplicateOf = [
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ];
  parseHeaders = function parseHeaders2(headers) {
    var parsed = {};
    var key;
    var val;
    var i;
    if (!headers) {
      return parsed;
    }
    utils2.forEach(headers.split("\n"), function parser(line) {
      i = line.indexOf(":");
      key = utils2.trim(line.substr(0, i)).toLowerCase();
      val = utils2.trim(line.substr(i + 1));
      if (key) {
        if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
          return;
        }
        if (key === "set-cookie") {
          parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
        }
      }
    });
    return parsed;
  };
  return parseHeaders;
}
var isURLSameOrigin;
var hasRequiredIsURLSameOrigin;
function requireIsURLSameOrigin() {
  if (hasRequiredIsURLSameOrigin)
    return isURLSameOrigin;
  hasRequiredIsURLSameOrigin = 1;
  var utils2 = utils$9;
  isURLSameOrigin = utils2.isStandardBrowserEnv() ? (
    // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
    function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement("a");
      var originURL;
      function resolveURL(url) {
        var href = url;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin2(requestURL) {
        var parsed = utils2.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }()
  ) : (
    // Non standard browser envs (web workers, react-native) lack needed support.
    function nonStandardBrowserEnv() {
      return function isURLSameOrigin2() {
        return true;
      };
    }()
  );
  return isURLSameOrigin;
}
var xhr;
var hasRequiredXhr;
function requireXhr() {
  if (hasRequiredXhr)
    return xhr;
  hasRequiredXhr = 1;
  var utils2 = utils$9;
  var settle2 = requireSettle();
  var cookies2 = requireCookies();
  var buildURL3 = buildURL$1;
  var buildFullPath2 = requireBuildFullPath();
  var parseHeaders2 = requireParseHeaders();
  var isURLSameOrigin2 = requireIsURLSameOrigin();
  var createError2 = requireCreateError();
  xhr = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      var requestData = config.data;
      var requestHeaders = config.headers;
      var responseType = config.responseType;
      if (utils2.isFormData(requestData)) {
        delete requestHeaders["Content-Type"];
      }
      var request2 = new XMLHttpRequest();
      if (config.auth) {
        var username = config.auth.username || "";
        var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
        requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
      }
      var fullPath = buildFullPath2(config.baseURL, config.url);
      request2.open(config.method.toUpperCase(), buildURL3(fullPath, config.params, config.paramsSerializer), true);
      request2.timeout = config.timeout;
      function onloadend() {
        if (!request2) {
          return;
        }
        var responseHeaders = "getAllResponseHeaders" in request2 ? parseHeaders2(request2.getAllResponseHeaders()) : null;
        var responseData = !responseType || responseType === "text" || responseType === "json" ? request2.responseText : request2.response;
        var response = {
          data: responseData,
          status: request2.status,
          statusText: request2.statusText,
          headers: responseHeaders,
          config,
          request: request2
        };
        settle2(resolve, reject, response);
        request2 = null;
      }
      if ("onloadend" in request2) {
        request2.onloadend = onloadend;
      } else {
        request2.onreadystatechange = function handleLoad() {
          if (!request2 || request2.readyState !== 4) {
            return;
          }
          if (request2.status === 0 && !(request2.responseURL && request2.responseURL.indexOf("file:") === 0)) {
            return;
          }
          setTimeout(onloadend);
        };
      }
      request2.onabort = function handleAbort() {
        if (!request2) {
          return;
        }
        reject(createError2("Request aborted", config, "ECONNABORTED", request2));
        request2 = null;
      };
      request2.onerror = function handleError() {
        reject(createError2("Network Error", config, null, request2));
        request2 = null;
      };
      request2.ontimeout = function handleTimeout() {
        var timeoutErrorMessage = "timeout of " + config.timeout + "ms exceeded";
        if (config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage;
        }
        reject(createError2(
          timeoutErrorMessage,
          config,
          config.transitional && config.transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED",
          request2
        ));
        request2 = null;
      };
      if (utils2.isStandardBrowserEnv()) {
        var xsrfValue = (config.withCredentials || isURLSameOrigin2(fullPath)) && config.xsrfCookieName ? cookies2.read(config.xsrfCookieName) : void 0;
        if (xsrfValue) {
          requestHeaders[config.xsrfHeaderName] = xsrfValue;
        }
      }
      if ("setRequestHeader" in request2) {
        utils2.forEach(requestHeaders, function setRequestHeader(val, key) {
          if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
            delete requestHeaders[key];
          } else {
            request2.setRequestHeader(key, val);
          }
        });
      }
      if (!utils2.isUndefined(config.withCredentials)) {
        request2.withCredentials = !!config.withCredentials;
      }
      if (responseType && responseType !== "json") {
        request2.responseType = config.responseType;
      }
      if (typeof config.onDownloadProgress === "function") {
        request2.addEventListener("progress", config.onDownloadProgress);
      }
      if (typeof config.onUploadProgress === "function" && request2.upload) {
        request2.upload.addEventListener("progress", config.onUploadProgress);
      }
      if (config.cancelToken) {
        config.cancelToken.promise.then(function onCanceled(cancel) {
          if (!request2) {
            return;
          }
          request2.abort();
          reject(cancel);
          request2 = null;
        });
      }
      if (!requestData) {
        requestData = null;
      }
      request2.send(requestData);
    });
  };
  return xhr;
}
var utils$5 = utils$9;
var normalizeHeaderName2 = normalizeHeaderName$1;
var enhanceError2 = enhanceError$1;
var DEFAULT_CONTENT_TYPE = {
  "Content-Type": "application/x-www-form-urlencoded"
};
function setContentTypeIfUnset(headers, value) {
  if (!utils$5.isUndefined(headers) && utils$5.isUndefined(headers["Content-Type"])) {
    headers["Content-Type"] = value;
  }
}
function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== "undefined") {
    adapter = requireXhr();
  } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
    adapter = requireXhr();
  }
  return adapter;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$5.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$5.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
var defaults$3 = {
  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName2(headers, "Accept");
    normalizeHeaderName2(headers, "Content-Type");
    if (utils$5.isFormData(data) || utils$5.isArrayBuffer(data) || utils$5.isBuffer(data) || utils$5.isStream(data) || utils$5.isFile(data) || utils$5.isBlob(data)) {
      return data;
    }
    if (utils$5.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils$5.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
      return data.toString();
    }
    if (utils$5.isObject(data) || headers && headers["Content-Type"] === "application/json") {
      setContentTypeIfUnset(headers, "application/json");
      return stringifySafely(data);
    }
    return data;
  }],
  transformResponse: [function transformResponse(data) {
    var transitional2 = this.transitional;
    var silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
    var forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
    if (strictJSONParsing || forcedJSONParsing && utils$5.isString(data) && data.length) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw enhanceError2(e, this, "E_JSON_PARSE");
          }
          throw e;
        }
      }
    }
    return data;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};
defaults$3.headers = {
  common: {
    "Accept": "application/json, text/plain, */*"
  }
};
utils$5.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
  defaults$3.headers[method] = {};
});
utils$5.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  defaults$3.headers[method] = utils$5.merge(DEFAULT_CONTENT_TYPE);
});
var defaults_1 = defaults$3;
var utils$4 = utils$9;
var defaults$2 = defaults_1;
var transformData$1 = function transformData(data, headers, fns) {
  var context = this || defaults$2;
  utils$4.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });
  return data;
};
var isCancel$1;
var hasRequiredIsCancel;
function requireIsCancel() {
  if (hasRequiredIsCancel)
    return isCancel$1;
  hasRequiredIsCancel = 1;
  isCancel$1 = function isCancel2(value) {
    return !!(value && value.__CANCEL__);
  };
  return isCancel$1;
}
var utils$3 = utils$9;
var transformData2 = transformData$1;
var isCancel = requireIsCancel();
var defaults$1 = defaults_1;
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}
var dispatchRequest$1 = function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = config.headers || {};
  config.data = transformData2.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );
  config.headers = utils$3.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );
  utils$3.forEach(
    ["delete", "get", "head", "post", "put", "patch", "common"],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );
  var adapter = config.adapter || defaults$1.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData2.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData2.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }
    return Promise.reject(reason);
  });
};
var utils$2 = utils$9;
var mergeConfig$2 = function mergeConfig(config1, config2) {
  config2 = config2 || {};
  var config = {};
  var valueFromConfig2Keys = ["url", "method", "data"];
  var mergeDeepPropertiesKeys = ["headers", "auth", "proxy", "params"];
  var defaultToConfig2Keys = [
    "baseURL",
    "transformRequest",
    "transformResponse",
    "paramsSerializer",
    "timeout",
    "timeoutMessage",
    "withCredentials",
    "adapter",
    "responseType",
    "xsrfCookieName",
    "xsrfHeaderName",
    "onUploadProgress",
    "onDownloadProgress",
    "decompress",
    "maxContentLength",
    "maxBodyLength",
    "maxRedirects",
    "transport",
    "httpAgent",
    "httpsAgent",
    "cancelToken",
    "socketPath",
    "responseEncoding"
  ];
  var directMergeKeys = ["validateStatus"];
  function getMergedValue(target, source) {
    if (utils$2.isPlainObject(target) && utils$2.isPlainObject(source)) {
      return utils$2.merge(target, source);
    } else if (utils$2.isPlainObject(source)) {
      return utils$2.merge({}, source);
    } else if (utils$2.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(prop) {
    if (!utils$2.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils$2.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(void 0, config1[prop]);
    }
  }
  utils$2.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils$2.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(void 0, config2[prop]);
    }
  });
  utils$2.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);
  utils$2.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils$2.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(void 0, config2[prop]);
    } else if (!utils$2.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(void 0, config1[prop]);
    }
  });
  utils$2.forEach(directMergeKeys, function merge2(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(void 0, config1[prop]);
    }
  });
  var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys);
  var otherKeys = Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys(key) {
    return axiosKeys.indexOf(key) === -1;
  });
  utils$2.forEach(otherKeys, mergeDeepProperties);
  return config;
};
const name = "axios";
const version = "0.21.4";
const description = "Promise based HTTP client for the browser and node.js";
const main = "index.js";
const scripts = {
  test: "grunt test",
  start: "node ./sandbox/server.js",
  build: "NODE_ENV=production grunt build",
  preversion: "npm test",
  version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",
  postversion: "git push && git push --tags",
  examples: "node ./examples/server.js",
  coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
  fix: "eslint --fix lib/**/*.js"
};
const repository = {
  type: "git",
  url: "https://github.com/axios/axios.git"
};
const keywords = [
  "xhr",
  "http",
  "ajax",
  "promise",
  "node"
];
const author = "Matt Zabriskie";
const license = "MIT";
const bugs = {
  url: "https://github.com/axios/axios/issues"
};
const homepage = "https://axios-http.com";
const devDependencies = {
  coveralls: "^3.0.0",
  "es6-promise": "^4.2.4",
  grunt: "^1.3.0",
  "grunt-banner": "^0.6.0",
  "grunt-cli": "^1.2.0",
  "grunt-contrib-clean": "^1.1.0",
  "grunt-contrib-watch": "^1.0.0",
  "grunt-eslint": "^23.0.0",
  "grunt-karma": "^4.0.0",
  "grunt-mocha-test": "^0.13.3",
  "grunt-ts": "^6.0.0-beta.19",
  "grunt-webpack": "^4.0.2",
  "istanbul-instrumenter-loader": "^1.0.0",
  "jasmine-core": "^2.4.1",
  karma: "^6.3.2",
  "karma-chrome-launcher": "^3.1.0",
  "karma-firefox-launcher": "^2.1.0",
  "karma-jasmine": "^1.1.1",
  "karma-jasmine-ajax": "^0.1.13",
  "karma-safari-launcher": "^1.0.0",
  "karma-sauce-launcher": "^4.3.6",
  "karma-sinon": "^1.0.5",
  "karma-sourcemap-loader": "^0.3.8",
  "karma-webpack": "^4.0.2",
  "load-grunt-tasks": "^3.5.2",
  minimist: "^1.2.0",
  mocha: "^8.2.1",
  sinon: "^4.5.0",
  "terser-webpack-plugin": "^4.2.3",
  typescript: "^4.0.5",
  "url-search-params": "^0.10.0",
  webpack: "^4.44.2",
  "webpack-dev-server": "^3.11.0"
};
const browser = {
  "./lib/adapters/http.js": "./lib/adapters/xhr.js"
};
const jsdelivr = "dist/axios.min.js";
const unpkg = "dist/axios.min.js";
const typings = "./index.d.ts";
const dependencies = {
  "follow-redirects": "^1.14.0"
};
const bundlesize = [
  {
    path: "./dist/axios.min.js",
    threshold: "5kB"
  }
];
const require$$0 = {
  name,
  version,
  description,
  main,
  scripts,
  repository,
  keywords,
  author,
  license,
  bugs,
  homepage,
  devDependencies,
  browser,
  jsdelivr,
  unpkg,
  typings,
  dependencies,
  bundlesize
};
var pkg = require$$0;
var validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i) {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
var deprecatedWarnings = {};
var currentVerArr = pkg.version.split(".");
function isOlderVersion(version2, thanVersion) {
  var pkgVersionArr = thanVersion ? thanVersion.split(".") : currentVerArr;
  var destVer = version2.split(".");
  for (var i = 0; i < 3; i++) {
    if (pkgVersionArr[i] > destVer[i]) {
      return true;
    } else if (pkgVersionArr[i] < destVer[i]) {
      return false;
    }
  }
  return false;
}
validators$1.transitional = function transitional(validator2, version2, message) {
  var isDeprecated = version2 && isOlderVersion(version2);
  function formatMessage(opt, desc) {
    return "[Axios v" + pkg.version + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return function(value, opt, opts) {
    if (validator2 === false) {
      throw new Error(formatMessage(opt, " has been removed in " + version2));
    }
    if (isDeprecated && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version2 + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new TypeError("options must be an object");
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator2 = schema[opt];
    if (validator2) {
      var value = options[opt];
      var result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new TypeError("option " + opt + " must be " + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error("Unknown option " + opt);
    }
  }
}
var validator$1 = {
  isOlderVersion,
  assertOptions,
  validators: validators$1
};
var utils$1 = utils$9;
var buildURL2 = buildURL$1;
var InterceptorManager = InterceptorManager_1;
var dispatchRequest2 = dispatchRequest$1;
var mergeConfig$1 = mergeConfig$2;
var validator = validator$1;
var validators = validator.validators;
function Axios$1(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
Axios$1.prototype.request = function request(config) {
  if (typeof config === "string") {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }
  config = mergeConfig$1(this.defaults, config);
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = "get";
  }
  var transitional2 = config.transitional;
  if (transitional2 !== void 0) {
    validator.assertOptions(transitional2, {
      silentJSONParsing: validators.transitional(validators.boolean, "1.0.0"),
      forcedJSONParsing: validators.transitional(validators.boolean, "1.0.0"),
      clarifyTimeoutError: validators.transitional(validators.boolean, "1.0.0")
    }, false);
  }
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
      return;
    }
    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });
  var promise;
  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest2, void 0];
    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);
    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }
    return promise;
  }
  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }
  try {
    promise = dispatchRequest2(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }
  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }
  return promise;
};
Axios$1.prototype.getUri = function getUri(config) {
  config = mergeConfig$1(this.defaults, config);
  return buildURL2(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
};
utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData2(method) {
  Axios$1.prototype[method] = function(url, config) {
    return this.request(mergeConfig$1(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});
utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData2(method) {
  Axios$1.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig$1(config || {}, {
      method,
      url,
      data
    }));
  };
});
var Axios_1 = Axios$1;
var Cancel_1;
var hasRequiredCancel;
function requireCancel() {
  if (hasRequiredCancel)
    return Cancel_1;
  hasRequiredCancel = 1;
  function Cancel(message) {
    this.message = message;
  }
  Cancel.prototype.toString = function toString2() {
    return "Cancel" + (this.message ? ": " + this.message : "");
  };
  Cancel.prototype.__CANCEL__ = true;
  Cancel_1 = Cancel;
  return Cancel_1;
}
var CancelToken_1;
var hasRequiredCancelToken;
function requireCancelToken() {
  if (hasRequiredCancelToken)
    return CancelToken_1;
  hasRequiredCancelToken = 1;
  var Cancel = requireCancel();
  function CancelToken(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    var token2 = this;
    executor(function cancel(message) {
      if (token2.reason) {
        return;
      }
      token2.reason = new Cancel(message);
      resolvePromise(token2.reason);
    });
  }
  CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  };
  CancelToken.source = function source() {
    var cancel;
    var token2 = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token: token2,
      cancel
    };
  };
  CancelToken_1 = CancelToken;
  return CancelToken_1;
}
var spread;
var hasRequiredSpread;
function requireSpread() {
  if (hasRequiredSpread)
    return spread;
  hasRequiredSpread = 1;
  spread = function spread2(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  };
  return spread;
}
var isAxiosError;
var hasRequiredIsAxiosError;
function requireIsAxiosError() {
  if (hasRequiredIsAxiosError)
    return isAxiosError;
  hasRequiredIsAxiosError = 1;
  isAxiosError = function isAxiosError2(payload) {
    return typeof payload === "object" && payload.isAxiosError === true;
  };
  return isAxiosError;
}
var utils = utils$9;
var bind2 = bind$2;
var Axios = Axios_1;
var mergeConfig2 = mergeConfig$2;
var defaults = defaults_1;
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind2(Axios.prototype.request, context);
  utils.extend(instance, Axios.prototype, context);
  utils.extend(instance, context);
  return instance;
}
var axios$3 = createInstance(defaults);
axios$3.Axios = Axios;
axios$3.create = function create(instanceConfig) {
  return createInstance(mergeConfig2(axios$3.defaults, instanceConfig));
};
axios$3.Cancel = requireCancel();
axios$3.CancelToken = requireCancelToken();
axios$3.isCancel = requireIsCancel();
axios$3.all = function all(promises) {
  return Promise.all(promises);
};
axios$3.spread = requireSpread();
axios$3.isAxiosError = requireIsAxiosError();
axios$4.exports = axios$3;
axios$4.exports.default = axios$3;
var axiosExports = axios$4.exports;
var axios$1 = axiosExports;
const axios$2 = /* @__PURE__ */ getDefaultExportFromCjs(axios$1);
var queryString$1 = {};
var strictUriEncode = (str) => encodeURIComponent(str).replace(/[!'()*]/g, (x) => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);
var token = "%[a-f0-9]{2}";
var singleMatcher = new RegExp("(" + token + ")|([^%]+?)", "gi");
var multiMatcher = new RegExp("(" + token + ")+", "gi");
function decodeComponents(components, split) {
  try {
    return [decodeURIComponent(components.join(""))];
  } catch (err) {
  }
  if (components.length === 1) {
    return components;
  }
  split = split || 1;
  var left = components.slice(0, split);
  var right = components.slice(split);
  return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}
function decode(input) {
  try {
    return decodeURIComponent(input);
  } catch (err) {
    var tokens = input.match(singleMatcher) || [];
    for (var i = 1; i < tokens.length; i++) {
      input = decodeComponents(tokens, i).join("");
      tokens = input.match(singleMatcher) || [];
    }
    return input;
  }
}
function customDecodeURIComponent(input) {
  var replaceMap = {
    "%FE%FF": "��",
    "%FF%FE": "��"
  };
  var match = multiMatcher.exec(input);
  while (match) {
    try {
      replaceMap[match[0]] = decodeURIComponent(match[0]);
    } catch (err) {
      var result = decode(match[0]);
      if (result !== match[0]) {
        replaceMap[match[0]] = result;
      }
    }
    match = multiMatcher.exec(input);
  }
  replaceMap["%C2"] = "�";
  var entries = Object.keys(replaceMap);
  for (var i = 0; i < entries.length; i++) {
    var key = entries[i];
    input = input.replace(new RegExp(key, "g"), replaceMap[key]);
  }
  return input;
}
var decodeUriComponent = function(encodedURI) {
  if (typeof encodedURI !== "string") {
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof encodedURI + "`");
  }
  try {
    encodedURI = encodedURI.replace(/\+/g, " ");
    return decodeURIComponent(encodedURI);
  } catch (err) {
    return customDecodeURIComponent(encodedURI);
  }
};
var splitOnFirst = (string, separator) => {
  if (!(typeof string === "string" && typeof separator === "string")) {
    throw new TypeError("Expected the arguments to be of type `string`");
  }
  if (separator === "") {
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
var filterObj = function(obj, predicate) {
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
(function(exports) {
  const strictUriEncode$1 = strictUriEncode;
  const decodeComponent = decodeUriComponent;
  const splitOnFirst$1 = splitOnFirst;
  const filterObject = filterObj;
  const isNullOrUndefined = (value) => value === null || value === void 0;
  function encoderForArrayFormat(options) {
    switch (options.arrayFormat) {
      case "index":
        return (key) => (result, value) => {
          const index = result.length;
          if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
            return result;
          }
          if (value === null) {
            return [...result, [encode2(key, options), "[", index, "]"].join("")];
          }
          return [
            ...result,
            [encode2(key, options), "[", encode2(index, options), "]=", encode2(value, options)].join("")
          ];
        };
      case "bracket":
        return (key) => (result, value) => {
          if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
            return result;
          }
          if (value === null) {
            return [...result, [encode2(key, options), "[]"].join("")];
          }
          return [...result, [encode2(key, options), "[]=", encode2(value, options)].join("")];
        };
      case "comma":
      case "separator":
        return (key) => (result, value) => {
          if (value === null || value === void 0 || value.length === 0) {
            return result;
          }
          if (result.length === 0) {
            return [[encode2(key, options), "=", encode2(value, options)].join("")];
          }
          return [[result, encode2(value, options)].join(options.arrayFormatSeparator)];
        };
      default:
        return (key) => (result, value) => {
          if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
            return result;
          }
          if (value === null) {
            return [...result, encode2(key, options)];
          }
          return [...result, [encode2(key, options), "=", encode2(value, options)].join("")];
        };
    }
  }
  function parserForArrayFormat(options) {
    let result;
    switch (options.arrayFormat) {
      case "index":
        return (key, value, accumulator) => {
          result = /\[(\d*)\]$/.exec(key);
          key = key.replace(/\[\d*\]$/, "");
          if (!result) {
            accumulator[key] = value;
            return;
          }
          if (accumulator[key] === void 0) {
            accumulator[key] = {};
          }
          accumulator[key][result[1]] = value;
        };
      case "bracket":
        return (key, value, accumulator) => {
          result = /(\[\])$/.exec(key);
          key = key.replace(/\[\]$/, "");
          if (!result) {
            accumulator[key] = value;
            return;
          }
          if (accumulator[key] === void 0) {
            accumulator[key] = [value];
            return;
          }
          accumulator[key] = [].concat(accumulator[key], value);
        };
      case "comma":
      case "separator":
        return (key, value, accumulator) => {
          const isArray2 = typeof value === "string" && value.includes(options.arrayFormatSeparator);
          const isEncodedArray = typeof value === "string" && !isArray2 && decode2(value, options).includes(options.arrayFormatSeparator);
          value = isEncodedArray ? decode2(value, options) : value;
          const newValue = isArray2 || isEncodedArray ? value.split(options.arrayFormatSeparator).map((item) => decode2(item, options)) : value === null ? value : decode2(value, options);
          accumulator[key] = newValue;
        };
      default:
        return (key, value, accumulator) => {
          if (accumulator[key] === void 0) {
            accumulator[key] = value;
            return;
          }
          accumulator[key] = [].concat(accumulator[key], value);
        };
    }
  }
  function validateArrayFormatSeparator(value) {
    if (typeof value !== "string" || value.length !== 1) {
      throw new TypeError("arrayFormatSeparator must be single character string");
    }
  }
  function encode2(value, options) {
    if (options.encode) {
      return options.strict ? strictUriEncode$1(value) : encodeURIComponent(value);
    }
    return value;
  }
  function decode2(value, options) {
    if (options.decode) {
      return decodeComponent(value);
    }
    return value;
  }
  function keysSorter(input) {
    if (Array.isArray(input)) {
      return input.sort();
    }
    if (typeof input === "object") {
      return keysSorter(Object.keys(input)).sort((a2, b) => Number(a2) - Number(b)).map((key) => input[key]);
    }
    return input;
  }
  function removeHash(input) {
    const hashStart = input.indexOf("#");
    if (hashStart !== -1) {
      input = input.slice(0, hashStart);
    }
    return input;
  }
  function getHash(url) {
    let hash = "";
    const hashStart = url.indexOf("#");
    if (hashStart !== -1) {
      hash = url.slice(hashStart);
    }
    return hash;
  }
  function extract(input) {
    input = removeHash(input);
    const queryStart = input.indexOf("?");
    if (queryStart === -1) {
      return "";
    }
    return input.slice(queryStart + 1);
  }
  function parseValue(value, options) {
    if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === "string" && value.trim() !== "")) {
      value = Number(value);
    } else if (options.parseBooleans && value !== null && (value.toLowerCase() === "true" || value.toLowerCase() === "false")) {
      value = value.toLowerCase() === "true";
    }
    return value;
  }
  function parse(query, options) {
    options = Object.assign({
      decode: true,
      sort: true,
      arrayFormat: "none",
      arrayFormatSeparator: ",",
      parseNumbers: false,
      parseBooleans: false
    }, options);
    validateArrayFormatSeparator(options.arrayFormatSeparator);
    const formatter = parserForArrayFormat(options);
    const ret = /* @__PURE__ */ Object.create(null);
    if (typeof query !== "string") {
      return ret;
    }
    query = query.trim().replace(/^[?#&]/, "");
    if (!query) {
      return ret;
    }
    for (const param of query.split("&")) {
      if (param === "") {
        continue;
      }
      let [key, value] = splitOnFirst$1(options.decode ? param.replace(/\+/g, " ") : param, "=");
      value = value === void 0 ? null : ["comma", "separator"].includes(options.arrayFormat) ? value : decode2(value, options);
      formatter(decode2(key, options), value, ret);
    }
    for (const key of Object.keys(ret)) {
      const value = ret[key];
      if (typeof value === "object" && value !== null) {
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
      if (Boolean(value) && typeof value === "object" && !Array.isArray(value)) {
        result[key] = keysSorter(value);
      } else {
        result[key] = value;
      }
      return result;
    }, /* @__PURE__ */ Object.create(null));
  }
  exports.extract = extract;
  exports.parse = parse;
  exports.stringify = (object, options) => {
    if (!object) {
      return "";
    }
    options = Object.assign({
      encode: true,
      strict: true,
      arrayFormat: "none",
      arrayFormatSeparator: ","
    }, options);
    validateArrayFormatSeparator(options.arrayFormatSeparator);
    const shouldFilter = (key) => options.skipNull && isNullOrUndefined(object[key]) || options.skipEmptyString && object[key] === "";
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
    return keys.map((key) => {
      const value = object[key];
      if (value === void 0) {
        return "";
      }
      if (value === null) {
        return encode2(key, options);
      }
      if (Array.isArray(value)) {
        return value.reduce(formatter(key), []).join("&");
      }
      return encode2(key, options) + "=" + encode2(value, options);
    }).filter((x) => x.length > 0).join("&");
  };
  exports.parseUrl = (url, options) => {
    options = Object.assign({
      decode: true
    }, options);
    const [url_, hash] = splitOnFirst$1(url, "#");
    return Object.assign(
      {
        url: url_.split("?")[0] || "",
        query: parse(extract(url), options)
      },
      options && options.parseFragmentIdentifier && hash ? { fragmentIdentifier: decode2(hash, options) } : {}
    );
  };
  exports.stringifyUrl = (object, options) => {
    options = Object.assign({
      encode: true,
      strict: true
    }, options);
    const url = removeHash(object.url).split("?")[0] || "";
    const queryFromUrl = exports.extract(object.url);
    const parsedQueryFromUrl = exports.parse(queryFromUrl, { sort: false });
    const query = Object.assign(parsedQueryFromUrl, object.query);
    let queryString2 = exports.stringify(query, options);
    if (queryString2) {
      queryString2 = `?${queryString2}`;
    }
    let hash = getHash(object.url);
    if (object.fragmentIdentifier) {
      hash = `#${encode2(object.fragmentIdentifier, options)}`;
    }
    return `${url}${queryString2}${hash}`;
  };
  exports.pick = (input, filter, options) => {
    options = Object.assign({
      parseFragmentIdentifier: true
    }, options);
    const { url, query, fragmentIdentifier } = exports.parseUrl(input, options);
    return exports.stringifyUrl({
      url,
      query: filterObject(query, filter),
      fragmentIdentifier
    }, options);
  };
  exports.exclude = (input, filter, options) => {
    const exclusionFilter = Array.isArray(filter) ? (key) => !filter.includes(key) : (key, value) => !filter(key, value);
    return exports.pick(input, exclusionFilter, options);
  };
})(queryString$1);
const queryString = /* @__PURE__ */ getDefaultExportFromCjs(queryString$1);
var index_umd = { exports: {} };
(function(module, exports) {
  (function(g, o) {
    o(exports, require$$0$1);
  })(commonjsGlobal, function(g, o) {
    var mt = Object.defineProperty, gt = Object.defineProperties;
    var yt = Object.getOwnPropertyDescriptors;
    var V = Object.getOwnPropertySymbols;
    var Pt = Object.prototype.hasOwnProperty, Et = Object.prototype.propertyIsEnumerable;
    var x = (g2, o2, P2) => o2 in g2 ? mt(g2, o2, { enumerable: true, configurable: true, writable: true, value: P2 }) : g2[o2] = P2, v = (g2, o2) => {
      for (var P2 in o2 || (o2 = {}))
        Pt.call(o2, P2) && x(g2, P2, o2[P2]);
      if (V)
        for (var P2 of V(o2))
          Et.call(o2, P2) && x(g2, P2, o2[P2]);
      return g2;
    }, G = (g2, o2) => gt(g2, yt(o2));
    const P = {};
    var S = { methods: { registerNestable(t) {
      const e = this._getByGroup(t.group);
      e.onDragStartListeners.push(t.onDragStart), e.onMouseEnterListeners.push(t.onMouseEnter), e.onMouseMoveListeners.push(t.onMouseMove);
    }, notifyDragStart(t, e, s) {
      const u = this._getByGroup(t);
      for (const i of u.onDragStartListeners)
        i(e, s);
    }, notifyMouseEnter(t, e, s, u) {
      const i = this._getByGroup(t);
      for (const l of i.onMouseEnterListeners)
        l(e, s, u);
    }, notifyMouseMove(t, e) {
      const s = this._getByGroup(t);
      for (const u of s.onMouseMoveListeners)
        u(e);
    }, _getByGroup(t) {
      return P[t] || (P[t] = { onDragStartListeners: [], onMouseEnterListeners: [], onMouseMoveListeners: [], onDragStart: [], dragItem: null }), P[t];
    } } }, C = (t, e) => {
      const s = t.__vccOpts || t;
      for (const [u, i] of e)
        s[u] = i;
      return s;
    };
    const Y = { name: "NestableItem", mixins: [S], props: { item: { type: Object, required: true, default: () => ({}) }, index: { type: Number, required: false, default: null }, isChild: { type: Boolean, required: false, default: false }, isCopy: { type: Boolean, required: false, default: false }, options: { type: Object, required: true, default: () => ({}) } }, inject: ["listId", "group", "keyProp"], data() {
      return { breakPoint: null, moveDown: false };
    }, computed: { isDragging() {
      const t = this.options.dragItem;
      return !this.isCopy && t && t[this.options.keyProp] === this.item[this.options.keyProp];
    }, hasChildren() {
      return this.item[this.options.childrenProp] && this.item[this.options.childrenProp].length > 0;
    }, hasHandle() {
      return !!this.$scopedSlots.handler;
    }, normalizedClassProp() {
      const t = this.item[this.options.classProp];
      return t ? Array.isArray(t) ? t : typeof a == "object" ? [t] : [t] : [];
    }, itemClasses() {
      const t = this.isDragging ? ["is-dragging"] : [];
      return [`nestable-item${this.isCopy ? "-copy" : ""}`, `nestable-item${this.isCopy ? "-copy" : ""}-${this.item[this.options.keyProp]}`, ...t, ...this.normalizedClassProp];
    } }, methods: { onMouseEnter(t) {
      if (!!this.options.dragItem) {
        if (!t.movementY)
          return this.sendNotification(t);
        this.moveDown = t.movementY > 0, this.breakPoint = t.target.getBoundingClientRect().height / 2;
      }
    }, onMouseLeave() {
      this.breakPoint = null;
    }, onMouseMove(t) {
      if (!this.breakPoint)
        return;
      const e = t.offsetY - this.breakPoint;
      this.moveDown && e < this.breakPoint / 4 || !this.moveDown && e > -this.breakPoint / 4 || this.sendNotification(t);
    }, sendNotification(t) {
      this.breakPoint = null;
      const e = this.item || this.$parent.item;
      this.notifyMouseEnter(this.group, t, this.listId, e);
    } } }, O = { key: 0, class: "nestable-list" };
    function z(t, e, s, u, i, l) {
      const h = o.resolveComponent("NestableItem", true);
      return o.openBlock(), o.createElementBlock("li", { class: o.normalizeClass(l.itemClasses) }, [o.createElementVNode("div", { class: "nestable-item-content", onMouseenter: e[0] || (e[0] = (...m) => l.onMouseEnter && l.onMouseEnter(...m)), onMouseleave: e[1] || (e[1] = (...m) => l.onMouseLeave && l.onMouseLeave(...m)), onMousemove: e[2] || (e[2] = (...m) => l.onMouseMove && l.onMouseMove(...m)) }, [o.renderSlot(t.$slots, "default", { index: s.index, item: s.item, isChild: s.isChild })], 32), l.hasChildren ? (o.openBlock(), o.createElementBlock("ol", O, [(o.openBlock(true), o.createElementBlock(o.Fragment, null, o.renderList(s.item[s.options.childrenProp], (m, f) => (o.openBlock(), o.createBlock(h, { key: m[l.keyProp], item: m, index: f, options: s.options, "is-copy": s.isCopy, "is-child": "" }, { default: o.withCtx((E) => [o.renderSlot(t.$slots, "default", o.normalizeProps(o.guardReactiveProps(E)))]), _: 2 }, 1032, ["item", "index", "options", "is-copy"]))), 128))])) : o.createCommentVNode("", true)], 2);
    }
    var H = C(Y, [["render", z]]);
    const X = { name: "Placeholder", mixins: [S], props: { index: { type: Number, required: false, default: null }, options: { type: Object, required: false, default: () => ({}) } }, inject: ["listId", "group"], computed: { isDragging() {
      return this.options.dragItem;
    } }, methods: { onMouseEnter(t) {
      !this.options.dragItem || this.notifyMouseEnter(this.group, t, this.listId, null);
    } } };
    function F(t, e, s, u, i, l) {
      return o.openBlock(), o.createElementBlock("li", null, [o.createElementVNode("div", { class: "nestable-list-empty", onMouseenter: e[0] || (e[0] = (...h) => l.onMouseEnter && l.onMouseEnter(...h)) }, [o.renderSlot(t.$slots, "default")], 32)]);
    }
    var W = C(X, [["render", F]]), K = { methods: { getPathById(t, e = this.value) {
      let s = [];
      return e.every((u, i) => {
        if (u[this.keyProp] === t)
          s.push(i);
        else if (u[this.childrenProp]) {
          const l = this.getPathById(t, u[this.childrenProp]);
          l.length && (s = s.concat(i).concat(l));
        }
        return s.length === 0;
      }), s;
    }, getItemByPath(t, e = this.value) {
      let s = null;
      return t.forEach((u) => {
        s = (s && s[this.childrenProp] ? s[this.childrenProp] : e)[u];
      }), s;
    }, getItemDepth(t) {
      let e = 1;
      if (t[this.childrenProp] && t[this.childrenProp].length > 0) {
        const s = t[this.childrenProp].map(this.getItemDepth);
        e += Math.max(...s);
      }
      return e;
    }, getSplicePath(t, e = {}) {
      const s = {}, u = e.numToRemove || 0, i = e.itemsToInsert || [], l = t.length - 1;
      let h = s;
      return t.forEach((m, f) => {
        if (f === l)
          h.$splice = [[m, u, ...i]];
        else {
          const E = {};
          h[m] = { [e.childrenProp]: E }, h = E;
        }
      }), s;
    }, getRealNextPath(t, e) {
      const s = t.length - 1, u = e.length - 1;
      if (t.length < e.length) {
        let i = false;
        return e.map((l, h) => i ? h === u ? l + 1 : l : typeof t[h] != "number" ? l : e[h] > t[h] && h === s ? (i = true, l - 1) : l);
      } else if (t.length === e.length && e[u] > t[u]) {
        const i = this.getItemByPath(e);
        if (i[this.childrenProp] && i[this.childrenProp].length && !this.isCollapsed(i))
          return e.slice(0, -1).concat(e[u] - 1).concat(0);
      }
      return e;
    } } }, U = { methods: { hook(t, e) {
      if (!this.hooks[t])
        return true;
      const s = this.hooks[t](e);
      return s || s === void 0;
    } } };
    function J(t) {
      return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
    }
    var w = { exports: {} };
    (function(t, e) {
      Object.defineProperty(e, "__esModule", { value: true });
      function s(r) {
        return typeof r == "object" && !("toString" in r) ? Object.prototype.toString.call(r).slice(8, -1) : r;
      }
      var u = typeof process == "object" && true;
      function i(r, n) {
        if (!r)
          throw u ? new Error("Invariant failed") : new Error(n());
      }
      e.invariant = i;
      var l = Object.prototype.hasOwnProperty, h = Array.prototype.splice, m = Object.prototype.toString;
      function f(r) {
        return m.call(r).slice(8, -1);
      }
      var E = Object.assign || function(r, n) {
        return k(n).forEach(function(c) {
          l.call(n, c) && (r[c] = n[c]);
        }), r;
      }, k = typeof Object.getOwnPropertySymbols == "function" ? function(r) {
        return Object.keys(r).concat(Object.getOwnPropertySymbols(r));
      } : function(r) {
        return Object.keys(r);
      };
      function D(r) {
        return Array.isArray(r) ? E(r.constructor(r.length), r) : f(r) === "Map" ? new Map(r) : f(r) === "Set" ? new Set(r) : r && typeof r == "object" ? E(Object.create(Object.getPrototypeOf(r)), r) : r;
      }
      var L = function() {
        function r() {
          this.commands = E({}, lt), this.update = this.update.bind(this), this.update.extend = this.extend = this.extend.bind(this), this.update.isEquals = function(n, c) {
            return n === c;
          }, this.update.newContext = function() {
            return new r().update;
          };
        }
        return Object.defineProperty(r.prototype, "isEquals", { get: function() {
          return this.update.isEquals;
        }, set: function(n) {
          this.update.isEquals = n;
        }, enumerable: true, configurable: true }), r.prototype.extend = function(n, c) {
          this.commands[n] = c;
        }, r.prototype.update = function(n, c) {
          var p = this, d = typeof c == "function" ? { $apply: c } : c;
          Array.isArray(n) && Array.isArray(d) || i(!Array.isArray(d), function() {
            return "update(): You provided an invalid spec to update(). The spec may not contain an array except as the value of $set, $push, $unshift, $splice or any custom command allowing an array value.";
          }), i(typeof d == "object" && d !== null, function() {
            return "update(): You provided an invalid spec to update(). The spec and every included key path must be plain objects containing one of the " + ("following commands: " + Object.keys(p.commands).join(", ") + ".");
          });
          var y = n;
          return k(d).forEach(function(M) {
            if (l.call(p.commands, M)) {
              var pt = n === y;
              y = p.commands[M](d[M], y, d, n), pt && p.isEquals(y, n) && (y = n);
            } else {
              var B = f(n) === "Map" ? p.update(n.get(M), d[M]) : p.update(n[M], d[M]), ft = f(y) === "Map" ? y.get(M) : y[M];
              (!p.isEquals(B, ft) || typeof B == "undefined" && !l.call(n, M)) && (y === n && (y = D(n)), f(y) === "Map" ? y.set(M, B) : y[M] = B);
            }
          }), y;
        }, r;
      }();
      e.Context = L;
      var lt = { $push: function(r, n, c) {
        return q(n, c, "$push"), r.length ? n.concat(r) : n;
      }, $unshift: function(r, n, c) {
        return q(n, c, "$unshift"), r.length ? r.concat(n) : n;
      }, $splice: function(r, n, c, p) {
        return ut(n, c), r.forEach(function(d) {
          A(d), n === p && d.length && (n = D(p)), h.apply(n, d);
        }), n;
      }, $set: function(r, n, c) {
        return ct(c), r;
      }, $toggle: function(r, n) {
        I(r, "$toggle");
        var c = r.length ? D(n) : n;
        return r.forEach(function(p) {
          c[p] = !n[p];
        }), c;
      }, $unset: function(r, n, c, p) {
        return I(r, "$unset"), r.forEach(function(d) {
          Object.hasOwnProperty.call(n, d) && (n === p && (n = D(p)), delete n[d]);
        }), n;
      }, $add: function(r, n, c, p) {
        return R(n, "$add"), I(r, "$add"), f(n) === "Map" ? r.forEach(function(d) {
          var y = d[0], M = d[1];
          n === p && n.get(y) !== M && (n = D(p)), n.set(y, M);
        }) : r.forEach(function(d) {
          n === p && !n.has(d) && (n = D(p)), n.add(d);
        }), n;
      }, $remove: function(r, n, c, p) {
        return R(n, "$remove"), I(r, "$remove"), r.forEach(function(d) {
          n === p && n.has(d) && (n = D(p)), n.delete(d);
        }), n;
      }, $merge: function(r, n, c, p) {
        return dt(n, r), k(r).forEach(function(d) {
          r[d] !== n[d] && (n === p && (n = D(p)), n[d] = r[d]);
        }), n;
      }, $apply: function(r, n) {
        return ht(r), r(n);
      } }, _2 = new L();
      e.isEquals = _2.update.isEquals, e.extend = _2.extend, e.default = _2.update, e.default.default = t.exports = E(e.default, e);
      function q(r, n, c) {
        i(Array.isArray(r), function() {
          return "update(): expected target of " + s(c) + " to be an array; got " + s(r) + ".";
        }), I(n[c], c);
      }
      function I(r, n) {
        i(Array.isArray(r), function() {
          return "update(): expected spec of " + s(n) + " to be an array; got " + s(r) + ". Did you forget to wrap your parameter in an array?";
        });
      }
      function ut(r, n) {
        i(Array.isArray(r), function() {
          return "Expected $splice target to be an array; got " + s(r);
        }), A(n.$splice);
      }
      function A(r) {
        i(Array.isArray(r), function() {
          return "update(): expected spec of $splice to be an array of arrays; got " + s(r) + ". Did you forget to wrap your parameters in an array?";
        });
      }
      function ht(r) {
        i(typeof r == "function", function() {
          return "update(): expected spec of $apply to be a function; got " + s(r) + ".";
        });
      }
      function ct(r) {
        i(Object.keys(r).length === 1, function() {
          return "Cannot have more than one key in an object with $set";
        });
      }
      function dt(r, n) {
        i(n && typeof n == "object", function() {
          return "update(): $merge expects a spec of type 'object'; got " + s(n);
        }), i(r && typeof r == "object", function() {
          return "update(): $merge expects a target of type 'object'; got " + s(r);
        });
      }
      function R(r, n) {
        var c = f(r);
        i(c === "Map" || c === "Set", function() {
          return "update(): " + s(n) + " expects a target of type Set or Map; got " + s(c);
        });
      }
    })(w, w.exports);
    var b = J(w.exports);
    const Q = (t, e) => {
      var s;
      try {
        let u = t.closest(e);
      } catch {
        s = t;
      }
      return s;
    }, Z = (t) => {
      var e = t.getBoundingClientRect();
      return { top: Math.round(e.top), left: Math.round(e.left) };
    }, j = (t, e) => ({ transform: "translate(" + t + "px, " + e + "px)" }), N = (t, e) => t.map((s) => G(v({}, s), { [e]: s[e] ? N(s[e], e) : [] })), tt = { name: "VueNestable", components: { NestableItem: H, Placeholder: W }, mixins: [K, S, U], props: { value: { type: Array, required: true, default: () => [] }, threshold: { type: Number, required: false, default: 30 }, maxDepth: { type: Number, required: false, default: 10 }, keyProp: { type: String, required: false, default: "id" }, classProp: { type: String, required: false, default: null }, group: { type: [String, Number], required: false, default: () => Math.random().toString(36).slice(2) }, childrenProp: { type: String, required: false, default: "children" }, collapsed: { type: Boolean, required: false, default: false }, hooks: { type: Object, required: false, default: () => ({}) }, rtl: { type: Boolean, required: false, default: false } }, provide() {
      return { listId: this.listId, group: this.group, keyProp: this.keyProp, onDragEnd: this.onDragEnd };
    }, data() {
      return { itemsOld: null, dragItem: null, mouse: { last: { x: 0 }, shift: { x: 0 } }, el: null, elCopyStyles: null, isDirty: false, collapsedGroups: [], listId: Math.random().toString(36).slice(2) };
    }, computed: { listIsEmpty() {
      return this.value.length === 0;
    }, itemOptions() {
      return { dragItem: this.dragItem, keyProp: this.keyProp, classProp: this.classProp, childrenProp: this.childrenProp };
    }, listStyles() {
      const t = document.querySelector(".nestable-" + this.group + " .nestable-item-" + this.dragItem[this.keyProp]);
      let e = {};
      return t && (e.width = `${t.clientWidth}px`), this.elCopyStyles && (e = v(v({}, e), this.elCopyStyles)), e;
    } }, created() {
      const t = N(this.value, this.childrenProp);
      this.$emit("input", t), this.isDirty = false, this.registerNestable(this);
    }, beforeDestroy() {
      this.stopTrackMouse();
    }, methods: { startTrackMouse() {
      document.addEventListener("mousemove", this.onMouseMove), document.addEventListener("mouseup", this.onDragEnd), document.addEventListener("touchend", this.onDragEnd), document.addEventListener("touchcancel", this.onDragEnd), document.addEventListener("keydown", this.onKeyDown);
    }, stopTrackMouse() {
      document.removeEventListener("mousemove", this.onMouseMove), document.removeEventListener("mouseup", this.onDragEnd), document.removeEventListener("touchend", this.onDragEnd), document.removeEventListener("touchcancel", this.onDragEnd), document.removeEventListener("keydown", this.onKeyDown), this.elCopyStyles = null;
    }, onDragStart(t, e) {
      t && (t.preventDefault(), t.stopPropagation()), this.el = Q(t.target, ".nestable-item"), this.startTrackMouse(), this.dragItem = e, this.itemsOld = this.value, this.$nextTick(() => {
        this.onMouseMove(t);
      });
    }, onDragEnd(t, e) {
      t && t.preventDefault(), this.stopTrackMouse(), this.el = null, e ? this.dragRevert() : this.dragApply();
    }, onKeyDown(t) {
      t.which === 27 && this.onDragEnd(null, true);
    }, getXandYFromEvent(t) {
      let { clientX: e, clientY: s } = t;
      const { targetTouches: u } = t;
      if (u) {
        const i = u[0];
        e = i.clientX, s = i.clientY;
        const l = new Event("mouseenter"), h = document.elementFromPoint(e, s), m = h && (h.closest(".nestable-item-content") || h.closest(".nestable-list-empty"));
        m && m.dispatchEvent(l);
      }
      return { clientX: e, clientY: s };
    }, onMouseMove(t) {
      t && t.preventDefault();
      const { clientX: e, clientY: s } = this.getXandYFromEvent(t);
      this.mouse.last.x === 0 && (this.mouse.last.x = e);
      const u = j(e, s), i = document.querySelector(".nestable-" + this.group + " .nestable-drag-layer");
      if (!i)
        return;
      const { top: l, left: h } = i.getBoundingClientRect(), m = document.querySelector(".nestable-" + this.group + " .nestable-drag-layer > .nestable-list");
      if (this.elCopyStyles) {
        if (this.elCopyStyles = v(v({}, this.elCopyStyles), u), m)
          for (const E in u)
            Object.prototype.hasOwnProperty.call(u, E) && (m.style[E] = u[E]);
        const f = this.rtl ? this.mouse.last.x - e : e - this.mouse.last.x;
        f >= 0 && this.mouse.shift.x >= 0 || f <= 0 && this.mouse.shift.x <= 0 ? this.mouse.shift.x += f : this.mouse.shift.x = 0, this.mouse.last.x = e, Math.abs(this.mouse.shift.x) > this.threshold && (this.mouse.shift.x > 0 ? this.tryIncreaseDepth(this.dragItem) : this.tryDecreaseDepth(this.dragItem), this.mouse.shift.x = 0);
      } else {
        const f = Z(this.el);
        this.elCopyStyles = v({ marginTop: `${f.top - s - l}px`, marginLeft: `${f.left - e - h}px` }, u);
      }
    }, moveItem({ dragItem: t, pathFrom: e, pathTo: s }) {
      const u = this.getRealNextPath(e, s), i = this.getSplicePath(e, { numToRemove: 1, childrenProp: this.childrenProp }), l = this.getSplicePath(u, { numToRemove: 0, itemsToInsert: [t], childrenProp: this.childrenProp });
      if (!this.hook("beforeMove", { dragItem: t, pathFrom: e, pathTo: u }))
        return;
      let h = this.value;
      h = b(h, i), h = b(h, l), this.isDirty = true, this.pathTo = u, this.$emit("input", h);
    }, tryIncreaseDepth(t) {
      const e = this.getPathById(t[this.keyProp]), s = e[e.length - 1], u = e.length + this.getItemDepth(t);
      if (s > 0 && u <= this.maxDepth) {
        const i = this.getItemByPath(e.slice(0, -1).concat(s - 1));
        if (i[this.childrenProp] && (!i[this.childrenProp].length || !this.isCollapsed(i))) {
          const l = e.slice(0, -1).concat(s - 1).concat(i[this.childrenProp].length);
          this.moveItem({ dragItem: t, pathFrom: e, pathTo: l });
        }
      }
    }, tryDecreaseDepth(t) {
      const e = this.getPathById(t[this.keyProp]), s = e[e.length - 1];
      if (e.length > 1) {
        const u = this.getItemByPath(e.slice(0, -1));
        if (s + 1 === u[this.childrenProp].length) {
          const i = e.slice(0, -1);
          i[i.length - 1] += 1, this.moveItem({ dragItem: t, pathFrom: e, pathTo: i });
        }
      }
    }, onMouseEnter(t, e, s) {
      t && (t.preventDefault(), t.stopPropagation());
      const u = this.dragItem;
      if (!u || s !== null && u[this.keyProp] === s[this.keyProp])
        return;
      const i = this.getPathById(u[this.keyProp]);
      if (e !== this.listId && i.length === 0)
        return;
      let l;
      if (s === null ? l = i.length > 0 ? [] : [0] : l = this.getPathById(s[this.keyProp]), this.getRealNextPath(i, l).length + (this.getItemDepth(u) - 1) > this.maxDepth)
        return;
      let m = {};
      if (this.collapsed && i.length > 1) {
        const f = this.getItemByPath(i.slice(0, -1));
        f[this.childrenProp].length === 1 && (m = this.onToggleCollapse(f, true));
      }
      this.moveItem({ dragItem: u, pathFrom: i, pathTo: l }, m);
    }, isCollapsed(t) {
      return !!(this.collapsedGroups.indexOf(t[this.keyProp]) > -1 ^ this.collapsed);
    }, dragApply() {
      this.$emit("change", this.dragItem, { items: this.value, pathTo: this.pathTo }), this.pathTo = null, this.itemsOld = null, this.dragItem = null, this.isDirty = false;
    }, dragRevert() {
      this.$emit("input", this.itemsOld), this.pathTo = null, this.itemsOld = null, this.dragItem = null, this.isDirty = false;
    } } }, et = { class: "nestable-list nestable-group" }, rt = o.createTextVNode(" No content "), nt = { key: 0, class: "nestable-drag-layer" };
    function st(t, e, s, u, i, l) {
      const h = o.resolveComponent("Placeholder"), m = o.resolveComponent("NestableItem");
      return o.openBlock(), o.createElementBlock("div", { class: o.normalizeClass(["nestable", `nestable-${s.group}`, s.rtl ? "nestable-rtl" : ""]) }, [o.createElementVNode("ol", et, [l.listIsEmpty ? (o.openBlock(), o.createBlock(h, { key: 0, options: l.itemOptions }, { default: o.withCtx(() => [o.renderSlot(t.$slots, "placeholder", {}, () => [rt])]), _: 3 }, 8, ["options"])) : o.createCommentVNode("", true), (o.openBlock(true), o.createElementBlock(o.Fragment, null, o.renderList(s.value, (f, E) => (o.openBlock(), o.createBlock(m, { key: f[s.keyProp], index: E, item: f, options: l.itemOptions }, { default: o.withCtx((k) => [o.renderSlot(t.$slots, "default", o.normalizeProps(o.guardReactiveProps(k)))]), _: 2 }, 1032, ["index", "item", "options"]))), 128))]), i.dragItem ? (o.openBlock(), o.createElementBlock("div", nt, [o.createElementVNode("ol", { style: o.normalizeStyle(l.listStyles), class: "nestable-list" }, [o.createVNode(m, { item: i.dragItem, options: l.itemOptions, "is-copy": true }, { default: o.withCtx((f) => [o.renderSlot(t.$slots, "default", o.normalizeProps(o.guardReactiveProps(f)))]), _: 3 }, 8, ["item", "options"])], 4)])) : o.createCommentVNode("", true)], 2);
    }
    var T = C(tt, [["render", st]]);
    const ot = { name: "VueNestableHandle", mixins: [S], props: { item: { type: Object, required: false, default: () => ({}) } }, inject: ["group", "onDragEnd"], methods: { isEmpty(t) {
      if (t == null)
        return true;
      if (t.length > 0)
        return false;
      if (t.length === 0)
        return true;
      for (var e in t)
        if (hasOwnProperty.call(t, e))
          return false;
      return true;
    }, dragstart(t) {
      const e = this.isEmpty(this.item) ? this.$parent.item : this.item;
      this.notifyDragStart(this.group, t, e);
    }, touchend(t) {
      console.log(t), this.onDragEnd(t);
    }, touchmove(t) {
      console.log(t), this.notifyMouseMove(this.group, t);
    } } };
    function it(t, e, s, u, i, l) {
      return o.openBlock(), o.createElementBlock("div", { draggable: "true", class: "nestable-handle", onDragstart: e[0] || (e[0] = (...h) => l.dragstart && l.dragstart(...h)), onTouchstart: e[1] || (e[1] = (...h) => l.dragstart && l.dragstart(...h)), onTouchend: e[2] || (e[2] = (...h) => l.touchend && l.touchend(...h)), onTouchmove: e[3] || (e[3] = (...h) => l.touchmove && l.touchmove(...h)) }, [o.renderSlot(t.$slots, "default")], 32);
    }
    var $ = C(ot, [["render", it]]), at = { install: function(t) {
      t.component("VueNestable", T), t.component("VueNestableHandle", $);
    } };
    g.VueNestable = T, g.VueNestableHandle = $, g.default = at, Object.defineProperties(g, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
  });
})(index_umd, index_umd.exports);
var index_umdExports = index_umd.exports;
const _sfc_main$1 = {
  name: "ui-table",
  components: {
    VueNestable: index_umdExports.VueNestable,
    VueNestableHandle: index_umdExports.VueNestableHandle
  },
  props: {
    id: {
      required: true,
      type: String
    },
    bulk: {
      type: Boolean,
      default: true
    },
    refresh: {
      type: [Number, Boolean],
      default: false
    },
    noRecords: {
      type: String,
      default: "No records to display"
    },
    endpoint: {
      required: true,
      type: String
    },
    sortBy: {
      type: String,
      default: "id"
    },
    saveSortBy: {
      type: Boolean,
      default: true
    },
    perPage: {
      type: Number,
      default: 10
    },
    sortIn: {
      type: String,
      default: "asc"
    },
    noSearch: {
      type: Boolean,
      default: false
    },
    primaryKey: {
      required: false,
      type: String,
      default: "id"
    },
    showPageStatus: {
      type: Boolean,
      default: false
    },
    showPageNumbers: {
      type: Boolean,
      default: false
    },
    showPageNav: {
      type: Boolean,
      default: false
    },
    showPageEnds: {
      type: Boolean,
      default: false
    },
    hidePageSelect: {
      type: Boolean,
      default: false
    },
    pageSelectLabel: {
      type: String,
      default: "Page"
    },
    reorder_route: {
      type: String,
      default: ""
    },
    link_name: {
      type: String,
      default: ""
    },
    link_param: {
      type: String,
      default: ""
    },
    show_status: {
      type: Boolean,
      default: false
    },
    show_order: {
      type: Boolean,
      default: true
    }
  },
  data() {
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
      search: "",
      pagination: {
        totalRecords: 0,
        currentPage: 1,
        totalPages: 0,
        perPage: this.perPage,
        perPageOptions: [
          10,
          50,
          100,
          250
        ]
      },
      sort: {
        key: this.sortBy,
        order: this.sortIn
      },
      selected: [],
      order: "Order"
    };
  },
  computed: {
    columns() {
      return _.map(this.displayable, (option) => {
        columns.push({
          "label": this.column_names[option],
          "value": option
        });
      });
    },
    hasActions() {
      return !!this.$slots.actions;
    },
    hasBulkActions() {
      console.log(this.bulk, this.selectable.length, this.allowedBulkActions.length);
      if (!this.bulk)
        return false;
      if (!this.selectable.length > 0)
        return false;
      if (!this.allowedBulkActions.length > 0)
        return false;
      return true;
    },
    hasSelections() {
      return this.selected.length > 0;
    },
    selectable() {
      let vm = this;
      return _.filter(this.records, (record) => {
        return !vm.bulk_actions_exempt.includes(record[vm.primaryKey]);
      });
    },
    allowedBulkActions() {
      let vm = this;
      return _.filter(this.bulk_actions, (action) => {
        if (!action.permission)
          return true;
        return vm.$can(action.permission);
      });
    }
  },
  watch: {
    endpoint() {
      this.getRecords();
    },
    showBulkActionConfirmation(value) {
      if (value == false) {
        this.action = null;
      }
    },
    search: _.debounce(function(value) {
      this.pagination.currentPage = 1;
      this.getRecords();
    }, 300)
  },
  methods: {
    toggleOrder() {
      if (this.order === "Order") {
        this.order = "Save";
        this.changePerPage(this.pagination.totalRecords + 1);
      } else {
        this.endpoint.split("/").at(-1);
        this.loading = true;
        axios$2.post(this.reorder_route, { records: this.records }).then((response) => {
          toast("Entries successfully saved.", "success");
          this.loading = false;
          this.changePerPage(10);
        }).catch((response) => {
          toast(response.message, "failed");
          this.loading = false;
          this.changePerPage(10);
        });
        this.order = "Order";
      }
    },
    cancelBulkAction() {
      this.showBulkActionConfirmation = false;
      this.action = null;
    },
    confirmBulkAction() {
      let vm = this;
      this.working = true;
      axios$2.post(`${this.bulk_actions[this.action].route}`, {
        records: this.selected
      }).then((response) => {
        toast("Bulk action completed successfully.", "success");
        vm.getRecords();
        vm.showBulkActionConfirmation = false;
        vm.selected = [];
        vm.action = null;
        vm.working = false;
      });
    },
    isSelectable(id) {
      return !this.bulk_actions_exempt.includes(id);
    },
    toggleSelectAll() {
      if (this.selected.length > 0) {
        this.selected = [];
        return;
      }
      this.selected = _.map(this.selectable, "id");
    },
    getRecords() {
      this.loading = true;
      return axios$2.get(`${this.endpoint}?${this.getQueryParameters()}`).then((response) => {
        this.records = response.data.records.data;
        this.displayable = response.data.displayable;
        this.sortable = response.data.sortable;
        this.column_names = response.data.column_names;
        this.column_types = response.data.column_types;
        this.bulk_actions = response.data.bulk_actions;
        this.bulk_actions_exempt = response.data.bulk_actions_exempt;
        this.pagination.totalRecords = response.data.records.total;
        this.pagination.totalPages = response.data.records.last_page;
        this.loading = false;
        this.initialLoad = false;
        if (this.refresh && !self._timer) {
          this._timer = setTimeout(() => this.getRecords(), this.refresh);
        }
        this.$emit("loaded", this.records);
      });
    },
    isSortable(column) {
      return _.includes(this.sortable, column);
    },
    getQueryParameters() {
      let params = {
        sort: (this.sort.order === "desc" ? "-" : "") + this.sort.key,
        page: this.pagination.currentPage,
        perPage: this.pagination.perPage
      };
      if (this.search !== "") {
        params["filter[search]"] = this.search;
      }
      return queryString.stringify(params);
    },
    sortRecordsBy(column, order = false) {
      this.sort.key = column;
      if (!order) {
        this.sort.order = this.sort.order === "asc" ? "desc" : "asc";
      } else {
        this.sort.order = order;
      }
      this.getRecords();
      this.saveSortProperty();
    },
    saveSortProperty() {
      if (this.saveSortBy) {
        window.localStorage.setItem("ui-table-sort-" + this.id + "-" + this.endpoint + "-" + window.location.pathname, JSON.stringify(this.sort));
      }
    },
    loadSortProperty() {
      try {
        let sort = window.localStorage.getItem("ui-table-sort-" + this.id + "-" + this.endpoint + "-" + window.location.pathname);
        if (sort) {
          sort = JSON.parse(sort);
          this.sort = sort;
        }
      } catch (error) {
      }
    },
    changePage(page) {
      this.pagination.currentPage = page;
      this.getRecords();
    },
    changePerPage(page) {
      this.pagination.currentPage = 1;
      this.pagination.perPage = page;
      this.getRecords();
    },
    destroy(id) {
      axios$2.delete(`${this.endpoint}/${id}`).then(() => {
        this.getRecords();
      });
    },
    listenForEvents() {
      bus().$on("refresh-datatable-" + this.id, (data) => {
        this.getRecords();
      });
    },
    isComponentExist(componentName) {
      return componentName in this.$options.components;
    }
  },
  created() {
    this.loadSortProperty();
    this.getRecords();
    this.listenForEvents();
  },
  destroyed() {
    clearTimeout(this._timer);
  }
};
const _hoisted_1 = /* @__PURE__ */ createElementVNode("span", { class: "sr-only-mobile" }, "View", -1);
const _hoisted_2 = /* @__PURE__ */ createElementVNode("p", null, "Results per page:", -1);
const _hoisted_3 = { class: "flex justify-between w-full items-center" };
const _hoisted_4 = /* @__PURE__ */ createElementVNode("span", { class: "sr-only-mobile" }, "Sort", -1);
const _hoisted_5 = /* @__PURE__ */ createElementVNode("p", null, "Sort by:", -1);
const _hoisted_6 = { class: "flex justify-between w-full items-center" };
const _hoisted_7 = { class: "flex justify-between w-full items-center" };
const _hoisted_8 = /* @__PURE__ */ createElementVNode("span", null, "Ascending", -1);
const _hoisted_9 = { class: "flex justify-between w-full items-center" };
const _hoisted_10 = /* @__PURE__ */ createElementVNode("span", null, "Descending", -1);
const _hoisted_11 = { class: "pb-2" };
const _hoisted_12 = ["id"];
const _hoisted_13 = {
  key: 0,
  width: "50px"
};
const _hoisted_14 = { class: "table__select-all" };
const _hoisted_15 = ["onClick", "aria-label"];
const _hoisted_16 = {
  key: 0,
  class: "inline",
  "aria-hidden": "true"
};
const _hoisted_17 = {
  key: 1,
  class: "table__heading"
};
const _hoisted_18 = ["colspan"];
const _hoisted_19 = { class: "table__heading flex" };
const _hoisted_20 = { class: "ml-auto" };
const _hoisted_21 = /* @__PURE__ */ createElementVNode("option", {
  selected: "",
  disabled: "",
  value: null
}, "Bulk Actions", -1);
const _hoisted_22 = ["value"];
const _hoisted_23 = { class: "w-20 col-actions" };
const _hoisted_24 = { key: 0 };
const _hoisted_25 = { class: "flex flex-1" };
const _hoisted_26 = { class: "column-label" };
const _hoisted_27 = { key: 1 };
const _hoisted_28 = {
  key: 1,
  class: "'table__actions w-20 col-actions'"
};
const _hoisted_29 = { class: "mb-4 xl:mb-6" };
const _hoisted_30 = { class: "flex" };
const _hoisted_31 = { class: "flex flex-1 items-center justify-between" };
const _hoisted_32 = {
  key: 2,
  class: "pagination-group"
};
const _hoisted_33 = {
  key: 0,
  class: "pagination-group__item"
};
const _hoisted_34 = {
  key: 1,
  class: "pagination-group__item"
};
const _hoisted_35 = {
  key: 2,
  class: "pagination-group__item"
};
const _hoisted_36 = {
  key: 3,
  class: "no-bottom text-heading--md mb-0"
};
const _hoisted_37 = /* @__PURE__ */ createElementVNode("p", null, "No results found.", -1);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ui_label = resolveComponent("ui-label");
  const _component_ui_input = resolveComponent("ui-input");
  const _component_ui_toolbar_group = resolveComponent("ui-toolbar-group");
  const _component_fa_icon = resolveComponent("fa-icon");
  const _component_ui_dropdown_item = resolveComponent("ui-dropdown-item");
  const _component_ui_dropdown_divider = resolveComponent("ui-dropdown-divider");
  const _component_ui_dropdown_link = resolveComponent("ui-dropdown-link");
  const _component_ui_dropdown = resolveComponent("ui-dropdown");
  const _component_ui_button = resolveComponent("ui-button");
  const _component_ui_toolbar = resolveComponent("ui-toolbar");
  const _component_ui_checkbox = resolveComponent("ui-checkbox");
  const _component_ui_modal = resolveComponent("ui-modal");
  const _component_portal = resolveComponent("portal");
  const _component_VueNestableHandle = resolveComponent("VueNestableHandle");
  const _component_ui_status = resolveComponent("ui-status");
  const _component_router_link = resolveComponent("router-link");
  const _component_VueNestable = resolveComponent("VueNestable");
  const _component_ui_pagination_status = resolveComponent("ui-pagination-status");
  const _component_ui_pagination = resolveComponent("ui-pagination");
  const _component_ui_pagination_select = resolveComponent("ui-pagination-select");
  return openBlock(), createElementBlock("div", null, [
    !$props.noSearch ? (openBlock(), createBlock(_component_ui_toolbar, { key: 0 }, {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "toolbarPrepend"),
        createVNode(_component_ui_toolbar_group, { grow: "" }, {
          default: withCtx(() => [
            createVNode(_component_ui_label, {
              fieldId: $props.id + "-table-search",
              hideLabel: ""
            }, {
              default: withCtx(() => [
                createTextVNode("Search")
              ], void 0, true),
              _: 1
            }, 8, ["fieldId"]),
            createVNode(_component_ui_input, {
              id: $props.id + "-table-search",
              name: "search",
              type: "search",
              placeholder: "Search",
              autocomplete: "off",
              "aria-controls": $props.id,
              modelValue: $data.search,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.search = $event)
            }, null, 8, ["id", "aria-controls", "modelValue"])
          ], void 0, true),
          _: 1
        }),
        createVNode(_component_ui_toolbar_group, null, {
          default: withCtx(() => [
            createVNode(_component_ui_dropdown, {
              disabled: $data.order === "Save",
              noArrow: "",
              id: "per-page-options",
              right: ""
            }, {
              menu: withCtx(() => [
                createVNode(_component_ui_dropdown_item, null, {
                  default: withCtx(() => [
                    _hoisted_2
                  ], void 0, true),
                  _: 1
                }),
                createVNode(_component_ui_dropdown_divider),
                (openBlock(true), createElementBlock(Fragment, null, renderList($data.pagination.perPageOptions, (pages, index) => {
                  return openBlock(), createBlock(_component_ui_dropdown_link, {
                    onClick: withModifiers(($event) => $options.changePerPage(pages), ["prevent"]),
                    key: index
                  }, {
                    default: withCtx(() => [
                      createElementVNode("div", _hoisted_3, [
                        createElementVNode("span", null, toDisplayString(pages), 1),
                        pages === $data.pagination.perPage ? (openBlock(), createBlock(_component_fa_icon, {
                          key: 0,
                          class: "icon",
                          icon: "check"
                        })) : createCommentVNode("", true)
                      ])
                    ], void 0, true),
                    _: 2
                  }, 1032, ["onClick"]);
                }), 128))
              ]),
              default: withCtx(() => [
                createVNode(_component_fa_icon, { icon: "list" }),
                _hoisted_1
              ], void 0, true),
              _: 1
            }, 8, ["disabled"])
          ], void 0, true),
          _: 1
        }),
        createVNode(_component_ui_toolbar_group, null, {
          default: withCtx(() => [
            createVNode(_component_ui_dropdown, {
              noArrow: "",
              id: "sorting-options",
              right: ""
            }, {
              menu: withCtx(() => [
                createVNode(_component_ui_dropdown_item, null, {
                  default: withCtx(() => [
                    _hoisted_5
                  ], void 0, true),
                  _: 1
                }),
                createVNode(_component_ui_dropdown_divider),
                (openBlock(true), createElementBlock(Fragment, null, renderList($data.sortable, (column, index) => {
                  return openBlock(), createBlock(_component_ui_dropdown_link, {
                    key: column + "-sort" || index + "-sort",
                    onClick: withModifiers(($event) => $options.sortRecordsBy(column, $data.sort.order), ["prevent"])
                  }, {
                    default: withCtx(() => [
                      createElementVNode("div", _hoisted_6, [
                        createElementVNode("span", null, toDisplayString($data.column_names[column] || column), 1),
                        $data.sort.key === column ? (openBlock(), createBlock(_component_fa_icon, {
                          key: 0,
                          class: "icon",
                          icon: "check"
                        })) : createCommentVNode("", true)
                      ])
                    ], void 0, true),
                    _: 2
                  }, 1032, ["onClick"]);
                }), 128)),
                createVNode(_component_ui_dropdown_divider),
                createVNode(_component_ui_dropdown_link, {
                  onClick: _cache[1] || (_cache[1] = withModifiers(($event) => $options.sortRecordsBy($data.sort.key, "asc"), ["prevent"]))
                }, {
                  default: withCtx(() => [
                    createElementVNode("div", _hoisted_7, [
                      _hoisted_8,
                      $data.sort.order === "asc" ? (openBlock(), createBlock(_component_fa_icon, {
                        key: 0,
                        class: "icon",
                        icon: "check"
                      })) : createCommentVNode("", true)
                    ])
                  ], void 0, true),
                  _: 1
                }),
                createVNode(_component_ui_dropdown_link, {
                  onClick: _cache[2] || (_cache[2] = withModifiers(($event) => $options.sortRecordsBy($data.sort.key, "desc"), ["prevent"]))
                }, {
                  default: withCtx(() => [
                    createElementVNode("div", _hoisted_9, [
                      _hoisted_10,
                      $data.sort.order === "desc" ? (openBlock(), createBlock(_component_fa_icon, {
                        key: 0,
                        class: "icon",
                        icon: "check"
                      })) : createCommentVNode("", true)
                    ])
                  ], void 0, true),
                  _: 1
                })
              ]),
              default: withCtx(() => [
                createVNode(_component_fa_icon, { icon: "sort-amount-down" }),
                _hoisted_4
              ], void 0, true),
              _: 1
            })
          ], void 0, true),
          _: 1
        }),
        withDirectives(createElementVNode("div", null, [
          withDirectives(createVNode(_component_ui_button, {
            disabled: $data.loading,
            onClick: withModifiers($options.toggleOrder, ["prevent"])
          }, {
            default: withCtx(() => [
              createVNode(_component_fa_icon, {
                class: "mr-1",
                icon: "ellipsis-v"
              }),
              createTextVNode(toDisplayString($data.order), 1)
            ], void 0, true),
            _: 1
          }, 8, ["disabled", "onClick"]), [
            [vShow, $data.order === "Order"]
          ]),
          withDirectives(createVNode(_component_ui_button, {
            disabled: $data.loading,
            onClick: withModifiers($options.toggleOrder, ["prevent"]),
            variant: "primary"
          }, {
            default: withCtx(() => [
              createVNode(_component_fa_icon, {
                class: "mr-1",
                icon: "ellipsis-v"
              }),
              createTextVNode(toDisplayString($data.order), 1)
            ], void 0, true),
            _: 1
          }, 8, ["disabled", "onClick"]), [
            [vShow, $data.order === "Save"]
          ])
        ], 512), [
          [vShow, $props.show_order]
        ]),
        renderSlot(_ctx.$slots, "toolbarAppend")
      ], void 0, true),
      _: 3
    })) : createCommentVNode("", true),
    withDirectives(createElementVNode("div", _hoisted_11, "Loading...", 512), [
      [vShow, $data.loading]
    ]),
    $data.records.length ? withDirectives((openBlock(), createElementBlock("div", {
      key: 1,
      class: normalizeClass(["table-wrapper", { "loading": $data.loading }])
    }, [
      createElementVNode("table", {
        id: $props.id,
        class: "table",
        "aria-live": "polite"
      }, [
        createElementVNode("thead", null, [
          createElementVNode("tr", null, [
            $options.hasBulkActions ? (openBlock(), createElementBlock("th", _hoisted_13, [
              createElementVNode("div", _hoisted_14, [
                createVNode(_component_ui_checkbox, {
                  name: "toggle-select-all",
                  id: "toggle-select-all",
                  checked: $options.selectable.length === $data.selected.length,
                  onInput: $options.toggleSelectAll,
                  indeterminate: $data.selected.length > 0 && $options.selectable.length !== $data.selected.length
                }, null, 8, ["checked", "onInput", "indeterminate"])
              ])
            ])) : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList($data.displayable, (column, index) => {
              return withDirectives((openBlock(), createElementBlock("th", {
                class: normalizeClass({ "sortable": $options.isSortable(column), "active": $data.sort.key === column, "w-96": column === "url", ["th-" + column]: true }),
                key: column[$props.primaryKey] || index
              }, [
                $options.isSortable(column) ? (openBlock(), createElementBlock("a", {
                  key: 0,
                  href: "#",
                  class: "table__heading table__heading--link",
                  onClick: withModifiers(($event) => $options.isSortable(column) && $options.sortRecordsBy(column), ["prevent"]),
                  "aria-label": "Sort by " + $data.column_names[column] || column
                }, [
                  createElementVNode("span", null, toDisplayString($data.column_names[column] || column), 1),
                  $options.isSortable(column) ? (openBlock(), createElementBlock("div", _hoisted_16, [
                    $data.sort.key !== column ? (openBlock(), createBlock(_component_fa_icon, {
                      key: 0,
                      icon: "sort",
                      class: "fa-fw"
                    })) : createCommentVNode("", true),
                    $data.sort.order === "asc" && $data.sort.key === column ? (openBlock(), createBlock(_component_fa_icon, {
                      key: 1,
                      icon: "sort-up",
                      class: "fa-fw"
                    })) : createCommentVNode("", true),
                    $data.sort.order === "desc" && $data.sort.key === column ? (openBlock(), createBlock(_component_fa_icon, {
                      key: 2,
                      icon: "sort-down",
                      class: "fa-fw"
                    })) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true)
                ], 8, _hoisted_15)) : (openBlock(), createElementBlock("span", _hoisted_17, toDisplayString($data.column_names[column] || column), 1))
              ], 2)), [
                [vShow, !$options.hasSelections]
              ]);
            }), 128)),
            withDirectives(createElementVNode("th", {
              colspan: $options.hasActions ? $data.displayable.length + 1 : $data.displayable.length
            }, [
              createElementVNode("span", _hoisted_19, [
                createTextVNode(toDisplayString(this.selected.length) + " record" + toDisplayString(this.selected.length > 1 ? "s" : "") + " selected ", 1),
                renderSlot(_ctx.$slots, "bulkActions", {
                  allowedBulkActions: $options.allowedBulkActions,
                  selected: $data.selected,
                  parent: this
                }, () => [
                  createElementVNode("div", _hoisted_20, [
                    withDirectives(createElementVNode("select", {
                      name: "bulk-actions",
                      id: "bulk-actions",
                      class: "field-select field-select--sm field-select--bordered",
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.action = $event),
                      onChange: _cache[4] || (_cache[4] = ($event) => $data.showBulkActionConfirmation = true)
                    }, [
                      _hoisted_21,
                      (openBlock(true), createElementBlock(Fragment, null, renderList($options.allowedBulkActions, (action, index) => {
                        return openBlock(), createElementBlock("option", {
                          key: action.name,
                          value: index
                        }, toDisplayString(action.name), 9, _hoisted_22);
                      }), 128))
                    ], 544), [
                      [vModelSelect, $data.action]
                    ])
                  ]),
                  createVNode(_component_portal, { to: "modals" }, {
                    default: withCtx(() => [
                      $data.action !== null ? (openBlock(), createBlock(_component_ui_modal, {
                        key: 0,
                        name: "confirm-bulk-action",
                        title: "Confirm Bulk " + $options.allowedBulkActions[$data.action].name,
                        modelValue: $data.showBulkActionConfirmation,
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.showBulkActionConfirmation = $event)
                      }, {
                        footer: withCtx(() => [
                          createVNode(_component_ui_button, {
                            onClick: withModifiers($options.confirmBulkAction, ["prevent"]),
                            loading: $data.working,
                            class: "ml-3",
                            variant: "primary"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Confirm")
                            ], void 0, true),
                            _: 1
                          }, 8, ["onClick", "loading"]),
                          !$data.working ? (openBlock(), createBlock(_component_ui_button, {
                            key: 0,
                            onClick: withModifiers($options.cancelBulkAction, ["prevent"]),
                            variant: "secondary"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ], void 0, true),
                            _: 1
                          }, 8, ["onClick"])) : createCommentVNode("", true)
                        ]),
                        default: withCtx(() => [
                          createElementVNode("p", null, [
                            createTextVNode("Are you sure you want to perform this action against "),
                            createElementVNode("b", null, toDisplayString($data.selected.length), 1),
                            createTextVNode(" record" + toDisplayString($data.selected.length > 1 ? "s" : "") + "?", 1)
                          ])
                        ], void 0, true),
                        _: 1
                      }, 8, ["title", "modelValue"])) : createCommentVNode("", true)
                    ], void 0, true),
                    _: 1
                  })
                ])
              ])
            ], 8, _hoisted_18), [
              [vShow, $options.hasSelections]
            ]),
            withDirectives(createElementVNode("th", _hoisted_23, " ", 512), [
              [vShow, $options.hasActions && !$options.hasSelections]
            ])
          ])
        ]),
        createElementVNode("tbody", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($data.records, (record, index) => {
            return openBlock(), createElementBlock("tr", {
              key: record[$props.primaryKey] || index
            }, [
              $options.hasBulkActions ? (openBlock(), createElementBlock("td", _hoisted_24, [
                createElementVNode("div", _hoisted_25, [
                  $options.isSelectable(record[$props.primaryKey]) ? (openBlock(), createBlock(_component_ui_checkbox, {
                    key: 0,
                    name: "select-" + record[$props.primaryKey] || index,
                    id: "select-" + record[$props.primaryKey] || index,
                    "native-value": record[$props.primaryKey],
                    modelValue: $data.selected,
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.selected = $event)
                  }, null, 8, ["name", "id", "native-value", "modelValue"])) : createCommentVNode("", true)
                ])
              ])) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList($data.displayable, (column) => {
                return openBlock(), createElementBlock("td", {
                  class: normalizeClass("td-" + column),
                  key: column
                }, [
                  createElementVNode("span", _hoisted_26, toDisplayString($data.column_names[column] || column), 1),
                  renderSlot(_ctx.$slots, column, { record }, () => [
                    $data.column_types[column] && $options.isComponentExist($data.column_types[column]) ? (openBlock(), createBlock(resolveDynamicComponent($data.column_types[column]), {
                      key: 0,
                      value: record[column],
                      record
                    }, null, 8, ["value", "record"])) : (openBlock(), createElementBlock("span", _hoisted_27, toDisplayString(record[column]), 1))
                  ])
                ], 2);
              }), 128)),
              $options.hasActions ? (openBlock(), createElementBlock("td", _hoisted_28, [
                renderSlot(_ctx.$slots, "actions", { record })
              ])) : createCommentVNode("", true)
            ]);
          }), 128))
        ])
      ], 8, _hoisted_12)
    ], 2)), [
      [vShow, $data.order === "Order"]
    ]) : createCommentVNode("", true),
    withDirectives(createElementVNode("div", _hoisted_29, [
      createVNode(_component_VueNestable, {
        modelValue: $data.records,
        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.records = $event),
        threshold: 32
      }, {
        default: withCtx(() => [
          createElementVNode("div", _hoisted_30, [
            createVNode(_component_VueNestableHandle, {
              item: _ctx.item,
              class: "flex items-center justify-center border-r w-8 text-gray-500 bg-gray-50 rounded-l"
            }, {
              default: withCtx(() => [
                createVNode(_component_fa_icon, { icon: ["fas", "grip-vertical"] })
              ], void 0, true),
              _: 1
            }, 8, ["item"]),
            createElementVNode("div", _hoisted_31, [
              createElementVNode("div", {
                class: normalizeClass(["p-3 flex items-center", { "font-bold": _ctx.item ? _ctx.item.url == "" || _ctx.item.url == "#" : false }])
              }, [
                withDirectives(createVNode(_component_ui_status, {
                  value: _ctx.item.status,
                  class: "mr-2"
                }, null, 8, ["value"]), [
                  [vShow, $props.show_status]
                ]),
                createVNode(_component_router_link, {
                  to: { name: $props.link_name, params: { [$props.link_param]: _ctx.item.id } }
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.item.name), 1)
                  ], void 0, true),
                  _: 1
                }, 8, ["to"])
              ], 2)
            ])
          ])
        ], void 0, true),
        _: 1
      }, 8, ["modelValue"])
    ], 512), [
      [vShow, $data.order === "Save" && !$data.loading]
    ]),
    this.pagination.totalPages > 1 ? (openBlock(), createElementBlock("div", _hoisted_32, [
      $props.showPageStatus ? (openBlock(), createElementBlock("div", _hoisted_33, [
        createVNode(_component_ui_pagination_status, {
          total: this.pagination.totalPages,
          value: this.pagination.currentPage
        }, null, 8, ["total", "value"])
      ])) : createCommentVNode("", true),
      $props.showPageNumbers || $props.showPageNav || $props.showPageEnds ? (openBlock(), createElementBlock("div", _hoisted_34, [
        createVNode(_component_ui_pagination, {
          onInput: _cache[8] || (_cache[8] = ($event) => $options.changePage($event)),
          showNumbers: $props.showPageNumbers,
          showNav: $props.showPageNav,
          showEnds: $props.showPageEnds,
          total: this.pagination.totalPages,
          value: this.pagination.currentPage
        }, null, 8, ["showNumbers", "showNav", "showEnds", "total", "value"])
      ])) : createCommentVNode("", true),
      !$props.hidePageSelect ? (openBlock(), createElementBlock("div", _hoisted_35, [
        createVNode(_component_ui_pagination_select, {
          onInput: _cache[9] || (_cache[9] = ($event) => $options.changePage($event)),
          label: $props.pageSelectLabel,
          total: this.pagination.totalPages,
          value: this.pagination.currentPage
        }, null, 8, ["label", "total", "value"])
      ])) : createCommentVNode("", true)
    ])) : createCommentVNode("", true),
    !$data.records.length && !$data.initialLoad ? (openBlock(), createElementBlock("div", _hoisted_36, [
      renderSlot(_ctx.$slots, "empty-state", {}, () => [
        _hoisted_37
      ])
    ])) : createCommentVNode("", true)
  ]);
}
const DataTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);
const _sfc_main = {
  props: {
    filters: {
      type: Array
    }
  },
  extends: DataTable,
  watch: {
    filters: {
      handler(value) {
        this.getRecords();
      },
      deep: true
    }
  },
  methods: {
    getRecords() {
      this.loading = true;
      return axios.get(`${this.endpoint}?${this.getQueryParameters()}`).then((response) => {
        this.records = response.data.records.data;
        this.displayable = response.data.displayable;
        this.sortable = response.data.sortable;
        this.column_names = response.data.column_names;
        this.column_types = response.data.column_types;
        this.bulk_actions = response.data.bulk_actions;
        this.bulk_actions_exempt = response.data.bulk_actions_exempt;
        this.pagination.totalRecords = response.data.records.total;
        this.pagination.totalPages = response.data.records.last_page;
        this.$emit("update-metrics", response.data.metrics);
        this.loading = false;
        this.initialLoad = false;
        if (this.refresh && !self._timer) {
          this._timer = setTimeout(() => this.getRecords(), this.refresh);
        }
        this.$emit("loaded", this.records);
      });
    },
    getQueryParameters() {
      let params = {
        sort: (this.sort.order === "desc" ? "-" : "") + this.sort.key,
        page: this.pagination.currentPage,
        perPage: this.pagination.perPage
      };
      if (this.filters) {
        Object.keys(this.filters).forEach((key) => {
          if (typeof this.filters[key] == "object") {
            params["filter[" + key + "][]"] = this.filters[key];
          } else {
            params["filter[" + key + "]"] = this.filters[key];
          }
        });
      }
      if (this.search !== "") {
        params["filter[search]"] = this.search;
      }
      return queryString$2.stringify(params);
    }
  }
};
export {
  _sfc_main as default
};
