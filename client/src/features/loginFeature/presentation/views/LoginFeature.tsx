import { BasedViews, IBasedViews } from "@/utils/basedModel/BasedViews";
import { ReactNode } from "react";
import { ILoginFeature, ILoginState } from "../interfaces/IAuthen";
import { AuthenViewModel } from "../viewModel/AuthenViewModel";

export default class LoginFeature extends BasedViews<
  AuthenViewModel,
  ILoginFeature,
  ILoginState
> {
  constructor(props: IBasedViews & ILoginFeature) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  protected override bindViewModel(): void {
    super.bindViewModel();

    this.subscribeToVM(this.viewModel.output.onLoginSuccess, (res) => {});

    //Khi cần gọi API thì dùng this.connnectToVM
  }

  render(): ReactNode {
    return <></>;
  }
}
