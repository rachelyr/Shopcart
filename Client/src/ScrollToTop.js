import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0});
  }, [pathname]); // Runs when the path changes

  return null; // This component does not render anything
};

export default ScrollToTop;

