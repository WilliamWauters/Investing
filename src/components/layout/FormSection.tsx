import { Box } from "@mui/material";

type FormSectionProps = {
  children: any;
};

const FormSection = ({ children }: FormSectionProps) => {
  return (
    <Box
      sx={{
        py: 2,
        px: 2,
        border: 1,
        borderRadius: "5px",
        borderColor: "#1E293B",
        "&:hover": {
          // borderColor: "primary.main",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default FormSection;
