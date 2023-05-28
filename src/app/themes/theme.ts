import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {
  gray: {
    50: "#f9f9f9",
    100: "#ededed",
    200: "#d3d3d3",
    300: "#b3b3b3",
    400: "#a0a0a0",
    500: "#898989",
    600: "#6c6c6c",
    700: "#202020",
    800: "#121212",
    900: "#111",
  },
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

// const colors = {
//   gray: {
//     50: "#F4F4F4",
//     100: "#E0E0E0",
//     200: "#C7C7C7",
//     300: "#AFAFAF",
//     400: "#989898",
//     500: "#7D7D7D",
//     600: "#646464",
//     700: "#4A4A4A",
//     800: "#303030",
//     900: "#1A1A1A",
//   },
//   brand: {
//     900: "#1B1E3F",
//     800: "#253265",
//     700: "#2E3B8C",
//   },
// };

const theme = extendTheme({ config, colors });

export default theme;
