import { SidebarMenuConfigModel } from "@/generalComponents/layoutComponent/sidebar/data/dto/SidebarMenuConfigModel";
import { SidebarInjection } from "@/generalComponents/layoutComponent/sidebar/domain/entities/SidebarInjection";
import { productCache } from "@/utils/cache/ProductCache";
import { CachedKeyEnum } from "@/utils/enum/CachedKeyEnum";
import { DataFormat } from "@/utils/format/DataFormat";
import { ClientHelpers } from "@/utils/helpers";
import useScreenSize from "@/utils/hooks/useScreenSize";
import { strings } from "@/utils/localizedStrings";
import { isEmpty, isUndefined } from "lodash";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { IAuthenticationContext } from "./interface/IAuthenticationContext";

export const ClientContext = createContext<IAuthenticationContext | undefined>(
  undefined,
);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const { isLargeScreen } = useScreenSize();
  const history = useNavigate();
  const token = DataFormat.getToken();
  const [userInfo, setUserInfo] = useState<Record<string, unknown>>({});
  const [language, setLanguage] = useState<string>("vi");
  const [menuConfig, setMenuConfig] = useState<
    SidebarMenuConfigModel | undefined
  >(undefined);
  const sidebarUseCase = SidebarInjection.getSidebarUseCase();

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

  const getSidebar = useCallback(
    async (role: boolean, language: string) => {
      try {
        const siderConfig = await sidebarUseCase?.getSidebarMenu(
          role,
          language,
        );
        setMenuConfig(siderConfig?.data);
        localStorage?.setItem("menu", JSON.stringify(siderConfig?.data));
      } catch (error) {
        console.log(error);
      }
    },
    [userInfo, language],
  );

  const getRoles = useCallback(async () => {
    if (!window?.location?.pathname?.includes("/login")) {
      try {
        const cache = productCache?.getCache("user");
        if (!isEmpty(cache)) {
          setUserInfo(cache);
          await getSidebar(cache?.role === "admin", language);
        } else {
          localStorage?.clear();
          sessionStorage?.clear();
          productCache?.resetCache("");
          ClientHelpers.getMessage(
            strings.GlobalMessage.InvalidAccount,
            3,
            "error",
          );
          history("/login");
        }
      } catch (error) {
        console.log(error);
        localStorage?.clear();
        sessionStorage?.clear();
        productCache?.resetCache("");
        history("/login");
      }
    }
  }, [history]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      checkLanguage();
    }
  }, [language]);

  useEffect(() => {
    if (!isEmpty(token) && !isUndefined(token)) {
      getRoles();
    } else {
      localStorage?.clear();
      sessionStorage?.clear();
      productCache?.resetCache("");
      history("/login");
    }
  }, [token]);

  return (
    <ClientContext.Provider
      value={
        {
          isLargeScreen,
          language,
          userInfo,
          menuConfig,
          setMenuConfig,
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
