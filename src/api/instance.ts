/* eslint-disable no-debugger */

import axios, {
  AxiosDefaults,
  AxiosInterceptorManager,
  AxiosResponse,
  AxiosRequestConfig as _RequestConfig
} from 'axios';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AxiosPromise<T = any> extends Promise<T> {}

const instance = axios.create({
  timeout: 10 * 1000,
  baseURL:
    process.env.REACT_APP_API_BASE_URL ??
    window.location.protocol + '//' + window.location.hostname + ':5001/'
});

type AxiosRequestConfig<D = any> = _RequestConfig<D> & {
  // 是否展示loading
  isLoading?: boolean;
  // 是否展示错误提示
  showErrorTips?: boolean;
  // 上传oss类型
  isUploadOss?: boolean;
  // 重试次数
  __retryCount?: number;
};
export type RequestConfig = AxiosRequestConfig;

type AxiosResData<T = any> = [boolean, T];

export interface AxiosInstance {
  defaults: AxiosDefaults;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<
      AxiosResponse<{
        [x: string]: any;
        data: any;
        message: string;
        code?: number;
      }>
    >;
  };
  getUri(config?: AxiosRequestConfig): string;
  request<T = any, R = AxiosResData<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
  get<T = any, R = AxiosResData<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  delete<T = any, R = AxiosResData<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  head<T = any, R = AxiosResData<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  options<T = any, R = AxiosResData<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  post<T = any, R = AxiosResData<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  put<T = any, R = AxiosResData<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  patch<T = any, R = AxiosResData<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  postForm<T = any, R = AxiosResData<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  putForm<T = any, R = AxiosResData<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  patchForm<T = any, R = AxiosResData<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
}
export default instance as unknown as AxiosInstance;
