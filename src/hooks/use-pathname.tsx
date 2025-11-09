import { useEffect, useState } from "react";

export function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener("locationchange", handleLocationChange);

    return () => {
      window.removeEventListener("locationchange", handleLocationChange);
    };
  }, []);

  return pathname;
}
