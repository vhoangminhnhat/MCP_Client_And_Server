import { DataFormat } from "@/utils/format/DataFormat";
import { NumberFormat } from "@/utils/format/NumberFormat";
import {
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Select,
  TreeSelect,
} from "antd";
import { DataNode } from "antd/es/tree";
import { Component, ReactNode } from "react";
import { IFilterComponent, ISelectOps } from "./interface/IFilterComponent";

export default class FilterComponent<
  T extends Array<IFilterComponent>,
> extends Component<{
  data: T;
  form?: FormInstance;
}> {
  constructor(props: { data: T; form?: FormInstance }) {
    super(props);
  }

  render(): ReactNode {
    const { data, form } = this.props;
    return (
      <>
        {data?.map((item, index) => {
          return (
            <Col
              span={item?.colDefault ? item?.colDefault : 24}
              lg={item?.colLg}
              key={index}
            >
              <div className="truncate">{item?.labelName}</div>
              {item?.filterType === "select-multiple" ? (
                <Form.Item
                  name={item?.filterName}
                  initialValue={item?.defaultValue}
                >
                  <Select
                    mode="multiple"
                    loading={item?.loading || false}
                    disabled={item?.disable ?? false}
                    defaultValue={item?.defaultValue as string[]}
                    showSearch
                    filterOption={(input, option) =>
                      DataFormat.selectFilterOption(
                        input,
                        option as ISelectOps & Record<string, unknown>,
                        item?.customKey || undefined,
                      )
                    }
                    options={item?.options as ISelectOps[]}
                    placeholder={item?.placeholder}
                    maxTagCount={"responsive"}
                    onChange={(selected) => {
                      if (item?.onChange) {
                        item?.onChange(selected);
                      } else {
                        DataFormat.handleMultipleChange(
                          selected,
                          item?.filterName,
                          form!,
                        );
                      }
                    }}
                  />
                </Form.Item>
              ) : item?.filterType === "input" ? (
                <Form.Item name={item?.filterName}>
                  <Input
                    style={{ width: "100%" }}
                    disabled={item?.disable ?? false}
                    placeholder={item?.placeholder}
                    prefix={item?.prefixIcon}
                    maxLength={!!item?.maxLength ? item?.maxLength : undefined}
                  />
                </Form.Item>
              ) : item?.filterType === "select" ? (
                <Form.Item name={item?.filterName}>
                  <Select
                    defaultValue={item?.defaultValue}
                    showSearch
                    loading={item?.loading || false}
                    disabled={item?.disable ?? false}
                    styles={{
                      popup: {
                        root: {
                          maxHeight: 400,
                          overflow: "auto",
                        },
                      },
                    }}
                    filterOption={(input, option) =>
                      DataFormat.selectFilterOption(
                        input,
                        option as ISelectOps & Record<string, unknown>,
                        item?.customKey || undefined,
                      )
                    }
                    options={item?.options as ISelectOps[]}
                    onChange={(value) =>
                      !!item?.onChange ? item?.onChange(value) : null
                    }
                  />
                </Form.Item>
              ) : item?.filterType === "range-date" ? (
                <Form.Item name={item?.filterName}>
                  <DatePicker.RangePicker
                    style={{ width: "100%" }}
                    allowClear={false}
                    disabled={item?.disable ?? false}
                    defaultValue={item?.defaultRangeDay}
                    onChange={(value) =>
                      !!item?.onChange ? item?.onChange(value) : null
                    }
                    format={"DD/MM/YYYY"}
                  />
                </Form.Item>
              ) : item?.filterType === "price-number" ? (
                <Form.Item
                  name={item?.filterName}
                  initialValue={item?.defaultValue}
                >
                  <InputNumber<number>
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    type="tel"
                    parser={(value) =>
                      value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                    }
                    onKeyDown={NumberFormat.handleKeyDown}
                    placeholder={item?.placeholder}
                    className="w-full"
                    suffix={
                      item?.needCurrency === true ? (
                        <span className="font-medium text-green-700">VND</span>
                      ) : (
                        <></>
                      )
                    }
                  />
                </Form.Item>
              ) : (
                <Form.Item name={item?.filterName}>
                  <TreeSelect
                    style={{ width: "100%" }}
                    disabled={item?.disable ?? false}
                    defaultValue={item?.defaultValue}
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
                    treeData={item?.options as DataNode[]}
                    placeholder={item?.placeholder}
                    treeDefaultExpandAll
                  />
                </Form.Item>
              )}
            </Col>
          );
        })}
      </>
    );
  }
}
