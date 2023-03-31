import {
  HousingFormActionKind,
  useHousingForm,
} from "@/contexts/HousingFormContext";
import { useState } from "react";

const useStepper = (forms: Array<any>) => {
  const [activeForm, setActiveStep] = useState<number>(0);
  const { housingFormState, dispatch } = useHousingForm();

  const handleNext = () => {
    const newActiveStep = activeForm + 1;
    dispatch({
      type: HousingFormActionKind.TOUCHED_FORM,
      payload: { data: activeForm },
    });
    if (housingFormState.formValidation[forms[activeForm].id]) {
      setActiveStep(newActiveStep);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const isLastStep = () => {
    return activeForm + 1 === forms.length;
  };

  return [activeForm, handleNext, handleBack, handleStep] as const;
};

export default useStepper;
