"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import "./globals.css";
import ColorModeToggle from "@/components/SwitchMode";
import { ThemeProviders } from "./themes/themeProviders";
import { Box, CSSReset } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setLoggedIn] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) router.replace("/login");
  }, [isLoggedIn, router]);

  return (
    <html lang="en">
      <head>
        <title>Comminq</title>
        <meta name="description" content="Comminq Communication Platform" />
        <link rel="icon" href="./favicon.ico" />
      </head>
      <body>
        <ThemeProviders>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}
          >
            <main>
              <Box
                position="absolute"
                top={{ base: "4", lg: "6" }}
                right={{ base: "4", lg: "8" }}
              >
                <ColorModeToggle />
              </Box>
              {children}
            </main>
          </GoogleOAuthProvider>
        </ThemeProviders>
      </body>
    </html>
  );
}
