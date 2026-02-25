import { CachedKeyEnum } from "@/utils/enum/CachedKeyEnum";
import useScreenSize from "@/utils/hooks/useScreenSize";
import { strings } from "@/utils/localizedStrings";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IAuthenticationContext } from "./interface/IAuthenticationContext";

export const ClientContext = createContext<IAuthenticationContext | undefined>(
  undefined,
);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const { isLargeScreen } = useScreenSize();
  const [userInfo, setUserInfo] = useState<Record<string, unknown>>({});
  const [language, setLanguage] = useState<string>("vi");

  const checkLanguage = async () => {
    const savedLang = localStorage?.getItem(CachedKeyEnum.language);
    if (savedLang === "en") {
      setLanguage("en");
      strings.setLanguage("en");
    } else {
      setLanguage("vi");
      strings.setLanguage("vi");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      checkLanguage();
    }
  }, [language]);

  return (
    <ClientContext.Provider
      value={
        {
          isLargeScreen,
          language,
          userInfo,
          setUserInfo,
          setLanguage,
        } as IAuthenticationContext
      }
    >
      {children}
    </ClientContext.Provider>
  );
};

export const AuthenContext = () => useContext(ClientContext);
