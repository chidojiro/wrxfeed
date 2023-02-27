'use strict';
(self['webpackChunkgravity_web'] = self['webpackChunkgravity_web'] || []).push([
  ['src_feed_FeedCard_TransactionFeedItemCard_tsx'],
  {
    /***/ './src/feed/FeedCard/FeedBackModal.tsx':
      /*!*********************************************!*\
  !*** ./src/feed/FeedCard/FeedBackModal.tsx ***!
  \*********************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ FeedBackModal: function () {
            return /* binding */ FeedBackModal;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_atoms_LinearProgress__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! @/common/atoms/LinearProgress */ './src/common/atoms/LinearProgress/index.tsx',
          );
        /* harmony import */ var _common_atoms_Modal__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! @/common/atoms/Modal */ './src/common/atoms/Modal/index.tsx');
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _main_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @/main/hooks */ './src/main/hooks/index.ts',
        );
        /* harmony import */ var _main_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @/main/types */ './src/main/types.ts',
        );
        /* harmony import */ var _main_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! @/main/utils */ './src/main/utils.ts',
        );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          /*! react-toastify */ './node_modules/react-toastify/dist/react-toastify.esm.js',
        );
        /* harmony import */ var _CommentBox__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
          /*! ../CommentBox */ './src/feed/CommentBox/index.ts',
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

        var FeedBackModal = function FeedBackModal(_ref) {
          var open = _ref.open,
            onClose = _ref.onClose,
            itemId = _ref.itemId,
            _ref$enableMaxChar = _ref.enableMaxChar,
            enableMaxChar = _ref$enableMaxChar === void 0 ? false : _ref$enableMaxChar,
            _ref$maxChar = _ref.maxChar,
            maxChar = _ref$maxChar === void 0 ? 20000 : _ref$maxChar,
            _ref$type = _ref.type,
            type =
              _ref$type === void 0
                ? _main_types__WEBPACK_IMPORTED_MODULE_4__.FeedBackType.Rollup
                : _ref$type;
          var _React$useState = react__WEBPACK_IMPORTED_MODULE_7__.useState(false),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            isOpen = _React$useState2[0],
            setOpen = _React$useState2[1];
          var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_7__.useState(''),
            _React$useState4 = _slicedToArray(_React$useState3, 2),
            feedback = _React$useState4[0],
            setFeedback = _React$useState4[1];
          var onUploadSuccess = function onUploadSuccess() {
            onClose();
          };
          var _useFeedBack = (0, _main_hooks__WEBPACK_IMPORTED_MODULE_3__.useFeedBack)({
              onSuccess: onUploadSuccess,
            }),
            isLoading = _useFeedBack.isLoading,
            postFeedback = _useFeedBack.postFeedback;
          var isSendable = feedback.length > 0 && feedback.length <= maxChar;
          react__WEBPACK_IMPORTED_MODULE_7__.useEffect(
            function () {
              setOpen(open);
            },
            [open],
          );
          var handleClose = function handleClose() {
            setOpen(false);
            onClose();
          };
          var handleSubmit = function handleSubmit() {
            if (feedback.length === 0) return;
            if (!isSendable) {
              react_toastify__WEBPACK_IMPORTED_MODULE_8__.toast.error('Invalid feedback content!');
              return;
            }
            postFeedback(type, itemId, {
              content: feedback,
            });
          };
          var onChangeTextContent = function onChangeTextContent(content) {
            if (!content) return;
            var rawText = (0, _main_utils__WEBPACK_IMPORTED_MODULE_5__.commentEditorRawParser)(
              content.getCurrentContent(),
            );
            setFeedback(rawText);
          };
          var renderMaxCharacters = function renderMaxCharacters() {
            if (!enableMaxChar) return null;
            var isMax = feedback.length > maxChar;
            var maxLengthText =
              feedback.length === 0
                ? 'max '.concat(maxChar, ' characters')
                : '/'.concat(maxChar, ' characters');
            return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
              'p',
              {
                className: 'mt-2 text-sm text-right text-Gray-4',
              },
              feedback.length !== 0 &&
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                  'span',
                  {
                    className: isMax ? 'text-system-alert' : 'text-Gray-4',
                  },
                  feedback.length,
                ),
              maxLengthText,
            );
          };
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
            _common_atoms_Modal__WEBPACK_IMPORTED_MODULE_1__['default'],
            {
              open: isOpen,
              onClose: handleClose,
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
              'div',
              {
                className: 'sm:max-w-[442px]',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                'div',
                {
                  className: 'px-10 pb-10',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                  'p',
                  {
                    className: 'text-2xl text-Gray-1 font-bold mt-8',
                  },
                  'Please describe the specific issue with this item.',
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                  'p',
                  {
                    className: 'mt-3 text-Gray-1 text-sm',
                  },
                  'Ex: Data is mapped to wrong category, transaction is not for this team',
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                  _CommentBox__WEBPACK_IMPORTED_MODULE_9__.CommentBox,
                  {
                    placeholder: 'Your feedback here\u2026',
                    style: {
                      backgroundColor: 'white',
                      marginTop: '32px',
                    },
                    showAttach: false,
                    showEmoji: false,
                    showSend: false,
                    alwaysFocus: true,
                    onChange: onChangeTextContent,
                  },
                ),
                renderMaxCharacters(),
              ),
              isLoading &&
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                  _common_atoms_LinearProgress__WEBPACK_IMPORTED_MODULE_0__['default'],
                  null,
                ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement('hr', {
                className: 'divider divider-horizontal',
              }),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                'div',
                {
                  className: 'flex justify-end h-[66px] px-6 py-4',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                  _common_components__WEBPACK_IMPORTED_MODULE_2__.Button,
                  {
                    disabled: isLoading,
                    className: 'rounded text-sm font-bold text-Gray-2 px-5',
                    onClick: handleClose,
                  },
                  'Cancel',
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_7__.createElement(
                  _common_components__WEBPACK_IMPORTED_MODULE_2__.Button,
                  {
                    className: (0, clsx__WEBPACK_IMPORTED_MODULE_6__['default'])(
                      'rounded text-sm font-bold text-white ml-2 px-5',
                      isSendable ? 'bg-purple-5' : 'bg-Gray-4',
                    ),
                    disabled: isLoading,
                    onClick: handleSubmit,
                  },
                  'Submit',
                ),
              ),
            ),
          );
        };

        /***/
      },

    /***/ './src/feed/FeedCard/TransactionFeedItemCard.tsx':
      /*!*******************************************************!*\
  !*** ./src/feed/FeedCard/TransactionFeedItemCard.tsx ***!
  \*******************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ TransactionFeedItemCard: function () {
            return /* binding */ TransactionFeedItemCard;
          },
          /* harmony export */
        });
        /* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/assets */ './src/assets/index.ts',
        );
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _main_atoms_PopoverMenu__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! @/main/atoms/PopoverMenu */ './src/main/atoms/PopoverMenu/index.tsx',
          );
        /* harmony import */ var _main_atoms_PopoverMenuItem__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! @/main/atoms/PopoverMenuItem */ './src/main/atoms/PopoverMenuItem/index.tsx',
          );
        /* harmony import */ var _main_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @/main/utils */ './src/main/utils.ts',
        );
        /* harmony import */ var _transactions_TransactionList__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! @/transactions/TransactionList */ './src/transactions/TransactionList/index.tsx',
          );
        /* harmony import */ var _dwarvesf_react_hooks__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! @dwarvesf/react-hooks */ './node_modules/@dwarvesf/react-hooks/dist/index.js',
          );
        /* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_14__ =
          __webpack_require__(
            /*! @headlessui/react */ './node_modules/@headlessui/react/dist/components/menu/menu.js',
          );
        /* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! dayjs */ './node_modules/dayjs/dayjs.min.js',
        );
        /* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_7___default =
          /*#__PURE__*/ __webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_7__);
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_13__ =
          __webpack_require__(
            /*! react-router-dom */ './node_modules/react-router-dom/esm/react-router-dom.js',
          );
        /* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
          /*! react-toastify */ './node_modules/react-toastify/dist/react-toastify.esm.js',
        );
        /* harmony import */ var _CommentsSection__WEBPACK_IMPORTED_MODULE_10__ =
          __webpack_require__(/*! ./CommentsSection */ './src/feed/FeedCard/CommentsSection.tsx');
        /* harmony import */ var _FeedBackModal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
          /*! ./FeedBackModal */ './src/feed/FeedCard/FeedBackModal.tsx',
        );
        /* harmony import */ var _FeedCardHeader__WEBPACK_IMPORTED_MODULE_12__ =
          __webpack_require__(/*! ./FeedCardHeader */ './src/feed/FeedCard/FeedCardHeader.tsx');

        var TransactionFeedItemCard = function TransactionFeedItemCard(_ref) {
          var _feed$lineItem$vendor,
            _feed$lineItem$vendor2,
            _feed$lineItem$depart,
            _feed$lineItem$depart2,
            _feed$lineItem$catego,
            _feed$lineItem$catego2;
          var feed = _ref.feed,
            loading = _ref.loading;
          var feedbackModalDisclosure = (0,
          _dwarvesf_react_hooks__WEBPACK_IMPORTED_MODULE_6__.useDisclosure)();
          var handleCopyFeedLink = function handleCopyFeedLink() {
            navigator.clipboard.writeText(
              ''.concat(window.location.host, '/feed/item/').concat(feed.id),
            );
            react_toastify__WEBPACK_IMPORTED_MODULE_9__.toast.success(
              'Feed line item link has been copied',
            );
          };
          var renderMenuItems = function renderMenuItems() {
            var items = [];
            items.push(
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                _main_atoms_PopoverMenuItem__WEBPACK_IMPORTED_MODULE_3__['default'],
                {
                  key: 'issue-with-this-item',
                  value: 'issue-with-this-item',
                  label: 'Issue With This Item',
                  onClick: feedbackModalDisclosure.onOpen,
                },
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                _main_atoms_PopoverMenuItem__WEBPACK_IMPORTED_MODULE_3__['default'],
                {
                  key: 'copy-feed-link',
                  value: 'copy-feed-link',
                  label: 'Copy Link',
                  onClick: handleCopyFeedLink,
                },
              ),
            );
            return items;
          };
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
            react__WEBPACK_IMPORTED_MODULE_8__.Fragment,
            null,
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
              _common_components__WEBPACK_IMPORTED_MODULE_1__.OverlayLoader,
              {
                loading: loading,
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                'article',
                {
                  className: 'bg-white flex flex-col filter shadow-md rounded-card',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                  'div',
                  {
                    className: 'flex flex-row',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                    _FeedCardHeader__WEBPACK_IMPORTED_MODULE_12__.FeedCardHeader,
                    {
                      type: 'TRANSACTION',
                    },
                  ),
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                  'div',
                  {
                    className: 'px-8 pt-3 pb-6',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                    'div',
                    {
                      className: 'flex justify-between',
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                      'div',
                      {
                        className: 'space-y-1',
                      },
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                        react_router_dom__WEBPACK_IMPORTED_MODULE_13__.Link,
                        {
                          className: 'flex items-center hover:underline',
                          to: '/vendors/'.concat(
                            feed === null || feed === void 0
                              ? void 0
                              : (_feed$lineItem$vendor = feed.lineItem.vendor) === null ||
                                _feed$lineItem$vendor === void 0
                              ? void 0
                              : _feed$lineItem$vendor.id,
                          ),
                        },
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                          'p',
                          {
                            className: 'text-base font-bold text-primary',
                          },
                          feed === null || feed === void 0
                            ? void 0
                            : (_feed$lineItem$vendor2 = feed.lineItem.vendor) === null ||
                              _feed$lineItem$vendor2 === void 0
                            ? void 0
                            : _feed$lineItem$vendor2.name,
                        ),
                      ),
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                        'p',
                        {
                          className: 'flex space-x-0.5 text-xs font-normal text-Gray-6',
                        },
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                          react_router_dom__WEBPACK_IMPORTED_MODULE_13__.Link,
                          {
                            className: 'flex items-center hover:underline',
                            to: '/departments/'.concat(
                              feed === null || feed === void 0
                                ? void 0
                                : (_feed$lineItem$depart = feed.lineItem.department) === null ||
                                  _feed$lineItem$depart === void 0
                                ? void 0
                                : _feed$lineItem$depart.id,
                            ),
                          },
                          feed === null || feed === void 0
                            ? void 0
                            : (_feed$lineItem$depart2 = feed.lineItem.department) === null ||
                              _feed$lineItem$depart2 === void 0
                            ? void 0
                            : _feed$lineItem$depart2.name,
                          ' \xB7',
                        ),
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                          react_router_dom__WEBPACK_IMPORTED_MODULE_13__.Link,
                          {
                            className: 'flex items-center hover:underline',
                            to: '/categories/'.concat(
                              feed === null || feed === void 0
                                ? void 0
                                : (_feed$lineItem$catego = feed.lineItem.category) === null ||
                                  _feed$lineItem$catego === void 0
                                ? void 0
                                : _feed$lineItem$catego.id,
                            ),
                          },
                          ' ',
                          feed === null || feed === void 0
                            ? void 0
                            : (_feed$lineItem$catego2 = feed.lineItem.category) === null ||
                              _feed$lineItem$catego2 === void 0
                            ? void 0
                            : _feed$lineItem$catego2.name,
                          ' \xB7',
                        ),
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                          'span',
                          null,
                          ' ',
                          dayjs__WEBPACK_IMPORTED_MODULE_7___default()(
                            feed === null || feed === void 0 ? void 0 : feed.lineItem.transDate,
                          ).format('DD/MM/YY'),
                        ),
                      ),
                    ),
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                      'div',
                      {
                        className: 'flex space-x-3.5',
                      },
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                        'p',
                        {
                          className: 'text-lg leading-5 font-semibold text-primary',
                        },
                        (0, _main_utils__WEBPACK_IMPORTED_MODULE_4__.decimalLogic)(
                          feed === null || feed === void 0 ? void 0 : feed.lineItem.amountUsd,
                          '$',
                        ),
                      ),
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                        _headlessui_react__WEBPACK_IMPORTED_MODULE_14__.Menu,
                        {
                          as: 'div',
                          className: 'relative inline-block z-20 text-left mt-0.5',
                        },
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                          'div',
                          null,
                          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                            _headlessui_react__WEBPACK_IMPORTED_MODULE_14__.Menu.Button,
                            {
                              className:
                                '-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600',
                            },
                            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                              'span',
                              {
                                className: 'sr-only',
                              },
                              'Open options',
                            ),
                            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                              _assets__WEBPACK_IMPORTED_MODULE_0__.MoreVerticalIcon,
                              {
                                className: 'fill-current text-Gray-3 path-no-filled',
                                'aria-hidden': 'true',
                                viewBox: '0 0 15 15',
                              },
                            ),
                          ),
                        ),
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                          _main_atoms_PopoverMenu__WEBPACK_IMPORTED_MODULE_2__['default'],
                          null,
                          renderMenuItems(),
                        ),
                      ),
                    ),
                  ),
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                  'div',
                  {
                    className: 'px-9 py-6 border-t border-b border-Gray-11',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                    'div',
                    {
                      className: 'flex justify-between',
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                      'p',
                      {
                        className: ' font-normal text-xs text-Gray-6',
                      },
                      feed === null || feed === void 0 ? void 0 : feed.lineItem.description,
                      ' ',
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                        'span',
                        null,
                        ' - '.concat(
                          (feed === null || feed === void 0 ? void 0 : feed.month) &&
                            dayjs__WEBPACK_IMPORTED_MODULE_7___default()()
                              .month((feed === null || feed === void 0 ? void 0 : feed.month) - 1)
                              .format('MMMM'),
                        ),
                      ),
                    ),
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                      _common_components__WEBPACK_IMPORTED_MODULE_1__.StatusTag,
                      {
                        colorScheme: (0,
                        _transactions_TransactionList__WEBPACK_IMPORTED_MODULE_5__.getTransactionColorScheme)(
                          feed === null || feed === void 0 ? void 0 : feed.lineItem.transStatus,
                        ),
                        className: 'h-5 text-xs font-medium',
                      },
                      (0,
                      _transactions_TransactionList__WEBPACK_IMPORTED_MODULE_5__.shouldTruncateTranStatus)(
                        feed === null || feed === void 0 ? void 0 : feed.lineItem.transStatus,
                      )
                        ? /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                            _common_components__WEBPACK_IMPORTED_MODULE_1__.Tooltip,
                            {
                              trigger:
                                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                                  'p',
                                  {
                                    className: 'truncate w-8',
                                  },
                                  feed === null || feed === void 0
                                    ? void 0
                                    : feed.lineItem.transStatus,
                                ),
                            },
                            feed === null || feed === void 0 ? void 0 : feed.lineItem.transStatus,
                          )
                        : /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                            'p',
                            null,
                            feed === null || feed === void 0 ? void 0 : feed.lineItem.transStatus,
                          ),
                    ),
                  ),
                ),
                feed &&
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                    _CommentsSection__WEBPACK_IMPORTED_MODULE_10__.CommentsSection,
                    {
                      feed: feed,
                    },
                  ),
              ),
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
              _FeedBackModal__WEBPACK_IMPORTED_MODULE_11__.FeedBackModal,
              {
                open: feedbackModalDisclosure.isOpen,
                onClose: feedbackModalDisclosure.onClose,
                itemId: feed.id,
              },
            ),
          );
        };

        /***/
      },
  },
]);
//# sourceMappingURL=src_feed_FeedCard_TransactionFeedItemCard_tsx.bundle.js.map
