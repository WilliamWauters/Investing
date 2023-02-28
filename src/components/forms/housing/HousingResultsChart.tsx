import { useHousingForm } from "@/contexts/HousingFormContext";
import { getFees } from "@/utils/calculation";
import formatMoney from "@/utils/formatMoney";
import { Box, Typography } from "@mui/material";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

const HousingResultsChart = () => {
  const { HousingFormState } = useHousingForm();
  const fees = getFees(
    HousingFormState.price,
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

  const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
  const suggestContribution = HousingFormState.price * 0.1;

  const dataBar = {
    labels: ["10 %", "20 %", "30 %"],
    datasets: [
      {
        label: "Apport",
        data: [
          HousingFormState.price * 0.1,
          HousingFormState.price * 0.2,
          HousingFormState.price * 0.3,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        stack: "Stack 1",
      },
      {
        label: "Total",
        data: [
          HousingFormState.price * 0.1 + total,
          HousingFormState.price * 0.2 + total,
          HousingFormState.price * 0.3 + total,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        stack: "Stack 2",
      },
      {
        label: "Credit",
        data: [
          HousingFormState.price - HousingFormState.price * 0.1,
          HousingFormState.price - HousingFormState.price * 0.2,
          HousingFormState.price - HousingFormState.price * 0.3,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        stack: "Stack 1",
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
                text: "TOTAL " + formatMoney(total),
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
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          mx: "auto",
          my: 1,
        }}
      >
        <Box
          sx={{
            border: 1,
            mx: "auto",
            borderRadius: 2,
            p: 1,
            width: "20%",
            fontSize: "0.75rem",
            fontWeight: "700",
          }}
        >
          <p align="right">{formatMoney(0)}</p>
          <p align="right">{formatMoney(total)}</p>
          <p align="right">{formatMoney(HousingFormState.price - 0)}</p>
        </Box>
        <Box
          sx={{
            border: 1,
            mx: "auto",
            borderRadius: 2,
            p: 1,
            width: "20%",
            fontSize: "0.75rem",
            fontWeight: "700",
          }}
        >
          <p align="right">{formatMoney(HousingFormState.price * 0.1)}</p>
          <p align="right">
            {formatMoney(HousingFormState.price * 0.1 + total)}
          </p>
          <p align="right">
            {formatMoney(HousingFormState.price - HousingFormState.price * 0.1)}
          </p>
        </Box>
        <Box
          sx={{
            border: 1,
            mx: "auto",
            borderRadius: 2,
            p: 1,
            width: "20%",
            fontSize: "0.75rem",
            fontWeight: "700",
          }}
        >
          <p align="right">{formatMoney(HousingFormState.price * 0.2)}</p>
          <p align="right">
            {formatMoney(HousingFormState.price * 0.2 + total)}
          </p>
          <p align="right">
            {formatMoney(HousingFormState.price - HousingFormState.price * 0.2)}
          </p>
        </Box>
      </Box>
    </>
  );
};

export default HousingResultsChart;
