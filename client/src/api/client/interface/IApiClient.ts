import { BasedApiResponseModel } from "@/api/basedApiModel/BasedApiResponseModel";

export default interface IApiClient {
  post<T extends Object>(
    path: string,
    data: Map<string, any> | any,
    config?: Map<string, any> | any,
  ): Promise<BasedApiResponseModel<T>>;

  get<T extends Object>(
    path: string,
    data: Map<string, any> | any,
  ): Promise<BasedApiResponseModel<T>>;

  getBlob(
    path: string,
    data: Map<string, any> | any,
    config?: Map<string, any> | any,
  ): Promise<Blob>;

  delete<T extends Object>(
    path: string,
    data: Map<string, any> | any,
  ): Promise<BasedApiResponseModel<T>>;

  put<T extends Object>(
    path: string,
    data: Map<string, any> | any,
  ): Promise<BasedApiResponseModel<T>>;
}
