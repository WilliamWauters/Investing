import { useState } from "react";

const useStepper = (forms: Array<object>) => {
  const [activeForm, setActiveStep] = useState<number>(0);

  const handleNext = () => {
    const newActiveStep = activeForm + 1;
    setActiveStep(newActiveStep);
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
