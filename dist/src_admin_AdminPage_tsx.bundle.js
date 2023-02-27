'use strict';
(self['webpackChunkgravity_web'] = self['webpackChunkgravity_web'] || []).push([
  ['src_admin_AdminPage_tsx'],
  {
    /***/ './src/admin/AdminPage.tsx':
      /*!*********************************!*\
  !*** ./src/admin/AdminPage.tsx ***!
  \*********************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ AdminPage: function () {
            return /* binding */ AdminPage;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_headless__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/headless */ './src/common/headless/index.ts');
        /* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/common/utils */ './src/common/utils/index.ts',
        );
        /* harmony import */ var _layout_NavBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @/layout/NavBar */ './src/layout/NavBar.tsx',
        );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! react-router-dom */ './node_modules/react-router/esm/react-router.js',
          );
        /* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(
            /*! react-router-dom */ './node_modules/react-router-dom/esm/react-router-dom.js',
          );
        /* harmony import */ var _RolesTabContent__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(/*! ./RolesTabContent */ './src/admin/RolesTabContent.tsx');
        /* harmony import */ var _TeamMembersTabContent__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! ./TeamMembersTabContent */ './src/admin/TeamMembersTabContent.tsx',
          );

        var navigatorItems = [
          {
            to: '/admin/roles',
            label: 'Roles',
            value: 'roles',
            content: /*#__PURE__*/ React.createElement(
              _RolesTabContent__WEBPACK_IMPORTED_MODULE_4__.RolesTabContent,
              null,
            ),
          },
          {
            to: '/admin/team-members',
            label: 'Team Members',
            value: 'team-members',
            content: /*#__PURE__*/ React.createElement(
              _TeamMembersTabContent__WEBPACK_IMPORTED_MODULE_5__.TeamMembersTabContent,
              null,
            ),
          },
        ];
        var AdminPage = function AdminPage() {
          var params = (0, react_router_dom__WEBPACK_IMPORTED_MODULE_6__.useParams)();
          var tab = params.tab;
          return /*#__PURE__*/ React.createElement(
            'div',
            {
              className: (0, clsx__WEBPACK_IMPORTED_MODULE_3__['default'])(
                _common_utils__WEBPACK_IMPORTED_MODULE_1__.StringUtils.withProjectClassNamePrefix(
                  'admin-layout',
                ),
                'bg-white',
              ),
            },
            /*#__PURE__*/ React.createElement(_layout_NavBar__WEBPACK_IMPORTED_MODULE_2__.NavBar, {
              mainLayout: false,
            }),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: (0, clsx__WEBPACK_IMPORTED_MODULE_3__['default'])(
                  'flex pt-[70px] min-h-screen mx-auto md:max-w-[1280px] md:pt-[156px] px-2 gap-10',
                ),
              },
              /*#__PURE__*/ React.createElement(
                _common_headless__WEBPACK_IMPORTED_MODULE_0__.Tabs,
                {
                  value: tab,
                },
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'flex flex-col gap-1 w-[250px]',
                  },
                  navigatorItems.map(function (_ref) {
                    var to = _ref.to,
                      label = _ref.label,
                      value = _ref.value,
                      content = _ref.content;
                    return /*#__PURE__*/ React.createElement(
                      _common_headless__WEBPACK_IMPORTED_MODULE_0__.Tab,
                      {
                        key: to,
                        value: value,
                        content: /*#__PURE__*/ React.createElement(
                          'div',
                          {
                            className: 'pb-10 w-full',
                          },
                          content,
                        ),
                      },
                      function (_ref2) {
                        var isActive = _ref2.isActive;
                        return /*#__PURE__*/ React.createElement(
                          react_router_dom__WEBPACK_IMPORTED_MODULE_7__.Link,
                          {
                            to: to,
                            className: (0, clsx__WEBPACK_IMPORTED_MODULE_3__['default'])(
                              'font-medium hover:bg-Gray-12 py-1 px-5 rounded-sm',
                              {
                                'bg-Gray-12 font-bold': isActive,
                              },
                            ),
                          },
                          label,
                        );
                      },
                    );
                  }),
                ),
                /*#__PURE__*/ React.createElement(
                  _common_headless__WEBPACK_IMPORTED_MODULE_0__.TabContent,
                  null,
                ),
              ),
            ),
          );
        };

        /***/
      },

    /***/ './src/admin/RemoveRoleModal.tsx':
      /*!***************************************!*\
  !*** ./src/admin/RemoveRoleModal.tsx ***!
  \***************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ RemoveRoleModal: function () {
            return /* binding */ RemoveRoleModal;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _role_useRole__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/role/useRole */ './src/role/useRole.ts',
        );

        var RemoveRoleModal = function RemoveRoleModal(_ref) {
          var open = _ref.open,
            onClose = _ref.onClose,
            onConfirm = _ref.onConfirm,
            roleId = _ref.roleId;
          var _useRole = (0, _role_useRole__WEBPACK_IMPORTED_MODULE_1__.useRole)(roleId),
            role = _useRole.role;
          if (!role) return null;
          var name = role.name;
          return /*#__PURE__*/ React.createElement(
            _common_components__WEBPACK_IMPORTED_MODULE_0__.ConfirmModal,
            {
              open: open,
              onClose: onClose,
              onCancel: onClose,
              onConfirm: onConfirm,
              title: 'Remove this role for '.concat(name, '?'),
              content:
                'This will affect their view access and will prevent them from seeing some transactions.',
              confirmButtonLabel: 'Remove',
            },
          );
        };

        /***/
      },

    /***/ './src/admin/RoleCard.tsx':
      /*!********************************!*\
  !*** ./src/admin/RoleCard.tsx ***!
  \********************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ RoleCard: function () {
            return /* binding */ RoleCard;
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
        /* harmony import */ var _role_apis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @/role/apis */ './src/role/apis.ts',
        );
        /* harmony import */ var _role_useRoles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @/role/useRoles */ './src/role/useRoles.ts',
        );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
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

        var RoleCard = function RoleCard(_ref) {
          var _ref$role = _ref.role,
            id = _ref$role.id,
            name = _ref$role.name,
            description = _ref$role.description,
            onClick = _ref.onClick,
            deletable = _ref.deletable;
          var _useRoles = (0, _role_useRoles__WEBPACK_IMPORTED_MODULE_4__.useRoles)(),
            mutateRoles = _useRoles.mutateRoles;
          var _useHandler = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_2__.useHandler)(
              function () {
                return _role_apis__WEBPACK_IMPORTED_MODULE_3__.RoleApis['delete'](id);
              },
              {
                onSuccess: function onSuccess() {
                  return mutateRoles();
                },
              },
            ),
            deleteRole = _useHandler.handle,
            isDeleting = _useHandler.isLoading;
          var confirmModalDisclosure = (0,
          _common_hooks__WEBPACK_IMPORTED_MODULE_2__.useDisclosure)();
          return /*#__PURE__*/ React.createElement(
            React.Fragment,
            null,
            /*#__PURE__*/ React.createElement(
              _common_components__WEBPACK_IMPORTED_MODULE_1__.ConfirmModal,
              {
                open: confirmModalDisclosure.isOpen,
                onConfirm: /*#__PURE__*/ _asyncToGenerator(
                  /*#__PURE__*/ _regeneratorRuntime().mark(function _callee() {
                    return _regeneratorRuntime().wrap(function _callee$(_context) {
                      while (1)
                        switch ((_context.prev = _context.next)) {
                          case 0:
                            _context.next = 2;
                            return deleteRole();
                          case 2:
                            confirmModalDisclosure.close();
                          case 3:
                          case 'end':
                            return _context.stop();
                        }
                    }, _callee);
                  }),
                ),
                onCancel: confirmModalDisclosure.close,
                onClose: confirmModalDisclosure.close,
                title: 'Delete this role?',
                content:
                  'You are permanently deleting this role. Any team members currently using this role will be affected.',
                variant: 'alert',
              },
            ),
            /*#__PURE__*/ React.createElement(
              _common_components__WEBPACK_IMPORTED_MODULE_1__.Button,
              {
                onClick: onClick,
                className: (0, clsx__WEBPACK_IMPORTED_MODULE_5__['default'])(
                  'flex items-center justify-between',
                  'bg-white border border-solid border-Gray-11 hover:border-Gray-3 rounded-[10px] py-6 pr-6 pl-[26px] text-left shadow-card',
                ),
              },
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'space-y-2',
                },
                /*#__PURE__*/ React.createElement(
                  'p',
                  {
                    className: 'text-sm leading-4 font-semibold tracking-tight text-Gray-3',
                  },
                  name,
                ),
                /*#__PURE__*/ React.createElement(
                  'p',
                  {
                    className: 'text-sm leading-4 font-normal text-Gray-6',
                  },
                  description,
                ),
              ),
              deletable &&
                (isDeleting
                  ? /*#__PURE__*/ React.createElement(
                      _common_components__WEBPACK_IMPORTED_MODULE_1__.Spinner,
                      {
                        className: '!w-4 !h-4',
                      },
                    )
                  : /*#__PURE__*/ React.createElement(_assets__WEBPACK_IMPORTED_MODULE_0__.XIcon, {
                      className: 'w-4 h-4',
                      onClick: function onClick(e) {
                        e.stopPropagation();
                        confirmModalDisclosure.open();
                      },
                    })),
            ),
          );
        };

        /***/
      },

    /***/ './src/admin/RoleDrawer/AccessControlTabs.tsx':
      /*!****************************************************!*\
  !*** ./src/admin/RoleDrawer/AccessControlTabs.tsx ***!
  \****************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ AccessControlTabs: function () {
            return /* binding */ AccessControlTabs;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _common_headless__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! @/common/headless */ './src/common/headless/index.ts');
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var _CategoriesTab__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! ./CategoriesTab */ './src/admin/RoleDrawer/CategoriesTab.tsx',
        );
        /* harmony import */ var _MembersTab__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! ./MembersTab */ './src/admin/RoleDrawer/MembersTab.tsx',
        );
        /* harmony import */ var _SearchInput__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! ./SearchInput */ './src/admin/RoleDrawer/SearchInput.tsx',
        );
        /* harmony import */ var _DepartmentsTab__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! ./DepartmentsTab */ './src/admin/RoleDrawer/DepartmentsTab.tsx',
        );
        /* harmony import */ var _VendorsTab__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          /*! ./VendorsTab */ './src/admin/RoleDrawer/VendorsTab.tsx',
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

        var AccessControlTabs = function AccessControlTabs(_ref) {
          var isBase = _ref.isBase,
            isUpdate = _ref.isUpdate,
            isCreate = _ref.isCreate,
            tab = _ref.tab,
            onTabChange = _ref.onTabChange;
          var _React$useState = react__WEBPACK_IMPORTED_MODULE_3__.useState(''),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            keyword = _React$useState2[0],
            setKeyWord = _React$useState2[1];
          var tabs = [
            {
              content: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                _DepartmentsTab__WEBPACK_IMPORTED_MODULE_7__.DepartmentsTab,
                {
                  keyWord: keyword,
                },
              ),
              value: 'teams',
              label: 'Teams',
            },
            {
              content: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                _CategoriesTab__WEBPACK_IMPORTED_MODULE_4__.CategoriesTab,
                {
                  keyWord: keyword,
                },
              ),
              value: 'categories',
              label: 'Categories',
            },
            {
              content: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                _VendorsTab__WEBPACK_IMPORTED_MODULE_8__.VendorsTab,
                {
                  keyWord: keyword,
                },
              ),
              value: 'vendors',
              label: 'Vendors',
            },
            {
              content: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                _MembersTab__WEBPACK_IMPORTED_MODULE_5__.MembersTab,
                {
                  keyWord: keyword,
                  isBase: isBase,
                  isUpdate: isUpdate,
                  isCreate: isCreate,
                },
              ),
              value: 'members',
              label: 'Members',
            },
          ];
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
            _common_headless__WEBPACK_IMPORTED_MODULE_1__.Tabs,
            {
              value: tab,
              onChange: onTabChange,
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
              'div',
              {
                className: 'flex justify-between items-center border-b border-Gray-11 gap-10 mt-4',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                'div',
                {
                  className: 'flex gap-8',
                },
                tabs.map(function (_ref2) {
                  var content = _ref2.content,
                    label = _ref2.label,
                    value = _ref2.value;
                  return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                    _common_headless__WEBPACK_IMPORTED_MODULE_1__.Tab,
                    {
                      key: value,
                      content: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                        'div',
                        {
                          className: (0, clsx__WEBPACK_IMPORTED_MODULE_2__['default'])(
                            'flex-1 py-4',
                            {
                              'overflow-auto': value !== 'members',
                              'overflow-hidden': value === 'members',
                            },
                          ),
                        },
                        content,
                      ),
                      value: value,
                    },
                    function (_ref3) {
                      var isActive = _ref3.isActive,
                        onClick = _ref3.onClick;
                      return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                        _common_components__WEBPACK_IMPORTED_MODULE_0__.Button,
                        {
                          onClick: onClick,
                          className: (0, clsx__WEBPACK_IMPORTED_MODULE_2__['default'])(
                            'text-sm py-4 border-b-4 border-transparent',
                            {
                              'font-semibold border-solid border-Gray-3': isActive,
                            },
                          ),
                        },
                        label,
                      );
                    },
                  );
                }),
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                _SearchInput__WEBPACK_IMPORTED_MODULE_6__.SearchInput,
                {
                  onChange: function onChange(e) {
                    return setKeyWord(e.target.value);
                  },
                  placeholder: tab !== 'members' ? 'Search list here' : 'Search by name or team',
                },
              ),
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
              _common_headless__WEBPACK_IMPORTED_MODULE_1__.TabContent,
              null,
            ),
          );
        };

        /***/
      },

    /***/ './src/admin/RoleDrawer/CategoriesTab.tsx':
      /*!************************************************!*\
  !*** ./src/admin/RoleDrawer/CategoriesTab.tsx ***!
  \************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ CategoriesTab: function () {
            return /* binding */ CategoriesTab;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _common_components_ResettableCheckbox__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! @/common/components/ResettableCheckbox */ './src/common/components/ResettableCheckbox/index.ts',
          );
        /* harmony import */ var _common_headless__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! @/common/headless */ './src/common/headless/index.ts');
        /* harmony import */ var _role_useAssignableCategories__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! @/role/useAssignableCategories */ './src/role/useAssignableCategories.ts',
          );
        /* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! lodash-es */ './node_modules/lodash-es/groupBy.js',
        );
        /* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
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

        var CategoriesTab = function CategoriesTab(_ref) {
          var keyWord = _ref.keyWord;
          var _useAssignableCategor = (0,
            _role_useAssignableCategories__WEBPACK_IMPORTED_MODULE_3__.useAssignableCategories)(),
            isInitializingAssignableCategories =
              _useAssignableCategor.isInitializingAssignableCategories;
          var _useFormContext = (0, react_hook_form__WEBPACK_IMPORTED_MODULE_4__.useFormContext)(),
            getValues = _useFormContext.getValues;
          var _getValues = getValues(),
            _getValues$categories = _getValues.categories,
            categories = _getValues$categories === void 0 ? [] : _getValues$categories;
          var filteredCategories = categories.filter(function (item) {
            return item.name.toLowerCase().includes(keyWord.toLowerCase());
          });
          var categoriesGroupedByAlphabet = (0, lodash_es__WEBPACK_IMPORTED_MODULE_5__['default'])(
            filteredCategories,
            function (_ref2) {
              var name = _ref2.name;
              return /[0-9]/.test(name[0]) ? '#' : name[0];
            },
          );
          var categoriesGroupedById = (0, lodash_es__WEBPACK_IMPORTED_MODULE_5__['default'])(
            filteredCategories,
            'id',
          );
          return /*#__PURE__*/ React.createElement(
            _common_components__WEBPACK_IMPORTED_MODULE_0__.ListLoader,
            {
              loading: isInitializingAssignableCategories,
            },
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'space-y-8',
              },
              Object.entries(categoriesGroupedByAlphabet).map(function (_ref3) {
                var _ref4 = _slicedToArray(_ref3, 2),
                  character = _ref4[0],
                  category = _ref4[1];
                return /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    key: character,
                  },
                  /*#__PURE__*/ React.createElement(
                    'h3',
                    {
                      className: 'font-semibold text-sm',
                    },
                    character,
                  ),
                  /*#__PURE__*/ React.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_0__.Divider,
                    {
                      className: 'my-2',
                    },
                  ),
                  /*#__PURE__*/ React.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_0__.Form.HeadlessCheckboxGroup,
                    {
                      name: 'categories',
                      valueAs: function valueAs(value) {
                        return value
                          .filter(function (_ref5) {
                            var visible = _ref5.visible;
                            return visible;
                          })
                          .map(function (_ref6) {
                            var id = _ref6.id;
                            return id.toString();
                          });
                      },
                      changeAs: function changeAs(value) {
                        return categories.map(function (category) {
                          return _objectSpread(
                            _objectSpread({}, category),
                            {},
                            {
                              visible: value.includes(category.id.toString()) ? true : false,
                            },
                          );
                        });
                      },
                    },
                    /*#__PURE__*/ React.createElement(
                      'div',
                      {
                        className: 'grid grid-cols-2 gap-2 text-Gray-3',
                      },
                      category.map(function (_ref7) {
                        var id = _ref7.id,
                          name = _ref7.name;
                        return /*#__PURE__*/ React.createElement(
                          _common_headless__WEBPACK_IMPORTED_MODULE_2__.CheckboxGroupOption,
                          {
                            value: id.toString(),
                            key: id,
                          },
                          function (_ref8) {
                            var _categoriesGroupedByI;
                            var handleChange = _ref8.handleChange,
                              isChecked = _ref8.isChecked,
                              value = _ref8.value;
                            return /*#__PURE__*/ React.createElement(
                              _common_components_ResettableCheckbox__WEBPACK_IMPORTED_MODULE_1__.ResettableCheckbox,
                              {
                                onChange: handleChange,
                                checked: isChecked,
                                value: value,
                                label: name,
                                resettable:
                                  isChecked !==
                                  ((_categoriesGroupedByI = categoriesGroupedById[id]) === null ||
                                  _categoriesGroupedByI === void 0
                                    ? void 0
                                    : _categoriesGroupedByI[0].default),
                              },
                            );
                          },
                        );
                      }),
                    ),
                  ),
                );
              }),
            ),
          );
        };

        /***/
      },

    /***/ './src/admin/RoleDrawer/DepartmentsTab.tsx':
      /*!*************************************************!*\
  !*** ./src/admin/RoleDrawer/DepartmentsTab.tsx ***!
  \*************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ DepartmentsTab: function () {
            return /* binding */ DepartmentsTab;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _common_components_ResettableCheckbox__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! @/common/components/ResettableCheckbox */ './src/common/components/ResettableCheckbox/index.ts',
          );
        /* harmony import */ var _common_headless__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! @/common/headless */ './src/common/headless/index.ts');
        /* harmony import */ var _role_useAssignableDepartments__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! @/role/useAssignableDepartments */ './src/role/useAssignableDepartments.ts',
          );
        /* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! lodash-es */ './node_modules/lodash-es/groupBy.js',
        );
        /* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
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

        var DepartmentsTab = function DepartmentsTab(_ref) {
          var _ref2;
          var keyWord = _ref.keyWord;
          var _useAssignableDepartm = (0,
            _role_useAssignableDepartments__WEBPACK_IMPORTED_MODULE_3__.useAssignableDepartments)(),
            assignableDepartments = _useAssignableDepartm.assignableDepartments,
            isValidatingAssignableDepartments =
              _useAssignableDepartm.isValidatingAssignableDepartments;
          var _useFormContext = (0, react_hook_form__WEBPACK_IMPORTED_MODULE_4__.useFormContext)(),
            getValues = _useFormContext.getValues,
            setValue = _useFormContext.setValue,
            watch = _useFormContext.watch;
          var departments =
            (_ref2 = watch('departments')) !== null && _ref2 !== void 0 ? _ref2 : [];
          var departmentsGroupedById = (0, lodash_es__WEBPACK_IMPORTED_MODULE_5__['default'])(
            departments,
            'id',
          );
          var getChildrenIds = function getChildrenIds(id) {
            var _departmentsGroupedBy, _departmentsGroupedBy2, _departmentsGroupedBy3;
            return (_departmentsGroupedBy =
              (_departmentsGroupedBy2 = departmentsGroupedById[id]) === null ||
              _departmentsGroupedBy2 === void 0
                ? void 0
                : (_departmentsGroupedBy3 = _departmentsGroupedBy2[0].children) === null ||
                  _departmentsGroupedBy3 === void 0
                ? void 0
                : _departmentsGroupedBy3.map(function (_ref3) {
                    var id = _ref3.id;
                    return id;
                  })) !== null && _departmentsGroupedBy !== void 0
              ? _departmentsGroupedBy
              : [];
          };
          var getValueByRootDepartment = function getValueByRootDepartment(id, value) {
            return value
              .filter(function (item) {
                return item.visible && getChildrenIds(id).includes(item.id);
              })
              .map(function (_ref4) {
                var id = _ref4.id;
                return id.toString();
              });
          };
          var setRootDepartmentVisible = function setRootDepartmentVisible(id, checked) {
            var _ref5, _departmentsGroupedBy4;
            var departments =
              (_ref5 = getValues('departments')) !== null && _ref5 !== void 0 ? _ref5 : [];
            var departmentsGroupedById = (0, lodash_es__WEBPACK_IMPORTED_MODULE_5__['default'])(
              departments,
              'id',
            );
            var departmentAndChildren = [
              departmentsGroupedById[id][0],
              (_departmentsGroupedBy4 = departmentsGroupedById[id][0].children) !== null &&
              _departmentsGroupedBy4 !== void 0
                ? _departmentsGroupedBy4
                : [],
            ].flat();
            var departmentAndChildrenIds = departmentAndChildren.map(function (_ref6) {
              var id = _ref6.id;
              return id;
            });
            setValue(
              'departments',
              [].concat(
                _toConsumableArray(
                  departments.filter(function (department) {
                    return !departmentAndChildrenIds.includes(department.id);
                  }),
                ),
                _toConsumableArray(
                  departmentAndChildrenIds.map(function (id) {
                    return _objectSpread(
                      _objectSpread({}, departmentsGroupedById[id][0]),
                      {},
                      {
                        visible: checked,
                      },
                    );
                  }),
                ),
              ),
              {
                shouldDirty: true,
              },
            );
          };
          var hasKeyword = function hasKeyword(department) {
            return department.name
              .toLowerCase()
              .includes(keyWord === null || keyWord === void 0 ? void 0 : keyWord.toLowerCase());
          };
          return /*#__PURE__*/ React.createElement(
            _common_components__WEBPACK_IMPORTED_MODULE_0__.ListLoader,
            {
              loading: isValidatingAssignableDepartments,
            },
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'flex flex-col gap-8 text-Gray-3',
              },
              assignableDepartments
                .filter(function (department) {
                  var _department$children;
                  return (
                    hasKeyword(department) ||
                    ((_department$children = department.children) === null ||
                    _department$children === void 0
                      ? void 0
                      : _department$children.find(hasKeyword))
                  );
                })
                .map(function (_ref7) {
                  var _departmentsGroupedBy6, _departmentsGroupedBy7, _departmentsGroupedBy8;
                  var id = _ref7.id,
                    name = _ref7.name,
                    children = _ref7.children;
                  return /*#__PURE__*/ React.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_0__.Form.HeadlessCheckboxGroup,
                    {
                      key: id,
                      name: 'departments',
                      valueAs: function valueAs(value) {
                        return getValueByRootDepartment(id, value);
                      },
                      changeAs: function changeAs(value) {
                        return [].concat(
                          _toConsumableArray(
                            departments.filter(function (department) {
                              return !getChildrenIds(id).includes(department.id);
                            }),
                          ),
                          _toConsumableArray(
                            getChildrenIds(id).map(function (id) {
                              var _departmentsGroupedBy5;
                              return _objectSpread(
                                _objectSpread(
                                  {},
                                  (_departmentsGroupedBy5 = departmentsGroupedById[id]) === null ||
                                    _departmentsGroupedBy5 === void 0
                                    ? void 0
                                    : _departmentsGroupedBy5[0],
                                ),
                                {},
                                {
                                  visible: value.includes(id.toString()) ? true : false,
                                },
                              );
                            }),
                          ),
                        );
                      },
                    },
                    /*#__PURE__*/ React.createElement(
                      'div',
                      null,
                      /*#__PURE__*/ React.createElement(
                        _common_components_ResettableCheckbox__WEBPACK_IMPORTED_MODULE_1__.ResettableCheckbox,
                        {
                          className: 'font-semibold',
                          resettable:
                            ((_departmentsGroupedBy6 = departmentsGroupedById[id]) === null ||
                            _departmentsGroupedBy6 === void 0
                              ? void 0
                              : _departmentsGroupedBy6[0].visible) !==
                            ((_departmentsGroupedBy7 = departmentsGroupedById[id]) === null ||
                            _departmentsGroupedBy7 === void 0
                              ? void 0
                              : _departmentsGroupedBy7[0].default),
                          label: name,
                          onChange: function onChange(e) {
                            return setRootDepartmentVisible(id, e.target.checked);
                          },
                          checked:
                            (_departmentsGroupedBy8 = departmentsGroupedById[id]) === null ||
                            _departmentsGroupedBy8 === void 0
                              ? void 0
                              : _departmentsGroupedBy8[0].visible,
                          value: id.toString(),
                        },
                      ),
                      /*#__PURE__*/ React.createElement(
                        _common_components__WEBPACK_IMPORTED_MODULE_0__.Divider,
                        {
                          className: 'my-2',
                        },
                      ),
                      /*#__PURE__*/ React.createElement(
                        'div',
                        {
                          className: 'flex flex-col gap-2 pl-7',
                        },
                        children === null || children === void 0
                          ? void 0
                          : children.filter(hasKeyword).map(function (_ref8) {
                              var id = _ref8.id,
                                name = _ref8.name;
                              return /*#__PURE__*/ React.createElement(
                                _common_headless__WEBPACK_IMPORTED_MODULE_2__.CheckboxGroupOption,
                                {
                                  key: id,
                                  value: id.toString(),
                                },
                                function (_ref9) {
                                  var _departmentsGroupedBy9;
                                  var handleChange = _ref9.handleChange,
                                    isChecked = _ref9.isChecked,
                                    value = _ref9.value;
                                  return /*#__PURE__*/ React.createElement(
                                    _common_components_ResettableCheckbox__WEBPACK_IMPORTED_MODULE_1__.ResettableCheckbox,
                                    {
                                      resettable:
                                        isChecked !==
                                        ((_departmentsGroupedBy9 = departmentsGroupedById[id]) ===
                                          null || _departmentsGroupedBy9 === void 0
                                          ? void 0
                                          : _departmentsGroupedBy9[0].default),
                                      label: name,
                                      onChange: handleChange,
                                      checked: isChecked,
                                      value: value,
                                    },
                                  );
                                },
                              );
                            }),
                      ),
                    ),
                  );
                }),
            ),
          );
        };

        /***/
      },

    /***/ './src/admin/RoleDrawer/MembersTab.tsx':
      /*!*********************************************!*\
  !*** ./src/admin/RoleDrawer/MembersTab.tsx ***!
  \*********************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ MembersTab: function () {
            return /* binding */ MembersTab;
          },
          /* harmony export */
        });
        /* harmony import */ var _MembersTable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! ./MembersTable */ './src/admin/RoleDrawer/MembersTable.tsx',
        );

        var MembersTab = function MembersTab(_ref) {
          var keyWord = _ref.keyWord,
            isBase = _ref.isBase,
            isUpdate = _ref.isUpdate,
            isCreate = _ref.isCreate;
          return /*#__PURE__*/ React.createElement(
            _MembersTable__WEBPACK_IMPORTED_MODULE_0__.MembersTable,
            {
              keyWord: keyWord,
              isBase: isBase,
              isUpdate: isUpdate,
              isCreate: isCreate,
            },
          );
        };

        /***/
      },

    /***/ './src/admin/RoleDrawer/MembersTable.tsx':
      /*!***********************************************!*\
  !*** ./src/admin/RoleDrawer/MembersTable.tsx ***!
  \***********************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ MembersTable: function () {
            return /* binding */ MembersTable;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _common_headless__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! @/common/headless */ './src/common/headless/index.ts');
        /* harmony import */ var _profile_useUsers__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! @/profile/useUsers */ './src/profile/useUsers.ts');
        /* harmony import */ var _role_useRole__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @/role/useRole */ './src/role/useRole.ts',
        );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! react-hook-form */ './node_modules/react-hook-form/dist/index.esm.mjs',
        );
        /* harmony import */ var _MembersTableRow__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! ./MembersTableRow */ './src/admin/RoleDrawer/MembersTableRow.tsx',
          );

        var headers = [
          {
            label: '',
          },
          {
            label: 'Name',
          },
          {
            label: 'Title',
          },
          {
            label: 'Team',
          },
          {
            label: 'Role',
          },
        ].filter(function (item) {
          return !!item;
        });
        var MembersTable = function MembersTable(_ref) {
          var className = _ref.className,
            keyWord = _ref.keyWord,
            isBase = _ref.isBase,
            isUpdate = _ref.isUpdate,
            isCreate = _ref.isCreate;
          var _useUsers = (0, _profile_useUsers__WEBPACK_IMPORTED_MODULE_2__.useUsers)(),
            users = _useUsers.users,
            isInitializingUsers = _useUsers.isInitializingUsers;
          var _useFormContext = (0, react_hook_form__WEBPACK_IMPORTED_MODULE_6__.useFormContext)(),
            getValues = _useFormContext.getValues;
          var role = getValues();
          var _useRole = (0, _role_useRole__WEBPACK_IMPORTED_MODULE_3__.useRole)(role.id),
            originalRole = _useRole.role;
          if (!originalRole) return null;
          var memberIds = originalRole.memberIds;
          var renderDataRow = function renderDataRow(_ref2, _onClick) {
            var id = _ref2.id,
              fullName = _ref2.fullName,
              email = _ref2.email,
              title = _ref2.title,
              department = _ref2.department,
              roles = _ref2.roles;
            return /*#__PURE__*/ React.createElement(
              _common_headless__WEBPACK_IMPORTED_MODULE_1__.CheckboxGroupOption,
              {
                key: id,
                value: id.toString(),
              },
              function (_ref3) {
                var value = _ref3.value,
                  isChecked = _ref3.isChecked;
                return /*#__PURE__*/ React.createElement(
                  _MembersTableRow__WEBPACK_IMPORTED_MODULE_5__.MembersTableRow,
                  {
                    key: value,
                    data: [
                      !!_onClick
                        ? /*#__PURE__*/ React.createElement(
                            _common_components__WEBPACK_IMPORTED_MODULE_0__.Checkbox,
                            {
                              key: value,
                              value: value,
                              checked: isChecked,
                              disabled: isBase && !isCreate,
                              onClick: function onClick(e) {
                                return e.stopPropagation();
                              },
                            },
                          )
                        : null,
                      /*#__PURE__*/ React.createElement(
                        React.Fragment,
                        null,
                        /*#__PURE__*/ React.createElement(
                          'p',
                          {
                            className: 'text-Gray-3 font-semibold truncate',
                          },
                          fullName,
                        ),
                        /*#__PURE__*/ React.createElement(
                          'p',
                          {
                            className: 'truncate',
                          },
                          email,
                        ),
                      ),
                      title,
                      department === null || department === void 0 ? void 0 : department.name,
                      roles.length
                        ? roles
                            .map(function (_ref4) {
                              var name = _ref4.name;
                              return name;
                            })
                            .join(', ')
                        : '--',
                    ],
                    onClick: function onClick() {
                      return _onClick === null || _onClick === void 0 ? void 0 : _onClick(value);
                    },
                  },
                );
              },
            );
          };
          var filteredUsers = users.filter(function (user) {
            var _user$fullName, _user$department;
            return (
              ((_user$fullName = user.fullName) === null || _user$fullName === void 0
                ? void 0
                : _user$fullName
                    .toLowerCase()
                    .includes(
                      keyWord === null || keyWord === void 0 ? void 0 : keyWord.toLowerCase(),
                    )) ||
              ((_user$department = user.department) === null || _user$department === void 0
                ? void 0
                : _user$department.name
                    .toLowerCase()
                    .includes(
                      keyWord === null || keyWord === void 0 ? void 0 : keyWord.toLowerCase(),
                    ))
            );
          });
          return /*#__PURE__*/ React.createElement(
            _common_components__WEBPACK_IMPORTED_MODULE_0__.ListLoader,
            {
              loading: isInitializingUsers,
            },
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: (0, clsx__WEBPACK_IMPORTED_MODULE_4__['default'])(
                  'text-xs text-[#6B7280] h-full flex flex-col',
                  className,
                ),
              },
              /*#__PURE__*/ React.createElement(
                _MembersTableRow__WEBPACK_IMPORTED_MODULE_5__.MembersTableRow,
                {
                  data: headers.map(function (_ref5) {
                    var label = _ref5.label;
                    return label;
                  }),
                  className: 'border-b border-Gray-11',
                },
              ),
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'overflow-auto flex-1 py-[1px]',
                },
                /*#__PURE__*/ React.createElement(
                  _common_components__WEBPACK_IMPORTED_MODULE_0__.Form.HeadlessCheckboxGroup,
                  {
                    name: 'memberIds',
                    valueAs: function valueAs(value) {
                      return isBase && !isCreate
                        ? users.map(function (_ref6) {
                            var id = _ref6.id;
                            return id === null || id === void 0 ? void 0 : id.toString();
                          })
                        : value.map(String);
                    },
                    changeAs: function changeAs(value) {
                      return value.map(Number);
                    },
                  },
                  function (_ref7) {
                    var toggleValue = _ref7.toggleValue;
                    if (isUpdate && !isBase) {
                      var alreadyInThisRoleMembers = filteredUsers.filter(function (user) {
                        return memberIds.includes(user.id);
                      });
                      var notInThisRoleMembers = filteredUsers.filter(function (user) {
                        return !memberIds.includes(user.id);
                      });
                      return /*#__PURE__*/ React.createElement(
                        'div',
                        null,
                        !!alreadyInThisRoleMembers.length &&
                          /*#__PURE__*/ React.createElement(
                            'div',
                            {
                              className: 'py-3',
                            },
                            /*#__PURE__*/ React.createElement(
                              'p',
                              {
                                className: 'mb-5',
                              },
                              'Already in this role',
                            ),
                            /*#__PURE__*/ React.createElement(
                              'div',
                              null,
                              alreadyInThisRoleMembers.map(function (user) {
                                return renderDataRow(user);
                              }),
                            ),
                          ),
                        !!alreadyInThisRoleMembers.length &&
                          !!notInThisRoleMembers.length &&
                          /*#__PURE__*/ React.createElement(
                            _common_components__WEBPACK_IMPORTED_MODULE_0__.Divider,
                            null,
                          ),
                        !!notInThisRoleMembers.length &&
                          /*#__PURE__*/ React.createElement(
                            'div',
                            {
                              className: 'py-3',
                            },
                            /*#__PURE__*/ React.createElement(
                              'p',
                              {
                                className: 'mb-5',
                              },
                              'Invite other team members',
                            ),
                            /*#__PURE__*/ React.createElement(
                              'div',
                              null,
                              notInThisRoleMembers.map(function (user) {
                                return renderDataRow(user, toggleValue);
                              }),
                            ),
                          ),
                      );
                    }
                    return filteredUsers.map(function (user) {
                      return renderDataRow(user, toggleValue);
                    });
                  },
                ),
              ),
            ),
          );
        };

        /***/
      },

    /***/ './src/admin/RoleDrawer/MembersTableRow.tsx':
      /*!**************************************************!*\
  !*** ./src/admin/RoleDrawer/MembersTableRow.tsx ***!
  \**************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ MembersTableRow: function () {
            return /* binding */ MembersTableRow;
          },
          /* harmony export */
        });
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );

        var MembersTableRow = function MembersTableRow(_ref) {
          var data = _ref.data,
            className = _ref.className,
            onClick = _ref.onClick;
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
            'div',
            {
              onClick: onClick,
              className: (0, clsx__WEBPACK_IMPORTED_MODULE_0__['default'])(
                'flex gap-2 w-[calc(100%-2px)] mx-auto text-left py-3 px-2 items-center',
                {
                  'list-row-hover cursor-pointer': !!onClick,
                },
                className,
              ),
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
              'div',
              {
                className: 'w-4 h-4',
              },
              data[0],
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
              'div',
              {
                className: 'grid grid-cols-4 flex-1 gap-2 items-center',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                'div',
                {
                  className: 'col-span-1',
                },
                data[1],
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                'div',
                {
                  className: 'col-span-1',
                },
                data[2],
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                'div',
                {
                  className: 'col-span-1',
                },
                data[3],
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(
                'div',
                {
                  className: 'col-span-1',
                },
                data[4],
              ),
            ),
          );
        };

        /***/
      },

    /***/ './src/admin/RoleDrawer/RoleDrawer.tsx':
      /*!*********************************************!*\
  !*** ./src/admin/RoleDrawer/RoleDrawer.tsx ***!
  \*********************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ RoleDrawer: function () {
            return /* binding */ RoleDrawer;
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
        /* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @/common/utils */ './src/common/utils/index.ts',
        );
        /* harmony import */ var _role_apis__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @/role/apis */ './src/role/apis.ts',
        );
        /* harmony import */ var _role_useAssignableCategories__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! @/role/useAssignableCategories */ './src/role/useAssignableCategories.ts',
          );
        /* harmony import */ var _role_useAssignableDepartments__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! @/role/useAssignableDepartments */ './src/role/useAssignableDepartments.ts',
          );
        /* harmony import */ var _role_useAssignableVendors__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(
            /*! @/role/useAssignableVendors */ './src/role/useAssignableVendors.ts',
          );
        /* harmony import */ var _role_useRole__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          /*! @/role/useRole */ './src/role/useRole.ts',
        );
        /* harmony import */ var _role_useRoles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
          /*! @/role/useRoles */ './src/role/useRoles.ts',
        );
        /* harmony import */ var _role_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
          /*! @/role/utils */ './src/role/utils.ts',
        );
        /* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
          /*! lodash-es */ './node_modules/lodash-es/groupBy.js',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_15__ =
          __webpack_require__(
            /*! react-hook-form */ './node_modules/react-hook-form/dist/index.esm.mjs',
          );
        /* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_14__ =
          __webpack_require__(
            /*! react-router-dom */ './node_modules/react-router/esm/react-router.js',
          );
        /* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
          /*! react-toastify */ './node_modules/react-toastify/dist/react-toastify.esm.js',
        );
        /* harmony import */ var _AccessControlTabs__WEBPACK_IMPORTED_MODULE_13__ =
          __webpack_require__(
            /*! ./AccessControlTabs */ './src/admin/RoleDrawer/AccessControlTabs.tsx',
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

        var isAllItemsChecked = function isAllItemsChecked() {
          var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
          return !collection.find(function (item) {
            return !item.visible;
          });
        };
        var isAllItemsUnchecked = function isAllItemsUnchecked() {
          var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
          return !collection.find(function (item) {
            return item.visible;
          });
        };
        var uncheckAllItems = function uncheckAllItems() {
          var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
          return collection.map(function (item) {
            return _objectSpread(
              _objectSpread({}, item),
              {},
              {
                visible: false,
              },
            );
          });
        };
        var checkAllItems = function checkAllItems() {
          var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
          return collection.map(function (item) {
            return _objectSpread(
              _objectSpread({}, item),
              {},
              {
                visible: true,
              },
            );
          });
        };
        var RoleDrawer = (0, _common_hocs__WEBPACK_IMPORTED_MODULE_1__.withMountOnOpen)()(function (
          _ref,
        ) {
          var onClose = _ref.onClose,
            open = _ref.open,
            roleId = _ref.roleId,
            isCreate = _ref.isCreate;
          var _React$useState = react__WEBPACK_IMPORTED_MODULE_11__.useState('teams'),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            tab = _React$useState2[0],
            setTab = _React$useState2[1];
          var history = (0, react_router_dom__WEBPACK_IMPORTED_MODULE_14__.useHistory)();
          var confirmUpdateDisclosure = (0,
          _common_hooks__WEBPACK_IMPORTED_MODULE_2__.useDisclosure)();
          var saveSuccessDisclosure = (0,
          _common_hooks__WEBPACK_IMPORTED_MODULE_2__.useDisclosure)();
          var isUpdate =
            !_common_utils__WEBPACK_IMPORTED_MODULE_3__.AssertUtils.isNullOrUndefined(roleId);
          var _useRole = (0, _role_useRole__WEBPACK_IMPORTED_MODULE_8__.useRole)(
              roleId !== null && roleId !== void 0 ? roleId : 0,
            ),
            role = _useRole.role,
            isInitializingRole = _useRole.isInitializingRole;
          var isBaseRole = (role === null || role === void 0 ? void 0 : role.id) === 0;
          var _useRoles = (0, _role_useRoles__WEBPACK_IMPORTED_MODULE_9__.useRoles)(),
            mutateRoles = _useRoles.mutateRoles;
          var methods = (0, react_hook_form__WEBPACK_IMPORTED_MODULE_15__.useForm)();
          var reset = methods.reset,
            setValue = methods.setValue,
            getValues = methods.getValues,
            watch = methods.watch,
            _methods$formState = methods.formState,
            isSubmitting = _methods$formState.isSubmitting,
            isDirty = _methods$formState.isDirty;
          var formValue = watch();
          var getAllDepartments = react__WEBPACK_IMPORTED_MODULE_11__.useCallback(
            function () {
              return getValues('departments');
            },
            [getValues],
          );
          var getAllCategories = react__WEBPACK_IMPORTED_MODULE_11__.useCallback(
            function () {
              return getValues().categories;
            },
            [getValues],
          );
          var getAllVendors = react__WEBPACK_IMPORTED_MODULE_11__.useCallback(
            function () {
              return getValues().vendors;
            },
            [getValues],
          );
          var isAllChecked = react__WEBPACK_IMPORTED_MODULE_11__.useMemo(
            function () {
              if (tab === 'teams') return isAllItemsChecked(formValue.departments);
              if (tab === 'categories') return isAllItemsChecked(formValue.categories);
              if (tab === 'vendors') return isAllItemsChecked(formValue.vendors);
              return false;
            },
            [formValue.categories, formValue.departments, formValue.vendors, tab],
          );
          var isAllUnChecked = react__WEBPACK_IMPORTED_MODULE_11__.useMemo(
            function () {
              if (tab === 'teams') return isAllItemsUnchecked(formValue.departments);
              if (tab === 'categories') return isAllItemsUnchecked(formValue.categories);
              if (tab === 'vendors') return isAllItemsUnchecked(formValue.vendors);
              return false;
            },
            [formValue.categories, formValue.departments, formValue.vendors, tab],
          );
          var checkAll = function checkAll() {
            switch (tab) {
              case 'teams': {
                setValue('departments', checkAllItems(getAllDepartments()));
                break;
              }
              case 'categories': {
                setValue('categories', checkAllItems(getAllCategories()));
                break;
              }
              case 'vendors': {
                setValue('vendors', checkAllItems(getAllVendors()));
                break;
              }
              default:
                break;
            }
          };
          var uncheckAll = function uncheckAll() {
            switch (tab) {
              case 'teams': {
                setValue('departments', uncheckAllItems(getAllDepartments()));
                break;
              }
              case 'categories': {
                setValue('categories', uncheckAllItems(getAllCategories()));
                break;
              }
              case 'vendors': {
                setValue('vendors', uncheckAllItems(getAllVendors()));
                break;
              }
              default:
                break;
            }
          };
          var _useAssignableCategor = (0,
            _role_useAssignableCategories__WEBPACK_IMPORTED_MODULE_5__.useAssignableCategories)(),
            assignableCategories = _useAssignableCategor.assignableCategories;
          var _useAssignableVendors = (0,
            _role_useAssignableVendors__WEBPACK_IMPORTED_MODULE_7__.useAssignableVendors)(),
            assignableVendors = _useAssignableVendors.assignableVendors;
          var _useAssignableDepartm = (0,
            _role_useAssignableDepartments__WEBPACK_IMPORTED_MODULE_6__.useAssignableDepartments)(),
            assignableDepartments = _useAssignableDepartm.assignableDepartments;
          react__WEBPACK_IMPORTED_MODULE_11__.useEffect(
            function () {
              if (role) {
                var categories = role.categories,
                  departments = role.departments,
                  vendors = role.vendors;
                var categoriesGroupedById = (0, lodash_es__WEBPACK_IMPORTED_MODULE_16__['default'])(
                  categories,
                  'id',
                );
                var departmentsGroupedById = (0,
                lodash_es__WEBPACK_IMPORTED_MODULE_16__['default'])(departments, 'id');
                var vendorsGroupedById = (0, lodash_es__WEBPACK_IMPORTED_MODULE_16__['default'])(
                  vendors,
                  'id',
                );
                reset(
                  _objectSpread(
                    _objectSpread({}, role),
                    {},
                    {
                      name: isUpdate ? role.name : '',
                      description: isUpdate ? role.description : '',
                      departments: assignableDepartments
                        .reduce(function (acc, cur) {
                          var _cur$children;
                          return [].concat(
                            _toConsumableArray(acc),
                            [cur],
                            _toConsumableArray(
                              (_cur$children = cur.children) !== null && _cur$children !== void 0
                                ? _cur$children
                                : [],
                            ),
                          );
                        }, [])
                        .map(function (department) {
                          var _departmentsGroupedBy,
                            _departmentsGroupedBy2,
                            _departmentsGroupedBy3,
                            _departmentsGroupedBy4,
                            _departmentsGroupedBy5;
                          return _objectSpread(
                            _objectSpread(
                              _objectSpread({}, department),
                              (_departmentsGroupedBy = departmentsGroupedById[department.id]) ===
                                null || _departmentsGroupedBy === void 0
                                ? void 0
                                : _departmentsGroupedBy[0],
                            ),
                            {},
                            {
                              default:
                                (_departmentsGroupedBy2 =
                                  (_departmentsGroupedBy3 =
                                    departmentsGroupedById[department.id]) === null ||
                                  _departmentsGroupedBy3 === void 0
                                    ? void 0
                                    : _departmentsGroupedBy3[0].default) !== null &&
                                _departmentsGroupedBy2 !== void 0
                                  ? _departmentsGroupedBy2
                                  : true,
                              visible:
                                (_departmentsGroupedBy4 =
                                  (_departmentsGroupedBy5 =
                                    departmentsGroupedById[department.id]) === null ||
                                  _departmentsGroupedBy5 === void 0
                                    ? void 0
                                    : _departmentsGroupedBy5[0].visible) !== null &&
                                _departmentsGroupedBy4 !== void 0
                                  ? _departmentsGroupedBy4
                                  : true,
                            },
                          );
                        }),
                      categories: assignableCategories.map(function (category) {
                        var _categoriesGroupedByI,
                          _categoriesGroupedByI2,
                          _categoriesGroupedByI3,
                          _categoriesGroupedByI4,
                          _categoriesGroupedByI5;
                        return _objectSpread(
                          _objectSpread(
                            _objectSpread({}, category),
                            (_categoriesGroupedByI = categoriesGroupedById[category.id]) === null ||
                              _categoriesGroupedByI === void 0
                              ? void 0
                              : _categoriesGroupedByI[0],
                          ),
                          {},
                          {
                            default:
                              (_categoriesGroupedByI2 =
                                (_categoriesGroupedByI3 = categoriesGroupedById[category.id]) ===
                                  null || _categoriesGroupedByI3 === void 0
                                  ? void 0
                                  : _categoriesGroupedByI3[0].default) !== null &&
                              _categoriesGroupedByI2 !== void 0
                                ? _categoriesGroupedByI2
                                : true,
                            visible:
                              (_categoriesGroupedByI4 =
                                (_categoriesGroupedByI5 = categoriesGroupedById[category.id]) ===
                                  null || _categoriesGroupedByI5 === void 0
                                  ? void 0
                                  : _categoriesGroupedByI5[0].visible) !== null &&
                              _categoriesGroupedByI4 !== void 0
                                ? _categoriesGroupedByI4
                                : true,
                          },
                        );
                      }),
                      vendors: assignableVendors.map(function (vendor) {
                        var _vendorsGroupedById$v,
                          _vendorsGroupedById$v2,
                          _vendorsGroupedById$v3,
                          _vendorsGroupedById$v4,
                          _vendorsGroupedById$v5;
                        return _objectSpread(
                          _objectSpread(
                            _objectSpread({}, vendor),
                            (_vendorsGroupedById$v = vendorsGroupedById[vendor.id]) === null ||
                              _vendorsGroupedById$v === void 0
                              ? void 0
                              : _vendorsGroupedById$v[0],
                          ),
                          {},
                          {
                            default:
                              (_vendorsGroupedById$v2 =
                                (_vendorsGroupedById$v3 = vendorsGroupedById[vendor.id]) === null ||
                                _vendorsGroupedById$v3 === void 0
                                  ? void 0
                                  : _vendorsGroupedById$v3[0].default) !== null &&
                              _vendorsGroupedById$v2 !== void 0
                                ? _vendorsGroupedById$v2
                                : true,
                            visible:
                              (_vendorsGroupedById$v4 =
                                (_vendorsGroupedById$v5 = vendorsGroupedById[vendor.id]) === null ||
                                _vendorsGroupedById$v5 === void 0
                                  ? void 0
                                  : _vendorsGroupedById$v5[0].visible) !== null &&
                              _vendorsGroupedById$v4 !== void 0
                                ? _vendorsGroupedById$v4
                                : true,
                          },
                        );
                      }),
                    },
                  ),
                );
              }
            },
            [
              assignableCategories,
              assignableDepartments,
              assignableVendors,
              isCreate,
              isUpdate,
              reset,
              role,
            ],
          );
          var transformFormDataToRequestPayload = function transformFormDataToRequestPayload(data) {
            return _objectSpread(
              _objectSpread({}, data),
              {},
              {
                departments: data.departments.map(function (_ref2) {
                  var id = _ref2.id,
                    visible = _ref2.visible,
                    _default = _ref2.default;
                  return {
                    id: id,
                    visible: visible,
                    useDefault: !isBaseRole ? _default === visible : undefined,
                  };
                }),
                categories: data.categories.map(function (_ref3) {
                  var id = _ref3.id,
                    visible = _ref3.visible,
                    _default = _ref3.default;
                  return {
                    id: id,
                    visible: visible,
                    useDefault: !isBaseRole ? _default === visible : undefined,
                  };
                }),
                vendors: data.vendors.map(function (_ref4) {
                  var id = _ref4.id,
                    visible = _ref4.visible,
                    _default = _ref4.default;
                  return {
                    id: id,
                    visible: visible,
                    useDefault: !isBaseRole ? _default === visible : undefined,
                  };
                }),
              },
            );
          };
          var handleUpdateConfirm = /*#__PURE__*/ (function () {
            var _ref5 = _asyncToGenerator(
              /*#__PURE__*/ _regeneratorRuntime().mark(function _callee() {
                var data;
                return _regeneratorRuntime().wrap(
                  function _callee$(_context) {
                    while (1)
                      switch ((_context.prev = _context.next)) {
                        case 0:
                          data = getValues();
                          _context.prev = 1;
                          _context.next = 4;
                          return _role_apis__WEBPACK_IMPORTED_MODULE_4__.RoleApis.update(
                            role.id,
                            transformFormDataToRequestPayload(data),
                          );
                        case 4:
                          mutateRoles();
                          closeConfirmUpdateModal();
                          _context.next = 12;
                          break;
                        case 8:
                          _context.prev = 8;
                          _context.t0 = _context['catch'](1);
                          react_toastify__WEBPACK_IMPORTED_MODULE_12__.toast.error(
                            _context.t0.details.message,
                          );
                          throw _context.t0;
                        case 12:
                        case 'end':
                          return _context.stop();
                      }
                  },
                  _callee,
                  null,
                  [[1, 8]],
                );
              }),
            );
            return function handleUpdateConfirm() {
              return _ref5.apply(this, arguments);
            };
          })();
          var handleCreate = /*#__PURE__*/ (function () {
            var _ref6 = _asyncToGenerator(
              /*#__PURE__*/ _regeneratorRuntime().mark(function _callee2(data) {
                return _regeneratorRuntime().wrap(
                  function _callee2$(_context2) {
                    while (1)
                      switch ((_context2.prev = _context2.next)) {
                        case 0:
                          _context2.prev = 0;
                          _context2.next = 3;
                          return _role_apis__WEBPACK_IMPORTED_MODULE_4__.RoleApis.create(
                            transformFormDataToRequestPayload(data),
                          );
                        case 3:
                          mutateRoles();
                          saveSuccessDisclosure.open();
                          _context2.next = 11;
                          break;
                        case 7:
                          _context2.prev = 7;
                          _context2.t0 = _context2['catch'](0);
                          react_toastify__WEBPACK_IMPORTED_MODULE_12__.toast.error(
                            _context2.t0.details.message,
                          );
                          throw _context2.t0;
                        case 11:
                        case 'end':
                          return _context2.stop();
                      }
                  },
                  _callee2,
                  null,
                  [[0, 7]],
                );
              }),
            );
            return function handleCreate(_x2) {
              return _ref6.apply(this, arguments);
            };
          })();
          var closeConfirmUpdateModal = function closeConfirmUpdateModal() {
            saveSuccessDisclosure.close();
            onClose === null || onClose === void 0 ? void 0 : onClose();
          };
          var closeConfirmSuccessModal = function closeConfirmSuccessModal() {
            saveSuccessDisclosure.close();
            onClose === null || onClose === void 0 ? void 0 : onClose();
          };
          var handleSuccessConfirm = function handleSuccessConfirm() {
            saveSuccessDisclosure.close();
            history.push('/admin/team-members');
          };
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_11__.createElement(
            _common_components__WEBPACK_IMPORTED_MODULE_0__.Drawer,
            {
              open: open,
              onClose: onClose,
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_11__.createElement(
              _common_components__WEBPACK_IMPORTED_MODULE_0__.ConfirmModal,
              {
                open: confirmUpdateDisclosure.isOpen,
                onClose: closeConfirmUpdateModal,
                onCancel: closeConfirmUpdateModal,
                onConfirm: handleUpdateConfirm,
                variant: 'alert',
                title: 'Update the settings for this role?',
                content: 'This will affect view access for all team members within this role.',
              },
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_11__.createElement(
              _common_components__WEBPACK_IMPORTED_MODULE_0__.ConfirmModal,
              {
                open: saveSuccessDisclosure.isOpen,
                onClose: closeConfirmSuccessModal,
                onConfirm: handleSuccessConfirm,
                variant: 'success',
                confirmButtonLabel: 'Manage',
                title: 'New role created!',
                content:
                  'You can also manage team members and their access from the team members tab.',
              },
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_11__.createElement(
              _common_components__WEBPACK_IMPORTED_MODULE_0__.Form,
              {
                methods: methods,
                onSubmit: isUpdate ? confirmUpdateDisclosure.open : handleCreate,
                className: 'flex flex-col h-full',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_11__.createElement(
                'div',
                {
                  className: 'bg-Gray-12 p-6 border-b border-solid border-Gray-11',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_11__.createElement(
                  'h2',
                  {
                    className: 'text-lg font-medium',
                  },
                  'Roles',
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_11__.createElement(
                  'p',
                  {
                    className: 'text-sm text-[#6B7280] mt-1',
                  },
                  'All roles initially inherit the default Base User properties. Deselect any property to hide them from team members within this role. Changed properties will stay',
                  ' ',
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_11__.createElement(
                    'span',
                    {
                      className: 'text-Accent-2',
                    },
                    'highlighted.',
                  ),
                ),
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_11__.createElement(
                'div',
                {
                  className: 'flex flex-col flex-1 px-6 pt-4 overflow-hidden',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_11__.createElement(
                  'label',
                  {
                    className: 'font-bold text-xs',
                  },
                  'Role Name',
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_11__.createElement(
                  _common_components__WEBPACK_IMPORTED_MODULE_0__.Form.Input,
                  {
                    name: 'name',
                    placeholder: '',
                    className: 'mt-2',
                    rules: {
                      required: true,
                    },
                    disabled:
                      isInitializingRole ||
                      (role && (0, _role_utils__WEBPACK_IMPORTED_MODULE_10__.isAdmin)(role)) ||
                      (!_common_utils__WEBPACK_IMPORTED_MODULE_3__.AssertUtils.isNullOrUndefined(
                        roleId,
                      ) &&
                        role &&
                        (0, _role_utils__WEBPACK_IMPORTED_MODULE_10__.isBaseUser)(role)),
                  },
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_11__.createElement(
                  'div',
                  {
                    className: 'mt-4',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_11__.createElement(
                    'label',
                    {
                      className: 'font-bold text-xs',
                    },
                    'Description',
                  ),
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_11__.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_0__.Form.Input,
                    {
                      name: 'description',
                      placeholder: '',
                      className: 'mt-2',
                      rules: {
                        required: true,
                      },
                      disabled:
                        isInitializingRole ||
                        (!_common_utils__WEBPACK_IMPORTED_MODULE_3__.AssertUtils.isNullOrUndefined(
                          roleId,
                        ) &&
                          role &&
                          (0, _role_utils__WEBPACK_IMPORTED_MODULE_10__.isBaseUser)(role)),
                    },
                  ),
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_11__.createElement(
                  _AccessControlTabs__WEBPACK_IMPORTED_MODULE_13__.AccessControlTabs,
                  {
                    tab: tab,
                    onTabChange: setTab,
                    isBase: (role === null || role === void 0 ? void 0 : role.id) === 0,
                    isCreate: isCreate,
                    isUpdate: isUpdate,
                  },
                ),
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_11__.createElement(
                'div',
                {
                  className:
                    'py-5 px-6 flex justify-between gap-2 border-t border-solid border-Gray-28',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_11__.createElement(
                  'div',
                  null,
                  tab !== 'members' &&
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_11__.createElement(
                      react__WEBPACK_IMPORTED_MODULE_11__.Fragment,
                      null,
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_11__.createElement(
                        _common_components__WEBPACK_IMPORTED_MODULE_0__.Button,
                        {
                          variant: 'text',
                          className: 'underline',
                          onClick: checkAll,
                          disabled: isAllChecked,
                        },
                        'Check All',
                      ),
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_11__.createElement(
                        _common_components__WEBPACK_IMPORTED_MODULE_0__.Button,
                        {
                          variant: 'text',
                          className: 'underline',
                          onClick: uncheckAll,
                          disabled: isAllUnChecked,
                        },
                        'Uncheck All',
                      ),
                    ),
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_11__.createElement(
                  'div',
                  null,
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_11__.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_0__.Button,
                    {
                      variant: 'ghost',
                      colorScheme: 'gray',
                      onClick: onClose,
                    },
                    'Cancel',
                  ),
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_11__.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_0__.Button,
                    {
                      variant: 'solid',
                      type: 'submit',
                      loading: isSubmitting,
                      disabled: !isDirty,
                    },
                    'Save',
                  ),
                ),
              ),
            ),
          );
        });

        /***/
      },

    /***/ './src/admin/RoleDrawer/SearchInput.tsx':
      /*!**********************************************!*\
  !*** ./src/admin/RoleDrawer/SearchInput.tsx ***!
  \**********************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ SearchInput: function () {
            return /* binding */ SearchInput;
          },
          /* harmony export */
        });
        /* harmony import */ var _assets_icons_outline_basics_search_small_svg__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! @/assets/icons/outline/basics-search-small.svg */ './src/assets/icons/outline/basics-search-small.svg',
          );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );

        var SearchInput = function SearchInput(_ref) {
          var placeholder = _ref.placeholder,
            onChange = _ref.onChange,
            className = _ref.className;
          var useableViewRef = (0, react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
          var searchInputRef = (0, react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
            react__WEBPACK_IMPORTED_MODULE_2__.Fragment,
            null,
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
              'div',
              {
                className: (0, clsx__WEBPACK_IMPORTED_MODULE_1__['default'])(
                  'flex items-center w-full lg:max-w-none',
                  className,
                ),
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
                react__WEBPACK_IMPORTED_MODULE_2__.Fragment,
                null,
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
                  'div',
                  {
                    className: 'w-full relative',
                    ref: useableViewRef,
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
                    'div',
                    {
                      className: 'sr-only',
                    },
                    placeholder,
                  ),
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
                    'div',
                    {
                      className: 'relative flex flex-row items-center group',
                    },
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
                      'div',
                      {
                        className: 'absolute inset-y-0 left-1 sm:left-2 flex items-center',
                      },
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
                        _assets_icons_outline_basics_search_small_svg__WEBPACK_IMPORTED_MODULE_0__.ReactComponent,
                        {
                          width: 24,
                          height: 24,
                          className: 'h-6 w-6 text-gray-400',
                          'aria-hidden': 'true',
                        },
                      ),
                    ),
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement('input', {
                      ref: searchInputRef,
                      id: 'search',
                      name: 'search',
                      className:
                        'block w-full text-Gray-6 focus:border rounded-sm border border-Gray-11 py-0 h-7 pl-8 pr-8 sm:pr-16 sm:pl-9 text-sm placeholder-Gray-6 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-Accent-2 focus:border-Accent-2 sm:text-sm truncate',
                      placeholder: placeholder,
                      autoComplete: 'off',
                      autoCorrect: 'off',
                      autoCapitalize: 'off',
                      onChange: onChange,
                    }),
                  ),
                ),
              ),
            ),
          );
        };

        /***/
      },

    /***/ './src/admin/RoleDrawer/VendorsTab.tsx':
      /*!*********************************************!*\
  !*** ./src/admin/RoleDrawer/VendorsTab.tsx ***!
  \*********************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ VendorsTab: function () {
            return /* binding */ VendorsTab;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _common_components_ResettableCheckbox__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! @/common/components/ResettableCheckbox */ './src/common/components/ResettableCheckbox/index.ts',
          );
        /* harmony import */ var _role_useAssignableVendors__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! @/role/useAssignableVendors */ './src/role/useAssignableVendors.ts',
          );
        /* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! lodash-es */ './node_modules/lodash-es/groupBy.js',
        );
        /* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
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

        var VendorsTab = function VendorsTab(_ref) {
          var keyWord = _ref.keyWord;
          var _useAssignableVendors = (0,
            _role_useAssignableVendors__WEBPACK_IMPORTED_MODULE_2__.useAssignableVendors)(),
            isInitializingAssignableVendors = _useAssignableVendors.isInitializingAssignableVendors;
          var _useFormContext = (0, react_hook_form__WEBPACK_IMPORTED_MODULE_3__.useFormContext)(),
            getValues = _useFormContext.getValues;
          var _getValues = getValues(),
            _getValues$vendors = _getValues.vendors,
            vendors = _getValues$vendors === void 0 ? [] : _getValues$vendors;
          var filteredVendors = vendors.filter(function (item) {
            var _item$name;
            return item === null || item === void 0
              ? void 0
              : (_item$name = item.name) === null || _item$name === void 0
              ? void 0
              : _item$name
                  .toLowerCase()
                  .includes(
                    keyWord === null || keyWord === void 0 ? void 0 : keyWord.toLowerCase(),
                  );
          });
          var vendorsGroupedByAlphabet = (0, lodash_es__WEBPACK_IMPORTED_MODULE_4__['default'])(
            filteredVendors,
            function (_ref2) {
              var name = _ref2.name;
              return /[0-9]/.test(name[0]) ? '#' : name[0];
            },
          );
          var vendorsGroupedById = (0, lodash_es__WEBPACK_IMPORTED_MODULE_4__['default'])(
            filteredVendors,
            'id',
          );
          return /*#__PURE__*/ React.createElement(
            _common_components__WEBPACK_IMPORTED_MODULE_0__.ListLoader,
            {
              loading: isInitializingAssignableVendors,
            },
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'space-y-8',
              },
              Object.entries(vendorsGroupedByAlphabet).map(function (_ref3) {
                var _ref4 = _slicedToArray(_ref3, 2),
                  character = _ref4[0],
                  vendorsByCurrentCharacter = _ref4[1];
                return /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    key: character,
                  },
                  /*#__PURE__*/ React.createElement(
                    'h3',
                    {
                      className: 'font-semibold text-sm',
                    },
                    character,
                  ),
                  /*#__PURE__*/ React.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_0__.Divider,
                    {
                      className: 'my-2',
                    },
                  ),
                  /*#__PURE__*/ React.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_0__.Form.HeadlessCheckboxGroup,
                    {
                      name: 'vendors',
                      valueAs: function valueAs(value) {
                        return value
                          .filter(function (_ref5) {
                            var visible = _ref5.visible;
                            return visible;
                          })
                          .map(function (_ref6) {
                            var id = _ref6.id;
                            return id.toString();
                          });
                      },
                      changeAs: function changeAs(value) {
                        return vendors.map(function (vendor) {
                          return _objectSpread(
                            _objectSpread({}, vendor),
                            {},
                            {
                              visible: value.includes(vendor.id.toString()) ? true : false,
                            },
                          );
                        });
                      },
                    },
                    function (_ref7) {
                      var value = _ref7.value,
                        toggleValue = _ref7.toggleValue;
                      return /*#__PURE__*/ React.createElement(
                        'div',
                        {
                          className: 'grid grid-cols-2 gap-2 text-Gray-3',
                        },
                        vendorsByCurrentCharacter.map(function (_ref8) {
                          var _vendorsGroupedById$i;
                          var id = _ref8.id,
                            name = _ref8.name;
                          return /*#__PURE__*/ React.createElement(
                            _common_components_ResettableCheckbox__WEBPACK_IMPORTED_MODULE_1__.ResettableCheckbox,
                            {
                              key: id,
                              value: id.toString(),
                              onToggle: toggleValue,
                              checked: value.includes(id.toString()),
                              label: name,
                              resettable:
                                value.includes(id.toString()) !==
                                ((_vendorsGroupedById$i = vendorsGroupedById[id]) === null ||
                                _vendorsGroupedById$i === void 0
                                  ? void 0
                                  : _vendorsGroupedById$i[0].default),
                            },
                          );
                        }),
                      );
                    },
                  ),
                );
              }),
            ),
          );
        };

        /***/
      },

    /***/ './src/admin/RoleDrawer/index.ts':
      /*!***************************************!*\
  !*** ./src/admin/RoleDrawer/index.ts ***!
  \***************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ RoleDrawer: function () {
            return /* reexport safe */ _RoleDrawer__WEBPACK_IMPORTED_MODULE_0__.RoleDrawer;
          },
          /* harmony export */
        });
        /* harmony import */ var _RoleDrawer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! ./RoleDrawer */ './src/admin/RoleDrawer/RoleDrawer.tsx',
        );

        /***/
      },

    /***/ './src/admin/RolesTabContent.tsx':
      /*!***************************************!*\
  !*** ./src/admin/RolesTabContent.tsx ***!
  \***************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ RolesTabContent: function () {
            return /* binding */ RolesTabContent;
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
        /* harmony import */ var _role_useRoles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @/role/useRoles */ './src/role/useRoles.ts',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var _RoleCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! ./RoleCard */ './src/admin/RoleCard.tsx',
        );
        /* harmony import */ var _RoleDrawer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! ./RoleDrawer */ './src/admin/RoleDrawer/index.ts',
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

        var RolesTabContent = function RolesTabContent() {
          var _React$useState = react__WEBPACK_IMPORTED_MODULE_4__.useState(),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            editingRoleId = _React$useState2[0],
            setEditingRoleId = _React$useState2[1];
          var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_4__.useState(false),
            _React$useState4 = _slicedToArray(_React$useState3, 2),
            isCreate = _React$useState4[0],
            setIsCreate = _React$useState4[1];
          var roleDrawerDisclosure = (0,
          _common_hooks__WEBPACK_IMPORTED_MODULE_2__.useDisclosure)();
          var _useRoles = (0, _role_useRoles__WEBPACK_IMPORTED_MODULE_3__.useRoles)(),
            roles = _useRoles.roles,
            isInitializingRoles = _useRoles.isInitializingRoles;
          var startEditingRole = function startEditingRole(id) {
            setEditingRoleId(id);
            roleDrawerDisclosure.open();
          };
          var stopEditingRole = function stopEditingRole() {
            setEditingRoleId(undefined);
            roleDrawerDisclosure.close();
          };
          var startAddingRole = function startAddingRole() {
            setIsCreate(true);
            setEditingRoleId(undefined);
            roleDrawerDisclosure.open();
          };
          var customRoles = roles.filter(function (item) {
            return item.id !== 0 && item.name !== 'Admin';
          });
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
            _common_components__WEBPACK_IMPORTED_MODULE_1__.ListLoader,
            {
              loading: isInitializingRoles,
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
              'div',
              {
                className: 'flex flex-col max-w-[500px]',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                _RoleDrawer__WEBPACK_IMPORTED_MODULE_6__.RoleDrawer,
                {
                  isCreate: isCreate,
                  roleId: editingRoleId,
                  open: roleDrawerDisclosure.isOpen,
                  onClose: stopEditingRole,
                },
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                'div',
                {
                  className: 'flex justify-between items-center',
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                  'div',
                  {
                    className: 'space-y-2 mb-8',
                  },
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                    'h1',
                    {
                      className: 'text-2xl leading-7 font-semibold text-primary',
                    },
                    'Roles',
                  ),
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                    'p',
                    {
                      className: 'text-sm leading-4 font-normal text-Gray-6',
                    },
                    'Manage account roles and view access.',
                  ),
                ),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                  _common_components__WEBPACK_IMPORTED_MODULE_1__.Button,
                  {
                    size: 'sm',
                    variant: 'ghost',
                    colorScheme: 'gray',
                    className: 'text-xs font-semibold',
                    iconLeft: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                      _assets__WEBPACK_IMPORTED_MODULE_0__.AddSmallSolid,
                      {
                        className: 'h-3.5 w-3.5',
                      },
                    ),
                    onClick: startAddingRole,
                  },
                  'Add role',
                ),
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                'div',
                {
                  className: 'flex flex-col space-y-4',
                },
                roles
                  .filter(function (item) {
                    return item.id === 0 || item.name === 'Admin';
                  })
                  .map(function (role) {
                    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                      _RoleCard__WEBPACK_IMPORTED_MODULE_5__.RoleCard,
                      {
                        key: role.id,
                        role: role,
                        onClick: function onClick() {
                          return startEditingRole(role.id);
                        },
                      },
                    );
                  }),
              ),
              !!customRoles.length &&
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                  react__WEBPACK_IMPORTED_MODULE_4__.Fragment,
                  null,
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_1__.Divider,
                    {
                      className: 'mt-8',
                      direction: 'horizontal',
                    },
                  ),
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                    'p',
                    {
                      className: 'font-semibold text-sm leading-4 tracking-tight mt-3 mb-8',
                    },
                    'Custom Roles',
                  ),
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                    'div',
                    {
                      className: 'flex flex-col space-y-6',
                    },
                    customRoles.map(function (role) {
                      return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                        _RoleCard__WEBPACK_IMPORTED_MODULE_5__.RoleCard,
                        {
                          key: role.id,
                          role: role,
                          onClick: function onClick() {
                            return startEditingRole(role.id);
                          },
                          deletable: true,
                        },
                      );
                    }),
                  ),
                ),
            ),
          );
        };

        /***/
      },

    /***/ './src/admin/TeamMembersTabContent.tsx':
      /*!*********************************************!*\
  !*** ./src/admin/TeamMembersTabContent.tsx ***!
  \*********************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ TeamMembersTabContent: function () {
            return /* binding */ TeamMembersTabContent;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _profile_useUsers__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! @/profile/useUsers */ './src/profile/useUsers.ts');
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var _RoleDrawer_SearchInput__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ./RoleDrawer/SearchInput */ './src/admin/RoleDrawer/SearchInput.tsx',
          );
        /* harmony import */ var _TeamMembersTable__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(/*! ./TeamMembersTable */ './src/admin/TeamMembersTable/index.ts');
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

        var TeamMembersTabContent = function TeamMembersTabContent() {
          var _useUsers = (0, _profile_useUsers__WEBPACK_IMPORTED_MODULE_1__.useUsers)(),
            users = _useUsers.users,
            isValidatingUsers = _useUsers.isValidatingUsers,
            mutateUsers = _useUsers.mutateUsers;
          var _React$useState = react__WEBPACK_IMPORTED_MODULE_2__.useState(''),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            keyword = _React$useState2[0],
            setKeyWord = _React$useState2[1];
          var handleSearchUsers = function handleSearchUsers(value) {
            setKeyWord(value);
          };
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
            'div',
            {
              className: 'flex-1',
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
              'div',
              {
                className: 'space-y-2',
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
                'h1',
                {
                  className: 'text-2xl leading-7 font-semibold text-primary',
                },
                'Team Members',
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
                'p',
                {
                  className: 'text-sm leading-4 font-normal text-Gray-6',
                },
                'Manage all team members and their account roles.',
              ),
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
              _common_components__WEBPACK_IMPORTED_MODULE_0__.ListLoader,
              {
                loading: isValidatingUsers,
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
                _RoleDrawer_SearchInput__WEBPACK_IMPORTED_MODULE_3__.SearchInput,
                {
                  className: 'w-56 lg:w-72 ml-auto mt-6 mb-4',
                  placeholder: 'Search by team or name',
                  onChange: function onChange(e) {
                    return handleSearchUsers(e.target.value);
                  },
                },
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2__.createElement(
                _TeamMembersTable__WEBPACK_IMPORTED_MODULE_4__.TeamMembersTable,
                {
                  className: 'w-full',
                  users: users.filter(function (user) {
                    var _user$fullName, _user$department;
                    return (
                      ((_user$fullName = user.fullName) === null || _user$fullName === void 0
                        ? void 0
                        : _user$fullName.toLowerCase().includes(keyword.toLowerCase())) ||
                      ((_user$department = user.department) === null || _user$department === void 0
                        ? void 0
                        : _user$department.name.toLowerCase().includes(keyword.toLowerCase()))
                    );
                  }),
                  mutate: mutateUsers,
                },
              ),
            ),
          );
        };

        /***/
      },

    /***/ './src/admin/TeamMembersTable/RolesSelect.tsx':
      /*!****************************************************!*\
  !*** ./src/admin/TeamMembersTable/RolesSelect.tsx ***!
  \****************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ RolesSelect: function () {
            return /* binding */ RolesSelect;
          },
          /* harmony export */
        });
        /* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/assets */ './src/assets/index.ts',
        );
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _common_headless__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! @/common/headless */ './src/common/headless/index.ts');
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var _role_useRoles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @/role/useRoles */ './src/role/useRoles.ts',
        );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! lodash-es */ './node_modules/lodash-es/groupBy.js',
        );
        /* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ =
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

        var RolesSelect = function RolesSelect(_ref) {
          var valueProp = _ref.value,
            onChange = _ref.onChange,
            _ref$defaultValue = _ref.defaultValue,
            defaultValue = _ref$defaultValue === void 0 ? [] : _ref$defaultValue,
            className = _ref.className,
            disabled = _ref.disabled;
          var _useControllableState = (0,
            _common_hooks__WEBPACK_IMPORTED_MODULE_3__.useControllableState)({
              value: valueProp,
              onChange: onChange,
              defaultValue: defaultValue,
            }),
            _useControllableState2 = _slicedToArray(_useControllableState, 2),
            value = _useControllableState2[0],
            setValue = _useControllableState2[1];
          var _useRoles = (0, _role_useRoles__WEBPACK_IMPORTED_MODULE_4__.useRoles)(),
            roles = _useRoles.roles;
          var selectableRoles = roles.filter(function (role) {
            return !!role.id;
          });
          var rolesGroupedById = (0, lodash_es__WEBPACK_IMPORTED_MODULE_6__['default'])(
            selectableRoles,
            'id',
          );
          var isOpenDisclosure = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_3__.useDisclosure)();
          return /*#__PURE__*/ React.createElement(
            _common_headless__WEBPACK_IMPORTED_MODULE_2__.CheckboxGroup,
            {
              value: value,
              onChange: setValue,
            },
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: (0, clsx__WEBPACK_IMPORTED_MODULE_5__['default'])(
                  'flex items-center gap-1',
                  className,
                ),
              },
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'flex flex-wrap gap-1',
                },
                value.map(function (v) {
                  var _rolesGroupedById$v, _rolesGroupedById$v$;
                  return /*#__PURE__*/ React.createElement(
                    'div',
                    {
                      key: v,
                      className:
                        'rounded-full px-4 py-1 text-xs text-Gray-3 bg-Accent-5 font-semibold',
                    },
                    (_rolesGroupedById$v = rolesGroupedById[v]) === null ||
                      _rolesGroupedById$v === void 0
                      ? void 0
                      : (_rolesGroupedById$v$ = _rolesGroupedById$v[0]) === null ||
                        _rolesGroupedById$v$ === void 0
                      ? void 0
                      : _rolesGroupedById$v$.name,
                  );
                }),
              ),
              /*#__PURE__*/ React.createElement(
                _common_components__WEBPACK_IMPORTED_MODULE_1__.Popover,
                {
                  open: isOpenDisclosure.isOpen,
                  onClose: isOpenDisclosure.close,
                  placement: 'bottom-end',
                  trigger: /*#__PURE__*/ React.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_1__.Button,
                    {
                      onClick: isOpenDisclosure.open,
                      className: (0, clsx__WEBPACK_IMPORTED_MODULE_5__['default'])(
                        'p-1 border border-transparent',
                        {
                          'border border-dashed border-Gray-6 bg-Gray-12 rounded-full':
                            isOpenDisclosure.isOpen,
                        },
                      ),
                    },
                    /*#__PURE__*/ React.createElement(
                      _assets__WEBPACK_IMPORTED_MODULE_0__.EditOutlineIcon,
                      {
                        className: 'w-4 h-4 text-Gray-6',
                      },
                    ),
                  ),
                },
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'py-1 rounded shadow-popover bg-white',
                  },
                  selectableRoles.map(function (_ref2) {
                    var id = _ref2.id,
                      name = _ref2.name;
                    return /*#__PURE__*/ React.createElement(
                      'label',
                      {
                        key: id,
                        className: 'px-4 py-1.5 hover:bg-Gray-7 cursor-pointer block',
                      },
                      /*#__PURE__*/ React.createElement(
                        _common_headless__WEBPACK_IMPORTED_MODULE_2__.CheckboxGroupOption,
                        {
                          value: id.toString(),
                        },
                        function (_ref3) {
                          var handleChange = _ref3.handleChange,
                            isChecked = _ref3.isChecked,
                            value = _ref3.value;
                          return /*#__PURE__*/ React.createElement(
                            _common_components__WEBPACK_IMPORTED_MODULE_1__.Checkbox,
                            {
                              checked: isChecked,
                              disabled: disabled,
                              value: value,
                              onChange: handleChange,
                              label: name,
                            },
                          );
                        },
                      ),
                    );
                  }),
                  /*#__PURE__*/ React.createElement(
                    react_router_dom__WEBPACK_IMPORTED_MODULE_7__.Link,
                    {
                      to: '/admin/roles',
                      className:
                        'px-4 py-1.5 hover:bg-Gray-7 text-xs text-Gray-6 flex items-center gap-2 border-t border-solid border-Gray-11',
                    },
                    'Add custom role\u2026',
                    /*#__PURE__*/ React.createElement(
                      _assets__WEBPACK_IMPORTED_MODULE_0__.ArrowRightIcon,
                      {
                        className: 'w-4 h-4 text-Gray-2',
                      },
                    ),
                  ),
                ),
              ),
            ),
          );
        };

        /***/
      },

    /***/ './src/admin/TeamMembersTable/TeamMembersTable.tsx':
      /*!*********************************************************!*\
  !*** ./src/admin/TeamMembersTable/TeamMembersTable.tsx ***!
  \*********************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ TeamMembersTable: function () {
            return /* binding */ TeamMembersTable;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/components */ './src/common/components/index.ts');
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var _role_apis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @/role/apis */ './src/role/apis.ts',
        );
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var _RemoveRoleModal__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(/*! ../RemoveRoleModal */ './src/admin/RemoveRoleModal.tsx');
        /* harmony import */ var _RolesSelect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! ./RolesSelect */ './src/admin/TeamMembersTable/RolesSelect.tsx',
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

        var headers = [
          {
            label: 'Name',
            sortKey: 'name',
          },
          {
            label: 'Title',
          },
          {
            label: 'Team',
          },
          {
            label: 'Role',
          },
        ].filter(function (item) {
          return !!item;
        });
        var TeamMembersTable = function TeamMembersTable(_ref) {
          var className = _ref.className,
            users = _ref.users,
            mutate = _ref.mutate;
          var _React$useState = react__WEBPACK_IMPORTED_MODULE_4__.useState(''),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            sort = _React$useState2[0],
            setSort = _React$useState2[1];
          var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_4__.useState(),
            _React$useState4 = _slicedToArray(_React$useState3, 2),
            currentValue = _React$useState4[0],
            setCurrentValue = _React$useState4[1];
          var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_4__.useState(),
            _React$useState6 = _slicedToArray(_React$useState5, 2),
            roleId = _React$useState6[0],
            setRoleId = _React$useState6[1];
          var _React$useState7 = react__WEBPACK_IMPORTED_MODULE_4__.useState(false),
            _React$useState8 = _slicedToArray(_React$useState7, 2),
            disabled = _React$useState8[0],
            setDisabled = _React$useState8[1];
          var _React$useState9 = react__WEBPACK_IMPORTED_MODULE_4__.useState(),
            _React$useState10 = _slicedToArray(_React$useState9, 2),
            id = _React$useState10[0],
            setId = _React$useState10[1];
          var _useHandler = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_1__.useHandler)(function (
              userId,
              roleIds,
            ) {
              return _role_apis__WEBPACK_IMPORTED_MODULE_2__.RoleApis.updateAssigned(userId, {
                roleIds: roleIds,
              });
            }),
            handleUpdateAssignedRoles = _useHandler.handle;
          var removeRoleDisclosure = (0,
          _common_hooks__WEBPACK_IMPORTED_MODULE_1__.useDisclosure)();
          var handleChecking = function handleChecking(id, value, roles) {
            setDisabled(true);
            var arr = roles.map(Number).filter(function (val) {
              return !value.map(Number).includes(val);
            });
            setRoleId(arr[0]);
            if (roles.length <= value.length) {
              handleUpdateAssignedRoles(id, value.map(Number));
              setDisabled(false);
            } else removeRoleDisclosure.open();
          };
          var sortedUsers = users.sort(function (a, b) {
            if (!sort) return 0;
            if (sort !== null && sort !== void 0 && sort.startsWith('-')) {
              if (a.fullName > b.fullName) return -1;
              return 1;
            }
            if (a.fullName > b.fullName) return 1;
            return -1;
          });
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
            'div',
            {
              className:
                'border border-b-0 border-solid border-Gray-28 rounded-2xl overflow-hidden mt-4',
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
              _common_components__WEBPACK_IMPORTED_MODULE_0__.Table.OverflowContainer,
              {
                className: className,
                style: {
                  filter: 'none',
                },
              },
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                _common_components__WEBPACK_IMPORTED_MODULE_0__.Table,
                {
                  onSortChange: setSort,
                  sort: sort,
                },
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                  _common_components__WEBPACK_IMPORTED_MODULE_0__.Table.Body,
                  null,
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                    _common_components__WEBPACK_IMPORTED_MODULE_0__.Table.Row,
                    null,
                    headers.map(function (_ref2) {
                      var label = _ref2.label,
                        sortKey = _ref2.sortKey;
                      return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                        _common_components__WEBPACK_IMPORTED_MODULE_0__.Table.Header,
                        {
                          key: label,
                          sortKey: sortKey,
                        },
                        label,
                      );
                    }),
                  ),
                  sortedUsers.map(function (_ref3) {
                    var id = _ref3.id,
                      fullName = _ref3.fullName,
                      email = _ref3.email,
                      title = _ref3.title,
                      department = _ref3.department,
                      roles = _ref3.roles;
                    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                      _common_components__WEBPACK_IMPORTED_MODULE_0__.Table.Row,
                      {
                        key: id,
                        className: (0, clsx__WEBPACK_IMPORTED_MODULE_3__['default'])(
                          'relative h-14',
                        ),
                      },
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                        _common_components__WEBPACK_IMPORTED_MODULE_0__.Table.Cell,
                        null,
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                          'p',
                          {
                            className: 'text-Gray-3 font-medium',
                          },
                          fullName,
                        ),
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                          'p',
                          null,
                          email,
                        ),
                      ),
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                        _common_components__WEBPACK_IMPORTED_MODULE_0__.Table.Cell,
                        null,
                        title,
                      ),
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                        _common_components__WEBPACK_IMPORTED_MODULE_0__.Table.Cell,
                        null,
                        department === null || department === void 0 ? void 0 : department.name,
                      ),
                      /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                        _common_components__WEBPACK_IMPORTED_MODULE_0__.Table.Cell,
                        null,
                        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                          _RolesSelect__WEBPACK_IMPORTED_MODULE_6__.RolesSelect,
                          {
                            className: 'w-[180px]',
                            disabled: disabled,
                            defaultValue: roles.map(function (_ref4) {
                              var id = _ref4.id;
                              return id.toString();
                            }),
                            onChange: function onChange(value) {
                              return [
                                handleChecking(
                                  id,
                                  value,
                                  roles.map(function (_ref5) {
                                    var id = _ref5.id;
                                    return id.toString();
                                  }),
                                ),
                                setCurrentValue(value),
                                setId(id),
                              ];
                            },
                          },
                        ),
                      ),
                    );
                  }),
                ),
              ),
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__.createElement(
              _RemoveRoleModal__WEBPACK_IMPORTED_MODULE_5__.RemoveRoleModal,
              {
                open: removeRoleDisclosure.isOpen,
                onClose: function onClose() {
                  return [removeRoleDisclosure.close, mutate()];
                },
                onConfirm: function onConfirm() {
                  return [
                    removeRoleDisclosure.close(),
                    handleUpdateAssignedRoles(id, currentValue && currentValue.map(Number)),
                    setDisabled(false),
                  ];
                },
                roleId: roleId,
              },
            ),
          );
        };

        /***/
      },

    /***/ './src/admin/TeamMembersTable/index.ts':
      /*!*********************************************!*\
  !*** ./src/admin/TeamMembersTable/index.ts ***!
  \*********************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ TeamMembersTable: function () {
            return /* reexport safe */ _TeamMembersTable__WEBPACK_IMPORTED_MODULE_0__.TeamMembersTable;
          },
          /* harmony export */
        });
        /* harmony import */ var _TeamMembersTable__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./TeamMembersTable */ './src/admin/TeamMembersTable/TeamMembersTable.tsx',
          );

        /***/
      },

    /***/ './src/common/components/ResettableCheckbox/ResettableCheckbox.tsx':
      /*!*************************************************************************!*\
  !*** ./src/common/components/ResettableCheckbox/ResettableCheckbox.tsx ***!
  \*************************************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ ResettableCheckbox: function () {
            return /* binding */ ResettableCheckbox;
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
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        var _excluded = ['resettable', 'onChange', 'label', 'checked', 'value', 'onToggle'];
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

        var ResettableCheckbox = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.memo(function (
          _ref,
        ) {
          var resettable = _ref.resettable,
            onChange = _ref.onChange,
            label = _ref.label,
            checked = _ref.checked,
            value = _ref.value,
            onToggle = _ref.onToggle,
            restProps = _objectWithoutProperties(_ref, _excluded);
          var checkedDisclosure = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_2__.useDisclosure)();
          var isChecked =
            checked !== null && checked !== void 0 ? checked : checkedDisclosure.isOpen;
          var handleChange = function handleChange(e) {
            onChange === null || onChange === void 0 ? void 0 : onChange(e);
            onToggle === null || onToggle === void 0 ? void 0 : onToggle(e.target.value);
            checkedDisclosure.set(e.target.checked);
          };
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
            _common_components__WEBPACK_IMPORTED_MODULE_1__.Checkbox,
            _extends({}, restProps, {
              checked: isChecked,
              onChange: handleChange,
              colorScheme: resettable ? 'accent' : undefined,
              value: value,
              label: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                'div',
                {
                  className: '',
                },
                label,
                resettable &&
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(
                    _assets__WEBPACK_IMPORTED_MODULE_0__.AntiClockwiseIcon,
                    {
                      className: 'inline ml-2 text-Gray-2',
                    },
                  ),
              ),
            }),
          );
        });
        ResettableCheckbox.displayName = 'ResettableCheckbox';

        /***/
      },

    /***/ './src/common/components/ResettableCheckbox/index.ts':
      /*!***********************************************************!*\
  !*** ./src/common/components/ResettableCheckbox/index.ts ***!
  \***********************************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ ResettableCheckbox: function () {
            return /* reexport safe */ _ResettableCheckbox__WEBPACK_IMPORTED_MODULE_0__.ResettableCheckbox;
          },
          /* harmony export */
        });
        /* harmony import */ var _ResettableCheckbox__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./ResettableCheckbox */ './src/common/components/ResettableCheckbox/ResettableCheckbox.tsx',
          );

        /***/
      },

    /***/ './src/profile/useUsers.ts':
      /*!*********************************!*\
  !*** ./src/profile/useUsers.ts ***!
  \*********************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ useUsers: function () {
            return /* binding */ useUsers;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/constants */ './src/common/constants.ts');
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var _apis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! ./apis */ './src/profile/apis.ts',
        );

        var useUsers = function useUsers(params) {
          var _useFetcher = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_1__.useFetcher)(
              ['users'],
              function () {
                return _apis__WEBPACK_IMPORTED_MODULE_3__.ProfileApis.getUsers(params);
              },
            ),
            _useFetcher$data = _useFetcher.data,
            data =
              _useFetcher$data === void 0
                ? _common_constants__WEBPACK_IMPORTED_MODULE_0__.EMPTY_ARRAY
                : _useFetcher$data,
            isInitializing = _useFetcher.isInitializing,
            isLagging = _useFetcher.isLagging,
            isValidating = _useFetcher.isValidating,
            mutate = _useFetcher.mutate;
          return react__WEBPACK_IMPORTED_MODULE_2__.useMemo(
            function () {
              return {
                users: data,
                isInitializingUsers: isInitializing,
                isLaggingUsers: isLagging,
                isValidatingUsers: isValidating,
                mutateUsers: mutate,
              };
            },
            [data, isInitializing, isLagging, isValidating, mutate],
          );
        };

        /***/
      },

    /***/ './src/role/apis.ts':
      /*!**************************!*\
  !*** ./src/role/apis.ts ***!
  \**************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ RoleApis: function () {
            return /* binding */ RoleApis;
          },
          /* harmony export */
        });
        /* harmony import */ var _rest_apis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/rest/apis */ './src/rest/apis.ts',
        );
        /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! ./utils */ './src/role/utils.ts',
        );

        var get = function get(id) {
          return _rest_apis__WEBPACK_IMPORTED_MODULE_0__.RestApis.get(
            '/rbac/roles/'.concat(id),
          ).then(_utils__WEBPACK_IMPORTED_MODULE_1__.transformRoleResponse);
        };
        var getList = function getList() {
          return _rest_apis__WEBPACK_IMPORTED_MODULE_0__.RestApis.get('/rbac/roles').then(function (
            roles,
          ) {
            return roles.map(_utils__WEBPACK_IMPORTED_MODULE_1__.transformRoleResponse);
          });
        };
        var create = function create(payload) {
          return _rest_apis__WEBPACK_IMPORTED_MODULE_0__.RestApis.post('/rbac/roles', payload);
        };
        var update = function update(id, payload) {
          return _rest_apis__WEBPACK_IMPORTED_MODULE_0__.RestApis.put(
            '/rbac/roles/'.concat(id),
            payload,
          );
        };
        var _delete = function _delete(id) {
          return _rest_apis__WEBPACK_IMPORTED_MODULE_0__.RestApis['delete'](
            '/rbac/roles/'.concat(id),
          );
        };
        var updateAssigned = function updateAssigned(id, payload) {
          return _rest_apis__WEBPACK_IMPORTED_MODULE_0__.RestApis.put(
            '/rbac/accounts/'.concat(id, '/roles'),
            payload,
          );
        };
        var getCategories = function getCategories() {
          return _rest_apis__WEBPACK_IMPORTED_MODULE_0__.RestApis.get('/rbac/categories');
        };
        var getDepartments = function getDepartments() {
          return _rest_apis__WEBPACK_IMPORTED_MODULE_0__.RestApis.get('/rbac/departments');
        };
        var getVendors = function getVendors() {
          return _rest_apis__WEBPACK_IMPORTED_MODULE_0__.RestApis.get('/rbac/vendors');
        };
        var getRestrictedItems = function getRestrictedItems() {
          return _rest_apis__WEBPACK_IMPORTED_MODULE_0__.RestApis.get(
            '/rbac/items?type=restricted',
          );
        };
        var RoleApis = {
          get: get,
          getList: getList,
          create: create,
          update: update,
          delete: _delete,
          updateAssigned: updateAssigned,
          getCategories: getCategories,
          getDepartments: getDepartments,
          getVendors: getVendors,
          getRestrictedItems: getRestrictedItems,
        };

        /***/
      },

    /***/ './src/role/useAssignableCategories.ts':
      /*!*********************************************!*\
  !*** ./src/role/useAssignableCategories.ts ***!
  \*********************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ useAssignableCategories: function () {
            return /* binding */ useAssignableCategories;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/constants */ './src/common/constants.ts');
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var _apis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! ./apis */ './src/role/apis.ts',
        );

        var useAssignableCategories = function useAssignableCategories() {
          var _useFetcher = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_1__.useFetcher)(
              ['useAssignableCategories'],
              function () {
                return _apis__WEBPACK_IMPORTED_MODULE_3__.RoleApis.getCategories();
              },
            ),
            _useFetcher$data = _useFetcher.data,
            data =
              _useFetcher$data === void 0
                ? _common_constants__WEBPACK_IMPORTED_MODULE_0__.EMPTY_ARRAY
                : _useFetcher$data,
            isInitializing = _useFetcher.isInitializing,
            isLagging = _useFetcher.isLagging,
            isValidating = _useFetcher.isValidating,
            mutate = _useFetcher.mutate;
          return react__WEBPACK_IMPORTED_MODULE_2__.useMemo(
            function () {
              return {
                assignableCategories: data,
                isInitializingAssignableCategories: isInitializing,
                isLaggingAssignableCategories: isLagging,
                isValidatingAssignableCategories: isValidating,
                mutateAssignableCategories: mutate,
              };
            },
            [data, isInitializing, isLagging, isValidating, mutate],
          );
        };

        /***/
      },

    /***/ './src/role/useAssignableDepartments.ts':
      /*!**********************************************!*\
  !*** ./src/role/useAssignableDepartments.ts ***!
  \**********************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ useAssignableDepartments: function () {
            return /* binding */ useAssignableDepartments;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/constants */ './src/common/constants.ts');
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var _apis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! ./apis */ './src/role/apis.ts',
        );

        var useAssignableDepartments = function useAssignableDepartments() {
          var _useFetcher = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_1__.useFetcher)(
              ['useAssignableDepartments'],
              function () {
                return _apis__WEBPACK_IMPORTED_MODULE_3__.RoleApis.getDepartments();
              },
            ),
            _useFetcher$data = _useFetcher.data,
            data =
              _useFetcher$data === void 0
                ? _common_constants__WEBPACK_IMPORTED_MODULE_0__.EMPTY_ARRAY
                : _useFetcher$data,
            isInitializing = _useFetcher.isInitializing,
            isLagging = _useFetcher.isLagging,
            isValidating = _useFetcher.isValidating,
            mutate = _useFetcher.mutate;
          return react__WEBPACK_IMPORTED_MODULE_2__.useMemo(
            function () {
              return {
                assignableDepartments: data,
                isInitializingAssignableDepartments: isInitializing,
                isLaggingAssignableDepartments: isLagging,
                isValidatingAssignableDepartments: isValidating,
                mutateAssignableDepartments: mutate,
              };
            },
            [data, isInitializing, isLagging, isValidating, mutate],
          );
        };

        /***/
      },

    /***/ './src/role/useAssignableVendors.ts':
      /*!******************************************!*\
  !*** ./src/role/useAssignableVendors.ts ***!
  \******************************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ useAssignableVendors: function () {
            return /* binding */ useAssignableVendors;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/constants */ './src/common/constants.ts');
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var _apis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! ./apis */ './src/role/apis.ts',
        );

        var useAssignableVendors = function useAssignableVendors() {
          var _useFetcher = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_1__.useFetcher)(
              ['useAssignableVendors'],
              function () {
                return _apis__WEBPACK_IMPORTED_MODULE_3__.RoleApis.getVendors();
              },
            ),
            _useFetcher$data = _useFetcher.data,
            data =
              _useFetcher$data === void 0
                ? _common_constants__WEBPACK_IMPORTED_MODULE_0__.EMPTY_ARRAY
                : _useFetcher$data,
            isInitializing = _useFetcher.isInitializing,
            isLagging = _useFetcher.isLagging,
            isValidating = _useFetcher.isValidating,
            mutate = _useFetcher.mutate;
          return react__WEBPACK_IMPORTED_MODULE_2__.useMemo(
            function () {
              return {
                assignableVendors: data,
                isInitializingAssignableVendors: isInitializing,
                isLaggingAssignableVendors: isLagging,
                isValidatingAssignableVendors: isValidating,
                mutateAssignableVendors: mutate,
              };
            },
            [data, isInitializing, isLagging, isValidating, mutate],
          );
        };

        /***/
      },

    /***/ './src/role/useRole.ts':
      /*!*****************************!*\
  !*** ./src/role/useRole.ts ***!
  \*****************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ useRole: function () {
            return /* binding */ useRole;
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
          /*! ./apis */ './src/role/apis.ts',
        );

        var useRole = function useRole(id) {
          var _useFetcher = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_0__.useFetcher)(
              !_common_utils__WEBPACK_IMPORTED_MODULE_1__.AssertUtils.isNullOrUndefined(id) && [
                'useRole',
                id,
              ],
              function () {
                return _apis__WEBPACK_IMPORTED_MODULE_3__.RoleApis.get(id);
              },
            ),
            data = _useFetcher.data,
            isInitializing = _useFetcher.isInitializing,
            isLagging = _useFetcher.isLagging,
            isValidating = _useFetcher.isValidating,
            mutate = _useFetcher.mutate;
          return react__WEBPACK_IMPORTED_MODULE_2__.useMemo(
            function () {
              return {
                role: data,
                isInitializingRole: isInitializing,
                isLaggingRole: isLagging,
                isValidatingRole: isValidating,
                mutateRole: mutate,
              };
            },
            [data, isInitializing, isLagging, isValidating, mutate],
          );
        };

        /***/
      },

    /***/ './src/role/useRoles.ts':
      /*!******************************!*\
  !*** ./src/role/useRoles.ts ***!
  \******************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ useRoles: function () {
            return /* binding */ useRoles;
          },
          /* harmony export */
        });
        /* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! @/common/constants */ './src/common/constants.ts');
        /* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @/common/hooks */ './src/common/hooks/index.ts',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var _apis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! ./apis */ './src/role/apis.ts',
        );

        var useRoles = function useRoles() {
          var _useFetcher = (0, _common_hooks__WEBPACK_IMPORTED_MODULE_1__.useFetcher)(
              ['useRoles'],
              function () {
                return _apis__WEBPACK_IMPORTED_MODULE_3__.RoleApis.getList();
              },
            ),
            _useFetcher$data = _useFetcher.data,
            data =
              _useFetcher$data === void 0
                ? _common_constants__WEBPACK_IMPORTED_MODULE_0__.EMPTY_ARRAY
                : _useFetcher$data,
            isInitializing = _useFetcher.isInitializing,
            isLagging = _useFetcher.isLagging,
            isValidating = _useFetcher.isValidating,
            mutate = _useFetcher.mutate;
          return react__WEBPACK_IMPORTED_MODULE_2__.useMemo(
            function () {
              return {
                roles: data,
                isInitializingRoles: isInitializing,
                isLaggingRoles: isLagging,
                isValidatingRoles: isValidating,
                mutateRoles: mutate,
              };
            },
            [data, isInitializing, isLagging, isValidating, mutate],
          );
        };

        /***/
      },

    /***/ './src/role/utils.ts':
      /*!***************************!*\
  !*** ./src/role/utils.ts ***!
  \***************************/
      /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ isAdmin: function () {
            return /* binding */ isAdmin;
          },
          /* harmony export */ isBaseUser: function () {
            return /* binding */ isBaseUser;
          },
          /* harmony export */ transformRoleResponse: function () {
            return /* binding */ transformRoleResponse;
          },
          /* harmony export */
        });
        /* harmony import */ var _auth_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @/auth/constants */ './src/auth/constants.ts',
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

        var transformVisibilityConfig = function transformVisibilityConfig(config) {
          return _objectSpread(
            _objectSpread({}, config),
            {},
            {
              default: config.resettable ? !config.visible : config.visible,
            },
          );
        };
        var transformRoleResponse = function transformRoleResponse(data) {
          var categories = data.categories,
            departments = data.departments,
            vendors = data.vendors;
          return _objectSpread(
            _objectSpread({}, data),
            {},
            {
              categories:
                categories === null || categories === void 0
                  ? void 0
                  : categories.map(transformVisibilityConfig),
              departments:
                departments === null || departments === void 0
                  ? void 0
                  : departments.map(transformVisibilityConfig),
              vendors:
                vendors === null || vendors === void 0
                  ? void 0
                  : vendors.map(transformVisibilityConfig),
            },
          );
        };
        var isAdmin = function isAdmin(role) {
          return role.name === _auth_constants__WEBPACK_IMPORTED_MODULE_0__.UserRole.ADMIN;
        };
        var isBaseUser = function isBaseUser(role) {
          return role.id === 0;
        };

        /***/
      },
  },
]);
//# sourceMappingURL=src_admin_AdminPage_tsx.bundle.js.map
