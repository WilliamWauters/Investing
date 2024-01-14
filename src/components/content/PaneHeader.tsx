import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import router from "next/router";
import { RealEstateFormState } from "@/contexts/RealEstateFormContext";

type PaneHeaderProps = {
  title: string;
  style?: any;
  backButton?: boolean;
  idSimulation?: string;
};

const deleteSimulation = (id: string) => {
  // Retrieve the existing simulations from localStorage
  const realEstateSimulationsJSON = localStorage.getItem(
    "realEstateSimulationsJSON"
  );
  let simulations = realEstateSimulationsJSON
    ? JSON.parse(realEstateSimulationsJSON)
    : [];

  // Find the index of the simulation to be deleted
  const itemIndex = simulations.findIndex(
    (item: RealEstateFormState) => item.id === id
  );

  // Check if the simulation exists
  if (itemIndex !== -1) {
    // Remove the simulation from the array
    simulations.splice(itemIndex, 1);

    // Update the localStorage with the new array
    localStorage.setItem(
      "realEstateSimulationsJSON",
      JSON.stringify(simulations)
    );
  }
  router.push("./SimulationList");
};

const PaneHeader = ({
  title,
  style,
  backButton = false,
  idSimulation = "",
}: PaneHeaderProps) => {
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
          noWrap
          sx={{
            width: "100%",
            color: "#38BDF8",
            fontSize: "0.9rem",
            fontWeight: "bold",
          }}
        >
          {title.toUpperCase()}
        </Typography>
        {idSimulation && (
          <DeleteIcon
            fontSize="small"
            sx={{
              cursor: "pointer",
              "&:hover": { color: "red" },
            }}
            onClick={() => deleteSimulation(idSimulation)}
          />
        )}
      </Box>
    </Box>
  );
};

export default PaneHeader;
