'use strict';
(self['webpackChunkgravity_web'] = self['webpackChunkgravity_web'] || []).push([
  ['src_main_pages_Feed_index_tsx'],
  {
    /***/ './src/feed/constants.ts':
      /*!*******************************!*\
  !*** ./src/feed/constants.ts ***!
  \*******************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ fallbackCategory: function () {
            return /* binding */ fallbackCategory;
          },
          /* harmony export */ fallbackFeed: function () {
            return /* binding */ fallbackFeed;
          },
          /* harmony export */
        });
        /* harmony import */ var _main_entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/main/entity */ './src/main/entity/index.ts',
        );
        /* harmony import */ var _team_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/team/constants */ './src/team/constants.ts',
        );
        /* harmony import */ var _target_constants__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! @/target/constants */ './src/target/constants.ts');

        var fallbackCategory = {
          id: 1,
          name: '',
        };
        var fallbackFeed = {
          id: 1,
          type: 'target',
          department: _team_constants__WEBPACK_IMPORTED_MODULE_1__.fallbackDepartment,
          category: fallbackCategory,
          transactions: [],
          lastInteraction: '',
          target: _target_constants__WEBPACK_IMPORTED_MODULE_2__.fallbackTarget,
          hidden: false,
          isFallback: true,
          comments: [],
          lineItem: {
            id: 0,
            company: {
              id: 0,
              name: '',
            },
            transId: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            externalId: '',
            item: '',
            departmentName: '',
            departmentId: 0,
            transStatus: _main_entity__WEBPACK_IMPORTED_MODULE_0__.TranStatus.Cancelled,
          },
        };

        /***/
      },

    /***/ './src/main/pages/Feed/index.tsx':
      /*!***************************************!*\
  !*** ./src/main/pages/Feed/index.tsx ***!
  \***************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ FeedPage: function () {
            return /* binding */ FeedPage;
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
        /* harmony import */ var _feed_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @/feed/constants */ './src/feed/constants.ts',
        );
        /* harmony import */ var _feed_FeedCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @/feed/FeedCard */ './src/feed/FeedCard/index.ts',
        );
        /* harmony import */ var _feed_LineItemDrawer__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(/*! @/feed/LineItemDrawer */ './src/feed/LineItemDrawer/index.ts');
        /* harmony import */ var _layout_MainLayout__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(/*! @/layout/MainLayout */ './src/layout/MainLayout.tsx');
        /* harmony import */ var _routing_routes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! @/routing/routes */ './src/routing/routes.tsx',
        );
        /* harmony import */ var _target_apis__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          /*! @/target/apis */ './src/target/apis.ts',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10__ =
          __webpack_require__(
            /*! react-router-dom */ './node_modules/react-router/esm/react-router.js',
          );

        var FeedPage = function FeedPage() {
          var _useNavUtils = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_1__.useNavUtils)(),
            redirect = _useNavUtils.redirect;
          var params = (0, react_router_dom__WEBPACK_IMPORTED_MODULE_10__.useParams)();
          var feedId = +params.id;
          var _useLineItemDrawer = (0,
            _feed_LineItemDrawer__WEBPACK_IMPORTED_MODULE_5__.useLineItemDrawer)(),
            isLineItemDrawerOpen = _useLineItemDrawer.isLineItemDrawerOpen,
            selectedLineItem = _useLineItemDrawer.selectedLineItem,
            closeLineItemDrawer = _useLineItemDrawer.closeLineItemDrawer,
            feedIdDetailView = _useLineItemDrawer.feedId;
          var _useFetcher = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_1__.useFetcher)(
              !!feedId && ['feed', feedId],
              function () {
                return _feed_apis__WEBPACK_IMPORTED_MODULE_2__.FeedApis.get(feedId);
              },
            ),
            feedItem = _useFetcher.data,
            mutate = _useFetcher.mutate,
            isValidating = _useFetcher.isValidating,
            error = _useFetcher.error;
          var goBackToDashboard = function goBackToDashboard() {
            redirect(_routing_routes__WEBPACK_IMPORTED_MODULE_7__.Routes.Dashboard.path);
          };
          var _useHandler = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_1__.useHandler)(
              _target_apis__WEBPACK_IMPORTED_MODULE_8__.TargetApis.update,
              {
                onSuccess: function onSuccess() {
                  return mutate();
                },
              },
            ),
            updateTarget = _useHandler.handle;
          var _useHandler2 = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_1__.useHandler)(
              _target_apis__WEBPACK_IMPORTED_MODULE_8__.TargetApis['delete'],
              {
                onSuccess: goBackToDashboard,
              },
            ),
            deleteTarget = _useHandler2.handle;
          var renderFeed = function renderFeed() {
            if (error) {
              return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_9__.createElement(
                'div',
                {
                  className: 'flex flex-1 w-full h-[300px] justify-center items-center px-16',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_9__.createElement(
                  'span',
                  {
                    className: 'flex text-2xl text-Gray-1 font-semibold text-center',
                  },
                  'An error occurred loading this item \uD83D\uDE1E',
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_9__.createElement('br', null),
                  'please try again later!',
                ),
              );
            }
            return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_9__.createElement(
              'div',
              {
                className: 'w-full h-full hide-scrollbar invisible-scrollbar',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_9__.createElement(
                _common_components__WEBPACK_IMPORTED_MODULE_0__.ListLoader,
                {
                  loading: isValidating,
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_9__.createElement(
                  _feed_FeedCard__WEBPACK_IMPORTED_MODULE_4__.FeedCard,
                  {
                    feed:
                      feedItem !== null && feedItem !== void 0
                        ? feedItem
                        : _feed_constants__WEBPACK_IMPORTED_MODULE_3__.fallbackFeed,
                    defaultExpand: true,
                    categoryRedirectHref: function categoryRedirectHref(category) {
                      return '/categories/'.concat(
                        category === null || category === void 0 ? void 0 : category.id.toString(),
                      );
                    },
                    onDeleteTarget: deleteTarget,
                    onUpdateTarget: updateTarget,
                  },
                ),
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_9__.createElement(
                _feed_LineItemDrawer__WEBPACK_IMPORTED_MODULE_5__.LineItemDrawer,
                {
                  open: isLineItemDrawerOpen,
                  onClose: closeLineItemDrawer,
                  lineItem: selectedLineItem,
                  feedId: feedIdDetailView,
                },
              ),
            );
          };
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_9__.createElement(
            _layout_MainLayout__WEBPACK_IMPORTED_MODULE_6__.MainLayout,
            null,
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_9__.createElement(
              'h1',
              {
                className: 'sr-only',
              },
              'Rollups',
            ),
            renderFeed(),
          );
        };

        /***/
      },

    /***/ './src/target/constants.ts':
      /*!*********************************!*\
  !*** ./src/target/constants.ts ***!
  \*********************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ fallbackTarget: function () {
            return /* binding */ fallbackTarget;
          },
          /* harmony export */
        });
        /* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! ./types */ './src/target/types.ts',
        );

        var fallbackTarget = {
          id: 0,
          name: '',
          creator: {},
          updater: {},
          trackingStatus: _types__WEBPACK_IMPORTED_MODULE_0__.TargetStatusType.OnTrack,
          props: [],
          periods: [],
          spendings: [],
          department: {
            id: 0,
            name: '',
          },
          isPrimary: false,
        };

        /***/
      },
  },
]);
//# sourceMappingURL=src_main_pages_Feed_index_tsx.bundle.js.map
