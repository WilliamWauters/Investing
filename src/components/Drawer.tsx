import { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HouseIcon from "@mui/icons-material/House";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PaidIcon from "@mui/icons-material/Paid";

const Drawer = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const router = useRouter();
  const currentRoute = router.route;
  const toggleDrawer = (open: any) => (event: any) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setShowDrawer(open);
  };

  return (
    <>
      {!showDrawer && (
        <MenuIcon
          sx={{ position: "absolute", right: "5%", top: "3%" }}
          onClick={() => setShowDrawer(true)}
        />
      )}
      <SwipeableDrawer
        PaperProps={{
          sx: {
            backgroundColor: "#1E293B",
            color: "#FFFFFF",
          },
        }}
        anchor="right"
        open={showDrawer}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{ width: 250, marginTop: 2 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List
            sx={{
              "& .MuiListItemButton-root": {
                borderRadius: "5px",
              },
              // hover states
              "& .MuiListItemButton-root:hover": {
                bgcolor: "#374151",
              },
            }}
          >
            {["Housing", "Payment Interval", "Expected Returns"].map(
              (route) => {
                return (
                  <ListItem
                    key={route}
                    sx={{
                      "& .MuiListItemButton-root": {
                        bgcolor: currentRoute.includes(route.replace(/ /g, ""))
                          ? "#374151"
                          : "",
                      },
                    }}
                  >
                    <ListItemButton
                      onClick={() => {
                        router.push(`/${route.replace(/ /g, "")}`);
                      }}
                    >
                      {getIcon(route)}
                      <ListItemText primary={route} />
                    </ListItemButton>
                  </ListItem>
                );
              }
            )}
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "Housing":
      return (
        <ListItemIcon>
          <HouseIcon
            sx={{
              color: "#94a3b8",
            }}
          />
        </ListItemIcon>
      );
      break;
    case "Payment Interval":
      return (
        <ListItemIcon>
          <CalendarMonthIcon
            sx={{
              color: "#94a3b8",
            }}
          />
        </ListItemIcon>
      );
      break;
    case "Expected Returns":
      return (
        <ListItemIcon>
          <PaidIcon
            sx={{
              color: "#94a3b8",
            }}
          />
        </ListItemIcon>
      );
      break;
  }
};

export default Drawer;
