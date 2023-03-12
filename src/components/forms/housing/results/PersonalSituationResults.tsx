import { useHousingForm } from "@/contexts/HousingFormContext";
import formatMoney from "@/utils/formatMoney";
import { Box, Divider, Typography } from "@mui/material";
import "chart.js/auto";

const PersonalSituationResults = () => {
  const { HousingFormState } = useHousingForm();

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
        REVENU
      </Typography>
      <Typography
        variant="h6"
        align="right"
        sx={{
          width: "100%",
          color: "#38BDF8",
          fontSize: "1rem",
        }}
      >
        {HousingFormState.borrowers.map((x) => (
          <>
            {formatMoney(x.monthlyIncome)}
            <br />
          </>
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
          {`${formatMoney(
            HousingFormState.borrowers.reduce(
              (accumulator, currentValue) =>
                accumulator +
                (currentValue.monthlyIncome - currentValue.monthlyExpenses),
              0
            )
          )}`}
        </Typography>
      </Typography>
    </Box>
  );
};

export default PersonalSituationResults;
