import { useEffect, useState } from "react";

import { useLocation } from "@tanstack/react-router";

export function useCurrentUrl(customUrl) {
  const location = useLocation();

  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = `${window.location.protocol}//${window.location.host}${customUrl ?? location.pathname}`;
      setCurrentUrl(url);
    }
  }, [customUrl, location.pathname]);

  return currentUrl;
}
