'use strict';
(self['webpackChunkgravity_web'] = self['webpackChunkgravity_web'] || []).push([
  ['src_category_CategoryPage_tsx'],
  {
    /***/ './src/auth/RestrictedAccess.tsx':
      /*!***************************************!*\
  !*** ./src/auth/RestrictedAccess.tsx ***!
  \***************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ RestrictedAccessPage: function () {
            return /* binding */ RestrictedAccessPage;
          },
          /* harmony export */
        });
        /* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/assets */ './src/assets/index.ts',
        );

        var RestrictedAccessPage = function RestrictedAccessPage() {
          return /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'min-h-screen',
            },
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className:
                  'max-w-[360px] mx-auto space-y-16 text-center flex flex-col justify-center items-center mt-32 md:pr-20',
              },
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className:
                    'bg-white w-[200px] h-[200px] rounded-full flex justify-center items-center',
                },
                /*#__PURE__*/ React.createElement(
                  _assets__WEBPACK_IMPORTED_MODULE_0__.LockDBIcon,
                  null,
                ),
              ),
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'space-y-4',
                },
                /*#__PURE__*/ React.createElement(
                  'p',
                  {
                    className: 'text-3xl font-semibold tracking-tight text-primary',
                  },
                  'This item is restricted',
                ),
                /*#__PURE__*/ React.createElement(
                  'p',
                  {
                    className: 'text-sm leading-4 text-Gray-6 font-normal',
                  },
                  'You don\u2019t have access to this data. Please contact an admin for more info.',
                ),
              ),
            ),
          );
        };

        /***/
      },

    /***/ './src/category/CategoryHeader.tsx':
      /*!*****************************************!*\
  !*** ./src/category/CategoryHeader.tsx ***!
  \*****************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ CategoryHeader: function () {
            return /* binding */ CategoryHeader;
          },
          /* harmony export */
        });
        /* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/assets */ './src/assets/index.ts',
        );
        /* harmony import */ var _main_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/main/utils */ './src/main/utils.ts',
        );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var _useCategory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! ./useCategory */ './src/category/useCategory.ts',
        );

        var CategoryHeader = function CategoryHeader(_ref) {
          var className = _ref.className,
            categoryId = _ref.categoryId;
          var CategoryHeaderColor = (0, _main_utils__WEBPACK_IMPORTED_MODULE_1__.getColorByText)(
            '',
            categoryId,
            true,
          );
          var _useCategory = (0, _useCategory__WEBPACK_IMPORTED_MODULE_3__.useCategory)(categoryId),
            department = _useCategory.data;
          return /*#__PURE__*/ React.createElement(
            'div',
            {
              className: (0, clsx__WEBPACK_IMPORTED_MODULE_2__['default'])(
                'flex flex-row items-center px-6 mt-6 justify-between py-6 max-h-[84px] rounded-card',
                className,
              ),
              style: {
                background: CategoryHeaderColor,
              },
            },
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'flex flex-row overflow-hidden items-center space-x-4',
              },
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className:
                    'flex justify-center flex-shrink-0 items-center w-9 h-9 rounded-full border border-white',
                },
                /*#__PURE__*/ React.createElement(
                  _assets__WEBPACK_IMPORTED_MODULE_0__.CategoryIcon,
                  {
                    className: 'w-5 h-5 fill-current path-no-filled text-white opacity-100',
                    'aria-hidden': 'true',
                  },
                ),
              ),
              /*#__PURE__*/ React.createElement(
                'p',
                {
                  className: 'text-white font-semibold truncate',
                },
                department === null || department === void 0 ? void 0 : department.name,
              ),
            ),
          );
        };

        /***/
      },

    /***/ './src/category/CategoryPage.tsx':
      /*!***************************************!*\
  !*** ./src/category/CategoryPage.tsx ***!
  \***************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ CategoryPage: function () {
            return /* binding */ CategoryPage;
          },
          /* harmony export */
        });
        /* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/assets */ './src/assets/index.ts',
        );
        /* harmony import */ var _auth_RestrictedAccess__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! @/auth/RestrictedAccess */ './src/auth/RestrictedAccess.tsx');
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! @/common/constants */ './src/common/constants.ts');
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! @/common/utils */ './src/common/utils/index.ts',
        );
        /* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! @/error */ './src/error/index.ts',
        );
        /* harmony import */ var _feed_useLineItems__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(/*! @/feed/useLineItems */ './src/feed/useLineItems.ts');
        /* harmony import */ var _layout_MainLayout__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(/*! @/layout/MainLayout */ './src/layout/MainLayout.tsx');
        /* harmony import */ var _main_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
          /*! @/main/utils */ './src/main/utils.ts',
        );
        /* harmony import */ var _mixpanel_useMixPanel__WEBPACK_IMPORTED_MODULE_10__ =
          __webpack_require__(/*! @/mixpanel/useMixPanel */ './src/mixpanel/useMixPanel.ts');
        /* harmony import */ var _profile_useProfile__WEBPACK_IMPORTED_MODULE_11__ =
          __webpack_require__(/*! @/profile/useProfile */ './src/profile/useProfile.ts');
        /* harmony import */ var _spending_GroupedSpendingChart__WEBPACK_IMPORTED_MODULE_12__ =
          __webpack_require__(
            /*! @/spending/GroupedSpendingChart */ './src/spending/GroupedSpendingChart.tsx',
          );
        /* harmony import */ var _spending_GroupedSpendingChartLegends__WEBPACK_IMPORTED_MODULE_13__ =
          __webpack_require__(
            /*! @/spending/GroupedSpendingChartLegends */ './src/spending/GroupedSpendingChartLegends.tsx',
          );
        /* harmony import */ var _spending_SpendingBarChart__WEBPACK_IMPORTED_MODULE_14__ =
          __webpack_require__(
            /*! @/spending/SpendingBarChart */ './src/spending/SpendingBarChart.tsx',
          );
        /* harmony import */ var _spending_utils__WEBPACK_IMPORTED_MODULE_15__ =
          __webpack_require__(/*! @/spending/utils */ './src/spending/utils.ts');
        /* harmony import */ var _team_constants__WEBPACK_IMPORTED_MODULE_16__ =
          __webpack_require__(/*! @/team/constants */ './src/team/constants.ts');
        /* harmony import */ var _transactions_TransactionList__WEBPACK_IMPORTED_MODULE_17__ =
          __webpack_require__(
            /*! @/transactions/TransactionList */ './src/transactions/TransactionList/index.tsx',
          );
        /* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(
          /*! lodash-es */ './node_modules/lodash-es/sumBy.js',
        );
        /* harmony import */ var mixpanel_browser__WEBPACK_IMPORTED_MODULE_18__ =
          __webpack_require__(
            /*! mixpanel-browser */ './node_modules/mixpanel-browser/dist/mixpanel.cjs.js',
          );
        /* harmony import */ var mixpanel_browser__WEBPACK_IMPORTED_MODULE_18___default =
          /*#__PURE__*/ __webpack_require__.n(mixpanel_browser__WEBPACK_IMPORTED_MODULE_18__);
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_23__ =
          __webpack_require__(
            /*! react-router-dom */ './node_modules/react-router/esm/react-router.js',
          );
        /* harmony import */ var _CategoryHeader__WEBPACK_IMPORTED_MODULE_20__ =
          __webpack_require__(/*! ./CategoryHeader */ './src/category/CategoryHeader.tsx');
        /* harmony import */ var _useCategory__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
          /*! ./useCategory */ './src/category/useCategory.ts',
        );
        /* harmony import */ var _useCategorySpendingsReport__WEBPACK_IMPORTED_MODULE_22__ =
          __webpack_require__(
            /*! ./useCategorySpendingsReport */ './src/category/useCategorySpendingsReport.ts',
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

        var CategoryPage = function CategoryPage() {
          var _React$useState = react__WEBPACK_IMPORTED_MODULE_19__.useState(),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            hoveredItemId = _React$useState2[0],
            setHoveredItemId = _React$useState2[1];
          var _useUrlState = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_4__.useUrlState)(
              'sortTransactionsBy',
              _team_constants__WEBPACK_IMPORTED_MODULE_16__.DEFAULT_SORT,
            ),
            _useUrlState2 = _slicedToArray(_useUrlState, 2),
            sortTransactionsBy = _useUrlState2[0],
            setSortTransactionsBy = _useUrlState2[1];
          var _useState = (0, react__WEBPACK_IMPORTED_MODULE_19__.useState)('year-to-date'),
            _useState2 = _slicedToArray(_useState, 2),
            dateRange = _useState2[0],
            setDateRange = _useState2[1];
          var _ref = (0, react_router_dom__WEBPACK_IMPORTED_MODULE_23__.useParams)(),
            categoryIdParam = _ref.categoryId;
          var categoryId = +categoryIdParam;
          var _useCategory = (0, _useCategory__WEBPACK_IMPORTED_MODULE_21__.useCategory)(
              categoryId,
            ),
            vendor = _useCategory.data,
            isValidatingVendor = _useCategory.isValidating,
            error = _useCategory.error;
          var _useState3 = (0, react__WEBPACK_IMPORTED_MODULE_19__.useState)(undefined),
            _useState4 = _slicedToArray(_useState3, 2),
            groupBy = _useState4[0],
            setGroupBy = _useState4[1];
          var _useCategorySpendings = (0,
            _useCategorySpendingsReport__WEBPACK_IMPORTED_MODULE_22__.useCategorySpendingsReport)(
              categoryId,
              {
                groupBy: groupBy,
              },
            ),
            categorySpendingsReport = _useCategorySpendings.categorySpendingsReport,
            curYearSpends = _useCategorySpendings.curYearSpends,
            prevYearSpends = _useCategorySpendings.prevYearSpends,
            isValidatingCategorySpendingsReport =
              _useCategorySpendings.isValidatingCategorySpendingsReport;
          var totalSpend = (0, lodash_es__WEBPACK_IMPORTED_MODULE_24__['default'])(
            curYearSpends,
            'total',
          );
          var totalSpendLastYear = (0, lodash_es__WEBPACK_IMPORTED_MODULE_24__['default'])(
            prevYearSpends,
            'total',
          );
          var _useState5 = (0, react__WEBPACK_IMPORTED_MODULE_19__.useState)(1),
            _useState6 = _slicedToArray(_useState5, 2),
            page = _useState6[0],
            setPage = _useState6[1];
          var _useLineItems = (0, _feed_useLineItems__WEBPACK_IMPORTED_MODULE_7__.useLineItems)(
              _objectSpread(
                _objectSpread(
                  {
                    props: [
                      {
                        id: categoryId,
                        type: 'CATEGORY',
                        name: '',
                        exclude: false,
                      },
                    ],
                    limit:
                      _common_constants__WEBPACK_IMPORTED_MODULE_3__.DEFAULT_ITEMS_PER_INFINITE_LOAD,
                    offset:
                      (page - 1) *
                      _common_constants__WEBPACK_IMPORTED_MODULE_3__.DEFAULT_ITEMS_PER_INFINITE_LOAD,
                  },
                  (0, _spending_utils__WEBPACK_IMPORTED_MODULE_15__.convertDateRangeToFromTo)({
                    dateRange: dateRange,
                  }),
                ),
                _common_utils__WEBPACK_IMPORTED_MODULE_5__.StringUtils.toApiSortParam(
                  sortTransactionsBy !== null && sortTransactionsBy !== void 0
                    ? sortTransactionsBy
                    : '',
                ),
              ),
            ),
            transactions = _useLineItems.lineItems,
            isValidatingTransactions = _useLineItems.isValidatingLineItems,
            totalLineItemsCount = _useLineItems.totalLineItemsCount;
          var _useProfile = (0, _profile_useProfile__WEBPACK_IMPORTED_MODULE_11__.useProfile)(),
            profile = _useProfile.profile;
          (0, _common_hooks__WEBPACK_IMPORTED_MODULE_4__.useMountEffect)(function () {
            var _profile$company;
            mixpanel_browser__WEBPACK_IMPORTED_MODULE_18___default().track('Category Page View', {
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
            _mixpanel_useMixPanel__WEBPACK_IMPORTED_MODULE_10__.identifyMixPanelUserProfile)(profile);
          });
          var isForbidden =
            (error === null || error === void 0 ? void 0 : error.code) ===
            _error__WEBPACK_IMPORTED_MODULE_6__.ApiErrorCode.Forbidden;
          if (isForbidden)
            return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
              _layout_MainLayout__WEBPACK_IMPORTED_MODULE_8__.MainLayout,
              null,
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
                _auth_RestrictedAccess__WEBPACK_IMPORTED_MODULE_1__.RestrictedAccessPage,
                null,
              ),
            );
          if (!categorySpendingsReport) return null;
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
            _layout_MainLayout__WEBPACK_IMPORTED_MODULE_8__.MainLayout,
            null,
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
              _CategoryHeader__WEBPACK_IMPORTED_MODULE_20__.CategoryHeader,
              {
                categoryId: categoryId,
              },
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
              _common_components__WEBPACK_IMPORTED_MODULE_2__.OverlayLoader,
              {
                loading: isValidatingVendor || isValidatingCategorySpendingsReport,
                className: 'mt-6',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
                'div',
                {
                  className: 'rounded-card shadow-card px-6 py-4 bg-white',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
                  'div',
                  {
                    className: 'flex justify-between',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
                    'h3',
                    {
                      className: 'text-primary font-bold',
                    },
                    vendor === null || vendor === void 0 ? void 0 : vendor.name,
                  ),
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
                    'div',
                    {
                      className: 'flex space-x-2 items-center',
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
                      'p',
                      {
                        className: 'text-xs text-primary',
                      },
                      'Group By',
                    ),
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
                      _common_components__WEBPACK_IMPORTED_MODULE_2__.Select,
                      {
                        className: 'border border-solid border-Gray-11 rounded',
                        value: groupBy,
                        onChange: function onChange(value) {
                          return setGroupBy(value);
                        },
                        options: [
                          {
                            label: 'None',
                            value: '',
                          },
                          {
                            label: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
                              'div',
                              {
                                className: 'flex items-center gap-2',
                              },
                              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
                                _assets__WEBPACK_IMPORTED_MODULE_0__.TeamIcon,
                                null,
                              ),
                              'Team',
                            ),
                            value: 'DEPARTMENT',
                          },
                          {
                            label: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
                              'div',
                              {
                                className: 'flex items-center gap-2',
                              },
                              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
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
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
                  'div',
                  {
                    className: 'flex gap-4 mt-2',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
                    'div',
                    null,
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
                      'div',
                      {
                        className: 'flex gap-1 items-center text-xs text-Gray-6',
                      },
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement('div', {
                        className: 'w-1.5 h-1.5 rounded bg-Accent-2',
                      }),
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
                        'span',
                        null,
                        'Spend',
                      ),
                    ),
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
                      'p',
                      {
                        className: 'text-primary font-bold font-sm',
                      },
                      (0, _main_utils__WEBPACK_IMPORTED_MODULE_9__.getDisplayUsdAmount)(totalSpend),
                    ),
                  ),
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
                    'div',
                    null,
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
                      'div',
                      {
                        className: 'flex gap-1 items-center text-xs text-Gray-6',
                      },
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement('div', {
                        className: 'w-1.5 h-1.5 rounded bg-Gray-6',
                      }),
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
                        'span',
                        null,
                        'Last Year',
                      ),
                    ),
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
                      'p',
                      {
                        className: 'text-primary font-bold font-sm',
                      },
                      (0, _main_utils__WEBPACK_IMPORTED_MODULE_9__.getDisplayUsdAmount)(
                        totalSpendLastYear,
                      ),
                    ),
                  ),
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
                  'div',
                  {
                    className: 'flex gap-8 h-full items-stretch',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
                    'div',
                    {
                      className:
                        'h-[400px] mt-8 flex-1 border border-Gray-12 rounded-lg px-4 pt-10 pb-6',
                    },
                    !groupBy
                      ? /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
                          _spending_SpendingBarChart__WEBPACK_IMPORTED_MODULE_14__.SpendingBarChart,
                          {
                            thisYearData: curYearSpends,
                            lastYearData: prevYearSpends,
                          },
                        )
                      : /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
                          _spending_GroupedSpendingChart__WEBPACK_IMPORTED_MODULE_12__.GroupedSpendingChart,
                          {
                            data: categorySpendingsReport,
                            highlightedItemId: hoveredItemId,
                          },
                        ),
                  ),
                  !!groupBy &&
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
                      _spending_GroupedSpendingChartLegends__WEBPACK_IMPORTED_MODULE_13__.GroupedSpendingChartLegends,
                      {
                        spendings: curYearSpends,
                        groupBy: groupBy,
                        highlightedItemId: hoveredItemId,
                        onItemMouseEnter: setHoveredItemId,
                        onItemMouseLeave: function onItemMouseLeave() {
                          return setHoveredItemId(undefined);
                        },
                        dateRange: dateRange,
                      },
                    ),
                ),
              ),
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_19__.createElement(
              _transactions_TransactionList__WEBPACK_IMPORTED_MODULE_17__.TransactionList,
              {
                className: 'mt-6',
                onPageChange: setPage,
                transactions: transactions,
                loading: isValidatingTransactions,
                hiddenColumns: ['categoryName'],
                dateRange: dateRange,
                onDateRangeChange: setDateRange,
                sort: sortTransactionsBy,
                onSortChange: setSortTransactionsBy,
                totalCount: totalLineItemsCount,
                disableTransactionButton: true,
                defaultExpand: true,
              },
            ),
          );
        };

        /***/
      },

    /***/ './src/category/useCategory.ts':
      /*!*************************************!*\
  !*** ./src/category/useCategory.ts ***!
  \*************************************/
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
        /* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/error */ './src/error/index.ts',
        );
        /* harmony import */ var _apis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ./apis */ './src/category/apis.ts',
        );

        var useCategory = function useCategory(id) {
          return (0, _common_hooks__WEBPACK_IMPORTED_MODULE_0__.useFetcher)(
            !!id && ['category', id],
            function () {
              return _apis__WEBPACK_IMPORTED_MODULE_2__.CategoryApis.get(id);
            },
            {
              onError: function onError(error) {
                if (error.code === _error__WEBPACK_IMPORTED_MODULE_1__.ApiErrorCode.Forbidden) {
                  return false;
                }
              },
            },
          );
        };

        /***/
      },

    /***/ './src/category/useCategorySpendingsReport.ts':
      /*!****************************************************!*\
  !*** ./src/category/useCategorySpendingsReport.ts ***!
  \****************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ useCategorySpendingsReport: function () {
            return /* binding */ useCategorySpendingsReport;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var _common_utils_date__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! @/common/utils/date */ './src/common/utils/date.ts');
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var _apis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! ./apis */ './src/category/apis.ts',
        );

        var useCategorySpendingsReport = function useCategorySpendingsReport(id, params) {
          var _useFetcher = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_0__.useFetcher)(
              ['useCategorySpendingsReport', id, params],
              function () {
                return _apis__WEBPACK_IMPORTED_MODULE_3__.CategoryApis.getSpendingsReport(
                  id,
                  params,
                );
              },
            ),
            data = _useFetcher.data,
            isInitializing = _useFetcher.isInitializing,
            isValidating = _useFetcher.isValidating,
            mutate = _useFetcher.mutate;
          var curYearSpends = react__WEBPACK_IMPORTED_MODULE_2__.useMemo(
            function () {
              var _data$filter;
              return (_data$filter =
                data === null || data === void 0
                  ? void 0
                  : data.filter(function (_ref) {
                      var year = _ref.year;
                      return (
                        year === (0, _common_utils_date__WEBPACK_IMPORTED_MODULE_1__.getThisYear)()
                      );
                    })) !== null && _data$filter !== void 0
                ? _data$filter
                : [];
            },
            [data],
          );
          var prevYearSpends = react__WEBPACK_IMPORTED_MODULE_2__.useMemo(
            function () {
              var _data$filter2;
              return (_data$filter2 =
                data === null || data === void 0
                  ? void 0
                  : data.filter(function (_ref2) {
                      var year = _ref2.year;
                      return (
                        year ===
                        (0, _common_utils_date__WEBPACK_IMPORTED_MODULE_1__.getThisYear)() - 1
                      );
                    })) !== null && _data$filter2 !== void 0
                ? _data$filter2
                : [];
            },
            [data],
          );
          return react__WEBPACK_IMPORTED_MODULE_2__.useMemo(
            function () {
              return {
                categorySpendingsReport: data,
                curYearSpends: curYearSpends,
                prevYearSpends: prevYearSpends,
                isInitializingCategorySpendingsReport: isInitializing,
                isValidatingCategorySpendingsReport: isValidating,
                mutateCategorySpendingsReport: mutate,
              };
            },
            [curYearSpends, data, isInitializing, isValidating, mutate, prevYearSpends],
          );
        };

        /***/
      },

    /***/ './src/feed/useLineItems.ts':
      /*!**********************************!*\
  !*** ./src/feed/useLineItems.ts ***!
  \**********************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ useLineItems: function () {
            return /* binding */ useLineItems;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var _apis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! ./apis */ './src/feed/apis.ts',
        );

        var useLineItems = function useLineItems(params) {
          var _lineItemsData$lineIt;
          var _useFetcher = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_0__.useFetcher)(
              ['purchaseOrderLineItems', params],
              function () {
                return _apis__WEBPACK_IMPORTED_MODULE_1__.FeedApis.getLineItems(params);
              },
              {
                laggy: true,
              },
            ),
            lineItemsData = _useFetcher.data,
            isInitializingLineItems = _useFetcher.isInitializing,
            isValidatingLineItems = _useFetcher.isValidating;
          return {
            lineItems:
              (_lineItemsData$lineIt =
                lineItemsData === null || lineItemsData === void 0
                  ? void 0
                  : lineItemsData.lineItems) !== null && _lineItemsData$lineIt !== void 0
                ? _lineItemsData$lineIt
                : [],
            totalLineItemsCount:
              lineItemsData === null || lineItemsData === void 0
                ? void 0
                : lineItemsData.totalCount,
            isInitializingLineItems: isInitializingLineItems,
            isValidatingLineItems: isValidatingLineItems,
          };
        };

        /***/
      },
  },
]);
//# sourceMappingURL=src_category_CategoryPage_tsx.bundle.js.map
