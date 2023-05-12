import { q as queryString } from "./base-881bd533.js";
import { c as commonjsGlobal, g as getDefaultExportFromCjs } from "./_commonjsHelpers-7a77ea84.js";
import "./Form-5165edca.js";
import require$$0, { resolveComponent, openBlock, createElementBlock, createVNode, withCtx } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
import "./lodash-7a9c3582.js";
function commonjsRequire(path) {
  throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var pluralize = { exports: {} };
(function(module, exports) {
  (function(root, pluralize2) {
    if (typeof commonjsRequire === "function" && true && true) {
      module.exports = pluralize2();
    } else {
      root.pluralize = pluralize2();
    }
  })(commonjsGlobal, function() {
    var pluralRules = [];
    var singularRules = [];
    var uncountables = {};
    var irregularPlurals = {};
    var irregularSingles = {};
    function sanitizeRule(rule) {
      if (typeof rule === "string") {
        return new RegExp("^" + rule + "$", "i");
      }
      return rule;
    }
    function restoreCase(word, token) {
      if (word === token)
        return token;
      if (word === word.toLowerCase())
        return token.toLowerCase();
      if (word === word.toUpperCase())
        return token.toUpperCase();
      if (word[0] === word[0].toUpperCase()) {
        return token.charAt(0).toUpperCase() + token.substr(1).toLowerCase();
      }
      return token.toLowerCase();
    }
    function interpolate(str, args) {
      return str.replace(/\$(\d{1,2})/g, function(match, index) {
        return args[index] || "";
      });
    }
    function replace(word, rule) {
      return word.replace(rule[0], function(match, index) {
        var result = interpolate(rule[1], arguments);
        if (match === "") {
          return restoreCase(word[index - 1], result);
        }
        return restoreCase(match, result);
      });
    }
    function sanitizeWord(token, word, rules) {
      if (!token.length || uncountables.hasOwnProperty(token)) {
        return word;
      }
      var len = rules.length;
      while (len--) {
        var rule = rules[len];
        if (rule[0].test(word))
          return replace(word, rule);
      }
      return word;
    }
    function replaceWord(replaceMap, keepMap, rules) {
      return function(word) {
        var token = word.toLowerCase();
        if (keepMap.hasOwnProperty(token)) {
          return restoreCase(word, token);
        }
        if (replaceMap.hasOwnProperty(token)) {
          return restoreCase(word, replaceMap[token]);
        }
        return sanitizeWord(token, word, rules);
      };
    }
    function checkWord(replaceMap, keepMap, rules, bool) {
      return function(word) {
        var token = word.toLowerCase();
        if (keepMap.hasOwnProperty(token))
          return true;
        if (replaceMap.hasOwnProperty(token))
          return false;
        return sanitizeWord(token, token, rules) === token;
      };
    }
    function pluralize2(word, count, inclusive) {
      var pluralized = count === 1 ? pluralize2.singular(word) : pluralize2.plural(word);
      return (inclusive ? count + " " : "") + pluralized;
    }
    pluralize2.plural = replaceWord(
      irregularSingles,
      irregularPlurals,
      pluralRules
    );
    pluralize2.isPlural = checkWord(
      irregularSingles,
      irregularPlurals,
      pluralRules
    );
    pluralize2.singular = replaceWord(
      irregularPlurals,
      irregularSingles,
      singularRules
    );
    pluralize2.isSingular = checkWord(
      irregularPlurals,
      irregularSingles,
      singularRules
    );
    pluralize2.addPluralRule = function(rule, replacement) {
      pluralRules.push([sanitizeRule(rule), replacement]);
    };
    pluralize2.addSingularRule = function(rule, replacement) {
      singularRules.push([sanitizeRule(rule), replacement]);
    };
    pluralize2.addUncountableRule = function(word) {
      if (typeof word === "string") {
        uncountables[word.toLowerCase()] = true;
        return;
      }
      pluralize2.addPluralRule(word, "$0");
      pluralize2.addSingularRule(word, "$0");
    };
    pluralize2.addIrregularRule = function(single, plural) {
      plural = plural.toLowerCase();
      single = single.toLowerCase();
      irregularSingles[single] = plural;
      irregularPlurals[plural] = single;
    };
    [
      // Pronouns.
      ["I", "we"],
      ["me", "us"],
      ["he", "they"],
      ["she", "they"],
      ["them", "them"],
      ["myself", "ourselves"],
      ["yourself", "yourselves"],
      ["itself", "themselves"],
      ["herself", "themselves"],
      ["himself", "themselves"],
      ["themself", "themselves"],
      ["is", "are"],
      ["was", "were"],
      ["has", "have"],
      ["this", "these"],
      ["that", "those"],
      // Words ending in with a consonant and `o`.
      ["echo", "echoes"],
      ["dingo", "dingoes"],
      ["volcano", "volcanoes"],
      ["tornado", "tornadoes"],
      ["torpedo", "torpedoes"],
      // Ends with `us`.
      ["genus", "genera"],
      ["viscus", "viscera"],
      // Ends with `ma`.
      ["stigma", "stigmata"],
      ["stoma", "stomata"],
      ["dogma", "dogmata"],
      ["lemma", "lemmata"],
      ["schema", "schemata"],
      ["anathema", "anathemata"],
      // Other irregular rules.
      ["ox", "oxen"],
      ["axe", "axes"],
      ["die", "dice"],
      ["yes", "yeses"],
      ["foot", "feet"],
      ["eave", "eaves"],
      ["goose", "geese"],
      ["tooth", "teeth"],
      ["quiz", "quizzes"],
      ["human", "humans"],
      ["proof", "proofs"],
      ["carve", "carves"],
      ["valve", "valves"],
      ["looey", "looies"],
      ["thief", "thieves"],
      ["groove", "grooves"],
      ["pickaxe", "pickaxes"],
      ["passerby", "passersby"]
    ].forEach(function(rule) {
      return pluralize2.addIrregularRule(rule[0], rule[1]);
    });
    [
      [/s?$/i, "s"],
      [/[^\u0000-\u007F]$/i, "$0"],
      [/([^aeiou]ese)$/i, "$1"],
      [/(ax|test)is$/i, "$1es"],
      [/(alias|[^aou]us|t[lm]as|gas|ris)$/i, "$1es"],
      [/(e[mn]u)s?$/i, "$1s"],
      [/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, "$1"],
      [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, "$1i"],
      [/(alumn|alg|vertebr)(?:a|ae)$/i, "$1ae"],
      [/(seraph|cherub)(?:im)?$/i, "$1im"],
      [/(her|at|gr)o$/i, "$1oes"],
      [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, "$1a"],
      [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, "$1a"],
      [/sis$/i, "ses"],
      [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, "$1$2ves"],
      [/([^aeiouy]|qu)y$/i, "$1ies"],
      [/([^ch][ieo][ln])ey$/i, "$1ies"],
      [/(x|ch|ss|sh|zz)$/i, "$1es"],
      [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, "$1ices"],
      [/\b((?:tit)?m|l)(?:ice|ouse)$/i, "$1ice"],
      [/(pe)(?:rson|ople)$/i, "$1ople"],
      [/(child)(?:ren)?$/i, "$1ren"],
      [/eaux$/i, "$0"],
      [/m[ae]n$/i, "men"],
      ["thou", "you"]
    ].forEach(function(rule) {
      return pluralize2.addPluralRule(rule[0], rule[1]);
    });
    [
      [/s$/i, ""],
      [/(ss)$/i, "$1"],
      [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, "$1fe"],
      [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, "$1f"],
      [/ies$/i, "y"],
      [/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i, "$1ie"],
      [/\b(mon|smil)ies$/i, "$1ey"],
      [/\b((?:tit)?m|l)ice$/i, "$1ouse"],
      [/(seraph|cherub)im$/i, "$1"],
      [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i, "$1"],
      [/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i, "$1sis"],
      [/(movie|twelve|abuse|e[mn]u)s$/i, "$1"],
      [/(test)(?:is|es)$/i, "$1is"],
      [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, "$1us"],
      [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, "$1um"],
      [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, "$1on"],
      [/(alumn|alg|vertebr)ae$/i, "$1a"],
      [/(cod|mur|sil|vert|ind)ices$/i, "$1ex"],
      [/(matr|append)ices$/i, "$1ix"],
      [/(pe)(rson|ople)$/i, "$1rson"],
      [/(child)ren$/i, "$1"],
      [/(eau)x?$/i, "$1"],
      [/men$/i, "man"]
    ].forEach(function(rule) {
      return pluralize2.addSingularRule(rule[0], rule[1]);
    });
    [
      // Singular words with no plurals.
      "adulthood",
      "advice",
      "agenda",
      "aid",
      "aircraft",
      "alcohol",
      "ammo",
      "analytics",
      "anime",
      "athletics",
      "audio",
      "bison",
      "blood",
      "bream",
      "buffalo",
      "butter",
      "carp",
      "cash",
      "chassis",
      "chess",
      "clothing",
      "cod",
      "commerce",
      "cooperation",
      "corps",
      "debris",
      "diabetes",
      "digestion",
      "elk",
      "energy",
      "equipment",
      "excretion",
      "expertise",
      "firmware",
      "flounder",
      "fun",
      "gallows",
      "garbage",
      "graffiti",
      "hardware",
      "headquarters",
      "health",
      "herpes",
      "highjinks",
      "homework",
      "housework",
      "information",
      "jeans",
      "justice",
      "kudos",
      "labour",
      "literature",
      "machinery",
      "mackerel",
      "mail",
      "media",
      "mews",
      "moose",
      "music",
      "mud",
      "manga",
      "news",
      "only",
      "personnel",
      "pike",
      "plankton",
      "pliers",
      "police",
      "pollution",
      "premises",
      "rain",
      "research",
      "rice",
      "salmon",
      "scissors",
      "series",
      "sewage",
      "shambles",
      "shrimp",
      "software",
      "species",
      "staff",
      "swine",
      "tennis",
      "traffic",
      "transportation",
      "trout",
      "tuna",
      "wealth",
      "welfare",
      "whiting",
      "wildebeest",
      "wildlife",
      "you",
      /pok[eé]mon$/i,
      // Regexes.
      /[^aeiou]ese$/i,
      // "chinese", "japanese"
      /deer$/i,
      // "deer", "reindeer"
      /fish$/i,
      // "fish", "blowfish", "angelfish"
      /measles$/i,
      /o[iu]s$/i,
      // "carnivorous"
      /pox$/i,
      // "chickpox", "smallpox"
      /sheep$/i
    ].forEach(pluralize2.addUncountableRule);
    return pluralize2;
  });
})(pluralize);
const FieldMixin = {
  props: {
    field: {
      type: Object,
      required: true
    },
    value: {
      required: false,
      default: null
    },
    errors: {
      type: Object,
      required: false,
      default: () => {
      }
    }
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {
    hasError(handle) {
      return this.errors && this.errors.has(handle);
    },
    errorMessage(handle) {
      return this.hasError(handle) ? this.errors.get(handle) : "";
    }
  }
};
var vue3Treeselect_common = { exports: {} };
(function(module) {
  (function() {
    var __webpack_modules__ = {
      /***/
      390: (
        /***/
        function(module2) {
          function fuzzysearch(needle, haystack) {
            var tlen = haystack.length;
            var qlen = needle.length;
            if (qlen > tlen) {
              return false;
            }
            if (qlen === tlen) {
              return needle === haystack;
            }
            outer:
              for (var i = 0, j = 0; i < qlen; i++) {
                var nch = needle.charCodeAt(i);
                while (j < tlen) {
                  if (haystack.charCodeAt(j++) === nch) {
                    continue outer;
                  }
                }
                return false;
              }
            return true;
          }
          module2.exports = fuzzysearch;
        }
      ),
      /***/
      705: (
        /***/
        function(module2, __unused_webpack_exports, __webpack_require__2) {
          var root = __webpack_require__2(639);
          var Symbol2 = root.Symbol;
          module2.exports = Symbol2;
        }
      ),
      /***/
      239: (
        /***/
        function(module2, __unused_webpack_exports, __webpack_require__2) {
          var Symbol2 = __webpack_require__2(705), getRawTag = __webpack_require__2(607), objectToString = __webpack_require__2(333);
          var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
          var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
          function baseGetTag(value) {
            if (value == null) {
              return value === void 0 ? undefinedTag : nullTag;
            }
            return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
          }
          module2.exports = baseGetTag;
        }
      ),
      /***/
      561: (
        /***/
        function(module2, __unused_webpack_exports, __webpack_require__2) {
          var trimmedEndIndex = __webpack_require__2(990);
          var reTrimStart = /^\s+/;
          function baseTrim(string) {
            return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
          }
          module2.exports = baseTrim;
        }
      ),
      /***/
      957: (
        /***/
        function(module2, __unused_webpack_exports, __webpack_require__2) {
          var freeGlobal = typeof __webpack_require__2.g == "object" && __webpack_require__2.g && __webpack_require__2.g.Object === Object && __webpack_require__2.g;
          module2.exports = freeGlobal;
        }
      ),
      /***/
      607: (
        /***/
        function(module2, __unused_webpack_exports, __webpack_require__2) {
          var Symbol2 = __webpack_require__2(705);
          var objectProto = Object.prototype;
          var hasOwnProperty = objectProto.hasOwnProperty;
          var nativeObjectToString = objectProto.toString;
          var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
          function getRawTag(value) {
            var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
            try {
              value[symToStringTag] = void 0;
              var unmasked = true;
            } catch (e) {
            }
            var result = nativeObjectToString.call(value);
            if (unmasked) {
              if (isOwn) {
                value[symToStringTag] = tag;
              } else {
                delete value[symToStringTag];
              }
            }
            return result;
          }
          module2.exports = getRawTag;
        }
      ),
      /***/
      333: (
        /***/
        function(module2) {
          var objectProto = Object.prototype;
          var nativeObjectToString = objectProto.toString;
          function objectToString(value) {
            return nativeObjectToString.call(value);
          }
          module2.exports = objectToString;
        }
      ),
      /***/
      639: (
        /***/
        function(module2, __unused_webpack_exports, __webpack_require__2) {
          var freeGlobal = __webpack_require__2(957);
          var freeSelf = typeof self == "object" && self && self.Object === Object && self;
          var root = freeGlobal || freeSelf || Function("return this")();
          module2.exports = root;
        }
      ),
      /***/
      990: (
        /***/
        function(module2) {
          var reWhitespace = /\s/;
          function trimmedEndIndex(string) {
            var index = string.length;
            while (index-- && reWhitespace.test(string.charAt(index))) {
            }
            return index;
          }
          module2.exports = trimmedEndIndex;
        }
      ),
      /***/
      567: (
        /***/
        function(module2, __unused_webpack_exports, __webpack_require__2) {
          var toInteger = __webpack_require__2(554);
          var FUNC_ERROR_TEXT = "Expected a function";
          function before(n, func) {
            var result;
            if (typeof func != "function") {
              throw new TypeError(FUNC_ERROR_TEXT);
            }
            n = toInteger(n);
            return function() {
              if (--n > 0) {
                result = func.apply(this, arguments);
              }
              if (n <= 1) {
                func = void 0;
              }
              return result;
            };
          }
          module2.exports = before;
        }
      ),
      /***/
      703: (
        /***/
        function(module2) {
          function constant(value) {
            return function() {
              return value;
            };
          }
          module2.exports = constant;
        }
      ),
      /***/
      279: (
        /***/
        function(module2, __unused_webpack_exports, __webpack_require__2) {
          var isObject = __webpack_require__2(218), now = __webpack_require__2(771), toNumber = __webpack_require__2(841);
          var FUNC_ERROR_TEXT = "Expected a function";
          var nativeMax = Math.max, nativeMin = Math.min;
          function debounce(func, wait, options) {
            var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
            if (typeof func != "function") {
              throw new TypeError(FUNC_ERROR_TEXT);
            }
            wait = toNumber(wait) || 0;
            if (isObject(options)) {
              leading = !!options.leading;
              maxing = "maxWait" in options;
              maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
              trailing = "trailing" in options ? !!options.trailing : trailing;
            }
            function invokeFunc(time) {
              var args = lastArgs, thisArg = lastThis;
              lastArgs = lastThis = void 0;
              lastInvokeTime = time;
              result = func.apply(thisArg, args);
              return result;
            }
            function leadingEdge(time) {
              lastInvokeTime = time;
              timerId = setTimeout(timerExpired, wait);
              return leading ? invokeFunc(time) : result;
            }
            function remainingWait(time) {
              var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
              return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
            }
            function shouldInvoke(time) {
              var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
              return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
            }
            function timerExpired() {
              var time = now();
              if (shouldInvoke(time)) {
                return trailingEdge(time);
              }
              timerId = setTimeout(timerExpired, remainingWait(time));
            }
            function trailingEdge(time) {
              timerId = void 0;
              if (trailing && lastArgs) {
                return invokeFunc(time);
              }
              lastArgs = lastThis = void 0;
              return result;
            }
            function cancel() {
              if (timerId !== void 0) {
                clearTimeout(timerId);
              }
              lastInvokeTime = 0;
              lastArgs = lastCallTime = lastThis = timerId = void 0;
            }
            function flush() {
              return timerId === void 0 ? result : trailingEdge(now());
            }
            function debounced() {
              var time = now(), isInvoking = shouldInvoke(time);
              lastArgs = arguments;
              lastThis = this;
              lastCallTime = time;
              if (isInvoking) {
                if (timerId === void 0) {
                  return leadingEdge(lastCallTime);
                }
                if (maxing) {
                  clearTimeout(timerId);
                  timerId = setTimeout(timerExpired, wait);
                  return invokeFunc(lastCallTime);
                }
              }
              if (timerId === void 0) {
                timerId = setTimeout(timerExpired, wait);
              }
              return result;
            }
            debounced.cancel = cancel;
            debounced.flush = flush;
            return debounced;
          }
          module2.exports = debounce;
        }
      ),
      /***/
      557: (
        /***/
        function(module2) {
          function identity(value) {
            return value;
          }
          module2.exports = identity;
        }
      ),
      /***/
      218: (
        /***/
        function(module2) {
          function isObject(value) {
            var type = typeof value;
            return value != null && (type == "object" || type == "function");
          }
          module2.exports = isObject;
        }
      ),
      /***/
      5: (
        /***/
        function(module2) {
          function isObjectLike(value) {
            return value != null && typeof value == "object";
          }
          module2.exports = isObjectLike;
        }
      ),
      /***/
      448: (
        /***/
        function(module2, __unused_webpack_exports, __webpack_require__2) {
          var baseGetTag = __webpack_require__2(239), isObjectLike = __webpack_require__2(5);
          var symbolTag = "[object Symbol]";
          function isSymbol(value) {
            return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
          }
          module2.exports = isSymbol;
        }
      ),
      /***/
      928: (
        /***/
        function(module2) {
          function last(array) {
            var length = array == null ? 0 : array.length;
            return length ? array[length - 1] : void 0;
          }
          module2.exports = last;
        }
      ),
      /***/
      308: (
        /***/
        function(module2) {
          function noop() {
          }
          module2.exports = noop;
        }
      ),
      /***/
      771: (
        /***/
        function(module2, __unused_webpack_exports, __webpack_require__2) {
          var root = __webpack_require__2(639);
          var now = function() {
            return root.Date.now();
          };
          module2.exports = now;
        }
      ),
      /***/
      463: (
        /***/
        function(module2, __unused_webpack_exports, __webpack_require__2) {
          var before = __webpack_require__2(567);
          function once(func) {
            return before(2, func);
          }
          module2.exports = once;
        }
      ),
      /***/
      601: (
        /***/
        function(module2, __unused_webpack_exports, __webpack_require__2) {
          var toNumber = __webpack_require__2(841);
          var INFINITY = 1 / 0, MAX_INTEGER = 17976931348623157e292;
          function toFinite(value) {
            if (!value) {
              return value === 0 ? value : 0;
            }
            value = toNumber(value);
            if (value === INFINITY || value === -INFINITY) {
              var sign = value < 0 ? -1 : 1;
              return sign * MAX_INTEGER;
            }
            return value === value ? value : 0;
          }
          module2.exports = toFinite;
        }
      ),
      /***/
      554: (
        /***/
        function(module2, __unused_webpack_exports, __webpack_require__2) {
          var toFinite = __webpack_require__2(601);
          function toInteger(value) {
            var result = toFinite(value), remainder = result % 1;
            return result === result ? remainder ? result - remainder : result : 0;
          }
          module2.exports = toInteger;
        }
      ),
      /***/
      841: (
        /***/
        function(module2, __unused_webpack_exports, __webpack_require__2) {
          var baseTrim = __webpack_require__2(561), isObject = __webpack_require__2(218), isSymbol = __webpack_require__2(448);
          var NAN = 0 / 0;
          var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
          var reIsBinary = /^0b[01]+$/i;
          var reIsOctal = /^0o[0-7]+$/i;
          var freeParseInt = parseInt;
          function toNumber(value) {
            if (typeof value == "number") {
              return value;
            }
            if (isSymbol(value)) {
              return NAN;
            }
            if (isObject(value)) {
              var other = typeof value.valueOf == "function" ? value.valueOf() : value;
              value = isObject(other) ? other + "" : other;
            }
            if (typeof value != "string") {
              return value === 0 ? value : +value;
            }
            value = baseTrim(value);
            var isBinary = reIsBinary.test(value);
            return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
          }
          module2.exports = toNumber;
        }
      ),
      /***/
      744: (
        /***/
        function(__unused_webpack_module, exports) {
          exports.Z = (sfc, props) => {
            const target = sfc.__vccOpts || sfc;
            for (const [key, val] of props) {
              target[key] = val;
            }
            return target;
          };
        }
      )
      /******/
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
      var cachedModule = __webpack_module_cache__[moduleId];
      if (cachedModule !== void 0) {
        return cachedModule.exports;
      }
      var module2 = __webpack_module_cache__[moduleId] = {
        /******/
        // no module.id needed
        /******/
        // no module.loaded needed
        /******/
        exports: {}
        /******/
      };
      __webpack_modules__[moduleId](module2, module2.exports, __webpack_require__);
      return module2.exports;
    }
    !function() {
      __webpack_require__.n = function(module2) {
        var getter = module2 && module2.__esModule ? (
          /******/
          function() {
            return module2["default"];
          }
        ) : (
          /******/
          function() {
            return module2;
          }
        );
        __webpack_require__.d(getter, { a: getter });
        return getter;
      };
    }();
    !function() {
      __webpack_require__.d = function(exports, definition) {
        for (var key in definition) {
          if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
            Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
          }
        }
      };
    }();
    !function() {
      __webpack_require__.g = function() {
        if (typeof globalThis === "object")
          return globalThis;
        try {
          return this || new Function("return this")();
        } catch (e) {
          if (typeof window === "object")
            return window;
        }
      }();
    }();
    !function() {
      __webpack_require__.o = function(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      };
    }();
    !function() {
      __webpack_require__.r = function(exports) {
        if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
          Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
        }
        Object.defineProperty(exports, "__esModule", { value: true });
      };
    }();
    !function() {
      __webpack_require__.p = "";
    }();
    var __webpack_exports__ = {};
    !function() {
      __webpack_require__.r(__webpack_exports__);
      __webpack_require__.d(__webpack_exports__, {
        "ASYNC_SEARCH": function() {
          return (
            /* reexport */
            ASYNC_SEARCH
          );
        },
        "LOAD_CHILDREN_OPTIONS": function() {
          return (
            /* reexport */
            LOAD_CHILDREN_OPTIONS
          );
        },
        "LOAD_ROOT_OPTIONS": function() {
          return (
            /* reexport */
            LOAD_ROOT_OPTIONS
          );
        },
        "Treeselect": function() {
          return (
            /* reexport */
            Treeselect2
          );
        },
        "default": function() {
          return (
            /* binding */
            entry_lib
          );
        },
        "treeselectMixin": function() {
          return (
            /* reexport */
            treeselectMixin
          );
        }
      });
      if (typeof window !== "undefined") {
        var currentScript = window.document.currentScript;
        var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);
        if (src) {
          __webpack_require__.p = src[1];
        }
      }
      var external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject = require$$0;
      function render(_ctx, _cache, $props, $setup, $data, $options) {
        var _component_HiddenFields = (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("HiddenFields");
        var _component_Control = (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("Control");
        var _component_MenuPortal = (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("MenuPortal");
        var _component_Menu = (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("Menu");
        return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", {
          ref: "wrapper",
          class: (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeClass)(_ctx.wrapperClass)
        }, [(0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_HiddenFields), (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_Control, {
          ref: "control"
        }, null, 512), _ctx.appendToBody ? ((0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_MenuPortal, {
          key: 0,
          ref: "portal"
        }, null, 512)) : ((0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_Menu, {
          key: 1,
          ref: "menu"
        }, null, 512))], 2);
      }
      var fuzzysearch = __webpack_require__(390);
      var fuzzysearch_default = /* @__PURE__ */ __webpack_require__.n(fuzzysearch);
      function isNaN_isNaN(x) {
        return x !== x;
      }
      function includes(arrOrStr, elem) {
        return arrOrStr.indexOf(elem) !== -1;
      }
      var constant = __webpack_require__(703);
      var constant_default = /* @__PURE__ */ __webpack_require__.n(constant);
      var identity = __webpack_require__(557);
      var identity_default = /* @__PURE__ */ __webpack_require__.n(identity);
      var createMap = function createMap2() {
        return /* @__PURE__ */ Object.create(null);
      };
      function quickDiff(arrA, arrB) {
        if (arrA.length !== arrB.length)
          return true;
        for (var i = 0; i < arrA.length; i++) {
          if (arrA[i] !== arrB[i])
            return true;
        }
        return false;
      }
      var noop = __webpack_require__(308);
      var noop_default = /* @__PURE__ */ __webpack_require__.n(noop);
      var warning = (
        /* istanbul ignore next */
        noop_default()
      );
      function find(arr, predicate, ctx) {
        for (var i = 0, len = arr.length; i < len; i++) {
          if (predicate.call(ctx, arr[i], i, arr))
            return arr[i];
        }
        return void 0;
      }
      function onLeftClick(mouseDownHandler) {
        return function onMouseDown(evt) {
          if (evt.type === "mousedown" && evt.button === 0) {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }
            mouseDownHandler.call.apply(mouseDownHandler, [this, evt].concat(args));
          }
        };
      }
      function scrollIntoView($scrollingEl, $focusedEl) {
        var scrollingReact = $scrollingEl.getBoundingClientRect();
        var focusedRect = $focusedEl.getBoundingClientRect();
        var overScroll = $focusedEl.offsetHeight / 3;
        if (focusedRect.bottom + overScroll > scrollingReact.bottom) {
          $scrollingEl.scrollTop = Math.min($focusedEl.offsetTop + $focusedEl.clientHeight - $scrollingEl.offsetHeight + overScroll, $scrollingEl.scrollHeight);
        } else if (focusedRect.top - overScroll < scrollingReact.top) {
          $scrollingEl.scrollTop = Math.max($focusedEl.offsetTop - overScroll, 0);
        }
      }
      var lodash_last = __webpack_require__(928);
      var last_default = /* @__PURE__ */ __webpack_require__.n(lodash_last);
      var once = __webpack_require__(463);
      var once_default = /* @__PURE__ */ __webpack_require__.n(once);
      function isPromise(obj) {
        return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
      }
      function removeFromArray(arr, elem) {
        var idx = arr.indexOf(elem);
        if (idx !== -1)
          arr.splice(idx, 1);
      }
      var NO_PARENT_NODE = null;
      var UNCHECKED = 0;
      var INDETERMINATE = 1;
      var CHECKED = 2;
      var ALL_CHILDREN = "ALL_CHILDREN";
      var ALL_DESCENDANTS = "ALL_DESCENDANTS";
      var LEAF_CHILDREN = "LEAF_CHILDREN";
      var LEAF_DESCENDANTS = "LEAF_DESCENDANTS";
      var LOAD_ROOT_OPTIONS = "LOAD_ROOT_OPTIONS";
      var LOAD_CHILDREN_OPTIONS = "LOAD_CHILDREN_OPTIONS";
      var ASYNC_SEARCH = "ASYNC_SEARCH";
      var ALL = "ALL";
      var BRANCH_PRIORITY = "BRANCH_PRIORITY";
      var LEAF_PRIORITY = "LEAF_PRIORITY";
      var ALL_WITH_INDETERMINATE = "ALL_WITH_INDETERMINATE";
      var ORDER_SELECTED = "ORDER_SELECTED";
      var LEVEL = "LEVEL";
      var INDEX = "INDEX";
      var KEY_CODES = {
        BACKSPACE: 8,
        ENTER: 13,
        ESCAPE: 27,
        END: 35,
        HOME: 36,
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        DELETE: 46
      };
      var INPUT_DEBOUNCE_DELAY = (
        /* istanbul ignore next */
        200
      );
      var MIN_INPUT_WIDTH = 5;
      var MENU_BUFFER = 40;
      function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || treeselectMixin_unsupportedIterableToArray(arr, i) || _nonIterableRest();
      }
      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _iterableToArrayLimit(arr, i) {
        var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
        if (_i == null)
          return;
        var _arr = [];
        var _n = true;
        var _d = false;
        var _s, _e;
        try {
          for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i)
              break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"] != null)
              _i["return"]();
          } finally {
            if (_d)
              throw _e;
          }
        }
        return _arr;
      }
      function _arrayWithHoles(arr) {
        if (Array.isArray(arr))
          return arr;
      }
      function treeselectMixin_toConsumableArray(arr) {
        return treeselectMixin_arrayWithoutHoles(arr) || treeselectMixin_iterableToArray(arr) || treeselectMixin_unsupportedIterableToArray(arr) || treeselectMixin_nonIterableSpread();
      }
      function treeselectMixin_nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function treeselectMixin_unsupportedIterableToArray(o, minLen) {
        if (!o)
          return;
        if (typeof o === "string")
          return treeselectMixin_arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor)
          n = o.constructor.name;
        if (n === "Map" || n === "Set")
          return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
          return treeselectMixin_arrayLikeToArray(o, minLen);
      }
      function treeselectMixin_iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
          return Array.from(iter);
      }
      function treeselectMixin_arrayWithoutHoles(arr) {
        if (Array.isArray(arr))
          return treeselectMixin_arrayLikeToArray(arr);
      }
      function treeselectMixin_arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length)
          len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) {
          arr2[i] = arr[i];
        }
        return arr2;
      }
      function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object);
          enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          })), keys.push.apply(keys, symbols);
        }
        return keys;
      }
      function _objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = null != arguments[i] ? arguments[i] : {};
          i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
        return target;
      }
      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
        } else {
          obj[key] = value;
        }
        return obj;
      }
      function sortValueByIndex(a, b) {
        var i = 0;
        do {
          if (a.level < i)
            return -1;
          if (b.level < i)
            return 1;
          if (a.index[i] !== b.index[i])
            return a.index[i] - b.index[i];
          i++;
        } while (true);
      }
      function sortValueByLevel(a, b) {
        return a.level === b.level ? sortValueByIndex(a, b) : a.level - b.level;
      }
      function createAsyncOptionsStates() {
        return {
          isLoaded: false,
          isLoading: false,
          loadingError: ""
        };
      }
      function stringifyOptionPropValue(value) {
        if (typeof value === "string")
          return value;
        if (typeof value === "number" && !isNaN_isNaN(value))
          return value + "";
        return "";
      }
      function toLowerCaseNonAccentVietnamese(str) {
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
        str = str.replace(/\u02C6|\u0306|\u031B/g, "");
        return str;
      }
      function match(enableFuzzyMatch, needle, haystack) {
        var _needle = toLowerCaseNonAccentVietnamese(needle);
        var _haystack = toLowerCaseNonAccentVietnamese(haystack);
        return enableFuzzyMatch ? fuzzysearch_default()(_needle, _haystack) : includes(_haystack, _needle);
      }
      function getErrorMessage(err) {
        return err.message || /* istanbul ignore next */
        String(err);
      }
      var instanceId = 0;
      var treeselectMixin = {
        provide: function provide() {
          return {
            // Enable access to the instance of root component of vue-treeselect
            // across hierarchy.
            instance: this
          };
        },
        props: {
          /**
           * Whether to allow resetting value even if there are disabled selected nodes.
           */
          allowClearingDisabled: {
            type: Boolean,
            default: false
          },
          /**
           * When an ancestor node is selected/deselected, whether its disabled descendants should be selected/deselected.
           * You may want to use this in conjunction with `allowClearingDisabled` prop.
           */
          allowSelectingDisabledDescendants: {
            type: Boolean,
            default: false
          },
          /**
           * Whether the menu should be always open.
           */
          alwaysOpen: {
            type: Boolean,
            default: false
          },
          /**
           * Append the menu to <body />?
           */
          appendToBody: {
            type: Boolean,
            default: false
          },
          /**
           * Width of menu container
           */
          menuContainerStyle: {
            type: String,
            default: void 0
          },
          /**
           * Whether to enable async search mode.
           */
          async: {
            type: Boolean,
            default: false
          },
          /**
           * Automatically focus the component on mount?
           */
          autoFocus: {
            type: Boolean,
            default: false
          },
          /**
           * Automatically load root options on mount. When set to `false`, root options will be loaded when the menu is opened.
           */
          autoLoadRootOptions: {
            type: Boolean,
            default: true
          },
          /**
           * When user deselects a node, automatically deselect its ancestors. Applies to flat mode only.
           */
          autoDeselectAncestors: {
            type: Boolean,
            default: false
          },
          /**
           * When user deselects a node, automatically deselect its descendants. Applies to flat mode only.
           */
          autoDeselectDescendants: {
            type: Boolean,
            default: false
          },
          /**
           * When user selects a node, automatically select its ancestors. Applies to flat mode only.
           */
          autoSelectAncestors: {
            type: Boolean,
            default: false
          },
          /**
           * When user selects a node, automatically select its descendants. Applies to flat mode only.
           */
          autoSelectDescendants: {
            type: Boolean,
            default: false
          },
          /**
           * Whether pressing backspace key removes the last item if there is no text input.
           */
          backspaceRemoves: {
            type: Boolean,
            default: true
          },
          /**
           * Function that processes before clearing all input fields.
           * Return `false` to prevent value from being cleared.
           * @type {function(): (boolean|Promise<boolean>)}
           */
          beforeClearAll: {
            type: Function,
            default: constant_default()(true)
          },
          /**
           * Show branch nodes before leaf nodes?
           */
          branchNodesFirst: {
            type: Boolean,
            default: false
          },
          /**
           * Should cache results of every search request?
           */
          cacheOptions: {
            type: Boolean,
            default: true
          },
          /**
           * Show an "×" button that resets value?
           */
          clearable: {
            type: Boolean,
            default: true
          },
          /**
           * Title for the "×" button when `multiple: true`.
           */
          clearAllText: {
            type: String,
            default: "Clear all"
          },
          /**
           * Whether to clear the search input after selecting.
           * Use only when `multiple` is `true`.
           * For single-select mode, it **always** clears the input after selecting an option regardless of the prop value.
           */
          clearOnSelect: {
            type: Boolean,
            default: false
          },
          /**
           * Title for the "×" button.
           */
          clearValueText: {
            type: String,
            default: "Clear value"
          },
          /**
           * Whether to close the menu after selecting an option?
           * Use only when `multiple` is `true`.
           */
          closeOnSelect: {
            type: Boolean,
            default: true
          },
          /**
           * How many levels of branch nodes should be automatically expanded when loaded.
           * Set `Infinity` to make all branch nodes expanded by default.
           */
          defaultExpandLevel: {
            type: Number,
            default: 0
          },
          /**
           * The default set of options to show before the user starts searching. Used for async search mode.
           * When set to `true`, the results for search query as a empty string will be autoloaded.
           * @type {boolean|node[]}
           */
          defaultOptions: {
            default: false
          },
          /**
           * Whether pressing delete key removes the last item if there is no text input.
           */
          deleteRemoves: {
            type: Boolean,
            default: true
          },
          /**
           * Delimiter to use to join multiple values for the hidden field value.
           */
          delimiter: {
            type: String,
            default: ","
          },
          /**
           * Only show the nodes that match the search value directly, excluding its ancestors.
           *
           * @type {Object}
           */
          flattenSearchResults: {
            type: Boolean,
            default: false
          },
          /**
           * Prevent branch nodes from being selected?
           */
          disableBranchNodes: {
            type: Boolean,
            default: false
          },
          /**
           * Disable the control?
           */
          disabled: {
            type: Boolean,
            default: false
          },
          /**
           * Disable the fuzzy matching functionality?
           */
          disableFuzzyMatching: {
            type: Boolean,
            default: false
          },
          /**
           * Whether to enable flat mode or not. Non-flat mode (default) means:
           *   - Whenever a branch node gets checked, all its children will be checked too
           *   - Whenever a branch node has all children checked, the branch node itself will be checked too
           * Set `true` to disable this mechanism
           */
          flat: {
            type: Boolean,
            default: false
          },
          /**
           * Will be passed with all events as the last param.
           * Useful for identifying events origin.
           */
          instanceId: {
            // Add two trailing "$" to distinguish from explictly specified ids.
            default: function _default() {
              return "".concat(instanceId++, "$$");
            },
            type: [String, Number]
          },
          /**
           * Joins multiple values into a single form field with the `delimiter` (legacy mode).
           */
          joinValues: {
            type: Boolean,
            default: false
          },
          /**
           * Limit the display of selected options.
           * The rest will be hidden within the limitText string.
           */
          limit: {
            type: Number,
            default: Infinity
          },
          /**
           * Function that processes the message shown when selected elements pass the defined limit.
           * @type {function(number): string}
           */
          limitText: {
            type: Function,
            default: function limitTextDefault(count) {
              return "and ".concat(count, " more");
            }
          },
          /**
           * Text displayed when loading options.
           */
          loadingText: {
            type: String,
            default: "Loading..."
          },
          /**
           * Used for dynamically loading options.
           * @type {function({action: string, callback: (function((Error|string)=): void), parentNode: node=, instanceId}): void}
           */
          loadOptions: {
            type: Function
          },
          /**
           * Which node properties to filter on.
           */
          matchKeys: {
            type: Array,
            default: constant_default()(["label"])
          },
          /**
           * Sets `maxHeight` style value of the menu.
           */
          maxHeight: {
            type: Number,
            default: 300
          },
          /**
           * Set `true` to allow selecting multiple options (a.k.a., multi-select mode).
           */
          multiple: {
            type: Boolean,
            default: false
          },
          /**
           * Generates a hidden <input /> tag with this field name for html forms.
           */
          name: {
            type: String
          },
          /**
           * Text displayed when a branch node has no children.
           */
          noChildrenText: {
            type: String,
            default: "No sub-options."
          },
          /**
           * Text displayed when there are no available options.
           */
          noOptionsText: {
            type: String,
            default: "No options available."
          },
          /**
           * Text displayed when there are no matching search results.
           */
          noResultsText: {
            type: String,
            default: "No results found..."
          },
          /**
           * Used for normalizing source data.
           * @type {function(node, instanceId): node}
           */
          normalizer: {
            type: Function,
            default: identity_default()
          },
          /**
           * By default (`auto`), the menu will open below the control. If there is not
           * enough space, vue-treeselect will automatically flip the menu.
           * You can use one of other four options to force the menu to be always opened
           * to specified direction.
           * Acceptable values:
           *   - `"auto"`
           *   - `"below"`
           *   - `"bottom"`
           *   - `"above"`
           *   - `"top"`
           */
          openDirection: {
            type: String,
            default: "auto",
            validator: function validator(value) {
              var acceptableValues = ["auto", "top", "bottom", "above", "below"];
              return includes(acceptableValues, value);
            }
          },
          /**
           * Whether to automatically open the menu when the control is clicked.
           */
          openOnClick: {
            type: Boolean,
            default: true
          },
          /**
           * Whether to automatically open the menu when the control is focused.
           */
          openOnFocus: {
            type: Boolean,
            default: false
          },
          /**
           * Array of available options.
           * @type {node[]}
           */
          options: {
            type: Array
          },
          /**
           * Field placeholder, displayed when there's no value.
           */
          placeholder: {
            type: String,
            default: "Select..."
          },
          /**
           * Applies HTML5 required attribute when needed.
           */
          required: {
            type: Boolean,
            default: false
          },
          /**
           * Text displayed asking user whether to retry loading children options.
           */
          retryText: {
            type: String,
            default: "Retry?"
          },
          /**
           * Title for the retry button.
           */
          retryTitle: {
            type: String,
            default: "Click to retry"
          },
          /**
           * Enable searching feature?
           */
          searchable: {
            type: Boolean,
            default: true
          },
          /**
           * Search in ancestor nodes too.
           */
          searchNested: {
            type: Boolean,
            default: false
          },
          /**
           * Text tip to prompt for async search.
           */
          searchPromptText: {
            type: String,
            default: "Type to search..."
          },
          /**
           * Whether to show a children count next to the label of each branch node.
           */
          showCount: {
            type: Boolean,
            default: false
          },
          /**
           * Used in conjunction with `showCount` to specify which type of count number should be displayed.
           * Acceptable values:
           *   - "ALL_CHILDREN"
           *   - "ALL_DESCENDANTS"
           *   - "LEAF_CHILDREN"
           *   - "LEAF_DESCENDANTS"
           */
          showCountOf: {
            type: String,
            default: ALL_CHILDREN,
            validator: function validator(value) {
              var acceptableValues = [ALL_CHILDREN, ALL_DESCENDANTS, LEAF_CHILDREN, LEAF_DESCENDANTS];
              return includes(acceptableValues, value);
            }
          },
          /**
           * Whether to show children count when searching.
           * Fallbacks to the value of `showCount` when not specified.
           * @type {boolean}
           */
          showCountOnSearch: null,
          /**
           * In which order the selected options should be displayed in trigger & sorted in `value` array.
           * Used for multi-select mode only.
           * Acceptable values:
           *   - "ORDER_SELECTED"
           *   - "LEVEL"
           *   - "INDEX"
           */
          sortValueBy: {
            type: String,
            default: ORDER_SELECTED,
            validator: function validator(value) {
              var acceptableValues = [ORDER_SELECTED, LEVEL, INDEX];
              return includes(acceptableValues, value);
            }
          },
          /**
           * Tab index of the control.
           */
          tabIndex: {
            type: Number,
            default: 0
          },
          /**
           * The value of the control.
           * Should be `id` or `node` object for single-select mode, or an array of `id` or `node` object for multi-select mode.
           * Its format depends on the `valueFormat` prop.
           * For most cases, just use `v-model` instead.
           * @type {?Array}
           */
          modelValue: null,
          /**
           * Which kind of nodes should be included in the `value` array in multi-select mode.
           * Acceptable values:
           *   - "ALL" - Any node that is checked will be included in the `value` array
           *   - "BRANCH_PRIORITY" (default) - If a branch node is checked, all its descendants will be excluded in the `value` array
           *   - "LEAF_PRIORITY" - If a branch node is checked, this node itself and its branch descendants will be excluded from the `value` array but its leaf descendants will be included
           *   - "ALL_WITH_INDETERMINATE" - Any node that is checked will be included in the `value` array, plus indeterminate nodes
           */
          valueConsistsOf: {
            type: String,
            default: BRANCH_PRIORITY,
            validator: function validator(value) {
              var acceptableValues = [ALL, BRANCH_PRIORITY, LEAF_PRIORITY, ALL_WITH_INDETERMINATE];
              return includes(acceptableValues, value);
            }
          },
          /**
           * Format of `value` prop.
           * Note that, when set to `"object"`, only `id` & `label` properties are required in each `node` object in `value` prop.
           * Acceptable values:
           *   - "id"
           *   - "object"
           */
          valueFormat: {
            type: String,
            default: "id"
          },
          /**
           * z-index of the menu.
           */
          zIndex: {
            type: [Number, String],
            default: 999
          }
        },
        data: function data() {
          return {
            trigger: {
              // Is the control focused?
              isFocused: false,
              // User entered search query - value of the input.
              searchQuery: ""
            },
            menu: {
              // Is the menu opened?
              isOpen: false,
              // Id of current highlighted option.
              current: null,
              // The scroll position before last menu closing.
              lastScrollPosition: 0,
              // Which direction to open the menu.
              placement: "bottom"
            },
            forest: {
              // Normalized options.
              normalizedOptions: [],
              // <id, node> map for quick look-up.
              nodeMap: createMap(),
              // <id, checkedState> map, used for multi-select mode.
              checkedStateMap: createMap(),
              // Id list of all selected options.
              selectedNodeIds: this.extractCheckedNodeIdsFromValue(),
              // <id, true> map for fast checking:
              //   if (forest.selectedNodeIds.indexOf(id) !== -1) forest.selectedNodeMap[id] === true
              selectedNodeMap: createMap()
            },
            // States of root options.
            rootOptionsStates: createAsyncOptionsStates(),
            localSearch: {
              // Has user entered any query to search local options?
              active: false,
              // Has any options matched the search query?
              noResults: true,
              // <id, countObject> map for counting matched children/descendants.
              countMap: createMap()
            },
            // <searchQuery, remoteSearchEntry> map.
            remoteSearch: createMap()
          };
        },
        computed: {
          /* eslint-disable valid-jsdoc */
          /**
           * Normalized nodes that have been selected.
           * @type {node[]}
           */
          selectedNodes: function selectedNodes() {
            return this.forest.selectedNodeIds.map(this.getNode);
          },
          /**
           * Id list of selected nodes with `sortValueBy` prop applied.
           * @type {nodeId[]}
           */
          internalValue: function internalValue() {
            var _this = this;
            var internalValue2;
            if (this.single || this.flat || this.disableBranchNodes || this.valueConsistsOf === ALL) {
              internalValue2 = this.forest.selectedNodeIds.slice();
            } else if (this.valueConsistsOf === BRANCH_PRIORITY) {
              internalValue2 = this.forest.selectedNodeIds.filter(function(id) {
                var node = _this.getNode(id);
                if (node.isRootNode)
                  return true;
                return !_this.isSelected(node.parentNode);
              });
            } else if (this.valueConsistsOf === LEAF_PRIORITY) {
              internalValue2 = this.forest.selectedNodeIds.filter(function(id) {
                var node = _this.getNode(id);
                if (node.isLeaf)
                  return true;
                return node.children.length === 0;
              });
            } else if (this.valueConsistsOf === ALL_WITH_INDETERMINATE) {
              var _internalValue;
              var indeterminateNodeIds = [];
              internalValue2 = this.forest.selectedNodeIds.slice();
              this.selectedNodes.forEach(function(selectedNode) {
                selectedNode.ancestors.forEach(function(ancestor) {
                  if (includes(indeterminateNodeIds, ancestor.id))
                    return;
                  if (includes(internalValue2, ancestor.id))
                    return;
                  indeterminateNodeIds.push(ancestor.id);
                });
              });
              (_internalValue = internalValue2).push.apply(_internalValue, indeterminateNodeIds);
            }
            if (this.sortValueBy === LEVEL) {
              internalValue2.sort(function(a, b) {
                return sortValueByLevel(_this.getNode(a), _this.getNode(b));
              });
            } else if (this.sortValueBy === INDEX) {
              internalValue2.sort(function(a, b) {
                return sortValueByIndex(_this.getNode(a), _this.getNode(b));
              });
            }
            return internalValue2;
          },
          /**
           * Has any option been selected?
           * @type {boolean}
           */
          hasValue: function hasValue() {
            return this.internalValue.length > 0;
          },
          /**
           * Single-select mode?
           * @type {boolean}
           */
          single: function single() {
            return !this.multiple;
          },
          /**
           * Id list of nodes displayed in the menu. Nodes that are considered NOT visible:
           *   - descendants of a collapsed branch node
           *   - in local search mode, nodes that are not matched, unless
           *       - it's a branch node and has matched descendants
           *       - it's a leaf node and its parent node is explicitly set to show all children
           * @type {id[]}
           */
          visibleOptionIds: function visibleOptionIds() {
            var _this2 = this;
            var visibleOptionIds2 = [];
            this.traverseAllNodesByIndex(function(node) {
              if (!_this2.localSearch.active || _this2.shouldOptionBeIncludedInSearchResult(node)) {
                visibleOptionIds2.push(node.id);
              }
              if (node.isBranch && !_this2.shouldExpand(node)) {
                return false;
              }
            });
            return visibleOptionIds2;
          },
          /**
           * Has any option should be displayed in the menu?
           * @type {boolean}
           */
          hasVisibleOptions: function hasVisibleOptions() {
            return this.visibleOptionIds.length !== 0;
          },
          /**
           * Should show children count when searching?
           * @type {boolean}
           */
          showCountOnSearchComputed: function showCountOnSearchComputed() {
            return typeof this.showCountOnSearch === "boolean" ? this.showCountOnSearch : this.showCount;
          },
          /**
           * Is there any branch node?
           * @type {boolean}
           */
          hasBranchNodes: function hasBranchNodes() {
            return this.forest.normalizedOptions.some(function(rootNode) {
              return rootNode.isBranch;
            });
          },
          shouldFlattenOptions: function shouldFlattenOptions() {
            return this.localSearch.active && this.flattenSearchResults;
          }
          /* eslint-enable valid-jsdoc */
        },
        watch: {
          alwaysOpen: function alwaysOpen(newValue) {
            if (newValue)
              this.openMenu();
            else
              this.closeMenu();
          },
          branchNodesFirst: function branchNodesFirst() {
            this.initialize();
          },
          disabled: function disabled(newValue) {
            if (newValue && this.menu.isOpen)
              this.closeMenu();
            else if (!newValue && !this.menu.isOpen && this.alwaysOpen)
              this.openMenu();
          },
          flat: function flat() {
            this.initialize();
          },
          internalValue: function internalValue(newValue, oldValue) {
            var hasChanged = quickDiff(newValue, oldValue);
            if (hasChanged)
              this.$emit("update:modelValue", this.getValue(), this.getInstanceId());
          },
          matchKeys: function matchKeys() {
            this.initialize();
          },
          multiple: function multiple(newValue) {
            if (newValue)
              this.buildForestState();
          },
          options: {
            handler: function handler() {
              if (this.async)
                return;
              this.initialize();
              this.rootOptionsStates.isLoaded = Array.isArray(this.options);
            },
            deep: true,
            immediate: true
          },
          "trigger.searchQuery": function triggerSearchQuery() {
            if (this.async) {
              this.handleRemoteSearch();
              this.$emit("search-change", this.trigger.searchQuery, this.getInstanceId());
            } else {
              this.delayLocalSearch();
            }
          },
          value: function value() {
            var nodeIdsFromValue = this.extractCheckedNodeIdsFromValue();
            var hasChanged = quickDiff(nodeIdsFromValue, this.internalValue);
            if (hasChanged)
              this.fixSelectedNodeIds(nodeIdsFromValue);
          }
        },
        methods: {
          _localSearch: function _localSearch() {
            this.handleLocalSearch();
            this.$emit("search-change", this.trigger.searchQuery, this.getInstanceId());
          },
          delayLocalSearch: function delayLocalSearch() {
            if (this.localSearchTimeout > 0) {
              clearTimeout(this.localSearchTimeout);
              this.localSearchTimeout = -1;
            }
            this.localSearchTimeout = setTimeout(this._localSearch, 500);
          },
          verifyProps: function verifyProps() {
            var _this3 = this;
            warning(function() {
              return _this3.async ? _this3.searchable : true;
            }, function() {
              return 'For async search mode, the value of "searchable" prop must be true.';
            });
            if (this.options == null && !this.loadOptions) {
              warning(function() {
                return false;
              }, function() {
                return 'Are you meant to dynamically load options? You need to use "loadOptions" prop.';
              });
            }
            if (this.flat) {
              warning(function() {
                return _this3.multiple;
              }, function() {
                return 'You are using flat mode. But you forgot to add "multiple=true"?';
              });
            }
            if (!this.flat) {
              var propNames = ["autoSelectAncestors", "autoSelectDescendants", "autoDeselectAncestors", "autoDeselectDescendants"];
              propNames.forEach(function(propName) {
                warning(function() {
                  return !_this3[propName];
                }, function() {
                  return '"'.concat(propName, '" only applies to flat mode.');
                });
              });
            }
          },
          resetFlags: function resetFlags() {
            this._blurOnSelect = false;
          },
          initialize: function initialize() {
            var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
            if (options.length === 0) {
              options = this.async ? this.getRemoteSearchEntry().options : this.options;
            }
            if (Array.isArray(options)) {
              var prevNodeMap = this.forest.nodeMap;
              this.forest.nodeMap = createMap();
              this.keepDataOfSelectedNodes(prevNodeMap);
              this.forest.normalizedOptions = this.normalize(NO_PARENT_NODE, options, prevNodeMap);
              this.fixSelectedNodeIds(this.internalValue);
            } else {
              this.forest.normalizedOptions = [];
            }
          },
          getInstanceId: function getInstanceId() {
            return this.instanceId == null ? this.id : this.instanceId;
          },
          getValue: function getValue() {
            var _this4 = this;
            if (this.valueFormat === "id") {
              return this.multiple ? this.internalValue.slice() : this.internalValue[0];
            }
            var rawNodes = this.internalValue.map(function(id) {
              return _this4.getNode(id).raw;
            });
            return this.multiple ? rawNodes : rawNodes[0];
          },
          getNode: function getNode(nodeId) {
            warning(function() {
              return nodeId != null;
            }, function() {
              return "Invalid node id: ".concat(nodeId);
            });
            if (nodeId == null)
              return null;
            return nodeId in this.forest.nodeMap ? this.forest.nodeMap[nodeId] : this.createFallbackNode(nodeId);
          },
          createFallbackNode: function createFallbackNode(id) {
            var raw = this.extractNodeFromValue(id);
            var label = this.enhancedNormalizer(raw).label || "".concat(id, " (unknown)");
            var fallbackNode = {
              id,
              label,
              ancestors: [],
              parentNode: NO_PARENT_NODE,
              isFallbackNode: true,
              isRootNode: true,
              isLeaf: true,
              isBranch: false,
              isDisabled: false,
              isNew: false,
              index: [-1],
              level: 0,
              raw
            };
            return this.forest.nodeMap[id] = fallbackNode;
          },
          extractCheckedNodeIdsFromValue: function extractCheckedNodeIdsFromValue() {
            var _this5 = this;
            if (this.modelValue == null)
              return [];
            if (this.valueFormat === "id") {
              return this.multiple ? this.modelValue.slice() : [this.modelValue];
            }
            return (this.multiple ? this.modelValue : [this.modelValue]).map(function(node) {
              return _this5.enhancedNormalizer(node);
            }).map(function(node) {
              return node.id;
            });
          },
          extractNodeFromValue: function extractNodeFromValue(id) {
            var _this6 = this;
            var defaultNode = {
              id
            };
            if (this.valueFormat === "id") {
              return defaultNode;
            }
            var valueArray = this.multiple ? Array.isArray(this.modelValue) ? this.modelValue : [] : this.modelValue ? [this.modelValue] : [];
            var matched = find(valueArray, function(node) {
              return node && _this6.enhancedNormalizer(node).id === id;
            });
            return matched || defaultNode;
          },
          fixSelectedNodeIds: function fixSelectedNodeIds(nodeIdListOfPrevValue) {
            var _this7 = this;
            var nextSelectedNodeIds = [];
            if (this.single || this.flat || this.disableBranchNodes || this.valueConsistsOf === ALL) {
              nextSelectedNodeIds = nodeIdListOfPrevValue;
            } else if (this.valueConsistsOf === BRANCH_PRIORITY) {
              nodeIdListOfPrevValue.forEach(function(nodeId2) {
                nextSelectedNodeIds.push(nodeId2);
                var node2 = _this7.getNode(nodeId2);
                if (node2.isBranch)
                  _this7.traverseDescendantsBFS(node2, function(descendant) {
                    nextSelectedNodeIds.push(descendant.id);
                  });
              });
            } else if (this.valueConsistsOf === LEAF_PRIORITY) {
              var map = createMap();
              var queue = nodeIdListOfPrevValue.slice();
              while (queue.length) {
                var nodeId = queue.shift();
                var node = this.getNode(nodeId);
                nextSelectedNodeIds.push(nodeId);
                if (node.isRootNode)
                  continue;
                if (!(node.parentNode.id in map))
                  map[node.parentNode.id] = node.parentNode.children.length;
                if (--map[node.parentNode.id] === 0)
                  queue.push(node.parentNode.id);
              }
            } else if (this.valueConsistsOf === ALL_WITH_INDETERMINATE) {
              var _map = createMap();
              var _queue = nodeIdListOfPrevValue.filter(function(nodeId2) {
                var node2 = _this7.getNode(nodeId2);
                return node2.isLeaf || node2.children.length === 0;
              });
              while (_queue.length) {
                var _nodeId = _queue.shift();
                var _node = this.getNode(_nodeId);
                nextSelectedNodeIds.push(_nodeId);
                if (_node.isRootNode)
                  continue;
                if (!(_node.parentNode.id in _map))
                  _map[_node.parentNode.id] = _node.parentNode.children.length;
                if (--_map[_node.parentNode.id] === 0)
                  _queue.push(_node.parentNode.id);
              }
            }
            var hasChanged = quickDiff(this.forest.selectedNodeIds, nextSelectedNodeIds);
            if (hasChanged)
              this.forest.selectedNodeIds = nextSelectedNodeIds;
            this.buildForestState();
          },
          keepDataOfSelectedNodes: function keepDataOfSelectedNodes(prevNodeMap) {
            var _this8 = this;
            this.forest.selectedNodeIds.forEach(function(id) {
              if (!prevNodeMap[id])
                return;
              var node = _objectSpread(_objectSpread({}, prevNodeMap[id]), {}, {
                isFallbackNode: true
              });
              _this8.forest.nodeMap[id] = node;
            });
          },
          isSelected: function isSelected(node) {
            return this.forest.selectedNodeMap[node.id] === true;
          },
          traverseDescendantsBFS: function traverseDescendantsBFS(parentNode, callback) {
            if (!parentNode.isBranch)
              return;
            var queue = parentNode.children.slice();
            while (queue.length) {
              var currNode = queue[0];
              if (currNode.isBranch)
                queue.push.apply(queue, treeselectMixin_toConsumableArray(currNode.children));
              callback(currNode);
              queue.shift();
            }
          },
          traverseDescendantsDFS: function traverseDescendantsDFS(parentNode, callback) {
            var _this9 = this;
            if (!parentNode.isBranch)
              return;
            parentNode.children.forEach(function(child) {
              _this9.traverseDescendantsDFS(child, callback);
              callback(child);
            });
          },
          traverseAllNodesDFS: function traverseAllNodesDFS(callback) {
            var _this10 = this;
            this.forest.normalizedOptions.forEach(function(rootNode) {
              _this10.traverseDescendantsDFS(rootNode, callback);
              callback(rootNode);
            });
          },
          traverseAllNodesByIndex: function traverseAllNodesByIndex(callback) {
            var walk = function walk2(parentNode) {
              parentNode.children.forEach(function(child) {
                if (callback(child) !== false && child.isBranch) {
                  walk2(child);
                }
              });
            };
            walk({
              children: this.forest.normalizedOptions
            });
          },
          toggleClickOutsideEvent: function toggleClickOutsideEvent(enabled) {
            if (enabled) {
              document.addEventListener("mousedown", this.handleClickOutside, false);
            } else {
              document.removeEventListener("mousedown", this.handleClickOutside, false);
            }
          },
          getValueContainer: function getValueContainer() {
            return this.$refs.control.$refs["value-container"];
          },
          getInput: function getInput() {
            return this.getValueContainer().$refs.input;
          },
          focusInput: function focusInput() {
            this.getInput().focus();
          },
          blurInput: function blurInput() {
            this.getInput().blur();
          },
          handleMouseDown: onLeftClick(function handleMouseDown(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            if (this.disabled)
              return;
            var isClickedOnValueContainer = this.getValueContainer().$el.contains(evt.target);
            if (isClickedOnValueContainer && !this.menu.isOpen && (this.openOnClick || this.trigger.isFocused)) {
              this.openMenu();
            }
            if (this._blurOnSelect) {
              this.blurInput();
            } else {
              this.focusInput();
            }
            this.resetFlags();
          }),
          handleClickOutside: function handleClickOutside(evt) {
            if (this.$refs.wrapper && !this.$refs.wrapper.contains(evt.target)) {
              this.blurInput();
              this.closeMenu();
            }
          },
          handleLocalSearch: function handleLocalSearch() {
            var _this11 = this;
            var searchQuery = this.trigger.searchQuery;
            var done = function done2() {
              return _this11.resetHighlightedOptionWhenNecessary(true);
            };
            if (!searchQuery) {
              this.localSearch.active = false;
              return done();
            }
            this.localSearch.active = true;
            this.localSearch.noResults = true;
            this.traverseAllNodesDFS(function(node) {
              if (node.isBranch) {
                var _this11$localSearch$c;
                node.isExpandedOnSearch = false;
                node.showAllChildrenOnSearch = false;
                node.isMatched = false;
                node.hasMatchedDescendants = false;
                _this11.localSearch.countMap[node.id] = (_this11$localSearch$c = {}, _defineProperty(_this11$localSearch$c, ALL_CHILDREN, 0), _defineProperty(_this11$localSearch$c, ALL_DESCENDANTS, 0), _defineProperty(_this11$localSearch$c, LEAF_CHILDREN, 0), _defineProperty(_this11$localSearch$c, LEAF_DESCENDANTS, 0), _this11$localSearch$c);
              }
            });
            var lowerCasedSearchQuery = searchQuery.trim().toLocaleLowerCase();
            var splitSearchQuery = lowerCasedSearchQuery.replace(/\s+/g, " ").split(" ");
            this.traverseAllNodesDFS(function(node) {
              if (_this11.searchNested && splitSearchQuery.length > 1) {
                node.isMatched = splitSearchQuery.every(function(filterValue) {
                  return match(false, filterValue, node.nestedSearchLabel);
                });
              } else {
                node.isMatched = _this11.matchKeys.some(function(matchKey) {
                  return match(!_this11.disableFuzzyMatching, lowerCasedSearchQuery, node.lowerCased[matchKey]);
                });
              }
              if (node.isMatched) {
                _this11.localSearch.noResults = false;
                node.ancestors.forEach(function(ancestor) {
                  return _this11.localSearch.countMap[ancestor.id][ALL_DESCENDANTS]++;
                });
                if (node.isLeaf)
                  node.ancestors.forEach(function(ancestor) {
                    return _this11.localSearch.countMap[ancestor.id][LEAF_DESCENDANTS]++;
                  });
                if (node.parentNode !== NO_PARENT_NODE) {
                  _this11.localSearch.countMap[node.parentNode.id][ALL_CHILDREN] += 1;
                  if (node.isLeaf)
                    _this11.localSearch.countMap[node.parentNode.id][LEAF_CHILDREN] += 1;
                }
              }
              if ((node.isMatched || node.isBranch && node.isExpandedOnSearch) && node.parentNode !== NO_PARENT_NODE) {
                node.parentNode.isExpandedOnSearch = true;
                node.parentNode.hasMatchedDescendants = true;
              }
            });
            done();
          },
          handleRemoteSearch: function handleRemoteSearch() {
            var _this12 = this;
            var forced = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
            var searchQuery = this.trigger.searchQuery;
            var entry = this.getRemoteSearchEntry();
            var done = function done2() {
              _this12.initialize();
              _this12.resetHighlightedOptionWhenNecessary(true);
            };
            if ((searchQuery === "" || this.cacheOptions) && entry.isLoaded && !forced) {
              return done();
            }
            this.callLoadOptionsProp({
              action: ASYNC_SEARCH,
              args: {
                searchQuery
              },
              isPending: function isPending() {
                return entry.isLoading;
              },
              start: function start() {
                entry.isLoading = true;
                entry.isLoaded = false;
                entry.loadingError = "";
              },
              succeed: function succeed(options) {
                entry.isLoaded = true;
                entry.options = options;
                if (_this12.trigger.searchQuery === searchQuery)
                  done();
              },
              fail: function fail(err) {
                entry.loadingError = getErrorMessage(err);
              },
              end: function end() {
                entry.isLoading = false;
              }
            });
          },
          getRemoteSearchEntry: function getRemoteSearchEntry() {
            var _this13 = this;
            var searchQuery = this.trigger.searchQuery;
            var entry = this.remoteSearch[searchQuery] || _objectSpread(_objectSpread({}, createAsyncOptionsStates()), {}, {
              options: []
            });
            this.$watch(function() {
              return entry.options;
            }, function() {
              if (_this13.trigger.searchQuery === searchQuery)
                _this13.initialize();
            }, {
              deep: true
            });
            if (searchQuery === "") {
              if (Array.isArray(this.defaultOptions)) {
                entry.options = this.defaultOptions;
                entry.isLoaded = true;
                return entry;
              } else if (this.defaultOptions !== true) {
                entry.isLoaded = true;
                return entry;
              }
            }
            if (!this.remoteSearch[searchQuery]) {
              this.remoteSearch[searchQuery] = entry;
            }
            return entry;
          },
          shouldExpand: function shouldExpand(node) {
            return this.localSearch.active ? node.isExpandedOnSearch : node.isExpanded;
          },
          shouldOptionBeIncludedInSearchResult: function shouldOptionBeIncludedInSearchResult(node) {
            if (node.isMatched)
              return true;
            if (node.isBranch && node.hasMatchedDescendants && !this.flattenSearchResults)
              return true;
            if (!node.isRootNode && node.parentNode.showAllChildrenOnSearch)
              return true;
            return false;
          },
          shouldShowOptionInMenu: function shouldShowOptionInMenu(node) {
            if (this.localSearch.active && !this.shouldOptionBeIncludedInSearchResult(node)) {
              return false;
            }
            return true;
          },
          getControl: function getControl() {
            return this.$refs.control.$el;
          },
          getMenu: function getMenu() {
            var ref = this.appendToBody ? this.$refs.portal.portalTarget : this;
            var $menu = ref.$refs.menu.$refs.menu;
            return $menu && $menu.nodeName !== "#comment" ? $menu : null;
          },
          setCurrentHighlightedOption: function setCurrentHighlightedOption(node) {
            var _this14 = this;
            var scroll = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
            var prev = this.menu.current;
            if (prev != null && prev in this.forest.nodeMap) {
              this.forest.nodeMap[prev].isHighlighted = false;
            }
            this.menu.current = node.id;
            node.isHighlighted = true;
            if (this.menu.isOpen && scroll) {
              var scrollToOption = function scrollToOption2() {
                var $menu = _this14.getMenu();
                var $option = $menu.querySelector('.vue-treeselect__option[data-id="'.concat(node.id, '"]'));
                if ($option)
                  scrollIntoView($menu, $option);
              };
              if (this.getMenu()) {
                scrollToOption();
              } else {
                this.$nextTick(scrollToOption);
              }
            }
          },
          resetHighlightedOptionWhenNecessary: function resetHighlightedOptionWhenNecessary() {
            var forceReset = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
            var current = this.menu.current;
            if (forceReset || current == null || !(current in this.forest.nodeMap) || !this.shouldShowOptionInMenu(this.getNode(current))) {
              this.highlightFirstOption();
            }
          },
          highlightFirstOption: function highlightFirstOption() {
            if (!this.hasVisibleOptions)
              return;
            var first = this.visibleOptionIds[0];
            this.setCurrentHighlightedOption(this.getNode(first));
          },
          highlightPrevOption: function highlightPrevOption() {
            if (!this.hasVisibleOptions)
              return;
            var prev = this.visibleOptionIds.indexOf(this.menu.current) - 1;
            if (prev === -1)
              return this.highlightLastOption();
            this.setCurrentHighlightedOption(this.getNode(this.visibleOptionIds[prev]));
          },
          highlightNextOption: function highlightNextOption() {
            if (!this.hasVisibleOptions)
              return;
            var next = this.visibleOptionIds.indexOf(this.menu.current) + 1;
            if (next === this.visibleOptionIds.length)
              return this.highlightFirstOption();
            this.setCurrentHighlightedOption(this.getNode(this.visibleOptionIds[next]));
          },
          highlightLastOption: function highlightLastOption() {
            if (!this.hasVisibleOptions)
              return;
            var last = last_default()(this.visibleOptionIds);
            this.setCurrentHighlightedOption(this.getNode(last));
          },
          resetSearchQuery: function resetSearchQuery() {
            this.trigger.searchQuery = "";
          },
          closeMenu: function closeMenu() {
            if (!this.menu.isOpen || !this.disabled && this.alwaysOpen)
              return;
            this.saveMenuScrollPosition();
            this.menu.isOpen = false;
            this.toggleClickOutsideEvent(false);
            this.resetSearchQuery();
            this.$emit("close", this.getValue(), this.getInstanceId());
          },
          openMenu: function openMenu() {
            if (this.disabled || this.menu.isOpen)
              return;
            this.menu.isOpen = true;
            this.$nextTick(this.resetHighlightedOptionWhenNecessary);
            this.$nextTick(this.restoreMenuScrollPosition);
            if (!this.options && !this.async)
              this.loadRootOptions();
            this.toggleClickOutsideEvent(true);
            this.$emit("open", this.getInstanceId());
          },
          toggleMenu: function toggleMenu() {
            if (this.menu.isOpen) {
              this.closeMenu();
            } else {
              this.openMenu();
            }
          },
          toggleExpanded: function toggleExpanded(node) {
            var nextState;
            if (this.localSearch.active) {
              nextState = node.isExpandedOnSearch = !node.isExpandedOnSearch;
              if (nextState)
                node.showAllChildrenOnSearch = true;
            } else {
              nextState = node.isExpanded = !node.isExpanded;
            }
            if (nextState && !node.childrenStates.isLoaded) {
              this.loadChildrenOptions(node);
            }
          },
          buildForestState: function buildForestState() {
            var _this15 = this;
            var selectedNodeMap = createMap();
            this.forest.selectedNodeIds.forEach(function(selectedNodeId) {
              selectedNodeMap[selectedNodeId] = true;
            });
            this.forest.selectedNodeMap = selectedNodeMap;
            var checkedStateMap = createMap();
            if (this.multiple) {
              this.traverseAllNodesByIndex(function(node) {
                checkedStateMap[node.id] = UNCHECKED;
              });
              this.selectedNodes.forEach(function(selectedNode) {
                checkedStateMap[selectedNode.id] = CHECKED;
                if (!_this15.flat && !_this15.disableBranchNodes) {
                  selectedNode.ancestors.forEach(function(ancestorNode) {
                    if (!_this15.isSelected(ancestorNode)) {
                      checkedStateMap[ancestorNode.id] = INDETERMINATE;
                    }
                  });
                }
              });
            }
            this.forest.checkedStateMap = checkedStateMap;
          },
          enhancedNormalizer: function enhancedNormalizer(raw) {
            return _objectSpread(_objectSpread({}, raw), this.normalizer(raw, this.getInstanceId()));
          },
          normalize: function normalize(parentNode, nodes, prevNodeMap) {
            var _this16 = this;
            var normalizedOptions = nodes.map(function(node) {
              return [_this16.enhancedNormalizer(node), node];
            }).map(function(_ref, index2) {
              var _ref2 = _slicedToArray(_ref, 2), node = _ref2[0], raw = _ref2[1];
              _this16.checkDuplication(node);
              _this16.verifyNodeShape(node);
              var id = node.id, label = node.label, children = node.children, isDefaultExpanded = node.isDefaultExpanded;
              var isRootNode = parentNode === NO_PARENT_NODE;
              var level = isRootNode ? 0 : parentNode.level + 1;
              var isBranch = Array.isArray(children) || children === null;
              var isLeaf = !isBranch;
              var isDisabled = !!node.isDisabled || !_this16.flat && !isRootNode && parentNode.isDisabled;
              var isNew = !!node.isNew;
              var lowerCased = _this16.matchKeys.reduce(function(prev2, key) {
                return _objectSpread(_objectSpread({}, prev2), {}, _defineProperty({}, key, stringifyOptionPropValue(node[key]).toLocaleLowerCase()));
              }, {});
              var nestedSearchLabel = isRootNode ? lowerCased.label : parentNode.nestedSearchLabel + " " + lowerCased.label;
              _this16.forest.nodeMap[id] = createMap();
              var normalized = _this16.forest.nodeMap[id];
              normalized.id = id;
              normalized.label = label;
              normalized.level = level;
              normalized.ancestors = isRootNode ? [] : [parentNode].concat(parentNode.ancestors);
              normalized.index = (isRootNode ? [] : parentNode.index).concat(index2);
              normalized.parentNode = parentNode;
              normalized.lowerCased = lowerCased;
              normalized.nestedSearchLabel = nestedSearchLabel;
              normalized.isDisabled = isDisabled;
              normalized.isNew = isNew;
              normalized.isMatched = false;
              normalized.isHighlighted = false;
              normalized.isBranch = isBranch;
              normalized.isLeaf = isLeaf;
              normalized.isRootNode = isRootNode;
              normalized.raw = raw;
              if (isBranch) {
                var _normalized$count;
                var isLoaded = Array.isArray(children);
                normalized.childrenStates = _objectSpread(_objectSpread({}, createAsyncOptionsStates()), {}, {
                  isLoaded
                });
                normalized.isExpanded = typeof isDefaultExpanded === "boolean" ? isDefaultExpanded : level < _this16.defaultExpandLevel;
                normalized.hasMatchedDescendants = false;
                normalized.hasDisabledDescendants = false;
                normalized.isExpandedOnSearch = false;
                normalized.showAllChildrenOnSearch = false;
                normalized.count = (_normalized$count = {}, _defineProperty(_normalized$count, ALL_CHILDREN, 0), _defineProperty(_normalized$count, ALL_DESCENDANTS, 0), _defineProperty(_normalized$count, LEAF_CHILDREN, 0), _defineProperty(_normalized$count, LEAF_DESCENDANTS, 0), _normalized$count);
                normalized.children = isLoaded ? _this16.normalize(normalized, children, prevNodeMap) : [];
                if (isDefaultExpanded === true)
                  normalized.ancestors.forEach(function(ancestor) {
                    ancestor.isExpanded = true;
                  });
                if (!isLoaded && typeof _this16.loadOptions !== "function") {
                  warning(function() {
                    return false;
                  }, function() {
                    return 'Unloaded branch node detected. "loadOptions" prop is required to load its children.';
                  });
                } else if (!isLoaded && normalized.isExpanded) {
                  _this16.loadChildrenOptions(normalized);
                }
              }
              normalized.ancestors.forEach(function(ancestor) {
                return ancestor.count[ALL_DESCENDANTS]++;
              });
              if (isLeaf)
                normalized.ancestors.forEach(function(ancestor) {
                  return ancestor.count[LEAF_DESCENDANTS]++;
                });
              if (!isRootNode) {
                parentNode.count[ALL_CHILDREN] += 1;
                if (isLeaf)
                  parentNode.count[LEAF_CHILDREN] += 1;
                if (isDisabled)
                  parentNode.hasDisabledDescendants = true;
              }
              if (prevNodeMap && prevNodeMap[id]) {
                var prev = prevNodeMap[id];
                normalized.isMatched = prev.isMatched;
                normalized.showAllChildrenOnSearch = prev.showAllChildrenOnSearch;
                normalized.isHighlighted = prev.isHighlighted;
                if (prev.isBranch && normalized.isBranch) {
                  normalized.isExpanded = prev.isExpanded;
                  normalized.isExpandedOnSearch = prev.isExpandedOnSearch;
                  if (prev.childrenStates.isLoaded && !normalized.childrenStates.isLoaded) {
                    normalized.isExpanded = false;
                  } else {
                    normalized.childrenStates = _objectSpread({}, prev.childrenStates);
                  }
                }
              }
              return normalized;
            });
            if (this.branchNodesFirst) {
              var branchNodes = normalizedOptions.filter(function(option) {
                return option.isBranch;
              });
              var leafNodes = normalizedOptions.filter(function(option) {
                return option.isLeaf;
              });
              normalizedOptions = branchNodes.concat(leafNodes);
            }
            return normalizedOptions;
          },
          loadRootOptions: function loadRootOptions() {
            var _this17 = this;
            this.callLoadOptionsProp({
              action: LOAD_ROOT_OPTIONS,
              isPending: function isPending() {
                return _this17.rootOptionsStates.isLoading;
              },
              start: function start() {
                _this17.rootOptionsStates.isLoading = true;
                _this17.rootOptionsStates.loadingError = "";
              },
              succeed: function succeed() {
                _this17.rootOptionsStates.isLoaded = true;
                _this17.$nextTick(function() {
                  _this17.resetHighlightedOptionWhenNecessary(true);
                });
              },
              fail: function fail(err) {
                _this17.rootOptionsStates.loadingError = getErrorMessage(err);
              },
              end: function end() {
                _this17.rootOptionsStates.isLoading = false;
              }
            });
          },
          loadChildrenOptions: function loadChildrenOptions(parentNode) {
            var _this18 = this;
            var id = parentNode.id, raw = parentNode.raw;
            this.callLoadOptionsProp({
              action: LOAD_CHILDREN_OPTIONS,
              args: {
                // We always pass the raw node instead of the normalized node to any
                // callback provided by the user of this component.
                // Because the shape of the raw node is more likely to be closing to
                // what the back-end API service of the application needs.
                parentNode: raw
              },
              isPending: function isPending() {
                return _this18.getNode(id).childrenStates.isLoading;
              },
              start: function start() {
                _this18.getNode(id).childrenStates.isLoading = true;
                _this18.getNode(id).childrenStates.loadingError = "";
              },
              succeed: function succeed() {
                _this18.getNode(id).childrenStates.isLoaded = true;
              },
              fail: function fail(err) {
                _this18.getNode(id).childrenStates.loadingError = getErrorMessage(err);
              },
              end: function end() {
                _this18.getNode(id).childrenStates.isLoading = false;
              }
            });
          },
          callLoadOptionsProp: function callLoadOptionsProp(_ref3) {
            var action = _ref3.action, args = _ref3.args, isPending = _ref3.isPending, start = _ref3.start, succeed = _ref3.succeed, fail = _ref3.fail, end = _ref3.end;
            if (!this.loadOptions || isPending()) {
              return;
            }
            start();
            var callback = once_default()(function(err, result2) {
              if (err) {
                fail(err);
              } else {
                succeed(result2);
              }
              end();
            });
            var result = this.loadOptions(_objectSpread(_objectSpread({
              id: this.getInstanceId(),
              instanceId: this.getInstanceId(),
              action
            }, args), {}, {
              callback
            }));
            if (isPromise(result)) {
              result.then(function() {
                callback();
              }, function(err) {
                callback(err);
              }).catch(function(err) {
                console.error(err);
              });
            }
          },
          checkDuplication: function checkDuplication(node) {
            var _this19 = this;
            warning(function() {
              return !(node.id in _this19.forest.nodeMap && !_this19.forest.nodeMap[node.id].isFallbackNode);
            }, function() {
              return "Detected duplicate presence of node id ".concat(JSON.stringify(node.id), ". ") + 'Their labels are "'.concat(_this19.forest.nodeMap[node.id].label, '" and "').concat(node.label, '" respectively.');
            });
          },
          verifyNodeShape: function verifyNodeShape(node) {
            warning(function() {
              return !(node.children === void 0 && node.isBranch === true);
            }, function() {
              return "Are you meant to declare an unloaded branch node? `isBranch: true` is no longer supported, please use `children: null` instead.";
            });
          },
          select: function select(node) {
            if (this.disabled || node.isDisabled) {
              return;
            }
            if (this.single) {
              this.clear();
            }
            var nextState = this.multiple && !this.flat ? this.forest.checkedStateMap[node.id] === UNCHECKED : !this.isSelected(node);
            if (nextState) {
              this._selectNode(node);
            } else {
              this._deselectNode(node);
            }
            this.buildForestState();
            if (nextState) {
              this.$emit("select", node.raw, this.getInstanceId());
            } else {
              this.$emit("deselect", node.raw, this.getInstanceId());
            }
            if (this.localSearch.active && nextState && (this.single || this.clearOnSelect)) {
              this.resetSearchQuery();
            }
            if (this.single && this.closeOnSelect) {
              this.closeMenu();
              if (this.searchable) {
                this._blurOnSelect = true;
              }
            }
          },
          clear: function clear() {
            var _this20 = this;
            if (this.hasValue) {
              if (this.single || this.allowClearingDisabled) {
                this.forest.selectedNodeIds = [];
              } else {
                this.forest.selectedNodeIds = this.forest.selectedNodeIds.filter(function(nodeId) {
                  return _this20.getNode(nodeId).isDisabled;
                });
              }
              this.buildForestState();
            }
          },
          // This is meant to be called only by `select()`.
          _selectNode: function _selectNode(node) {
            var _this21 = this;
            if (this.single || this.disableBranchNodes) {
              return this.addValue(node);
            }
            if (this.flat) {
              this.addValue(node);
              if (this.autoSelectAncestors) {
                node.ancestors.forEach(function(ancestor) {
                  if (!_this21.isSelected(ancestor) && !ancestor.isDisabled)
                    _this21.addValue(ancestor);
                });
              } else if (this.autoSelectDescendants) {
                this.traverseDescendantsBFS(node, function(descendant) {
                  if (!_this21.isSelected(descendant) && !descendant.isDisabled)
                    _this21.addValue(descendant);
                });
              }
              return;
            }
            var isFullyChecked = node.isLeaf || /* node.isBranch && */
            !node.hasDisabledDescendants || /* node.isBranch && */
            this.allowSelectingDisabledDescendants;
            if (isFullyChecked) {
              this.addValue(node);
            }
            if (node.isBranch) {
              this.traverseDescendantsBFS(node, function(descendant) {
                if (!descendant.isDisabled || _this21.allowSelectingDisabledDescendants) {
                  _this21.addValue(descendant);
                }
              });
            }
            if (isFullyChecked) {
              var curr = node;
              while ((curr = curr.parentNode) !== NO_PARENT_NODE) {
                if (curr.children.every(this.isSelected))
                  this.addValue(curr);
                else
                  break;
              }
            }
          },
          // This is meant to be called only by `select()`.
          _deselectNode: function _deselectNode(node) {
            var _this22 = this;
            if (this.disableBranchNodes) {
              return this.removeValue(node);
            }
            if (this.flat) {
              this.removeValue(node);
              if (this.autoDeselectAncestors) {
                node.ancestors.forEach(function(ancestor) {
                  if (_this22.isSelected(ancestor) && !ancestor.isDisabled)
                    _this22.removeValue(ancestor);
                });
              } else if (this.autoDeselectDescendants) {
                this.traverseDescendantsBFS(node, function(descendant) {
                  if (_this22.isSelected(descendant) && !descendant.isDisabled)
                    _this22.removeValue(descendant);
                });
              }
              return;
            }
            var hasUncheckedSomeDescendants = false;
            if (node.isBranch) {
              this.traverseDescendantsDFS(node, function(descendant) {
                if (!descendant.isDisabled || _this22.allowSelectingDisabledDescendants) {
                  _this22.removeValue(descendant);
                  hasUncheckedSomeDescendants = true;
                }
              });
            }
            if (node.isLeaf || /* node.isBranch && */
            hasUncheckedSomeDescendants || /* node.isBranch && */
            node.children.length === 0) {
              this.removeValue(node);
              var curr = node;
              while ((curr = curr.parentNode) !== NO_PARENT_NODE) {
                if (this.isSelected(curr))
                  this.removeValue(curr);
                else
                  break;
              }
            }
          },
          addValue: function addValue(node) {
            this.forest.selectedNodeIds.push(node.id);
            this.forest.selectedNodeMap[node.id] = true;
          },
          removeValue: function removeValue(node) {
            removeFromArray(this.forest.selectedNodeIds, node.id);
            delete this.forest.selectedNodeMap[node.id];
          },
          removeLastValue: function removeLastValue() {
            if (!this.hasValue)
              return;
            if (this.single)
              return this.clear();
            var lastValue = last_default()(this.internalValue);
            var lastSelectedNode = this.getNode(lastValue);
            this.select(lastSelectedNode);
          },
          saveMenuScrollPosition: function saveMenuScrollPosition() {
            var $menu = this.getMenu();
            if ($menu)
              this.menu.lastScrollPosition = $menu.scrollTop;
          },
          restoreMenuScrollPosition: function restoreMenuScrollPosition() {
            var $menu = this.getMenu();
            if ($menu)
              $menu.scrollTop = this.menu.lastScrollPosition;
          }
        },
        created: function created() {
          this.verifyProps();
          this.resetFlags();
        },
        mounted: function mounted() {
          if (this.autoFocus)
            this.focusInput();
          if (!this.options && !this.async && this.autoLoadRootOptions)
            this.loadRootOptions();
          if (this.alwaysOpen)
            this.openMenu();
          if (this.async && this.defaultOptions)
            this.handleRemoteSearch();
        },
        unmounted: function unmounted() {
          this.toggleClickOutsideEvent(false);
        }
      };
      function stringifyValue(value) {
        if (typeof value === "string")
          return value;
        if (value != null && !isNaN_isNaN(value))
          return JSON.stringify(value);
        return "";
      }
      var HiddenFieldsvue_type_script_lang_js = (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.defineComponent)({
        name: "vue-treeselect--hidden-fields",
        inject: ["instance"],
        functional: true,
        render: function render2(context) {
          var instance = context.instance;
          if (!instance)
            return null;
          if (!("name" in instance))
            return null;
          if (!instance.name || instance.disabled || !instance.hasValue)
            return null;
          var stringifiedValues = instance.internalValue.map(stringifyValue);
          if (instance.multiple && instance.joinValues)
            stringifiedValues = [stringifiedValues.join(instance.delimiter)];
          return stringifiedValues.map(function(stringifiedValue, i) {
            return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("input", {
              "type": "hidden",
              "name": instance.name,
              "value": stringifiedValue,
              "key": "hidden-field-" + i
            }, null);
          });
        }
      });
      const __exports__ = HiddenFieldsvue_type_script_lang_js;
      var HiddenFields = __exports__;
      var debounce = __webpack_require__(279);
      var debounce_default = /* @__PURE__ */ __webpack_require__.n(debounce);
      function _typeof(obj) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
          return typeof obj2;
        } : function(obj2) {
          return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        }, _typeof(obj);
      }
      function isPlainObject(value) {
        if (value == null || _typeof(value) !== "object")
          return false;
        return Object.getPrototypeOf(value) === Object.prototype;
      }
      function copy(obj, key, value) {
        if (isPlainObject(value)) {
          obj[key] || (obj[key] = {});
          deepExtend(obj[key], value);
        } else {
          obj[key] = value;
        }
      }
      function deepExtend(target, source) {
        if (isPlainObject(source)) {
          var keys = Object.keys(source);
          for (var i = 0, len = keys.length; i < len; i++) {
            copy(target, keys[i], source[keys[i]]);
          }
        }
        return target;
      }
      var keysThatRequireMenuBeingOpen = [KEY_CODES.ENTER, KEY_CODES.END, KEY_CODES.HOME, KEY_CODES.ARROW_LEFT, KEY_CODES.ARROW_UP, KEY_CODES.ARROW_RIGHT, KEY_CODES.ARROW_DOWN];
      var Inputvue_type_script_lang_js = {
        name: "vue-treeselect--input",
        inject: ["instance"],
        data: function data() {
          return {
            inputWidth: MIN_INPUT_WIDTH,
            value: ""
          };
        },
        computed: {
          needAutoSize: function needAutoSize() {
            var instance = this.instance;
            return instance.searchable && !instance.disabled && instance.multiple;
          },
          inputStyle: function inputStyle() {
            return {
              width: this.needAutoSize ? "".concat(this.inputWidth, "px") : null
            };
          }
        },
        watch: {
          "instance.trigger.searchQuery": function instanceTriggerSearchQuery(newValue) {
            this.value = newValue;
          },
          value: function value() {
            if (this.needAutoSize)
              this.$nextTick(this.updateInputWidth);
          }
        },
        created: function created() {
          this.debouncedCallback = debounce_default()(this.updateSearchQuery, INPUT_DEBOUNCE_DELAY, {
            leading: true,
            trailing: true
          });
        },
        methods: {
          clear: function clear() {
            this.onInput({
              target: {
                value: ""
              }
            });
          },
          focus: function focus() {
            var instance = this.instance;
            if (!instance.disabled) {
              this.$refs.input && this.$refs.input.focus();
            }
          },
          blur: function blur() {
            this.$refs.input && this.$refs.input.blur();
          },
          onFocus: function onFocus() {
            var instance = this.instance;
            instance.trigger.isFocused = true;
            if (instance.openOnFocus)
              instance.openMenu();
          },
          onBlur: function onBlur() {
            var instance = this.instance;
            var menu = instance.getMenu();
            if (menu && document.activeElement === menu) {
              return this.focus();
            }
            instance.trigger.isFocused = false;
            instance.closeMenu();
          },
          onInput: function onInput(evt) {
            var value = evt.target.value;
            this.value = value;
            if (value) {
              this.debouncedCallback();
            } else {
              this.debouncedCallback.cancel();
              this.updateSearchQuery();
            }
          },
          // 用 keyUp 事件存在一个问题，删除输入框最后一个字符也会导致取消选中最后一项
          onKeyDown: function onKeyDown(evt) {
            var instance = this.instance;
            var key = "which" in evt ? evt.which : (
              /* istanbul ignore next */
              evt.keyCode
            );
            if (evt.ctrlKey || evt.shiftKey || evt.altKey || evt.metaKey)
              return;
            if (!instance.menu.isOpen && includes(keysThatRequireMenuBeingOpen, key)) {
              evt.preventDefault();
              return instance.openMenu();
            }
            switch (key) {
              case KEY_CODES.BACKSPACE: {
                if (instance.backspaceRemoves && !this.value.length) {
                  instance.removeLastValue();
                }
                break;
              }
              case KEY_CODES.ENTER: {
                evt.preventDefault();
                if (instance.menu.current === null)
                  return;
                var current = instance.getNode(instance.menu.current);
                if (current.isBranch && instance.disableBranchNodes)
                  return;
                instance.select(current);
                break;
              }
              case KEY_CODES.ESCAPE: {
                if (this.value.length) {
                  this.clear();
                } else if (instance.menu.isOpen) {
                  instance.closeMenu();
                }
                break;
              }
              case KEY_CODES.END: {
                evt.preventDefault();
                instance.highlightLastOption();
                break;
              }
              case KEY_CODES.HOME: {
                evt.preventDefault();
                instance.highlightFirstOption();
                break;
              }
              case KEY_CODES.ARROW_LEFT: {
                var _current = instance.getNode(instance.menu.current);
                if (_current.isBranch && instance.shouldExpand(_current)) {
                  evt.preventDefault();
                  instance.toggleExpanded(_current);
                } else if (!_current.isRootNode && (_current.isLeaf || _current.isBranch && !instance.shouldExpand(_current))) {
                  evt.preventDefault();
                  instance.setCurrentHighlightedOption(_current.parentNode);
                }
                break;
              }
              case KEY_CODES.ARROW_UP: {
                evt.preventDefault();
                instance.highlightPrevOption();
                break;
              }
              case KEY_CODES.ARROW_RIGHT: {
                var _current2 = instance.getNode(instance.menu.current);
                if (_current2.isBranch && !instance.shouldExpand(_current2)) {
                  evt.preventDefault();
                  instance.toggleExpanded(_current2);
                }
                break;
              }
              case KEY_CODES.ARROW_DOWN: {
                evt.preventDefault();
                instance.highlightNextOption();
                break;
              }
              case KEY_CODES.DELETE: {
                if (instance.deleteRemoves && !this.value.length) {
                  instance.removeLastValue();
                }
                break;
              }
              default: {
                instance.openMenu();
              }
            }
          },
          onMouseDown: function onMouseDown(evt) {
            if (this.value.length) {
              evt.stopPropagation();
            }
          },
          renderInputContainer: function renderInputContainer() {
            var instance = this.instance;
            var props = {};
            var children = [];
            if (instance.searchable && !instance.disabled) {
              children.push(this.renderInput());
              if (this.needAutoSize)
                children.push(this.renderSizer());
            }
            if (!instance.searchable) {
              deepExtend(props, {
                on: {
                  focus: this.onFocus,
                  blur: this.onBlur,
                  keydown: this.onKeyDown
                },
                ref: "input"
              });
            }
            if (!instance.searchable && !instance.disabled) {
              deepExtend(props, {
                attrs: {
                  tabIndex: instance.tabIndex
                }
              });
            }
            return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.mergeProps)({
              "class": "vue-treeselect__input-container"
            }, props), [children]);
          },
          renderInput: function renderInput() {
            var instance = this.instance;
            return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("input", {
              "ref": "input",
              "class": "vue-treeselect__input",
              "type": "text",
              "autocomplete": "off",
              "tabIndex": instance.tabIndex,
              "required": instance.required && !instance.hasValue,
              "value": this.value,
              "style": this.inputStyle,
              "onFocus": this.onFocus,
              "onInput": this.onInput,
              "onBlur": this.onBlur,
              "onKeydown": this.onKeyDown,
              "onMousedown": this.onMouseDown
            }, null);
          },
          renderSizer: function renderSizer() {
            return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
              "ref": "sizer",
              "class": "vue-treeselect__sizer"
            }, [this.value]);
          },
          updateInputWidth: function updateInputWidth() {
            this.inputWidth = Math.max(MIN_INPUT_WIDTH, this.$refs.sizer.scrollWidth + 15);
          },
          updateSearchQuery: function updateSearchQuery() {
            var instance = this.instance;
            instance.trigger.searchQuery = this.value;
          }
        },
        render: function render2() {
          return this.renderInputContainer();
        }
      };
      const Input_exports_ = Inputvue_type_script_lang_js;
      var Input = Input_exports_;
      var Placeholdervue_type_script_lang_js = {
        name: "vue-treeselect--placeholder",
        inject: ["instance"],
        render: function render2() {
          var instance = this.instance;
          var placeholderClass = {
            "vue-treeselect__placeholder": true,
            "vue-treeselect-helper-zoom-effect-off": true,
            "vue-treeselect-helper-hide": instance.hasValue || instance.trigger.searchQuery
          };
          return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
            "class": placeholderClass
          }, [instance.placeholder]);
        }
      };
      const Placeholder_exports_ = Placeholdervue_type_script_lang_js;
      var Placeholder = Placeholder_exports_;
      var SingleValuevue_type_script_lang_js = {
        name: "vue-treeselect--single-value",
        inject: ["instance"],
        methods: {
          renderSingleValueLabel: function renderSingleValueLabel() {
            var instance = this.instance;
            var node = instance.selectedNodes[0];
            var customValueLabelRenderer = instance.$slots["valueLabel"];
            return customValueLabelRenderer ? customValueLabelRenderer({
              node
            }) : node.label;
          }
        },
        render: function render2() {
          var instance = this.instance, renderValueContainer = this.$parent.renderValueContainer;
          var shouldShowValue = instance.hasValue && !instance.trigger.searchQuery;
          return renderValueContainer([shouldShowValue && (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
            "class": "vue-treeselect__single-value"
          }, [this.renderSingleValueLabel()]), (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(Placeholder, null, null), (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(Input, {
            "ref": "input"
          }, null)]);
        }
      };
      const SingleValue_exports_ = SingleValuevue_type_script_lang_js;
      var SingleValue = SingleValue_exports_;
      var _hoisted_1 = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 348.333 348.333"
      };
      var _hoisted_2 = /* @__PURE__ */ (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("path", {
        d: "M336.559 68.611L231.016 174.165l105.543 105.549c15.699 15.705 15.699 41.145 0 56.85-7.844 7.844-18.128 11.769-28.407 11.769-10.296 0-20.581-3.919-28.419-11.769L174.167 231.003 68.609 336.563c-7.843 7.844-18.128 11.769-28.416 11.769-10.285 0-20.563-3.919-28.413-11.769-15.699-15.698-15.699-41.139 0-56.85l105.54-105.549L11.774 68.611c-15.699-15.699-15.699-41.145 0-56.844 15.696-15.687 41.127-15.687 56.829 0l105.563 105.554L279.721 11.767c15.705-15.687 41.139-15.687 56.832 0 15.705 15.699 15.705 41.145.006 56.844z"
      }, null, -1);
      var _hoisted_3 = [_hoisted_2];
      function Deletevue_type_template_id_12b4a02e_render(_ctx, _cache, $props, $setup, $data, $options) {
        return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("svg", _hoisted_1, _hoisted_3);
      }
      var Deletevue_type_script_lang_js = {
        name: "vue-treeselect--x"
      };
      var exportHelper = __webpack_require__(744);
      const Delete_exports_ = /* @__PURE__ */ (0, exportHelper.Z)(Deletevue_type_script_lang_js, [["render", Deletevue_type_template_id_12b4a02e_render]]);
      var Delete = Delete_exports_;
      var MultiValueItemvue_type_script_lang_js = {
        name: "vue-treeselect--multi-value-item",
        inject: ["instance"],
        props: {
          node: {
            type: Object,
            required: true
          }
        },
        methods: {
          handleMouseDown: onLeftClick(function handleMouseDown() {
            var instance = this.instance, node = this.node;
            instance.select(node);
          })
        },
        render: function render2() {
          var instance = this.instance, node = this.node;
          var itemClass = {
            "vue-treeselect__multi-value-item": true,
            "vue-treeselect__multi-value-item-disabled": node.isDisabled,
            "vue-treeselect__multi-value-item-new": node.isNew
          };
          var customValueLabelRenderer = instance.$slots["valueLabel"];
          var labelRenderer = customValueLabelRenderer ? customValueLabelRenderer({
            node
          }) : node.label;
          return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
            "class": "vue-treeselect__multi-value-item-container"
          }, [(0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
            "class": itemClass,
            "onMousedown": this.handleMouseDown
          }, [(0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("span", {
            "class": "vue-treeselect__multi-value-label"
          }, [labelRenderer]), (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("span", {
            "class": "vue-treeselect__icon vue-treeselect__value-remove"
          }, [(0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(Delete, null, null)])])]);
        }
      };
      const MultiValueItem_exports_ = MultiValueItemvue_type_script_lang_js;
      var MultiValueItem = MultiValueItem_exports_;
      var MultiValuevue_type_script_lang_js = {
        name: "vue-treeselect--multi-value",
        inject: ["instance"],
        methods: {
          renderMultiValueItems: function renderMultiValueItems() {
            var instance = this.instance;
            return instance.internalValue.slice(0, instance.limit).map(instance.getNode).map(function(node) {
              return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(MultiValueItem, {
                "key": "multi-value-item-".concat(node.id),
                "node": node
              }, null);
            });
          },
          renderExceedLimitTip: function renderExceedLimitTip() {
            var instance = this.instance;
            var count = instance.internalValue.length - instance.limit;
            if (count <= 0)
              return null;
            return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
              "class": "vue-treeselect__limit-tip vue-treeselect-helper-zoom-effect-off",
              "key": "exceed-limit-tip"
            }, [(0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("span", {
              "class": "vue-treeselect__limit-tip-text"
            }, [instance.limitText(count)])]);
          }
        },
        render: function render2() {
          var renderValueContainer = this.$parent.renderValueContainer;
          return renderValueContainer((0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
            "class": "vue-treeselect__multi-value",
            "name": "vue-treeselect__multi-value-item--transition"
          }, [this.renderMultiValueItems(), this.renderExceedLimitTip(), (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(Placeholder, {
            "key": "placeholder"
          }, null), (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(Input, {
            "ref": "input",
            "key": "input"
          }, null)]));
        }
      };
      const MultiValue_exports_ = MultiValuevue_type_script_lang_js;
      var MultiValue = MultiValue_exports_;
      var Arrowvue_type_template_id_5d5151cb_hoisted_1 = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 292.362 292.362"
      };
      var Arrowvue_type_template_id_5d5151cb_hoisted_2 = /* @__PURE__ */ (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("path", {
        d: "M286.935 69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952 0-9.233 1.807-12.85 5.424C1.807 72.998 0 77.279 0 82.228c0 4.948 1.807 9.229 5.424 12.847l127.907 127.907c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428L286.935 95.074c3.613-3.617 5.427-7.898 5.427-12.847 0-4.948-1.814-9.229-5.427-12.85z"
      }, null, -1);
      var Arrowvue_type_template_id_5d5151cb_hoisted_3 = [Arrowvue_type_template_id_5d5151cb_hoisted_2];
      function Arrowvue_type_template_id_5d5151cb_render(_ctx, _cache, $props, $setup, $data, $options) {
        return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("svg", Arrowvue_type_template_id_5d5151cb_hoisted_1, Arrowvue_type_template_id_5d5151cb_hoisted_3);
      }
      var Arrowvue_type_script_lang_js = {
        name: "vue-treeselect--arrow"
      };
      const Arrow_exports_ = /* @__PURE__ */ (0, exportHelper.Z)(Arrowvue_type_script_lang_js, [["render", Arrowvue_type_template_id_5d5151cb_render]]);
      var Arrow = Arrow_exports_;
      var Controlvue_type_script_lang_js = {
        name: "vue-treeselect--control",
        inject: ["instance"],
        computed: {
          /* eslint-disable valid-jsdoc */
          /**
           * Should show the "×" button that resets value?
           * @return {boolean}
           */
          shouldShowX: function shouldShowX() {
            var instance = this.instance;
            return instance.clearable && !instance.disabled && instance.hasValue && (this.hasUndisabledValue || instance.allowClearingDisabled);
          },
          /**
           * Should show the arrow button that toggles menu?
           * @return {boolean}
           */
          shouldShowArrow: function shouldShowArrow() {
            var instance = this.instance;
            if (!instance.alwaysOpen)
              return true;
            return !instance.menu.isOpen;
          },
          /**
           * Has any undisabled option been selected?
           * @type {boolean}
           */
          hasUndisabledValue: function hasUndisabledValue() {
            var instance = this.instance;
            return instance.hasValue && instance.internalValue.some(function(id) {
              return !instance.getNode(id).isDisabled;
            });
          }
          /* eslint-enable valid-jsdoc */
        },
        methods: {
          renderX: function renderX() {
            var instance = this.instance;
            var title = instance.multiple ? instance.clearAllText : instance.clearValueText;
            if (!this.shouldShowX)
              return null;
            return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
              "class": "vue-treeselect__x-container",
              "title": title,
              "onMousedown": this.handleMouseDownOnX
            }, [(0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(Delete, {
              "class": "vue-treeselect__x"
            }, null)]);
          },
          renderArrow: function renderArrow() {
            var instance = this.instance;
            var arrowClass = {
              "vue-treeselect__control-arrow": true,
              "vue-treeselect__control-arrow--rotated": instance.menu.isOpen
            };
            if (!this.shouldShowArrow)
              return null;
            return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
              "class": "vue-treeselect__control-arrow-container",
              "onMousedown": this.handleMouseDownOnArrow
            }, [(0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(Arrow, {
              "class": arrowClass
            }, null)]);
          },
          handleMouseDownOnX: onLeftClick(function handleMouseDownOnX(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            var instance = this.instance;
            var result = instance.beforeClearAll();
            var handler = function handler2(shouldClear) {
              if (shouldClear)
                instance.clear();
            };
            if (isPromise(result)) {
              result.then(handler);
            } else {
              setTimeout(function() {
                return handler(result);
              }, 0);
            }
          }),
          handleMouseDownOnArrow: onLeftClick(function handleMouseDownOnArrow(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            var instance = this.instance;
            instance.focusInput();
            instance.toggleMenu();
          }),
          // This is meant to be called by child `<Value />` component.
          renderValueContainer: function renderValueContainer(children) {
            return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
              "class": "vue-treeselect__value-container"
            }, [children]);
          }
        },
        render: function render2() {
          var instance = this.instance;
          var ValueContainer = instance.single ? SingleValue : MultiValue;
          return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
            "class": "vue-treeselect__control",
            "onMousedown": instance.handleMouseDown
          }, [(0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(ValueContainer, {
            "ref": "value-container"
          }, null), this.renderX(), this.renderArrow()]);
        }
      };
      const Control_exports_ = Controlvue_type_script_lang_js;
      var Control = Control_exports_;
      var index = function(element, listener) {
        var expand = document.createElement("_");
        var shrink = expand.appendChild(document.createElement("_"));
        var expandChild = expand.appendChild(document.createElement("_"));
        var shrinkChild = shrink.appendChild(document.createElement("_"));
        var lastWidth = void 0, lastHeight = void 0;
        shrink.style.cssText = expand.style.cssText = "height:100%;left:0;opacity:0;overflow:hidden;pointer-events:none;position:absolute;top:0;transition:0s;width:100%;z-index:-1";
        shrinkChild.style.cssText = expandChild.style.cssText = "display:block;height:100%;transition:0s;width:100%";
        shrinkChild.style.width = shrinkChild.style.height = "200%";
        element.appendChild(expand);
        test2();
        return stop2;
        function test2() {
          unbind();
          var width = element.offsetWidth;
          var height = element.offsetHeight;
          if (width !== lastWidth || height !== lastHeight) {
            lastWidth = width;
            lastHeight = height;
            expandChild.style.width = width * 2 + "px";
            expandChild.style.height = height * 2 + "px";
            expand.scrollLeft = expand.scrollWidth;
            expand.scrollTop = expand.scrollHeight;
            shrink.scrollLeft = shrink.scrollWidth;
            shrink.scrollTop = shrink.scrollHeight;
            listener({ width, height });
          }
          shrink.addEventListener("scroll", test2);
          expand.addEventListener("scroll", test2);
        }
        function unbind() {
          shrink.removeEventListener("scroll", test2);
          expand.removeEventListener("scroll", test2);
        }
        function stop2() {
          unbind();
          element.removeChild(expand);
        }
      };
      var index_es = index;
      var intervalId;
      var registered = [];
      var INTERVAL_DURATION = 100;
      function run() {
        intervalId = setInterval(function() {
          registered.forEach(test);
        }, INTERVAL_DURATION);
      }
      function stop() {
        clearInterval(intervalId);
        intervalId = null;
      }
      function test(item) {
        var $el = item.$el, listener = item.listener, lastWidth = item.lastWidth, lastHeight = item.lastHeight;
        var width = $el.offsetWidth;
        var height = $el.offsetHeight;
        if (lastWidth !== width || lastHeight !== height) {
          item.lastWidth = width;
          item.lastHeight = height;
          listener({
            width,
            height
          });
        }
      }
      function watchSizeForIE9($el, listener) {
        var item = {
          $el,
          listener,
          lastWidth: null,
          lastHeight: null
        };
        var unwatch = function unwatch2() {
          removeFromArray(registered, item);
          if (!registered.length)
            stop();
        };
        registered.push(item);
        test(item);
        run();
        return unwatch;
      }
      function watchSize($el, listener) {
        var isIE9 = document.documentMode === 9;
        var locked = true;
        var wrappedListener = function wrappedListener2() {
          return locked || listener.apply(void 0, arguments);
        };
        var implementation = isIE9 ? watchSizeForIE9 : index_es;
        var removeSizeWatcher = implementation($el, wrappedListener);
        locked = false;
        return removeSizeWatcher;
      }
      function findScrollParents($el) {
        var $scrollParents = [];
        var $parent = $el.parentNode;
        while ($parent && $parent.nodeName !== "BODY" && $parent.nodeType === document.ELEMENT_NODE) {
          if (isScrollElment($parent))
            $scrollParents.push($parent);
          $parent = $parent.parentNode;
        }
        $scrollParents.push(window);
        return $scrollParents;
      }
      function isScrollElment($el) {
        var _getComputedStyle = getComputedStyle($el), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
        return /(auto|scroll|overlay)/.test(overflow + overflowY + overflowX);
      }
      function setupResizeAndScrollEventListeners($el, listener) {
        var $scrollParents = findScrollParents($el);
        window.addEventListener("resize", listener, {
          passive: true
        });
        $scrollParents.forEach(function(scrollParent) {
          scrollParent.addEventListener("scroll", listener, {
            passive: true
          });
        });
        return function removeEventListeners() {
          window.removeEventListener("resize", listener, {
            passive: true
          });
          $scrollParents.forEach(function($scrollParent) {
            $scrollParent.removeEventListener("scroll", listener, {
              passive: true
            });
          });
        };
      }
      var Tipvue_type_script_lang_js = (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.defineComponent)({
        name: "vue-treeselect--tip",
        functional: true,
        props: {
          type: {
            type: String,
            required: true
          },
          icon: {
            type: String,
            required: true
          }
        },
        render: function render2(context) {
          var type = this.type, icon = this.icon;
          return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
            "class": "vue-treeselect__tip vue-treeselect__".concat(type, "-tip")
          }, [(0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
            "class": "vue-treeselect__icon-container"
          }, [(0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("span", {
            "class": "vue-treeselect__icon-".concat(icon)
          }, null)]), (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("span", {
            "class": "vue-treeselect__tip-text vue-treeselect__".concat(type, "-tip-text")
          }, [this.$slots.default()])]);
        }
      });
      const Tip_exports_ = Tipvue_type_script_lang_js;
      var Tip = Tip_exports_;
      function Optionvue_type_script_lang_js_defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
        } else {
          obj[key] = value;
        }
        return obj;
      }
      var arrowPlaceholder, checkMark, minusMark;
      var Option = {
        name: "vue-treeselect--option",
        inject: ["instance"],
        props: {
          node: {
            type: Object,
            required: true
          }
        },
        computed: {
          shouldExpand: function shouldExpand() {
            var instance = this.instance, node = this.node;
            return node.isBranch && instance.shouldExpand(node);
          },
          shouldShow: function shouldShow() {
            var instance = this.instance, node = this.node;
            return instance.shouldShowOptionInMenu(node);
          }
        },
        methods: {
          renderOption: function renderOption() {
            var instance = this.instance, node = this.node;
            var optionClass = {
              "vue-treeselect__option": true,
              "vue-treeselect__option--disabled": node.isDisabled,
              "vue-treeselect__option--selected": instance.isSelected(node),
              "vue-treeselect__option--highlight": node.isHighlighted,
              "vue-treeselect__option--matched": instance.localSearch.active && node.isMatched,
              "vue-treeselect__option--hide": !this.shouldShow
            };
            var sepClass = {
              "vue-treeselect__option": true,
              "vue-treeselect__sep": true
            };
            if (node.isBranch) {
              optionClass["vue-treeselect__option_isBranch"] = true;
              if (this.shouldExpand) {
                optionClass["vue-treeselect__option_expanded"] = true;
              }
            }
            var customSepRenderer = instance.$slots["sepLabel"];
            if (node.id === "sep") {
              if (customSepRenderer) {
                return customSepRenderer({
                  node
                });
              } else {
                return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
                  "class": sepClass
                }, [(0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)(" "), node.label, (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)(" ")]);
              }
            } else {
              return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
                "class": optionClass,
                "onMouseenter": this.handleMouseEnterOption,
                "data-id": node.id
              }, [this.renderArrow(), this.renderLabelContainer([this.renderCheckboxContainer([this.renderCheckbox()]), this.renderLabel()], node.raw.nextSep)]);
            }
          },
          renderSubOptionsList: function renderSubOptionsList() {
            if (!this.shouldExpand)
              return null;
            return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
              "class": "vue-treeselect__list"
            }, [this.renderSubOptions(), this.renderNoChildrenTip(), this.renderLoadingChildrenTip(), this.renderLoadingChildrenErrorTip()]);
          },
          renderArrow: function renderArrow() {
            var instance = this.instance, node = this.node;
            if (instance.shouldFlattenOptions && this.shouldShow)
              return null;
            if (node.isBranch) {
              var arrowClass = {
                "vue-treeselect__option-arrow": true,
                "vue-treeselect__option-arrow--rotated": this.shouldExpand
              };
              return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
                "class": "vue-treeselect__option-arrow-container",
                "onMousedown": this.handleMouseDownOnArrow
              }, [(0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
                "name": "vue-treeselect__option-arrow--prepare"
              }, [(0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(Arrow, {
                "class": arrowClass
              }, null)])]);
            }
            if (
              /*node.isLeaf && */
              instance.hasBranchNodes
            ) {
              if (!arrowPlaceholder)
                arrowPlaceholder = (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
                  "class": "vue-treeselect__option-arrow-placeholder"
                }, [(0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)(" ")]);
              return arrowPlaceholder;
            }
            return null;
          },
          renderLabelContainer: function renderLabelContainer(children) {
            var nextSep = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
            var myclass = {
              "vue-treeselect__label-container": true
            };
            if (nextSep) {
              myclass["nextSep"] = true;
            }
            return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
              "class": myclass,
              "onMousedown": this.handleMouseDownOnLabelContainer
            }, [children]);
          },
          renderCheckboxContainer: function renderCheckboxContainer(children) {
            var instance = this.instance, node = this.node;
            if (instance.single)
              return null;
            if (instance.disableBranchNodes && node.isBranch)
              return null;
            return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
              "class": "vue-treeselect__checkbox-container"
            }, [children]);
          },
          renderCheckbox: function renderCheckbox() {
            var instance = this.instance, node = this.node;
            var checkedState = instance.forest.checkedStateMap[node.id];
            var checkboxClass = {
              "vue-treeselect__checkbox": true,
              "vue-treeselect__checkbox--checked": checkedState === CHECKED,
              "vue-treeselect__checkbox--indeterminate": checkedState === INDETERMINATE,
              "vue-treeselect__checkbox--unchecked": checkedState === UNCHECKED,
              "vue-treeselect__checkbox--disabled": node.isDisabled
            };
            if (!checkMark)
              checkMark = (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("span", {
                "class": "vue-treeselect__check-mark"
              }, null);
            if (!minusMark)
              minusMark = (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("span", {
                "class": "vue-treeselect__minus-mark"
              }, null);
            return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("span", {
              "class": checkboxClass
            }, [checkMark, minusMark]);
          },
          renderLabel: function renderLabel() {
            var instance = this.instance, node = this.node;
            var shouldShowCount = node.isBranch && (instance.localSearch.active ? instance.showCountOnSearchComputed : instance.showCount);
            var count = shouldShowCount ? instance.localSearch.active ? instance.localSearch.countMap[node.id][instance.showCountOf] : node.count[instance.showCountOf] : NaN;
            var labelClassName = "vue-treeselect__label";
            var countClassName = "vue-treeselect__count";
            var customLabelRenderer = instance.$slots["optionLabel"];
            if (customLabelRenderer)
              return customLabelRenderer({
                node,
                shouldShowCount,
                count,
                labelClassName,
                countClassName
              });
            return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("label", {
              "class": labelClassName
            }, [node.label, shouldShowCount && (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("span", {
              "class": countClassName
            }, [(0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("("), count, (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)(") ")])]);
          },
          renderSubOptions: function renderSubOptions() {
            var node = this.node;
            if (!node.childrenStates.isLoaded)
              return null;
            return node.children.map(function(childNode) {
              return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)((0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("vue-treeselect--option"), {
                "node": childNode,
                "key": childNode.id
              }, null);
            });
          },
          renderNoChildrenTip: function renderNoChildrenTip() {
            var instance = this.instance, node = this.node;
            if (!node.childrenStates.isLoaded || node.children.length)
              return null;
            return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(Tip, {
              "type": "no-children",
              "icon": "warning"
            }, {
              default: function _default() {
                return [instance.noChildrenText];
              }
            });
          },
          renderLoadingChildrenTip: function renderLoadingChildrenTip() {
            var instance = this.instance, node = this.node;
            if (!node.childrenStates.isLoading)
              return null;
            return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(Tip, {
              "type": "loading",
              "icon": "loader"
            }, {
              default: function _default() {
                return [instance.loadingText];
              }
            });
          },
          renderLoadingChildrenErrorTip: function renderLoadingChildrenErrorTip() {
            var _this = this;
            var instance = this.instance, node = this.node;
            if (!node.childrenStates.loadingError)
              return null;
            return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(Tip, {
              "type": "error",
              "icon": "error"
            }, {
              default: function _default() {
                return [node.childrenStates.loadingError, (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("a", {
                  "class": "vue-treeselect__retry",
                  "title": instance.retryTitle,
                  "onMousedown": _this.handleMouseDownOnRetry
                }, [instance.retryText])];
              }
            });
          },
          handleMouseEnterOption: function handleMouseEnterOption(evt) {
            var instance = this.instance, node = this.node;
            if (evt.target !== evt.currentTarget)
              return;
            instance.setCurrentHighlightedOption(node, false);
          },
          handleMouseDownOnArrow: onLeftClick(function handleMouseDownOnOptionArrow() {
            var instance = this.instance, node = this.node;
            instance.toggleExpanded(node);
          }),
          handleMouseDownOnLabelContainer: onLeftClick(function handleMouseDownOnLabelContainer() {
            var instance = this.instance, node = this.node;
            if (node.isBranch && instance.disableBranchNodes) {
              instance.toggleExpanded(node);
            } else {
              instance.select(node);
            }
          }),
          handleMouseDownOnRetry: onLeftClick(function handleMouseDownOnRetry() {
            var instance = this.instance, node = this.node;
            instance.loadChildrenOptions(node);
          })
        },
        render: function render2() {
          var _listItemClass;
          var node = this.node;
          var indentLevel = this.instance.shouldFlattenOptions ? 0 : node.level;
          var listItemClass = (_listItemClass = {
            "vue-treeselect__list-item": true
          }, Optionvue_type_script_lang_js_defineProperty(_listItemClass, "vue-treeselect__indent-level-".concat(indentLevel), true), Optionvue_type_script_lang_js_defineProperty(_listItemClass, "vue-treeselect__option--hide", !this.shouldShow), _listItemClass);
          return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
            "class": listItemClass
          }, [this.renderOption(), node.isBranch ? (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", null, [this.renderSubOptionsList()]) : ""]);
        }
      };
      var Optionvue_type_script_lang_js = Option;
      const Option_exports_ = Optionvue_type_script_lang_js;
      var components_Option = Option_exports_;
      function Menuvue_type_script_lang_js_slicedToArray(arr, i) {
        return Menuvue_type_script_lang_js_arrayWithHoles(arr) || Menuvue_type_script_lang_js_iterableToArrayLimit(arr, i) || Menuvue_type_script_lang_js_unsupportedIterableToArray(arr, i) || Menuvue_type_script_lang_js_nonIterableRest();
      }
      function Menuvue_type_script_lang_js_nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function Menuvue_type_script_lang_js_unsupportedIterableToArray(o, minLen) {
        if (!o)
          return;
        if (typeof o === "string")
          return Menuvue_type_script_lang_js_arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor)
          n = o.constructor.name;
        if (n === "Map" || n === "Set")
          return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
          return Menuvue_type_script_lang_js_arrayLikeToArray(o, minLen);
      }
      function Menuvue_type_script_lang_js_arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length)
          len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) {
          arr2[i] = arr[i];
        }
        return arr2;
      }
      function Menuvue_type_script_lang_js_iterableToArrayLimit(arr, i) {
        var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
        if (_i == null)
          return;
        var _arr = [];
        var _n = true;
        var _d = false;
        var _s, _e;
        try {
          for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i)
              break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"] != null)
              _i["return"]();
          } finally {
            if (_d)
              throw _e;
          }
        }
        return _arr;
      }
      function Menuvue_type_script_lang_js_arrayWithHoles(arr) {
        if (Array.isArray(arr))
          return arr;
      }
      var directionMap = {
        top: "top",
        bottom: "bottom",
        above: "top",
        below: "bottom"
      };
      var Menuvue_type_script_lang_js = {
        name: "vue-treeselect--menu",
        inject: ["instance"],
        computed: {
          menuStyle: function menuStyle() {
            var instance = this.instance;
            return {
              maxHeight: instance.maxHeight + "px"
            };
          },
          menuContainerStyle: function menuContainerStyle() {
            var instance = this.instance;
            var style = {
              zIndex: instance.appendToBody ? null : instance.zIndex
              // width: '800px',
            };
            if (instance.menuContainerStyle) {
              var keyValuePairs = instance.menuContainerStyle.split("; ");
              keyValuePairs.forEach(function(keyValuePair) {
                var _keyValuePair$split = keyValuePair.split(":"), _keyValuePair$split2 = Menuvue_type_script_lang_js_slicedToArray(_keyValuePair$split, 2), key = _keyValuePair$split2[0], value = _keyValuePair$split2[1];
                style[key.trim()] = value.trim();
              });
            }
            return style;
          }
        },
        watch: {
          "instance.menu.isOpen": function instanceMenuIsOpen(newValue) {
            if (newValue) {
              this.$nextTick(this.onMenuOpen);
            } else {
              this.onMenuClose();
            }
          }
        },
        created: function created() {
          this.menuSizeWatcher = null;
          this.menuResizeAndScrollEventListeners = null;
        },
        mounted: function mounted() {
          var instance = this.instance;
          if (instance.menu.isOpen)
            this.$nextTick(this.onMenuOpen);
        },
        unmounted: function unmounted() {
          this.onMenuClose();
        },
        methods: {
          renderMenu: function renderMenu() {
            var instance = this.instance;
            if (!instance.menu.isOpen)
              return null;
            return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
              "ref": "menu",
              "class": "vue-treeselect__menu",
              "onMousedown": instance.handleMouseDown,
              "style": this.menuStyle
            }, [this.renderBeforeList(), instance.async ? this.renderAsyncSearchMenuInner() : instance.localSearch.active ? this.renderLocalSearchMenuInner() : this.renderNormalMenuInner(), this.renderAfterList()]);
          },
          renderBeforeList: function renderBeforeList() {
            var instance = this.instance;
            var beforeListRenderer = instance.$slots["before-list"];
            return beforeListRenderer ? beforeListRenderer() : null;
          },
          renderAfterList: function renderAfterList() {
            var instance = this.instance;
            var afterListRenderer = instance.$slots["after-list"];
            return afterListRenderer ? afterListRenderer() : null;
          },
          renderNormalMenuInner: function renderNormalMenuInner() {
            var instance = this.instance;
            if (instance.rootOptionsStates.isLoading) {
              return this.renderLoadingOptionsTip();
            } else if (instance.rootOptionsStates.loadingError) {
              return this.renderLoadingRootOptionsErrorTip();
            } else if (instance.rootOptionsStates.isLoaded && instance.forest.normalizedOptions.length === 0) {
              return this.renderNoAvailableOptionsTip();
            } else {
              return this.renderOptionList();
            }
          },
          renderLocalSearchMenuInner: function renderLocalSearchMenuInner() {
            var instance = this.instance;
            if (instance.rootOptionsStates.isLoading) {
              return this.renderLoadingOptionsTip();
            } else if (instance.rootOptionsStates.loadingError) {
              return this.renderLoadingRootOptionsErrorTip();
            } else if (instance.rootOptionsStates.isLoaded && instance.forest.normalizedOptions.length === 0) {
              return this.renderNoAvailableOptionsTip();
            } else if (instance.localSearch.noResults) {
              return this.renderNoResultsTip();
            } else {
              return this.renderOptionList();
            }
          },
          renderAsyncSearchMenuInner: function renderAsyncSearchMenuInner() {
            var instance = this.instance;
            var entry = instance.getRemoteSearchEntry();
            var shouldShowSearchPromptTip = instance.trigger.searchQuery === "" && !instance.defaultOptions;
            var shouldShowNoResultsTip = shouldShowSearchPromptTip ? false : entry.isLoaded && entry.options.length === 0;
            if (shouldShowSearchPromptTip) {
              return this.renderSearchPromptTip();
            } else if (entry.isLoading) {
              return this.renderLoadingOptionsTip();
            } else if (entry.loadingError) {
              return this.renderAsyncSearchLoadingErrorTip();
            } else if (shouldShowNoResultsTip) {
              return this.renderNoResultsTip();
            } else {
              return this.renderOptionList();
            }
          },
          renderOptionList: function renderOptionList() {
            var instance = this.instance;
            return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
              "class": "vue-treeselect__list"
            }, [instance.forest.normalizedOptions.map(function(rootNode) {
              return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(components_Option, {
                "node": rootNode,
                "key": rootNode.id
              }, null);
            })]);
          },
          renderSearchPromptTip: function renderSearchPromptTip() {
            var instance = this.instance;
            return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(Tip, {
              "type": "search-prompt",
              "icon": "warning"
            }, {
              default: function _default() {
                return [instance.searchPromptText];
              }
            });
          },
          renderLoadingOptionsTip: function renderLoadingOptionsTip() {
            var instance = this.instance;
            return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(Tip, {
              "type": "loading",
              "icon": "loader"
            }, {
              default: function _default() {
                return [instance.loadingText];
              }
            });
          },
          renderLoadingRootOptionsErrorTip: function renderLoadingRootOptionsErrorTip() {
            var instance = this.instance;
            return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(Tip, {
              "type": "error",
              "icon": "error"
            }, {
              default: function _default() {
                return [instance.rootOptionsStates.loadingError, (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("a", {
                  "class": "vue-treeselect__retry",
                  "onClick": instance.loadRootOptions,
                  "title": instance.retryTitle
                }, [instance.retryText])];
              }
            });
          },
          renderAsyncSearchLoadingErrorTip: function renderAsyncSearchLoadingErrorTip() {
            var instance = this.instance;
            var entry = instance.getRemoteSearchEntry();
            return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(Tip, {
              "type": "error",
              "icon": "error"
            }, {
              default: function _default() {
                return [entry.loadingError, (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("a", {
                  "class": "vue-treeselect__retry",
                  "onClick": instance.handleRemoteSearch,
                  "title": instance.retryTitle
                }, [instance.retryText])];
              }
            });
          },
          renderNoAvailableOptionsTip: function renderNoAvailableOptionsTip() {
            var instance = this.instance;
            return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(Tip, {
              "type": "no-options",
              "icon": "warning"
            }, {
              default: function _default() {
                return [instance.noOptionsText];
              }
            });
          },
          renderNoResultsTip: function renderNoResultsTip() {
            var instance = this.instance;
            return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(Tip, {
              "type": "no-results",
              "icon": "warning"
            }, {
              default: function _default() {
                return [instance.noResultsText];
              }
            });
          },
          onMenuOpen: function onMenuOpen() {
            this.adjustMenuOpenDirection();
            this.setupMenuSizeWatcher();
            this.setupMenuResizeAndScrollEventListeners();
          },
          onMenuClose: function onMenuClose() {
            this.removeMenuSizeWatcher();
            this.removeMenuResizeAndScrollEventListeners();
          },
          adjustMenuOpenDirection: function adjustMenuOpenDirection() {
            var instance = this.instance;
            if (!instance.menu.isOpen)
              return;
            var $menu = instance.getMenu();
            var $control = instance.getControl();
            var menuRect = $menu.getBoundingClientRect();
            var controlRect = $control.getBoundingClientRect();
            var menuHeight = menuRect.height;
            var viewportHeight = window.innerHeight;
            var spaceAbove = controlRect.top;
            var spaceBelow = window.innerHeight - controlRect.bottom;
            var isControlInViewport = controlRect.top >= 0 && controlRect.top <= viewportHeight || controlRect.top < 0 && controlRect.bottom > 0;
            var hasEnoughSpaceBelow = spaceBelow > menuHeight + MENU_BUFFER;
            var hasEnoughSpaceAbove = spaceAbove > menuHeight + MENU_BUFFER;
            if (!isControlInViewport) {
              instance.closeMenu();
            } else if (instance.openDirection !== "auto") {
              instance.menu.placement = directionMap[instance.openDirection];
            } else if (hasEnoughSpaceBelow || !hasEnoughSpaceAbove) {
              instance.menu.placement = "bottom";
            } else {
              instance.menu.placement = "top";
            }
          },
          setupMenuSizeWatcher: function setupMenuSizeWatcher() {
            var instance = this.instance;
            var $menu = instance.getMenu();
            if (this.menuSizeWatcher)
              return;
            this.menuSizeWatcher = {
              remove: watchSize($menu, this.adjustMenuOpenDirection)
            };
          },
          setupMenuResizeAndScrollEventListeners: function setupMenuResizeAndScrollEventListeners() {
            var instance = this.instance;
            var $control = instance.getControl();
            if (this.menuResizeAndScrollEventListeners)
              return;
            this.menuResizeAndScrollEventListeners = {
              remove: setupResizeAndScrollEventListeners($control, this.adjustMenuOpenDirection)
            };
          },
          removeMenuSizeWatcher: function removeMenuSizeWatcher() {
            if (!this.menuSizeWatcher)
              return;
            this.menuSizeWatcher.remove();
            this.menuSizeWatcher = null;
          },
          removeMenuResizeAndScrollEventListeners: function removeMenuResizeAndScrollEventListeners() {
            if (!this.menuResizeAndScrollEventListeners)
              return;
            this.menuResizeAndScrollEventListeners.remove();
            this.menuResizeAndScrollEventListeners = null;
          }
        },
        render: function render2() {
          return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
            "ref": "menu-container",
            "class": "vue-treeselect__menu-container",
            "style": this.menuContainerStyle
          }, [(0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
            "name": "vue-treeselect__menu--transition"
          }, [this.renderMenu()])]);
        }
      };
      const Menu_exports_ = Menuvue_type_script_lang_js;
      var Menu = Menu_exports_;
      function MenuPortalvue_type_script_lang_js_ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object);
          enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          })), keys.push.apply(keys, symbols);
        }
        return keys;
      }
      function MenuPortalvue_type_script_lang_js_objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = null != arguments[i] ? arguments[i] : {};
          i % 2 ? MenuPortalvue_type_script_lang_js_ownKeys(Object(source), true).forEach(function(key) {
            MenuPortalvue_type_script_lang_js_defineProperty(target, key, source[key]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : MenuPortalvue_type_script_lang_js_ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
        return target;
      }
      function MenuPortalvue_type_script_lang_js_defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
        } else {
          obj[key] = value;
        }
        return obj;
      }
      var PortalTarget = {
        name: "vue-treeselect--portal-target",
        inject: ["instance"],
        watch: {
          "instance.menu.isOpen": function instanceMenuIsOpen(newValue) {
            if (newValue) {
              this.setupHandlers();
            } else {
              this.removeHandlers();
            }
          },
          "instance.menu.placement": function instanceMenuPlacement() {
            this.updateMenuContainerOffset();
          }
        },
        created: function created() {
          this.controlResizeAndScrollEventListeners = null;
          this.controlSizeWatcher = null;
        },
        mounted: function mounted() {
          var instance = this.instance;
          if (instance.menu.isOpen)
            this.setupHandlers();
        },
        methods: {
          setupHandlers: function setupHandlers() {
            this.updateWidth();
            this.updateMenuContainerOffset();
            this.setupControlResizeAndScrollEventListeners();
            this.setupControlSizeWatcher();
          },
          removeHandlers: function removeHandlers() {
            this.removeControlResizeAndScrollEventListeners();
            this.removeControlSizeWatcher();
          },
          setupControlResizeAndScrollEventListeners: function setupControlResizeAndScrollEventListeners() {
            var instance = this.instance;
            var $control = instance.getControl();
            if (this.controlResizeAndScrollEventListeners)
              return;
            this.controlResizeAndScrollEventListeners = {
              remove: setupResizeAndScrollEventListeners($control, this.updateMenuContainerOffset)
            };
          },
          setupControlSizeWatcher: function setupControlSizeWatcher() {
            var _this = this;
            var instance = this.instance;
            var $control = instance.getControl();
            if (this.controlSizeWatcher)
              return;
            this.controlSizeWatcher = {
              remove: watchSize($control, function() {
                _this.updateWidth();
                _this.updateMenuContainerOffset();
              })
            };
          },
          removeControlResizeAndScrollEventListeners: function removeControlResizeAndScrollEventListeners() {
            if (!this.controlResizeAndScrollEventListeners)
              return;
            this.controlResizeAndScrollEventListeners.remove();
            this.controlResizeAndScrollEventListeners = null;
          },
          removeControlSizeWatcher: function removeControlSizeWatcher() {
            if (!this.controlSizeWatcher)
              return;
            this.controlSizeWatcher.remove();
            this.controlSizeWatcher = null;
          },
          updateWidth: function updateWidth() {
            var instance = this.instance;
            var $portalTarget = this.$el;
            var $control = instance.getControl();
            var controlRect = $control.getBoundingClientRect();
            $portalTarget.style.width = controlRect.width + "px";
          },
          updateMenuContainerOffset: function updateMenuContainerOffset() {
            var instance = this.instance;
            var $control = instance.getControl();
            var $portalTarget = this.$el;
            var controlRect = $control.getBoundingClientRect();
            var portalTargetRect = $portalTarget.getBoundingClientRect();
            var offsetY = instance.menu.placement === "bottom" ? controlRect.height : 0;
            var left = Math.round(controlRect.left - portalTargetRect.left) + "px";
            var top = Math.round(controlRect.top - portalTargetRect.top + offsetY) + "px";
            var menuContainerStyle = this.$refs.menu.$refs["menu-container"].style;
            var transformVariations = ["transform", "webkitTransform", "MozTransform", "msTransform"];
            var transform = find(transformVariations, function(t) {
              return t in document.body.style;
            });
            menuContainerStyle[transform] = "translate(".concat(left, ", ").concat(top, ")");
          }
        },
        render: function render2() {
          var instance = this.instance;
          var portalTargetClass = ["vue-treeselect__portal-target", instance.wrapperClass];
          var portalTargetStyle = {
            zIndex: instance.zIndex
          };
          return (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
            "class": portalTargetClass,
            "style": portalTargetStyle,
            "data-instance-id": instance.getInstanceId()
          }, [(0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(Menu, {
            "ref": "menu"
          }, null)]);
        },
        unmounted: function unmounted() {
          this.removeHandlers();
        }
      };
      var placeholder;
      var MenuPortalvue_type_script_lang_js = {
        name: "vue-treeselect--menu-portal",
        created: function created() {
          this.portalTarget = null;
        },
        mounted: function mounted() {
          this.setup();
        },
        unmounted: function unmounted() {
          this.teardown();
        },
        methods: {
          setup: function setup() {
            var el = document.createElement("div");
            document.body.appendChild(el);
            this.portalTarget = (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createApp)(MenuPortalvue_type_script_lang_js_objectSpread({
              parent: this
            }, PortalTarget));
            this.portalTarget.mount(el);
          },
          teardown: function teardown() {
            document.body.removeChild(this.portalTarget.$el);
            this.portalTarget.$el.innerHTML = "";
            this.portalTarget.$destroy();
            this.portalTarget = null;
          }
        },
        render: function render2() {
          if (!placeholder)
            placeholder = (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
              "class": "vue-treeselect__menu-placeholder"
            }, null);
          return placeholder;
        }
      };
      const MenuPortal_exports_ = MenuPortalvue_type_script_lang_js;
      var MenuPortal = MenuPortal_exports_;
      var Treeselectvue_type_script_lang_js = (0, external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.defineComponent)({
        name: "vue-treeselect",
        mixins: [treeselectMixin],
        components: {
          HiddenFields,
          Control,
          Menu,
          MenuPortal
        },
        computed: {
          wrapperClass: function wrapperClass() {
            return {
              "vue-treeselect": true,
              "vue-treeselect--single": this.single,
              "vue-treeselect--multi": this.multiple,
              "vue-treeselect--searchable": this.searchable,
              "vue-treeselect--disabled": this.disabled,
              "vue-treeselect--focused": this.trigger.isFocused,
              "vue-treeselect--has-value": this.hasValue,
              "vue-treeselect--open": this.menu.isOpen,
              "vue-treeselect--open-above": this.menu.placement === "top",
              "vue-treeselect--open-below": this.menu.placement === "bottom",
              "vue-treeselect--branch-nodes-disabled": this.disableBranchNodes,
              "vue-treeselect--append-to-body": this.appendToBody
            };
          }
        }
        // render() {
        //   return (
        //     <div ref="wrapper" class={this.wrapperClass}>
        //       <HiddenFields />
        //       <Control ref="control" />
        //       {this.appendToBody ? <MenuPortal ref="portal" /> : <Menu ref="menu" />}
        //     </div>
        //   )
        // },
      });
      const Treeselect_exports_ = /* @__PURE__ */ (0, exportHelper.Z)(Treeselectvue_type_script_lang_js, [["render", render]]);
      var Treeselect2 = Treeselect_exports_;
      var src_0 = Treeselect2;
      var entry_lib = src_0;
    }();
    module.exports = __webpack_exports__;
  })();
})(vue3Treeselect_common);
var vue3Treeselect_commonExports = vue3Treeselect_common.exports;
const Treeselect = /* @__PURE__ */ getDefaultExportFromCjs(vue3Treeselect_commonExports);
const vue3Treeselect = "";
const _sfc_main = {
  name: "resource-fieldtype",
  mixins: [FieldMixin],
  components: { Treeselect },
  data() {
    return {
      matrix: {},
      form: false,
      loading: false,
      entries: null
    };
  },
  computed: {
    endpoint() {
      return `/datatable/antfusion/resource/${this.field.settings.resource}`;
    }
    // entry() {
    //     if (this.matrix.name) {
    //         return this.matrix.name.toLowerCase()
    //     } else {
    //         return 'entries'
    //     }
    // },
    // singular() {
    //     return pluralize.singular(this.entry)
    // }
  },
  methods: {
    getQueryParameters(params) {
      if (params.search !== "") {
        params["filter[search]"] = params.search;
      }
      return queryString.stringify(params);
    },
    itemMap(item) {
      return {
        id: item.id,
        label: item.name
      };
    },
    asyncFind({ action, searchQuery, callback }) {
      console.log(action);
      if (action === "ASYNC_SEARCH") {
        this.getRecords({ search: searchQuery }).then((response) => {
          console.log(response.data.records.data);
          callback(null, response.data.records.data.map(this.itemMap));
        });
      }
    },
    submit() {
    },
    // resetForm() {
    //     this.form = new Form({
    //         name: '',
    //         slug: '',
    //         status: 1,
    //     })
    // },
    getRecords(params) {
      this.loading = true;
      return axios.get(`${this.endpoint}?${this.getQueryParameters(params)}`).then((response) => {
        this.loading = false;
        return response;
      });
    }
    // fetchMatrix() {
    //     axios.get(`/api/matrices/${this.field.settings.matrix}?entries=1`).then((response) => {
    //         this.matrix = response.data.data
    //     })
    // }
  },
  mounted() {
    this.model = _.map(this.value, "id") || [];
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_treeselect = resolveComponent("treeselect");
  const _component_ui_field_group = resolveComponent("ui-field-group");
  return openBlock(), createElementBlock("div", null, [
    createVNode(_component_ui_field_group, {
      label: _ctx.field.name,
      fieldId: `${_ctx.field.handle}-field`,
      name: _ctx.field.handle,
      inline: false,
      help: _ctx.field.help,
      required: _ctx.field.required,
      "has-error": _ctx.hasError(_ctx.field.handle),
      "error-message": _ctx.errorMessage(_ctx.field.handle)
    }, {
      default: withCtx(() => [
        createVNode(_component_treeselect, {
          async: true,
          "load-options": $options.asyncFind,
          modelValue: _ctx.model,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.model = $event),
          multiple: _ctx.field.settings.multiple
        }, null, 8, ["load-options", "modelValue", "multiple"])
      ], void 0, true),
      _: 1
    }, 8, ["label", "fieldId", "name", "help", "required", "has-error", "error-message"])
  ]);
}
const Field = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Field as default
};
