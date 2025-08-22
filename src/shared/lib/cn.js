"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cn = cn;
// src/shared/lib/cn.ts
function cn() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(" ");
}
