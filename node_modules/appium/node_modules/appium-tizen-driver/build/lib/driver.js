"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TizenDriver = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _appiumBaseDriver = require("appium-base-driver");

var _desiredCaps = _interopRequireDefault(require("./desired-caps"));

var _index = _interopRequireDefault(require("./commands/index"));

var _tizenHelpers = _interopRequireDefault(require("./tizen-helpers"));

var _tizenBootstrap = _interopRequireDefault(require("./tizen-bootstrap.js"));

var _logger = _interopRequireDefault(require("./logger"));

var _lodash = _interopRequireDefault(require("lodash"));

var _appiumSdb = require("appium-sdb");

var _appiumSupport = require("appium-support");

const BOOTSTRAP_PORT = 8888;
const NO_PROXY = [['POST', new RegExp('^/session/[^/]+/appium')], ['GET', new RegExp('^/session/[^/]+/appium')]];

class TizenDriver extends _appiumBaseDriver.BaseDriver {
  constructor(opts = {}, shouldValidateCaps = true) {
    super(opts, shouldValidateCaps);
    this.locatorStrategies = ['id', 'accessibility id', 'class name', 'name'];
    this.desiredCapConstraints = _desiredCaps.default;
    this.jwpProxyActive = false;
    this.jwpProxyAvoid = _lodash.default.clone(NO_PROXY);
    this.settings = new _appiumBaseDriver.DeviceSettings({
      ignoreUnimportantViews: false
    });
    this.bootstrapPort = BOOTSTRAP_PORT;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _lodash.default.toPairs(_index.default)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        let _step$value = (0, _slicedToArray2.default)(_step.value, 2),
            cmd = _step$value[0],
            fn = _step$value[1];

        TizenDriver.prototype[cmd] = fn;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  createSession(caps) {
    var _this = this,
        _superprop_callCreateSession = (..._args) => super.createSession(..._args);

    return (0, _asyncToGenerator2.default)(function* () {
      try {
        let sessionId;

        var _ref = yield _superprop_callCreateSession(caps);

        var _ref2 = (0, _slicedToArray2.default)(_ref, 1);

        sessionId = _ref2[0];
        let serverDetails = {
          platform: 'LINUX',
          webStorageEnabled: false,
          takesScreenshot: false,
          javascriptEnabled: true,
          databaseEnabled: false,
          networkConnectionEnabled: false,
          locationContextEnabled: false,
          warnings: {},
          desired: _this.caps
        };
        _this.caps = Object.assign(serverDetails, _this.caps);
        let defaultOpts = {
          tmpDir: yield _appiumSupport.tempDir.staticDir(),
          fullReset: false,
          sdbPort: _appiumSdb.DEFAULT_SDB_PORT,
          tizenInstallTimeout: 50000
        };

        _lodash.default.defaults(_this.opts, defaultOpts);

        if (_this.opts.noReset === true) {
          _this.opts.fullReset = false;
        }

        if (_this.opts.fullReset === true) {
          _this.opts.noReset = false;
        }

        _this.opts.fastReset = !_this.opts.fullReset && !_this.opts.noReset;
        _this.opts.skipUninstall = _this.opts.fastReset || _this.opts.noReset;

        let _ref3 = yield _tizenHelpers.default.getDeviceInfoFromCaps(_this.opts),
            udid = _ref3.udid,
            emPort = _ref3.emPort;

        _this.opts.udid = udid;
        _this.opts.emPort = emPort;
        _this.sdb = yield _tizenHelpers.default.createSDB(_this.opts.udid, _this.opts.emPort, _this.opts.sdbPort, _this.opts.suppressKillServer);
        yield _this.startTizenSession(_this.opts);
        return [sessionId, _this.caps];
      } catch (e) {
        try {
          yield _this.deleteSession();
        } catch (ign) {}

        throw e;
      }
    })();
  }

  get appOnDevice() {
    return this.helpers.isPackageOrBundle(this.opts.appPackage);
  }

  startTizenSession() {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      if (_this2.opts.app) {
        yield _this2.installApp(_this2.opts.app);
      }

      let isAppInstalled = yield _this2.isAppInstalled(_this2.opts.appPackage);

      if (!isAppInstalled) {
        _logger.default.errorAndThrow('Could not find to App in device.');
      }

      if (_this2.opts.appPackage) {
        let isStartedApp = yield _this2.isStartedApp();

        if (isStartedApp) {
          yield _this2.closeApp();
        }

        yield _this2.startApp({
          timeout: 20000
        });
      }

      _this2.bootstrap = new _tizenBootstrap.default(_this2.sdb, _this2.bootstrapPort, _this2.opts);
      yield _this2.bootstrap.start(_this2.opts.appPackage);

      if (_this2.opts.ignoreUnimportantViews) {
        yield _this2.settings.update({
          ignoreUnimportantViews: _this2.opts.ignoreUnimportantViews
        });
      }
    })();
  }

  checkPackagePresent() {
    var _this3 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      _logger.default.debug("Checking whether package is present on the device");

      if (!(yield _this3.sdb.shell([`app_launcher --list | grep ${_this3.opts.appPackage}`]))) {
        _logger.default.errorAndThrow(`Could not find package ${_this3.opts.appPackage} on the device`);
      }
    })();
  }

  deleteSession() {
    var _this4 = this,
        _superprop_callDeleteSession = (..._args2) => super.deleteSession(..._args2);

    return (0, _asyncToGenerator2.default)(function* () {
      _logger.default.debug("Shutting down Tizen driver");

      yield _superprop_callDeleteSession();

      if (_this4.bootstrap) {
        yield _this4.sdb.forceStop(_this4.opts.appPackage);

        if (_this4.opts.fullReset && !_this4.opts.skipUninstall && !_this4.appOnDevice) {
          yield _this4.sdb.uninstall(_this4.opts.appPackage);
        }

        yield _this4.bootstrap.shutdown();
        _this4.bootstrap = null;
      } else {
        _logger.default.debug("Called deleteSession but bootstrap wasn't active");
      }
    })();
  }

  validateDesiredCaps(caps) {
    let res = super.validateDesiredCaps(caps);

    if (!res) {
      return res;
    }

    if (!caps.appPackage) {
      let msg = 'The desired capabilities must include an appPackage';

      _logger.default.errorAndThrow(msg);
    }
  }

  proxyActive(sessionId) {
    super.proxyActive(sessionId);
    return this.jwpProxyActive;
  }

  getProxyAvoidList(sessionId) {
    super.getProxyAvoidList(sessionId);
    return this.jwpProxyAvoid;
  }

  canProxy(sessionId) {
    super.canProxy(sessionId);
    return false;
  }

}

