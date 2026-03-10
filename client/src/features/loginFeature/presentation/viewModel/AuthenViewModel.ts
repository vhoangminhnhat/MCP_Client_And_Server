import { Error } from "@/api/basedApiModel/BasedApiResponseModel";
import { BasedViewModel } from "@/utils/basedModel/BasedViewModel";
import { BehaviorSubject } from "rxjs";
import { injectable } from "tsyringe";
import { AuthenEntity } from "../../domain/entities/AuthenEntity";
import { AuthenReponseEntity } from "../../domain/entities/AuthenResponseEntity";

export class AuthenInput implements Disposable {
  public loading = new BehaviorSubject<boolean>(false);
  public login = new BehaviorSubject<AuthenEntity>({});
  public signUp = new BehaviorSubject<AuthenEntity>({});

  [Symbol.dispose](): void {
    this.loading.complete();
    this.login.complete();
    this.signUp.complete();
  }
}

export class AuthenOutput implements Disposable {
  public onLoginSuccess = new BehaviorSubject<AuthenReponseEntity>({});
  public onSignUpSuccess = new BehaviorSubject<string>("");
  public onError = new BehaviorSubject<Error>({});

  [Symbol.dispose](): void {
    this.onLoginSuccess.complete();
    this.onSignUpSuccess.complete();
    this.onSignUpSuccess.complete();
  }
}

@injectable()
export class AuthenViewModel extends BasedViewModel<AuthenInput, AuthenOutput> {
  constructor() {
    super(new AuthenInput(), new AuthenOutput());
  }

  protected override transform(): void {
    this.skipFirstInitial(this.input.login, async (body) => {});
  }
}
