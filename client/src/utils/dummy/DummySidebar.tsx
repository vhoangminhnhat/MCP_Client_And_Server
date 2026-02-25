import { BarChartOutlined, MessageOutlined } from "@ant-design/icons";

export const dummySidebar = {
  vi: [
    {
      name: "Tổng quan",
      path: "/dashboard",
      componentName: "GeneralFeature",
      icon: <BarChartOutlined />,
      enable: true,
      featureKey: [
        "/api/v1/report/revenue/trending",
        "/api/v1/transaction/retrieve-report",
      ],
      subMenu: [],
    },
    {
      name: "Chat",
      path: "/chat",
      componentName: "ChatFeature",
      icon: <MessageOutlined />,
      enable: true,
      featureKey: [
        "/api/v1/report/revenue/trending",
        "/api/v1/transaction/retrieve-report",
      ],
      subMenu: [],
    },
  ],
};
