import { h } from '../clipper.core.js';

import { b as TypeKeys } from './chunk-c46efb37.js';
import { b as showMyOrders } from './chunk-b29ff8f0.js';
import { b as revokeToken, c as openProfile, d as open, e as Storage, f as toggleTour } from './chunk-fe10219c.js';
import { d as rIC } from './chunk-e658e8b7.js';
import { c as createColorClasses } from './chunk-c82b670d.js';
import { a as showMyOrders$1 } from './chunk-3c944ae9.js';
import { a as Plugins } from './chunk-b5dfde61.js';
import { a as isPlatform } from './chunk-3beb47a5.js';

class Menu {
    constructor() {
        this.profile = {};
        this.directions = {};
        this.appPages = [
            { title: 'Frete', url: 'create', icon: 'cube', role: 'CUSTOMER' },
            { title: 'Ofertas', url: 'speakers', icon: 'cash', role: 'ALL' },
            { title: 'Agenda', url: 'schedule', icon: 'calendar', role: 'ALL' },
            { title: 'Sobre', url: 'about', icon: 'information-circle', role: 'MERCHANT' }
        ];
    }
    componentWillLoad() {
        this.store.mapStateToProps(this, (state) => {
            const { session: { token, profile, directions } } = state;
            return { token, profile, directions };
        });
        this.store.mapDispatchToProps(this, { revokeToken, openProfile, open });
        this.openProfile(this.token);
    }
    checkLoginStatus() {
        return Boolean(this.token);
    }
    parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
    }
    async changeTab(tab) {
        this.open(tab.toUpperCase(), '/' + tab);
        const tabCtrl = await this.tabs.componentOnReady();
        await tabCtrl.select(tab);
    }
    async showPage(event, page) {
        event.preventDefault();
        this.open(page.toUpperCase(), '/' + page);
        const navCtrl = document.querySelector('ion-nav');
        await navCtrl.setRoot('page-tabs');
        await navCtrl.push('page-' + page);
    }
    displayRating(rating) {
        const buttons = (h("ion-buttons", { class: "static-stars" },
            h("ion-button", { class: rating >= 1 ? 'marked' : 'unmarked', id: "star-1" }),
            h("ion-button", { class: rating >= 2 ? 'marked' : 'unmarked', id: "star-2" }),
            h("ion-button", { class: rating >= 3 ? 'marked' : 'unmarked', id: "star-3" }),
            h("ion-button", { class: rating >= 4 ? 'marked' : 'unmarked', id: "star-4" }),
            h("ion-button", { class: rating >= 5 ? 'marked' : 'unmarked', id: "star-5" })));
        return buttons;
    }
    renderMenu() {
        const role = this.parseJwt(this.token)['_role'];
        return (h("ion-menu", { contentId: "app", menuId: "first", type: "push" },
            h("ion-header", null,
                h("ion-toolbar", null,
                    h("ion-title", null,
                        h("img", { src: "assets/img/applogo.svg", height: "42", alt: "Shipping" })))),
            h("ion-content", { forceOverscroll: false },
                this.profile && ([
                    h("ion-item", null,
                        h("ion-avatar", { slot: "start" },
                            h("img", { src: this.profile.hasOwnProperty('pictures') && this.profile.pictures.length > 0 ?
                                    this.profile.pictures[0] :
                                    'http://www.gravatar.com/avatar?d=mm&s=140', alt: "Imagem do perfil" })),
                        h("ion-label", null,
                            h("h5", null, this.profile.name),
                            h("p", null, this.profile.email))),
                    h("ion-item", null, this.displayRating(this.profile.hasOwnProperty('rating') ? this.profile.rating : 0))
                ]),
                h("ion-list", null,
                    h("ion-list-header", null, "Navegar"),
                    this.appPages.map((p) => ((p.role === role || p.role === 'ALL') &&
                        h("ion-menu-toggle", { autoHide: false },
                            h("ion-item", { lines: "full", href: "#", onClick: () => this.changeTab(p.url) },
                                h("ion-icon", { slot: "start", name: p.icon }),
                                h("ion-label", null, p.title)))))),
                h("ion-list", null,
                    h("ion-list-header", null, "Conta"),
                    h("ion-menu-toggle", { autoHide: false }, this.checkLoginStatus() ? (h("ion-item", { href: "#", onClick: (e) => this.showPage(e, 'account') },
                        h("ion-icon", { slot: "start", name: "person" }),
                        h("ion-label", null, "Perfil"))) : (h("ion-item", { href: "#login" },
                        h("ion-icon", { slot: "start", name: "log-in" }),
                        h("ion-label", null, "Entrar")))),
                    h("ion-menu-toggle", { autoHide: false },
                        h("ion-item", { href: "#support", button: true, onClick: (e) => this.showPage(e, 'support') },
                            h("ion-icon", { slot: "start", name: "help" }),
                            h("ion-label", null, "Ajuda"))),
                    h("ion-menu-toggle", { autoHide: false }, this.checkLoginStatus() ? (h("ion-item", { onClick: () => this.revokeToken(), button: true },
                        h("ion-icon", { slot: "start", name: "log-out" }),
                        h("ion-label", null, "Sair"))) : (h("ion-item", { href: "#signup", button: true },
                        h("ion-icon", { slot: "start", name: "person-add" }),
                        h("ion-label", null, "Registrar"))))))));
    }
    renderNav(dir) {
        const role = this.parseJwt(this.token)['_role'];
        console.log(dir.slice(-1)[0].component);
        return (h("ion-nav", { id: "app", main: true }, dir.slice(-1)[0].component !== 'DRAWER' ?
            h("page-tabs", { role: role }) :
            h("page-tabs", { role: role, hasTabs: false })));
    }
    render() {
        return (h("ion-split-pane", { when: "lg" },
            this.renderMenu(),
            this.renderNav(this.directions)));
    }
    static get is() { return "app-drawer"; }
    static get properties() { return {
        "directions": {
            "state": true
        },
        "nav": {
            "connect": "ion-nav"
        },
        "profile": {
            "state": true
        },
        "store": {
            "context": "store"
        },
        "tabs": {
            "connect": "page-tabs"
        },
        "token": {
            "state": true
        }
    }; }
    static get style() { return ".static-stars ion-button{background:grey;-webkit-clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);height:2.25em!important;width:2.25em!important;cursor:none}.static-stars ion-button:hover{cursor:none}.static-stars ion-button.marked{background:#ff0}"; }
}

function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
}

/* global window */

