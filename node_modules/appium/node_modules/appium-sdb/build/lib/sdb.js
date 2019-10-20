'use strict';

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _toolsIndexJs = require('./tools/index.js');

var _toolsIndexJs2 = _interopRequireDefault(_toolsIndexJs);

var DEFAULT_SDB_PORT = 26099;
var DEFAULT_OPTS = {
  sdkRoot: null,
  udid: null,
  executable: { path: "sdb", defaultArgs: [] },
  curDeviceId: null,
  emulatorPort: null,
  binaries: {},
  suppressKillServer: null,
  sdbPort: DEFAULT_SDB_PORT
};

var SDB = function SDB() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  _classCallCheck(this, SDB);

  if (typeof opts.sdkRoot === "undefined") {
    opts.sdkRoot = process.env.TIZEN_HOME || '';
  }

  _Object$assign(this, opts);
  _lodash2['default'].defaultsDeep(this, _lodash2['default'].cloneDeep(DEFAULT_OPTS));

  if (opts.remoteSdbPort) {
    this.sdbPort = opts.remoteSdbPort;
  }
};

SDB.createSDB = function callee$0$0(opts) {
  var sdb;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        sdb = new SDB(opts);
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(sdb.getSdbWithCorrectSdbPath());

      case 3:
        return context$1$0.abrupt('return', sdb);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// add all the methods to the SDB prototype
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = _getIterator(_lodash2['default'].pairs(_toolsIndexJs2['default'])), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var _step$value = _slicedToArray(_step.value, 2);

    var fnName = _step$value[0];
    var fn = _step$value[1];

    SDB.prototype[fnName] = fn;
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator['return']) {
      _iterator['return']();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

exports['default'] = SDB;
exports.DEFAULT_SDB_PORT = DEFAULT_SDB_PORT;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9zZGIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NCQUFjLFFBQVE7Ozs7NEJBQ0Ysa0JBQWtCOzs7O0FBRXRDLElBQU0sZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO0FBQy9CLElBQU0sWUFBWSxHQUFHO0FBQ25CLFNBQU8sRUFBRSxJQUFJO0FBQ2IsTUFBSSxFQUFFLElBQUk7QUFDVixZQUFVLEVBQUUsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUM7QUFDMUMsYUFBVyxFQUFFLElBQUk7QUFDakIsY0FBWSxFQUFHLElBQUk7QUFDbkIsVUFBUSxFQUFFLEVBQUU7QUFDWixvQkFBa0IsRUFBRSxJQUFJO0FBQ3hCLFNBQU8sRUFBRSxnQkFBZ0I7Q0FDMUIsQ0FBQzs7SUFFSSxHQUFHLEdBQ0ssU0FEUixHQUFHLEdBQ2lCO01BQVgsSUFBSSx5REFBRyxFQUFFOzt3QkFEbEIsR0FBRzs7QUFFTCxNQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sS0FBSyxXQUFXLEVBQUU7QUFDdkMsUUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7R0FDN0M7O0FBRUQsaUJBQWMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzFCLHNCQUFFLFlBQVksQ0FBQyxJQUFJLEVBQUUsb0JBQUUsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7O0FBRWhELE1BQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtBQUN0QixRQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7R0FDbkM7Q0FDRjs7QUFHSCxHQUFHLENBQUMsU0FBUyxHQUFHLG9CQUFnQixJQUFJO01BQzlCLEdBQUc7Ozs7QUFBSCxXQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDOzt5Q0FDakIsR0FBRyxDQUFDLHdCQUF3QixFQUFFOzs7NENBQzdCLEdBQUc7Ozs7Ozs7Q0FDWCxDQUFDOzs7Ozs7OztBQUdGLG9DQUF5QixvQkFBRSxLQUFLLDJCQUFTLDRHQUFFOzs7UUFBakMsTUFBTTtRQUFFLEVBQUU7O0FBQ2xCLE9BQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO0dBQzVCOzs7Ozs7Ozs7Ozs7Ozs7O3FCQUVjLEdBQUc7UUFDVCxnQkFBZ0IsR0FBaEIsZ0JBQWdCIiwiZmlsZSI6ImxpYi9zZGIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IG1ldGhvZHMgZnJvbSAnLi90b29scy9pbmRleC5qcyc7XG5cbmNvbnN0IERFRkFVTFRfU0RCX1BPUlQgPSAyNjA5OTtcbmNvbnN0IERFRkFVTFRfT1BUUyA9IHtcbiAgc2RrUm9vdDogbnVsbCxcbiAgdWRpZDogbnVsbCxcbiAgZXhlY3V0YWJsZToge3BhdGg6IFwic2RiXCIsIGRlZmF1bHRBcmdzOiBbXX0sXG4gIGN1ckRldmljZUlkOiBudWxsLFxuICBlbXVsYXRvclBvcnQgOiBudWxsLFxuICBiaW5hcmllczoge30sXG4gIHN1cHByZXNzS2lsbFNlcnZlcjogbnVsbCxcbiAgc2RiUG9ydDogREVGQVVMVF9TREJfUE9SVFxufTtcblxuY2xhc3MgU0RCIHtcbiAgY29uc3RydWN0b3IgKG9wdHMgPSB7fSkge1xuICAgIGlmICh0eXBlb2Ygb3B0cy5zZGtSb290ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBvcHRzLnNka1Jvb3QgPSBwcm9jZXNzLmVudi5USVpFTl9IT01FIHx8ICcnO1xuICAgIH1cblxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0cyk7XG4gICAgXy5kZWZhdWx0c0RlZXAodGhpcywgXy5jbG9uZURlZXAoREVGQVVMVF9PUFRTKSk7XG5cbiAgICBpZiAob3B0cy5yZW1vdGVTZGJQb3J0KSB7XG4gICAgICB0aGlzLnNkYlBvcnQgPSBvcHRzLnJlbW90ZVNkYlBvcnQ7XG4gICAgfVxuICB9XG59XG5cblNEQi5jcmVhdGVTREIgPSBhc3luYyBmdW5jdGlvbiAob3B0cykge1xuICBsZXQgc2RiID0gbmV3IFNEQihvcHRzKTtcbiAgYXdhaXQgc2RiLmdldFNkYldpdGhDb3JyZWN0U2RiUGF0aCgpO1xuICByZXR1cm4gc2RiO1xufTtcblxuLy8gYWRkIGFsbCB0aGUgbWV0aG9kcyB0byB0aGUgU0RCIHByb3RvdHlwZVxuZm9yIChsZXQgW2ZuTmFtZSwgZm5dIG9mIF8ucGFpcnMobWV0aG9kcykpIHtcbiAgU0RCLnByb3RvdHlwZVtmbk5hbWVdID0gZm47XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNEQjtcbmV4cG9ydCB7IERFRkFVTFRfU0RCX1BPUlQgfTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
