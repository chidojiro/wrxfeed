'use strict';
(self['webpackChunkgravity_web'] = self['webpackChunkgravity_web'] || []).push([
  ['src_feed_ForYouFeedsPage_tsx'],
  {
    /***/ './src/feed/ForYouFeedsPage.tsx':
      /*!**************************************!*\
  !*** ./src/feed/ForYouFeedsPage.tsx ***!
  \**************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ ForYouFeedsPage: function () {
            return /* binding */ ForYouFeedsPage;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var _layout_MainLayout__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! @/layout/MainLayout */ './src/layout/MainLayout.tsx');
        /* harmony import */ var _mixpanel_useMixPanel__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! @/mixpanel/useMixPanel */ './src/mixpanel/useMixPanel.ts');
        /* harmony import */ var _profile_useProfile__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! @/profile/useProfile */ './src/profile/useProfile.ts');
        /* harmony import */ var mixpanel_browser__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! mixpanel-browser */ './node_modules/mixpanel-browser/dist/mixpanel.cjs.js',
          );
        /* harmony import */ var mixpanel_browser__WEBPACK_IMPORTED_MODULE_4___default =
          /*#__PURE__*/ __webpack_require__.n(mixpanel_browser__WEBPACK_IMPORTED_MODULE_4__);
        /* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! react-router-dom */ './node_modules/react-router/esm/react-router.js',
          );
        /* harmony import */ var _Feeds__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! ./Feeds */ './src/feed/Feeds.tsx',
        );

        var ForYouFeedsPage = function ForYouFeedsPage() {
          var _useLocation = (0, react_router_dom__WEBPACK_IMPORTED_MODULE_6__.useLocation)(),
            pathname = _useLocation.pathname;
          var _useProfile = (0, _profile_useProfile__WEBPACK_IMPORTED_MODULE_3__.useProfile)(),
            profile = _useProfile.profile;
          (0, _common_hooks__WEBPACK_IMPORTED_MODULE_0__.useMountEffect)(function () {
            var _profile$company;
            mixpanel_browser__WEBPACK_IMPORTED_MODULE_4___default().track('For You Feed View', {
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
            _mixpanel_useMixPanel__WEBPACK_IMPORTED_MODULE_2__.identifyMixPanelUserProfile)(profile);
          });
          return /*#__PURE__*/ React.createElement(
            _layout_MainLayout__WEBPACK_IMPORTED_MODULE_1__.MainLayout,
            null,
            /*#__PURE__*/ React.createElement(
              'h1',
              {
                className: 'sr-only',
              },
              'For you feed',
            ),
            /*#__PURE__*/ React.createElement(_Feeds__WEBPACK_IMPORTED_MODULE_5__.Feeds, {
              mode: 'for-you',
              categoryRedirectHref: function categoryRedirectHref(category) {
                return ''.concat(pathname, '/category/').concat(category.id);
              },
            }),
          );
        };

        /***/
      },
  },
]);
//# sourceMappingURL=src_feed_ForYouFeedsPage_tsx.bundle.js.map
