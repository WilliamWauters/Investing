import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type HeaderProps = {
  text: string;
};

const Header = ({ text }: HeaderProps) => {
  return (
    <>
      <Accordion
        sx={{
          px: 1,
          backgroundColor: "#1E293B",
          color: "#CBD5E1",
          borderRadius: "5px",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            variant="h6"
            align="center"
            sx={{ width: "100%", fontWeight: "bold", color: "#38BDF8" }}
          >
            {text}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            sx={{
              mt: 1,
              mb: 1,
            }}
          >
            Morbi ut efficitur velit. Aenean pellentesque dui ut tincidunt
            rhoncus. Etiam quis posuere ante. Curabitur lobortis neque et mollis
            tristique. Mauris et euismod metus.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Header;
