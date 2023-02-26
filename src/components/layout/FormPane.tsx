import { Box, Typography } from "@mui/material";

type FormPaneProps = {
  title?: string;
  children: any;
};

const FormPane = ({ title, children }: FormPaneProps) => {
  return (
    <Box
      sx={{
        mx: "auto",
      }}
    >
      {children}
    </Box>
  );
};

export default FormPane;
