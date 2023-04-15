import FormPaneHeader from "@/components/content/FormPaneHeader";
import MoneyField from "@/components/inputs/MoneyField";
import {
  Borrower,
  HousingFormActionKind,
  useHousingForm,
} from "@/contexts/HousingFormContext";
import { Box, Collapse, Fade, Grow, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Typography from "@mui/material/Typography";
import { TransitionGroup } from "react-transition-group";
import PersonalSituationResults from "./PersonalSituationResults";

interface RenderItemOptions {
  i: number;
  borrower: Borrower;
  dispatch: any;
  housingFormErrorState: any;
}

function renderItem({
  i,
  borrower,
  dispatch,
  housingFormErrorState,
}: RenderItemOptions) {
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

      <MoneyField
        name="monthlyIncome"
        index={i}
        label="Net monthly salary"
        required
        value={borrower.monthlyIncome.value || ""}
        touched={borrower.monthlyIncome.touched}
        errorMsg={housingFormErrorState["monthlyIncome_" + (i + 1)]}
        dispatch={dispatch}
        onlyPositif
      />
    </Box>
  );
}

const PersonalSituationForm = () => {
  const {
    housingFormState,
    housingFormValidationState,
    housingFormErrorState,
    dispatch,
  } = useHousingForm();

  return (
    <>
      <Fade in={true} timeout={500}>
        <div>
          <FormPaneHeader title="Personal Situation" />
          <TransitionGroup>
            {housingFormState.borrowers.map((borrower, i) => {
              return (
                <Collapse key={`borrowerCollapse_${i}`}>
                  {renderItem({
                    i,
                    borrower,
                    dispatch,
                    housingFormErrorState,
                  })}
                </Collapse>
              );
            })}
          </TransitionGroup>
          {housingFormState.borrowers.length === 1 && (
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
        </div>
      </Fade>
      {housingFormValidationState.personalSituation && (
        <PersonalSituationResults />
      )}
    </>
  );
};

export default PersonalSituationForm;
