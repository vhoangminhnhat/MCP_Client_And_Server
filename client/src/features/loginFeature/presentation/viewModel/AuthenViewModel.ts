import { BasedViewModel } from "appCore/basedModel/BasedViewModel";
import { Error } from "appCore/basedModel/basedApiModel/BasedApiResponseModel";
import { BehaviorSubject } from "rxjs";
import { injectable } from "tsyringe";
import { AuthenInjection } from "../../diInjection/AuthenInjection";
import { AuthenEntity } from "../../domain/entities/AuthenEntity";
import { AuthenReponseEntity } from "../../domain/entities/AuthenResponseEntity";
import { AuthenUseCase } from "../../domain/useCases/AuthenUseCase";

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
  public onSignUpSuccess = new BehaviorSubject<AuthenReponseEntity>({});
  public onError = new BehaviorSubject<Error>({});

  [Symbol.dispose](): void {
    this.onLoginSuccess.complete();
    this.onSignUpSuccess.complete();
    this.onError.complete();
  }
}

@injectable()
export class AuthenViewModel extends BasedViewModel<AuthenInput, AuthenOutput> {
  private authenUseCase: AuthenUseCase;

  constructor() {
    super(new AuthenInput(), new AuthenOutput());
    this.authenUseCase = AuthenInjection.getAuthenUseCase();
  }

  protected override transform(): void {
    this.skipFirstInitial(this.input.login, async (body) => {
      this.input.loading.next(true);
      try {
        const response = await this.authenUseCase.login(body);
        if (response?.data && response?.code !== -999) {
          this.output.onLoginSuccess.next(response.data);
        } else {
          this.output.onError.next({
            code: response?.code,
            message: response?.message || "Login failed",
          });
        }
      } catch (error) {
        this.output.onError.next((error || {}) as Error);
      } finally {
        this.input.loading.next(false);
      }
    });

    this.skipFirstInitial(this.input.signUp, async (body) => {
      this.input.loading.next(true);
      try {
        const response = await this.authenUseCase.singUp(body);
        if (response?.data && response?.code !== -999) {
          this.output.onSignUpSuccess.next(response.data);
        } else {
          this.output.onError.next({
            code: response?.code,
            message: response?.message || "Sign up failed",
          });
        }
      } catch (error) {
        this.output.onError.next((error || {}) as Error);
      } finally {
        this.input.loading.next(false);
      }
    });
  }
}
