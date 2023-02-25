import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type PagePrpops = {
  children: any;
};

const Page = ({ children }: PagePrpops) => {
  return (
    <>
      <Box
        sx={{
          display: "grid",
          my: 6,
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default Page;
