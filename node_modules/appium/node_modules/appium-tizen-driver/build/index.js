#!/usr/bin/env node
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commonCapConstraints = exports.startServer = exports.TizenDriver = exports.tizenCommands = exports.tizenHelpers = exports.default = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _yargs = _interopRequireDefault(require("yargs"));

var _asyncbox = require("asyncbox");

var server = _interopRequireWildcard(require("./lib/server"));

var driver = _interopRequireWildcard(require("./lib/driver"));

var helpers = _interopRequireWildcard(require("./lib/tizen-helpers"));

var commands = _interopRequireWildcard(require("./lib/commands/index"));

var caps = _interopRequireWildcard(require("./lib/desired-caps"));

const startServer = server.startServer;
exports.startServer = startServer;
const TizenDriver = driver.TizenDriver;
exports.TizenDriver = TizenDriver;
const tizenHelpers = helpers.helpers;
exports.tizenHelpers = tizenHelpers;
const tizenCommands = commands.commands;
exports.tizenCommands = tizenCommands;
const commonCapConstraints = caps.commonCapConstraints;
exports.commonCapConstraints = commonCapConstraints;
const DEFAULT_HOST = "localhost";
const DEFAULT_PORT = 4723;

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = (0, _asyncToGenerator2.default)(function* () {
    let port = _yargs.default.argv.port || DEFAULT_PORT;
    let host = _yargs.default.argv.host || DEFAULT_HOST;
    return yield startServer(port, host);
  });
  return _main.apply(this, arguments);
}

if (require.main === module) {
  (0, _asyncbox.asyncify)(main);
}

var _default = TizenDriver;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInN0YXJ0U2VydmVyIiwic2VydmVyIiwiVGl6ZW5Ecml2ZXIiLCJkcml2ZXIiLCJ0aXplbkhlbHBlcnMiLCJoZWxwZXJzIiwidGl6ZW5Db21tYW5kcyIsImNvbW1hbmRzIiwiY29tbW9uQ2FwQ29uc3RyYWludHMiLCJjYXBzIiwiREVGQVVMVF9IT1NUIiwiREVGQVVMVF9QT1JUIiwibWFpbiIsInBvcnQiLCJ5YXJncyIsImFyZ3YiLCJob3N0IiwicmVxdWlyZSIsIm1vZHVsZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O0FBR0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O01BR1FBLFcsR0FBZ0JDLE0sQ0FBaEJELFc7O01BQ0FFLFcsR0FBZ0JDLE0sQ0FBaEJELFc7O01BQ1NFLFksR0FBaUJDLE8sQ0FBMUJBLE87O01BQ1VDLGEsR0FBa0JDLFEsQ0FBNUJBLFE7O01BQ0FDLG9CLEdBQXlCQyxJLENBQXpCRCxvQjs7QUFFUixNQUFNRSxZQUFZLEdBQUcsV0FBckI7QUFDQSxNQUFNQyxZQUFZLEdBQUcsSUFBckI7O1NBRWVDLEk7Ozs7OzBDQUFmLGFBQXVCO0FBQ3JCLFFBQUlDLElBQUksR0FBR0MsZUFBTUMsSUFBTixDQUFXRixJQUFYLElBQW1CRixZQUE5QjtBQUNBLFFBQUlLLElBQUksR0FBR0YsZUFBTUMsSUFBTixDQUFXQyxJQUFYLElBQW1CTixZQUE5QjtBQUNBLGlCQUFhVixXQUFXLENBQUNhLElBQUQsRUFBT0csSUFBUCxDQUF4QjtBQUNELEc7Ozs7QUFFRCxJQUFJQyxPQUFPLENBQUNMLElBQVIsS0FBaUJNLE1BQXJCLEVBQTZCO0FBQzNCLDBCQUFTTixJQUFUO0FBQ0Q7O2VBRWNWLFciLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG4vLyB0cmFuc3BpbGU6bWFpblxuXG5pbXBvcnQgeWFyZ3MgZnJvbSAneWFyZ3MnO1xuaW1wb3J0IHsgYXN5bmNpZnkgfSBmcm9tICdhc3luY2JveCc7XG5pbXBvcnQgKiBhcyBzZXJ2ZXIgZnJvbSAnLi9saWIvc2VydmVyJztcbmltcG9ydCAqIGFzIGRyaXZlciBmcm9tICcuL2xpYi9kcml2ZXInO1xuaW1wb3J0ICogYXMgaGVscGVycyBmcm9tICcuL2xpYi90aXplbi1oZWxwZXJzJztcbmltcG9ydCAqIGFzIGNvbW1hbmRzIGZyb20gJy4vbGliL2NvbW1hbmRzL2luZGV4JztcbmltcG9ydCAqIGFzIGNhcHMgZnJvbSAnLi9saWIvZGVzaXJlZC1jYXBzJztcblxuXG5jb25zdCB7IHN0YXJ0U2VydmVyIH0gPSBzZXJ2ZXI7XG5jb25zdCB7IFRpemVuRHJpdmVyIH0gPSBkcml2ZXI7XG5jb25zdCB7IGhlbHBlcnM6IHRpemVuSGVscGVycyB9ID0gaGVscGVycztcbmNvbnN0IHsgY29tbWFuZHM6IHRpemVuQ29tbWFuZHMgfSA9IGNvbW1hbmRzO1xuY29uc3QgeyBjb21tb25DYXBDb25zdHJhaW50cyB9ID0gY2FwcztcblxuY29uc3QgREVGQVVMVF9IT1NUID0gXCJsb2NhbGhvc3RcIjtcbmNvbnN0IERFRkFVTFRfUE9SVCA9IDQ3MjM7XG5cbmFzeW5jIGZ1bmN0aW9uIG1haW4gKCkge1xuICBsZXQgcG9ydCA9IHlhcmdzLmFyZ3YucG9ydCB8fCBERUZBVUxUX1BPUlQ7XG4gIGxldCBob3N0ID0geWFyZ3MuYXJndi5ob3N0IHx8IERFRkFVTFRfSE9TVDtcbiAgcmV0dXJuIGF3YWl0IHN0YXJ0U2VydmVyKHBvcnQsIGhvc3QpO1xufVxuXG5pZiAocmVxdWlyZS5tYWluID09PSBtb2R1bGUpIHtcbiAgYXN5bmNpZnkobWFpbik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRpemVuRHJpdmVyO1xuZXhwb3J0IHsgdGl6ZW5IZWxwZXJzLCB0aXplbkNvbW1hbmRzLCBUaXplbkRyaXZlciwgc3RhcnRTZXJ2ZXIsIGNvbW1vbkNhcENvbnN0cmFpbnRzIH07XG4iXSwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlUm9vdCI6Ii4uIn0=
