import { ClientContext } from "@/context/AuthenticationContext";
import { ContextType } from "react";
import { Observable, skip, Subscription } from "rxjs";

export abstract class BasedViewModel<
  Input extends Disposable,
  Output extends Disposable,
> implements Disposable {
  input: Input;
  output: Output;
  context?: ContextType<typeof ClientContext>;

  subscriptions: Subscription = new Subscription();

  constructor(input: Input, output: Output) {
    this.input = input;
    this.output = output;
    this.transform();
  }

  protected skipFirstInitial<T>(
    observable: Observable<T>,
    next: (value: T) => void,
  ): void {
    const sub = observable.pipe(skip(1)).subscribe(next);
    this.subscriptions.add(sub);
  }

  protected transform(): void {}

  [Symbol.dispose](): void {
    this.input[Symbol.dispose]();
    this.output[Symbol.dispose]();
    this.subscriptions.unsubscribe();
  }
}
