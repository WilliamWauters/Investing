import { Box, Typography } from "@mui/material";

type ExpensePaneProps = {
  title: string;
  children: any;
};

const ExpensePane = ({ title, children }: ExpensePaneProps) => {
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
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default ExpensePane;
