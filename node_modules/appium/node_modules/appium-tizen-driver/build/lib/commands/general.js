"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.helpers = exports.commands = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _logger = _interopRequireDefault(require("../logger"));

var _lodash = _interopRequireDefault(require("lodash"));

var _appiumSupport = require("appium-support");

var _path = _interopRequireDefault(require("path"));

let commands = {},
    helpers = {},
    extensions = {};
exports.helpers = helpers;
exports.commands = commands;
commands.getDeviceTime = (0, _asyncToGenerator2.default)(function* () {
  _logger.default.info('Attempting to capture tizen device date and time');

  try {
    let out = yield this.sdb.shell(['date']);
    return out.trim();
  } catch (err) {
    _logger.default.errorAndThrow(`Could not capture device date and time: ${err}`);
  }
});

commands.pressKeyCode = function () {
  var _ref2 = (0, _asyncToGenerator2.default)(function* (key) {
    return yield this.bootstrap.sendAction("pressKey", {
      key
    });
  });

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();

commands.releaseKeyCode = function () {
  var _ref3 = (0, _asyncToGenerator2.default)(function* (key) {
    return yield this.bootstrap.sendAction("releaseKey", {
      key
    });
  });

  return function (_x2) {
    return _ref3.apply(this, arguments);
  };
}();

commands.keys = function () {
  var _ref4 = (0, _asyncToGenerator2.default)(function* (keys) {
    let text = _lodash.default.isArray(keys) ? keys.join('') : keys;
    let params = {
      elementId: "",
      text,
      replace: false
    };
    return yield this.bootstrap.sendAction("element:setText", params);
  });

  return function (_x3) {
    return _ref4.apply(this, arguments);
  };
}();

commands.sendKey = function () {
  var _ref5 = (0, _asyncToGenerator2.default)(function* (key) {
    return yield this.bootstrap.sendAction('sendKey', {
      key
    });
  });

  return function (_x4) {
    return _ref5.apply(this, arguments);
  };
}();

commands.pressHardwareKey = function () {
  var _ref6 = (0, _asyncToGenerator2.default)(function* (key) {
    return yield this.sendKey(key);
  });

  return function (_x5) {
    return _ref6.apply(this, arguments);
  };
}();

commands.back = (0, _asyncToGenerator2.default)(function* () {
  return yield this.sendKey("XF86Back");
});

commands.installApp = function () {
  var _ref8 = (0, _asyncToGenerator2.default)(function* (tpk) {
    const rootDir = _path.default.resolve(__dirname, '..', '..', '..');

    const tpkPath = _path.default.resolve(rootDir, 'app');

    let fullPath = _path.default.resolve(tpkPath, tpk);

    if (!(yield _appiumSupport.fs.exists(fullPath))) {
      _logger.default.errorAndThrow(`Could not find app tpk at ${tpk}`);

      return false;
    }

    return this.sdb.install(fullPath);
  });

  return function (_x6) {
    return _ref8.apply(this, arguments);
  };
}();

commands.removeApp = function (appPackage) {
  return this.sdb.uninstall(appPackage);
};

commands.isAppInstalled = function (appPackage) {
  return this.sdb.isAppInstalled(appPackage);
};

commands.launchApp = (0, _asyncToGenerator2.default)(function* () {
  return yield this.startApp();
});

commands.startApp = function () {
  var _ref10 = (0, _asyncToGenerator2.default)(function* (opts = {}) {
    return yield this.sdb.startApp(this.opts.appPackage, opts);
  });

  return function () {
    return _ref10.apply(this, arguments);
  };
}();

commands.closeApp = (0, _asyncToGenerator2.default)(function* () {
  yield this.sdb.forceStop(this.opts.appPackage);
});

commands.isStartedApp = function () {
  var _ref12 = (0, _asyncToGenerator2.default)(function* (opts = {}) {
    return yield this.sdb.isStartedApp(this.opts.appPackage, opts);
  });

  return function () {
    return _ref12.apply(this, arguments);
  };
}();

Object.assign(extensions, commands, helpers);
var _default = extensions;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9nZW5lcmFsLmpzIl0sIm5hbWVzIjpbImNvbW1hbmRzIiwiaGVscGVycyIsImV4dGVuc2lvbnMiLCJnZXREZXZpY2VUaW1lIiwibG9nIiwiaW5mbyIsIm91dCIsInNkYiIsInNoZWxsIiwidHJpbSIsImVyciIsImVycm9yQW5kVGhyb3ciLCJwcmVzc0tleUNvZGUiLCJrZXkiLCJib290c3RyYXAiLCJzZW5kQWN0aW9uIiwicmVsZWFzZUtleUNvZGUiLCJrZXlzIiwidGV4dCIsIl8iLCJpc0FycmF5Iiwiam9pbiIsInBhcmFtcyIsImVsZW1lbnRJZCIsInJlcGxhY2UiLCJzZW5kS2V5IiwicHJlc3NIYXJkd2FyZUtleSIsImJhY2siLCJpbnN0YWxsQXBwIiwidHBrIiwicm9vdERpciIsInBhdGgiLCJyZXNvbHZlIiwiX19kaXJuYW1lIiwidHBrUGF0aCIsImZ1bGxQYXRoIiwiZnMiLCJleGlzdHMiLCJpbnN0YWxsIiwicmVtb3ZlQXBwIiwiYXBwUGFja2FnZSIsInVuaW5zdGFsbCIsImlzQXBwSW5zdGFsbGVkIiwibGF1bmNoQXBwIiwic3RhcnRBcHAiLCJvcHRzIiwiY2xvc2VBcHAiLCJmb3JjZVN0b3AiLCJpc1N0YXJ0ZWRBcHAiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUEsSUFBSUEsUUFBUSxHQUFHLEVBQWY7QUFBQSxJQUFtQkMsT0FBTyxHQUFHLEVBQTdCO0FBQUEsSUFBaUNDLFVBQVUsR0FBRyxFQUE5Qzs7O0FBRUFGLFFBQVEsQ0FBQ0csYUFBVCxtQ0FBeUIsYUFBa0I7QUFDekNDLGtCQUFJQyxJQUFKLENBQVMsa0RBQVQ7O0FBQ0EsTUFBSTtBQUNGLFFBQUlDLEdBQUcsU0FBUyxLQUFLQyxHQUFMLENBQVNDLEtBQVQsQ0FBZSxDQUFDLE1BQUQsQ0FBZixDQUFoQjtBQUNBLFdBQU9GLEdBQUcsQ0FBQ0csSUFBSixFQUFQO0FBQ0QsR0FIRCxD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LENBQXdCRixVQUF4QixDQUFQO0FBQ0QsQ0FGRDs7QUFJQXhDLFFBQVEsQ0FBQzJDLFNBQVQsbUNBQXFCLGFBQWtCO0FBQ3JDLGVBQWEsS0FBS0MsUUFBTCxFQUFiO0FBQ0QsQ0FGRDs7QUFJQTVDLFFBQVEsQ0FBQzRDLFFBQVQ7QUFBQSwrQ0FBb0IsV0FBZ0JDLElBQUksR0FBRyxFQUF2QixFQUEyQjtBQUM3QyxpQkFBYSxLQUFLdEMsR0FBTCxDQUFTcUMsUUFBVCxDQUFrQixLQUFLQyxJQUFMLENBQVVMLFVBQTVCLEVBQXdDSyxJQUF4QyxDQUFiO0FBQ0QsR0FGRDs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFJQTdDLFFBQVEsQ0FBQzhDLFFBQVQsbUNBQW9CLGFBQWtCO0FBQ3BDLFFBQU0sS0FBS3ZDLEdBQUwsQ0FBU3dDLFNBQVQsQ0FBbUIsS0FBS0YsSUFBTCxDQUFVTCxVQUE3QixDQUFOO0FBQ0QsQ0FGRDs7QUFJQXhDLFFBQVEsQ0FBQ2dELFlBQVQ7QUFBQSwrQ0FBd0IsV0FBZ0JILElBQUksR0FBRyxFQUF2QixFQUEyQjtBQUNqRCxpQkFBYSxLQUFLdEMsR0FBTCxDQUFTeUMsWUFBVCxDQUFzQixLQUFLSCxJQUFMLENBQVVMLFVBQWhDLEVBQTRDSyxJQUE1QyxDQUFiO0FBQ0QsR0FGRDs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFJQUksTUFBTSxDQUFDQyxNQUFQLENBQWNoRCxVQUFkLEVBQTBCRixRQUExQixFQUFvQ0MsT0FBcEM7ZUFFZUMsVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsb2cgZnJvbSAnLi4vbG9nZ2VyJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBmcyB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5sZXQgY29tbWFuZHMgPSB7fSwgaGVscGVycyA9IHt9LCBleHRlbnNpb25zID0ge307XG5cbmNvbW1hbmRzLmdldERldmljZVRpbWUgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGxvZy5pbmZvKCdBdHRlbXB0aW5nIHRvIGNhcHR1cmUgdGl6ZW4gZGV2aWNlIGRhdGUgYW5kIHRpbWUnKTtcbiAgdHJ5IHtcbiAgICBsZXQgb3V0ID0gYXdhaXQgdGhpcy5zZGIuc2hlbGwoWydkYXRlJ10pO1xuICAgIHJldHVybiBvdXQudHJpbSgpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgQ291bGQgbm90IGNhcHR1cmUgZGV2aWNlIGRhdGUgYW5kIHRpbWU6ICR7ZXJyfWApO1xuICB9XG59O1xuXG5jb21tYW5kcy5wcmVzc0tleUNvZGUgPSBhc3luYyBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwicHJlc3NLZXlcIiwgeyBrZXkgfSk7XG59O1xuXG5jb21tYW5kcy5yZWxlYXNlS2V5Q29kZSA9IGFzeW5jIGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJyZWxlYXNlS2V5XCIsIHsga2V5IH0pO1xufTtcblxuY29tbWFuZHMua2V5cyA9IGFzeW5jIGZ1bmN0aW9uIChrZXlzKSB7XG4gIGxldCB0ZXh0ID0gXy5pc0FycmF5KGtleXMpID8ga2V5cy5qb2luKCcnKSA6IGtleXM7XG4gIGxldCBwYXJhbXMgPSB7XG4gICAgZWxlbWVudElkOiBcIlwiLFxuICAgIHRleHQsXG4gICAgcmVwbGFjZTogZmFsc2VcbiAgfTtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJlbGVtZW50OnNldFRleHRcIiwgcGFyYW1zKTtcbn07XG5cbmNvbW1hbmRzLnNlbmRLZXkgPSBhc3luYyBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKCdzZW5kS2V5JywgeyBrZXkgfSk7XG59O1xuXG5jb21tYW5kcy5wcmVzc0hhcmR3YXJlS2V5ID0gYXN5bmMgZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gYXdhaXQgdGhpcy5zZW5kS2V5KGtleSk7XG59O1xuXG5jb21tYW5kcy5iYWNrID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gYXdhaXQgdGhpcy5zZW5kS2V5KFwiWEY4NkJhY2tcIik7XG59O1xuXG5jb21tYW5kcy5pbnN0YWxsQXBwID0gYXN5bmMgZnVuY3Rpb24gKHRwaykge1xuICBjb25zdCByb290RGlyID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uJywgJy4uJywgJy4uJyk7XG4gIGNvbnN0IHRwa1BhdGggPSBwYXRoLnJlc29sdmUocm9vdERpciwgJ2FwcCcpO1xuXG4gIGxldCBmdWxsUGF0aCA9IHBhdGgucmVzb2x2ZSh0cGtQYXRoLCB0cGspO1xuICBpZiAoIShhd2FpdCBmcy5leGlzdHMoZnVsbFBhdGgpKSkge1xuICAgIGxvZy5lcnJvckFuZFRocm93KGBDb3VsZCBub3QgZmluZCBhcHAgdHBrIGF0ICR7dHBrfWApO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdGhpcy5zZGIuaW5zdGFsbChmdWxsUGF0aCk7XG59O1xuXG5jb21tYW5kcy5yZW1vdmVBcHAgPSBmdW5jdGlvbiAoYXBwUGFja2FnZSkge1xuICByZXR1cm4gdGhpcy5zZGIudW5pbnN0YWxsKGFwcFBhY2thZ2UpO1xufTtcblxuY29tbWFuZHMuaXNBcHBJbnN0YWxsZWQgPSBmdW5jdGlvbiAoYXBwUGFja2FnZSkge1xuICByZXR1cm4gdGhpcy5zZGIuaXNBcHBJbnN0YWxsZWQoYXBwUGFja2FnZSk7XG59O1xuXG5jb21tYW5kcy5sYXVuY2hBcHAgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLnN0YXJ0QXBwKCk7XG59O1xuXG5jb21tYW5kcy5zdGFydEFwcCA9IGFzeW5jIGZ1bmN0aW9uIChvcHRzID0ge30pIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuc2RiLnN0YXJ0QXBwKHRoaXMub3B0cy5hcHBQYWNrYWdlLCBvcHRzKTtcbn07XG5cbmNvbW1hbmRzLmNsb3NlQXBwID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBhd2FpdCB0aGlzLnNkYi5mb3JjZVN0b3AodGhpcy5vcHRzLmFwcFBhY2thZ2UpO1xufTtcblxuY29tbWFuZHMuaXNTdGFydGVkQXBwID0gYXN5bmMgZnVuY3Rpb24gKG9wdHMgPSB7fSkge1xuICByZXR1cm4gYXdhaXQgdGhpcy5zZGIuaXNTdGFydGVkQXBwKHRoaXMub3B0cy5hcHBQYWNrYWdlLCBvcHRzKTtcbn07XG5cbk9iamVjdC5hc3NpZ24oZXh0ZW5zaW9ucywgY29tbWFuZHMsIGhlbHBlcnMpO1xuZXhwb3J0IHsgY29tbWFuZHMsIGhlbHBlcnMgfTtcbmV4cG9ydCBkZWZhdWx0IGV4dGVuc2lvbnM7XG4iXSwiZmlsZSI6ImxpYi9jb21tYW5kcy9nZW5lcmFsLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=
