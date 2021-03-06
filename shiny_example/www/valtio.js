(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.valtio = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
//import * as valtio from 'valtio/vanilla';
var valtio = require('valtio/vanilla');
var valtio_utils = require('valtio/utils');

//export { valtio as default };
module.exports = {
  ...valtio,
  ...valtio_utils
};
},{"valtio/utils":4,"valtio/vanilla":5}],3:[function(require,module,exports){
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t||self).proxyCompare={})}(this,function(t){function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var r=Symbol(),n=Symbol(),o=Symbol(),i=Object.getPrototypeOf,u=new WeakMap,a=function(t){return t&&(u.has(t)?u.get(t):i(t)===Object.prototype||i(t)===Array.prototype)},f=function(t){return"object"==typeof t&&null!==t},c=function(t,e,u){if(!a(t))return t;var f=t[o]||t,s=function(t){return Object.isFrozen(t)||Object.values(Object.getOwnPropertyDescriptors(t)).some(function(t){return!t.writable})}(f),l=u&&u.get(f);return l&&l.f===s||((l=function(t,e){var i,u=!1,a=function(e,r){if(!u){var n=e.a.get(t);n||(n=new Set,e.a.set(t,n)),n.add(r)}},f=((i={}).f=e,i.get=function(e,r){return r===o?t:(a(this,r),c(e[r],this.a,this.c))},i.has=function(e,r){return r===n?(u=!0,this.a.delete(t),!0):(a(this,r),r in e)},i.ownKeys=function(t){return a(this,r),Reflect.ownKeys(t)},i);return e&&(f.set=f.deleteProperty=function(){return!1}),f}(f,s)).p=new Proxy(s?function(t){if(Array.isArray(t))return Array.from(t);var e=Object.getOwnPropertyDescriptors(t);return Object.values(e).forEach(function(t){t.configurable=!0}),Object.create(i(t),e)}(f):f,l),u&&u.set(f,l)),l.a=e,l.c=u,l.p},s=function(t,e){var r=Reflect.ownKeys(t),n=Reflect.ownKeys(e);return r.length!==n.length||r.some(function(t,e){return t!==n[e]})};t.affectedToPathList=function(t,e){var r=[];return function t(n,o){var i=e.get(n);i?i.forEach(function(e){t(n[e],o?[].concat(o,[e]):[e])}):o&&r.push(o)}(t),r},t.createProxy=c,t.getUntracked=function(t){return a(t)&&t[o]||null},t.isChanged=function t(n,o,i,u){if(Object.is(n,o))return!1;if(!f(n)||!f(o))return!0;var a=i.get(n);if(!a)return!0;if(u){var c,l=u.get(n);if(l&&l.n===o)return l.g;u.set(n,((c={}).n=o,c.g=!1,c))}for(var y,p,b=null,d=function(t,r){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(n)return(n=n.call(t)).next.bind(n);if(Array.isArray(t)||(n=function(t,r){if(t){if("string"==typeof t)return e(t,r);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?e(t,r):void 0}}(t))){n&&(t=n);var o=0;return function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(a);!(y=d()).done;){var g=y.value,h=g===r?s(n,o):t(n[g],o[g],i,u);if(!0!==h&&!1!==h||(b=h),b)break}return null===b&&(b=!0),u&&u.set(n,((p={}).n=o,p.g=b,p)),b},t.markToTrack=function(t,e){void 0===e&&(e=!0),u.set(t,e)},t.trackMemo=function(t){return!!a(t)&&n in t}});


},{}],4:[function(require,module,exports){
(function (process){(function (){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vanilla = require('valtio/vanilla');
var proxyCompare = require('proxy-compare');

var subscribeKey = function subscribeKey(proxyObject, key, callback, notifyInSync) {
  return vanilla.subscribe(proxyObject, function (ops) {
    if (ops.some(function (op) {
      return op[1][0] === key;
    })) {
      callback(proxyObject[key]);
    }
  }, notifyInSync);
};

var currentCleanups;
var watch = function watch(callback, options) {
  var cleanups = new Set();
  var subscriptions = new Set();
  var alive = true;

  var cleanup = function cleanup() {
    cleanups.forEach(function (clean) {
      clean();
    });
    cleanups.clear();
    subscriptions.clear();
  };

  var revalidate = function revalidate() {
    if (!alive) {
      return;
    }

    cleanup();
    var parent = currentCleanups;
    currentCleanups = cleanups;

    try {
      var cleanupReturn = callback(function (proxy) {
        subscriptions.add(proxy);
        return proxy;
      });

      if (cleanupReturn) {
        cleanups.add(cleanupReturn);
      }
    } finally {
      currentCleanups = parent;
    }

    subscriptions.forEach(function (proxy) {
      var clean = vanilla.subscribe(proxy, revalidate, options == null ? void 0 : options.sync);
      cleanups.add(clean);
    });
  };

  var wrappedCleanup = function wrappedCleanup() {
    if (alive) {
      cleanup();
      alive = false;
    }
  };

  if (currentCleanups) {
    currentCleanups.add(wrappedCleanup);
  }

  revalidate();
  return wrappedCleanup;
};

var DEVTOOLS = Symbol();
var devtools = function devtools(proxyObject, name) {
  var extension;

  try {
    extension = window.__REDUX_DEVTOOLS_EXTENSION__;
  } catch (_unused) {}

  if (!extension) {
    if (typeof process === 'object' && process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      console.warn('[Warning] Please install/enable Redux devtools extension');
    }

    return;
  }

  var isTimeTraveling = false;
  var devtools = extension.connect({
    name: name
  });
  var unsub1 = vanilla.subscribe(proxyObject, function (ops) {
    var action = ops.filter(function (_ref) {
      _ref[0];
          var path = _ref[1];
      return path[0] !== DEVTOOLS;
    }).map(function (_ref2) {
      var op = _ref2[0],
          path = _ref2[1];
      return op + ":" + path.map(String).join('.');
    }).join(', ');

    if (!action) {
      return;
    }

    if (isTimeTraveling) {
      isTimeTraveling = false;
    } else {
      var snapWithoutDevtools = Object.assign({}, vanilla.snapshot(proxyObject));
      delete snapWithoutDevtools[DEVTOOLS];
      devtools.send({
        type: action,
        updatedAt: new Date().toLocaleString()
      }, snapWithoutDevtools);
    }
  });
  var unsub2 = devtools.subscribe(function (message) {
    var _message$payload3, _message$payload4;

    if (message.type === 'ACTION' && message.payload) {
      try {
        Object.assign(proxyObject, JSON.parse(message.payload));
      } catch (e) {
        console.error('please dispatch a serializable value that JSON.parse() and proxy() support\n', e);
      }
    }

    if (message.type === 'DISPATCH' && message.state) {
      var _message$payload, _message$payload2;

      if (((_message$payload = message.payload) == null ? void 0 : _message$payload.type) === 'JUMP_TO_ACTION' || ((_message$payload2 = message.payload) == null ? void 0 : _message$payload2.type) === 'JUMP_TO_STATE') {
        isTimeTraveling = true;
        var state = JSON.parse(message.state);
        Object.assign(proxyObject, state);
      }
      proxyObject[DEVTOOLS] = message;
    } else if (message.type === 'DISPATCH' && ((_message$payload3 = message.payload) == null ? void 0 : _message$payload3.type) === 'COMMIT') {
      devtools.init(vanilla.snapshot(proxyObject));
    } else if (message.type === 'DISPATCH' && ((_message$payload4 = message.payload) == null ? void 0 : _message$payload4.type) === 'IMPORT_STATE') {
      var _message$payload$next, _message$payload$next2;

      var actions = (_message$payload$next = message.payload.nextLiftedState) == null ? void 0 : _message$payload$next.actionsById;
      var computedStates = ((_message$payload$next2 = message.payload.nextLiftedState) == null ? void 0 : _message$payload$next2.computedStates) || [];
      isTimeTraveling = true;
      computedStates.forEach(function (_ref3, index) {
        var state = _ref3.state;
        var action = actions[index] || 'No action found';
        Object.assign(proxyObject, state);

        if (index === 0) {
          devtools.init(vanilla.snapshot(proxyObject));
        } else {
          devtools.send(action, vanilla.snapshot(proxyObject));
        }
      });
    }
  });
  devtools.init(vanilla.snapshot(proxyObject));
  return function () {
    unsub1();
    unsub2();
  };
};

var subscriptionsCache = new WeakMap();

var getSubscriptions = function getSubscriptions(proxyObject) {
  var subscriptions = subscriptionsCache.get(proxyObject);

  if (!subscriptions) {
    subscriptions = new Map();
    subscriptionsCache.set(proxyObject, subscriptions);
  }

  return subscriptions;
};

var unstable_getDeriveSubscriptions = getSubscriptions;
var derive = function derive(derivedFns, options) {
  var proxyObject = (options == null ? void 0 : options.proxy) || vanilla.proxy({});
  var notifyInSync = options == null ? void 0 : options.sync;
  var subscriptions = getSubscriptions(proxyObject);

  var addSubscription = function addSubscription(p, key, callback) {
    var subscription = subscriptions.get(p);

    if (subscription) {
      subscription[0].set(key, callback);
    } else {
      var unsubscribe = vanilla.subscribe(p, function (ops) {
        var _subscriptions$get;

        if (p === proxyObject && ops.every(function (op) {
          return op[1].length === 1 && op[1][0] in derivedFns;
        })) {
          return;
        }

        (_subscriptions$get = subscriptions.get(p)) == null ? void 0 : _subscriptions$get[0].forEach(function (cb) {
          cb();
        });
      }, notifyInSync);
      subscriptions.set(p, [new Map([[key, callback]]), unsubscribe]);
    }
  };

  var removeSubscription = function removeSubscription(p, key) {
    var subscription = subscriptions.get(p);

    if (subscription) {
      var callbackMap = subscription[0],
          unsubscribe = subscription[1];
      callbackMap.delete(key);

      if (!callbackMap.size) {
        unsubscribe();
        subscriptions.delete(p);
      }
    }
  };

  Object.keys(derivedFns).forEach(function (key) {
    if (Object.getOwnPropertyDescriptor(proxyObject, key)) {
      throw new Error('object property already defined');
    }

    var fn = derivedFns[key];
    var lastDependencies = null;

    var evaluate = function evaluate() {
      if (lastDependencies) {
        if (Array.from(lastDependencies).every(function (_ref) {
          var p = _ref[0],
              n = _ref[1];
          return vanilla.getVersion(p) === n;
        })) {
          return;
        }
      }

      var dependencies = new Map();

      var get = function get(p) {
        dependencies.set(p, vanilla.getVersion(p));
        return p;
      };

      var value = fn(get);

      var subscribe = function subscribe() {
        var _lastDependencies2;

        dependencies.forEach(function (_, p) {
          var _lastDependencies;

          if (!((_lastDependencies = lastDependencies) != null && _lastDependencies.has(p))) {
            addSubscription(p, key, evaluate);
          }
        });
        (_lastDependencies2 = lastDependencies) == null ? void 0 : _lastDependencies2.forEach(function (_, p) {
          if (!dependencies.has(p)) {
            removeSubscription(p, key);
          }
        });
        lastDependencies = dependencies;
      };

      if (value instanceof Promise) {
        value.then(function () {
          subscribe();
          evaluate();
        });
      } else {
        subscribe();
      }

      proxyObject[key] = value;
    };

    evaluate();
  });
  return proxyObject;
};
var underive = function underive(proxyObject, options) {
  var subscriptions = getSubscriptions(proxyObject);
  var keysToDelete = options != null && options.delete ? new Set() : null;
  subscriptions.forEach(function (_ref2, p) {
    var callbackMap = _ref2[0],
        unsubscribe = _ref2[1];

    if (options != null && options.keys) {
      options.keys.forEach(function (key) {
        if (callbackMap.has(key)) {
          callbackMap.delete(key);

          if (keysToDelete) {
            keysToDelete.add(key);
          }
        }
      });
    } else {
      if (keysToDelete) {
        Array.from(callbackMap.keys()).forEach(function (key) {
          keysToDelete.add(key);
        });
      }

      callbackMap.clear();
    }

    if (!callbackMap.size) {
      unsubscribe();
      subscriptions.delete(p);
    }
  });

  if (keysToDelete) {
    keysToDelete.forEach(function (key) {
      delete proxyObject[key];
    });
  }
};

var addComputed_DEPRECATED = function addComputed_DEPRECATED(proxyObject, computedFns_FAKE, targetObject) {
  if (targetObject === void 0) {
    targetObject = proxyObject;
  }

  console.warn('addComputed is deprecated. Please consider using `derive` or `proxyWithComputed` instead. Falling back to emulation with derive.');
  var derivedFns = {};
  Object.keys(computedFns_FAKE).forEach(function (key) {
    derivedFns[key] = function (get) {
      return computedFns_FAKE[key](get(proxyObject));
    };
  });
  return derive(derivedFns, {
    proxy: targetObject
  });
};

var proxyWithComputed = function proxyWithComputed(initialObject, computedFns) {
  Object.keys(computedFns).forEach(function (key) {
    if (Object.getOwnPropertyDescriptor(initialObject, key)) {
      throw new Error('object property already defined');
    }

    var computedFn = computedFns[key];

    var _ref = typeof computedFn === 'function' ? {
      get: computedFn
    } : computedFn,
        get = _ref.get,
        set = _ref.set;

    var computedValue;
    var prevSnapshot;
    var affected = new WeakMap();
    var desc = {};

    desc.get = function () {
      var nextSnapshot = vanilla.snapshot(proxyObject);

      if (!prevSnapshot || proxyCompare.isChanged(prevSnapshot, nextSnapshot, affected)) {
        affected = new WeakMap();
        computedValue = get(proxyCompare.createProxy(nextSnapshot, affected));
        prevSnapshot = nextSnapshot;
      }

      return computedValue;
    };

    if (set) {
      desc.set = function (newValue) {
        return set(proxyObject, newValue);
      };
    }

    Object.defineProperty(initialObject, key, desc);
  });
  var proxyObject = vanilla.proxy(initialObject);
  return proxyObject;
};

var proxyWithHistory = function proxyWithHistory(initialValue, skipSubscribe) {
  if (skipSubscribe === void 0) {
    skipSubscribe = false;
  }

  var proxyObject = vanilla.proxy({
    value: initialValue,
    history: vanilla.ref({
      wip: initialValue,
      snapshots: [],
      index: -1
    }),
    canUndo: function canUndo() {
      return proxyObject.history.index > 0;
    },
    undo: function undo() {
      if (proxyObject.canUndo()) {
        proxyObject.value = proxyObject.history.wip = proxyObject.history.snapshots[--proxyObject.history.index];
        proxyObject.history.snapshots[proxyObject.history.index] = vanilla.snapshot(proxyObject).value;
      }
    },
    canRedo: function canRedo() {
      return proxyObject.history.index < proxyObject.history.snapshots.length - 1;
    },
    redo: function redo() {
      if (proxyObject.canRedo()) {
        proxyObject.value = proxyObject.history.wip = proxyObject.history.snapshots[++proxyObject.history.index];
        proxyObject.history.snapshots[proxyObject.history.index] = vanilla.snapshot(proxyObject).value;
      }
    },
    saveHistory: function saveHistory() {
      proxyObject.history.snapshots.splice(proxyObject.history.index + 1);
      proxyObject.history.snapshots.push(vanilla.snapshot(proxyObject).value);
      ++proxyObject.history.index;
    },
    subscribe: function subscribe() {
      return vanilla.subscribe(proxyObject, function (ops) {
        if (ops.some(function (op) {
          return op[1][0] === 'value' && (op[0] !== 'set' || op[2] !== proxyObject.history.wip);
        })) {
          proxyObject.saveHistory();
        }
      });
    }
  });
  proxyObject.saveHistory();

  if (!skipSubscribe) {
    proxyObject.subscribe();
  }

  return proxyObject;
};

exports.addComputed = addComputed_DEPRECATED;
exports.derive = derive;
exports.devtools = devtools;
exports.proxyWithComputed = proxyWithComputed;
exports.proxyWithHistory = proxyWithHistory;
exports.subscribeKey = subscribeKey;
exports.underive = underive;
exports.unstable_getDeriveSubscriptions = unstable_getDeriveSubscriptions;
exports.watch = watch;

}).call(this)}).call(this,require('_process'))
},{"_process":1,"proxy-compare":3,"valtio/vanilla":5}],5:[function(require,module,exports){
(function (process){(function (){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var proxyCompare = require('proxy-compare');

var VERSION = Symbol();
var LISTENERS = Symbol();
var SNAPSHOT = Symbol();
var PROMISE_RESULT = Symbol();
var PROMISE_ERROR = Symbol();
var refSet = new WeakSet();
var ref = function ref(o) {
  refSet.add(o);
  return o;
};

var isSupportedObject = function isSupportedObject(x) {
  return typeof x === 'object' && x !== null && (Array.isArray(x) || !x[Symbol.iterator]) && !(x instanceof WeakMap) && !(x instanceof WeakSet) && !(x instanceof Error) && !(x instanceof Number) && !(x instanceof Date) && !(x instanceof String) && !(x instanceof RegExp) && !(x instanceof ArrayBuffer);
};

var proxyCache = new WeakMap();
var globalVersion = 1;
var snapshotCache = new WeakMap();
var proxy = function proxy(initialObject) {
  if (initialObject === void 0) {
    initialObject = {};
  }

  if (!isSupportedObject(initialObject)) {
    throw new Error('unsupported object type');
  }

  var found = proxyCache.get(initialObject);

  if (found) {
    return found;
  }

  var version = globalVersion;
  var listeners = new Set();

  var notifyUpdate = function notifyUpdate(op, nextVersion) {
    if (!nextVersion) {
      nextVersion = ++globalVersion;
    }

    if (version !== nextVersion) {
      version = nextVersion;
      listeners.forEach(function (listener) {
        return listener(op, nextVersion);
      });
    }
  };

  var propListeners = new Map();

  var getPropListener = function getPropListener(prop) {
    var propListener = propListeners.get(prop);

    if (!propListener) {
      propListener = function propListener(op, nextVersion) {
        var newOp = [].concat(op);
        newOp[1] = [prop].concat(newOp[1]);
        notifyUpdate(newOp, nextVersion);
      };

      propListeners.set(prop, propListener);
    }

    return propListener;
  };

  var popPropListener = function popPropListener(prop) {
    var propListener = propListeners.get(prop);
    propListeners.delete(prop);
    return propListener;
  };

  var createSnapshot = function createSnapshot(target, receiver) {
    var cache = snapshotCache.get(receiver);

    if ((cache == null ? void 0 : cache[0]) === version) {
      return cache[1];
    }

    var snapshot = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
    proxyCompare.markToTrack(snapshot, true);
    snapshotCache.set(receiver, [version, snapshot]);
    Reflect.ownKeys(target).forEach(function (key) {
      var value = target[key];

      if (refSet.has(value)) {
        proxyCompare.markToTrack(value, false);
        snapshot[key] = value;
      } else if (!isSupportedObject(value)) {
        snapshot[key] = value;
      } else if (value instanceof Promise) {
        if (PROMISE_RESULT in value) {
          snapshot[key] = value[PROMISE_RESULT];
        } else {
          var errorOrPromise = value[PROMISE_ERROR] || value;
          Object.defineProperty(snapshot, key, {
            get: function get() {
              if (PROMISE_RESULT in value) {
                return value[PROMISE_RESULT];
              }

              throw errorOrPromise;
            }
          });
        }
      } else if (value[VERSION]) {
        snapshot[key] = value[SNAPSHOT];
      } else {
        snapshot[key] = value;
      }
    });
    Object.freeze(snapshot);
    return snapshot;
  };

  var baseObject = Array.isArray(initialObject) ? [] : Object.create(Object.getPrototypeOf(initialObject));
  var proxyObject = new Proxy(baseObject, {
    get: function get(target, prop, receiver) {
      if (prop === VERSION) {
        return version;
      }

      if (prop === LISTENERS) {
        return listeners;
      }

      if (prop === SNAPSHOT) {
        return createSnapshot(target, receiver);
      }

      return target[prop];
    },
    deleteProperty: function deleteProperty(target, prop) {
      var prevValue = target[prop];
      var childListeners = prevValue == null ? void 0 : prevValue[LISTENERS];

      if (childListeners) {
        childListeners.delete(popPropListener(prop));
      }

      var deleted = Reflect.deleteProperty(target, prop);

      if (deleted) {
        notifyUpdate(['delete', [prop], prevValue]);
      }

      return deleted;
    },
    set: function set(target, prop, value) {
      var _Object$getOwnPropert;

      var prevValue = target[prop];

      if (Object.is(prevValue, value)) {
        return true;
      }

      var childListeners = prevValue == null ? void 0 : prevValue[LISTENERS];

      if (childListeners) {
        childListeners.delete(popPropListener(prop));
      }

      if (refSet.has(value) || !isSupportedObject(value) || (_Object$getOwnPropert = Object.getOwnPropertyDescriptor(target, prop)) != null && _Object$getOwnPropert.set) {
        target[prop] = value;
      } else if (value instanceof Promise) {
        target[prop] = value.then(function (v) {
          target[prop][PROMISE_RESULT] = v;
          notifyUpdate(['resolve', [prop], v]);
          return v;
        }).catch(function (e) {
          target[prop][PROMISE_ERROR] = e;
          notifyUpdate(['reject', [prop], e]);
        });
      } else {
        value = proxyCompare.getUntracked(value) || value;

        if (value[LISTENERS]) {
          target[prop] = value;
        } else {
          target[prop] = proxy(value);
        }

        target[prop][LISTENERS].add(getPropListener(prop));
      }

      notifyUpdate(['set', [prop], value, prevValue]);
      return true;
    }
  });
  proxyCache.set(initialObject, proxyObject);
  Reflect.ownKeys(initialObject).forEach(function (key) {
    var desc = Object.getOwnPropertyDescriptor(initialObject, key);

    if (desc.get || desc.set) {
      Object.defineProperty(baseObject, key, desc);
    } else {
      proxyObject[key] = initialObject[key];
    }
  });
  return proxyObject;
};
var getVersion = function getVersion(proxyObject) {
  return proxyObject[VERSION];
};
var subscribe = function subscribe(proxyObject, callback, notifyInSync) {
  if (typeof process === 'object' && process.env.NODE_ENV !== 'production' && !(proxyObject != null && proxyObject[LISTENERS])) {
    console.warn('Please use proxy object');
  }

  var promise;
  var ops = [];

  var listener = function listener(op) {
    ops.push(op);

    if (notifyInSync) {
      callback(ops.splice(0));
      return;
    }

    if (!promise) {
      promise = Promise.resolve().then(function () {
        promise = undefined;
        callback(ops.splice(0));
      });
    }
  };

  proxyObject[LISTENERS].add(listener);
  return function () {
    proxyObject[LISTENERS].delete(listener);
  };
};
var snapshot = function snapshot(proxyObject) {
  if (typeof process === 'object' && process.env.NODE_ENV !== 'production' && !(proxyObject != null && proxyObject[SNAPSHOT])) {
    console.warn('Please use proxy object');
  }

  return proxyObject[SNAPSHOT];
};

exports.getVersion = getVersion;
exports.proxy = proxy;
exports.ref = ref;
exports.snapshot = snapshot;
exports.subscribe = subscribe;

}).call(this)}).call(this,require('_process'))
},{"_process":1,"proxy-compare":3}]},{},[2])(2)
});