var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = symbolObservablePonyfill(root);

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function.');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    if (isDispatching) {
      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribelistener for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribelistener for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.

    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[result] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[result] = observable, _ref2;
}

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionDescription = actionType && "action \"" + String(actionType) + "\"" || 'an action';
  return "Given " + actionDescription + ", reducer \"" + key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.";
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle " + ActionTypes.INIT + " or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error("bindActionCreators expected an object or a function, instead received " + (actionCreators === null ? 'null' : typeof actionCreators) + ". " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
  }

  var boundActionCreators = {};

  for (var key in actionCreators) {
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    keys.push.apply(keys, Object.getOwnPropertySymbols(object));
  }

  if (enumerableOnly) keys = keys.filter(function (sym) {
    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
  });
  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread2({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

var redux = /*#__PURE__*/Object.freeze({
    __DO_NOT_USE__ActionTypes: ActionTypes,
    applyMiddleware: applyMiddleware,
    bindActionCreators: bindActionCreators,
    combineReducers: combineReducers,
    compose: compose,
    createStore: createStore
});

function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var reduxLogger = createCommonjsModule(function (module, exports) {
!function(e,t){t(exports);}(commonjsGlobal,function(e){function t(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}});}function r(e,t){Object.defineProperty(this,"kind",{value:e,enumerable:!0}),t&&t.length&&Object.defineProperty(this,"path",{value:t,enumerable:!0});}function n(e,t,r){n.super_.call(this,"E",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0}),Object.defineProperty(this,"rhs",{value:r,enumerable:!0});}function o(e,t){o.super_.call(this,"N",e),Object.defineProperty(this,"rhs",{value:t,enumerable:!0});}function i(e,t){i.super_.call(this,"D",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0});}function a(e,t,r){a.super_.call(this,"A",e),Object.defineProperty(this,"index",{value:t,enumerable:!0}),Object.defineProperty(this,"item",{value:r,enumerable:!0});}function f(e,t,r){var n=e.slice((r||t)+1||e.length);return e.length=t<0?e.length+t:t,e.push.apply(e,n),e}function u(e){var t="undefined"==typeof e?"undefined":N(e);return "object"!==t?t:e===Math?"math":null===e?"null":Array.isArray(e)?"array":"[object Date]"===Object.prototype.toString.call(e)?"date":"function"==typeof e.toString&&/^\/.*\//.test(e.toString())?"regexp":"object"}function l(e,t,r,c,s,d,p){s=s||[],p=p||[];var g=s.slice(0);if("undefined"!=typeof d){if(c){if("function"==typeof c&&c(g,d))return;if("object"===("undefined"==typeof c?"undefined":N(c))){if(c.prefilter&&c.prefilter(g,d))return;if(c.normalize){var h=c.normalize(g,d,e,t);h&&(e=h[0],t=h[1]);}}}g.push(d);}"regexp"===u(e)&&"regexp"===u(t)&&(e=e.toString(),t=t.toString());var y="undefined"==typeof e?"undefined":N(e),v="undefined"==typeof t?"undefined":N(t),b="undefined"!==y||p&&p[p.length-1].lhs&&p[p.length-1].lhs.hasOwnProperty(d),m="undefined"!==v||p&&p[p.length-1].rhs&&p[p.length-1].rhs.hasOwnProperty(d);if(!b&&m)r(new o(g,t));else if(!m&&b)r(new i(g,e));else if(u(e)!==u(t))r(new n(g,e,t));else if("date"===u(e)&&e-t!==0)r(new n(g,e,t));else if("object"===y&&null!==e&&null!==t)if(p.filter(function(t){return t.lhs===e}).length)e!==t&&r(new n(g,e,t));else{if(p.push({lhs:e,rhs:t}),Array.isArray(e)){var w;e.length;for(w=0;w<e.length;w++)w>=t.length?r(new a(g,w,new i(void 0,e[w]))):l(e[w],t[w],r,c,g,w,p);for(;w<t.length;)r(new a(g,w,new o(void 0,t[w++])));}else{var x=Object.keys(e),S=Object.keys(t);x.forEach(function(n,o){var i=S.indexOf(n);i>=0?(l(e[n],t[n],r,c,g,n,p),S=f(S,i)):l(e[n],void 0,r,c,g,n,p);}),S.forEach(function(e){l(void 0,t[e],r,c,g,e,p);});}p.length=p.length-1;}else e!==t&&("number"===y&&isNaN(e)&&isNaN(t)||r(new n(g,e,t)));}function c(e,t,r,n){return n=n||[],l(e,t,function(e){e&&n.push(e);},r),n.length?n:void 0}function s(e,t,r){if(r.path&&r.path.length){var n,o=e[t],i=r.path.length-1;for(n=0;n<i;n++)o=o[r.path[n]];switch(r.kind){case"A":s(o[r.path[n]],r.index,r.item);break;case"D":delete o[r.path[n]];break;case"E":case"N":o[r.path[n]]=r.rhs;}}else switch(r.kind){case"A":s(e[t],r.index,r.item);break;case"D":e=f(e,t);break;case"E":case"N":e[t]=r.rhs;}return e}function d(e,t,r){if(e&&t&&r&&r.kind){for(var n=e,o=-1,i=r.path?r.path.length-1:0;++o<i;)"undefined"==typeof n[r.path[o]]&&(n[r.path[o]]="number"==typeof r.path[o]?[]:{}),n=n[r.path[o]];switch(r.kind){case"A":s(r.path?n[r.path[o]]:n,r.index,r.item);break;case"D":delete n[r.path[o]];break;case"E":case"N":n[r.path[o]]=r.rhs;}}}function p(e,t,r){if(r.path&&r.path.length){var n,o=e[t],i=r.path.length-1;for(n=0;n<i;n++)o=o[r.path[n]];switch(r.kind){case"A":p(o[r.path[n]],r.index,r.item);break;case"D":o[r.path[n]]=r.lhs;break;case"E":o[r.path[n]]=r.lhs;break;case"N":delete o[r.path[n]];}}else switch(r.kind){case"A":p(e[t],r.index,r.item);break;case"D":e[t]=r.lhs;break;case"E":e[t]=r.lhs;break;case"N":e=f(e,t);}return e}function g(e,t,r){if(e&&t&&r&&r.kind){var n,o,i=e;for(o=r.path.length-1,n=0;n<o;n++)"undefined"==typeof i[r.path[n]]&&(i[r.path[n]]={}),i=i[r.path[n]];switch(r.kind){case"A":p(i[r.path[n]],r.index,r.item);break;case"D":i[r.path[n]]=r.lhs;break;case"E":i[r.path[n]]=r.lhs;break;case"N":delete i[r.path[n]];}}}function h(e,t,r){if(e&&t){var n=function(n){r&&!r(e,t,n)||d(e,t,n);};l(e,t,n);}}function y(e){return "color: "+F[e].color+"; font-weight: bold"}function v(e){var t=e.kind,r=e.path,n=e.lhs,o=e.rhs,i=e.index,a=e.item;switch(t){case"E":return [r.join("."),n,"→",o];case"N":return [r.join("."),o];case"D":return [r.join(".")];case"A":return [r.join(".")+"["+i+"]",a];default:return []}}function b(e,t,r,n){var o=c(e,t);try{n?r.groupCollapsed("diff"):r.group("diff");}catch(e){r.log("diff");}o?o.forEach(function(e){var t=e.kind,n=v(e);r.log.apply(r,["%c "+F[t].text,y(t)].concat(P(n)));}):r.log("—— no diff ——");try{r.groupEnd();}catch(e){r.log("—— diff end —— ");}}function m(e,t,r,n){switch("undefined"==typeof e?"undefined":N(e)){case"object":return "function"==typeof e[n]?e[n].apply(e,P(r)):e[n];case"function":return e(t);default:return e}}function w(e){var t=e.timestamp,r=e.duration;return function(e,n,o){var i=["action"];return i.push("%c"+String(e.type)),t&&i.push("%c@ "+n),r&&i.push("%c(in "+o.toFixed(2)+" ms)"),i.join(" ")}}function x(e,t){var r=t.logger,n=t.actionTransformer,o=t.titleFormatter,i=void 0===o?w(t):o,a=t.collapsed,f=t.colors,u=t.level,l=t.diff,c="undefined"==typeof t.titleFormatter;e.forEach(function(o,s){var d=o.started,p=o.startedTime,g=o.action,h=o.prevState,y=o.error,v=o.took,w=o.nextState,x=e[s+1];x&&(w=x.prevState,v=x.started-d);var S=n(g),k="function"==typeof a?a(function(){return w},g,o):a,j=D(p),E=f.title?"color: "+f.title(S)+";":"",A=["color: gray; font-weight: lighter;"];A.push(E),t.timestamp&&A.push("color: gray; font-weight: lighter;"),t.duration&&A.push("color: gray; font-weight: lighter;");var O=i(S,j,v);try{k?f.title&&c?r.groupCollapsed.apply(r,["%c "+O].concat(A)):r.groupCollapsed(O):f.title&&c?r.group.apply(r,["%c "+O].concat(A)):r.group(O);}catch(e){r.log(O);}var N=m(u,S,[h],"prevState"),P=m(u,S,[S],"action"),C=m(u,S,[y,h],"error"),F=m(u,S,[w],"nextState");if(N)if(f.prevState){var L="color: "+f.prevState(h)+"; font-weight: bold";r[N]("%c prev state",L,h);}else r[N]("prev state",h);if(P)if(f.action){var T="color: "+f.action(S)+"; font-weight: bold";r[P]("%c action    ",T,S);}else r[P]("action    ",S);if(y&&C)if(f.error){var M="color: "+f.error(y,h)+"; font-weight: bold;";r[C]("%c error     ",M,y);}else r[C]("error     ",y);if(F)if(f.nextState){var _="color: "+f.nextState(w)+"; font-weight: bold";r[F]("%c next state",_,w);}else r[F]("next state",w);l&&b(h,w,r,k);try{r.groupEnd();}catch(e){r.log("—— log end ——");}});}function S(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object.assign({},L,e),r=t.logger,n=t.stateTransformer,o=t.errorTransformer,i=t.predicate,a=t.logErrors,f=t.diffPredicate;if("undefined"==typeof r)return function(){return function(e){return function(t){return e(t)}}};if(e.getState&&e.dispatch)return console.error("[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n// Logger with default options\nimport { logger } from 'redux-logger'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport createLogger from 'redux-logger'\nconst logger = createLogger({\n  // ...options\n});\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n"),function(){return function(e){return function(t){return e(t)}}};var u=[];return function(e){var r=e.getState;return function(e){return function(l){if("function"==typeof i&&!i(r,l))return e(l);var c={};u.push(c),c.started=O.now(),c.startedTime=new Date,c.prevState=n(r()),c.action=l;var s=void 0;if(a)try{s=e(l);}catch(e){c.error=o(e);}else s=e(l);c.took=O.now()-c.started,c.nextState=n(r());var d=t.diff&&"function"==typeof f?f(r,l):t.diff;if(x(u,Object.assign({},t,{diff:d})),u.length=0,c.error)throw c.error;return s}}}}var k,j,E=function(e,t){return new Array(t+1).join(e)},A=function(e,t){return E("0",t-e.toString().length)+e},D=function(e){return A(e.getHours(),2)+":"+A(e.getMinutes(),2)+":"+A(e.getSeconds(),2)+"."+A(e.getMilliseconds(),3)},O="undefined"!=typeof performance&&null!==performance&&"function"==typeof performance.now?performance:Date,N="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},P=function(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)},C=[];k="object"===("undefined"==typeof commonjsGlobal?"undefined":N(commonjsGlobal))&&commonjsGlobal?commonjsGlobal:"undefined"!=typeof window?window:{},j=k.DeepDiff,j&&C.push(function(){"undefined"!=typeof j&&k.DeepDiff===c&&(k.DeepDiff=j,j=void 0);}),t(n,r),t(o,r),t(i,r),t(a,r),Object.defineProperties(c,{diff:{value:c,enumerable:!0},observableDiff:{value:l,enumerable:!0},applyDiff:{value:h,enumerable:!0},applyChange:{value:d,enumerable:!0},revertChange:{value:g,enumerable:!0},isConflict:{value:function(){return "undefined"!=typeof j},enumerable:!0},noConflict:{value:function(){return C&&(C.forEach(function(e){e();}),C=null),c},enumerable:!0}});var F={E:{color:"#2196F3",text:"CHANGED:"},N:{color:"#4CAF50",text:"ADDED:"},D:{color:"#F44336",text:"DELETED:"},A:{color:"#2196F3",text:"ARRAY:"}},L={level:"log",logger:console,logErrors:!0,collapsed:void 0,predicate:void 0,duration:!1,timestamp:!0,stateTransformer:function(e){return e},actionTransformer:function(e){return e},errorTransformer:function(e){return e},colors:{title:function(){return "inherit"},prevState:function(){return "#9E9E9E"},action:function(){return "#03A9F4"},nextState:function(){return "#4CAF50"},error:function(){return "#F20404"}},diff:!1,diffPredicate:void 0,transformer:void 0},T=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.dispatch,r=e.getState;return "function"==typeof t||"function"==typeof r?S()({dispatch:t,getState:r}):void console.error("\n[redux-logger v3] BREAKING CHANGE\n[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.\n[redux-logger v3] Change\n[redux-logger v3] import createLogger from 'redux-logger'\n[redux-logger v3] to\n[redux-logger v3] import { createLogger } from 'redux-logger'\n")};e.defaults=L,e.createLogger=S,e.logger=T,e.default=T,Object.defineProperty(e,"__esModule",{value:!0});});
});

