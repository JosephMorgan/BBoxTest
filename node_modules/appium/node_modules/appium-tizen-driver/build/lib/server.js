"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startServer = startServer;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _logger = _interopRequireDefault(require("./logger"));

var _appiumBaseDriver = require("appium-base-driver");

var _driver = _interopRequireDefault(require("./driver"));

function startServer(_x, _x2) {
  return _startServer.apply(this, arguments);
}

function _startServer() {
  _startServer = (0, _asyncToGenerator2.default)(function* (port, host) {
    let d = new _driver.default();
    let router = (0, _appiumBaseDriver.routeConfiguringFunction)(d);
    let server = yield (0, _appiumBaseDriver.server)(router, port, host);

    _logger.default.info(`TizenDriver server listening on http://${host}:${port}`);

    return server;
  });
  return _startServer.apply(this, arguments);
}require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9zZXJ2ZXIuanMiXSwibmFtZXMiOlsic3RhcnRTZXJ2ZXIiLCJwb3J0IiwiaG9zdCIsImQiLCJUaXplbkRyaXZlciIsInJvdXRlciIsInNlcnZlciIsImxvZyIsImluZm8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O1NBR2VBLFc7Ozs7O2lEQUFmLFdBQTRCQyxJQUE1QixFQUFrQ0MsSUFBbEMsRUFBd0M7QUFDdEMsUUFBSUMsQ0FBQyxHQUFHLElBQUlDLGVBQUosRUFBUjtBQUNBLFFBQUlDLE1BQU0sR0FBRyxnREFBeUJGLENBQXpCLENBQWI7QUFDQSxRQUFJRyxNQUFNLFNBQVMsOEJBQVdELE1BQVgsRUFBbUJKLElBQW5CLEVBQXlCQyxJQUF6QixDQUFuQjs7QUFDQUssb0JBQUlDLElBQUosQ0FBVSwwQ0FBeUNOLElBQUssSUFBR0QsSUFBSyxFQUFoRTs7QUFDQSxXQUFPSyxNQUFQO0FBQ0QsRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHsgc2VydmVyIGFzIGJhc2VTZXJ2ZXIsIHJvdXRlQ29uZmlndXJpbmdGdW5jdGlvbiB9IGZyb20gJ2FwcGl1bS1iYXNlLWRyaXZlcic7XG5pbXBvcnQgVGl6ZW5Ecml2ZXIgZnJvbSAnLi9kcml2ZXInO1xuXG5cbmFzeW5jIGZ1bmN0aW9uIHN0YXJ0U2VydmVyIChwb3J0LCBob3N0KSB7XG4gIGxldCBkID0gbmV3IFRpemVuRHJpdmVyKCk7XG4gIGxldCByb3V0ZXIgPSByb3V0ZUNvbmZpZ3VyaW5nRnVuY3Rpb24oZCk7XG4gIGxldCBzZXJ2ZXIgPSBhd2FpdCBiYXNlU2VydmVyKHJvdXRlciwgcG9ydCwgaG9zdCk7XG4gIGxvZy5pbmZvKGBUaXplbkRyaXZlciBzZXJ2ZXIgbGlzdGVuaW5nIG9uIGh0dHA6Ly8ke2hvc3R9OiR7cG9ydH1gKTtcbiAgcmV0dXJuIHNlcnZlcjtcbn1cblxuZXhwb3J0IHsgc3RhcnRTZXJ2ZXIgfTtcbiJdLCJmaWxlIjoibGliL3NlcnZlci5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLiJ9
