import {
  HousingFormActionKind,
  useHousingForm,
} from "@/contexts/HousingFormContext";
import { useState } from "react";

const useStepper = (forms: Array<any>) => {
  const [activeForm, setActiveStep] = useState<number>(0);
  const { housingFormState, housingFormValidationState, dispatch } =
    useHousingForm();

  const handleNext = () => {
    const newActiveStep = activeForm + 1;
    dispatch({
      type: HousingFormActionKind.TOUCHED_FORM,
      payload: { data: activeForm },
    });
    if (housingFormValidationState[forms[activeForm].id]) {
      setActiveStep(newActiveStep);
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleStep = (step: number) => () => {
    dispatch({
      type: HousingFormActionKind.TOUCHED_FORM,
      payload: { data: activeForm },
    });
    if (housingFormValidationState[forms[activeForm].id] || step < activeForm) {
      setActiveStep(step);
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  const isLastStep = () => {
    return activeForm + 1 === forms.length;
  };

  return [activeForm, handleNext, handleBack, handleStep] as const;
};

export default useStepper;
