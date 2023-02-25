import { Box } from "@mui/material";

type FormPaneProps = {
  children: any;
};

const FormPane = ({ children }: FormPaneProps) => {
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
