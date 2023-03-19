import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type ExpensePaneProps = {
  title: string;
  collapsible?: boolean;
  children: any;
};

const ExpensePane = ({ title, collapsible, children }: ExpensePaneProps) => {
  let defaultState = "";
  if (!collapsible) {
    defaultState = "panel1";
  }
  const [expanded, setExpanded] = React.useState<string | false>(defaultState);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      if (collapsible) {
        setExpanded(isExpanded ? panel : false);
      }
    };

  console.log(expanded);

  return (
    <Box
      sx={{
        mx: 2,
        mt: 3,
        mb: 2,
      }}
    >
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{
          backgroundColor: "#1E293B",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
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
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ExpensePane;
