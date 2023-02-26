import { useHousingForm } from "@/contexts/HousingFormContext";
import { getNotaryFee, getRegistrationFee, getTVA } from "@/utils/calculation";
import formatMoney from "@/utils/formatMoney";
import { Box } from "@mui/material";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

export const datatest = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      // backgroundColor: [
      //   "rgba(255, 99, 132, 0.2)",
      //   "rgba(54, 162, 235, 0.2)",
      //   "rgba(255, 206, 86, 0.2)",
      //   "rgba(75, 192, 192, 0.2)",
      //   "rgba(153, 102, 255, 0.2)",
      //   "rgba(255, 159, 64, 0.2)",
      // ],
      // borderColor: [
      //   "rgba(255, 99, 132, 1)",
      //   "rgba(54, 162, 235, 1)",
      //   "rgba(255, 206, 86, 1)",
      //   "rgba(75, 192, 192, 1)",
      //   "rgba(153, 102, 255, 1)",
      //   "rgba(255, 159, 64, 1)",
      // ],
      borderWidth: 1,
    },
  ],
};
const plugins = [
  {
    beforeDraw: function (chart) {
      var width = chart.width,
        height = chart.height,
        ctx = chart.ctx;
      ctx.restore();
      var fontSize = (height / 160).toFixed(2);
      ctx.font = fontSize + "em sans-serif";
      ctx.textBaseline = "top";
      var text = "Foo-bar",
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;
      ctx.fillText(text, textX, textY);
      ctx.save();
    },
  },
];

const HousingResultsChart = () => {
  const { HousingFormState } = useHousingForm();

  const registrationFee = getRegistrationFee(
    HousingFormState.price,
    HousingFormState.isEntiteldToReduction
  );
  const notaryFee = getNotaryFee(HousingFormState.price);
  const TVA = getTVA(HousingFormState.price);

  console.log("registrationFee", formatMoney(registrationFee));

  const data = {
    labels: [
      "Registration Fee - " + formatMoney(registrationFee),
      "Notary Fee - " + formatMoney(notaryFee),
      "TVA - " + formatMoney(TVA),
    ],
    datasets: [
      {
        label: "Fees",
        data: [registrationFee, notaryFee, TVA],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const total = data.datasets[0].data.reduce((a, b) => a + b, 0);

  return (
    <>
      <Box
        sx={{
          // border: 1,
          width: "100%",
          display: "flex",
          direction: "column",
          justifyContent: "center",
          height: "450px",
        }}
      >
        <Doughnut
          data={data}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "TOTAL " + formatMoney(total),
              },
              legend: {
                position: "left",
                align: "center",
              },
            },
          }}
        />
      </Box>
    </>
  );
};

export default HousingResultsChart;
