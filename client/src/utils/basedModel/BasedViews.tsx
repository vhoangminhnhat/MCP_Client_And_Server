import { ClientContext } from "@/context/AuthenticationContext";
import { Component, ContextType } from "react";
import { Params } from "react-router-dom";
import { NextObserver, Observable } from "rxjs";
import { DependencyInjection } from "../di/DependecyInjection";
import { BasedViewModel } from "./BasedViewModel";

export interface IBasedViews {
  token: string | symbol;
  addtionalProps?: unknown;
  sharedVM?: BasedViewModel<Disposable, Disposable>;
  routeParams?: Readonly<Params<string>>;
}

export abstract class BasedViews<
  VM extends BasedViewModel<Disposable, Disposable>,
  S extends Object,
  SS extends Object,
> extends Component<IBasedViews & S, SS> {
  static contextType = ClientContext;
  declare context: ContextType<typeof ClientContext>;
  viewModel: VM;

  constructor(props: IBasedViews & S) {
    super(props);
    this.viewModel = DependencyInjection.lateResolution<VM>(this.props.token);
    this.bindViewModel = this.bindViewModel.bind(this);
  }

  protected subscribeToVM<T>(
    observable: Observable<T>,
    next: (value: T) => void,
  ) {
    return observable.subscribe(next).add(this.viewModel.subscriptions);
  }

  protected connectToVM<T>(nextObserver: NextObserver<T>, nextValue: T) {
    return nextObserver.next(nextValue);
  }

  protected bindViewModel(): void {
    this.viewModel.context = this.context;
  }

  protected dispose(): void {}

  componentDidMount(): void {
    this.bindViewModel();
  }

  componentWillUnmount(): void {
    this.dispose();
    if (typeof this.viewModel[Symbol.dispose] === "function") {
      this.viewModel[Symbol.dispose]();
    }
  }
}
