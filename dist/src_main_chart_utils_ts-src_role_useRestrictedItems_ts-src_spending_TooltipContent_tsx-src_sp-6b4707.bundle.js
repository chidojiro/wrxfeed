'use strict';
(self['webpackChunkgravity_web'] = self['webpackChunkgravity_web'] || []).push([
  [
    'src_main_chart_utils_ts-src_role_useRestrictedItems_ts-src_spending_TooltipContent_tsx-src_sp-6b4707',
  ],
  {
    /***/ './src/main/chart.utils.ts':
      /*!*********************************!*\
  !*** ./src/main/chart.utils.ts ***!
  \*********************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ getChartLevels: function () {
            return /* binding */ getChartLevels;
          },
          /* harmony export */ getLastYearSpending: function () {
            return /* binding */ getLastYearSpending;
          },
          /* harmony export */ getLineChartDataInMonth: function () {
            return /* binding */ getLineChartDataInMonth;
          },
          /* harmony export */ getSpendingByYear: function () {
            return /* binding */ getSpendingByYear;
          },
          /* harmony export */ getTargetMonthsLineChartData: function () {
            return /* binding */ getTargetMonthsLineChartData;
          },
          /* harmony export */ getThisYearSpending: function () {
            return /* binding */ getThisYearSpending;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/constants */ './src/common/constants.ts');
        /* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/common/utils */ './src/common/utils/index.ts',
        );
        /* harmony import */ var _target_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @/target/types */ './src/target/types.ts',
        );
        /* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! dayjs */ './node_modules/dayjs/dayjs.min.js',
        );
        /* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_3___default =
          /*#__PURE__*/ __webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_3__);
        /* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! lodash-es */ './node_modules/lodash-es/range.js',
        );
        /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! ./utils */ './src/main/utils.ts',
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
        /* eslint-disable no-param-reassign */

        var Accent6 = '#818CF8';
        var DATA_DATE_FORMAT = 'MMM DD';
        var BILLION = Math.pow(10, 9);
        var MILLION = Math.pow(10, 6);
        var THOUSAND = Math.pow(10, 3);
        var getYearSpending = function getYearSpending(spendings, year) {
          var _spendings$filter$red;
          return (_spendings$filter$red =
            spendings === null || spendings === void 0
              ? void 0
              : spendings
                  .filter(function (cur) {
                    return cur.year === year;
                  })
                  .reduce(function (acc, _ref) {
                    var total = _ref.total;
                    return total + acc;
                  }, 0)) !== null && _spendings$filter$red !== void 0
            ? _spendings$filter$red
            : 0;
        };
        var getThisYearSpending = function getThisYearSpending(spendings) {
          return getYearSpending(
            spendings,
            _common_utils__WEBPACK_IMPORTED_MODULE_1__.DateUtils.getThisYear(),
          );
        };
        var getLastYearSpending = function getLastYearSpending(spendings) {
          return getYearSpending(
            spendings,
            _common_utils__WEBPACK_IMPORTED_MODULE_1__.DateUtils.getThisYear() - 1,
          );
        };
        var getLineChartDataInMonth = function getLineChartDataInMonth(
          target,
          targetMonth,
          trackingStatus,
          overallTarget,
        ) {
          var _target$spendings, _target$spendings2, _targetMonth$amount, _targetMonth$amount4;
          var targetDate = dayjs__WEBPACK_IMPORTED_MODULE_3___default()().set(
            'month',
            targetMonth.month - 1,
          );
          var isThisMonth =
            dayjs__WEBPACK_IMPORTED_MODULE_3___default()().month() === targetMonth.month - 1;
          var totalThisYear = getThisYearSpending(
            (_target$spendings = target.spendings) !== null && _target$spendings !== void 0
              ? _target$spendings
              : [],
          );
          var totalLastYear = getLastYearSpending(
            (_target$spendings2 = target.spendings) !== null && _target$spendings2 !== void 0
              ? _target$spendings2
              : [],
          );
          var data = Array(targetDate.daysInMonth())
            .fill({
              name: '',
              thisYear: 0,
              lastYear: 0,
              target:
                (_targetMonth$amount = targetMonth.amount) !== null &&
                _targetMonth$amount !== void 0
                  ? _targetMonth$amount
                  : 0,
            })
            .map(function (_, index) {
              var _targetMonth$amount3;
              var dayName = dayjs__WEBPACK_IMPORTED_MODULE_3___default()(targetDate)
                .date(index + 1)
                .format(DATA_DATE_FORMAT);

              // Don't draw data line if date index greater than today
              if (isThisMonth && index > targetDate.date() - 1) {
                var _targetMonth$amount2;
                return {
                  name: dayName,
                  lastYear: totalLastYear,
                  target:
                    (_targetMonth$amount2 = targetMonth.amount) !== null &&
                    _targetMonth$amount2 !== void 0
                      ? _targetMonth$amount2
                      : 0,
                };
              }
              return {
                name: dayName,
                thisYear: totalThisYear,
                lastYear: totalLastYear,
                target:
                  (_targetMonth$amount3 = targetMonth.amount) !== null &&
                  _targetMonth$amount3 !== void 0
                    ? _targetMonth$amount3
                    : 0,
              };
            });
          var dotStatusColor = '#34D399';
          var backgroundStatusColor = '#D1FAE5';
          if (trackingStatus) {
            var _TargetStatusConfig$t =
                _target_types__WEBPACK_IMPORTED_MODULE_2__.TargetStatusConfig[trackingStatus],
              dot = _TargetStatusConfig$t.dot,
              background = _TargetStatusConfig$t.background;
            dotStatusColor = dot;
            backgroundStatusColor = background;
          }
          var lines = [
            {
              name: 'target',
              type: 'monotone',
              dataKey: 'target',
              strokeWidth: 2,
              strokeDasharray: '8 8',
              stroke: '#7D8490',
              fill: '#FFFFFF',
              dot: false,
            },
            {
              name: 'lastYear',
              type: 'monotone',
              dataKey: 'lastYear',
              strokeWidth: 0,
              stroke: 'rgba(194, 194, 250, 0.6)',
              dot: false,
              fill: 'rgba(194, 194, 250, 0.6)',
              opacity: 0.8,
            },
            {
              name: 'thisYear',
              type: 'monotone',
              dataKey: 'thisYear',
              strokeWidth: 3,
              stroke: overallTarget !== 0 ? dotStatusColor : Accent6,
              dot: false,
              fill: overallTarget !== 0 ? backgroundStatusColor : Accent6,
            },
          ];
          var maxValue = Math.max(
            totalThisYear,
            totalLastYear,
            (_targetMonth$amount4 = targetMonth.amount) !== null && _targetMonth$amount4 !== void 0
              ? _targetMonth$amount4
              : 0,
          );
          var positiveMax = Math.abs(maxValue);
          if (positiveMax >= BILLION) {
            maxValue = Math.ceil(positiveMax / BILLION) * BILLION; // Billion
          }

          if (positiveMax >= MILLION) {
            maxValue = Math.ceil(positiveMax / MILLION) * MILLION; // Millions
          }

          if (positiveMax >= THOUSAND) {
            var remember = THOUSAND;
            maxValue = Math.ceil(positiveMax / THOUSAND); // Thousands
            maxValue = Math.ceil(maxValue / 5) * 5 * remember;
          }
          return {
            data: data,
            legends: [],
            lines: lines,
            maxValue: maxValue,
          };
        };
        var getChartLevels = function getChartLevels(maxValue) {
          // const maxAndTarget = maxValue - targetAmount;
          var numberLevel = 5; // Math.floor(maxValue / maxAndTarget);
          // if (numberLevel > 5) {
          //   numberLevel = 5;
          // }
          // if (numberLevel < 4) {
          //   numberLevel *= 2;
          // }
          var levelValue = maxValue / numberLevel;
          var levels = [];
          for (var index = 0; index < numberLevel + 1; index += 1) {
            var valueForThisLevel = Math.ceil(levelValue * index);
            levels.push({
              id: index,
              value: valueForThisLevel,
              title: (0, _utils__WEBPACK_IMPORTED_MODULE_4__.decimalLogic)(
                valueForThisLevel,
                _utils__WEBPACK_IMPORTED_MODULE_4__.DecimalType.ChartAxis,
                '$',
              ),
              isTarget: false,
            });
          }
          return levels;
        };
        var getTargetMonthsLineChartData = function getTargetMonthsLineChartData(
          target,
          targetMonths,
          trackingStatus,
          overallTarget,
        ) {
          var _target$spendings$fil,
            _target$spendings3,
            _target$spendings$fil2,
            _target$spendings4,
            _availableTargets$0$m,
            _availableTargets$,
            _availableTargets$mon,
            _availableTargets;
          if (!target) return _common_constants__WEBPACK_IMPORTED_MODULE_0__.INITIAL_CHART_DATA;
          var monthFormat = 'MMM';
          var thisMonth = dayjs__WEBPACK_IMPORTED_MODULE_3___default()().month();
          var cumulativeThisYear = 0;
          var cumulativeLastYear = 0;
          var cumulativeTarget = 0;
          var thisYearSpendings =
            (_target$spendings$fil =
              (_target$spendings3 = target.spendings) === null || _target$spendings3 === void 0
                ? void 0
                : _target$spendings3.filter(function (item) {
                    return (
                      item.year ===
                      _common_utils__WEBPACK_IMPORTED_MODULE_1__.DateUtils.getThisYear()
                    );
                  })) !== null && _target$spendings$fil !== void 0
              ? _target$spendings$fil
              : [];
          var lastYearSpendings =
            (_target$spendings$fil2 =
              (_target$spendings4 = target.spendings) === null || _target$spendings4 === void 0
                ? void 0
                : _target$spendings4.filter(function (item) {
                    return (
                      item.year ===
                      _common_utils__WEBPACK_IMPORTED_MODULE_1__.DateUtils.getThisYear() - 1
                    );
                  })) !== null && _target$spendings$fil2 !== void 0
              ? _target$spendings$fil2
              : [];
          var thisYearSorted =
            thisYearSpendings === null || thisYearSpendings === void 0
              ? void 0
              : thisYearSpendings.sort(function (a, b) {
                  var _a$month, _b$month;
                  return (
                    ((_a$month = a === null || a === void 0 ? void 0 : a.month) !== null &&
                    _a$month !== void 0
                      ? _a$month
                      : 0) -
                    ((_b$month = b === null || b === void 0 ? void 0 : b.month) !== null &&
                    _b$month !== void 0
                      ? _b$month
                      : 0)
                  );
                });
          var lastYearSorted = (0, lodash_es__WEBPACK_IMPORTED_MODULE_5__['default'])(0, 12).map(
            function (monthIdx) {
              var _thisYearSpendings$;
              var lastYearData = lastYearSpendings.find(function (e) {
                return (e === null || e === void 0 ? void 0 : e.month) - 1 === monthIdx;
              });
              return (
                lastYearData || {
                  year:
                    ((_thisYearSpendings$ = thisYearSpendings[0]) === null ||
                    _thisYearSpendings$ === void 0
                      ? void 0
                      : _thisYearSpendings$.year) ||
                    dayjs__WEBPACK_IMPORTED_MODULE_3___default()().year() - 1,
                  month: monthIdx + 1,
                  total: 0,
                }
              );
            },
          );

          // Find start / end month
          var availableTargets = targetMonths.filter(function (item) {
            return (item === null || item === void 0 ? void 0 : item.amount) !== undefined;
          });
          var startMonth =
            (_availableTargets$0$m =
              (_availableTargets$ = availableTargets[0]) === null || _availableTargets$ === void 0
                ? void 0
                : _availableTargets$.month) !== null && _availableTargets$0$m !== void 0
              ? _availableTargets$0$m
              : 1;
          var endMonth =
            (_availableTargets$mon =
              (_availableTargets = availableTargets[availableTargets.length - 1]) === null ||
              _availableTargets === void 0
                ? void 0
                : _availableTargets.month) !== null && _availableTargets$mon !== void 0
              ? _availableTargets$mon
              : 12;
          var data = targetMonths.reduce(function (preVal, target, index) {
            var _thisYearSorted$find$,
              _thisYearSorted$find,
              _lastYearSorted$find$,
              _lastYearSorted$find,
              _target$amount;
            // Out of month range
            if (target.month < startMonth || target.month > endMonth) {
              return preVal;
            }
            var month = dayjs__WEBPACK_IMPORTED_MODULE_3___default()()
              .month(index)
              .format(monthFormat);
            // Calculate cumulative values
            cumulativeThisYear += (0, _common_utils__WEBPACK_IMPORTED_MODULE_1__.round)(
              (_thisYearSorted$find$ =
                (_thisYearSorted$find = thisYearSorted.find(function (_ref2) {
                  var month = _ref2.month;
                  return month === target.month;
                })) === null || _thisYearSorted$find === void 0
                  ? void 0
                  : _thisYearSorted$find.total) !== null && _thisYearSorted$find$ !== void 0
                ? _thisYearSorted$find$
                : 0,
              2,
            );
            cumulativeLastYear += (0, _common_utils__WEBPACK_IMPORTED_MODULE_1__.round)(
              (_lastYearSorted$find$ =
                (_lastYearSorted$find = lastYearSorted.find(function (_ref3) {
                  var month = _ref3.month;
                  return month === target.month;
                })) === null || _lastYearSorted$find === void 0
                  ? void 0
                  : _lastYearSorted$find.total) !== null && _lastYearSorted$find$ !== void 0
                ? _lastYearSorted$find$
                : 0,
              2,
            );
            cumulativeTarget += (0, _common_utils__WEBPACK_IMPORTED_MODULE_1__.round)(
              (_target$amount = target === null || target === void 0 ? void 0 : target.amount) !==
                null && _target$amount !== void 0
                ? _target$amount
                : 0,
              2,
            );

            // Generate data point
            var dataPoint =
              index > thisMonth
                ? {
                    name: month,
                    lastYear: cumulativeLastYear,
                    target: cumulativeTarget,
                  }
                : {
                    name: month,
                    thisYear: cumulativeThisYear,
                    lastYear: cumulativeLastYear,
                    target: cumulativeTarget,
                  };
            return [].concat(_toConsumableArray(preVal), [dataPoint]);
          }, []);

          // Duplicate data point to draw a line if there is one data point
          if (data.length === 1) {
            data = [data[0], data[0]];
          }

          // Data points is 0 (target wasn't set) => show previous year and current year spending data
          if (data.length === 0) {
            data = lastYearSorted.map(function (lastYearData, index) {
              var _thisYearSorted$index, _thisYearSorted$index2, _lastYearData$total;
              var month = dayjs__WEBPACK_IMPORTED_MODULE_3___default()()
                .month(index)
                .format(monthFormat);
              // Calculate cumulative values
              cumulativeThisYear += (0, _common_utils__WEBPACK_IMPORTED_MODULE_1__.round)(
                (_thisYearSorted$index =
                  (_thisYearSorted$index2 = thisYearSorted[index]) === null ||
                  _thisYearSorted$index2 === void 0
                    ? void 0
                    : _thisYearSorted$index2.total) !== null && _thisYearSorted$index !== void 0
                  ? _thisYearSorted$index
                  : 0,
                2,
              );
              cumulativeLastYear += (0, _common_utils__WEBPACK_IMPORTED_MODULE_1__.round)(
                (_lastYearData$total =
                  lastYearData === null || lastYearData === void 0
                    ? void 0
                    : lastYearData.total) !== null && _lastYearData$total !== void 0
                  ? _lastYearData$total
                  : 0,
                2,
              );
              return index > thisMonth
                ? {
                    name: month,
                    lastYear: cumulativeLastYear,
                    target: 0,
                  }
                : {
                    name: month,
                    thisYear: cumulativeThisYear,
                    lastYear: cumulativeLastYear,
                    target: 0,
                  };
            });
          }
          var maxValue = Math.max(cumulativeThisYear, cumulativeLastYear, cumulativeTarget);
          var dotStatusColor = '#34D399';
          var backgroundStatusColor = '#D1FAE5';
          if (trackingStatus) {
            var _TargetStatusConfig$t2 =
                _target_types__WEBPACK_IMPORTED_MODULE_2__.TargetStatusConfig[trackingStatus],
              dot = _TargetStatusConfig$t2.dot,
              background = _TargetStatusConfig$t2.background;
            dotStatusColor = dot;
            backgroundStatusColor = background;
          }
          var lines = [
            {
              name: 'target',
              type: 'monotone',
              dataKey: 'target',
              strokeWidth: 2,
              strokeDasharray: '8 8',
              stroke: '#7D8490',
              fill: '#FFFFFF',
              dot: false,
            },
            {
              name: 'lastYear',
              type: 'monotone',
              dataKey: 'lastYear',
              strokeWidth: 0,
              stroke: 'rgba(194, 194, 250, 0.6)',
              dot: false,
              fill: 'rgba(194, 194, 250, 0.6)',
              opacity: 0.8,
            },
            {
              name: 'thisYear',
              type: 'monotone',
              dataKey: 'thisYear',
              strokeWidth: 3,
              stroke: overallTarget !== 0 ? dotStatusColor : Accent6,
              dot: false,
              fill: overallTarget !== 0 ? backgroundStatusColor : Accent6,
            },
          ];
          return {
            data: data,
            legends: [],
            lines: lines,
            maxValue: maxValue,
            metadata: {
              currentSpend: cumulativeThisYear,
            },
          };
        };
        var getSpendingByYear = function getSpendingByYear(spendings) {
          if (!spendings) {
            return {
              thisYear: [],
              lastYear: [],
            };
          }
          var THIS_YEAR = _common_utils__WEBPACK_IMPORTED_MODULE_1__.DateUtils.getThisYear();
          var thisYear =
            spendings === null || spendings === void 0
              ? void 0
              : spendings.filter(function (item) {
                  if (item.year === THIS_YEAR) {
                    return {
                      month: item.month,
                      year: item.year,
                      threshold: item.total,
                    };
                  }
                  return false;
                });
          var lastYear =
            spendings === null || spendings === void 0
              ? void 0
              : spendings.filter(function (item) {
                  if (item.year === THIS_YEAR - 1) {
                    return {
                      month: item.month,
                      year: item.year,
                      threshold: item.total,
                    };
                  }
                  return false;
                });
          return {
            thisYear: thisYear !== null && thisYear !== void 0 ? thisYear : [],
            lastYear: lastYear !== null && lastYear !== void 0 ? lastYear : [],
          };
        };

        /***/
      },

    /***/ './src/role/apis.ts':
      /*!**************************!*\
  !*** ./src/role/apis.ts ***!
  \**************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ RoleApis: function () {
            return /* binding */ RoleApis;
          },
          /* harmony export */
        });
        /* harmony import */ var _rest_apis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/rest/apis */ './src/rest/apis.ts',
        );
        /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! ./utils */ './src/role/utils.ts',
        );

        var get = function get(id) {
          return _rest_apis__WEBPACK_IMPORTED_MODULE_0__.RestApis.get(
            '/rbac/roles/'.concat(id),
          ).then(_utils__WEBPACK_IMPORTED_MODULE_1__.transformRoleResponse);
        };
        var getList = function getList() {
          return _rest_apis__WEBPACK_IMPORTED_MODULE_0__.RestApis.get('/rbac/roles').then(function (
            roles,
          ) {
            return roles.map(_utils__WEBPACK_IMPORTED_MODULE_1__.transformRoleResponse);
          });
        };
        var create = function create(payload) {
          return _rest_apis__WEBPACK_IMPORTED_MODULE_0__.RestApis.post('/rbac/roles', payload);
        };
        var update = function update(id, payload) {
          return _rest_apis__WEBPACK_IMPORTED_MODULE_0__.RestApis.put(
            '/rbac/roles/'.concat(id),
            payload,
          );
        };
        var _delete = function _delete(id) {
          return _rest_apis__WEBPACK_IMPORTED_MODULE_0__.RestApis['delete'](
            '/rbac/roles/'.concat(id),
          );
        };
        var updateAssigned = function updateAssigned(id, payload) {
          return _rest_apis__WEBPACK_IMPORTED_MODULE_0__.RestApis.put(
            '/rbac/accounts/'.concat(id, '/roles'),
            payload,
          );
        };
        var getCategories = function getCategories() {
          return _rest_apis__WEBPACK_IMPORTED_MODULE_0__.RestApis.get('/rbac/categories');
        };
        var getDepartments = function getDepartments() {
          return _rest_apis__WEBPACK_IMPORTED_MODULE_0__.RestApis.get('/rbac/departments');
        };
        var getVendors = function getVendors() {
          return _rest_apis__WEBPACK_IMPORTED_MODULE_0__.RestApis.get('/rbac/vendors');
        };
        var getRestrictedItems = function getRestrictedItems() {
          return _rest_apis__WEBPACK_IMPORTED_MODULE_0__.RestApis.get(
            '/rbac/items?type=restricted',
          );
        };
        var RoleApis = {
          get: get,
          getList: getList,
          create: create,
          update: update,
          delete: _delete,
          updateAssigned: updateAssigned,
          getCategories: getCategories,
          getDepartments: getDepartments,
          getVendors: getVendors,
          getRestrictedItems: getRestrictedItems,
        };

        /***/
      },

    /***/ './src/role/useRestrictedItems.ts':
      /*!****************************************!*\
  !*** ./src/role/useRestrictedItems.ts ***!
  \****************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ useRestrictedItems: function () {
            return /* binding */ useRestrictedItems;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/constants */ './src/common/constants.ts');
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var _apis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! ./apis */ './src/role/apis.ts',
        );

        var useRestrictedItems = function useRestrictedItems() {
          var _useFetcher = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_1__.useFetcher)(
              ['useRestrictedItems'],
              function () {
                return _apis__WEBPACK_IMPORTED_MODULE_3__.RoleApis.getRestrictedItems();
              },
            ),
            _useFetcher$data = _useFetcher.data,
            data =
              _useFetcher$data === void 0
                ? _common_constants__WEBPACK_IMPORTED_MODULE_0__.EMPTY_ARRAY
                : _useFetcher$data,
            isInitializing = _useFetcher.isInitializing,
            isLagging = _useFetcher.isLagging,
            isValidating = _useFetcher.isValidating,
            mutate = _useFetcher.mutate;
          return react__WEBPACK_IMPORTED_MODULE_2__.useMemo(
            function () {
              return {
                restrictedItems: data,
                isInitializingRestrictedItems: isInitializing,
                isLaggingRestrictedItems: isLagging,
                isValidatingRestrictedItems: isValidating,
                mutateRestrictedItems: mutate,
              };
            },
            [data, isInitializing, isLagging, isValidating, mutate],
          );
        };

        /***/
      },

    /***/ './src/role/utils.ts':
      /*!***************************!*\
  !*** ./src/role/utils.ts ***!
  \***************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ isAdmin: function () {
            return /* binding */ isAdmin;
          },
          /* harmony export */ isBaseUser: function () {
            return /* binding */ isBaseUser;
          },
          /* harmony export */ transformRoleResponse: function () {
            return /* binding */ transformRoleResponse;
          },
          /* harmony export */
        });
        /* harmony import */ var _auth_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/auth/constants */ './src/auth/constants.ts',
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

        var transformVisibilityConfig = function transformVisibilityConfig(config) {
          return _objectSpread(
            _objectSpread({}, config),
            {},
            {
              default: config.resettable ? !config.visible : config.visible,
            },
          );
        };
        var transformRoleResponse = function transformRoleResponse(data) {
          var categories = data.categories,
            departments = data.departments,
            vendors = data.vendors;
          return _objectSpread(
            _objectSpread({}, data),
            {},
            {
              categories:
                categories === null || categories === void 0
                  ? void 0
                  : categories.map(transformVisibilityConfig),
              departments:
                departments === null || departments === void 0
                  ? void 0
                  : departments.map(transformVisibilityConfig),
              vendors:
                vendors === null || vendors === void 0
                  ? void 0
                  : vendors.map(transformVisibilityConfig),
            },
          );
        };
        var isAdmin = function isAdmin(role) {
          return role.name === _auth_constants__WEBPACK_IMPORTED_MODULE_0__.UserRole.ADMIN;
        };
        var isBaseUser = function isBaseUser(role) {
          return role.id === 0;
        };

        /***/
      },

    /***/ './src/spending/TooltipContent.tsx':
      /*!*****************************************!*\
  !*** ./src/spending/TooltipContent.tsx ***!
  \*****************************************/
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
        /* harmony import */ var _target_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/target/types */ './src/target/types.ts',
        );

        var TooltipContent = function TooltipContent(_ref) {
          var active = _ref.active,
            payload = _ref.payload,
            showTarget = _ref.showTarget,
            trackingStatus = _ref.trackingStatus,
            overallTarget = _ref.overallTarget;
          if (active && payload) {
            var _payload$,
              _dataPoints$name,
              _dataPoints$target,
              _dataPoints$thisYear,
              _dataPoints$lastYear;
            var dataPoints =
              (_payload$ = payload[0]) === null || _payload$ === void 0
                ? void 0
                : _payload$.payload;
            return /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'flex bg-primary p-2 rounded-sm',
              },
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'flex flex-col space-y-1',
                },
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'flex flex-row items-center',
                  },
                  /*#__PURE__*/ React.createElement(
                    'p',
                    {
                      className: 'text-white text-3xs font-semibold',
                    },
                    (_dataPoints$name =
                      dataPoints === null || dataPoints === void 0 ? void 0 : dataPoints.name) !==
                      null && _dataPoints$name !== void 0
                      ? _dataPoints$name
                      : 'unknown',
                  ),
                ),
                showTarget &&
                  /*#__PURE__*/ React.createElement(
                    'div',
                    {
                      key: 'target',
                      className: 'flex flex-row flex-grow justify-between items-center space-x-10',
                    },
                    /*#__PURE__*/ React.createElement(
                      'div',
                      {
                        className: 'flex flex-row items-center space-x-1',
                      },
                      /*#__PURE__*/ React.createElement('div', {
                        className: 'w-1 h-1 rounded bg-Gray-6',
                      }),
                      /*#__PURE__*/ React.createElement(
                        'p',
                        {
                          className: 'text-white text-2xs',
                        },
                        'Target',
                      ),
                    ),
                    /*#__PURE__*/ React.createElement(
                      'p',
                      {
                        className: 'text-white text-2xs text-right font-semibold',
                      },
                      (0, _main_utils__WEBPACK_IMPORTED_MODULE_0__.decimalLogic)(
                        (_dataPoints$target =
                          dataPoints === null || dataPoints === void 0
                            ? void 0
                            : dataPoints.target) !== null && _dataPoints$target !== void 0
                          ? _dataPoints$target
                          : 0,
                        _main_utils__WEBPACK_IMPORTED_MODULE_0__.DecimalType.SummedNumbers,
                        '$',
                      ),
                    ),
                  ),
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    key: 'this-year',
                    className: 'flex flex-row flex-grow justify-between items-center space-x-10',
                  },
                  /*#__PURE__*/ React.createElement(
                    'div',
                    {
                      className: 'flex flex-row items-center space-x-1',
                    },
                    /*#__PURE__*/ React.createElement('div', {
                      className: 'w-1 h-1 rounded',
                      style: {
                        background: overallTarget
                          ? '#818CF8'
                          : trackingStatus &&
                            _target_types__WEBPACK_IMPORTED_MODULE_1__.TargetStatusConfig[
                              trackingStatus
                            ].dot,
                      },
                    }),
                    /*#__PURE__*/ React.createElement(
                      'p',
                      {
                        className: 'text-white text-2xs',
                      },
                      'Current',
                    ),
                  ),
                  /*#__PURE__*/ React.createElement(
                    'p',
                    {
                      className: 'text-white text-2xs text-right font-semibold',
                    },
                    (0, _main_utils__WEBPACK_IMPORTED_MODULE_0__.decimalLogic)(
                      (_dataPoints$thisYear =
                        dataPoints === null || dataPoints === void 0
                          ? void 0
                          : dataPoints.thisYear) !== null && _dataPoints$thisYear !== void 0
                        ? _dataPoints$thisYear
                        : 0,
                      _main_utils__WEBPACK_IMPORTED_MODULE_0__.DecimalType.SummedNumbers,
                      '$',
                    ),
                  ),
                ),
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    key: 'last-year',
                    className: 'flex flex-row flex-grow justify-between items-center space-x-10',
                  },
                  /*#__PURE__*/ React.createElement(
                    'div',
                    {
                      className: 'flex flex-row items-center space-x-1',
                    },
                    /*#__PURE__*/ React.createElement('div', {
                      className: 'w-1 h-1 rounded bg-Gray-11',
                    }),
                    /*#__PURE__*/ React.createElement(
                      'p',
                      {
                        className: 'text-white text-2xs',
                      },
                      'Last Year',
                    ),
                  ),
                  /*#__PURE__*/ React.createElement(
                    'p',
                    {
                      className: 'text-white text-2xs text-right font-semibold',
                    },
                    (0, _main_utils__WEBPACK_IMPORTED_MODULE_0__.decimalLogic)(
                      (_dataPoints$lastYear =
                        dataPoints === null || dataPoints === void 0
                          ? void 0
                          : dataPoints.lastYear) !== null && _dataPoints$lastYear !== void 0
                        ? _dataPoints$lastYear
                        : 0,
                      _main_utils__WEBPACK_IMPORTED_MODULE_0__.DecimalType.SummedNumbers,
                      '$',
                    ),
                  ),
                ),
              ),
            );
          }
          return null;
        };

        /***/
      },

    /***/ './src/spending/XAxis.tsx':
      /*!********************************!*\
  !*** ./src/spending/XAxis.tsx ***!
  \********************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ XAxis: function () {
            return /* binding */ XAxis;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! dayjs */ './node_modules/dayjs/dayjs.min.js',
        );
        /* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2___default =
          /*#__PURE__*/ __webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_2__);
        /* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! lodash-es */ './node_modules/lodash-es/range.js',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );

        var XAxis = function XAxis(_ref) {
          var _useBreakpoint;
          var startMonth = _ref.startMonth,
            endMonth = _ref.endMonth,
            bar = _ref.bar;
          var isMobile =
            (_useBreakpoint = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_0__.useBreakpoint)({
              768: false,
            })) !== null && _useBreakpoint !== void 0
              ? _useBreakpoint
              : true;
          var targetDate = dayjs__WEBPACK_IMPORTED_MODULE_2___default()().set(
            'month',
            startMonth - 1,
          );
          return startMonth === endMonth
            ? /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                'div',
                {
                  className: (0, clsx__WEBPACK_IMPORTED_MODULE_1__['default'])(
                    'flex flex-row w-full text-xs text-Gray-6 font-semibold justify-around my-1 pl-[48px] pr-[10px]',
                  ),
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                  'div',
                  {
                    className: 'w-20 h-7 flex justify-center items-center',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                    'p',
                    null,
                    targetDate.date(7).format('MMM D'),
                  ),
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                  'div',
                  {
                    className: 'w-20 h-7 flex justify-center items-center',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                    'p',
                    null,
                    targetDate.date(14).format('MMM D'),
                  ),
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                  'div',
                  {
                    className: 'w-20 h-7 flex justify-center items-center',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                    'p',
                    null,
                    targetDate.date(21).format('MMM D'),
                  ),
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                  'div',
                  {
                    className: 'w-20 h-7 flex justify-center items-center',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                    'p',
                    null,
                    targetDate.date(28).format('MMM D'),
                  ),
                ),
              )
            : /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                'div',
                {
                  className: (0, clsx__WEBPACK_IMPORTED_MODULE_1__['default'])(
                    'flex flex-row w-full text-xs text-Gray-6 font-semibold justify-between pl-[48px] pr-[10px]',
                    {
                      'justify-around pl-[48px] pr-[10px]': bar,
                      'pl-[38px]': !bar,
                    },
                  ),
                },
                !bar &&
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement('div', {
                    className:
                      'w-[25px] h-7 flex justify-center items-center first:justify-start last:justify-end',
                  }),
                (0, lodash_es__WEBPACK_IMPORTED_MODULE_4__['default'])(
                  startMonth,
                  endMonth + 1,
                ).map(function (month) {
                  return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                    'div',
                    {
                      key: 'x-'.concat(month),
                      className:
                        'w-[25px] h-7 flex justify-center items-center first:justify-start last:justify-end',
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                      'p',
                      null,
                      isMobile
                        ? dayjs__WEBPACK_IMPORTED_MODULE_2___default()()
                            .month(month - 1)
                            .format('MMM')
                            .slice(0, 1)
                        : dayjs__WEBPACK_IMPORTED_MODULE_2___default()()
                            .month(month - 1)
                            .format('MMM'),
                    ),
                  );
                }),
              );
        };

        /***/
      },

    /***/ './src/spending/utils.ts':
      /*!*******************************!*\
  !*** ./src/spending/utils.ts ***!
  \*******************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ convertDateRangeToFromTo: function () {
            return /* binding */ convertDateRangeToFromTo;
          },
          /* harmony export */ getChartDataByDateRange: function () {
            return /* binding */ getChartDataByDateRange;
          },
          /* harmony export */ getChartLevels: function () {
            return /* binding */ getChartLevels;
          },
          /* harmony export */ getChartTimelineUnit: function () {
            return /* binding */ getChartTimelineUnit;
          },
          /* harmony export */ getCurrentSpendings: function () {
            return /* binding */ getCurrentSpendings;
          },
          /* harmony export */ getLastYearSpending: function () {
            return /* binding */ getLastYearSpending;
          },
          /* harmony export */ getLineChartDataInMonth: function () {
            return /* binding */ getLineChartDataInMonth;
          },
          /* harmony export */ getMonthsLineChartData: function () {
            return /* binding */ getMonthsLineChartData;
          },
          /* harmony export */ getSortedTotalSpendings: function () {
            return /* binding */ getSortedTotalSpendings;
          },
          /* harmony export */ getSpendingByYear: function () {
            return /* binding */ getSpendingByYear;
          },
          /* harmony export */ getSpendingsGroupedByDate: function () {
            return /* binding */ getSpendingsGroupedByDate;
          },
          /* harmony export */ getSpendingsGroupedByYear: function () {
            return /* binding */ getSpendingsGroupedByYear;
          },
          /* harmony export */ getThisYearSpending: function () {
            return /* binding */ getThisYearSpending;
          },
          /* harmony export */ isEmptyPeriods: function () {
            return /* binding */ isEmptyPeriods;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/constants */ './src/common/constants.ts');
        /* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/common/utils */ './src/common/utils/index.ts',
        );
        /* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @/env */ './src/env.ts',
        );
        /* harmony import */ var _main_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @/main/utils */ './src/main/utils.ts',
        );
        /* harmony import */ var _target_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @/target/types */ './src/target/types.ts',
        );
        /* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! dayjs */ './node_modules/dayjs/dayjs.min.js',
        );
        /* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_5___default =
          /*#__PURE__*/ __webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_5__);
        /* harmony import */ var dayjs_plugin_weekOfYear__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! dayjs/plugin/weekOfYear */ './node_modules/dayjs/plugin/weekOfYear.js',
          );
        /* harmony import */ var dayjs_plugin_weekOfYear__WEBPACK_IMPORTED_MODULE_6___default =
          /*#__PURE__*/ __webpack_require__.n(dayjs_plugin_weekOfYear__WEBPACK_IMPORTED_MODULE_6__);
        /* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! lodash-es */ './node_modules/lodash-es/range.js',
        );
        /* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          /*! lodash-es */ './node_modules/lodash-es/groupBy.js',
        );
        /* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
          /*! lodash-es */ './node_modules/lodash-es/sumBy.js',
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

        dayjs__WEBPACK_IMPORTED_MODULE_5___default().extend(
          dayjs_plugin_weekOfYear__WEBPACK_IMPORTED_MODULE_6___default(),
        );
        var Accent9 = '#C2C2FA';
        var DATA_DATE_FORMAT = 'MMM DD';
        var BILLION = Math.pow(10, 9);
        var MILLION = Math.pow(10, 6);
        var THOUSAND = Math.pow(10, 3);
        var getThisMonth = function getThisMonth() {
          return _env__WEBPACK_IMPORTED_MODULE_2__.USE_PREV_YEAR_SPENDINGS
            ? 11
            : dayjs__WEBPACK_IMPORTED_MODULE_5___default()().month();
        };
        var getYearSpending = function getYearSpending(spendings, year) {
          var _spendings$filter$red;
          return (_spendings$filter$red =
            spendings === null || spendings === void 0
              ? void 0
              : spendings
                  .filter(function (cur) {
                    return cur.year === year;
                  })
                  .reduce(function (acc, _ref) {
                    var total = _ref.total;
                    return total + acc;
                  }, 0)) !== null && _spendings$filter$red !== void 0
            ? _spendings$filter$red
            : 0;
        };
        var getThisYearSpending = function getThisYearSpending(spendings) {
          return getYearSpending(
            spendings,
            _common_utils__WEBPACK_IMPORTED_MODULE_1__.DateUtils.getThisYear(),
          );
        };
        var getLastYearSpending = function getLastYearSpending(spendings) {
          return getYearSpending(
            spendings,
            _common_utils__WEBPACK_IMPORTED_MODULE_1__.DateUtils.getThisYear() - 1,
          );
        };
        var getLineChartDataInMonth = function getLineChartDataInMonth(
          data,
          targetMonth,
          trackingStatus,
        ) {
          var _targetMonth$amount, _targetMonth$amount4;
          var spendings = data.spendings,
            _data$periods = data.periods,
            periods = _data$periods === void 0 ? [] : _data$periods;
          var overallTarget = !trackingStatus || isEmptyPeriods(periods);
          var targetDate = dayjs__WEBPACK_IMPORTED_MODULE_5___default()().set(
            'month',
            targetMonth.month - 1,
          );
          var isThisMonth = getThisMonth() === targetMonth.month - 1;
          var totalThisYear = getThisYearSpending(
            spendings !== null && spendings !== void 0 ? spendings : [],
          );
          var totalLastYear = getLastYearSpending(
            spendings !== null && spendings !== void 0 ? spendings : [],
          );
          var chartData = Array(targetDate.daysInMonth())
            .fill({
              name: '',
              thisYear: 0,
              lastYear: 0,
              target:
                (_targetMonth$amount = targetMonth.amount) !== null &&
                _targetMonth$amount !== void 0
                  ? _targetMonth$amount
                  : 0,
            })
            .map(function (_, index) {
              var _targetMonth$amount3;
              var dayName = dayjs__WEBPACK_IMPORTED_MODULE_5___default()(targetDate)
                .date(index + 1)
                .format(DATA_DATE_FORMAT);

              // Don't draw data line if date index greater than today
              if (isThisMonth && index > targetDate.date() - 1) {
                var _targetMonth$amount2;
                return {
                  name: dayName,
                  lastYear: totalLastYear,
                  target:
                    (_targetMonth$amount2 = targetMonth.amount) !== null &&
                    _targetMonth$amount2 !== void 0
                      ? _targetMonth$amount2
                      : 0,
                };
              }
              return {
                name: dayName,
                thisYear: totalThisYear,
                lastYear: totalLastYear,
                target:
                  (_targetMonth$amount3 = targetMonth.amount) !== null &&
                  _targetMonth$amount3 !== void 0
                    ? _targetMonth$amount3
                    : 0,
              };
            });
          var dotStatusColor = '#34D399';
          var backgroundStatusColor = '#D1FAE5';
          if (trackingStatus) {
            var _TargetStatusConfig$t =
                _target_types__WEBPACK_IMPORTED_MODULE_4__.TargetStatusConfig[trackingStatus],
              dot = _TargetStatusConfig$t.dot,
              background = _TargetStatusConfig$t.background;
            dotStatusColor = dot;
            backgroundStatusColor = background;
          }
          var targetLine =
            trackingStatus !== 'NOT_SET'
              ? {
                  name: 'target',
                  type: 'monotone',
                  dataKey: 'target',
                  strokeWidth: 2,
                  strokeDasharray: '8 8',
                  stroke: '#7D8490',
                  fill: 'none',
                  dot: false,
                }
              : {
                  name: '',
                  type: '',
                  dataKey: '',
                  strokeWidth: 0,
                  strokeDasharray: '',
                  stroke: '',
                  fill: '',
                  dot: false,
                };
          var lines = [
            targetLine,
            {
              name: 'lastYear',
              type: 'monotone',
              dataKey: 'lastYear',
              strokeWidth: 0,
              stroke: '#F3F4F6',
              dot: false,
              fill: '#F3F4F6',
              opacity: 0.8,
            },
            {
              name: 'thisYear',
              type: 'monotone',
              dataKey: 'thisYear',
              strokeWidth: 3,
              stroke: overallTarget ? Accent9 : dotStatusColor,
              dot: false,
              fill: overallTarget ? Accent9 : backgroundStatusColor,
            },
          ];
          var maxValue = Math.max(
            totalThisYear,
            totalLastYear,
            (_targetMonth$amount4 = targetMonth.amount) !== null && _targetMonth$amount4 !== void 0
              ? _targetMonth$amount4
              : 0,
          );
          var positiveMax = Math.abs(maxValue);
          if (positiveMax >= BILLION) {
            maxValue = Math.ceil(positiveMax / BILLION) * BILLION; // Billion
          }

          if (positiveMax >= MILLION) {
            maxValue = Math.ceil(positiveMax / MILLION) * MILLION; // Millions
          }

          if (positiveMax >= THOUSAND) {
            var remember = THOUSAND;
            maxValue = Math.ceil(positiveMax / THOUSAND); // Thousands
            maxValue = Math.ceil(maxValue / 5) * 5 * remember;
          }
          return {
            data: chartData,
            legends: [],
            lines: lines,
            maxValue: maxValue,
          };
        };
        var getChartLevels = function getChartLevels(maxValue) {
          var numberLevel = 5;
          var levelValue = maxValue / numberLevel;
          var levels = [];
          for (var index = 0; index < numberLevel + 1; index += 1) {
            var valueForThisLevel = Math.ceil(levelValue * index);
            levels.push({
              id: index,
              value: valueForThisLevel,
              title: (0, _main_utils__WEBPACK_IMPORTED_MODULE_3__.decimalLogic)(
                valueForThisLevel,
                _main_utils__WEBPACK_IMPORTED_MODULE_3__.DecimalType.ChartAxis,
                '$',
              ),
              isTarget: false,
            });
          }
          return levels;
        };
        var getMonthsLineChartData = function getMonthsLineChartData(data, months, trackingStatus) {
          var _spendings$filter,
            _spendings$filter2,
            _availableTargets$0$m,
            _availableTargets$,
            _availableTargets$mon,
            _availableTargets;
          if (!data) return _common_constants__WEBPACK_IMPORTED_MODULE_0__.INITIAL_CHART_DATA;
          var _data$periods2 = data.periods,
            periods = _data$periods2 === void 0 ? [] : _data$periods2,
            spendings = data.spendings;
          var overallTarget = !trackingStatus || isEmptyPeriods(periods);
          var monthFormat = 'MMM';
          var thisMonth = getThisMonth();
          var cumulativeThisYear = 0;
          var cumulativeLastYear = 0;
          var cumulativeTarget = 0;
          var thisYearSpendings =
            (_spendings$filter =
              spendings === null || spendings === void 0
                ? void 0
                : spendings.filter(function (item) {
                    return (
                      item.year ===
                      _common_utils__WEBPACK_IMPORTED_MODULE_1__.DateUtils.getThisYear()
                    );
                  })) !== null && _spendings$filter !== void 0
              ? _spendings$filter
              : [];
          var lastYearSpendings =
            (_spendings$filter2 =
              spendings === null || spendings === void 0
                ? void 0
                : spendings.filter(function (item) {
                    return (
                      item.year ===
                      _common_utils__WEBPACK_IMPORTED_MODULE_1__.DateUtils.getThisYear() - 1
                    );
                  })) !== null && _spendings$filter2 !== void 0
              ? _spendings$filter2
              : [];
          var thisYearSorted =
            thisYearSpendings === null || thisYearSpendings === void 0
              ? void 0
              : thisYearSpendings.sort(function (a, b) {
                  var _a$month, _b$month;
                  return (
                    ((_a$month = a === null || a === void 0 ? void 0 : a.month) !== null &&
                    _a$month !== void 0
                      ? _a$month
                      : 0) -
                    ((_b$month = b === null || b === void 0 ? void 0 : b.month) !== null &&
                    _b$month !== void 0
                      ? _b$month
                      : 0)
                  );
                });
          var lastYearSorted = (0, lodash_es__WEBPACK_IMPORTED_MODULE_7__['default'])(0, 12).map(
            function (monthIdx) {
              var _thisYearSpendings$;
              var lastYearData = lastYearSpendings.find(function (e) {
                return (e === null || e === void 0 ? void 0 : e.month) - 1 === monthIdx;
              });
              return (
                lastYearData || {
                  year:
                    ((_thisYearSpendings$ = thisYearSpendings[0]) === null ||
                    _thisYearSpendings$ === void 0
                      ? void 0
                      : _thisYearSpendings$.year) ||
                    dayjs__WEBPACK_IMPORTED_MODULE_5___default()().year() - 1,
                  month: monthIdx + 1,
                  total: 0,
                }
              );
            },
          );

          // Find start / end month
          var availableTargets = months.filter(function (item) {
            return (item === null || item === void 0 ? void 0 : item.amount) !== undefined;
          });
          var startMonth =
            (_availableTargets$0$m =
              (_availableTargets$ = availableTargets[0]) === null || _availableTargets$ === void 0
                ? void 0
                : _availableTargets$.month) !== null && _availableTargets$0$m !== void 0
              ? _availableTargets$0$m
              : 1;
          var endMonth =
            (_availableTargets$mon =
              (_availableTargets = availableTargets[availableTargets.length - 1]) === null ||
              _availableTargets === void 0
                ? void 0
                : _availableTargets.month) !== null && _availableTargets$mon !== void 0
              ? _availableTargets$mon
              : 12;
          var chartData = months.reduce(
            function (preVal, monthData, index) {
              var _thisYearSorted$find$,
                _thisYearSorted$find,
                _lastYearSorted$find$,
                _lastYearSorted$find,
                _monthData$amount;
              // Out of month range
              if (monthData.month < startMonth || monthData.month > endMonth) {
                return preVal;
              }
              var month = dayjs__WEBPACK_IMPORTED_MODULE_5___default()()
                .month(index)
                .format(monthFormat);
              // Calculate cumulative values
              cumulativeThisYear += (0, _common_utils__WEBPACK_IMPORTED_MODULE_1__.round)(
                (_thisYearSorted$find$ =
                  (_thisYearSorted$find = thisYearSorted.find(function (_ref2) {
                    var month = _ref2.month;
                    return month === monthData.month;
                  })) === null || _thisYearSorted$find === void 0
                    ? void 0
                    : _thisYearSorted$find.total) !== null && _thisYearSorted$find$ !== void 0
                  ? _thisYearSorted$find$
                  : 0,
                2,
              );
              cumulativeLastYear += (0, _common_utils__WEBPACK_IMPORTED_MODULE_1__.round)(
                (_lastYearSorted$find$ =
                  (_lastYearSorted$find = lastYearSorted.find(function (_ref3) {
                    var month = _ref3.month;
                    return month === monthData.month;
                  })) === null || _lastYearSorted$find === void 0
                    ? void 0
                    : _lastYearSorted$find.total) !== null && _lastYearSorted$find$ !== void 0
                  ? _lastYearSorted$find$
                  : 0,
                2,
              );
              cumulativeTarget += (0, _common_utils__WEBPACK_IMPORTED_MODULE_1__.round)(
                (_monthData$amount =
                  monthData === null || monthData === void 0 ? void 0 : monthData.amount) !==
                  null && _monthData$amount !== void 0
                  ? _monthData$amount
                  : 0,
                2,
              );

              // Generate data point
              var dataPoint =
                index > thisMonth
                  ? {
                      name: month,
                      lastYear: cumulativeLastYear,
                      target: cumulativeTarget,
                    }
                  : {
                      name: month,
                      thisYear: cumulativeThisYear,
                      lastYear: cumulativeLastYear,
                      target: cumulativeTarget,
                    };
              return [].concat(_toConsumableArray(preVal), [dataPoint]);
            },
            [
              {
                name: '',
                lastYear: 0,
                thisYear: 0,
                target: 0,
              },
            ],
          );

          // Duplicate data point to draw a line if there is one data point
          if (chartData.length === 1) {
            chartData = [chartData[0], chartData[0]];
          }

          // Data points is 0 (target wasn't set) => show previous year and current year spending data
          if (chartData.length === 0) {
            chartData = lastYearSorted.map(function (lastYearData, index) {
              var _thisYearSorted$index, _thisYearSorted$index2, _lastYearData$total;
              var month = dayjs__WEBPACK_IMPORTED_MODULE_5___default()()
                .month(index)
                .format(monthFormat);
              // Calculate cumulative values
              cumulativeThisYear += (0, _common_utils__WEBPACK_IMPORTED_MODULE_1__.round)(
                (_thisYearSorted$index =
                  (_thisYearSorted$index2 = thisYearSorted[index]) === null ||
                  _thisYearSorted$index2 === void 0
                    ? void 0
                    : _thisYearSorted$index2.total) !== null && _thisYearSorted$index !== void 0
                  ? _thisYearSorted$index
                  : 0,
                2,
              );
              cumulativeLastYear += (0, _common_utils__WEBPACK_IMPORTED_MODULE_1__.round)(
                (_lastYearData$total =
                  lastYearData === null || lastYearData === void 0
                    ? void 0
                    : lastYearData.total) !== null && _lastYearData$total !== void 0
                  ? _lastYearData$total
                  : 0,
                2,
              );
              return index > thisMonth
                ? {
                    name: month,
                    lastYear: cumulativeLastYear,
                    target: 0,
                  }
                : {
                    name: month,
                    thisYear: cumulativeThisYear,
                    lastYear: cumulativeLastYear,
                    target: 0,
                  };
            });
          }
          var maxValue = Math.max(cumulativeThisYear, cumulativeLastYear, cumulativeTarget);
          var dotStatusColor = '#34D399';
          var backgroundStatusColor = '#D1FAE5';
          if (trackingStatus) {
            var _TargetStatusConfig$t2 =
                _target_types__WEBPACK_IMPORTED_MODULE_4__.TargetStatusConfig[trackingStatus],
              dot = _TargetStatusConfig$t2.dot,
              background = _TargetStatusConfig$t2.background;
            dotStatusColor = dot;
            backgroundStatusColor = background;
          }
          var targetLine =
            trackingStatus !== 'NOT_SET'
              ? {
                  name: 'target',
                  type: 'monotone',
                  dataKey: 'target',
                  strokeWidth: 2,
                  strokeDasharray: '8 8',
                  stroke: '#7D8490',
                  fill: 'none',
                  dot: false,
                }
              : {
                  name: '',
                  type: '',
                  dataKey: '',
                  strokeWidth: 0,
                  strokeDasharray: '',
                  stroke: '',
                  fill: '',
                  dot: false,
                };
          var lines = [
            targetLine,
            {
              name: 'lastYear',
              type: 'monotone',
              dataKey: 'lastYear',
              strokeWidth: 0,
              stroke: '#F3F4F6',
              dot: false,
              fill: '#F3F4F6',
              opacity: 0.8,
            },
            {
              name: 'thisYear',
              type: 'monotone',
              dataKey: 'thisYear',
              strokeWidth: 3,
              stroke: overallTarget ? Accent9 : dotStatusColor,
              dot: false,
              fill: overallTarget ? Accent9 : backgroundStatusColor,
            },
          ];
          return {
            data: chartData,
            legends: [],
            lines: lines,
            maxValue: maxValue,
            metadata: {
              currentSpend: cumulativeThisYear,
            },
          };
        };
        var getSpendingByYear = function getSpendingByYear(spendings) {
          if (!spendings) {
            return {
              thisYear: [],
              lastYear: [],
            };
          }
          var THIS_YEAR = _common_utils__WEBPACK_IMPORTED_MODULE_1__.DateUtils.getThisYear();
          var thisYear =
            spendings === null || spendings === void 0
              ? void 0
              : spendings.filter(function (item) {
                  if (item.year === THIS_YEAR) {
                    return {
                      month: item.month,
                      year: item.year,
                      threshold: item.total,
                    };
                  }
                  return false;
                });
          var lastYear =
            spendings === null || spendings === void 0
              ? void 0
              : spendings.filter(function (item) {
                  if (item.year === THIS_YEAR - 1) {
                    return {
                      month: item.month,
                      year: item.year,
                      threshold: item.total,
                    };
                  }
                  return false;
                });
          return {
            thisYear: thisYear !== null && thisYear !== void 0 ? thisYear : [],
            lastYear: lastYear !== null && lastYear !== void 0 ? lastYear : [],
          };
        };
        var isEmptyPeriods = function isEmptyPeriods(periods) {
          return periods.every(function (v) {
            return !v.amount;
          });
        };
        var getCurrentSpendings = function getCurrentSpendings(spendings, periods) {
          var _spendingsSortedByMon;
          var year =
            arguments.length > 2 && arguments[2] !== undefined
              ? arguments[2]
              : _common_utils__WEBPACK_IMPORTED_MODULE_1__.DateUtils.getThisYear();
          var yearSpendingsGroupedByMonth = (0, lodash_es__WEBPACK_IMPORTED_MODULE_8__['default'])(
            spendings.filter(function (spending) {
              return spending.year === year;
            }),
            'month',
          );
          var spendingsSortedByMonth = new Array(12).fill(null).map(function (_, idx) {
            var _yearSpendingsGrouped;
            return _objectSpread(
              _objectSpread(
                {},
                (_yearSpendingsGrouped = yearSpendingsGroupedByMonth[idx + 1]) === null ||
                  _yearSpendingsGrouped === void 0
                  ? void 0
                  : _yearSpendingsGrouped[0],
              ),
              {},
              {
                month: idx + 1,
              },
            );
          });
          var periodsGroupedByMonth = (0, lodash_es__WEBPACK_IMPORTED_MODULE_8__['default'])(
            periods.filter(function (spending) {
              return spending.year === year;
            }),
            'month',
          );
          var periodsSortedByMonth = new Array(12).fill(null).map(function (_, idx) {
            var _periodsGroupedByMont;
            return _objectSpread(
              _objectSpread(
                {},
                (_periodsGroupedByMont = periodsGroupedByMonth[idx + 1]) === null ||
                  _periodsGroupedByMont === void 0
                  ? void 0
                  : _periodsGroupedByMont[0],
              ),
              {},
              {
                month: idx + 1,
              },
            );
          });
          var firstMeaningfulPeriodMonth = periodsSortedByMonth.findIndex(function (_ref4) {
            var amount = _ref4.amount;
            return !_common_utils__WEBPACK_IMPORTED_MODULE_1__.AssertUtils.isNullOrUndefined(
              amount,
            );
          });
          var lastMeaningfulPeriodMonth =
            periodsSortedByMonth.length -
            1 -
            periodsSortedByMonth
              .slice()
              .reverse()
              .findIndex(function (_ref5) {
                var amount = _ref5.amount;
                return !_common_utils__WEBPACK_IMPORTED_MODULE_1__.AssertUtils.isNullOrUndefined(
                  amount,
                );
              });
          return (_spendingsSortedByMon = spendingsSortedByMonth
            .slice(firstMeaningfulPeriodMonth, lastMeaningfulPeriodMonth + 1)
            .reduce(function (total, target) {
              var _target$total;
              return (
                total +
                ((_target$total = target.total) !== null && _target$total !== void 0
                  ? _target$total
                  : 0)
              );
            }, 0)) !== null && _spendingsSortedByMon !== void 0
            ? _spendingsSortedByMon
            : 0;
        };
        var COLORS = [
          '#2C0594',
          '#6565FB',
          '#BD86F3',
          '#BF43A4',
          '#801BAF',
          '#EF8482',
          '#FCCD25',
          '#FFA31D',
          '#319DB0',
          '#225959',
        ];
        var dateFormat = 'YYYY-MM-DD';
        var getChartDate = function getChartDate(_ref6) {
          var year = _ref6.year,
            month = _ref6.month,
            week = _ref6.week,
            day = _ref6.day;
          var tempDate = trimTime(dayjs__WEBPACK_IMPORTED_MODULE_5___default()().year(year));
          if (week) {
            return tempDate.week(week).day(0).format(dateFormat);
          }
          if (month) {
            tempDate = tempDate.month(month - 1);
          }
          if (day) {
            tempDate = tempDate.date(day);
          } else {
            tempDate = tempDate.date(1);
          }
          return tempDate.format(dateFormat);
        };
        var getSpendingsGroupedByYear = function getSpendingsGroupedByYear(spendings) {
          var spendingsGroupedByYear = (0, lodash_es__WEBPACK_IMPORTED_MODULE_8__['default'])(
            spendings,
            function (_ref7) {
              var year = _ref7.year;
              return year;
            },
          );
          return spendingsGroupedByYear;
        };
        var getSpendingsGroupedByDate = function getSpendingsGroupedByDate(spendings) {
          var spendingsGroupedByDate = (0, lodash_es__WEBPACK_IMPORTED_MODULE_8__['default'])(
            spendings,
            function (_ref8) {
              var year = _ref8.year,
                month = _ref8.month,
                week = _ref8.week,
                day = _ref8.day;
              return getChartDate({
                year: year,
                month: month,
                week: week,
                day: day,
              });
            },
          );
          return spendingsGroupedByDate;
        };
        var getSortedTotalSpendings = function getSortedTotalSpendings(spendings, dateRange) {
          var _convertDateRangeToFr = convertDateRangeToFromTo(
              {
                dateRange: dateRange,
              },
              true,
            ),
            from = _convertDateRangeToFr.from,
            to = _convertDateRangeToFr.to;
          var activeSpendings = spendings.filter(function (_ref9) {
            var year = _ref9.year,
              month = _ref9.month,
              week = _ref9.week,
              day = _ref9.day;
            return dayjs__WEBPACK_IMPORTED_MODULE_5___default()(
              getChartDate({
                year: year,
                month: month,
                week: week,
                day: day,
              }),
            ).isBetween(from, to, 'day', '[]');
          });
          var spendingsGroupedById = (0, lodash_es__WEBPACK_IMPORTED_MODULE_8__['default'])(
            activeSpendings,
            'item.id',
          );
          var sortedTotalSpendings = Object.entries(spendingsGroupedById)
            .map(function (_ref10) {
              var _spendings$0$item;
              var _ref11 = _slicedToArray(_ref10, 2),
                id = _ref11[0],
                spendings = _ref11[1];
              return {
                id: +id,
                name:
                  (_spendings$0$item = spendings[0].item) === null || _spendings$0$item === void 0
                    ? void 0
                    : _spendings$0$item.name,
                total: spendings.reduce(function (total, spending) {
                  return total + spending.total;
                }, 0),
              };
            })
            .sort(function (a, b) {
              return b.total - a.total;
            })
            .map(function (item, idx) {
              return _objectSpread(
                _objectSpread({}, item),
                {},
                {
                  color: COLORS[idx],
                },
              );
            });
          return sortedTotalSpendings;
        };
        var getPreviousYearDate = function getPreviousYearDate(date, timelineUnit) {
          var week = dayjs__WEBPACK_IMPORTED_MODULE_5___default()(date).week();
          var month = dayjs__WEBPACK_IMPORTED_MODULE_5___default()(date).month();
          var year = dayjs__WEBPACK_IMPORTED_MODULE_5___default()(date).year() - 1;
          var tempDate = dayjs__WEBPACK_IMPORTED_MODULE_5___default()(date).year(year);
          if (timelineUnit === 'week') {
            tempDate = tempDate.week(week).day(0);
          } else if (timelineUnit === 'month') {
            tempDate = tempDate.month(month).date(1);
          }
          return tempDate.format(dateFormat);
        };
        var getChartDataByDateRange = function getChartDataByDateRange(spendings, dateRange) {
          var timelineUnit = getChartTimelineUnit(dateRange);
          var top10TotalSpendings = getSortedTotalSpendings(spendings, dateRange).slice(0, 10);
          var top10TotalSpendingsIds = top10TotalSpendings.map(function (_ref12) {
            var id = _ref12.id;
            return id;
          });
          var _convertDateRangeToFr2 = convertDateRangeToFromTo(
              {
                dateRange: dateRange,
              },
              true,
            ),
            from = _convertDateRangeToFr2.from,
            to = _convertDateRangeToFr2.to;
          var spendingsGroupedByDate = getSpendingsGroupedByDate(spendings);
          var data = (0, lodash_es__WEBPACK_IMPORTED_MODULE_7__['default'])(
            dayjs__WEBPACK_IMPORTED_MODULE_5___default()(to).diff(from, timelineUnit) + 1,
          ).map(function (idx) {
            var _spendingsGroupedByDa, _spendingsGroupedByDa2;
            var offset = idx;
            var currentDate = (function () {
              var tempDate = dayjs__WEBPACK_IMPORTED_MODULE_5___default()(from);
              if (timelineUnit === 'day') {
                tempDate = tempDate.add(offset, timelineUnit);
              } else if (timelineUnit === 'week') {
                tempDate = tempDate.day(0).add(offset, timelineUnit);
              } else {
                tempDate = tempDate.date(1).add(offset, timelineUnit);
              }
              return tempDate.format(dateFormat);
            })();
            var previousYearDate = getPreviousYearDate(currentDate, timelineUnit);
            var currentDateSpendings = spendingsGroupedByDate[currentDate];
            var currentDateSpendingsGroupedById = (0,
            lodash_es__WEBPACK_IMPORTED_MODULE_8__['default'])(
              currentDateSpendings,
              function (_ref13) {
                var item = _ref13.item;
                return item === null || item === void 0 ? void 0 : item.id;
              },
            );
            var _Object$entries$reduc = Object.entries(currentDateSpendingsGroupedById).reduce(
                function (_ref14, _ref15) {
                  var top10TotalGroupedById = _ref14.top10TotalGroupedById,
                    othersTotal = _ref14.othersTotal;
                  var _ref16 = _slicedToArray(_ref15, 2),
                    id = _ref16[0],
                    spends = _ref16[1];
                  if (!top10TotalSpendingsIds.includes(+id)) {
                    return {
                      top10TotalGroupedById: top10TotalGroupedById,
                      othersTotal:
                        othersTotal +
                        (0, lodash_es__WEBPACK_IMPORTED_MODULE_9__['default'])(spends, 'total'),
                    };
                  }
                  return {
                    top10TotalGroupedById: _objectSpread(
                      _objectSpread({}, top10TotalGroupedById),
                      {},
                      _defineProperty(
                        {},
                        id,
                        (0, lodash_es__WEBPACK_IMPORTED_MODULE_9__['default'])(spends, 'total'),
                      ),
                    ),
                    othersTotal: othersTotal,
                  };
                },
                {
                  top10TotalGroupedById: {},
                  othersTotal: 0,
                },
              ),
              top10TotalGroupedById = _Object$entries$reduc.top10TotalGroupedById,
              othersTotal = _Object$entries$reduc.othersTotal;
            var getName = function getName() {
              var isDifferentYear =
                dayjs__WEBPACK_IMPORTED_MODULE_5___default()(from).year() !==
                dayjs__WEBPACK_IMPORTED_MODULE_5___default()(to).year();
              if (timelineUnit === 'day' || timelineUnit === 'week') {
                if (isDifferentYear)
                  return dayjs__WEBPACK_IMPORTED_MODULE_5___default()(currentDate).format(
                    'MM/DD\nYYYY',
                  );
                return dayjs__WEBPACK_IMPORTED_MODULE_5___default()(currentDate).format('MM/DD');
              }
              if (isDifferentYear)
                return dayjs__WEBPACK_IMPORTED_MODULE_5___default()(currentDate).format(
                  'MMM\nYYYY',
                );
              return dayjs__WEBPACK_IMPORTED_MODULE_5___default()(currentDate).format('MMM');
            };
            return _objectSpread(
              _objectSpread(
                {
                  name: getName(),
                  unit: timelineUnit,
                  date: currentDate,
                  currentYearTotal: (0, lodash_es__WEBPACK_IMPORTED_MODULE_9__['default'])(
                    (_spendingsGroupedByDa = spendingsGroupedByDate[currentDate]) !== null &&
                      _spendingsGroupedByDa !== void 0
                      ? _spendingsGroupedByDa
                      : [],
                    'total',
                  ),
                  previousYearTotal: (0, lodash_es__WEBPACK_IMPORTED_MODULE_9__['default'])(
                    (_spendingsGroupedByDa2 = spendingsGroupedByDate[previousYearDate]) !== null &&
                      _spendingsGroupedByDa2 !== void 0
                      ? _spendingsGroupedByDa2
                      : [],
                    'total',
                  ),
                },
                top10TotalGroupedById,
              ),
              {},
              {
                '-1': othersTotal,
                items: [
                  top10TotalSpendings,
                  {
                    id: -1,
                    name: 'Other',
                  },
                ].flat(),
              },
            );
          });
          return data;
        };
        var getChartTimelineUnit = function getChartTimelineUnit(dateRange) {
          if (Array.isArray(dateRange)) {
            var _dateRange = _slicedToArray(dateRange, 2),
              from = _dateRange[0],
              to = _dateRange[1];
            if (dayjs__WEBPACK_IMPORTED_MODULE_5___default()(to).diff(from, 'day') < 30) {
              return 'day';
            }
            if (dayjs__WEBPACK_IMPORTED_MODULE_5___default()(to).diff(from, 'day') < 90) {
              return 'week';
            }
            return 'month';
          } else {
            switch (dateRange) {
              case '30-days':
                return 'day';
              case '90-days':
                return 'week';
              default:
                return 'month';
            }
          }
        };
        var trimTime = function trimTime(day) {
          return day.hour(0).minute(0).second(0).millisecond(0);
        };
        var convertDateRangeToFromTo = function convertDateRangeToFromTo(_ref17) {
          var dateRange = _ref17.dateRange,
            from = _ref17.from,
            to = _ref17.to;
          var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          var format = 'YYYY-MM-DD';
          if (force) {
            return {
              dateRange: 'custom',
              from: trimTime(
                (function () {
                  switch (dateRange) {
                    case '30-days':
                      return trimTime(
                        dayjs__WEBPACK_IMPORTED_MODULE_5___default()(
                          _env__WEBPACK_IMPORTED_MODULE_2__.SPENDINGS_DATE_LIMIT,
                        ).subtract(29, 'day'),
                      );
                    case '90-days':
                      return dayjs__WEBPACK_IMPORTED_MODULE_5___default()(
                        _env__WEBPACK_IMPORTED_MODULE_2__.SPENDINGS_DATE_LIMIT,
                      ).subtract(89, 'day');
                    case 'year-to-date':
                      return dayjs__WEBPACK_IMPORTED_MODULE_5___default()(
                        _env__WEBPACK_IMPORTED_MODULE_2__.SPENDINGS_DATE_LIMIT,
                      )
                        .date(1)
                        .month(0);
                    default:
                      return dayjs__WEBPACK_IMPORTED_MODULE_5___default()(dateRange[0]);
                  }
                })(),
              ).format(format),
              to: trimTime(
                (function () {
                  switch (dateRange) {
                    case 'year-to-date':
                      return dayjs__WEBPACK_IMPORTED_MODULE_5___default()(
                        _env__WEBPACK_IMPORTED_MODULE_2__.SPENDINGS_DATE_LIMIT,
                      )
                        .month(11)
                        .date(31);
                    case '30-days':
                    case '90-days':
                      return dayjs__WEBPACK_IMPORTED_MODULE_5___default()(
                        _env__WEBPACK_IMPORTED_MODULE_2__.SPENDINGS_DATE_LIMIT,
                      );
                    default:
                      return dayjs__WEBPACK_IMPORTED_MODULE_5___default()(dateRange[1]);
                  }
                })(),
              ).format(format),
            };
          }
          return {
            dateRange: typeof dateRange === 'string' ? dateRange : 'custom',
            from:
              from !== null && from !== void 0
                ? from
                : Array.isArray(dateRange)
                ? dayjs__WEBPACK_IMPORTED_MODULE_5___default()(dateRange[0]).format(format)
                : undefined,
            to:
              to !== null && to !== void 0
                ? to
                : Array.isArray(dateRange)
                ? dayjs__WEBPACK_IMPORTED_MODULE_5___default()(dateRange[1]).format(format)
                : undefined,
          };
        };

        /***/
      },
  },
]);
//# sourceMappingURL=src_main_chart_utils_ts-src_role_useRestrictedItems_ts-src_spending_TooltipContent_tsx-src_sp-6b4707.bundle.js.map
