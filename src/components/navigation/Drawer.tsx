import { useState } from "react";
import { IconButton, SwipeableDrawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerNavigationButtons from "./DrawerNavigationButtons";

const Drawer = () => {
  const [showDrawer, setShowDrawer] = useState(false);
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
        <IconButton
          sx={{
            "&:hover": { bgcolor: "#374151" },
            position: "absolute",
            right: "4%",
            top: "2%",
            color: "white",
          }}
          onClick={() => setShowDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
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
        <DrawerNavigationButtons toggleDrawer={toggleDrawer} />
      </SwipeableDrawer>
    </>
  );
};

export default Drawer;
