"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.helpers = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = _interopRequireDefault(require("lodash"));

var _logger = _interopRequireDefault(require("./logger"));

var _appiumSdb = _interopRequireDefault(require("appium-sdb"));

let helpers = {};
exports.helpers = helpers;

helpers.getDeviceInfoFromCaps = function () {
  var _ref = (0, _asyncToGenerator2.default)(function* (opts = {}) {
    let sdb = yield _appiumSdb.default.createSDB({
      sdbPort: opts.sdbPort
    });
    let udid;

    if (opts.udid) {
      udid = opts.udid;
    } else {
      udid = opts.deviceName;
    }

    let emPort = null;
    let status = false;

    if (udid.includes("192.168.250.250") || udid.includes("192.168.1.11")) {
      let result = yield sdb.ConnectDevice(udid);

      if (result) {
        udid = udid + ":26101";
      }
    }

    _logger.default.info("Retrieving device list");

    let devices = yield sdb.getDevicesWithRetry();

    if (devices.length > 1) {
      for (let i = 0; i < devices.length; i++) {
        if (udid === devices[i].udid) {
          status = true;
        }
      }
    }

    if (!status) {
      udid = devices[0].udid;
    }

    emPort = sdb.getPortFromEmulatorString(udid);

    _logger.default.info(`Using device: ${udid}`);

    return {
      udid,
      emPort
    };
  });

  return function () {
    return _ref.apply(this, arguments);
  };
}();

