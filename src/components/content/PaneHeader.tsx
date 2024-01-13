import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import router from "next/router";

type PaneHeaderProps = {
  title: string;
  style?: any;
  backButton?: boolean;
};

const PaneHeader = ({ title, style, backButton = false }: PaneHeaderProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 1,
        mx: 2,
        mt: 3,
        mb: 2,
        ...style,
      }}
    >
      {backButton && (
        <Box
          sx={{
            mr: 1,
          }}
        >
          {" "}
          <Button
            sx={{
              height: "47px",
            }}
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => {
              router.push("./SimulationList");
            }}
          >
            Back
          </Button>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexGrow: 1, // Added flexGrow
          px: 2,
          py: 1.5,
          backgroundColor: "#1E293B",
          color: "#CBD5E1",
          borderRadius: "5px",
          ...style,
        }}
      >
        <Typography
          variant="h6"
          align="center"
          sx={{
            width: "100%",
            color: "#38BDF8",
            fontSize: "0.9rem",
            fontWeight: "bold",
          }}
        >
          {title.toUpperCase()}
        </Typography>
      </Box>
    </Box>
  );
};

export default PaneHeader;
