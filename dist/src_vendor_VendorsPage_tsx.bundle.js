'use strict';
(self['webpackChunkgravity_web'] = self['webpackChunkgravity_web'] || []).push([
  ['src_vendor_VendorsPage_tsx'],
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

    /***/ './src/vendor/VendorList.tsx':
      /*!***********************************!*\
  !*** ./src/vendor/VendorList.tsx ***!
  \***********************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ VendorList: function () {
            return /* binding */ VendorList;
          },
          /* harmony export */
        });
        /* harmony import */ var _main_molecules_DirectoryItem__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! @/main/molecules/DirectoryItem */ './src/main/molecules/DirectoryItem/index.tsx',
          );
        /* harmony import */ var mixpanel_browser__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! mixpanel-browser */ './node_modules/mixpanel-browser/dist/mixpanel.cjs.js',
          );
        /* harmony import */ var mixpanel_browser__WEBPACK_IMPORTED_MODULE_1___default =
          /*#__PURE__*/ __webpack_require__.n(mixpanel_browser__WEBPACK_IMPORTED_MODULE_1__);
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var _profile_useProfile__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! @/profile/useProfile */ './src/profile/useProfile.ts');
        /* harmony import */ var _mixpanel_useMixPanel__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(/*! @/mixpanel/useMixPanel */ './src/mixpanel/useMixPanel.ts');
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );

        var VendorList = function VendorList(_ref) {
          var vendors = _ref.vendors,
            onVendorClick = _ref.onVendorClick;
          var _useProfile = (0, _profile_useProfile__WEBPACK_IMPORTED_MODULE_3__.useProfile)(),
            profile = _useProfile.profile;
          (0, _common_hooks__WEBPACK_IMPORTED_MODULE_5__.useMountEffect)(function () {
            var _profile$company;
            mixpanel_browser__WEBPACK_IMPORTED_MODULE_1___default().track('Vendor Directory View', {
              user_id: profile === null || profile === void 0 ? void 0 : profile.id,
              email: profile === null || profile === void 0 ? void 0 : profile.email,
              company_id:
                profile === null || profile === void 0
                  ? void 0
                  : (_profile$company = profile.company) === null || _profile$company === void 0
                  ? void 0
                  : _profile$company.id,
            });
            (0,
            _mixpanel_useMixPanel__WEBPACK_IMPORTED_MODULE_4__.identifyMixPanelUserProfile)(profile);
          });
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
            'ul',
            {
              className: 'flex flex-col space-y-6 px-0.5',
            },
            vendors.map(function (vendor) {
              return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
                'li',
                {
                  key: vendor.id,
                  className: '',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
                  _main_molecules_DirectoryItem__WEBPACK_IMPORTED_MODULE_0__['default'],
                  {
                    item: vendor,
                    onClick: function onClick() {
                      return onVendorClick === null || onVendorClick === void 0
                        ? void 0
                        : onVendorClick(vendor);
                    },
                    itemType: 'vendors',
                  },
                ),
              );
            }),
          );
        };

        /***/
      },

    /***/ './src/vendor/VendorsPage.tsx':
      /*!************************************!*\
  !*** ./src/vendor/VendorsPage.tsx ***!
  \************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ VendorsPage: function () {
            return /* binding */ VendorsPage;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _layout_MainLayout__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! @/layout/MainLayout */ './src/layout/MainLayout.tsx');
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! react-router-dom */ './node_modules/react-router/esm/react-router.js',
          );
        /* harmony import */ var _apis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! ./apis */ './src/vendor/apis.ts',
        );
        /* harmony import */ var _VendorList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! ./VendorList */ './src/vendor/VendorList.tsx',
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

        var VendorsPage = function VendorsPage() {
          var history = (0, react_router_dom__WEBPACK_IMPORTED_MODULE_5__.useHistory)();
          var _React$useState = react__WEBPACK_IMPORTED_MODULE_2__.useState([]),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            loadedVendors = _React$useState2[0],
            setLoadedVendors = _React$useState2[1];
          var handleVendorClick = function handleVendorClick(value) {
            history.push({
              pathname: '/vendors/'.concat(
                value === null || value === void 0 ? void 0 : value.id.toString(),
              ),
            });
          };
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
            _layout_MainLayout__WEBPACK_IMPORTED_MODULE_1__.MainLayout,
            null,
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
              'h1',
              {
                className: 'sr-only',
              },
              'Vendors list',
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
              _VendorList__WEBPACK_IMPORTED_MODULE_4__.VendorList,
              {
                vendors: loadedVendors,
                onVendorClick: handleVendorClick,
              },
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
              _common_components__WEBPACK_IMPORTED_MODULE_0__.InfiniteLoader,
              {
                mode: 'ON_SIGHT',
                onLoad: /*#__PURE__*/ (function () {
                  var _ref = _asyncToGenerator(
                    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee(paginationParams) {
                      var data;
                      return _regeneratorRuntime().wrap(function _callee$(_context) {
                        while (1)
                          switch ((_context.prev = _context.next)) {
                            case 0:
                              _context.next = 2;
                              return _apis__WEBPACK_IMPORTED_MODULE_3__.VendorApis.getList(
                                paginationParams,
                              );
                            case 2:
                              data = _context.sent;
                              setLoadedVendors(function (prev) {
                                return [].concat(
                                  _toConsumableArray(prev),
                                  _toConsumableArray(data),
                                );
                              });
                              return _context.abrupt('return', data);
                            case 5:
                            case 'end':
                              return _context.stop();
                          }
                      }, _callee);
                    }),
                  );
                  return function (_x2) {
                    return _ref.apply(this, arguments);
                  };
                })(),
              },
            ),
          );
        };

        /***/
      },
  },
]);
//# sourceMappingURL=src_vendor_VendorsPage_tsx.bundle.js.map
