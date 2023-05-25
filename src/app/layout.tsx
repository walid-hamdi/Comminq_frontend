"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ColorModeScript } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import "./globals.css";
import { Providers, theme } from "./providers";

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
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />

        <Providers>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}
          >
            <main>{children}</main>
          </GoogleOAuthProvider>
        </Providers>
      </body>
    </html>
  );
}
