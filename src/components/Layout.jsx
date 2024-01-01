import React from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header></Header>
      <Outlet />
      <footer></footer>
    </ThemeProvider>
  );
}

export default Layout;
