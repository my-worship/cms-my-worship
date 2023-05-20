import { useSnackbar } from "notistack";

export class UiServices {
  private enqueueSnackbar = useSnackbar();

  public handleSnackbarSuccess(message: string) {
    this.enqueueSnackbar.enqueueSnackbar(message, {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
    });
  }
}
