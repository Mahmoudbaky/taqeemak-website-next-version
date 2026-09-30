/**
 * Access token storage. The backend contract keeps the access token client-side
 * while refreshToken/fgp live in HTTP-only cookies on the API domain.
 */
const ACCESS_TOKEN_KEY = "accessToken";
const AUTH_EVENT = "taqeemak:auth-change";

const isBrowser = () => typeof window !== "undefined";

export const getAccessToken = () => {
  if (!isBrowser()) return null;
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
};

const notify = () => window.dispatchEvent(new Event(AUTH_EVENT));

export const setAccessToken = (token: string) => {
  if (!isBrowser()) return;
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
  notify();
};

export const clearAccessToken = () => {
  if (!isBrowser()) return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  notify();
};

/** Subscribe to token changes (this tab via custom event, other tabs via storage). */
export const subscribeToAccessToken = (callback: () => void) => {
  const onStorage = (e: StorageEvent) => e.key === ACCESS_TOKEN_KEY && callback();
  window.addEventListener(AUTH_EVENT, callback);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(AUTH_EVENT, callback);
    window.removeEventListener("storage", onStorage);
  };
};
