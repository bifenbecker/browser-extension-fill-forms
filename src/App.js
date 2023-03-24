import React from "react";
// Pages
import Popup from "./pages/Popup";

// MUI
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  status: {
    danger: "red",
  },
});

function App() {
  console.log(theme);
  return (
    <ThemeProvider theme={theme}>
      <Popup />
    </ThemeProvider>
  );
}

export default App;
