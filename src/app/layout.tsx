"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProviders } from "./themes/themeProviders";
import { Box } from "@chakra-ui/react";
import ColorModeToggle from "@/components/SwitchMode";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("comminq-token");
    if (token) {
      if (pathname === "/login" || pathname === "/register") {
        router.replace("/");
      }
    } else {
      if (pathname === "/register") {
        return router.replace("/register");
      }
      router.replace("/login");
    }
  }, [pathname, router]);

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
