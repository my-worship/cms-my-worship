import { AxiosResponse } from "axios";

interface rootResponse<T> {
  success: boolean;
  status_code: number;
  status_message: string;
  response_data: T;
}

export interface IResultPaginatedData {
  page: number;
  size: number;
  totalCount: number;
}

export interface RootPaginatedResponse<T> {
  data: T;
  paginatedData: IResultPaginatedData;
}

export type BaseResponse<T> = AxiosResponse<rootResponse<T>>;
