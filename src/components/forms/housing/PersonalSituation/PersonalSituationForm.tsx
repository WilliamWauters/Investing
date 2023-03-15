import FormPaneHeader from "@/components/content/FormPaneHeader";
import MoneyField from "@/components/inputs/MoneyField";
import InputSection from "@/components/layout/InputSection";
import {
  Borrower,
  HousingFormActionKind,
  useHousingForm,
} from "@/contexts/HousingFormContext";
import {
  Box,
  Collapse,
  Divider,
  Fade,
  FormControl,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Typography from "@mui/material/Typography";
import formatMoney from "@/utils/formatMoney";
import { TransitionGroup } from "react-transition-group";
import PersonalSituationResults from "./PersonalSituationResults";

interface RenderItemOptions {
  i: number;
  borrower: Borrower;
  dispatch: any;
}

function renderItem({ i, borrower, dispatch }: RenderItemOptions) {
  return (
    <Box key={`borrower_${i}`} sx={{ my: 2 }}>
      <Box
        sx={{
          mx: 2.2,
          display: "flex",
          justifyContent: "space-between",
        }}
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
            value={borrower.monthlyIncome}
            dispatch={dispatch}
          />
        </FormControl>
      </InputSection>
    </Box>
  );
}

const PersonalSituationForm = () => {
  const { HousingFormState, dispatch } = useHousingForm();
  return (
    <>
      <FormPaneHeader title="Personal Situation" />
      <TransitionGroup>
        {HousingFormState.borrowers.map((borrower, i) => {
          return (
            <Collapse key={`borrowerCollapse_${i}`}>
              {renderItem({ i, borrower, dispatch })}
            </Collapse>
          );
        })}
      </TransitionGroup>
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
      <PersonalSituationResults />
    </>
  );
};

export default PersonalSituationForm;
