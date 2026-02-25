import { DataFormat } from "@/utils/format/DataFormat";
import ModelConverter from "@/utils/modelConverter";
import axios from "axios";
import { BasedApiResponseModel } from "../basedApiModel/BasedApiResponseModel";
import IApiClient from "./interface/IApiClient";

const serializeParams = (params: Record<string, any>): string => {
  const parts: string[] = [];
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v === undefined || v === null) return;
        parts.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`,
        );
      });
    } else {
      parts.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
      );
    }
  });
  return parts.join("&");
};

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL!,
  timeout: 300000,
  paramsSerializer: {
    serialize: serializeParams,
  } as any,
});

api.interceptors.request.use(
  (config) => {
    const token = DataFormat.getToken();
    const request = config;

    if (token) {
      request.headers = {
        ...(request.headers || {}),
        Authorization: `Bearer ${token}`,
      } as any;
    }

    //for ngrok
    if (
      request?.url?.includes("ngrok-free.app") ||
      request?.url?.includes("ngrok-free.dev")
    ) {
      request.headers!["ngrok-skip-browser-warning"] = "69420";
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Return JSON data
    if (response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    const token = DataFormat.getToken();
    const err = error.response || error;
    if (error?.response?.status === 403) {
      if (!!token) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(err.data);
  },
);

class AxiosClient implements IApiClient {
  async post<T extends Object>(
    path: string,
    data: Map<string, any> | any = {},
    config?: Map<string, any> | any,
  ): Promise<BasedApiResponseModel<T>> {
    let response = await api.post(path, data, config);
    return ModelConverter.decode(response, BasedApiResponseModel<T>);
  }

  async get<T extends Object>(
    path: string,
    data: Map<string, any> | any = {},
  ): Promise<BasedApiResponseModel<T>> {
    let response = await api.get(path, {
      params: data,
    });
    return ModelConverter.decode(response, BasedApiResponseModel<T>);
  }

  async getBlob(path: string, data: any = {}, config?: any): Promise<Blob> {
    const response = await api.get(path, {
      params: data,
      responseType: "blob",
      ...(config || {}),
    });
    return response as unknown as Blob;
  }

  async delete<T extends Object>(
    path: string,
    data: Map<string, any> | any = {},
  ): Promise<BasedApiResponseModel<T>> {
    let response = await api.delete(path, {
      params: data,
    });
    return ModelConverter.decode(response, BasedApiResponseModel<T>);
  }

  async put<T extends Object>(
    path: string,
    data: Map<string, any> | any = {},
    config?: Map<string, any> | any,
  ): Promise<BasedApiResponseModel<T>> {
    let response = await api.put(path, data, config);
    return ModelConverter.decode(response, BasedApiResponseModel<T>);
  }

  async patch<T extends Object>(
    path: string,
    data: Map<string, any> | any = {},
    config?: Map<string, any> | any,
  ): Promise<BasedApiResponseModel<T>> {
    let response = await api.patch(path, data, config);
    return ModelConverter.decode(response, BasedApiResponseModel<T>);
  }

  async export(path: string, data: Map<string, any> | any = {}): Promise<any> {
    const response = await api.get(path, {
      params: data,
      responseType: "arraybuffer",
    });
    return response;
  }
}

export default new AxiosClient();
