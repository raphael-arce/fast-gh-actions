import { useEffect } from "react";
import { useSession } from "../stores/use-session";

export function useRedirects() {
  const { session } = useSession();

  const pathname = window.location.pathname;

  useEffect(() => {
    if (session) {
      handleAuthenticated(pathname);
      return;
    }

    handleUnauthenticated(pathname);
  }, [pathname, session]);
}

export function handleAuthenticated(pathname: string) {
  if (pathname === "/") {
    return;
  }

  history.pushState(null, "", "/");
}

export function handleUnauthenticated(pathname: string) {
  if (pathname.includes("/login")) {
    return;
  }

  if (pathname.includes("/register")) {
    return;
  }

  history.pushState(null, "", "/login");
}
