'use strict';
(self['webpackChunkgravity_web'] = self['webpackChunkgravity_web'] || []).push([
  ['src_team_constants_ts-src_transactions_TransactionList_index_tsx'],
  {
    /***/ './src/common/atoms/Tooltip/index.tsx':
      /*!********************************************!*\
  !*** ./src/common/atoms/Tooltip/index.tsx ***!
  \********************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );

        var Tooltip = function Tooltip(_ref) {
          var message = _ref.message,
            children = _ref.children;
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
            'div',
            {
              className: 'relative flex flex-col items-center group',
            },
            children,
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
              'div',
              {
                className:
                  'absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
                'span',
                {
                  className:
                    'relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md',
                },
                message,
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {
                className: 'w-3 h-3 -mt-2 rotate-45 bg-gray-600',
              }),
            ),
          );
        };
        /* harmony default export */ __webpack_exports__['default'] = Tooltip;

        /***/
      },

    /***/ './src/common/components/EmptyState/EmptyState.tsx':
      /*!*********************************************************!*\
  !*** ./src/common/components/EmptyState/EmptyState.tsx ***!
  \*********************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ EmptyState: function () {
            return /* binding */ EmptyState;
          },
          /* harmony export */
        });
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );

        var EmptyState = function EmptyState(_ref) {
          var className = _ref.className,
            title = _ref.title,
            content = _ref.content;
          return /*#__PURE__*/ React.createElement(
            'div',
            {
              className: (0, clsx__WEBPACK_IMPORTED_MODULE_0__['default'])(
                'flex flex-1 flex-col space-y-1 h-[200px] bg-Gray-12 rounded-card justify-center items-center',
                className,
              ),
            },
            /*#__PURE__*/ React.createElement(
              'p',
              {
                className: 'text-sm font-bold text-primary',
              },
              title,
            ),
            /*#__PURE__*/ React.createElement(
              'p',
              {
                className: 'text-[13px] text-Gray-6',
              },
              content,
            ),
          );
        };

        /***/
      },

    /***/ './src/common/components/EmptyState/index.ts':
      /*!***************************************************!*\
  !*** ./src/common/components/EmptyState/index.ts ***!
  \***************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ EmptyState: function () {
            return /* reexport safe */ _EmptyState__WEBPACK_IMPORTED_MODULE_0__.EmptyState;
          },
          /* harmony export */
        });
        /* harmony import */ var _EmptyState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! ./EmptyState */ './src/common/components/EmptyState/EmptyState.tsx',
        );

        /***/
      },

    /***/ './src/common/components/Radio/Radio.tsx':
      /*!***********************************************!*\
  !*** ./src/common/components/Radio/Radio.tsx ***!
  \***********************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ Radio: function () {
            return /* binding */ Radio;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/common/utils */ './src/common/utils/index.ts',
        );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        var _excluded = ['className', 'label', 'onChange', 'checked', 'colorScheme', 'disabled'];
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

        var borderColors = {
          accent: 'border-Accent-2',
        };
        var textColors = {
          accent: 'text-Accent-2',
        };
        var Radio = function Radio(_ref) {
          var className = _ref.className,
            label = _ref.label,
            onChange = _ref.onChange,
            checked = _ref.checked,
            colorScheme = _ref.colorScheme,
            disabled = _ref.disabled,
            restProps = _objectWithoutProperties(_ref, _excluded);
          var checkedDisclosure = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_0__.useDisclosure)();
          var isChecked =
            checked !== null && checked !== void 0 ? checked : checkedDisclosure.isOpen;
          var handleChange = function handleChange(e) {
            onChange === null || onChange === void 0 ? void 0 : onChange(e);
            checkedDisclosure.set(e.target.checked);
          };
          var borderColor = colorScheme ? borderColors[colorScheme] : 'border-Gray-6';
          var textColor = colorScheme ? textColors[colorScheme] : 'text-Gray-6';
          var renderInnerIcon = function renderInnerIcon() {
            if (isChecked) {
              return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement('div', {
                className: 'w-2 h-2 rounded-full bg-Gray-3',
              });
            }
            return null;
          };
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
            'label',
            {
              className: (0, clsx__WEBPACK_IMPORTED_MODULE_2__['default'])(
                _common_utils__WEBPACK_IMPORTED_MODULE_1__.StringUtils.withProjectClassNamePrefix(
                  'Radio',
                ),
                'flex items-center gap-3 cursor-pointer',
                textColor,
                className,
              ),
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
              'div',
              {
                className: (0, clsx__WEBPACK_IMPORTED_MODULE_2__['default'])(
                  'w-4 h-4 flex-shrink-0 rounded-full border border-soli flex items-center justify-center',
                  borderColor,
                  {
                    disabled: disabled,
                  },
                ),
              },
              renderInnerIcon(),
            ),
            !!label &&
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                'div',
                {
                  className: 'text-sm',
                },
                label,
              ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
              'input',
              _extends(
                {
                  type: 'radio',
                },
                restProps,
                {
                  className: 'minimized',
                  onChange: handleChange,
                  checked: isChecked,
                  disabled: disabled,
                },
              ),
            ),
          );
        };

        /***/
      },

    /***/ './src/common/components/Radio/index.ts':
      /*!**********************************************!*\
  !*** ./src/common/components/Radio/index.ts ***!
  \**********************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ Radio: function () {
            return /* reexport safe */ _Radio__WEBPACK_IMPORTED_MODULE_0__.Radio;
          },
          /* harmony export */
        });
        /* harmony import */ var _Radio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! ./Radio */ './src/common/components/Radio/Radio.tsx',
        );

        /***/
      },

    /***/ './src/feed/CommentGroup.tsx':
      /*!***********************************!*\
  !*** ./src/feed/CommentGroup.tsx ***!
  \***********************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ CommentGroup: function () {
            return /* binding */ CommentGroup;
          },
          /* harmony export */
        });
        /* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/assets */ './src/assets/index.ts',
        );
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! lodash-es */ './node_modules/lodash-es/uniqBy.js',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );

        var CommentGroup = function CommentGroup(_ref) {
          var comments = _ref.comments,
            className = _ref.className;
          var uniqueAvatars = (0, lodash_es__WEBPACK_IMPORTED_MODULE_3__['default'])(
            comments,
            'user.id',
          ).map(function (comment) {
            var _comment$user, _comment$user$fullNam, _comment$user2;
            return {
              src:
                comment === null || comment === void 0
                  ? void 0
                  : (_comment$user = comment.user) === null || _comment$user === void 0
                  ? void 0
                  : _comment$user.avatar,
              fullName:
                (_comment$user$fullNam =
                  comment === null || comment === void 0
                    ? void 0
                    : (_comment$user2 = comment.user) === null || _comment$user2 === void 0
                    ? void 0
                    : _comment$user2.fullName) !== null && _comment$user$fullNam !== void 0
                  ? _comment$user$fullNam
                  : '',
            };
          });
          var avatars = uniqueAvatars.length > 3 ? uniqueAvatars.slice(0, 2) : uniqueAvatars;
          var trailingCommentIcon = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
            'div',
            {
              className: 'relative',
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
              _assets__WEBPACK_IMPORTED_MODULE_0__.CommentIcon,
              {
                className: 'text-Gray-7 h-7 w-6',
              },
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
              'div',
              {
                className:
                  'absolute bottom-2 left-3 transform -translate-x-1/2 text-Gray-3 text-2xs font-semibold',
              },
              comments.length,
            ),
          );
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
            _common_components__WEBPACK_IMPORTED_MODULE_1__.AvatarGroup,
            {
              className: className,
              trailingComponent: trailingCommentIcon,
              items: avatars,
            },
          );
        };

        /***/
      },

    /***/ './src/feed/LineItemDrawer/LineItemDetails.tsx':
      /*!*****************************************************!*\
  !*** ./src/feed/LineItemDrawer/LineItemDetails.tsx ***!
  \*****************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ LineItemDetails: function () {
            return /* binding */ LineItemDetails;
          },
          /* harmony export */
        });
        /* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/assets */ './src/assets/index.ts',
        );
        /* harmony import */ var _common_atoms_Loading__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! @/common/atoms/Loading */ './src/common/atoms/Loading/index.tsx');
        /* harmony import */ var _common_atoms_Tooltip__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! @/common/atoms/Tooltip */ './src/common/atoms/Tooltip/index.tsx');
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _main_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @/main/utils */ './src/main/utils.ts',
        );
        /* harmony import */ var _dwarvesf_react_hooks__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! @dwarvesf/react-hooks */ './node_modules/@dwarvesf/react-hooks/dist/index.js',
          );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! dayjs */ './node_modules/dayjs/dayjs.min.js',
        );
        /* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_7___default =
          /*#__PURE__*/ __webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_7__);
        /* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10__ =
          __webpack_require__(
            /*! react-router-dom */ './node_modules/react-router/esm/react-router.js',
          );
        /* harmony import */ var _UpdateDetailsLineItemInfoModal__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(
            /*! ./UpdateDetailsLineItemInfoModal */ './src/feed/LineItemDrawer/UpdateDetailsLineItemInfoModal.tsx',
          );
        /* harmony import */ var _UpdateVendorInfoModal__WEBPACK_IMPORTED_MODULE_9__ =
          __webpack_require__(
            /*! ./UpdateVendorInfoModal */ './src/feed/LineItemDrawer/UpdateVendorInfoModal.tsx',
          );

        var LineItemDetails = function LineItemDetails(_ref) {
          var _item$category$name,
            _item$category,
            _item$transaction$sub,
            _item$transaction3,
            _item$transaction$ter,
            _item$transaction4,
            _item$transaction5,
            _item$transaction6,
            _item$transaction$sta,
            _item$transaction7,
            _item$transaction8,
            _vendor$description,
            _item$transaction9,
            _item$transaction10,
            _item$vendor,
            _item$vendor$categori;
          var className = _ref.className,
            loading = _ref.loading,
            item = _ref.item,
            onLineItemUpdate = _ref.onLineItemUpdate,
            onVendorUpdate = _ref.onVendorUpdate,
            onCloseClick = _ref.onCloseClick,
            onModalClose = _ref.onModalClose,
            onModalOpen = _ref.onModalOpen;
          var history = (0, react_router_dom__WEBPACK_IMPORTED_MODULE_10__.useHistory)();
          var lineItemModalDisclosure = (0,
          _dwarvesf_react_hooks__WEBPACK_IMPORTED_MODULE_5__.useDisclosure)();
          var vendorModalDisclosure = (0,
          _dwarvesf_react_hooks__WEBPACK_IMPORTED_MODULE_5__.useDisclosure)();
          var openLineItemModal = function openLineItemModal() {
            lineItemModalDisclosure.onOpen();
            onModalOpen();
          };
          var closeLineItemModal = function closeLineItemModal() {
            lineItemModalDisclosure.onClose();
            onModalClose();
          };
          var openVendorModal = function openVendorModal() {
            vendorModalDisclosure.onOpen();
            onModalOpen();
          };
          var closeVendorModal = function closeVendorModal() {
            vendorModalDisclosure.onClose();
            onModalClose();
          };
          var goToCategoryPage = function goToCategoryPage(categoryId) {
            onCloseClick === null || onCloseClick === void 0 ? void 0 : onCloseClick();
            history.push({
              pathname: '/categories/'.concat(categoryId),
            });
          };
          var getOriginalAmountWithSign = function getOriginalAmountWithSign() {
            var _item$transaction, _item$transaction2;
            if (
              !(
                item !== null &&
                item !== void 0 &&
                (_item$transaction = item.transaction) !== null &&
                _item$transaction !== void 0 &&
                _item$transaction.currency
              ) ||
              !(item !== null && item !== void 0 && item.amountFx)
            )
              return '...';
            var amountWithCurrency = Intl.NumberFormat('en-US', {
              style: 'currency',
              currency:
                (item === null || item === void 0
                  ? void 0
                  : (_item$transaction2 = item.transaction) === null ||
                    _item$transaction2 === void 0
                  ? void 0
                  : _item$transaction2.currency) || '',
            }).format((item === null || item === void 0 ? void 0 : item.amountFx) || 0);
            return amountWithCurrency;
          };
          var rows = [
            {
              id: 'category',
              key: 'Category',
              value:
                (_item$category$name =
                  item === null || item === void 0
                    ? void 0
                    : (_item$category = item.category) === null || _item$category === void 0
                    ? void 0
                    : _item$category.name) !== null && _item$category$name !== void 0
                  ? _item$category$name
                  : '...',
            },
            {
              id: 'original-amount',
              key: 'Original Amount',
              value: getOriginalAmountWithSign(),
            },
            {
              id: 'subsidiary-name',
              key: 'Subsidiary',
              value:
                (_item$transaction$sub =
                  item === null || item === void 0
                    ? void 0
                    : (_item$transaction3 = item.transaction) === null ||
                      _item$transaction3 === void 0
                    ? void 0
                    : _item$transaction3.subsidiaryName) !== null &&
                _item$transaction$sub !== void 0
                  ? _item$transaction$sub
                  : '...',
            },
            {
              id: 'terms',
              key: 'Terms',
              value:
                (_item$transaction$ter =
                  item === null || item === void 0
                    ? void 0
                    : (_item$transaction4 = item.transaction) === null ||
                      _item$transaction4 === void 0
                    ? void 0
                    : _item$transaction4.terms) !== null && _item$transaction$ter !== void 0
                  ? _item$transaction$ter
                  : '...',
            },
            {
              id: 'due-date',
              key: 'Due Date',
              value:
                item !== null &&
                item !== void 0 &&
                (_item$transaction5 = item.transaction) !== null &&
                _item$transaction5 !== void 0 &&
                _item$transaction5.dueDate
                  ? dayjs__WEBPACK_IMPORTED_MODULE_7___default()(
                      item === null || item === void 0
                        ? void 0
                        : (_item$transaction6 = item.transaction) === null ||
                          _item$transaction6 === void 0
                        ? void 0
                        : _item$transaction6.dueDate,
                    ).format('MMM D, YYYY')
                  : '',
            },
          ];
          var renderVendorName = function renderVendorName() {
            var vendorName = item
              ? (0, _main_utils__WEBPACK_IMPORTED_MODULE_4__.getVendorNameFromLineItem)(item)
              : '';
            return /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'flex-auto text-lg font-bold text-Gray-3 mr-2',
              },
              vendorName,
            );
          };
          var renderEditVendorInfoButton = function renderEditVendorInfoButton() {
            return /*#__PURE__*/ React.createElement(
              _common_components__WEBPACK_IMPORTED_MODULE_3__.Button,
              {
                size: 'sm',
                variant: 'ghost',
                colorScheme: 'gray',
                iconLeft: /*#__PURE__*/ React.createElement(
                  _assets__WEBPACK_IMPORTED_MODULE_0__.BasicsEditCircle,
                  {
                    className: 'w-4 h-4 path-no-filled text-Gray-6 fill-current',
                  },
                ),
                onClick: openVendorModal,
              },
              'Edit',
            );
          };
          var renderEditLineItemDescriptionButton = function renderEditLineItemDescriptionButton() {
            return /*#__PURE__*/ React.createElement(
              _common_components__WEBPACK_IMPORTED_MODULE_3__.Button,
              {
                size: 'sm',
                variant: 'ghost',
                colorScheme: 'gray',
                iconLeft: /*#__PURE__*/ React.createElement(
                  _assets__WEBPACK_IMPORTED_MODULE_0__.BasicsEditCircle,
                  {
                    className: 'w-4 h-4 path-no-filled text-Gray-6 fill-current',
                  },
                ),
                onClick: openLineItemModal,
              },
              'Edit',
            );
          };
          var tranType = (0, _main_utils__WEBPACK_IMPORTED_MODULE_4__.getTransactionStatus)(
            (_item$transaction$sta =
              item === null || item === void 0
                ? void 0
                : (_item$transaction7 = item.transaction) === null || _item$transaction7 === void 0
                ? void 0
                : _item$transaction7.status) !== null && _item$transaction$sta !== void 0
              ? _item$transaction$sta
              : '',
          );
          var renderTransactionType = function renderTransactionType() {
            var _tranType$color, _tranType$color2, _tranType$color3;
            return /*#__PURE__*/ React.createElement(
              'div',
              {
                className:
                  'flex flex-row flex-none justify-center items-center rounded-full bg-Green-8 px-2.5 py-0.5 h-5 mr-2.5 min-h-[20px]',
                style: {
                  backgroundColor:
                    tranType === null || tranType === void 0
                      ? void 0
                      : (_tranType$color = tranType.color) === null || _tranType$color === void 0
                      ? void 0
                      : _tranType$color.bgColor,
                },
              },
              /*#__PURE__*/ React.createElement('div', {
                className: 'w-1.5 h-1.5 bg-Green-400 rounded-full mr-[7px]',
                style: {
                  backgroundColor:
                    tranType === null || tranType === void 0
                      ? void 0
                      : (_tranType$color2 = tranType.color) === null || _tranType$color2 === void 0
                      ? void 0
                      : _tranType$color2.dotColor,
                },
              }),
              /*#__PURE__*/ React.createElement(
                'p',
                {
                  className: 'text-Green-800 text-xs font-medium',
                  style: {
                    color:
                      tranType === null || tranType === void 0
                        ? void 0
                        : (_tranType$color3 = tranType.color) === null ||
                          _tranType$color3 === void 0
                        ? void 0
                        : _tranType$color3.textColor,
                  },
                },
                tranType === null || tranType === void 0 ? void 0 : tranType.displayName,
              ),
            );
          };
          var renderAvatarIcon = function renderAvatarIcon(fullName) {
            var shortName = (0, _main_utils__WEBPACK_IMPORTED_MODULE_4__.getNameAbbreviation)(
              fullName,
            );
            return /*#__PURE__*/ React.createElement(
              _common_atoms_Tooltip__WEBPACK_IMPORTED_MODULE_2__['default'],
              {
                message: fullName,
              },
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'flex h-8 w-8 rounded-full bg-purple-5 justify-center items-center',
                },
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'flex text-white text-xs font-semibold',
                  },
                  shortName,
                ),
              ),
            );
          };
          var lineItems =
            (item === null || item === void 0
              ? void 0
              : (_item$transaction8 = item.transaction) === null || _item$transaction8 === void 0
              ? void 0
              : _item$transaction8.lineItems) || [];
          var _ref2 = item !== null && item !== void 0 ? item : {},
            vendor = _ref2.vendor;
          return /*#__PURE__*/ React.createElement(
            'div',
            {
              className: (0, clsx__WEBPACK_IMPORTED_MODULE_6__['default'])(
                'h-full flex flex-1 flex-col bg-white shadow-xl',
                className,
              ),
            },
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'w-full h-28 flex p-8',
                style: {
                  background:
                    'linear-gradient(124.66deg, #E081E2 7.8%, #A26ECC 27.02%, #835EBF 83.43%, #8945AF 95.9%)',
                },
              },
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'w-24 h-24 mr-4',
                },
                /*#__PURE__*/ React.createElement(
                  _assets__WEBPACK_IMPORTED_MODULE_0__.DetailLogoDefault,
                  {
                    className: 'w-24 h-24',
                  },
                ),
              ),
              /*#__PURE__*/ React.createElement(
                _common_components__WEBPACK_IMPORTED_MODULE_3__.Button,
                {
                  onClick: onCloseClick,
                  className: 'ml-auto w-4 h-4',
                },
                /*#__PURE__*/ React.createElement(
                  _assets__WEBPACK_IMPORTED_MODULE_0__.BasicsXRegular,
                  {
                    className: 'w-4 h-4 float-right stroke-current text-white',
                    width: 20,
                    height: 20,
                  },
                ),
              ),
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'flex flex-col my-5 px-8 overflow-y-auto flex-1',
              },
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'flex flex-row group w-[524px]',
                },
                item && renderVendorName(),
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'hidden group-hover:block',
                  },
                  renderEditVendorInfoButton(),
                ),
              ),
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'flex flex-row w-[524px] mt-2 mb-2',
                },
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'flex mr-4 text-xs',
                  },
                  /*#__PURE__*/ React.createElement(
                    _assets__WEBPACK_IMPORTED_MODULE_0__.ChainLinkIcon,
                    {
                      className: 'mr-1 stroke-current text-gray-500 align-middle',
                      width: 20,
                      height: 20,
                    },
                  ),
                  /*#__PURE__*/ React.createElement(
                    'span',
                    null,
                    vendor === null || vendor === void 0 ? void 0 : vendor.website,
                  ),
                ),
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'flex mr-4 text-xs',
                  },
                  /*#__PURE__*/ React.createElement(
                    _assets__WEBPACK_IMPORTED_MODULE_0__.EmailIcon,
                    {
                      className: 'mr-1 stroke-current text-gray-500',
                      width: 20,
                      height: 20,
                    },
                  ),
                  /*#__PURE__*/ React.createElement(
                    'span',
                    null,
                    vendor === null || vendor === void 0 ? void 0 : vendor.contactEmail,
                  ),
                ),
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'flex text-xs',
                  },
                  /*#__PURE__*/ React.createElement(
                    _assets__WEBPACK_IMPORTED_MODULE_0__.PhoneIcon,
                    {
                      className: 'stroke-current text-gray-500',
                      width: 20,
                      height: 20,
                    },
                  ),
                  /*#__PURE__*/ React.createElement(
                    'span',
                    null,
                    vendor === null || vendor === void 0 ? void 0 : vendor.contactNumber,
                  ),
                ),
              ),
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className:
                    'flex-row w-[524px] text-sm text-gray-500 rounded-lg border border-gray-200 p-3 hover:cursor-pointer',
                  onClick: openVendorModal,
                },
                (_vendor$description =
                  vendor === null || vendor === void 0 ? void 0 : vendor.description) !== null &&
                  _vendor$description !== void 0
                  ? _vendor$description
                  : 'Add a vendor description',
              ),
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className:
                    'flex flex-col mt-6 rounded-lg border border-gray-200 p-3 bg-gray-50 w-[524px]',
                },
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'flex flex-row w-full text-sm text-gray-500 group mb-2 relative',
                  },
                  /*#__PURE__*/ React.createElement(
                    'p',
                    {
                      className: 'flex-auto text-base font-bold text-Gray-3 mr-2',
                    },
                    item === null || item === void 0 ? void 0 : item.description,
                  ),
                  !!loading &&
                    /*#__PURE__*/ React.createElement(
                      _common_atoms_Loading__WEBPACK_IMPORTED_MODULE_1__['default'],
                      {
                        className: 'mx-4 absolute inset-x-0 bottom-0',
                        width: 12,
                        height: 12,
                      },
                    ),
                  /*#__PURE__*/ React.createElement(
                    'div',
                    {
                      className: 'w-auto 2xl:w-[154px] flex justify-end',
                    },
                    /*#__PURE__*/ React.createElement(
                      'div',
                      {
                        className: 'hidden group-hover:block h-6 justify-end',
                      },
                      renderEditLineItemDescriptionButton(),
                    ),
                    /*#__PURE__*/ React.createElement(
                      'div',
                      {
                        className: 'flex group-hover:hidden h-6',
                      },
                      renderTransactionType(),
                      /*#__PURE__*/ React.createElement(
                        'p',
                        {
                          className: 'text-base text-Gray-3 font-bold text-right',
                        },
                        ''.concat(
                          (0, _main_utils__WEBPACK_IMPORTED_MODULE_4__.decimalLogic)(
                            item === null || item === void 0 ? void 0 : item.amountUsd,
                            _main_utils__WEBPACK_IMPORTED_MODULE_4__.DecimalType.DetailView,
                            '$',
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'flex flex-row w-full mt-2 mb-2',
                  },
                  (item === null || item === void 0
                    ? void 0
                    : (_item$transaction9 = item.transaction) === null ||
                      _item$transaction9 === void 0
                    ? void 0
                    : _item$transaction9.createdByName) &&
                    /*#__PURE__*/ React.createElement(
                      'div',
                      {
                        className: 'flex flex-row flex-initial text-xs text-Gray-6 mr-1',
                      },
                      /*#__PURE__*/ React.createElement(
                        'div',
                        {
                          className: 'flex items-center mr-0.5',
                        },
                        'Created by:',
                      ),
                      renderAvatarIcon(item.transaction.createdByName),
                    ),
                  (item === null || item === void 0
                    ? void 0
                    : (_item$transaction10 = item.transaction) === null ||
                      _item$transaction10 === void 0
                    ? void 0
                    : _item$transaction10.billApproverName) &&
                    /*#__PURE__*/ React.createElement(
                      'div',
                      {
                        className: 'flex flex-row flex-0 text-xs text-Gray-6 mr-1',
                      },
                      /*#__PURE__*/ React.createElement(
                        'div',
                        {
                          className: 'flex items-center mr-0.5',
                        },
                        'Approver:',
                      ),
                      renderAvatarIcon(item.transaction.billApproverName),
                    ),
                  /*#__PURE__*/ React.createElement(
                    'div',
                    {
                      className: 'flex flex-row flex-1 text-xs text-Gray-6 justify-end',
                    },
                    /*#__PURE__*/ React.createElement(
                      'div',
                      {
                        className: 'flex items-center',
                      },
                      'Transaction Date:\xA0',
                      dayjs__WEBPACK_IMPORTED_MODULE_7___default()(
                        item === null || item === void 0 ? void 0 : item.transDate,
                      ).format('MMM D, YYYY'),
                    ),
                  ),
                ),
                /*#__PURE__*/ React.createElement(
                  'ul',
                  {
                    className: 'mt-2 flex flex-1 flex-col border-t border-t-Gray-28',
                  },
                  rows.map(function (row) {
                    if (
                      !loading &&
                      (0, _main_utils__WEBPACK_IMPORTED_MODULE_4__.isEmptyOrSpaces)(
                        row === null || row === void 0 ? void 0 : row.value,
                      )
                    )
                      return null;
                    return /*#__PURE__*/ React.createElement(
                      'div',
                      {
                        key: row === null || row === void 0 ? void 0 : row.key,
                        className:
                          'flex w-full py-3.5 max-h-32 flex-row items-center justify-between border-b border-b-Gray-28 last:border-b-0',
                      },
                      /*#__PURE__*/ React.createElement(
                        'p',
                        {
                          className: 'text-Gray-6 text-sm min-w-max',
                        },
                        row === null || row === void 0 ? void 0 : row.key,
                      ),
                      /*#__PURE__*/ React.createElement(
                        'p',
                        {
                          className:
                            'text-Gray-3 line-clamp-5 text-ellipsis overflow-hidden text-sm text-right ml-6',
                        },
                        row === null || row === void 0 ? void 0 : row.value,
                      ),
                    );
                  }),
                ),
              ),
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'flex flex-col p-3 w-[524px]',
                },
                /*#__PURE__*/ React.createElement(
                  'p',
                  {
                    className: 'text-sm font-bold text-Gray-3',
                  },
                  'Line Items from this transaction',
                ),
                !!loading &&
                  /*#__PURE__*/ React.createElement(
                    _common_atoms_Loading__WEBPACK_IMPORTED_MODULE_1__['default'],
                    {
                      className: 'ml-4',
                      width: 12,
                      height: 12,
                    },
                  ),
                /*#__PURE__*/ React.createElement(
                  'ul',
                  {
                    className: 'mt-2 flex flex-1 flex-col border-t border-t-Gray-28',
                  },
                  lineItems.map(function (row) {
                    var _row$category;
                    return /*#__PURE__*/ React.createElement(
                      'div',
                      {
                        key: row === null || row === void 0 ? void 0 : row.id,
                        className:
                          'flex w-full py-3.5 max-h-32 flex-col items-center justify-between border-b border-b-Gray-28 last:border-b-0',
                      },
                      /*#__PURE__*/ React.createElement(
                        'div',
                        {
                          className: 'flex w-full mb-2',
                        },
                        /*#__PURE__*/ React.createElement(
                          _assets__WEBPACK_IMPORTED_MODULE_0__.StackItemsIcon,
                          {
                            className: 'flex-initial w-4 h-4 mr-2',
                            width: 20,
                            height: 20,
                          },
                        ),
                        /*#__PURE__*/ React.createElement(
                          'p',
                          {
                            className: 'text-Gray-6 text-xs min-w-max',
                          },
                          row === null || row === void 0
                            ? void 0
                            : (_row$category = row.category) === null || _row$category === void 0
                            ? void 0
                            : _row$category.name,
                        ),
                      ),
                      /*#__PURE__*/ React.createElement(
                        'div',
                        {
                          className: 'flex w-[524px] px-3',
                        },
                        /*#__PURE__*/ React.createElement(
                          'p',
                          {
                            className: 'flex-auto text-Gray-6 text-sm truncate',
                          },
                          row === null || row === void 0 ? void 0 : row.description,
                        ),
                        /*#__PURE__*/ React.createElement(
                          'p',
                          {
                            className: 'float-right text-Gray-3 text-sm',
                          },
                          ''.concat(
                            (0, _main_utils__WEBPACK_IMPORTED_MODULE_4__.decimalLogic)(
                              row === null || row === void 0 ? void 0 : row.amountUsd,
                              _main_utils__WEBPACK_IMPORTED_MODULE_4__.DecimalType.DetailView,
                              '$',
                            ),
                          ),
                        ),
                      ),
                    );
                  }),
                ),
              ),
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'flex flex-col px-3 w-[524px]',
                },
                /*#__PURE__*/ React.createElement(
                  'p',
                  {
                    className: 'text-sm font-bold text-Gray-3',
                  },
                  ''.concat(
                    (0, _main_utils__WEBPACK_IMPORTED_MODULE_4__.getVendorNameFromLineItem)(item),
                    ' also appears in these categories',
                  ),
                ),
                !!loading &&
                  /*#__PURE__*/ React.createElement(
                    _common_atoms_Loading__WEBPACK_IMPORTED_MODULE_1__['default'],
                    {
                      className: 'ml-4',
                      width: 12,
                      height: 12,
                    },
                  ),
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'flex flex-wrap',
                  },
                  item === null || item === void 0
                    ? void 0
                    : (_item$vendor = item.vendor) === null || _item$vendor === void 0
                    ? void 0
                    : (_item$vendor$categori = _item$vendor.categories) === null ||
                      _item$vendor$categori === void 0
                    ? void 0
                    : _item$vendor$categori.map(function (category) {
                        return /*#__PURE__*/ React.createElement(
                          'span',
                          {
                            className:
                              'text-xs bg-purple-600 rounded px-2 mx-2 my-1 text-white hover:cursor-pointer',
                            key: category.id,
                            onClick: function onClick() {
                              return goToCategoryPage(
                                category === null || category === void 0 ? void 0 : category.id,
                              );
                            },
                          },
                          category.name,
                        );
                      }),
                ),
              ),
            ),
            /*#__PURE__*/ React.createElement(
              _UpdateVendorInfoModal__WEBPACK_IMPORTED_MODULE_9__.UpdateVendorInfoModal,
              {
                open: vendorModalDisclosure.isOpen,
                onClose: closeVendorModal,
                onCancel: closeVendorModal,
                vendor: vendor,
                onConfirm: onVendorUpdate,
              },
            ),
            item &&
              /*#__PURE__*/ React.createElement(
                _UpdateDetailsLineItemInfoModal__WEBPACK_IMPORTED_MODULE_8__.UpdateDetailsLineItemInfoModal,
                {
                  open: lineItemModalDisclosure.isOpen,
                  onClose: closeLineItemModal,
                  onCancel: closeLineItemModal,
                  transLineItem: item,
                  onConfirm: onLineItemUpdate,
                },
              ),
          );
        };

        /***/
      },

    /***/ './src/feed/LineItemDrawer/LineItemDrawer.tsx':
      /*!****************************************************!*\
  !*** ./src/feed/LineItemDrawer/LineItemDrawer.tsx ***!
  \****************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ LineItemDrawer: function () {
            return /* binding */ LineItemDrawer;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _common_hocs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/common/hocs */ './src/common/hocs/index.ts',
        );
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var _profile_useProfile__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! @/profile/useProfile */ './src/profile/useProfile.ts');
        /* harmony import */ var _vendor_apis__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @/vendor/apis */ './src/vendor/apis.ts',
        );
        /* harmony import */ var _dwarvesf_react_hooks__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! @dwarvesf/react-hooks */ './node_modules/@dwarvesf/react-hooks/dist/index.js',
          );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var mixpanel_browser__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(
            /*! mixpanel-browser */ './node_modules/mixpanel-browser/dist/mixpanel.cjs.js',
          );
        /* harmony import */ var mixpanel_browser__WEBPACK_IMPORTED_MODULE_7___default =
          /*#__PURE__*/ __webpack_require__.n(mixpanel_browser__WEBPACK_IMPORTED_MODULE_7__);
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var _apis__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
          /*! ../apis */ './src/feed/apis.ts',
        );
        /* harmony import */ var _LineItemDetails__WEBPACK_IMPORTED_MODULE_10__ =
          __webpack_require__(
            /*! ./LineItemDetails */ './src/feed/LineItemDrawer/LineItemDetails.tsx',
          );
        /* harmony import */ var _mixpanel_useMixPanel__WEBPACK_IMPORTED_MODULE_11__ =
          __webpack_require__(/*! @/mixpanel/useMixPanel */ './src/mixpanel/useMixPanel.ts');
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

        var LineItemDrawer = (0, _common_hocs__WEBPACK_IMPORTED_MODULE_1__.withMountOnOpen)()(
          function (_ref) {
            var _profile$company2;
            var className = _ref.className,
              onClose = _ref.onClose,
              feedId = _ref.feedId,
              lineItem = _ref.lineItem,
              open = _ref.open;
            var _useProfile = (0, _profile_useProfile__WEBPACK_IMPORTED_MODULE_3__.useProfile)(),
              profile = _useProfile.profile;
            var _useFetcher = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_2__.useFetcher)(
                !!(lineItem !== null && lineItem !== void 0 && lineItem.id) && [
                  'lineItem',
                  lineItem.id,
                ],
                function () {
                  return _apis__WEBPACK_IMPORTED_MODULE_9__.FeedApis.getLineItem(lineItem.id);
                },
              ),
              isValidating = _useFetcher.isValidating,
              lineItemDetails = _useFetcher.data,
              mutate = _useFetcher.mutate;
            var closeOnClickOutsideDisclosure = (0,
            _dwarvesf_react_hooks__WEBPACK_IMPORTED_MODULE_5__.useDisclosure)({
              defaultIsOpen: true,
            });
            var _useHandler = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_2__.useHandler)(
                /*#__PURE__*/ (function () {
                  var _ref2 = _asyncToGenerator(
                    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee(id, payload) {
                      var _payload$website,
                        _payload$contactEmail,
                        _payload$contactNumbe,
                        _payload$description;
                      var filteredPayLoad, res;
                      return _regeneratorRuntime().wrap(function _callee$(_context) {
                        while (1)
                          switch ((_context.prev = _context.next)) {
                            case 0:
                              filteredPayLoad = {
                                website:
                                  (_payload$website = payload.website) !== null &&
                                  _payload$website !== void 0
                                    ? _payload$website
                                    : null,
                                contactEmail:
                                  (_payload$contactEmail = payload.contactEmail) !== null &&
                                  _payload$contactEmail !== void 0
                                    ? _payload$contactEmail
                                    : null,
                                contactNumber:
                                  (_payload$contactNumbe = payload.contactNumber) !== null &&
                                  _payload$contactNumbe !== void 0
                                    ? _payload$contactNumbe
                                    : null,
                                description:
                                  (_payload$description = payload.description) !== null &&
                                  _payload$description !== void 0
                                    ? _payload$description
                                    : null,
                              };
                              _context.next = 3;
                              return _vendor_apis__WEBPACK_IMPORTED_MODULE_4__.VendorApis.update(
                                id,
                                filteredPayLoad,
                              );
                            case 3:
                              res = _context.sent;
                              mutate();
                              return _context.abrupt('return', res);
                            case 6:
                            case 'end':
                              return _context.stop();
                          }
                      }, _callee);
                    }),
                  );
                  return function (_x, _x2) {
                    return _ref2.apply(this, arguments);
                  };
                })(),
              ),
              handleVendorUpdate = _useHandler.handle;
            var _useHandler2 = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_2__.useHandler)(
                /*#__PURE__*/ (function () {
                  var _ref3 = _asyncToGenerator(
                    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee2(id, payload) {
                      var res;
                      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                        while (1)
                          switch ((_context2.prev = _context2.next)) {
                            case 0:
                              _context2.next = 2;
                              return _apis__WEBPACK_IMPORTED_MODULE_9__.FeedApis.updateLineItem(
                                id,
                                payload,
                              );
                            case 2:
                              res = _context2.sent;
                              mutate();
                              return _context2.abrupt('return', res);
                            case 5:
                            case 'end':
                              return _context2.stop();
                          }
                      }, _callee2);
                    }),
                  );
                  return function (_x3, _x4) {
                    return _ref3.apply(this, arguments);
                  };
                })(),
              ),
              handleLineItemUpdate = _useHandler2.handle;
            react__WEBPACK_IMPORTED_MODULE_8__.useEffect(
              function () {
                var _profile$company;
                mixpanel_browser__WEBPACK_IMPORTED_MODULE_7___default().track('Feed Detail View', {
                  user_id: profile === null || profile === void 0 ? void 0 : profile.id,
                  email: profile === null || profile === void 0 ? void 0 : profile.email,
                  company_id:
                    profile === null || profile === void 0
                      ? void 0
                      : (_profile$company = profile.company) === null || _profile$company === void 0
                      ? void 0
                      : _profile$company.id,
                  feed_id: feedId,
                  line_item_id: lineItem === null || lineItem === void 0 ? void 0 : lineItem.id,
                });
                (0,
                _mixpanel_useMixPanel__WEBPACK_IMPORTED_MODULE_11__.identifyMixPanelUserProfile)(
                  profile,
                );
              },
              [
                feedId,
                profile === null || profile === void 0
                  ? void 0
                  : (_profile$company2 = profile.company) === null || _profile$company2 === void 0
                  ? void 0
                  : _profile$company2.id,
                profile === null || profile === void 0 ? void 0 : profile.email,
                profile === null || profile === void 0 ? void 0 : profile.id,
                lineItem === null || lineItem === void 0 ? void 0 : lineItem.id,
                profile,
              ],
            );
            return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
              _common_components__WEBPACK_IMPORTED_MODULE_0__.Drawer,
              {
                open: open,
                onClose: onClose,
                closeOnClickOutside: closeOnClickOutsideDisclosure.isOpen,
                showCloseButton: false,
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                'div',
                {
                  className: (0, clsx__WEBPACK_IMPORTED_MODULE_6__['default'])(
                    'relative z-20 flex flex-1 flex-col h-full',
                    className,
                  ),
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                  _LineItemDetails__WEBPACK_IMPORTED_MODULE_10__.LineItemDetails,
                  {
                    onCloseClick: onClose,
                    loading: isValidating,
                    item: lineItemDetails,
                    onModalOpen: closeOnClickOutsideDisclosure.onClose,
                    onModalClose: closeOnClickOutsideDisclosure.onOpen,
                    onVendorUpdate: handleVendorUpdate,
                    onLineItemUpdate: handleLineItemUpdate,
                  },
                ),
              ),
            );
          },
        );

        /***/
      },

    /***/ './src/feed/LineItemDrawer/UpdateDetailsLineItemInfoModal.tsx':
      /*!********************************************************************!*\
  !*** ./src/feed/LineItemDrawer/UpdateDetailsLineItemInfoModal.tsx ***!
  \********************************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ UpdateDetailsLineItemInfoModal: function () {
            return /* binding */ UpdateDetailsLineItemInfoModal;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_atoms_Modal__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/atoms/Modal */ './src/common/atoms/Modal/index.tsx');
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _common_hocs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @/common/hocs */ './src/common/hocs/index.ts',
        );
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var _main_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @/main/utils */ './src/main/utils.ts',
        );
        /* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! dayjs */ './node_modules/dayjs/dayjs.min.js',
        );
        /* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_5___default =
          /*#__PURE__*/ __webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_5__);
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! react-hook-form */ './node_modules/react-hook-form/dist/index.esm.mjs',
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

        var UpdateDetailsLineItemInfoModal = (0,
        _common_hocs__WEBPACK_IMPORTED_MODULE_2__.withMountOnOpen)()(function (_ref) {
          var _transLineItem$catego,
            _transLineItem$catego2,
            _transLineItem$transa3,
            _transLineItem$transa4,
            _transLineItem$transa5,
            _transLineItem$transa6,
            _transLineItem$transa7,
            _transLineItem$transa8,
            _transLineItem$transa9,
            _transLineItem$transa10,
            _transLineItem$transa11;
          var _ref$open = _ref.open,
            open = _ref$open === void 0 ? false : _ref$open,
            onClose = _ref.onClose,
            onCancel = _ref.onCancel,
            transLineItem = _ref.transLineItem,
            onConfirm = _ref.onConfirm;
          var methods = (0, react_hook_form__WEBPACK_IMPORTED_MODULE_7__.useForm)({
            mode: 'onChange',
          });
          var isValid = methods.formState.isValid,
            reset = methods.reset;
          react__WEBPACK_IMPORTED_MODULE_6__.useEffect(
            function () {
              reset(transLineItem);
            },
            [reset, transLineItem],
          );
          var getOriginalAmountWithSign = function getOriginalAmountWithSign() {
            var _transLineItem$transa, _transLineItem$transa2;
            if (
              !(
                transLineItem !== null &&
                transLineItem !== void 0 &&
                (_transLineItem$transa = transLineItem.transaction) !== null &&
                _transLineItem$transa !== void 0 &&
                _transLineItem$transa.currency
              ) ||
              !(transLineItem !== null && transLineItem !== void 0 && transLineItem.amountFx)
            )
              return '...';
            var amountWithCurrency = Intl.NumberFormat('en-US', {
              style: 'currency',
              currency:
                (transLineItem === null || transLineItem === void 0
                  ? void 0
                  : (_transLineItem$transa2 = transLineItem.transaction) === null ||
                    _transLineItem$transa2 === void 0
                  ? void 0
                  : _transLineItem$transa2.currency) || '',
            }).format(
              (transLineItem === null || transLineItem === void 0
                ? void 0
                : transLineItem.amountFx) || 0,
            );
            return amountWithCurrency;
          };
          var rows = [
            {
              id: 'category',
              key: 'Category',
              value:
                (_transLineItem$catego =
                  transLineItem === null || transLineItem === void 0
                    ? void 0
                    : (_transLineItem$catego2 = transLineItem.category) === null ||
                      _transLineItem$catego2 === void 0
                    ? void 0
                    : _transLineItem$catego2.name) !== null && _transLineItem$catego !== void 0
                  ? _transLineItem$catego
                  : '...',
            },
            {
              id: 'created-by',
              key: 'Created By',
              value:
                (_transLineItem$transa3 =
                  transLineItem === null || transLineItem === void 0
                    ? void 0
                    : (_transLineItem$transa4 = transLineItem.transaction) === null ||
                      _transLineItem$transa4 === void 0
                    ? void 0
                    : _transLineItem$transa4.createdByName) !== null &&
                _transLineItem$transa3 !== void 0
                  ? _transLineItem$transa3
                  : '...',
            },
            {
              id: 'approver',
              key: 'Approver',
              value:
                (_transLineItem$transa5 =
                  transLineItem === null || transLineItem === void 0
                    ? void 0
                    : (_transLineItem$transa6 = transLineItem.transaction) === null ||
                      _transLineItem$transa6 === void 0
                    ? void 0
                    : _transLineItem$transa6.billApproverName) !== null &&
                _transLineItem$transa5 !== void 0
                  ? _transLineItem$transa5
                  : '...',
            },
            {
              id: 'terms',
              key: 'Terms',
              value:
                (_transLineItem$transa7 =
                  transLineItem === null || transLineItem === void 0
                    ? void 0
                    : (_transLineItem$transa8 = transLineItem.transaction) === null ||
                      _transLineItem$transa8 === void 0
                    ? void 0
                    : _transLineItem$transa8.terms) !== null && _transLineItem$transa7 !== void 0
                  ? _transLineItem$transa7
                  : '...',
            },
            {
              id: 'due-date',
              key: 'Due Date',
              value: dayjs__WEBPACK_IMPORTED_MODULE_5___default()(
                transLineItem === null || transLineItem === void 0
                  ? void 0
                  : (_transLineItem$transa9 = transLineItem.transaction) === null ||
                    _transLineItem$transa9 === void 0
                  ? void 0
                  : _transLineItem$transa9.dueDate,
              ).format('MMM D, YYYY'),
            },
            {
              id: 'transaction-date',
              key: 'Transaction Date',
              value: dayjs__WEBPACK_IMPORTED_MODULE_5___default()(
                transLineItem === null || transLineItem === void 0
                  ? void 0
                  : transLineItem.transDate,
              ).format('MMM D, YYYY'),
            },
            {
              id: 'original-amount',
              key: 'Original Amount',
              value: getOriginalAmountWithSign(),
            },
            {
              id: 'subsidiary-name',
              key: 'Subsidiary',
              value:
                (_transLineItem$transa10 =
                  transLineItem === null || transLineItem === void 0
                    ? void 0
                    : (_transLineItem$transa11 = transLineItem.transaction) === null ||
                      _transLineItem$transa11 === void 0
                    ? void 0
                    : _transLineItem$transa11.subsidiaryName) !== null &&
                _transLineItem$transa10 !== void 0
                  ? _transLineItem$transa10
                  : '...',
            },
          ];
          var renderAvatarIcon = function renderAvatarIcon(fullName) {
            var shortName = (0, _main_utils__WEBPACK_IMPORTED_MODULE_4__.getNameAbbreviation)(
              fullName,
            );
            return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_6__.createElement(
              'span',
              {
                className: 'flex h-8 w-8 rounded-full bg-purple-5 justify-center items-center ml-2',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                'span',
                {
                  className: 'text-white text-xs font-semibold',
                },
                shortName,
              ),
            );
          };
          var _useHandler = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_3__.useHandler)(onConfirm),
            handleConfirm = _useHandler.handle,
            isConfirming = _useHandler.isLoading;
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_6__.createElement(
            _common_atoms_Modal__WEBPACK_IMPORTED_MODULE_0__['default'],
            {
              open: open,
              onClose: onClose,
              center: false,
              contentClass: 'sm:my-24 overflow-visible',
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_6__.createElement(
              _common_components__WEBPACK_IMPORTED_MODULE_1__.Form,
              {
                methods: methods,
                onSubmit: /*#__PURE__*/ (function () {
                  var _ref2 = _asyncToGenerator(
                    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee(data) {
                      return _regeneratorRuntime().wrap(function _callee$(_context) {
                        while (1)
                          switch ((_context.prev = _context.next)) {
                            case 0:
                              _context.next = 2;
                              return handleConfirm(transLineItem.id, data);
                            case 2:
                              onClose();
                            case 3:
                            case 'end':
                              return _context.stop();
                          }
                      }, _callee);
                    }),
                  );
                  return function (_x) {
                    return _ref2.apply(this, arguments);
                  };
                })(),
                className: 'flex flex-col w-[685px] outline-none pt-4',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                'div',
                {
                  className: 'flex flex-col space-y-2 px-10 py-4 w-full',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                  'p',
                  {
                    className: 'text-primary text-xs font-semibold',
                  },
                  'Line Item Description',
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                  _common_components__WEBPACK_IMPORTED_MODULE_1__.Form.Input,
                  {
                    name: 'description',
                    placeholder: 'What goods or services does this business provide?',
                    rules: {
                      required: true,
                    },
                  },
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                  'ul',
                  {
                    className: 'mt-2 flex flex-1 flex-col border-t border-t-Gray-28',
                  },
                  rows.map(function (row) {
                    var _transLineItem$transa12,
                      _transLineItem$transa13,
                      _transLineItem$transa14,
                      _transLineItem$transa15;
                    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                      'div',
                      {
                        key: row === null || row === void 0 ? void 0 : row.key,
                        className:
                          'flex w-full py-3.5 max-h-32 flex-row items-center justify-between',
                      },
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                        'p',
                        {
                          className: 'text-Gray-6 text-sm min-w-max',
                        },
                        row === null || row === void 0 ? void 0 : row.key,
                      ),
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                        'p',
                        {
                          className:
                            'flex items-center text-Gray-3 text-ellipsis overflow-hidden text-sm text-right ml-6',
                        },
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                          'span',
                          null,
                          row === null || row === void 0 ? void 0 : row.value,
                        ),
                        (row === null || row === void 0 ? void 0 : row.id) === 'created-by' &&
                          renderAvatarIcon(
                            (_transLineItem$transa12 =
                              transLineItem === null || transLineItem === void 0
                                ? void 0
                                : (_transLineItem$transa13 = transLineItem.transaction) === null ||
                                  _transLineItem$transa13 === void 0
                                ? void 0
                                : _transLineItem$transa13.createdByName) !== null &&
                              _transLineItem$transa12 !== void 0
                              ? _transLineItem$transa12
                              : '',
                          ),
                        (row === null || row === void 0 ? void 0 : row.id) === 'approver' &&
                          renderAvatarIcon(
                            (_transLineItem$transa14 =
                              transLineItem === null || transLineItem === void 0
                                ? void 0
                                : (_transLineItem$transa15 = transLineItem.transaction) === null ||
                                  _transLineItem$transa15 === void 0
                                ? void 0
                                : _transLineItem$transa15.billApproverName) !== null &&
                              _transLineItem$transa14 !== void 0
                              ? _transLineItem$transa14
                              : '',
                          ),
                      ),
                    );
                  }),
                ),
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_6__.createElement('hr', {
                className: 'divider divider-horizontal w-full',
              }),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                'div',
                {
                  className: 'flex flex-row w-full px-10 py-4 gap-3 justify-end',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                  _common_components__WEBPACK_IMPORTED_MODULE_1__.Button,
                  {
                    variant: 'ghost',
                    colorScheme: 'gray',
                    onClick: onCancel,
                  },
                  'Cancel',
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                  _common_components__WEBPACK_IMPORTED_MODULE_1__.Button,
                  {
                    variant: 'solid',
                    type: 'submit',
                    disabled: !isValid,
                    loading: isConfirming,
                  },
                  'Save Changes',
                ),
              ),
            ),
          );
        });

        /***/
      },

    /***/ './src/feed/LineItemDrawer/UpdateVendorInfoModal.tsx':
      /*!***********************************************************!*\
  !*** ./src/feed/LineItemDrawer/UpdateVendorInfoModal.tsx ***!
  \***********************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ UpdateVendorInfoModal: function () {
            return /* binding */ UpdateVendorInfoModal;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_atoms_Modal__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/atoms/Modal */ './src/common/atoms/Modal/index.tsx');
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _common_hocs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @/common/hocs */ './src/common/hocs/index.ts',
        );
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! lodash-es */ './node_modules/lodash-es/omitBy.js',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! react-hook-form */ './node_modules/react-hook-form/dist/index.esm.mjs',
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

        var UpdateVendorInfoModal = (0,
        _common_hocs__WEBPACK_IMPORTED_MODULE_2__.withMountOnOpen)()(function (_ref) {
          var _vendor$name;
          var _ref$open = _ref.open,
            open = _ref$open === void 0 ? false : _ref$open,
            onClose = _ref.onClose,
            onCancel = _ref.onCancel,
            onConfirm = _ref.onConfirm,
            vendor = _ref.vendor;
          var methods = (0, react_hook_form__WEBPACK_IMPORTED_MODULE_6__.useForm)({
            mode: 'onChange',
          });
          var isValid = methods.formState.isValid,
            reset = methods.reset;
          react__WEBPACK_IMPORTED_MODULE_5__.useEffect(
            function () {
              reset(vendor);
            },
            [reset, vendor],
          );
          var _useHandler = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_3__.useHandler)(onConfirm),
            handleConfirm = _useHandler.handle,
            isConfirming = _useHandler.isLoading;
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
            _common_atoms_Modal__WEBPACK_IMPORTED_MODULE_0__['default'],
            {
              open: open,
              onClose: onClose,
              contentClass: 'sm:my-24 overflow-visible',
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
              _common_components__WEBPACK_IMPORTED_MODULE_1__.Form,
              {
                methods: methods,
                onSubmit: /*#__PURE__*/ (function () {
                  var _ref2 = _asyncToGenerator(
                    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee(data) {
                      return _regeneratorRuntime().wrap(function _callee$(_context) {
                        while (1)
                          switch ((_context.prev = _context.next)) {
                            case 0:
                              _context.next = 2;
                              return handleConfirm(
                                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                vendor.id,
                                (0, lodash_es__WEBPACK_IMPORTED_MODULE_7__['default'])(
                                  data,
                                  function (v) {
                                    return !v;
                                  },
                                ),
                              );
                            case 2:
                              onClose();
                            case 3:
                            case 'end':
                              return _context.stop();
                          }
                      }, _callee);
                    }),
                  );
                  return function (_x) {
                    return _ref2.apply(this, arguments);
                  };
                })(),
                className: 'flex flex-col w-[685px] outline-none pt-4',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                'div',
                {
                  className: 'flex flex-col space-y-2 px-10 py-4 w-full',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                  'p',
                  {
                    className: 'text-primary text-lg font-bold',
                  },
                  (_vendor$name = vendor === null || vendor === void 0 ? void 0 : vendor.name) !==
                    null && _vendor$name !== void 0
                    ? _vendor$name
                    : '',
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                  'p',
                  {
                    className: 'text-primary text-xs font-semibold',
                  },
                  'Vendor Description',
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                  'div',
                  {
                    className: (0, clsx__WEBPACK_IMPORTED_MODULE_4__['default'])(
                      'flex flex-col h-[38px] w-auto bg-Gray-12',
                    ),
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_1__.Form.Input,
                    {
                      name: 'description',
                      placeholder: 'What goods or services does this business provide?',
                    },
                  ),
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                  'p',
                  {
                    className: 'text-primary text-xs font-semibold',
                  },
                  'Website',
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                  'div',
                  {
                    className: (0, clsx__WEBPACK_IMPORTED_MODULE_4__['default'])(
                      'flex flex-col h-[38px] w-auto bg-Gray-12',
                    ),
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_1__.Form.Input,
                    {
                      name: 'website',
                      placeholder: 'company.com',
                    },
                  ),
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                  'p',
                  {
                    className: 'text-primary text-xs font-semibold',
                  },
                  'Email',
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                  'div',
                  {
                    className: (0, clsx__WEBPACK_IMPORTED_MODULE_4__['default'])(
                      'flex flex-col h-[38px] w-auto bg-Gray-12',
                    ),
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_1__.Form.Input,
                    {
                      name: 'contactEmail',
                      placeholder: 'name@company.com',
                    },
                  ),
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                  'p',
                  {
                    className: 'text-primary text-xs font-semibold',
                  },
                  'Phone',
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                  'div',
                  {
                    className: (0, clsx__WEBPACK_IMPORTED_MODULE_4__['default'])(
                      'flex flex-col h-[38px] w-auto bg-Gray-12',
                    ),
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_1__.Form.Input,
                    {
                      name: 'contactNumber',
                      placeholder: '(555) 555-5555',
                    },
                  ),
                ),
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement('hr', {
                className: 'divider divider-horizontal w-full',
              }),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                'div',
                {
                  className: 'flex w-full px-12 py-4 justify-end gap-3',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                  _common_components__WEBPACK_IMPORTED_MODULE_1__.Button,
                  {
                    variant: 'ghost',
                    colorScheme: 'gray',
                    onClick: onCancel,
                  },
                  'Cancel',
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_5__.createElement(
                  _common_components__WEBPACK_IMPORTED_MODULE_1__.Button,
                  {
                    variant: 'solid',
                    type: 'submit',
                    disabled: !isValid,
                    loading: isConfirming,
                  },
                  'Save Changes',
                ),
              ),
            ),
          );
        });

        /***/
      },

    /***/ './src/feed/LineItemDrawer/index.ts':
      /*!******************************************!*\
  !*** ./src/feed/LineItemDrawer/index.ts ***!
  \******************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ LineItemDrawer: function () {
            return /* reexport safe */ _LineItemDrawer__WEBPACK_IMPORTED_MODULE_0__.LineItemDrawer;
          },
          /* harmony export */ useLineItemDrawer: function () {
            return /* reexport safe */ _useLineItemDrawer__WEBPACK_IMPORTED_MODULE_1__.useLineItemDrawer;
          },
          /* harmony export */
        });
        /* harmony import */ var _LineItemDrawer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! ./LineItemDrawer */ './src/feed/LineItemDrawer/LineItemDrawer.tsx',
        );
        /* harmony import */ var _useLineItemDrawer__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./useLineItemDrawer */ './src/feed/LineItemDrawer/useLineItemDrawer.ts',
          );

        /***/
      },

    /***/ './src/feed/LineItemDrawer/useLineItemDrawer.ts':
      /*!******************************************************!*\
  !*** ./src/feed/LineItemDrawer/useLineItemDrawer.ts ***!
  \******************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ useLineItemDrawer: function () {
            return /* binding */ useLineItemDrawer;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
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

        var useLineItemDrawer = function useLineItemDrawer() {
          var _useBreakpoint;
          var _useWindowState = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_0__.useWindowState)(
              'lineItemDrawer-selectedItem',
              null,
            ),
            _useWindowState2 = _slicedToArray(_useWindowState, 2),
            selectedLineItem = _useWindowState2[0],
            setSelectedLineItem = _useWindowState2[1];
          var _useWindowState3 = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_0__.useWindowState)(
              'lineItemDrawer-feedId',
              undefined,
            ),
            _useWindowState4 = _slicedToArray(_useWindowState3, 2),
            feedId = _useWindowState4[0],
            setFeedId = _useWindowState4[1];
          var openLineItemDrawer = react__WEBPACK_IMPORTED_MODULE_1__.useCallback(
            function (lineItem, feedId) {
              setSelectedLineItem(lineItem);
              setFeedId(feedId);
            },
            [setFeedId, setSelectedLineItem],
          );
          var closeLineItemDrawer = react__WEBPACK_IMPORTED_MODULE_1__.useCallback(
            function () {
              return setSelectedLineItem(null);
            },
            [setSelectedLineItem],
          );
          var isMobile =
            (_useBreakpoint = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_0__.useBreakpoint)({
              768: false,
            })) !== null && _useBreakpoint !== void 0
              ? _useBreakpoint
              : true;
          return react__WEBPACK_IMPORTED_MODULE_1__.useMemo(
            function () {
              return {
                openLineItemDrawer: openLineItemDrawer,
                isLineItemDrawerOpen: !isMobile && !!selectedLineItem,
                closeLineItemDrawer: closeLineItemDrawer,
                selectedLineItem: selectedLineItem,
                feedId: feedId,
              };
            },
            [openLineItemDrawer, isMobile, selectedLineItem, closeLineItemDrawer, feedId],
          );
        };

        /***/
      },

    /***/ './src/team/DateRangeSelect.tsx':
      /*!**************************************!*\
  !*** ./src/team/DateRangeSelect.tsx ***!
  \**************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ DateRangeSelect: function () {
            return /* binding */ DateRangeSelect;
          },
          /* harmony export */
        });
        /* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/assets */ './src/assets/index.ts',
        );
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _common_components_Radio__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! @/common/components/Radio */ './src/common/components/Radio/index.ts',
          );
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! dayjs */ './node_modules/dayjs/dayjs.min.js',
        );
        /* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_5___default =
          /*#__PURE__*/ __webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_5__);

        var convertDateRangeValueToString = function convertDateRangeValueToString(value) {
          return ''
            .concat(
              dayjs__WEBPACK_IMPORTED_MODULE_5___default()(value[0]).format('MMM DD, YYYY'),
              ' - ',
            )
            .concat(dayjs__WEBPACK_IMPORTED_MODULE_5___default()(value[1]).format('MMM DD, YYYY'));
        };
        var DateRangeSelect = function DateRangeSelect(_ref) {
          var value = _ref.value,
            _onChange = _ref.onChange,
            _ref$variant = _ref.variant,
            variant = _ref$variant === void 0 ? 'text' : _ref$variant;
          var popoverDisclosure = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_3__.useDisclosure)();
          return /*#__PURE__*/ React.createElement(
            _common_components__WEBPACK_IMPORTED_MODULE_1__.Popover,
            {
              open: popoverDisclosure.isOpen,
              onClose: popoverDisclosure.close,
              placement: 'bottom',
              trigger: /*#__PURE__*/ React.createElement(
                _common_components__WEBPACK_IMPORTED_MODULE_1__.Select,
                {
                  value: Array.isArray(value) ? convertDateRangeValueToString(value) : value,
                  onChange: function onChange(value) {
                    return _onChange === null || _onChange === void 0 ? void 0 : _onChange(value);
                  },
                  className: (0, clsx__WEBPACK_IMPORTED_MODULE_4__['default'])('flex-shrink-0', {
                    'text-Gray-6': variant === 'text',
                  }),
                  noBorder: variant === 'text',
                  options: [
                    {
                      label: 'Last 30 Days',
                      value: '30-days',
                    },
                    {
                      label: 'Last 90 Days',
                      value: '90-days',
                    },
                    {
                      label: 'Year To Date',
                      value: 'year-to-date',
                    },
                    {
                      label: 'Custom Date',
                      value: Array.isArray(value) ? convertDateRangeValueToString(value) : 'custom',
                    },
                  ],
                  renderSelectedItemLabel: function renderSelectedItemLabel(_ref2) {
                    var label = _ref2.label,
                      value = _ref2.value;
                    if (label === 'Custom Date') return value;
                    return label;
                  },
                  renderItem: function renderItem(_ref3) {
                    var selected = _ref3.selected,
                      label = _ref3.label,
                      value = _ref3.value,
                      handleClick = _ref3.handleClick;
                    if (value.includes(' - ') || value === 'custom')
                      return /*#__PURE__*/ React.createElement(
                        _common_components__WEBPACK_IMPORTED_MODULE_1__.Button,
                        {
                          className:
                            'flex items-center gap-2 border-t border-Gray-11 w-full py-2 px-4 text-Gray-3 text-sm',
                          onClick: popoverDisclosure.toggle,
                        },
                        /*#__PURE__*/ React.createElement(
                          _assets__WEBPACK_IMPORTED_MODULE_0__.AddSmallSolid,
                          {
                            width: 20,
                            height: 20,
                          },
                        ),
                        /*#__PURE__*/ React.createElement('div', null, label),
                      );
                    return /*#__PURE__*/ React.createElement(
                      _common_components__WEBPACK_IMPORTED_MODULE_1__.Button,
                      {
                        className: 'py-2 px-4 text-Gray-3 text-sm flex items-center gap-2',
                        onClick: handleClick,
                      },
                      /*#__PURE__*/ React.createElement(
                        'div',
                        {
                          className: 'w-5 h-5 flex items-center justify-center',
                        },
                        /*#__PURE__*/ React.createElement(
                          _common_components_Radio__WEBPACK_IMPORTED_MODULE_2__.Radio,
                          {
                            checked: selected,
                          },
                        ),
                      ),
                      /*#__PURE__*/ React.createElement(
                        'div',
                        {
                          className: 'text-sm',
                        },
                        label,
                      ),
                    );
                  },
                },
              ),
            },
            popoverDisclosure.isOpen &&
              /*#__PURE__*/ React.createElement(
                _common_components__WEBPACK_IMPORTED_MODULE_1__.DateRangePicker,
                {
                  value: typeof value !== 'string' ? value : undefined,
                  onChange: _onChange,
                  onClose: popoverDisclosure.close,
                },
              ),
          );
        };

        /***/
      },

    /***/ './src/team/constants.ts':
      /*!*******************************!*\
  !*** ./src/team/constants.ts ***!
  \*******************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ DEFAULT_SORT: function () {
            return /* binding */ DEFAULT_SORT;
          },
          /* harmony export */ fallbackDepartment: function () {
            return /* binding */ fallbackDepartment;
          },
          /* harmony export */
        });
        var fallbackDepartment = {
          id: 1,
          name: '',
        };
        var DEFAULT_SORT = '-transDate';

        /***/
      },

    /***/ './src/transactions/TransactionList/index.tsx':
      /*!****************************************************!*\
  !*** ./src/transactions/TransactionList/index.tsx ***!
  \****************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ TransactionList: function () {
            return /* binding */ TransactionList;
          },
          /* harmony export */ getTransactionColorScheme: function () {
            return /* binding */ getTransactionColorScheme;
          },
          /* harmony export */ shouldTruncateTranStatus: function () {
            return /* binding */ shouldTruncateTranStatus;
          },
          /* harmony export */
        });
        /* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/assets */ './src/assets/index.ts',
        );
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _common_components_EmptyState__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! @/common/components/EmptyState */ './src/common/components/EmptyState/index.ts',
          );
        /* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! @/common/constants */ './src/common/constants.ts');
        /* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @/common/utils */ './src/common/utils/index.ts',
        );
        /* harmony import */ var _feed_CommentGroup__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(/*! @/feed/CommentGroup */ './src/feed/CommentGroup.tsx');
        /* harmony import */ var _feed_LineItemDrawer__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(/*! @/feed/LineItemDrawer */ './src/feed/LineItemDrawer/index.ts');
        /* harmony import */ var _main_entity__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! @/main/entity */ './src/main/entity/index.ts',
        );
        /* harmony import */ var _main_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          /*! @/main/utils */ './src/main/utils.ts',
        );
        /* harmony import */ var _team_DateRangeSelect__WEBPACK_IMPORTED_MODULE_9__ =
          __webpack_require__(/*! @/team/DateRangeSelect */ './src/team/DateRangeSelect.tsx');
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_12__ =
          __webpack_require__(
            /*! react-router-dom */ './node_modules/react-router-dom/esm/react-router-dom.js',
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

        var getTransactionColorScheme = function getTransactionColorScheme(status) {
          switch (status) {
            case _main_entity__WEBPACK_IMPORTED_MODULE_7__.TranStatus.PaidInFull ||
              _main_entity__WEBPACK_IMPORTED_MODULE_7__.TranStatus.Paid:
              return 'green';
            case _main_entity__WEBPACK_IMPORTED_MODULE_7__.TranStatus.Open:
              return 'purple';
            default:
              return 'yellow';
          }
        };
        var statusTruncateConditions = [
          _main_entity__WEBPACK_IMPORTED_MODULE_7__.TranStatus.Open,
          _main_entity__WEBPACK_IMPORTED_MODULE_7__.TranStatus.Cancelled,
          _main_entity__WEBPACK_IMPORTED_MODULE_7__.TranStatus.Closed,
          _main_entity__WEBPACK_IMPORTED_MODULE_7__.TranStatus.Rejected,
          _main_entity__WEBPACK_IMPORTED_MODULE_7__.TranStatus.Paid,
        ];
        var shouldTruncateTranStatus = function shouldTruncateTranStatus(status) {
          return !statusTruncateConditions.includes(status);
        };
        var TransactionList = function TransactionList(_ref) {
          var _renderTitle, _renderTitle2;
          var className = _ref.className,
            transactions = _ref.transactions,
            loading = _ref.loading,
            hiddenColumns = _ref.hiddenColumns,
            sort = _ref.sort,
            _onSortChange = _ref.onSortChange,
            dateRange = _ref.dateRange,
            onDateRangeChange = _ref.onDateRangeChange,
            page = _ref.page,
            onPageChange = _ref.onPageChange,
            totalCount = _ref.totalCount,
            _ref$defaultExpand = _ref.defaultExpand,
            defaultExpand = _ref$defaultExpand === void 0 ? false : _ref$defaultExpand,
            renderTitle = _ref.renderTitle,
            _ref$disableTransacti = _ref.disableTransactionButton,
            disableTransactionButton =
              _ref$disableTransacti === void 0 ? false : _ref$disableTransacti;
          var _useLineItemDrawer = (0,
            _feed_LineItemDrawer__WEBPACK_IMPORTED_MODULE_6__.useLineItemDrawer)(),
            isLineItemDrawerOpen = _useLineItemDrawer.isLineItemDrawerOpen,
            selectedLineItem = _useLineItemDrawer.selectedLineItem,
            closeLineItemDrawer = _useLineItemDrawer.closeLineItemDrawer,
            feedId = _useLineItemDrawer.feedId,
            openLineItemDrawer = _useLineItemDrawer.openLineItemDrawer;
          var showCategory = !(
            hiddenColumns !== null &&
            hiddenColumns !== void 0 &&
            hiddenColumns.includes('categoryName')
          );
          var showDepartment = !(
            hiddenColumns !== null &&
            hiddenColumns !== void 0 &&
            hiddenColumns.includes('depName')
          );
          var showVendor = !(
            hiddenColumns !== null &&
            hiddenColumns !== void 0 &&
            hiddenColumns.includes('vendorName')
          );
          var _useState = (0, react__WEBPACK_IMPORTED_MODULE_11__.useState)(defaultExpand),
            _useState2 = _slicedToArray(_useState, 2),
            listOpen = _useState2[0],
            setListOpen = _useState2[1];
          var headers = [
            {
              label: 'Date',
              sortKey: 'transDate',
            },
            showDepartment && {
              label: 'Team',
              sortKey: 'depName',
            },
            showCategory && {
              label: 'Category',
              sortKey: 'categoryName',
            },
            showVendor && {
              label: 'Vendor',
              sortKey: 'vendorName',
            },
            {
              label: 'Description',
            },
            {
              label: 'Amount',
              sortKey: 'amountUsd',
              align: 'text-right',
            },
            {
              label: 'Status',
              sortKey: 'transStatus',
              align: 'text-right',
            },
            {
              label: 'Comments',
              align: 'text-center flex justify-center',
            },
          ].filter(function (item) {
            return !!item;
          });
          var hasTransactions =
            (transactions === null || transactions === void 0 ? void 0 : transactions.length) > 0;
          if (!transactions.length)
            return /*#__PURE__*/ React.createElement(
              'div',
              {
                className: (0, clsx__WEBPACK_IMPORTED_MODULE_10__['default'])(
                  'bg-white py-2 px-4 text-base',
                  'flex items-center justify-between rounded-card',
                  className,
                ),
                style: {
                  filter:
                    'drop-shadow(0px 3px 5px rgba(9, 30, 66, 0.05)) drop-shadow(-1px 6px 8px rgba(6, 25, 56, 0.03))',
                },
              },
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: (0, clsx__WEBPACK_IMPORTED_MODULE_10__['default'])(
                    'flex items-center gap-2',
                    'font-semibold text-Gray-6 bg-white w-full py-2 px-4',
                  ),
                },
                /*#__PURE__*/ React.createElement(
                  _assets__WEBPACK_IMPORTED_MODULE_0__.LoopBoldIcon,
                  null,
                ),
                /*#__PURE__*/ React.createElement('span', null, 'No Transactions'),
              ),
              dateRange &&
                onDateRangeChange &&
                /*#__PURE__*/ React.createElement(
                  _team_DateRangeSelect__WEBPACK_IMPORTED_MODULE_9__.DateRangeSelect,
                  {
                    value: dateRange,
                    onChange: onDateRangeChange,
                  },
                ),
            );
          return /*#__PURE__*/ React.createElement(
            React.Fragment,
            null,
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: className,
                style: {
                  filter:
                    'drop-shadow(0px 3px 5px rgba(9, 30, 66, 0.05)) drop-shadow(-1px 6px 8px rgba(6, 25, 56, 0.03))',
                },
              },
              listOpen
                ? /*#__PURE__*/ React.createElement(
                    'div',
                    null,
                    /*#__PURE__*/ React.createElement(
                      _feed_LineItemDrawer__WEBPACK_IMPORTED_MODULE_6__.LineItemDrawer,
                      {
                        open: isLineItemDrawerOpen,
                        onClose: closeLineItemDrawer,
                        lineItem: selectedLineItem,
                        feedId: feedId,
                      },
                    ),
                    /*#__PURE__*/ React.createElement(
                      _common_components__WEBPACK_IMPORTED_MODULE_1__.Table.OverflowContainer,
                      {
                        style: {
                          filter: 'none',
                        },
                      },
                      /*#__PURE__*/ React.createElement(
                        _common_components__WEBPACK_IMPORTED_MODULE_1__.OverlayLoader,
                        {
                          loading: loading,
                        },
                        /*#__PURE__*/ React.createElement(
                          _common_components__WEBPACK_IMPORTED_MODULE_1__.Table,
                          {
                            className: 'rounded-card',
                            sort: sort,
                            onSortChange: function onSortChange(sort) {
                              return _onSortChange(sort);
                            },
                          },
                          /*#__PURE__*/ React.createElement(
                            _common_components__WEBPACK_IMPORTED_MODULE_1__.Table.Body,
                            null,
                            /*#__PURE__*/ React.createElement(
                              _common_components__WEBPACK_IMPORTED_MODULE_1__.Table.Row,
                              null,
                              /*#__PURE__*/ React.createElement(
                                _common_components__WEBPACK_IMPORTED_MODULE_1__.Table.Cell,
                                {
                                  colSpan: headers.length,
                                },
                                /*#__PURE__*/ React.createElement(
                                  'div',
                                  {
                                    className: (0, clsx__WEBPACK_IMPORTED_MODULE_10__['default'])(
                                      'bg-white py-2 px-4 text-base',
                                      'flex items-center justify-between',
                                    ),
                                  },
                                  /*#__PURE__*/ React.createElement(
                                    _common_components__WEBPACK_IMPORTED_MODULE_1__.Button,
                                    {
                                      className: (0, clsx__WEBPACK_IMPORTED_MODULE_10__['default'])(
                                        'flex items-center gap-2',
                                        'font-semibold text-Gray-3',
                                      ),
                                      onClick: function onClick() {
                                        return setListOpen(false);
                                      },
                                      disabled: disableTransactionButton,
                                    },
                                    /*#__PURE__*/ React.createElement(
                                      _assets__WEBPACK_IMPORTED_MODULE_0__.LoopBoldIcon,
                                      null,
                                    ),
                                    /*#__PURE__*/ React.createElement(
                                      'span',
                                      null,
                                      (_renderTitle =
                                        renderTitle === null || renderTitle === void 0
                                          ? void 0
                                          : renderTitle(true)) !== null && _renderTitle !== void 0
                                        ? _renderTitle
                                        : 'Hide Transactions',
                                    ),
                                  ),
                                  dateRange &&
                                    onDateRangeChange &&
                                    /*#__PURE__*/ React.createElement(
                                      _team_DateRangeSelect__WEBPACK_IMPORTED_MODULE_9__.DateRangeSelect,
                                      {
                                        value: dateRange,
                                        onChange: onDateRangeChange,
                                      },
                                    ),
                                ),
                              ),
                            ),
                            hasTransactions
                              ? /*#__PURE__*/ React.createElement(
                                  React.Fragment,
                                  null,
                                  /*#__PURE__*/ React.createElement(
                                    _common_components__WEBPACK_IMPORTED_MODULE_1__.Table.Row,
                                    null,
                                    headers.map(function (_ref2) {
                                      var label = _ref2.label,
                                        sortKey = _ref2.sortKey,
                                        align = _ref2.align;
                                      return /*#__PURE__*/ React.createElement(
                                        _common_components__WEBPACK_IMPORTED_MODULE_1__.Table
                                          .Header,
                                        {
                                          key: label,
                                          sortKey: sortKey,
                                          className: align,
                                        },
                                        label,
                                      );
                                    }),
                                  ),
                                  transactions.map(function (transaction) {
                                    var _transaction$departme,
                                      _transaction$departme2,
                                      _transaction$category,
                                      _transaction$category2,
                                      _transaction$vendor,
                                      _transaction$vendor2,
                                      _transaction$vendor$n,
                                      _transaction$vendor3,
                                      _transaction$vendor4,
                                      _transaction$transRec,
                                      _transaction$descript,
                                      _transaction$feedItem2,
                                      _transaction$feedItem3;
                                    return /*#__PURE__*/ React.createElement(
                                      _common_components__WEBPACK_IMPORTED_MODULE_1__.Table.Row,
                                      {
                                        key: transaction.id,
                                        className: (0,
                                        clsx__WEBPACK_IMPORTED_MODULE_10__['default'])(
                                          'relative cursor-pointer h-14',
                                          'list-row-hover',
                                        ),
                                      },
                                      /*#__PURE__*/ React.createElement(
                                        _common_components__WEBPACK_IMPORTED_MODULE_1__.Table.Cell,
                                        null,
                                        transaction.transDate &&
                                          _common_utils__WEBPACK_IMPORTED_MODULE_4__.DateUtils.format(
                                            transaction.transDate,
                                          ),
                                      ),
                                      showDepartment &&
                                        /*#__PURE__*/ React.createElement(
                                          _common_components__WEBPACK_IMPORTED_MODULE_1__.Table
                                            .Cell,
                                          {
                                            className: 'hover:bg-Gray-12 !p-0',
                                          },
                                          /*#__PURE__*/ React.createElement(
                                            'div',
                                            {
                                              className: 'py-2 px-4',
                                            },
                                            transaction.department
                                              ? /*#__PURE__*/ React.createElement(
                                                  react_router_dom__WEBPACK_IMPORTED_MODULE_12__.Link,
                                                  {
                                                    className: 'flex items-center gap-2',
                                                    to: '/departments/'.concat(
                                                      (_transaction$departme =
                                                        transaction.department) === null ||
                                                        _transaction$departme === void 0
                                                        ? void 0
                                                        : _transaction$departme.id,
                                                    ),
                                                  },
                                                  (_transaction$departme2 =
                                                    transaction.department) === null ||
                                                    _transaction$departme2 === void 0
                                                    ? void 0
                                                    : _transaction$departme2.name,
                                                )
                                              : '--',
                                          ),
                                        ),
                                      showCategory &&
                                        /*#__PURE__*/ React.createElement(
                                          _common_components__WEBPACK_IMPORTED_MODULE_1__.Table
                                            .Cell,
                                          {
                                            className: 'hover:bg-Gray-12 !p-0',
                                          },
                                          /*#__PURE__*/ React.createElement(
                                            'div',
                                            {
                                              className: 'py-2 px-4',
                                            },
                                            transaction.category
                                              ? /*#__PURE__*/ React.createElement(
                                                  react_router_dom__WEBPACK_IMPORTED_MODULE_12__.Link,
                                                  {
                                                    className: 'flex items-center gap-2',
                                                    to: '/categories/'.concat(
                                                      (_transaction$category =
                                                        transaction.category) === null ||
                                                        _transaction$category === void 0
                                                        ? void 0
                                                        : _transaction$category.id,
                                                    ),
                                                  },
                                                  (_transaction$category2 =
                                                    transaction.category) === null ||
                                                    _transaction$category2 === void 0
                                                    ? void 0
                                                    : _transaction$category2.name,
                                                )
                                              : '--',
                                          ),
                                        ),
                                      showVendor &&
                                        /*#__PURE__*/ React.createElement(
                                          _common_components__WEBPACK_IMPORTED_MODULE_1__.Table
                                            .Cell,
                                          {
                                            className: 'hover:bg-Gray-12 !p-0',
                                          },
                                          /*#__PURE__*/ React.createElement(
                                            'div',
                                            {
                                              className: 'py-2 px-4',
                                            },
                                            transaction.vendor
                                              ? /*#__PURE__*/ React.createElement(
                                                  react_router_dom__WEBPACK_IMPORTED_MODULE_12__.Link,
                                                  {
                                                    to: '/vendors/'.concat(
                                                      (_transaction$vendor = transaction.vendor) ===
                                                        null || _transaction$vendor === void 0
                                                        ? void 0
                                                        : _transaction$vendor.id,
                                                    ),
                                                    className: 'flex items-center gap-2',
                                                  },
                                                  /*#__PURE__*/ React.createElement(
                                                    _common_components__WEBPACK_IMPORTED_MODULE_1__.Avatar,
                                                    {
                                                      size: 'sm',
                                                      src:
                                                        (_transaction$vendor2 =
                                                          transaction.vendor) === null ||
                                                        _transaction$vendor2 === void 0
                                                          ? void 0
                                                          : _transaction$vendor2.avatar,
                                                      fullName:
                                                        (_transaction$vendor$n =
                                                          (_transaction$vendor3 =
                                                            transaction.vendor) === null ||
                                                          _transaction$vendor3 === void 0
                                                            ? void 0
                                                            : _transaction$vendor3.name) !== null &&
                                                        _transaction$vendor$n !== void 0
                                                          ? _transaction$vendor$n
                                                          : '',
                                                      className: 'w-6 h-6 flex-shrink-0',
                                                    },
                                                  ),
                                                  /*#__PURE__*/ React.createElement(
                                                    'div',
                                                    null,
                                                    /*#__PURE__*/ React.createElement(
                                                      'p',
                                                      null,
                                                      (_transaction$vendor4 =
                                                        transaction.vendor) === null ||
                                                        _transaction$vendor4 === void 0
                                                        ? void 0
                                                        : _transaction$vendor4.name,
                                                    ),
                                                    ((_transaction$transRec =
                                                      transaction.transRecordType) === null ||
                                                    _transaction$transRec === void 0
                                                      ? void 0
                                                      : _transaction$transRec.toLowerCase()) ===
                                                      'Expense Report'.toLowerCase() &&
                                                      /*#__PURE__*/ React.createElement(
                                                        'div',
                                                        {
                                                          className:
                                                            'flex flex-row items-center space-x-1',
                                                        },
                                                        /*#__PURE__*/ React.createElement(
                                                          'p',
                                                          {
                                                            className:
                                                              'text-Accent-2 text-xs font-normal',
                                                          },
                                                          'Expensed',
                                                        ),
                                                      ),
                                                  ),
                                                )
                                              : '--',
                                          ),
                                        ),
                                      /*#__PURE__*/ React.createElement(
                                        _common_components__WEBPACK_IMPORTED_MODULE_1__.Table.Cell,
                                        null,
                                        /*#__PURE__*/ React.createElement(
                                          _common_components__WEBPACK_IMPORTED_MODULE_1__.Button,
                                          {
                                            className: 'text-left',
                                            onClick: function onClick(e) {
                                              var _transaction$feedItem;
                                              e.stopPropagation();
                                              openLineItemDrawer(
                                                transaction,
                                                transaction === null || transaction === void 0
                                                  ? void 0
                                                  : (_transaction$feedItem =
                                                      transaction.feedItem) === null ||
                                                    _transaction$feedItem === void 0
                                                  ? void 0
                                                  : _transaction$feedItem.id,
                                              );
                                            },
                                          },
                                          ((_transaction$descript = transaction.description) !==
                                            null && _transaction$descript !== void 0
                                            ? _transaction$descript
                                            : ''
                                          ).length >= 93
                                            ? /*#__PURE__*/ React.createElement(
                                                _common_components__WEBPACK_IMPORTED_MODULE_1__.Tooltip,
                                                {
                                                  trigger: /*#__PURE__*/ React.createElement(
                                                    'div',
                                                    {
                                                      className:
                                                        'flex flex-col items-center max-w-[350px]',
                                                    },
                                                    /*#__PURE__*/ React.createElement(
                                                      'p',
                                                      {
                                                        className: 'line-clamp-3',
                                                      },
                                                      transaction.description,
                                                    ),
                                                  ),
                                                },
                                                transaction.description,
                                              )
                                            : /*#__PURE__*/ React.createElement(
                                                'p',
                                                null,
                                                transaction.description,
                                              ),
                                        ),
                                      ),
                                      /*#__PURE__*/ React.createElement(
                                        _common_components__WEBPACK_IMPORTED_MODULE_1__.Table.Cell,
                                        {
                                          className: 'text-right',
                                        },
                                        (0, _main_utils__WEBPACK_IMPORTED_MODULE_8__.decimalLogic)(
                                          transaction.amountUsd,
                                          '$',
                                        ),
                                      ),
                                      /*#__PURE__*/ React.createElement(
                                        _common_components__WEBPACK_IMPORTED_MODULE_1__.Table.Cell,
                                        null,
                                        /*#__PURE__*/ React.createElement(
                                          'div',
                                          {
                                            className: 'flex justify-end',
                                          },
                                          /*#__PURE__*/ React.createElement(
                                            _common_components__WEBPACK_IMPORTED_MODULE_1__.StatusTag,
                                            {
                                              colorScheme: getTransactionColorScheme(
                                                transaction.transStatus,
                                              ),
                                              className: 'font-semibold',
                                            },
                                            shouldTruncateTranStatus(transaction.transStatus)
                                              ? /*#__PURE__*/ React.createElement(
                                                  _common_components__WEBPACK_IMPORTED_MODULE_1__.Tooltip,
                                                  {
                                                    trigger: /*#__PURE__*/ React.createElement(
                                                      'p',
                                                      {
                                                        className: 'truncate w-8',
                                                      },
                                                      transaction.transStatus,
                                                    ),
                                                  },
                                                  transaction.transStatus,
                                                )
                                              : /*#__PURE__*/ React.createElement(
                                                  'p',
                                                  null,
                                                  transaction.transStatus,
                                                ),
                                          ),
                                        ),
                                      ),
                                      /*#__PURE__*/ React.createElement(
                                        _common_components__WEBPACK_IMPORTED_MODULE_1__.Table.Cell,
                                        null,
                                        /*#__PURE__*/ React.createElement(
                                          react_router_dom__WEBPACK_IMPORTED_MODULE_12__.Link,
                                          {
                                            to: '/feed/item/'.concat(
                                              (_transaction$feedItem2 = transaction.feedItem) ===
                                                null || _transaction$feedItem2 === void 0
                                                ? void 0
                                                : _transaction$feedItem2.id,
                                            ),
                                          },
                                          (_transaction$feedItem3 = transaction.feedItem) !==
                                            null &&
                                            _transaction$feedItem3 !== void 0 &&
                                            _transaction$feedItem3.comments.length
                                            ? /*#__PURE__*/ React.createElement(
                                                _feed_CommentGroup__WEBPACK_IMPORTED_MODULE_5__.CommentGroup,
                                                {
                                                  comments: transaction.feedItem.comments,
                                                },
                                              )
                                            : /*#__PURE__*/ React.createElement(
                                                'div',
                                                {
                                                  className: 'relative m-2',
                                                },
                                                /*#__PURE__*/ React.createElement(
                                                  _assets__WEBPACK_IMPORTED_MODULE_0__.CommentIcon,
                                                  {
                                                    className: 'text-Gray-7 h-7 w-6',
                                                  },
                                                ),
                                                /*#__PURE__*/ React.createElement(
                                                  'div',
                                                  {
                                                    className:
                                                      'absolute bottom-[43%] left-3 transform -translate-x-1/2 text-Gray-2',
                                                  },
                                                  /*#__PURE__*/ React.createElement(
                                                    _assets__WEBPACK_IMPORTED_MODULE_0__.AddSmallSlimIcon,
                                                    null,
                                                  ),
                                                ),
                                              ),
                                        ),
                                      ),
                                    );
                                  }),
                                  /*#__PURE__*/ React.createElement(
                                    _common_components__WEBPACK_IMPORTED_MODULE_1__.Table.Row,
                                    null,
                                    /*#__PURE__*/ React.createElement(
                                      _common_components__WEBPACK_IMPORTED_MODULE_1__.Table.Cell,
                                      {
                                        colSpan: headers.length,
                                      },
                                      hasTransactions &&
                                        onPageChange &&
                                        !!totalCount &&
                                        /*#__PURE__*/ React.createElement(
                                          _common_components__WEBPACK_IMPORTED_MODULE_1__.Pagination,
                                          {
                                            totalRecord: totalCount,
                                            sideItemsCount: 2,
                                            onChange: function onChange(page) {
                                              return onPageChange(page);
                                            },
                                            perPage:
                                              _common_constants__WEBPACK_IMPORTED_MODULE_3__.DEFAULT_ITEMS_PER_INFINITE_LOAD,
                                            page: page,
                                          },
                                          /*#__PURE__*/ React.createElement(
                                            'div',
                                            {
                                              className:
                                                'flex items-center justify-between mt-4 px-4',
                                            },
                                            /*#__PURE__*/ React.createElement(
                                              _common_components__WEBPACK_IMPORTED_MODULE_1__
                                                .Pagination.ShowingRange,
                                              {
                                                className: 'hidden md:block',
                                              },
                                            ),
                                            /*#__PURE__*/ React.createElement(
                                              _common_components__WEBPACK_IMPORTED_MODULE_1__
                                                .Pagination.Items,
                                              {
                                                className: 'mx-auto md:mx-0',
                                              },
                                            ),
                                          ),
                                        ),
                                    ),
                                  ),
                                )
                              : /*#__PURE__*/ React.createElement(
                                  _common_components__WEBPACK_IMPORTED_MODULE_1__.Table.Row,
                                  null,
                                  /*#__PURE__*/ React.createElement(
                                    _common_components__WEBPACK_IMPORTED_MODULE_1__.Table.Cell,
                                    {
                                      colSpan: 7,
                                    },
                                    /*#__PURE__*/ React.createElement(
                                      'div',
                                      {
                                        className: 'flex flex-1 py-4 px-2 w-full',
                                      },
                                      /*#__PURE__*/ React.createElement(
                                        _common_components_EmptyState__WEBPACK_IMPORTED_MODULE_2__.EmptyState,
                                        {
                                          title: 'No recent transactions',
                                          content: 'This will change as more transactions come in.',
                                        },
                                      ),
                                    ),
                                  ),
                                ),
                          ),
                        ),
                      ),
                    ),
                  )
                : /*#__PURE__*/ React.createElement(
                    React.Fragment,
                    null,
                    /*#__PURE__*/ React.createElement(
                      'div',
                      {
                        className: (0, clsx__WEBPACK_IMPORTED_MODULE_10__['default'])(
                          'bg-white py-2 pl-4 pr-8 text-base',
                          'flex items-center justify-between rounded-card',
                        ),
                      },
                      /*#__PURE__*/ React.createElement(
                        _common_components__WEBPACK_IMPORTED_MODULE_1__.Button,
                        {
                          className: (0, clsx__WEBPACK_IMPORTED_MODULE_10__['default'])(
                            'flex items-center gap-2',
                            'font-semibold text-Gray-3 bg-white w-full py-3 px-4',
                          ),
                          onClick: function onClick() {
                            return setListOpen(true);
                          },
                        },
                        /*#__PURE__*/ React.createElement(
                          _assets__WEBPACK_IMPORTED_MODULE_0__.LoopBoldIcon,
                          null,
                        ),
                        /*#__PURE__*/ React.createElement(
                          'span',
                          null,
                          (_renderTitle2 =
                            renderTitle === null || renderTitle === void 0
                              ? void 0
                              : renderTitle(false)) !== null && _renderTitle2 !== void 0
                            ? _renderTitle2
                            : 'View Transactions',
                        ),
                      ),
                      dateRange &&
                        onDateRangeChange &&
                        /*#__PURE__*/ React.createElement(
                          _team_DateRangeSelect__WEBPACK_IMPORTED_MODULE_9__.DateRangeSelect,
                          {
                            value: dateRange,
                            onChange: onDateRangeChange,
                          },
                        ),
                    ),
                  ),
            ),
          );
        };

        /***/
      },
  },
]);
//# sourceMappingURL=src_team_constants_ts-src_transactions_TransactionList_index_tsx.bundle.js.map
