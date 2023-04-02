import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Fade,
  Typography,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type ExpensePaneProps = {
  title: string;
  children: any;
};

const ExpensePane = ({ title, children }: ExpensePaneProps) => {
  return (
    <Fade in={true} timeout={500}>
      <Box
        sx={{
          pt: 2,
          pb: 2,
          px: 3,
          mx: 2,
          mt: 3,
          mb: 2,
          backgroundColor: "#1E293B",
        }}
      >
        <Typography
          variant="h6"
          align="center"
          sx={{
            width: "100%",
            color: "#38BDF8",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>
        <Box sx={{}}>{children}</Box>
      </Box>
    </Fade>
  );
};

export default ExpensePane;
