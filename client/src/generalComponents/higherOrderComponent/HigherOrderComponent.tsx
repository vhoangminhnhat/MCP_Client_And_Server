import { IBasedViews } from "@/utils/basedModel/BasedViews";
import { Form } from "antd";
import { ElementType } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "reflect-metadata";

export const higherOrderComponent = (
  Component: ElementType,
  props?: IBasedViews,
) => {
  return function WrappedComponent(customProps: unknown) {
    const location = useLocation();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    return (
      <Component
        {...(customProps as unknown as Record<string, unknown>)}
        {...props}
        location={location}
        navigate={navigate}
        form={form}
      />
    );
  };
};
