import { useHousingForm } from "@/contexts/HousingFormContext";
import { getFees } from "@/utils/calculation";
import formatMoney from "@/utils/formatMoney";
import { Box, Divider, Typography } from "@mui/material";
import "chart.js/auto";

const FinancialSituationResults = () => {
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
        LOAN
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <>
          <Typography
            variant="h6"
            sx={{
              color: "#38BDF8",
              fontSize: "0.85rem",
            }}
          >
            Notary Fees
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#38BDF8",
              fontSize: "0.85rem",
            }}
          >
            {`${formatMoney(fees.total)}`}
          </Typography>
        </>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <>
          <Typography
            variant="h6"
            sx={{
              color: "#38BDF8",
              fontSize: "0.85rem",
            }}
          >
            Initial Contribution
            {/* Initial Contribution{" "}
            {`(${(
              (HousingFormState.initialContribution /
                (HousingFormState.housePrice + fees.total)) *
              100
            ).toFixed(2)} %)`} */}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#38BDF8",
              fontSize: "0.85rem",
            }}
          >
            {`${formatMoney(HousingFormState.initialContribution)}`}
          </Typography>
        </>
      </Box>
      <Divider />
      <Typography
        variant="h6"
        align="right"
        sx={{
          width: "100%",
          color: "#38BDF8",
          fontSize: "1.1rem",
          fontWeight: "bold",
          mb: 2,
        }}
      >
        {`${formatMoney(HousingFormState.initialContribution - fees.total)}`}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <>
          <Typography
            variant="h6"
            sx={{
              color: "#38BDF8",
              fontSize: "0.85rem",
            }}
          >
            {`Rest of Initial Contribution (${(
              ((HousingFormState.initialContribution - fees.total) /
                HousingFormState.housePrice) *
              100
            ).toFixed(2)}% of House Price)`}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#38BDF8",
              fontSize: "0.85rem",
            }}
          >
            {`${formatMoney(
              HousingFormState.initialContribution - fees.total
            )}`}
          </Typography>
        </>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <>
          <Typography
            variant="h6"
            sx={{
              color: "#38BDF8",
              fontSize: "0.85rem",
            }}
          >
            House Price
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#38BDF8",
              fontSize: "0.85rem",
            }}
          >
            {`${formatMoney(HousingFormState.housePrice)}`}
          </Typography>
        </>
      </Box>
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
          HousingFormState.housePrice +
            fees.total -
            HousingFormState.initialContribution
        )}`}
      </Typography>
    </Box>
  );
};

export default FinancialSituationResults;
