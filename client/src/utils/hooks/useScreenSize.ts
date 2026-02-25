import { useEffect, useState } from "react";

const useScreenSize = () => {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLargeScreen(window.matchMedia("(min-width: 1100px)").matches);

      const handleResize = (e: {
        matches: boolean | ((prevState: boolean) => boolean);
      }) => {
        setIsLargeScreen(e.matches);
      };

      const mediaQuery = window.matchMedia("(min-width: 1100px)");

      mediaQuery.addEventListener("change", handleResize);

      return () => {
        mediaQuery.removeEventListener("change", handleResize);
      };
    }
  }, []);

  return {
    isLargeScreen,
  };
};

export default useScreenSize;
