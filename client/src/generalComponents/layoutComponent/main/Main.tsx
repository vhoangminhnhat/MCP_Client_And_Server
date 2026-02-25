import { ConfigProvider, Layout } from "antd";
import { Component, ReactNode } from "react";
import { NavigateFunction } from "react-router-dom";
import { colorFormat } from "utils/format/ColorFormat";
import Sidebar from "../sidebar/presentation/Sidebar";

const { Footer: AntFooter } = Layout;

interface IMainFeature {
  children?: ReactNode;
  location?: Location;
  navigate?: NavigateFunction;
}

interface IMainState {
  sidebarOpen: boolean;
}

class Main extends Component<IMainFeature, IMainState> {
  constructor(props: IMainFeature) {
    super(props);
    this.state = {
      sidebarOpen: false,
    };

    this.setSidebarOpen = this.setSidebarOpen.bind(this);
  }

  setSidebarOpen(open: boolean) {
    this.setState({ sidebarOpen: open });
  }

  render() {
    const { children, location, navigate } = this.props;
    const { sidebarOpen } = this.state;

    return (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: colorFormat?.Blue,
            colorError: colorFormat?.Red_Dark,
          },
          components: {
            Menu: {
              itemColor: colorFormat?.Black,
              itemBg: "transparent",
              subMenuItemBg: "transparent",
              itemSelectedColor: colorFormat?.Blue,
              itemSelectedBg: "transparent",
              itemActiveBg: "transparent",
            },
          },
        }}
      >
        <section className="flex h-screen overflow-hidden">
          <Sidebar
            sidebarOpen={sidebarOpen}
            location={location as Location}
            navigate={navigate as NavigateFunction}
            setSidebarOpen={this.setSidebarOpen}
          />
          <div className="relative flex flex-col flex-1 overflow-y-auto">
            {/* <Header
              sidebarOpen={sidebarOpen}
              setSidebarOpen={this.setSidebarOpen}
            /> */}
            <section>{children}</section>
            <AntFooter className="xl:flex hidden w-full mt-auto bg-white">
              <p>
                {" "}
                Copyright © 2026 by{" "}
                <a
                  target="_blank"
                  className="hover:text-blue-600 font-[700] hover:underline"
                  href="https://phuongquan.vn/"
                  rel="noreferrer"
                >
                  Minh Nhat - Senior FE Developer
                </a>
                .{" "}
              </p>
            </AntFooter>
          </div>
        </section>
      </ConfigProvider>
    );
  }
}

export default Main;
