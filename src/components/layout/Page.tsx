import { Box } from "@mui/material";

type PagePrpops = {
  children: any;
};

const Page = ({ children }: PagePrpops) => {
  return (
    <Box
      sx={{
        mt: 8,
        display: "grid",
        gap: 2,
      }}
    >
      {children}
    </Box>
  );
};

export default Page;
