"use client";
import Sidebar from "@/layout/Sidebar";
import "./globals.css";
import { darkTheme, lightTheme } from "./theme/themes";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <html lang="en">
      <head>
        <title>Comminq</title>
        <meta name="description" content="Comminq Communication Platform" />
        <link rel="icon" href="./favicon.ico" />
      </head>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <body>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}
          >
            <Container>
              <Sidebar
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                isLoggedIn={false}
              />
              {children}
            </Container>
          </GoogleOAuthProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
