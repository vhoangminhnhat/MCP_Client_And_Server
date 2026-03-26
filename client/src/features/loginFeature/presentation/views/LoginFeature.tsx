import { BasedViews, IBasedViews } from "appCore/basedModel/BasedViews";
import { Button, Card, Checkbox, Form, Input, Space, Typography } from "antd";
import { ReactNode } from "react";
import { productCache } from "utils/cache/ProductCache";
import { CachedKeyEnum } from "utils/enum/CachedKeyEnum";
import { ClientHelpers } from "utils/helpers";
import { ILoginFeature, ILoginState } from "../interfaces/IAuthen";
import { AuthenViewModel } from "../viewModel/AuthenViewModel";

interface IAuthFormValue {
  email: string;
  password: string;
  remember?: boolean;
}

export default class LoginFeature extends BasedViews<
  AuthenViewModel,
  ILoginFeature,
  ILoginState
> {
  constructor(props: IBasedViews & ILoginFeature) {
    super(props);
    this.state = {
      loading: false,
      mode: "login",
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
  }

  protected override bindViewModel(): void {
    super.bindViewModel();

    this.subscribeToVM(this.viewModel.input.loading, (loading) => {
      this.setState({ loading });
    });

    this.subscribeToVM(this.viewModel.output.onLoginSuccess, (res) => {
      if (!res?.accessToken) return;

      const isRemember = localStorage.getItem("isSavedForNextLogin") === "true";

      if (isRemember) {
        localStorage.setItem(CachedKeyEnum.mainToken, res.accessToken);
        sessionStorage.removeItem(CachedKeyEnum.mainToken);
      } else {
        sessionStorage.setItem(CachedKeyEnum.mainToken, res.accessToken);
        localStorage.removeItem(CachedKeyEnum.mainToken);
      }

      productCache.saveCache({
        key: "user",
        product: res.user || {},
        needExpired: false,
      });

      ClientHelpers.getMessage("Login successfully", 2, "success");
      this.props.navigate("/chat");
    });

    this.subscribeToVM(this.viewModel.output.onSignUpSuccess, () => {
      ClientHelpers.getMessage(
        "Sign up successfully. Please login",
        2,
        "success",
      );
      this.setState({ mode: "login" });
    });

    this.subscribeToVM(this.viewModel.output.onError, (error) => {
      if (error?.message) {
        ClientHelpers.getMessage(error.message, 2, "error");
      }
    });
  }

  private onSubmit(values: IAuthFormValue) {
    const payload = {
      email: values.email,
      password: values.password,
    };

    localStorage.setItem(
      "isSavedForNextLogin",
      values.remember ? "true" : "false",
    );

    if (this.state.mode === "login") {
      this.connectToVM(this.viewModel.input.login, payload);
      return;
    }

    this.connectToVM(this.viewModel.input.signUp, payload);
  }

  private toggleMode() {
    this.setState((prev) => ({
      mode: prev.mode === "login" ? "signUp" : "login",
    }));
  }

  render(): ReactNode {
    const { loading, mode } = this.state;

    return (
      <section className="h-screen flex items-center justify-center bg-slate-100 p-4">
        <Card style={{ width: 420 }}>
          <Typography.Title level={3} className="!mb-2">
            {mode === "login" ? "Sign in" : "Create account"}
          </Typography.Title>
          <Typography.Text type="secondary">
            {mode === "login"
              ? "Access CMS and MCP chat workspace"
              : "Create a new account to access CMS"}
          </Typography.Text>

          <Form<IAuthFormValue>
            layout="vertical"
            className="mt-4"
            onFinish={this.onSubmit}
            initialValues={{ remember: true }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Valid email is required",
                },
              ]}
            >
              <Input placeholder="name@company.com" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, min: 6, message: "At least 6 characters" },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            {mode === "login" ? (
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me on this device</Checkbox>
              </Form.Item>
            ) : null}

            <Space direction="vertical" size={8} className="w-full">
              <Button type="primary" htmlType="submit" loading={loading} block>
                {mode === "login" ? "Login" : "Sign up"}
              </Button>
              <Button type="link" onClick={this.toggleMode} className="!px-0">
                {mode === "login"
                  ? "Need an account? Sign up"
                  : "Already have account? Login"}
              </Button>
            </Space>
          </Form>
        </Card>
      </section>
    );
  }
}
