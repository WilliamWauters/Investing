import { useHousingForm } from "@/contexts/HousingFormContext";
import FormPaneHeader from "@/components/content/FormPaneHeader";
import MoneyField from "@/components/inputs/MoneyField";
import SelectField from "@/components/inputs/SelectField";
import HousingSituationResults from "./HouseSituationResults";
import { taxationRegimes } from "@/utils/enums/TaxationRegime";
import { locations } from "@/utils/enums/Location";
import { houseTypes } from "@/utils/enums/HouseType";

const HouseSituationForm = () => {
  const { housingFormState, dispatch } = useHousingForm();

  return (
    <>
      <FormPaneHeader title="House Situation" />
      <SelectField
        name="houseLocation"
        label="Location"
        value={housingFormState.houseLocation || ""}
        dispatch={dispatch}
        options={locations}
      />
      <SelectField
        name="houseType"
        label="Type"
        value={housingFormState.houseType || ""}
        dispatch={dispatch}
        options={houseTypes}
      />
      <MoneyField
        label="Price"
        name="housePrice"
        value={housingFormState.housePrice}
        dispatch={dispatch}
      />
      <SelectField
        name="taxationRegime"
        label="Taxation Regime"
        value={housingFormState.taxationRegime || ""}
        dispatch={dispatch}
        options={taxationRegimes}
      />
      <HousingSituationResults />
    </>
  );
};

export default HouseSituationForm;
