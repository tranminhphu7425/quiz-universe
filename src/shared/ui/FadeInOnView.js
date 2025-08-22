"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FadeInOnView;
var jsx_runtime_1 = require("react/jsx-runtime");
// src/shared/ui/FadeInOnView.tsx
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
function FadeInOnView(_a) {
    var children = _a.children, root = _a.root, _b = _a.amount, amount = _b === void 0 ? 0.2 : _b, _c = _a.margin, margin = _c === void 0 ? "0px 0px -10% 0px" : _c, _d = _a.delay, delay = _d === void 0 ? 0 : _d, _e = _a.y, y = _e === void 0 ? 16 : _e, _f = _a.once, once = _f === void 0 ? true : _f;
    var ref = (0, react_1.useRef)(null);
    var inView = (0, framer_motion_1.useInView)(ref, { root: root, margin: margin, amount: amount, once: false });
    var controls = (0, framer_motion_1.useAnimation)();
    (0, react_1.useEffect)(function () {
        if (inView)
            controls.start({ opacity: 1, y: 0 });
        // Không reset khi ra khỏi khung nếu once=true
        else if (!once)
            controls.start({ opacity: 0, y: y });
    }, [inView, controls, once, y]);
    return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { ref: ref, initial: { opacity: 0, y: y }, animate: controls, transition: { type: "spring", stiffness: 140, damping: 16, delay: delay }, children: children }));
}
