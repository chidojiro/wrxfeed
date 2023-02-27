'use strict';
(self['webpackChunkgravity_web'] = self['webpackChunkgravity_web'] || []).push([
  ['src_team_TeamPage_tsx'],
  {
    /***/ './src/assets/icons/outline/basics-add-small.svg':
      /*!*******************************************************!*\
  !*** ./src/assets/icons/outline/basics-add-small.svg ***!
  \*******************************************************/
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

        var SvgBasicsAddSmall = function SvgBasicsAddSmall(props) {
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
            _path ||
              (_path = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement('path', {
                fillRule: 'evenodd',
                clipRule: 'evenodd',
                d: 'M7.467 7.467v-3.2h1.066v3.2h3.2v1.066h-3.2v3.2H7.467v-3.2h-3.2V7.467h3.2z',
                fill: 'currentColor',
              })),
          );
        };
        /* harmony default export */ __webpack_exports__['default'] = SvgBasicsAddSmall;

        /***/
      },

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

    /***/ './src/auth/HiddenItem.tsx':
      /*!*********************************!*\
  !*** ./src/auth/HiddenItem.tsx ***!
  \*********************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ HiddenItem: function () {
            return /* binding */ HiddenItem;
          },
          /* harmony export */
        });
        /* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/assets */ './src/assets/index.ts',
        );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );

        var HiddenItem = function HiddenItem(_ref) {
          var className = _ref.className;
          return /*#__PURE__*/ React.createElement(
            'div',
            {
              className: (0, clsx__WEBPACK_IMPORTED_MODULE_1__['default'])(
                'flex items-center gap-1',
                className,
              ),
            },
            /*#__PURE__*/ React.createElement(_assets__WEBPACK_IMPORTED_MODULE_0__.EyeHideIcon, {
              className: 'text-red-1',
            }),
            /*#__PURE__*/ React.createElement(
              'span',
              {
                className: 'text-Gray-6 italic',
              },
              'Hidden item',
            ),
          );
        };

        /***/
      },

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

    /***/ './src/main/molecules/DepartmentItem/index.tsx':
      /*!*****************************************************!*\
  !*** ./src/main/molecules/DepartmentItem/index.tsx ***!
  \*****************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var _subscription_ToggleFollowButton__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! @/subscription/ToggleFollowButton */ './src/subscription/ToggleFollowButton.tsx',
          );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );

        var DepartmentItem = function DepartmentItem(_ref) {
          var className = _ref.className,
            item = _ref.item,
            _ref$disableFollow = _ref.disableFollow,
            disableFollow = _ref$disableFollow === void 0 ? false : _ref$disableFollow,
            onClick = _ref.onClick,
            _ref$hideName = _ref.hideName,
            hideName = _ref$hideName === void 0 ? false : _ref$hideName,
            inHeader = _ref.inHeader;
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
            'div',
            {
              'aria-hidden': 'true',
              className: (0, clsx__WEBPACK_IMPORTED_MODULE_1__['default'])(
                'flex items-center space-x-2 cursor-pointer py-3 min-h-16 px-2 sm:px-6 w-full text-sm text-Gray-3',
                className,
              ),
              onClick: onClick,
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
              'div',
              {
                className: 'flex flex-1',
              },
              !hideName &&
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
                  'p',
                  {
                    className: 'text-sm font-medium text-Gray-1',
                  },
                  item === null || item === void 0 ? void 0 : item.name,
                ),
            ),
            !disableFollow &&
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
                _subscription_ToggleFollowButton__WEBPACK_IMPORTED_MODULE_0__.ToggleFollowButton,
                {
                  type: 'departments',
                  item: item,
                  colorScheme: inHeader ? 'white' : 'primary',
                },
              ),
          );
        };
        /* harmony default export */ __webpack_exports__['default'] = DepartmentItem;

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

    /***/ './src/target/usePrimaryTarget.ts':
      /*!****************************************!*\
  !*** ./src/target/usePrimaryTarget.ts ***!
  \****************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ usePrimaryTarget: function () {
            return /* binding */ usePrimaryTarget;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/common/utils */ './src/common/utils/index.ts',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var _apis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! ./apis */ './src/target/apis.ts',
        );
        /* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! ./constants */ './src/target/constants.ts',
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

        var usePrimaryTarget = function usePrimaryTarget(departmentId) {
          var fetcherReturn = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_0__.useFetcher)(
            ['primaryTarget', departmentId],
            function () {
              return _apis__WEBPACK_IMPORTED_MODULE_3__.TargetApis.getList({
                year: _common_utils__WEBPACK_IMPORTED_MODULE_1__.DateUtils.getThisYear(),
                offset: 0,
                limit: 1,
                isPrimary: 1,
                dep: departmentId,
              });
            },
          );
          return react__WEBPACK_IMPORTED_MODULE_2__.useMemo(
            function () {
              var _fetcherReturn$data$, _fetcherReturn$data;
              return _objectSpread(
                _objectSpread({}, fetcherReturn),
                {},
                {
                  data:
                    (_fetcherReturn$data$ =
                      (_fetcherReturn$data = fetcherReturn.data) === null ||
                      _fetcherReturn$data === void 0
                        ? void 0
                        : _fetcherReturn$data[0]) !== null && _fetcherReturn$data$ !== void 0
                      ? _fetcherReturn$data$
                      : _constants__WEBPACK_IMPORTED_MODULE_4__.fallbackTarget,
                },
              );
            },
            [fetcherReturn],
          );
        };

        /***/
      },

    /***/ './src/team/TeamHeader.tsx':
      /*!*********************************!*\
  !*** ./src/team/TeamHeader.tsx ***!
  \*********************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ TeamHeader: function () {
            return /* binding */ TeamHeader;
          },
          /* harmony export */
        });
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @/assets */ './src/assets/index.ts',
        );
        /* harmony import */ var _main_molecules_DepartmentItem__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! @/main/molecules/DepartmentItem */ './src/main/molecules/DepartmentItem/index.tsx',
          );
        /* harmony import */ var _main_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @/main/utils */ './src/main/utils.ts',
        );

        var TeamHeader = function TeamHeader(_ref) {
          var className = _ref.className,
            department = _ref.department;
          var teamHeaderColor = react__WEBPACK_IMPORTED_MODULE_1__.useMemo(
            function () {
              return (0, _main_utils__WEBPACK_IMPORTED_MODULE_4__.getColorByText)(
                '',
                department === null || department === void 0 ? void 0 : department.id,
                true,
              );
            },
            [department === null || department === void 0 ? void 0 : department.id],
          );
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
            'div',
            {
              className: (0, clsx__WEBPACK_IMPORTED_MODULE_0__['default'])(
                'flex flex-row items-center px-6 mt-6 justify-between py-6 max-h-[84px] rounded-card',
                className,
              ),
              style: {
                background: teamHeaderColor,
              },
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
              'div',
              {
                className: 'flex flex-row overflow-hidden items-center space-x-4',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                'div',
                {
                  className:
                    'flex justify-center flex-shrink-0 items-center w-9 h-9 rounded-full border border-white',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                  _assets__WEBPACK_IMPORTED_MODULE_2__.TeamIcon,
                  {
                    className: 'w-5 h-5 fill-current path-no-filled text-white opacity-100',
                    'aria-hidden': 'true',
                    width: 20,
                    height: 20,
                  },
                ),
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                'p',
                {
                  className: 'text-white font-semibold truncate',
                },
                department === null || department === void 0 ? void 0 : department.name,
              ),
            ),
            !!department &&
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                _main_molecules_DepartmentItem__WEBPACK_IMPORTED_MODULE_3__['default'],
                {
                  item: department,
                  hideName: true,
                  inHeader: true,
                  className: 'w-auto',
                },
              ),
          );
        };

        /***/
      },

    /***/ './src/team/TeamPage.tsx':
      /*!*******************************!*\
  !*** ./src/team/TeamPage.tsx ***!
  \*******************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ TeamPage: function () {
            return /* binding */ TeamPage;
          },
          /* harmony export */
        });
        /* harmony import */ var _auth_RestrictedAccess__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/auth/RestrictedAccess */ './src/auth/RestrictedAccess.tsx');
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! @/common/constants */ './src/common/constants.ts');
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @/common/utils */ './src/common/utils/index.ts',
        );
        /* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! @/error */ './src/error/index.ts',
        );
        /* harmony import */ var _layout_MainLayout__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(/*! @/layout/MainLayout */ './src/layout/MainLayout.tsx');
        /* harmony import */ var _mixpanel_useMixPanel__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(/*! @/mixpanel/useMixPanel */ './src/mixpanel/useMixPanel.ts');
        /* harmony import */ var _profile_useProfile__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(/*! @/profile/useProfile */ './src/profile/useProfile.ts');
        /* harmony import */ var _spending_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
          /*! @/spending/utils */ './src/spending/utils.ts',
        );
        /* harmony import */ var _target_TargetCard__WEBPACK_IMPORTED_MODULE_10__ =
          __webpack_require__(/*! @/target/TargetCard */ './src/target/TargetCard.tsx');
        /* harmony import */ var _target_usePrimaryTarget__WEBPACK_IMPORTED_MODULE_11__ =
          __webpack_require__(/*! @/target/usePrimaryTarget */ './src/target/usePrimaryTarget.ts');
        /* harmony import */ var _transactions_TransactionList__WEBPACK_IMPORTED_MODULE_12__ =
          __webpack_require__(
            /*! @/transactions/TransactionList */ './src/transactions/TransactionList/index.tsx',
          );
        /* harmony import */ var _transactions_useTransactions__WEBPACK_IMPORTED_MODULE_13__ =
          __webpack_require__(
            /*! @/transactions/useTransactions */ './src/transactions/useTransactions.ts',
          );
        /* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
          /*! dayjs */ './node_modules/dayjs/dayjs.min.js',
        );
        /* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_14___default =
          /*#__PURE__*/ __webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_14__);
        /* harmony import */ var mixpanel_browser__WEBPACK_IMPORTED_MODULE_15__ =
          __webpack_require__(
            /*! mixpanel-browser */ './node_modules/mixpanel-browser/dist/mixpanel.cjs.js',
          );
        /* harmony import */ var mixpanel_browser__WEBPACK_IMPORTED_MODULE_15___default =
          /*#__PURE__*/ __webpack_require__.n(mixpanel_browser__WEBPACK_IMPORTED_MODULE_15__);
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_24__ =
          __webpack_require__(
            /*! react-router-dom */ './node_modules/react-router/esm/react-router.js',
          );
        /* harmony import */ var _apis__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
          /*! ./apis */ './src/team/apis.ts',
        );
        /* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
          /*! ./constants */ './src/team/constants.ts',
        );
        /* harmony import */ var _TeamHeader__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
          /*! ./TeamHeader */ './src/team/TeamHeader.tsx',
        );
        /* harmony import */ var _TeamTargetSummary__WEBPACK_IMPORTED_MODULE_20__ =
          __webpack_require__(/*! ./TeamTargetSummary */ './src/team/TeamTargetSummary.tsx');
        /* harmony import */ var _TopCategories__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
          /*! ./TopCategories */ './src/team/TopCategories/index.ts',
        );
        /* harmony import */ var _useDepartment__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(
          /*! ./useDepartment */ './src/team/useDepartment.ts',
        );
        /* harmony import */ var _useTopCategories__WEBPACK_IMPORTED_MODULE_23__ =
          __webpack_require__(/*! ./useTopCategories */ './src/team/useTopCategories.ts');
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

        var TeamPage = function TeamPage() {
          var _target$feedItem;
          var _useUrlState = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_3__.useUrlState)(
              'sortTransactionsBy',
              _constants__WEBPACK_IMPORTED_MODULE_18__.DEFAULT_SORT,
            ),
            _useUrlState2 = _slicedToArray(_useUrlState, 2),
            sortTransactionsBy = _useUrlState2[0],
            setSortTransactionsBy = _useUrlState2[1];
          var _useState = (0, react__WEBPACK_IMPORTED_MODULE_16__.useState)('30-days'),
            _useState2 = _slicedToArray(_useState, 2),
            dateRange = _useState2[0],
            setDateRange = _useState2[1];
          var _useState3 = (0, react__WEBPACK_IMPORTED_MODULE_16__.useState)('30-days'),
            _useState4 = _slicedToArray(_useState3, 2),
            topCategoriesDateRange = _useState4[0],
            setTopCategoriesDateRange = _useState4[1];
          var _useHandler = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_3__.useHandler)(function (
              departmentId,
            ) {
              return _apis__WEBPACK_IMPORTED_MODULE_17__.DepartmentApis.viewSummary(departmentId);
            }),
            viewDepartmentSummary = _useHandler.handle;
          var _ref = (0, react_router_dom__WEBPACK_IMPORTED_MODULE_24__.useParams)(),
            departmentIdParam = _ref.id;
          var departmentId = +departmentIdParam;
          var _usePrimaryTarget = (0,
            _target_usePrimaryTarget__WEBPACK_IMPORTED_MODULE_11__.usePrimaryTarget)(departmentId),
            target = _usePrimaryTarget.data,
            isValidatingTarget = _usePrimaryTarget.isValidating,
            mutate = _usePrimaryTarget.mutate;
          var _useState5 = (0, react__WEBPACK_IMPORTED_MODULE_16__.useState)(1),
            _useState6 = _slicedToArray(_useState5, 2),
            page = _useState6[0],
            setPage = _useState6[1];
          (0, _common_hooks__WEBPACK_IMPORTED_MODULE_3__.useMountEffect)(function () {
            viewDepartmentSummary(departmentId);
          });
          var _useTransactions = (0,
            _transactions_useTransactions__WEBPACK_IMPORTED_MODULE_13__.useTransactions)(
              _objectSpread(
                _objectSpread(
                  {
                    props: [
                      {
                        id: +departmentIdParam,
                        type: 'DEPARTMENT',
                        name: '',
                        exclude: false,
                      },
                    ],
                  },
                  (0, _spending_utils__WEBPACK_IMPORTED_MODULE_9__.convertDateRangeToFromTo)({
                    dateRange: dateRange,
                  }),
                ),
                {},
                {
                  limit:
                    _common_constants__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_ITEMS_PER_INFINITE_LOAD,
                  offset:
                    (page - 1) *
                    _common_constants__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_ITEMS_PER_INFINITE_LOAD,
                },
                _common_utils__WEBPACK_IMPORTED_MODULE_4__.StringUtils.toApiSortParam(
                  sortTransactionsBy !== null && sortTransactionsBy !== void 0
                    ? sortTransactionsBy
                    : '',
                ),
              ),
            ),
            transactions = _useTransactions.transactions,
            isValidatingTransactions = _useTransactions.isValidatingTransactions,
            totalCount = _useTransactions.totalCount;
          var _useTopCategories = (0,
            _useTopCategories__WEBPACK_IMPORTED_MODULE_23__.useTopCategories)(departmentId, {
              dateRange:
                typeof topCategoriesDateRange === 'string' ? topCategoriesDateRange : undefined,
              from: Array.isArray(topCategoriesDateRange)
                ? dayjs__WEBPACK_IMPORTED_MODULE_14___default()(topCategoriesDateRange[0]).format(
                    'YYYY-MM-DD',
                  )
                : undefined,
              to: Array.isArray(topCategoriesDateRange)
                ? dayjs__WEBPACK_IMPORTED_MODULE_14___default()(topCategoriesDateRange[1]).format(
                    'YYYY-MM-DD',
                  )
                : undefined,
            }),
            _useTopCategories$dat = _useTopCategories.data,
            topCategories =
              _useTopCategories$dat === void 0
                ? _common_constants__WEBPACK_IMPORTED_MODULE_2__.EMPTY_ARRAY
                : _useTopCategories$dat,
            isValidatingTopCategories = _useTopCategories.isValidating;
          var _useDepartment = (0, _useDepartment__WEBPACK_IMPORTED_MODULE_22__.useDepartment)(
              departmentId,
            ),
            department = _useDepartment.data,
            error = _useDepartment.error;
          var isForbidden =
            (error === null || error === void 0 ? void 0 : error.code) ===
            _error__WEBPACK_IMPORTED_MODULE_5__.ApiErrorCode.Forbidden;
          var _useProfile = (0, _profile_useProfile__WEBPACK_IMPORTED_MODULE_8__.useProfile)(),
            profile = _useProfile.profile;
          (0, _common_hooks__WEBPACK_IMPORTED_MODULE_3__.useMountEffect)(function () {
            var _profile$company;
            mixpanel_browser__WEBPACK_IMPORTED_MODULE_15___default().track('Team Page View', {
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
          if (isForbidden)
            return /*#__PURE__*/ React.createElement(
              _layout_MainLayout__WEBPACK_IMPORTED_MODULE_6__.MainLayout,
              null,
              /*#__PURE__*/ React.createElement(
                _auth_RestrictedAccess__WEBPACK_IMPORTED_MODULE_0__.RestrictedAccessPage,
                null,
              ),
            );
          return /*#__PURE__*/ React.createElement(
            _layout_MainLayout__WEBPACK_IMPORTED_MODULE_6__.MainLayout,
            null,
            /*#__PURE__*/ React.createElement(
              'h1',
              {
                className: 'sr-only',
              },
              'Department list',
            ),
            /*#__PURE__*/ React.createElement(
              _TeamHeader__WEBPACK_IMPORTED_MODULE_19__.TeamHeader,
              {
                department: department,
              },
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'grid grid-cols-9 gap-6 mt-6',
              },
              /*#__PURE__*/ React.createElement(
                _common_components__WEBPACK_IMPORTED_MODULE_1__.OverlayLoader,
                {
                  loading: isValidatingTarget,
                  className: 'col-span-9 lg:col-span-5',
                },
                /*#__PURE__*/ React.createElement(
                  _target_TargetCard__WEBPACK_IMPORTED_MODULE_10__.TargetCard,
                  {
                    className: 'h-full',
                    target: target,
                    showColorfulHeading: false,
                    onUpdateSuccess: function onUpdateSuccess(target) {
                      return mutate([target]);
                    },
                    onDeleteSuccess: function onDeleteSuccess() {
                      return mutate();
                    },
                    href: '/feed/'.concat(
                      (_target$feedItem = target.feedItem) === null || _target$feedItem === void 0
                        ? void 0
                        : _target$feedItem.id,
                    ),
                  },
                ),
              ),
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'col-span-9 lg:col-span-4 flex flex-col gap-6',
                },
                /*#__PURE__*/ React.createElement(
                  _TeamTargetSummary__WEBPACK_IMPORTED_MODULE_20__.TeamTargetSummary,
                  {
                    departmentId: departmentId,
                  },
                ),
                /*#__PURE__*/ React.createElement(
                  _common_components__WEBPACK_IMPORTED_MODULE_1__.OverlayLoader,
                  {
                    loading: isValidatingTopCategories,
                  },
                  /*#__PURE__*/ React.createElement(
                    _TopCategories__WEBPACK_IMPORTED_MODULE_21__.TopCategories,
                    {
                      dateRange: topCategoriesDateRange,
                      onDateRangeChange: setTopCategoriesDateRange,
                      topCategories: topCategories,
                    },
                  ),
                ),
              ),
            ),
            /*#__PURE__*/ React.createElement(
              _transactions_TransactionList__WEBPACK_IMPORTED_MODULE_12__.TransactionList,
              {
                onPageChange: setPage,
                transactions: transactions,
                loading: isValidatingTransactions,
                hiddenColumns: ['depName'],
                className: 'mt-6',
                sort: sortTransactionsBy,
                totalCount: totalCount,
                onSortChange: setSortTransactionsBy,
                dateRange: dateRange,
                onDateRangeChange: setDateRange,
              },
            ),
          );
        };

        /***/
      },

    /***/ './src/team/TeamTargetSummary.tsx':
      /*!****************************************!*\
  !*** ./src/team/TeamTargetSummary.tsx ***!
  \****************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ TeamTargetSummary: function () {
            return /* binding */ TeamTargetSummary;
          },
          /* harmony export */
        });
        /* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/assets */ './src/assets/index.ts',
        );
        /* harmony import */ var _assets_icons_outline_basics_add_small_svg__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! @/assets/icons/outline/basics-add-small.svg */ './src/assets/icons/outline/basics-add-small.svg',
          );
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _target_AddTargetModal__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! @/target/AddTargetModal */ './src/target/AddTargetModal/index.ts',
          );
        /* harmony import */ var _target_useTargets__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(/*! @/target/useTargets */ './src/target/useTargets.ts');
        /* harmony import */ var _dwarvesf_react_hooks__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! @dwarvesf/react-hooks */ './node_modules/@dwarvesf/react-hooks/dist/index.js',
          );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(
            /*! react-router-dom */ './node_modules/react-router/esm/react-router.js',
          );
        /* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(
            /*! react-router-dom */ './node_modules/react-router-dom/esm/react-router-dom.js',
          );

        var TeamTargetSummary = function TeamTargetSummary(_ref) {
          var departmentId = _ref.departmentId;
          var history = (0, react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useHistory)();
          var addTargetModalDisclosure = (0,
          _dwarvesf_react_hooks__WEBPACK_IMPORTED_MODULE_5__.useDisclosure)();
          var _useTargets = (0, _target_useTargets__WEBPACK_IMPORTED_MODULE_4__.useTargets)({
              dep: departmentId,
            }),
            _useTargets$data = _useTargets.data,
            targets = _useTargets$data === void 0 ? [] : _useTargets$data,
            isValidating = _useTargets.isValidating;
          return /*#__PURE__*/ React.createElement(
            React.Fragment,
            null,
            /*#__PURE__*/ React.createElement(
              _common_components__WEBPACK_IMPORTED_MODULE_2__.OverlayLoader,
              {
                loading: isValidating,
                className: 'hidden md:block',
              },
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'shadow-card rounded-card bg-white flex p-6',
                },
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'flex items-center',
                  },
                  /*#__PURE__*/ React.createElement(
                    react_router_dom__WEBPACK_IMPORTED_MODULE_8__.Link,
                    {
                      to: '/dashboard/all-company',
                      className: 'border-r border-solid pr-5 flex gap-3',
                    },
                    /*#__PURE__*/ React.createElement(
                      'div',
                      {
                        className: (0, clsx__WEBPACK_IMPORTED_MODULE_6__['default'])(
                          'rounded-full bg-Gray-12 w-14 h-14 flex items-center justify-center',
                        ),
                      },
                      /*#__PURE__*/ React.createElement(
                        _assets__WEBPACK_IMPORTED_MODULE_0__.TargetArrowFilled,
                        null,
                      ),
                    ),
                    /*#__PURE__*/ React.createElement(
                      'div',
                      null,
                      /*#__PURE__*/ React.createElement(
                        'p',
                        {
                          className: 'text-Gray-6',
                        },
                        'Targets',
                      ),
                      /*#__PURE__*/ React.createElement(
                        'p',
                        {
                          className: 'text-2xl font-semibold',
                        },
                        targets.length,
                      ),
                    ),
                  ),
                  /*#__PURE__*/ React.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_2__.Button,
                    {
                      className: 'pl-4 text-center',
                      onClick: addTargetModalDisclosure.onOpen,
                    },
                    /*#__PURE__*/ React.createElement(
                      'div',
                      {
                        className: 'text-center justify-center flex items-center gap-2 mx-auto',
                      },
                      /*#__PURE__*/ React.createElement(
                        'p',
                        {
                          className: 'text-md font-semibold',
                        },
                        'Create a target',
                      ),
                      /*#__PURE__*/ React.createElement(
                        'div',
                        {
                          className: 'rounded bg-Accent-2 !m-0 text-white',
                        },
                        /*#__PURE__*/ React.createElement(
                          _assets_icons_outline_basics_add_small_svg__WEBPACK_IMPORTED_MODULE_1__.ReactComponent,
                          {
                            className: 'w-4 h-4',
                          },
                        ),
                      ),
                    ),
                    /*#__PURE__*/ React.createElement(
                      'p',
                      {
                        className: 'text-Gray-6 text-sm',
                      },
                      'Align your teams to common goals. Targets help you track spend with categories and vendors.',
                    ),
                  ),
                ),
              ),
            ),
            /*#__PURE__*/ React.createElement(
              _target_AddTargetModal__WEBPACK_IMPORTED_MODULE_3__.AddTargetModal,
              {
                open: addTargetModalDisclosure.isOpen,
                onClose: addTargetModalDisclosure.onClose,
                onCancel: addTargetModalDisclosure.onClose,
                departmentId: departmentId,
                onCreateSuccess: function onCreateSuccess(data) {
                  var _data$feedItem;
                  return history.push(
                    '/feed/'.concat(
                      (_data$feedItem = data.feedItem) === null || _data$feedItem === void 0
                        ? void 0
                        : _data$feedItem.id,
                    ),
                  );
                },
              },
            ),
          );
        };

        /***/
      },

    /***/ './src/team/TopCategories/PieActiveShape.tsx':
      /*!***************************************************!*\
  !*** ./src/team/TopCategories/PieActiveShape.tsx ***!
  \***************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! recharts */ './node_modules/recharts/es6/shape/Sector.js',
        );

        var PieActiveShape = function PieActiveShape(_ref) {
          var cx = _ref.cx,
            cy = _ref.cy,
            innerRadius = _ref.innerRadius,
            outerRadius = _ref.outerRadius,
            startAngle = _ref.startAngle,
            endAngle = _ref.endAngle,
            fill = _ref.fill;
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
            recharts__WEBPACK_IMPORTED_MODULE_1__.Sector,
            {
              cx: cx,
              cy: cy,
              innerRadius: innerRadius * 0.95,
              outerRadius: outerRadius * 1.05,
              startAngle: startAngle,
              endAngle: endAngle,
              fill: fill,
            },
          );
        };
        /* harmony default export */ __webpack_exports__['default'] = PieActiveShape;

        /***/
      },

    /***/ './src/team/TopCategories/TopCategories.tsx':
      /*!**************************************************!*\
  !*** ./src/team/TopCategories/TopCategories.tsx ***!
  \**************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ TopCategories: function () {
            return /* binding */ TopCategories;
          },
          /* harmony export */
        });
        /* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/assets */ './src/assets/index.ts',
        );
        /* harmony import */ var _auth_HiddenItem__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! @/auth/HiddenItem */ './src/auth/HiddenItem.tsx');
        /* harmony import */ var _common_components_EmptyState__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! @/common/components/EmptyState */ './src/common/components/EmptyState/index.ts',
          );
        /* harmony import */ var _role_useRestrictedItems__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! @/role/useRestrictedItems */ './src/role/useRestrictedItems.ts');
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9__ =
          __webpack_require__(
            /*! react-router-dom */ './node_modules/react-router/esm/react-router.js',
          );
        /* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
          /*! recharts */ './node_modules/recharts/es6/chart/PieChart.js',
        );
        /* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
          /*! recharts */ './node_modules/recharts/es6/component/Tooltip.js',
        );
        /* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
          /*! recharts */ './node_modules/recharts/es6/polar/Pie.js',
        );
        /* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
          /*! recharts */ './node_modules/recharts/es6/component/Cell.js',
        );
        /* harmony import */ var _DateRangeSelect__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(/*! ../DateRangeSelect */ './src/team/DateRangeSelect.tsx');
        /* harmony import */ var _PieActiveShape__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! ./PieActiveShape */ './src/team/TopCategories/PieActiveShape.tsx',
        );
        /* harmony import */ var _TopCategoriesChartTooltip__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(
            /*! ./TopCategoriesChartTooltip */ './src/team/TopCategories/TopCategoriesChartTooltip.tsx',
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

        var COLORS = ['#165DFF', '#0FC6C2', '#F7BA1E', '#7A3FEB', '#3491FA', '#DFE1E6'];
        var TopCategories = function TopCategories(_ref) {
          var dateRange = _ref.dateRange,
            onDateRangeChange = _ref.onDateRangeChange,
            topCategories = _ref.topCategories;
          var _useState = (0, react__WEBPACK_IMPORTED_MODULE_5__.useState)(-1),
            _useState2 = _slicedToArray(_useState, 2),
            activeIndex = _useState2[0],
            setActiveIndex = _useState2[1];
          var history = (0, react_router_dom__WEBPACK_IMPORTED_MODULE_9__.useHistory)();
          var _useRestrictedItems = (0,
            _role_useRestrictedItems__WEBPACK_IMPORTED_MODULE_3__.useRestrictedItems)(),
            restrictedItems = _useRestrictedItems.restrictedItems;
          var restrictedCategoryIds = restrictedItems
            .filter(function (_ref2) {
              var type = _ref2.type;
              return type === 'CATEGORY';
            })
            .map(function (_ref3) {
              var id = _ref3.id;
              return id;
            });
          var handlePieEnter = (0, react__WEBPACK_IMPORTED_MODULE_5__.useCallback)(
            function (_, index) {
              setActiveIndex(index);
            },
            [setActiveIndex],
          );
          var handlePieLeave = (0, react__WEBPACK_IMPORTED_MODULE_5__.useCallback)(
            function () {
              setActiveIndex(-1);
            },
            [setActiveIndex],
          );
          var sortedData = topCategories.sort(function (a, b) {
            return b.spend - a.spend;
          });
          var spendSum = sortedData.reduce(function (acc, cur) {
            return acc + cur.spend;
          }, 0);
          var primaryCategories = sortedData.slice(0, 5);
          var otherCategories = sortedData.slice(5).reduce(
            function (acc, cur) {
              return _objectSpread(
                _objectSpread({}, acc),
                {},
                {
                  spend: acc.spend + cur.spend,
                },
              );
            },
            {
              name: 'Other',
              spend: 0,
            },
          );
          var chartData = []
            .concat(_toConsumableArray(primaryCategories), [
              otherCategories.spend && otherCategories,
            ])
            .filter(function (item) {
              return !!item;
            })
            .map(function (item, idx) {
              return _objectSpread(
                _objectSpread({}, item),
                {},
                {
                  percentage: spendSum ? (item.spend * 100) / spendSum : 0,
                  color: COLORS[idx],
                },
              );
            })
            .reverse();
          var handleClickCategoryCell = function handleClickCategoryCell(cell) {
            if (isNaN(cell.id)) {
              return;
            }
            history.push({
              pathname: '/categories/'.concat(cell === null || cell === void 0 ? void 0 : cell.id),
            });
          };
          return /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'shadow-card rounded-card bg-white',
            },
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'flex items-center justify-between p-5 border-b border-gray-28',
              },
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'flex gap-2 items-center font-semibold',
                },
                /*#__PURE__*/ React.createElement(
                  _assets__WEBPACK_IMPORTED_MODULE_0__.CategoryIcon,
                  null,
                ),
                'Top Categories',
              ),
              /*#__PURE__*/ React.createElement(
                _DateRangeSelect__WEBPACK_IMPORTED_MODULE_6__.DateRangeSelect,
                {
                  value: dateRange,
                  onChange: onDateRangeChange,
                },
              ),
            ),
            chartData.length === 0
              ? /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'flex flex-1 p-6',
                  },
                  /*#__PURE__*/ React.createElement(
                    _common_components_EmptyState__WEBPACK_IMPORTED_MODULE_2__.EmptyState,
                    {
                      title: 'No recent categories',
                      content: 'This will change as more transactions come in.',
                    },
                  ),
                )
              : /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'flex items-center justify-center gap-6 py-6 pr-6',
                  },
                  /*#__PURE__*/ React.createElement(
                    recharts__WEBPACK_IMPORTED_MODULE_10__.PieChart,
                    {
                      width: 200,
                      height: 200,
                    },
                    /*#__PURE__*/ React.createElement(
                      recharts__WEBPACK_IMPORTED_MODULE_11__.Tooltip,
                      {
                        content: function content(props) {
                          return /*#__PURE__*/ React.createElement(
                            _TopCategoriesChartTooltip__WEBPACK_IMPORTED_MODULE_8__['default'],
                            props,
                          );
                        },
                      },
                    ),
                    /*#__PURE__*/ React.createElement(
                      recharts__WEBPACK_IMPORTED_MODULE_12__.Pie,
                      {
                        startAngle: 90,
                        endAngle: 450,
                        activeIndex: activeIndex,
                        activeShape: _PieActiveShape__WEBPACK_IMPORTED_MODULE_7__['default'],
                        data: chartData,
                        cx: 100,
                        cy: 100,
                        innerRadius: 60,
                        outerRadius: 80,
                        dataKey: 'spend',
                        labelLine: false,
                        onMouseEnter: handlePieEnter,
                        onMouseLeave: handlePieLeave,
                        onClick: function onClick(_, index) {
                          return handleClickCategoryCell(chartData[index]);
                        },
                      },
                      chartData.map(function (_ref4) {
                        var color = _ref4.color,
                          name = _ref4.name;
                        return (
                          /*#__PURE__*/
                          // eslint-disable-next-line react/no-array-index-key
                          React.createElement(recharts__WEBPACK_IMPORTED_MODULE_13__.Cell, {
                            key: name,
                            fill: color,
                          })
                        );
                      }),
                    ),
                  ),
                  /*#__PURE__*/ React.createElement(
                    'ul',
                    {
                      className: 'flex flex-col gap-4',
                    },
                    chartData
                      .slice()
                      .reverse()
                      .map(function (_ref5) {
                        var name = _ref5.name,
                          color = _ref5.color,
                          id = _ref5.id;
                        return /*#__PURE__*/ React.createElement(
                          'li',
                          {
                            key: color,
                            className: (0, clsx__WEBPACK_IMPORTED_MODULE_4__['default'])(
                              'text-2xs text-gray-3 flex items-baseline leading-4 gap-1 w-[fit-content]',
                              {
                                '!items-center': restrictedCategoryIds.includes(id),
                              },
                            ),
                          },
                          /*#__PURE__*/ React.createElement('div', {
                            className: 'rounded-full w-1.5 h-1.5 flex-shrink-0',
                            style: {
                              background: color,
                            },
                          }),
                          restrictedCategoryIds.includes(id)
                            ? /*#__PURE__*/ React.createElement(
                                _auth_HiddenItem__WEBPACK_IMPORTED_MODULE_1__.HiddenItem,
                                null,
                              )
                            : name,
                        );
                      }),
                  ),
                ),
          );
        };

        /***/
      },

    /***/ './src/team/TopCategories/TopCategoriesChartTooltip.tsx':
      /*!**************************************************************!*\
  !*** ./src/team/TopCategories/TopCategoriesChartTooltip.tsx ***!
  \**************************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var _auth_HiddenItem__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/auth/HiddenItem */ './src/auth/HiddenItem.tsx');
        /* harmony import */ var _main_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/main/utils */ './src/main/utils.ts',
        );
        /* harmony import */ var _role_useRestrictedItems__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! @/role/useRestrictedItems */ './src/role/useRestrictedItems.ts');
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );

        var TopCategoriesChartTooltip = function TopCategoriesChartTooltip(_ref) {
          var active = _ref.active,
            payload = _ref.payload;
          var _useRestrictedItems = (0,
            _role_useRestrictedItems__WEBPACK_IMPORTED_MODULE_2__.useRestrictedItems)(),
            restrictedItems = _useRestrictedItems.restrictedItems;
          var restrictedCategoryIds = restrictedItems
            .filter(function (_ref2) {
              var type = _ref2.type;
              return type === 'CATEGORY';
            })
            .map(function (_ref3) {
              var id = _ref3.id;
              return id;
            });
          if (active && payload) {
            return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
              'div',
              {
                className: 'flex bg-primary p-2 rounded-sm',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                'div',
                {
                  className: 'flex flex-col',
                },
                payload.map(function (_ref4) {
                  var name = _ref4.name,
                    value = _ref4.value,
                    _ref4$payload = _ref4.payload,
                    fill = _ref4$payload.fill,
                    percentage = _ref4$payload.percentage,
                    id = _ref4$payload.id;
                  return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                    'div',
                    {
                      key: name,
                      className: '',
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                      'div',
                      {
                        className: 'flex gap-1',
                      },
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                        'div',
                        {
                          className: 'h-4 flex items-center',
                        },
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement('div', {
                          className: 'w-1.5 h-1.5 rounded-full flex',
                          style: {
                            background: fill,
                          },
                        }),
                      ),
                      restrictedCategoryIds.includes(id)
                        ? /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                            _auth_HiddenItem__WEBPACK_IMPORTED_MODULE_0__.HiddenItem,
                            {
                              className: 'text-xs',
                            },
                          )
                        : /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                            'p',
                            {
                              className: 'text-white text-2xs',
                            },
                            name,
                            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                              'span',
                              null,
                              ':',
                            ),
                          ),
                    ),
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                      'p',
                      {
                        className: 'text-white text-2xs',
                      },
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                        'span',
                        null,
                        'Spend: ',
                      ),
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                        'span',
                        null,
                        (0, _main_utils__WEBPACK_IMPORTED_MODULE_1__.decimalLogic)(value, '$'),
                        ' ',
                      ),
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                        'span',
                        {
                          className: 'text-Accent-4',
                        },
                        percentage.toFixed(2),
                        '%',
                      ),
                    ),
                  );
                }),
              ),
            );
          }
          return null;
        };
        /* harmony default export */ __webpack_exports__['default'] = TopCategoriesChartTooltip;

        /***/
      },

    /***/ './src/team/TopCategories/index.ts':
      /*!*****************************************!*\
  !*** ./src/team/TopCategories/index.ts ***!
  \*****************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ TopCategories: function () {
            return /* reexport safe */ _TopCategories__WEBPACK_IMPORTED_MODULE_0__.TopCategories;
          },
          /* harmony export */
        });
        /* harmony import */ var _TopCategories__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! ./TopCategories */ './src/team/TopCategories/TopCategories.tsx',
        );

        /***/
      },

    /***/ './src/team/useDepartment.ts':
      /*!***********************************!*\
  !*** ./src/team/useDepartment.ts ***!
  \***********************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ useDepartment: function () {
            return /* binding */ useDepartment;
          },
          /* harmony export */
        });
        /* harmony import */ var _team_apis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/team/apis */ './src/team/apis.ts',
        );
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @/error */ './src/error/index.ts',
        );

        var useDepartment = function useDepartment(id) {
          return (0, _common_hooks__WEBPACK_IMPORTED_MODULE_1__.useFetcher)(
            ['department', id],
            function () {
              return _team_apis__WEBPACK_IMPORTED_MODULE_0__.DepartmentApis.get(id);
            },
            {
              onError: function onError(error) {
                if (error.code === _error__WEBPACK_IMPORTED_MODULE_2__.ApiErrorCode.Forbidden) {
                  return false;
                }
              },
            },
          );
        };

        /***/
      },

    /***/ './src/team/useTopCategories.ts':
      /*!**************************************!*\
  !*** ./src/team/useTopCategories.ts ***!
  \**************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ useTopCategories: function () {
            return /* binding */ useTopCategories;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var _apis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! ./apis */ './src/team/apis.ts',
        );

        var useTopCategories = function useTopCategories(departmentId, params) {
          return (0, _common_hooks__WEBPACK_IMPORTED_MODULE_0__.useFetcher)(
            ['topCategories', departmentId, params],
            function () {
              return _apis__WEBPACK_IMPORTED_MODULE_1__.DepartmentApis.getTopCategories(
                departmentId,
                params,
              );
            },
            {
              laggy: true,
            },
          );
        };

        /***/
      },

    /***/ './src/transactions/useTransactions.ts':
      /*!*********************************************!*\
  !*** ./src/transactions/useTransactions.ts ***!
  \*********************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ useTransactions: function () {
            return /* binding */ useTransactions;
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

        var useTransactions = function useTransactions(params) {
          var _useFetcher = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_1__.useFetcher)(
              ['transactions', params],
              function () {
                return _feed_apis__WEBPACK_IMPORTED_MODULE_2__.FeedApis.getLineItems(params);
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
  },
]);
//# sourceMappingURL=src_team_TeamPage_tsx.bundle.js.map
