'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _loggerJs = require('../logger.js');

var _loggerJs2 = _interopRequireDefault(_loggerJs);

var tpkUtilsMethods = {};

tpkUtilsMethods.isAppInstalled = function callee$0$0(pkg) {
  var installed, stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        installed = false;

        _loggerJs2['default'].debug('Getting install status for ' + pkg);
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.shell('app_launcher --list | grep ' + pkg));

      case 5:
        stdout = context$1$0.sent;

        if (stdout.indexOf('' + pkg) > -1) {
          installed = true;
        }
        _loggerJs2['default'].debug('App is' + (!installed ? ' not' : '') + ' installed');
        return context$1$0.abrupt('return', installed);

      case 11:
        context$1$0.prev = 11;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error finding if app is installed. Original error: ' + context$1$0.t0.message);

      case 14:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 11]]);
};

tpkUtilsMethods.startApp = function callee$0$0(pkg) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;

        _loggerJs2['default'].debug('Getting start app for ' + pkg);
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.shell(['app_launcher -s ' + pkg], opts));

      case 4:
        stdout = context$1$0.sent;
        return context$1$0.abrupt('return', stdout.indexOf("successfully") > -1 ? true : false);

      case 8:
        context$1$0.prev = 8;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error occured while starting App. Original error: ' + context$1$0.t0.message);

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 8]]);
};

tpkUtilsMethods.isStartedApp = function callee$0$0(pkg) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;

        _loggerJs2['default'].debug('Getting app startup status for ' + pkg);
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.shell(['app_launcher -S | grep ' + pkg], opts));

      case 4:
        stdout = context$1$0.sent;
        return context$1$0.abrupt('return', stdout.indexOf('' + pkg) > -1 ? true : false);

      case 8:
        context$1$0.prev = 8;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error occured while getting app startup status for App. Original error: ' + context$1$0.t0.message);

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 8]]);
};

tpkUtilsMethods.uninstall = function callee$0$0(pkg) {
  var stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Uninstalling ' + pkg);
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.forceStop(pkg));

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.sdbExec(['uninstall', pkg], { timeout: 20000 }));

      case 6:
        stdout = context$1$0.sent;

        if (!(stdout.indexOf("key[end] val[ok]") > -1)) {
          context$1$0.next = 11;
          break;
        }

        return context$1$0.abrupt('return', true);

      case 11:
        _loggerJs2['default'].errorAndThrow('uninstall pkg failed: ' + stdout);
        return context$1$0.abrupt('return', false);

      case 13:
        context$1$0.next = 18;
        break;

      case 15:
        context$1$0.prev = 15;
        context$1$0.t0 = context$1$0['catch'](1);

        _loggerJs2['default'].errorAndThrow('Unable to uninstall pkg. Original error: ' + context$1$0.t0.message);

      case 18:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 15]]);
};

tpkUtilsMethods.installFromDevicePath = function callee$0$0(tpkPathOnDevice) {
  var stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['pkgcmd -t tpk -i -p ' + tpkPathOnDevice]));

      case 2:
        stdout = context$1$0.sent;

        if (!(stdout.indexOf("key[end] val[ok]") > -1)) {
          context$1$0.next = 7;
          break;
        }

        return context$1$0.abrupt('return', true);

      case 7:
        _loggerJs2['default'].errorAndThrow('Remote install failed: ' + stdout);
        return context$1$0.abrupt('return', false);

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

tpkUtilsMethods.install = function callee$0$0(tpk) {
  var pkg = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  var replace = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
  var timeout = arguments.length <= 3 || arguments[3] === undefined ? 60000 : arguments[3];
  var stdout, result;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!replace) {
          context$1$0.next = 7;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.sdbExec(['install', tpk], { timeout: timeout }));

      case 3:
        stdout = context$1$0.sent;
        return context$1$0.abrupt('return', stdout.indexOf("key[end] val[ok]") > -1 ? true : false);

      case 7:
        context$1$0.prev = 7;

        if (!(pkg != null)) {
          context$1$0.next = 21;
          break;
        }

        result = this.isAppInstalled(pkg);

        if (result) {
          context$1$0.next = 17;
          break;
        }

        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(this.sdbExec(['install', tpk], { timeout: timeout }));

      case 13:
        result = this.isAppInstalled(pkg);
        return context$1$0.abrupt('return', result);

      case 17:
        _loggerJs2['default'].debug('Application \'' + pkg + '\' already installed. Continuing.');
        return context$1$0.abrupt('return', false);

      case 19:
        context$1$0.next = 23;
        break;

      case 21:
        _loggerJs2['default'].debug('Can\'t find app in device, because pkg name is null.');
        return context$1$0.abrupt('return', false);

      case 23:
        context$1$0.next = 28;
        break;

      case 25:
        context$1$0.prev = 25;
        context$1$0.t0 = context$1$0['catch'](7);

        _loggerJs2['default'].errorAndThrow('Unable to install TPK. Original error: ' + context$1$0.t0.message);

      case 28:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[7, 25]]);
};

