import { createTheme } from "@mui/material";
import { ColorVariables } from "../constants/color-variable";

export const themeConfig = createTheme({
  palette: {
    primary: {
      light: ColorVariables.primary.light,
      main: ColorVariables.primary.main,
      dark: ColorVariables.primary.dark,
    },
  },
});
