import { useEffect } from "react";
import { useSession } from "../stores/use-session";
import { usePathname } from "./use-pathname";

export function useRedirects() {
  const { session } = useSession();

  const pathname = usePathname();

  useEffect(() => {
    if (session === undefined) {
      return;
    }

    if (session === null) {
      handleUnauthenticated(pathname);
      return;
    }

    handleAuthenticated(pathname);
  }, [pathname, session]);
}

export function handleAuthenticated(pathname: string) {
  if (pathname === "/") {
    return;
  }

  window.location.href = "/";
}

export function handleUnauthenticated(pathname: string) {
  if (pathname.includes("/login")) {
    return;
  }

  if (pathname.includes("/register")) {
    return;
  }

  window.location.href = "/login";
}
