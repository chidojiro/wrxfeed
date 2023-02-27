'use strict';
(self['webpackChunkgravity_web'] = self['webpackChunkgravity_web'] || []).push([
  ['src_feed_CompanyFeedsByCategoryPage_tsx'],
  {
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

    /***/ './src/feed/CompanyFeedsByCategoryPage.tsx':
      /*!*************************************************!*\
  !*** ./src/feed/CompanyFeedsByCategoryPage.tsx ***!
  \*************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ CompanyFeedsByCategoryPage: function () {
            return /* binding */ CompanyFeedsByCategoryPage;
          },
          /* harmony export */
        });
        /* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/assets */ './src/assets/index.ts',
        );
        /* harmony import */ var _category_useCategory__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! @/category/useCategory */ './src/category/useCategory.ts');
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var _layout_MainLayout__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! @/layout/MainLayout */ './src/layout/MainLayout.tsx');
        /* harmony import */ var _mixpanel_useMixPanel__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(/*! @/mixpanel/useMixPanel */ './src/mixpanel/useMixPanel.ts');
        /* harmony import */ var _profile_useProfile__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(/*! @/profile/useProfile */ './src/profile/useProfile.ts');
        /* harmony import */ var mixpanel_browser__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! mixpanel-browser */ './node_modules/mixpanel-browser/dist/mixpanel.cjs.js',
          );
        /* harmony import */ var mixpanel_browser__WEBPACK_IMPORTED_MODULE_6___default =
          /*#__PURE__*/ __webpack_require__.n(mixpanel_browser__WEBPACK_IMPORTED_MODULE_6__);
        /* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(
            /*! react-router-dom */ './node_modules/react-router/esm/react-router.js',
          );
        /* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9__ =
          __webpack_require__(
            /*! react-router-dom */ './node_modules/react-router-dom/esm/react-router-dom.js',
          );
        /* harmony import */ var _Feeds__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! ./Feeds */ './src/feed/Feeds.tsx',
        );

        var CompanyFeedsByCategoryPage = function CompanyFeedsByCategoryPage() {
          var params = (0, react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useParams)();
          var _useProfile = (0, _profile_useProfile__WEBPACK_IMPORTED_MODULE_5__.useProfile)(),
            profile = _useProfile.profile;
          (0, _common_hooks__WEBPACK_IMPORTED_MODULE_2__.useMountEffect)(function () {
            var _profile$company;
            mixpanel_browser__WEBPACK_IMPORTED_MODULE_6___default().track('Company Feed View', {
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
            _mixpanel_useMixPanel__WEBPACK_IMPORTED_MODULE_4__.identifyMixPanelUserProfile)(profile);
          });
          var categoryId = +params.categoryId;
          var _useCategory = (0, _category_useCategory__WEBPACK_IMPORTED_MODULE_1__.useCategory)(
              categoryId,
            ),
            category = _useCategory.data;
          return /*#__PURE__*/ React.createElement(
            _layout_MainLayout__WEBPACK_IMPORTED_MODULE_3__.MainLayout,
            null,
            !!category &&
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'flex items-center space-x-4 pb-8',
                },
                /*#__PURE__*/ React.createElement(
                  react_router_dom__WEBPACK_IMPORTED_MODULE_9__.Link,
                  {
                    to: '/feeds/company',
                  },
                  /*#__PURE__*/ React.createElement(
                    _assets__WEBPACK_IMPORTED_MODULE_0__.ChevronLeftIcon,
                    {
                      className: 'cursor-pointer',
                    },
                  ),
                ),
                /*#__PURE__*/ React.createElement(
                  'h1',
                  {
                    className: 'text-Gray-1 text-xl font-bold',
                  },
                  category.name,
                ),
              ),
            /*#__PURE__*/ React.createElement(_Feeds__WEBPACK_IMPORTED_MODULE_7__.Feeds, {
              categoryId: categoryId,
            }),
          );
        };

        /***/
      },
  },
]);
//# sourceMappingURL=src_feed_CompanyFeedsByCategoryPage_tsx.bundle.js.map
