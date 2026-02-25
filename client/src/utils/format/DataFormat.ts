import { ISelectOps } from "@/generalComponents/filterComponent/interface/IFilterComponent";
import { FormInstance } from "antd";
import { isEmpty, isUndefined } from "lodash";
import { CachedKeyEnum } from "../enum/CachedKeyEnum";
import { ClientHelpers } from "../helpers";
import { strings } from "../localizedStrings";

export class DataFormat {
  static removeUndefined(obj: Record<string, unknown>) {
    Object.keys(obj).forEach((key) => {
      const v = obj[key];
      if (
        v === undefined ||
        v === null ||
        (typeof v === "string" && v.trim() === "")
      ) {
        delete obj[key];
      }
    });
    return obj;
  }

  static getToken() {
    return localStorage.getItem("isSavedForNextLogin") === "true"
      ? localStorage.getItem(CachedKeyEnum.mainToken)
      : sessionStorage.getItem(CachedKeyEnum.mainToken);
  }

  static clickToCopy = async (value: string) =>
    await window?.navigator?.clipboard
      ?.writeText(value)
      .then(() =>
        ClientHelpers.getMessage(
          `${strings.GlobalMessage.SavedToClipboard} - ${value}`,
          3,
          "success",
        ),
      );

  static handleMultipleChange = (
    selected: Array<unknown>,
    filterKey: string,
    form: FormInstance,
    isSingleItem: boolean = false,
  ) => {
    if (selected?.includes("") && selected.length > 1) {
      const newValues = isEmpty(selected.at(-1))
        ? [""]
        : isSingleItem
          ? [selected?.at(-1)]
          : selected.filter((item) => !isEmpty(item));
      form.setFieldsValue({ [filterKey]: newValues });
    } else if (selected.includes("") && selected.length === 1) {
      form.setFieldsValue({ mySelect: [""] });
    } else if (selected.length === 0) {
      form.setFieldsValue({ [filterKey]: [""] });
    } else {
      form.setFieldsValue({
        [filterKey]: isSingleItem ? [selected?.at(-1)] : selected,
      });
    }
  };

  static getQueryString = (value: Array<string>, key: string) => {
    if (isEmpty(value) || isUndefined(value) || value?.includes("")) {
      return undefined;
    } else {
      value?.forEach((element) =>
        ClientHelpers.paramsChecking(element, "select"),
      );
      return value
        ?.filter((item) => item !== undefined)
        ?.map((child, index) => `${key}[${index}]=${child}`)
        ?.join("&");
    }
  };

  static removeArrayTypeValue = <T extends Object>(obj: T) => {
    Object?.entries(obj)?.forEach(([keys, vals]) => {
      if (Array.isArray(vals)) {
        delete obj[keys as keyof T];
      } else {
        return;
      }
    });
    return obj;
  };

  static includeArray = <T extends unknown>(
    firstArr: Array<T>,
    secondArr: Array<T>,
  ) => {
    return !isEmpty(firstArr?.filter((child) => secondArr?.includes(child)))
      ? firstArr.filter(
          (child) => !isEmpty(child) && !secondArr?.includes(child),
        )
      : undefined;
  };

  static selectFilterOption = <T extends Record<string, unknown>>(
    input: string,
    options: ISelectOps & T,
    customKey?: Array<string>,
  ) => {
    const normalizedInput = input.toLowerCase();

    const hasLabel =
      typeof options?.label === "string" &&
      options.label.toLowerCase().includes(normalizedInput);

    const hasValue =
      options?.value?.toString().toLowerCase() === normalizedInput;

    const hasCustom =
      !!customKey &&
      customKey.length > 0 &&
      customKey.some((key) => {
        const value = options[key];
        return (
          typeof value === "string" &&
          value.toLowerCase().includes(normalizedInput)
        );
      });

    return hasLabel || hasValue || hasCustom;
  };

  static autoCorrectJSON = (jsonString: string): string => {
    let correctedJSON = jsonString
      .replace(/(?<=\{|\,)\s*([\w]+)\s*:/g, '"$1":')
      .replace(/(?<=:)\s*'([^']*)'\s*(?=,|\}|$)/g, ' "$1"');
    correctedJSON = correctedJSON.replace(/,\s*([\]}])/g, "$1");
    return correctedJSON;
  };
}
