import {
  IMultiSelectOps,
  ISelectOps,
  ITreeSelectOps,
} from "@/generalComponents/filterComponent/interface/IFilterComponent";
import { Rule } from "antd/es/form";
import { ReactNode } from "react";

export type DetailKey<T extends Object> = keyof T;

export interface IDetailActions<T extends Object> {
  data: IActionComponent<T>[];
  info: T;
}

export interface IActionComponent<T extends Object> {
  name: string;
  detailKey?: keyof T;
  label: string;
  type:
    | "input"
    | "select"
    | "text-area"
    | "input-number"
    | "tree-select"
    | "multi-select"
    | "dynamic-form"
    | "date"
    | "img"
    | "password";
  forPhone?: boolean;
  allowClear?: boolean;
  loading?: boolean;
  numberRange?: Array<number>;
  onSelect?: (value?: unknown) => Promise<void> | void;
  onChange?: (value?: unknown) => Promise<void> | void;
  initialVals?: string | number | boolean | Array<any>;
  disableForSelect?: boolean;
  icon?: ReactNode;
  pointerEvents?: boolean;
  needCurrency?: boolean;
  rules?: Array<Rule>;
  createFormRules?: {
    stricted: boolean;
    type: string;
    message: string;
  };
  placeholder?: string;
  options?: ISelectOps[] | ITreeSelectOps[] | IMultiSelectOps[];
  colLg?: number;
}
