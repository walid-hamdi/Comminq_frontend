import { Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import GoogleAuthProvider from "./GoogleAuthProvider";
import ColorModeToggle from "./components/SwitchMode";
import { ThemeProviders } from "./themes/themeProviders";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "comminq - Learning Fun",
  description:
    "Fun language learning through conversations, games, and prizes. Join us to enhance your language skills in an enjoyable way.",
  keywords:
    "language learning, conversations, games, prizes, language skills, enjoyable learning, comminq",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
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
