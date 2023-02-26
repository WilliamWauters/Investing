import { useHousingForm } from "@/contexts/HousingFormContext";
import { getNotaryFee, getRegistrationFee, getTVA } from "@/utils/calculation";
import formatMoney from "@/utils/formatMoney";
import { Box } from "@mui/material";
import { Cell, Label, Legend, Pie, PieChart } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const HousingResultsChart = () => {
  const { HousingFormState } = useHousingForm();

  console.log(HousingFormState);

  const data = [
    {
      name: "registrationFee ",
      value: getRegistrationFee(
        HousingFormState.price,
        HousingFormState.isEntiteldToReduction
      ),
    },
    { name: "notaryFee", value: getNotaryFee(HousingFormState.price) },
    { name: "TVA", value: getTVA(HousingFormState.price) },
  ];

  const total = data.reduce((a, b) => a + b.value, 0);

  return (
    <>
      <Box
        sx={{
          // border: 1,
          width: "100%",
          display: "flex",
          direction: "column",
          justifyContent: "center",
        }}
      >
        <PieChart
          width={250}
          height={400}
          // style={{ border: "1px solid white" }}
        >
          <Legend verticalAlign="top" height={36} />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx={120}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            label
            paddingAngle={5}
          >
            <Label value={total} position="center" />
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </Box>
    </>
  );
};

export default HousingResultsChart;
