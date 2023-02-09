import { Box, Paper, Typography } from "@mui/material";

type HeaderProps = {
  text: string;
};

const Header = ({ text }: HeaderProps) => {
  return (
    <>
      <Paper
        sx={{
          px: 3,
          py: 2,
          backgroundColor: "#1E293B",
          color: "#CBD5E1",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#38BDF8" }}>
          {text}
        </Typography>
        <Typography
          sx={{
            mt: 1,
            mb: 1,
          }}
        >
          Morbi ut efficitur velit. Aenean pellentesque dui ut tincidunt
          rhoncus. Etiam quis posuere ante. Curabitur lobortis neque et mollis
          tristique. Mauris et euismod metus.
        </Typography>
      </Paper>
    </>
  );
};

export default Header;
