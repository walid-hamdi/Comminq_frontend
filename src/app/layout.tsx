"use client";
import "./globals.css";
import { darkTheme } from "./theme/themes";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Comminq</title>
        <meta name="description" content="Comminq Communication Platform" />
        <link rel="icon" href="./favicon.ico" />
      </head>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <body>
          <Container>{children}</Container>
        </body>
      </ThemeProvider>
    </html>
  );
}
