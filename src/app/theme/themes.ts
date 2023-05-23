"use client";
import { createTheme } from "@mui/material/styles";
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: ['Yeseva One', 'sans-serif'].join(','),
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: ['Yeseva One', 'sans-serif'].join(','),
  },
});
