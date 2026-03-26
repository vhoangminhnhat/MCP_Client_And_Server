export class RouteModuleEntity {
  key?: string;
  path?: string;
  component?: unknown;
  token?: string | symbol;
  additionalProps?: unknown;
  isPrivate?: boolean = true;

  constructor(data?: Partial<RouteModuleEntity>) {
    this.key = data?.key;
    this.path = data?.path;
    this.component = data?.component;
    this.token = data?.token;
    this.additionalProps = data?.additionalProps;
    this.isPrivate = data?.isPrivate;
  }
}
