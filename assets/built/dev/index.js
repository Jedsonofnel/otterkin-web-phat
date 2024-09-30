(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // assets/js/vendored/htmx.cjs
  var require_htmx = __commonJS({
    "assets/js/vendored/htmx.cjs"(exports, module) {
      var htmx = function() {
        "use strict";
        const htmx = {
          // Tsc madness here, assigning the functions directly results in an invalid TypeScript output, but reassigning is fine
          /* Event processing */
          /** @type {typeof onLoadHelper} */
          onLoad: null,
          /** @type {typeof processNode} */
          process: null,
          /** @type {typeof addEventListenerImpl} */
          on: null,
          /** @type {typeof removeEventListenerImpl} */
          off: null,
          /** @type {typeof triggerEvent} */
          trigger: null,
          /** @type {typeof ajaxHelper} */
          ajax: null,
          /* DOM querying helpers */
          /** @type {typeof find} */
          find: null,
          /** @type {typeof findAll} */
          findAll: null,
          /** @type {typeof closest} */
          closest: null,
          /**
           * Returns the input values that would resolve for a given element via the htmx value resolution mechanism
           *
           * @see https://htmx.org/api/#values
           *
           * @param {Element} elt the element to resolve values on
           * @param {HttpVerb} type the request type (e.g. **get** or **post**) non-GET's will include the enclosing form of the element. Defaults to **post**
           * @returns {Object}
           */
          values: function(elt, type) {
            const inputValues = getInputValues(elt, type || "post");
            return inputValues.values;
          },
          /* DOM manipulation helpers */
          /** @type {typeof removeElement} */
          remove: null,
          /** @type {typeof addClassToElement} */
          addClass: null,
          /** @type {typeof removeClassFromElement} */
          removeClass: null,
          /** @type {typeof toggleClassOnElement} */
          toggleClass: null,
          /** @type {typeof takeClassForElement} */
          takeClass: null,
          /** @type {typeof swap} */
          swap: null,
          /* Extension entrypoints */
          /** @type {typeof defineExtension} */
          defineExtension: null,
          /** @type {typeof removeExtension} */
          removeExtension: null,
          /* Debugging */
          /** @type {typeof logAll} */
          logAll: null,
          /** @type {typeof logNone} */
          logNone: null,
          /* Debugging */
          /**
           * The logger htmx uses to log with
           *
           * @see https://htmx.org/api/#logger
           */
          logger: null,
          /**
           * A property holding the configuration htmx uses at runtime.
           *
           * Note that using a [meta tag](https://htmx.org/docs/#config) is the preferred mechanism for setting these properties.
           *
           * @see https://htmx.org/api/#config
           */
          config: {
            /**
             * Whether to use history.
             * @type boolean
             * @default true
             */
            historyEnabled: true,
            /**
             * The number of pages to keep in **localStorage** for history support.
             * @type number
             * @default 10
             */
            historyCacheSize: 10,
            /**
             * @type boolean
             * @default false
             */
            refreshOnHistoryMiss: false,
            /**
             * The default swap style to use if **[hx-swap](https://htmx.org/attributes/hx-swap)** is omitted.
             * @type HtmxSwapStyle
             * @default 'innerHTML'
             */
            defaultSwapStyle: "innerHTML",
            /**
             * The default delay between receiving a response from the server and doing the swap.
             * @type number
             * @default 0
             */
            defaultSwapDelay: 0,
            /**
             * The default delay between completing the content swap and settling attributes.
             * @type number
             * @default 20
             */
            defaultSettleDelay: 20,
            /**
             * If true, htmx will inject a small amount of CSS into the page to make indicators invisible unless the **htmx-indicator** class is present.
             * @type boolean
             * @default true
             */
            includeIndicatorStyles: true,
            /**
             * The class to place on indicators when a request is in flight.
             * @type string
             * @default 'htmx-indicator'
             */
            indicatorClass: "htmx-indicator",
            /**
             * The class to place on triggering elements when a request is in flight.
             * @type string
             * @default 'htmx-request'
             */
            requestClass: "htmx-request",
            /**
             * The class to temporarily place on elements that htmx has added to the DOM.
             * @type string
             * @default 'htmx-added'
             */
            addedClass: "htmx-added",
            /**
             * The class to place on target elements when htmx is in the settling phase.
             * @type string
             * @default 'htmx-settling'
             */
            settlingClass: "htmx-settling",
            /**
             * The class to place on target elements when htmx is in the swapping phase.
             * @type string
             * @default 'htmx-swapping'
             */
            swappingClass: "htmx-swapping",
            /**
             * Allows the use of eval-like functionality in htmx, to enable **hx-vars**, trigger conditions & script tag evaluation. Can be set to **false** for CSP compatibility.
             * @type boolean
             * @default true
             */
            allowEval: true,
            /**
             * If set to false, disables the interpretation of script tags.
             * @type boolean
             * @default true
             */
            allowScriptTags: true,
            /**
             * If set, the nonce will be added to inline scripts.
             * @type string
             * @default ''
             */
            inlineScriptNonce: "",
            /**
             * If set, the nonce will be added to inline styles.
             * @type string
             * @default ''
             */
            inlineStyleNonce: "",
            /**
             * The attributes to settle during the settling phase.
             * @type string[]
             * @default ['class', 'style', 'width', 'height']
             */
            attributesToSettle: ["class", "style", "width", "height"],
            /**
             * Allow cross-site Access-Control requests using credentials such as cookies, authorization headers or TLS client certificates.
             * @type boolean
             * @default false
             */
            withCredentials: false,
            /**
             * @type number
             * @default 0
             */
            timeout: 0,
            /**
             * The default implementation of **getWebSocketReconnectDelay** for reconnecting after unexpected connection loss by the event code **Abnormal Closure**, **Service Restart** or **Try Again Later**.
             * @type {'full-jitter' | ((retryCount:number) => number)}
             * @default "full-jitter"
             */
            wsReconnectDelay: "full-jitter",
            /**
             * The type of binary data being received over the WebSocket connection
             * @type BinaryType
             * @default 'blob'
             */
            wsBinaryType: "blob",
            /**
             * @type string
             * @default '[hx-disable], [data-hx-disable]'
             */
            disableSelector: "[hx-disable], [data-hx-disable]",
            /**
             * @type {'auto' | 'instant' | 'smooth'}
             * @default 'instant'
             */
            scrollBehavior: "instant",
            /**
             * If the focused element should be scrolled into view.
             * @type boolean
             * @default false
             */
            defaultFocusScroll: false,
            /**
             * If set to true htmx will include a cache-busting parameter in GET requests to avoid caching partial responses by the browser
             * @type boolean
             * @default false
             */
            getCacheBusterParam: false,
            /**
             * If set to true, htmx will use the View Transition API when swapping in new content.
             * @type boolean
             * @default false
             */
            globalViewTransitions: false,
            /**
             * htmx will format requests with these methods by encoding their parameters in the URL, not the request body
             * @type {(HttpVerb)[]}
             * @default ['get', 'delete']
             */
            methodsThatUseUrlParams: ["get", "delete"],
            /**
             * If set to true, disables htmx-based requests to non-origin hosts.
             * @type boolean
             * @default false
             */
            selfRequestsOnly: true,
            /**
             * If set to true htmx will not update the title of the document when a title tag is found in new content
             * @type boolean
             * @default false
             */
            ignoreTitle: false,
            /**
             * Whether the target of a boosted element is scrolled into the viewport.
             * @type boolean
             * @default true
             */
            scrollIntoViewOnBoost: true,
            /**
             * The cache to store evaluated trigger specifications into.
             * You may define a simple object to use a never-clearing cache, or implement your own system using a [proxy object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
             * @type {Object|null}
             * @default null
             */
            triggerSpecsCache: null,
            /** @type boolean */
            disableInheritance: false,
            /** @type HtmxResponseHandlingConfig[] */
            responseHandling: [
              { code: "204", swap: false },
              { code: "[23]..", swap: true },
              { code: "[45]..", swap: false, error: true }
            ],
            /**
             * Whether to process OOB swaps on elements that are nested within the main response element.
             * @type boolean
             * @default true
             */
            allowNestedOobSwaps: true
          },
          /** @type {typeof parseInterval} */
          parseInterval: null,
          /** @type {typeof internalEval} */
          _: null,
          version: "2.0.2"
        };
        htmx.onLoad = onLoadHelper;
        htmx.process = processNode;
        htmx.on = addEventListenerImpl;
        htmx.off = removeEventListenerImpl;
        htmx.trigger = triggerEvent;
        htmx.ajax = ajaxHelper;
        htmx.find = find;
        htmx.findAll = findAll;
        htmx.closest = closest;
        htmx.remove = removeElement;
        htmx.addClass = addClassToElement;
        htmx.removeClass = removeClassFromElement;
        htmx.toggleClass = toggleClassOnElement;
        htmx.takeClass = takeClassForElement;
        htmx.swap = swap;
        htmx.defineExtension = defineExtension;
        htmx.removeExtension = removeExtension;
        htmx.logAll = logAll;
        htmx.logNone = logNone;
        htmx.parseInterval = parseInterval;
        htmx._ = internalEval;
        const internalAPI = {
          addTriggerHandler,
          bodyContains,
          canAccessLocalStorage,
          findThisElement,
          filterValues,
          swap,
          hasAttribute,
          getAttributeValue,
          getClosestAttributeValue,
          getClosestMatch,
          getExpressionVars,
          getHeaders,
          getInputValues,
          getInternalData,
          getSwapSpecification,
          getTriggerSpecs,
          getTarget,
          makeFragment,
          mergeObjects,
          makeSettleInfo,
          oobSwap,
          querySelectorExt,
          settleImmediately,
          shouldCancel,
          triggerEvent,
          triggerErrorEvent,
          withExtensions
        };
        const VERBS = ["get", "post", "put", "delete", "patch"];
        const VERB_SELECTOR = VERBS.map(function(verb) {
          return "[hx-" + verb + "], [data-hx-" + verb + "]";
        }).join(", ");
        const HEAD_TAG_REGEX = makeTagRegEx("head");
        function makeTagRegEx(tag, global = false) {
          return new RegExp(
            `<${tag}(\\s[^>]*>|>)([\\s\\S]*?)<\\/${tag}>`,
            global ? "gim" : "im"
          );
        }
        function parseInterval(str2) {
          if (str2 == void 0) {
            return void 0;
          }
          let interval = NaN;
          if (str2.slice(-2) == "ms") {
            interval = parseFloat(str2.slice(0, -2));
          } else if (str2.slice(-1) == "s") {
            interval = parseFloat(str2.slice(0, -1)) * 1e3;
          } else if (str2.slice(-1) == "m") {
            interval = parseFloat(str2.slice(0, -1)) * 1e3 * 60;
          } else {
            interval = parseFloat(str2);
          }
          return isNaN(interval) ? void 0 : interval;
        }
        function getRawAttribute(elt, name) {
          return elt instanceof Element && elt.getAttribute(name);
        }
        function hasAttribute(elt, qualifiedName) {
          return !!elt.hasAttribute && (elt.hasAttribute(qualifiedName) || elt.hasAttribute("data-" + qualifiedName));
        }
        function getAttributeValue(elt, qualifiedName) {
          return getRawAttribute(elt, qualifiedName) || getRawAttribute(elt, "data-" + qualifiedName);
        }
        function parentElt(elt) {
          const parent = elt.parentElement;
          if (!parent && elt.parentNode instanceof ShadowRoot) return elt.parentNode;
          return parent;
        }
        function getDocument() {
          return document;
        }
        function getRootNode(elt, global) {
          return elt.getRootNode ? elt.getRootNode({ composed: global }) : getDocument();
        }
        function getClosestMatch(elt, condition) {
          while (elt && !condition(elt)) {
            elt = parentElt(elt);
          }
          return elt || null;
        }
        function getAttributeValueWithDisinheritance(initialElement, ancestor, attributeName) {
          const attributeValue = getAttributeValue(ancestor, attributeName);
          const disinherit = getAttributeValue(ancestor, "hx-disinherit");
          var inherit = getAttributeValue(ancestor, "hx-inherit");
          if (initialElement !== ancestor) {
            if (htmx.config.disableInheritance) {
              if (inherit && (inherit === "*" || inherit.split(" ").indexOf(attributeName) >= 0)) {
                return attributeValue;
              } else {
                return null;
              }
            }
            if (disinherit && (disinherit === "*" || disinherit.split(" ").indexOf(attributeName) >= 0)) {
              return "unset";
            }
          }
          return attributeValue;
        }
        function getClosestAttributeValue(elt, attributeName) {
          let closestAttr = null;
          getClosestMatch(elt, function(e) {
            return !!(closestAttr = getAttributeValueWithDisinheritance(
              elt,
              asElement(e),
              attributeName
            ));
          });
          if (closestAttr !== "unset") {
            return closestAttr;
          }
        }
        function matches(elt, selector) {
          const matchesFunction = elt instanceof Element && (elt.matches || elt.matchesSelector || elt.msMatchesSelector || elt.mozMatchesSelector || elt.webkitMatchesSelector || elt.oMatchesSelector);
          return !!matchesFunction && matchesFunction.call(elt, selector);
        }
        function getStartTag(str2) {
          const tagMatcher = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
          const match = tagMatcher.exec(str2);
          if (match) {
            return match[1].toLowerCase();
          } else {
            return "";
          }
        }
        function parseHTML(resp) {
          const parser = new DOMParser();
          return parser.parseFromString(resp, "text/html");
        }
        function takeChildrenFor(fragment, elt) {
          while (elt.childNodes.length > 0) {
            fragment.append(elt.childNodes[0]);
          }
        }
        function duplicateScript(script) {
          const newScript = getDocument().createElement("script");
          forEach(script.attributes, function(attr) {
            newScript.setAttribute(attr.name, attr.value);
          });
          newScript.textContent = script.textContent;
          newScript.async = false;
          if (htmx.config.inlineScriptNonce) {
            newScript.nonce = htmx.config.inlineScriptNonce;
          }
          return newScript;
        }
        function isJavaScriptScriptNode(script) {
          return script.matches("script") && (script.type === "text/javascript" || script.type === "module" || script.type === "");
        }
        function normalizeScriptTags(fragment) {
          Array.from(fragment.querySelectorAll("script")).forEach(
            /** @param {HTMLScriptElement} script */
            (script) => {
              if (isJavaScriptScriptNode(script)) {
                const newScript = duplicateScript(script);
                const parent = script.parentNode;
                try {
                  parent.insertBefore(newScript, script);
                } catch (e) {
                  logError(e);
                } finally {
                  script.remove();
                }
              }
            }
          );
        }
        function makeFragment(response) {
          const responseWithNoHead = response.replace(HEAD_TAG_REGEX, "");
          const startTag = getStartTag(responseWithNoHead);
          let fragment;
          if (startTag === "html") {
            fragment = /** @type DocumentFragmentWithTitle */
            new DocumentFragment();
            const doc = parseHTML(response);
            takeChildrenFor(fragment, doc.body);
            fragment.title = doc.title;
          } else if (startTag === "body") {
            fragment = /** @type DocumentFragmentWithTitle */
            new DocumentFragment();
            const doc = parseHTML(responseWithNoHead);
            takeChildrenFor(fragment, doc.body);
            fragment.title = doc.title;
          } else {
            const doc = parseHTML(
              '<body><template class="internal-htmx-wrapper">' + responseWithNoHead + "</template></body>"
            );
            fragment = /** @type DocumentFragmentWithTitle */
            doc.querySelector("template").content;
            fragment.title = doc.title;
            var titleElement = fragment.querySelector("title");
            if (titleElement && titleElement.parentNode === fragment) {
              titleElement.remove();
              fragment.title = titleElement.innerText;
            }
          }
          if (fragment) {
            if (htmx.config.allowScriptTags) {
              normalizeScriptTags(fragment);
            } else {
              fragment.querySelectorAll("script").forEach((script) => script.remove());
            }
          }
          return fragment;
        }
        function maybeCall(func) {
          if (func) {
            func();
          }
        }
        function isType(o, type) {
          return Object.prototype.toString.call(o) === "[object " + type + "]";
        }
        function isFunction(o) {
          return typeof o === "function";
        }
        function isRawObject(o) {
          return isType(o, "Object");
        }
        function getInternalData(elt) {
          const dataProp = "htmx-internal-data";
          let data = elt[dataProp];
          if (!data) {
            data = elt[dataProp] = {};
          }
          return data;
        }
        function toArray(arr) {
          const returnArr = [];
          if (arr) {
            for (let i = 0; i < arr.length; i++) {
              returnArr.push(arr[i]);
            }
          }
          return returnArr;
        }
        function forEach(arr, func) {
          if (arr) {
            for (let i = 0; i < arr.length; i++) {
              func(arr[i]);
            }
          }
        }
        function isScrolledIntoView(el) {
          const rect = el.getBoundingClientRect();
          const elemTop = rect.top;
          const elemBottom = rect.bottom;
          return elemTop < window.innerHeight && elemBottom >= 0;
        }
        function bodyContains(elt) {
          const rootNode = elt.getRootNode && elt.getRootNode();
          if (rootNode && rootNode instanceof window.ShadowRoot) {
            return getDocument().body.contains(rootNode.host);
          } else {
            return getDocument().body.contains(elt);
          }
        }
        function splitOnWhitespace(trigger) {
          return trigger.trim().split(/\s+/);
        }
        function mergeObjects(obj1, obj2) {
          for (const key in obj2) {
            if (obj2.hasOwnProperty(key)) {
              obj1[key] = obj2[key];
            }
          }
          return obj1;
        }
        function parseJSON(jString) {
          try {
            return JSON.parse(jString);
          } catch (error) {
            logError(error);
            return null;
          }
        }
        function canAccessLocalStorage() {
          const test = "htmx:localStorageTest";
          try {
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
          } catch (e) {
            return false;
          }
        }
        function normalizePath(path) {
          try {
            const url = new URL(path);
            if (url) {
              path = url.pathname + url.search;
            }
            if (!/^\/$/.test(path)) {
              path = path.replace(/\/+$/, "");
            }
            return path;
          } catch (e) {
            return path;
          }
        }
        function internalEval(str) {
          return maybeEval(getDocument().body, function() {
            return eval(str);
          });
        }
        function onLoadHelper(callback) {
          const value = htmx.on(
            "htmx:load",
            /** @param {CustomEvent} evt */
            function(evt) {
              callback(evt.detail.elt);
            }
          );
          return value;
        }
        function logAll() {
          htmx.logger = function(elt, event, data) {
            if (console) {
              console.log(event, elt, data);
            }
          };
        }
        function logNone() {
          htmx.logger = null;
        }
        function find(eltOrSelector, selector) {
          if (typeof eltOrSelector !== "string") {
            return eltOrSelector.querySelector(selector);
          } else {
            return find(getDocument(), eltOrSelector);
          }
        }
        function findAll(eltOrSelector, selector) {
          if (typeof eltOrSelector !== "string") {
            return eltOrSelector.querySelectorAll(selector);
          } else {
            return findAll(getDocument(), eltOrSelector);
          }
        }
        function getWindow() {
          return window;
        }
        function removeElement(elt, delay) {
          elt = resolveTarget(elt);
          if (delay) {
            getWindow().setTimeout(function() {
              removeElement(elt);
              elt = null;
            }, delay);
          } else {
            parentElt(elt).removeChild(elt);
          }
        }
        function asElement(elt) {
          return elt instanceof Element ? elt : null;
        }
        function asHtmlElement(elt) {
          return elt instanceof HTMLElement ? elt : null;
        }
        function asString(value) {
          return typeof value === "string" ? value : null;
        }
        function asParentNode(elt) {
          return elt instanceof Element || elt instanceof Document || elt instanceof DocumentFragment ? elt : null;
        }
        function addClassToElement(elt, clazz, delay) {
          elt = asElement(resolveTarget(elt));
          if (!elt) {
            return;
          }
          if (delay) {
            getWindow().setTimeout(function() {
              addClassToElement(elt, clazz);
              elt = null;
            }, delay);
          } else {
            elt.classList && elt.classList.add(clazz);
          }
        }
        function removeClassFromElement(node, clazz, delay) {
          let elt = asElement(resolveTarget(node));
          if (!elt) {
            return;
          }
          if (delay) {
            getWindow().setTimeout(function() {
              removeClassFromElement(elt, clazz);
              elt = null;
            }, delay);
          } else {
            if (elt.classList) {
              elt.classList.remove(clazz);
              if (elt.classList.length === 0) {
                elt.removeAttribute("class");
              }
            }
          }
        }
        function toggleClassOnElement(elt, clazz) {
          elt = resolveTarget(elt);
          elt.classList.toggle(clazz);
        }
        function takeClassForElement(elt, clazz) {
          elt = resolveTarget(elt);
          forEach(elt.parentElement.children, function(child) {
            removeClassFromElement(child, clazz);
          });
          addClassToElement(asElement(elt), clazz);
        }
        function closest(elt, selector) {
          elt = asElement(resolveTarget(elt));
          if (elt && elt.closest) {
            return elt.closest(selector);
          } else {
            do {
              if (elt == null || matches(elt, selector)) {
                return elt;
              }
            } while (elt = elt && asElement(parentElt(elt)));
            return null;
          }
        }
        function startsWith(str2, prefix) {
          return str2.substring(0, prefix.length) === prefix;
        }
        function endsWith(str2, suffix) {
          return str2.substring(str2.length - suffix.length) === suffix;
        }
        function normalizeSelector(selector) {
          const trimmedSelector = selector.trim();
          if (startsWith(trimmedSelector, "<") && endsWith(trimmedSelector, "/>")) {
            return trimmedSelector.substring(1, trimmedSelector.length - 2);
          } else {
            return trimmedSelector;
          }
        }
        function querySelectorAllExt(elt, selector, global) {
          elt = resolveTarget(elt);
          if (selector.indexOf("closest ") === 0) {
            return [closest(asElement(elt), normalizeSelector(selector.substr(8)))];
          } else if (selector.indexOf("find ") === 0) {
            return [find(asParentNode(elt), normalizeSelector(selector.substr(5)))];
          } else if (selector === "next") {
            return [asElement(elt).nextElementSibling];
          } else if (selector.indexOf("next ") === 0) {
            return [
              scanForwardQuery(elt, normalizeSelector(selector.substr(5)), !!global)
            ];
          } else if (selector === "previous") {
            return [asElement(elt).previousElementSibling];
          } else if (selector.indexOf("previous ") === 0) {
            return [
              scanBackwardsQuery(
                elt,
                normalizeSelector(selector.substr(9)),
                !!global
              )
            ];
          } else if (selector === "document") {
            return [document];
          } else if (selector === "window") {
            return [window];
          } else if (selector === "body") {
            return [document.body];
          } else if (selector === "root") {
            return [getRootNode(elt, !!global)];
          } else if (selector.indexOf("global ") === 0) {
            return querySelectorAllExt(elt, selector.slice(7), true);
          } else {
            return toArray(
              asParentNode(getRootNode(elt, !!global)).querySelectorAll(
                normalizeSelector(selector)
              )
            );
          }
        }
        var scanForwardQuery = function(start, match, global) {
          const results = asParentNode(getRootNode(start, global)).querySelectorAll(
            match
          );
          for (let i = 0; i < results.length; i++) {
            const elt = results[i];
            if (elt.compareDocumentPosition(start) === Node.DOCUMENT_POSITION_PRECEDING) {
              return elt;
            }
          }
        };
        var scanBackwardsQuery = function(start, match, global) {
          const results = asParentNode(getRootNode(start, global)).querySelectorAll(
            match
          );
          for (let i = results.length - 1; i >= 0; i--) {
            const elt = results[i];
            if (elt.compareDocumentPosition(start) === Node.DOCUMENT_POSITION_FOLLOWING) {
              return elt;
            }
          }
        };
        function querySelectorExt(eltOrSelector, selector) {
          if (typeof eltOrSelector !== "string") {
            return querySelectorAllExt(eltOrSelector, selector)[0];
          } else {
            return querySelectorAllExt(getDocument().body, eltOrSelector)[0];
          }
        }
        function resolveTarget(eltOrSelector, context) {
          if (typeof eltOrSelector === "string") {
            return find(asParentNode(context) || document, eltOrSelector);
          } else {
            return eltOrSelector;
          }
        }
        function processEventArgs(arg1, arg2, arg3) {
          if (isFunction(arg2)) {
            return {
              target: getDocument().body,
              event: asString(arg1),
              listener: arg2
            };
          } else {
            return {
              target: resolveTarget(arg1),
              event: asString(arg2),
              listener: arg3
            };
          }
        }
        function addEventListenerImpl(arg1, arg2, arg3) {
          ready(function() {
            const eventArgs = processEventArgs(arg1, arg2, arg3);
            eventArgs.target.addEventListener(eventArgs.event, eventArgs.listener);
          });
          const b = isFunction(arg2);
          return b ? arg2 : arg3;
        }
        function removeEventListenerImpl(arg1, arg2, arg3) {
          ready(function() {
            const eventArgs = processEventArgs(arg1, arg2, arg3);
            eventArgs.target.removeEventListener(eventArgs.event, eventArgs.listener);
          });
          return isFunction(arg2) ? arg2 : arg3;
        }
        const DUMMY_ELT = getDocument().createElement("output");
        function findAttributeTargets(elt, attrName) {
          const attrTarget = getClosestAttributeValue(elt, attrName);
          if (attrTarget) {
            if (attrTarget === "this") {
              return [findThisElement(elt, attrName)];
            } else {
              const result = querySelectorAllExt(elt, attrTarget);
              if (result.length === 0) {
                logError(
                  'The selector "' + attrTarget + '" on ' + attrName + " returned no matches!"
                );
                return [DUMMY_ELT];
              } else {
                return result;
              }
            }
          }
        }
        function findThisElement(elt, attribute) {
          return asElement(
            getClosestMatch(elt, function(elt2) {
              return getAttributeValue(asElement(elt2), attribute) != null;
            })
          );
        }
        function getTarget(elt) {
          const targetStr = getClosestAttributeValue(elt, "hx-target");
          if (targetStr) {
            if (targetStr === "this") {
              return findThisElement(elt, "hx-target");
            } else {
              return querySelectorExt(elt, targetStr);
            }
          } else {
            const data = getInternalData(elt);
            if (data.boosted) {
              return getDocument().body;
            } else {
              return elt;
            }
          }
        }
        function shouldSettleAttribute(name) {
          const attributesToSettle = htmx.config.attributesToSettle;
          for (let i = 0; i < attributesToSettle.length; i++) {
            if (name === attributesToSettle[i]) {
              return true;
            }
          }
          return false;
        }
        function cloneAttributes(mergeTo, mergeFrom) {
          forEach(mergeTo.attributes, function(attr) {
            if (!mergeFrom.hasAttribute(attr.name) && shouldSettleAttribute(attr.name)) {
              mergeTo.removeAttribute(attr.name);
            }
          });
          forEach(mergeFrom.attributes, function(attr) {
            if (shouldSettleAttribute(attr.name)) {
              mergeTo.setAttribute(attr.name, attr.value);
            }
          });
        }
        function isInlineSwap(swapStyle, target) {
          const extensions2 = getExtensions(target);
          for (let i = 0; i < extensions2.length; i++) {
            const extension = extensions2[i];
            try {
              if (extension.isInlineSwap(swapStyle)) {
                return true;
              }
            } catch (e) {
              logError(e);
            }
          }
          return swapStyle === "outerHTML";
        }
        function oobSwap(oobValue, oobElement, settleInfo) {
          let selector = "#" + getRawAttribute(oobElement, "id");
          let swapStyle = "outerHTML";
          if (oobValue === "true") {
          } else if (oobValue.indexOf(":") > 0) {
            swapStyle = oobValue.substr(0, oobValue.indexOf(":"));
            selector = oobValue.substr(oobValue.indexOf(":") + 1, oobValue.length);
          } else {
            swapStyle = oobValue;
          }
          const targets = getDocument().querySelectorAll(selector);
          if (targets) {
            forEach(targets, function(target) {
              let fragment;
              const oobElementClone = oobElement.cloneNode(true);
              fragment = getDocument().createDocumentFragment();
              fragment.appendChild(oobElementClone);
              if (!isInlineSwap(swapStyle, target)) {
                fragment = asParentNode(oobElementClone);
              }
              const beforeSwapDetails = { shouldSwap: true, target, fragment };
              if (!triggerEvent(target, "htmx:oobBeforeSwap", beforeSwapDetails))
                return;
              target = beforeSwapDetails.target;
              if (beforeSwapDetails.shouldSwap) {
                swapWithStyle(swapStyle, target, target, fragment, settleInfo);
              }
              forEach(settleInfo.elts, function(elt) {
                triggerEvent(elt, "htmx:oobAfterSwap", beforeSwapDetails);
              });
            });
            oobElement.parentNode.removeChild(oobElement);
          } else {
            oobElement.parentNode.removeChild(oobElement);
            triggerErrorEvent(getDocument().body, "htmx:oobErrorNoTarget", {
              content: oobElement
            });
          }
          return oobValue;
        }
        function handlePreservedElements(fragment) {
          forEach(
            findAll(fragment, "[hx-preserve], [data-hx-preserve]"),
            function(preservedElt) {
              const id = getAttributeValue(preservedElt, "id");
              const oldElt = getDocument().getElementById(id);
              if (oldElt != null) {
                preservedElt.parentNode.replaceChild(oldElt, preservedElt);
              }
            }
          );
        }
        function handleAttributes(parentNode, fragment, settleInfo) {
          forEach(fragment.querySelectorAll("[id]"), function(newNode) {
            const id = getRawAttribute(newNode, "id");
            if (id && id.length > 0) {
              const normalizedId = id.replace("'", "\\'");
              const normalizedTag = newNode.tagName.replace(":", "\\:");
              const parentElt2 = asParentNode(parentNode);
              const oldNode = parentElt2 && parentElt2.querySelector(normalizedTag + "[id='" + normalizedId + "']");
              if (oldNode && oldNode !== parentElt2) {
                const newAttributes = newNode.cloneNode();
                cloneAttributes(newNode, oldNode);
                settleInfo.tasks.push(function() {
                  cloneAttributes(newNode, newAttributes);
                });
              }
            }
          });
        }
        function makeAjaxLoadTask(child) {
          return function() {
            removeClassFromElement(child, htmx.config.addedClass);
            processNode(asElement(child));
            processFocus(asParentNode(child));
            triggerEvent(child, "htmx:load");
          };
        }
        function processFocus(child) {
          const autofocus = "[autofocus]";
          const autoFocusedElt = asHtmlElement(
            matches(child, autofocus) ? child : child.querySelector(autofocus)
          );
          if (autoFocusedElt != null) {
            autoFocusedElt.focus();
          }
        }
        function insertNodesBefore(parentNode, insertBefore, fragment, settleInfo) {
          handleAttributes(parentNode, fragment, settleInfo);
          while (fragment.childNodes.length > 0) {
            const child = fragment.firstChild;
            addClassToElement(asElement(child), htmx.config.addedClass);
            parentNode.insertBefore(child, insertBefore);
            if (child.nodeType !== Node.TEXT_NODE && child.nodeType !== Node.COMMENT_NODE) {
              settleInfo.tasks.push(makeAjaxLoadTask(child));
            }
          }
        }
        function stringHash(string, hash) {
          let char = 0;
          while (char < string.length) {
            hash = (hash << 5) - hash + string.charCodeAt(char++) | 0;
          }
          return hash;
        }
        function attributeHash(elt) {
          let hash = 0;
          if (elt.attributes) {
            for (let i = 0; i < elt.attributes.length; i++) {
              const attribute = elt.attributes[i];
              if (attribute.value) {
                hash = stringHash(attribute.name, hash);
                hash = stringHash(attribute.value, hash);
              }
            }
          }
          return hash;
        }
        function deInitOnHandlers(elt) {
          const internalData = getInternalData(elt);
          if (internalData.onHandlers) {
            for (let i = 0; i < internalData.onHandlers.length; i++) {
              const handlerInfo = internalData.onHandlers[i];
              removeEventListenerImpl(elt, handlerInfo.event, handlerInfo.listener);
            }
            delete internalData.onHandlers;
          }
        }
        function deInitNode(element) {
          const internalData = getInternalData(element);
          if (internalData.timeout) {
            clearTimeout(internalData.timeout);
          }
          if (internalData.listenerInfos) {
            forEach(internalData.listenerInfos, function(info) {
              if (info.on) {
                removeEventListenerImpl(info.on, info.trigger, info.listener);
              }
            });
          }
          deInitOnHandlers(element);
          forEach(Object.keys(internalData), function(key) {
            delete internalData[key];
          });
        }
        function cleanUpElement(element) {
          triggerEvent(element, "htmx:beforeCleanupElement");
          deInitNode(element);
          if (element.children) {
            forEach(element.children, function(child) {
              cleanUpElement(child);
            });
          }
        }
        function swapOuterHTML(target, fragment, settleInfo) {
          if (target instanceof Element && target.tagName === "BODY") {
            return swapInnerHTML(target, fragment, settleInfo);
          }
          let newElt;
          const eltBeforeNewContent = target.previousSibling;
          insertNodesBefore(parentElt(target), target, fragment, settleInfo);
          if (eltBeforeNewContent == null) {
            newElt = parentElt(target).firstChild;
          } else {
            newElt = eltBeforeNewContent.nextSibling;
          }
          settleInfo.elts = settleInfo.elts.filter(function(e) {
            return e !== target;
          });
          while (newElt && newElt !== target) {
            if (newElt instanceof Element) {
              settleInfo.elts.push(newElt);
            }
            newElt = newElt.nextSibling;
          }
          cleanUpElement(target);
          if (target instanceof Element) {
            target.remove();
          } else {
            target.parentNode.removeChild(target);
          }
        }
        function swapAfterBegin(target, fragment, settleInfo) {
          return insertNodesBefore(target, target.firstChild, fragment, settleInfo);
        }
        function swapBeforeBegin(target, fragment, settleInfo) {
          return insertNodesBefore(parentElt(target), target, fragment, settleInfo);
        }
        function swapBeforeEnd(target, fragment, settleInfo) {
          return insertNodesBefore(target, null, fragment, settleInfo);
        }
        function swapAfterEnd(target, fragment, settleInfo) {
          return insertNodesBefore(
            parentElt(target),
            target.nextSibling,
            fragment,
            settleInfo
          );
        }
        function swapDelete(target) {
          cleanUpElement(target);
          return parentElt(target).removeChild(target);
        }
        function swapInnerHTML(target, fragment, settleInfo) {
          const firstChild = target.firstChild;
          insertNodesBefore(target, firstChild, fragment, settleInfo);
          if (firstChild) {
            while (firstChild.nextSibling) {
              cleanUpElement(firstChild.nextSibling);
              target.removeChild(firstChild.nextSibling);
            }
            cleanUpElement(firstChild);
            target.removeChild(firstChild);
          }
        }
        function swapWithStyle(swapStyle, elt, target, fragment, settleInfo) {
          switch (swapStyle) {
            case "none":
              return;
            case "outerHTML":
              swapOuterHTML(target, fragment, settleInfo);
              return;
            case "afterbegin":
              swapAfterBegin(target, fragment, settleInfo);
              return;
            case "beforebegin":
              swapBeforeBegin(target, fragment, settleInfo);
              return;
            case "beforeend":
              swapBeforeEnd(target, fragment, settleInfo);
              return;
            case "afterend":
              swapAfterEnd(target, fragment, settleInfo);
              return;
            case "delete":
              swapDelete(target);
              return;
            default:
              var extensions2 = getExtensions(elt);
              for (let i = 0; i < extensions2.length; i++) {
                const ext = extensions2[i];
                try {
                  const newElements = ext.handleSwap(
                    swapStyle,
                    target,
                    fragment,
                    settleInfo
                  );
                  if (newElements) {
                    if (Array.isArray(newElements)) {
                      for (let j = 0; j < newElements.length; j++) {
                        const child = newElements[j];
                        if (child.nodeType !== Node.TEXT_NODE && child.nodeType !== Node.COMMENT_NODE) {
                          settleInfo.tasks.push(makeAjaxLoadTask(child));
                        }
                      }
                    }
                    return;
                  }
                } catch (e) {
                  logError(e);
                }
              }
              if (swapStyle === "innerHTML") {
                swapInnerHTML(target, fragment, settleInfo);
              } else {
                swapWithStyle(
                  htmx.config.defaultSwapStyle,
                  elt,
                  target,
                  fragment,
                  settleInfo
                );
              }
          }
        }
        function findAndSwapOobElements(fragment, settleInfo) {
          var oobElts = findAll(fragment, "[hx-swap-oob], [data-hx-swap-oob]");
          forEach(oobElts, function(oobElement) {
            if (htmx.config.allowNestedOobSwaps || oobElement.parentElement === null) {
              const oobValue = getAttributeValue(oobElement, "hx-swap-oob");
              if (oobValue != null) {
                oobSwap(oobValue, oobElement, settleInfo);
              }
            } else {
              oobElement.removeAttribute("hx-swap-oob");
              oobElement.removeAttribute("data-hx-swap-oob");
            }
          });
          return oobElts.length > 0;
        }
        function swap(target, content, swapSpec, swapOptions) {
          if (!swapOptions) {
            swapOptions = {};
          }
          target = resolveTarget(target);
          const activeElt = document.activeElement;
          let selectionInfo = {};
          try {
            selectionInfo = {
              elt: activeElt,
              // @ts-ignore
              start: activeElt ? activeElt.selectionStart : null,
              // @ts-ignore
              end: activeElt ? activeElt.selectionEnd : null
            };
          } catch (e) {
          }
          const settleInfo = makeSettleInfo(target);
          if (swapSpec.swapStyle === "textContent") {
            target.textContent = content;
          } else {
            let fragment = makeFragment(content);
            settleInfo.title = fragment.title;
            if (swapOptions.selectOOB) {
              const oobSelectValues = swapOptions.selectOOB.split(",");
              for (let i = 0; i < oobSelectValues.length; i++) {
                const oobSelectValue = oobSelectValues[i].split(":", 2);
                let id = oobSelectValue[0].trim();
                if (id.indexOf("#") === 0) {
                  id = id.substring(1);
                }
                const oobValue = oobSelectValue[1] || "true";
                const oobElement = fragment.querySelector("#" + id);
                if (oobElement) {
                  oobSwap(oobValue, oobElement, settleInfo);
                }
              }
            }
            findAndSwapOobElements(fragment, settleInfo);
            forEach(
              findAll(fragment, "template"),
              /** @param {HTMLTemplateElement} template */
              function(template) {
                if (findAndSwapOobElements(template.content, settleInfo)) {
                  template.remove();
                }
              }
            );
            if (swapOptions.select) {
              const newFragment = getDocument().createDocumentFragment();
              forEach(fragment.querySelectorAll(swapOptions.select), function(node) {
                newFragment.appendChild(node);
              });
              fragment = newFragment;
            }
            handlePreservedElements(fragment);
            swapWithStyle(
              swapSpec.swapStyle,
              swapOptions.contextElement,
              target,
              fragment,
              settleInfo
            );
          }
          if (selectionInfo.elt && !bodyContains(selectionInfo.elt) && getRawAttribute(selectionInfo.elt, "id")) {
            const newActiveElt = document.getElementById(
              getRawAttribute(selectionInfo.elt, "id")
            );
            const focusOptions = {
              preventScroll: swapSpec.focusScroll !== void 0 ? !swapSpec.focusScroll : !htmx.config.defaultFocusScroll
            };
            if (newActiveElt) {
              if (selectionInfo.start && newActiveElt.setSelectionRange) {
                try {
                  newActiveElt.setSelectionRange(
                    selectionInfo.start,
                    selectionInfo.end
                  );
                } catch (e) {
                }
              }
              newActiveElt.focus(focusOptions);
            }
          }
          target.classList.remove(htmx.config.swappingClass);
          forEach(settleInfo.elts, function(elt) {
            if (elt.classList) {
              elt.classList.add(htmx.config.settlingClass);
            }
            triggerEvent(elt, "htmx:afterSwap", swapOptions.eventInfo);
          });
          if (swapOptions.afterSwapCallback) {
            swapOptions.afterSwapCallback();
          }
          if (!swapSpec.ignoreTitle) {
            handleTitle(settleInfo.title);
          }
          const doSettle = function() {
            forEach(settleInfo.tasks, function(task) {
              task.call();
            });
            forEach(settleInfo.elts, function(elt) {
              if (elt.classList) {
                elt.classList.remove(htmx.config.settlingClass);
              }
              triggerEvent(elt, "htmx:afterSettle", swapOptions.eventInfo);
            });
            if (swapOptions.anchor) {
              const anchorTarget = asElement(resolveTarget("#" + swapOptions.anchor));
              if (anchorTarget) {
                anchorTarget.scrollIntoView({ block: "start", behavior: "auto" });
              }
            }
            updateScrollState(settleInfo.elts, swapSpec);
            if (swapOptions.afterSettleCallback) {
              swapOptions.afterSettleCallback();
            }
          };
          if (swapSpec.settleDelay > 0) {
            getWindow().setTimeout(doSettle, swapSpec.settleDelay);
          } else {
            doSettle();
          }
        }
        function handleTriggerHeader(xhr, header, elt) {
          const triggerBody = xhr.getResponseHeader(header);
          if (triggerBody.indexOf("{") === 0) {
            const triggers = parseJSON(triggerBody);
            for (const eventName in triggers) {
              if (triggers.hasOwnProperty(eventName)) {
                let detail = triggers[eventName];
                if (isRawObject(detail)) {
                  elt = detail.target !== void 0 ? detail.target : elt;
                } else {
                  detail = { value: detail };
                }
                triggerEvent(elt, eventName, detail);
              }
            }
          } else {
            const eventNames = triggerBody.split(",");
            for (let i = 0; i < eventNames.length; i++) {
              triggerEvent(elt, eventNames[i].trim(), []);
            }
          }
        }
        const WHITESPACE = /\s/;
        const WHITESPACE_OR_COMMA = /[\s,]/;
        const SYMBOL_START = /[_$a-zA-Z]/;
        const SYMBOL_CONT = /[_$a-zA-Z0-9]/;
        const STRINGISH_START = ['"', "'", "/"];
        const NOT_WHITESPACE = /[^\s]/;
        const COMBINED_SELECTOR_START = /[{(]/;
        const COMBINED_SELECTOR_END = /[})]/;
        function tokenizeString(str2) {
          const tokens = [];
          let position = 0;
          while (position < str2.length) {
            if (SYMBOL_START.exec(str2.charAt(position))) {
              var startPosition = position;
              while (SYMBOL_CONT.exec(str2.charAt(position + 1))) {
                position++;
              }
              tokens.push(str2.substr(startPosition, position - startPosition + 1));
            } else if (STRINGISH_START.indexOf(str2.charAt(position)) !== -1) {
              const startChar = str2.charAt(position);
              var startPosition = position;
              position++;
              while (position < str2.length && str2.charAt(position) !== startChar) {
                if (str2.charAt(position) === "\\") {
                  position++;
                }
                position++;
              }
              tokens.push(str2.substr(startPosition, position - startPosition + 1));
            } else {
              const symbol = str2.charAt(position);
              tokens.push(symbol);
            }
            position++;
          }
          return tokens;
        }
        function isPossibleRelativeReference(token, last, paramName) {
          return SYMBOL_START.exec(token.charAt(0)) && token !== "true" && token !== "false" && token !== "this" && token !== paramName && last !== ".";
        }
        function maybeGenerateConditional(elt, tokens, paramName) {
          if (tokens[0] === "[") {
            tokens.shift();
            let bracketCount = 1;
            let conditionalSource = " return (function(" + paramName + "){ return (";
            let last = null;
            while (tokens.length > 0) {
              const token = tokens[0];
              if (token === "]") {
                bracketCount--;
                if (bracketCount === 0) {
                  if (last === null) {
                    conditionalSource = conditionalSource + "true";
                  }
                  tokens.shift();
                  conditionalSource += ")})";
                  try {
                    const conditionFunction = maybeEval(
                      elt,
                      function() {
                        return Function(conditionalSource)();
                      },
                      function() {
                        return true;
                      }
                    );
                    conditionFunction.source = conditionalSource;
                    return conditionFunction;
                  } catch (e) {
                    triggerErrorEvent(getDocument().body, "htmx:syntax:error", {
                      error: e,
                      source: conditionalSource
                    });
                    return null;
                  }
                }
              } else if (token === "[") {
                bracketCount++;
              }
              if (isPossibleRelativeReference(token, last, paramName)) {
                conditionalSource += "((" + paramName + "." + token + ") ? (" + paramName + "." + token + ") : (window." + token + "))";
              } else {
                conditionalSource = conditionalSource + token;
              }
              last = tokens.shift();
            }
          }
        }
        function consumeUntil(tokens, match) {
          let result = "";
          while (tokens.length > 0 && !match.test(tokens[0])) {
            result += tokens.shift();
          }
          return result;
        }
        function consumeCSSSelector(tokens) {
          let result;
          if (tokens.length > 0 && COMBINED_SELECTOR_START.test(tokens[0])) {
            tokens.shift();
            result = consumeUntil(tokens, COMBINED_SELECTOR_END).trim();
            tokens.shift();
          } else {
            result = consumeUntil(tokens, WHITESPACE_OR_COMMA);
          }
          return result;
        }
        const INPUT_SELECTOR = "input, textarea, select";
        function parseAndCacheTrigger(elt, explicitTrigger, cache) {
          const triggerSpecs = [];
          const tokens = tokenizeString(explicitTrigger);
          do {
            consumeUntil(tokens, NOT_WHITESPACE);
            const initialLength = tokens.length;
            const trigger = consumeUntil(tokens, /[,\[\s]/);
            if (trigger !== "") {
              if (trigger === "every") {
                const every = { trigger: "every" };
                consumeUntil(tokens, NOT_WHITESPACE);
                every.pollInterval = parseInterval(consumeUntil(tokens, /[,\[\s]/));
                consumeUntil(tokens, NOT_WHITESPACE);
                var eventFilter = maybeGenerateConditional(elt, tokens, "event");
                if (eventFilter) {
                  every.eventFilter = eventFilter;
                }
                triggerSpecs.push(every);
              } else {
                const triggerSpec = { trigger };
                var eventFilter = maybeGenerateConditional(elt, tokens, "event");
                if (eventFilter) {
                  triggerSpec.eventFilter = eventFilter;
                }
                while (tokens.length > 0 && tokens[0] !== ",") {
                  consumeUntil(tokens, NOT_WHITESPACE);
                  const token = tokens.shift();
                  if (token === "changed") {
                    triggerSpec.changed = true;
                  } else if (token === "once") {
                    triggerSpec.once = true;
                  } else if (token === "consume") {
                    triggerSpec.consume = true;
                  } else if (token === "delay" && tokens[0] === ":") {
                    tokens.shift();
                    triggerSpec.delay = parseInterval(
                      consumeUntil(tokens, WHITESPACE_OR_COMMA)
                    );
                  } else if (token === "from" && tokens[0] === ":") {
                    tokens.shift();
                    if (COMBINED_SELECTOR_START.test(tokens[0])) {
                      var from_arg = consumeCSSSelector(tokens);
                    } else {
                      var from_arg = consumeUntil(tokens, WHITESPACE_OR_COMMA);
                      if (from_arg === "closest" || from_arg === "find" || from_arg === "next" || from_arg === "previous") {
                        tokens.shift();
                        const selector = consumeCSSSelector(tokens);
                        if (selector.length > 0) {
                          from_arg += " " + selector;
                        }
                      }
                    }
                    triggerSpec.from = from_arg;
                  } else if (token === "target" && tokens[0] === ":") {
                    tokens.shift();
                    triggerSpec.target = consumeCSSSelector(tokens);
                  } else if (token === "throttle" && tokens[0] === ":") {
                    tokens.shift();
                    triggerSpec.throttle = parseInterval(
                      consumeUntil(tokens, WHITESPACE_OR_COMMA)
                    );
                  } else if (token === "queue" && tokens[0] === ":") {
                    tokens.shift();
                    triggerSpec.queue = consumeUntil(tokens, WHITESPACE_OR_COMMA);
                  } else if (token === "root" && tokens[0] === ":") {
                    tokens.shift();
                    triggerSpec[token] = consumeCSSSelector(tokens);
                  } else if (token === "threshold" && tokens[0] === ":") {
                    tokens.shift();
                    triggerSpec[token] = consumeUntil(tokens, WHITESPACE_OR_COMMA);
                  } else {
                    triggerErrorEvent(elt, "htmx:syntax:error", {
                      token: tokens.shift()
                    });
                  }
                }
                triggerSpecs.push(triggerSpec);
              }
            }
            if (tokens.length === initialLength) {
              triggerErrorEvent(elt, "htmx:syntax:error", { token: tokens.shift() });
            }
            consumeUntil(tokens, NOT_WHITESPACE);
          } while (tokens[0] === "," && tokens.shift());
          if (cache) {
            cache[explicitTrigger] = triggerSpecs;
          }
          return triggerSpecs;
        }
        function getTriggerSpecs(elt) {
          const explicitTrigger = getAttributeValue(elt, "hx-trigger");
          let triggerSpecs = [];
          if (explicitTrigger) {
            const cache = htmx.config.triggerSpecsCache;
            triggerSpecs = cache && cache[explicitTrigger] || parseAndCacheTrigger(elt, explicitTrigger, cache);
          }
          if (triggerSpecs.length > 0) {
            return triggerSpecs;
          } else if (matches(elt, "form")) {
            return [{ trigger: "submit" }];
          } else if (matches(elt, 'input[type="button"], input[type="submit"]')) {
            return [{ trigger: "click" }];
          } else if (matches(elt, INPUT_SELECTOR)) {
            return [{ trigger: "change" }];
          } else {
            return [{ trigger: "click" }];
          }
        }
        function cancelPolling(elt) {
          getInternalData(elt).cancelled = true;
        }
        function processPolling(elt, handler, spec) {
          const nodeData = getInternalData(elt);
          nodeData.timeout = getWindow().setTimeout(function() {
            if (bodyContains(elt) && nodeData.cancelled !== true) {
              if (!maybeFilterEvent(
                spec,
                elt,
                makeEvent("hx:poll:trigger", {
                  triggerSpec: spec,
                  target: elt
                })
              )) {
                handler(elt);
              }
              processPolling(elt, handler, spec);
            }
          }, spec.pollInterval);
        }
        function isLocalLink(elt) {
          return location.hostname === elt.hostname && getRawAttribute(elt, "href") && getRawAttribute(elt, "href").indexOf("#") !== 0;
        }
        function eltIsDisabled(elt) {
          return closest(elt, htmx.config.disableSelector);
        }
        function boostElement(elt, nodeData, triggerSpecs) {
          if (elt instanceof HTMLAnchorElement && isLocalLink(elt) && (elt.target === "" || elt.target === "_self") || elt.tagName === "FORM" && String(getRawAttribute(elt, "method")).toLowerCase() !== "dialog") {
            nodeData.boosted = true;
            let verb, path;
            if (elt.tagName === "A") {
              verb = "get";
              path = getRawAttribute(elt, "href");
            } else {
              const rawAttribute = getRawAttribute(elt, "method");
              verb = rawAttribute ? rawAttribute.toLowerCase() : "get";
              if (verb === "get") {
              }
              path = getRawAttribute(elt, "action");
            }
            triggerSpecs.forEach(function(triggerSpec) {
              addEventListener(
                elt,
                function(node, evt) {
                  const elt2 = asElement(node);
                  if (eltIsDisabled(elt2)) {
                    cleanUpElement(elt2);
                    return;
                  }
                  issueAjaxRequest(verb, path, elt2, evt);
                },
                nodeData,
                triggerSpec,
                true
              );
            });
          }
        }
        function shouldCancel(evt, node) {
          const elt = asElement(node);
          if (!elt) {
            return false;
          }
          if (evt.type === "submit" || evt.type === "click") {
            if (elt.tagName === "FORM") {
              return true;
            }
            if (matches(elt, 'input[type="submit"], button') && closest(elt, "form") !== null) {
              return true;
            }
            if (elt instanceof HTMLAnchorElement && elt.href && (elt.getAttribute("href") === "#" || elt.getAttribute("href").indexOf("#") !== 0)) {
              return true;
            }
          }
          return false;
        }
        function ignoreBoostedAnchorCtrlClick(elt, evt) {
          return getInternalData(elt).boosted && elt instanceof HTMLAnchorElement && evt.type === "click" && // @ts-ignore this will resolve to undefined for events that don't define those properties, which is fine
          (evt.ctrlKey || evt.metaKey);
        }
        function maybeFilterEvent(triggerSpec, elt, evt) {
          const eventFilter = triggerSpec.eventFilter;
          if (eventFilter) {
            try {
              return eventFilter.call(elt, evt) !== true;
            } catch (e) {
              const source = eventFilter.source;
              triggerErrorEvent(getDocument().body, "htmx:eventFilter:error", {
                error: e,
                source
              });
              return true;
            }
          }
          return false;
        }
        function addEventListener(elt, handler, nodeData, triggerSpec, explicitCancel) {
          const elementData = getInternalData(elt);
          let eltsToListenOn;
          if (triggerSpec.from) {
            eltsToListenOn = querySelectorAllExt(elt, triggerSpec.from);
          } else {
            eltsToListenOn = [elt];
          }
          if (triggerSpec.changed) {
            eltsToListenOn.forEach(function(eltToListenOn) {
              const eltToListenOnData = getInternalData(eltToListenOn);
              eltToListenOnData.lastValue = eltToListenOn.value;
            });
          }
          forEach(eltsToListenOn, function(eltToListenOn) {
            const eventListener = function(evt) {
              if (!bodyContains(elt)) {
                eltToListenOn.removeEventListener(triggerSpec.trigger, eventListener);
                return;
              }
              if (ignoreBoostedAnchorCtrlClick(elt, evt)) {
                return;
              }
              if (explicitCancel || shouldCancel(evt, elt)) {
                evt.preventDefault();
              }
              if (maybeFilterEvent(triggerSpec, elt, evt)) {
                return;
              }
              const eventData = getInternalData(evt);
              eventData.triggerSpec = triggerSpec;
              if (eventData.handledFor == null) {
                eventData.handledFor = [];
              }
              if (eventData.handledFor.indexOf(elt) < 0) {
                eventData.handledFor.push(elt);
                if (triggerSpec.consume) {
                  evt.stopPropagation();
                }
                if (triggerSpec.target && evt.target) {
                  if (!matches(asElement(evt.target), triggerSpec.target)) {
                    return;
                  }
                }
                if (triggerSpec.once) {
                  if (elementData.triggeredOnce) {
                    return;
                  } else {
                    elementData.triggeredOnce = true;
                  }
                }
                if (triggerSpec.changed) {
                  const eltToListenOnData = getInternalData(eltToListenOn);
                  const value = eltToListenOn.value;
                  if (eltToListenOnData.lastValue === value) {
                    return;
                  }
                  eltToListenOnData.lastValue = value;
                }
                if (elementData.delayed) {
                  clearTimeout(elementData.delayed);
                }
                if (elementData.throttle) {
                  return;
                }
                if (triggerSpec.throttle > 0) {
                  if (!elementData.throttle) {
                    triggerEvent(elt, "htmx:trigger");
                    handler(elt, evt);
                    elementData.throttle = getWindow().setTimeout(function() {
                      elementData.throttle = null;
                    }, triggerSpec.throttle);
                  }
                } else if (triggerSpec.delay > 0) {
                  elementData.delayed = getWindow().setTimeout(function() {
                    triggerEvent(elt, "htmx:trigger");
                    handler(elt, evt);
                  }, triggerSpec.delay);
                } else {
                  triggerEvent(elt, "htmx:trigger");
                  handler(elt, evt);
                }
              }
            };
            if (nodeData.listenerInfos == null) {
              nodeData.listenerInfos = [];
            }
            nodeData.listenerInfos.push({
              trigger: triggerSpec.trigger,
              listener: eventListener,
              on: eltToListenOn
            });
            eltToListenOn.addEventListener(triggerSpec.trigger, eventListener);
          });
        }
        let windowIsScrolling = false;
        let scrollHandler = null;
        function initScrollHandler() {
          if (!scrollHandler) {
            scrollHandler = function() {
              windowIsScrolling = true;
            };
            window.addEventListener("scroll", scrollHandler);
            setInterval(function() {
              if (windowIsScrolling) {
                windowIsScrolling = false;
                forEach(
                  getDocument().querySelectorAll(
                    "[hx-trigger*='revealed'],[data-hx-trigger*='revealed']"
                  ),
                  function(elt) {
                    maybeReveal(elt);
                  }
                );
              }
            }, 200);
          }
        }
        function maybeReveal(elt) {
          if (!hasAttribute(elt, "data-hx-revealed") && isScrolledIntoView(elt)) {
            elt.setAttribute("data-hx-revealed", "true");
            const nodeData = getInternalData(elt);
            if (nodeData.initHash) {
              triggerEvent(elt, "revealed");
            } else {
              elt.addEventListener(
                "htmx:afterProcessNode",
                function() {
                  triggerEvent(elt, "revealed");
                },
                { once: true }
              );
            }
          }
        }
        function loadImmediately(elt, handler, nodeData, delay) {
          const load = function() {
            if (!nodeData.loaded) {
              nodeData.loaded = true;
              handler(elt);
            }
          };
          if (delay > 0) {
            getWindow().setTimeout(load, delay);
          } else {
            load();
          }
        }
        function processVerbs(elt, nodeData, triggerSpecs) {
          let explicitAction = false;
          forEach(VERBS, function(verb) {
            if (hasAttribute(elt, "hx-" + verb)) {
              const path = getAttributeValue(elt, "hx-" + verb);
              explicitAction = true;
              nodeData.path = path;
              nodeData.verb = verb;
              triggerSpecs.forEach(function(triggerSpec) {
                addTriggerHandler(elt, triggerSpec, nodeData, function(node, evt) {
                  const elt2 = asElement(node);
                  if (closest(elt2, htmx.config.disableSelector)) {
                    cleanUpElement(elt2);
                    return;
                  }
                  issueAjaxRequest(verb, path, elt2, evt);
                });
              });
            }
          });
          return explicitAction;
        }
        function addTriggerHandler(elt, triggerSpec, nodeData, handler) {
          if (triggerSpec.trigger === "revealed") {
            initScrollHandler();
            addEventListener(elt, handler, nodeData, triggerSpec);
            maybeReveal(asElement(elt));
          } else if (triggerSpec.trigger === "intersect") {
            const observerOptions = {};
            if (triggerSpec.root) {
              observerOptions.root = querySelectorExt(elt, triggerSpec.root);
            }
            if (triggerSpec.threshold) {
              observerOptions.threshold = parseFloat(triggerSpec.threshold);
            }
            const observer = new IntersectionObserver(function(entries) {
              for (let i = 0; i < entries.length; i++) {
                const entry = entries[i];
                if (entry.isIntersecting) {
                  triggerEvent(elt, "intersect");
                  break;
                }
              }
            }, observerOptions);
            observer.observe(asElement(elt));
            addEventListener(asElement(elt), handler, nodeData, triggerSpec);
          } else if (triggerSpec.trigger === "load") {
            if (!maybeFilterEvent(triggerSpec, elt, makeEvent("load", { elt }))) {
              loadImmediately(asElement(elt), handler, nodeData, triggerSpec.delay);
            }
          } else if (triggerSpec.pollInterval > 0) {
            nodeData.polling = true;
            processPolling(asElement(elt), handler, triggerSpec);
          } else {
            addEventListener(elt, handler, nodeData, triggerSpec);
          }
        }
        function shouldProcessHxOn(node) {
          const elt = asElement(node);
          if (!elt) {
            return false;
          }
          const attributes = elt.attributes;
          for (let j = 0; j < attributes.length; j++) {
            const attrName = attributes[j].name;
            if (startsWith(attrName, "hx-on:") || startsWith(attrName, "data-hx-on:") || startsWith(attrName, "hx-on-") || startsWith(attrName, "data-hx-on-")) {
              return true;
            }
          }
          return false;
        }
        const HX_ON_QUERY = new XPathEvaluator().createExpression(
          './/*[@*[ starts-with(name(), "hx-on:") or starts-with(name(), "data-hx-on:") or starts-with(name(), "hx-on-") or starts-with(name(), "data-hx-on-") ]]'
        );
        function processHXOnRoot(elt, elements) {
          if (shouldProcessHxOn(elt)) {
            elements.push(asElement(elt));
          }
          const iter = HX_ON_QUERY.evaluate(elt);
          let node = null;
          while (node = iter.iterateNext()) elements.push(asElement(node));
        }
        function findHxOnWildcardElements(elt) {
          const elements = [];
          if (elt instanceof DocumentFragment) {
            for (const child of elt.childNodes) {
              processHXOnRoot(child, elements);
            }
          } else {
            processHXOnRoot(elt, elements);
          }
          return elements;
        }
        function findElementsToProcess(elt) {
          if (elt.querySelectorAll) {
            const boostedSelector = ", [hx-boost] a, [data-hx-boost] a, a[hx-boost], a[data-hx-boost]";
            const extensionSelectors = [];
            for (const e in extensions) {
              const extension = extensions[e];
              if (extension.getSelectors) {
                var selectors = extension.getSelectors();
                if (selectors) {
                  extensionSelectors.push(selectors);
                }
              }
            }
            const results = elt.querySelectorAll(
              VERB_SELECTOR + boostedSelector + ", form, [type='submit'], [hx-ext], [data-hx-ext], [hx-trigger], [data-hx-trigger]" + extensionSelectors.flat().map((s) => ", " + s).join("")
            );
            return results;
          } else {
            return [];
          }
        }
        function maybeSetLastButtonClicked(evt) {
          const elt = (
            /** @type {HTMLButtonElement|HTMLInputElement} */
            closest(asElement(evt.target), "button, input[type='submit']")
          );
          const internalData = getRelatedFormData(evt);
          if (internalData) {
            internalData.lastButtonClicked = elt;
          }
        }
        function maybeUnsetLastButtonClicked(evt) {
          const internalData = getRelatedFormData(evt);
          if (internalData) {
            internalData.lastButtonClicked = null;
          }
        }
        function getRelatedFormData(evt) {
          const elt = closest(asElement(evt.target), "button, input[type='submit']");
          if (!elt) {
            return;
          }
          const form = resolveTarget("#" + getRawAttribute(elt, "form"), elt.getRootNode()) || closest(elt, "form");
          if (!form) {
            return;
          }
          return getInternalData(form);
        }
        function initButtonTracking(elt) {
          elt.addEventListener("click", maybeSetLastButtonClicked);
          elt.addEventListener("focusin", maybeSetLastButtonClicked);
          elt.addEventListener("focusout", maybeUnsetLastButtonClicked);
        }
        function addHxOnEventHandler(elt, eventName, code) {
          const nodeData = getInternalData(elt);
          if (!Array.isArray(nodeData.onHandlers)) {
            nodeData.onHandlers = [];
          }
          let func;
          const listener = function(e) {
            maybeEval(elt, function() {
              if (eltIsDisabled(elt)) {
                return;
              }
              if (!func) {
                func = new Function("event", code);
              }
              func.call(elt, e);
            });
          };
          elt.addEventListener(eventName, listener);
          nodeData.onHandlers.push({ event: eventName, listener });
        }
        function processHxOnWildcard(elt) {
          deInitOnHandlers(elt);
          for (let i = 0; i < elt.attributes.length; i++) {
            const name = elt.attributes[i].name;
            const value = elt.attributes[i].value;
            if (startsWith(name, "hx-on") || startsWith(name, "data-hx-on")) {
              const afterOnPosition = name.indexOf("-on") + 3;
              const nextChar = name.slice(afterOnPosition, afterOnPosition + 1);
              if (nextChar === "-" || nextChar === ":") {
                let eventName = name.slice(afterOnPosition + 1);
                if (startsWith(eventName, ":")) {
                  eventName = "htmx" + eventName;
                } else if (startsWith(eventName, "-")) {
                  eventName = "htmx:" + eventName.slice(1);
                } else if (startsWith(eventName, "htmx-")) {
                  eventName = "htmx:" + eventName.slice(5);
                }
                addHxOnEventHandler(elt, eventName, value);
              }
            }
          }
        }
        function initNode(elt) {
          if (closest(elt, htmx.config.disableSelector)) {
            cleanUpElement(elt);
            return;
          }
          const nodeData = getInternalData(elt);
          if (nodeData.initHash !== attributeHash(elt)) {
            deInitNode(elt);
            nodeData.initHash = attributeHash(elt);
            triggerEvent(elt, "htmx:beforeProcessNode");
            if (elt.value) {
              nodeData.lastValue = elt.value;
            }
            const triggerSpecs = getTriggerSpecs(elt);
            const hasExplicitHttpAction = processVerbs(elt, nodeData, triggerSpecs);
            if (!hasExplicitHttpAction) {
              if (getClosestAttributeValue(elt, "hx-boost") === "true") {
                boostElement(elt, nodeData, triggerSpecs);
              } else if (hasAttribute(elt, "hx-trigger")) {
                triggerSpecs.forEach(function(triggerSpec) {
                  addTriggerHandler(elt, triggerSpec, nodeData, function() {
                  });
                });
              }
            }
            if (elt.tagName === "FORM" || getRawAttribute(elt, "type") === "submit" && hasAttribute(elt, "form")) {
              initButtonTracking(elt);
            }
            triggerEvent(elt, "htmx:afterProcessNode");
          }
        }
        function processNode(elt) {
          elt = resolveTarget(elt);
          if (closest(elt, htmx.config.disableSelector)) {
            cleanUpElement(elt);
            return;
          }
          initNode(elt);
          forEach(findElementsToProcess(elt), function(child) {
            initNode(child);
          });
          forEach(findHxOnWildcardElements(elt), processHxOnWildcard);
        }
        function kebabEventName(str2) {
          return str2.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
        }
        function makeEvent(eventName, detail) {
          let evt;
          if (window.CustomEvent && typeof window.CustomEvent === "function") {
            evt = new CustomEvent(eventName, {
              bubbles: true,
              cancelable: true,
              composed: true,
              detail
            });
          } else {
            evt = getDocument().createEvent("CustomEvent");
            evt.initCustomEvent(eventName, true, true, detail);
          }
          return evt;
        }
        function triggerErrorEvent(elt, eventName, detail) {
          triggerEvent(elt, eventName, mergeObjects({ error: eventName }, detail));
        }
        function ignoreEventForLogging(eventName) {
          return eventName === "htmx:afterProcessNode";
        }
        function withExtensions(elt, toDo) {
          forEach(getExtensions(elt), function(extension) {
            try {
              toDo(extension);
            } catch (e) {
              logError(e);
            }
          });
        }
        function logError(msg) {
          if (console.error) {
            console.error(msg);
          } else if (console.log) {
            console.log("ERROR: ", msg);
          }
        }
        function triggerEvent(elt, eventName, detail) {
          elt = resolveTarget(elt);
          if (detail == null) {
            detail = {};
          }
          detail.elt = elt;
          const event = makeEvent(eventName, detail);
          if (htmx.logger && !ignoreEventForLogging(eventName)) {
            htmx.logger(elt, eventName, detail);
          }
          if (detail.error) {
            logError(detail.error);
            triggerEvent(elt, "htmx:error", { errorInfo: detail });
          }
          let eventResult = elt.dispatchEvent(event);
          const kebabName = kebabEventName(eventName);
          if (eventResult && kebabName !== eventName) {
            const kebabedEvent = makeEvent(kebabName, event.detail);
            eventResult = eventResult && elt.dispatchEvent(kebabedEvent);
          }
          withExtensions(asElement(elt), function(extension) {
            eventResult = eventResult && extension.onEvent(eventName, event) !== false && !event.defaultPrevented;
          });
          return eventResult;
        }
        let currentPathForHistory = location.pathname + location.search;
        function getHistoryElement() {
          const historyElt = getDocument().querySelector(
            "[hx-history-elt],[data-hx-history-elt]"
          );
          return historyElt || getDocument().body;
        }
        function saveToHistoryCache(url, rootElt) {
          if (!canAccessLocalStorage()) {
            return;
          }
          const innerHTML = cleanInnerHtmlForHistory(rootElt);
          const title = getDocument().title;
          const scroll = window.scrollY;
          if (htmx.config.historyCacheSize <= 0) {
            localStorage.removeItem("htmx-history-cache");
            return;
          }
          url = normalizePath(url);
          const historyCache = parseJSON(localStorage.getItem("htmx-history-cache")) || [];
          for (let i = 0; i < historyCache.length; i++) {
            if (historyCache[i].url === url) {
              historyCache.splice(i, 1);
              break;
            }
          }
          const newHistoryItem = { url, content: innerHTML, title, scroll };
          triggerEvent(getDocument().body, "htmx:historyItemCreated", {
            item: newHistoryItem,
            cache: historyCache
          });
          historyCache.push(newHistoryItem);
          while (historyCache.length > htmx.config.historyCacheSize) {
            historyCache.shift();
          }
          while (historyCache.length > 0) {
            try {
              localStorage.setItem("htmx-history-cache", JSON.stringify(historyCache));
              break;
            } catch (e) {
              triggerErrorEvent(getDocument().body, "htmx:historyCacheError", {
                cause: e,
                cache: historyCache
              });
              historyCache.shift();
            }
          }
        }
        function getCachedHistory(url) {
          if (!canAccessLocalStorage()) {
            return null;
          }
          url = normalizePath(url);
          const historyCache = parseJSON(localStorage.getItem("htmx-history-cache")) || [];
          for (let i = 0; i < historyCache.length; i++) {
            if (historyCache[i].url === url) {
              return historyCache[i];
            }
          }
          return null;
        }
        function cleanInnerHtmlForHistory(elt) {
          const className = htmx.config.requestClass;
          const clone = (
            /** @type Element */
            elt.cloneNode(true)
          );
          forEach(findAll(clone, "." + className), function(child) {
            removeClassFromElement(child, className);
          });
          forEach(findAll(clone, "[data-disabled-by-htmx]"), function(child) {
            child.removeAttribute("disabled");
          });
          return clone.innerHTML;
        }
        function saveCurrentPageToHistory() {
          const elt = getHistoryElement();
          const path = currentPathForHistory || location.pathname + location.search;
          let disableHistoryCache;
          try {
            disableHistoryCache = getDocument().querySelector(
              '[hx-history="false" i],[data-hx-history="false" i]'
            );
          } catch (e) {
            disableHistoryCache = getDocument().querySelector(
              '[hx-history="false"],[data-hx-history="false"]'
            );
          }
          if (!disableHistoryCache) {
            triggerEvent(getDocument().body, "htmx:beforeHistorySave", {
              path,
              historyElt: elt
            });
            saveToHistoryCache(path, elt);
          }
          if (htmx.config.historyEnabled)
            history.replaceState(
              { htmx: true },
              getDocument().title,
              window.location.href
            );
        }
        function pushUrlIntoHistory(path) {
          if (htmx.config.getCacheBusterParam) {
            path = path.replace(/org\.htmx\.cache-buster=[^&]*&?/, "");
            if (endsWith(path, "&") || endsWith(path, "?")) {
              path = path.slice(0, -1);
            }
          }
          if (htmx.config.historyEnabled) {
            history.pushState({ htmx: true }, "", path);
          }
          currentPathForHistory = path;
        }
        function replaceUrlInHistory(path) {
          if (htmx.config.historyEnabled)
            history.replaceState({ htmx: true }, "", path);
          currentPathForHistory = path;
        }
        function settleImmediately(tasks) {
          forEach(tasks, function(task) {
            task.call(void 0);
          });
        }
        function loadHistoryFromServer(path) {
          const request = new XMLHttpRequest();
          const details = { path, xhr: request };
          triggerEvent(getDocument().body, "htmx:historyCacheMiss", details);
          request.open("GET", path, true);
          request.setRequestHeader("HX-Request", "true");
          request.setRequestHeader("HX-History-Restore-Request", "true");
          request.setRequestHeader("HX-Current-URL", getDocument().location.href);
          request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
              triggerEvent(getDocument().body, "htmx:historyCacheMissLoad", details);
              const fragment = makeFragment(this.response);
              const content = fragment.querySelector("[hx-history-elt],[data-hx-history-elt]") || fragment;
              const historyElement = getHistoryElement();
              const settleInfo = makeSettleInfo(historyElement);
              handleTitle(fragment.title);
              swapInnerHTML(historyElement, content, settleInfo);
              settleImmediately(settleInfo.tasks);
              currentPathForHistory = path;
              triggerEvent(getDocument().body, "htmx:historyRestore", {
                path,
                cacheMiss: true,
                serverResponse: this.response
              });
            } else {
              triggerErrorEvent(
                getDocument().body,
                "htmx:historyCacheMissLoadError",
                details
              );
            }
          };
          request.send();
        }
        function restoreHistory(path) {
          saveCurrentPageToHistory();
          path = path || location.pathname + location.search;
          const cached = getCachedHistory(path);
          if (cached) {
            const fragment = makeFragment(cached.content);
            const historyElement = getHistoryElement();
            const settleInfo = makeSettleInfo(historyElement);
            handleTitle(fragment.title);
            swapInnerHTML(historyElement, fragment, settleInfo);
            settleImmediately(settleInfo.tasks);
            getWindow().setTimeout(function() {
              window.scrollTo(0, cached.scroll);
            }, 0);
            currentPathForHistory = path;
            triggerEvent(getDocument().body, "htmx:historyRestore", {
              path,
              item: cached
            });
          } else {
            if (htmx.config.refreshOnHistoryMiss) {
              window.location.reload(true);
            } else {
              loadHistoryFromServer(path);
            }
          }
        }
        function addRequestIndicatorClasses(elt) {
          let indicators = (
            /** @type Element[] */
            findAttributeTargets(elt, "hx-indicator")
          );
          if (indicators == null) {
            indicators = [elt];
          }
          forEach(indicators, function(ic) {
            const internalData = getInternalData(ic);
            internalData.requestCount = (internalData.requestCount || 0) + 1;
            ic.classList.add.call(ic.classList, htmx.config.requestClass);
          });
          return indicators;
        }
        function disableElements(elt) {
          let disabledElts = (
            /** @type Element[] */
            findAttributeTargets(elt, "hx-disabled-elt")
          );
          if (disabledElts == null) {
            disabledElts = [];
          }
          forEach(disabledElts, function(disabledElement) {
            const internalData = getInternalData(disabledElement);
            internalData.requestCount = (internalData.requestCount || 0) + 1;
            disabledElement.setAttribute("disabled", "");
            disabledElement.setAttribute("data-disabled-by-htmx", "");
          });
          return disabledElts;
        }
        function removeRequestIndicators(indicators, disabled) {
          forEach(indicators, function(ic) {
            const internalData = getInternalData(ic);
            internalData.requestCount = (internalData.requestCount || 0) - 1;
            if (internalData.requestCount === 0) {
              ic.classList.remove.call(ic.classList, htmx.config.requestClass);
            }
          });
          forEach(disabled, function(disabledElement) {
            const internalData = getInternalData(disabledElement);
            internalData.requestCount = (internalData.requestCount || 0) - 1;
            if (internalData.requestCount === 0) {
              disabledElement.removeAttribute("disabled");
              disabledElement.removeAttribute("data-disabled-by-htmx");
            }
          });
        }
        function haveSeenNode(processed, elt) {
          for (let i = 0; i < processed.length; i++) {
            const node = processed[i];
            if (node.isSameNode(elt)) {
              return true;
            }
          }
          return false;
        }
        function shouldInclude(element) {
          const elt = (
            /** @type {HTMLInputElement} */
            element
          );
          if (elt.name === "" || elt.name == null || elt.disabled || closest(elt, "fieldset[disabled]")) {
            return false;
          }
          if (elt.type === "button" || elt.type === "submit" || elt.tagName === "image" || elt.tagName === "reset" || elt.tagName === "file") {
            return false;
          }
          if (elt.type === "checkbox" || elt.type === "radio") {
            return elt.checked;
          }
          return true;
        }
        function addValueToFormData(name, value, formData) {
          if (name != null && value != null) {
            if (Array.isArray(value)) {
              value.forEach(function(v) {
                formData.append(name, v);
              });
            } else {
              formData.append(name, value);
            }
          }
        }
        function removeValueFromFormData(name, value, formData) {
          if (name != null && value != null) {
            let values = formData.getAll(name);
            if (Array.isArray(value)) {
              values = values.filter((v) => value.indexOf(v) < 0);
            } else {
              values = values.filter((v) => v !== value);
            }
            formData.delete(name);
            forEach(values, (v) => formData.append(name, v));
          }
        }
        function processInputValue(processed, formData, errors, elt, validate) {
          if (elt == null || haveSeenNode(processed, elt)) {
            return;
          } else {
            processed.push(elt);
          }
          if (shouldInclude(elt)) {
            const name = getRawAttribute(elt, "name");
            let value = elt.value;
            if (elt instanceof HTMLSelectElement && elt.multiple) {
              value = toArray(elt.querySelectorAll("option:checked")).map(
                function(e) {
                  return (
                    /** @type HTMLOptionElement */
                    e.value
                  );
                }
              );
            }
            if (elt instanceof HTMLInputElement && elt.files) {
              value = toArray(elt.files);
            }
            addValueToFormData(name, value, formData);
            if (validate) {
              validateElement(elt, errors);
            }
          }
          if (elt instanceof HTMLFormElement) {
            forEach(elt.elements, function(input) {
              if (processed.indexOf(input) >= 0) {
                removeValueFromFormData(input.name, input.value, formData);
              } else {
                processed.push(input);
              }
              if (validate) {
                validateElement(input, errors);
              }
            });
            new FormData(elt).forEach(function(value, name) {
              if (value instanceof File && value.name === "") {
                return;
              }
              addValueToFormData(name, value, formData);
            });
          }
        }
        function validateElement(elt, errors) {
          const element = (
            /** @type {HTMLElement & ElementInternals} */
            elt
          );
          if (element.willValidate) {
            triggerEvent(element, "htmx:validation:validate");
            if (!element.checkValidity()) {
              errors.push({
                elt: element,
                message: element.validationMessage,
                validity: element.validity
              });
              triggerEvent(element, "htmx:validation:failed", {
                message: element.validationMessage,
                validity: element.validity
              });
            }
          }
        }
        function overrideFormData(receiver, donor) {
          for (const key of donor.keys()) {
            receiver.delete(key);
          }
          donor.forEach(function(value, key) {
            receiver.append(key, value);
          });
          return receiver;
        }
        function getInputValues(elt, verb) {
          const processed = [];
          const formData = new FormData();
          const priorityFormData = new FormData();
          const errors = [];
          const internalData = getInternalData(elt);
          if (internalData.lastButtonClicked && !bodyContains(internalData.lastButtonClicked)) {
            internalData.lastButtonClicked = null;
          }
          let validate = elt instanceof HTMLFormElement && elt.noValidate !== true || getAttributeValue(elt, "hx-validate") === "true";
          if (internalData.lastButtonClicked) {
            validate = validate && internalData.lastButtonClicked.formNoValidate !== true;
          }
          if (verb !== "get") {
            processInputValue(
              processed,
              priorityFormData,
              errors,
              closest(elt, "form"),
              validate
            );
          }
          processInputValue(processed, formData, errors, elt, validate);
          if (internalData.lastButtonClicked || elt.tagName === "BUTTON" || elt.tagName === "INPUT" && getRawAttribute(elt, "type") === "submit") {
            const button = internalData.lastButtonClicked || /** @type HTMLInputElement|HTMLButtonElement */
            elt;
            const name = getRawAttribute(button, "name");
            addValueToFormData(name, button.value, priorityFormData);
          }
          const includes = findAttributeTargets(elt, "hx-include");
          forEach(includes, function(node) {
            processInputValue(processed, formData, errors, asElement(node), validate);
            if (!matches(node, "form")) {
              forEach(
                asParentNode(node).querySelectorAll(INPUT_SELECTOR),
                function(descendant) {
                  processInputValue(processed, formData, errors, descendant, validate);
                }
              );
            }
          });
          overrideFormData(formData, priorityFormData);
          return { errors, formData, values: formDataProxy(formData) };
        }
        function appendParam(returnStr, name, realValue) {
          if (returnStr !== "") {
            returnStr += "&";
          }
          if (String(realValue) === "[object Object]") {
            realValue = JSON.stringify(realValue);
          }
          const s = encodeURIComponent(realValue);
          returnStr += encodeURIComponent(name) + "=" + s;
          return returnStr;
        }
        function urlEncode(values) {
          values = formDataFromObject(values);
          let returnStr = "";
          values.forEach(function(value, key) {
            returnStr = appendParam(returnStr, key, value);
          });
          return returnStr;
        }
        function getHeaders(elt, target, prompt2) {
          const headers = {
            "HX-Request": "true",
            "HX-Trigger": getRawAttribute(elt, "id"),
            "HX-Trigger-Name": getRawAttribute(elt, "name"),
            "HX-Target": getAttributeValue(target, "id"),
            "HX-Current-URL": getDocument().location.href
          };
          getValuesForElement(elt, "hx-headers", false, headers);
          if (prompt2 !== void 0) {
            headers["HX-Prompt"] = prompt2;
          }
          if (getInternalData(elt).boosted) {
            headers["HX-Boosted"] = "true";
          }
          return headers;
        }
        function filterValues(inputValues, elt) {
          const paramsValue = getClosestAttributeValue(elt, "hx-params");
          if (paramsValue) {
            if (paramsValue === "none") {
              return new FormData();
            } else if (paramsValue === "*") {
              return inputValues;
            } else if (paramsValue.indexOf("not ") === 0) {
              forEach(paramsValue.substr(4).split(","), function(name) {
                name = name.trim();
                inputValues.delete(name);
              });
              return inputValues;
            } else {
              const newValues = new FormData();
              forEach(paramsValue.split(","), function(name) {
                name = name.trim();
                if (inputValues.has(name)) {
                  inputValues.getAll(name).forEach(function(value) {
                    newValues.append(name, value);
                  });
                }
              });
              return newValues;
            }
          } else {
            return inputValues;
          }
        }
        function isAnchorLink(elt) {
          return !!getRawAttribute(elt, "href") && getRawAttribute(elt, "href").indexOf("#") >= 0;
        }
        function getSwapSpecification(elt, swapInfoOverride) {
          const swapInfo = swapInfoOverride || getClosestAttributeValue(elt, "hx-swap");
          const swapSpec = {
            swapStyle: getInternalData(elt).boosted ? "innerHTML" : htmx.config.defaultSwapStyle,
            swapDelay: htmx.config.defaultSwapDelay,
            settleDelay: htmx.config.defaultSettleDelay
          };
          if (htmx.config.scrollIntoViewOnBoost && getInternalData(elt).boosted && !isAnchorLink(elt)) {
            swapSpec.show = "top";
          }
          if (swapInfo) {
            const split = splitOnWhitespace(swapInfo);
            if (split.length > 0) {
              for (let i = 0; i < split.length; i++) {
                const value = split[i];
                if (value.indexOf("swap:") === 0) {
                  swapSpec.swapDelay = parseInterval(value.substr(5));
                } else if (value.indexOf("settle:") === 0) {
                  swapSpec.settleDelay = parseInterval(value.substr(7));
                } else if (value.indexOf("transition:") === 0) {
                  swapSpec.transition = value.substr(11) === "true";
                } else if (value.indexOf("ignoreTitle:") === 0) {
                  swapSpec.ignoreTitle = value.substr(12) === "true";
                } else if (value.indexOf("scroll:") === 0) {
                  const scrollSpec = value.substr(7);
                  var splitSpec = scrollSpec.split(":");
                  const scrollVal = splitSpec.pop();
                  var selectorVal = splitSpec.length > 0 ? splitSpec.join(":") : null;
                  swapSpec.scroll = scrollVal;
                  swapSpec.scrollTarget = selectorVal;
                } else if (value.indexOf("show:") === 0) {
                  const showSpec = value.substr(5);
                  var splitSpec = showSpec.split(":");
                  const showVal = splitSpec.pop();
                  var selectorVal = splitSpec.length > 0 ? splitSpec.join(":") : null;
                  swapSpec.show = showVal;
                  swapSpec.showTarget = selectorVal;
                } else if (value.indexOf("focus-scroll:") === 0) {
                  const focusScrollVal = value.substr("focus-scroll:".length);
                  swapSpec.focusScroll = focusScrollVal == "true";
                } else if (i == 0) {
                  swapSpec.swapStyle = value;
                } else {
                  logError("Unknown modifier in hx-swap: " + value);
                }
              }
            }
          }
          return swapSpec;
        }
        function usesFormData(elt) {
          return getClosestAttributeValue(elt, "hx-encoding") === "multipart/form-data" || matches(elt, "form") && getRawAttribute(elt, "enctype") === "multipart/form-data";
        }
        function encodeParamsForBody(xhr, elt, filteredParameters) {
          let encodedParameters = null;
          withExtensions(elt, function(extension) {
            if (encodedParameters == null) {
              encodedParameters = extension.encodeParameters(
                xhr,
                filteredParameters,
                elt
              );
            }
          });
          if (encodedParameters != null) {
            return encodedParameters;
          } else {
            if (usesFormData(elt)) {
              return overrideFormData(
                new FormData(),
                formDataFromObject(filteredParameters)
              );
            } else {
              return urlEncode(filteredParameters);
            }
          }
        }
        function makeSettleInfo(target) {
          return { tasks: [], elts: [target] };
        }
        function updateScrollState(content, swapSpec) {
          const first = content[0];
          const last = content[content.length - 1];
          if (swapSpec.scroll) {
            var target = null;
            if (swapSpec.scrollTarget) {
              target = asElement(querySelectorExt(first, swapSpec.scrollTarget));
            }
            if (swapSpec.scroll === "top" && (first || target)) {
              target = target || first;
              target.scrollTop = 0;
            }
            if (swapSpec.scroll === "bottom" && (last || target)) {
              target = target || last;
              target.scrollTop = target.scrollHeight;
            }
          }
          if (swapSpec.show) {
            var target = null;
            if (swapSpec.showTarget) {
              let targetStr = swapSpec.showTarget;
              if (swapSpec.showTarget === "window") {
                targetStr = "body";
              }
              target = asElement(querySelectorExt(first, targetStr));
            }
            if (swapSpec.show === "top" && (first || target)) {
              target = target || first;
              target.scrollIntoView({
                block: "start",
                behavior: htmx.config.scrollBehavior
              });
            }
            if (swapSpec.show === "bottom" && (last || target)) {
              target = target || last;
              target.scrollIntoView({
                block: "end",
                behavior: htmx.config.scrollBehavior
              });
            }
          }
        }
        function getValuesForElement(elt, attr, evalAsDefault, values) {
          if (values == null) {
            values = {};
          }
          if (elt == null) {
            return values;
          }
          const attributeValue = getAttributeValue(elt, attr);
          if (attributeValue) {
            let str2 = attributeValue.trim();
            let evaluateValue = evalAsDefault;
            if (str2 === "unset") {
              return null;
            }
            if (str2.indexOf("javascript:") === 0) {
              str2 = str2.substr(11);
              evaluateValue = true;
            } else if (str2.indexOf("js:") === 0) {
              str2 = str2.substr(3);
              evaluateValue = true;
            }
            if (str2.indexOf("{") !== 0) {
              str2 = "{" + str2 + "}";
            }
            let varsValues;
            if (evaluateValue) {
              varsValues = maybeEval(
                elt,
                function() {
                  return Function("return (" + str2 + ")")();
                },
                {}
              );
            } else {
              varsValues = parseJSON(str2);
            }
            for (const key in varsValues) {
              if (varsValues.hasOwnProperty(key)) {
                if (values[key] == null) {
                  values[key] = varsValues[key];
                }
              }
            }
          }
          return getValuesForElement(
            asElement(parentElt(elt)),
            attr,
            evalAsDefault,
            values
          );
        }
        function maybeEval(elt, toEval, defaultVal) {
          if (htmx.config.allowEval) {
            return toEval();
          } else {
            triggerErrorEvent(elt, "htmx:evalDisallowedError");
            return defaultVal;
          }
        }
        function getHXVarsForElement(elt, expressionVars) {
          return getValuesForElement(elt, "hx-vars", true, expressionVars);
        }
        function getHXValsForElement(elt, expressionVars) {
          return getValuesForElement(elt, "hx-vals", false, expressionVars);
        }
        function getExpressionVars(elt) {
          return mergeObjects(getHXVarsForElement(elt), getHXValsForElement(elt));
        }
        function safelySetHeaderValue(xhr, header, headerValue) {
          if (headerValue !== null) {
            try {
              xhr.setRequestHeader(header, headerValue);
            } catch (e) {
              xhr.setRequestHeader(header, encodeURIComponent(headerValue));
              xhr.setRequestHeader(header + "-URI-AutoEncoded", "true");
            }
          }
        }
        function getPathFromResponse(xhr) {
          if (xhr.responseURL && typeof URL !== "undefined") {
            try {
              const url = new URL(xhr.responseURL);
              return url.pathname + url.search;
            } catch (e) {
              triggerErrorEvent(getDocument().body, "htmx:badResponseUrl", {
                url: xhr.responseURL
              });
            }
          }
        }
        function hasHeader(xhr, regexp) {
          return regexp.test(xhr.getAllResponseHeaders());
        }
        function ajaxHelper(verb, path, context) {
          verb = /** @type HttpVerb */
          verb.toLowerCase();
          if (context) {
            if (context instanceof Element || typeof context === "string") {
              return issueAjaxRequest(verb, path, null, null, {
                targetOverride: resolveTarget(context),
                returnPromise: true
              });
            } else {
              return issueAjaxRequest(
                verb,
                path,
                resolveTarget(context.source),
                context.event,
                {
                  handler: context.handler,
                  headers: context.headers,
                  values: context.values,
                  targetOverride: resolveTarget(context.target),
                  swapOverride: context.swap,
                  select: context.select,
                  returnPromise: true
                }
              );
            }
          } else {
            return issueAjaxRequest(verb, path, null, null, {
              returnPromise: true
            });
          }
        }
        function hierarchyForElt(elt) {
          const arr = [];
          while (elt) {
            arr.push(elt);
            elt = elt.parentElement;
          }
          return arr;
        }
        function verifyPath(elt, path, requestConfig) {
          let sameHost;
          let url;
          if (typeof URL === "function") {
            url = new URL(path, document.location.href);
            const origin = document.location.origin;
            sameHost = origin === url.origin;
          } else {
            url = path;
            sameHost = startsWith(path, document.location.origin);
          }
          if (htmx.config.selfRequestsOnly) {
            if (!sameHost) {
              return false;
            }
          }
          return triggerEvent(
            elt,
            "htmx:validateUrl",
            mergeObjects({ url, sameHost }, requestConfig)
          );
        }
        function formDataFromObject(obj) {
          if (obj instanceof FormData) return obj;
          const formData = new FormData();
          for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
              if (typeof obj[key].forEach === "function") {
                obj[key].forEach(function(v) {
                  formData.append(key, v);
                });
              } else if (typeof obj[key] === "object" && !(obj[key] instanceof Blob)) {
                formData.append(key, JSON.stringify(obj[key]));
              } else {
                formData.append(key, obj[key]);
              }
            }
          }
          return formData;
        }
        function formDataArrayProxy(formData, name, array) {
          return new Proxy(array, {
            get: function(target, key) {
              if (typeof key === "number") return target[key];
              if (key === "length") return target.length;
              if (key === "push") {
                return function(value) {
                  target.push(value);
                  formData.append(name, value);
                };
              }
              if (typeof target[key] === "function") {
                return function() {
                  target[key].apply(target, arguments);
                  formData.delete(name);
                  target.forEach(function(v) {
                    formData.append(name, v);
                  });
                };
              }
              if (target[key] && target[key].length === 1) {
                return target[key][0];
              } else {
                return target[key];
              }
            },
            set: function(target, index, value) {
              target[index] = value;
              formData.delete(name);
              target.forEach(function(v) {
                formData.append(name, v);
              });
              return true;
            }
          });
        }
        function formDataProxy(formData) {
          return new Proxy(formData, {
            get: function(target, name) {
              if (typeof name === "symbol") {
                return Reflect.get(target, name);
              }
              if (name === "toJSON") {
                return () => Object.fromEntries(formData);
              }
              if (name in target) {
                if (typeof target[name] === "function") {
                  return function() {
                    return formData[name].apply(formData, arguments);
                  };
                } else {
                  return target[name];
                }
              }
              const array = formData.getAll(name);
              if (array.length === 0) {
                return void 0;
              } else if (array.length === 1) {
                return array[0];
              } else {
                return formDataArrayProxy(target, name, array);
              }
            },
            set: function(target, name, value) {
              if (typeof name !== "string") {
                return false;
              }
              target.delete(name);
              if (typeof value.forEach === "function") {
                value.forEach(function(v) {
                  target.append(name, v);
                });
              } else if (typeof value === "object" && !(value instanceof Blob)) {
                target.append(name, JSON.stringify(value));
              } else {
                target.append(name, value);
              }
              return true;
            },
            deleteProperty: function(target, name) {
              if (typeof name === "string") {
                target.delete(name);
              }
              return true;
            },
            // Support Object.assign call from proxy
            ownKeys: function(target) {
              return Reflect.ownKeys(Object.fromEntries(target));
            },
            getOwnPropertyDescriptor: function(target, prop) {
              return Reflect.getOwnPropertyDescriptor(
                Object.fromEntries(target),
                prop
              );
            }
          });
        }
        function issueAjaxRequest(verb, path, elt, event, etc, confirmed) {
          let resolve = null;
          let reject = null;
          etc = etc != null ? etc : {};
          if (etc.returnPromise && typeof Promise !== "undefined") {
            var promise = new Promise(function(_resolve, _reject) {
              resolve = _resolve;
              reject = _reject;
            });
          }
          if (elt == null) {
            elt = getDocument().body;
          }
          const responseHandler = etc.handler || handleAjaxResponse;
          const select = etc.select || null;
          if (!bodyContains(elt)) {
            maybeCall(resolve);
            return promise;
          }
          const target = etc.targetOverride || asElement(getTarget(elt));
          if (target == null || target == DUMMY_ELT) {
            triggerErrorEvent(elt, "htmx:targetError", {
              target: getAttributeValue(elt, "hx-target")
            });
            maybeCall(reject);
            return promise;
          }
          let eltData = getInternalData(elt);
          const submitter = eltData.lastButtonClicked;
          if (submitter) {
            const buttonPath = getRawAttribute(submitter, "formaction");
            if (buttonPath != null) {
              path = buttonPath;
            }
            const buttonVerb = getRawAttribute(submitter, "formmethod");
            if (buttonVerb != null) {
              if (buttonVerb.toLowerCase() !== "dialog") {
                verb = /** @type HttpVerb */
                buttonVerb;
              }
            }
          }
          const confirmQuestion = getClosestAttributeValue(elt, "hx-confirm");
          if (confirmed === void 0) {
            const issueRequest = function(skipConfirmation) {
              return issueAjaxRequest(verb, path, elt, event, etc, !!skipConfirmation);
            };
            const confirmDetails = {
              target,
              elt,
              path,
              verb,
              triggeringEvent: event,
              etc,
              issueRequest,
              question: confirmQuestion
            };
            if (triggerEvent(elt, "htmx:confirm", confirmDetails) === false) {
              maybeCall(resolve);
              return promise;
            }
          }
          let syncElt = elt;
          let syncStrategy = getClosestAttributeValue(elt, "hx-sync");
          let queueStrategy = null;
          let abortable = false;
          if (syncStrategy) {
            const syncStrings = syncStrategy.split(":");
            const selector = syncStrings[0].trim();
            if (selector === "this") {
              syncElt = findThisElement(elt, "hx-sync");
            } else {
              syncElt = asElement(querySelectorExt(elt, selector));
            }
            syncStrategy = (syncStrings[1] || "drop").trim();
            eltData = getInternalData(syncElt);
            if (syncStrategy === "drop" && eltData.xhr && eltData.abortable !== true) {
              maybeCall(resolve);
              return promise;
            } else if (syncStrategy === "abort") {
              if (eltData.xhr) {
                maybeCall(resolve);
                return promise;
              } else {
                abortable = true;
              }
            } else if (syncStrategy === "replace") {
              triggerEvent(syncElt, "htmx:abort");
            } else if (syncStrategy.indexOf("queue") === 0) {
              const queueStrArray = syncStrategy.split(" ");
              queueStrategy = (queueStrArray[1] || "last").trim();
            }
          }
          if (eltData.xhr) {
            if (eltData.abortable) {
              triggerEvent(syncElt, "htmx:abort");
            } else {
              if (queueStrategy == null) {
                if (event) {
                  const eventData = getInternalData(event);
                  if (eventData && eventData.triggerSpec && eventData.triggerSpec.queue) {
                    queueStrategy = eventData.triggerSpec.queue;
                  }
                }
                if (queueStrategy == null) {
                  queueStrategy = "last";
                }
              }
              if (eltData.queuedRequests == null) {
                eltData.queuedRequests = [];
              }
              if (queueStrategy === "first" && eltData.queuedRequests.length === 0) {
                eltData.queuedRequests.push(function() {
                  issueAjaxRequest(verb, path, elt, event, etc);
                });
              } else if (queueStrategy === "all") {
                eltData.queuedRequests.push(function() {
                  issueAjaxRequest(verb, path, elt, event, etc);
                });
              } else if (queueStrategy === "last") {
                eltData.queuedRequests = [];
                eltData.queuedRequests.push(function() {
                  issueAjaxRequest(verb, path, elt, event, etc);
                });
              }
              maybeCall(resolve);
              return promise;
            }
          }
          const xhr = new XMLHttpRequest();
          eltData.xhr = xhr;
          eltData.abortable = abortable;
          const endRequestLock = function() {
            eltData.xhr = null;
            eltData.abortable = false;
            if (eltData.queuedRequests != null && eltData.queuedRequests.length > 0) {
              const queuedRequest = eltData.queuedRequests.shift();
              queuedRequest();
            }
          };
          const promptQuestion = getClosestAttributeValue(elt, "hx-prompt");
          if (promptQuestion) {
            var promptResponse = prompt(promptQuestion);
            if (promptResponse === null || !triggerEvent(elt, "htmx:prompt", { prompt: promptResponse, target })) {
              maybeCall(resolve);
              endRequestLock();
              return promise;
            }
          }
          if (confirmQuestion && !confirmed) {
            if (!confirm(confirmQuestion)) {
              maybeCall(resolve);
              endRequestLock();
              return promise;
            }
          }
          let headers = getHeaders(elt, target, promptResponse);
          if (verb !== "get" && !usesFormData(elt)) {
            headers["Content-Type"] = "application/x-www-form-urlencoded";
          }
          if (etc.headers) {
            headers = mergeObjects(headers, etc.headers);
          }
          const results = getInputValues(elt, verb);
          let errors = results.errors;
          const rawFormData = results.formData;
          if (etc.values) {
            overrideFormData(rawFormData, formDataFromObject(etc.values));
          }
          const expressionVars = formDataFromObject(getExpressionVars(elt));
          const allFormData = overrideFormData(rawFormData, expressionVars);
          let filteredFormData = filterValues(allFormData, elt);
          if (htmx.config.getCacheBusterParam && verb === "get") {
            filteredFormData.set(
              "org.htmx.cache-buster",
              getRawAttribute(target, "id") || "true"
            );
          }
          if (path == null || path === "") {
            path = getDocument().location.href;
          }
          const requestAttrValues = getValuesForElement(elt, "hx-request");
          const eltIsBoosted = getInternalData(elt).boosted;
          let useUrlParams = htmx.config.methodsThatUseUrlParams.indexOf(verb) >= 0;
          const requestConfig = {
            boosted: eltIsBoosted,
            useUrlParams,
            formData: filteredFormData,
            parameters: formDataProxy(filteredFormData),
            unfilteredFormData: allFormData,
            unfilteredParameters: formDataProxy(allFormData),
            headers,
            target,
            verb,
            errors,
            withCredentials: etc.credentials || requestAttrValues.credentials || htmx.config.withCredentials,
            timeout: etc.timeout || requestAttrValues.timeout || htmx.config.timeout,
            path,
            triggeringEvent: event
          };
          if (!triggerEvent(elt, "htmx:configRequest", requestConfig)) {
            maybeCall(resolve);
            endRequestLock();
            return promise;
          }
          path = requestConfig.path;
          verb = requestConfig.verb;
          headers = requestConfig.headers;
          filteredFormData = formDataFromObject(requestConfig.parameters);
          errors = requestConfig.errors;
          useUrlParams = requestConfig.useUrlParams;
          if (errors && errors.length > 0) {
            triggerEvent(elt, "htmx:validation:halted", requestConfig);
            maybeCall(resolve);
            endRequestLock();
            return promise;
          }
          const splitPath = path.split("#");
          const pathNoAnchor = splitPath[0];
          const anchor = splitPath[1];
          let finalPath = path;
          if (useUrlParams) {
            finalPath = pathNoAnchor;
            const hasValues = !filteredFormData.keys().next().done;
            if (hasValues) {
              if (finalPath.indexOf("?") < 0) {
                finalPath += "?";
              } else {
                finalPath += "&";
              }
              finalPath += urlEncode(filteredFormData);
              if (anchor) {
                finalPath += "#" + anchor;
              }
            }
          }
          if (!verifyPath(elt, finalPath, requestConfig)) {
            triggerErrorEvent(elt, "htmx:invalidPath", requestConfig);
            maybeCall(reject);
            return promise;
          }
          xhr.open(verb.toUpperCase(), finalPath, true);
          xhr.overrideMimeType("text/html");
          xhr.withCredentials = requestConfig.withCredentials;
          xhr.timeout = requestConfig.timeout;
          if (requestAttrValues.noHeaders) {
          } else {
            for (const header in headers) {
              if (headers.hasOwnProperty(header)) {
                const headerValue = headers[header];
                safelySetHeaderValue(xhr, header, headerValue);
              }
            }
          }
          const responseInfo = {
            xhr,
            target,
            requestConfig,
            etc,
            boosted: eltIsBoosted,
            select,
            pathInfo: {
              requestPath: path,
              finalRequestPath: finalPath,
              responsePath: null,
              anchor
            }
          };
          xhr.onload = function() {
            try {
              const hierarchy = hierarchyForElt(elt);
              responseInfo.pathInfo.responsePath = getPathFromResponse(xhr);
              responseHandler(elt, responseInfo);
              if (responseInfo.keepIndicators !== true) {
                removeRequestIndicators(indicators, disableElts);
              }
              triggerEvent(elt, "htmx:afterRequest", responseInfo);
              triggerEvent(elt, "htmx:afterOnLoad", responseInfo);
              if (!bodyContains(elt)) {
                let secondaryTriggerElt = null;
                while (hierarchy.length > 0 && secondaryTriggerElt == null) {
                  const parentEltInHierarchy = hierarchy.shift();
                  if (bodyContains(parentEltInHierarchy)) {
                    secondaryTriggerElt = parentEltInHierarchy;
                  }
                }
                if (secondaryTriggerElt) {
                  triggerEvent(secondaryTriggerElt, "htmx:afterRequest", responseInfo);
                  triggerEvent(secondaryTriggerElt, "htmx:afterOnLoad", responseInfo);
                }
              }
              maybeCall(resolve);
              endRequestLock();
            } catch (e) {
              triggerErrorEvent(
                elt,
                "htmx:onLoadError",
                mergeObjects({ error: e }, responseInfo)
              );
              throw e;
            }
          };
          xhr.onerror = function() {
            removeRequestIndicators(indicators, disableElts);
            triggerErrorEvent(elt, "htmx:afterRequest", responseInfo);
            triggerErrorEvent(elt, "htmx:sendError", responseInfo);
            maybeCall(reject);
            endRequestLock();
          };
          xhr.onabort = function() {
            removeRequestIndicators(indicators, disableElts);
            triggerErrorEvent(elt, "htmx:afterRequest", responseInfo);
            triggerErrorEvent(elt, "htmx:sendAbort", responseInfo);
            maybeCall(reject);
            endRequestLock();
          };
          xhr.ontimeout = function() {
            removeRequestIndicators(indicators, disableElts);
            triggerErrorEvent(elt, "htmx:afterRequest", responseInfo);
            triggerErrorEvent(elt, "htmx:timeout", responseInfo);
            maybeCall(reject);
            endRequestLock();
          };
          if (!triggerEvent(elt, "htmx:beforeRequest", responseInfo)) {
            maybeCall(resolve);
            endRequestLock();
            return promise;
          }
          var indicators = addRequestIndicatorClasses(elt);
          var disableElts = disableElements(elt);
          forEach(
            ["loadstart", "loadend", "progress", "abort"],
            function(eventName) {
              forEach([xhr, xhr.upload], function(target2) {
                target2.addEventListener(eventName, function(event2) {
                  triggerEvent(elt, "htmx:xhr:" + eventName, {
                    lengthComputable: event2.lengthComputable,
                    loaded: event2.loaded,
                    total: event2.total
                  });
                });
              });
            }
          );
          triggerEvent(elt, "htmx:beforeSend", responseInfo);
          const params = useUrlParams ? null : encodeParamsForBody(xhr, elt, filteredFormData);
          xhr.send(params);
          return promise;
        }
        function determineHistoryUpdates(elt, responseInfo) {
          const xhr = responseInfo.xhr;
          let pathFromHeaders = null;
          let typeFromHeaders = null;
          if (hasHeader(xhr, /HX-Push:/i)) {
            pathFromHeaders = xhr.getResponseHeader("HX-Push");
            typeFromHeaders = "push";
          } else if (hasHeader(xhr, /HX-Push-Url:/i)) {
            pathFromHeaders = xhr.getResponseHeader("HX-Push-Url");
            typeFromHeaders = "push";
          } else if (hasHeader(xhr, /HX-Replace-Url:/i)) {
            pathFromHeaders = xhr.getResponseHeader("HX-Replace-Url");
            typeFromHeaders = "replace";
          }
          if (pathFromHeaders) {
            if (pathFromHeaders === "false") {
              return {};
            } else {
              return {
                type: typeFromHeaders,
                path: pathFromHeaders
              };
            }
          }
          const requestPath = responseInfo.pathInfo.finalRequestPath;
          const responsePath = responseInfo.pathInfo.responsePath;
          const pushUrl = getClosestAttributeValue(elt, "hx-push-url");
          const replaceUrl = getClosestAttributeValue(elt, "hx-replace-url");
          const elementIsBoosted = getInternalData(elt).boosted;
          let saveType = null;
          let path = null;
          if (pushUrl) {
            saveType = "push";
            path = pushUrl;
          } else if (replaceUrl) {
            saveType = "replace";
            path = replaceUrl;
          } else if (elementIsBoosted) {
            saveType = "push";
            path = responsePath || requestPath;
          }
          if (path) {
            if (path === "false") {
              return {};
            }
            if (path === "true") {
              path = responsePath || requestPath;
            }
            if (responseInfo.pathInfo.anchor && path.indexOf("#") === -1) {
              path = path + "#" + responseInfo.pathInfo.anchor;
            }
            return {
              type: saveType,
              path
            };
          } else {
            return {};
          }
        }
        function codeMatches(responseHandlingConfig, status) {
          var regExp = new RegExp(responseHandlingConfig.code);
          return regExp.test(status.toString(10));
        }
        function resolveResponseHandling(xhr) {
          for (var i = 0; i < htmx.config.responseHandling.length; i++) {
            var responseHandlingElement = htmx.config.responseHandling[i];
            if (codeMatches(responseHandlingElement, xhr.status)) {
              return responseHandlingElement;
            }
          }
          return {
            swap: false
          };
        }
        function handleTitle(title) {
          if (title) {
            const titleElt = find("title");
            if (titleElt) {
              titleElt.innerHTML = title;
            } else {
              window.document.title = title;
            }
          }
        }
        function handleAjaxResponse(elt, responseInfo) {
          const xhr = responseInfo.xhr;
          let target = responseInfo.target;
          const etc = responseInfo.etc;
          const responseInfoSelect = responseInfo.select;
          if (!triggerEvent(elt, "htmx:beforeOnLoad", responseInfo)) return;
          if (hasHeader(xhr, /HX-Trigger:/i)) {
            handleTriggerHeader(xhr, "HX-Trigger", elt);
          }
          if (hasHeader(xhr, /HX-Location:/i)) {
            saveCurrentPageToHistory();
            let redirectPath = xhr.getResponseHeader("HX-Location");
            var redirectSwapSpec;
            if (redirectPath.indexOf("{") === 0) {
              redirectSwapSpec = parseJSON(redirectPath);
              redirectPath = redirectSwapSpec.path;
              delete redirectSwapSpec.path;
            }
            ajaxHelper("get", redirectPath, redirectSwapSpec).then(function() {
              pushUrlIntoHistory(redirectPath);
            });
            return;
          }
          const shouldRefresh = hasHeader(xhr, /HX-Refresh:/i) && xhr.getResponseHeader("HX-Refresh") === "true";
          if (hasHeader(xhr, /HX-Redirect:/i)) {
            responseInfo.keepIndicators = true;
            location.href = xhr.getResponseHeader("HX-Redirect");
            shouldRefresh && location.reload();
            return;
          }
          if (shouldRefresh) {
            responseInfo.keepIndicators = true;
            location.reload();
            return;
          }
          if (hasHeader(xhr, /HX-Retarget:/i)) {
            if (xhr.getResponseHeader("HX-Retarget") === "this") {
              responseInfo.target = elt;
            } else {
              responseInfo.target = asElement(
                querySelectorExt(elt, xhr.getResponseHeader("HX-Retarget"))
              );
            }
          }
          const historyUpdate = determineHistoryUpdates(elt, responseInfo);
          const responseHandling = resolveResponseHandling(xhr);
          const shouldSwap = responseHandling.swap;
          let isError = !!responseHandling.error;
          let ignoreTitle = htmx.config.ignoreTitle || responseHandling.ignoreTitle;
          let selectOverride = responseHandling.select;
          if (responseHandling.target) {
            responseInfo.target = asElement(
              querySelectorExt(elt, responseHandling.target)
            );
          }
          var swapOverride = etc.swapOverride;
          if (swapOverride == null && responseHandling.swapOverride) {
            swapOverride = responseHandling.swapOverride;
          }
          if (hasHeader(xhr, /HX-Retarget:/i)) {
            if (xhr.getResponseHeader("HX-Retarget") === "this") {
              responseInfo.target = elt;
            } else {
              responseInfo.target = asElement(
                querySelectorExt(elt, xhr.getResponseHeader("HX-Retarget"))
              );
            }
          }
          if (hasHeader(xhr, /HX-Reswap:/i)) {
            swapOverride = xhr.getResponseHeader("HX-Reswap");
          }
          var serverResponse = xhr.response;
          var beforeSwapDetails = mergeObjects(
            {
              shouldSwap,
              serverResponse,
              isError,
              ignoreTitle,
              selectOverride
            },
            responseInfo
          );
          if (responseHandling.event && !triggerEvent(target, responseHandling.event, beforeSwapDetails))
            return;
          if (!triggerEvent(target, "htmx:beforeSwap", beforeSwapDetails)) return;
          target = beforeSwapDetails.target;
          serverResponse = beforeSwapDetails.serverResponse;
          isError = beforeSwapDetails.isError;
          ignoreTitle = beforeSwapDetails.ignoreTitle;
          selectOverride = beforeSwapDetails.selectOverride;
          responseInfo.target = target;
          responseInfo.failed = isError;
          responseInfo.successful = !isError;
          if (beforeSwapDetails.shouldSwap) {
            if (xhr.status === 286) {
              cancelPolling(elt);
            }
            withExtensions(elt, function(extension) {
              serverResponse = extension.transformResponse(serverResponse, xhr, elt);
            });
            if (historyUpdate.type) {
              saveCurrentPageToHistory();
            }
            if (hasHeader(xhr, /HX-Reswap:/i)) {
              swapOverride = xhr.getResponseHeader("HX-Reswap");
            }
            var swapSpec = getSwapSpecification(elt, swapOverride);
            if (!swapSpec.hasOwnProperty("ignoreTitle")) {
              swapSpec.ignoreTitle = ignoreTitle;
            }
            target.classList.add(htmx.config.swappingClass);
            let settleResolve = null;
            let settleReject = null;
            if (responseInfoSelect) {
              selectOverride = responseInfoSelect;
            }
            if (hasHeader(xhr, /HX-Reselect:/i)) {
              selectOverride = xhr.getResponseHeader("HX-Reselect");
            }
            const selectOOB = getClosestAttributeValue(elt, "hx-select-oob");
            const select = getClosestAttributeValue(elt, "hx-select");
            let doSwap = function() {
              try {
                if (historyUpdate.type) {
                  triggerEvent(
                    getDocument().body,
                    "htmx:beforeHistoryUpdate",
                    mergeObjects({ history: historyUpdate }, responseInfo)
                  );
                  if (historyUpdate.type === "push") {
                    pushUrlIntoHistory(historyUpdate.path);
                    triggerEvent(getDocument().body, "htmx:pushedIntoHistory", {
                      path: historyUpdate.path
                    });
                  } else {
                    replaceUrlInHistory(historyUpdate.path);
                    triggerEvent(getDocument().body, "htmx:replacedInHistory", {
                      path: historyUpdate.path
                    });
                  }
                }
                swap(target, serverResponse, swapSpec, {
                  select: selectOverride || select,
                  selectOOB,
                  eventInfo: responseInfo,
                  anchor: responseInfo.pathInfo.anchor,
                  contextElement: elt,
                  afterSwapCallback: function() {
                    if (hasHeader(xhr, /HX-Trigger-After-Swap:/i)) {
                      let finalElt = elt;
                      if (!bodyContains(elt)) {
                        finalElt = getDocument().body;
                      }
                      handleTriggerHeader(xhr, "HX-Trigger-After-Swap", finalElt);
                    }
                  },
                  afterSettleCallback: function() {
                    if (hasHeader(xhr, /HX-Trigger-After-Settle:/i)) {
                      let finalElt = elt;
                      if (!bodyContains(elt)) {
                        finalElt = getDocument().body;
                      }
                      handleTriggerHeader(xhr, "HX-Trigger-After-Settle", finalElt);
                    }
                    maybeCall(settleResolve);
                  }
                });
              } catch (e) {
                triggerErrorEvent(elt, "htmx:swapError", responseInfo);
                maybeCall(settleReject);
                throw e;
              }
            };
            let shouldTransition = htmx.config.globalViewTransitions;
            if (swapSpec.hasOwnProperty("transition")) {
              shouldTransition = swapSpec.transition;
            }
            if (shouldTransition && triggerEvent(elt, "htmx:beforeTransition", responseInfo) && typeof Promise !== "undefined" && // @ts-ignore experimental feature atm
            document.startViewTransition) {
              const settlePromise = new Promise(function(_resolve, _reject) {
                settleResolve = _resolve;
                settleReject = _reject;
              });
              const innerDoSwap = doSwap;
              doSwap = function() {
                document.startViewTransition(function() {
                  innerDoSwap();
                  return settlePromise;
                });
              };
            }
            if (swapSpec.swapDelay > 0) {
              getWindow().setTimeout(doSwap, swapSpec.swapDelay);
            } else {
              doSwap();
            }
          }
          if (isError) {
            triggerErrorEvent(
              elt,
              "htmx:responseError",
              mergeObjects(
                {
                  error: "Response Status Error Code " + xhr.status + " from " + responseInfo.pathInfo.requestPath
                },
                responseInfo
              )
            );
          }
        }
        const extensions = {};
        function extensionBase() {
          return {
            init: function(api) {
              return null;
            },
            getSelectors: function() {
              return null;
            },
            onEvent: function(name, evt) {
              return true;
            },
            transformResponse: function(text, xhr, elt) {
              return text;
            },
            isInlineSwap: function(swapStyle) {
              return false;
            },
            handleSwap: function(swapStyle, target, fragment, settleInfo) {
              return false;
            },
            encodeParameters: function(xhr, parameters, elt) {
              return null;
            }
          };
        }
        function defineExtension(name, extension) {
          if (extension.init) {
            extension.init(internalAPI);
          }
          extensions[name] = mergeObjects(extensionBase(), extension);
        }
        function removeExtension(name) {
          delete extensions[name];
        }
        function getExtensions(elt, extensionsToReturn, extensionsToIgnore) {
          if (extensionsToReturn == void 0) {
            extensionsToReturn = [];
          }
          if (elt == void 0) {
            return extensionsToReturn;
          }
          if (extensionsToIgnore == void 0) {
            extensionsToIgnore = [];
          }
          const extensionsForElement = getAttributeValue(elt, "hx-ext");
          if (extensionsForElement) {
            forEach(extensionsForElement.split(","), function(extensionName) {
              extensionName = extensionName.replace(/ /g, "");
              if (extensionName.slice(0, 7) == "ignore:") {
                extensionsToIgnore.push(extensionName.slice(7));
                return;
              }
              if (extensionsToIgnore.indexOf(extensionName) < 0) {
                const extension = extensions[extensionName];
                if (extension && extensionsToReturn.indexOf(extension) < 0) {
                  extensionsToReturn.push(extension);
                }
              }
            });
          }
          return getExtensions(
            asElement(parentElt(elt)),
            extensionsToReturn,
            extensionsToIgnore
          );
        }
        var isReady = false;
        getDocument().addEventListener("DOMContentLoaded", function() {
          isReady = true;
        });
        function ready(fn) {
          if (isReady || getDocument().readyState === "complete") {
            fn();
          } else {
            getDocument().addEventListener("DOMContentLoaded", fn);
          }
        }
        function insertIndicatorStyles() {
          if (htmx.config.includeIndicatorStyles !== false) {
            const nonceAttribute = htmx.config.inlineStyleNonce ? ` nonce="${htmx.config.inlineStyleNonce}"` : "";
            getDocument().head.insertAdjacentHTML(
              "beforeend",
              "<style" + nonceAttribute + ">      ." + htmx.config.indicatorClass + "{opacity:0}      ." + htmx.config.requestClass + " ." + htmx.config.indicatorClass + "{opacity:1; transition: opacity 200ms ease-in;}      ." + htmx.config.requestClass + "." + htmx.config.indicatorClass + "{opacity:1; transition: opacity 200ms ease-in;}      </style>"
            );
          }
        }
        function getMetaConfig() {
          const element = getDocument().querySelector('meta[name="htmx-config"]');
          if (element) {
            return parseJSON(element.content);
          } else {
            return null;
          }
        }
        function mergeMetaConfig() {
          const metaConfig = getMetaConfig();
          if (metaConfig) {
            htmx.config = mergeObjects(htmx.config, metaConfig);
          }
        }
        ready(function() {
          mergeMetaConfig();
          insertIndicatorStyles();
          let body = getDocument().body;
          processNode(body);
          const restoredElts = getDocument().querySelectorAll(
            "[hx-trigger='restored'],[data-hx-trigger='restored']"
          );
          body.addEventListener("htmx:abort", function(evt) {
            const target = evt.target;
            const internalData = getInternalData(target);
            if (internalData && internalData.xhr) {
              internalData.xhr.abort();
            }
          });
          const originalPopstate = window.onpopstate ? window.onpopstate.bind(window) : null;
          window.onpopstate = function(event) {
            if (event.state && event.state.htmx) {
              restoreHistory();
              forEach(restoredElts, function(elt) {
                triggerEvent(elt, "htmx:restored", {
                  document: getDocument(),
                  triggerEvent
                });
              });
            } else {
              if (originalPopstate) {
                originalPopstate(event);
              }
            }
          };
          getWindow().setTimeout(function() {
            triggerEvent(body, "htmx:load", {});
            body = null;
          }, 0);
        });
        return htmx;
      }();
    }
  });

  // assets/js/vendored/croppie.cjs
  var require_croppie = __commonJS({
    "assets/js/vendored/croppie.cjs"(exports2, module2) {
      (function(root, factory) {
        if (typeof define === "function" && define.amd) {
          define(factory);
        } else if (typeof exports2 === "object" && typeof exports2.nodeName !== "string") {
          module2.exports = factory();
        } else {
          root.Croppie = factory();
        }
      })(typeof self !== "undefined" ? self : exports2, function() {
        if (typeof Promise !== "function") {
          !function(a) {
            function b(a2, b2) {
              return function() {
                a2.apply(b2, arguments);
              };
            }
            function c(a2) {
              if ("object" !== typeof this)
                throw new TypeError("Promises must be constructed via new");
              if ("function" !== typeof a2) throw new TypeError("not a function");
              this._state = null, this._value = null, this._deferreds = [], i(a2, b(e, this), b(f, this));
            }
            function d(a2) {
              var b2 = this;
              return null === this._state ? void this._deferreds.push(a2) : void k(function() {
                var c2 = b2._state ? a2.onFulfilled : a2.onRejected;
                if (null === c2)
                  return void (b2._state ? a2.resolve : a2.reject)(b2._value);
                var d2;
                try {
                  d2 = c2(b2._value);
                } catch (e2) {
                  return void a2.reject(e2);
                }
                a2.resolve(d2);
              });
            }
            function e(a2) {
              try {
                if (a2 === this)
                  throw new TypeError("A promise cannot be resolved with itself.");
                if (a2 && ("object" === typeof a2 || "function" === typeof a2)) {
                  var c2 = a2.then;
                  if ("function" === typeof c2)
                    return void i(b(c2, a2), b(e, this), b(f, this));
                }
                ;
                this._state = true, this._value = a2, g.call(this);
              } catch (d2) {
                f.call(this, d2);
              }
            }
            function f(a2) {
              ;
              this._state = false, this._value = a2, g.call(this);
            }
            function g() {
              for (var a2 = 0, b2 = this._deferreds.length; b2 > a2; a2++)
                d.call(this, this._deferreds[a2]);
              this._deferreds = null;
            }
            function h(a2, b2, c2, d2) {
              ;
              this.onFulfilled = "function" === typeof a2 ? a2 : null, this.onRejected = "function" === typeof b2 ? b2 : null, this.resolve = c2, this.reject = d2;
            }
            function i(a2, b2, c2) {
              var d2 = false;
              try {
                a2(
                  function(a3) {
                    d2 || (d2 = true, b2(a3));
                  },
                  function(a3) {
                    d2 || (d2 = true, c2(a3));
                  }
                );
              } catch (e2) {
                if (d2) return;
                d2 = true, c2(e2);
              }
            }
            var j = setTimeout, k = "function" === typeof setImmediate && setImmediate || function(a2) {
              j(a2, 1);
            }, l = Array.isArray || function(a2) {
              return "[object Array]" === Object.prototype.toString.call(a2);
            };
            c.prototype["catch"] = function(a2) {
              return this.then(null, a2);
            }, c.prototype.then = function(a2, b2) {
              var e2 = this;
              return new c(function(c2, f2) {
                d.call(e2, new h(a2, b2, c2, f2));
              });
            }, c.all = function() {
              var a2 = Array.prototype.slice.call(
                1 === arguments.length && l(arguments[0]) ? arguments[0] : arguments
              );
              return new c(function(b2, c2) {
                function d2(f3, g2) {
                  try {
                    if (g2 && ("object" === typeof g2 || "function" === typeof g2)) {
                      var h2 = g2.then;
                      if ("function" === typeof h2)
                        return void h2.call(
                          g2,
                          function(a3) {
                            d2(f3, a3);
                          },
                          c2
                        );
                    }
                    ;
                    a2[f3] = g2, 0 === --e2 && b2(a2);
                  } catch (i2) {
                    c2(i2);
                  }
                }
                if (0 === a2.length) return b2([]);
                for (var e2 = a2.length, f2 = 0; f2 < a2.length; f2++) d2(f2, a2[f2]);
              });
            }, c.resolve = function(a2) {
              return a2 && "object" === typeof a2 && a2.constructor === c ? a2 : new c(function(b2) {
                b2(a2);
              });
            }, c.reject = function(a2) {
              return new c(function(b2, c2) {
                c2(a2);
              });
            }, c.race = function(a2) {
              return new c(function(b2, c2) {
                for (var d2 = 0, e2 = a2.length; e2 > d2; d2++) a2[d2].then(b2, c2);
              });
            }, c._setImmediateFn = function(a2) {
              k = a2;
            }, "undefined" !== typeof module2 && module2.exports ? module2.exports = c : a.Promise || (a.Promise = c);
          }(this);
        }
        if (typeof window !== "undefined" && typeof window.CustomEvent !== "function") {
          ;
          (function() {
            function CustomEvent2(event, params) {
              params = params || {
                bubbles: false,
                cancelable: false,
                detail: void 0
              };
              var evt = document.createEvent("CustomEvent");
              evt.initCustomEvent(
                event,
                params.bubbles,
                params.cancelable,
                params.detail
              );
              return evt;
            }
            CustomEvent2.prototype = window.Event.prototype;
            window.CustomEvent = CustomEvent2;
          })();
        }
        if (typeof HTMLCanvasElement !== "undefined" && !HTMLCanvasElement.prototype.toBlob) {
          Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
            value: function(callback, type, quality) {
              var binStr = atob(this.toDataURL(type, quality).split(",")[1]), len = binStr.length, arr = new Uint8Array(len);
              for (var i = 0; i < len; i++) {
                arr[i] = binStr.charCodeAt(i);
              }
              callback(new Blob([arr], { type: type || "image/png" }));
            }
          });
        }
        var cssPrefixes = ["Webkit", "Moz", "ms"], emptyStyles = typeof document !== "undefined" ? document.createElement("div").style : {}, EXIF_NORM = [1, 8, 3, 6], EXIF_FLIP = [2, 7, 4, 5], CSS_TRANS_ORG, CSS_TRANSFORM, CSS_USERSELECT;
        function vendorPrefix(prop) {
          if (prop in emptyStyles) {
            return prop;
          }
          var capProp = prop[0].toUpperCase() + prop.slice(1), i = cssPrefixes.length;
          while (i--) {
            prop = cssPrefixes[i] + capProp;
            if (prop in emptyStyles) {
              return prop;
            }
          }
        }
        CSS_TRANSFORM = vendorPrefix("transform");
        CSS_TRANS_ORG = vendorPrefix("transformOrigin");
        CSS_USERSELECT = vendorPrefix("userSelect");
        function getExifOffset(ornt, rotate) {
          var arr = EXIF_NORM.indexOf(ornt) > -1 ? EXIF_NORM : EXIF_FLIP, index = arr.indexOf(ornt), offset = rotate / 90 % arr.length;
          return arr[(arr.length + index + offset % arr.length) % arr.length];
        }
        function deepExtend(destination, source) {
          destination = destination || {};
          for (var property in source) {
            if (source[property] && source[property].constructor && source[property].constructor === Object) {
              destination[property] = destination[property] || {};
              deepExtend(destination[property], source[property]);
            } else {
              destination[property] = source[property];
            }
          }
          return destination;
        }
        function clone(object) {
          return deepExtend({}, object);
        }
        function debounce(func, wait, immediate) {
          var timeout;
          return function() {
            var context = this, args = arguments;
            var later = function() {
              timeout = null;
              if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
          };
        }
        function dispatchChange(element) {
          if ("createEvent" in document) {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);
            element.dispatchEvent(evt);
          } else {
            element.fireEvent("onchange");
          }
        }
        function css(el, styles, val) {
          if (typeof styles === "string") {
            var tmp = styles;
            styles = {};
            styles[tmp] = val;
          }
          for (var prop in styles) {
            el.style[prop] = styles[prop];
          }
        }
        function addClass(el, c) {
          if (el.classList) {
            el.classList.add(c);
          } else {
            el.className += " " + c;
          }
        }
        function removeClass(el, c) {
          if (el.classList) {
            el.classList.remove(c);
          } else {
            el.className = el.className.replace(c, "");
          }
        }
        function setAttributes(el, attrs) {
          for (var key in attrs) {
            el.setAttribute(key, attrs[key]);
          }
        }
        function num(v) {
          return parseInt(v, 10);
        }
        function loadImage(src, doExif) {
          if (!src) {
            throw "Source image missing";
          }
          var img = new Image();
          img.style.opacity = "0";
          return new Promise(function(resolve, reject) {
            function _resolve() {
              img.style.opacity = "1";
              setTimeout(function() {
                resolve(img);
              }, 1);
            }
            img.removeAttribute("crossOrigin");
            if (src.match(/^https?:\/\/|^\/\//)) {
              img.setAttribute("crossOrigin", "anonymous");
            }
            img.onload = function() {
              if (doExif) {
                EXIF.getData(img, function() {
                  _resolve();
                });
              } else {
                _resolve();
              }
            };
            img.onerror = function(ev) {
              img.style.opacity = 1;
              setTimeout(function() {
                reject(ev);
              }, 1);
            };
            img.src = src;
          });
        }
        function naturalImageDimensions(img, ornt) {
          var w = img.naturalWidth;
          var h = img.naturalHeight;
          var orient = ornt || getExifOrientation(img);
          if (orient && orient >= 5) {
            var x = w;
            w = h;
            h = x;
          }
          return { width: w, height: h };
        }
        var TRANSLATE_OPTS = {
          translate3d: {
            suffix: ", 0px"
          },
          translate: {
            suffix: ""
          }
        };
        var Transform = function(x, y, scale) {
          this.x = parseFloat(x);
          this.y = parseFloat(y);
          this.scale = parseFloat(scale);
        };
        Transform.parse = function(v) {
          if (v.style) {
            return Transform.parse(v.style[CSS_TRANSFORM]);
          } else if (v.indexOf("matrix") > -1 || v.indexOf("none") > -1) {
            return Transform.fromMatrix(v);
          } else {
            return Transform.fromString(v);
          }
        };
        Transform.fromMatrix = function(v) {
          var vals = v.substring(7).split(",");
          if (!vals.length || v === "none") {
            vals = [1, 0, 0, 1, 0, 0];
          }
          return new Transform(num(vals[4]), num(vals[5]), parseFloat(vals[0]));
        };
        Transform.fromString = function(v) {
          var values = v.split(") "), translate = values[0].substring(Croppie2.globals.translate.length + 1).split(","), scale = values.length > 1 ? values[1].substring(6) : 1, x = translate.length > 1 ? translate[0] : 0, y = translate.length > 1 ? translate[1] : 0;
          return new Transform(x, y, scale);
        };
        Transform.prototype.toString = function() {
          var suffix = TRANSLATE_OPTS[Croppie2.globals.translate].suffix || "";
          return Croppie2.globals.translate + "(" + this.x + "px, " + this.y + "px" + suffix + ") scale(" + this.scale + ")";
        };
        var TransformOrigin = function(el) {
          if (!el || !el.style[CSS_TRANS_ORG]) {
            this.x = 0;
            this.y = 0;
            return;
          }
          var css2 = el.style[CSS_TRANS_ORG].split(" ");
          this.x = parseFloat(css2[0]);
          this.y = parseFloat(css2[1]);
        };
        TransformOrigin.prototype.toString = function() {
          return this.x + "px " + this.y + "px";
        };
        function getExifOrientation(img) {
          return img.exifdata && img.exifdata.Orientation ? num(img.exifdata.Orientation) : 1;
        }
        function drawCanvas(canvas, img, orientation) {
          var width = img.width, height = img.height, ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.save();
          switch (orientation) {
            case 2:
              ctx.translate(width, 0);
              ctx.scale(-1, 1);
              break;
            case 3:
              ctx.translate(width, height);
              ctx.rotate(180 * Math.PI / 180);
              break;
            case 4:
              ctx.translate(0, height);
              ctx.scale(1, -1);
              break;
            case 5:
              canvas.width = height;
              canvas.height = width;
              ctx.rotate(90 * Math.PI / 180);
              ctx.scale(1, -1);
              break;
            case 6:
              canvas.width = height;
              canvas.height = width;
              ctx.rotate(90 * Math.PI / 180);
              ctx.translate(0, -height);
              break;
            case 7:
              canvas.width = height;
              canvas.height = width;
              ctx.rotate(-90 * Math.PI / 180);
              ctx.translate(-width, height);
              ctx.scale(1, -1);
              break;
            case 8:
              canvas.width = height;
              canvas.height = width;
              ctx.translate(0, width);
              ctx.rotate(-90 * Math.PI / 180);
              break;
          }
          ctx.drawImage(img, 0, 0, width, height);
          ctx.restore();
        }
        function _create() {
          var self2 = this, contClass = "croppie-container", customViewportClass = self2.options.viewport.type ? "cr-vp-" + self2.options.viewport.type : null, boundary, img, viewport, overlay, bw, bh;
          self2.options.useCanvas = self2.options.enableOrientation || _hasExif.call(self2);
          self2.data = {};
          self2.elements = {};
          boundary = self2.elements.boundary = document.createElement("div");
          viewport = self2.elements.viewport = document.createElement("div");
          img = self2.elements.img = document.createElement("img");
          overlay = self2.elements.overlay = document.createElement("div");
          if (self2.options.useCanvas) {
            self2.elements.canvas = document.createElement("canvas");
            self2.elements.preview = self2.elements.canvas;
          } else {
            self2.elements.preview = img;
          }
          addClass(boundary, "cr-boundary");
          boundary.setAttribute("aria-dropeffect", "none");
          bw = self2.options.boundary.width;
          bh = self2.options.boundary.height;
          css(boundary, {
            width: bw + (isNaN(bw) ? "" : "px"),
            height: bh + (isNaN(bh) ? "" : "px")
          });
          addClass(viewport, "cr-viewport");
          if (customViewportClass) {
            addClass(viewport, customViewportClass);
          }
          css(viewport, {
            width: self2.options.viewport.width + "px",
            height: self2.options.viewport.height + "px"
          });
          viewport.setAttribute("tabindex", 0);
          addClass(self2.elements.preview, "cr-image");
          setAttributes(self2.elements.preview, {
            alt: "preview",
            "aria-grabbed": "false"
          });
          addClass(overlay, "cr-overlay");
          self2.element.appendChild(boundary);
          boundary.appendChild(self2.elements.preview);
          boundary.appendChild(viewport);
          boundary.appendChild(overlay);
          addClass(self2.element, contClass);
          if (self2.options.customClass) {
            addClass(self2.element, self2.options.customClass);
          }
          _initDraggable.call(this);
          if (self2.options.enableZoom) {
            _initializeZoom.call(self2);
          }
          if (self2.options.enableResize) {
            _initializeResize.call(self2);
          }
        }
        function _hasExif() {
          return this.options.enableExif && window.EXIF;
        }
        function _initializeResize() {
          var self2 = this;
          var wrap = document.createElement("div");
          var isDragging = false;
          var direction;
          var originalX;
          var originalY;
          var minSize = 50;
          var maxWidth;
          var maxHeight;
          var vr;
          var hr;
          addClass(wrap, "cr-resizer");
          css(wrap, {
            width: this.options.viewport.width + "px",
            height: this.options.viewport.height + "px"
          });
          if (this.options.resizeControls.height) {
            vr = document.createElement("div");
            addClass(vr, "cr-resizer-vertical");
            wrap.appendChild(vr);
          }
          if (this.options.resizeControls.width) {
            hr = document.createElement("div");
            addClass(hr, "cr-resizer-horisontal");
            wrap.appendChild(hr);
          }
          function mouseDown(ev) {
            if (ev.button !== void 0 && ev.button !== 0) return;
            ev.preventDefault();
            if (isDragging) {
              return;
            }
            var overlayRect = self2.elements.overlay.getBoundingClientRect();
            isDragging = true;
            originalX = ev.pageX;
            originalY = ev.pageY;
            direction = ev.currentTarget.className.indexOf("vertical") !== -1 ? "v" : "h";
            maxWidth = overlayRect.width;
            maxHeight = overlayRect.height;
            if (ev.touches) {
              var touches = ev.touches[0];
              originalX = touches.pageX;
              originalY = touches.pageY;
            }
            window.addEventListener("mousemove", mouseMove);
            window.addEventListener("touchmove", mouseMove);
            window.addEventListener("mouseup", mouseUp);
            window.addEventListener("touchend", mouseUp);
            document.body.style[CSS_USERSELECT] = "none";
          }
          function mouseMove(ev) {
            var pageX = ev.pageX;
            var pageY = ev.pageY;
            ev.preventDefault();
            if (ev.touches) {
              var touches = ev.touches[0];
              pageX = touches.pageX;
              pageY = touches.pageY;
            }
            var deltaX = pageX - originalX;
            var deltaY = pageY - originalY;
            var newHeight = self2.options.viewport.height + deltaY;
            var newWidth = self2.options.viewport.width + deltaX;
            if (direction === "v" && newHeight >= minSize && newHeight <= maxHeight) {
              css(wrap, {
                height: newHeight + "px"
              });
              self2.options.boundary.height += deltaY;
              css(self2.elements.boundary, {
                height: self2.options.boundary.height + "px"
              });
              self2.options.viewport.height += deltaY;
              css(self2.elements.viewport, {
                height: self2.options.viewport.height + "px"
              });
            } else if (direction === "h" && newWidth >= minSize && newWidth <= maxWidth) {
              css(wrap, {
                width: newWidth + "px"
              });
              self2.options.boundary.width += deltaX;
              css(self2.elements.boundary, {
                width: self2.options.boundary.width + "px"
              });
              self2.options.viewport.width += deltaX;
              css(self2.elements.viewport, {
                width: self2.options.viewport.width + "px"
              });
            }
            _updateOverlay.call(self2);
            _updateZoomLimits.call(self2);
            _updateCenterPoint.call(self2);
            _triggerUpdate.call(self2);
            originalY = pageY;
            originalX = pageX;
          }
          function mouseUp() {
            isDragging = false;
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("touchmove", mouseMove);
            window.removeEventListener("mouseup", mouseUp);
            window.removeEventListener("touchend", mouseUp);
            document.body.style[CSS_USERSELECT] = "";
          }
          if (vr) {
            vr.addEventListener("mousedown", mouseDown);
            vr.addEventListener("touchstart", mouseDown);
          }
          if (hr) {
            hr.addEventListener("mousedown", mouseDown);
            hr.addEventListener("touchstart", mouseDown);
          }
          this.elements.boundary.appendChild(wrap);
        }
        function _setZoomerVal(v) {
          if (this.options.enableZoom) {
            var z = this.elements.zoomer, val = fix(v, 4);
            z.value = Math.max(
              parseFloat(z.min),
              Math.min(parseFloat(z.max), val)
            ).toString();
          }
        }
        function _initializeZoom() {
          var self2 = this, wrap = self2.elements.zoomerWrap = document.createElement("div"), zoomer = self2.elements.zoomer = document.createElement("input");
          addClass(wrap, "cr-slider-wrap");
          addClass(zoomer, "cr-slider");
          zoomer.type = "range";
          zoomer.step = "0.0001";
          zoomer.value = "1";
          zoomer.style.display = self2.options.showZoomer ? "" : "none";
          zoomer.setAttribute("aria-label", "zoom");
          self2.element.appendChild(wrap);
          wrap.appendChild(zoomer);
          self2._currentZoom = 1;
          function change() {
            _onZoom.call(self2, {
              value: parseFloat(zoomer.value),
              origin: new TransformOrigin(self2.elements.preview),
              viewportRect: self2.elements.viewport.getBoundingClientRect(),
              transform: Transform.parse(self2.elements.preview)
            });
          }
          function scroll(ev) {
            var delta, targetZoom;
            if (self2.options.mouseWheelZoom === "ctrl" && ev.ctrlKey !== true) {
              return 0;
            } else if (ev.wheelDelta) {
              delta = ev.wheelDelta / 1200;
            } else if (ev.deltaY) {
              delta = ev.deltaY / 1060;
            } else if (ev.detail) {
              delta = ev.detail / -60;
            } else {
              delta = 0;
            }
            targetZoom = self2._currentZoom + delta * self2._currentZoom;
            ev.preventDefault();
            _setZoomerVal.call(self2, targetZoom);
            change.call(self2);
          }
          self2.elements.zoomer.addEventListener("input", change);
          self2.elements.zoomer.addEventListener("change", change);
          if (self2.options.mouseWheelZoom) {
            self2.elements.boundary.addEventListener("mousewheel", scroll);
            self2.elements.boundary.addEventListener("DOMMouseScroll", scroll);
          }
        }
        function _onZoom(ui) {
          var self2 = this, transform = ui ? ui.transform : Transform.parse(self2.elements.preview), vpRect = ui ? ui.viewportRect : self2.elements.viewport.getBoundingClientRect(), origin = ui ? ui.origin : new TransformOrigin(self2.elements.preview);
          function applyCss() {
            var transCss = {};
            transCss[CSS_TRANSFORM] = transform.toString();
            transCss[CSS_TRANS_ORG] = origin.toString();
            css(self2.elements.preview, transCss);
          }
          self2._currentZoom = ui ? ui.value : self2._currentZoom;
          transform.scale = self2._currentZoom;
          self2.elements.zoomer.setAttribute("aria-valuenow", self2._currentZoom);
          applyCss();
          if (self2.options.enforceBoundary) {
            var boundaries = _getVirtualBoundaries.call(self2, vpRect), transBoundaries = boundaries.translate, oBoundaries = boundaries.origin;
            if (transform.x >= transBoundaries.maxX) {
              origin.x = oBoundaries.minX;
              transform.x = transBoundaries.maxX;
            }
            if (transform.x <= transBoundaries.minX) {
              origin.x = oBoundaries.maxX;
              transform.x = transBoundaries.minX;
            }
            if (transform.y >= transBoundaries.maxY) {
              origin.y = oBoundaries.minY;
              transform.y = transBoundaries.maxY;
            }
            if (transform.y <= transBoundaries.minY) {
              origin.y = oBoundaries.maxY;
              transform.y = transBoundaries.minY;
            }
          }
          applyCss();
          _debouncedOverlay.call(self2);
          _triggerUpdate.call(self2);
        }
        function _getVirtualBoundaries(viewport) {
          var self2 = this, scale = self2._currentZoom, vpWidth = viewport.width, vpHeight = viewport.height, centerFromBoundaryX = self2.elements.boundary.clientWidth / 2, centerFromBoundaryY = self2.elements.boundary.clientHeight / 2, imgRect = self2.elements.preview.getBoundingClientRect(), curImgWidth = imgRect.width, curImgHeight = imgRect.height, halfWidth = vpWidth / 2, halfHeight = vpHeight / 2;
          var maxX = (halfWidth / scale - centerFromBoundaryX) * -1;
          var minX = maxX - (curImgWidth * (1 / scale) - vpWidth * (1 / scale));
          var maxY = (halfHeight / scale - centerFromBoundaryY) * -1;
          var minY = maxY - (curImgHeight * (1 / scale) - vpHeight * (1 / scale));
          var originMinX = 1 / scale * halfWidth;
          var originMaxX = curImgWidth * (1 / scale) - originMinX;
          var originMinY = 1 / scale * halfHeight;
          var originMaxY = curImgHeight * (1 / scale) - originMinY;
          return {
            translate: {
              maxX,
              minX,
              maxY,
              minY
            },
            origin: {
              maxX: originMaxX,
              minX: originMinX,
              maxY: originMaxY,
              minY: originMinY
            }
          };
        }
        function _updateCenterPoint(rotate) {
          var self2 = this, scale = self2._currentZoom, data = self2.elements.preview.getBoundingClientRect(), vpData = self2.elements.viewport.getBoundingClientRect(), transform = Transform.parse(self2.elements.preview.style[CSS_TRANSFORM]), pc = new TransformOrigin(self2.elements.preview), top = vpData.top - data.top + vpData.height / 2, left = vpData.left - data.left + vpData.width / 2, center = {}, adj = {};
          if (rotate) {
            var cx = pc.x;
            var cy = pc.y;
            var tx = transform.x;
            var ty = transform.y;
            center.y = cx;
            center.x = cy;
            transform.y = tx;
            transform.x = ty;
          } else {
            center.y = top / scale;
            center.x = left / scale;
            adj.y = (center.y - pc.y) * (1 - scale);
            adj.x = (center.x - pc.x) * (1 - scale);
            transform.x -= adj.x;
            transform.y -= adj.y;
          }
          var newCss = {};
          newCss[CSS_TRANS_ORG] = center.x + "px " + center.y + "px";
          newCss[CSS_TRANSFORM] = transform.toString();
          css(self2.elements.preview, newCss);
        }
        function _initDraggable() {
          var self2 = this, isDragging = false, originalX, originalY, originalDistance, vpRect, transform;
          function assignTransformCoordinates(deltaX, deltaY) {
            var imgRect = self2.elements.preview.getBoundingClientRect(), top = transform.y + deltaY, left = transform.x + deltaX;
            if (self2.options.enforceBoundary) {
              if (vpRect.top > imgRect.top + deltaY && vpRect.bottom < imgRect.bottom + deltaY) {
                transform.y = top;
              }
              if (vpRect.left > imgRect.left + deltaX && vpRect.right < imgRect.right + deltaX) {
                transform.x = left;
              }
            } else {
              transform.y = top;
              transform.x = left;
            }
          }
          function toggleGrabState(isDragging2) {
            self2.elements.preview.setAttribute("aria-grabbed", isDragging2);
            self2.elements.boundary.setAttribute(
              "aria-dropeffect",
              isDragging2 ? "move" : "none"
            );
          }
          function keyDown(ev) {
            var LEFT_ARROW = 37, UP_ARROW = 38, RIGHT_ARROW = 39, DOWN_ARROW = 40;
            if (ev.shiftKey && (ev.keyCode === UP_ARROW || ev.keyCode === DOWN_ARROW)) {
              var zoom;
              if (ev.keyCode === UP_ARROW) {
                zoom = parseFloat(self2.elements.zoomer.value) + parseFloat(self2.elements.zoomer.step);
              } else {
                zoom = parseFloat(self2.elements.zoomer.value) - parseFloat(self2.elements.zoomer.step);
              }
              self2.setZoom(zoom);
            } else if (self2.options.enableKeyMovement && ev.keyCode >= 37 && ev.keyCode <= 40) {
              ev.preventDefault();
              var movement = parseKeyDown(ev.keyCode);
              transform = Transform.parse(self2.elements.preview);
              document.body.style[CSS_USERSELECT] = "none";
              vpRect = self2.elements.viewport.getBoundingClientRect();
              keyMove(movement);
            }
            function parseKeyDown(key) {
              switch (key) {
                case LEFT_ARROW:
                  return [1, 0];
                case UP_ARROW:
                  return [0, 1];
                case RIGHT_ARROW:
                  return [-1, 0];
                case DOWN_ARROW:
                  return [0, -1];
              }
            }
          }
          function keyMove(movement) {
            var deltaX = movement[0], deltaY = movement[1], newCss = {};
            assignTransformCoordinates(deltaX, deltaY);
            newCss[CSS_TRANSFORM] = transform.toString();
            css(self2.elements.preview, newCss);
            _updateOverlay.call(self2);
            document.body.style[CSS_USERSELECT] = "";
            _updateCenterPoint.call(self2);
            _triggerUpdate.call(self2);
            originalDistance = 0;
          }
          function mouseDown(ev) {
            if (ev.button !== void 0 && ev.button !== 0) return;
            ev.preventDefault();
            if (isDragging) return;
            isDragging = true;
            originalX = ev.pageX;
            originalY = ev.pageY;
            if (ev.touches) {
              var touches = ev.touches[0];
              originalX = touches.pageX;
              originalY = touches.pageY;
            }
            toggleGrabState(isDragging);
            transform = Transform.parse(self2.elements.preview);
            window.addEventListener("mousemove", mouseMove);
            window.addEventListener("touchmove", mouseMove);
            window.addEventListener("mouseup", mouseUp);
            window.addEventListener("touchend", mouseUp);
            document.body.style[CSS_USERSELECT] = "none";
            vpRect = self2.elements.viewport.getBoundingClientRect();
          }
          function mouseMove(ev) {
            ev.preventDefault();
            var pageX = ev.pageX, pageY = ev.pageY;
            if (ev.touches) {
              var touches = ev.touches[0];
              pageX = touches.pageX;
              pageY = touches.pageY;
            }
            var deltaX = pageX - originalX, deltaY = pageY - originalY, newCss = {};
            if (ev.type === "touchmove") {
              if (ev.touches.length > 1) {
                var touch1 = ev.touches[0];
                var touch2 = ev.touches[1];
                var dist = Math.sqrt(
                  (touch1.pageX - touch2.pageX) * (touch1.pageX - touch2.pageX) + (touch1.pageY - touch2.pageY) * (touch1.pageY - touch2.pageY)
                );
                if (!originalDistance) {
                  originalDistance = dist / self2._currentZoom;
                }
                var scale = dist / originalDistance;
                _setZoomerVal.call(self2, scale);
                dispatchChange(self2.elements.zoomer);
                return;
              }
            }
            assignTransformCoordinates(deltaX, deltaY);
            newCss[CSS_TRANSFORM] = transform.toString();
            css(self2.elements.preview, newCss);
            _updateOverlay.call(self2);
            originalY = pageY;
            originalX = pageX;
          }
          function mouseUp() {
            isDragging = false;
            toggleGrabState(isDragging);
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("touchmove", mouseMove);
            window.removeEventListener("mouseup", mouseUp);
            window.removeEventListener("touchend", mouseUp);
            document.body.style[CSS_USERSELECT] = "";
            _updateCenterPoint.call(self2);
            _triggerUpdate.call(self2);
            originalDistance = 0;
          }
          self2.elements.overlay.addEventListener("mousedown", mouseDown);
          self2.elements.viewport.addEventListener("keydown", keyDown);
          self2.elements.overlay.addEventListener("touchstart", mouseDown);
        }
        function _updateOverlay() {
          if (!this.elements) return;
          var self2 = this, boundRect = self2.elements.boundary.getBoundingClientRect(), imgData = self2.elements.preview.getBoundingClientRect();
          css(self2.elements.overlay, {
            width: imgData.width + "px",
            height: imgData.height + "px",
            top: imgData.top - boundRect.top + "px",
            left: imgData.left - boundRect.left + "px"
          });
        }
        var _debouncedOverlay = debounce(_updateOverlay, 500);
        function _triggerUpdate() {
          var self2 = this, data = self2.get();
          if (!_isVisible.call(self2)) {
            return;
          }
          self2.options.update.call(self2, data);
          if (self2.$ && typeof Prototype === "undefined") {
            self2.$(self2.element).trigger("update.croppie", data);
          } else {
            var ev;
            if (window.CustomEvent) {
              ev = new CustomEvent("update", { detail: data });
            } else {
              ev = document.createEvent("CustomEvent");
              ev.initCustomEvent("update", true, true, data);
            }
            self2.element.dispatchEvent(ev);
          }
        }
        function _isVisible() {
          return this.elements.preview.offsetHeight > 0 && this.elements.preview.offsetWidth > 0;
        }
        function _updatePropertiesFromImage() {
          var self2 = this, initialZoom = 1, cssReset = {}, img = self2.elements.preview, imgData, transformReset = new Transform(0, 0, initialZoom), originReset = new TransformOrigin(), isVisible = _isVisible.call(self2);
          if (!isVisible || self2.data.bound) {
            return;
          }
          self2.data.bound = true;
          cssReset[CSS_TRANSFORM] = transformReset.toString();
          cssReset[CSS_TRANS_ORG] = originReset.toString();
          cssReset["opacity"] = 1;
          css(img, cssReset);
          imgData = self2.elements.preview.getBoundingClientRect();
          self2._originalImageWidth = imgData.width;
          self2._originalImageHeight = imgData.height;
          self2.data.orientation = _hasExif.call(self2) ? getExifOrientation(self2.elements.img) : self2.data.orientation;
          if (self2.options.enableZoom) {
            _updateZoomLimits.call(self2, true);
          } else {
            self2._currentZoom = initialZoom;
          }
          transformReset.scale = self2._currentZoom;
          cssReset[CSS_TRANSFORM] = transformReset.toString();
          css(img, cssReset);
          if (self2.data.points.length) {
            _bindPoints.call(self2, self2.data.points);
          } else {
            _centerImage.call(self2);
          }
          _updateCenterPoint.call(self2);
          _updateOverlay.call(self2);
        }
        function _updateZoomLimits(initial) {
          var self2 = this, minZoom = Math.max(self2.options.minZoom, 0) || 0, maxZoom = self2.options.maxZoom || 1.5, initialZoom, defaultInitialZoom, zoomer = self2.elements.zoomer, scale = parseFloat(zoomer.value), boundaryData = self2.elements.boundary.getBoundingClientRect(), imgData = naturalImageDimensions(
            self2.elements.img,
            self2.data.orientation
          ), vpData = self2.elements.viewport.getBoundingClientRect(), minW, minH;
          if (self2.options.enforceBoundary) {
            minW = vpData.width / imgData.width;
            minH = vpData.height / imgData.height;
            minZoom = Math.max(minW, minH);
          }
          if (minZoom >= maxZoom) {
            maxZoom = minZoom + 1;
          }
          zoomer.min = fix(minZoom, 4);
          zoomer.max = fix(maxZoom, 4);
          if (!initial && (scale < zoomer.min || scale > zoomer.max)) {
            _setZoomerVal.call(self2, scale < zoomer.min ? zoomer.min : zoomer.max);
          } else if (initial) {
            defaultInitialZoom = Math.max(
              boundaryData.width / imgData.width,
              boundaryData.height / imgData.height
            );
            initialZoom = self2.data.boundZoom !== null ? self2.data.boundZoom : defaultInitialZoom;
            _setZoomerVal.call(self2, initialZoom);
          }
          dispatchChange(zoomer);
        }
        function _bindPoints(points) {
          if (points.length !== 4) {
            throw "Croppie - Invalid number of points supplied: " + points;
          }
          var self2 = this, pointsWidth = points[2] - points[0], vpData = self2.elements.viewport.getBoundingClientRect(), boundRect = self2.elements.boundary.getBoundingClientRect(), vpOffset = {
            left: vpData.left - boundRect.left,
            top: vpData.top - boundRect.top
          }, scale = vpData.width / pointsWidth, originTop = points[1], originLeft = points[0], transformTop = -1 * points[1] + vpOffset.top, transformLeft = -1 * points[0] + vpOffset.left, newCss = {};
          newCss[CSS_TRANS_ORG] = originLeft + "px " + originTop + "px";
          newCss[CSS_TRANSFORM] = new Transform(
            transformLeft,
            transformTop,
            scale
          ).toString();
          css(self2.elements.preview, newCss);
          _setZoomerVal.call(self2, scale);
          self2._currentZoom = scale;
        }
        function _centerImage() {
          var self2 = this, imgDim = self2.elements.preview.getBoundingClientRect(), vpDim = self2.elements.viewport.getBoundingClientRect(), boundDim = self2.elements.boundary.getBoundingClientRect(), vpLeft = vpDim.left - boundDim.left, vpTop = vpDim.top - boundDim.top, w = vpLeft - (imgDim.width - vpDim.width) / 2, h = vpTop - (imgDim.height - vpDim.height) / 2, transform = new Transform(w, h, self2._currentZoom);
          css(self2.elements.preview, CSS_TRANSFORM, transform.toString());
        }
        function _transferImageToCanvas(customOrientation) {
          var self2 = this, canvas = self2.elements.canvas, img = self2.elements.img, ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          canvas.width = img.width;
          canvas.height = img.height;
          var orientation = self2.options.enableOrientation && customOrientation || getExifOrientation(img);
          drawCanvas(canvas, img, orientation);
        }
        function _getCanvas(data) {
          var self2 = this, points = data.points, left = num(points[0]), top = num(points[1]), right = num(points[2]), bottom = num(points[3]), width = right - left, height = bottom - top, circle = data.circle, canvas = document.createElement("canvas"), ctx = canvas.getContext("2d"), startX = 0, startY = 0, canvasWidth = data.outputWidth || width, canvasHeight = data.outputHeight || height;
          canvas.width = canvasWidth;
          canvas.height = canvasHeight;
          if (data.backgroundColor) {
            ctx.fillStyle = data.backgroundColor;
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
          }
          var sx = left, sy = top, sWidth = width, sHeight = height, dx = 0, dy = 0, dWidth = canvasWidth, dHeight = canvasHeight;
          if (left < 0) {
            sx = 0;
            dx = Math.abs(left) / width * canvasWidth;
          }
          if (sWidth + sx > self2._originalImageWidth) {
            sWidth = self2._originalImageWidth - sx;
            dWidth = sWidth / width * canvasWidth;
          }
          if (top < 0) {
            sy = 0;
            dy = Math.abs(top) / height * canvasHeight;
          }
          if (sHeight + sy > self2._originalImageHeight) {
            sHeight = self2._originalImageHeight - sy;
            dHeight = sHeight / height * canvasHeight;
          }
          ctx.drawImage(
            this.elements.preview,
            sx,
            sy,
            sWidth,
            sHeight,
            dx,
            dy,
            dWidth,
            dHeight
          );
          if (circle) {
            ctx.fillStyle = "#fff";
            ctx.globalCompositeOperation = "destination-in";
            ctx.beginPath();
            ctx.arc(
              canvas.width / 2,
              canvas.height / 2,
              canvas.width / 2,
              0,
              Math.PI * 2,
              true
            );
            ctx.closePath();
            ctx.fill();
          }
          return canvas;
        }
        function _getHtmlResult(data) {
          var points = data.points, div = document.createElement("div"), img = document.createElement("img"), width = points[2] - points[0], height = points[3] - points[1];
          addClass(div, "croppie-result");
          div.appendChild(img);
          css(img, {
            left: -1 * points[0] + "px",
            top: -1 * points[1] + "px"
          });
          img.src = data.url;
          css(div, {
            width: width + "px",
            height: height + "px"
          });
          return div;
        }
        function _getBase64Result(data) {
          return _getCanvas.call(this, data).toDataURL(data.format, data.quality);
        }
        function _getBlobResult(data) {
          var self2 = this;
          return new Promise(function(resolve) {
            _getCanvas.call(self2, data).toBlob(
              function(blob) {
                resolve(blob);
              },
              data.format,
              data.quality
            );
          });
        }
        function _replaceImage(img) {
          if (this.elements.img.parentNode) {
            Array.prototype.forEach.call(this.elements.img.classList, function(c) {
              img.classList.add(c);
            });
            this.elements.img.parentNode.replaceChild(img, this.elements.img);
            this.elements.preview = img;
          }
          this.elements.img = img;
        }
        function _bind(options, cb) {
          var self2 = this, url, points = [], zoom = null, hasExif = _hasExif.call(self2);
          if (typeof options === "string") {
            url = options;
            options = {};
          } else if (Array.isArray(options)) {
            points = options.slice();
          } else if (typeof options === "undefined" && self2.data.url) {
            _updatePropertiesFromImage.call(self2);
            _triggerUpdate.call(self2);
            return null;
          } else {
            url = options.url;
            points = options.points || [];
            zoom = typeof options.zoom === "undefined" ? null : options.zoom;
          }
          self2.data.bound = false;
          self2.data.url = url || self2.data.url;
          self2.data.boundZoom = zoom;
          return loadImage(url, hasExif).then(function(img) {
            _replaceImage.call(self2, img);
            if (!points.length) {
              var natDim = naturalImageDimensions(img);
              var rect = self2.elements.viewport.getBoundingClientRect();
              var aspectRatio = rect.width / rect.height;
              var imgAspectRatio = natDim.width / natDim.height;
              var width, height;
              if (imgAspectRatio > aspectRatio) {
                height = natDim.height;
                width = height * aspectRatio;
              } else {
                width = natDim.width;
                height = natDim.height / aspectRatio;
              }
              var x0 = (natDim.width - width) / 2;
              var y0 = (natDim.height - height) / 2;
              var x1 = x0 + width;
              var y1 = y0 + height;
              self2.data.points = [x0, y0, x1, y1];
            } else if (self2.options.relative) {
              points = [
                points[0] * img.naturalWidth / 100,
                points[1] * img.naturalHeight / 100,
                points[2] * img.naturalWidth / 100,
                points[3] * img.naturalHeight / 100
              ];
            }
            self2.data.orientation = options.orientation || 1;
            self2.data.points = points.map(function(p) {
              return parseFloat(p);
            });
            if (self2.options.useCanvas) {
              _transferImageToCanvas.call(self2, self2.data.orientation);
            }
            _updatePropertiesFromImage.call(self2);
            _triggerUpdate.call(self2);
            cb && cb();
          });
        }
        function fix(v, decimalPoints) {
          return parseFloat(v).toFixed(decimalPoints || 0);
        }
        function _get() {
          var self2 = this, imgData = self2.elements.preview.getBoundingClientRect(), vpData = self2.elements.viewport.getBoundingClientRect(), x1 = vpData.left - imgData.left, y1 = vpData.top - imgData.top, widthDiff = (vpData.width - self2.elements.viewport.offsetWidth) / 2, heightDiff = (vpData.height - self2.elements.viewport.offsetHeight) / 2, x2 = x1 + self2.elements.viewport.offsetWidth + widthDiff, y2 = y1 + self2.elements.viewport.offsetHeight + heightDiff, scale = self2._currentZoom;
          if (scale === Infinity || isNaN(scale)) {
            scale = 1;
          }
          var max = self2.options.enforceBoundary ? 0 : Number.NEGATIVE_INFINITY;
          x1 = Math.max(max, x1 / scale);
          y1 = Math.max(max, y1 / scale);
          x2 = Math.max(max, x2 / scale);
          y2 = Math.max(max, y2 / scale);
          return {
            points: [fix(x1), fix(y1), fix(x2), fix(y2)],
            zoom: scale,
            orientation: self2.data.orientation
          };
        }
        var RESULT_DEFAULTS = {
          type: "canvas",
          format: "png",
          quality: 1
        }, RESULT_FORMATS = ["jpeg", "webp", "png"];
        function _result(options) {
          var self2 = this, data = _get.call(self2), opts = deepExtend(clone(RESULT_DEFAULTS), clone(options)), resultType = typeof options === "string" ? options : opts.type || "base64", size = opts.size || "viewport", format = opts.format, quality = opts.quality, backgroundColor = opts.backgroundColor, circle = typeof opts.circle === "boolean" ? opts.circle : self2.options.viewport.type === "circle", vpRect = self2.elements.viewport.getBoundingClientRect(), ratio = vpRect.width / vpRect.height, prom;
          if (size === "viewport") {
            data.outputWidth = vpRect.width;
            data.outputHeight = vpRect.height;
          } else if (typeof size === "object") {
            if (size.width && size.height) {
              data.outputWidth = size.width;
              data.outputHeight = size.height;
            } else if (size.width) {
              data.outputWidth = size.width;
              data.outputHeight = size.width / ratio;
            } else if (size.height) {
              data.outputWidth = size.height * ratio;
              data.outputHeight = size.height;
            }
          }
          if (RESULT_FORMATS.indexOf(format) > -1) {
            data.format = "image/" + format;
            data.quality = quality;
          }
          data.circle = circle;
          data.url = self2.data.url;
          data.backgroundColor = backgroundColor;
          prom = new Promise(function(resolve) {
            switch (resultType.toLowerCase()) {
              case "rawcanvas":
                resolve(_getCanvas.call(self2, data));
                break;
              case "canvas":
              case "base64":
                resolve(_getBase64Result.call(self2, data));
                break;
              case "blob":
                _getBlobResult.call(self2, data).then(resolve);
                break;
              default:
                resolve(_getHtmlResult.call(self2, data));
                break;
            }
          });
          return prom;
        }
        function _refresh() {
          _updatePropertiesFromImage.call(this);
        }
        function _rotate(deg) {
          if (!this.options.useCanvas || !this.options.enableOrientation) {
            throw "Croppie: Cannot rotate without enableOrientation && EXIF.js included";
          }
          var self2 = this, canvas = self2.elements.canvas;
          self2.data.orientation = getExifOffset(self2.data.orientation, deg);
          drawCanvas(canvas, self2.elements.img, self2.data.orientation);
          _updateCenterPoint.call(self2, true);
          _updateZoomLimits.call(self2);
          if (Math.abs(deg) / 90 % 2 === 1) {
            var oldHeight = self2._originalImageHeight;
            var oldWidth = self2._originalImageWidth;
            self2._originalImageWidth = oldHeight;
            self2._originalImageHeight = oldWidth;
          }
        }
        function _destroy() {
          var self2 = this;
          self2.element.removeChild(self2.elements.boundary);
          removeClass(self2.element, "croppie-container");
          if (self2.options.enableZoom) {
            self2.element.removeChild(self2.elements.zoomerWrap);
          }
          delete self2.elements;
        }
        if (typeof window !== "undefined" && window.jQuery) {
          var $ = window.jQuery;
          $.fn.croppie = function(opts) {
            var ot = typeof opts;
            if (ot === "string") {
              var args = Array.prototype.slice.call(arguments, 1);
              var singleInst = $(this).data("croppie");
              if (opts === "get") {
                return singleInst.get();
              } else if (opts === "result") {
                return singleInst.result.apply(singleInst, args);
              } else if (opts === "bind") {
                return singleInst.bind.apply(singleInst, args);
              }
              return this.each(function() {
                var i = $(this).data("croppie");
                if (!i) return;
                var method = i[opts];
                if ($.isFunction(method)) {
                  method.apply(i, args);
                  if (opts === "destroy") {
                    $(this).removeData("croppie");
                  }
                } else {
                  throw "Croppie " + opts + " method not found";
                }
              });
            } else {
              return this.each(function() {
                var i = new Croppie2(this, opts);
                i.$ = $;
                $(this).data("croppie", i);
              });
            }
          };
        }
        function Croppie2(element, opts) {
          if (element.className.indexOf("croppie-container") > -1) {
            throw new Error("Croppie: Can't initialize croppie more than once");
          }
          this.element = element;
          this.options = deepExtend(clone(Croppie2.defaults), opts);
          if (this.element.tagName.toLowerCase() === "img") {
            var origImage = this.element;
            addClass(origImage, "cr-original-image");
            setAttributes(origImage, { "aria-hidden": "true", alt: "" });
            var replacementDiv = document.createElement("div");
            this.element.parentNode.appendChild(replacementDiv);
            replacementDiv.appendChild(origImage);
            this.element = replacementDiv;
            this.options.url = this.options.url || origImage.src;
          }
          _create.call(this);
          if (this.options.url) {
            var bindOpts = {
              url: this.options.url,
              points: this.options.points
            };
            delete this.options["url"];
            delete this.options["points"];
            _bind.call(this, bindOpts);
          }
        }
        Croppie2.defaults = {
          viewport: {
            width: 100,
            height: 100,
            type: "square"
          },
          boundary: {},
          orientationControls: {
            enabled: true,
            leftClass: "",
            rightClass: ""
          },
          resizeControls: {
            width: true,
            height: true
          },
          customClass: "",
          showZoomer: true,
          enableZoom: true,
          enableResize: false,
          mouseWheelZoom: true,
          enableExif: false,
          enforceBoundary: true,
          enableOrientation: false,
          enableKeyMovement: true,
          update: function() {
          }
        };
        Croppie2.globals = {
          translate: "translate3d"
        };
        deepExtend(Croppie2.prototype, {
          bind: function(options, cb) {
            return _bind.call(this, options, cb);
          },
          get: function() {
            var data = _get.call(this);
            var points = data.points;
            if (this.options.relative) {
              points[0] /= this.elements.img.naturalWidth / 100;
              points[1] /= this.elements.img.naturalHeight / 100;
              points[2] /= this.elements.img.naturalWidth / 100;
              points[3] /= this.elements.img.naturalHeight / 100;
            }
            return data;
          },
          result: function(type) {
            return _result.call(this, type);
          },
          refresh: function() {
            return _refresh.call(this);
          },
          setZoom: function(v) {
            _setZoomerVal.call(this, v);
            dispatchChange(this.elements.zoomer);
          },
          rotate: function(deg) {
            _rotate.call(this, deg);
          },
          destroy: function() {
            return _destroy.call(this);
          }
        });
        return Croppie2;
      });
    }
  });

  // assets/js/index.js
  var import_htmx = __toESM(require_htmx(), 1);

  // assets/js/behaviours/hamburger.js
  function hamburgerMenu(tree = document) {
    tree.querySelectorAll("[data-hb-menu]").forEach((hbRoot) => {
      const hbBtn = hbRoot.querySelector("[data-hb-btn]");
      const hbMenu = hbRoot.querySelector("[data-hb-menu-list]");
      const isOpen = () => !hbMenu.hidden;
      function toggleMenu(open = !isOpen()) {
        if (open) {
          hbMenu.hidden = false;
          hbBtn.setAttribute("data-hb-open", "");
        } else {
          hbMenu.hidden = true;
          hbBtn.removeAttribute("data-hb-open", "");
        }
      }
      toggleMenu(isOpen());
      hbBtn.addEventListener("click", () => toggleMenu());
    });
  }

  // assets/js/behaviours/toggle-button.js
  function toggleButton(tree = document) {
    tree.querySelectorAll("[data-toggle-btn]").forEach((toggleBtn) => {
      const input = toggleBtn.querySelector("[role='switch']");
      const switchSpan = toggleBtn.querySelector("[data-toggle-btn-switch]");
      const textTrue = toggleBtn.querySelector("[data-toggle-btn-true]");
      const textFalse = toggleBtn.querySelector("[data-toggle-btn-false]");
      const isOn = () => input.checked;
      function toggle(value = isOn()) {
        if (value == true) {
          textTrue.hidden = false;
          textFalse.hidden = true;
          switchSpan.removeAttribute("data-toggle-btn-off");
        } else {
          textTrue.hidden = true;
          textFalse.hidden = false;
          switchSpan.setAttribute("data-toggle-btn-off", "");
        }
      }
      input.addEventListener("click", () => toggle());
    });
  }

  // assets/js/behaviours/flash-message.js
  function flashMessages(tree = document) {
    tree.querySelectorAll("[data-flash-msg]").forEach((elem) => {
      const closeBtn = elem.querySelector("button.flash-close");
      closeBtn.addEventListener("click", () => {
        elem.setAttribute("hidden", "");
        elem.addEventListener("animationend", () => {
          elem.remove();
        });
      });
    });
  }

  // assets/js/behaviours/modal.js
  function modal(tree = document) {
    ;
    [tree, ...tree.querySelectorAll("[data-modal]")].filter((el) => el.matches("[data-modal]")).forEach((modal2) => {
      const modalUnderlay = modal2.querySelector("[data-modal-underlay]");
      function closeModal() {
        modal2.setAttribute("hidden", "");
        modal2.addEventListener("animationend", () => {
          modal2.remove();
        });
      }
      modalUnderlay.addEventListener("click", () => closeModal());
      modal2.querySelectorAll("[data-modal-close-btn]").forEach((btn) => {
        btn.addEventListener("click", () => closeModal());
      });
    });
  }

  // assets/js/behaviours/image-preview.js
  function imagePreview(tree = document) {
    tree.querySelectorAll("[data-image-preview-form]").forEach((form) => {
      const imgInput = form.querySelector("[data-image-preview-input]");
      const imgTag = form.querySelector("[data-image-preview-img]");
      function readFile(input = imgInput) {
        if (input.files && input.files[0]) {
          const reader = new FileReader();
          reader.readAsDataURL(input.files[0]);
          reader.onload = () => {
            imgTag.setAttribute("src", reader.result);
            imgTag.removeAttribute("hidden");
          };
        }
      }
      imgInput.addEventListener("change", () => readFile());
    });
  }

  // assets/js/behaviours/avatar-modal.js
  var import_croppie = __toESM(require_croppie(), 1);
  var croppieOptions = {
    showZoomer: true,
    enableOrientation: true,
    mouseWheelZoom: "ctrl",
    viewport: {
      width: 220,
      height: 220,
      type: "circle"
    },
    boundary: {
      width: "320px",
      height: "320px"
    }
  };
  function avatarModal(tree = document) {
    tree.querySelectorAll("[data-avatar-modal-form]").forEach((form) => {
      const avatarInput = form.querySelector("[data-avatar-modal-input]");
      const croppie = form.querySelector("[data-avatar-modal-croppie]");
      const placeholder = form.querySelector("[data-avatar-modal-placeholder]");
      const submitBtn = form.querySelector("[data-avatar-modal-submit]");
      const avatarCroppie = new import_croppie.default(croppie, croppieOptions);
      const readFile = (input) => {
        if (input.files && input.files[0]) {
          const reader = new FileReader();
          reader.readAsDataURL(input.files[0]);
          reader.onload = () => {
            croppie.removeAttribute("hidden");
            placeholder.setAttribute("hidden", "");
            submitBtn.removeAttribute("disabled");
            avatarCroppie.bind({ url: reader.result });
          };
        }
      };
      avatarInput.addEventListener("change", () => readFile(avatarInput));
      document.body.addEventListener("htmx:confirm", (evt) => {
        if (!evt.detail.elt.getAttribute("data-avatar-modal-form")) return;
        evt.preventDefault();
        avatarCroppie.result("blob", "original", "png", 1, false).then((result) => {
          const imageFile = new File([result], "avatar.png", {
            type: "image/png",
            lastModified: /* @__PURE__ */ new Date()
          });
          const dt = new DataTransfer();
          dt.items.add(imageFile);
          evt.detail.elt.avatar.files = dt.files;
          evt.detail.issueRequest();
        });
      });
    });
  }

  // assets/js/index.js
  addEventListener("htmx:load", (e) => {
    hamburgerMenu(e.target);
    toggleButton(e.target);
    flashMessages(e.target);
    modal(e.target);
    imagePreview(e.target);
    avatarModal(e.target);
  });
  import_htmx.default.defineExtension("reset-on-success", {
    onEvent: (name, event) => {
      if (name !== "htmx:beforeSwap") return;
      if (event.detail.isError || event.detail.xhr.status === 422) return;
      const triggeringElt = event.detail.requestConfig.elt;
      if (!triggeringElt.closest("[hx-reset-on-success]") && !triggeringElt.closest("[data-hx-reset-on-success]"))
        return;
      switch (triggeringElt.tagName) {
        case "INPUT":
        case "TEXTAREA":
          triggeringElt.value = triggeringElt.defaultValue;
          break;
        case "SELECT":
          break;
        case "FORM":
          triggeringElt.reset();
          break;
      }
    }
  });
  window.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("htmx:beforeSwap", (evt) => {
      if (evt.detail.xhr.status === 422) {
        evt.detail.shouldSwap = true;
        evt.detail.isError = false;
      }
    });
  });
})();
/*! promise-polyfill 3.1.0 */
//# sourceMappingURL=index.js.map