helpers.createSDB = function () {
  var _ref2 = (0, _asyncToGenerator2.default)(function* (udid, emPort, sdbPort, suppressKillServer) {
    let sdb = yield _appiumSdb.default.createSDB({
      sdbPort,
      suppressKillServer
    });
    sdb.setDeviceId(udid);

    if (emPort) {
      sdb.setEmulatorPort(emPort);
    }

    return sdb;
  });

  return function (_x, _x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

helpers.truncateDecimals = function (number, digits) {
  let multiplier = Math.pow(10, digits);
  let adjustedNum = number * multiplier;
  let truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);
  return truncatedNum / multiplier;
};

helpers.removeNullProperties = function (obj) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _lodash.default.keys(obj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      let key = _step.value;

      if (_lodash.default.isNull(obj[key]) || _lodash.default.isUndefined(obj[key])) {
        delete obj[key];
      }
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
};

var _default = helpers;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90aXplbi1oZWxwZXJzLmpzIl0sIm5hbWVzIjpbImhlbHBlcnMiLCJnZXREZXZpY2VJbmZvRnJvbUNhcHMiLCJvcHRzIiwic2RiIiwiU0RCIiwiY3JlYXRlU0RCIiwic2RiUG9ydCIsInVkaWQiLCJkZXZpY2VOYW1lIiwiZW1Qb3J0Iiwic3RhdHVzIiwiaW5jbHVkZXMiLCJyZXN1bHQiLCJDb25uZWN0RGV2aWNlIiwibG9nZ2VyIiwiaW5mbyIsImRldmljZXMiLCJnZXREZXZpY2VzV2l0aFJldHJ5IiwibGVuZ3RoIiwiaSIsImdldFBvcnRGcm9tRW11bGF0b3JTdHJpbmciLCJzdXBwcmVzc0tpbGxTZXJ2ZXIiLCJzZXREZXZpY2VJZCIsInNldEVtdWxhdG9yUG9ydCIsInRydW5jYXRlRGVjaW1hbHMiLCJudW1iZXIiLCJkaWdpdHMiLCJtdWx0aXBsaWVyIiwiTWF0aCIsInBvdyIsImFkanVzdGVkTnVtIiwidHJ1bmNhdGVkTnVtIiwicmVtb3ZlTnVsbFByb3BlcnRpZXMiLCJvYmoiLCJfIiwia2V5cyIsImtleSIsImlzTnVsbCIsImlzVW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUVBLElBQUlBLE9BQU8sR0FBRyxFQUFkOzs7QUFFQUEsT0FBTyxDQUFDQyxxQkFBUjtBQUFBLDZDQUFnQyxXQUFnQkMsSUFBSSxHQUFHLEVBQXZCLEVBQTJCO0FBQ3pELFFBQUlDLEdBQUcsU0FBU0MsbUJBQUlDLFNBQUosQ0FBYztBQUM1QkMsTUFBQUEsT0FBTyxFQUFFSixJQUFJLENBQUNJO0FBRGMsS0FBZCxDQUFoQjtBQUdBLFFBQUlDLElBQUo7O0FBQ0EsUUFBSUwsSUFBSSxDQUFDSyxJQUFULEVBQWU7QUFDYkEsTUFBQUEsSUFBSSxHQUFHTCxJQUFJLENBQUNLLElBQVo7QUFDRCxLQUZELE1BRU87QUFDTEEsTUFBQUEsSUFBSSxHQUFHTCxJQUFJLENBQUNNLFVBQVo7QUFDRDs7QUFFRCxRQUFJQyxNQUFNLEdB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QUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNN0MsQ0FORDs7ZUFTZXBDLE8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgU0RCIGZyb20gJ2FwcGl1bS1zZGInO1xuXG5sZXQgaGVscGVycyA9IHt9O1xuXG5oZWxwZXJzLmdldERldmljZUluZm9Gcm9tQ2FwcyA9IGFzeW5jIGZ1bmN0aW9uIChvcHRzID0ge30pIHtcbiAgbGV0IHNkYiA9IGF3YWl0IFNEQi5jcmVhdGVTREIoe1xuICAgIHNkYlBvcnQ6IG9wdHMuc2RiUG9ydFxuICB9KTtcbiAgbGV0IHVkaWQ7XG4gIGlmIChvcHRzLnVkaWQpIHtcbiAgICB1ZGlkID0gb3B0cy51ZGlkO1xuICB9IGVsc2Uge1xuICAgIHVkaWQgPSBvcHRzLmRldmljZU5hbWU7XG4gIH1cblxuICBsZXQgZW1Qb3J0ID0gbnVsbDtcbiAgbGV0IHN0YXR1cyA9IGZhbHNlO1xuXG4gIGlmICh1ZGlkLmluY2x1ZGVzKFwiMTkyLjE2OC4yNTAuMjUwXCIpIHx8IHVkaWQuaW5jbHVkZXMoXCIxOTIuMTY4LjEuMTFcIikpIHtcbiAgICBsZXQgcmVzdWx0ID0gYXdhaXQgc2RiLkNvbm5lY3REZXZpY2UodWRpZCk7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgdWRpZCA9IHVkaWQgKyBcIjoyNjEwMVwiO1xuICAgIH1cbiAgfVxuXG4gIGxvZ2dlci5pbmZvKFwiUmV0cmlldmluZyBkZXZpY2UgbGlzdFwiKTtcblxuICBsZXQgZGV2aWNlcyA9IGF3YWl0IHNkYi5nZXREZXZpY2VzV2l0aFJldHJ5KCk7XG4gIGlmIChkZXZpY2VzLmxlbmd0aCA+IDEpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRldmljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh1ZGlkID09PSBkZXZpY2VzW2ldLnVkaWQpIHtcbiAgICAgICAgc3RhdHVzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKCFzdGF0dXMpIHtcbiAgICB1ZGlkID0gZGV2aWNlc1swXS51ZGlkO1xuICB9XG4gIGVtUG9ydCA9IHNkYi5nZXRQb3J0RnJvbUVtdWxhdG9yU3RyaW5nKHVkaWQpO1xuXG4gIGxvZ2dlci5pbmZvKGBVc2luZyBkZXZpY2U6ICR7dWRpZH1gKTtcbiAgcmV0dXJuIHsgdWRpZCwgZW1Qb3J0IH07XG59O1xuXG5oZWxwZXJzLmNyZWF0ZVNEQiA9IGFzeW5jIGZ1bmN0aW9uICh1ZGlkLCBlbVBvcnQsIHNkYlBvcnQsIHN1cHByZXNzS2lsbFNlcnZlcikge1xuICBsZXQgc2RiID0gYXdhaXQgU0RCLmNyZWF0ZVNEQih7c2RiUG9ydCwgc3VwcHJlc3NLaWxsU2VydmVyfSk7XG5cbiAgc2RiLnNldERldmljZUlkKHVkaWQpO1xuICBpZiAoZW1Qb3J0KSB7XG4gICAgc2RiLnNldEVtdWxhdG9yUG9ydChlbVBvcnQpO1xuICB9XG5cbiAgcmV0dXJuIHNkYjtcbn07XG5cbmhlbHBlcnMudHJ1bmNhdGVEZWNpbWFscyA9IGZ1bmN0aW9uIChudW1iZXIsIGRpZ2l0cykge1xuICBsZXQgbXVsdGlwbGllciA9IE1hdGgucG93KDEwLCBkaWdpdHMpO1xuICBsZXQgYWRqdXN0ZWROdW0gPSBudW1iZXIgKiBtdWx0aXBsaWVyO1xuICBsZXQgdHJ1bmNhdGVkTnVtID0gTWF0aFthZGp1c3RlZE51bSA8IDAgPyAnY2VpbCcgOiAnZmxvb3InXShhZGp1c3RlZE51bSk7XG5cbiAgcmV0dXJuIHRydW5jYXRlZE51bSAvIG11bHRpcGxpZXI7XG59O1xuXG5oZWxwZXJzLnJlbW92ZU51bGxQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKG9iaikge1xuICBmb3IgKGxldCBrZXkgb2YgXy5rZXlzKG9iaikpIHtcbiAgICBpZiAoXy5pc051bGwob2JqW2tleV0pIHx8IF8uaXNVbmRlZmluZWQob2JqW2tleV0pKSB7XG4gICAgICBkZWxldGUgb2JqW2tleV07XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgeyBoZWxwZXJzIH07XG5leHBvcnQgZGVmYXVsdCBoZWxwZXJzO1xuIl0sImZpbGUiOiJsaWIvdGl6ZW4taGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLiJ9
