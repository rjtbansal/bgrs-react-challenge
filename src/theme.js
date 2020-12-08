import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({

  palette: {
    background: {
      default: "#DCDCDC"
    }
  },
  typography: {
    fontSize: 14,

    h1: {
      fontSize: 20,
      fontWeight: "700",
    },
    h2: {
      fontSize: 18,
      fontWeight: "bold",
    },
    h3: {
      fontSize: 16,
      fontWeight: "bold",
    },
    h4: {
      fontSize: 14,
    },
    h5: {
      fontSize: 12,
      fontWeight: "bold",
    },
    body1: {
      fontSize: 14,
    },
    subtitle1: {
      fontSize: 16,
    },
    subtitle2: {
      fontSize: 14,
    },
  }
});

export default theme;