exports.TizenDriver = TizenDriver;
var _default = TizenDriver;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9kcml2ZXIuanMiXSwibmFtZXMiOlsiQk9PVFNUUkFQX1BPUlQiLCJOT19QUk9YWSIsIlJlZ0V4cCIsIlRpemVuRHJpdmVyIiwiQmFzZURyaXZlciIsImNvbnN0cnVjdG9yIiwib3B0cyIsInNob3VsZFZhbGlkYXRlQ2FwcyIsImxvY2F0b3JTdHJhdGVnaWVzIiwiZGVzaXJlZENhcENvbnN0cmFpbnRzIiwiZGVzaXJlZENvbnN0cmFpbnRzIiwiandwUHJveHlBY3RpdmUiLCJqd3BQcm94eUF2b2lkIiwiXyIsImNsb25lIiwic2V0dGluZ3MiLCJEZXZpY2VTZXR0aW5ncyIsImlnbm9yZVVuaW1wb3J0YW50Vmlld3MiLCJib290c3RyYXBQb3J0IiwidG9QYWlycyIsImNvbW1hbmRzIiwiY21kIiwiZm4iLCJwcm90b3R5cGUiLCJjcmVhdGVTZXNzaW9uIiwiY2FwcyIsInNlc3Npb25JZCIsInNlcnZlckRldGFpbHMiLCJwbGF0Zm9ybSIsIndlYlN0b3JhZ2VFbmFibGVkIiwidGFrZXNTY3JlZW5zaG90IiwiamF2YXNjcmlwdEVuYWJsZWQiLCJkYXRhYmFzZUVuYWJsZWQiLCJuZXR3b3JrQ29ubmVjdGlvbkVuYWJsZWQiLCJsb2NhdGlvbkNvbnRleHRFbmFibGVkIiwid2FybmluZ3MiLCJkZXNpcmVkIiwiT2JqZWN0IiwiYXNzaWduIiwiZGVmYXVsdE9wdHMiLCJ0bXBEaXIiLCJ0ZW1wRGlyIiwic3RhdGljRGlyIiwiZnVsbFJlc2V0Iiwic2RiUG9ydCIsIkRFRkFVTFRfU0RCX1BPUlQiLCJ0aXplbkluc3RhbGxUaW1lb3V0IiwiZGVmYXVsdHMiLCJub1Jlc2V0IiwiZmFzdFJlc2V0Iiwic2tpcFVuaW5zdGFsbCIsImhlbHBlcnMiLCJnZXREZXZpY2VJbmZvRnJvbUNhcHMiLCJ1ZGlkIiwiZW1Qb3J0Iiwic2RiIiwiY3JlYXRlU0RCIiwic3VwcHJlc3NLaWxsU2VydmVyIiwic3RhcnRUaXplblNlc3Npb24iLCJlIiwiZGVsZXRlU2Vzc2lvbiIsImlnbiIsImFwcE9uRGV2aWNlIiwiaXNQYWNrYWdlT3JCdW5kbGUiLCJhcHBQYWNrYWdlIiwiYXBwIiwiaW5zdGFsbEFwcCIsImlzQXBwSW5zdGFsbGVkIiwibG9nIiwiZXJyb3JBbmRUaHJvdyIsImlzU3RhcnRlZEFwcCIsImNsb3NlQXBwIiwic3RhcnRBcHAiLCJ0aW1lb3V0IiwiYm9vdHN0cmFwIiwiQm9vdHN0cmFwIiwic3RhcnQiLCJ1cGRhdGUiLCJjaGVja1BhY2thZ2VQcmVzZW50IiwiZGVidWciLCJzaGVsbCIsImZvcmNlU3RvcCIsInVuaW5zdGFsbCIsInNodXRkb3duIiwidmFsaWRhdGVEZXNpcmVkQ2FwcyIsInJlcyIsIm1zZyIsInByb3h5QWN0aXZlIiwiZ2V0UHJveHlBdm9pZExpc3QiLCJjYW5Qcm94eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBLE1BQU1BLGNBQWMsR0FBRyxJQUF2QjtBQUNBLE1BQU1DLFFBQVEsR0FBRyxDQUNmLENBQUMsTUFBRCxFQUFTLElBQUlDLE1BQUosQ0FBVyx3QkFBWCxDQUFULENBRGUsRUFFZixDQUFDLEtBQUQsRUFBUSxJQUFJQSxNQUFKLENBQVcsd0JBQVgsQ0FBUixDQUZlLENBQWpCOztBQUtBLE1BQU1DLFdBQU4sU0FBMEJDLDRCQUExQixDQUFxQztBQUNuQ0MsRUFBQUEsV0FBVyxDQUFFQyxJQUFJLEdBQUcsRUFBVCxFQUFhQyxrQkFBa0IsR0FBRyxJQUFsQyxFQUF3QztBQUNqRCxVQUFNRCxJQUFOLEVBQVlDLGtCQUFaO0FBRUEsU0FBS0MsaUJBQUwsR0FBeUIsQ0FDdkIsSUFEdUIsRUFFdkIsa0JBRnVCLEVBR3ZCLFlBSHVCLEVBSXZCLE1BSnVCLENBQXpCO0FBT0EsU0FBS0MscUJBQUwsR0FBNkJDLG9CQUE3QjtBQUNBLFNBQUtDLGNBQUwsR0FBc0IsS0FBdEI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCQyxnQkFBRUMsS0FBRixDQUFRYixRQUFSLENBQXJCO0FBQ0EsU0FBS2MsUUFBTCxHQUFnQixJQUFJQyxnQ0FBSixDQUFtQjtBQUFDQyxNQUFBQSxzQkFBc0IsRUFBRTtBQUF6QixLQUFuQixDQUFoQjtBQUNBLFNBQUtDLGFBQUwsR0FBcUJsQixjQUFyQjtBQWRpRDtBQUFBO0FBQUE7O0FBQUE7QUFnQmpELDJCQUFzQmEsZ0JBQUVNLE9BQUYsQ0FBVUMsY0FBVixDQUF0Qiw4SEFBMkM7QUFBQTtBQUFBLFlBQWpDQyxHQUFpQztBQUFBLFlBQTVCQyxFQUE0Qjs7QUFDekNuQixRQUFBQSxXQUFXLENBQUNvQixTQUFaLENBQXNCRixHQUF0QixJQUE2QkMsRUFBN0I7QUFDRDtBQWxCZ0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQW1CbEQ7O0FBRUtFLEVBQUFBLGFBQU4sQ0FBcUJDLElBQXJCLEVBQTJCO0FBQUE7QUFBQTs7QUFBQTtBQUN6QixVQUFJO0FBQ0YsWUFBSUMsU0FBSjs7QUFERSx5QkFFa0IsNkJBQW9CRCxJQUFwQixDQUZsQjs7QUFBQTs7QUFFREMsUUFBQUEsU0FGQztBQUlGLFlBQUlDLGFBQWEsR0FBRztBQUFDQyxVQUFBQSxRQUFRLEVBQUUsT0FBWDtBQUNDQyxVQUFBQSxpQkFBaUIsRUFBRSxLQURwQjtBQUVDQyxVQUFBQSxlQUFlLEVBQUUsS0FGbEI7QUFHQ0MsVUFBQUEsaUJBQWlCLEVBQUUsSUFIcEI7QUFJQ0MsVUFBQUEsZUFBZSxFQUFFLEtBSmxCO0FBS0NDLFVBQUFBLHdCQUF3QixFQUFFLEtBTDNCO0FBTUNDLFVBQUFBLHNCQUFzQixFQUFFLEtBTnpCO0FBT0NDLFVBQUFBLFFBQVEsRUFBRSxFQVBYO0FBUUNDLFVBQUFBLE9BQU8sRUFBRSxLQUFJLENBQUNYO0FBUmYsU0FBcEI7QUFTQSxRQUFBLEtBQUksQ0FBQ0EsSUFBTCxHQUFZWSxNQUFNLENBQUNDLE1BQVAsQ0FBY1gsYUFBZCxFQUE2QixLQUFJLENBQUNGLElBQWxDLENBQVo7QUFFQSxZQUFJYyxXQUFXLEdBQUc7QUFDaEJDLFVBQUFBLE1BQU0sUUFBUUMsdUJBQVFDLFNBQVIsRUFERTtBQUVoQkMsVUFBQUEsU0FBUyxFQUFFLEtBRks7QUFHaEJDLFVBQUFBLE9BQU8sRUFBRUMsMkJBSE87QUFJaEJDLFVBQUFBLG1CQUFtQixFQUFFO0FBSkwsU0FBbEI7O0FBTUFqQyx3QkFBRWtDLFFBQUYsQ0FBVyxLQUFJLENBQUN6QyxJQUFoQixFQUFzQmlDLFdBQXRCOztBQUVBLFlBQUksS0FBSSxDQUFDakMsSUFBTCxDQUFVMEMsT0FBVixLQUFzQixJQUExQixFQUFnQztBQUM5QixVQUFBLEtBQUksQ0FBQzFDLElBQUwsQ0FBVXFDLFNBQVYsR0FBc0IsS0FBdEI7QUFDRDs7QUFDRCxZQUFJLEtBQUksQ0FBQ3JDLElBQUwsQ0FBVXFDLFNBQVYsS0FBd0IsSUFBNUIsRUFBa0M7QUFDaEMsVUFBQSxLQUFJLENBQUNyQyxJQUFMLENBQVUwQyxPQUFWLEdBQW9CLEtBQXBCO0FBQ0Q7O0FBQ0QsUUFBQSxLQUFJLENBQUMxQyxJQUFMLENBQVUyQyxTQUFWLEdBQXNCLENBQUMsS0FBSSxDQUFDM0MsSUFBTCxDQUFVcUMsU0FBWCxJQUF3QixDQUFDLEtBQUksQ0FBQ3JDLElBQUwsQ0FBVTBDLE9BQXpEO0FBQ0EsUUFBQSxLQUFJLENBQUMxQyxJQUFMLENBQVU0QyxhQUFWLEdBQTBCLEtBQUksQ0FBQzVDLElBQUwsQ0FBVTJDLFNBQVYsSUFBdUIsS0FBSSxDQUFDM0MsSUFBTCxDQUFVMEMsT0FBM0Q7O0FBOUJFLDBCQWdDeUJHLHNCQUFRQyxxQkFBUixDQUE4QixLQUFJLENBQUM5QyxJQUFuQyxDQWhDekI7QUFBQSxZQWdDRytDLElBaENILFNBZ0NHQSxJQWhDSDtBQUFBLFlBZ0NTQyxNQWhDVCxTQWdDU0EsTUFoQ1Q7O0FBaUNGLFFBQUEsS0FBSSxDQUFDaEQsSUFBTCxDQUFVK0MsSUFBVixHQUFpQkEsSUFBakI7QUFDQSxRQUFBLEtBQUksQ0FBQy9DLElBQUwsQ0FBVWdELE1BQVYsR0FBbUJBLE1BQW5CO0FBRUEsUUFBQSxLQUFJLENBQUNDLEdBQUwsU0FBaUJKLHNCQUFRSyxTQUFSLENBQWtCLEtBQUksQ0FBQ2xELElBQUwsQ0FBVStDLElBQTVCLEVBQ2tCLEtBQUksQ0FBQy9DLElBQUwsQ0FBVWdELE1BRDVCLEVBRWtCLEtBQUksQ0FBQ2hELElBQUwsQ0FBVXNDLE9BRjVCLEVBR2tCLEtBQUksQ0FBQ3RDLElBQUwsQ0FBVW1ELGtCQUg1QixDQUFqQjtBQUtBLGNBQU0sS0FBSSxDQUFDQyxpQkFBTCxDQUF1QixLQUFJLENBQUNwRCxJQUE1QixDQUFOO0FBQ0EsZUFBTyxDQUFDb0IsU0FBRCxFQUFZLEtBQUksQ0FBQ0QsSUFBakIsQ0FBUDtBQUNELE9BM0NELENBMkNFLE9BQU9rQyxDQUFQLEVBQVU7QUFDVixZQUFJO0FBQ0YsZ0JBQU0sS0FBSSxDQUFDQyxhQUFMLEVBQU47QUFDRCxTQUZELENBRUUsT0FBT0MsR0FBUCxFQUFZLENBQUU7O0FBQ2hCLGNBQU1GLENBQU47QUFDRDtBQWpEd0I7QUFrRDFCOztBQUVELE1BQUlHLFdBQUosR0FBbUI7QUFDakIsV0FBTyxLQUFLWCxPQUFMLENBQWFZLGlCQUFiLENBQStCLEtBQUt6RCxJQUFMLENBQVUwRCxVQUF6QyxDQUFQO0FBQ0Q7O0FBRUtOLEVBQUFBLGlCQUFOLEdBQTJCO0FBQUE7O0FBQUE7QUFDekIsVUFBSSxNQUFJLENBQUNwRCxJQUFMLENBQVUyRCxHQUFkLEVBQW1CO0FBQ2pCLGNBQU0sTUFBSSxDQUFDQyxVQUFMLENBQWdCLE1BQUksQ0FBQzVELElBQUwsQ0FBVTJELEdBQTFCLENBQU47QUFDRDs7QUFDRCxVQUFJRSxjQUFjLFNBQVMsTUFBSSxDQUFDQSxjQUFMLENBQW9CLE1BQUksQ0FBQzdELElBQUwsQ0FBVTBELFVBQTlCLENBQTNCOztBQUNBLFVBQUksQ0FBQ0csY0FBTCxFQUFxQjtBQUNuQkMsd0JBQUlDLGFBQUosQ0FBa0Isa0NBQWxCO0FBQ0Q7O0FBQ0QsVUFBSSxNQUFJLENBQUMvRCxJQUFMLENBQVUwRCxVQUFkLEVBQTBCO0FBQ3hCLFlBQUlNLFlBQVksU0FBUyxNQUFJLENBQUNBLFlBQUwsRUFBekI7O0FBQ0EsWUFBSUEsWUFBSixFQUFrQjtBQUNoQixnQkFBTSxNQUFJLENBQUNDLFFBQUwsRUFBTjtBQUNEOztBQUNELGNBQU0sTUFBSSxDQUFDQyxRQUFMLENBQWM7QUFBRUMsVUFBQUEsT0FBTyxFQUFFO0FBQVgsU0FBZCxDQUFOO0FBQ0Q7O0FBRUQsTUFBQSxNQUFJLENBQUNDLFNBQUwsR0FBaUIsSUFBSUMsdUJBQUosQ0FBYyxNQUFJLENBQUNwQixHQUFuQixFQUF3QixNQUFJLENBQUNyQyxhQUE3QixFQUE0QyxNQUFJLENBQUNaLElBQWpELENBQWpCO0FBQ0EsWUFBTSxNQUFJLENBQUNvRSxTQUFMLENBQWVFLEtBQWYsQ0FBcUIsTUFBSSxDQUFDdEUsSUFBTCxDQUFVMEQsVUFBL0IsQ0FBTjs7QUFFQSxVQUFJLE1BQUksQ0FBQzFELElBQUwsQ0FBVVcsc0JBQWQsRUFBc0M7QUFDcEMsY0FBTSxNQUFJLENBQUNGLFFBQUwsQ0FBYzhELE1BQWQsQ0FBcUI7QUFBQzVELFVBQUFBLHNCQUFzQixFQUFFLE1BQUksQ0FBQ1gsSUFBTCxDQUFVVztBQUFuQyxTQUFyQixDQUFOO0FBQ0Q7QUFyQndCO0FBc0IxQjs7QUFFSzZELEVBQUFBLG1CQUFOLEdBQTZCO0FBQUE7O0FBQUE7QUFDM0JWLHNCQUFJVyxLQUFKLENBQVUsbURBQVY7O0FBQ0EsVUFBSSxRQUFRLE1BQUksQ0FBQ3hCLEdBQUwsQ0FBU3lCLEtBQVQsQ0FBZSxDQUFFLDhCQUE2QixNQUFJLENBQUMxRSxJQUFMLENBQVUwRCxVQUFXLEVBQXBELENBQWYsQ0FBUixDQUFKLEVBQXFGO0FBQ25GSSx3QkFBSUMsYUFBSixDQUFtQiwwQkFBeUIsTUFBSSxDQUFDL0QsSUFBTCxDQUFVMEQsVUFBVyxnQkFBakU7QUFDRDtBQUowQjtBQUs1Qjs7QUFFS0osRUFBQUEsYUFBTixHQUF1QjtBQUFBO0FBQUE7O0FBQUE7QUFDckJRLHNCQUFJVyxLQUFKLENBQVUsNEJBQVY7O0FBQ0EsWUFBTSw4QkFBTjs7QUFDQSxVQUFJLE1BQUksQ0FBQ0wsU0FBVCxFQUFvQjtBQUNsQixjQUFNLE1BQUksQ0FBQ25CLEdBQUwsQ0FBUzBCLFNBQVQsQ0FBbUIsTUFBSSxDQUFDM0UsSUFBTCxDQUFVMEQsVUFBN0IsQ0FBTjs7QUFDQSxZQUFJLE1BQUksQ0FBQzFELElBQUwsQ0FBVXFDLFNBQVYsSUFBdUIsQ0FBQyxNQUFJLENBQUNyQyxJQUFMLENBQVU0QyxhQUFsQyxJQUFtRCxDQUFDLE1BQUksQ0FBQ1ksV0FBN0QsRUFBMEU7QUFDeEUsZ0JBQU0sTUFBSSxDQUFDUCxHQUFMLENBQVMyQixTQUFULENBQW1CLE1BQUksQ0FBQzVFLElBQUwsQ0FBVTBELFVBQTdCLENBQU47QUFDRDs7QUFDRCxjQUFNLE1BQUksQ0FBQ1UsU0FBTCxDQUFlUyxRQUFmLEVBQU47QUFDQSxRQUFBLE1BQUksQ0FBQ1QsU0FBTCxHQUFpQixJQUFqQjtBQUNELE9BUEQsTUFPTztBQUNMTix3QkFBSVcsS0FBSixDQUFVLGtEQUFWO0FBQ0Q7QUFab0I7QUFhdEI7O0FBRURLLEVBQUFBLG1CQUFtQixDQUFFM0QsSUFBRixFQUFRO0FBQ3pCLFFBQUk0RCxHQUFHLEdBQUcsTUFBTUQsbUJBQU4sQ0FBMEIzRCxJQUExQixDQUFWOztBQUNBLFFBQUksQ0FBQzRELEdBQUwsRUFBVTtBQUFFLGFBQU9BLEdBQVA7QUFBYTs7QUFFekIsUUFBSSxDQUFDNUQsSUFBSSxDQUFDdUMsVUFBVixFQUFzQjtBQUNwQixVQUFJc0IsR0FBRyxHQUFHLHFEQUFWOztBQUNBbEIsc0JBQUlDLGFBQUosQ0FBa0JpQixHQUFsQjtBQUNEO0FBQ0Y7O0FBRURDLEVBQUFBLFdBQVcsQ0FBRTdELFNBQUYsRUFBYTtBQUN0QixVQUFNNkQsV0FBTixDQUFrQjdELFNBQWxCO0FBRUEsV0FBTyxLQUFLZixjQUFaO0FBQ0Q7O0FBRUQ2RSxFQUFBQSxpQkFBaUIsQ0FBRTlELFNBQUYsRUFBYTtBQUM1QixVQUFNOEQsaUJBQU4sQ0FBd0I5RCxTQUF4QjtBQUVBLFdBQU8sS0FBS2QsYUFBWjtBQUNEOztBQUVENkUsRUFBQUEsUUFBUSxDQUFFL0QsU0FBRixFQUFhO0FBQ25CLFVBQU0rRCxRQUFOLENBQWUvRCxTQUFmO0FBRUEsV0FBTyxLQUFQO0FBQ0Q7O0FBdEprQzs7O2VBMEp0QnZCLFciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlRHJpdmVyLCBEZXZpY2VTZXR0aW5ncyB9IGZyb20gJ2FwcGl1bS1iYXNlLWRyaXZlcic7XG5pbXBvcnQgZGVzaXJlZENvbnN0cmFpbnRzIGZyb20gJy4vZGVzaXJlZC1jYXBzJztcbmltcG9ydCBjb21tYW5kcyBmcm9tICcuL2NvbW1hbmRzL2luZGV4JztcbmltcG9ydCBoZWxwZXJzIGZyb20gJy4vdGl6ZW4taGVscGVycyc7XG5pbXBvcnQgQm9vdHN0cmFwIGZyb20gJy4vdGl6ZW4tYm9vdHN0cmFwLmpzJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IERFRkFVTFRfU0RCX1BPUlQgfSBmcm9tICdhcHBpdW0tc2RiJztcbmltcG9ydCB7IHRlbXBEaXIgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5cbmNvbnN0IEJPT1RTVFJBUF9QT1JUID0gODg4ODtcbmNvbnN0IE5PX1BST1hZID0gW1xuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvYXBwaXVtJyldLFxuICBbJ0dFVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9hcHBpdW0nKV0sXG5dO1xuXG5jbGFzcyBUaXplbkRyaXZlciBleHRlbmRzIEJhc2VEcml2ZXIge1xuICBjb25zdHJ1Y3RvciAob3B0cyA9IHt9LCBzaG91bGRWYWxpZGF0ZUNhcHMgPSB0cnVlKSB7XG4gICAgc3VwZXIob3B0cywgc2hvdWxkVmFsaWRhdGVDYXBzKTtcblxuICAgIHRoaXMubG9jYXRvclN0cmF0ZWdpZXMgPSBbXG4gICAgICAnaWQnLFxuICAgICAgJ2FjY2Vzc2liaWxpdHkgaWQnLFxuICAgICAgJ2NsYXNzIG5hbWUnLFxuICAgICAgJ25hbWUnXG4gICAgXTtcblxuICAgIHRoaXMuZGVzaXJlZENhcENvbnN0cmFpbnRzID0gZGVzaXJlZENvbnN0cmFpbnRzO1xuICAgIHRoaXMuandwUHJveHlBY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLmp3cFByb3h5QXZvaWQgPSBfLmNsb25lKE5PX1BST1hZKTtcbiAgICB0aGlzLnNldHRpbmdzID0gbmV3IERldmljZVNldHRpbmdzKHtpZ25vcmVVbmltcG9ydGFudFZpZXdzOiBmYWxzZX0pO1xuICAgIHRoaXMuYm9vdHN0cmFwUG9ydCA9IEJPT1RTVFJBUF9QT1JUO1xuXG4gICAgZm9yIChsZXQgW2NtZCwgZm5dIG9mIF8udG9QYWlycyhjb21tYW5kcykpIHtcbiAgICAgIFRpemVuRHJpdmVyLnByb3RvdHlwZVtjbWRdID0gZm47XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgY3JlYXRlU2Vzc2lvbiAoY2Fwcykge1xuICAgIHRyeSB7XG4gICAgICBsZXQgc2Vzc2lvbklkO1xuICAgICAgW3Nlc3Npb25JZF0gPSBhd2FpdCBzdXBlci5jcmVhdGVTZXNzaW9uKGNhcHMpO1xuXG4gICAgICBsZXQgc2VydmVyRGV0YWlscyA9IHtwbGF0Zm9ybTogJ0xJTlVYJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYlN0b3JhZ2VFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRha2VzU2NyZWVuc2hvdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFiYXNlRW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBuZXR3b3JrQ29ubmVjdGlvbkVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb25Db250ZXh0RW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuaW5nczoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNpcmVkOiB0aGlzLmNhcHN9O1xuICAgICAgdGhpcy5jYXBzID0gT2JqZWN0LmFzc2lnbihzZXJ2ZXJEZXRhaWxzLCB0aGlzLmNhcHMpO1xuXG4gICAgICBsZXQgZGVmYXVsdE9wdHMgPSB7XG4gICAgICAgIHRtcERpcjogYXdhaXQgdGVtcERpci5zdGF0aWNEaXIoKSxcbiAgICAgICAgZnVsbFJlc2V0OiBmYWxzZSxcbiAgICAgICAgc2RiUG9ydDogREVGQVVMVF9TREJfUE9SVCxcbiAgICAgICAgdGl6ZW5JbnN0YWxsVGltZW91dDogNTAwMDBcbiAgICAgIH07XG4gICAgICBfLmRlZmF1bHRzKHRoaXMub3B0cywgZGVmYXVsdE9wdHMpO1xuXG4gICAgICBpZiAodGhpcy5vcHRzLm5vUmVzZXQgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5vcHRzLmZ1bGxSZXNldCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMub3B0cy5mdWxsUmVzZXQgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5vcHRzLm5vUmVzZXQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHRoaXMub3B0cy5mYXN0UmVzZXQgPSAhdGhpcy5vcHRzLmZ1bGxSZXNldCAmJiAhdGhpcy5vcHRzLm5vUmVzZXQ7XG4gICAgICB0aGlzLm9wdHMuc2tpcFVuaW5zdGFsbCA9IHRoaXMub3B0cy5mYXN0UmVzZXQgfHwgdGhpcy5vcHRzLm5vUmVzZXQ7XG5cbiAgICAgIGxldCB7dWRpZCwgZW1Qb3J0fSA9IGF3YWl0IGhlbHBlcnMuZ2V0RGV2aWNlSW5mb0Zyb21DYXBzKHRoaXMub3B0cyk7XG4gICAgICB0aGlzLm9wdHMudWRpZCA9IHVkaWQ7XG4gICAgICB0aGlzLm9wdHMuZW1Qb3J0ID0gZW1Qb3J0O1xuXG4gICAgICB0aGlzLnNkYiA9IGF3YWl0IGhlbHBlcnMuY3JlYXRlU0RCKHRoaXMub3B0cy51ZGlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdHMuZW1Qb3J0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdHMuc2RiUG9ydCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRzLnN1cHByZXNzS2lsbFNlcnZlcik7XG5cbiAgICAgIGF3YWl0IHRoaXMuc3RhcnRUaXplblNlc3Npb24odGhpcy5vcHRzKTtcbiAgICAgIHJldHVybiBbc2Vzc2lvbklkLCB0aGlzLmNhcHNdO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHRoaXMuZGVsZXRlU2Vzc2lvbigpO1xuICAgICAgfSBjYXRjaCAoaWduKSB7fVxuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cblxuICBnZXQgYXBwT25EZXZpY2UgKCkge1xuICAgIHJldHVybiB0aGlzLmhlbHBlcnMuaXNQYWNrYWdlT3JCdW5kbGUodGhpcy5vcHRzLmFwcFBhY2thZ2UpO1xuICB9XG5cbiAgYXN5bmMgc3RhcnRUaXplblNlc3Npb24gKCkge1xuICAgIGlmICh0aGlzLm9wdHMuYXBwKSB7XG4gICAgICBhd2FpdCB0aGlzLmluc3RhbGxBcHAodGhpcy5vcHRzLmFwcCk7XG4gICAgfVxuICAgIGxldCBpc0FwcEluc3RhbGxlZCA9IGF3YWl0IHRoaXMuaXNBcHBJbnN0YWxsZWQodGhpcy5vcHRzLmFwcFBhY2thZ2UpO1xuICAgIGlmICghaXNBcHBJbnN0YWxsZWQpIHtcbiAgICAgIGxvZy5lcnJvckFuZFRocm93KCdDb3VsZCBub3QgZmluZCB0byBBcHAgaW4gZGV2aWNlLicpO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcHRzLmFwcFBhY2thZ2UpIHtcbiAgICAgIGxldCBpc1N0YXJ0ZWRBcHAgPSBhd2FpdCB0aGlzLmlzU3RhcnRlZEFwcCgpO1xuICAgICAgaWYgKGlzU3RhcnRlZEFwcCkge1xuICAgICAgICBhd2FpdCB0aGlzLmNsb3NlQXBwKCk7XG4gICAgICB9XG4gICAgICBhd2FpdCB0aGlzLnN0YXJ0QXBwKHsgdGltZW91dDogMjAwMDAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5ib290c3RyYXAgPSBuZXcgQm9vdHN0cmFwKHRoaXMuc2RiLCB0aGlzLmJvb3RzdHJhcFBvcnQsIHRoaXMub3B0cyk7XG4gICAgYXdhaXQgdGhpcy5ib290c3RyYXAuc3RhcnQodGhpcy5vcHRzLmFwcFBhY2thZ2UpO1xuXG4gICAgaWYgKHRoaXMub3B0cy5pZ25vcmVVbmltcG9ydGFudFZpZXdzKSB7XG4gICAgICBhd2FpdCB0aGlzLnNldHRpbmdzLnVwZGF0ZSh7aWdub3JlVW5pbXBvcnRhbnRWaWV3czogdGhpcy5vcHRzLmlnbm9yZVVuaW1wb3J0YW50Vmlld3N9KTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBjaGVja1BhY2thZ2VQcmVzZW50ICgpIHtcbiAgICBsb2cuZGVidWcoXCJDaGVja2luZyB3aGV0aGVyIHBhY2thZ2UgaXMgcHJlc2VudCBvbiB0aGUgZGV2aWNlXCIpO1xuICAgIGlmICghKGF3YWl0IHRoaXMuc2RiLnNoZWxsKFtgYXBwX2xhdW5jaGVyIC0tbGlzdCB8IGdyZXAgJHt0aGlzLm9wdHMuYXBwUGFja2FnZX1gXSkpKSB7XG4gICAgICBsb2cuZXJyb3JBbmRUaHJvdyhgQ291bGQgbm90IGZpbmQgcGFja2FnZSAke3RoaXMub3B0cy5hcHBQYWNrYWdlfSBvbiB0aGUgZGV2aWNlYCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZGVsZXRlU2Vzc2lvbiAoKSB7XG4gICAgbG9nLmRlYnVnKFwiU2h1dHRpbmcgZG93biBUaXplbiBkcml2ZXJcIik7XG4gICAgYXdhaXQgc3VwZXIuZGVsZXRlU2Vzc2lvbigpO1xuICAgIGlmICh0aGlzLmJvb3RzdHJhcCkge1xuICAgICAgYXdhaXQgdGhpcy5zZGIuZm9yY2VTdG9wKHRoaXMub3B0cy5hcHBQYWNrYWdlKTtcbiAgICAgIGlmICh0aGlzLm9wdHMuZnVsbFJlc2V0ICYmICF0aGlzLm9wdHMuc2tpcFVuaW5zdGFsbCAmJiAhdGhpcy5hcHBPbkRldmljZSkge1xuICAgICAgICBhd2FpdCB0aGlzLnNkYi51bmluc3RhbGwodGhpcy5vcHRzLmFwcFBhY2thZ2UpO1xuICAgICAgfVxuICAgICAgYXdhaXQgdGhpcy5ib290c3RyYXAuc2h1dGRvd24oKTtcbiAgICAgIHRoaXMuYm9vdHN0cmFwID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nLmRlYnVnKFwiQ2FsbGVkIGRlbGV0ZVNlc3Npb24gYnV0IGJvb3RzdHJhcCB3YXNuJ3QgYWN0aXZlXCIpO1xuICAgIH1cbiAgfVxuXG4gIHZhbGlkYXRlRGVzaXJlZENhcHMgKGNhcHMpIHtcbiAgICBsZXQgcmVzID0gc3VwZXIudmFsaWRhdGVEZXNpcmVkQ2FwcyhjYXBzKTtcbiAgICBpZiAoIXJlcykgeyByZXR1cm4gcmVzOyB9XG5cbiAgICBpZiAoIWNhcHMuYXBwUGFja2FnZSkge1xuICAgICAgbGV0IG1zZyA9ICdUaGUgZGVzaXJlZCBjYXBhYmlsaXRpZXMgbXVzdCBpbmNsdWRlIGFuIGFwcFBhY2thZ2UnO1xuICAgICAgbG9nLmVycm9yQW5kVGhyb3cobXNnKTtcbiAgICB9XG4gIH1cblxuICBwcm94eUFjdGl2ZSAoc2Vzc2lvbklkKSB7XG4gICAgc3VwZXIucHJveHlBY3RpdmUoc2Vzc2lvbklkKTtcblxuICAgIHJldHVybiB0aGlzLmp3cFByb3h5QWN0aXZlO1xuICB9XG5cbiAgZ2V0UHJveHlBdm9pZExpc3QgKHNlc3Npb25JZCkge1xuICAgIHN1cGVyLmdldFByb3h5QXZvaWRMaXN0KHNlc3Npb25JZCk7XG5cbiAgICByZXR1cm4gdGhpcy5qd3BQcm94eUF2b2lkO1xuICB9XG5cbiAgY2FuUHJveHkgKHNlc3Npb25JZCkge1xuICAgIHN1cGVyLmNhblByb3h5KHNlc3Npb25JZCk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IHsgVGl6ZW5Ecml2ZXIgfTtcbmV4cG9ydCBkZWZhdWx0IFRpemVuRHJpdmVyO1xuIl0sImZpbGUiOiJsaWIvZHJpdmVyLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uIn0=
