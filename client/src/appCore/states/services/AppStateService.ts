import { store } from "../stores/Store";

export class AppStateService {
  static dispatch = store.dispatch;
  static getState = store.getState;
}