var logger = unwrapExports(reduxLogger);

const prepareState = () => {
    const defaultState = {
        token: '',
        explained: 0,
        introduced: 0,
        registered: true,
        directions: [{
                component: 'LOGIN',
                url: '/login'
            }],
    };
    const sessionOpen = Storage.getItem('token');
    return Object.assign({}, defaultState, { token: sessionOpen || defaultState.token, explained: +Storage.getItem('explained') || +defaultState.explained, introduced: +Storage.getItem('introduced') || +defaultState.introduced, directions: sessionOpen && [...defaultState.directions, { component: 'DRAWER', url: '/' }] || defaultState.directions });
};
const session = (state = prepareState(), action) => {
    switch (action.type) {
        case TypeKeys.SKIP_INTRO: {
            return Object.assign({}, state, { introduced: action.introduced });
        }
        case TypeKeys.SKIP_TOUR: {
            return Object.assign({}, state, { explained: action.explained });
        }
        case TypeKeys.SET_TOKEN: {
            return Object.assign({}, state, { token: action.token, directions: [...state.directions, action.directions] });
        }
        case TypeKeys.REVOKE_TOKEN: {
            return Object.assign({}, state, { token: action.token, directions: [action.directions] });
        }
        case TypeKeys.OPEN_REGISTER: {
            return Object.assign({}, state, { registered: action.registered, directions: [...state.directions, action.directions] });
        }
        case TypeKeys.CLOSE_REGISTER: {
            return Object.assign({}, state, { registered: action.registered, directions: [action.directions] });
        }
        case TypeKeys.OPEN: {
            return Object.assign({}, state, { directions: action.directions ?
                    [...state.directions, action.directions] :
                    [...state.directions] });
        }
        case TypeKeys.CLOSE: {
            return Object.assign({}, state, { directions: state.directions.slice(0, -1) });
        }
        case TypeKeys.OPEN_PROFILE: {
            return Object.assign({}, state, { profile: action.profile });
        }
    }
    return state;
};

