'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _loggerJs = require('../logger.js');

var _loggerJs2 = _interopRequireDefault(_loggerJs);

var _appiumSupport = require('appium-support');

var _teen_process = require('teen_process');

var _asyncbox = require('asyncbox');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var systemCallMethods = {};

var DEFAULT_SDB_EXEC_TIMEOUT = 20000;

systemCallMethods.getConnectedDevices = function callee$0$0() {
  var _ref, stdout, startingIndex, devices, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, line, lineInfo;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug("Getting connected devices...");
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.executable.path, ['devices']));

      case 4:
        _ref = context$1$0.sent;
        stdout = _ref.stdout;
        startingIndex = stdout.indexOf("List of devices attached");

        stdout = stdout.slice(startingIndex);

        if (!(stdout.length < 1)) {
          context$1$0.next = 12;
          break;
        }

        throw new Error("Could not find device.");

      case 12:
        devices = [];
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 16;

        for (_iterator = _getIterator(stdout.split("\n")); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          line = _step.value;

          if (line.trim() !== "" && line.indexOf("List of devices") === -1) {
            lineInfo = line.split("\t");

            devices.push({ udid: lineInfo[0].trim(), state: lineInfo[1].trim(), platform: lineInfo[2].trim() });
          }
        }
        context$1$0.next = 24;
        break;

      case 20:
        context$1$0.prev = 20;
        context$1$0.t0 = context$1$0['catch'](16);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 24:
        context$1$0.prev = 24;
        context$1$0.prev = 25;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 27:
        context$1$0.prev = 27;

        if (!_didIteratorError) {
          context$1$0.next = 30;
          break;
        }

        throw _iteratorError;

      case 30:
        return context$1$0.finish(27);

      case 31:
        return context$1$0.finish(24);

      case 32:
        _loggerJs2['default'].debug(devices.length + ' device(s) connected');
        return context$1$0.abrupt('return', devices);

      case 34:
        context$1$0.next = 39;
        break;

      case 36:
        context$1$0.prev = 36;
        context$1$0.t1 = context$1$0['catch'](1);

        _loggerJs2['default'].errorAndThrow("Error while getting connected devices.");

      case 39:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 36], [16, 20, 24, 32], [25,, 27, 31]]);
};

systemCallMethods.getDeviceStatus = function callee$0$0() {
  var _ref2, stdout, result;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.executable.path, ['get-state']));

      case 2:
        _ref2 = context$1$0.sent;
        stdout = _ref2.stdout;
        result = undefined;

        if (stdout.indexOf("device" > -1)) {
          result = "device";
        } else if (stdout.indexOf("offline" > -1)) {
          result = "offline";
        } else if (stdout.indexOf("locked" > -1)) {
          result = "locked";
        } else {
          result = "unknown";
        }
        return context$1$0.abrupt('return', result);

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

systemCallMethods.ConnectDevice = function callee$0$0(device) {
  var _ref3, stdout;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug("Connect device...");
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.executable.path, ['connect', device]));

      case 4:
        _ref3 = context$1$0.sent;
        stdout = _ref3.stdout;

        if (!(stdout.indexOf('connected to ' + device) > -1 || stdout.indexOf("is already connected") > -1)) {
          context$1$0.next = 11;
          break;
        }

        _loggerJs2['default'].debug(device + ' device(s) connected');
        return context$1$0.abrupt('return', true);

      case 11:
        _loggerJs2['default'].error('Could not find device.');
        return context$1$0.abrupt('return', false);

      case 13:
        context$1$0.next = 18;
        break;

      case 15:
        context$1$0.prev = 15;
        context$1$0.t0 = context$1$0['catch'](1);

        _loggerJs2['default'].errorAndThrow("Error while connect devices.");

      case 18:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 15]]);
};

systemCallMethods.getDevicesWithRetry = function callee$0$0() {
  var timeoutMs = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_SDB_EXEC_TIMEOUT : arguments[0];
  var start, times, getDevices;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        start = Date.now();
        times = 0;

        _loggerJs2['default'].debug("Trying to find a connected tizen device");

        getDevices = function getDevices() {
          var devices;
          return _regeneratorRuntime.async(function getDevices$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                if (!(Date.now() - start > timeoutMs || times > 10)) {
                  context$2$0.next = 2;
                  break;
                }

                throw new Error("Could not find a connected tizen device.");

              case 2:
                context$2$0.prev = 2;
                context$2$0.next = 5;
                return _regeneratorRuntime.awrap(this.getConnectedDevices());

              case 5:
                devices = context$2$0.sent;

                if (!(devices.length < 1)) {
                  context$2$0.next = 14;
                  break;
                }

                times++;
                _loggerJs2['default'].debug("Could not find devices, restarting sdb server...");
                context$2$0.next = 11;
                return _regeneratorRuntime.awrap(this.restartSdb());

              case 11:
                context$2$0.next = 13;
                return _regeneratorRuntime.awrap(getDevices());

              case 13:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 14:
                return context$2$0.abrupt('return', devices);

              case 17:
                context$2$0.prev = 17;
                context$2$0.t0 = context$2$0['catch'](2);

                times++;
                _loggerJs2['default'].debug("Could not find devices, restarting sdb server...");
                context$2$0.next = 23;
                return _regeneratorRuntime.awrap(this.restartSdb());

              case 23:
                context$2$0.next = 25;
                return _regeneratorRuntime.awrap(getDevices());

              case 25:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 26:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this, [[2, 17]]);
        };

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(getDevices());

      case 6:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

systemCallMethods.restartSdb = function callee$0$0() {
  var _ref4, stdout;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.suppressKillServer) {
          context$1$0.next = 3;
          break;
        }

        _loggerJs2['default'].debug('Not restarting sdb since \'suppressKillServer\' is on');
        return context$1$0.abrupt('return');

      case 3:

        _loggerJs2['default'].debug('Restarting sdb');
        context$1$0.prev = 4;
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.executable.path, ['kill-server']));

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.executable.path, ['start-server']));

      case 9:
        _ref4 = context$1$0.sent;
        stdout = _ref4.stdout;
        return context$1$0.abrupt('return', stdout.indexOf("Server has started successfully") > -1 ? true : false);

      case 14:
        context$1$0.prev = 14;
        context$1$0.t0 = context$1$0['catch'](4);

        _loggerJs2['default'].error("Error killing SDB server, going to see if it's online anyway");

      case 17:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[4, 14]]);
};

systemCallMethods.sdbExec = function callee$0$0(cmd) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var execFunc;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this2 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (cmd) {
          context$1$0.next = 2;
          break;
        }

        throw new Error("You need to pass in a command to sdbExec()");

      case 2:

        opts.timeout = opts.timeout || DEFAULT_SDB_EXEC_TIMEOUT;

        execFunc = function execFunc() {
          var args, _ref5, stdout;

          return _regeneratorRuntime.async(function execFunc$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.prev = 0;

                if (!(cmd instanceof Array)) {
                  cmd = [cmd];
                }
                args = this.executable.defaultArgs.concat(cmd);

                _loggerJs2['default'].debug('Running \'' + this.executable.path + '\' with args: ' + ('' + JSON.stringify(args)));
                context$2$0.next = 6;
                return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.executable.path, args, opts));

              case 6:
                _ref5 = context$2$0.sent;
                stdout = _ref5.stdout;
                return context$2$0.abrupt('return', stdout.trim());

              case 11:
                context$2$0.prev = 11;
                context$2$0.t0 = context$2$0['catch'](0);

                if (!context$2$0.t0.stdout) {
                  context$2$0.next = 16;
                  break;
                }

                stdout = context$2$0.t0.stdout;
                return context$2$0.abrupt('return', stdout);

              case 16:
                throw new Error('Error executing sdbExec. Original error: \'' + context$2$0.t0.message + '\'; ' + ('Stderr: \'' + (context$2$0.t0.stderr || '').trim() + '\'; Code: \'' + context$2$0.t0.code + '\''));

              case 17:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this2, [[0, 11]]);
        };

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap((0, _asyncbox.retry)(2, execFunc));

      case 6:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

