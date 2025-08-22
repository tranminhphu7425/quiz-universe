import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Auto-generated
// src/app/providers/QueryProvider.tsx
import { useMemo } from "react";
import { QueryClient, QueryClientProvider, QueryCache, MutationCache, } from "@tanstack/react-query";
// Optional: chỉ import Devtools khi dev build
let ReactQueryDevtools = null;
if (import.meta.env.DEV) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore – dynamic require dành cho dev
    ReactQueryDevtools = (await import("@tanstack/react-query-devtools")).ReactQueryDevtools;
}
let queryClientSingleton = null;
function createClient() {
    return new QueryClient({
        queryCache: new QueryCache({
            onError: (error, query) => {
                // Bạn có thể log/notify ở đây
                // console.error("[RQ] Query error:", query?.queryKey, error);
            },
        }),
        mutationCache: new MutationCache({
            onError: (error, _vars, _ctx, mutation) => {
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
export function QueryProvider({ children }) {
    const client = useMemo(() => {
        if (!queryClientSingleton)
            queryClientSingleton = createClient();
        return queryClientSingleton;
    }, []);
    return (_jsxs(QueryClientProvider, { client: client, children: [children, import.meta.env.DEV && ReactQueryDevtools ? (_jsx(ReactQueryDevtools, { initialIsOpen: false, buttonPosition: "bottom-left" })) : null] }));
}
