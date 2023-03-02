import { useHousingForm } from "@/contexts/HousingFormContext";
import { getFees } from "@/utils/calculation";
import formatMoney from "@/utils/formatMoney";
import { Box, Typography } from "@mui/material";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

const HousingResultsChart = () => {
  const { HousingFormState } = useHousingForm();
  const fees = getFees(
    HousingFormState.housePrice,
    HousingFormState.isEntiteldToReduction
  );

  const data = {
    labels: [
      "Registration Fee - " + formatMoney(fees.registrationFee),
      "Notary Fee - " + formatMoney(fees.notaryFee),
      "Annexes - " + formatMoney(fees.annexesFee),
      "Administrative Fee - " + formatMoney(fees.administrativeFee),
      "Disbursements Fee - " + formatMoney(fees.disbursementsFee),
      "Mortgage Transcript Fee - " + formatMoney(fees.mortgageTranscriptFee),
      "Write Permission Fee - " + formatMoney(fees.writePermissionFee),
      "TVA - " + formatMoney(fees.TVA),
    ],
    datasets: [
      {
        label: "Fees",
        data: [
          fees.registrationFee,
          fees.notaryFee,
          fees.annexesFee,
          fees.administrativeFee,
          fees.disbursementsFee,
          fees.mortgageTranscriptFee,
          fees.writePermissionFee,
          fees.TVA,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Box style={{ height: "230px" }}>
        <Doughnut
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "TOTAL " + formatMoney(fees.total),
              },
              legend: {
                position: "left",
                maxWidth: 9999,
                fullSize: false,
                labels: {
                  font: {
                    size: 12,
                  },
                  padding: 10,
                },
              },
            },
          }}
        />
      </Box>
    </>
  );
};

export default HousingResultsChart;
