import { useHousingForm } from "@/contexts/HousingFormContext";
import FormPaneHeader from "@/components/content/FormPaneHeader";
import MoneyField from "@/components/inputs/MoneyField";
import SelectField from "@/components/inputs/SelectField";
import HousingSituationResults from "./HouseSituationResults";
import { taxationRegimes } from "@/utils/enums/TaxationRegime";
import { locations } from "@/utils/enums/Location";
import { Fade } from "@mui/material";

const HouseSituationForm = () => {
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
          <FormPaneHeader title="House Situation" />
          <MoneyField
            label="Price"
            name="housePrice"
            required
            value={housingFormState.housePrice.value || ""}
            touched={housingFormState.housePrice.touched}
            errorMsg={housingFormErrorState.housePrice}
            dispatch={dispatch}
            onlyPositif
          />
          <SelectField
            name="houseLocation"
            label="Location"
            required
            value={housingFormState.houseLocation.value || ""}
            touched={housingFormState.houseLocation.touched}
            errorMsg={housingFormErrorState.houseLocation}
            dispatch={dispatch}
            options={locations}
          />
          {housingFormState.houseLocation.value && (
            <Fade in={true} timeout={500}>
              <div>
                <SelectField
                  name="taxationRegime"
                  label="Taxation Regime"
                  required
                  value={housingFormState.taxationRegime.value || ""}
                  touched={housingFormState.taxationRegime.touched}
                  errorMsg={housingFormErrorState.taxationRegime}
                  dispatch={dispatch}
                  options={taxationRegimes.filter((x) => {
                    return x.region === housingFormState.houseLocation.value;
                  })}
                />
              </div>
            </Fade>
          )}
        </div>
      </Fade>
      {housingFormValidationState.houseSituation && <HousingSituationResults />}
    </>
  );
};

export default HouseSituationForm;