systemCallMethods.shell = function callee$0$0(cmd) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var execCmd;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.isDeviceConnected());

      case 2:
        if (context$1$0.sent) {
          context$1$0.next = 4;
          break;
        }

        throw new Error('No device connected, cannot run sdb shell command \'' + cmd.join(' ') + '\'');

      case 4:
        execCmd = ['shell'];

        if (cmd instanceof Array) {
          execCmd = execCmd.concat(cmd);
        } else {
          execCmd.push(cmd);
        }
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.sdbExec(execCmd, opts));

      case 8:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

systemCallMethods.getPortFromEmulatorString = function (emStr) {
  var portPattern = /emulator-(\d+)/;
  if (portPattern.test(emStr)) {
    return parseInt(portPattern.exec(emStr)[1], 10);
  }
  return false;
};

systemCallMethods.getConnectedEmulators = function callee$0$0() {
  var devices, emulators, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, device, port;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;

        _loggerJs2['default'].debug("Getting connected emulators");
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.getConnectedDevices());

      case 4:
        devices = context$1$0.sent;
        emulators = [];
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 9;

        for (_iterator2 = _getIterator(devices); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          device = _step2.value;
          port = this.getPortFromEmulatorString(device.udid);

          if (port) {
            device.port = port;
            emulators.push(device);
          }
        }
        context$1$0.next = 17;
        break;

      case 13:
        context$1$0.prev = 13;
        context$1$0.t0 = context$1$0['catch'](9);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t0;

      case 17:
        context$1$0.prev = 17;
        context$1$0.prev = 18;

        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }

      case 20:
        context$1$0.prev = 20;

        if (!_didIteratorError2) {
          context$1$0.next = 23;
          break;
        }

        throw _iteratorError2;

      case 23:
        return context$1$0.finish(20);

      case 24:
        return context$1$0.finish(17);

      case 25:
        _loggerJs2['default'].debug(emulators.length + ' emulator(s) connected');
        return context$1$0.abrupt('return', emulators);

      case 29:
        context$1$0.prev = 29;
        context$1$0.t1 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error getting emulators. Original error: ' + context$1$0.t1.message);

      case 32:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 29], [9, 13, 17, 25], [18,, 20, 24]]);
};

systemCallMethods.setDeviceId = function (deviceId) {
  _loggerJs2['default'].debug('Setting device id to ' + deviceId);
  this.curDeviceId = deviceId;
  var argsHasDevice = this.executable.defaultArgs.indexOf('-s');
  if (argsHasDevice !== -1) {
    this.executable.defaultArgs.splice(argsHasDevice, 2);
  }
  this.executable.defaultArgs.push('-s', deviceId);
};

systemCallMethods.setDevice = function (deviceObj) {
  var deviceId = deviceObj.udid;
  var emPort = this.getPortFromEmulatorString(deviceId);
  this.setEmulatorPort(emPort);
  this.setDeviceId(deviceId);
};

systemCallMethods.getSdbVersion = _lodash2['default'].memoize(function callee$0$0() {
  var sdbVersion, parts;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.sdbExec('version'));

      case 3:
        sdbVersion = context$1$0.sent.replace(/Smart\sDevelopment\sBridge\sversion\s([\d\.]*)[\s\w\-]*/, "$1");
        parts = sdbVersion.split('.');
        return context$1$0.abrupt('return', {
          versionString: sdbVersion,
          versionFloat: parseFloat(sdbVersion),
          major: parseInt(parts[0], 10),
          minor: parseInt(parts[1], 10),
          patch: parts[2] ? parseInt(parts[2], 10) : undefined
        });

      case 8:
        context$1$0.prev = 8;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error getting sdb version. Original error: \'' + context$1$0.t0.message + '\'; ' + ('Stderr: \'' + (context$1$0.t0.stderr || '').trim() + '\'; Code: \'' + context$1$0.t0.code + '\''));

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 8]]);
});

systemCallMethods.reboot = function callee$0$0() {
  var result;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.shell(["reboot"]));

      case 3:
        result = context$1$0.sent;

        if (!(result.indexOf("command not found") > -1)) {
          context$1$0.next = 12;
          break;
        }

        _loggerJs2['default'].debug('Device requires sdb to be running as root in order to reboot. Restarting daemon');
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.root());

      case 8:
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(this.shell(['reboot']));

      case 10:
        result = context$1$0.sent;
        return context$1$0.abrupt('return', true);

      case 12:
        if (!(result.indexOf("Rebooting") > -1)) {
          context$1$0.next = 16;
          break;
        }

        return context$1$0.abrupt('return', true);

      case 16:
        return context$1$0.abrupt('return', false);

      case 17:
        context$1$0.next = 23;
        break;

      case 19:
        context$1$0.prev = 19;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].warn('Unable to reboot daemon: \'' + context$1$0.t0.message + '\'.');
        return context$1$0.abrupt('return', false);

      case 23:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 19]]);
};

systemCallMethods.root = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.sdbExec(['root', 'on']));

      case 3:
        return context$1$0.abrupt('return', true);

      case 6:
        context$1$0.prev = 6;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].warn('Unable to root sdb daemon: \'' + context$1$0.t0.message + '\'. Continuing');
        return context$1$0.abrupt('return', false);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 6]]);
};

systemCallMethods.unroot = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.sdbExec(['root', 'off']));

      case 3:
        return context$1$0.abrupt('return', true);

      case 6:
        context$1$0.prev = 6;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].warn('Unable to unroot sdb daemon: \'' + context$1$0.t0.message + '\'. Continuing');
        return context$1$0.abrupt('return', false);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 6]]);
};

systemCallMethods.fileExists = function callee$0$0(remotePath) {
  var files;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.ls(remotePath));

      case 2:
        files = context$1$0.sent;
        return context$1$0.abrupt('return', files.length > 0);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

systemCallMethods.ls = function callee$0$0(remotePath) {
  var stdout, lines;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.shell(['ls', remotePath]));

      case 3:
        stdout = context$1$0.sent;
        lines = stdout.split("\n");
        return context$1$0.abrupt('return', lines.map(function (l) {
          return l.trim();
        }).filter(Boolean).filter(function (l) {
          return l.indexOf("No such file") === -1;
        }));

      case 8:
        context$1$0.prev = 8;
        context$1$0.t0 = context$1$0['catch'](0);

        if (!(context$1$0.t0.message.indexOf('No such file or directory') === -1)) {
          context$1$0.next = 12;
          break;
        }

        throw context$1$0.t0;

      case 12:
        return context$1$0.abrupt('return', []);

      case 13:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 8]]);
};

systemCallMethods.getSdkBinaryPath = function callee$0$0(binaryName) {
  var binaryLoc, cmd, _ref6, stdout;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        binaryLoc = null;
        cmd = this.getCommandForOS();
        context$1$0.prev = 2;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(cmd, [binaryName]));

      case 5:
        _ref6 = context$1$0.sent;
        stdout = _ref6.stdout;

        _loggerJs2['default'].info('Using ' + binaryName + ' from ' + stdout);

        binaryLoc = stdout.trim();
        return context$1$0.abrupt('return', binaryLoc);

      case 12:
        context$1$0.prev = 12;
        context$1$0.t0 = context$1$0['catch'](2);

        _loggerJs2['default'].errorAndThrow('Could not find ' + binaryName + ' Please set the TIZEN_HOME ' + 'environment variable with the Tizen SDK root directory path.');

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[2, 12]]);
};

systemCallMethods.getCommandForOS = function () {
  var cmd = "which";
  if (_appiumSupport.system.isWindows()) {
    cmd = "where";
  }
  return cmd;
};

systemCallMethods.setEmulatorPort = function (emPort) {
  this.emulatorPort = emPort;
};

