"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.COMMAND_TYPES = exports.TizenBootstrap = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _net = _interopRequireDefault(require("net"));

var _lodash = _interopRequireDefault(require("lodash"));

var _index = _interopRequireDefault(require("./commands/index"));

var _appiumBaseDriver = require("appium-base-driver");

var _asyncbox = require("asyncbox");

var _path = _interopRequireDefault(require("path"));

var _logger = _interopRequireDefault(require("./logger"));

var _bluebird = _interopRequireDefault(require("bluebird"));

const COMMAND_TYPES = {
  ACTION: 'action',
  SHUTDOWN: 'shutdown'
};
exports.COMMAND_TYPES = COMMAND_TYPES;

class TizenBootstrap {
  constructor(sdb, systemPort = 8888, opts = {}) {
    this.appPackage;
    this.sdb = sdb;
    this.systemPort = systemPort;
    this.opts = opts;
    this.webSocket = opts.webSocket;
    this.ignoreUnexpectedShutdown = false;
    this.uiautomator = 'org.tizen.uiautomator';
    this.uiautomatorVersion = '1.0.0';
    this.isRestart = false;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _lodash.default.toPairs(_index.default)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        let _step$value = (0, _slicedToArray2.default)(_step.value, 2),
            cmd = _step$value[0],
            fn = _step$value[1];

        TizenBootstrap.prototype[cmd] = fn;
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

  start(appPackage) {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      _this.appPackage = appPackage;
      yield _this.init();
      yield _this.sdb.forwardPort(_this.systemPort, 8888);
      yield (0, _asyncbox.sleep)(6000);
      return yield _this.connectSocket();
    })();
  }

  connectSocket() {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      try {
        return yield new _bluebird.default((resolve, reject) => {
          try {
            if (!_this2.socketClient) {
              _this2.socketClient = _net.default.connect(_this2.systemPort);

              _this2.socketClient.setEncoding('utf8');

              _this2.socketClient.on('error', err => {
                if (!_this2.ignoreUnexpectedShutdown) {
                  throw new Error(`Tizen bootstrap socket crashed: ${err}`);
                }
              });

              _this2.socketClient.once('connect', () => {
                _logger.default.info("Tizen bootstrap socket is now connected");

                resolve();
              });
            } else {
              _logger.default.info("SocketClient already Created");

              resolve();
            }
          } catch (err) {
            reject(err);
          }
        });
      } catch (err) {
        _logger.default.errorAndThrow(`Error occured while reconnection TizenBootstrap. Original error: ${err}`);
      }
    })();
  }

  sendCommand(type, extra = {}) {
    var _this3 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      if (_this3.appPackage && type !== COMMAND_TYPES.SHUTDOWN) {
        if (_this3.isRestart) {
          yield (0, _asyncbox.sleep)(5000);
          yield _this3.restartUIAutomator();
          _this3.isRestart = false;
        }

        let isStartedApp = yield _this3.sdb.isStartedApp(_this3.appPackage);

        if (!isStartedApp) {
          yield _this3.sdb.startApp(_this3.appPackage);
          yield (0, _asyncbox.sleep)(10000);
          _this3.isRestart = false;
        }
      }

      if (!_this3.socketClient) {
        yield _this3.connectSocket();
      }

      return yield new _bluebird.default((resolve, reject) => {
        let cmd = Object.assign({
          cmd: type
        }, extra);
        let cmdJson = `${JSON.stringify(cmd)} \n`;

        _logger.default.debug(`Sending command to tizen: ${_lodash.default.truncate(cmdJson, {
          length: 1000
        }).trim()}`);

        try {
          _this3.socketClient.removeAllListeners('timeout');

          _this3.socketClient.removeAllListeners('end');

          _this3.socketClient.write(cmdJson);

          _this3.socketClient.on('data', data => {
            let streamData = '';

            _logger.default.debug(`Received command result from bootstrap : ${data}`);

            try {
              streamData = JSON.parse(streamData + data);

              _this3.socketClient.removeAllListeners('data');

              if (streamData.status === 0) {
                resolve(streamData.value);
              } else if (streamData.status === 44) {
                _this3.restartUIAutomator();

                resolve(false);
              }

              reject((0, _appiumBaseDriver.errorFromCode)(streamData.status));
            } catch (ign) {
              _logger.default.debug("Stream still not complete, waiting");

              streamData += data;
            }
          });

          _this3.socketClient.setTimeout(15000);

          _this3.socketClient.on('timeout', () => {
            _this3.socketClient.destroy();

            _this3.socketClient = null;
            _this3.isRestart = true;
            reject((0, _appiumBaseDriver.errorFromCode)(-1, "No response from Server"));
          });

          _this3.socketClient.on('end', () => {
            _this3.socketClient.destroy();

            _this3.socketClient = null;
            _this3.isRestart = true;
            reject((0, _appiumBaseDriver.errorFromCode)(-1, "Socket ended by Server"));
          });
        } catch (err) {
          reject((0, _appiumBaseDriver.errorFromCode)(-1, err));
        }
      });
    })();
  }

  sendAction(action, params = {}) {
    var _this4 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      let extra = {
        action,
        params
      };
      return yield _this4.sendCommand(COMMAND_TYPES.ACTION, extra);
    })();
  }

  shutdown() {
    var _this5 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      if (_this5.socketClient) {
        _this5.socketClient.end();

        _this5.socketClient.destroy();

        _this5.socketClient = null;
      }

      yield _this5.stopUIAutomator();
      yield _this5.uninstallUIAutomator();
      yield _this5.sdb.removePortForward(_this5.systemPort);
    })();
  }

  init() {
    var _this6 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      let isUIAutomatorInstalled = yield _this6.isAppInstalled(_this6.uiautomator);

      if (!isUIAutomatorInstalled) {
        yield _this6.installUIAutomator();
      }

      let uiautomatorStatus = yield _this6.isStartedUIAutomator();

      if (!uiautomatorStatus) {
        yield _this6.startUIAutomator();
      } else {
        yield _this6.stopUIAutomator();
        yield (0, _asyncbox.sleep)(2000);
        yield _this6.startUIAutomator();
      }
    })();
  }

  installUIAutomator() {
    var _this7 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      let arch = yield _this7.sdb.shell('uname -a');

      let rootDir = _path.default.resolve(__dirname, '..', '..');

      let tpkPath = _path.default.resolve(rootDir, 'uiautomator', `${_this7.uiautomator}-${_this7.uiautomatorVersion}`);

      if (arch.includes('i686')) {
        tpkPath += '-x86';
      } else {
        tpkPath += '-arm';
      }

      tpkPath += '.tpk';
      return yield _this7.sdb.install(tpkPath);
    })();
  }

  uninstallUIAutomator() {
    var _this8 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      return yield _this8.removeApp(_this8.uiautomator);
    })();
  }

  startUIAutomator() {
    var _this9 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _this9.sdb.startApp(_this9.uiautomator);
    })();
  }

  stopUIAutomator() {
    var _this10 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _this10.sdb.shell(`app_launcher -t ${_this10.uiautomator}`);
    })();
  }

  restartUIAutomator() {
    var _this11 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _this11.stopUIAutomator();
      yield _this11.startUIAutomator();
    })();
  }

  isStartedUIAutomator() {
    var _this12 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      return yield _this12.sdb.isStartedApp(_this12.uiautomator);
    })();
  }

  set ignoreUnexpectedShutdown(ignore) {
    _logger.default.debug(`${ignore ? 'Ignoring' : 'Watching for'} bootstrap disconnect`);

    this._ignoreUnexpectedShutdown = ignore;
  }

  get ignoreUnexpectedShutdown() {
    return this._ignoreUnexpectedShutdown;
  }

}

