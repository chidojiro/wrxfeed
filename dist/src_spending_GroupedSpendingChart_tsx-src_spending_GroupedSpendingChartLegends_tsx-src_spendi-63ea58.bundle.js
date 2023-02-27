'use strict';
(self['webpackChunkgravity_web'] = self['webpackChunkgravity_web'] || []).push([
  [
    'src_spending_GroupedSpendingChart_tsx-src_spending_GroupedSpendingChartLegends_tsx-src_spendi-63ea58',
  ],
  {
    /***/ './src/spending/GroupedSpendingChart.tsx':
      /*!***********************************************!*\
  !*** ./src/spending/GroupedSpendingChart.tsx ***!
  \***********************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ GroupedSpendingChart: function () {
            return /* binding */ GroupedSpendingChart;
          },
          /* harmony export */
        });
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var _SpendingChartV2__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ./SpendingChartV2 */ './src/spending/SpendingChartV2/index.ts');
        /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ./utils */ './src/spending/utils.ts',
        );

        var OTHER_COLOR = '#B2B7BB';
        var GroupedSpendingChart = function GroupedSpendingChart(_ref) {
          var data = _ref.data,
            highlightedItemId = _ref.highlightedItemId,
            dateRange = _ref.dateRange,
            target = _ref.target;
          var top10TotalSpendings = (
            dateRange
              ? (0, _utils__WEBPACK_IMPORTED_MODULE_2__.getSortedTotalSpendings)(data, dateRange)
              : []
          ).slice(0, 10);
          var chartData = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
            function () {
              if (!dateRange) return [];
              return (0, _utils__WEBPACK_IMPORTED_MODULE_2__.getChartDataByDateRange)(
                data,
                dateRange,
              );
            },
            [data, dateRange],
          );
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
            _SpendingChartV2__WEBPACK_IMPORTED_MODULE_1__.SpendingChartV2,
            {
              data: chartData,
              dateRange: dateRange,
              highlightedDataKey:
                highlightedItemId &&
                !top10TotalSpendings
                  .map(function (_ref2) {
                    var id = _ref2.id;
                    return id;
                  })
                  .includes(highlightedItemId)
                  ? -1
                  : highlightedItemId,
              charts: [
                {
                  type: 'BAR',
                  color: '#EFF0F2',
                  dataKey: 'previousYearTotal',
                },
                {
                  type: 'BAR',
                  color: '',
                  stackedBars: [
                    top10TotalSpendings.map(function (_ref3) {
                      var id = _ref3.id,
                        color = _ref3.color;
                      return {
                        dataKey: id.toString(),
                        color: color,
                      };
                    }),
                    {
                      dataKey: '-1',
                      color: OTHER_COLOR,
                    },
                  ].flat(),
                },
                target && {
                  type: 'AREA',
                  stroke: '#374151',
                  dataKey: 'target',
                  fill: 'transparent',
                },
              ].filter(Boolean),
            },
          );
        };

        /***/
      },

    /***/ './src/spending/GroupedSpendingChartLegends.tsx':
      /*!******************************************************!*\
  !*** ./src/spending/GroupedSpendingChartLegends.tsx ***!
  \******************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ GroupedSpendingChartLegends: function () {
            return /* binding */ GroupedSpendingChartLegends;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var _main_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @/main/utils */ './src/main/utils.ts',
        );
        /* harmony import */ var _role_useRestrictedItems__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! @/role/useRestrictedItems */ './src/role/useRestrictedItems.ts');
        /* harmony import */ var _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(
            /*! @heroicons/react/outline */ './node_modules/@heroicons/react/outline/esm/ChevronDownIcon.js',
          );
        /* harmony import */ var _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_9__ =
          __webpack_require__(
            /*! @heroicons/react/outline */ './node_modules/@heroicons/react/outline/esm/ChevronUpIcon.js',
          );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! lodash-es */ './node_modules/lodash-es/isEqual.js',
        );
        /* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! react-router-dom */ './node_modules/react-router/esm/react-router.js',
          );
        /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! ./utils */ './src/spending/utils.ts',
        );

        var LabelsByGroupBy = {
          DEPARTMENT: 'Teams',
          CATEGORY: 'Categories',
          VENDOR: 'Vendors',
        };
        var GroupedSpendingChartLegends = function GroupedSpendingChartLegends(_ref) {
          var spendings = _ref.spendings,
            groupBy = _ref.groupBy,
            highlightedItemId = _ref.highlightedItemId,
            className = _ref.className,
            onItemMouseEnter = _ref.onItemMouseEnter,
            onItemMouseLeave = _ref.onItemMouseLeave,
            dateRange = _ref.dateRange;
          var sortedTotalSpendings = (0,
          _utils__WEBPACK_IMPORTED_MODULE_5__.getSortedTotalSpendings)(spendings, dateRange);
          var showOthersDisclosure = (0,
          _common_hooks__WEBPACK_IMPORTED_MODULE_1__.useDisclosure)();
          var _useRestrictedItems = (0,
            _role_useRestrictedItems__WEBPACK_IMPORTED_MODULE_3__.useRestrictedItems)(),
            restrictedItems = _useRestrictedItems.restrictedItems;
          var history = (0, react_router_dom__WEBPACK_IMPORTED_MODULE_6__.useHistory)();
          var isRestricted = function isRestricted(id, type) {
            return !!restrictedItems.find(function (item) {
              return (0, lodash_es__WEBPACK_IMPORTED_MODULE_7__['default'])(
                {
                  id: id,
                  type: type,
                },
                item,
              );
            });
          };
          var handleRedirectUrl = function handleRedirectUrl(id) {
            if (groupBy === 'CATEGORY') {
              history.push('/categories/'.concat(id));
            }
            if (groupBy === 'VENDOR') {
              history.push('/vendors/'.concat(id));
            }
            if (groupBy === 'DEPARTMENT') {
              history.push('/departments/'.concat(id));
            }
          };
          var firstTen = sortedTotalSpendings.flat().slice(0, 10);
          var remaining = sortedTotalSpendings.flat().slice(10);
          return /*#__PURE__*/ React.createElement(
            'div',
            {
              className: (0, clsx__WEBPACK_IMPORTED_MODULE_4__['default'])(
                'flex flex-col',
                className,
              ),
            },
            /*#__PURE__*/ React.createElement(
              'h3',
              {
                className: 'font-semibold h-5 flex items-end',
              },
              LabelsByGroupBy[groupBy],
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className:
                  'border border-Gray-12 rounded-lg p-2 min-w-[180px] mt-3 text-[10px] flex flex-col flex-1 overflow-auto max-h-[400px]',
              },
              firstTen
                .filter(function (_ref2) {
                  var id = _ref2.id;
                  return !isRestricted(id !== null && id !== void 0 ? id : 0, groupBy);
                })
                .flat()
                .map(function (_ref3) {
                  var color = _ref3.color,
                    id = _ref3.id,
                    name = _ref3.name,
                    total = _ref3.total;
                  return /*#__PURE__*/ React.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_0__.Button,
                    {
                      key: id,
                      className: (0, clsx__WEBPACK_IMPORTED_MODULE_4__['default'])(
                        'flex items-center justify-between gap-2 py-1',
                        {
                          'opacity-30': highlightedItemId && highlightedItemId !== id,
                        },
                      ),
                      onMouseEnter: function onMouseEnter() {
                        return onItemMouseEnter === null || onItemMouseEnter === void 0
                          ? void 0
                          : onItemMouseEnter(id);
                      },
                      onMouseLeave: onItemMouseLeave,
                      onClick: function onClick() {
                        return handleRedirectUrl(id);
                      },
                    },
                    /*#__PURE__*/ React.createElement(
                      'div',
                      {
                        className: 'flex items-center gap-2',
                      },
                      /*#__PURE__*/ React.createElement('div', {
                        className: 'w-1.5 h-1.5 rounded-full flex-shrink-0',
                        style: {
                          background: color,
                        },
                      }),
                      /*#__PURE__*/ React.createElement(
                        'span',
                        {
                          className: 'break-words text-left',
                        },
                        name,
                      ),
                    ),
                    /*#__PURE__*/ React.createElement(
                      'span',
                      {
                        className: 'text-Gray-3',
                      },
                      (0, _main_utils__WEBPACK_IMPORTED_MODULE_2__.getDisplayUsdAmount)(total),
                    ),
                  );
                }),
              !!remaining.length &&
                /*#__PURE__*/ React.createElement(
                  React.Fragment,
                  null,
                  /*#__PURE__*/ React.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_0__.Button,
                    {
                      onClick: showOthersDisclosure.toggle,
                      className: 'flex gap-1 my-1 -left-0.5 relative',
                    },
                    !showOthersDisclosure.isOpen
                      ? /*#__PURE__*/ React.createElement(
                          _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_8__['default'],
                          {
                            width: 14,
                          },
                        )
                      : /*#__PURE__*/ React.createElement(
                          _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_9__['default'],
                          {
                            width: 14,
                          },
                        ),
                    'Other',
                  ),
                  showOthersDisclosure.isOpen &&
                    remaining
                      .filter(function (_ref4) {
                        var id = _ref4.id;
                        return !isRestricted(id !== null && id !== void 0 ? id : 0, groupBy);
                      })
                      .flat()
                      .map(function (_ref5) {
                        var color = _ref5.color,
                          id = _ref5.id,
                          name = _ref5.name,
                          total = _ref5.total;
                        return /*#__PURE__*/ React.createElement(
                          _common_components__WEBPACK_IMPORTED_MODULE_0__.Button,
                          {
                            key: id,
                            className: (0, clsx__WEBPACK_IMPORTED_MODULE_4__['default'])(
                              'flex items-center justify-between gap-2 py-1',
                              {
                                'opacity-30': highlightedItemId && highlightedItemId !== id,
                              },
                            ),
                            onMouseEnter: function onMouseEnter() {
                              return onItemMouseEnter === null || onItemMouseEnter === void 0
                                ? void 0
                                : onItemMouseEnter(id);
                            },
                            onMouseLeave: onItemMouseLeave,
                            onClick: function onClick() {
                              return handleRedirectUrl(id);
                            },
                          },
                          /*#__PURE__*/ React.createElement(
                            'div',
                            {
                              className: 'flex items-center gap-2',
                            },
                            /*#__PURE__*/ React.createElement('div', {
                              className: 'w-1.5 h-1.5 rounded-full flex-shrink-0',
                              style: {
                                background: color,
                              },
                            }),
                            /*#__PURE__*/ React.createElement(
                              'span',
                              {
                                className: 'break-words text-left',
                              },
                              name,
                            ),
                          ),
                          /*#__PURE__*/ React.createElement(
                            'span',
                            {
                              className: 'text-Gray-3',
                            },
                            (0, _main_utils__WEBPACK_IMPORTED_MODULE_2__.getDisplayUsdAmount)(
                              total,
                            ),
                          ),
                        );
                      }),
                ),
            ),
          );
        };

        /***/
      },

    /***/ './src/spending/SpendingBarChart.tsx':
      /*!*******************************************!*\
  !*** ./src/spending/SpendingBarChart.tsx ***!
  \*******************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ SpendingBarChart: function () {
            return /* binding */ SpendingBarChart;
          },
          /* harmony export */
        });
        /* harmony import */ var _main_chart_utils__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/main/chart.utils */ './src/main/chart.utils.ts');
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! dayjs */ './node_modules/dayjs/dayjs.min.js',
        );
        /* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2___default =
          /*#__PURE__*/ __webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_2__);
        /* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! recharts */ './node_modules/recharts/es6/component/ResponsiveContainer.js',
        );
        /* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! recharts */ './node_modules/recharts/es6/chart/ComposedChart.js',
        );
        /* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! recharts */ './node_modules/recharts/es6/cartesian/Bar.js',
        );
        /* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          /*! recharts */ './node_modules/recharts/es6/cartesian/YAxis.js',
        );
        /* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
          /*! recharts */ './node_modules/recharts/es6/component/Tooltip.js',
        );
        /* harmony import */ var _TooltipContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! ./TooltipContent */ './src/spending/TooltipContent.tsx',
        );
        /* harmony import */ var _XAxis__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! ./XAxis */ './src/spending/XAxis.tsx',
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

        var MIN_Y_VALUE = 100;
        var SpendingBarChart = function SpendingBarChart(_ref) {
          var thisYearData = _ref.thisYearData,
            lastYearData = _ref.lastYearData;
          var maxValue = Math.max.apply(
            Math,
            _toConsumableArray(
              thisYearData.map(function (_ref2) {
                var total = _ref2.total;
                return total;
              }),
            ).concat(
              _toConsumableArray(
                lastYearData.map(function (_ref3) {
                  var total = _ref3.total;
                  return total;
                }),
              ),
              [MIN_Y_VALUE],
            ),
          );
          var maxValueWithSurplus = Math.ceil(maxValue * 1.1);
          var maxValueForChart = Math.max(maxValueWithSurplus, MIN_Y_VALUE);
          var chartLevels = (0, _main_chart_utils__WEBPACK_IMPORTED_MODULE_0__.getChartLevels)(
            maxValueForChart,
          );
          var data = new Array(12).fill(null).map(function (_, idx) {
            var _thisYearData$find$to,
              _thisYearData$find,
              _thisYearData$find$to2,
              _lastYearData$find$to,
              _lastYearData$find,
              _lastYearData$find$to2;
            return {
              name: dayjs__WEBPACK_IMPORTED_MODULE_2___default()().set('month', idx).format('MMM'),
              month: idx + 1,
              thisYear:
                (_thisYearData$find$to =
                  (_thisYearData$find = thisYearData.find(function (_ref4) {
                    var month = _ref4.month;
                    return month === idx + 1;
                  })) === null || _thisYearData$find === void 0
                    ? void 0
                    : (_thisYearData$find$to2 = _thisYearData$find.total) === null ||
                      _thisYearData$find$to2 === void 0
                    ? void 0
                    : _thisYearData$find$to2.toFixed(2)) !== null &&
                _thisYearData$find$to !== void 0
                  ? _thisYearData$find$to
                  : 0,
              lastYear:
                (_lastYearData$find$to =
                  (_lastYearData$find = lastYearData.find(function (_ref5) {
                    var month = _ref5.month;
                    return month === idx + 1;
                  })) === null || _lastYearData$find === void 0
                    ? void 0
                    : (_lastYearData$find$to2 = _lastYearData$find.total) === null ||
                      _lastYearData$find$to2 === void 0
                    ? void 0
                    : _lastYearData$find$to2.toFixed(2)) !== null &&
                _lastYearData$find$to !== void 0
                  ? _lastYearData$find$to
                  : 0,
            };
          });
          return /*#__PURE__*/ React.createElement(
            'div',
            {
              className: (0, clsx__WEBPACK_IMPORTED_MODULE_1__['default'])(
                'flex flex-col w-full h-full',
              ),
            },
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'flex relative flex-col flex-1',
              },
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className:
                    'absolute top-[-3px] flex w-full h-full justify-between flex-col-reverse',
                },
                chartLevels.map(function (level) {
                  var textColor =
                    level !== null && level !== void 0 && level.isTarget
                      ? 'text-Accent-2'
                      : 'text-Gray-6';
                  return /*#__PURE__*/ React.createElement(
                    'div',
                    {
                      key: 'dataLevels-'.concat(
                        level === null || level === void 0 ? void 0 : level.id,
                      ),
                      className: 'flex flex-row space-x-4 items-center w-full',
                    },
                    /*#__PURE__*/ React.createElement(
                      'p',
                      {
                        className: (0, clsx__WEBPACK_IMPORTED_MODULE_1__['default'])(
                          'text-xs font-semibold text-right w-8',
                          textColor,
                        ),
                      },
                      level === null || level === void 0 ? void 0 : level.title,
                    ),
                    /*#__PURE__*/ React.createElement('div', {
                      className: (0, clsx__WEBPACK_IMPORTED_MODULE_1__['default'])(
                        'flex flex-1 w-auto h-px',
                        level !== null && level !== void 0 && level.isTarget
                          ? 'dashed-line'
                          : 'bg-Gray-11',
                      ),
                    }),
                  );
                }),
              ),
              /*#__PURE__*/ React.createElement(
                recharts__WEBPACK_IMPORTED_MODULE_5__.ResponsiveContainer,
                {
                  width: '100%',
                  height: '100%',
                },
                /*#__PURE__*/ React.createElement(
                  recharts__WEBPACK_IMPORTED_MODULE_6__.ComposedChart,
                  {
                    width: 500,
                    height: 300,
                    data: data,
                    margin: {
                      top: 5,
                      right: 10,
                      left: 50,
                      bottom: 10,
                    },
                    barGap: -36,
                  },
                  /*#__PURE__*/ React.createElement(recharts__WEBPACK_IMPORTED_MODULE_7__.Bar, {
                    name: 'lastYear',
                    dataKey: 'lastYear',
                    fill: '#EFF0F2',
                    barSize: 24,
                  }),
                  /*#__PURE__*/ React.createElement(recharts__WEBPACK_IMPORTED_MODULE_7__.Bar, {
                    name: 'thisYear',
                    dataKey: 'thisYear',
                    fill: '#6565FB',
                    barSize: 24,
                  }),
                  /*#__PURE__*/ React.createElement(recharts__WEBPACK_IMPORTED_MODULE_8__.YAxis, {
                    domain: [0, maxValueForChart],
                    width: 0,
                    height: 0,
                    className: 'opacity-0',
                  }),
                  /*#__PURE__*/ React.createElement(recharts__WEBPACK_IMPORTED_MODULE_9__.Tooltip, {
                    cursor: {
                      fill: 'transparent',
                    },
                    position: {
                      y: 5,
                    },
                    content: function content(props) {
                      return /*#__PURE__*/ React.createElement(
                        _TooltipContent__WEBPACK_IMPORTED_MODULE_3__.TooltipContent,
                        _extends({}, props, {
                          showTarget: false,
                          overallTarget: true,
                        }),
                      );
                    },
                  }),
                ),
              ),
            ),
            /*#__PURE__*/ React.createElement(_XAxis__WEBPACK_IMPORTED_MODULE_4__.XAxis, {
              startMonth: 1,
              endMonth: 12,
              bar: true,
            }),
          );
        };

        /***/
      },

    /***/ './src/spending/SpendingChartV2/SpendingChartV2.tsx':
      /*!**********************************************************!*\
  !*** ./src/spending/SpendingChartV2/SpendingChartV2.tsx ***!
  \**********************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ SpendingChartV2: function () {
            return /* binding */ SpendingChartV2;
          },
          /* harmony export */
        });
        /* harmony import */ var _main_chart_utils__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/main/chart.utils */ './src/main/chart.utils.ts');
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! recharts */ './node_modules/recharts/es6/cartesian/Bar.js',
        );
        /* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! recharts */ './node_modules/recharts/es6/component/Cell.js',
        );
        /* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! recharts */ './node_modules/recharts/es6/cartesian/XAxis.js',
        );
        /* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          /*! recharts */ './node_modules/recharts/es6/component/ResponsiveContainer.js',
        );
        /* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
          /*! recharts */ './node_modules/recharts/es6/chart/ComposedChart.js',
        );
        /* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
          /*! recharts */ './node_modules/recharts/es6/cartesian/YAxis.js',
        );
        /* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
          /*! recharts */ './node_modules/recharts/es6/component/Tooltip.js',
        );
        /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! ../utils */ './src/spending/utils.ts',
        );
        /* harmony import */ var _TooltipContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! ./TooltipContent */ './src/spending/SpendingChartV2/TooltipContent.tsx',
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

        var MIN_Y_VALUE = 100;
        function CustomizedTick(props) {
          var x = props.x,
            y = props.y,
            payload = props.payload,
            hoveredIndex = props.hoveredIndex;
          var value = payload.value,
            index = payload.index;
          var _value$toString$split =
              value === null || value === void 0 ? void 0 : value.toString().split('\n'),
            _value$toString$split2 = _slicedToArray(_value$toString$split, 2),
            line1 = _value$toString$split2[0],
            line2 = _value$toString$split2[1];
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
            'g',
            {
              transform: 'translate('.concat(x, ',').concat(y, ')'),
              className: 'text-xs font-semibold',
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
              'text',
              {
                x: 0,
                y: 0,
                dy: 10,
                fill: '#7D8490',
                className: (0, clsx__WEBPACK_IMPORTED_MODULE_1__['default'])({
                  'opacity-50': typeof hoveredIndex === 'number' && hoveredIndex !== index,
                }),
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
                'tspan',
                {
                  textAnchor: 'middle',
                  x: '0',
                },
                line1,
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
                'tspan',
                {
                  textAnchor: 'middle',
                  x: '0',
                  dy: '12',
                },
                line2,
              ),
            ),
          );
        }
        var SpendingChartV2 = function SpendingChartV2(_ref) {
          var data = _ref.data,
            charts = _ref.charts,
            dateRange = _ref.dateRange,
            highlightedDataKey = _ref.highlightedDataKey;
          var _React$useState = react__WEBPACK_IMPORTED_MODULE_2__.useState(),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            hoveredIndex = _React$useState2[0],
            setHoveredIndex = _React$useState2[1];
          var timelineUnit = dateRange
            ? (0, _utils__WEBPACK_IMPORTED_MODULE_3__.getChartTimelineUnit)(dateRange)
            : 'month';
          var getCellOpacity = function getCellOpacity(index, dataKey) {
            if (hoveredIndex && hoveredIndex !== index) {
              return 0.5;
            }
            if (highlightedDataKey && highlightedDataKey !== dataKey) {
              return 0.2;
            }
            return 1;
          };
          var maxValue = Math.max.apply(
            Math,
            _toConsumableArray(
              data.map(function (_ref2) {
                var currentYearTotal = _ref2.currentYearTotal;
                return currentYearTotal;
              }),
            ).concat(
              _toConsumableArray(
                data.map(function (_ref3) {
                  var previousYearTotal = _ref3.previousYearTotal;
                  return previousYearTotal;
                }),
              ),
              [MIN_Y_VALUE],
            ),
          );
          var maxValueWithSurplus = Math.ceil(maxValue * 1.1);
          var maxValueForChart = Math.max(maxValueWithSurplus, MIN_Y_VALUE);
          var chartLevels = (0, _main_chart_utils__WEBPACK_IMPORTED_MODULE_0__.getChartLevels)(
            maxValueForChart,
          );
          var isSlimBar = data.length > 13;
          var defaultBarSize = react__WEBPACK_IMPORTED_MODULE_2__.useMemo(
            function () {
              if (isSlimBar) return 8;
              return 24;
            },
            [isSlimBar],
          );
          var renderBar = function renderBar(chartInfo) {
            if (!chartInfo.stackedBars) {
              var _chartInfo$dataKey, _chartInfo$width;
              return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
                recharts__WEBPACK_IMPORTED_MODULE_5__.Bar,
                {
                  dataKey:
                    (_chartInfo$dataKey = chartInfo.dataKey) !== null &&
                    _chartInfo$dataKey !== void 0
                      ? _chartInfo$dataKey
                      : '',
                  name: chartInfo.title,
                  barSize:
                    (_chartInfo$width = chartInfo.width) !== null && _chartInfo$width !== void 0
                      ? _chartInfo$width
                      : defaultBarSize,
                  color: chartInfo.color,
                  fill: chartInfo.color,
                  textAnchor: 'start',
                },
                data.map(function (_, index) {
                  return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
                    recharts__WEBPACK_IMPORTED_MODULE_6__.Cell,
                    {
                      key: index,
                      color: chartInfo.color,
                      fill: chartInfo.color,
                      opacity: getCellOpacity(index, chartInfo.dataKey ? +chartInfo.dataKey : 0),
                    },
                  );
                }),
              );
            }
            return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
              react__WEBPACK_IMPORTED_MODULE_2__.Fragment,
              null,
              chartInfo.stackedBars.map(function (_ref4) {
                var _chartInfo$stackId, _chartInfo$width2;
                var color = _ref4.color,
                  dataKey = _ref4.dataKey,
                  title = _ref4.title;
                return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
                  recharts__WEBPACK_IMPORTED_MODULE_5__.Bar,
                  {
                    key: dataKey,
                    stackId:
                      (_chartInfo$stackId = chartInfo.stackId) !== null &&
                      _chartInfo$stackId !== void 0
                        ? _chartInfo$stackId
                        : 'stacked-bar',
                    dataKey: dataKey,
                    name: title,
                    barSize:
                      (_chartInfo$width2 = chartInfo.width) !== null && _chartInfo$width2 !== void 0
                        ? _chartInfo$width2
                        : defaultBarSize,
                    color: color,
                    fill: color,
                    textAnchor: 'start',
                  },
                  data.map(function (_, index) {
                    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
                      recharts__WEBPACK_IMPORTED_MODULE_6__.Cell,
                      {
                        key: index,
                        color: color,
                        fill: color,
                        opacity: getCellOpacity(
                          index,
                          !isNaN(Number(dataKey)) ? Number(dataKey) : undefined,
                        ),
                      },
                    );
                  }),
                );
              }),
            );
          };
          var renderCharts = function renderCharts() {
            return charts.map(function (chart) {
              if (chart.type === 'BAR') return renderBar(chart);
              return null;
            });
          };
          var getInterval = function getInterval() {
            if (isSlimBar) return 1;
            return 0;
          };
          var renderXAxis = function renderXAxis() {
            return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
              recharts__WEBPACK_IMPORTED_MODULE_7__.XAxis,
              {
                dataKey: 'name',
                tick: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
                  CustomizedTick,
                  {
                    hoveredIndex: hoveredIndex,
                  },
                ),
                tickLine: false,
                height: 22,
                interval: getInterval(),
                axisLine: false,
                style: {
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#7D8490',
                  whiteSpace: 'pre-line',
                },
              },
            );
          };
          var barGap = react__WEBPACK_IMPORTED_MODULE_2__.useMemo(
            function () {
              if (isSlimBar) return -14;
              return -36;
            },
            [isSlimBar],
          );
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
            'div',
            {
              className: (0, clsx__WEBPACK_IMPORTED_MODULE_1__['default'])(
                'flex flex-col w-full h-full',
              ),
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
              'div',
              {
                className: 'flex relative flex-col flex-1 max-h-[400px]',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
                'div',
                {
                  className:
                    'absolute top-[-3px] flex w-full h-full justify-between flex-col-reverse pb-[22px]',
                },
                chartLevels.map(function (level) {
                  var textColor =
                    level !== null && level !== void 0 && level.isTarget
                      ? 'text-Accent-2'
                      : 'text-Gray-6';
                  return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
                    'div',
                    {
                      key: 'dataLevels-'.concat(
                        level === null || level === void 0 ? void 0 : level.id,
                      ),
                      className: 'flex flex-row space-x-4 items-center w-full',
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
                      'p',
                      {
                        className: (0, clsx__WEBPACK_IMPORTED_MODULE_1__['default'])(
                          'text-xs font-semibold text-right w-8',
                          textColor,
                        ),
                      },
                      level === null || level === void 0 ? void 0 : level.title,
                    ),
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement('div', {
                      className: (0, clsx__WEBPACK_IMPORTED_MODULE_1__['default'])(
                        'flex flex-1 w-auto h-px',
                        level !== null && level !== void 0 && level.isTarget
                          ? 'dashed-line'
                          : 'bg-Gray-11',
                      ),
                    }),
                  );
                }),
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
                recharts__WEBPACK_IMPORTED_MODULE_8__.ResponsiveContainer,
                {
                  width: '100%',
                  height: '100%',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
                  recharts__WEBPACK_IMPORTED_MODULE_9__.ComposedChart,
                  {
                    width: 500,
                    height: 300,
                    data: data,
                    margin: {
                      top: 5,
                      right: 10,
                      left: 50,
                      bottom: 10,
                    },
                    barGap: barGap,
                    onMouseMove: function onMouseMove(data) {
                      return setHoveredIndex(data.activeTooltipIndex);
                    },
                    onMouseLeave: function onMouseLeave() {
                      return setHoveredIndex(undefined);
                    },
                  },
                  renderCharts(),
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
                    recharts__WEBPACK_IMPORTED_MODULE_10__.YAxis,
                    {
                      domain: [0, maxValueForChart],
                      width: 0,
                      height: 0,
                      className: 'opacity-0',
                    },
                  ),
                  renderXAxis(),
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
                    recharts__WEBPACK_IMPORTED_MODULE_11__.Tooltip,
                    {
                      cursor: {
                        fill: 'transparent',
                      },
                      position: {
                        y: 5,
                      },
                      content: function content(props) {
                        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
                          _TooltipContent__WEBPACK_IMPORTED_MODULE_4__.TooltipContent,
                          _extends({}, props, {
                            showTarget: false,
                            overallTarget: true,
                          }),
                        );
                      },
                    },
                  ),
                ),
              ),
            ),
          );
        };

        /***/
      },

    /***/ './src/spending/SpendingChartV2/TooltipContent.tsx':
      /*!*********************************************************!*\
  !*** ./src/spending/SpendingChartV2/TooltipContent.tsx ***!
  \*********************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ TooltipContent: function () {
            return /* binding */ TooltipContent;
          },
          /* harmony export */
        });
        /* harmony import */ var _main_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/main/utils */ './src/main/utils.ts',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );

        var MonthLabels = {
          Jan: 'January',
          Feb: 'February',
          Mar: 'March',
          Apr: 'April',
          May: 'May',
          Jun: 'June',
          Jul: 'July',
          Aug: 'August',
          Sep: 'September',
          Oct: 'October',
          Nov: 'November',
          Dec: 'December',
        };
        var TooltipContent = function TooltipContent(_ref) {
          var active = _ref.active,
            payload = _ref.payload;
          if (active && payload) {
            var _payload$, _dataPoints$currentYe, _dataPoints$previousY;
            var dataPoints =
              (_payload$ = payload[0]) === null || _payload$ === void 0
                ? void 0
                : _payload$.payload;
            return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
              'div',
              {
                className: 'flex bg-primary p-2 rounded-sm text-white text-[11px]',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                'div',
                {
                  className: 'flex flex-col w-[224px]',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                  'div',
                  {
                    className: 'flex flex-row items-center',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                    'p',
                    {
                      className: 'font-semibold',
                    },
                    MonthLabels[dataPoints.name],
                  ),
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                  'div',
                  {
                    key: 'this-year',
                    className: 'flex flex-row flex-grow justify-between items-center space-x-10',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                    'div',
                    {
                      className: 'flex flex-row items-center space-x-1',
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                      'p',
                      null,
                      'Current',
                    ),
                  ),
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                    'p',
                    {
                      className: 'text-right font-semibold',
                    },
                    (0, _main_utils__WEBPACK_IMPORTED_MODULE_0__.decimalLogic)(
                      (_dataPoints$currentYe =
                        dataPoints === null || dataPoints === void 0
                          ? void 0
                          : dataPoints.currentYearTotal) !== null &&
                        _dataPoints$currentYe !== void 0
                        ? _dataPoints$currentYe
                        : 0,
                      _main_utils__WEBPACK_IMPORTED_MODULE_0__.DecimalType.SummedNumbers,
                      '$',
                    ),
                  ),
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                  'div',
                  {
                    key: 'last-year',
                    className: 'flex flex-row flex-grow justify-between items-center space-x-10',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                    'div',
                    {
                      className: 'flex flex-row items-center space-x-1',
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                      'p',
                      null,
                      'Last Year',
                    ),
                  ),
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                    'p',
                    {
                      className: 'text-right font-semibold',
                    },
                    (0, _main_utils__WEBPACK_IMPORTED_MODULE_0__.decimalLogic)(
                      (_dataPoints$previousY =
                        dataPoints === null || dataPoints === void 0
                          ? void 0
                          : dataPoints.previousYearTotal) !== null &&
                        _dataPoints$previousY !== void 0
                        ? _dataPoints$previousY
                        : 0,
                      _main_utils__WEBPACK_IMPORTED_MODULE_0__.DecimalType.SummedNumbers,
                      '$',
                    ),
                  ),
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                  'div',
                  {
                    className: 'mt-1',
                  },
                  payload.slice(1).map(function (data) {
                    var _data$payload$items$f, _ref2;
                    return (
                      !!data.value &&
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                        'div',
                        {
                          key: data.name,
                          className: 'flex items-center justify-between',
                        },
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                          'div',
                          {
                            className: 'flex items-center gap-1',
                          },
                          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement('div', {
                            className: 'w-1 h-1 rounded-full flex-shrink-0',
                            style: {
                              background: data.color,
                            },
                          }),
                          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                            'span',
                            {
                              className: 'break-words',
                            },
                            (_data$payload$items$f = data.payload.items.find(function (item) {
                              return item.id.toString() === data.dataKey;
                            })) === null || _data$payload$items$f === void 0
                              ? void 0
                              : _data$payload$items$f.name,
                          ),
                        ),
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                          'div',
                          {
                            className: 'flex-shrink-0',
                          },
                          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                            'span',
                            {
                              className: 'font-semibold',
                            },
                            (0, _main_utils__WEBPACK_IMPORTED_MODULE_0__.decimalLogic)(
                              (_ref2 = data.value) !== null && _ref2 !== void 0 ? _ref2 : 0,
                              _main_utils__WEBPACK_IMPORTED_MODULE_0__.DecimalType.SummedNumbers,
                              '$',
                            ),
                          ),
                          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                            'span',
                            null,
                            ' ',
                            '(',
                            Math.round((+data.value * 100) / dataPoints.currentYearTotal),
                            ')%',
                          ),
                        ),
                      )
                    );
                  }),
                ),
              ),
            );
          }
          return null;
        };

        /***/
      },

    /***/ './src/spending/SpendingChartV2/index.ts':
      /*!***********************************************!*\
  !*** ./src/spending/SpendingChartV2/index.ts ***!
  \***********************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ SpendingChartV2: function () {
            return /* reexport safe */ _SpendingChartV2__WEBPACK_IMPORTED_MODULE_1__.SpendingChartV2;
          },
          /* harmony export */
        });
        /* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! ./types */ './src/spending/SpendingChartV2/types.ts',
        );
        /* harmony import */ var _SpendingChartV2__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./SpendingChartV2 */ './src/spending/SpendingChartV2/SpendingChartV2.tsx',
          );

        /***/
      },

    /***/ './src/spending/SpendingChartV2/types.ts':
      /*!***********************************************!*\
  !*** ./src/spending/SpendingChartV2/types.ts ***!
  \***********************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);

        /***/
      },
  },
]);
//# sourceMappingURL=src_spending_GroupedSpendingChart_tsx-src_spending_GroupedSpendingChartLegends_tsx-src_spendi-63ea58.bundle.js.map