systemCallMethods.killProcess = function callee$0$0(process) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var result;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['killall ' + process], opts));

      case 2:
        result = context$1$0.sent;

        if (!(result.indexOf('process not found') > -1)) {
          context$1$0.next = 8;
          break;
        }

        _loggerJs2['default'].error(process + ' process not found');
        return context$1$0.abrupt('return', false);

      case 8:
        return context$1$0.abrupt('return', true);

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

systemCallMethods.checkProcessStatus = function callee$0$0(process) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var result;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['pgrep ' + process], opts));

      case 2:
        result = context$1$0.sent;
        return context$1$0.abrupt('return', result.length > 0);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

systemCallMethods.startExec = function callee$0$0(exec) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var execPath;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        execPath = "/usr/bin/" + exec;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.shell([execPath], opts));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

systemCallMethods.stopAutoSleep = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.root());

      case 2:
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.shell('devicectl display stop'));

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

systemCallMethods.startAutoSleep = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.root());

      case 2:
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.shell('devicectl display start'));

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

exports['default'] = systemCallMethods;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90b29scy9zeXN0ZW0tY2FsbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3dCQUFnQixjQUFjOzs7OzZCQUNQLGdCQUFnQjs7NEJBQ2xCLGNBQWM7O3dCQUNiLFVBQVU7O3NCQUNsQixRQUFROzs7O0FBRXRCLElBQUksaUJBQWlCLEdBQUcsRUFBRSxDQUFDOztBQUUzQixJQUFNLHdCQUF3QixHQUFHLEtBQUssQ0FBQzs7QUFFdkMsaUJBQWlCLENBQUMsbUJBQW1CLEdBQUc7WUFHOUIsTUFBTSxFQUVSLGFBQWEsRUFLWCxPQUFPLGtGQUNGLElBQUksRUFFTCxRQUFROzs7OztBQVpwQiw4QkFBSSxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQzs7O3lDQUVqQix3QkFBSyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7O0FBQXhELGNBQU0sUUFBTixNQUFNO0FBRVIscUJBQWEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLDBCQUEwQixDQUFDOztBQUM5RCxjQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQzs7Y0FDakMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7Ozs7O2NBQ2IsSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUM7OztBQUVyQyxlQUFPLEdBQUcsRUFBRTs7Ozs7O0FBQ2hCLHNDQUFpQixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxxR0FBRTtBQUE1QixjQUFJOztBQUNYLGNBQUksSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDNUQsb0JBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzs7QUFDL0IsbUJBQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7V0FDckc7U0FDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDRCw4QkFBSSxLQUFLLENBQUksT0FBTyxDQUFDLE1BQU0sMEJBQXVCLENBQUM7NENBQzVDLE9BQU87Ozs7Ozs7Ozs7QUFHaEIsOEJBQUksYUFBYSxDQUFDLHdDQUF3QyxDQUFDLENBQUM7Ozs7Ozs7Q0FFL0QsQ0FBQzs7QUFFRixpQkFBaUIsQ0FBQyxlQUFlLEdBQUc7YUFDNUIsTUFBTSxFQUNSLE1BQU07Ozs7Ozt5Q0FEYSx3QkFBSyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzs7O0FBQTFELGNBQU0sU0FBTixNQUFNO0FBQ1IsY0FBTTs7QUFDVixZQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDakMsZ0JBQU0sR0FBRyxRQUFRLENBQUM7U0FDbkIsTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDekMsZ0JBQU0sR0FBRyxTQUFTLENBQUM7U0FDcEIsTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDeEMsZ0JBQU0sR0FBRyxRQUFRLENBQUM7U0FDbkIsTUFBTTtBQUNMLGdCQUFNLEdBQUcsU0FBUyxDQUFDO1NBQ3BCOzRDQUNNLE1BQU07Ozs7Ozs7Q0FDZCxDQUFDOztBQUVGLGlCQUFpQixDQUFDLGFBQWEsR0FBRyxvQkFBZ0IsTUFBTTthQUc5QyxNQUFNOzs7OztBQUZkLDhCQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOzs7eUNBRU4sd0JBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7Ozs7QUFBaEUsY0FBTSxTQUFOLE1BQU07O2NBRVIsQUFBQyxNQUFNLENBQUMsT0FBTyxtQkFBaUIsTUFBTSxDQUFHLEdBQUcsQ0FBQyxDQUFDLElBQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOzs7OztBQUNsRyw4QkFBSSxLQUFLLENBQUksTUFBTSwwQkFBdUIsQ0FBQzs0Q0FDcEMsSUFBSTs7O0FBRVgsOEJBQUksS0FBSywwQkFBMEIsQ0FBQzs0Q0FDN0IsS0FBSzs7Ozs7Ozs7OztBQUdkLDhCQUFJLGFBQWEsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDOzs7Ozs7O0NBRXJELENBQUM7O0FBRUYsaUJBQWlCLENBQUMsbUJBQW1CLEdBQUc7TUFBZ0IsU0FBUyx5REFBRyx3QkFBd0I7TUFDdEYsS0FBSyxFQUNMLEtBQUssRUFFTCxVQUFVOzs7Ozs7QUFIVixhQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRTtBQUNsQixhQUFLLEdBQUcsQ0FBQzs7QUFDYiw4QkFBSSxLQUFLLENBQUMseUNBQXlDLENBQUMsQ0FBQzs7QUFDakQsa0JBQVUsR0FBRyxTQUFiLFVBQVU7Y0FLTixPQUFPOzs7O3NCQUpULEFBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEtBQUssR0FBSSxTQUFTLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQTs7Ozs7c0JBQzFDLElBQUksS0FBSyxDQUFDLDBDQUEwQyxDQUFDOzs7OztpREFHdkMsSUFBSSxDQUFDLG1CQUFtQixFQUFFOzs7QUFBMUMsdUJBQU87O3NCQUNQLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBOzs7OztBQUNwQixxQkFBSyxFQUFFLENBQUM7QUFDUixzQ0FBSSxLQUFLLENBQUMsa0RBQWtELENBQUMsQ0FBQzs7aURBQ3hELElBQUksQ0FBQyxVQUFVLEVBQUU7Ozs7aURBRVYsVUFBVSxFQUFFOzs7Ozs7b0RBRXBCLE9BQU87Ozs7OztBQUVkLHFCQUFLLEVBQUUsQ0FBQztBQUNSLHNDQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDOztpREFDeEQsSUFBSSxDQUFDLFVBQVUsRUFBRTs7OztpREFFVixVQUFVLEVBQUU7Ozs7Ozs7Ozs7U0FFNUI7Ozt5Q0FDWSxVQUFVLEVBQUU7Ozs7Ozs7Ozs7Q0FDMUIsQ0FBQzs7QUFFRixpQkFBaUIsQ0FBQyxVQUFVLEdBQUc7YUFTckIsTUFBTTs7Ozs7YUFSVixJQUFJLENBQUMsa0JBQWtCOzs7OztBQUN6Qiw4QkFBSSxLQUFLLHlEQUF1RCxDQUFDOzs7OztBQUluRSw4QkFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7O3lDQUVwQix3QkFBSyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDOzs7O3lDQUMxQix3QkFBSyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDOzs7O0FBQTdELGNBQU0sU0FBTixNQUFNOzRDQUNMLEFBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFJLElBQUksR0FBRyxLQUFLOzs7Ozs7QUFFOUUsOEJBQUksS0FBSyxDQUFDLDhEQUE4RCxDQUFDLENBQUM7Ozs7Ozs7Q0FFN0UsQ0FBQzs7QUFFRixpQkFBaUIsQ0FBQyxPQUFPLEdBQUcsb0JBQWdCLEdBQUc7TUFBRSxJQUFJLHlEQUFHLEVBQUU7TUFNcEQsUUFBUTs7Ozs7O1lBTFAsR0FBRzs7Ozs7Y0FDQSxJQUFJLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQzs7OztBQUcvRCxZQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksd0JBQXdCLENBQUM7O0FBQ3BELGdCQUFRLEdBQUcsU0FBWCxRQUFRO2NBS0osSUFBSSxTQU9GLE1BQU07Ozs7Ozs7QUFWWixvQkFBSSxFQUFFLEdBQUcsWUFBWSxLQUFLLENBQUEsQUFBQyxFQUFFO0FBQzNCLHFCQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDYjtBQUNHLG9CQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQzs7QUFDbEQsc0NBQUksS0FBSyxDQUFDLGVBQVksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLDRCQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFFLENBQUMsQ0FBQzs7aURBQ04sd0JBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQzs7OztBQUF2RCxzQkFBTSxTQUFOLE1BQU07b0RBQ0wsTUFBTSxDQUFDLElBQUksRUFBRTs7Ozs7O3FCQUVoQixlQUFFLE1BQU07Ozs7O0FBQ04sc0JBQU0sR0FBRyxlQUFFLE1BQU07b0RBQ2QsTUFBTTs7O3NCQUVULElBQUksS0FBSyxDQUFDLGdEQUE2QyxlQUFFLE9BQU8sNEJBQ3hELENBQUMsZUFBRSxNQUFNLElBQUksRUFBRSxDQUFBLENBQUUsSUFBSSxFQUFFLG9CQUFhLGVBQUUsSUFBSSxRQUFHLENBQUM7Ozs7Ozs7U0FFL0Q7Ozt5Q0FDWSxxQkFBTSxDQUFDLEVBQUUsUUFBUSxDQUFDOzs7Ozs7Ozs7O0NBQ2hDLENBQUM7O0FBRUYsaUJBQWlCLENBQUMsS0FBSyxHQUFHLG9CQUFnQixHQUFHO01BQUUsSUFBSSx5REFBRyxFQUFFO01BSWxELE9BQU87Ozs7O3lDQUhBLElBQUksQ0FBQyxpQkFBaUIsRUFBRTs7Ozs7Ozs7Y0FDM0IsSUFBSSxLQUFLLDBEQUF1RCxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFJOzs7QUFFckYsZUFBTyxHQUFHLENBQUMsT0FBTyxDQUFDOztBQUN2QixZQUFJLEdBQUcsWUFBWSxLQUFLLEVBQUU7QUFDeEIsaUJBQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQy9CLE1BQU07QUFDTCxpQkFBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNuQjs7eUNBQ1ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDOzs7Ozs7Ozs7O0NBQ3pDLENBQUM7O0FBRUYsaUJBQWlCLENBQUMseUJBQXlCLEdBQUcsVUFBVSxLQUFLLEVBQUU7QUFDN0QsTUFBSSxXQUFXLEdBQUcsZ0JBQWdCLENBQUM7QUFDbkMsTUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQzNCLFdBQU8sUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7R0FDakQ7QUFDRCxTQUFPLEtBQUssQ0FBQztDQUNkLENBQUM7O0FBRUYsaUJBQWlCLENBQUMscUJBQXFCLEdBQUc7TUFHbEMsT0FBTyxFQUNQLFNBQVMsdUZBQ0osTUFBTSxFQUNULElBQUk7Ozs7Ozs7QUFKViw4QkFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQzs7eUNBQ3JCLElBQUksQ0FBQyxtQkFBbUIsRUFBRTs7O0FBQTFDLGVBQU87QUFDUCxpQkFBUyxHQUFHLEVBQUU7Ozs7OztBQUNsQix1Q0FBbUIsT0FBTyx5R0FBRTtBQUFuQixnQkFBTTtBQUNULGNBQUksR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQzs7QUFDdEQsY0FBSSxJQUFJLEVBQUU7QUFDUixrQkFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDbkIscUJBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7V0FDeEI7U0FDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDRCw4QkFBSSxLQUFLLENBQUksU0FBUyxDQUFDLE1BQU0sNEJBQXlCLENBQUM7NENBQ2hELFNBQVM7Ozs7OztBQUVoQiw4QkFBSSxhQUFhLCtDQUE2QyxlQUFFLE9BQU8sQ0FBRyxDQUFDOzs7Ozs7O0NBRTlFLENBQUM7O0FBRUYsaUJBQWlCLENBQUMsV0FBVyxHQUFHLFVBQVUsUUFBUSxFQUFFO0FBQ2xELHdCQUFJLEtBQUssMkJBQXlCLFFBQVEsQ0FBRyxDQUFDO0FBQzlDLE1BQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDO0FBQzVCLE1BQUksYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM5RCxNQUFJLGFBQWEsS0FBSyxDQUFDLENBQUMsRUFBRTtBQUN4QixRQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO0dBQ3REO0FBQ0QsTUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztDQUNsRCxDQUFDOztBQUVGLGlCQUFpQixDQUFDLFNBQVMsR0FBRyxVQUFVLFNBQVMsRUFBRTtBQUNqRCxNQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO0FBQzlCLE1BQUksTUFBTSxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN0RCxNQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLE1BQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDNUIsQ0FBQzs7QUFFRixpQkFBaUIsQ0FBQyxhQUFhLEdBQUcsb0JBQUUsT0FBTyxDQUFDO01BRXBDLFVBQVUsRUFFVixLQUFLOzs7Ozs7eUNBRmUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7OztBQUEzQyxrQkFBVSxvQkFDWCxPQUFPLENBQUMseURBQXlELEVBQUUsSUFBSTtBQUN0RSxhQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7NENBQzFCO0FBQ0wsdUJBQWEsRUFBRSxVQUFVO0FBQ3pCLHNCQUFZLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQztBQUNwQyxlQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7QUFDN0IsZUFBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0FBQzdCLGVBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxTQUFTO1NBQ3JEOzs7Ozs7QUFFRCw4QkFBSSxhQUFhLENBQUMsa0RBQStDLGVBQUUsT0FBTyw0QkFDNUQsQ0FBQyxlQUFFLE1BQU0sSUFBSSxFQUFFLENBQUEsQ0FBRSxJQUFJLEVBQUUsb0JBQWEsZUFBRSxJQUFJLFFBQUcsQ0FBQyxDQUFDOzs7Ozs7O0NBRWhFLENBQUMsQ0FBQzs7QUFFSCxpQkFBaUIsQ0FBQyxNQUFNLEdBQUc7TUFFbkIsTUFBTTs7Ozs7O3lDQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7O0FBQXJDLGNBQU07O2NBQ04sTUFBTSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBOzs7OztBQUMxQyw4QkFBSSxLQUFLLENBQUMsaUZBQWlGLENBQUMsQ0FBQzs7eUNBQ3ZGLElBQUksQ0FBQyxJQUFJLEVBQUU7Ozs7eUNBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7QUFBckMsY0FBTTs0Q0FDQyxJQUFJOzs7Y0FFVCxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBOzs7Ozs0Q0FDM0IsSUFBSTs7OzRDQUVKLEtBQUs7Ozs7Ozs7Ozs7QUFHZCw4QkFBSSxJQUFJLGlDQUE4QixlQUFJLE9BQU8sU0FBSyxDQUFDOzRDQUNoRCxLQUFLOzs7Ozs7O0NBRWYsQ0FBQzs7QUFFRixpQkFBaUIsQ0FBQyxJQUFJLEdBQUc7Ozs7Ozt5Q0FFZixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDOzs7NENBQzNCLElBQUk7Ozs7OztBQUVYLDhCQUFJLElBQUksbUNBQWdDLGVBQUksT0FBTyxvQkFBZ0IsQ0FBQzs0Q0FDN0QsS0FBSzs7Ozs7OztDQUVmLENBQUM7O0FBRUYsaUJBQWlCLENBQUMsTUFBTSxHQUFHOzs7Ozs7eUNBRWpCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7Ozs0Q0FDNUIsSUFBSTs7Ozs7O0FBRVgsOEJBQUksSUFBSSxxQ0FBa0MsZUFBSSxPQUFPLG9CQUFnQixDQUFDOzRDQUMvRCxLQUFLOzs7Ozs7O0NBRWYsQ0FBQzs7QUFFRixpQkFBaUIsQ0FBQyxVQUFVLEdBQUcsb0JBQWdCLFVBQVU7TUFDbkQsS0FBSzs7Ozs7eUNBQVMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUM7OztBQUFqQyxhQUFLOzRDQUNGLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQzs7Ozs7OztDQUN4QixDQUFDOztBQUVGLGlCQUFpQixDQUFDLEVBQUUsR0FBRyxvQkFBZ0IsVUFBVTtNQUV6QyxNQUFNLEVBQ04sS0FBSzs7Ozs7O3lDQURVLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7OztBQUE3QyxjQUFNO0FBQ04sYUFBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDOzRDQUN2QixLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQztpQkFBSyxDQUFDLENBQUMsSUFBSSxFQUFFO1NBQUEsQ0FBQyxDQUM5QixNQUFNLENBQUMsT0FBTyxDQUFDLENBQ2YsTUFBTSxDQUFDLFVBQUMsQ0FBQztpQkFBSyxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUFBLENBQUM7Ozs7OztjQUU5QyxlQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsMkJBQTJCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTs7Ozs7Ozs7NENBR3BELEVBQUU7Ozs7Ozs7Q0FFWixDQUFDOztBQUVGLGlCQUFpQixDQUFDLGdCQUFnQixHQUFHLG9CQUFnQixVQUFVO01BQ3pELFNBQVMsRUFDVCxHQUFHLFNBRUMsTUFBTTs7Ozs7QUFIVixpQkFBUyxHQUFHLElBQUk7QUFDaEIsV0FBRyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUU7Ozt5Q0FFUCx3QkFBSyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7OztBQUF4QyxjQUFNLFNBQU4sTUFBTTs7QUFDWiw4QkFBSSxJQUFJLFlBQVUsVUFBVSxjQUFTLE1BQU0sQ0FBRyxDQUFDOztBQUUvQyxpQkFBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQzs0Q0FDbkIsU0FBUzs7Ozs7O0FBRWhCLDhCQUFJLGFBQWEsQ0FBQyxvQkFBa0IsVUFBVSxpR0FDa0IsQ0FBQyxDQUFDOzs7Ozs7O0NBRXJFLENBQUM7O0FBRUYsaUJBQWlCLENBQUMsZUFBZSxHQUFHLFlBQVk7QUFDOUMsTUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDO0FBQ2xCLE1BQUksc0JBQU8sU0FBUyxFQUFFLEVBQUU7QUFDdEIsT0FBRyxHQUFHLE9BQU8sQ0FBQztHQUNmO0FBQ0QsU0FBTyxHQUFHLENBQUM7Q0FDWixDQUFDOztBQUVGLGlCQUFpQixDQUFDLGVBQWUsR0FBRyxVQUFVLE1BQU0sRUFBRTtBQUNwRCxNQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztDQUM1QixDQUFDOztBQUVGLGlCQUFpQixDQUFDLFdBQVcsR0FBRyxvQkFBZ0IsT0FBTztNQUFFLElBQUkseURBQUcsRUFBRTtNQUM1RCxNQUFNOzs7Ozt5Q0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQVksT0FBTyxDQUFHLEVBQUUsSUFBSSxDQUFDOzs7QUFBdkQsY0FBTTs7Y0FFTixNQUFNLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7Ozs7O0FBQzFDLDhCQUFJLEtBQUssQ0FBSSxPQUFPLHdCQUFxQixDQUFDOzRDQUNuQyxLQUFLOzs7NENBRUwsSUFBSTs7Ozs7OztDQUVkLENBQUM7O0FBRUYsaUJBQWlCLENBQUMsa0JBQWtCLEdBQUcsb0JBQWdCLE9BQU87TUFBRSxJQUFJLHlEQUFHLEVBQUU7TUFDbkUsTUFBTTs7Ozs7eUNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFVLE9BQU8sQ0FBRyxFQUFFLElBQUksQ0FBQzs7O0FBQXJELGNBQU07NENBQ0gsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDOzs7Ozs7O0NBQ3pCLENBQUM7O0FBRUYsaUJBQWlCLENBQUMsU0FBUyxHQUFHLG9CQUFnQixJQUFJO01BQUUsSUFBSSx5REFBRyxFQUFFO01BQ3ZELFFBQVE7Ozs7QUFBUixnQkFBUSxHQUFHLFdBQVcsR0FBRyxJQUFJOzt5Q0FDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQzs7Ozs7OztDQUNuQyxDQUFDOztBQUVGLGlCQUFpQixDQUFDLGFBQWEsR0FBRzs7Ozs7eUNBQzFCLElBQUksQ0FBQyxJQUFJLEVBQUU7Ozs7eUNBQ1gsSUFBSSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQzs7Ozs7OztDQUMzQyxDQUFDOztBQUVGLGlCQUFpQixDQUFDLGNBQWMsR0FBRzs7Ozs7eUNBQzNCLElBQUksQ0FBQyxJQUFJLEVBQUU7Ozs7eUNBQ1gsSUFBSSxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQzs7Ozs7OztDQUM1QyxDQUFDOztxQkFFYSxpQkFBaUIiLCJmaWxlIjoibGliL3Rvb2xzL3N5c3RlbS1jYWxscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsb2cgZnJvbSAnLi4vbG9nZ2VyLmpzJztcbmltcG9ydCB7IHN5c3RlbSB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCB7IGV4ZWMgfSBmcm9tICd0ZWVuX3Byb2Nlc3MnO1xuaW1wb3J0IHsgcmV0cnkgfSBmcm9tICdhc3luY2JveCc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5sZXQgc3lzdGVtQ2FsbE1ldGhvZHMgPSB7fTtcblxuY29uc3QgREVGQVVMVF9TREJfRVhFQ19USU1FT1VUID0gMjAwMDA7XG5cbnN5c3RlbUNhbGxNZXRob2RzLmdldENvbm5lY3RlZERldmljZXMgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGxvZy5kZWJ1ZyhcIkdldHRpbmcgY29ubmVjdGVkIGRldmljZXMuLi5cIik7XG4gIHRyeSB7XG4gICAgbGV0IHsgc3Rkb3V0IH0gPSBhd2FpdCBleGVjKHRoaXMuZXhlY3V0YWJsZS5wYXRoLCBbJ2RldmljZXMnXSk7XG5cbiAgICBsZXQgc3RhcnRpbmdJbmRleCA9IHN0ZG91dC5pbmRleE9mKFwiTGlzdCBvZiBkZXZpY2VzIGF0dGFjaGVkXCIpO1xuICAgIHN0ZG91dCA9IHN0ZG91dC5zbGljZShzdGFydGluZ0luZGV4KTtcbiAgICBpZiAoc3Rkb3V0Lmxlbmd0aCA8IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBmaW5kIGRldmljZS5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBkZXZpY2VzID0gW107XG4gICAgICBmb3IgKGxldCBsaW5lIG9mIHN0ZG91dC5zcGxpdChcIlxcblwiKSkge1xuICAgICAgICBpZiAobGluZS50cmltKCkgIT09IFwiXCIgJiYgbGluZS5pbmRleE9mKFwiTGlzdCBvZiBkZXZpY2VzXCIpID09PSAtMSkge1xuICAgICAgICAgIGxldCBsaW5lSW5mbyA9IGxpbmUuc3BsaXQoXCJcXHRcIik7XG4gICAgICAgICAgZGV2aWNlcy5wdXNoKHsgdWRpZDogbGluZUluZm9bMF0udHJpbSgpLCBzdGF0ZTogbGluZUluZm9bMV0udHJpbSgpLCBwbGF0Zm9ybTogbGluZUluZm9bMl0udHJpbSgpIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsb2cuZGVidWcoYCR7ZGV2aWNlcy5sZW5ndGh9IGRldmljZShzKSBjb25uZWN0ZWRgKTtcbiAgICAgIHJldHVybiBkZXZpY2VzO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZy5lcnJvckFuZFRocm93KFwiRXJyb3Igd2hpbGUgZ2V0dGluZyBjb25uZWN0ZWQgZGV2aWNlcy5cIik7XG4gIH1cbn07XG5cbnN5c3RlbUNhbGxNZXRob2RzLmdldERldmljZVN0YXR1cyA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgbGV0IHsgc3Rkb3V0IH0gPSBhd2FpdCBleGVjKHRoaXMuZXhlY3V0YWJsZS5wYXRoLCBbJ2dldC1zdGF0ZSddKTtcbiAgbGV0IHJlc3VsdDtcbiAgaWYgKHN0ZG91dC5pbmRleE9mKFwiZGV2aWNlXCIgPiAtMSkpIHtcbiAgICByZXN1bHQgPSBcImRldmljZVwiO1xuICB9IGVsc2UgaWYgKHN0ZG91dC5pbmRleE9mKFwib2ZmbGluZVwiID4gLTEpKSB7XG4gICAgcmVzdWx0ID0gXCJvZmZsaW5lXCI7XG4gIH0gZWxzZSBpZiAoc3Rkb3V0LmluZGV4T2YoXCJsb2NrZWRcIiA+IC0xKSkge1xuICAgIHJlc3VsdCA9IFwibG9ja2VkXCI7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gXCJ1bmtub3duXCI7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbnN5c3RlbUNhbGxNZXRob2RzLkNvbm5lY3REZXZpY2UgPSBhc3luYyBmdW5jdGlvbiAoZGV2aWNlKSB7XG4gIGxvZy5kZWJ1ZyhcIkNvbm5lY3QgZGV2aWNlLi4uXCIpO1xuICB0cnkge1xuICAgIGxldCB7IHN0ZG91dCB9ID0gYXdhaXQgZXhlYyh0aGlzLmV4ZWN1dGFibGUucGF0aCwgWydjb25uZWN0JywgZGV2aWNlXSk7XG5cbiAgICBpZiAoKHN0ZG91dC5pbmRleE9mKGBjb25uZWN0ZWQgdG8gJHtkZXZpY2V9YCkgPiAtMSkgfHwgKHN0ZG91dC5pbmRleE9mKFwiaXMgYWxyZWFkeSBjb25uZWN0ZWRcIikgPiAtMSkpIHtcbiAgICAgIGxvZy5kZWJ1ZyhgJHtkZXZpY2V9IGRldmljZShzKSBjb25uZWN0ZWRgKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2cuZXJyb3IoYENvdWxkIG5vdCBmaW5kIGRldmljZS5gKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhcIkVycm9yIHdoaWxlIGNvbm5lY3QgZGV2aWNlcy5cIik7XG4gIH1cbn07XG5cbnN5c3RlbUNhbGxNZXRob2RzLmdldERldmljZXNXaXRoUmV0cnkgPSBhc3luYyBmdW5jdGlvbiAodGltZW91dE1zID0gREVGQVVMVF9TREJfRVhFQ19USU1FT1VUKSB7XG4gIGxldCBzdGFydCA9IERhdGUubm93KCk7XG4gIGxldCB0aW1lcyA9IDA7XG4gIGxvZy5kZWJ1ZyhcIlRyeWluZyB0byBmaW5kIGEgY29ubmVjdGVkIHRpemVuIGRldmljZVwiKTtcbiAgbGV0IGdldERldmljZXMgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKChEYXRlLm5vdygpIC0gc3RhcnQpID4gdGltZW91dE1zIHx8IHRpbWVzID4gMTApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBmaW5kIGEgY29ubmVjdGVkIHRpemVuIGRldmljZS5cIik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBsZXQgZGV2aWNlcyA9IGF3YWl0IHRoaXMuZ2V0Q29ubmVjdGVkRGV2aWNlcygpO1xuICAgICAgaWYgKGRldmljZXMubGVuZ3RoIDwgMSkge1xuICAgICAgICB0aW1lcysrO1xuICAgICAgICBsb2cuZGVidWcoXCJDb3VsZCBub3QgZmluZCBkZXZpY2VzLCByZXN0YXJ0aW5nIHNkYiBzZXJ2ZXIuLi5cIik7XG4gICAgICAgIGF3YWl0IHRoaXMucmVzdGFydFNkYigpO1xuXG4gICAgICAgIHJldHVybiBhd2FpdCBnZXREZXZpY2VzKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGV2aWNlcztcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aW1lcysrO1xuICAgICAgbG9nLmRlYnVnKFwiQ291bGQgbm90IGZpbmQgZGV2aWNlcywgcmVzdGFydGluZyBzZGIgc2VydmVyLi4uXCIpO1xuICAgICAgYXdhaXQgdGhpcy5yZXN0YXJ0U2RiKCk7XG5cbiAgICAgIHJldHVybiBhd2FpdCBnZXREZXZpY2VzKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gYXdhaXQgZ2V0RGV2aWNlcygpO1xufTtcblxuc3lzdGVtQ2FsbE1ldGhvZHMucmVzdGFydFNkYiA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuc3VwcHJlc3NLaWxsU2VydmVyKSB7XG4gICAgbG9nLmRlYnVnKGBOb3QgcmVzdGFydGluZyBzZGIgc2luY2UgJ3N1cHByZXNzS2lsbFNlcnZlcicgaXMgb25gKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBsb2cuZGVidWcoJ1Jlc3RhcnRpbmcgc2RiJyk7XG4gIHRyeSB7XG4gICAgYXdhaXQgZXhlYyh0aGlzLmV4ZWN1dGFibGUucGF0aCwgWydraWxsLXNlcnZlciddKTtcbiAgICBsZXQgeyBzdGRvdXQgfSA9IGF3YWl0IGV4ZWModGhpcy5leGVjdXRhYmxlLnBhdGgsIFsnc3RhcnQtc2VydmVyJ10pO1xuICAgIHJldHVybiAoc3Rkb3V0LmluZGV4T2YoXCJTZXJ2ZXIgaGFzIHN0YXJ0ZWQgc3VjY2Vzc2Z1bGx5XCIpID4gLTEpID8gdHJ1ZSA6IGZhbHNlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nLmVycm9yKFwiRXJyb3Iga2lsbGluZyBTREIgc2VydmVyLCBnb2luZyB0byBzZWUgaWYgaXQncyBvbmxpbmUgYW55d2F5XCIpO1xuICB9XG59O1xuXG5zeXN0ZW1DYWxsTWV0aG9kcy5zZGJFeGVjID0gYXN5bmMgZnVuY3Rpb24gKGNtZCwgb3B0cyA9IHt9KSB7XG4gIGlmICghY21kKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiWW91IG5lZWQgdG8gcGFzcyBpbiBhIGNvbW1hbmQgdG8gc2RiRXhlYygpXCIpO1xuICB9XG5cbiAgb3B0cy50aW1lb3V0ID0gb3B0cy50aW1lb3V0IHx8IERFRkFVTFRfU0RCX0VYRUNfVElNRU9VVDtcbiAgbGV0IGV4ZWNGdW5jID0gYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIShjbWQgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgY21kID0gW2NtZF07XG4gICAgICB9XG4gICAgICBsZXQgYXJncyA9IHRoaXMuZXhlY3V0YWJsZS5kZWZhdWx0QXJncy5jb25jYXQoY21kKTtcbiAgICAgIGxvZy5kZWJ1ZyhgUnVubmluZyAnJHt0aGlzLmV4ZWN1dGFibGUucGF0aH0nIHdpdGggYXJnczogYCArXG4gICAgICAgIGAke0pTT04uc3RyaW5naWZ5KGFyZ3MpfWApO1xuICAgICAgbGV0IHsgc3Rkb3V0IH0gPSBhd2FpdCBleGVjKHRoaXMuZXhlY3V0YWJsZS5wYXRoLCBhcmdzLCBvcHRzKTtcbiAgICAgIHJldHVybiBzdGRvdXQudHJpbSgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlLnN0ZG91dCkge1xuICAgICAgICBsZXQgc3Rkb3V0ID0gZS5zdGRvdXQ7XG4gICAgICAgIHJldHVybiBzdGRvdXQ7XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm9yIGV4ZWN1dGluZyBzZGJFeGVjLiBPcmlnaW5hbCBlcnJvcjogJyR7ZS5tZXNzYWdlfSc7IGAgK1xuICAgICAgICBgU3RkZXJyOiAnJHsoZS5zdGRlcnIgfHwgJycpLnRyaW0oKX0nOyBDb2RlOiAnJHtlLmNvZGV9J2ApO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGF3YWl0IHJldHJ5KDIsIGV4ZWNGdW5jKTtcbn07XG5cbnN5c3RlbUNhbGxNZXRob2RzLnNoZWxsID0gYXN5bmMgZnVuY3Rpb24gKGNtZCwgb3B0cyA9IHt9KSB7XG4gIGlmICghYXdhaXQgdGhpcy5pc0RldmljZUNvbm5lY3RlZCgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBObyBkZXZpY2UgY29ubmVjdGVkLCBjYW5ub3QgcnVuIHNkYiBzaGVsbCBjb21tYW5kICcke2NtZC5qb2luKCcgJyl9J2ApO1xuICB9XG4gIGxldCBleGVjQ21kID0gWydzaGVsbCddO1xuICBpZiAoY21kIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICBleGVjQ21kID0gZXhlY0NtZC5jb25jYXQoY21kKTtcbiAgfSBlbHNlIHtcbiAgICBleGVjQ21kLnB1c2goY21kKTtcbiAgfVxuICByZXR1cm4gYXdhaXQgdGhpcy5zZGJFeGVjKGV4ZWNDbWQsIG9wdHMpO1xufTtcblxuc3lzdGVtQ2FsbE1ldGhvZHMuZ2V0UG9ydEZyb21FbXVsYXRvclN0cmluZyA9IGZ1bmN0aW9uIChlbVN0cikge1xuICBsZXQgcG9ydFBhdHRlcm4gPSAvZW11bGF0b3ItKFxcZCspLztcbiAgaWYgKHBvcnRQYXR0ZXJuLnRlc3QoZW1TdHIpKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KHBvcnRQYXR0ZXJuLmV4ZWMoZW1TdHIpWzFdLCAxMCk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuc3lzdGVtQ2FsbE1ldGhvZHMuZ2V0Q29ubmVjdGVkRW11bGF0b3JzID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIGxvZy5kZWJ1ZyhcIkdldHRpbmcgY29ubmVjdGVkIGVtdWxhdG9yc1wiKTtcbiAgICBsZXQgZGV2aWNlcyA9IGF3YWl0IHRoaXMuZ2V0Q29ubmVjdGVkRGV2aWNlcygpO1xuICAgIGxldCBlbXVsYXRvcnMgPSBbXTtcbiAgICBmb3IgKGxldCBkZXZpY2Ugb2YgZGV2aWNlcykge1xuICAgICAgbGV0IHBvcnQgPSB0aGlzLmdldFBvcnRGcm9tRW11bGF0b3JTdHJpbmcoZGV2aWNlLnVkaWQpO1xuICAgICAgaWYgKHBvcnQpIHtcbiAgICAgICAgZGV2aWNlLnBvcnQgPSBwb3J0O1xuICAgICAgICBlbXVsYXRvcnMucHVzaChkZXZpY2UpO1xuICAgICAgfVxuICAgIH1cbiAgICBsb2cuZGVidWcoYCR7ZW11bGF0b3JzLmxlbmd0aH0gZW11bGF0b3IocykgY29ubmVjdGVkYCk7XG4gICAgcmV0dXJuIGVtdWxhdG9ycztcbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZy5lcnJvckFuZFRocm93KGBFcnJvciBnZXR0aW5nIGVtdWxhdG9ycy4gT3JpZ2luYWwgZXJyb3I6ICR7ZS5tZXNzYWdlfWApO1xuICB9XG59O1xuXG5zeXN0ZW1DYWxsTWV0aG9kcy5zZXREZXZpY2VJZCA9IGZ1bmN0aW9uIChkZXZpY2VJZCkge1xuICBsb2cuZGVidWcoYFNldHRpbmcgZGV2aWNlIGlkIHRvICR7ZGV2aWNlSWR9YCk7XG4gIHRoaXMuY3VyRGV2aWNlSWQgPSBkZXZpY2VJZDtcbiAgbGV0IGFyZ3NIYXNEZXZpY2UgPSB0aGlzLmV4ZWN1dGFibGUuZGVmYXVsdEFyZ3MuaW5kZXhPZignLXMnKTtcbiAgaWYgKGFyZ3NIYXNEZXZpY2UgIT09IC0xKSB7XG4gICAgdGhpcy5leGVjdXRhYmxlLmRlZmF1bHRBcmdzLnNwbGljZShhcmdzSGFzRGV2aWNlLCAyKTtcbiAgfVxuICB0aGlzLmV4ZWN1dGFibGUuZGVmYXVsdEFyZ3MucHVzaCgnLXMnLCBkZXZpY2VJZCk7XG59O1xuXG5zeXN0ZW1DYWxsTWV0aG9kcy5zZXREZXZpY2UgPSBmdW5jdGlvbiAoZGV2aWNlT2JqKSB7XG4gIGxldCBkZXZpY2VJZCA9IGRldmljZU9iai51ZGlkO1xuICBsZXQgZW1Qb3J0ID0gdGhpcy5nZXRQb3J0RnJvbUVtdWxhdG9yU3RyaW5nKGRldmljZUlkKTtcbiAgdGhpcy5zZXRFbXVsYXRvclBvcnQoZW1Qb3J0KTtcbiAgdGhpcy5zZXREZXZpY2VJZChkZXZpY2VJZCk7XG59O1xuXG5zeXN0ZW1DYWxsTWV0aG9kcy5nZXRTZGJWZXJzaW9uID0gXy5tZW1vaXplKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICBsZXQgc2RiVmVyc2lvbiA9IChhd2FpdCB0aGlzLnNkYkV4ZWMoJ3ZlcnNpb24nKSlcbiAgICAgIC5yZXBsYWNlKC9TbWFydFxcc0RldmVsb3BtZW50XFxzQnJpZGdlXFxzdmVyc2lvblxccyhbXFxkXFwuXSopW1xcc1xcd1xcLV0qLywgXCIkMVwiKTtcbiAgICBsZXQgcGFydHMgPSBzZGJWZXJzaW9uLnNwbGl0KCcuJyk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZlcnNpb25TdHJpbmc6IHNkYlZlcnNpb24sXG4gICAgICB2ZXJzaW9uRmxvYXQ6IHBhcnNlRmxvYXQoc2RiVmVyc2lvbiksXG4gICAgICBtYWpvcjogcGFyc2VJbnQocGFydHNbMF0sIDEwKSxcbiAgICAgIG1pbm9yOiBwYXJzZUludChwYXJ0c1sxXSwgMTApLFxuICAgICAgcGF0Y2g6IHBhcnRzWzJdID8gcGFyc2VJbnQocGFydHNbMl0sIDEwKSA6IHVuZGVmaW5lZCxcbiAgICB9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEVycm9yIGdldHRpbmcgc2RiIHZlcnNpb24uIE9yaWdpbmFsIGVycm9yOiAnJHtlLm1lc3NhZ2V9JzsgYCArXG4gICAgICBgU3RkZXJyOiAnJHsoZS5zdGRlcnIgfHwgJycpLnRyaW0oKX0nOyBDb2RlOiAnJHtlLmNvZGV9J2ApO1xuICB9XG59KTtcblxuc3lzdGVtQ2FsbE1ldGhvZHMucmVib290ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIGxldCByZXN1bHQgPSBhd2FpdCB0aGlzLnNoZWxsKFtcInJlYm9vdFwiXSk7XG4gICAgaWYgKHJlc3VsdC5pbmRleE9mKFwiY29tbWFuZCBub3QgZm91bmRcIikgPiAtMSkge1xuICAgICAgbG9nLmRlYnVnKCdEZXZpY2UgcmVxdWlyZXMgc2RiIHRvIGJlIHJ1bm5pbmcgYXMgcm9vdCBpbiBvcmRlciB0byByZWJvb3QuIFJlc3RhcnRpbmcgZGFlbW9uJyk7XG4gICAgICBhd2FpdCB0aGlzLnJvb3QoKTtcbiAgICAgIHJlc3VsdCA9IGF3YWl0IHRoaXMuc2hlbGwoWydyZWJvb3QnXSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHJlc3VsdC5pbmRleE9mKFwiUmVib290aW5nXCIpID4gLTEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2cud2FybihgVW5hYmxlIHRvIHJlYm9vdCBkYWVtb246ICcke2Vyci5tZXNzYWdlfScuYCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5zeXN0ZW1DYWxsTWV0aG9kcy5yb290ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIGF3YWl0IHRoaXMuc2RiRXhlYyhbJ3Jvb3QnLCAnb24nXSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZy53YXJuKGBVbmFibGUgdG8gcm9vdCBzZGIgZGFlbW9uOiAnJHtlcnIubWVzc2FnZX0nLiBDb250aW51aW5nYCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5zeXN0ZW1DYWxsTWV0aG9kcy51bnJvb3QgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgYXdhaXQgdGhpcy5zZGJFeGVjKFsncm9vdCcsICdvZmYnXSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZy53YXJuKGBVbmFibGUgdG8gdW5yb290IHNkYiBkYWVtb246ICcke2Vyci5tZXNzYWdlfScuIENvbnRpbnVpbmdgKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbnN5c3RlbUNhbGxNZXRob2RzLmZpbGVFeGlzdHMgPSBhc3luYyBmdW5jdGlvbiAocmVtb3RlUGF0aCkge1xuICBsZXQgZmlsZXMgPSBhd2FpdCB0aGlzLmxzKHJlbW90ZVBhdGgpO1xuICByZXR1cm4gZmlsZXMubGVuZ3RoID4gMDtcbn07XG5cbnN5c3RlbUNhbGxNZXRob2RzLmxzID0gYXN5bmMgZnVuY3Rpb24gKHJlbW90ZVBhdGgpIHtcbiAgdHJ5IHtcbiAgICBsZXQgc3Rkb3V0ID0gYXdhaXQgdGhpcy5zaGVsbChbJ2xzJywgcmVtb3RlUGF0aF0pO1xuICAgIGxldCBsaW5lcyA9IHN0ZG91dC5zcGxpdChcIlxcblwiKTtcbiAgICByZXR1cm4gbGluZXMubWFwKChsKSA9PiBsLnRyaW0oKSlcbiAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgIC5maWx0ZXIoKGwpID0+IGwuaW5kZXhPZihcIk5vIHN1Y2ggZmlsZVwiKSA9PT0gLTEpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBpZiAoZXJyLm1lc3NhZ2UuaW5kZXhPZignTm8gc3VjaCBmaWxlIG9yIGRpcmVjdG9yeScpID09PSAtMSkge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cbn07XG5cbnN5c3RlbUNhbGxNZXRob2RzLmdldFNka0JpbmFyeVBhdGggPSBhc3luYyBmdW5jdGlvbiAoYmluYXJ5TmFtZSkge1xuICBsZXQgYmluYXJ5TG9jID0gbnVsbDtcbiAgbGV0IGNtZCA9IHRoaXMuZ2V0Q29tbWFuZEZvck9TKCk7XG4gIHRyeSB7XG4gICAgbGV0IHsgc3Rkb3V0IH0gPSBhd2FpdCBleGVjKGNtZCwgW2JpbmFyeU5hbWVdKTtcbiAgICBsb2cuaW5mbyhgVXNpbmcgJHtiaW5hcnlOYW1lfSBmcm9tICR7c3Rkb3V0fWApO1xuXG4gICAgYmluYXJ5TG9jID0gc3Rkb3V0LnRyaW0oKTtcbiAgICByZXR1cm4gYmluYXJ5TG9jO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYENvdWxkIG5vdCBmaW5kICR7YmluYXJ5TmFtZX0gUGxlYXNlIHNldCB0aGUgVElaRU5fSE9NRSBgICtcbiAgICAgIGBlbnZpcm9ubWVudCB2YXJpYWJsZSB3aXRoIHRoZSBUaXplbiBTREsgcm9vdCBkaXJlY3RvcnkgcGF0aC5gKTtcbiAgfVxufTtcblxuc3lzdGVtQ2FsbE1ldGhvZHMuZ2V0Q29tbWFuZEZvck9TID0gZnVuY3Rpb24gKCkge1xuICBsZXQgY21kID0gXCJ3aGljaFwiO1xuICBpZiAoc3lzdGVtLmlzV2luZG93cygpKSB7XG4gICAgY21kID0gXCJ3aGVyZVwiO1xuICB9XG4gIHJldHVybiBjbWQ7XG59O1xuXG5zeXN0ZW1DYWxsTWV0aG9kcy5zZXRFbXVsYXRvclBvcnQgPSBmdW5jdGlvbiAoZW1Qb3J0KSB7XG4gIHRoaXMuZW11bGF0b3JQb3J0ID0gZW1Qb3J0O1xufTtcblxuc3lzdGVtQ2FsbE1ldGhvZHMua2lsbFByb2Nlc3MgPSBhc3luYyBmdW5jdGlvbiAocHJvY2Vzcywgb3B0cyA9IHt9KSB7XG4gIGxldCByZXN1bHQgPSBhd2FpdCB0aGlzLnNoZWxsKFtga2lsbGFsbCAke3Byb2Nlc3N9YF0sIG9wdHMpO1xuXG4gIGlmIChyZXN1bHQuaW5kZXhPZigncHJvY2VzcyBub3QgZm91bmQnKSA+IC0xKSB7XG4gICAgbG9nLmVycm9yKGAke3Byb2Nlc3N9IHByb2Nlc3Mgbm90IGZvdW5kYCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5zeXN0ZW1DYWxsTWV0aG9kcy5jaGVja1Byb2Nlc3NTdGF0dXMgPSBhc3luYyBmdW5jdGlvbiAocHJvY2Vzcywgb3B0cyA9IHt9KSB7XG4gIGxldCByZXN1bHQgPSBhd2FpdCB0aGlzLnNoZWxsKFtgcGdyZXAgJHtwcm9jZXNzfWBdLCBvcHRzKTtcbiAgcmV0dXJuIHJlc3VsdC5sZW5ndGggPiAwO1xufTtcblxuc3lzdGVtQ2FsbE1ldGhvZHMuc3RhcnRFeGVjID0gYXN5bmMgZnVuY3Rpb24gKGV4ZWMsIG9wdHMgPSB7fSkge1xuICBsZXQgZXhlY1BhdGggPSBcIi91c3IvYmluL1wiICsgZXhlYztcbiAgYXdhaXQgdGhpcy5zaGVsbChbZXhlY1BhdGhdLCBvcHRzKTtcbn07XG5cbnN5c3RlbUNhbGxNZXRob2RzLnN0b3BBdXRvU2xlZXAgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGF3YWl0IHRoaXMucm9vdCgpO1xuICBhd2FpdCB0aGlzLnNoZWxsKCdkZXZpY2VjdGwgZGlzcGxheSBzdG9wJyk7XG59O1xuXG5zeXN0ZW1DYWxsTWV0aG9kcy5zdGFydEF1dG9TbGVlcCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgYXdhaXQgdGhpcy5yb290KCk7XG4gIGF3YWl0IHRoaXMuc2hlbGwoJ2RldmljZWN0bCBkaXNwbGF5IHN0YXJ0Jyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBzeXN0ZW1DYWxsTWV0aG9kcztcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
