import { createContext, useContext, useEffect, useState } from "react";

interface HousingForm {
  HousingFormState: HousingFormState;
  handleChangeLocation: any;
  handleChangePrice: any;
  handleChangePriceIncrementation: any;
  handleChangeType: any;
  handleChangeIsOwnAndUnique: any;
  handleChangeIsEntiteldToReduction: any;
}

interface HousingFormState {
  location: string;
  type: string;
  housePrice: number;
  isOwnAndUnique: boolean;
  isEntiteldToReduction: boolean;
  initialContribution: number;
}

type HousingFormProviderProps = {
  children: any;
};

// 1 - CREATING CONTEXT
const HousingFormContext = createContext<HousingForm>({} as HousingForm);

// 2 - CREATING PROVIDER (will be used in the Housing Page)
const HousingFormProvider = ({ children }: HousingFormProviderProps) => {
  const [HousingFormState, setHousingFormState] = useState({
    location: "Brussels",
    type: "House",
    housePrice: 250000,
    isOwnAndUnique: true,
    isEntiteldToReduction: true,
    initialContribution: 25000,
  });

  // HANDLE CHANGES
  const handleChangeLocation = (newLocation: string) => {
    setHousingFormState((prevState) => {
      return { ...prevState, location: newLocation };
    });
  };
  const handleChangeType = (newType: string) => {
    setHousingFormState((prevState) => {
      return { ...prevState, type: newType };
    });
  };
  const handleChangePrice = (
    inputName: string,
    newPrice: number | number[]
  ) => {
    console.log(inputName);
    if (typeof newPrice === "number") {
      setHousingFormState((prevState) => {
        return { ...prevState, [inputName]: newPrice };
      });
    }
  };

  const handleChangePriceIncrementation = (inputName: string, key: string) => {
    if (key === "ArrowUp") {
      setHousingFormState((prevState) => {
        return {
          ...prevState,
          [inputName]:
            +prevState[inputName as keyof typeof HousingFormState] + 5000,
        };
      });
    }
    if (key === "ArrowDown") {
      setHousingFormState((prevState) => {
        return {
          ...prevState,
          [inputName]:
            +prevState[inputName as keyof typeof HousingFormState] - 5000,
        };
      });
    }
  };

  const handleChangeIsOwnAndUnique = (newVal: boolean) => {
    setHousingFormState((prevState) => {
      return { ...prevState, isOwnAndUnique: newVal };
    });
  };

  const handleChangeIsEntiteldToReduction = (newVal: boolean) => {
    setHousingFormState((prevState) => {
      return { ...prevState, isEntiteldToReduction: newVal };
    });
  };

  return (
    <HousingFormContext.Provider
      value={{
        HousingFormState,
        handleChangeLocation,
        handleChangePrice,
        handleChangePriceIncrementation,
        handleChangeType,
        handleChangeIsOwnAndUnique,
        handleChangeIsEntiteldToReduction,
      }}
    >
      {children}
    </HousingFormContext.Provider>
  );
};

// 3 - EXPOSING CONTEXT THROUGH HOOK
const useHousingForm = () => {
  return useContext(HousingFormContext);
};

export { HousingFormProvider, useHousingForm };
