"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
// src/App.tsx
var react_router_dom_1 = require("react-router-dom");
var router_1 = require("./app/router");
var QueryProvider_1 = require("./app/providers/QueryProvider");
var AuthProvider_1 = require("./app/providers/AuthProvider");
var ThemeProvider_1 = require("./app/providers/ThemeProvider");
var I18nProvider_1 = require("./app/providers/I18nProvider");
require("./App.css");
function App() {
    return ((0, jsx_runtime_1.jsx)(ThemeProvider_1.ThemeProvider, { children: (0, jsx_runtime_1.jsx)(I18nProvider_1.I18nProvider, { children: (0, jsx_runtime_1.jsx)(AuthProvider_1.AuthProvider, { children: (0, jsx_runtime_1.jsx)(QueryProvider_1.QueryProvider, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.RouterProvider, { router: router_1.router }) }) }) }) }));
}
exports.default = App;
