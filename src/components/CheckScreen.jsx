import { useState, useEffect } from "react";

const useIsMobileOrTablet = () => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(
    window.innerWidth < 640
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobileOrTablet;
};

export default useIsMobileOrTablet;
