import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { FormItemProps, message } from "antd";
import { isEmpty, isUndefined } from "lodash";
import { strings } from "../localizedStrings";

export class ClientHelpers {
  static getMessage = (
    info: string,
    time: number,
    type: "success" | "error" | "warning" | "info",
  ) => {
    message?.destroy();
    switch (type) {
      case "info":
        return message.info({
          content: info,
          icon: <InfoCircleOutlined className="text-white" />,
          duration: time,
        });
      case "success":
        return message.success({
          content: info,
          icon: <CheckCircleOutlined className="text-white" />,
          duration: time,
        });
      case "error":
        return message.error({
          content: info || strings.GlobalMessage.Error,
          icon: <CloseCircleOutlined className="text-white" />,
          duration: time,
        });
      case "warning":
        return message.warning({
          content: info || strings.GlobalLabels.Error,
          icon: <InfoCircleOutlined className="text-white" />,
          duration: time,
        });
    }
  };

  static paramsChecking = <T extends unknown>(
    value: T | undefined,
    type: "select" | "input",
  ) => {
    switch (type) {
      case "select":
        if (value === strings.GlobalLabels.All) {
          return undefined;
        } else if (typeof value === "number") {
          return value;
        } else if (isEmpty(value)) {
          return undefined;
        } else {
          return value;
        }
      case "input":
        return isEmpty(value) || isUndefined(value) ? undefined : value;
    }
  };

  static avoidDuplicate = <T extends string | number | boolean | Object>(
    baseInfo: T,
    newInfo: typeof baseInfo,
  ) => {
    if (newInfo === baseInfo) {
      return undefined;
    } else {
      return newInfo;
    }
  };

  static areEqual = (arr1: Array<unknown>, arr2: Array<unknown>) => {
    let N = arr1.length || 0;
    let M = arr2.length || 0;

    if (N !== M) return false;

    arr1.sort();
    arr2.sort();

    for (let i = 0; i < N; i++) if (arr1[i] !== arr2[i]) return false;
    return true;
  };

  static createFormRules = (
    stricted: boolean,
    dataType: string,
    message: string,
  ) => {
    return [
      {
        required: stricted,
        type: dataType,
        message: message,
      },
    ] as FormItemProps["rules"];
  };

  static getFormInitialVals = <O extends Object>(data: O, value: keyof O) => {
    if (!isEmpty(data)) {
      return data[value];
    } else {
      return undefined;
    }
  };
}
