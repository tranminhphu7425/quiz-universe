"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var framer_motion_1 = require("framer-motion");
function Floating(_a) {
    var children = _a.children, _b = _a.delay, delay = _b === void 0 ? 0 : _b, _c = _a.duration, duration = _c === void 0 ? 6 : _c, _d = _a.distance, distance = _d === void 0 ? 14 : _d, className = _a.className;
    return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: className, initial: { y: distance * 0.6, opacity: 0 }, animate: { y: [distance, -distance, distance], opacity: 1 }, transition: { duration: duration, delay: delay, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }, children: children }));
}
exports.default = Floating;
