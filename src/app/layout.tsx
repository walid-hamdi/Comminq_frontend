"use client";
import "./globals.css";
import { darkTheme, lightTheme } from "./theme/themes";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CustomAppBar from "@/layout/AppBar";
import LoginWithGoogle from "@/components/Login";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(true);
  const [profile, setProfile] = useState<null | any>([]);

  useEffect(() => {
    if (!profile) return;
  }, [profile]);

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
            {!profile ? (
              <LoginWithGoogle profile={profile} setProfile={setProfile} />
            ) : (
              <>
                <CustomAppBar
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  setProfile={setProfile}
                  profile={profile}
                />
                <Container>{children}</Container>
              </>
            )}
          </GoogleOAuthProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
