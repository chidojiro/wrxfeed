'use strict';
(self['webpackChunkgravity_web'] = self['webpackChunkgravity_web'] || []).push([
  ['src_insight_InsightCard_tsx'],
  {
    /***/ './src/insight/InsightCard.tsx':
      /*!*************************************!*\
  !*** ./src/insight/InsightCard.tsx ***!
  \*************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ InsightCard: function () {
            return /* binding */ InsightCard;
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
        /* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @/common/utils */ './src/common/utils/index.ts',
        );
        /* harmony import */ var _feed_CommentBox__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(/*! @/feed/CommentBox */ './src/feed/CommentBox/index.ts');
        /* harmony import */ var _feed_FeedCard_CommentsSection__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! @/feed/FeedCard/CommentsSection */ './src/feed/FeedCard/CommentsSection.tsx',
          );
        /* harmony import */ var _feed_FeedCard_FeedCardHeader__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! @/feed/FeedCard/FeedCardHeader */ './src/feed/FeedCard/FeedCardHeader.tsx',
          );
        /* harmony import */ var _main_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! @/main/utils */ './src/main/utils.ts',
        );
        /* harmony import */ var _misc_useMentions__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(/*! @/misc/useMentions */ './src/misc/useMentions.ts');
        /* harmony import */ var _spending_GroupedSpendingChart__WEBPACK_IMPORTED_MODULE_9__ =
          __webpack_require__(
            /*! @/spending/GroupedSpendingChart */ './src/spending/GroupedSpendingChart.tsx',
          );
        /* harmony import */ var _spending_GroupedSpendingChartLegends__WEBPACK_IMPORTED_MODULE_10__ =
          __webpack_require__(
            /*! @/spending/GroupedSpendingChartLegends */ './src/spending/GroupedSpendingChartLegends.tsx',
          );
        /* harmony import */ var _spending_SpendingBarChart__WEBPACK_IMPORTED_MODULE_11__ =
          __webpack_require__(
            /*! @/spending/SpendingBarChart */ './src/spending/SpendingBarChart.tsx',
          );
        /* harmony import */ var _spending_utils__WEBPACK_IMPORTED_MODULE_12__ =
          __webpack_require__(/*! @/spending/utils */ './src/spending/utils.ts');
        /* harmony import */ var _team_constants__WEBPACK_IMPORTED_MODULE_13__ =
          __webpack_require__(/*! @/team/constants */ './src/team/constants.ts');
        /* harmony import */ var _transactions_TransactionList__WEBPACK_IMPORTED_MODULE_14__ =
          __webpack_require__(
            /*! @/transactions/TransactionList */ './src/transactions/TransactionList/index.tsx',
          );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
          /*! dayjs */ './node_modules/dayjs/dayjs.min.js',
        );
        /* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_16___default =
          /*#__PURE__*/ __webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_16__);
        /* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
          /*! lodash-es */ './node_modules/lodash-es/sumBy.js',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var _InsightCardActionMenu__WEBPACK_IMPORTED_MODULE_18__ =
          __webpack_require__(
            /*! ./InsightCardActionMenu */ './src/insight/InsightCardActionMenu.tsx',
          );
        /* harmony import */ var _useInsightSpendings__WEBPACK_IMPORTED_MODULE_19__ =
          __webpack_require__(/*! ./useInsightSpendings */ './src/insight/useInsightSpendings.ts');
        /* harmony import */ var _useInsightTransactions__WEBPACK_IMPORTED_MODULE_20__ =
          __webpack_require__(
            /*! ./useInsightTransactions */ './src/insight/useInsightTransactions.ts',
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

        var InsightCard = function InsightCard(_ref) {
          var groupByProp = _ref.groupBy,
            dateRangeProp = _ref.dateRange,
            propsProp = _ref.props,
            onPost = _ref.onPost,
            onDeleteSuccess = _ref.onDeleteSuccess,
            feed = _ref.feed,
            posting = _ref.posting,
            errors = _ref.errors,
            initializing = _ref.initializing,
            _ref$postable = _ref.postable,
            postable = _ref$postable === void 0 ? true : _ref$postable;
          var _React$useState = react__WEBPACK_IMPORTED_MODULE_17__.useState(),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            hoveredItemId = _React$useState2[0],
            setHoveredItemId = _React$useState2[1];
          var _ref2 = feed !== null && feed !== void 0 ? feed : {},
            _ref2$insight = _ref2.insight,
            _ref2$insight2 = _ref2$insight === void 0 ? {} : _ref2$insight,
            _ref2$insight2$dateRa = _ref2$insight2.dateRange,
            _dateRange = _ref2$insight2$dateRa === void 0 ? dateRangeProp : _ref2$insight2$dateRa,
            _ref2$insight2$groupB = _ref2$insight2.groupBy,
            groupBy = _ref2$insight2$groupB === void 0 ? groupByProp : _ref2$insight2$groupB,
            _ref2$insight2$props = _ref2$insight2.props,
            props = _ref2$insight2$props === void 0 ? propsProp : _ref2$insight2$props,
            _ref2$insight2$name = _ref2$insight2.name,
            name = _ref2$insight2$name === void 0 ? '' : _ref2$insight2$name,
            _ref2$insight2$from = _ref2$insight2.from,
            _from = _ref2$insight2$from === void 0 ? undefined : _ref2$insight2$from,
            _ref2$insight2$to = _ref2$insight2.to,
            _to = _ref2$insight2$to === void 0 ? undefined : _ref2$insight2$to;
          var dateRange =
            _dateRange === 'custom' && _from && _to ? [new Date(_from), new Date(_to)] : _dateRange;
          var _useInsightSpendings = (0,
            _useInsightSpendings__WEBPACK_IMPORTED_MODULE_19__.useInsightSpendings)(
              _objectSpread(
                {
                  props: props,
                  periods: [],
                  groupByItem: groupBy,
                },
                (0, _spending_utils__WEBPACK_IMPORTED_MODULE_12__.convertDateRangeToFromTo)({
                  dateRange: dateRange,
                  from: _from,
                  to: _to,
                }),
              ),
              {
                enabled: !initializing,
              },
            ),
            _useInsightSpendings$ = _useInsightSpendings.insightSpendings,
            insightSpendings =
              _useInsightSpendings$ === void 0
                ? _common_constants__WEBPACK_IMPORTED_MODULE_2__.EMPTY_ARRAY
                : _useInsightSpendings$,
            curYearSpends = _useInsightSpendings.curYearSpends,
            prevYearSpends = _useInsightSpendings.prevYearSpends,
            isInitializingInsightSpendings = _useInsightSpendings.isInitializingInsightSpendings;
          var sortedTotalSpendings = (0,
          _spending_utils__WEBPACK_IMPORTED_MODULE_12__.getSortedTotalSpendings)(
            insightSpendings,
            dateRange,
          );
          var totalSpend = (0, lodash_es__WEBPACK_IMPORTED_MODULE_21__['default'])(
            sortedTotalSpendings,
            'total',
          );
          var totalSpendLastYear = (0, lodash_es__WEBPACK_IMPORTED_MODULE_21__['default'])(
            prevYearSpends,
            'total',
          );
          var _useState = (0, react__WEBPACK_IMPORTED_MODULE_17__.useState)(
              _team_constants__WEBPACK_IMPORTED_MODULE_13__.DEFAULT_SORT,
            ),
            _useState2 = _slicedToArray(_useState, 2),
            sortTransactionsBy = _useState2[0],
            setSortTransactionsBy = _useState2[1];
          var _useState3 = (0, react__WEBPACK_IMPORTED_MODULE_17__.useState)(1),
            _useState4 = _slicedToArray(_useState3, 2),
            page = _useState4[0],
            setPage = _useState4[1];
          var _useMentions = (0, _misc_useMentions__WEBPACK_IMPORTED_MODULE_8__.useMentions)(),
            mentions = _useMentions.mentions;
          var hasNameError = !!(errors !== null && errors !== void 0 && errors.name);
          var renderErrorName = function renderErrorName() {
            return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
              'div',
              {
                className: 'flex flex-row items-center px-2 space-x-1 my-1',
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
                'Insight name is required',
              ),
            );
          };
          var from =
            _from !== null && _from !== void 0
              ? _from
              : Array.isArray(dateRange)
              ? dayjs__WEBPACK_IMPORTED_MODULE_16___default()(dateRange[0]).format('YYYY-MM-DD')
              : undefined;
          var to =
            _to !== null && _to !== void 0
              ? _to
              : Array.isArray(dateRange)
              ? dayjs__WEBPACK_IMPORTED_MODULE_16___default()(dateRange[1]).format('YYYY-MM-DD')
              : undefined;
          var _useInsightTransactio = (0,
            _useInsightTransactions__WEBPACK_IMPORTED_MODULE_20__.useInsightTransactions)(
              _objectSpread(
                {
                  props: props !== null && props !== void 0 ? props : [],
                  dateRange: typeof dateRange === 'string' ? dateRange : 'custom',
                  from: from,
                  to: to,
                  groupBy: groupBy,
                  limit:
                    _common_constants__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_ITEMS_PER_INFINITE_LOAD,
                  offset:
                    (page - 1) *
                    _common_constants__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_ITEMS_PER_INFINITE_LOAD,
                },
                _common_utils__WEBPACK_IMPORTED_MODULE_3__.StringUtils.toApiSortParam(
                  sortTransactionsBy,
                ),
              ),
            ),
            transactions = _useInsightTransactio.transactions,
            isValidatingTransactions = _useInsightTransactio.isValidatingTransactions,
            totalCount = _useInsightTransactio.totalCount;
          var hideLastYear =
            !!from &&
            !!to &&
            dayjs__WEBPACK_IMPORTED_MODULE_16___default()(from).year() !==
              dayjs__WEBPACK_IMPORTED_MODULE_16___default()(to).year();
          react__WEBPACK_IMPORTED_MODULE_17__.useEffect(
            function () {
              setPage(1);
              // eslint-disable-next-line react-hooks/exhaustive-deps
            },
            [
              JSON.stringify({
                props: props !== null && props !== void 0 ? props : [],
                dateRange: dateRange,
                groupBy: groupBy,
              }),
            ],
          );
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
            _common_components__WEBPACK_IMPORTED_MODULE_1__.OverlayLoader,
            {
              loading: isInitializingInsightSpendings,
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
              'div',
              {
                className: (0, clsx__WEBPACK_IMPORTED_MODULE_15__['default'])(
                  'rounded-card border-card shadow-card',
                  'bg-white',
                ),
              },
              feed
                ? /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                    _feed_FeedCard_FeedCardHeader__WEBPACK_IMPORTED_MODULE_6__.FeedCardHeader,
                    {
                      type: 'INSIGHT',
                    },
                  )
                : /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement('div', {
                    className: 'h-3 rounded-t-card',
                    style: {
                      background: 'linear-gradient(138.74deg, #395BD4 -12.96%, #82B2B3 100%)',
                    },
                  }),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                'div',
                {
                  className: (0, clsx__WEBPACK_IMPORTED_MODULE_15__['default'])('py-6 px-8'),
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                  'div',
                  {
                    className: 'grid grid-cols-10',
                  },
                  feed
                    ? /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                        react__WEBPACK_IMPORTED_MODULE_17__.Fragment,
                        null,
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                          _common_components__WEBPACK_IMPORTED_MODULE_1__.Input,
                          {
                            readOnly: true,
                            value: name,
                            variant: 'underline',
                            className: 'font-bold text-lg col-span-7',
                          },
                        ),
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                          'div',
                          {
                            className: 'col-span-3 flex items-center justify-end',
                          },
                          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                            _InsightCardActionMenu__WEBPACK_IMPORTED_MODULE_18__.InsightCardActionMenu,
                            {
                              feed: feed,
                              onDeleteSuccess: onDeleteSuccess,
                            },
                          ),
                        ),
                      )
                    : /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                        _common_components__WEBPACK_IMPORTED_MODULE_1__.Form.Input,
                        {
                          name: 'name',
                          rules: {
                            required: true,
                          },
                          readOnly: !!feed,
                          variant: 'underline',
                          className: 'font-bold text-lg col-span-7',
                          placeholder: 'Name this insight...',
                        },
                      ),
                ),
                hasNameError && renderErrorName(),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                  'div',
                  {
                    className: (0, clsx__WEBPACK_IMPORTED_MODULE_15__['default'])(
                      'relative top-5',
                      'grid grid-cols-10 gap-4',
                    ),
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                    'div',
                    {
                      className: 'col-span-7',
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                      'div',
                      {
                        className: 'flex gap-4 h-10',
                      },
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                        'div',
                        null,
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                          'div',
                          {
                            className: 'flex gap-1 items-center text-xs text-Gray-6',
                          },
                          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement('div', {
                            className: 'w-1.5 h-1.5 rounded bg-Accent-2',
                          }),
                          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                            'span',
                            null,
                            'Spend',
                          ),
                        ),
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                          'p',
                          {
                            className: 'text-primary font-bold font-sm',
                          },
                          (0, _main_utils__WEBPACK_IMPORTED_MODULE_7__.getDisplayUsdAmount)(
                            totalSpend,
                          ),
                        ),
                      ),
                      !hideLastYear &&
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                          'div',
                          null,
                          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                            'div',
                            {
                              className: 'flex gap-1 items-center text-xs text-Gray-6',
                            },
                            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement('div', {
                              className: 'w-1.5 h-1.5 rounded bg-Gray-6',
                            }),
                            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                              'span',
                              null,
                              'Last Year',
                            ),
                          ),
                          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                            'p',
                            {
                              className: 'text-primary font-bold font-sm',
                            },
                            (0, _main_utils__WEBPACK_IMPORTED_MODULE_7__.getDisplayUsdAmount)(
                              totalSpendLastYear,
                            ),
                          ),
                        ),
                    ),
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                      'div',
                      {
                        className:
                          'h-[400px] mt-3 flex-1 border border-Gray-12 rounded-lg px-4 pt-10 pb-6',
                      },
                      !groupBy
                        ? /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                            _spending_SpendingBarChart__WEBPACK_IMPORTED_MODULE_11__.SpendingBarChart,
                            {
                              thisYearData: curYearSpends,
                              lastYearData: prevYearSpends,
                            },
                          )
                        : /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                            _spending_GroupedSpendingChart__WEBPACK_IMPORTED_MODULE_9__.GroupedSpendingChart,
                            {
                              data: insightSpendings,
                              highlightedItemId: hoveredItemId,
                              dateRange: dateRange,
                            },
                          ),
                    ),
                  ),
                  !!groupBy &&
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                      _spending_GroupedSpendingChartLegends__WEBPACK_IMPORTED_MODULE_10__.GroupedSpendingChartLegends,
                      {
                        spendings: insightSpendings,
                        groupBy: groupBy,
                        highlightedItemId: hoveredItemId,
                        onItemMouseEnter: setHoveredItemId,
                        onItemMouseLeave: function onItemMouseLeave() {
                          return setHoveredItemId(undefined);
                        },
                        dateRange: dateRange,
                        className: 'col-span-3 w-auto',
                      },
                    ),
                ),
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                _transactions_TransactionList__WEBPACK_IMPORTED_MODULE_14__.TransactionList,
                {
                  className: 'my-6 mx-8',
                  defaultExpand: false,
                  onPageChange: setPage,
                  totalCount: totalCount,
                  transactions: transactions,
                  loading: isValidatingTransactions,
                  sort: sortTransactionsBy,
                  onSortChange: setSortTransactionsBy,
                  showLoadMoreButton: transactions.length % 10 === 0,
                },
              ),
              feed
                ? /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                    _feed_FeedCard_CommentsSection__WEBPACK_IMPORTED_MODULE_5__.CommentsSection,
                    {
                      feed: feed,
                    },
                  )
                : /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                    'div',
                    {
                      className: (0, clsx__WEBPACK_IMPORTED_MODULE_15__['default'])('py-4 px-18', {
                        'opacity-70 pointer-events-none': !postable,
                      }),
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                      _feed_CommentBox__WEBPACK_IMPORTED_MODULE_4__.CommentBox,
                      {
                        allowEmpty: true,
                        alwaysShowTools: true,
                        mentionData: mentions,
                        onSubmit: onPost,
                        className: '!rounded-lg',
                        placeholder: '@mention people or teams to your share insights',
                        renderSubmitButton: function renderSubmitButton(_ref3) {
                          var disabled = _ref3.disabled,
                            onClick = _ref3.onClick;
                          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                            _common_components__WEBPACK_IMPORTED_MODULE_1__.Button,
                            {
                              loading: posting,
                              variant: 'solid',
                              colorScheme: 'accent',
                              size: 'sm',
                              disabled: disabled,
                              onClick: onClick,
                              iconRight:
                                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_17__.createElement(
                                  _assets__WEBPACK_IMPORTED_MODULE_0__.EssentialsSendEnableIcon,
                                  null,
                                ),
                              className: 'px-6',
                            },
                            'Post',
                          );
                        },
                      },
                    ),
                  ),
            ),
          );
        };

        /***/
      },

    /***/ './src/insight/InsightCardActionMenu.tsx':
      /*!***********************************************!*\
  !*** ./src/insight/InsightCardActionMenu.tsx ***!
  \***********************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ InsightCardActionMenu: function () {
            return /* binding */ InsightCardActionMenu;
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
        /* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @/common/utils */ './src/common/utils/index.ts',
        );
        /* harmony import */ var _subscription_useSubscribe__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! @/subscription/useSubscribe */ './src/subscription/useSubscribe.ts',
          );
        /* harmony import */ var _subscription_useSubscription__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! @/subscription/useSubscription */ './src/subscription/useSubscription.ts',
          );
        /* harmony import */ var _subscription_useUnsubscribe__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! @/subscription/useUnsubscribe */ './src/subscription/useUnsubscribe.ts',
          );
        /* harmony import */ var _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_9__ =
          __webpack_require__(
            /*! @heroicons/react/outline */ './node_modules/@heroicons/react/outline/esm/TrashIcon.js',
          );
        /* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(
            /*! react-router-dom */ './node_modules/react-router-dom/esm/react-router-dom.js',
          );
        /* harmony import */ var _apis__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! ./apis */ './src/insight/apis.ts',
        );

        var InsightCardActionMenu = function InsightCardActionMenu(_ref) {
          var _subscription$insight;
          var insight = _ref.feed.insight,
            onDeleteSuccess = _ref.onDeleteSuccess;
          var id = insight.id,
            updatedAt = insight.updatedAt,
            props = insight.props,
            _insight$creator = insight.creator,
            fullName = _insight$creator.fullName,
            avatar = _insight$creator.avatar;
          var vendorProps = props.filter(function (_ref2) {
            var type = _ref2.type;
            return type === 'VENDOR';
          });
          var departmentProps = props.filter(function (_ref3) {
            var type = _ref3.type;
            return type === 'DEPARTMENT';
          });
          var categoryProps = props.filter(function (_ref4) {
            var type = _ref4.type;
            return type === 'CATEGORY';
          });
          var viewDetailsDisclosure = (0,
          _common_hooks__WEBPACK_IMPORTED_MODULE_2__.useDisclosure)();
          var _useHandler = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_2__.useHandler)(
              function () {
                return _apis__WEBPACK_IMPORTED_MODULE_7__.InsightApis['delete'](id);
              },
              {
                onSuccess: onDeleteSuccess,
              },
            ),
            deleteInsight = _useHandler.handle;
          var _useSubscription = (0,
            _subscription_useSubscription__WEBPACK_IMPORTED_MODULE_5__.useSubscription)(),
            subscription = _useSubscription.subscription;
          var _useSubscribe = (0,
            _subscription_useSubscribe__WEBPACK_IMPORTED_MODULE_4__.useSubscribe)(),
            subscribe = _useSubscribe.subscribe;
          var _useUnsubscribe = (0,
            _subscription_useUnsubscribe__WEBPACK_IMPORTED_MODULE_6__.useUnsubscribe)(),
            unsubscribe = _useUnsubscribe.unsubscribe;
          var isFollowing =
            subscription === null || subscription === void 0
              ? void 0
              : (_subscription$insight = subscription.insights) === null ||
                _subscription$insight === void 0
              ? void 0
              : _subscription$insight.find(function (insight) {
                  return insight.id === id;
                });
          return /*#__PURE__*/ React.createElement(
            _common_components__WEBPACK_IMPORTED_MODULE_1__.Menu,
            {
              placement: 'bottom-end',
              onClose: viewDetailsDisclosure.close,
            },
            viewDetailsDisclosure.isOpen
              ? /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className:
                      'py-5 px-4 shadow-card w-[300px] bg-white max-h-[300px] overflow-auto',
                  },
                  /*#__PURE__*/ React.createElement(
                    'div',
                    {
                      className: 'flex items-center gap-2 flex-wrap',
                    },
                    /*#__PURE__*/ React.createElement(
                      _common_components__WEBPACK_IMPORTED_MODULE_1__.Avatar,
                      {
                        src: avatar,
                        fullName: 'fullName',
                        size: 'md',
                      },
                    ),
                    /*#__PURE__*/ React.createElement(
                      'div',
                      null,
                      /*#__PURE__*/ React.createElement(
                        'h4',
                        {
                          className: 'font-bold text-xs',
                        },
                        fullName,
                      ),
                      /*#__PURE__*/ React.createElement(
                        'p',
                        {
                          className: 'text-Gray-6 text-xs',
                        },
                        'Last edited ',
                        (0, _common_utils__WEBPACK_IMPORTED_MODULE_3__.distanceToNow)(updatedAt),
                      ),
                    ),
                  ),
                  !!props.length &&
                    /*#__PURE__*/ React.createElement(
                      'div',
                      {
                        className: 'mt-4',
                      },
                      /*#__PURE__*/ React.createElement(
                        'h5',
                        {
                          className: 'font-bold text-xs',
                        },
                        'Properties',
                      ),
                      /*#__PURE__*/ React.createElement(
                        'div',
                        {
                          className: 'flex gap-2 mt-2 flex-wrap',
                        },
                        vendorProps.map(function (_ref5) {
                          var id = _ref5.id,
                            name = _ref5.name;
                          return /*#__PURE__*/ React.createElement(
                            _common_components__WEBPACK_IMPORTED_MODULE_1__.Tag,
                            {
                              icon: /*#__PURE__*/ React.createElement(
                                _assets__WEBPACK_IMPORTED_MODULE_0__.VendorIcon,
                                null,
                              ),
                              key: id,
                              colorScheme: 'orange',
                            },
                            name,
                          );
                        }),
                        categoryProps.map(function (_ref6) {
                          var id = _ref6.id,
                            name = _ref6.name;
                          return /*#__PURE__*/ React.createElement(
                            _common_components__WEBPACK_IMPORTED_MODULE_1__.Tag,
                            {
                              icon: /*#__PURE__*/ React.createElement(
                                _assets__WEBPACK_IMPORTED_MODULE_0__.CategoryIcon,
                                null,
                              ),
                              key: id,
                              colorScheme: 'accent',
                            },
                            name,
                          );
                        }),
                        departmentProps.map(function (_ref7) {
                          var id = _ref7.id,
                            name = _ref7.name;
                          return /*#__PURE__*/ React.createElement(
                            _common_components__WEBPACK_IMPORTED_MODULE_1__.Tag,
                            {
                              icon: /*#__PURE__*/ React.createElement(
                                _assets__WEBPACK_IMPORTED_MODULE_0__.TeamIcon,
                                null,
                              ),
                              key: id,
                              colorScheme: 'cyan',
                            },
                            name,
                          );
                        }),
                      ),
                    ),
                )
              : /*#__PURE__*/ React.createElement(
                  React.Fragment,
                  null,
                  /*#__PURE__*/ React.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_1__.Menu.Item,
                    {
                      onClick: viewDetailsDisclosure.open,
                      closeOnClick: false,
                      className: 'w-[145px]',
                      leftIcon: /*#__PURE__*/ React.createElement(
                        _assets__WEBPACK_IMPORTED_MODULE_0__.EyeIcon,
                        {
                          width: 16,
                          height: 16,
                        },
                      ),
                    },
                    'View Details',
                  ),
                  /*#__PURE__*/ React.createElement(
                    react_router_dom__WEBPACK_IMPORTED_MODULE_8__.Link,
                    {
                      to: '/insights/'.concat(id),
                    },
                    /*#__PURE__*/ React.createElement(
                      _common_components__WEBPACK_IMPORTED_MODULE_1__.Menu.Item,
                      {
                        leftIcon: /*#__PURE__*/ React.createElement(
                          _assets__WEBPACK_IMPORTED_MODULE_0__.EditIcon,
                          {
                            width: 16,
                            height: 16,
                          },
                        ),
                      },
                      'Edit Insight',
                    ),
                  ),
                  !isFollowing
                    ? /*#__PURE__*/ React.createElement(
                        _common_components__WEBPACK_IMPORTED_MODULE_1__.Menu.Item,
                        {
                          leftIcon: /*#__PURE__*/ React.createElement(
                            _assets__WEBPACK_IMPORTED_MODULE_0__.PlusCircleSolidIcon,
                            null,
                          ),
                          onClick: function onClick() {
                            return subscribe('insights', [insight]);
                          },
                        },
                        'Follow',
                      )
                    : /*#__PURE__*/ React.createElement(
                        _common_components__WEBPACK_IMPORTED_MODULE_1__.Menu.Item,
                        {
                          leftIcon: /*#__PURE__*/ React.createElement(
                            _assets__WEBPACK_IMPORTED_MODULE_0__.TickCircleSolidIcon,
                            {
                              width: 16,
                              height: 16,
                              className: 'text-Green-400',
                            },
                          ),
                          onClick: function onClick() {
                            return unsubscribe('insights', [insight]);
                          },
                        },
                        'Following',
                      ),
                  /*#__PURE__*/ React.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_1__.Divider,
                    null,
                  ),
                  /*#__PURE__*/ React.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_1__.Menu.Item,
                    {
                      onClick: deleteInsight,
                      leftIcon: /*#__PURE__*/ React.createElement(
                        _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_9__['default'],
                        {
                          width: 16,
                          height: 16,
                          className: 'text-danger',
                        },
                      ),
                    },
                    'Delete Insight',
                  ),
                ),
          );
        };

        /***/
      },

    /***/ './src/insight/apis.ts':
      /*!*****************************!*\
  !*** ./src/insight/apis.ts ***!
  \*****************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ InsightApis: function () {
            return /* binding */ InsightApis;
          },
          /* harmony export */
        });
        /* harmony import */ var _rest_apis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/rest/apis */ './src/rest/apis.ts',
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

        var get = function get(id) {
          return _rest_apis__WEBPACK_IMPORTED_MODULE_0__.RestApis.get('/insight/items/'.concat(id));
        };
        var create = /*#__PURE__*/ (function () {
          var _ref = _asyncToGenerator(
            /*#__PURE__*/ _regeneratorRuntime().mark(function _callee(payload) {
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1)
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      return _context.abrupt(
                        'return',
                        _rest_apis__WEBPACK_IMPORTED_MODULE_0__.RestApis.post(
                          '/insight/items',
                          payload,
                        ),
                      );
                    case 1:
                    case 'end':
                      return _context.stop();
                  }
              }, _callee);
            }),
          );
          return function create(_x) {
            return _ref.apply(this, arguments);
          };
        })();
        var update = /*#__PURE__*/ (function () {
          var _ref2 = _asyncToGenerator(
            /*#__PURE__*/ _regeneratorRuntime().mark(function _callee2(id, payload) {
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1)
                  switch ((_context2.prev = _context2.next)) {
                    case 0:
                      return _context2.abrupt(
                        'return',
                        _rest_apis__WEBPACK_IMPORTED_MODULE_0__.RestApis.put(
                          '/insight/items/'.concat(id),
                          payload,
                        ),
                      );
                    case 1:
                    case 'end':
                      return _context2.stop();
                  }
              }, _callee2);
            }),
          );
          return function update(_x2, _x3) {
            return _ref2.apply(this, arguments);
          };
        })();
        var _delete = /*#__PURE__*/ (function () {
          var _ref3 = _asyncToGenerator(
            /*#__PURE__*/ _regeneratorRuntime().mark(function _callee3(id) {
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1)
                  switch ((_context3.prev = _context3.next)) {
                    case 0:
                      return _context3.abrupt(
                        'return',
                        _rest_apis__WEBPACK_IMPORTED_MODULE_0__.RestApis['delete'](
                          '/insight/items/'.concat(id),
                        ),
                      );
                    case 1:
                    case 'end':
                      return _context3.stop();
                  }
              }, _callee3);
            }),
          );
          return function _delete(_x4) {
            return _ref3.apply(this, arguments);
          };
        })();
        var InsightApis = {
          get: get,
          create: create,
          update: update,
          delete: _delete,
        };

        /***/
      },

    /***/ './src/insight/useInsightSpendings.ts':
      /*!********************************************!*\
  !*** ./src/insight/useInsightSpendings.ts ***!
  \********************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ useInsightSpendings: function () {
            return /* binding */ useInsightSpendings;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var _common_utils_date__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! @/common/utils/date */ './src/common/utils/date.ts');
        /* harmony import */ var _feed_apis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @/feed/apis */ './src/feed/apis.ts',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );

        var useInsightSpendings = function useInsightSpendings(params, configs) {
          var _ref = configs || {},
            _ref$enabled = _ref.enabled,
            enabled = _ref$enabled === void 0 ? true : _ref$enabled;
          var _useFetcher = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_0__.useFetcher)(
              enabled && ['useInsightSpendings', params],
              function () {
                return _feed_apis__WEBPACK_IMPORTED_MODULE_2__.FeedApis.getSpending(params);
              },
              {
                laggy: true,
              },
            ),
            data = _useFetcher.data,
            isInitializing = _useFetcher.isInitializing,
            isValidating = _useFetcher.isValidating,
            mutate = _useFetcher.mutate;
          var curYearSpends = react__WEBPACK_IMPORTED_MODULE_3__.useMemo(
            function () {
              var _data$filter;
              return (_data$filter =
                data === null || data === void 0
                  ? void 0
                  : data.filter(function (_ref2) {
                      var year = _ref2.year;
                      return (
                        year === (0, _common_utils_date__WEBPACK_IMPORTED_MODULE_1__.getThisYear)()
                      );
                    })) !== null && _data$filter !== void 0
                ? _data$filter
                : [];
            },
            [data],
          );
          var prevYearSpends = react__WEBPACK_IMPORTED_MODULE_3__.useMemo(
            function () {
              var _data$filter2;
              return (_data$filter2 =
                data === null || data === void 0
                  ? void 0
                  : data.filter(function (_ref3) {
                      var year = _ref3.year;
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
          return react__WEBPACK_IMPORTED_MODULE_3__.useMemo(
            function () {
              return {
                insightSpendings: data,
                curYearSpends: curYearSpends,
                prevYearSpends: prevYearSpends,
                isInitializingInsightSpendings: isInitializing,
                isValidatingInsightSpendings: isValidating,
                mutateInsightSpendings: mutate,
              };
            },
            [curYearSpends, data, isInitializing, isValidating, mutate, prevYearSpends],
          );
        };

        /***/
      },

    /***/ './src/insight/useInsightTransactions.ts':
      /*!***********************************************!*\
  !*** ./src/insight/useInsightTransactions.ts ***!
  \***********************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ useInsightTransactions: function () {
            return /* binding */ useInsightTransactions;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/constants */ './src/common/constants.ts');
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var _feed_apis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @/feed/apis */ './src/feed/apis.ts',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );

        var useInsightTransactions = function useInsightTransactions(body) {
          var _useFetcher = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_1__.useFetcher)(
              ['insight-transactions', body],
              function () {
                return _feed_apis__WEBPACK_IMPORTED_MODULE_2__.FeedApis.getInsightLineItems(body);
              },
              {
                laggy: true,
              },
            ),
            data = _useFetcher.data,
            isInitializing = _useFetcher.isInitializing,
            isValidating = _useFetcher.isValidating,
            mutate = _useFetcher.mutate;
          var _ref = data !== null && data !== void 0 ? data : {},
            _ref$lineItems = _ref.lineItems,
            lineItems =
              _ref$lineItems === void 0
                ? _common_constants__WEBPACK_IMPORTED_MODULE_0__.EMPTY_ARRAY
                : _ref$lineItems,
            _ref$totalCount = _ref.totalCount,
            totalCount = _ref$totalCount === void 0 ? 0 : _ref$totalCount;
          return react__WEBPACK_IMPORTED_MODULE_3__.useMemo(
            function () {
              return {
                transactions: lineItems,
                totalCount: totalCount,
                isInitializingTransactions: isInitializing,
                isValidatingTransactions: isValidating,
                mutateTransactions: mutate,
              };
            },
            [isInitializing, isValidating, lineItems, mutate, totalCount],
          );
        };

        /***/
      },

    /***/ './node_modules/@heroicons/react/outline/esm/TrashIcon.js':
      /*!****************************************************************!*\
  !*** ./node_modules/@heroicons/react/outline/esm/TrashIcon.js ***!
  \****************************************************************/
      /***/ function (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__,
      ) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );

        function TrashIcon(props, svgRef) {
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
            'svg',
            Object.assign(
              {
                xmlns: 'http://www.w3.org/2000/svg',
                fill: 'none',
                viewBox: '0 0 24 24',
                strokeWidth: 2,
                stroke: 'currentColor',
                'aria-hidden': 'true',
                ref: svgRef,
              },
              props,
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement('path', {
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              d: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
            }),
          );
        }

        const ForwardRef = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(TrashIcon);
        /* harmony default export */ __webpack_exports__['default'] = ForwardRef;

        /***/
      },
  },
]);
//# sourceMappingURL=src_insight_InsightCard_tsx.bundle.js.map
