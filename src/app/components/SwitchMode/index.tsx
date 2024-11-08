"use client";
import { Button, ButtonProps, useColorMode } from "@chakra-ui/react";
import { BsMoonStarsFill, BsSun } from "react-icons/bs";

export default function ColorModeToggle(props: ButtonProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      aria-label="Toggle Color Mode"
      onClick={toggleColorMode}
      _focus={{ boxShadow: "none" }}
      w="fit-content"
      size={{ base: "sm", md: "md" }}
      {...props}
    >
      {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
    </Button>
  );
}
