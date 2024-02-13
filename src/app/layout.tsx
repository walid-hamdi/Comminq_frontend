import { Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import GoogleAuthProvider from "./GoogleAuthProvider";
import ColorModeToggle from "./components/SwitchMode";
import { ThemeProviders } from "./themes/themeProviders";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comminq",
  description: "Communication platform.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" />
      </head>
      <body>
        <GoogleAuthProvider>
          <ThemeProviders>
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
          </ThemeProviders>
        </GoogleAuthProvider>
      </body>
    </html>
  );
}
