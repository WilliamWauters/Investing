import { useRouter } from "next/router";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HouseIcon from "@mui/icons-material/House";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PaidIcon from "@mui/icons-material/Paid";
import AppsIcon from "@mui/icons-material/Apps";

type DrawerNavigationButtonsProps = {
  toggleDrawer: any;
};

const routes = [
  {
    path: "/RealEstate/SimulationList",
    name: "Real Estate",
  },
  {
    path: "/calculators/PaymentInterval",
    name: "Payment Interval",
  },
  {
    path: "/calculators/ExpectedReturns",
    name: "Expected Returns",
  },
];

const DrawerNavigationButtons = ({
  toggleDrawer,
}: DrawerNavigationButtonsProps) => {
  const router = useRouter();
  return (
    <>
      <Box
        sx={{ width: 250, marginTop: 7 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <ListItem
          key="/Home"
          sx={{
            "& .MuiListItemButton-root": {
              bgcolor: router.route === "/" ? "#374151" : "",
            },
          }}
        >
          <ListItemButton
            onClick={() => {
              router.push("/");
            }}
          >
            {getIcon("Home")}
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>
        <Divider />
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
          {routes.map((route) => {
            return (
              <ListItem
                key={route.path}
                sx={{
                  "& .MuiListItemButton-root": {
                    bgcolor: router.route.includes(route.path) ? "#374151" : "",
                  },
                }}
              >
                <ListItemButton
                  onClick={() => {
                    router.push(route.path);
                  }}
                >
                  {getIcon(route.name)}
                  <ListItemText primary={route.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </>
  );
};

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "Home":
      return (
        <ListItemIcon>
          <AppsIcon
            sx={{
              color: "#94a3b8",
            }}
          />
        </ListItemIcon>
      );
      break;
    case "Real Estate":
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

export default DrawerNavigationButtons;
