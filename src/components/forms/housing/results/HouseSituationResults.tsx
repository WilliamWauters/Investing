import { useHousingForm } from "@/contexts/HousingFormContext";
import { getFees } from "@/utils/calculation";
import formatMoney from "@/utils/formatMoney";
import { Box, Divider, Typography } from "@mui/material";
import "chart.js/auto";

const HousingSituationResults = () => {
  const { HousingFormState } = useHousingForm();
  const fees = getFees(
    HousingFormState.housePrice,
    HousingFormState.taxationRegime
  );

  return (
    <Box
      sx={{
        px: 2,
        py: 1,
        mx: 2,
        mt: 3,
        mb: 2,
        backgroundColor: "#1E293B",
        color: "#CBD5E1",
        borderRadius: "5px",
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
        NOTARY FEES
      </Typography>
      {fees.fees.map((x) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
          key={"HouseSituationResults" + x.name}
        >
          <>
            <Typography
              variant="h6"
              sx={{
                color: "#38BDF8",
                fontSize: "0.85rem",
              }}
            >
              {x.name}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#38BDF8",
                fontSize: "0.85rem",
              }}
            >
              {`${formatMoney(x.value)}`}
            </Typography>
          </>
        </Box>
      ))}
      <Divider />
      <Typography
        variant="h6"
        align="right"
        sx={{
          width: "100%",
          color: "#38BDF8",
          fontSize: "1.1rem",
          fontWeight: "bold",
        }}
      >
        {`${formatMoney(fees.total)}`}
      </Typography>
    </Box>
  );
};

export default HousingSituationResults;
