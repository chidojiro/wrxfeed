'use strict';
(self['webpackChunkgravity_web'] = self['webpackChunkgravity_web'] || []).push([
  ['src_auth_pages_OnboardPage_index_tsx'],
  {
    /***/ './src/assets/icons/solid/basics-add-small.svg':
      /*!*****************************************************!*\
  !*** ./src/assets/icons/solid/basics-add-small.svg ***!
  \*****************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        var _path;
        function _extends() {
          _extends = Object.assign
            ? Object.assign.bind()
            : function (target) {
                for (var i = 1; i < arguments.length; i++) {
                  var source = arguments[i];
                  for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                      target[key] = source[key];
                    }
                  }
                }
                return target;
              };
          return _extends.apply(this, arguments);
        }

        var SvgBasicsAddSmall = function SvgBasicsAddSmall(props) {
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
            'svg',
            _extends(
              {
                width: 21,
                height: 20,
                fill: 'none',
                xmlns: 'http://www.w3.org/2000/svg',
              },
              props,
            ),
            _path ||
              (_path = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement('path', {
                d: 'M10.5 5.333v9.334M5.833 10h9.334',
                stroke: '#273240',
                strokeWidth: 1.5,
              })),
          );
        };
        /* harmony default export */ __webpack_exports__['default'] = SvgBasicsAddSmall;

        /***/
      },

    /***/ './src/auth/molecules/DepartmentCell/index.tsx':
      /*!*****************************************************!*\
  !*** ./src/auth/molecules/DepartmentCell/index.tsx ***!
  \*****************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var _assets_icons_solid_basics_add_small_svg__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! @/assets/icons/solid/basics-add-small.svg */ './src/assets/icons/solid/basics-add-small.svg',
          );
        /* harmony import */ var _assets_icons_solid_basics_tick_small_svg__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! @/assets/icons/solid/basics-tick-small.svg */ './src/assets/icons/solid/basics-tick-small.svg',
          );
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _profile_useProfile__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! @/profile/useProfile */ './src/profile/useProfile.ts');
        /* harmony import */ var _team_apis__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @/team/apis */ './src/team/apis.ts',
        );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var _subscription_useSubscription__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(
            /*! @/subscription/useSubscription */ './src/subscription/useSubscription.ts',
          );
        /* harmony import */ var _subscription_useSubscribe__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(
            /*! @/subscription/useSubscribe */ './src/subscription/useSubscribe.ts',
          );
        /* harmony import */ var _subscription_useUnsubscribe__WEBPACK_IMPORTED_MODULE_9__ =
          __webpack_require__(
            /*! @/subscription/useUnsubscribe */ './src/subscription/useUnsubscribe.ts',
          );
        function _typeof(obj) {
          '@babel/helpers - typeof';
          return (
            (_typeof =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (obj) {
                    return typeof obj;
                  }
                : function (obj) {
                    return obj &&
                      'function' == typeof Symbol &&
                      obj.constructor === Symbol &&
                      obj !== Symbol.prototype
                      ? 'symbol'
                      : typeof obj;
                  }),
            _typeof(obj)
          );
        }
        function _toConsumableArray(arr) {
          return (
            _arrayWithoutHoles(arr) ||
            _iterableToArray(arr) ||
            _unsupportedIterableToArray(arr) ||
            _nonIterableSpread()
          );
        }
        function _nonIterableSpread() {
          throw new TypeError(
            'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
          );
        }
        function _iterableToArray(iter) {
          if (
            (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
            iter['@@iterator'] != null
          )
            return Array.from(iter);
        }
        function _arrayWithoutHoles(arr) {
          if (Array.isArray(arr)) return _arrayLikeToArray(arr);
        }
        function _regeneratorRuntime() {
          'use strict';
          /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime =
            function _regeneratorRuntime() {
              return exports;
            };
          var exports = {},
            Op = Object.prototype,
            hasOwn = Op.hasOwnProperty,
            defineProperty =
              Object.defineProperty ||
              function (obj, key, desc) {
                obj[key] = desc.value;
              },
            $Symbol = 'function' == typeof Symbol ? Symbol : {},
            iteratorSymbol = $Symbol.iterator || '@@iterator',
            asyncIteratorSymbol = $Symbol.asyncIterator || '@@asyncIterator',
            toStringTagSymbol = $Symbol.toStringTag || '@@toStringTag';
          function define(obj, key, value) {
            return (
              Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              obj[key]
            );
          }
          try {
            define({}, '');
          } catch (err) {
            define = function define(obj, key, value) {
              return (obj[key] = value);
            };
          }
          function wrap(innerFn, outerFn, self, tryLocsList) {
            var protoGenerator =
                outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
              generator = Object.create(protoGenerator.prototype),
              context = new Context(tryLocsList || []);
            return (
              defineProperty(generator, '_invoke', {
                value: makeInvokeMethod(innerFn, self, context),
              }),
              generator
            );
          }
          function tryCatch(fn, obj, arg) {
            try {
              return { type: 'normal', arg: fn.call(obj, arg) };
            } catch (err) {
              return { type: 'throw', arg: err };
            }
          }
          exports.wrap = wrap;
          var ContinueSentinel = {};
          function Generator() {}
          function GeneratorFunction() {}
          function GeneratorFunctionPrototype() {}
          var IteratorPrototype = {};
          define(IteratorPrototype, iteratorSymbol, function () {
            return this;
          });
          var getProto = Object.getPrototypeOf,
            NativeIteratorPrototype = getProto && getProto(getProto(values([])));
          NativeIteratorPrototype &&
            NativeIteratorPrototype !== Op &&
            hasOwn.call(NativeIteratorPrototype, iteratorSymbol) &&
            (IteratorPrototype = NativeIteratorPrototype);
          var Gp =
            (GeneratorFunctionPrototype.prototype =
            Generator.prototype =
              Object.create(IteratorPrototype));
          function defineIteratorMethods(prototype) {
            ['next', 'throw', 'return'].forEach(function (method) {
              define(prototype, method, function (arg) {
                return this._invoke(method, arg);
              });
            });
          }
          function AsyncIterator(generator, PromiseImpl) {
            function invoke(method, arg, resolve, reject) {
              var record = tryCatch(generator[method], generator, arg);
              if ('throw' !== record.type) {
                var result = record.arg,
                  value = result.value;
                return value && 'object' == _typeof(value) && hasOwn.call(value, '__await')
                  ? PromiseImpl.resolve(value.__await).then(
                      function (value) {
                        invoke('next', value, resolve, reject);
                      },
                      function (err) {
                        invoke('throw', err, resolve, reject);
                      },
                    )
                  : PromiseImpl.resolve(value).then(
                      function (unwrapped) {
                        (result.value = unwrapped), resolve(result);
                      },
                      function (error) {
                        return invoke('throw', error, resolve, reject);
                      },
                    );
              }
              reject(record.arg);
            }
            var previousPromise;
            defineProperty(this, '_invoke', {
              value: function value(method, arg) {
                function callInvokeWithMethodAndArg() {
                  return new PromiseImpl(function (resolve, reject) {
                    invoke(method, arg, resolve, reject);
                  });
                }
                return (previousPromise = previousPromise
                  ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg)
                  : callInvokeWithMethodAndArg());
              },
            });
          }
          function makeInvokeMethod(innerFn, self, context) {
            var state = 'suspendedStart';
            return function (method, arg) {
              if ('executing' === state) throw new Error('Generator is already running');
              if ('completed' === state) {
                if ('throw' === method) throw arg;
                return doneResult();
              }
              for (context.method = method, context.arg = arg; ; ) {
                var delegate = context.delegate;
                if (delegate) {
                  var delegateResult = maybeInvokeDelegate(delegate, context);
                  if (delegateResult) {
                    if (delegateResult === ContinueSentinel) continue;
                    return delegateResult;
                  }
                }
                if ('next' === context.method) context.sent = context._sent = context.arg;
                else if ('throw' === context.method) {
                  if ('suspendedStart' === state) throw ((state = 'completed'), context.arg);
                  context.dispatchException(context.arg);
                } else 'return' === context.method && context.abrupt('return', context.arg);
                state = 'executing';
                var record = tryCatch(innerFn, self, context);
                if ('normal' === record.type) {
                  if (
                    ((state = context.done ? 'completed' : 'suspendedYield'),
                    record.arg === ContinueSentinel)
                  )
                    continue;
                  return { value: record.arg, done: context.done };
                }
                'throw' === record.type &&
                  ((state = 'completed'), (context.method = 'throw'), (context.arg = record.arg));
              }
            };
          }
          function maybeInvokeDelegate(delegate, context) {
            var methodName = context.method,
              method = delegate.iterator[methodName];
            if (undefined === method)
              return (
                (context.delegate = null),
                ('throw' === methodName &&
                  delegate.iterator.return &&
                  ((context.method = 'return'),
                  (context.arg = undefined),
                  maybeInvokeDelegate(delegate, context),
                  'throw' === context.method)) ||
                  ('return' !== methodName &&
                    ((context.method = 'throw'),
                    (context.arg = new TypeError(
                      "The iterator does not provide a '" + methodName + "' method",
                    )))),
                ContinueSentinel
              );
            var record = tryCatch(method, delegate.iterator, context.arg);
            if ('throw' === record.type)
              return (
                (context.method = 'throw'),
                (context.arg = record.arg),
                (context.delegate = null),
                ContinueSentinel
              );
            var info = record.arg;
            return info
              ? info.done
                ? ((context[delegate.resultName] = info.value),
                  (context.next = delegate.nextLoc),
                  'return' !== context.method &&
                    ((context.method = 'next'), (context.arg = undefined)),
                  (context.delegate = null),
                  ContinueSentinel)
                : info
              : ((context.method = 'throw'),
                (context.arg = new TypeError('iterator result is not an object')),
                (context.delegate = null),
                ContinueSentinel);
          }
          function pushTryEntry(locs) {
            var entry = { tryLoc: locs[0] };
            1 in locs && (entry.catchLoc = locs[1]),
              2 in locs && ((entry.finallyLoc = locs[2]), (entry.afterLoc = locs[3])),
              this.tryEntries.push(entry);
          }
          function resetTryEntry(entry) {
            var record = entry.completion || {};
            (record.type = 'normal'), delete record.arg, (entry.completion = record);
          }
          function Context(tryLocsList) {
            (this.tryEntries = [{ tryLoc: 'root' }]),
              tryLocsList.forEach(pushTryEntry, this),
              this.reset(!0);
          }
          function values(iterable) {
            if (iterable) {
              var iteratorMethod = iterable[iteratorSymbol];
              if (iteratorMethod) return iteratorMethod.call(iterable);
              if ('function' == typeof iterable.next) return iterable;
              if (!isNaN(iterable.length)) {
                var i = -1,
                  next = function next() {
                    for (; ++i < iterable.length; )
                      if (hasOwn.call(iterable, i))
                        return (next.value = iterable[i]), (next.done = !1), next;
                    return (next.value = undefined), (next.done = !0), next;
                  };
                return (next.next = next);
              }
            }
            return { next: doneResult };
          }
          function doneResult() {
            return { value: undefined, done: !0 };
          }
          return (
            (GeneratorFunction.prototype = GeneratorFunctionPrototype),
            defineProperty(Gp, 'constructor', {
              value: GeneratorFunctionPrototype,
              configurable: !0,
            }),
            defineProperty(GeneratorFunctionPrototype, 'constructor', {
              value: GeneratorFunction,
              configurable: !0,
            }),
            (GeneratorFunction.displayName = define(
              GeneratorFunctionPrototype,
              toStringTagSymbol,
              'GeneratorFunction',
            )),
            (exports.isGeneratorFunction = function (genFun) {
              var ctor = 'function' == typeof genFun && genFun.constructor;
              return (
                !!ctor &&
                (ctor === GeneratorFunction ||
                  'GeneratorFunction' === (ctor.displayName || ctor.name))
              );
            }),
            (exports.mark = function (genFun) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype)
                  : ((genFun.__proto__ = GeneratorFunctionPrototype),
                    define(genFun, toStringTagSymbol, 'GeneratorFunction')),
                (genFun.prototype = Object.create(Gp)),
                genFun
              );
            }),
            (exports.awrap = function (arg) {
              return { __await: arg };
            }),
            defineIteratorMethods(AsyncIterator.prototype),
            define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
              return this;
            }),
            (exports.AsyncIterator = AsyncIterator),
            (exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
              void 0 === PromiseImpl && (PromiseImpl = Promise);
              var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
              return exports.isGeneratorFunction(outerFn)
                ? iter
                : iter.next().then(function (result) {
                    return result.done ? result.value : iter.next();
                  });
            }),
            defineIteratorMethods(Gp),
            define(Gp, toStringTagSymbol, 'Generator'),
            define(Gp, iteratorSymbol, function () {
              return this;
            }),
            define(Gp, 'toString', function () {
              return '[object Generator]';
            }),
            (exports.keys = function (val) {
              var object = Object(val),
                keys = [];
              for (var key in object) keys.push(key);
              return (
                keys.reverse(),
                function next() {
                  for (; keys.length; ) {
                    var key = keys.pop();
                    if (key in object) return (next.value = key), (next.done = !1), next;
                  }
                  return (next.done = !0), next;
                }
              );
            }),
            (exports.values = values),
            (Context.prototype = {
              constructor: Context,
              reset: function reset(skipTempReset) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = undefined),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = 'next'),
                  (this.arg = undefined),
                  this.tryEntries.forEach(resetTryEntry),
                  !skipTempReset)
                )
                  for (var name in this)
                    't' === name.charAt(0) &&
                      hasOwn.call(this, name) &&
                      !isNaN(+name.slice(1)) &&
                      (this[name] = undefined);
              },
              stop: function stop() {
                this.done = !0;
                var rootRecord = this.tryEntries[0].completion;
                if ('throw' === rootRecord.type) throw rootRecord.arg;
                return this.rval;
              },
              dispatchException: function dispatchException(exception) {
                if (this.done) throw exception;
                var context = this;
                function handle(loc, caught) {
                  return (
                    (record.type = 'throw'),
                    (record.arg = exception),
                    (context.next = loc),
                    caught && ((context.method = 'next'), (context.arg = undefined)),
                    !!caught
                  );
                }
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var entry = this.tryEntries[i],
                    record = entry.completion;
                  if ('root' === entry.tryLoc) return handle('end');
                  if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, 'catchLoc'),
                      hasFinally = hasOwn.call(entry, 'finallyLoc');
                    if (hasCatch && hasFinally) {
                      if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                      if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                      if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                    } else {
                      if (!hasFinally) throw new Error('try statement without catch or finally');
                      if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function abrupt(type, arg) {
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var entry = this.tryEntries[i];
                  if (
                    entry.tryLoc <= this.prev &&
                    hasOwn.call(entry, 'finallyLoc') &&
                    this.prev < entry.finallyLoc
                  ) {
                    var finallyEntry = entry;
                    break;
                  }
                }
                finallyEntry &&
                  ('break' === type || 'continue' === type) &&
                  finallyEntry.tryLoc <= arg &&
                  arg <= finallyEntry.finallyLoc &&
                  (finallyEntry = null);
                var record = finallyEntry ? finallyEntry.completion : {};
                return (
                  (record.type = type),
                  (record.arg = arg),
                  finallyEntry
                    ? ((this.method = 'next'),
                      (this.next = finallyEntry.finallyLoc),
                      ContinueSentinel)
                    : this.complete(record)
                );
              },
              complete: function complete(record, afterLoc) {
                if ('throw' === record.type) throw record.arg;
                return (
                  'break' === record.type || 'continue' === record.type
                    ? (this.next = record.arg)
                    : 'return' === record.type
                    ? ((this.rval = this.arg = record.arg),
                      (this.method = 'return'),
                      (this.next = 'end'))
                    : 'normal' === record.type && afterLoc && (this.next = afterLoc),
                  ContinueSentinel
                );
              },
              finish: function finish(finallyLoc) {
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var entry = this.tryEntries[i];
                  if (entry.finallyLoc === finallyLoc)
                    return (
                      this.complete(entry.completion, entry.afterLoc),
                      resetTryEntry(entry),
                      ContinueSentinel
                    );
                }
              },
              catch: function _catch(tryLoc) {
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var entry = this.tryEntries[i];
                  if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if ('throw' === record.type) {
                      var thrown = record.arg;
                      resetTryEntry(entry);
                    }
                    return thrown;
                  }
                }
                throw new Error('illegal catch attempt');
              },
              delegateYield: function delegateYield(iterable, resultName, nextLoc) {
                return (
                  (this.delegate = {
                    iterator: values(iterable),
                    resultName: resultName,
                    nextLoc: nextLoc,
                  }),
                  'next' === this.method && (this.arg = undefined),
                  ContinueSentinel
                );
              },
            }),
            exports
          );
        }
        function ownKeys(object, enumerableOnly) {
          var keys = Object.keys(object);
          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            enumerableOnly &&
              (symbols = symbols.filter(function (sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
              })),
              keys.push.apply(keys, symbols);
          }
          return keys;
        }
        function _objectSpread(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = null != arguments[i] ? arguments[i] : {};
            i % 2
              ? ownKeys(Object(source), !0).forEach(function (key) {
                  _defineProperty(target, key, source[key]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
              : ownKeys(Object(source)).forEach(function (key) {
                  Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
                });
          }
          return target;
        }
        function _defineProperty(obj, key, value) {
          key = _toPropertyKey(key);
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true,
            });
          } else {
            obj[key] = value;
          }
          return obj;
        }
        function _toPropertyKey(arg) {
          var key = _toPrimitive(arg, 'string');
          return _typeof(key) === 'symbol' ? key : String(key);
        }
        function _toPrimitive(input, hint) {
          if (_typeof(input) !== 'object' || input === null) return input;
          var prim = input[Symbol.toPrimitive];
          if (prim !== undefined) {
            var res = prim.call(input, hint || 'default');
            if (_typeof(res) !== 'object') return res;
            throw new TypeError('@@toPrimitive must return a primitive value.');
          }
          return (hint === 'string' ? String : Number)(input);
        }
        function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }
          if (info.done) {
            resolve(value);
          } else {
            Promise.resolve(value).then(_next, _throw);
          }
        }
        function _asyncToGenerator(fn) {
          return function () {
            var self = this,
              args = arguments;
            return new Promise(function (resolve, reject) {
              var gen = fn.apply(self, args);
              function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
              }
              function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
              }
              _next(undefined);
            });
          };
        }
        function _slicedToArray(arr, i) {
          return (
            _arrayWithHoles(arr) ||
            _iterableToArrayLimit(arr, i) ||
            _unsupportedIterableToArray(arr, i) ||
            _nonIterableRest()
          );
        }
        function _nonIterableRest() {
          throw new TypeError(
            'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
          );
        }
        function _unsupportedIterableToArray(o, minLen) {
          if (!o) return;
          if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          if (n === 'Object' && o.constructor) n = o.constructor.name;
          if (n === 'Map' || n === 'Set') return Array.from(o);
          if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
            return _arrayLikeToArray(o, minLen);
        }
        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length) len = arr.length;
          for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
          return arr2;
        }
        function _iterableToArrayLimit(arr, i) {
          var _i =
            null == arr
              ? null
              : ('undefined' != typeof Symbol && arr[Symbol.iterator]) || arr['@@iterator'];
          if (null != _i) {
            var _s,
              _e,
              _x,
              _r,
              _arr = [],
              _n = !0,
              _d = !1;
            try {
              if (((_x = (_i = _i.call(arr)).next), 0 === i)) {
                if (Object(_i) !== _i) return;
                _n = !1;
              } else
                for (
                  ;
                  !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i);
                  _n = !0
                );
            } catch (err) {
              (_d = !0), (_e = err);
            } finally {
              try {
                if (!_n && null != _i.return && ((_r = _i.return()), Object(_r) !== _r)) return;
              } finally {
                if (_d) throw _e;
              }
            }
            return _arr;
          }
        }
        function _arrayWithHoles(arr) {
          if (Array.isArray(arr)) return arr;
        }

        var LIMIT = 9999;
        var INIT_PAGINATION = Object.freeze({
          offset: 0,
          limit: LIMIT,
        });
        var DepartmentCell = function DepartmentCell(_ref) {
          var _ref$className = _ref.className,
            className = _ref$className === void 0 ? '' : _ref$className,
            dept = _ref.dept,
            _ref$onFollow = _ref.onFollow,
            onFollow =
              _ref$onFollow === void 0
                ? function () {
                    return undefined;
                  }
                : _ref$onFollow,
            _ref$onUnfollow = _ref.onUnfollow,
            onUnfollow =
              _ref$onUnfollow === void 0
                ? function () {
                    return undefined;
                  }
                : _ref$onUnfollow,
            _ref$enableUnfollowUs = _ref.enableUnfollowUserDept,
            enableUnfollowUserDept =
              _ref$enableUnfollowUs === void 0 ? true : _ref$enableUnfollowUs;
          var _useProfile = (0, _profile_useProfile__WEBPACK_IMPORTED_MODULE_3__.useProfile)(),
            profile = _useProfile.profile;
          var _useState = (0, react__WEBPACK_IMPORTED_MODULE_6__.useState)([]),
            _useState2 = _slicedToArray(_useState, 2),
            childs = _useState2[0],
            setChilds = _useState2[1];
          var _useSubscription = (0,
            _subscription_useSubscription__WEBPACK_IMPORTED_MODULE_7__.useSubscription)(),
            isSubscribed = _useSubscription.isSubscribed;
          var _useSubscribe = (0,
            _subscription_useSubscribe__WEBPACK_IMPORTED_MODULE_8__.useSubscribe)(),
            subscribe = _useSubscribe.subscribe;
          var _useUnsubscribe = (0,
            _subscription_useUnsubscribe__WEBPACK_IMPORTED_MODULE_9__.useUnsubscribe)(),
            unsubscribe = _useUnsubscribe.unsubscribe;
          var getChilds = (0, react__WEBPACK_IMPORTED_MODULE_6__.useCallback)(
            /*#__PURE__*/ _asyncToGenerator(
              /*#__PURE__*/ _regeneratorRuntime().mark(function _callee() {
                var deptChild;
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1)
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        _context.next = 2;
                        return _team_apis__WEBPACK_IMPORTED_MODULE_4__.DepartmentApis.getList(
                          _objectSpread(
                            {
                              parent: dept.id,
                            },
                            INIT_PAGINATION,
                          ),
                        );
                      case 2:
                        deptChild = _context.sent;
                        setChilds(deptChild);
                      case 4:
                      case 'end':
                        return _context.stop();
                    }
                }, _callee);
              }),
            ),
            [dept.id],
          );
          (0, react__WEBPACK_IMPORTED_MODULE_6__.useEffect)(
            function () {
              getChilds();
            },
            [getChilds],
          );
          var isFollowed = isSubscribed('departments', dept.id);
          var bgColor = isFollowed ? 'bg-Accent-2' : 'bg-white';
          var textColor = isFollowed ? 'text-white' : 'text-Gray-3';
          var onClickFollowDepartment = /*#__PURE__*/ (function () {
            var _ref3 = _asyncToGenerator(
              /*#__PURE__*/ _regeneratorRuntime().mark(function _callee2() {
                return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                  while (1)
                    switch ((_context2.prev = _context2.next)) {
                      case 0:
                        if (isFollowed) {
                          unsubscribe('departments', [dept].concat(_toConsumableArray(childs)));
                          if (onUnfollow) onUnfollow(dept);
                        } else {
                          subscribe('departments', [dept].concat(_toConsumableArray(childs)));
                          if (onFollow) onFollow(dept);
                        }
                      case 1:
                      case 'end':
                        return _context2.stop();
                    }
                }, _callee2);
              }),
            );
            return function onClickFollowDepartment() {
              return _ref3.apply(this, arguments);
            };
          })();
          var renderIcon = function renderIcon() {
            if (isFollowed) {
              return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                _assets_icons_solid_basics_tick_small_svg__WEBPACK_IMPORTED_MODULE_1__.ReactComponent,
                {
                  width: 20,
                  height: 20,
                  className: 'w-5 h-5 stroke-current path-no-stroke text-white object-cover',
                },
              );
            }
            return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_6__.createElement(
              _assets_icons_solid_basics_add_small_svg__WEBPACK_IMPORTED_MODULE_0__.ReactComponent,
              {
                width: 20,
                height: 20,
                className: 'w-5 h-5 stroke-current',
              },
            );
          };
          var isUserDepartment =
            (profile === null || profile === void 0 ? void 0 : profile.depId) ===
            (dept === null || dept === void 0 ? void 0 : dept.id);
          var hoverStyle = isFollowed ? 'hover:bg-Gray-2' : 'hover:bg-Accent-3';
          var renderFollowButton = function renderFollowButton() {
            if (!enableUnfollowUserDept && isUserDepartment) return null;
            return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_6__.createElement(
              _common_components__WEBPACK_IMPORTED_MODULE_2__.Button,
              {
                onClick: onClickFollowDepartment,
                className: (0, clsx__WEBPACK_IMPORTED_MODULE_5__['default'])(
                  'flex flex-row items-center px-3 py-2 space-x-1.5 rounded-full border border-transparent',
                  bgColor,
                  hoverStyle,
                ),
              },
              renderIcon(),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                'p',
                {
                  className: (0, clsx__WEBPACK_IMPORTED_MODULE_5__['default'])(
                    'text-sm',
                    textColor,
                  ),
                },
                isFollowed ? 'Following' : 'Follow',
              ),
            );
          };
          var paddingVertical = isUserDepartment ? 'py-6' : 'py-4';
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_6__.createElement(
            'div',
            {
              key: dept === null || dept === void 0 ? void 0 : dept.id,
              className: (0, clsx__WEBPACK_IMPORTED_MODULE_5__['default'])(
                'flex flex-row items-center justify-between border-Gray-11 border-b',
                paddingVertical,
                className,
              ),
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_6__.createElement(
              'p',
              {
                className: 'text-sm font-medium text-Gray-3',
              },
              dept === null || dept === void 0 ? void 0 : dept.name,
            ),
            renderFollowButton(),
          );
        };
        /* harmony default export */ __webpack_exports__['default'] = DepartmentCell;

        /***/
      },

    /***/ './src/auth/pages/OnboardPage/index.tsx':
      /*!**********************************************!*\
  !*** ./src/auth/pages/OnboardPage/index.tsx ***!
  \**********************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ OnboardPage: function () {
            return /* binding */ OnboardPage;
          },
          /* harmony export */
        });
        /* harmony import */ var _assets_icons_solid_question_circle_svg__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! @/assets/icons/solid/question-circle.svg */ './src/assets/icons/solid/question-circle.svg',
          );
        /* harmony import */ var _assets_icons_solid_sharp_space_dashboard_svg__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! @/assets/icons/solid/sharp-space-dashboard.svg */ './src/assets/icons/solid/sharp-space-dashboard.svg',
          );
        /* harmony import */ var _auth_molecules_DepartmentCell__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! @/auth/molecules/DepartmentCell */ './src/auth/molecules/DepartmentCell/index.tsx',
          );
        /* harmony import */ var _auth_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @/auth/utils */ './src/auth/utils.ts',
        );
        /* harmony import */ var _common_atoms_Loading__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(/*! @/common/atoms/Loading */ './src/common/atoms/Loading/index.tsx');
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! @/config */ './src/config.ts',
        );
        /* harmony import */ var _error_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          /*! @/error/utils */ './src/error/utils.ts',
        );
        /* harmony import */ var _layout_BlankLayout__WEBPACK_IMPORTED_MODULE_9__ =
          __webpack_require__(/*! @/layout/BlankLayout */ './src/layout/BlankLayout.tsx');
        /* harmony import */ var _layout_NavBarStatic__WEBPACK_IMPORTED_MODULE_10__ =
          __webpack_require__(/*! @/layout/NavBarStatic */ './src/layout/NavBarStatic.tsx');
        /* harmony import */ var _main_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
          /*! @/main/utils */ './src/main/utils.ts',
        );
        /* harmony import */ var _misc_useSearch__WEBPACK_IMPORTED_MODULE_12__ =
          __webpack_require__(/*! @/misc/useSearch */ './src/misc/useSearch.ts');
        /* harmony import */ var _profile_apis__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
          /*! @/profile/apis */ './src/profile/apis.ts',
        );
        /* harmony import */ var _profile_useProfile__WEBPACK_IMPORTED_MODULE_14__ =
          __webpack_require__(/*! @/profile/useProfile */ './src/profile/useProfile.ts');
        /* harmony import */ var _routing_routes__WEBPACK_IMPORTED_MODULE_15__ =
          __webpack_require__(/*! @/routing/routes */ './src/routing/routes.tsx');
        /* harmony import */ var _subscription_useSubscription__WEBPACK_IMPORTED_MODULE_16__ =
          __webpack_require__(
            /*! @/subscription/useSubscription */ './src/subscription/useSubscription.ts',
          );
        /* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
          /*! lodash-es */ './node_modules/lodash-es/cloneDeep.js',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
          /*! react-toastify */ './node_modules/react-toastify/dist/react-toastify.esm.js',
        );
        function _typeof(obj) {
          '@babel/helpers - typeof';
          return (
            (_typeof =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (obj) {
                    return typeof obj;
                  }
                : function (obj) {
                    return obj &&
                      'function' == typeof Symbol &&
                      obj.constructor === Symbol &&
                      obj !== Symbol.prototype
                      ? 'symbol'
                      : typeof obj;
                  }),
            _typeof(obj)
          );
        }
        function _regeneratorRuntime() {
          'use strict';
          /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime =
            function _regeneratorRuntime() {
              return exports;
            };
          var exports = {},
            Op = Object.prototype,
            hasOwn = Op.hasOwnProperty,
            defineProperty =
              Object.defineProperty ||
              function (obj, key, desc) {
                obj[key] = desc.value;
              },
            $Symbol = 'function' == typeof Symbol ? Symbol : {},
            iteratorSymbol = $Symbol.iterator || '@@iterator',
            asyncIteratorSymbol = $Symbol.asyncIterator || '@@asyncIterator',
            toStringTagSymbol = $Symbol.toStringTag || '@@toStringTag';
          function define(obj, key, value) {
            return (
              Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              obj[key]
            );
          }
          try {
            define({}, '');
          } catch (err) {
            define = function define(obj, key, value) {
              return (obj[key] = value);
            };
          }
          function wrap(innerFn, outerFn, self, tryLocsList) {
            var protoGenerator =
                outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
              generator = Object.create(protoGenerator.prototype),
              context = new Context(tryLocsList || []);
            return (
              defineProperty(generator, '_invoke', {
                value: makeInvokeMethod(innerFn, self, context),
              }),
              generator
            );
          }
          function tryCatch(fn, obj, arg) {
            try {
              return { type: 'normal', arg: fn.call(obj, arg) };
            } catch (err) {
              return { type: 'throw', arg: err };
            }
          }
          exports.wrap = wrap;
          var ContinueSentinel = {};
          function Generator() {}
          function GeneratorFunction() {}
          function GeneratorFunctionPrototype() {}
          var IteratorPrototype = {};
          define(IteratorPrototype, iteratorSymbol, function () {
            return this;
          });
          var getProto = Object.getPrototypeOf,
            NativeIteratorPrototype = getProto && getProto(getProto(values([])));
          NativeIteratorPrototype &&
            NativeIteratorPrototype !== Op &&
            hasOwn.call(NativeIteratorPrototype, iteratorSymbol) &&
            (IteratorPrototype = NativeIteratorPrototype);
          var Gp =
            (GeneratorFunctionPrototype.prototype =
            Generator.prototype =
              Object.create(IteratorPrototype));
          function defineIteratorMethods(prototype) {
            ['next', 'throw', 'return'].forEach(function (method) {
              define(prototype, method, function (arg) {
                return this._invoke(method, arg);
              });
            });
          }
          function AsyncIterator(generator, PromiseImpl) {
            function invoke(method, arg, resolve, reject) {
              var record = tryCatch(generator[method], generator, arg);
              if ('throw' !== record.type) {
                var result = record.arg,
                  value = result.value;
                return value && 'object' == _typeof(value) && hasOwn.call(value, '__await')
                  ? PromiseImpl.resolve(value.__await).then(
                      function (value) {
                        invoke('next', value, resolve, reject);
                      },
                      function (err) {
                        invoke('throw', err, resolve, reject);
                      },
                    )
                  : PromiseImpl.resolve(value).then(
                      function (unwrapped) {
                        (result.value = unwrapped), resolve(result);
                      },
                      function (error) {
                        return invoke('throw', error, resolve, reject);
                      },
                    );
              }
              reject(record.arg);
            }
            var previousPromise;
            defineProperty(this, '_invoke', {
              value: function value(method, arg) {
                function callInvokeWithMethodAndArg() {
                  return new PromiseImpl(function (resolve, reject) {
                    invoke(method, arg, resolve, reject);
                  });
                }
                return (previousPromise = previousPromise
                  ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg)
                  : callInvokeWithMethodAndArg());
              },
            });
          }
          function makeInvokeMethod(innerFn, self, context) {
            var state = 'suspendedStart';
            return function (method, arg) {
              if ('executing' === state) throw new Error('Generator is already running');
              if ('completed' === state) {
                if ('throw' === method) throw arg;
                return doneResult();
              }
              for (context.method = method, context.arg = arg; ; ) {
                var delegate = context.delegate;
                if (delegate) {
                  var delegateResult = maybeInvokeDelegate(delegate, context);
                  if (delegateResult) {
                    if (delegateResult === ContinueSentinel) continue;
                    return delegateResult;
                  }
                }
                if ('next' === context.method) context.sent = context._sent = context.arg;
                else if ('throw' === context.method) {
                  if ('suspendedStart' === state) throw ((state = 'completed'), context.arg);
                  context.dispatchException(context.arg);
                } else 'return' === context.method && context.abrupt('return', context.arg);
                state = 'executing';
                var record = tryCatch(innerFn, self, context);
                if ('normal' === record.type) {
                  if (
                    ((state = context.done ? 'completed' : 'suspendedYield'),
                    record.arg === ContinueSentinel)
                  )
                    continue;
                  return { value: record.arg, done: context.done };
                }
                'throw' === record.type &&
                  ((state = 'completed'), (context.method = 'throw'), (context.arg = record.arg));
              }
            };
          }
          function maybeInvokeDelegate(delegate, context) {
            var methodName = context.method,
              method = delegate.iterator[methodName];
            if (undefined === method)
              return (
                (context.delegate = null),
                ('throw' === methodName &&
                  delegate.iterator.return &&
                  ((context.method = 'return'),
                  (context.arg = undefined),
                  maybeInvokeDelegate(delegate, context),
                  'throw' === context.method)) ||
                  ('return' !== methodName &&
                    ((context.method = 'throw'),
                    (context.arg = new TypeError(
                      "The iterator does not provide a '" + methodName + "' method",
                    )))),
                ContinueSentinel
              );
            var record = tryCatch(method, delegate.iterator, context.arg);
            if ('throw' === record.type)
              return (
                (context.method = 'throw'),
                (context.arg = record.arg),
                (context.delegate = null),
                ContinueSentinel
              );
            var info = record.arg;
            return info
              ? info.done
                ? ((context[delegate.resultName] = info.value),
                  (context.next = delegate.nextLoc),
                  'return' !== context.method &&
                    ((context.method = 'next'), (context.arg = undefined)),
                  (context.delegate = null),
                  ContinueSentinel)
                : info
              : ((context.method = 'throw'),
                (context.arg = new TypeError('iterator result is not an object')),
                (context.delegate = null),
                ContinueSentinel);
          }
          function pushTryEntry(locs) {
            var entry = { tryLoc: locs[0] };
            1 in locs && (entry.catchLoc = locs[1]),
              2 in locs && ((entry.finallyLoc = locs[2]), (entry.afterLoc = locs[3])),
              this.tryEntries.push(entry);
          }
          function resetTryEntry(entry) {
            var record = entry.completion || {};
            (record.type = 'normal'), delete record.arg, (entry.completion = record);
          }
          function Context(tryLocsList) {
            (this.tryEntries = [{ tryLoc: 'root' }]),
              tryLocsList.forEach(pushTryEntry, this),
              this.reset(!0);
          }
          function values(iterable) {
            if (iterable) {
              var iteratorMethod = iterable[iteratorSymbol];
              if (iteratorMethod) return iteratorMethod.call(iterable);
              if ('function' == typeof iterable.next) return iterable;
              if (!isNaN(iterable.length)) {
                var i = -1,
                  next = function next() {
                    for (; ++i < iterable.length; )
                      if (hasOwn.call(iterable, i))
                        return (next.value = iterable[i]), (next.done = !1), next;
                    return (next.value = undefined), (next.done = !0), next;
                  };
                return (next.next = next);
              }
            }
            return { next: doneResult };
          }
          function doneResult() {
            return { value: undefined, done: !0 };
          }
          return (
            (GeneratorFunction.prototype = GeneratorFunctionPrototype),
            defineProperty(Gp, 'constructor', {
              value: GeneratorFunctionPrototype,
              configurable: !0,
            }),
            defineProperty(GeneratorFunctionPrototype, 'constructor', {
              value: GeneratorFunction,
              configurable: !0,
            }),
            (GeneratorFunction.displayName = define(
              GeneratorFunctionPrototype,
              toStringTagSymbol,
              'GeneratorFunction',
            )),
            (exports.isGeneratorFunction = function (genFun) {
              var ctor = 'function' == typeof genFun && genFun.constructor;
              return (
                !!ctor &&
                (ctor === GeneratorFunction ||
                  'GeneratorFunction' === (ctor.displayName || ctor.name))
              );
            }),
            (exports.mark = function (genFun) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype)
                  : ((genFun.__proto__ = GeneratorFunctionPrototype),
                    define(genFun, toStringTagSymbol, 'GeneratorFunction')),
                (genFun.prototype = Object.create(Gp)),
                genFun
              );
            }),
            (exports.awrap = function (arg) {
              return { __await: arg };
            }),
            defineIteratorMethods(AsyncIterator.prototype),
            define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
              return this;
            }),
            (exports.AsyncIterator = AsyncIterator),
            (exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
              void 0 === PromiseImpl && (PromiseImpl = Promise);
              var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
              return exports.isGeneratorFunction(outerFn)
                ? iter
                : iter.next().then(function (result) {
                    return result.done ? result.value : iter.next();
                  });
            }),
            defineIteratorMethods(Gp),
            define(Gp, toStringTagSymbol, 'Generator'),
            define(Gp, iteratorSymbol, function () {
              return this;
            }),
            define(Gp, 'toString', function () {
              return '[object Generator]';
            }),
            (exports.keys = function (val) {
              var object = Object(val),
                keys = [];
              for (var key in object) keys.push(key);
              return (
                keys.reverse(),
                function next() {
                  for (; keys.length; ) {
                    var key = keys.pop();
                    if (key in object) return (next.value = key), (next.done = !1), next;
                  }
                  return (next.done = !0), next;
                }
              );
            }),
            (exports.values = values),
            (Context.prototype = {
              constructor: Context,
              reset: function reset(skipTempReset) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = undefined),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = 'next'),
                  (this.arg = undefined),
                  this.tryEntries.forEach(resetTryEntry),
                  !skipTempReset)
                )
                  for (var name in this)
                    't' === name.charAt(0) &&
                      hasOwn.call(this, name) &&
                      !isNaN(+name.slice(1)) &&
                      (this[name] = undefined);
              },
              stop: function stop() {
                this.done = !0;
                var rootRecord = this.tryEntries[0].completion;
                if ('throw' === rootRecord.type) throw rootRecord.arg;
                return this.rval;
              },
              dispatchException: function dispatchException(exception) {
                if (this.done) throw exception;
                var context = this;
                function handle(loc, caught) {
                  return (
                    (record.type = 'throw'),
                    (record.arg = exception),
                    (context.next = loc),
                    caught && ((context.method = 'next'), (context.arg = undefined)),
                    !!caught
                  );
                }
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var entry = this.tryEntries[i],
                    record = entry.completion;
                  if ('root' === entry.tryLoc) return handle('end');
                  if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, 'catchLoc'),
                      hasFinally = hasOwn.call(entry, 'finallyLoc');
                    if (hasCatch && hasFinally) {
                      if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                      if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                      if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                    } else {
                      if (!hasFinally) throw new Error('try statement without catch or finally');
                      if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function abrupt(type, arg) {
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var entry = this.tryEntries[i];
                  if (
                    entry.tryLoc <= this.prev &&
                    hasOwn.call(entry, 'finallyLoc') &&
                    this.prev < entry.finallyLoc
                  ) {
                    var finallyEntry = entry;
                    break;
                  }
                }
                finallyEntry &&
                  ('break' === type || 'continue' === type) &&
                  finallyEntry.tryLoc <= arg &&
                  arg <= finallyEntry.finallyLoc &&
                  (finallyEntry = null);
                var record = finallyEntry ? finallyEntry.completion : {};
                return (
                  (record.type = type),
                  (record.arg = arg),
                  finallyEntry
                    ? ((this.method = 'next'),
                      (this.next = finallyEntry.finallyLoc),
                      ContinueSentinel)
                    : this.complete(record)
                );
              },
              complete: function complete(record, afterLoc) {
                if ('throw' === record.type) throw record.arg;
                return (
                  'break' === record.type || 'continue' === record.type
                    ? (this.next = record.arg)
                    : 'return' === record.type
                    ? ((this.rval = this.arg = record.arg),
                      (this.method = 'return'),
                      (this.next = 'end'))
                    : 'normal' === record.type && afterLoc && (this.next = afterLoc),
                  ContinueSentinel
                );
              },
              finish: function finish(finallyLoc) {
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var entry = this.tryEntries[i];
                  if (entry.finallyLoc === finallyLoc)
                    return (
                      this.complete(entry.completion, entry.afterLoc),
                      resetTryEntry(entry),
                      ContinueSentinel
                    );
                }
              },
              catch: function _catch(tryLoc) {
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var entry = this.tryEntries[i];
                  if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if ('throw' === record.type) {
                      var thrown = record.arg;
                      resetTryEntry(entry);
                    }
                    return thrown;
                  }
                }
                throw new Error('illegal catch attempt');
              },
              delegateYield: function delegateYield(iterable, resultName, nextLoc) {
                return (
                  (this.delegate = {
                    iterator: values(iterable),
                    resultName: resultName,
                    nextLoc: nextLoc,
                  }),
                  'next' === this.method && (this.arg = undefined),
                  ContinueSentinel
                );
              },
            }),
            exports
          );
        }
        function ownKeys(object, enumerableOnly) {
          var keys = Object.keys(object);
          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            enumerableOnly &&
              (symbols = symbols.filter(function (sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
              })),
              keys.push.apply(keys, symbols);
          }
          return keys;
        }
        function _objectSpread(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = null != arguments[i] ? arguments[i] : {};
            i % 2
              ? ownKeys(Object(source), !0).forEach(function (key) {
                  _defineProperty(target, key, source[key]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
              : ownKeys(Object(source)).forEach(function (key) {
                  Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
                });
          }
          return target;
        }
        function _defineProperty(obj, key, value) {
          key = _toPropertyKey(key);
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true,
            });
          } else {
            obj[key] = value;
          }
          return obj;
        }
        function _toPropertyKey(arg) {
          var key = _toPrimitive(arg, 'string');
          return _typeof(key) === 'symbol' ? key : String(key);
        }
        function _toPrimitive(input, hint) {
          if (_typeof(input) !== 'object' || input === null) return input;
          var prim = input[Symbol.toPrimitive];
          if (prim !== undefined) {
            var res = prim.call(input, hint || 'default');
            if (_typeof(res) !== 'object') return res;
            throw new TypeError('@@toPrimitive must return a primitive value.');
          }
          return (hint === 'string' ? String : Number)(input);
        }
        function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }
          if (info.done) {
            resolve(value);
          } else {
            Promise.resolve(value).then(_next, _throw);
          }
        }
        function _asyncToGenerator(fn) {
          return function () {
            var self = this,
              args = arguments;
            return new Promise(function (resolve, reject) {
              var gen = fn.apply(self, args);
              function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
              }
              function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
              }
              _next(undefined);
            });
          };
        }
        function _toConsumableArray(arr) {
          return (
            _arrayWithoutHoles(arr) ||
            _iterableToArray(arr) ||
            _unsupportedIterableToArray(arr) ||
            _nonIterableSpread()
          );
        }
        function _nonIterableSpread() {
          throw new TypeError(
            'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
          );
        }
        function _iterableToArray(iter) {
          if (
            (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
            iter['@@iterator'] != null
          )
            return Array.from(iter);
        }
        function _arrayWithoutHoles(arr) {
          if (Array.isArray(arr)) return _arrayLikeToArray(arr);
        }
        function _slicedToArray(arr, i) {
          return (
            _arrayWithHoles(arr) ||
            _iterableToArrayLimit(arr, i) ||
            _unsupportedIterableToArray(arr, i) ||
            _nonIterableRest()
          );
        }
        function _nonIterableRest() {
          throw new TypeError(
            'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
          );
        }
        function _unsupportedIterableToArray(o, minLen) {
          if (!o) return;
          if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          if (n === 'Object' && o.constructor) n = o.constructor.name;
          if (n === 'Map' || n === 'Set') return Array.from(o);
          if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
            return _arrayLikeToArray(o, minLen);
        }
        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length) len = arr.length;
          for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
          return arr2;
        }
        function _iterableToArrayLimit(arr, i) {
          var _i =
            null == arr
              ? null
              : ('undefined' != typeof Symbol && arr[Symbol.iterator]) || arr['@@iterator'];
          if (null != _i) {
            var _s,
              _e,
              _x,
              _r,
              _arr = [],
              _n = !0,
              _d = !1;
            try {
              if (((_x = (_i = _i.call(arr)).next), 0 === i)) {
                if (Object(_i) !== _i) return;
                _n = !1;
              } else
                for (
                  ;
                  !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i);
                  _n = !0
                );
            } catch (err) {
              (_d = !0), (_e = err);
            } finally {
              try {
                if (!_n && null != _i.return && ((_r = _i.return()), Object(_r) !== _r)) return;
              } finally {
                if (_d) throw _e;
              }
            }
            return _arr;
          }
        }
        function _arrayWithHoles(arr) {
          if (Array.isArray(arr)) return arr;
        }

        var OnboardPage = function OnboardPage() {
          var _query$get, _profile$company2;
          var _useProfile = (0, _profile_useProfile__WEBPACK_IMPORTED_MODULE_14__.useProfile)(),
            profile = _useProfile.profile;
          var _useNavUtils = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_6__.useNavUtils)(),
            redirect = _useNavUtils.redirect;
          var query = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_6__.useLegacyQuery)();
          var autoDirectString =
            (_query$get = query.get('autoDirect')) !== null && _query$get !== void 0
              ? _query$get
              : '1';
          var authDirect = parseInt(autoDirectString, 10) === 1;
          var _useSubscription = (0,
            _subscription_useSubscription__WEBPACK_IMPORTED_MODULE_16__.useSubscription)(),
            isSubscribed = _useSubscription.isSubscribed;
          var _useState = (0, react__WEBPACK_IMPORTED_MODULE_17__.useState)([]),
            _useState2 = _slicedToArray(_useState, 2),
            searchResults = _useState2[0],
            setSearchResults = _useState2[1];
          var _useState3 = (0, react__WEBPACK_IMPORTED_MODULE_17__.useState)([]),
            _useState4 = _slicedToArray(_useState3, 2),
            yourTeams = _useState4[0],
            setYourTeams = _useState4[1];
          var _useState5 = (0, react__WEBPACK_IMPORTED_MODULE_17__.useState)([]),
            _useState6 = _slicedToArray(_useState5, 2),
            suggestedTeams = _useState6[0],
            setSuggestedTeams = _useState6[1];
          var _useState7 = (0, react__WEBPACK_IMPORTED_MODULE_17__.useState)(''),
            _useState8 = _slicedToArray(_useState7, 2),
            keyword = _useState8[0],
            setKeyword = _useState8[1];
          var _useState9 = (0, react__WEBPACK_IMPORTED_MODULE_17__.useState)(false),
            _useState10 = _slicedToArray(_useState9, 2),
            isHandlingAction = _useState10[0],
            setHandlingAction = _useState10[1];
          var _useState11 = (0, react__WEBPACK_IMPORTED_MODULE_17__.useState)(false),
            _useState12 = _slicedToArray(_useState11, 2),
            ignoreEmpty = _useState12[0],
            setIgnoreEmpty = _useState12[1];
          var _useSearch = (0, _misc_useSearch__WEBPACK_IMPORTED_MODULE_12__.useSearch)({
              keyword: keyword,
              searchCate: false,
              searchVend: false,
              ignoreEmptyKeyword: ignoreEmpty,
            }),
            departments = _useSearch.results,
            isLoading = _useSearch.isLoading,
            clearSearchResults = _useSearch.clearSearchResults;
          (0, react__WEBPACK_IMPORTED_MODULE_17__.useEffect)(
            function () {
              setSearchResults(departments);
            },
            [departments],
          );
          (0, react__WEBPACK_IMPORTED_MODULE_17__.useEffect)(
            function () {
              if (
                _auth_utils__WEBPACK_IMPORTED_MODULE_3__.AuthUtils.getToken() &&
                profile !== null &&
                profile !== void 0 &&
                profile.lastLoginAt &&
                authDirect
              ) {
                redirect(_routing_routes__WEBPACK_IMPORTED_MODULE_15__.Routes.Dashboard.path);
              }
              // eslint-disable-next-line react-hooks/exhaustive-deps
            },
            [redirect],
          );
          (0, react__WEBPACK_IMPORTED_MODULE_17__.useEffect)(
            function () {
              if (
                suggestedTeams.length > 0 ||
                (keyword === null || keyword === void 0 ? void 0 : keyword.length) > 0
              )
                return;
              var teamNotFollowYet = [];
              var followed = [];
              departments.forEach(function (item) {
                var tempDepartment = {
                  id: item === null || item === void 0 ? void 0 : item.directoryId,
                  name: item === null || item === void 0 ? void 0 : item.title,
                };
                if (isSubscribed('departments', tempDepartment.id)) {
                  if (yourTeams.includes(tempDepartment)) return;
                  followed.push(tempDepartment);
                } else if (
                  (item === null || item === void 0 ? void 0 : item.id) !==
                  (profile === null || profile === void 0 ? void 0 : profile.depId)
                ) {
                  teamNotFollowYet.push(tempDepartment);
                }
              });
              setYourTeams(function (pre) {
                return [].concat(_toConsumableArray(pre), followed);
              });
              if (teamNotFollowYet.length > 4) {
                var random = (0, _main_utils__WEBPACK_IMPORTED_MODULE_11__.getMultiRandomInt)(
                  _config__WEBPACK_IMPORTED_MODULE_7__.TEAM_SUGGEST_RANDOM_NUMBER,
                  0,
                  teamNotFollowYet.length - 1,
                );
                var randomSuggest = [];
                random.forEach(function (item) {
                  return randomSuggest.push(teamNotFollowYet[item]);
                });
                setSuggestedTeams(randomSuggest);
              } else {
                setSuggestedTeams(teamNotFollowYet);
              }
              setIgnoreEmpty(true);
              // eslint-disable-next-line react-hooks/exhaustive-deps
            },
            [departments],
          );
          var _useHandler = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_6__.useHandler)(
              /*#__PURE__*/ _asyncToGenerator(
                /*#__PURE__*/ _regeneratorRuntime().mark(function _callee() {
                  var _profile$company;
                  var currentTime, updates;
                  return _regeneratorRuntime().wrap(function _callee$(_context) {
                    while (1)
                      switch ((_context.prev = _context.next)) {
                        case 0:
                          currentTime = new Date();
                          updates = _objectSpread(
                            _objectSpread({}, profile),
                            {},
                            {
                              companyName:
                                (profile === null || profile === void 0
                                  ? void 0
                                  : (_profile$company = profile.company) === null ||
                                    _profile$company === void 0
                                  ? void 0
                                  : _profile$company.name) || '',
                              title:
                                profile === null || profile === void 0 ? void 0 : profile.title,
                              bio:
                                (profile === null || profile === void 0 ? void 0 : profile.bio) ||
                                '',
                              lastLoginAt: currentTime.toISOString(),
                            },
                          );
                          _context.next = 4;
                          return _profile_apis__WEBPACK_IMPORTED_MODULE_13__.ProfileApis.update(
                            updates,
                          );
                        case 4:
                          redirect(
                            _routing_routes__WEBPACK_IMPORTED_MODULE_15__.Routes.Dashboard.path,
                          );
                        case 5:
                        case 'end':
                          return _context.stop();
                      }
                  }, _callee);
                }),
              ),
              {
                onError: function onError(error) {
                  if ((0, _error_utils__WEBPACK_IMPORTED_MODULE_8__.isApiError)(error)) {
                    var _error$details;
                    react_toastify__WEBPACK_IMPORTED_MODULE_18__.toast.error(
                      error === null || error === void 0
                        ? void 0
                        : (_error$details = error.details) === null || _error$details === void 0
                        ? void 0
                        : _error$details.message,
                    );
                    return false;
                  }
                },
              },
            ),
            handleIAmDoneClick = _useHandler.handle,
            isOnboarding = _useHandler.isLoading;
          var onSearchTeam = (0, react__WEBPACK_IMPORTED_MODULE_17__.useCallback)(
            function (event) {
              setKeyword(event.target.value.toString());
              clearSearchResults();
            },
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [setKeyword],
          );
          var debounceSearchRequest = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_6__.useDebounce)(
            onSearchTeam,
          );
          var onFollowedTeam = function onFollowedTeam(depts) {
            setHandlingAction(false);
            var newSuggested = (0, lodash_es__WEBPACK_IMPORTED_MODULE_19__['default'])(
              suggestedTeams,
            );
            setSuggestedTeams(
              newSuggested.filter(function (item) {
                return (
                  depts.findIndex(function (dept) {
                    return (
                      (dept === null || dept === void 0 ? void 0 : dept.id) ===
                      (item === null || item === void 0 ? void 0 : item.id)
                    );
                  }) === -1
                );
              }),
            );
            setYourTeams(function (pre) {
              return (0,
              _main_utils__WEBPACK_IMPORTED_MODULE_11__.getUniqueListBy)([].concat(_toConsumableArray(pre), _toConsumableArray(depts)), 'id');
            });
          };
          var onUnfollowedTeam = function onUnfollowedTeam(depts) {
            setHandlingAction(false);
            var newYourTeams = (0, lodash_es__WEBPACK_IMPORTED_MODULE_19__['default'])(yourTeams);
            setYourTeams(
              newYourTeams.filter(function (item) {
                return (
                  depts.findIndex(function (dept) {
                    return (
                      (dept === null || dept === void 0 ? void 0 : dept.id) ===
                      (item === null || item === void 0 ? void 0 : item.id)
                    );
                  }) === -1
                );
              }),
            );
            if (keyword.length === 0) {
              setSuggestedTeams(function (pre) {
                return (0,
                _main_utils__WEBPACK_IMPORTED_MODULE_11__.getUniqueListBy)([].concat(_toConsumableArray(pre), _toConsumableArray(depts)), 'id');
              });
            }
          };
          var renderSearchResults = function renderSearchResults() {
            if (keyword.trim().length === 0) {
              return null;
            }
            if (searchResults.length === 0) {
              return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                'div',
                {
                  className:
                    'flex mx-6 w-full flex-row items-center justify-center space-x-3 py-1 h-6 self-center',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                  _assets_icons_solid_question_circle_svg__WEBPACK_IMPORTED_MODULE_0__.ReactComponent,
                  {
                    width: 15,
                    height: 15,
                  },
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                  'p',
                  {
                    className: 'text-sm text-Gray-3',
                  },
                  'No teams found.',
                ),
              );
            }
            return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
              'div',
              {
                className: 'flex flex-col border-Gray-11 border-t',
              },
              searchResults.map(function (item) {
                return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                  _auth_molecules_DepartmentCell__WEBPACK_IMPORTED_MODULE_2__['default'],
                  {
                    key: item === null || item === void 0 ? void 0 : item.id,
                    dept: {
                      id: item === null || item === void 0 ? void 0 : item.directoryId,
                      name: item === null || item === void 0 ? void 0 : item.title,
                    },
                    onFollowedTeam: onFollowedTeam,
                    onFollowTeamFail: function onFollowTeamFail() {
                      return setHandlingAction(false);
                    },
                    onUnfollowedTeam: onUnfollowedTeam,
                    onUnfollowTeamFail: function onUnfollowTeamFail() {
                      return setHandlingAction(false);
                    },
                    onFollow: function onFollow() {
                      return setHandlingAction(true);
                    },
                    onUnfollow: function onUnfollow() {
                      return setHandlingAction(true);
                    },
                    enableAction: !isHandlingAction,
                  },
                );
              }),
            );
          };
          var renderYourTeam = function renderYourTeam() {
            if (yourTeams.length === 0 || keyword.length > 0) return null;
            return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
              'div',
              {
                className: 'flex flex-col',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                'div',
                {
                  className: 'flex flex-col py-4 border-Gray-11 border-b',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                  'p',
                  {
                    className: 'text-xs text-Gray-6 text-left',
                  },
                  'Your Team',
                ),
              ),
              yourTeams.map(function (item) {
                return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                  _auth_molecules_DepartmentCell__WEBPACK_IMPORTED_MODULE_2__['default'],
                  {
                    key: item === null || item === void 0 ? void 0 : item.id,
                    dept: item,
                    onFollowedTeam: onFollowedTeam,
                    onFollowTeamFail: function onFollowTeamFail() {
                      return setHandlingAction(false);
                    },
                    onUnfollowedTeam: onUnfollowedTeam,
                    onUnfollowTeamFail: function onUnfollowTeamFail() {
                      return setHandlingAction(false);
                    },
                    onFollow: function onFollow() {
                      return setHandlingAction(true);
                    },
                    onUnfollow: function onUnfollow() {
                      return setHandlingAction(true);
                    },
                    enableAction: !isHandlingAction,
                  },
                );
              }),
            );
          };
          var renderSuggestedTeam = function renderSuggestedTeam() {
            if (suggestedTeams.length === 0 || keyword.length > 0) return null;
            if (yourTeams.length >= 3) return null;
            return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
              'div',
              {
                className: 'flex flex-col',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                'div',
                {
                  className: 'flex flex-col py-4 border-Gray-11 border-b',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                  'p',
                  {
                    className: 'text-xs text-Gray-6 text-left',
                  },
                  'Suggested Teams',
                ),
              ),
              suggestedTeams.map(function (item) {
                return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                  _auth_molecules_DepartmentCell__WEBPACK_IMPORTED_MODULE_2__['default'],
                  {
                    key: item === null || item === void 0 ? void 0 : item.id,
                    dept: item,
                    onFollowedTeam: onFollowedTeam,
                    onFollowTeamFail: function onFollowTeamFail() {
                      return setHandlingAction(false);
                    },
                    onUnfollowedTeam: onUnfollowedTeam,
                    onUnfollowTeamFail: function onUnfollowTeamFail() {
                      return setHandlingAction(false);
                    },
                    onFollow: function onFollow() {
                      return setHandlingAction(true);
                    },
                    onUnfollow: function onUnfollow() {
                      return setHandlingAction(true);
                    },
                    enableAction: !isHandlingAction,
                  },
                );
              }),
            );
          };
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
            _layout_BlankLayout__WEBPACK_IMPORTED_MODULE_9__.BlankLayout,
            {
              className: 'flex flex-col p-0 m-0',
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
              _layout_NavBarStatic__WEBPACK_IMPORTED_MODULE_10__.NavBarStatic,
              {
                companyName:
                  (profile === null || profile === void 0
                    ? void 0
                    : (_profile$company2 = profile.company) === null || _profile$company2 === void 0
                    ? void 0
                    : _profile$company2.name) || 'Gravity Labs',
                companyStyle: 'ml-4 sm:ml-12 md:ml-24 lg:ml-40',
              },
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
              'div',
              {
                className: 'flex flex-1 flex-col pt-24 items-center bg-Gray-12 overflow-hidden',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                'div',
                {
                  className:
                    'h-auto w-full px-4 sm:px-0 sm:w-auto flex flex-1 flex-col items-center overflow-hidden',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                  'div',
                  {
                    className: 'mt-14 w-8 h-8 flex',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                    _assets_icons_solid_sharp_space_dashboard_svg__WEBPACK_IMPORTED_MODULE_1__.ReactComponent,
                    {
                      className: 'w-8 h-8',
                      width: 32,
                      height: 32,
                    },
                  ),
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                  'div',
                  {
                    className: 'text-center',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                    'h1',
                    {
                      className: 'text-primary text-2xl font-semibold mt-4',
                    },
                    'What team are you on?',
                  ),
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                    'p',
                    {
                      className: 'text-Gray-6 text-sm mt-1',
                    },
                    "This is how we'll determine what content is most applicable to you",
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement('br', null),
                    'You can always change this later.',
                  ),
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                  'div',
                  {
                    className: 'bg-white mt-6 flex',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement('input', {
                    className:
                      'w-full sm:w-[348px] md:w-[448px] text-primary h-9 text-sm text-center border border-Gray-11 focus:border-Accent-2 hover:border-Accent-2',
                    placeholder: 'My team is\u2026',
                    onChange: debounceSearchRequest,
                  }),
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                  'div',
                  {
                    className: 'w-full h-auto flex flex-1 relative flex-col mt-3 overflow-hidden',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                    'div',
                    {
                      className: 'w-full h-4 flex justify-center items-center mb-3',
                    },
                    !!isLoading &&
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                        _common_atoms_Loading__WEBPACK_IMPORTED_MODULE_4__['default'],
                        {
                          width: 12,
                          height: 12,
                        },
                      ),
                  ),
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                    'div',
                    {
                      className: 'flex flex-col w-full overflow-y-scroll',
                    },
                    renderSearchResults(),
                    renderYourTeam(),
                    renderSuggestedTeam(),
                  ),
                ),
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                'div',
                {
                  className: 'flex flex-row self-center mb-12 sm:mb-20 mt-4',
                },
                !!isOnboarding &&
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                    _common_atoms_Loading__WEBPACK_IMPORTED_MODULE_4__['default'],
                    {
                      width: 12,
                      height: 12,
                      className: 'mr-4',
                    },
                  ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                  _common_components__WEBPACK_IMPORTED_MODULE_5__.Button,
                  {
                    onClick: handleIAmDoneClick,
                    className: 'flex flex-col items-center',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                    'p',
                    {
                      className: 'text-Accent-2 text-sm',
                    },
                    "I'm Done —>",
                  ),
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement('div', {
                    className: 'h-px bg-Accent-2 w-full',
                  }),
                ),
              ),
            ),
          );
        };

        /***/
      },

    /***/ './src/layout/BlankLayout.tsx':
      /*!************************************!*\
  !*** ./src/layout/BlankLayout.tsx ***!
  \************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ BlankLayout: function () {
            return /* binding */ BlankLayout;
          },
          /* harmony export */
        });
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );

        var BlankLayout = function BlankLayout(_ref) {
          var children = _ref.children,
            className = _ref.className;
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
            'div',
            {
              className: (0, clsx__WEBPACK_IMPORTED_MODULE_1__['default'])(
                'fixed inset-0 rounded-md bg-white overflow-scroll',
                className,
              ),
            },
            children,
          );
        };

        /***/
      },
  },
]);
//# sourceMappingURL=src_auth_pages_OnboardPage_index_tsx.bundle.js.map
