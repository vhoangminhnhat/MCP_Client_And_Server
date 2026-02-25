import { NumberFormat } from "@/utils/format/NumberFormat";
import { ClientHelpers } from "@/utils/helpers";
import { Col, Form, Input, InputNumber, Select, TreeSelect } from "antd";
import { DataNode } from "antd/es/tree";
import dayjs from "dayjs";
import { isEmpty, isUndefined } from "lodash";
import { Component, ReactNode } from "react";
import {
  IMultiSelectOps,
  ISelectOps,
} from "../filterComponent/interface/IFilterComponent";
import { IDetailActions } from "./interface/IActionComponent";

export default class ActionComponent<
  T extends Record<string, unknown>,
> extends Component<IDetailActions<T>> {
  constructor(props: IDetailActions<T>) {
    super(props);
  }

  render(): ReactNode {
    const { data, info } = this.props;
    const { createFormRules, getFormInitialVals } = ClientHelpers;

    return (
      <>
        {data
          ?.filter((childEle) => !isUndefined(childEle) && Boolean)
          ?.map((item, index) => {
            return (
              <Col
                span={24}
                key={`${item?.name}-${index}`}
                lg={!!item?.colLg ? item?.colLg : 24}
              >
                <Form.Item
                  key={item?.name}
                  name={item?.name}
                  label={item?.label}
                  rules={
                    item?.rules ||
                    createFormRules(
                      item?.createFormRules?.stricted || false,
                      item?.createFormRules?.type || "string",
                      item?.createFormRules?.message || "",
                    )
                  }
                  initialValue={
                    !item?.initialVals
                      ? getFormInitialVals<T>(info, item?.detailKey as keyof T)
                      : item?.initialVals
                  }
                >
                  {item?.type === "date" ? (
                    <span style={{ fontWeight: "bold" }}>
                      {dayjs(item?.initialVals as string).format(
                        "DD/MM/YYYY HH:mm:ss",
                      )}
                    </span>
                  ) : item?.type === "input" &&
                    item?.pointerEvents === false ? (
                    <Input
                      placeholder={item?.placeholder}
                      className="rounded-lg"
                      id={`action-${item}-${index}`}
                    />
                  ) : item?.forPhone === true && item?.type === "input" ? (
                    <Input
                      placeholder={item?.placeholder}
                      className="rounded-lg border-gray-300"
                      maxLength={10}
                      prefix={item?.icon}
                      id={`action-${item}-${index}`}
                    />
                  ) : item?.type === "input-number" ? (
                    <InputNumber<number>
                      min={
                        !isEmpty(item?.numberRange) && !!item?.numberRange
                          ? item?.numberRange?.[0]
                          : undefined
                      }
                      type="tel"
                      max={
                        !isEmpty(item?.numberRange) &&
                        !!item?.numberRange &&
                        item?.numberRange?.length > 1
                          ? item?.numberRange[1]
                          : undefined
                      }
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) =>
                        value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                      }
                      suffix={
                        item?.needCurrency === true ? (
                          <span className="font-medium text-green-700">
                            VND
                          </span>
                        ) : (
                          <></>
                        )
                      }
                      onKeyDown={NumberFormat.handleKeyDown}
                      readOnly={item?.pointerEvents}
                      defaultValue={item?.initialVals as number}
                      style={{ width: "100%" }}
                      id={`action-${item}-${index}`}
                    />
                  ) : item?.type === "input" && item?.pointerEvents === true ? (
                    <Input
                      placeholder={item?.placeholder}
                      readOnly={!isEmpty(info)}
                      className="rounded-lg border-gray-300"
                    />
                  ) : item?.type === "select" ? (
                    <Select
                      id={`action-${item}-${index}`}
                      loading={item?.loading || false}
                      defaultValue={getFormInitialVals<T>(
                        info,
                        item?.detailKey as keyof T,
                      )}
                      allowClear={item?.allowClear === true ? true : false}
                      onSelect={(value) =>
                        item?.onSelect && item?.onSelect!(value)
                      }
                      onChange={(value) =>
                        item?.onChange && item?.onChange!(value)
                      }
                      placeholder={item?.placeholder}
                      options={item?.options as ISelectOps[]}
                      showSearch
                      disabled={item?.disableForSelect === true ? true : false}
                      style={{
                        pointerEvents:
                          item?.pointerEvents === true ? "none" : "all",
                      }}
                      filterOption={(inputValue, option) => {
                        if (typeof option?.label === "string") {
                          return option?.label
                            .toLowerCase()
                            .includes(inputValue.toLowerCase());
                        }
                        return false;
                      }}
                    />
                  ) : item?.type === "tree-select" ? (
                    <TreeSelect
                      id={`action-${item}-${index}`}
                      style={{ width: "100%" }}
                      loading={item?.loading || false}
                      showSearch
                      filterTreeNode={(inputValue, treeNode) => {
                        if (typeof treeNode.title === "string") {
                          return treeNode.title
                            .toLowerCase()
                            .includes(inputValue.toLowerCase());
                        }
                        return false;
                      }}
                      onSelect={(value) =>
                        item?.onSelect && item?.onSelect!(value)
                      }
                      onChange={(value) =>
                        item?.onChange && item?.onChange!(value)
                      }
                      treeData={item?.options as DataNode[]}
                      placeholder={item?.placeholder}
                      treeDefaultExpandAll
                    />
                  ) : item?.type === "password" ? (
                    <Input.Password
                      id={`action-${item}-${index}`}
                      placeholder={item?.placeholder}
                      className="rounded-lg border-gray-300"
                    />
                  ) : item?.type === "multi-select" ? (
                    <Select
                      id={`action-${item}-${index}`}
                      mode="multiple"
                      loading={item?.loading || false}
                      allowClear={item?.allowClear === true ? true : false}
                      onSelect={(value) =>
                        item?.onSelect && item?.onSelect!(value)
                      }
                      onChange={(value) =>
                        item?.onChange && item?.onChange!(value)
                      }
                      placeholder={item?.placeholder}
                      options={item?.options as IMultiSelectOps[]}
                      showSearch
                      disabled={item?.disableForSelect === true ? true : false}
                      style={{
                        pointerEvents:
                          item?.pointerEvents === true ? "none" : "all",
                      }}
                    />
                  ) : (
                    <Input.TextArea
                      placeholder={item?.placeholder}
                      style={{
                        overflow: "hidden",
                        pointerEvents:
                          item?.pointerEvents === true ? "none" : "all",
                      }}
                    />
                  )}
                </Form.Item>
              </Col>
            );
          })}
      </>
    );
  }
}
