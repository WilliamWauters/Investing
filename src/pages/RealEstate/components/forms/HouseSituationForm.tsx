import { useRealEstateForm } from "@/contexts/RealEstateFormContext";
import PaneHeader from "@/components/content/PaneHeader";
import MoneyField from "@/components/inputs/MoneyField";
import SelectField from "@/components/inputs/SelectField";
import RealEstateSituationResults from "../HouseSituationResults";
import { taxationRegimes } from "@/utils/enums/TaxationRegime";
import { locations } from "@/utils/enums/Location";
import { Fade } from "@mui/material";

const HouseSituationForm = () => {
  const {
    realEstateFormState,
    realEstateFormValidationState,
    realEstateFormErrorState,
    dispatch,
  } = useRealEstateForm();

  return (
    <>
      <Fade in={true} timeout={500}>
        <div>
          <PaneHeader title="House Situation" />
          <MoneyField
            label="Price"
            name="housePrice"
            required
            value={realEstateFormState.housePrice.value || ""}
            touched={realEstateFormState.housePrice.touched}
            errorMsg={realEstateFormErrorState.housePrice}
            dispatch={dispatch}
            onlyPositif
          />
          <SelectField
            name="houseLocation"
            label="Location"
            required
            value={realEstateFormState.houseLocation.value || ""}
            touched={realEstateFormState.houseLocation.touched}
            errorMsg={realEstateFormErrorState.houseLocation}
            dispatch={dispatch}
            options={locations}
          />
          {realEstateFormState.houseLocation.value && (
            <Fade in={true} timeout={500}>
              <div>
                <SelectField
                  name="taxationRegime"
                  label="Taxation Regime"
                  required
                  value={realEstateFormState.taxationRegime.value || ""}
                  touched={realEstateFormState.taxationRegime.touched}
                  errorMsg={realEstateFormErrorState.taxationRegime}
                  dispatch={dispatch}
                  options={taxationRegimes.filter((x) => {
                    return x.region === realEstateFormState.houseLocation.value;
                  })}
                />
              </div>
            </Fade>
          )}
        </div>
      </Fade>
      {realEstateFormValidationState.houseSituation && (
        <RealEstateSituationResults />
      )}
    </>
  );
};

export default HouseSituationForm;
