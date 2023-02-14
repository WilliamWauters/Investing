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
        }}
      >
        <Box sx={{ height: "9vh" }}></Box>
        {children}
        <Box sx={{ height: "10vh" }}></Box>
      </Box>
    </>
  );
};

export default Page;
