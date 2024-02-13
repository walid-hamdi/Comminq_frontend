import {
  Box,
  BoxProps,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  Icon,
  IconButton,
  Link,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode, ReactText } from "react";
import { FaHome } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

import Image from "next/image";
import { IconType } from "react-icons";

import { usePathname } from "next/navigation";
import UserMenu from "../UserMenu";

interface LinkItemProps {
  name: string;
  icon: IconType;
  route: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FaHome, route: "/" },
];

export default function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        justifyContent="space-between"
        mx="8"
        pr="4"
      >
        <Flex alignItems="center" align="center" gap="1">
          <Image
            src="/assets/logo.png"
            alt="Comminq logo"
            width={60}
            height={60}
          />
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Comminq
          </Text>
        </Flex>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} route={link.route}>
          {link.name}
        </NavItem>
      ))}
      <UserMenu />
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  route: string;
}

const NavItem = ({ icon, children, route, ...rest }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === route;

  return (
    <Link style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
      <Flex
        align="center"
        p="2"
        mx="4"
        my="2"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: !isActive && "gray.700",
          color: !isActive && "white",
        }}
        {...(isActive && {
          bg: "yellow.500",
          color: "gray.900",
        })}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: !isActive && "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderTopWidth="1px"
      borderTopColor={useColorModeValue("gray.200", "gray.700")}
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Flex alignItems="center">
        <Image
          src="/assets/logo.png"
          alt="Comminq logo"
          width={60}
          height={60}
        />
        <Text fontSize="2xl" fontWeight="bold">
          Comminq
        </Text>
      </Flex>
    </Flex>
  );
};
