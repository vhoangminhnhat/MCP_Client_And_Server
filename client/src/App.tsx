import { isUndefined } from "lodash";
import {
  createElement,
  ReactNode,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import "./App.css";
import { AuthenContext } from "./context/AuthenticationContext";
import { IAuthenticationContext } from "./context/interface/IAuthenticationContext";
import { higherOrderComponent } from "./generalComponents/higherOrderComponent/HigherOrderComponent";
import PrivateRoute from "./generalComponents/layoutComponent/privateRoute/PrivateRoute";
import { MenuConfigModel } from "./generalComponents/layoutComponent/sidebar/data/dto/SidebarMenuConfigModel";
import NotFoundComponent from "./generalComponents/notFoundComponent/NotFoundComponent";
import ClientPages from "./navigation/ClientPages";
import { IBasedViews } from "./utils/basedModel/BasedViews";
import { DependencyInjection } from "./utils/di/DependecyInjection";
import { DataFormat } from "./utils/format/DataFormat";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const routeParams = useParams();
  const [diInjected, setDiInjected] = useState<boolean>(false);
  const { menuConfig } = AuthenContext() as IAuthenticationContext;

  const initDependency = async () => {
    try {
      await DependencyInjection.initInjections();
      setDiInjected(true);
    } catch (error) {
      console.error("Dependency Injection error:", error);
    }
  };

  const loadingScreen = () => {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--text"></div>
        </div>
      </div>
    );
  };

  const mapMenuToRoutes = (menu: MenuConfigModel) => {
    const Component = ClientPages.getPage(menu.componentName);
    const diToken = ClientPages.getToken(menu.componentName);
    const props = ClientPages.getAddtionalProps(menu.componentName);

    if (!Component) return <>{loadingScreen()}</>;

    return (
      <>
        <Route
          path={menu.path}
          key={menu.path}
          element={
            <PrivateRoute path={menu.path}>
              {!diInjected ? null : (
                <Suspense fallback={loadingScreen()}>
                  {diToken ? (
                    createElement(
                      higherOrderComponent(Component, {
                        token: diToken,
                        addtionalProps: {
                          ...(props as unknown as IBasedViews),
                          routeParams,
                        },
                      }),
                    )
                  ) : (
                    <Component />
                  )}
                </Suspense>
              )}
            </PrivateRoute>
          }
        />
        <Route
          path={`${menu?.path}/:searchCode`}
          key={`${menu?.name} - ${menu?.componentName} - ${menu?.path} - searchCode`}
          element={
            <PrivateRoute path={`${menu?.path}/:searchCode`}>
              {!diInjected ? null : (
                <Suspense fallback={loadingScreen()}>
                  {diToken ? (
                    createElement(
                      higherOrderComponent(Component, {
                        token: diToken,
                        addtionalProps: {
                          ...(props as unknown as IBasedViews),
                          routeParams,
                        },
                      }),
                    )
                  ) : (
                    <Component />
                  )}
                </Suspense>
              )}
            </PrivateRoute>
          }
        />
      </>
    );
  };

  const routeRendering = useMemo(() => {
    let routes: Array<ReactNode> = [];
    menuConfig?.menu?.forEach((menu) => {
      routes.push(mapMenuToRoutes(menu));
      if (menu.subMenu?.length > 0) {
        menu.subMenu?.forEach((subMenu) => {
          routes.push(mapMenuToRoutes(subMenu));
          if (subMenu.path === "/transaction-history/app-sim-mobifone") {
          }
        });
      }
    });
    return routes;
  }, [menuConfig]);

  const pageRendering = () => {
    const isNotFound =
      !!DataFormat.getToken() &&
      location?.pathname !== "/" &&
      !!menuConfig &&
      isUndefined(
        menuConfig?.menu?.find((ele) => ele?.path === location?.pathname)?.path,
      );

    if (typeof window === "undefined" || !diInjected) {
      return <>{loadingScreen()}</>;
    }

    return (
      <>
        {/* <Route
          path={"/"}
          key={"default"}
          element={
            <PrivateRoute path={"/"} key={"default"}>
              <GeneralFeature />
            </PrivateRoute>
          }
        /> */}
        {routeRendering}
        {isNotFound ? (
          <Route
            path={location?.pathname}
            element={
              <PrivateRoute path={location?.pathname}>
                <NotFoundComponent />
              </PrivateRoute>
            }
          />
        ) : (
          <></>
        )}
      </>
    );
  };

  useEffect(() => {
    if (!diInjected) {
      initDependency();
    }
  }, []);

  useEffect(() => {
    document.querySelector("html")!.style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html")!.style.scrollBehavior = "";
  }, [location.pathname]);

  if (!diInjected) {
    return <>{loadingScreen()}</>;
  }

  return (
    <Routes>
      {/* <Route
        path="/login"
        element={
          <LoginFeature
            navigate={navigate}
            token={AuthenticationToken.LoginViewModel}
          />
        }
      ></Route> */}
      <>{pageRendering()}</>
      <Route
        path="/404"
        element={
          <PrivateRoute path="/404">
            <NotFoundComponent />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
