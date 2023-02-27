'use strict';
(self['webpackChunkgravity_web'] = self['webpackChunkgravity_web'] || []).push([
  ['src_main_atoms_TargetStatus_index_tsx-src_target_AddTargetModal_index_ts'],
  {
    /***/ './src/assets/icons/outline/carbon-trash-can.svg':
      /*!*******************************************************!*\
  !*** ./src/assets/icons/outline/carbon-trash-can.svg ***!
  \*******************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        var _g, _defs;
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

        var SvgCarbonTrashCan = function SvgCarbonTrashCan(props) {
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
            'svg',
            _extends(
              {
                width: 16,
                height: 16,
                fill: 'none',
                xmlns: 'http://www.w3.org/2000/svg',
              },
              props,
            ),
            _g ||
              (_g = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
                'g',
                {
                  clipPath: 'url(#carbon-trash-can_svg__a)',
                  fill: '#FF5F68',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement('path', {
                  d: 'M6 6h1v7H6V6ZM9 6h1v7H9V6Z',
                }),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement('path', {
                  d: 'M1 2v1.167h1.167v11.666A1.167 1.167 0 0 0 3.333 16h9.334a1.167 1.167 0 0 0 1.166-1.167V3.167H15V2H1Zm2.333 12.833V3.167h9.334v11.666H3.333ZM6 0h4v1H6V0Z',
                  stroke: '#FF5F68',
                  strokeWidth: 0.5,
                }),
              )),
            _defs ||
              (_defs = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
                'defs',
                null,
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
                  'clipPath',
                  {
                    id: 'carbon-trash-can_svg__a',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement('path', {
                    fill: '#fff',
                    d: 'M0 0h16v16H0z',
                  }),
                ),
              )),
          );
        };
        /* harmony default export */ __webpack_exports__['default'] = SvgCarbonTrashCan;

        /***/
      },

    /***/ './src/main/atoms/MonthTargetInput/index.tsx':
      /*!***************************************************!*\
  !*** ./src/main/atoms/MonthTargetInput/index.tsx ***!
  \***************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/common/utils */ './src/common/utils/index.ts',
        );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
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
        /* eslint-disable react-hooks/exhaustive-deps */

        var MonthTargetInput = function MonthTargetInput(_ref) {
          var _ref$isInRange = _ref.isInRange,
            isInRange = _ref$isInRange === void 0 ? false : _ref$isInRange,
            _ref$className = _ref.className,
            className = _ref$className === void 0 ? '' : _ref$className,
            onChange = _ref.onChange,
            onSelect = _ref.onSelect,
            onUnselect = _ref.onUnselect,
            defaultAmount = _ref.defaultAmount;
          var amountInputRef = (0, react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
          var _useState = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(
              defaultAmount !== undefined
                ? (0, _common_utils__WEBPACK_IMPORTED_MODULE_1__.formatCurrency)({
                    value: defaultAmount,
                    format: '0,0',
                    defaultValue: '0',
                    supportNegative: false,
                  })
                : '',
            ),
            _useState2 = _slicedToArray(_useState, 2),
            amount = _useState2[0],
            setAmount = _useState2[1];
          var _useState3 = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
            _useState4 = _slicedToArray(_useState3, 2),
            isFocus = _useState4[0],
            setIsFocus = _useState4[1];
          (0, react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(
            function () {
              if (defaultAmount !== undefined) {
                onSelect();
              }
            },
            [defaultAmount],
          );
          var handleChange = function handleChange(event) {
            var newValue = event.target.value;
            setAmount(
              ''.concat(
                (0, _common_utils__WEBPACK_IMPORTED_MODULE_1__.formatCurrency)({
                  value: newValue,
                  format: '0,0',
                  defaultValue: '',
                  supportNegative: false,
                }),
              ),
            );
          };
          var handleKeyDown = function handleKeyDown(event) {
            if (['Enter'].includes(event.key)) {
              var _amountInputRef$curre;
              event.preventDefault();
              (_amountInputRef$curre = amountInputRef.current) === null ||
              _amountInputRef$curre === void 0
                ? void 0
                : _amountInputRef$curre.blur();
            }
          };
          var onFocus = function onFocus() {
            setIsFocus(true);
            onSelect();
          };
          var onBlur = function onBlur() {
            setIsFocus(false);
            if (amount.length > 0) {
              var amountInt = parseInt(
                (0, _common_utils__WEBPACK_IMPORTED_MODULE_1__.replaceAll)(amount, ',', ''),
                10,
              );
              onChange(amountInt);
            } else if (amount.length === 0) {
              onUnselect();
              onChange();
            }
          };
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
            'div',
            {
              className: (0, clsx__WEBPACK_IMPORTED_MODULE_2__['default'])(
                'w-24 h-7 flex px-1 justify-center items-center border-2 border-Gray-12 hover:bg-Gray-12',
                isInRange ? 'bg-Gray-12' : '',
                className,
              ),
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement('input', {
              ref: amountInputRef,
              className: (0, clsx__WEBPACK_IMPORTED_MODULE_2__['default'])(
                'flex text-xs text-right flex-1 w-5 bg-transparent outline-none text-Gray-3 placeholder-Gray-6',
              ),
              placeholder: isFocus ? '$0' : '',
              onChange: handleChange,
              onKeyDown: handleKeyDown,
              value: amount.length > 0 ? ''.concat(amount) : '',
              onFocus: onFocus,
              onBlur: onBlur,
            }),
          );
        };
        /* harmony default export */ __webpack_exports__['default'] = MonthTargetInput;

        /***/
      },

    /***/ './src/main/atoms/TargetStatus/index.tsx':
      /*!***********************************************!*\
  !*** ./src/main/atoms/TargetStatus/index.tsx ***!
  \***********************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/assets */ './src/assets/index.ts',
        );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var _main_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @/main/utils */ './src/main/utils.ts',
        );
        /* harmony import */ var _target_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @/target/types */ './src/target/types.ts',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var _TargetStatusMessage__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! ../TargetStatusMessage */ './src/main/atoms/TargetStatusMessage/index.tsx',
          );
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');

        var TargetStatus = function TargetStatus(_ref) {
          var _ref$className = _ref.className,
            className = _ref$className === void 0 ? '' : _ref$className,
            type = _ref.type,
            target = _ref.target,
            onTargetSet = _ref.onTargetSet;
          var _TargetStatusConfig$t =
              _target_types__WEBPACK_IMPORTED_MODULE_3__.TargetStatusConfig[type],
            label = _TargetStatusConfig$t.label,
            background = _TargetStatusConfig$t.background,
            dot = _TargetStatusConfig$t.dot;
          var _getTargetPeriodsAmou = (0,
            _main_utils__WEBPACK_IMPORTED_MODULE_2__.getTargetPeriodsAmountTotal)(target),
            _getTargetPeriodsAmou2 = _getTargetPeriodsAmou.overallTarget,
            overallTarget = _getTargetPeriodsAmou2 === void 0 ? 0 : _getTargetPeriodsAmou2,
            exceeding = _getTargetPeriodsAmou.exceeding;
          if (overallTarget === 0) {
            return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
              _common_components__WEBPACK_IMPORTED_MODULE_6__.Button,
              {
                className:
                  'rounded-full px-2 h-5 max-h-5 bg-Accent-8 text-Accent-2 justify-center items-center space-x-1.5 hidden lg:flex',
                onClick: onTargetSet,
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                'span',
                {
                  className: 'font-medium text-xs',
                },
                'Set target',
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                _assets__WEBPACK_IMPORTED_MODULE_0__.RightSmallIcon,
                {
                  className: 'text-Accent-2 h-2 w-2 hidden lg:block',
                },
              ),
            );
          }
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
            'div',
            {
              className: (0, clsx__WEBPACK_IMPORTED_MODULE_1__['default'])(
                'flex flex-row items-center space-x-1.5 bg-Green-8 rounded-full pl-2 pr-2.5 h-5 max-h-5 group relative',
                className,
              ),
              style: {
                backgroundColor: background,
              },
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
              'div',
              {
                className: 'flex w-2 h-2 justify-center items-center',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement('div', {
                className: 'w-1.5 h-1.5 rounded-full bg-Green-400',
                style: {
                  backgroundColor: dot,
                },
              }),
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
              'p',
              {
                className: 'text-Green-800 text-xs font-medium whitespace-nowrap',
                style: {
                  color: label,
                },
              },
              (0, _main_utils__WEBPACK_IMPORTED_MODULE_2__.getTrackingStatusName)(type),
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
              'div',
              {
                className: 'invisible group-hover:visible absolute -top-10 right-0',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                'div',
                {
                  className:
                    'bg-primary p-2 rounded-sm h-8 px-4 py-2 flex flex-row items-center space-x-2',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                  'div',
                  {
                    className: 'flex w-4 h-4 justify-center items-center',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                    _assets__WEBPACK_IMPORTED_MODULE_0__.InfoCircleIcon,
                    {
                      className: 'w-3 h-3 fill-current text-Accent-2 path-no-filled',
                      'aria-hidden': 'false',
                      viewBox: '0 0 12 12',
                    },
                  ),
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                  'div',
                  {
                    className: 'text text-Gray-12 text-xs truncate font-semibold',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                    _TargetStatusMessage__WEBPACK_IMPORTED_MODULE_5__['default'],
                    {
                      type: type,
                      riskRange: 5,
                      exceeding: exceeding,
                    },
                  ),
                ),
              ),
            ),
          );
        };
        /* harmony default export */ __webpack_exports__['default'] = TargetStatus;

        /***/
      },

    /***/ './src/main/atoms/TargetStatusMessage/index.tsx':
      /*!******************************************************!*\
  !*** ./src/main/atoms/TargetStatusMessage/index.tsx ***!
  \******************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var _target_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/target/types */ './src/target/types.ts',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );

        var TargetStatusMessage = function TargetStatusMessage(_ref) {
          var type = _ref.type,
            riskRange = _ref.riskRange,
            exceeding = _ref.exceeding;
          switch (type) {
            case _target_types__WEBPACK_IMPORTED_MODULE_0__.TargetStatusType.OnTrack:
              return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                'p',
                null,
                'Spend is below the target',
              );
            case _target_types__WEBPACK_IMPORTED_MODULE_0__.TargetStatusType.AtRisk:
              return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                'p',
                null,
                'Spend is within',
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                  'span',
                  {
                    style: {
                      color:
                        _target_types__WEBPACK_IMPORTED_MODULE_0__.TargetStatusConfig[
                          _target_types__WEBPACK_IMPORTED_MODULE_0__.TargetStatusType.AtRisk
                        ].dot,
                    },
                  },
                  ' '.concat(riskRange.toFixed(0), '% '),
                ),
                'of the target',
              );
            case _target_types__WEBPACK_IMPORTED_MODULE_0__.TargetStatusType.Exceeded:
              return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                'p',
                null,
                'Spend is exceeding the target by',
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                  'span',
                  {
                    className: 'mx-2',
                    style: {
                      color:
                        _target_types__WEBPACK_IMPORTED_MODULE_0__.TargetStatusConfig[
                          _target_types__WEBPACK_IMPORTED_MODULE_0__.TargetStatusType.Exceeded
                        ].dot,
                    },
                  },
                  ' '.concat(exceeding.toFixed(2), '% '),
                ),
              );
            default:
              return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                'p',
                null,
                'Spend is below the target',
              );
          }
        };
        /* harmony default export */ __webpack_exports__['default'] = TargetStatusMessage;

        /***/
      },

    /***/ './src/spending/SpendingChart/SpendingChart.tsx':
      /*!******************************************************!*\
  !*** ./src/spending/SpendingChart/SpendingChart.tsx ***!
  \******************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ SpendingChart: function () {
            return /* binding */ SpendingChart;
          },
          /* harmony export */
        });
        /* harmony import */ var _target_TargetChart__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/target/TargetChart */ './src/target/TargetChart.tsx');
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! lodash-es */ './node_modules/lodash-es/cloneDeep.js',
        );
        /* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ../constants */ './src/spending/constants.ts',
        );
        /* harmony import */ var _TooltipContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! ../TooltipContent */ './src/spending/TooltipContent.tsx',
        );
        /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! ../utils */ './src/spending/utils.ts',
        );
        /* harmony import */ var _XAxis__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! ../XAxis */ './src/spending/XAxis.tsx',
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

        var SpendingChart = function SpendingChart(_ref) {
          var _updatedMonths$0$mont, _updatedMonths$, _updatedMonths$month, _updatedMonths;
          var className = _ref.className,
            data = _ref.data,
            prevYearColor = _ref.prevYearColor;
          var _data$periods = data.periods,
            periods = _data$periods === void 0 ? [] : _data$periods,
            trackingStatus = data.trackingStatus;
          var overallTarget =
            !trackingStatus || (0, _utils__WEBPACK_IMPORTED_MODULE_4__.isEmptyPeriods)(periods);
          var months = (function () {
            if ((periods === null || periods === void 0 ? void 0 : periods.length) > 0) {
              var dataMonth = (0, lodash_es__WEBPACK_IMPORTED_MODULE_6__['default'])(
                _constants__WEBPACK_IMPORTED_MODULE_2__.defaultMonths,
              );
              periods === null || periods === void 0
                ? void 0
                : periods.forEach(function (period) {
                    if (
                      (period === null || period === void 0 ? void 0 : period.amount) !==
                        undefined &&
                      dataMonth[(period === null || period === void 0 ? void 0 : period.month) - 1]
                    ) {
                      dataMonth[
                        (period === null || period === void 0 ? void 0 : period.month) - 1
                      ].amount = period === null || period === void 0 ? void 0 : period.amount;
                    }
                  });
              return dataMonth;
            }
            return _constants__WEBPACK_IMPORTED_MODULE_2__.defaultMonths;
          })();
          var updatedMonths = months.filter(function (item) {
            return (item === null || item === void 0 ? void 0 : item.amount) !== undefined;
          });
          var startMonth =
            (_updatedMonths$0$mont =
              (_updatedMonths$ = updatedMonths[0]) === null || _updatedMonths$ === void 0
                ? void 0
                : _updatedMonths$.month) !== null && _updatedMonths$0$mont !== void 0
              ? _updatedMonths$0$mont
              : 1;
          var endMonth =
            (_updatedMonths$month =
              (_updatedMonths = updatedMonths[updatedMonths.length - 1]) === null ||
              _updatedMonths === void 0
                ? void 0
                : _updatedMonths.month) !== null && _updatedMonths$month !== void 0
              ? _updatedMonths$month
              : 12;
          var chartData = (function () {
            if (startMonth === endMonth) {
              return (0, _utils__WEBPACK_IMPORTED_MODULE_4__.getLineChartDataInMonth)(
                data,
                months[startMonth - 1],
                trackingStatus,
              );
            }
            return (0, _utils__WEBPACK_IMPORTED_MODULE_4__.getMonthsLineChartData)(
              data,
              months,
              trackingStatus,
            );
          })();
          var showTarget = !!periods.length;
          return /*#__PURE__*/ React.createElement(
            'div',
            {
              className: (0, clsx__WEBPACK_IMPORTED_MODULE_1__['default'])(
                'flex flex-1 flex-col w-full h-full min-h-[185px]',
                className,
              ),
            },
            chartData &&
              /*#__PURE__*/ React.createElement(
                React.Fragment,
                null,
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className:
                      'relative flex flex-1 flex-col justify-center items-center w-auto p-4 h-[184px] border border-Gray-12 rounded-2.5xl',
                  },
                  /*#__PURE__*/ React.createElement(
                    _target_TargetChart__WEBPACK_IMPORTED_MODULE_0__.TargetChart,
                    {
                      containerClass: 'flex flex-col mt-2',
                      chartData: chartData,
                      renderXAxis: function renderXAxis() {
                        return /*#__PURE__*/ React.createElement(
                          _XAxis__WEBPACK_IMPORTED_MODULE_5__.XAxis,
                          {
                            startMonth: startMonth,
                            endMonth: endMonth,
                          },
                        );
                      },
                      renderTooltip: function renderTooltip(props) {
                        return /*#__PURE__*/ React.createElement(
                          _TooltipContent__WEBPACK_IMPORTED_MODULE_3__.TooltipContent,
                          _extends({}, props, {
                            trackingStatus: data.trackingStatus,
                            showTarget: showTarget,
                            overallTarget: overallTarget,
                          }),
                        );
                      },
                      levelLabelClass: 'text-Gray-6 text-2xs font-normal',
                      prevYearColor: prevYearColor,
                      showTarget: showTarget,
                    },
                  ),
                ),
              ),
          );
        };

        /***/
      },

    /***/ './src/spending/SpendingChart/index.ts':
      /*!*********************************************!*\
  !*** ./src/spending/SpendingChart/index.ts ***!
  \*********************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ SpendingChart: function () {
            return /* reexport safe */ _SpendingChart__WEBPACK_IMPORTED_MODULE_0__.SpendingChart;
          },
          /* harmony export */
        });
        /* harmony import */ var _SpendingChart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! ./SpendingChart */ './src/spending/SpendingChart/SpendingChart.tsx',
        );

        /***/
      },

    /***/ './src/spending/constants.ts':
      /*!***********************************!*\
  !*** ./src/spending/constants.ts ***!
  \***********************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ defaultMonths: function () {
            return /* binding */ defaultMonths;
          },
          /* harmony export */ monthsInYear: function () {
            return /* binding */ monthsInYear;
          },
          /* harmony export */
        });
        var monthsInYear = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        var defaultMonths = monthsInYear.map(function (month) {
          return {
            month: month,
          };
        });

        /***/
      },

    /***/ './src/target/AddTargetModal/AddTargetModal.tsx':
      /*!******************************************************!*\
  !*** ./src/target/AddTargetModal/AddTargetModal.tsx ***!
  \******************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ AddTargetModal: function () {
            return /* binding */ AddTargetModal;
          },
          /* harmony export */
        });
        /* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/assets */ './src/assets/index.ts',
        );
        /* harmony import */ var _assets_icons_outline_arrow_right_2_svg__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! @/assets/icons/outline/arrow-right-2.svg */ './src/assets/icons/outline/arrow-right-2.svg',
          );
        /* harmony import */ var _assets_icons_outline_carbon_trash_can_svg__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! @/assets/icons/outline/carbon-trash-can.svg */ './src/assets/icons/outline/carbon-trash-can.svg',
          );
        /* harmony import */ var _category_useCategories__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! @/category/useCategories */ './src/category/useCategories.ts');
        /* harmony import */ var _common_atoms_Modal__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(/*! @/common/atoms/Modal */ './src/common/atoms/Modal/index.tsx');
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(/*! @/common/constants */ './src/common/constants.ts');
        /* harmony import */ var _common_hocs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! @/common/hocs */ './src/common/hocs/index.ts',
        );
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
          /*! @/common/utils */ './src/common/utils/index.ts',
        );
        /* harmony import */ var _main_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
          /*! @/main/utils */ './src/main/utils.ts',
        );
        /* harmony import */ var _spending_SpendingChart__WEBPACK_IMPORTED_MODULE_11__ =
          __webpack_require__(
            /*! @/spending/SpendingChart */ './src/spending/SpendingChart/index.ts',
          );
        /* harmony import */ var _spending_utils__WEBPACK_IMPORTED_MODULE_12__ =
          __webpack_require__(/*! @/spending/utils */ './src/spending/utils.ts');
        /* harmony import */ var _target_types__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
          /*! @/target/types */ './src/target/types.ts',
        );
        /* harmony import */ var _team_useDepartments__WEBPACK_IMPORTED_MODULE_14__ =
          __webpack_require__(/*! @/team/useDepartments */ './src/team/useDepartments.ts');
        /* harmony import */ var _vendor_useVendors__WEBPACK_IMPORTED_MODULE_15__ =
          __webpack_require__(/*! @/vendor/useVendors */ './src/vendor/useVendors.ts');
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_22__ =
          __webpack_require__(
            /*! react-hook-form */ './node_modules/react-hook-form/dist/index.esm.mjs',
          );
        /* harmony import */ var _apis__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
          /*! ../apis */ './src/target/apis.ts',
        );
        /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
          /*! ../utils */ './src/target/utils.ts',
        );
        /* harmony import */ var _MultiMonthDropdown__WEBPACK_IMPORTED_MODULE_20__ =
          __webpack_require__(
            /*! ./MultiMonthDropdown */ './src/target/AddTargetModal/MultiMonthDropdown.tsx',
          );
        /* harmony import */ var _PropsSection__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
          /*! ./PropsSection */ './src/target/AddTargetModal/PropsSection.tsx',
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
        /* eslint-disable @typescript-eslint/no-non-null-assertion */

        var THIS_YEAR = _common_utils__WEBPACK_IMPORTED_MODULE_9__.DateUtils.getThisYear();
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
        var AddTargetModal = (0, _common_hocs__WEBPACK_IMPORTED_MODULE_7__.withMountOnOpen)()(
          function (props) {
            var _watch, _watch2, _watch3, _watch4, _watch5, _periods$filter;
            var open = props.open,
              onClose = props.onClose,
              onCancel = props.onCancel,
              departmentId = props.departmentId,
              target = props.target,
              hidePropertyDropdownsProp = props.hidePropertyDropdowns,
              _props$useDefaultApis = props.useDefaultApis,
              useDefaultApis = _props$useDefaultApis === void 0 ? true : _props$useDefaultApis;
            var isEdit = !!target;
            var hidePropertyDropdowns =
              hidePropertyDropdownsProp !== null && hidePropertyDropdownsProp !== void 0
                ? hidePropertyDropdownsProp
                : (target === null || target === void 0 ? void 0 : target.type) === 'company';
            var methods = (0, react_hook_form__WEBPACK_IMPORTED_MODULE_22__.useForm)({
              mode: 'onChange',
            });
            var watch = methods.watch,
              setValue = methods.setValue,
              reset = methods.reset,
              _methods$formState = methods.formState,
              errors = _methods$formState.errors,
              isDirty = _methods$formState.isDirty,
              clearErrors = methods.clearErrors;
            var _useDepartments = (0,
              _team_useDepartments__WEBPACK_IMPORTED_MODULE_14__.useDepartments)(),
              isValidatingDepartments = _useDepartments.isValidatingDepartments,
              departments = _useDepartments.departments;
            var _useVendors = (0, _vendor_useVendors__WEBPACK_IMPORTED_MODULE_15__.useVendors)(),
              isValidatingVendors = _useVendors.isValidatingVendors;
            var _useCategories = (0,
              _category_useCategories__WEBPACK_IMPORTED_MODULE_3__.useCategories)(),
              isValidatingCategories = _useCategories.isValidatingCategories;
            react__WEBPACK_IMPORTED_MODULE_17__.useEffect(
              function () {
                var getTagValueFromProps = function getTagValueFromProps(_ref) {
                  var id = _ref.id,
                    name = _ref.name,
                    type = _ref.type;
                  return ''.concat(type, '-').concat(id, '-').concat(name);
                };
                if (isEdit) {
                  var _target$props$reduce;
                  var _ref2 =
                      (_target$props$reduce =
                        target === null || target === void 0
                          ? void 0
                          : target.props.reduce(
                              function (acc, cur) {
                                return {
                                  vendorProps:
                                    cur.type ===
                                    _target_types__WEBPACK_IMPORTED_MODULE_13__.TargetTypeProp
                                      .VENDOR
                                      ? [].concat(_toConsumableArray(acc.vendorProps), [
                                          getTagValueFromProps(cur),
                                        ])
                                      : acc.vendorProps,
                                  categoryProps:
                                    cur.type ===
                                    _target_types__WEBPACK_IMPORTED_MODULE_13__.TargetTypeProp
                                      .CATEGORY
                                      ? [].concat(_toConsumableArray(acc.categoryProps), [
                                          getTagValueFromProps(cur),
                                        ])
                                      : acc.categoryProps,
                                  departmentProps:
                                    cur.type ===
                                    _target_types__WEBPACK_IMPORTED_MODULE_13__.TargetTypeProp
                                      .DEPARTMENT
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
                            )) !== null && _target$props$reduce !== void 0
                        ? _target$props$reduce
                        : {},
                    _ref2$vendorProps = _ref2.vendorProps,
                    _vendorProps = _ref2$vendorProps === void 0 ? [] : _ref2$vendorProps,
                    _ref2$categoryProps = _ref2.categoryProps,
                    _categoryProps = _ref2$categoryProps === void 0 ? [] : _ref2$categoryProps,
                    _ref2$departmentProps = _ref2.departmentProps,
                    _departmentProps =
                      _ref2$departmentProps === void 0 ? [] : _ref2$departmentProps;
                  reset({
                    name: target === null || target === void 0 ? void 0 : target.name,
                    vendors: _vendorProps,
                    categories: _categoryProps,
                    departments: _departmentProps,
                    props: target === null || target === void 0 ? void 0 : target.props,
                    periods: target === null || target === void 0 ? void 0 : target.periods,
                  });
                } else {
                  var foundDepartment = departments.find(function (_ref3) {
                    var id = _ref3.id;
                    return id === departmentId;
                  });
                  reset({
                    name: '',
                    departments: [
                      foundDepartment &&
                        ''
                          .concat(
                            _target_types__WEBPACK_IMPORTED_MODULE_13__.TargetTypeProp.DEPARTMENT,
                            '-',
                          )
                          .concat(foundDepartment.id, '-')
                          .concat(foundDepartment.name),
                    ].filter(Boolean),
                    props: [
                      departments.find(function (_ref4) {
                        var id = _ref4.id;
                        return id === departmentId;
                      }),
                    ].filter(Boolean),
                    periods: _common_constants__WEBPACK_IMPORTED_MODULE_6__.defaultTargetMonths,
                  });
                }
              },
              [departmentId, departments, isEdit, reset, target],
            );
            var name = watch('name');
            var selectedVendors =
              (_watch = watch('vendors')) !== null && _watch !== void 0
                ? _watch
                : _common_constants__WEBPACK_IMPORTED_MODULE_6__.EMPTY_ARRAY;
            var selectedCategories =
              (_watch2 = watch('categories')) !== null && _watch2 !== void 0
                ? _watch2
                : _common_constants__WEBPACK_IMPORTED_MODULE_6__.EMPTY_ARRAY;
            var selectedDepartments =
              (_watch3 = watch('departments')) !== null && _watch3 !== void 0
                ? _watch3
                : _common_constants__WEBPACK_IMPORTED_MODULE_6__.EMPTY_ARRAY;
            var periods =
              (_watch4 = watch('periods')) !== null && _watch4 !== void 0
                ? _watch4
                : _common_constants__WEBPACK_IMPORTED_MODULE_6__.EMPTY_ARRAY;
            var vendorProps = react__WEBPACK_IMPORTED_MODULE_17__.useMemo(
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
            var categoryProps = react__WEBPACK_IMPORTED_MODULE_17__.useMemo(
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
            var departmentProps = react__WEBPACK_IMPORTED_MODULE_17__.useMemo(
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
              (_watch5 = watch('exceptions')) !== null && _watch5 !== void 0
                ? _watch5
                : _common_constants__WEBPACK_IMPORTED_MODULE_6__.EMPTY_ARRAY;
            var exceptionProps = react__WEBPACK_IMPORTED_MODULE_17__.useMemo(
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
            var targetProps = react__WEBPACK_IMPORTED_MODULE_17__.useMemo(
              function () {
                return [vendorProps, categoryProps, departmentProps, exceptionProps].flat();
              },
              [categoryProps, departmentProps, exceptionProps, vendorProps],
            );
            var _useFetcher = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_8__.useFetcher)(
                ['targetSpending', targetProps, periods],
                function () {
                  return _apis__WEBPACK_IMPORTED_MODULE_18__.TargetApis.getSpending({
                    props: targetProps,
                    periods: periods,
                  });
                },
              ),
              isValidatingSpendings = _useFetcher.isValidating,
              data = _useFetcher.data;
            var _ref5 = data !== null && data !== void 0 ? data : {},
              _ref5$spendings = _ref5.spendings,
              spendingsRaw =
                _ref5$spendings === void 0
                  ? _common_constants__WEBPACK_IMPORTED_MODULE_6__.EMPTY_ARRAY
                  : _ref5$spendings,
              trackingStatus = _ref5.trackingStatus;
            var spendings = new Array(12)
              .fill(null)
              .map(function (_, index) {
                var currentMonth = index + 1;
                var spendingsRawForCurrentMonth = spendingsRaw.filter(function (_ref6) {
                  var month = _ref6.month;
                  return month === currentMonth;
                });
                if (!spendingsRawForCurrentMonth.length) return;
                return {
                  year: THIS_YEAR,
                  month: currentMonth,
                  total: spendingsRawForCurrentMonth.reduce(function (acc, cur) {
                    return cur.total + acc;
                  }, 0),
                };
              })
              .filter(function (item) {
                return !!item;
              });
            var _ref7 = props,
              onCreateSuccess = _ref7.onCreateSuccess,
              onCreateError = _ref7.onCreateError,
              onUpdateSuccess = _ref7.onUpdateSuccess,
              onUpdateError = _ref7.onUpdateError,
              onDeleteSuccess = _ref7.onDeleteSuccess,
              onDeleteError = _ref7.onDeleteError;
            var _ref8 = props,
              onCreate = _ref8.onCreate,
              onUpdate = _ref8.onUpdate,
              onDelete = _ref8.onDelete;
            var createApi = useDefaultApis
              ? _apis__WEBPACK_IMPORTED_MODULE_18__.TargetApis.create
              : onCreate;
            var updateApi = useDefaultApis
              ? _apis__WEBPACK_IMPORTED_MODULE_18__.TargetApis.update
              : onUpdate;
            var deleteApi = useDefaultApis
              ? _apis__WEBPACK_IMPORTED_MODULE_18__.TargetApis['delete']
              : onDelete;
            var _useHandler = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_8__.useHandler)(
                function (payload) {
                  return createApi(payload);
                },
                {
                  onSuccess: function onSuccess(data) {
                    onCreateSuccess === null || onCreateSuccess === void 0
                      ? void 0
                      : onCreateSuccess(data);
                    onClose();
                  },
                  onError: onCreateError,
                },
              ),
              createTarget = _useHandler.handle,
              isCreatingTarget = _useHandler.isLoading;
            var _useHandler2 = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_8__.useHandler)(
                function (id, payload) {
                  return updateApi(id, payload);
                },
                {
                  onSuccess: function onSuccess(data) {
                    onUpdateSuccess === null || onUpdateSuccess === void 0
                      ? void 0
                      : onUpdateSuccess(data);
                    onClose();
                  },
                  onError: onUpdateError,
                },
              ),
              updateTarget = _useHandler2.handle,
              isUpdatingTarget = _useHandler2.isLoading;
            var _useHandler3 = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_8__.useHandler)(
                function () {
                  return deleteApi(target.id);
                },
                {
                  onSuccess: function onSuccess() {
                    onDeleteSuccess === null || onDeleteSuccess === void 0
                      ? void 0
                      : onDeleteSuccess(target.id);
                    onClose();
                  },
                  onError: onDeleteError,
                },
              ),
              isDeleting = _useHandler3.isLoading,
              deleteTarget = _useHandler3.handle;
            var renderErrorName = function renderErrorName() {
              return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                'div',
                {
                  className: 'flex flex-row items-center px-2 space-x-1',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                  _assets__WEBPACK_IMPORTED_MODULE_0__.AlertRed,
                  {
                    width: 15,
                    height: 15,
                    className: 'w-4 h-4',
                    viewBox: '0 0 15 15',
                  },
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                  'p',
                  {
                    className: 'text-xs text-Gray-6',
                  },
                  'Target name is required',
                ),
              );
            };
            var totalTargetAmount = (0, _common_utils__WEBPACK_IMPORTED_MODULE_9__.round)(
              periods.reduce(function (total, target) {
                var _target$amount;
                return (
                  total +
                  ((_target$amount = target.amount) !== null && _target$amount !== void 0
                    ? _target$amount
                    : 0)
                );
              }, 0),
            );
            var displaySpendings =
              hidePropertyDropdowns && target
                ? target === null || target === void 0
                  ? void 0
                  : target.spendings
                : spendings;
            var totalCurrentSpend = (0,
            _spending_utils__WEBPACK_IMPORTED_MODULE_12__.getCurrentSpendings)(
              displaySpendings,
              periods,
            );
            var isReadyToCreate =
              (0, _utils__WEBPACK_IMPORTED_MODULE_19__.isValidPeriods)(periods) &&
              !!targetProps.length &&
              !!(name !== null && name !== void 0 && name.length);
            var renderNoMonthError = function renderNoMonthError() {
              return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                'div',
                {
                  className: 'flex flex-row items-center px-12 space-x-1 mb-2',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                  _assets__WEBPACK_IMPORTED_MODULE_0__.AlertRed,
                  {
                    width: 15,
                    height: 15,
                    className: 'w-4 h-4',
                    viewBox: '0 0 15 15',
                  },
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                  'p',
                  {
                    className: 'text-xs text-Gray-6',
                  },
                  'Select at least one month',
                ),
              );
            };
            var reviewSentence = (0,
            _main_utils__WEBPACK_IMPORTED_MODULE_10__.genReviewSentenceFromProperties)(
              vendorProps,
              categoryProps,
              departmentProps,
              exceptionProps,
            );
            var isValidatingOptions =
              isValidatingDepartments || isValidatingCategories || isValidatingVendors;
            var hasNameError = !!errors.name;
            var hasPeriodsError = !!errors.periods;
            var handleCreate = function handleCreate() {
              var payload = {
                name: name,
                depId: departmentId,
                isPrimary: false,
                props: targetProps,
                periods: periods,
              };
              return createTarget(payload);
            };
            var handleSave = function handleSave() {
              var payload = {
                name: name,
                depId: departmentId,
                props: targetProps,
                isPrimary: false,
                periods: periods,
              };
              return updateTarget(target.id, _objectSpread(_objectSpread({}, target), payload));
            };
            var handleDelete = deleteTarget;
            return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
              _common_atoms_Modal__WEBPACK_IMPORTED_MODULE_4__['default'],
              {
                open: open,
                onClose: onClose,
                center: false,
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                _common_components__WEBPACK_IMPORTED_MODULE_5__.OverlayLoader,
                {
                  loading: isValidatingOptions,
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                  _common_components__WEBPACK_IMPORTED_MODULE_5__.Form,
                  {
                    methods: methods,
                    onSubmit: isEdit ? handleSave : handleCreate,
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_5__.Form.Input,
                    {
                      name: 'periods',
                      rules: {
                        validate: {
                          required: _utils__WEBPACK_IMPORTED_MODULE_19__.isValidPeriods,
                        },
                      },
                      readOnly: true,
                      className: 'w-0 h-0 overflow-hidden border-none',
                    },
                  ),
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                    'div',
                    {
                      className: 'flex flex-col w-[685px] outline-none',
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                      'div',
                      {
                        className: 'flex flex-col space-y-2 px-10 py-4 w-full',
                      },
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                        'p',
                        {
                          className: 'text-primary text-xs font-semibold',
                        },
                        'Target Name*',
                      ),
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                        _common_components__WEBPACK_IMPORTED_MODULE_5__.Form.Input,
                        {
                          name: 'name',
                          variant: 'underline',
                          placeholder: 'e.g Direct marketing & online advertising',
                          rules: {
                            required: true,
                          },
                          disabled:
                            target === null || target === void 0 ? void 0 : target.isPrimary,
                        },
                      ),
                      hasNameError && renderErrorName(),
                    ),
                    !hidePropertyDropdowns &&
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                        'div',
                        {
                          className: (0, clsx__WEBPACK_IMPORTED_MODULE_16__['default'])(
                            (target === null || target === void 0 ? void 0 : target.isPrimary) &&
                              'opacity-70 cursor-default pointer-events-none',
                          ),
                        },
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                          _PropsSection__WEBPACK_IMPORTED_MODULE_21__.PropsSection,
                          {
                            reviewSentence: reviewSentence,
                            exceptionProps: exceptionProps,
                          },
                        ),
                      ),
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                      'div',
                      {
                        className: 'flex flex-row pt-2 px-10 justify-between',
                      },
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                        'div',
                        {
                          className: 'flex flex-row items-center space-x-2 py-3',
                        },
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                          'p',
                          {
                            className: 'text-primary text-xs font-semibold w-14',
                          },
                          'Months*',
                        ),
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                          _MultiMonthDropdown__WEBPACK_IMPORTED_MODULE_20__['default'],
                          {
                            props: targetProps,
                            periods: periods,
                            year: THIS_YEAR,
                            lastYearData:
                              (_periods$filter = periods.filter(function (item) {
                                return (
                                  item.year ===
                                  _common_utils__WEBPACK_IMPORTED_MODULE_9__.DateUtils.getThisYear() -
                                    1
                                );
                              })) !== null && _periods$filter !== void 0
                                ? _periods$filter
                                : [],
                            onApply: function onApply(data) {
                              setValue(
                                'periods',
                                (0,
                                _main_utils__WEBPACK_IMPORTED_MODULE_10__.getPeriodsFromTargetMonths)(
                                  data,
                                  THIS_YEAR,
                                ),
                                {
                                  shouldDirty: true,
                                },
                              );
                              clearErrors('periods');
                            },
                          },
                        ),
                      ),
                    ),
                    !!hasPeriodsError && renderNoMonthError(),
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                      _common_components__WEBPACK_IMPORTED_MODULE_5__.OverlayLoader,
                      {
                        loading: !isValidatingOptions && isValidatingSpendings,
                        className: 'h-full relative z-[-1]',
                      },
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                        'div',
                        {
                          className: 'h-[270px] px-6',
                        },
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                          'div',
                          {
                            className: 'h-full w-full rounded-lg',
                          },
                          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                            _spending_SpendingChart__WEBPACK_IMPORTED_MODULE_11__.SpendingChart,
                            {
                              data: {
                                periods: periods,
                                spendings: displaySpendings,
                                trackingStatus:
                                  trackingStatus !== null && trackingStatus !== void 0
                                    ? trackingStatus
                                    : target === null || target === void 0
                                    ? void 0
                                    : target.trackingStatus,
                              },
                            },
                          ),
                        ),
                      ),
                    ),
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                      'div',
                      {
                        className:
                          'flex flex-row pt-4 pb-6 px-10 space-x-4 items-center justify-end text-primary text-xs font-semibold',
                      },
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                        'p',
                        {
                          className: '',
                        },
                        'Current Spend:',
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                          'span',
                          {
                            className: 'text-Gray-3 font-normal ml-1',
                          },
                          '$'.concat(
                            (0, _common_utils__WEBPACK_IMPORTED_MODULE_9__.formatCurrency)({
                              value: totalCurrentSpend,
                              format: '0,0',
                              defaultValue: '0',
                            }),
                          ),
                        ),
                      ),
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                        'p',
                        {
                          className: '',
                        },
                        'Total Target Amount:',
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                          'span',
                          {
                            className: 'text-Gray-3 font-normal ml-1',
                          },
                          '$'.concat(
                            (0, _common_utils__WEBPACK_IMPORTED_MODULE_9__.formatCurrency)({
                              value: totalTargetAmount,
                              format: '0,0',
                              defaultValue: '0',
                            }),
                          ),
                        ),
                      ),
                    ),
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement('hr', {
                      className: 'divider divider-horizontal w-full',
                    }),
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                      'div',
                      {
                        className: 'flex flex-row w-full px-12 py-4',
                      },
                      !!isEdit &&
                        target.type !== 'company' &&
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                          _common_components__WEBPACK_IMPORTED_MODULE_5__.Button,
                          {
                            variant: 'ghost',
                            loading: isDeleting,
                            colorScheme: 'gray',
                            type: 'button',
                            iconLeft:
                              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                                _assets_icons_outline_carbon_trash_can_svg__WEBPACK_IMPORTED_MODULE_2__.ReactComponent,
                                {
                                  width: 16,
                                  height: 16,
                                  className: 'w-4 h-4',
                                },
                              ),
                            onClick: handleDelete,
                          },
                          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                            'p',
                            {
                              className: 'text-Gray-6 text-xs font-semibold',
                            },
                            'Delete',
                          ),
                        ),
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                        'div',
                        {
                          className: 'flex gap-3 ml-auto',
                        },
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                          _common_components__WEBPACK_IMPORTED_MODULE_5__.Button,
                          {
                            variant: 'ghost',
                            colorScheme: 'gray',
                            onClick: onCancel,
                          },
                          'Cancel',
                        ),
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                          _common_components__WEBPACK_IMPORTED_MODULE_5__.Button,
                          {
                            type: 'submit',
                            loading: isCreatingTarget || isUpdatingTarget,
                            disabled: !isDirty,
                            variant: 'solid',
                            colorScheme: isReadyToCreate ? 'primary' : 'gray',
                            className: 'hover:bg-primary',
                            iconRight:
                              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                                _assets_icons_outline_arrow_right_2_svg__WEBPACK_IMPORTED_MODULE_1__.ReactComponent,
                                {
                                  className:
                                    'fill-current path-no-filled stroke-current path-no-stroke object-fill text-white',
                                },
                              ),
                          },
                          isEdit ? 'Save' : 'Create',
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            );
          },
        );

        /***/
      },

    /***/ './src/target/AddTargetModal/ExceptionList.tsx':
      /*!*****************************************************!*\
  !*** ./src/target/AddTargetModal/ExceptionList.tsx ***!
  \*****************************************************/
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

    /***/ './src/target/AddTargetModal/MultiMonthDropdown.tsx':
      /*!**********************************************************!*\
  !*** ./src/target/AddTargetModal/MultiMonthDropdown.tsx ***!
  \**********************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ getButtonTitle: function () {
            return /* binding */ getButtonTitle;
          },
          /* harmony export */
        });
        /* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/assets */ './src/assets/index.ts',
        );
        /* harmony import */ var _assets_icons_outline_arrow_right_2_svg__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! @/assets/icons/outline/arrow-right-2.svg */ './src/assets/icons/outline/arrow-right-2.svg',
          );
        /* harmony import */ var _common_atoms_Loading__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! @/common/atoms/Loading */ './src/common/atoms/Loading/index.tsx');
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(/*! @/common/constants */ './src/common/constants.ts');
        /* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! @/common/utils */ './src/common/utils/index.ts',
        );
        /* harmony import */ var _main_atoms_MonthTargetInput__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! @/main/atoms/MonthTargetInput */ './src/main/atoms/MonthTargetInput/index.tsx',
          );
        /* harmony import */ var _dwarvesf_react_hooks__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(
            /*! @dwarvesf/react-hooks */ './node_modules/@dwarvesf/react-hooks/dist/index.js',
          );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
          /*! dayjs */ './node_modules/dayjs/dayjs.min.js',
        );
        /* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_9___default =
          /*#__PURE__*/ __webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_9__);
        /* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
          /*! lodash-es */ './node_modules/lodash-es/cloneDeep.js',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var _react_hook_window_size__WEBPACK_IMPORTED_MODULE_11__ =
          __webpack_require__(
            /*! @react-hook/window-size */ './node_modules/@react-hook/window-size/dist/module/index.js',
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
        /* eslint-disable react/no-unescaped-entities */

        var getButtonTitle = function getButtonTitle(min, max) {
          var name = 'Select';
          if (min !== 0) {
            name = dayjs__WEBPACK_IMPORTED_MODULE_9___default()()
              .year(_common_utils__WEBPACK_IMPORTED_MODULE_5__.DateUtils.getThisYear())
              .month(min - 1)
              .format('MMM, YYYY');
          }
          if (max !== 0 && max !== min) {
            name += ' - '.concat(
              dayjs__WEBPACK_IMPORTED_MODULE_9___default()()
                .year(_common_utils__WEBPACK_IMPORTED_MODULE_5__.DateUtils.getThisYear())
                .month(max - 1)
                .format('MMM, YYYY'),
            );
          }
          return name;
        };
        var MultiMonthDropdown = function MultiMonthDropdown(_ref) {
          var _ref$className = _ref.className,
            className = _ref$className === void 0 ? '' : _ref$className,
            _ref$classPopover = _ref.classPopover,
            classPopover = _ref$classPopover === void 0 ? '' : _ref$classPopover,
            periods = _ref.periods,
            _ref$onApply = _ref.onApply,
            onApply =
              _ref$onApply === void 0
                ? function () {
                    return undefined;
                  }
                : _ref$onApply,
            lastYearData = _ref.lastYearData,
            isLoadingData = _ref.isLoadingData;
          var useableViewRef = (0, react__WEBPACK_IMPORTED_MODULE_10__.useRef)(null);
          var _useState = (0, react__WEBPACK_IMPORTED_MODULE_10__.useState)([]),
            _useState2 = _slicedToArray(_useState, 2),
            selectedMonths = _useState2[0],
            setSelectedMonths = _useState2[1];
          var _useState3 = (0, react__WEBPACK_IMPORTED_MODULE_10__.useState)(
              _common_constants__WEBPACK_IMPORTED_MODULE_4__.defaultTargetMonths,
            ),
            _useState4 = _slicedToArray(_useState3, 2),
            targetMonthValues = _useState4[0],
            setTargetMonthValues = _useState4[1];
          // Variables
          var curYear = _common_utils__WEBPACK_IMPORTED_MODULE_5__.DateUtils.getThisYear();
          var minMonth = selectedMonths.length
            ? Math.min.apply(Math, _toConsumableArray(selectedMonths))
            : 0;
          var maxMonth = selectedMonths.length
            ? Math.max.apply(Math, _toConsumableArray(selectedMonths))
            : 0;
          var totalAmount = (0, _common_utils__WEBPACK_IMPORTED_MODULE_5__.round)(
            targetMonthValues.reduce(function (total, target) {
              var _target$amount;
              return (
                total +
                ((_target$amount =
                  target === null || target === void 0 ? void 0 : target.amount) !== null &&
                _target$amount !== void 0
                  ? _target$amount
                  : 0)
              );
            }, 0),
          );
          var isValidData = selectedMonths.length > 0 && !isLoadingData;
          var _useWindowSize = (0,
            _react_hook_window_size__WEBPACK_IMPORTED_MODULE_11__.useWindowSize)(),
            _useWindowSize2 = _slicedToArray(_useWindowSize, 2),
            height = _useWindowSize2[1];
          var popoverDisclosure = (0,
          _dwarvesf_react_hooks__WEBPACK_IMPORTED_MODULE_7__.useDisclosure)();
          (0, react__WEBPACK_IMPORTED_MODULE_10__.useEffect)(
            function () {
              if (periods && periods.length > 0) {
                // Find min / max months
                var availableMonths = periods.map(function (period) {
                  return period.month;
                });
                var min = Math.min.apply(Math, _toConsumableArray(availableMonths));
                var max = Math.max.apply(Math, _toConsumableArray(availableMonths));
                var clonePreState = (0, lodash_es__WEBPACK_IMPORTED_MODULE_12__['default'])(
                  targetMonthValues,
                );
                periods.forEach(function (period) {
                  // set amount when period amount was set (!== 0) or period amount === 0 and period month is first or last month
                  // => this is to prevent zero from showing multiple times between time ranges (ex: 0, 0, 1, 0, 0, 2, 0, 0 -> 0, , 1, , , 2, , 0)
                  if (
                    (period !== null &&
                      period !== void 0 &&
                      period.amount &&
                      clonePreState[period.month - 1]) ||
                    ((period === null || period === void 0 ? void 0 : period.amount) === 0 &&
                      ((period === null || period === void 0 ? void 0 : period.month) === min ||
                        (period === null || period === void 0 ? void 0 : period.month) === max))
                  ) {
                    clonePreState[
                      (period === null || period === void 0 ? void 0 : period.month) - 1
                    ].amount = period === null || period === void 0 ? void 0 : period.amount;
                  } else {
                    clonePreState[
                      (period === null || period === void 0 ? void 0 : period.month) - 1
                    ].amount = undefined;
                    availableMonths = availableMonths.filter(function (month) {
                      return (
                        month !== (period === null || period === void 0 ? void 0 : period.month)
                      );
                    });
                  }
                });
                setSelectedMonths(availableMonths);
                setTargetMonthValues(clonePreState);
              }
              // eslint-disable-next-line react-hooks/exhaustive-deps
            },
            [periods],
          );
          var onClickApply = function onClickApply() {
            popoverDisclosure.onClose();
            onApply(targetMonthValues, curYear);
          };
          var onChangeMonthInput = function onChangeMonthInput(month, amount) {
            var _clonePreState;
            var clonePreState = (0, lodash_es__WEBPACK_IMPORTED_MODULE_12__['default'])(
              targetMonthValues,
            );
            var curAmount =
              (_clonePreState = clonePreState[month - 1]) === null || _clonePreState === void 0
                ? void 0
                : _clonePreState.amount;
            if (amount !== curAmount && clonePreState[month - 1]) {
              clonePreState[month - 1].amount = amount;
              setTargetMonthValues(clonePreState);
            }
          };
          var renderMonthName = function renderMonthName() {
            return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
              'div',
              {
                className: 'flex flex-1 flex-col',
              },
              _common_constants__WEBPACK_IMPORTED_MODULE_4__.monthsInYear.map(function (
                month,
                indexMonth,
              ) {
                var isInRange = month >= minMonth && month <= maxMonth;
                var borderStyle = 'border-l border-r border-Accent-2';
                if (month === minMonth) borderStyle = ''.concat(borderStyle, ' border-t');
                if (month === maxMonth) borderStyle = ''.concat(borderStyle, ' border-b');
                return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
                  'div',
                  {
                    key: 'month-'.concat(month),
                    className: (0, clsx__WEBPACK_IMPORTED_MODULE_8__['default'])('flex flex-col '),
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
                    'div',
                    {
                      className: (0, clsx__WEBPACK_IMPORTED_MODULE_8__['default'])(
                        'w-24 h-7 px-2 py-1 text-left flex flex-col justify-center items-start',
                        isInRange ? borderStyle : '',
                      ),
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
                      'p',
                      {
                        className: 'text-sm text-Gray-3',
                      },
                      dayjs__WEBPACK_IMPORTED_MODULE_9___default()()
                        .month(month - 1)
                        .format('MMMM'),
                    ),
                  ),
                  indexMonth !== 11 &&
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement('div', {
                      className: (0, clsx__WEBPACK_IMPORTED_MODULE_8__['default'])(
                        'h-1 w-full',
                        isInRange && indexMonth !== maxMonth - 1
                          ? 'border-l border-r border-Accent-2'
                          : '',
                      ),
                    }),
                );
              }),
            );
          };
          var renderLastYearSpend = function renderLastYearSpend() {
            return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
              'div',
              {
                className: 'flex flex-1 flex-col space-y-1',
              },
              _common_constants__WEBPACK_IMPORTED_MODULE_4__.monthsInYear.map(function (month) {
                var _monthMatched$0$total, _monthMatched$0$total2;
                var monthMatched = lastYearData.filter(function (item) {
                  return item.month === month;
                });
                var lastYearSpend =
                  monthMatched.length > 0
                    ? parseFloat(
                        (_monthMatched$0$total =
                          (_monthMatched$0$total2 = monthMatched[0].total) === null ||
                          _monthMatched$0$total2 === void 0
                            ? void 0
                            : _monthMatched$0$total2.toString()) !== null &&
                          _monthMatched$0$total !== void 0
                          ? _monthMatched$0$total
                          : '0',
                      )
                    : 0;
                return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
                  'div',
                  {
                    key: 'renderLastYearSpend-'.concat(month),
                    className:
                      'w-24 h-7 px-2 py-1 text-right flex flex-col justify-center items-end',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
                    'p',
                    {
                      className: 'text-sm text-Gray-6',
                    },
                    '$'.concat(
                      (0, _common_utils__WEBPACK_IMPORTED_MODULE_5__.formatCurrency)({
                        value: lastYearSpend,
                      }),
                    ),
                  ),
                );
              }),
            );
          };
          var onClickOpenModal = function onClickOpenModal() {
            popoverDisclosure.onOpen();
          };

          // Popover will be partially cropped
          var HEIGHT_LIMIT = 950;
          var isHeightRestricted = height < HEIGHT_LIMIT;
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
            'div',
            {
              className: (0, clsx__WEBPACK_IMPORTED_MODULE_8__['default'])(
                'flex-shrink-0 relative',
                className,
              ),
              ref: useableViewRef,
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
              _common_components__WEBPACK_IMPORTED_MODULE_3__.Popover,
              {
                open: popoverDisclosure.isOpen,
                onClose: popoverDisclosure.onClose,
                placement: isHeightRestricted ? 'right-start' : 'bottom-start',
                trigger: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
                  _common_components__WEBPACK_IMPORTED_MODULE_3__.Button,
                  {
                    size: 'sm',
                    variant: 'outline',
                    colorScheme: 'gray',
                    onClick: onClickOpenModal,
                    iconRight: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
                      _assets__WEBPACK_IMPORTED_MODULE_0__.BasicsDownSmall,
                      {
                        width: 20,
                        height: 20,
                      },
                    ),
                  },
                  getButtonTitle(minMonth, maxMonth),
                ),
              },
              !!popoverDisclosure.isOpen &&
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
                  'div',
                  {
                    className: (0, clsx__WEBPACK_IMPORTED_MODULE_8__['default'])(
                      'flex w-[348px] h-[528px] flex-col absolute z-50 left-0 shadow-property-dropdown border border-Gray-11 rounded-sm bg-white',
                      {
                        'transform -translate-y-1/4': isHeightRestricted,
                      },
                      classPopover,
                    ),
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
                    'div',
                    {
                      className: 'flex flex-row items-center px-4 border-b border-Gray-11 h-8',
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
                      'div',
                      {
                        className: 'flex flex-1 flex-row justify-center items-center',
                      },
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
                        'p',
                        {
                          className: 'text-primary text-xs font-semibold ml-4',
                        },
                        curYear,
                      ),
                    ),
                  ),
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
                    'div',
                    {
                      className:
                        'flex flex-row items-center justify-between text-xs text-Gray-6 px-7 pt-2 h-8',
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
                      'p',
                      null,
                      'Month',
                    ),
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
                      'p',
                      null,
                      "Last Year's Spend",
                    ),
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
                      'p',
                      null,
                      'Target',
                    ),
                  ),
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
                    'div',
                    {
                      className: (0, clsx__WEBPACK_IMPORTED_MODULE_8__['default'])(
                        'flex flex-row space-x-2 py-2 px-[22px] relative',
                        isLoadingData ? 'opacity-50' : '',
                      ),
                    },
                    renderMonthName(),
                    renderLastYearSpend(),
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
                      'div',
                      {
                        className: 'flex flex-1 flex-col space-y-1',
                      },
                      _common_constants__WEBPACK_IMPORTED_MODULE_4__.monthsInYear.map(function (
                        month,
                      ) {
                        var _targetMonthValues$fi;
                        var isInRange = month >= minMonth && month <= maxMonth;
                        var amountSaved =
                          (_targetMonthValues$fi = targetMonthValues.find(function (item) {
                            return item.month === month;
                          })) === null || _targetMonthValues$fi === void 0
                            ? void 0
                            : _targetMonthValues$fi.amount;
                        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
                          _main_atoms_MonthTargetInput__WEBPACK_IMPORTED_MODULE_6__['default'],
                          {
                            key: 'month-amount-'.concat(month),
                            month: month,
                            defaultAmount: amountSaved,
                            isInRange: isInRange,
                            onChange: function onChange(amount) {
                              return onChangeMonthInput(month, amount);
                            },
                            onSelect: function onSelect() {
                              var isIncluded = selectedMonths.includes(month);
                              if (!isIncluded) {
                                setSelectedMonths(function (pre) {
                                  return [].concat(_toConsumableArray(pre), [month]);
                                });
                              }
                            },
                            onUnselect: function onUnselect() {
                              var isIncluded = selectedMonths.includes(month);
                              if (isIncluded) {
                                setSelectedMonths(function (pre) {
                                  return pre.filter(function (item) {
                                    return item !== month;
                                  });
                                });
                              }
                            },
                          },
                        );
                      }),
                    ),
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
                      'div',
                      {
                        className: (0, clsx__WEBPACK_IMPORTED_MODULE_8__['default'])(
                          'absolute z-10 flex w-full h-full justify-center items-center',
                          isLoadingData ? '' : 'pointer-events-none',
                        ),
                      },
                      isLoadingData &&
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
                          _common_atoms_Loading__WEBPACK_IMPORTED_MODULE_2__['default'],
                          {
                            width: 36,
                            height: 36,
                            className: 'mr-12',
                          },
                        ),
                    ),
                  ),
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
                    'div',
                    {
                      className:
                        'flex flex-col items-end justify-between text-xs text-primary px-6 pt-2 h-8',
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
                      'p',
                      {
                        className: 'text-primary font-semibold',
                      },
                      'Total Target Amount:',
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
                        'span',
                        {
                          className: 'font-normal text-Gray-3 ml-1',
                        },
                        '$'.concat(
                          (0, _common_utils__WEBPACK_IMPORTED_MODULE_5__.formatCurrency)({
                            value: totalAmount,
                            format: '0,0',
                          }),
                        ),
                      ),
                    ),
                  ),
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement('hr', {
                    className: 'divider divider-horizontal w-full',
                  }),
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
                    'div',
                    {
                      className: 'flex flex-row w-full px-4 items-center h-11 justify-end gap-3',
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
                      _common_components__WEBPACK_IMPORTED_MODULE_3__.Button,
                      {
                        variant: 'ghost',
                        colorScheme: 'gray',
                        size: 'sm',
                        onClick: popoverDisclosure.onClose,
                        className: 'px-4',
                      },
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
                        'p',
                        {
                          className: 'text-Gray-6 text-xs font-semibold',
                        },
                        'Cancel',
                      ),
                    ),
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
                      _common_components__WEBPACK_IMPORTED_MODULE_3__.Button,
                      {
                        variant: 'solid',
                        colorScheme: isValidData ? 'primary' : 'gray',
                        size: 'sm',
                        disabled: isLoadingData,
                        onClick: onClickApply,
                        iconRight: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_10__.createElement(
                          _assets_icons_outline_arrow_right_2_svg__WEBPACK_IMPORTED_MODULE_1__.ReactComponent,
                          {
                            className:
                              'w-4 h-4 ml-2 fill-current path-no-filled stroke-current path-no-stroke object-fill text-white',
                          },
                        ),
                        className: 'px-4',
                      },
                      'Apply',
                    ),
                  ),
                ),
            ),
          );
        };
        /* harmony default export */ __webpack_exports__['default'] = /*#__PURE__*/ (0,
        react__WEBPACK_IMPORTED_MODULE_10__.forwardRef)(MultiMonthDropdown);

        /***/
      },

    /***/ './src/target/AddTargetModal/PropertiesDropdown.tsx':
      /*!**********************************************************!*\
  !*** ./src/target/AddTargetModal/PropertiesDropdown.tsx ***!
  \**********************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ PropertiesDropdown: function () {
            return /* binding */ PropertiesDropdown;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
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
        var PropertiesDropdown = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.forwardRef(
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
            var internalRef = react__WEBPACK_IMPORTED_MODULE_3__.useRef();
            var _React$useState = react__WEBPACK_IMPORTED_MODULE_3__.useState(''),
              _React$useState2 = _slicedToArray(_React$useState, 2),
              search = _React$useState2[0],
              setSearch = _React$useState2[1];
            var setSearchDebounced = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_1__.useDebounce)(
              setSearch,
              300,
            );
            react__WEBPACK_IMPORTED_MODULE_3__.useImperativeHandle(ref, function () {
              return internalRef.current;
            });
            react__WEBPACK_IMPORTED_MODULE_3__.useEffect(
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
            return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
              _common_components__WEBPACK_IMPORTED_MODULE_0__.Form.TagsSelect,
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
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                _common_components__WEBPACK_IMPORTED_MODULE_0__.TagsSelectSearch,
                {
                  placeholder: searchPlaceholder,
                  onChange: function onChange(e) {
                    return setSearchDebounced(e.target.value);
                  },
                },
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                'div',
                {
                  className: (0, clsx__WEBPACK_IMPORTED_MODULE_2__['default'])(
                    'invisible-scrollbar flex-1 overflow-auto',
                    {
                      'min-h-[150px]': !showOptionsOnEmptySearch,
                    },
                  ),
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                  'div',
                  {
                    className: (0, clsx__WEBPACK_IMPORTED_MODULE_2__['default'])({
                      hidden: !showOptionsOnEmptySearch && !search,
                    }),
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_0__.TagsSelectOptions,
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
                                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                                  'span',
                                  {
                                    className:
                                      'whitespace-nowrap overflow-hidden overflow-ellipsis',
                                  },
                                  name,
                                ),
                            },
                            icon: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                              'div',
                              {
                                className: (0, clsx__WEBPACK_IMPORTED_MODULE_2__['default'])(
                                  'w-5 h-5',
                                  ColorByColorScheme[colorScheme],
                                ),
                              },
                              icon,
                            ),
                            children:
                              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
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

    /***/ './src/target/AddTargetModal/PropsSection.tsx':
      /*!****************************************************!*\
  !*** ./src/target/AddTargetModal/PropsSection.tsx ***!
  \****************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ PropsSection: function () {
            return /* binding */ PropsSection;
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
        /* harmony import */ var _team_useDepartments__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! @/team/useDepartments */ './src/team/useDepartments.ts');
        /* harmony import */ var _vendor_useVendors__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(/*! @/vendor/useVendors */ './src/vendor/useVendors.ts');
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! ../types */ './src/target/types.ts',
        );
        /* harmony import */ var _ExceptionList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! ./ExceptionList */ './src/target/AddTargetModal/ExceptionList.tsx',
        );
        /* harmony import */ var _PropertiesDropdown__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(
            /*! ./PropertiesDropdown */ './src/target/AddTargetModal/PropertiesDropdown.tsx',
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

        var PropsSection = function PropsSection(_ref) {
          var reviewSentence = _ref.reviewSentence,
            _ref$exceptionProps = _ref.exceptionProps,
            exceptionProps = _ref$exceptionProps === void 0 ? [] : _ref$exceptionProps,
            error = _ref.error;
          var exceptionsDropdownRef = react__WEBPACK_IMPORTED_MODULE_5__.useRef();
          var _useDepartments = (0,
            _team_useDepartments__WEBPACK_IMPORTED_MODULE_3__.useDepartments)({
              limit: 0,
            }),
            departments = _useDepartments.departments;
          var _useVendors = (0, _vendor_useVendors__WEBPACK_IMPORTED_MODULE_4__.useVendors)({
              limit: 0,
            }),
            vendors = _useVendors.vendors;
          var _useCategories = (0,
            _category_useCategories__WEBPACK_IMPORTED_MODULE_1__.useCategories)({
              limit: 0,
            }),
            categories = _useCategories.categories;
          var vendorOptions = react__WEBPACK_IMPORTED_MODULE_5__.useMemo(
            function () {
              return vendors.map(function (_ref2) {
                var id = _ref2.id,
                  name = _ref2.name;
                return {
                  value: ''
                    .concat(_types__WEBPACK_IMPORTED_MODULE_6__.TargetTypeProp.VENDOR, '-')
                    .concat(id, '-')
                    .concat(name),
                  name: name,
                  label: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                    'div',
                    {
                      className: 'flex items center w-full',
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                      'span',
                      {
                        className: 'max-w-[220px] truncate',
                      },
                      name,
                    ),
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                      'span',
                      {
                        className: 'invisible group-hover:visible text-Gray-6',
                      },
                      '\xA0- Vendor',
                    ),
                  ),
                  icon: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
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
          var categoryOptions = react__WEBPACK_IMPORTED_MODULE_5__.useMemo(
            function () {
              return categories.map(function (_ref3) {
                var id = _ref3.id,
                  name = _ref3.name;
                return {
                  value: ''
                    .concat(_types__WEBPACK_IMPORTED_MODULE_6__.TargetTypeProp.CATEGORY, '-')
                    .concat(id, '-')
                    .concat(name),
                  name: name,
                  label: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                    'div',
                    {
                      className: 'flex items center w-full',
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                      'span',
                      {
                        className: 'max-w-[220px] truncate',
                      },
                      name,
                    ),
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                      'span',
                      {
                        className: 'invisible group-hover:visible text-Gray-6',
                      },
                      '\xA0- Category',
                    ),
                  ),
                  icon: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
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
          var departmentOptions = react__WEBPACK_IMPORTED_MODULE_5__.useMemo(
            function () {
              return departments.map(function (_ref4) {
                var id = _ref4.id,
                  name = _ref4.name;
                return {
                  value: ''
                    .concat(_types__WEBPACK_IMPORTED_MODULE_6__.TargetTypeProp.DEPARTMENT, '-')
                    .concat(id, '-')
                    .concat(name),
                  name: name,
                  label: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                    'div',
                    {
                      className: 'flex items center w-full',
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                      'span',
                      {
                        className: 'max-w-[220px] truncate',
                      },
                      name,
                    ),
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                      'span',
                      {
                        className: 'invisible group-hover:visible text-Gray-6',
                      },
                      '\xA0- Team',
                    ),
                  ),
                  icon: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
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
          var exceptionOptions = react__WEBPACK_IMPORTED_MODULE_5__.useMemo(
            function () {
              return [].concat(
                _toConsumableArray(vendorOptions),
                _toConsumableArray(categoryOptions),
                _toConsumableArray(departmentOptions),
              );
            },
            [categoryOptions, departmentOptions, vendorOptions],
          );
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
            'div',
            {
              className: 'flex flex-col space-y-3 px-10 py-4 w-full',
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
              'p',
              {
                className: 'text-primary text-xs font-semibold',
              },
              'Properties*:',
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                'span',
                {
                  className: 'text-Gray-3 font-normal ml-1',
                },
                reviewSentence,
              ),
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
              'div',
              {
                className: 'flex flex-row py-1 space-x-2 px-2',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                'div',
                {
                  className: 'flex items-center justify-center w-14 min-w-[50px] h-[30px]',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                  'p',
                  {
                    className: 'text-Gray-6 text-xs',
                  },
                  'Target Is',
                ),
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                _PropertiesDropdown__WEBPACK_IMPORTED_MODULE_8__.PropertiesDropdown,
                {
                  name: 'vendors',
                  placeholder: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_2__.Tag,
                    {
                      colorScheme: 'orange',
                      icon: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
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
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                'div',
                {
                  className: 'flex items-center justify-center w-6 h-[30px]',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                  'p',
                  {
                    className: 'text-Gray-6 text-xs text-center',
                  },
                  'in',
                ),
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                _PropertiesDropdown__WEBPACK_IMPORTED_MODULE_8__.PropertiesDropdown,
                {
                  name: 'categories',
                  placeholder: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_2__.Tag,
                    {
                      colorScheme: 'accent',
                      icon: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
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
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                'div',
                {
                  className: 'flex items-center justify-center w-6 h-[30px]',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                  'p',
                  {
                    className: 'text-Gray-6 text-xs text-center',
                  },
                  'for',
                ),
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                _PropertiesDropdown__WEBPACK_IMPORTED_MODULE_8__.PropertiesDropdown,
                {
                  name: 'departments',
                  placeholder: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_2__.Tag,
                    {
                      colorScheme: 'cyan',
                      icon: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
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
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                _PropertiesDropdown__WEBPACK_IMPORTED_MODULE_8__.PropertiesDropdown,
                {
                  ref: exceptionsDropdownRef,
                  name: 'exceptions',
                  searchPlaceholder: 'Enter a team, category, or vendor',
                  options: exceptionOptions,
                  trigger: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_2__.Button,
                    {
                      size: 'sm',
                      variant: 'outline',
                      square: true,
                      colorScheme: 'gray',
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
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
                  description: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                    'div',
                    {
                      className: 'flex items-center text-xs mb-2 text-Gray-6',
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
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
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
              _ExceptionList__WEBPACK_IMPORTED_MODULE_7__['default'],
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

    /***/ './src/target/AddTargetModal/index.ts':
      /*!********************************************!*\
  !*** ./src/target/AddTargetModal/index.ts ***!
  \********************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ AddTargetModal: function () {
            return /* reexport safe */ _AddTargetModal__WEBPACK_IMPORTED_MODULE_0__.AddTargetModal;
          },
          /* harmony export */
        });
        /* harmony import */ var _AddTargetModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! ./AddTargetModal */ './src/target/AddTargetModal/AddTargetModal.tsx',
        );

        /***/
      },

    /***/ './src/target/TargetChart.tsx':
      /*!************************************!*\
  !*** ./src/target/TargetChart.tsx ***!
  \************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ TargetChart: function () {
            return /* binding */ TargetChart;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/constants */ './src/common/constants.ts');
        /* harmony import */ var _main_chart_utils__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! @/main/chart.utils */ './src/main/chart.utils.ts');
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! recharts */ './node_modules/recharts/es6/component/ResponsiveContainer.js',
        );
        /* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! recharts */ './node_modules/recharts/es6/chart/AreaChart.js',
        );
        /* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! recharts */ './node_modules/recharts/es6/cartesian/YAxis.js',
        );
        /* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! recharts */ './node_modules/recharts/es6/component/Tooltip.js',
        );
        /* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          /*! recharts */ './node_modules/recharts/es6/cartesian/Area.js',
        );

        var MIN_Y_VALUE = 100;
        var TargetChart = function TargetChart(_ref) {
          var className = _ref.className,
            containerStyle = _ref.containerStyle,
            containerClass = _ref.containerClass,
            chartData = _ref.chartData,
            renderXAxis = _ref.renderXAxis,
            renderReferenceLines = _ref.renderReferenceLines,
            renderTooltip = _ref.renderTooltip,
            _ref$levelLabelClass = _ref.levelLabelClass,
            levelLabelClass = _ref$levelLabelClass === void 0 ? '' : _ref$levelLabelClass,
            prevYearColor = _ref.prevYearColor,
            showTarget = _ref.showTarget;
          var _ref2 =
              chartData || _common_constants__WEBPACK_IMPORTED_MODULE_0__.INITIAL_CHART_DATA,
            data = _ref2.data,
            lines = _ref2.lines,
            maxValue = _ref2.maxValue;
          var maxValueWithSurplus = Math.ceil(maxValue * 1.1);
          var maxValueForChart = Math.max(maxValueWithSurplus, MIN_Y_VALUE);
          var chartLevels = (0, _main_chart_utils__WEBPACK_IMPORTED_MODULE_1__.getChartLevels)(
            maxValueForChart,
          );
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
            'div',
            {
              style: containerStyle,
              className: (0, clsx__WEBPACK_IMPORTED_MODULE_2__['default'])(
                'flex flex-col w-full h-full',
                containerClass || '',
              ),
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
              'div',
              {
                className: 'flex relative flex-col flex-1',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
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
                  return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                    'div',
                    {
                      key: 'dataLevels-'.concat(
                        level === null || level === void 0 ? void 0 : level.id,
                      ),
                      className: 'flex flex-row space-x-4 items-center w-full',
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                      'p',
                      {
                        className: (0, clsx__WEBPACK_IMPORTED_MODULE_2__['default'])(
                          'text-xs font-semibold text-right w-8 flex justify-end',
                          textColor,
                          levelLabelClass,
                        ),
                      },
                      level === null || level === void 0 ? void 0 : level.title,
                    ),
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement('div', {
                      className: (0, clsx__WEBPACK_IMPORTED_MODULE_2__['default'])(
                        'flex flex-1 w-auto h-px',
                        level !== null && level !== void 0 && level.isTarget
                          ? 'dashed-line'
                          : 'bg-Gray-11',
                      ),
                    }),
                  );
                }),
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                recharts__WEBPACK_IMPORTED_MODULE_4__.ResponsiveContainer,
                {
                  width: '100%',
                  height: '100%',
                  className: className,
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                  recharts__WEBPACK_IMPORTED_MODULE_5__.AreaChart,
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
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                    recharts__WEBPACK_IMPORTED_MODULE_6__.YAxis,
                    {
                      domain: [0, maxValueForChart],
                      width: 0,
                      height: 0,
                      className: 'opacity-0',
                    },
                  ),
                  data.length &&
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                      recharts__WEBPACK_IMPORTED_MODULE_7__.Tooltip,
                      {
                        cursor: true,
                        position: {
                          y: 5,
                        },
                        content: renderTooltip,
                      },
                    ),
                  renderReferenceLines && renderReferenceLines(),
                  lines
                    .slice()
                    .reverse()
                    .map(function (line) {
                      var fill = line.fill;
                      if (line.dataKey === 'lastYear' && prevYearColor) {
                        fill = prevYearColor;
                      }
                      if (line.dataKey === 'target' && !showTarget) return null;
                      return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                        recharts__WEBPACK_IMPORTED_MODULE_8__.Area,
                        {
                          key: line.name,
                          name: line.name,
                          type: line.type,
                          dataKey: line.dataKey,
                          strokeWidth: line.strokeWidth,
                          stroke: line.stroke,
                          strokeDasharray: line.strokeDasharray,
                          dot: line.dot,
                          fill: fill,
                          opacity: line.opacity,
                        },
                      );
                    }),
                ),
              ),
            ),
            renderXAxis && renderXAxis(),
          );
        };

        /***/
      },
  },
]);
//# sourceMappingURL=src_main_atoms_TargetStatus_index_tsx-src_target_AddTargetModal_index_ts.bundle.js.map
