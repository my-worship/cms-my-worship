import { AxiosResponse } from "axios";

interface rootResponse<T> {
  success: boolean;
  status_code: number;
  status_message: string;
  response_data: T;
}

interface rootResponsePaginated<T> {
  success: boolean;
  status_code: number;
  status_message: string;
  response_data: T;
  pagination_data: IResultPaginatedData;
}

export interface IResultPaginatedData {
  page: number;
  size: number;
  total_data: number;
}

export interface RootPaginatedResponse<T> {
  response_data: T;
  paginatedData: IResultPaginatedData;
}

export type BaseResponse<T> = AxiosResponse<rootResponse<T>>;
export type BaseResponsePaginated<T> = AxiosResponse<rootResponsePaginated<T>>;
