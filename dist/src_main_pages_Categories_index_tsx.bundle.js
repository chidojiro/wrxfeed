'use strict';
(self['webpackChunkgravity_web'] = self['webpackChunkgravity_web'] || []).push([
  ['src_main_pages_Categories_index_tsx'],
  {
    /***/ './src/assets/icons/solid/tick-small.svg':
      /*!***********************************************!*\
  !*** ./src/assets/icons/solid/tick-small.svg ***!
  \***********************************************/
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

        var SvgTickSmall = function SvgTickSmall(props) {
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
            'svg',
            _extends(
              {
                width: 15,
                height: 15,
                fill: 'none',
                xmlns: 'http://www.w3.org/2000/svg',
              },
              props,
            ),
            _path ||
              (_path = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement('path', {
                d: 'M4 7.5 7 10l4-5',
                stroke: 'currentColor',
                strokeWidth: 1.5,
              })),
          );
        };
        /* harmony default export */ __webpack_exports__['default'] = SvgTickSmall;

        /***/
      },

    /***/ './src/common/atoms/InfiniteScroller/index.tsx':
      /*!*****************************************************!*\
  !*** ./src/common/atoms/InfiniteScroller/index.tsx ***!
  \*****************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var _main_molecules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @/main/molecules */ './src/main/molecules/index.ts',
        );
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

        var DEFAULT_THRESHOLD = 150;
        var InfiniteScroller = function InfiniteScroller(_ref) {
          var children = _ref.children,
            style = _ref.style,
            className = _ref.className,
            threshold = _ref.threshold,
            onLoadMore = _ref.onLoadMore,
            isLoading = _ref.isLoading,
            LoadingComponent = _ref.LoadingComponent;
          var scrollerRef = (0, react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
          var endAnchorRef = (0, react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
          var _useState = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
            _useState2 = _slicedToArray(_useState, 2),
            showScrollTop = _useState2[0],
            setShowScrollTop = _useState2[1];
          var isEndReached = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_1__.useIntersection)(
            endAnchorRef.current || undefined,
            ''.concat(threshold, 'px'),
          ); // Trigger if 200px is visible from the element
          var loadMoreFunc =
            onLoadMore ||
            function () {
              return undefined;
            };
          var handleLoadMoreTrigger = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_1__.useDebounce)(
            loadMoreFunc,
          );
          var handleScroll = (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
            function () {
              var _scrollerRef$current$,
                _scrollerRef$current,
                _scrollerRef$current$2,
                _scrollerRef$current2,
                _scrollerRef$current$3,
                _scrollerRef$current3;
              var winScroll =
                (_scrollerRef$current$ =
                  (_scrollerRef$current = scrollerRef.current) === null ||
                  _scrollerRef$current === void 0
                    ? void 0
                    : _scrollerRef$current.scrollTop) !== null && _scrollerRef$current$ !== void 0
                  ? _scrollerRef$current$
                  : 0;
              var scrollDistance =
                ((_scrollerRef$current$2 =
                  (_scrollerRef$current2 = scrollerRef.current) === null ||
                  _scrollerRef$current2 === void 0
                    ? void 0
                    : _scrollerRef$current2.scrollHeight) !== null &&
                _scrollerRef$current$2 !== void 0
                  ? _scrollerRef$current$2
                  : 0) -
                ((_scrollerRef$current$3 =
                  (_scrollerRef$current3 = scrollerRef.current) === null ||
                  _scrollerRef$current3 === void 0
                    ? void 0
                    : _scrollerRef$current3.clientHeight) !== null &&
                _scrollerRef$current$3 !== void 0
                  ? _scrollerRef$current$3
                  : 0);
              if (
                scrollDistance - winScroll <
                (threshold !== null && threshold !== void 0 ? threshold : DEFAULT_THRESHOLD)
              ) {
                handleLoadMoreTrigger();
              }
              if (winScroll > window.innerHeight) {
                setShowScrollTop(true);
              } else {
                setShowScrollTop(false);
              }
            },
            [threshold, handleLoadMoreTrigger],
          );
          (0, _common_hooks__WEBPACK_IMPORTED_MODULE_1__.useEventListener)(
            'scroll',
            handleScroll,
            scrollerRef.current || window,
          );
          var scrollToTop = function scrollToTop() {
            var _scrollerRef$current4;
            (_scrollerRef$current4 = scrollerRef.current) === null ||
            _scrollerRef$current4 === void 0
              ? void 0
              : _scrollerRef$current4.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
          };
          (0, react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(
            function () {
              // In case list doesn't trigger scroller at the first load
              if (isEndReached) {
                handleLoadMoreTrigger();
              }
            },
            [handleLoadMoreTrigger, isEndReached],
          );
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
            react__WEBPACK_IMPORTED_MODULE_0__.Fragment,
            null,
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
              'div',
              {
                ref: scrollerRef,
                className: className,
                style: style,
              },
              children,
              isLoading && LoadingComponent,
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
              _main_molecules__WEBPACK_IMPORTED_MODULE_2__.ScrollToTopButton,
              {
                onClick: scrollToTop,
                visible: showScrollTop,
              },
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {
              ref: endAnchorRef,
              id: 'end-anchor',
              className: 'sr-only',
            }),
          );
        };
        InfiniteScroller.defaultProps = {
          threshold: DEFAULT_THRESHOLD,
          style: undefined,
          className: '',
          isLoading: false,
          LoadingComponent: null,
          onLoadMore: function onLoadMore() {
            return undefined;
          },
        };
        /* harmony default export */ __webpack_exports__['default'] = InfiniteScroller;

        /***/
      },

    /***/ './src/main/hooks/category.hook.ts':
      /*!*****************************************!*\
  !*** ./src/main/hooks/category.hook.ts ***!
  \*****************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ useCategory: function () {
            return /* binding */ useCategory;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var _category_apis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ./../../category/apis */ './src/category/apis.ts',
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

        function useCategory(_ref) {
          var params = _ref.params,
            _ref$concatNewData = _ref.concatNewData,
            concatNewData = _ref$concatNewData === void 0 ? true : _ref$concatNewData;
          var _React$useState = react__WEBPACK_IMPORTED_MODULE_1__.useState([]),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            categories = _React$useState2[0],
            setCategories = _React$useState2[1];
          var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_1__.useState(false),
            _React$useState4 = _slicedToArray(_React$useState3, 2),
            hasMore = _React$useState4[0],
            setHasMore = _React$useState4[1];
          var cleanData = function cleanData() {
            return setCategories([]);
          };
          var _useFetcher = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_0__.useFetcher)(
              ['category.hook', params],
              /*#__PURE__*/ _asyncToGenerator(
                /*#__PURE__*/ _regeneratorRuntime().mark(function _callee() {
                  var res;
                  return _regeneratorRuntime().wrap(function _callee$(_context) {
                    while (1)
                      switch ((_context.prev = _context.next)) {
                        case 0:
                          _context.next = 2;
                          return _category_apis__WEBPACK_IMPORTED_MODULE_2__.CategoryApis.getList(
                            params,
                          );
                        case 2:
                          res = _context.sent;
                          if (
                            concatNewData &&
                            params !== null &&
                            params !== void 0 &&
                            params.limit
                          ) {
                            setCategories(function (prevTrans) {
                              return [].concat(
                                _toConsumableArray(prevTrans),
                                _toConsumableArray(res),
                              );
                            });
                          } else {
                            setCategories(res);
                          }
                          setHasMore(!!res.length);
                        case 5:
                        case 'end':
                          return _context.stop();
                      }
                  }, _callee);
                }),
              ),
            ),
            isLoading = _useFetcher.isInitializing;
          return {
            categories: categories,
            hasMore: hasMore,
            isLoading: isLoading,
            cleanData: cleanData,
          };
        }

        /***/
      },

    /***/ './src/main/molecules/DirectoryItem/index.tsx':
      /*!****************************************************!*\
  !*** ./src/main/molecules/DirectoryItem/index.tsx ***!
  \****************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _main_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/main/utils */ './src/main/utils.ts',
        );
        /* harmony import */ var _subscription_ToggleFollowButton__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! @/subscription/ToggleFollowButton */ './src/subscription/ToggleFollowButton.tsx',
          );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );

        var DirectoryItem = function DirectoryItem(_ref) {
          var item = _ref.item,
            _ref$disableFollow = _ref.disableFollow,
            disableFollow = _ref$disableFollow === void 0 ? false : _ref$disableFollow,
            onClick = _ref.onClick,
            _ref$itemType = _ref.itemType,
            itemType = _ref$itemType === void 0 ? 'categories' : _ref$itemType;
          var avatarBgColor = react__WEBPACK_IMPORTED_MODULE_3__.useMemo(
            function () {
              var _item$name;
              return (0, _main_utils__WEBPACK_IMPORTED_MODULE_1__.getColorByText)(
                (_item$name = item === null || item === void 0 ? void 0 : item.name) !== null &&
                  _item$name !== void 0
                  ? _item$name
                  : '',
                item.id,
                true,
              );
            },
            [item],
          );
          var renderAvatarOrShortName = function renderAvatarOrShortName() {
            var shortName = (0, _main_utils__WEBPACK_IMPORTED_MODULE_1__.getNameAbbreviation)(
              item === null || item === void 0 ? void 0 : item.name,
            );
            var isHaveAvatar = item === null || item === void 0 ? void 0 : item.avatar;
            return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
              'div',
              {
                className: 'w-8 h-8 flex justify-center items-center rounded-full',
                style: {
                  background: avatarBgColor,
                },
              },
              isHaveAvatar &&
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                  _common_components__WEBPACK_IMPORTED_MODULE_0__.Avatar,
                  {
                    size: 'md',
                    fullName: item.name,
                    src: isHaveAvatar,
                  },
                ),
              !isHaveAvatar &&
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                  'p',
                  {
                    className: 'text-xs font-semibold text-white',
                  },
                  shortName,
                ),
            );
          };
          var renderIcon = function renderIcon() {
            if (disableFollow) return null;
            return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
              _subscription_ToggleFollowButton__WEBPACK_IMPORTED_MODULE_2__.ToggleFollowButton,
              {
                type: itemType,
                item: item,
              },
            );
          };
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
            'div',
            {
              'aria-hidden': 'true',
              className:
                'flex items-center space-x-2 cursor-pointer px-4 py-3 min-h-16 sm:px-6 bg-white border border-Gray-11 w-full text-sm text-Gray-3 shadow overflow-hidden sm:rounded-card',
              onClick: onClick,
            },
            renderAvatarOrShortName(),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
              'div',
              {
                className: 'flex flex-1',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                'p',
                {
                  className: 'text-sm font-medium text-Gray-1',
                },
                item === null || item === void 0 ? void 0 : item.name,
              ),
            ),
            renderIcon(),
          );
        };
        /* harmony default export */ __webpack_exports__['default'] = DirectoryItem;

        /***/
      },

    /***/ './src/main/organisms/CategoryList/index.tsx':
      /*!***************************************************!*\
  !*** ./src/main/organisms/CategoryList/index.tsx ***!
  \***************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var _common_atoms_InfiniteScroller__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! @/common/atoms/InfiniteScroller */ './src/common/atoms/InfiniteScroller/index.tsx',
          );
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var _main_atoms_ListLoading__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! @/main/atoms/ListLoading */ './src/main/atoms/ListLoading/index.tsx',
          );
        /* harmony import */ var _main_molecules_DirectoryItem__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! @/main/molecules/DirectoryItem */ './src/main/molecules/DirectoryItem/index.tsx',
          );
        /* harmony import */ var _mixpanel_useMixPanel__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(/*! @/mixpanel/useMixPanel */ './src/mixpanel/useMixPanel.ts');
        /* harmony import */ var _profile_useProfile__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(/*! @/profile/useProfile */ './src/profile/useProfile.ts');
        /* harmony import */ var mixpanel_browser__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! mixpanel-browser */ './node_modules/mixpanel-browser/dist/mixpanel.cjs.js',
          );
        /* harmony import */ var mixpanel_browser__WEBPACK_IMPORTED_MODULE_6___default =
          /*#__PURE__*/ __webpack_require__.n(mixpanel_browser__WEBPACK_IMPORTED_MODULE_6__);
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );

        var CategoryList = function CategoryList(_ref) {
          var categories = _ref.categories,
            isLoading = _ref.isLoading,
            onLoadMore = _ref.onLoadMore,
            onSelect = _ref.onSelect;
          var _useProfile = (0, _profile_useProfile__WEBPACK_IMPORTED_MODULE_5__.useProfile)(),
            profile = _useProfile.profile;
          (0, _common_hooks__WEBPACK_IMPORTED_MODULE_1__.useMountEffect)(function () {
            var _profile$company;
            mixpanel_browser__WEBPACK_IMPORTED_MODULE_6___default().track(
              'Category Directory View',
              {
                user_id: profile === null || profile === void 0 ? void 0 : profile.id,
                email: profile === null || profile === void 0 ? void 0 : profile.email,
                company_id:
                  profile === null || profile === void 0
                    ? void 0
                    : (_profile$company = profile.company) === null || _profile$company === void 0
                    ? void 0
                    : _profile$company.id,
              },
            );
            (0,
            _mixpanel_useMixPanel__WEBPACK_IMPORTED_MODULE_4__.identifyMixPanelUserProfile)(profile);
          });
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
            _common_atoms_InfiniteScroller__WEBPACK_IMPORTED_MODULE_0__['default'],
            {
              className: 'pb-14 mr-0.5 space-y-10 overflow-hidden',
              onLoadMore: onLoadMore,
              isLoading: isLoading,
              LoadingComponent: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                _main_atoms_ListLoading__WEBPACK_IMPORTED_MODULE_2__['default'],
                null,
              ),
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
              'ul',
              {
                className: 'flex flex-col space-y-6 px-0.5',
              },
              categories.map(function (category) {
                return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                  'li',
                  {
                    key: category.id,
                    className: '',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                    _main_molecules_DirectoryItem__WEBPACK_IMPORTED_MODULE_3__['default'],
                    {
                      item: category,
                      onClick: function onClick() {
                        return onSelect && onSelect(category);
                      },
                      itemType: 'categories',
                    },
                  ),
                );
              }),
            ),
          );
        };
        /* harmony default export */ __webpack_exports__['default'] = CategoryList;

        /***/
      },

    /***/ './src/main/pages/Categories/index.tsx':
      /*!*********************************************!*\
  !*** ./src/main/pages/Categories/index.tsx ***!
  \*********************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ CategoriesPage: function () {
            return /* binding */ CategoriesPage;
          },
          /* harmony export */
        });
        /* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/assets */ './src/assets/index.ts',
        );
        /* harmony import */ var _category_apis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/category/apis */ './src/category/apis.ts',
        );
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var _feed_Feeds__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @/feed/Feeds */ './src/feed/Feeds.tsx',
        );
        /* harmony import */ var _layout_MainLayout__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(/*! @/layout/MainLayout */ './src/layout/MainLayout.tsx');
        /* harmony import */ var _main_hooks_category_hook__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! @/main/hooks/category.hook */ './src/main/hooks/category.hook.ts',
          );
        /* harmony import */ var _main_organisms_CategoryList__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! @/main/organisms/CategoryList */ './src/main/organisms/CategoryList/index.tsx',
          );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(
            /*! react-router-dom */ './node_modules/react-router/esm/react-router.js',
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

        var LIMIT = 10;
        var INIT_PAGINATION = Object.freeze({
          offset: 0,
          limit: LIMIT,
        });
        var CategoriesPage = function CategoriesPage() {
          var history = (0, react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useHistory)();
          var _useParams = (0, react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useParams)(),
            catId = _useParams.id;
          var _React$useState = react__WEBPACK_IMPORTED_MODULE_7__.useState(INIT_PAGINATION),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            filter = _React$useState2[0],
            setFilter = _React$useState2[1];
          var _useCategory = (0,
            _main_hooks_category_hook__WEBPACK_IMPORTED_MODULE_5__.useCategory)({
              params: filter,
            }),
            categories = _useCategory.categories,
            hasMore = _useCategory.hasMore,
            isLoading = _useCategory.isLoading;
          var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_7__.useState(),
            _React$useState4 = _slicedToArray(_React$useState3, 2),
            category = _React$useState4[0],
            setCategory = _React$useState4[1];
          var handleLoadMoreCategories = react__WEBPACK_IMPORTED_MODULE_7__.useCallback(
            function () {
              if (!hasMore || isLoading) return;
              setFilter(function (prevFilter) {
                var _prevFilter$offset, _prevFilter$limit;
                return _objectSpread(
                  _objectSpread({}, prevFilter),
                  {},
                  {
                    offset:
                      ((_prevFilter$offset =
                        prevFilter === null || prevFilter === void 0
                          ? void 0
                          : prevFilter.offset) !== null && _prevFilter$offset !== void 0
                        ? _prevFilter$offset
                        : 0) +
                      ((_prevFilter$limit =
                        prevFilter === null || prevFilter === void 0
                          ? void 0
                          : prevFilter.limit) !== null && _prevFilter$limit !== void 0
                        ? _prevFilter$limit
                        : 0),
                  },
                );
              });
            },
            [hasMore, isLoading],
          );

          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          (0, _common_hooks__WEBPACK_IMPORTED_MODULE_2__.useFetcher)(
            catId && !isNaN(+catId) && ['category', catId],
            function () {
              return _category_apis__WEBPACK_IMPORTED_MODULE_1__.CategoryApis.get(+catId);
            },
            {
              onSuccess: setCategory,
            },
          );
          var handleCategorySelect = function handleCategorySelect(value) {
            setCategory(value);
            history.push({
              pathname: '/categories/'.concat(
                value === null || value === void 0 ? void 0 : value.id.toString(),
              ),
            });
          };
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
            _layout_MainLayout__WEBPACK_IMPORTED_MODULE_4__.MainLayout,
            null,
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
              'h1',
              {
                className: 'sr-only',
              },
              'Category list',
            ),
            catId &&
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                'div',
                {
                  className: 'flex items-center justify-between space-x-4 pb-8',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                  'div',
                  {
                    className: 'flex flex-1 items-center  space-x-4',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                    _assets__WEBPACK_IMPORTED_MODULE_0__.ChevronLeftIcon,
                    {
                      onClick: history.goBack,
                    },
                  ),
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                    'h1',
                    {
                      className: 'text-Gray-1 text-xl font-bold',
                    },
                    category === null || category === void 0 ? void 0 : category.name,
                  ),
                ),
              ),
            !catId &&
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                _main_organisms_CategoryList__WEBPACK_IMPORTED_MODULE_6__['default'],
                {
                  categories: categories,
                  isLoading: isLoading,
                  hasMore: hasMore,
                  onLoadMore: handleLoadMoreCategories,
                  onSelect: handleCategorySelect,
                },
              ),
            catId &&
              !isNaN(+catId) &&
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                _feed_Feeds__WEBPACK_IMPORTED_MODULE_3__.Feeds,
                {
                  categoryId: parseInt(catId, 10),
                },
              ),
          );
        };

        /***/
      },

    /***/ './src/subscription/ToggleFollowButton.tsx':
      /*!*************************************************!*\
  !*** ./src/subscription/ToggleFollowButton.tsx ***!
  \*************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ ToggleFollowButton: function () {
            return /* binding */ ToggleFollowButton;
          },
          /* harmony export */
        });
        /* harmony import */ var _assets_icons_solid_add_small_svg__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! @/assets/icons/solid/add-small.svg */ './src/assets/icons/solid/add-small.svg',
          );
        /* harmony import */ var _assets_icons_solid_tick_small_svg__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! @/assets/icons/solid/tick-small.svg */ './src/assets/icons/solid/tick-small.svg',
          );
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var _useSubscribe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! ./useSubscribe */ './src/subscription/useSubscribe.ts',
        );
        /* harmony import */ var _useSubscription__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(/*! ./useSubscription */ './src/subscription/useSubscription.ts');
        /* harmony import */ var _useUnsubscribe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! ./useUnsubscribe */ './src/subscription/useUnsubscribe.ts',
        );
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

        var ToggleFollowButton = function ToggleFollowButton(_ref) {
          var _ref$colorScheme = _ref.colorScheme,
            colorScheme = _ref$colorScheme === void 0 ? 'primary' : _ref$colorScheme,
            loading = _ref.loading,
            item = _ref.item,
            type = _ref.type;
          var baseProps = {
            pill: true,
            variant: 'outline',
            colorScheme: colorScheme,
            loading: loading,
          };
          var _useSubscription = (0,
            _useSubscription__WEBPACK_IMPORTED_MODULE_5__.useSubscription)(),
            isSubscribed = _useSubscription.isSubscribed;
          var _useSubscribe = (0, _useSubscribe__WEBPACK_IMPORTED_MODULE_4__.useSubscribe)(),
            subscribe = _useSubscribe.subscribe;
          var _useUnsubscribe = (0, _useUnsubscribe__WEBPACK_IMPORTED_MODULE_6__.useUnsubscribe)(),
            unsubscribe = _useUnsubscribe.unsubscribe;
          var subscribed = [item].flat().some(function (_ref2) {
            var id = _ref2.id;
            return isSubscribed(type, id);
          });
          return subscribed
            ? /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                _common_components__WEBPACK_IMPORTED_MODULE_2__.Button,
                _extends({}, baseProps, {
                  onClick: function onClick(e) {
                    e.stopPropagation();
                    unsubscribe(type, item);
                  },
                  iconLeft: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                    _assets_icons_solid_tick_small_svg__WEBPACK_IMPORTED_MODULE_1__.ReactComponent,
                    {
                      width: 16,
                      height: 16,
                      viewBox: '0 0 15 15',
                      className: 'stroke-current path-no-stroke',
                    },
                  ),
                }),
                'Following',
              )
            : /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                _common_components__WEBPACK_IMPORTED_MODULE_2__.Button,
                _extends({}, baseProps, {
                  onClick: function onClick(e) {
                    e.stopPropagation();
                    subscribe(type, item);
                  },
                  iconLeft: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                    _assets_icons_solid_add_small_svg__WEBPACK_IMPORTED_MODULE_0__.ReactComponent,
                    {
                      width: 16,
                      height: 16,
                      viewBox: '0 0 15 15',
                      className: 'stroke-current stroke-1 path-no-stroke',
                    },
                  ),
                }),
                'Follow',
              );
        };

        /***/
      },
  },
]);
//# sourceMappingURL=src_main_pages_Categories_index_tsx.bundle.js.map
