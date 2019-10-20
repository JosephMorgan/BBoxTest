"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loggerJs = require('../logger.js');

var _loggerJs2 = _interopRequireDefault(_loggerJs);

var methods = {};

methods.getSdbWithCorrectSdbPath = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getSdkBinaryPath("sdb"));

      case 2:
        this.executable.path = context$1$0.sent;

        this.binaries.sdb = this.executable.path;
        return context$1$0.abrupt("return", this.sdb);

      case 5:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

methods.isDeviceConnected = function callee$0$0() {
  var device;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getDeviceStatus());

      case 2:
        device = context$1$0.sent;
        return context$1$0.abrupt("return", device === "device");

      case 4:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

methods.mkdir = function callee$0$0(remotePath) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(["mkdir " + remotePath]));

      case 2:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 3:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

methods.isValidClass = function (classString) {
  return new RegExp(/^[a-zA-Z0-9\./_]+$/).exec(classString);
};

methods.forceStop = function callee$0$0(pkg) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['app_launcher', '-k', pkg]));

      case 2:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 3:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

methods.getSdbPath = function () {
  return this.executable.path;
};

methods.rimraf = function callee$0$0(path) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['rm', '-rf', path]));

      case 2:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

methods.push = function callee$0$0(localPath, remotePath, opts) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.sdbExec(['push', localPath, remotePath], opts));

      case 2:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

methods.pull = function callee$0$0(remotePath, localPath) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.sdbExec(['pull', remotePath, localPath], { timeout: 60000 }));

      case 2:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

methods.processExists = function callee$0$0(processName) {
  var stdout, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, line, pkgColumn;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;

        if (this.isValidClass(processName)) {
          context$1$0.next = 3;
          break;
        }

        throw new Error("Invalid process name: " + processName);

      case 3:
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.shell("ps -ef"));

      case 5:
        stdout = context$1$0.sent;
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 9;
        _iterator = _getIterator(stdout.split(/\r?\n/));

      case 11:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 20;
          break;
        }

        line = _step.value;

        line = line.trim().split(/\s+/);
        pkgColumn = line[line.length - 1];

        if (!(pkgColumn && pkgColumn.indexOf(processName) !== -1)) {
          context$1$0.next = 17;
          break;
        }

        return context$1$0.abrupt("return", true);

      case 17:
        _iteratorNormalCompletion = true;
        context$1$0.next = 11;
        break;

      case 20:
        context$1$0.next = 26;
        break;

      case 22:
        context$1$0.prev = 22;
        context$1$0.t0 = context$1$0["catch"](9);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 26:
        context$1$0.prev = 26;
        context$1$0.prev = 27;

        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }

      case 29:
        context$1$0.prev = 29;

        if (!_didIteratorError) {
          context$1$0.next = 32;
          break;
        }

        throw _iteratorError;

      case 32:
        return context$1$0.finish(29);

      case 33:
        return context$1$0.finish(26);

      case 34:
        return context$1$0.abrupt("return", false);

      case 37:
        context$1$0.prev = 37;
        context$1$0.t1 = context$1$0["catch"](0);

        _loggerJs2["default"].errorAndThrow("Error finding if process exists. Original error: " + context$1$0.t1.message);

      case 40:
      case "end":
        return context$1$0.stop();
    }
  }, null, this, [[0, 37], [9, 22, 26, 34], [27,, 29, 33]]);
};

methods.forwardPort = function callee$0$0(systemPort, devicePort) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2["default"].debug("Forwarding system: " + systemPort + " to device: " + devicePort);
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.sdbExec(['forward', "tcp:" + systemPort, "tcp:" + devicePort]));

      case 3:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

methods.removePortForward = function callee$0$0(systemPort) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2["default"].debug("Removing forwarded port socket connection: " + systemPort + " ");
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.sdbExec(['forward', "--remove", "tcp:" + systemPort]));

      case 3:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

methods.ping = function callee$0$0() {
  var stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(["echo", "ping"]));

      case 2:
        stdout = context$1$0.sent;

        if (!(stdout.indexOf("ping") === 0)) {
          context$1$0.next = 5;
          break;
        }

        return context$1$0.abrupt("return", true);

      case 5:
        throw new Error("SDB ping failed, returned " + stdout);

      case 6:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

methods.restart = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.restartSdb());

      case 3:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 6:
        context$1$0.prev = 6;
        context$1$0.t0 = context$1$0["catch"](0);

        _loggerJs2["default"].errorAndThrow("Restart failed. Orginial error: " + context$1$0.t0.message);

      case 9:
      case "end":
        return context$1$0.stop();
    }
  }, null, this, [[0, 6]]);
};

