'use strict';
(self['webpackChunkgravity_web'] = self['webpackChunkgravity_web'] || []).push([
  ['src_insight_InsightPage_tsx'],
  {
    /***/ './src/insight/InsightHeader.tsx':
      /*!***************************************!*\
  !*** ./src/insight/InsightHeader.tsx ***!
  \***************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ InsightHeader: function () {
            return /* binding */ InsightHeader;
          },
          /* harmony export */
        });
        /* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/assets */ './src/assets/index.ts',
        );
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! @/common/constants */ './src/common/constants.ts');
        /* harmony import */ var _common_headless__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! @/common/headless */ './src/common/headless/index.ts');
        /* harmony import */ var _main_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @/main/utils */ './src/main/utils.ts',
        );
        /* harmony import */ var _property_PropertiesSection__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! @/property/PropertiesSection */ './src/property/PropertiesSection.tsx',
          );
        /* harmony import */ var _team_DateRangeSelect__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(/*! @/team/DateRangeSelect */ './src/team/DateRangeSelect.tsx');
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
          /*! react-hook-form */ './node_modules/react-hook-form/dist/index.esm.mjs',
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

        var getPropFromTagValue = function getPropFromTagValue(value) {
          var _value$split = value.split('-'),
            _value$split2 = _slicedToArray(_value$split, 3),
            type = _value$split2[0],
            id = _value$split2[1],
            name = _value$split2[2];
          return {
            type: type,
            id: +id,
            name: name,
          };
        };
        var InsightHeader = function InsightHeader() {
          var _watch, _watch2, _watch3, _watch4;
          var _useFormContext = (0, react_hook_form__WEBPACK_IMPORTED_MODULE_9__.useFormContext)(),
            watch = _useFormContext.watch,
            setValue = _useFormContext.setValue;
          var selectedVendors =
            (_watch = watch('vendors')) !== null && _watch !== void 0
              ? _watch
              : _common_constants__WEBPACK_IMPORTED_MODULE_2__.EMPTY_ARRAY;
          var selectedCategories =
            (_watch2 = watch('categories')) !== null && _watch2 !== void 0
              ? _watch2
              : _common_constants__WEBPACK_IMPORTED_MODULE_2__.EMPTY_ARRAY;
          var selectedDepartments =
            (_watch3 = watch('departments')) !== null && _watch3 !== void 0
              ? _watch3
              : _common_constants__WEBPACK_IMPORTED_MODULE_2__.EMPTY_ARRAY;
          var vendorProps = react__WEBPACK_IMPORTED_MODULE_8__.useMemo(
            function () {
              return selectedVendors.map(function (value) {
                return _objectSpread(
                  _objectSpread({}, getPropFromTagValue(value)),
                  {},
                  {
                    exclude: false,
                  },
                );
              });
            },
            [selectedVendors],
          );
          var categoryProps = react__WEBPACK_IMPORTED_MODULE_8__.useMemo(
            function () {
              return selectedCategories.map(function (value) {
                return _objectSpread(
                  _objectSpread({}, getPropFromTagValue(value)),
                  {},
                  {
                    exclude: false,
                  },
                );
              });
            },
            [selectedCategories],
          );
          var departmentProps = react__WEBPACK_IMPORTED_MODULE_8__.useMemo(
            function () {
              return selectedDepartments.map(function (value) {
                return _objectSpread(
                  _objectSpread({}, getPropFromTagValue(value)),
                  {},
                  {
                    exclude: false,
                  },
                );
              });
            },
            [selectedDepartments],
          );
          var selectedExceptions =
            (_watch4 = watch('exceptions')) !== null && _watch4 !== void 0
              ? _watch4
              : _common_constants__WEBPACK_IMPORTED_MODULE_2__.EMPTY_ARRAY;
          var exceptionProps = react__WEBPACK_IMPORTED_MODULE_8__.useMemo(
            function () {
              return selectedExceptions.map(function (value) {
                return _objectSpread(
                  _objectSpread({}, getPropFromTagValue(value)),
                  {},
                  {
                    exclude: true,
                  },
                );
              });
            },
            [selectedExceptions],
          );
          var targetProps = react__WEBPACK_IMPORTED_MODULE_8__.useMemo(
            function () {
              return [vendorProps, categoryProps, departmentProps, exceptionProps].flat();
            },
            [categoryProps, departmentProps, exceptionProps, vendorProps],
          );
          react__WEBPACK_IMPORTED_MODULE_8__.useEffect(
            function () {
              setValue('props', targetProps);
              // eslint-disable-next-line react-hooks/exhaustive-deps
            },
            [JSON.stringify(targetProps), setValue],
          );
          var reviewSentence = (0,
          _main_utils__WEBPACK_IMPORTED_MODULE_4__.genReviewSentenceFromProperties)(
            vendorProps,
            categoryProps,
            departmentProps,
            exceptionProps,
            function (vendorSen, catSen, teamSen, exceptSen) {
              return "You're looking at all spend "
                .concat(vendorSen, ' ')
                .concat(catSen, ' ')
                .concat(teamSen)
                .concat(exceptSen);
            },
          );
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
            'div',
            {
              className: (0, clsx__WEBPACK_IMPORTED_MODULE_7__['default'])(
                'rounded-lg',
                'relative',
                'pt-[84px]',
                'bg-white',
              ),
              style: {
                boxShadow: 'linear-gradient(138.74deg, #2B45A1 -12.96%, #82B2B3 100%)',
              },
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
              'div',
              {
                className: (0, clsx__WEBPACK_IMPORTED_MODULE_7__['default'])(
                  'h-[84px] p-6 flex items-center space-x-4 rounded-lg',
                  'absolute w-full top-0 left-0',
                ),
                style: {
                  background: 'linear-gradient(138.74deg, #2B45A1 -12.96%, #82B2B3 100%)',
                },
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                'div',
                {
                  className:
                    'border border-white rounded-full p-2 w-9 h-9 flex justify-center items-center',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                  _assets__WEBPACK_IMPORTED_MODULE_0__.ChartIcon,
                  {
                    className: 'text-white',
                  },
                ),
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                'div',
                {
                  className: 'flex items-baseline space-x-1',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                  'p',
                  {
                    className: 'text-white text-base font-semibold',
                  },
                  'Insights',
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                  'p',
                  {
                    className: 'text-white text-sm',
                  },
                  '- Drill down by team, category or vendor.',
                ),
              ),
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
              'div',
              {
                className: 'py-4 px-8 grid grid-cols-2 gap-12',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                'div',
                null,
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                  'div',
                  {
                    className: 'flex items-center gap-1',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                    'span',
                    {
                      className: 'font-bold text-sm',
                    },
                    'Properties:',
                  ),
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                    'span',
                    {
                      className: 'text-Gray-6 text-xs',
                    },
                    reviewSentence,
                  ),
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                  _property_PropertiesSection__WEBPACK_IMPORTED_MODULE_5__.PropertiesSection,
                  {
                    className: 'mt-2',
                    exceptionProps: exceptionProps,
                  },
                ),
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                'div',
                {
                  className: 'flex gap-4 flex-shrink-0',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                  'div',
                  {
                    className: 'flex flex-col gap-2',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                    'label',
                    {
                      className: 'font-bold text-sm',
                    },
                    'Date Range',
                  ),
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                    _common_headless__WEBPACK_IMPORTED_MODULE_3__.Field,
                    {
                      name: 'dateRange',
                      component: _team_DateRangeSelect__WEBPACK_IMPORTED_MODULE_6__.DateRangeSelect,
                      variant: 'outline',
                    },
                  ),
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                  'div',
                  {
                    className: 'flex flex-col gap-2',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                    'label',
                    {
                      className: 'block font-bold text-sm',
                    },
                    'Group By',
                  ),
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_1__.Form.Select,
                    {
                      name: 'groupBy',
                      options: [
                        {
                          label: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                            'div',
                            {
                              className: 'flex items-center gap-2',
                            },
                            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                              _assets__WEBPACK_IMPORTED_MODULE_0__.TeamIcon,
                              null,
                            ),
                            'Team',
                          ),
                          value: 'DEPARTMENT',
                        },
                        {
                          label: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                            'div',
                            {
                              className: 'flex items-center gap-2',
                            },
                            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                              _assets__WEBPACK_IMPORTED_MODULE_0__.CategoryIcon,
                              null,
                            ),
                            'Category',
                          ),
                          value: 'CATEGORY',
                        },
                        {
                          label: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                            'div',
                            {
                              className: 'flex items-center gap-2',
                            },
                            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                              _assets__WEBPACK_IMPORTED_MODULE_0__.VendorIcon,
                              null,
                            ),
                            'Vendor',
                          ),
                          value: 'VENDOR',
                        },
                      ],
                    },
                  ),
                ),
              ),
            ),
          );
        };

        /***/
      },

    /***/ './src/insight/InsightPage.tsx':
      /*!*************************************!*\
  !*** ./src/insight/InsightPage.tsx ***!
  \*************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ InsightPage: function () {
            return /* binding */ InsightPage;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var _feed_apis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @/feed/apis */ './src/feed/apis.ts',
        );
        /* harmony import */ var _layout_MainLayout__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! @/layout/MainLayout */ './src/layout/MainLayout.tsx');
        /* harmony import */ var _main_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @/main/utils */ './src/main/utils.ts',
        );
        /* harmony import */ var _mixpanel_useMixPanel__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(/*! @/mixpanel/useMixPanel */ './src/mixpanel/useMixPanel.ts');
        /* harmony import */ var _profile_useProfile__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(/*! @/profile/useProfile */ './src/profile/useProfile.ts');
        /* harmony import */ var _spending_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! @/spending/utils */ './src/spending/utils.ts',
        );
        /* harmony import */ var _subscription_useSubscription__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(
            /*! @/subscription/useSubscription */ './src/subscription/useSubscription.ts',
          );
        /* harmony import */ var mixpanel_browser__WEBPACK_IMPORTED_MODULE_9__ =
          __webpack_require__(
            /*! mixpanel-browser */ './node_modules/mixpanel-browser/dist/mixpanel.cjs.js',
          );
        /* harmony import */ var mixpanel_browser__WEBPACK_IMPORTED_MODULE_9___default =
          /*#__PURE__*/ __webpack_require__.n(mixpanel_browser__WEBPACK_IMPORTED_MODULE_9__);
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_17__ =
          __webpack_require__(
            /*! react-hook-form */ './node_modules/react-hook-form/dist/index.esm.mjs',
          );
        /* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_16__ =
          __webpack_require__(
            /*! react-router-dom */ './node_modules/react-router/esm/react-router.js',
          );
        /* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
          /*! react-toastify */ './node_modules/react-toastify/dist/react-toastify.esm.js',
        );
        /* harmony import */ var _apis__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
          /*! ./apis */ './src/insight/apis.ts',
        );
        /* harmony import */ var _InsightCard__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
          /*! ./InsightCard */ './src/insight/InsightCard.tsx',
        );
        /* harmony import */ var _InsightHeader__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
          /*! ./InsightHeader */ './src/insight/InsightHeader.tsx',
        );
        /* harmony import */ var _useInsight__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
          /*! ./useInsight */ './src/insight/useInsight.ts',
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
        var _excluded = ['dateRange'];
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
        function _unsupportedIterableToArray(o, minLen) {
          if (!o) return;
          if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          if (n === 'Object' && o.constructor) n = o.constructor.name;
          if (n === 'Map' || n === 'Set') return Array.from(o);
          if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
            return _arrayLikeToArray(o, minLen);
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
        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length) len = arr.length;
          for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
          return arr2;
        }
        function _objectDestructuringEmpty(obj) {
          if (obj == null) throw new TypeError('Cannot destructure ' + obj);
        }

        var InsightPage = function InsightPage(_ref) {
          _objectDestructuringEmpty(_ref);
          var _ref2 = (0, react_router_dom__WEBPACK_IMPORTED_MODULE_16__.useParams)(),
            insightId = _ref2.insightId;
          var _useInsight = (0, _useInsight__WEBPACK_IMPORTED_MODULE_15__.useInsight)(insightId),
            insight = _useInsight.insight,
            isInitializingInsight = _useInsight.isInitializingInsight,
            mutateInsight = _useInsight.mutateInsight;
          var _useSubscription = (0,
            _subscription_useSubscription__WEBPACK_IMPORTED_MODULE_8__.useSubscription)(),
            mutateSubscription = _useSubscription.mutateSubscription;
          var isEdit = !!insight;
          var methods = (0, react_hook_form__WEBPACK_IMPORTED_MODULE_17__.useForm)({
            defaultValues: {
              name: '',
              groupBy: 'DEPARTMENT',
              dateRange: 'year-to-date',
              props: [],
              vendors: [],
              departments: [],
              categories: [],
            },
          });
          var watch = methods.watch,
            handleSubmit = methods.handleSubmit,
            reset = methods.reset,
            _methods$formState = methods.formState,
            isSubmitting = _methods$formState.isSubmitting,
            errors = _methods$formState.errors;
          var history = (0, react_router_dom__WEBPACK_IMPORTED_MODULE_16__.useHistory)();
          var _useProfile = (0, _profile_useProfile__WEBPACK_IMPORTED_MODULE_6__.useProfile)(),
            profile = _useProfile.profile;
          (0, _common_hooks__WEBPACK_IMPORTED_MODULE_1__.useMountEffect)(function () {
            var _profile$company;
            mixpanel_browser__WEBPACK_IMPORTED_MODULE_9___default().track('Insight Page View', {
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
            _mixpanel_useMixPanel__WEBPACK_IMPORTED_MODULE_5__.identifyMixPanelUserProfile)(profile);
          });
          (0, react__WEBPACK_IMPORTED_MODULE_10__.useEffect)(
            function () {
              if (isEdit) {
                var _props$reduce;
                var getTagValueFromProps = function getTagValueFromProps(_ref3) {
                  var id = _ref3.id,
                    name = _ref3.name,
                    type = _ref3.type;
                  return ''.concat(type, '-').concat(id, '-').concat(name);
                };
                var _dateRange = insight.dateRange,
                  _groupBy = insight.groupBy,
                  _props = insight.props,
                  name = insight.name;
                var _ref4 =
                    (_props$reduce = _props.reduce(
                      function (acc, cur) {
                        return {
                          vendorProps:
                            cur.type === 'VENDOR'
                              ? [].concat(_toConsumableArray(acc.vendorProps), [
                                  getTagValueFromProps(cur),
                                ])
                              : acc.vendorProps,
                          categoryProps:
                            cur.type === 'CATEGORY'
                              ? [].concat(_toConsumableArray(acc.categoryProps), [
                                  getTagValueFromProps(cur),
                                ])
                              : acc.categoryProps,
                          departmentProps:
                            cur.type === 'DEPARTMENT'
                              ? [].concat(_toConsumableArray(acc.departmentProps), [
                                  getTagValueFromProps(cur),
                                ])
                              : acc.departmentProps,
                        };
                      },
                      {
                        vendorProps: [],
                        categoryProps: [],
                        departmentProps: [],
                      },
                    )) !== null && _props$reduce !== void 0
                      ? _props$reduce
                      : {},
                  _ref4$vendorProps = _ref4.vendorProps,
                  vendorProps = _ref4$vendorProps === void 0 ? [] : _ref4$vendorProps,
                  _ref4$categoryProps = _ref4.categoryProps,
                  categoryProps = _ref4$categoryProps === void 0 ? [] : _ref4$categoryProps,
                  _ref4$departmentProps = _ref4.departmentProps,
                  departmentProps = _ref4$departmentProps === void 0 ? [] : _ref4$departmentProps;
                reset({
                  dateRange: _dateRange,
                  groupBy: _groupBy,
                  props: _props,
                  name: name,
                  vendors: vendorProps,
                  categories: categoryProps,
                  departments: departmentProps,
                });
              }
            },
            [insight, isEdit, reset],
          );
          var dateRange = watch('dateRange');
          var groupBy = watch('groupBy');
          var props = watch('props');
          var handlePost = function handlePost(data) {
            var contentState = data === null || data === void 0 ? void 0 : data.content;
            var isDirty =
              contentState.getCurrentContent().hasText() ||
              !!(data !== null && data !== void 0 && data.attachment);
            var parsedContent = (0,
            _main_utils__WEBPACK_IMPORTED_MODULE_4__.commentEditorHtmlParser)(
              contentState.getCurrentContent(),
            );
            handleSubmit(
              /*#__PURE__*/ (function () {
                var _ref6 = _asyncToGenerator(
                  /*#__PURE__*/ _regeneratorRuntime().mark(function _callee(_ref5) {
                    var dateRange, restFormData, _insight;
                    return _regeneratorRuntime().wrap(
                      function _callee$(_context) {
                        while (1)
                          switch ((_context.prev = _context.next)) {
                            case 0:
                              (dateRange = _ref5.dateRange),
                                (restFormData = _objectWithoutProperties(_ref5, _excluded));
                              if (!isEdit) {
                                _context.next = 17;
                                break;
                              }
                              _context.next = 4;
                              return _apis__WEBPACK_IMPORTED_MODULE_12__.InsightApis.update(
                                insight.id,
                                _objectSpread(
                                  _objectSpread({}, restFormData),
                                  (0,
                                  _spending_utils__WEBPACK_IMPORTED_MODULE_7__.convertDateRangeToFromTo)(
                                    {
                                      dateRange: dateRange,
                                    },
                                  ),
                                ),
                              );
                            case 4:
                              if (!isDirty) {
                                _context.next = 14;
                                break;
                              }
                              _context.prev = 5;
                              _context.next = 8;
                              return _feed_apis__WEBPACK_IMPORTED_MODULE_2__.FeedApis.createComment(
                                insight.feedItem.id,
                                {
                                  content: parsedContent,
                                  attachment:
                                    data === null || data === void 0 ? void 0 : data.attachment,
                                },
                              );
                            case 8:
                              react_toastify__WEBPACK_IMPORTED_MODULE_11__.toast.success(
                                'Comment sent!',
                              );
                              _context.next = 14;
                              break;
                            case 11:
                              _context.prev = 11;
                              _context.t0 = _context['catch'](5);
                              react_toastify__WEBPACK_IMPORTED_MODULE_11__.toast.error(_context.t0);
                            case 14:
                              mutateSubscription();
                              _context.next = 24;
                              break;
                            case 17:
                              _context.next = 19;
                              return _apis__WEBPACK_IMPORTED_MODULE_12__.InsightApis.create(
                                _objectSpread(
                                  _objectSpread({}, restFormData),
                                  (0,
                                  _spending_utils__WEBPACK_IMPORTED_MODULE_7__.convertDateRangeToFromTo)(
                                    {
                                      dateRange: dateRange,
                                    },
                                  ),
                                ),
                              );
                            case 19:
                              _insight = _context.sent;
                              if (!isDirty) {
                                _context.next = 23;
                                break;
                              }
                              _context.next = 23;
                              return _feed_apis__WEBPACK_IMPORTED_MODULE_2__.FeedApis.createComment(
                                _insight.feedItem.id,
                                {
                                  content: parsedContent,
                                  attachment:
                                    data === null || data === void 0 ? void 0 : data.attachment,
                                },
                              );
                            case 23:
                              history.push('/feed/'.concat(_insight.feedItem.id));
                            case 24:
                            case 'end':
                              return _context.stop();
                          }
                      },
                      _callee,
                      null,
                      [[5, 11]],
                    );
                  }),
                );
                return function (_x) {
                  return _ref6.apply(this, arguments);
                };
              })(),
            )();
          };
          return /*#__PURE__*/ React.createElement(
            _layout_MainLayout__WEBPACK_IMPORTED_MODULE_3__.MainLayout,
            null,
            /*#__PURE__*/ React.createElement(
              _common_components__WEBPACK_IMPORTED_MODULE_0__.ListLoader,
              {
                loading: isInitializingInsight,
              },
              /*#__PURE__*/ React.createElement(
                _common_components__WEBPACK_IMPORTED_MODULE_0__.Form,
                {
                  methods: methods,
                  className: 'flex flex-col gap-6',
                },
                /*#__PURE__*/ React.createElement(
                  _InsightHeader__WEBPACK_IMPORTED_MODULE_14__.InsightHeader,
                  null,
                ),
                /*#__PURE__*/ React.createElement(
                  _InsightCard__WEBPACK_IMPORTED_MODULE_13__.InsightCard,
                  {
                    errors: errors,
                    onPost: handlePost,
                    groupBy: groupBy,
                    dateRange: dateRange,
                    props: props,
                    posting: isSubmitting,
                    initializing: isInitializingInsight,
                    postable: isEdit
                      ? (profile === null || profile === void 0 ? void 0 : profile.id) ===
                        (insight === null || insight === void 0 ? void 0 : insight.creator.id)
                      : true,
                  },
                ),
              ),
            ),
          );
        };

        /***/
      },

    /***/ './src/insight/useInsight.ts':
      /*!***********************************!*\
  !*** ./src/insight/useInsight.ts ***!
  \***********************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ useInsight: function () {
            return /* binding */ useInsight;
          },
          /* harmony export */
        });
        /* harmony import */ var _apis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! ./apis */ './src/insight/apis.ts',
        );
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
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

        var useInsight = function useInsight(id) {
          var _useFetcher = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_1__.useFetcher)(
              !!id && ['useInsight', id],
              function () {
                return _apis__WEBPACK_IMPORTED_MODULE_0__.InsightApis.get(id);
              },
              {
                laggy: true,
              },
            ),
            data = _useFetcher.data,
            isInitializing = _useFetcher.isInitializing,
            isValidating = _useFetcher.isValidating,
            mutate = _useFetcher.mutate;
          return react__WEBPACK_IMPORTED_MODULE_2__.useMemo(
            function () {
              return {
                insight: data
                  ? _objectSpread(
                      _objectSpread({}, data),
                      {},
                      {
                        dateRange:
                          data.dateRange === 'custom' && data.from && data.to
                            ? [new Date(data.from), new Date(data.to)]
                            : data.dateRange,
                      },
                    )
                  : undefined,
                isInitializingInsight: isInitializing,
                isValidatingInsight: isValidating,
                mutateInsight: mutate,
              };
            },
            [data, isInitializing, isValidating, mutate],
          );
        };

        /***/
      },

    /***/ './src/property/PropertiesDropdown.tsx':
      /*!*********************************************!*\
  !*** ./src/property/PropertiesDropdown.tsx ***!
  \*********************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ PropertiesDropdown: function () {
            return /* binding */ PropertiesDropdown;
          },
          /* harmony export */
        });
        /* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/assets */ './src/assets/index.ts',
        );
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
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
        var _excluded = ['icon', 'label', 'colorScheme', 'name'];
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

        var ColorByColorScheme = {
          accent: 'text-Accent-2',
          cyan: 'text-cyan-1',
          orange: 'text-orange-1',
        };
        var PropertiesDropdown = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.forwardRef(
          function (_ref, ref) {
            var name = _ref.name,
              placeholder = _ref.placeholder,
              options = _ref.options,
              searchPlaceholder = _ref.searchPlaceholder,
              trigger = _ref.trigger,
              onChange = _ref.onChange,
              placement = _ref.placement,
              _ref$showOptionsOnEmp = _ref.showOptionsOnEmptySearch,
              showOptionsOnEmptySearch =
                _ref$showOptionsOnEmp === void 0 ? true : _ref$showOptionsOnEmp,
              error = _ref.error,
              description = _ref.description;
            var internalRef = react__WEBPACK_IMPORTED_MODULE_4__.useRef();
            var _React$useState = react__WEBPACK_IMPORTED_MODULE_4__.useState(''),
              _React$useState2 = _slicedToArray(_React$useState, 2),
              search = _React$useState2[0],
              setSearch = _React$useState2[1];
            var setSearchDebounced = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_2__.useDebounce)(
              setSearch,
              300,
            );
            react__WEBPACK_IMPORTED_MODULE_4__.useImperativeHandle(ref, function () {
              return internalRef.current;
            });
            react__WEBPACK_IMPORTED_MODULE_4__.useEffect(
              function () {
                if (error) {
                  var _internalRef$current;
                  (_internalRef$current = internalRef.current) === null ||
                  _internalRef$current === void 0
                    ? void 0
                    : _internalRef$current.open();
                }
              },
              [error, internalRef],
            );
            return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
              _common_components__WEBPACK_IMPORTED_MODULE_1__.Form.TagsSelect,
              {
                ref: internalRef,
                className: 'max-w-[140px] h-[fit-content] flex-shrink-0',
                trigger: trigger,
                name: name,
                placeholder: placeholder,
                onChange: onChange,
                placement: placement,
                onClose: function onClose() {
                  return setSearch('');
                },
              },
              description,
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                _common_components__WEBPACK_IMPORTED_MODULE_1__.TagsSelectSearch,
                {
                  placeholder: searchPlaceholder,
                  onChange: function onChange(e) {
                    return setSearchDebounced(e.target.value);
                  },
                },
              ),
              !!error &&
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                  'div',
                  {
                    className: 'flex flex-row items-center px-2 space-x-1 mb-2',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                    _assets__WEBPACK_IMPORTED_MODULE_0__.AlertRed,
                    {
                      width: 15,
                      height: 15,
                      className: 'w-4 h-4',
                      viewBox: '0 0 15 15',
                    },
                  ),
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                    'p',
                    {
                      className: 'text-xs text-Gray-6',
                    },
                    'Targets need at least one property',
                  ),
                ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                'div',
                {
                  className: (0, clsx__WEBPACK_IMPORTED_MODULE_3__['default'])(
                    'invisible-scrollbar flex-1 overflow-auto',
                    {
                      'min-h-[150px]': !showOptionsOnEmptySearch,
                    },
                  ),
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                  'div',
                  {
                    className: (0, clsx__WEBPACK_IMPORTED_MODULE_3__['default'])({
                      hidden: !showOptionsOnEmptySearch && !search,
                    }),
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_1__.TagsSelectOptions,
                    {
                      options: options.map(function (_ref2) {
                        var icon = _ref2.icon,
                          label = _ref2.label,
                          colorScheme = _ref2.colorScheme,
                          name = _ref2.name,
                          restOptions = _objectWithoutProperties(_ref2, _excluded);
                        return _objectSpread(
                          {
                            tagProps: {
                              colorScheme: colorScheme,
                              icon: icon,
                              children:
                                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                  'span',
                                  {
                                    className:
                                      'whitespace-nowrap overflow-hidden overflow-ellipsis',
                                  },
                                  name,
                                ),
                            },
                            icon: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                              'div',
                              {
                                className: (0, clsx__WEBPACK_IMPORTED_MODULE_3__['default'])(
                                  'w-5 h-5',
                                  ColorByColorScheme[colorScheme],
                                ),
                              },
                              icon,
                            ),
                            children:
                              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                'div',
                                {
                                  className:
                                    'whitespace-nowrap overflow-hidden overflow-ellipsis w-full',
                                },
                                label,
                              ),
                          },
                          restOptions,
                        );
                      }),
                    },
                  ),
                ),
              ),
            );
          },
        );
        PropertiesDropdown.displayName = 'PropertiesDropdown';

        /***/
      },

    /***/ './src/property/PropertiesExceptionList.tsx':
      /*!**************************************************!*\
  !*** ./src/property/PropertiesExceptionList.tsx ***!
  \**************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _main_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/main/utils */ './src/main/utils.ts',
        );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );

        var ExceptionList = function ExceptionList(_ref) {
          var className = _ref.className,
            _ref$items = _ref.items,
            items = _ref$items === void 0 ? [] : _ref$items,
            onTagRemoveClick = _ref.onTagRemoveClick;
          if (items.length === 0) return null;
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
            'div',
            {
              className: (0, clsx__WEBPACK_IMPORTED_MODULE_2__['default'])(
                'flex flex-row py-1 space-x-2 px-2',
                className,
              ),
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
              'div',
              {
                className: 'flex items-center justify-center w-[50px] h-[30px]',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                'p',
                {
                  className: 'text-Gray-6 text-xs',
                },
                'Except ',
              ),
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
              'div',
              {
                className:
                  'flex flex-grow flex-wrap items-center focus-within:z-10 overflow-y-scroll',
              },
              items.map(function (item) {
                var IconByType = (0, _main_utils__WEBPACK_IMPORTED_MODULE_1__.getPropIconByType)(
                  item === null || item === void 0 ? void 0 : item.type,
                );
                var colorByType = (0,
                _main_utils__WEBPACK_IMPORTED_MODULE_1__.getColorByPropertyType)(
                  item === null || item === void 0 ? void 0 : item.type,
                );
                return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                  _common_components__WEBPACK_IMPORTED_MODULE_0__.Button,
                  {
                    key: 'ExceptionList-'.concat(
                      item === null || item === void 0 ? void 0 : item.id,
                    ),
                    className:
                      'flex flex-row h-[30px] items-center m-0.5 space-x-1 px-2 py-1 rounded-sm',
                    style: {
                      backgroundColor: colorByType,
                    },
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(IconByType, {
                    className: 'w-5 h-5 fill-current path-no-filled text-white object-scale-down',
                    width: 20,
                    height: 20,
                    viewBox: '0 0 20 20',
                  }),
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                    'p',
                    {
                      className:
                        'text-white text-left text-3xs font-semibold truncate max-w-[160px]',
                    },
                    item === null || item === void 0 ? void 0 : item.name,
                  ),
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_0__.Button,
                    {
                      className: 'text-xs text-white font-bold ml-2',
                      onClick: function onClick() {
                        onTagRemoveClick === null || onTagRemoveClick === void 0
                          ? void 0
                          : onTagRemoveClick(item);
                      },
                    },
                    '\xD7',
                  ),
                );
              }),
            ),
          );
        };
        /* harmony default export */ __webpack_exports__['default'] = ExceptionList;

        /***/
      },

    /***/ './src/property/PropertiesSection.tsx':
      /*!********************************************!*\
  !*** ./src/property/PropertiesSection.tsx ***!
  \********************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ PropertiesSection: function () {
            return /* binding */ PropertiesSection;
          },
          /* harmony export */
        });
        /* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/assets */ './src/assets/index.ts',
        );
        /* harmony import */ var _category_useCategories__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! @/category/useCategories */ './src/category/useCategories.ts');
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _target_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @/target/types */ './src/target/types.ts',
        );
        /* harmony import */ var _team_useDepartments__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(/*! @/team/useDepartments */ './src/team/useDepartments.ts');
        /* harmony import */ var _vendor_useVendors__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(/*! @/vendor/useVendors */ './src/vendor/useVendors.ts');
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var _PropertiesDropdown__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(/*! ./PropertiesDropdown */ './src/property/PropertiesDropdown.tsx');
        /* harmony import */ var _PropertiesExceptionList__WEBPACK_IMPORTED_MODULE_9__ =
          __webpack_require__(
            /*! ./PropertiesExceptionList */ './src/property/PropertiesExceptionList.tsx',
          );
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
        function _unsupportedIterableToArray(o, minLen) {
          if (!o) return;
          if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          if (n === 'Object' && o.constructor) n = o.constructor.name;
          if (n === 'Map' || n === 'Set') return Array.from(o);
          if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
            return _arrayLikeToArray(o, minLen);
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
        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length) len = arr.length;
          for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
          return arr2;
        }

        var PropertiesSection = function PropertiesSection(_ref) {
          var reviewSentence = _ref.reviewSentence,
            _ref$exceptionProps = _ref.exceptionProps,
            exceptionProps = _ref$exceptionProps === void 0 ? [] : _ref$exceptionProps,
            error = _ref.error,
            className = _ref.className;
          var exceptionsDropdownRef = react__WEBPACK_IMPORTED_MODULE_7__.useRef();
          var _useDepartments = (0,
            _team_useDepartments__WEBPACK_IMPORTED_MODULE_4__.useDepartments)({
              limit: 0,
            }),
            departments = _useDepartments.departments;
          var _useVendors = (0, _vendor_useVendors__WEBPACK_IMPORTED_MODULE_5__.useVendors)({
              limit: 0,
            }),
            vendors = _useVendors.vendors;
          var _useCategories = (0,
            _category_useCategories__WEBPACK_IMPORTED_MODULE_1__.useCategories)({
              limit: 0,
            }),
            categories = _useCategories.categories;
          var vendorOptions = react__WEBPACK_IMPORTED_MODULE_7__.useMemo(
            function () {
              return vendors.map(function (_ref2) {
                var id = _ref2.id,
                  name = _ref2.name;
                return {
                  value: ''
                    .concat(_target_types__WEBPACK_IMPORTED_MODULE_3__.TargetTypeProp.VENDOR, '-')
                    .concat(id, '-')
                    .concat(name),
                  name: name,
                  label: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                    'div',
                    {
                      className: 'flex items center w-full',
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                      'span',
                      {
                        className: 'max-w-[220px] truncate',
                      },
                      name,
                    ),
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                      'span',
                      {
                        className: 'invisible group-hover:visible text-Gray-6',
                      },
                      '\xA0- Vendor',
                    ),
                  ),
                  icon: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                    _assets__WEBPACK_IMPORTED_MODULE_0__.Bank,
                    {
                      width: 14,
                      height: 14,
                    },
                  ),
                  colorScheme: 'orange',
                  searchValue: name,
                  className: 'group',
                };
              });
            },
            [vendors],
          );
          var categoryOptions = react__WEBPACK_IMPORTED_MODULE_7__.useMemo(
            function () {
              return categories.map(function (_ref3) {
                var id = _ref3.id,
                  name = _ref3.name;
                return {
                  value: ''
                    .concat(_target_types__WEBPACK_IMPORTED_MODULE_3__.TargetTypeProp.CATEGORY, '-')
                    .concat(id, '-')
                    .concat(name),
                  name: name,
                  label: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                    'div',
                    {
                      className: 'flex items center w-full',
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                      'span',
                      {
                        className: 'max-w-[220px] truncate',
                      },
                      name,
                    ),
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                      'span',
                      {
                        className: 'invisible group-hover:visible text-Gray-6',
                      },
                      '\xA0- Category',
                    ),
                  ),
                  icon: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                    _assets__WEBPACK_IMPORTED_MODULE_0__.CategoryIcon,
                    {
                      width: 14,
                      height: 14,
                    },
                  ),
                  colorScheme: 'accent',
                  searchValue: name,
                  className: 'group',
                };
              });
            },
            [categories],
          );
          var departmentOptions = react__WEBPACK_IMPORTED_MODULE_7__.useMemo(
            function () {
              return departments.map(function (_ref4) {
                var id = _ref4.id,
                  name = _ref4.name;
                return {
                  value: ''
                    .concat(
                      _target_types__WEBPACK_IMPORTED_MODULE_3__.TargetTypeProp.DEPARTMENT,
                      '-',
                    )
                    .concat(id, '-')
                    .concat(name),
                  name: name,
                  label: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                    'div',
                    {
                      className: 'flex items center w-full',
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                      'span',
                      {
                        className: 'max-w-[220px] truncate',
                      },
                      name,
                    ),
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                      'span',
                      {
                        className: 'invisible group-hover:visible text-Gray-6',
                      },
                      '\xA0- Team',
                    ),
                  ),
                  icon: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                    _assets__WEBPACK_IMPORTED_MODULE_0__.TeamIcon,
                    {
                      width: 14,
                      height: 14,
                    },
                  ),
                  colorScheme: 'cyan',
                  searchValue: name,
                  className: 'group',
                };
              });
            },
            [departments],
          );
          var exceptionOptions = react__WEBPACK_IMPORTED_MODULE_7__.useMemo(
            function () {
              return [].concat(
                _toConsumableArray(vendorOptions),
                _toConsumableArray(categoryOptions),
                _toConsumableArray(departmentOptions),
              );
            },
            [categoryOptions, departmentOptions, vendorOptions],
          );
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
            'div',
            {
              className: (0, clsx__WEBPACK_IMPORTED_MODULE_6__['default'])(
                'flex flex-col space-y-3 w-full',
                className,
              ),
            },
            !!reviewSentence &&
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                'p',
                {
                  className: 'text-primary text-xs font-semibold',
                },
                'Properties*:',
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                  'span',
                  {
                    className: 'text-Gray-3 font-normal ml-1',
                  },
                  reviewSentence,
                ),
              ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
              'div',
              {
                className: 'flex flex-row py-1 space-x-2',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                'div',
                {
                  className: 'flex items-center justify-center min-w-[50px] h-[30px]',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                  'p',
                  {
                    className: 'text-Gray-6 text-xs',
                  },
                  'Select:',
                ),
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                _PropertiesDropdown__WEBPACK_IMPORTED_MODULE_8__.PropertiesDropdown,
                {
                  name: 'vendors',
                  placeholder: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_2__.Tag,
                    {
                      colorScheme: 'orange',
                      icon: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                        _assets__WEBPACK_IMPORTED_MODULE_0__.Bank,
                        {
                          width: 14,
                          height: 14,
                        },
                      ),
                    },
                    'All Vendors',
                  ),
                  searchPlaceholder: 'Enter a vendor',
                  options: vendorOptions,
                  error: error,
                },
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                'div',
                {
                  className: 'flex items-center justify-center w-6 h-[30px]',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                  'p',
                  {
                    className: 'text-Gray-6 text-xs text-center',
                  },
                  'in',
                ),
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                _PropertiesDropdown__WEBPACK_IMPORTED_MODULE_8__.PropertiesDropdown,
                {
                  name: 'categories',
                  placeholder: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_2__.Tag,
                    {
                      colorScheme: 'accent',
                      icon: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                        _assets__WEBPACK_IMPORTED_MODULE_0__.CategoryIcon,
                        {
                          width: 14,
                          height: 14,
                        },
                      ),
                    },
                    'All Categories',
                  ),
                  searchPlaceholder: 'Enter a category',
                  options: categoryOptions,
                },
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                'div',
                {
                  className: 'flex items-center justify-center w-6 h-[30px]',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                  'p',
                  {
                    className: 'text-Gray-6 text-xs text-center',
                  },
                  'for',
                ),
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                _PropertiesDropdown__WEBPACK_IMPORTED_MODULE_8__.PropertiesDropdown,
                {
                  name: 'departments',
                  placeholder: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_2__.Tag,
                    {
                      colorScheme: 'cyan',
                      icon: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                        _assets__WEBPACK_IMPORTED_MODULE_0__.TeamIcon,
                        {
                          width: 14,
                          height: 14,
                        },
                      ),
                    },
                    'All Teams',
                  ),
                  searchPlaceholder: 'Enter a team',
                  options: departmentOptions,
                  placement: 'bottom-end',
                },
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                _PropertiesDropdown__WEBPACK_IMPORTED_MODULE_8__.PropertiesDropdown,
                {
                  ref: exceptionsDropdownRef,
                  name: 'exceptions',
                  searchPlaceholder: 'Enter a team, category, or vendor',
                  options: exceptionOptions,
                  trigger: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_2__.Button,
                    {
                      size: 'sm',
                      variant: 'outline',
                      square: true,
                      colorScheme: 'gray',
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                      _assets__WEBPACK_IMPORTED_MODULE_0__.IntersectIcon,
                      {
                        className: 'w-4 h-4',
                        width: 16,
                        height: 16,
                      },
                    ),
                  ),
                  placement: 'bottom-end',
                  showOptionsOnEmptySearch: false,
                  description: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                    'div',
                    {
                      className: 'flex items-center text-xs mb-2 text-Gray-6',
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                      'p',
                      {
                        className: 'font-semibold text-Gray-1',
                      },
                      'Except',
                    ),
                    ' - Specify any properties not to include',
                  ),
                },
              ),
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
              _PropertiesExceptionList__WEBPACK_IMPORTED_MODULE_9__['default'],
              {
                items: exceptionProps,
                onTagRemoveClick: function onTagRemoveClick(_ref5) {
                  var _exceptionsDropdownRe;
                  var id = _ref5.id,
                    name = _ref5.name,
                    type = _ref5.type;
                  (_exceptionsDropdownRe = exceptionsDropdownRef.current) === null ||
                  _exceptionsDropdownRe === void 0
                    ? void 0
                    : _exceptionsDropdownRe.removeTag(
                        ''.concat(type, '-').concat(id, '-').concat(name),
                      );
                },
              },
            ),
          );
        };

        /***/
      },
  },
]);
//# sourceMappingURL=src_insight_InsightPage_tsx.bundle.js.map
