import dayjs from "dayjs";
import { ReactNode } from "react";

export interface ISelectOps {
  label: string;
  value: unknown;
}

export interface ITreeSelectOps {
  title: string;
  value: unknown;
  key: unknown;
  children?: Array<{
    title: ITreeSelectOps["title"];
    value: ITreeSelectOps["value"];
    key: ITreeSelectOps["key"];
  }>;
}

export interface IMultiSelectOps {
  label: string;
  value: unknown;
}
[];

export interface IFilterComponent {
  colLg: number;
  colDefault?: number;
  filterName: string;
  placeholder: string;
  labelName: string;
  maxLength?: number;
  disable?: boolean;
  featureKey?: string;
  filterType: string;
  loading?: boolean;
  defaultValue: unknown | string | string[];
  defaultRangeDay?: [dayjs.Dayjs, dayjs.Dayjs];
  options: ISelectOps[] | ITreeSelectOps[] | [];
  prefixIcon?: ReactNode;
  customKey?: Array<string>;
  rangeNumber?: Array<number>;
  needCurrency?: boolean;
  onChange?: (value?: unknown) => void | Promise<void>;
}
