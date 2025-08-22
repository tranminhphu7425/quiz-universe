import { jsx as _jsx } from "react/jsx-runtime";
// src/App.tsx
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { QueryProvider } from "./app/providers/QueryProvider";
import { AuthProvider } from "./app/providers/AuthProvider";
import { ThemeProvider } from "./app/providers/ThemeProvider";
import { I18nProvider } from "./app/providers/I18nProvider";
import "./App.css";
function App() {
    return (_jsx(ThemeProvider, { children: _jsx(I18nProvider, { children: _jsx(AuthProvider, { children: _jsx(QueryProvider, { children: _jsx(RouterProvider, { router: router }) }) }) }) }));
}
export default App;
