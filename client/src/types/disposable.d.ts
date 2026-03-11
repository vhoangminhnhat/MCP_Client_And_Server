interface SymbolConstructor {
  readonly dispose: symbol;
}

interface Disposable {
  [Symbol.dispose](): void;
}