const prepareState$1 = () => {
    const defaultState = {
        orders: [],
        bids: []
    };
    return Object.assign({}, defaultState);
};
const customer = (state = prepareState$1(), action) => {
    switch (action.type) {
        case TypeKeys.REGISTER_ORDER: {
            return Object.assign({}, state);
        }
        case TypeKeys.MY_ORDERS: {
            return Object.assign({}, state, { orders: action.orders });
        }
        case TypeKeys.ORDER_BIDS: {
            return Object.assign({}, state, { bids: action.bids });
        }
        case TypeKeys.ORDER_MERCHANT: {
            return Object.assign({}, state);
        }
    }
    return state;
};

const prepareState$2 = () => {
    const defaultState = {
        orders: []
    };
    return Object.assign({}, defaultState);
};
const merchant = (state = prepareState$2(), action) => {
    switch (action.type) {
        case TypeKeys.SELECT_ORDER: {
            return Object.assign({}, state);
        }
        case TypeKeys.CANCEL_ORDER: {
            return Object.assign({}, state);
        }
        case TypeKeys.START_ORDER: {
            return Object.assign({}, state);
        }
        case TypeKeys.SHOW_ORDER: {
            return Object.assign({}, state, { orders: action.orders });
        }
        case TypeKeys.PLACE_ORDER: {
            return Object.assign({}, state, { orderId: action.orderId });
        }
        case TypeKeys.MERCHANT_ORDERS: {
            return Object.assign({}, state, { orders: action.orders });
        }
    }
    return state;
};

const rootReducer = combineReducers({
    session,
    customer,
    merchant
});

var reduxDevtoolsExtension = createCommonjsModule(function (module, exports) {

var compose = redux.compose;

exports.__esModule = true;
exports.composeWithDevTools =
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : function () {
        if (arguments.length === 0) return undefined;
        if (typeof arguments[0] === 'object') return compose;
        return compose.apply(null, arguments);
      };

exports.devToolsEnhancer =
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__
    : function () {
        return function (noop) {
          return noop;
        };
      };
});

unwrapExports(reduxDevtoolsExtension);
var reduxDevtoolsExtension_1 = reduxDevtoolsExtension.composeWithDevTools;
var reduxDevtoolsExtension_2 = reduxDevtoolsExtension.devToolsEnhancer;

const configureStore = (preloadedState) => createStore(rootReducer, preloadedState, reduxDevtoolsExtension_1(applyMiddleware(logger, thunk)));

class App {
    constructor() {
        this._store = configureStore({});
    }
    startTimer() {
        let storeState = this._store.getState();
        this._store.subscribe(() => { storeState = this._store.getState(); });
        setInterval(() => {
            const { token } = storeState.session;
            if (token !== '') {
                const actions = this.pendingActions(storeState);
                actions.forEach(async (a) => this._store.dispatch(await a(token)));
            }
        }, 5000);
    }
    static parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
    }
    updateMapDrawer(role, customer, merchant) {
        const actions = [];
        if (role === 'CUSTOMER') {
            if (customer.orders.length >= 0) {
                actions.push(showMyOrders);
            }
        }
        else if (role === 'MERCHANT') {
            if (merchant.orders.length >= 0) {
                actions.push(showMyOrders$1);
            }
        }
        return actions;
    }
    pendingActions(state) {
        const { customer, merchant, session } = state;
        const { directions, token } = session;
        const role = App.parseJwt(token)['_role'];
        const activeTab = directions.slice(-1)[0].component;
        if (activeTab === 'DRAWER')
            return this.updateMapDrawer(role, customer, merchant);
        else
            return [];
    }
}

