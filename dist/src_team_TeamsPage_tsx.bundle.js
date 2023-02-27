'use strict';
(self['webpackChunkgravity_web'] = self['webpackChunkgravity_web'] || []).push([
  ['src_team_TeamsPage_tsx'],
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

    /***/ './src/main/molecules/RootDepartmentHeader/index.tsx':
      /*!***********************************************************!*\
  !*** ./src/main/molecules/RootDepartmentHeader/index.tsx ***!
  \***********************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var _main_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/main/utils */ './src/main/utils.ts',
        );
        /* harmony import */ var _subscription_ToggleFollowButton__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! @/subscription/ToggleFollowButton */ './src/subscription/ToggleFollowButton.tsx',
          );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );

        var RootDepartmentHeader = function RootDepartmentHeader(_ref) {
          var _department$children;
          var item = _ref.item,
            onClick = _ref.onClick,
            department = _ref.department;
          var deptBgColor = react__WEBPACK_IMPORTED_MODULE_2__.useMemo(
            function () {
              var _item$name;
              return (0, _main_utils__WEBPACK_IMPORTED_MODULE_0__.getColorByText)(
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
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
            'div',
            {
              'aria-hidden': 'true',
              style: {
                background: deptBgColor,
              },
              className: 'flex justify-between items-center px-4 py-4 sm:px-6 cursor-pointer',
              onClick: onClick,
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
              'h3',
              {
                className: 'text-sm text-white uppercase font-semibold',
              },
              item.name || 'Unknown',
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
              _subscription_ToggleFollowButton__WEBPACK_IMPORTED_MODULE_1__.ToggleFollowButton,
              {
                colorScheme: 'white',
                type: 'departments',
                item: [
                  department,
                  (_department$children = department.children) !== null &&
                  _department$children !== void 0
                    ? _department$children
                    : [],
                ].flat(),
              },
            ),
          );
        };
        /* harmony default export */ __webpack_exports__['default'] = RootDepartmentHeader;

        /***/
      },

    /***/ './src/main/organisms/DepartmentList/index.tsx':
      /*!*****************************************************!*\
  !*** ./src/main/organisms/DepartmentList/index.tsx ***!
  \*****************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var _main_molecules_DepartmentItem__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! @/main/molecules/DepartmentItem */ './src/main/molecules/DepartmentItem/index.tsx',
          );
        /* harmony import */ var _main_molecules_RootDepartmentHeader__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! @/main/molecules/RootDepartmentHeader */ './src/main/molecules/RootDepartmentHeader/index.tsx',
          );
        /* harmony import */ var _mixpanel_useMixPanel__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! @/mixpanel/useMixPanel */ './src/mixpanel/useMixPanel.ts');
        /* harmony import */ var _profile_useProfile__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(/*! @/profile/useProfile */ './src/profile/useProfile.ts');
        /* harmony import */ var mixpanel_browser__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! mixpanel-browser */ './node_modules/mixpanel-browser/dist/mixpanel.cjs.js',
          );
        /* harmony import */ var mixpanel_browser__WEBPACK_IMPORTED_MODULE_5___default =
          /*#__PURE__*/ __webpack_require__.n(mixpanel_browser__WEBPACK_IMPORTED_MODULE_5__);
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );

        var DepartmentList = function DepartmentList(_ref) {
          var departments = _ref.departments,
            onSelect = _ref.onSelect,
            onSelectRoot = _ref.onSelectRoot;
          var _useProfile = (0, _profile_useProfile__WEBPACK_IMPORTED_MODULE_4__.useProfile)(),
            profile = _useProfile.profile;
          (0, _common_hooks__WEBPACK_IMPORTED_MODULE_0__.useMountEffect)(function () {
            var _profile$company;
            mixpanel_browser__WEBPACK_IMPORTED_MODULE_5___default().track('Team Directory View', {
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
            _mixpanel_useMixPanel__WEBPACK_IMPORTED_MODULE_3__.identifyMixPanelUserProfile)(profile);
          });
          var renderDeptSection = function renderDeptSection(dept) {
            var _dept$children;
            return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_6__.createElement(
              'div',
              {
                className: 'shadow-md rounded-card overflow-hidden',
                key: dept.id,
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                _main_molecules_RootDepartmentHeader__WEBPACK_IMPORTED_MODULE_2__['default'],
                {
                  item: dept,
                  department: dept,
                  onClick: function onClick() {
                    return onSelectRoot && onSelectRoot(dept);
                  },
                },
              ),
              !!(
                (_dept$children = dept.children) !== null &&
                _dept$children !== void 0 &&
                _dept$children.length
              ) &&
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                  'div',
                  {
                    className: 'bg-white',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                    'ul',
                    {
                      className: 'divide-y divide-gray-200',
                    },
                    dept.children.map(function (child) {
                      return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                        'li',
                        {
                          key: child.id,
                          className: 'sm:pl-4',
                        },
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                          _main_molecules_DepartmentItem__WEBPACK_IMPORTED_MODULE_1__['default'],
                          {
                            item: child,
                            onClick: function onClick() {
                              return onSelect && onSelect(child);
                            },
                          },
                        ),
                      );
                    }),
                  ),
                ),
            );
          };
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_6__.createElement(
            'div',
            {
              className: 'overflow-hidden space-y-6 pb-5',
            },
            departments.map(renderDeptSection),
          );
        };
        /* harmony default export */ __webpack_exports__['default'] = DepartmentList;

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

    /***/ './src/team/TeamsPage.tsx':
      /*!********************************!*\
  !*** ./src/team/TeamsPage.tsx ***!
  \********************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ TeamsPage: function () {
            return /* binding */ TeamsPage;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var _layout_MainLayout__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! @/layout/MainLayout */ './src/layout/MainLayout.tsx');
        /* harmony import */ var _main_organisms_DepartmentList__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! @/main/organisms/DepartmentList */ './src/main/organisms/DepartmentList/index.tsx',
          );
        /* harmony import */ var _main_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @/main/utils */ './src/main/utils.ts',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(
            /*! react-router-dom */ './node_modules/react-router/esm/react-router.js',
          );
        /* harmony import */ var _apis__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! ./apis */ './src/team/apis.ts',
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

        var LIMIT = 10;
        var INIT_PAGINATION = Object.freeze({
          offset: 0,
          limit: LIMIT,
        });
        var FilterKeys = ['department', 'category', 'vendor', 'rootDepartment', 'month', 'year'];
        var TeamsPage = function TeamsPage() {
          var history = (0, react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useHistory)();
          var _useParams = (0, react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useParams)(),
            deptId = _useParams.id;
          var query = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_1__.useLegacyQuery)();
          // Department states

          var _useInfiniteData = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_1__.useInfiniteData)(
              function (paginationParams) {
                return _apis__WEBPACK_IMPORTED_MODULE_6__.DepartmentApis.getList(
                  _objectSpread(
                    _objectSpread({}, paginationParams),
                    {},
                    {
                      includeSub: true,
                      parentOnly: true,
                    },
                  ),
                );
              },
            ),
            departments = _useInfiniteData.data,
            loadMore = _useInfiniteData.loadMore;

          // Feeds states
          var _React$useState = react__WEBPACK_IMPORTED_MODULE_5__.useState(
              deptId
                ? _objectSpread(
                    _objectSpread({}, INIT_PAGINATION),
                    {},
                    {
                      rootDepartment: parseInt(deptId, 10),
                    },
                  )
                : {
                    // Don't load feed items at the first launch
                    offset: 0,
                    limit: 0,
                  },
            ),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            feedsFilter = _React$useState2[0],
            setFeedsFilter = _React$useState2[1];
          var filterByRoute = react__WEBPACK_IMPORTED_MODULE_5__.useCallback(
            function () {
              if (deptId) {
                var idNum = parseInt(deptId, 10);
                var newFilter = _objectSpread(
                  _objectSpread({}, INIT_PAGINATION),
                  {},
                  {
                    rootDepartment: idNum,
                  },
                );
                FilterKeys.forEach(function (key) {
                  if (query.get(key)) {
                    newFilter[key] = query.get(key);
                  }
                });
                setFeedsFilter(newFilter);
              } else {
                setFeedsFilter({
                  offset: 0,
                  limit: 0,
                }); // Clean up feed item
              }
              // eslint-disable-next-line react-hooks/exhaustive-deps
            },
            [deptId, query.toString(), feedsFilter.rootDepartment],
          );
          react__WEBPACK_IMPORTED_MODULE_5__.useEffect(
            function () {
              if (window.scrollY > 0) {
                window.scrollTo({
                  top: 0,
                  behavior: 'auto',
                });
              }
              filterByRoute();
            },
            [filterByRoute],
          );
          var handleDepartmentSelect = function handleDepartmentSelect(value) {
            history.push({
              pathname: '/departments/'.concat(
                value === null || value === void 0 ? void 0 : value.id.toString(),
              ),
            });
            (0, _main_utils__WEBPACK_IMPORTED_MODULE_4__.scrollToTop)();
          };
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
            _layout_MainLayout__WEBPACK_IMPORTED_MODULE_2__.MainLayout,
            null,
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
              'h1',
              {
                className: 'sr-only',
              },
              'Department list',
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
              _main_organisms_DepartmentList__WEBPACK_IMPORTED_MODULE_3__['default'],
              {
                departments: departments,
                onSelect: handleDepartmentSelect,
                onSelectRoot: handleDepartmentSelect,
              },
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
              'div',
              {
                className: 'mt-4',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                _common_components__WEBPACK_IMPORTED_MODULE_0__.InfiniteLoader,
                {
                  mode: 'ON_SIGHT',
                  itemsPerLoad: 5,
                  onLoad: loadMore,
                },
              ),
            ),
          );
        };

        /***/
      },
  },
]);
//# sourceMappingURL=src_team_TeamsPage_tsx.bundle.js.map
