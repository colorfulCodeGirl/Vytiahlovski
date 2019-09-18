// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/macy/dist/macy.js":[function(require,module,exports) {
var define;
!function (t, n) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : t.Macy = n();
}(this, function () {
  "use strict";

  function t(t, n) {
    var e = void 0;
    return function () {
      e && clearTimeout(e), e = setTimeout(t, n);
    };
  }

  function n(t, n) {
    for (var e = t.length, r = e, o = []; e--;) o.push(n(t[r - e - 1]));

    return o;
  }

  function e(t, n) {
    var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    if (window.Promise) return A(t, n, e);
    t.recalculate(!0, !0);
  }

  function r(t) {
    for (var n = t.options, e = t.responsiveOptions, r = t.keys, o = t.docWidth, i = void 0, s = 0; s < r.length; s++) {
      var a = parseInt(r[s], 10);
      o >= a && (i = n.breakAt[a], O(i, e));
    }

    return e;
  }

  function o(t) {
    for (var n = t.options, e = t.responsiveOptions, r = t.keys, o = t.docWidth, i = void 0, s = r.length - 1; s >= 0; s--) {
      var a = parseInt(r[s], 10);
      o <= a && (i = n.breakAt[a], O(i, e));
    }

    return e;
  }

  function i(t) {
    var n = t.useContainerForBreakpoints ? t.container.clientWidth : window.innerWidth,
        e = {
      columns: t.columns
    };
    b(t.margin) ? e.margin = {
      x: t.margin.x,
      y: t.margin.y
    } : e.margin = {
      x: t.margin,
      y: t.margin
    };
    var i = Object.keys(t.breakAt);
    return t.mobileFirst ? r({
      options: t,
      responsiveOptions: e,
      keys: i,
      docWidth: n
    }) : o({
      options: t,
      responsiveOptions: e,
      keys: i,
      docWidth: n
    });
  }

  function s(t) {
    return i(t).columns;
  }

  function a(t) {
    return i(t).margin;
  }

  function c(t) {
    var n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
        e = s(t),
        r = a(t).x,
        o = 100 / e;
    if (!n) return o;
    if (1 === e) return "100%";
    var i = "px";

    if ("string" == typeof r) {
      var c = parseFloat(r);
      i = r.replace(c, ""), r = c;
    }

    return r = (e - 1) * r / e, "%" === i ? o - r + "%" : "calc(" + o + "% - " + r + i + ")";
  }

  function u(t, n) {
    var e = s(t.options),
        r = 0,
        o = void 0,
        i = void 0;
    if (1 === ++n) return 0;
    i = a(t.options).x;
    var u = "px";

    if ("string" == typeof i) {
      var l = parseFloat(i, 10);
      u = i.replace(l, ""), i = l;
    }

    return o = (i - (e - 1) * i / e) * (n - 1), r += c(t.options, !1) * (n - 1), "%" === u ? r + o + "%" : "calc(" + r + "% + " + o + u + ")";
  }

  function l(t) {
    var n = 0,
        e = t.container;
    v(t.rows, function (t) {
      n = t > n ? t : n;
    }), e.style.height = n + "px";
  }

  function p(t, n) {
    var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
        r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
        o = s(t.options),
        i = a(t.options).y;
    M(t, o, e), v(n, function (n) {
      var e = 0,
          o = parseInt(n.offsetHeight, 10);
      isNaN(o) || (t.rows.forEach(function (n, r) {
        n < t.rows[e] && (e = r);
      }), n.style.position = "absolute", n.style.top = t.rows[e] + "px", n.style.left = "" + t.cols[e], t.rows[e] += isNaN(o) ? 0 : o + i, r && (n.dataset.macyComplete = 1));
    }), r && (t.tmpRows = null), l(t);
  }

  function f(t, n) {
    var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
        r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
        o = s(t.options),
        i = a(t.options).y;
    M(t, o, e), v(n, function (n) {
      t.lastcol === o && (t.lastcol = 0);
      var e = C(n, "height");
      e = parseInt(n.offsetHeight, 10), isNaN(e) || (n.style.position = "absolute", n.style.top = t.rows[t.lastcol] + "px", n.style.left = "" + t.cols[t.lastcol], t.rows[t.lastcol] += isNaN(e) ? 0 : e + i, t.lastcol += 1, r && (n.dataset.macyComplete = 1));
    }), r && (t.tmpRows = null), l(t);
  }

  var h = function t(n, e) {
    if (!(this instanceof t)) return new t(n, e);
    if (n && n.nodeName) return n;
    if (n = n.replace(/^\s*/, "").replace(/\s*$/, ""), e) return this.byCss(n, e);

    for (var r in this.selectors) if (e = r.split("/"), new RegExp(e[1], e[2]).test(n)) return this.selectors[r](n);

    return this.byCss(n);
  };

  h.prototype.byCss = function (t, n) {
    return (n || document).querySelectorAll(t);
  }, h.prototype.selectors = {}, h.prototype.selectors[/^\.[\w\-]+$/] = function (t) {
    return document.getElementsByClassName(t.substring(1));
  }, h.prototype.selectors[/^\w+$/] = function (t) {
    return document.getElementsByTagName(t);
  }, h.prototype.selectors[/^\#[\w\-]+$/] = function (t) {
    return document.getElementById(t.substring(1));
  };

  var v = function (t, n) {
    for (var e = t.length, r = e; e--;) n(t[r - e - 1]);
  },
      m = function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    this.running = !1, this.events = [], this.add(t);
  };

  m.prototype.run = function () {
    if (!this.running && this.events.length > 0) {
      var t = this.events.shift();
      this.running = !0, t(), this.running = !1, this.run();
    }
  }, m.prototype.add = function () {
    var t = this,
        n = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    return !!n && (Array.isArray(n) ? v(n, function (n) {
      return t.add(n);
    }) : (this.events.push(n), void this.run()));
  }, m.prototype.clear = function () {
    this.events = [];
  };

  var d = function (t) {
    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return this.instance = t, this.data = n, this;
  },
      y = function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    this.events = {}, this.instance = t;
  };

  y.prototype.on = function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
        n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    return !(!t || !n) && (Array.isArray(this.events[t]) || (this.events[t] = []), this.events[t].push(n));
  }, y.prototype.emit = function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
        n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    if (!t || !Array.isArray(this.events[t])) return !1;
    var e = new d(this.instance, n);
    v(this.events[t], function (t) {
      return t(e);
    });
  };

  var g = function (t) {
    return !("naturalHeight" in t && t.naturalHeight + t.naturalWidth === 0) || t.width + t.height !== 0;
  },
      E = function (t, n) {
    var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    return new Promise(function (t, e) {
      if (n.complete) return g(n) ? t(n) : e(n);
      n.addEventListener("load", function () {
        return g(n) ? t(n) : e(n);
      }), n.addEventListener("error", function () {
        return e(n);
      });
    }).then(function (n) {
      e && t.emit(t.constants.EVENT_IMAGE_LOAD, {
        img: n
      });
    }).catch(function (n) {
      return t.emit(t.constants.EVENT_IMAGE_ERROR, {
        img: n
      });
    });
  },
      w = function (t, e) {
    var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    return n(e, function (n) {
      return E(t, n, r);
    });
  },
      A = function (t, n) {
    var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    return Promise.all(w(t, n, e)).then(function () {
      t.emit(t.constants.EVENT_IMAGE_COMPLETE);
    });
  },
      I = function (n) {
    return t(function () {
      n.emit(n.constants.EVENT_RESIZE), n.queue.add(function () {
        return n.recalculate(!0, !0);
      });
    }, 100);
  },
      N = function (t) {
    if (t.container = h(t.options.container), t.container instanceof h || !t.container) return !!t.options.debug && console.error("Error: Container not found");
    t.container.length && (t.container = t.container[0]), t.options.container = t.container, t.container.style.position = "relative";
  },
      T = function (t) {
    t.queue = new m(), t.events = new y(t), t.rows = [], t.resizer = I(t);
  },
      L = function (t) {
    var n = h("img", t.container);
    window.addEventListener("resize", t.resizer), t.on(t.constants.EVENT_IMAGE_LOAD, function () {
      return t.recalculate(!1, !1);
    }), t.on(t.constants.EVENT_IMAGE_COMPLETE, function () {
      return t.recalculate(!0, !0);
    }), t.options.useOwnImageLoader || e(t, n, !t.options.waitForImages), t.emit(t.constants.EVENT_INITIALIZED);
  },
      _ = function (t) {
    N(t), T(t), L(t);
  },
      b = function (t) {
    return t === Object(t) && "[object Array]" !== Object.prototype.toString.call(t);
  },
      O = function (t, n) {
    b(t) || (n.columns = t), b(t) && t.columns && (n.columns = t.columns), b(t) && t.margin && !b(t.margin) && (n.margin = {
      x: t.margin,
      y: t.margin
    }), b(t) && t.margin && b(t.margin) && t.margin.x && (n.margin.x = t.margin.x), b(t) && t.margin && b(t.margin) && t.margin.y && (n.margin.y = t.margin.y);
  },
      C = function (t, n) {
    return window.getComputedStyle(t, null).getPropertyValue(n);
  },
      M = function (t, n) {
    var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];

    if (t.lastcol || (t.lastcol = 0), t.rows.length < 1 && (e = !0), e) {
      t.rows = [], t.cols = [], t.lastcol = 0;

      for (var r = n - 1; r >= 0; r--) t.rows[r] = 0, t.cols[r] = u(t, r);
    } else if (t.tmpRows) {
      t.rows = [];

      for (var r = n - 1; r >= 0; r--) t.rows[r] = t.tmpRows[r];
    } else {
      t.tmpRows = [];

      for (var r = n - 1; r >= 0; r--) t.tmpRows[r] = t.rows[r];
    }
  },
      V = function (t) {
    var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
        e = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
        r = n ? t.container.children : h(':scope > *:not([data-macy-complete="1"])', t.container);
    r = Array.from(r).filter(function (t) {
      return null !== t.offsetParent;
    });
    var o = c(t.options);
    return v(r, function (t) {
      n && (t.dataset.macyComplete = 0), t.style.width = o;
    }), t.options.trueOrder ? (f(t, r, n, e), t.emit(t.constants.EVENT_RECALCULATED)) : (p(t, r, n, e), t.emit(t.constants.EVENT_RECALCULATED));
  },
      R = function () {
    return !!window.Promise;
  },
      x = Object.assign || function (t) {
    for (var n = 1; n < arguments.length; n++) {
      var e = arguments[n];

      for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    }

    return t;
  };

  Array.from || (Array.from = function (t) {
    for (var n = 0, e = []; n < t.length;) e.push(t[n++]);

    return e;
  });
  var k = {
    columns: 4,
    margin: 2,
    trueOrder: !1,
    waitForImages: !1,
    useImageLoader: !0,
    breakAt: {},
    useOwnImageLoader: !1,
    onInit: !1,
    cancelLegacy: !1,
    useContainerForBreakpoints: !1
  };
  !function () {
    try {
      document.createElement("a").querySelector(":scope *");
    } catch (t) {
      !function () {
        function t(t) {
          return function (e) {
            if (e && n.test(e)) {
              var r = this.getAttribute("id");
              r || (this.id = "q" + Math.floor(9e6 * Math.random()) + 1e6), arguments[0] = e.replace(n, "#" + this.id);
              var o = t.apply(this, arguments);
              return null === r ? this.removeAttribute("id") : r || (this.id = r), o;
            }

            return t.apply(this, arguments);
          };
        }

        var n = /:scope\b/gi,
            e = t(Element.prototype.querySelector);

        Element.prototype.querySelector = function (t) {
          return e.apply(this, arguments);
        };

        var r = t(Element.prototype.querySelectorAll);

        Element.prototype.querySelectorAll = function (t) {
          return r.apply(this, arguments);
        };
      }();
    }
  }();

  var q = function t() {
    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : k;
    if (!(this instanceof t)) return new t(n);
    this.options = {}, x(this.options, k, n), this.options.cancelLegacy && !R() || _(this);
  };

  return q.init = function (t) {
    return console.warn("Depreciated: Macy.init will be removed in v3.0.0 opt to use Macy directly like so Macy({ /*options here*/ }) "), new q(t);
  }, q.prototype.recalculateOnImageLoad = function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    return e(this, h("img", this.container), !t);
  }, q.prototype.runOnImageLoad = function (t) {
    var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
        r = h("img", this.container);
    return this.on(this.constants.EVENT_IMAGE_COMPLETE, t), n && this.on(this.constants.EVENT_IMAGE_LOAD, t), e(this, r, n);
  }, q.prototype.recalculate = function () {
    var t = this,
        n = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
        e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    return e && this.queue.clear(), this.queue.add(function () {
      return V(t, n, e);
    });
  }, q.prototype.remove = function () {
    window.removeEventListener("resize", this.resizer), v(this.container.children, function (t) {
      t.removeAttribute("data-macy-complete"), t.removeAttribute("style");
    }), this.container.removeAttribute("style");
  }, q.prototype.reInit = function () {
    this.recalculate(!0, !0), this.emit(this.constants.EVENT_INITIALIZED), window.addEventListener("resize", this.resizer), this.container.style.position = "relative";
  }, q.prototype.on = function (t, n) {
    this.events.on(t, n);
  }, q.prototype.emit = function (t, n) {
    this.events.emit(t, n);
  }, q.constants = {
    EVENT_INITIALIZED: "macy.initialized",
    EVENT_RECALCULATED: "macy.recalculated",
    EVENT_IMAGE_LOAD: "macy.image.load",
    EVENT_IMAGE_ERROR: "macy.image.error",
    EVENT_IMAGE_COMPLETE: "macy.images.complete",
    EVENT_RESIZE: "macy.resize"
  }, q.prototype.constants = q.constants, q;
});
},{}],"main.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var Macy = require("macy");
/*
Trapping tabKey inside open menu
*/


