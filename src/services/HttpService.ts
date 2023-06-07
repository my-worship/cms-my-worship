import axios, { AxiosRequestConfig } from "axios";

export const RootEndpoint = process.env.REACT_APP_BASE_ENDPOINT;

export class HttpService {
  private baseEndpoint = RootEndpoint;
  private token = localStorage.getItem("token");

  private HeaderSetting(): AxiosRequestConfig {
    return {
      headers: { Authorization: `Bearer ${this.token}` },
    };
  }

  public GET(url: string) {
    return axios.get(this.baseEndpoint + url, this.HeaderSetting());
  }

  public POST<T>(URL: string, data: T) {
    return axios.post(this.baseEndpoint + URL, data, this.HeaderSetting());
  }

  public PATCH(URL: string) {
    return axios.patch(this.baseEndpoint + URL, this.HeaderSetting());
  }
}