"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.commands = void 0;

var _execute = _interopRequireDefault(require("./execute"));

var _find = _interopRequireDefault(require("./find"));

var _general = _interopRequireDefault(require("./general"));

var _element = _interopRequireDefault(require("./element"));

var _action = _interopRequireDefault(require("./action"));

var _touch = _interopRequireDefault(require("./touch"));

let commands = {};
exports.commands = commands;
Object.assign(commands, _execute.default, _find.default, _general.default, _element.default, _action.default, _touch.default);
var _default = commands;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9pbmRleC5qcyJdLCJuYW1lcyI6WyJjb21tYW5kcyIsIk9iamVjdCIsImFzc2lnbiIsImV4ZWN1dGVDbWRzIiwiZmluZENtZHMiLCJnZW5lcmFsQ21kcyIsImVsZW1lbnRDbWRzIiwiYWN0aW9uQ21kcyIsInRvdWNoQ21kcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUEsSUFBSUEsUUFBUSxHQUFHLEVBQWY7O0FBQ0FDLE1BQU0sQ0FBQ0MsTUFBUCxDQUNFRixRQURGLEVBRUVHLGdCQUZGLEVBR0VDLGFBSEYsRUFJRUMsZ0JBSkYsRUFLRUMsZ0JBTEYsRUFNRUMsZUFORixFQU9FQyxjQVBGO2VBV2VSLFEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhlY3V0ZUNtZHMgZnJvbSAnLi9leGVjdXRlJztcbmltcG9ydCBmaW5kQ21kcyBmcm9tICcuL2ZpbmQnO1xuaW1wb3J0IGdlbmVyYWxDbWRzIGZyb20gJy4vZ2VuZXJhbCc7XG5pbXBvcnQgZWxlbWVudENtZHMgZnJvbSAnLi9lbGVtZW50JztcbmltcG9ydCBhY3Rpb25DbWRzIGZyb20gJy4vYWN0aW9uJztcbmltcG9ydCB0b3VjaENtZHMgZnJvbSAnLi90b3VjaCc7XG5cbmxldCBjb21tYW5kcyA9IHt9O1xuT2JqZWN0LmFzc2lnbihcbiAgY29tbWFuZHMsXG4gIGV4ZWN1dGVDbWRzLFxuICBmaW5kQ21kcyxcbiAgZ2VuZXJhbENtZHMsXG4gIGVsZW1lbnRDbWRzLFxuICBhY3Rpb25DbWRzLFxuICB0b3VjaENtZHNcbik7XG5cbmV4cG9ydCB7IGNvbW1hbmRzIH07XG5leHBvcnQgZGVmYXVsdCBjb21tYW5kcztcbiJdLCJmaWxlIjoibGliL2NvbW1hbmRzL2luZGV4LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=
