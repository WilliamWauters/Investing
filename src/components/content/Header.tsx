import { Box, Typography } from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type HeaderProps = {
  text: string;
};

const Header = ({ text }: HeaderProps) => {
  return (
    <>
      <Box
        sx={{
          py: 1,
          my: 2,
          backgroundColor: "#1E293B",
          color: "#CBD5E1",
          borderRadius: "5px",
        }}
      >
        <Typography
          variant="h6"
          align="center"
          sx={{ width: "100%", fontWeight: "bold", color: "#38BDF8" }}
        >
          {text}
        </Typography>
      </Box>
    </>
  );
};

export default Header;
