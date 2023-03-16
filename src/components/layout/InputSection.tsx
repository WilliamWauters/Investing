import { Box } from "@mui/material";

type InputSectionProps = {
  children: any;
};

const InputSection = ({ children }: InputSectionProps) => {
  return (
    <Box
      sx={{
        py: 1,
        px: 2,
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
