import { createContext, useContext, useEffect, useState } from "react";

interface HousingForm {
  location: any;
  price: any;
  type: any;
  isOwnAndUnique: any;
  isEntiteldToReduction: any;
  handleChangeLocation: any;
  handleChangePrice: any;
  handleChangeType: any;
  handleChangeIsOwnAndUnique: any;
}

type HousingFormProviderProps = {
  children: any;
};

function housingFormReducer(state: any, action: any) {
  switch (action.type) {
    case "increment": {
      return { count: state.count + 1 };
    }
    case "decrement": {
      return { count: state.count - 1 };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// 1 - CREATING CONTEXT
const HousingFormContext = createContext<HousingForm>({} as HousingForm);

// 2 - CREATING PROVIDER (will be used in the Housing Page)
const HousingFormProvider = ({ children }: HousingFormProviderProps) => {
  const [location, setLocation] = useState("Brussels");
  const [price, setPrice] = useState(250000);
  const [type, setType] = useState("Maison / appartement");
  const [isOwnAndUnique, setIsOwnAndUnique] = useState(true);
  const [isEntiteldToReduction, setIsEntiteldToReduction] = useState(true);

  // HANDLE CHANGES
  const handleChangeLocation = (newLocation: string) => {
    setLocation(newLocation);
  };
  const handleChangePrice = (newPrice: number | number[]) => {
    if (typeof newPrice === "number") {
      setPrice(newPrice);
    }
  };
  const handleChangeType = (newType: string) => {
    setType(newType);
  };
  const handleChangeIsOwnAndUnique = (newVal: boolean) => {
    setIsOwnAndUnique(newVal);
  };

  useEffect(() => {
    if (price < 500000 && isOwnAndUnique) {
      setIsEntiteldToReduction(true);
    } else {
      setIsEntiteldToReduction(false);
    }
  }, [price, isOwnAndUnique]);

  return (
    <HousingFormContext.Provider
      value={{
        location,
        price,
        type,
        isOwnAndUnique,
        isEntiteldToReduction,
        handleChangeLocation,
        handleChangePrice,
        handleChangeType,
        handleChangeIsOwnAndUnique,
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
