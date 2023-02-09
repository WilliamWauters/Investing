import { Box } from "@mui/material";

type InputSectionProps = {
  children: any;
};

const InputSection = ({ children }: InputSectionProps) => {
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

export default InputSection;