exports['default'] = tpkUtilsMethods;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90b29scy90cGstdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozt3QkFBZ0IsY0FBYzs7OztBQUU5QixJQUFJLGVBQWUsR0FBRyxFQUFFLENBQUM7O0FBRXpCLGVBQWUsQ0FBQyxjQUFjLEdBQUcsb0JBQWdCLEdBQUc7TUFFNUMsU0FBUyxFQUVULE1BQU07Ozs7O0FBRk4saUJBQVMsR0FBRyxLQUFLOztBQUNyQiw4QkFBSSxLQUFLLGlDQUErQixHQUFHLENBQUcsQ0FBQzs7eUNBQzVCLElBQUksQ0FBQyxLQUFLLGlDQUErQixHQUFHLENBQUc7OztBQUE5RCxjQUFNOztBQUNWLFlBQUksTUFBTSxDQUFDLE9BQU8sTUFBSSxHQUFHLENBQUcsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUNqQyxtQkFBUyxHQUFHLElBQUksQ0FBQztTQUNsQjtBQUNELDhCQUFJLEtBQUssYUFBVSxDQUFDLFNBQVMsR0FBRyxNQUFNLEdBQUcsRUFBRSxDQUFBLGdCQUFhLENBQUM7NENBQ2xELFNBQVM7Ozs7OztBQUVoQiw4QkFBSSxhQUFhLHlEQUF1RCxlQUFFLE9BQU8sQ0FBRyxDQUFDOzs7Ozs7O0NBRXhGLENBQUM7O0FBRUYsZUFBZSxDQUFDLFFBQVEsR0FBRyxvQkFBZ0IsR0FBRztNQUFFLElBQUkseURBQUcsRUFBRTtNQUdqRCxNQUFNOzs7Ozs7QUFEViw4QkFBSSxLQUFLLDRCQUEwQixHQUFHLENBQUcsQ0FBQzs7eUNBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsc0JBQW9CLEdBQUcsQ0FBRyxFQUFFLElBQUksQ0FBQzs7O0FBQTNELGNBQU07NENBQ0gsQUFBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFJLElBQUksR0FBRyxLQUFLOzs7Ozs7QUFFM0QsOEJBQUksYUFBYSx3REFBc0QsZUFBRSxPQUFPLENBQUcsQ0FBQzs7Ozs7OztDQUV2RixDQUFDOztBQUVGLGVBQWUsQ0FBQyxZQUFZLEdBQUcsb0JBQWdCLEdBQUc7TUFBRSxJQUFJLHlEQUFHLEVBQUU7TUFHckQsTUFBTTs7Ozs7O0FBRFYsOEJBQUksS0FBSyxxQ0FBbUMsR0FBRyxDQUFHLENBQUM7O3lDQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLDZCQUEyQixHQUFHLENBQUcsRUFBRSxJQUFJLENBQUM7OztBQUFsRSxjQUFNOzRDQUNILEFBQUMsTUFBTSxDQUFDLE9BQU8sTUFBSSxHQUFHLENBQUcsR0FBRyxDQUFDLENBQUMsR0FBSSxJQUFJLEdBQUcsS0FBSzs7Ozs7O0FBRXJELDhCQUFJLGFBQWEsOEVBQTRFLGVBQUUsT0FBTyxDQUFHLENBQUM7Ozs7Ozs7Q0FFN0csQ0FBQzs7QUFFRixlQUFlLENBQUMsU0FBUyxHQUFHLG9CQUFnQixHQUFHO01BSXZDLE1BQU07Ozs7QUFIWiw4QkFBSSxLQUFLLG1CQUFpQixHQUFHLENBQUcsQ0FBQzs7O3lDQUV6QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQzs7Ozt5Q0FDTixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDOzs7QUFBbkUsY0FBTTs7Y0FDTixNQUFNLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7Ozs7OzRDQUNsQyxJQUFJOzs7QUFFWCw4QkFBSSxhQUFhLDRCQUEwQixNQUFNLENBQUcsQ0FBQzs0Q0FDOUMsS0FBSzs7Ozs7Ozs7OztBQUdkLDhCQUFJLGFBQWEsK0NBQTZDLGVBQUUsT0FBTyxDQUFHLENBQUM7Ozs7Ozs7Q0FFOUUsQ0FBQzs7QUFFRixlQUFlLENBQUMscUJBQXFCLEdBQUcsb0JBQWdCLGVBQWU7TUFDakUsTUFBTTs7Ozs7eUNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQywwQkFBd0IsZUFBZSxDQUFHLENBQUM7OztBQUFyRSxjQUFNOztjQUNOLE1BQU0sQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTs7Ozs7NENBQ2xDLElBQUk7OztBQUVYLDhCQUFJLGFBQWEsNkJBQTJCLE1BQU0sQ0FBRyxDQUFDOzRDQUMvQyxLQUFLOzs7Ozs7O0NBRWYsQ0FBQzs7QUFFRixlQUFlLENBQUMsT0FBTyxHQUFHLG9CQUFnQixHQUFHO01BQUUsR0FBRyx5REFBRyxJQUFJO01BQUUsT0FBTyx5REFBRyxJQUFJO01BQUUsT0FBTyx5REFBRyxLQUFLO01BRWxGLE1BQU0sRUFLRixNQUFNOzs7O2FBTlosT0FBTzs7Ozs7O3lDQUNVLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQVAsT0FBTyxFQUFFLENBQUM7OztBQUExRCxjQUFNOzRDQUNILEFBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFJLElBQUksR0FBRyxLQUFLOzs7OztjQUd6RCxHQUFHLElBQUksSUFBSSxDQUFBOzs7OztBQUNULGNBQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQzs7WUFDaEMsTUFBTTs7Ozs7O3lDQUNILElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQVAsT0FBTyxFQUFFLENBQUM7OztBQUNqRCxjQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0Q0FDM0IsTUFBTTs7O0FBRWIsOEJBQUksS0FBSyxvQkFBaUIsR0FBRyx1Q0FBbUMsQ0FBQzs0Q0FDMUQsS0FBSzs7Ozs7OztBQUdkLDhCQUFJLEtBQUssd0RBQXVELENBQUM7NENBQzFELEtBQUs7Ozs7Ozs7Ozs7QUFHZCw4QkFBSSxhQUFhLDZDQUEyQyxlQUFFLE9BQU8sQ0FBRyxDQUFDOzs7Ozs7O0NBRzlFLENBQUM7O3FCQUVhLGVBQWUiLCJmaWxlIjoibGliL3Rvb2xzL3Rway11dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsb2cgZnJvbSAnLi4vbG9nZ2VyLmpzJztcblxubGV0IHRwa1V0aWxzTWV0aG9kcyA9IHt9O1xuXG50cGtVdGlsc01ldGhvZHMuaXNBcHBJbnN0YWxsZWQgPSBhc3luYyBmdW5jdGlvbiAocGtnKSB7XG4gIHRyeSB7XG4gICAgbGV0IGluc3RhbGxlZCA9IGZhbHNlO1xuICAgIGxvZy5kZWJ1ZyhgR2V0dGluZyBpbnN0YWxsIHN0YXR1cyBmb3IgJHtwa2d9YCk7XG4gICAgbGV0IHN0ZG91dCA9IGF3YWl0IHRoaXMuc2hlbGwoYGFwcF9sYXVuY2hlciAtLWxpc3QgfCBncmVwICR7cGtnfWApO1xuICAgIGlmIChzdGRvdXQuaW5kZXhPZihgJHtwa2d9YCkgPiAtMSkge1xuICAgICAgaW5zdGFsbGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgbG9nLmRlYnVnKGBBcHAgaXMkeyFpbnN0YWxsZWQgPyAnIG5vdCcgOiAnJ30gaW5zdGFsbGVkYCk7XG4gICAgcmV0dXJuIGluc3RhbGxlZDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZy5lcnJvckFuZFRocm93KGBFcnJvciBmaW5kaW5nIGlmIGFwcCBpcyBpbnN0YWxsZWQuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcbiAgfVxufTtcblxudHBrVXRpbHNNZXRob2RzLnN0YXJ0QXBwID0gYXN5bmMgZnVuY3Rpb24gKHBrZywgb3B0cyA9IHt9KSB7XG4gIHRyeSB7XG4gICAgbG9nLmRlYnVnKGBHZXR0aW5nIHN0YXJ0IGFwcCBmb3IgJHtwa2d9YCk7XG4gICAgbGV0IHN0ZG91dCA9IGF3YWl0IHRoaXMuc2hlbGwoW2BhcHBfbGF1bmNoZXIgLXMgJHtwa2d9YF0sIG9wdHMpO1xuICAgIHJldHVybiAoc3Rkb3V0LmluZGV4T2YoXCJzdWNjZXNzZnVsbHlcIikgPiAtMSkgPyB0cnVlIDogZmFsc2U7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgRXJyb3Igb2NjdXJlZCB3aGlsZSBzdGFydGluZyBBcHAuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcbiAgfVxufTtcblxudHBrVXRpbHNNZXRob2RzLmlzU3RhcnRlZEFwcCA9IGFzeW5jIGZ1bmN0aW9uIChwa2csIG9wdHMgPSB7fSkge1xuICB0cnkge1xuICAgIGxvZy5kZWJ1ZyhgR2V0dGluZyBhcHAgc3RhcnR1cCBzdGF0dXMgZm9yICR7cGtnfWApO1xuICAgIGxldCBzdGRvdXQgPSBhd2FpdCB0aGlzLnNoZWxsKFtgYXBwX2xhdW5jaGVyIC1TIHwgZ3JlcCAke3BrZ31gXSwgb3B0cyk7XG4gICAgcmV0dXJuIChzdGRvdXQuaW5kZXhPZihgJHtwa2d9YCkgPiAtMSkgPyB0cnVlIDogZmFsc2U7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgRXJyb3Igb2NjdXJlZCB3aGlsZSBnZXR0aW5nIGFwcCBzdGFydHVwIHN0YXR1cyBmb3IgQXBwLiBPcmlnaW5hbCBlcnJvcjogJHtlLm1lc3NhZ2V9YCk7XG4gIH1cbn07XG5cbnRwa1V0aWxzTWV0aG9kcy51bmluc3RhbGwgPSBhc3luYyBmdW5jdGlvbiAocGtnKSB7XG4gIGxvZy5kZWJ1ZyhgVW5pbnN0YWxsaW5nICR7cGtnfWApO1xuICB0cnkge1xuICAgIGF3YWl0IHRoaXMuZm9yY2VTdG9wKHBrZyk7XG4gICAgbGV0IHN0ZG91dCA9IGF3YWl0IHRoaXMuc2RiRXhlYyhbJ3VuaW5zdGFsbCcsIHBrZ10sIHsgdGltZW91dDogMjAwMDAgfSk7XG4gICAgaWYgKHN0ZG91dC5pbmRleE9mKFwia2V5W2VuZF0gdmFsW29rXVwiKSA+IC0xKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nLmVycm9yQW5kVGhyb3coYHVuaW5zdGFsbCBwa2cgZmFpbGVkOiAke3N0ZG91dH1gKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgVW5hYmxlIHRvIHVuaW5zdGFsbCBwa2cuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcbiAgfVxufTtcblxudHBrVXRpbHNNZXRob2RzLmluc3RhbGxGcm9tRGV2aWNlUGF0aCA9IGFzeW5jIGZ1bmN0aW9uICh0cGtQYXRoT25EZXZpY2UpIHtcbiAgbGV0IHN0ZG91dCA9IGF3YWl0IHRoaXMuc2hlbGwoW2Bwa2djbWQgLXQgdHBrIC1pIC1wICR7dHBrUGF0aE9uRGV2aWNlfWBdKTtcbiAgaWYgKHN0ZG91dC5pbmRleE9mKFwia2V5W2VuZF0gdmFsW29rXVwiKSA+IC0xKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYFJlbW90ZSBpbnN0YWxsIGZhaWxlZDogJHtzdGRvdXR9YCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG50cGtVdGlsc01ldGhvZHMuaW5zdGFsbCA9IGFzeW5jIGZ1bmN0aW9uICh0cGssIHBrZyA9IG51bGwsIHJlcGxhY2UgPSB0cnVlLCB0aW1lb3V0ID0gNjAwMDApIHtcbiAgaWYgKHJlcGxhY2UpIHtcbiAgICBsZXQgc3Rkb3V0ID0gYXdhaXQgdGhpcy5zZGJFeGVjKFsnaW5zdGFsbCcsIHRwa10sIHsgdGltZW91dCB9KTtcbiAgICByZXR1cm4gKHN0ZG91dC5pbmRleE9mKFwia2V5W2VuZF0gdmFsW29rXVwiKSA+IC0xKSA/IHRydWUgOiBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICB0cnkge1xuICAgICAgaWYgKHBrZyAhPSBudWxsKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmlzQXBwSW5zdGFsbGVkKHBrZyk7XG4gICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5zZGJFeGVjKFsnaW5zdGFsbCcsIHRwa10sIHsgdGltZW91dCB9KTtcbiAgICAgICAgICByZXN1bHQgPSB0aGlzLmlzQXBwSW5zdGFsbGVkKHBrZyk7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2cuZGVidWcoYEFwcGxpY2F0aW9uICcke3BrZ30nIGFscmVhZHkgaW5zdGFsbGVkLiBDb250aW51aW5nLmApO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG9nLmRlYnVnKGBDYW4ndCBmaW5kIGFwcCBpbiBkZXZpY2UsIGJlY2F1c2UgcGtnIG5hbWUgaXMgbnVsbC5gKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGxvZy5lcnJvckFuZFRocm93KGBVbmFibGUgdG8gaW5zdGFsbCBUUEsuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRwa1V0aWxzTWV0aG9kcztcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
