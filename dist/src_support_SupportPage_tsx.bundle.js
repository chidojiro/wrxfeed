'use strict';
(self['webpackChunkgravity_web'] = self['webpackChunkgravity_web'] || []).push([
  ['src_support_SupportPage_tsx'],
  {
    /***/ './src/company/apis.ts':
      /*!*****************************!*\
  !*** ./src/company/apis.ts ***!
  \*****************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ CompanyApis: function () {
            return /* binding */ CompanyApis;
          },
          /* harmony export */
        });
        /* harmony import */ var _rest_apis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/rest/apis */ './src/rest/apis.ts',
        );

        var create = function create(payload) {
          return _rest_apis__WEBPACK_IMPORTED_MODULE_0__.RestApis.post('/user/companies', payload);
        };
        var CompanyApis = {
          create: create,
        };

        /***/
      },

    /***/ './src/support/SupportPage.tsx':
      /*!*************************************!*\
  !*** ./src/support/SupportPage.tsx ***!
  \*************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ SupportPage: function () {
            return /* binding */ SupportPage;
          },
          /* harmony export */
        });
        /* harmony import */ var _auth_apis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/auth/apis */ './src/auth/apis.ts',
        );
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var _company_apis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @/company/apis */ './src/company/apis.ts',
        );
        /* harmony import */ var _main_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @/main/hooks */ './src/main/hooks/index.ts',
        );
        /* harmony import */ var _dwarvesf_react_hooks__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! @dwarvesf/react-hooks */ './node_modules/@dwarvesf/react-hooks/dist/index.js',
          );
        /* harmony import */ var _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_9__ =
          __webpack_require__(
            /*! @heroicons/react/outline */ './node_modules/@heroicons/react/outline/esm/ClipboardCopyIcon.js',
          );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          /*! react-hook-form */ './node_modules/react-hook-form/dist/index.esm.mjs',
        );
        /* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
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
        function _objectDestructuringEmpty(obj) {
          if (obj == null) throw new TypeError('Cannot destructure ' + obj);
        }

        var SupportPage = function SupportPage(_ref) {
          _objectDestructuringEmpty(_ref);
          var _useInvite = (0, _main_hooks__WEBPACK_IMPORTED_MODULE_4__.useInvite)(),
            sendInvitation = _useInvite.sendInvitation,
            isSent = _useInvite.isSent,
            inviteLink = _useInvite.inviteLink;
          var _useState = (0, react__WEBPACK_IMPORTED_MODULE_6__.useState)(false),
            _useState2 = _slicedToArray(_useState, 2),
            isLoading = _useState2[0],
            setLoading = _useState2[1];
          var _useState3 = (0, react__WEBPACK_IMPORTED_MODULE_6__.useState)(''),
            _useState4 = _slicedToArray(_useState3, 2),
            email = _useState4[0],
            setEmail = _useState4[1];
          var _useState5 = (0, react__WEBPACK_IMPORTED_MODULE_6__.useState)(''),
            _useState6 = _slicedToArray(_useState5, 2),
            inviteEmail = _useState6[0],
            setInviteEmail = _useState6[1];
          var methods = (0, react_hook_form__WEBPACK_IMPORTED_MODULE_8__.useForm)({
            mode: 'onChange',
          });
          var reset = methods.reset,
            watch = methods.watch;
          var companyFormMethods = (0, react_hook_form__WEBPACK_IMPORTED_MODULE_8__.useForm)();
          var hasLoginError = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_2__.useDisclosure)();
          var handleLoginClick = /*#__PURE__*/ (function () {
            var _ref2 = _asyncToGenerator(
              /*#__PURE__*/ _regeneratorRuntime().mark(function _callee() {
                return _regeneratorRuntime().wrap(
                  function _callee$(_context) {
                    while (1)
                      switch ((_context.prev = _context.next)) {
                        case 0:
                          if (!email) {
                            _context.next = 10;
                            break;
                          }
                          _context.prev = 1;
                          _context.next = 4;
                          return _auth_apis__WEBPACK_IMPORTED_MODULE_0__.AuthApis['switch'](email);
                        case 4:
                          window.location = '/dashboard';
                          _context.next = 10;
                          break;
                        case 7:
                          _context.prev = 7;
                          _context.t0 = _context['catch'](1);
                          if (_context.t0.code === 404) {
                            hasLoginError.open();
                          }
                        case 10:
                        case 'end':
                          return _context.stop();
                      }
                  },
                  _callee,
                  null,
                  [[1, 7]],
                );
              }),
            );
            return function handleLoginClick() {
              return _ref2.apply(this, arguments);
            };
          })();
          var sendInvite = /*#__PURE__*/ (function () {
            var _ref3 = _asyncToGenerator(
              /*#__PURE__*/ _regeneratorRuntime().mark(function _callee2(email) {
                return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                  while (1)
                    switch ((_context2.prev = _context2.next)) {
                      case 0:
                        setLoading(true);
                        setInviteEmail(watch('invite-email'));
                        _context2.next = 4;
                        return sendInvitation({
                          email: email,
                        });
                      case 4:
                        reset();
                        setLoading(false);
                      case 6:
                      case 'end':
                        return _context2.stop();
                    }
                }, _callee2);
              }),
            );
            return function sendInvite(_x2) {
              return _ref3.apply(this, arguments);
            };
          })();
          var _useHandler = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_2__.useHandler)(
              function (data) {
                return _company_apis__WEBPACK_IMPORTED_MODULE_3__.CompanyApis.create(data);
              },
              {
                onError: function onError(error) {
                  var _Object$values$, _error$details$detail, _error$details, _details;
                  react_toastify__WEBPACK_IMPORTED_MODULE_7__.toast.error(
                    (_Object$values$ = Object.values(
                      (_error$details$detail =
                        error === null || error === void 0
                          ? void 0
                          : (_error$details = error.details) === null || _error$details === void 0
                          ? void 0
                          : _error$details.details) !== null && _error$details$detail !== void 0
                        ? _error$details$detail
                        : {},
                    )[0]) !== null && _Object$values$ !== void 0
                      ? _Object$values$
                      : (_details = error.details) === null || _details === void 0
                      ? void 0
                      : _details.message,
                  );
                  return false;
                },
              },
            ),
            createCompany = _useHandler.handle,
            createdCompany = _useHandler.data;
          var _useClipboard = (0, _dwarvesf_react_hooks__WEBPACK_IMPORTED_MODULE_5__.useClipboard)(
              createdCompany === null || createdCompany === void 0 ? void 0 : createdCompany.token,
            ),
            onCopy = _useClipboard.onCopy;
          var handleCopyToken = function handleCopyToken() {
            onCopy();
            react_toastify__WEBPACK_IMPORTED_MODULE_7__.toast.success(
              'Token was copied to clipboard!',
            );
          };
          return /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'bg-white min-h-screen',
            },
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'h-[56px] bg-primary flex items-center px-8',
              },
              /*#__PURE__*/ React.createElement(
                'h1',
                {
                  className: 'text-white font-bold text-lg',
                },
                'Gravity Labs Support & Invite Admin',
              ),
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'p-16',
              },
              /*#__PURE__*/ React.createElement(
                'h3',
                {
                  className: 'font-bold text-[28px]',
                },
                'Log In As',
              ),
              /*#__PURE__*/ React.createElement(
                'p',
                {
                  className: 'font-bold mt-6 text-sm',
                },
                'Enter email for the user you\u2019re logging in as:',
              ),
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'flex items-center gap-6 mt-8',
                },
                /*#__PURE__*/ React.createElement(
                  _common_components__WEBPACK_IMPORTED_MODULE_1__.Input,
                  {
                    placeholder: 'email required*',
                    type: 'email',
                    className: 'w-[300px] bg-[#EDEDED] rounded-lg',
                    value: email,
                    onChange: function onChange(e) {
                      hasLoginError.close();
                      setEmail(e.target.value);
                    },
                    error: hasLoginError.isOpen,
                  },
                ),
                /*#__PURE__*/ React.createElement(
                  _common_components__WEBPACK_IMPORTED_MODULE_1__.Button,
                  {
                    variant: 'solid',
                    colorScheme: 'accent',
                    className: 'rounded',
                    onClick: handleLoginClick,
                  },
                  'Log in',
                ),
              ),
              hasLoginError.isOpen &&
                /*#__PURE__*/ React.createElement(
                  'p',
                  {
                    className: 'text-danger text-sm mt-1',
                  },
                  'The account you are trying to switch to does not exist',
                ),
              /*#__PURE__*/ React.createElement(
                _common_components__WEBPACK_IMPORTED_MODULE_1__.Divider,
                {
                  className: 'my-12',
                },
              ),
              /*#__PURE__*/ React.createElement(
                'h3',
                {
                  className: 'font-bold text-[28px]',
                },
                'Invite',
              ),
              /*#__PURE__*/ React.createElement(
                'p',
                {
                  className: 'font-bold mt-6 text-sm',
                },
                'Enter email for the user you want to invite',
              ),
              /*#__PURE__*/ React.createElement(
                _common_components__WEBPACK_IMPORTED_MODULE_1__.Form,
                {
                  methods: methods,
                  onSubmit: function onSubmit() {
                    return sendInvite(watch('invite-email'));
                  },
                },
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'flex items-center gap-6 mt-8',
                  },
                  /*#__PURE__*/ React.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_1__.Form.Input,
                    {
                      className: 'w-[300px] bg-[#EDEDED] rounded-lg',
                      name: 'invite-email',
                      type: 'email',
                      required: true,
                      placeholder: 'email required*',
                    },
                  ),
                  /*#__PURE__*/ React.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_1__.Button,
                    {
                      type: 'submit',
                      variant: 'solid',
                      colorScheme: 'accent',
                      className: 'rounded',
                      disabled: isLoading,
                    },
                    isLoading ? 'Sending...' : 'Invite',
                  ),
                ),
              ),
              /*#__PURE__*/ React.createElement(
                _common_components__WEBPACK_IMPORTED_MODULE_1__.Divider,
                {
                  className: 'my-12',
                },
              ),
              /*#__PURE__*/ React.createElement(
                'h3',
                {
                  className: 'font-bold text-[28px]',
                },
                'New company',
              ),
              /*#__PURE__*/ React.createElement(
                _common_components__WEBPACK_IMPORTED_MODULE_1__.Form,
                {
                  methods: companyFormMethods,
                  onSubmit: /*#__PURE__*/ (function () {
                    var _ref4 = _asyncToGenerator(
                      /*#__PURE__*/ _regeneratorRuntime().mark(function _callee3(data) {
                        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                          while (1)
                            switch ((_context3.prev = _context3.next)) {
                              case 0:
                                _context3.next = 2;
                                return createCompany(
                                  _objectSpread(
                                    _objectSpread({}, data),
                                    {},
                                    {
                                      name: 'Admin',
                                    },
                                  ),
                                );
                              case 2:
                                react_toastify__WEBPACK_IMPORTED_MODULE_7__.toast.success(
                                  'Company was created!',
                                );
                              case 3:
                              case 'end':
                                return _context3.stop();
                            }
                        }, _callee3);
                      }),
                    );
                    return function (_x3) {
                      return _ref4.apply(this, arguments);
                    };
                  })(),
                },
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'flex gap-6',
                  },
                  /*#__PURE__*/ React.createElement(
                    'div',
                    {
                      className: 'flex flex-col gap-6 mt-8 w-[300px] flex-shrink-0',
                    },
                    /*#__PURE__*/ React.createElement(
                      _common_components__WEBPACK_IMPORTED_MODULE_1__.Form.Input,
                      {
                        className: 'bg-[#EDEDED] rounded-lg',
                        name: 'fullName',
                        required: true,
                        placeholder: 'Admin name',
                      },
                    ),
                    /*#__PURE__*/ React.createElement(
                      _common_components__WEBPACK_IMPORTED_MODULE_1__.Form.Input,
                      {
                        className: 'bg-[#EDEDED] rounded-lg',
                        name: 'adminEmail',
                        required: true,
                        type: 'email',
                        placeholder: 'Admin email',
                      },
                    ),
                    /*#__PURE__*/ React.createElement(
                      _common_components__WEBPACK_IMPORTED_MODULE_1__.Form.Input,
                      {
                        className: '=bg-[#EDEDED] rounded-lg',
                        name: 'domain',
                        required: true,
                        placeholder: 'Company domain',
                      },
                    ),
                    /*#__PURE__*/ React.createElement(
                      _common_components__WEBPACK_IMPORTED_MODULE_1__.Button,
                      {
                        type: 'submit',
                        variant: 'solid',
                        colorScheme: 'accent',
                        className: 'rounded',
                      },
                      'Create',
                    ),
                  ),
                  companyFormMethods.formState.isSubmitSuccessful &&
                    /*#__PURE__*/ React.createElement(
                      'div',
                      null,
                      /*#__PURE__*/ React.createElement(
                        'div',
                        {
                          className: 'flex items-center gap-2',
                        },
                        /*#__PURE__*/ React.createElement(
                          'p',
                          {
                            className: 'font-semibold',
                          },
                          'Token',
                        ),
                        /*#__PURE__*/ React.createElement(
                          _common_components__WEBPACK_IMPORTED_MODULE_1__.Tooltip,
                          {
                            trigger: /*#__PURE__*/ React.createElement(
                              _common_components__WEBPACK_IMPORTED_MODULE_1__.Button,
                              {
                                onClick: handleCopyToken,
                              },
                              /*#__PURE__*/ React.createElement(
                                _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_9__['default'],
                                {
                                  width: 16,
                                },
                              ),
                            ),
                          },
                          'Copy to clipboard',
                        ),
                      ),
                      /*#__PURE__*/ React.createElement(
                        'p',
                        {
                          className:
                            'p-4 rounded border border-gray-400 break-all max-w-[500px] mt-2 h-full',
                        },
                        createdCompany === null || createdCompany === void 0
                          ? void 0
                          : createdCompany.token,
                      ),
                    ),
                ),
              ),
              isSent &&
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'space-y-4 mt-[60px]',
                  },
                  /*#__PURE__*/ React.createElement(
                    'p',
                    {
                      className: 'text-lg leading-5 font-semibold',
                    },
                    'Invite was sent to: ',
                    inviteEmail,
                  ),
                  /*#__PURE__*/ React.createElement(
                    'p',
                    {
                      className: 'text-lg leading-5 font-semibold',
                    },
                    'Invite link: ',
                    inviteLink,
                  ),
                ),
            ),
          );
        };

        /***/
      },

    /***/ './node_modules/@heroicons/react/outline/esm/ClipboardCopyIcon.js':
      /*!************************************************************************!*\
  !*** ./node_modules/@heroicons/react/outline/esm/ClipboardCopyIcon.js ***!
  \************************************************************************/
      /***/ function (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__,
      ) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );

        function ClipboardCopyIcon(props, svgRef) {
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
            'svg',
            Object.assign(
              {
                xmlns: 'http://www.w3.org/2000/svg',
                fill: 'none',
                viewBox: '0 0 24 24',
                strokeWidth: 2,
                stroke: 'currentColor',
                'aria-hidden': 'true',
                ref: svgRef,
              },
              props,
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement('path', {
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              d: 'M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3',
            }),
          );
        }

        const ForwardRef = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(ClipboardCopyIcon);
        /* harmony default export */ __webpack_exports__['default'] = ForwardRef;

        /***/
      },
  },
]);
//# sourceMappingURL=src_support_SupportPage_tsx.bundle.js.map
