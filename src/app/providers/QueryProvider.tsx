// Auto-generated
// src/app/providers/QueryProvider.tsx
import { ReactNode, useMemo } from "react";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

// Optional: chỉ import Devtools khi dev build
let ReactQueryDevtools: React.ComponentType<any> | null = null;
if (import.meta.env.DEV) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore – dynamic require dành cho dev
  ReactQueryDevtools = (await import("@tanstack/react-query-devtools")).ReactQueryDevtools;
}

type Props = { children: ReactNode };

let queryClientSingleton: QueryClient | null = null;

// Helper để dịch các lỗi kỹ thuật sang ngôn ngữ thân thiện
const getFriendlyErrorMessage = (error: any): string => {
  // Lỗi từ phía server trả về có message
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  // Lỗi mạng hoặc server sập
  if (error?.message === "Network Error") {
    return "Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng!";
  }

  // Lỗi timeout (chờ quá lâu)
  if (error?.code === "ECONNABORTED" || error?.message?.includes("timeout")) {
    return "Máy chủ phản hồi quá lâu. Không thể liên kết được với hệ thống!";
  }

  // Lỗi parse JSON (thường do server lỗi trả về HTML thay vì JSON)
  if (error instanceof SyntaxError || error?.message?.includes("Unexpected token")) {
    return "Hệ thống đang bảo trì hoặc gặp sự cố (Lỗi dữ liệu trả về).";
  }

  // Lỗi server 500+
  if (error?.response?.status >= 500) {
    return "Máy chủ đang gặp sự cố nội bộ. Vui lòng thử lại sau!";
  }

  // Lỗi 404
  if (error?.response?.status === 404) {
    return "Không tìm thấy dữ liệu yêu cầu.";
  }

  return error?.message || "Đã xảy ra lỗi không xác định!";
};

function createClient() {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error: any, query) => {
        // Chỉ hiển thị toast nếu query không tự handle lỗi hoặc không bị tắt toast
        if (query?.meta?.disableGlobalToast) return;
        
        const errorMessage = getFriendlyErrorMessage(error);
        toast.error(`Lỗi: ${errorMessage}`);
        console.error("[RQ] Query error:", query?.queryKey, error);
      },
    }),
    mutationCache: new MutationCache({
      onError: (error: any, _vars, _ctx, mutation) => {
        if (mutation?.meta?.disableGlobalToast) return;

        const errorMessage = getFriendlyErrorMessage(error);
        toast.error(`Thất bại: ${errorMessage}`);
        console.error("[RQ] Mutation error:", mutation?.options?.mutationKey, error);
      },
    }),
    defaultOptions: {
      queries: {
        staleTime: 60_000,               // 1 phút: hạn chế refetch không cần thiết
        gcTime: 5 * 60_000,              // 5 phút
        refetchOnWindowFocus: false,     // tuỳ UX, thường tắt cho dashboard
        refetchOnReconnect: true,
        retry: 1,                         // retry nhẹ nhàng
      },
      mutations: {
        retry: 0,
      },
    },
  });
}

export function QueryProvider({ children }: Props) {
  const client = useMemo(() => {
    if (!queryClientSingleton) queryClientSingleton = createClient();
    return queryClientSingleton;
  }, []);

  return (
    <QueryClientProvider client={client}>
      {children}
      {import.meta.env.DEV && ReactQueryDevtools ? (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      ) : null}
    </QueryClientProvider>
  );
}
