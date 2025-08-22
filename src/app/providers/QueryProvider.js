"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryProvider = QueryProvider;
var jsx_runtime_1 = require("react/jsx-runtime");
// Auto-generated
// src/app/providers/QueryProvider.tsx
var react_1 = require("react");
var react_query_1 = require("@tanstack/react-query");
// Optional: chỉ import Devtools khi dev build
var ReactQueryDevtools = null;
if (import.meta.env.DEV) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore – dynamic require dành cho dev
    ReactQueryDevtools = (await Promise.resolve().then(function () { return require("@tanstack/react-query-devtools"); })).ReactQueryDevtools;
}
var queryClientSingleton = null;
function createClient() {
    return new react_query_1.QueryClient({
        queryCache: new react_query_1.QueryCache({
            onError: function (error, query) {
                // Bạn có thể log/notify ở đây
                // console.error("[RQ] Query error:", query?.queryKey, error);
            },
        }),
        mutationCache: new react_query_1.MutationCache({
            onError: function (error, _vars, _ctx, mutation) {
                // console.error("[RQ] Mutation error:", mutation?.options?.mutationKey, error);
            },
        }),
        defaultOptions: {
            queries: {
                staleTime: 60000, // 1 phút: hạn chế refetch không cần thiết
                gcTime: 5 * 60000, // 5 phút
                refetchOnWindowFocus: false, // tuỳ UX, thường tắt cho dashboard
                refetchOnReconnect: true,
                retry: 1, // retry nhẹ nhàng
            },
            mutations: {
                retry: 0,
            },
        },
    });
}
function QueryProvider(_a) {
    var children = _a.children;
    var client = (0, react_1.useMemo)(function () {
        if (!queryClientSingleton)
            queryClientSingleton = createClient();
        return queryClientSingleton;
    }, []);
    return ((0, jsx_runtime_1.jsxs)(react_query_1.QueryClientProvider, { client: client, children: [children, import.meta.env.DEV && ReactQueryDevtools ? ((0, jsx_runtime_1.jsx)(ReactQueryDevtools, { initialIsOpen: false, buttonPosition: "bottom-left" })) : null] }));
}