const { SplashScreen } = Plugins;
class AppRoot {
    async componentWillLoad() {
        this.app = new App();
        this.app.startTimer();
        this.store.setStore(this.app._store);
        this.store.mapStateToProps(this, (state) => {
            const { session: { token, explained } } = state;
            return { token, explained };
        });
        this.store.mapDispatchToProps(this, { toggleTour });
    }
    async componentDidLoad() {
        this.checkLoginStatus();
        try {
            await SplashScreen.hide();
        }
        catch (_a) {
            return;
        }
    }
    checkLoginStatus() {
        return Boolean(this.token);
    }
    checkExplainedStatus() {
        return Boolean(this.explained);
    }
    render() {
        return (h("ion-app", null, this.checkLoginStatus() ? (this.checkExplainedStatus() ? (h("app-drawer", null)) : (h("generic-carousel", null,
            h("ion-slide", { slot: "slide1" },
                h("div", { class: "slide-image-container" },
                    h("img", { src: "assets/img/tour_1_clipper.svg", class: "slide-image" })),
                h("h2", { class: "slide-title" },
                    "Bem-vindo ao ",
                    h("b", null, "Shipping")),
                h("p", null,
                    "O ",
                    h("b", null, "Shipping"),
                    " \u00E9 um aplicativo de servi\u00E7os de mudan\u00E7a e fretagem, simples, pr\u00E1tico e r\u00E1pido. Esta \u00E9 uma vers\u00E3o para testes - poder\u00E1 ter alguns problemas e pedimos sua compreens\u00E3o. Pressione em continuar."),
                h("ion-button", { fill: "clear", href: "#", onClick: () => this.toggleTour(true) },
                    "Continuar",
                    h("ion-icon", { slot: "end", name: "arrow-forward" })))))) : (h("app-entrance", null))));
    }
    static get is() { return "app-root"; }
    static get properties() { return {
        "explained": {
            "state": true
        },
        "store": {
            "context": "store"
        },
        "token": {
            "state": true
        }
    }; }
    static get style() { return ""; }
}

class PageTabs {
    constructor() {
        this.hasTabs = true;
    }
    componentWillLoad() {
        this.store.mapStateToProps(this, (state) => {
            const { session: { directions } } = state;
            return { directions };
        });
        this.store.mapDispatchToProps(this, { open });
    }
    async componentDidLoad() {
        const menuCtlr = await this.menuCtrl.componentOnReady();
        const tabsCtlr = await this.tabCtrl.componentOnReady();
        tabsCtlr.select('tab-drawer');
        document.querySelector('ion-tabs').select('tab-drawer');
        menuCtlr.enable(true);
    }
    async select(tab) {
        const tabsCtlr = await this.tabCtrl.componentOnReady();
        tabsCtlr.select('tab-' + tab);
    }
    toggleOpen(tab) {
        this.open(tab.toUpperCase(), '/' + tab);
    }
    render() {
        return [
            h("ion-tabs", null,
                h("slot", null),
                [
                    h("ion-tab", { tab: "tab-drawer", component: "app-map" }),
                    h("ion-tab", { tab: "tab-schedule", component: "page-schedule" }),
                    h("ion-tab", { tab: "tab-create", component: "page-create" }),
                    h("ion-tab", { tab: "tab-speakers", component: "page-order-list" }),
                    h("ion-tab", { tab: "tab-about", component: "page-about" })
                ],
                h("ion-tab-bar", { slot: "bottom" },
                    this.role === 'CUSTOMER' && [
                        h("ion-tab-button", { tab: "tab-create", onClick: () => this.toggleOpen('create') },
                            h("ion-icon", { name: "cube" }),
                            h("ion-label", null, "Criar")),
                        h("ion-tab-button", { tab: "tab-speakers", onClick: () => this.toggleOpen('speakers') },
                            h("ion-icon", { name: "cash" }),
                            h("ion-label", null, "Ofertas")),
                        h("ion-tab-button", { tab: "tab-schedule", onClick: () => this.toggleOpen('schedule') },
                            h("ion-icon", { name: "calendar" }),
                            h("ion-label", null, "Fretes"))
                    ],
                    this.role === 'MERCHANT' && [
                        h("ion-tab-button", { tab: "tab-speakers", onClick: () => this.toggleOpen('speakers') },
                            h("ion-icon", { name: "cash" }),
                            h("ion-label", null, "Ofertar")),
                        h("ion-tab-button", { tab: "tab-schedule", onClick: () => this.toggleOpen('schedule') },
                            h("ion-icon", { name: "calendar" }),
                            h("ion-label", null, "Fretes")),
                        h("ion-tab-button", { tab: "tab-about", onClick: () => this.toggleOpen('about') },
                            h("ion-icon", { name: "information-circle" }),
                            h("ion-label", null, "Sobre"))
                    ]))
        ];
    }
    static get is() { return "page-tabs"; }
    static get properties() { return {
        "directions": {
            "state": true
        },
        "hasTabs": {
            "type": Boolean,
            "attr": "has-tabs"
        },
        "menuCtrl": {
            "connect": "ion-menu-controller"
        },
        "role": {
            "type": "Any",
            "attr": "role"
        },
        "select": {
            "method": true
        },
        "store": {
            "context": "store"
        },
        "tabCtrl": {
            "connect": "ion-tabs"
        }
    }; }
    static get style() { return ""; }
}

class App$1 {
    componentDidLoad() {
        rIC(() => {
            const { win, config, queue } = this;
            if (!config.getBoolean("_testing")) {
                importTapClick(win, config);
            }
            importInputShims(win, config);
            importStatusTap(win, config, queue);
            importHardwareBackButton(win, config);
            importFocusVisible(win);
        });
    }
    hostData() {
        return {
            class: {
                [`${this.mode}`]: true,
                "ion-page": true,
                "force-statusbar-padding": this.config.getBoolean("_forceStatusbarPadding")
            }
        };
    }
    static get is() { return "ion-app"; }
    static get properties() {
        return {
            "config": {
                "context": "config"
            },
            "el": {
                "elementRef": true
            },
            "queue": {
                "context": "queue"
            },
            "win": {
                "context": "window"
            }
        };
    }
    static get style() { return "html.plt-mobile ion-app{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}ion-app.force-statusbar-padding{--ion-safe-area-top:20px}"; }
}
function importHardwareBackButton(win, config) {
    const hardwareBackConfig = config.getBoolean("hardwareBackButton", isPlatform(win, "hybrid"));
    if (hardwareBackConfig) {
        import('./chunk-a6c44155.js').then(module => module.startHardwareBackButton(win));
    }
}
function importStatusTap(win, config, queue) {
    const statusTap = config.getBoolean("statusTap", isPlatform(win, "hybrid"));
    if (statusTap) {
        import('./chunk-582d8c19.js').then(module => module.startStatusTap(win, queue));
    }
}
function importFocusVisible(win) {
    import('./chunk-6fb8e8d5.js').then(module => module.startFocusVisible(win.document));
}
function importTapClick(win, config) {
    import('./chunk-e5b9ec6b.js').then(module => module.startTapClick(win.document, config));
}
function importInputShims(win, config) {
    const inputShims = config.getBoolean("inputShims", needInputShims(win));
    if (inputShims) {
        import('./chunk-c23fa9d7.js').then(module => module.startInputShims(win.document, config));
    }
}
function needInputShims(win) {
    return isPlatform(win, "ios") && isPlatform(win, "mobile");
}

