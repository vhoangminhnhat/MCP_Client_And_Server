import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../stores/Store";

interface IAppStateProvider {
  children: ReactNode;
}

export default function AppStateProvider({
  children,
}: IAppStateProvider) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}