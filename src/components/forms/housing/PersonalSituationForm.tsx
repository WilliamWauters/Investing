import FormPaneHeader from "@/components/content/FormPaneHeader";
import MoneyField from "@/components/inputs/MoneyField";
import InputSection from "@/components/layout/InputSection";
import { useHousingForm } from "@/contexts/HousingFormContext";
import { Box, Button, FormControl, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Typography from "@mui/material/Typography";

const PersonalSituationForm = () => {
  const { HousingFormState, handleChangeNbBorrowers } = useHousingForm();
  return (
    <>
      <FormPaneHeader title="Personal Situation" />
      <Box sx={{ mx: 2.2 }}>Borrower 1</Box>
      <InputSection>
        <FormControl fullWidth>
          <MoneyField name="income" label="Net monthly salary" />
        </FormControl>
      </InputSection>
      <InputSection>
        <FormControl fullWidth>
          <MoneyField name="expenses" label="Expenses" />
        </FormControl>
      </InputSection>
      <Box sx={{ height: "10px" }}></Box>
      {HousingFormState.nbBorrowers > 1 && (
        <>
          <Box
            sx={{ mx: 2.2, display: "flex", justifyContent: "space-between" }}
          >
            <Typography>Borrower 2</Typography>
            <IconButton
              onClick={(e) => handleChangeNbBorrowers(1)}
              sx={{ ml: 2, border: 1, height: "25px", width: "25px" }}
              color="error"
              size="small"
            >
              <RemoveIcon />
            </IconButton>
          </Box>
          <InputSection>
            <FormControl fullWidth>
              <MoneyField name="income" label="Net monthly salary" />
            </FormControl>
          </InputSection>
          <InputSection>
            <FormControl fullWidth>
              <MoneyField name="expenses" label="Expenses" />
            </FormControl>
          </InputSection>
        </>
      )}
      {HousingFormState.nbBorrowers === 1 && (
        <Box
          sx={{
            mx: 3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IconButton
            onClick={(e) => handleChangeNbBorrowers(2)}
            sx={{ border: 1 }}
            color="primary"
            size="small"
          >
            <AddIcon />
          </IconButton>
        </Box>
      )}
    </>
  );
};

export default PersonalSituationForm;
