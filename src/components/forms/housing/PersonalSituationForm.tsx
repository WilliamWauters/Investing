import FormPaneHeader from "@/components/content/FormPaneHeader";
import MoneyField from "@/components/inputs/MoneyField";
import InputSection from "@/components/layout/InputSection";
import {
  HousingFormActionKind,
  useHousingForm,
} from "@/contexts/HousingFormContext";
import { Box, FormControl, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Typography from "@mui/material/Typography";
import formatMoney from "@/utils/formatMoney";

const PersonalSituationForm = () => {
  const { HousingFormState, dispatch } = useHousingForm();

  return (
    <>
      <FormPaneHeader title="Personal Situation" />
      {HousingFormState.borrowers.map((x, i) => {
        return (
          <Box key={`borrower_${i}`} sx={{ my: 2 }}>
            <Box
              sx={{ mx: 2.2, display: "flex", justifyContent: "space-between" }}
            >
              <Typography>Borrower {i + 1}</Typography>
              {i === 1 && (
                <IconButton
                  onClick={(e) =>
                    dispatch({
                      type: HousingFormActionKind.DEL_BORROWER,
                      payload: {},
                    })
                  }
                  sx={{ ml: 2, border: 1, height: "20px", width: "20px" }}
                  color="error"
                  size="small"
                >
                  <RemoveIcon />
                </IconButton>
              )}
            </Box>
            <InputSection>
              <FormControl fullWidth>
                <MoneyField
                  name="monthlyIncome"
                  index={i}
                  label="Net monthly salary"
                  value={x.monthlyIncome}
                />
              </FormControl>
            </InputSection>
            <InputSection>
              <FormControl fullWidth>
                <MoneyField
                  name="monthlyExpenses"
                  index={i}
                  label="Expenses"
                  value={x.monthlyExpenses}
                />
              </FormControl>
            </InputSection>
          </Box>
        );
      })}
      {HousingFormState.borrowers.length === 1 && (
        <Box
          sx={{
            mx: 3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IconButton
            onClick={(e) =>
              dispatch({
                type: HousingFormActionKind.ADD_BORROWER,
                payload: {},
              })
            }
            sx={{ border: 1 }}
            color="primary"
            size="small"
          >
            <AddIcon />
          </IconButton>
        </Box>
      )}
      <Box sx={{ mx: 2 }}>
        <Typography color="primary">
          Total :{" "}
          {formatMoney(
            HousingFormState.borrowers.reduce(
              (accumulator, currentValue) =>
                accumulator +
                (currentValue.monthlyIncome - currentValue.monthlyExpenses),
              0
            )
          )}
        </Typography>
      </Box>
    </>
  );
};

export default PersonalSituationForm;