var hamburgerMenu = document.querySelector('.hamburger-menu');
var menu = document.querySelector('nav');
var main = document.querySelector('main');

var hideWhenMenuOpen = _toConsumableArray(document.querySelectorAll('main a, main button, footer a, footer button'));

var trapTabKey = function trapTabKey() {
  if (menu.getAttribute('aria-hidden') == 'true') {
    hideWhenMenuOpen.forEach(function (elem) {
      return elem.setAttribute('tabindex', -1);
    });
    menu.setAttribute('aria-hidden', 'false');
  } else {
    hideWhenMenuOpen.forEach(function (elem) {
      return elem.setAttribute('tabindex', 0);
    });
    menu.setAttribute('aria-hidden', 'true');
  }
};

var scrollToSection = function scrollToSection(e) {
  if (e.target.classList[1]) {
    var scrollTargetClass = "#".concat(e.target.classList[1]);
    var scrollTarget = document.querySelector(scrollTargetClass);
    scrollTarget.scrollIntoView({
      block: 'center',
      behavior: 'smooth'
    });
  }
};

var openCloseMenu = function openCloseMenu(e) {
  e.preventDefault();
  hamburgerMenu.classList.toggle('close');
  menu.classList.toggle('active');
  trapTabKey();
  scrollToSection(e);
};

menu.addEventListener('click', openCloseMenu);
hamburgerMenu.addEventListener('click', openCloseMenu);
/*
Macy - making collage in work section
*/

var macyTetiana = Macy({
  container: '#works-tetiana',
  margin: 2,
  columns: 3
});
},{"macy":"node_modules/macy/dist/macy.js"}],"C:/Users/Vanilla/AppData/Roaming/nvm/v11.13.0/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60581" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/Vanilla/AppData/Roaming/nvm/v11.13.0/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map