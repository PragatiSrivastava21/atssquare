import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Scroll to top before browser paint - completely invisible
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
