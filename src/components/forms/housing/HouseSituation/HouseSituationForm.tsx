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

  console.log(housingFormState.touched);

  return (
    <>
      <FormPaneHeader title="House Situation" />
      <SelectField
        name="houseLocation"
        label="Location"
        value={housingFormState.houseLocation || ""}
        required
        touched={housingFormState.touched.houseLocation}
        dispatch={dispatch}
        options={locations}
      />
      <SelectField
        name="houseType"
        label="Type"
        required
        value={housingFormState.houseType || ""}
        touched={housingFormState.touched.houseType}
        dispatch={dispatch}
        options={houseTypes}
      />
      <MoneyField
        label="Price"
        name="housePrice"
        required
        value={housingFormState.housePrice}
        touched={housingFormState.touched.housePrice}
        dispatch={dispatch}
      />
      <SelectField
        name="taxationRegime"
        label="Taxation Regime"
        required
        value={housingFormState.taxationRegime || ""}
        touched={housingFormState.touched.taxationRegime}
        dispatch={dispatch}
        options={taxationRegimes}
      />
      <HousingSituationResults />
    </>
  );
};

export default HouseSituationForm;
