import axios, { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import swall from "sweetalert";
import AuthServices from "./AuthService";

export default class ErrorService {
  private enqueueSnackbar = useSnackbar();
  private authService = new AuthServices();

  private handleSnackbar(message: string) {
    this.enqueueSnackbar.enqueueSnackbar(message, { variant: "error" });
  }

  private handleSnackbarSuccess(message: string) {
    this.enqueueSnackbar.enqueueSnackbar(message, { variant: "success" });
  }

  public fetchApiError(error: AxiosError<any>) {
    let message;
    if (error?.response?.status === 401) {
      this.authService.Logout().then();
    } else {
      if (axios.isAxiosError(error) && error.response) {
        message = error?.response?.data?.message
          ? error.response.data.message
          : "Terjadi Kesalahan Pada Sistem";
      } else message = String(error);
      return this.handleSnackbar(message);
    }
  }

  public fetchApiSuccess(message: string) {
    return this.handleSnackbarSuccess(message ? message : "Success");
  }

  public swallApiError(error?: Error) {
    let message;
    if (axios.isAxiosError(error) && error.response) {
      message = error.response.data.message ?? "Terjadi Kesalahan Pada Sistem";
    } else message = String(error);
    swall("Gagal", message, "error").then();
  }
}
