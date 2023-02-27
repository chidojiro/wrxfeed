'use strict';
(self['webpackChunkgravity_web'] = self['webpackChunkgravity_web'] || []).push([
  ['src_target_TargetCard_tsx-src_target_constants_ts-src_target_useTargets_ts'],
  {
    /***/ './src/main/atoms/TargetFeedName/index.tsx':
      /*!*************************************************!*\
  !*** ./src/main/atoms/TargetFeedName/index.tsx ***!
  \*************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var _main_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/main/utils */ './src/main/utils.ts',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );

        var TargetFeedName = function TargetFeedName(_ref) {
          var _ref$className = _ref.className,
            className = _ref$className === void 0 ? '' : _ref$className,
            target = _ref.target;
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
            'div',
            {
              className: (0, clsx__WEBPACK_IMPORTED_MODULE_0__['default'])(
                'group relative',
                className,
              ),
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
              'p',
              {
                className:
                  'text-base text-primary text-left font-bold line-clamp-1 overflow-ellipsis',
              },
              (0, _main_utils__WEBPACK_IMPORTED_MODULE_1__.getTargetName)(target),
            ),
          );
        };
        /* harmony default export */ __webpack_exports__['default'] = TargetFeedName;

        /***/
      },

    /***/ './src/target/TargetCard.tsx':
      /*!***********************************!*\
  !*** ./src/target/TargetCard.tsx ***!
  \***********************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ TargetCard: function () {
            return /* binding */ TargetCard;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_atoms_Loading__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/atoms/Loading */ './src/common/atoms/Loading/index.tsx');
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @/common/utils */ './src/common/utils/index.ts',
        );
        /* harmony import */ var _main_atoms_TargetFeedName__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! @/main/atoms/TargetFeedName */ './src/main/atoms/TargetFeedName/index.tsx',
          );
        /* harmony import */ var _main_atoms_TargetStatus__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! @/main/atoms/TargetStatus */ './src/main/atoms/TargetStatus/index.tsx',
          );
        /* harmony import */ var _main_molecules__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! @/main/molecules */ './src/main/molecules/index.ts',
        );
        /* harmony import */ var _main_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! @/main/utils */ './src/main/utils.ts',
        );
        /* harmony import */ var _routing_routes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          /*! @/routing/routes */ './src/routing/routes.tsx',
        );
        /* harmony import */ var _spending_SpendingChart__WEBPACK_IMPORTED_MODULE_9__ =
          __webpack_require__(
            /*! @/spending/SpendingChart */ './src/spending/SpendingChart/index.ts',
          );
        /* harmony import */ var _dwarvesf_react_hooks__WEBPACK_IMPORTED_MODULE_10__ =
          __webpack_require__(
            /*! @dwarvesf/react-hooks */ './node_modules/@dwarvesf/react-hooks/dist/index.js',
          );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_15__ =
          __webpack_require__(
            /*! react-router-dom */ './node_modules/react-router/esm/react-router.js',
          );
        /* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_16__ =
          __webpack_require__(
            /*! react-router-dom */ './node_modules/react-router-dom/esm/react-router-dom.js',
          );
        /* harmony import */ var _AddTargetModal__WEBPACK_IMPORTED_MODULE_13__ =
          __webpack_require__(/*! ./AddTargetModal */ './src/target/AddTargetModal/index.ts');
        /* harmony import */ var _apis__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
          /*! ./apis */ './src/target/apis.ts',
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

        var TargetCard = function TargetCard(_ref) {
          var _target$updater$fullN, _target$updater, _target$updater2, _target$spendings;
          var target = _ref.target,
            href = _ref.href,
            className = _ref.className,
            onUpdateSuccess = _ref.onUpdateSuccess,
            onDeleteSuccess = _ref.onDeleteSuccess,
            _ref$showColorfulHead = _ref.showColorfulHeading,
            showColorfulHeading = _ref$showColorfulHead === void 0 ? true : _ref$showColorfulHead,
            hidePropertyDropdowns = _ref.hidePropertyDropdowns,
            _ref$deletable = _ref.deletable,
            deletable = _ref$deletable === void 0 ? true : _ref$deletable,
            _ref$chartContainerCl = _ref.chartContainerClass,
            chartContainerClass =
              _ref$chartContainerCl === void 0 ? 'flex-1' : _ref$chartContainerCl;
          var history = (0, react_router_dom__WEBPACK_IMPORTED_MODULE_15__.useHistory)();
          var department = target === null || target === void 0 ? void 0 : target.department;
          var addTargetModalDisclosure = (0,
          _dwarvesf_react_hooks__WEBPACK_IMPORTED_MODULE_10__.useDisclosure)();
          var _getTargetPeriodsAmou = (0,
            _main_utils__WEBPACK_IMPORTED_MODULE_7__.getTargetPeriodsAmountTotal)(target),
            _getTargetPeriodsAmou2 = _getTargetPeriodsAmou.overallTarget,
            overallTarget = _getTargetPeriodsAmou2 === void 0 ? 0 : _getTargetPeriodsAmou2,
            _getTargetPeriodsAmou3 = _getTargetPeriodsAmou.currentSpend,
            currentSpend = _getTargetPeriodsAmou3 === void 0 ? 0 : _getTargetPeriodsAmou3,
            targetToDate = _getTargetPeriodsAmou.targetToDate;
          var _useHandler = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_2__.useHandler)(function (
              targetId,
            ) {
              return _apis__WEBPACK_IMPORTED_MODULE_14__.TargetApis['delete'](targetId);
            }),
            isDeletingTarget = _useHandler.isLoading,
            deleteTarget = _useHandler.handle;
          var goToTargetDetails = function goToTargetDetails() {
            var _target$feedItem;
            history.push(
              ''.concat(
                _routing_routes__WEBPACK_IMPORTED_MODULE_8__.Routes.Feed.path.replace(
                  ':id',
                  ''.concat(
                    target === null || target === void 0
                      ? void 0
                      : (_target$feedItem = target.feedItem) === null || _target$feedItem === void 0
                      ? void 0
                      : _target$feedItem.id,
                  ),
                ),
              ),
            );
          };
          var handleSetTarget = function handleSetTarget(e) {
            addTargetModalDisclosure.onOpen();
            e.stopPropagation();
          };
          var teamHeaderColor = react__WEBPACK_IMPORTED_MODULE_12__.useMemo(
            function () {
              var _department$name;
              return (0, _main_utils__WEBPACK_IMPORTED_MODULE_7__.getColorByText)(
                (_department$name =
                  department === null || department === void 0 ? void 0 : department.name) !==
                  null && _department$name !== void 0
                  ? _department$name
                  : '',
                department === null || department === void 0 ? void 0 : department.id,
                true,
              );
            },
            [
              department === null || department === void 0 ? void 0 : department.id,
              department === null || department === void 0 ? void 0 : department.name,
            ],
          );
          var handleDeleteClick = /*#__PURE__*/ (function () {
            var _ref2 = _asyncToGenerator(
              /*#__PURE__*/ _regeneratorRuntime().mark(function _callee() {
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1)
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        _context.next = 2;
                        return deleteTarget(
                          target === null || target === void 0 ? void 0 : target.id,
                        );
                      case 2:
                        onDeleteSuccess(target === null || target === void 0 ? void 0 : target.id);
                      case 3:
                      case 'end':
                        return _context.stop();
                    }
                }, _callee);
              }),
            );
            return function handleDeleteClick() {
              return _ref2.apply(this, arguments);
            };
          })();
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
            react__WEBPACK_IMPORTED_MODULE_12__.Fragment,
            null,
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
              _AddTargetModal__WEBPACK_IMPORTED_MODULE_13__.AddTargetModal,
              {
                open: addTargetModalDisclosure.isOpen,
                onClose: addTargetModalDisclosure.onClose,
                onCancel: addTargetModalDisclosure.onClose,
                target: target,
                departmentId: department === null || department === void 0 ? void 0 : department.id,
                onUpdateSuccess: onUpdateSuccess,
                onDeleteSuccess: onDeleteSuccess,
                hidePropertyDropdowns: hidePropertyDropdowns,
              },
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
              react_router_dom__WEBPACK_IMPORTED_MODULE_16__.Link,
              {
                to: href,
                key: target === null || target === void 0 ? void 0 : target.id,
                className: (0, clsx__WEBPACK_IMPORTED_MODULE_11__['default'])(
                  'bg-white relative w-full rounded-card shadow-card hover:shadow-target-hover flex flex-col border border-transparent hover:border-Accent-4',
                  className,
                ),
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
                'div',
                {
                  className: 'flex flex-1 flex-col pb-4 space-y-2 w-full',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement('div', {
                  style: {
                    background: showColorfulHeading ? teamHeaderColor : undefined,
                  },
                  className: 'h-2 rounded-t-card',
                }),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
                  'div',
                  {
                    className: 'flex flex-col px-6 space-y-4',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
                    'div',
                    {
                      className: 'flex flex-row space-x-1',
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
                      'div',
                      {
                        className: 'flex flex-col flex-1 h-12 max-h-12',
                      },
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
                        'div',
                        {
                          className: 'flex justify-between items-center h-6',
                        },
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
                          _main_atoms_TargetFeedName__WEBPACK_IMPORTED_MODULE_4__['default'],
                          {
                            target: target,
                          },
                        ),
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
                          _main_molecules__WEBPACK_IMPORTED_MODULE_6__.OptionsButton,
                          {
                            onViewClick: goToTargetDetails,
                            onEditClick: addTargetModalDisclosure.onOpen,
                            onDeleteClick:
                              !(target !== null && target !== void 0 && target.isPrimary) &&
                              deletable
                                ? handleDeleteClick
                                : undefined,
                            className: 'hidden md:block',
                          },
                        ),
                      ),
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
                        'div',
                        {
                          className: 'flex items-center gap-2 h-6 max-h-6 mt-2',
                        },
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
                          _common_components__WEBPACK_IMPORTED_MODULE_1__.Avatar,
                          {
                            size: 'sm',
                            fullName:
                              (_target$updater$fullN =
                                (_target$updater = target.updater) === null ||
                                _target$updater === void 0
                                  ? void 0
                                  : _target$updater.fullName) !== null &&
                              _target$updater$fullN !== void 0
                                ? _target$updater$fullN
                                : '',
                            src:
                              (_target$updater2 = target.updater) === null ||
                              _target$updater2 === void 0
                                ? void 0
                                : _target$updater2.avatar,
                            showTooltip: true,
                          },
                        ),
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
                          'span',
                          {
                            className: 'text-Gray-6 text-xs',
                          },
                          'Last edited ',
                          (0, _common_utils__WEBPACK_IMPORTED_MODULE_3__.distanceToNow)(
                            target === null || target === void 0 ? void 0 : target.updatedAt,
                          ),
                        ),
                      ),
                    ),
                  ),
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
                    'div',
                    {
                      className: 'flex flex-row justify-between',
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
                      'div',
                      {
                        className: 'flex flex-row space-x-2.5 text-Gray-6 min-h-9',
                      },
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
                        'div',
                        {
                          className: 'flex flex-col items-start min-w-[70px] pr-1.5',
                        },
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
                          'div',
                          {
                            className: 'flex items-center space-x-1',
                          },
                          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement('div', {
                            className: (0, clsx__WEBPACK_IMPORTED_MODULE_11__['default'])(
                              'w-1.5 h-1.5 rounded-full',
                              {
                                'bg-Accent-2': target.trackingStatus === 'NOT_SET',
                                'bg-red-1': target.trackingStatus === 'EXCEEDED',
                                'bg-yellow-2': target.trackingStatus === 'AT_RISK',
                                'bg-green-400': target.trackingStatus === 'ON_TRACK',
                              },
                            ),
                          }),
                          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
                            'p',
                            {
                              className: 'text-2xs',
                            },
                            'Spend',
                          ),
                        ),
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
                          'p',
                          {
                            className: 'text-sm text-primary font-semibold mt-1',
                          },
                          (0, _main_utils__WEBPACK_IMPORTED_MODULE_7__.getDisplayUsdAmount)(
                            currentSpend,
                          ),
                        ),
                      ),
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
                        'div',
                        {
                          className: (0, clsx__WEBPACK_IMPORTED_MODULE_11__['default'])(
                            'flex-col items-start min-w-[70px] pr-1.5 hidden',
                            'md:flex',
                          ),
                        },
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
                          'div',
                          {
                            className: 'flex items-center space-x-1',
                          },
                          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement('div', {
                            className: 'w-1.5 h-1.5 rounded-full bg-Gray-6',
                          }),
                          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
                            'p',
                            {
                              className: 'text-2xs',
                            },
                            'Target To Date',
                          ),
                        ),
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
                          'p',
                          {
                            className: 'text-sm text-primary font-semibold mt-1',
                          },
                          (0, _main_utils__WEBPACK_IMPORTED_MODULE_7__.getDisplayUsdAmount)(
                            targetToDate,
                          ),
                        ),
                      ),
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
                        'div',
                        {
                          className: 'flex flex-col items-start min-w-[70px] pr-1.5',
                        },
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
                          'div',
                          {
                            className: 'flex items-center space-x-1',
                          },
                          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement('div', {
                            className: 'w-1.5 h-1.5 rounded-full bg-Gray-6',
                          }),
                          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
                            'p',
                            {
                              className: 'text-2xs',
                            },
                            'Overall Target',
                          ),
                        ),
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
                          'p',
                          {
                            className: 'text-sm text-primary font-semibold mt-1',
                          },
                          (0, _main_utils__WEBPACK_IMPORTED_MODULE_7__.getDisplayUsdAmount)(
                            overallTarget,
                          ),
                        ),
                      ),
                    ),
                    !!target.trackingStatus &&
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
                        _main_atoms_TargetStatus__WEBPACK_IMPORTED_MODULE_5__['default'],
                        {
                          type: target.trackingStatus,
                          target: target,
                          onTargetSet: handleSetTarget,
                        },
                      ),
                  ),
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
                  'div',
                  {
                    className: (0, clsx__WEBPACK_IMPORTED_MODULE_11__['default'])(
                      'flex w-full flex-col px-5',
                      chartContainerClass,
                    ),
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
                    _spending_SpendingChart__WEBPACK_IMPORTED_MODULE_9__.SpendingChart,
                    {
                      data: {
                        periods: target.periods,
                        spendings:
                          (_target$spendings = target.spendings) !== null &&
                          _target$spendings !== void 0
                            ? _target$spendings
                            : [],
                        trackingStatus: target.trackingStatus,
                      },
                      className: 'overflow-hidden',
                    },
                  ),
                ),
              ),
              isDeletingTarget &&
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
                  'div',
                  {
                    className:
                      'absolute flex justify-center items-center inset-0 rounded-card bg-black/10',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_12__.createElement(
                    _common_atoms_Loading__WEBPACK_IMPORTED_MODULE_0__['default'],
                    {
                      color: 'Gray-3',
                    },
                  ),
                ),
            ),
          );
        };

        /***/
      },

    /***/ './src/target/constants.ts':
      /*!*********************************!*\
  !*** ./src/target/constants.ts ***!
  \*********************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ fallbackTarget: function () {
            return /* binding */ fallbackTarget;
          },
          /* harmony export */
        });
        /* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! ./types */ './src/target/types.ts',
        );

        var fallbackTarget = {
          id: 0,
          name: '',
          creator: {},
          updater: {},
          trackingStatus: _types__WEBPACK_IMPORTED_MODULE_0__.TargetStatusType.OnTrack,
          props: [],
          periods: [],
          spendings: [],
          department: {
            id: 0,
            name: '',
          },
          isPrimary: false,
        };

        /***/
      },

    /***/ './src/target/useTargets.ts':
      /*!**********************************!*\
  !*** ./src/target/useTargets.ts ***!
  \**********************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ useTargets: function () {
            return /* binding */ useTargets;
          },
          /* harmony export */
        });
        /* harmony import */ var _apis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! ./apis */ './src/target/apis.ts',
        );
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
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

        var useTargets = function useTargets(params) {
          return (0, _common_hooks__WEBPACK_IMPORTED_MODULE_1__.useFetcher)(
            ['target', params],
            function () {
              return _apis__WEBPACK_IMPORTED_MODULE_0__.TargetApis.getList(
                _objectSpread({}, params),
              );
            },
          );
        };

        /***/
      },
  },
]);
//# sourceMappingURL=src_target_TargetCard_tsx-src_target_constants_ts-src_target_useTargets_ts.bundle.js.map
