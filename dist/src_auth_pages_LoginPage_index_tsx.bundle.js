'use strict';
(self['webpackChunkgravity_web'] = self['webpackChunkgravity_web'] || []).push([
  ['src_auth_pages_LoginPage_index_tsx'],
  {
    /***/ './src/assets/icons/google-logo.svg':
      /*!******************************************!*\
  !*** ./src/assets/icons/google-logo.svg ***!
  \******************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        var _path, _path2, _path3, _path4;
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

        var SvgGoogleLogo = function SvgGoogleLogo(props) {
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
            'svg',
            _extends(
              {
                width: 23,
                height: 24,
                fill: 'none',
                xmlns: 'http://www.w3.org/2000/svg',
              },
              props,
            ),
            _path ||
              (_path = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement('path', {
                fillRule: 'evenodd',
                clipRule: 'evenodd',
                d: 'M22.54 12.156c0-.815-.073-1.6-.21-2.352H11.5v4.449h6.19a5.29 5.29 0 0 1-2.296 3.47v2.886h3.717c2.174-2.002 3.429-4.95 3.429-8.453Z',
                fill: '#4285F4',
              })),
            _path2 ||
              (_path2 = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement('path', {
                fillRule: 'evenodd',
                clipRule: 'evenodd',
                d: 'M11.5 23.395c3.105 0 5.708-1.03 7.61-2.786l-3.716-2.886c-1.03.69-2.347 1.098-3.894 1.098-2.995 0-5.53-2.023-6.435-4.741H1.223v2.98A11.496 11.496 0 0 0 11.5 23.394Z',
                fill: '#34A853',
              })),
            _path3 ||
              (_path3 = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement('path', {
                fillRule: 'evenodd',
                clipRule: 'evenodd',
                d: 'M5.065 14.08a6.913 6.913 0 0 1-.36-2.185c0-.758.13-1.495.36-2.185V6.73H1.223A11.495 11.495 0 0 0 0 11.895c0 1.856.444 3.612 1.223 5.165l3.842-2.98Z',
                fill: '#FBBC05',
              })),
            _path4 ||
              (_path4 = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement('path', {
                fillRule: 'evenodd',
                clipRule: 'evenodd',
                d: 'M11.5 4.969c1.688 0 3.204.58 4.396 1.72l3.298-3.299C17.203 1.535 14.6.395 11.5.395A11.496 11.496 0 0 0 1.223 6.73l3.842 2.98c.904-2.718 3.44-4.741 6.435-4.741Z',
                fill: '#EA4335',
              })),
          );
        };
        /* harmony default export */ __webpack_exports__['default'] = SvgGoogleLogo;

        /***/
      },

    /***/ './src/auth/molecules/NotInvited/index.tsx':
      /*!*************************************************!*\
  !*** ./src/auth/molecules/NotInvited/index.tsx ***!
  \*************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );

        var NotInvited = function NotInvited(_ref) {
          var onBack = _ref.onBack;
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
            'div',
            {
              className:
                'flex flex-col justify-center items-center m-auto w-screen h-screen space-y-2',
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
              'h3',
              {
                className: 'text-4xl font-bold text-primary text-center',
              },
              'Account not found.',
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
              'p',
              {
                className: 'text-Gray-6 text-center whitespace-pre-wrap pb-4',
              },
              "Looks like you haven't been approved yet.\nPlease contact your admin to receive an invite.",
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
              _common_components__WEBPACK_IMPORTED_MODULE_0__.Button,
              {
                onClick: onBack,
                className:
                  'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-Gray-3 hover:bg-Gray-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-6',
                'aria-hidden': true,
              },
              'Back to Login',
            ),
          );
        };
        /* harmony default export */ __webpack_exports__['default'] = NotInvited;

        /***/
      },

    /***/ './src/auth/pages/LoginPage/index.tsx':
      /*!********************************************!*\
  !*** ./src/auth/pages/LoginPage/index.tsx ***!
  \********************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ LoginPage: function () {
            return /* binding */ LoginPage;
          },
          /* harmony export */
        });
        /* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/assets */ './src/assets/index.ts',
        );
        /* harmony import */ var _auth_apis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/auth/apis */ './src/auth/apis.ts',
        );
        /* harmony import */ var _auth_molecules_NotInvited__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! @/auth/molecules/NotInvited */ './src/auth/molecules/NotInvited/index.tsx',
          );
        /* harmony import */ var _auth_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @/auth/utils */ './src/auth/utils.ts',
        );
        /* harmony import */ var _common_atoms_SocialAuthButton__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! @/common/atoms/SocialAuthButton */ './src/common/atoms/SocialAuthButton/index.tsx',
          );
        /* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! @/config */ './src/config.ts',
        );
        /* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! @/env */ './src/env.ts',
        );
        /* harmony import */ var _layout_NotifyBanner__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(/*! @/layout/NotifyBanner */ './src/layout/NotifyBanner.tsx');
        /* harmony import */ var mixpanel_browser__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(
            /*! mixpanel-browser */ './node_modules/mixpanel-browser/dist/mixpanel.cjs.js',
          );
        /* harmony import */ var mixpanel_browser__WEBPACK_IMPORTED_MODULE_8___default =
          /*#__PURE__*/ __webpack_require__.n(mixpanel_browser__WEBPACK_IMPORTED_MODULE_8__);
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11__ =
          __webpack_require__(
            /*! react-router-dom */ './node_modules/react-router/esm/react-router.js',
          );
        /* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
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

        var LoginPage = function LoginPage() {
          var _location$state, _metadata$company;
          var history = (0, react_router_dom__WEBPACK_IMPORTED_MODULE_11__.useHistory)();
          var location = (0, react_router_dom__WEBPACK_IMPORTED_MODULE_11__.useLocation)();
          var _useState = (0, react__WEBPACK_IMPORTED_MODULE_9__.useState)(false),
            _useState2 = _slicedToArray(_useState, 2),
            notInvited = _useState2[0],
            setNotInvited = _useState2[1];
          // Variables
          var _ref =
              (_location$state = location.state) !== null && _location$state !== void 0
                ? _location$state
                : {},
            message = _ref.message,
            fromInvite = _ref.fromInvite,
            metadata = _ref.metadata;
          (0, react__WEBPACK_IMPORTED_MODULE_9__.useEffect)(
            function () {
              if (message) {
                _layout_NotifyBanner__WEBPACK_IMPORTED_MODULE_7__.NotifyBanner.info(message, {
                  timeout: 3000,
                  topOffset: 0,
                  backgroundColor: '#374151',
                });
              }
            },
            [message],
          );
          var handleResponseSuccess = /*#__PURE__*/ (function () {
            var _ref2 = _asyncToGenerator(
              /*#__PURE__*/ _regeneratorRuntime().mark(function _callee(response) {
                var access_token, userToken, googleProfile;
                return _regeneratorRuntime().wrap(
                  function _callee$(_context) {
                    while (1)
                      switch ((_context.prev = _context.next)) {
                        case 0:
                          if (!('access_token' in response)) {
                            _context.next = 16;
                            break;
                          }
                          _context.prev = 1;
                          // eslint-disable-next-line @typescript-eslint/naming-convention
                          access_token = response.access_token;
                          _context.next = 5;
                          return _auth_apis__WEBPACK_IMPORTED_MODULE_1__.AuthApis.signInWithGoogle(
                            access_token,
                          );
                        case 5:
                          userToken = _context.sent;
                          googleProfile = 'profileObj' in response ? response.profileObj : null;
                          _auth_utils__WEBPACK_IMPORTED_MODULE_3__.AuthUtils.setToken(
                            userToken.token,
                          );
                          mixpanel_browser__WEBPACK_IMPORTED_MODULE_8___default().track('Log In', {
                            user_id:
                              googleProfile === null || googleProfile === void 0
                                ? void 0
                                : googleProfile.googleId,
                            email:
                              googleProfile === null || googleProfile === void 0
                                ? void 0
                                : googleProfile.email,
                          });
                          history.push('/dashboard/all-company');
                          _context.next = 16;
                          break;
                        case 12:
                          _context.prev = 12;
                          _context.t0 = _context['catch'](1);
                          if (_env__WEBPACK_IMPORTED_MODULE_6__.BUILD_ENV === 'demo') {
                            react_toastify__WEBPACK_IMPORTED_MODULE_10__.toast.error(
                              'Gravity demos are currently private. Email graham@gravitylabs.co to get a walk through demo.',
                              {
                                className: 'w-[400px]',
                              },
                            );
                          }
                          throw _context.t0;
                        case 16:
                        case 'end':
                          return _context.stop();
                      }
                  },
                  _callee,
                  null,
                  [[1, 12]],
                );
              }),
            );
            return function handleResponseSuccess(_x2) {
              return _ref2.apply(this, arguments);
            };
          })();
          var client = window.google.accounts.oauth2.initTokenClient({
            client_id: _config__WEBPACK_IMPORTED_MODULE_5__.GOOGLE_CLIENT_ID,
            scope: _config__WEBPACK_IMPORTED_MODULE_5__.GOOGLE_SCOPES,
            callback: handleResponseSuccess,
          });
          return notInvited
            ? /*#__PURE__*/ React.createElement(
                _auth_molecules_NotInvited__WEBPACK_IMPORTED_MODULE_2__['default'],
                {
                  onBack: function onBack() {
                    return setNotInvited(false);
                  },
                },
              )
            : /*#__PURE__*/ React.createElement(
                'div',
                {
                  className:
                    'flex flex-col justify-center items-center min-h-screen my-auto space-y-10',
                },
                !fromInvite
                  ? /*#__PURE__*/ React.createElement(
                      'div',
                      {
                        className:
                          'flex flex-col justify-center items-center mb-3 space-y-8 max-w-xl',
                      },
                      /*#__PURE__*/ React.createElement(
                        _assets__WEBPACK_IMPORTED_MODULE_0__.GravityLogoImage,
                        null,
                      ),
                      /*#__PURE__*/ React.createElement(
                        'div',
                        {
                          className:
                            'flex flex-col items-center mx-4 xl:w-[921px] overflow-hidden rounded-2.5xl bg-white drop-shadow-login-card',
                        },
                        /*#__PURE__*/ React.createElement('div', {
                          className: 'h-4 w-full rounded-t-card',
                          style: {
                            background: _config__WEBPACK_IMPORTED_MODULE_5__.GRADIENT_DEFAULT,
                          },
                        }),
                        /*#__PURE__*/ React.createElement(
                          'div',
                          {
                            className:
                              'flex flex-col items-center pt-6 lg:pt-12 xl:pt-[68px] pb-8 lg:pb-14 xl:pb-[84px] space-y-4 sm:space-y-8 lg:space-y-10 xl:space-y-20 sm:px-6 px-8 lg:px-16 xl:px-40',
                          },
                          /*#__PURE__*/ React.createElement(
                            'div',
                            {
                              className: 'flex flex-col space-y-4 max-w-[563px]',
                            },
                            /*#__PURE__*/ React.createElement(
                              'h2',
                              {
                                className: 'text-4xl text-primary text-center font-bold',
                              },
                              'Join the '
                                .concat(
                                  (metadata === null || metadata === void 0
                                    ? void 0
                                    : (_metadata$company = metadata.company) === null ||
                                      _metadata$company === void 0
                                    ? void 0
                                    : _metadata$company.name) || '',
                                  ' team on Gravity.',
                                )
                                .replace(/\s+/g, ' '),
                            ),
                            /*#__PURE__*/ React.createElement(
                              'p',
                              {
                                className: 'text-base text-Gray-3 text-center tracking-tight',
                              },
                              'Gravity empowers teams at fast-moving companies to see,',
                              /*#__PURE__*/ React.createElement('br', null),
                              'track and target more efficient spending.',
                            ),
                          ),
                          /*#__PURE__*/ React.createElement(
                            _common_atoms_SocialAuthButton__WEBPACK_IMPORTED_MODULE_4__['default'],
                            {
                              provider:
                                _common_atoms_SocialAuthButton__WEBPACK_IMPORTED_MODULE_4__
                                  .AuthProvider.GOOGLE,
                              onClick: function onClick() {
                                return client.requestAccessToken();
                              },
                            },
                            'Sign in with Google',
                          ),
                        ),
                      ),
                    )
                  : /*#__PURE__*/ React.createElement(
                      React.Fragment,
                      null,
                      /*#__PURE__*/ React.createElement(
                        'h2',
                        {
                          className: 'text-4xl text-primary text-center font-bold mb-3',
                        },
                        'Join your team on Gravity.',
                      ),
                      /*#__PURE__*/ React.createElement(
                        _common_atoms_SocialAuthButton__WEBPACK_IMPORTED_MODULE_4__['default'],
                        {
                          provider:
                            _common_atoms_SocialAuthButton__WEBPACK_IMPORTED_MODULE_4__.AuthProvider
                              .GOOGLE,
                          onClick: function onClick() {
                            return client.requestAccessToken();
                          },
                        },
                        'Sign up with Google',
                      ),
                    ),
              );
        };

        /***/
      },

    /***/ './src/common/atoms/SocialAuthButton/index.tsx':
      /*!*****************************************************!*\
  !*** ./src/common/atoms/SocialAuthButton/index.tsx ***!
  \*****************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ AuthProvider: function () {
            return /* binding */ AuthProvider;
          },
          /* harmony export */
        });
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var _assets_icons_google_logo_svg__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! @/assets/icons/google-logo.svg */ './src/assets/icons/google-logo.svg',
          );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        var _excluded = ['children', 'provider', 'className', 'ref'];
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
        function _objectWithoutProperties(source, excluded) {
          if (source == null) return {};
          var target = _objectWithoutPropertiesLoose(source, excluded);
          var key, i;
          if (Object.getOwnPropertySymbols) {
            var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
            for (i = 0; i < sourceSymbolKeys.length; i++) {
              key = sourceSymbolKeys[i];
              if (excluded.indexOf(key) >= 0) continue;
              if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
              target[key] = source[key];
            }
          }
          return target;
        }
        function _objectWithoutPropertiesLoose(source, excluded) {
          if (source == null) return {};
          var target = {};
          var sourceKeys = Object.keys(source);
          var key, i;
          for (i = 0; i < sourceKeys.length; i++) {
            key = sourceKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            target[key] = source[key];
          }
          return target;
        }

        var AuthProvider;
        (function (AuthProvider) {
          AuthProvider['GOOGLE'] = 'GOOGLE';
        })(AuthProvider || (AuthProvider = {}));
        function getAuthProviderIcon(provider) {
          switch (provider) {
            case AuthProvider.GOOGLE: {
              return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
                _assets_icons_google_logo_svg__WEBPACK_IMPORTED_MODULE_1__.ReactComponent,
                {
                  width: 23,
                  height: 23,
                },
              );
            }
            default: {
              return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
                react__WEBPACK_IMPORTED_MODULE_0__.Fragment,
                null,
              );
            }
          }
        }
        var SocialAuthButton = function SocialAuthButton(_ref) {
          var children = _ref.children,
            _ref$provider = _ref.provider,
            provider = _ref$provider === void 0 ? AuthProvider.GOOGLE : _ref$provider,
            _ref$className = _ref.className,
            className = _ref$className === void 0 ? '' : _ref$className,
            ref = _ref.ref,
            rest = _objectWithoutProperties(_ref, _excluded);
          var socialIcon = getAuthProviderIcon(provider);
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
            _common_components__WEBPACK_IMPORTED_MODULE_3__.Button,
            _extends(
              {
                className: (0, clsx__WEBPACK_IMPORTED_MODULE_2__['default'])(
                  'flex justify-center items-center space-x-3 px-10 h-14 bg-primary text-base text-white rounded disabled:opacity-50',
                  className,
                ),
                ref: ref,
              },
              rest,
            ),
            socialIcon,
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement('div', null, children),
          );
        };
        /* harmony default export */ __webpack_exports__['default'] = SocialAuthButton;

        /***/
      },
  },
]);
//# sourceMappingURL=src_auth_pages_LoginPage_index_tsx.bundle.js.map