exports.TizenBootstrap = TizenBootstrap;
var _default = TizenBootstrap;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90aXplbi1ib290c3RyYXAuanMiXSwibmFtZXMiOlsiQ09NTUFORF9UWVBFUyIsIkFDVElPTiIsIlNIVVRET1dOIiwiVGl6ZW5Cb290c3RyYXAiLCJjb25zdHJ1Y3RvciIsInNkYiIsInN5c3RlbVBvcnQiLCJvcHRzIiwiYXBwUGFja2FnZSIsIndlYlNvY2tldCIsImlnbm9yZVVuZXhwZWN0ZWRTaHV0ZG93biIsInVpYXV0b21hdG9yIiwidWlhdXRvbWF0b3JWZXJzaW9uIiwiaXNSZXN0YXJ0IiwiXyIsInRvUGFpcnMiLCJjb21tYW5kcyIsImNtZCIsImZuIiwicHJvdG90eXBlIiwic3RhcnQiLCJpbml0IiwiZm9yd2FyZFBvcnQiLCJjb25uZWN0U29ja2V0IiwiQiIsInJlc29sdmUiLCJyZWplY3QiLCJzb2NrZXRDbGllbnQiLCJuZXQiLCJjb25uZWN0Iiwic2V0RW5jb2RpbmciLCJvbiIsImVyciIsIkVycm9yIiwib25jZSIsImxvZyIsImluZm8iLCJlcnJvckFuZFRocm93Iiwic2VuZENvbW1hbmQiLCJ0eXBlIiwiZXh0cmEiLCJyZXN0YXJ0VUlBdXRvbWF0b3IiLCJpc1N0YXJ0ZWRBcHAiLCJzdGFydEFwcCIsIk9iamVjdCIsImFzc2lnbiIsImNtZEpzb24iLCJKU09OIiwic3RyaW5naWZ5IiwiZGVidWciLCJ0cnVuY2F0ZSIsImxlbmd0aCIsInRyaW0iLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJ3cml0ZSIsImRhdGEiLCJzdHJlYW1EYXRhIiwicGFyc2UiLCJzdGF0dXMiLCJ2YWx1ZSIsImlnbiIsInNldFRpbWVvdXQiLCJkZXN0cm95Iiwic2VuZEFjdGlvbiIsImFjdGlvbiIsInBhcmFtcyIsInNodXRkb3duIiwiZW5kIiwic3RvcFVJQXV0b21hdG9yIiwidW5pbnN0YWxsVUlBdXRvbWF0b3IiLCJyZW1vdmVQb3J0Rm9yd2FyZCIsImlzVUlBdXRvbWF0b3JJbnN0YWxsZWQiLCJpc0FwcEluc3RhbGxlZCIsImluc3RhbGxVSUF1dG9tYXRvciIsInVpYXV0b21hdG9yU3RhdHVzIiwiaXNTdGFydGVkVUlBdXRvbWF0b3IiLCJzdGFydFVJQXV0b21hdG9yIiwiYXJjaCIsInNoZWxsIiwicm9vdERpciIsInBhdGgiLCJfX2Rpcm5hbWUiLCJ0cGtQYXRoIiwiaW5jbHVkZXMiLCJpbnN0YWxsIiwicmVtb3ZlQXBwIiwiaWdub3JlIiwiX2lnbm9yZVVuZXhwZWN0ZWRTaHV0ZG93biJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUdBLE1BQU1BLGFBQWEsR0FBRztBQUNwQkMsRUFBQUEsTUFBTSxFQUFFLFFBRFk7QUFFcEJDLEVBQUFBLFFBQVEsRUFBRTtBQUZVLENBQXRCOzs7QUFLQSxNQUFNQyxjQUFOLENBQXFCO0FBQ25CQyxFQUFBQSxXQUFXLENBQUVDLEdBQUYsRUFBT0MsVUFBVSxHQUFHLElBQXBCLEVBQTBCQyxJQUFJLEdBQUcsRUFBakMsRUFBcUM7QUFDOUMsU0FBS0MsVUFBTDtBQUNBLFNBQUtILEdBQUwsR0FBV0EsR0FBWDtBQUNBLFNBQUtDLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0UsU0FBTCxHQUFpQkYsSUFBSSxDQUFDRSxTQUF0QjtBQUNBLFNBQUtDLHdCQUFMLEdBQWdDLEtBQWhDO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQix1QkFBbkI7QUFDQSxTQUFLQyxrQkFBTCxHQUEwQixPQUExQjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFUOEM7QUFBQTtBQUFBOztBQUFBO0FBVzlDLDJCQUFzQkMsZ0JBQUVDLE9BQUYsQ0FBVUMsY0FBVixDQUF0Qiw4SEFBMkM7QUFBQTtBQUFBLFlBQWpDQyxHQUFpQztBQUFBLFlBQTVCQyxFQUE0Qjs7QUFDekNmLFFBQUFBLGNBQWMsQ0FBQ2dCLFNBQWYsQ0FBeUJGLEdBQXpCLElBQWdDQyxFQUFoQztBQUNEO0FBYjZDO0FBQUE7QUFBQTtBQUFBO0FB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RCxHQUFMLENBQVN5RSxLQUFULENBQWdCLG1CQUFrQixPQUFJLENBQUNuRSxXQUFZLEVBQW5ELENBQU47QUFEdUI7QUFFeEI7O0FBRUs4QixFQUFBQSxrQkFBTixHQUE0QjtBQUFBOztBQUFBO0FBQzFCLFlBQU0sT0FBSSxDQUFDMkIsZUFBTCxFQUFOO0FBQ0EsWUFBTSxPQUFJLENBQUNRLGdCQUFMLEVBQU47QUFGMEI7QUFHM0I7O0FBRUtELEVBQUFBLG9CQUFOLEdBQThCO0FBQUE7O0FBQUE7QUFDNUIsbUJBQWEsT0FBSSxDQUFDdEUsR0FBTCxDQUFTcUMsWUFBVCxDQUFzQixPQUFJLENBQUMvQixXQUEzQixDQUFiO0FBRDRCO0FBRTdCOztBQUVELE1BQUlELHdCQUFKLENBQThCNEUsTUFBOUIsRUFBc0M7QUFDcENuRCxvQkFBSWMsS0FBSixDQUFXLEdBQUVxQyxNQUFNLEdBQUcsVUFBSCxHQUFnQixjQUFlLHVCQUFsRDs7QUFDQSxTQUFLQyx5QkFBTCxHQUFpQ0QsTUFBakM7QUFDRDs7QUFFRCxNQUFJNUUsd0JBQUosR0FBZ0M7QUFDOUIsV0FBTyxLQUFLNkUseUJBQVo7QUFDRDs7QUF0TWtCOzs7ZUEwTU5wRixjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5ldCBmcm9tICduZXQnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBjb21tYW5kcyBmcm9tICcuL2NvbW1hbmRzL2luZGV4JztcbmltcG9ydCB7IGVycm9yRnJvbUNvZGUgfSBmcm9tICdhcHBpdW0tYmFzZS1kcml2ZXInO1xuaW1wb3J0IHsgc2xlZXAgfSBmcm9tICdhc3luY2JveCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xuXG5cbmNvbnN0IENPTU1BTkRfVFlQRVMgPSB7XG4gIEFDVElPTjogJ2FjdGlvbicsXG4gIFNIVVRET1dOOiAnc2h1dGRvd24nXG59O1xuXG5jbGFzcyBUaXplbkJvb3RzdHJhcCB7XG4gIGNvbnN0cnVjdG9yIChzZGIsIHN5c3RlbVBvcnQgPSA4ODg4LCBvcHRzID0ge30pIHtcbiAgICB0aGlzLmFwcFBhY2thZ2U7XG4gICAgdGhpcy5zZGIgPSBzZGI7XG4gICAgdGhpcy5zeXN0ZW1Qb3J0ID0gc3lzdGVtUG9ydDtcbiAgICB0aGlzLm9wdHMgPSBvcHRzO1xuICAgIHRoaXMud2ViU29ja2V0ID0gb3B0cy53ZWJTb2NrZXQ7XG4gICAgdGhpcy5pZ25vcmVVbmV4cGVjdGVkU2h1dGRvd24gPSBmYWxzZTtcbiAgICB0aGlzLnVpYXV0b21hdG9yID0gJ29yZy50aXplbi51aWF1dG9tYXRvcic7XG4gICAgdGhpcy51aWF1dG9tYXRvclZlcnNpb24gPSAnMS4wLjAnO1xuICAgIHRoaXMuaXNSZXN0YXJ0ID0gZmFsc2U7XG5cbiAgICBmb3IgKGxldCBbY21kLCBmbl0gb2YgXy50b1BhaXJzKGNvbW1hbmRzKSkge1xuICAgICAgVGl6ZW5Cb290c3RyYXAucHJvdG90eXBlW2NtZF0gPSBmbjtcbiAgICB9XG4gIH1cblxuICBhc3luYyBzdGFydCAoYXBwUGFja2FnZSkge1xuICAgIHRoaXMuYXBwUGFja2FnZSA9IGFwcFBhY2thZ2U7XG4gICAgYXdhaXQgdGhpcy5pbml0KCk7XG4gICAgYXdhaXQgdGhpcy5zZGIuZm9yd2FyZFBvcnQodGhpcy5zeXN0ZW1Qb3J0LCA4ODg4KTtcbiAgICBhd2FpdCBzbGVlcCg2MDAwKTtcblxuICAgIHJldHVybiBhd2FpdCB0aGlzLmNvbm5lY3RTb2NrZXQoKTtcbiAgfVxuXG4gIGFzeW5jIGNvbm5lY3RTb2NrZXQgKCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgbmV3IEIoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghdGhpcy5zb2NrZXRDbGllbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0Q2xpZW50ID0gbmV0LmNvbm5lY3QodGhpcy5zeXN0ZW1Qb3J0KTtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0Q2xpZW50LnNldEVuY29kaW5nKCd1dGY4Jyk7XG4gICAgICAgICAgICB0aGlzLnNvY2tldENsaWVudC5vbignZXJyb3InLCAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghdGhpcy5pZ25vcmVVbmV4cGVjdGVkU2h1dGRvd24pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRpemVuIGJvb3RzdHJhcCBzb2NrZXQgY3Jhc2hlZDogJHtlcnJ9YCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5zb2NrZXRDbGllbnQub25jZSgnY29ubmVjdCcsICgpID0+IHtcbiAgICAgICAgICAgICAgbG9nLmluZm8oXCJUaXplbiBib290c3RyYXAgc29ja2V0IGlzIG5vdyBjb25uZWN0ZWRcIik7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2cuaW5mbyhcIlNvY2tldENsaWVudCBhbHJlYWR5IENyZWF0ZWRcIik7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2cuZXJyb3JBbmRUaHJvdyhgRXJyb3Igb2NjdXJlZCB3aGlsZSByZWNvbm5lY3Rpb24gVGl6ZW5Cb290c3RyYXAuIE9yaWdpbmFsIGVycm9yOiAke2Vycn1gKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBzZW5kQ29tbWFuZCAodHlwZSwgZXh0cmEgPSB7fSkge1xuICAgIGlmICh0aGlzLmFwcFBhY2thZ2UgJiYgdHlwZSAhPT0gQ09NTUFORF9UWVBFUy5TSFVURE9XTikge1xuICAgICAgaWYgKHRoaXMuaXNSZXN0YXJ0KSB7XG4gICAgICAgIGF3YWl0IHNsZWVwKDUwMDApO1xuICAgICAgICBhd2FpdCB0aGlzLnJlc3RhcnRVSUF1dG9tYXRvcigpO1xuICAgICAgICB0aGlzLmlzUmVzdGFydCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgbGV0IGlzU3RhcnRlZEFwcCA9IGF3YWl0IHRoaXMuc2RiLmlzU3RhcnRlZEFwcCh0aGlzLmFwcFBhY2thZ2UpO1xuICAgICAgaWYgKCFpc1N0YXJ0ZWRBcHApIHtcbiAgICAgICAgYXdhaXQgdGhpcy5zZGIuc3RhcnRBcHAodGhpcy5hcHBQYWNrYWdlKTtcbiAgICAgICAgYXdhaXQgc2xlZXAoMTAwMDApO1xuICAgICAgICB0aGlzLmlzUmVzdGFydCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdGhpcy5zb2NrZXRDbGllbnQpIHtcbiAgICAgIGF3YWl0IHRoaXMuY29ubmVjdFNvY2tldCgpO1xuICAgIH1cblxuICAgIHJldHVybiBhd2FpdCBuZXcgQigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgY21kID0gT2JqZWN0LmFzc2lnbih7IGNtZDogdHlwZSB9LCBleHRyYSk7XG4gICAgICBsZXQgY21kSnNvbiA9IGAke0pTT04uc3RyaW5naWZ5KGNtZCl9IFxcbmA7XG4gICAgICBsb2cuZGVidWcoYFNlbmRpbmcgY29tbWFuZCB0byB0aXplbjogJHtfLnRydW5jYXRlKGNtZEpzb24sIHsgbGVuZ3RoOiAxMDAwIH0pLnRyaW0oKX1gKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5zb2NrZXRDbGllbnQucmVtb3ZlQWxsTGlzdGVuZXJzKCd0aW1lb3V0Jyk7XG4gICAgICAgIHRoaXMuc29ja2V0Q2xpZW50LnJlbW92ZUFsbExpc3RlbmVycygnZW5kJyk7XG4gICAgICAgIHRoaXMuc29ja2V0Q2xpZW50LndyaXRlKGNtZEpzb24pO1xuICAgICAgICB0aGlzLnNvY2tldENsaWVudC5vbignZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICAgICAgbGV0IHN0cmVhbURhdGEgPSAnJztcbiAgICAgICAgICBsb2cuZGVidWcoYFJlY2VpdmVkIGNvbW1hbmQgcmVzdWx0IGZyb20gYm9vdHN0cmFwIDogJHtkYXRhfWApO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzdHJlYW1EYXRhID0gSlNPTi5wYXJzZShzdHJlYW1EYXRhICsgZGF0YSk7XG4gICAgICAgICAgICB0aGlzLnNvY2tldENsaWVudC5yZW1vdmVBbGxMaXN0ZW5lcnMoJ2RhdGEnKTtcbiAgICAgICAgICAgIGlmIChzdHJlYW1EYXRhLnN0YXR1cyA9PT0gMCkge1xuICAgICAgICAgICAgICByZXNvbHZlKHN0cmVhbURhdGEudmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdHJlYW1EYXRhLnN0YXR1cyA9PT0gNDQpIHtcbiAgICAgICAgICAgICAgdGhpcy5yZXN0YXJ0VUlBdXRvbWF0b3IoKTtcbiAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWplY3QoZXJyb3JGcm9tQ29kZShzdHJlYW1EYXRhLnN0YXR1cykpO1xuICAgICAgICAgIH0gY2F0Y2ggKGlnbikge1xuICAgICAgICAgICAgbG9nLmRlYnVnKFwiU3RyZWFtIHN0aWxsIG5vdCBjb21wbGV0ZSwgd2FpdGluZ1wiKTtcbiAgICAgICAgICAgIHN0cmVhbURhdGEgKz0gZGF0YTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNvY2tldENsaWVudC5zZXRUaW1lb3V0KDE1MDAwKTtcbiAgICAgICAgdGhpcy5zb2NrZXRDbGllbnQub24oJ3RpbWVvdXQnLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zb2NrZXRDbGllbnQuZGVzdHJveSgpO1xuICAgICAgICAgIHRoaXMuc29ja2V0Q2xpZW50ID0gbnVsbDtcbiAgICAgICAgICB0aGlzLmlzUmVzdGFydCA9IHRydWU7XG4gICAgICAgICAgcmVqZWN0KGVycm9yRnJvbUNvZGUoLTEsIFwiTm8gcmVzcG9uc2UgZnJvbSBTZXJ2ZXJcIikpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zb2NrZXRDbGllbnQub24oJ2VuZCcsICgpID0+IHtcbiAgICAgICAgICB0aGlzLnNvY2tldENsaWVudC5kZXN0cm95KCk7XG4gICAgICAgICAgdGhpcy5zb2NrZXRDbGllbnQgPSBudWxsO1xuICAgICAgICAgIHRoaXMuaXNSZXN0YXJ0ID0gdHJ1ZTtcbiAgICAgICAgICByZWplY3QoZXJyb3JGcm9tQ29kZSgtMSwgXCJTb2NrZXQgZW5kZWQgYnkgU2VydmVyXCIpKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycm9yRnJvbUNvZGUoLTEsIGVycikpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgc2VuZEFjdGlvbiAoYWN0aW9uLCBwYXJhbXMgPSB7fSkge1xuICAgIGxldCBleHRyYSA9IHsgYWN0aW9uLCBwYXJhbXMgfTtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5zZW5kQ29tbWFuZChDT01NQU5EX1RZUEVTLkFDVElPTiwgZXh0cmEpO1xuICB9XG5cbiAgYXN5bmMgc2h1dGRvd24gKCkge1xuICAgIGlmICh0aGlzLnNvY2tldENsaWVudCkge1xuICAgICAgdGhpcy5zb2NrZXRDbGllbnQuZW5kKCk7XG4gICAgICB0aGlzLnNvY2tldENsaWVudC5kZXN0cm95KCk7XG4gICAgICB0aGlzLnNvY2tldENsaWVudCA9IG51bGw7XG4gICAgfVxuXG4gICAgYXdhaXQgdGhpcy5zdG9wVUlBdXRvbWF0b3IoKTtcbiAgICBhd2FpdCB0aGlzLnVuaW5zdGFsbFVJQXV0b21hdG9yKCk7XG5cbiAgICBhd2FpdCB0aGlzLnNkYi5yZW1vdmVQb3J0Rm9yd2FyZCh0aGlzLnN5c3RlbVBvcnQpO1xuICB9XG5cbiAgYXN5bmMgaW5pdCAoKSB7XG5cbiAgICBsZXQgaXNVSUF1dG9tYXRvckluc3RhbGxlZCA9IGF3YWl0IHRoaXMuaXNBcHBJbnN0YWxsZWQodGhpcy51aWF1dG9tYXRvcik7XG4gICAgaWYgKCFpc1VJQXV0b21hdG9ySW5zdGFsbGVkKSB7XG4gICAgICBhd2FpdCB0aGlzLmluc3RhbGxVSUF1dG9tYXRvcigpO1xuICAgIH1cblxuICAgIGxldCB1aWF1dG9tYXRvclN0YXR1cyA9IGF3YWl0IHRoaXMuaXNTdGFydGVkVUlBdXRvbWF0b3IoKTtcbiAgICBpZiAoIXVpYXV0b21hdG9yU3RhdHVzKSB7XG4gICAgICBhd2FpdCB0aGlzLnN0YXJ0VUlBdXRvbWF0b3IoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgdGhpcy5zdG9wVUlBdXRvbWF0b3IoKTtcbiAgICAgIGF3YWl0IHNsZWVwKDIwMDApO1xuICAgICAgYXdhaXQgdGhpcy5zdGFydFVJQXV0b21hdG9yKCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgaW5zdGFsbFVJQXV0b21hdG9yICgpIHtcbiAgICBsZXQgYXJjaCA9IGF3YWl0IHRoaXMuc2RiLnNoZWxsKCd1bmFtZSAtYScpO1xuICAgIGxldCByb290RGlyID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uJywgJy4uJyk7XG4gICAgbGV0IHRwa1BhdGggPSBwYXRoLnJlc29sdmUocm9vdERpciwgJ3VpYXV0b21hdG9yJywgYCR7dGhpcy51aWF1dG9tYXRvcn0tJHt0aGlzLnVpYXV0b21hdG9yVmVyc2lvbn1gKTtcblxuICAgIGlmIChhcmNoLmluY2x1ZGVzKCdpNjg2JykpIHtcbiAgICAgIHRwa1BhdGggKz0gJy14ODYnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cGtQYXRoICs9ICctYXJtJztcbiAgICB9XG4gICAgdHBrUGF0aCArPSAnLnRwayc7XG5cbiAgICByZXR1cm4gYXdhaXQgdGhpcy5zZGIuaW5zdGFsbCh0cGtQYXRoKTtcbiAgfVxuXG4gIGFzeW5jIHVuaW5zdGFsbFVJQXV0b21hdG9yICgpIHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5yZW1vdmVBcHAodGhpcy51aWF1dG9tYXRvcik7XG4gIH1cblxuICBhc3luYyBzdGFydFVJQXV0b21hdG9yICgpIHtcbiAgICBhd2FpdCB0aGlzLnNkYi5zdGFydEFwcCh0aGlzLnVpYXV0b21hdG9yKTtcbiAgfVxuXG4gIGFzeW5jIHN0b3BVSUF1dG9tYXRvciAoKSB7XG4gICAgYXdhaXQgdGhpcy5zZGIuc2hlbGwoYGFwcF9sYXVuY2hlciAtdCAke3RoaXMudWlhdXRvbWF0b3J9YCk7XG4gIH1cblxuICBhc3luYyByZXN0YXJ0VUlBdXRvbWF0b3IgKCkge1xuICAgIGF3YWl0IHRoaXMuc3RvcFVJQXV0b21hdG9yKCk7XG4gICAgYXdhaXQgdGhpcy5zdGFydFVJQXV0b21hdG9yKCk7XG4gIH1cblxuICBhc3luYyBpc1N0YXJ0ZWRVSUF1dG9tYXRvciAoKSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuc2RiLmlzU3RhcnRlZEFwcCh0aGlzLnVpYXV0b21hdG9yKTtcbiAgfVxuXG4gIHNldCBpZ25vcmVVbmV4cGVjdGVkU2h1dGRvd24gKGlnbm9yZSkge1xuICAgIGxvZy5kZWJ1ZyhgJHtpZ25vcmUgPyAnSWdub3JpbmcnIDogJ1dhdGNoaW5nIGZvcid9IGJvb3RzdHJhcCBkaXNjb25uZWN0YCk7XG4gICAgdGhpcy5faWdub3JlVW5leHBlY3RlZFNodXRkb3duID0gaWdub3JlO1xuICB9XG5cbiAgZ2V0IGlnbm9yZVVuZXhwZWN0ZWRTaHV0ZG93biAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lnbm9yZVVuZXhwZWN0ZWRTaHV0ZG93bjtcbiAgfVxufVxuXG5leHBvcnQgeyBUaXplbkJvb3RzdHJhcCwgQ09NTUFORF9UWVBFUyB9O1xuZXhwb3J0IGRlZmF1bHQgVGl6ZW5Cb290c3RyYXA7XG4iXSwiZmlsZSI6ImxpYi90aXplbi1ib290c3RyYXAuanMiLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
