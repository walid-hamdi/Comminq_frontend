"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProviders } from "./themes/themeProviders";
import { Box } from "@chakra-ui/react";
import ColorModeToggle from "@/components/SwitchMode";

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
      <body>
        <ThemeProviders>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}
          >
            <main>
              <Box
                position="absolute"
                top={{ base: "6", lg: "6" }}
                right={{ base: "4", lg: "12" }}
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
