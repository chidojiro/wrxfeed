'use strict';
(self['webpackChunkgravity_web'] = self['webpackChunkgravity_web'] || []).push([
  ['src_main_pages_Notifications_index_tsx'],
  {
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

    /***/ './src/main/atoms/ListEndComponent/index.tsx':
      /*!***************************************************!*\
  !*** ./src/main/atoms/ListEndComponent/index.tsx ***!
  \***************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );

        var ListEndComponent = function ListEndComponent(_ref) {
          var message = _ref.message;
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
            react__WEBPACK_IMPORTED_MODULE_0__.Fragment,
            null,
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
              'p',
              {
                className: 'text-base text-center text-Neutral-4 mt-3 sm:mt-8',
              },
              message || "That's all for now.",
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
                'span',
                {
                  role: 'img',
                  'aria-label': 'rocket',
                },
                ' ',
                '\uD83D\uDE80',
              ),
            ),
          );
        };
        ListEndComponent.defaultProps = {
          message: '',
        };
        /* harmony default export */ __webpack_exports__['default'] = ListEndComponent;

        /***/
      },

    /***/ './src/main/molecules/NotificationItem/index.tsx':
      /*!*******************************************************!*\
  !*** ./src/main/molecules/NotificationItem/index.tsx ***!
  \*******************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/common/utils */ './src/common/utils/index.ts',
        );
        /* harmony import */ var _feed_CommentText__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! @/feed/CommentText */ './src/feed/CommentText.tsx');
        /* harmony import */ var _main_entity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @/main/entity */ './src/main/entity/index.ts',
        );
        /* harmony import */ var _main_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @/main/utils */ './src/main/utils.ts',
        );
        /* harmony import */ var _mixpanel_useMixPanel__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(/*! @/mixpanel/useMixPanel */ './src/mixpanel/useMixPanel.ts');
        /* harmony import */ var _profile_useProfile__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(/*! @/profile/useProfile */ './src/profile/useProfile.ts');
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var mixpanel_browser__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(
            /*! mixpanel-browser */ './node_modules/mixpanel-browser/dist/mixpanel.cjs.js',
          );
        /* harmony import */ var mixpanel_browser__WEBPACK_IMPORTED_MODULE_8___default =
          /*#__PURE__*/ __webpack_require__.n(mixpanel_browser__WEBPACK_IMPORTED_MODULE_8__);
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );

        var NotificationItem = function NotificationItem(_ref) {
          var item = _ref.item,
            _onClick = _ref.onClick;
          var avatarBgColor = react__WEBPACK_IMPORTED_MODULE_9__.useMemo(
            function () {
              var _item$content;
              return (0, _main_utils__WEBPACK_IMPORTED_MODULE_4__.getColorByText)(
                (_item$content = item === null || item === void 0 ? void 0 : item.content) !==
                  null && _item$content !== void 0
                  ? _item$content
                  : '',
              );
            },
            [item === null || item === void 0 ? void 0 : item.content],
          );
          var isNew = item.status === _main_entity__WEBPACK_IMPORTED_MODULE_3__.NotifyStatus.UNREAD;
          var _useProfile = (0, _profile_useProfile__WEBPACK_IMPORTED_MODULE_6__.useProfile)(),
            profile = _useProfile.profile;
          var renderAvatarOrShortname = function renderAvatarOrShortname() {
            var _item$causedByUser, _item$causedByUser2;
            var shortName = (0, _main_utils__WEBPACK_IMPORTED_MODULE_4__.getNameAbbreviation)(
              item === null || item === void 0
                ? void 0
                : (_item$causedByUser = item.causedByUser) === null || _item$causedByUser === void 0
                ? void 0
                : _item$causedByUser.fullName,
            );
            var isHaveAvatar =
              item === null || item === void 0
                ? void 0
                : (_item$causedByUser2 = item.causedByUser) === null ||
                  _item$causedByUser2 === void 0
                ? void 0
                : _item$causedByUser2.avatar;
            return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_9__.createElement(
              'div',
              {
                className: 'flex flex-row justify-center items-center w-10 h-10 rounded-full',
                style: {
                  backgroundColor: avatarBgColor,
                },
              },
              isHaveAvatar &&
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_9__.createElement(
                  _common_components__WEBPACK_IMPORTED_MODULE_0__.Avatar,
                  {
                    size: 'lg',
                    fullName: item.causedByUser.fullName,
                    src: isHaveAvatar,
                  },
                ),
              !isHaveAvatar &&
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_9__.createElement(
                  'p',
                  {
                    className: 'text-sm font-bold text-white',
                  },
                  shortName,
                ),
            );
          };
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_9__.createElement(
            _common_components__WEBPACK_IMPORTED_MODULE_0__.Button,
            {
              onClick: function onClick() {
                var _profile$company;
                _onClick(item);
                mixpanel_browser__WEBPACK_IMPORTED_MODULE_8___default().track(
                  'Notification Click',
                  {
                    user_id: profile === null || profile === void 0 ? void 0 : profile.id,
                    email: profile === null || profile === void 0 ? void 0 : profile.email,
                    company_id:
                      profile === null || profile === void 0
                        ? void 0
                        : (_profile$company = profile.company) === null ||
                          _profile$company === void 0
                        ? void 0
                        : _profile$company.id,
                  },
                );
                (0, _mixpanel_useMixPanel__WEBPACK_IMPORTED_MODULE_5__.identifyMixPanelUserProfile)(
                  profile,
                );
              },
              className: (0, clsx__WEBPACK_IMPORTED_MODULE_7__['default'])(
                'flex flex-row min-h-16 pl-3 pr-5 py-4 w-full',
                isNew ? 'bg-white' : 'bg-Gray-18',
              ),
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_9__.createElement(
              'div',
              {
                className: 'flex flex-row items-center',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_9__.createElement('div', {
                className: (0, clsx__WEBPACK_IMPORTED_MODULE_7__['default'])(
                  'flex self-center w-1.5 h-1.5 rounded-full mr-1.5',
                  isNew ? 'bg-system-success' : 'bg-transparent',
                ),
              }),
              renderAvatarOrShortname(),
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_9__.createElement(
              _feed_CommentText__WEBPACK_IMPORTED_MODULE_2__.CommentText,
              {
                content: item.content,
                className: 'text-left leading-6 break-words ml-4 !whitespace-normal',
              },
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_9__.createElement(
              'div',
              {
                className: 'flex w-40 ml-auto',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_9__.createElement(
                'div',
                {
                  className: 'flex text-Gray-6 font-regular ml-auto text-right text-xs',
                },
                (0, _common_utils__WEBPACK_IMPORTED_MODULE_1__.distanceToNow)(
                  item === null || item === void 0 ? void 0 : item.createdAt,
                ),
              ),
            ),
          );
        };
        /* harmony default export */ __webpack_exports__['default'] = NotificationItem;

        /***/
      },

    /***/ './src/main/organisms/NotificationList/index.tsx':
      /*!*******************************************************!*\
  !*** ./src/main/organisms/NotificationList/index.tsx ***!
  \*******************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var _main_molecules_NotificationItem__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! @/main/molecules/NotificationItem */ './src/main/molecules/NotificationItem/index.tsx',
          );
        /* harmony import */ var _main_atoms_ListLoading__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! @/main/atoms/ListLoading */ './src/main/atoms/ListLoading/index.tsx',
          );
        /* harmony import */ var _main_atoms_ListEndComponent__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! @/main/atoms/ListEndComponent */ './src/main/atoms/ListEndComponent/index.tsx',
          );
        /* harmony import */ var mixpanel_browser__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! mixpanel-browser */ './node_modules/mixpanel-browser/dist/mixpanel.cjs.js',
          );
        /* harmony import */ var mixpanel_browser__WEBPACK_IMPORTED_MODULE_4___default =
          /*#__PURE__*/ __webpack_require__.n(mixpanel_browser__WEBPACK_IMPORTED_MODULE_4__);
        /* harmony import */ var _profile_useProfile__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(/*! @/profile/useProfile */ './src/profile/useProfile.ts');
        /* harmony import */ var _common_atoms_InfiniteScroller__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! @/common/atoms/InfiniteScroller */ './src/common/atoms/InfiniteScroller/index.tsx',
          );
        /* harmony import */ var _mixpanel_useMixPanel__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(/*! @/mixpanel/useMixPanel */ './src/mixpanel/useMixPanel.ts');
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
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

        var NotificationList = function NotificationList(_ref) {
          var style = _ref.style,
            notifications = _ref.notifications,
            isLoading = _ref.isLoading,
            onLoadMore = _ref.onLoadMore,
            onClickNotification = _ref.onClickNotification,
            hasMore = _ref.hasMore;
          var _useProfile = (0, _profile_useProfile__WEBPACK_IMPORTED_MODULE_5__.useProfile)(),
            profile = _useProfile.profile;
          (0, _common_hooks__WEBPACK_IMPORTED_MODULE_8__.useMountEffect)(function () {
            var _profile$company;
            mixpanel_browser__WEBPACK_IMPORTED_MODULE_4___default().track('Notifications View', {
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
            _mixpanel_useMixPanel__WEBPACK_IMPORTED_MODULE_7__.identifyMixPanelUserProfile)(profile);
          });
          var renderEmptyList = function renderEmptyList() {
            return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
              'div',
              {
                className: 'pb-5 text-center',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
                'svg',
                {
                  className: 'mx-auto h-8 w-8 text-gray-400',
                  fill: 'none',
                  viewBox: '0 0 24 24',
                  stroke: 'currentColor',
                  'aria-hidden': 'true',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement('path', {
                  vectorEffect: 'non-scaling-stroke',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeWidth: 2,
                  d: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z',
                }),
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
                'h3',
                {
                  className: 'mt-2 text-sm text-Gray-3',
                },
                'No notifications',
              ),
            );
          };
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
            _common_atoms_InfiniteScroller__WEBPACK_IMPORTED_MODULE_6__['default'],
            {
              className: 'pb-2 mr-0.5',
              style: _objectSpread({}, style),
              onLoadMore: onLoadMore,
              isLoading: isLoading,
              LoadingComponent: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
                _main_atoms_ListLoading__WEBPACK_IMPORTED_MODULE_2__['default'],
                null,
              ),
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
              'ul',
              {
                className: 'pb-5 space-y-0.5',
              },
              notifications.map(function (item) {
                return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
                  _main_molecules_NotificationItem__WEBPACK_IMPORTED_MODULE_1__['default'],
                  {
                    key: item.id,
                    item: item,
                    onClick: onClickNotification,
                  },
                );
              }),
            ),
            !isLoading && !notifications.length && renderEmptyList(),
            !isLoading &&
              notifications.length > 0 &&
              !hasMore &&
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
                _main_atoms_ListEndComponent__WEBPACK_IMPORTED_MODULE_3__['default'],
                null,
              ),
          );
        };
        /* harmony default export */ __webpack_exports__['default'] = NotificationList;

        /***/
      },

    /***/ './src/main/pages/Notifications/index.tsx':
      /*!************************************************!*\
  !*** ./src/main/pages/Notifications/index.tsx ***!
  \************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ NotificationsPage: function () {
            return /* binding */ NotificationsPage;
          },
          /* harmony export */
        });
        /* harmony import */ var _layout_MainLayout__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/layout/MainLayout */ './src/layout/MainLayout.tsx');
        /* harmony import */ var _main_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/main/hooks */ './src/main/hooks/index.ts',
        );
        /* harmony import */ var _notification_apis__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! @/notification/apis */ './src/notification/apis.ts');
        /* harmony import */ var _routing_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @/routing/routes */ './src/routing/routes.tsx',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! react-router-dom */ './node_modules/react-router/esm/react-router.js',
          );
        /* harmony import */ var _organisms_NotificationList__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! ../../organisms/NotificationList */ './src/main/organisms/NotificationList/index.tsx',
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

        var LIMIT_GET_NOTIFICATIONS = 30;
        var INIT_PAGINATION = Object.freeze({
          offset: 0,
          limit: LIMIT_GET_NOTIFICATIONS,
        });
        var NotificationsPage = function NotificationsPage() {
          var _React$useState = react__WEBPACK_IMPORTED_MODULE_4__.useState(INIT_PAGINATION),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            filter = _React$useState2[0],
            setFilter = _React$useState2[1];
          var _useNotification = (0, _main_hooks__WEBPACK_IMPORTED_MODULE_1__.useNotification)(
              filter,
            ),
            notifications = _useNotification.notifications,
            isLoading = _useNotification.isLoading,
            hasMore = _useNotification.hasMore,
            patchNotification = _useNotification.patchNotification;
          var history = (0, react_router_dom__WEBPACK_IMPORTED_MODULE_6__.useHistory)();
          react__WEBPACK_IMPORTED_MODULE_4__.useEffect(function () {
            _notification_apis__WEBPACK_IMPORTED_MODULE_2__.NotificationApis.markAllAsRead();
          }, []);
          var handleLoadMore = react__WEBPACK_IMPORTED_MODULE_4__.useCallback(
            function () {
              if (!hasMore || isLoading) return;
              setFilter(function (prevFilter) {
                var _prevFilter$limit, _prevFilter$offset, _prevFilter$limit2;
                return {
                  limit:
                    (_prevFilter$limit =
                      prevFilter === null || prevFilter === void 0 ? void 0 : prevFilter.limit) !==
                      null && _prevFilter$limit !== void 0
                      ? _prevFilter$limit
                      : 0,
                  offset:
                    ((_prevFilter$offset =
                      prevFilter === null || prevFilter === void 0 ? void 0 : prevFilter.offset) !==
                      null && _prevFilter$offset !== void 0
                      ? _prevFilter$offset
                      : 0) +
                    ((_prevFilter$limit2 =
                      prevFilter === null || prevFilter === void 0 ? void 0 : prevFilter.limit) !==
                      null && _prevFilter$limit2 !== void 0
                      ? _prevFilter$limit2
                      : 0),
                };
              });
            },
            [hasMore, isLoading],
          );
          var onClickNotification = /*#__PURE__*/ (function () {
            var _ref = _asyncToGenerator(
              /*#__PURE__*/ _regeneratorRuntime().mark(function _callee(item) {
                var _item$data;
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1)
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        history.push(
                          ''.concat(
                            _routing_routes__WEBPACK_IMPORTED_MODULE_3__.Routes.Feed.path.replace(
                              ':id',
                              ''.concat(
                                (_item$data = item.data) === null || _item$data === void 0
                                  ? void 0
                                  : _item$data.itemId,
                              ),
                            ),
                          ),
                        );
                        patchNotification(item === null || item === void 0 ? void 0 : item.id);
                      case 2:
                      case 'end':
                        return _context.stop();
                    }
                }, _callee);
              }),
            );
            return function onClickNotification(_x2) {
              return _ref.apply(this, arguments);
            };
          })();
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
            _layout_MainLayout__WEBPACK_IMPORTED_MODULE_0__.MainLayout,
            null,
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
              'h1',
              {
                className: 'sr-only',
              },
              'Notifications feed',
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
              'div',
              {
                className: 'flex items-center space-x-4 pb-6',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                'h1',
                {
                  className: 'text-Gray-3 text-xl font-semibold ml-4 sm:ml-0',
                },
                'Notifications',
              ),
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
              _organisms_NotificationList__WEBPACK_IMPORTED_MODULE_5__['default'],
              {
                notifications: notifications,
                isLoading: isLoading,
                onLoadMore: handleLoadMore,
                onClickNotification: onClickNotification,
                hasMore: hasMore,
              },
            ),
          );
        };

        /***/
      },
  },
]);
//# sourceMappingURL=src_main_pages_Notifications_index_tsx.bundle.js.map
