import { isServer, QueryClient } from "@tanstack/react-query";
import { isUnauthorized } from "@/lib/api/errors";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        // Never retry auth failures; the axios interceptor already tried a refresh.
        retry: (failureCount, error) => !isUnauthorized(error) && failureCount < 2,
        refetchOnWindowFocus: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

/** New client per server request, a single shared one in the browser. */
export function getQueryClient() {
  if (isServer) return makeQueryClient();
  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
}