class Avatar {
    hostData() {
        return {
            class: {
                [`${this.mode}`]: true,
            }
        };
    }
    render() {
        return h("slot", null);
    }
    static get is() { return "ion-avatar"; }
    static get encapsulation() { return "shadow"; }
    static get style() { return ".sc-ion-avatar-ios-h{border-radius:var(--border-radius);display:block}.sc-ion-avatar-ios-s > img, .sc-ion-avatar-ios-s > ion-img{border-radius:var(--border-radius);width:100%;height:100%;-o-object-fit:cover;object-fit:cover;overflow:hidden}.sc-ion-avatar-ios-h{--border-radius:50%;width:48px;height:48px}"; }
    static get styleMode() { return "ios"; }
}

const SPLIT_PANE_MAIN = "split-pane-main";
const SPLIT_PANE_SIDE = "split-pane-side";
const QUERY = {
    "xs": "(min-width: 0px)",
    "sm": "(min-width: 576px)",
    "md": "(min-width: 768px)",
    "lg": "(min-width: 992px)",
    "xl": "(min-width: 1200px)",
    "never": ""
};
class SplitPane {
    constructor() {
        this.visible = false;
        this.disabled = false;
        this.when = QUERY["lg"];
    }
    visibleChanged(visible) {
        const detail = { visible, isPane: this.isPane.bind(this) };
        this.ionSplitPaneVisible.emit(detail);
    }
    componentDidLoad() {
        this.styleChildren();
        this.updateState();
    }
    componentDidUnload() {
        if (this.rmL) {
            this.rmL();
            this.rmL = undefined;
        }
    }
    updateState() {
        if (this.isServer) {
            return;
        }
        if (this.rmL) {
            this.rmL();
            this.rmL = undefined;
        }
        if (this.disabled) {
            this.visible = false;
            return;
        }
        const query = this.when;
        if (typeof query === "boolean") {
            this.visible = query;
            return;
        }
        const mediaQuery = QUERY[query] || query;
        if (mediaQuery.length === 0) {
            this.visible = false;
            return;
        }
        if (this.win.matchMedia) {
            const callback = (q) => {
                this.visible = q.matches;
            };
            const mediaList = this.win.matchMedia(mediaQuery);
            mediaList.addListener(callback);
            this.rmL = () => mediaList.removeListener(callback);
            this.visible = mediaList.matches;
        }
    }
    isPane(element) {
        if (!this.visible) {
            return false;
        }
        return element.parentElement === this.el
            && element.classList.contains(SPLIT_PANE_SIDE);
    }
    styleChildren() {
        if (this.isServer) {
            return;
        }
        const contentId = this.contentId;
        const children = this.el.children;
        const nu = this.el.childElementCount;
        let foundMain = false;
        for (let i = 0; i < nu; i++) {
            const child = children[i];
            const isMain = contentId !== undefined ? child.id === contentId : child.hasAttribute("main");
            if (isMain) {
                if (foundMain) {
                    console.warn("split pane cannot have more than one main node");
                    return;
                }
                foundMain = true;
            }
            setPaneClass(child, isMain);
        }
        if (!foundMain) {
            console.warn("split pane does not have a specified main node");
        }
    }
    hostData() {
        return {
            class: {
                [`${this.mode}`]: true,
                [`split-pane-${this.mode}`]: true,
                "split-pane-visible": this.visible
            }
        };
    }
    static get is() { return "ion-split-pane"; }
    static get properties() {
        return {
            "contentId": {
                "type": String,
                "attr": "content-id"
            },
            "disabled": {
                "type": Boolean,
                "attr": "disabled",
                "watchCallbacks": ["updateState"]
            },
            "el": {
                "elementRef": true
            },
            "isServer": {
                "context": "isServer"
            },
            "visible": {
                "state": true,
                "watchCallbacks": ["visibleChanged"]
            },
            "when": {
                "type": "Any",
                "attr": "when",
                "watchCallbacks": ["updateState"]
            },
            "win": {
                "context": "window"
            }
        };
    }
    static get events() {
        return [{
                "name": "ionSplitPaneVisible",
                "method": "ionSplitPaneVisible",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get style() { return "ion-split-pane{left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:nowrap;flex-wrap:nowrap;contain:strict}.split-pane-visible>.split-pane-main,.split-pane-visible>.split-pane-side{left:0;right:0;top:0;bottom:0;position:relative;-ms-flex:1;flex:1;-webkit-box-shadow:none!important;box-shadow:none!important;z-index:0}.split-pane-visible>.split-pane-side:not(ion-menu),.split-pane-visible>ion-menu.split-pane-side.menu-enabled{display:-ms-flexbox;display:flex;-ms-flex-negative:0;flex-shrink:0}.split-pane-side:not(ion-menu){display:none}.split-pane-visible>.split-pane-side{-ms-flex-order:-1;order:-1}.split-pane-visible>.split-pane-side[side=end]{-ms-flex-order:1;order:1}.split-pane-ios{--border:0.55px solid var(--ion-item-border-color,var(--ion-border-color,var(--ion-color-step-150,#c8c7cc)))}.split-pane-ios.split-pane-visible>.split-pane-side{min-width:270px;max-width:28%;border-right:var(--border);border-left:0}.split-pane-ios.split-pane-visible>.split-pane-side[side=end]{min-width:270px;max-width:28%;border-right:0;border-left:var(--border)}"; }
    static get styleMode() { return "ios"; }
}
function setPaneClass(el, isMain) {
    let toAdd;
    let toRemove;
    if (isMain) {
        toAdd = SPLIT_PANE_MAIN;
        toRemove = SPLIT_PANE_SIDE;
    }
    else {
        toAdd = SPLIT_PANE_SIDE;
        toRemove = SPLIT_PANE_MAIN;
    }
    const classList = el.classList;
    classList.add(toAdd);
    classList.remove(toRemove);
}

class TabBar {
    constructor() {
        this.keyboardVisible = false;
        this.translucent = false;
    }
    selectedTabChanged() {
        this.ionTabBarChanged.emit({
            tab: this.selectedTab
        });
    }
    onKeyboardWillHide() {
        setTimeout(() => this.keyboardVisible = false, 50);
    }
    onKeyboardWillShow() {
        if (this.el.getAttribute("slot") !== "top") {
            this.keyboardVisible = true;
        }
    }
    componentWillLoad() {
        this.selectedTabChanged();
    }
    hostData() {
        const { color, translucent, keyboardVisible } = this;
        return {
            "role": "tablist",
            "aria-hidden": keyboardVisible ? "true" : null,
            class: Object.assign({}, createColorClasses(color), { [`${this.mode}`]: true, "tab-bar-translucent": translucent, "tab-bar-hidden": keyboardVisible })
        };
    }
    render() {
        return (h("slot", null));
    }
    static get is() { return "ion-tab-bar"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "color": {
                "type": String,
                "attr": "color"
            },
            "doc": {
                "context": "document"
            },
            "el": {
                "elementRef": true
            },
            "keyboardVisible": {
                "state": true
            },
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "queue": {
                "context": "queue"
            },
            "selectedTab": {
                "type": String,
                "attr": "selected-tab",
                "watchCallbacks": ["selectedTabChanged"]
            },
            "translucent": {
                "type": Boolean,
                "attr": "translucent"
            }
        };
    }
    static get events() {
        return [{
                "name": "ionTabBarChanged",
                "method": "ionTabBarChanged",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get listeners() {
        return [{
                "name": "window:keyboardWillHide",
                "method": "onKeyboardWillHide"
            }, {
                "name": "window:keyboardWillShow",
                "method": "onKeyboardWillShow"
            }];
    }
    static get style() { return ".sc-ion-tab-bar-ios-h{padding-left:var(--ion-safe-area-left);padding-right:var(--ion-safe-area-right);display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:auto;padding-bottom:var(--ion-safe-area-bottom,0);border-top:var(--border);background:var(--background);color:var(--color);text-align:center;contain:strict;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:10;-webkit-box-sizing:content-box!important;box-sizing:content-box!important}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-tab-bar-ios-h{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-safe-area-left);padding-inline-start:var(--ion-safe-area-left);-webkit-padding-end:var(--ion-safe-area-right);padding-inline-end:var(--ion-safe-area-right)}}.ion-color.sc-ion-tab-bar-ios-h, .sc-ion-tab-bar-ios-h.ion-color .sc-ion-tab-bar-ios-s > ion-tab-button{background:var(--ion-color-base);color:rgba(var(--ion-color-contrast-rgb),.7)}.sc-ion-tab-bar-ios-h.ion-color .sc-ion-tab-bar-ios-s > ion-tab-button{--background-focused:var(--ion-color-shade);--color-selected:var(--ion-color-contrast)}.sc-ion-tab-bar-ios-h.ion-color .sc-ion-tab-bar-ios-s > .tab-selected{color:var(--ion-color-contrast)}[slot=top].sc-ion-tab-bar-ios-h{padding-bottom:0;border-top:0;border-bottom:var(--border)}.tab-bar-hidden.sc-ion-tab-bar-ios-h{display:none!important}.sc-ion-tab-bar-ios-h{--background:var(--ion-tab-bar-background,var(--ion-background-color,#fff));--background-focused:var(--ion-tab-bar-background-focused,#e0e0e0);--border:0.55px solid var(--ion-tab-bar-border-color,var(--ion-border-color,var(--ion-color-step-150,rgba(0,0,0,0.2))));--color:var(--ion-tab-bar-color,var(--ion-color-step-450,#8c8c8c));--color-selected:var(--ion-tab-bar-color-activated,var(--ion-color-primary,#3880ff));height:50px}.tab-bar-translucent.sc-ion-tab-bar-ios-h{--background:rgba(var(--ion-background-color-rgb,255,255,255),0.8);-webkit-backdrop-filter:saturate(210%) blur(20px);backdrop-filter:saturate(210%) blur(20px)}.ion-color.tab-bar-translucent.sc-ion-tab-bar-ios-h{background:rgba(var(--ion-color-base-rgb),.8)}.sc-ion-tab-bar-ios-h.tab-bar-translucent .sc-ion-tab-bar-ios-s > ion-tab-button{background:transparent}"; }
    static get styleMode() { return "ios"; }
}

class TabButton {
    constructor() {
        this.selected = false;
        this.disabled = false;
    }
    onTabBarChanged(ev) {
        this.selected = this.tab === ev.detail.tab;
    }
    onClick(ev) {
        if (this.tab !== undefined) {
            if (!this.disabled) {
                this.ionTabButtonClick.emit({
                    tab: this.tab,
                    href: this.href,
                    selected: this.selected
                });
            }
            ev.preventDefault();
        }
    }
    componentWillLoad() {
        if (this.layout === undefined) {
            this.layout = this.config.get("tabButtonLayout", "icon-top");
        }
    }
    get hasLabel() {
        return !!this.el.querySelector("ion-label");
    }
    get hasIcon() {
        return !!this.el.querySelector("ion-icon");
    }
    hostData() {
        const { disabled, hasIcon, hasLabel, layout, selected, tab } = this;
        return {
            "role": "tab",
            "aria-selected": selected ? "true" : null,
            "id": tab !== undefined ? `tab-button-${tab}` : null,
            class: {
                [`${this.mode}`]: true,
                "tab-selected": selected,
                "tab-disabled": disabled,
                "tab-has-label": hasLabel,
                "tab-has-icon": hasIcon,
                "tab-has-label-only": hasLabel && !hasIcon,
                "tab-has-icon-only": hasIcon && !hasLabel,
                [`tab-layout-${layout}`]: true,
                "ion-activatable": true,
            }
        };
    }
    render() {
        const { mode, href } = this;
        return (h("a", { href: href }, h("slot", null), mode === "md" && h("ion-ripple-effect", { type: "unbounded" })));
    }
    static get is() { return "ion-tab-button"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "config": {
                "context": "config"
            },
            "disabled": {
                "type": Boolean,
                "attr": "disabled"
            },
            "doc": {
                "context": "document"
            },
            "el": {
                "elementRef": true
            },
            "href": {
                "type": String,
                "attr": "href"
            },
            "layout": {
                "type": String,
                "attr": "layout",
                "mutable": true
            },
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "queue": {
                "context": "queue"
            },
            "selected": {
                "type": Boolean,
                "attr": "selected",
                "mutable": true
            },
            "tab": {
                "type": String,
                "attr": "tab"
            }
        };
    }
    static get events() {
        return [{
                "name": "ionTabButtonClick",
                "method": "ionTabButtonClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get listeners() {
        return [{
                "name": "parent:ionTabBarChanged",
                "method": "onTabBarChanged"
            }, {
                "name": "click",
                "method": "onClick"
            }];
    }
    static get style() { return ".sc-ion-tab-button-ios-h{--ripple-color:var(--color-selected);-ms-flex:1;flex:1;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background:var(--background);color:var(--color)}.sc-ion-tab-button-ios-h, a.sc-ion-tab-button-ios{height:100%}a.sc-ion-tab-button-ios{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:-ms-flexbox;display:flex;position:relative;-ms-flex-direction:inherit;flex-direction:inherit;-ms-flex-align:inherit;align-items:inherit;-ms-flex-pack:inherit;justify-content:inherit;width:100%;border:0;outline:none;background:transparent;text-decoration:none;cursor:pointer;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-user-drag:none}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){a.sc-ion-tab-button-ios{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}a.sc-ion-tab-button-ios:focus-visible{background:var(--background-focused)}\@media (any-hover:hover){a.sc-ion-tab-button-ios:hover{color:var(--color-selected)}}.tab-selected.sc-ion-tab-button-ios-h{color:var(--color-selected)}.tab-hidden.sc-ion-tab-button-ios-h{display:none!important}.tab-disabled.sc-ion-tab-button-ios-h{pointer-events:none;opacity:.4}.sc-ion-tab-button-ios-s > ion-icon, .sc-ion-tab-button-ios-s > ion-label{display:block;-ms-flex-item-align:center;align-self:center;max-width:100%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box}.sc-ion-tab-button-ios-s > ion-label{-ms-flex-order:0;order:0}.sc-ion-tab-button-ios-s > ion-icon{-ms-flex-order:-1;order:-1;height:1em}.sc-ion-tab-button-ios-h.tab-has-label-only .sc-ion-tab-button-ios-s > ion-label{white-space:normal}.sc-ion-tab-button-ios-s > ion-badge{-webkit-box-sizing:border-box;box-sizing:border-box;position:absolute;z-index:1}.tab-layout-icon-start.sc-ion-tab-button-ios-h{-ms-flex-direction:row;flex-direction:row}.tab-layout-icon-end.sc-ion-tab-button-ios-h{-ms-flex-direction:row-reverse;flex-direction:row-reverse}.tab-layout-icon-bottom.sc-ion-tab-button-ios-h{-ms-flex-direction:column-reverse;flex-direction:column-reverse}.sc-ion-tab-button-ios-h.tab-layout-icon-hide .sc-ion-tab-button-ios-s > ion-icon, .sc-ion-tab-button-ios-h.tab-layout-label-hide .sc-ion-tab-button-ios-s > ion-label{display:none}ion-ripple-effect.sc-ion-tab-button-ios{color:var(--ripple-color)}.sc-ion-tab-button-ios-h{--padding-top:0;--padding-end:2px;--padding-bottom:0;--padding-start:2px;max-width:240px;font-size:10px}.sc-ion-tab-button-ios-h.tab-has-label-only .sc-ion-tab-button-ios-s > ion-label{margin-left:0;margin-right:0;margin-top:2px;margin-bottom:2px;font-size:12px;font-size:14px;line-height:1.1}.sc-ion-tab-button-ios-s > ion-badge{padding-left:6px;padding-right:6px;padding-top:1px;padding-bottom:1px;left:calc(50% + 6px);top:4px;height:auto;font-size:12px;line-height:16px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-tab-button-ios-s > ion-badge{padding-left:unset;padding-right:unset;-webkit-padding-start:6px;padding-inline-start:6px;-webkit-padding-end:6px;padding-inline-end:6px}}.sc-ion-tab-button-ios-h[dir=rtl] .sc-ion-tab-button-ios-s > ion-badge, [dir=rtl] .sc-ion-tab-button-ios-h .sc-ion-tab-button-ios-s > ion-badge{right:calc(50% + 6px)}.sc-ion-tab-button-ios-s > ion-icon{margin-top:4px;font-size:30px}.sc-ion-tab-button-ios-s > ion-icon:before{vertical-align:top}.sc-ion-tab-button-ios-s > ion-label{margin-top:0;margin-bottom:1px;min-height:11px}.sc-ion-tab-button-ios-h.tab-layout-icon-end .sc-ion-tab-button-ios-s > ion-label, .sc-ion-tab-button-ios-h.tab-layout-icon-hide .sc-ion-tab-button-ios-s > ion-label, .sc-ion-tab-button-ios-h.tab-layout-icon-start .sc-ion-tab-button-ios-s > ion-label{margin-top:2px;margin-bottom:2px;font-size:14px;line-height:1.1}.sc-ion-tab-button-ios-h.tab-layout-icon-end .sc-ion-tab-button-ios-s > ion-icon, .sc-ion-tab-button-ios-h.tab-layout-icon-start .sc-ion-tab-button-ios-s > ion-icon{min-width:24px;height:26px;margin-top:2px;margin-bottom:1px;font-size:24px}.sc-ion-tab-button-ios-h.tab-layout-icon-bottom .sc-ion-tab-button-ios-s > ion-badge{left:calc(50% + 12px)}.sc-ion-tab-button-ios-h[dir=rtl].tab-layout-icon-bottom .sc-ion-tab-button-ios-s > ion-badge{right:calc(50% + 12px)}.sc-ion-tab-button-ios-h.tab-layout-icon-bottom .sc-ion-tab-button-ios-s > ion-icon{margin-top:0;margin-bottom:1px}.sc-ion-tab-button-ios-h.tab-layout-icon-bottom .sc-ion-tab-button-ios-s > ion-label{margin-top:4px}.sc-ion-tab-button-ios-h.tab-layout-icon-end .sc-ion-tab-button-ios-s > ion-badge, .sc-ion-tab-button-ios-h.tab-layout-icon-start .sc-ion-tab-button-ios-s > ion-badge{left:calc(50% + 35px);top:10px}.sc-ion-tab-button-ios-h[dir=rtl].tab-layout-icon-end .sc-ion-tab-button-ios-s > ion-badge, .sc-ion-tab-button-ios-h[dir=rtl].tab-layout-icon-start .sc-ion-tab-button-ios-s > ion-badge{right:calc(50% + 35px)}.sc-ion-tab-button-ios-h.tab-has-label-only .sc-ion-tab-button-ios-s > ion-badge, .sc-ion-tab-button-ios-h.tab-layout-icon-hide .sc-ion-tab-button-ios-s > ion-badge{left:calc(50% + 30px);top:10px}.sc-ion-tab-button-ios-h[dir=rtl].tab-has-label-only .sc-ion-tab-button-ios-s > ion-badge, .sc-ion-tab-button-ios-h[dir=rtl].tab-layout-icon-hide .sc-ion-tab-button-ios-s > ion-badge{right:calc(50% + 30px)}.sc-ion-tab-button-ios-h.tab-has-icon-only .sc-ion-tab-button-ios-s > ion-badge, .sc-ion-tab-button-ios-h.tab-layout-label-hide .sc-ion-tab-button-ios-s > ion-badge{top:10px}.sc-ion-tab-button-ios-h.tab-layout-label-hide .sc-ion-tab-button-ios-s > ion-icon{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}"; }
    static get styleMode() { return "ios"; }
}

export { Menu as AppDrawer, AppRoot, PageTabs, App$1 as IonApp, Avatar as IonAvatar, SplitPane as IonSplitPane, TabBar as IonTabBar, TabButton as IonTabButton };
