"use strict";
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function makeMap(str, expectsLowerCase) {
  const set2 = new Set(str.split(","));
  return expectsLowerCase ? (val2) => set2.has(val2.toLowerCase()) : (val2) => set2.has(val2);
}
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val2, key) => hasOwnProperty$1.call(val2, key);
const isArray = Array.isArray;
const isMap = (val2) => toTypeString(val2) === "[object Map]";
const isSet = (val2) => toTypeString(val2) === "[object Set]";
const isFunction = (val2) => typeof val2 === "function";
const isString = (val2) => typeof val2 === "string";
const isSymbol = (val2) => typeof val2 === "symbol";
const isObject = (val2) => val2 !== null && typeof val2 === "object";
const isPromise = (val2) => {
  return (isObject(val2) || isFunction(val2)) && isFunction(val2.then) && isFunction(val2.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val2) => toTypeString(val2) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction((str) => {
  const s = str ? `on${capitalize(str)}` : ``;
  return s;
});
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns$1 = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const looseToNumber = (val2) => {
  const n = parseFloat(val2);
  return isNaN(n) ? val2 : n;
};
const toDisplayString = (val2) => {
  return isString(val2) ? val2 : val2 == null ? "" : isArray(val2) || isObject(val2) && (val2.toString === objectToString || !isFunction(val2.toString)) ? JSON.stringify(val2, replacer, 2) : String(val2);
};
const replacer = (_key, val2) => {
  if (val2 && val2.__v_isRef) {
    return replacer(_key, val2.value);
  } else if (isMap(val2)) {
    return {
      [`Map(${val2.size})`]: [...val2.entries()].reduce(
        (entries, [key, val22], i) => {
          entries[stringifySymbol(key, i) + " =>"] = val22;
          return entries;
        },
        {}
      )
    };
  } else if (isSet(val2)) {
    return {
      [`Set(${val2.size})`]: [...val2.values()].map((v) => stringifySymbol(v))
    };
  } else if (isSymbol(val2)) {
    return stringifySymbol(val2);
  } else if (isObject(val2) && !isArray(val2) && !isPlainObject(val2)) {
    return String(val2);
  }
  return val2;
};
const stringifySymbol = (v, i = "") => {
  var _a;
  return isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v;
};
const LOCALE_ZH_HANS = "zh-Hans";
const LOCALE_ZH_HANT = "zh-Hant";
const LOCALE_EN = "en";
const LOCALE_FR = "fr";
const LOCALE_ES = "es";
function include(str, parts) {
  return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts) {
  return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, "-");
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === "chinese") {
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf("zh") === 0) {
    if (locale.indexOf("-hans") > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("-hant") > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages && Object.keys(messages).length > 0) {
    locales = Object.keys(messages);
  }
  const lang = startsWith(locale, locales);
  if (lang) {
    return lang;
  }
}
const SLOT_DEFAULT_NAME = "d";
const ON_SHOW = "onShow";
const ON_HIDE = "onHide";
const ON_LAUNCH = "onLaunch";
const ON_ERROR = "onError";
const ON_THEME_CHANGE = "onThemeChange";
const ON_PAGE_NOT_FOUND = "onPageNotFound";
const ON_UNHANDLE_REJECTION = "onUnhandledRejection";
const ON_LAST_PAGE_BACK_PRESS = "onLastPageBackPress";
const ON_EXIT = "onExit";
const ON_LOAD = "onLoad";
const ON_READY = "onReady";
const ON_UNLOAD = "onUnload";
const ON_INIT = "onInit";
const ON_SAVE_EXIT_STATE = "onSaveExitState";
const ON_UPLOAD_DOUYIN_VIDEO = "onUploadDouyinVideo";
const ON_LIVE_MOUNT = "onLiveMount";
const ON_TITLE_CLICK = "onTitleClick";
const ON_RESIZE = "onResize";
const ON_BACK_PRESS = "onBackPress";
const ON_PAGE_SCROLL = "onPageScroll";
const ON_TAB_ITEM_TAP = "onTabItemTap";
const ON_REACH_BOTTOM = "onReachBottom";
const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
const ON_SHARE_TIMELINE = "onShareTimeline";
const ON_SHARE_CHAT = "onShareChat";
const ON_COPY_URL = "onCopyUrl";
const ON_ADD_TO_FAVORITES = "onAddToFavorites";
const ON_SHARE_APP_MESSAGE = "onShareAppMessage";
const ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";
const ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = "onNavigationBarSearchInputFocusChanged";
const VIRTUAL_HOST_STYLE = "virtualHostStyle";
const VIRTUAL_HOST_CLASS = "virtualHostClass";
const VIRTUAL_HOST_HIDDEN = "virtualHostHidden";
const VIRTUAL_HOST_ID = "virtualHostId";
const customizeRE = /:/g;
function customizeEvent(str) {
  return camelize(str.replace(customizeRE, "-"));
}
function hasLeadingSlash(str) {
  return str.indexOf("/") === 0;
}
function addLeadingSlash(str) {
  return hasLeadingSlash(str) ? str : "/" + str;
}
const invokeArrayFns = (fns, arg) => {
  let ret;
  for (let i = 0; i < fns.length; i++) {
    ret = fns[i](arg);
  }
  return ret;
};
function once(fn, ctx = null) {
  let res;
  return (...args) => {
    if (fn) {
      res = fn.apply(ctx, args);
      fn = null;
    }
    return res;
  };
}
function getValueByDataPath(obj, path) {
  if (!isString(path)) {
    return;
  }
  path = path.replace(/\[(\d+)\]/g, ".$1");
  const parts = path.split(".");
  let key = parts[0];
  if (!obj) {
    obj = {};
  }
  if (parts.length === 1) {
    return obj[key];
  }
  return getValueByDataPath(obj[key], parts.slice(1).join("."));
}
const encode = encodeURIComponent;
function stringifyQuery(obj, encodeStr = encode) {
  const res = obj ? Object.keys(obj).map((key) => {
    let val2 = obj[key];
    if (typeof val2 === void 0 || val2 === null) {
      val2 = "";
    } else if (isPlainObject(val2)) {
      val2 = JSON.stringify(val2);
    }
    return encodeStr(key) + "=" + encodeStr(val2);
  }).filter((x) => x.length > 0).join("&") : null;
  return res ? `?${res}` : "";
}
const PAGE_HOOKS = [
  ON_INIT,
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_RESIZE,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_SHARE_APP_MESSAGE,
  ON_SHARE_CHAT,
  ON_COPY_URL,
  ON_UPLOAD_DOUYIN_VIDEO,
  ON_LIVE_MOUNT,
  ON_TITLE_CLICK,
  ON_ADD_TO_FAVORITES,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
function isRootHook(name) {
  return PAGE_HOOKS.indexOf(name) > -1;
}
const UniLifecycleHooks = [
  ON_SHOW,
  ON_HIDE,
  ON_LAUNCH,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION,
  ON_EXIT,
  ON_INIT,
  ON_LOAD,
  ON_READY,
  ON_UNLOAD,
  ON_RESIZE,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_ADD_TO_FAVORITES,
  ON_SHARE_APP_MESSAGE,
  ON_SHARE_CHAT,
  ON_COPY_URL,
  ON_UPLOAD_DOUYIN_VIDEO,
  ON_LIVE_MOUNT,
  ON_TITLE_CLICK,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED,
  ON_LAST_PAGE_BACK_PRESS
];
const MINI_PROGRAM_PAGE_RUNTIME_HOOKS = /* @__PURE__ */ (() => {
  return {
    onPageScroll: 1,
    onShareAppMessage: 1 << 1,
    onShareTimeline: 1 << 2,
    onShareChat: 1 << 3,
    onCopyUrl: 1 << 4,
    onUploadDouyinVideo: 1 << 5,
    onLiveMount: 1 << 6,
    onTitleClick: 1 << 7
  };
})();
function isUniLifecycleHook(name, value, checkType = true) {
  if (checkType && !isFunction(value)) {
    return false;
  }
  if (UniLifecycleHooks.indexOf(name) > -1) {
    return true;
  } else if (name.indexOf("on") === 0) {
    return true;
  }
  return false;
}
let vueApp;
const createVueAppHooks = [];
function onCreateVueApp(hook) {
  if (vueApp) {
    return hook(vueApp);
  }
  createVueAppHooks.push(hook);
}
function invokeCreateVueAppHook(app) {
  vueApp = app;
  createVueAppHooks.forEach((hook) => hook(app));
}
const invokeCreateErrorHandler = once((app, createErrorHandler2) => {
  return createErrorHandler2(app);
});
const E = function() {
};
E.prototype = {
  _id: 1,
  on: function(name, callback, ctx) {
    var e2 = this.e || (this.e = {});
    (e2[name] || (e2[name] = [])).push({
      fn: callback,
      ctx,
      _id: this._id
    });
    return this._id++;
  },
  once: function(name, callback, ctx) {
    var self2 = this;
    function listener() {
      self2.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },
  emit: function(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;
    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }
    return this;
  },
  off: function(name, event) {
    var e2 = this.e || (this.e = {});
    var evts = e2[name];
    var liveEvents = [];
    if (evts && event) {
      for (var i = evts.length - 1; i >= 0; i--) {
        if (evts[i].fn === event || evts[i].fn._ === event || evts[i]._id === event) {
          evts.splice(i, 1);
          break;
        }
      }
      liveEvents = evts;
    }
    liveEvents.length ? e2[name] = liveEvents : delete e2[name];
    return this;
  }
};
var E$1 = E;
/**
* @dcloudio/uni-mp-vue v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function warn$2(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn$2(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function recordEffectScope(effect2, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect2);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
let activeEffect;
class ReactiveEffect {
  constructor(fn, trigger2, scheduler, scope) {
    this.fn = fn;
    this.trigger = trigger2;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this._dirtyLevel = 4;
    this._trackId = 0;
    this._runnings = 0;
    this._shouldSchedule = false;
    this._depsLength = 0;
    recordEffectScope(this, scope);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1;
      pauseTracking();
      for (let i = 0; i < this._depsLength; i++) {
        const dep = this.deps[i];
        if (dep.computed) {
          triggerComputed(dep.computed);
          if (this._dirtyLevel >= 4) {
            break;
          }
        }
      }
      if (this._dirtyLevel === 1) {
        this._dirtyLevel = 0;
      }
      resetTracking();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(v) {
    this._dirtyLevel = v ? 4 : 0;
  }
  run() {
    this._dirtyLevel = 0;
    if (!this.active) {
      return this.fn();
    }
    let lastShouldTrack = shouldTrack;
    let lastEffect = activeEffect;
    try {
      shouldTrack = true;
      activeEffect = this;
      this._runnings++;
      preCleanupEffect(this);
      return this.fn();
    } finally {
      postCleanupEffect(this);
      this._runnings--;
      activeEffect = lastEffect;
      shouldTrack = lastShouldTrack;
    }
  }
  stop() {
    var _a;
    if (this.active) {
      preCleanupEffect(this);
      postCleanupEffect(this);
      (_a = this.onStop) == null ? void 0 : _a.call(this);
      this.active = false;
    }
  }
}
function triggerComputed(computed2) {
  return computed2.value;
}
function preCleanupEffect(effect2) {
  effect2._trackId++;
  effect2._depsLength = 0;
}
function postCleanupEffect(effect2) {
  if (effect2.deps.length > effect2._depsLength) {
    for (let i = effect2._depsLength; i < effect2.deps.length; i++) {
      cleanupDepEffect(effect2.deps[i], effect2);
    }
    effect2.deps.length = effect2._depsLength;
  }
}
function cleanupDepEffect(dep, effect2) {
  const trackId = dep.get(effect2);
  if (trackId !== void 0 && effect2._trackId !== trackId) {
    dep.delete(effect2);
    if (dep.size === 0) {
      dep.cleanup();
    }
  }
}
let shouldTrack = true;
let pauseScheduleStack = 0;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function pauseScheduling() {
  pauseScheduleStack++;
}
function resetScheduling() {
  pauseScheduleStack--;
  while (!pauseScheduleStack && queueEffectSchedulers.length) {
    queueEffectSchedulers.shift()();
  }
}
function trackEffect(effect2, dep, debuggerEventExtraInfo) {
  var _a;
  if (dep.get(effect2) !== effect2._trackId) {
    dep.set(effect2, effect2._trackId);
    const oldDep = effect2.deps[effect2._depsLength];
    if (oldDep !== dep) {
      if (oldDep) {
        cleanupDepEffect(oldDep, effect2);
      }
      effect2.deps[effect2._depsLength++] = dep;
    } else {
      effect2._depsLength++;
    }
    {
      (_a = effect2.onTrack) == null ? void 0 : _a.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
    }
  }
}
const queueEffectSchedulers = [];
function triggerEffects(dep, dirtyLevel, debuggerEventExtraInfo) {
  var _a;
  pauseScheduling();
  for (const effect2 of dep.keys()) {
    let tracking;
    if (effect2._dirtyLevel < dirtyLevel && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      effect2._shouldSchedule || (effect2._shouldSchedule = effect2._dirtyLevel === 0);
      effect2._dirtyLevel = dirtyLevel;
    }
    if (effect2._shouldSchedule && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      {
        (_a = effect2.onTrigger) == null ? void 0 : _a.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
      }
      effect2.trigger();
      if ((!effect2._runnings || effect2.allowRecurse) && effect2._dirtyLevel !== 2) {
        effect2._shouldSchedule = false;
        if (effect2.scheduler) {
          queueEffectSchedulers.push(effect2.scheduler);
        }
      }
    }
  }
  resetScheduling();
}
const createDep = (cleanup, computed2) => {
  const dep = /* @__PURE__ */ new Map();
  dep.cleanup = cleanup;
  dep.computed = computed2;
  return dep;
};
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep(() => depsMap.delete(key)));
    }
    trackEffect(
      activeEffect,
      dep,
      {
        target,
        type,
        key
      }
    );
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || !isSymbol(key2) && key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  pauseScheduling();
  for (const dep of deps) {
    if (dep) {
      triggerEffects(
        dep,
        4,
        {
          target,
          type,
          key,
          newValue,
          oldValue,
          oldTarget
        }
      );
    }
  }
  resetScheduling();
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      pauseScheduling();
      const res = toRaw(this)[key].apply(this, args);
      resetScheduling();
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    if (!this._isShallow) {
      const isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return false;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    {
      warn$2(
        `Set operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
  deleteProperty(target, key) {
    {
      warn$2(
        `Delete operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(
  true
);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      warn$2(
        `${capitalize(type)} operation ${key}failed: target is readonly.`,
        toRaw(this)
      );
    }
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      true
    );
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [
  mutableInstrumentations,
  readonlyInstrumentations,
  shallowInstrumentations,
  shallowReadonlyInstrumentations
] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    warn$2(
      `Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    {
      warn$2(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  if (Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
}
const toReactive = (value) => isObject(value) ? reactive(value) : value;
const toReadonly = (value) => isObject(value) ? readonly(value) : value;
const COMPUTED_SIDE_EFFECT_WARN = `Computed is still dirty after getter evaluation, likely because a computed is mutating its own dependency in its getter. State mutations in computed getters should be avoided.  Check the docs for more details: https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free`;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this.getter = getter;
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this["__v_isReadonly"] = false;
    this.effect = new ReactiveEffect(
      () => getter(this._value),
      () => triggerRefValue(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    );
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    if ((!self2._cacheable || self2.effect.dirty) && hasChanged(self2._value, self2._value = self2.effect.run())) {
      triggerRefValue(self2, 4);
    }
    trackRefValue(self2);
    if (self2.effect._dirtyLevel >= 2) {
      if (this._warnRecursive) {
        warn$2(COMPUTED_SIDE_EFFECT_WARN, `

getter: `, this.getter);
      }
      triggerRefValue(self2, 2);
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(v) {
    this.effect.dirty = v;
  }
  // #endregion
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      warn$2("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
function trackRefValue(ref2) {
  var _a;
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    trackEffect(
      activeEffect,
      (_a = ref2.dep) != null ? _a : ref2.dep = createDep(
        () => ref2.dep = void 0,
        ref2 instanceof ComputedRefImpl ? ref2 : void 0
      ),
      {
        target: ref2,
        type: "get",
        key: "value"
      }
    );
  }
}
function triggerRefValue(ref2, dirtyLevel = 4, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    triggerEffects(
      dep,
      dirtyLevel,
      {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      }
    );
  }
}
function isRef(r2) {
  return !!(r2 && r2.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, 4, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn$1(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        msg + args.map((a) => {
          var _a, _b;
          return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
        }).join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://github.com/vuejs/core ."
};
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings[type] || type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(
        appErrorHandler,
        null,
        10,
        [err, exposedInstance, errorInfo]
      );
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings[type] || type;
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      console.error(err);
    } else {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue$1 = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick$1(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue$1.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue$1[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.pre) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!queue$1.length || !queue$1.includes(
    job,
    isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
  )) {
    if (job.id == null) {
      queue$1.push(job);
    } else {
      queue$1.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function hasQueueJob(job) {
  return queue$1.indexOf(job) > -1;
}
function invalidateJob(job) {
  const i = queue$1.indexOf(job);
  if (i > flushIndex) {
    queue$1.splice(i, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(
      cb,
      cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
    )) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen, i = isFlushing ? flushIndex + 1 : 0) {
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  for (; i < queue$1.length; i++) {
    const cb = queue$1[i];
    if (cb && cb.pre) {
      if (checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      queue$1.splice(i, 1);
      i--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a, b) => getId(a) - getId(b)
    );
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a, b) => {
  const diff2 = getId(a) - getId(b);
  if (diff2 === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff2;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  queue$1.sort(comparator);
  const check = (job) => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0; flushIndex < queue$1.length; flushIndex++) {
      const job = queue$1[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue$1.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue$1.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      handleError(
        `Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      );
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
let devtools;
let buffer = [];
let devtoolsNotInstalled = false;
function emit$1(event, ...args) {
  if (devtools) {
    devtools.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook(hook, target) {
  var _a, _b;
  devtools = hook;
  if (devtools) {
    devtools.enabled = true;
    buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
    buffer = [];
  } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    window.HTMLElement && // also exclude jsdom
    !((_b = (_a = window.navigator) == null ? void 0 : _a.userAgent) == null ? void 0 : _b.includes("jsdom"))
  ) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook(newHook, target);
    });
    setTimeout(() => {
      if (!devtools) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app, version2) {
  emit$1("app:init", app, version2, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:added"
  /* COMPONENT_ADDED */
);
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:updated"
  /* COMPONENT_UPDATED */
);
const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:removed"
  /* COMPONENT_REMOVED */
);
const devtoolsComponentRemoved = (component) => {
  if (devtools && typeof devtools.cleanupBuffer === "function" && // remove the component if it wasn't buffered
  !devtools.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit$1(
      hook,
      component.appContext.app,
      component.uid,
      // fixed by xxxxxx
      // 为 0 是 App，无 parent 是 Page 指向 App
      component.uid === 0 ? void 0 : component.parent ? component.parent.uid : 0,
      component
    );
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:start"
  /* PERFORMANCE_START */
);
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:end"
  /* PERFORMANCE_END */
);
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit$1(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit$1(
    "component:emit",
    component.appContext.app,
    component,
    event,
    params
  );
}
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  {
    const {
      emitsOptions,
      propsOptions: [propsOptions]
    } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn$1(
            `Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`
          );
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn$1(
              `Invalid event arguments: event validation failed for event "${event}".`
            );
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => isString(a) ? a.trim() : a);
    }
    if (number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn$1(
        `Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(
          instance,
          instance.type
        )} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(
          event
        )}" instead of "${event}".`
      );
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  instance && instance.type.__scopeId || null;
  return prev;
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction(cb)) {
    warn$1(
      `\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`
    );
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, {
  immediate,
  deep,
  flush,
  once: once2,
  onTrack,
  onTrigger
} = EMPTY_OBJ) {
  if (cb && once2) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      unwatch();
    };
  }
  if (deep !== void 0 && typeof deep === "number") {
    warn$1(
      `watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.`
    );
  }
  if (!cb) {
    if (immediate !== void 0) {
      warn$1(
        `watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (deep !== void 0) {
      warn$1(
        `watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (once2 !== void 0) {
      warn$1(
        `watch() "once" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
  }
  const warnInvalidSource = (s2) => {
    warn$1(
      `Invalid watch source: `,
      s2,
      `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`
    );
  };
  const instance = currentInstance;
  const reactiveGetter = (source2) => deep === true ? source2 : (
    // for deep: false, only traverse root-level properties
    traverse(source2, deep === false ? 1 : void 0)
  );
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s2) => isReactive(s2) || isShallow(s2));
    getter = () => source.map((s2) => {
      if (isRef(s2)) {
        return s2.value;
      } else if (isReactive(s2)) {
        return reactiveGetter(s2);
      } else if (isFunction(s2)) {
        return callWithErrorHandling(s2, instance, 2);
      } else {
        warnInvalidSource(s2);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(
          source,
          instance,
          3,
          [onCleanup]
        );
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect2.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
      cleanup = effect2.onStop = void 0;
    };
  };
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect2.active || !effect2.dirty) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect2.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect$1(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect2 = new ReactiveEffect(getter, NOOP, scheduler);
  const scope = getCurrentScope();
  const unwatch = () => {
    effect2.stop();
    if (scope) {
      remove(scope.effects, effect2);
    }
  };
  {
    effect2.onTrack = onTrack;
    effect2.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect2.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect$1(
      effect2.run.bind(effect2),
      instance && instance.suspense
    );
  } else {
    effect2.run();
  }
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, depth, currentDepth = 0, seen) {
  if (!isObject(value) || value["__v_skip"]) {
    return value;
  }
  if (depth && depth > 0) {
    if (currentDepth >= depth) {
      return value;
    }
    currentDepth++;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, depth, currentDepth, seen);
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], depth, currentDepth, seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, depth, currentDepth, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], depth, currentDepth, seen);
    }
  }
  return value;
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn$1("Do not use built-in directive ids as custom directive id: " + name);
  }
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject(rootProps)) {
      warn$1(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
        {
          warn$1(
            `app.config cannot be replaced. Modify individual options instead.`
          );
        }
      },
      use(plugin2, ...options) {
        if (installedPlugins.has(plugin2)) {
          warn$1(`Plugin has already been applied to target app.`);
        } else if (plugin2 && isFunction(plugin2.install)) {
          installedPlugins.add(plugin2);
          plugin2.install(app, ...options);
        } else if (isFunction(plugin2)) {
          installedPlugins.add(plugin2);
          plugin2(app, ...options);
        } else {
          warn$1(
            `A plugin must either be a function or an object with an "install" function.`
          );
        }
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else {
            warn$1(
              "Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : "")
            );
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn$1(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn$1(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      // fixed by xxxxxx
      mount() {
      },
      // fixed by xxxxxx
      unmount() {
      },
      provide(key, value) {
        if (key in context.provides) {
          warn$1(
            `App already provides property with key "${String(key)}". It will be overwritten with the new value.`
          );
        }
        context.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    return app;
  };
}
let currentApp = null;
function provide(key, value) {
  if (!currentInstance) {
    {
      warn$1(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
    if (currentInstance.type.mpType === "app") {
      currentInstance.appContext.app.provide(key, value);
    }
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    const provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp._context.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else {
      warn$1(`injection "${String(key)}" not found.`);
    }
  } else {
    warn$1(`inject() can only be used inside setup() or functional components.`);
  }
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    if (isRootHook(type)) {
      target = target.root;
    }
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey(
      (ErrorTypeStrings[type] || type.replace(/^on/, "")).replace(/ hook$/, "")
    );
    warn$1(
      `${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().`
    );
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook(
  "rtg"
);
const onRenderTracked = createHook(
  "rtc"
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
function getComponentInternalInstance(i) {
  return i;
}
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    // fixed by xxxxxx
    $: getComponentInternalInstance,
    // fixed by xxxxxx vue-i18n 在 dev 模式，访问了 $el，故模拟一个假的
    // $el: i => i.vnode.el,
    $el: (i) => i.__$el || (i.__$el = {}),
    $data: (i) => i.data,
    $props: (i) => shallowReadonly(i.props),
    $attrs: (i) => shallowReadonly(i.attrs),
    $slots: (i) => shallowReadonly(i.slots),
    $refs: (i) => shallowReadonly(i.refs),
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    $forceUpdate: (i) => i.f || (i.f = () => {
      i.effect.dirty = true;
      queueJob(i.update);
    }),
    // $nextTick: i => i.n || (i.n = nextTick.bind(i.proxy!)),// fixed by xxxxxx
    $watch: (i) => instanceWatch.bind(i)
  })
);
const isReservedPrefix = (key) => key === "_" || key === "$";
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n2 = accessCache[key];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      } else if (key === "$slots") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (instance.exposed && hasOwn(instance.exposed, key)) {
      return instance.exposed[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
        warn$1(
          `Property ${JSON.stringify(
            key
          )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
        );
      } else if (instance === currentRenderingInstance) {
        warn$1(
          `Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`
        );
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (setupState.__isScriptSetup && hasOwn(setupState, key)) {
      warn$1(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      warn$1(`Attempting to mutate prop "${key}". Props are readonly.`);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn$1(
        `Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`
      );
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, propsOptions }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$1(
      `Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`
    );
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const {
    ctx,
    propsOptions: [propsOptions]
  } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn$1(
          `setup() return property ${JSON.stringify(
            key
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
function normalizePropsOrEmits(props) {
  return isArray(props) ? props.reduce(
    (normalized, p2) => (normalized[p2] = null, normalized),
    {}
  ) : props;
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn$1(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions$1(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  function initInjections() {
    if (injectOptions) {
      resolveInjections(injectOptions, ctx, checkDuplicateProperties);
    }
  }
  {
    initInjections();
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key);
        }
      } else {
        warn$1(
          `Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`
        );
      }
    }
  }
  if (dataOptions) {
    if (!isFunction(dataOptions)) {
      warn$1(
        `The data option must be a function. Plain object usage is no longer supported.`
      );
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise(data)) {
      warn$1(
        `data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`
      );
    }
    if (!isObject(data)) {
      warn$1(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn$1(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
        warn$1(
          `Write operation failed: computed property "${key}" is readonly.`
        );
      };
      const c2 = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c2.value,
        set: (v) => c2.value = v
      });
      {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  function initProvides() {
    if (provideOptions) {
      const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
  }
  {
    initProvides();
  }
  {
    if (created) {
      callHook$1(created, instance, "c");
    }
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val2) => publicThis[key] = val2
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
  if (instance.ctx.$onApplyOptions) {
    instance.ctx.$onApplyOptions(options, instance, publicThis);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v) => injected.value = v
      });
    } else {
      ctx[key] = injected;
    }
    {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else {
      warn$1(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject(raw)) {
    if (isArray(raw)) {
      raw.forEach((r2) => createWatcher(r2, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else {
        warn$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn$1(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m2) => mergeOptions(resolved, m2, optionMergeStrategies, true)
      );
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m2) => mergeOptions(to, m2, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn$1(
        `"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`
      );
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray$1,
  created: mergeAsArray$1,
  beforeMount: mergeAsArray$1,
  mounted: mergeAsArray$1,
  beforeUpdate: mergeAsArray$1,
  updated: mergeAsArray$1,
  beforeDestroy: mergeAsArray$1,
  beforeUnmount: mergeAsArray$1,
  destroyed: mergeAsArray$1,
  unmounted: mergeAsArray$1,
  activated: mergeAsArray$1,
  deactivated: mergeAsArray$1,
  errorCaptured: mergeAsArray$1,
  serverPrefetch: mergeAsArray$1,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction(to) ? to.call(this, this) : to,
      isFunction(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray$1(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray(to) && isArray(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray$1(to[key], from[key]);
  }
  return merged;
}
function initProps$1(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext(instance) {
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !isInHmrContext() && (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = normalizeInheritAttrsValue(instance, key, value);
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue$1(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = normalizeInheritAttrsValue(instance, key, value);
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue$1(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          {
            props[camelKey] = value;
          }
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = normalizeInheritAttrsValue(instance, key, value);
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue$1(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function normalizeInheritAttrsValue(instance, key, value) {
  return value;
}
function resolvePropValue$1(options, props, key, value, instance, isAbsent) {
  const result = _resolvePropValue(
    options,
    props,
    key,
    value,
    instance,
    isAbsent
  );
  return result;
}
function _resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          const reset = setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props
          );
          reset();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i = 0; i < raw.length; i++) {
      if (!isString(raw[i])) {
        warn$1(`props must be strings when using array syntax.`, raw[i]);
      }
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject(raw)) {
      warn$1(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$" && !isReservedProp(key)) {
    return true;
  } else {
    warn$1(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType$1(ctor) {
  if (ctor === null) {
    return "null";
  }
  if (typeof ctor === "function") {
    return ctor.name || "";
  } else if (typeof ctor === "object") {
    const name = ctor.constructor && ctor.constructor.name;
    return name || "";
  }
  return "";
}
function isSameType(a, b) {
  return getType$1(a) === getType$1(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp$1(
      key,
      resolvedValues[key],
      opt,
      shallowReadonly(resolvedValues),
      !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key))
    );
  }
}
function validateProp$1(name, value, prop, props, isAbsent) {
  const { type, required, validator, skipCheck } = prop;
  if (required && isAbsent) {
    warn$1('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !required) {
    return;
  }
  if (type != null && type !== true && !skipCheck) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType$1(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn$1(getInvalidTypeMessage$1(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value, props)) {
    warn$1('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType$1 = /* @__PURE__ */ makeMap(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function assertType$1(value, type) {
  let valid;
  const expectedType = getType$1(type);
  if (isSimpleType$1(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage$1(name, value, expectedTypes) {
  if (expectedTypes.length === 0) {
    return `Prop type [] for prop "${name}" won't match anything. Did you mean to use type Array instead?`;
  }
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue$1(value, expectedType);
  const receivedValue = styleValue$1(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable$1(expectedType) && !isBoolean$1(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable$1(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue$1(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable$1(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean$1(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
let supported;
let perf;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type}-${instance.uid}`);
  }
  {
    devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf.mark(endTag);
    perf.measure(
      `<${formatComponentName(instance, instance.type)}> ${type}`,
      startTag,
      endTag
    );
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
  {
    devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function isSupported() {
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  return supported;
}
const queuePostRenderEffect$1 = queuePostFlushCb;
const Fragment = Symbol.for("v-fgt");
const Text = Symbol.for("v-txt");
const Comment = Symbol.for("v-cmt");
const Static = Symbol.for("v-stc");
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null,
    // fixed by xxxxxx 用于存储uni-app的元素缓存
    $uniElements: /* @__PURE__ */ new Map(),
    $templateUniElementRefs: [],
    $templateUniElementStyles: {},
    $eS: {},
    $eA: {}
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
let internalSetCurrentInstance;
let setInSSRSetupState;
{
  internalSetCurrentInstance = (i) => {
    currentInstance = i;
  };
  setInSSRSetupState = (v) => {
    isInSSRComponentSetup = v;
  };
}
const setCurrentInstance = (instance) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, { isNativeTag }) {
  if (isBuiltInTag(name) || isNativeTag(name)) {
    warn$1(
      "Do not use built-in or reserved HTML elements as component id: " + name
    );
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isSSR && setInSSRSetupState(isSSR);
  const {
    props
    /*, children*/
  } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps$1(instance, props, isStateful, isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component2 = instance.type;
  {
    if (Component2.name) {
      validateComponentName(Component2.name, instance.appContext.config);
    }
    if (Component2.components) {
      const names = Object.keys(Component2.components);
      for (let i = 0; i < names.length; i++) {
        validateComponentName(names[i], instance.appContext.config);
      }
    }
    if (Component2.directives) {
      const names = Object.keys(Component2.directives);
      for (let i = 0; i < names.length; i++) {
        validateDirectiveName(names[i]);
      }
    }
    if (Component2.compilerOptions && isRuntimeOnly()) {
      warn$1(
        `"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`
      );
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component2;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    const reset = setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [
        shallowReadonly(instance.props),
        setupContext
      ]
    );
    resetTracking();
    reset();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      {
        warn$1(
          `setup() returned a Promise, but the version of Vue you are using does not support it yet.`
        );
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    if (isVNode(setupResult)) {
      warn$1(
        `setup() should not return VNodes directly - return a render function instead.`
      );
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn$1(
      `setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`
    );
  }
  finishComponentSetup(instance, isSSR);
}
let compile;
const isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component2 = instance.type;
  if (!instance.render) {
    instance.render = Component2.render || NOOP;
  }
  {
    const reset = setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions$1(instance);
    } finally {
      resetTracking();
      reset();
    }
  }
  if (!Component2.render && instance.render === NOOP && !isSSR) {
    if (Component2.template) {
      warn$1(
        `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
      );
    } else {
      warn$1(`Component is missing template or render function.`);
    }
  }
}
function getAttrsProxy(instance) {
  return instance.attrsProxy || (instance.attrsProxy = new Proxy(
    instance.attrs,
    {
      get(target, key) {
        track(instance, "get", "$attrs");
        return target[key];
      },
      set() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      }
    }
  ));
}
function getSlotsProxy(instance) {
  return instance.slotsProxy || (instance.slotsProxy = new Proxy(instance.slots, {
    get(target, key) {
      track(instance, "get", "$slots");
      return target[key];
    }
  }));
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    {
      if (instance.exposed) {
        warn$1(`expose() should be called only once per setup().`);
      }
      if (exposed != null) {
        let exposedType = typeof exposed;
        if (exposedType === "object") {
          if (isArray(exposed)) {
            exposedType = "array";
          } else if (isRef(exposed)) {
            exposedType = "ref";
          }
        }
        if (exposedType !== "object") {
          warn$1(
            `expose() should be passed a plain object, received ${exposedType}.`
          );
        }
      }
    }
    instance.exposed = exposed || {};
  };
  {
    return Object.freeze({
      get attrs() {
        return getAttrsProxy(instance);
      },
      get slots() {
        return getSlotsProxy(instance);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        }
        return instance.proxy[key];
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c2) => c2.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component2, includeInferred = true) {
  return isFunction(Component2) ? Component2.displayName || Component2.name : Component2.name || includeInferred && Component2.__name;
}
function formatComponentName(instance, Component2, isRoot = false) {
  let name = getComponentName(Component2);
  if (!name && Component2.__file) {
    const match = Component2.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component2) {
          return key;
        }
      }
    };
    name = inferFromRegistry(
      instance.components || instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
const computed = (getterOrOptions, debugOptions) => {
  const c2 = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  {
    const i = getCurrentInstance();
    if (i && i.appContext.config.warnRecursiveComputed) {
      c2._warnRecursive = true;
    }
  }
  return c2;
};
const version = "3.4.21";
const warn = warn$1;
function unwrapper(target) {
  return unref(target);
}
const ARRAYTYPE = "[object Array]";
const OBJECTTYPE = "[object Object]";
function diff(current, pre) {
  const result = {};
  syncKeys(current, pre);
  _diff(current, pre, "", result);
  return result;
}
function syncKeys(current, pre) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
    for (let key in pre) {
      const currentValue = current[key];
      if (currentValue === void 0) {
        current[key] = null;
      } else {
        syncKeys(currentValue, pre[key]);
      }
    }
  } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
    if (current.length >= pre.length) {
      pre.forEach((item, index2) => {
        syncKeys(current[index2], item);
      });
    }
  }
}
function _diff(current, pre, path, result) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE) {
    if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
      setResult(result, path, current);
    } else {
      for (let key in current) {
        const currentValue = unwrapper(current[key]);
        const preValue = pre[key];
        const currentType = toTypeString(currentValue);
        const preType = toTypeString(preValue);
        if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
          if (currentValue != preValue) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key,
              currentValue
            );
          }
        } else if (currentType == ARRAYTYPE) {
          if (preType != ARRAYTYPE) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key,
              currentValue
            );
          } else {
            if (currentValue.length < preValue.length) {
              setResult(
                result,
                (path == "" ? "" : path + ".") + key,
                currentValue
              );
            } else {
              currentValue.forEach((item, index2) => {
                _diff(
                  item,
                  preValue[index2],
                  (path == "" ? "" : path + ".") + key + "[" + index2 + "]",
                  result
                );
              });
            }
          }
        } else if (currentType == OBJECTTYPE) {
          if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key,
              currentValue
            );
          } else {
            for (let subKey in currentValue) {
              _diff(
                currentValue[subKey],
                preValue[subKey],
                (path == "" ? "" : path + ".") + key + "." + subKey,
                result
              );
            }
          }
        }
      }
    }
  } else if (rootCurrentType == ARRAYTYPE) {
    if (rootPreType != ARRAYTYPE) {
      setResult(result, path, current);
    } else {
      if (current.length < pre.length) {
        setResult(result, path, current);
      } else {
        current.forEach((item, index2) => {
          _diff(item, pre[index2], path + "[" + index2 + "]", result);
        });
      }
    }
  } else {
    setResult(result, path, current);
  }
}
function setResult(result, k, v) {
  result[k] = v;
}
function hasComponentEffect(instance) {
  return queue$1.includes(instance.update);
}
function flushCallbacks(instance) {
  const ctx = instance.ctx;
  const callbacks = ctx.__next_tick_callbacks;
  if (callbacks && callbacks.length) {
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }
}
function nextTick(instance, fn) {
  const ctx = instance.ctx;
  if (!ctx.__next_tick_pending && !hasComponentEffect(instance)) {
    return nextTick$1(fn && fn.bind(instance.proxy));
  }
  let _resolve;
  if (!ctx.__next_tick_callbacks) {
    ctx.__next_tick_callbacks = [];
  }
  ctx.__next_tick_callbacks.push(() => {
    if (fn) {
      callWithErrorHandling(
        fn.bind(instance.proxy),
        instance,
        14
      );
    } else if (_resolve) {
      _resolve(instance.proxy);
    }
  });
  return new Promise((resolve2) => {
    _resolve = resolve2;
  });
}
function clone(src, seen) {
  src = unwrapper(src);
  const type = typeof src;
  if (type === "object" && src !== null) {
    let copy = seen.get(src);
    if (typeof copy !== "undefined") {
      return copy;
    }
    if (isArray(src)) {
      const len = src.length;
      copy = new Array(len);
      seen.set(src, copy);
      for (let i = 0; i < len; i++) {
        copy[i] = clone(src[i], seen);
      }
    } else {
      copy = {};
      seen.set(src, copy);
      for (const name in src) {
        if (hasOwn(src, name)) {
          copy[name] = clone(src[name], seen);
        }
      }
    }
    return copy;
  }
  if (type !== "symbol") {
    return src;
  }
}
function deepCopy(src) {
  return clone(src, typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : /* @__PURE__ */ new Map());
}
function getMPInstanceData(instance, keys) {
  const data = instance.data;
  const ret = /* @__PURE__ */ Object.create(null);
  keys.forEach((key) => {
    ret[key] = data[key];
  });
  return ret;
}
function patch(instance, data, oldData) {
  if (!data) {
    return;
  }
  data = deepCopy(data);
  data.$eS = instance.$eS || {};
  data.$eA = instance.$eA || {};
  const ctx = instance.ctx;
  const mpType = ctx.mpType;
  if (mpType === "page" || mpType === "component") {
    data.r0 = 1;
    const mpInstance = ctx.$scope;
    const keys = Object.keys(data);
    const diffData = diff(data, oldData || getMPInstanceData(mpInstance, keys));
    if (Object.keys(diffData).length) {
      ctx.__next_tick_pending = true;
      mpInstance.setData(diffData, () => {
        ctx.__next_tick_pending = false;
        flushCallbacks(instance);
      });
      flushPreFlushCbs();
    } else {
      flushCallbacks(instance);
    }
  }
}
function initAppConfig(appConfig) {
  appConfig.globalProperties.$nextTick = function $nextTick(fn) {
    return nextTick(this.$, fn);
  };
}
function onApplyOptions(options, instance, publicThis) {
  instance.appContext.config.globalProperties.$applyOptions(
    options,
    instance,
    publicThis
  );
  const computedOptions = options.computed;
  if (computedOptions) {
    const keys = Object.keys(computedOptions);
    if (keys.length) {
      const ctx = instance.ctx;
      if (!ctx.$computedKeys) {
        ctx.$computedKeys = [];
      }
      ctx.$computedKeys.push(...keys);
    }
  }
  delete instance.ctx.$onApplyOptions;
}
function setRef$1(instance, isUnmount = false) {
  const {
    setupState,
    $templateRefs,
    $templateUniElementRefs,
    ctx: { $scope, $mpPlatform }
  } = instance;
  if (!$scope || !$templateRefs && !$templateUniElementRefs) {
    return;
  }
  if (isUnmount) {
    if ($mpPlatform !== "mp-alipay") {
      $templateRefs && $templateRefs.forEach(
        (templateRef) => setTemplateRef(templateRef, null, setupState)
      );
    }
    $templateUniElementRefs && $templateUniElementRefs.forEach(
      (templateRef) => setTemplateRef(templateRef, null, setupState)
    );
    return;
  }
  const check = $mpPlatform === "mp-baidu" || $mpPlatform === "mp-toutiao";
  const doSetByRefs = (refs) => {
    if (refs.length === 0) {
      return [];
    }
    const mpComponents = (
      // 字节小程序 selectAllComponents 可能返回 null
      // https://github.com/dcloudio/uni-app/issues/3954
      ($scope.selectAllComponents(".r") || []).concat(
        $scope.selectAllComponents(".r-i-f") || []
      )
    );
    return refs.filter((templateRef) => {
      const refValue = findComponentPublicInstance(mpComponents, templateRef.i);
      if (check && refValue === null) {
        return true;
      }
      setTemplateRef(templateRef, refValue, setupState);
      return false;
    });
  };
  const doSet = () => {
    if ($templateRefs) {
      const refs = doSetByRefs($templateRefs);
      if (refs.length && instance.proxy && instance.proxy.$scope) {
        instance.proxy.$scope.setData({ r1: 1 }, () => {
          doSetByRefs(refs);
        });
      }
    }
  };
  if ($mpPlatform !== "mp-alipay") {
    if ($scope._$setRef) {
      $scope._$setRef(doSet);
    } else {
      nextTick(instance, doSet);
    }
  }
  if ($templateUniElementRefs && $templateUniElementRefs.length) {
    nextTick(instance, () => {
      $templateUniElementRefs.forEach((templateRef) => {
        if (isArray(templateRef.v)) {
          templateRef.v.forEach((v) => {
            setTemplateRef(templateRef, v, setupState);
          });
        } else {
          setTemplateRef(templateRef, templateRef.v, setupState);
        }
      });
    });
  }
}
function toSkip(value) {
  if (isObject(value)) {
    markRaw(value);
  }
  return value;
}
function findComponentPublicInstance(mpComponents, id) {
  const mpInstance = mpComponents.find(
    (com) => com && (com.properties || com.props).uI === id
  );
  if (mpInstance) {
    const vm = mpInstance.$vm;
    if (vm) {
      return getExposeProxy(vm.$) || vm;
    }
    return toSkip(mpInstance);
  }
  return null;
}
function setTemplateRef({ r: r2, f: f2 }, refValue, setupState) {
  if (isFunction(r2)) {
    r2(refValue, {});
  } else {
    const _isString = isString(r2);
    const _isRef = isRef(r2);
    if (_isString || _isRef) {
      if (f2) {
        if (!_isRef) {
          return;
        }
        if (!isArray(r2.value)) {
          r2.value = [];
        }
        const existing = r2.value;
        if (existing.indexOf(refValue) === -1) {
          existing.push(refValue);
          if (!refValue) {
            return;
          }
          if (refValue.$) {
            onBeforeUnmount(() => remove(existing, refValue), refValue.$);
          }
        }
      } else if (_isString) {
        if (hasOwn(setupState, r2)) {
          setupState[r2] = refValue;
        }
      } else if (isRef(r2)) {
        r2.value = refValue;
      } else {
        warnRef(r2);
      }
    } else {
      warnRef(r2);
    }
  }
}
function warnRef(ref2) {
  warn("Invalid template ref type:", ref2, `(${typeof ref2})`);
}
const queuePostRenderEffect = queuePostFlushCb;
function mountComponent(initialVNode, options) {
  const instance = initialVNode.component = createComponentInstance(initialVNode, options.parentComponent, null);
  instance.renderer = options.mpType ? options.mpType : "component";
  {
    instance.ctx.$onApplyOptions = onApplyOptions;
    instance.ctx.$children = [];
  }
  if (options.mpType === "app") {
    instance.render = NOOP;
  }
  if (options.onBeforeSetup) {
    options.onBeforeSetup(instance, options);
  }
  {
    pushWarningContext(initialVNode);
    startMeasure(instance, `mount`);
  }
  {
    startMeasure(instance, `init`);
  }
  setupComponent(instance);
  {
    endMeasure(instance, `init`);
  }
  {
    if (options.parentComponent && instance.proxy) {
      options.parentComponent.ctx.$children.push(getExposeProxy(instance) || instance.proxy);
    }
  }
  setupRenderEffect(instance);
  {
    popWarningContext();
    endMeasure(instance, `mount`);
  }
  return instance.proxy;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
function clearTemplateRefs(templateRefs) {
  if (!templateRefs) {
    return [];
  }
  return templateRefs.filter((templateRef) => {
    const v = templateRef.v;
    if (v && typeof v === "object" && ["UNI-LOADING-ELEMENT", "UNI-CLOUD-DB-ELEMENT"].includes(v.nodeName)) {
      return true;
    }
    return false;
  });
}
function renderComponentRoot(instance) {
  const {
    type: Component2,
    vnode,
    proxy,
    withProxy,
    props,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render,
    renderCache,
    data,
    setupState,
    ctx,
    uid: uid2,
    appContext: {
      app: {
        config: {
          globalProperties: { pruneComponentPropsCache: pruneComponentPropsCache2 }
        }
      }
    },
    inheritAttrs
  } = instance;
  instance.$uniElementIds = /* @__PURE__ */ new Map();
  instance.$templateRefs = clearTemplateRefs(
    instance.$templateRefs || []
  );
  instance.$templateUniElementRefs = clearTemplateRefs(
    instance.$templateUniElementRefs || []
  );
  instance.$templateUniElementStyles = {};
  instance.$ei = 0;
  pruneComponentPropsCache2(uid2);
  instance.__counter = instance.__counter === 0 ? 1 : 0;
  let result;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      fallthroughAttrs(inheritAttrs, props, propsOptions, attrs);
      const proxyToUse = withProxy || proxy;
      result = render.call(
        proxyToUse,
        proxyToUse,
        renderCache,
        props,
        setupState,
        data,
        ctx
      );
    } else {
      fallthroughAttrs(
        inheritAttrs,
        props,
        propsOptions,
        Component2.props ? attrs : getFunctionalFallthrough(attrs)
      );
      const render2 = Component2;
      result = render2.length > 1 ? render2(props, { attrs, slots, emit: emit2 }) : render2(
        props,
        null
        /* we know it doesn't need it */
      );
    }
  } catch (err) {
    handleError(err, instance, 1);
    result = false;
  }
  setRef$1(instance);
  setCurrentRenderingInstance(prev);
  return result;
}
function fallthroughAttrs(inheritAttrs, props, propsOptions, fallthroughAttrs2) {
  if (props && fallthroughAttrs2 && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs2).filter(
      (key) => key !== "class" && key !== "style"
    );
    if (!keys.length) {
      return;
    }
    if (propsOptions && keys.some(isModelListener)) {
      keys.forEach((key) => {
        if (!isModelListener(key) || !(key.slice(9) in propsOptions)) {
          props[key] = fallthroughAttrs2[key];
        }
      });
    } else {
      keys.forEach((key) => props[key] = fallthroughAttrs2[key]);
    }
  }
}
const updateComponentPreRender = (instance) => {
  pauseTracking();
  flushPreFlushCbs();
  resetTracking();
};
function componentUpdateScopedSlotsFn() {
  const scopedSlotsData = this.$scopedSlotsData;
  if (!scopedSlotsData || scopedSlotsData.length === 0) {
    return;
  }
  const mpInstance = this.ctx.$scope;
  const oldData = mpInstance.data;
  const diffData = /* @__PURE__ */ Object.create(null);
  scopedSlotsData.forEach(({ path, index: index2, data }) => {
    const oldScopedSlotData = getValueByDataPath(oldData, path);
    const diffPath = isString(index2) ? `${path}.${index2}` : `${path}[${index2}]`;
    if (typeof oldScopedSlotData === "undefined" || typeof oldScopedSlotData[index2] === "undefined") {
      diffData[diffPath] = data;
    } else {
      const diffScopedSlotData = diff(
        data,
        oldScopedSlotData[index2]
      );
      Object.keys(diffScopedSlotData).forEach((name) => {
        diffData[diffPath + "." + name] = diffScopedSlotData[name];
      });
    }
  });
  scopedSlotsData.length = 0;
  if (Object.keys(diffData).length) {
    mpInstance.setData(diffData);
  }
}
function toggleRecurse({ effect: effect2, update }, allowed) {
  effect2.allowRecurse = update.allowRecurse = allowed;
}
function setupRenderEffect(instance) {
  const updateScopedSlots = componentUpdateScopedSlotsFn.bind(
    instance
  );
  instance.$updateScopedSlots = () => nextTick$1(() => queueJob(updateScopedSlots));
  const componentUpdateFn = () => {
    if (!instance.isMounted) {
      onBeforeUnmount(() => {
        setRef$1(instance, true);
      }, instance);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      {
        devtoolsComponentAdded(instance);
      }
    } else {
      const { next, bu, u } = instance;
      {
        pushWarningContext(next || instance.vnode);
      }
      toggleRecurse(instance, false);
      updateComponentPreRender();
      if (bu) {
        invokeArrayFns$1(bu);
      }
      toggleRecurse(instance, true);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      if (u) {
        queuePostRenderEffect(u);
      }
      {
        devtoolsComponentUpdated(instance);
      }
      {
        popWarningContext();
      }
    }
  };
  const effect2 = instance.effect = new ReactiveEffect(
    componentUpdateFn,
    NOOP,
    () => queueJob(update),
    instance.scope
    // track it in component's effect scope
  );
  const update = instance.update = () => {
    if (effect2.dirty) {
      effect2.run();
    }
  };
  update.id = instance.uid;
  toggleRecurse(instance, true);
  {
    effect2.onTrack = instance.rtc ? (e2) => invokeArrayFns$1(instance.rtc, e2) : void 0;
    effect2.onTrigger = instance.rtg ? (e2) => invokeArrayFns$1(instance.rtg, e2) : void 0;
    update.ownerInstance = instance;
  }
  {
    update();
  }
}
function unmountComponent(instance) {
  const { bum, scope, update, um } = instance;
  if (bum) {
    invokeArrayFns$1(bum);
  }
  {
    const parentInstance = instance.parent;
    if (parentInstance) {
      const $children = parentInstance.ctx.$children;
      const target = getExposeProxy(instance) || instance.proxy;
      const index2 = $children.indexOf(target);
      if (index2 > -1) {
        $children.splice(index2, 1);
      }
    }
  }
  scope.stop();
  if (update) {
    update.active = false;
  }
  if (um) {
    queuePostRenderEffect(um);
  }
  queuePostRenderEffect(() => {
    instance.isUnmounted = true;
  });
  {
    devtoolsComponentRemoved(instance);
  }
}
const oldCreateApp = createAppAPI();
function getTarget() {
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof my !== "undefined") {
    return my;
  }
}
function createVueApp(rootComponent, rootProps = null) {
  const target = getTarget();
  target.__VUE__ = true;
  {
    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const app = oldCreateApp(rootComponent, rootProps);
  const appContext = app._context;
  initAppConfig(appContext.config);
  const createVNode2 = (initialVNode) => {
    initialVNode.appContext = appContext;
    initialVNode.shapeFlag = 6;
    return initialVNode;
  };
  const createComponent2 = function createComponent22(initialVNode, options) {
    return mountComponent(createVNode2(initialVNode), options);
  };
  const destroyComponent = function destroyComponent2(component) {
    return component && unmountComponent(component.$);
  };
  app.mount = function mount() {
    rootComponent.render = NOOP;
    const instance = mountComponent(
      createVNode2({ type: rootComponent }),
      {
        mpType: "app",
        mpInstance: null,
        parentComponent: null,
        slots: [],
        props: null
      }
    );
    app._instance = instance.$;
    {
      devtoolsInitApp(app, version);
    }
    instance.$app = app;
    instance.$createComponent = createComponent2;
    instance.$destroyComponent = destroyComponent;
    appContext.$appInstance = instance;
    return instance;
  };
  app.unmount = function unmount() {
    warn(`Cannot unmount an app.`);
  };
  return app;
}
function injectLifecycleHook(name, hook, publicThis, instance) {
  if (isFunction(hook)) {
    injectHook(name, hook.bind(publicThis), instance);
  }
}
function initHooks$1(options, instance, publicThis) {
  const mpType = options.mpType || publicThis.$mpType;
  if (!mpType || mpType === "component" || // instance.renderer 标识页面是否作为组件渲染
  mpType === "page" && instance.renderer === "component") {
    return;
  }
  Object.keys(options).forEach((name) => {
    if (isUniLifecycleHook(name, options[name], false)) {
      const hooks = options[name];
      if (isArray(hooks)) {
        hooks.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance));
      } else {
        injectLifecycleHook(name, hooks, publicThis, instance);
      }
    }
  });
}
function applyOptions$2(options, instance, publicThis) {
  initHooks$1(options, instance, publicThis);
}
function set(target, key, val2) {
  return target[key] = val2;
}
function $callMethod(method, ...args) {
  const fn = this[method];
  if (fn) {
    return fn(...args);
  }
  console.error(`method ${method} not found`);
  return null;
}
function createErrorHandler(app) {
  const userErrorHandler = app.config.errorHandler;
  return function errorHandler(err, instance, info) {
    if (userErrorHandler) {
      userErrorHandler(err, instance, info);
    }
    const appInstance = app._instance;
    if (!appInstance || !appInstance.proxy) {
      throw err;
    }
    if (appInstance[ON_ERROR]) {
      {
        appInstance.proxy.$callHook(ON_ERROR, err);
      }
    } else {
      logError(err, info, instance ? instance.$.vnode : null, false);
    }
  };
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function initOptionMergeStrategies(optionMergeStrategies) {
  UniLifecycleHooks.forEach((name) => {
    optionMergeStrategies[name] = mergeAsArray;
  });
}
let realAtob;
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== "function") {
  realAtob = function(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, "");
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }
    str += "==".slice(2 - (str.length & 3));
    var bitmap;
    var result = "";
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length; ) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split("").map(function(c2) {
    return "%" + ("00" + c2.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}
function getCurrentUserInfo() {
  const token = index.getStorageSync("uni_id_token") || "";
  const tokenArr = token.split(".");
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  let userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1e3;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(globalProperties) {
  globalProperties.uniIDHasRole = function(roleId) {
    const { role } = getCurrentUserInfo();
    return role.indexOf(roleId) > -1;
  };
  globalProperties.uniIDHasPermission = function(permissionId) {
    const { permission } = getCurrentUserInfo();
    return this.uniIDHasRole("admin") || permission.indexOf(permissionId) > -1;
  };
  globalProperties.uniIDTokenValid = function() {
    const { tokenExpired } = getCurrentUserInfo();
    return tokenExpired > Date.now();
  };
}
function initApp(app) {
  const appConfig = app.config;
  appConfig.errorHandler = invokeCreateErrorHandler(app, createErrorHandler);
  initOptionMergeStrategies(appConfig.optionMergeStrategies);
  const globalProperties = appConfig.globalProperties;
  {
    uniIdMixin(globalProperties);
  }
  {
    globalProperties.$set = set;
    globalProperties.$applyOptions = applyOptions$2;
    globalProperties.$callMethod = $callMethod;
  }
  {
    index.invokeCreateVueAppHook(app);
  }
}
const propsCaches = /* @__PURE__ */ Object.create(null);
function pruneComponentPropsCache(uid2) {
  delete propsCaches[uid2];
}
function findComponentPropsData(up) {
  if (!up) {
    return;
  }
  const [uid2, propsId] = up.split(",");
  if (!propsCaches[uid2]) {
    return;
  }
  return propsCaches[uid2][parseInt(propsId)];
}
var plugin = {
  install(app) {
    initApp(app);
    app.config.globalProperties.pruneComponentPropsCache = pruneComponentPropsCache;
    const oldMount = app.mount;
    app.mount = function mount(rootContainer) {
      const instance = oldMount.call(app, rootContainer);
      const createApp2 = getCreateApp();
      if (createApp2) {
        createApp2(instance);
      } else {
        if (typeof createMiniProgramApp !== "undefined") {
          createMiniProgramApp(instance);
        }
      }
      return instance;
    };
  }
};
function getCreateApp() {
  const method = "createApp";
  if (typeof global !== "undefined" && typeof global[method] !== "undefined") {
    return global[method];
  } else if (typeof my !== "undefined") {
    return my[method];
  }
}
function vOn(value, key) {
  const instance = getCurrentInstance();
  const ctx = instance.ctx;
  const extraKey = typeof key !== "undefined" && (ctx.$mpPlatform === "mp-weixin" || ctx.$mpPlatform === "mp-qq" || ctx.$mpPlatform === "mp-xhs") && (isString(key) || typeof key === "number") ? "_" + key : "";
  const name = "e" + instance.$ei++ + extraKey;
  const mpInstance = ctx.$scope;
  if (!value) {
    delete mpInstance[name];
    return name;
  }
  const existingInvoker = mpInstance[name];
  if (existingInvoker) {
    existingInvoker.value = value;
  } else {
    mpInstance[name] = createInvoker(value, instance);
  }
  return name;
}
function createInvoker(initialValue, instance) {
  const invoker = (e2) => {
    patchMPEvent(e2);
    let args = [e2];
    if (instance && instance.ctx.$getTriggerEventDetail) {
      if (typeof e2.detail === "number") {
        e2.detail = instance.ctx.$getTriggerEventDetail(e2.detail);
      }
    }
    if (e2.detail && e2.detail.__args__) {
      args = e2.detail.__args__;
    }
    const eventValue = invoker.value;
    const invoke = () => callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, eventValue), instance, 5, args);
    const eventTarget = e2.target;
    const eventSync = eventTarget ? eventTarget.dataset ? String(eventTarget.dataset.eventsync) === "true" : false : false;
    if (bubbles.includes(e2.type) && !eventSync) {
      setTimeout(invoke);
    } else {
      const res = invoke();
      if (e2.type === "input" && (isArray(res) || isPromise(res))) {
        return;
      }
      return res;
    }
  };
  invoker.value = initialValue;
  return invoker;
}
const bubbles = [
  // touch事件暂不做延迟，否则在 Android 上会影响性能，比如一些拖拽跟手手势等
  // 'touchstart',
  // 'touchmove',
  // 'touchcancel',
  // 'touchend',
  "tap",
  "longpress",
  "longtap",
  "transitionend",
  "animationstart",
  "animationiteration",
  "animationend",
  "touchforcechange"
];
function patchMPEvent(event, instance) {
  if (event.type && event.target) {
    event.preventDefault = NOOP;
    event.stopPropagation = NOOP;
    event.stopImmediatePropagation = NOOP;
    if (!hasOwn(event, "detail")) {
      event.detail = {};
    }
    if (hasOwn(event, "markerId")) {
      event.detail = typeof event.detail === "object" ? event.detail : {};
      event.detail.markerId = event.markerId;
    }
    if (isPlainObject(event.detail) && hasOwn(event.detail, "checked") && !hasOwn(event.detail, "value")) {
      event.detail.value = event.detail.checked;
    }
    if (isPlainObject(event.detail)) {
      event.target = extend({}, event.target, event.detail);
    }
  }
}
function patchStopImmediatePropagation(e2, value) {
  if (isArray(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop && originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e3) => !e3._stopped && fn(e3));
  } else {
    return value;
  }
}
function vFor(source, renderItem) {
  let ret;
  if (isArray(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, i);
    }
  } else if (typeof source === "number") {
    if (!Number.isInteger(source)) {
      warn(`The v-for range expect an integer value but got ${source}.`);
      return [];
    }
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, i);
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i) => renderItem(item, i, i));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
const o = (value, key) => vOn(value, key);
const f = (source, renderItem) => vFor(source, renderItem);
const e = (target, ...sources) => extend(target, ...sources);
const t = (val2) => toDisplayString(val2);
function createApp$1(rootComponent, rootProps = null) {
  rootComponent && (rootComponent.mpType = "app");
  return createVueApp(rootComponent, rootProps).use(plugin);
}
const createSSRApp = createApp$1;
function getLocaleLanguage$1() {
  var _a;
  let localeLanguage = "";
  {
    const appBaseInfo = ((_a = wx.getAppBaseInfo) === null || _a === void 0 ? void 0 : _a.call(wx)) || wx.getSystemInfoSync();
    const language = appBaseInfo && appBaseInfo.language ? appBaseInfo.language : LOCALE_EN;
    localeLanguage = normalizeLocale(language) || LOCALE_EN;
  }
  return localeLanguage;
}
function validateProtocolFail(name, msg) {
  console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
  if (!onFail) {
    onFail = validateProtocolFail;
  }
  for (const key in protocol) {
    const errMsg = validateProp(key, data[key], protocol[key], !hasOwn(data, key));
    if (isString(errMsg)) {
      onFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol, onFail) {
  if (!protocol) {
    return;
  }
  if (!isArray(protocol)) {
    return validateProtocol(name, args[0] || /* @__PURE__ */ Object.create(null), protocol, onFail);
  }
  const len = protocol.length;
  const argsLen = args.length;
  for (let i = 0; i < len; i++) {
    const opts = protocol[i];
    const data = /* @__PURE__ */ Object.create(null);
    if (argsLen > i) {
      data[opts.name] = args[i];
    }
    validateProtocol(name, data, { [opts.name]: opts }, onFail);
  }
}
function validateProp(name, value, prop, isAbsent) {
  if (!isPlainObject(prop)) {
    prop = { type: prop };
  }
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    return 'Missing required args: "' + name + '"';
  }
  if (value == null && !required) {
    return;
  }
  if (type != null) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      return getInvalidTypeMessage(name, value, expectedTypes);
    }
  }
  if (validator) {
    return validator(value);
  }
}
const isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol");
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else {
    {
      valid = value instanceof type;
    }
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(capitalize).join(", ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : "";
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function tryCatch(fn) {
  return function() {
    try {
      return fn.apply(fn, arguments);
    } catch (e2) {
      console.error(e2);
    }
  };
}
let invokeCallbackId = 1;
const invokeCallbacks = {};
function addInvokeCallback(id, name, callback, keepAlive = false) {
  invokeCallbacks[id] = {
    name,
    keepAlive,
    callback
  };
  return id;
}
function invokeCallback(id, res, extras) {
  if (typeof id === "number") {
    const opts = invokeCallbacks[id];
    if (opts) {
      if (!opts.keepAlive) {
        delete invokeCallbacks[id];
      }
      return opts.callback(res, extras);
    }
  }
  return res;
}
const API_SUCCESS = "success";
const API_FAIL = "fail";
const API_COMPLETE = "complete";
function getApiCallbacks(args) {
  const apiCallbacks = {};
  for (const name in args) {
    const fn = args[name];
    if (isFunction(fn)) {
      apiCallbacks[name] = tryCatch(fn);
      delete args[name];
    }
  }
  return apiCallbacks;
}
function normalizeErrMsg(errMsg, name) {
  if (!errMsg || errMsg.indexOf(":fail") === -1) {
    return name + ":ok";
  }
  return name + errMsg.substring(errMsg.indexOf(":fail"));
}
function createAsyncApiCallback(name, args = {}, { beforeAll, beforeSuccess } = {}) {
  if (!isPlainObject(args)) {
    args = {};
  }
  const { success, fail, complete } = getApiCallbacks(args);
  const hasSuccess = isFunction(success);
  const hasFail = isFunction(fail);
  const hasComplete = isFunction(complete);
  const callbackId = invokeCallbackId++;
  addInvokeCallback(callbackId, name, (res) => {
    res = res || {};
    res.errMsg = normalizeErrMsg(res.errMsg, name);
    isFunction(beforeAll) && beforeAll(res);
    if (res.errMsg === name + ":ok") {
      isFunction(beforeSuccess) && beforeSuccess(res, args);
      hasSuccess && success(res);
    } else {
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  return callbackId;
}
const HOOK_SUCCESS = "success";
const HOOK_FAIL = "fail";
const HOOK_COMPLETE = "complete";
const globalInterceptors = {};
const scopedInterceptors = {};
function wrapperHook(hook, params) {
  return function(data) {
    return hook(data, params) || data;
  };
}
function queue(hooks, data, params) {
  let promise = false;
  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      const res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then() {
          },
          catch() {
          }
        };
      }
    }
  }
  return promise || {
    then(callback) {
      return callback(data);
    },
    catch() {
    }
  };
}
function wrapperOptions(interceptors2, options = {}) {
  [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    const hooks = interceptors2[name];
    if (!isArray(hooks)) {
      return;
    }
    const oldCallback = options[name];
    options[name] = function callbackInterceptor(res) {
      queue(hooks, res, options).then((res2) => {
        return isFunction(oldCallback) && oldCallback(res2) || res2;
      });
    };
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  const returnValueHooks = [];
  if (isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  const interceptor = scopedInterceptors[method];
  if (interceptor && isArray(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue);
  }
  returnValueHooks.forEach((hook) => {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  const interceptor = /* @__PURE__ */ Object.create(null);
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== "returnValue") {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  const scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== "returnValue") {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options, params) {
  const interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (isArray(interceptor.invoke)) {
      const res = queue(interceptor.invoke, options);
      return res.then((options2) => {
        return api(wrapperOptions(getApiInterceptorHooks(method), options2), ...params);
      });
    } else {
      return api(wrapperOptions(interceptor, options), ...params);
    }
  }
  return api(options, ...params);
}
function hasCallback(args) {
  if (isPlainObject(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find((cb) => isFunction(args[cb]))) {
    return true;
  }
  return false;
}
function handlePromise(promise) {
  return promise;
}
function promisify$1(name, fn) {
  return (args = {}, ...rest) => {
    if (hasCallback(args)) {
      return wrapperReturnValue(name, invokeApi(name, fn, extend({}, args), rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve, reject) => {
      invokeApi(name, fn, extend({}, args, { success: resolve, fail: reject }), rest);
    })));
  };
}
function formatApiArgs(args, options) {
  args[0];
  {
    return;
  }
}
function invokeSuccess(id, name, res) {
  const result = {
    errMsg: name + ":ok"
  };
  return invokeCallback(id, extend(res || {}, result));
}
function invokeFail(id, name, errMsg, errRes = {}) {
  const errMsgPrefix = name + ":fail";
  let apiErrMsg = "";
  if (!errMsg) {
    apiErrMsg = errMsgPrefix;
  } else if (errMsg.indexOf(errMsgPrefix) === 0) {
    apiErrMsg = errMsg;
  } else {
    apiErrMsg = errMsgPrefix + " " + errMsg;
  }
  {
    delete errRes.errCode;
  }
  let res = extend({ errMsg: apiErrMsg }, errRes);
  return invokeCallback(id, res);
}
function beforeInvokeApi(name, args, protocol, options) {
  {
    validateProtocols(name, args, protocol);
  }
  const errMsg = formatApiArgs(args);
  if (errMsg) {
    return errMsg;
  }
}
function parseErrMsg(errMsg) {
  if (!errMsg || isString(errMsg)) {
    return errMsg;
  }
  if (errMsg.stack) {
    if (typeof globalThis === "undefined" || !globalThis.harmonyChannel) {
      console.error(errMsg.message + "\n" + errMsg.stack);
    }
    return errMsg.message;
  }
  return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options) {
  return (args) => {
    const id = createAsyncApiCallback(name, args, options);
    const errMsg = beforeInvokeApi(name, [args], protocol);
    if (errMsg) {
      return invokeFail(id, name, errMsg);
    }
    return fn(args, {
      resolve: (res) => invokeSuccess(id, name, res),
      reject: (errMsg2, errRes) => invokeFail(id, name, parseErrMsg(errMsg2), errRes)
    });
  };
}
function wrapperSyncApi(name, fn, protocol, options) {
  return (...args) => {
    const errMsg = beforeInvokeApi(name, args, protocol);
    if (errMsg) {
      throw new Error(errMsg);
    }
    return fn.apply(null, args);
  };
}
function wrapperAsyncApi(name, fn, protocol, options) {
  return wrapperTaskApi(name, fn, protocol, options);
}
function defineSyncApi(name, fn, protocol, options) {
  return wrapperSyncApi(name, fn, protocol);
}
function defineAsyncApi(name, fn, protocol, options) {
  return promisify$1(name, wrapperAsyncApi(name, fn, protocol, options));
}
const API_UPX2PX = "upx2px";
const Upx2pxProtocol = [
  {
    name: "upx",
    type: [Number, String],
    required: true
  }
];
const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;
function checkDeviceWidth() {
  var _a, _b;
  let windowWidth, pixelRatio, platform;
  {
    const windowInfo = ((_a = wx.getWindowInfo) === null || _a === void 0 ? void 0 : _a.call(wx)) || wx.getSystemInfoSync();
    const deviceInfo = ((_b = wx.getDeviceInfo) === null || _b === void 0 ? void 0 : _b.call(wx)) || wx.getSystemInfoSync();
    windowWidth = windowInfo.windowWidth;
    pixelRatio = windowInfo.pixelRatio;
    platform = deviceInfo.platform;
  }
  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === "ios";
}
const upx2px = defineSyncApi(API_UPX2PX, (number, newDeviceWidth) => {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  let width = newDeviceWidth || deviceWidth;
  let result = number / BASE_DEVICE_WIDTH * width;
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}, Upx2pxProtocol);
function __f__(type, filename, ...args) {
  if (filename) {
    args.push(filename);
  }
  console[type].apply(console, args);
}
const API_ADD_INTERCEPTOR = "addInterceptor";
const API_REMOVE_INTERCEPTOR = "removeInterceptor";
const AddInterceptorProtocol = [
  {
    name: "method",
    type: [String, Object],
    required: true
  }
];
const RemoveInterceptorProtocol = AddInterceptorProtocol;
function mergeInterceptorHook(interceptors2, interceptor) {
  Object.keys(interceptor).forEach((hook) => {
    if (isFunction(interceptor[hook])) {
      interceptors2[hook] = mergeHook(interceptors2[hook], interceptor[hook]);
    }
  });
}
function removeInterceptorHook(interceptors2, interceptor) {
  if (!interceptors2 || !interceptor) {
    return;
  }
  Object.keys(interceptor).forEach((name) => {
    const hooks = interceptors2[name];
    const hook = interceptor[name];
    if (isArray(hooks) && isFunction(hook)) {
      remove(hooks, hook);
    }
  });
}
function mergeHook(parentVal, childVal) {
  const res = childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  const res = [];
  for (let i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
const addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
  if (isString(method) && isPlainObject(interceptor)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}, AddInterceptorProtocol);
const removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
  if (isString(method)) {
    if (isPlainObject(interceptor)) {
      removeInterceptorHook(scopedInterceptors[method], interceptor);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}, RemoveInterceptorProtocol);
const interceptors = {};
const API_ON = "$on";
const OnProtocol = [
  {
    name: "event",
    type: String,
    required: true
  },
  {
    name: "callback",
    type: Function,
    required: true
  }
];
const API_ONCE = "$once";
const OnceProtocol = OnProtocol;
const API_OFF = "$off";
const OffProtocol = [
  {
    name: "event",
    type: [String, Array]
  },
  {
    name: "callback",
    type: [Function, Number]
  }
];
const API_EMIT = "$emit";
const EmitProtocol = [
  {
    name: "event",
    type: String,
    required: true
  }
];
class EventBus {
  constructor() {
    this.$emitter = new E$1();
  }
  on(name, callback) {
    return this.$emitter.on(name, callback);
  }
  once(name, callback) {
    return this.$emitter.once(name, callback);
  }
  off(name, callback) {
    if (!name) {
      this.$emitter.e = {};
      return;
    }
    this.$emitter.off(name, callback);
  }
  emit(name, ...args) {
    this.$emitter.emit(name, ...args);
  }
}
const eventBus = new EventBus();
const $on = defineSyncApi(API_ON, (name, callback) => {
  eventBus.on(name, callback);
  return () => eventBus.off(name, callback);
}, OnProtocol);
const $once = defineSyncApi(API_ONCE, (name, callback) => {
  eventBus.once(name, callback);
  return () => eventBus.off(name, callback);
}, OnceProtocol);
const $off = defineSyncApi(API_OFF, (name, callback) => {
  if (!isArray(name))
    name = name ? [name] : [];
  name.forEach((n) => {
    eventBus.off(n, callback);
  });
}, OffProtocol);
const $emit = defineSyncApi(API_EMIT, (name, ...args) => {
  eventBus.emit(name, ...args);
}, EmitProtocol);
let cid;
let cidErrMsg;
let enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e2) {
  }
  return message;
}
function invokePushCallback(args) {
  if (args.type === "enabled") {
    enabled = true;
  } else if (args.type === "clientId") {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === "pushMsg") {
    const message = {
      type: "receive",
      data: normalizePushMessage(args.message)
    };
    for (let i = 0; i < onPushMessageCallbacks.length; i++) {
      const callback = onPushMessageCallbacks[i];
      callback(message);
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === "click") {
    onPushMessageCallbacks.forEach((callback) => {
      callback({
        type: "click",
        data: normalizePushMessage(args.message)
      });
    });
  }
}
const getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid2, errMsg) {
  getPushCidCallbacks.forEach((callback) => {
    callback(cid2, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
const API_GET_PUSH_CLIENT_ID = "getPushClientId";
const getPushClientId = defineAsyncApi(API_GET_PUSH_CLIENT_ID, (_, { resolve, reject }) => {
  Promise.resolve().then(() => {
    if (typeof enabled === "undefined") {
      enabled = false;
      cid = "";
      cidErrMsg = "uniPush is not enabled";
    }
    getPushCidCallbacks.push((cid2, errMsg) => {
      if (cid2) {
        resolve({ cid: cid2 });
      } else {
        reject(errMsg);
      }
    });
    if (typeof cid !== "undefined") {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
});
const onPushMessageCallbacks = [];
const onPushMessage = (fn) => {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
const offPushMessage = (fn) => {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    const index2 = onPushMessageCallbacks.indexOf(fn);
    if (index2 > -1) {
      onPushMessageCallbacks.splice(index2, 1);
    }
  }
};
const SYNC_API_RE = /^\$|__f__|getLocale|setLocale|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|rpx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getDeviceInfo|getAppBaseInfo|getWindowInfo|getSystemSetting|getAppAuthorizeSetting/;
const CONTEXT_API_RE = /^create|Manager$/;
const CONTEXT_API_RE_EXC = ["createBLEConnection"];
const TASK_APIS = ["request", "downloadFile", "uploadFile", "connectSocket"];
const ASYNC_API = ["createBLEConnection"];
const CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== "onPush";
}
function isTaskApi(name) {
  return TASK_APIS.indexOf(name) !== -1;
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function(onfinally) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(onfinally && onfinally()).then(() => value), (reason) => promise.resolve(onfinally && onfinally()).then(() => {
      throw reason;
    }));
  };
}
function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  if (!isFunction(api)) {
    return api;
  }
  return function promiseApi(options = {}, ...rest) {
    if (isFunction(options.success) || isFunction(options.fail) || isFunction(options.complete)) {
      return wrapperReturnValue(name, invokeApi(name, api, extend({}, options), rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve, reject) => {
      invokeApi(name, api, extend({}, options, {
        success: resolve,
        fail: reject
      }), rest);
    })));
  };
}
const CALLBACKS = ["success", "fail", "cancel", "complete"];
function initWrapper(protocols2) {
  function processCallback(methodName, method, returnValue) {
    return function(res) {
      return method(processReturnValue(methodName, res, returnValue));
    };
  }
  function processArgs(methodName, fromArgs, argsOption = {}, returnValue = {}, keepFromArgs = false) {
    if (isPlainObject(fromArgs)) {
      const toArgs = keepFromArgs === true ? fromArgs : {};
      if (isFunction(argsOption)) {
        argsOption = argsOption(fromArgs, toArgs) || {};
      }
      for (const key in fromArgs) {
        if (hasOwn(argsOption, key)) {
          let keyOption = argsOption[key];
          if (isFunction(keyOption)) {
            keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
          }
          if (!keyOption) {
            console.warn(`微信小程序 ${methodName} 暂不支持 ${key}`);
          } else if (isString(keyOption)) {
            toArgs[keyOption] = fromArgs[key];
          } else if (isPlainObject(keyOption)) {
            toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
          }
        } else if (CALLBACKS.indexOf(key) !== -1) {
          const callback = fromArgs[key];
          if (isFunction(callback)) {
            toArgs[key] = processCallback(methodName, callback, returnValue);
          }
        } else {
          if (!keepFromArgs && !hasOwn(toArgs, key)) {
            toArgs[key] = fromArgs[key];
          }
        }
      }
      return toArgs;
    } else if (isFunction(fromArgs)) {
      if (isFunction(argsOption)) {
        argsOption(fromArgs, {});
      }
      fromArgs = processCallback(methodName, fromArgs, returnValue);
    }
    return fromArgs;
  }
  function processReturnValue(methodName, res, returnValue, keepReturnValue = false) {
    if (isFunction(protocols2.returnValue)) {
      res = protocols2.returnValue(methodName, res);
    }
    const realKeepReturnValue = keepReturnValue || false;
    return processArgs(methodName, res, returnValue, {}, realKeepReturnValue);
  }
  return function wrapper(methodName, method) {
    const hasProtocol = hasOwn(protocols2, methodName);
    if (!hasProtocol && typeof wx[methodName] !== "function") {
      return method;
    }
    const needWrapper = hasProtocol || isFunction(protocols2.returnValue) || isContextApi(methodName) || isTaskApi(methodName);
    const hasMethod = hasProtocol || isFunction(method);
    if (!hasProtocol && !method) {
      return function() {
        console.error(`微信小程序 暂不支持${methodName}`);
      };
    }
    if (!needWrapper || !hasMethod) {
      return method;
    }
    const protocol = protocols2[methodName];
    return function(arg1, arg2) {
      let options = protocol || {};
      if (isFunction(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      const args = [arg1];
      if (typeof arg2 !== "undefined") {
        args.push(arg2);
      }
      const returnValue = wx[options.name || methodName].apply(wx, args);
      if (isContextApi(methodName) || isTaskApi(methodName)) {
        if (returnValue && !returnValue.__v_skip) {
          returnValue.__v_skip = true;
        }
      }
      if (isSyncApi(methodName)) {
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  };
}
const getLocale = () => {
  const app = isFunction(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return getLocaleLanguage$1();
};
const setLocale = (locale) => {
  const app = isFunction(getApp) && getApp();
  if (!app) {
    return false;
  }
  const oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach((fn) => fn({ locale }));
    return true;
  }
  return false;
};
const onLocaleChangeCallbacks = [];
const onLocaleChange = (fn) => {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
};
if (typeof global !== "undefined") {
  global.getLocale = getLocale;
}
const UUID_KEY = "__DC_STAT_UUID";
let deviceId;
function useDeviceId(global2 = wx) {
  return function addDeviceId(_, toRes) {
    deviceId = deviceId || global2.getStorageSync(UUID_KEY);
    if (!deviceId) {
      deviceId = Date.now() + "" + Math.floor(Math.random() * 1e7);
      wx.setStorage({
        key: UUID_KEY,
        data: deviceId
      });
    }
    toRes.deviceId = deviceId;
  };
}
function addSafeAreaInsets(fromRes, toRes) {
  if (fromRes.safeArea) {
    const safeArea = fromRes.safeArea;
    toRes.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: fromRes.windowWidth - safeArea.right,
      bottom: fromRes.screenHeight - safeArea.bottom
    };
  }
}
function getOSInfo(system, platform) {
  let osName = "";
  let osVersion = "";
  if (platform && false) {
    osName = platform;
    osVersion = system;
    system = `${osName} ${osVersion}`;
  } else {
    {
      osName = platform;
    }
    osVersion = system.split(" ")[1] || "";
  }
  osName = osName.toLowerCase();
  switch (osName) {
    case "harmony":
    case "ohos":
    case "openharmonyos":
    case "openharmony":
      osName = "harmonyos";
      break;
    case "iphone os":
      osName = "ios";
      break;
    case "mac":
    case "darwin":
      osName = "macos";
      break;
    case "windows_nt":
      osName = "windows";
      break;
  }
  return {
    osName,
    osVersion,
    system
  };
}
function getPlatform(platform) {
  platform = platform.toLowerCase();
  {
    if (platform === "ohos") {
      platform = "harmonyos";
    }
  }
  return platform;
}
function populateParameters(fromRes, toRes) {
  const { brand = "", model = "", system = "", language = "", theme, version: version2, platform, fontSizeSetting, SDKVersion, pixelRatio, deviceOrientation } = fromRes;
  const { osName, osVersion, system: updatedSystem } = getOSInfo(system, platform);
  let hostVersion = version2;
  let deviceType = getGetDeviceType(fromRes, model);
  let deviceBrand = getDeviceBrand(brand);
  let _hostName = getHostName(fromRes);
  let _deviceOrientation = deviceOrientation;
  let _devicePixelRatio = pixelRatio;
  let _SDKVersion = SDKVersion;
  const hostLanguage = (language || "").replace(/_/g, "-");
  const parameters = {
    appId: "__UNI__KIDS_VIDEO",
    appName: "儿童英语视频",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "5.14",
    uniCompilerVersion: "5.14",
    uniRuntimeVersion: "5.14",
    uniPlatform: "mp-weixin",
    deviceBrand,
    deviceModel: model,
    deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName,
    osVersion,
    hostTheme: theme,
    hostVersion,
    hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    platform: getPlatform(platform),
    system: updatedSystem,
    // TODO
    osLanguage: void 0,
    osTheme: void 0,
    ua: void 0,
    hostPackageName: void 0,
    browserName: void 0,
    browserVersion: void 0,
    isUniAppX: false
  };
  extend(toRes, parameters);
}
function getGetDeviceType(fromRes, model) {
  const platform = fromRes.platform || "";
  let deviceType = fromRes.deviceType || "phone";
  {
    const deviceTypeMaps = {
      ipad: "pad",
      windows: "pc",
      mac: "pc",
      linux: "pc",
      pc: "pc"
    };
    const deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    const _model = model.toLowerCase();
    for (let index2 = 0; index2 < deviceTypeMapsKeys.length; index2++) {
      const _m = deviceTypeMapsKeys[index2];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  {
    if (platform === "ohos_pc") {
      deviceType = "pc";
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  let deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = deviceBrand.toLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale ? getLocale() : defaultLanguage;
}
function getHostName(fromRes) {
  const _platform = "WeChat";
  let _hostName = fromRes.hostName || _platform;
  {
    if (fromRes.environment) {
      _hostName = fromRes.environment;
    } else if (fromRes.host && fromRes.host.env) {
      _hostName = fromRes.host.env;
    }
  }
  return _hostName;
}
const getSystemInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    useDeviceId()(fromRes, toRes);
    populateParameters(fromRes, toRes);
  }
};
const getSystemInfoSync = getSystemInfo;
const redirectTo = {};
const previewImage = {
  args(fromArgs, toArgs) {
    let currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    const urls = fromArgs.urls;
    if (!isArray(urls)) {
      return;
    }
    const len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      toArgs.current = urls[currentIndex];
      toArgs.urls = urls.filter((item, index2) => index2 < currentIndex ? item !== urls[currentIndex] : true);
    } else {
      toArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
const showActionSheet = {
  args(fromArgs, toArgs) {
    toArgs.alertText = fromArgs.title;
  }
};
const getDeviceInfo = {
  returnValue: (fromRes, toRes) => {
    const { brand, model, system = "", platform = "" } = fromRes;
    let deviceType = getGetDeviceType(fromRes, model);
    let deviceBrand = getDeviceBrand(brand);
    useDeviceId()(fromRes, toRes);
    const { osName, osVersion } = getOSInfo(system, platform);
    toRes = extend(toRes, {
      deviceType,
      deviceBrand,
      deviceModel: model,
      osName,
      osVersion,
      platform: getPlatform(platform)
    });
  }
};
const getAppBaseInfo = {
  returnValue: (fromRes, toRes) => {
    const { version: version2, language, SDKVersion, theme } = fromRes;
    let _hostName = getHostName(fromRes);
    let hostLanguage = (language || "").replace(/_/g, "-");
    const parameters = {
      appId: "__UNI__KIDS_VIDEO",
      appName: "儿童英语视频",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version2,
      hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme,
      isUniAppX: false,
      uniPlatform: "mp-weixin",
      uniCompileVersion: "5.14",
      uniCompilerVersion: "5.14",
      uniRuntimeVersion: "5.14"
    };
    try {
      if (typeof wx.getAccountInfoSync === "function") {
        parameters.packagename = wx.getAccountInfoSync().miniProgram.appId;
      }
    } catch (error) {
    }
    extend(toRes, parameters);
  }
};
const getWindowInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    toRes = extend(toRes, {
      windowTop: 0,
      windowBottom: 0
    });
  }
};
const getAppAuthorizeSetting = {
  returnValue: function(fromRes, toRes) {
    const { locationReducedAccuracy } = fromRes;
    toRes.locationAccuracy = "unsupported";
    if (locationReducedAccuracy === true) {
      toRes.locationAccuracy = "reduced";
    } else if (locationReducedAccuracy === false) {
      toRes.locationAccuracy = "full";
    }
  }
};
const onError = {
  args(fromArgs) {
    const app = getApp({ allowDefault: true }) || {};
    if (!app.$vm) {
      if (!wx.$onErrorHandlers) {
        wx.$onErrorHandlers = [];
      }
      wx.$onErrorHandlers.push(fromArgs);
    } else {
      injectHook(ON_ERROR, fromArgs, app.$vm.$);
    }
  }
};
const offError = {
  args(fromArgs) {
    const app = getApp({ allowDefault: true }) || {};
    if (!app.$vm) {
      if (!wx.$onErrorHandlers) {
        return;
      }
      const index2 = wx.$onErrorHandlers.findIndex((fn) => fn === fromArgs);
      if (index2 !== -1) {
        wx.$onErrorHandlers.splice(index2, 1);
      }
    } else if (fromArgs.__weh) {
      const onErrors = app.$vm.$[ON_ERROR];
      if (onErrors) {
        const index2 = onErrors.indexOf(fromArgs.__weh);
        if (index2 > -1) {
          onErrors.splice(index2, 1);
        }
      }
    }
  }
};
const onSocketOpen = {
  args() {
    if (wx.__uni_console__) {
      if (wx.__uni_console_warned__) {
        return;
      }
      wx.__uni_console_warned__ = true;
      console.warn(`开发模式下小程序日志回显会使用 socket 连接，为了避免冲突，建议使用 SocketTask 的方式去管理 WebSocket 或手动关闭日志回显功能。[详情](https://uniapp.dcloud.net.cn/tutorial/run/mp-log.html)`);
    }
  }
};
const onSocketMessage = onSocketOpen;
const baseApis = {
  $on,
  $off,
  $once,
  $emit,
  upx2px,
  rpx2px: upx2px,
  interceptors,
  addInterceptor,
  removeInterceptor,
  onCreateVueApp,
  invokeCreateVueAppHook,
  getLocale,
  setLocale,
  onLocaleChange,
  getPushClientId,
  onPushMessage,
  offPushMessage,
  invokePushCallback,
  __f__
};
function initUni(api, protocols2, platform = wx) {
  const wrapper = initWrapper(protocols2);
  const UniProxyHandlers = {
    get(target, key) {
      if (hasOwn(target, key)) {
        return target[key];
      }
      if (hasOwn(api, key)) {
        return promisify(key, api[key]);
      }
      if (hasOwn(baseApis, key)) {
        return promisify(key, baseApis[key]);
      }
      return promisify(key, wrapper(key, platform[key]));
    }
  };
  return new Proxy({}, UniProxyHandlers);
}
function initGetProvider(providers) {
  return function getProvider2({ service, success, fail, complete }) {
    let res;
    if (providers[service]) {
      res = {
        errMsg: "getProvider:ok",
        service,
        provider: providers[service]
      };
      isFunction(success) && success(res);
    } else {
      res = {
        errMsg: "getProvider:fail:服务[" + service + "]不存在"
      };
      isFunction(fail) && fail(res);
    }
    isFunction(complete) && complete(res);
  };
}
const objectKeys = [
  "qy",
  "env",
  "error",
  "version",
  "lanDebug",
  "cloud",
  "serviceMarket",
  "router",
  "worklet",
  "__webpack_require_UNI_MP_PLUGIN__"
];
const singlePageDisableKey = ["lanDebug", "router", "worklet"];
const launchOption = wx.getLaunchOptionsSync ? wx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof wx[key] === "function";
}
function initWx() {
  const newWx = {};
  for (const key in wx) {
    if (isWxKey(key)) {
      newWx[key] = wx[key];
    }
  }
  if (typeof globalThis !== "undefined" && typeof requireMiniProgram === "undefined") {
    globalThis.wx = newWx;
  }
  return newWx;
}
const mocks$1 = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
const getProvider = initGetProvider({
  oauth: ["weixin"],
  share: ["weixin"],
  payment: ["wxpay"],
  push: ["weixin"]
});
function initComponentMocks(component) {
  const res = /* @__PURE__ */ Object.create(null);
  mocks$1.forEach((name) => {
    res[name] = component[name];
  });
  return res;
}
function createSelectorQuery() {
  const query = wx$2.createSelectorQuery();
  const oldIn = query.in;
  query.in = function newIn(component) {
    if (component.$scope) {
      return oldIn.call(this, component.$scope);
    }
    return oldIn.call(this, initComponentMocks(component));
  };
  return query;
}
const wx$2 = initWx();
if (!wx$2.getAppBaseInfo || !wx$2.getAppBaseInfo()) {
  wx$2.getAppBaseInfo = wx$2.getSystemInfoSync;
}
if (!wx$2.getWindowInfo || !wx$2.getWindowInfo()) {
  wx$2.getWindowInfo = wx$2.getSystemInfoSync;
}
if (!wx$2.getDeviceInfo || !wx$2.getDeviceInfo()) {
  wx$2.getDeviceInfo = wx$2.getSystemInfoSync;
}
let baseInfo = wx$2.getAppBaseInfo && wx$2.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx$2.getSystemInfoSync();
}
const host = baseInfo ? baseInfo.host : null;
const shareVideoMessage = host && host.env === "SAAASDK" ? wx$2.miniapp.shareVideoMessage : wx$2.shareVideoMessage;
var shims = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createSelectorQuery,
  getProvider,
  shareVideoMessage
});
const compressImage = {
  args(fromArgs, toArgs) {
    if (fromArgs.compressedHeight && !toArgs.compressHeight) {
      toArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !toArgs.compressWidth) {
      toArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  compressImage,
  getAppAuthorizeSetting,
  getAppBaseInfo,
  getDeviceInfo,
  getSystemInfo,
  getSystemInfoSync,
  getWindowInfo,
  offError,
  onError,
  onSocketMessage,
  onSocketOpen,
  previewImage,
  redirectTo,
  showActionSheet
});
const wx$1 = initWx();
var index = initUni(shims, protocols, wx$1);
function currentPageCaptureScreenshot(fullPage, callback) {
  var _a;
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  (_a = currentPage.vm) === null || _a === void 0 ? void 0 : _a.$viewToTempFilePath({
    wholeContent: fullPage,
    overwrite: true,
    success: (res) => {
      const fileManager = index.getFileSystemManager();
      fileManager.readFile({
        encoding: "base64",
        filePath: res.tempFilePath,
        success(readFileRes) {
          callback(readFileRes.data, "");
        },
        fail(err) {
          callback("", `captureScreenshot fail: ${JSON.stringify(err)}`);
        }
      });
    },
    fail: (err) => {
      callback("", `captureScreenshot fail: ${JSON.stringify(err)}`);
    }
  });
}
function initRuntimeSocket(hosts, port, id) {
  if (hosts == "" || port == "" || id == "")
    return Promise.resolve(null);
  return hosts.split(",").reduce((promise, host2) => {
    return promise.then((socket) => {
      if (socket != null)
        return Promise.resolve(socket);
      return tryConnectSocket(host2, port, id);
    });
  }, Promise.resolve(null));
}
const SOCKET_TIMEOUT = 500;
function tryConnectSocket(host2, port, id) {
  return new Promise((resolve, reject) => {
    const socket = index.connectSocket({
      url: `ws://${host2}:${port}/${id}`,
      multiple: true,
      // 支付宝小程序 是否开启多实例
      fail() {
        resolve(null);
      }
    });
    const timer = setTimeout(() => {
      socket.close({
        code: 1006,
        reason: "connect timeout"
      });
      resolve(null);
    }, SOCKET_TIMEOUT);
    socket.onOpen((e2) => {
      clearTimeout(timer);
      resolve(socket);
    });
    socket.onClose((e2) => {
      clearTimeout(timer);
      resolve(null);
    });
    socket.onError((e2) => {
      clearTimeout(timer);
      resolve(null);
    });
    socket.onMessage((result) => {
      const message = JSON.parse(result.data);
      if (message["type"] == "screencap") {
        const id2 = message["id"];
        currentPageCaptureScreenshot(message.fullPage, (base64, error) => {
          socket.send({
            data: JSON.stringify({
              id: id2,
              base64,
              error
            })
          });
        });
      }
      resolve(null);
    });
  });
}
const CONSOLE_TYPES = ["log", "warn", "error", "info", "debug"];
const originalConsole = /* @__PURE__ */ CONSOLE_TYPES.reduce((methods, type) => {
  methods[type] = console[type].bind(console);
  return methods;
}, {});
let sendError = null;
const errorQueue = /* @__PURE__ */ new Set();
const errorExtra = {};
function sendErrorMessages(errors) {
  if (sendError == null) {
    errors.forEach((error) => {
      errorQueue.add(error);
    });
    return;
  }
  const data = errors.map((err) => {
    if (typeof err === "string") {
      return err;
    }
    const isPromiseRejection = err && "promise" in err && "reason" in err;
    const prefix = isPromiseRejection ? "UnhandledPromiseRejection: " : "";
    if (isPromiseRejection) {
      err = err.reason;
    }
    if (err instanceof Error && err.stack) {
      if (err.message && !err.stack.includes(err.message)) {
        return `${prefix}${err.message}
${err.stack}`;
      }
      return `${prefix}${err.stack}`;
    }
    if (typeof err === "object" && err !== null) {
      try {
        return prefix + JSON.stringify(err);
      } catch (err2) {
        return prefix + String(err2);
      }
    }
    return prefix + String(err);
  }).filter(Boolean);
  if (data.length > 0) {
    sendError(JSON.stringify(Object.assign({
      type: "error",
      data
    }, errorExtra)));
  }
}
function setSendError(value, extra = {}) {
  sendError = value;
  Object.assign(errorExtra, extra);
  if (value != null && errorQueue.size > 0) {
    const errors = Array.from(errorQueue);
    errorQueue.clear();
    sendErrorMessages(errors);
  }
}
function initOnError() {
  function onError2(error) {
    try {
      if (typeof PromiseRejectionEvent !== "undefined" && error instanceof PromiseRejectionEvent && error.reason instanceof Error && error.reason.message && error.reason.message.includes(`Cannot create property 'errMsg' on string 'taskId`)) {
        return;
      }
      if (true) {
        originalConsole.error(error);
      }
      sendErrorMessages([error]);
    } catch (err) {
      originalConsole.error(err);
    }
  }
  if (typeof index !== "undefined") {
    if (typeof index.onError === "function") {
      index.onError(onError2);
    }
    if (typeof index.onUnhandledRejection === "function") {
      index.onUnhandledRejection(onError2);
    }
  }
  return function offError2() {
    if (typeof index !== "undefined") {
      if (typeof index.offError === "function") {
        index.offError(onError2);
      }
      if (typeof index.offUnhandledRejection === "function") {
        index.offUnhandledRejection(onError2);
      }
    }
  };
}
function formatMessage(type, args) {
  try {
    return {
      type,
      args: formatArgs(args)
    };
  } catch (e2) {
  }
  return {
    type,
    args: []
  };
}
function formatArgs(args) {
  return args.map((arg) => formatArg(arg));
}
function formatArg(arg, depth = 0) {
  if (depth >= 7) {
    return {
      type: "object",
      value: "[Maximum depth reached]"
    };
  }
  const type = typeof arg;
  switch (type) {
    case "string":
      return formatString(arg);
    case "number":
      return formatNumber(arg);
    case "boolean":
      return formatBoolean(arg);
    case "object":
      try {
        return formatObject(arg, depth);
      } catch (e2) {
        return {
          type: "object",
          value: {
            properties: []
          }
        };
      }
    case "undefined":
      return formatUndefined();
    case "function":
      return formatFunction(arg);
    case "symbol": {
      return formatSymbol(arg);
    }
    case "bigint":
      return formatBigInt(arg);
  }
}
function formatFunction(value) {
  return {
    type: "function",
    value: `function ${value.name}() {}`
  };
}
function formatUndefined() {
  return {
    type: "undefined"
  };
}
function formatBoolean(value) {
  return {
    type: "boolean",
    value: String(value)
  };
}
function formatNumber(value) {
  return {
    type: "number",
    value: String(value)
  };
}
function formatBigInt(value) {
  return {
    type: "bigint",
    value: String(value)
  };
}
function formatString(value) {
  return {
    type: "string",
    value
  };
}
function formatSymbol(value) {
  return {
    type: "symbol",
    value: value.description
  };
}
function formatObject(value, depth) {
  if (value === null) {
    return {
      type: "null"
    };
  }
  {
    if (isComponentPublicInstance(value)) {
      return formatComponentPublicInstance(value, depth);
    }
    if (isComponentInternalInstance(value)) {
      return formatComponentInternalInstance(value, depth);
    }
    if (isUniElement(value)) {
      return formatUniElement(value, depth);
    }
    if (isCSSStyleDeclaration(value)) {
      return formatCSSStyleDeclaration(value, depth);
    }
  }
  if (Array.isArray(value)) {
    return {
      type: "object",
      subType: "array",
      value: {
        properties: value.map((v, i) => formatArrayElement(v, i, depth + 1))
      }
    };
  }
  if (value instanceof Set) {
    return {
      type: "object",
      subType: "set",
      className: "Set",
      description: `Set(${value.size})`,
      value: {
        entries: Array.from(value).map((v) => formatSetEntry(v, depth + 1))
      }
    };
  }
  if (value instanceof Map) {
    return {
      type: "object",
      subType: "map",
      className: "Map",
      description: `Map(${value.size})`,
      value: {
        entries: Array.from(value.entries()).map((v) => formatMapEntry(v, depth + 1))
      }
    };
  }
  if (value instanceof Promise) {
    return {
      type: "object",
      subType: "promise",
      value: {
        properties: []
      }
    };
  }
  if (value instanceof RegExp) {
    return {
      type: "object",
      subType: "regexp",
      value: String(value),
      className: "Regexp"
    };
  }
  if (value instanceof Date) {
    return {
      type: "object",
      subType: "date",
      value: String(value),
      className: "Date"
    };
  }
  if (value instanceof Error) {
    return {
      type: "object",
      subType: "error",
      value: value.message || String(value),
      className: value.name || "Error"
    };
  }
  let className = void 0;
  {
    const constructor = value.constructor;
    if (constructor) {
      if (constructor.get$UTSMetadata$) {
        className = constructor.get$UTSMetadata$().name;
      }
    }
  }
  let entries = Object.entries(value);
  if (isHarmonyBuilderParams(value)) {
    entries = entries.filter(([key]) => key !== "modifier" && key !== "nodeContent");
  }
  return {
    type: "object",
    className,
    value: {
      properties: entries.map((entry) => formatObjectProperty(entry[0], entry[1], depth + 1))
    }
  };
}
function isHarmonyBuilderParams(value) {
  return value.modifier && value.modifier._attribute && value.nodeContent;
}
function isComponentPublicInstance(value) {
  return value.$ && isComponentInternalInstance(value.$);
}
function isComponentInternalInstance(value) {
  return value.type && value.uid != null && value.appContext;
}
function formatComponentPublicInstance(value, depth) {
  return {
    type: "object",
    className: "ComponentPublicInstance",
    value: {
      properties: Object.entries(value.$.type).map(([name, value2]) => formatObjectProperty(name, value2, depth + 1))
    }
  };
}
function formatComponentInternalInstance(value, depth) {
  return {
    type: "object",
    className: "ComponentInternalInstance",
    value: {
      properties: Object.entries(value.type).map(([name, value2]) => formatObjectProperty(name, value2, depth + 1))
    }
  };
}
function isUniElement(value) {
  return value.style && value.tagName != null && value.nodeName != null;
}
function formatUniElement(value, depth) {
  return {
    type: "object",
    // 非 x 没有 UniElement 的概念
    // className: 'UniElement',
    value: {
      properties: Object.entries(value).filter(([name]) => [
        "id",
        "tagName",
        "nodeName",
        "dataset",
        "offsetTop",
        "offsetLeft",
        "style"
      ].includes(name)).map(([name, value2]) => formatObjectProperty(name, value2, depth + 1))
    }
  };
}
function isCSSStyleDeclaration(value) {
  return typeof value.getPropertyValue === "function" && typeof value.setProperty === "function" && value.$styles;
}
function formatCSSStyleDeclaration(style, depth) {
  return {
    type: "object",
    value: {
      properties: Object.entries(style.$styles).map(([name, value]) => formatObjectProperty(name, value, depth + 1))
    }
  };
}
function formatObjectProperty(name, value, depth) {
  const result = formatArg(value, depth);
  result.name = name;
  return result;
}
function formatArrayElement(value, index2, depth) {
  const result = formatArg(value, depth);
  result.name = `${index2}`;
  return result;
}
function formatSetEntry(value, depth) {
  return {
    value: formatArg(value, depth)
  };
}
function formatMapEntry(value, depth) {
  return {
    key: formatArg(value[0], depth),
    value: formatArg(value[1], depth)
  };
}
let sendConsole = null;
const messageQueue = [];
const messageExtra = {};
const EXCEPTION_BEGIN_MARK = "---BEGIN:EXCEPTION---";
const EXCEPTION_END_MARK = "---END:EXCEPTION---";
function sendConsoleMessages(messages) {
  if (sendConsole == null) {
    messageQueue.push(...messages);
    return;
  }
  sendConsole(JSON.stringify(Object.assign({
    type: "console",
    data: messages
  }, messageExtra)));
}
function setSendConsole(value, extra = {}) {
  sendConsole = value;
  Object.assign(messageExtra, extra);
  if (value != null && messageQueue.length > 0) {
    const messages = messageQueue.slice();
    messageQueue.length = 0;
    sendConsoleMessages(messages);
  }
}
const atFileRegex = /^\s*at\s+[\w/./-]+:\d+$/;
function rewriteConsole() {
  function wrapConsole(type) {
    return function(...args) {
      {
        const originalArgs = [...args];
        if (originalArgs.length) {
          const maybeAtFile = originalArgs[originalArgs.length - 1];
          if (typeof maybeAtFile === "string" && atFileRegex.test(maybeAtFile)) {
            originalArgs.pop();
          }
        }
        originalConsole[type](...originalArgs);
      }
      if (type === "error" && args.length === 1) {
        const arg = args[0];
        if (typeof arg === "string" && arg.startsWith(EXCEPTION_BEGIN_MARK)) {
          const startIndex = EXCEPTION_BEGIN_MARK.length;
          const endIndex = arg.length - EXCEPTION_END_MARK.length;
          sendErrorMessages([arg.slice(startIndex, endIndex)]);
          return;
        } else if (arg instanceof Error) {
          sendErrorMessages([arg]);
          return;
        }
      }
      sendConsoleMessages([formatMessage(type, args)]);
    };
  }
  if (isConsoleWritable()) {
    CONSOLE_TYPES.forEach((type) => {
      console[type] = wrapConsole(type);
    });
    return function restoreConsole() {
      CONSOLE_TYPES.forEach((type) => {
        console[type] = originalConsole[type];
      });
    };
  } else {
    {
      if (typeof index !== "undefined" && index.__f__) {
        const oldLog = index.__f__;
        if (oldLog) {
          index.__f__ = function(...args) {
            const [type, filename, ...rest] = args;
            oldLog(type, "", ...rest);
            sendConsoleMessages([formatMessage(type, [...rest, filename])]);
          };
          return function restoreConsole() {
            index.__f__ = oldLog;
          };
        }
      }
    }
  }
  return function restoreConsole() {
  };
}
function isConsoleWritable() {
  const value = console.log;
  const sym = Symbol();
  try {
    console.log = sym;
  } catch (ex) {
    return false;
  }
  const isWritable = console.log === sym;
  console.log = value;
  return isWritable;
}
function initRuntimeSocketService() {
  const hosts = "192.168.31.27,127.0.0.1";
  const port = "8090";
  const id = "mp-weixin_jihRDo";
  const lazy = typeof swan !== "undefined";
  let restoreError = lazy ? () => {
  } : initOnError();
  let restoreConsole = lazy ? () => {
  } : rewriteConsole();
  return Promise.resolve().then(() => {
    if (lazy) {
      restoreError = initOnError();
      restoreConsole = rewriteConsole();
    }
    return initRuntimeSocket(hosts, port, id).then((socket) => {
      if (!socket) {
        restoreError();
        restoreConsole();
        originalConsole.error(wrapError("开发模式下日志通道建立 socket 连接失败。"));
        {
          originalConsole.error(wrapError("小程序平台，请勾选不校验合法域名配置。"));
        }
        originalConsole.error(wrapError("如果是运行到真机，请确认手机与电脑处于同一网络。"));
        return false;
      }
      {
        initMiniProgramGlobalFlag();
      }
      socket.onClose(() => {
        {
          originalConsole.error(wrapError("开发模式下日志通道 socket 连接关闭，请在 HBuilderX 中重新运行。"));
        }
        restoreError();
        restoreConsole();
      });
      setSendConsole((data) => {
        socket.send({
          data
        });
      });
      setSendError((data) => {
        socket.send({
          data
        });
      });
      return true;
    });
  });
}
const ERROR_CHAR = "‌";
function wrapError(error) {
  return `${ERROR_CHAR}${error}${ERROR_CHAR}`;
}
function initMiniProgramGlobalFlag() {
  if (typeof wx$1 !== "undefined") {
    wx$1.__uni_console__ = true;
  } else if (typeof my !== "undefined") {
    my.__uni_console__ = true;
  } else if (typeof tt !== "undefined") {
    tt.__uni_console__ = true;
  } else if (typeof swan !== "undefined") {
    swan.__uni_console__ = true;
  } else if (typeof qq !== "undefined") {
    qq.__uni_console__ = true;
  } else if (typeof ks !== "undefined") {
    ks.__uni_console__ = true;
  } else if (typeof jd !== "undefined") {
    jd.__uni_console__ = true;
  } else if (typeof xhs !== "undefined") {
    xhs.__uni_console__ = true;
  } else if (typeof has !== "undefined") {
    has.__uni_console__ = true;
  } else if (typeof qa !== "undefined") {
    qa.__uni_console__ = true;
  }
}
initRuntimeSocketService();
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val2] of props) {
    target[key] = val2;
  }
  return target;
};
function initVueIds(vueIds, mpInstance) {
  if (!vueIds) {
    return;
  }
  const ids = vueIds.split(",");
  const len = ids.length;
  if (len === 1) {
    mpInstance._$vueId = ids[0];
  } else if (len === 2) {
    mpInstance._$vueId = ids[0];
    mpInstance._$vuePid = ids[1];
  }
}
const EXTRAS = ["externalClasses"];
function initExtraOptions(miniProgramComponentOptions, vueOptions) {
  EXTRAS.forEach((name) => {
    if (hasOwn(vueOptions, name)) {
      miniProgramComponentOptions[name] = vueOptions[name];
    }
  });
}
const WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach((name) => {
      const matches = name.match(WORKLET_RE);
      if (matches) {
        const workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
function initWxsCallMethods(methods, wxsCallMethods) {
  if (!isArray(wxsCallMethods)) {
    return;
  }
  wxsCallMethods.forEach((callMethod) => {
    methods[callMethod] = function(args) {
      return this.$vm[callMethod](args);
    };
  });
}
function selectAllComponents(mpInstance, selector, $refs) {
  const components = mpInstance.selectAllComponents(selector);
  components.forEach((component) => {
    const ref2 = component.properties.uR;
    $refs[ref2] = component.$vm || component;
  });
}
function initRefs(instance, mpInstance) {
  Object.defineProperty(instance, "refs", {
    get() {
      const $refs = {};
      selectAllComponents(mpInstance, ".r", $refs);
      const forComponents = mpInstance.selectAllComponents(".r-i-f");
      forComponents.forEach((component) => {
        const ref2 = component.properties.uR;
        if (!ref2) {
          return;
        }
        if (!$refs[ref2]) {
          $refs[ref2] = [];
        }
        $refs[ref2].push(component.$vm || component);
      });
      return $refs;
    }
  });
}
function findVmByVueId(instance, vuePid) {
  const $children = instance.$children;
  for (let i = $children.length - 1; i >= 0; i--) {
    const childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  let parentVm;
  for (let i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
function getLocaleLanguage() {
  var _a;
  let localeLanguage = "";
  {
    const appBaseInfo = ((_a = wx.getAppBaseInfo) === null || _a === void 0 ? void 0 : _a.call(wx)) || wx.getSystemInfoSync();
    const language = appBaseInfo && appBaseInfo.language ? appBaseInfo.language : LOCALE_EN;
    localeLanguage = normalizeLocale(language) || LOCALE_EN;
  }
  return localeLanguage;
}
const MP_METHODS = [
  "createSelectorQuery",
  "createIntersectionObserver",
  "selectAllComponents",
  "selectComponent"
];
function createEmitFn(oldEmit, ctx) {
  return function emit2(event, ...args) {
    const scope = ctx.$scope;
    if (scope && event) {
      const detail = { __args__: args };
      {
        scope.triggerEvent(event, detail);
      }
    }
    return oldEmit.apply(this, [event, ...args]);
  };
}
function initBaseInstance(instance, options) {
  const ctx = instance.ctx;
  ctx.mpType = options.mpType;
  ctx.$mpType = options.mpType;
  ctx.$mpPlatform = "mp-weixin";
  ctx.$scope = options.mpInstance;
  {
    Object.defineProperties(ctx, {
      // only id
      [VIRTUAL_HOST_ID]: {
        get() {
          const id = this.$scope.data[VIRTUAL_HOST_ID];
          return id === void 0 ? "" : id;
        }
      }
    });
  }
  ctx.$mp = {};
  {
    ctx._self = {};
  }
  instance.slots = {};
  if (isArray(options.slots) && options.slots.length) {
    options.slots.forEach((name) => {
      instance.slots[name] = true;
    });
    if (instance.slots[SLOT_DEFAULT_NAME]) {
      instance.slots.default = true;
    }
  }
  ctx.getOpenerEventChannel = function() {
    {
      return options.mpInstance.getOpenerEventChannel();
    }
  };
  ctx.$hasHook = hasHook;
  ctx.$callHook = callHook;
  instance.emit = createEmitFn(instance.emit, ctx);
}
function initComponentInstance(instance, options) {
  initBaseInstance(instance, options);
  const ctx = instance.ctx;
  MP_METHODS.forEach((method) => {
    ctx[method] = function(...args) {
      const mpInstance = ctx.$scope;
      if (mpInstance && mpInstance[method]) {
        return mpInstance[method].apply(mpInstance, args);
      }
    };
  });
}
function initMocks(instance, mpInstance, mocks2) {
  const ctx = instance.ctx;
  mocks2.forEach((mock) => {
    if (hasOwn(mpInstance, mock)) {
      instance[mock] = ctx[mock] = mpInstance[mock];
    }
  });
}
function hasHook(name) {
  const hooks = this.$[name];
  if (hooks && hooks.length) {
    return true;
  }
  return false;
}
function callHook(name, args) {
  if (name === "mounted") {
    callHook.call(this, "bm");
    this.$.isMounted = true;
    name = "m";
  }
  const hooks = this.$[name];
  return hooks && invokeArrayFns(hooks, args);
}
const PAGE_INIT_HOOKS = [
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_RESIZE,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_ADD_TO_FAVORITES
  // 'onReady', // lifetimes.ready
  // 'onPageScroll', // 影响性能，开发者手动注册
  // 'onShareTimeline', // 右上角菜单，开发者手动注册
  // 'onShareAppMessage' // 右上角菜单，开发者手动注册
];
function findHooks(vueOptions, hooks = /* @__PURE__ */ new Set()) {
  if (vueOptions) {
    Object.keys(vueOptions).forEach((name) => {
      if (isUniLifecycleHook(name, vueOptions[name])) {
        hooks.add(name);
      }
    });
    {
      const { extends: extendsOptions, mixins } = vueOptions;
      if (mixins) {
        mixins.forEach((mixin) => findHooks(mixin, hooks));
      }
      if (extendsOptions) {
        findHooks(extendsOptions, hooks);
      }
    }
  }
  return hooks;
}
function initHook(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function(args) {
      return this.$vm && this.$vm.$callHook(hook, args);
    };
  }
}
const EXCLUDE_HOOKS = [ON_READY];
function initHooks(mpOptions, hooks, excludes = EXCLUDE_HOOKS) {
  hooks.forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initUnknownHooks(mpOptions, vueOptions, excludes = EXCLUDE_HOOKS) {
  findHooks(vueOptions).forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initRuntimeHooks(mpOptions, runtimeHooks) {
  if (!runtimeHooks) {
    return;
  }
  const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
  hooks.forEach((hook) => {
    if (runtimeHooks & MINI_PROGRAM_PAGE_RUNTIME_HOOKS[hook]) {
      initHook(mpOptions, hook, []);
    }
  });
}
const findMixinRuntimeHooks = /* @__PURE__ */ once(() => {
  const runtimeHooks = [];
  const app = isFunction(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm && app.$vm.$) {
    const mixins = app.$vm.$.appContext.mixins;
    if (isArray(mixins)) {
      const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
      mixins.forEach((mixin) => {
        hooks.forEach((hook) => {
          if (hasOwn(mixin, hook) && !runtimeHooks.includes(hook)) {
            runtimeHooks.push(hook);
          }
        });
      });
    }
  }
  return runtimeHooks;
});
function initMixinRuntimeHooks(mpOptions) {
  initHooks(mpOptions, findMixinRuntimeHooks());
}
const HOOKS = [
  ON_SHOW,
  ON_HIDE,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION
];
function parseApp(instance, parseAppOptions) {
  const internalInstance = instance.$;
  const appOptions = {
    globalData: instance.$options && instance.$options.globalData || {},
    $vm: instance,
    // mp-alipay 组件 data 初始化比 onLaunch 早，提前挂载
    onLaunch(options) {
      this.$vm = instance;
      const ctx = internalInstance.ctx;
      if (this.$vm && ctx.$scope && ctx.$callHook) {
        return;
      }
      initBaseInstance(internalInstance, {
        mpType: "app",
        mpInstance: this,
        slots: []
      });
      ctx.globalData = this.globalData;
      instance.$callHook(ON_LAUNCH, options);
    }
  };
  const onErrorHandlers = wx.$onErrorHandlers;
  if (onErrorHandlers) {
    onErrorHandlers.forEach((fn) => {
      injectHook(ON_ERROR, fn, internalInstance);
    });
    onErrorHandlers.length = 0;
  }
  initLocale(instance);
  const vueOptions = instance.$.type;
  initHooks(appOptions, HOOKS);
  initUnknownHooks(appOptions, vueOptions);
  {
    const methods = vueOptions.methods;
    methods && extend(appOptions, methods);
  }
  return appOptions;
}
function initCreateApp(parseAppOptions) {
  return function createApp2(vm) {
    return App(parseApp(vm));
  };
}
function initCreateSubpackageApp(parseAppOptions) {
  return function createApp2(vm) {
    const appOptions = parseApp(vm);
    const app = isFunction(getApp) && getApp({
      allowDefault: true
    });
    if (!app)
      return;
    vm.$.ctx.$scope = app;
    const globalData = app.globalData;
    if (globalData) {
      Object.keys(appOptions.globalData).forEach((name) => {
        if (!hasOwn(globalData, name)) {
          globalData[name] = appOptions.globalData[name];
        }
      });
    }
    Object.keys(appOptions).forEach((name) => {
      if (!hasOwn(app, name)) {
        app[name] = appOptions[name];
      }
    });
    initAppLifecycle(appOptions, vm);
  };
}
function initAppLifecycle(appOptions, vm) {
  if (isFunction(appOptions.onLaunch)) {
    const args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch(args);
  }
  if (isFunction(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow((args) => {
      vm.$callHook("onShow", args);
    });
  }
  if (isFunction(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide((args) => {
      vm.$callHook("onHide", args);
    });
  }
}
function initLocale(appVm) {
  const locale = ref(getLocaleLanguage());
  Object.defineProperty(appVm, "$locale", {
    get() {
      return locale.value;
    },
    set(v) {
      locale.value = v;
    }
  });
}
const builtInProps = [
  // 百度小程序,快手小程序自定义组件不支持绑定动态事件，动态dataset，故通过props传递事件信息
  // event-opts
  "eO",
  // 组件 ref
  "uR",
  // 组件 ref-in-for
  "uRIF",
  // 组件 id
  "uI",
  // 组件类型 m: 小程序组件
  "uT",
  // 组件 props
  "uP",
  // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
  "uS"
];
function initDefaultProps(options, isBehavior = false) {
  const properties = {};
  if (!isBehavior) {
    let observerSlots = function(newVal) {
      const $slots = /* @__PURE__ */ Object.create(null);
      newVal && newVal.forEach((slotName) => {
        $slots[slotName] = true;
      });
      this.setData({
        $slots
      });
    };
    builtInProps.forEach((name) => {
      properties[name] = {
        type: null,
        value: ""
      };
    });
    properties.uS = {
      type: null,
      value: []
    };
    {
      properties.uS.observer = observerSlots;
    }
  }
  if (options.behaviors) {
    if (options.behaviors.includes("wx://form-field")) {
      if (!options.properties || !options.properties.name) {
        properties.name = {
          type: null,
          value: ""
        };
      }
      if (!options.properties || !options.properties.value) {
        properties.value = {
          type: null,
          value: ""
        };
      }
    }
  }
  return properties;
}
function initVirtualHostProps(options) {
  const properties = {};
  {
    if (options && options.virtualHost) {
      properties[VIRTUAL_HOST_STYLE] = {
        type: null,
        value: ""
      };
      properties[VIRTUAL_HOST_CLASS] = {
        type: null,
        value: ""
      };
      properties[VIRTUAL_HOST_HIDDEN] = {
        type: null,
        value: ""
      };
      properties[VIRTUAL_HOST_ID] = {
        type: null,
        value: ""
      };
    }
  }
  return properties;
}
function initProps(mpComponentOptions) {
  if (!mpComponentOptions.properties) {
    mpComponentOptions.properties = {};
  }
  extend(mpComponentOptions.properties, initDefaultProps(mpComponentOptions), initVirtualHostProps(mpComponentOptions.options));
}
const PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function parsePropType(type, defaultValue) {
  if (isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function normalizePropType(type, defaultValue) {
  const res = parsePropType(type);
  return PROP_TYPES.indexOf(res) !== -1 ? res : null;
}
function initPageProps({ properties }, rawProps) {
  if (isArray(rawProps)) {
    rawProps.forEach((key) => {
      properties[key] = {
        type: String,
        value: ""
      };
    });
  } else if (isPlainObject(rawProps)) {
    Object.keys(rawProps).forEach((key) => {
      const opts = rawProps[key];
      if (isPlainObject(opts)) {
        let value = opts.default;
        if (isFunction(value)) {
          value = value();
        }
        const type = opts.type;
        opts.type = normalizePropType(type);
        properties[key] = {
          type: opts.type,
          value
        };
      } else {
        properties[key] = {
          type: normalizePropType(opts)
        };
      }
    });
  }
}
function findPropsData(properties, isPage2) {
  return (isPage2 ? findPagePropsData(properties) : findComponentPropsData(resolvePropValue(properties.uP))) || {};
}
function findPagePropsData(properties) {
  const propsData = {};
  if (isPlainObject(properties)) {
    Object.keys(properties).forEach((name) => {
      if (builtInProps.indexOf(name) === -1) {
        propsData[name] = resolvePropValue(properties[name]);
      }
    });
  }
  return propsData;
}
function initFormField(vm) {
  const vueOptions = vm.$options;
  if (isArray(vueOptions.behaviors) && vueOptions.behaviors.includes("uni://form-field")) {
    vm.$watch("modelValue", () => {
      vm.$scope && vm.$scope.setData({
        name: vm.name,
        value: vm.modelValue
      });
    }, {
      immediate: true
    });
  }
}
function resolvePropValue(prop) {
  return prop;
}
function initData(_) {
  return {};
}
function initPropsObserver(componentOptions) {
  const observe = function observe2() {
    const up = this.properties.uP;
    if (!up) {
      return;
    }
    if (this.$vm) {
      updateComponentProps(resolvePropValue(up), this.$vm.$);
    } else if (resolvePropValue(this.properties.uT) === "m") {
      updateMiniProgramComponentProperties(resolvePropValue(up), this);
    } else
      ;
  };
  {
    if (!componentOptions.observers) {
      componentOptions.observers = {};
    }
    componentOptions.observers.uP = observe;
  }
}
function updateMiniProgramComponentProperties(up, mpInstance) {
  const prevProps = mpInstance.properties;
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps, false)) {
    mpInstance.setData(nextProps);
  }
}
function updateComponentProps(up, instance) {
  const prevProps = toRaw(instance.props);
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps)) {
    updateProps(instance, nextProps, prevProps, false);
    if (hasQueueJob(instance.update)) {
      invalidateJob(instance.update);
    }
    {
      instance.update();
    }
  }
}
function hasPropsChanged(prevProps, nextProps, checkLen = true) {
  const nextKeys = Object.keys(nextProps);
  if (checkLen && nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key]) {
      return true;
    }
  }
  return false;
}
function initBehaviors(vueOptions) {
  const vueBehaviors = vueOptions.behaviors;
  let vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  const behaviors = [];
  if (isArray(vueBehaviors)) {
    vueBehaviors.forEach((behavior) => {
      behaviors.push(behavior.replace("uni://", "wx://"));
      if (behavior === "uni://form-field") {
        if (isArray(vueProps)) {
          vueProps.push("name");
          vueProps.push("modelValue");
        } else {
          vueProps.name = {
            type: String,
            default: ""
          };
          vueProps.modelValue = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ""
          };
        }
      }
    });
  }
  return behaviors;
}
function applyOptions(componentOptions, vueOptions) {
  componentOptions.data = initData();
  componentOptions.behaviors = initBehaviors(vueOptions);
}
function parseComponent(vueOptions, { parse, mocks: mocks2, isPage: isPage2, isPageInProject, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 }) {
  vueOptions = vueOptions.default || vueOptions;
  const options = {
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true,
    pureDataPattern: /^uP$/
  };
  if (isArray(vueOptions.mixins)) {
    vueOptions.mixins.forEach((item) => {
      if (isObject(item.options)) {
        extend(options, item.options);
      }
    });
  }
  if (vueOptions.options) {
    extend(options, vueOptions.options);
  }
  const mpComponentOptions = {
    options,
    lifetimes: initLifetimes2({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }),
    pageLifetimes: {
      show() {
        this.$vm && this.$vm.$callHook("onPageShow");
      },
      hide() {
        this.$vm && this.$vm.$callHook("onPageHide");
      },
      resize(size2) {
        this.$vm && this.$vm.$callHook("onPageResize", size2);
      }
    },
    methods: {
      __l: handleLink2
    }
  };
  {
    applyOptions(mpComponentOptions, vueOptions);
  }
  initProps(mpComponentOptions);
  initPropsObserver(mpComponentOptions);
  initExtraOptions(mpComponentOptions, vueOptions);
  initWxsCallMethods(mpComponentOptions.methods, vueOptions.wxsCallMethods);
  {
    initWorkletMethods(mpComponentOptions.methods, vueOptions.methods);
  }
  if (parse) {
    parse(mpComponentOptions, { handleLink: handleLink2 });
  }
  return mpComponentOptions;
}
function initCreateComponent(parseOptions2) {
  return function createComponent2(vueComponentOptions) {
    return Component(parseComponent(vueComponentOptions, parseOptions2));
  };
}
let $createComponentFn;
let $destroyComponentFn;
function getAppVm() {
  return getApp().$vm;
}
function $createComponent(initialVNode, options) {
  if (!$createComponentFn) {
    $createComponentFn = getAppVm().$createComponent;
  }
  const proxy = $createComponentFn(initialVNode, options);
  return getExposeProxy(proxy.$) || proxy;
}
function $destroyComponent(instance) {
  if (!$destroyComponentFn) {
    $destroyComponentFn = getAppVm().$destroyComponent;
  }
  return $destroyComponentFn(instance);
}
function parsePage(vueOptions, parseOptions2) {
  const { parse, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 } = parseOptions2;
  const miniProgramPageOptions = parseComponent(vueOptions, {
    mocks: mocks2,
    isPage: isPage2,
    isPageInProject: true,
    initRelation: initRelation2,
    handleLink: handleLink2,
    initLifetimes: initLifetimes2
  });
  initPageProps(miniProgramPageOptions, (vueOptions.default || vueOptions).props);
  const methods = miniProgramPageOptions.methods;
  methods.onLoad = function(query) {
    {
      this.options = query;
    }
    this.$page = {
      fullPath: addLeadingSlash(this.route + stringifyQuery(query))
    };
    return this.$vm && this.$vm.$callHook(ON_LOAD, query);
  };
  initHooks(methods, PAGE_INIT_HOOKS);
  {
    initUnknownHooks(methods, vueOptions);
  }
  initRuntimeHooks(methods, vueOptions.__runtimeHooks);
  initMixinRuntimeHooks(methods);
  parse && parse(miniProgramPageOptions, { handleLink: handleLink2 });
  return miniProgramPageOptions;
}
function initCreatePage(parseOptions2) {
  return function createPage2(vuePageOptions) {
    return Component(parsePage(vuePageOptions, parseOptions2));
  };
}
function initCreatePluginApp(parseAppOptions) {
  return function createApp2(vm) {
    initAppLifecycle(parseApp(vm), vm);
  };
}
const MPPage = Page;
const MPComponent = Component;
function initTriggerEvent(mpInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent;
  const newTriggerEvent = function(event, ...args) {
    return oldTriggerEvent.apply(mpInstance, [
      customizeEvent(event),
      ...args
    ]);
  };
  try {
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initMiniProgramHook(name, options, isComponent) {
  const oldHook = options[name];
  if (!oldHook) {
    options[name] = function() {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function(...args) {
      initTriggerEvent(this);
      return oldHook.apply(this, args);
    };
  }
}
Page = function(options) {
  initMiniProgramHook(ON_LOAD, options);
  return MPPage(options);
};
Component = function(options) {
  initMiniProgramHook("created", options);
  const isVueComponent = options.properties && options.properties.uP;
  if (!isVueComponent) {
    initProps(options);
    initPropsObserver(options);
  }
  return MPComponent(options);
};
function initLifetimes({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }) {
  return {
    attached() {
      let properties = this.properties;
      initVueIds(properties.uI, this);
      const relationOptions = {
        vuePid: this._$vuePid
      };
      initRelation2(this, relationOptions);
      const mpInstance = this;
      const isMiniProgramPage = isPage2(mpInstance);
      let propsData = properties;
      this.$vm = $createComponent({
        type: vueOptions,
        props: findPropsData(propsData, isMiniProgramPage)
      }, {
        mpType: isMiniProgramPage ? "page" : "component",
        mpInstance,
        slots: properties.uS || {},
        // vueSlots
        parentComponent: relationOptions.parent && relationOptions.parent.$,
        onBeforeSetup(instance, options) {
          initRefs(instance, mpInstance);
          initMocks(instance, mpInstance, mocks2);
          initComponentInstance(instance, options);
        }
      });
      if (!isMiniProgramPage) {
        initFormField(this.$vm);
      }
    },
    ready() {
      if (this.$vm) {
        {
          this.$vm.$callHook("mounted");
          this.$vm.$callHook(ON_READY);
        }
      }
    },
    detached() {
      if (this.$vm) {
        pruneComponentPropsCache(this.$vm.$.uid);
        $destroyComponent(this.$vm);
      }
    }
  };
}
const mocks = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
function isPage(mpInstance) {
  return !!mpInstance.route;
}
function initRelation(mpInstance, detail) {
  mpInstance.triggerEvent("__l", detail);
}
function handleLink(event) {
  const detail = event.detail || event.value;
  const vuePid = detail.vuePid;
  let parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  detail.parent = parentVm;
}
var parseOptions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  handleLink,
  initLifetimes,
  initRelation,
  isPage,
  mocks
});
const createApp = initCreateApp();
const createPage = initCreatePage(parseOptions);
const createComponent = initCreateComponent(parseOptions);
const createPluginApp = initCreatePluginApp();
const createSubpackageApp = initCreateSubpackageApp();
{
  wx.createApp = global.createApp = createApp;
  wx.createPage = createPage;
  wx.createComponent = createComponent;
  wx.createPluginApp = global.createPluginApp = createPluginApp;
  wx.createSubpackageApp = global.createSubpackageApp = createSubpackageApp;
}
const createLifeCycleHook = (lifecycle, flag = 0) => (hook, target = getCurrentInstance()) => {
  !isInSSRComponentSetup && injectHook(lifecycle, hook, target);
};
const onLoad = /* @__PURE__ */ createLifeCycleHook(
  ON_LOAD,
  2
  /* HookFlags.PAGE */
);
const onReady = /* @__PURE__ */ createLifeCycleHook(
  ON_READY,
  2
  /* HookFlags.PAGE */
);
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var cosWxSdkV5_min = { exports: {} };
(function(module2, exports2) {
  !function(e2, t2) {
    module2.exports = t2();
  }(window, function() {
    return function(e2) {
      var t2 = {};
      function n(i) {
        if (t2[i])
          return t2[i].exports;
        var o2 = t2[i] = { i, l: false, exports: {} };
        return e2[i].call(o2.exports, o2, o2.exports, n), o2.l = true, o2.exports;
      }
      return n.m = e2, n.c = t2, n.d = function(e3, t3, i) {
        n.o(e3, t3) || Object.defineProperty(e3, t3, { enumerable: true, get: i });
      }, n.r = function(e3) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e3, "__esModule", { value: true });
      }, n.t = function(e3, t3) {
        if (1 & t3 && (e3 = n(e3)), 8 & t3)
          return e3;
        if (4 & t3 && "object" == typeof e3 && e3 && e3.__esModule)
          return e3;
        var i = /* @__PURE__ */ Object.create(null);
        if (n.r(i), Object.defineProperty(i, "default", { enumerable: true, value: e3 }), 2 & t3 && "string" != typeof e3)
          for (var o2 in e3)
            n.d(i, o2, (function(t4) {
              return e3[t4];
            }).bind(null, o2));
        return i;
      }, n.n = function(e3) {
        var t3 = e3 && e3.__esModule ? function() {
          return e3.default;
        } : function() {
          return e3;
        };
        return n.d(t3, "a", t3), t3;
      }, n.o = function(e3, t3) {
        return Object.prototype.hasOwnProperty.call(e3, t3);
      }, n.p = "/Users/chrisftian/Documents/projects/cos-sdk/cos-wx-sdk-v5/dist", n(n.s = 8);
    }([function(e2, t2, n) {
      function i(e3, t3) {
        var n2 = "undefined" != typeof Symbol && e3[Symbol.iterator] || e3["@@iterator"];
        if (!n2) {
          if (Array.isArray(e3) || (n2 = function(e4, t4) {
            if (!e4)
              return;
            if ("string" == typeof e4)
              return o2(e4, t4);
            var n3 = Object.prototype.toString.call(e4).slice(8, -1);
            "Object" === n3 && e4.constructor && (n3 = e4.constructor.name);
            if ("Map" === n3 || "Set" === n3)
              return Array.from(e4);
            if ("Arguments" === n3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n3))
              return o2(e4, t4);
          }(e3)) || t3 && e3 && "number" == typeof e3.length) {
            n2 && (e3 = n2);
            var i2 = 0, a2 = function() {
            };
            return { s: a2, n: function() {
              return i2 >= e3.length ? { done: true } : { done: false, value: e3[i2++] };
            }, e: function(e4) {
              throw e4;
            }, f: a2 };
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var r2, s2 = true, c2 = false;
        return { s: function() {
          n2 = n2.call(e3);
        }, n: function() {
          var e4 = n2.next();
          return s2 = e4.done, e4;
        }, e: function(e4) {
          c2 = true, r2 = e4;
        }, f: function() {
          try {
            s2 || null == n2.return || n2.return();
          } finally {
            if (c2)
              throw r2;
          }
        } };
      }
      function o2(e3, t3) {
        (null == t3 || t3 > e3.length) && (t3 = e3.length);
        for (var n2 = 0, i2 = new Array(t3); n2 < t3; n2++)
          i2[n2] = e3[n2];
        return i2;
      }
      function a() {
        /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
        a = function() {
          return t3;
        };
        var e3, t3 = {}, n2 = Object.prototype, i2 = n2.hasOwnProperty, o3 = Object.defineProperty || function(e4, t4, n3) {
          e4[t4] = n3.value;
        }, r2 = "function" == typeof Symbol ? Symbol : {}, c2 = r2.iterator || "@@iterator", l2 = r2.asyncIterator || "@@asyncIterator", p2 = r2.toStringTag || "@@toStringTag";
        function u2(e4, t4, n3) {
          return Object.defineProperty(e4, t4, { value: n3, enumerable: true, configurable: true, writable: true }), e4[t4];
        }
        try {
          u2({}, "");
        } catch (e4) {
          u2 = function(e5, t4, n3) {
            return e5[t4] = n3;
          };
        }
        function d2(e4, t4, n3, i3) {
          var a2 = t4 && t4.prototype instanceof x2 ? t4 : x2, r3 = Object.create(a2.prototype), s2 = new j2(i3 || []);
          return o3(r3, "_invoke", { value: A2(e4, n3, s2) }), r3;
        }
        function f3(e4, t4, n3) {
          try {
            return { type: "normal", arg: e4.call(t4, n3) };
          } catch (e5) {
            return { type: "throw", arg: e5 };
          }
        }
        t3.wrap = d2;
        var m2 = "suspendedStart", h2 = "suspendedYield", g2 = "executing", v2 = "completed", y2 = {};
        function x2() {
        }
        function k2() {
        }
        function b2() {
        }
        var C2 = {};
        u2(C2, c2, function() {
          return this;
        });
        var S2 = Object.getPrototypeOf, w2 = S2 && S2(S2(I2([])));
        w2 && w2 !== n2 && i2.call(w2, c2) && (C2 = w2);
        var T2 = b2.prototype = x2.prototype = Object.create(C2);
        function R2(e4) {
          ["next", "throw", "return"].forEach(function(t4) {
            u2(e4, t4, function(e5) {
              return this._invoke(t4, e5);
            });
          });
        }
        function B2(e4, t4) {
          function n3(o4, a3, r3, c3) {
            var l3 = f3(e4[o4], e4, a3);
            if ("throw" !== l3.type) {
              var p3 = l3.arg, u3 = p3.value;
              return u3 && "object" == s(u3) && i2.call(u3, "__await") ? t4.resolve(u3.__await).then(function(e5) {
                n3("next", e5, r3, c3);
              }, function(e5) {
                n3("throw", e5, r3, c3);
              }) : t4.resolve(u3).then(function(e5) {
                p3.value = e5, r3(p3);
              }, function(e5) {
                return n3("throw", e5, r3, c3);
              });
            }
            c3(l3.arg);
          }
          var a2;
          o3(this, "_invoke", { value: function(e5, i3) {
            function o4() {
              return new t4(function(t5, o5) {
                n3(e5, i3, t5, o5);
              });
            }
            return a2 = a2 ? a2.then(o4, o4) : o4();
          } });
        }
        function A2(t4, n3, i3) {
          var o4 = m2;
          return function(a2, r3) {
            if (o4 === g2)
              throw Error("Generator is already running");
            if (o4 === v2) {
              if ("throw" === a2)
                throw r3;
              return { value: e3, done: true };
            }
            for (i3.method = a2, i3.arg = r3; ; ) {
              var s2 = i3.delegate;
              if (s2) {
                var c3 = P2(s2, i3);
                if (c3) {
                  if (c3 === y2)
                    continue;
                  return c3;
                }
              }
              if ("next" === i3.method)
                i3.sent = i3._sent = i3.arg;
              else if ("throw" === i3.method) {
                if (o4 === m2)
                  throw o4 = v2, i3.arg;
                i3.dispatchException(i3.arg);
              } else
                "return" === i3.method && i3.abrupt("return", i3.arg);
              o4 = g2;
              var l3 = f3(t4, n3, i3);
              if ("normal" === l3.type) {
                if (o4 = i3.done ? v2 : h2, l3.arg === y2)
                  continue;
                return { value: l3.arg, done: i3.done };
              }
              "throw" === l3.type && (o4 = v2, i3.method = "throw", i3.arg = l3.arg);
            }
          };
        }
        function P2(t4, n3) {
          var i3 = n3.method, o4 = t4.iterator[i3];
          if (o4 === e3)
            return n3.delegate = null, "throw" === i3 && t4.iterator.return && (n3.method = "return", n3.arg = e3, P2(t4, n3), "throw" === n3.method) || "return" !== i3 && (n3.method = "throw", n3.arg = new TypeError("The iterator does not provide a '" + i3 + "' method")), y2;
          var a2 = f3(o4, t4.iterator, n3.arg);
          if ("throw" === a2.type)
            return n3.method = "throw", n3.arg = a2.arg, n3.delegate = null, y2;
          var r3 = a2.arg;
          return r3 ? r3.done ? (n3[t4.resultName] = r3.value, n3.next = t4.nextLoc, "return" !== n3.method && (n3.method = "next", n3.arg = e3), n3.delegate = null, y2) : r3 : (n3.method = "throw", n3.arg = new TypeError("iterator result is not an object"), n3.delegate = null, y2);
        }
        function E3(e4) {
          var t4 = { tryLoc: e4[0] };
          1 in e4 && (t4.catchLoc = e4[1]), 2 in e4 && (t4.finallyLoc = e4[2], t4.afterLoc = e4[3]), this.tryEntries.push(t4);
        }
        function O2(e4) {
          var t4 = e4.completion || {};
          t4.type = "normal", delete t4.arg, e4.completion = t4;
        }
        function j2(e4) {
          this.tryEntries = [{ tryLoc: "root" }], e4.forEach(E3, this), this.reset(true);
        }
        function I2(t4) {
          if (t4 || "" === t4) {
            var n3 = t4[c2];
            if (n3)
              return n3.call(t4);
            if ("function" == typeof t4.next)
              return t4;
            if (!isNaN(t4.length)) {
              var o4 = -1, a2 = function n4() {
                for (; ++o4 < t4.length; )
                  if (i2.call(t4, o4))
                    return n4.value = t4[o4], n4.done = false, n4;
                return n4.value = e3, n4.done = true, n4;
              };
              return a2.next = a2;
            }
          }
          throw new TypeError(s(t4) + " is not iterable");
        }
        return k2.prototype = b2, o3(T2, "constructor", { value: b2, configurable: true }), o3(b2, "constructor", { value: k2, configurable: true }), k2.displayName = u2(b2, p2, "GeneratorFunction"), t3.isGeneratorFunction = function(e4) {
          var t4 = "function" == typeof e4 && e4.constructor;
          return !!t4 && (t4 === k2 || "GeneratorFunction" === (t4.displayName || t4.name));
        }, t3.mark = function(e4) {
          return Object.setPrototypeOf ? Object.setPrototypeOf(e4, b2) : (e4.__proto__ = b2, u2(e4, p2, "GeneratorFunction")), e4.prototype = Object.create(T2), e4;
        }, t3.awrap = function(e4) {
          return { __await: e4 };
        }, R2(B2.prototype), u2(B2.prototype, l2, function() {
          return this;
        }), t3.AsyncIterator = B2, t3.async = function(e4, n3, i3, o4, a2) {
          void 0 === a2 && (a2 = Promise);
          var r3 = new B2(d2(e4, n3, i3, o4), a2);
          return t3.isGeneratorFunction(n3) ? r3 : r3.next().then(function(e5) {
            return e5.done ? e5.value : r3.next();
          });
        }, R2(T2), u2(T2, p2, "Generator"), u2(T2, c2, function() {
          return this;
        }), u2(T2, "toString", function() {
          return "[object Generator]";
        }), t3.keys = function(e4) {
          var t4 = Object(e4), n3 = [];
          for (var i3 in t4)
            n3.push(i3);
          return n3.reverse(), function e5() {
            for (; n3.length; ) {
              var i4 = n3.pop();
              if (i4 in t4)
                return e5.value = i4, e5.done = false, e5;
            }
            return e5.done = true, e5;
          };
        }, t3.values = I2, j2.prototype = { constructor: j2, reset: function(t4) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = e3, this.done = false, this.delegate = null, this.method = "next", this.arg = e3, this.tryEntries.forEach(O2), !t4)
            for (var n3 in this)
              "t" === n3.charAt(0) && i2.call(this, n3) && !isNaN(+n3.slice(1)) && (this[n3] = e3);
        }, stop: function() {
          this.done = true;
          var e4 = this.tryEntries[0].completion;
          if ("throw" === e4.type)
            throw e4.arg;
          return this.rval;
        }, dispatchException: function(t4) {
          if (this.done)
            throw t4;
          var n3 = this;
          function o4(i3, o5) {
            return s2.type = "throw", s2.arg = t4, n3.next = i3, o5 && (n3.method = "next", n3.arg = e3), !!o5;
          }
          for (var a2 = this.tryEntries.length - 1; a2 >= 0; --a2) {
            var r3 = this.tryEntries[a2], s2 = r3.completion;
            if ("root" === r3.tryLoc)
              return o4("end");
            if (r3.tryLoc <= this.prev) {
              var c3 = i2.call(r3, "catchLoc"), l3 = i2.call(r3, "finallyLoc");
              if (c3 && l3) {
                if (this.prev < r3.catchLoc)
                  return o4(r3.catchLoc, true);
                if (this.prev < r3.finallyLoc)
                  return o4(r3.finallyLoc);
              } else if (c3) {
                if (this.prev < r3.catchLoc)
                  return o4(r3.catchLoc, true);
              } else {
                if (!l3)
                  throw Error("try statement without catch or finally");
                if (this.prev < r3.finallyLoc)
                  return o4(r3.finallyLoc);
              }
            }
          }
        }, abrupt: function(e4, t4) {
          for (var n3 = this.tryEntries.length - 1; n3 >= 0; --n3) {
            var o4 = this.tryEntries[n3];
            if (o4.tryLoc <= this.prev && i2.call(o4, "finallyLoc") && this.prev < o4.finallyLoc) {
              var a2 = o4;
              break;
            }
          }
          a2 && ("break" === e4 || "continue" === e4) && a2.tryLoc <= t4 && t4 <= a2.finallyLoc && (a2 = null);
          var r3 = a2 ? a2.completion : {};
          return r3.type = e4, r3.arg = t4, a2 ? (this.method = "next", this.next = a2.finallyLoc, y2) : this.complete(r3);
        }, complete: function(e4, t4) {
          if ("throw" === e4.type)
            throw e4.arg;
          return "break" === e4.type || "continue" === e4.type ? this.next = e4.arg : "return" === e4.type ? (this.rval = this.arg = e4.arg, this.method = "return", this.next = "end") : "normal" === e4.type && t4 && (this.next = t4), y2;
        }, finish: function(e4) {
          for (var t4 = this.tryEntries.length - 1; t4 >= 0; --t4) {
            var n3 = this.tryEntries[t4];
            if (n3.finallyLoc === e4)
              return this.complete(n3.completion, n3.afterLoc), O2(n3), y2;
          }
        }, catch: function(e4) {
          for (var t4 = this.tryEntries.length - 1; t4 >= 0; --t4) {
            var n3 = this.tryEntries[t4];
            if (n3.tryLoc === e4) {
              var i3 = n3.completion;
              if ("throw" === i3.type) {
                var o4 = i3.arg;
                O2(n3);
              }
              return o4;
            }
          }
          throw Error("illegal catch attempt");
        }, delegateYield: function(t4, n3, i3) {
          return this.delegate = { iterator: I2(t4), resultName: n3, nextLoc: i3 }, "next" === this.method && (this.arg = e3), y2;
        } }, t3;
      }
      function r(e3, t3, n2, i2, o3, a2, r2) {
        try {
          var s2 = e3[a2](r2), c2 = s2.value;
        } catch (e4) {
          return void n2(e4);
        }
        s2.done ? t3(c2) : Promise.resolve(c2).then(i2, o3);
      }
      function s(e3) {
        return s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e4) {
          return typeof e4;
        } : function(e4) {
          return e4 && "function" == typeof Symbol && e4.constructor === Symbol && e4 !== Symbol.prototype ? "symbol" : typeof e4;
        }, s(e3);
      }
      var c = n(10), l = n(13), p = n(14), u = p.btoa, d = wx$1.getFileSystemManager(), f2 = n(2), m = n(15), h = m.XMLParser, g = m.XMLBuilder, v = new h({ ignoreDeclaration: true, ignoreAttributes: true, parseTagValue: false, trimValues: false }), y = new g(), x = function e3(t3) {
        if (A(t3))
          for (var n2 in t3) {
            var i2 = t3[n2];
            "string" == typeof i2 ? "#text" === n2 && delete t3[n2] : Array.isArray(i2) ? i2.forEach(function(t4) {
              e3(t4);
            }) : A(i2) && e3(i2);
          }
      };
      function k(e3) {
        return encodeURIComponent(e3).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A");
      }
      function b(e3, t3) {
        var n2 = [];
        for (var i2 in e3)
          e3.hasOwnProperty(i2) && n2.push(t3 ? k(i2).toLowerCase() : i2);
        return n2.sort(function(e4, t4) {
          return (e4 = e4.toLowerCase()) === (t4 = t4.toLowerCase()) ? 0 : e4 > t4 ? 1 : -1;
        });
      }
      var C = ["cache-control", "content-disposition", "content-encoding", "content-length", "content-md5", "content-type", "expect", "expires", "host", "if-match", "if-modified-since", "if-none-match", "if-unmodified-since", "origin", "range", "transfer-encoding", "pic-operations"], S = function() {
      }, w = function(e3) {
        var t3 = {};
        for (var n2 in e3)
          e3.hasOwnProperty(n2) && void 0 !== e3[n2] && null !== e3[n2] && (t3[n2] = e3[n2]);
        return t3;
      };
      function T(e3) {
        return E2(e3, function(e4) {
          return "object" === s(e4) && null !== e4 ? T(e4) : e4;
        });
      }
      function R(e3, t3) {
        return P(t3, function(n2, i2) {
          e3[i2] = t3[i2];
        }), e3;
      }
      function B(e3) {
        return e3 instanceof Array;
      }
      function A(e3) {
        return "[object Object]" === Object.prototype.toString.call(e3);
      }
      function P(e3, t3) {
        for (var n2 in e3)
          e3.hasOwnProperty(n2) && t3(e3[n2], n2);
      }
      function E2(e3, t3) {
        var n2 = B(e3) ? [] : {};
        for (var i2 in e3)
          e3.hasOwnProperty(i2) && (n2[i2] = t3(e3[i2], i2));
        return n2;
      }
      var O = function(e3, t3) {
        if (t3 = R({}, t3), "getAuth" !== e3 && "getV4Auth" !== e3 && "getObjectUrl" !== e3) {
          var n2 = t3.Headers || {};
          if (t3 && "object" === s(t3)) {
            !function() {
              for (var e4 in t3)
                t3.hasOwnProperty(e4) && e4.indexOf("x-cos-") > -1 && (n2[e4] = t3[e4]);
            }();
            U.each({ "x-cos-mfa": "MFA", "Content-MD5": "ContentMD5", "Content-Length": "ContentLength", "Content-Type": "ContentType", Expect: "Expect", Expires: "Expires", "Cache-Control": "CacheControl", "Content-Disposition": "ContentDisposition", "Content-Encoding": "ContentEncoding", Range: "Range", "If-Modified-Since": "IfModifiedSince", "If-Unmodified-Since": "IfUnmodifiedSince", "If-Match": "IfMatch", "If-None-Match": "IfNoneMatch", "x-cos-copy-source": "CopySource", "x-cos-copy-source-Range": "CopySourceRange", "x-cos-metadata-directive": "MetadataDirective", "x-cos-copy-source-If-Modified-Since": "CopySourceIfModifiedSince", "x-cos-copy-source-If-Unmodified-Since": "CopySourceIfUnmodifiedSince", "x-cos-copy-source-If-Match": "CopySourceIfMatch", "x-cos-copy-source-If-None-Match": "CopySourceIfNoneMatch", "x-cos-acl": "ACL", "x-cos-grant-read": "GrantRead", "x-cos-grant-write": "GrantWrite", "x-cos-grant-full-control": "GrantFullControl", "x-cos-grant-read-acp": "GrantReadAcp", "x-cos-grant-write-acp": "GrantWriteAcp", "x-cos-storage-class": "StorageClass", "x-cos-traffic-limit": "TrafficLimit", "x-cos-mime-limit": "MimeLimit", "x-cos-forbid-overwrite": "ForbidOverwrite", "x-cos-server-side-encryption-customer-algorithm": "SSECustomerAlgorithm", "x-cos-server-side-encryption-customer-key": "SSECustomerKey", "x-cos-server-side-encryption-customer-key-MD5": "SSECustomerKeyMD5", "x-cos-server-side-encryption": "ServerSideEncryption", "x-cos-server-side-encryption-cos-kms-key-id": "SSEKMSKeyId", "x-cos-server-side-encryption-context": "SSEContext", "Pic-Operations": "PicOperations" }, function(e4, i2) {
              void 0 !== t3[e4] && (n2[i2] = t3[e4]);
            }), t3.Headers = w(n2);
          }
        }
        return t3;
      }, j = function(e3) {
        return new Promise(function(t3, n2) {
          d.readFile({ filePath: e3, success: function(e4) {
            t3(e4.data);
          }, fail: function(e4) {
            n2((null == e4 ? void 0 : e4.errMsg) || "");
          } });
        });
      }, I = function() {
        var e3, t3 = (e3 = a().mark(function e4(t4, n2, i2) {
          return a().wrap(function(e5) {
            for (; ; )
              switch (e5.prev = e5.next) {
                case 0:
                  if ("postObject" !== t4) {
                    e5.next = 4;
                    break;
                  }
                  i2(), e5.next = 21;
                  break;
                case 4:
                  if ("putObject" !== t4) {
                    e5.next = 20;
                    break;
                  }
                  if (void 0 !== n2.Body || !n2.FilePath) {
                    e5.next = 17;
                    break;
                  }
                  return e5.prev = 6, e5.next = 9, j(n2.FilePath);
                case 9:
                  n2.Body = e5.sent, e5.next = 17;
                  break;
                case 12:
                  return e5.prev = 12, e5.t0 = e5.catch(6), n2.Body = void 0, i2({ error: "readFile error, ".concat(e5.t0) }), e5.abrupt("return");
                case 17:
                  void 0 !== n2.Body ? (n2.ContentLength = n2.Body.byteLength, i2(null, n2.ContentLength)) : i2({ error: "missing param Body" }), e5.next = 21;
                  break;
                case 20:
                  n2.FilePath ? d.stat({ path: n2.FilePath, success: function(e6) {
                    var t5 = e6.stats;
                    n2.FileStat = t5, n2.FileStat.FilePath = n2.FilePath;
                    var o3 = t5.isDirectory() ? 0 : t5.size;
                    n2.ContentLength = o3 = o3 || 0, i2(null, o3);
                  }, fail: function(e6) {
                    i2(e6);
                  } }) : i2({ error: "missing param FilePath" });
                case 21:
                case "end":
                  return e5.stop();
              }
          }, e4, null, [[6, 12]]);
        }), function() {
          var t4 = this, n2 = arguments;
          return new Promise(function(i2, o3) {
            var a2 = e3.apply(t4, n2);
            function s2(e4) {
              r(a2, i2, o3, s2, c2, "next", e4);
            }
            function c2(e4) {
              r(a2, i2, o3, s2, c2, "throw", e4);
            }
            s2(void 0);
          });
        });
        return function(e4, n2, i2) {
          return t3.apply(this, arguments);
        };
      }(), _ = function(e3) {
        return Date.now() + (e3 || 0);
      }, N = function(e3, t3) {
        if (!e3 || !t3)
          return -1;
        e3 = e3.split("."), t3 = t3.split(".");
        for (var n2 = Math.max(e3.length, t3.length); e3.length < n2; )
          e3.push("0");
        for (; t3.length < n2; )
          t3.push("0");
        for (var i2 = 0; i2 < n2; i2++) {
          var o3 = parseInt(e3[i2]), a2 = parseInt(t3[i2]);
          if (o3 > a2)
            return 1;
          if (o3 < a2)
            return -1;
        }
        return 0;
      }, L = function() {
        var e3 = {}, t3 = {};
        wx$1.canIUse("getAppBaseInfo") && (e3 = wx$1.getAppBaseInfo() || {}), wx$1.canIUse("getDeviceInfo") && (t3 = wx$1.getDeviceInfo() || {});
        var n2 = e3.SDKVersion, i2 = (t3.platform, N(n2, "2.10.0") >= 0);
        return function() {
          return i2;
        };
      }(), U = { noop: S, formatParams: O, apiWrapper: function(e3, t3) {
        return function(n2, i2) {
          var o3, a2 = this;
          if ("function" == typeof n2 && (i2 = n2, n2 = {}), n2 = O(e3, n2), a2.options.EnableReporter)
            if ("sliceUploadFile" === n2.calledBySdk || "sliceCopyFile" === n2.calledBySdk)
              o3 = n2.tracker && n2.tracker.generateSubTracker({ apiName: e3 });
            else if (["uploadFile", "uploadFiles"].includes(e3))
              o3 = null;
            else {
              var r2 = 0;
              n2.Body && (r2 = "string" == typeof n2.Body ? n2.Body.length : n2.Body.size || n2.Body.byteLength || 0);
              var s2 = a2.options.UseAccelerate || "string" == typeof a2.options.Domain && a2.options.Domain.includes("accelerate.");
              o3 = new f2({ Beacon: a2.options.BeaconReporter, clsReporter: a2.options.ClsReporter, bucket: n2.Bucket, region: n2.Region, apiName: e3, realApi: e3, accelerate: s2, fileKey: n2.Key, fileSize: r2, deepTracker: a2.options.DeepTracker, customId: a2.options.CustomId, delay: a2.options.TrackerDelay });
            }
          n2.tracker = o3;
          var c2 = function(e4) {
            return e4 && e4.headers && (e4.headers["x-ci-request-id"] && (e4.RequestId = e4.headers["x-ci-request-id"]), e4.headers["x-cos-request-id"] && (e4.RequestId = e4.headers["x-cos-request-id"]), e4.headers["x-cos-version-id"] && (e4.VersionId = e4.headers["x-cos-version-id"]), e4.headers["x-cos-delete-marker"] && (e4.DeleteMarker = e4.headers["x-cos-delete-marker"])), e4;
          }, l2 = function(e4, t4) {
            o3 && o3.report(e4, t4), i2 && i2(c2(e4), c2(t4));
          }, p2 = function() {
            if ("getService" !== e3 && "abortUploadTask" !== e3) {
              var t4 = function(e4, t5) {
                var n3 = t5.Bucket, i3 = t5.Region, o4 = t5.Key;
                if (e4.indexOf("Bucket") > -1 || "deleteMultipleObject" === e4 || "multipartList" === e4 || "listObjectVersions" === e4) {
                  if (!n3)
                    return "Bucket";
                  if (!i3)
                    return "Region";
                } else if (e4.indexOf("Object") > -1 || e4.indexOf("multipart") > -1 || "sliceUploadFile" === e4 || "abortUploadTask" === e4 || "uploadFile" === e4) {
                  if (!n3)
                    return "Bucket";
                  if (!i3)
                    return "Region";
                  if (!o4)
                    return "Key";
                }
                return false;
              }(e3, n2);
              if (t4)
                return "missing param " + t4;
              if (n2.Region) {
                if (n2.Region.indexOf("cos.") > -1)
                  return 'param Region should not be start with "cos."';
                if (!/^([a-z\d-]+)$/.test(n2.Region))
                  return "Region format error.";
                !a2.options.CompatibilityMode && -1 === n2.Region.indexOf("-") && "yfb" !== n2.Region && "default" !== n2.Region && n2.Region;
              }
              if (n2.Bucket) {
                if (!/^([a-z\d-]+)-(\d+)$/.test(n2.Bucket))
                  if (n2.AppId)
                    n2.Bucket = n2.Bucket + "-" + n2.AppId;
                  else {
                    if (!a2.options.AppId)
                      return 'Bucket should format as "test-1250000000".';
                    n2.Bucket = n2.Bucket + "-" + a2.options.AppId;
                  }
                n2.AppId && delete n2.AppId;
              }
              n2.Key && "/" === n2.Key.substr(0, 1) && (n2.Key = n2.Key.substr(1));
            }
          }(), u2 = ["getAuth", "getObjectUrl"].includes(e3);
          if (!u2 && !i2)
            return new Promise(function(e4, o4) {
              if (i2 = function(t4, n3) {
                t4 ? o4(t4) : e4(n3);
              }, p2)
                return l2({ error: p2 });
              t3.call(a2, n2, l2);
            });
          if (p2)
            return l2({ error: p2 });
          var d2 = t3.call(a2, n2, l2);
          return u2 ? d2 : void 0;
        };
      }, xml2json: function(e3) {
        var t3 = v.parse(e3);
        return x(t3), t3;
      }, json2xml: function(e3) {
        return y.build(e3);
      }, md5: c, clearKey: w, fileSlice: function(e3, t3, n2, i2) {
        e3 ? d.readFile({ filePath: e3, position: t3, length: n2 - t3, success: function(e4) {
          i2(e4.data);
        }, fail: function() {
          i2(null);
        } }) : i2(null);
      }, getBodyMd5: function(e3, t3, n2) {
        n2 = n2 || S, e3 && t3 && t3 instanceof ArrayBuffer ? U.getFileMd5(t3, function(e4, t4) {
          n2(t4);
        }) : n2();
      }, getFileMd5: function(e3, t3) {
        var n2 = c(e3);
        return t3 && t3(n2), n2;
      }, binaryBase64: function(e3) {
        var t3, n2, i2, o3 = "";
        for (t3 = 0, n2 = e3.length / 2; t3 < n2; t3++)
          i2 = parseInt(e3[2 * t3] + e3[2 * t3 + 1], 16), o3 += String.fromCharCode(i2);
        return u(o3);
      }, extend: R, isArray: B, isInArray: function(e3, t3) {
        for (var n2 = false, i2 = 0; i2 < e3.length; i2++)
          if (t3 === e3[i2]) {
            n2 = true;
            break;
          }
        return n2;
      }, makeArray: function(e3) {
        return B(e3) ? e3 : [e3];
      }, each: P, map: E2, filter: function(e3, t3) {
        var n2 = B(e3), i2 = n2 ? [] : {};
        for (var o3 in e3)
          e3.hasOwnProperty(o3) && t3(e3[o3], o3) && (n2 ? i2.push(e3[o3]) : i2[o3] = e3[o3]);
        return i2;
      }, clone: T, attr: function(e3, t3, n2) {
        return e3 && t3 in e3 ? e3[t3] : n2;
      }, uuid: function() {
        var e3 = function() {
          return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
        };
        return e3() + e3() + "-" + e3() + "-" + e3() + "-" + e3() + "-" + e3() + e3() + e3();
      }, camSafeUrlEncode: k, throttleOnProgress: function(e3, t3) {
        var n2, i2, o3 = this, a2 = 0, r2 = 0, s2 = Date.now();
        function c2() {
          if (i2 = 0, t3 && "function" == typeof t3) {
            n2 = Date.now();
            var o4, c3 = Math.max(0, Math.round((r2 - a2) / ((n2 - s2) / 1e3) * 100) / 100) || 0;
            o4 = 0 === r2 && 0 === e3 ? 1 : Math.floor(r2 / e3 * 100) / 100 || 0, s2 = n2, a2 = r2;
            try {
              t3({ loaded: r2, total: e3, speed: c3, percent: o4 });
            } catch (e4) {
            }
          }
        }
        return function(t4, n3) {
          if (t4 && (r2 = t4.loaded, e3 = t4.total), n3)
            clearTimeout(i2), c2();
          else {
            if (i2)
              return;
            i2 = setTimeout(c2, o3.options.ProgressInterval);
          }
        };
      }, getFileSize: I, getFileSizeByPath: function(e3) {
        return new Promise(function(t3, n2) {
          d.stat({ path: e3, success: function(e4) {
            var n3 = e4.stats, i2 = n3.isDirectory() ? 0 : n3.size;
            t3(i2);
          }, fail: function(e4) {
            n2((null == e4 ? void 0 : e4.errMsg) || "");
          } });
        });
      }, getSkewTime: _, obj2str: function(e3, t3) {
        var n2, i2, o3, a2 = [], r2 = b(e3);
        for (n2 = 0; n2 < r2.length; n2++)
          o3 = void 0 === e3[i2 = r2[n2]] || null === e3[i2] ? "" : "" + e3[i2], i2 = t3 ? k(i2).toLowerCase() : k(i2), o3 = k(o3) || "", a2.push(i2 + "=" + o3);
        return a2.join("&");
      }, getAuth: function(e3) {
        var t3, n2 = (e3 = e3 || {}).SecretId, i2 = e3.SecretKey, o3 = e3.KeyTime, a2 = (e3.method || e3.Method || "get").toLowerCase(), r2 = T(e3.Query || e3.params || {}), s2 = function(e4) {
          var t4 = {};
          for (var n3 in e4) {
            var i3 = n3.toLowerCase();
            (i3.indexOf("x-cos-") > -1 || i3.indexOf("x-ci-") > -1 || C.indexOf(i3) > -1) && (t4[n3] = e4[n3]);
          }
          return t4;
        }(T(e3.Headers || e3.headers || {})), c2 = e3.Key || "";
        e3.UseRawKey ? t3 = e3.Pathname || e3.pathname || "/" + c2 : 0 !== (t3 = e3.Pathname || e3.pathname || c2).indexOf("/") && (t3 = "/" + t3);
        var p2 = false !== e3.ForceSignHost;
        if (!s2.Host && !s2.host && e3.Bucket && e3.Region && p2 && (s2.Host = e3.Bucket + ".cos." + e3.Region + ".myqcloud.com"), n2 && i2) {
          var u2 = Math.round(_(e3.SystemClockOffset) / 1e3) - 1, d2 = u2, f3 = e3.Expires || e3.expires;
          d2 += void 0 === f3 ? 900 : 1 * f3 || 0;
          var m2 = n2, h2 = o3 || u2 + ";" + d2, g2 = o3 || u2 + ";" + d2, v2 = b(s2, true).join(";").toLowerCase(), y2 = b(r2, true).join(";").toLowerCase(), x2 = l.HmacSHA1(g2, i2).toString(), k2 = [a2, t3, U.obj2str(r2, true), U.obj2str(s2, true), ""].join("\n"), S2 = ["sha1", h2, l.SHA1(k2).toString(), ""].join("\n");
          return ["q-sign-algorithm=sha1", "q-ak=" + m2, "q-sign-time=" + h2, "q-key-time=" + g2, "q-header-list=" + v2, "q-url-param-list=" + y2, "q-signature=" + l.HmacSHA1(S2, x2).toString()].join("&");
        }
      }, compareVersion: N, canFileSlice: L, isCIHost: function(e3) {
        return /^https?:\/\/([^/]+\.)?ci\.[^/]+/.test(e3);
      }, error: function(e3, t3) {
        var n2 = e3;
        return e3.message = e3.message || null, "string" == typeof t3 ? (e3.error = t3, e3.message = t3) : "object" === s(t3) && null !== t3 && (R(e3, t3), (t3.code || t3.name) && (e3.code = t3.code || t3.name), t3.message && (e3.message = t3.message), t3.stack && (e3.stack = t3.stack)), "function" == typeof Object.defineProperty && (Object.defineProperty(e3, "name", { writable: true, enumerable: false }), Object.defineProperty(e3, "message", { enumerable: true })), e3.name = t3 && t3.name || e3.name || e3.code || "Error", e3.code || (e3.code = e3.name), e3.error || (e3.error = T(n2)), e3;
      }, getSourceParams: function(e3) {
        var t3 = this.options.CopySourceParser;
        if (t3)
          return t3(e3);
        var n2 = e3.match(/^([^.]+-\d+)\.cos(v6|-cdc|-internal)?\.([^.]+)\.((myqcloud\.com)|(tencentcos\.cn))\/(.+)$/);
        return n2 ? { Bucket: n2[1], Region: n2[3], Key: n2[7] } : null;
      }, encodeBase64: function(e3, t3) {
        var n2 = p.encode(e3);
        return t3 && (n2 = n2.replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "")), n2;
      }, simplifyPath: function(e3) {
        var t3, n2 = [], o3 = i(e3.split("/"));
        try {
          for (o3.s(); !(t3 = o3.n()).done; ) {
            var a2 = t3.value;
            ".." === a2 ? n2.length && n2.pop() : a2.length && "." !== a2 && n2.push(a2);
          }
        } catch (e4) {
          o3.e(e4);
        } finally {
          o3.f();
        }
        return "/" + n2.join("/");
      }, arrayBufferToString: function(e3) {
        return new TextDecoder("utf-8").decode(e3);
      }, parseResBody: function(e3) {
        var t3;
        if (e3 && "string" == typeof e3) {
          var n2 = e3.trim(), i2 = 0 === n2.indexOf("<"), o3 = 0 === n2.indexOf("{");
          if (i2)
            t3 = U.xml2json(e3) || {};
          else if (o3)
            try {
              var a2 = e3.replace(/\n/g, " "), r2 = JSON.parse(a2);
              t3 = "[object Object]" === Object.prototype.toString.call(r2) ? r2 : e3;
            } catch (n3) {
              t3 = e3;
            }
          else
            t3 = e3;
        } else
          t3 = e3 || {};
        return t3;
      } };
      e2.exports = U;
    }, function(e2, t2, n) {
      const i = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", o2 = "[" + i + "][" + (i + "\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040") + "]*", a = new RegExp("^" + o2 + "$");
      t2.isExist = function(e3) {
        return void 0 !== e3;
      }, t2.isEmptyObject = function(e3) {
        return 0 === Object.keys(e3).length;
      }, t2.merge = function(e3, t3, n2) {
        if (t3) {
          const i2 = Object.keys(t3), o3 = i2.length;
          for (let a2 = 0; a2 < o3; a2++)
            e3[i2[a2]] = "strict" === n2 ? [t3[i2[a2]]] : t3[i2[a2]];
        }
      }, t2.getValue = function(e3) {
        return t2.isExist(e3) ? e3 : "";
      }, t2.isName = function(e3) {
        const t3 = a.exec(e3);
        return !(null == t3);
      }, t2.getAllMatches = function(e3, t3) {
        const n2 = [];
        let i2 = t3.exec(e3);
        for (; i2; ) {
          const o3 = [];
          o3.startIndex = t3.lastIndex - i2[0].length;
          const a2 = i2.length;
          for (let e4 = 0; e4 < a2; e4++)
            o3.push(i2[e4]);
          n2.push(o3), i2 = t3.exec(e3);
        }
        return n2;
      }, t2.nameRegexp = o2;
    }, function(e2, t2, n) {
      function i(e3) {
        return i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e4) {
          return typeof e4;
        } : function(e4) {
          return e4 && "function" == typeof Symbol && e4.constructor === Symbol && e4 !== Symbol.prototype ? "symbol" : typeof e4;
        }, i(e3);
      }
      function o2() {
        /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
        o2 = function() {
          return t3;
        };
        var e3, t3 = {}, n2 = Object.prototype, a2 = n2.hasOwnProperty, r2 = Object.defineProperty || function(e4, t4, n3) {
          e4[t4] = n3.value;
        }, s2 = "function" == typeof Symbol ? Symbol : {}, c2 = s2.iterator || "@@iterator", l2 = s2.asyncIterator || "@@asyncIterator", p2 = s2.toStringTag || "@@toStringTag";
        function u2(e4, t4, n3) {
          return Object.defineProperty(e4, t4, { value: n3, enumerable: true, configurable: true, writable: true }), e4[t4];
        }
        try {
          u2({}, "");
        } catch (e4) {
          u2 = function(e5, t4, n3) {
            return e5[t4] = n3;
          };
        }
        function d2(e4, t4, n3, i2) {
          var o3 = t4 && t4.prototype instanceof x2 ? t4 : x2, a3 = Object.create(o3.prototype), s3 = new j(i2 || []);
          return r2(a3, "_invoke", { value: A(e4, n3, s3) }), a3;
        }
        function f3(e4, t4, n3) {
          try {
            return { type: "normal", arg: e4.call(t4, n3) };
          } catch (e5) {
            return { type: "throw", arg: e5 };
          }
        }
        t3.wrap = d2;
        var m2 = "suspendedStart", h2 = "suspendedYield", g2 = "executing", v2 = "completed", y2 = {};
        function x2() {
        }
        function k() {
        }
        function b() {
        }
        var C = {};
        u2(C, c2, function() {
          return this;
        });
        var S = Object.getPrototypeOf, w = S && S(S(I([])));
        w && w !== n2 && a2.call(w, c2) && (C = w);
        var T = b.prototype = x2.prototype = Object.create(C);
        function R(e4) {
          ["next", "throw", "return"].forEach(function(t4) {
            u2(e4, t4, function(e5) {
              return this._invoke(t4, e5);
            });
          });
        }
        function B(e4, t4) {
          function n3(o4, r3, s3, c3) {
            var l3 = f3(e4[o4], e4, r3);
            if ("throw" !== l3.type) {
              var p3 = l3.arg, u3 = p3.value;
              return u3 && "object" == i(u3) && a2.call(u3, "__await") ? t4.resolve(u3.__await).then(function(e5) {
                n3("next", e5, s3, c3);
              }, function(e5) {
                n3("throw", e5, s3, c3);
              }) : t4.resolve(u3).then(function(e5) {
                p3.value = e5, s3(p3);
              }, function(e5) {
                return n3("throw", e5, s3, c3);
              });
            }
            c3(l3.arg);
          }
          var o3;
          r2(this, "_invoke", { value: function(e5, i2) {
            function a3() {
              return new t4(function(t5, o4) {
                n3(e5, i2, t5, o4);
              });
            }
            return o3 = o3 ? o3.then(a3, a3) : a3();
          } });
        }
        function A(t4, n3, i2) {
          var o3 = m2;
          return function(a3, r3) {
            if (o3 === g2)
              throw Error("Generator is already running");
            if (o3 === v2) {
              if ("throw" === a3)
                throw r3;
              return { value: e3, done: true };
            }
            for (i2.method = a3, i2.arg = r3; ; ) {
              var s3 = i2.delegate;
              if (s3) {
                var c3 = P(s3, i2);
                if (c3) {
                  if (c3 === y2)
                    continue;
                  return c3;
                }
              }
              if ("next" === i2.method)
                i2.sent = i2._sent = i2.arg;
              else if ("throw" === i2.method) {
                if (o3 === m2)
                  throw o3 = v2, i2.arg;
                i2.dispatchException(i2.arg);
              } else
                "return" === i2.method && i2.abrupt("return", i2.arg);
              o3 = g2;
              var l3 = f3(t4, n3, i2);
              if ("normal" === l3.type) {
                if (o3 = i2.done ? v2 : h2, l3.arg === y2)
                  continue;
                return { value: l3.arg, done: i2.done };
              }
              "throw" === l3.type && (o3 = v2, i2.method = "throw", i2.arg = l3.arg);
            }
          };
        }
        function P(t4, n3) {
          var i2 = n3.method, o3 = t4.iterator[i2];
          if (o3 === e3)
            return n3.delegate = null, "throw" === i2 && t4.iterator.return && (n3.method = "return", n3.arg = e3, P(t4, n3), "throw" === n3.method) || "return" !== i2 && (n3.method = "throw", n3.arg = new TypeError("The iterator does not provide a '" + i2 + "' method")), y2;
          var a3 = f3(o3, t4.iterator, n3.arg);
          if ("throw" === a3.type)
            return n3.method = "throw", n3.arg = a3.arg, n3.delegate = null, y2;
          var r3 = a3.arg;
          return r3 ? r3.done ? (n3[t4.resultName] = r3.value, n3.next = t4.nextLoc, "return" !== n3.method && (n3.method = "next", n3.arg = e3), n3.delegate = null, y2) : r3 : (n3.method = "throw", n3.arg = new TypeError("iterator result is not an object"), n3.delegate = null, y2);
        }
        function E2(e4) {
          var t4 = { tryLoc: e4[0] };
          1 in e4 && (t4.catchLoc = e4[1]), 2 in e4 && (t4.finallyLoc = e4[2], t4.afterLoc = e4[3]), this.tryEntries.push(t4);
        }
        function O(e4) {
          var t4 = e4.completion || {};
          t4.type = "normal", delete t4.arg, e4.completion = t4;
        }
        function j(e4) {
          this.tryEntries = [{ tryLoc: "root" }], e4.forEach(E2, this), this.reset(true);
        }
        function I(t4) {
          if (t4 || "" === t4) {
            var n3 = t4[c2];
            if (n3)
              return n3.call(t4);
            if ("function" == typeof t4.next)
              return t4;
            if (!isNaN(t4.length)) {
              var o3 = -1, r3 = function n4() {
                for (; ++o3 < t4.length; )
                  if (a2.call(t4, o3))
                    return n4.value = t4[o3], n4.done = false, n4;
                return n4.value = e3, n4.done = true, n4;
              };
              return r3.next = r3;
            }
          }
          throw new TypeError(i(t4) + " is not iterable");
        }
        return k.prototype = b, r2(T, "constructor", { value: b, configurable: true }), r2(b, "constructor", { value: k, configurable: true }), k.displayName = u2(b, p2, "GeneratorFunction"), t3.isGeneratorFunction = function(e4) {
          var t4 = "function" == typeof e4 && e4.constructor;
          return !!t4 && (t4 === k || "GeneratorFunction" === (t4.displayName || t4.name));
        }, t3.mark = function(e4) {
          return Object.setPrototypeOf ? Object.setPrototypeOf(e4, b) : (e4.__proto__ = b, u2(e4, p2, "GeneratorFunction")), e4.prototype = Object.create(T), e4;
        }, t3.awrap = function(e4) {
          return { __await: e4 };
        }, R(B.prototype), u2(B.prototype, l2, function() {
          return this;
        }), t3.AsyncIterator = B, t3.async = function(e4, n3, i2, o3, a3) {
          void 0 === a3 && (a3 = Promise);
          var r3 = new B(d2(e4, n3, i2, o3), a3);
          return t3.isGeneratorFunction(n3) ? r3 : r3.next().then(function(e5) {
            return e5.done ? e5.value : r3.next();
          });
        }, R(T), u2(T, p2, "Generator"), u2(T, c2, function() {
          return this;
        }), u2(T, "toString", function() {
          return "[object Generator]";
        }), t3.keys = function(e4) {
          var t4 = Object(e4), n3 = [];
          for (var i2 in t4)
            n3.push(i2);
          return n3.reverse(), function e5() {
            for (; n3.length; ) {
              var i3 = n3.pop();
              if (i3 in t4)
                return e5.value = i3, e5.done = false, e5;
            }
            return e5.done = true, e5;
          };
        }, t3.values = I, j.prototype = { constructor: j, reset: function(t4) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = e3, this.done = false, this.delegate = null, this.method = "next", this.arg = e3, this.tryEntries.forEach(O), !t4)
            for (var n3 in this)
              "t" === n3.charAt(0) && a2.call(this, n3) && !isNaN(+n3.slice(1)) && (this[n3] = e3);
        }, stop: function() {
          this.done = true;
          var e4 = this.tryEntries[0].completion;
          if ("throw" === e4.type)
            throw e4.arg;
          return this.rval;
        }, dispatchException: function(t4) {
          if (this.done)
            throw t4;
          var n3 = this;
          function i2(i3, o4) {
            return s3.type = "throw", s3.arg = t4, n3.next = i3, o4 && (n3.method = "next", n3.arg = e3), !!o4;
          }
          for (var o3 = this.tryEntries.length - 1; o3 >= 0; --o3) {
            var r3 = this.tryEntries[o3], s3 = r3.completion;
            if ("root" === r3.tryLoc)
              return i2("end");
            if (r3.tryLoc <= this.prev) {
              var c3 = a2.call(r3, "catchLoc"), l3 = a2.call(r3, "finallyLoc");
              if (c3 && l3) {
                if (this.prev < r3.catchLoc)
                  return i2(r3.catchLoc, true);
                if (this.prev < r3.finallyLoc)
                  return i2(r3.finallyLoc);
              } else if (c3) {
                if (this.prev < r3.catchLoc)
                  return i2(r3.catchLoc, true);
              } else {
                if (!l3)
                  throw Error("try statement without catch or finally");
                if (this.prev < r3.finallyLoc)
                  return i2(r3.finallyLoc);
              }
            }
          }
        }, abrupt: function(e4, t4) {
          for (var n3 = this.tryEntries.length - 1; n3 >= 0; --n3) {
            var i2 = this.tryEntries[n3];
            if (i2.tryLoc <= this.prev && a2.call(i2, "finallyLoc") && this.prev < i2.finallyLoc) {
              var o3 = i2;
              break;
            }
          }
          o3 && ("break" === e4 || "continue" === e4) && o3.tryLoc <= t4 && t4 <= o3.finallyLoc && (o3 = null);
          var r3 = o3 ? o3.completion : {};
          return r3.type = e4, r3.arg = t4, o3 ? (this.method = "next", this.next = o3.finallyLoc, y2) : this.complete(r3);
        }, complete: function(e4, t4) {
          if ("throw" === e4.type)
            throw e4.arg;
          return "break" === e4.type || "continue" === e4.type ? this.next = e4.arg : "return" === e4.type ? (this.rval = this.arg = e4.arg, this.method = "return", this.next = "end") : "normal" === e4.type && t4 && (this.next = t4), y2;
        }, finish: function(e4) {
          for (var t4 = this.tryEntries.length - 1; t4 >= 0; --t4) {
            var n3 = this.tryEntries[t4];
            if (n3.finallyLoc === e4)
              return this.complete(n3.completion, n3.afterLoc), O(n3), y2;
          }
        }, catch: function(e4) {
          for (var t4 = this.tryEntries.length - 1; t4 >= 0; --t4) {
            var n3 = this.tryEntries[t4];
            if (n3.tryLoc === e4) {
              var i2 = n3.completion;
              if ("throw" === i2.type) {
                var o3 = i2.arg;
                O(n3);
              }
              return o3;
            }
          }
          throw Error("illegal catch attempt");
        }, delegateYield: function(t4, n3, i2) {
          return this.delegate = { iterator: I(t4), resultName: n3, nextLoc: i2 }, "next" === this.method && (this.arg = e3), y2;
        } }, t3;
      }
      function a(e3, t3, n2, i2, o3, a2, r2) {
        try {
          var s2 = e3[a2](r2), c2 = s2.value;
        } catch (e4) {
          return void n2(e4);
        }
        s2.done ? t3(c2) : Promise.resolve(c2).then(i2, o3);
      }
      function r(e3) {
        return function() {
          var t3 = this, n2 = arguments;
          return new Promise(function(i2, o3) {
            var r2 = e3.apply(t3, n2);
            function s2(e4) {
              a(r2, i2, o3, s2, c2, "next", e4);
            }
            function c2(e4) {
              a(r2, i2, o3, s2, c2, "throw", e4);
            }
            s2(void 0);
          });
        };
      }
      function s(e3, t3, n2) {
        return (t3 = l(t3)) in e3 ? Object.defineProperty(e3, t3, { value: n2, enumerable: true, configurable: true, writable: true }) : e3[t3] = n2, e3;
      }
      function c(e3, t3) {
        for (var n2 = 0; n2 < t3.length; n2++) {
          var i2 = t3[n2];
          i2.enumerable = i2.enumerable || false, i2.configurable = true, "value" in i2 && (i2.writable = true), Object.defineProperty(e3, l(i2.key), i2);
        }
      }
      function l(e3) {
        var t3 = function(e4, t4) {
          if ("object" != i(e4) || !e4)
            return e4;
          var n2 = e4[Symbol.toPrimitive];
          if (void 0 !== n2) {
            var o3 = n2.call(e4, t4 || "default");
            if ("object" != i(o3))
              return o3;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === t4 ? String : Number)(e4);
        }(e3, "string");
        return "symbol" == i(t3) ? t3 : t3 + "";
      }
      var p = n(3), u = null, d = function(e3) {
        return !e3 || e3 < 0 ? 0 : (e3 / 1e3).toFixed(3);
      }, f2 = function() {
        var e3 = function() {
          return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
        };
        return e3() + e3() + "-" + e3() + "-" + e3() + "-" + e3() + "-" + e3() + e3() + e3();
      }, m = function() {
        return new Promise(function(e3) {
          if (wx$1.canIUse("getNetworkType"))
            try {
              wx$1.getNetworkType({ success: function(t3) {
                e3(t3.networkType);
              } });
            } catch (t3) {
              e3("can_not_get_network_type");
            }
          else
            e3("can_not_get_network_type");
        });
      }, h = function() {
        var e3 = { devicePlatform: "can_not_get_system_info", wxVersion: "can_not_get_system_info", wxSystem: "can_not_get_system_info", wxSdkVersion: "can_not_get_system_info" }, t3 = {}, n2 = {};
        wx$1.canIUse("getAppBaseInfo") && (t3 = wx$1.getAppBaseInfo() || {}), wx$1.canIUse("getDeviceInfo") && (n2 = wx$1.getDeviceInfo() || {});
        var i2 = t3.SDKVersion || "can_not_get_system_info", o3 = t3.version || "can_not_get_system_info", a2 = n2.platform || "can_not_get_system_info", r2 = n2.system || "can_not_get_system_info";
        return Object.assign(e3, { devicePlatform: a2, wxVersion: o3, wxSystem: r2, wxSdkVersion: i2 }), e3;
      }, g = h();
      function v(e3) {
        return e3.replace(/([A-Z])/g, "_$1").toLowerCase();
      }
      function y(e3) {
        var t3, n2 = {}, i2 = ["sdkVersionName", "sdkVersionCode", "osName", "networkType", "requestName", "requestResult", "bucket", "region", "appid", "accelerate", "url", "host", "requestPath", "userAgent", "httpMethod", "httpSize", "httpSpeed", "httpTookTime", "httpMd5", "httpSign", "httpFullTime", "httpDomain", "partNumber", "httpRetryTimes", "customId", "traceId", "realApi"], o3 = [].concat(i2, ["errorNode", "errorCode", "errorName", "errorMessage", "errorRequestId", "errorHttpCode", "errorServiceName", "errorType", "fullError"]), a2 = "Success" === e3.requestResult ? i2 : o3;
        for (var r2 in e3) {
          if (a2.includes(r2))
            n2[v(r2)] = e3[r2];
        }
        return n2.request_name = e3.realApi ? (t3 = e3.realApi, ["putObject", "sliceUploadFile", "uploadFile", "uploadFiles"].includes(t3) ? "UploadTask" : "getObject" === t3 ? "DownloadTask" : ["putObjectCopy", "sliceCopyFile"].includes(t3) ? "CopyTask" : t3) : e3.requestName, n2;
      }
      var x = function() {
        function e3(t4) {
          var n3;
          !function(e4, t5) {
            if (!(e4 instanceof t5))
              throw new TypeError("Cannot call a class as a function");
          }(this, e3);
          var i2 = t4.parent, o3 = t4.traceId, a3 = t4.bucket, r2 = t4.region, c2 = t4.apiName, l3 = t4.realApi, d2 = t4.httpMethod, m2 = t4.fileKey, h2 = t4.fileSize, v2 = t4.accelerate, y2 = t4.customId, x2 = t4.delay, k = t4.deepTracker, b = t4.Beacon, C = t4.clsReporter, S = a3 && a3.substr(a3.lastIndexOf("-") + 1) || "";
          this.parent = i2, this.deepTracker = k, this.delay = x2, C && !this.clsReporter && (this.clsReporter = C), this.params = (s(n3 = { sdkVersionName: "cos-wx-sdk-v5", sdkVersionCode: p.version, osName: g.devicePlatform, networkType: "", requestName: c2 || "", requestResult: "", realApi: l3, bucket: a3, region: r2, accelerate: v2, httpMethod: d2, url: "", host: "", httpDomain: "", requestPath: m2 || "", errorType: "", errorCode: "", errorName: "", errorMessage: "", errorRequestId: "", errorHttpCode: 0, errorServiceName: "", errorNode: "", httpTookTime: 0, httpSize: h2 || 0, httpMd5: 0, httpSign: 0, httpFullTime: 0, httpSpeed: 0, size: h2 || 0 }, "httpMd5", 0), s(n3, "httpSign", 0), s(n3, "httpFull", 0), s(n3, "name", c2 || ""), s(n3, "tookTime", 0), s(n3, "md5StartTime", 0), s(n3, "md5EndTime", 0), s(n3, "signStartTime", 0), s(n3, "signEndTime", 0), s(n3, "httpStartTime", 0), s(n3, "httpEndTime", 0), s(n3, "startTime", (/* @__PURE__ */ new Date()).getTime()), s(n3, "endTime", 0), s(n3, "traceId", o3 || f2()), s(n3, "appid", S), s(n3, "partNumber", 0), s(n3, "httpRetryTimes", 0), s(n3, "customId", y2 || ""), s(n3, "partTime", 0), n3), b && (this.beacon = function(e4, t5) {
            if (!u) {
              if ("function" != typeof e4)
                throw new Error("Beacon not found");
              u = new e4({ appkey: "0WEB05PY6MHRGK0U", versionCode: p.version, channelID: "mp_sdk", openid: "openid", unionid: "unid", strictMode: false, delay: t5, sessionDuration: 6e4 });
            }
            return u;
          }(b, x2));
        }
        var t3, n2, a2, l2;
        return t3 = e3, n2 = [{ key: "formatResult", value: (l2 = r(o2().mark(function e4(t4, n3) {
          var i2, a3, r2, s2, c2, l3, p2, u2, f3, h2, g2, v2, y2, x2, k, b, C, S, w, T, R, B, A, P, E2, O, j;
          return o2().wrap(function(e5) {
            for (; ; )
              switch (e5.prev = e5.next) {
                case 0:
                  return h2 = (/* @__PURE__ */ new Date()).getTime(), e5.next = 3, m();
                case 3:
                  if (g2 = e5.sent, v2 = t4 ? (null == t4 || null === (i2 = t4.error) || void 0 === i2 || null === (a3 = i2.error) || void 0 === a3 ? void 0 : a3.Code) || "Error" : "", y2 = t4 && ((null == t4 || null === (r2 = t4.error) || void 0 === r2 || null === (s2 = r2.error) || void 0 === s2 ? void 0 : s2.Message) || (null == t4 || null === (c2 = t4.error) || void 0 === c2 ? void 0 : c2.error) || (null == t4 ? void 0 : t4.error)) || "", x2 = y2, k = t4 ? null == t4 || null === (l3 = t4.error) || void 0 === l3 ? void 0 : l3.statusCode : n3.statusCode, b = t4 ? null == t4 || null === (p2 = t4.error) || void 0 === p2 || null === (u2 = p2.error) || void 0 === u2 ? void 0 : u2.Resource : "", C = t4 ? (null == t4 || null === (f3 = t4.error) || void 0 === f3 ? void 0 : f3.RequestId) || "" : (null == n3 ? void 0 : n3.RequestId) || "", S = t4 ? C ? "Server" : "Client" : "", "getObject" === this.params.requestName && (this.params.httpSize = n3 ? n3.headers && n3.headers["content-length"] : 0), w = "sliceUploadFile" === this.params.realApi, T = "sliceCopyFile" === this.params.realApi, w || T ? (R = this.params.httpSize / 1024 / this.params.partTime, Object.assign(this.params, { httpSpeed: R < 0 ? 0 : R.toFixed(3) })) : (B = h2 - this.params.startTime, A = this.params.httpEndTime - this.params.httpStartTime, P = this.params.httpSize / 1024 / (A / 1e3), E2 = this.params.md5EndTime - this.params.md5StartTime, O = this.params.signEndTime - this.params.signStartTime, this.parent && (this.parent.addParamValue("httpTookTime", d(A)), this.parent.addParamValue("httpFullTime", d(B)), this.parent.addParamValue("httpMd5", d(E2)), this.parent.addParamValue("httpSign", d(O)), ["multipartUpload", "uploadPartCopy", "putObjectCopy"].includes(this.params.requestName) && this.parent.addParamValue("partTime", d(A))), Object.assign(this.params, { httpFullTime: d(B), httpMd5: d(E2), httpSign: d(O), httpTookTime: d(A), httpSpeed: P < 0 ? 0 : P.toFixed(3) })), Object.assign(this.params, { networkType: g2, requestResult: t4 ? "Failure" : "Success", errorType: S, errorCode: v2, errorHttpCode: k, errorName: x2, errorMessage: y2, errorServiceName: b, errorRequestId: C }), !t4 || v2 && y2 || (this.params.fullError = t4 ? JSON.stringify(t4) : ""), "getObject" === this.params.name && (this.params.size = n3 ? n3.headers && n3.headers["content-length"] : -1), this.params.url) {
                    try {
                      j = /^http(s)?:\/\/(.*?)\//.exec(this.params.url), this.params.host = j[2];
                    } catch (e6) {
                      this.params.host = this.params.url;
                    }
                    this.params.httpDomain = this.params.host;
                  }
                case 19:
                case "end":
                  return e5.stop();
              }
          }, e4, this);
        })), function(e4, t4) {
          return l2.apply(this, arguments);
        }) }, { key: "report", value: (a2 = r(o2().mark(function e4(t4, n3) {
          var i2;
          return o2().wrap(function(e5) {
            for (; ; )
              switch (e5.prev = e5.next) {
                case 0:
                  if (this.beacon || this.clsReporter) {
                    e5.next = 2;
                    break;
                  }
                  return e5.abrupt("return");
                case 2:
                  return e5.next = 4, this.formatResult(t4, n3);
                case 4:
                  i2 = y(this.params), this.beacon && this.sendEventsToBeacon(i2), this.clsReporter && this.sendEventsToCLS(i2);
                case 7:
                case "end":
                  return e5.stop();
              }
          }, e4, this);
        })), function(e4, t4) {
          return a2.apply(this, arguments);
        }) }, { key: "setParams", value: function(e4) {
          Object.assign(this.params, e4);
        } }, { key: "addParamValue", value: function(e4, t4) {
          this.params[e4] = (+this.params[e4] + +t4).toFixed(3);
        } }, { key: "sendEventsToBeacon", value: function(e4) {
          if ("sliceUploadFile" !== this.params.requestName && "sliceUploadFile" !== this.params.realApi || this.deepTracker) {
            var t4 = "qcloud_track_cos_sdk";
            0 === this.delay ? this.beacon && this.beacon.onDirectUserAction(t4, e4) : this.beacon && this.beacon.onUserAction(t4, e4);
          }
        } }, { key: "sendEventsToCLS", value: function(e4) {
          var t4 = !(0 !== this.delay);
          this.clsReporter.log(e4, t4);
        } }, { key: "generateSubTracker", value: function(t4) {
          return Object.assign(t4, { parent: this, deepTracker: this.deepTracker, traceId: this.params.traceId, bucket: this.params.bucket, region: this.params.region, accelerate: this.params.accelerate, fileKey: this.params.requestPath, customId: this.params.customId, delay: this.params.delay, clsReporter: this.clsReporter }), new e3(t4);
        } }], n2 && c(t3.prototype, n2), Object.defineProperty(t3, "prototype", { writable: false }), e3;
      }();
      e2.exports = x;
    }, function(e2) {
      e2.exports = JSON.parse('{"name":"cos-wx-sdk-v5","version":"1.8.0","description":"小程序 SDK for [腾讯云对象存储服务](https://cloud.tencent.com/product/cos)","main":"dist/cos-wx-sdk-v5.min.js","scripts":{"prettier":"prettier --write src demo/demo-sdk.js demo/test.js demo/ciDemo","dev":"cross-env NODE_ENV=development node build.js --mode=development","build":"cross-env NODE_ENV=production node build.js --mode=production","sts.js":"node server/sts.js","postinstall":"patch-package"},"repository":{"type":"git","url":"http://github.com/tencentyun/cos-wx-sdk-v5.git"},"author":"carsonxu","license":"ISC","dependencies":{"fast-xml-parser":"4.5.0","mime":"^2.4.6"},"devDependencies":{"@babel/core":"7.17.9","@babel/preset-env":"7.16.11","babel-loader":"8.2.5","body-parser":"^1.18.3","cross-env":"^7.0.3","express":"^4.17.1","patch-package":"^8.0.0","prettier":"^3.0.1","qcloud-cos-sts":"^3.0.2","terser-webpack-plugin":"4.2.3","webpack":"4.46.0","webpack-cli":"4.10.0"}}');
    }, function(e2, t2, n) {
      const i = n(1), o2 = { allowBooleanAttributes: false, unpairedTags: [] };
      function a(e3) {
        return " " === e3 || "	" === e3 || "\n" === e3 || "\r" === e3;
      }
      function r(e3, t3) {
        const n2 = t3;
        for (; t3 < e3.length; t3++)
          if ("?" != e3[t3] && " " != e3[t3])
            ;
          else {
            const i2 = e3.substr(n2, t3 - n2);
            if (t3 > 5 && "xml" === i2)
              return m("InvalidXml", "XML declaration allowed only at the start of the document.", g(e3, t3));
            if ("?" == e3[t3] && ">" == e3[t3 + 1]) {
              t3++;
              break;
            }
          }
        return t3;
      }
      function s(e3, t3) {
        if (e3.length > t3 + 5 && "-" === e3[t3 + 1] && "-" === e3[t3 + 2]) {
          for (t3 += 3; t3 < e3.length; t3++)
            if ("-" === e3[t3] && "-" === e3[t3 + 1] && ">" === e3[t3 + 2]) {
              t3 += 2;
              break;
            }
        } else if (e3.length > t3 + 8 && "D" === e3[t3 + 1] && "O" === e3[t3 + 2] && "C" === e3[t3 + 3] && "T" === e3[t3 + 4] && "Y" === e3[t3 + 5] && "P" === e3[t3 + 6] && "E" === e3[t3 + 7]) {
          let n2 = 1;
          for (t3 += 8; t3 < e3.length; t3++)
            if ("<" === e3[t3])
              n2++;
            else if (">" === e3[t3] && (n2--, 0 === n2))
              break;
        } else if (e3.length > t3 + 9 && "[" === e3[t3 + 1] && "C" === e3[t3 + 2] && "D" === e3[t3 + 3] && "A" === e3[t3 + 4] && "T" === e3[t3 + 5] && "A" === e3[t3 + 6] && "[" === e3[t3 + 7]) {
          for (t3 += 8; t3 < e3.length; t3++)
            if ("]" === e3[t3] && "]" === e3[t3 + 1] && ">" === e3[t3 + 2]) {
              t3 += 2;
              break;
            }
        }
        return t3;
      }
      t2.validate = function(e3, t3) {
        t3 = Object.assign({}, o2, t3);
        const n2 = [];
        let c2 = false, l2 = false;
        "\uFEFF" === e3[0] && (e3 = e3.substr(1));
        for (let o3 = 0; o3 < e3.length; o3++)
          if ("<" === e3[o3] && "?" === e3[o3 + 1]) {
            if (o3 += 2, o3 = r(e3, o3), o3.err)
              return o3;
          } else {
            if ("<" !== e3[o3]) {
              if (a(e3[o3]))
                continue;
              return m("InvalidChar", "char '" + e3[o3] + "' is not expected.", g(e3, o3));
            }
            {
              let h2 = o3;
              if (o3++, "!" === e3[o3]) {
                o3 = s(e3, o3);
                continue;
              }
              {
                let v2 = false;
                "/" === e3[o3] && (v2 = true, o3++);
                let y = "";
                for (; o3 < e3.length && ">" !== e3[o3] && " " !== e3[o3] && "	" !== e3[o3] && "\n" !== e3[o3] && "\r" !== e3[o3]; o3++)
                  y += e3[o3];
                if (y = y.trim(), "/" === y[y.length - 1] && (y = y.substring(0, y.length - 1), o3--), u2 = y, !i.isName(u2)) {
                  let t4;
                  return t4 = 0 === y.trim().length ? "Invalid space after '<'." : "Tag '" + y + "' is an invalid name.", m("InvalidTag", t4, g(e3, o3));
                }
                const x = p(e3, o3);
                if (false === x)
                  return m("InvalidAttr", "Attributes for '" + y + "' have open quote.", g(e3, o3));
                let k = x.value;
                if (o3 = x.index, "/" === k[k.length - 1]) {
                  const n3 = o3 - k.length;
                  k = k.substring(0, k.length - 1);
                  const i2 = d(k, t3);
                  if (true !== i2)
                    return m(i2.err.code, i2.err.msg, g(e3, n3 + i2.err.line));
                  c2 = true;
                } else if (v2) {
                  if (!x.tagClosed)
                    return m("InvalidTag", "Closing tag '" + y + "' doesn't have proper closing.", g(e3, o3));
                  if (k.trim().length > 0)
                    return m("InvalidTag", "Closing tag '" + y + "' can't have attributes or invalid starting.", g(e3, h2));
                  if (0 === n2.length)
                    return m("InvalidTag", "Closing tag '" + y + "' has not been opened.", g(e3, h2));
                  {
                    const t4 = n2.pop();
                    if (y !== t4.tagName) {
                      let n3 = g(e3, t4.tagStartPos);
                      return m("InvalidTag", "Expected closing tag '" + t4.tagName + "' (opened in line " + n3.line + ", col " + n3.col + ") instead of closing tag '" + y + "'.", g(e3, h2));
                    }
                    0 == n2.length && (l2 = true);
                  }
                } else {
                  const i2 = d(k, t3);
                  if (true !== i2)
                    return m(i2.err.code, i2.err.msg, g(e3, o3 - k.length + i2.err.line));
                  if (true === l2)
                    return m("InvalidXml", "Multiple possible root nodes found.", g(e3, o3));
                  -1 !== t3.unpairedTags.indexOf(y) || n2.push({ tagName: y, tagStartPos: h2 }), c2 = true;
                }
                for (o3++; o3 < e3.length; o3++)
                  if ("<" === e3[o3]) {
                    if ("!" === e3[o3 + 1]) {
                      o3++, o3 = s(e3, o3);
                      continue;
                    }
                    if ("?" !== e3[o3 + 1])
                      break;
                    if (o3 = r(e3, ++o3), o3.err)
                      return o3;
                  } else if ("&" === e3[o3]) {
                    const t4 = f2(e3, o3);
                    if (-1 == t4)
                      return m("InvalidChar", "char '&' is not expected.", g(e3, o3));
                    o3 = t4;
                  } else if (true === l2 && !a(e3[o3]))
                    return m("InvalidXml", "Extra text at the end", g(e3, o3));
                "<" === e3[o3] && o3--;
              }
            }
          }
        var u2;
        return c2 ? 1 == n2.length ? m("InvalidTag", "Unclosed tag '" + n2[0].tagName + "'.", g(e3, n2[0].tagStartPos)) : !(n2.length > 0) || m("InvalidXml", "Invalid '" + JSON.stringify(n2.map((e4) => e4.tagName), null, 4).replace(/\r?\n/g, "") + "' found.", { line: 1, col: 1 }) : m("InvalidXml", "Start tag expected.", 1);
      };
      const c = '"', l = "'";
      function p(e3, t3) {
        let n2 = "", i2 = "", o3 = false;
        for (; t3 < e3.length; t3++) {
          if (e3[t3] === c || e3[t3] === l)
            "" === i2 ? i2 = e3[t3] : i2 !== e3[t3] || (i2 = "");
          else if (">" === e3[t3] && "" === i2) {
            o3 = true;
            break;
          }
          n2 += e3[t3];
        }
        return "" === i2 && { value: n2, index: t3, tagClosed: o3 };
      }
      const u = new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`, "g");
      function d(e3, t3) {
        const n2 = i.getAllMatches(e3, u), o3 = {};
        for (let e4 = 0; e4 < n2.length; e4++) {
          if (0 === n2[e4][1].length)
            return m("InvalidAttr", "Attribute '" + n2[e4][2] + "' has no space in starting.", v(n2[e4]));
          if (void 0 !== n2[e4][3] && void 0 === n2[e4][4])
            return m("InvalidAttr", "Attribute '" + n2[e4][2] + "' is without value.", v(n2[e4]));
          if (void 0 === n2[e4][3] && !t3.allowBooleanAttributes)
            return m("InvalidAttr", "boolean attribute '" + n2[e4][2] + "' is not allowed.", v(n2[e4]));
          const i2 = n2[e4][2];
          if (!h(i2))
            return m("InvalidAttr", "Attribute '" + i2 + "' is an invalid name.", v(n2[e4]));
          if (o3.hasOwnProperty(i2))
            return m("InvalidAttr", "Attribute '" + i2 + "' is repeated.", v(n2[e4]));
          o3[i2] = 1;
        }
        return true;
      }
      function f2(e3, t3) {
        if (";" === e3[++t3])
          return -1;
        if ("#" === e3[t3])
          return function(e4, t4) {
            let n3 = /\d/;
            for ("x" === e4[t4] && (t4++, n3 = /[\da-fA-F]/); t4 < e4.length; t4++) {
              if (";" === e4[t4])
                return t4;
              if (!e4[t4].match(n3))
                break;
            }
            return -1;
          }(e3, ++t3);
        let n2 = 0;
        for (; t3 < e3.length; t3++, n2++)
          if (!(e3[t3].match(/\w/) && n2 < 20)) {
            if (";" === e3[t3])
              break;
            return -1;
          }
        return t3;
      }
      function m(e3, t3, n2) {
        return { err: { code: e3, msg: t3, line: n2.line || n2, col: n2.col } };
      }
      function h(e3) {
        return i.isName(e3);
      }
      function g(e3, t3) {
        const n2 = e3.substring(0, t3).split(/\r?\n/);
        return { line: n2.length, col: n2[n2.length - 1].length + 1 };
      }
      function v(e3) {
        return e3.startIndex + e3[1].length;
      }
    }, function(e2, t2) {
      e2.exports = function(e3) {
        return "function" == typeof e3 ? e3 : Array.isArray(e3) ? (t3) => {
          for (const n of e3) {
            if ("string" == typeof n && t3 === n)
              return true;
            if (n instanceof RegExp && n.test(t3))
              return true;
          }
        } : () => false;
      };
    }, function(e2, t2) {
      var n = function(e3) {
        var t3 = {}, n2 = function(e4) {
          return !t3[e4] && (t3[e4] = []), t3[e4];
        };
        e3.on = function(e4, t4) {
          n2(e4).push(t4);
        }, e3.off = function(e4, t4) {
          for (var i = n2(e4), o2 = i.length - 1; o2 >= 0; o2--)
            t4 === i[o2] && i.splice(o2, 1);
        }, e3.emit = function(e4, t4) {
          for (var i = n2(e4).map(function(e5) {
            return e5;
          }), o2 = 0; o2 < i.length; o2++)
            i[o2](t4);
        };
      };
      e2.exports.init = n, e2.exports.EventProxy = function() {
        n(this);
      };
    }, function(e2, t2, n) {
      var i, o2, a = n(0), r = "cos_sdk_upload_cache", s = function() {
        try {
          i.length ? wx$1.setStorageSync(r, JSON.stringify(i)) : wx$1.removeStorageSync(r);
        } catch (e3) {
        }
      }, c = function() {
        if (!i) {
          i = function() {
            try {
              var e4 = JSON.parse(wx$1.getStorageSync(r));
            } catch (e5) {
            }
            return e4 || (e4 = []), e4;
          }();
          for (var e3 = false, t3 = Math.round(Date.now() / 1e3), n2 = i.length - 1; n2 >= 0; n2--) {
            var o3 = i[n2][2];
            (!o3 || o3 + 2592e3 < t3) && (i.splice(n2, 1), e3 = true);
          }
          e3 && s();
        }
      }, l = function() {
        o2 || (o2 = setTimeout(function() {
          s(), o2 = null;
        }, 400));
      }, p = { using: {}, setUsing: function(e3) {
        p.using[e3] = true;
      }, removeUsing: function(e3) {
        delete p.using[e3];
      }, getFileId: function(e3, t3, n2, i2) {
        return e3.FilePath && e3.size && e3.lastModifiedTime && t3 ? a.md5([e3.FilePath].join("::")) + "-" + a.md5([e3.size, e3.mode, e3.lastAccessedTime, e3.lastModifiedTime, t3, n2, i2].join("::")) : null;
      }, getCopyFileId: function(e3, t3, n2, i2, o3) {
        var r2 = t3["content-length"], s2 = t3.etag || "", c2 = t3["last-modified"];
        return e3 && n2 ? a.md5([e3, r2, s2, c2, n2, i2, o3].join("::")) : null;
      }, getUploadIdList: function(e3) {
        if (!e3)
          return null;
        c();
        for (var t3 = [], n2 = 0; n2 < i.length; n2++)
          i[n2][0] === e3 && t3.push(i[n2][1]);
        return t3.length ? t3 : null;
      }, saveUploadId: function(e3, t3, n2) {
        if (c(), e3) {
          for (var o3 = e3.substr(0, e3.indexOf("-") + 1), a2 = i.length - 1; a2 >= 0; a2--) {
            var r2 = i[a2];
            (r2[0] === e3 && r2[1] === t3 || e3 !== r2[0] && 0 === r2[0].indexOf(o3)) && i.splice(a2, 1);
          }
          i.unshift([e3, t3, Math.round(Date.now() / 1e3)]), i.length > n2 && i.splice(n2), l();
        }
      }, removeUploadId: function(e3) {
        c(), delete p.using[e3];
        for (var t3 = i.length - 1; t3 >= 0; t3--)
          i[t3][1] === e3 && i.splice(t3, 1);
        l();
      } };
      e2.exports = p;
    }, function(e2, t2, n) {
      var i = n(9);
      e2.exports = i;
    }, function(e2, t2, n) {
      var i = n(0), o2 = n(6), a = n(25), r = n(26), s = n(32), c = n(3), l = { SecretId: "", SecretKey: "", SecurityToken: "", StartTime: 0, ExpiredTime: 0, ChunkRetryTimes: 2, FileParallelLimit: 3, ChunkParallelLimit: 3, ChunkSize: 1048576, SliceSize: 1048576, CopyChunkParallelLimit: 20, CopyChunkSize: 10485760, CopySliceSize: 10485760, MaxPartNumber: 1e4, ProgressInterval: 1e3, UploadQueueSize: 1e4, Domain: "", ServiceDomain: "", Protocol: "", CompatibilityMode: false, ForcePathStyle: false, Timeout: 0, CorrectClockSkew: true, SystemClockOffset: 0, UploadCheckContentMd5: false, UploadAddMetaMd5: false, UploadIdCacheLimit: 50, UseAccelerate: false, ForceSignHost: true, HttpDNSServiceId: "", SimpleUploadMethod: "postObject", AutoSwitchHost: false, CopySourceParser: null, ObjectKeySimplifyCheck: true, DeepTracker: false, TrackerDelay: 5e3, CustomId: "", BeaconReporter: null, ClsReporter: null }, p = function(e3) {
        if (this.options = i.extend(i.clone(l), e3 || {}), this.options.FileParallelLimit = Math.max(1, this.options.FileParallelLimit), this.options.ChunkParallelLimit = Math.max(1, this.options.ChunkParallelLimit), this.options.ChunkRetryTimes = Math.max(0, this.options.ChunkRetryTimes), this.options.ChunkSize = Math.max(1048576, this.options.ChunkSize), this.options.CopyChunkParallelLimit = Math.max(1, this.options.CopyChunkParallelLimit), this.options.CopyChunkSize = Math.max(1048576, this.options.CopyChunkSize), this.options.CopySliceSize = Math.max(0, this.options.CopySliceSize), this.options.MaxPartNumber = Math.max(1024, Math.min(1e4, this.options.MaxPartNumber)), this.options.Timeout = Math.max(0, this.options.Timeout), this.options.EnableReporter = this.options.BeaconReporter || this.options.ClsReporter, this.options.AppId, this.options.SecretId && this.options.SecretId.indexOf(" "), this.options.SecretKey && this.options.SecretKey.indexOf(" "), this.options.ForcePathStyle)
          throw new Error("ForcePathStyle is not supported");
        o2.init(this), a.init(this);
      };
      r.init(p, a), s.init(p, a), p.util = { md5: i.md5, xml2json: i.xml2json, json2xml: i.json2xml, encodeBase64: i.encodeBase64 }, p.getAuthorization = i.getAuth, p.version = c.version, e2.exports = p;
    }, function(e2, t2, n) {
      (function(e3) {
        var t3;
        function i(e4) {
          return i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e5) {
            return typeof e5;
          } : function(e5) {
            return e5 && "function" == typeof Symbol && e5.constructor === Symbol && e5 !== Symbol.prototype ? "symbol" : typeof e5;
          }, i(e4);
        }
        !function() {
          var o2 = "input is invalid type", a = "object" === ("undefined" == typeof window ? "undefined" : i(window)), r = a ? window : {};
          r.JS_MD5_NO_WINDOW && (a = false), !a && "object" === ("undefined" == typeof self ? "undefined" : i(self)) && (r = self);
          var s, c = !r.JS_MD5_NO_COMMON_JS && "object" === i(e3) && e3.exports, l = n(12), p = !r.JS_MD5_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer, u = "0123456789abcdef".split(""), d = [128, 32768, 8388608, -2147483648], f2 = [0, 8, 16, 24], m = ["hex", "array", "digest", "buffer", "arrayBuffer", "base64"], h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), g = [];
          if (p) {
            var v = new ArrayBuffer(68);
            s = new Uint8Array(v), g = new Uint32Array(v);
          }
          !r.JS_MD5_NO_NODE_JS && Array.isArray || (Array.isArray = function(e4) {
            return "[object Array]" === Object.prototype.toString.call(e4);
          }), !p || !r.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView || (ArrayBuffer.isView = function(e4) {
            return "object" === i(e4) && e4.buffer && e4.buffer.constructor === ArrayBuffer;
          });
          var y = function(e4) {
            return function(t4) {
              return new x(true).update(t4)[e4]();
            };
          };
          function x(e4) {
            if (e4)
              g[0] = g[16] = g[1] = g[2] = g[3] = g[4] = g[5] = g[6] = g[7] = g[8] = g[9] = g[10] = g[11] = g[12] = g[13] = g[14] = g[15] = 0, this.blocks = g, this.buffer8 = s;
            else if (p) {
              var t4 = new ArrayBuffer(68);
              this.buffer8 = new Uint8Array(t4), this.blocks = new Uint32Array(t4);
            } else
              this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0, this.finalized = this.hashed = false, this.first = true;
          }
          x.prototype.update = function(e4) {
            if (!this.finalized) {
              var t4, n2 = i(e4);
              if ("string" !== n2) {
                if ("object" !== n2)
                  throw o2;
                if (null === e4)
                  throw o2;
                if (!p || e4.constructor !== ArrayBuffer && "ArrayBuffer" !== e4.constructor.name) {
                  if (!(Array.isArray(e4) || p && ArrayBuffer.isView(e4)))
                    throw o2;
                } else
                  e4 = new Uint8Array(e4);
                t4 = true;
              }
              for (var a2, r2, s2 = 0, c2 = e4.length, l2 = this.blocks, u2 = this.buffer8; s2 < c2; ) {
                if (this.hashed && (this.hashed = false, l2[0] = l2[16], l2[16] = l2[1] = l2[2] = l2[3] = l2[4] = l2[5] = l2[6] = l2[7] = l2[8] = l2[9] = l2[10] = l2[11] = l2[12] = l2[13] = l2[14] = l2[15] = 0), t4)
                  if (p)
                    for (r2 = this.start; s2 < c2 && r2 < 64; ++s2)
                      u2[r2++] = e4[s2];
                  else
                    for (r2 = this.start; s2 < c2 && r2 < 64; ++s2)
                      l2[r2 >> 2] |= e4[s2] << f2[3 & r2++];
                else if (p)
                  for (r2 = this.start; s2 < c2 && r2 < 64; ++s2)
                    (a2 = e4.charCodeAt(s2)) < 128 ? u2[r2++] = a2 : a2 < 2048 ? (u2[r2++] = 192 | a2 >> 6, u2[r2++] = 128 | 63 & a2) : a2 < 55296 || a2 >= 57344 ? (u2[r2++] = 224 | a2 >> 12, u2[r2++] = 128 | a2 >> 6 & 63, u2[r2++] = 128 | 63 & a2) : (a2 = 65536 + ((1023 & a2) << 10 | 1023 & e4.charCodeAt(++s2)), u2[r2++] = 240 | a2 >> 18, u2[r2++] = 128 | a2 >> 12 & 63, u2[r2++] = 128 | a2 >> 6 & 63, u2[r2++] = 128 | 63 & a2);
                else
                  for (r2 = this.start; s2 < c2 && r2 < 64; ++s2)
                    (a2 = e4.charCodeAt(s2)) < 128 ? l2[r2 >> 2] |= a2 << f2[3 & r2++] : a2 < 2048 ? (l2[r2 >> 2] |= (192 | a2 >> 6) << f2[3 & r2++], l2[r2 >> 2] |= (128 | 63 & a2) << f2[3 & r2++]) : a2 < 55296 || a2 >= 57344 ? (l2[r2 >> 2] |= (224 | a2 >> 12) << f2[3 & r2++], l2[r2 >> 2] |= (128 | a2 >> 6 & 63) << f2[3 & r2++], l2[r2 >> 2] |= (128 | 63 & a2) << f2[3 & r2++]) : (a2 = 65536 + ((1023 & a2) << 10 | 1023 & e4.charCodeAt(++s2)), l2[r2 >> 2] |= (240 | a2 >> 18) << f2[3 & r2++], l2[r2 >> 2] |= (128 | a2 >> 12 & 63) << f2[3 & r2++], l2[r2 >> 2] |= (128 | a2 >> 6 & 63) << f2[3 & r2++], l2[r2 >> 2] |= (128 | 63 & a2) << f2[3 & r2++]);
                this.lastByteIndex = r2, this.bytes += r2 - this.start, r2 >= 64 ? (this.start = r2 - 64, this.hash(), this.hashed = true) : this.start = r2;
              }
              return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0, this.bytes = this.bytes % 4294967296), this;
            }
          }, x.prototype.finalize = function() {
            if (!this.finalized) {
              this.finalized = true;
              var e4 = this.blocks, t4 = this.lastByteIndex;
              e4[t4 >> 2] |= d[3 & t4], t4 >= 56 && (this.hashed || this.hash(), e4[0] = e4[16], e4[16] = e4[1] = e4[2] = e4[3] = e4[4] = e4[5] = e4[6] = e4[7] = e4[8] = e4[9] = e4[10] = e4[11] = e4[12] = e4[13] = e4[14] = e4[15] = 0), e4[14] = this.bytes << 3, e4[15] = this.hBytes << 3 | this.bytes >>> 29, this.hash();
            }
          }, x.prototype.hash = function() {
            var e4, t4, n2, i2, o3, a2, r2 = this.blocks;
            this.first ? t4 = ((t4 = ((e4 = ((e4 = r2[0] - 680876937) << 7 | e4 >>> 25) - 271733879 << 0) ^ (n2 = ((n2 = (-271733879 ^ (i2 = ((i2 = (-1732584194 ^ 2004318071 & e4) + r2[1] - 117830708) << 12 | i2 >>> 20) + e4 << 0) & (-271733879 ^ e4)) + r2[2] - 1126478375) << 17 | n2 >>> 15) + i2 << 0) & (i2 ^ e4)) + r2[3] - 1316259209) << 22 | t4 >>> 10) + n2 << 0 : (e4 = this.h0, t4 = this.h1, n2 = this.h2, t4 = ((t4 += ((e4 = ((e4 += ((i2 = this.h3) ^ t4 & (n2 ^ i2)) + r2[0] - 680876936) << 7 | e4 >>> 25) + t4 << 0) ^ (n2 = ((n2 += (t4 ^ (i2 = ((i2 += (n2 ^ e4 & (t4 ^ n2)) + r2[1] - 389564586) << 12 | i2 >>> 20) + e4 << 0) & (e4 ^ t4)) + r2[2] + 606105819) << 17 | n2 >>> 15) + i2 << 0) & (i2 ^ e4)) + r2[3] - 1044525330) << 22 | t4 >>> 10) + n2 << 0), t4 = ((t4 += ((e4 = ((e4 += (i2 ^ t4 & (n2 ^ i2)) + r2[4] - 176418897) << 7 | e4 >>> 25) + t4 << 0) ^ (n2 = ((n2 += (t4 ^ (i2 = ((i2 += (n2 ^ e4 & (t4 ^ n2)) + r2[5] + 1200080426) << 12 | i2 >>> 20) + e4 << 0) & (e4 ^ t4)) + r2[6] - 1473231341) << 17 | n2 >>> 15) + i2 << 0) & (i2 ^ e4)) + r2[7] - 45705983) << 22 | t4 >>> 10) + n2 << 0, t4 = ((t4 += ((e4 = ((e4 += (i2 ^ t4 & (n2 ^ i2)) + r2[8] + 1770035416) << 7 | e4 >>> 25) + t4 << 0) ^ (n2 = ((n2 += (t4 ^ (i2 = ((i2 += (n2 ^ e4 & (t4 ^ n2)) + r2[9] - 1958414417) << 12 | i2 >>> 20) + e4 << 0) & (e4 ^ t4)) + r2[10] - 42063) << 17 | n2 >>> 15) + i2 << 0) & (i2 ^ e4)) + r2[11] - 1990404162) << 22 | t4 >>> 10) + n2 << 0, t4 = ((t4 += ((e4 = ((e4 += (i2 ^ t4 & (n2 ^ i2)) + r2[12] + 1804603682) << 7 | e4 >>> 25) + t4 << 0) ^ (n2 = ((n2 += (t4 ^ (i2 = ((i2 += (n2 ^ e4 & (t4 ^ n2)) + r2[13] - 40341101) << 12 | i2 >>> 20) + e4 << 0) & (e4 ^ t4)) + r2[14] - 1502002290) << 17 | n2 >>> 15) + i2 << 0) & (i2 ^ e4)) + r2[15] + 1236535329) << 22 | t4 >>> 10) + n2 << 0, t4 = ((t4 += ((i2 = ((i2 += (t4 ^ n2 & ((e4 = ((e4 += (n2 ^ i2 & (t4 ^ n2)) + r2[1] - 165796510) << 5 | e4 >>> 27) + t4 << 0) ^ t4)) + r2[6] - 1069501632) << 9 | i2 >>> 23) + e4 << 0) ^ e4 & ((n2 = ((n2 += (e4 ^ t4 & (i2 ^ e4)) + r2[11] + 643717713) << 14 | n2 >>> 18) + i2 << 0) ^ i2)) + r2[0] - 373897302) << 20 | t4 >>> 12) + n2 << 0, t4 = ((t4 += ((i2 = ((i2 += (t4 ^ n2 & ((e4 = ((e4 += (n2 ^ i2 & (t4 ^ n2)) + r2[5] - 701558691) << 5 | e4 >>> 27) + t4 << 0) ^ t4)) + r2[10] + 38016083) << 9 | i2 >>> 23) + e4 << 0) ^ e4 & ((n2 = ((n2 += (e4 ^ t4 & (i2 ^ e4)) + r2[15] - 660478335) << 14 | n2 >>> 18) + i2 << 0) ^ i2)) + r2[4] - 405537848) << 20 | t4 >>> 12) + n2 << 0, t4 = ((t4 += ((i2 = ((i2 += (t4 ^ n2 & ((e4 = ((e4 += (n2 ^ i2 & (t4 ^ n2)) + r2[9] + 568446438) << 5 | e4 >>> 27) + t4 << 0) ^ t4)) + r2[14] - 1019803690) << 9 | i2 >>> 23) + e4 << 0) ^ e4 & ((n2 = ((n2 += (e4 ^ t4 & (i2 ^ e4)) + r2[3] - 187363961) << 14 | n2 >>> 18) + i2 << 0) ^ i2)) + r2[8] + 1163531501) << 20 | t4 >>> 12) + n2 << 0, t4 = ((t4 += ((i2 = ((i2 += (t4 ^ n2 & ((e4 = ((e4 += (n2 ^ i2 & (t4 ^ n2)) + r2[13] - 1444681467) << 5 | e4 >>> 27) + t4 << 0) ^ t4)) + r2[2] - 51403784) << 9 | i2 >>> 23) + e4 << 0) ^ e4 & ((n2 = ((n2 += (e4 ^ t4 & (i2 ^ e4)) + r2[7] + 1735328473) << 14 | n2 >>> 18) + i2 << 0) ^ i2)) + r2[12] - 1926607734) << 20 | t4 >>> 12) + n2 << 0, t4 = ((t4 += ((a2 = (i2 = ((i2 += ((o3 = t4 ^ n2) ^ (e4 = ((e4 += (o3 ^ i2) + r2[5] - 378558) << 4 | e4 >>> 28) + t4 << 0)) + r2[8] - 2022574463) << 11 | i2 >>> 21) + e4 << 0) ^ e4) ^ (n2 = ((n2 += (a2 ^ t4) + r2[11] + 1839030562) << 16 | n2 >>> 16) + i2 << 0)) + r2[14] - 35309556) << 23 | t4 >>> 9) + n2 << 0, t4 = ((t4 += ((a2 = (i2 = ((i2 += ((o3 = t4 ^ n2) ^ (e4 = ((e4 += (o3 ^ i2) + r2[1] - 1530992060) << 4 | e4 >>> 28) + t4 << 0)) + r2[4] + 1272893353) << 11 | i2 >>> 21) + e4 << 0) ^ e4) ^ (n2 = ((n2 += (a2 ^ t4) + r2[7] - 155497632) << 16 | n2 >>> 16) + i2 << 0)) + r2[10] - 1094730640) << 23 | t4 >>> 9) + n2 << 0, t4 = ((t4 += ((a2 = (i2 = ((i2 += ((o3 = t4 ^ n2) ^ (e4 = ((e4 += (o3 ^ i2) + r2[13] + 681279174) << 4 | e4 >>> 28) + t4 << 0)) + r2[0] - 358537222) << 11 | i2 >>> 21) + e4 << 0) ^ e4) ^ (n2 = ((n2 += (a2 ^ t4) + r2[3] - 722521979) << 16 | n2 >>> 16) + i2 << 0)) + r2[6] + 76029189) << 23 | t4 >>> 9) + n2 << 0, t4 = ((t4 += ((a2 = (i2 = ((i2 += ((o3 = t4 ^ n2) ^ (e4 = ((e4 += (o3 ^ i2) + r2[9] - 640364487) << 4 | e4 >>> 28) + t4 << 0)) + r2[12] - 421815835) << 11 | i2 >>> 21) + e4 << 0) ^ e4) ^ (n2 = ((n2 += (a2 ^ t4) + r2[15] + 530742520) << 16 | n2 >>> 16) + i2 << 0)) + r2[2] - 995338651) << 23 | t4 >>> 9) + n2 << 0, t4 = ((t4 += ((i2 = ((i2 += (t4 ^ ((e4 = ((e4 += (n2 ^ (t4 | ~i2)) + r2[0] - 198630844) << 6 | e4 >>> 26) + t4 << 0) | ~n2)) + r2[7] + 1126891415) << 10 | i2 >>> 22) + e4 << 0) ^ ((n2 = ((n2 += (e4 ^ (i2 | ~t4)) + r2[14] - 1416354905) << 15 | n2 >>> 17) + i2 << 0) | ~e4)) + r2[5] - 57434055) << 21 | t4 >>> 11) + n2 << 0, t4 = ((t4 += ((i2 = ((i2 += (t4 ^ ((e4 = ((e4 += (n2 ^ (t4 | ~i2)) + r2[12] + 1700485571) << 6 | e4 >>> 26) + t4 << 0) | ~n2)) + r2[3] - 1894986606) << 10 | i2 >>> 22) + e4 << 0) ^ ((n2 = ((n2 += (e4 ^ (i2 | ~t4)) + r2[10] - 1051523) << 15 | n2 >>> 17) + i2 << 0) | ~e4)) + r2[1] - 2054922799) << 21 | t4 >>> 11) + n2 << 0, t4 = ((t4 += ((i2 = ((i2 += (t4 ^ ((e4 = ((e4 += (n2 ^ (t4 | ~i2)) + r2[8] + 1873313359) << 6 | e4 >>> 26) + t4 << 0) | ~n2)) + r2[15] - 30611744) << 10 | i2 >>> 22) + e4 << 0) ^ ((n2 = ((n2 += (e4 ^ (i2 | ~t4)) + r2[6] - 1560198380) << 15 | n2 >>> 17) + i2 << 0) | ~e4)) + r2[13] + 1309151649) << 21 | t4 >>> 11) + n2 << 0, t4 = ((t4 += ((i2 = ((i2 += (t4 ^ ((e4 = ((e4 += (n2 ^ (t4 | ~i2)) + r2[4] - 145523070) << 6 | e4 >>> 26) + t4 << 0) | ~n2)) + r2[11] - 1120210379) << 10 | i2 >>> 22) + e4 << 0) ^ ((n2 = ((n2 += (e4 ^ (i2 | ~t4)) + r2[2] + 718787259) << 15 | n2 >>> 17) + i2 << 0) | ~e4)) + r2[9] - 343485551) << 21 | t4 >>> 11) + n2 << 0, this.first ? (this.h0 = e4 + 1732584193 << 0, this.h1 = t4 - 271733879 << 0, this.h2 = n2 - 1732584194 << 0, this.h3 = i2 + 271733878 << 0, this.first = false) : (this.h0 = this.h0 + e4 << 0, this.h1 = this.h1 + t4 << 0, this.h2 = this.h2 + n2 << 0, this.h3 = this.h3 + i2 << 0);
          }, x.prototype.hex = function() {
            this.finalize();
            var e4 = this.h0, t4 = this.h1, n2 = this.h2, i2 = this.h3;
            return u[e4 >> 4 & 15] + u[15 & e4] + u[e4 >> 12 & 15] + u[e4 >> 8 & 15] + u[e4 >> 20 & 15] + u[e4 >> 16 & 15] + u[e4 >> 28 & 15] + u[e4 >> 24 & 15] + u[t4 >> 4 & 15] + u[15 & t4] + u[t4 >> 12 & 15] + u[t4 >> 8 & 15] + u[t4 >> 20 & 15] + u[t4 >> 16 & 15] + u[t4 >> 28 & 15] + u[t4 >> 24 & 15] + u[n2 >> 4 & 15] + u[15 & n2] + u[n2 >> 12 & 15] + u[n2 >> 8 & 15] + u[n2 >> 20 & 15] + u[n2 >> 16 & 15] + u[n2 >> 28 & 15] + u[n2 >> 24 & 15] + u[i2 >> 4 & 15] + u[15 & i2] + u[i2 >> 12 & 15] + u[i2 >> 8 & 15] + u[i2 >> 20 & 15] + u[i2 >> 16 & 15] + u[i2 >> 28 & 15] + u[i2 >> 24 & 15];
          }, x.prototype.toString = x.prototype.hex, x.prototype.digest = function() {
            this.finalize();
            var e4 = this.h0, t4 = this.h1, n2 = this.h2, i2 = this.h3;
            return [255 & e4, e4 >> 8 & 255, e4 >> 16 & 255, e4 >> 24 & 255, 255 & t4, t4 >> 8 & 255, t4 >> 16 & 255, t4 >> 24 & 255, 255 & n2, n2 >> 8 & 255, n2 >> 16 & 255, n2 >> 24 & 255, 255 & i2, i2 >> 8 & 255, i2 >> 16 & 255, i2 >> 24 & 255];
          }, x.prototype.array = x.prototype.digest, x.prototype.arrayBuffer = function() {
            this.finalize();
            var e4 = new ArrayBuffer(16), t4 = new Uint32Array(e4);
            return t4[0] = this.h0, t4[1] = this.h1, t4[2] = this.h2, t4[3] = this.h3, e4;
          }, x.prototype.buffer = x.prototype.arrayBuffer, x.prototype.base64 = function() {
            for (var e4, t4, n2, i2 = "", o3 = this.array(), a2 = 0; a2 < 15; )
              e4 = o3[a2++], t4 = o3[a2++], n2 = o3[a2++], i2 += h[e4 >>> 2] + h[63 & (e4 << 4 | t4 >>> 4)] + h[63 & (t4 << 2 | n2 >>> 6)] + h[63 & n2];
            return e4 = o3[a2], i2 += h[e4 >>> 2] + h[e4 << 4 & 63] + "==";
          };
          var k = function() {
            var e4 = y("hex");
            e4.getCtx = e4.create = function() {
              return new x();
            }, e4.update = function(t5) {
              return e4.create().update(t5);
            };
            for (var t4 = 0; t4 < m.length; ++t4) {
              var n2 = m[t4];
              e4[n2] = y(n2);
            }
            return e4;
          }();
          c ? e3.exports = k : (r.md5 = k, l && (void 0 === (t3 = (function() {
            return k;
          }).call(k, n, k, e3)) || (e3.exports = t3)));
        }();
      }).call(this, n(11)(e2));
    }, function(e2, t2) {
      e2.exports = function(e3) {
        return e3.webpackPolyfill || (e3.deprecate = function() {
        }, e3.paths = [], e3.children || (e3.children = []), Object.defineProperty(e3, "loaded", { enumerable: true, get: function() {
          return e3.l;
        } }), Object.defineProperty(e3, "id", { enumerable: true, get: function() {
          return e3.i;
        } }), e3.webpackPolyfill = 1), e3;
      };
    }, function(e2, t2) {
      (function(t3) {
        e2.exports = t3;
      }).call(this, {});
    }, function(e2, t2) {
      var n, i, o2, a, r, s, c, l = l || function(e3, t3) {
        var n2 = {}, i2 = n2.lib = {}, o3 = function() {
        }, a2 = i2.Base = { extend: function(e4) {
          o3.prototype = this;
          var t4 = new o3();
          return e4 && t4.mixIn(e4), t4.hasOwnProperty("init") || (t4.init = function() {
            t4.$super.init.apply(this, arguments);
          }), t4.init.prototype = t4, t4.$super = this, t4;
        }, create: function() {
          var e4 = this.extend();
          return e4.init.apply(e4, arguments), e4;
        }, init: function() {
        }, mixIn: function(e4) {
          for (var t4 in e4)
            e4.hasOwnProperty(t4) && (this[t4] = e4[t4]);
          e4.hasOwnProperty("toString") && (this.toString = e4.toString);
        }, clone: function() {
          return this.init.prototype.extend(this);
        } }, r2 = i2.WordArray = a2.extend({ init: function(e4, t4) {
          e4 = this.words = e4 || [], this.sigBytes = null != t4 ? t4 : 4 * e4.length;
        }, toString: function(e4) {
          return (e4 || c2).stringify(this);
        }, concat: function(e4) {
          var t4 = this.words, n3 = e4.words, i3 = this.sigBytes;
          if (e4 = e4.sigBytes, this.clamp(), i3 % 4)
            for (var o4 = 0; o4 < e4; o4++)
              t4[i3 + o4 >>> 2] |= (n3[o4 >>> 2] >>> 24 - o4 % 4 * 8 & 255) << 24 - (i3 + o4) % 4 * 8;
          else if (65535 < n3.length)
            for (o4 = 0; o4 < e4; o4 += 4)
              t4[i3 + o4 >>> 2] = n3[o4 >>> 2];
          else
            t4.push.apply(t4, n3);
          return this.sigBytes += e4, this;
        }, clamp: function() {
          var t4 = this.words, n3 = this.sigBytes;
          t4[n3 >>> 2] &= 4294967295 << 32 - n3 % 4 * 8, t4.length = e3.ceil(n3 / 4);
        }, clone: function() {
          var e4 = a2.clone.call(this);
          return e4.words = this.words.slice(0), e4;
        }, random: function(t4) {
          for (var n3 = [], i3 = 0; i3 < t4; i3 += 4)
            n3.push(4294967296 * e3.random() | 0);
          return new r2.init(n3, t4);
        } }), s2 = n2.enc = {}, c2 = s2.Hex = { stringify: function(e4) {
          var t4 = e4.words;
          e4 = e4.sigBytes;
          for (var n3 = [], i3 = 0; i3 < e4; i3++) {
            var o4 = t4[i3 >>> 2] >>> 24 - i3 % 4 * 8 & 255;
            n3.push((o4 >>> 4).toString(16)), n3.push((15 & o4).toString(16));
          }
          return n3.join("");
        }, parse: function(e4) {
          for (var t4 = e4.length, n3 = [], i3 = 0; i3 < t4; i3 += 2)
            n3[i3 >>> 3] |= parseInt(e4.substr(i3, 2), 16) << 24 - i3 % 8 * 4;
          return new r2.init(n3, t4 / 2);
        } }, l2 = s2.Latin1 = { stringify: function(e4) {
          var t4 = e4.words;
          e4 = e4.sigBytes;
          for (var n3 = [], i3 = 0; i3 < e4; i3++)
            n3.push(String.fromCharCode(t4[i3 >>> 2] >>> 24 - i3 % 4 * 8 & 255));
          return n3.join("");
        }, parse: function(e4) {
          for (var t4 = e4.length, n3 = [], i3 = 0; i3 < t4; i3++)
            n3[i3 >>> 2] |= (255 & e4.charCodeAt(i3)) << 24 - i3 % 4 * 8;
          return new r2.init(n3, t4);
        } }, p = s2.Utf8 = { stringify: function(e4) {
          try {
            return decodeURIComponent(escape(l2.stringify(e4)));
          } catch (e5) {
            throw Error("Malformed UTF-8 data");
          }
        }, parse: function(e4) {
          return l2.parse(unescape(encodeURIComponent(e4)));
        } }, u = i2.BufferedBlockAlgorithm = a2.extend({ reset: function() {
          this._data = new r2.init(), this._nDataBytes = 0;
        }, _append: function(e4) {
          "string" == typeof e4 && (e4 = p.parse(e4)), this._data.concat(e4), this._nDataBytes += e4.sigBytes;
        }, _process: function(t4) {
          var n3 = this._data, i3 = n3.words, o4 = n3.sigBytes, a3 = this.blockSize, s3 = o4 / (4 * a3);
          if (t4 = (s3 = t4 ? e3.ceil(s3) : e3.max((0 | s3) - this._minBufferSize, 0)) * a3, o4 = e3.min(4 * t4, o4), t4) {
            for (var c3 = 0; c3 < t4; c3 += a3)
              this._doProcessBlock(i3, c3);
            c3 = i3.splice(0, t4), n3.sigBytes -= o4;
          }
          return new r2.init(c3, o4);
        }, clone: function() {
          var e4 = a2.clone.call(this);
          return e4._data = this._data.clone(), e4;
        }, _minBufferSize: 0 });
        i2.Hasher = u.extend({ cfg: a2.extend(), init: function(e4) {
          this.cfg = this.cfg.extend(e4), this.reset();
        }, reset: function() {
          u.reset.call(this), this._doReset();
        }, update: function(e4) {
          return this._append(e4), this._process(), this;
        }, finalize: function(e4) {
          return e4 && this._append(e4), this._doFinalize();
        }, blockSize: 16, _createHelper: function(e4) {
          return function(t4, n3) {
            return new e4.init(n3).finalize(t4);
          };
        }, _createHmacHelper: function(e4) {
          return function(t4, n3) {
            return new d.HMAC.init(e4, n3).finalize(t4);
          };
        } });
        var d = n2.algo = {};
        return n2;
      }(Math);
      i = (r = (n = l).lib).WordArray, o2 = r.Hasher, a = [], r = n.algo.SHA1 = o2.extend({ _doReset: function() {
        this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
      }, _doProcessBlock: function(e3, t3) {
        for (var n2 = this._hash.words, i2 = n2[0], o3 = n2[1], r2 = n2[2], s2 = n2[3], c2 = n2[4], l2 = 0; 80 > l2; l2++) {
          if (16 > l2)
            a[l2] = 0 | e3[t3 + l2];
          else {
            var p = a[l2 - 3] ^ a[l2 - 8] ^ a[l2 - 14] ^ a[l2 - 16];
            a[l2] = p << 1 | p >>> 31;
          }
          p = (i2 << 5 | i2 >>> 27) + c2 + a[l2], p = 20 > l2 ? p + (1518500249 + (o3 & r2 | ~o3 & s2)) : 40 > l2 ? p + (1859775393 + (o3 ^ r2 ^ s2)) : 60 > l2 ? p + ((o3 & r2 | o3 & s2 | r2 & s2) - 1894007588) : p + ((o3 ^ r2 ^ s2) - 899497514), c2 = s2, s2 = r2, r2 = o3 << 30 | o3 >>> 2, o3 = i2, i2 = p;
        }
        n2[0] = n2[0] + i2 | 0, n2[1] = n2[1] + o3 | 0, n2[2] = n2[2] + r2 | 0, n2[3] = n2[3] + s2 | 0, n2[4] = n2[4] + c2 | 0;
      }, _doFinalize: function() {
        var e3 = this._data, t3 = e3.words, n2 = 8 * this._nDataBytes, i2 = 8 * e3.sigBytes;
        return t3[i2 >>> 5] |= 128 << 24 - i2 % 32, t3[14 + (i2 + 64 >>> 9 << 4)] = Math.floor(n2 / 4294967296), t3[15 + (i2 + 64 >>> 9 << 4)] = n2, e3.sigBytes = 4 * t3.length, this._process(), this._hash;
      }, clone: function() {
        var e3 = o2.clone.call(this);
        return e3._hash = this._hash.clone(), e3;
      } }), n.SHA1 = o2._createHelper(r), n.HmacSHA1 = o2._createHmacHelper(r), function() {
        var e3 = l, t3 = e3.enc.Utf8;
        e3.algo.HMAC = e3.lib.Base.extend({ init: function(e4, n2) {
          e4 = this._hasher = new e4.init(), "string" == typeof n2 && (n2 = t3.parse(n2));
          var i2 = e4.blockSize, o3 = 4 * i2;
          n2.sigBytes > o3 && (n2 = e4.finalize(n2)), n2.clamp();
          for (var a2 = this._oKey = n2.clone(), r2 = this._iKey = n2.clone(), s2 = a2.words, c2 = r2.words, l2 = 0; l2 < i2; l2++)
            s2[l2] ^= 1549556828, c2[l2] ^= 909522486;
          a2.sigBytes = r2.sigBytes = o3, this.reset();
        }, reset: function() {
          var e4 = this._hasher;
          e4.reset(), e4.update(this._iKey);
        }, update: function(e4) {
          return this._hasher.update(e4), this;
        }, finalize: function(e4) {
          var t4 = this._hasher;
          return e4 = t4.finalize(e4), t4.reset(), t4.finalize(this._oKey.clone().concat(e4));
        } });
      }(), c = (s = l).lib.WordArray, s.enc.Base64 = { stringify: function(e3) {
        var t3 = e3.words, n2 = e3.sigBytes, i2 = this._map;
        e3.clamp();
        for (var o3 = [], a2 = 0; a2 < n2; a2 += 3)
          for (var r2 = (t3[a2 >>> 2] >>> 24 - a2 % 4 * 8 & 255) << 16 | (t3[a2 + 1 >>> 2] >>> 24 - (a2 + 1) % 4 * 8 & 255) << 8 | t3[a2 + 2 >>> 2] >>> 24 - (a2 + 2) % 4 * 8 & 255, s2 = 0; s2 < 4 && a2 + 0.75 * s2 < n2; s2++)
            o3.push(i2.charAt(r2 >>> 6 * (3 - s2) & 63));
        var c2 = i2.charAt(64);
        if (c2)
          for (; o3.length % 4; )
            o3.push(c2);
        return o3.join("");
      }, parse: function(e3) {
        var t3 = e3.length, n2 = this._map, i2 = n2.charAt(64);
        if (i2) {
          var o3 = e3.indexOf(i2);
          -1 != o3 && (t3 = o3);
        }
        for (var a2 = [], r2 = 0, s2 = 0; s2 < t3; s2++)
          if (s2 % 4) {
            var l2 = n2.indexOf(e3.charAt(s2 - 1)) << s2 % 4 * 2, p = n2.indexOf(e3.charAt(s2)) >>> 6 - s2 % 4 * 2;
            a2[r2 >>> 2] |= (l2 | p) << 24 - r2 % 4 * 8, r2++;
          }
        return c.create(a2, r2);
      }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" }, e2.exports = l;
    }, function(e2, t2) {
      var n = function(e3) {
        var t3 = (e3 = e3 || {}).Base64, n2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = function(e4) {
          for (var t4 = {}, n3 = 0, i2 = e4.length; n3 < i2; n3++)
            t4[e4.charAt(n3)] = n3;
          return t4;
        }(n2), o2 = String.fromCharCode, a = function(e4) {
          if (e4.length < 2)
            return (t4 = e4.charCodeAt(0)) < 128 ? e4 : t4 < 2048 ? o2(192 | t4 >>> 6) + o2(128 | 63 & t4) : o2(224 | t4 >>> 12 & 15) + o2(128 | t4 >>> 6 & 63) + o2(128 | 63 & t4);
          var t4 = 65536 + 1024 * (e4.charCodeAt(0) - 55296) + (e4.charCodeAt(1) - 56320);
          return o2(240 | t4 >>> 18 & 7) + o2(128 | t4 >>> 12 & 63) + o2(128 | t4 >>> 6 & 63) + o2(128 | 63 & t4);
        }, r = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g, s = function(e4) {
          return e4.replace(r, a);
        }, c = function(e4) {
          var t4 = [0, 2, 1][e4.length % 3], i2 = e4.charCodeAt(0) << 16 | (e4.length > 1 ? e4.charCodeAt(1) : 0) << 8 | (e4.length > 2 ? e4.charCodeAt(2) : 0);
          return [n2.charAt(i2 >>> 18), n2.charAt(i2 >>> 12 & 63), t4 >= 2 ? "=" : n2.charAt(i2 >>> 6 & 63), t4 >= 1 ? "=" : n2.charAt(63 & i2)].join("");
        }, l = e3.btoa ? function(t4) {
          return e3.btoa(t4);
        } : function(e4) {
          return e4.replace(/[\s\S]{1,3}/g, c);
        }, p = function(e4) {
          return l(s(e4));
        }, u = function(e4, t4) {
          return t4 ? p(String(e4)).replace(/[+\/]/g, function(e5) {
            return "+" == e5 ? "-" : "_";
          }).replace(/=/g, "") : p(String(e4));
        }, d = new RegExp(["[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}"].join("|"), "g"), f2 = function(e4) {
          switch (e4.length) {
            case 4:
              var t4 = ((7 & e4.charCodeAt(0)) << 18 | (63 & e4.charCodeAt(1)) << 12 | (63 & e4.charCodeAt(2)) << 6 | 63 & e4.charCodeAt(3)) - 65536;
              return o2(55296 + (t4 >>> 10)) + o2(56320 + (1023 & t4));
            case 3:
              return o2((15 & e4.charCodeAt(0)) << 12 | (63 & e4.charCodeAt(1)) << 6 | 63 & e4.charCodeAt(2));
            default:
              return o2((31 & e4.charCodeAt(0)) << 6 | 63 & e4.charCodeAt(1));
          }
        }, m = function(e4) {
          return e4.replace(d, f2);
        }, h = function(e4) {
          var t4 = e4.length, n3 = t4 % 4, a2 = (t4 > 0 ? i[e4.charAt(0)] << 18 : 0) | (t4 > 1 ? i[e4.charAt(1)] << 12 : 0) | (t4 > 2 ? i[e4.charAt(2)] << 6 : 0) | (t4 > 3 ? i[e4.charAt(3)] : 0), r2 = [o2(a2 >>> 16), o2(a2 >>> 8 & 255), o2(255 & a2)];
          return r2.length -= [0, 0, 2, 1][n3], r2.join("");
        }, g = e3.atob ? function(t4) {
          return e3.atob(t4);
        } : function(e4) {
          return e4.replace(/[\s\S]{1,4}/g, h);
        }, v = function(e4) {
          return m(g(e4));
        }, y = function(e4) {
          return v(String(e4).replace(/[-_]/g, function(e5) {
            return "-" == e5 ? "+" : "/";
          }).replace(/[^A-Za-z0-9\+\/]/g, ""));
        };
        return { VERSION: "2.1.9", atob: g, btoa: l, fromBase64: y, toBase64: u, utob: s, encode: u, encodeURI: function(e4) {
          return u(e4, true);
        }, btou: m, decode: y, noConflict: function() {
          var n3 = e3.Base64;
          return e3.Base64 = t3, n3;
        } };
      }();
      e2.exports = n;
    }, function(e2, t2, n) {
      const i = n(4), o2 = n(16), a = n(23);
      e2.exports = { XMLParser: o2, XMLValidator: i, XMLBuilder: a };
    }, function(e2, t2, n) {
      const { buildOptions: i } = n(17), o2 = n(18), { prettify: a } = n(22), r = n(4);
      e2.exports = class {
        constructor(e3) {
          this.externalEntities = {}, this.options = i(e3);
        }
        parse(e3, t3) {
          if ("string" == typeof e3)
            ;
          else {
            if (!e3.toString)
              throw new Error("XML data is accepted in String or Bytes[] form.");
            e3 = e3.toString();
          }
          if (t3) {
            true === t3 && (t3 = {});
            const n3 = r.validate(e3, t3);
            if (true !== n3)
              throw Error(`${n3.err.msg}:${n3.err.line}:${n3.err.col}`);
          }
          const n2 = new o2(this.options);
          n2.addExternalEntities(this.externalEntities);
          const i2 = n2.parseXml(e3);
          return this.options.preserveOrder || void 0 === i2 ? i2 : a(i2, this.options);
        }
        addEntity(e3, t3) {
          if (-1 !== t3.indexOf("&"))
            throw new Error("Entity value can't have '&'");
          if (-1 !== e3.indexOf("&") || -1 !== e3.indexOf(";"))
            throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
          if ("&" === t3)
            throw new Error("An entity with value '&' is not permitted");
          this.externalEntities[e3] = t3;
        }
      };
    }, function(e2, t2) {
      const n = { preserveOrder: false, attributeNamePrefix: "@_", attributesGroupName: false, textNodeName: "#text", ignoreAttributes: true, removeNSPrefix: false, allowBooleanAttributes: false, parseTagValue: true, parseAttributeValue: false, trimValues: true, cdataPropName: false, numberParseOptions: { hex: true, leadingZeros: true, eNotation: true }, tagValueProcessor: function(e3, t3) {
        return t3;
      }, attributeValueProcessor: function(e3, t3) {
        return t3;
      }, stopNodes: [], alwaysCreateTextNode: false, isArray: () => false, commentPropName: false, unpairedTags: [], processEntities: true, htmlEntities: false, ignoreDeclaration: false, ignorePiTags: false, transformTagName: false, transformAttributeName: false, updateTag: function(e3, t3, n2) {
        return e3;
      } };
      t2.buildOptions = function(e3) {
        return Object.assign({}, n, e3);
      }, t2.defaultOptions = n;
    }, function(e2, t2, n) {
      const i = n(1), o2 = n(19), a = n(20), r = n(21), s = n(5);
      function c(e3) {
        const t3 = Object.keys(e3);
        for (let n2 = 0; n2 < t3.length; n2++) {
          const i2 = t3[n2];
          this.lastEntities[i2] = { regex: new RegExp("&" + i2 + ";", "g"), val: e3[i2] };
        }
      }
      function l(e3, t3, n2, i2, o3, a2, r2) {
        if (void 0 !== e3 && (this.options.trimValues && !i2 && (e3 = e3.trim()), e3.length > 0)) {
          r2 || (e3 = this.replaceEntitiesValue(e3));
          const i3 = this.options.tagValueProcessor(t3, e3, n2, o3, a2);
          if (null == i3)
            return e3;
          if (typeof i3 != typeof e3 || i3 !== e3)
            return i3;
          if (this.options.trimValues)
            return b(e3, this.options.parseTagValue, this.options.numberParseOptions);
          return e3.trim() === e3 ? b(e3, this.options.parseTagValue, this.options.numberParseOptions) : e3;
        }
      }
      function p(e3) {
        if (this.options.removeNSPrefix) {
          const t3 = e3.split(":"), n2 = "/" === e3.charAt(0) ? "/" : "";
          if ("xmlns" === t3[0])
            return "";
          2 === t3.length && (e3 = n2 + t3[1]);
        }
        return e3;
      }
      const u = new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`, "gm");
      function d(e3, t3, n2) {
        if (true !== this.options.ignoreAttributes && "string" == typeof e3) {
          const n3 = i.getAllMatches(e3, u), o3 = n3.length, a2 = {};
          for (let e4 = 0; e4 < o3; e4++) {
            const i2 = this.resolveNameSpace(n3[e4][1]);
            if (this.ignoreAttributesFn(i2, t3))
              continue;
            let o4 = n3[e4][4], r2 = this.options.attributeNamePrefix + i2;
            if (i2.length)
              if (this.options.transformAttributeName && (r2 = this.options.transformAttributeName(r2)), "__proto__" === r2 && (r2 = "#__proto__"), void 0 !== o4) {
                this.options.trimValues && (o4 = o4.trim()), o4 = this.replaceEntitiesValue(o4);
                const e5 = this.options.attributeValueProcessor(i2, o4, t3);
                a2[r2] = null == e5 ? o4 : typeof e5 != typeof o4 || e5 !== o4 ? e5 : b(o4, this.options.parseAttributeValue, this.options.numberParseOptions);
              } else
                this.options.allowBooleanAttributes && (a2[r2] = true);
          }
          if (!Object.keys(a2).length)
            return;
          if (this.options.attributesGroupName) {
            const e4 = {};
            return e4[this.options.attributesGroupName] = a2, e4;
          }
          return a2;
        }
      }
      const f2 = function(e3) {
        const t3 = new o2("!xml");
        let n2 = t3, i2 = "", r2 = "";
        for (let s2 = 0; s2 < e3.length; s2++) {
          if ("<" === e3[s2])
            if ("/" === e3[s2 + 1]) {
              const t4 = y(e3, ">", s2, "Closing Tag is not closed.");
              let o3 = e3.substring(s2 + 2, t4).trim();
              if (this.options.removeNSPrefix) {
                const e4 = o3.indexOf(":");
                -1 !== e4 && (o3 = o3.substr(e4 + 1));
              }
              this.options.transformTagName && (o3 = this.options.transformTagName(o3)), n2 && (i2 = this.saveTextToParentTag(i2, n2, r2));
              const a2 = r2.substring(r2.lastIndexOf(".") + 1);
              if (o3 && -1 !== this.options.unpairedTags.indexOf(o3))
                throw new Error(`Unpaired tag can not be used as closing tag: </${o3}>`);
              let c2 = 0;
              a2 && -1 !== this.options.unpairedTags.indexOf(a2) ? (c2 = r2.lastIndexOf(".", r2.lastIndexOf(".") - 1), this.tagsNodeStack.pop()) : c2 = r2.lastIndexOf("."), r2 = r2.substring(0, c2), n2 = this.tagsNodeStack.pop(), i2 = "", s2 = t4;
            } else if ("?" === e3[s2 + 1]) {
              let t4 = x(e3, s2, false, "?>");
              if (!t4)
                throw new Error("Pi Tag is not closed.");
              if (i2 = this.saveTextToParentTag(i2, n2, r2), this.options.ignoreDeclaration && "?xml" === t4.tagName || this.options.ignorePiTags)
                ;
              else {
                const e4 = new o2(t4.tagName);
                e4.add(this.options.textNodeName, ""), t4.tagName !== t4.tagExp && t4.attrExpPresent && (e4[":@"] = this.buildAttributesMap(t4.tagExp, r2, t4.tagName)), this.addChild(n2, e4, r2);
              }
              s2 = t4.closeIndex + 1;
            } else if ("!--" === e3.substr(s2 + 1, 3)) {
              const t4 = y(e3, "-->", s2 + 4, "Comment is not closed.");
              if (this.options.commentPropName) {
                const o3 = e3.substring(s2 + 4, t4 - 2);
                i2 = this.saveTextToParentTag(i2, n2, r2), n2.add(this.options.commentPropName, [{ [this.options.textNodeName]: o3 }]);
              }
              s2 = t4;
            } else if ("!D" === e3.substr(s2 + 1, 2)) {
              const t4 = a(e3, s2);
              this.docTypeEntities = t4.entities, s2 = t4.i;
            } else if ("![" === e3.substr(s2 + 1, 2)) {
              const t4 = y(e3, "]]>", s2, "CDATA is not closed.") - 2, o3 = e3.substring(s2 + 9, t4);
              i2 = this.saveTextToParentTag(i2, n2, r2);
              let a2 = this.parseTextData(o3, n2.tagname, r2, true, false, true, true);
              null == a2 && (a2 = ""), this.options.cdataPropName ? n2.add(this.options.cdataPropName, [{ [this.options.textNodeName]: o3 }]) : n2.add(this.options.textNodeName, a2), s2 = t4 + 2;
            } else {
              let a2 = x(e3, s2, this.options.removeNSPrefix), c2 = a2.tagName;
              const l2 = a2.rawTagName;
              let p2 = a2.tagExp, u2 = a2.attrExpPresent, d2 = a2.closeIndex;
              this.options.transformTagName && (c2 = this.options.transformTagName(c2)), n2 && i2 && "!xml" !== n2.tagname && (i2 = this.saveTextToParentTag(i2, n2, r2, false));
              const f3 = n2;
              if (f3 && -1 !== this.options.unpairedTags.indexOf(f3.tagname) && (n2 = this.tagsNodeStack.pop(), r2 = r2.substring(0, r2.lastIndexOf("."))), c2 !== t3.tagname && (r2 += r2 ? "." + c2 : c2), this.isItStopNode(this.options.stopNodes, r2, c2)) {
                let t4 = "";
                if (p2.length > 0 && p2.lastIndexOf("/") === p2.length - 1)
                  "/" === c2[c2.length - 1] ? (c2 = c2.substr(0, c2.length - 1), r2 = r2.substr(0, r2.length - 1), p2 = c2) : p2 = p2.substr(0, p2.length - 1), s2 = a2.closeIndex;
                else if (-1 !== this.options.unpairedTags.indexOf(c2))
                  s2 = a2.closeIndex;
                else {
                  const n3 = this.readStopNodeData(e3, l2, d2 + 1);
                  if (!n3)
                    throw new Error(`Unexpected end of ${l2}`);
                  s2 = n3.i, t4 = n3.tagContent;
                }
                const i3 = new o2(c2);
                c2 !== p2 && u2 && (i3[":@"] = this.buildAttributesMap(p2, r2, c2)), t4 && (t4 = this.parseTextData(t4, c2, r2, true, u2, true, true)), r2 = r2.substr(0, r2.lastIndexOf(".")), i3.add(this.options.textNodeName, t4), this.addChild(n2, i3, r2);
              } else {
                if (p2.length > 0 && p2.lastIndexOf("/") === p2.length - 1) {
                  "/" === c2[c2.length - 1] ? (c2 = c2.substr(0, c2.length - 1), r2 = r2.substr(0, r2.length - 1), p2 = c2) : p2 = p2.substr(0, p2.length - 1), this.options.transformTagName && (c2 = this.options.transformTagName(c2));
                  const e4 = new o2(c2);
                  c2 !== p2 && u2 && (e4[":@"] = this.buildAttributesMap(p2, r2, c2)), this.addChild(n2, e4, r2), r2 = r2.substr(0, r2.lastIndexOf("."));
                } else {
                  const e4 = new o2(c2);
                  this.tagsNodeStack.push(n2), c2 !== p2 && u2 && (e4[":@"] = this.buildAttributesMap(p2, r2, c2)), this.addChild(n2, e4, r2), n2 = e4;
                }
                i2 = "", s2 = d2;
              }
            }
          else
            i2 += e3[s2];
        }
        return t3.child;
      };
      function m(e3, t3, n2) {
        const i2 = this.options.updateTag(t3.tagname, n2, t3[":@"]);
        false === i2 || ("string" == typeof i2 ? (t3.tagname = i2, e3.addChild(t3)) : e3.addChild(t3));
      }
      const h = function(e3) {
        if (this.options.processEntities) {
          for (let t3 in this.docTypeEntities) {
            const n2 = this.docTypeEntities[t3];
            e3 = e3.replace(n2.regx, n2.val);
          }
          for (let t3 in this.lastEntities) {
            const n2 = this.lastEntities[t3];
            e3 = e3.replace(n2.regex, n2.val);
          }
          if (this.options.htmlEntities)
            for (let t3 in this.htmlEntities) {
              const n2 = this.htmlEntities[t3];
              e3 = e3.replace(n2.regex, n2.val);
            }
          e3 = e3.replace(this.ampEntity.regex, this.ampEntity.val);
        }
        return e3;
      };
      function g(e3, t3, n2, i2) {
        return e3 && (void 0 === i2 && (i2 = 0 === Object.keys(t3.child).length), void 0 !== (e3 = this.parseTextData(e3, t3.tagname, n2, false, !!t3[":@"] && 0 !== Object.keys(t3[":@"]).length, i2)) && "" !== e3 && t3.add(this.options.textNodeName, e3), e3 = ""), e3;
      }
      function v(e3, t3, n2) {
        const i2 = "*." + n2;
        for (const n3 in e3) {
          const o3 = e3[n3];
          if (i2 === o3 || t3 === o3)
            return true;
        }
        return false;
      }
      function y(e3, t3, n2, i2) {
        const o3 = e3.indexOf(t3, n2);
        if (-1 === o3)
          throw new Error(i2);
        return o3 + t3.length - 1;
      }
      function x(e3, t3, n2, i2 = ">") {
        const o3 = function(e4, t4, n3 = ">") {
          let i3, o4 = "";
          for (let a3 = t4; a3 < e4.length; a3++) {
            let t5 = e4[a3];
            if (i3)
              t5 === i3 && (i3 = "");
            else if ('"' === t5 || "'" === t5)
              i3 = t5;
            else if (t5 === n3[0]) {
              if (!n3[1])
                return { data: o4, index: a3 };
              if (e4[a3 + 1] === n3[1])
                return { data: o4, index: a3 };
            } else
              "	" === t5 && (t5 = " ");
            o4 += t5;
          }
        }(e3, t3 + 1, i2);
        if (!o3)
          return;
        let a2 = o3.data;
        const r2 = o3.index, s2 = a2.search(/\s/);
        let c2 = a2, l2 = true;
        -1 !== s2 && (c2 = a2.substring(0, s2), a2 = a2.substring(s2 + 1).trimStart());
        const p2 = c2;
        if (n2) {
          const e4 = c2.indexOf(":");
          -1 !== e4 && (c2 = c2.substr(e4 + 1), l2 = c2 !== o3.data.substr(e4 + 1));
        }
        return { tagName: c2, tagExp: a2, closeIndex: r2, attrExpPresent: l2, rawTagName: p2 };
      }
      function k(e3, t3, n2) {
        const i2 = n2;
        let o3 = 1;
        for (; n2 < e3.length; n2++)
          if ("<" === e3[n2])
            if ("/" === e3[n2 + 1]) {
              const a2 = y(e3, ">", n2, `${t3} is not closed`);
              if (e3.substring(n2 + 2, a2).trim() === t3 && (o3--, 0 === o3))
                return { tagContent: e3.substring(i2, n2), i: a2 };
              n2 = a2;
            } else if ("?" === e3[n2 + 1]) {
              n2 = y(e3, "?>", n2 + 1, "StopNode is not closed.");
            } else if ("!--" === e3.substr(n2 + 1, 3)) {
              n2 = y(e3, "-->", n2 + 3, "StopNode is not closed.");
            } else if ("![" === e3.substr(n2 + 1, 2)) {
              n2 = y(e3, "]]>", n2, "StopNode is not closed.") - 2;
            } else {
              const i3 = x(e3, n2, ">");
              if (i3) {
                (i3 && i3.tagName) === t3 && "/" !== i3.tagExp[i3.tagExp.length - 1] && o3++, n2 = i3.closeIndex;
              }
            }
      }
      function b(e3, t3, n2) {
        if (t3 && "string" == typeof e3) {
          const t4 = e3.trim();
          return "true" === t4 || "false" !== t4 && r(e3, n2);
        }
        return i.isExist(e3) ? e3 : "";
      }
      e2.exports = class {
        constructor(e3) {
          this.options = e3, this.currentNode = null, this.tagsNodeStack = [], this.docTypeEntities = {}, this.lastEntities = { apos: { regex: /&(apos|#39|#x27);/g, val: "'" }, gt: { regex: /&(gt|#62|#x3E);/g, val: ">" }, lt: { regex: /&(lt|#60|#x3C);/g, val: "<" }, quot: { regex: /&(quot|#34|#x22);/g, val: '"' } }, this.ampEntity = { regex: /&(amp|#38|#x26);/g, val: "&" }, this.htmlEntities = { space: { regex: /&(nbsp|#160);/g, val: " " }, cent: { regex: /&(cent|#162);/g, val: "¢" }, pound: { regex: /&(pound|#163);/g, val: "£" }, yen: { regex: /&(yen|#165);/g, val: "¥" }, euro: { regex: /&(euro|#8364);/g, val: "€" }, copyright: { regex: /&(copy|#169);/g, val: "©" }, reg: { regex: /&(reg|#174);/g, val: "®" }, inr: { regex: /&(inr|#8377);/g, val: "₹" }, num_dec: { regex: /&#([0-9]{1,7});/g, val: (e4, t3) => String.fromCharCode(Number.parseInt(t3, 10)) }, num_hex: { regex: /&#x([0-9a-fA-F]{1,6});/g, val: (e4, t3) => String.fromCharCode(Number.parseInt(t3, 16)) } }, this.addExternalEntities = c, this.parseXml = f2, this.parseTextData = l, this.resolveNameSpace = p, this.buildAttributesMap = d, this.isItStopNode = v, this.replaceEntitiesValue = h, this.readStopNodeData = k, this.saveTextToParentTag = g, this.addChild = m, this.ignoreAttributesFn = s(this.options.ignoreAttributes);
        }
      };
    }, function(e2, t2, n) {
      e2.exports = class {
        constructor(e3) {
          this.tagname = e3, this.child = [], this[":@"] = {};
        }
        add(e3, t3) {
          "__proto__" === e3 && (e3 = "#__proto__"), this.child.push({ [e3]: t3 });
        }
        addChild(e3) {
          "__proto__" === e3.tagname && (e3.tagname = "#__proto__"), e3[":@"] && Object.keys(e3[":@"]).length > 0 ? this.child.push({ [e3.tagname]: e3.child, ":@": e3[":@"] }) : this.child.push({ [e3.tagname]: e3.child });
        }
      };
    }, function(e2, t2, n) {
      const i = n(1);
      function o2(e3, t3) {
        let n2 = "";
        for (; t3 < e3.length && "'" !== e3[t3] && '"' !== e3[t3]; t3++)
          n2 += e3[t3];
        if (n2 = n2.trim(), -1 !== n2.indexOf(" "))
          throw new Error("External entites are not supported");
        const i2 = e3[t3++];
        let o3 = "";
        for (; t3 < e3.length && e3[t3] !== i2; t3++)
          o3 += e3[t3];
        return [n2, o3, t3];
      }
      function a(e3, t3) {
        return "!" === e3[t3 + 1] && "-" === e3[t3 + 2] && "-" === e3[t3 + 3];
      }
      function r(e3, t3) {
        return "!" === e3[t3 + 1] && "E" === e3[t3 + 2] && "N" === e3[t3 + 3] && "T" === e3[t3 + 4] && "I" === e3[t3 + 5] && "T" === e3[t3 + 6] && "Y" === e3[t3 + 7];
      }
      function s(e3, t3) {
        return "!" === e3[t3 + 1] && "E" === e3[t3 + 2] && "L" === e3[t3 + 3] && "E" === e3[t3 + 4] && "M" === e3[t3 + 5] && "E" === e3[t3 + 6] && "N" === e3[t3 + 7] && "T" === e3[t3 + 8];
      }
      function c(e3, t3) {
        return "!" === e3[t3 + 1] && "A" === e3[t3 + 2] && "T" === e3[t3 + 3] && "T" === e3[t3 + 4] && "L" === e3[t3 + 5] && "I" === e3[t3 + 6] && "S" === e3[t3 + 7] && "T" === e3[t3 + 8];
      }
      function l(e3, t3) {
        return "!" === e3[t3 + 1] && "N" === e3[t3 + 2] && "O" === e3[t3 + 3] && "T" === e3[t3 + 4] && "A" === e3[t3 + 5] && "T" === e3[t3 + 6] && "I" === e3[t3 + 7] && "O" === e3[t3 + 8] && "N" === e3[t3 + 9];
      }
      function p(e3) {
        if (i.isName(e3))
          return e3;
        throw new Error(`Invalid entity name ${e3}`);
      }
      e2.exports = function(e3, t3) {
        const n2 = {};
        if ("O" !== e3[t3 + 3] || "C" !== e3[t3 + 4] || "T" !== e3[t3 + 5] || "Y" !== e3[t3 + 6] || "P" !== e3[t3 + 7] || "E" !== e3[t3 + 8])
          throw new Error("Invalid Tag instead of DOCTYPE");
        {
          t3 += 9;
          let i2 = 1, u = false, d = false, f2 = "";
          for (; t3 < e3.length; t3++)
            if ("<" !== e3[t3] || d)
              if (">" === e3[t3]) {
                if (d ? "-" === e3[t3 - 1] && "-" === e3[t3 - 2] && (d = false, i2--) : i2--, 0 === i2)
                  break;
              } else
                "[" === e3[t3] ? u = true : f2 += e3[t3];
            else {
              if (u && r(e3, t3))
                t3 += 7, [entityName, val, t3] = o2(e3, t3 + 1), -1 === val.indexOf("&") && (n2[p(entityName)] = { regx: RegExp(`&${entityName};`, "g"), val });
              else if (u && s(e3, t3))
                t3 += 8;
              else if (u && c(e3, t3))
                t3 += 8;
              else if (u && l(e3, t3))
                t3 += 9;
              else {
                if (!a)
                  throw new Error("Invalid DOCTYPE");
                d = true;
              }
              i2++, f2 = "";
            }
          if (0 !== i2)
            throw new Error("Unclosed DOCTYPE");
        }
        return { entities: n2, i: t3 };
      };
    }, function(e2, t2) {
      const n = /^[-+]?0x[a-fA-F0-9]+$/, i = /^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;
      !Number.parseInt && window.parseInt && (Number.parseInt = window.parseInt), !Number.parseFloat && window.parseFloat && (Number.parseFloat = window.parseFloat);
      const o2 = { hex: true, leadingZeros: true, decimalPoint: ".", eNotation: true };
      e2.exports = function(e3, t3 = {}) {
        if (t3 = Object.assign({}, o2, t3), !e3 || "string" != typeof e3)
          return e3;
        let a = e3.trim();
        if (void 0 !== t3.skipLike && t3.skipLike.test(a))
          return e3;
        if (t3.hex && n.test(a))
          return Number.parseInt(a, 16);
        {
          const n2 = i.exec(a);
          if (n2) {
            const i2 = n2[1], o3 = n2[2];
            let r = function(e4) {
              if (e4 && -1 !== e4.indexOf("."))
                return "." === (e4 = e4.replace(/0+$/, "")) ? e4 = "0" : "." === e4[0] ? e4 = "0" + e4 : "." === e4[e4.length - 1] && (e4 = e4.substr(0, e4.length - 1)), e4;
              return e4;
            }(n2[3]);
            const s = n2[4] || n2[6];
            if (!t3.leadingZeros && o3.length > 0 && i2 && "." !== a[2])
              return e3;
            if (!t3.leadingZeros && o3.length > 0 && !i2 && "." !== a[1])
              return e3;
            {
              const n3 = Number(a), c = "" + n3;
              return -1 !== c.search(/[eE]/) || s ? t3.eNotation ? n3 : e3 : -1 !== a.indexOf(".") ? "0" === c && "" === r || c === r || i2 && c === "-" + r ? n3 : e3 : o3 ? r === c || i2 + r === c ? n3 : e3 : a === c || a === i2 + c ? n3 : e3;
            }
          }
          return e3;
        }
      };
    }, function(e2, t2, n) {
      function i(e3, t3, n2) {
        let s;
        const c = {};
        for (let l = 0; l < e3.length; l++) {
          const p = e3[l], u = o2(p);
          let d = "";
          if (d = void 0 === n2 ? u : n2 + "." + u, u === t3.textNodeName)
            void 0 === s ? s = p[u] : s += "" + p[u];
          else {
            if (void 0 === u)
              continue;
            if (p[u]) {
              let e4 = i(p[u], t3, d);
              const n3 = r(e4, t3);
              p[":@"] ? a(e4, p[":@"], d, t3) : 1 !== Object.keys(e4).length || void 0 === e4[t3.textNodeName] || t3.alwaysCreateTextNode ? 0 === Object.keys(e4).length && (t3.alwaysCreateTextNode ? e4[t3.textNodeName] = "" : e4 = "") : e4 = e4[t3.textNodeName], void 0 !== c[u] && c.hasOwnProperty(u) ? (Array.isArray(c[u]) || (c[u] = [c[u]]), c[u].push(e4)) : t3.isArray(u, d, n3) ? c[u] = [e4] : c[u] = e4;
            }
          }
        }
        return "string" == typeof s ? s.length > 0 && (c[t3.textNodeName] = s) : void 0 !== s && (c[t3.textNodeName] = s), c;
      }
      function o2(e3) {
        const t3 = Object.keys(e3);
        for (let e4 = 0; e4 < t3.length; e4++) {
          const n2 = t3[e4];
          if (":@" !== n2)
            return n2;
        }
      }
      function a(e3, t3, n2, i2) {
        if (t3) {
          const o3 = Object.keys(t3), a2 = o3.length;
          for (let r2 = 0; r2 < a2; r2++) {
            const a3 = o3[r2];
            i2.isArray(a3, n2 + "." + a3, true, true) ? e3[a3] = [t3[a3]] : e3[a3] = t3[a3];
          }
        }
      }
      function r(e3, t3) {
        const { textNodeName: n2 } = t3, i2 = Object.keys(e3).length;
        return 0 === i2 || !(1 !== i2 || !e3[n2] && "boolean" != typeof e3[n2] && 0 !== e3[n2]);
      }
      t2.prettify = function(e3, t3) {
        return i(e3, t3);
      };
    }, function(e2, t2, n) {
      const i = n(24), o2 = n(5), a = { attributeNamePrefix: "@_", attributesGroupName: false, textNodeName: "#text", ignoreAttributes: true, cdataPropName: false, format: false, indentBy: "  ", suppressEmptyNode: false, suppressUnpairedNode: true, suppressBooleanAttributes: true, tagValueProcessor: function(e3, t3) {
        return t3;
      }, attributeValueProcessor: function(e3, t3) {
        return t3;
      }, preserveOrder: false, commentPropName: false, unpairedTags: [], entities: [{ regex: new RegExp("&", "g"), val: "&amp;" }, { regex: new RegExp(">", "g"), val: "&gt;" }, { regex: new RegExp("<", "g"), val: "&lt;" }, { regex: new RegExp("'", "g"), val: "&apos;" }, { regex: new RegExp('"', "g"), val: "&quot;" }], processEntities: true, stopNodes: [], oneListGroup: false };
      function r(e3) {
        this.options = Object.assign({}, a, e3), true === this.options.ignoreAttributes || this.options.attributesGroupName ? this.isAttribute = function() {
          return false;
        } : (this.ignoreAttributesFn = o2(this.options.ignoreAttributes), this.attrPrefixLen = this.options.attributeNamePrefix.length, this.isAttribute = l), this.processTextOrObjNode = s, this.options.format ? (this.indentate = c, this.tagEndChar = ">\n", this.newLine = "\n") : (this.indentate = function() {
          return "";
        }, this.tagEndChar = ">", this.newLine = "");
      }
      function s(e3, t3, n2, i2) {
        const o3 = this.j2x(e3, n2 + 1, i2.concat(t3));
        return void 0 !== e3[this.options.textNodeName] && 1 === Object.keys(e3).length ? this.buildTextValNode(e3[this.options.textNodeName], t3, o3.attrStr, n2) : this.buildObjectNode(o3.val, t3, o3.attrStr, n2);
      }
      function c(e3) {
        return this.options.indentBy.repeat(e3);
      }
      function l(e3) {
        return !(!e3.startsWith(this.options.attributeNamePrefix) || e3 === this.options.textNodeName) && e3.substr(this.attrPrefixLen);
      }
      r.prototype.build = function(e3) {
        return this.options.preserveOrder ? i(e3, this.options) : (Array.isArray(e3) && this.options.arrayNodeName && this.options.arrayNodeName.length > 1 && (e3 = { [this.options.arrayNodeName]: e3 }), this.j2x(e3, 0, []).val);
      }, r.prototype.j2x = function(e3, t3, n2) {
        let i2 = "", o3 = "";
        const a2 = n2.join(".");
        for (let r2 in e3)
          if (Object.prototype.hasOwnProperty.call(e3, r2))
            if (void 0 === e3[r2])
              this.isAttribute(r2) && (o3 += "");
            else if (null === e3[r2])
              this.isAttribute(r2) ? o3 += "" : "?" === r2[0] ? o3 += this.indentate(t3) + "<" + r2 + "?" + this.tagEndChar : o3 += this.indentate(t3) + "<" + r2 + "/" + this.tagEndChar;
            else if (e3[r2] instanceof Date)
              o3 += this.buildTextValNode(e3[r2], r2, "", t3);
            else if ("object" != typeof e3[r2]) {
              const n3 = this.isAttribute(r2);
              if (n3 && !this.ignoreAttributesFn(n3, a2))
                i2 += this.buildAttrPairStr(n3, "" + e3[r2]);
              else if (!n3)
                if (r2 === this.options.textNodeName) {
                  let t4 = this.options.tagValueProcessor(r2, "" + e3[r2]);
                  o3 += this.replaceEntitiesValue(t4);
                } else
                  o3 += this.buildTextValNode(e3[r2], r2, "", t3);
            } else if (Array.isArray(e3[r2])) {
              const i3 = e3[r2].length;
              let a3 = "", s2 = "";
              for (let c2 = 0; c2 < i3; c2++) {
                const i4 = e3[r2][c2];
                if (void 0 === i4)
                  ;
                else if (null === i4)
                  "?" === r2[0] ? o3 += this.indentate(t3) + "<" + r2 + "?" + this.tagEndChar : o3 += this.indentate(t3) + "<" + r2 + "/" + this.tagEndChar;
                else if ("object" == typeof i4)
                  if (this.options.oneListGroup) {
                    const e4 = this.j2x(i4, t3 + 1, n2.concat(r2));
                    a3 += e4.val, this.options.attributesGroupName && i4.hasOwnProperty(this.options.attributesGroupName) && (s2 += e4.attrStr);
                  } else
                    a3 += this.processTextOrObjNode(i4, r2, t3, n2);
                else if (this.options.oneListGroup) {
                  let e4 = this.options.tagValueProcessor(r2, i4);
                  e4 = this.replaceEntitiesValue(e4), a3 += e4;
                } else
                  a3 += this.buildTextValNode(i4, r2, "", t3);
              }
              this.options.oneListGroup && (a3 = this.buildObjectNode(a3, r2, s2, t3)), o3 += a3;
            } else if (this.options.attributesGroupName && r2 === this.options.attributesGroupName) {
              const t4 = Object.keys(e3[r2]), n3 = t4.length;
              for (let o4 = 0; o4 < n3; o4++)
                i2 += this.buildAttrPairStr(t4[o4], "" + e3[r2][t4[o4]]);
            } else
              o3 += this.processTextOrObjNode(e3[r2], r2, t3, n2);
        return { attrStr: i2, val: o3 };
      }, r.prototype.buildAttrPairStr = function(e3, t3) {
        return t3 = this.options.attributeValueProcessor(e3, "" + t3), t3 = this.replaceEntitiesValue(t3), this.options.suppressBooleanAttributes && "true" === t3 ? " " + e3 : " " + e3 + '="' + t3 + '"';
      }, r.prototype.buildObjectNode = function(e3, t3, n2, i2) {
        if ("" === e3)
          return "?" === t3[0] ? this.indentate(i2) + "<" + t3 + n2 + "?" + this.tagEndChar : this.indentate(i2) + "<" + t3 + n2 + this.closeTag(t3) + this.tagEndChar;
        {
          let o3 = "</" + t3 + this.tagEndChar, a2 = "";
          return "?" === t3[0] && (a2 = "?", o3 = ""), !n2 && "" !== n2 || -1 !== e3.indexOf("<") ? false !== this.options.commentPropName && t3 === this.options.commentPropName && 0 === a2.length ? this.indentate(i2) + `<!--${e3}-->` + this.newLine : this.indentate(i2) + "<" + t3 + n2 + a2 + this.tagEndChar + e3 + this.indentate(i2) + o3 : this.indentate(i2) + "<" + t3 + n2 + a2 + ">" + e3 + o3;
        }
      }, r.prototype.closeTag = function(e3) {
        let t3 = "";
        return -1 !== this.options.unpairedTags.indexOf(e3) ? this.options.suppressUnpairedNode || (t3 = "/") : t3 = this.options.suppressEmptyNode ? "/" : `></${e3}`, t3;
      }, r.prototype.buildTextValNode = function(e3, t3, n2, i2) {
        if (false !== this.options.cdataPropName && t3 === this.options.cdataPropName)
          return this.indentate(i2) + `<![CDATA[${e3}]]>` + this.newLine;
        if (false !== this.options.commentPropName && t3 === this.options.commentPropName)
          return this.indentate(i2) + `<!--${e3}-->` + this.newLine;
        if ("?" === t3[0])
          return this.indentate(i2) + "<" + t3 + n2 + "?" + this.tagEndChar;
        {
          let o3 = this.options.tagValueProcessor(t3, e3);
          return o3 = this.replaceEntitiesValue(o3), "" === o3 ? this.indentate(i2) + "<" + t3 + n2 + this.closeTag(t3) + this.tagEndChar : this.indentate(i2) + "<" + t3 + n2 + ">" + o3 + "</" + t3 + this.tagEndChar;
        }
      }, r.prototype.replaceEntitiesValue = function(e3) {
        if (e3 && e3.length > 0 && this.options.processEntities)
          for (let t3 = 0; t3 < this.options.entities.length; t3++) {
            const n2 = this.options.entities[t3];
            e3 = e3.replace(n2.regex, n2.val);
          }
        return e3;
      }, e2.exports = r;
    }, function(e2, t2) {
      function n(e3, t3, s, c) {
        let l = "", p = false;
        for (let u = 0; u < e3.length; u++) {
          const d = e3[u], f2 = i(d);
          if (void 0 === f2)
            continue;
          let m = "";
          if (m = 0 === s.length ? f2 : `${s}.${f2}`, f2 === t3.textNodeName) {
            let e4 = d[f2];
            a(m, t3) || (e4 = t3.tagValueProcessor(f2, e4), e4 = r(e4, t3)), p && (l += c), l += e4, p = false;
            continue;
          }
          if (f2 === t3.cdataPropName) {
            p && (l += c), l += `<![CDATA[${d[f2][0][t3.textNodeName]}]]>`, p = false;
            continue;
          }
          if (f2 === t3.commentPropName) {
            l += c + `<!--${d[f2][0][t3.textNodeName]}-->`, p = true;
            continue;
          }
          if ("?" === f2[0]) {
            const e4 = o2(d[":@"], t3), n2 = "?xml" === f2 ? "" : c;
            let i2 = d[f2][0][t3.textNodeName];
            i2 = 0 !== i2.length ? " " + i2 : "", l += n2 + `<${f2}${i2}${e4}?>`, p = true;
            continue;
          }
          let h = c;
          "" !== h && (h += t3.indentBy);
          const g = c + `<${f2}${o2(d[":@"], t3)}`, v = n(d[f2], t3, m, h);
          -1 !== t3.unpairedTags.indexOf(f2) ? t3.suppressUnpairedNode ? l += g + ">" : l += g + "/>" : v && 0 !== v.length || !t3.suppressEmptyNode ? v && v.endsWith(">") ? l += g + `>${v}${c}</${f2}>` : (l += g + ">", v && "" !== c && (v.includes("/>") || v.includes("</")) ? l += c + t3.indentBy + v + c : l += v, l += `</${f2}>`) : l += g + "/>", p = true;
        }
        return l;
      }
      function i(e3) {
        const t3 = Object.keys(e3);
        for (let n2 = 0; n2 < t3.length; n2++) {
          const i2 = t3[n2];
          if (e3.hasOwnProperty(i2) && ":@" !== i2)
            return i2;
        }
      }
      function o2(e3, t3) {
        let n2 = "";
        if (e3 && !t3.ignoreAttributes)
          for (let i2 in e3) {
            if (!e3.hasOwnProperty(i2))
              continue;
            let o3 = t3.attributeValueProcessor(i2, e3[i2]);
            o3 = r(o3, t3), true === o3 && t3.suppressBooleanAttributes ? n2 += ` ${i2.substr(t3.attributeNamePrefix.length)}` : n2 += ` ${i2.substr(t3.attributeNamePrefix.length)}="${o3}"`;
          }
        return n2;
      }
      function a(e3, t3) {
        let n2 = (e3 = e3.substr(0, e3.length - t3.textNodeName.length - 1)).substr(e3.lastIndexOf(".") + 1);
        for (let i2 in t3.stopNodes)
          if (t3.stopNodes[i2] === e3 || t3.stopNodes[i2] === "*." + n2)
            return true;
        return false;
      }
      function r(e3, t3) {
        if (e3 && e3.length > 0 && t3.processEntities)
          for (let n2 = 0; n2 < t3.entities.length; n2++) {
            const i2 = t3.entities[n2];
            e3 = e3.replace(i2.regex, i2.val);
          }
        return e3;
      }
      e2.exports = function(e3, t3) {
        let i2 = "";
        return t3.format && t3.indentBy.length > 0 && (i2 = "\n"), n(e3, t3, "", i2);
      };
    }, function(e2, t2, n) {
      var i = n(7), o2 = n(0), a = {};
      e2.exports.transferToTaskMethod = function(e3, t3) {
        a[t3] = e3[t3], e3[t3] = function(e4, n2) {
          e4.SkipTask ? a[t3].call(this, e4, n2) : this._addTask(t3, e4, n2);
        };
      }, e2.exports.init = function(e3) {
        var t3, n2, r = [], s = {}, c = 0, l = 0, p = function(e4) {
          var t4 = { id: e4.id, Bucket: e4.Bucket, Region: e4.Region, Key: e4.Key, FilePath: e4.FilePath, state: e4.state, loaded: e4.loaded, size: e4.size, speed: e4.speed, percent: e4.percent, hashPercent: e4.hashPercent, error: e4.error };
          return e4.FilePath && (t4.FilePath = e4.FilePath), t4;
        }, u = (n2 = function() {
          t3 = 0, e3.emit("task-list-update", { list: o2.map(r, p) }), e3.emit("list-update", { list: o2.map(r, p) });
        }, function() {
          t3 || (t3 = setTimeout(n2));
        }), d = function() {
          if (!(r.length <= e3.options.UploadQueueSize)) {
            for (var t4 = 0; t4 < l && t4 < r.length && r.length > e3.options.UploadQueueSize; ) {
              var n3 = "waiting" === r[t4].state || "checking" === r[t4].state || "uploading" === r[t4].state;
              r[t4] && n3 ? t4++ : (s[r[t4].id] && delete s[r[t4].id], r.splice(t4, 1), l--);
            }
            u();
          }
        }, f2 = function t4() {
          if (!(c >= e3.options.FileParallelLimit)) {
            for (; r[l] && "waiting" !== r[l].state; )
              l++;
            if (!(l >= r.length)) {
              var n3 = r[l];
              l++, c++, n3.state = "checking", n3.params.onTaskStart && n3.params.onTaskStart(p(n3)), !n3.params.UploadData && (n3.params.UploadData = {});
              var i2 = o2.formatParams(n3.api, n3.params);
              a[n3.api].call(e3, i2, function(i3, o3) {
                e3._isRunningTask(n3.id) && ("checking" !== n3.state && "uploading" !== n3.state || (n3.state = i3 ? "error" : "success", i3 && (n3.error = i3), c--, u(), t4(), n3.callback && n3.callback(i3, o3), "success" === n3.state && (n3.params && (delete n3.params.UploadData, delete n3.params.Body, delete n3.params), delete n3.callback)), d());
              }), u(), setTimeout(t4);
            }
          }
        }, m = function(t4, n3) {
          var o3 = s[t4];
          if (o3) {
            var a2 = o3 && "waiting" === o3.state, r2 = o3 && ("checking" === o3.state || "uploading" === o3.state);
            if ("canceled" === n3 && "canceled" !== o3.state || "paused" === n3 && a2 || "paused" === n3 && r2) {
              if ("paused" === n3 && o3.params.Body && "function" == typeof o3.params.Body.pipe)
                return;
              o3.state = n3, e3.emit("inner-kill-task", { TaskId: t4, toState: n3 });
              try {
                var l2 = o3 && o3.params && o3.params.UploadData.UploadId;
              } catch (e4) {
              }
              "canceled" === n3 && l2 && i.removeUsing(l2), u(), r2 && (c--, f2()), "canceled" === n3 && (o3.params && (delete o3.params.UploadData, delete o3.params.Body, delete o3.params), delete o3.callback);
            }
            d();
          }
        };
        e3._addTasks = function(t4) {
          o2.each(t4, function(t5) {
            e3._addTask(t5.api, t5.params, t5.callback, true);
          }), u();
        }, e3._addTask = function(t4, n3, i2, a2) {
          var c2 = "postObject" === e3.options.SimpleUploadMethod ? "postObject" : "putObject";
          "sliceUploadFile" !== t4 || o2.canFileSlice() || (t4 = c2), n3 = o2.formatParams(t4, n3);
          var l2 = o2.uuid();
          n3.TaskId = l2, n3.onTaskReady && n3.onTaskReady(l2);
          var p2 = { params: n3, callback: i2, api: t4, index: r.length, id: l2, Bucket: n3.Bucket, Region: n3.Region, Key: n3.Key, FilePath: n3.FilePath || "", state: "waiting", loaded: 0, size: 0, speed: 0, percent: 0, hashPercent: 0, error: null }, m2 = n3.onHashProgress;
          n3.onHashProgress = function(t5) {
            e3._isRunningTask(p2.id) && (p2.hashPercent = t5.percent, m2 && m2(t5), u());
          };
          var h = n3.onProgress;
          return n3.onProgress = function(t5) {
            e3._isRunningTask(p2.id) && ("checking" === p2.state && (p2.state = "uploading"), p2.loaded = t5.loaded, p2.size = t5.total, p2.speed = t5.speed, p2.percent = t5.percent, h && h(t5), u());
          }, o2.getFileSize(t4, n3, function(e4, t5) {
            e4 ? i2(e4) : (s[l2] = p2, r.push(p2), p2.size = t5, !a2 && u(), f2(), d());
          }), l2;
        }, e3._isRunningTask = function(e4) {
          var t4 = s[e4];
          return !(!t4 || "checking" !== t4.state && "uploading" !== t4.state);
        }, e3.getTaskList = function() {
          return o2.map(r, p);
        }, e3.cancelTask = function(e4) {
          m(e4, "canceled");
        }, e3.pauseTask = function(e4) {
          m(e4, "paused");
        }, e3.restartTask = function(e4) {
          var t4 = s[e4];
          !t4 || "paused" !== t4.state && "error" !== t4.state || (t4.state = "waiting", u(), l = Math.min(l, t4.index), f2());
        }, e3.isUploadRunning = function() {
          return c || l < r.length;
        };
      };
    }, function(e2, t2, n) {
      var i = n(27), o2 = n(0), a = n(28);
      function r(e3) {
        var t3 = { GrantFullControl: [], GrantWrite: [], GrantRead: [], GrantReadAcp: [], GrantWriteAcp: [], ACL: "" }, n2 = { FULL_CONTROL: "GrantFullControl", WRITE: "GrantWrite", READ: "GrantRead", READ_ACP: "GrantReadAcp", WRITE_ACP: "GrantWriteAcp" }, i2 = (e3 && e3.AccessControlList || {}).Grant;
        i2 && (i2 = o2.isArray(i2) ? i2 : [i2]);
        var a2 = { READ: 0, WRITE: 0, FULL_CONTROL: 0 };
        return i2 && i2.length && o2.each(i2, function(i3) {
          "qcs::cam::anyone:anyone" === i3.Grantee.ID || "http://cam.qcloud.com/groups/global/AllUsers" === i3.Grantee.URI ? a2[i3.Permission] = 1 : i3.Grantee.ID !== e3.Owner.ID && t3[n2[i3.Permission]].push('id="' + i3.Grantee.ID + '"');
        }), a2.FULL_CONTROL || a2.WRITE && a2.READ ? t3.ACL = "public-read-write" : a2.READ ? t3.ACL = "public-read" : t3.ACL = "private", o2.each(n2, function(e4) {
          t3[e4] = s(t3[e4].join(","));
        }), t3;
      }
      function s(e3) {
        var t3, n2, i2 = e3.split(","), o3 = {};
        for (t3 = 0; t3 < i2.length; )
          o3[n2 = i2[t3].trim()] ? i2.splice(t3, 1) : (o3[n2] = true, i2[t3] = n2, t3++);
        return i2.join(",");
      }
      function c(e3) {
        var t3 = e3.bucket, n2 = t3.substr(0, t3.lastIndexOf("-")), i2 = t3.substr(t3.lastIndexOf("-") + 1), a2 = e3.domain, r2 = e3.region, s2 = e3.object;
        a2 || (a2 = ["cn-south", "cn-south-2", "cn-north", "cn-east", "cn-southwest", "sg"].indexOf(r2) > -1 ? "{Region}.myqcloud.com" : "cos.{Region}.myqcloud.com", e3.ForcePathStyle || (a2 = "{Bucket}." + a2)), a2 = (a2 = a2.replace(/\{\{AppId\}\}/gi, i2).replace(/\{\{Bucket\}\}/gi, n2).replace(/\{\{Region\}\}/gi, r2).replace(/\{\{.*?\}\}/gi, "")).replace(/\{AppId\}/gi, i2).replace(/\{BucketName\}/gi, n2).replace(/\{Bucket\}/gi, t3).replace(/\{Region\}/gi, r2).replace(/\{.*?\}/gi, ""), /^[a-zA-Z]+:\/\//.test(a2) || (a2 = "https://" + a2), "/" === a2.slice(-1) && (a2 = a2.slice(0, -1));
        var c2 = a2;
        return e3.ForcePathStyle && (c2 += "/" + t3), c2 += "/", s2 && (c2 += o2.camSafeUrlEncode(s2).replace(/%2F/g, "/")), e3.isLocation && (c2 = c2.replace(/^https?:\/\//, "")), c2;
      }
      var l = function(e3) {
        if (!e3.Bucket || !e3.Region)
          return "";
        var t3 = void 0 === e3.UseAccelerate ? this.options.UseAccelerate : e3.UseAccelerate;
        return (e3.Url || c({ ForcePathStyle: this.options.ForcePathStyle, protocol: this.options.Protocol, domain: this.options.Domain, bucket: e3.Bucket, region: t3 ? "accelerate" : e3.Region })).replace(/^https?:\/\/([^/]+)(\/.*)?$/, "$1");
      };
      function p(e3, t3) {
        var n2 = o2.clone(e3.Headers), i2 = "";
        o2.each(n2, function(e4, t4) {
          ("" === e4 || ["content-type", "cache-control"].indexOf(t4.toLowerCase()) > -1) && delete n2[t4], "host" === t4.toLowerCase() && (i2 = e4);
        });
        var a2 = false !== e3.ForceSignHost;
        !i2 && e3.SignHost && a2 && (n2.Host = e3.SignHost);
        var r2 = false, s2 = function(e4, n3) {
          r2 || (r2 = true, n3 && n3.XCosSecurityToken && !n3.SecurityToken && ((n3 = o2.clone(n3)).SecurityToken = n3.XCosSecurityToken, delete n3.XCosSecurityToken), t3 && t3(e4, n3));
        }, c2 = this, l2 = e3.Bucket || "", p2 = e3.Region || "", u2 = "name/cos:PostObject" !== e3.Action && e3.Key ? e3.Key : "";
        c2.options.ForcePathStyle && l2 && (u2 = l2 + "/" + u2);
        var d2 = "/" + u2, f3 = {}, m2 = e3.Scope;
        if (!m2) {
          var h2 = e3.Action || "", g = e3.ResourceKey || e3.Key || "";
          m2 = e3.Scope || [{ action: h2, bucket: l2, region: p2, prefix: g }];
        }
        var v = o2.md5(JSON.stringify(m2));
        c2._StsCache = c2._StsCache || [], function() {
          var e4, t4;
          for (e4 = c2._StsCache.length - 1; e4 >= 0; e4--) {
            t4 = c2._StsCache[e4];
            var n3 = Math.round(o2.getSkewTime(c2.options.SystemClockOffset) / 1e3) + 30;
            if (t4.StartTime && n3 < t4.StartTime || n3 >= t4.ExpiredTime)
              c2._StsCache.splice(e4, 1);
            else if (!t4.ScopeLimit || t4.ScopeLimit && t4.ScopeKey === v) {
              f3 = t4;
              break;
            }
          }
        }();
        var y = function() {
          var t4 = "";
          f3.StartTime && e3.Expires ? t4 = f3.StartTime + ";" + (f3.StartTime + 1 * e3.Expires) : f3.StartTime && f3.ExpiredTime && (t4 = f3.StartTime + ";" + f3.ExpiredTime);
          var i3 = { Authorization: o2.getAuth({ SecretId: f3.TmpSecretId, SecretKey: f3.TmpSecretKey, Method: e3.Method, Pathname: d2, Query: e3.Query, Headers: n2, Expires: e3.Expires, SystemClockOffset: c2.options.SystemClockOffset, KeyTime: t4, ForceSignHost: a2 }), SecurityToken: f3.SecurityToken || f3.XCosSecurityToken || "", Token: f3.Token || "", ClientIP: f3.ClientIP || "", ClientUA: f3.ClientUA || "", SignFrom: "client" };
          s2(null, i3);
        }, x = function(e4) {
          if (e4.Authorization) {
            var t4 = false, n3 = e4.Authorization;
            if (n3)
              if (n3.indexOf(" ") > -1)
                t4 = false;
              else if (n3.indexOf("q-sign-algorithm=") > -1 && n3.indexOf("q-ak=") > -1 && n3.indexOf("q-sign-time=") > -1 && n3.indexOf("q-key-time=") > -1 && n3.indexOf("q-url-param-list=") > -1)
                t4 = true;
              else
                try {
                  (n3 = atob(n3)).indexOf("a=") > -1 && n3.indexOf("k=") > -1 && n3.indexOf("t=") > -1 && n3.indexOf("r=") > -1 && n3.indexOf("b=") > -1 && (t4 = true);
                } catch (e5) {
                }
            if (!t4)
              return o2.error(new Error("getAuthorization callback params format error"));
          } else {
            if (!e4.TmpSecretId)
              return o2.error(new Error('getAuthorization callback params missing "TmpSecretId"'));
            if (!e4.TmpSecretKey)
              return o2.error(new Error('getAuthorization callback params missing "TmpSecretKey"'));
            if (!e4.SecurityToken && !e4.XCosSecurityToken)
              return o2.error(new Error('getAuthorization callback params missing "SecurityToken"'));
            if (!e4.ExpiredTime)
              return o2.error(new Error('getAuthorization callback params missing "ExpiredTime"'));
            if (e4.ExpiredTime && 10 !== e4.ExpiredTime.toString().length)
              return o2.error(new Error('getAuthorization callback params "ExpiredTime" should be 10 digits'));
            if (e4.StartTime && 10 !== e4.StartTime.toString().length)
              return o2.error(new Error('getAuthorization callback params "StartTime" should be 10 StartTime'));
          }
          return false;
        };
        if (f3.ExpiredTime && f3.ExpiredTime - o2.getSkewTime(c2.options.SystemClockOffset) / 1e3 > 60)
          y();
        else if (c2.options.getAuthorization)
          c2.options.getAuthorization.call(c2, { Bucket: l2, Region: p2, Method: e3.Method, Key: u2, Pathname: d2, Query: e3.Query, Headers: n2, Scope: m2, SystemClockOffset: c2.options.SystemClockOffset, ForceSignHost: a2 }, function(e4) {
            "string" == typeof e4 && (e4 = { Authorization: e4 });
            var t4 = x(e4);
            if (t4)
              return s2(t4);
            e4.Authorization ? s2(null, e4) : ((f3 = e4 || {}).Scope = m2, f3.ScopeKey = v, c2._StsCache.push(f3), y());
          });
        else {
          if (!c2.options.getSTS)
            return function() {
              var t4 = "";
              if (c2.options.StartTime && e3.Expires) {
                if (10 !== c2.options.StartTime.toString().length)
                  return s2(o2.error(new Error('params "StartTime" should be 10 digits')));
                t4 = c2.options.StartTime + ";" + (c2.options.StartTime + 1 * e3.Expires);
              } else if (c2.options.StartTime && c2.options.ExpiredTime) {
                if (10 !== c2.options.StartTime.toString().length)
                  return s2(o2.error(new Error('params "StartTime" should be 10 digits')));
                if (10 !== c2.options.ExpiredTime.toString().length)
                  return s2(o2.error(new Error('params "ExpiredTime" should be 10 digits')));
                t4 = c2.options.StartTime + ";" + 1 * c2.options.ExpiredTime;
              }
              var i3 = { Authorization: o2.getAuth({ SecretId: e3.SecretId || c2.options.SecretId, SecretKey: e3.SecretKey || c2.options.SecretKey, Method: e3.Method, Pathname: d2, Query: e3.Query, Headers: n2, Expires: e3.Expires, KeyTime: t4, SystemClockOffset: c2.options.SystemClockOffset, ForceSignHost: a2 }), SecurityToken: c2.options.SecurityToken || c2.options.XCosSecurityToken, SignFrom: "client" };
              return s2(null, i3), i3;
            }();
          c2.options.getSTS.call(c2, { Bucket: l2, Region: p2 }, function(e4) {
            (f3 = e4 || {}).Scope = m2, f3.ScopeKey = v, f3.TmpSecretId || (f3.TmpSecretId = f3.SecretId), f3.TmpSecretKey || (f3.TmpSecretKey = f3.SecretKey);
            var t4 = x(f3);
            if (t4)
              return s2(t4);
            c2._StsCache.push(f3), y();
          });
        }
        return "";
      }
      function u(e3) {
        var t3 = this, n2 = false, i2 = false, a2 = false, r2 = e3.headers && (e3.headers.date || e3.headers.Date) || e3.error && e3.error.ServerTime;
        try {
          var s2 = e3.error.Code, c2 = e3.error.Message;
          ("RequestTimeTooSkewed" === s2 || "AccessDenied" === s2 && "Request has expired" === c2) && (a2 = true);
        } catch (e4) {
        }
        if (e3) {
          if (a2 && r2) {
            var l2 = Date.parse(r2);
            this.options.CorrectClockSkew && Math.abs(o2.getSkewTime(this.options.SystemClockOffset) - l2) >= 3e4 && (this.options.SystemClockOffset = l2 - Date.now(), n2 = true);
          } else {
            if (5 === Math.floor(e3.statusCode / 100))
              return { canRetry: true, networkError: false };
            if ("timeout" === e3.message)
              return { canRetry: true, networkError: t3.options.AutoSwitchHost };
          }
          if (e3.statusCode) {
            var p2 = Math.floor(e3.statusCode / 100), u2 = (null == e3 ? void 0 : e3.headers) && (null == e3 ? void 0 : e3.headers["x-cos-request-id"]);
            [3, 4, 5].includes(p2) && !u2 && (n2 = t3.options.AutoSwitchHost, i2 = true);
          } else
            n2 = true, i2 = t3.options.AutoSwitchHost;
        }
        return { canRetry: n2, networkError: i2 };
      }
      function d(e3) {
        var t3 = e3.requestUrl, n2 = e3.clientCalcSign, i2 = e3.networkError;
        if (!this.options.AutoSwitchHost)
          return false;
        if (!t3)
          return false;
        if (!n2)
          return false;
        if (!i2)
          return false;
        return /^https?:\/\/[^\/]*\.cos\.[^\/]*\.myqcloud\.com(\/.*)?$/.test(t3) && !/^https?:\/\/[^\/]*\.cos\.accelerate\.myqcloud\.com(\/.*)?$/.test(t3);
      }
      function f2(e3, t3) {
        var n2 = this;
        !e3.headers && (e3.headers = {}), !e3.qs && (e3.qs = {}), e3.VersionId && (e3.qs.versionId = e3.VersionId), e3.qs = o2.clearKey(e3.qs), e3.headers && (e3.headers = o2.clearKey(e3.headers)), e3.qs && (e3.qs = o2.clearKey(e3.qs));
        var i2 = o2.clone(e3.qs);
        e3.action && (i2[e3.action] = "");
        var a2 = e3.url || e3.Url, r2 = e3.SignHost || l.call(this, { Bucket: e3.Bucket, Region: e3.Region, Url: a2 }), s2 = e3.tracker;
        !function o3(a3) {
          var c2 = n2.options.SystemClockOffset;
          e3.SwitchHost && (r2 = r2.replace(/myqcloud.com/, "tencentcos.cn")), s2 && s2.setParams({ signStartTime: (/* @__PURE__ */ new Date()).getTime(), httpRetryTimes: a3 - 1 }), p.call(n2, { Bucket: e3.Bucket || "", Region: e3.Region || "", Method: e3.method, Key: e3.Key, Query: i2, Headers: e3.headers, SignHost: r2, Action: e3.Action, ResourceKey: e3.ResourceKey, Scope: e3.Scope, ForceSignHost: n2.options.ForceSignHost }, function(i3, r3) {
            i3 ? t3(i3) : (s2 && s2.setParams({ signEndTime: (/* @__PURE__ */ new Date()).getTime(), httpStartTime: (/* @__PURE__ */ new Date()).getTime() }), e3.AuthData = r3, m.call(n2, e3, function(i4, l2) {
              var p2 = false, f3 = false;
              if (i4) {
                var m2 = u.call(n2, i4);
                p2 = m2.canRetry || c2 !== n2.options.SystemClockOffset, f3 = m2.networkError;
              }
              if (s2 && s2.setParams({ httpEndTime: (/* @__PURE__ */ new Date()).getTime() }), i4 && a3 < 4 && p2) {
                e3.headers && (delete e3.headers.Authorization, delete e3.headers.token, delete e3.headers.clientIP, delete e3.headers.clientUA, e3.headers["x-cos-security-token"] && delete e3.headers["x-cos-security-token"], e3.headers["x-ci-security-token"] && delete e3.headers["x-ci-security-token"]);
                var h2 = d.call(n2, { requestUrl: (null == i4 ? void 0 : i4.url) || "", clientCalcSign: "client" === (null == r3 ? void 0 : r3.SignFrom), networkError: f3 });
                e3.SwitchHost = h2, e3.headers["x-cos-sdk-retry"] = "true", o3(a3 + 1);
              } else
                t3(i4, l2);
            }));
          });
        }(1);
      }
      function m(e3, t3) {
        var n2 = this, a2 = e3.TaskId;
        if (!a2 || n2._isRunningTask(a2)) {
          var r2 = e3.Bucket, s2 = e3.Region, l2 = e3.Key, p2 = e3.method || "GET", u2 = e3.url || e3.Url, d2 = e3.body, f3 = e3.json, m2 = e3.rawBody, h2 = e3.dataType, g = n2.options.HttpDNSServiceId;
          n2.options.UseAccelerate && (s2 = "accelerate"), u2 = u2 || c({ ForcePathStyle: n2.options.ForcePathStyle, protocol: n2.options.Protocol, domain: n2.options.Domain, bucket: r2, region: s2, object: l2 }), e3.SwitchHost && (u2 = u2.replace(/myqcloud.com/, "tencentcos.cn"));
          var v = l2 ? u2 : "";
          e3.action && (u2 = u2 + "?" + e3.action), e3.qsStr && (u2 = u2.indexOf("?") > -1 ? u2 + "&" + e3.qsStr : u2 + "?" + e3.qsStr);
          var y = { method: p2, url: u2, headers: e3.headers, qs: e3.qs, filePath: e3.filePath, body: d2, json: f3, httpDNSServiceId: g, dataType: h2 }, x = "x-cos-security-token";
          o2.isCIHost(u2) && (x = "x-ci-security-token"), y.headers.Authorization = e3.AuthData.Authorization, e3.AuthData.Token && (y.headers.token = e3.AuthData.Token), e3.AuthData.ClientIP && (y.headers.clientIP = e3.AuthData.ClientIP), e3.AuthData.ClientUA && (y.headers.clientUA = e3.AuthData.ClientUA), e3.AuthData.SecurityToken && (y.headers[x] = e3.AuthData.SecurityToken), y.headers && (y.headers = o2.clearKey(y.headers)), y = o2.clearKey(y), e3.onProgress && "function" == typeof e3.onProgress && (y.onProgress = function(t4) {
            if (!a2 || n2._isRunningTask(a2)) {
              var i2 = t4 ? t4.loaded : 0;
              e3.onProgress({ loaded: i2, total: t4.total });
            }
          }), this.options.Timeout && (y.timeout = this.options.Timeout), n2.options.ForcePathStyle && (y.pathStyle = n2.options.ForcePathStyle), n2.emit("before-send", y);
          var k, b = y.url.includes("accelerate."), C = y.qs ? Object.keys(y.qs).map(function(e4) {
            return "".concat(e4, "=").concat(y.qs[e4]);
          }).join("&") : "", S = C ? y.url + "?" + C : y.url;
          if (e3.tracker)
            e3.tracker.setParams({ url: S, httpMethod: y.method, accelerate: b, httpSize: (null === (k = y.body) || void 0 === k ? void 0 : k.size) || 0 }), e3.tracker.parent && !e3.tracker.parent.params.url && e3.tracker.parent.setParams({ url: v, accelerate: b });
          var w = i(y, function(e4, i2, r3) {
            if ("abort" !== e4) {
              var s3, c2 = function(e5, r4) {
                if (a2 && n2.off("inner-kill-task", T), !s3) {
                  s3 = true;
                  var c3 = {};
                  i2 && i2.statusCode && (c3.statusCode = i2.statusCode), i2 && i2.headers && (c3.headers = i2.headers), e5 ? (y.url && (c3.url = y.url), y.method && (c3.method = y.method), e5 = o2.extend(e5 || {}, c3), t3(e5, null)) : (r4 = o2.extend(r4 || {}, c3), t3(null, r4)), w = null;
                }
              };
              if (e4)
                c2({ error: e4 });
              else {
                var l3 = i2.statusCode, p3 = 2 === Math.floor(l3 / 100);
                if (m2) {
                  if (p3)
                    return c2(null, { body: r3 });
                  if (r3 instanceof ArrayBuffer) {
                    var u3 = o2.arrayBufferToString(r3), d3 = o2.parseResBody(u3);
                    return c2({ error: d3.Error || d3 });
                  }
                }
                var f4 = o2.parseResBody(r3);
                p3 ? f4.Error ? c2({ error: f4.Error }) : c2(null, f4) : c2({ error: f4.Error || f4 });
              }
            }
          }), T = function e4(t4) {
            t4.TaskId === a2 && (w && w.abort && w.abort(), n2.off("inner-kill-task", e4));
          };
          a2 && n2.on("inner-kill-task", T);
        }
      }
      var h = { getService: function(e3, t3) {
        "function" == typeof e3 && (t3 = e3, e3 = {});
        var n2 = "https:", i2 = this.options.ServiceDomain, a2 = e3.Region;
        i2 ? (i2 = i2.replace(/\{\{Region\}\}/gi, a2 || "").replace(/\{\{.*?\}\}/gi, ""), /^[a-zA-Z]+:\/\//.test(i2) || (i2 = n2 + "//" + i2), "/" === i2.slice(-1) && (i2 = i2.slice(0, -1))) : i2 = a2 ? n2 + "//cos." + a2 + ".myqcloud.com" : n2 + "//service.cos.myqcloud.com";
        i2.replace(/^https?:\/\/([^/]+)(\/.*)?$/, "$1"), f2.call(this, { Action: "name/cos:GetService", url: i2, method: "GET", headers: e3.Headers, tracker: e3.tracker }, function(e4, n3) {
          if (e4)
            return t3(e4);
          var i3 = n3 && n3.ListAllMyBucketsResult && n3.ListAllMyBucketsResult.Buckets && n3.ListAllMyBucketsResult.Buckets.Bucket || [];
          i3 = o2.isArray(i3) ? i3 : [i3];
          var a3 = n3 && n3.ListAllMyBucketsResult && n3.ListAllMyBucketsResult.Owner || {};
          t3(null, { Buckets: i3, Owner: a3, statusCode: n3.statusCode, headers: n3.headers });
        });
      }, putBucket: function(e3, t3) {
        var n2 = this, i2 = "";
        if (e3.BucketAZConfig) {
          var a2 = { BucketAZConfig: e3.BucketAZConfig };
          i2 = o2.json2xml({ CreateBucketConfiguration: a2 });
        }
        f2.call(this, { Action: "name/cos:PutBucket", method: "PUT", Bucket: e3.Bucket, Region: e3.Region, headers: e3.Headers, body: i2, tracker: e3.tracker }, function(i3, o3) {
          if (i3)
            return t3(i3);
          var a3 = c({ protocol: n2.options.Protocol, domain: n2.options.Domain, bucket: e3.Bucket, region: e3.Region, isLocation: true });
          t3(null, { Location: a3, statusCode: o3.statusCode, headers: o3.headers });
        });
      }, headBucket: function(e3, t3) {
        f2.call(this, { Action: "name/cos:HeadBucket", Bucket: e3.Bucket, Region: e3.Region, headers: e3.Headers, method: "HEAD", tracker: e3.tracker }, function(e4, n2) {
          t3(e4, n2);
        });
      }, getBucket: function(e3, t3) {
        var n2 = {};
        n2.prefix = e3.Prefix || "", n2.delimiter = e3.Delimiter, n2.marker = e3.Marker, n2["max-keys"] = e3.MaxKeys, n2["encoding-type"] = e3.EncodingType, f2.call(this, { Action: "name/cos:GetBucket", ResourceKey: n2.prefix, method: "GET", Bucket: e3.Bucket, Region: e3.Region, headers: e3.Headers, qs: n2, tracker: e3.tracker }, function(e4, n3) {
          if (e4)
            return t3(e4);
          var i2 = n3.ListBucketResult || {}, a2 = i2.Contents || [], r2 = i2.CommonPrefixes || [];
          a2 = o2.isArray(a2) ? a2 : [a2], r2 = o2.isArray(r2) ? r2 : [r2];
          var s2 = o2.clone(i2);
          o2.extend(s2, { Contents: a2, CommonPrefixes: r2, statusCode: n3.statusCode, headers: n3.headers }), t3(null, s2);
        });
      }, deleteBucket: function(e3, t3) {
        f2.call(this, { Action: "name/cos:DeleteBucket", Bucket: e3.Bucket, Region: e3.Region, headers: e3.Headers, method: "DELETE", tracker: e3.tracker }, function(e4, n2) {
          return e4 && 204 === e4.statusCode ? t3(null, { statusCode: e4.statusCode }) : e4 ? t3(e4) : void t3(null, { statusCode: n2.statusCode, headers: n2.headers });
        });
      }, putBucketAcl: function(e3, t3) {
        var n2 = e3.Headers, i2 = "";
        if (e3.AccessControlPolicy) {
          var a2 = o2.clone(e3.AccessControlPolicy || {}), r2 = a2.Grants || a2.Grant;
          r2 = o2.isArray(r2) ? r2 : [r2], delete a2.Grant, delete a2.Grants, a2.AccessControlList = { Grant: r2 }, i2 = o2.json2xml({ AccessControlPolicy: a2 }), n2["Content-Type"] = "application/xml", n2["Content-MD5"] = o2.binaryBase64(o2.md5(i2));
        }
        o2.each(n2, function(e4, t4) {
          0 === t4.indexOf("x-cos-grant-") && (n2[t4] = s(n2[t4]));
        }), f2.call(this, { Action: "name/cos:PutBucketACL", method: "PUT", Bucket: e3.Bucket, Region: e3.Region, headers: n2, action: "acl", body: i2, tracker: e3.tracker }, function(e4, n3) {
          if (e4)
            return t3(e4);
          t3(null, { statusCode: n3.statusCode, headers: n3.headers });
        });
      }, getBucketAcl: function(e3, t3) {
        f2.call(this, { Action: "name/cos:GetBucketACL", method: "GET", Bucket: e3.Bucket, Region: e3.Region, headers: e3.Headers, action: "acl", tracker: e3.tracker }, function(e4, n2) {
          if (e4)
            return t3(e4);
          var i2 = n2.AccessControlPolicy || {}, a2 = i2.Owner || {}, s2 = i2.AccessControlList.Grant || [];
          s2 = o2.isArray(s2) ? s2 : [s2];
          var c2 = r(i2);
          n2.headers && n2.headers["x-cos-acl"] && (c2.ACL = n2.headers["x-cos-acl"]), c2 = o2.extend(c2, { Owner: a2, Grants: s2, statusCode: n2.statusCode, headers: n2.headers }), t3(null, c2);
        });
      }, putBucketCors: function(e3, t3) {
        var n2 = (e3.CORSConfiguration || {}).CORSRules || e3.CORSRules || [];
        n2 = o2.clone(o2.isArray(n2) ? n2 : [n2]), o2.each(n2, function(e4) {
          o2.each(["AllowedOrigin", "AllowedHeader", "AllowedMethod", "ExposeHeader"], function(t4) {
            var n3 = t4 + "s", i3 = e4[n3] || e4[t4] || [];
            delete e4[n3], e4[t4] = o2.isArray(i3) ? i3 : [i3];
          });
        });
        var i2 = { CORSRule: n2 };
        e3.ResponseVary && (i2.ResponseVary = e3.ResponseVary);
        var a2 = o2.json2xml({ CORSConfiguration: i2 }), r2 = e3.Headers;
        r2["Content-Type"] = "application/xml", r2["Content-MD5"] = o2.binaryBase64(o2.md5(a2)), f2.call(this, { Action: "name/cos:PutBucketCORS", method: "PUT", Bucket: e3.Bucket, Region: e3.Region, body: a2, action: "cors", headers: r2, tracker: e3.tracker }, function(e4, n3) {
          if (e4)
            return t3(e4);
          t3(null, { statusCode: n3.statusCode, headers: n3.headers });
        });
      }, getBucketCors: function(e3, t3) {
        f2.call(this, { Action: "name/cos:GetBucketCORS", method: "GET", Bucket: e3.Bucket, Region: e3.Region, headers: e3.Headers, action: "cors", tracker: e3.tracker }, function(e4, n2) {
          if (e4)
            if (404 === e4.statusCode && e4.error && "NoSuchCORSConfiguration" === e4.error.Code) {
              var i2 = { CORSRules: [], statusCode: e4.statusCode };
              e4.headers && (i2.headers = e4.headers), t3(null, i2);
            } else
              t3(e4);
          else {
            var a2 = n2.CORSConfiguration || {}, r2 = a2.CORSRules || a2.CORSRule || [];
            r2 = o2.clone(o2.isArray(r2) ? r2 : [r2]);
            var s2 = a2.ResponseVary;
            o2.each(r2, function(e5) {
              o2.each(["AllowedOrigin", "AllowedHeader", "AllowedMethod", "ExposeHeader"], function(t4) {
                var n3 = t4 + "s", i3 = e5[n3] || e5[t4] || [];
                delete e5[t4], e5[n3] = o2.isArray(i3) ? i3 : [i3];
              });
            }), t3(null, { CORSRules: r2, ResponseVary: s2, statusCode: n2.statusCode, headers: n2.headers });
          }
        });
      }, deleteBucketCors: function(e3, t3) {
        f2.call(this, { Action: "name/cos:DeleteBucketCORS", method: "DELETE", Bucket: e3.Bucket, Region: e3.Region, headers: e3.Headers, action: "cors", tracker: e3.tracker }, function(e4, n2) {
          return e4 && 204 === e4.statusCode ? t3(null, { statusCode: e4.statusCode }) : e4 ? t3(e4) : void t3(null, { statusCode: n2.statusCode || e4.statusCode, headers: n2.headers });
        });
      }, getBucketLocation: function(e3, t3) {
        f2.call(this, { Action: "name/cos:GetBucketLocation", method: "GET", Bucket: e3.Bucket, Region: e3.Region, headers: e3.Headers, action: "location", tracker: e3.tracker }, function(e4, n2) {
          if (e4)
            return t3(e4);
          t3(null, n2);
        });
      }, getBucketPolicy: function(e3, t3) {
        f2.call(this, { Action: "name/cos:GetBucketPolicy", method: "GET", Bucket: e3.Bucket, Region: e3.Region, headers: e3.Headers, action: "policy", rawBody: true, tracker: e3.tracker }, function(e4, n2) {
          if (e4)
            return e4.statusCode && 403 === e4.statusCode ? t3({ ErrorStatus: "Access Denied" }) : e4.statusCode && 405 === e4.statusCode ? t3({ ErrorStatus: "Method Not Allowed" }) : e4.statusCode && 404 === e4.statusCode ? t3({ ErrorStatus: "Policy Not Found" }) : t3(e4);
          var i2 = {};
          try {
            i2 = JSON.parse(n2.body);
          } catch (e5) {
          }
          t3(null, { Policy: i2, statusCode: n2.statusCode, headers: n2.headers });
        });
      }, putBucketPolicy: function(e3, t3) {
        var n2 = e3.Policy, i2 = n2;
        try {
          "string" == typeof n2 ? n2 = JSON.parse(i2) : i2 = JSON.stringify(n2);
        } catch (e4) {
          t3({ error: "Policy format error" });
        }
        var a2 = e3.Headers;
        a2["Content-Type"] = "application/json", a2["Content-MD5"] = o2.binaryBase64(o2.md5(i2)), f2.call(this, { Action: "name/cos:PutBucketPolicy", method: "PUT", Bucket: e3.Bucket, Region: e3.Region, action: "policy", body: i2, headers: a2, json: true, tracker: e3.tracker }, function(e4, n3) {
          return e4 && 204 === e4.statusCode ? t3(null, { statusCode: e4.statusCode }) : e4 ? t3(e4) : void t3(null, { statusCode: n3.statusCode, headers: n3.headers });
        });
      }, deleteBucketPolicy: function(e3, t3) {
        f2.call(this, { Action: "name/cos:DeleteBucketPolicy", method: "DELETE", Bucket: e3.Bucket, Region: e3.Region, headers: e3.Headers, action: "policy", tracker: e3.tracker }, function(e4, n2) {
          return e4 && 204 === e4.statusCode ? t3(null, { statusCode: e4.statusCode }) : e4 ? t3(e4) : void t3(null, { statusCode: n2.statusCode || e4.statusCode, headers: n2.headers });
        });
      }, putBucketTagging: function(e3, t3) {
        var n2 = e3.Tagging || {}, i2 = n2.TagSet || n2.Tags || e3.Tags || [];
        i2 = o2.clone(o2.isArray(i2) ? i2 : [i2]);
        var a2 = o2.json2xml({ Tagging: { TagSet: { Tag: i2 } } }), r2 = e3.Headers;
        r2["Content-Type"] = "application/xml", r2["Content-MD5"] = o2.binaryBase64(o2.md5(a2)), f2.call(this, { Action: "name/cos:PutBucketTagging", method: "PUT", Bucket: e3.Bucket, Region: e3.Region, body: a2, action: "tagging", headers: r2, tracker: e3.tracker }, function(e4, n3) {
          return e4 && 204 === e4.statusCode ? t3(null, { statusCode: e4.statusCode }) : e4 ? t3(e4) : void t3(null, { statusCode: n3.statusCode, headers: n3.headers });
        });
      }, getBucketTagging: function(e3, t3) {
        f2.call(this, { Action: "name/cos:GetBucketTagging", method: "GET", Bucket: e3.Bucket, Region: e3.Region, headers: e3.Headers, action: "tagging", tracker: e3.tracker }, function(e4, n2) {
          if (e4)
            if (404 !== e4.statusCode || !e4.error || "Not Found" !== e4.error && "NoSuchTagSet" !== e4.error.Code)
              t3(e4);
            else {
              var i2 = { Tags: [], statusCode: e4.statusCode };
              e4.headers && (i2.headers = e4.headers), t3(null, i2);
            }
          else {
            var a2 = [];
            try {
              a2 = n2.Tagging.TagSet.Tag || [];
            } catch (e5) {
            }
            a2 = o2.clone(o2.isArray(a2) ? a2 : [a2]), t3(null, { Tags: a2, statusCode: n2.statusCode, headers: n2.headers });
          }
        });
      }, deleteBucketTagging: function(e3, t3) {
        f2.call(this, { Action: "name/cos:DeleteBucketTagging", method: "DELETE", Bucket: e3.Bucket, Region: e3.Region, headers: e3.Headers, action: "tagging", tracker: e3.tracker }, function(e4, n2) {
          return e4 && 204 === e4.statusCode ? t3(null, { statusCode: e4.statusCode }) : e4 ? t3(e4) : void t3(null, { statusCode: n2.statusCode, headers: n2.headers });
        });
      }, putBucketLifecycle: function(e3, t3) {
        var n2 = (e3.LifecycleConfiguration || {}).Rules || e3.Rules || [];
        n2 = o2.clone(n2);
        var i2 = o2.json2xml({ LifecycleConfiguration: { Rule: n2 } }), a2 = e3.Headers;
        a2["Content-Type"] = "application/xml", a2["Content-MD5"] = o2.binaryBase64(o2.md5(i2)), f2.call(this, { Action: "name/cos:PutBucketLifecycle", method: "PUT", Bucket: e3.Bucket, Region: e3.Region, body: i2, action: "lifecycle", headers: a2, tracker: e3.tracker }, function(e4, n3) {
          return e4 && 204 === e4.statusCode ? t3(null, { statusCode: e4.statusCode }) : e4 ? t3(e4) : void t3(null, { statusCode: n3.statusCode, headers: n3.headers });
        });
      }, getBucketLifecycle: function(e3, t3) {
        f2.call(this, { Action: "name/cos:GetBucketLifecycle", method: "GET", Bucket: e3.Bucket, Region: e3.Region, headers: e3.Headers, action: "lifecycle", tracker: e3.tracker }, function(e4, n2) {
          if (e4)
            if (404 === e4.statusCode && e4.error && "NoSuchLifecycleConfiguration" === e4.error.Code) {
              var i2 = { Rules: [], statusCode: e4.statusCode };
              e4.headers && (i2.headers = e4.headers), t3(null, i2);
            } else
              t3(e4);
          else {
            var a2 = [];
            try {
              a2 = n2.LifecycleConfiguration.Rule || [];
            } catch (e5) {
            }
            a2 = o2.clone(o2.isArray(a2) ? a2 : [a2]), t3(null, { Rules: a2, statusCode: n2.statusCode, headers: n2.headers });
          }
        });
      }, deleteBucketLifecycle: function(e3, t3) {
        f2.call(this, { Action: "name/cos:DeleteBucketLifecycle", method: "DELETE", Bucket: e3.Bucket, Region: e3.Region, headers: e3.Headers, action: "lifecycle", tracker: e3.tracker }, function(e4, n2) {
          return e4 && 204 === e4.statusCode ? t3(null, { statusCode: e4.statusCode }) : e4 ? t3(e4) : void t3(null, { statusCode: n2.statusCode, headers: n2.headers });
        });
      }, putBucketVersioning: function(e3, t3) {
        if (e3.VersioningConfiguration) {
          var n2 = e3.VersioningConfiguration || {}, i2 = o2.json2xml({ VersioningConfiguration: n2 }), a2 = e3.Headers;
          a2["Content-Type"] = "application/xml", a2["Content-MD5"] = o2.binaryBase64(o2.md5(i2)), f2.call(this, { Action: "name/cos:PutBucketVersioning", method: "PUT", Bucket: e3.Bucket, Region: e3.Region, body: i2, action: "versioning", headers: a2, tracker: e3.tracker }, function(e4, n3) {
            return e4 && 204 === e4.statusCode ? t3(null, { statusCode: e4.statusCode }) : e4 ? t3(e4) : void t3(null, { statusCode: n3.statusCode, headers: n3.headers });
          });
        } else
          t3({ error: "missing param VersioningConfiguration" });
      }, getBucketVersioning: function(e3, t3) {
        f2.call(this, { Action: "name/cos:GetBucketVersioning", method: "GET", Bucket: e3.Bucket, Region: e3.Region, headers: e3.Headers, action: "versioning", tracker: e3.tracker }, function(e4, n2) {
          e4 || !n2.VersioningConfiguration && (n2.VersioningConfiguration = {}), t3(e4, n2);
        });
      }, putBucketReplication: function(e3, t3) {
        var n2 = o2.clone(e3.ReplicationConfiguration), i2 = o2.json2xml({ ReplicationConfiguration: n2 });
        i2 = (i2 = i2.replace(/<(\/?)Rules>/gi, "<$1Rule>")).replace(/<(\/?)Tags>/gi, "<$1Tag>");
        var a2 = e3.Headers;
        a2["Content-Type"] = "application/xml", a2["Content-MD5"] = o2.binaryBase64(o2.md5(i2)), f2.call(this, { Action: "name/cos:PutBucketReplication", method: "PUT", Bucket: e3.Bucket, Region: e3.Region, body: i2, action: "replication", headers: a2, tracker: e3.tracker }, function(e4, n3) {
          return e4 && 204 === e4.statusCode ? t3(null, { statusCode: e4.statusCode }) : e4 ? t3(e4) : void t3(null, { statusCode: n3.statusCode, headers: n3.headers });
        });
      }, getBucketReplication: function(e3, t3) {
        f2.call(this, { Action: "name/cos:GetBucketReplication", method: "GET", Bucket: e3.Bucket, Region: e3.Region, headers: e3.Headers, action: "replication", tracker: e3.tracker }, function(e4, n2) {
          if (e4)
            if (404 !== e4.statusCode || !e4.error || "Not Found" !== e4.error && "ReplicationConfigurationnotFoundError" !== e4.error.Code)
              t3(e4);
            else {
              var i2 = { ReplicationConfiguration: { Rules: [] }, statusCode: e4.statusCode };
              e4.headers && (i2.headers = e4.headers), t3(null, i2);
            }
          else
            e4 || !n2.ReplicationConfiguration && (n2.ReplicationConfiguration = {}), n2.ReplicationConfiguration.Rule && (n2.ReplicationConfiguration.Rules = n2.ReplicationConfiguration.Rule, delete n2.ReplicationConfiguration.Rule), t3(e4, n2);
        });
      }, deleteBucketReplication: function(e3, t3) {
        f2.call(this, { Action: "name/cos:DeleteBucketReplication", method: "DELETE", Bucket: e3.Bucket, Region: e3.Region, headers: e3.Headers, action: "replication", tracker: e3.tracker }, function(e4, n2) {
          return e4 && 204 === e4.statusCode ? t3(null, { statusCode: e4.statusCode }) : e4 ? t3(e4) : void t3(null, { statusCode: n2.statusCode, headers: n2.headers });
        });
      }, putBucketWebsite: function(e3, t3) {
        if (e3.WebsiteConfiguration) {
          var n2 = o2.clone(e3.WebsiteConfiguration || {}), i2 = n2.RoutingRules || n2.RoutingRule || [];
          i2 = o2.isArray(i2) ? i2 : [i2], delete n2.RoutingRule, delete n2.RoutingRules, i2.length && (n2.RoutingRules = { RoutingRule: i2 });
          var a2 = o2.json2xml({ WebsiteConfiguration: n2 }), r2 = e3.Headers;
          r2["Content-Type"] = "application/xml", r2["Content-MD5"] = o2.binaryBase64(o2.md5(a2)), f2.call(this, { Action: "name/cos:PutBucketWebsite", method: "PUT", Bucket: e3.Bucket, Region: e3.Region, body: a2, action: "website", headers: r2, tracker: e3.tracker }, function(e4, n3) {
            return e4 && 204 === e4.statusCode ? t3(null, { statusCode: e4.statusCode }) : e4 ? t3(e4) : void t3(null, { statusCode: n3.statusCode, headers: n3.headers });
          });
        } else
          t3({ error: "missing param WebsiteConfiguration" });
      }, getBucketWebsite: function(e3, t3) {
        f2.call(this, { Action: "name/cos:GetBucketWebsite", method: "GET", Bucket: e3.Bucket, Region: e3.Region, Key: e3.Key, headers: e3.Headers, action: "website", tracker: e3.tracker }, function(e4, n2) {
          if (e4)
            if (404 === e4.statusCode && "NoSuchWebsiteConfiguration" === e4.error.Code) {
              var i2 = { WebsiteConfiguration: {}, statusCode: e4.statusCode };
              e4.headers && (i2.headers = e4.headers), t3(null, i2);
            } else
              t3(e4);
          else {
            var a2 = n2.WebsiteConfiguration || {};
            if (a2.RoutingRules) {
              var r2 = o2.clone(a2.RoutingRules.RoutingRule || []);
              r2 = o2.makeArray(r2), a2.RoutingRules = r2;
            }
            t3(null, { WebsiteConfiguration: a2, statusCode: n2.statusCode, headers: n2.headers });
          }
        });
      }, deleteBucketWebsite: function(e3, t3) {
        f2.call(this, { Action: "name/cos:DeleteBucketWebsite", method: "DELETE", Bucket: e3.Bucket, Region: e3.Region, headers: e3.Headers, action: "website", tracker: e3.tracker }, function(e4, n2) {
          return e4 && 204 === e4.statusCode ? t3(null, { statusCode: e4.statusCode }) : e4 ? t3(e4) : void t3(null, { statusCode: n2.statusCode, headers: n2.headers });
        });
      }, putBucketReferer: function(e3, t3) {
        if (e3.RefererConfiguration) {
          var n2 = o2.clone(e3.RefererConfiguration || {}), i2 = n2.DomainList || {}, a2 = i2.Domains || i2.Domain || [];
          (a2 = o2.isArray(a2) ? a2 : [a2]).length && (n2.DomainList = { Domain: a2 });
          var r2 = o2.json2xml({ RefererConfiguration: n2 }), s2 = e3.Headers;
          s2["Content-Type"] = "application/xml", s2["Content-MD5"] = o2.binaryBase64(o2.md5(r2)), f2.call(this, { Action: "name/cos:PutBucketReferer", method: "PUT", Bucket: e3.Bucket, Region: e3.Region, body: r2, action: "referer", headers: s2, tracker: e3.tracker }, function(e4, n3) {
            return e4 && 204 === e4.statusCode ? t3(null, { statusCode: e4.statusCode }) : e4 ? t3(e4) : void t3(null, { statusCode: n3.statusCode, headers: n3.headers });
          });
        } else
          t3({ error: "missing param RefererConfiguration" });
      }, getBucketReferer: function(e3, t3) {
        f2.call(this, { Action: "name/cos:GetBucketReferer", method: "GET", Bucket: e3.Bucket, Region: e3.Region, Key: e3.Key, headers: e3.Headers, action: "referer", tracker: e3.tracker }, function(e4, n2) {
          if (e4)
            if (404 === e4.statusCode && "NoSuchRefererConfiguration" === e4.error.Code) {
              var i2 = { WebsiteConfiguration: {}, statusCode: e4.statusCode };
              e4.headers && (i2.headers = e4.headers), t3(null, i2);
            } else
              t3(e4);
          else {
            var a2 = n2.RefererConfiguration || {};
            if (a2.DomainList) {
              var r2 = o2.makeArray(a2.DomainList.Domain || []);
              a2.DomainList = { Domains: r2 };
            }
            t3(null, { RefererConfiguration: a2, statusCode: n2.statusCode, headers: n2.headers });
          }
        });
      }, putBucketDomain: function(e3, t3) {
        var n2 = (e3.DomainConfiguration || {}).DomainRule || e3.DomainRule || [];
        n2 = o2.clone(n2);
        var i2 = o2.json2xml({ DomainConfiguration: { DomainRule: n2 } }), a2 = e3.Headers;
        a2["Content-Type"] = "application/xml", a2["Content-MD5"] = o2.binaryBase64(o2.md5(i2)), f2.call(this, { Action: "name/cos:PutBucketDomain", method: "PUT", Bucket: e3.Bucket, Region: e3.Region, body: i2, action: "domain", headers: a2, tracker: e3.tracker }, function(e4, n3) {
          return e4 && 204 === e4.statusCode ? t3(null, { statusCode: e4.statusCode }) : e4 ? t3(e4) : void t3(null, { statusCode: n3.statusCode, headers: n3.headers });
        });
      }, getBucketDomain: function(e3, t3) {
        f2.call(this, { Action: "name/cos:GetBucketDomain", method: "GET", Bucket: e3.Bucket, Region: e3.Region, headers: e3.Headers, action: "domain", tracker: e3.tracker }, function(e4, n2) {
          if (e4)
            return t3(e4);
          var i2 = [];
          try {
            i2 = n2.DomainConfiguration.DomainRule || [];
          } catch (e5) {
          }
          i2 = o2.clone(o2.isArray(i2) ? i2 : [i2]), t3(null, { DomainRule: i2, statusCode: n2.statusCode, headers: n2.headers });
        });
      }, deleteBucketDomain: function(e3, t3) {
        f2.call(this, { Action: "name/cos:DeleteBucketDomain", method: "DELETE", Bucket: e3.Bucket, Region: e3.Region, headers: e3.Headers, action: "domain", tracker: e3.tracker }, function(e4, n2) {
          return e4 && 204 === e4.statusCode ? t3(null, { statusCode: e4.statusCode }) : e4 ? t3(e4) : void t3(null, { statusCode: n2.statusCode, headers: n2.headers });
        });
      }, putBucketOrigin: function(e3, t3) {
        var n2 = (e3.OriginConfiguration || {}).OriginRule || e3.OriginRule || [];
        n2 = o2.clone(n2);
        var i2 = o2.json2xml({ OriginConfiguration: { OriginRule: n2 } }), a2 = e3.Headers;
        a2["Content-Type"] = "application/xml", a2["Content-MD5"] = o2.binaryBase64(o2.md5(i2)), f2.call(this, { Action: "name/cos:PutBucketOrigin", method: "PUT", Bucket: e3.Bucket, Region: e3.Region, body: i2, action: "origin", headers: a2, tracker: e3.tracker }, function(e4, n3) {
          return e4 && 204 === e4.statusCode ? t3(null, { statusCode: e4.statusCode }) : e4 ? t3(e4) : void t3(null, { statusCode: n3.statusCode, headers: n3.headers });
        });
      }, getBucketOrigin: function(e3, t3) {
        f2.call(this, { Action: "name/cos:GetBucketOrigin", method: "GET", Bucket: e3.Bucket, Region: e3.Region, headers: e3.Headers, action: "origin", tracker: e3.tracker }, function(e4, n2) {
          if (e4)
            return t3(e4);
          var i2 = [];
          try {
            i2 = n2.OriginConfiguration.OriginRule || [];
          } catch (e5) {
          }
          i2 = o2.clone(o2.isArray(i2) ? i2 : [i2]), t3(null, { OriginRule: i2, statusCode: n2.statusCode, headers: n2.headers });
        });
      }, deleteBucketOrigin: function(e3, t3) {
        f2.call(this, { Action: "name/cos:DeleteBucketOrigin", method: "DELETE", Bucket: e3.Bucket, Region: e3.Region, headers: e3.Headers, action: "origin", tracker: e3.tracker }, function(e4, n2) {
          return e4 && 204 === e4.statusCode ? t3(null, { statusCode: e4.statusCode }) : e4 ? t3(e4) : void t3(null, { statusCode: n2.statusCode, headers: n2.headers });
        });
      }, putBucketLogging: function(e3, t3) {
        var n2 = o2.json2xml({ BucketLoggingStatus: e3.BucketLoggingStatus || "" }), i2 = e3.Headers;
        i2["Content-Type"] = "application/xml", i2["Content-MD5"] = o2.binaryBase64(o2.md5(n2)), f2.call(this, { Action: "name/cos:PutBucketLogging", method: "PUT", Bucket: e3.Bucket, Region: e3.Region, body: n2, action: "logging", headers: i2, tracker: e3.tracker }, function(e4, n3) {
          return e4 && 204 === e4.statusCode ? t3(null, { statusCode: e4.statusCode }) : e4 ? t3(e4) : void t3(null, { statusCode: n3.statusCode, headers: n3.headers });
        });
      }, getBucketLogging: function(e3, t3) {
        f2.call(this, { Action: "name/cos:GetBucketLogging", method: "GET", Bucket: e3.Bucket, Region: e3.Region, headers: e3.Headers, action: "logging", tracker: e3.tracker }, function(e4, n2) {
          if (e4)
            return t3(e4);
          delete n2.BucketLoggingStatus._xmlns, t3(null, { BucketLoggingStatus: n2.BucketLoggingStatus, statusCode: n2.statusCode, headers: n2.headers });
        });
      }, putBucketInventory: function(e3, t3) {
        var n2 = o2.clone(e3.InventoryConfiguration);
        if (n2.OptionalFields) {
          var i2 = n2.OptionalFields || [];
          n2.OptionalFields = { Field: i2 };
        }
        if (n2.Destination && n2.Destination.COSBucketDestination && n2.Destination.COSBucketDestination.Encryption) {
          var a2 = n2.Destination.COSBucketDestination.Encryption;
          Object.keys(a2).indexOf("SSECOS") > -1 && (a2["SSE-COS"] = a2.SSECOS, delete a2.SSECOS);
        }
        var r2 = o2.json2xml({ InventoryConfiguration: n2 }), s2 = e3.Headers;
        s2["Content-Type"] = "application/xml", s2["Content-MD5"] = o2.binaryBase64(o2.md5(r2)), f2.call(this, { Action: "name/cos:PutBucketInventory", method: "PUT", Bucket: e3.Bucket, Region: e3.Region, body: r2, action: "inventory", qs: { id: e3.Id }, headers: s2, tracker: e3.tracker }, function(e4, n3) {
          return e4 && 204 === e4.statusCode ? t3(null, { statusCode: e4.statusCode }) : e4 ? t3(e4) : void t3(null, { statusCode: n3.statusCode, headers: n3.headers });
        });
      }, getBucketInventory: function(e3, t3) {
        f2.call(this, { Action: "name/cos:GetBucketInventory", method: "GET", Bucket: e3.Bucket, Region: e3.Region, headers: e3.Headers, action: "inventory", qs: { id: e3.Id }, tracker: e3.tracker }, function(e4, n2) {
          if (e4)
            return t3(e4);
          var i2 = n2.InventoryConfiguration;
          if (i2 && i2.OptionalFields && i2.OptionalFields.Field) {
            var a2 = i2.OptionalFields.Field;
            o2.isArray(a2) || (a2 = [a2]), i2.OptionalFields = a2;
          }
          if (i2.Destination && i2.Destination.COSBucketDestination && i2.Destination.COSBucketDestination.Encryption) {
            var r2 = i2.Destination.COSBucketDestination.Encryption;
            Object.keys(r2).indexOf("SSE-COS") > -1 && (r2.SSECOS = r2["SSE-COS"], delete r2["SSE-COS"]);
          }
          t3(null, { InventoryConfiguration: i2, statusCode: n2.statusCode, headers: n2.headers });
        });
      }, listBucketInventory: function(e3, t3) {
        f2.call(this, { Action: "name/cos:ListBucketInventory", method: "GET", Bucket: e3.Bucket, Region: e3.Region, headers: e3.Headers, action: "inventory", qs: { "continuation-token": e3.ContinuationToken }, tracker: e3.tracker }, function(e4, n2) {
          if (e4)
            return t3(e4);
          var i2 = n2.ListInventoryConfigurationResult, a2 = i2.InventoryConfiguration || [];
          a2 = o2.isArray(a2) ? a2 : [a2], delete i2.InventoryConfiguration, o2.each(a2, function(e5) {
            if (e5 && e5.OptionalFields && e5.OptionalFields.Field) {
              var t4 = e5.OptionalFields.Field;
              o2.isArray(t4) || (t4 = [t4]), e5.OptionalFields = t4;
            }
            if (e5.Destination && e5.Destination.COSBucketDestination && e5.Destination.COSBucketDestination.Encryption) {
              var n3 = e5.Destination.COSBucketDestination.Encryption;
              Object.keys(n3).indexOf("SSE-COS") > -1 && (n3.SSECOS = n3["SSE-COS"], delete n3["SSE-COS"]);
            }
          }), i2.InventoryConfigurations = a2, o2.extend(i2, { statusCode: n2.statusCode, headers: n2.headers }), t3(null, i2);
        });
      }, deleteBucketInventory: function(e3, t3) {
        f2.call(this, { Action: "name/cos:DeleteBucketInventory", method: "DELETE", Bucket: e3.Bucket, Region: e3.Region, headers: e3.Headers, action: "inventory", qs: { id: e3.Id }, tracker: e3.tracker }, function(e4, n2) {
          return e4 && 204 === e4.statusCode ? t3(null, { statusCode: e4.statusCode }) : e4 ? t3(e4) : void t3(null, { statusCode: n2.statusCode, headers: n2.headers });
        });
      }, putBucketAccelerate: function(e3, t3) {
        if (e3.AccelerateConfiguration) {
          var n2 = { AccelerateConfiguration: e3.AccelerateConfiguration || {} }, i2 = o2.json2xml(n2), a2 = { "Content-Type": "application/xml" };
          a2["Content-MD5"] = o2.binaryBase64(o2.md5(i2)), f2.call(this, { Interface: "putBucketAccelerate", Action: "name/cos:PutBucketAccelerate", method: "PUT", Bucket: e3.Bucket, Region: e3.Region, body: i2, action: "accelerate", headers: a2, tracker: e3.tracker }, function(e4, n3) {
            if (e4)
              return t3(e4);
            t3(null, { statusCode: n3.statusCode, headers: n3.headers });
          });
        } else
          t3({ error: "missing param AccelerateConfiguration" });
      }, getBucketAccelerate: function(e3, t3) {
        f2.call(this, { Interface: "getBucketAccelerate", Action: "name/cos:GetBucketAccelerate", method: "GET", Bucket: e3.Bucket, Region: e3.Region, action: "accelerate", tracker: e3.tracker }, function(e4, n2) {
          e4 || !n2.AccelerateConfiguration && (n2.AccelerateConfiguration = {}), t3(e4, n2);
        });
      }, getObject: function(e3, t3) {
        if (this.options.ObjectKeySimplifyCheck && "/" === o2.simplifyPath(e3.Key))
          return void t3(o2.error(new Error("The Getobject Key is illegal")));
        var n2 = e3.Query || {}, i2 = e3.QueryString || "", a2 = e3.tracker;
        a2 && a2.setParams({ signStartTime: (/* @__PURE__ */ new Date()).getTime() }), n2["response-content-type"] = e3.ResponseContentType, n2["response-content-language"] = e3.ResponseContentLanguage, n2["response-expires"] = e3.ResponseExpires, n2["response-cache-control"] = e3.ResponseCacheControl, n2["response-content-disposition"] = e3.ResponseContentDisposition, n2["response-content-encoding"] = e3.ResponseContentEncoding, f2.call(this, { Action: "name/cos:GetObject", method: "GET", Bucket: e3.Bucket, Region: e3.Region, Key: e3.Key, VersionId: e3.VersionId, headers: e3.Headers, qs: n2, qsStr: i2, rawBody: true, dataType: e3.DataType, tracker: a2 }, function(n3, i3) {
          if (n3) {
            var a3 = n3.statusCode;
            return e3.Headers["If-Modified-Since"] && a3 && 304 === a3 ? t3(null, { NotModified: true }) : t3(n3);
          }
          t3(null, { Body: i3.body, ETag: o2.attr(i3.headers, "etag", ""), statusCode: i3.statusCode, headers: i3.headers });
        });
      }, headObject: function(e3, t3) {
        f2.call(this, { Action: "name/cos:HeadObject", method: "HEAD", Bucket: e3.Bucket, Region: e3.Region, Key: e3.Key, VersionId: e3.VersionId, headers: e3.Headers, tracker: e3.tracker }, function(n2, i2) {
          if (n2) {
            var a2 = n2.statusCode;
            return e3.Headers["If-Modified-Since"] && a2 && 304 === a2 ? t3(null, { NotModified: true, statusCode: a2 }) : t3(n2);
          }
          i2.ETag = o2.attr(i2.headers, "etag", ""), t3(null, i2);
        });
      }, listObjectVersions: function(e3, t3) {
        var n2 = {};
        n2.prefix = e3.Prefix || "", n2.delimiter = e3.Delimiter, n2["key-marker"] = e3.KeyMarker, n2["version-id-marker"] = e3.VersionIdMarker, n2["max-keys"] = e3.MaxKeys, n2["encoding-type"] = e3.EncodingType, f2.call(this, { Action: "name/cos:GetBucketObjectVersions", ResourceKey: n2.prefix, method: "GET", Bucket: e3.Bucket, Region: e3.Region, headers: e3.Headers, qs: n2, action: "versions", tracker: e3.tracker }, function(e4, n3) {
          if (e4)
            return t3(e4);
          var i2 = n3.ListVersionsResult || {}, a2 = i2.DeleteMarker || [];
          a2 = o2.isArray(a2) ? a2 : [a2];
          var r2 = i2.Version || [];
          r2 = o2.isArray(r2) ? r2 : [r2];
          var s2 = o2.clone(i2);
          delete s2.DeleteMarker, delete s2.Version, o2.extend(s2, { DeleteMarkers: a2, Versions: r2, statusCode: n3.statusCode, headers: n3.headers }), t3(null, s2);
        });
      }, putObject: function(e3, t3) {
        var n2 = this, i2 = e3.ContentLength, r2 = o2.throttleOnProgress.call(n2, i2, e3.onProgress), s2 = e3.Headers;
        s2["Cache-Control"] || s2["cache-control"] || (s2["Cache-Control"] = ""), s2["Content-Type"] || s2["content-type"] || (s2["Content-Type"] = a.getType(e3.Key) || "application/octet-stream");
        var l2 = e3.UploadAddMetaMd5 || n2.options.UploadAddMetaMd5 || n2.options.UploadCheckContentMd5, p2 = e3.tracker;
        l2 && p2 && p2.setParams({ md5StartTime: (/* @__PURE__ */ new Date()).getTime() }), o2.getBodyMd5(l2, e3.Body, function(a2) {
          a2 && (p2 && p2.setParams({ md5EndTime: (/* @__PURE__ */ new Date()).getTime() }), n2.options.UploadCheckContentMd5 && (s2["Content-MD5"] = o2.binaryBase64(a2)), (e3.UploadAddMetaMd5 || n2.options.UploadAddMetaMd5) && (s2["x-cos-meta-md5"] = a2)), void 0 !== e3.ContentLength && (s2["Content-Length"] = e3.ContentLength), r2(null, true), f2.call(n2, { Action: "name/cos:PutObject", TaskId: e3.TaskId, method: "PUT", Bucket: e3.Bucket, Region: e3.Region, Key: e3.Key, headers: e3.Headers, qs: e3.Query, body: e3.Body, onProgress: r2, tracker: p2 }, function(a3, s3) {
            if (a3)
              return r2(null, true), t3(a3);
            r2({ loaded: i2, total: i2 }, true);
            var l3 = c({ ForcePathStyle: n2.options.ForcePathStyle, protocol: n2.options.Protocol, domain: n2.options.Domain, bucket: e3.Bucket, region: n2.options.UseAccelerate ? "accelerate" : e3.Region, object: e3.Key });
            l3 = l3.substr(l3.indexOf("://") + 3), s3.Location = l3, s3.ETag = o2.attr(s3.headers, "etag", ""), t3(null, s3);
          });
        });
      }, postObject: function(e3, t3) {
        var n2 = this, i2 = {}, a2 = e3.FilePath;
        if (a2) {
          for (var r2 in i2["Cache-Control"] = e3.CacheControl, i2["Content-Disposition"] = e3.ContentDisposition, i2["Content-Encoding"] = e3.ContentEncoding, i2["Content-MD5"] = e3.ContentMD5, i2["Content-Length"] = e3.ContentLength, i2["Content-Type"] = e3.ContentType, i2.Expect = e3.Expect, i2.Expires = e3.Expires, i2["x-cos-acl"] = e3.ACL, i2["x-cos-grant-read"] = e3.GrantRead, i2["x-cos-grant-write"] = e3.GrantWrite, i2["x-cos-grant-full-control"] = e3.GrantFullControl, i2["x-cos-storage-class"] = e3.StorageClass, i2["x-cos-mime-limit"] = e3.MimeLimit, i2["x-cos-traffic-limit"] = e3.TrafficLimit, i2["x-cos-forbid-overwrite"] = e3.ForbidOverwrite, i2["x-cos-server-side-encryption-customer-algorithm"] = e3.SSECustomerAlgorithm, i2["x-cos-server-side-encryption-customer-key"] = e3.SSECustomerKey, i2["x-cos-server-side-encryption-customer-key-MD5"] = e3.SSECustomerKeyMD5, i2["x-cos-server-side-encryption"] = e3.ServerSideEncryption, i2["x-cos-server-side-encryption-cos-kms-key-id"] = e3.SSEKMSKeyId, i2["x-cos-server-side-encryption-context"] = e3.SSEContext, delete i2["Content-Length"], delete i2["content-length"], e3)
            r2.indexOf("x-cos-meta-") > -1 && (i2[r2] = e3[r2]);
          var s2 = o2.throttleOnProgress.call(n2, i2["Content-Length"], e3.onProgress);
          f2.call(this, { Action: "name/cos:PostObject", method: "POST", Bucket: e3.Bucket, Region: e3.Region, Key: e3.Key, headers: i2, qs: e3.Query, filePath: a2, TaskId: e3.TaskId, onProgress: s2, tracker: e3.tracker }, function(i3, o3) {
            if (s2(null, true), i3)
              return t3(i3);
            if (o3 && o3.headers) {
              var r3 = o3.headers, l2 = r3.etag || r3.Etag || r3.ETag || "", p2 = a2.substr(a2.lastIndexOf("/") + 1), u2 = c({ ForcePathStyle: n2.options.ForcePathStyle, protocol: n2.options.Protocol, domain: n2.options.Domain, bucket: e3.Bucket, region: e3.Region, object: e3.Key.replace(/\$\{filename\}/g, p2), isLocation: true });
              return t3(null, { Location: u2, statusCode: o3.statusCode, headers: r3, ETag: l2 });
            }
            t3(null, o3);
          });
        } else
          t3({ error: "missing param FilePath" });
      }, deleteObject: function(e3, t3) {
        f2.call(this, { Action: "name/cos:DeleteObject", method: "DELETE", Bucket: e3.Bucket, Region: e3.Region, Key: e3.Key, headers: e3.Headers, VersionId: e3.VersionId, tracker: e3.tracker }, function(e4, n2) {
          if (e4) {
            var i2 = e4.statusCode;
            return i2 && 204 === i2 ? t3(null, { statusCode: i2 }) : i2 && 404 === i2 ? t3(null, { BucketNotFound: true, statusCode: i2 }) : t3(e4);
          }
          t3(null, { statusCode: n2.statusCode, headers: n2.headers });
        });
      }, getObjectAcl: function(e3, t3) {
        var n2 = {};
        e3.VersionId && (n2.versionId = e3.VersionId), f2.call(this, { Action: "name/cos:GetObjectACL", method: "GET", Bucket: e3.Bucket, Region: e3.Region, Key: e3.Key, headers: e3.Headers, qs: n2, action: "acl", tracker: e3.tracker }, function(e4, n3) {
          if (e4)
            return t3(e4);
          var i2 = n3.AccessControlPolicy || {}, a2 = i2.Owner || {}, s2 = i2.AccessControlList && i2.AccessControlList.Grant || [];
          s2 = o2.isArray(s2) ? s2 : [s2];
          var c2 = r(i2);
          n3.headers && n3.headers["x-cos-acl"] && (c2.ACL = n3.headers["x-cos-acl"]), c2 = o2.extend(c2, { Owner: a2, Grants: s2, statusCode: n3.statusCode, headers: n3.headers }), t3(null, c2);
        });
      }, putObjectAcl: function(e3, t3) {
        var n2 = e3.Headers, i2 = "";
        if (e3.AccessControlPolicy) {
          var a2 = o2.clone(e3.AccessControlPolicy || {}), r2 = a2.Grants || a2.Grant;
          r2 = o2.isArray(r2) ? r2 : [r2], delete a2.Grant, delete a2.Grants, a2.AccessControlList = { Grant: r2 }, i2 = o2.json2xml({ AccessControlPolicy: a2 }), n2["Content-Type"] = "application/xml", n2["Content-MD5"] = o2.binaryBase64(o2.md5(i2));
        }
        o2.each(n2, function(e4, t4) {
          0 === t4.indexOf("x-cos-grant-") && (n2[t4] = s(n2[t4]));
        }), f2.call(this, { Action: "name/cos:PutObjectACL", method: "PUT", Bucket: e3.Bucket, Region: e3.Region, Key: e3.Key, action: "acl", headers: n2, body: i2, tracker: e3.tracker }, function(e4, n3) {
          if (e4)
            return t3(e4);
          t3(null, { statusCode: n3.statusCode, headers: n3.headers });
        });
      }, optionsObject: function(e3, t3) {
        var n2 = e3.Headers;
        n2.Origin = e3.Origin, n2["Access-Control-Request-Method"] = e3.AccessControlRequestMethod, n2["Access-Control-Request-Headers"] = e3.AccessControlRequestHeaders, f2.call(this, { Action: "name/cos:OptionsObject", method: "OPTIONS", Bucket: e3.Bucket, Region: e3.Region, Key: e3.Key, headers: n2, tracker: e3.tracker }, function(e4, n3) {
          if (e4)
            return e4.statusCode && 403 === e4.statusCode ? t3(null, { OptionsForbidden: true, statusCode: e4.statusCode }) : t3(e4);
          var i2 = n3.headers || {};
          t3(null, { AccessControlAllowOrigin: i2["access-control-allow-origin"], AccessControlAllowMethods: i2["access-control-allow-methods"], AccessControlAllowHeaders: i2["access-control-allow-headers"], AccessControlExposeHeaders: i2["access-control-expose-headers"], AccessControlMaxAge: i2["access-control-max-age"], statusCode: n3.statusCode, headers: n3.headers });
        });
      }, putObjectCopy: function(e3, t3) {
        var n2 = e3.Headers;
        !n2["Cache-Control"] && n2["cache-control"] && (n2["Cache-Control"] = "");
        var i2 = e3.CopySource || "", a2 = o2.getSourceParams.call(this, i2);
        if (a2) {
          var r2 = a2.Bucket, s2 = a2.Region, c2 = decodeURIComponent(a2.Key);
          f2.call(this, { Scope: [{ action: "name/cos:GetObject", bucket: r2, region: s2, prefix: c2 }, { action: "name/cos:PutObject", bucket: e3.Bucket, region: e3.Region, prefix: e3.Key }], method: "PUT", Bucket: e3.Bucket, Region: e3.Region, Key: e3.Key, VersionId: e3.VersionId, headers: e3.Headers, tracker: e3.tracker }, function(e4, n3) {
            if (e4)
              return t3(e4);
            var i3 = o2.clone(n3.CopyObjectResult || {});
            o2.extend(i3, { statusCode: n3.statusCode, headers: n3.headers }), t3(null, i3);
          });
        } else
          t3({ error: "CopySource format error" });
      }, deleteMultipleObject: function(e3, t3) {
        var n2 = e3.Objects || [], i2 = e3.Quiet;
        n2 = o2.isArray(n2) ? n2 : [n2];
        var a2 = o2.json2xml({ Delete: { Object: n2, Quiet: i2 || false } }), r2 = e3.Headers;
        r2["Content-Type"] = "application/xml", r2["Content-MD5"] = o2.binaryBase64(o2.md5(a2));
        var s2 = o2.map(n2, function(t4) {
          return { action: "name/cos:DeleteObject", bucket: e3.Bucket, region: e3.Region, prefix: t4.Key };
        });
        f2.call(this, { Scope: s2, method: "POST", Bucket: e3.Bucket, Region: e3.Region, body: a2, action: "delete", headers: r2, tracker: e3.tracker }, function(e4, n3) {
          if (e4)
            return t3(e4);
          var i3 = n3.DeleteResult || {}, a3 = i3.Deleted || [], r3 = i3.Error || [];
          a3 = o2.isArray(a3) ? a3 : [a3], r3 = o2.isArray(r3) ? r3 : [r3];
          var s3 = o2.clone(i3);
          o2.extend(s3, { Error: r3, Deleted: a3, statusCode: n3.statusCode, headers: n3.headers }), t3(null, s3);
        });
      }, restoreObject: function(e3, t3) {
        var n2 = e3.Headers;
        if (e3.RestoreRequest) {
          var i2 = e3.RestoreRequest || {}, a2 = o2.json2xml({ RestoreRequest: i2 });
          n2["Content-Type"] = "application/xml", n2["Content-MD5"] = o2.binaryBase64(o2.md5(a2)), f2.call(this, { Action: "name/cos:RestoreObject", method: "POST", Bucket: e3.Bucket, Region: e3.Region, Key: e3.Key, VersionId: e3.VersionId, body: a2, action: "restore", headers: n2, tracker: e3.tracker }, function(e4, n3) {
            t3(e4, n3);
          });
        } else
          t3({ error: "missing param RestoreRequest" });
      }, putObjectTagging: function(e3, t3) {
        var n2 = e3.Tagging || {}, i2 = n2.TagSet || n2.Tags || e3.Tags || [];
        i2 = o2.clone(o2.isArray(i2) ? i2 : [i2]);
        var a2 = o2.json2xml({ Tagging: { TagSet: { Tag: i2 } } }), r2 = e3.Headers;
        r2["Content-Type"] = "application/xml", r2["Content-MD5"] = o2.binaryBase64(o2.md5(a2)), f2.call(this, { Interface: "putObjectTagging", Action: "name/cos:PutObjectTagging", method: "PUT", Bucket: e3.Bucket, Key: e3.Key, Region: e3.Region, body: a2, action: "tagging", headers: r2, VersionId: e3.VersionId, tracker: e3.tracker }, function(e4, n3) {
          return e4 && 204 === e4.statusCode ? t3(null, { statusCode: e4.statusCode }) : e4 ? t3(e4) : void t3(null, { statusCode: n3.statusCode, headers: n3.headers });
        });
      }, getObjectTagging: function(e3, t3) {
        f2.call(this, { Interface: "getObjectTagging", Action: "name/cos:GetObjectTagging", method: "GET", Key: e3.Key, Bucket: e3.Bucket, Region: e3.Region, headers: e3.Headers, action: "tagging", VersionId: e3.VersionId, tracker: e3.tracker }, function(e4, n2) {
          if (e4)
            if (404 !== e4.statusCode || !e4.error || "Not Found" !== e4.error && "NoSuchTagSet" !== e4.error.Code)
              t3(e4);
            else {
              var i2 = { Tags: [], statusCode: e4.statusCode };
              e4.headers && (i2.headers = e4.headers), t3(null, i2);
            }
          else {
            var a2 = [];
            try {
              a2 = n2.Tagging.TagSet.Tag || [];
            } catch (e5) {
            }
            a2 = o2.clone(o2.isArray(a2) ? a2 : [a2]), t3(null, { Tags: a2, statusCode: n2.statusCode, headers: n2.headers });
          }
        });
      }, deleteObjectTagging: function(e3, t3) {
        f2.call(this, { Interface: "deleteObjectTagging", Action: "name/cos:DeleteObjectTagging", method: "DELETE", Bucket: e3.Bucket, Region: e3.Region, Key: e3.Key, headers: e3.Headers, action: "tagging", VersionId: e3.VersionId, tracker: e3.tracker }, function(e4, n2) {
          return e4 && 204 === e4.statusCode ? t3(null, { statusCode: e4.statusCode }) : e4 ? t3(e4) : void t3(null, { statusCode: n2.statusCode, headers: n2.headers });
        });
      }, appendObject: function(e3, t3) {
        f2.call(this, { Action: "name/cos:AppendObject", method: "POST", Bucket: e3.Bucket, Region: e3.Region, action: "append", Key: e3.Key, body: e3.Body, qs: { position: e3.Position }, headers: e3.Headers, tracker: e3.tracker }, function(e4, n2) {
          if (e4)
            return t3(e4);
          t3(null, n2);
        });
      }, uploadPartCopy: function(e3, t3) {
        var n2 = e3.CopySource || "", i2 = o2.getSourceParams.call(this, n2);
        if (i2) {
          var a2 = i2.Bucket, r2 = i2.Region, s2 = decodeURIComponent(i2.Key);
          f2.call(this, { Scope: [{ action: "name/cos:GetObject", bucket: a2, region: r2, prefix: s2 }, { action: "name/cos:PutObject", bucket: e3.Bucket, region: e3.Region, prefix: e3.Key }], method: "PUT", Bucket: e3.Bucket, Region: e3.Region, Key: e3.Key, VersionId: e3.VersionId, qs: { partNumber: e3.PartNumber, uploadId: e3.UploadId }, headers: e3.Headers, tracker: e3.tracker }, function(e4, n3) {
            if (e4)
              return t3(e4);
            var i3 = o2.clone(n3.CopyPartResult || {});
            o2.extend(i3, { statusCode: n3.statusCode, headers: n3.headers }), t3(null, i3);
          });
        } else
          t3({ error: "CopySource format error" });
      }, multipartInit: function(e3, t3) {
        var n2 = e3.Headers, i2 = e3.tracker;
        n2["Cache-Control"] || n2["cache-control"] || (n2["Cache-Control"] = ""), n2["Content-Type"] || n2["content-type"] || (n2["Content-Type"] = a.getType(e3.Key) || "application/octet-stream"), f2.call(this, { Action: "name/cos:InitiateMultipartUpload", method: "POST", Bucket: e3.Bucket, Region: e3.Region, Key: e3.Key, action: "uploads", headers: e3.Headers, qs: e3.Query, tracker: i2 }, function(e4, n3) {
          return e4 ? (i2 && i2.parent && i2.parent.setParams({ errorNode: "multipartInit" }), t3(e4)) : (n3 = o2.clone(n3 || {})) && n3.InitiateMultipartUploadResult ? t3(null, o2.extend(n3.InitiateMultipartUploadResult, { statusCode: n3.statusCode, headers: n3.headers })) : void t3(null, n3);
        });
      }, multipartUpload: function(e3, t3) {
        var n2 = this;
        o2.getFileSize("multipartUpload", e3, function() {
          var i2 = e3.tracker, a2 = n2.options.UploadCheckContentMd5;
          a2 && i2 && i2.setParams({ md5StartTime: (/* @__PURE__ */ new Date()).getTime() }), o2.getBodyMd5(a2, e3.Body, function(r2) {
            r2 && (e3.Headers["Content-MD5"] = o2.binaryBase64(r2), a2 && i2 && i2.setParams({ md5EndTime: (/* @__PURE__ */ new Date()).getTime() })), i2 && i2.setParams({ partNumber: e3.PartNumber }), f2.call(n2, { Action: "name/cos:UploadPart", TaskId: e3.TaskId, method: "PUT", Bucket: e3.Bucket, Region: e3.Region, Key: e3.Key, qs: { partNumber: e3.PartNumber, uploadId: e3.UploadId }, headers: e3.Headers, onProgress: e3.onProgress, body: e3.Body || null, tracker: i2 }, function(e4, n3) {
              if (e4)
                return i2 && i2.parent && i2.parent.setParams({ errorNode: "multipartUpload" }), t3(e4);
              t3(null, { ETag: o2.attr(n3.headers, "etag", {}), statusCode: n3.statusCode, headers: n3.headers });
            });
          });
        });
      }, multipartComplete: function(e3, t3) {
        for (var n2 = this, i2 = e3.UploadId, a2 = e3.Parts, r2 = e3.tracker, s2 = 0, l2 = a2.length; s2 < l2; s2++)
          0 !== a2[s2].ETag.indexOf('"') && (a2[s2].ETag = '"' + a2[s2].ETag + '"');
        var p2 = o2.json2xml({ CompleteMultipartUpload: { Part: a2 } }), u2 = e3.Headers;
        u2["Content-Type"] = "application/xml", u2["Content-MD5"] = o2.binaryBase64(o2.md5(p2)), f2.call(this, { Action: "name/cos:CompleteMultipartUpload", method: "POST", Bucket: e3.Bucket, Region: e3.Region, Key: e3.Key, qs: { uploadId: i2 }, body: p2, headers: u2, tracker: r2 }, function(i3, a3) {
          if (i3)
            return r2 && r2.parent && r2.parent.setParams({ errorNode: "multipartComplete" }), t3(i3);
          var s3 = c({ ForcePathStyle: n2.options.ForcePathStyle, protocol: n2.options.Protocol, domain: n2.options.Domain, bucket: e3.Bucket, region: n2.options.UseAccelerate ? "accelerate" : e3.Region, object: e3.Key, isLocation: true }), l3 = a3.CompleteMultipartUploadResult || {}, p3 = o2.extend(l3, { Location: s3, statusCode: a3.statusCode, headers: a3.headers });
          t3(null, p3);
        });
      }, multipartList: function(e3, t3) {
        var n2 = {};
        n2.delimiter = e3.Delimiter, n2["encoding-type"] = e3.EncodingType, n2.prefix = e3.Prefix || "", n2["max-uploads"] = e3.MaxUploads, n2["key-marker"] = e3.KeyMarker, n2["upload-id-marker"] = e3.UploadIdMarker, n2 = o2.clearKey(n2);
        var i2 = e3.tracker;
        i2 && i2.setParams({ signStartTime: (/* @__PURE__ */ new Date()).getTime() }), f2.call(this, { Action: "name/cos:ListMultipartUploads", ResourceKey: n2.prefix, method: "GET", Bucket: e3.Bucket, Region: e3.Region, headers: e3.Headers, qs: n2, action: "uploads", tracker: i2 }, function(e4, n3) {
          if (e4)
            return i2 && i2.parent && i2.parent.setParams({ errorNode: "multipartList" }), t3(e4);
          if (n3 && n3.ListMultipartUploadsResult) {
            var a2 = n3.ListMultipartUploadsResult.Upload || [], r2 = n3.ListMultipartUploadsResult.CommonPrefixes || [];
            r2 = o2.isArray(r2) ? r2 : [r2], a2 = o2.isArray(a2) ? a2 : [a2], n3.ListMultipartUploadsResult.Upload = a2, n3.ListMultipartUploadsResult.CommonPrefixes = r2;
          }
          var s2 = o2.clone(n3.ListMultipartUploadsResult || {});
          o2.extend(s2, { statusCode: n3.statusCode, headers: n3.headers }), t3(null, s2);
        });
      }, multipartListPart: function(e3, t3) {
        var n2 = {}, i2 = e3.tracker;
        n2.uploadId = e3.UploadId, n2["encoding-type"] = e3.EncodingType, n2["max-parts"] = e3.MaxParts, n2["part-number-marker"] = e3.PartNumberMarker, f2.call(this, { Action: "name/cos:ListParts", method: "GET", Bucket: e3.Bucket, Region: e3.Region, Key: e3.Key, headers: e3.Headers, qs: n2, tracker: i2 }, function(e4, n3) {
          if (e4)
            return i2 && i2.parent && i2.parent.setParams({ errorNode: "multipartListPart" }), t3(e4);
          var a2 = n3.ListPartsResult || {}, r2 = a2.Part || [];
          r2 = o2.isArray(r2) ? r2 : [r2], a2.Part = r2;
          var s2 = o2.clone(a2);
          o2.extend(s2, { statusCode: n3.statusCode, headers: n3.headers }), t3(null, s2);
        });
      }, multipartAbort: function(e3, t3) {
        var n2 = {};
        n2.uploadId = e3.UploadId, f2.call(this, { Action: "name/cos:AbortMultipartUpload", method: "DELETE", Bucket: e3.Bucket, Region: e3.Region, Key: e3.Key, headers: e3.Headers, qs: n2, tracker: e3.tracker }, function(e4, n3) {
          if (e4)
            return t3(e4);
          t3(null, { statusCode: n3.statusCode, headers: n3.headers });
        });
      }, request: function(e3, t3) {
        f2.call(this, { method: e3.Method, Bucket: e3.Bucket, Region: e3.Region, Key: e3.Key, action: e3.Action, headers: e3.Headers, qs: e3.Query, body: e3.Body, Url: e3.Url, rawBody: e3.RawBody, dataType: e3.DataType, tracker: e3.tracker }, function(e4, n2) {
          if (e4)
            return t3(e4);
          n2 && n2.body && (n2.Body = n2.body, delete n2.body), t3(e4, n2);
        });
      }, getObjectUrl: function(e3, t3) {
        var n2 = this, i2 = void 0 === e3.UseAccelerate ? n2.options.UseAccelerate : e3.UseAccelerate, a2 = c({ ForcePathStyle: n2.options.ForcePathStyle, protocol: e3.Protocol || n2.options.Protocol, domain: e3.Domain || n2.options.Domain, bucket: e3.Bucket, region: i2 ? "accelerate" : e3.Region, object: e3.Key }), r2 = "";
        e3.Query && (r2 += o2.obj2str(e3.Query)), e3.QueryString && (r2 += (r2 ? "&" : "") + e3.QueryString);
        var s2 = a2;
        if (void 0 !== e3.Sign && !e3.Sign)
          return r2 && (s2 += "?" + r2), t3(null, { Url: s2 }), s2;
        var u2 = l.call(this, { Bucket: e3.Bucket, Region: e3.Region, UseAccelerate: e3.UseAccelerate, Url: a2 }), d2 = p.call(this, { Action: "PUT" === (e3.Method || "").toUpperCase() ? "name/cos:PutObject" : "name/cos:GetObject", Bucket: e3.Bucket || "", Region: e3.Region || "", Method: e3.Method || "get", Key: e3.Key, Expires: e3.Expires, Headers: e3.Headers, Query: e3.Query, SignHost: u2, ForceSignHost: false !== e3.ForceSignHost && n2.options.ForceSignHost }, function(e4, n3) {
          if (t3)
            if (e4)
              t3(e4);
            else {
              var i3 = a2;
              i3 += "?" + (n3.Authorization.indexOf("q-signature") > -1 ? function(e5) {
                var t4 = e5.match(/q-url-param-list.*?(?=&)/g)[0], n4 = "q-url-param-list=" + encodeURIComponent(t4.replace(/q-url-param-list=/, "")).toLowerCase(), i4 = new RegExp(t4, "g");
                return e5.replace(i4, n4);
              }(n3.Authorization) : "sign=" + encodeURIComponent(n3.Authorization)), n3.SecurityToken && (i3 += "&x-cos-security-token=" + n3.SecurityToken), n3.ClientIP && (i3 += "&clientIP=" + n3.ClientIP), n3.ClientUA && (i3 += "&clientUA=" + n3.ClientUA), n3.Token && (i3 += "&token=" + n3.Token), r2 && (i3 += "&" + r2), setTimeout(function() {
                t3(null, { Url: i3 });
              });
            }
        });
        return d2 ? (s2 += "?" + d2.Authorization + (d2.SecurityToken ? "&x-cos-security-token=" + d2.SecurityToken : ""), r2 && (s2 += "&" + r2)) : r2 && (s2 += "?" + r2), s2;
      }, getAuth: function(e3) {
        return o2.getAuth({ SecretId: e3.SecretId || this.options.SecretId || "", SecretKey: e3.SecretKey || this.options.SecretKey || "", Bucket: e3.Bucket, Region: e3.Region, Method: e3.Method, Key: e3.Key, Query: e3.Query, Headers: e3.Headers, Expires: e3.Expires, SystemClockOffset: this.options.SystemClockOffset });
      } };
      e2.exports.init = function(e3, t3) {
        t3.transferToTaskMethod(h, "postObject"), t3.transferToTaskMethod(h, "putObject"), o2.each(h, function(t4, n2) {
          e3.prototype[n2] = o2.apiWrapper(n2, t4);
        });
      };
    }, function(e2, t2) {
      function n(e3) {
        return encodeURIComponent(e3).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A");
      }
      var i = function(e3, t3) {
        var i2, o2, a, r = [], s = function(e4, t4) {
          var i3 = [];
          for (var o3 in e4)
            e4.hasOwnProperty(o3) && i3.push(t4 ? n(o3).toLowerCase() : o3);
          return i3.sort(function(e5, t5) {
            return (e5 = e5.toLowerCase()) === (t5 = t5.toLowerCase()) ? 0 : e5 > t5 ? 1 : -1;
          });
        }(e3);
        for (i2 = 0; i2 < s.length; i2++)
          a = void 0 === e3[o2 = s[i2]] || null === e3[o2] ? "" : "" + e3[o2], o2 = t3 ? n(o2).toLowerCase() : n(o2), a = n(a) || "", r.push(o2 + "=" + a);
        return r.join("&");
      };
      e2.exports = function(e3, t3) {
        var n2, o2 = e3.filePath, a = e3.headers || {}, r = e3.url || e3.Url, s = e3.method, c = e3.onProgress, l = e3.httpDNSServiceId, p = function(e4, n3) {
          var i2 = n3.header, o3 = {};
          if (i2)
            for (var a2 in i2)
              i2.hasOwnProperty(a2) && (o3[a2.toLowerCase()] = i2[a2]);
          t3(e4, { statusCode: n3.statusCode, headers: o3 }, n3.data);
        };
        if (o2) {
          var u, d = r.match(/^(https?:\/\/[^/]+\/)([^/]*\/?)(.*)$/);
          e3.pathStyle ? (u = decodeURIComponent(d[3] || ""), r = d[1] + d[2]) : (u = decodeURIComponent(d[2] + d[3] || ""), r = d[1]);
          var f2 = { key: u, success_action_status: 200, Signature: a.Authorization }, m = ["Cache-Control", "Content-Type", "Content-Disposition", "Content-Encoding", "Expires", "x-cos-storage-class", "x-cos-security-token", "x-ci-security-token"];
          for (var h in e3.headers)
            e3.headers.hasOwnProperty(h) && (h.indexOf("x-cos-meta-") > -1 || m.indexOf(h) > -1) && (f2[h] = e3.headers[h]);
          a["x-cos-acl"] && (f2.acl = a["x-cos-acl"]), !f2["Content-Type"] && (f2["Content-Type"] = ""), (n2 = wx$1.uploadFile({ url: r, method: s, name: "file", header: a, filePath: o2, formData: f2, timeout: e3.timeout, success: function(e4) {
            p(null, e4);
          }, fail: function(e4) {
            p(e4.errMsg, e4);
          } })).onProgressUpdate(function(e4) {
            c && c({ loaded: e4.totalBytesSent, total: e4.totalBytesExpectedToSend, progress: e4.progress / 100 });
          });
        } else {
          var g = e3.qs && i(e3.qs) || "";
          g && (r += (r.indexOf("?") > -1 ? "&" : "?") + g), a["Content-Length"] && delete a["Content-Length"];
          var v = { url: r, method: s, header: a, dataType: "text", data: e3.body, responseType: e3.dataType || "text", timeout: e3.timeout, redirect: "manual", success: function(e4) {
            p(null, e4);
          }, fail: function(e4) {
            p(e4.errMsg, e4);
          } };
          l && Object.assign(v, { enableHttpDNS: true, httpDNSServiceId: l }), n2 = wx$1.request(v);
        }
        return n2;
      };
    }, function(e2, t2, n) {
      let i = n(29);
      e2.exports = new i(n(30), n(31));
    }, function(e2, t2, n) {
      function i() {
        this._types = /* @__PURE__ */ Object.create(null), this._extensions = /* @__PURE__ */ Object.create(null);
        for (let e3 = 0; e3 < arguments.length; e3++)
          this.define(arguments[e3]);
        this.define = this.define.bind(this), this.getType = this.getType.bind(this), this.getExtension = this.getExtension.bind(this);
      }
      i.prototype.define = function(e3, t3) {
        for (let n2 in e3) {
          let i2 = e3[n2].map(function(e4) {
            return e4.toLowerCase();
          });
          n2 = n2.toLowerCase();
          for (let e4 = 0; e4 < i2.length; e4++) {
            const o2 = i2[e4];
            if ("*" !== o2[0]) {
              if (!t3 && o2 in this._types)
                throw new Error('Attempt to change mapping for "' + o2 + '" extension from "' + this._types[o2] + '" to "' + n2 + '". Pass `force=true` to allow this, otherwise remove "' + o2 + '" from the list of extensions for "' + n2 + '".');
              this._types[o2] = n2;
            }
          }
          if (t3 || !this._extensions[n2]) {
            const e4 = i2[0];
            this._extensions[n2] = "*" !== e4[0] ? e4 : e4.substr(1);
          }
        }
      }, i.prototype.getType = function(e3) {
        let t3 = (e3 = String(e3)).replace(/^.*[/\\]/, "").toLowerCase(), n2 = t3.replace(/^.*\./, "").toLowerCase(), i2 = t3.length < e3.length;
        return (n2.length < t3.length - 1 || !i2) && this._types[n2] || null;
      }, i.prototype.getExtension = function(e3) {
        return (e3 = /^\s*([^;\s]*)/.test(e3) && RegExp.$1) && this._extensions[e3.toLowerCase()] || null;
      }, e2.exports = i;
    }, function(e2, t2) {
      e2.exports = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["es", "ecma"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/express": ["exp"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/trig": ["trig"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/step+xml": ["stpx"], "model/step+zip": ["stpz"], "model/step-xml+zip": ["stpxz"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
    }, function(e2, t2) {
      e2.exports = { "application/prs.cww": ["cww"], "application/vnd.1000minds.decision-model+xml": ["1km"], "application/vnd.3gpp.pic-bw-large": ["plb"], "application/vnd.3gpp.pic-bw-small": ["psb"], "application/vnd.3gpp.pic-bw-var": ["pvb"], "application/vnd.3gpp2.tcap": ["tcap"], "application/vnd.3m.post-it-notes": ["pwn"], "application/vnd.accpac.simply.aso": ["aso"], "application/vnd.accpac.simply.imp": ["imp"], "application/vnd.acucobol": ["acu"], "application/vnd.acucorp": ["atc", "acutc"], "application/vnd.adobe.air-application-installer-package+zip": ["air"], "application/vnd.adobe.formscentral.fcdt": ["fcdt"], "application/vnd.adobe.fxp": ["fxp", "fxpl"], "application/vnd.adobe.xdp+xml": ["xdp"], "application/vnd.adobe.xfdf": ["xfdf"], "application/vnd.ahead.space": ["ahead"], "application/vnd.airzip.filesecure.azf": ["azf"], "application/vnd.airzip.filesecure.azs": ["azs"], "application/vnd.amazon.ebook": ["azw"], "application/vnd.americandynamics.acc": ["acc"], "application/vnd.amiga.ami": ["ami"], "application/vnd.android.package-archive": ["apk"], "application/vnd.anser-web-certificate-issue-initiation": ["cii"], "application/vnd.anser-web-funds-transfer-initiation": ["fti"], "application/vnd.antix.game-component": ["atx"], "application/vnd.apple.installer+xml": ["mpkg"], "application/vnd.apple.keynote": ["key"], "application/vnd.apple.mpegurl": ["m3u8"], "application/vnd.apple.numbers": ["numbers"], "application/vnd.apple.pages": ["pages"], "application/vnd.apple.pkpass": ["pkpass"], "application/vnd.aristanetworks.swi": ["swi"], "application/vnd.astraea-software.iota": ["iota"], "application/vnd.audiograph": ["aep"], "application/vnd.balsamiq.bmml+xml": ["bmml"], "application/vnd.blueice.multipass": ["mpm"], "application/vnd.bmi": ["bmi"], "application/vnd.businessobjects": ["rep"], "application/vnd.chemdraw+xml": ["cdxml"], "application/vnd.chipnuts.karaoke-mmd": ["mmd"], "application/vnd.cinderella": ["cdy"], "application/vnd.citationstyles.style+xml": ["csl"], "application/vnd.claymore": ["cla"], "application/vnd.cloanto.rp9": ["rp9"], "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"], "application/vnd.cluetrust.cartomobile-config": ["c11amc"], "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"], "application/vnd.commonspace": ["csp"], "application/vnd.contact.cmsg": ["cdbcmsg"], "application/vnd.cosmocaller": ["cmc"], "application/vnd.crick.clicker": ["clkx"], "application/vnd.crick.clicker.keyboard": ["clkk"], "application/vnd.crick.clicker.palette": ["clkp"], "application/vnd.crick.clicker.template": ["clkt"], "application/vnd.crick.clicker.wordbank": ["clkw"], "application/vnd.criticaltools.wbs+xml": ["wbs"], "application/vnd.ctc-posml": ["pml"], "application/vnd.cups-ppd": ["ppd"], "application/vnd.curl.car": ["car"], "application/vnd.curl.pcurl": ["pcurl"], "application/vnd.dart": ["dart"], "application/vnd.data-vision.rdz": ["rdz"], "application/vnd.dbf": ["dbf"], "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"], "application/vnd.dece.ttml+xml": ["uvt", "uvvt"], "application/vnd.dece.unspecified": ["uvx", "uvvx"], "application/vnd.dece.zip": ["uvz", "uvvz"], "application/vnd.denovo.fcselayout-link": ["fe_launch"], "application/vnd.dna": ["dna"], "application/vnd.dolby.mlp": ["mlp"], "application/vnd.dpgraph": ["dpg"], "application/vnd.dreamfactory": ["dfac"], "application/vnd.ds-keypoint": ["kpxx"], "application/vnd.dvb.ait": ["ait"], "application/vnd.dvb.service": ["svc"], "application/vnd.dynageo": ["geo"], "application/vnd.ecowin.chart": ["mag"], "application/vnd.enliven": ["nml"], "application/vnd.epson.esf": ["esf"], "application/vnd.epson.msf": ["msf"], "application/vnd.epson.quickanime": ["qam"], "application/vnd.epson.salt": ["slt"], "application/vnd.epson.ssf": ["ssf"], "application/vnd.eszigno3+xml": ["es3", "et3"], "application/vnd.ezpix-album": ["ez2"], "application/vnd.ezpix-package": ["ez3"], "application/vnd.fdf": ["fdf"], "application/vnd.fdsn.mseed": ["mseed"], "application/vnd.fdsn.seed": ["seed", "dataless"], "application/vnd.flographit": ["gph"], "application/vnd.fluxtime.clip": ["ftc"], "application/vnd.framemaker": ["fm", "frame", "maker", "book"], "application/vnd.frogans.fnc": ["fnc"], "application/vnd.frogans.ltf": ["ltf"], "application/vnd.fsc.weblaunch": ["fsc"], "application/vnd.fujitsu.oasys": ["oas"], "application/vnd.fujitsu.oasys2": ["oa2"], "application/vnd.fujitsu.oasys3": ["oa3"], "application/vnd.fujitsu.oasysgp": ["fg5"], "application/vnd.fujitsu.oasysprs": ["bh2"], "application/vnd.fujixerox.ddd": ["ddd"], "application/vnd.fujixerox.docuworks": ["xdw"], "application/vnd.fujixerox.docuworks.binder": ["xbd"], "application/vnd.fuzzysheet": ["fzs"], "application/vnd.genomatix.tuxedo": ["txd"], "application/vnd.geogebra.file": ["ggb"], "application/vnd.geogebra.tool": ["ggt"], "application/vnd.geometry-explorer": ["gex", "gre"], "application/vnd.geonext": ["gxt"], "application/vnd.geoplan": ["g2w"], "application/vnd.geospace": ["g3w"], "application/vnd.gmx": ["gmx"], "application/vnd.google-apps.document": ["gdoc"], "application/vnd.google-apps.presentation": ["gslides"], "application/vnd.google-apps.spreadsheet": ["gsheet"], "application/vnd.google-earth.kml+xml": ["kml"], "application/vnd.google-earth.kmz": ["kmz"], "application/vnd.grafeq": ["gqf", "gqs"], "application/vnd.groove-account": ["gac"], "application/vnd.groove-help": ["ghf"], "application/vnd.groove-identity-message": ["gim"], "application/vnd.groove-injector": ["grv"], "application/vnd.groove-tool-message": ["gtm"], "application/vnd.groove-tool-template": ["tpl"], "application/vnd.groove-vcard": ["vcg"], "application/vnd.hal+xml": ["hal"], "application/vnd.handheld-entertainment+xml": ["zmm"], "application/vnd.hbci": ["hbci"], "application/vnd.hhe.lesson-player": ["les"], "application/vnd.hp-hpgl": ["hpgl"], "application/vnd.hp-hpid": ["hpid"], "application/vnd.hp-hps": ["hps"], "application/vnd.hp-jlyt": ["jlt"], "application/vnd.hp-pcl": ["pcl"], "application/vnd.hp-pclxl": ["pclxl"], "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"], "application/vnd.ibm.minipay": ["mpy"], "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"], "application/vnd.ibm.rights-management": ["irm"], "application/vnd.ibm.secure-container": ["sc"], "application/vnd.iccprofile": ["icc", "icm"], "application/vnd.igloader": ["igl"], "application/vnd.immervision-ivp": ["ivp"], "application/vnd.immervision-ivu": ["ivu"], "application/vnd.insors.igm": ["igm"], "application/vnd.intercon.formnet": ["xpw", "xpx"], "application/vnd.intergeo": ["i2g"], "application/vnd.intu.qbo": ["qbo"], "application/vnd.intu.qfx": ["qfx"], "application/vnd.ipunplugged.rcprofile": ["rcprofile"], "application/vnd.irepository.package+xml": ["irp"], "application/vnd.is-xpr": ["xpr"], "application/vnd.isac.fcs": ["fcs"], "application/vnd.jam": ["jam"], "application/vnd.jcp.javame.midlet-rms": ["rms"], "application/vnd.jisp": ["jisp"], "application/vnd.joost.joda-archive": ["joda"], "application/vnd.kahootz": ["ktz", "ktr"], "application/vnd.kde.karbon": ["karbon"], "application/vnd.kde.kchart": ["chrt"], "application/vnd.kde.kformula": ["kfo"], "application/vnd.kde.kivio": ["flw"], "application/vnd.kde.kontour": ["kon"], "application/vnd.kde.kpresenter": ["kpr", "kpt"], "application/vnd.kde.kspread": ["ksp"], "application/vnd.kde.kword": ["kwd", "kwt"], "application/vnd.kenameaapp": ["htke"], "application/vnd.kidspiration": ["kia"], "application/vnd.kinar": ["kne", "knp"], "application/vnd.koan": ["skp", "skd", "skt", "skm"], "application/vnd.kodak-descriptor": ["sse"], "application/vnd.las.las+xml": ["lasxml"], "application/vnd.llamagraphics.life-balance.desktop": ["lbd"], "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"], "application/vnd.lotus-1-2-3": ["123"], "application/vnd.lotus-approach": ["apr"], "application/vnd.lotus-freelance": ["pre"], "application/vnd.lotus-notes": ["nsf"], "application/vnd.lotus-organizer": ["org"], "application/vnd.lotus-screencam": ["scm"], "application/vnd.lotus-wordpro": ["lwp"], "application/vnd.macports.portpkg": ["portpkg"], "application/vnd.mapbox-vector-tile": ["mvt"], "application/vnd.mcd": ["mcd"], "application/vnd.medcalcdata": ["mc1"], "application/vnd.mediastation.cdkey": ["cdkey"], "application/vnd.mfer": ["mwf"], "application/vnd.mfmp": ["mfm"], "application/vnd.micrografx.flo": ["flo"], "application/vnd.micrografx.igx": ["igx"], "application/vnd.mif": ["mif"], "application/vnd.mobius.daf": ["daf"], "application/vnd.mobius.dis": ["dis"], "application/vnd.mobius.mbk": ["mbk"], "application/vnd.mobius.mqy": ["mqy"], "application/vnd.mobius.msl": ["msl"], "application/vnd.mobius.plc": ["plc"], "application/vnd.mobius.txf": ["txf"], "application/vnd.mophun.application": ["mpn"], "application/vnd.mophun.certificate": ["mpc"], "application/vnd.mozilla.xul+xml": ["xul"], "application/vnd.ms-artgalry": ["cil"], "application/vnd.ms-cab-compressed": ["cab"], "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"], "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"], "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"], "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"], "application/vnd.ms-excel.template.macroenabled.12": ["xltm"], "application/vnd.ms-fontobject": ["eot"], "application/vnd.ms-htmlhelp": ["chm"], "application/vnd.ms-ims": ["ims"], "application/vnd.ms-lrm": ["lrm"], "application/vnd.ms-officetheme": ["thmx"], "application/vnd.ms-outlook": ["msg"], "application/vnd.ms-pki.seccat": ["cat"], "application/vnd.ms-pki.stl": ["*stl"], "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"], "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"], "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"], "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"], "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"], "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"], "application/vnd.ms-project": ["mpp", "mpt"], "application/vnd.ms-word.document.macroenabled.12": ["docm"], "application/vnd.ms-word.template.macroenabled.12": ["dotm"], "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"], "application/vnd.ms-wpl": ["wpl"], "application/vnd.ms-xpsdocument": ["xps"], "application/vnd.mseq": ["mseq"], "application/vnd.musician": ["mus"], "application/vnd.muvee.style": ["msty"], "application/vnd.mynfc": ["taglet"], "application/vnd.neurolanguage.nlu": ["nlu"], "application/vnd.nitf": ["ntf", "nitf"], "application/vnd.noblenet-directory": ["nnd"], "application/vnd.noblenet-sealer": ["nns"], "application/vnd.noblenet-web": ["nnw"], "application/vnd.nokia.n-gage.ac+xml": ["*ac"], "application/vnd.nokia.n-gage.data": ["ngdat"], "application/vnd.nokia.n-gage.symbian.install": ["n-gage"], "application/vnd.nokia.radio-preset": ["rpst"], "application/vnd.nokia.radio-presets": ["rpss"], "application/vnd.novadigm.edm": ["edm"], "application/vnd.novadigm.edx": ["edx"], "application/vnd.novadigm.ext": ["ext"], "application/vnd.oasis.opendocument.chart": ["odc"], "application/vnd.oasis.opendocument.chart-template": ["otc"], "application/vnd.oasis.opendocument.database": ["odb"], "application/vnd.oasis.opendocument.formula": ["odf"], "application/vnd.oasis.opendocument.formula-template": ["odft"], "application/vnd.oasis.opendocument.graphics": ["odg"], "application/vnd.oasis.opendocument.graphics-template": ["otg"], "application/vnd.oasis.opendocument.image": ["odi"], "application/vnd.oasis.opendocument.image-template": ["oti"], "application/vnd.oasis.opendocument.presentation": ["odp"], "application/vnd.oasis.opendocument.presentation-template": ["otp"], "application/vnd.oasis.opendocument.spreadsheet": ["ods"], "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"], "application/vnd.oasis.opendocument.text": ["odt"], "application/vnd.oasis.opendocument.text-master": ["odm"], "application/vnd.oasis.opendocument.text-template": ["ott"], "application/vnd.oasis.opendocument.text-web": ["oth"], "application/vnd.olpc-sugar": ["xo"], "application/vnd.oma.dd2+xml": ["dd2"], "application/vnd.openblox.game+xml": ["obgx"], "application/vnd.openofficeorg.extension": ["oxt"], "application/vnd.openstreetmap.data+xml": ["osm"], "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"], "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"], "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"], "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"], "application/vnd.osgeo.mapguide.package": ["mgp"], "application/vnd.osgi.dp": ["dp"], "application/vnd.osgi.subsystem": ["esa"], "application/vnd.palm": ["pdb", "pqa", "oprc"], "application/vnd.pawaafile": ["paw"], "application/vnd.pg.format": ["str"], "application/vnd.pg.osasli": ["ei6"], "application/vnd.picsel": ["efif"], "application/vnd.pmi.widget": ["wg"], "application/vnd.pocketlearn": ["plf"], "application/vnd.powerbuilder6": ["pbd"], "application/vnd.previewsystems.box": ["box"], "application/vnd.proteus.magazine": ["mgz"], "application/vnd.publishare-delta-tree": ["qps"], "application/vnd.pvi.ptid1": ["ptid"], "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"], "application/vnd.rar": ["rar"], "application/vnd.realvnc.bed": ["bed"], "application/vnd.recordare.musicxml": ["mxl"], "application/vnd.recordare.musicxml+xml": ["musicxml"], "application/vnd.rig.cryptonote": ["cryptonote"], "application/vnd.rim.cod": ["cod"], "application/vnd.rn-realmedia": ["rm"], "application/vnd.rn-realmedia-vbr": ["rmvb"], "application/vnd.route66.link66+xml": ["link66"], "application/vnd.sailingtracker.track": ["st"], "application/vnd.seemail": ["see"], "application/vnd.sema": ["sema"], "application/vnd.semd": ["semd"], "application/vnd.semf": ["semf"], "application/vnd.shana.informed.formdata": ["ifm"], "application/vnd.shana.informed.formtemplate": ["itp"], "application/vnd.shana.informed.interchange": ["iif"], "application/vnd.shana.informed.package": ["ipk"], "application/vnd.simtech-mindmapper": ["twd", "twds"], "application/vnd.smaf": ["mmf"], "application/vnd.smart.teacher": ["teacher"], "application/vnd.software602.filler.form+xml": ["fo"], "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"], "application/vnd.spotfire.dxp": ["dxp"], "application/vnd.spotfire.sfs": ["sfs"], "application/vnd.stardivision.calc": ["sdc"], "application/vnd.stardivision.draw": ["sda"], "application/vnd.stardivision.impress": ["sdd"], "application/vnd.stardivision.math": ["smf"], "application/vnd.stardivision.writer": ["sdw", "vor"], "application/vnd.stardivision.writer-global": ["sgl"], "application/vnd.stepmania.package": ["smzip"], "application/vnd.stepmania.stepchart": ["sm"], "application/vnd.sun.wadl+xml": ["wadl"], "application/vnd.sun.xml.calc": ["sxc"], "application/vnd.sun.xml.calc.template": ["stc"], "application/vnd.sun.xml.draw": ["sxd"], "application/vnd.sun.xml.draw.template": ["std"], "application/vnd.sun.xml.impress": ["sxi"], "application/vnd.sun.xml.impress.template": ["sti"], "application/vnd.sun.xml.math": ["sxm"], "application/vnd.sun.xml.writer": ["sxw"], "application/vnd.sun.xml.writer.global": ["sxg"], "application/vnd.sun.xml.writer.template": ["stw"], "application/vnd.sus-calendar": ["sus", "susp"], "application/vnd.svd": ["svd"], "application/vnd.symbian.install": ["sis", "sisx"], "application/vnd.syncml+xml": ["xsm"], "application/vnd.syncml.dm+wbxml": ["bdm"], "application/vnd.syncml.dm+xml": ["xdm"], "application/vnd.syncml.dmddf+xml": ["ddf"], "application/vnd.tao.intent-module-archive": ["tao"], "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"], "application/vnd.tmobile-livetv": ["tmo"], "application/vnd.trid.tpt": ["tpt"], "application/vnd.triscape.mxs": ["mxs"], "application/vnd.trueapp": ["tra"], "application/vnd.ufdl": ["ufd", "ufdl"], "application/vnd.uiq.theme": ["utz"], "application/vnd.umajin": ["umj"], "application/vnd.unity": ["unityweb"], "application/vnd.uoml+xml": ["uoml"], "application/vnd.vcx": ["vcx"], "application/vnd.visio": ["vsd", "vst", "vss", "vsw"], "application/vnd.visionary": ["vis"], "application/vnd.vsf": ["vsf"], "application/vnd.wap.wbxml": ["wbxml"], "application/vnd.wap.wmlc": ["wmlc"], "application/vnd.wap.wmlscriptc": ["wmlsc"], "application/vnd.webturbo": ["wtb"], "application/vnd.wolfram.player": ["nbp"], "application/vnd.wordperfect": ["wpd"], "application/vnd.wqd": ["wqd"], "application/vnd.wt.stf": ["stf"], "application/vnd.xara": ["xar"], "application/vnd.xfdl": ["xfdl"], "application/vnd.yamaha.hv-dic": ["hvd"], "application/vnd.yamaha.hv-script": ["hvs"], "application/vnd.yamaha.hv-voice": ["hvp"], "application/vnd.yamaha.openscoreformat": ["osf"], "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"], "application/vnd.yamaha.smaf-audio": ["saf"], "application/vnd.yamaha.smaf-phrase": ["spf"], "application/vnd.yellowriver-custom-menu": ["cmp"], "application/vnd.zul": ["zir", "zirz"], "application/vnd.zzazz.deck+xml": ["zaz"], "application/x-7z-compressed": ["7z"], "application/x-abiword": ["abw"], "application/x-ace-compressed": ["ace"], "application/x-apple-diskimage": ["*dmg"], "application/x-arj": ["arj"], "application/x-authorware-bin": ["aab", "x32", "u32", "vox"], "application/x-authorware-map": ["aam"], "application/x-authorware-seg": ["aas"], "application/x-bcpio": ["bcpio"], "application/x-bdoc": ["*bdoc"], "application/x-bittorrent": ["torrent"], "application/x-blorb": ["blb", "blorb"], "application/x-bzip": ["bz"], "application/x-bzip2": ["bz2", "boz"], "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"], "application/x-cdlink": ["vcd"], "application/x-cfs-compressed": ["cfs"], "application/x-chat": ["chat"], "application/x-chess-pgn": ["pgn"], "application/x-chrome-extension": ["crx"], "application/x-cocoa": ["cco"], "application/x-conference": ["nsc"], "application/x-cpio": ["cpio"], "application/x-csh": ["csh"], "application/x-debian-package": ["*deb", "udeb"], "application/x-dgc-compressed": ["dgc"], "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"], "application/x-doom": ["wad"], "application/x-dtbncx+xml": ["ncx"], "application/x-dtbook+xml": ["dtb"], "application/x-dtbresource+xml": ["res"], "application/x-dvi": ["dvi"], "application/x-envoy": ["evy"], "application/x-eva": ["eva"], "application/x-font-bdf": ["bdf"], "application/x-font-ghostscript": ["gsf"], "application/x-font-linux-psf": ["psf"], "application/x-font-pcf": ["pcf"], "application/x-font-snf": ["snf"], "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"], "application/x-freearc": ["arc"], "application/x-futuresplash": ["spl"], "application/x-gca-compressed": ["gca"], "application/x-glulx": ["ulx"], "application/x-gnumeric": ["gnumeric"], "application/x-gramps-xml": ["gramps"], "application/x-gtar": ["gtar"], "application/x-hdf": ["hdf"], "application/x-httpd-php": ["php"], "application/x-install-instructions": ["install"], "application/x-iso9660-image": ["*iso"], "application/x-iwork-keynote-sffkey": ["*key"], "application/x-iwork-numbers-sffnumbers": ["*numbers"], "application/x-iwork-pages-sffpages": ["*pages"], "application/x-java-archive-diff": ["jardiff"], "application/x-java-jnlp-file": ["jnlp"], "application/x-keepass2": ["kdbx"], "application/x-latex": ["latex"], "application/x-lua-bytecode": ["luac"], "application/x-lzh-compressed": ["lzh", "lha"], "application/x-makeself": ["run"], "application/x-mie": ["mie"], "application/x-mobipocket-ebook": ["prc", "mobi"], "application/x-ms-application": ["application"], "application/x-ms-shortcut": ["lnk"], "application/x-ms-wmd": ["wmd"], "application/x-ms-wmz": ["wmz"], "application/x-ms-xbap": ["xbap"], "application/x-msaccess": ["mdb"], "application/x-msbinder": ["obd"], "application/x-mscardfile": ["crd"], "application/x-msclip": ["clp"], "application/x-msdos-program": ["*exe"], "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"], "application/x-msmediaview": ["mvb", "m13", "m14"], "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"], "application/x-msmoney": ["mny"], "application/x-mspublisher": ["pub"], "application/x-msschedule": ["scd"], "application/x-msterminal": ["trm"], "application/x-mswrite": ["wri"], "application/x-netcdf": ["nc", "cdf"], "application/x-ns-proxy-autoconfig": ["pac"], "application/x-nzb": ["nzb"], "application/x-perl": ["pl", "pm"], "application/x-pilot": ["*prc", "*pdb"], "application/x-pkcs12": ["p12", "pfx"], "application/x-pkcs7-certificates": ["p7b", "spc"], "application/x-pkcs7-certreqresp": ["p7r"], "application/x-rar-compressed": ["*rar"], "application/x-redhat-package-manager": ["rpm"], "application/x-research-info-systems": ["ris"], "application/x-sea": ["sea"], "application/x-sh": ["sh"], "application/x-shar": ["shar"], "application/x-shockwave-flash": ["swf"], "application/x-silverlight-app": ["xap"], "application/x-sql": ["sql"], "application/x-stuffit": ["sit"], "application/x-stuffitx": ["sitx"], "application/x-subrip": ["srt"], "application/x-sv4cpio": ["sv4cpio"], "application/x-sv4crc": ["sv4crc"], "application/x-t3vm-image": ["t3"], "application/x-tads": ["gam"], "application/x-tar": ["tar"], "application/x-tcl": ["tcl", "tk"], "application/x-tex": ["tex"], "application/x-tex-tfm": ["tfm"], "application/x-texinfo": ["texinfo", "texi"], "application/x-tgif": ["*obj"], "application/x-ustar": ["ustar"], "application/x-virtualbox-hdd": ["hdd"], "application/x-virtualbox-ova": ["ova"], "application/x-virtualbox-ovf": ["ovf"], "application/x-virtualbox-vbox": ["vbox"], "application/x-virtualbox-vbox-extpack": ["vbox-extpack"], "application/x-virtualbox-vdi": ["vdi"], "application/x-virtualbox-vhd": ["vhd"], "application/x-virtualbox-vmdk": ["vmdk"], "application/x-wais-source": ["src"], "application/x-web-app-manifest+json": ["webapp"], "application/x-x509-ca-cert": ["der", "crt", "pem"], "application/x-xfig": ["fig"], "application/x-xliff+xml": ["*xlf"], "application/x-xpinstall": ["xpi"], "application/x-xz": ["xz"], "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"], "audio/vnd.dece.audio": ["uva", "uvva"], "audio/vnd.digital-winds": ["eol"], "audio/vnd.dra": ["dra"], "audio/vnd.dts": ["dts"], "audio/vnd.dts.hd": ["dtshd"], "audio/vnd.lucent.voice": ["lvp"], "audio/vnd.ms-playready.media.pya": ["pya"], "audio/vnd.nuera.ecelp4800": ["ecelp4800"], "audio/vnd.nuera.ecelp7470": ["ecelp7470"], "audio/vnd.nuera.ecelp9600": ["ecelp9600"], "audio/vnd.rip": ["rip"], "audio/x-aac": ["aac"], "audio/x-aiff": ["aif", "aiff", "aifc"], "audio/x-caf": ["caf"], "audio/x-flac": ["flac"], "audio/x-m4a": ["*m4a"], "audio/x-matroska": ["mka"], "audio/x-mpegurl": ["m3u"], "audio/x-ms-wax": ["wax"], "audio/x-ms-wma": ["wma"], "audio/x-pn-realaudio": ["ram", "ra"], "audio/x-pn-realaudio-plugin": ["rmp"], "audio/x-realaudio": ["*ra"], "audio/x-wav": ["*wav"], "chemical/x-cdx": ["cdx"], "chemical/x-cif": ["cif"], "chemical/x-cmdf": ["cmdf"], "chemical/x-cml": ["cml"], "chemical/x-csml": ["csml"], "chemical/x-xyz": ["xyz"], "image/prs.btif": ["btif"], "image/prs.pti": ["pti"], "image/vnd.adobe.photoshop": ["psd"], "image/vnd.airzip.accelerator.azv": ["azv"], "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"], "image/vnd.djvu": ["djvu", "djv"], "image/vnd.dvb.subtitle": ["*sub"], "image/vnd.dwg": ["dwg"], "image/vnd.dxf": ["dxf"], "image/vnd.fastbidsheet": ["fbs"], "image/vnd.fpx": ["fpx"], "image/vnd.fst": ["fst"], "image/vnd.fujixerox.edmics-mmr": ["mmr"], "image/vnd.fujixerox.edmics-rlc": ["rlc"], "image/vnd.microsoft.icon": ["ico"], "image/vnd.ms-dds": ["dds"], "image/vnd.ms-modi": ["mdi"], "image/vnd.ms-photo": ["wdp"], "image/vnd.net-fpx": ["npx"], "image/vnd.pco.b16": ["b16"], "image/vnd.tencent.tap": ["tap"], "image/vnd.valve.source.texture": ["vtf"], "image/vnd.wap.wbmp": ["wbmp"], "image/vnd.xiff": ["xif"], "image/vnd.zbrush.pcx": ["pcx"], "image/x-3ds": ["3ds"], "image/x-cmu-raster": ["ras"], "image/x-cmx": ["cmx"], "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"], "image/x-icon": ["*ico"], "image/x-jng": ["jng"], "image/x-mrsid-image": ["sid"], "image/x-ms-bmp": ["*bmp"], "image/x-pcx": ["*pcx"], "image/x-pict": ["pic", "pct"], "image/x-portable-anymap": ["pnm"], "image/x-portable-bitmap": ["pbm"], "image/x-portable-graymap": ["pgm"], "image/x-portable-pixmap": ["ppm"], "image/x-rgb": ["rgb"], "image/x-tga": ["tga"], "image/x-xbitmap": ["xbm"], "image/x-xpixmap": ["xpm"], "image/x-xwindowdump": ["xwd"], "message/vnd.wfa.wsc": ["wsc"], "model/vnd.collada+xml": ["dae"], "model/vnd.dwf": ["dwf"], "model/vnd.gdl": ["gdl"], "model/vnd.gtw": ["gtw"], "model/vnd.mts": ["mts"], "model/vnd.opengex": ["ogex"], "model/vnd.parasolid.transmit.binary": ["x_b"], "model/vnd.parasolid.transmit.text": ["x_t"], "model/vnd.sap.vds": ["vds"], "model/vnd.usdz+zip": ["usdz"], "model/vnd.valve.source.compiled-map": ["bsp"], "model/vnd.vtu": ["vtu"], "text/prs.lines.tag": ["dsc"], "text/vnd.curl": ["curl"], "text/vnd.curl.dcurl": ["dcurl"], "text/vnd.curl.mcurl": ["mcurl"], "text/vnd.curl.scurl": ["scurl"], "text/vnd.dvb.subtitle": ["sub"], "text/vnd.fly": ["fly"], "text/vnd.fmi.flexstor": ["flx"], "text/vnd.graphviz": ["gv"], "text/vnd.in3d.3dml": ["3dml"], "text/vnd.in3d.spot": ["spot"], "text/vnd.sun.j2me.app-descriptor": ["jad"], "text/vnd.wap.wml": ["wml"], "text/vnd.wap.wmlscript": ["wmls"], "text/x-asm": ["s", "asm"], "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"], "text/x-component": ["htc"], "text/x-fortran": ["f", "for", "f77", "f90"], "text/x-handlebars-template": ["hbs"], "text/x-java-source": ["java"], "text/x-lua": ["lua"], "text/x-markdown": ["mkd"], "text/x-nfo": ["nfo"], "text/x-opml": ["opml"], "text/x-org": ["*org"], "text/x-pascal": ["p", "pas"], "text/x-processing": ["pde"], "text/x-sass": ["sass"], "text/x-scss": ["scss"], "text/x-setext": ["etx"], "text/x-sfv": ["sfv"], "text/x-suse-ymp": ["ymp"], "text/x-uuencode": ["uu"], "text/x-vcalendar": ["vcs"], "text/x-vcard": ["vcf"], "video/vnd.dece.hd": ["uvh", "uvvh"], "video/vnd.dece.mobile": ["uvm", "uvvm"], "video/vnd.dece.pd": ["uvp", "uvvp"], "video/vnd.dece.sd": ["uvs", "uvvs"], "video/vnd.dece.video": ["uvv", "uvvv"], "video/vnd.dvb.file": ["dvb"], "video/vnd.fvt": ["fvt"], "video/vnd.mpegurl": ["mxu", "m4u"], "video/vnd.ms-playready.media.pyv": ["pyv"], "video/vnd.uvvu.mp4": ["uvu", "uvvu"], "video/vnd.vivo": ["viv"], "video/x-f4v": ["f4v"], "video/x-fli": ["fli"], "video/x-flv": ["flv"], "video/x-m4v": ["m4v"], "video/x-matroska": ["mkv", "mk3d", "mks"], "video/x-mng": ["mng"], "video/x-ms-asf": ["asf", "asx"], "video/x-ms-vob": ["vob"], "video/x-ms-wm": ["wm"], "video/x-ms-wmv": ["wmv"], "video/x-ms-wmx": ["wmx"], "video/x-ms-wvx": ["wvx"], "video/x-msvideo": ["avi"], "video/x-sgi-movie": ["movie"], "video/x-smv": ["smv"], "x-conference/x-cooltalk": ["ice"] };
    }, function(e2, t2, n) {
      function i() {
        /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
        i = function() {
          return t3;
        };
        var e3, t3 = {}, n2 = Object.prototype, a2 = n2.hasOwnProperty, r2 = Object.defineProperty || function(e4, t4, n3) {
          e4[t4] = n3.value;
        }, s2 = "function" == typeof Symbol ? Symbol : {}, c2 = s2.iterator || "@@iterator", l2 = s2.asyncIterator || "@@asyncIterator", p2 = s2.toStringTag || "@@toStringTag";
        function u2(e4, t4, n3) {
          return Object.defineProperty(e4, t4, { value: n3, enumerable: true, configurable: true, writable: true }), e4[t4];
        }
        try {
          u2({}, "");
        } catch (e4) {
          u2 = function(e5, t4, n3) {
            return e5[t4] = n3;
          };
        }
        function d2(e4, t4, n3, i2) {
          var o3 = t4 && t4.prototype instanceof x2 ? t4 : x2, a3 = Object.create(o3.prototype), s3 = new j(i2 || []);
          return r2(a3, "_invoke", { value: A(e4, n3, s3) }), a3;
        }
        function f3(e4, t4, n3) {
          try {
            return { type: "normal", arg: e4.call(t4, n3) };
          } catch (e5) {
            return { type: "throw", arg: e5 };
          }
        }
        t3.wrap = d2;
        var m2 = "suspendedStart", h2 = "suspendedYield", g2 = "executing", v2 = "completed", y2 = {};
        function x2() {
        }
        function k2() {
        }
        function b2() {
        }
        var C2 = {};
        u2(C2, c2, function() {
          return this;
        });
        var S = Object.getPrototypeOf, w = S && S(S(I([])));
        w && w !== n2 && a2.call(w, c2) && (C2 = w);
        var T = b2.prototype = x2.prototype = Object.create(C2);
        function R(e4) {
          ["next", "throw", "return"].forEach(function(t4) {
            u2(e4, t4, function(e5) {
              return this._invoke(t4, e5);
            });
          });
        }
        function B(e4, t4) {
          function n3(i3, r3, s3, c3) {
            var l3 = f3(e4[i3], e4, r3);
            if ("throw" !== l3.type) {
              var p3 = l3.arg, u3 = p3.value;
              return u3 && "object" == o2(u3) && a2.call(u3, "__await") ? t4.resolve(u3.__await).then(function(e5) {
                n3("next", e5, s3, c3);
              }, function(e5) {
                n3("throw", e5, s3, c3);
              }) : t4.resolve(u3).then(function(e5) {
                p3.value = e5, s3(p3);
              }, function(e5) {
                return n3("throw", e5, s3, c3);
              });
            }
            c3(l3.arg);
          }
          var i2;
          r2(this, "_invoke", { value: function(e5, o3) {
            function a3() {
              return new t4(function(t5, i3) {
                n3(e5, o3, t5, i3);
              });
            }
            return i2 = i2 ? i2.then(a3, a3) : a3();
          } });
        }
        function A(t4, n3, i2) {
          var o3 = m2;
          return function(a3, r3) {
            if (o3 === g2)
              throw Error("Generator is already running");
            if (o3 === v2) {
              if ("throw" === a3)
                throw r3;
              return { value: e3, done: true };
            }
            for (i2.method = a3, i2.arg = r3; ; ) {
              var s3 = i2.delegate;
              if (s3) {
                var c3 = P(s3, i2);
                if (c3) {
                  if (c3 === y2)
                    continue;
                  return c3;
                }
              }
              if ("next" === i2.method)
                i2.sent = i2._sent = i2.arg;
              else if ("throw" === i2.method) {
                if (o3 === m2)
                  throw o3 = v2, i2.arg;
                i2.dispatchException(i2.arg);
              } else
                "return" === i2.method && i2.abrupt("return", i2.arg);
              o3 = g2;
              var l3 = f3(t4, n3, i2);
              if ("normal" === l3.type) {
                if (o3 = i2.done ? v2 : h2, l3.arg === y2)
                  continue;
                return { value: l3.arg, done: i2.done };
              }
              "throw" === l3.type && (o3 = v2, i2.method = "throw", i2.arg = l3.arg);
            }
          };
        }
        function P(t4, n3) {
          var i2 = n3.method, o3 = t4.iterator[i2];
          if (o3 === e3)
            return n3.delegate = null, "throw" === i2 && t4.iterator.return && (n3.method = "return", n3.arg = e3, P(t4, n3), "throw" === n3.method) || "return" !== i2 && (n3.method = "throw", n3.arg = new TypeError("The iterator does not provide a '" + i2 + "' method")), y2;
          var a3 = f3(o3, t4.iterator, n3.arg);
          if ("throw" === a3.type)
            return n3.method = "throw", n3.arg = a3.arg, n3.delegate = null, y2;
          var r3 = a3.arg;
          return r3 ? r3.done ? (n3[t4.resultName] = r3.value, n3.next = t4.nextLoc, "return" !== n3.method && (n3.method = "next", n3.arg = e3), n3.delegate = null, y2) : r3 : (n3.method = "throw", n3.arg = new TypeError("iterator result is not an object"), n3.delegate = null, y2);
        }
        function E2(e4) {
          var t4 = { tryLoc: e4[0] };
          1 in e4 && (t4.catchLoc = e4[1]), 2 in e4 && (t4.finallyLoc = e4[2], t4.afterLoc = e4[3]), this.tryEntries.push(t4);
        }
        function O(e4) {
          var t4 = e4.completion || {};
          t4.type = "normal", delete t4.arg, e4.completion = t4;
        }
        function j(e4) {
          this.tryEntries = [{ tryLoc: "root" }], e4.forEach(E2, this), this.reset(true);
        }
        function I(t4) {
          if (t4 || "" === t4) {
            var n3 = t4[c2];
            if (n3)
              return n3.call(t4);
            if ("function" == typeof t4.next)
              return t4;
            if (!isNaN(t4.length)) {
              var i2 = -1, r3 = function n4() {
                for (; ++i2 < t4.length; )
                  if (a2.call(t4, i2))
                    return n4.value = t4[i2], n4.done = false, n4;
                return n4.value = e3, n4.done = true, n4;
              };
              return r3.next = r3;
            }
          }
          throw new TypeError(o2(t4) + " is not iterable");
        }
        return k2.prototype = b2, r2(T, "constructor", { value: b2, configurable: true }), r2(b2, "constructor", { value: k2, configurable: true }), k2.displayName = u2(b2, p2, "GeneratorFunction"), t3.isGeneratorFunction = function(e4) {
          var t4 = "function" == typeof e4 && e4.constructor;
          return !!t4 && (t4 === k2 || "GeneratorFunction" === (t4.displayName || t4.name));
        }, t3.mark = function(e4) {
          return Object.setPrototypeOf ? Object.setPrototypeOf(e4, b2) : (e4.__proto__ = b2, u2(e4, p2, "GeneratorFunction")), e4.prototype = Object.create(T), e4;
        }, t3.awrap = function(e4) {
          return { __await: e4 };
        }, R(B.prototype), u2(B.prototype, l2, function() {
          return this;
        }), t3.AsyncIterator = B, t3.async = function(e4, n3, i2, o3, a3) {
          void 0 === a3 && (a3 = Promise);
          var r3 = new B(d2(e4, n3, i2, o3), a3);
          return t3.isGeneratorFunction(n3) ? r3 : r3.next().then(function(e5) {
            return e5.done ? e5.value : r3.next();
          });
        }, R(T), u2(T, p2, "Generator"), u2(T, c2, function() {
          return this;
        }), u2(T, "toString", function() {
          return "[object Generator]";
        }), t3.keys = function(e4) {
          var t4 = Object(e4), n3 = [];
          for (var i2 in t4)
            n3.push(i2);
          return n3.reverse(), function e5() {
            for (; n3.length; ) {
              var i3 = n3.pop();
              if (i3 in t4)
                return e5.value = i3, e5.done = false, e5;
            }
            return e5.done = true, e5;
          };
        }, t3.values = I, j.prototype = { constructor: j, reset: function(t4) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = e3, this.done = false, this.delegate = null, this.method = "next", this.arg = e3, this.tryEntries.forEach(O), !t4)
            for (var n3 in this)
              "t" === n3.charAt(0) && a2.call(this, n3) && !isNaN(+n3.slice(1)) && (this[n3] = e3);
        }, stop: function() {
          this.done = true;
          var e4 = this.tryEntries[0].completion;
          if ("throw" === e4.type)
            throw e4.arg;
          return this.rval;
        }, dispatchException: function(t4) {
          if (this.done)
            throw t4;
          var n3 = this;
          function i2(i3, o4) {
            return s3.type = "throw", s3.arg = t4, n3.next = i3, o4 && (n3.method = "next", n3.arg = e3), !!o4;
          }
          for (var o3 = this.tryEntries.length - 1; o3 >= 0; --o3) {
            var r3 = this.tryEntries[o3], s3 = r3.completion;
            if ("root" === r3.tryLoc)
              return i2("end");
            if (r3.tryLoc <= this.prev) {
              var c3 = a2.call(r3, "catchLoc"), l3 = a2.call(r3, "finallyLoc");
              if (c3 && l3) {
                if (this.prev < r3.catchLoc)
                  return i2(r3.catchLoc, true);
                if (this.prev < r3.finallyLoc)
                  return i2(r3.finallyLoc);
              } else if (c3) {
                if (this.prev < r3.catchLoc)
                  return i2(r3.catchLoc, true);
              } else {
                if (!l3)
                  throw Error("try statement without catch or finally");
                if (this.prev < r3.finallyLoc)
                  return i2(r3.finallyLoc);
              }
            }
          }
        }, abrupt: function(e4, t4) {
          for (var n3 = this.tryEntries.length - 1; n3 >= 0; --n3) {
            var i2 = this.tryEntries[n3];
            if (i2.tryLoc <= this.prev && a2.call(i2, "finallyLoc") && this.prev < i2.finallyLoc) {
              var o3 = i2;
              break;
            }
          }
          o3 && ("break" === e4 || "continue" === e4) && o3.tryLoc <= t4 && t4 <= o3.finallyLoc && (o3 = null);
          var r3 = o3 ? o3.completion : {};
          return r3.type = e4, r3.arg = t4, o3 ? (this.method = "next", this.next = o3.finallyLoc, y2) : this.complete(r3);
        }, complete: function(e4, t4) {
          if ("throw" === e4.type)
            throw e4.arg;
          return "break" === e4.type || "continue" === e4.type ? this.next = e4.arg : "return" === e4.type ? (this.rval = this.arg = e4.arg, this.method = "return", this.next = "end") : "normal" === e4.type && t4 && (this.next = t4), y2;
        }, finish: function(e4) {
          for (var t4 = this.tryEntries.length - 1; t4 >= 0; --t4) {
            var n3 = this.tryEntries[t4];
            if (n3.finallyLoc === e4)
              return this.complete(n3.completion, n3.afterLoc), O(n3), y2;
          }
        }, catch: function(e4) {
          for (var t4 = this.tryEntries.length - 1; t4 >= 0; --t4) {
            var n3 = this.tryEntries[t4];
            if (n3.tryLoc === e4) {
              var i2 = n3.completion;
              if ("throw" === i2.type) {
                var o3 = i2.arg;
                O(n3);
              }
              return o3;
            }
          }
          throw Error("illegal catch attempt");
        }, delegateYield: function(t4, n3, i2) {
          return this.delegate = { iterator: I(t4), resultName: n3, nextLoc: i2 }, "next" === this.method && (this.arg = e3), y2;
        } }, t3;
      }
      function o2(e3) {
        return o2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e4) {
          return typeof e4;
        } : function(e4) {
          return e4 && "function" == typeof Symbol && e4.constructor === Symbol && e4 !== Symbol.prototype ? "symbol" : typeof e4;
        }, o2(e3);
      }
      function a(e3, t3, n2, i2, o3, a2, r2) {
        try {
          var s2 = e3[a2](r2), c2 = s2.value;
        } catch (e4) {
          return void n2(e4);
        }
        s2.done ? t3(c2) : Promise.resolve(c2).then(i2, o3);
      }
      function r(e3) {
        return function() {
          var t3 = this, n2 = arguments;
          return new Promise(function(i2, o3) {
            var r2 = e3.apply(t3, n2);
            function s2(e4) {
              a(r2, i2, o3, s2, c2, "next", e4);
            }
            function c2(e4) {
              a(r2, i2, o3, s2, c2, "throw", e4);
            }
            s2(void 0);
          });
        };
      }
      var s = n(7), c = n(33), l = n(6).EventProxy, p = n(0), u = n(2);
      function d(e3, t3) {
        var n2 = e3.TaskId, i2 = e3.Bucket, o3 = e3.Region, a2 = e3.Key, r2 = e3.StorageClass, u2 = this, d2 = {}, h2 = e3.FileSize, g2 = e3.SliceSize, v2 = Math.ceil(h2 / g2), y2 = 0, x2 = p.throttleOnProgress.call(u2, h2, e3.onHashProgress), k2 = function(t4, n3) {
          var i3 = t4.length;
          if (0 === i3)
            return n3(null, true);
          if (i3 > v2)
            return n3(null, false);
          if (i3 > 1 && Math.max(t4[0].Size, t4[1].Size) !== g2)
            return n3(null, false);
          !function o4(a3) {
            if (a3 < i3) {
              var r3 = t4[a3];
              !function(t5, n4) {
                var i4 = g2 * (t5 - 1), o5 = Math.min(i4 + g2, h2), a4 = o5 - i4;
                d2[t5] ? n4(null, { PartNumber: t5, ETag: d2[t5], Size: a4 }) : p.fileSlice(e3.FilePath, i4, o5, function(e4) {
                  try {
                    var i5 = p.getFileMd5(e4);
                  } catch (e5) {
                    return n4(e5);
                  }
                  var o6 = '"' + i5 + '"';
                  d2[t5] = o6, y2 += a4, n4(null, { PartNumber: t5, ETag: o6, Size: a4 }), x2({ loaded: y2, total: h2 });
                });
              }(r3.PartNumber, function(e4, t5) {
                t5 && t5.ETag === r3.ETag && t5.Size === r3.Size ? o4(a3 + 1) : n3(null, false);
              });
            } else
              n3(null, true);
          }(0);
        }, b2 = new l();
        b2.on("error", function(e4) {
          if (u2._isRunningTask(n2))
            return t3(e4);
        }), b2.on("upload_id_available", function(e4) {
          var n3 = {}, i3 = [];
          p.each(e4.PartList, function(e5) {
            n3[e5.PartNumber] = e5;
          });
          for (var o4 = 1; o4 <= v2; o4++) {
            var a3 = n3[o4];
            a3 ? (a3.PartNumber = o4, a3.Uploaded = true) : a3 = { PartNumber: o4, ETag: null, Uploaded: false }, i3.push(a3);
          }
          e4.PartList = i3, t3(null, e4);
        }), b2.on("no_available_upload_id", function() {
          if (u2._isRunningTask(n2)) {
            var s2 = p.extend({ Bucket: i2, Region: o3, Key: a2, Headers: p.clone(e3.Headers), Query: p.clone(e3.Query), StorageClass: r2, calledBySdk: "sliceUploadFile", tracker: e3.tracker }, e3);
            u2.multipartInit(s2, function(e4, i3) {
              if (u2._isRunningTask(n2)) {
                if (e4)
                  return b2.emit("error", e4);
                var o4 = i3.UploadId;
                if (!o4)
                  return t3({ Message: "no upload id" });
                b2.emit("upload_id_available", { UploadId: o4, PartList: [] });
              }
            });
          }
        }), b2.on("has_and_check_upload_id", function(t4) {
          t4 = t4.reverse(), c.eachLimit(t4, 1, function(t5, r3) {
            u2._isRunningTask(n2) && (s.using[t5] ? r3() : m.call(u2, { Bucket: i2, Region: o3, Key: a2, UploadId: t5, tracker: e3.tracker }, function(e4, i3) {
              if (u2._isRunningTask(n2)) {
                if (e4)
                  return s.removeUsing(t5), b2.emit("error", e4);
                var o4 = i3.PartList;
                o4.forEach(function(e5) {
                  e5.PartNumber *= 1, e5.Size *= 1, e5.ETag = e5.ETag || "";
                }), k2(o4, function(e5, i4) {
                  if (u2._isRunningTask(n2))
                    return e5 ? b2.emit("error", e5) : void (i4 ? r3({ UploadId: t5, PartList: o4 }) : r3());
                });
              }
            }));
          }, function(e4) {
            u2._isRunningTask(n2) && (x2(null, true), e4 && e4.UploadId ? b2.emit("upload_id_available", e4) : b2.emit("no_available_upload_id"));
          });
        }), b2.on("seek_local_avail_upload_id", function(t4) {
          var r3 = s.getFileId(e3.FileStat, e3.ChunkSize, i2, a2), c2 = s.getUploadIdList(r3);
          if (r3 && c2) {
            !function r4(l2) {
              if (l2 >= c2.length)
                b2.emit("has_and_check_upload_id", t4);
              else {
                var d3 = c2[l2];
                if (!p.isInArray(t4, d3))
                  return s.removeUploadId(d3), void r4(l2 + 1);
                s.using[d3] ? r4(l2 + 1) : m.call(u2, { Bucket: i2, Region: o3, Key: a2, UploadId: d3, tracker: e3.tracker }, function(e4, t5) {
                  u2._isRunningTask(n2) && (e4 ? (s.removeUploadId(d3), r4(l2 + 1)) : b2.emit("upload_id_available", { UploadId: d3, PartList: t5.PartList }));
                });
              }
            }(0);
          } else
            b2.emit("has_and_check_upload_id", t4);
        }), b2.on("get_remote_upload_id_list", function() {
          f2.call(u2, { Bucket: i2, Region: o3, Key: a2, tracker: e3.tracker }, function(t4, o4) {
            if (u2._isRunningTask(n2)) {
              if (t4)
                return b2.emit("error", t4);
              var c2 = p.filter(o4.UploadList, function(e4) {
                return e4.Key === a2 && (!r2 || e4.StorageClass.toUpperCase() === r2.toUpperCase());
              }).reverse().map(function(e4) {
                return e4.UploadId || e4.UploadID;
              });
              if (c2.length)
                b2.emit("seek_local_avail_upload_id", c2);
              else {
                var l2, d3 = s.getFileId(e3.FileStat, e3.ChunkSize, i2, a2);
                d3 && (l2 = s.getUploadIdList(d3)) && p.each(l2, function(e4) {
                  s.removeUploadId(e4);
                }), b2.emit("no_available_upload_id");
              }
            }
          });
        }), b2.emit("get_remote_upload_id_list");
      }
      function f2(e3, t3) {
        var n2 = this, i2 = [], o3 = { Bucket: e3.Bucket, Region: e3.Region, Prefix: e3.Key, calledBySdk: e3.calledBySdk || "sliceUploadFile", tracker: e3.tracker };
        !function e4() {
          n2.multipartList(o3, function(n3, a2) {
            if (n3)
              return t3(n3);
            i2.push.apply(i2, a2.Upload || []), "true" === a2.IsTruncated ? (o3.KeyMarker = a2.NextKeyMarker, o3.UploadIdMarker = a2.NextUploadIdMarker, e4()) : t3(null, { UploadList: i2 });
          });
        }();
      }
      function m(e3, t3) {
        var n2 = this, i2 = [], o3 = { Bucket: e3.Bucket, Region: e3.Region, Key: e3.Key, UploadId: e3.UploadId, calledBySdk: "sliceUploadFile", tracker: e3.tracker };
        !function e4() {
          n2.multipartListPart(o3, function(n3, a2) {
            if (n3)
              return t3(n3);
            i2.push.apply(i2, a2.Part || []), "true" === a2.IsTruncated ? (o3.PartNumberMarker = a2.NextPartNumberMarker, e4()) : t3(null, { PartList: i2 });
          });
        }();
      }
      function h(e3, t3) {
        var n2 = this, i2 = e3.TaskId, o3 = e3.Bucket, a2 = e3.Region, r2 = e3.Key, s2 = e3.UploadData, l2 = e3.FileSize, u2 = e3.SliceSize, d2 = Math.min(e3.AsyncLimit || n2.options.ChunkParallelLimit || 1, 256), f3 = e3.FilePath, m2 = Math.ceil(l2 / u2), h2 = 0, v2 = e3.ServerSideEncryption, y2 = p.filter(s2.PartList, function(e4) {
          return e4.Uploaded && (h2 += e4.PartNumber >= m2 && l2 % u2 || u2), !e4.Uploaded;
        }), x2 = e3.onProgress;
        c.eachLimit(y2, d2, function(t4, c2) {
          if (n2._isRunningTask(i2)) {
            var p2 = t4.PartNumber, d3 = Math.min(l2, t4.PartNumber * u2) - (t4.PartNumber - 1) * u2, m3 = 0;
            g.call(n2, { TaskId: i2, Bucket: o3, Region: a2, Key: r2, SliceSize: u2, FileSize: l2, PartNumber: p2, ServerSideEncryption: v2, FilePath: f3, UploadData: s2, onProgress: function(e4) {
              h2 += e4.loaded - m3, m3 = e4.loaded, x2({ loaded: h2, total: l2 });
            }, tracker: e3.tracker }, function(e4, o4) {
              n2._isRunningTask(i2) && (e4 ? h2 -= m3 : (h2 += d3 - m3, t4.ETag = o4.ETag), x2({ loaded: h2, total: l2 }), c2(e4 || null, o4));
            });
          }
        }, function(e4) {
          if (n2._isRunningTask(i2))
            return e4 ? t3(e4) : void t3(null, { UploadId: s2.UploadId, SliceList: s2.PartList });
        });
      }
      function g(e3, t3) {
        var n2 = this, i2 = e3.TaskId, o3 = e3.Bucket, a2 = e3.Region, r2 = e3.Key, s2 = e3.FileSize, l2 = e3.FilePath, u2 = 1 * e3.PartNumber, d2 = e3.SliceSize, f3 = e3.ServerSideEncryption, m2 = e3.UploadData, h2 = n2.options.ChunkRetryTimes + 1, g2 = e3.Headers || {}, v2 = d2 * (u2 - 1), y2 = d2, x2 = v2 + d2;
        x2 > s2 && (y2 = (x2 = s2) - v2);
        var k2 = ["x-cos-traffic-limit", "x-cos-mime-limit"], b2 = {};
        p.each(g2, function(e4, t4) {
          k2.indexOf(t4) > -1 && (b2[t4] = e4);
        }), p.fileSlice(l2, v2, x2, function(s3) {
          var l3 = p.getFileMd5(s3), d3 = l3 ? p.binaryBase64(l3) : null, g3 = m2.PartList[u2 - 1];
          c.retry(h2, function(t4) {
            n2._isRunningTask(i2) && n2.multipartUpload({ TaskId: i2, Bucket: o3, Region: a2, Key: r2, ContentLength: y2, PartNumber: u2, UploadId: m2.UploadId, ServerSideEncryption: f3, Body: s3, Headers: b2, onProgress: e3.onProgress, ContentMD5: d3, calledBySdk: "sliceUploadFile", tracker: e3.tracker }, function(e4, o4) {
              if (n2._isRunningTask(i2))
                return e4 ? t4(e4) : (g3.Uploaded = true, t4(null, o4));
            });
          }, function(e4, o4) {
            if (n2._isRunningTask(i2))
              return t3(e4, o4);
          });
        });
      }
      function v(e3, t3) {
        var n2 = e3.Bucket, i2 = e3.Region, o3 = e3.Key, a2 = e3.UploadId, r2 = e3.SliceList, s2 = this, l2 = this.options.ChunkRetryTimes + 1, p2 = r2.map(function(e4) {
          return { PartNumber: e4.PartNumber, ETag: e4.ETag };
        });
        c.retry(l2, function(t4) {
          s2.multipartComplete({ Bucket: n2, Region: i2, Key: o3, UploadId: a2, Parts: p2, calledBySdk: "sliceUploadFile", Headers: e3.Headers || {}, tracker: e3.tracker }, t4);
        }, function(e4, n3) {
          t3(e4, n3);
        });
      }
      function y(e3, t3) {
        var n2 = e3.Bucket, i2 = e3.Region, o3 = e3.Key, a2 = e3.AbortArray, r2 = e3.AsyncLimit || 1, s2 = this, l2 = 0, p2 = new Array(a2.length);
        c.eachLimit(a2, r2, function(t4, a3) {
          var r3 = l2;
          if (o3 && o3 !== t4.Key)
            return p2[r3] = { error: { KeyNotMatch: true } }, void a3(null);
          var c2 = t4.UploadId || t4.UploadID;
          s2.multipartAbort({ Bucket: n2, Region: i2, Key: t4.Key, Headers: e3.Headers, UploadId: c2 }, function(e4) {
            var o4 = { Bucket: n2, Region: i2, Key: t4.Key, UploadId: c2 };
            p2[r3] = { error: e4, task: o4 }, a3(null);
          }), l2++;
        }, function(e4) {
          if (e4)
            return t3(e4);
          for (var n3 = [], i3 = [], o4 = 0, a3 = p2.length; o4 < a3; o4++) {
            var r3 = p2[o4];
            r3.task && (r3.error ? i3.push(r3.task) : n3.push(r3.task));
          }
          return t3(null, { successList: n3, errorList: i3 });
        });
      }
      function x() {
        return (x = r(i().mark(function e3(t3, n2) {
          var a2, r2, s2, c2, l2, d2, f3, m2, h2, g2, v2, y2;
          return i().wrap(function(e4) {
            for (; ; )
              switch (e4.prev = e4.next) {
                case 0:
                  return a2 = this, r2 = void 0 === t3.SliceSize ? a2.options.SliceSize : t3.SliceSize, s2 = [], e4.prev = 3, e4.next = 6, p.getFileSizeByPath(t3.FilePath);
                case 6:
                  c2 = e4.sent, e4.next = 13;
                  break;
                case 9:
                  return e4.prev = 9, e4.t0 = e4.catch(3), n2({ error: e4.t0 }), e4.abrupt("return");
                case 13:
                  l2 = { TaskId: "" }, a2.options.EnableReporter && (d2 = a2.options.UseAccelerate || "string" == typeof a2.options.Domain && a2.options.Domain.includes("accelerate."), f3 = c2 > r2 ? "sliceUploadFile" : "putObject", t3.tracker = new u({ Beacon: a2.options.BeaconReporter, clsReporter: a2.options.ClsReporter, bucket: t3.Bucket, region: t3.Region, apiName: "uploadFile", realApi: f3, fileKey: t3.Key, fileSize: c2, accelerate: d2, deepTracker: a2.options.DeepTracker, customId: a2.options.CustomId, delay: a2.options.TrackerDelay })), p.each(t3, function(e5, t4) {
                    "object" !== o2(e5) && "function" != typeof e5 && (l2[t4] = e5);
                  }), m2 = t3.onTaskReady, t3.onTaskReady = function(e5) {
                    l2.TaskId = e5, m2 && m2(e5);
                  }, h2 = t3.onFileFinish, g2 = function(e5, i2) {
                    t3.tracker && t3.tracker.report(e5, i2), h2 && h2(e5, i2, l2), n2 && n2(e5, i2);
                  }, v2 = "postObject" === a2.options.SimpleUploadMethod ? "postObject" : "putObject", y2 = c2 > r2 ? "sliceUploadFile" : v2, s2.push({ api: y2, params: t3, callback: g2 }), a2._addTasks(s2);
                case 24:
                case "end":
                  return e4.stop();
              }
          }, e3, this, [[3, 9]]);
        }))).apply(this, arguments);
      }
      function k() {
        return k = r(i().mark(function e3(t3, n2) {
          var a2, s2, c2, l2, d2, f3, m2, h2, g2, v2, y2;
          return i().wrap(function(e4) {
            for (; ; )
              switch (e4.prev = e4.next) {
                case 0:
                  return a2 = this, s2 = void 0 === t3.SliceSize ? a2.options.SliceSize : t3.SliceSize, c2 = 0, l2 = 0, d2 = p.throttleOnProgress.call(a2, l2, t3.onProgress), f3 = t3.files.length, m2 = t3.onFileFinish, h2 = Array(f3), g2 = function(e5, t4, i2) {
                    d2(null, true), m2 && m2(e5, t4, i2), h2[i2.Index] = { options: i2, error: e5, data: t4 }, --f3 <= 0 && n2 && n2(null, { files: h2 });
                  }, v2 = [], y2 = function() {
                    return t3.files.map(function(e5, t4) {
                      return new Promise(function() {
                        var n3 = r(i().mark(function n4(r2) {
                          var f4, m3, h3, y3, x2, k2, b2, C2, S, w, T;
                          return i().wrap(function(n5) {
                            for (; ; )
                              switch (n5.prev = n5.next) {
                                case 0:
                                  return f4 = 0, n5.prev = 1, n5.next = 4, p.getFileSizeByPath(e5.FilePath);
                                case 4:
                                  f4 = n5.sent, n5.next = 9;
                                  break;
                                case 7:
                                  n5.prev = 7, n5.t0 = n5.catch(1);
                                case 9:
                                  m3 = { Index: t4, TaskId: "" }, c2 += f4, a2.options.EnableReporter && (h3 = a2.options.UseAccelerate || "string" == typeof a2.options.Domain && a2.options.Domain.includes("accelerate."), y3 = f4 > s2 ? "sliceUploadFile" : "putObject", e5.tracker = new u({ Beacon: a2.options.BeaconReporter, clsReporter: a2.options.ClsReporter, bucket: e5.Bucket, region: e5.Region, apiName: "uploadFiles", realApi: y3, fileKey: e5.Key, fileSize: f4, accelerate: h3, deepTracker: a2.options.DeepTracker, customId: a2.options.CustomId, delay: a2.options.TrackerDelay })), p.each(e5, function(e6, t5) {
                                    "object" !== o2(e6) && "function" != typeof e6 && (m3[t5] = e6);
                                  }), x2 = e5.onTaskReady, e5.onTaskReady = function(e6) {
                                    m3.TaskId = e6, x2 && x2(e6);
                                  }, k2 = 0, b2 = e5.onProgress, e5.onProgress = function(e6) {
                                    l2 = l2 - k2 + e6.loaded, k2 = e6.loaded, b2 && b2(e6), d2({ loaded: l2, total: c2 });
                                  }, C2 = e5.onFileFinish, S = function(t5, n6) {
                                    e5.tracker && e5.tracker.report(t5, n6), C2 && C2(t5, n6), g2 && g2(t5, n6, m3);
                                  }, w = "postObject" === a2.options.SimpleUploadMethod ? "postObject" : "putObject", T = f4 > s2 ? "sliceUploadFile" : w, v2.push({ api: T, params: e5, callback: S }), r2(true);
                                case 24:
                                case "end":
                                  return n5.stop();
                              }
                          }, n4, null, [[1, 7]]);
                        }));
                        return function(e6) {
                          return n3.apply(this, arguments);
                        };
                      }());
                    });
                  }, e4.next = 13, Promise.all(y2());
                case 13:
                  a2._addTasks(v2);
                case 14:
                case "end":
                  return e4.stop();
              }
          }, e3, this);
        })), k.apply(this, arguments);
      }
      function b(e3, t3) {
        var n2 = e3.TaskId, i2 = e3.Bucket, o3 = e3.Region, a2 = e3.Key, r2 = e3.CopySource, s2 = e3.UploadId, l2 = 1 * e3.PartNumber, p2 = e3.CopySourceRange, u2 = this.options.ChunkRetryTimes + 1, d2 = this;
        c.retry(u2, function(t4) {
          d2.uploadPartCopy({ TaskId: n2, Bucket: i2, Region: o3, Key: a2, CopySource: r2, UploadId: s2, PartNumber: l2, CopySourceRange: p2, onProgress: e3.onProgress, tracker: e3.tracker, calledBySdk: e3.calledBySdk }, function(e4, n3) {
            t4(e4 || null, n3);
          });
        }, function(e4, n3) {
          return t3(e4, n3);
        });
      }
      var C = { sliceUploadFile: function(e3, t3) {
        var n2 = this;
        if (!p.canFileSlice())
          return e3.SkipTask = true, void ("postObject" === n2.options.SimpleUploadMethod ? n2.postObject(e3, t3) : n2.putObject(e3, t3));
        var i2, o3, a2 = new l(), r2 = e3.TaskId, c2 = e3.Bucket, u2 = e3.Region, f3 = e3.Key, m2 = e3.FilePath, g2 = e3.ChunkSize || e3.SliceSize || n2.options.ChunkSize, y2 = e3.AsyncLimit, x2 = e3.StorageClass, k2 = e3.ServerSideEncryption, b2 = e3.onHashProgress, C2 = e3.tracker;
        C2 && C2.setParams({ chunkSize: g2 }), a2.on("error", function(i3) {
          if (n2._isRunningTask(r2)) {
            var o4 = { UploadId: e3.UploadData.UploadId || "", err: i3, error: i3 };
            return t3(o4);
          }
        }), a2.on("upload_complete", function(n3) {
          var i3 = p.extend({ UploadId: e3.UploadData.UploadId || "" }, n3);
          t3(null, i3);
        }), a2.on("upload_slice_complete", function(t4) {
          var l2 = {};
          p.each(e3.Headers, function(e4, t5) {
            var n3 = t5.toLowerCase();
            0 !== n3.indexOf("x-cos-meta-") && "pic-operations" !== n3 || (l2[t5] = e4);
          }), v.call(n2, { Bucket: c2, Region: u2, Key: f3, UploadId: t4.UploadId, SliceList: t4.SliceList, Headers: l2, tracker: C2 }, function(e4, c3) {
            if (n2._isRunningTask(r2)) {
              if (s.removeUsing(t4.UploadId), e4)
                return o3(null, true), a2.emit("error", e4);
              s.removeUploadId(t4.UploadId), o3({ loaded: i2, total: i2 }, true), a2.emit("upload_complete", c3);
            }
          });
        }), a2.on("get_upload_data_finish", function(t4) {
          var l2 = s.getFileId(e3.FileStat, e3.ChunkSize, c2, f3);
          l2 && s.saveUploadId(l2, t4.UploadId, n2.options.UploadIdCacheLimit), s.setUsing(t4.UploadId), o3(null, true), h.call(n2, { TaskId: r2, Bucket: c2, Region: u2, Key: f3, FilePath: m2, FileSize: i2, SliceSize: g2, AsyncLimit: y2, ServerSideEncryption: k2, UploadData: t4, onProgress: o3, tracker: C2 }, function(e4, t5) {
            if (n2._isRunningTask(r2))
              return e4 ? (o3(null, true), a2.emit("error", e4)) : void a2.emit("upload_slice_complete", t5);
          });
        }), a2.on("get_file_size_finish", function() {
          if (o3 = p.throttleOnProgress.call(n2, i2, e3.onProgress), e3.UploadData.UploadId)
            a2.emit("get_upload_data_finish", e3.UploadData);
          else {
            var t4 = p.extend({ TaskId: r2, Bucket: c2, Region: u2, Key: f3, Headers: e3.Headers, StorageClass: x2, FilePath: m2, FileSize: i2, SliceSize: g2, onHashProgress: b2, tracker: C2 }, e3);
            t4.FileSize = i2, d.call(n2, t4, function(t5, i3) {
              if (n2._isRunningTask(r2)) {
                if (t5)
                  return a2.emit("error", t5);
                e3.UploadData.UploadId = i3.UploadId, e3.UploadData.PartList = i3.PartList, a2.emit("get_upload_data_finish", e3.UploadData);
              }
            });
          }
        }), i2 = e3.ContentLength, delete e3.ContentLength, !e3.Headers && (e3.Headers = {}), p.each(e3.Headers, function(t4, n3) {
          "content-length" === n3.toLowerCase() && delete e3.Headers[n3];
        }), function() {
          for (var t4 = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 5120], o4 = 1048576, a3 = 0; a3 < t4.length && !(i2 / (o4 = 1024 * t4[a3] * 1024) <= n2.options.MaxPartNumber); a3++)
            ;
          e3.ChunkSize = e3.SliceSize = g2 = Math.max(g2, o4);
        }(), 0 === i2 ? (e3.Body = "", e3.ContentLength = 0, e3.SkipTask = true, n2.putObject(e3, function(e4, n3) {
          if (e4)
            return t3(e4);
          t3(null, n3);
        })) : a2.emit("get_file_size_finish");
      }, abortUploadTask: function(e3, t3) {
        var n2 = e3.Bucket, i2 = e3.Region, o3 = e3.Key, a2 = e3.UploadId, r2 = e3.Level || "task", s2 = e3.AsyncLimit, c2 = this, p2 = new l();
        if (p2.on("error", function(e4) {
          return t3(e4);
        }), p2.on("get_abort_array", function(a3) {
          y.call(c2, { Bucket: n2, Region: i2, Key: o3, Headers: e3.Headers, AsyncLimit: s2, AbortArray: a3 }, function(e4, n3) {
            if (e4)
              return t3(e4);
            t3(null, n3);
          });
        }), "bucket" === r2)
          f2.call(c2, { Bucket: n2, Region: i2, calledBySdk: "abortUploadTask" }, function(e4, n3) {
            if (e4)
              return t3(e4);
            p2.emit("get_abort_array", n3.UploadList || []);
          });
        else if ("file" === r2) {
          if (!o3)
            return t3({ error: "abort_upload_task_no_key" });
          f2.call(c2, { Bucket: n2, Region: i2, Key: o3, calledBySdk: "abortUploadTask" }, function(e4, n3) {
            if (e4)
              return t3(e4);
            p2.emit("get_abort_array", n3.UploadList || []);
          });
        } else {
          if ("task" !== r2)
            return t3({ error: "abort_unknown_level" });
          if (!a2)
            return t3({ error: "abort_upload_task_no_id" });
          if (!o3)
            return t3({ error: "abort_upload_task_no_key" });
          p2.emit("get_abort_array", [{ Key: o3, UploadId: a2 }]);
        }
      }, uploadFile: function(e3, t3) {
        return x.apply(this, arguments);
      }, uploadFiles: function(e3, t3) {
        return k.apply(this, arguments);
      }, sliceCopyFile: function(e3, t3) {
        var n2 = new l(), i2 = this, o3 = e3.Bucket, a2 = e3.Region, r2 = e3.Key, u2 = e3.CopySource, d2 = p.getSourceParams.call(this, u2);
        if (d2) {
          var f3 = d2.Bucket, h2 = d2.Region, g2 = decodeURIComponent(d2.Key), v2 = void 0 === e3.CopySliceSize ? i2.options.CopySliceSize : e3.CopySliceSize;
          v2 = Math.max(0, v2);
          var y2, x2, k2 = e3.CopyChunkSize || this.options.CopyChunkSize, C2 = this.options.CopyChunkParallelLimit, S = this.options.ChunkRetryTimes + 1, w = 0, T = 0, R = {}, B = {}, A = {};
          n2.on("copy_slice_complete", function(n3) {
            p.each(e3.Headers, function(e4, t4) {
              0 === t4.toLowerCase().indexOf("x-cos-meta-") && e4;
            });
            var u3 = p.map(n3.PartList, function(e4) {
              return { PartNumber: e4.PartNumber, ETag: e4.ETag };
            });
            c.retry(S, function(t4) {
              i2.multipartComplete({ Bucket: o3, Region: a2, Key: r2, UploadId: n3.UploadId, Parts: u3, tracker: e3.tracker, calledBySdk: "sliceCopyFile" }, t4);
            }, function(e4, i3) {
              if (s.removeUsing(n3.UploadId), e4)
                return x2(null, true), t3(e4);
              s.removeUploadId(n3.UploadId), x2({ loaded: y2, total: y2 }, true), t3(null, i3);
            });
          }), n2.on("get_copy_data_finish", function(l2) {
            var d3 = s.getCopyFileId(u2, R, k2, o3, r2);
            d3 && s.saveUploadId(d3, l2.UploadId, i2.options.UploadIdCacheLimit), s.setUsing(l2.UploadId);
            var f4 = p.filter(l2.PartList, function(e4) {
              return e4.Uploaded && (T += e4.PartNumber >= w && y2 % k2 || k2), !e4.Uploaded;
            });
            c.eachLimit(f4, C2, function(t4, n3) {
              var s2 = t4.PartNumber, p2 = t4.CopySourceRange, d4 = t4.end - t4.start, f5 = 0;
              c.retry(S, function(t5) {
                b.call(i2, { Bucket: o3, Region: a2, Key: r2, CopySource: u2, UploadId: l2.UploadId, PartNumber: s2, CopySourceRange: p2, tracker: e3.tracker, calledBySdk: "sliceCopyFile", onProgress: function(e4) {
                  T += e4.loaded - f5, f5 = e4.loaded, x2({ loaded: T, total: y2 });
                } }, t5);
              }, function(e4, i3) {
                if (e4)
                  return n3(e4);
                x2({ loaded: T, total: y2 }), T += d4 - f5, t4.ETag = i3.ETag, n3(e4 || null, i3);
              });
            }, function(e4) {
              if (e4)
                return s.removeUsing(l2.UploadId), x2(null, true), t3(e4);
              n2.emit("copy_slice_complete", l2);
            });
          }), n2.on("get_chunk_size_finish", function() {
            var c2 = function() {
              i2.multipartInit({ Bucket: o3, Region: a2, Key: r2, Headers: A, tracker: e3.tracker, calledBySdk: "sliceCopyFile" }, function(i3, o4) {
                if (i3)
                  return t3(i3);
                e3.UploadId = o4.UploadId, n2.emit("get_copy_data_finish", { UploadId: e3.UploadId, PartList: e3.PartList });
              });
            }, l2 = s.getCopyFileId(u2, R, k2, o3, r2), d3 = s.getUploadIdList(l2);
            if (!l2 || !d3)
              return c2();
            !function t4(l3) {
              if (l3 >= d3.length)
                return c2();
              var u3 = d3[l3];
              if (s.using[u3])
                return t4(l3 + 1);
              m.call(i2, { Bucket: o3, Region: a2, Key: r2, UploadId: u3, tracker: e3.tracker, calledBySdk: "sliceCopyFile" }, function(i3, o4) {
                if (i3)
                  s.removeUploadId(u3), t4(l3 + 1);
                else {
                  if (s.using[u3])
                    return t4(l3 + 1);
                  var a3 = {}, r3 = 0;
                  p.each(o4.PartList, function(e4) {
                    var t5 = parseInt(e4.Size), n3 = r3 + t5 - 1;
                    a3[e4.PartNumber + "|" + r3 + "|" + n3] = e4.ETag, r3 += t5;
                  }), p.each(e3.PartList, function(e4) {
                    var t5 = a3[e4.PartNumber + "|" + e4.start + "|" + e4.end];
                    t5 && (e4.ETag = t5, e4.Uploaded = true);
                  }), n2.emit("get_copy_data_finish", { UploadId: u3, PartList: e3.PartList });
                }
              });
            }(0);
          }), n2.on("get_file_size_finish", function() {
            var o4;
            if (function() {
              for (var t4 = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 5120], n3 = 1048576, o5 = 0; o5 < t4.length && !(y2 / (n3 = 1024 * t4[o5] * 1024) <= i2.options.MaxPartNumber); o5++)
                ;
              e3.ChunkSize = k2 = Math.max(k2, n3), w = Math.ceil(y2 / k2);
              for (var a4 = [], r3 = 1; r3 <= w; r3++) {
                var s2 = (r3 - 1) * k2, c2 = r3 * k2 < y2 ? r3 * k2 - 1 : y2 - 1, l2 = { PartNumber: r3, start: s2, end: c2, CopySourceRange: "bytes=" + s2 + "-" + c2 };
                a4.push(l2);
              }
              e3.PartList = a4;
            }(), (o4 = "Replaced" === e3.Headers["x-cos-metadata-directive"] ? e3.Headers : B)["x-cos-storage-class"] = e3.Headers["x-cos-storage-class"] || B["x-cos-storage-class"], o4 = p.clearKey(o4), "ARCHIVE" === B["x-cos-storage-class"] || "DEEP_ARCHIVE" === B["x-cos-storage-class"]) {
              var a3 = B["x-cos-restore"];
              if (!a3 || 'ongoing-request="true"' === a3)
                return void t3({ error: "Unrestored archive object is not allowed to be copied" });
            }
            delete o4["x-cos-copy-source"], delete o4["x-cos-metadata-directive"], delete o4["x-cos-copy-source-If-Modified-Since"], delete o4["x-cos-copy-source-If-Unmodified-Since"], delete o4["x-cos-copy-source-If-Match"], delete o4["x-cos-copy-source-If-None-Match"], n2.emit("get_chunk_size_finish");
          }), i2.headObject({ Bucket: f3, Region: h2, Key: g2, tracker: e3.tracker, calledBySdk: "sliceCopyFile" }, function(o4, a3) {
            if (o4)
              o4.statusCode && 404 === o4.statusCode ? t3({ ErrorStatus: g2 + " Not Exist" }) : t3(o4);
            else if (void 0 !== (y2 = e3.FileSize = a3.headers["content-length"]) && y2)
              if (e3.tracker && e3.tracker.setParams({ httpSize: y2 }), x2 = p.throttleOnProgress.call(i2, y2, e3.onProgress), y2 <= v2)
                e3.Headers["x-cos-metadata-directive"] || (e3.Headers["x-cos-metadata-directive"] = "Copy"), i2.putObjectCopy(Object.assign(e3, { calledBySdk: "sliceCopyFile" }), function(e4, n3) {
                  if (e4)
                    return x2(null, true), t3(e4);
                  x2({ loaded: y2, total: y2 }, true), t3(e4, n3);
                });
              else {
                var r3 = a3.headers;
                R = r3, B = { "Cache-Control": r3["cache-control"], "Content-Disposition": r3["content-disposition"], "Content-Encoding": r3["content-encoding"], "Content-Type": r3["content-type"], Expires: r3.expires, "x-cos-storage-class": r3["x-cos-storage-class"] }, p.each(r3, function(e4, t4) {
                  var n3 = "x-cos-meta-";
                  0 === t4.indexOf(n3) && t4.length > 11 && (B[t4] = e4);
                }), n2.emit("get_file_size_finish");
              }
            else
              t3({ error: 'get Content-Length error, please add "Content-Length" to CORS ExposeHeader setting.' });
          });
        } else
          t3({ error: "CopySource format error" });
      } };
      e2.exports.init = function(e3, t3) {
        t3.transferToTaskMethod(C, "sliceUploadFile"), p.each(C, function(t4, n2) {
          e3.prototype[n2] = p.apiWrapper(n2, t4);
        });
      };
    }, function(e2, t2) {
      var n = { eachLimit: function(e3, t3, n2, i) {
        if (i = i || function() {
        }, !e3.length || t3 <= 0)
          return i();
        var o2 = 0, a = 0, r = 0;
        !function s() {
          if (o2 >= e3.length)
            return i();
          for (; r < t3 && a < e3.length; )
            r += 1, n2(e3[(a += 1) - 1], function(t4) {
              t4 ? (i(t4), i = function() {
              }) : (r -= 1, (o2 += 1) >= e3.length ? i() : s());
            });
        }();
      }, retry: function(e3, t3, n2) {
        e3 < 1 ? n2() : function i(o2) {
          t3(function(t4, a) {
            t4 && o2 < e3 ? i(o2 + 1) : n2(t4, a);
          });
        }(1);
      } };
      e2.exports = n;
    }]);
  });
})(cosWxSdkV5_min);
var cosWxSdkV5_minExports = cosWxSdkV5_min.exports;
const CosCloud = /* @__PURE__ */ getDefaultExportFromCjs(cosWxSdkV5_minExports);
exports.CosCloud = CosCloud;
exports._export_sfc = _export_sfc;
exports.computed = computed;
exports.createSSRApp = createSSRApp;
exports.e = e;
exports.f = f;
exports.index = index;
exports.o = o;
exports.onLoad = onLoad;
exports.onReady = onReady;
exports.ref = ref;
exports.t = t;
exports.wx$1 = wx$1;
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map
