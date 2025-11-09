import { useEffect } from "react";
import { useSession } from "../stores/use-session";
import { useLocation, useNavigate, type NavigateFunction } from "react-router";

export function useRedirects() {
  const { session } = useSession();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (session === undefined) {
      return;
    }

    if (session === null) {
      handleUnauthenticated(location.pathname, navigate);
      return;
    }

    handleAuthenticated(location.pathname, navigate);
  }, [location, session]);
}

export function handleAuthenticated(
  pathname: string,
  navigate: NavigateFunction,
) {
  if (pathname === "/") {
    return;
  }

  navigate("/");
}

export function handleUnauthenticated(
  pathname: string,
  navigate: NavigateFunction,
) {
  if (pathname.includes("/login")) {
    return;
  }

  if (pathname.includes("/register")) {
    return;
  }

  navigate("/login");
}
