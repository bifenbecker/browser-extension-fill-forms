/* eslint-disable no-undef */
import React, { useEffect } from "react";
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
  useEffect(() => {
    chrome.storage.local.set({ key: "test" }).then(() => console.log("GOOD"));
    chrome.storage.sync.set({ key: "test" }).then(() => console.log("GOOD"));
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Popup />
    </ThemeProvider>
  );
}

export default App;
