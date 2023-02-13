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
          gap: 2,
        }}
      >
        <Box sx={{ height: "50px" }}></Box>
        {children}
      </Box>
    </>
  );
};

export default Page;
