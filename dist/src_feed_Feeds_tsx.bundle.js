'use strict';
(self['webpackChunkgravity_web'] = self['webpackChunkgravity_web'] || []).push([
  ['src_feed_Feeds_tsx'],
  {
    /***/ './src/feed/Feeds.tsx':
      /*!****************************!*\
  !*** ./src/feed/Feeds.tsx ***!
  \****************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ Feeds: function () {
            return /* binding */ Feeds;
          },
          /* harmony export */
        });
        /* harmony import */ var _category_apis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/category/apis */ './src/category/apis.ts',
        );
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var _layout_NotifyBanner__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! @/layout/NotifyBanner */ './src/layout/NotifyBanner.tsx');
        /* harmony import */ var _main_atoms_ListLoading__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! @/main/atoms/ListLoading */ './src/main/atoms/ListLoading/index.tsx',
          );
        /* harmony import */ var _main_entity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! @/main/entity */ './src/main/entity/index.ts',
        );
        /* harmony import */ var _target_apis__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! @/target/apis */ './src/target/apis.ts',
        );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11__ =
          __webpack_require__(
            /*! react-router-dom */ './node_modules/react-router-dom/esm/react-router-dom.js',
          );
        /* harmony import */ var _apis__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          /*! ./apis */ './src/feed/apis.ts',
        );
        /* harmony import */ var _FeedCard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
          /*! ./FeedCard */ './src/feed/FeedCard/index.ts',
        );
        /* harmony import */ var _LineItemDrawer__WEBPACK_IMPORTED_MODULE_10__ =
          __webpack_require__(/*! ./LineItemDrawer */ './src/feed/LineItemDrawer/index.ts');
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

        var Feeds = function Feeds(_ref) {
          var departmentId = _ref.departmentId,
            mode = _ref.mode,
            categoryId = _ref.categoryId,
            vendorId = _ref.vendorId,
            categoryRedirectHref = _ref.categoryRedirectHref;
          var _useLineItemDrawer = (0,
            _LineItemDrawer__WEBPACK_IMPORTED_MODULE_10__.useLineItemDrawer)(),
            isLineItemDrawerOpen = _useLineItemDrawer.isLineItemDrawerOpen,
            selectedLineItem = _useLineItemDrawer.selectedLineItem,
            closeLineItemDrawer = _useLineItemDrawer.closeLineItemDrawer,
            feedId = _useLineItemDrawer.feedId;
          var _useInfiniteData = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_2__.useInfiniteData)(
              function (paginationParams) {
                return _apis__WEBPACK_IMPORTED_MODULE_8__.FeedApis.getList(
                  _objectSpread(
                    _objectSpread({}, paginationParams),
                    {},
                    {
                      mode: mode,
                      departmentId: departmentId,
                      categoryId: categoryId,
                      vendorId: vendorId,
                    },
                  ),
                );
              },
            ),
            feeds = _useInfiniteData.data,
            loadMore = _useInfiniteData.loadMore,
            updateFeed = _useInfiniteData.update,
            deleteFeed = _useInfiniteData.delete;
          var _useHandler = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_2__.useHandler)(
              _category_apis__WEBPACK_IMPORTED_MODULE_0__.CategoryApis.update,
            ),
            updateCategory = _useHandler.handle;
          var _useHandler2 = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_2__.useHandler)(
              _target_apis__WEBPACK_IMPORTED_MODULE_6__.TargetApis.update,
            ),
            updateTarget = _useHandler2.handle;
          var _useHandler3 = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_2__.useHandler)(
              _target_apis__WEBPACK_IMPORTED_MODULE_6__.TargetApis['delete'],
            ),
            deleteTarget = _useHandler3.handle;
          var handleUpdateCategory = /*#__PURE__*/ (function () {
            var _ref2 = _asyncToGenerator(
              /*#__PURE__*/ _regeneratorRuntime().mark(function _callee(feed, category) {
                var res;
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1)
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        _context.next = 2;
                        return updateCategory(category.id, category);
                      case 2:
                        res = _context.sent;
                        updateFeed(
                          feed.id,
                          _objectSpread(
                            _objectSpread({}, feed),
                            {},
                            {
                              category: category,
                            },
                          ),
                        );
                        return _context.abrupt('return', res);
                      case 5:
                      case 'end':
                        return _context.stop();
                    }
                }, _callee);
              }),
            );
            return function handleUpdateCategory(_x, _x2) {
              return _ref2.apply(this, arguments);
            };
          })();
          var handleUpdateTarget = /*#__PURE__*/ (function () {
            var _ref3 = _asyncToGenerator(
              /*#__PURE__*/ _regeneratorRuntime().mark(function _callee2(feed, targetId, target) {
                var res;
                return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                  while (1)
                    switch ((_context2.prev = _context2.next)) {
                      case 0:
                        _context2.next = 2;
                        return updateTarget(targetId, target);
                      case 2:
                        res = _context2.sent;
                        updateFeed(
                          feed.id,
                          _objectSpread(
                            _objectSpread({}, feed),
                            {},
                            {
                              target: res,
                            },
                          ),
                        );
                        return _context2.abrupt('return', res);
                      case 5:
                      case 'end':
                        return _context2.stop();
                    }
                }, _callee2);
              }),
            );
            return function handleUpdateTarget(_x3, _x4, _x5) {
              return _ref3.apply(this, arguments);
            };
          })();
          var handleDeleteTarget = /*#__PURE__*/ (function () {
            var _ref4 = _asyncToGenerator(
              /*#__PURE__*/ _regeneratorRuntime().mark(function _callee3(feed, targetId) {
                var res;
                return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                  while (1)
                    switch ((_context3.prev = _context3.next)) {
                      case 0:
                        _context3.next = 2;
                        return deleteTarget(targetId);
                      case 2:
                        res = _context3.sent;
                        deleteFeed(feed.id);
                        return _context3.abrupt('return', res);
                      case 5:
                      case 'end':
                        return _context3.stop();
                    }
                }, _callee3);
              }),
            );
            return function handleDeleteTarget(_x6, _x7) {
              return _ref4.apply(this, arguments);
            };
          })();
          var handleInsightDeleteSuccess = function handleInsightDeleteSuccess(id) {
            deleteFeed(id);
          };
          var renderInfiniteLoader = function renderInfiniteLoader(_ref5) {
            var isExhausted = _ref5.isExhausted,
              anchorRef = _ref5.anchorRef;
            if (isExhausted && !feeds.length)
              return /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'pb-2 sm:pb-5 text-center',
                },
                /*#__PURE__*/ React.createElement(
                  'svg',
                  {
                    className: 'mx-auto h-8 w-8 text-gray-400',
                    fill: 'none',
                    viewBox: '0 0 24 24',
                    stroke: 'currentColor',
                    'aria-hidden': 'true',
                  },
                  /*#__PURE__*/ React.createElement('path', {
                    vectorEffect: 'non-scaling-stroke',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeWidth: 2,
                    d: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z',
                  }),
                ),
                /*#__PURE__*/ React.createElement(
                  'h3',
                  {
                    className: 'mt-2 text-sm text-Gray-3',
                  },
                  'No rollups now!',
                ),
              );
            if (isExhausted && !!feeds.length)
              return /*#__PURE__*/ React.createElement(
                'p',
                {
                  className: (0, clsx__WEBPACK_IMPORTED_MODULE_7__['default'])(
                    'text-base text-center text-Neutral-4',
                  ),
                },
                'Add to your feed by',
                /*#__PURE__*/ React.createElement(
                  react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Link,
                  {
                    to: '/departments',
                    className: 'ml-1 text-Gray-3 underline',
                  },
                  /*#__PURE__*/ React.createElement('u', null, 'following more teams'),
                ),
                /*#__PURE__*/ React.createElement(
                  'span',
                  {
                    role: 'img',
                    'aria-label': 'rocket',
                  },
                  ' ',
                  '\uD83D\uDE80',
                ),
              );
            return /*#__PURE__*/ React.createElement(
              _main_atoms_ListLoading__WEBPACK_IMPORTED_MODULE_4__['default'],
              {
                ref: anchorRef,
              },
            );
          };
          return /*#__PURE__*/ React.createElement(
            'div',
            null,
            /*#__PURE__*/ React.createElement(
              _LineItemDrawer__WEBPACK_IMPORTED_MODULE_10__.LineItemDrawer,
              {
                open: isLineItemDrawerOpen,
                onClose: closeLineItemDrawer,
                lineItem: selectedLineItem,
                feedId: feedId,
              },
            ),
            /*#__PURE__*/ React.createElement(
              'ul',
              {
                className: 'space-y-4',
              },
              feeds.map(function (feed) {
                return /*#__PURE__*/ React.createElement(
                  _FeedCard__WEBPACK_IMPORTED_MODULE_9__.FeedCard,
                  {
                    key: feed.id,
                    feed: feed,
                    categoryRedirectHref: categoryRedirectHref,
                    onHideCategoryConfirm: function onHideCategoryConfirm() {
                      handleUpdateCategory(
                        feed,
                        _objectSpread(
                          _objectSpread({}, feed.category),
                          {},
                          {
                            visibility: _main_entity__WEBPACK_IMPORTED_MODULE_5__.Visibility.HIDDEN,
                          },
                        ),
                      );
                      _layout_NotifyBanner__WEBPACK_IMPORTED_MODULE_3__.NotifyBanner.info(
                        'You have hidden this line item!',
                      );
                    },
                    onShowCategoryConfirm: function onShowCategoryConfirm() {
                      handleUpdateCategory(
                        feed,
                        _objectSpread(
                          _objectSpread({}, feed.category),
                          {},
                          {
                            visibility:
                              _main_entity__WEBPACK_IMPORTED_MODULE_5__.Visibility.VISIBLE,
                          },
                        ),
                      );
                      _layout_NotifyBanner__WEBPACK_IMPORTED_MODULE_3__.NotifyBanner.info(
                        'You have unhidden this line item!',
                      );
                    },
                    onDeleteTarget: function onDeleteTarget(id) {
                      return handleDeleteTarget(feed, id);
                    },
                    onUpdateTarget: function onUpdateTarget(targetId, target) {
                      return handleUpdateTarget(feed, targetId, target);
                    },
                    onInsightDeleteSuccess: function onInsightDeleteSuccess() {
                      return handleInsightDeleteSuccess(feed.id);
                    },
                  },
                );
              }),
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'mt-4',
              },
              /*#__PURE__*/ React.createElement(
                _common_components__WEBPACK_IMPORTED_MODULE_1__.InfiniteLoader,
                {
                  mode: 'ON_SIGHT',
                  itemsPerLoad: 5,
                  onLoad: loadMore,
                },
                renderInfiniteLoader,
              ),
            ),
          );
        };

        /***/
      },
  },
]);
//# sourceMappingURL=src_feed_Feeds_tsx.bundle.js.map