methods.takeScreenShot = function callee$0$0() {
  var stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(["enlightenment_info -dump_screen"]));

      case 2:
        stdout = context$1$0.sent;

        if (!(stdout.indexOf("dump_screen.png") > -1)) {
          context$1$0.next = 7;
          break;
        }

        return context$1$0.abrupt("return", true);

      case 7:
        return context$1$0.abrupt("return", false);

      case 8:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

exports["default"] = methods;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90b29scy9zZGItY29tbWFuZHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3dCQUFnQixjQUFjOzs7O0FBRTlCLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQzs7QUFFakIsT0FBTyxDQUFDLHdCQUF3QixHQUFHOzs7Ozt5Q0FDSixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDOzs7QUFBekQsWUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJOztBQUNwQixZQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQzs0Q0FDbEMsSUFBSSxDQUFDLEdBQUc7Ozs7Ozs7Q0FDaEIsQ0FBQzs7QUFFRixPQUFPLENBQUMsaUJBQWlCLEdBQUc7TUFDdEIsTUFBTTs7Ozs7eUNBQVMsSUFBSSxDQUFDLGVBQWUsRUFBRTs7O0FBQXJDLGNBQU07NENBQ0YsTUFBTSxLQUFLLFFBQVE7Ozs7Ozs7Q0FDNUIsQ0FBQzs7QUFFRixPQUFPLENBQUMsS0FBSyxHQUFHLG9CQUFnQixVQUFVOzs7Ozt5Q0FDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFVLFVBQVUsQ0FBRyxDQUFDOzs7Ozs7Ozs7O0NBQ2pELENBQUM7O0FBRUYsT0FBTyxDQUFDLFlBQVksR0FBRyxVQUFVLFdBQVcsRUFBRTtBQUM1QyxTQUFPLElBQUksTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0NBQzNELENBQUM7O0FBRUYsT0FBTyxDQUFDLFNBQVMsR0FBRyxvQkFBZ0IsR0FBRzs7Ozs7eUNBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxjQUFjLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0NBQ3JELENBQUM7O0FBRUYsT0FBTyxDQUFDLFVBQVUsR0FBRyxZQUFZO0FBQy9CLFNBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7Q0FDN0Is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Q0FBQyxpQ0FBaUMsQ0FBQyxDQUFDOzs7QUFBOUQsY0FBTTs7Y0FDTixNQUFNLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7Ozs7OzRDQUNqQyxJQUFJOzs7NENBRUosS0FBSzs7Ozs7OztDQUVmLENBQUM7O3FCQUVhLE9BQU8iLCJmaWxlIjoibGliL3Rvb2xzL3NkYi1jb21tYW5kcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsb2cgZnJvbSAnLi4vbG9nZ2VyLmpzJztcblxubGV0IG1ldGhvZHMgPSB7fTtcblxubWV0aG9kcy5nZXRTZGJXaXRoQ29ycmVjdFNkYlBhdGggPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZXhlY3V0YWJsZS5wYXRoID0gYXdhaXQgdGhpcy5nZXRTZGtCaW5hcnlQYXRoKFwic2RiXCIpO1xuICB0aGlzLmJpbmFyaWVzLnNkYiA9IHRoaXMuZXhlY3V0YWJsZS5wYXRoO1xuICByZXR1cm4gdGhpcy5zZGI7XG59O1xuXG5tZXRob2RzLmlzRGV2aWNlQ29ubmVjdGVkID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBsZXQgZGV2aWNlID0gYXdhaXQgdGhpcy5nZXREZXZpY2VTdGF0dXMoKTtcbiAgcmV0dXJuIChkZXZpY2UgPT09IFwiZGV2aWNlXCIpO1xufTtcblxubWV0aG9kcy5ta2RpciA9IGFzeW5jIGZ1bmN0aW9uIChyZW1vdGVQYXRoKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLnNoZWxsKFtgbWtkaXIgJHtyZW1vdGVQYXRofWBdKTtcbn07XG5cbm1ldGhvZHMuaXNWYWxpZENsYXNzID0gZnVuY3Rpb24gKGNsYXNzU3RyaW5nKSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKC9eW2EtekEtWjAtOVxcLi9fXSskLykuZXhlYyhjbGFzc1N0cmluZyk7XG59O1xuXG5tZXRob2RzLmZvcmNlU3RvcCA9IGFzeW5jIGZ1bmN0aW9uIChwa2cpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuc2hlbGwoWydhcHBfbGF1bmNoZXInLCAnLWsnLCBwa2ddKTtcbn07XG5cbm1ldGhvZHMuZ2V0U2RiUGF0aCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuZXhlY3V0YWJsZS5wYXRoO1xufTtcblxubWV0aG9kcy5yaW1yYWYgPSBhc3luYyBmdW5jdGlvbiAocGF0aCkge1xuICBhd2FpdCB0aGlzLnNoZWxsKFsncm0nLCAnLXJmJywgcGF0aF0pO1xufTtcblxubWV0aG9kcy5wdXNoID0gYXN5bmMgZnVuY3Rpb24gKGxvY2FsUGF0aCwgcmVtb3RlUGF0aCwgb3B0cykge1xuICBhd2FpdCB0aGlzLnNkYkV4ZWMoWydwdXNoJywgbG9jYWxQYXRoLCByZW1vdGVQYXRoXSwgb3B0cyk7XG59O1xuXG5tZXRob2RzLnB1bGwgPSBhc3luYyBmdW5jdGlvbiAocmVtb3RlUGF0aCwgbG9jYWxQYXRoKSB7XG4gIGF3YWl0IHRoaXMuc2RiRXhlYyhbJ3B1bGwnLCByZW1vdGVQYXRoLCBsb2NhbFBhdGhdLCB7dGltZW91dDogNjAwMDB9KTtcbn07XG5cbm1ldGhvZHMucHJvY2Vzc0V4aXN0cyA9IGFzeW5jIGZ1bmN0aW9uIChwcm9jZXNzTmFtZSkge1xuICB0cnkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkQ2xhc3MocHJvY2Vzc05hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcHJvY2VzcyBuYW1lOiAke3Byb2Nlc3NOYW1lfWApO1xuICAgIH1cbiAgICBsZXQgc3Rkb3V0ID0gYXdhaXQgdGhpcy5zaGVsbChcInBzIC1lZlwiKTtcbiAgICBmb3IgKGxldCBsaW5lIG9mIHN0ZG91dC5zcGxpdCgvXFxyP1xcbi8pKSB7XG4gICAgICBsaW5lID0gbGluZS50cmltKCkuc3BsaXQoL1xccysvKTtcbiAgICAgIGxldCBwa2dDb2x1bW4gPSBsaW5lW2xpbmUubGVuZ3RoIC0gMV07XG4gICAgICBpZiAocGtnQ29sdW1uICYmIHBrZ0NvbHVtbi5pbmRleE9mKHByb2Nlc3NOYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZy5lcnJvckFuZFRocm93KGBFcnJvciBmaW5kaW5nIGlmIHByb2Nlc3MgZXhpc3RzLiBPcmlnaW5hbCBlcnJvcjogJHtlLm1lc3NhZ2V9YCk7XG4gIH1cbn07XG5cbm1ldGhvZHMuZm9yd2FyZFBvcnQgPSBhc3luYyBmdW5jdGlvbiAoc3lzdGVtUG9ydCwgZGV2aWNlUG9ydCkge1xuICBsb2cuZGVidWcoYEZvcndhcmRpbmcgc3lzdGVtOiAke3N5c3RlbVBvcnR9IHRvIGRldmljZTogJHtkZXZpY2VQb3J0fWApO1xuICBhd2FpdCB0aGlzLnNkYkV4ZWMoWydmb3J3YXJkJywgYHRjcDoke3N5c3RlbVBvcnR9YCwgYHRjcDoke2RldmljZVBvcnR9YF0pO1xufTtcblxubWV0aG9kcy5yZW1vdmVQb3J0Rm9yd2FyZCA9IGFzeW5jIGZ1bmN0aW9uIChzeXN0ZW1Qb3J0KSB7XG4gIGxvZy5kZWJ1ZyhgUmVtb3ZpbmcgZm9yd2FyZGVkIHBvcnQgc29ja2V0IGNvbm5lY3Rpb246ICR7c3lzdGVtUG9ydH0gYCk7XG4gIGF3YWl0IHRoaXMuc2RiRXhlYyhbJ2ZvcndhcmQnLCBgLS1yZW1vdmVgLCBgdGNwOiR7c3lzdGVtUG9ydH1gXSk7XG59O1xuXG5tZXRob2RzLnBpbmcgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGxldCBzdGRvdXQgPSBhd2FpdCB0aGlzLnNoZWxsKFtcImVjaG9cIiwgXCJwaW5nXCJdKTtcbiAgaWYgKHN0ZG91dC5pbmRleE9mKFwicGluZ1wiKSA9PT0gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihgU0RCIHBpbmcgZmFpbGVkLCByZXR1cm5lZCAke3N0ZG91dH1gKTtcbn07XG5cbm1ldGhvZHMucmVzdGFydCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5yZXN0YXJ0U2RiKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgUmVzdGFydCBmYWlsZWQuIE9yZ2luaWFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcbiAgfVxufTtcblxubWV0aG9kcy50YWtlU2NyZWVuU2hvdCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgbGV0IHN0ZG91dCA9IGF3YWl0IHRoaXMuc2hlbGwoW1wiZW5saWdodGVubWVudF9pbmZvIC1kdW1wX3NjcmVlblwiXSk7XG4gIGlmIChzdGRvdXQuaW5kZXhPZihcImR1bXBfc2NyZWVuLnBuZ1wiKSA+IC0xKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBtZXRob2RzO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9
