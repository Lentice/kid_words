(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l$1 = Symbol.for("react.element"), n$1 = Symbol.for("react.portal"), p$2 = Symbol.for("react.fragment"), q$1 = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v$1 = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z$1 = Symbol.iterator;
function A$1(a) {
  if (null === a || "object" !== typeof a) return null;
  a = z$1 && a[z$1] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var B$1 = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C$1 = Object.assign, D$1 = {};
function E$1(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e || B$1;
}
E$1.prototype.isReactComponent = {};
E$1.prototype.setState = function(a, b) {
  if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a, b, "setState");
};
E$1.prototype.forceUpdate = function(a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function F() {
}
F.prototype = E$1.prototype;
function G$1(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e || B$1;
}
var H$1 = G$1.prototype = new F();
H$1.constructor = G$1;
C$1(H$1, E$1.prototype);
H$1.isPureReactComponent = true;
var I$1 = Array.isArray, J = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$1 = { key: true, ref: true, __self: true, __source: true };
function M$1(a, b, e) {
  var d, c = {}, k2 = null, h = null;
  if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k2 = "" + b.key), b) J.call(b, d) && !L$1.hasOwnProperty(d) && (c[d] = b[d]);
  var g = arguments.length - 2;
  if (1 === g) c.children = e;
  else if (1 < g) {
    for (var f2 = Array(g), m2 = 0; m2 < g; m2++) f2[m2] = arguments[m2 + 2];
    c.children = f2;
  }
  if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
  return { $$typeof: l$1, type: a, key: k2, ref: h, props: c, _owner: K$1.current };
}
function N$1(a, b) {
  return { $$typeof: l$1, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
}
function O$1(a) {
  return "object" === typeof a && null !== a && a.$$typeof === l$1;
}
function escape(a) {
  var b = { "=": "=0", ":": "=2" };
  return "$" + a.replace(/[=:]/g, function(a2) {
    return b[a2];
  });
}
var P$1 = /\/+/g;
function Q$1(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}
function R$1(a, b, e, d, c) {
  var k2 = typeof a;
  if ("undefined" === k2 || "boolean" === k2) a = null;
  var h = false;
  if (null === a) h = true;
  else switch (k2) {
    case "string":
    case "number":
      h = true;
      break;
    case "object":
      switch (a.$$typeof) {
        case l$1:
        case n$1:
          h = true;
      }
  }
  if (h) return h = a, c = c(h), a = "" === d ? "." + Q$1(h, 0) : d, I$1(c) ? (e = "", null != a && (e = a.replace(P$1, "$&/") + "/"), R$1(c, b, e, "", function(a2) {
    return a2;
  })) : null != c && (O$1(c) && (c = N$1(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P$1, "$&/") + "/") + a)), b.push(c)), 1;
  h = 0;
  d = "" === d ? "." : d + ":";
  if (I$1(a)) for (var g = 0; g < a.length; g++) {
    k2 = a[g];
    var f2 = d + Q$1(k2, g);
    h += R$1(k2, b, e, f2, c);
  }
  else if (f2 = A$1(a), "function" === typeof f2) for (a = f2.call(a), g = 0; !(k2 = a.next()).done; ) k2 = k2.value, f2 = d + Q$1(k2, g++), h += R$1(k2, b, e, f2, c);
  else if ("object" === k2) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
  return h;
}
function S$1(a, b, e) {
  if (null == a) return a;
  var d = [], c = 0;
  R$1(a, d, "", "", function(a2) {
    return b.call(e, a2, c++);
  });
  return d;
}
function T$1(a) {
  if (-1 === a._status) {
    var b = a._result;
    b = b();
    b.then(function(b2) {
      if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
    }, function(b2) {
      if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
    });
    -1 === a._status && (a._status = 0, a._result = b);
  }
  if (1 === a._status) return a._result.default;
  throw a._result;
}
var U$1 = { current: null }, V$1 = { transition: null }, W$1 = { ReactCurrentDispatcher: U$1, ReactCurrentBatchConfig: V$1, ReactCurrentOwner: K$1 };
function X$1() {
  throw Error("act(...) is not supported in production builds of React.");
}
react_production_min.Children = { map: S$1, forEach: function(a, b, e) {
  S$1(a, function() {
    b.apply(this, arguments);
  }, e);
}, count: function(a) {
  var b = 0;
  S$1(a, function() {
    b++;
  });
  return b;
}, toArray: function(a) {
  return S$1(a, function(a2) {
    return a2;
  }) || [];
}, only: function(a) {
  if (!O$1(a)) throw Error("React.Children.only expected to receive a single React element child.");
  return a;
} };
react_production_min.Component = E$1;
react_production_min.Fragment = p$2;
react_production_min.Profiler = r;
react_production_min.PureComponent = G$1;
react_production_min.StrictMode = q$1;
react_production_min.Suspense = w;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$1;
react_production_min.act = X$1;
react_production_min.cloneElement = function(a, b, e) {
  if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
  var d = C$1({}, a.props), c = a.key, k2 = a.ref, h = a._owner;
  if (null != b) {
    void 0 !== b.ref && (k2 = b.ref, h = K$1.current);
    void 0 !== b.key && (c = "" + b.key);
    if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
    for (f2 in b) J.call(b, f2) && !L$1.hasOwnProperty(f2) && (d[f2] = void 0 === b[f2] && void 0 !== g ? g[f2] : b[f2]);
  }
  var f2 = arguments.length - 2;
  if (1 === f2) d.children = e;
  else if (1 < f2) {
    g = Array(f2);
    for (var m2 = 0; m2 < f2; m2++) g[m2] = arguments[m2 + 2];
    d.children = g;
  }
  return { $$typeof: l$1, type: a.type, key: c, ref: k2, props: d, _owner: h };
};
react_production_min.createContext = function(a) {
  a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a.Provider = { $$typeof: t, _context: a };
  return a.Consumer = a;
};
react_production_min.createElement = M$1;
react_production_min.createFactory = function(a) {
  var b = M$1.bind(null, a);
  b.type = a;
  return b;
};
react_production_min.createRef = function() {
  return { current: null };
};
react_production_min.forwardRef = function(a) {
  return { $$typeof: v$1, render: a };
};
react_production_min.isValidElement = O$1;
react_production_min.lazy = function(a) {
  return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T$1 };
};
react_production_min.memo = function(a, b) {
  return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
};
react_production_min.startTransition = function(a) {
  var b = V$1.transition;
  V$1.transition = {};
  try {
    a();
  } finally {
    V$1.transition = b;
  }
};
react_production_min.unstable_act = X$1;
react_production_min.useCallback = function(a, b) {
  return U$1.current.useCallback(a, b);
};
react_production_min.useContext = function(a) {
  return U$1.current.useContext(a);
};
react_production_min.useDebugValue = function() {
};
react_production_min.useDeferredValue = function(a) {
  return U$1.current.useDeferredValue(a);
};
react_production_min.useEffect = function(a, b) {
  return U$1.current.useEffect(a, b);
};
react_production_min.useId = function() {
  return U$1.current.useId();
};
react_production_min.useImperativeHandle = function(a, b, e) {
  return U$1.current.useImperativeHandle(a, b, e);
};
react_production_min.useInsertionEffect = function(a, b) {
  return U$1.current.useInsertionEffect(a, b);
};
react_production_min.useLayoutEffect = function(a, b) {
  return U$1.current.useLayoutEffect(a, b);
};
react_production_min.useMemo = function(a, b) {
  return U$1.current.useMemo(a, b);
};
react_production_min.useReducer = function(a, b, e) {
  return U$1.current.useReducer(a, b, e);
};
react_production_min.useRef = function(a) {
  return U$1.current.useRef(a);
};
react_production_min.useState = function(a) {
  return U$1.current.useState(a);
};
react_production_min.useSyncExternalStore = function(a, b, e) {
  return U$1.current.useSyncExternalStore(a, b, e);
};
react_production_min.useTransition = function() {
  return U$1.current.useTransition();
};
react_production_min.version = "18.3.1";
{
  react.exports = react_production_min;
}
var reactExports = react.exports;
const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = reactExports, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m$1 = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$1 = { key: true, ref: true, __self: true, __source: true };
function q(c, a, g) {
  var b, d = {}, e = null, h = null;
  void 0 !== g && (e = "" + g);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (h = a.ref);
  for (b in a) m$1.call(a, b) && !p$1.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
  return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
}
reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
var jsxRuntimeExports = jsxRuntime.exports;
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports$1) {
  function f2(a, b) {
    var c = a.length;
    a.push(b);
    a: for (; 0 < c; ) {
      var d = c - 1 >>> 1, e = a[d];
      if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;
      else break a;
    }
  }
  function h(a) {
    return 0 === a.length ? null : a[0];
  }
  function k2(a) {
    if (0 === a.length) return null;
    var b = a[0], c = a.pop();
    if (c !== b) {
      a[0] = c;
      a: for (var d = 0, e = a.length, w2 = e >>> 1; d < w2; ) {
        var m2 = 2 * (d + 1) - 1, C2 = a[m2], n2 = m2 + 1, x2 = a[n2];
        if (0 > g(C2, c)) n2 < e && 0 > g(x2, C2) ? (a[d] = x2, a[n2] = c, d = n2) : (a[d] = C2, a[m2] = c, d = m2);
        else if (n2 < e && 0 > g(x2, c)) a[d] = x2, a[n2] = c, d = n2;
        else break a;
      }
    }
    return b;
  }
  function g(a, b) {
    var c = a.sortIndex - b.sortIndex;
    return 0 !== c ? c : a.id - b.id;
  }
  if ("object" === typeof performance && "function" === typeof performance.now) {
    var l2 = performance;
    exports$1.unstable_now = function() {
      return l2.now();
    };
  } else {
    var p2 = Date, q2 = p2.now();
    exports$1.unstable_now = function() {
      return p2.now() - q2;
    };
  }
  var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
  "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function G2(a) {
    for (var b = h(t2); null !== b; ) {
      if (null === b.callback) k2(t2);
      else if (b.startTime <= a) k2(t2), b.sortIndex = b.expirationTime, f2(r2, b);
      else break;
      b = h(t2);
    }
  }
  function H2(a) {
    B2 = false;
    G2(a);
    if (!A2) if (null !== h(r2)) A2 = true, I2(J2);
    else {
      var b = h(t2);
      null !== b && K2(H2, b.startTime - a);
    }
  }
  function J2(a, b) {
    A2 = false;
    B2 && (B2 = false, E2(L2), L2 = -1);
    z2 = true;
    var c = y2;
    try {
      G2(b);
      for (v2 = h(r2); null !== v2 && (!(v2.expirationTime > b) || a && !M2()); ) {
        var d = v2.callback;
        if ("function" === typeof d) {
          v2.callback = null;
          y2 = v2.priorityLevel;
          var e = d(v2.expirationTime <= b);
          b = exports$1.unstable_now();
          "function" === typeof e ? v2.callback = e : v2 === h(r2) && k2(r2);
          G2(b);
        } else k2(r2);
        v2 = h(r2);
      }
      if (null !== v2) var w2 = true;
      else {
        var m2 = h(t2);
        null !== m2 && K2(H2, m2.startTime - b);
        w2 = false;
      }
      return w2;
    } finally {
      v2 = null, y2 = c, z2 = false;
    }
  }
  var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
  function M2() {
    return exports$1.unstable_now() - Q2 < P2 ? false : true;
  }
  function R2() {
    if (null !== O2) {
      var a = exports$1.unstable_now();
      Q2 = a;
      var b = true;
      try {
        b = O2(true, a);
      } finally {
        b ? S2() : (N2 = false, O2 = null);
      }
    } else N2 = false;
  }
  var S2;
  if ("function" === typeof F2) S2 = function() {
    F2(R2);
  };
  else if ("undefined" !== typeof MessageChannel) {
    var T2 = new MessageChannel(), U2 = T2.port2;
    T2.port1.onmessage = R2;
    S2 = function() {
      U2.postMessage(null);
    };
  } else S2 = function() {
    D2(R2, 0);
  };
  function I2(a) {
    O2 = a;
    N2 || (N2 = true, S2());
  }
  function K2(a, b) {
    L2 = D2(function() {
      a(exports$1.unstable_now());
    }, b);
  }
  exports$1.unstable_IdlePriority = 5;
  exports$1.unstable_ImmediatePriority = 1;
  exports$1.unstable_LowPriority = 4;
  exports$1.unstable_NormalPriority = 3;
  exports$1.unstable_Profiling = null;
  exports$1.unstable_UserBlockingPriority = 2;
  exports$1.unstable_cancelCallback = function(a) {
    a.callback = null;
  };
  exports$1.unstable_continueExecution = function() {
    A2 || z2 || (A2 = true, I2(J2));
  };
  exports$1.unstable_forceFrameRate = function(a) {
    0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a ? Math.floor(1e3 / a) : 5;
  };
  exports$1.unstable_getCurrentPriorityLevel = function() {
    return y2;
  };
  exports$1.unstable_getFirstCallbackNode = function() {
    return h(r2);
  };
  exports$1.unstable_next = function(a) {
    switch (y2) {
      case 1:
      case 2:
      case 3:
        var b = 3;
        break;
      default:
        b = y2;
    }
    var c = y2;
    y2 = b;
    try {
      return a();
    } finally {
      y2 = c;
    }
  };
  exports$1.unstable_pauseExecution = function() {
  };
  exports$1.unstable_requestPaint = function() {
  };
  exports$1.unstable_runWithPriority = function(a, b) {
    switch (a) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a = 3;
    }
    var c = y2;
    y2 = a;
    try {
      return b();
    } finally {
      y2 = c;
    }
  };
  exports$1.unstable_scheduleCallback = function(a, b, c) {
    var d = exports$1.unstable_now();
    "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
    switch (a) {
      case 1:
        var e = -1;
        break;
      case 2:
        e = 250;
        break;
      case 5:
        e = 1073741823;
        break;
      case 4:
        e = 1e4;
        break;
      default:
        e = 5e3;
    }
    e = c + e;
    a = { id: u2++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
    c > d ? (a.sortIndex = c, f2(t2, a), null === h(r2) && a === h(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c - d))) : (a.sortIndex = e, f2(r2, a), A2 || z2 || (A2 = true, I2(J2)));
    return a;
  };
  exports$1.unstable_shouldYield = M2;
  exports$1.unstable_wrapCallback = function(a) {
    var b = y2;
    return function() {
      var c = y2;
      y2 = b;
      try {
        return a.apply(this, arguments);
      } finally {
        y2 = c;
      }
    };
  };
})(scheduler_production_min);
{
  scheduler.exports = scheduler_production_min;
}
var schedulerExports = scheduler.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = reactExports, ca = schedulerExports;
function p(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da = /* @__PURE__ */ new Set(), ea = {};
function fa(a, b) {
  ha(a, b);
  ha(a + "Capture", b);
}
function ha(a, b) {
  ea[a] = b;
  for (a = 0; a < b.length; a++) da.add(b[a]);
}
var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
function oa(a) {
  if (ja.call(ma, a)) return true;
  if (ja.call(la, a)) return false;
  if (ka.test(a)) return ma[a] = true;
  la[a] = true;
  return false;
}
function pa(a, b, c, d) {
  if (null !== c && 0 === c.type) return false;
  switch (typeof b) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d) return false;
      if (null !== c) return !c.acceptsBooleans;
      a = a.toLowerCase().slice(0, 5);
      return "data-" !== a && "aria-" !== a;
    default:
      return false;
  }
}
function qa(a, b, c, d) {
  if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return true;
  if (d) return false;
  if (null !== c) switch (c.type) {
    case 3:
      return !b;
    case 4:
      return false === b;
    case 5:
      return isNaN(b);
    case 6:
      return isNaN(b) || 1 > b;
  }
  return false;
}
function v(a, b, c, d, e, f2, g) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
  this.attributeName = d;
  this.attributeNamespace = e;
  this.mustUseProperty = c;
  this.propertyName = a;
  this.type = b;
  this.sanitizeURL = f2;
  this.removeEmptyString = g;
}
var z = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
  z[a] = new v(a, 0, false, a, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
  var b = a[0];
  z[b] = new v(b, 1, false, a[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
  z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
  z[a] = new v(a, 2, false, a, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
  z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a) {
  z[a] = new v(a, 3, true, a, null, false, false);
});
["capture", "download"].forEach(function(a) {
  z[a] = new v(a, 4, false, a, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a) {
  z[a] = new v(a, 6, false, a, null, false, false);
});
["rowSpan", "start"].forEach(function(a) {
  z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
});
var ra = /[\-:]([a-z])/g;
function sa(a) {
  return a[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
  var b = a.replace(
    ra,
    sa
  );
  z[b] = new v(b, 1, false, a, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a) {
  z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
});
z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a) {
  z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
});
function ta(a, b, c, d) {
  var e = z.hasOwnProperty(b) ? z[b] : null;
  if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
}
var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
var Ia = Symbol.for("react.offscreen");
var Ja = Symbol.iterator;
function Ka(a) {
  if (null === a || "object" !== typeof a) return null;
  a = Ja && a[Ja] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var A = Object.assign, La;
function Ma(a) {
  if (void 0 === La) try {
    throw Error();
  } catch (c) {
    var b = c.stack.trim().match(/\n( *(at )?)/);
    La = b && b[1] || "";
  }
  return "\n" + La + a;
}
var Na = false;
function Oa(a, b) {
  if (!a || Na) return "";
  Na = true;
  var c = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b) if (b = function() {
      throw Error();
    }, Object.defineProperty(b.prototype, "props", { set: function() {
      throw Error();
    } }), "object" === typeof Reflect && Reflect.construct) {
      try {
        Reflect.construct(b, []);
      } catch (l2) {
        var d = l2;
      }
      Reflect.construct(a, [], b);
    } else {
      try {
        b.call();
      } catch (l2) {
        d = l2;
      }
      a.call(b.prototype);
    }
    else {
      try {
        throw Error();
      } catch (l2) {
        d = l2;
      }
      a();
    }
  } catch (l2) {
    if (l2 && d && "string" === typeof l2.stack) {
      for (var e = l2.stack.split("\n"), f2 = d.stack.split("\n"), g = e.length - 1, h = f2.length - 1; 1 <= g && 0 <= h && e[g] !== f2[h]; ) h--;
      for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f2[h]) {
        if (1 !== g || 1 !== h) {
          do
            if (g--, h--, 0 > h || e[g] !== f2[h]) {
              var k2 = "\n" + e[g].replace(" at new ", " at ");
              a.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a.displayName));
              return k2;
            }
          while (1 <= g && 0 <= h);
        }
        break;
      }
    }
  } finally {
    Na = false, Error.prepareStackTrace = c;
  }
  return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
}
function Pa(a) {
  switch (a.tag) {
    case 5:
      return Ma(a.type);
    case 16:
      return Ma("Lazy");
    case 13:
      return Ma("Suspense");
    case 19:
      return Ma("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a = Oa(a.type, false), a;
    case 11:
      return a = Oa(a.type.render, false), a;
    case 1:
      return a = Oa(a.type, true), a;
    default:
      return "";
  }
}
function Qa(a) {
  if (null == a) return null;
  if ("function" === typeof a) return a.displayName || a.name || null;
  if ("string" === typeof a) return a;
  switch (a) {
    case ya:
      return "Fragment";
    case wa:
      return "Portal";
    case Aa:
      return "Profiler";
    case za:
      return "StrictMode";
    case Ea:
      return "Suspense";
    case Fa:
      return "SuspenseList";
  }
  if ("object" === typeof a) switch (a.$$typeof) {
    case Ca:
      return (a.displayName || "Context") + ".Consumer";
    case Ba:
      return (a._context.displayName || "Context") + ".Provider";
    case Da:
      var b = a.render;
      a = a.displayName;
      a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
      return a;
    case Ga:
      return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
    case Ha:
      b = a._payload;
      a = a._init;
      try {
        return Qa(a(b));
      } catch (c) {
      }
  }
  return null;
}
function Ra(a) {
  var b = a.type;
  switch (a.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b.displayName || "Context") + ".Consumer";
    case 10:
      return (b._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qa(b);
    case 8:
      return b === za ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if ("function" === typeof b) return b.displayName || b.name || null;
      if ("string" === typeof b) return b;
  }
  return null;
}
function Sa(a) {
  switch (typeof a) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a;
    case "object":
      return a;
    default:
      return "";
  }
}
function Ta(a) {
  var b = a.type;
  return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
}
function Ua(a) {
  var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
  if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
    var e = c.get, f2 = c.set;
    Object.defineProperty(a, b, { configurable: true, get: function() {
      return e.call(this);
    }, set: function(a2) {
      d = "" + a2;
      f2.call(this, a2);
    } });
    Object.defineProperty(a, b, { enumerable: c.enumerable });
    return { getValue: function() {
      return d;
    }, setValue: function(a2) {
      d = "" + a2;
    }, stopTracking: function() {
      a._valueTracker = null;
      delete a[b];
    } };
  }
}
function Va(a) {
  a._valueTracker || (a._valueTracker = Ua(a));
}
function Wa(a) {
  if (!a) return false;
  var b = a._valueTracker;
  if (!b) return true;
  var c = b.getValue();
  var d = "";
  a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
  a = d;
  return a !== c ? (b.setValue(a), true) : false;
}
function Xa(a) {
  a = a || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a) return null;
  try {
    return a.activeElement || a.body;
  } catch (b) {
    return a.body;
  }
}
function Ya(a, b) {
  var c = b.checked;
  return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
}
function Za(a, b) {
  var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
  c = Sa(null != b.value ? b.value : c);
  a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
}
function ab(a, b) {
  b = b.checked;
  null != b && ta(a, "checked", b, false);
}
function bb(a, b) {
  ab(a, b);
  var c = Sa(b.value), d = b.type;
  if (null != c) if ("number" === d) {
    if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
  } else a.value !== "" + c && (a.value = "" + c);
  else if ("submit" === d || "reset" === d) {
    a.removeAttribute("value");
    return;
  }
  b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
  null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
}
function db(a, b, c) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d = b.type;
    if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
    b = "" + a._wrapperState.initialValue;
    c || b === a.value || (a.value = b);
    a.defaultValue = b;
  }
  c = a.name;
  "" !== c && (a.name = "");
  a.defaultChecked = !!a._wrapperState.initialChecked;
  "" !== c && (a.name = c);
}
function cb(a, b, c) {
  if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
}
var eb = Array.isArray;
function fb(a, b, c, d) {
  a = a.options;
  if (b) {
    b = {};
    for (var e = 0; e < c.length; e++) b["$" + c[e]] = true;
    for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
  } else {
    c = "" + Sa(c);
    b = null;
    for (e = 0; e < a.length; e++) {
      if (a[e].value === c) {
        a[e].selected = true;
        d && (a[e].defaultSelected = true);
        return;
      }
      null !== b || a[e].disabled || (b = a[e]);
    }
    null !== b && (b.selected = true);
  }
}
function gb(a, b) {
  if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
  return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
}
function hb(a, b) {
  var c = b.value;
  if (null == c) {
    c = b.children;
    b = b.defaultValue;
    if (null != c) {
      if (null != b) throw Error(p(92));
      if (eb(c)) {
        if (1 < c.length) throw Error(p(93));
        c = c[0];
      }
      b = c;
    }
    null == b && (b = "");
    c = b;
  }
  a._wrapperState = { initialValue: Sa(c) };
}
function ib(a, b) {
  var c = Sa(b.value), d = Sa(b.defaultValue);
  null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
  null != d && (a.defaultValue = "" + d);
}
function jb(a) {
  var b = a.textContent;
  b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
}
function kb(a) {
  switch (a) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lb(a, b) {
  return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
}
var mb, nb = function(a) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
    MSApp.execUnsafeLocalFunction(function() {
      return a(b, c, d, e);
    });
  } : a;
}(function(a, b) {
  if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
  else {
    mb = mb || document.createElement("div");
    mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
    for (b = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
    for (; b.firstChild; ) a.appendChild(b.firstChild);
  }
});
function ob(a, b) {
  if (b) {
    var c = a.firstChild;
    if (c && c === a.lastChild && 3 === c.nodeType) {
      c.nodeValue = b;
      return;
    }
  }
  a.textContent = b;
}
var pb = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, qb = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb).forEach(function(a) {
  qb.forEach(function(b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);
    pb[b] = pb[a];
  });
});
function rb(a, b, c) {
  return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
}
function sb(a, b) {
  a = a.style;
  for (var c in b) if (b.hasOwnProperty(c)) {
    var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
    "float" === c && (c = "cssFloat");
    d ? a.setProperty(c, e) : a[c] = e;
  }
}
var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function ub(a, b) {
  if (b) {
    if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
    if (null != b.dangerouslySetInnerHTML) {
      if (null != b.children) throw Error(p(60));
      if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
    }
    if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
  }
}
function vb(a, b) {
  if (-1 === a.indexOf("-")) return "string" === typeof b.is;
  switch (a) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var wb = null;
function xb(a) {
  a = a.target || a.srcElement || window;
  a.correspondingUseElement && (a = a.correspondingUseElement);
  return 3 === a.nodeType ? a.parentNode : a;
}
var yb = null, zb = null, Ab = null;
function Bb(a) {
  if (a = Cb(a)) {
    if ("function" !== typeof yb) throw Error(p(280));
    var b = a.stateNode;
    b && (b = Db(b), yb(a.stateNode, a.type, b));
  }
}
function Eb(a) {
  zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
}
function Fb() {
  if (zb) {
    var a = zb, b = Ab;
    Ab = zb = null;
    Bb(a);
    if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
  }
}
function Gb(a, b) {
  return a(b);
}
function Hb() {
}
var Ib = false;
function Jb(a, b, c) {
  if (Ib) return a(b, c);
  Ib = true;
  try {
    return Gb(a, b, c);
  } finally {
    if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
  }
}
function Kb(a, b) {
  var c = a.stateNode;
  if (null === c) return null;
  var d = Db(c);
  if (null === d) return null;
  c = d[b];
  a: switch (b) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
      a = !d;
      break a;
    default:
      a = false;
  }
  if (a) return null;
  if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
  return c;
}
var Lb = false;
if (ia) try {
  var Mb = {};
  Object.defineProperty(Mb, "passive", { get: function() {
    Lb = true;
  } });
  window.addEventListener("test", Mb, Mb);
  window.removeEventListener("test", Mb, Mb);
} catch (a) {
  Lb = false;
}
function Nb(a, b, c, d, e, f2, g, h, k2) {
  var l2 = Array.prototype.slice.call(arguments, 3);
  try {
    b.apply(c, l2);
  } catch (m2) {
    this.onError(m2);
  }
}
var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a) {
  Ob = true;
  Pb = a;
} };
function Tb(a, b, c, d, e, f2, g, h, k2) {
  Ob = false;
  Pb = null;
  Nb.apply(Sb, arguments);
}
function Ub(a, b, c, d, e, f2, g, h, k2) {
  Tb.apply(this, arguments);
  if (Ob) {
    if (Ob) {
      var l2 = Pb;
      Ob = false;
      Pb = null;
    } else throw Error(p(198));
    Qb || (Qb = true, Rb = l2);
  }
}
function Vb(a) {
  var b = a, c = a;
  if (a.alternate) for (; b.return; ) b = b.return;
  else {
    a = b;
    do
      b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
    while (a);
  }
  return 3 === b.tag ? c : null;
}
function Wb(a) {
  if (13 === a.tag) {
    var b = a.memoizedState;
    null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
    if (null !== b) return b.dehydrated;
  }
  return null;
}
function Xb(a) {
  if (Vb(a) !== a) throw Error(p(188));
}
function Yb(a) {
  var b = a.alternate;
  if (!b) {
    b = Vb(a);
    if (null === b) throw Error(p(188));
    return b !== a ? null : a;
  }
  for (var c = a, d = b; ; ) {
    var e = c.return;
    if (null === e) break;
    var f2 = e.alternate;
    if (null === f2) {
      d = e.return;
      if (null !== d) {
        c = d;
        continue;
      }
      break;
    }
    if (e.child === f2.child) {
      for (f2 = e.child; f2; ) {
        if (f2 === c) return Xb(e), a;
        if (f2 === d) return Xb(e), b;
        f2 = f2.sibling;
      }
      throw Error(p(188));
    }
    if (c.return !== d.return) c = e, d = f2;
    else {
      for (var g = false, h = e.child; h; ) {
        if (h === c) {
          g = true;
          c = e;
          d = f2;
          break;
        }
        if (h === d) {
          g = true;
          d = e;
          c = f2;
          break;
        }
        h = h.sibling;
      }
      if (!g) {
        for (h = f2.child; h; ) {
          if (h === c) {
            g = true;
            c = f2;
            d = e;
            break;
          }
          if (h === d) {
            g = true;
            d = f2;
            c = e;
            break;
          }
          h = h.sibling;
        }
        if (!g) throw Error(p(189));
      }
    }
    if (c.alternate !== d) throw Error(p(190));
  }
  if (3 !== c.tag) throw Error(p(188));
  return c.stateNode.current === c ? a : b;
}
function Zb(a) {
  a = Yb(a);
  return null !== a ? $b(a) : null;
}
function $b(a) {
  if (5 === a.tag || 6 === a.tag) return a;
  for (a = a.child; null !== a; ) {
    var b = $b(a);
    if (null !== b) return b;
    a = a.sibling;
  }
  return null;
}
var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
function mc(a) {
  if (lc && "function" === typeof lc.onCommitFiberRoot) try {
    lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
  } catch (b) {
  }
}
var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
function nc(a) {
  a >>>= 0;
  return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
}
var rc = 64, sc = 4194304;
function tc(a) {
  switch (a & -a) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a;
  }
}
function uc(a, b) {
  var c = a.pendingLanes;
  if (0 === c) return 0;
  var d = 0, e = a.suspendedLanes, f2 = a.pingedLanes, g = c & 268435455;
  if (0 !== g) {
    var h = g & ~e;
    0 !== h ? d = tc(h) : (f2 &= g, 0 !== f2 && (d = tc(f2)));
  } else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f2 && (d = tc(f2));
  if (0 === d) return 0;
  if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f2 = b & -b, e >= f2 || 16 === e && 0 !== (f2 & 4194240))) return b;
  0 !== (d & 4) && (d |= c & 16);
  b = a.entangledLanes;
  if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
  return d;
}
function vc(a, b) {
  switch (a) {
    case 1:
    case 2:
    case 4:
      return b + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return b + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wc(a, b) {
  for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f2 = a.pendingLanes; 0 < f2; ) {
    var g = 31 - oc(f2), h = 1 << g, k2 = e[g];
    if (-1 === k2) {
      if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
    } else k2 <= b && (a.expiredLanes |= h);
    f2 &= ~h;
  }
}
function xc(a) {
  a = a.pendingLanes & -1073741825;
  return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
}
function yc() {
  var a = rc;
  rc <<= 1;
  0 === (rc & 4194240) && (rc = 64);
  return a;
}
function zc(a) {
  for (var b = [], c = 0; 31 > c; c++) b.push(a);
  return b;
}
function Ac(a, b, c) {
  a.pendingLanes |= b;
  536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
  a = a.eventTimes;
  b = 31 - oc(b);
  a[b] = c;
}
function Bc(a, b) {
  var c = a.pendingLanes & ~b;
  a.pendingLanes = b;
  a.suspendedLanes = 0;
  a.pingedLanes = 0;
  a.expiredLanes &= b;
  a.mutableReadLanes &= b;
  a.entangledLanes &= b;
  b = a.entanglements;
  var d = a.eventTimes;
  for (a = a.expirationTimes; 0 < c; ) {
    var e = 31 - oc(c), f2 = 1 << e;
    b[e] = 0;
    d[e] = -1;
    a[e] = -1;
    c &= ~f2;
  }
}
function Cc(a, b) {
  var c = a.entangledLanes |= b;
  for (a = a.entanglements; c; ) {
    var d = 31 - oc(c), e = 1 << d;
    e & b | a[d] & b && (a[d] |= b);
    c &= ~e;
  }
}
var C = 0;
function Dc(a) {
  a &= -a;
  return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
}
var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a, b) {
  switch (a) {
    case "focusin":
    case "focusout":
      Lc = null;
      break;
    case "dragenter":
    case "dragleave":
      Mc = null;
      break;
    case "mouseover":
    case "mouseout":
      Nc = null;
      break;
    case "pointerover":
    case "pointerout":
      Oc.delete(b.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pc.delete(b.pointerId);
  }
}
function Tc(a, b, c, d, e, f2) {
  if (null === a || a.nativeEvent !== f2) return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f2, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
  a.eventSystemFlags |= d;
  b = a.targetContainers;
  null !== e && -1 === b.indexOf(e) && b.push(e);
  return a;
}
function Uc(a, b, c, d, e) {
  switch (b) {
    case "focusin":
      return Lc = Tc(Lc, a, b, c, d, e), true;
    case "dragenter":
      return Mc = Tc(Mc, a, b, c, d, e), true;
    case "mouseover":
      return Nc = Tc(Nc, a, b, c, d, e), true;
    case "pointerover":
      var f2 = e.pointerId;
      Oc.set(f2, Tc(Oc.get(f2) || null, a, b, c, d, e));
      return true;
    case "gotpointercapture":
      return f2 = e.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a, b, c, d, e)), true;
  }
  return false;
}
function Vc(a) {
  var b = Wc(a.target);
  if (null !== b) {
    var c = Vb(b);
    if (null !== c) {
      if (b = c.tag, 13 === b) {
        if (b = Wb(c), null !== b) {
          a.blockedOn = b;
          Ic(a.priority, function() {
            Gc(c);
          });
          return;
        }
      } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
        a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a.blockedOn = null;
}
function Xc(a) {
  if (null !== a.blockedOn) return false;
  for (var b = a.targetContainers; 0 < b.length; ) {
    var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
    if (null === c) {
      c = a.nativeEvent;
      var d = new c.constructor(c.type, c);
      wb = d;
      c.target.dispatchEvent(d);
      wb = null;
    } else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
    b.shift();
  }
  return true;
}
function Zc(a, b, c) {
  Xc(a) && c.delete(b);
}
function $c() {
  Jc = false;
  null !== Lc && Xc(Lc) && (Lc = null);
  null !== Mc && Xc(Mc) && (Mc = null);
  null !== Nc && Xc(Nc) && (Nc = null);
  Oc.forEach(Zc);
  Pc.forEach(Zc);
}
function ad(a, b) {
  a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
}
function bd(a) {
  function b(b2) {
    return ad(b2, a);
  }
  if (0 < Kc.length) {
    ad(Kc[0], a);
    for (var c = 1; c < Kc.length; c++) {
      var d = Kc[c];
      d.blockedOn === a && (d.blockedOn = null);
    }
  }
  null !== Lc && ad(Lc, a);
  null !== Mc && ad(Mc, a);
  null !== Nc && ad(Nc, a);
  Oc.forEach(b);
  Pc.forEach(b);
  for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
  for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); ) Vc(c), null === c.blockedOn && Qc.shift();
}
var cd = ua.ReactCurrentBatchConfig, dd = true;
function ed(a, b, c, d) {
  var e = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 1, fd(a, b, c, d);
  } finally {
    C = e, cd.transition = f2;
  }
}
function gd(a, b, c, d) {
  var e = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 4, fd(a, b, c, d);
  } finally {
    C = e, cd.transition = f2;
  }
}
function fd(a, b, c, d) {
  if (dd) {
    var e = Yc(a, b, c, d);
    if (null === e) hd(a, b, d, id, c), Sc(a, d);
    else if (Uc(e, a, b, c, d)) d.stopPropagation();
    else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
      for (; null !== e; ) {
        var f2 = Cb(e);
        null !== f2 && Ec(f2);
        f2 = Yc(a, b, c, d);
        null === f2 && hd(a, b, d, id, c);
        if (f2 === e) break;
        e = f2;
      }
      null !== e && d.stopPropagation();
    } else hd(a, b, d, null, c);
  }
}
var id = null;
function Yc(a, b, c, d) {
  id = null;
  a = xb(d);
  a = Wc(a);
  if (null !== a) if (b = Vb(a), null === b) a = null;
  else if (c = b.tag, 13 === c) {
    a = Wb(b);
    if (null !== a) return a;
    a = null;
  } else if (3 === c) {
    if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
    a = null;
  } else b !== a && (a = null);
  id = a;
  return null;
}
function jd(a) {
  switch (a) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ec()) {
        case fc:
          return 1;
        case gc:
          return 4;
        case hc:
        case ic:
          return 16;
        case jc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kd = null, ld = null, md = null;
function nd() {
  if (md) return md;
  var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f2 = e.length;
  for (a = 0; a < c && b[a] === e[a]; a++) ;
  var g = c - a;
  for (d = 1; d <= g && b[c - d] === e[f2 - d]; d++) ;
  return md = e.slice(a, 1 < d ? 1 - d : void 0);
}
function od(a) {
  var b = a.keyCode;
  "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
  10 === a && (a = 13);
  return 32 <= a || 13 === a ? a : 0;
}
function pd() {
  return true;
}
function qd() {
  return false;
}
function rd(a) {
  function b(b2, d, e, f2, g) {
    this._reactName = b2;
    this._targetInst = e;
    this.type = d;
    this.nativeEvent = f2;
    this.target = g;
    this.currentTarget = null;
    for (var c in a) a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f2) : f2[c]);
    this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  A(b.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a2 = this.nativeEvent;
    a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var a2 = this.nativeEvent;
    a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd });
  return b;
}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
  return a.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
  return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
}, movementX: function(a) {
  if ("movementX" in a) return a.movementX;
  a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
  return wd;
}, movementY: function(a) {
  return "movementY" in a ? a.movementY : xd;
} }), Bd = rd(Ad), Cd = A({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A({}, sd, { clipboardData: function(a) {
  return "clipboardData" in a ? a.clipboardData : window.clipboardData;
} }), Jd = rd(Id), Kd = A({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pd(a) {
  var b = this.nativeEvent;
  return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
}
function zd() {
  return Pd;
}
var Qd = A({}, ud, { key: function(a) {
  if (a.key) {
    var b = Md[a.key] || a.key;
    if ("Unidentified" !== b) return b;
  }
  return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
  return "keypress" === a.type ? od(a) : 0;
}, keyCode: function(a) {
  return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
}, which: function(a) {
  return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
} }), Rd = rd(Qd), Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A({}, Ad, {
  deltaX: function(a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  },
  deltaY: function(a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
ia && "documentMode" in document && (be = document.documentMode);
var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
function ge(a, b) {
  switch (a) {
    case "keyup":
      return -1 !== $d.indexOf(b.keyCode);
    case "keydown":
      return 229 !== b.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function he(a) {
  a = a.detail;
  return "object" === typeof a && "data" in a ? a.data : null;
}
var ie = false;
function je(a, b) {
  switch (a) {
    case "compositionend":
      return he(b);
    case "keypress":
      if (32 !== b.which) return null;
      fe = true;
      return ee;
    case "textInput":
      return a = b.data, a === ee && fe ? null : a;
    default:
      return null;
  }
}
function ke(a, b) {
  if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
  switch (a) {
    case "paste":
      return null;
    case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length) return b.char;
        if (b.which) return String.fromCharCode(b.which);
      }
      return null;
    case "compositionend":
      return de && "ko" !== b.locale ? null : b.data;
    default:
      return null;
  }
}
var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function me(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
}
function ne(a, b, c, d) {
  Eb(d);
  b = oe(b, "onChange");
  0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
}
var pe = null, qe = null;
function re(a) {
  se(a, 0);
}
function te(a) {
  var b = ue(a);
  if (Wa(b)) return a;
}
function ve(a, b) {
  if ("change" === a) return b;
}
var we = false;
if (ia) {
  var xe;
  if (ia) {
    var ye = "oninput" in document;
    if (!ye) {
      var ze = document.createElement("div");
      ze.setAttribute("oninput", "return;");
      ye = "function" === typeof ze.oninput;
    }
    xe = ye;
  } else xe = false;
  we = xe && (!document.documentMode || 9 < document.documentMode);
}
function Ae() {
  pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
}
function Be(a) {
  if ("value" === a.propertyName && te(qe)) {
    var b = [];
    ne(b, qe, a, xb(a));
    Jb(re, b);
  }
}
function Ce(a, b, c) {
  "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
}
function De(a) {
  if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
}
function Ee(a, b) {
  if ("click" === a) return te(b);
}
function Fe(a, b) {
  if ("input" === a || "change" === a) return te(b);
}
function Ge(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}
var He = "function" === typeof Object.is ? Object.is : Ge;
function Ie(a, b) {
  if (He(a, b)) return true;
  if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return false;
  var c = Object.keys(a), d = Object.keys(b);
  if (c.length !== d.length) return false;
  for (d = 0; d < c.length; d++) {
    var e = c[d];
    if (!ja.call(b, e) || !He(a[e], b[e])) return false;
  }
  return true;
}
function Je(a) {
  for (; a && a.firstChild; ) a = a.firstChild;
  return a;
}
function Ke(a, b) {
  var c = Je(a);
  a = 0;
  for (var d; c; ) {
    if (3 === c.nodeType) {
      d = a + c.textContent.length;
      if (a <= b && d >= b) return { node: c, offset: b - a };
      a = d;
    }
    a: {
      for (; c; ) {
        if (c.nextSibling) {
          c = c.nextSibling;
          break a;
        }
        c = c.parentNode;
      }
      c = void 0;
    }
    c = Je(c);
  }
}
function Le(a, b) {
  return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
}
function Me() {
  for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
    try {
      var c = "string" === typeof b.contentWindow.location.href;
    } catch (d) {
      c = false;
    }
    if (c) a = b.contentWindow;
    else break;
    b = Xa(a.document);
  }
  return b;
}
function Ne(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
}
function Oe(a) {
  var b = Me(), c = a.focusedElem, d = a.selectionRange;
  if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
    if (null !== d && Ne(c)) {
      if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
      else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
        a = a.getSelection();
        var e = c.textContent.length, f2 = Math.min(d.start, e);
        d = void 0 === d.end ? f2 : Math.min(d.end, e);
        !a.extend && f2 > d && (e = d, d = f2, f2 = e);
        e = Ke(c, f2);
        var g = Ke(
          c,
          d
        );
        e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f2 > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
      }
    }
    b = [];
    for (a = c; a = a.parentNode; ) 1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
    "function" === typeof c.focus && c.focus();
    for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
  }
}
var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
function Ue(a, b, c) {
  var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
  Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
}
function Ve(a, b) {
  var c = {};
  c[a.toLowerCase()] = b.toLowerCase();
  c["Webkit" + a] = "webkit" + b;
  c["Moz" + a] = "moz" + b;
  return c;
}
var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
function Ze(a) {
  if (Xe[a]) return Xe[a];
  if (!We[a]) return a;
  var b = We[a], c;
  for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
  return a;
}
var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a, b) {
  df.set(a, b);
  fa(b, [a]);
}
for (var gf = 0; gf < ef.length; gf++) {
  var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
  ff(jf, "on" + kf);
}
ff($e, "onAnimationEnd");
ff(af, "onAnimationIteration");
ff(bf, "onAnimationStart");
ff("dblclick", "onDoubleClick");
ff("focusin", "onFocus");
ff("focusout", "onBlur");
ff(cf, "onTransitionEnd");
ha("onMouseEnter", ["mouseout", "mouseover"]);
ha("onMouseLeave", ["mouseout", "mouseover"]);
ha("onPointerEnter", ["pointerout", "pointerover"]);
ha("onPointerLeave", ["pointerout", "pointerover"]);
fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a, b, c) {
  var d = a.type || "unknown-event";
  a.currentTarget = c;
  Ub(d, b, void 0, a);
  a.currentTarget = null;
}
function se(a, b) {
  b = 0 !== (b & 4);
  for (var c = 0; c < a.length; c++) {
    var d = a[c], e = d.event;
    d = d.listeners;
    a: {
      var f2 = void 0;
      if (b) for (var g = d.length - 1; 0 <= g; g--) {
        var h = d[g], k2 = h.instance, l2 = h.currentTarget;
        h = h.listener;
        if (k2 !== f2 && e.isPropagationStopped()) break a;
        nf(e, h, l2);
        f2 = k2;
      }
      else for (g = 0; g < d.length; g++) {
        h = d[g];
        k2 = h.instance;
        l2 = h.currentTarget;
        h = h.listener;
        if (k2 !== f2 && e.isPropagationStopped()) break a;
        nf(e, h, l2);
        f2 = k2;
      }
    }
  }
  if (Qb) throw a = Rb, Qb = false, Rb = null, a;
}
function D(a, b) {
  var c = b[of];
  void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
  var d = a + "__bubble";
  c.has(d) || (pf(b, a, 2, false), c.add(d));
}
function qf(a, b, c) {
  var d = 0;
  b && (d |= 4);
  pf(c, a, d, b);
}
var rf = "_reactListening" + Math.random().toString(36).slice(2);
function sf(a) {
  if (!a[rf]) {
    a[rf] = true;
    da.forEach(function(b2) {
      "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
    });
    var b = 9 === a.nodeType ? a : a.ownerDocument;
    null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
  }
}
function pf(a, b, c, d) {
  switch (jd(b)) {
    case 1:
      var e = ed;
      break;
    case 4:
      e = gd;
      break;
    default:
      e = fd;
  }
  c = e.bind(null, b, c, a);
  e = void 0;
  !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
  d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
}
function hd(a, b, c, d, e) {
  var f2 = d;
  if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
    if (null === d) return;
    var g = d.tag;
    if (3 === g || 4 === g) {
      var h = d.stateNode.containerInfo;
      if (h === e || 8 === h.nodeType && h.parentNode === e) break;
      if (4 === g) for (g = d.return; null !== g; ) {
        var k2 = g.tag;
        if (3 === k2 || 4 === k2) {
          if (k2 = g.stateNode.containerInfo, k2 === e || 8 === k2.nodeType && k2.parentNode === e) return;
        }
        g = g.return;
      }
      for (; null !== h; ) {
        g = Wc(h);
        if (null === g) return;
        k2 = g.tag;
        if (5 === k2 || 6 === k2) {
          d = f2 = g;
          continue a;
        }
        h = h.parentNode;
      }
    }
    d = d.return;
  }
  Jb(function() {
    var d2 = f2, e2 = xb(c), g2 = [];
    a: {
      var h2 = df.get(a);
      if (void 0 !== h2) {
        var k3 = td, n2 = a;
        switch (a) {
          case "keypress":
            if (0 === od(c)) break a;
          case "keydown":
          case "keyup":
            k3 = Rd;
            break;
          case "focusin":
            n2 = "focus";
            k3 = Fd;
            break;
          case "focusout":
            n2 = "blur";
            k3 = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k3 = Fd;
            break;
          case "click":
            if (2 === c.button) break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k3 = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k3 = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k3 = Vd;
            break;
          case $e:
          case af:
          case bf:
            k3 = Hd;
            break;
          case cf:
            k3 = Xd;
            break;
          case "scroll":
            k3 = vd;
            break;
          case "wheel":
            k3 = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k3 = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k3 = Td;
        }
        var t2 = 0 !== (b & 4), J2 = !t2 && "scroll" === a, x2 = t2 ? null !== h2 ? h2 + "Capture" : null : h2;
        t2 = [];
        for (var w2 = d2, u2; null !== w2; ) {
          u2 = w2;
          var F2 = u2.stateNode;
          5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t2.push(tf(w2, F2, u2))));
          if (J2) break;
          w2 = w2.return;
        }
        0 < t2.length && (h2 = new k3(h2, n2, null, c, e2), g2.push({ event: h2, listeners: t2 }));
      }
    }
    if (0 === (b & 7)) {
      a: {
        h2 = "mouseover" === a || "pointerover" === a;
        k3 = "mouseout" === a || "pointerout" === a;
        if (h2 && c !== wb && (n2 = c.relatedTarget || c.fromElement) && (Wc(n2) || n2[uf])) break a;
        if (k3 || h2) {
          h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
          if (k3) {
            if (n2 = c.relatedTarget || c.toElement, k3 = d2, n2 = n2 ? Wc(n2) : null, null !== n2 && (J2 = Vb(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag)) n2 = null;
          } else k3 = null, n2 = d2;
          if (k3 !== n2) {
            t2 = Bd;
            F2 = "onMouseLeave";
            x2 = "onMouseEnter";
            w2 = "mouse";
            if ("pointerout" === a || "pointerover" === a) t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
            J2 = null == k3 ? h2 : ue(k3);
            u2 = null == n2 ? h2 : ue(n2);
            h2 = new t2(F2, w2 + "leave", k3, c, e2);
            h2.target = J2;
            h2.relatedTarget = u2;
            F2 = null;
            Wc(e2) === d2 && (t2 = new t2(x2, w2 + "enter", n2, c, e2), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
            J2 = F2;
            if (k3 && n2) b: {
              t2 = k3;
              x2 = n2;
              w2 = 0;
              for (u2 = t2; u2; u2 = vf(u2)) w2++;
              u2 = 0;
              for (F2 = x2; F2; F2 = vf(F2)) u2++;
              for (; 0 < w2 - u2; ) t2 = vf(t2), w2--;
              for (; 0 < u2 - w2; ) x2 = vf(x2), u2--;
              for (; w2--; ) {
                if (t2 === x2 || null !== x2 && t2 === x2.alternate) break b;
                t2 = vf(t2);
                x2 = vf(x2);
              }
              t2 = null;
            }
            else t2 = null;
            null !== k3 && wf(g2, h2, k3, t2, false);
            null !== n2 && null !== J2 && wf(g2, J2, n2, t2, true);
          }
        }
      }
      a: {
        h2 = d2 ? ue(d2) : window;
        k3 = h2.nodeName && h2.nodeName.toLowerCase();
        if ("select" === k3 || "input" === k3 && "file" === h2.type) var na = ve;
        else if (me(h2)) if (we) na = Fe;
        else {
          na = De;
          var xa = Ce;
        }
        else (k3 = h2.nodeName) && "input" === k3.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
        if (na && (na = na(a, d2))) {
          ne(g2, na, c, e2);
          break a;
        }
        xa && xa(a, h2, d2);
        "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
      }
      xa = d2 ? ue(d2) : window;
      switch (a) {
        case "focusin":
          if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d2, Se = null;
          break;
        case "focusout":
          Se = Re = Qe = null;
          break;
        case "mousedown":
          Te = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te = false;
          Ue(g2, c, e2);
          break;
        case "selectionchange":
          if (Pe) break;
        case "keydown":
        case "keyup":
          Ue(g2, c, e2);
      }
      var $a;
      if (ae) b: {
        switch (a) {
          case "compositionstart":
            var ba = "onCompositionStart";
            break b;
          case "compositionend":
            ba = "onCompositionEnd";
            break b;
          case "compositionupdate":
            ba = "onCompositionUpdate";
            break b;
        }
        ba = void 0;
      }
      else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
      ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
      if ($a = ce ? je(a, c) : ke(a, c)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
    }
    se(g2, b);
  });
}
function tf(a, b, c) {
  return { instance: a, listener: b, currentTarget: c };
}
function oe(a, b) {
  for (var c = b + "Capture", d = []; null !== a; ) {
    var e = a, f2 = e.stateNode;
    5 === e.tag && null !== f2 && (e = f2, f2 = Kb(a, c), null != f2 && d.unshift(tf(a, f2, e)), f2 = Kb(a, b), null != f2 && d.push(tf(a, f2, e)));
    a = a.return;
  }
  return d;
}
function vf(a) {
  if (null === a) return null;
  do
    a = a.return;
  while (a && 5 !== a.tag);
  return a ? a : null;
}
function wf(a, b, c, d, e) {
  for (var f2 = b._reactName, g = []; null !== c && c !== d; ) {
    var h = c, k2 = h.alternate, l2 = h.stateNode;
    if (null !== k2 && k2 === d) break;
    5 === h.tag && null !== l2 && (h = l2, e ? (k2 = Kb(c, f2), null != k2 && g.unshift(tf(c, k2, h))) : e || (k2 = Kb(c, f2), null != k2 && g.push(tf(c, k2, h))));
    c = c.return;
  }
  0 !== g.length && a.push({ event: b, listeners: g });
}
var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
function zf(a) {
  return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
}
function Af(a, b, c) {
  b = zf(b);
  if (zf(a) !== b && c) throw Error(p(425));
}
function Bf() {
}
var Cf = null, Df = null;
function Ef(a, b) {
  return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
}
var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
  return Hf.resolve(null).then(a).catch(If);
} : Ff;
function If(a) {
  setTimeout(function() {
    throw a;
  });
}
function Kf(a, b) {
  var c = b, d = 0;
  do {
    var e = c.nextSibling;
    a.removeChild(c);
    if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
      if (0 === d) {
        a.removeChild(e);
        bd(b);
        return;
      }
      d--;
    } else "$" !== c && "$?" !== c && "$!" !== c || d++;
    c = e;
  } while (c);
  bd(b);
}
function Lf(a) {
  for (; null != a; a = a.nextSibling) {
    var b = a.nodeType;
    if (1 === b || 3 === b) break;
    if (8 === b) {
      b = a.data;
      if ("$" === b || "$!" === b || "$?" === b) break;
      if ("/$" === b) return null;
    }
  }
  return a;
}
function Mf(a) {
  a = a.previousSibling;
  for (var b = 0; a; ) {
    if (8 === a.nodeType) {
      var c = a.data;
      if ("$" === c || "$!" === c || "$?" === c) {
        if (0 === b) return a;
        b--;
      } else "/$" === c && b++;
    }
    a = a.previousSibling;
  }
  return null;
}
var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
function Wc(a) {
  var b = a[Of];
  if (b) return b;
  for (var c = a.parentNode; c; ) {
    if (b = c[uf] || c[Of]) {
      c = b.alternate;
      if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a; ) {
        if (c = a[Of]) return c;
        a = Mf(a);
      }
      return b;
    }
    a = c;
    c = a.parentNode;
  }
  return null;
}
function Cb(a) {
  a = a[Of] || a[uf];
  return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
}
function ue(a) {
  if (5 === a.tag || 6 === a.tag) return a.stateNode;
  throw Error(p(33));
}
function Db(a) {
  return a[Pf] || null;
}
var Sf = [], Tf = -1;
function Uf(a) {
  return { current: a };
}
function E(a) {
  0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
}
function G(a, b) {
  Tf++;
  Sf[Tf] = a.current;
  a.current = b;
}
var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
function Yf(a, b) {
  var c = a.type.contextTypes;
  if (!c) return Vf;
  var d = a.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
  var e = {}, f2;
  for (f2 in c) e[f2] = b[f2];
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
  return e;
}
function Zf(a) {
  a = a.childContextTypes;
  return null !== a && void 0 !== a;
}
function $f() {
  E(Wf);
  E(H);
}
function ag(a, b, c) {
  if (H.current !== Vf) throw Error(p(168));
  G(H, b);
  G(Wf, c);
}
function bg(a, b, c) {
  var d = a.stateNode;
  b = b.childContextTypes;
  if ("function" !== typeof d.getChildContext) return c;
  d = d.getChildContext();
  for (var e in d) if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));
  return A({}, c, d);
}
function cg(a) {
  a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
  Xf = H.current;
  G(H, a);
  G(Wf, Wf.current);
  return true;
}
function dg(a, b, c) {
  var d = a.stateNode;
  if (!d) throw Error(p(169));
  c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
  G(Wf, c);
}
var eg = null, fg = false, gg = false;
function hg(a) {
  null === eg ? eg = [a] : eg.push(a);
}
function ig(a) {
  fg = true;
  hg(a);
}
function jg() {
  if (!gg && null !== eg) {
    gg = true;
    var a = 0, b = C;
    try {
      var c = eg;
      for (C = 1; a < c.length; a++) {
        var d = c[a];
        do
          d = d(true);
        while (null !== d);
      }
      eg = null;
      fg = false;
    } catch (e) {
      throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
    } finally {
      C = b, gg = false;
    }
  }
  return null;
}
var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
function tg(a, b) {
  kg[lg++] = ng;
  kg[lg++] = mg;
  mg = a;
  ng = b;
}
function ug(a, b, c) {
  og[pg++] = rg;
  og[pg++] = sg;
  og[pg++] = qg;
  qg = a;
  var d = rg;
  a = sg;
  var e = 32 - oc(d) - 1;
  d &= ~(1 << e);
  c += 1;
  var f2 = 32 - oc(b) + e;
  if (30 < f2) {
    var g = e - e % 5;
    f2 = (d & (1 << g) - 1).toString(32);
    d >>= g;
    e -= g;
    rg = 1 << 32 - oc(b) + e | c << e | d;
    sg = f2 + a;
  } else rg = 1 << f2 | c << e | d, sg = a;
}
function vg(a) {
  null !== a.return && (tg(a, 1), ug(a, 1, 0));
}
function wg(a) {
  for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
  for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
}
var xg = null, yg = null, I = false, zg = null;
function Ag(a, b) {
  var c = Bg(5, null, null, 0);
  c.elementType = "DELETED";
  c.stateNode = b;
  c.return = a;
  b = a.deletions;
  null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
}
function Cg(a, b) {
  switch (a.tag) {
    case 5:
      var c = a.type;
      b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
      return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
    case 6:
      return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
    case 13:
      return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
    default:
      return false;
  }
}
function Dg(a) {
  return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
}
function Eg(a) {
  if (I) {
    var b = yg;
    if (b) {
      var c = b;
      if (!Cg(a, b)) {
        if (Dg(a)) throw Error(p(418));
        b = Lf(c.nextSibling);
        var d = xg;
        b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
      }
    } else {
      if (Dg(a)) throw Error(p(418));
      a.flags = a.flags & -4097 | 2;
      I = false;
      xg = a;
    }
  }
}
function Fg(a) {
  for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
  xg = a;
}
function Gg(a) {
  if (a !== xg) return false;
  if (!I) return Fg(a), I = true, false;
  var b;
  (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
  if (b && (b = yg)) {
    if (Dg(a)) throw Hg(), Error(p(418));
    for (; b; ) Ag(a, b), b = Lf(b.nextSibling);
  }
  Fg(a);
  if (13 === a.tag) {
    a = a.memoizedState;
    a = null !== a ? a.dehydrated : null;
    if (!a) throw Error(p(317));
    a: {
      a = a.nextSibling;
      for (b = 0; a; ) {
        if (8 === a.nodeType) {
          var c = a.data;
          if ("/$" === c) {
            if (0 === b) {
              yg = Lf(a.nextSibling);
              break a;
            }
            b--;
          } else "$" !== c && "$!" !== c && "$?" !== c || b++;
        }
        a = a.nextSibling;
      }
      yg = null;
    }
  } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
  return true;
}
function Hg() {
  for (var a = yg; a; ) a = Lf(a.nextSibling);
}
function Ig() {
  yg = xg = null;
  I = false;
}
function Jg(a) {
  null === zg ? zg = [a] : zg.push(a);
}
var Kg = ua.ReactCurrentBatchConfig;
function Lg(a, b, c) {
  a = c.ref;
  if (null !== a && "function" !== typeof a && "object" !== typeof a) {
    if (c._owner) {
      c = c._owner;
      if (c) {
        if (1 !== c.tag) throw Error(p(309));
        var d = c.stateNode;
      }
      if (!d) throw Error(p(147, a));
      var e = d, f2 = "" + a;
      if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f2) return b.ref;
      b = function(a2) {
        var b2 = e.refs;
        null === a2 ? delete b2[f2] : b2[f2] = a2;
      };
      b._stringRef = f2;
      return b;
    }
    if ("string" !== typeof a) throw Error(p(284));
    if (!c._owner) throw Error(p(290, a));
  }
  return a;
}
function Mg(a, b) {
  a = Object.prototype.toString.call(b);
  throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
}
function Ng(a) {
  var b = a._init;
  return b(a._payload);
}
function Og(a) {
  function b(b2, c2) {
    if (a) {
      var d2 = b2.deletions;
      null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
    }
  }
  function c(c2, d2) {
    if (!a) return null;
    for (; null !== d2; ) b(c2, d2), d2 = d2.sibling;
    return null;
  }
  function d(a2, b2) {
    for (a2 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
    return a2;
  }
  function e(a2, b2) {
    a2 = Pg(a2, b2);
    a2.index = 0;
    a2.sibling = null;
    return a2;
  }
  function f2(b2, c2, d2) {
    b2.index = d2;
    if (!a) return b2.flags |= 1048576, c2;
    d2 = b2.alternate;
    if (null !== d2) return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
    b2.flags |= 2;
    return c2;
  }
  function g(b2) {
    a && null === b2.alternate && (b2.flags |= 2);
    return b2;
  }
  function h(a2, b2, c2, d2) {
    if (null === b2 || 6 !== b2.tag) return b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function k2(a2, b2, c2, d2) {
    var f3 = c2.type;
    if (f3 === ya) return m2(a2, b2, c2.props.children, d2, c2.key);
    if (null !== b2 && (b2.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha && Ng(f3) === b2.type)) return d2 = e(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2;
    d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
    d2.ref = Lg(a2, b2, c2);
    d2.return = a2;
    return d2;
  }
  function l2(a2, b2, c2, d2) {
    if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation) return b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2.children || []);
    b2.return = a2;
    return b2;
  }
  function m2(a2, b2, c2, d2, f3) {
    if (null === b2 || 7 !== b2.tag) return b2 = Tg(c2, a2.mode, d2, f3), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function q2(a2, b2, c2) {
    if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
    if ("object" === typeof b2 && null !== b2) {
      switch (b2.$$typeof) {
        case va:
          return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
        case wa:
          return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
        case Ha:
          var d2 = b2._init;
          return q2(a2, d2(b2._payload), c2);
      }
      if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
      Mg(a2, b2);
    }
    return null;
  }
  function r2(a2, b2, c2, d2) {
    var e2 = null !== b2 ? b2.key : null;
    if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2) return null !== e2 ? null : h(a2, b2, "" + c2, d2);
    if ("object" === typeof c2 && null !== c2) {
      switch (c2.$$typeof) {
        case va:
          return c2.key === e2 ? k2(a2, b2, c2, d2) : null;
        case wa:
          return c2.key === e2 ? l2(a2, b2, c2, d2) : null;
        case Ha:
          return e2 = c2._init, r2(
            a2,
            b2,
            e2(c2._payload),
            d2
          );
      }
      if (eb(c2) || Ka(c2)) return null !== e2 ? null : m2(a2, b2, c2, d2, null);
      Mg(a2, c2);
    }
    return null;
  }
  function y2(a2, b2, c2, d2, e2) {
    if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
    if ("object" === typeof d2 && null !== d2) {
      switch (d2.$$typeof) {
        case va:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k2(b2, a2, d2, e2);
        case wa:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l2(b2, a2, d2, e2);
        case Ha:
          var f3 = d2._init;
          return y2(a2, b2, c2, f3(d2._payload), e2);
      }
      if (eb(d2) || Ka(d2)) return a2 = a2.get(c2) || null, m2(b2, a2, d2, e2, null);
      Mg(b2, d2);
    }
    return null;
  }
  function n2(e2, g2, h2, k3) {
    for (var l3 = null, m3 = null, u2 = g2, w2 = g2 = 0, x2 = null; null !== u2 && w2 < h2.length; w2++) {
      u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
      var n3 = r2(e2, u2, h2[w2], k3);
      if (null === n3) {
        null === u2 && (u2 = x2);
        break;
      }
      a && u2 && null === n3.alternate && b(e2, u2);
      g2 = f2(n3, g2, w2);
      null === m3 ? l3 = n3 : m3.sibling = n3;
      m3 = n3;
      u2 = x2;
    }
    if (w2 === h2.length) return c(e2, u2), I && tg(e2, w2), l3;
    if (null === u2) {
      for (; w2 < h2.length; w2++) u2 = q2(e2, h2[w2], k3), null !== u2 && (g2 = f2(u2, g2, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
      I && tg(e2, w2);
      return l3;
    }
    for (u2 = d(e2, u2); w2 < h2.length; w2++) x2 = y2(u2, e2, w2, h2[w2], k3), null !== x2 && (a && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g2 = f2(x2, g2, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
    a && u2.forEach(function(a2) {
      return b(e2, a2);
    });
    I && tg(e2, w2);
    return l3;
  }
  function t2(e2, g2, h2, k3) {
    var l3 = Ka(h2);
    if ("function" !== typeof l3) throw Error(p(150));
    h2 = l3.call(h2);
    if (null == h2) throw Error(p(151));
    for (var u2 = l3 = null, m3 = g2, w2 = g2 = 0, x2 = null, n3 = h2.next(); null !== m3 && !n3.done; w2++, n3 = h2.next()) {
      m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
      var t3 = r2(e2, m3, n3.value, k3);
      if (null === t3) {
        null === m3 && (m3 = x2);
        break;
      }
      a && m3 && null === t3.alternate && b(e2, m3);
      g2 = f2(t3, g2, w2);
      null === u2 ? l3 = t3 : u2.sibling = t3;
      u2 = t3;
      m3 = x2;
    }
    if (n3.done) return c(
      e2,
      m3
    ), I && tg(e2, w2), l3;
    if (null === m3) {
      for (; !n3.done; w2++, n3 = h2.next()) n3 = q2(e2, n3.value, k3), null !== n3 && (g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
      I && tg(e2, w2);
      return l3;
    }
    for (m3 = d(e2, m3); !n3.done; w2++, n3 = h2.next()) n3 = y2(m3, e2, w2, n3.value, k3), null !== n3 && (a && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
    a && m3.forEach(function(a2) {
      return b(e2, a2);
    });
    I && tg(e2, w2);
    return l3;
  }
  function J2(a2, d2, f3, h2) {
    "object" === typeof f3 && null !== f3 && f3.type === ya && null === f3.key && (f3 = f3.props.children);
    if ("object" === typeof f3 && null !== f3) {
      switch (f3.$$typeof) {
        case va:
          a: {
            for (var k3 = f3.key, l3 = d2; null !== l3; ) {
              if (l3.key === k3) {
                k3 = f3.type;
                if (k3 === ya) {
                  if (7 === l3.tag) {
                    c(a2, l3.sibling);
                    d2 = e(l3, f3.props.children);
                    d2.return = a2;
                    a2 = d2;
                    break a;
                  }
                } else if (l3.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === Ha && Ng(k3) === l3.type) {
                  c(a2, l3.sibling);
                  d2 = e(l3, f3.props);
                  d2.ref = Lg(a2, l3, f3);
                  d2.return = a2;
                  a2 = d2;
                  break a;
                }
                c(a2, l3);
                break;
              } else b(a2, l3);
              l3 = l3.sibling;
            }
            f3.type === ya ? (d2 = Tg(f3.props.children, a2.mode, h2, f3.key), d2.return = a2, a2 = d2) : (h2 = Rg(f3.type, f3.key, f3.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f3), h2.return = a2, a2 = h2);
          }
          return g(a2);
        case wa:
          a: {
            for (l3 = f3.key; null !== d2; ) {
              if (d2.key === l3) if (4 === d2.tag && d2.stateNode.containerInfo === f3.containerInfo && d2.stateNode.implementation === f3.implementation) {
                c(a2, d2.sibling);
                d2 = e(d2, f3.children || []);
                d2.return = a2;
                a2 = d2;
                break a;
              } else {
                c(a2, d2);
                break;
              }
              else b(a2, d2);
              d2 = d2.sibling;
            }
            d2 = Sg(f3, a2.mode, h2);
            d2.return = a2;
            a2 = d2;
          }
          return g(a2);
        case Ha:
          return l3 = f3._init, J2(a2, d2, l3(f3._payload), h2);
      }
      if (eb(f3)) return n2(a2, d2, f3, h2);
      if (Ka(f3)) return t2(a2, d2, f3, h2);
      Mg(a2, f3);
    }
    return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f3), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f3, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
  }
  return J2;
}
var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
function $g() {
  Zg = Yg = Xg = null;
}
function ah(a) {
  var b = Wg.current;
  E(Wg);
  a._currentValue = b;
}
function bh(a, b, c) {
  for (; null !== a; ) {
    var d = a.alternate;
    (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
    if (a === c) break;
    a = a.return;
  }
}
function ch(a, b) {
  Xg = a;
  Zg = Yg = null;
  a = a.dependencies;
  null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
}
function eh(a) {
  var b = a._currentValue;
  if (Zg !== a) if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
    if (null === Xg) throw Error(p(308));
    Yg = a;
    Xg.dependencies = { lanes: 0, firstContext: a };
  } else Yg = Yg.next = a;
  return b;
}
var fh = null;
function gh(a) {
  null === fh ? fh = [a] : fh.push(a);
}
function hh(a, b, c, d) {
  var e = b.interleaved;
  null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
  b.interleaved = c;
  return ih(a, d);
}
function ih(a, b) {
  a.lanes |= b;
  var c = a.alternate;
  null !== c && (c.lanes |= b);
  c = a;
  for (a = a.return; null !== a; ) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
  return 3 === c.tag ? c.stateNode : null;
}
var jh = false;
function kh(a) {
  a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function lh(a, b) {
  a = a.updateQueue;
  b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
}
function mh(a, b) {
  return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
}
function nh(a, b, c) {
  var d = a.updateQueue;
  if (null === d) return null;
  d = d.shared;
  if (0 !== (K & 2)) {
    var e = d.pending;
    null === e ? b.next = b : (b.next = e.next, e.next = b);
    d.pending = b;
    return ih(a, c);
  }
  e = d.interleaved;
  null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
  d.interleaved = b;
  return ih(a, c);
}
function oh(a, b, c) {
  b = b.updateQueue;
  if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
function ph(a, b) {
  var c = a.updateQueue, d = a.alternate;
  if (null !== d && (d = d.updateQueue, c === d)) {
    var e = null, f2 = null;
    c = c.firstBaseUpdate;
    if (null !== c) {
      do {
        var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
        null === f2 ? e = f2 = g : f2 = f2.next = g;
        c = c.next;
      } while (null !== c);
      null === f2 ? e = f2 = b : f2 = f2.next = b;
    } else e = f2 = b;
    c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f2, shared: d.shared, effects: d.effects };
    a.updateQueue = c;
    return;
  }
  a = c.lastBaseUpdate;
  null === a ? c.firstBaseUpdate = b : a.next = b;
  c.lastBaseUpdate = b;
}
function qh(a, b, c, d) {
  var e = a.updateQueue;
  jh = false;
  var f2 = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
  if (null !== h) {
    e.shared.pending = null;
    var k2 = h, l2 = k2.next;
    k2.next = null;
    null === g ? f2 = l2 : g.next = l2;
    g = k2;
    var m2 = a.alternate;
    null !== m2 && (m2 = m2.updateQueue, h = m2.lastBaseUpdate, h !== g && (null === h ? m2.firstBaseUpdate = l2 : h.next = l2, m2.lastBaseUpdate = k2));
  }
  if (null !== f2) {
    var q2 = e.baseState;
    g = 0;
    m2 = l2 = k2 = null;
    h = f2;
    do {
      var r2 = h.lane, y2 = h.eventTime;
      if ((d & r2) === r2) {
        null !== m2 && (m2 = m2.next = {
          eventTime: y2,
          lane: 0,
          tag: h.tag,
          payload: h.payload,
          callback: h.callback,
          next: null
        });
        a: {
          var n2 = a, t2 = h;
          r2 = b;
          y2 = c;
          switch (t2.tag) {
            case 1:
              n2 = t2.payload;
              if ("function" === typeof n2) {
                q2 = n2.call(y2, q2, r2);
                break a;
              }
              q2 = n2;
              break a;
            case 3:
              n2.flags = n2.flags & -65537 | 128;
            case 0:
              n2 = t2.payload;
              r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
              if (null === r2 || void 0 === r2) break a;
              q2 = A({}, q2, r2);
              break a;
            case 2:
              jh = true;
          }
        }
        null !== h.callback && 0 !== h.lane && (a.flags |= 64, r2 = e.effects, null === r2 ? e.effects = [h] : r2.push(h));
      } else y2 = { eventTime: y2, lane: r2, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m2 ? (l2 = m2 = y2, k2 = q2) : m2 = m2.next = y2, g |= r2;
      h = h.next;
      if (null === h) if (h = e.shared.pending, null === h) break;
      else r2 = h, h = r2.next, r2.next = null, e.lastBaseUpdate = r2, e.shared.pending = null;
    } while (1);
    null === m2 && (k2 = q2);
    e.baseState = k2;
    e.firstBaseUpdate = l2;
    e.lastBaseUpdate = m2;
    b = e.shared.interleaved;
    if (null !== b) {
      e = b;
      do
        g |= e.lane, e = e.next;
      while (e !== b);
    } else null === f2 && (e.shared.lanes = 0);
    rh |= g;
    a.lanes = g;
    a.memoizedState = q2;
  }
}
function sh(a, b, c) {
  a = b.effects;
  b.effects = null;
  if (null !== a) for (b = 0; b < a.length; b++) {
    var d = a[b], e = d.callback;
    if (null !== e) {
      d.callback = null;
      d = c;
      if ("function" !== typeof e) throw Error(p(191, e));
      e.call(d);
    }
  }
}
var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
function xh(a) {
  if (a === th) throw Error(p(174));
  return a;
}
function yh(a, b) {
  G(wh, b);
  G(vh, a);
  G(uh, th);
  a = b.nodeType;
  switch (a) {
    case 9:
    case 11:
      b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
      break;
    default:
      a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
  }
  E(uh);
  G(uh, b);
}
function zh() {
  E(uh);
  E(vh);
  E(wh);
}
function Ah(a) {
  xh(wh.current);
  var b = xh(uh.current);
  var c = lb(b, a.type);
  b !== c && (G(vh, a), G(uh, c));
}
function Bh(a) {
  vh.current === a && (E(uh), E(vh));
}
var L = Uf(0);
function Ch(a) {
  for (var b = a; null !== b; ) {
    if (13 === b.tag) {
      var c = b.memoizedState;
      if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
    } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
      if (0 !== (b.flags & 128)) return b;
    } else if (null !== b.child) {
      b.child.return = b;
      b = b.child;
      continue;
    }
    if (b === a) break;
    for (; null === b.sibling; ) {
      if (null === b.return || b.return === a) return null;
      b = b.return;
    }
    b.sibling.return = b.return;
    b = b.sibling;
  }
  return null;
}
var Dh = [];
function Eh() {
  for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
  Dh.length = 0;
}
var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M = null, N = null, O = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
function P() {
  throw Error(p(321));
}
function Mh(a, b) {
  if (null === b) return false;
  for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return false;
  return true;
}
function Nh(a, b, c, d, e, f2) {
  Hh = f2;
  M = b;
  b.memoizedState = null;
  b.updateQueue = null;
  b.lanes = 0;
  Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
  a = c(d, e);
  if (Jh) {
    f2 = 0;
    do {
      Jh = false;
      Kh = 0;
      if (25 <= f2) throw Error(p(301));
      f2 += 1;
      O = N = null;
      b.updateQueue = null;
      Fh.current = Qh;
      a = c(d, e);
    } while (Jh);
  }
  Fh.current = Rh;
  b = null !== N && null !== N.next;
  Hh = 0;
  O = N = M = null;
  Ih = false;
  if (b) throw Error(p(300));
  return a;
}
function Sh() {
  var a = 0 !== Kh;
  Kh = 0;
  return a;
}
function Th() {
  var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  null === O ? M.memoizedState = O = a : O = O.next = a;
  return O;
}
function Uh() {
  if (null === N) {
    var a = M.alternate;
    a = null !== a ? a.memoizedState : null;
  } else a = N.next;
  var b = null === O ? M.memoizedState : O.next;
  if (null !== b) O = b, N = a;
  else {
    if (null === a) throw Error(p(310));
    N = a;
    a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
    null === O ? M.memoizedState = O = a : O = O.next = a;
  }
  return O;
}
function Vh(a, b) {
  return "function" === typeof b ? b(a) : b;
}
function Wh(a) {
  var b = Uh(), c = b.queue;
  if (null === c) throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = N, e = d.baseQueue, f2 = c.pending;
  if (null !== f2) {
    if (null !== e) {
      var g = e.next;
      e.next = f2.next;
      f2.next = g;
    }
    d.baseQueue = e = f2;
    c.pending = null;
  }
  if (null !== e) {
    f2 = e.next;
    d = d.baseState;
    var h = g = null, k2 = null, l2 = f2;
    do {
      var m2 = l2.lane;
      if ((Hh & m2) === m2) null !== k2 && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d = l2.hasEagerState ? l2.eagerState : a(d, l2.action);
      else {
        var q2 = {
          lane: m2,
          action: l2.action,
          hasEagerState: l2.hasEagerState,
          eagerState: l2.eagerState,
          next: null
        };
        null === k2 ? (h = k2 = q2, g = d) : k2 = k2.next = q2;
        M.lanes |= m2;
        rh |= m2;
      }
      l2 = l2.next;
    } while (null !== l2 && l2 !== f2);
    null === k2 ? g = d : k2.next = h;
    He(d, b.memoizedState) || (dh = true);
    b.memoizedState = d;
    b.baseState = g;
    b.baseQueue = k2;
    c.lastRenderedState = d;
  }
  a = c.interleaved;
  if (null !== a) {
    e = a;
    do
      f2 = e.lane, M.lanes |= f2, rh |= f2, e = e.next;
    while (e !== a);
  } else null === e && (c.lanes = 0);
  return [b.memoizedState, c.dispatch];
}
function Xh(a) {
  var b = Uh(), c = b.queue;
  if (null === c) throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = c.dispatch, e = c.pending, f2 = b.memoizedState;
  if (null !== e) {
    c.pending = null;
    var g = e = e.next;
    do
      f2 = a(f2, g.action), g = g.next;
    while (g !== e);
    He(f2, b.memoizedState) || (dh = true);
    b.memoizedState = f2;
    null === b.baseQueue && (b.baseState = f2);
    c.lastRenderedState = f2;
  }
  return [f2, d];
}
function Yh() {
}
function Zh(a, b) {
  var c = M, d = Uh(), e = b(), f2 = !He(d.memoizedState, e);
  f2 && (d.memoizedState = e, dh = true);
  d = d.queue;
  $h(ai.bind(null, c, d, a), [a]);
  if (d.getSnapshot !== b || f2 || null !== O && O.memoizedState.tag & 1) {
    c.flags |= 2048;
    bi(9, ci.bind(null, c, d, e, b), void 0, null);
    if (null === Q) throw Error(p(349));
    0 !== (Hh & 30) || di(c, b, e);
  }
  return e;
}
function di(a, b, c) {
  a.flags |= 16384;
  a = { getSnapshot: b, value: c };
  b = M.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
}
function ci(a, b, c, d) {
  b.value = c;
  b.getSnapshot = d;
  ei(b) && fi(a);
}
function ai(a, b, c) {
  return c(function() {
    ei(b) && fi(a);
  });
}
function ei(a) {
  var b = a.getSnapshot;
  a = a.value;
  try {
    var c = b();
    return !He(a, c);
  } catch (d) {
    return true;
  }
}
function fi(a) {
  var b = ih(a, 1);
  null !== b && gi(b, a, 1, -1);
}
function hi(a) {
  var b = Th();
  "function" === typeof a && (a = a());
  b.memoizedState = b.baseState = a;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
  b.queue = a;
  a = a.dispatch = ii.bind(null, M, a);
  return [b.memoizedState, a];
}
function bi(a, b, c, d) {
  a = { tag: a, create: b, destroy: c, deps: d, next: null };
  b = M.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
  return a;
}
function ji() {
  return Uh().memoizedState;
}
function ki(a, b, c, d) {
  var e = Th();
  M.flags |= a;
  e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
}
function li(a, b, c, d) {
  var e = Uh();
  d = void 0 === d ? null : d;
  var f2 = void 0;
  if (null !== N) {
    var g = N.memoizedState;
    f2 = g.destroy;
    if (null !== d && Mh(d, g.deps)) {
      e.memoizedState = bi(b, c, f2, d);
      return;
    }
  }
  M.flags |= a;
  e.memoizedState = bi(1 | b, c, f2, d);
}
function mi(a, b) {
  return ki(8390656, 8, a, b);
}
function $h(a, b) {
  return li(2048, 8, a, b);
}
function ni(a, b) {
  return li(4, 2, a, b);
}
function oi(a, b) {
  return li(4, 4, a, b);
}
function pi(a, b) {
  if ("function" === typeof b) return a = a(), b(a), function() {
    b(null);
  };
  if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
    b.current = null;
  };
}
function qi(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return li(4, 4, pi.bind(null, b, a), c);
}
function ri() {
}
function si(a, b) {
  var c = Uh();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1])) return d[0];
  c.memoizedState = [a, b];
  return a;
}
function ti(a, b) {
  var c = Uh();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1])) return d[0];
  a = a();
  c.memoizedState = [a, b];
  return a;
}
function ui(a, b, c) {
  if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
  He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = true);
  return b;
}
function vi(a, b) {
  var c = C;
  C = 0 !== c && 4 > c ? c : 4;
  a(true);
  var d = Gh.transition;
  Gh.transition = {};
  try {
    a(false), b();
  } finally {
    C = c, Gh.transition = d;
  }
}
function wi() {
  return Uh().memoizedState;
}
function xi(a, b, c) {
  var d = yi(a);
  c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (zi(a)) Ai(b, c);
  else if (c = hh(a, b, c, d), null !== c) {
    var e = R();
    gi(c, a, d, e);
    Bi(c, b, d);
  }
}
function ii(a, b, c) {
  var d = yi(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (zi(a)) Ai(b, e);
  else {
    var f2 = a.alternate;
    if (0 === a.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b.lastRenderedReducer, null !== f2)) try {
      var g = b.lastRenderedState, h = f2(g, c);
      e.hasEagerState = true;
      e.eagerState = h;
      if (He(h, g)) {
        var k2 = b.interleaved;
        null === k2 ? (e.next = e, gh(b)) : (e.next = k2.next, k2.next = e);
        b.interleaved = e;
        return;
      }
    } catch (l2) {
    } finally {
    }
    c = hh(a, b, e, d);
    null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
  }
}
function zi(a) {
  var b = a.alternate;
  return a === M || null !== b && b === M;
}
function Ai(a, b) {
  Jh = Ih = true;
  var c = a.pending;
  null === c ? b.next = b : (b.next = c.next, c.next = b);
  a.pending = b;
}
function Bi(a, b, c) {
  if (0 !== (c & 4194240)) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a, b) {
  Th().memoizedState = [a, void 0 === b ? null : b];
  return a;
}, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return ki(
    4194308,
    4,
    pi.bind(null, b, a),
    c
  );
}, useLayoutEffect: function(a, b) {
  return ki(4194308, 4, a, b);
}, useInsertionEffect: function(a, b) {
  return ki(4, 2, a, b);
}, useMemo: function(a, b) {
  var c = Th();
  b = void 0 === b ? null : b;
  a = a();
  c.memoizedState = [a, b];
  return a;
}, useReducer: function(a, b, c) {
  var d = Th();
  b = void 0 !== c ? c(b) : b;
  d.memoizedState = d.baseState = b;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
  d.queue = a;
  a = a.dispatch = xi.bind(null, M, a);
  return [d.memoizedState, a];
}, useRef: function(a) {
  var b = Th();
  a = { current: a };
  return b.memoizedState = a;
}, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
  return Th().memoizedState = a;
}, useTransition: function() {
  var a = hi(false), b = a[0];
  a = vi.bind(null, a[1]);
  Th().memoizedState = a;
  return [b, a];
}, useMutableSource: function() {
}, useSyncExternalStore: function(a, b, c) {
  var d = M, e = Th();
  if (I) {
    if (void 0 === c) throw Error(p(407));
    c = c();
  } else {
    c = b();
    if (null === Q) throw Error(p(349));
    0 !== (Hh & 30) || di(d, b, c);
  }
  e.memoizedState = c;
  var f2 = { value: c, getSnapshot: b };
  e.queue = f2;
  mi(ai.bind(
    null,
    d,
    f2,
    a
  ), [a]);
  d.flags |= 2048;
  bi(9, ci.bind(null, d, f2, c, b), void 0, null);
  return c;
}, useId: function() {
  var a = Th(), b = Q.identifierPrefix;
  if (I) {
    var c = sg;
    var d = rg;
    c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
    b = ":" + b + "R" + c;
    c = Kh++;
    0 < c && (b += "H" + c.toString(32));
    b += ":";
  } else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
  return a.memoizedState = b;
}, unstable_isNewReconciler: false }, Ph = {
  readContext: eh,
  useCallback: si,
  useContext: eh,
  useEffect: $h,
  useImperativeHandle: qi,
  useInsertionEffect: ni,
  useLayoutEffect: oi,
  useMemo: ti,
  useReducer: Wh,
  useRef: ji,
  useState: function() {
    return Wh(Vh);
  },
  useDebugValue: ri,
  useDeferredValue: function(a) {
    var b = Uh();
    return ui(b, N.memoizedState, a);
  },
  useTransition: function() {
    var a = Wh(Vh)[0], b = Uh().memoizedState;
    return [a, b];
  },
  useMutableSource: Yh,
  useSyncExternalStore: Zh,
  useId: wi,
  unstable_isNewReconciler: false
}, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
  return Xh(Vh);
}, useDebugValue: ri, useDeferredValue: function(a) {
  var b = Uh();
  return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
}, useTransition: function() {
  var a = Xh(Vh)[0], b = Uh().memoizedState;
  return [a, b];
}, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
function Ci(a, b) {
  if (a && a.defaultProps) {
    b = A({}, b);
    a = a.defaultProps;
    for (var c in a) void 0 === b[c] && (b[c] = a[c]);
    return b;
  }
  return b;
}
function Di(a, b, c, d) {
  b = a.memoizedState;
  c = c(d, b);
  c = null === c || void 0 === c ? b : A({}, b, c);
  a.memoizedState = c;
  0 === a.lanes && (a.updateQueue.baseState = c);
}
var Ei = { isMounted: function(a) {
  return (a = a._reactInternals) ? Vb(a) === a : false;
}, enqueueSetState: function(a, b, c) {
  a = a._reactInternals;
  var d = R(), e = yi(a), f2 = mh(d, e);
  f2.payload = b;
  void 0 !== c && null !== c && (f2.callback = c);
  b = nh(a, f2, e);
  null !== b && (gi(b, a, e, d), oh(b, a, e));
}, enqueueReplaceState: function(a, b, c) {
  a = a._reactInternals;
  var d = R(), e = yi(a), f2 = mh(d, e);
  f2.tag = 1;
  f2.payload = b;
  void 0 !== c && null !== c && (f2.callback = c);
  b = nh(a, f2, e);
  null !== b && (gi(b, a, e, d), oh(b, a, e));
}, enqueueForceUpdate: function(a, b) {
  a = a._reactInternals;
  var c = R(), d = yi(a), e = mh(c, d);
  e.tag = 2;
  void 0 !== b && null !== b && (e.callback = b);
  b = nh(a, e, d);
  null !== b && (gi(b, a, d, c), oh(b, a, d));
} };
function Fi(a, b, c, d, e, f2, g) {
  a = a.stateNode;
  return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f2, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f2) : true;
}
function Gi(a, b, c) {
  var d = false, e = Vf;
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? f2 = eh(f2) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f2 = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
  b = new b(c, f2);
  a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
  b.updater = Ei;
  a.stateNode = b;
  b._reactInternals = a;
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f2);
  return b;
}
function Hi(a, b, c, d) {
  a = b.state;
  "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
  "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
  b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
}
function Ii(a, b, c, d) {
  var e = a.stateNode;
  e.props = c;
  e.state = a.memoizedState;
  e.refs = {};
  kh(a);
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? e.context = eh(f2) : (f2 = Zf(b) ? Xf : H.current, e.context = Yf(a, f2));
  e.state = a.memoizedState;
  f2 = b.getDerivedStateFromProps;
  "function" === typeof f2 && (Di(a, b, f2, c), e.state = a.memoizedState);
  "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
  "function" === typeof e.componentDidMount && (a.flags |= 4194308);
}
function Ji(a, b) {
  try {
    var c = "", d = b;
    do
      c += Pa(d), d = d.return;
    while (d);
    var e = c;
  } catch (f2) {
    e = "\nError generating stack: " + f2.message + "\n" + f2.stack;
  }
  return { value: a, source: b, stack: e, digest: null };
}
function Ki(a, b, c) {
  return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
}
function Li(a, b) {
  try {
    console.error(b.value);
  } catch (c) {
    setTimeout(function() {
      throw c;
    });
  }
}
var Mi = "function" === typeof WeakMap ? WeakMap : Map;
function Ni(a, b, c) {
  c = mh(-1, c);
  c.tag = 3;
  c.payload = { element: null };
  var d = b.value;
  c.callback = function() {
    Oi || (Oi = true, Pi = d);
    Li(a, b);
  };
  return c;
}
function Qi(a, b, c) {
  c = mh(-1, c);
  c.tag = 3;
  var d = a.type.getDerivedStateFromError;
  if ("function" === typeof d) {
    var e = b.value;
    c.payload = function() {
      return d(e);
    };
    c.callback = function() {
      Li(a, b);
    };
  }
  var f2 = a.stateNode;
  null !== f2 && "function" === typeof f2.componentDidCatch && (c.callback = function() {
    Li(a, b);
    "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
    var c2 = b.stack;
    this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
  });
  return c;
}
function Si(a, b, c) {
  var d = a.pingCache;
  if (null === d) {
    d = a.pingCache = new Mi();
    var e = /* @__PURE__ */ new Set();
    d.set(b, e);
  } else e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
  e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
}
function Ui(a) {
  do {
    var b;
    if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
    if (b) return a;
    a = a.return;
  } while (null !== a);
  return null;
}
function Vi(a, b, c, d, e) {
  if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
  a.flags |= 65536;
  a.lanes = e;
  return a;
}
var Wi = ua.ReactCurrentOwner, dh = false;
function Xi(a, b, c, d) {
  b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
}
function Yi(a, b, c, d, e) {
  c = c.render;
  var f2 = b.ref;
  ch(b, e);
  d = Nh(a, b, c, d, f2, e);
  c = Sh();
  if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
  I && c && vg(b);
  b.flags |= 1;
  Xi(a, b, d, e);
  return b.child;
}
function $i(a, b, c, d, e) {
  if (null === a) {
    var f2 = c.type;
    if ("function" === typeof f2 && !aj(f2) && void 0 === f2.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f2, bj(a, b, f2, d, e);
    a = Rg(c.type, null, d, b, b.mode, e);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }
  f2 = a.child;
  if (0 === (a.lanes & e)) {
    var g = f2.memoizedProps;
    c = c.compare;
    c = null !== c ? c : Ie;
    if (c(g, d) && a.ref === b.ref) return Zi(a, b, e);
  }
  b.flags |= 1;
  a = Pg(f2, d);
  a.ref = b.ref;
  a.return = b;
  return b.child = a;
}
function bj(a, b, c, d, e) {
  if (null !== a) {
    var f2 = a.memoizedProps;
    if (Ie(f2, d) && a.ref === b.ref) if (dh = false, b.pendingProps = d = f2, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (dh = true);
    else return b.lanes = a.lanes, Zi(a, b, e);
  }
  return cj(a, b, c, d, e);
}
function dj(a, b, c) {
  var d = b.pendingProps, e = d.children, f2 = null !== a ? a.memoizedState : null;
  if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
  else {
    if (0 === (c & 1073741824)) return a = null !== f2 ? f2.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
    b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
    d = null !== f2 ? f2.baseLanes : c;
    G(ej, fj);
    fj |= d;
  }
  else null !== f2 ? (d = f2.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
  Xi(a, b, e, c);
  return b.child;
}
function gj(a, b) {
  var c = b.ref;
  if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
}
function cj(a, b, c, d, e) {
  var f2 = Zf(c) ? Xf : H.current;
  f2 = Yf(b, f2);
  ch(b, e);
  c = Nh(a, b, c, d, f2, e);
  d = Sh();
  if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
  I && d && vg(b);
  b.flags |= 1;
  Xi(a, b, c, e);
  return b.child;
}
function hj(a, b, c, d, e) {
  if (Zf(c)) {
    var f2 = true;
    cg(b);
  } else f2 = false;
  ch(b, e);
  if (null === b.stateNode) ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = true;
  else if (null === a) {
    var g = b.stateNode, h = b.memoizedProps;
    g.props = h;
    var k2 = g.context, l2 = c.contextType;
    "object" === typeof l2 && null !== l2 ? l2 = eh(l2) : (l2 = Zf(c) ? Xf : H.current, l2 = Yf(b, l2));
    var m2 = c.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g.getSnapshotBeforeUpdate;
    q2 || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k2 !== l2) && Hi(b, g, d, l2);
    jh = false;
    var r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e);
    k2 = b.memoizedState;
    h !== d || r2 !== k2 || Wf.current || jh ? ("function" === typeof m2 && (Di(b, c, m2, d), k2 = b.memoizedState), (h = jh || Fi(b, c, h, d, r2, k2, l2)) ? (q2 || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k2), g.props = d, g.state = k2, g.context = l2, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
  } else {
    g = b.stateNode;
    lh(a, b);
    h = b.memoizedProps;
    l2 = b.type === b.elementType ? h : Ci(b.type, h);
    g.props = l2;
    q2 = b.pendingProps;
    r2 = g.context;
    k2 = c.contextType;
    "object" === typeof k2 && null !== k2 ? k2 = eh(k2) : (k2 = Zf(c) ? Xf : H.current, k2 = Yf(b, k2));
    var y2 = c.getDerivedStateFromProps;
    (m2 = "function" === typeof y2 || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q2 || r2 !== k2) && Hi(b, g, d, k2);
    jh = false;
    r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e);
    var n2 = b.memoizedState;
    h !== q2 || r2 !== n2 || Wf.current || jh ? ("function" === typeof y2 && (Di(b, c, y2, d), n2 = b.memoizedState), (l2 = jh || Fi(b, c, l2, d, r2, n2, k2) || false) ? (m2 || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n2, k2), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n2, k2)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n2), g.props = d, g.state = n2, g.context = k2, d = l2) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), d = false);
  }
  return jj(a, b, c, d, f2, e);
}
function jj(a, b, c, d, e, f2) {
  gj(a, b);
  var g = 0 !== (b.flags & 128);
  if (!d && !g) return e && dg(b, c, false), Zi(a, b, f2);
  d = b.stateNode;
  Wi.current = b;
  var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
  b.flags |= 1;
  null !== a && g ? (b.child = Ug(b, a.child, null, f2), b.child = Ug(b, null, h, f2)) : Xi(a, b, h, f2);
  b.memoizedState = d.state;
  e && dg(b, c, true);
  return b.child;
}
function kj(a) {
  var b = a.stateNode;
  b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
  yh(a, b.containerInfo);
}
function lj(a, b, c, d, e) {
  Ig();
  Jg(e);
  b.flags |= 256;
  Xi(a, b, c, d);
  return b.child;
}
var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
function nj(a) {
  return { baseLanes: a, cachePool: null, transitions: null };
}
function oj(a, b, c) {
  var d = b.pendingProps, e = L.current, f2 = false, g = 0 !== (b.flags & 128), h;
  (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
  if (h) f2 = true, b.flags &= -129;
  else if (null === a || null !== a.memoizedState) e |= 1;
  G(L, e & 1);
  if (null === a) {
    Eg(b);
    a = b.memoizedState;
    if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
    g = d.children;
    a = d.fallback;
    return f2 ? (d = b.mode, f2 = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g) : f2 = pj(g, d, 0, null), a = Tg(a, d, c, null), f2.return = b, a.return = b, f2.sibling = a, b.child = f2, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
  }
  e = a.memoizedState;
  if (null !== e && (h = e.dehydrated, null !== h)) return rj(a, b, g, d, h, e, c);
  if (f2) {
    f2 = d.fallback;
    g = b.mode;
    e = a.child;
    h = e.sibling;
    var k2 = { mode: "hidden", children: d.children };
    0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k2, b.deletions = null) : (d = Pg(e, k2), d.subtreeFlags = e.subtreeFlags & 14680064);
    null !== h ? f2 = Pg(h, f2) : (f2 = Tg(f2, g, c, null), f2.flags |= 2);
    f2.return = b;
    d.return = b;
    d.sibling = f2;
    b.child = d;
    d = f2;
    f2 = b.child;
    g = a.child.memoizedState;
    g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
    f2.memoizedState = g;
    f2.childLanes = a.childLanes & ~c;
    b.memoizedState = mj;
    return d;
  }
  f2 = a.child;
  a = f2.sibling;
  d = Pg(f2, { mode: "visible", children: d.children });
  0 === (b.mode & 1) && (d.lanes = c);
  d.return = b;
  d.sibling = null;
  null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
  b.child = d;
  b.memoizedState = null;
  return d;
}
function qj(a, b) {
  b = pj({ mode: "visible", children: b }, a.mode, 0, null);
  b.return = a;
  return a.child = b;
}
function sj(a, b, c, d) {
  null !== d && Jg(d);
  Ug(b, a.child, null, c);
  a = qj(b, b.pendingProps.children);
  a.flags |= 2;
  b.memoizedState = null;
  return a;
}
function rj(a, b, c, d, e, f2, g) {
  if (c) {
    if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
    if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
    f2 = d.fallback;
    e = b.mode;
    d = pj({ mode: "visible", children: d.children }, e, 0, null);
    f2 = Tg(f2, e, g, null);
    f2.flags |= 2;
    d.return = b;
    f2.return = b;
    d.sibling = f2;
    b.child = d;
    0 !== (b.mode & 1) && Ug(b, a.child, null, g);
    b.child.memoizedState = nj(g);
    b.memoizedState = mj;
    return f2;
  }
  if (0 === (b.mode & 1)) return sj(a, b, g, null);
  if ("$!" === e.data) {
    d = e.nextSibling && e.nextSibling.dataset;
    if (d) var h = d.dgst;
    d = h;
    f2 = Error(p(419));
    d = Ki(f2, d, void 0);
    return sj(a, b, g, d);
  }
  h = 0 !== (g & a.childLanes);
  if (dh || h) {
    d = Q;
    if (null !== d) {
      switch (g & -g) {
        case 4:
          e = 2;
          break;
        case 16:
          e = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          e = 32;
          break;
        case 536870912:
          e = 268435456;
          break;
        default:
          e = 0;
      }
      e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
      0 !== e && e !== f2.retryLane && (f2.retryLane = e, ih(a, e), gi(d, a, e, -1));
    }
    tj();
    d = Ki(Error(p(421)));
    return sj(a, b, g, d);
  }
  if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
  a = f2.treeContext;
  yg = Lf(e.nextSibling);
  xg = b;
  I = true;
  zg = null;
  null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
  b = qj(b, d.children);
  b.flags |= 4096;
  return b;
}
function vj(a, b, c) {
  a.lanes |= b;
  var d = a.alternate;
  null !== d && (d.lanes |= b);
  bh(a.return, b, c);
}
function wj(a, b, c, d, e) {
  var f2 = a.memoizedState;
  null === f2 ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f2.isBackwards = b, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d, f2.tail = c, f2.tailMode = e);
}
function xj(a, b, c) {
  var d = b.pendingProps, e = d.revealOrder, f2 = d.tail;
  Xi(a, b, d.children, c);
  d = L.current;
  if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
  else {
    if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a; ) {
      if (13 === a.tag) null !== a.memoizedState && vj(a, c, b);
      else if (19 === a.tag) vj(a, c, b);
      else if (null !== a.child) {
        a.child.return = a;
        a = a.child;
        continue;
      }
      if (a === b) break a;
      for (; null === a.sibling; ) {
        if (null === a.return || a.return === b) break a;
        a = a.return;
      }
      a.sibling.return = a.return;
      a = a.sibling;
    }
    d &= 1;
  }
  G(L, d);
  if (0 === (b.mode & 1)) b.memoizedState = null;
  else switch (e) {
    case "forwards":
      c = b.child;
      for (e = null; null !== c; ) a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
      c = e;
      null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
      wj(b, false, e, c, f2);
      break;
    case "backwards":
      c = null;
      e = b.child;
      for (b.child = null; null !== e; ) {
        a = e.alternate;
        if (null !== a && null === Ch(a)) {
          b.child = e;
          break;
        }
        a = e.sibling;
        e.sibling = c;
        c = e;
        e = a;
      }
      wj(b, true, c, null, f2);
      break;
    case "together":
      wj(b, false, null, null, void 0);
      break;
    default:
      b.memoizedState = null;
  }
  return b.child;
}
function ij(a, b) {
  0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
}
function Zi(a, b, c) {
  null !== a && (b.dependencies = a.dependencies);
  rh |= b.lanes;
  if (0 === (c & b.childLanes)) return null;
  if (null !== a && b.child !== a.child) throw Error(p(153));
  if (null !== b.child) {
    a = b.child;
    c = Pg(a, a.pendingProps);
    b.child = c;
    for (c.return = b; null !== a.sibling; ) a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
    c.sibling = null;
  }
  return b.child;
}
function yj(a, b, c) {
  switch (b.tag) {
    case 3:
      kj(b);
      Ig();
      break;
    case 5:
      Ah(b);
      break;
    case 1:
      Zf(b.type) && cg(b);
      break;
    case 4:
      yh(b, b.stateNode.containerInfo);
      break;
    case 10:
      var d = b.type._context, e = b.memoizedProps.value;
      G(Wg, d._currentValue);
      d._currentValue = e;
      break;
    case 13:
      d = b.memoizedState;
      if (null !== d) {
        if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
        if (0 !== (c & b.child.childLanes)) return oj(a, b, c);
        G(L, L.current & 1);
        a = Zi(a, b, c);
        return null !== a ? a.sibling : null;
      }
      G(L, L.current & 1);
      break;
    case 19:
      d = 0 !== (c & b.childLanes);
      if (0 !== (a.flags & 128)) {
        if (d) return xj(a, b, c);
        b.flags |= 128;
      }
      e = b.memoizedState;
      null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
      G(L, L.current);
      if (d) break;
      else return null;
    case 22:
    case 23:
      return b.lanes = 0, dj(a, b, c);
  }
  return Zi(a, b, c);
}
var zj, Aj, Bj, Cj;
zj = function(a, b) {
  for (var c = b.child; null !== c; ) {
    if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
    else if (4 !== c.tag && null !== c.child) {
      c.child.return = c;
      c = c.child;
      continue;
    }
    if (c === b) break;
    for (; null === c.sibling; ) {
      if (null === c.return || c.return === b) return;
      c = c.return;
    }
    c.sibling.return = c.return;
    c = c.sibling;
  }
};
Aj = function() {
};
Bj = function(a, b, c, d) {
  var e = a.memoizedProps;
  if (e !== d) {
    a = b.stateNode;
    xh(uh.current);
    var f2 = null;
    switch (c) {
      case "input":
        e = Ya(a, e);
        d = Ya(a, d);
        f2 = [];
        break;
      case "select":
        e = A({}, e, { value: void 0 });
        d = A({}, d, { value: void 0 });
        f2 = [];
        break;
      case "textarea":
        e = gb(a, e);
        d = gb(a, d);
        f2 = [];
        break;
      default:
        "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
    }
    ub(c, d);
    var g;
    c = null;
    for (l2 in e) if (!d.hasOwnProperty(l2) && e.hasOwnProperty(l2) && null != e[l2]) if ("style" === l2) {
      var h = e[l2];
      for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
    } else "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
    for (l2 in d) {
      var k2 = d[l2];
      h = null != e ? e[l2] : void 0;
      if (d.hasOwnProperty(l2) && k2 !== h && (null != k2 || null != h)) if ("style" === l2) if (h) {
        for (g in h) !h.hasOwnProperty(g) || k2 && k2.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
        for (g in k2) k2.hasOwnProperty(g) && h[g] !== k2[g] && (c || (c = {}), c[g] = k2[g]);
      } else c || (f2 || (f2 = []), f2.push(
        l2,
        c
      )), c = k2;
      else "dangerouslySetInnerHTML" === l2 ? (k2 = k2 ? k2.__html : void 0, h = h ? h.__html : void 0, null != k2 && h !== k2 && (f2 = f2 || []).push(l2, k2)) : "children" === l2 ? "string" !== typeof k2 && "number" !== typeof k2 || (f2 = f2 || []).push(l2, "" + k2) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea.hasOwnProperty(l2) ? (null != k2 && "onScroll" === l2 && D("scroll", a), f2 || h === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
    }
    c && (f2 = f2 || []).push("style", c);
    var l2 = f2;
    if (b.updateQueue = l2) b.flags |= 4;
  }
};
Cj = function(a, b, c, d) {
  c !== d && (b.flags |= 4);
};
function Dj(a, b) {
  if (!I) switch (a.tailMode) {
    case "hidden":
      b = a.tail;
      for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
      null === c ? a.tail = null : c.sibling = null;
      break;
    case "collapsed":
      c = a.tail;
      for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
      null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
  }
}
function S(a) {
  var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
  if (b) for (var e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
  else for (e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
  a.subtreeFlags |= d;
  a.childLanes = c;
  return b;
}
function Ej(a, b, c) {
  var d = b.pendingProps;
  wg(b);
  switch (b.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return S(b), null;
    case 1:
      return Zf(b.type) && $f(), S(b), null;
    case 3:
      d = b.stateNode;
      zh();
      E(Wf);
      E(H);
      Eh();
      d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
      if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
      Aj(a, b);
      S(b);
      return null;
    case 5:
      Bh(b);
      var e = xh(wh.current);
      c = b.type;
      if (null !== a && null != b.stateNode) Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      else {
        if (!d) {
          if (null === b.stateNode) throw Error(p(166));
          S(b);
          return null;
        }
        a = xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.type;
          var f2 = b.memoizedProps;
          d[Of] = b;
          d[Pf] = f2;
          a = 0 !== (b.mode & 1);
          switch (c) {
            case "dialog":
              D("cancel", d);
              D("close", d);
              break;
            case "iframe":
            case "object":
            case "embed":
              D("load", d);
              break;
            case "video":
            case "audio":
              for (e = 0; e < lf.length; e++) D(lf[e], d);
              break;
            case "source":
              D("error", d);
              break;
            case "img":
            case "image":
            case "link":
              D(
                "error",
                d
              );
              D("load", d);
              break;
            case "details":
              D("toggle", d);
              break;
            case "input":
              Za(d, f2);
              D("invalid", d);
              break;
            case "select":
              d._wrapperState = { wasMultiple: !!f2.multiple };
              D("invalid", d);
              break;
            case "textarea":
              hb(d, f2), D("invalid", d);
          }
          ub(c, f2);
          e = null;
          for (var g in f2) if (f2.hasOwnProperty(g)) {
            var h = f2[g];
            "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f2.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f2.suppressHydrationWarning && Af(
              d.textContent,
              h,
              a
            ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
          }
          switch (c) {
            case "input":
              Va(d);
              db(d, f2, true);
              break;
            case "textarea":
              Va(d);
              jb(d);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof f2.onClick && (d.onclick = Bf);
          }
          d = e;
          b.updateQueue = d;
          null !== d && (b.flags |= 4);
        } else {
          g = 9 === e.nodeType ? e : e.ownerDocument;
          "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
          "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
          a[Of] = b;
          a[Pf] = d;
          zj(a, b, false, false);
          b.stateNode = a;
          a: {
            g = vb(c, d);
            switch (c) {
              case "dialog":
                D("cancel", a);
                D("close", a);
                e = d;
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", a);
                e = d;
                break;
              case "video":
              case "audio":
                for (e = 0; e < lf.length; e++) D(lf[e], a);
                e = d;
                break;
              case "source":
                D("error", a);
                e = d;
                break;
              case "img":
              case "image":
              case "link":
                D(
                  "error",
                  a
                );
                D("load", a);
                e = d;
                break;
              case "details":
                D("toggle", a);
                e = d;
                break;
              case "input":
                Za(a, d);
                e = Ya(a, d);
                D("invalid", a);
                break;
              case "option":
                e = d;
                break;
              case "select":
                a._wrapperState = { wasMultiple: !!d.multiple };
                e = A({}, d, { value: void 0 });
                D("invalid", a);
                break;
              case "textarea":
                hb(a, d);
                e = gb(a, d);
                D("invalid", a);
                break;
              default:
                e = d;
            }
            ub(c, e);
            h = e;
            for (f2 in h) if (h.hasOwnProperty(f2)) {
              var k2 = h[f2];
              "style" === f2 ? sb(a, k2) : "dangerouslySetInnerHTML" === f2 ? (k2 = k2 ? k2.__html : void 0, null != k2 && nb(a, k2)) : "children" === f2 ? "string" === typeof k2 ? ("textarea" !== c || "" !== k2) && ob(a, k2) : "number" === typeof k2 && ob(a, "" + k2) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k2 && "onScroll" === f2 && D("scroll", a) : null != k2 && ta(a, f2, k2, g));
            }
            switch (c) {
              case "input":
                Va(a);
                db(a, d, false);
                break;
              case "textarea":
                Va(a);
                jb(a);
                break;
              case "option":
                null != d.value && a.setAttribute("value", "" + Sa(d.value));
                break;
              case "select":
                a.multiple = !!d.multiple;
                f2 = d.value;
                null != f2 ? fb(a, !!d.multiple, f2, false) : null != d.defaultValue && fb(
                  a,
                  !!d.multiple,
                  d.defaultValue,
                  true
                );
                break;
              default:
                "function" === typeof e.onClick && (a.onclick = Bf);
            }
            switch (c) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d = !!d.autoFocus;
                break a;
              case "img":
                d = true;
                break a;
              default:
                d = false;
            }
          }
          d && (b.flags |= 4);
        }
        null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      }
      S(b);
      return null;
    case 6:
      if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
      else {
        if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
        c = xh(wh.current);
        xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.memoizedProps;
          d[Of] = b;
          if (f2 = d.nodeValue !== c) {
            if (a = xg, null !== a) switch (a.tag) {
              case 3:
                Af(d.nodeValue, c, 0 !== (a.mode & 1));
                break;
              case 5:
                true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
            }
          }
          f2 && (b.flags |= 4);
        } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
      }
      S(b);
      return null;
    case 13:
      E(L);
      d = b.memoizedState;
      if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
        if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f2 = false;
        else if (f2 = Gg(b), null !== d && null !== d.dehydrated) {
          if (null === a) {
            if (!f2) throw Error(p(318));
            f2 = b.memoizedState;
            f2 = null !== f2 ? f2.dehydrated : null;
            if (!f2) throw Error(p(317));
            f2[Of] = b;
          } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
          S(b);
          f2 = false;
        } else null !== zg && (Fj(zg), zg = null), f2 = true;
        if (!f2) return b.flags & 65536 ? b : null;
      }
      if (0 !== (b.flags & 128)) return b.lanes = c, b;
      d = null !== d;
      d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
      null !== b.updateQueue && (b.flags |= 4);
      S(b);
      return null;
    case 4:
      return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
    case 10:
      return ah(b.type._context), S(b), null;
    case 17:
      return Zf(b.type) && $f(), S(b), null;
    case 19:
      E(L);
      f2 = b.memoizedState;
      if (null === f2) return S(b), null;
      d = 0 !== (b.flags & 128);
      g = f2.rendering;
      if (null === g) if (d) Dj(f2, false);
      else {
        if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a; ) {
          g = Ch(a);
          if (null !== g) {
            b.flags |= 128;
            Dj(f2, false);
            d = g.updateQueue;
            null !== d && (b.updateQueue = d, b.flags |= 4);
            b.subtreeFlags = 0;
            d = c;
            for (c = b.child; null !== c; ) f2 = c, a = d, f2.flags &= 14680066, g = f2.alternate, null === g ? (f2.childLanes = 0, f2.lanes = a, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g.childLanes, f2.lanes = g.lanes, f2.child = g.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g.memoizedProps, f2.memoizedState = g.memoizedState, f2.updateQueue = g.updateQueue, f2.type = g.type, a = g.dependencies, f2.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
            G(L, L.current & 1 | 2);
            return b.child;
          }
          a = a.sibling;
        }
        null !== f2.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
      }
      else {
        if (!d) if (a = Ch(g), null !== a) {
          if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g.alternate && !I) return S(b), null;
        } else 2 * B() - f2.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
        f2.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f2.last, null !== c ? c.sibling = g : b.child = g, f2.last = g);
      }
      if (null !== f2.tail) return b = f2.tail, f2.rendering = b, f2.tail = b.sibling, f2.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
      S(b);
      return null;
    case 22:
    case 23:
      return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p(156, b.tag));
}
function Ij(a, b) {
  wg(b);
  switch (b.tag) {
    case 1:
      return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 3:
      return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
    case 5:
      return Bh(b), null;
    case 13:
      E(L);
      a = b.memoizedState;
      if (null !== a && null !== a.dehydrated) {
        if (null === b.alternate) throw Error(p(340));
        Ig();
      }
      a = b.flags;
      return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 19:
      return E(L), null;
    case 4:
      return zh(), null;
    case 10:
      return ah(b.type._context), null;
    case 22:
    case 23:
      return Hj(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Jj = false, U = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V = null;
function Lj(a, b) {
  var c = a.ref;
  if (null !== c) if ("function" === typeof c) try {
    c(null);
  } catch (d) {
    W(a, b, d);
  }
  else c.current = null;
}
function Mj(a, b, c) {
  try {
    c();
  } catch (d) {
    W(a, b, d);
  }
}
var Nj = false;
function Oj(a, b) {
  Cf = dd;
  a = Me();
  if (Ne(a)) {
    if ("selectionStart" in a) var c = { start: a.selectionStart, end: a.selectionEnd };
    else a: {
      c = (c = a.ownerDocument) && c.defaultView || window;
      var d = c.getSelection && c.getSelection();
      if (d && 0 !== d.rangeCount) {
        c = d.anchorNode;
        var e = d.anchorOffset, f2 = d.focusNode;
        d = d.focusOffset;
        try {
          c.nodeType, f2.nodeType;
        } catch (F2) {
          c = null;
          break a;
        }
        var g = 0, h = -1, k2 = -1, l2 = 0, m2 = 0, q2 = a, r2 = null;
        b: for (; ; ) {
          for (var y2; ; ) {
            q2 !== c || 0 !== e && 3 !== q2.nodeType || (h = g + e);
            q2 !== f2 || 0 !== d && 3 !== q2.nodeType || (k2 = g + d);
            3 === q2.nodeType && (g += q2.nodeValue.length);
            if (null === (y2 = q2.firstChild)) break;
            r2 = q2;
            q2 = y2;
          }
          for (; ; ) {
            if (q2 === a) break b;
            r2 === c && ++l2 === e && (h = g);
            r2 === f2 && ++m2 === d && (k2 = g);
            if (null !== (y2 = q2.nextSibling)) break;
            q2 = r2;
            r2 = q2.parentNode;
          }
          q2 = y2;
        }
        c = -1 === h || -1 === k2 ? null : { start: h, end: k2 };
      } else c = null;
    }
    c = c || { start: 0, end: 0 };
  } else c = null;
  Df = { focusedElem: a, selectionRange: c };
  dd = false;
  for (V = b; null !== V; ) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V = a;
  else for (; null !== V; ) {
    b = V;
    try {
      var n2 = b.alternate;
      if (0 !== (b.flags & 1024)) switch (b.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (null !== n2) {
            var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b.stateNode, w2 = x2.getSnapshotBeforeUpdate(b.elementType === b.type ? t2 : Ci(b.type, t2), J2);
            x2.__reactInternalSnapshotBeforeUpdate = w2;
          }
          break;
        case 3:
          var u2 = b.stateNode.containerInfo;
          1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(p(163));
      }
    } catch (F2) {
      W(b, b.return, F2);
    }
    a = b.sibling;
    if (null !== a) {
      a.return = b.return;
      V = a;
      break;
    }
    V = b.return;
  }
  n2 = Nj;
  Nj = false;
  return n2;
}
function Pj(a, b, c) {
  var d = b.updateQueue;
  d = null !== d ? d.lastEffect : null;
  if (null !== d) {
    var e = d = d.next;
    do {
      if ((e.tag & a) === a) {
        var f2 = e.destroy;
        e.destroy = void 0;
        void 0 !== f2 && Mj(b, c, f2);
      }
      e = e.next;
    } while (e !== d);
  }
}
function Qj(a, b) {
  b = b.updateQueue;
  b = null !== b ? b.lastEffect : null;
  if (null !== b) {
    var c = b = b.next;
    do {
      if ((c.tag & a) === a) {
        var d = c.create;
        c.destroy = d();
      }
      c = c.next;
    } while (c !== b);
  }
}
function Rj(a) {
  var b = a.ref;
  if (null !== b) {
    var c = a.stateNode;
    switch (a.tag) {
      case 5:
        a = c;
        break;
      default:
        a = c;
    }
    "function" === typeof b ? b(a) : b.current = a;
  }
}
function Sj(a) {
  var b = a.alternate;
  null !== b && (a.alternate = null, Sj(b));
  a.child = null;
  a.deletions = null;
  a.sibling = null;
  5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
  a.stateNode = null;
  a.return = null;
  a.dependencies = null;
  a.memoizedProps = null;
  a.memoizedState = null;
  a.pendingProps = null;
  a.stateNode = null;
  a.updateQueue = null;
}
function Tj(a) {
  return 5 === a.tag || 3 === a.tag || 4 === a.tag;
}
function Uj(a) {
  a: for (; ; ) {
    for (; null === a.sibling; ) {
      if (null === a.return || Tj(a.return)) return null;
      a = a.return;
    }
    a.sibling.return = a.return;
    for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
      if (a.flags & 2) continue a;
      if (null === a.child || 4 === a.tag) continue a;
      else a.child.return = a, a = a.child;
    }
    if (!(a.flags & 2)) return a.stateNode;
  }
}
function Vj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
  else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b, c), a = a.sibling; null !== a; ) Vj(a, b, c), a = a.sibling;
}
function Wj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
  else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a; ) Wj(a, b, c), a = a.sibling;
}
var X = null, Xj = false;
function Yj(a, b, c) {
  for (c = c.child; null !== c; ) Zj(a, b, c), c = c.sibling;
}
function Zj(a, b, c) {
  if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
    lc.onCommitFiberUnmount(kc, c);
  } catch (h) {
  }
  switch (c.tag) {
    case 5:
      U || Lj(c, b);
    case 6:
      var d = X, e = Xj;
      X = null;
      Yj(a, b, c);
      X = d;
      Xj = e;
      null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
      break;
    case 18:
      null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
      break;
    case 4:
      d = X;
      e = Xj;
      X = c.stateNode.containerInfo;
      Xj = true;
      Yj(a, b, c);
      X = d;
      Xj = e;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
        e = d = d.next;
        do {
          var f2 = e, g = f2.destroy;
          f2 = f2.tag;
          void 0 !== g && (0 !== (f2 & 2) ? Mj(c, b, g) : 0 !== (f2 & 4) && Mj(c, b, g));
          e = e.next;
        } while (e !== d);
      }
      Yj(a, b, c);
      break;
    case 1:
      if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
        d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
      } catch (h) {
        W(c, b, h);
      }
      Yj(a, b, c);
      break;
    case 21:
      Yj(a, b, c);
      break;
    case 22:
      c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
      break;
    default:
      Yj(a, b, c);
  }
}
function ak(a) {
  var b = a.updateQueue;
  if (null !== b) {
    a.updateQueue = null;
    var c = a.stateNode;
    null === c && (c = a.stateNode = new Kj());
    b.forEach(function(b2) {
      var d = bk.bind(null, a, b2);
      c.has(b2) || (c.add(b2), b2.then(d, d));
    });
  }
}
function ck(a, b) {
  var c = b.deletions;
  if (null !== c) for (var d = 0; d < c.length; d++) {
    var e = c[d];
    try {
      var f2 = a, g = b, h = g;
      a: for (; null !== h; ) {
        switch (h.tag) {
          case 5:
            X = h.stateNode;
            Xj = false;
            break a;
          case 3:
            X = h.stateNode.containerInfo;
            Xj = true;
            break a;
          case 4:
            X = h.stateNode.containerInfo;
            Xj = true;
            break a;
        }
        h = h.return;
      }
      if (null === X) throw Error(p(160));
      Zj(f2, g, e);
      X = null;
      Xj = false;
      var k2 = e.alternate;
      null !== k2 && (k2.return = null);
      e.return = null;
    } catch (l2) {
      W(e, b, l2);
    }
  }
  if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a), b = b.sibling;
}
function dk(a, b) {
  var c = a.alternate, d = a.flags;
  switch (a.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      ck(b, a);
      ek(a);
      if (d & 4) {
        try {
          Pj(3, a, a.return), Qj(3, a);
        } catch (t2) {
          W(a, a.return, t2);
        }
        try {
          Pj(5, a, a.return);
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 1:
      ck(b, a);
      ek(a);
      d & 512 && null !== c && Lj(c, c.return);
      break;
    case 5:
      ck(b, a);
      ek(a);
      d & 512 && null !== c && Lj(c, c.return);
      if (a.flags & 32) {
        var e = a.stateNode;
        try {
          ob(e, "");
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      if (d & 4 && (e = a.stateNode, null != e)) {
        var f2 = a.memoizedProps, g = null !== c ? c.memoizedProps : f2, h = a.type, k2 = a.updateQueue;
        a.updateQueue = null;
        if (null !== k2) try {
          "input" === h && "radio" === f2.type && null != f2.name && ab(e, f2);
          vb(h, g);
          var l2 = vb(h, f2);
          for (g = 0; g < k2.length; g += 2) {
            var m2 = k2[g], q2 = k2[g + 1];
            "style" === m2 ? sb(e, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e, q2) : "children" === m2 ? ob(e, q2) : ta(e, m2, q2, l2);
          }
          switch (h) {
            case "input":
              bb(e, f2);
              break;
            case "textarea":
              ib(e, f2);
              break;
            case "select":
              var r2 = e._wrapperState.wasMultiple;
              e._wrapperState.wasMultiple = !!f2.multiple;
              var y2 = f2.value;
              null != y2 ? fb(e, !!f2.multiple, y2, false) : r2 !== !!f2.multiple && (null != f2.defaultValue ? fb(
                e,
                !!f2.multiple,
                f2.defaultValue,
                true
              ) : fb(e, !!f2.multiple, f2.multiple ? [] : "", false));
          }
          e[Pf] = f2;
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 6:
      ck(b, a);
      ek(a);
      if (d & 4) {
        if (null === a.stateNode) throw Error(p(162));
        e = a.stateNode;
        f2 = a.memoizedProps;
        try {
          e.nodeValue = f2;
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 3:
      ck(b, a);
      ek(a);
      if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
        bd(b.containerInfo);
      } catch (t2) {
        W(a, a.return, t2);
      }
      break;
    case 4:
      ck(b, a);
      ek(a);
      break;
    case 13:
      ck(b, a);
      ek(a);
      e = a.child;
      e.flags & 8192 && (f2 = null !== e.memoizedState, e.stateNode.isHidden = f2, !f2 || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
      d & 4 && ak(a);
      break;
    case 22:
      m2 = null !== c && null !== c.memoizedState;
      a.mode & 1 ? (U = (l2 = U) || m2, ck(b, a), U = l2) : ck(b, a);
      ek(a);
      if (d & 8192) {
        l2 = null !== a.memoizedState;
        if ((a.stateNode.isHidden = l2) && !m2 && 0 !== (a.mode & 1)) for (V = a, m2 = a.child; null !== m2; ) {
          for (q2 = V = m2; null !== V; ) {
            r2 = V;
            y2 = r2.child;
            switch (r2.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Pj(4, r2, r2.return);
                break;
              case 1:
                Lj(r2, r2.return);
                var n2 = r2.stateNode;
                if ("function" === typeof n2.componentWillUnmount) {
                  d = r2;
                  c = r2.return;
                  try {
                    b = d, n2.props = b.memoizedProps, n2.state = b.memoizedState, n2.componentWillUnmount();
                  } catch (t2) {
                    W(d, c, t2);
                  }
                }
                break;
              case 5:
                Lj(r2, r2.return);
                break;
              case 22:
                if (null !== r2.memoizedState) {
                  gk(q2);
                  continue;
                }
            }
            null !== y2 ? (y2.return = r2, V = y2) : gk(q2);
          }
          m2 = m2.sibling;
        }
        a: for (m2 = null, q2 = a; ; ) {
          if (5 === q2.tag) {
            if (null === m2) {
              m2 = q2;
              try {
                e = q2.stateNode, l2 ? (f2 = e.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h = q2.stateNode, k2 = q2.memoizedProps.style, g = void 0 !== k2 && null !== k2 && k2.hasOwnProperty("display") ? k2.display : null, h.style.display = rb("display", g));
              } catch (t2) {
                W(a, a.return, t2);
              }
            }
          } else if (6 === q2.tag) {
            if (null === m2) try {
              q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
            } catch (t2) {
              W(a, a.return, t2);
            }
          } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a) && null !== q2.child) {
            q2.child.return = q2;
            q2 = q2.child;
            continue;
          }
          if (q2 === a) break a;
          for (; null === q2.sibling; ) {
            if (null === q2.return || q2.return === a) break a;
            m2 === q2 && (m2 = null);
            q2 = q2.return;
          }
          m2 === q2 && (m2 = null);
          q2.sibling.return = q2.return;
          q2 = q2.sibling;
        }
      }
      break;
    case 19:
      ck(b, a);
      ek(a);
      d & 4 && ak(a);
      break;
    case 21:
      break;
    default:
      ck(
        b,
        a
      ), ek(a);
  }
}
function ek(a) {
  var b = a.flags;
  if (b & 2) {
    try {
      a: {
        for (var c = a.return; null !== c; ) {
          if (Tj(c)) {
            var d = c;
            break a;
          }
          c = c.return;
        }
        throw Error(p(160));
      }
      switch (d.tag) {
        case 5:
          var e = d.stateNode;
          d.flags & 32 && (ob(e, ""), d.flags &= -33);
          var f2 = Uj(a);
          Wj(a, f2, e);
          break;
        case 3:
        case 4:
          var g = d.stateNode.containerInfo, h = Uj(a);
          Vj(a, h, g);
          break;
        default:
          throw Error(p(161));
      }
    } catch (k2) {
      W(a, a.return, k2);
    }
    a.flags &= -3;
  }
  b & 4096 && (a.flags &= -4097);
}
function hk(a, b, c) {
  V = a;
  ik(a);
}
function ik(a, b, c) {
  for (var d = 0 !== (a.mode & 1); null !== V; ) {
    var e = V, f2 = e.child;
    if (22 === e.tag && d) {
      var g = null !== e.memoizedState || Jj;
      if (!g) {
        var h = e.alternate, k2 = null !== h && null !== h.memoizedState || U;
        h = Jj;
        var l2 = U;
        Jj = g;
        if ((U = k2) && !l2) for (V = e; null !== V; ) g = V, k2 = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k2 ? (k2.return = g, V = k2) : jk(e);
        for (; null !== f2; ) V = f2, ik(f2), f2 = f2.sibling;
        V = e;
        Jj = h;
        U = l2;
      }
      kk(a);
    } else 0 !== (e.subtreeFlags & 8772) && null !== f2 ? (f2.return = e, V = f2) : kk(a);
  }
}
function kk(a) {
  for (; null !== V; ) {
    var b = V;
    if (0 !== (b.flags & 8772)) {
      var c = b.alternate;
      try {
        if (0 !== (b.flags & 8772)) switch (b.tag) {
          case 0:
          case 11:
          case 15:
            U || Qj(5, b);
            break;
          case 1:
            var d = b.stateNode;
            if (b.flags & 4 && !U) if (null === c) d.componentDidMount();
            else {
              var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
              d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
            }
            var f2 = b.updateQueue;
            null !== f2 && sh(b, f2, d);
            break;
          case 3:
            var g = b.updateQueue;
            if (null !== g) {
              c = null;
              if (null !== b.child) switch (b.child.tag) {
                case 5:
                  c = b.child.stateNode;
                  break;
                case 1:
                  c = b.child.stateNode;
              }
              sh(b, g, c);
            }
            break;
          case 5:
            var h = b.stateNode;
            if (null === c && b.flags & 4) {
              c = h;
              var k2 = b.memoizedProps;
              switch (b.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  k2.autoFocus && c.focus();
                  break;
                case "img":
                  k2.src && (c.src = k2.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (null === b.memoizedState) {
              var l2 = b.alternate;
              if (null !== l2) {
                var m2 = l2.memoizedState;
                if (null !== m2) {
                  var q2 = m2.dehydrated;
                  null !== q2 && bd(q2);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(p(163));
        }
        U || b.flags & 512 && Rj(b);
      } catch (r2) {
        W(b, b.return, r2);
      }
    }
    if (b === a) {
      V = null;
      break;
    }
    c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V = c;
      break;
    }
    V = b.return;
  }
}
function gk(a) {
  for (; null !== V; ) {
    var b = V;
    if (b === a) {
      V = null;
      break;
    }
    var c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V = c;
      break;
    }
    V = b.return;
  }
}
function jk(a) {
  for (; null !== V; ) {
    var b = V;
    try {
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          var c = b.return;
          try {
            Qj(4, b);
          } catch (k2) {
            W(b, c, k2);
          }
          break;
        case 1:
          var d = b.stateNode;
          if ("function" === typeof d.componentDidMount) {
            var e = b.return;
            try {
              d.componentDidMount();
            } catch (k2) {
              W(b, e, k2);
            }
          }
          var f2 = b.return;
          try {
            Rj(b);
          } catch (k2) {
            W(b, f2, k2);
          }
          break;
        case 5:
          var g = b.return;
          try {
            Rj(b);
          } catch (k2) {
            W(b, g, k2);
          }
      }
    } catch (k2) {
      W(b, b.return, k2);
    }
    if (b === a) {
      V = null;
      break;
    }
    var h = b.sibling;
    if (null !== h) {
      h.return = b.return;
      V = h;
      break;
    }
    V = b.return;
  }
}
var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q = null, Y = null, Z = 0, fj = 0, ej = Uf(0), T = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
function R() {
  return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
}
function yi(a) {
  if (0 === (a.mode & 1)) return 1;
  if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
  if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
  a = C;
  if (0 !== a) return a;
  a = window.event;
  a = void 0 === a ? 16 : jd(a.type);
  return a;
}
function gi(a, b, c, d) {
  if (50 < yk) throw yk = 0, zk = null, Error(p(185));
  Ac(a, c, d);
  if (0 === (K & 2) || a !== Q) a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
}
function Dk(a, b) {
  var c = a.callbackNode;
  wc(a, b);
  var d = uc(a, a === Q ? Z : 0);
  if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
  else if (b = d & -d, a.callbackPriority !== b) {
    null != c && bc(c);
    if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
      0 === (K & 6) && jg();
    }), c = null;
    else {
      switch (Dc(d)) {
        case 1:
          c = fc;
          break;
        case 4:
          c = gc;
          break;
        case 16:
          c = hc;
          break;
        case 536870912:
          c = jc;
          break;
        default:
          c = hc;
      }
      c = Fk(c, Gk.bind(null, a));
    }
    a.callbackPriority = b;
    a.callbackNode = c;
  }
}
function Gk(a, b) {
  Ak = -1;
  Bk = 0;
  if (0 !== (K & 6)) throw Error(p(327));
  var c = a.callbackNode;
  if (Hk() && a.callbackNode !== c) return null;
  var d = uc(a, a === Q ? Z : 0);
  if (0 === d) return null;
  if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
  else {
    b = d;
    var e = K;
    K |= 2;
    var f2 = Jk();
    if (Q !== a || Z !== b) uk = null, Gj = B() + 500, Kk(a, b);
    do
      try {
        Lk();
        break;
      } catch (h) {
        Mk(a, h);
      }
    while (1);
    $g();
    mk.current = f2;
    K = e;
    null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
  }
  if (0 !== b) {
    2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
    if (1 === b) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
    if (6 === b) Ck(a, d);
    else {
      e = a.current.alternate;
      if (0 === (d & 30) && !Ok(e) && (b = Ik(a, d), 2 === b && (f2 = xc(a), 0 !== f2 && (d = f2, b = Nk(a, f2))), 1 === b)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
      a.finishedWork = e;
      a.finishedLanes = d;
      switch (b) {
        case 0:
        case 1:
          throw Error(p(345));
        case 2:
          Pk(a, tk, uk);
          break;
        case 3:
          Ck(a, d);
          if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
            if (0 !== uc(a, 0)) break;
            e = a.suspendedLanes;
            if ((e & d) !== d) {
              R();
              a.pingedLanes |= a.suspendedLanes & e;
              break;
            }
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 4:
          Ck(a, d);
          if ((d & 4194240) === d) break;
          b = a.eventTimes;
          for (e = -1; 0 < d; ) {
            var g = 31 - oc(d);
            f2 = 1 << g;
            g = b[g];
            g > e && (e = g);
            d &= ~f2;
          }
          d = e;
          d = B() - d;
          d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
          if (10 < d) {
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 5:
          Pk(a, tk, uk);
          break;
        default:
          throw Error(p(329));
      }
    }
  }
  Dk(a, B());
  return a.callbackNode === c ? Gk.bind(null, a) : null;
}
function Nk(a, b) {
  var c = sk;
  a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
  a = Ik(a, b);
  2 !== a && (b = tk, tk = c, null !== b && Fj(b));
  return a;
}
function Fj(a) {
  null === tk ? tk = a : tk.push.apply(tk, a);
}
function Ok(a) {
  for (var b = a; ; ) {
    if (b.flags & 16384) {
      var c = b.updateQueue;
      if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
        var e = c[d], f2 = e.getSnapshot;
        e = e.value;
        try {
          if (!He(f2(), e)) return false;
        } catch (g) {
          return false;
        }
      }
    }
    c = b.child;
    if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
    else {
      if (b === a) break;
      for (; null === b.sibling; ) {
        if (null === b.return || b.return === a) return true;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
  }
  return true;
}
function Ck(a, b) {
  b &= ~rk;
  b &= ~qk;
  a.suspendedLanes |= b;
  a.pingedLanes &= ~b;
  for (a = a.expirationTimes; 0 < b; ) {
    var c = 31 - oc(b), d = 1 << c;
    a[c] = -1;
    b &= ~d;
  }
}
function Ek(a) {
  if (0 !== (K & 6)) throw Error(p(327));
  Hk();
  var b = uc(a, 0);
  if (0 === (b & 1)) return Dk(a, B()), null;
  var c = Ik(a, b);
  if (0 !== a.tag && 2 === c) {
    var d = xc(a);
    0 !== d && (b = d, c = Nk(a, d));
  }
  if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
  if (6 === c) throw Error(p(345));
  a.finishedWork = a.current.alternate;
  a.finishedLanes = b;
  Pk(a, tk, uk);
  Dk(a, B());
  return null;
}
function Qk(a, b) {
  var c = K;
  K |= 1;
  try {
    return a(b);
  } finally {
    K = c, 0 === K && (Gj = B() + 500, fg && jg());
  }
}
function Rk(a) {
  null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
  var b = K;
  K |= 1;
  var c = ok.transition, d = C;
  try {
    if (ok.transition = null, C = 1, a) return a();
  } finally {
    C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
  }
}
function Hj() {
  fj = ej.current;
  E(ej);
}
function Kk(a, b) {
  a.finishedWork = null;
  a.finishedLanes = 0;
  var c = a.timeoutHandle;
  -1 !== c && (a.timeoutHandle = -1, Gf(c));
  if (null !== Y) for (c = Y.return; null !== c; ) {
    var d = c;
    wg(d);
    switch (d.tag) {
      case 1:
        d = d.type.childContextTypes;
        null !== d && void 0 !== d && $f();
        break;
      case 3:
        zh();
        E(Wf);
        E(H);
        Eh();
        break;
      case 5:
        Bh(d);
        break;
      case 4:
        zh();
        break;
      case 13:
        E(L);
        break;
      case 19:
        E(L);
        break;
      case 10:
        ah(d.type._context);
        break;
      case 22:
      case 23:
        Hj();
    }
    c = c.return;
  }
  Q = a;
  Y = a = Pg(a.current, null);
  Z = fj = b;
  T = 0;
  pk = null;
  rk = qk = rh = 0;
  tk = sk = null;
  if (null !== fh) {
    for (b = 0; b < fh.length; b++) if (c = fh[b], d = c.interleaved, null !== d) {
      c.interleaved = null;
      var e = d.next, f2 = c.pending;
      if (null !== f2) {
        var g = f2.next;
        f2.next = e;
        d.next = g;
      }
      c.pending = d;
    }
    fh = null;
  }
  return a;
}
function Mk(a, b) {
  do {
    var c = Y;
    try {
      $g();
      Fh.current = Rh;
      if (Ih) {
        for (var d = M.memoizedState; null !== d; ) {
          var e = d.queue;
          null !== e && (e.pending = null);
          d = d.next;
        }
        Ih = false;
      }
      Hh = 0;
      O = N = M = null;
      Jh = false;
      Kh = 0;
      nk.current = null;
      if (null === c || null === c.return) {
        T = 1;
        pk = b;
        Y = null;
        break;
      }
      a: {
        var f2 = a, g = c.return, h = c, k2 = b;
        b = Z;
        h.flags |= 32768;
        if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
          var l2 = k2, m2 = h, q2 = m2.tag;
          if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
            var r2 = m2.alternate;
            r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
          }
          var y2 = Ui(g);
          if (null !== y2) {
            y2.flags &= -257;
            Vi(y2, g, h, f2, b);
            y2.mode & 1 && Si(f2, l2, b);
            b = y2;
            k2 = l2;
            var n2 = b.updateQueue;
            if (null === n2) {
              var t2 = /* @__PURE__ */ new Set();
              t2.add(k2);
              b.updateQueue = t2;
            } else n2.add(k2);
            break a;
          } else {
            if (0 === (b & 1)) {
              Si(f2, l2, b);
              tj();
              break a;
            }
            k2 = Error(p(426));
          }
        } else if (I && h.mode & 1) {
          var J2 = Ui(g);
          if (null !== J2) {
            0 === (J2.flags & 65536) && (J2.flags |= 256);
            Vi(J2, g, h, f2, b);
            Jg(Ji(k2, h));
            break a;
          }
        }
        f2 = k2 = Ji(k2, h);
        4 !== T && (T = 2);
        null === sk ? sk = [f2] : sk.push(f2);
        f2 = g;
        do {
          switch (f2.tag) {
            case 3:
              f2.flags |= 65536;
              b &= -b;
              f2.lanes |= b;
              var x2 = Ni(f2, k2, b);
              ph(f2, x2);
              break a;
            case 1:
              h = k2;
              var w2 = f2.type, u2 = f2.stateNode;
              if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Ri || !Ri.has(u2)))) {
                f2.flags |= 65536;
                b &= -b;
                f2.lanes |= b;
                var F2 = Qi(f2, h, b);
                ph(f2, F2);
                break a;
              }
          }
          f2 = f2.return;
        } while (null !== f2);
      }
      Sk(c);
    } catch (na) {
      b = na;
      Y === c && null !== c && (Y = c = c.return);
      continue;
    }
    break;
  } while (1);
}
function Jk() {
  var a = mk.current;
  mk.current = Rh;
  return null === a ? Rh : a;
}
function tj() {
  if (0 === T || 3 === T || 2 === T) T = 4;
  null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
}
function Ik(a, b) {
  var c = K;
  K |= 2;
  var d = Jk();
  if (Q !== a || Z !== b) uk = null, Kk(a, b);
  do
    try {
      Tk();
      break;
    } catch (e) {
      Mk(a, e);
    }
  while (1);
  $g();
  K = c;
  mk.current = d;
  if (null !== Y) throw Error(p(261));
  Q = null;
  Z = 0;
  return T;
}
function Tk() {
  for (; null !== Y; ) Uk(Y);
}
function Lk() {
  for (; null !== Y && !cc(); ) Uk(Y);
}
function Uk(a) {
  var b = Vk(a.alternate, a, fj);
  a.memoizedProps = a.pendingProps;
  null === b ? Sk(a) : Y = b;
  nk.current = null;
}
function Sk(a) {
  var b = a;
  do {
    var c = b.alternate;
    a = b.return;
    if (0 === (b.flags & 32768)) {
      if (c = Ej(c, b, fj), null !== c) {
        Y = c;
        return;
      }
    } else {
      c = Ij(c, b);
      if (null !== c) {
        c.flags &= 32767;
        Y = c;
        return;
      }
      if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
      else {
        T = 6;
        Y = null;
        return;
      }
    }
    b = b.sibling;
    if (null !== b) {
      Y = b;
      return;
    }
    Y = b = a;
  } while (null !== b);
  0 === T && (T = 5);
}
function Pk(a, b, c) {
  var d = C, e = ok.transition;
  try {
    ok.transition = null, C = 1, Wk(a, b, c, d);
  } finally {
    ok.transition = e, C = d;
  }
  return null;
}
function Wk(a, b, c, d) {
  do
    Hk();
  while (null !== wk);
  if (0 !== (K & 6)) throw Error(p(327));
  c = a.finishedWork;
  var e = a.finishedLanes;
  if (null === c) return null;
  a.finishedWork = null;
  a.finishedLanes = 0;
  if (c === a.current) throw Error(p(177));
  a.callbackNode = null;
  a.callbackPriority = 0;
  var f2 = c.lanes | c.childLanes;
  Bc(a, f2);
  a === Q && (Y = Q = null, Z = 0);
  0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
    Hk();
    return null;
  }));
  f2 = 0 !== (c.flags & 15990);
  if (0 !== (c.subtreeFlags & 15990) || f2) {
    f2 = ok.transition;
    ok.transition = null;
    var g = C;
    C = 1;
    var h = K;
    K |= 4;
    nk.current = null;
    Oj(a, c);
    dk(c, a);
    Oe(Df);
    dd = !!Cf;
    Df = Cf = null;
    a.current = c;
    hk(c);
    dc();
    K = h;
    C = g;
    ok.transition = f2;
  } else a.current = c;
  vk && (vk = false, wk = a, xk = e);
  f2 = a.pendingLanes;
  0 === f2 && (Ri = null);
  mc(c.stateNode);
  Dk(a, B());
  if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
  if (Oi) throw Oi = false, a = Pi, Pi = null, a;
  0 !== (xk & 1) && 0 !== a.tag && Hk();
  f2 = a.pendingLanes;
  0 !== (f2 & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
  jg();
  return null;
}
function Hk() {
  if (null !== wk) {
    var a = Dc(xk), b = ok.transition, c = C;
    try {
      ok.transition = null;
      C = 16 > a ? 16 : a;
      if (null === wk) var d = false;
      else {
        a = wk;
        wk = null;
        xk = 0;
        if (0 !== (K & 6)) throw Error(p(331));
        var e = K;
        K |= 4;
        for (V = a.current; null !== V; ) {
          var f2 = V, g = f2.child;
          if (0 !== (V.flags & 16)) {
            var h = f2.deletions;
            if (null !== h) {
              for (var k2 = 0; k2 < h.length; k2++) {
                var l2 = h[k2];
                for (V = l2; null !== V; ) {
                  var m2 = V;
                  switch (m2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(8, m2, f2);
                  }
                  var q2 = m2.child;
                  if (null !== q2) q2.return = m2, V = q2;
                  else for (; null !== V; ) {
                    m2 = V;
                    var r2 = m2.sibling, y2 = m2.return;
                    Sj(m2);
                    if (m2 === l2) {
                      V = null;
                      break;
                    }
                    if (null !== r2) {
                      r2.return = y2;
                      V = r2;
                      break;
                    }
                    V = y2;
                  }
                }
              }
              var n2 = f2.alternate;
              if (null !== n2) {
                var t2 = n2.child;
                if (null !== t2) {
                  n2.child = null;
                  do {
                    var J2 = t2.sibling;
                    t2.sibling = null;
                    t2 = J2;
                  } while (null !== t2);
                }
              }
              V = f2;
            }
          }
          if (0 !== (f2.subtreeFlags & 2064) && null !== g) g.return = f2, V = g;
          else b: for (; null !== V; ) {
            f2 = V;
            if (0 !== (f2.flags & 2048)) switch (f2.tag) {
              case 0:
              case 11:
              case 15:
                Pj(9, f2, f2.return);
            }
            var x2 = f2.sibling;
            if (null !== x2) {
              x2.return = f2.return;
              V = x2;
              break b;
            }
            V = f2.return;
          }
        }
        var w2 = a.current;
        for (V = w2; null !== V; ) {
          g = V;
          var u2 = g.child;
          if (0 !== (g.subtreeFlags & 2064) && null !== u2) u2.return = g, V = u2;
          else b: for (g = w2; null !== V; ) {
            h = V;
            if (0 !== (h.flags & 2048)) try {
              switch (h.tag) {
                case 0:
                case 11:
                case 15:
                  Qj(9, h);
              }
            } catch (na) {
              W(h, h.return, na);
            }
            if (h === g) {
              V = null;
              break b;
            }
            var F2 = h.sibling;
            if (null !== F2) {
              F2.return = h.return;
              V = F2;
              break b;
            }
            V = h.return;
          }
        }
        K = e;
        jg();
        if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
          lc.onPostCommitFiberRoot(kc, a);
        } catch (na) {
        }
        d = true;
      }
      return d;
    } finally {
      C = c, ok.transition = b;
    }
  }
  return false;
}
function Xk(a, b, c) {
  b = Ji(c, b);
  b = Ni(a, b, 1);
  a = nh(a, b, 1);
  b = R();
  null !== a && (Ac(a, 1, b), Dk(a, b));
}
function W(a, b, c) {
  if (3 === a.tag) Xk(a, a, c);
  else for (; null !== b; ) {
    if (3 === b.tag) {
      Xk(b, a, c);
      break;
    } else if (1 === b.tag) {
      var d = b.stateNode;
      if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
        a = Ji(c, a);
        a = Qi(b, a, 1);
        b = nh(b, a, 1);
        a = R();
        null !== b && (Ac(b, 1, a), Dk(b, a));
        break;
      }
    }
    b = b.return;
  }
}
function Ti(a, b, c) {
  var d = a.pingCache;
  null !== d && d.delete(b);
  b = R();
  a.pingedLanes |= a.suspendedLanes & c;
  Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
  Dk(a, b);
}
function Yk(a, b) {
  0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
  var c = R();
  a = ih(a, b);
  null !== a && (Ac(a, b, c), Dk(a, c));
}
function uj(a) {
  var b = a.memoizedState, c = 0;
  null !== b && (c = b.retryLane);
  Yk(a, c);
}
function bk(a, b) {
  var c = 0;
  switch (a.tag) {
    case 13:
      var d = a.stateNode;
      var e = a.memoizedState;
      null !== e && (c = e.retryLane);
      break;
    case 19:
      d = a.stateNode;
      break;
    default:
      throw Error(p(314));
  }
  null !== d && d.delete(b);
  Yk(a, c);
}
var Vk;
Vk = function(a, b, c) {
  if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) dh = true;
  else {
    if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return dh = false, yj(a, b, c);
    dh = 0 !== (a.flags & 131072) ? true : false;
  }
  else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
  b.lanes = 0;
  switch (b.tag) {
    case 2:
      var d = b.type;
      ij(a, b);
      a = b.pendingProps;
      var e = Yf(b, H.current);
      ch(b, c);
      e = Nh(null, b, d, a, e, c);
      var f2 = Sh();
      b.flags |= 1;
      "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f2 = true, cg(b)) : f2 = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, true, f2, c)) : (b.tag = 0, I && f2 && vg(b), Xi(null, b, e, c), b = b.child);
      return b;
    case 16:
      d = b.elementType;
      a: {
        ij(a, b);
        a = b.pendingProps;
        e = d._init;
        d = e(d._payload);
        b.type = d;
        e = b.tag = Zk(d);
        a = Ci(d, a);
        switch (e) {
          case 0:
            b = cj(null, b, d, a, c);
            break a;
          case 1:
            b = hj(null, b, d, a, c);
            break a;
          case 11:
            b = Yi(null, b, d, a, c);
            break a;
          case 14:
            b = $i(null, b, d, Ci(d.type, a), c);
            break a;
        }
        throw Error(p(
          306,
          d,
          ""
        ));
      }
      return b;
    case 0:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
    case 1:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
    case 3:
      a: {
        kj(b);
        if (null === a) throw Error(p(387));
        d = b.pendingProps;
        f2 = b.memoizedState;
        e = f2.element;
        lh(a, b);
        qh(b, d, null, c);
        var g = b.memoizedState;
        d = g.element;
        if (f2.isDehydrated) if (f2 = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f2, b.memoizedState = f2, b.flags & 256) {
          e = Ji(Error(p(423)), b);
          b = lj(a, b, d, c, e);
          break a;
        } else if (d !== e) {
          e = Ji(Error(p(424)), b);
          b = lj(a, b, d, c, e);
          break a;
        } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; ) c.flags = c.flags & -3 | 4096, c = c.sibling;
        else {
          Ig();
          if (d === e) {
            b = Zi(a, b, c);
            break a;
          }
          Xi(a, b, d, c);
        }
        b = b.child;
      }
      return b;
    case 5:
      return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f2 = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f2 && Ef(d, f2) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
    case 6:
      return null === a && Eg(b), null;
    case 13:
      return oj(a, b, c);
    case 4:
      return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
    case 11:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
    case 7:
      return Xi(a, b, b.pendingProps, c), b.child;
    case 8:
      return Xi(a, b, b.pendingProps.children, c), b.child;
    case 12:
      return Xi(a, b, b.pendingProps.children, c), b.child;
    case 10:
      a: {
        d = b.type._context;
        e = b.pendingProps;
        f2 = b.memoizedProps;
        g = e.value;
        G(Wg, d._currentValue);
        d._currentValue = g;
        if (null !== f2) if (He(f2.value, g)) {
          if (f2.children === e.children && !Wf.current) {
            b = Zi(a, b, c);
            break a;
          }
        } else for (f2 = b.child, null !== f2 && (f2.return = b); null !== f2; ) {
          var h = f2.dependencies;
          if (null !== h) {
            g = f2.child;
            for (var k2 = h.firstContext; null !== k2; ) {
              if (k2.context === d) {
                if (1 === f2.tag) {
                  k2 = mh(-1, c & -c);
                  k2.tag = 2;
                  var l2 = f2.updateQueue;
                  if (null !== l2) {
                    l2 = l2.shared;
                    var m2 = l2.pending;
                    null === m2 ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                    l2.pending = k2;
                  }
                }
                f2.lanes |= c;
                k2 = f2.alternate;
                null !== k2 && (k2.lanes |= c);
                bh(
                  f2.return,
                  c,
                  b
                );
                h.lanes |= c;
                break;
              }
              k2 = k2.next;
            }
          } else if (10 === f2.tag) g = f2.type === b.type ? null : f2.child;
          else if (18 === f2.tag) {
            g = f2.return;
            if (null === g) throw Error(p(341));
            g.lanes |= c;
            h = g.alternate;
            null !== h && (h.lanes |= c);
            bh(g, c, b);
            g = f2.sibling;
          } else g = f2.child;
          if (null !== g) g.return = f2;
          else for (g = f2; null !== g; ) {
            if (g === b) {
              g = null;
              break;
            }
            f2 = g.sibling;
            if (null !== f2) {
              f2.return = g.return;
              g = f2;
              break;
            }
            g = g.return;
          }
          f2 = g;
        }
        Xi(a, b, e.children, c);
        b = b.child;
      }
      return b;
    case 9:
      return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
    case 14:
      return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
    case 15:
      return bj(a, b, b.type, b.pendingProps, c);
    case 17:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, true, a, c);
    case 19:
      return xj(a, b, c);
    case 22:
      return dj(a, b, c);
  }
  throw Error(p(156, b.tag));
};
function Fk(a, b) {
  return ac(a, b);
}
function $k(a, b, c, d) {
  this.tag = a;
  this.key = c;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function Bg(a, b, c, d) {
  return new $k(a, b, c, d);
}
function aj(a) {
  a = a.prototype;
  return !(!a || !a.isReactComponent);
}
function Zk(a) {
  if ("function" === typeof a) return aj(a) ? 1 : 0;
  if (void 0 !== a && null !== a) {
    a = a.$$typeof;
    if (a === Da) return 11;
    if (a === Ga) return 14;
  }
  return 2;
}
function Pg(a, b) {
  var c = a.alternate;
  null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
  c.flags = a.flags & 14680064;
  c.childLanes = a.childLanes;
  c.lanes = a.lanes;
  c.child = a.child;
  c.memoizedProps = a.memoizedProps;
  c.memoizedState = a.memoizedState;
  c.updateQueue = a.updateQueue;
  b = a.dependencies;
  c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
  c.sibling = a.sibling;
  c.index = a.index;
  c.ref = a.ref;
  return c;
}
function Rg(a, b, c, d, e, f2) {
  var g = 2;
  d = a;
  if ("function" === typeof a) aj(a) && (g = 1);
  else if ("string" === typeof a) g = 5;
  else a: switch (a) {
    case ya:
      return Tg(c.children, e, f2, b);
    case za:
      g = 8;
      e |= 8;
      break;
    case Aa:
      return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f2, a;
    case Ea:
      return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f2, a;
    case Fa:
      return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f2, a;
    case Ia:
      return pj(c, e, f2, b);
    default:
      if ("object" === typeof a && null !== a) switch (a.$$typeof) {
        case Ba:
          g = 10;
          break a;
        case Ca:
          g = 9;
          break a;
        case Da:
          g = 11;
          break a;
        case Ga:
          g = 14;
          break a;
        case Ha:
          g = 16;
          d = null;
          break a;
      }
      throw Error(p(130, null == a ? a : typeof a, ""));
  }
  b = Bg(g, c, b, e);
  b.elementType = a;
  b.type = d;
  b.lanes = f2;
  return b;
}
function Tg(a, b, c, d) {
  a = Bg(7, a, d, b);
  a.lanes = c;
  return a;
}
function pj(a, b, c, d) {
  a = Bg(22, a, d, b);
  a.elementType = Ia;
  a.lanes = c;
  a.stateNode = { isHidden: false };
  return a;
}
function Qg(a, b, c) {
  a = Bg(6, a, null, b);
  a.lanes = c;
  return a;
}
function Sg(a, b, c) {
  b = Bg(4, null !== a.children ? a.children : [], a.key, b);
  b.lanes = c;
  b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
  return b;
}
function al(a, b, c, d, e) {
  this.tag = b;
  this.containerInfo = a;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = zc(0);
  this.expirationTimes = zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = zc(0);
  this.identifierPrefix = d;
  this.onRecoverableError = e;
  this.mutableSourceEagerHydrationData = null;
}
function bl(a, b, c, d, e, f2, g, h, k2) {
  a = new al(a, b, c, h, k2);
  1 === b ? (b = 1, true === f2 && (b |= 8)) : b = 0;
  f2 = Bg(3, null, null, b);
  a.current = f2;
  f2.stateNode = a;
  f2.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
  kh(f2);
  return a;
}
function cl(a, b, c) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
}
function dl(a) {
  if (!a) return Vf;
  a = a._reactInternals;
  a: {
    if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
    var b = a;
    do {
      switch (b.tag) {
        case 3:
          b = b.stateNode.context;
          break a;
        case 1:
          if (Zf(b.type)) {
            b = b.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b = b.return;
    } while (null !== b);
    throw Error(p(171));
  }
  if (1 === a.tag) {
    var c = a.type;
    if (Zf(c)) return bg(a, c, b);
  }
  return b;
}
function el(a, b, c, d, e, f2, g, h, k2) {
  a = bl(c, d, true, a, e, f2, g, h, k2);
  a.context = dl(null);
  c = a.current;
  d = R();
  e = yi(c);
  f2 = mh(d, e);
  f2.callback = void 0 !== b && null !== b ? b : null;
  nh(c, f2, e);
  a.current.lanes = e;
  Ac(a, e, d);
  Dk(a, d);
  return a;
}
function fl(a, b, c, d) {
  var e = b.current, f2 = R(), g = yi(e);
  c = dl(c);
  null === b.context ? b.context = c : b.pendingContext = c;
  b = mh(f2, g);
  b.payload = { element: a };
  d = void 0 === d ? null : d;
  null !== d && (b.callback = d);
  a = nh(e, b, g);
  null !== a && (gi(a, e, g, f2), oh(a, e, g));
  return g;
}
function gl(a) {
  a = a.current;
  if (!a.child) return null;
  switch (a.child.tag) {
    case 5:
      return a.child.stateNode;
    default:
      return a.child.stateNode;
  }
}
function hl(a, b) {
  a = a.memoizedState;
  if (null !== a && null !== a.dehydrated) {
    var c = a.retryLane;
    a.retryLane = 0 !== c && c < b ? c : b;
  }
}
function il(a, b) {
  hl(a, b);
  (a = a.alternate) && hl(a, b);
}
function jl() {
  return null;
}
var kl = "function" === typeof reportError ? reportError : function(a) {
  console.error(a);
};
function ll(a) {
  this._internalRoot = a;
}
ml.prototype.render = ll.prototype.render = function(a) {
  var b = this._internalRoot;
  if (null === b) throw Error(p(409));
  fl(a, b, null, null);
};
ml.prototype.unmount = ll.prototype.unmount = function() {
  var a = this._internalRoot;
  if (null !== a) {
    this._internalRoot = null;
    var b = a.containerInfo;
    Rk(function() {
      fl(null, a, null, null);
    });
    b[uf] = null;
  }
};
function ml(a) {
  this._internalRoot = a;
}
ml.prototype.unstable_scheduleHydration = function(a) {
  if (a) {
    var b = Hc();
    a = { blockedOn: null, target: a, priority: b };
    for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++) ;
    Qc.splice(c, 0, a);
    0 === c && Vc(a);
  }
};
function nl(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
}
function ol(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
}
function pl() {
}
function ql(a, b, c, d, e) {
  if (e) {
    if ("function" === typeof d) {
      var f2 = d;
      d = function() {
        var a2 = gl(g);
        f2.call(a2);
      };
    }
    var g = el(b, d, a, 0, null, false, false, "", pl);
    a._reactRootContainer = g;
    a[uf] = g.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    Rk();
    return g;
  }
  for (; e = a.lastChild; ) a.removeChild(e);
  if ("function" === typeof d) {
    var h = d;
    d = function() {
      var a2 = gl(k2);
      h.call(a2);
    };
  }
  var k2 = bl(a, 0, false, null, null, false, false, "", pl);
  a._reactRootContainer = k2;
  a[uf] = k2.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  Rk(function() {
    fl(b, k2, c, d);
  });
  return k2;
}
function rl(a, b, c, d, e) {
  var f2 = c._reactRootContainer;
  if (f2) {
    var g = f2;
    if ("function" === typeof e) {
      var h = e;
      e = function() {
        var a2 = gl(g);
        h.call(a2);
      };
    }
    fl(b, g, a, e);
  } else g = ql(c, b, a, e, d);
  return gl(g);
}
Ec = function(a) {
  switch (a.tag) {
    case 3:
      var b = a.stateNode;
      if (b.current.memoizedState.isDehydrated) {
        var c = tc(b.pendingLanes);
        0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
      }
      break;
    case 13:
      Rk(function() {
        var b2 = ih(a, 1);
        if (null !== b2) {
          var c2 = R();
          gi(b2, a, 1, c2);
        }
      }), il(a, 1);
  }
};
Fc = function(a) {
  if (13 === a.tag) {
    var b = ih(a, 134217728);
    if (null !== b) {
      var c = R();
      gi(b, a, 134217728, c);
    }
    il(a, 134217728);
  }
};
Gc = function(a) {
  if (13 === a.tag) {
    var b = yi(a), c = ih(a, b);
    if (null !== c) {
      var d = R();
      gi(c, a, b, d);
    }
    il(a, b);
  }
};
Hc = function() {
  return C;
};
Ic = function(a, b) {
  var c = C;
  try {
    return C = a, b();
  } finally {
    C = c;
  }
};
yb = function(a, b, c) {
  switch (b) {
    case "input":
      bb(a, c);
      b = c.name;
      if ("radio" === c.type && null != b) {
        for (c = a; c.parentNode; ) c = c.parentNode;
        c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
        for (b = 0; b < c.length; b++) {
          var d = c[b];
          if (d !== a && d.form === a.form) {
            var e = Db(d);
            if (!e) throw Error(p(90));
            Wa(d);
            bb(d, e);
          }
        }
      }
      break;
    case "textarea":
      ib(a, c);
      break;
    case "select":
      b = c.value, null != b && fb(a, !!c.multiple, b, false);
  }
};
Gb = Qk;
Hb = Rk;
var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
  a = Zb(a);
  return null === a ? null : a.stateNode;
}, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!vl.isDisabled && vl.supportsFiber) try {
    kc = vl.inject(ul), lc = vl;
  } catch (a) {
  }
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
reactDom_production_min.createPortal = function(a, b) {
  var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!nl(b)) throw Error(p(200));
  return cl(a, b, null, c);
};
reactDom_production_min.createRoot = function(a, b) {
  if (!nl(a)) throw Error(p(299));
  var c = false, d = "", e = kl;
  null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
  b = bl(a, 1, false, null, null, c, false, d, e);
  a[uf] = b.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  return new ll(b);
};
reactDom_production_min.findDOMNode = function(a) {
  if (null == a) return null;
  if (1 === a.nodeType) return a;
  var b = a._reactInternals;
  if (void 0 === b) {
    if ("function" === typeof a.render) throw Error(p(188));
    a = Object.keys(a).join(",");
    throw Error(p(268, a));
  }
  a = Zb(b);
  a = null === a ? null : a.stateNode;
  return a;
};
reactDom_production_min.flushSync = function(a) {
  return Rk(a);
};
reactDom_production_min.hydrate = function(a, b, c) {
  if (!ol(b)) throw Error(p(200));
  return rl(null, a, b, true, c);
};
reactDom_production_min.hydrateRoot = function(a, b, c) {
  if (!nl(a)) throw Error(p(405));
  var d = null != c && c.hydratedSources || null, e = false, f2 = "", g = kl;
  null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f2 = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
  b = el(b, null, a, 1, null != c ? c : null, e, false, f2, g);
  a[uf] = b.current;
  sf(a);
  if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
    c,
    e
  );
  return new ml(b);
};
reactDom_production_min.render = function(a, b, c) {
  if (!ol(b)) throw Error(p(200));
  return rl(null, a, b, false, c);
};
reactDom_production_min.unmountComponentAtNode = function(a) {
  if (!ol(a)) throw Error(p(40));
  return a._reactRootContainer ? (Rk(function() {
    rl(null, null, a, false, function() {
      a._reactRootContainer = null;
      a[uf] = null;
    });
  }), true) : false;
};
reactDom_production_min.unstable_batchedUpdates = Qk;
reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
  if (!ol(c)) throw Error(p(200));
  if (null == a || void 0 === a._reactInternals) throw Error(p(38));
  return rl(a, b, c, false, d);
};
reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  reactDom.exports = reactDom_production_min;
}
var reactDomExports = reactDom.exports;
var createRoot;
var m = reactDomExports;
{
  createRoot = m.createRoot;
  m.hydrateRoot;
}
/**
 * react-router v7.9.6
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var PopStateEventType = "popstate";
function createBrowserHistory(options = {}) {
  function createBrowserLocation(window2, globalHistory) {
    let { pathname, search, hash } = window2.location;
    return createLocation(
      "",
      { pathname, search, hash },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  function createBrowserHref(window2, to) {
    return typeof to === "string" ? to : createPath(to);
  }
  return getUrlBasedHistory(
    createBrowserLocation,
    createBrowserHref,
    null,
    options
  );
}
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined") console.warn(message);
    try {
      throw new Error(message);
    } catch (e) {
    }
  }
}
function createKey() {
  return Math.random().toString(36).substring(2, 10);
}
function getHistoryState(location2, index) {
  return {
    usr: location2.state,
    key: location2.key,
    idx: index
  };
}
function createLocation(current, to, state = null, key) {
  let location2 = {
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: "",
    ...typeof to === "string" ? parsePath(to) : to,
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey()
  };
  return location2;
}
function createPath({
  pathname = "/",
  search = "",
  hash = ""
}) {
  if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substring(hashIndex);
      path = path.substring(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substring(searchIndex);
      path = path.substring(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
function getUrlBasedHistory(getLocation, createHref2, validateLocation, options = {}) {
  let { window: window2 = document.defaultView, v5Compat = false } = options;
  let globalHistory = window2.history;
  let action = "POP";
  let listener = null;
  let index = getIndex();
  if (index == null) {
    index = 0;
    globalHistory.replaceState({ ...globalHistory.state, idx: index }, "");
  }
  function getIndex() {
    let state = globalHistory.state || { idx: null };
    return state.idx;
  }
  function handlePop() {
    action = "POP";
    let nextIndex = getIndex();
    let delta = nextIndex == null ? null : nextIndex - index;
    index = nextIndex;
    if (listener) {
      listener({ action, location: history.location, delta });
    }
  }
  function push(to, state) {
    action = "PUSH";
    let location2 = createLocation(history.location, to, state);
    index = getIndex() + 1;
    let historyState = getHistoryState(location2, index);
    let url = history.createHref(location2);
    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      if (error instanceof DOMException && error.name === "DataCloneError") {
        throw error;
      }
      window2.location.assign(url);
    }
    if (v5Compat && listener) {
      listener({ action, location: history.location, delta: 1 });
    }
  }
  function replace2(to, state) {
    action = "REPLACE";
    let location2 = createLocation(history.location, to, state);
    index = getIndex();
    let historyState = getHistoryState(location2, index);
    let url = history.createHref(location2);
    globalHistory.replaceState(historyState, "", url);
    if (v5Compat && listener) {
      listener({ action, location: history.location, delta: 0 });
    }
  }
  function createURL(to) {
    return createBrowserURLImpl(to);
  }
  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window2, globalHistory);
    },
    listen(fn) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }
      window2.addEventListener(PopStateEventType, handlePop);
      listener = fn;
      return () => {
        window2.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
    createHref(to) {
      return createHref2(window2, to);
    },
    createURL,
    encodeLocation(to) {
      let url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },
    push,
    replace: replace2,
    go(n2) {
      return globalHistory.go(n2);
    }
  };
  return history;
}
function createBrowserURLImpl(to, isAbsolute = false) {
  let base = "http://localhost";
  if (typeof window !== "undefined") {
    base = window.location.origin !== "null" ? window.location.origin : window.location.href;
  }
  invariant(base, "No window.location.(origin|href) available to create URL");
  let href = typeof to === "string" ? to : createPath(to);
  href = href.replace(/ $/, "%20");
  if (!isAbsolute && href.startsWith("//")) {
    href = base + href;
  }
  return new URL(href, base);
}
var _map;
var RouterContextProvider = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(init) {
    __privateAdd(this, _map, /* @__PURE__ */ new Map());
    if (init) {
      for (let [context, value] of init) {
        this.set(context, value);
      }
    }
  }
  /**
   * Access a value from the context. If no value has been set for the context,
   * it will return the context's `defaultValue` if provided, or throw an error
   * if no `defaultValue` was set.
   * @param context The context to get the value for
   * @returns The value for the context, or the context's `defaultValue` if no
   * value was set
   */
  get(context) {
    if (__privateGet(this, _map).has(context)) {
      return __privateGet(this, _map).get(context);
    }
    if (context.defaultValue !== void 0) {
      return context.defaultValue;
    }
    throw new Error("No value found for context");
  }
  /**
   * Set a value for the context. If the context already has a value set, this
   * will overwrite it.
   *
   * @param context The context to set the value for
   * @param value The value to set for the context
   * @returns {void}
   */
  set(context, value) {
    __privateGet(this, _map).set(context, value);
  }
};
_map = /* @__PURE__ */ new WeakMap();
var unsupportedLazyRouteObjectKeys = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function isUnsupportedLazyRouteObjectKey(key) {
  return unsupportedLazyRouteObjectKeys.has(
    key
  );
}
var unsupportedLazyRouteFunctionKeys = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function isUnsupportedLazyRouteFunctionKey(key) {
  return unsupportedLazyRouteFunctionKeys.has(
    key
  );
}
function isIndexRoute(route) {
  return route.index === true;
}
function convertRoutesToDataRoutes(routes, mapRouteProperties2, parentPath = [], manifest = {}, allowInPlaceMutations = false) {
  return routes.map((route, index) => {
    let treePath = [...parentPath, String(index)];
    let id2 = typeof route.id === "string" ? route.id : treePath.join("-");
    invariant(
      route.index !== true || !route.children,
      `Cannot specify children on an index route`
    );
    invariant(
      allowInPlaceMutations || !manifest[id2],
      `Found a route id collision on id "${id2}".  Route id's must be globally unique within Data Router usages`
    );
    if (isIndexRoute(route)) {
      let indexRoute = {
        ...route,
        id: id2
      };
      manifest[id2] = mergeRouteUpdates(
        indexRoute,
        mapRouteProperties2(indexRoute)
      );
      return indexRoute;
    } else {
      let pathOrLayoutRoute = {
        ...route,
        id: id2,
        children: void 0
      };
      manifest[id2] = mergeRouteUpdates(
        pathOrLayoutRoute,
        mapRouteProperties2(pathOrLayoutRoute)
      );
      if (route.children) {
        pathOrLayoutRoute.children = convertRoutesToDataRoutes(
          route.children,
          mapRouteProperties2,
          treePath,
          manifest,
          allowInPlaceMutations
        );
      }
      return pathOrLayoutRoute;
    }
  });
}
function mergeRouteUpdates(route, updates) {
  return Object.assign(route, {
    ...updates,
    ...typeof updates.lazy === "object" && updates.lazy != null ? {
      lazy: {
        ...route.lazy,
        ...updates.lazy
      }
    } : {}
  });
}
function matchRoutes(routes, locationArg, basename = "/") {
  return matchRoutesImpl(routes, locationArg, basename, false);
}
function matchRoutesImpl(routes, locationArg, basename, allowPartial) {
  let location2 = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location2.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i) {
    let decoded = decodePath(pathname);
    matches = matchRouteBranch(
      branches[i],
      decoded,
      allowPartial
    );
  }
  return matches;
}
function convertRouteMatchToUiMatch(match, loaderData) {
  let { route, pathname, params } = match;
  return {
    id: route.id,
    pathname,
    params,
    data: loaderData[route.id],
    loaderData: loaderData[route.id],
    handle: route.handle
  };
}
function flattenRoutes(routes, branches = [], parentsMeta = [], parentPath = "", _hasParentOptionalSegments = false) {
  let flattenRoute = (route, index, hasParentOptionalSegments = _hasParentOptionalSegments, relativePath) => {
    let meta = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      if (!meta.relativePath.startsWith(parentPath) && hasParentOptionalSegments) {
        return;
      }
      invariant(
        meta.relativePath.startsWith(parentPath),
        `Absolute route path "${meta.relativePath}" nested under path "${parentPath}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      );
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      invariant(
        // Our types know better, but runtime JS may not!
        // @ts-expect-error
        route.index !== true,
        `Index routes must not have child routes. Please remove all child routes from route path "${path}".`
      );
      flattenRoutes(
        route.children,
        branches,
        routesMeta,
        path,
        hasParentOptionalSegments
      );
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };
  routes.forEach((route, index) => {
    var _a;
    if (route.path === "" || !((_a = route.path) == null ? void 0 : _a.includes("?"))) {
      flattenRoute(route, index);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index, true, exploded);
      }
    }
  });
  return branches;
}
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0) return [];
  let [first, ...rest] = segments;
  let isOptional = first.endsWith("?");
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  result.push(
    ...restExploded.map(
      (subpath) => subpath === "" ? required : [required, subpath].join("/")
    )
  );
  if (isOptional) {
    result.push(...restExploded);
  }
  return result.map(
    (exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded
  );
}
function rankRouteBranches(branches) {
  branches.sort(
    (a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(
      a.routesMeta.map((meta) => meta.childrenIndex),
      b.routesMeta.map((meta) => meta.childrenIndex)
    )
  );
}
var paramRe = /^:[\w-]+$/;
var dynamicSegmentValue = 3;
var indexRouteValue = 2;
var emptySegmentValue = 1;
var staticSegmentValue = 10;
var splatPenalty = -2;
var isSplat = (s) => s === "*";
function computeScore(path, index) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s) => !isSplat(s)).reduce(
    (score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue),
    initialScore
  );
}
function compareIndexes(a, b) {
  let siblings = a.length === b.length && a.slice(0, -1).every((n2, i) => n2 === b[i]);
  return siblings ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a[a.length - 1] - b[b.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function matchRouteBranch(branch, pathname, allowPartial = false) {
  let { routesMeta } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i];
    let end = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath(
      { path: meta.relativePath, caseSensitive: meta.caseSensitive, end },
      remainingPathname
    );
    let route = meta.route;
    if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) {
      match = matchPath(
        {
          path: meta.relativePath,
          caseSensitive: meta.caseSensitive,
          end: false
        },
        remainingPathname
      );
    }
    if (!match) {
      return null;
    }
    Object.assign(matchedParams, match.params);
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(
        joinPaths([matchedPathname, match.pathnameBase])
      ),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = { path: pattern, caseSensitive: false, end: true };
  }
  let [matcher, compiledParams] = compilePath(
    pattern.path,
    pattern.caseSensitive,
    pattern.end
  );
  let match = pathname.match(matcher);
  if (!match) return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce(
    (memo2, { paramName, isOptional }, index) => {
      if (paramName === "*") {
        let splatValue = captureGroups[index] || "";
        pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
      }
      const value = captureGroups[index];
      if (isOptional && !value) {
        memo2[paramName] = void 0;
      } else {
        memo2[paramName] = (value || "").replace(/%2F/g, "/");
      }
      return memo2;
    },
    {}
  );
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive = false, end = true) {
  warning(
    path === "*" || !path.endsWith("*") || path.endsWith("/*"),
    `Route path "${path}" will be treated as if it were "${path.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${path.replace(/\*$/, "/*")}".`
  );
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (_, paramName, isOptional) => {
      params.push({ paramName, isOptional: isOptional != null });
      return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  if (path.endsWith("*")) {
    params.push({ paramName: "*" });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else ;
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, params];
}
function decodePath(value) {
  try {
    return value.split("/").map((v2) => decodeURIComponent(v2).replace(/\//g, "%2F")).join("/");
  } catch (error) {
    warning(
      false,
      `The URL path "${value}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${error}).`
    );
    return value;
  }
}
function stripBasename(pathname, basename) {
  if (basename === "/") return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
function prependBasename({
  basename,
  pathname
}) {
  return pathname === "/" ? basename : joinPaths([basename, pathname]);
}
var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var isAbsoluteUrl = (url) => ABSOLUTE_URL_REGEX.test(url);
function resolvePath(to, fromPathname = "/") {
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname;
  if (toPathname) {
    if (isAbsoluteUrl(toPathname)) {
      pathname = toPathname;
    } else {
      if (toPathname.includes("//")) {
        let oldPathname = toPathname;
        toPathname = toPathname.replace(/\/\/+/g, "/");
        warning(
          false,
          `Pathnames cannot have embedded double slashes - normalizing ${oldPathname} -> ${toPathname}`
        );
      }
      if (toPathname.startsWith("/")) {
        pathname = resolvePathname(toPathname.substring(1), "/");
      } else {
        pathname = resolvePathname(toPathname, fromPathname);
      }
    }
  } else {
    pathname = fromPathname;
  }
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return `Cannot include a '${char}' character in a manually specified \`to.${field}\` field [${JSON.stringify(
    path
  )}].  Please separate it out to the \`to.${dest}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function getPathContributingMatches(matches) {
  return matches.filter(
    (match, index) => index === 0 || match.route.path && match.route.path.length > 0
  );
}
function getResolveToMatches(matches) {
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches.map(
    (match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase
  );
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative = false) {
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = { ...toArg };
    invariant(
      !to.pathname || !to.pathname.includes("?"),
      getInvalidPathError("?", "pathname", "search", to)
    );
    invariant(
      !to.pathname || !to.pathname.includes("#"),
      getInvalidPathError("#", "pathname", "hash", to)
    );
    invariant(
      !to.search || !to.search.includes("#"),
      getInvalidPathError("#", "search", "hash", to)
    );
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (!isPathRelative && toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
var joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
var normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
var normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
var normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
var ErrorResponseImpl = class {
  constructor(status, statusText, data2, internal = false) {
    this.status = status;
    this.statusText = statusText || "";
    this.internal = internal;
    if (data2 instanceof Error) {
      this.data = data2.toString();
      this.error = data2;
    } else {
      this.data = data2;
    }
  }
};
function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}
function getRoutePattern(paths) {
  return paths.filter(Boolean).join("/").replace(/\/\/*/g, "/") || "/";
}
var UninstrumentedSymbol = Symbol("Uninstrumented");
function getRouteInstrumentationUpdates(fns, route) {
  let aggregated = {
    lazy: [],
    "lazy.loader": [],
    "lazy.action": [],
    "lazy.middleware": [],
    middleware: [],
    loader: [],
    action: []
  };
  fns.forEach(
    (fn) => fn({
      id: route.id,
      index: route.index,
      path: route.path,
      instrument(i) {
        let keys = Object.keys(aggregated);
        for (let key of keys) {
          if (i[key]) {
            aggregated[key].push(i[key]);
          }
        }
      }
    })
  );
  let updates = {};
  if (typeof route.lazy === "function" && aggregated.lazy.length > 0) {
    let instrumented = wrapImpl(aggregated.lazy, route.lazy, () => void 0);
    if (instrumented) {
      updates.lazy = instrumented;
    }
  }
  if (typeof route.lazy === "object") {
    let lazyObject = route.lazy;
    ["middleware", "loader", "action"].forEach((key) => {
      let lazyFn = lazyObject[key];
      let instrumentations = aggregated[`lazy.${key}`];
      if (typeof lazyFn === "function" && instrumentations.length > 0) {
        let instrumented = wrapImpl(instrumentations, lazyFn, () => void 0);
        if (instrumented) {
          updates.lazy = Object.assign(updates.lazy || {}, {
            [key]: instrumented
          });
        }
      }
    });
  }
  ["loader", "action"].forEach((key) => {
    let handler = route[key];
    if (typeof handler === "function" && aggregated[key].length > 0) {
      let original = handler[UninstrumentedSymbol] ?? handler;
      let instrumented = wrapImpl(
        aggregated[key],
        original,
        (...args) => getHandlerInfo(args[0])
      );
      if (instrumented) {
        instrumented[UninstrumentedSymbol] = original;
        updates[key] = instrumented;
      }
    }
  });
  if (route.middleware && route.middleware.length > 0 && aggregated.middleware.length > 0) {
    updates.middleware = route.middleware.map((middleware) => {
      let original = middleware[UninstrumentedSymbol] ?? middleware;
      let instrumented = wrapImpl(
        aggregated.middleware,
        original,
        (...args) => getHandlerInfo(args[0])
      );
      if (instrumented) {
        instrumented[UninstrumentedSymbol] = original;
        return instrumented;
      }
      return middleware;
    });
  }
  return updates;
}
function instrumentClientSideRouter(router2, fns) {
  let aggregated = {
    navigate: [],
    fetch: []
  };
  fns.forEach(
    (fn) => fn({
      instrument(i) {
        let keys = Object.keys(i);
        for (let key of keys) {
          if (i[key]) {
            aggregated[key].push(i[key]);
          }
        }
      }
    })
  );
  if (aggregated.navigate.length > 0) {
    let navigate = router2.navigate[UninstrumentedSymbol] ?? router2.navigate;
    let instrumentedNavigate = wrapImpl(
      aggregated.navigate,
      navigate,
      (...args) => {
        let [to, opts] = args;
        return {
          to: typeof to === "number" || typeof to === "string" ? to : to ? createPath(to) : ".",
          ...getRouterInfo(router2, opts ?? {})
        };
      }
    );
    if (instrumentedNavigate) {
      instrumentedNavigate[UninstrumentedSymbol] = navigate;
      router2.navigate = instrumentedNavigate;
    }
  }
  if (aggregated.fetch.length > 0) {
    let fetch2 = router2.fetch[UninstrumentedSymbol] ?? router2.fetch;
    let instrumentedFetch = wrapImpl(aggregated.fetch, fetch2, (...args) => {
      let [key, , href, opts] = args;
      return {
        href: href ?? ".",
        fetcherKey: key,
        ...getRouterInfo(router2, opts ?? {})
      };
    });
    if (instrumentedFetch) {
      instrumentedFetch[UninstrumentedSymbol] = fetch2;
      router2.fetch = instrumentedFetch;
    }
  }
  return router2;
}
function wrapImpl(impls, handler, getInfo) {
  if (impls.length === 0) {
    return null;
  }
  return async (...args) => {
    let result = await recurseRight(
      impls,
      getInfo(...args),
      () => handler(...args),
      impls.length - 1
    );
    if (result.type === "error") {
      throw result.value;
    }
    return result.value;
  };
}
async function recurseRight(impls, info, handler, index) {
  let impl = impls[index];
  let result;
  if (!impl) {
    try {
      let value = await handler();
      result = { type: "success", value };
    } catch (e) {
      result = { type: "error", value: e };
    }
  } else {
    let handlerPromise = void 0;
    let callHandler = async () => {
      if (handlerPromise) {
        console.error("You cannot call instrumented handlers more than once");
      } else {
        handlerPromise = recurseRight(impls, info, handler, index - 1);
      }
      result = await handlerPromise;
      invariant(result, "Expected a result");
      if (result.type === "error" && result.value instanceof Error) {
        return { status: "error", error: result.value };
      }
      return { status: "success", error: void 0 };
    };
    try {
      await impl(callHandler, info);
    } catch (e) {
      console.error("An instrumentation function threw an error:", e);
    }
    if (!handlerPromise) {
      await callHandler();
    }
    await handlerPromise;
  }
  if (result) {
    return result;
  }
  return {
    type: "error",
    value: new Error("No result assigned in instrumentation chain.")
  };
}
function getHandlerInfo(args) {
  let { request, context, params, unstable_pattern } = args;
  return {
    request: getReadonlyRequest(request),
    params: { ...params },
    unstable_pattern,
    context: getReadonlyContext(context)
  };
}
function getRouterInfo(router2, opts) {
  return {
    currentUrl: createPath(router2.state.location),
    ..."formMethod" in opts ? { formMethod: opts.formMethod } : {},
    ..."formEncType" in opts ? { formEncType: opts.formEncType } : {},
    ..."formData" in opts ? { formData: opts.formData } : {},
    ..."body" in opts ? { body: opts.body } : {}
  };
}
function getReadonlyRequest(request) {
  return {
    method: request.method,
    url: request.url,
    headers: {
      get: (...args) => request.headers.get(...args)
    }
  };
}
function getReadonlyContext(context) {
  if (isPlainObject(context)) {
    let frozen = { ...context };
    Object.freeze(frozen);
    return frozen;
  } else {
    return {
      get: (ctx) => context.get(ctx)
    };
  }
}
var objectProtoNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function isPlainObject(thing) {
  if (thing === null || typeof thing !== "object") {
    return false;
  }
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === objectProtoNames;
}
var validMutationMethodsArr = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
];
var validMutationMethods = new Set(
  validMutationMethodsArr
);
var validRequestMethodsArr = [
  "GET",
  ...validMutationMethodsArr
];
var validRequestMethods = new Set(validRequestMethodsArr);
var redirectStatusCodes = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
var redirectPreserveMethodStatusCodes = /* @__PURE__ */ new Set([307, 308]);
var IDLE_NAVIGATION = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
};
var IDLE_FETCHER = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
};
var IDLE_BLOCKER = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
};
var defaultMapRouteProperties = (route) => ({
  hasErrorBoundary: Boolean(route.hasErrorBoundary)
});
var TRANSITIONS_STORAGE_KEY = "remix-router-transitions";
var ResetLoaderDataSymbol = Symbol("ResetLoaderData");
function createRouter(init) {
  const routerWindow = init.window ? init.window : typeof window !== "undefined" ? window : void 0;
  const isBrowser2 = typeof routerWindow !== "undefined" && typeof routerWindow.document !== "undefined" && typeof routerWindow.document.createElement !== "undefined";
  invariant(
    init.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let hydrationRouteProperties2 = init.hydrationRouteProperties || [];
  let _mapRouteProperties = init.mapRouteProperties || defaultMapRouteProperties;
  let mapRouteProperties2 = _mapRouteProperties;
  if (init.unstable_instrumentations) {
    let instrumentations = init.unstable_instrumentations;
    mapRouteProperties2 = (route) => {
      return {
        ..._mapRouteProperties(route),
        ...getRouteInstrumentationUpdates(
          instrumentations.map((i) => i.route).filter(Boolean),
          route
        )
      };
    };
  }
  let manifest = {};
  let dataRoutes = convertRoutesToDataRoutes(
    init.routes,
    mapRouteProperties2,
    void 0,
    manifest
  );
  let inFlightDataRoutes;
  let basename = init.basename || "/";
  if (!basename.startsWith("/")) {
    basename = `/${basename}`;
  }
  let dataStrategyImpl = init.dataStrategy || defaultDataStrategyWithMiddleware;
  let future = {
    ...init.future
  };
  let unlistenHistory = null;
  let subscribers = /* @__PURE__ */ new Set();
  let savedScrollPositions2 = null;
  let getScrollRestorationKey2 = null;
  let getScrollPosition = null;
  let initialScrollRestored = init.hydrationData != null;
  let initialMatches = matchRoutes(dataRoutes, init.history.location, basename);
  let initialMatchesIsFOW = false;
  let initialErrors = null;
  let initialized;
  if (initialMatches == null && !init.patchRoutesOnNavigation) {
    let error = getInternalRouterError(404, {
      pathname: init.history.location.pathname
    });
    let { matches, route } = getShortCircuitMatches(dataRoutes);
    initialized = true;
    initialMatches = matches;
    initialErrors = { [route.id]: error };
  } else {
    if (initialMatches && !init.hydrationData) {
      let fogOfWar = checkFogOfWar(
        initialMatches,
        dataRoutes,
        init.history.location.pathname
      );
      if (fogOfWar.active) {
        initialMatches = null;
      }
    }
    if (!initialMatches) {
      initialized = false;
      initialMatches = [];
      let fogOfWar = checkFogOfWar(
        null,
        dataRoutes,
        init.history.location.pathname
      );
      if (fogOfWar.active && fogOfWar.matches) {
        initialMatchesIsFOW = true;
        initialMatches = fogOfWar.matches;
      }
    } else if (initialMatches.some((m2) => m2.route.lazy)) {
      initialized = false;
    } else if (!initialMatches.some((m2) => routeHasLoaderOrMiddleware(m2.route))) {
      initialized = true;
    } else {
      let loaderData = init.hydrationData ? init.hydrationData.loaderData : null;
      let errors = init.hydrationData ? init.hydrationData.errors : null;
      if (errors) {
        let idx = initialMatches.findIndex(
          (m2) => errors[m2.route.id] !== void 0
        );
        initialized = initialMatches.slice(0, idx + 1).every(
          (m2) => !shouldLoadRouteOnHydration(m2.route, loaderData, errors)
        );
      } else {
        initialized = initialMatches.every(
          (m2) => !shouldLoadRouteOnHydration(m2.route, loaderData, errors)
        );
      }
    }
  }
  let router2;
  let state = {
    historyAction: init.history.action,
    location: init.history.location,
    matches: initialMatches,
    initialized,
    navigation: IDLE_NAVIGATION,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: init.hydrationData != null ? false : null,
    preventScrollReset: false,
    revalidation: "idle",
    loaderData: init.hydrationData && init.hydrationData.loaderData || {},
    actionData: init.hydrationData && init.hydrationData.actionData || null,
    errors: init.hydrationData && init.hydrationData.errors || initialErrors,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  };
  let pendingAction = "POP";
  let pendingPreventScrollReset = false;
  let pendingNavigationController;
  let pendingViewTransitionEnabled = false;
  let appliedViewTransitions = /* @__PURE__ */ new Map();
  let removePageHideEventListener = null;
  let isUninterruptedRevalidation = false;
  let isRevalidationRequired = false;
  let cancelledFetcherLoads = /* @__PURE__ */ new Set();
  let fetchControllers = /* @__PURE__ */ new Map();
  let incrementingLoadId = 0;
  let pendingNavigationLoadId = -1;
  let fetchReloadIds = /* @__PURE__ */ new Map();
  let fetchRedirectIds = /* @__PURE__ */ new Set();
  let fetchLoadMatches = /* @__PURE__ */ new Map();
  let activeFetchers = /* @__PURE__ */ new Map();
  let fetchersQueuedForDeletion = /* @__PURE__ */ new Set();
  let blockerFunctions = /* @__PURE__ */ new Map();
  let unblockBlockerHistoryUpdate = void 0;
  let pendingRevalidationDfd = null;
  function initialize() {
    unlistenHistory = init.history.listen(
      ({ action: historyAction, location: location2, delta }) => {
        if (unblockBlockerHistoryUpdate) {
          unblockBlockerHistoryUpdate();
          unblockBlockerHistoryUpdate = void 0;
          return;
        }
        warning(
          blockerFunctions.size === 0 || delta != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let blockerKey = shouldBlockNavigation({
          currentLocation: state.location,
          nextLocation: location2,
          historyAction
        });
        if (blockerKey && delta != null) {
          let nextHistoryUpdatePromise = new Promise((resolve) => {
            unblockBlockerHistoryUpdate = resolve;
          });
          init.history.go(delta * -1);
          updateBlocker(blockerKey, {
            state: "blocked",
            location: location2,
            proceed() {
              updateBlocker(blockerKey, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: location2
              });
              nextHistoryUpdatePromise.then(() => init.history.go(delta));
            },
            reset() {
              let blockers = new Map(state.blockers);
              blockers.set(blockerKey, IDLE_BLOCKER);
              updateState({ blockers });
            }
          });
          return;
        }
        return startNavigation(historyAction, location2);
      }
    );
    if (isBrowser2) {
      restoreAppliedTransitions(routerWindow, appliedViewTransitions);
      let _saveAppliedTransitions = () => persistAppliedTransitions(routerWindow, appliedViewTransitions);
      routerWindow.addEventListener("pagehide", _saveAppliedTransitions);
      removePageHideEventListener = () => routerWindow.removeEventListener("pagehide", _saveAppliedTransitions);
    }
    if (!state.initialized) {
      startNavigation("POP", state.location, {
        initialHydration: true
      });
    }
    return router2;
  }
  function dispose() {
    if (unlistenHistory) {
      unlistenHistory();
    }
    if (removePageHideEventListener) {
      removePageHideEventListener();
    }
    subscribers.clear();
    pendingNavigationController && pendingNavigationController.abort();
    state.fetchers.forEach((_, key) => deleteFetcher(key));
    state.blockers.forEach((_, key) => deleteBlocker(key));
  }
  function subscribe(fn) {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
  }
  function updateState(newState, opts = {}) {
    if (newState.matches) {
      newState.matches = newState.matches.map((m2) => {
        let route = manifest[m2.route.id];
        let matchRoute = m2.route;
        if (matchRoute.element !== route.element || matchRoute.errorElement !== route.errorElement || matchRoute.hydrateFallbackElement !== route.hydrateFallbackElement) {
          return {
            ...m2,
            route
          };
        }
        return m2;
      });
    }
    state = {
      ...state,
      ...newState
    };
    let unmountedFetchers = [];
    let mountedFetchers = [];
    state.fetchers.forEach((fetcher, key) => {
      if (fetcher.state === "idle") {
        if (fetchersQueuedForDeletion.has(key)) {
          unmountedFetchers.push(key);
        } else {
          mountedFetchers.push(key);
        }
      }
    });
    fetchersQueuedForDeletion.forEach((key) => {
      if (!state.fetchers.has(key) && !fetchControllers.has(key)) {
        unmountedFetchers.push(key);
      }
    });
    [...subscribers].forEach(
      (subscriber) => subscriber(state, {
        deletedFetchers: unmountedFetchers,
        viewTransitionOpts: opts.viewTransitionOpts,
        flushSync: opts.flushSync === true
      })
    );
    unmountedFetchers.forEach((key) => deleteFetcher(key));
    mountedFetchers.forEach((key) => state.fetchers.delete(key));
  }
  function completeNavigation(location2, newState, { flushSync } = {}) {
    var _a, _b;
    let isActionReload = state.actionData != null && state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && state.navigation.state === "loading" && ((_a = location2.state) == null ? void 0 : _a._isRedirect) !== true;
    let actionData;
    if (newState.actionData) {
      if (Object.keys(newState.actionData).length > 0) {
        actionData = newState.actionData;
      } else {
        actionData = null;
      }
    } else if (isActionReload) {
      actionData = state.actionData;
    } else {
      actionData = null;
    }
    let loaderData = newState.loaderData ? mergeLoaderData(
      state.loaderData,
      newState.loaderData,
      newState.matches || [],
      newState.errors
    ) : state.loaderData;
    let blockers = state.blockers;
    if (blockers.size > 0) {
      blockers = new Map(blockers);
      blockers.forEach((_, k2) => blockers.set(k2, IDLE_BLOCKER));
    }
    let restoreScrollPosition = isUninterruptedRevalidation ? false : getSavedScrollPosition(location2, newState.matches || state.matches);
    let preventScrollReset = pendingPreventScrollReset === true || state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && ((_b = location2.state) == null ? void 0 : _b._isRedirect) !== true;
    if (inFlightDataRoutes) {
      dataRoutes = inFlightDataRoutes;
      inFlightDataRoutes = void 0;
    }
    if (isUninterruptedRevalidation) ;
    else if (pendingAction === "POP") ;
    else if (pendingAction === "PUSH") {
      init.history.push(location2, location2.state);
    } else if (pendingAction === "REPLACE") {
      init.history.replace(location2, location2.state);
    }
    let viewTransitionOpts;
    if (pendingAction === "POP") {
      let priorPaths = appliedViewTransitions.get(state.location.pathname);
      if (priorPaths && priorPaths.has(location2.pathname)) {
        viewTransitionOpts = {
          currentLocation: state.location,
          nextLocation: location2
        };
      } else if (appliedViewTransitions.has(location2.pathname)) {
        viewTransitionOpts = {
          currentLocation: location2,
          nextLocation: state.location
        };
      }
    } else if (pendingViewTransitionEnabled) {
      let toPaths = appliedViewTransitions.get(state.location.pathname);
      if (toPaths) {
        toPaths.add(location2.pathname);
      } else {
        toPaths = /* @__PURE__ */ new Set([location2.pathname]);
        appliedViewTransitions.set(state.location.pathname, toPaths);
      }
      viewTransitionOpts = {
        currentLocation: state.location,
        nextLocation: location2
      };
    }
    updateState(
      {
        ...newState,
        // matches, errors, fetchers go through as-is
        actionData,
        loaderData,
        historyAction: pendingAction,
        location: location2,
        initialized: true,
        navigation: IDLE_NAVIGATION,
        revalidation: "idle",
        restoreScrollPosition,
        preventScrollReset,
        blockers
      },
      {
        viewTransitionOpts,
        flushSync: flushSync === true
      }
    );
    pendingAction = "POP";
    pendingPreventScrollReset = false;
    pendingViewTransitionEnabled = false;
    isUninterruptedRevalidation = false;
    isRevalidationRequired = false;
    pendingRevalidationDfd == null ? void 0 : pendingRevalidationDfd.resolve();
    pendingRevalidationDfd = null;
  }
  async function navigate(to, opts) {
    if (typeof to === "number") {
      init.history.go(to);
      return;
    }
    let normalizedPath = normalizeTo(
      state.location,
      state.matches,
      basename,
      to,
      opts == null ? void 0 : opts.fromRouteId,
      opts == null ? void 0 : opts.relative
    );
    let { path, submission, error } = normalizeNavigateOptions(
      false,
      normalizedPath,
      opts
    );
    let currentLocation = state.location;
    let nextLocation = createLocation(state.location, path, opts && opts.state);
    nextLocation = {
      ...nextLocation,
      ...init.history.encodeLocation(nextLocation)
    };
    let userReplace = opts && opts.replace != null ? opts.replace : void 0;
    let historyAction = "PUSH";
    if (userReplace === true) {
      historyAction = "REPLACE";
    } else if (userReplace === false) ;
    else if (submission != null && isMutationMethod(submission.formMethod) && submission.formAction === state.location.pathname + state.location.search) {
      historyAction = "REPLACE";
    }
    let preventScrollReset = opts && "preventScrollReset" in opts ? opts.preventScrollReset === true : void 0;
    let flushSync = (opts && opts.flushSync) === true;
    let blockerKey = shouldBlockNavigation({
      currentLocation,
      nextLocation,
      historyAction
    });
    if (blockerKey) {
      updateBlocker(blockerKey, {
        state: "blocked",
        location: nextLocation,
        proceed() {
          updateBlocker(blockerKey, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: nextLocation
          });
          navigate(to, opts);
        },
        reset() {
          let blockers = new Map(state.blockers);
          blockers.set(blockerKey, IDLE_BLOCKER);
          updateState({ blockers });
        }
      });
      return;
    }
    await startNavigation(historyAction, nextLocation, {
      submission,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: error,
      preventScrollReset,
      replace: opts && opts.replace,
      enableViewTransition: opts && opts.viewTransition,
      flushSync
    });
  }
  function revalidate() {
    if (!pendingRevalidationDfd) {
      pendingRevalidationDfd = createDeferred();
    }
    interruptActiveLoads();
    updateState({ revalidation: "loading" });
    let promise = pendingRevalidationDfd.promise;
    if (state.navigation.state === "submitting") {
      return promise;
    }
    if (state.navigation.state === "idle") {
      startNavigation(state.historyAction, state.location, {
        startUninterruptedRevalidation: true
      });
      return promise;
    }
    startNavigation(
      pendingAction || state.historyAction,
      state.navigation.location,
      {
        overrideNavigation: state.navigation,
        // Proxy through any rending view transition
        enableViewTransition: pendingViewTransitionEnabled === true
      }
    );
    return promise;
  }
  async function startNavigation(historyAction, location2, opts) {
    pendingNavigationController && pendingNavigationController.abort();
    pendingNavigationController = null;
    pendingAction = historyAction;
    isUninterruptedRevalidation = (opts && opts.startUninterruptedRevalidation) === true;
    saveScrollPosition(state.location, state.matches);
    pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
    pendingViewTransitionEnabled = (opts && opts.enableViewTransition) === true;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let loadingNavigation = opts && opts.overrideNavigation;
    let matches = (opts == null ? void 0 : opts.initialHydration) && state.matches && state.matches.length > 0 && !initialMatchesIsFOW ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      state.matches
    ) : matchRoutes(routesToUse, location2, basename);
    let flushSync = (opts && opts.flushSync) === true;
    if (matches && state.initialized && !isRevalidationRequired && isHashChangeOnly(state.location, location2) && !(opts && opts.submission && isMutationMethod(opts.submission.formMethod))) {
      completeNavigation(location2, { matches }, { flushSync });
      return;
    }
    let fogOfWar = checkFogOfWar(matches, routesToUse, location2.pathname);
    if (fogOfWar.active && fogOfWar.matches) {
      matches = fogOfWar.matches;
    }
    if (!matches) {
      let { error, notFoundMatches, route } = handleNavigational404(
        location2.pathname
      );
      completeNavigation(
        location2,
        {
          matches: notFoundMatches,
          loaderData: {},
          errors: {
            [route.id]: error
          }
        },
        { flushSync }
      );
      return;
    }
    pendingNavigationController = new AbortController();
    let request = createClientSideRequest(
      init.history,
      location2,
      pendingNavigationController.signal,
      opts && opts.submission
    );
    let scopedContext = init.getContext ? await init.getContext() : new RouterContextProvider();
    let pendingActionResult;
    if (opts && opts.pendingError) {
      pendingActionResult = [
        findNearestBoundary(matches).route.id,
        { type: "error", error: opts.pendingError }
      ];
    } else if (opts && opts.submission && isMutationMethod(opts.submission.formMethod)) {
      let actionResult = await handleAction(
        request,
        location2,
        opts.submission,
        matches,
        scopedContext,
        fogOfWar.active,
        opts && opts.initialHydration === true,
        { replace: opts.replace, flushSync }
      );
      if (actionResult.shortCircuited) {
        return;
      }
      if (actionResult.pendingActionResult) {
        let [routeId, result] = actionResult.pendingActionResult;
        if (isErrorResult(result) && isRouteErrorResponse(result.error) && result.error.status === 404) {
          pendingNavigationController = null;
          completeNavigation(location2, {
            matches: actionResult.matches,
            loaderData: {},
            errors: {
              [routeId]: result.error
            }
          });
          return;
        }
      }
      matches = actionResult.matches || matches;
      pendingActionResult = actionResult.pendingActionResult;
      loadingNavigation = getLoadingNavigation(location2, opts.submission);
      flushSync = false;
      fogOfWar.active = false;
      request = createClientSideRequest(
        init.history,
        request.url,
        request.signal
      );
    }
    let {
      shortCircuited,
      matches: updatedMatches,
      loaderData,
      errors
    } = await handleLoaders(
      request,
      location2,
      matches,
      scopedContext,
      fogOfWar.active,
      loadingNavigation,
      opts && opts.submission,
      opts && opts.fetcherSubmission,
      opts && opts.replace,
      opts && opts.initialHydration === true,
      flushSync,
      pendingActionResult
    );
    if (shortCircuited) {
      return;
    }
    pendingNavigationController = null;
    completeNavigation(location2, {
      matches: updatedMatches || matches,
      ...getActionDataForCommit(pendingActionResult),
      loaderData,
      errors
    });
  }
  async function handleAction(request, location2, submission, matches, scopedContext, isFogOfWar, initialHydration, opts = {}) {
    interruptActiveLoads();
    let navigation = getSubmittingNavigation(location2, submission);
    updateState({ navigation }, { flushSync: opts.flushSync === true });
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(
        matches,
        location2.pathname,
        request.signal
      );
      if (discoverResult.type === "aborted") {
        return { shortCircuited: true };
      } else if (discoverResult.type === "error") {
        if (discoverResult.partialMatches.length === 0) {
          let { matches: matches2, route } = getShortCircuitMatches(dataRoutes);
          return {
            matches: matches2,
            pendingActionResult: [
              route.id,
              {
                type: "error",
                error: discoverResult.error
              }
            ]
          };
        }
        let boundaryId = findNearestBoundary(discoverResult.partialMatches).route.id;
        return {
          matches: discoverResult.partialMatches,
          pendingActionResult: [
            boundaryId,
            {
              type: "error",
              error: discoverResult.error
            }
          ]
        };
      } else if (!discoverResult.matches) {
        let { notFoundMatches, error, route } = handleNavigational404(
          location2.pathname
        );
        return {
          matches: notFoundMatches,
          pendingActionResult: [
            route.id,
            {
              type: "error",
              error
            }
          ]
        };
      } else {
        matches = discoverResult.matches;
      }
    }
    let result;
    let actionMatch = getTargetMatch(matches, location2);
    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      result = {
        type: "error",
        error: getInternalRouterError(405, {
          method: request.method,
          pathname: location2.pathname,
          routeId: actionMatch.route.id
        })
      };
    } else {
      let dsMatches = getTargetedDataStrategyMatches(
        mapRouteProperties2,
        manifest,
        request,
        matches,
        actionMatch,
        initialHydration ? [] : hydrationRouteProperties2,
        scopedContext
      );
      let results = await callDataStrategy(
        request,
        dsMatches,
        scopedContext,
        null
      );
      result = results[actionMatch.route.id];
      if (!result) {
        for (let match of matches) {
          if (results[match.route.id]) {
            result = results[match.route.id];
            break;
          }
        }
      }
      if (request.signal.aborted) {
        return { shortCircuited: true };
      }
    }
    if (isRedirectResult(result)) {
      let replace2;
      if (opts && opts.replace != null) {
        replace2 = opts.replace;
      } else {
        let location22 = normalizeRedirectLocation(
          result.response.headers.get("Location"),
          new URL(request.url),
          basename
        );
        replace2 = location22 === state.location.pathname + state.location.search;
      }
      await startRedirectNavigation(request, result, true, {
        submission,
        replace: replace2
      });
      return { shortCircuited: true };
    }
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
      if ((opts && opts.replace) !== true) {
        pendingAction = "PUSH";
      }
      return {
        matches,
        pendingActionResult: [
          boundaryMatch.route.id,
          result,
          actionMatch.route.id
        ]
      };
    }
    return {
      matches,
      pendingActionResult: [actionMatch.route.id, result]
    };
  }
  async function handleLoaders(request, location2, matches, scopedContext, isFogOfWar, overrideNavigation, submission, fetcherSubmission, replace2, initialHydration, flushSync, pendingActionResult) {
    let loadingNavigation = overrideNavigation || getLoadingNavigation(location2, submission);
    let activeSubmission = submission || fetcherSubmission || getSubmissionFromNavigation(loadingNavigation);
    let shouldUpdateNavigationState = !isUninterruptedRevalidation && !initialHydration;
    if (isFogOfWar) {
      if (shouldUpdateNavigationState) {
        let actionData = getUpdatedActionData(pendingActionResult);
        updateState(
          {
            navigation: loadingNavigation,
            ...actionData !== void 0 ? { actionData } : {}
          },
          {
            flushSync
          }
        );
      }
      let discoverResult = await discoverRoutes(
        matches,
        location2.pathname,
        request.signal
      );
      if (discoverResult.type === "aborted") {
        return { shortCircuited: true };
      } else if (discoverResult.type === "error") {
        if (discoverResult.partialMatches.length === 0) {
          let { matches: matches2, route } = getShortCircuitMatches(dataRoutes);
          return {
            matches: matches2,
            loaderData: {},
            errors: {
              [route.id]: discoverResult.error
            }
          };
        }
        let boundaryId = findNearestBoundary(discoverResult.partialMatches).route.id;
        return {
          matches: discoverResult.partialMatches,
          loaderData: {},
          errors: {
            [boundaryId]: discoverResult.error
          }
        };
      } else if (!discoverResult.matches) {
        let { error, notFoundMatches, route } = handleNavigational404(
          location2.pathname
        );
        return {
          matches: notFoundMatches,
          loaderData: {},
          errors: {
            [route.id]: error
          }
        };
      } else {
        matches = discoverResult.matches;
      }
    }
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let { dsMatches, revalidatingFetchers } = getMatchesToLoad(
      request,
      scopedContext,
      mapRouteProperties2,
      manifest,
      init.history,
      state,
      matches,
      activeSubmission,
      location2,
      initialHydration ? [] : hydrationRouteProperties2,
      initialHydration === true,
      isRevalidationRequired,
      cancelledFetcherLoads,
      fetchersQueuedForDeletion,
      fetchLoadMatches,
      fetchRedirectIds,
      routesToUse,
      basename,
      init.patchRoutesOnNavigation != null,
      pendingActionResult
    );
    pendingNavigationLoadId = ++incrementingLoadId;
    if (!init.dataStrategy && !dsMatches.some((m2) => m2.shouldLoad) && !dsMatches.some(
      (m2) => m2.route.middleware && m2.route.middleware.length > 0
    ) && revalidatingFetchers.length === 0) {
      let updatedFetchers2 = markFetchRedirectsDone();
      completeNavigation(
        location2,
        {
          matches,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? { [pendingActionResult[0]]: pendingActionResult[1].error } : null,
          ...getActionDataForCommit(pendingActionResult),
          ...updatedFetchers2 ? { fetchers: new Map(state.fetchers) } : {}
        },
        { flushSync }
      );
      return { shortCircuited: true };
    }
    if (shouldUpdateNavigationState) {
      let updates = {};
      if (!isFogOfWar) {
        updates.navigation = loadingNavigation;
        let actionData = getUpdatedActionData(pendingActionResult);
        if (actionData !== void 0) {
          updates.actionData = actionData;
        }
      }
      if (revalidatingFetchers.length > 0) {
        updates.fetchers = getUpdatedRevalidatingFetchers(revalidatingFetchers);
      }
      updateState(updates, { flushSync });
    }
    revalidatingFetchers.forEach((rf2) => {
      abortFetcher(rf2.key);
      if (rf2.controller) {
        fetchControllers.set(rf2.key, rf2.controller);
      }
    });
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((f2) => abortFetcher(f2.key));
    if (pendingNavigationController) {
      pendingNavigationController.signal.addEventListener(
        "abort",
        abortPendingFetchRevalidations
      );
    }
    let { loaderResults, fetcherResults } = await callLoadersAndMaybeResolveData(
      dsMatches,
      revalidatingFetchers,
      request,
      scopedContext
    );
    if (request.signal.aborted) {
      return { shortCircuited: true };
    }
    if (pendingNavigationController) {
      pendingNavigationController.signal.removeEventListener(
        "abort",
        abortPendingFetchRevalidations
      );
    }
    revalidatingFetchers.forEach((rf2) => fetchControllers.delete(rf2.key));
    let redirect2 = findRedirect(loaderResults);
    if (redirect2) {
      await startRedirectNavigation(request, redirect2.result, true, {
        replace: replace2
      });
      return { shortCircuited: true };
    }
    redirect2 = findRedirect(fetcherResults);
    if (redirect2) {
      fetchRedirectIds.add(redirect2.key);
      await startRedirectNavigation(request, redirect2.result, true, {
        replace: replace2
      });
      return { shortCircuited: true };
    }
    let { loaderData, errors } = processLoaderData(
      state,
      matches,
      loaderResults,
      pendingActionResult,
      revalidatingFetchers,
      fetcherResults
    );
    if (initialHydration && state.errors) {
      errors = { ...state.errors, ...errors };
    }
    let updatedFetchers = markFetchRedirectsDone();
    let didAbortFetchLoads = abortStaleFetchLoads(pendingNavigationLoadId);
    let shouldUpdateFetchers = updatedFetchers || didAbortFetchLoads || revalidatingFetchers.length > 0;
    return {
      matches,
      loaderData,
      errors,
      ...shouldUpdateFetchers ? { fetchers: new Map(state.fetchers) } : {}
    };
  }
  function getUpdatedActionData(pendingActionResult) {
    if (pendingActionResult && !isErrorResult(pendingActionResult[1])) {
      return {
        [pendingActionResult[0]]: pendingActionResult[1].data
      };
    } else if (state.actionData) {
      if (Object.keys(state.actionData).length === 0) {
        return null;
      } else {
        return state.actionData;
      }
    }
  }
  function getUpdatedRevalidatingFetchers(revalidatingFetchers) {
    revalidatingFetchers.forEach((rf2) => {
      let fetcher = state.fetchers.get(rf2.key);
      let revalidatingFetcher = getLoadingFetcher(
        void 0,
        fetcher ? fetcher.data : void 0
      );
      state.fetchers.set(rf2.key, revalidatingFetcher);
    });
    return new Map(state.fetchers);
  }
  async function fetch2(key, routeId, href, opts) {
    abortFetcher(key);
    let flushSync = (opts && opts.flushSync) === true;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let normalizedPath = normalizeTo(
      state.location,
      state.matches,
      basename,
      href,
      routeId,
      opts == null ? void 0 : opts.relative
    );
    let matches = matchRoutes(routesToUse, normalizedPath, basename);
    let fogOfWar = checkFogOfWar(matches, routesToUse, normalizedPath);
    if (fogOfWar.active && fogOfWar.matches) {
      matches = fogOfWar.matches;
    }
    if (!matches) {
      setFetcherError(
        key,
        routeId,
        getInternalRouterError(404, { pathname: normalizedPath }),
        { flushSync }
      );
      return;
    }
    let { path, submission, error } = normalizeNavigateOptions(
      true,
      normalizedPath,
      opts
    );
    if (error) {
      setFetcherError(key, routeId, error, { flushSync });
      return;
    }
    let scopedContext = init.getContext ? await init.getContext() : new RouterContextProvider();
    let preventScrollReset = (opts && opts.preventScrollReset) === true;
    if (submission && isMutationMethod(submission.formMethod)) {
      await handleFetcherAction(
        key,
        routeId,
        path,
        matches,
        scopedContext,
        fogOfWar.active,
        flushSync,
        preventScrollReset,
        submission
      );
      return;
    }
    fetchLoadMatches.set(key, { routeId, path });
    await handleFetcherLoader(
      key,
      routeId,
      path,
      matches,
      scopedContext,
      fogOfWar.active,
      flushSync,
      preventScrollReset,
      submission
    );
  }
  async function handleFetcherAction(key, routeId, path, requestMatches, scopedContext, isFogOfWar, flushSync, preventScrollReset, submission) {
    interruptActiveLoads();
    fetchLoadMatches.delete(key);
    let existingFetcher = state.fetchers.get(key);
    updateFetcherState(key, getSubmittingFetcher(submission, existingFetcher), {
      flushSync
    });
    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(
      init.history,
      path,
      abortController.signal,
      submission
    );
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(
        requestMatches,
        new URL(fetchRequest.url).pathname,
        fetchRequest.signal,
        key
      );
      if (discoverResult.type === "aborted") {
        return;
      } else if (discoverResult.type === "error") {
        setFetcherError(key, routeId, discoverResult.error, { flushSync });
        return;
      } else if (!discoverResult.matches) {
        setFetcherError(
          key,
          routeId,
          getInternalRouterError(404, { pathname: path }),
          { flushSync }
        );
        return;
      } else {
        requestMatches = discoverResult.matches;
      }
    }
    let match = getTargetMatch(requestMatches, path);
    if (!match.route.action && !match.route.lazy) {
      let error = getInternalRouterError(405, {
        method: submission.formMethod,
        pathname: path,
        routeId
      });
      setFetcherError(key, routeId, error, { flushSync });
      return;
    }
    fetchControllers.set(key, abortController);
    let originatingLoadId = incrementingLoadId;
    let fetchMatches = getTargetedDataStrategyMatches(
      mapRouteProperties2,
      manifest,
      fetchRequest,
      requestMatches,
      match,
      hydrationRouteProperties2,
      scopedContext
    );
    let actionResults = await callDataStrategy(
      fetchRequest,
      fetchMatches,
      scopedContext,
      key
    );
    let actionResult = actionResults[match.route.id];
    if (!actionResult) {
      for (let match2 of fetchMatches) {
        if (actionResults[match2.route.id]) {
          actionResult = actionResults[match2.route.id];
          break;
        }
      }
    }
    if (fetchRequest.signal.aborted) {
      if (fetchControllers.get(key) === abortController) {
        fetchControllers.delete(key);
      }
      return;
    }
    if (fetchersQueuedForDeletion.has(key)) {
      if (isRedirectResult(actionResult) || isErrorResult(actionResult)) {
        updateFetcherState(key, getDoneFetcher(void 0));
        return;
      }
    } else {
      if (isRedirectResult(actionResult)) {
        fetchControllers.delete(key);
        if (pendingNavigationLoadId > originatingLoadId) {
          updateFetcherState(key, getDoneFetcher(void 0));
          return;
        } else {
          fetchRedirectIds.add(key);
          updateFetcherState(key, getLoadingFetcher(submission));
          return startRedirectNavigation(fetchRequest, actionResult, false, {
            fetcherSubmission: submission,
            preventScrollReset
          });
        }
      }
      if (isErrorResult(actionResult)) {
        setFetcherError(key, routeId, actionResult.error);
        return;
      }
    }
    let nextLocation = state.navigation.location || state.location;
    let revalidationRequest = createClientSideRequest(
      init.history,
      nextLocation,
      abortController.signal
    );
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let matches = state.navigation.state !== "idle" ? matchRoutes(routesToUse, state.navigation.location, basename) : state.matches;
    invariant(matches, "Didn't find any matches after fetcher action");
    let loadId = ++incrementingLoadId;
    fetchReloadIds.set(key, loadId);
    let loadFetcher = getLoadingFetcher(submission, actionResult.data);
    state.fetchers.set(key, loadFetcher);
    let { dsMatches, revalidatingFetchers } = getMatchesToLoad(
      revalidationRequest,
      scopedContext,
      mapRouteProperties2,
      manifest,
      init.history,
      state,
      matches,
      submission,
      nextLocation,
      hydrationRouteProperties2,
      false,
      isRevalidationRequired,
      cancelledFetcherLoads,
      fetchersQueuedForDeletion,
      fetchLoadMatches,
      fetchRedirectIds,
      routesToUse,
      basename,
      init.patchRoutesOnNavigation != null,
      [match.route.id, actionResult]
    );
    revalidatingFetchers.filter((rf2) => rf2.key !== key).forEach((rf2) => {
      let staleKey = rf2.key;
      let existingFetcher2 = state.fetchers.get(staleKey);
      let revalidatingFetcher = getLoadingFetcher(
        void 0,
        existingFetcher2 ? existingFetcher2.data : void 0
      );
      state.fetchers.set(staleKey, revalidatingFetcher);
      abortFetcher(staleKey);
      if (rf2.controller) {
        fetchControllers.set(staleKey, rf2.controller);
      }
    });
    updateState({ fetchers: new Map(state.fetchers) });
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((rf2) => abortFetcher(rf2.key));
    abortController.signal.addEventListener(
      "abort",
      abortPendingFetchRevalidations
    );
    let { loaderResults, fetcherResults } = await callLoadersAndMaybeResolveData(
      dsMatches,
      revalidatingFetchers,
      revalidationRequest,
      scopedContext
    );
    if (abortController.signal.aborted) {
      return;
    }
    abortController.signal.removeEventListener(
      "abort",
      abortPendingFetchRevalidations
    );
    fetchReloadIds.delete(key);
    fetchControllers.delete(key);
    revalidatingFetchers.forEach((r2) => fetchControllers.delete(r2.key));
    if (state.fetchers.has(key)) {
      let doneFetcher = getDoneFetcher(actionResult.data);
      state.fetchers.set(key, doneFetcher);
    }
    let redirect2 = findRedirect(loaderResults);
    if (redirect2) {
      return startRedirectNavigation(
        revalidationRequest,
        redirect2.result,
        false,
        { preventScrollReset }
      );
    }
    redirect2 = findRedirect(fetcherResults);
    if (redirect2) {
      fetchRedirectIds.add(redirect2.key);
      return startRedirectNavigation(
        revalidationRequest,
        redirect2.result,
        false,
        { preventScrollReset }
      );
    }
    let { loaderData, errors } = processLoaderData(
      state,
      matches,
      loaderResults,
      void 0,
      revalidatingFetchers,
      fetcherResults
    );
    abortStaleFetchLoads(loadId);
    if (state.navigation.state === "loading" && loadId > pendingNavigationLoadId) {
      invariant(pendingAction, "Expected pending action");
      pendingNavigationController && pendingNavigationController.abort();
      completeNavigation(state.navigation.location, {
        matches,
        loaderData,
        errors,
        fetchers: new Map(state.fetchers)
      });
    } else {
      updateState({
        errors,
        loaderData: mergeLoaderData(
          state.loaderData,
          loaderData,
          matches,
          errors
        ),
        fetchers: new Map(state.fetchers)
      });
      isRevalidationRequired = false;
    }
  }
  async function handleFetcherLoader(key, routeId, path, matches, scopedContext, isFogOfWar, flushSync, preventScrollReset, submission) {
    let existingFetcher = state.fetchers.get(key);
    updateFetcherState(
      key,
      getLoadingFetcher(
        submission,
        existingFetcher ? existingFetcher.data : void 0
      ),
      { flushSync }
    );
    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(
      init.history,
      path,
      abortController.signal
    );
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(
        matches,
        new URL(fetchRequest.url).pathname,
        fetchRequest.signal,
        key
      );
      if (discoverResult.type === "aborted") {
        return;
      } else if (discoverResult.type === "error") {
        setFetcherError(key, routeId, discoverResult.error, { flushSync });
        return;
      } else if (!discoverResult.matches) {
        setFetcherError(
          key,
          routeId,
          getInternalRouterError(404, { pathname: path }),
          { flushSync }
        );
        return;
      } else {
        matches = discoverResult.matches;
      }
    }
    let match = getTargetMatch(matches, path);
    fetchControllers.set(key, abortController);
    let originatingLoadId = incrementingLoadId;
    let dsMatches = getTargetedDataStrategyMatches(
      mapRouteProperties2,
      manifest,
      fetchRequest,
      matches,
      match,
      hydrationRouteProperties2,
      scopedContext
    );
    let results = await callDataStrategy(
      fetchRequest,
      dsMatches,
      scopedContext,
      key
    );
    let result = results[match.route.id];
    if (fetchControllers.get(key) === abortController) {
      fetchControllers.delete(key);
    }
    if (fetchRequest.signal.aborted) {
      return;
    }
    if (fetchersQueuedForDeletion.has(key)) {
      updateFetcherState(key, getDoneFetcher(void 0));
      return;
    }
    if (isRedirectResult(result)) {
      if (pendingNavigationLoadId > originatingLoadId) {
        updateFetcherState(key, getDoneFetcher(void 0));
        return;
      } else {
        fetchRedirectIds.add(key);
        await startRedirectNavigation(fetchRequest, result, false, {
          preventScrollReset
        });
        return;
      }
    }
    if (isErrorResult(result)) {
      setFetcherError(key, routeId, result.error);
      return;
    }
    updateFetcherState(key, getDoneFetcher(result.data));
  }
  async function startRedirectNavigation(request, redirect2, isNavigation, {
    submission,
    fetcherSubmission,
    preventScrollReset,
    replace: replace2
  } = {}) {
    if (redirect2.response.headers.has("X-Remix-Revalidate")) {
      isRevalidationRequired = true;
    }
    let location2 = redirect2.response.headers.get("Location");
    invariant(location2, "Expected a Location header on the redirect Response");
    location2 = normalizeRedirectLocation(
      location2,
      new URL(request.url),
      basename
    );
    let redirectLocation = createLocation(state.location, location2, {
      _isRedirect: true
    });
    if (isBrowser2) {
      let isDocumentReload = false;
      if (redirect2.response.headers.has("X-Remix-Reload-Document")) {
        isDocumentReload = true;
      } else if (isAbsoluteUrl(location2)) {
        const url = createBrowserURLImpl(location2, true);
        isDocumentReload = // Hard reload if it's an absolute URL to a new origin
        url.origin !== routerWindow.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        stripBasename(url.pathname, basename) == null;
      }
      if (isDocumentReload) {
        if (replace2) {
          routerWindow.location.replace(location2);
        } else {
          routerWindow.location.assign(location2);
        }
        return;
      }
    }
    pendingNavigationController = null;
    let redirectNavigationType = replace2 === true || redirect2.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH";
    let { formMethod, formAction, formEncType } = state.navigation;
    if (!submission && !fetcherSubmission && formMethod && formAction && formEncType) {
      submission = getSubmissionFromNavigation(state.navigation);
    }
    let activeSubmission = submission || fetcherSubmission;
    if (redirectPreserveMethodStatusCodes.has(redirect2.response.status) && activeSubmission && isMutationMethod(activeSubmission.formMethod)) {
      await startNavigation(redirectNavigationType, redirectLocation, {
        submission: {
          ...activeSubmission,
          formAction: location2
        },
        // Preserve these flags across redirects
        preventScrollReset: preventScrollReset || pendingPreventScrollReset,
        enableViewTransition: isNavigation ? pendingViewTransitionEnabled : void 0
      });
    } else {
      let overrideNavigation = getLoadingNavigation(
        redirectLocation,
        submission
      );
      await startNavigation(redirectNavigationType, redirectLocation, {
        overrideNavigation,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission,
        // Preserve these flags across redirects
        preventScrollReset: preventScrollReset || pendingPreventScrollReset,
        enableViewTransition: isNavigation ? pendingViewTransitionEnabled : void 0
      });
    }
  }
  async function callDataStrategy(request, matches, scopedContext, fetcherKey) {
    let results;
    let dataResults = {};
    try {
      results = await callDataStrategyImpl(
        dataStrategyImpl,
        request,
        matches,
        fetcherKey,
        scopedContext,
        false
      );
    } catch (e) {
      matches.filter((m2) => m2.shouldLoad).forEach((m2) => {
        dataResults[m2.route.id] = {
          type: "error",
          error: e
        };
      });
      return dataResults;
    }
    if (request.signal.aborted) {
      return dataResults;
    }
    for (let [routeId, result] of Object.entries(results)) {
      if (isRedirectDataStrategyResult(result)) {
        let response = result.result;
        dataResults[routeId] = {
          type: "redirect",
          response: normalizeRelativeRoutingRedirectResponse(
            response,
            request,
            routeId,
            matches,
            basename
          )
        };
      } else {
        dataResults[routeId] = await convertDataStrategyResultToDataResult(result);
      }
    }
    return dataResults;
  }
  async function callLoadersAndMaybeResolveData(matches, fetchersToLoad, request, scopedContext) {
    let loaderResultsPromise = callDataStrategy(
      request,
      matches,
      scopedContext,
      null
    );
    let fetcherResultsPromise = Promise.all(
      fetchersToLoad.map(async (f2) => {
        if (f2.matches && f2.match && f2.request && f2.controller) {
          let results = await callDataStrategy(
            f2.request,
            f2.matches,
            scopedContext,
            f2.key
          );
          let result = results[f2.match.route.id];
          return { [f2.key]: result };
        } else {
          return Promise.resolve({
            [f2.key]: {
              type: "error",
              error: getInternalRouterError(404, {
                pathname: f2.path
              })
            }
          });
        }
      })
    );
    let loaderResults = await loaderResultsPromise;
    let fetcherResults = (await fetcherResultsPromise).reduce(
      (acc, r2) => Object.assign(acc, r2),
      {}
    );
    return {
      loaderResults,
      fetcherResults
    };
  }
  function interruptActiveLoads() {
    isRevalidationRequired = true;
    fetchLoadMatches.forEach((_, key) => {
      if (fetchControllers.has(key)) {
        cancelledFetcherLoads.add(key);
      }
      abortFetcher(key);
    });
  }
  function updateFetcherState(key, fetcher, opts = {}) {
    state.fetchers.set(key, fetcher);
    updateState(
      { fetchers: new Map(state.fetchers) },
      { flushSync: (opts && opts.flushSync) === true }
    );
  }
  function setFetcherError(key, routeId, error, opts = {}) {
    let boundaryMatch = findNearestBoundary(state.matches, routeId);
    deleteFetcher(key);
    updateState(
      {
        errors: {
          [boundaryMatch.route.id]: error
        },
        fetchers: new Map(state.fetchers)
      },
      { flushSync: (opts && opts.flushSync) === true }
    );
  }
  function getFetcher(key) {
    activeFetchers.set(key, (activeFetchers.get(key) || 0) + 1);
    if (fetchersQueuedForDeletion.has(key)) {
      fetchersQueuedForDeletion.delete(key);
    }
    return state.fetchers.get(key) || IDLE_FETCHER;
  }
  function resetFetcher(key, opts) {
    abortFetcher(key, opts == null ? void 0 : opts.reason);
    updateFetcherState(key, getDoneFetcher(null));
  }
  function deleteFetcher(key) {
    let fetcher = state.fetchers.get(key);
    if (fetchControllers.has(key) && !(fetcher && fetcher.state === "loading" && fetchReloadIds.has(key))) {
      abortFetcher(key);
    }
    fetchLoadMatches.delete(key);
    fetchReloadIds.delete(key);
    fetchRedirectIds.delete(key);
    fetchersQueuedForDeletion.delete(key);
    cancelledFetcherLoads.delete(key);
    state.fetchers.delete(key);
  }
  function queueFetcherForDeletion(key) {
    let count = (activeFetchers.get(key) || 0) - 1;
    if (count <= 0) {
      activeFetchers.delete(key);
      fetchersQueuedForDeletion.add(key);
    } else {
      activeFetchers.set(key, count);
    }
    updateState({ fetchers: new Map(state.fetchers) });
  }
  function abortFetcher(key, reason) {
    let controller = fetchControllers.get(key);
    if (controller) {
      controller.abort(reason);
      fetchControllers.delete(key);
    }
  }
  function markFetchersDone(keys) {
    for (let key of keys) {
      let fetcher = getFetcher(key);
      let doneFetcher = getDoneFetcher(fetcher.data);
      state.fetchers.set(key, doneFetcher);
    }
  }
  function markFetchRedirectsDone() {
    let doneKeys = [];
    let updatedFetchers = false;
    for (let key of fetchRedirectIds) {
      let fetcher = state.fetchers.get(key);
      invariant(fetcher, `Expected fetcher: ${key}`);
      if (fetcher.state === "loading") {
        fetchRedirectIds.delete(key);
        doneKeys.push(key);
        updatedFetchers = true;
      }
    }
    markFetchersDone(doneKeys);
    return updatedFetchers;
  }
  function abortStaleFetchLoads(landedId) {
    let yeetedKeys = [];
    for (let [key, id2] of fetchReloadIds) {
      if (id2 < landedId) {
        let fetcher = state.fetchers.get(key);
        invariant(fetcher, `Expected fetcher: ${key}`);
        if (fetcher.state === "loading") {
          abortFetcher(key);
          fetchReloadIds.delete(key);
          yeetedKeys.push(key);
        }
      }
    }
    markFetchersDone(yeetedKeys);
    return yeetedKeys.length > 0;
  }
  function getBlocker(key, fn) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    if (blockerFunctions.get(key) !== fn) {
      blockerFunctions.set(key, fn);
    }
    return blocker;
  }
  function deleteBlocker(key) {
    state.blockers.delete(key);
    blockerFunctions.delete(key);
  }
  function updateBlocker(key, newBlocker) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    invariant(
      blocker.state === "unblocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "proceeding" || blocker.state === "blocked" && newBlocker.state === "unblocked" || blocker.state === "proceeding" && newBlocker.state === "unblocked",
      `Invalid blocker state transition: ${blocker.state} -> ${newBlocker.state}`
    );
    let blockers = new Map(state.blockers);
    blockers.set(key, newBlocker);
    updateState({ blockers });
  }
  function shouldBlockNavigation({
    currentLocation,
    nextLocation,
    historyAction
  }) {
    if (blockerFunctions.size === 0) {
      return;
    }
    if (blockerFunctions.size > 1) {
      warning(false, "A router only supports one blocker at a time");
    }
    let entries = Array.from(blockerFunctions.entries());
    let [blockerKey, blockerFunction] = entries[entries.length - 1];
    let blocker = state.blockers.get(blockerKey);
    if (blocker && blocker.state === "proceeding") {
      return;
    }
    if (blockerFunction({ currentLocation, nextLocation, historyAction })) {
      return blockerKey;
    }
  }
  function handleNavigational404(pathname) {
    let error = getInternalRouterError(404, { pathname });
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let { matches, route } = getShortCircuitMatches(routesToUse);
    return { notFoundMatches: matches, route, error };
  }
  function enableScrollRestoration(positions, getPosition, getKey) {
    savedScrollPositions2 = positions;
    getScrollPosition = getPosition;
    getScrollRestorationKey2 = getKey || null;
    if (!initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
      initialScrollRestored = true;
      let y2 = getSavedScrollPosition(state.location, state.matches);
      if (y2 != null) {
        updateState({ restoreScrollPosition: y2 });
      }
    }
    return () => {
      savedScrollPositions2 = null;
      getScrollPosition = null;
      getScrollRestorationKey2 = null;
    };
  }
  function getScrollKey(location2, matches) {
    if (getScrollRestorationKey2) {
      let key = getScrollRestorationKey2(
        location2,
        matches.map((m2) => convertRouteMatchToUiMatch(m2, state.loaderData))
      );
      return key || location2.key;
    }
    return location2.key;
  }
  function saveScrollPosition(location2, matches) {
    if (savedScrollPositions2 && getScrollPosition) {
      let key = getScrollKey(location2, matches);
      savedScrollPositions2[key] = getScrollPosition();
    }
  }
  function getSavedScrollPosition(location2, matches) {
    if (savedScrollPositions2) {
      let key = getScrollKey(location2, matches);
      let y2 = savedScrollPositions2[key];
      if (typeof y2 === "number") {
        return y2;
      }
    }
    return null;
  }
  function checkFogOfWar(matches, routesToUse, pathname) {
    if (init.patchRoutesOnNavigation) {
      if (!matches) {
        let fogMatches = matchRoutesImpl(
          routesToUse,
          pathname,
          basename,
          true
        );
        return { active: true, matches: fogMatches || [] };
      } else {
        if (Object.keys(matches[0].params).length > 0) {
          let partialMatches = matchRoutesImpl(
            routesToUse,
            pathname,
            basename,
            true
          );
          return { active: true, matches: partialMatches };
        }
      }
    }
    return { active: false, matches: null };
  }
  async function discoverRoutes(matches, pathname, signal, fetcherKey) {
    if (!init.patchRoutesOnNavigation) {
      return { type: "success", matches };
    }
    let partialMatches = matches;
    while (true) {
      let isNonHMR = inFlightDataRoutes == null;
      let routesToUse = inFlightDataRoutes || dataRoutes;
      let localManifest = manifest;
      try {
        await init.patchRoutesOnNavigation({
          signal,
          path: pathname,
          matches: partialMatches,
          fetcherKey,
          patch: (routeId, children) => {
            if (signal.aborted) return;
            patchRoutesImpl(
              routeId,
              children,
              routesToUse,
              localManifest,
              mapRouteProperties2,
              false
            );
          }
        });
      } catch (e) {
        return { type: "error", error: e, partialMatches };
      } finally {
        if (isNonHMR && !signal.aborted) {
          dataRoutes = [...dataRoutes];
        }
      }
      if (signal.aborted) {
        return { type: "aborted" };
      }
      let newMatches = matchRoutes(routesToUse, pathname, basename);
      let newPartialMatches = null;
      if (newMatches) {
        if (Object.keys(newMatches[0].params).length === 0) {
          return { type: "success", matches: newMatches };
        } else {
          newPartialMatches = matchRoutesImpl(
            routesToUse,
            pathname,
            basename,
            true
          );
          let matchedDeeper = newPartialMatches && partialMatches.length < newPartialMatches.length && compareMatches(
            partialMatches,
            newPartialMatches.slice(0, partialMatches.length)
          );
          if (!matchedDeeper) {
            return { type: "success", matches: newMatches };
          }
        }
      }
      if (!newPartialMatches) {
        newPartialMatches = matchRoutesImpl(
          routesToUse,
          pathname,
          basename,
          true
        );
      }
      if (!newPartialMatches || compareMatches(partialMatches, newPartialMatches)) {
        return { type: "success", matches: null };
      }
      partialMatches = newPartialMatches;
    }
  }
  function compareMatches(a, b) {
    return a.length === b.length && a.every((m2, i) => m2.route.id === b[i].route.id);
  }
  function _internalSetRoutes(newRoutes) {
    manifest = {};
    inFlightDataRoutes = convertRoutesToDataRoutes(
      newRoutes,
      mapRouteProperties2,
      void 0,
      manifest
    );
  }
  function patchRoutes(routeId, children, unstable_allowElementMutations = false) {
    let isNonHMR = inFlightDataRoutes == null;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    patchRoutesImpl(
      routeId,
      children,
      routesToUse,
      manifest,
      mapRouteProperties2,
      unstable_allowElementMutations
    );
    if (isNonHMR) {
      dataRoutes = [...dataRoutes];
      updateState({});
    }
  }
  router2 = {
    get basename() {
      return basename;
    },
    get future() {
      return future;
    },
    get state() {
      return state;
    },
    get routes() {
      return dataRoutes;
    },
    get window() {
      return routerWindow;
    },
    initialize,
    subscribe,
    enableScrollRestoration,
    navigate,
    fetch: fetch2,
    revalidate,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (to) => init.history.createHref(to),
    encodeLocation: (to) => init.history.encodeLocation(to),
    getFetcher,
    resetFetcher,
    deleteFetcher: queueFetcherForDeletion,
    dispose,
    getBlocker,
    deleteBlocker,
    patchRoutes,
    _internalFetchControllers: fetchControllers,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(newState) {
      updateState(newState);
    }
  };
  if (init.unstable_instrumentations) {
    router2 = instrumentClientSideRouter(
      router2,
      init.unstable_instrumentations.map((i) => i.router).filter(Boolean)
    );
  }
  return router2;
}
function isSubmissionNavigation(opts) {
  return opts != null && ("formData" in opts && opts.formData != null || "body" in opts && opts.body !== void 0);
}
function normalizeTo(location2, matches, basename, to, fromRouteId, relative) {
  let contextualMatches;
  let activeRouteMatch;
  if (fromRouteId) {
    contextualMatches = [];
    for (let match of matches) {
      contextualMatches.push(match);
      if (match.route.id === fromRouteId) {
        activeRouteMatch = match;
        break;
      }
    }
  } else {
    contextualMatches = matches;
    activeRouteMatch = matches[matches.length - 1];
  }
  let path = resolveTo(
    to ? to : ".",
    getResolveToMatches(contextualMatches),
    stripBasename(location2.pathname, basename) || location2.pathname,
    relative === "path"
  );
  if (to == null) {
    path.search = location2.search;
    path.hash = location2.hash;
  }
  if ((to == null || to === "" || to === ".") && activeRouteMatch) {
    let nakedIndex = hasNakedIndexQuery(path.search);
    if (activeRouteMatch.route.index && !nakedIndex) {
      path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
    } else if (!activeRouteMatch.route.index && nakedIndex) {
      let params = new URLSearchParams(path.search);
      let indexValues = params.getAll("index");
      params.delete("index");
      indexValues.filter((v2) => v2).forEach((v2) => params.append("index", v2));
      let qs = params.toString();
      path.search = qs ? `?${qs}` : "";
    }
  }
  if (basename !== "/") {
    path.pathname = prependBasename({ basename, pathname: path.pathname });
  }
  return createPath(path);
}
function normalizeNavigateOptions(isFetcher, path, opts) {
  if (!opts || !isSubmissionNavigation(opts)) {
    return { path };
  }
  if (opts.formMethod && !isValidMethod(opts.formMethod)) {
    return {
      path,
      error: getInternalRouterError(405, { method: opts.formMethod })
    };
  }
  let getInvalidBodyError = () => ({
    path,
    error: getInternalRouterError(400, { type: "invalid-body" })
  });
  let rawFormMethod = opts.formMethod || "get";
  let formMethod = rawFormMethod.toUpperCase();
  let formAction = stripHashFromPath(path);
  if (opts.body !== void 0) {
    if (opts.formEncType === "text/plain") {
      if (!isMutationMethod(formMethod)) {
        return getInvalidBodyError();
      }
      let text = typeof opts.body === "string" ? opts.body : opts.body instanceof FormData || opts.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(opts.body.entries()).reduce(
          (acc, [name, value]) => `${acc}${name}=${value}
`,
          ""
        )
      ) : String(opts.body);
      return {
        path,
        submission: {
          formMethod,
          formAction,
          formEncType: opts.formEncType,
          formData: void 0,
          json: void 0,
          text
        }
      };
    } else if (opts.formEncType === "application/json") {
      if (!isMutationMethod(formMethod)) {
        return getInvalidBodyError();
      }
      try {
        let json = typeof opts.body === "string" ? JSON.parse(opts.body) : opts.body;
        return {
          path,
          submission: {
            formMethod,
            formAction,
            formEncType: opts.formEncType,
            formData: void 0,
            json,
            text: void 0
          }
        };
      } catch (e) {
        return getInvalidBodyError();
      }
    }
  }
  invariant(
    typeof FormData === "function",
    "FormData is not available in this environment"
  );
  let searchParams;
  let formData;
  if (opts.formData) {
    searchParams = convertFormDataToSearchParams(opts.formData);
    formData = opts.formData;
  } else if (opts.body instanceof FormData) {
    searchParams = convertFormDataToSearchParams(opts.body);
    formData = opts.body;
  } else if (opts.body instanceof URLSearchParams) {
    searchParams = opts.body;
    formData = convertSearchParamsToFormData(searchParams);
  } else if (opts.body == null) {
    searchParams = new URLSearchParams();
    formData = new FormData();
  } else {
    try {
      searchParams = new URLSearchParams(opts.body);
      formData = convertSearchParamsToFormData(searchParams);
    } catch (e) {
      return getInvalidBodyError();
    }
  }
  let submission = {
    formMethod,
    formAction,
    formEncType: opts && opts.formEncType || "application/x-www-form-urlencoded",
    formData,
    json: void 0,
    text: void 0
  };
  if (isMutationMethod(submission.formMethod)) {
    return { path, submission };
  }
  let parsedPath = parsePath(path);
  if (isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search)) {
    searchParams.append("index", "");
  }
  parsedPath.search = `?${searchParams}`;
  return { path: createPath(parsedPath), submission };
}
function getMatchesToLoad(request, scopedContext, mapRouteProperties2, manifest, history, state, matches, submission, location2, lazyRoutePropertiesToSkip, initialHydration, isRevalidationRequired, cancelledFetcherLoads, fetchersQueuedForDeletion, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, hasPatchRoutesOnNavigation, pendingActionResult) {
  var _a;
  let actionResult = pendingActionResult ? isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : pendingActionResult[1].data : void 0;
  let currentUrl = history.createURL(state.location);
  let nextUrl = history.createURL(location2);
  let maxIdx;
  if (initialHydration && state.errors) {
    let boundaryId = Object.keys(state.errors)[0];
    maxIdx = matches.findIndex((m2) => m2.route.id === boundaryId);
  } else if (pendingActionResult && isErrorResult(pendingActionResult[1])) {
    let boundaryId = pendingActionResult[0];
    maxIdx = matches.findIndex((m2) => m2.route.id === boundaryId) - 1;
  }
  let actionStatus = pendingActionResult ? pendingActionResult[1].statusCode : void 0;
  let shouldSkipRevalidation = actionStatus && actionStatus >= 400;
  let baseShouldRevalidateArgs = {
    currentUrl,
    currentParams: ((_a = state.matches[0]) == null ? void 0 : _a.params) || {},
    nextUrl,
    nextParams: matches[0].params,
    ...submission,
    actionResult,
    actionStatus
  };
  let pattern = getRoutePattern(matches.map((m2) => m2.route.path));
  let dsMatches = matches.map((match, index) => {
    let { route } = match;
    let forceShouldLoad = null;
    if (maxIdx != null && index > maxIdx) {
      forceShouldLoad = false;
    } else if (route.lazy) {
      forceShouldLoad = true;
    } else if (!routeHasLoaderOrMiddleware(route)) {
      forceShouldLoad = false;
    } else if (initialHydration) {
      forceShouldLoad = shouldLoadRouteOnHydration(
        route,
        state.loaderData,
        state.errors
      );
    } else if (isNewLoader(state.loaderData, state.matches[index], match)) {
      forceShouldLoad = true;
    }
    if (forceShouldLoad !== null) {
      return getDataStrategyMatch(
        mapRouteProperties2,
        manifest,
        request,
        pattern,
        match,
        lazyRoutePropertiesToSkip,
        scopedContext,
        forceShouldLoad
      );
    }
    let defaultShouldRevalidate = shouldSkipRevalidation ? false : (
      // Forced revalidation due to submission, useRevalidator, or X-Remix-Revalidate
      isRevalidationRequired || currentUrl.pathname + currentUrl.search === nextUrl.pathname + nextUrl.search || // Search params affect all loaders
      currentUrl.search !== nextUrl.search || isNewRouteInstance(state.matches[index], match)
    );
    let shouldRevalidateArgs = {
      ...baseShouldRevalidateArgs,
      defaultShouldRevalidate
    };
    let shouldLoad = shouldRevalidateLoader(match, shouldRevalidateArgs);
    return getDataStrategyMatch(
      mapRouteProperties2,
      manifest,
      request,
      pattern,
      match,
      lazyRoutePropertiesToSkip,
      scopedContext,
      shouldLoad,
      shouldRevalidateArgs
    );
  });
  let revalidatingFetchers = [];
  fetchLoadMatches.forEach((f2, key) => {
    if (initialHydration || !matches.some((m2) => m2.route.id === f2.routeId) || fetchersQueuedForDeletion.has(key)) {
      return;
    }
    let fetcher = state.fetchers.get(key);
    let isMidInitialLoad = fetcher && fetcher.state !== "idle" && fetcher.data === void 0;
    let fetcherMatches = matchRoutes(routesToUse, f2.path, basename);
    if (!fetcherMatches) {
      if (hasPatchRoutesOnNavigation && isMidInitialLoad) {
        return;
      }
      revalidatingFetchers.push({
        key,
        routeId: f2.routeId,
        path: f2.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (fetchRedirectIds.has(key)) {
      return;
    }
    let fetcherMatch = getTargetMatch(fetcherMatches, f2.path);
    let fetchController = new AbortController();
    let fetchRequest = createClientSideRequest(
      history,
      f2.path,
      fetchController.signal
    );
    let fetcherDsMatches = null;
    if (cancelledFetcherLoads.has(key)) {
      cancelledFetcherLoads.delete(key);
      fetcherDsMatches = getTargetedDataStrategyMatches(
        mapRouteProperties2,
        manifest,
        fetchRequest,
        fetcherMatches,
        fetcherMatch,
        lazyRoutePropertiesToSkip,
        scopedContext
      );
    } else if (isMidInitialLoad) {
      if (isRevalidationRequired) {
        fetcherDsMatches = getTargetedDataStrategyMatches(
          mapRouteProperties2,
          manifest,
          fetchRequest,
          fetcherMatches,
          fetcherMatch,
          lazyRoutePropertiesToSkip,
          scopedContext
        );
      }
    } else {
      let shouldRevalidateArgs = {
        ...baseShouldRevalidateArgs,
        defaultShouldRevalidate: shouldSkipRevalidation ? false : isRevalidationRequired
      };
      if (shouldRevalidateLoader(fetcherMatch, shouldRevalidateArgs)) {
        fetcherDsMatches = getTargetedDataStrategyMatches(
          mapRouteProperties2,
          manifest,
          fetchRequest,
          fetcherMatches,
          fetcherMatch,
          lazyRoutePropertiesToSkip,
          scopedContext,
          shouldRevalidateArgs
        );
      }
    }
    if (fetcherDsMatches) {
      revalidatingFetchers.push({
        key,
        routeId: f2.routeId,
        path: f2.path,
        matches: fetcherDsMatches,
        match: fetcherMatch,
        request: fetchRequest,
        controller: fetchController
      });
    }
  });
  return { dsMatches, revalidatingFetchers };
}
function routeHasLoaderOrMiddleware(route) {
  return route.loader != null || route.middleware != null && route.middleware.length > 0;
}
function shouldLoadRouteOnHydration(route, loaderData, errors) {
  if (route.lazy) {
    return true;
  }
  if (!routeHasLoaderOrMiddleware(route)) {
    return false;
  }
  let hasData = loaderData != null && route.id in loaderData;
  let hasError = errors != null && errors[route.id] !== void 0;
  if (!hasData && hasError) {
    return false;
  }
  if (typeof route.loader === "function" && route.loader.hydrate === true) {
    return true;
  }
  return !hasData && !hasError;
}
function isNewLoader(currentLoaderData, currentMatch, match) {
  let isNew = (
    // [a] -> [a, b]
    !currentMatch || // [a, b] -> [a, c]
    match.route.id !== currentMatch.route.id
  );
  let isMissingData = !currentLoaderData.hasOwnProperty(match.route.id);
  return isNew || isMissingData;
}
function isNewRouteInstance(currentMatch, match) {
  let currentPath = currentMatch.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    currentMatch.pathname !== match.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    currentPath != null && currentPath.endsWith("*") && currentMatch.params["*"] !== match.params["*"]
  );
}
function shouldRevalidateLoader(loaderMatch, arg) {
  if (loaderMatch.route.shouldRevalidate) {
    let routeChoice = loaderMatch.route.shouldRevalidate(arg);
    if (typeof routeChoice === "boolean") {
      return routeChoice;
    }
  }
  return arg.defaultShouldRevalidate;
}
function patchRoutesImpl(routeId, children, routesToUse, manifest, mapRouteProperties2, allowElementMutations) {
  let childrenToPatch;
  if (routeId) {
    let route = manifest[routeId];
    invariant(
      route,
      `No route found to patch children into: routeId = ${routeId}`
    );
    if (!route.children) {
      route.children = [];
    }
    childrenToPatch = route.children;
  } else {
    childrenToPatch = routesToUse;
  }
  let uniqueChildren = [];
  let existingChildren = [];
  children.forEach((newRoute) => {
    let existingRoute = childrenToPatch.find(
      (existingRoute2) => isSameRoute(newRoute, existingRoute2)
    );
    if (existingRoute) {
      existingChildren.push({ existingRoute, newRoute });
    } else {
      uniqueChildren.push(newRoute);
    }
  });
  if (uniqueChildren.length > 0) {
    let newRoutes = convertRoutesToDataRoutes(
      uniqueChildren,
      mapRouteProperties2,
      [routeId || "_", "patch", String((childrenToPatch == null ? void 0 : childrenToPatch.length) || "0")],
      manifest
    );
    childrenToPatch.push(...newRoutes);
  }
  if (allowElementMutations && existingChildren.length > 0) {
    for (let i = 0; i < existingChildren.length; i++) {
      let { existingRoute, newRoute } = existingChildren[i];
      let existingRouteTyped = existingRoute;
      let [newRouteTyped] = convertRoutesToDataRoutes(
        [newRoute],
        mapRouteProperties2,
        [],
        // Doesn't matter for mutated routes since they already have an id
        {},
        // Don't touch the manifest here since we're updating in place
        true
      );
      Object.assign(existingRouteTyped, {
        element: newRouteTyped.element ? newRouteTyped.element : existingRouteTyped.element,
        errorElement: newRouteTyped.errorElement ? newRouteTyped.errorElement : existingRouteTyped.errorElement,
        hydrateFallbackElement: newRouteTyped.hydrateFallbackElement ? newRouteTyped.hydrateFallbackElement : existingRouteTyped.hydrateFallbackElement
      });
    }
  }
}
function isSameRoute(newRoute, existingRoute) {
  if ("id" in newRoute && "id" in existingRoute && newRoute.id === existingRoute.id) {
    return true;
  }
  if (!(newRoute.index === existingRoute.index && newRoute.path === existingRoute.path && newRoute.caseSensitive === existingRoute.caseSensitive)) {
    return false;
  }
  if ((!newRoute.children || newRoute.children.length === 0) && (!existingRoute.children || existingRoute.children.length === 0)) {
    return true;
  }
  return newRoute.children.every(
    (aChild, i) => {
      var _a;
      return (_a = existingRoute.children) == null ? void 0 : _a.some((bChild) => isSameRoute(aChild, bChild));
    }
  );
}
var lazyRoutePropertyCache = /* @__PURE__ */ new WeakMap();
var loadLazyRouteProperty = ({
  key,
  route,
  manifest,
  mapRouteProperties: mapRouteProperties2
}) => {
  let routeToUpdate = manifest[route.id];
  invariant(routeToUpdate, "No route found in manifest");
  if (!routeToUpdate.lazy || typeof routeToUpdate.lazy !== "object") {
    return;
  }
  let lazyFn = routeToUpdate.lazy[key];
  if (!lazyFn) {
    return;
  }
  let cache = lazyRoutePropertyCache.get(routeToUpdate);
  if (!cache) {
    cache = {};
    lazyRoutePropertyCache.set(routeToUpdate, cache);
  }
  let cachedPromise = cache[key];
  if (cachedPromise) {
    return cachedPromise;
  }
  let propertyPromise = (async () => {
    let isUnsupported = isUnsupportedLazyRouteObjectKey(key);
    let staticRouteValue = routeToUpdate[key];
    let isStaticallyDefined = staticRouteValue !== void 0 && key !== "hasErrorBoundary";
    if (isUnsupported) {
      warning(
        !isUnsupported,
        "Route property " + key + " is not a supported lazy route property. This property will be ignored."
      );
      cache[key] = Promise.resolve();
    } else if (isStaticallyDefined) {
      warning(
        false,
        `Route "${routeToUpdate.id}" has a static property "${key}" defined. The lazy property will be ignored.`
      );
    } else {
      let value = await lazyFn();
      if (value != null) {
        Object.assign(routeToUpdate, { [key]: value });
        Object.assign(routeToUpdate, mapRouteProperties2(routeToUpdate));
      }
    }
    if (typeof routeToUpdate.lazy === "object") {
      routeToUpdate.lazy[key] = void 0;
      if (Object.values(routeToUpdate.lazy).every((value) => value === void 0)) {
        routeToUpdate.lazy = void 0;
      }
    }
  })();
  cache[key] = propertyPromise;
  return propertyPromise;
};
var lazyRouteFunctionCache = /* @__PURE__ */ new WeakMap();
function loadLazyRoute(route, type, manifest, mapRouteProperties2, lazyRoutePropertiesToSkip) {
  let routeToUpdate = manifest[route.id];
  invariant(routeToUpdate, "No route found in manifest");
  if (!route.lazy) {
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  }
  if (typeof route.lazy === "function") {
    let cachedPromise = lazyRouteFunctionCache.get(routeToUpdate);
    if (cachedPromise) {
      return {
        lazyRoutePromise: cachedPromise,
        lazyHandlerPromise: cachedPromise
      };
    }
    let lazyRoutePromise2 = (async () => {
      invariant(
        typeof route.lazy === "function",
        "No lazy route function found"
      );
      let lazyRoute = await route.lazy();
      let routeUpdates = {};
      for (let lazyRouteProperty in lazyRoute) {
        let lazyValue = lazyRoute[lazyRouteProperty];
        if (lazyValue === void 0) {
          continue;
        }
        let isUnsupported = isUnsupportedLazyRouteFunctionKey(lazyRouteProperty);
        let staticRouteValue = routeToUpdate[lazyRouteProperty];
        let isStaticallyDefined = staticRouteValue !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        lazyRouteProperty !== "hasErrorBoundary";
        if (isUnsupported) {
          warning(
            !isUnsupported,
            "Route property " + lazyRouteProperty + " is not a supported property to be returned from a lazy route function. This property will be ignored."
          );
        } else if (isStaticallyDefined) {
          warning(
            !isStaticallyDefined,
            `Route "${routeToUpdate.id}" has a static property "${lazyRouteProperty}" defined but its lazy function is also returning a value for this property. The lazy route property "${lazyRouteProperty}" will be ignored.`
          );
        } else {
          routeUpdates[lazyRouteProperty] = lazyValue;
        }
      }
      Object.assign(routeToUpdate, routeUpdates);
      Object.assign(routeToUpdate, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...mapRouteProperties2(routeToUpdate),
        lazy: void 0
      });
    })();
    lazyRouteFunctionCache.set(routeToUpdate, lazyRoutePromise2);
    lazyRoutePromise2.catch(() => {
    });
    return {
      lazyRoutePromise: lazyRoutePromise2,
      lazyHandlerPromise: lazyRoutePromise2
    };
  }
  let lazyKeys = Object.keys(route.lazy);
  let lazyPropertyPromises = [];
  let lazyHandlerPromise = void 0;
  for (let key of lazyKeys) {
    if (lazyRoutePropertiesToSkip && lazyRoutePropertiesToSkip.includes(key)) {
      continue;
    }
    let promise = loadLazyRouteProperty({
      key,
      route,
      manifest,
      mapRouteProperties: mapRouteProperties2
    });
    if (promise) {
      lazyPropertyPromises.push(promise);
      if (key === type) {
        lazyHandlerPromise = promise;
      }
    }
  }
  let lazyRoutePromise = lazyPropertyPromises.length > 0 ? Promise.all(lazyPropertyPromises).then(() => {
  }) : void 0;
  lazyRoutePromise == null ? void 0 : lazyRoutePromise.catch(() => {
  });
  lazyHandlerPromise == null ? void 0 : lazyHandlerPromise.catch(() => {
  });
  return {
    lazyRoutePromise,
    lazyHandlerPromise
  };
}
async function defaultDataStrategy(args) {
  let matchesToLoad = args.matches.filter((m2) => m2.shouldLoad);
  let keyedResults = {};
  let results = await Promise.all(matchesToLoad.map((m2) => m2.resolve()));
  results.forEach((result, i) => {
    keyedResults[matchesToLoad[i].route.id] = result;
  });
  return keyedResults;
}
async function defaultDataStrategyWithMiddleware(args) {
  if (!args.matches.some((m2) => m2.route.middleware)) {
    return defaultDataStrategy(args);
  }
  return runClientMiddlewarePipeline(args, () => defaultDataStrategy(args));
}
function runClientMiddlewarePipeline(args, handler) {
  return runMiddlewarePipeline(
    args,
    handler,
    (r2) => r2,
    // No post-processing needed on the client
    isDataStrategyResults,
    errorHandler
  );
  function errorHandler(error, routeId, nextResult) {
    if (nextResult) {
      return Promise.resolve(
        Object.assign(nextResult.value, {
          [routeId]: { type: "error", result: error }
        })
      );
    } else {
      let { matches } = args;
      let maxBoundaryIdx = Math.min(
        // Throwing route
        Math.max(
          matches.findIndex((m2) => m2.route.id === routeId),
          0
        ),
        // or the shallowest route that needs to load data
        Math.max(
          matches.findIndex((m2) => m2.unstable_shouldCallHandler()),
          0
        )
      );
      let boundaryRouteId = findNearestBoundary(
        matches,
        matches[maxBoundaryIdx].route.id
      ).route.id;
      return Promise.resolve({
        [boundaryRouteId]: { type: "error", result: error }
      });
    }
  }
}
async function runMiddlewarePipeline(args, handler, processResult, isResult, errorHandler) {
  let { matches, request, params, context, unstable_pattern } = args;
  let tuples = matches.flatMap(
    (m2) => m2.route.middleware ? m2.route.middleware.map((fn) => [m2.route.id, fn]) : []
  );
  let result = await callRouteMiddleware(
    {
      request,
      params,
      context,
      unstable_pattern
    },
    tuples,
    handler,
    processResult,
    isResult,
    errorHandler
  );
  return result;
}
async function callRouteMiddleware(args, middlewares, handler, processResult, isResult, errorHandler, idx = 0) {
  let { request } = args;
  if (request.signal.aborted) {
    throw request.signal.reason ?? new Error(`Request aborted: ${request.method} ${request.url}`);
  }
  let tuple = middlewares[idx];
  if (!tuple) {
    let result = await handler();
    return result;
  }
  let [routeId, middleware] = tuple;
  let nextResult;
  let next = async () => {
    if (nextResult) {
      throw new Error("You may only call `next()` once per middleware");
    }
    try {
      let result = await callRouteMiddleware(
        args,
        middlewares,
        handler,
        processResult,
        isResult,
        errorHandler,
        idx + 1
      );
      nextResult = { value: result };
      return nextResult.value;
    } catch (error) {
      nextResult = { value: await errorHandler(error, routeId, nextResult) };
      return nextResult.value;
    }
  };
  try {
    let value = await middleware(args, next);
    let result = value != null ? processResult(value) : void 0;
    if (isResult(result)) {
      return result;
    } else if (nextResult) {
      return result ?? nextResult.value;
    } else {
      nextResult = { value: await next() };
      return nextResult.value;
    }
  } catch (error) {
    let response = await errorHandler(error, routeId, nextResult);
    return response;
  }
}
function getDataStrategyMatchLazyPromises(mapRouteProperties2, manifest, request, match, lazyRoutePropertiesToSkip) {
  let lazyMiddlewarePromise = loadLazyRouteProperty({
    key: "middleware",
    route: match.route,
    manifest,
    mapRouteProperties: mapRouteProperties2
  });
  let lazyRoutePromises = loadLazyRoute(
    match.route,
    isMutationMethod(request.method) ? "action" : "loader",
    manifest,
    mapRouteProperties2,
    lazyRoutePropertiesToSkip
  );
  return {
    middleware: lazyMiddlewarePromise,
    route: lazyRoutePromises.lazyRoutePromise,
    handler: lazyRoutePromises.lazyHandlerPromise
  };
}
function getDataStrategyMatch(mapRouteProperties2, manifest, request, unstable_pattern, match, lazyRoutePropertiesToSkip, scopedContext, shouldLoad, unstable_shouldRevalidateArgs = null) {
  let isUsingNewApi = false;
  let _lazyPromises = getDataStrategyMatchLazyPromises(
    mapRouteProperties2,
    manifest,
    request,
    match,
    lazyRoutePropertiesToSkip
  );
  return {
    ...match,
    _lazyPromises,
    shouldLoad,
    unstable_shouldRevalidateArgs,
    unstable_shouldCallHandler(defaultShouldRevalidate) {
      isUsingNewApi = true;
      if (!unstable_shouldRevalidateArgs) {
        return shouldLoad;
      }
      if (typeof defaultShouldRevalidate === "boolean") {
        return shouldRevalidateLoader(match, {
          ...unstable_shouldRevalidateArgs,
          defaultShouldRevalidate
        });
      }
      return shouldRevalidateLoader(match, unstable_shouldRevalidateArgs);
    },
    resolve(handlerOverride) {
      let { lazy, loader, middleware } = match.route;
      let callHandler = isUsingNewApi || shouldLoad || handlerOverride && !isMutationMethod(request.method) && (lazy || loader);
      let isMiddlewareOnlyRoute = middleware && middleware.length > 0 && !loader && !lazy;
      if (callHandler && (isMutationMethod(request.method) || !isMiddlewareOnlyRoute)) {
        return callLoaderOrAction({
          request,
          unstable_pattern,
          match,
          lazyHandlerPromise: _lazyPromises == null ? void 0 : _lazyPromises.handler,
          lazyRoutePromise: _lazyPromises == null ? void 0 : _lazyPromises.route,
          handlerOverride,
          scopedContext
        });
      }
      return Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function getTargetedDataStrategyMatches(mapRouteProperties2, manifest, request, matches, targetMatch, lazyRoutePropertiesToSkip, scopedContext, shouldRevalidateArgs = null) {
  return matches.map((match) => {
    if (match.route.id !== targetMatch.route.id) {
      return {
        ...match,
        shouldLoad: false,
        unstable_shouldRevalidateArgs: shouldRevalidateArgs,
        unstable_shouldCallHandler: () => false,
        _lazyPromises: getDataStrategyMatchLazyPromises(
          mapRouteProperties2,
          manifest,
          request,
          match,
          lazyRoutePropertiesToSkip
        ),
        resolve: () => Promise.resolve({ type: "data", result: void 0 })
      };
    }
    return getDataStrategyMatch(
      mapRouteProperties2,
      manifest,
      request,
      getRoutePattern(matches.map((m2) => m2.route.path)),
      match,
      lazyRoutePropertiesToSkip,
      scopedContext,
      true,
      shouldRevalidateArgs
    );
  });
}
async function callDataStrategyImpl(dataStrategyImpl, request, matches, fetcherKey, scopedContext, isStaticHandler) {
  if (matches.some((m2) => {
    var _a;
    return (_a = m2._lazyPromises) == null ? void 0 : _a.middleware;
  })) {
    await Promise.all(matches.map((m2) => {
      var _a;
      return (_a = m2._lazyPromises) == null ? void 0 : _a.middleware;
    }));
  }
  let dataStrategyArgs = {
    request,
    unstable_pattern: getRoutePattern(matches.map((m2) => m2.route.path)),
    params: matches[0].params,
    context: scopedContext,
    matches
  };
  let runClientMiddleware = (cb2) => {
    let typedDataStrategyArgs = dataStrategyArgs;
    return runClientMiddlewarePipeline(typedDataStrategyArgs, () => {
      return cb2({
        ...typedDataStrategyArgs,
        fetcherKey,
        runClientMiddleware: () => {
          throw new Error(
            "Cannot call `runClientMiddleware()` from within an `runClientMiddleware` handler"
          );
        }
      });
    });
  };
  let results = await dataStrategyImpl({
    ...dataStrategyArgs,
    fetcherKey,
    runClientMiddleware
  });
  try {
    await Promise.all(
      matches.flatMap((m2) => {
        var _a, _b;
        return [
          (_a = m2._lazyPromises) == null ? void 0 : _a.handler,
          (_b = m2._lazyPromises) == null ? void 0 : _b.route
        ];
      })
    );
  } catch (e) {
  }
  return results;
}
async function callLoaderOrAction({
  request,
  unstable_pattern,
  match,
  lazyHandlerPromise,
  lazyRoutePromise,
  handlerOverride,
  scopedContext
}) {
  let result;
  let onReject;
  let isAction = isMutationMethod(request.method);
  let type = isAction ? "action" : "loader";
  let runHandler = (handler) => {
    let reject;
    let abortPromise = new Promise((_, r2) => reject = r2);
    onReject = () => reject();
    request.signal.addEventListener("abort", onReject);
    let actualHandler = (ctx) => {
      if (typeof handler !== "function") {
        return Promise.reject(
          new Error(
            `You cannot call the handler for a route which defines a boolean "${type}" [routeId: ${match.route.id}]`
          )
        );
      }
      return handler(
        {
          request,
          unstable_pattern,
          params: match.params,
          context: scopedContext
        },
        ...ctx !== void 0 ? [ctx] : []
      );
    };
    let handlerPromise = (async () => {
      try {
        let val = await (handlerOverride ? handlerOverride((ctx) => actualHandler(ctx)) : actualHandler());
        return { type: "data", result: val };
      } catch (e) {
        return { type: "error", result: e };
      }
    })();
    return Promise.race([handlerPromise, abortPromise]);
  };
  try {
    let handler = isAction ? match.route.action : match.route.loader;
    if (lazyHandlerPromise || lazyRoutePromise) {
      if (handler) {
        let handlerError;
        let [value] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          runHandler(handler).catch((e) => {
            handlerError = e;
          }),
          // Ensure all lazy route promises are resolved before continuing
          lazyHandlerPromise,
          lazyRoutePromise
        ]);
        if (handlerError !== void 0) {
          throw handlerError;
        }
        result = value;
      } else {
        await lazyHandlerPromise;
        let handler2 = isAction ? match.route.action : match.route.loader;
        if (handler2) {
          [result] = await Promise.all([runHandler(handler2), lazyRoutePromise]);
        } else if (type === "action") {
          let url = new URL(request.url);
          let pathname = url.pathname + url.search;
          throw getInternalRouterError(405, {
            method: request.method,
            pathname,
            routeId: match.route.id
          });
        } else {
          return { type: "data", result: void 0 };
        }
      }
    } else if (!handler) {
      let url = new URL(request.url);
      let pathname = url.pathname + url.search;
      throw getInternalRouterError(404, {
        pathname
      });
    } else {
      result = await runHandler(handler);
    }
  } catch (e) {
    return { type: "error", result: e };
  } finally {
    if (onReject) {
      request.signal.removeEventListener("abort", onReject);
    }
  }
  return result;
}
async function parseResponseBody(response) {
  let contentType = response.headers.get("Content-Type");
  if (contentType && /\bapplication\/json\b/.test(contentType)) {
    return response.body == null ? null : response.json();
  }
  return response.text();
}
async function convertDataStrategyResultToDataResult(dataStrategyResult) {
  var _a, _b, _c, _d, _e, _f;
  let { result, type } = dataStrategyResult;
  if (isResponse(result)) {
    let data2;
    try {
      data2 = await parseResponseBody(result);
    } catch (e) {
      return { type: "error", error: e };
    }
    if (type === "error") {
      return {
        type: "error",
        error: new ErrorResponseImpl(result.status, result.statusText, data2),
        statusCode: result.status,
        headers: result.headers
      };
    }
    return {
      type: "data",
      data: data2,
      statusCode: result.status,
      headers: result.headers
    };
  }
  if (type === "error") {
    if (isDataWithResponseInit(result)) {
      if (result.data instanceof Error) {
        return {
          type: "error",
          error: result.data,
          statusCode: (_a = result.init) == null ? void 0 : _a.status,
          headers: ((_b = result.init) == null ? void 0 : _b.headers) ? new Headers(result.init.headers) : void 0
        };
      }
      return {
        type: "error",
        error: new ErrorResponseImpl(
          ((_c = result.init) == null ? void 0 : _c.status) || 500,
          void 0,
          result.data
        ),
        statusCode: isRouteErrorResponse(result) ? result.status : void 0,
        headers: ((_d = result.init) == null ? void 0 : _d.headers) ? new Headers(result.init.headers) : void 0
      };
    }
    return {
      type: "error",
      error: result,
      statusCode: isRouteErrorResponse(result) ? result.status : void 0
    };
  }
  if (isDataWithResponseInit(result)) {
    return {
      type: "data",
      data: result.data,
      statusCode: (_e = result.init) == null ? void 0 : _e.status,
      headers: ((_f = result.init) == null ? void 0 : _f.headers) ? new Headers(result.init.headers) : void 0
    };
  }
  return { type: "data", data: result };
}
function normalizeRelativeRoutingRedirectResponse(response, request, routeId, matches, basename) {
  let location2 = response.headers.get("Location");
  invariant(
    location2,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  );
  if (!isAbsoluteUrl(location2)) {
    let trimmedMatches = matches.slice(
      0,
      matches.findIndex((m2) => m2.route.id === routeId) + 1
    );
    location2 = normalizeTo(
      new URL(request.url),
      trimmedMatches,
      basename,
      location2
    );
    response.headers.set("Location", location2);
  }
  return response;
}
function normalizeRedirectLocation(location2, currentUrl, basename) {
  if (isAbsoluteUrl(location2)) {
    let normalizedLocation = location2;
    let url = normalizedLocation.startsWith("//") ? new URL(currentUrl.protocol + normalizedLocation) : new URL(normalizedLocation);
    let isSameBasename = stripBasename(url.pathname, basename) != null;
    if (url.origin === currentUrl.origin && isSameBasename) {
      return url.pathname + url.search + url.hash;
    }
  }
  return location2;
}
function createClientSideRequest(history, location2, signal, submission) {
  let url = history.createURL(stripHashFromPath(location2)).toString();
  let init = { signal };
  if (submission && isMutationMethod(submission.formMethod)) {
    let { formMethod, formEncType } = submission;
    init.method = formMethod.toUpperCase();
    if (formEncType === "application/json") {
      init.headers = new Headers({ "Content-Type": formEncType });
      init.body = JSON.stringify(submission.json);
    } else if (formEncType === "text/plain") {
      init.body = submission.text;
    } else if (formEncType === "application/x-www-form-urlencoded" && submission.formData) {
      init.body = convertFormDataToSearchParams(submission.formData);
    } else {
      init.body = submission.formData;
    }
  }
  return new Request(url, init);
}
function convertFormDataToSearchParams(formData) {
  let searchParams = new URLSearchParams();
  for (let [key, value] of formData.entries()) {
    searchParams.append(key, typeof value === "string" ? value : value.name);
  }
  return searchParams;
}
function convertSearchParamsToFormData(searchParams) {
  let formData = new FormData();
  for (let [key, value] of searchParams.entries()) {
    formData.append(key, value);
  }
  return formData;
}
function processRouteLoaderData(matches, results, pendingActionResult, isStaticHandler = false, skipLoaderErrorBubbling = false) {
  let loaderData = {};
  let errors = null;
  let statusCode;
  let foundError = false;
  let loaderHeaders = {};
  let pendingError = pendingActionResult && isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : void 0;
  matches.forEach((match) => {
    if (!(match.route.id in results)) {
      return;
    }
    let id2 = match.route.id;
    let result = results[id2];
    invariant(
      !isRedirectResult(result),
      "Cannot handle redirect results in processLoaderData"
    );
    if (isErrorResult(result)) {
      let error = result.error;
      if (pendingError !== void 0) {
        error = pendingError;
        pendingError = void 0;
      }
      errors = errors || {};
      if (skipLoaderErrorBubbling) {
        errors[id2] = error;
      } else {
        let boundaryMatch = findNearestBoundary(matches, id2);
        if (errors[boundaryMatch.route.id] == null) {
          errors[boundaryMatch.route.id] = error;
        }
      }
      if (!isStaticHandler) {
        loaderData[id2] = ResetLoaderDataSymbol;
      }
      if (!foundError) {
        foundError = true;
        statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500;
      }
      if (result.headers) {
        loaderHeaders[id2] = result.headers;
      }
    } else {
      loaderData[id2] = result.data;
      if (result.statusCode && result.statusCode !== 200 && !foundError) {
        statusCode = result.statusCode;
      }
      if (result.headers) {
        loaderHeaders[id2] = result.headers;
      }
    }
  });
  if (pendingError !== void 0 && pendingActionResult) {
    errors = { [pendingActionResult[0]]: pendingError };
    if (pendingActionResult[2]) {
      loaderData[pendingActionResult[2]] = void 0;
    }
  }
  return {
    loaderData,
    errors,
    statusCode: statusCode || 200,
    loaderHeaders
  };
}
function processLoaderData(state, matches, results, pendingActionResult, revalidatingFetchers, fetcherResults) {
  let { loaderData, errors } = processRouteLoaderData(
    matches,
    results,
    pendingActionResult
  );
  revalidatingFetchers.filter((f2) => !f2.matches || f2.matches.some((m2) => m2.shouldLoad)).forEach((rf2) => {
    let { key, match, controller } = rf2;
    if (controller && controller.signal.aborted) {
      return;
    }
    let result = fetcherResults[key];
    invariant(result, "Did not find corresponding fetcher result");
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(state.matches, match == null ? void 0 : match.route.id);
      if (!(errors && errors[boundaryMatch.route.id])) {
        errors = {
          ...errors,
          [boundaryMatch.route.id]: result.error
        };
      }
      state.fetchers.delete(key);
    } else if (isRedirectResult(result)) {
      invariant(false, "Unhandled fetcher revalidation redirect");
    } else {
      let doneFetcher = getDoneFetcher(result.data);
      state.fetchers.set(key, doneFetcher);
    }
  });
  return { loaderData, errors };
}
function mergeLoaderData(loaderData, newLoaderData, matches, errors) {
  let mergedLoaderData = Object.entries(newLoaderData).filter(([, v2]) => v2 !== ResetLoaderDataSymbol).reduce((merged, [k2, v2]) => {
    merged[k2] = v2;
    return merged;
  }, {});
  for (let match of matches) {
    let id2 = match.route.id;
    if (!newLoaderData.hasOwnProperty(id2) && loaderData.hasOwnProperty(id2) && match.route.loader) {
      mergedLoaderData[id2] = loaderData[id2];
    }
    if (errors && errors.hasOwnProperty(id2)) {
      break;
    }
  }
  return mergedLoaderData;
}
function getActionDataForCommit(pendingActionResult) {
  if (!pendingActionResult) {
    return {};
  }
  return isErrorResult(pendingActionResult[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [pendingActionResult[0]]: pendingActionResult[1].data
    }
  };
}
function findNearestBoundary(matches, routeId) {
  let eligibleMatches = routeId ? matches.slice(0, matches.findIndex((m2) => m2.route.id === routeId) + 1) : [...matches];
  return eligibleMatches.reverse().find((m2) => m2.route.hasErrorBoundary === true) || matches[0];
}
function getShortCircuitMatches(routes) {
  let route = routes.length === 1 ? routes[0] : routes.find((r2) => r2.index || !r2.path || r2.path === "/") || {
    id: `__shim-error-route__`
  };
  return {
    matches: [
      {
        params: {},
        pathname: "",
        pathnameBase: "",
        route
      }
    ],
    route
  };
}
function getInternalRouterError(status, {
  pathname,
  routeId,
  method,
  type,
  message
} = {}) {
  let statusText = "Unknown Server Error";
  let errorMessage = "Unknown @remix-run/router error";
  if (status === 400) {
    statusText = "Bad Request";
    if (method && pathname && routeId) {
      errorMessage = `You made a ${method} request to "${pathname}" but did not provide a \`loader\` for route "${routeId}", so there is no way to handle the request.`;
    } else if (type === "invalid-body") {
      errorMessage = "Unable to encode submission body";
    }
  } else if (status === 403) {
    statusText = "Forbidden";
    errorMessage = `Route "${routeId}" does not match URL "${pathname}"`;
  } else if (status === 404) {
    statusText = "Not Found";
    errorMessage = `No route matches URL "${pathname}"`;
  } else if (status === 405) {
    statusText = "Method Not Allowed";
    if (method && pathname && routeId) {
      errorMessage = `You made a ${method.toUpperCase()} request to "${pathname}" but did not provide an \`action\` for route "${routeId}", so there is no way to handle the request.`;
    } else if (method) {
      errorMessage = `Invalid request method "${method.toUpperCase()}"`;
    }
  }
  return new ErrorResponseImpl(
    status || 500,
    statusText,
    new Error(errorMessage),
    true
  );
}
function findRedirect(results) {
  let entries = Object.entries(results);
  for (let i = entries.length - 1; i >= 0; i--) {
    let [key, result] = entries[i];
    if (isRedirectResult(result)) {
      return { key, result };
    }
  }
}
function stripHashFromPath(path) {
  let parsedPath = typeof path === "string" ? parsePath(path) : path;
  return createPath({ ...parsedPath, hash: "" });
}
function isHashChangeOnly(a, b) {
  if (a.pathname !== b.pathname || a.search !== b.search) {
    return false;
  }
  if (a.hash === "") {
    return b.hash !== "";
  } else if (a.hash === b.hash) {
    return true;
  } else if (b.hash !== "") {
    return true;
  }
  return false;
}
function isDataStrategyResults(result) {
  return result != null && typeof result === "object" && Object.entries(result).every(
    ([key, value]) => typeof key === "string" && isDataStrategyResult(value)
  );
}
function isDataStrategyResult(result) {
  return result != null && typeof result === "object" && "type" in result && "result" in result && (result.type === "data" || result.type === "error");
}
function isRedirectDataStrategyResult(result) {
  return isResponse(result.result) && redirectStatusCodes.has(result.result.status);
}
function isErrorResult(result) {
  return result.type === "error";
}
function isRedirectResult(result) {
  return (result && result.type) === "redirect";
}
function isDataWithResponseInit(value) {
  return typeof value === "object" && value != null && "type" in value && "data" in value && "init" in value && value.type === "DataWithResponseInit";
}
function isResponse(value) {
  return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
}
function isValidMethod(method) {
  return validRequestMethods.has(method.toUpperCase());
}
function isMutationMethod(method) {
  return validMutationMethods.has(method.toUpperCase());
}
function hasNakedIndexQuery(search) {
  return new URLSearchParams(search).getAll("index").some((v2) => v2 === "");
}
function getTargetMatch(matches, location2) {
  let search = typeof location2 === "string" ? parsePath(location2).search : location2.search;
  if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || "")) {
    return matches[matches.length - 1];
  }
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches[pathMatches.length - 1];
}
function getSubmissionFromNavigation(navigation) {
  let { formMethod, formAction, formEncType, text, formData, json } = navigation;
  if (!formMethod || !formAction || !formEncType) {
    return;
  }
  if (text != null) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData: void 0,
      json: void 0,
      text
    };
  } else if (formData != null) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData,
      json: void 0,
      text: void 0
    };
  } else if (json !== void 0) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData: void 0,
      json,
      text: void 0
    };
  }
}
function getLoadingNavigation(location2, submission) {
  if (submission) {
    let navigation = {
      state: "loading",
      location: location2,
      formMethod: submission.formMethod,
      formAction: submission.formAction,
      formEncType: submission.formEncType,
      formData: submission.formData,
      json: submission.json,
      text: submission.text
    };
    return navigation;
  } else {
    let navigation = {
      state: "loading",
      location: location2,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0
    };
    return navigation;
  }
}
function getSubmittingNavigation(location2, submission) {
  let navigation = {
    state: "submitting",
    location: location2,
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text
  };
  return navigation;
}
function getLoadingFetcher(submission, data2) {
  if (submission) {
    let fetcher = {
      state: "loading",
      formMethod: submission.formMethod,
      formAction: submission.formAction,
      formEncType: submission.formEncType,
      formData: submission.formData,
      json: submission.json,
      text: submission.text,
      data: data2
    };
    return fetcher;
  } else {
    let fetcher = {
      state: "loading",
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0,
      data: data2
    };
    return fetcher;
  }
}
function getSubmittingFetcher(submission, existingFetcher) {
  let fetcher = {
    state: "submitting",
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text,
    data: existingFetcher ? existingFetcher.data : void 0
  };
  return fetcher;
}
function getDoneFetcher(data2) {
  let fetcher = {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: data2
  };
  return fetcher;
}
function restoreAppliedTransitions(_window, transitions) {
  try {
    let sessionPositions = _window.sessionStorage.getItem(
      TRANSITIONS_STORAGE_KEY
    );
    if (sessionPositions) {
      let json = JSON.parse(sessionPositions);
      for (let [k2, v2] of Object.entries(json || {})) {
        if (v2 && Array.isArray(v2)) {
          transitions.set(k2, new Set(v2 || []));
        }
      }
    }
  } catch (e) {
  }
}
function persistAppliedTransitions(_window, transitions) {
  if (transitions.size > 0) {
    let json = {};
    for (let [k2, v2] of transitions) {
      json[k2] = [...v2];
    }
    try {
      _window.sessionStorage.setItem(
        TRANSITIONS_STORAGE_KEY,
        JSON.stringify(json)
      );
    } catch (error) {
      warning(
        false,
        `Failed to save applied view transitions in sessionStorage (${error}).`
      );
    }
  }
}
function createDeferred() {
  let resolve;
  let reject;
  let promise = new Promise((res, rej) => {
    resolve = async (val) => {
      res(val);
      try {
        await promise;
      } catch (e) {
      }
    };
    reject = async (error) => {
      rej(error);
      try {
        await promise;
      } catch (e) {
      }
    };
  });
  return {
    promise,
    //@ts-ignore
    resolve,
    //@ts-ignore
    reject
  };
}
var DataRouterContext = reactExports.createContext(null);
DataRouterContext.displayName = "DataRouter";
var DataRouterStateContext = reactExports.createContext(null);
DataRouterStateContext.displayName = "DataRouterState";
reactExports.createContext(false);
var ViewTransitionContext = reactExports.createContext({
  isTransitioning: false
});
ViewTransitionContext.displayName = "ViewTransition";
var FetchersContext = reactExports.createContext(
  /* @__PURE__ */ new Map()
);
FetchersContext.displayName = "Fetchers";
var AwaitContext = reactExports.createContext(null);
AwaitContext.displayName = "Await";
var NavigationContext = reactExports.createContext(
  null
);
NavigationContext.displayName = "Navigation";
var LocationContext = reactExports.createContext(
  null
);
LocationContext.displayName = "Location";
var RouteContext = reactExports.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
RouteContext.displayName = "Route";
var RouteErrorContext = reactExports.createContext(null);
RouteErrorContext.displayName = "RouteError";
function useHref(to, { relative } = {}) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useHref() may be used only in the context of a <Router> component.`
  );
  let { basename, navigator: navigator2 } = reactExports.useContext(NavigationContext);
  let { hash, pathname, search } = useResolvedPath(to, { relative });
  let joinedPathname = pathname;
  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
  }
  return navigator2.createHref({ pathname: joinedPathname, search, hash });
}
function useInRouterContext() {
  return reactExports.useContext(LocationContext) != null;
}
function useLocation() {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useLocation() may be used only in the context of a <Router> component.`
  );
  return reactExports.useContext(LocationContext).location;
}
var navigateEffectWarning = `You should call navigate() in a React.useEffect(), not when your component is first rendered.`;
function useIsomorphicLayoutEffect(cb2) {
  let isStatic = reactExports.useContext(NavigationContext).static;
  if (!isStatic) {
    reactExports.useLayoutEffect(cb2);
  }
}
function useNavigate() {
  let { isDataRoute } = reactExports.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useNavigate() may be used only in the context of a <Router> component.`
  );
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  let { basename, navigator: navigator2 } = reactExports.useContext(NavigationContext);
  let { matches } = reactExports.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(
    (to, options = {}) => {
      warning(activeRef.current, navigateEffectWarning);
      if (!activeRef.current) return;
      if (typeof to === "number") {
        navigator2.go(to);
        return;
      }
      let path = resolveTo(
        to,
        JSON.parse(routePathnamesJson),
        locationPathname,
        options.relative === "path"
      );
      if (dataRouterContext == null && basename !== "/") {
        path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
      }
      (!!options.replace ? navigator2.replace : navigator2.push)(
        path,
        options.state,
        options
      );
    },
    [
      basename,
      navigator2,
      routePathnamesJson,
      locationPathname,
      dataRouterContext
    ]
  );
  return navigate;
}
var OutletContext = reactExports.createContext(null);
function useOutlet(context) {
  let outlet = reactExports.useContext(RouteContext).outlet;
  return reactExports.useMemo(
    () => outlet && /* @__PURE__ */ reactExports.createElement(OutletContext.Provider, { value: context }, outlet),
    [outlet, context]
  );
}
function useResolvedPath(to, { relative } = {}) {
  let { matches } = reactExports.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
  return reactExports.useMemo(
    () => resolveTo(
      to,
      JSON.parse(routePathnamesJson),
      locationPathname,
      relative === "path"
    ),
    [to, routePathnamesJson, locationPathname, relative]
  );
}
function useRoutesImpl(routes, locationArg, dataRouterState, unstable_onError, future) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useRoutes() may be used only in the context of a <Router> component.`
  );
  let { navigator: navigator2 } = reactExports.useContext(NavigationContext);
  let { matches: parentMatches } = reactExports.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  let parentPathname = routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  let parentRoute = routeMatch && routeMatch.route;
  {
    let parentPath = parentRoute && parentRoute.path || "";
    warningOnce(
      parentPathname,
      !parentRoute || parentPath.endsWith("*") || parentPath.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${parentPathname}" (under <Route path="${parentPath}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${parentPath}"> to <Route path="${parentPath === "/" ? "*" : `${parentPath}/*`}">.`
    );
  }
  let locationFromContext = useLocation();
  let location2;
  {
    location2 = locationFromContext;
  }
  let pathname = location2.pathname || "/";
  let remainingPathname = pathname;
  if (parentPathnameBase !== "/") {
    let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
    let segments = pathname.replace(/^\//, "").split("/");
    remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
  }
  let matches = matchRoutes(routes, { pathname: remainingPathname });
  {
    warning(
      parentRoute || matches != null,
      `No routes matched location "${location2.pathname}${location2.search}${location2.hash}" `
    );
    warning(
      matches == null || matches[matches.length - 1].route.element !== void 0 || matches[matches.length - 1].route.Component !== void 0 || matches[matches.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${location2.pathname}${location2.search}${location2.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    );
  }
  let renderedMatches = _renderMatches(
    matches && matches.map(
      (match) => Object.assign({}, match, {
        params: Object.assign({}, parentParams, match.params),
        pathname: joinPaths([
          parentPathnameBase,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          navigator2.encodeLocation ? navigator2.encodeLocation(
            match.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : match.pathname
        ]),
        pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
          parentPathnameBase,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          navigator2.encodeLocation ? navigator2.encodeLocation(
            match.pathnameBase.replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : match.pathnameBase
        ])
      })
    ),
    parentMatches,
    dataRouterState,
    unstable_onError,
    future
  );
  return renderedMatches;
}
function DefaultErrorComponent() {
  let error = useRouteError();
  let message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = { padding: "0.5rem", backgroundColor: lightgrey };
  let codeStyles = { padding: "2px 4px", backgroundColor: lightgrey };
  let devInfo = null;
  {
    console.error(
      "Error handled by React Router default ErrorBoundary:",
      error
    );
    devInfo = /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ reactExports.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ reactExports.createElement("code", { style: codeStyles }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ reactExports.createElement("code", { style: codeStyles }, "errorElement"), " prop on your route."));
  }
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ reactExports.createElement("h3", { style: { fontStyle: "italic" } }, message), stack ? /* @__PURE__ */ reactExports.createElement("pre", { style: preStyles }, stack) : null, devInfo);
}
var defaultErrorElement = /* @__PURE__ */ reactExports.createElement(DefaultErrorComponent, null);
var RenderErrorBoundary = class extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation
      };
    }
    return {
      error: props.error !== void 0 ? props.error : state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation
    };
  }
  componentDidCatch(error, errorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    } else {
      console.error(
        "React Router caught the following error during render",
        error
      );
    }
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, { value: this.props.routeContext }, /* @__PURE__ */ reactExports.createElement(
      RouteErrorContext.Provider,
      {
        value: this.state.error,
        children: this.props.component
      }
    )) : this.props.children;
  }
};
function RenderedRoute({ routeContext, match, children }) {
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, { value: routeContext }, children);
}
function _renderMatches(matches, parentMatches = [], dataRouterState = null, unstable_onError = null, future = null) {
  if (matches == null) {
    if (!dataRouterState) {
      return null;
    }
    if (dataRouterState.errors) {
      matches = dataRouterState.matches;
    } else if (parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) {
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches;
  let errors = dataRouterState == null ? void 0 : dataRouterState.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex(
      (m2) => m2.route.id && (errors == null ? void 0 : errors[m2.route.id]) !== void 0
    );
    invariant(
      errorIndex >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        errors
      ).join(",")}`
    );
    renderedMatches = renderedMatches.slice(
      0,
      Math.min(renderedMatches.length, errorIndex + 1)
    );
  }
  let renderFallback = false;
  let fallbackIndex = -1;
  if (dataRouterState) {
    for (let i = 0; i < renderedMatches.length; i++) {
      let match = renderedMatches[i];
      if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
        fallbackIndex = i;
      }
      if (match.route.id) {
        let { loaderData, errors: errors2 } = dataRouterState;
        let needsToRunLoader = match.route.loader && !loaderData.hasOwnProperty(match.route.id) && (!errors2 || errors2[match.route.id] === void 0);
        if (match.route.lazy || needsToRunLoader) {
          renderFallback = true;
          if (fallbackIndex >= 0) {
            renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
          } else {
            renderedMatches = [renderedMatches[0]];
          }
          break;
        }
      }
    }
  }
  let onError = dataRouterState && unstable_onError ? (error, errorInfo) => {
    var _a, _b;
    unstable_onError(error, {
      location: dataRouterState.location,
      params: ((_b = (_a = dataRouterState.matches) == null ? void 0 : _a[0]) == null ? void 0 : _b.params) ?? {},
      errorInfo
    });
  } : void 0;
  return renderedMatches.reduceRight(
    (outlet, match, index) => {
      let error;
      let shouldRenderHydrateFallback = false;
      let errorElement = null;
      let hydrateFallbackElement = null;
      if (dataRouterState) {
        error = errors && match.route.id ? errors[match.route.id] : void 0;
        errorElement = match.route.errorElement || defaultErrorElement;
        if (renderFallback) {
          if (fallbackIndex < 0 && index === 0) {
            warningOnce(
              "route-fallback",
              false,
              "No `HydrateFallback` element provided to render during initial hydration"
            );
            shouldRenderHydrateFallback = true;
            hydrateFallbackElement = null;
          } else if (fallbackIndex === index) {
            shouldRenderHydrateFallback = true;
            hydrateFallbackElement = match.route.hydrateFallbackElement || null;
          }
        }
      }
      let matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1));
      let getChildren = () => {
        let children;
        if (error) {
          children = errorElement;
        } else if (shouldRenderHydrateFallback) {
          children = hydrateFallbackElement;
        } else if (match.route.Component) {
          children = /* @__PURE__ */ reactExports.createElement(match.route.Component, null);
        } else if (match.route.element) {
          children = match.route.element;
        } else {
          children = outlet;
        }
        return /* @__PURE__ */ reactExports.createElement(
          RenderedRoute,
          {
            match,
            routeContext: {
              outlet,
              matches: matches2,
              isDataRoute: dataRouterState != null
            },
            children
          }
        );
      };
      return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /* @__PURE__ */ reactExports.createElement(
        RenderErrorBoundary,
        {
          location: dataRouterState.location,
          revalidation: dataRouterState.revalidation,
          component: errorElement,
          error,
          children: getChildren(),
          routeContext: { outlet: null, matches: matches2, isDataRoute: true },
          onError
        }
      ) : getChildren();
    },
    null
  );
}
function getDataRouterConsoleError(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext(hookName) {
  let ctx = reactExports.useContext(DataRouterContext);
  invariant(ctx, getDataRouterConsoleError(hookName));
  return ctx;
}
function useDataRouterState(hookName) {
  let state = reactExports.useContext(DataRouterStateContext);
  invariant(state, getDataRouterConsoleError(hookName));
  return state;
}
function useRouteContext(hookName) {
  let route = reactExports.useContext(RouteContext);
  invariant(route, getDataRouterConsoleError(hookName));
  return route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext(hookName);
  let thisRoute = route.matches[route.matches.length - 1];
  invariant(
    thisRoute.route.id,
    `${hookName} can only be used on routes that contain a unique "id"`
  );
  return thisRoute.route.id;
}
function useRouteId() {
  return useCurrentRouteId(
    "useRouteId"
    /* UseRouteId */
  );
}
function useRouteError() {
  var _a;
  let error = reactExports.useContext(RouteErrorContext);
  let state = useDataRouterState(
    "useRouteError"
    /* UseRouteError */
  );
  let routeId = useCurrentRouteId(
    "useRouteError"
    /* UseRouteError */
  );
  if (error !== void 0) {
    return error;
  }
  return (_a = state.errors) == null ? void 0 : _a[routeId];
}
function useNavigateStable() {
  let { router: router2 } = useDataRouterContext(
    "useNavigate"
    /* UseNavigateStable */
  );
  let id2 = useCurrentRouteId(
    "useNavigate"
    /* UseNavigateStable */
  );
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(
    async (to, options = {}) => {
      warning(activeRef.current, navigateEffectWarning);
      if (!activeRef.current) return;
      if (typeof to === "number") {
        router2.navigate(to);
      } else {
        await router2.navigate(to, { fromRouteId: id2, ...options });
      }
    },
    [router2, id2]
  );
  return navigate;
}
var alreadyWarned = {};
function warningOnce(key, cond, message) {
  if (!cond && !alreadyWarned[key]) {
    alreadyWarned[key] = true;
    warning(false, message);
  }
}
var alreadyWarned2 = {};
function warnOnce(condition, message) {
  if (!condition && !alreadyWarned2[message]) {
    alreadyWarned2[message] = true;
    console.warn(message);
  }
}
function mapRouteProperties(route) {
  let updates = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: route.hasErrorBoundary || route.ErrorBoundary != null || route.errorElement != null
  };
  if (route.Component) {
    {
      if (route.element) {
        warning(
          false,
          "You should not include both `Component` and `element` on your route - `Component` will be used."
        );
      }
    }
    Object.assign(updates, {
      element: reactExports.createElement(route.Component),
      Component: void 0
    });
  }
  if (route.HydrateFallback) {
    {
      if (route.hydrateFallbackElement) {
        warning(
          false,
          "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
        );
      }
    }
    Object.assign(updates, {
      hydrateFallbackElement: reactExports.createElement(route.HydrateFallback),
      HydrateFallback: void 0
    });
  }
  if (route.ErrorBoundary) {
    {
      if (route.errorElement) {
        warning(
          false,
          "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
        );
      }
    }
    Object.assign(updates, {
      errorElement: reactExports.createElement(route.ErrorBoundary),
      ErrorBoundary: void 0
    });
  }
  return updates;
}
var hydrationRouteProperties = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
var Deferred = class {
  constructor() {
    this.status = "pending";
    this.promise = new Promise((resolve, reject) => {
      this.resolve = (value) => {
        if (this.status === "pending") {
          this.status = "resolved";
          resolve(value);
        }
      };
      this.reject = (reason) => {
        if (this.status === "pending") {
          this.status = "rejected";
          reject(reason);
        }
      };
    });
  }
};
function RouterProvider({
  router: router2,
  flushSync: reactDomFlushSyncImpl,
  unstable_onError
}) {
  let [state, setStateImpl] = reactExports.useState(router2.state);
  let [pendingState, setPendingState] = reactExports.useState();
  let [vtContext, setVtContext] = reactExports.useState({
    isTransitioning: false
  });
  let [renderDfd, setRenderDfd] = reactExports.useState();
  let [transition, setTransition] = reactExports.useState();
  let [interruption, setInterruption] = reactExports.useState();
  let fetcherData = reactExports.useRef(/* @__PURE__ */ new Map());
  let logErrorsAndSetState = reactExports.useCallback(
    (newState) => {
      setStateImpl((prevState) => {
        if (newState.errors && unstable_onError) {
          Object.entries(newState.errors).forEach(([routeId, error]) => {
            var _a, _b;
            if (((_a = prevState.errors) == null ? void 0 : _a[routeId]) !== error) {
              unstable_onError(error, {
                location: newState.location,
                params: ((_b = newState.matches[0]) == null ? void 0 : _b.params) ?? {}
              });
            }
          });
        }
        return newState;
      });
    },
    [unstable_onError]
  );
  let setState = reactExports.useCallback(
    (newState, { deletedFetchers, flushSync, viewTransitionOpts }) => {
      newState.fetchers.forEach((fetcher, key) => {
        if (fetcher.data !== void 0) {
          fetcherData.current.set(key, fetcher.data);
        }
      });
      deletedFetchers.forEach((key) => fetcherData.current.delete(key));
      warnOnce(
        flushSync === false || reactDomFlushSyncImpl != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let isViewTransitionAvailable = router2.window != null && router2.window.document != null && typeof router2.window.document.startViewTransition === "function";
      warnOnce(
        viewTransitionOpts == null || isViewTransitionAvailable,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      );
      if (!viewTransitionOpts || !isViewTransitionAvailable) {
        if (reactDomFlushSyncImpl && flushSync) {
          reactDomFlushSyncImpl(() => logErrorsAndSetState(newState));
        } else {
          reactExports.startTransition(() => logErrorsAndSetState(newState));
        }
        return;
      }
      if (reactDomFlushSyncImpl && flushSync) {
        reactDomFlushSyncImpl(() => {
          if (transition) {
            renderDfd && renderDfd.resolve();
            transition.skipTransition();
          }
          setVtContext({
            isTransitioning: true,
            flushSync: true,
            currentLocation: viewTransitionOpts.currentLocation,
            nextLocation: viewTransitionOpts.nextLocation
          });
        });
        let t2 = router2.window.document.startViewTransition(() => {
          reactDomFlushSyncImpl(() => logErrorsAndSetState(newState));
        });
        t2.finished.finally(() => {
          reactDomFlushSyncImpl(() => {
            setRenderDfd(void 0);
            setTransition(void 0);
            setPendingState(void 0);
            setVtContext({ isTransitioning: false });
          });
        });
        reactDomFlushSyncImpl(() => setTransition(t2));
        return;
      }
      if (transition) {
        renderDfd && renderDfd.resolve();
        transition.skipTransition();
        setInterruption({
          state: newState,
          currentLocation: viewTransitionOpts.currentLocation,
          nextLocation: viewTransitionOpts.nextLocation
        });
      } else {
        setPendingState(newState);
        setVtContext({
          isTransitioning: true,
          flushSync: false,
          currentLocation: viewTransitionOpts.currentLocation,
          nextLocation: viewTransitionOpts.nextLocation
        });
      }
    },
    [
      router2.window,
      reactDomFlushSyncImpl,
      transition,
      renderDfd,
      logErrorsAndSetState
    ]
  );
  reactExports.useLayoutEffect(() => router2.subscribe(setState), [router2, setState]);
  reactExports.useEffect(() => {
    if (vtContext.isTransitioning && !vtContext.flushSync) {
      setRenderDfd(new Deferred());
    }
  }, [vtContext]);
  reactExports.useEffect(() => {
    if (renderDfd && pendingState && router2.window) {
      let newState = pendingState;
      let renderPromise = renderDfd.promise;
      let transition2 = router2.window.document.startViewTransition(async () => {
        reactExports.startTransition(() => logErrorsAndSetState(newState));
        await renderPromise;
      });
      transition2.finished.finally(() => {
        setRenderDfd(void 0);
        setTransition(void 0);
        setPendingState(void 0);
        setVtContext({ isTransitioning: false });
      });
      setTransition(transition2);
    }
  }, [pendingState, renderDfd, router2.window, logErrorsAndSetState]);
  reactExports.useEffect(() => {
    if (renderDfd && pendingState && state.location.key === pendingState.location.key) {
      renderDfd.resolve();
    }
  }, [renderDfd, transition, state.location, pendingState]);
  reactExports.useEffect(() => {
    if (!vtContext.isTransitioning && interruption) {
      setPendingState(interruption.state);
      setVtContext({
        isTransitioning: true,
        flushSync: false,
        currentLocation: interruption.currentLocation,
        nextLocation: interruption.nextLocation
      });
      setInterruption(void 0);
    }
  }, [vtContext.isTransitioning, interruption]);
  let navigator2 = reactExports.useMemo(() => {
    return {
      createHref: router2.createHref,
      encodeLocation: router2.encodeLocation,
      go: (n2) => router2.navigate(n2),
      push: (to, state2, opts) => router2.navigate(to, {
        state: state2,
        preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
      }),
      replace: (to, state2, opts) => router2.navigate(to, {
        replace: true,
        state: state2,
        preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
      })
    };
  }, [router2]);
  let basename = router2.basename || "/";
  let dataRouterContext = reactExports.useMemo(
    () => ({
      router: router2,
      navigator: navigator2,
      static: false,
      basename,
      unstable_onError
    }),
    [router2, navigator2, basename, unstable_onError]
  );
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(DataRouterContext.Provider, { value: dataRouterContext }, /* @__PURE__ */ reactExports.createElement(DataRouterStateContext.Provider, { value: state }, /* @__PURE__ */ reactExports.createElement(FetchersContext.Provider, { value: fetcherData.current }, /* @__PURE__ */ reactExports.createElement(ViewTransitionContext.Provider, { value: vtContext }, /* @__PURE__ */ reactExports.createElement(
    Router,
    {
      basename,
      location: state.location,
      navigationType: state.historyAction,
      navigator: navigator2
    },
    /* @__PURE__ */ reactExports.createElement(
      MemoizedDataRoutes,
      {
        routes: router2.routes,
        future: router2.future,
        state,
        unstable_onError
      }
    )
  ))))), null);
}
var MemoizedDataRoutes = reactExports.memo(DataRoutes);
function DataRoutes({
  routes,
  future,
  state,
  unstable_onError
}) {
  return useRoutesImpl(routes, void 0, state, unstable_onError, future);
}
function Outlet(props) {
  return useOutlet(props.context);
}
function Router({
  basename: basenameProp = "/",
  children = null,
  location: locationProp,
  navigationType = "POP",
  navigator: navigator2,
  static: staticProp = false
}) {
  invariant(
    !useInRouterContext(),
    `You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`
  );
  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = reactExports.useMemo(
    () => ({
      basename,
      navigator: navigator2,
      static: staticProp,
      future: {}
    }),
    [basename, navigator2, staticProp]
  );
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp;
  let locationContext = reactExports.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key
      },
      navigationType
    };
  }, [basename, pathname, search, hash, state, key, navigationType]);
  warning(
    locationContext != null,
    `<Router basename="${basename}"> is not able to match the URL "${pathname}${search}${hash}" because it does not start with the basename, so the <Router> won't render anything.`
  );
  if (locationContext == null) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(NavigationContext.Provider, { value: navigationContext }, /* @__PURE__ */ reactExports.createElement(LocationContext.Provider, { children, value: locationContext }));
}
var defaultMethod = "get";
var defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
  return object != null && typeof object.tagName === "string";
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && // Ignore everything but left clicks
  (!target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event);
}
var _formDataSupportsSubmitter = null;
function isFormDataSubmitterSupported() {
  if (_formDataSupportsSubmitter === null) {
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      );
      _formDataSupportsSubmitter = false;
    } catch (e) {
      _formDataSupportsSubmitter = true;
    }
  }
  return _formDataSupportsSubmitter;
}
var supportedFormEncTypes = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function getFormEncType(encType) {
  if (encType != null && !supportedFormEncTypes.has(encType)) {
    warning(
      false,
      `"${encType}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${defaultEncType}"`
    );
    return null;
  }
  return encType;
}
function getFormSubmissionInfo(target, basename) {
  let method;
  let action;
  let encType;
  let formData;
  let body;
  if (isFormElement(target)) {
    let attr = target.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(target);
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;
    if (form == null) {
      throw new Error(
        `Cannot submit a <button> or <input type="submit"> without a <form>`
      );
    }
    let attr = target.getAttribute("formaction") || form.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(form, target);
    if (!isFormDataSubmitterSupported()) {
      let { name, type, value } = target;
      if (type === "image") {
        let prefix = name ? `${name}.` : "";
        formData.append(`${prefix}x`, "0");
        formData.append(`${prefix}y`, "0");
      } else if (name) {
        formData.append(name, value);
      }
    }
  } else if (isHtmlElement(target)) {
    throw new Error(
      `Cannot submit element that is not <form>, <button>, or <input type="submit|image">`
    );
  } else {
    method = defaultMethod;
    action = null;
    encType = defaultEncType;
    body = target;
  }
  if (formData && encType === "text/plain") {
    body = formData;
    formData = void 0;
  }
  return { action, method: method.toLowerCase(), encType, formData, body };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function invariant2(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function singleFetchUrl(reqUrl, basename, extension) {
  let url = typeof reqUrl === "string" ? new URL(
    reqUrl,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window === "undefined" ? "server://singlefetch/" : window.location.origin
  ) : reqUrl;
  if (url.pathname === "/") {
    url.pathname = `_root.${extension}`;
  } else if (basename && stripBasename(url.pathname, basename) === "/") {
    url.pathname = `${basename.replace(/\/$/, "")}/_root.${extension}`;
  } else {
    url.pathname = `${url.pathname.replace(/\/$/, "")}.${extension}`;
  }
  return url;
}
async function loadRouteModule(route, routeModulesCache) {
  if (route.id in routeModulesCache) {
    return routeModulesCache[route.id];
  }
  try {
    let routeModule = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      route.module
    );
    routeModulesCache[route.id] = routeModule;
    return routeModule;
  } catch (error) {
    console.error(
      `Error loading route module \`${route.module}\`, reloading page...`
    );
    console.error(error);
    if (window.__reactRouterContext && window.__reactRouterContext.isSpaMode && // @ts-expect-error
    void 0) ;
    window.location.reload();
    return new Promise(() => {
    });
  }
}
function isHtmlLinkDescriptor(object) {
  if (object == null) {
    return false;
  }
  if (object.href == null) {
    return object.rel === "preload" && typeof object.imageSrcSet === "string" && typeof object.imageSizes === "string";
  }
  return typeof object.rel === "string" && typeof object.href === "string";
}
async function getKeyedPrefetchLinks(matches, manifest, routeModules) {
  let links = await Promise.all(
    matches.map(async (match) => {
      let route = manifest.routes[match.route.id];
      if (route) {
        let mod = await loadRouteModule(route, routeModules);
        return mod.links ? mod.links() : [];
      }
      return [];
    })
  );
  return dedupeLinkDescriptors(
    links.flat(1).filter(isHtmlLinkDescriptor).filter((link) => link.rel === "stylesheet" || link.rel === "preload").map(
      (link) => link.rel === "stylesheet" ? { ...link, rel: "prefetch", as: "style" } : { ...link, rel: "prefetch" }
    )
  );
}
function getNewMatchesForLinks(page, nextMatches, currentMatches, manifest, location2, mode) {
  let isNew = (match, index) => {
    if (!currentMatches[index]) return true;
    return match.route.id !== currentMatches[index].route.id;
  };
  let matchPathChanged = (match, index) => {
    var _a;
    return (
      // param change, /users/123 -> /users/456
      currentMatches[index].pathname !== match.pathname || // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      ((_a = currentMatches[index].route.path) == null ? void 0 : _a.endsWith("*")) && currentMatches[index].params["*"] !== match.params["*"]
    );
  };
  if (mode === "assets") {
    return nextMatches.filter(
      (match, index) => isNew(match, index) || matchPathChanged(match, index)
    );
  }
  if (mode === "data") {
    return nextMatches.filter((match, index) => {
      var _a;
      let manifestRoute = manifest.routes[match.route.id];
      if (!manifestRoute || !manifestRoute.hasLoader) {
        return false;
      }
      if (isNew(match, index) || matchPathChanged(match, index)) {
        return true;
      }
      if (match.route.shouldRevalidate) {
        let routeChoice = match.route.shouldRevalidate({
          currentUrl: new URL(
            location2.pathname + location2.search + location2.hash,
            window.origin
          ),
          currentParams: ((_a = currentMatches[0]) == null ? void 0 : _a.params) || {},
          nextUrl: new URL(page, window.origin),
          nextParams: match.params,
          defaultShouldRevalidate: true
        });
        if (typeof routeChoice === "boolean") {
          return routeChoice;
        }
      }
      return true;
    });
  }
  return [];
}
function getModuleLinkHrefs(matches, manifest, { includeHydrateFallback } = {}) {
  return dedupeHrefs(
    matches.map((match) => {
      let route = manifest.routes[match.route.id];
      if (!route) return [];
      let hrefs = [route.module];
      if (route.clientActionModule) {
        hrefs = hrefs.concat(route.clientActionModule);
      }
      if (route.clientLoaderModule) {
        hrefs = hrefs.concat(route.clientLoaderModule);
      }
      if (includeHydrateFallback && route.hydrateFallbackModule) {
        hrefs = hrefs.concat(route.hydrateFallbackModule);
      }
      if (route.imports) {
        hrefs = hrefs.concat(route.imports);
      }
      return hrefs;
    }).flat(1)
  );
}
function dedupeHrefs(hrefs) {
  return [...new Set(hrefs)];
}
function sortKeys(obj) {
  let sorted = {};
  let keys = Object.keys(obj).sort();
  for (let key of keys) {
    sorted[key] = obj[key];
  }
  return sorted;
}
function dedupeLinkDescriptors(descriptors, preloads) {
  let set = /* @__PURE__ */ new Set();
  new Set(preloads);
  return descriptors.reduce((deduped, descriptor) => {
    let key = JSON.stringify(sortKeys(descriptor));
    if (!set.has(key)) {
      set.add(key);
      deduped.push({ key, link: descriptor });
    }
    return deduped;
  }, []);
}
function useDataRouterContext2() {
  let context = reactExports.useContext(DataRouterContext);
  invariant2(
    context,
    "You must render this element inside a <DataRouterContext.Provider> element"
  );
  return context;
}
function useDataRouterStateContext() {
  let context = reactExports.useContext(DataRouterStateContext);
  invariant2(
    context,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  );
  return context;
}
var FrameworkContext = reactExports.createContext(void 0);
FrameworkContext.displayName = "FrameworkContext";
function useFrameworkContext() {
  let context = reactExports.useContext(FrameworkContext);
  invariant2(
    context,
    "You must render this element inside a <HydratedRouter> element"
  );
  return context;
}
function usePrefetchBehavior(prefetch, theirElementProps) {
  let frameworkContext = reactExports.useContext(FrameworkContext);
  let [maybePrefetch, setMaybePrefetch] = reactExports.useState(false);
  let [shouldPrefetch, setShouldPrefetch] = reactExports.useState(false);
  let { onFocus, onBlur, onMouseEnter, onMouseLeave, onTouchStart } = theirElementProps;
  let ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (prefetch === "render") {
      setShouldPrefetch(true);
    }
    if (prefetch === "viewport") {
      let callback = (entries) => {
        entries.forEach((entry) => {
          setShouldPrefetch(entry.isIntersecting);
        });
      };
      let observer = new IntersectionObserver(callback, { threshold: 0.5 });
      if (ref.current) observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [prefetch]);
  reactExports.useEffect(() => {
    if (maybePrefetch) {
      let id2 = setTimeout(() => {
        setShouldPrefetch(true);
      }, 100);
      return () => {
        clearTimeout(id2);
      };
    }
  }, [maybePrefetch]);
  let setIntent = () => {
    setMaybePrefetch(true);
  };
  let cancelIntent = () => {
    setMaybePrefetch(false);
    setShouldPrefetch(false);
  };
  if (!frameworkContext) {
    return [false, ref, {}];
  }
  if (prefetch !== "intent") {
    return [shouldPrefetch, ref, {}];
  }
  return [
    shouldPrefetch,
    ref,
    {
      onFocus: composeEventHandlers(onFocus, setIntent),
      onBlur: composeEventHandlers(onBlur, cancelIntent),
      onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
      onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
      onTouchStart: composeEventHandlers(onTouchStart, setIntent)
    }
  ];
}
function composeEventHandlers(theirHandler, ourHandler) {
  return (event) => {
    theirHandler && theirHandler(event);
    if (!event.defaultPrevented) {
      ourHandler(event);
    }
  };
}
function PrefetchPageLinks({ page, ...linkProps }) {
  let { router: router2 } = useDataRouterContext2();
  let matches = reactExports.useMemo(
    () => matchRoutes(router2.routes, page, router2.basename),
    [router2.routes, page, router2.basename]
  );
  if (!matches) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(PrefetchPageLinksImpl, { page, matches, ...linkProps });
}
function useKeyedPrefetchLinks(matches) {
  let { manifest, routeModules } = useFrameworkContext();
  let [keyedPrefetchLinks, setKeyedPrefetchLinks] = reactExports.useState([]);
  reactExports.useEffect(() => {
    let interrupted = false;
    void getKeyedPrefetchLinks(matches, manifest, routeModules).then(
      (links) => {
        if (!interrupted) {
          setKeyedPrefetchLinks(links);
        }
      }
    );
    return () => {
      interrupted = true;
    };
  }, [matches, manifest, routeModules]);
  return keyedPrefetchLinks;
}
function PrefetchPageLinksImpl({
  page,
  matches: nextMatches,
  ...linkProps
}) {
  let location2 = useLocation();
  let { manifest, routeModules } = useFrameworkContext();
  let { basename } = useDataRouterContext2();
  let { loaderData, matches } = useDataRouterStateContext();
  let newMatchesForData = reactExports.useMemo(
    () => getNewMatchesForLinks(
      page,
      nextMatches,
      matches,
      manifest,
      location2,
      "data"
    ),
    [page, nextMatches, matches, manifest, location2]
  );
  let newMatchesForAssets = reactExports.useMemo(
    () => getNewMatchesForLinks(
      page,
      nextMatches,
      matches,
      manifest,
      location2,
      "assets"
    ),
    [page, nextMatches, matches, manifest, location2]
  );
  let dataHrefs = reactExports.useMemo(() => {
    if (page === location2.pathname + location2.search + location2.hash) {
      return [];
    }
    let routesParams = /* @__PURE__ */ new Set();
    let foundOptOutRoute = false;
    nextMatches.forEach((m2) => {
      var _a;
      let manifestRoute = manifest.routes[m2.route.id];
      if (!manifestRoute || !manifestRoute.hasLoader) {
        return;
      }
      if (!newMatchesForData.some((m22) => m22.route.id === m2.route.id) && m2.route.id in loaderData && ((_a = routeModules[m2.route.id]) == null ? void 0 : _a.shouldRevalidate)) {
        foundOptOutRoute = true;
      } else if (manifestRoute.hasClientLoader) {
        foundOptOutRoute = true;
      } else {
        routesParams.add(m2.route.id);
      }
    });
    if (routesParams.size === 0) {
      return [];
    }
    let url = singleFetchUrl(page, basename, "data");
    if (foundOptOutRoute && routesParams.size > 0) {
      url.searchParams.set(
        "_routes",
        nextMatches.filter((m2) => routesParams.has(m2.route.id)).map((m2) => m2.route.id).join(",")
      );
    }
    return [url.pathname + url.search];
  }, [
    basename,
    loaderData,
    location2,
    manifest,
    newMatchesForData,
    nextMatches,
    page,
    routeModules
  ]);
  let moduleHrefs = reactExports.useMemo(
    () => getModuleLinkHrefs(newMatchesForAssets, manifest),
    [newMatchesForAssets, manifest]
  );
  let keyedPrefetchLinks = useKeyedPrefetchLinks(newMatchesForAssets);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ reactExports.createElement("link", { key: href, rel: "prefetch", as: "fetch", href, ...linkProps })), moduleHrefs.map((href) => /* @__PURE__ */ reactExports.createElement("link", { key: href, rel: "modulepreload", href, ...linkProps })), keyedPrefetchLinks.map(({ key, link }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ reactExports.createElement("link", { key, nonce: linkProps.nonce, ...link })
  )));
}
function mergeRefs(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
try {
  if (isBrowser) {
    window.__reactRouterVersion = // @ts-expect-error
    "7.9.6";
  }
} catch (e) {
}
function createBrowserRouter(routes, opts) {
  return createRouter({
    basename: opts == null ? void 0 : opts.basename,
    getContext: opts == null ? void 0 : opts.getContext,
    future: opts == null ? void 0 : opts.future,
    history: createBrowserHistory({ window: opts == null ? void 0 : opts.window }),
    hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
    routes,
    mapRouteProperties,
    hydrationRouteProperties,
    dataStrategy: opts == null ? void 0 : opts.dataStrategy,
    patchRoutesOnNavigation: opts == null ? void 0 : opts.patchRoutesOnNavigation,
    window: opts == null ? void 0 : opts.window,
    unstable_instrumentations: opts == null ? void 0 : opts.unstable_instrumentations
  }).initialize();
}
function parseHydrationData() {
  let state = window == null ? void 0 : window.__staticRouterHydrationData;
  if (state && state.errors) {
    state = {
      ...state,
      errors: deserializeErrors(state.errors)
    };
  }
  return state;
}
function deserializeErrors(errors) {
  if (!errors) return null;
  let entries = Object.entries(errors);
  let serialized = {};
  for (let [key, val] of entries) {
    if (val && val.__type === "RouteErrorResponse") {
      serialized[key] = new ErrorResponseImpl(
        val.status,
        val.statusText,
        val.data,
        val.internal === true
      );
    } else if (val && val.__type === "Error") {
      if (val.__subType) {
        let ErrorConstructor = window[val.__subType];
        if (typeof ErrorConstructor === "function") {
          try {
            let error = new ErrorConstructor(val.message);
            error.stack = "";
            serialized[key] = error;
          } catch (e) {
          }
        }
      }
      if (serialized[key] == null) {
        let error = new Error(val.message);
        error.stack = "";
        serialized[key] = error;
      }
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}
var ABSOLUTE_URL_REGEX2 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var Link = reactExports.forwardRef(
  function LinkWithRef({
    onClick,
    discover = "render",
    prefetch = "none",
    relative,
    reloadDocument,
    replace: replace2,
    state,
    target,
    to,
    preventScrollReset,
    viewTransition,
    ...rest
  }, forwardedRef) {
    let { basename } = reactExports.useContext(NavigationContext);
    let isAbsolute = typeof to === "string" && ABSOLUTE_URL_REGEX2.test(to);
    let absoluteHref;
    let isExternal = false;
    if (typeof to === "string" && isAbsolute) {
      absoluteHref = to;
      if (isBrowser) {
        try {
          let currentUrl = new URL(window.location.href);
          let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
          let path = stripBasename(targetUrl.pathname, basename);
          if (targetUrl.origin === currentUrl.origin && path != null) {
            to = path + targetUrl.search + targetUrl.hash;
          } else {
            isExternal = true;
          }
        } catch (e) {
          warning(
            false,
            `<Link to="${to}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
          );
        }
      }
    }
    let href = useHref(to, { relative });
    let [shouldPrefetch, prefetchRef, prefetchHandlers] = usePrefetchBehavior(
      prefetch,
      rest
    );
    let internalOnClick = useLinkClickHandler(to, {
      replace: replace2,
      state,
      target,
      preventScrollReset,
      relative,
      viewTransition
    });
    function handleClick(event) {
      if (onClick) onClick(event);
      if (!event.defaultPrevented) {
        internalOnClick(event);
      }
    }
    let link = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ reactExports.createElement(
        "a",
        {
          ...rest,
          ...prefetchHandlers,
          href: absoluteHref || href,
          onClick: isExternal || reloadDocument ? onClick : handleClick,
          ref: mergeRefs(forwardedRef, prefetchRef),
          target,
          "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
        }
      )
    );
    return shouldPrefetch && !isAbsolute ? /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, link, /* @__PURE__ */ reactExports.createElement(PrefetchPageLinks, { page: href })) : link;
  }
);
Link.displayName = "Link";
var NavLink = reactExports.forwardRef(
  function NavLinkWithRef({
    "aria-current": ariaCurrentProp = "page",
    caseSensitive = false,
    className: classNameProp = "",
    end = false,
    style: styleProp,
    to,
    viewTransition,
    children,
    ...rest
  }, ref) {
    let path = useResolvedPath(to, { relative: rest.relative });
    let location2 = useLocation();
    let routerState = reactExports.useContext(DataRouterStateContext);
    let { navigator: navigator2, basename } = reactExports.useContext(NavigationContext);
    let isTransitioning = routerState != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useViewTransitionState(path) && viewTransition === true;
    let toPathname = navigator2.encodeLocation ? navigator2.encodeLocation(path).pathname : path.pathname;
    let locationPathname = location2.pathname;
    let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
    if (!caseSensitive) {
      locationPathname = locationPathname.toLowerCase();
      nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
      toPathname = toPathname.toLowerCase();
    }
    if (nextLocationPathname && basename) {
      nextLocationPathname = stripBasename(nextLocationPathname, basename) || nextLocationPathname;
    }
    const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
    let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
    let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
    let renderProps = {
      isActive,
      isPending,
      isTransitioning
    };
    let ariaCurrent = isActive ? ariaCurrentProp : void 0;
    let className;
    if (typeof classNameProp === "function") {
      className = classNameProp(renderProps);
    } else {
      className = [
        classNameProp,
        isActive ? "active" : null,
        isPending ? "pending" : null,
        isTransitioning ? "transitioning" : null
      ].filter(Boolean).join(" ");
    }
    let style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
    return /* @__PURE__ */ reactExports.createElement(
      Link,
      {
        ...rest,
        "aria-current": ariaCurrent,
        className,
        ref,
        style,
        to,
        viewTransition
      },
      typeof children === "function" ? children(renderProps) : children
    );
  }
);
NavLink.displayName = "NavLink";
var Form = reactExports.forwardRef(
  ({
    discover = "render",
    fetcherKey,
    navigate,
    reloadDocument,
    replace: replace2,
    state,
    method = defaultMethod,
    action,
    onSubmit,
    relative,
    preventScrollReset,
    viewTransition,
    ...props
  }, forwardedRef) => {
    let submit = useSubmit();
    let formAction = useFormAction(action, { relative });
    let formMethod = method.toLowerCase() === "get" ? "get" : "post";
    let isAbsolute = typeof action === "string" && ABSOLUTE_URL_REGEX2.test(action);
    let submitHandler = (event) => {
      onSubmit && onSubmit(event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      let submitter = event.nativeEvent.submitter;
      let submitMethod = (submitter == null ? void 0 : submitter.getAttribute("formmethod")) || method;
      submit(submitter || event.currentTarget, {
        fetcherKey,
        method: submitMethod,
        navigate,
        replace: replace2,
        state,
        relative,
        preventScrollReset,
        viewTransition
      });
    };
    return /* @__PURE__ */ reactExports.createElement(
      "form",
      {
        ref: forwardedRef,
        method: formMethod,
        action: formAction,
        onSubmit: reloadDocument ? onSubmit : submitHandler,
        ...props,
        "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
      }
    );
  }
);
Form.displayName = "Form";
function getDataRouterConsoleError2(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext3(hookName) {
  let ctx = reactExports.useContext(DataRouterContext);
  invariant(ctx, getDataRouterConsoleError2(hookName));
  return ctx;
}
function useLinkClickHandler(to, {
  target,
  replace: replaceProp,
  state,
  preventScrollReset,
  relative,
  viewTransition
} = {}) {
  let navigate = useNavigate();
  let location2 = useLocation();
  let path = useResolvedPath(to, { relative });
  return reactExports.useCallback(
    (event) => {
      if (shouldProcessLinkClick(event, target)) {
        event.preventDefault();
        let replace2 = replaceProp !== void 0 ? replaceProp : createPath(location2) === createPath(path);
        navigate(to, {
          replace: replace2,
          state,
          preventScrollReset,
          relative,
          viewTransition
        });
      }
    },
    [
      location2,
      navigate,
      path,
      replaceProp,
      state,
      target,
      to,
      preventScrollReset,
      relative,
      viewTransition
    ]
  );
}
var fetcherId = 0;
var getUniqueFetcherId = () => `__${String(++fetcherId)}__`;
function useSubmit() {
  let { router: router2 } = useDataRouterContext3(
    "useSubmit"
    /* UseSubmit */
  );
  let { basename } = reactExports.useContext(NavigationContext);
  let currentRouteId = useRouteId();
  return reactExports.useCallback(
    async (target, options = {}) => {
      let { action, method, encType, formData, body } = getFormSubmissionInfo(
        target,
        basename
      );
      if (options.navigate === false) {
        let key = options.fetcherKey || getUniqueFetcherId();
        await router2.fetch(key, currentRouteId, options.action || action, {
          preventScrollReset: options.preventScrollReset,
          formData,
          body,
          formMethod: options.method || method,
          formEncType: options.encType || encType,
          flushSync: options.flushSync
        });
      } else {
        await router2.navigate(options.action || action, {
          preventScrollReset: options.preventScrollReset,
          formData,
          body,
          formMethod: options.method || method,
          formEncType: options.encType || encType,
          replace: options.replace,
          state: options.state,
          fromRouteId: currentRouteId,
          flushSync: options.flushSync,
          viewTransition: options.viewTransition
        });
      }
    },
    [router2, basename, currentRouteId]
  );
}
function useFormAction(action, { relative } = {}) {
  let { basename } = reactExports.useContext(NavigationContext);
  let routeContext = reactExports.useContext(RouteContext);
  invariant(routeContext, "useFormAction must be used inside a RouteContext");
  let [match] = routeContext.matches.slice(-1);
  let path = { ...useResolvedPath(action ? action : ".", { relative }) };
  let location2 = useLocation();
  if (action == null) {
    path.search = location2.search;
    let params = new URLSearchParams(path.search);
    let indexValues = params.getAll("index");
    let hasNakedIndexParam = indexValues.some((v2) => v2 === "");
    if (hasNakedIndexParam) {
      params.delete("index");
      indexValues.filter((v2) => v2).forEach((v2) => params.append("index", v2));
      let qs = params.toString();
      path.search = qs ? `?${qs}` : "";
    }
  }
  if ((!action || action === ".") && match.route.index) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  }
  if (basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
  }
  return createPath(path);
}
function useViewTransitionState(to, { relative } = {}) {
  let vtContext = reactExports.useContext(ViewTransitionContext);
  invariant(
    vtContext != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename } = useDataRouterContext3(
    "useViewTransitionState"
    /* useViewTransitionState */
  );
  let path = useResolvedPath(to, { relative });
  if (!vtContext.isTransitioning) {
    return false;
  }
  let currentPath = stripBasename(vtContext.currentLocation.pathname, basename) || vtContext.currentLocation.pathname;
  let nextPath = stripBasename(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname;
  return matchPath(path.pathname, nextPath) != null || matchPath(path.pathname, currentPath) != null;
}
function RouterProvider2(props) {
  return /* @__PURE__ */ reactExports.createElement(RouterProvider, { flushSync: reactDomExports.flushSync, ...props });
}
function App() {
  const [menuOpen, setMenuOpen] = reactExports.useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "app-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "小孩學英文" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "menu-toggle", onClick: toggleMenu, "aria-label": "選單", children: menuOpen ? "✕" : "☰" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: `nav ${menuOpen ? "nav-open" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/learn", className: ({ isActive }) => isActive ? "active" : "", onClick: closeMenu, children: "字卡學習" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/quiz", className: ({ isActive }) => isActive ? "active" : "", onClick: closeMenu, children: "小測驗" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/admin", className: ({ isActive }) => isActive ? "active" : "", onClick: closeMenu, children: "管理" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "app-main", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "app-footer", children: "Made with ❤️ for kids by Lentice" })
  ] });
}
const words = [
  {
    "id": 1,
    "section_id": 1,
    "part_of_speech_id": 1,
    "word": "age",
    "meaning_cht": "年齡",
    "example_en": "I am six years old today.",
    "example_cht": "我今天六歲了。"
  },
  {
    "id": 2,
    "section_id": 1,
    "part_of_speech_id": 2,
    "word": "am",
    "meaning_cht": "是 (I專用)",
    "example_en": "I am a space kid flying to stars.",
    "example_cht": "我是太空小孩，飛向星星。"
  },
  {
    "id": 3,
    "section_id": 1,
    "part_of_speech_id": 2,
    "word": "are",
    "meaning_cht": "是 (You/We/They專用)",
    "example_en": "You are my best friend at school.",
    "example_cht": "你是我在學校最好的朋友。"
  },
  {
    "id": 4,
    "section_id": 1,
    "part_of_speech_id": 3,
    "word": "I",
    "meaning_cht": "我",
    "example_en": "I draw a happy sun with crayons.",
    "example_cht": "我用蠟筆畫一個笑笑的太陽。"
  },
  {
    "id": 5,
    "section_id": 1,
    "part_of_speech_id": 2,
    "word": "is",
    "meaning_cht": "是 (He/She/It專用)",
    "example_en": "The frog is green and jumps high.",
    "example_cht": "青蛙是綠色的，還會跳好高。"
  },
  {
    "id": 6,
    "section_id": 1,
    "part_of_speech_id": 2,
    "word": "is",
    "meaning_cht": "是 (單數)",
    "example_en": "My teddy bear is a brave superhero!",
    "example_cht": "我的泰迪熊是個勇敢的超級英雄!"
  },
  {
    "id": 7,
    "section_id": 1,
    "part_of_speech_id": 3,
    "word": "me",
    "meaning_cht": "我 (受格)",
    "example_en": "The puppy follows me to school.",
    "example_cht": "小狗跟著我一起到學校。"
  },
  {
    "id": 8,
    "section_id": 1,
    "part_of_speech_id": 3,
    "word": "mine",
    "meaning_cht": "我的東西",
    "example_en": "This rainbow unicorn with wings is all mine!",
    "example_cht": "這隻有翅膀的彩虹獨角獸是我的!"
  },
  {
    "id": 9,
    "section_id": 1,
    "part_of_speech_id": 4,
    "word": "my",
    "meaning_cht": "我的",
    "example_en": "My toy car goes vroom vroom fast.",
    "example_cht": "我的玩具車咻咻地跑好快。"
  },
  {
    "id": 10,
    "section_id": 1,
    "part_of_speech_id": 1,
    "word": "name",
    "meaning_cht": "名字",
    "example_en": "My name is on my red backpack.",
    "example_cht": "我的名字寫在我的紅色背包上。"
  },
  {
    "id": 11,
    "section_id": 1,
    "part_of_speech_id": 4,
    "word": "our",
    "meaning_cht": "我們的",
    "example_en": "Our kite dances high in the wind.",
    "example_cht": "我們的風箏在風裡跳舞，飛得好高。"
  },
  {
    "id": 12,
    "section_id": 1,
    "part_of_speech_id": 3,
    "word": "ours",
    "meaning_cht": "我們的東西",
    "example_en": "The magical tree house with a slide is all ours!",
    "example_cht": "這間有溜滑梯的魔法樹屋都是我們的!"
  },
  {
    "id": 13,
    "section_id": 1,
    "part_of_speech_id": 3,
    "word": "us",
    "meaning_cht": "我們 (受格)",
    "example_en": "The talking tree tells magical stories to us!",
    "example_cht": "會說話的樹講神奇的故事給我們聽!"
  },
  {
    "id": 14,
    "section_id": 1,
    "part_of_speech_id": 3,
    "word": "we",
    "meaning_cht": "我們",
    "example_en": "We build a rocket from a box.",
    "example_cht": "我們用紙箱做了一艘火箭。"
  },
  {
    "id": 15,
    "section_id": 1,
    "part_of_speech_id": 3,
    "word": "you",
    "meaning_cht": "你",
    "example_en": "You can catch falling stars and make a wish!",
    "example_cht": "你可以接住流星然後許願!"
  },
  {
    "id": 16,
    "section_id": 1,
    "part_of_speech_id": 3,
    "word": "your",
    "meaning_cht": "你的",
    "example_en": "What is your secret superpower today?",
    "example_cht": "你今天的秘密超能力是什麼？"
  },
  {
    "id": 17,
    "section_id": 1,
    "part_of_speech_id": 3,
    "word": "yours",
    "meaning_cht": "你的東西",
    "example_en": "Is this blue pencil yours that I found?",
    "example_cht": "我找到的這支藍色鉛筆是你的嗎？"
  },
  {
    "id": 18,
    "section_id": 1,
    "part_of_speech_id": 3,
    "word": "yourself",
    "meaning_cht": "你自己",
    "example_en": "You can do it all by yourself.",
    "example_cht": "你可以自己一個人完成喔。"
  },
  {
    "id": 19,
    "section_id": 2,
    "part_of_speech_id": 1,
    "word": "baby",
    "meaning_cht": "嬰兒",
    "example_en": "The baby claps when bubbles pop in the air.",
    "example_cht": "泡泡啵啵破掉時，寶寶會拍拍手。"
  },
  {
    "id": 20,
    "section_id": 2,
    "part_of_speech_id": 1,
    "word": "boy",
    "meaning_cht": "男孩",
    "example_en": "The boy kicks the ball very hard.",
    "example_cht": "那個男孩用力把球踢出去。"
  },
  {
    "id": 21,
    "section_id": 2,
    "part_of_speech_id": 1,
    "word": "brother",
    "meaning_cht": "兄弟",
    "example_en": "My brother makes a silly dancing robot.",
    "example_cht": "我的哥哥做了一個會跳舞的搞笑機器人。"
  },
  {
    "id": 22,
    "section_id": 2,
    "part_of_speech_id": 1,
    "word": "child",
    "meaning_cht": "小孩",
    "example_en": "Every child can learn through fun play.",
    "example_cht": "每個小孩都能在好玩的遊戲中學習。"
  },
  {
    "id": 23,
    "section_id": 2,
    "part_of_speech_id": 1,
    "word": "children",
    "meaning_cht": "孩子們",
    "example_en": "All the children play in the park.",
    "example_cht": "所有小朋友都在公園玩。"
  },
  {
    "id": 24,
    "section_id": 2,
    "part_of_speech_id": 1,
    "word": "family",
    "meaning_cht": "家庭",
    "example_en": "My family always loves me very much.",
    "example_cht": "我的家人一直都很愛我。"
  },
  {
    "id": 25,
    "section_id": 2,
    "part_of_speech_id": 1,
    "word": "father",
    "meaning_cht": "父親",
    "example_en": "My father tells funny bear stories at night.",
    "example_cht": "我的爸爸晚上會說有趣的熊熊故事。"
  },
  {
    "id": 26,
    "section_id": 2,
    "part_of_speech_id": 1,
    "word": "friend",
    "meaning_cht": "朋友",
    "example_en": "My friend shares cookies with me at lunch.",
    "example_cht": "我的朋友午餐時和我分享餅乾。"
  },
  {
    "id": 27,
    "section_id": 2,
    "part_of_speech_id": 1,
    "word": "girl",
    "meaning_cht": "女孩",
    "example_en": "The girl skips with a jump rope.",
    "example_cht": "那個女孩拿跳繩蹦蹦跳。"
  },
  {
    "id": 28,
    "section_id": 2,
    "part_of_speech_id": 1,
    "word": "man",
    "meaning_cht": "男人",
    "example_en": "The man sells sweet red apples today.",
    "example_cht": "那位先生今天賣甜甜的紅蘋果。"
  },
  {
    "id": 29,
    "section_id": 2,
    "part_of_speech_id": 1,
    "word": "men",
    "meaning_cht": "男人們",
    "example_en": "The men help build the new house.",
    "example_cht": "那些男士一起幫忙蓋新房子。"
  },
  {
    "id": 30,
    "section_id": 2,
    "part_of_speech_id": 1,
    "word": "mother",
    "meaning_cht": "母親",
    "example_en": "My mother sings soft moon songs for me.",
    "example_cht": "我的媽媽唱溫柔的月亮歌給我聽。"
  },
  {
    "id": 31,
    "section_id": 2,
    "part_of_speech_id": 1,
    "word": "neighbor",
    "meaning_cht": "鄰居",
    "example_en": "Our friendly neighbor waves hello every morning.",
    "example_cht": "我們友善的鄰居每天早上都跟我們揮手打招呼。"
  },
  {
    "id": 32,
    "section_id": 2,
    "part_of_speech_id": 1,
    "word": "people",
    "meaning_cht": "人們",
    "example_en": "People wave at the colorful parade today.",
    "example_cht": "今天大家向繽紛的遊行隊伍揮手。"
  },
  {
    "id": 33,
    "section_id": 2,
    "part_of_speech_id": 1,
    "word": "person",
    "meaning_cht": "人",
    "example_en": "Each person gets a turn to play.",
    "example_cht": "每個人都會輪到玩。"
  },
  {
    "id": 34,
    "section_id": 2,
    "part_of_speech_id": 1,
    "word": "sister",
    "meaning_cht": "姐妹",
    "example_en": "My sister paints pink dreams on paper.",
    "example_cht": "我的妹妹在紙上畫粉紅色的夢。"
  },
  {
    "id": 35,
    "section_id": 2,
    "part_of_speech_id": 1,
    "word": "woman",
    "meaning_cht": "女人",
    "example_en": "The woman is watering the pretty flowers.",
    "example_cht": "那位女士正在幫漂亮的花澆水。"
  },
  {
    "id": 36,
    "section_id": 2,
    "part_of_speech_id": 1,
    "word": "women",
    "meaning_cht": "女人們",
    "example_en": "The women talk and laugh together happily.",
    "example_cht": "那些女士一起聊天，笑得好開心。"
  },
  {
    "id": 37,
    "section_id": 2,
    "part_of_speech_id": 1,
    "word": "mom",
    "meaning_cht": "媽媽",
    "example_en": "My mom hugs me like warm sunshine.",
    "example_cht": "我的媽媽抱起我像暖暖的陽光。"
  },
  {
    "id": 38,
    "section_id": 2,
    "part_of_speech_id": 1,
    "word": "dad",
    "meaning_cht": "爸爸",
    "example_en": "My dad lifts me high like the sky.",
    "example_cht": "我的爸爸把我舉得好高好高。"
  },
  {
    "id": 39,
    "section_id": 2,
    "part_of_speech_id": 1,
    "word": "parents",
    "meaning_cht": "父母",
    "example_en": "My parents cheer when I try my best.",
    "example_cht": "當我努力認真時，爸爸媽媽會替我加油。"
  },
  {
    "id": 40,
    "section_id": 2,
    "part_of_speech_id": 1,
    "word": "grandma",
    "meaning_cht": "奶奶/外婆",
    "example_en": "Grandma tells moonlight stories before bed.",
    "example_cht": "睡覺前，奶奶會說月光下的故事。"
  },
  {
    "id": 41,
    "section_id": 2,
    "part_of_speech_id": 1,
    "word": "grandpa",
    "meaning_cht": "爺爺/外公",
    "example_en": "Grandpa grows tomatoes in the sunny yard.",
    "example_cht": "爺爺在有陽光的院子裡種番茄。"
  },
  {
    "id": 42,
    "section_id": 2,
    "part_of_speech_id": 1,
    "word": "grandmother",
    "meaning_cht": "祖母/外婆",
    "example_en": "My grandmother knits a soft blue scarf.",
    "example_cht": "我的外婆織一條柔軟的藍色圍巾。"
  },
  {
    "id": 43,
    "section_id": 2,
    "part_of_speech_id": 1,
    "word": "grandfather",
    "meaning_cht": "祖父/外公",
    "example_en": "My grandfather plays a sweet song for me.",
    "example_cht": "我的外公為我彈一首好聽的歌。"
  },
  {
    "id": 44,
    "section_id": 2,
    "part_of_speech_id": 1,
    "word": "aunt",
    "meaning_cht": "阿姨/姑姑",
    "example_en": "My aunt makes funny animal voices for me.",
    "example_cht": "我的阿姨會學動物的有趣聲音逗我笑。"
  },
  {
    "id": 45,
    "section_id": 2,
    "part_of_speech_id": 1,
    "word": "uncle",
    "meaning_cht": "叔叔/舅舅",
    "example_en": "My uncle builds a cardboard rocket with me.",
    "example_cht": "我的叔叔和我一起做紙箱火箭。"
  },
  {
    "id": 46,
    "section_id": 2,
    "part_of_speech_id": 1,
    "word": "cousin",
    "meaning_cht": "表兄弟姊妹/堂兄弟姊妹",
    "example_en": "My cousin and I race leaves in rain.",
    "example_cht": "我和表哥表姊在雨中比賽葉子誰跑得快。"
  },
  {
    "id": 47,
    "section_id": 3,
    "part_of_speech_id": 1,
    "word": "arm",
    "meaning_cht": "手臂",
    "example_en": "My arms stretch wide enough to hug the world.",
    "example_cht": "我的雙手張開，好像可以抱住全世界。"
  },
  {
    "id": 48,
    "section_id": 3,
    "part_of_speech_id": 1,
    "word": "back",
    "meaning_cht": "背部",
    "example_en": "My back is strong enough to carry things.",
    "example_cht": "我的背很有力，可以扛東西。"
  },
  {
    "id": 49,
    "section_id": 3,
    "part_of_speech_id": 1,
    "word": "belly",
    "meaning_cht": "腹部/肚子",
    "example_en": "My belly button is my very first mark.",
    "example_cht": "我的肚臍是我出生後第一個小記號。"
  },
  {
    "id": 50,
    "section_id": 3,
    "part_of_speech_id": 1,
    "word": "blood",
    "meaning_cht": "血液",
    "example_en": "My blood carries oxygen like tiny trucks working fast.",
    "example_cht": "我的血液像小卡車，快速載著氧氣跑來跑去。"
  },
  {
    "id": 51,
    "section_id": 3,
    "part_of_speech_id": 1,
    "word": "body",
    "meaning_cht": "身體",
    "example_en": "My body is a machine that runs on food.",
    "example_cht": "我的身體像一部吃食物就會動的機器。"
  },
  {
    "id": 52,
    "section_id": 3,
    "part_of_speech_id": 1,
    "word": "bone",
    "meaning_cht": "骨頭",
    "example_en": "Bones are the frame that holds up my body.",
    "example_cht": "骨頭是把我身體撐起來的骨架。"
  },
  {
    "id": 53,
    "section_id": 3,
    "part_of_speech_id": 1,
    "word": "ear",
    "meaning_cht": "耳朵",
    "example_en": "My ear hears a soft bird song.",
    "example_cht": "我的耳朵聽到輕輕的鳥叫聲。"
  },
  {
    "id": 54,
    "section_id": 3,
    "part_of_speech_id": 1,
    "word": "elbow",
    "meaning_cht": "手肘",
    "example_en": "I bump my elbow on the table edge.",
    "example_cht": "我的手肘撞到桌子的邊邊。"
  },
  {
    "id": 55,
    "section_id": 3,
    "part_of_speech_id": 1,
    "word": "eye",
    "meaning_cht": "眼睛",
    "example_en": "My eye spots a tiny crawling ant.",
    "example_cht": "我的眼睛看到一隻小小在爬的螞蟻。"
  },
  {
    "id": 56,
    "section_id": 3,
    "part_of_speech_id": 1,
    "word": "face",
    "meaning_cht": "臉",
    "example_en": "Every face tells a special story without words.",
    "example_cht": "每張臉都在說一個特別的故事。"
  },
  {
    "id": 57,
    "section_id": 3,
    "part_of_speech_id": 1,
    "word": "feet",
    "meaning_cht": "腳 (複數)",
    "example_en": "My feet run fast on the grass.",
    "example_cht": "我的雙腳在草地上跑得好快。"
  },
  {
    "id": 58,
    "section_id": 3,
    "part_of_speech_id": 1,
    "word": "finger",
    "meaning_cht": "手指",
    "example_en": "Ten fingers - ten chances to point toward dreams.",
    "example_cht": "十根手指，有十次指向夢想的機會。"
  },
  {
    "id": 59,
    "section_id": 3,
    "part_of_speech_id": 1,
    "word": "foot",
    "meaning_cht": "腳",
    "example_en": "I tap my foot to the fun music.",
    "example_cht": "我跟著好聽的音樂用腳打節奏。"
  },
  {
    "id": 60,
    "section_id": 3,
    "part_of_speech_id": 1,
    "word": "hair",
    "meaning_cht": "頭髮",
    "example_en": "My hair has a mind of its own dancing.",
    "example_cht": "我的頭髮自己在跳舞一樣。"
  },
  {
    "id": 61,
    "section_id": 3,
    "part_of_speech_id": 1,
    "word": "hand",
    "meaning_cht": "手",
    "example_en": "My hand holds yours very tight today.",
    "example_cht": "今天我的手緊緊牽著你的手。"
  },
  {
    "id": 62,
    "section_id": 3,
    "part_of_speech_id": 2,
    "word": "hand",
    "meaning_cht": "給予/遞給",
    "example_en": "Please hand me that star I need.",
    "example_cht": "請把我需要的那顆星星遞給我。"
  },
  {
    "id": 63,
    "section_id": 3,
    "part_of_speech_id": 1,
    "word": "head",
    "meaning_cht": "頭",
    "example_en": "I nod my head to say yes happily.",
    "example_cht": "我開心地點頭說好。"
  },
  {
    "id": 64,
    "section_id": 3,
    "part_of_speech_id": 1,
    "word": "heart",
    "meaning_cht": "心臟/心",
    "example_en": "My heart beats fast when I run.",
    "example_cht": "我跑步的時候心臟跳得好快。"
  },
  {
    "id": 65,
    "section_id": 3,
    "part_of_speech_id": 1,
    "word": "knee",
    "meaning_cht": "膝蓋",
    "example_en": "I scrape my knee when I fall.",
    "example_cht": "我跌倒的時候擦傷了膝蓋。"
  },
  {
    "id": 66,
    "section_id": 3,
    "part_of_speech_id": 1,
    "word": "leg",
    "meaning_cht": "腿",
    "example_en": "These legs have carried me on many trips.",
    "example_cht": "這雙腿帶我去過好多地方。"
  },
  {
    "id": 67,
    "section_id": 3,
    "part_of_speech_id": 1,
    "word": "mouth",
    "meaning_cht": "嘴巴",
    "example_en": "My mouth blows big soapy bubbles.",
    "example_cht": "我的嘴巴吹出大大的泡泡。"
  },
  {
    "id": 68,
    "section_id": 3,
    "part_of_speech_id": 1,
    "word": "neck",
    "meaning_cht": "脖子",
    "example_en": "I wear a scarf around my neck.",
    "example_cht": "我的脖子圍著一條圍巾。"
  },
  {
    "id": 69,
    "section_id": 3,
    "part_of_speech_id": 1,
    "word": "nose",
    "meaning_cht": "鼻子",
    "example_en": "My nose smells fresh baking bread.",
    "example_cht": "我的鼻子聞到新鮮出爐的麵包香。"
  },
  {
    "id": 70,
    "section_id": 3,
    "part_of_speech_id": 1,
    "word": "shoulder",
    "meaning_cht": "肩膀",
    "example_en": "Dad lifts me on his strong shoulders high.",
    "example_cht": "爸爸把我扛在他結實的肩膀上好高好高。"
  },
  {
    "id": 71,
    "section_id": 3,
    "part_of_speech_id": 1,
    "word": "skin",
    "meaning_cht": "皮膚",
    "example_en": "Skin is my body's cover protecting everything inside.",
    "example_cht": "皮膚是身體的外套，保護裡面的一切。"
  },
  {
    "id": 72,
    "section_id": 3,
    "part_of_speech_id": 1,
    "word": "toe",
    "meaning_cht": "腳趾",
    "example_en": "My toes help me balance like tiny friends.",
    "example_cht": "我的腳趾像小幫手，幫我保持平衡。"
  },
  {
    "id": 73,
    "section_id": 3,
    "part_of_speech_id": 1,
    "word": "tooth",
    "meaning_cht": "牙齒",
    "example_en": "The tooth fairy magically trades teeth for coins.",
    "example_cht": "牙仙子會用魔法把牙齒換成硬幣。"
  },
  {
    "id": 74,
    "section_id": 4,
    "part_of_speech_id": 5,
    "word": "black",
    "meaning_cht": "黑色的",
    "example_en": "The night is black and so quiet.",
    "example_cht": "夜晚黑黑的，也很安靜。"
  },
  {
    "id": 75,
    "section_id": 4,
    "part_of_speech_id": 5,
    "word": "blue",
    "meaning_cht": "藍色的",
    "example_en": "The blue sky smiles down at me.",
    "example_cht": "藍藍的天空對我微笑。"
  },
  {
    "id": 76,
    "section_id": 4,
    "part_of_speech_id": 5,
    "word": "brown",
    "meaning_cht": "棕色的",
    "example_en": "The bear has brown thick fur on.",
    "example_cht": "熊的身上穿著厚厚的棕色毛。"
  },
  {
    "id": 77,
    "section_id": 4,
    "part_of_speech_id": 1,
    "word": "color",
    "meaning_cht": "顏色",
    "example_en": "What color is your backpack today?",
    "example_cht": "你今天的背包是什麼顏色？"
  },
  {
    "id": 78,
    "section_id": 4,
    "part_of_speech_id": 2,
    "word": "color",
    "meaning_cht": "塗色",
    "example_en": "Who says the sky must always be blue?",
    "example_cht": "誰說天空一定要是藍色的呢？"
  },
  {
    "id": 79,
    "section_id": 4,
    "part_of_speech_id": 2,
    "word": "count",
    "meaning_cht": "數數",
    "example_en": "Let's count the shells we found together.",
    "example_cht": "我們一起數一數找到的貝殼吧。"
  },
  {
    "id": 80,
    "section_id": 4,
    "part_of_speech_id": 12,
    "word": "eight",
    "meaning_cht": "八",
    "example_en": "Eight crayons color my picture today.",
    "example_cht": "今天我用八支蠟筆把畫塗上顏色。"
  },
  {
    "id": 81,
    "section_id": 4,
    "part_of_speech_id": 12,
    "word": "five",
    "meaning_cht": "五",
    "example_en": "Five little ducks swim by me now.",
    "example_cht": "現在有五隻小鴨游過我身邊。"
  },
  {
    "id": 82,
    "section_id": 4,
    "part_of_speech_id": 12,
    "word": "four",
    "meaning_cht": "四",
    "example_en": "Four cars race on the soft rug.",
    "example_cht": "四台小汽車在軟軟的地毯上賽跑。"
  },
  {
    "id": 83,
    "section_id": 4,
    "part_of_speech_id": 5,
    "word": "gold",
    "meaning_cht": "金色的",
    "example_en": "The crown is gold and very shiny.",
    "example_cht": "皇冠是金色的，亮晶晶的。"
  },
  {
    "id": 84,
    "section_id": 4,
    "part_of_speech_id": 5,
    "word": "green",
    "meaning_cht": "綠色的",
    "example_en": "A green turtle naps on the rock.",
    "example_cht": "一隻綠色的烏龜在石頭上打盹。"
  },
  {
    "id": 85,
    "section_id": 4,
    "part_of_speech_id": 5,
    "word": "grey",
    "meaning_cht": "灰色的",
    "example_en": "The wolf has grey soft fur outside.",
    "example_cht": "那隻狼身上有灰灰軟軟的毛。"
  },
  {
    "id": 86,
    "section_id": 4,
    "part_of_speech_id": 1,
    "word": "hundred",
    "meaning_cht": "一百",
    "example_en": "There are one hundred pennies in a dollar.",
    "example_cht": "一塊錢裡有一百個一分硬幣。"
  },
  {
    "id": 87,
    "section_id": 4,
    "part_of_speech_id": 1,
    "word": "million",
    "meaning_cht": "一百萬",
    "example_en": "A million stars shine in the night sky.",
    "example_cht": "夜空裡有上百萬顆星星在發光。"
  },
  {
    "id": 88,
    "section_id": 4,
    "part_of_speech_id": 12,
    "word": "nine",
    "meaning_cht": "九",
    "example_en": "Nine bees buzz around the hive loudly.",
    "example_cht": "九隻蜜蜂在蜂巢旁嗡嗡叫。"
  },
  {
    "id": 89,
    "section_id": 4,
    "part_of_speech_id": 1,
    "word": "number",
    "meaning_cht": "數字",
    "example_en": "My door has a big number three.",
    "example_cht": "我的房門上有一個大大的數字三。"
  },
  {
    "id": 90,
    "section_id": 4,
    "part_of_speech_id": 12,
    "word": "one",
    "meaning_cht": "一",
    "example_en": "One red ball rolls to me now.",
    "example_cht": "有一顆紅色的球現在滾到我這裡。"
  },
  {
    "id": 91,
    "section_id": 4,
    "part_of_speech_id": 5,
    "word": "orange",
    "meaning_cht": "橘色的",
    "example_en": "An orange fish is swimming by me.",
    "example_cht": "現在有一條橘色的魚游過我旁邊。"
  },
  {
    "id": 92,
    "section_id": 4,
    "part_of_speech_id": 5,
    "word": "pink",
    "meaning_cht": "粉紅色的",
    "example_en": "She wears pink socks to school today.",
    "example_cht": "她今天穿著粉紅色的襪子上學。"
  },
  {
    "id": 93,
    "section_id": 4,
    "part_of_speech_id": 5,
    "word": "purple",
    "meaning_cht": "紫色的",
    "example_en": "I see a purple flower in grass.",
    "example_cht": "我在草地裡看到一朵紫色的花。"
  },
  {
    "id": 94,
    "section_id": 4,
    "part_of_speech_id": 5,
    "word": "red",
    "meaning_cht": "紅色的",
    "example_en": "I wear a red cape to play hero.",
    "example_cht": "我披著紅色披風扮英雄。"
  },
  {
    "id": 95,
    "section_id": 4,
    "part_of_speech_id": 12,
    "word": "seven",
    "meaning_cht": "七",
    "example_en": "Seven stars twinkle over our town.",
    "example_cht": "七顆星星在我們小鎮上方一閃一閃。"
  },
  {
    "id": 96,
    "section_id": 4,
    "part_of_speech_id": 5,
    "word": "silver",
    "meaning_cht": "銀色的",
    "example_en": "The coin is silver and so round.",
    "example_cht": "這枚硬幣是銀色的，圓滾滾。"
  },
  {
    "id": 97,
    "section_id": 4,
    "part_of_speech_id": 12,
    "word": "six",
    "meaning_cht": "六",
    "example_en": "Six eggs rest in the bird nest.",
    "example_cht": "鳥巢裡躺著六顆蛋。"
  },
  {
    "id": 98,
    "section_id": 4,
    "part_of_speech_id": 12,
    "word": "ten",
    "meaning_cht": "十",
    "example_en": "Ten candles glow on my birthday cake.",
    "example_cht": "我的生日蛋糕上有十根亮亮的蠟燭。"
  },
  {
    "id": 99,
    "section_id": 4,
    "part_of_speech_id": 1,
    "word": "thousand",
    "meaning_cht": "一千",
    "example_en": "One thousand is a very big number.",
    "example_cht": "一千是一個很大的數字。"
  },
  {
    "id": 100,
    "section_id": 4,
    "part_of_speech_id": 12,
    "word": "three",
    "meaning_cht": "三",
    "example_en": "Three frogs sit on a brown log.",
    "example_cht": "三隻青蛙坐在棕色的木頭上。"
  },
  {
    "id": 101,
    "section_id": 4,
    "part_of_speech_id": 12,
    "word": "twelve",
    "meaning_cht": "十二",
    "example_en": "There are twelve months in one year.",
    "example_cht": "一年有十二個月。"
  },
  {
    "id": 102,
    "section_id": 4,
    "part_of_speech_id": 12,
    "word": "twenty",
    "meaning_cht": "二十",
    "example_en": "I can count to twenty with my fingers.",
    "example_cht": "我用手指可以數到二十。"
  },
  {
    "id": 103,
    "section_id": 4,
    "part_of_speech_id": 12,
    "word": "two",
    "meaning_cht": "二",
    "example_en": "Two birds sing on the white fence.",
    "example_cht": "兩隻小鳥在白色的柵欄上唱歌。"
  },
  {
    "id": 104,
    "section_id": 4,
    "part_of_speech_id": 5,
    "word": "white",
    "meaning_cht": "白色的",
    "example_en": "The snow is white and very soft.",
    "example_cht": "雪白白的、軟綿綿的。"
  },
  {
    "id": 105,
    "section_id": 4,
    "part_of_speech_id": 5,
    "word": "yellow",
    "meaning_cht": "黃色的",
    "example_en": "A yellow duck swims in the pond.",
    "example_cht": "一隻黃色的小鴨在池塘裡游泳。"
  },
  {
    "id": 106,
    "section_id": 4,
    "part_of_speech_id": 12,
    "word": "zero",
    "meaning_cht": "零",
    "example_en": "Zero means nothing at all.",
    "example_cht": "零代表什麼都沒有。"
  },
  {
    "id": 107,
    "section_id": 5,
    "part_of_speech_id": 5,
    "word": "big",
    "meaning_cht": "大的",
    "example_en": "The big bear gives gentle warm hugs.",
    "example_cht": "大熊給人溫柔又溫暖的擁抱。"
  },
  {
    "id": 108,
    "section_id": 5,
    "part_of_speech_id": 1,
    "word": "circle",
    "meaning_cht": "圓形",
    "example_en": "I trace a circle with a cup.",
    "example_cht": "我用杯子描出一個圓。"
  },
  {
    "id": 109,
    "section_id": 5,
    "part_of_speech_id": 5,
    "word": "deep",
    "meaning_cht": "深的",
    "example_en": "The pool is deep so be careful.",
    "example_cht": "游泳池很深，要小心。"
  },
  {
    "id": 110,
    "section_id": 5,
    "part_of_speech_id": 1,
    "word": "dot",
    "meaning_cht": "點",
    "example_en": "Put one dot on the white paper.",
    "example_cht": "在白紙上點一個小點。"
  },
  {
    "id": 111,
    "section_id": 5,
    "part_of_speech_id": 5,
    "word": "fat",
    "meaning_cht": "胖的",
    "example_en": "The fat pumpkin sits on the step.",
    "example_cht": "圓滾滾的南瓜坐在台階上。"
  },
  {
    "id": 112,
    "section_id": 5,
    "part_of_speech_id": 5,
    "word": "high",
    "meaning_cht": "高的",
    "example_en": "The kite flies high in the sky.",
    "example_cht": "風箏飛在高高的天空。"
  },
  {
    "id": 113,
    "section_id": 5,
    "part_of_speech_id": 1,
    "word": "line",
    "meaning_cht": "線",
    "example_en": "Draw a line from dot to dot.",
    "example_cht": "把點和點用直線連起來。"
  },
  {
    "id": 114,
    "section_id": 5,
    "part_of_speech_id": 4,
    "word": "little",
    "meaning_cht": "少許/小的",
    "example_en": "Just a little bit of magic helps.",
    "example_cht": "一點點魔法就很有幫助。"
  },
  {
    "id": 115,
    "section_id": 5,
    "part_of_speech_id": 5,
    "word": "long",
    "meaning_cht": "長的",
    "example_en": "The dragon has a long curly tail.",
    "example_cht": "那條龍有一條長長卷卷的尾巴。"
  },
  {
    "id": 116,
    "section_id": 5,
    "part_of_speech_id": 5,
    "word": "low",
    "meaning_cht": "低的",
    "example_en": "The snake stays low in cool grass.",
    "example_cht": "蛇趴在涼涼的草裡很低很低。"
  },
  {
    "id": 117,
    "section_id": 5,
    "part_of_speech_id": 5,
    "word": "narrow",
    "meaning_cht": "窄的",
    "example_en": "The narrow bridge tests our balance and courage.",
    "example_cht": "狹窄的橋考驗我們的平衡和勇氣。"
  },
  {
    "id": 118,
    "section_id": 5,
    "part_of_speech_id": 1,
    "word": "shape",
    "meaning_cht": "形狀",
    "example_en": "I draw a heart shape for you.",
    "example_cht": "我畫一個愛心形狀送給你。"
  },
  {
    "id": 119,
    "section_id": 5,
    "part_of_speech_id": 5,
    "word": "short",
    "meaning_cht": "短的",
    "example_en": "The puppy has a short wagging tail.",
    "example_cht": "小狗有一條短短會搖的尾巴。"
  },
  {
    "id": 120,
    "section_id": 5,
    "part_of_speech_id": 1,
    "word": "size",
    "meaning_cht": "尺寸/大小",
    "example_en": "What size shoes do you wear now?",
    "example_cht": "你現在穿幾號的鞋子？"
  },
  {
    "id": 121,
    "section_id": 5,
    "part_of_speech_id": 5,
    "word": "small",
    "meaning_cht": "小的",
    "example_en": "A small ant carries a big leaf.",
    "example_cht": "一隻小螞蟻扛著一片大葉子。"
  },
  {
    "id": 122,
    "section_id": 5,
    "part_of_speech_id": 1,
    "word": "square",
    "meaning_cht": "正方形",
    "example_en": "I draw a square for a window.",
    "example_cht": "我畫一個方形當窗戶。"
  },
  {
    "id": 123,
    "section_id": 5,
    "part_of_speech_id": 5,
    "word": "tall",
    "meaning_cht": "高的",
    "example_en": "The giraffe is so tall that it can touch the clouds!",
    "example_cht": "長頸鹿好高,高到可以摸到雲!"
  },
  {
    "id": 124,
    "section_id": 5,
    "part_of_speech_id": 5,
    "word": "thick",
    "meaning_cht": "厚的",
    "example_en": "Thick fur keeps polar bears warm in frozen winters.",
    "example_cht": "厚厚的毛讓北極熊在冰天雪地裡也很暖。"
  },
  {
    "id": 125,
    "section_id": 5,
    "part_of_speech_id": 5,
    "word": "thin",
    "meaning_cht": "瘦的",
    "example_en": "The thin stick bends easily in wind.",
    "example_cht": "細細的枝條在風裡很容易彎。"
  },
  {
    "id": 126,
    "section_id": 5,
    "part_of_speech_id": 5,
    "word": "thin",
    "meaning_cht": "薄的",
    "example_en": "Thin paper lets light shine through like windows glowing.",
    "example_cht": "薄薄的紙會透光，像小窗戶亮亮的。"
  },
  {
    "id": 127,
    "section_id": 5,
    "part_of_speech_id": 1,
    "word": "triangle",
    "meaning_cht": "三角形",
    "example_en": "The kite is a bright red triangle.",
    "example_cht": "這個風箏是亮紅色的三角形。"
  },
  {
    "id": 128,
    "section_id": 5,
    "part_of_speech_id": 1,
    "word": "rectangle",
    "meaning_cht": "長方形",
    "example_en": "The door is a tall rectangle at home.",
    "example_cht": "我家的門是高高的長方形。"
  },
  {
    "id": 129,
    "section_id": 5,
    "part_of_speech_id": 1,
    "word": "oval",
    "meaning_cht": "橢圓形",
    "example_en": "The egg is an oval on my plate.",
    "example_cht": "我盤子裡的蛋是橢圓形。"
  },
  {
    "id": 130,
    "section_id": 5,
    "part_of_speech_id": 1,
    "word": "diamond",
    "meaning_cht": "菱形",
    "example_en": "My kite is a red diamond in the sky.",
    "example_cht": "我的風箏在天空中是紅色的菱形。"
  },
  {
    "id": 131,
    "section_id": 5,
    "part_of_speech_id": 5,
    "word": "wide",
    "meaning_cht": "寬的",
    "example_en": "The river is wide and bright blue.",
    "example_cht": "這條河又寬又藍。"
  },
  {
    "id": 132,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "animal",
    "meaning_cht": "動物",
    "example_en": "My favorite animal is the fluffy panda.",
    "example_cht": "我最喜歡的動物是毛茸茸的熊貓。"
  },
  {
    "id": 133,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "bear",
    "meaning_cht": "熊",
    "example_en": "A bear naps under the big pine.",
    "example_cht": "一隻熊在大松樹下打瞌睡。"
  },
  {
    "id": 134,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "bee",
    "meaning_cht": "蜜蜂",
    "example_en": "The bee buzzes by my ear loudly.",
    "example_cht": "小蜜蜂在我耳邊嗡嗡飛過。"
  },
  {
    "id": 135,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "bird",
    "meaning_cht": "鳥",
    "example_en": "A little bird sings on the tree.",
    "example_cht": "一隻小鳥在樹上唱歌。"
  },
  {
    "id": 136,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "bug",
    "meaning_cht": "蟲子",
    "example_en": "A tiny bug rides on a leaf.",
    "example_cht": "一隻小小蟲坐在葉子上搭便車。"
  },
  {
    "id": 137,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "butterfly",
    "meaning_cht": "蝴蝶",
    "example_en": "The butterfly lands on my nose so softly.",
    "example_cht": "蝴蝶輕輕地停在我的鼻子上。"
  },
  {
    "id": 138,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "cat",
    "meaning_cht": "貓",
    "example_en": "The cat naps on my soft lap.",
    "example_cht": "貓咪在我柔軟的大腿上打盹。"
  },
  {
    "id": 139,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "chicken",
    "meaning_cht": "雞/小雞",
    "example_en": "Chickens walk like tiny dinosaurs because they are.",
    "example_cht": "小雞走路像迷你恐龍，因為牠們真的有親戚喔。"
  },
  {
    "id": 140,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "cow",
    "meaning_cht": "牛",
    "example_en": "Cows are walking milk makers with spots like maps.",
    "example_cht": "乳牛是會走路的牛奶工廠，身上的斑點像地圖。"
  },
  {
    "id": 141,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "dog",
    "meaning_cht": "狗",
    "example_en": "My dog runs fast in the park.",
    "example_cht": "我的狗在公園裡跑得飛快。"
  },
  {
    "id": 142,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "duck",
    "meaning_cht": "鴨子",
    "example_en": "A duck waddles to the pond slowly.",
    "example_cht": "一隻鴨子慢慢搖搖擺擺走向池塘。"
  },
  {
    "id": 143,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "feather",
    "meaning_cht": "羽毛",
    "example_en": "A light feather floats down from the sky.",
    "example_cht": "一根輕輕的羽毛從天空飄下來。"
  },
  {
    "id": 144,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "fish",
    "meaning_cht": "魚",
    "example_en": "The fish swims past shiny stones.",
    "example_cht": "小魚游過亮亮的石頭旁邊。"
  },
  {
    "id": 145,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "fox",
    "meaning_cht": "狐狸",
    "example_en": "A fox runs through the tall trees.",
    "example_cht": "一隻狐狸穿過高高的樹林奔跑。"
  },
  {
    "id": 146,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "frog",
    "meaning_cht": "青蛙",
    "example_en": "The frog jumps from the wet rock.",
    "example_cht": "青蛙從濕濕的石頭上跳起來。"
  },
  {
    "id": 147,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "fur",
    "meaning_cht": "毛皮",
    "example_en": "The rabbit has white fluffy soft fur outside.",
    "example_cht": "兔子的毛外面白白的、軟軟又蓬鬆。"
  },
  {
    "id": 148,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "horn",
    "meaning_cht": "角",
    "example_en": "The unicorn has a magical golden horn shining.",
    "example_cht": "獨角獸有一支會發光的神奇金角。"
  },
  {
    "id": 149,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "horse",
    "meaning_cht": "馬",
    "example_en": "The horse trots with a shiny mane.",
    "example_cht": "馬兒小跑步，鬃毛亮晶晶。"
  },
  {
    "id": 150,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "insect",
    "meaning_cht": "昆蟲",
    "example_en": "Insects are tiny robots that nature designed well.",
    "example_cht": "昆蟲像大自然設計的小小機器人。"
  },
  {
    "id": 151,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "ladybug",
    "meaning_cht": "瓢蟲",
    "example_en": "A red ladybug with black spots crawls slowly.",
    "example_cht": "一隻紅色瓢蟲長著黑點，慢慢爬。"
  },
  {
    "id": 152,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "lion",
    "meaning_cht": "獅子",
    "example_en": "The lion rests in the cool shade.",
    "example_cht": "獅子在涼涼的陰影裡休息。"
  },
  {
    "id": 153,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "mouse",
    "meaning_cht": "老鼠",
    "example_en": "A mouse nibbles a cheese cube fast.",
    "example_cht": "一隻老鼠啃著起司小方塊，咬得好快。"
  },
  {
    "id": 154,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "paw",
    "meaning_cht": "爪子",
    "example_en": "The cat's soft paw touches my hand gently.",
    "example_cht": "貓咪柔軟的小肉球輕輕碰到我的手。"
  },
  {
    "id": 155,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "pet",
    "meaning_cht": "寵物",
    "example_en": "My pet teaches me about loyalty without words.",
    "example_cht": "我的寵物不用說話，也教會我什麼是忠誠。"
  },
  {
    "id": 156,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "pig",
    "meaning_cht": "豬",
    "example_en": "A pig rolls in the cool mud.",
    "example_cht": "一隻豬在涼涼的泥巴裡打滾。"
  },
  {
    "id": 157,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "rabbit",
    "meaning_cht": "兔子",
    "example_en": "Rabbits hop through life like they're on pogo sticks.",
    "example_cht": "兔子蹦蹦跳跳，像踩著彈簧棒過生活。"
  },
  {
    "id": 158,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "sheep",
    "meaning_cht": "綿羊",
    "example_en": "A sheep says baa on the green hill.",
    "example_cht": "綿羊在綠綠的小山上咩咩叫。"
  },
  {
    "id": 159,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "snake",
    "meaning_cht": "蛇",
    "example_en": "A snake slides across the warm sand.",
    "example_cht": "一條蛇滑過暖暖的沙地。"
  },
  {
    "id": 160,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "spider",
    "meaning_cht": "蜘蛛",
    "example_en": "Spiders are architects building bridges made of silk.",
    "example_cht": "蜘蛛是建築師，用絲做出橋。"
  },
  {
    "id": 161,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "tail",
    "meaning_cht": "尾巴",
    "example_en": "The puppy wags its tail when we play.",
    "example_cht": "我們玩時，小狗的尾巴搖啊搖。"
  },
  {
    "id": 162,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "tiger",
    "meaning_cht": "老虎",
    "example_en": "The tiger prowls behind the tall grass.",
    "example_cht": "老虎在高高的草叢後面悄悄走。"
  },
  {
    "id": 163,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "wing",
    "meaning_cht": "翅膀",
    "example_en": "The bird spreads its wings to fly away.",
    "example_cht": "小鳥張開翅膀飛走了。"
  },
  {
    "id": 164,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "wolf",
    "meaning_cht": "狼",
    "example_en": "A wolf howls at the full moon.",
    "example_cht": "一隻狼對著滿月嗚嗚叫。"
  },
  {
    "id": 165,
    "section_id": 6,
    "part_of_speech_id": 1,
    "word": "worm",
    "meaning_cht": "蟲",
    "example_en": "Worms are underground gardeners making soil rich and good.",
    "example_cht": "蚯蚓是地下園丁，讓土壤變鬆又肥。"
  },
  {
    "id": 166,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "apple",
    "meaning_cht": "蘋果",
    "example_en": "This shiny red apple fell from the sky!",
    "example_cht": "這顆亮晶晶的紅蘋果從天上掉下來!"
  },
  {
    "id": 167,
    "section_id": 7,
    "part_of_speech_id": 2,
    "word": "bake",
    "meaning_cht": "烘焙",
    "example_en": "We bake cookies that smell amazing and sweet.",
    "example_cht": "我們烤餅乾，香香甜甜的味道飄滿屋子。"
  },
  {
    "id": 168,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "banana",
    "meaning_cht": "香蕉",
    "example_en": "The banana looks like a yellow smile.",
    "example_cht": "香蕉看起來像一個黃色的笑臉。"
  },
  {
    "id": 169,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "bread",
    "meaning_cht": "麵包",
    "example_en": "Warm bread fresh from the oven smells like hug.",
    "example_cht": "剛烤好的溫熱麵包，香味像一個擁抱。"
  },
  {
    "id": 170,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "breakfast",
    "meaning_cht": "早餐",
    "example_en": "Breakfast gives me energy to start the day.",
    "example_cht": "早餐給我滿滿的力氣開始一天。"
  },
  {
    "id": 171,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "cake",
    "meaning_cht": "蛋糕",
    "example_en": "The birthday cake has seven candles on top.",
    "example_cht": "生日蛋糕上面插了七根蠟燭。"
  },
  {
    "id": 172,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "candy",
    "meaning_cht": "糖果",
    "example_en": "This sweet candy makes my tongue turn purple.",
    "example_cht": "這顆甜甜的糖果把我的舌頭染成紫色。"
  },
  {
    "id": 173,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "cheese",
    "meaning_cht": "乳酪",
    "example_en": "The yellow cheese has tiny holes like a moon.",
    "example_cht": "黃色起司有小洞洞，像月亮。"
  },
  {
    "id": 174,
    "section_id": 7,
    "part_of_speech_id": 2,
    "word": "cook",
    "meaning_cht": "烹飪",
    "example_en": "Mom teaches me how to cook simple food.",
    "example_cht": "媽媽教我煮簡單的食物。"
  },
  {
    "id": 175,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "cookie",
    "meaning_cht": "餅乾",
    "example_en": "I share my chocolate cookie with my friend.",
    "example_cht": "我把巧克力餅乾分給朋友吃。"
  },
  {
    "id": 176,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "dinner",
    "meaning_cht": "晚餐",
    "example_en": "We eat dinner together as a family.",
    "example_cht": "我們一家人一起吃晚餐。"
  },
  {
    "id": 177,
    "section_id": 7,
    "part_of_speech_id": 2,
    "word": "drink",
    "meaning_cht": "喝",
    "example_en": "I drink warm soup on rainy days.",
    "example_cht": "下雨天我喝溫溫的湯。"
  },
  {
    "id": 178,
    "section_id": 7,
    "part_of_speech_id": 2,
    "word": "eat",
    "meaning_cht": "吃",
    "example_en": "I eat noodles with a big smile.",
    "example_cht": "我笑咪咪地吃麵條。"
  },
  {
    "id": 179,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "egg",
    "meaning_cht": "蛋",
    "example_en": "Cracking an egg is like opening a surprise package.",
    "example_cht": "打開雞蛋就像拆驚喜禮物。"
  },
  {
    "id": 180,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "food",
    "meaning_cht": "食物",
    "example_en": "Tasty food helps me grow and play hard.",
    "example_cht": "好吃的食物讓我長大又有力氣玩。"
  },
  {
    "id": 181,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "juice",
    "meaning_cht": "果汁",
    "example_en": "I drink cold orange juice in the morning.",
    "example_cht": "我早上喝冰冰的柳橙汁。"
  },
  {
    "id": 182,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "lunch",
    "meaning_cht": "午餐",
    "example_en": "Lunch time is when we eat and rest.",
    "example_cht": "午餐時間是吃飯也休息的時候。"
  },
  {
    "id": 183,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "meat",
    "meaning_cht": "肉",
    "example_en": "The sizzling meat smells so good that the dog wags its tail!",
    "example_cht": "肉在鍋裡滋滋作響，香得連小狗都搖尾巴！"
  },
  {
    "id": 184,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "milk",
    "meaning_cht": "牛奶",
    "example_en": "Milk makes my bones grow strong and tall.",
    "example_cht": "牛奶讓我的骨頭長得又強又壯。"
  },
  {
    "id": 185,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "rice",
    "meaning_cht": "米飯",
    "example_en": "White rice goes well with my favorite food.",
    "example_cht": "白飯配我最喜歡的菜剛剛好。"
  },
  {
    "id": 186,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "salt",
    "meaning_cht": "鹽",
    "example_en": "A sprinkle of salt is like ocean magic that makes food better.",
    "example_cht": "灑一點鹽就像海洋魔法，讓食物更好吃。"
  },
  {
    "id": 187,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "snack",
    "meaning_cht": "點心",
    "example_en": "My snack is a cookie that smiles at me!",
    "example_cht": "我的點心是一塊對我微笑的餅乾!"
  },
  {
    "id": 188,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "soup",
    "meaning_cht": "湯",
    "example_en": "Hot chicken soup warms my tummy when I'm cold.",
    "example_cht": "冷冷的時候，熱騰騰的雞湯暖暖我的肚子。"
  },
  {
    "id": 189,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "sugar",
    "meaning_cht": "糖",
    "example_en": "Sugar crystals sparkle like tiny diamonds that make things sweet.",
    "example_cht": "糖晶晶亮亮的像小鑽石，讓東西變甜甜的。"
  },
  {
    "id": 190,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "tea",
    "meaning_cht": "茶",
    "example_en": "Grandma makes warm tea with honey for me.",
    "example_cht": "阿嬤為我泡了加蜂蜜的溫茶。"
  },
  {
    "id": 191,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "water",
    "meaning_cht": "水",
    "example_en": "Cold water splashes on my happy hands.",
    "example_cht": "冰冰的水在我開心的手上嘩啦啦。"
  },
  {
    "id": 192,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "sandwich",
    "meaning_cht": "三明治",
    "example_en": "My sandwich has rainbow colors inside!",
    "example_cht": "我的三明治裡面有彩虹顏色!"
  },
  {
    "id": 193,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "pizza",
    "meaning_cht": "披薩",
    "example_en": "The pizza is hot and tasty.",
    "example_cht": "披薩熱呼呼又好吃。"
  },
  {
    "id": 194,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "noodles",
    "meaning_cht": "麵條",
    "example_en": "I slurp long noodles with a smile.",
    "example_cht": "我笑著吸溜長長的麵條。"
  },
  {
    "id": 195,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "chocolate",
    "meaning_cht": "巧克力",
    "example_en": "Chocolate melts on my tongue like magic.",
    "example_cht": "巧克力在舌頭上像魔法一樣融化。"
  },
  {
    "id": 196,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "honey",
    "meaning_cht": "蜂蜜",
    "example_en": "Bees make sweet honey for our toast.",
    "example_cht": "小蜜蜂做出甜甜的蜂蜜讓我們抹在吐司上。"
  },
  {
    "id": 197,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "yogurt",
    "meaning_cht": "優格",
    "example_en": "I mix fruit into my yogurt cup.",
    "example_cht": "我把水果加進我的優格杯裡。"
  },
  {
    "id": 198,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "cereal",
    "meaning_cht": "穀片",
    "example_en": "I pour milk on my crunchy cereal.",
    "example_cht": "我把牛奶倒在脆脆的穀片上。"
  },
  {
    "id": 199,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "ice cream",
    "meaning_cht": "冰淇淋",
    "example_en": "Ice cream drips on my happy chin.",
    "example_cht": "冰淇淋滴到我開心的下巴上。"
  },
  {
    "id": 200,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "fruit",
    "meaning_cht": "水果",
    "example_en": "Fruit gives me bright energy to play.",
    "example_cht": "水果給我亮亮的能量去玩耍。"
  },
  {
    "id": 201,
    "section_id": 7,
    "part_of_speech_id": 1,
    "word": "vegetable",
    "meaning_cht": "蔬菜",
    "example_en": "I eat vegetables to grow strong and tall.",
    "example_cht": "我吃蔬菜，長得又高又壯。"
  },
  {
    "id": 202,
    "section_id": 8,
    "part_of_speech_id": 1,
    "word": "bottle",
    "meaning_cht": "瓶子",
    "example_en": "The water bottle keeps my drink cold all day.",
    "example_cht": "水壺讓我的飲料一整天都冰冰的。"
  },
  {
    "id": 203,
    "section_id": 8,
    "part_of_speech_id": 1,
    "word": "bowl",
    "meaning_cht": "碗",
    "example_en": "I eat cereal from my favorite blue bowl.",
    "example_cht": "我用最喜歡的藍色碗吃穀片。"
  },
  {
    "id": 204,
    "section_id": 8,
    "part_of_speech_id": 2,
    "word": "chop",
    "meaning_cht": "切",
    "example_en": "Dad chops vegetables for our yummy dinner tonight.",
    "example_cht": "爸爸切菜，準備我們今晚好吃的晚餐。"
  },
  {
    "id": 205,
    "section_id": 8,
    "part_of_speech_id": 1,
    "word": "cup",
    "meaning_cht": "杯子",
    "example_en": "My cup has a blue star on it.",
    "example_cht": "我的杯子上有一顆藍色的星星。"
  },
  {
    "id": 206,
    "section_id": 8,
    "part_of_speech_id": 1,
    "word": "fork",
    "meaning_cht": "叉子",
    "example_en": "My fork pokes yummy soft noodles.",
    "example_cht": "我的叉子戳著好吃軟軟的麵。"
  },
  {
    "id": 207,
    "section_id": 8,
    "part_of_speech_id": 1,
    "word": "freezer",
    "meaning_cht": "冷凍庫",
    "example_en": "Ice cream stays frozen in the cold freezer.",
    "example_cht": "冷凍庫裡的冰淇淋冰冰的，不會融化。"
  },
  {
    "id": 208,
    "section_id": 8,
    "part_of_speech_id": 1,
    "word": "jar",
    "meaning_cht": "罐子",
    "example_en": "The glass jar is full of colorful candy.",
    "example_cht": "玻璃罐裡裝滿了五顏六色的糖果。"
  },
  {
    "id": 209,
    "section_id": 8,
    "part_of_speech_id": 1,
    "word": "kitchen",
    "meaning_cht": "廚房",
    "example_en": "The kitchen is where we cook delicious meals.",
    "example_cht": "廚房是我們煮出美味餐點的地方。"
  },
  {
    "id": 210,
    "section_id": 8,
    "part_of_speech_id": 1,
    "word": "knife",
    "meaning_cht": "刀子",
    "example_en": "Dad uses a knife to cut the bread.",
    "example_cht": "爸爸用刀切麵包。"
  },
  {
    "id": 211,
    "section_id": 8,
    "part_of_speech_id": 1,
    "word": "napkin",
    "meaning_cht": "餐巾",
    "example_en": "I wipe my mouth with a soft napkin.",
    "example_cht": "我用柔軟的餐巾擦嘴巴。"
  },
  {
    "id": 212,
    "section_id": 8,
    "part_of_speech_id": 1,
    "word": "oven",
    "meaning_cht": "烤箱",
    "example_en": "The oven bakes bread that smells so good.",
    "example_cht": "烤箱烤出的麵包香香的。"
  },
  {
    "id": 213,
    "section_id": 8,
    "part_of_speech_id": 1,
    "word": "plate",
    "meaning_cht": "盤子",
    "example_en": "My plate looks like a round moon.",
    "example_cht": "我的盤子像一輪圓圓的月亮。"
  },
  {
    "id": 214,
    "section_id": 8,
    "part_of_speech_id": 2,
    "word": "pour",
    "meaning_cht": "倒",
    "example_en": "I pour milk into my glass very carefully.",
    "example_cht": "我很小心把牛奶倒進杯子裡。"
  },
  {
    "id": 215,
    "section_id": 8,
    "part_of_speech_id": 1,
    "word": "recipe",
    "meaning_cht": "食譜",
    "example_en": "We follow the recipe to make chocolate cake.",
    "example_cht": "我們照食譜做巧克力蛋糕。"
  },
  {
    "id": 216,
    "section_id": 8,
    "part_of_speech_id": 1,
    "word": "refrigerator",
    "meaning_cht": "冰箱",
    "example_en": "The refrigerator keeps our food fresh and cold.",
    "example_cht": "冰箱讓食物保持新鮮又冰涼。"
  },
  {
    "id": 217,
    "section_id": 8,
    "part_of_speech_id": 1,
    "word": "spoon",
    "meaning_cht": "湯匙",
    "example_en": "I eat soup with my shiny spoon.",
    "example_cht": "我用亮晶晶的湯匙喝湯。"
  },
  {
    "id": 218,
    "section_id": 8,
    "part_of_speech_id": 2,
    "word": "stir",
    "meaning_cht": "攪拌",
    "example_en": "I stir the soup with a big wooden spoon.",
    "example_cht": "我用大木湯匙攪拌湯。"
  },
  {
    "id": 219,
    "section_id": 8,
    "part_of_speech_id": 1,
    "word": "stove",
    "meaning_cht": "爐子",
    "example_en": "Be careful near the hot stove when cooking.",
    "example_cht": "煮飯時靠近熱爐子要小心。"
  },
  {
    "id": 220,
    "section_id": 8,
    "part_of_speech_id": 1,
    "word": "straw",
    "meaning_cht": "吸管",
    "example_en": "I drink juice through a bendy fun straw.",
    "example_cht": "我用會彎彎的吸管喝果汁，好好玩。"
  },
  {
    "id": 221,
    "section_id": 9,
    "part_of_speech_id": 1,
    "word": "coat",
    "meaning_cht": "外套",
    "example_en": "My coat keeps me warm in winter.",
    "example_cht": "冬天我的外套讓我暖暖的。"
  },
  {
    "id": 222,
    "section_id": 9,
    "part_of_speech_id": 1,
    "word": "dress",
    "meaning_cht": "洋裝/裙子",
    "example_en": "Her dress spins when she dances fast.",
    "example_cht": "她跳快快的時候，洋裝會旋轉。"
  },
  {
    "id": 223,
    "section_id": 9,
    "part_of_speech_id": 1,
    "word": "hat",
    "meaning_cht": "帽子",
    "example_en": "My hat has a big smiling face.",
    "example_cht": "我的帽子上有一張大大的笑臉。"
  },
  {
    "id": 224,
    "section_id": 9,
    "part_of_speech_id": 1,
    "word": "pajamas",
    "meaning_cht": "睡衣",
    "example_en": "I put on my soft pajamas before bed.",
    "example_cht": "睡覺前我穿上軟軟的睡衣。"
  },
  {
    "id": 225,
    "section_id": 9,
    "part_of_speech_id": 1,
    "word": "pants",
    "meaning_cht": "褲子",
    "example_en": "My pants have deep pockets for things.",
    "example_cht": "我的褲子有深深的口袋可以放東西。"
  },
  {
    "id": 226,
    "section_id": 9,
    "part_of_speech_id": 6,
    "word": "put on",
    "meaning_cht": "穿上/戴上",
    "example_en": "I put on my cape to fly.",
    "example_cht": "我披上我的披風，準備飛翔。"
  },
  {
    "id": 227,
    "section_id": 9,
    "part_of_speech_id": 1,
    "word": "shirt",
    "meaning_cht": "襯衫/上衣",
    "example_en": "My shirt has a red shiny star.",
    "example_cht": "我的上衣上有一顆紅色亮亮的星星。"
  },
  {
    "id": 228,
    "section_id": 9,
    "part_of_speech_id": 1,
    "word": "shoe",
    "meaning_cht": "鞋子",
    "example_en": "My shoe lights blink when I run fast.",
    "example_cht": "我跑很快時，鞋子上的燈會閃閃發亮。"
  },
  {
    "id": 229,
    "section_id": 9,
    "part_of_speech_id": 1,
    "word": "slippers",
    "meaning_cht": "拖鞋",
    "example_en": "My fuzzy slippers keep my feet warm inside.",
    "example_cht": "毛絨絨的拖鞋讓我的腳在家裡暖呼呼。"
  },
  {
    "id": 230,
    "section_id": 9,
    "part_of_speech_id": 1,
    "word": "socks",
    "meaning_cht": "襪子",
    "example_en": "My socks have stripes on them today.",
    "example_cht": "我今天穿條紋襪子。"
  },
  {
    "id": 231,
    "section_id": 9,
    "part_of_speech_id": 6,
    "word": "take off",
    "meaning_cht": "脫下/拿下",
    "example_en": "I take off my muddy boots fast.",
    "example_cht": "我把泥巴靴子快快脫掉。"
  },
  {
    "id": 232,
    "section_id": 9,
    "part_of_speech_id": 2,
    "word": "wear",
    "meaning_cht": "穿著/戴著",
    "example_en": "I wear a crown to feel special.",
    "example_cht": "我戴上皇冠，感覺特別不一樣。"
  },
  {
    "id": 233,
    "section_id": 10,
    "part_of_speech_id": 1,
    "word": "attic",
    "meaning_cht": "閣樓",
    "example_en": "The attic is full of mysterious old things.",
    "example_cht": "閣樓裡有好多神祕的舊東西。"
  },
  {
    "id": 234,
    "section_id": 10,
    "part_of_speech_id": 1,
    "word": "basement",
    "meaning_cht": "地下室",
    "example_en": "We store old toys in the dark basement.",
    "example_cht": "我們把舊玩具放在暗暗的地下室。"
  },
  {
    "id": 235,
    "section_id": 10,
    "part_of_speech_id": 1,
    "word": "bathroom",
    "meaning_cht": "浴室",
    "example_en": "I wash my hands in the clean bathroom.",
    "example_cht": "我在乾淨的浴室裡洗手。"
  },
  {
    "id": 236,
    "section_id": 10,
    "part_of_speech_id": 1,
    "word": "bedroom",
    "meaning_cht": "臥室",
    "example_en": "My bedroom is my own special cozy space.",
    "example_cht": "我的臥室是只屬於我的溫暖小天地。"
  },
  {
    "id": 237,
    "section_id": 10,
    "part_of_speech_id": 1,
    "word": "ceiling",
    "meaning_cht": "天花板",
    "example_en": "I imagine the ceiling is the floor turned upside down.",
    "example_cht": "我想像天花板是倒過來的地板。"
  },
  {
    "id": 238,
    "section_id": 10,
    "part_of_speech_id": 1,
    "word": "chimney",
    "meaning_cht": "煙囪",
    "example_en": "Smoke comes out of the tall brick chimney.",
    "example_cht": "高高的磚造煙囪冒出白白的煙。"
  },
  {
    "id": 239,
    "section_id": 10,
    "part_of_speech_id": 1,
    "word": "door",
    "meaning_cht": "門",
    "example_en": "This magical door leads to a candy kingdom!",
    "example_cht": "這扇魔法門通往糖果王國!"
  },
  {
    "id": 240,
    "section_id": 10,
    "part_of_speech_id": 1,
    "word": "driveway",
    "meaning_cht": "車道",
    "example_en": "I draw with chalk on our long driveway.",
    "example_cht": "我在長長的車道上用粉筆畫畫。"
  },
  {
    "id": 241,
    "section_id": 10,
    "part_of_speech_id": 1,
    "word": "fence",
    "meaning_cht": "柵欄",
    "example_en": "The white fence goes around our whole yard.",
    "example_cht": "白色的籬笆繞著我們整個院子。"
  },
  {
    "id": 242,
    "section_id": 10,
    "part_of_speech_id": 1,
    "word": "floor",
    "meaning_cht": "地板",
    "example_en": "The floor is where adventures begin when you get up.",
    "example_cht": "起床後，冒險就從地板開始。"
  },
  {
    "id": 243,
    "section_id": 10,
    "part_of_speech_id": 1,
    "word": "garage",
    "meaning_cht": "車庫",
    "example_en": "Dad parks the car in the big garage.",
    "example_cht": "爸爸把車停在大大的車庫裡。"
  },
  {
    "id": 244,
    "section_id": 10,
    "part_of_speech_id": 1,
    "word": "gate",
    "meaning_cht": "大門/柵門",
    "example_en": "The garden gate creaks when it opens wide.",
    "example_cht": "花園的門一打開就發出呀呀聲。"
  },
  {
    "id": 245,
    "section_id": 10,
    "part_of_speech_id": 1,
    "word": "home",
    "meaning_cht": "家",
    "example_en": "Home is where we read together warmly.",
    "example_cht": "家是我們一起溫暖讀書的地方。"
  },
  {
    "id": 246,
    "section_id": 10,
    "part_of_speech_id": 1,
    "word": "house",
    "meaning_cht": "房子",
    "example_en": "Our house smells like fresh warm cookies.",
    "example_cht": "我們的家有剛烤好的餅乾香味。"
  },
  {
    "id": 247,
    "section_id": 10,
    "part_of_speech_id": 1,
    "word": "living room",
    "meaning_cht": "客廳",
    "example_en": "We watch movies together in the living room.",
    "example_cht": "我們在客廳一起看電影。"
  },
  {
    "id": 248,
    "section_id": 10,
    "part_of_speech_id": 1,
    "word": "mailbox",
    "meaning_cht": "信箱",
    "example_en": "The mailman puts letters in our red mailbox.",
    "example_cht": "郵差把信放進我們紅紅的信箱。"
  },
  {
    "id": 249,
    "section_id": 10,
    "part_of_speech_id": 1,
    "word": "porch",
    "meaning_cht": "門廊",
    "example_en": "We sit on the porch and watch the sunset.",
    "example_cht": "我們坐在門廊看夕陽。"
  },
  {
    "id": 250,
    "section_id": 10,
    "part_of_speech_id": 1,
    "word": "roof",
    "meaning_cht": "屋頂",
    "example_en": "The roof is our umbrella when the clouds cry.",
    "example_cht": "下雨時，屋頂就像我們的大雨傘。"
  },
  {
    "id": 251,
    "section_id": 10,
    "part_of_speech_id": 1,
    "word": "room",
    "meaning_cht": "房間",
    "example_en": "My room has glowing stars on the wall.",
    "example_cht": "我的房間牆上有會發光的星星。"
  },
  {
    "id": 252,
    "section_id": 10,
    "part_of_speech_id": 1,
    "word": "stairs",
    "meaning_cht": "樓梯",
    "example_en": "I climb the stairs one step at a time.",
    "example_cht": "我一步一步爬上樓梯。"
  },
  {
    "id": 253,
    "section_id": 10,
    "part_of_speech_id": 1,
    "word": "wall",
    "meaning_cht": "牆",
    "example_en": "Walls protect us but also hold echoes of laughter.",
    "example_cht": "牆壁保護著我們，也留住笑聲的回音。"
  },
  {
    "id": 254,
    "section_id": 10,
    "part_of_speech_id": 1,
    "word": "window",
    "meaning_cht": "窗戶",
    "example_en": "I watch the rain dance on the window.",
    "example_cht": "我看著雨滴在窗戶上跳舞。"
  },
  {
    "id": 255,
    "section_id": 10,
    "part_of_speech_id": 1,
    "word": "yard",
    "meaning_cht": "院子/碼",
    "example_en": "We play in the yard behind the house.",
    "example_cht": "我們在房子後面的院子裡玩。"
  },
  {
    "id": 256,
    "section_id": 11,
    "part_of_speech_id": 1,
    "word": "alarm",
    "meaning_cht": "鬧鐘",
    "example_en": "The loud alarm wakes me up for school.",
    "example_cht": "大聲的鬧鐘叫我起床準備上學。"
  },
  {
    "id": 257,
    "section_id": 11,
    "part_of_speech_id": 1,
    "word": "bag",
    "meaning_cht": "袋子",
    "example_en": "My bag holds snacks and little toy cars.",
    "example_cht": "我的袋子裝著點心和小小玩具車。"
  },
  {
    "id": 258,
    "section_id": 11,
    "part_of_speech_id": 1,
    "word": "bed",
    "meaning_cht": "床",
    "example_en": "My bed is a soft fluffy cloud.",
    "example_cht": "我的床像一朵又軟又蓬的雲。"
  },
  {
    "id": 259,
    "section_id": 11,
    "part_of_speech_id": 1,
    "word": "bell",
    "meaning_cht": "鈴鐺/鐘",
    "example_en": "The bell rings when school starts now.",
    "example_cht": "學校現在開始上課，鈴聲叮噹響。"
  },
  {
    "id": 260,
    "section_id": 11,
    "part_of_speech_id": 1,
    "word": "bell",
    "meaning_cht": "鐘/鈴",
    "example_en": "The school bell rings at three o'clock.",
    "example_cht": "下午三點，學校的鐘叮咚響。"
  },
  {
    "id": 261,
    "section_id": 11,
    "part_of_speech_id": 1,
    "word": "blanket",
    "meaning_cht": "毯子",
    "example_en": "My warm blanket keeps me cozy at night.",
    "example_cht": "晚上我的暖暖小毯子讓我好舒服。"
  },
  {
    "id": 262,
    "section_id": 11,
    "part_of_speech_id": 1,
    "word": "box",
    "meaning_cht": "盒子",
    "example_en": "The box turns into my rocket ship.",
    "example_cht": "這個盒子變成我的火箭船。"
  },
  {
    "id": 263,
    "section_id": 11,
    "part_of_speech_id": 1,
    "word": "chair",
    "meaning_cht": "椅子",
    "example_en": "This chair is my reading spot at home.",
    "example_cht": "這張椅子是我在家看書的小角落。"
  },
  {
    "id": 264,
    "section_id": 11,
    "part_of_speech_id": 1,
    "word": "clock",
    "meaning_cht": "時鐘",
    "example_en": "The clock shows it is time to eat.",
    "example_cht": "時鐘告訴我們，該吃飯啦。"
  },
  {
    "id": 265,
    "section_id": 11,
    "part_of_speech_id": 1,
    "word": "key",
    "meaning_cht": "鑰匙",
    "example_en": "The magic key unlocks doors to rooms filled with surprises!",
    "example_cht": "魔法鑰匙打開滿是驚喜的房間！"
  },
  {
    "id": 266,
    "section_id": 11,
    "part_of_speech_id": 1,
    "word": "light",
    "meaning_cht": "燈/光",
    "example_en": "The night light keeps monsters far away.",
    "example_cht": "小夜燈把怪獸都趕得遠遠的。"
  },
  {
    "id": 267,
    "section_id": 11,
    "part_of_speech_id": 5,
    "word": "light",
    "meaning_cht": "輕的",
    "example_en": "The feather is light like the air.",
    "example_cht": "羽毛很輕，像空氣一樣。"
  },
  {
    "id": 268,
    "section_id": 11,
    "part_of_speech_id": 1,
    "word": "light",
    "meaning_cht": "光線",
    "example_en": "Light travels from stars that might not exist.",
    "example_cht": "光從也許已經不在的星星那裡飛來。"
  },
  {
    "id": 269,
    "section_id": 11,
    "part_of_speech_id": 5,
    "word": "also",
    "meaning_cht": "也",
    "example_en": "The moon is beautiful and the stars are too.",
    "example_cht": "月亮好美，星星也一樣美。"
  },
  {
    "id": 270,
    "section_id": 11,
    "part_of_speech_id": 1,
    "word": "lock",
    "meaning_cht": "鎖",
    "example_en": "The old lock guards secrets like a tiny metal soldier.",
    "example_cht": "舊舊的鎖像小小金屬士兵，守著秘密。"
  },
  {
    "id": 271,
    "section_id": 11,
    "part_of_speech_id": 1,
    "word": "mirror",
    "meaning_cht": "鏡子",
    "example_en": "I see my smiling face in the mirror.",
    "example_cht": "我在鏡子裡看到自己笑咪咪的臉。"
  },
  {
    "id": 272,
    "section_id": 11,
    "part_of_speech_id": 1,
    "word": "pillow",
    "meaning_cht": "枕頭",
    "example_en": "I rest my head on my soft pillow.",
    "example_cht": "我把頭靠在柔軟的枕頭上休息。"
  },
  {
    "id": 273,
    "section_id": 11,
    "part_of_speech_id": 1,
    "word": "pocket",
    "meaning_cht": "口袋",
    "example_en": "My pocket holds a shiny rock I found.",
    "example_cht": "我的口袋裡放著我找到的亮亮石頭。"
  },
  {
    "id": 274,
    "section_id": 11,
    "part_of_speech_id": 1,
    "word": "table",
    "meaning_cht": "桌子",
    "example_en": "We build a tent under the table.",
    "example_cht": "我們在桌子底下搭了一個小帳篷。"
  },
  {
    "id": 275,
    "section_id": 12,
    "part_of_speech_id": 1,
    "word": "ball",
    "meaning_cht": "球",
    "example_en": "The ball bounces high then bounces low.",
    "example_cht": "球球一下彈很高、一下彈很低。"
  },
  {
    "id": 276,
    "section_id": 12,
    "part_of_speech_id": 1,
    "word": "balloon",
    "meaning_cht": "氣球",
    "example_en": "The balloon floats to the tall ceiling.",
    "example_cht": "氣球飄到高高的天花板。"
  },
  {
    "id": 277,
    "section_id": 12,
    "part_of_speech_id": 1,
    "word": "bike",
    "meaning_cht": "腳踏車",
    "example_en": "I ride my bike in big circles around the yard.",
    "example_cht": "我騎腳踏車在院子裡畫大大的圈圈。"
  },
  {
    "id": 278,
    "section_id": 12,
    "part_of_speech_id": 1,
    "word": "doll",
    "meaning_cht": "洋娃娃",
    "example_en": "My doll has a pretty pink dress.",
    "example_cht": "我的洋娃娃穿著漂亮的粉紅裙子。"
  },
  {
    "id": 279,
    "section_id": 12,
    "part_of_speech_id": 1,
    "word": "fun",
    "meaning_cht": "樂趣",
    "example_en": "Building sandcastles is pure fun under the warm sun.",
    "example_cht": "在暖暖的太陽下蓋沙堡，超級好玩。"
  },
  {
    "id": 280,
    "section_id": 12,
    "part_of_speech_id": 1,
    "word": "game",
    "meaning_cht": "遊戲",
    "example_en": "This game turns everyone into giggly, silly monsters laughing!",
    "example_cht": "這個遊戲讓大家笑嘻嘻，變成愛笑的小怪獸！"
  },
  {
    "id": 281,
    "section_id": 12,
    "part_of_speech_id": 1,
    "word": "kite",
    "meaning_cht": "風箏",
    "example_en": "My kite flies high and bright in the sky.",
    "example_cht": "我的風箏在天空飛得又高又亮。"
  },
  {
    "id": 282,
    "section_id": 12,
    "part_of_speech_id": 1,
    "word": "play",
    "meaning_cht": "玩樂/遊戲",
    "example_en": "Play time starts right after lunch today.",
    "example_cht": "今天午餐後就到玩耍時間啦。"
  },
  {
    "id": 283,
    "section_id": 12,
    "part_of_speech_id": 2,
    "word": "play",
    "meaning_cht": "玩",
    "example_en": "We play tag under the big trees.",
    "example_cht": "我們在大樹下玩鬼抓人。"
  },
  {
    "id": 284,
    "section_id": 12,
    "part_of_speech_id": 1,
    "word": "scooter",
    "meaning_cht": "滑板車",
    "example_en": "I zoom on my scooter very fast.",
    "example_cht": "我騎滑板車嗖地一下飛快跑。"
  },
  {
    "id": 285,
    "section_id": 12,
    "part_of_speech_id": 1,
    "word": "slide",
    "meaning_cht": "溜滑梯",
    "example_en": "I zoom down the slide with my arms up.",
    "example_cht": "我舉著手臂，從溜滑梯咻地滑下來。"
  },
  {
    "id": 286,
    "section_id": 12,
    "part_of_speech_id": 1,
    "word": "swing",
    "meaning_cht": "鞦韆",
    "example_en": "The swing goes high up to the sky.",
    "example_cht": "盪鞦韆盪得好高好高，像要碰到天空。"
  },
  {
    "id": 287,
    "section_id": 12,
    "part_of_speech_id": 1,
    "word": "toy",
    "meaning_cht": "玩具",
    "example_en": "My toy train goes choo-choo loudly.",
    "example_cht": "我的玩具火車發出『啾—啾—』的大聲音。"
  },
  {
    "id": 288,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "art",
    "meaning_cht": "藝術/美術",
    "example_en": "Art class is my favorite time at school.",
    "example_cht": "美術課是我在學校最喜歡的時間。"
  },
  {
    "id": 289,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "backpack",
    "meaning_cht": "背包",
    "example_en": "My backpack holds all my school things safely.",
    "example_cht": "我的背包把上學要用的東西都裝得好好的。"
  },
  {
    "id": 290,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "book",
    "meaning_cht": "書",
    "example_en": "This book takes me to outer space.",
    "example_cht": "這本書帶我飛到外太空。"
  },
  {
    "id": 291,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "chalk",
    "meaning_cht": "粉筆",
    "example_en": "We draw hopscotch with colorful chalk outside today.",
    "example_cht": "我們今天在外面用彩色粉筆畫跳房子。"
  },
  {
    "id": 292,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "class",
    "meaning_cht": "班級/課",
    "example_en": "Our class is like a team of explorers discovering worlds.",
    "example_cht": "我們的班級像探險隊，一起發現新世界。"
  },
  {
    "id": 293,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "crayon",
    "meaning_cht": "蠟筆",
    "example_en": "This crayon is short from lots of use.",
    "example_cht": "這支蠟筆用很多次，變得好短。"
  },
  {
    "id": 294,
    "section_id": 13,
    "part_of_speech_id": 2,
    "word": "draw",
    "meaning_cht": "畫",
    "example_en": "I draw a castle with tall flags.",
    "example_cht": "我畫了一座有高高旗子的城堡。"
  },
  {
    "id": 295,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "draw",
    "meaning_cht": "畫作",
    "example_en": "This drawing shows my family as superheroes.",
    "example_cht": "這張畫把我的家人畫成超級英雄。"
  },
  {
    "id": 296,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "eraser",
    "meaning_cht": "橡皮擦",
    "example_en": "The pink eraser removes my pencil mistakes nicely.",
    "example_cht": "粉紅色橡皮擦輕輕一擦，就把鉛筆錯字擦掉了。"
  },
  {
    "id": 297,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "glue",
    "meaning_cht": "膠水",
    "example_en": "The white glue sticks things together so well.",
    "example_cht": "白色的膠水把東西黏得牢牢的。"
  },
  {
    "id": 298,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "homework",
    "meaning_cht": "家庭作業",
    "example_en": "Homework is like a puzzle that makes your brain grow.",
    "example_cht": "作業就像拼圖，會讓大腦越來越厲害。"
  },
  {
    "id": 299,
    "section_id": 13,
    "part_of_speech_id": 2,
    "word": "learn",
    "meaning_cht": "學習",
    "example_en": "When you learn something new, your brain lights up!",
    "example_cht": "當你學到新東西，大腦就會亮起來！"
  },
  {
    "id": 300,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "lesson",
    "meaning_cht": "課",
    "example_en": "I always have piano lessons once a week.",
    "example_cht": "我每週都上一堂鋼琴課。"
  },
  {
    "id": 301,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "letter",
    "meaning_cht": "信/字母",
    "example_en": "I write a letter to my grandma.",
    "example_cht": "我寫一封信給奶奶。"
  },
  {
    "id": 302,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "lunchbox",
    "meaning_cht": "便當盒",
    "example_en": "My lunchbox has a sandwich and an apple.",
    "example_cht": "我的便當盒裡有一個三明治和一顆蘋果。"
  },
  {
    "id": 303,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "marker",
    "meaning_cht": "麥克筆",
    "example_en": "The red marker writes on my white paper.",
    "example_cht": "紅色的彩色筆在我的白紙上寫字。"
  },
  {
    "id": 304,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "music",
    "meaning_cht": "音樂",
    "example_en": "The music makes our feet want to move.",
    "example_cht": "音樂讓我們的腳忍不住想要動起來。"
  },
  {
    "id": 305,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "notebook",
    "meaning_cht": "筆記本",
    "example_en": "I write my ideas in my special notebook.",
    "example_cht": "我把我的點子寫在我的特別筆記本裡。"
  },
  {
    "id": 306,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "page",
    "meaning_cht": "頁面",
    "example_en": "Turn the page to see more fun things.",
    "example_cht": "翻下一頁，會看到更多好玩的東西。"
  },
  {
    "id": 307,
    "section_id": 13,
    "part_of_speech_id": 2,
    "word": "paint",
    "meaning_cht": "塗色/畫圖",
    "example_en": "We paint stars on the blue wall.",
    "example_cht": "我們在藍色的牆上畫星星。"
  },
  {
    "id": 308,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "paint",
    "meaning_cht": "顏料/油漆",
    "example_en": "The paint spills create accidental art on the floor.",
    "example_cht": "灑出來的顏料在地上變成了意外的藝術。"
  },
  {
    "id": 309,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "paper",
    "meaning_cht": "紙",
    "example_en": "The paper becomes a plane so fast.",
    "example_cht": "這張紙一下子就變成一架紙飛機。"
  },
  {
    "id": 310,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "pen",
    "meaning_cht": "筆",
    "example_en": "My pen writes tiny shiny stars.",
    "example_cht": "我的筆會畫出亮晶晶的小星星。"
  },
  {
    "id": 311,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "pencil",
    "meaning_cht": "鉛筆",
    "example_en": "My pencil needs a nice sharp tip.",
    "example_cht": "我的鉛筆需要削出尖尖的筆尖。"
  },
  {
    "id": 312,
    "section_id": 13,
    "part_of_speech_id": 2,
    "word": "read",
    "meaning_cht": "閱讀",
    "example_en": "I read a story with my dad.",
    "example_cht": "我和爸爸一起讀故事。"
  },
  {
    "id": 313,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "ruler",
    "meaning_cht": "尺",
    "example_en": "I use a ruler to draw a straight line.",
    "example_cht": "我用尺畫一條直線。"
  },
  {
    "id": 314,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "school",
    "meaning_cht": "學校",
    "example_en": "School is a magical place where curiosity grows into knowledge.",
    "example_cht": "學校是個魔法地方，會把好奇變成知識。"
  },
  {
    "id": 315,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "scissors",
    "meaning_cht": "剪刀",
    "example_en": "I use safety scissors to cut the paper.",
    "example_cht": "我用安全剪刀剪紙。"
  },
  {
    "id": 316,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "song",
    "meaning_cht": "歌",
    "example_en": "This song makes me sing out loud.",
    "example_cht": "這首歌讓我忍不住大聲唱。"
  },
  {
    "id": 317,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "sticker",
    "meaning_cht": "貼紙",
    "example_en": "I get a gold star sticker for being good.",
    "example_cht": "我因為表現很好，拿到一張金色星星貼紙。"
  },
  {
    "id": 318,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "story",
    "meaning_cht": "故事",
    "example_en": "This story has a brave brown bear.",
    "example_cht": "這個故事裡有一隻勇敢的棕色小熊。"
  },
  {
    "id": 319,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "student",
    "meaning_cht": "學生",
    "example_en": "Every student has a special superpower waiting to be discovered!",
    "example_cht": "每個學生都有自己的超能力，等著被發現！"
  },
  {
    "id": 320,
    "section_id": 13,
    "part_of_speech_id": 2,
    "word": "study",
    "meaning_cht": "學習/研究",
    "example_en": "When I study nature, I feel like a detective.",
    "example_cht": "當我觀察大自然時，我覺得自己像小偵探。"
  },
  {
    "id": 321,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "tape",
    "meaning_cht": "膠帶",
    "example_en": "I use tape to fix my torn picture.",
    "example_cht": "我用膠帶把撕破的畫貼好。"
  },
  {
    "id": 322,
    "section_id": 13,
    "part_of_speech_id": 2,
    "word": "teach",
    "meaning_cht": "教導",
    "example_en": "Teaching someone is like planting seeds that grow forests.",
    "example_cht": "教會別人就像種下種子，會長成一片森林。"
  },
  {
    "id": 323,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "teacher",
    "meaning_cht": "老師",
    "example_en": "The teacher is like a wise guide leading us.",
    "example_cht": "老師像位聰明的嚮導，帶著我們前進。"
  },
  {
    "id": 324,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "word",
    "meaning_cht": "單字/詞",
    "example_en": "Each word helps me read much better.",
    "example_cht": "每一個單字都讓我讀書更厲害。"
  },
  {
    "id": 325,
    "section_id": 13,
    "part_of_speech_id": 2,
    "word": "write",
    "meaning_cht": "寫",
    "example_en": "I write my name in chalk outside.",
    "example_cht": "我在外面用粉筆寫下我的名字。"
  },
  {
    "id": 326,
    "section_id": 13,
    "part_of_speech_id": 1,
    "word": "write",
    "meaning_cht": "寫作",
    "example_en": "My writing about dragons became real in my mind.",
    "example_cht": "我寫的關於龍的故事，在我的腦海裡變得好真實。"
  },
  {
    "id": 327,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "airport",
    "meaning_cht": "機場",
    "example_en": "Big airplanes take off from the busy airport.",
    "example_cht": "大飛機從忙碌的機場起飛。"
  },
  {
    "id": 328,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "bakery",
    "meaning_cht": "麵包店",
    "example_en": "The bakery always smells like fresh baked bread.",
    "example_cht": "麵包店常常有剛出爐麵包的香味。"
  },
  {
    "id": 329,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "bank",
    "meaning_cht": "銀行",
    "example_en": "People save their money safely at the bank.",
    "example_cht": "大家把錢安全地存放在銀行。"
  },
  {
    "id": 330,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "beach",
    "meaning_cht": "海灘",
    "example_en": "I build sandcastles on the sunny beach today.",
    "example_cht": "今天我在陽光沙灘上蓋沙堡。"
  },
  {
    "id": 331,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "bridge",
    "meaning_cht": "橋",
    "example_en": "We cross the bridge over the sparkling stream.",
    "example_cht": "我們走過橋，越過閃閃發亮的小溪。"
  },
  {
    "id": 332,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "cafe",
    "meaning_cht": "咖啡廳",
    "example_en": "The cozy cafe serves hot chocolate with marshmallows.",
    "example_cht": "溫馨的咖啡廳有棉花糖熱可可。"
  },
  {
    "id": 333,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "cinema",
    "meaning_cht": "電影院",
    "example_en": "The cinema shows movies on a giant screen.",
    "example_cht": "電影院在大大螢幕上播電影。"
  },
  {
    "id": 334,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "city",
    "meaning_cht": "城市",
    "example_en": "The city lights sparkle at night.",
    "example_cht": "城市的燈光在夜裡一閃一閃。"
  },
  {
    "id": 335,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "community",
    "meaning_cht": "社區",
    "example_en": "Our community works together to help each other.",
    "example_cht": "我們的社區大家一起互相幫忙。"
  },
  {
    "id": 336,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "country",
    "meaning_cht": "國家",
    "example_en": "Our country has many beautiful different landscapes.",
    "example_cht": "我們的國家有好多美麗又不一樣的風景。"
  },
  {
    "id": 337,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "farm",
    "meaning_cht": "農場",
    "example_en": "The farm has cows and chickens living there.",
    "example_cht": "農場裡住著牛和雞。"
  },
  {
    "id": 338,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "garden",
    "meaning_cht": "花園",
    "example_en": "Bees visit our garden for the flowers.",
    "example_cht": "蜜蜂為了花朵來到我們的花園。"
  },
  {
    "id": 339,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "highway",
    "meaning_cht": "高速公路",
    "example_en": "The busy highway has many fast cars going by.",
    "example_cht": "繁忙的高速公路上有好多快快的車子。"
  },
  {
    "id": 340,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "hospital",
    "meaning_cht": "醫院",
    "example_en": "The hospital is where doctors help sick people.",
    "example_cht": "醫院是醫生幫助生病人的地方。"
  },
  {
    "id": 341,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "hotel",
    "meaning_cht": "飯店",
    "example_en": "We sleep at a hotel when we travel.",
    "example_cht": "旅行時我們睡在飯店裡。"
  },
  {
    "id": 342,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "library",
    "meaning_cht": "圖書館",
    "example_en": "The quiet library has thousands of books inside.",
    "example_cht": "安靜的圖書館裡有成千上萬本書。"
  },
  {
    "id": 343,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "mall",
    "meaning_cht": "購物中心",
    "example_en": "The big mall has many different stores inside.",
    "example_cht": "大大的購物中心裡有很多不同的商店。"
  },
  {
    "id": 344,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "market",
    "meaning_cht": "市場",
    "example_en": "The busy market sells fresh fruits and vegetables.",
    "example_cht": "熱鬧的市場賣著新鮮的水果和蔬菜。"
  },
  {
    "id": 345,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "museum",
    "meaning_cht": "博物館",
    "example_en": "The museum has dinosaur bones and old treasures.",
    "example_cht": "博物館裡有恐龍骨頭和古老的寶物。"
  },
  {
    "id": 346,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "neighborhood",
    "meaning_cht": "社區",
    "example_en": "Our neighborhood is a safe place to play.",
    "example_cht": "我們的社區是安全好玩的地方。"
  },
  {
    "id": 347,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "office",
    "meaning_cht": "辦公室",
    "example_en": "Dad goes to his office to work every day.",
    "example_cht": "爸爸每天去他的辦公室工作。"
  },
  {
    "id": 348,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "park",
    "meaning_cht": "公園",
    "example_en": "We race leaves at the park today.",
    "example_cht": "我們今天在公園比賽誰的葉子跑得快。"
  },
  {
    "id": 349,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "place",
    "meaning_cht": "地方",
    "example_en": "My favorite place is where I imagine.",
    "example_cht": "我最喜歡的地方就是我想像的那裡。"
  },
  {
    "id": 350,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "playground",
    "meaning_cht": "遊樂場",
    "example_en": "The playground is full of happy children playing.",
    "example_cht": "遊樂場裡到處都是開心玩耍的小朋友。"
  },
  {
    "id": 351,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "post office",
    "meaning_cht": "郵局",
    "example_en": "We mail packages at the busy post office.",
    "example_cht": "我們在忙碌的郵局寄包裹。"
  },
  {
    "id": 352,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "restaurant",
    "meaning_cht": "餐廳",
    "example_en": "We eat yummy food at our favorite restaurant.",
    "example_cht": "我們在最喜歡的餐廳吃好好吃的東西。"
  },
  {
    "id": 353,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "road",
    "meaning_cht": "道路",
    "example_en": "The road curves like a long snake.",
    "example_cht": "那條路彎彎曲曲像一條長蛇。"
  },
  {
    "id": 354,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "shop",
    "meaning_cht": "商店",
    "example_en": "We shop for groceries every Saturday morning.",
    "example_cht": "我們每個星期六早上去買菜和生活用品。"
  },
  {
    "id": 355,
    "section_id": 14,
    "part_of_speech_id": 2,
    "word": "shop",
    "meaning_cht": "購物",
    "example_en": "I love to shop for books at the bookstore.",
    "example_cht": "我最愛去書店買書。"
  },
  {
    "id": 356,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "sidewalk",
    "meaning_cht": "人行道",
    "example_en": "I ride my scooter on the smooth sidewalk.",
    "example_cht": "我在平平滑滑的人行道上騎滑板車。"
  },
  {
    "id": 357,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "station",
    "meaning_cht": "車站",
    "example_en": "We wait for the train at the station.",
    "example_cht": "我們在車站等火車。"
  },
  {
    "id": 358,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "store",
    "meaning_cht": "商店",
    "example_en": "We are buying apples at the store.",
    "example_cht": "我們現在去商店買蘋果。"
  },
  {
    "id": 359,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "street",
    "meaning_cht": "街道",
    "example_en": "Kids draw hearts with chalk on the street.",
    "example_cht": "小朋友在街上用粉筆畫愛心。"
  },
  {
    "id": 360,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "theater",
    "meaning_cht": "劇院",
    "example_en": "We watch exciting plays at the big theater.",
    "example_cht": "我們在大劇院看刺激的表演。"
  },
  {
    "id": 361,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "town",
    "meaning_cht": "鎮",
    "example_en": "Our town has a tiny warm bakery.",
    "example_cht": "我們的小鎮有一家溫暖的小麵包店。"
  },
  {
    "id": 362,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "tunnel",
    "meaning_cht": "隧道",
    "example_en": "The train goes through the long dark tunnel.",
    "example_cht": "火車穿過又長又黑的隧道。"
  },
  {
    "id": 363,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "village",
    "meaning_cht": "村莊",
    "example_en": "The small village has friendly people and animals.",
    "example_cht": "小村莊裡的人和動物都很友善。"
  },
  {
    "id": 364,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "world",
    "meaning_cht": "世界",
    "example_en": "The whole world becomes a playground today.",
    "example_cht": "今天整個世界都變成遊樂場了。"
  },
  {
    "id": 365,
    "section_id": 14,
    "part_of_speech_id": 1,
    "word": "zoo",
    "meaning_cht": "動物園",
    "example_en": "We see many animals at the zoo.",
    "example_cht": "我們在動物園看到好多動物。"
  },
  {
    "id": 366,
    "section_id": 15,
    "part_of_speech_id": 1,
    "word": "autumn",
    "meaning_cht": "秋天",
    "example_en": "Autumn winds blow the colorful leaves around fast.",
    "example_cht": "秋天的風把彩色的葉子吹得飛來飛去。"
  },
  {
    "id": 367,
    "section_id": 15,
    "part_of_speech_id": 1,
    "word": "branch",
    "meaning_cht": "樹枝",
    "example_en": "The bird sits on a strong branch.",
    "example_cht": "小鳥坐在結實的樹枝上。"
  },
  {
    "id": 368,
    "section_id": 15,
    "part_of_speech_id": 1,
    "word": "cloud",
    "meaning_cht": "雲",
    "example_en": "A cloud is covering the sun.",
    "example_cht": "一朵雲現在把太陽遮住了。"
  },
  {
    "id": 369,
    "section_id": 15,
    "part_of_speech_id": 5,
    "word": "cloudy",
    "meaning_cht": "多雲的",
    "example_en": "On cloudy days I imagine shapes in the sky.",
    "example_cht": "多雲的日子裡，我在天空想像各種形狀。"
  },
  {
    "id": 370,
    "section_id": 15,
    "part_of_speech_id": 2,
    "word": "fall",
    "meaning_cht": "跌倒",
    "example_en": "I fall on the grass and giggle loudly.",
    "example_cht": "我跌在草地上，咯咯大笑。"
  },
  {
    "id": 371,
    "section_id": 15,
    "part_of_speech_id": 1,
    "word": "fall",
    "meaning_cht": "秋天",
    "example_en": "In fall the leaves turn red and gold.",
    "example_cht": "秋天時，樹葉會變紅變金。"
  },
  {
    "id": 372,
    "section_id": 15,
    "part_of_speech_id": 1,
    "word": "flower",
    "meaning_cht": "花",
    "example_en": "A flower opens in the warm sun.",
    "example_cht": "一朵花在暖暖的太陽下開了。"
  },
  {
    "id": 373,
    "section_id": 15,
    "part_of_speech_id": 1,
    "word": "grass",
    "meaning_cht": "草地",
    "example_en": "The grass tickles my bare feet softly.",
    "example_cht": "草輕輕地癢癢我的赤腳。"
  },
  {
    "id": 374,
    "section_id": 15,
    "part_of_speech_id": 1,
    "word": "ice",
    "meaning_cht": "冰",
    "example_en": "The ice melts in my warm hand.",
    "example_cht": "冰在我暖暖的手心裡慢慢融化。"
  },
  {
    "id": 375,
    "section_id": 15,
    "part_of_speech_id": 1,
    "word": "leaf",
    "meaning_cht": "葉子",
    "example_en": "A leaf lands on my head today.",
    "example_cht": "今天有一片葉子掉在我頭上。"
  },
  {
    "id": 376,
    "section_id": 15,
    "part_of_speech_id": 1,
    "word": "moon",
    "meaning_cht": "月亮",
    "example_en": "The moon follows our car back home.",
    "example_cht": "月亮跟著我們的車回家。"
  },
  {
    "id": 377,
    "section_id": 15,
    "part_of_speech_id": 1,
    "word": "nest",
    "meaning_cht": "巢",
    "example_en": "Baby birds sleep safe in their cozy nest.",
    "example_cht": "小鳥寶寶在溫暖的巢裡安心睡覺。"
  },
  {
    "id": 378,
    "section_id": 15,
    "part_of_speech_id": 1,
    "word": "plant",
    "meaning_cht": "植物",
    "example_en": "My plant needs water and bright light.",
    "example_cht": "我的植物需要水和明亮的光。"
  },
  {
    "id": 379,
    "section_id": 15,
    "part_of_speech_id": 1,
    "word": "rain",
    "meaning_cht": "雨",
    "example_en": "Rain taps on the roof all night.",
    "example_cht": "雨點整夜在屋頂上滴答滴答。"
  },
  {
    "id": 380,
    "section_id": 15,
    "part_of_speech_id": 1,
    "word": "rainbow",
    "meaning_cht": "彩虹",
    "example_en": "The rainbow is a bridge to the clouds.",
    "example_cht": "彩虹像一座通往雲朵的橋。"
  },
  {
    "id": 381,
    "section_id": 15,
    "part_of_speech_id": 5,
    "word": "rainy",
    "meaning_cht": "下雨的",
    "example_en": "On rainy days we splash in all puddles.",
    "example_cht": "下雨天我們在每個小水坑裡噗通噗通玩水。"
  },
  {
    "id": 382,
    "section_id": 15,
    "part_of_speech_id": 1,
    "word": "season",
    "meaning_cht": "季節",
    "example_en": "Summer is my favorite season of the year.",
    "example_cht": "夏天是一年中我最喜歡的季節。"
  },
  {
    "id": 383,
    "section_id": 15,
    "part_of_speech_id": 1,
    "word": "seed",
    "meaning_cht": "種子",
    "example_en": "I plant a seed in the soil.",
    "example_cht": "我在土裡種下一顆種子。"
  },
  {
    "id": 384,
    "section_id": 15,
    "part_of_speech_id": 1,
    "word": "shadow",
    "meaning_cht": "影子",
    "example_en": "Your shadow is like a dark twin that dances with you.",
    "example_cht": "你的影子像黑色的雙胞胎，跟著你一起跳舞。"
  },
  {
    "id": 385,
    "section_id": 15,
    "part_of_speech_id": 1,
    "word": "sky",
    "meaning_cht": "天空",
    "example_en": "The sky is a giant blue blanket.",
    "example_cht": "天空像一條巨大的藍色棉被。"
  },
  {
    "id": 386,
    "section_id": 15,
    "part_of_speech_id": 1,
    "word": "snow",
    "meaning_cht": "雪",
    "example_en": "Snow falls on my cold red nose.",
    "example_cht": "雪落在我冷冷紅紅的鼻尖上。"
  },
  {
    "id": 387,
    "section_id": 15,
    "part_of_speech_id": 5,
    "word": "snowy",
    "meaning_cht": "下雪的",
    "example_en": "The snowy morning looks like a white blanket.",
    "example_cht": "下雪的早晨像蓋上白色的大棉被。"
  },
  {
    "id": 388,
    "section_id": 15,
    "part_of_speech_id": 1,
    "word": "spring",
    "meaning_cht": "春天",
    "example_en": "Spring brings flowers and baby birds singing everywhere.",
    "example_cht": "春天帶來花朵和到處唱歌的小鳥。"
  },
  {
    "id": 389,
    "section_id": 15,
    "part_of_speech_id": 1,
    "word": "star",
    "meaning_cht": "星星",
    "example_en": "A star winks in the dark sky.",
    "example_cht": "一顆星星在黑夜的天空眨眼。"
  },
  {
    "id": 390,
    "section_id": 15,
    "part_of_speech_id": 1,
    "word": "stick",
    "meaning_cht": "棍子",
    "example_en": "This stick is my magic wand today.",
    "example_cht": "這根木棒今天就是我的魔法棒。"
  },
  {
    "id": 391,
    "section_id": 15,
    "part_of_speech_id": 2,
    "word": "stick",
    "meaning_cht": "黏貼",
    "example_en": "I stick the sticker on my notebook cover.",
    "example_cht": "我把貼紙貼在我的筆記本封面上。"
  },
  {
    "id": 392,
    "section_id": 15,
    "part_of_speech_id": 1,
    "word": "summer",
    "meaning_cht": "夏天",
    "example_en": "Summer is warm and good for swimming.",
    "example_cht": "夏天暖暖的，很適合去游泳。"
  },
  {
    "id": 393,
    "section_id": 15,
    "part_of_speech_id": 1,
    "word": "sun",
    "meaning_cht": "太陽",
    "example_en": "The sun paints the morning bright gold.",
    "example_cht": "太陽把早晨塗成亮金色。"
  },
  {
    "id": 394,
    "section_id": 15,
    "part_of_speech_id": 5,
    "word": "sunny",
    "meaning_cht": "晴朗的",
    "example_en": "The sunny day is perfect for playing outside.",
    "example_cht": "晴天最適合到外面玩。"
  },
  {
    "id": 395,
    "section_id": 15,
    "part_of_speech_id": 1,
    "word": "sunshine",
    "meaning_cht": "陽光",
    "example_en": "Sunshine pours down like liquid gold making everything glow!",
    "example_cht": "陽光像金色的水一直灑下來，讓一切都亮晶晶！"
  },
  {
    "id": 396,
    "section_id": 15,
    "part_of_speech_id": 1,
    "word": "tree",
    "meaning_cht": "樹",
    "example_en": "We read stories under the tall tree.",
    "example_cht": "我們在高高的大樹下說故事。"
  },
  {
    "id": 397,
    "section_id": 15,
    "part_of_speech_id": 1,
    "word": "weather",
    "meaning_cht": "天氣",
    "example_en": "The weather today is sunny and nice.",
    "example_cht": "今天天氣晴朗又舒服。"
  },
  {
    "id": 398,
    "section_id": 15,
    "part_of_speech_id": 1,
    "word": "wind",
    "meaning_cht": "風",
    "example_en": "The wind pushes my kite up high.",
    "example_cht": "風把我的風箏推得好高好高。"
  },
  {
    "id": 399,
    "section_id": 15,
    "part_of_speech_id": 5,
    "word": "windy",
    "meaning_cht": "有風的",
    "example_en": "The windy day makes my kite dance high.",
    "example_cht": "有風的日子讓我的風箏在天空跳舞。"
  },
  {
    "id": 400,
    "section_id": 15,
    "part_of_speech_id": 1,
    "word": "winter",
    "meaning_cht": "冬天",
    "example_en": "Winter snow makes the world look like magic.",
    "example_cht": "冬天的雪讓世界看起來像魔法一樣。"
  },
  {
    "id": 401,
    "section_id": 15,
    "part_of_speech_id": 1,
    "word": "wood",
    "meaning_cht": "木頭",
    "example_en": "The table is made of brown wood.",
    "example_cht": "這張桌子是用棕色的木頭做成的。"
  },
  {
    "id": 402,
    "section_id": 16,
    "part_of_speech_id": 1,
    "word": "air",
    "meaning_cht": "空氣",
    "example_en": "Air is invisible magic that keeps us alive.",
    "example_cht": "空氣是看不見的魔法，讓我們活著。"
  },
  {
    "id": 403,
    "section_id": 16,
    "part_of_speech_id": 1,
    "word": "cave",
    "meaning_cht": "洞穴",
    "example_en": "We explore the dark cave with our flashlight.",
    "example_cht": "我們拿著手電筒去探險黑黑的洞穴。"
  },
  {
    "id": 404,
    "section_id": 16,
    "part_of_speech_id": 1,
    "word": "desert",
    "meaning_cht": "沙漠",
    "example_en": "The hot desert has sand everywhere you look.",
    "example_cht": "熱熱的沙漠到處都是沙子。"
  },
  {
    "id": 405,
    "section_id": 16,
    "part_of_speech_id": 1,
    "word": "dirt",
    "meaning_cht": "泥土/灰塵",
    "example_en": "Dirt makes my knees turn all brown.",
    "example_cht": "土把我的膝蓋弄得咖啡色。"
  },
  {
    "id": 406,
    "section_id": 16,
    "part_of_speech_id": 1,
    "word": "earth",
    "meaning_cht": "地球/泥土",
    "example_en": "Our beautiful blue earth spins through space like marble.",
    "example_cht": "我們美麗的藍色地球像彈珠一樣在宇宙中轉呀轉。"
  },
  {
    "id": 407,
    "section_id": 16,
    "part_of_speech_id": 1,
    "word": "fire",
    "meaning_cht": "火",
    "example_en": "Fire dances and flickers like an orange playful dragon.",
    "example_cht": "火焰跳舞、閃呀閃，像橘色的調皮小龍。"
  },
  {
    "id": 408,
    "section_id": 16,
    "part_of_speech_id": 1,
    "word": "forest",
    "meaning_cht": "森林",
    "example_en": "The forest is full of tall trees.",
    "example_cht": "森林裡到處都是高高的樹。"
  },
  {
    "id": 409,
    "section_id": 16,
    "part_of_speech_id": 1,
    "word": "ground",
    "meaning_cht": "地面",
    "example_en": "I sit on the ground to draw.",
    "example_cht": "我坐在地上畫畫。"
  },
  {
    "id": 410,
    "section_id": 16,
    "part_of_speech_id": 1,
    "word": "hill",
    "meaning_cht": "小山丘",
    "example_en": "The gentle hill is perfect for racing down laughing!",
    "example_cht": "柔柔的小山坡最適合笑著往下滑。"
  },
  {
    "id": 411,
    "section_id": 16,
    "part_of_speech_id": 1,
    "word": "island",
    "meaning_cht": "島嶼",
    "example_en": "Blue water surrounds the tiny island.",
    "example_cht": "小小的島被藍藍的海水包圍。"
  },
  {
    "id": 412,
    "section_id": 16,
    "part_of_speech_id": 1,
    "word": "jungle",
    "meaning_cht": "叢林",
    "example_en": "In the jungle many animals live in trees.",
    "example_cht": "在叢林裡，很多動物住在樹上。"
  },
  {
    "id": 413,
    "section_id": 16,
    "part_of_speech_id": 1,
    "word": "lake",
    "meaning_cht": "湖",
    "example_en": "The calm lake reflects the mountains like a mirror.",
    "example_cht": "平靜的湖像鏡子，照出群山。"
  },
  {
    "id": 414,
    "section_id": 16,
    "part_of_speech_id": 1,
    "word": "mountain",
    "meaning_cht": "山",
    "example_en": "The mighty mountain touches the clouds like a giant.",
    "example_cht": "雄偉的高山像巨人一樣摸到雲朵。"
  },
  {
    "id": 415,
    "section_id": 16,
    "part_of_speech_id": 1,
    "word": "mud",
    "meaning_cht": "泥巴",
    "example_en": "Mud squishes fast between my bare toes.",
    "example_cht": "泥巴在我的赤腳趾間擠呀擠。"
  },
  {
    "id": 416,
    "section_id": 16,
    "part_of_speech_id": 1,
    "word": "ocean",
    "meaning_cht": "海洋",
    "example_en": "The vast ocean is home to whales and fish.",
    "example_cht": "寬廣的海洋是鯨魚和小魚的家。"
  },
  {
    "id": 417,
    "section_id": 16,
    "part_of_speech_id": 1,
    "word": "pond",
    "meaning_cht": "池塘",
    "example_en": "Frogs live in the small pond by the house.",
    "example_cht": "房子旁的小水塘裡住著青蛙。"
  },
  {
    "id": 418,
    "section_id": 16,
    "part_of_speech_id": 1,
    "word": "pool",
    "meaning_cht": "水池/泳池",
    "example_en": "The pool is a water playground with no swings.",
    "example_cht": "游泳池是沒有鞦韆的水上遊樂場。"
  },
  {
    "id": 419,
    "section_id": 16,
    "part_of_speech_id": 1,
    "word": "pool",
    "meaning_cht": "游泳池",
    "example_en": "We swim in the cool pool in summer.",
    "example_cht": "夏天我們在涼涼的泳池裡游泳。"
  },
  {
    "id": 420,
    "section_id": 16,
    "part_of_speech_id": 1,
    "word": "river",
    "meaning_cht": "河流",
    "example_en": "Rivers are roads that fish use to travel far.",
    "example_cht": "河流是魚兒旅行用的道路。"
  },
  {
    "id": 421,
    "section_id": 16,
    "part_of_speech_id": 1,
    "word": "rock",
    "meaning_cht": "石頭",
    "example_en": "I skip a rock across the water.",
    "example_cht": "我把石頭往水面一丟，它跳呀跳。"
  },
  {
    "id": 422,
    "section_id": 16,
    "part_of_speech_id": 1,
    "word": "sand",
    "meaning_cht": "沙子",
    "example_en": "Sand hides shells near the big waves.",
    "example_cht": "大浪旁的沙子藏著貝殼。"
  },
  {
    "id": 423,
    "section_id": 16,
    "part_of_speech_id": 1,
    "word": "sea",
    "meaning_cht": "海",
    "example_en": "The sea is where the sky goes to look.",
    "example_cht": "大海像是天空去照鏡子的地方。"
  },
  {
    "id": 424,
    "section_id": 16,
    "part_of_speech_id": 1,
    "word": "shell",
    "meaning_cht": "貝殼",
    "example_en": "I collect pretty shells by the bright sea.",
    "example_cht": "我在亮亮的海邊撿漂亮的貝殼。"
  },
  {
    "id": 425,
    "section_id": 16,
    "part_of_speech_id": 1,
    "word": "smoke",
    "meaning_cht": "煙",
    "example_en": "Smoke swirls up to the sky like gray ribbons.",
    "example_cht": "煙像灰色的絲帶向天空盤旋。"
  },
  {
    "id": 426,
    "section_id": 16,
    "part_of_speech_id": 1,
    "word": "stream",
    "meaning_cht": "小溪",
    "example_en": "The babbling stream flows over smooth stones.",
    "example_cht": "叮叮咚咚的小溪流過光滑的石頭。"
  },
  {
    "id": 427,
    "section_id": 16,
    "part_of_speech_id": 1,
    "word": "valley",
    "meaning_cht": "山谷",
    "example_en": "The green valley is nestled between tall mountains.",
    "example_cht": "綠綠的山谷躺在高山中間。"
  },
  {
    "id": 428,
    "section_id": 16,
    "part_of_speech_id": 1,
    "word": "waterfall",
    "meaning_cht": "瀑布",
    "example_en": "The waterfall crashes down making rainbows in mist.",
    "example_cht": "瀑布轟隆隆落下，在水霧裡畫出彩虹。"
  },
  {
    "id": 429,
    "section_id": 16,
    "part_of_speech_id": 2,
    "word": "wave",
    "meaning_cht": "揮手",
    "example_en": "I wave hello to the yellow bus.",
    "example_cht": "我向黃色的公車揮揮手說哈囉。"
  },
  {
    "id": 430,
    "section_id": 16,
    "part_of_speech_id": 1,
    "word": "wave",
    "meaning_cht": "波浪",
    "example_en": "Ocean waves crash loudly on the sandy shore.",
    "example_cht": "海浪在沙灘上大聲地拍打。"
  },
  {
    "id": 431,
    "section_id": 17,
    "part_of_speech_id": 1,
    "word": "cloth",
    "meaning_cht": "布料",
    "example_en": "The cloth dries fast in the warm sun.",
    "example_cht": "溫暖的太陽下，布很快就乾了。"
  },
  {
    "id": 432,
    "section_id": 17,
    "part_of_speech_id": 1,
    "word": "glass",
    "meaning_cht": "玻璃",
    "example_en": "The glass is clear and very hard.",
    "example_cht": "玻璃透明又很堅硬。"
  },
  {
    "id": 433,
    "section_id": 17,
    "part_of_speech_id": 1,
    "word": "metal",
    "meaning_cht": "金屬",
    "example_en": "The bell is metal and rings loudly.",
    "example_cht": "這個鈴鐺是金屬做的，聲音叮噹很大。"
  },
  {
    "id": 434,
    "section_id": 17,
    "part_of_speech_id": 1,
    "word": "plastic",
    "meaning_cht": "塑膠",
    "example_en": "Plastic blocks snap together so fast.",
    "example_cht": "塑膠積木「喀啦」一下就拼在一起。"
  },
  {
    "id": 435,
    "section_id": 17,
    "part_of_speech_id": 1,
    "word": "rope",
    "meaning_cht": "粗繩",
    "example_en": "The thick rope is strong enough to help climb!",
    "example_cht": "粗粗的繩子很結實，能幫我們往上爬！"
  },
  {
    "id": 436,
    "section_id": 17,
    "part_of_speech_id": 1,
    "word": "string",
    "meaning_cht": "細繩/線",
    "example_en": "The string connects earth to sky when it holds.",
    "example_cht": "拉著風箏線，像把地面和天空連在一起。"
  },
  {
    "id": 437,
    "section_id": 18,
    "part_of_speech_id": 2,
    "word": "begin",
    "meaning_cht": "開始",
    "example_en": "We begin our day with a happy song.",
    "example_cht": "我們用一首開心的歌開始一天。"
  },
  {
    "id": 438,
    "section_id": 18,
    "part_of_speech_id": 2,
    "word": "climb",
    "meaning_cht": "爬",
    "example_en": "I climb the tree like a little monkey.",
    "example_cht": "我像小猴子一樣爬上樹。"
  },
  {
    "id": 439,
    "section_id": 18,
    "part_of_speech_id": 2,
    "word": "come",
    "meaning_cht": "來",
    "example_en": "Please come play with me right now.",
    "example_cht": "請現在就來跟我一起玩。"
  },
  {
    "id": 440,
    "section_id": 18,
    "part_of_speech_id": 2,
    "word": "continue",
    "meaning_cht": "繼續",
    "example_en": "We continue reading where we left off yesterday.",
    "example_cht": "我們從昨天停下的地方繼續讀。"
  },
  {
    "id": 441,
    "section_id": 18,
    "part_of_speech_id": 1,
    "word": "end",
    "meaning_cht": "結束/盡頭",
    "example_en": "The end of the story makes me smile.",
    "example_cht": "故事的結尾讓我笑了。"
  },
  {
    "id": 442,
    "section_id": 18,
    "part_of_speech_id": 2,
    "word": "finish",
    "meaning_cht": "完成",
    "example_en": "I finish my drawing with bright stars.",
    "example_cht": "我用亮亮的星星完成我的畫。"
  },
  {
    "id": 443,
    "section_id": 18,
    "part_of_speech_id": 2,
    "word": "go",
    "meaning_cht": "去",
    "example_en": "Let's go find the secret magic door.",
    "example_cht": "我們一起去找神祕的魔法門吧。"
  },
  {
    "id": 444,
    "section_id": 18,
    "part_of_speech_id": 2,
    "word": "jump",
    "meaning_cht": "跳",
    "example_en": "I jump over puddles like a frog.",
    "example_cht": "我像青蛙一樣跳過水坑。"
  },
  {
    "id": 445,
    "section_id": 18,
    "part_of_speech_id": 1,
    "word": "jump",
    "meaning_cht": "跳躍",
    "example_en": "One big jump makes me laugh loudly.",
    "example_cht": "一大跳就讓我大笑出聲。"
  },
  {
    "id": 446,
    "section_id": 18,
    "part_of_speech_id": 2,
    "word": "leave",
    "meaning_cht": "離開",
    "example_en": "We leave footprints on the wet sand.",
    "example_cht": "我們在濕濕的沙上留下一串腳印。"
  },
  {
    "id": 447,
    "section_id": 18,
    "part_of_speech_id": 2,
    "word": "lie",
    "meaning_cht": "躺",
    "example_en": "I lie on my back making pictures from clouds.",
    "example_cht": "我仰躺著，用雲朵拼出各種圖案。"
  },
  {
    "id": 448,
    "section_id": 18,
    "part_of_speech_id": 1,
    "word": "lie",
    "meaning_cht": "謊言",
    "example_en": "A lie hurts more than the truth does.",
    "example_cht": "說謊比說實話更會傷人。"
  },
  {
    "id": 449,
    "section_id": 18,
    "part_of_speech_id": 2,
    "word": "lie",
    "meaning_cht": "說謊",
    "example_en": "I never lie because honesty is always important.",
    "example_cht": "我從不說謊，因為誠實永遠最重要。"
  },
  {
    "id": 450,
    "section_id": 18,
    "part_of_speech_id": 2,
    "word": "move",
    "meaning_cht": "移動",
    "example_en": "Watch how the sunflower moves following the sun.",
    "example_cht": "看，向日葵跟著太陽慢慢轉動。"
  },
  {
    "id": 451,
    "section_id": 18,
    "part_of_speech_id": 2,
    "word": "pause",
    "meaning_cht": "暫停",
    "example_en": "Let's pause the game for a snack break.",
    "example_cht": "我們先暫停遊戲，吃個點心吧。"
  },
  {
    "id": 452,
    "section_id": 18,
    "part_of_speech_id": 2,
    "word": "run",
    "meaning_cht": "跑",
    "example_en": "I run like the wind at playtime.",
    "example_cht": "玩耍時我跑得像風一樣快。"
  },
  {
    "id": 453,
    "section_id": 18,
    "part_of_speech_id": 1,
    "word": "run",
    "meaning_cht": "跑步",
    "example_en": "Our run around the park was fun.",
    "example_cht": "我們繞著公園跑一圈，超好玩。"
  },
  {
    "id": 454,
    "section_id": 18,
    "part_of_speech_id": 2,
    "word": "sit",
    "meaning_cht": "坐",
    "example_en": "We sit together and share our snacks.",
    "example_cht": "我們坐在一起分享點心。"
  },
  {
    "id": 455,
    "section_id": 18,
    "part_of_speech_id": 2,
    "word": "skip",
    "meaning_cht": "跳躍",
    "example_en": "I skip to school with a big smile.",
    "example_cht": "我一路跳跳跳、笑著去上學。"
  },
  {
    "id": 456,
    "section_id": 18,
    "part_of_speech_id": 2,
    "word": "slip",
    "meaning_cht": "滑倒",
    "example_en": "Be careful not to slip on the wet floor.",
    "example_cht": "小心，地板濕濕的，別滑倒了。"
  },
  {
    "id": 457,
    "section_id": 18,
    "part_of_speech_id": 2,
    "word": "stand",
    "meaning_cht": "站",
    "example_en": "I stand tall like a big tree.",
    "example_cht": "我站得直直的，像一棵大樹。"
  },
  {
    "id": 458,
    "section_id": 18,
    "part_of_speech_id": 2,
    "word": "start",
    "meaning_cht": "開始",
    "example_en": "We start the game at ten today.",
    "example_cht": "我們今天十點開始遊戲。"
  },
  {
    "id": 459,
    "section_id": 18,
    "part_of_speech_id": 2,
    "word": "stay",
    "meaning_cht": "待/保持",
    "example_en": "I stay in bed when I'm sick.",
    "example_cht": "我生病時會待在床上休息。"
  },
  {
    "id": 460,
    "section_id": 18,
    "part_of_speech_id": 2,
    "word": "stay",
    "meaning_cht": "停留",
    "example_en": "Stay a little longer; the fun isn't over yet.",
    "example_cht": "再多待一下下——好玩的還沒結束呢。"
  },
  {
    "id": 461,
    "section_id": 18,
    "part_of_speech_id": 2,
    "word": "stop",
    "meaning_cht": "停止",
    "example_en": "Cars stop at the red light now.",
    "example_cht": "紅燈亮了，車子就要停下來。"
  },
  {
    "id": 462,
    "section_id": 18,
    "part_of_speech_id": 1,
    "word": "stop",
    "meaning_cht": "停止點",
    "example_en": "The bus stop is where trips begin.",
    "example_cht": "公車站是旅行的起點。"
  },
  {
    "id": 463,
    "section_id": 18,
    "part_of_speech_id": 1,
    "word": "trip",
    "meaning_cht": "旅行",
    "example_en": "We go on a trip to find mermaids at the beach!",
    "example_cht": "我們去海邊旅行尋找美人魚!"
  },
  {
    "id": 464,
    "section_id": 18,
    "part_of_speech_id": 2,
    "word": "trip",
    "meaning_cht": "絆倒",
    "example_en": "I trip over the rock on the path.",
    "example_cht": "我在小路上被石頭絆了一下。"
  },
  {
    "id": 465,
    "section_id": 18,
    "part_of_speech_id": 2,
    "word": "walk",
    "meaning_cht": "走路/散步",
    "example_en": "We walk to school holding hands tight.",
    "example_cht": "我們牽緊手一起走路上學。"
  },
  {
    "id": 466,
    "section_id": 19,
    "part_of_speech_id": 2,
    "word": "bring",
    "meaning_cht": "帶來",
    "example_en": "Please bring your teddy to class today.",
    "example_cht": "今天請把你的泰迪熊帶到教室來。"
  },
  {
    "id": 467,
    "section_id": 19,
    "part_of_speech_id": 2,
    "word": "carry",
    "meaning_cht": "搬/攜帶",
    "example_en": "I carry my backpack all by myself.",
    "example_cht": "我的書包我自己背。"
  },
  {
    "id": 468,
    "section_id": 19,
    "part_of_speech_id": 2,
    "word": "carry",
    "meaning_cht": "搬運",
    "example_en": "I carry my dreams in my pocket wherever I go.",
    "example_cht": "我把小小的夢想裝在口袋，走到哪裡都帶著。"
  },
  {
    "id": 469,
    "section_id": 19,
    "part_of_speech_id": 2,
    "word": "catch",
    "meaning_cht": "接住",
    "example_en": "I catch the ball with both hands.",
    "example_cht": "我用雙手把球接住。"
  },
  {
    "id": 470,
    "section_id": 19,
    "part_of_speech_id": 2,
    "word": "clap",
    "meaning_cht": "拍手",
    "example_en": "I clap my hands when I'm happy today.",
    "example_cht": "我今天開心就拍拍手。"
  },
  {
    "id": 471,
    "section_id": 19,
    "part_of_speech_id": 2,
    "word": "close",
    "meaning_cht": "關閉",
    "example_en": "I close the book so the characters can rest.",
    "example_cht": "我把書闔上,讓裡面的角色可以休息。"
  },
  {
    "id": 472,
    "section_id": 19,
    "part_of_speech_id": 2,
    "word": "drop",
    "meaning_cht": "掉落",
    "example_en": "I drop the ball by accident.",
    "example_cht": "我不小心把球掉了。"
  },
  {
    "id": 473,
    "section_id": 19,
    "part_of_speech_id": 2,
    "word": "fold",
    "meaning_cht": "摺疊",
    "example_en": "I fold the paper into a tiny boat.",
    "example_cht": "我把紙折成一艘小小船。"
  },
  {
    "id": 474,
    "section_id": 19,
    "part_of_speech_id": 2,
    "word": "give",
    "meaning_cht": "給予",
    "example_en": "I give my friend a yummy cookie.",
    "example_cht": "我分給朋友一片好吃的餅乾。"
  },
  {
    "id": 475,
    "section_id": 19,
    "part_of_speech_id": 2,
    "word": "grab",
    "meaning_cht": "抓住",
    "example_en": "Grab the rope before you fall down!",
    "example_cht": "快抓住繩子，別跌倒了！"
  },
  {
    "id": 476,
    "section_id": 19,
    "part_of_speech_id": 2,
    "word": "hold",
    "meaning_cht": "握住/拿著",
    "example_en": "I hold the rope tight with my hands.",
    "example_cht": "我用手緊緊抓著繩子。"
  },
  {
    "id": 477,
    "section_id": 19,
    "part_of_speech_id": 2,
    "word": "kick",
    "meaning_cht": "踢",
    "example_en": "I kick the ball hard toward you.",
    "example_cht": "我用力把球踢向你。"
  },
  {
    "id": 478,
    "section_id": 19,
    "part_of_speech_id": 2,
    "word": "lift",
    "meaning_cht": "舉起",
    "example_en": "I lift the heavy box with my arms.",
    "example_cht": "我用雙臂把重重的箱子抬起來。"
  },
  {
    "id": 479,
    "section_id": 19,
    "part_of_speech_id": 2,
    "word": "open",
    "meaning_cht": "打開",
    "example_en": "I open the treasure chest and find shiny coins!",
    "example_cht": "我打開寶箱,發現里面有亮晶晶的金幣!"
  },
  {
    "id": 480,
    "section_id": 19,
    "part_of_speech_id": 2,
    "word": "pick",
    "meaning_cht": "撿/採",
    "example_en": "I pick flowers for Mom in the garden.",
    "example_cht": "我在花園裡採花送給媽媽。"
  },
  {
    "id": 481,
    "section_id": 19,
    "part_of_speech_id": 2,
    "word": "point",
    "meaning_cht": "指向",
    "example_en": "I point out all the fun that others miss.",
    "example_cht": "我指給大家看那些被錯過的有趣小事。"
  },
  {
    "id": 482,
    "section_id": 19,
    "part_of_speech_id": 2,
    "word": "pull",
    "meaning_cht": "拉",
    "example_en": "We pull the wagon up the hill.",
    "example_cht": "我們把小拖車拉上小山坡。"
  },
  {
    "id": 483,
    "section_id": 19,
    "part_of_speech_id": 2,
    "word": "push",
    "meaning_cht": "推",
    "example_en": "I push the swing up to the sky.",
    "example_cht": "我把鞦韆推得高高的，快碰到天空。"
  },
  {
    "id": 484,
    "section_id": 19,
    "part_of_speech_id": 2,
    "word": "put",
    "meaning_cht": "放置",
    "example_en": "I put my toys in the big box.",
    "example_cht": "我把玩具放進大箱子裡。"
  },
  {
    "id": 485,
    "section_id": 19,
    "part_of_speech_id": 2,
    "word": "shake",
    "meaning_cht": "搖動",
    "example_en": "I shake the tree and apples fall down.",
    "example_cht": "我搖搖樹，蘋果就咚咚掉下來。"
  },
  {
    "id": 486,
    "section_id": 19,
    "part_of_speech_id": 2,
    "word": "squeeze",
    "meaning_cht": "擠",
    "example_en": "I squeeze the lemon to make fresh juice.",
    "example_cht": "我擠檸檬做新鮮的果汁。"
  },
  {
    "id": 487,
    "section_id": 19,
    "part_of_speech_id": 2,
    "word": "take",
    "meaning_cht": "拿走/取",
    "example_en": "I take a good book to school.",
    "example_cht": "我帶一本好書去上學。"
  },
  {
    "id": 488,
    "section_id": 19,
    "part_of_speech_id": 2,
    "word": "throw",
    "meaning_cht": "拋/丟",
    "example_en": "I throw the ball high to dad.",
    "example_cht": "我把球高高地丟給爸爸。"
  },
  {
    "id": 489,
    "section_id": 19,
    "part_of_speech_id": 2,
    "word": "throw",
    "meaning_cht": "丟擲",
    "example_en": "I throw my ball to the sky hoping to catch it.",
    "example_cht": "我把球丟向天空，希望再把它接住。"
  },
  {
    "id": 490,
    "section_id": 19,
    "part_of_speech_id": 2,
    "word": "touch",
    "meaning_cht": "觸摸",
    "example_en": "Touch the bark and feel the tree's story.",
    "example_cht": "摸摸樹皮，感覺樹在說故事。"
  },
  {
    "id": 491,
    "section_id": 20,
    "part_of_speech_id": 2,
    "word": "feel",
    "meaning_cht": "感覺",
    "example_en": "I feel the earth moving beneath my dancing feet.",
    "example_cht": "我在跳舞的腳下，感覺大地在微微動。"
  },
  {
    "id": 492,
    "section_id": 20,
    "part_of_speech_id": 2,
    "word": "hear",
    "meaning_cht": "聽到",
    "example_en": "I hear the bell ring at noon.",
    "example_cht": "我聽到中午的鐘聲響起。"
  },
  {
    "id": 493,
    "section_id": 20,
    "part_of_speech_id": 2,
    "word": "listen",
    "meaning_cht": "聽",
    "example_en": "I am listening to the teacher read.",
    "example_cht": "我現在專心聽老師唸故事。"
  },
  {
    "id": 494,
    "section_id": 20,
    "part_of_speech_id": 2,
    "word": "listen",
    "meaning_cht": "聆聽",
    "example_en": "I listen carefully to the teacher's important words.",
    "example_cht": "我仔細聽老師說的重要話。"
  },
  {
    "id": 495,
    "section_id": 20,
    "part_of_speech_id": 2,
    "word": "look",
    "meaning_cht": "看/樣子",
    "example_en": "Look! A tiny bug is dancing now.",
    "example_cht": "你看！一隻小小蟲正在跳舞。"
  },
  {
    "id": 496,
    "section_id": 20,
    "part_of_speech_id": 6,
    "word": "look at",
    "meaning_cht": "看著",
    "example_en": "Look at the big blue whale swim.",
    "example_cht": "看那隻大大的藍鯨在游泳。"
  },
  {
    "id": 497,
    "section_id": 20,
    "part_of_speech_id": 2,
    "word": "see",
    "meaning_cht": "看見",
    "example_en": "I see a rainbow over our house.",
    "example_cht": "我看見彩虹掛在我們家上方。"
  },
  {
    "id": 498,
    "section_id": 20,
    "part_of_speech_id": 1,
    "word": "smell",
    "meaning_cht": "氣味",
    "example_en": "The smell of soup makes me hungry.",
    "example_cht": "湯的香味讓我肚子咕嚕叫。"
  },
  {
    "id": 499,
    "section_id": 20,
    "part_of_speech_id": 2,
    "word": "smell",
    "meaning_cht": "聞",
    "example_en": "Stop and smell the roses - they're nice and free.",
    "example_cht": "停下來聞聞玫瑰吧——香香的又不用錢。"
  },
  {
    "id": 500,
    "section_id": 20,
    "part_of_speech_id": 1,
    "word": "taste",
    "meaning_cht": "味道",
    "example_en": "The taste of mango is so sweet.",
    "example_cht": "芒果的味道好甜好好吃。"
  },
  {
    "id": 501,
    "section_id": 20,
    "part_of_speech_id": 2,
    "word": "taste",
    "meaning_cht": "嚐",
    "example_en": "I taste adventures on my tongue when eating.",
    "example_cht": "我吃東西時，舌頭像在旅行探險。"
  },
  {
    "id": 502,
    "section_id": 20,
    "part_of_speech_id": 2,
    "word": "watch",
    "meaning_cht": "觀看",
    "example_en": "We watch a snail cross the path.",
    "example_cht": "我們看著一隻蝸牛慢慢爬過小路。"
  },
  {
    "id": 503,
    "section_id": 21,
    "part_of_speech_id": 2,
    "word": "answer",
    "meaning_cht": "回答",
    "example_en": "The echo answers back when I shout loud.",
    "example_cht": "我大聲喊，回音就回我話。"
  },
  {
    "id": 504,
    "section_id": 21,
    "part_of_speech_id": 1,
    "word": "answer",
    "meaning_cht": "答案",
    "example_en": "The answer was hidden inside the cookie waiting!",
    "example_cht": "答案躲在餅乾裡等著被發現！"
  },
  {
    "id": 505,
    "section_id": 21,
    "part_of_speech_id": 2,
    "word": "ask",
    "meaning_cht": "問",
    "example_en": "I ask the teacher for some help.",
    "example_cht": "我請老師幫我一下。"
  },
  {
    "id": 506,
    "section_id": 21,
    "part_of_speech_id": 2,
    "word": "call",
    "meaning_cht": "呼叫/打電話",
    "example_en": "When I call the butterflies they come visit me.",
    "example_cht": "我呼喚蝴蝶時，它們就來看我。"
  },
  {
    "id": 507,
    "section_id": 21,
    "part_of_speech_id": 2,
    "word": "chat",
    "meaning_cht": "聊天",
    "example_en": "I chat with my friends about our day.",
    "example_cht": "我跟朋友聊聊今天發生的事。"
  },
  {
    "id": 508,
    "section_id": 21,
    "part_of_speech_id": 1,
    "word": "cry",
    "meaning_cht": "哭泣",
    "example_en": "A cry can bring a gentle hug.",
    "example_cht": "哭一哭，有時就會得到溫柔的擁抱。"
  },
  {
    "id": 509,
    "section_id": 21,
    "part_of_speech_id": 1,
    "word": "laugh",
    "meaning_cht": "笑聲",
    "example_en": "Her laugh sounds like ringing bells now.",
    "example_cht": "她的笑聲像鈴鐺一樣叮叮噹噹。"
  },
  {
    "id": 510,
    "section_id": 21,
    "part_of_speech_id": 2,
    "word": "laugh",
    "meaning_cht": "大笑",
    "example_en": "We laugh loudly at silly funny jokes.",
    "example_cht": "我們對傻傻的笑話笑得好大聲。"
  },
  {
    "id": 511,
    "section_id": 21,
    "part_of_speech_id": 2,
    "word": "reply",
    "meaning_cht": "回答",
    "example_en": "I reply quickly when the teacher asks a question.",
    "example_cht": "老師發問時，我很快就回答。"
  },
  {
    "id": 512,
    "section_id": 21,
    "part_of_speech_id": 2,
    "word": "say",
    "meaning_cht": "說",
    "example_en": "I say good morning to the bird.",
    "example_cht": "我跟小鳥說早安。"
  },
  {
    "id": 513,
    "section_id": 21,
    "part_of_speech_id": 2,
    "word": "scream",
    "meaning_cht": "尖叫",
    "example_en": "We scream on the fast fun slide.",
    "example_cht": "我們在又快又好玩的溜滑梯上尖叫。"
  },
  {
    "id": 514,
    "section_id": 21,
    "part_of_speech_id": 2,
    "word": "shout",
    "meaning_cht": "大喊",
    "example_en": "I shout hooray for my team!",
    "example_cht": "我大喊「耶！」為我的隊伍加油。"
  },
  {
    "id": 515,
    "section_id": 21,
    "part_of_speech_id": 2,
    "word": "sing",
    "meaning_cht": "唱歌",
    "example_en": "Birds sing in the tall green tree.",
    "example_cht": "小鳥在高高的綠樹上唱歌。"
  },
  {
    "id": 516,
    "section_id": 21,
    "part_of_speech_id": 1,
    "word": "smile",
    "meaning_cht": "微笑",
    "example_en": "Your smile makes my day so bright.",
    "example_cht": "你的笑容讓我今天亮晶晶。"
  },
  {
    "id": 517,
    "section_id": 21,
    "part_of_speech_id": 1,
    "word": "speak",
    "meaning_cht": "說話",
    "example_en": "Actions speak louder than words but kindness speaks best.",
    "example_cht": "行動比話更有力，但善良說得最好。"
  },
  {
    "id": 518,
    "section_id": 21,
    "part_of_speech_id": 2,
    "word": "talk",
    "meaning_cht": "說話",
    "example_en": "We talk about our pets at circle time.",
    "example_cht": "圈圈時間裡我們聊聊自己的寵物。"
  },
  {
    "id": 519,
    "section_id": 21,
    "part_of_speech_id": 2,
    "word": "tell",
    "meaning_cht": "告訴",
    "example_en": "Please tell me a bedtime story now.",
    "example_cht": "現在請講一個睡前故事給我聽。"
  },
  {
    "id": 520,
    "section_id": 21,
    "part_of_speech_id": 2,
    "word": "whisper",
    "meaning_cht": "低語",
    "example_en": "We whisper secrets in the dark room.",
    "example_cht": "我們在暗暗的房間裡悄悄說祕密。"
  },
  {
    "id": 521,
    "section_id": 22,
    "part_of_speech_id": 2,
    "word": "believe",
    "meaning_cht": "相信",
    "example_en": "Believing in yourself gives you wings to fly higher!",
    "example_cht": "相信自己就像長出翅膀，飛得更高！"
  },
  {
    "id": 522,
    "section_id": 22,
    "part_of_speech_id": 1,
    "word": "dream",
    "meaning_cht": "夢",
    "example_en": "I had a dream about flying high.",
    "example_cht": "我做了一個飛得好高的夢。"
  },
  {
    "id": 523,
    "section_id": 22,
    "part_of_speech_id": 2,
    "word": "dream",
    "meaning_cht": "做夢",
    "example_en": "When I dream, I visit magical kingdoms full of fun!",
    "example_cht": "我做夢時會去超好玩的魔法王國。"
  },
  {
    "id": 524,
    "section_id": 22,
    "part_of_speech_id": 2,
    "word": "forget",
    "meaning_cht": "忘記",
    "example_en": "Sometimes I forget things, and they float away like clouds!",
    "example_cht": "有時我會忘記事情，好像它們變成雲飄走了！"
  },
  {
    "id": 525,
    "section_id": 22,
    "part_of_speech_id": 2,
    "word": "guess",
    "meaning_cht": "猜測",
    "example_en": "Guessing is like reaching into a mystery bag for a surprise!",
    "example_cht": "猜一猜就像把手伸進神祕袋，等著驚喜！"
  },
  {
    "id": 526,
    "section_id": 22,
    "part_of_speech_id": 2,
    "word": "hope",
    "meaning_cht": "希望",
    "example_en": "Hope is like a tiny star that keeps shining.",
    "example_cht": "希望像一顆小小星星，會一直發光。"
  },
  {
    "id": 527,
    "section_id": 22,
    "part_of_speech_id": 1,
    "word": "idea",
    "meaning_cht": "想法",
    "example_en": "His brilliant idea was so bright it lit the room.",
    "example_cht": "他的好點子亮到像把房間都照亮了。"
  },
  {
    "id": 528,
    "section_id": 22,
    "part_of_speech_id": 2,
    "word": "imagine",
    "meaning_cht": "想像",
    "example_en": "I imagine I can fly like a bird.",
    "example_cht": "我想像自己能像小鳥一樣飛。"
  },
  {
    "id": 529,
    "section_id": 22,
    "part_of_speech_id": 2,
    "word": "know",
    "meaning_cht": "知道",
    "example_en": "I know my name and my age.",
    "example_cht": "我知道自己的名字和年紀。"
  },
  {
    "id": 530,
    "section_id": 22,
    "part_of_speech_id": 2,
    "word": "pretend",
    "meaning_cht": "假裝",
    "example_en": "Pretending turns ordinary days into extraordinary adventures with dragons!",
    "example_cht": "假裝遊戲把普通的一天變成和龍一起的大冒險！"
  },
  {
    "id": 531,
    "section_id": 22,
    "part_of_speech_id": 1,
    "word": "question",
    "meaning_cht": "問題",
    "example_en": "I have a question about the story.",
    "example_cht": "這個故事我有一個問題。"
  },
  {
    "id": 532,
    "section_id": 22,
    "part_of_speech_id": 2,
    "word": "remember",
    "meaning_cht": "記得",
    "example_en": "I remember happy moments like collecting precious gem memories.",
    "example_cht": "我把快樂的時刻一顆顆收藏，像珍貴的寶石一樣。"
  },
  {
    "id": 533,
    "section_id": 22,
    "part_of_speech_id": 2,
    "word": "think",
    "meaning_cht": "想",
    "example_en": "I think the cloud is a big ship.",
    "example_cht": "我覺得那朵雲像一艘大船。"
  },
  {
    "id": 534,
    "section_id": 22,
    "part_of_speech_id": 2,
    "word": "think",
    "meaning_cht": "思考",
    "example_en": "I think the clouds are having fun today.",
    "example_cht": "我覺得今天的雲在玩遊戲。"
  },
  {
    "id": 535,
    "section_id": 22,
    "part_of_speech_id": 2,
    "word": "wish",
    "meaning_cht": "希望/許願",
    "example_en": "Every wish is a little seed that might grow!",
    "example_cht": "每個願望都是一顆可能長大的小種子！"
  },
  {
    "id": 536,
    "section_id": 22,
    "part_of_speech_id": 1,
    "word": "wish",
    "meaning_cht": "願望",
    "example_en": "My birthday wish is for world peace and happiness.",
    "example_cht": "我生日的願望是世界平安快樂。"
  },
  {
    "id": 537,
    "section_id": 22,
    "part_of_speech_id": 2,
    "word": "wonder",
    "meaning_cht": "想知道",
    "example_en": "I wonder what's inside that mysterious wrapped box.",
    "example_cht": "我好奇那個神祕包裝的盒子裡有什麼。"
  },
  {
    "id": 538,
    "section_id": 23,
    "part_of_speech_id": 2,
    "word": "build",
    "meaning_cht": "建造/建立",
    "example_en": "We build a castle with blocks.",
    "example_cht": "我們用積木蓋城堡。"
  },
  {
    "id": 539,
    "section_id": 23,
    "part_of_speech_id": 2,
    "word": "create",
    "meaning_cht": "創造",
    "example_en": "We create art from recycled things we find.",
    "example_cht": "我們用回收來的東西做藝術品。"
  },
  {
    "id": 540,
    "section_id": 23,
    "part_of_speech_id": 2,
    "word": "dance",
    "meaning_cht": "跳舞",
    "example_en": "Leaves dance in the fall cool wind.",
    "example_cht": "葉子在涼涼的秋風裡跳舞。"
  },
  {
    "id": 541,
    "section_id": 23,
    "part_of_speech_id": 1,
    "word": "dance",
    "meaning_cht": "舞蹈",
    "example_en": "The dance at school was so fun.",
    "example_cht": "學校的舞會超級好玩。"
  },
  {
    "id": 542,
    "section_id": 23,
    "part_of_speech_id": 2,
    "word": "invent",
    "meaning_cht": "發明",
    "example_en": "I want to invent a machine that flies.",
    "example_cht": "我想發明一台會飛的機器。"
  },
  {
    "id": 543,
    "section_id": 23,
    "part_of_speech_id": 2,
    "word": "make",
    "meaning_cht": "製作/做",
    "example_en": "We make a tower with colorful blocks.",
    "example_cht": "我們用彩色積木搭一座高塔。"
  },
  {
    "id": 544,
    "section_id": 24,
    "part_of_speech_id": 1,
    "word": "bath",
    "meaning_cht": "洗澡",
    "example_en": "Bath time is fun with rubber ducky toys.",
    "example_cht": "洗澡時間有小黃鴨就更好玩。"
  },
  {
    "id": 545,
    "section_id": 24,
    "part_of_speech_id": 1,
    "word": "brush",
    "meaning_cht": "刷子/梳子",
    "example_en": "I brush my hair before going to school.",
    "example_cht": "上學前我先梳頭髮。"
  },
  {
    "id": 546,
    "section_id": 24,
    "part_of_speech_id": 2,
    "word": "brush",
    "meaning_cht": "刷/梳",
    "example_en": "I brush my teeth to keep them shiny.",
    "example_cht": "我刷牙讓牙齒亮晶晶。"
  },
  {
    "id": 547,
    "section_id": 24,
    "part_of_speech_id": 5,
    "word": "clean",
    "meaning_cht": "乾淨的",
    "example_en": "My hands are clean after I use soap.",
    "example_cht": "我用肥皂洗手後，手就乾淨了。"
  },
  {
    "id": 548,
    "section_id": 24,
    "part_of_speech_id": 2,
    "word": "clean",
    "meaning_cht": "清潔",
    "example_en": "I clean my desk before art time.",
    "example_cht": "美術時間前，我先把桌子整理乾淨。"
  },
  {
    "id": 549,
    "section_id": 24,
    "part_of_speech_id": 1,
    "word": "exercise",
    "meaning_cht": "運動/練習",
    "example_en": "Daily exercise keeps our bodies strong and healthy.",
    "example_cht": "每天動一動，身體就會強壯又健康。"
  },
  {
    "id": 550,
    "section_id": 24,
    "part_of_speech_id": 1,
    "word": "nap",
    "meaning_cht": "小睡",
    "example_en": "A short nap helps me feel fresh again.",
    "example_cht": "睡個小午覺，精神又回來了。"
  },
  {
    "id": 551,
    "section_id": 24,
    "part_of_speech_id": 2,
    "word": "practice",
    "meaning_cht": "練習",
    "example_en": "I practice piano every day after school time.",
    "example_cht": "我每天放學後都練鋼琴。"
  },
  {
    "id": 552,
    "section_id": 24,
    "part_of_speech_id": 1,
    "word": "rest",
    "meaning_cht": "休息",
    "example_en": "I rest under a shady green tree.",
    "example_cht": "我在有陰影的綠樹下休息。"
  },
  {
    "id": 553,
    "section_id": 24,
    "part_of_speech_id": 1,
    "word": "sleep",
    "meaning_cht": "睡覺",
    "example_en": "Good sleep helps my brain grow smart.",
    "example_cht": "睡得好，腦袋就會越來越聰明。"
  },
  {
    "id": 554,
    "section_id": 24,
    "part_of_speech_id": 2,
    "word": "try",
    "meaning_cht": "嘗試",
    "example_en": "I try again and do much better.",
    "example_cht": "我再試一次，就更厲害了。"
  },
  {
    "id": 555,
    "section_id": 24,
    "part_of_speech_id": 6,
    "word": "wake up",
    "meaning_cht": "醒來",
    "example_en": "I wake up when the sun shines.",
    "example_cht": "太陽照進來時我就起床。"
  },
  {
    "id": 556,
    "section_id": 24,
    "part_of_speech_id": 2,
    "word": "wash",
    "meaning_cht": "清洗",
    "example_en": "I wash my hands with soapy bubbles.",
    "example_cht": "我用泡泡把手洗乾淨。"
  },
  {
    "id": 557,
    "section_id": 24,
    "part_of_speech_id": 1,
    "word": "work",
    "meaning_cht": "工作/勞動",
    "example_en": "Building a fort is serious fun work.",
    "example_cht": "蓋堡壘是很認真又很有趣的工作。"
  },
  {
    "id": 558,
    "section_id": 24,
    "part_of_speech_id": 2,
    "word": "yawn",
    "meaning_cht": "打哈欠",
    "example_en": "I yawn when it's time for bed now.",
    "example_cht": "到睡覺時間了，我開始打呵欠。"
  },
  {
    "id": 559,
    "section_id": 25,
    "part_of_speech_id": 2,
    "word": "borrow",
    "meaning_cht": "借",
    "example_en": "May I borrow your red crayon for a moment?",
    "example_cht": "我可以借用一下你的紅色蠟筆嗎？"
  },
  {
    "id": 560,
    "section_id": 25,
    "part_of_speech_id": 2,
    "word": "fight",
    "meaning_cht": "打架/戰鬥",
    "example_en": "Friends should talk not fight with words.",
    "example_cht": "朋友應該好好說，而不是用吵架的「話打架」。"
  },
  {
    "id": 561,
    "section_id": 25,
    "part_of_speech_id": 2,
    "word": "follow",
    "meaning_cht": "跟隨",
    "example_en": "I follow the path that leads to home.",
    "example_cht": "我順著這條路走，就能到家。"
  },
  {
    "id": 562,
    "section_id": 25,
    "part_of_speech_id": 2,
    "word": "help",
    "meaning_cht": "幫助",
    "example_en": "I help my friend tie their shoes.",
    "example_cht": "我幫朋友把鞋帶綁好。"
  },
  {
    "id": 563,
    "section_id": 25,
    "part_of_speech_id": 2,
    "word": "join",
    "meaning_cht": "加入",
    "example_en": "Please join us for a fun game outside.",
    "example_cht": "請一起來外面玩有趣的遊戲。"
  },
  {
    "id": 564,
    "section_id": 25,
    "part_of_speech_id": 2,
    "word": "lead",
    "meaning_cht": "領導",
    "example_en": "The teacher leads us on a nature walk.",
    "example_cht": "老師帶我們去大自然散步。"
  },
  {
    "id": 565,
    "section_id": 25,
    "part_of_speech_id": 2,
    "word": "lend",
    "meaning_cht": "借出",
    "example_en": "I lend my book to my friend today.",
    "example_cht": "我今天把我的書借給朋友。"
  },
  {
    "id": 566,
    "section_id": 25,
    "part_of_speech_id": 2,
    "word": "meet",
    "meaning_cht": "遇見/見面",
    "example_en": "I meet my friends at the park.",
    "example_cht": "我在公園和朋友碰面。"
  },
  {
    "id": 567,
    "section_id": 25,
    "part_of_speech_id": 2,
    "word": "obey",
    "meaning_cht": "服從",
    "example_en": "I obey my parents because they keep me safe.",
    "example_cht": "我聽爸媽的話，因為他們會保護我。"
  },
  {
    "id": 568,
    "section_id": 25,
    "part_of_speech_id": 2,
    "word": "return",
    "meaning_cht": "歸還",
    "example_en": "I always return the library book on time.",
    "example_cht": "我都準時把圖書館的書還回去。"
  },
  {
    "id": 569,
    "section_id": 25,
    "part_of_speech_id": 2,
    "word": "share",
    "meaning_cht": "分享",
    "example_en": "I share my toys with my little brother.",
    "example_cht": "我把玩具和弟弟一起分享。"
  },
  {
    "id": 570,
    "section_id": 25,
    "part_of_speech_id": 2,
    "word": "trade",
    "meaning_cht": "交換",
    "example_en": "Let's trade sandwiches at lunch time today.",
    "example_cht": "我們今天午餐交換三明治吧。"
  },
  {
    "id": 571,
    "section_id": 25,
    "part_of_speech_id": 2,
    "word": "visit",
    "meaning_cht": "拜訪",
    "example_en": "We visit grandma every Sunday for lunch together.",
    "example_cht": "我們每個星期天都去看奶奶，一起吃午餐。"
  },
  {
    "id": 572,
    "section_id": 26,
    "part_of_speech_id": 2,
    "word": "attach",
    "meaning_cht": "附上",
    "example_en": "I attach the string to my kite carefully.",
    "example_cht": "我小心把線綁在我的風箏上。"
  },
  {
    "id": 573,
    "section_id": 26,
    "part_of_speech_id": 2,
    "word": "break",
    "meaning_cht": "打破",
    "example_en": "I break the cookie in two halves.",
    "example_cht": "我把餅乾掰成兩半。"
  },
  {
    "id": 574,
    "section_id": 26,
    "part_of_speech_id": 2,
    "word": "change",
    "meaning_cht": "改變",
    "example_en": "Caterpillars change into butterflies wearing bright wings.",
    "example_cht": "毛毛蟲會變身成蝴蝶，穿上亮亮的翅膀。"
  },
  {
    "id": 575,
    "section_id": 26,
    "part_of_speech_id": 1,
    "word": "change",
    "meaning_cht": "零錢",
    "example_en": "The cashier gives me change after I pay.",
    "example_cht": "我付錢後，店員會找我零錢。"
  },
  {
    "id": 576,
    "section_id": 26,
    "part_of_speech_id": 2,
    "word": "combine",
    "meaning_cht": "結合",
    "example_en": "Combine red and blue to make purple color.",
    "example_cht": "把紅色和藍色合在一起會變成紫色。"
  },
  {
    "id": 577,
    "section_id": 26,
    "part_of_speech_id": 2,
    "word": "connect",
    "meaning_cht": "連接",
    "example_en": "Connect the dots to see the hidden picture.",
    "example_cht": "把點點連起來，就能看見藏起來的圖。"
  },
  {
    "id": 578,
    "section_id": 26,
    "part_of_speech_id": 2,
    "word": "cut",
    "meaning_cht": "切/剪",
    "example_en": "I cut the paper with safety scissors.",
    "example_cht": "我用安全剪刀剪紙。"
  },
  {
    "id": 579,
    "section_id": 26,
    "part_of_speech_id": 2,
    "word": "divide",
    "meaning_cht": "分開",
    "example_en": "Let's divide the cookie into two equal pieces.",
    "example_cht": "我們把餅乾分成兩塊一樣大的。"
  },
  {
    "id": 580,
    "section_id": 26,
    "part_of_speech_id": 2,
    "word": "divide",
    "meaning_cht": "除",
    "example_en": "Ten divided by two equals five exactly right.",
    "example_cht": "十除以二剛剛好等於五。"
  },
  {
    "id": 581,
    "section_id": 26,
    "part_of_speech_id": 2,
    "word": "fix",
    "meaning_cht": "修理",
    "example_en": "I fix my toy with tape today.",
    "example_cht": "我今天用膠帶把玩具修好。"
  },
  {
    "id": 582,
    "section_id": 26,
    "part_of_speech_id": 2,
    "word": "grow",
    "meaning_cht": "生長/成長",
    "example_en": "Dreams grow bigger every time we believe them.",
    "example_cht": "我們每次相信，夢想就長得更大。"
  },
  {
    "id": 583,
    "section_id": 26,
    "part_of_speech_id": 2,
    "word": "mix",
    "meaning_cht": "混合",
    "example_en": "I mix colors to make new ones.",
    "example_cht": "我把顏色混一混，變出新的顏色。"
  },
  {
    "id": 584,
    "section_id": 26,
    "part_of_speech_id": 2,
    "word": "paste",
    "meaning_cht": "黏貼",
    "example_en": "I paste pictures in my scrapbook with glue.",
    "example_cht": "我用膠水把圖貼在我的剪貼簿上。"
  },
  {
    "id": 585,
    "section_id": 26,
    "part_of_speech_id": 2,
    "word": "rip",
    "meaning_cht": "撕裂",
    "example_en": "I rip open the present on my birthday.",
    "example_cht": "我生日時把禮物包一口氣撕開。"
  },
  {
    "id": 586,
    "section_id": 26,
    "part_of_speech_id": 2,
    "word": "separate",
    "meaning_cht": "分開",
    "example_en": "We separate the toys into different boxes.",
    "example_cht": "我們把玩具分到不同的箱子裡。"
  },
  {
    "id": 587,
    "section_id": 26,
    "part_of_speech_id": 2,
    "word": "split",
    "meaning_cht": "分裂",
    "example_en": "We split the work so everyone helps out.",
    "example_cht": "我們把工作分一分，大家一起幫忙。"
  },
  {
    "id": 588,
    "section_id": 26,
    "part_of_speech_id": 2,
    "word": "tear",
    "meaning_cht": "撕破",
    "example_en": "Don't tear the page when you turn it.",
    "example_cht": "翻頁時小心，別把紙撕破了。"
  },
  {
    "id": 589,
    "section_id": 26,
    "part_of_speech_id": 2,
    "word": "turn",
    "meaning_cht": "轉動/變成",
    "example_en": "Ordinary stones can turn into fun when believed.",
    "example_cht": "只要你相信，普通石頭也能變成好玩的寶物。"
  },
  {
    "id": 590,
    "section_id": 26,
    "part_of_speech_id": 1,
    "word": "turn",
    "meaning_cht": "輪次",
    "example_en": "It's my turn to go down the slide.",
    "example_cht": "換我溜滑梯了。"
  },
  {
    "id": 591,
    "section_id": 27,
    "part_of_speech_id": 2,
    "word": "discover",
    "meaning_cht": "發現",
    "example_en": "I discover a new bug hiding under a rock.",
    "example_cht": "我發現一隻躲在石頭下的新小蟲。"
  },
  {
    "id": 592,
    "section_id": 27,
    "part_of_speech_id": 2,
    "word": "explore",
    "meaning_cht": "探索",
    "example_en": "Let's explore the forest and find new things.",
    "example_cht": "我們去森林探險，找新奇的東西。"
  },
  {
    "id": 593,
    "section_id": 27,
    "part_of_speech_id": 2,
    "word": "find",
    "meaning_cht": "找到",
    "example_en": "I find a shiny pebble on the ground.",
    "example_cht": "我在地上找到一顆亮亮的小石頭。"
  },
  {
    "id": 594,
    "section_id": 27,
    "part_of_speech_id": 6,
    "word": "find out",
    "meaning_cht": "發現",
    "example_en": "I find out new things every time I ask.",
    "example_cht": "我每次發問都會發現新東西。"
  },
  {
    "id": 595,
    "section_id": 27,
    "part_of_speech_id": 2,
    "word": "hide",
    "meaning_cht": "躲藏",
    "example_en": "I am hiding behind the long curtain.",
    "example_cht": "我現在躲在長長的窗簾後面。"
  },
  {
    "id": 596,
    "section_id": 27,
    "part_of_speech_id": 2,
    "word": "hide",
    "meaning_cht": "隱藏",
    "example_en": "I hide the surprise gift under my bed.",
    "example_cht": "我把驚喜禮物藏在我的床底下。"
  },
  {
    "id": 597,
    "section_id": 27,
    "part_of_speech_id": 6,
    "word": "look for",
    "meaning_cht": "尋找",
    "example_en": "We look for everyday fun hiding in plain sight.",
    "example_cht": "我們尋找日常生活裡就藏著的有趣小事。"
  },
  {
    "id": 598,
    "section_id": 27,
    "part_of_speech_id": 2,
    "word": "lose",
    "meaning_cht": "失去/丟失",
    "example_en": "I lose my hat at the park.",
    "example_cht": "我的帽子在公園不見了。"
  },
  {
    "id": 599,
    "section_id": 27,
    "part_of_speech_id": 2,
    "word": "lose",
    "meaning_cht": "輸",
    "example_en": "It's okay to lose as long as we tried.",
    "example_cht": "只要努力過，就算輸也沒關係。"
  },
  {
    "id": 600,
    "section_id": 27,
    "part_of_speech_id": 2,
    "word": "search",
    "meaning_cht": "尋找",
    "example_en": "We search the yard for eggs today.",
    "example_cht": "我們今天在院子裡尋找彩蛋。"
  },
  {
    "id": 601,
    "section_id": 27,
    "part_of_speech_id": 2,
    "word": "seek",
    "meaning_cht": "尋找 (特指)",
    "example_en": "I seek my socks under the bed.",
    "example_cht": "我在床底下找我的襪子。"
  },
  {
    "id": 602,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "angry",
    "meaning_cht": "生氣的",
    "example_en": "I get angry when my blocks fall.",
    "example_cht": "當我的積木倒了，我會生氣。"
  },
  {
    "id": 603,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "ashamed",
    "meaning_cht": "羞愧的",
    "example_en": "I feel ashamed when I do something wrong.",
    "example_cht": "當我做錯事時，我會覺得害羞又慚愧。"
  },
  {
    "id": 604,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "bored",
    "meaning_cht": "無聊的",
    "example_en": "I feel bored when there's nothing to do.",
    "example_cht": "沒事做的時候，我會覺得好無聊。"
  },
  {
    "id": 605,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "brave",
    "meaning_cht": "勇敢的",
    "example_en": "The brave kid tries new fun things.",
    "example_cht": "勇敢的小朋友會試試看新的好玩事物。"
  },
  {
    "id": 606,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "calm",
    "meaning_cht": "冷靜的",
    "example_en": "Deep breaths help me feel calm and peaceful.",
    "example_cht": "深呼吸會讓我覺得平靜又安心。"
  },
  {
    "id": 607,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "confused",
    "meaning_cht": "困惑的",
    "example_en": "I feel confused when math problems are hard.",
    "example_cht": "數學題很難時，我就會覺得好困惑。"
  },
  {
    "id": 608,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "curious",
    "meaning_cht": "好奇的",
    "example_en": "Curious minds ask lots of questions about everything.",
    "example_cht": "好奇的腦袋會對每件事都想問問題。"
  },
  {
    "id": 609,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "excited",
    "meaning_cht": "興奮的",
    "example_en": "I am excited for my big trip.",
    "example_cht": "我對要去的大旅行感到超興奮。"
  },
  {
    "id": 610,
    "section_id": 28,
    "part_of_speech_id": 1,
    "word": "fear",
    "meaning_cht": "害怕",
    "example_en": "Fear fades when you hold my hand.",
    "example_cht": "當你牽著我的手，害怕就慢慢不見了。"
  },
  {
    "id": 611,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "full",
    "meaning_cht": "滿的/飽的",
    "example_en": "I am full after eating the soup.",
    "example_cht": "喝完湯我就覺得好飽。"
  },
  {
    "id": 612,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "happy",
    "meaning_cht": "快樂的",
    "example_en": "I feel happy when you smile at me.",
    "example_cht": "你對我笑時，我心裡好開心。"
  },
  {
    "id": 613,
    "section_id": 28,
    "part_of_speech_id": 2,
    "word": "hate",
    "meaning_cht": "恨/不喜歡",
    "example_en": "Nobody really hates rainy days - they're fun!",
    "example_cht": "其實沒有人真的討厭下雨天——下雨天也很好玩！"
  },
  {
    "id": 614,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "hungry",
    "meaning_cht": "飢餓的",
    "example_en": "I am hungry before dinner comes.",
    "example_cht": "晚餐還沒來，我就肚子餓了。"
  },
  {
    "id": 615,
    "section_id": 28,
    "part_of_speech_id": 2,
    "word": "hurt",
    "meaning_cht": "傷害/疼痛",
    "example_en": "My knee hurts when I fall down.",
    "example_cht": "我跌倒時，膝蓋會痛痛的。"
  },
  {
    "id": 616,
    "section_id": 28,
    "part_of_speech_id": 2,
    "word": "hurt",
    "meaning_cht": "受傷",
    "example_en": "I hurt my elbow when I fell down.",
    "example_cht": "我跌倒時，撞到我的手肘。"
  },
  {
    "id": 617,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "ill",
    "meaning_cht": "生病的",
    "example_en": "When I'm ill I stay home and rest.",
    "example_cht": "我生病時會在家休息。"
  },
  {
    "id": 618,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "interested",
    "meaning_cht": "有興趣的",
    "example_en": "I'm interested in learning about space and stars.",
    "example_cht": "我對學習太空和星星很有興趣。"
  },
  {
    "id": 619,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "jealous",
    "meaning_cht": "嫉妒的",
    "example_en": "I feel jealous when my friend gets toys.",
    "example_cht": "當朋友得到玩具時，我會覺得忌妒。"
  },
  {
    "id": 620,
    "section_id": 28,
    "part_of_speech_id": 1,
    "word": "joy",
    "meaning_cht": "快樂/歡樂",
    "example_en": "Joy jumps in my heart every day.",
    "example_cht": "喜悅每天都在我心裡跳跳跳。"
  },
  {
    "id": 621,
    "section_id": 28,
    "part_of_speech_id": 2,
    "word": "like",
    "meaning_cht": "喜歡",
    "example_en": "I like to splash in puddles after rain.",
    "example_cht": "我喜歡在雨後踩水坑，噗通噗通。"
  },
  {
    "id": 622,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "lonely",
    "meaning_cht": "孤單的",
    "example_en": "I feel lonely when no one plays with me.",
    "example_cht": "當沒人跟我玩時，我覺得好孤單。"
  },
  {
    "id": 623,
    "section_id": 28,
    "part_of_speech_id": 1,
    "word": "love",
    "meaning_cht": "愛",
    "example_en": "Love fills our home with bright light.",
    "example_cht": "愛讓我們的家亮亮的、暖暖的。"
  },
  {
    "id": 624,
    "section_id": 28,
    "part_of_speech_id": 2,
    "word": "need",
    "meaning_cht": "需要",
    "example_en": "I need water after a long run.",
    "example_cht": "跑很久之後，我需要喝水。"
  },
  {
    "id": 625,
    "section_id": 28,
    "part_of_speech_id": 1,
    "word": "need",
    "meaning_cht": "需求",
    "example_en": "All I need is a hug right now.",
    "example_cht": "現在我只需要一個大大的擁抱。"
  },
  {
    "id": 626,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "nervous",
    "meaning_cht": "緊張的",
    "example_en": "I feel nervous before the big show starts.",
    "example_cht": "表演開始前，我會覺得緊張。"
  },
  {
    "id": 627,
    "section_id": 28,
    "part_of_speech_id": 1,
    "word": "pain",
    "meaning_cht": "疼痛",
    "example_en": "The pain goes away when mom kisses it.",
    "example_cht": "媽媽親親之後，痛痛就飛走了。"
  },
  {
    "id": 628,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "proud",
    "meaning_cht": "驕傲的",
    "example_en": "I feel proud when I help others succeed.",
    "example_cht": "當我幫助別人成功，我覺得很驕傲。"
  },
  {
    "id": 629,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "relaxed",
    "meaning_cht": "放鬆的",
    "example_en": "I feel relaxed when I listen to music.",
    "example_cht": "我聽音樂時，身體都鬆鬆的。"
  },
  {
    "id": 630,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "sad",
    "meaning_cht": "難過的",
    "example_en": "I feel sad when my toys break.",
    "example_cht": "玩具壞掉時，我會覺得難過。"
  },
  {
    "id": 631,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "sad",
    "meaning_cht": "悲傷的",
    "example_en": "The small cloud looks sad when it starts to rain.",
    "example_cht": "小小的雲開始下雨時，看起來也有點難過。"
  },
  {
    "id": 632,
    "section_id": 28,
    "part_of_speech_id": 1,
    "word": "sadness",
    "meaning_cht": "悲傷",
    "example_en": "Sadness leaves when friends come over now.",
    "example_cht": "朋友來找我玩時，難過就溜走了。"
  },
  {
    "id": 633,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "scared",
    "meaning_cht": "害怕的",
    "example_en": "I feel scared in the very dark.",
    "example_cht": "在很黑的地方，我會覺得害怕。"
  },
  {
    "id": 634,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "shocked",
    "meaning_cht": "震驚的",
    "example_en": "I was shocked when I saw the elephant.",
    "example_cht": "我看到那隻大象時嚇了一大跳。"
  },
  {
    "id": 635,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "sick",
    "meaning_cht": "生病的",
    "example_en": "When I'm sick mom makes me feel better.",
    "example_cht": "我生病時，媽媽會讓我舒服一點。"
  },
  {
    "id": 636,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "sleepy",
    "meaning_cht": "想睡的",
    "example_en": "I feel sleepy when bedtime stories start now.",
    "example_cht": "聽到睡前故事，我就開始想睡覺了。"
  },
  {
    "id": 637,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "sore",
    "meaning_cht": "痛的",
    "example_en": "My legs are sore after running all day.",
    "example_cht": "跑了一整天，我的腿酸酸的。"
  },
  {
    "id": 638,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "surprised",
    "meaning_cht": "驚訝的",
    "example_en": "I'm surprised that you remembered my birthday today.",
    "example_cht": "你今天還記得我的生日，真讓我好驚喜！"
  },
  {
    "id": 639,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "thirsty",
    "meaning_cht": "口渴的",
    "example_en": "I am thirsty after playing soccer.",
    "example_cht": "踢完足球，我很口渴。"
  },
  {
    "id": 640,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "tired",
    "meaning_cht": "累的",
    "example_en": "I feel tired after the long run.",
    "example_cht": "跑很久之後，我覺得好累。"
  },
  {
    "id": 641,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "tired",
    "meaning_cht": "疲倦的",
    "example_en": "I feel tired after playing all day outside.",
    "example_cht": "在外面玩一整天，我累呼呼的。"
  },
  {
    "id": 642,
    "section_id": 28,
    "part_of_speech_id": 2,
    "word": "want",
    "meaning_cht": "渴望/想要",
    "example_en": "I want a big hug from mom now.",
    "example_cht": "我現在想要媽媽一個大大的擁抱。"
  },
  {
    "id": 643,
    "section_id": 28,
    "part_of_speech_id": 5,
    "word": "worried",
    "meaning_cht": "擔心的",
    "example_en": "I feel worried when mom is late home.",
    "example_cht": "媽媽回家晚了，我就會擔心。"
  },
  {
    "id": 644,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "bad",
    "meaning_cht": "壞的/糟糕的",
    "example_en": "Lying is bad so I tell truth.",
    "example_cht": "說謊不好，所以我要說實話。"
  },
  {
    "id": 645,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "beautiful",
    "meaning_cht": "美麗的",
    "example_en": "The butterfly is beautiful and colorful.",
    "example_cht": "這隻蝴蝶好美、顏色又繽紛。"
  },
  {
    "id": 646,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "busy",
    "meaning_cht": "忙碌的",
    "example_en": "The busy bee flies from flower to flower.",
    "example_cht": "忙碌的小蜜蜂在花朵間飛來飛去。"
  },
  {
    "id": 647,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "clever",
    "meaning_cht": "聰明的",
    "example_en": "The clever cat finds the hidden treat.",
    "example_cht": "聰明的小貓找到了藏起來的小點心。"
  },
  {
    "id": 648,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "comfortable",
    "meaning_cht": "舒適的",
    "example_en": "This chair is comfortable for reading long books.",
    "example_cht": "這張椅子坐著很舒服，適合看長長的故事書。"
  },
  {
    "id": 649,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "dangerous",
    "meaning_cht": "危險的",
    "example_en": "Playing near the cliff is dangerous, so be careful.",
    "example_cht": "在懸崖邊玩很危險，要小心。"
  },
  {
    "id": 650,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "dirty",
    "meaning_cht": "髒的",
    "example_en": "My shoes are dirty after playing in the mud.",
    "example_cht": "在泥巴裡玩過後，我的鞋子髒兮兮。"
  },
  {
    "id": 651,
    "section_id": 29,
    "part_of_speech_id": 2,
    "word": "dirty",
    "meaning_cht": "弄髒",
    "example_en": "I dirty my shoes in the mud.",
    "example_cht": "我把鞋子在泥巴裡弄髒了。"
  },
  {
    "id": 652,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "easy",
    "meaning_cht": "簡單的",
    "example_en": "This puzzle is easy for us now.",
    "example_cht": "這個拼圖現在對我們來說很簡單。"
  },
  {
    "id": 653,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "easy",
    "meaning_cht": "容易的",
    "example_en": "This puzzle is as easy as catching falling leaves!",
    "example_cht": "這個拼圖就像接落葉一樣簡單！"
  },
  {
    "id": 654,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "funny",
    "meaning_cht": "有趣的/滑稽的",
    "example_en": "The clown is funny and makes me laugh.",
    "example_cht": "小丑好好笑，逗得我哈哈笑。"
  },
  {
    "id": 655,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "good",
    "meaning_cht": "好的",
    "example_en": "Sharing is a good thing to do.",
    "example_cht": "分享是一件很好的事。"
  },
  {
    "id": 656,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "hard",
    "meaning_cht": "困難的/堅硬的",
    "example_en": "Math is hard but we try hard.",
    "example_cht": "數學很難，但我們會努力。"
  },
  {
    "id": 657,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "kind",
    "meaning_cht": "善良的/種類",
    "example_en": "A kind word makes hearts feel warm.",
    "example_cht": "一句善良的話，讓心裡暖暖的。"
  },
  {
    "id": 658,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "lazy",
    "meaning_cht": "懶惰的",
    "example_en": "The lazy cat naps all day in the sun.",
    "example_cht": "懶洋洋的貓在陽光下睡一整天。"
  },
  {
    "id": 659,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "loud",
    "meaning_cht": "大聲的",
    "example_en": "The drum is loud and makes noise.",
    "example_cht": "鼓聲很大，咚咚作響。"
  },
  {
    "id": 660,
    "section_id": 29,
    "part_of_speech_id": 2,
    "word": "mean",
    "meaning_cht": "意思是/刻薄的",
    "example_en": "What does this word mean to you?",
    "example_cht": "這個字對你來說是什麼意思呢？"
  },
  {
    "id": 661,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "new",
    "meaning_cht": "新的",
    "example_en": "I wear my new shoes to school.",
    "example_cht": "我穿著新鞋去上學。"
  },
  {
    "id": 662,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "noisy",
    "meaning_cht": "吵鬧的",
    "example_en": "The noisy birds wake me up in the morning.",
    "example_cht": "吵鬧的小鳥一大早就把我吵醒。"
  },
  {
    "id": 663,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "old",
    "meaning_cht": "舊的/老的",
    "example_en": "I find an old coin in the sand.",
    "example_cht": "我在沙子裡找到一枚舊硬幣。"
  },
  {
    "id": 664,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "pretty",
    "meaning_cht": "漂亮的",
    "example_en": "The flowers are pretty and smell nice.",
    "example_cht": "這些花很漂亮，味道也好香。"
  },
  {
    "id": 665,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "quiet",
    "meaning_cht": "安靜的",
    "example_en": "The library is quiet and cozy inside.",
    "example_cht": "圖書館很安靜，裡面也很舒服。"
  },
  {
    "id": 666,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "rough",
    "meaning_cht": "粗糙的",
    "example_en": "The tree bark is rough to touch.",
    "example_cht": "樹皮摸起來粗粗的。"
  },
  {
    "id": 667,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "safe",
    "meaning_cht": "安全的",
    "example_en": "I feel safe when you hold my hand.",
    "example_cht": "你牽著我的手時，我覺得很安心。"
  },
  {
    "id": 668,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "silent",
    "meaning_cht": "安靜的",
    "example_en": "The cat walks silently like a sneaky ninja.",
    "example_cht": "貓咪走路靜悄悄，像個偷偷的忍者。"
  },
  {
    "id": 669,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "silly",
    "meaning_cht": "傻傻的/滑稽的",
    "example_en": "My silly hat has a big feather.",
    "example_cht": "我那頂搞笑的帽子插著一根大羽毛。"
  },
  {
    "id": 670,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "slippery",
    "meaning_cht": "滑的",
    "example_en": "The floor is slippery after the rain.",
    "example_cht": "下雨過後，地板滑滑的。"
  },
  {
    "id": 671,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "smooth",
    "meaning_cht": "平滑的",
    "example_en": "The pebble feels smooth in my hand.",
    "example_cht": "這顆小石頭摸起來滑滑的、很平滑。"
  },
  {
    "id": 672,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "soft",
    "meaning_cht": "柔軟的",
    "example_en": "The pillow is soft and so fluffy.",
    "example_cht": "這個枕頭軟綿綿的，超蓬鬆。"
  },
  {
    "id": 673,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "special",
    "meaning_cht": "特別的",
    "example_en": "Today is a special day for me.",
    "example_cht": "今天對我來說是個特別的日子。"
  },
  {
    "id": 674,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "sticky",
    "meaning_cht": "黏的",
    "example_en": "My hands are sticky from sweet honey.",
    "example_cht": "我的手沾到甜甜的蜂蜜，黏黏的。"
  },
  {
    "id": 675,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "strange",
    "meaning_cht": "奇怪的",
    "example_en": "That strange noise came from the tree.",
    "example_cht": "那個怪怪的聲音是從樹那邊傳來的。"
  },
  {
    "id": 676,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "wise",
    "meaning_cht": "聰明的/有智慧的",
    "example_en": "The wise owl knows when storms will come by listening.",
    "example_cht": "聰明的貓頭鷹用耳朵就知道暴風雨什麼時候會來。"
  },
  {
    "id": 677,
    "section_id": 29,
    "part_of_speech_id": 5,
    "word": "young",
    "meaning_cht": "年輕的/小的",
    "example_en": "Young hearts stay curious asking why about everything.",
    "example_cht": "年輕的心總是很好奇，對什麼都想問為什麼。"
  },
  {
    "id": 678,
    "section_id": 30,
    "part_of_speech_id": 1,
    "word": "bitter",
    "meaning_cht": "苦味",
    "example_en": "The medicine is bitter to drink down.",
    "example_cht": "這個藥苦苦的，喝下去會皺眉。"
  },
  {
    "id": 679,
    "section_id": 30,
    "part_of_speech_id": 5,
    "word": "cold",
    "meaning_cht": "冷的",
    "example_en": "The ice is cold on my tongue.",
    "example_cht": "冰塊碰到舌頭好冰喔。"
  },
  {
    "id": 680,
    "section_id": 30,
    "part_of_speech_id": 1,
    "word": "cold",
    "meaning_cht": "寒冷/感冒",
    "example_en": "The cold makes my nose turn red.",
    "example_cht": "冷冷的天把我的鼻子凍得紅紅的。"
  },
  {
    "id": 681,
    "section_id": 30,
    "part_of_speech_id": 5,
    "word": "cold",
    "meaning_cht": "冰冷的",
    "example_en": "The cold ice cream is yummy on a hot day.",
    "example_cht": "熱天吃冰冰的冰淇淋好好吃。"
  },
  {
    "id": 682,
    "section_id": 30,
    "part_of_speech_id": 5,
    "word": "cool",
    "meaning_cht": "涼爽的",
    "example_en": "A cool breeze feels nice on my skin.",
    "example_cht": "涼涼的微風吹在皮膚上真舒服。"
  },
  {
    "id": 683,
    "section_id": 30,
    "part_of_speech_id": 5,
    "word": "dry",
    "meaning_cht": "乾的",
    "example_en": "The towel is dry and very warm.",
    "example_cht": "毛巾乾乾的又暖暖的。"
  },
  {
    "id": 684,
    "section_id": 30,
    "part_of_speech_id": 1,
    "word": "dry",
    "meaning_cht": "乾燥",
    "example_en": "The dry leaves crunch under my feet.",
    "example_cht": "乾乾的葉子被我踩得沙沙響。"
  },
  {
    "id": 685,
    "section_id": 30,
    "part_of_speech_id": 5,
    "word": "dry",
    "meaning_cht": "乾燥的",
    "example_en": "I like to lie on the warm, dry sandy beach.",
    "example_cht": "我喜歡躺在溫暖乾爽的沙灘上。"
  },
  {
    "id": 686,
    "section_id": 30,
    "part_of_speech_id": 5,
    "word": "heavy",
    "meaning_cht": "重的",
    "example_en": "The rock is heavy for little me.",
    "example_cht": "對我這個小小孩來說，這顆石頭很重。"
  },
  {
    "id": 687,
    "section_id": 30,
    "part_of_speech_id": 5,
    "word": "hot",
    "meaning_cht": "熱的",
    "example_en": "The soup is hot so I blow.",
    "example_cht": "湯很燙，所以我要呼呼吹。"
  },
  {
    "id": 688,
    "section_id": 30,
    "part_of_speech_id": 1,
    "word": "hot",
    "meaning_cht": "熱/熱度",
    "example_en": "Hot cocoa warms my cold hands up.",
    "example_cht": "熱可可把我冷冷的手暖起來。"
  },
  {
    "id": 689,
    "section_id": 30,
    "part_of_speech_id": 1,
    "word": "sour",
    "meaning_cht": "酸的",
    "example_en": "The lemon is sour and makes me make faces.",
    "example_cht": "檸檬酸酸的，讓我做鬼臉。"
  },
  {
    "id": 690,
    "section_id": 30,
    "part_of_speech_id": 1,
    "word": "sweet",
    "meaning_cht": "甜的",
    "example_en": "This candy is sweet and very sticky.",
    "example_cht": "這顆糖甜甜的、黏黏的。"
  },
  {
    "id": 691,
    "section_id": 30,
    "part_of_speech_id": 5,
    "word": "warm",
    "meaning_cht": "溫暖的",
    "example_en": "The warm sun hugs my face gently.",
    "example_cht": "溫暖的陽光輕輕抱著我的臉。"
  },
  {
    "id": 692,
    "section_id": 30,
    "part_of_speech_id": 5,
    "word": "wet",
    "meaning_cht": "濕的",
    "example_en": "My hair is wet after the rain.",
    "example_cht": "下雨後我的頭髮濕濕的。"
  },
  {
    "id": 693,
    "section_id": 30,
    "part_of_speech_id": 1,
    "word": "wet",
    "meaning_cht": "潮濕",
    "example_en": "The wet grass soaks my white socks.",
    "example_cht": "濕濕的草把我的白襪子都弄濕了。"
  },
  {
    "id": 694,
    "section_id": 30,
    "part_of_speech_id": 5,
    "word": "wet",
    "meaning_cht": "潮濕的",
    "example_en": "My shoes are wet from jumping in the puddle.",
    "example_cht": "我跳水坑把鞋子都濺濕了。"
  },
  {
    "id": 695,
    "section_id": 31,
    "part_of_speech_id": 5,
    "word": "different",
    "meaning_cht": "不同的",
    "example_en": "Every snowflake is different, just like every person is special.",
    "example_cht": "每一片雪花都不一樣，就像每個人都很特別。"
  },
  {
    "id": 696,
    "section_id": 31,
    "part_of_speech_id": 5,
    "word": "empty",
    "meaning_cht": "空的",
    "example_en": "The box is empty and clean now.",
    "example_cht": "這個盒子現在空空的、乾乾淨淨。"
  },
  {
    "id": 697,
    "section_id": 31,
    "part_of_speech_id": 5,
    "word": "fast",
    "meaning_cht": "快速的",
    "example_en": "The rabbit is fast and very small.",
    "example_cht": "小兔子跑很快、個子也很小。"
  },
  {
    "id": 698,
    "section_id": 31,
    "part_of_speech_id": 5,
    "word": "fast",
    "meaning_cht": "快的",
    "example_en": "Fast thinking helps us solve puzzles before time out.",
    "example_cht": "反應快一點，就能在時間到前解開謎題。"
  },
  {
    "id": 699,
    "section_id": 31,
    "part_of_speech_id": 7,
    "word": "off",
    "meaning_cht": "離開/關閉",
    "example_en": "The rocket blasts off to outer space.",
    "example_cht": "火箭發射，飛向外太空。"
  },
  {
    "id": 700,
    "section_id": 31,
    "part_of_speech_id": 8,
    "word": "off",
    "meaning_cht": "離開 (接觸點)",
    "example_en": "I take off my wet coat fast.",
    "example_cht": "我趕快把濕掉的外套脫下來。"
  },
  {
    "id": 701,
    "section_id": 31,
    "part_of_speech_id": 8,
    "word": "off",
    "meaning_cht": "離開/脫離",
    "example_en": "The rocket blasts off into space to stars.",
    "example_cht": "火箭發射，飛向滿天星星。"
  },
  {
    "id": 702,
    "section_id": 31,
    "part_of_speech_id": 7,
    "word": "on",
    "meaning_cht": "開啟/在上面",
    "example_en": "Turn on the lamp when it's dark.",
    "example_cht": "天黑時把檯燈打開。"
  },
  {
    "id": 703,
    "section_id": 31,
    "part_of_speech_id": 8,
    "word": "on",
    "meaning_cht": "在...上面",
    "example_en": "On the windowsill sits a plant growing up.",
    "example_cht": "窗台上放著一盆正在長大的植物。"
  },
  {
    "id": 704,
    "section_id": 31,
    "part_of_speech_id": 5,
    "word": "quick",
    "meaning_cht": "快的/迅速的",
    "example_en": "The rabbit is quick and runs fast.",
    "example_cht": "兔子很敏捷，跑起來很快。"
  },
  {
    "id": 705,
    "section_id": 31,
    "part_of_speech_id": 5,
    "word": "ready",
    "meaning_cht": "準備好的",
    "example_en": "I'm ready to catch the falling stars.",
    "example_cht": "我準備好接住掉下來的星星了。"
  },
  {
    "id": 706,
    "section_id": 31,
    "part_of_speech_id": 5,
    "word": "same",
    "meaning_cht": "相同的",
    "example_en": "We wore the same silly hats with bells to the party!",
    "example_cht": "我們戴著一模一樣、有鈴鐺的搞笑帽去派對！"
  },
  {
    "id": 707,
    "section_id": 31,
    "part_of_speech_id": 5,
    "word": "slow",
    "meaning_cht": "慢的",
    "example_en": "The turtle is slow but very steady.",
    "example_cht": "烏龜很慢，但走得很穩。"
  },
  {
    "id": 708,
    "section_id": 31,
    "part_of_speech_id": 5,
    "word": "whole",
    "meaning_cht": "整個的",
    "example_en": "I ate the whole slice with a smile.",
    "example_cht": "我笑咪咪地把整片吃光光。"
  },
  {
    "id": 709,
    "section_id": 32,
    "part_of_speech_id": 4,
    "word": "all",
    "meaning_cht": "全部",
    "example_en": "All my toys go in the box.",
    "example_cht": "我所有的玩具都放進箱子裡。"
  },
  {
    "id": 710,
    "section_id": 32,
    "part_of_speech_id": 4,
    "word": "all",
    "meaning_cht": "所有",
    "example_en": "All the stars come out at night.",
    "example_cht": "晚上時，所有星星都跑出來了。"
  },
  {
    "id": 711,
    "section_id": 32,
    "part_of_speech_id": 5,
    "word": "all",
    "meaning_cht": "所有的",
    "example_en": "All the butterflies danced together nicely in the meadow.",
    "example_cht": "一群蝴蝶在草地上一起跳著美麗的舞。"
  },
  {
    "id": 712,
    "section_id": 32,
    "part_of_speech_id": 4,
    "word": "any",
    "meaning_cht": "任何",
    "example_en": "Do you have any stories about trees?",
    "example_cht": "你有沒有任何關於樹的故事？"
  },
  {
    "id": 713,
    "section_id": 32,
    "part_of_speech_id": 4,
    "word": "both",
    "meaning_cht": "兩者都",
    "example_en": "Both hands can clap together loudly.",
    "example_cht": "兩隻手可以拍得很大聲。"
  },
  {
    "id": 714,
    "section_id": 32,
    "part_of_speech_id": 4,
    "word": "each",
    "meaning_cht": "每個",
    "example_en": "Each child gets one cookie to eat.",
    "example_cht": "每個小朋友都拿到一片餅乾。"
  },
  {
    "id": 715,
    "section_id": 32,
    "part_of_speech_id": 7,
    "word": "enough",
    "meaning_cht": "足夠",
    "example_en": "Is the sky big enough to hold all my dreams?",
    "example_cht": "天空夠大，裝得下我所有的夢嗎？"
  },
  {
    "id": 716,
    "section_id": 32,
    "part_of_speech_id": 4,
    "word": "every",
    "meaning_cht": "每個",
    "example_en": "Every star shines bright at night.",
    "example_cht": "每一顆星星在夜裡都亮晶晶。"
  },
  {
    "id": 717,
    "section_id": 32,
    "part_of_speech_id": 4,
    "word": "few",
    "meaning_cht": "很少",
    "example_en": "Only a few cookies are left now.",
    "example_cht": "現在只剩下幾片餅乾了。"
  },
  {
    "id": 718,
    "section_id": 32,
    "part_of_speech_id": 1,
    "word": "half",
    "meaning_cht": "一半",
    "example_en": "I eat half of my sandwich now.",
    "example_cht": "我先吃掉一半的三明治。"
  },
  {
    "id": 719,
    "section_id": 32,
    "part_of_speech_id": 5,
    "word": "least",
    "meaning_cht": "最少的",
    "example_en": "This path has the least puddles to jump over.",
    "example_cht": "這條路上的水坑最少，最好跳。"
  },
  {
    "id": 720,
    "section_id": 32,
    "part_of_speech_id": 4,
    "word": "less",
    "meaning_cht": "更少",
    "example_en": "Less noise helps the baby sleep well.",
    "example_cht": "小聲一點，寶寶才睡得好。"
  },
  {
    "id": 721,
    "section_id": 32,
    "part_of_speech_id": 5,
    "word": "less",
    "meaning_cht": "更少的",
    "example_en": "With less noise, we can hear the forest whisper.",
    "example_cht": "安靜一些，我們就能聽見森林在悄悄說話。"
  },
  {
    "id": 722,
    "section_id": 32,
    "part_of_speech_id": 1,
    "word": "lot",
    "meaning_cht": "許多",
    "example_en": "A lot of giggles make the day bright.",
    "example_cht": "很多很多的笑聲，讓今天亮亮的。"
  },
  {
    "id": 723,
    "section_id": 32,
    "part_of_speech_id": 4,
    "word": "many",
    "meaning_cht": "許多",
    "example_en": "Many ants march in a long line.",
    "example_cht": "許多螞蟻排成長長的一列前進。"
  },
  {
    "id": 724,
    "section_id": 32,
    "part_of_speech_id": 7,
    "word": "many",
    "meaning_cht": "很多 (可數)",
    "example_en": "Many seeds can grow into tall trees.",
    "example_cht": "很多種子都能長成高高的樹。"
  },
  {
    "id": 725,
    "section_id": 32,
    "part_of_speech_id": 4,
    "word": "many",
    "meaning_cht": "很多",
    "example_en": "Many butterflies land on the bright flowers.",
    "example_cht": "好多蝴蝶停在亮亮的花上。"
  },
  {
    "id": 726,
    "section_id": 32,
    "part_of_speech_id": 4,
    "word": "more",
    "meaning_cht": "更多",
    "example_en": "I want more bubbles floating up please.",
    "example_cht": "我還想要更多會往上飄的泡泡，拜託。"
  },
  {
    "id": 727,
    "section_id": 32,
    "part_of_speech_id": 5,
    "word": "more",
    "meaning_cht": "更多的",
    "example_en": "Please tell me more fun stories about talking animals!",
    "example_cht": "請再多說一些會說話的動物的有趣故事！"
  },
  {
    "id": 728,
    "section_id": 32,
    "part_of_speech_id": 5,
    "word": "most",
    "meaning_cht": "大部分的",
    "example_en": "Most mornings the birds wake up before the sun.",
    "example_cht": "大多數早晨，小鳥都比太陽先起床。"
  },
  {
    "id": 729,
    "section_id": 32,
    "part_of_speech_id": 7,
    "word": "much",
    "meaning_cht": "很多 (不可數)",
    "example_en": "The ocean has so much water in.",
    "example_cht": "大海裡有好多好多的水。"
  },
  {
    "id": 730,
    "section_id": 32,
    "part_of_speech_id": 5,
    "word": "much",
    "meaning_cht": "許多 (不可數)",
    "example_en": "Too much rain makes the river rush and sing loudly.",
    "example_cht": "雨太多時，河水就會急急流，唱得很大聲。"
  },
  {
    "id": 731,
    "section_id": 32,
    "part_of_speech_id": 9,
    "word": "no",
    "meaning_cht": "不/拒絕",
    "example_en": "No I am not sleepy yet mom.",
    "example_cht": "不，我還沒想睡喔，媽媽。"
  },
  {
    "id": 732,
    "section_id": 32,
    "part_of_speech_id": 3,
    "word": "none",
    "meaning_cht": "沒有一個",
    "example_en": "None of the cookies are left now.",
    "example_cht": "現在一片餅乾都不剩了。"
  },
  {
    "id": 733,
    "section_id": 32,
    "part_of_speech_id": 1,
    "word": "part",
    "meaning_cht": "部分",
    "example_en": "Every part of the rainbow makes it beautiful.",
    "example_cht": "彩虹的每一個顏色都讓它很美。"
  },
  {
    "id": 734,
    "section_id": 32,
    "part_of_speech_id": 1,
    "word": "piece",
    "meaning_cht": "塊/片",
    "example_en": "I need one more puzzle piece now.",
    "example_cht": "我現在還需要一片拼圖。"
  },
  {
    "id": 735,
    "section_id": 32,
    "part_of_speech_id": 10,
    "word": "so",
    "meaning_cht": "所以",
    "example_en": "The stars are sleepy, so they close their eyes.",
    "example_cht": "星星累了,所以牠們閉上眼睛。"
  },
  {
    "id": 736,
    "section_id": 32,
    "part_of_speech_id": 7,
    "word": "so",
    "meaning_cht": "如此",
    "example_en": "I'm so happy my heart feels like it might burst!",
    "example_cht": "我太開心了，心都要蹦出來了！"
  },
  {
    "id": 737,
    "section_id": 32,
    "part_of_speech_id": 4,
    "word": "some",
    "meaning_cht": "一些",
    "example_en": "Some stars peek through the gray clouds.",
    "example_cht": "有些星星從灰色的雲後面探出頭。"
  },
  {
    "id": 738,
    "section_id": 32,
    "part_of_speech_id": 7,
    "word": "too",
    "meaning_cht": "太過/也",
    "example_en": "This bag is too heavy for me.",
    "example_cht": "這個包包對我來說太重了。"
  },
  {
    "id": 739,
    "section_id": 32,
    "part_of_speech_id": 7,
    "word": "too",
    "meaning_cht": "也/太",
    "example_en": "I want to be a wizard too.",
    "example_cht": "我也想當一個小魔法師。"
  },
  {
    "id": 740,
    "section_id": 32,
    "part_of_speech_id": 7,
    "word": "very",
    "meaning_cht": "非常",
    "example_en": "The soup is very tasty and warm.",
    "example_cht": "這碗湯很美味又溫暖。"
  },
  {
    "id": 741,
    "section_id": 33,
    "part_of_speech_id": 8,
    "word": "after",
    "meaning_cht": "在...之後",
    "example_en": "After lunch we chase rainbows in the garden!",
    "example_cht": "午餐後我們在花園裡追逐彩虹!"
  },
  {
    "id": 742,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "afternoon",
    "meaning_cht": "下午",
    "example_en": "Afternoon is perfect for a quiet nap.",
    "example_cht": "下午最適合安安靜靜地睡個小覺。"
  },
  {
    "id": 743,
    "section_id": 33,
    "part_of_speech_id": 7,
    "word": "again",
    "meaning_cht": "再一次",
    "example_en": "Let's do that again because it's fun.",
    "example_cht": "因為很好玩，我們再來一次吧。"
  },
  {
    "id": 744,
    "section_id": 33,
    "part_of_speech_id": 7,
    "word": "ago",
    "meaning_cht": "以前",
    "example_en": "Long ago dinosaurs walked here before us.",
    "example_cht": "很久很久以前，恐龍曾在這裡走來走去。"
  },
  {
    "id": 745,
    "section_id": 33,
    "part_of_speech_id": 7,
    "word": "already",
    "meaning_cht": "已經",
    "example_en": "The moon is already awake even though it's daytime.",
    "example_cht": "就算現在是白天，月亮已經醒來囉。"
  },
  {
    "id": 746,
    "section_id": 33,
    "part_of_speech_id": 7,
    "word": "always",
    "meaning_cht": "總是",
    "example_en": "I always say please and thank you.",
    "example_cht": "我總是會說「請」和「謝謝」。"
  },
  {
    "id": 747,
    "section_id": 33,
    "part_of_speech_id": 8,
    "word": "before",
    "meaning_cht": "在...之前",
    "example_en": "Wash hands before we eat our food.",
    "example_cht": "吃東西前先把小手洗乾淨。"
  },
  {
    "id": 748,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "day",
    "meaning_cht": "白天/天",
    "example_en": "This day is full of fun to play.",
    "example_cht": "今天充滿好多好玩的事情。"
  },
  {
    "id": 749,
    "section_id": 33,
    "part_of_speech_id": 8,
    "word": "during",
    "meaning_cht": "在...期間",
    "example_en": "During class we use quiet soft voices.",
    "example_cht": "上課時我們用小小聲說話。"
  },
  {
    "id": 750,
    "section_id": 33,
    "part_of_speech_id": 7,
    "word": "early",
    "meaning_cht": "早",
    "example_en": "The early birds get to hear sunrise.",
    "example_cht": "早起的小鳥可以看到太陽升起。"
  },
  {
    "id": 751,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "evening",
    "meaning_cht": "傍晚",
    "example_en": "Evening lights glow on the street now.",
    "example_cht": "傍晚時街上的燈都亮起來了。"
  },
  {
    "id": 752,
    "section_id": 33,
    "part_of_speech_id": 5,
    "word": "first",
    "meaning_cht": "第一個",
    "example_en": "I take the first turn in line.",
    "example_cht": "輪到第一個的就是我。"
  },
  {
    "id": 753,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "hour",
    "meaning_cht": "小時",
    "example_en": "An hour feels long on car trips.",
    "example_cht": "坐車的一小時感覺好久喔。"
  },
  {
    "id": 754,
    "section_id": 33,
    "part_of_speech_id": 5,
    "word": "last",
    "meaning_cht": "上一個/最後一個",
    "example_en": "The last cookie goes to you now.",
    "example_cht": "最後一塊餅乾送給你。"
  },
  {
    "id": 755,
    "section_id": 33,
    "part_of_speech_id": 7,
    "word": "late",
    "meaning_cht": "晚",
    "example_en": "Stars stay up late painting the sky.",
    "example_cht": "星星很晚還不睡，在天空畫畫。"
  },
  {
    "id": 756,
    "section_id": 33,
    "part_of_speech_id": 7,
    "word": "later",
    "meaning_cht": "之後",
    "example_en": "We'll chase fireflies later when it's dark.",
    "example_cht": "等天黑了我們再去追螢火蟲。"
  },
  {
    "id": 757,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "minute",
    "meaning_cht": "分鐘",
    "example_en": "One minute can feel so very long.",
    "example_cht": "一分鐘有時候也會覺得好久。"
  },
  {
    "id": 758,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "month",
    "meaning_cht": "月",
    "example_en": "Twelve months hold hands making a circle called a year.",
    "example_cht": "十二個月手牽手，變成一個圓圈叫一年。"
  },
  {
    "id": 759,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "January",
    "meaning_cht": "一月",
    "example_en": "In January I wear a warm hat.",
    "example_cht": "一月裡我會戴暖暖的帽子。"
  },
  {
    "id": 760,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "February",
    "meaning_cht": "二月",
    "example_en": "In February hearts fill the window.",
    "example_cht": "二月裡窗戶上貼滿了愛心。"
  },
  {
    "id": 761,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "March",
    "meaning_cht": "三月",
    "example_en": "In March the wind pushes my kite.",
    "example_cht": "三月裡風會把我的風箏推得高高。"
  },
  {
    "id": 762,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "April",
    "meaning_cht": "四月",
    "example_en": "In April soft rain wakes the flowers.",
    "example_cht": "四月裡柔柔的小雨把花兒叫醒。"
  },
  {
    "id": 763,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "May",
    "meaning_cht": "五月",
    "example_en": "In May we see baby birds.",
    "example_cht": "五月裡我們會看到小小的鳥寶寶。"
  },
  {
    "id": 764,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "June",
    "meaning_cht": "六月",
    "example_en": "In June we eat cold ice cream.",
    "example_cht": "六月裡我們吃冰冰涼涼的冰淇淋。"
  },
  {
    "id": 765,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "July",
    "meaning_cht": "七月",
    "example_en": "In July the sun stays up late.",
    "example_cht": "七月裡太陽會很晚才下山。"
  },
  {
    "id": 766,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "August",
    "meaning_cht": "八月",
    "example_en": "In August we swim at the pool.",
    "example_cht": "八月裡我們去泳池玩水。"
  },
  {
    "id": 767,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "September",
    "meaning_cht": "九月",
    "example_en": "In September I go back to school.",
    "example_cht": "九月裡我要回到學校上課。"
  },
  {
    "id": 768,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "October",
    "meaning_cht": "十月",
    "example_en": "In October pumpkins glow at night.",
    "example_cht": "十月裡南瓜在夜裡亮亮的。"
  },
  {
    "id": 769,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "November",
    "meaning_cht": "十一月",
    "example_en": "In November we thank and share.",
    "example_cht": "十一月裡我們會感謝並分享。"
  },
  {
    "id": 770,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "December",
    "meaning_cht": "十二月",
    "example_en": "In December lights sparkle in the dark.",
    "example_cht": "十二月裡燈光在黑夜裡亮晶晶。"
  },
  {
    "id": 771,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "morning",
    "meaning_cht": "早上",
    "example_en": "Morning smells like toast and fresh bread.",
    "example_cht": "早晨有烤吐司和新鮮麵包的香味。"
  },
  {
    "id": 772,
    "section_id": 33,
    "part_of_speech_id": 7,
    "word": "never",
    "meaning_cht": "從不",
    "example_en": "I never run in the school hallway.",
    "example_cht": "我在學校走廊絕對不跑步。"
  },
  {
    "id": 773,
    "section_id": 33,
    "part_of_speech_id": 5,
    "word": "next",
    "meaning_cht": "下一個",
    "example_en": "The next page has a big surprise.",
    "example_cht": "下一頁有一個大大的驚喜。"
  },
  {
    "id": 774,
    "section_id": 33,
    "part_of_speech_id": 7,
    "word": "next",
    "meaning_cht": "接著",
    "example_en": "I take one step then next step fast.",
    "example_cht": "我一步、再一步，走得飛快。"
  },
  {
    "id": 775,
    "section_id": 33,
    "part_of_speech_id": 5,
    "word": "next",
    "meaning_cht": "下一個的",
    "example_en": "What happens next in the exciting story today?",
    "example_cht": "今天這個精彩故事接下來會發生什麼呢？"
  },
  {
    "id": 776,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "night",
    "meaning_cht": "晚上",
    "example_en": "The night brings stars and wise owls.",
    "example_cht": "夜晚帶來星星和聰明的貓頭鷹。"
  },
  {
    "id": 777,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "noon",
    "meaning_cht": "中午",
    "example_en": "We eat lunch at noon every day.",
    "example_cht": "我們每天中午吃午餐。"
  },
  {
    "id": 778,
    "section_id": 33,
    "part_of_speech_id": 7,
    "word": "now",
    "meaning_cht": "現在",
    "example_en": "The storybook is calling me to read it now!",
    "example_cht": "故事書正在叫我快點來讀它!"
  },
  {
    "id": 779,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "o'clock",
    "meaning_cht": "點鐘",
    "example_en": "School starts at eight o'clock sharp.",
    "example_cht": "學校八點整準時開始。"
  },
  {
    "id": 780,
    "section_id": 33,
    "part_of_speech_id": 7,
    "word": "often",
    "meaning_cht": "經常",
    "example_en": "The robin often visits, singing sweet songs.",
    "example_cht": "知更鳥常常來訪，唱著甜甜的歌。"
  },
  {
    "id": 781,
    "section_id": 33,
    "part_of_speech_id": 7,
    "word": "once",
    "meaning_cht": "一次",
    "example_en": "Once upon a time stories always start.",
    "example_cht": "故事總是從「很久很久以前」開始。"
  },
  {
    "id": 782,
    "section_id": 33,
    "part_of_speech_id": 5,
    "word": "second",
    "meaning_cht": "第二個",
    "example_en": "I get a second try at jumping.",
    "example_cht": "我可以再跳一次，第二次機會！"
  },
  {
    "id": 783,
    "section_id": 33,
    "part_of_speech_id": 7,
    "word": "seldom",
    "meaning_cht": "很少",
    "example_en": "We seldom see rainbows but they're magic.",
    "example_cht": "我們很少看到彩虹，但它像魔法一樣。"
  },
  {
    "id": 784,
    "section_id": 33,
    "part_of_speech_id": 7,
    "word": "sometimes",
    "meaning_cht": "有時候",
    "example_en": "Sometimes the wind whispers to my ear.",
    "example_cht": "有時候風會在我耳邊輕輕說話。"
  },
  {
    "id": 785,
    "section_id": 33,
    "part_of_speech_id": 7,
    "word": "soon",
    "meaning_cht": "很快",
    "example_en": "Soon the caterpillar will become a butterfly.",
    "example_cht": "毛毛蟲很快就會變成蝴蝶。"
  },
  {
    "id": 786,
    "section_id": 33,
    "part_of_speech_id": 7,
    "word": "still",
    "meaning_cht": "仍然",
    "example_en": "The turtle is still walking to its destination slowly.",
    "example_cht": "烏龜還在慢慢地走向目的地。"
  },
  {
    "id": 787,
    "section_id": 33,
    "part_of_speech_id": 7,
    "word": "then",
    "meaning_cht": "然後",
    "example_en": "First we draw then we cut paper.",
    "example_cht": "先畫畫，然後再剪紙。"
  },
  {
    "id": 788,
    "section_id": 33,
    "part_of_speech_id": 5,
    "word": "third",
    "meaning_cht": "第三的",
    "example_en": "I am third in line to go.",
    "example_cht": "輪到第三個的是我。"
  },
  {
    "id": 789,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "time",
    "meaning_cht": "時間",
    "example_en": "Time for bed means story time now.",
    "example_cht": "睡覺時間到了，也代表要說故事囉。"
  },
  {
    "id": 790,
    "section_id": 33,
    "part_of_speech_id": 7,
    "word": "today",
    "meaning_cht": "今天",
    "example_en": "Today we bake cookies with grandma.",
    "example_cht": "今天我們和奶奶一起烤餅乾。"
  },
  {
    "id": 791,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "tomorrow",
    "meaning_cht": "明天",
    "example_en": "Tomorrow we will fly a big kite.",
    "example_cht": "明天我們要放一個大風箏。"
  },
  {
    "id": 792,
    "section_id": 33,
    "part_of_speech_id": 7,
    "word": "twice",
    "meaning_cht": "兩次",
    "example_en": "I read my favorite story twice today.",
    "example_cht": "我今天把最喜歡的故事讀了兩次。"
  },
  {
    "id": 793,
    "section_id": 33,
    "part_of_speech_id": 7,
    "word": "usually",
    "meaning_cht": "通常",
    "example_en": "Birds usually know secrets we don't know.",
    "example_cht": "小鳥通常知道我們不知道的小秘密。"
  },
  {
    "id": 794,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "week",
    "meaning_cht": "週",
    "example_en": "A week is seven days of playing follow the leader.",
    "example_cht": "一個星期有七天，天天玩跟著隊長走。"
  },
  {
    "id": 795,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "Monday",
    "meaning_cht": "星期一",
    "example_en": "On Monday we read a fun book.",
    "example_cht": "星期一我們讀一本有趣的書。"
  },
  {
    "id": 796,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "Tuesday",
    "meaning_cht": "星期二",
    "example_en": "On Tuesday we draw a big rocket.",
    "example_cht": "星期二我們畫一艘大火箭。"
  },
  {
    "id": 797,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "Wednesday",
    "meaning_cht": "星期三",
    "example_en": "On Wednesday we play a new game.",
    "example_cht": "星期三我們玩一個新遊戲。"
  },
  {
    "id": 798,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "Thursday",
    "meaning_cht": "星期四",
    "example_en": "On Thursday I help mom bake cookies.",
    "example_cht": "星期四我幫媽媽烤餅乾。"
  },
  {
    "id": 799,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "Friday",
    "meaning_cht": "星期五",
    "example_en": "On Friday we dance like silly robots.",
    "example_cht": "星期五我們跳舞像傻呼呼的機器人。"
  },
  {
    "id": 800,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "Saturday",
    "meaning_cht": "星期六",
    "example_en": "On Saturday we ride our bikes to the park.",
    "example_cht": "星期六我們騎腳踏車去公園。"
  },
  {
    "id": 801,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "Sunday",
    "meaning_cht": "星期日",
    "example_en": "On Sunday we rest and tell stories.",
    "example_cht": "星期天我們休息，還會說故事。"
  },
  {
    "id": 802,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "year",
    "meaning_cht": "年",
    "example_en": "Every year I grow taller, wiser, and better.",
    "example_cht": "每一年我都長得更高、更聰明、更棒。"
  },
  {
    "id": 803,
    "section_id": 33,
    "part_of_speech_id": 1,
    "word": "yesterday",
    "meaning_cht": "昨天",
    "example_en": "Yesterday we played in the warm rain.",
    "example_cht": "昨天我們在暖暖的雨裡玩耍。"
  },
  {
    "id": 804,
    "section_id": 33,
    "part_of_speech_id": 7,
    "word": "yet",
    "meaning_cht": "尚/還沒",
    "example_en": "The mystery hasn't been solved yet but we're close!",
    "example_cht": "謎題還沒解開，不過我們快要成功了！"
  },
  {
    "id": 805,
    "section_id": 34,
    "part_of_speech_id": 8,
    "word": "above",
    "meaning_cht": "在...上方",
    "example_en": "A bird flies above our heads now.",
    "example_cht": "一隻小鳥現在飛在我們頭頂上。"
  },
  {
    "id": 806,
    "section_id": 34,
    "part_of_speech_id": 8,
    "word": "across",
    "meaning_cht": "穿過 (表面)",
    "example_en": "We jump across the small stream fast.",
    "example_cht": "我們快速地跳過小溪。"
  },
  {
    "id": 807,
    "section_id": 34,
    "part_of_speech_id": 8,
    "word": "along",
    "meaning_cht": "沿著",
    "example_en": "We walk along the river path slowly.",
    "example_cht": "我們沿著河邊的小路慢慢走。"
  },
  {
    "id": 808,
    "section_id": 34,
    "part_of_speech_id": 8,
    "word": "among",
    "meaning_cht": "在 (多者)之中",
    "example_en": "A red flower grows among green ones.",
    "example_cht": "一朵紅花長在綠綠的花叢中。"
  },
  {
    "id": 809,
    "section_id": 34,
    "part_of_speech_id": 8,
    "word": "around",
    "meaning_cht": "在...周圍",
    "example_en": "We run around the big tree fast.",
    "example_cht": "我們繞著大樹快快跑。"
  },
  {
    "id": 810,
    "section_id": 34,
    "part_of_speech_id": 8,
    "word": "at",
    "meaning_cht": "在 (某點)",
    "example_en": "Look at the bright moon tonight now.",
    "example_cht": "今晚看看那顆亮亮的月亮吧。"
  },
  {
    "id": 811,
    "section_id": 34,
    "part_of_speech_id": 8,
    "word": "behind",
    "meaning_cht": "在...後面",
    "example_en": "The ball rolls behind the soft sofa.",
    "example_cht": "球滾到柔軟的沙發後面了。"
  },
  {
    "id": 812,
    "section_id": 34,
    "part_of_speech_id": 8,
    "word": "below",
    "meaning_cht": "在...下方",
    "example_en": "The treasure is below the X mark.",
    "example_cht": "寶藏就在 X 標記的下面。"
  },
  {
    "id": 813,
    "section_id": 34,
    "part_of_speech_id": 8,
    "word": "between",
    "meaning_cht": "在 (兩者)之間",
    "example_en": "A tiny mouse hides between two sleeping cats.",
    "example_cht": "小老鼠躲在兩隻睡覺的貓咪中間。"
  },
  {
    "id": 814,
    "section_id": 34,
    "part_of_speech_id": 1,
    "word": "corner",
    "meaning_cht": "角落",
    "example_en": "I hide in the corner when we play.",
    "example_cht": "我們玩躲貓貓時，我躲在角落。"
  },
  {
    "id": 815,
    "section_id": 34,
    "part_of_speech_id": 7,
    "word": "down",
    "meaning_cht": "向下",
    "example_en": "The leaf falls down slowly to me.",
    "example_cht": "葉子慢慢地飄落到我身邊。"
  },
  {
    "id": 816,
    "section_id": 34,
    "part_of_speech_id": 7,
    "word": "far",
    "meaning_cht": "遠",
    "example_en": "The moon looks far at night.",
    "example_cht": "晚上的月亮看起來好遠。"
  },
  {
    "id": 817,
    "section_id": 34,
    "part_of_speech_id": 5,
    "word": "far",
    "meaning_cht": "遠的",
    "example_en": "The mountain seems far away from here.",
    "example_cht": "那座山從這裡看起來很遠很遠。"
  },
  {
    "id": 818,
    "section_id": 34,
    "part_of_speech_id": 8,
    "word": "from",
    "meaning_cht": "來自/從",
    "example_en": "I got a big hug from my dad.",
    "example_cht": "我從爸爸那裡得到一個大大的擁抱。"
  },
  {
    "id": 819,
    "section_id": 34,
    "part_of_speech_id": 1,
    "word": "front",
    "meaning_cht": "前面",
    "example_en": "I sit in the front of our class.",
    "example_cht": "我坐在班上的前面。"
  },
  {
    "id": 820,
    "section_id": 34,
    "part_of_speech_id": 7,
    "word": "here",
    "meaning_cht": "這裡",
    "example_en": "Come here and hold my hand tight.",
    "example_cht": "過來這裡，緊緊牽著我的手。"
  },
  {
    "id": 821,
    "section_id": 34,
    "part_of_speech_id": 8,
    "word": "in",
    "meaning_cht": "在...裡面",
    "example_en": "The toy lives in my backpack now.",
    "example_cht": "這個玩具現在住在我的背包裡。"
  },
  {
    "id": 822,
    "section_id": 34,
    "part_of_speech_id": 8,
    "word": "inside",
    "meaning_cht": "在...裡面",
    "example_en": "The toys are inside the big box.",
    "example_cht": "玩具都在大箱子裡面。"
  },
  {
    "id": 823,
    "section_id": 34,
    "part_of_speech_id": 8,
    "word": "into",
    "meaning_cht": "進入...內部",
    "example_en": "We jump into the big leaf pile.",
    "example_cht": "我們跳進那大大的落葉堆裡。"
  },
  {
    "id": 824,
    "section_id": 34,
    "part_of_speech_id": 5,
    "word": "left",
    "meaning_cht": "左邊的",
    "example_en": "My left hand waves hello to you.",
    "example_cht": "我的左手跟你說哈囉。"
  },
  {
    "id": 825,
    "section_id": 34,
    "part_of_speech_id": 1,
    "word": "middle",
    "meaning_cht": "中間",
    "example_en": "I sit in the middle of class.",
    "example_cht": "我坐在教室的中間。"
  },
  {
    "id": 826,
    "section_id": 34,
    "part_of_speech_id": 8,
    "word": "near",
    "meaning_cht": "在...附近",
    "example_en": "A bakery near school smells so good.",
    "example_cht": "學校附近的麵包店好香喔。"
  },
  {
    "id": 827,
    "section_id": 34,
    "part_of_speech_id": 5,
    "word": "near",
    "meaning_cht": "近的",
    "example_en": "The butterfly lands near my nose gently.",
    "example_cht": "蝴蝶輕輕地停在我鼻子附近。"
  },
  {
    "id": 828,
    "section_id": 34,
    "part_of_speech_id": 7,
    "word": "out",
    "meaning_cht": "在外面/出去",
    "example_en": "The chick comes out of the egg.",
    "example_cht": "小雞從蛋裡出來了。"
  },
  {
    "id": 829,
    "section_id": 34,
    "part_of_speech_id": 8,
    "word": "out of",
    "meaning_cht": "從...出來",
    "example_en": "I climb out of the big box.",
    "example_cht": "我爬出那個大箱子。"
  },
  {
    "id": 830,
    "section_id": 34,
    "part_of_speech_id": 8,
    "word": "outside",
    "meaning_cht": "在外面",
    "example_en": "We play outside in the sunshine today.",
    "example_cht": "今天我們在陽光下到外面玩。"
  },
  {
    "id": 831,
    "section_id": 34,
    "part_of_speech_id": 8,
    "word": "over",
    "meaning_cht": "越過",
    "example_en": "The cat jumps over the cardboard box.",
    "example_cht": "貓咪跳過紙箱。"
  },
  {
    "id": 832,
    "section_id": 34,
    "part_of_speech_id": 7,
    "word": "over",
    "meaning_cht": "結束",
    "example_en": "When bedtime is over morning brings fun.",
    "example_cht": "一到早上，睡覺時間結束，就要開始好玩的一天。"
  },
  {
    "id": 833,
    "section_id": 34,
    "part_of_speech_id": 5,
    "word": "right",
    "meaning_cht": "正確的",
    "example_en": "Being right isn't as important as being kind.",
    "example_cht": "對不對不如善良更重要。"
  },
  {
    "id": 834,
    "section_id": 34,
    "part_of_speech_id": 1,
    "word": "side",
    "meaning_cht": "側面",
    "example_en": "Stand by my side right here please.",
    "example_cht": "請站在我身旁這裡。"
  },
  {
    "id": 835,
    "section_id": 34,
    "part_of_speech_id": 7,
    "word": "there",
    "meaning_cht": "那裡",
    "example_en": "Look there! A rainbow is growing now.",
    "example_cht": "你看那邊！彩虹正在伸展出來。"
  },
  {
    "id": 836,
    "section_id": 34,
    "part_of_speech_id": 8,
    "word": "through",
    "meaning_cht": "穿過",
    "example_en": "The train goes through the dark tunnel.",
    "example_cht": "火車穿過黑黑的隧道。"
  },
  {
    "id": 837,
    "section_id": 34,
    "part_of_speech_id": 8,
    "word": "to",
    "meaning_cht": "到",
    "example_en": "We walk to the park every day.",
    "example_cht": "我們每天走路去公園。"
  },
  {
    "id": 838,
    "section_id": 34,
    "part_of_speech_id": 1,
    "word": "top",
    "meaning_cht": "頂部",
    "example_en": "The star sits on top of the tree.",
    "example_cht": "星星坐在樹頂上。"
  },
  {
    "id": 839,
    "section_id": 34,
    "part_of_speech_id": 8,
    "word": "toward",
    "meaning_cht": "朝向",
    "example_en": "I walk toward the bright shining sun.",
    "example_cht": "我朝著亮亮的太陽走去。"
  },
  {
    "id": 840,
    "section_id": 34,
    "part_of_speech_id": 8,
    "word": "under",
    "meaning_cht": "在...下面",
    "example_en": "The mouse hides under the big chair.",
    "example_cht": "小老鼠躲在大椅子下面。"
  },
  {
    "id": 841,
    "section_id": 34,
    "part_of_speech_id": 7,
    "word": "up",
    "meaning_cht": "向上",
    "example_en": "The balloons float up to the sky.",
    "example_cht": "氣球飄上天空。"
  },
  {
    "id": 842,
    "section_id": 34,
    "part_of_speech_id": 7,
    "word": "where",
    "meaning_cht": "哪裡",
    "example_en": "Where is my blue hat hiding now?",
    "example_cht": "我那頂藍色的帽子現在躲到哪裡了？"
  },
  {
    "id": 843,
    "section_id": 35,
    "part_of_speech_id": 10,
    "word": "and",
    "meaning_cht": "和",
    "example_en": "We sing and dance and laugh loud.",
    "example_cht": "我們唱歌、跳舞，還大聲地笑。"
  },
  {
    "id": 844,
    "section_id": 35,
    "part_of_speech_id": 10,
    "word": "as",
    "meaning_cht": "當...時/因為",
    "example_en": "The leaves change colors as fall comes.",
    "example_cht": "秋天來了，葉子也跟著換顏色。"
  },
  {
    "id": 845,
    "section_id": 35,
    "part_of_speech_id": 10,
    "word": "because",
    "meaning_cht": "因為",
    "example_en": "I smile because you are here now.",
    "example_cht": "因為你在這裡，我就笑了。"
  },
  {
    "id": 846,
    "section_id": 35,
    "part_of_speech_id": 10,
    "word": "but",
    "meaning_cht": "但是",
    "example_en": "I am small but I am strong.",
    "example_cht": "我個子小，但我很有力量。"
  },
  {
    "id": 847,
    "section_id": 35,
    "part_of_speech_id": 10,
    "word": "if",
    "meaning_cht": "如果",
    "example_en": "If it rains we play inside today.",
    "example_cht": "如果下雨，今天就在室內玩。"
  },
  {
    "id": 848,
    "section_id": 35,
    "part_of_speech_id": 10,
    "word": "or",
    "meaning_cht": "或",
    "example_en": "Do you want milk or juice today?",
    "example_cht": "你今天想喝牛奶還是果汁？"
  },
  {
    "id": 849,
    "section_id": 35,
    "part_of_speech_id": 8,
    "word": "since",
    "meaning_cht": "因為/自從",
    "example_en": "Since forever stars have been shining down bright.",
    "example_cht": "自很久很久以前，星星就一直閃亮照著我們。"
  },
  {
    "id": 850,
    "section_id": 35,
    "part_of_speech_id": 10,
    "word": "than",
    "meaning_cht": "比",
    "example_en": "Kindness is more powerful than being very big.",
    "example_cht": "善良比長得很大更有力量。"
  },
  {
    "id": 851,
    "section_id": 35,
    "part_of_speech_id": 10,
    "word": "though",
    "meaning_cht": "雖然",
    "example_en": "Though I'm small I have the big dreams.",
    "example_cht": "雖然我不高，卻有很大的夢想。"
  },
  {
    "id": 852,
    "section_id": 35,
    "part_of_speech_id": 8,
    "word": "till",
    "meaning_cht": "直到",
    "example_en": "I'll love you till all the stars go away.",
    "example_cht": "我會愛你，直到所有星星都睡著。"
  },
  {
    "id": 853,
    "section_id": 35,
    "part_of_speech_id": 10,
    "word": "until",
    "meaning_cht": "直到",
    "example_en": "Dance until your feet get tired and stop.",
    "example_cht": "跳到腳累了、想休息為止。"
  },
  {
    "id": 854,
    "section_id": 35,
    "part_of_speech_id": 7,
    "word": "when",
    "meaning_cht": "什麼時候",
    "example_en": "When is snack time today I wonder?",
    "example_cht": "我在想，今天點心時間是什麼時候？"
  },
  {
    "id": 855,
    "section_id": 35,
    "part_of_speech_id": 10,
    "word": "while",
    "meaning_cht": "當...時候",
    "example_en": "We read while the rain falls down.",
    "example_cht": "雨滴落下時，我們邊看書邊聽雨。"
  },
  {
    "id": 856,
    "section_id": 36,
    "part_of_speech_id": 7,
    "word": "how",
    "meaning_cht": "如何",
    "example_en": "How do we make a paper boat?",
    "example_cht": "我們怎麼做紙船呢？"
  },
  {
    "id": 857,
    "section_id": 36,
    "part_of_speech_id": 3,
    "word": "what",
    "meaning_cht": "什麼",
    "example_en": "What is inside the mystery box now?",
    "example_cht": "神祕盒子裡現在有什麼？"
  },
  {
    "id": 858,
    "section_id": 36,
    "part_of_speech_id": 3,
    "word": "which",
    "meaning_cht": "哪一個",
    "example_en": "Which toy do you want to play with?",
    "example_cht": "你想玩哪一個玩具？"
  },
  {
    "id": 859,
    "section_id": 36,
    "part_of_speech_id": 3,
    "word": "who",
    "meaning_cht": "誰",
    "example_en": "Who is hiding behind the big tree?",
    "example_cht": "大樹後面躲著的是誰？"
  },
  {
    "id": 860,
    "section_id": 36,
    "part_of_speech_id": 7,
    "word": "why",
    "meaning_cht": "為什麼",
    "example_en": "Why is the sky so blue today?",
    "example_cht": "為什麼今天的天空這麼藍？"
  },
  {
    "id": 861,
    "section_id": 37,
    "part_of_speech_id": 3,
    "word": "anyone",
    "meaning_cht": "任何人",
    "example_en": "Anyone can be a hero with kindness.",
    "example_cht": "只要有善良，任何人都可以是英雄。"
  },
  {
    "id": 862,
    "section_id": 37,
    "part_of_speech_id": 3,
    "word": "anything",
    "meaning_cht": "任何事物",
    "example_en": "I can do anything when I believe.",
    "example_cht": "只要我相信，我什麼都能做到。"
  },
  {
    "id": 863,
    "section_id": 37,
    "part_of_speech_id": 3,
    "word": "everyone",
    "meaning_cht": "每個人",
    "example_en": "Everyone claps when the show ends well.",
    "example_cht": "表演結束得很棒時，大家都會拍手。"
  },
  {
    "id": 864,
    "section_id": 37,
    "part_of_speech_id": 3,
    "word": "everything",
    "meaning_cht": "一切",
    "example_en": "Everything looks different through my eyes now.",
    "example_cht": "現在透過我的眼睛看，一切都變得不一樣了。"
  },
  {
    "id": 865,
    "section_id": 37,
    "part_of_speech_id": 3,
    "word": "he",
    "meaning_cht": "他",
    "example_en": "He wears a red hero cape today.",
    "example_cht": "他今天披著紅色的英雄披風。"
  },
  {
    "id": 866,
    "section_id": 37,
    "part_of_speech_id": 4,
    "word": "her",
    "meaning_cht": "她的",
    "example_en": "Her doll rides on a tiny bike.",
    "example_cht": "她的娃娃騎著一台小小腳踏車。"
  },
  {
    "id": 867,
    "section_id": 37,
    "part_of_speech_id": 3,
    "word": "her",
    "meaning_cht": "她 (受格)",
    "example_en": "I saved a seat for her here.",
    "example_cht": "我在這裡幫她留了一個座位。"
  },
  {
    "id": 868,
    "section_id": 37,
    "part_of_speech_id": 3,
    "word": "hers",
    "meaning_cht": "她的東西",
    "example_en": "The pink umbrella is hers I think.",
    "example_cht": "那把粉紅色的雨傘是她的，我想。"
  },
  {
    "id": 869,
    "section_id": 37,
    "part_of_speech_id": 3,
    "word": "herself",
    "meaning_cht": "她自己",
    "example_en": "She did it all by herself alone.",
    "example_cht": "她自己一個人就做到了。"
  },
  {
    "id": 870,
    "section_id": 37,
    "part_of_speech_id": 3,
    "word": "him",
    "meaning_cht": "他 (受格)",
    "example_en": "I share my snack with him today.",
    "example_cht": "我今天把點心分給他。"
  },
  {
    "id": 871,
    "section_id": 37,
    "part_of_speech_id": 3,
    "word": "himself",
    "meaning_cht": "他自己",
    "example_en": "He tied his shoes by himself today.",
    "example_cht": "他今天自己把鞋帶綁好。"
  },
  {
    "id": 872,
    "section_id": 37,
    "part_of_speech_id": 4,
    "word": "his",
    "meaning_cht": "他的",
    "example_en": "His hat has one bright shiny star.",
    "example_cht": "他的帽子上有一顆亮晶晶的星星。"
  },
  {
    "id": 873,
    "section_id": 37,
    "part_of_speech_id": 3,
    "word": "his",
    "meaning_cht": "他的東西",
    "example_en": "The green backpack is his not mine.",
    "example_cht": "那個綠色背包是他的，不是我的。"
  },
  {
    "id": 874,
    "section_id": 37,
    "part_of_speech_id": 3,
    "word": "it",
    "meaning_cht": "它",
    "example_en": "Look! It is a fluffy cloud dancing in the sky!",
    "example_cht": "你看!它是一朵在天上跳舞的蓬鬆雲!"
  },
  {
    "id": 875,
    "section_id": 37,
    "part_of_speech_id": 3,
    "word": "its",
    "meaning_cht": "它的",
    "example_en": "The dog wags its tail when happy.",
    "example_cht": "那隻狗開心的時候會搖搖尾巴。"
  },
  {
    "id": 876,
    "section_id": 37,
    "part_of_speech_id": 3,
    "word": "itself",
    "meaning_cht": "它自己",
    "example_en": "The cat cleans itself with its tongue.",
    "example_cht": "貓咪用舌頭自己洗澡。"
  },
  {
    "id": 877,
    "section_id": 37,
    "part_of_speech_id": 3,
    "word": "nobody",
    "meaning_cht": "沒人",
    "example_en": "Nobody believes me but I saw it.",
    "example_cht": "沒有人相信我，但我真的看到了。"
  },
  {
    "id": 878,
    "section_id": 37,
    "part_of_speech_id": 3,
    "word": "nothing",
    "meaning_cht": "沒什麼",
    "example_en": "Nothing can stop me when I imagine.",
    "example_cht": "當我展開想像時，沒有什麼能阻止我。"
  },
  {
    "id": 879,
    "section_id": 37,
    "part_of_speech_id": 3,
    "word": "she",
    "meaning_cht": "她",
    "example_en": "She draws stars on blue paper now.",
    "example_cht": "她正在藍色的紙上畫星星。"
  },
  {
    "id": 880,
    "section_id": 37,
    "part_of_speech_id": 3,
    "word": "someone",
    "meaning_cht": "某人",
    "example_en": "Someone left footprints in sand for me.",
    "example_cht": "有人替我在沙地上留下了腳印。"
  },
  {
    "id": 881,
    "section_id": 37,
    "part_of_speech_id": 3,
    "word": "something",
    "meaning_cht": "某物",
    "example_en": "Something wonderful is hiding behind that door.",
    "example_cht": "那扇門後面藏著很棒的東西。"
  },
  {
    "id": 882,
    "section_id": 37,
    "part_of_speech_id": 10,
    "word": "that",
    "meaning_cht": "那個",
    "example_en": "I know that you are my friend.",
    "example_cht": "我知道你是我的朋友。"
  },
  {
    "id": 883,
    "section_id": 37,
    "part_of_speech_id": 4,
    "word": "their",
    "meaning_cht": "他們的",
    "example_en": "Their boat sails on the small pond.",
    "example_cht": "他們的小船在小池塘上航行。"
  },
  {
    "id": 884,
    "section_id": 37,
    "part_of_speech_id": 3,
    "word": "theirs",
    "meaning_cht": "他們的東西",
    "example_en": "The big snowman is theirs they made.",
    "example_cht": "那個大雪人是他們的，是他們做的。"
  },
  {
    "id": 885,
    "section_id": 37,
    "part_of_speech_id": 3,
    "word": "them",
    "meaning_cht": "他們 (受格)",
    "example_en": "I give them stickers for being good.",
    "example_cht": "我送他們貼紙，因為他們表現很好。"
  },
  {
    "id": 886,
    "section_id": 37,
    "part_of_speech_id": 4,
    "word": "these",
    "meaning_cht": "這些",
    "example_en": "These toys are all mine to play.",
    "example_cht": "這些玩具都是我的，可以拿來玩。"
  },
  {
    "id": 887,
    "section_id": 37,
    "part_of_speech_id": 3,
    "word": "they",
    "meaning_cht": "他們",
    "example_en": "They play tag in the big yard.",
    "example_cht": "他們在大院子裡玩鬼抓人。"
  },
  {
    "id": 888,
    "section_id": 37,
    "part_of_speech_id": 3,
    "word": "this",
    "meaning_cht": "這個",
    "example_en": "This book is my favorite one ever.",
    "example_cht": "這本書是我最最喜歡的。"
  },
  {
    "id": 889,
    "section_id": 37,
    "part_of_speech_id": 3,
    "word": "those",
    "meaning_cht": "那些",
    "example_en": "Those birds fly high in the sky.",
    "example_cht": "那些鳥兒飛在高高的天空。"
  },
  {
    "id": 890,
    "section_id": 38,
    "part_of_speech_id": 4,
    "word": "a",
    "meaning_cht": "一個",
    "example_en": "A red kite flies in the sky.",
    "example_cht": "一個紅色的風箏在天空飛。"
  },
  {
    "id": 891,
    "section_id": 38,
    "part_of_speech_id": 4,
    "word": "an",
    "meaning_cht": "一個 (母音前)",
    "example_en": "I see an elephant wearing a tiny hat!",
    "example_cht": "我看到一頭大象戴著小帽子!"
  },
  {
    "id": 892,
    "section_id": 38,
    "part_of_speech_id": 4,
    "word": "such",
    "meaning_cht": "這樣的",
    "example_en": "I had such a fun time today.",
    "example_cht": "我今天玩得超級開心。"
  },
  {
    "id": 893,
    "section_id": 38,
    "part_of_speech_id": 4,
    "word": "the",
    "meaning_cht": "這個/那個",
    "example_en": "The rainbow smiles after the rain.",
    "example_cht": "雨停後，彩虹笑著出來。"
  },
  {
    "id": 894,
    "section_id": 39,
    "part_of_speech_id": 2,
    "word": "be",
    "meaning_cht": "是/存在",
    "example_en": "I want to be a helper today.",
    "example_cht": "我今天想當個小幫手。"
  },
  {
    "id": 895,
    "section_id": 39,
    "part_of_speech_id": 11,
    "word": "can",
    "meaning_cht": "能夠 (能力)",
    "example_en": "I can turn ordinary moments into fun games!",
    "example_cht": "我能把普通的時刻變成好玩的遊戲！"
  },
  {
    "id": 896,
    "section_id": 39,
    "part_of_speech_id": 11,
    "word": "could",
    "meaning_cht": "能夠 (過去/可能性)",
    "example_en": "If trees could talk they'd share secret stories.",
    "example_cht": "如果樹會說話，它們一定會分享祕密故事。"
  },
  {
    "id": 897,
    "section_id": 39,
    "part_of_speech_id": 2,
    "word": "did",
    "meaning_cht": "做 (過去)",
    "example_en": "Yesterday I did cartwheels with the wind fast.",
    "example_cht": "昨天我跟風一起翻跟斗，飛快又開心。"
  },
  {
    "id": 898,
    "section_id": 39,
    "part_of_speech_id": 2,
    "word": "do",
    "meaning_cht": "做",
    "example_en": "Robots do a funny dance when they are happy.",
    "example_cht": "機器人開心的時候會跳有趣的舞。"
  },
  {
    "id": 899,
    "section_id": 39,
    "part_of_speech_id": 2,
    "word": "do",
    "meaning_cht": "做 (現在)",
    "example_en": "What do butterflies dream about when they rest?",
    "example_cht": "蝴蝶休息時會做什麼夢呢？"
  },
  {
    "id": 900,
    "section_id": 39,
    "part_of_speech_id": 2,
    "word": "does",
    "meaning_cht": "做 (單數現在)",
    "example_en": "The moon does a trick and goes away.",
    "example_cht": "月亮像變魔術一樣，忽然躲起來了。"
  },
  {
    "id": 901,
    "section_id": 39,
    "part_of_speech_id": 2,
    "word": "had",
    "meaning_cht": "擁有 (過去)",
    "example_en": "Once I had a dream that I could fly.",
    "example_cht": "我曾經做過會飛的夢。"
  },
  {
    "id": 902,
    "section_id": 39,
    "part_of_speech_id": 2,
    "word": "has",
    "meaning_cht": "擁有 (單數現在)",
    "example_en": "Every flower has its own story to tell.",
    "example_cht": "每朵花都有自己的小故事。"
  },
  {
    "id": 903,
    "section_id": 39,
    "part_of_speech_id": 2,
    "word": "have",
    "meaning_cht": "擁有",
    "example_en": "I have a magic red bike that can fly!",
    "example_cht": "我有一台會飛的魔法紅色腳踏車!"
  },
  {
    "id": 904,
    "section_id": 39,
    "part_of_speech_id": 2,
    "word": "have",
    "meaning_cht": "擁有 (現在)",
    "example_en": "I have pockets full of dreams and fun.",
    "example_cht": "我的口袋裝滿了夢想和樂趣。"
  },
  {
    "id": 905,
    "section_id": 39,
    "part_of_speech_id": 11,
    "word": "may",
    "meaning_cht": "可能 (許可/可能性)",
    "example_en": "May I borrow your toy for just moment?",
    "example_cht": "我可以借你的玩具一下下嗎？"
  },
  {
    "id": 906,
    "section_id": 39,
    "part_of_speech_id": 11,
    "word": "might",
    "meaning_cht": "可能 (微小可能性)",
    "example_en": "The caterpillar might be dreaming of becoming big.",
    "example_cht": "毛毛蟲也許正夢到自己變得很大。"
  },
  {
    "id": 907,
    "section_id": 39,
    "part_of_speech_id": 11,
    "word": "must",
    "meaning_cht": "必須 (義務)",
    "example_en": "We must remember to look for fun things.",
    "example_cht": "我們一定要記得去發現好玩的事情。"
  },
  {
    "id": 908,
    "section_id": 39,
    "part_of_speech_id": 11,
    "word": "shall",
    "meaning_cht": "將要 (建議)",
    "example_en": "Shall we go to the park today?",
    "example_cht": "我們今天要不要去公園？"
  },
  {
    "id": 909,
    "section_id": 39,
    "part_of_speech_id": 11,
    "word": "should",
    "meaning_cht": "應該 (建議)",
    "example_en": "We should always leave room for fun good things.",
    "example_cht": "我們應該總是留一點空間給好玩的事情。"
  },
  {
    "id": 910,
    "section_id": 39,
    "part_of_speech_id": 2,
    "word": "was",
    "meaning_cht": "是 (過去式, 單數)",
    "example_en": "Yesterday was amazing but today is good too!",
    "example_cht": "昨天很棒，今天也很好！"
  },
  {
    "id": 911,
    "section_id": 39,
    "part_of_speech_id": 2,
    "word": "were",
    "meaning_cht": "是 (過去式, 複數)",
    "example_en": "The clouds were big shapes in the sky.",
    "example_cht": "天空的雲變成好多大圖案。"
  },
  {
    "id": 912,
    "section_id": 39,
    "part_of_speech_id": 11,
    "word": "will",
    "meaning_cht": "將會 (未來)",
    "example_en": "Tomorrow I will catch a ride on clouds!",
    "example_cht": "明天我要搭雲朵去旅行！"
  },
  {
    "id": 913,
    "section_id": 39,
    "part_of_speech_id": 11,
    "word": "would",
    "meaning_cht": "會 (過去/假設)",
    "example_en": "I would teach the birds my songs if asked.",
    "example_cht": "如果牠們想聽，我就教鳥兒唱我的歌。"
  },
  {
    "id": 914,
    "section_id": 40,
    "part_of_speech_id": 9,
    "word": "goodbye",
    "meaning_cht": "再見",
    "example_en": "I wave goodbye to the setting sun.",
    "example_cht": "我向要下山的太陽揮手說再見。"
  },
  {
    "id": 915,
    "section_id": 40,
    "part_of_speech_id": 9,
    "word": "hello",
    "meaning_cht": "嗨",
    "example_en": "We say hello to our new friends.",
    "example_cht": "我們向新朋友打招呼。"
  },
  {
    "id": 916,
    "section_id": 40,
    "part_of_speech_id": 9,
    "word": "please",
    "meaning_cht": "請",
    "example_en": "Please read the book one more time.",
    "example_cht": "請再把這本書讀一次。"
  },
  {
    "id": 917,
    "section_id": 40,
    "part_of_speech_id": 9,
    "word": "sorry",
    "meaning_cht": "對不起",
    "example_en": "Sorry I stepped on your block tower.",
    "example_cht": "對不起，我踩到你的積木塔了。"
  },
  {
    "id": 918,
    "section_id": 40,
    "part_of_speech_id": 9,
    "word": "thank you",
    "meaning_cht": "謝謝",
    "example_en": "Thank you for sharing your bright crayons.",
    "example_cht": "謝謝你分享你亮亮的蠟筆。"
  },
  {
    "id": 919,
    "section_id": 40,
    "part_of_speech_id": 9,
    "word": "yes",
    "meaning_cht": "是/同意",
    "example_en": "Yes I want one more story please.",
    "example_cht": "好的，我還想要再聽一個故事。"
  },
  {
    "id": 920,
    "section_id": 41,
    "part_of_speech_id": 1,
    "word": "adventure",
    "meaning_cht": "冒險",
    "example_en": "Every day is a new adventure waiting for us.",
    "example_cht": "每一天都在等著我們去冒險。"
  },
  {
    "id": 921,
    "section_id": 41,
    "part_of_speech_id": 1,
    "word": "boat",
    "meaning_cht": "船",
    "example_en": "Boats let us walk on water like fun game.",
    "example_cht": "小船讓我們像玩遊戲一樣在水上前進。"
  },
  {
    "id": 922,
    "section_id": 41,
    "part_of_speech_id": 1,
    "word": "bus",
    "meaning_cht": "公車",
    "example_en": "The bus is a moving room that takes you places.",
    "example_cht": "公車像會動的小房間，帶我們去各地。"
  },
  {
    "id": 923,
    "section_id": 41,
    "part_of_speech_id": 1,
    "word": "car",
    "meaning_cht": "汽車",
    "example_en": "Dad drives the car to the beach.",
    "example_cht": "爸爸開車帶我們去海邊。"
  },
  {
    "id": 924,
    "section_id": 41,
    "part_of_speech_id": 2,
    "word": "fly",
    "meaning_cht": "飛",
    "example_en": "Butterflies fly over the pretty flowers now.",
    "example_cht": "蝴蝶現在在漂亮的花上飛來飛去。"
  },
  {
    "id": 925,
    "section_id": 41,
    "part_of_speech_id": 1,
    "word": "journey",
    "meaning_cht": "旅程",
    "example_en": "Our journey to grandma's house takes three hours.",
    "example_cht": "我們到奶奶家的旅程要花三個小時。"
  },
  {
    "id": 926,
    "section_id": 41,
    "part_of_speech_id": 1,
    "word": "plane",
    "meaning_cht": "飛機",
    "example_en": "Planes are birds that humans built so we can fly.",
    "example_cht": "飛機像人類做出來的大鳥，帶我們飛上天。"
  },
  {
    "id": 927,
    "section_id": 41,
    "part_of_speech_id": 2,
    "word": "ride",
    "meaning_cht": "騎/乘坐",
    "example_en": "I ride my bike to the park.",
    "example_cht": "我騎腳踏車去公園。"
  },
  {
    "id": 928,
    "section_id": 41,
    "part_of_speech_id": 1,
    "word": "ship",
    "meaning_cht": "船",
    "example_en": "The big ship sails on the sea.",
    "example_cht": "大船在海上前進。"
  },
  {
    "id": 929,
    "section_id": 41,
    "part_of_speech_id": 1,
    "word": "train",
    "meaning_cht": "火車",
    "example_en": "Trains are caterpillars made of metal on steel tracks.",
    "example_cht": "火車像金屬毛毛蟲，在鐵軌上爬行。"
  },
  {
    "id": 930,
    "section_id": 41,
    "part_of_speech_id": 2,
    "word": "travel",
    "meaning_cht": "旅行",
    "example_en": "We travel to new places every summer vacation.",
    "example_cht": "每年暑假我們都去新地方旅行。"
  },
  {
    "id": 931,
    "section_id": 41,
    "part_of_speech_id": 1,
    "word": "truck",
    "meaning_cht": "卡車",
    "example_en": "The big truck carries many heavy boxes.",
    "example_cht": "大卡車載著好多重重的箱子。"
  },
  {
    "id": 932,
    "section_id": 42,
    "part_of_speech_id": 1,
    "word": "actor",
    "meaning_cht": "演員",
    "example_en": "The funny actor makes everyone laugh in play.",
    "example_cht": "逗趣的演員在舞台上讓大家笑哈哈。"
  },
  {
    "id": 933,
    "section_id": 42,
    "part_of_speech_id": 1,
    "word": "artist",
    "meaning_cht": "藝術家",
    "example_en": "The creative artist paints beautiful colorful pictures everyday.",
    "example_cht": "有創意的畫家每天都畫出美麗多彩的畫。"
  },
  {
    "id": 934,
    "section_id": 42,
    "part_of_speech_id": 1,
    "word": "astronaut",
    "meaning_cht": "太空人",
    "example_en": "The astronaut floats in space without gravity pull.",
    "example_cht": "太空人在沒有重力的太空裡漂啊漂。"
  },
  {
    "id": 935,
    "section_id": 42,
    "part_of_speech_id": 1,
    "word": "baker",
    "meaning_cht": "麵包師",
    "example_en": "The baker makes fresh bread early every morning.",
    "example_cht": "麵包師傅每天一大早烤出香香的麵包。"
  },
  {
    "id": 936,
    "section_id": 42,
    "part_of_speech_id": 1,
    "word": "barber",
    "meaning_cht": "理髮師",
    "example_en": "The barber cuts my hair to make neat.",
    "example_cht": "理髮師幫我把頭髮剪得整整齊齊。"
  },
  {
    "id": 937,
    "section_id": 42,
    "part_of_speech_id": 1,
    "word": "builder",
    "meaning_cht": "建築工人",
    "example_en": "The strong builder constructs houses for people.",
    "example_cht": "強狀的建築工人幫大家蓋房子。"
  },
  {
    "id": 938,
    "section_id": 42,
    "part_of_speech_id": 1,
    "word": "chef",
    "meaning_cht": "廚師",
    "example_en": "The talented chef cooks delicious fancy meals daily.",
    "example_cht": "厲害的主廚每天都煮出好吃又漂亮的料理。"
  },
  {
    "id": 939,
    "section_id": 42,
    "part_of_speech_id": 1,
    "word": "dancer",
    "meaning_cht": "舞者",
    "example_en": "The graceful dancer twirls and leaps across stage.",
    "example_cht": "優雅的舞者在舞台上旋轉、跳躍。"
  },
  {
    "id": 940,
    "section_id": 42,
    "part_of_speech_id": 1,
    "word": "dentist",
    "meaning_cht": "牙醫",
    "example_en": "The dentist helps keep my teeth healthy strong.",
    "example_cht": "牙醫幫我把牙齒顧得健康又強壯。"
  },
  {
    "id": 941,
    "section_id": 42,
    "part_of_speech_id": 1,
    "word": "doctor",
    "meaning_cht": "醫生",
    "example_en": "The kind doctor helps sick people feel better.",
    "example_cht": "親切的醫生讓生病的人舒服一點。"
  },
  {
    "id": 942,
    "section_id": 42,
    "part_of_speech_id": 1,
    "word": "driver",
    "meaning_cht": "司機",
    "example_en": "The bus driver takes children to school safely.",
    "example_cht": "公車司機安全地載小朋友上學。"
  },
  {
    "id": 943,
    "section_id": 42,
    "part_of_speech_id": 1,
    "word": "explorer",
    "meaning_cht": "探險家",
    "example_en": "The brave explorer travels to unknown distant lands.",
    "example_cht": "勇敢的探險家去遙遠又未知的地方旅行。"
  },
  {
    "id": 944,
    "section_id": 42,
    "part_of_speech_id": 1,
    "word": "farmer",
    "meaning_cht": "農夫",
    "example_en": "The hardworking farmer grows food for everyone daily.",
    "example_cht": "勤勞的農夫每天都種出大家的食物。"
  },
  {
    "id": 945,
    "section_id": 42,
    "part_of_speech_id": 1,
    "word": "firefighter",
    "meaning_cht": "消防員",
    "example_en": "The brave firefighter saves people from burning buildings.",
    "example_cht": "勇敢的消防員從著火的大樓裡救人。"
  },
  {
    "id": 946,
    "section_id": 42,
    "part_of_speech_id": 1,
    "word": "gardener",
    "meaning_cht": "園丁",
    "example_en": "The patient gardener plants seeds that become flowers.",
    "example_cht": "有耐心的園丁把種子種成花。"
  },
  {
    "id": 947,
    "section_id": 42,
    "part_of_speech_id": 1,
    "word": "job",
    "meaning_cht": "工作",
    "example_en": "Every job is important in making the world better.",
    "example_cht": "每一份工作都很重要，讓世界更美好。"
  },
  {
    "id": 948,
    "section_id": 42,
    "part_of_speech_id": 1,
    "word": "librarian",
    "meaning_cht": "圖書館員",
    "example_en": "The helpful librarian finds books I like to read.",
    "example_cht": "熱心的圖書館員幫我找我愛看的書。"
  },
  {
    "id": 949,
    "section_id": 42,
    "part_of_speech_id": 1,
    "word": "mail carrier",
    "meaning_cht": "郵差",
    "example_en": "The mail carrier delivers letters every day.",
    "example_cht": "郵差每天送信到大家家裡。"
  },
  {
    "id": 950,
    "section_id": 42,
    "part_of_speech_id": 1,
    "word": "musician",
    "meaning_cht": "音樂家",
    "example_en": "The talented musician plays many different instruments well.",
    "example_cht": "有才華的音樂家會演奏很多種樂器。"
  },
  {
    "id": 951,
    "section_id": 42,
    "part_of_speech_id": 1,
    "word": "nurse",
    "meaning_cht": "護士",
    "example_en": "The nurse gives me a bandage for my cut.",
    "example_cht": "護士幫我貼上ok繃。"
  },
  {
    "id": 952,
    "section_id": 42,
    "part_of_speech_id": 1,
    "word": "painter",
    "meaning_cht": "畫家/油漆工",
    "example_en": "The painter uses a brush to make art.",
    "example_cht": "畫家用畫筆創作作品。"
  },
  {
    "id": 953,
    "section_id": 42,
    "part_of_speech_id": 1,
    "word": "pilot",
    "meaning_cht": "飛行員",
    "example_en": "The pilot flies the big plane through clouds.",
    "example_cht": "飛行員開著大飛機穿過雲朵。"
  },
  {
    "id": 954,
    "section_id": 42,
    "part_of_speech_id": 1,
    "word": "police officer",
    "meaning_cht": "警察",
    "example_en": "The police officer keeps our neighborhood very safe.",
    "example_cht": "警察讓我們的社區變得很安全。"
  },
  {
    "id": 955,
    "section_id": 42,
    "part_of_speech_id": 1,
    "word": "scientist",
    "meaning_cht": "科學家",
    "example_en": "The scientist studies how plants grow in soil.",
    "example_cht": "科學家研究植物怎麼在土裡長大。"
  },
  {
    "id": 956,
    "section_id": 42,
    "part_of_speech_id": 1,
    "word": "singer",
    "meaning_cht": "歌手",
    "example_en": "The singer has a beautiful voice that sounds lovely.",
    "example_cht": "歌手的歌聲美美的、好好聽。"
  },
  {
    "id": 957,
    "section_id": 42,
    "part_of_speech_id": 1,
    "word": "vet",
    "meaning_cht": "獸醫",
    "example_en": "The vet takes care of sick animals lovingly.",
    "example_cht": "獸醫用愛照顧生病的動物。"
  },
  {
    "id": 958,
    "section_id": 43,
    "part_of_speech_id": 1,
    "word": "coach",
    "meaning_cht": "教練",
    "example_en": "The coach teaches us how to play better.",
    "example_cht": "教練教我們怎麼玩得更好。"
  },
  {
    "id": 959,
    "section_id": 43,
    "part_of_speech_id": 1,
    "word": "court",
    "meaning_cht": "球場",
    "example_en": "We play tennis on the outdoor tennis court.",
    "example_cht": "我們在戶外的網球場玩網球。"
  },
  {
    "id": 960,
    "section_id": 43,
    "part_of_speech_id": 1,
    "word": "fan",
    "meaning_cht": "粉絲",
    "example_en": "The fans cheer loudly for their favorite team.",
    "example_cht": "球迷大聲為最愛的隊伍加油。"
  },
  {
    "id": 961,
    "section_id": 43,
    "part_of_speech_id": 1,
    "word": "field",
    "meaning_cht": "田野/場地",
    "example_en": "We play soccer in the green field.",
    "example_cht": "我們在綠油油的球場踢足球。"
  },
  {
    "id": 962,
    "section_id": 43,
    "part_of_speech_id": 1,
    "word": "field",
    "meaning_cht": "運動場",
    "example_en": "The soccer field has goals on both ends.",
    "example_cht": "足球場兩邊都有球門。"
  },
  {
    "id": 963,
    "section_id": 43,
    "part_of_speech_id": 1,
    "word": "gym",
    "meaning_cht": "體育館",
    "example_en": "We play basketball in the big indoor gym.",
    "example_cht": "我們在大大的室內體育館打籃球。"
  },
  {
    "id": 964,
    "section_id": 43,
    "part_of_speech_id": 1,
    "word": "medal",
    "meaning_cht": "獎牌",
    "example_en": "I won a gold medal for running fastest.",
    "example_cht": "我跑最快，得了一面金牌。"
  },
  {
    "id": 965,
    "section_id": 43,
    "part_of_speech_id": 1,
    "word": "player",
    "meaning_cht": "選手",
    "example_en": "Each player has an important role on team.",
    "example_cht": "每個球員在隊上都有重要的角色。"
  },
  {
    "id": 966,
    "section_id": 43,
    "part_of_speech_id": 1,
    "word": "prize",
    "meaning_cht": "獎品",
    "example_en": "The first prize is a big teddy bear.",
    "example_cht": "第一名的獎品是一隻大泰迪熊。"
  },
  {
    "id": 967,
    "section_id": 43,
    "part_of_speech_id": 1,
    "word": "race",
    "meaning_cht": "比賽/競速",
    "example_en": "I won the race by running very fast.",
    "example_cht": "我跑很快，贏了這場比賽。"
  },
  {
    "id": 968,
    "section_id": 43,
    "part_of_speech_id": 1,
    "word": "score",
    "meaning_cht": "分數",
    "example_en": "Our team has the highest score so far.",
    "example_cht": "我們隊目前分數最高。"
  },
  {
    "id": 969,
    "section_id": 43,
    "part_of_speech_id": 2,
    "word": "score",
    "meaning_cht": "得分",
    "example_en": "I score a goal for my team today.",
    "example_cht": "我今天為我們隊踢進一球。"
  },
  {
    "id": 970,
    "section_id": 43,
    "part_of_speech_id": 1,
    "word": "stadium",
    "meaning_cht": "體育場",
    "example_en": "The huge stadium holds thousands of cheering fans.",
    "example_cht": "巨大的體育場能坐下成千上萬個加油的觀眾。"
  },
  {
    "id": 971,
    "section_id": 43,
    "part_of_speech_id": 1,
    "word": "team",
    "meaning_cht": "隊伍",
    "example_en": "Our team works together to win the game.",
    "example_cht": "我們全隊一起合作，才能贏比賽。"
  },
  {
    "id": 972,
    "section_id": 43,
    "part_of_speech_id": 1,
    "word": "team",
    "meaning_cht": "團隊",
    "example_en": "Our team works together like a well-oiled machine.",
    "example_cht": "我們的團隊像上好油的機器一樣合作順暢。"
  },
  {
    "id": 973,
    "section_id": 43,
    "part_of_speech_id": 2,
    "word": "tie",
    "meaning_cht": "平手",
    "example_en": "Both teams played well so they tie today.",
    "example_cht": "兩隊都表現很好，所以今天打成平手。"
  },
  {
    "id": 974,
    "section_id": 43,
    "part_of_speech_id": 1,
    "word": "track",
    "meaning_cht": "跑道",
    "example_en": "I run fast around the oval track at school.",
    "example_cht": "我在學校的橢圓跑道上跑得飛快。"
  },
  {
    "id": 975,
    "section_id": 43,
    "part_of_speech_id": 1,
    "word": "trophy",
    "meaning_cht": "獎盃",
    "example_en": "The shiny trophy goes to the winning team.",
    "example_cht": "閃亮的獎盃要頒給獲勝的隊伍。"
  },
  {
    "id": 976,
    "section_id": 43,
    "part_of_speech_id": 2,
    "word": "win",
    "meaning_cht": "贏",
    "example_en": "We practice hard so we can win game.",
    "example_cht": "我們努力練習，這樣才能贏比賽。"
  },
  {
    "id": 977,
    "section_id": 43,
    "part_of_speech_id": 1,
    "word": "winner",
    "meaning_cht": "贏家",
    "example_en": "The winner gets to hold the trophy high.",
    "example_cht": "冠軍可以把獎盃高高舉起來。"
  },
  {
    "id": 978,
    "section_id": 44,
    "part_of_speech_id": 1,
    "word": "bandage",
    "meaning_cht": "繃帶",
    "example_en": "The nurse puts a bandage on my scraped knee.",
    "example_cht": "護士幫我擦傷的膝蓋貼上繃帶。"
  },
  {
    "id": 979,
    "section_id": 44,
    "part_of_speech_id": 5,
    "word": "better",
    "meaning_cht": "更好的",
    "example_en": "Today is better than yesterday was.",
    "example_cht": "今天比昨天更好了。"
  },
  {
    "id": 980,
    "section_id": 44,
    "part_of_speech_id": 1,
    "word": "cough",
    "meaning_cht": "咳嗽",
    "example_en": "My cough keeps me awake at night sometimes.",
    "example_cht": "有時候我咳嗽會讓我晚上睡不著。"
  },
  {
    "id": 981,
    "section_id": 44,
    "part_of_speech_id": 1,
    "word": "fever",
    "meaning_cht": "發燒",
    "example_en": "The fever makes my forehead feel very hot.",
    "example_cht": "發燒讓我的額頭熱熱的。"
  },
  {
    "id": 982,
    "section_id": 44,
    "part_of_speech_id": 5,
    "word": "fit",
    "meaning_cht": "健康的/合適的",
    "example_en": "Running every day keeps me fit and energetic.",
    "example_cht": "每天跑步讓我健康又有活力。"
  },
  {
    "id": 983,
    "section_id": 44,
    "part_of_speech_id": 2,
    "word": "heal",
    "meaning_cht": "痊癒",
    "example_en": "Cuts heal faster when you keep them clean.",
    "example_cht": "傷口保持乾淨就會好得更快。"
  },
  {
    "id": 984,
    "section_id": 44,
    "part_of_speech_id": 1,
    "word": "health",
    "meaning_cht": "健康",
    "example_en": "Good health is the most important treasure ever.",
    "example_cht": "身體健康是最重要的寶藏。"
  },
  {
    "id": 985,
    "section_id": 44,
    "part_of_speech_id": 5,
    "word": "healthy",
    "meaning_cht": "健康的",
    "example_en": "Eating vegetables keeps me healthy and strong always.",
    "example_cht": "吃蔬菜讓我一直健康又強壯。"
  },
  {
    "id": 986,
    "section_id": 44,
    "part_of_speech_id": 1,
    "word": "medicine",
    "meaning_cht": "藥",
    "example_en": "The medicine tastes bad but helps me feel better.",
    "example_cht": "藥吃起來不好喝，但會讓我快快好起來。"
  },
  {
    "id": 987,
    "section_id": 44,
    "part_of_speech_id": 2,
    "word": "sneeze",
    "meaning_cht": "打噴嚏",
    "example_en": "I sneeze when dust tickles my nose inside.",
    "example_cht": "灰塵搔我的鼻子時我就會打噴嚏。"
  },
  {
    "id": 988,
    "section_id": 44,
    "part_of_speech_id": 1,
    "word": "sneeze",
    "meaning_cht": "噴嚏",
    "example_en": "A big sneeze makes my whole body shake.",
    "example_cht": "一個大噴嚏讓我全身抖一下。"
  },
  {
    "id": 989,
    "section_id": 44,
    "part_of_speech_id": 5,
    "word": "worse",
    "meaning_cht": "更糟的",
    "example_en": "My cold got worse before it got better.",
    "example_cht": "我的感冒在好起來之前有一點變嚴重。"
  },
  {
    "id": 990,
    "section_id": 45,
    "part_of_speech_id": 5,
    "word": "fair",
    "meaning_cht": "公平的",
    "example_en": "It's fair when everyone gets a turn here.",
    "example_cht": "每個人都輪得到，這才公平。"
  },
  {
    "id": 991,
    "section_id": 45,
    "part_of_speech_id": 5,
    "word": "false",
    "meaning_cht": "假的",
    "example_en": "The pirate's false map led them to an empty beach.",
    "example_cht": "海盜的假地圖把他們帶到空空的海灘。"
  },
  {
    "id": 992,
    "section_id": 45,
    "part_of_speech_id": 5,
    "word": "honest",
    "meaning_cht": "誠實的",
    "example_en": "Being honest means telling the truth always.",
    "example_cht": "誠實就是要一直說真話。"
  },
  {
    "id": 993,
    "section_id": 45,
    "part_of_speech_id": 1,
    "word": "law",
    "meaning_cht": "法律",
    "example_en": "Laws help keep everyone safe in our country.",
    "example_cht": "法律幫助大家在國家裡更安全。"
  },
  {
    "id": 994,
    "section_id": 45,
    "part_of_speech_id": 1,
    "word": "promise",
    "meaning_cht": "承諾",
    "example_en": "A promise is something you must always keep.",
    "example_cht": "承諾是一定要做到的事情。"
  },
  {
    "id": 995,
    "section_id": 45,
    "part_of_speech_id": 5,
    "word": "real",
    "meaning_cht": "真實的",
    "example_en": "Real magic happens when you believe in your dreams.",
    "example_cht": "當你相信夢想時，真的會有魔法。"
  },
  {
    "id": 996,
    "section_id": 45,
    "part_of_speech_id": 1,
    "word": "rule",
    "meaning_cht": "規則",
    "example_en": "We follow the rules to play safely together.",
    "example_cht": "我們遵守規則，大家就能安全地玩。"
  },
  {
    "id": 997,
    "section_id": 45,
    "part_of_speech_id": 1,
    "word": "secret",
    "meaning_cht": "秘密",
    "example_en": "We keep a secret in the box.",
    "example_cht": "我們把祕密放在盒子裡保管。"
  },
  {
    "id": 998,
    "section_id": 45,
    "part_of_speech_id": 5,
    "word": "secret",
    "meaning_cht": "秘密的",
    "example_en": "We have a secret hiding place in the tree.",
    "example_cht": "我們在樹上有一個祕密藏身處。"
  },
  {
    "id": 999,
    "section_id": 45,
    "part_of_speech_id": 5,
    "word": "true",
    "meaning_cht": "真實的",
    "example_en": "True friends are like stars: they're always there even when you can't see them.",
    "example_cht": "真正的朋友像星星一樣，就算看不見也一直在。"
  },
  {
    "id": 1e3,
    "section_id": 45,
    "part_of_speech_id": 1,
    "word": "trust",
    "meaning_cht": "信任",
    "example_en": "Trust is built when you keep your promises.",
    "example_cht": "當你守信用，信任就慢慢建立。"
  },
  {
    "id": 1001,
    "section_id": 45,
    "part_of_speech_id": 1,
    "word": "truth",
    "meaning_cht": "真相",
    "example_en": "Always tell the truth even when it's hard.",
    "example_cht": "就算很困難，也要說真話。"
  },
  {
    "id": 1002,
    "section_id": 45,
    "part_of_speech_id": 5,
    "word": "unfair",
    "meaning_cht": "不公平的",
    "example_en": "It's unfair when someone cheats in the game.",
    "example_cht": "比賽有人作弊就不公平。"
  },
  {
    "id": 1003,
    "section_id": 45,
    "part_of_speech_id": 5,
    "word": "wrong",
    "meaning_cht": "錯誤的",
    "example_en": "Wrong turns sometimes lead to the best adventures found.",
    "example_cht": "走錯路有時會遇到最棒的冒險。"
  },
  {
    "id": 1004,
    "section_id": 46,
    "part_of_speech_id": 2,
    "word": "buy",
    "meaning_cht": "買",
    "example_en": "We buy apples at the store today.",
    "example_cht": "我們今天在商店買蘋果。"
  },
  {
    "id": 1005,
    "section_id": 46,
    "part_of_speech_id": 5,
    "word": "cheap",
    "meaning_cht": "便宜的",
    "example_en": "This toy is cheap so I can buy.",
    "example_cht": "這個玩具很便宜，我買得起。"
  },
  {
    "id": 1006,
    "section_id": 46,
    "part_of_speech_id": 2,
    "word": "cost",
    "meaning_cht": "花費",
    "example_en": "The toy car costs five dollars at the store.",
    "example_cht": "這台玩具車要五塊錢。"
  },
  {
    "id": 1007,
    "section_id": 46,
    "part_of_speech_id": 2,
    "word": "earn",
    "meaning_cht": "賺得",
    "example_en": "I earn stars by doing my homework well.",
    "example_cht": "我把作業做好就能賺到小星星。"
  },
  {
    "id": 1008,
    "section_id": 46,
    "part_of_speech_id": 5,
    "word": "expensive",
    "meaning_cht": "昂貴的",
    "example_en": "The big remote control car is too expensive.",
    "example_cht": "那台大的遙控車太貴了。"
  },
  {
    "id": 1009,
    "section_id": 46,
    "part_of_speech_id": 1,
    "word": "money",
    "meaning_cht": "錢",
    "example_en": "Money jingles and jangles in the piggy bank.",
    "example_cht": "存錢筒裡的錢幣叮鈴咚響。"
  },
  {
    "id": 1010,
    "section_id": 46,
    "part_of_speech_id": 2,
    "word": "pay",
    "meaning_cht": "付錢",
    "example_en": "I pay for candy with coins from my piggy bank.",
    "example_cht": "我用存錢筒的硬幣買糖果。"
  },
  {
    "id": 1011,
    "section_id": 46,
    "part_of_speech_id": 1,
    "word": "price",
    "meaning_cht": "價格",
    "example_en": "What's the price of that shiny red balloon?",
    "example_cht": "那顆亮亮的紅氣球多少錢？"
  },
  {
    "id": 1012,
    "section_id": 46,
    "part_of_speech_id": 2,
    "word": "save",
    "meaning_cht": "儲存/拯救",
    "example_en": "I save my allowance to buy something special.",
    "example_cht": "我把零用錢存起來，想買特別的東西。"
  },
  {
    "id": 1013,
    "section_id": 46,
    "part_of_speech_id": 2,
    "word": "sell",
    "meaning_cht": "賣/販售",
    "example_en": "They sell fresh fruit at the market.",
    "example_cht": "他們在市場賣新鮮水果。"
  },
  {
    "id": 1014,
    "section_id": 46,
    "part_of_speech_id": 2,
    "word": "sell",
    "meaning_cht": "販賣",
    "example_en": "They sell fresh lemonade on hot summer days.",
    "example_cht": "熱熱的夏天他們賣冰冰的檸檬水。"
  },
  {
    "id": 1015,
    "section_id": 46,
    "part_of_speech_id": 2,
    "word": "spend",
    "meaning_cht": "花費",
    "example_en": "I spend my money on a new toy.",
    "example_cht": "我把錢花在一個新玩具上。"
  },
  {
    "id": 1016,
    "section_id": 47,
    "part_of_speech_id": 1,
    "word": "choice",
    "meaning_cht": "選擇",
    "example_en": "Making a good choice takes time to think.",
    "example_cht": "做出好選擇要花時間想一想。"
  },
  {
    "id": 1017,
    "section_id": 47,
    "part_of_speech_id": 2,
    "word": "choose",
    "meaning_cht": "選擇",
    "example_en": "I choose the blue balloon because it's pretty.",
    "example_cht": "我選藍色的氣球，因為它很漂亮。"
  },
  {
    "id": 1018,
    "section_id": 47,
    "part_of_speech_id": 2,
    "word": "decide",
    "meaning_cht": "決定",
    "example_en": "I decide to wear my red shirt today.",
    "example_cht": "我決定今天穿紅色的上衣。"
  },
  {
    "id": 1019,
    "section_id": 47,
    "part_of_speech_id": 1,
    "word": "decision",
    "meaning_cht": "決定",
    "example_en": "That was a good decision you made there.",
    "example_cht": "你剛剛做了一個很棒的決定。"
  },
  {
    "id": 1020,
    "section_id": 48,
    "part_of_speech_id": 1,
    "word": "chance",
    "meaning_cht": "機會",
    "example_en": "Everyone gets a chance to answer the question.",
    "example_cht": "每個人都有機會回答問題。"
  },
  {
    "id": 1021,
    "section_id": 48,
    "part_of_speech_id": 1,
    "word": "luck",
    "meaning_cht": "運氣",
    "example_en": "Good luck on your test tomorrow at school.",
    "example_cht": "祝你明天在學校考試好運。"
  },
  {
    "id": 1022,
    "section_id": 48,
    "part_of_speech_id": 5,
    "word": "lucky",
    "meaning_cht": "幸運的",
    "example_en": "I feel lucky to have such good friends.",
    "example_cht": "有這麼好的朋友，我覺得很幸運。"
  },
  {
    "id": 1023,
    "section_id": 48,
    "part_of_speech_id": 5,
    "word": "unlucky",
    "meaning_cht": "不幸的",
    "example_en": "It was unlucky that it rained on our picnic.",
    "example_cht": "野餐遇到下雨真是不太幸運。"
  },
  {
    "id": 1024,
    "section_id": 48,
    "part_of_speech_id": 2,
    "word": "wait",
    "meaning_cht": "等待",
    "example_en": "I wait patiently for my turn to play.",
    "example_cht": "我耐心等到輪到我玩。"
  },
  {
    "id": 1025,
    "section_id": 49,
    "part_of_speech_id": 2,
    "word": "add",
    "meaning_cht": "增加/加",
    "example_en": "I add one more block to my tower.",
    "example_cht": "我在我的塔上再加一塊積木。"
  },
  {
    "id": 1026,
    "section_id": 49,
    "part_of_speech_id": 2,
    "word": "add",
    "meaning_cht": "加上",
    "example_en": "Add one more block to make tower taller.",
    "example_cht": "再加一塊積木，塔就更高。"
  },
  {
    "id": 1027,
    "section_id": 49,
    "part_of_speech_id": 1,
    "word": "couple",
    "meaning_cht": "一對/幾個",
    "example_en": "A couple of birds sit on the wire.",
    "example_cht": "電線上坐著兩隻小鳥。"
  },
  {
    "id": 1028,
    "section_id": 49,
    "part_of_speech_id": 1,
    "word": "double",
    "meaning_cht": "兩倍",
    "example_en": "Two is double the amount of one here.",
    "example_cht": "二就是一的兩倍。"
  },
  {
    "id": 1029,
    "section_id": 49,
    "part_of_speech_id": 1,
    "word": "dozen",
    "meaning_cht": "一打",
    "example_en": "We bought a dozen eggs at the store.",
    "example_cht": "我們在商店買了一打雞蛋。"
  },
  {
    "id": 1030,
    "section_id": 49,
    "part_of_speech_id": 2,
    "word": "equal",
    "meaning_cht": "等於",
    "example_en": "Two plus two equals four every single time.",
    "example_cht": "二加二每次都等於四。"
  },
  {
    "id": 1031,
    "section_id": 49,
    "part_of_speech_id": 5,
    "word": "equal",
    "meaning_cht": "相等的",
    "example_en": "Both sides have equal amounts of candy here.",
    "example_cht": "兩邊的糖果一樣多。"
  },
  {
    "id": 1032,
    "section_id": 49,
    "part_of_speech_id": 1,
    "word": "equals",
    "meaning_cht": "等號",
    "example_en": "The equals sign shows the answer to problem.",
    "example_cht": "等號告訴你答案在這裡。"
  },
  {
    "id": 1033,
    "section_id": 49,
    "part_of_speech_id": 1,
    "word": "math",
    "meaning_cht": "數學",
    "example_en": "Math helps us count and solve fun problems.",
    "example_cht": "數學幫助我們數一數、解有趣的題目。"
  },
  {
    "id": 1034,
    "section_id": 49,
    "part_of_speech_id": 1,
    "word": "minus",
    "meaning_cht": "減號",
    "example_en": "The minus sign means we take numbers away.",
    "example_cht": "減號表示把數字拿走。"
  },
  {
    "id": 1035,
    "section_id": 49,
    "part_of_speech_id": 5,
    "word": "multiple",
    "meaning_cht": "多個的",
    "example_en": "There are multiple ways to solve this problem.",
    "example_cht": "這題有好幾種解法。"
  },
  {
    "id": 1036,
    "section_id": 49,
    "part_of_speech_id": 2,
    "word": "multiply",
    "meaning_cht": "乘",
    "example_en": "Two times three equals six in math class.",
    "example_cht": "二乘三等於六。"
  },
  {
    "id": 1037,
    "section_id": 49,
    "part_of_speech_id": 1,
    "word": "pair",
    "meaning_cht": "一對",
    "example_en": "I have a pair of silly socks that giggle when I walk!",
    "example_cht": "我有一雙好笑的襪子,我走路時它們會咯咯笑!"
  },
  {
    "id": 1038,
    "section_id": 49,
    "part_of_speech_id": 1,
    "word": "plus",
    "meaning_cht": "加號",
    "example_en": "The plus sign means we add numbers together.",
    "example_cht": "加號表示把數字加在一起。"
  },
  {
    "id": 1039,
    "section_id": 49,
    "part_of_speech_id": 1,
    "word": "quarter",
    "meaning_cht": "四分之一",
    "example_en": "A quarter is one fourth of the whole.",
    "example_cht": "四分之一就是整體的四分之一。"
  },
  {
    "id": 1040,
    "section_id": 49,
    "part_of_speech_id": 5,
    "word": "single",
    "meaning_cht": "單一的",
    "example_en": "I need a single pencil for the test.",
    "example_cht": "我考試時需要一枝鉛筆。"
  },
  {
    "id": 1041,
    "section_id": 49,
    "part_of_speech_id": 2,
    "word": "subtract",
    "meaning_cht": "減去",
    "example_en": "If I subtract two cookies I have one.",
    "example_cht": "如果我減掉兩片餅乾，就只剩一片。"
  },
  {
    "id": 1042,
    "section_id": 50,
    "part_of_speech_id": 1,
    "word": "button",
    "meaning_cht": "按鈕",
    "example_en": "I press the button to turn on light.",
    "example_cht": "我按按鈕把燈打開。"
  },
  {
    "id": 1043,
    "section_id": 50,
    "part_of_speech_id": 1,
    "word": "camera",
    "meaning_cht": "相機",
    "example_en": "The camera takes pictures of happy family moments.",
    "example_cht": "相機把家裡開心的時刻拍下來。"
  },
  {
    "id": 1044,
    "section_id": 50,
    "part_of_speech_id": 1,
    "word": "computer",
    "meaning_cht": "電腦",
    "example_en": "I play educational games on the computer sometimes.",
    "example_cht": "我有時在電腦上玩學習遊戲。"
  },
  {
    "id": 1045,
    "section_id": 50,
    "part_of_speech_id": 1,
    "word": "machine",
    "meaning_cht": "機器",
    "example_en": "The washing machine cleans our dirty clothes well.",
    "example_cht": "洗衣機把髒衣服洗得乾乾淨淨。"
  },
  {
    "id": 1046,
    "section_id": 50,
    "part_of_speech_id": 1,
    "word": "phone",
    "meaning_cht": "電話",
    "example_en": "I call grandma on the phone every week.",
    "example_cht": "我每週都用電話打給阿嬤。"
  },
  {
    "id": 1047,
    "section_id": 50,
    "part_of_speech_id": 1,
    "word": "photo",
    "meaning_cht": "照片",
    "example_en": "This photo shows our family at the beach.",
    "example_cht": "這張照片拍的是我們全家在海邊。"
  },
  {
    "id": 1048,
    "section_id": 50,
    "part_of_speech_id": 1,
    "word": "photograph",
    "meaning_cht": "照片",
    "example_en": "The old photograph is from long ago times.",
    "example_cht": "這張舊照片是很久很久以前的。"
  },
  {
    "id": 1049,
    "section_id": 50,
    "part_of_speech_id": 1,
    "word": "robot",
    "meaning_cht": "機器人",
    "example_en": "My toy robot walks and talks to me.",
    "example_cht": "我的玩具機器人會走路，還會跟我說話。"
  },
  {
    "id": 1050,
    "section_id": 50,
    "part_of_speech_id": 1,
    "word": "rocket",
    "meaning_cht": "火箭",
    "example_en": "The rocket blasts off into outer space fast.",
    "example_cht": "火箭唰地一聲衝向外太空。"
  },
  {
    "id": 1051,
    "section_id": 50,
    "part_of_speech_id": 1,
    "word": "screen",
    "meaning_cht": "螢幕",
    "example_en": "The movie plays on the big bright screen.",
    "example_cht": "電影在大大的亮亮螢幕上播。"
  },
  {
    "id": 1052,
    "section_id": 50,
    "part_of_speech_id": 1,
    "word": "spaceship",
    "meaning_cht": "太空船",
    "example_en": "The spaceship travels to distant planets far away.",
    "example_cht": "太空船飛到很遠很遠的星球。"
  },
  {
    "id": 1053,
    "section_id": 50,
    "part_of_speech_id": 1,
    "word": "tablet",
    "meaning_cht": "平板電腦",
    "example_en": "I draw pictures on the tablet with my finger.",
    "example_cht": "我用手指在平板上畫圖。"
  },
  {
    "id": 1054,
    "section_id": 50,
    "part_of_speech_id": 1,
    "word": "tool",
    "meaning_cht": "工具",
    "example_en": "A hammer is a tool for building things.",
    "example_cht": "鐵鎚是用來蓋東西的工具。"
  },
  {
    "id": 1055,
    "section_id": 50,
    "part_of_speech_id": 1,
    "word": "video",
    "meaning_cht": "影片",
    "example_en": "We watch funny videos of cats being silly.",
    "example_cht": "我們看貓咪搞笑的有趣影片。"
  },
  {
    "id": 1056,
    "section_id": 51,
    "part_of_speech_id": 1,
    "word": "alien",
    "meaning_cht": "外星人",
    "example_en": "The friendly alien waves hello from the stars.",
    "example_cht": "友善的外星人在星星那邊跟我揮手打招呼。"
  },
  {
    "id": 1057,
    "section_id": 51,
    "part_of_speech_id": 1,
    "word": "beginning",
    "meaning_cht": "開始",
    "example_en": "At the beginning of the story the prince appears.",
    "example_cht": "故事一開始，王子就出現了。"
  },
  {
    "id": 1058,
    "section_id": 51,
    "part_of_speech_id": 1,
    "word": "castle",
    "meaning_cht": "城堡",
    "example_en": "The stone castle has towers reaching to clouds.",
    "example_cht": "石頭城堡的高塔直直摸到雲。"
  },
  {
    "id": 1059,
    "section_id": 51,
    "part_of_speech_id": 5,
    "word": "creative",
    "meaning_cht": "有創意的",
    "example_en": "Creative people think of new fun different ideas.",
    "example_cht": "有創意的人會想到新奇又好玩的主意。"
  },
  {
    "id": 1060,
    "section_id": 51,
    "part_of_speech_id": 1,
    "word": "crown",
    "meaning_cht": "皇冠",
    "example_en": "The queen's crown is covered with shiny jewels.",
    "example_cht": "女王的皇冠上滿是亮晶晶的寶石。"
  },
  {
    "id": 1061,
    "section_id": 51,
    "part_of_speech_id": 1,
    "word": "dragon",
    "meaning_cht": "龍",
    "example_en": "The friendly dragon breathes colorful fire out.",
    "example_cht": "和善的龍會吐出彩色的火焰。"
  },
  {
    "id": 1062,
    "section_id": 51,
    "part_of_speech_id": 1,
    "word": "ending",
    "meaning_cht": "結尾",
    "example_en": "The ending of the story makes me smile.",
    "example_cht": "這個故事的結局讓我微笑。"
  },
  {
    "id": 1063,
    "section_id": 51,
    "part_of_speech_id": 1,
    "word": "fairy",
    "meaning_cht": "仙子",
    "example_en": "The tiny fairy has wings that glow bright.",
    "example_cht": "小小仙子有會發光的翅膀。"
  },
  {
    "id": 1064,
    "section_id": 51,
    "part_of_speech_id": 1,
    "word": "flag",
    "meaning_cht": "旗子",
    "example_en": "The colorful flag waves in the strong wind.",
    "example_cht": "五顏六色的旗子在大風裡飄啊飄。"
  },
  {
    "id": 1065,
    "section_id": 51,
    "part_of_speech_id": 1,
    "word": "giant",
    "meaning_cht": "巨人",
    "example_en": "The gentle giant helps us reach the apples.",
    "example_cht": "溫柔的巨人幫我們夠到蘋果。"
  },
  {
    "id": 1066,
    "section_id": 51,
    "part_of_speech_id": 1,
    "word": "imagination",
    "meaning_cht": "想像力",
    "example_en": "My imagination takes me on amazing wild adventures.",
    "example_cht": "我的想像力帶我去奇妙的大冒險。"
  },
  {
    "id": 1067,
    "section_id": 51,
    "part_of_speech_id": 1,
    "word": "king",
    "meaning_cht": "國王",
    "example_en": "The king lives in a big castle.",
    "example_cht": "國王住在一座大城堡裡。"
  },
  {
    "id": 1068,
    "section_id": 51,
    "part_of_speech_id": 1,
    "word": "knight",
    "meaning_cht": "騎士",
    "example_en": "The brave knight rides a white horse fast.",
    "example_cht": "勇敢的騎士騎著白馬飛快奔跑。"
  },
  {
    "id": 1069,
    "section_id": 51,
    "part_of_speech_id": 1,
    "word": "magic",
    "meaning_cht": "魔法",
    "example_en": "Real magic happens when you help someone today.",
    "example_cht": "當你幫助別人時，真正的魔法就出現了。"
  },
  {
    "id": 1070,
    "section_id": 51,
    "part_of_speech_id": 5,
    "word": "magic",
    "meaning_cht": "魔法的",
    "example_en": "My magic wand turns pebbles into gold dreams.",
    "example_cht": "我的魔杖把小石頭變成金色的夢。"
  },
  {
    "id": 1071,
    "section_id": 51,
    "part_of_speech_id": 1,
    "word": "monster",
    "meaning_cht": "怪獸",
    "example_en": "The monster under my bed is actually nice.",
    "example_cht": "我床底下的怪獸其實很友善。"
  },
  {
    "id": 1072,
    "section_id": 51,
    "part_of_speech_id": 1,
    "word": "picture",
    "meaning_cht": "圖畫/照片",
    "example_en": "The picture shows a blue flying bird.",
    "example_cht": "這張圖畫上有一隻藍色會飛的鳥。"
  },
  {
    "id": 1073,
    "section_id": 51,
    "part_of_speech_id": 1,
    "word": "pirate",
    "meaning_cht": "海盜",
    "example_en": "The pirate wears a hat with a skull.",
    "example_cht": "海盜戴著一頂有骷髏頭的帽子。"
  },
  {
    "id": 1074,
    "section_id": 51,
    "part_of_speech_id": 1,
    "word": "planet",
    "meaning_cht": "星球",
    "example_en": "We live on planet Earth spinning in space.",
    "example_cht": "我們住在地球上，它在宇宙裡轉啊轉。"
  },
  {
    "id": 1075,
    "section_id": 51,
    "part_of_speech_id": 1,
    "word": "prince",
    "meaning_cht": "王子",
    "example_en": "The prince lives in a tall stone castle.",
    "example_cht": "王子住在高高的石頭城堡。"
  },
  {
    "id": 1076,
    "section_id": 51,
    "part_of_speech_id": 1,
    "word": "princess",
    "meaning_cht": "公主",
    "example_en": "The princess wears a sparkly crown on her head.",
    "example_cht": "公主頭上戴著閃亮亮的皇冠。"
  },
  {
    "id": 1077,
    "section_id": 51,
    "part_of_speech_id": 1,
    "word": "queen",
    "meaning_cht": "女王",
    "example_en": "The kind queen helps all the people here.",
    "example_cht": "善良的皇后幫助這裡的所有人。"
  },
  {
    "id": 1078,
    "section_id": 51,
    "part_of_speech_id": 1,
    "word": "tent",
    "meaning_cht": "帳篷",
    "example_en": "We sleep in a tent under the stars.",
    "example_cht": "我們睡在星空下的小帳篷裡。"
  },
  {
    "id": 1079,
    "section_id": 51,
    "part_of_speech_id": 1,
    "word": "tower",
    "meaning_cht": "塔",
    "example_en": "I climb to the top of the tower.",
    "example_cht": "我爬到塔的最頂端。"
  },
  {
    "id": 1080,
    "section_id": 51,
    "part_of_speech_id": 1,
    "word": "treasure",
    "meaning_cht": "寶藏",
    "example_en": "We dig for treasure buried in the sand.",
    "example_cht": "我們在沙裡挖寶藏。"
  },
  {
    "id": 1081,
    "section_id": 51,
    "part_of_speech_id": 1,
    "word": "universe",
    "meaning_cht": "宇宙",
    "example_en": "The universe is an endless ocean of stars and mysteries.",
    "example_cht": "宇宙像一片沒有盡頭的星星海洋。"
  },
  {
    "id": 1082,
    "section_id": 51,
    "part_of_speech_id": 1,
    "word": "witch",
    "meaning_cht": "女巫",
    "example_en": "The good witch makes magic potions to help.",
    "example_cht": "好女巫調出魔法藥水來幫忙。"
  },
  {
    "id": 1083,
    "section_id": 51,
    "part_of_speech_id": 1,
    "word": "wizard",
    "meaning_cht": "巫師",
    "example_en": "The wise wizard has a long white beard.",
    "example_cht": "智慧的巫師有一把長長的白鬍子。"
  },
  {
    "id": 1084,
    "section_id": 52,
    "part_of_speech_id": 2,
    "word": "bark",
    "meaning_cht": "吠叫",
    "example_en": "Puppies bark when they see their friends.",
    "example_cht": "小狗看到朋友就汪汪叫。"
  },
  {
    "id": 1085,
    "section_id": 52,
    "part_of_speech_id": 2,
    "word": "growl",
    "meaning_cht": "低吼",
    "example_en": "My tummy can growl before lunch time.",
    "example_cht": "午餐前我的肚子會咕嚕咕嚕叫。"
  },
  {
    "id": 1086,
    "section_id": 52,
    "part_of_speech_id": 2,
    "word": "meow",
    "meaning_cht": "喵叫",
    "example_en": "Kittens meow for milk at night time.",
    "example_cht": "小貓晚上會喵喵叫要牛奶。"
  },
  {
    "id": 1087,
    "section_id": 52,
    "part_of_speech_id": 1,
    "word": "noise",
    "meaning_cht": "噪音",
    "example_en": "The noise wakes the baby right up.",
    "example_cht": "噪音會把寶寶吵醒。"
  },
  {
    "id": 1088,
    "section_id": 52,
    "part_of_speech_id": 2,
    "word": "quack",
    "meaning_cht": "呱叫",
    "example_en": "The ducklings quack for their mom duck.",
    "example_cht": "小鴨子嘎嘎叫著找媽媽。"
  },
  {
    "id": 1089,
    "section_id": 52,
    "part_of_speech_id": 1,
    "word": "ring",
    "meaning_cht": "戒指/鈴聲",
    "example_en": "The phone makes a loud ring sound.",
    "example_cht": "電話發出很大的鈴聲。"
  },
  {
    "id": 1090,
    "section_id": 52,
    "part_of_speech_id": 2,
    "word": "ring",
    "meaning_cht": "響",
    "example_en": "The bell rings when it's time for class.",
    "example_cht": "上課時間到，鈴聲就會響。"
  },
  {
    "id": 1091,
    "section_id": 52,
    "part_of_speech_id": 2,
    "word": "roar",
    "meaning_cht": "吼叫",
    "example_en": "I roar like a friendly big lion.",
    "example_cht": "我學友善的大獅子吼一聲。"
  },
  {
    "id": 1092,
    "section_id": 52,
    "part_of_speech_id": 1,
    "word": "silence",
    "meaning_cht": "安靜/寂靜",
    "example_en": "The silence at night is peaceful and calm.",
    "example_cht": "夜裡的安靜很平和、很安穩。"
  },
  {
    "id": 1093,
    "section_id": 52,
    "part_of_speech_id": 1,
    "word": "sound",
    "meaning_cht": "聲音",
    "example_en": "The sound of rain is soft music.",
    "example_cht": "雨聲像柔柔的音樂。"
  },
  {
    "id": 1094,
    "section_id": 52,
    "part_of_speech_id": 1,
    "word": "voice",
    "meaning_cht": "聲音",
    "example_en": "Mom's voice is soft and makes me calm.",
    "example_cht": "媽媽的聲音很溫柔，讓我心裡好安靜。"
  },
  {
    "id": 1095,
    "section_id": 53,
    "part_of_speech_id": 5,
    "word": "bright",
    "meaning_cht": "明亮的",
    "example_en": "The morning is bright and so warm.",
    "example_cht": "早晨亮亮的、暖暖的。"
  },
  {
    "id": 1096,
    "section_id": 53,
    "part_of_speech_id": 5,
    "word": "dark",
    "meaning_cht": "黑暗的",
    "example_en": "When it gets dark, fireflies come to light our way!",
    "example_cht": "天黑的時候,螢火蟲就來照亮我們的路!"
  },
  {
    "id": 1097,
    "section_id": 53,
    "part_of_speech_id": 1,
    "word": "dark",
    "meaning_cht": "黑暗",
    "example_en": "The dark is just light waiting for eyes.",
    "example_cht": "黑暗只是光在等著被看見。"
  },
  {
    "id": 1098,
    "section_id": 53,
    "part_of_speech_id": 2,
    "word": "shine",
    "meaning_cht": "發光",
    "example_en": "The stars shine above our small house.",
    "example_cht": "星星在我們小房子上方閃閃發亮。"
  },
  {
    "id": 1099,
    "section_id": 53,
    "part_of_speech_id": 2,
    "word": "show",
    "meaning_cht": "展示",
    "example_en": "The rainbow shows us that the world is colorful.",
    "example_cht": "彩虹告訴我們，世界好多彩。"
  },
  {
    "id": 1100,
    "section_id": 54,
    "part_of_speech_id": 2,
    "word": "crawl",
    "meaning_cht": "爬行",
    "example_en": "Ants crawl across the picnic cloth fast.",
    "example_cht": "螞蟻在野餐布上快速爬過去。"
  },
  {
    "id": 1101,
    "section_id": 54,
    "part_of_speech_id": 2,
    "word": "die",
    "meaning_cht": "死亡",
    "example_en": "When flowers die they become food for new life.",
    "example_cht": "花謝了會變成新生命的養分。"
  },
  {
    "id": 1102,
    "section_id": 54,
    "part_of_speech_id": 2,
    "word": "get",
    "meaning_cht": "得到/取得",
    "example_en": "I get a sticker for helping others.",
    "example_cht": "我幫助別人就得到一張貼紙。"
  },
  {
    "id": 1103,
    "section_id": 54,
    "part_of_speech_id": 2,
    "word": "get",
    "meaning_cht": "獲得",
    "example_en": "I get butterflies in my tummy when excited.",
    "example_cht": "我一興奮，肚子就小鹿亂撞。"
  },
  {
    "id": 1104,
    "section_id": 54,
    "part_of_speech_id": 2,
    "word": "keep",
    "meaning_cht": "保持/保留",
    "example_en": "I keep my sense of fun safe in heart.",
    "example_cht": "我把好玩的心放在心裡好好守護。"
  },
  {
    "id": 1105,
    "section_id": 54,
    "part_of_speech_id": 2,
    "word": "let",
    "meaning_cht": "允許",
    "example_en": "Let your imagination run wild like a dog!",
    "example_cht": "讓你的想像力像小狗一樣到處奔跑吧！"
  },
  {
    "id": 1106,
    "section_id": 54,
    "part_of_speech_id": 2,
    "word": "live",
    "meaning_cht": "居住",
    "example_en": "Tiny bugs live inside the flowers waiting here.",
    "example_cht": "小小的昆蟲住在花朵裡，躲在那裡等著。"
  },
  {
    "id": 1107,
    "section_id": 54,
    "part_of_speech_id": 2,
    "word": "roll",
    "meaning_cht": "滾動",
    "example_en": "I roll the ball across the floor.",
    "example_cht": "我把球在地板上滾過去。"
  },
  {
    "id": 1108,
    "section_id": 54,
    "part_of_speech_id": 2,
    "word": "seem",
    "meaning_cht": "似乎/看起來",
    "example_en": "You seem happy today with your smile.",
    "example_cht": "你今天看起來很開心，笑容亮亮的。"
  },
  {
    "id": 1109,
    "section_id": 54,
    "part_of_speech_id": 2,
    "word": "send",
    "meaning_cht": "寄送",
    "example_en": "I send a letter to my friend.",
    "example_cht": "我寄一封信給朋友。"
  },
  {
    "id": 1110,
    "section_id": 54,
    "part_of_speech_id": 2,
    "word": "set",
    "meaning_cht": "設置/放置",
    "example_en": "I set the table for dinner time.",
    "example_cht": "晚餐時間我把餐桌擺好。"
  },
  {
    "id": 1111,
    "section_id": 54,
    "part_of_speech_id": 2,
    "word": "slither",
    "meaning_cht": "滑行",
    "example_en": "Worms slither through the soft wet dirt.",
    "example_cht": "蠕蟲在柔軟濕濕的土裡滑行。"
  },
  {
    "id": 1112,
    "section_id": 54,
    "part_of_speech_id": 2,
    "word": "swim",
    "meaning_cht": "游泳",
    "example_en": "Fish swim in the clear blue water.",
    "example_cht": "小魚在清清藍藍的水裡游泳。"
  },
  {
    "id": 1113,
    "section_id": 54,
    "part_of_speech_id": 2,
    "word": "use",
    "meaning_cht": "使用",
    "example_en": "I use my imagination like a toy making worlds.",
    "example_cht": "我用想像力像玩具一樣，造出小小世界。"
  },
  {
    "id": 1114,
    "section_id": 55,
    "part_of_speech_id": 1,
    "word": "building",
    "meaning_cht": "建築物",
    "example_en": "That tall building touches the clouds way up.",
    "example_cht": "那棟高樓高到像要摸到雲。"
  },
  {
    "id": 1115,
    "section_id": 55,
    "part_of_speech_id": 1,
    "word": "compass",
    "meaning_cht": "指南針",
    "example_en": "The compass always points north to help explorers.",
    "example_cht": "指南針總是指向北方，幫助探險家。"
  },
  {
    "id": 1116,
    "section_id": 55,
    "part_of_speech_id": 1,
    "word": "energy",
    "meaning_cht": "能量",
    "example_en": "Food gives me energy to run and play.",
    "example_cht": "食物給我力氣去跑去玩。"
  },
  {
    "id": 1117,
    "section_id": 55,
    "part_of_speech_id": 1,
    "word": "factory",
    "meaning_cht": "工廠",
    "example_en": "The factory makes toys for children to play.",
    "example_cht": "工廠做出小朋友玩的玩具。"
  },
  {
    "id": 1118,
    "section_id": 55,
    "part_of_speech_id": 1,
    "word": "fountain",
    "meaning_cht": "噴泉",
    "example_en": "Water shoots high from the pretty fountain here.",
    "example_cht": "漂亮的噴泉把水噴得高高的。"
  },
  {
    "id": 1119,
    "section_id": 55,
    "part_of_speech_id": 1,
    "word": "hole",
    "meaning_cht": "洞",
    "example_en": "That mysterious hole in the tree might lead to a kingdom!",
    "example_cht": "樹上的那個神祕洞也許通往一個王國！"
  },
  {
    "id": 1120,
    "section_id": 55,
    "part_of_speech_id": 1,
    "word": "hug",
    "meaning_cht": "擁抱",
    "example_en": "A hug makes the day feel warm.",
    "example_cht": "一個擁抱讓今天變得暖暖的。"
  },
  {
    "id": 1121,
    "section_id": 55,
    "part_of_speech_id": 1,
    "word": "kiss",
    "meaning_cht": "親吻",
    "example_en": "I give a kiss to my grandma.",
    "example_cht": "我親親我的阿嬤。"
  },
  {
    "id": 1122,
    "section_id": 55,
    "part_of_speech_id": 1,
    "word": "ladder",
    "meaning_cht": "梯子",
    "example_en": "I climb the ladder to reach the stars.",
    "example_cht": "我爬上梯子，想要摸到星星。"
  },
  {
    "id": 1123,
    "section_id": 55,
    "part_of_speech_id": 1,
    "word": "life",
    "meaning_cht": "生命/生活",
    "example_en": "Life is an adventure waiting for us.",
    "example_cht": "生活是等著我們去走的冒險。"
  },
  {
    "id": 1124,
    "section_id": 55,
    "part_of_speech_id": 1,
    "word": "map",
    "meaning_cht": "地圖",
    "example_en": "The treasure map shows where to dig for gold.",
    "example_cht": "寶藏地圖畫著要在哪裡挖金子。"
  },
  {
    "id": 1125,
    "section_id": 55,
    "part_of_speech_id": 1,
    "word": "party",
    "meaning_cht": "派對/聚會",
    "example_en": "All the animals come to my birthday party!",
    "example_cht": "所有的動物都來參加我的生日派對!"
  },
  {
    "id": 1126,
    "section_id": 55,
    "part_of_speech_id": 1,
    "word": "path",
    "meaning_cht": "小徑",
    "example_en": "We follow the winding path through the woods.",
    "example_cht": "我們沿著彎彎曲曲的小路穿過樹林。"
  },
  {
    "id": 1127,
    "section_id": 55,
    "part_of_speech_id": 1,
    "word": "present",
    "meaning_cht": "禮物",
    "example_en": "The mystery present sparkles with ribbons like a treasure!",
    "example_cht": "神祕禮物上閃亮的緞帶像寶藏一樣發光！"
  },
  {
    "id": 1128,
    "section_id": 55,
    "part_of_speech_id": 1,
    "word": "problem",
    "meaning_cht": "問題",
    "example_en": "Every problem is like a puzzle waiting to be solved.",
    "example_cht": "每個問題都像拼圖，等著被解開。"
  },
  {
    "id": 1129,
    "section_id": 55,
    "part_of_speech_id": 1,
    "word": "sign",
    "meaning_cht": "標誌/符號",
    "example_en": "The sign shows the way to go.",
    "example_cht": "指示牌告訴我們要往哪裡走。"
  },
  {
    "id": 1130,
    "section_id": 55,
    "part_of_speech_id": 1,
    "word": "statue",
    "meaning_cht": "雕像",
    "example_en": "The stone statue stands in the park center.",
    "example_cht": "石像站在公園的正中央。"
  },
  {
    "id": 1131,
    "section_id": 55,
    "part_of_speech_id": 1,
    "word": "surprise",
    "meaning_cht": "驚喜",
    "example_en": "Mom has a special surprise waiting for me.",
    "example_cht": "媽媽有一個特別的驚喜在等我。"
  },
  {
    "id": 1132,
    "section_id": 55,
    "part_of_speech_id": 2,
    "word": "surprise",
    "meaning_cht": "使驚訝",
    "example_en": "I will surprise mom with breakfast in bed.",
    "example_cht": "我要端早餐到床邊給媽媽一個驚喜。"
  },
  {
    "id": 1133,
    "section_id": 55,
    "part_of_speech_id": 1,
    "word": "thing",
    "meaning_cht": "東西/事物",
    "example_en": "The best thing today is playing here.",
    "example_cht": "今天最棒的事情就是在這裡玩。"
  },
  {
    "id": 1134,
    "section_id": 55,
    "part_of_speech_id": 1,
    "word": "trail",
    "meaning_cht": "小道",
    "example_en": "The hiking trail leads to a beautiful viewpoint.",
    "example_cht": "這條步道通往很美的景觀點。"
  },
  {
    "id": 1135,
    "section_id": 55,
    "part_of_speech_id": 1,
    "word": "way",
    "meaning_cht": "方式/道路",
    "example_en": "There are many ways to make smiles.",
    "example_cht": "讓人微笑的方法有很多種。"
  },
  {
    "id": 1136,
    "section_id": 55,
    "part_of_speech_id": 1,
    "word": "way",
    "meaning_cht": "方法/路",
    "example_en": "The rainbow shows the way to go.",
    "example_cht": "彩虹指引我們該走的方向。"
  },
  {
    "id": 1137,
    "section_id": 55,
    "part_of_speech_id": 1,
    "word": "way",
    "meaning_cht": "方法/道路",
    "example_en": "The bunny showed us the secret way through the hedge.",
    "example_cht": "小兔子帶我們走過樹籬的祕密小路。"
  },
  {
    "id": 1138,
    "section_id": 55,
    "part_of_speech_id": 1,
    "word": "wheel",
    "meaning_cht": "輪子",
    "example_en": "The wheel on my wagon goes round fast.",
    "example_cht": "我的小拖車的輪子轉得飛快。"
  },
  {
    "id": 1139,
    "section_id": 56,
    "part_of_speech_id": 5,
    "word": "amazing",
    "meaning_cht": "驚人的",
    "example_en": "The amazing trick made everyone clap and cheer.",
    "example_cht": "這個厲害的把戲讓大家拍手歡呼。"
  },
  {
    "id": 1140,
    "section_id": 56,
    "part_of_speech_id": 5,
    "word": "asleep",
    "meaning_cht": "睡著的",
    "example_en": "The baby is fast asleep in the crib.",
    "example_cht": "寶寶在小床裡睡得香香的。"
  },
  {
    "id": 1141,
    "section_id": 56,
    "part_of_speech_id": 5,
    "word": "awake",
    "meaning_cht": "醒著的",
    "example_en": "I try to stay awake but my eyelids close.",
    "example_cht": "我想撐著不睡，但眼皮一直合起來。"
  },
  {
    "id": 1142,
    "section_id": 56,
    "part_of_speech_id": 5,
    "word": "awful",
    "meaning_cht": "可怕的",
    "example_en": "The medicine tastes awful but helps me heal.",
    "example_cht": "藥很難喝，但能幫我快快好。"
  },
  {
    "id": 1143,
    "section_id": 56,
    "part_of_speech_id": 5,
    "word": "best",
    "meaning_cht": "最好的",
    "example_en": "You are my best friend in school.",
    "example_cht": "你是我在學校最好的朋友。"
  },
  {
    "id": 1144,
    "section_id": 56,
    "part_of_speech_id": 5,
    "word": "clear",
    "meaning_cht": "清澈的/清楚的",
    "example_en": "The clear water is so clean, I can see fish.",
    "example_cht": "清澈的水好乾淨，我看得到魚。"
  },
  {
    "id": 1145,
    "section_id": 56,
    "part_of_speech_id": 5,
    "word": "favorite",
    "meaning_cht": "最喜歡的",
    "example_en": "My favorite color is bright rainbow yellow today.",
    "example_cht": "我今天最喜歡的顏色是亮亮的彩虹黃色。"
  },
  {
    "id": 1146,
    "section_id": 56,
    "part_of_speech_id": 5,
    "word": "fine",
    "meaning_cht": "好的/美好的",
    "example_en": "The weather is fine and sunny today.",
    "example_cht": "今天天氣很好、陽光溫暖。"
  },
  {
    "id": 1147,
    "section_id": 56,
    "part_of_speech_id": 5,
    "word": "free",
    "meaning_cht": "自由的/免費的",
    "example_en": "The bird is free to fly high.",
    "example_cht": "小鳥自由地飛上高空。"
  },
  {
    "id": 1148,
    "section_id": 56,
    "part_of_speech_id": 5,
    "word": "great",
    "meaning_cht": "很棒的",
    "example_en": "You did a great job on your drawing.",
    "example_cht": "你的畫畫得真棒！"
  },
  {
    "id": 1149,
    "section_id": 56,
    "part_of_speech_id": 5,
    "word": "horrible",
    "meaning_cht": "可怕的",
    "example_en": "The horrible nightmare woke me up last night.",
    "example_cht": "昨晚可怕的惡夢把我嚇醒了。"
  },
  {
    "id": 1150,
    "section_id": 56,
    "part_of_speech_id": 5,
    "word": "imaginary",
    "meaning_cht": "想像的",
    "example_en": "My imaginary dragon flies me to school morning clouds!",
    "example_cht": "我想像的龍載我飛過早晨的雲去上學！"
  },
  {
    "id": 1151,
    "section_id": 56,
    "part_of_speech_id": 5,
    "word": "other",
    "meaning_cht": "另外的",
    "example_en": "When one path is blocked, try the other path.",
    "example_cht": "一條路被擋住，就換另一條走走看。"
  },
  {
    "id": 1152,
    "section_id": 56,
    "part_of_speech_id": 5,
    "word": "own",
    "meaning_cht": "自己的",
    "example_en": "I have my own secret hideout in the tree!",
    "example_cht": "我在樹上有自己的祕密基地!"
  },
  {
    "id": 1153,
    "section_id": 56,
    "part_of_speech_id": 5,
    "word": "perfect",
    "meaning_cht": "完美的",
    "example_en": "This day is perfect for flying my kite.",
    "example_cht": "今天超適合放風箏。"
  },
  {
    "id": 1154,
    "section_id": 56,
    "part_of_speech_id": 5,
    "word": "sure",
    "meaning_cht": "確定的",
    "example_en": "I am sure that the sky is blue and grass is green.",
    "example_cht": "我很肯定，天空是藍的、草是綠的。"
  },
  {
    "id": 1155,
    "section_id": 56,
    "part_of_speech_id": 5,
    "word": "terrible",
    "meaning_cht": "糟糕的",
    "example_en": "The storm was terrible with loud thunder booming.",
    "example_cht": "這場暴風雨很可怕，雷聲轟隆隆。"
  },
  {
    "id": 1156,
    "section_id": 56,
    "part_of_speech_id": 5,
    "word": "wonderful",
    "meaning_cht": "精彩的",
    "example_en": "We had a wonderful time at the fair.",
    "example_cht": "我們在嘉年華玩得超開心。"
  },
  {
    "id": 1157,
    "section_id": 56,
    "part_of_speech_id": 5,
    "word": "wonderful",
    "meaning_cht": "很棒的",
    "example_en": "What a wonderful day to play outside now.",
    "example_cht": "今天是個在外面玩耍的美好日子。"
  },
  {
    "id": 1158,
    "section_id": 57,
    "part_of_speech_id": 7,
    "word": "almost",
    "meaning_cht": "幾乎",
    "example_en": "I almost caught the bubble before it floated away!",
    "example_cht": "我差一點就抓到那顆要飛走的泡泡！"
  },
  {
    "id": 1159,
    "section_id": 57,
    "part_of_speech_id": 7,
    "word": "anywhere",
    "meaning_cht": "任何地方",
    "example_en": "My imagination can take me anywhere I want.",
    "example_cht": "想像力能帶我去任何我想去的地方。"
  },
  {
    "id": 1160,
    "section_id": 57,
    "part_of_speech_id": 7,
    "word": "away",
    "meaning_cht": "離開/遠離",
    "example_en": "The bird flies away to the tree.",
    "example_cht": "小鳥飛走到那棵樹上。"
  },
  {
    "id": 1161,
    "section_id": 57,
    "part_of_speech_id": 7,
    "word": "even",
    "meaning_cht": "甚至",
    "example_en": "Even the grumpy cat smiled at me.",
    "example_cht": "就連愛生氣的貓也對我笑了。"
  },
  {
    "id": 1162,
    "section_id": 57,
    "part_of_speech_id": 7,
    "word": "everywhere",
    "meaning_cht": "每個地方",
    "example_en": "I see hearts and smiley faces everywhere.",
    "example_cht": "我到處都看到愛心和笑臉。"
  },
  {
    "id": 1163,
    "section_id": 57,
    "part_of_speech_id": 7,
    "word": "just",
    "meaning_cht": "剛好/只是",
    "example_en": "I just saw a shooting star fly.",
    "example_cht": "我剛剛看到一顆流星飛過。"
  },
  {
    "id": 1164,
    "section_id": 57,
    "part_of_speech_id": 7,
    "word": "maybe",
    "meaning_cht": "也許",
    "example_en": "Maybe the moon is made of cheese after all.",
    "example_cht": "也許月亮其實是做成的起司喔。"
  },
  {
    "id": 1165,
    "section_id": 57,
    "part_of_speech_id": 7,
    "word": "not",
    "meaning_cht": "不",
    "example_en": "The monster under my bed is not scary.",
    "example_cht": "我床底下的怪獸其實不可怕。"
  },
  {
    "id": 1166,
    "section_id": 57,
    "part_of_speech_id": 7,
    "word": "nowhere",
    "meaning_cht": "任何地方都沒有",
    "example_en": "The end of the rainbow is nowhere.",
    "example_cht": "彩虹的盡頭到哪裡都找不到。"
  },
  {
    "id": 1167,
    "section_id": 57,
    "part_of_speech_id": 7,
    "word": "only",
    "meaning_cht": "只有/僅僅",
    "example_en": "I'm the only one who knows this.",
    "example_cht": "這件事只有我知道。"
  },
  {
    "id": 1168,
    "section_id": 57,
    "part_of_speech_id": 7,
    "word": "perhaps",
    "meaning_cht": "或許",
    "example_en": "Perhaps that cloud is a sleeping giant's pillow.",
    "example_cht": "也許那朵雲是睡著的巨人的枕頭。"
  },
  {
    "id": 1169,
    "section_id": 57,
    "part_of_speech_id": 7,
    "word": "quite",
    "meaning_cht": "相當",
    "example_en": "The dragon's tail is quite long; it wraps around mountains.",
    "example_cht": "龍的尾巴非常長，能繞過整座山。"
  },
  {
    "id": 1170,
    "section_id": 57,
    "part_of_speech_id": 7,
    "word": "really",
    "meaning_cht": "真的",
    "example_en": "I really believe in magic because I see it everywhere.",
    "example_cht": "我真的相信魔法，因為我到處都看見它。"
  },
  {
    "id": 1171,
    "section_id": 57,
    "part_of_speech_id": 7,
    "word": "somewhere",
    "meaning_cht": "某處",
    "example_en": "Somewhere a rainbow is waiting to be found.",
    "example_cht": "在某個地方，彩虹正等著被找到。"
  },
  {
    "id": 1172,
    "section_id": 57,
    "part_of_speech_id": 7,
    "word": "surely",
    "meaning_cht": "肯定地",
    "example_en": "Surely tomorrow will bring another wonderful adventure.",
    "example_cht": "明天一定又會帶來一場精彩的冒險。"
  },
  {
    "id": 1173,
    "section_id": 57,
    "part_of_speech_id": 7,
    "word": "together",
    "meaning_cht": "一起",
    "example_en": "We play together at the park today.",
    "example_cht": "我們今天一起在公園玩。"
  },
  {
    "id": 1174,
    "section_id": 57,
    "part_of_speech_id": 7,
    "word": "well",
    "meaning_cht": "好/健康地",
    "example_en": "I sleep well and wake up happy.",
    "example_cht": "我睡得很好，起床心情美美的。"
  },
  {
    "id": 1175,
    "section_id": 58,
    "part_of_speech_id": 2,
    "word": "ate",
    "meaning_cht": "吃 (過去式)",
    "example_en": "I ate all my vegetables at dinner.",
    "example_cht": "我晚餐把蔬菜全部吃光光。"
  },
  {
    "id": 1176,
    "section_id": 58,
    "part_of_speech_id": 2,
    "word": "came",
    "meaning_cht": "來 (過去式)",
    "example_en": "My friend came to my house yesterday.",
    "example_cht": "我的朋友昨天來我家。"
  },
  {
    "id": 1177,
    "section_id": 58,
    "part_of_speech_id": 2,
    "word": "fell",
    "meaning_cht": "跌倒 (過去式)",
    "example_en": "I fell down but got right up.",
    "example_cht": "我跌倒了，但馬上站起來。"
  },
  {
    "id": 1178,
    "section_id": 58,
    "part_of_speech_id": 2,
    "word": "found",
    "meaning_cht": "找到 (過去式)",
    "example_en": "I found my lost toy under the bed.",
    "example_cht": "我在床底下找到弄丟的玩具。"
  },
  {
    "id": 1179,
    "section_id": 58,
    "part_of_speech_id": 2,
    "word": "gave",
    "meaning_cht": "給 (過去式)",
    "example_en": "She gave me a flower from the garden.",
    "example_cht": "她送我一朵花，從花園摘的。"
  },
  {
    "id": 1180,
    "section_id": 58,
    "part_of_speech_id": 2,
    "word": "got",
    "meaning_cht": "得到 (過去式)",
    "example_en": "I got a new book from the library.",
    "example_cht": "我從圖書館借到一本新書。"
  },
  {
    "id": 1181,
    "section_id": 58,
    "part_of_speech_id": 2,
    "word": "grew",
    "meaning_cht": "成長 (過去式)",
    "example_en": "My plant grew tall in the sun.",
    "example_cht": "我的植物在陽光下長高了。"
  },
  {
    "id": 1182,
    "section_id": 58,
    "part_of_speech_id": 2,
    "word": "heard",
    "meaning_cht": "聽到 (過去式)",
    "example_en": "I heard a bird singing this morning.",
    "example_cht": "今天早上我聽到小鳥在唱歌。"
  },
  {
    "id": 1183,
    "section_id": 58,
    "part_of_speech_id": 2,
    "word": "held",
    "meaning_cht": "握住 (過去式)",
    "example_en": "I held my mom's hand tight today.",
    "example_cht": "我今天緊緊牽著媽媽的手。"
  },
  {
    "id": 1184,
    "section_id": 58,
    "part_of_speech_id": 2,
    "word": "kept",
    "meaning_cht": "保持 (過去式)",
    "example_en": "I kept my room clean all week.",
    "example_cht": "我整個星期都把房間保持乾淨。"
  },
  {
    "id": 1185,
    "section_id": 58,
    "part_of_speech_id": 2,
    "word": "knew",
    "meaning_cht": "知道 (過去式)",
    "example_en": "I knew the answer to the question.",
    "example_cht": "這題的答案我早就知道。"
  },
  {
    "id": 1186,
    "section_id": 58,
    "part_of_speech_id": 2,
    "word": "made",
    "meaning_cht": "製作 (過去式)",
    "example_en": "I made a card for my mom.",
    "example_cht": "我做了一張卡片送媽媽。"
  },
  {
    "id": 1187,
    "section_id": 58,
    "part_of_speech_id": 2,
    "word": "ran",
    "meaning_cht": "跑 (過去式)",
    "example_en": "I ran to catch the bouncing ball.",
    "example_cht": "我跑去追那顆跳跳的球。"
  },
  {
    "id": 1188,
    "section_id": 58,
    "part_of_speech_id": 2,
    "word": "said",
    "meaning_cht": "說 (過去式)",
    "example_en": "She said hello to me this morning.",
    "example_cht": "她今天早上跟我說早安。"
  },
  {
    "id": 1189,
    "section_id": 58,
    "part_of_speech_id": 2,
    "word": "sang",
    "meaning_cht": "唱 (過去式)",
    "example_en": "We sang songs together at school today.",
    "example_cht": "我們今天在學校一起唱歌。"
  },
  {
    "id": 1190,
    "section_id": 58,
    "part_of_speech_id": 2,
    "word": "sat",
    "meaning_cht": "坐 (過去式)",
    "example_en": "I sat on the bench to rest.",
    "example_cht": "我坐在長椅上休息。"
  },
  {
    "id": 1191,
    "section_id": 58,
    "part_of_speech_id": 2,
    "word": "saw",
    "meaning_cht": "看見 (過去式)",
    "example_en": "I saw a rainbow after the rain.",
    "example_cht": "下雨後我看見一條彩虹。"
  },
  {
    "id": 1192,
    "section_id": 58,
    "part_of_speech_id": 2,
    "word": "told",
    "meaning_cht": "告訴 (過去式)",
    "example_en": "Mom told me a story at bedtime.",
    "example_cht": "睡前媽媽跟我說故事。"
  },
  {
    "id": 1193,
    "section_id": 58,
    "part_of_speech_id": 2,
    "word": "took",
    "meaning_cht": "拿 (過去式)",
    "example_en": "I took my book to school today.",
    "example_cht": "我今天把書帶去學校。"
  },
  {
    "id": 1194,
    "section_id": 58,
    "part_of_speech_id": 2,
    "word": "went",
    "meaning_cht": "去 (過去式)",
    "example_en": "We went to the zoo last week.",
    "example_cht": "我們上週去了動物園。"
  },
  {
    "id": 1195,
    "section_id": 58,
    "part_of_speech_id": 2,
    "word": "woke",
    "meaning_cht": "醒來 (過去式)",
    "example_en": "I woke up when the sun rose.",
    "example_cht": "太陽升起時我就醒來了。"
  },
  {
    "id": 1196,
    "section_id": 59,
    "part_of_speech_id": 8,
    "word": "about",
    "meaning_cht": "關於",
    "example_en": "Tell me everything about the world we see.",
    "example_cht": "告訴我我們看到的這個世界的一切吧。"
  },
  {
    "id": 1197,
    "section_id": 59,
    "part_of_speech_id": 2,
    "word": "agree",
    "meaning_cht": "同意",
    "example_en": "I agree that ice cream is the best.",
    "example_cht": "我同意，冰淇淋最棒了。"
  },
  {
    "id": 1198,
    "section_id": 59,
    "part_of_speech_id": 1,
    "word": "bench",
    "meaning_cht": "長凳",
    "example_en": "We sit on the park bench and eat snacks.",
    "example_cht": "我們坐在公園長椅上吃點心。"
  },
  {
    "id": 1199,
    "section_id": 59,
    "part_of_speech_id": 2,
    "word": "blow",
    "meaning_cht": "吹",
    "example_en": "I blow bubbles that float up to the clouds.",
    "example_cht": "我吹泡泡，泡泡飄到雲朵旁邊。"
  },
  {
    "id": 1200,
    "section_id": 59,
    "part_of_speech_id": 1,
    "word": "bubble",
    "meaning_cht": "泡泡",
    "example_en": "I chase bubbles that shimmer in the light.",
    "example_cht": "我追著在陽光下閃閃發亮的泡泡。"
  },
  {
    "id": 1201,
    "section_id": 59,
    "part_of_speech_id": 2,
    "word": "bump",
    "meaning_cht": "撞到",
    "example_en": "I bump my head on the low door.",
    "example_cht": "我把頭撞到低低的門上了。"
  },
  {
    "id": 1202,
    "section_id": 59,
    "part_of_speech_id": 8,
    "word": "by",
    "meaning_cht": "在...旁邊/被",
    "example_en": "I sit by my friend at lunch.",
    "example_cht": "吃午餐時我坐在朋友旁邊。"
  },
  {
    "id": 1203,
    "section_id": 59,
    "part_of_speech_id": 6,
    "word": "come back",
    "meaning_cht": "回來",
    "example_en": "Balls always come back just like true friends do.",
    "example_cht": "球會彈回來，就像真朋友一定會回來一樣。"
  },
  {
    "id": 1204,
    "section_id": 59,
    "part_of_speech_id": 1,
    "word": "conversation",
    "meaning_cht": "對話",
    "example_en": "The carrots and peas have a funny conversation on my plate!",
    "example_cht": "紅蘿蔔和豌豆在我的盤子上進行有趣的對話!"
  },
  {
    "id": 1205,
    "section_id": 59,
    "part_of_speech_id": 2,
    "word": "crash",
    "meaning_cht": "碰撞",
    "example_en": "The toy cars crash into each other loud.",
    "example_cht": "玩具車砰的一聲撞在一起。"
  },
  {
    "id": 1206,
    "section_id": 59,
    "part_of_speech_id": 1,
    "word": "danger",
    "meaning_cht": "危險",
    "example_en": "We stay away from danger to be safe.",
    "example_cht": "為了安全，我們要遠離危險。"
  },
  {
    "id": 1207,
    "section_id": 59,
    "part_of_speech_id": 2,
    "word": "disagree",
    "meaning_cht": "不同意",
    "example_en": "It's okay to disagree and have different ideas.",
    "example_cht": "意見不同沒關係，每個人都可以有自己的想法。"
  },
  {
    "id": 1208,
    "section_id": 59,
    "part_of_speech_id": 7,
    "word": "ever",
    "meaning_cht": "曾經",
    "example_en": "Have you ever wished upon a star?",
    "example_cht": "你有沒有向星星許過願呢？"
  },
  {
    "id": 1209,
    "section_id": 59,
    "part_of_speech_id": 5,
    "word": "final",
    "meaning_cht": "最後的",
    "example_en": "The final page has a happy ending here.",
    "example_cht": "最後一頁有個快樂的結局。"
  },
  {
    "id": 1210,
    "section_id": 59,
    "part_of_speech_id": 5,
    "word": "following",
    "meaning_cht": "接下來的",
    "example_en": "The following day we went to the park.",
    "example_cht": "隔天我們去了公園。"
  },
  {
    "id": 1211,
    "section_id": 59,
    "part_of_speech_id": 8,
    "word": "for",
    "meaning_cht": "為了/給",
    "example_en": "This card is for you my friend.",
    "example_cht": "這張卡片是送給你的，朋友。"
  },
  {
    "id": 1212,
    "section_id": 59,
    "part_of_speech_id": 6,
    "word": "get up",
    "meaning_cht": "起床",
    "example_en": "Get up! A brand new fun is waiting now!",
    "example_cht": "起床囉！全新的好玩冒險在等你！"
  },
  {
    "id": 1213,
    "section_id": 59,
    "part_of_speech_id": 6,
    "word": "go away",
    "meaning_cht": "走開",
    "example_en": "Worries go away when you blow them like seeds.",
    "example_cht": "把煩惱像蒲公英一樣吹走吧，煩惱就會飛走。"
  },
  {
    "id": 1214,
    "section_id": 59,
    "part_of_speech_id": 6,
    "word": "go to bed",
    "meaning_cht": "睡覺",
    "example_en": "Going to bed means visiting dreamland on your pillow.",
    "example_cht": "上床睡覺就像到枕頭上的夢想王國旅行。"
  },
  {
    "id": 1215,
    "section_id": 59,
    "part_of_speech_id": 2,
    "word": "goes",
    "meaning_cht": "去 (第三人稱)",
    "example_en": "The dog goes to the park daily.",
    "example_cht": "那隻狗每天都去公園。"
  },
  {
    "id": 1216,
    "section_id": 59,
    "part_of_speech_id": 2,
    "word": "going",
    "meaning_cht": "正在去/將要",
    "example_en": "The snail is going on a big adventure today!",
    "example_cht": "小蝸牛今天要去展開大冒險了!"
  },
  {
    "id": 1217,
    "section_id": 59,
    "part_of_speech_id": 1,
    "word": "invention",
    "meaning_cht": "發明",
    "example_en": "The wheel was an important useful invention long ago.",
    "example_cht": "很久以前，輪子是很重要又好用的發明。"
  },
  {
    "id": 1218,
    "section_id": 59,
    "part_of_speech_id": 1,
    "word": "language",
    "meaning_cht": "語言",
    "example_en": "English is a fun language to learn well.",
    "example_cht": "英文是一種有趣又好玩的語言。"
  },
  {
    "id": 1219,
    "section_id": 59,
    "part_of_speech_id": 1,
    "word": "leader",
    "meaning_cht": "領導者",
    "example_en": "A good leader helps everyone work together well.",
    "example_cht": "好的領導者會讓大家一起合作得更好。"
  },
  {
    "id": 1220,
    "section_id": 59,
    "part_of_speech_id": 1,
    "word": "meadow",
    "meaning_cht": "草地",
    "example_en": "Wildflowers bloom in the sunny peaceful meadow here.",
    "example_cht": "陽光下的草地上，野花安安靜靜地開了。"
  },
  {
    "id": 1221,
    "section_id": 59,
    "part_of_speech_id": 1,
    "word": "mile",
    "meaning_cht": "英里",
    "example_en": "We walk one mile to the store.",
    "example_cht": "我們走一英里到商店。"
  },
  {
    "id": 1222,
    "section_id": 59,
    "part_of_speech_id": 8,
    "word": "of",
    "meaning_cht": "屬於/關於",
    "example_en": "This is a magic picture of my family waving hello!",
    "example_cht": "這是一張我家人在揮手說哈囉的魔法照片!"
  },
  {
    "id": 1223,
    "section_id": 59,
    "part_of_speech_id": 9,
    "word": "oh",
    "meaning_cht": "哦",
    "example_en": "Oh! I forgot to bring my book.",
    "example_cht": "喔！我忘了帶書。"
  },
  {
    "id": 1224,
    "section_id": 59,
    "part_of_speech_id": 1,
    "word": "opinion",
    "meaning_cht": "意見",
    "example_en": "Everyone's opinion matters and should be heard here.",
    "example_cht": "每個人的意見都很重要，都值得被聽見。"
  },
  {
    "id": 1225,
    "section_id": 59,
    "part_of_speech_id": 1,
    "word": "paintbrush",
    "meaning_cht": "畫筆",
    "example_en": "My paintbrush makes colorful strokes on the paper.",
    "example_cht": "我的畫筆在紙上畫出彩色的筆畫。"
  },
  {
    "id": 1226,
    "section_id": 59,
    "part_of_speech_id": 1,
    "word": "plan",
    "meaning_cht": "計畫",
    "example_en": "Our plan is to go to the park.",
    "example_cht": "我們的計畫是去公園玩。"
  },
  {
    "id": 1227,
    "section_id": 59,
    "part_of_speech_id": 1,
    "word": "playtime",
    "meaning_cht": "玩樂時間",
    "example_en": "Playtime is when the clock stops and imagination takes over!",
    "example_cht": "玩耍時間就像時鐘停止，想像力接手的時刻！"
  },
  {
    "id": 1228,
    "section_id": 59,
    "part_of_speech_id": 5,
    "word": "poor",
    "meaning_cht": "可憐的/貧窮的",
    "example_en": "The poor puppy needs a warm home.",
    "example_cht": "這隻可憐的小狗需要一個溫暖的家。"
  },
  {
    "id": 1229,
    "section_id": 59,
    "part_of_speech_id": 1,
    "word": "prairie",
    "meaning_cht": "草原",
    "example_en": "Buffalo once roamed the wide open prairie lands.",
    "example_cht": "很久以前，野牛在寬廣的大草原上漫步。"
  },
  {
    "id": 1230,
    "section_id": 59,
    "part_of_speech_id": 2,
    "word": "press",
    "meaning_cht": "按",
    "example_en": "Press the red button to start the game.",
    "example_cht": "按下紅色按鈕就可以開始遊戲。"
  },
  {
    "id": 1231,
    "section_id": 59,
    "part_of_speech_id": 5,
    "word": "previous",
    "meaning_cht": "之前的",
    "example_en": "On the previous page there was a dragon.",
    "example_cht": "前一頁上有一隻龍。"
  },
  {
    "id": 1232,
    "section_id": 59,
    "part_of_speech_id": 2,
    "word": "repeat",
    "meaning_cht": "重複",
    "example_en": "Can you repeat what you just said please?",
    "example_cht": "請你再說一次剛剛那句話，好嗎？"
  },
  {
    "id": 1233,
    "section_id": 59,
    "part_of_speech_id": 2,
    "word": "resume",
    "meaning_cht": "恢復",
    "example_en": "We resume playing after we finish eating snacks.",
    "example_cht": "我們吃完點心後就繼續玩。"
  },
  {
    "id": 1234,
    "section_id": 59,
    "part_of_speech_id": 5,
    "word": "round",
    "meaning_cht": "圓的",
    "example_en": "The ball is round like the moon.",
    "example_cht": "球是圓的，就像月亮一樣。"
  },
  {
    "id": 1235,
    "section_id": 59,
    "part_of_speech_id": 1,
    "word": "row",
    "meaning_cht": "排/列",
    "example_en": "We sit in a row at the movie.",
    "example_cht": "我們看電影時排成一排坐著。"
  },
  {
    "id": 1236,
    "section_id": 59,
    "part_of_speech_id": 6,
    "word": "run away",
    "meaning_cht": "跑走",
    "example_en": "My shadow tries to run away but I'm faster!",
    "example_cht": "我的影子想要逃跑，但我跑得更快！"
  },
  {
    "id": 1237,
    "section_id": 59,
    "part_of_speech_id": 1,
    "word": "sense",
    "meaning_cht": "感覺/意識",
    "example_en": "My sixth sense tells me something good soon.",
    "example_cht": "我的第六感說，好事快要發生了。"
  },
  {
    "id": 1238,
    "section_id": 59,
    "part_of_speech_id": 1,
    "word": "soap",
    "meaning_cht": "肥皂",
    "example_en": "The soap smells like fresh strawberries today.",
    "example_cht": "今天的肥皂聞起來像新鮮草莓。"
  },
  {
    "id": 1239,
    "section_id": 59,
    "part_of_speech_id": 5,
    "word": "strong",
    "meaning_cht": "強壯的",
    "example_en": "The strong man can lift heavy things.",
    "example_cht": "強壯的人可以舉起很重的東西。"
  },
  {
    "id": 1240,
    "section_id": 59,
    "part_of_speech_id": 2,
    "word": "thank",
    "meaning_cht": "感謝",
    "example_en": "I thank you for being my friend.",
    "example_cht": "謝謝你當我的朋友。"
  },
  {
    "id": 1241,
    "section_id": 59,
    "part_of_speech_id": 5,
    "word": "total",
    "meaning_cht": "總共的",
    "example_en": "The total number of wishes is many.",
    "example_cht": "願望的總數好多好多。"
  },
  {
    "id": 1242,
    "section_id": 59,
    "part_of_speech_id": 1,
    "word": "towel",
    "meaning_cht": "毛巾",
    "example_en": "I dry off with my soft blue towel.",
    "example_cht": "我用柔軟的藍毛巾擦乾身體。"
  },
  {
    "id": 1243,
    "section_id": 59,
    "part_of_speech_id": 6,
    "word": "try to",
    "meaning_cht": "嘗試去",
    "example_en": "When you try to do something difficult, you get stronger!",
    "example_cht": "當你努力嘗試做困難的事，你就會變得更強！"
  },
  {
    "id": 1244,
    "section_id": 59,
    "part_of_speech_id": 6,
    "word": "turn off",
    "meaning_cht": "關閉 (電器)",
    "example_en": "I turn off the light at bedtime.",
    "example_cht": "要睡覺時我會把燈關掉。"
  },
  {
    "id": 1245,
    "section_id": 59,
    "part_of_speech_id": 6,
    "word": "turn on",
    "meaning_cht": "打開 (電器)",
    "example_en": "Turn on the lamp when it's dark.",
    "example_cht": "天黑的時候把燈打開。"
  },
  {
    "id": 1246,
    "section_id": 59,
    "part_of_speech_id": 8,
    "word": "upon",
    "meaning_cht": "在...之上",
    "example_en": "The book sits upon the table top.",
    "example_cht": "那本書放在桌子上。"
  },
  {
    "id": 1247,
    "section_id": 59,
    "part_of_speech_id": 1,
    "word": "wife",
    "meaning_cht": "妻子",
    "example_en": "The man and his wife go shopping.",
    "example_cht": "那位先生和他的太太去逛街。"
  },
  {
    "id": 1248,
    "section_id": 59,
    "part_of_speech_id": 8,
    "word": "with",
    "meaning_cht": "和...一起",
    "example_en": "I play with my little sister today.",
    "example_cht": "今天我和妹妹一起玩。"
  },
  {
    "id": 1249,
    "section_id": 59,
    "part_of_speech_id": 8,
    "word": "without",
    "meaning_cht": "沒有",
    "example_en": "Without socks my feet feel cold outside.",
    "example_cht": "沒穿襪子時，我的腳在外面會覺得冷冷的。"
  },
  {
    "id": 1250,
    "section_id": 59,
    "part_of_speech_id": 13,
    "word": "won't",
    "meaning_cht": "將不會",
    "example_en": "I will not give up trying my best.",
    "example_cht": "我不會放棄，我會一直努力。"
  },
  {
    "id": 1251,
    "section_id": 60,
    "part_of_speech_id": 5,
    "word": "cute",
    "meaning_cht": "可愛的",
    "example_en": "The cute puppy winks like a tiny star.",
    "example_cht": "可愛的小狗眨眼，像一顆小星星。"
  },
  {
    "id": 1252,
    "section_id": 60,
    "part_of_speech_id": 5,
    "word": "nice",
    "meaning_cht": "親切的/好的",
    "example_en": "A nice word is like warm sunshine.",
    "example_cht": "一句貼心的話像溫暖的陽光。"
  },
  {
    "id": 1253,
    "section_id": 60,
    "part_of_speech_id": 5,
    "word": "afraid",
    "meaning_cht": "害怕的",
    "example_en": "I feel afraid in the dark but I hold your hand.",
    "example_cht": "黑暗裡我會害怕，但我會牽著你的手。"
  },
  {
    "id": 1254,
    "section_id": 60,
    "part_of_speech_id": 5,
    "word": "careful",
    "meaning_cht": "小心的",
    "example_en": "Be careful on the steps like a slow turtle.",
    "example_cht": "走樓梯要小心，像慢慢的小烏龜。"
  },
  {
    "id": 1255,
    "section_id": 60,
    "part_of_speech_id": 9,
    "word": "okay",
    "meaning_cht": "好的",
    "example_en": "Okay, let's clean up and then play again.",
    "example_cht": "好的，我們先收一收，再繼續玩。"
  },
  {
    "id": 1256,
    "section_id": 60,
    "part_of_speech_id": 1,
    "word": "puppy",
    "meaning_cht": "小狗",
    "example_en": "The puppy chases his tail like a silly wheel.",
    "example_cht": "小狗追著自己的尾巴轉圈圈，像傻乎乎的小輪子。"
  },
  {
    "id": 1257,
    "section_id": 60,
    "part_of_speech_id": 1,
    "word": "kitten",
    "meaning_cht": "小貓",
    "example_en": "The kitten bats the yarn like a tiny tiger.",
    "example_cht": "小貓拍著毛線球，像小老虎一樣。"
  },
  {
    "id": 1258,
    "section_id": 60,
    "part_of_speech_id": 1,
    "word": "toothbrush",
    "meaning_cht": "牙刷",
    "example_en": "My blue toothbrush tickles my teeth awake.",
    "example_cht": "我的藍牙刷把牙齒搔得醒醒的。"
  },
  {
    "id": 1259,
    "section_id": 60,
    "part_of_speech_id": 1,
    "word": "toothpaste",
    "meaning_cht": "牙膏",
    "example_en": "A pea of toothpaste makes my smile shine.",
    "example_cht": "擠一小顆豌豆的牙膏，笑容就亮晶晶。"
  },
  {
    "id": 1260,
    "section_id": 60,
    "part_of_speech_id": 1,
    "word": "block",
    "meaning_cht": "積木",
    "example_en": "One block on another makes a tall tower.",
    "example_cht": "一塊積木堆在另一塊上，就變高塔。"
  },
  {
    "id": 1261,
    "section_id": 60,
    "part_of_speech_id": 1,
    "word": "bedtime",
    "meaning_cht": "睡覺時間",
    "example_en": "At bedtime the moon reads me a story.",
    "example_cht": "到睡覺時間時，月亮讀故事給我聽。"
  },
  {
    "id": 1262,
    "section_id": 60,
    "part_of_speech_id": 1,
    "word": "teddy bear",
    "meaning_cht": "泰迪熊",
    "example_en": "My teddy bear guards my dreams at night.",
    "example_cht": "我的泰迪熊晚上守護我的夢。"
  },
  {
    "id": 1263,
    "section_id": 60,
    "part_of_speech_id": 1,
    "word": "boots",
    "meaning_cht": "靴子",
    "example_en": "My boots splash big puddles like jumping frogs.",
    "example_cht": "我的靴子把大水坑踩得像青蛙在跳。"
  },
  {
    "id": 1264,
    "section_id": 60,
    "part_of_speech_id": 2,
    "word": "chase",
    "meaning_cht": "追逐",
    "example_en": "We chase bubbles that run away laughing.",
    "example_cht": "我們追著笑嘻嘻逃跑的泡泡。"
  },
  {
    "id": 1265,
    "section_id": 60,
    "part_of_speech_id": 8,
    "word": "next to",
    "meaning_cht": "在...旁邊",
    "example_en": "I sit next to you on the bus.",
    "example_cht": "我在公車上坐在你旁邊。"
  },
  {
    "id": 1266,
    "section_id": 60,
    "part_of_speech_id": 12,
    "word": "eleven",
    "meaning_cht": "十一",
    "example_en": "Eleven stars twinkle above our house.",
    "example_cht": "我們家上方有十一顆星星在閃。"
  },
  {
    "id": 1267,
    "section_id": 60,
    "part_of_speech_id": 4,
    "word": "another",
    "meaning_cht": "另一個",
    "example_en": "I choose another book for story time.",
    "example_cht": "故事時間我再選一本書。"
  }
].sort((a, b) => {
  if (a.section_id !== b.section_id) return a.section_id - b.section_id;
  return a.id - b.id;
});
const sections = [{ "id": 1, "name": "自我認識", "number": 1 }, { "id": 2, "name": "家庭", "number": 2 }, { "id": 3, "name": "身體部位", "number": 3 }, { "id": 4, "name": "數字與顏色", "number": 4 }, { "id": 5, "name": "形狀與大小", "number": 5 }, { "id": 6, "name": "動物與昆蟲", "number": 6 }, { "id": 7, "name": "食物與飲料", "number": 7 }, { "id": 8, "name": "餐具與廚房", "number": 8 }, { "id": 9, "name": "衣物", "number": 9 }, { "id": 10, "name": "家與房間", "number": 10 }, { "id": 11, "name": "家具與物品", "number": 11 }, { "id": 12, "name": "玩具與遊戲", "number": 12 }, { "id": 13, "name": "學校與學習", "number": 13 }, { "id": 14, "name": "地點", "number": 14 }, { "id": 15, "name": "自然與天氣", "number": 15 }, { "id": 16, "name": "地形與自然環境", "number": 16 }, { "id": 17, "name": "材質", "number": 17 }, { "id": 18, "name": "基本動作", "number": 18 }, { "id": 19, "name": "手部動作", "number": 19 }, { "id": 20, "name": "感官動作", "number": 20 }, { "id": 21, "name": "口語動作", "number": 21 }, { "id": 22, "name": "思考與想像", "number": 22 }, { "id": 23, "name": "創造與建造", "number": 23 }, { "id": 24, "name": "日常活動", "number": 24 }, { "id": 25, "name": "互動行為", "number": 25 }, { "id": 26, "name": "改變狀態", "number": 26 }, { "id": 27, "name": "尋找與發現", "number": 27 }, { "id": 28, "name": "情緒與感受", "number": 28 }, { "id": 29, "name": "性質形容詞", "number": 29 }, { "id": 30, "name": "溫度與觸感", "number": 30 }, { "id": 31, "name": "速度與狀態", "number": 31 }, { "id": 32, "name": "程度與數量", "number": 32 }, { "id": 33, "name": "時間", "number": 33 }, { "id": 34, "name": "位置與方向", "number": 34 }, { "id": 35, "name": "連接詞與邏輯", "number": 35 }, { "id": 36, "name": "疑問詞", "number": 36 }, { "id": 37, "name": "代名詞", "number": 37 }, { "id": 38, "name": "冠詞與限定詞", "number": 38 }, { "id": 39, "name": "Be動詞與助動詞", "number": 39 }, { "id": 40, "name": "禮貌用語", "number": 40 }, { "id": 41, "name": "交通工具", "number": 41 }, { "id": 42, "name": "職業", "number": 42 }, { "id": 43, "name": "運動與比賽", "number": 43 }, { "id": 44, "name": "健康", "number": 44 }, { "id": 45, "name": "品德與行為", "number": 45 }, { "id": 46, "name": "購物與金錢", "number": 46 }, { "id": 47, "name": "選擇與決定", "number": 47 }, { "id": 48, "name": "機會與運氣", "number": 48 }, { "id": 49, "name": "數學", "number": 49 }, { "id": 50, "name": "科技", "number": 50 }, { "id": 51, "name": "故事與想像", "number": 51 }, { "id": 52, "name": "聲音", "number": 52 }, { "id": 53, "name": "光線與視覺", "number": 53 }, { "id": 54, "name": "其他常用動詞", "number": 54 }, { "id": 55, "name": "其他常用詞", "number": 55 }, { "id": 56, "name": "其他形容詞", "number": 56 }, { "id": 57, "name": "其他副詞", "number": 57 }, { "id": 58, "name": "動詞變化形", "number": 58 }, { "id": 59, "name": "其他", "number": 59 }, { "id": 60, "name": "核心常用字", "number": 60 }];
const partsOfSpeech = [{ "id": 1, "tag": "Noun" }, { "id": 2, "tag": "Verb" }, { "id": 3, "tag": "Pronoun" }, { "id": 4, "tag": "Determiner" }, { "id": 5, "tag": "Adjective" }, { "id": 6, "tag": "Verb Phrase" }, { "id": 7, "tag": "Adverb" }, { "id": 8, "tag": "Preposition" }, { "id": 9, "tag": "Interjection" }, { "id": 10, "tag": "Conjunction" }, { "id": 11, "tag": "Modal Verb" }, { "id": 12, "tag": "Number" }, { "id": 13, "tag": "Contraction" }];
function useWordData() {
  const loading = false;
  const error = null;
  const sectionMap = reactExports.useMemo(() => Object.fromEntries(sections.map((s) => [s.id, s])), [sections]);
  const posMap = reactExports.useMemo(() => Object.fromEntries(partsOfSpeech.map((p2) => [p2.id, p2])), [partsOfSpeech]);
  const bySections = (sectionIds) => {
    if (!Array.isArray(sectionIds) || sectionIds.length === 0) return words;
    const set = new Set(sectionIds);
    return words.filter((w2) => set.has(w2.section_id));
  };
  return { words, sections, parts: partsOfSpeech, sectionMap, posMap, bySections, loading, error };
}
let playingCallback = null;
function onPlayingChange(callback) {
  playingCallback = callback;
}
function speak(text, { lang = "en-US", rate = 0.95, pitch = 1 } = {}) {
  return new Promise((resolve, reject) => {
    if (!("speechSynthesis" in window)) {
      console.warn("Speech Synthesis not supported in this browser");
      resolve(false);
      return;
    }
    try {
      console.log("Speaking via SpeechSynthesis:", text);
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = lang;
      utter.rate = rate;
      utter.pitch = pitch;
      utter.onstart = () => {
        if (playingCallback) playingCallback(true);
      };
      utter.onend = () => {
        if (playingCallback) playingCallback(false);
        resolve(true);
      };
      utter.onerror = (ev) => {
        if (playingCallback) playingCallback(false);
        reject(ev || new Error("SpeechSynthesis error"));
      };
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => speak(text);
        return;
      }
    } catch (err) {
      if (playingCallback) playingCallback(false);
      reject(err);
    }
  });
}
const audioCache = /* @__PURE__ */ new Map();
const MAX_CACHE_SIZE = 10;
function googleTTS(text, { lang = "en", rate = 0.8 } = {}) {
  if (!text || String(text).trim() === "") {
    return Promise.resolve();
  }
  const cacheKey = `${text}_${lang}_${rate}`;
  const fallbackRate = typeof rate === "number" ? rate : 0.95;
  function playSrc(src, { onStart } = {}) {
    return new Promise((resolve, reject) => {
      try {
        const a = new Audio(src);
        a.preload = "auto";
        a.crossOrigin = "anonymous";
        a.onended = () => {
          if (playingCallback) playingCallback(false);
          resolve();
        };
        a.onerror = (err) => {
          if (playingCallback) playingCallback(false);
          reject(err || new Error("Audio error"));
        };
        a.play().then(() => {
          if (playingCallback) playingCallback(true);
          if (typeof onStart === "function") onStart();
        }).catch((err) => reject(err));
      } catch (err) {
        reject(err);
      }
    });
  }
  if (audioCache.has(cacheKey)) {
    console.log("Using cached TTS audio for:", text);
    const cachedSrc = audioCache.get(cacheKey);
    return playSrc(cachedSrc).catch((err) => {
      console.error("Cached TTS playback failed, falling back to SpeechSynthesis:", err);
      return speak(text, { rate: fallbackRate });
    });
  }
  console.log("Fetching new TTS audio for:", text);
  const url = `https://google-tss.lentice.workers.dev/?text=${encodeURIComponent(text)}&lang=${lang}&speed=${rate}`;
  return playSrc(url, {
    onStart: () => {
      try {
        if (audioCache.size >= MAX_CACHE_SIZE) {
          const firstKey = audioCache.keys().next().value;
          audioCache.delete(firstKey);
        }
        audioCache.set(cacheKey, url);
      } catch (err) {
        console.warn("Failed to set audio cache:", err);
      }
    }
  }).catch((err) => {
    console.error("Google TTS playback failed, falling back to SpeechSynthesis:", err);
    return speak(text, { rate: fallbackRate });
  });
}
const KEY = "kids-english-progress-v1";
function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}
function write(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch (error) {
    console.warn("Failed to save progress to localStorage:", error);
  }
}
function getProgress() {
  const d = read();
  return {
    learnedIds: new Set(d.learnedIds || []),
    lastIndex: Number.isInteger(d.lastIndex) ? d.lastIndex : 0
  };
}
function saveProgress({ learnedIds, lastIndex }) {
  const data = read();
  if (learnedIds) data.learnedIds = Array.from(learnedIds);
  if (Number.isInteger(lastIndex)) data.lastIndex = lastIndex;
  write(data);
}
function Flashcard({ item, learned, onPrev, onNext, onToggleLearned, onExampleClick }) {
  if (!item) return null;
  const { wordSpeed, exampleSpeed } = getProgress();
  const [isPlayingExample, setIsPlayingExample] = reactExports.useState(false);
  const speakExample = () => {
    if (isPlayingExample) return;
    setIsPlayingExample(true);
    googleTTS(item.example_en, { rate: exampleSpeed }).then(() => {
      setIsPlayingExample(false);
      if (onExampleClick) onExampleClick();
    }).catch(() => {
      setIsPlayingExample(false);
    });
  };
  const getWordFontSize = () => {
    const len = item.word.length;
    if (len <= 8) return "44px";
    if (len <= 12) return "36px";
    if (len <= 16) return "30px";
    return "24px";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-wrapper", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: `learn-toggle floating ${learned ? "on" : ""}`,
        "aria-pressed": learned,
        "aria-label": learned ? "取消已學" : "標記已學",
        title: learned ? "取消已學" : "標記已學",
        onClick: onToggleLearned,
        children: learned ? "★" : "☆"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "word word-center", style: { fontSize: getWordFontSize(), lineHeight: "44px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            try {
              const p2 = speak(item.word, { rate: wordSpeed });
              if (p2 && typeof p2.catch === "function") p2.catch(() => {
              });
            } catch (err) {
              console.error("speak click handler error:", err);
            }
          },
          title: "點擊聽發音",
          style: {
            background: "transparent",
            border: "none",
            padding: 0,
            margin: 0,
            cursor: "pointer",
            font: "inherit",
            color: "inherit"
          },
          children: item.word
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "meaning", children: item.meaning_cht }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "examples", onClick: speakExample, title: "點擊聽例句", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "en", children: item.example_en }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "zh", children: item.example_cht })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "controls", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn secondary", onClick: onPrev, style: { fontSize: "16px" }, children: "< 上一個" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: onNext, style: { fontSize: "16px" }, children: "下一個 >" })
      ] })
    ] })
  ] });
}
function SectionPicker({ sections: sections2, selectedId, selectedIds, onChange }) {
  const isMulti = selectedIds !== void 0;
  const select = (id2) => {
    if (isMulti) {
      const newSelected = selectedIds.includes(id2) ? selectedIds.filter((x2) => x2 !== id2) : [...selectedIds, id2];
      onChange(newSelected);
    } else {
      onChange(id2);
    }
  };
  const [open, setOpen] = reactExports.useState(false);
  const summary = reactExports.useMemo(() => {
    if (isMulti) {
      if (selectedIds.length === 0) return "請選擇（可多選）";
      if (selectedIds.length === sections2.length) return "全部主題";
      const names = selectedIds.map((id2) => {
        const s = sections2.find((x2) => x2.id === id2);
        return s ? s.number : "";
      }).filter(Boolean);
      return `已選 ${names.length} 個：${names.join(", ")}`;
    } else {
      const currentSection = sections2.find((s) => s.id === selectedId);
      return currentSection ? `${currentSection.number}. ${currentSection.name}` : "請選擇";
    }
  }, [sections2, selectedId, selectedIds, isMulti]);
  const toggleAll = () => {
    if (selectedIds.length === sections2.length) {
      onChange([]);
    } else {
      onChange(sections2.map((s) => s.id));
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { justifyContent: "space-between", alignItems: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { gap: 8, alignItems: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "學習主題 Section" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "muted", children: summary })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { gap: 8 }, children: [
        isMulti && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn secondary", onClick: toggleAll, children: selectedIds.length === sections2.length ? "取消全選" : "全選" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: () => setOpen((o) => !o), children: open ? "收合" : "切換…" })
      ] })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-list", style: { marginTop: 8 }, children: sections2.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "section-item", children: [
      isMulti ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "checkbox",
          checked: selectedIds.includes(s.id),
          onChange: () => select(s.id)
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "radio",
          name: "section",
          checked: selectedId === s.id,
          onChange: () => select(s.id)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        s.number,
        ". ",
        s.name
      ] })
    ] }, s.id)) })
  ] });
}
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
const identity = (arg) => arg;
function useStore(api, selector = identity) {
  const slice = React.useSyncExternalStore(
    api.subscribe,
    React.useCallback(() => selector(api.getState()), [api, selector]),
    React.useCallback(() => selector(api.getInitialState()), [api, selector])
  );
  React.useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  const api = createStore(createState);
  const useBoundStore = (selector) => useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = (createState) => createState ? createImpl(createState) : createImpl;
const useLearnStore = create((set, get) => ({
  // State
  learnedIds: /* @__PURE__ */ new Set(),
  sectionProgress: {},
  // { sectionId: { learned: number, total: number, percentage: number } }
  exampleClickedId: null,
  isEditingProgress: false,
  progressInput: "",
  showSectionMenu: false,
  index: 0,
  // Actions
  setLearnedIds: (learnedIds) => set({ learnedIds }),
  setSectionProgress: (sectionProgress) => set({ sectionProgress }),
  setExampleClickedId: (exampleClickedId) => set({ exampleClickedId }),
  setProgressInput: (progressInput) => set({ progressInput }),
  setShowSectionMenu: (showSectionMenu) => set({ showSectionMenu }),
  setIndex: (index) => set({ index }),
  // Calculate section progress
  calculateSectionProgress: (sections2, bySections, learnedIds) => {
    const sectionProgress = {};
    sections2.forEach((section) => {
      const sectionWords = bySections([section.id]);
      const learnedCount = sectionWords.filter((w2) => learnedIds.has(w2.id)).length;
      const total = sectionWords.length;
      const percentage = total > 0 ? Math.round(learnedCount / total * 100) : 0;
      sectionProgress[section.id] = { learned: learnedCount, total, percentage };
    });
    set({ sectionProgress });
  },
  // Calculate progress for a single section and update only that entry
  calculateSingleSectionProgress: (sectionId, bySections, learnedIds) => {
    if (!sectionId || !bySections) return;
    const sectionWords = bySections([sectionId]);
    const learnedCount = sectionWords.filter((w2) => learnedIds.has(w2.id)).length;
    const total = sectionWords.length;
    const percentage = total > 0 ? Math.round(learnedCount / total * 100) : 0;
    set((state) => {
      const sp = { ...state.sectionProgress || {} };
      sp[sectionId] = { learned: learnedCount, total, percentage };
      return { sectionProgress: sp };
    });
  },
  initializeFromProgress: (words2, sections2, bySections) => {
    const saved = getProgress();
    const learnedIds = saved.learnedIds || /* @__PURE__ */ new Set();
    let initialIndex = 0;
    if (saved.lastWordId && words2.length > 0) {
      const idx = words2.findIndex((w2) => w2.id === saved.lastWordId);
      initialIndex = idx >= 0 ? idx : 0;
    }
    const sectionProgress = {};
    if (bySections) {
      sections2.forEach((section) => {
        const sectionWords = bySections([section.id]);
        const learnedCount = sectionWords.filter((w2) => learnedIds.has(w2.id)).length;
        const total = sectionWords.length;
        const percentage = total > 0 ? Math.round(learnedCount / total * 100) : 0;
        sectionProgress[section.id] = { learned: learnedCount, total, percentage };
      });
    }
    set({ learnedIds, sectionProgress, index: initialIndex });
  },
  handleSectionChange: (sectionId, words2, getProgress2) => {
    var _a;
    let newIndex = 0;
    if (Array.isArray(words2) && words2.length > 0) {
      const idx = words2.findIndex((w2) => w2.section_id === sectionId);
      newIndex = idx >= 0 ? idx : 0;
    }
    const firstWordId = words2 && ((_a = words2[newIndex]) == null ? void 0 : _a.id) ? words2[newIndex].id : null;
    if (firstWordId) saveProgress({});
    set({ index: newIndex });
  },
  onPrev: (words2, current, bySections) => {
    if (!Array.isArray(words2) || words2.length === 0) return;
    const ni2 = (get().index - 1 + words2.length) % words2.length;
    const newWord = words2[ni2];
    set({ index: ni2 });
    if (newWord == null ? void 0 : newWord.id) saveProgress({ lastWordId: newWord.id });
    const affectedSection = current == null ? void 0 : current.section_id;
    if (affectedSection && bySections) {
      const { learnedIds } = get();
      get().calculateSingleSectionProgress(affectedSection, bySections, learnedIds);
    }
  },
  onNext: (words2, current, bySections) => {
    if (!Array.isArray(words2) || words2.length === 0) return;
    const ni2 = (get().index + 1) % words2.length;
    const newWord = words2[ni2];
    set({ index: ni2 });
    if (newWord == null ? void 0 : newWord.id) saveProgress({ lastWordId: newWord.id });
    const affectedSection = current == null ? void 0 : current.section_id;
    if (affectedSection && bySections) {
      const { learnedIds } = get();
      get().calculateSingleSectionProgress(affectedSection, bySections, learnedIds);
    }
  },
  toggleLearned: (current, sections2, bySections) => {
    if (!current) return;
    const id2 = current.id;
    set((state) => {
      const next = new Set(state.learnedIds);
      if (next.has(id2)) next.delete(id2);
      else next.add(id2);
      saveProgress({ learnedIds: next });
      return { learnedIds: next };
    });
    if (sections2 && bySections) {
      const { learnedIds } = get();
      if (current && current.section_id) {
        get().calculateSingleSectionProgress(current.section_id, bySections, learnedIds);
      }
    }
  },
  handleProgressClick: () => {
    set({ isEditingProgress: true, progressInput: "" });
  },
  handleProgressSubmit: (words2) => {
    var _a;
    const { progressInput } = get();
    const num = parseInt(progressInput, 10);
    if (!isNaN(num) && num >= 1 && num <= words2.length) {
      const newIndex = num - 1;
      set({ index: newIndex, isEditingProgress: false });
      const wordId = (_a = words2[newIndex]) == null ? void 0 : _a.id;
      if (wordId) saveProgress({});
    } else {
      set({ isEditingProgress: false });
    }
  },
  handleProgressKeyDown: (e, words2) => {
    if (e.key === "Enter") {
      get().handleProgressSubmit(words2);
    } else if (e.key === "Escape") {
      set({ isEditingProgress: false });
    }
  },
  onExampleClick: (current, sections2, bySections) => {
    if (!current) return;
    const id2 = current.id;
    set({ exampleClickedId: id2 });
    const wasAdded = !get().learnedIds.has(id2);
    set((state) => {
      if (!state.learnedIds.has(id2)) {
        const nextSet = new Set(state.learnedIds);
        nextSet.add(id2);
        saveProgress({ learnedIds: nextSet });
        return { learnedIds: nextSet };
      }
      return state;
    });
    if (wasAdded && sections2 && bySections) {
      const { learnedIds } = get();
      if (current && current.section_id) {
        get().calculateSingleSectionProgress(current.section_id, bySections, learnedIds);
      }
    }
  }
}));
function Learn() {
  var _a, _b;
  const { words: words2, sections: sections2, sectionMap, bySections } = useWordData();
  const {
    learnedIds,
    sectionProgress,
    exampleClickedId,
    isEditingProgress,
    progressInput,
    showSectionMenu,
    index,
    setExampleClickedId,
    setProgressInput,
    setShowSectionMenu,
    setIndex,
    initializeFromProgress,
    handleSectionChange,
    onPrev,
    onNext,
    toggleLearned,
    handleProgressClick,
    handleProgressSubmit,
    handleProgressKeyDown,
    onExampleClick
  } = useLearnStore();
  reactExports.useEffect(() => {
    if (words2.length > 0 && sections2.length > 0) {
      initializeFromProgress(words2, sections2, bySections);
    }
  }, [words2.length, sections2.length]);
  reactExports.useEffect(() => {
    if (index >= words2.length) setIndex(0);
  }, [words2.length, setIndex]);
  const current = words2[index] || null;
  const pos = `${index + 1} / ${words2.length}`;
  const section_id = (current == null ? void 0 : current.section_id) ?? (((_a = sections2[0]) == null ? void 0 : _a.id) ?? null);
  const currentSection = section_id ? sectionMap[section_id] : null;
  reactExports.useEffect(() => {
    setExampleClickedId(null);
  }, [current == null ? void 0 : current.id, setExampleClickedId]);
  reactExports.useEffect(() => {
    const handleClickOutside = (e) => {
      if (showSectionMenu && !e.target.closest(".chip")) {
        setShowSectionMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showSectionMenu, setShowSectionMenu]);
  if (!words2.length) return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stack", style: { maxWidth: 900, width: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionPicker, { sections: sections2, selectedId: section_id, onChange: handleSectionChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel", children: "沒有符合的單字" })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stack", style: { gap: 16, maxWidth: 900, width: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header", style: { marginBottom: -8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "chip",
            onClick: () => setShowSectionMenu(!showSectionMenu),
            style: { cursor: "pointer", userSelect: "none" },
            title: "點擊選擇類別",
            children: currentSection ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              currentSection.number,
              ". ",
              currentSection.name,
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontWeight: "bold", color: "#4A90E2", marginLeft: "12px" }, children: [
                ((_b = sectionProgress[section_id]) == null ? void 0 : _b.percentage) || 0,
                "%"
              ] })
            ] }) : "Section"
          }
        ),
        showSectionMenu && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: "100%",
              left: 0,
              marginTop: "4px",
              background: "white",
              border: "2px solid #4A90E2",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              zIndex: 1e3,
              minWidth: "200px",
              maxHeight: "300px",
              overflowY: "auto"
            },
            children: sections2.map((s) => {
              const progress = sectionProgress[s.id] || { percentage: 0 };
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  onClick: () => {
                    handleSectionChange(s.id, words2, getProgress);
                    setShowSectionMenu(false);
                  },
                  style: {
                    padding: "12px 16px",
                    cursor: "pointer",
                    background: s.id === section_id ? "#E3F2FD" : "white",
                    fontWeight: s.id === section_id ? "bold" : "normal",
                    borderBottom: "1px solid #eee",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  },
                  onMouseEnter: (e) => e.target.style.background = "#F5F5F5",
                  onMouseLeave: (e) => e.target.style.background = s.id === section_id ? "#E3F2FD" : "white",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      s.number,
                      ". ",
                      s.name
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontWeight: "bold", color: "#4A90E2", marginLeft: "16px" }, children: [
                      progress.percentage,
                      "%"
                    ] })
                  ]
                },
                s.id
              );
            })
          }
        )
      ] }),
      isEditingProgress ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "number",
          value: progressInput,
          onChange: (e) => setProgressInput(e.target.value),
          onBlur: () => handleProgressSubmit(words2),
          onKeyDown: (e) => handleProgressKeyDown(e, words2),
          autoFocus: true,
          min: "1",
          max: words2.length,
          style: {
            width: "80px",
            padding: "4px 8px",
            fontSize: "14px",
            textAlign: "center",
            border: "2px solid #4A90E2",
            borderRadius: "8px"
          }
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "progress",
          onClick: handleProgressClick,
          style: { cursor: "pointer", userSelect: "none" },
          title: "點擊跳轉到指定單字",
          children: pos
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Flashcard,
      {
        item: current,
        learned: learnedIds.has(current.id),
        onPrev: () => onPrev(words2, current, bySections),
        onNext: () => onNext(words2, current, bySections),
        onToggleLearned: () => toggleLearned(current, sections2, bySections),
        onExampleClick: () => onExampleClick(current, sections2, bySections)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { justifyContent: "space-between" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "progress", children: [
        "已學會:",
        learnedIds.size,
        " / ",
        words2.length
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "progress", children: [
        "例句 ",
        exampleClickedId === (current == null ? void 0 : current.id) ? "✅" : "❌"
      ] })
    ] })
  ] });
}
function QuizOptions({ filterMode, setFilterMode, selected, setSelected, sections: sections2, mode, setMode, answerType, setAnswerType, pool, start }) {
  reactExports.useEffect(() => {
    if (answerType === "input" && mode !== "zh2en") {
      setMode("zh2en");
    }
  }, [answerType]);
  const isInput = answerType === "input";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel stack", style: { gap: 20, fontSize: 18 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stack", style: { gap: 12 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: "500", color: "#555" }, children: "📚 選擇題庫" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { flexWrap: "wrap", gap: 16, alignItems: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "row", style: { gap: 8, cursor: "pointer", padding: "6px 12px", background: filterMode === "sections" ? "#E3F2FD" : "transparent", borderRadius: "8px", transition: "background 0.2s" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "filter", checked: filterMode === "sections", onChange: () => setFilterMode("sections") }),
          "指定主題"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "row", style: { gap: 8, cursor: "pointer", padding: "6px 12px", background: filterMode === "learned" ? "#E3F2FD" : "transparent", borderRadius: "8px", transition: "background 0.2s" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "filter", checked: filterMode === "learned", onChange: () => setFilterMode("learned") }),
          "只出已學過"
        ] }),
        filterMode === "sections" && /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: selected[0] || "", onChange: (e) => setSelected(e.target.value ? [e.target.value] : []), style: { flex: "1", minWidth: "180px", maxWidth: "300px", marginLeft: "auto", marginRight: "auto", fontSize: 18 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "全部主題" }),
          sections2.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: s.id, children: [
            s.number,
            ". ",
            s.name
          ] }, s.id))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: "1px", background: "#f0f0f0" } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stack", style: { gap: 16, alignItems: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { gap: 16, flexWrap: "wrap", alignItems: "center", justifyContent: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "row", style: { gap: 8, alignItems: "center" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#666", fontSize: "18px" }, children: "作答" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: answerType, onChange: (e) => setAnswerType(e.target.value), style: { color: "#666", fontSize: "18px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "choice", children: "選擇題" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "input", children: "填空題" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "row", style: { gap: 8, alignItems: "center" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#666", fontSize: "18px" }, children: "題型" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: mode, onChange: (e) => setMode(e.target.value), style: { color: "#666", fontSize: "18px" }, disabled: isInput, children: isInput ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "zh2en", children: "中 ➜ 英" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "mixed", children: "混合" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "en2zh", children: "英 ➜ 中" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "zh2en", children: "中 ➜ 英" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "audio", children: "聽音辨義" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "sentence", children: "例句聽力" })
          ] }) }),
          isInput && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginLeft: 8, color: "#999", fontSize: 14 }, children: "（填空題僅支援 中 ➜ 英）" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn", onClick: start, disabled: pool.length === 0, style: { padding: "10px 24px", marginTop: "8px", marginBottom: "8px", fontSize: 18 }, children: [
        "開始測驗 (",
        pool.length,
        " 題)"
      ] }),
      filterMode === "learned" && pool.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#f44336", fontSize: "14px", textAlign: "center", padding: "8px", background: "#ffebee", borderRadius: "8px" }, children: "⚠️ 尚未學習任何單字，請先到學習頁面學習單字" })
    ] })
  ] });
}
function QuizContent({
  started,
  accuracy,
  score,
  count,
  endQuiz,
  dir,
  q: q2,
  getWordFontSize,
  replayAudio,
  options,
  selectedOption,
  correct,
  setSelectedOption,
  setCorrect,
  makeQuestion,
  answerType,
  answer,
  setAnswer,
  check,
  next,
  selectOption,
  target
}) {
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  reactExports.useEffect(() => {
    onPlayingChange(setIsPlaying);
    return () => onPlayingChange(null);
  }, []);
  reactExports.useEffect(() => {
    if (q2 && (dir === "audio" || dir === "sentence" || dir === "en2zh")) {
      replayAudio();
    }
  }, [q2, dir]);
  reactExports.useEffect(() => {
    if (answerType === "input" && correct === true) {
      const t2 = setTimeout(() => {
        if (typeof makeQuestion === "function") makeQuestion();
      }, 600);
      return () => clearTimeout(t2);
    }
  }, [answerType, correct, makeQuestion]);
  if (!q2) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    started && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel row", style: { justifyContent: "space-between", alignItems: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "progress", children: [
        "正確率 ",
        accuracy,
        "%（",
        score,
        "/",
        count,
        "）"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn secondary", onClick: endQuiz, children: "結束測驗" })
    ] }),
    started && q2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card quiz-card", style: { display: "flex", flexDirection: "column" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { justifyContent: "space-between", alignItems: "center" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chip", children: dir === "sentence" ? "例句聽力" : dir === "audio" ? "聽音 ➜ 中" : dir === "en2zh" ? "英 ➜ 中" : "中 ➜ 英" }),
          dir === "audio" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "14px", color: "#555" }, children: "請聽音選擇中文意思" }),
          dir === "sentence" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "14px", color: "#555" }, children: "請聽例句並選出出現過的單字" })
        ] }),
        dir === "audio" || dir === "sentence" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stack", style: { alignItems: "center", marginTop: 6, marginBottom: 6 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "btn accent",
              type: "button",
              onClick: replayAudio,
              style: {
                fontSize: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "none",
                borderRadius: "10%",
                boxShadow: "none",
                opacity: isPlaying ? 0.6 : 1,
                transform: isPlaying ? "scale(1.1)" : "scale(1)",
                transition: "all 0.2s ease",
                animation: isPlaying ? "pulse 1s infinite" : "none"
              },
              children: "🔊"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
                  @keyframes pulse {
                    0%, 100% { opacity: 0.6; }
                    50% { opacity: 1; }
                  }
                ` })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "question", style: {
          marginTop: 8,
          marginBottom: 12,
          textAlign: "center",
          fontSize: getWordFontSize(dir === "en2zh" ? q2.word : q2.meaning_cht),
          lineHeight: "44px"
        }, children: dir === "en2zh" ? q2.word : q2.meaning_cht })
      ] }),
      answerType === "choice" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stack", style: { gap: 10, marginTop: "auto" }, children: options.map((opt) => {
        const isSelected = selectedOption === opt;
        const showWrong = isSelected && correct === false;
        const showCorrect = isSelected && correct === true;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              if (showWrong) {
                setCorrect(null);
                setSelectedOption(null);
                return;
              }
              const isCorrect = selectOption(opt, target);
              if (isCorrect) {
                setTimeout(() => makeQuestion(), 300);
              }
            },
            type: "button",
            style: {
              padding: "12px 20px",
              paddingRight: showWrong ? "40px" : "20px",
              border: `1.5px solid ${showWrong ? "#ffb3ba" : showCorrect ? "#4CAF50" : "#d0d0d0"}`,
              borderRadius: "8px",
              background: showWrong ? "#fff5f5" : showCorrect ? "#e8f5e9" : "transparent",
              cursor: "pointer",
              fontSize: dir === "en2zh" ? "22px" : "24px",
              textAlign: "left",
              transition: "all 0.2s",
              position: "relative",
              color: "#212121"
            },
            onMouseEnter: (e) => {
              if (!showWrong && !showCorrect) {
                e.target.style.borderColor = "#4A90E2";
                e.target.style.background = "#f8f9fa";
              }
            },
            onMouseLeave: (e) => {
              if (!showWrong && !showCorrect) {
                e.target.style.borderColor = "#d0d0d0";
                e.target.style.background = "transparent";
              }
            },
            children: [
              opt,
              showWrong && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", fontSize: "20px", color: "#ff6b6b" }, children: "✗" })
            ]
          },
          opt
        );
      }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: check, className: "stack", style: { gap: 12 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            autoFocus: true,
            value: answer,
            onChange: (e) => setAnswer(e.target.value),
            placeholder: dir === "zh2en" ? "請輸入英文單字" : "請輸入中文意思"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { gap: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", type: "submit", children: "送出" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "btn secondary", onClick: next, children: "跳過/下一題" })
        ] })
      ] }),
      correct != null && answerType === "input" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 10 }, children: correct ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge", children: "答對了！" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "badge error", children: [
        "再試試看～ 正解：",
        dir === "zh2en" ? q2.word : q2.meaning_cht
      ] }) })
    ] })
  ] });
}
const QUIZ_KEY = "kids-english-quiz-v1";
const readQuizState = () => {
  try {
    return JSON.parse(localStorage.getItem(QUIZ_KEY)) || { wrongCounts: {} };
  } catch {
    return { wrongCounts: {} };
  }
};
const writeQuizState = (s) => localStorage.setItem(QUIZ_KEY, JSON.stringify(s));
function weightedPick(items, weights) {
  const total = weights.reduce((a, b) => a + b, 0);
  const r2 = Math.random() * (total || 1);
  let acc = 0;
  for (let i = 0; i < items.length; i++) {
    acc += weights[i];
    if (r2 <= acc) return items[i];
  }
  return items[items.length - 1];
}
function sample(arr, k2, avoid) {
  const res = [];
  const used = /* @__PURE__ */ new Set();
  if (avoid instanceof Set) {
    for (const id2 of avoid) used.add(id2);
  } else if (avoid !== void 0 && avoid !== null) {
    used.add(avoid);
  }
  while (res.length < k2 && used.size < arr.length) {
    const x2 = arr[Math.floor(Math.random() * arr.length)];
    if (used.has(x2.id)) continue;
    used.add(x2.id);
    res.push(x2);
  }
  return res;
}
const useQuizStore = create((set, get) => ({
  // Options state
  selected: [],
  filterMode: "sections",
  // learned | sections
  mode: "mixed",
  // en2zh | zh2en | audio | mixed
  answerType: "choice",
  // choice | input
  // Quiz state
  started: false,
  q: null,
  dir: "en2zh",
  currentSentence: "",
  // 當前使用的例句
  options: [],
  answer: "",
  selectedOption: null,
  correct: null,
  count: 0,
  score: 0,
  answered: false,
  // Persistent quiz state
  quizState: readQuizState(),
  // Computed
  accuracy: () => {
    const { count, score } = get();
    return count ? Math.round(score * 100 / count) : 0;
  },
  // Actions
  setSelected: (selected) => set({ selected }),
  setFilterMode: (filterMode) => set({ filterMode }),
  setMode: (mode) => set({ mode }),
  setAnswerType: (answerType) => set({ answerType }),
  setStarted: (started) => set({ started }),
  setQ: (q2) => set({ q: q2 }),
  setDir: (dir) => set({ dir }),
  setCurrentSentence: (currentSentence) => set({ currentSentence }),
  setOptions: (options) => set({ options }),
  setAnswer: (answer) => set({ answer }),
  setSelectedOption: (selectedOption) => set({ selectedOption }),
  setCorrect: (correct) => set({ correct }),
  setCount: (valueOrUpdater) => set((state) => ({ count: typeof valueOrUpdater === "function" ? valueOrUpdater(state.count) : valueOrUpdater })),
  setScore: (valueOrUpdater) => set((state) => ({ score: typeof valueOrUpdater === "function" ? valueOrUpdater(state.score) : valueOrUpdater })),
  setAnswered: (answered) => set({ answered }),
  updateQuizState: (updater) => {
    const newState = updater(get().quizState);
    set({ quizState: newState });
    writeQuizState(newState);
  },
  makeQuestion: (pool, allWords = pool) => {
    const { mode, answerType, quizState, setQ, setDir, setAnswer, setSelectedOption, setCorrect, setOptions, setAnswered, setCurrentSentence, filterMode } = get();
    if (pool.length === 0) {
      setQ(null);
      return;
    }
    const weights = pool.map((w2) => (quizState.wrongCounts[w2.id] || 0) + 1);
    const item = weightedPick(pool, weights);
    let direction = mode;
    if (mode === "mixed") {
      const dirs = ["en2zh", "zh2en", "audio", "sentence"];
      direction = dirs[Math.floor(Math.random() * dirs.length)];
    }
    setQ(item);
    setDir(direction);
    setAnswer("");
    setSelectedOption(null);
    setCorrect(null);
    setAnswered(false);
    let sentenceText = "";
    if (direction === "sentence") {
      const candidates = [];
      candidates.push(item.example_en);
      sentenceText = candidates.length ? candidates[Math.floor(Math.random() * candidates.length)] : "";
      setCurrentSentence(sentenceText || "");
    } else {
      setCurrentSentence("");
    }
    if (answerType === "choice") {
      const usedIds = /* @__PURE__ */ new Set([item.id]);
      const forbidden = direction === "sentence" && sentenceText ? new Set(sentenceText.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean)) : null;
      const pickFrom = (src, n2) => {
        const candidates = src.filter((w2) => !usedIds.has(w2.id) && !(forbidden && w2.word && forbidden.has(String(w2.word).toLowerCase())));
        const picked = sample(candidates, n2, usedIds);
        picked.forEach((p2) => usedIds.add(p2.id));
        return picked;
      };
      let distractors = sample(pool, 3, usedIds);
      if (forbidden) distractors = distractors.filter((d) => !(d.word && forbidden.has(String(d.word).toLowerCase())));
      distractors.forEach((d) => usedIds.add(d.id));
      if (distractors.length < 3) distractors.push(...pickFrom(pool, 3 - distractors.length));
      if (distractors.length < 3) distractors.push(...pickFrom(allWords, 3 - distractors.length));
      let opts;
      if (direction === "zh2en" || direction === "sentence") {
        opts = [item.word, ...distractors.map((d) => d.word)];
      } else {
        opts = [item.meaning_cht, ...distractors.map((d) => d.meaning_cht)];
      }
      for (let i = opts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opts[i], opts[j]] = [opts[j], opts[i]];
      }
      setOptions(opts);
    } else {
      setOptions([]);
    }
  },
  startQuiz: () => {
    const { setStarted } = get();
    setStarted(true);
  },
  endQuiz: () => {
    const { setStarted, setQ, setCount, setScore, setCorrect, setAnswer, setSelectedOption, setAnswered } = get();
    setStarted(false);
    setQ(null);
    setCount(0);
    setScore(0);
    setCorrect(null);
    setAnswer("");
    setSelectedOption(null);
    setAnswered(false);
  },
  checkAnswer: () => {
    const { q: q2, dir, answer, setCorrect, setCount, setScore, updateQuizState, answered, setAnswered } = get();
    if (!q2 || answered) return;
    const normalize = (s) => s.trim().toLowerCase();
    const user = normalize(answer);
    const target = normalize(dir === "zh2en" ? q2.word : q2.meaning_cht);
    const ok2 = user === target;
    setCorrect(ok2);
    setCount((prev) => prev + 1);
    setAnswered(true);
    if (ok2) {
      setScore((prev) => prev + 1);
    }
    updateQuizState((cur) => {
      if (!ok2) {
        cur.wrongCounts[q2.id] = (cur.wrongCounts[q2.id] || 0) + 1;
      } else if (cur.wrongCounts[q2.id] > 0) {
        cur.wrongCounts[q2.id] -= 1;
      }
      return cur;
    });
  },
  replayAudio: (speakWord2, speakSentence2) => {
    const { dir, q: q2, currentSentence } = get();
    if ((dir === "audio" || dir === "en2zh") && q2) {
      speakWord2(q2.word);
    }
    if (dir === "sentence" && currentSentence) {
      speakSentence2(currentSentence);
    }
  },
  selectOption: (opt, target) => {
    const { setSelectedOption, setCorrect, setCount, setScore, updateQuizState, q: q2, answered, setAnswered } = get();
    setSelectedOption(opt);
    const ok2 = opt === target;
    if (!answered) {
      setCount((prev) => prev + 1);
      setAnswered(true);
      if (ok2) {
        setCorrect(true);
        setScore((prev) => prev + 1);
        updateQuizState((cur) => {
          if (cur.wrongCounts[q2.id] > 0) cur.wrongCounts[q2.id] -= 1;
          return cur;
        });
      } else {
        setCorrect(false);
        updateQuizState((cur) => {
          cur.wrongCounts[q2.id] = (cur.wrongCounts[q2.id] || 0) + 1;
          return cur;
        });
      }
    } else {
      setCorrect(ok2);
    }
    return ok2;
  }
}));
function speakWord(text) {
  const { wordSpeed } = getProgress();
  speak(text, { rate: wordSpeed });
}
function speakSentence(text) {
  const { exampleSpeed } = getProgress();
  googleTTS(text, { lang: "en", rate: exampleSpeed });
}
function Quiz() {
  const { words: words2, sections: sections2, bySections } = useWordData();
  const learned = getProgress().learnedIds;
  const {
    selected,
    setSelected,
    filterMode,
    setFilterMode,
    mode,
    setMode,
    answerType,
    setAnswerType,
    started,
    q: q2,
    dir,
    options,
    answer,
    setAnswer,
    selectedOption,
    setSelectedOption,
    correct,
    setCorrect,
    count,
    score,
    accuracy,
    makeQuestion,
    startQuiz,
    endQuiz: endQuizStore,
    checkAnswer,
    replayAudio: replayAudioStore,
    selectOption
  } = useQuizStore();
  const getWordFontSize = (word = "") => {
    const cjkRe = /[\u3400-\u4DBF\u4E00-\u9FFF]/;
    let effectiveLen = 0;
    for (const ch2 of word) {
      effectiveLen += cjkRe.test(ch2) ? 2 : 1;
    }
    if (effectiveLen <= 8) return "44px";
    if (effectiveLen <= 12) return "36px";
    if (effectiveLen <= 16) return "30px";
    return "24px";
  };
  const pool = reactExports.useMemo(() => {
    if (filterMode === "learned") {
      return words2.filter((w2) => learned.has(w2.id));
    }
    return selected.length === 0 ? words2 : bySections(selected);
  }, [filterMode, selected, bySections, words2, learned]);
  const start = () => {
    startQuiz();
    makeQuestion(pool, words2);
  };
  const endQuiz = () => endQuizStore();
  const check = (e) => {
    if (e) e.preventDefault();
    checkAnswer();
  };
  const next = () => makeQuestion(pool, words2);
  const replayAudio = () => replayAudioStore(speakWord, speakSentence);
  reactExports.useEffect(() => {
    if (started) makeQuestion(pool, words2);
  }, [filterMode, selected, mode, answerType]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stack", style: { gap: 16, maxWidth: 900, width: "100%" }, children: [
    !started && /* @__PURE__ */ jsxRuntimeExports.jsx(
      QuizOptions,
      {
        filterMode,
        setFilterMode,
        selected,
        setSelected,
        sections: sections2,
        mode,
        setMode,
        answerType,
        setAnswerType,
        pool,
        start
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      QuizContent,
      {
        started,
        accuracy: accuracy(),
        score,
        count,
        endQuiz,
        dir,
        q: q2,
        getWordFontSize,
        replayAudio,
        options,
        selectedOption,
        correct,
        setSelectedOption,
        setCorrect,
        makeQuestion: () => makeQuestion(pool, words2),
        answerType,
        answer,
        setAnswer,
        check,
        next,
        selectOption,
        target: q2 ? dir === "zh2en" || dir === "sentence" ? q2.word : q2.meaning_cht : ""
      }
    )
  ] });
}
const useAdminStore = create((set, get) => ({
  // State
  selected: [],
  // Actions
  setSelected: (selected) => set({ selected }),
  clearAll: () => {
    saveProgress({ learnedIds: /* @__PURE__ */ new Set(), lastIndex: 0 });
    alert("已清除所有學習記錄");
    location.reload();
  },
  clearSelectedSections: (filtered) => {
    const { selected } = get();
    if (selected.length === 0) return;
    const prog = getProgress();
    const set2 = new Set(prog.learnedIds);
    for (const w2 of filtered) {
      set2.delete(w2.id);
    }
    saveProgress({ learnedIds: set2 });
    alert("已清除所選 Section 的學習記錄");
    location.reload();
  }
}));
function Admin() {
  const { words: words2, sections: sections2, bySections } = useWordData();
  const prog = getProgress();
  const learnedIds = prog.learnedIds;
  const learnedCount = learnedIds.size;
  const total = words2.length;
  const {
    selected,
    setSelected,
    clearAll,
    clearSelectedSections
  } = useAdminStore();
  const filtered = reactExports.useMemo(() => bySections(selected), [bySections, selected, words2]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stack", style: { gap: 16, maxWidth: 900, width: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel row", style: { justifyContent: "space-between" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "統計" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { gap: 16, marginTop: 6 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "chip", children: [
            "總單字：",
            total
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "chip", children: [
            "已學：",
            learnedCount
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "chip", children: [
            "完成率：",
            total ? Math.round(learnedCount * 100 / total) : 0,
            "%"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", style: { gap: 8 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn ghost", onClick: clearAll, children: "清除全部記錄" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionPicker, { sections: sections2, selectedIds: selected, onChange: setSelected }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel row", style: { justifyContent: "space-between" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "所選 Section 單字數：",
        filtered.length
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn secondary", onClick: () => clearSelectedSections(filtered), disabled: selected.length === 0, children: "清除所選 Section 記錄" })
    ] })
  ] });
}
const router = createBrowserRouter([
  {
    path: "/",
    element: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}),
    children: [
      { index: true, element: /* @__PURE__ */ jsxRuntimeExports.jsx(Learn, {}) },
      { path: "learn", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Learn, {}) },
      { path: "quiz", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Quiz, {}) },
      { path: "admin", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Admin, {}) }
    ]
  }
], {
  basename: "/kid_words/"
});
createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(RouterProvider2, { router }) })
);
