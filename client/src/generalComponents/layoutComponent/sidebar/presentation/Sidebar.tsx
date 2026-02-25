import { ClientContext } from "@/context/AuthenticationContext";
import { IAuthenticationContext } from "@/context/interface/IAuthenticationContext";
import { colorFormat } from "@/utils/format/ColorFormat";
import { Menu } from "antd";
import companyLogo from "assets/images/company_logo.png";
import { Component, ContextType, createRef, ReactNode } from "react";
import { NavigateFunction, NavLink } from "react-router-dom";
import { MenuConfigModel } from "../data/dto/SidebarMenuConfigModel";

interface ISidebar {
  sidebarOpen: boolean;
  location: Location;
  navigate: NavigateFunction;
  setSidebarOpen: (open: boolean) => void;
}

interface ISidebarState {
  defaultOpenKeys: string[];
  defaultSelectedKeys: string[];
}

export default class Sidebar extends Component<ISidebar, ISidebarState> {
  static contextType = ClientContext;
  declare context: ContextType<typeof ClientContext>;

  private sidebarRef = createRef<HTMLDivElement>();

  private normalizePathname(pathname: string): string {
    return pathname === "/" || pathname === "" ? "/dashboard" : pathname;
  }

  constructor(props: ISidebar) {
    super(props);
    const effectivePathname = this.normalizePathname(
      this.props.location.pathname,
    );
    const page = effectivePathname.split("/")[1];

    this.state = {
      defaultOpenKeys: [`/${page}`],
      defaultSelectedKeys: [effectivePathname],
    };

    this.onClickMenuItem = this.onClickMenuItem.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  private handleClickOutside(event: MouseEvent) {
    if (
      this.sidebarRef.current &&
      !this.sidebarRef.current.contains(event.target as Node)
    ) {
      this.props.setSidebarOpen(false);
    }
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (!this.props.sidebarOpen || event.key !== "Escape") return;
    this.props.setSidebarOpen(false);
  }

  private getMenuItem(
    label: string,
    key: string,
    icon: ReactNode,
    children?: any,
    type?: any,
  ) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  private async onClickMenuItem(e: any) {
    this.props.navigate(e.key);
    this.props.setSidebarOpen(false);
  }

  private getSideNav() {
    const { menuConfig } = this.context as IAuthenticationContext;
    const { pathname } = this.props.location;

    return menuConfig?.menu.map((menu) => {
      return {
        item: new MenuConfigModel(
          menu.name,
          menu.path,
          menu.componentName,
          <img
            src={menu?.icon as string}
            alt={menu?.name}
            style={{
              filter: this.normalizePathname(pathname).includes(menu?.path)
                ? colorFormat?.FilterBlueImage
                : "none",
            }}
            className="object-cover w-[17px] h-[17px]"
          />,
          menu.featureKey,
        ),
        children:
          menu.subMenu?.length > 0
            ? menu?.subMenu.map(
                (subMenu) =>
                  new MenuConfigModel(
                    subMenu.name,
                    subMenu.path,
                    subMenu.componentName,
                    <img
                      src={subMenu?.icon as string}
                      alt={subMenu?.name}
                      style={{
                        filter: this.normalizePathname(pathname).includes(
                          subMenu?.path,
                        )
                          ? colorFormat?.FilterBlueImage
                          : "none",
                      }}
                      className="object-cover w-[17px] h-[17px]"
                    />,
                    menu.featureKey,
                  ),
              )
            : undefined,
      };
    });
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  render(): ReactNode {
    const { sidebarOpen } = this.props;
    const { defaultOpenKeys, defaultSelectedKeys } = this.state;

    const sideNav = this.getSideNav();
    const itemsNav = sideNav?.map((nav) =>
      this.getMenuItem(
        nav.item.name,
        nav.item.path,
        nav.item.icon,
        nav.children?.map((subNav) =>
          this.getMenuItem(subNav.name, subNav.path, subNav.icon),
        ),
      ),
    );

    return (
      <div className="xl:w-64 w-0">
        <div
          className={`fixed inset-0 bg-opacity-30 z-40 xl:hidden xl:z-auto transition-opacity duration-200 ${
            sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden="true"
        ></div>
        <div
          ref={this.sidebarRef}
          id="sidebar"
          className={`absolute xl:z-20 z-50 left-0 top-0 xl:static xl:left-auto xl:top-auto xl:translate-x-0 transform h-screen overflow-y-scroll xl:overflow-y-auto no-scrollbar w-64 flex-shrink-0 xl:bg-[#007AFF0D] bg-gray-50 px-2 py-1 transition-transform duration-200 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-64"
          }`}
        >
          <div className="flex flex-col justify-between pr-2 sm:px-1">
            <NavLink to="/" className="block w-full">
              <div
                className="flex flex-col justify-center items-start object-contain h-[60px] border-b border-gray-200 px-4"
                style={{ backgroundColor: "transparent" }}
              >
                <img
                  src={companyLogo}
                  alt="sidebarLogo"
                  className="object-contain h-[80px] py-1"
                />
              </div>
            </NavLink>
          </div>
          <Menu
            mode="inline"
            items={itemsNav}
            onClick={this.onClickMenuItem}
            defaultOpenKeys={defaultOpenKeys}
            defaultSelectedKeys={defaultSelectedKeys}
            style={{ borderInlineEnd: "none", fontWeight: 500 }}
          />
        </div>
      </div>
    );
  }
}
