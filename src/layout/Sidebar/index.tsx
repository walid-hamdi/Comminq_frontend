import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { FormControlLabel, Switch, Container } from "@mui/material";
import {
  Dashboard,
  Person,
  Mail,
  Notifications,
  Settings,
  Help,
  ExitToApp,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  isLoggedIn: boolean;
}

export default function Sidebar(props: Props) {
  const { window, darkMode, setDarkMode, isLoggedIn } = props;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { label: "", text: "Dashboard", icon: <Dashboard /> },
    { label: "support", text: "Help & Support", icon: <Help /> },
  ];

  if (isLoggedIn) {
    menuItems.splice(1, 0, {
      label: "profile",
      text: "Profile",
      icon: <Person />,
    });
    menuItems.splice(1, 0, {
      label: "messages",
      text: "Messages",
      icon: <Mail />,
    });
    menuItems.splice(3, 0, {
      label: "notification",
      text: "Notifications",
      icon: <Notifications />,
    });
    menuItems.push({ label: "settings", text: "Settings", icon: <Settings /> });
    menuItems.push({ label: "", text: "Logout", icon: <ExitToApp /> });
  } else {
    menuItems.unshift({ label: "login", text: "Login", icon: <Person /> });
  }

  const handleMenuItemClick = (text: string, label: string) => {
    router.replace(label);
    setSelectedItem(text);
  };

  const drawer = (
    <div>
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            key={item.text}
            disablePadding
            selected={selectedItem === item.text}
            onClick={() => handleMenuItemClick(item.text, item.label)}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Container>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              name="darkModeSwitch"
            />
          }
          label=""
        />
      </Container>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
