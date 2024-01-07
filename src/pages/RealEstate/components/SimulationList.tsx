import React from "react";
import { Box } from "@mui/material";

export default function SimulationList() {
  return (
    <>
      <Box
        sx={{
          py: 1,
          px: 2,
          mx: 2,
          my: 1,
          border: 1,
          borderRadius: "5px",
          borderColor: "#1E293B",
          "&:hover": {
            borderColor: "primary.main",
          },
        }}
      >
        Simulation 1
      </Box>
    </>
  );
}
