import { createContext, useContext, useEffect, useState } from "react";

interface HousingForm {
  HousingFormState: HousingFormState;
  handleChangeLocation: any;
  handleChangePrice: any;
  handleChangePriceIncrementation: any;
  handleChangeType: any;
  handleChangeIsOwnAndUnique: any;
  handleChangeIsEntiteldToReduction: any;
  handleChangeNbBorrowers: any;
}

interface HousingFormState {
  location: string;
  type: string;
  housePrice: number;
  isOwnAndUnique: boolean;
  isEntiteldToReduction: boolean;
  initialContribution: number;
  nbBorrowers: number;
  borrowers: Borrower[];
}

interface Borrower {
  monthlyIncome: number;
  monthlyExpenses: number;
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
    nbBorrowers: 1,
    borrowers: [{ monthlyIncome: 1000, monthlyExpenses: 0 }],
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
    newPrice: number | number[],
    index?: number
  ) => {
    if (index !== undefined) {
      if (typeof newPrice === "number") {
        setHousingFormState((prevState) => {
          // 1. Make a shallow copy of the items
          let borrowers = [...prevState.borrowers];
          // 2. Make a shallow copy of the item you want to mutate
          let borrower = { ...borrowers[index] };
          // 3. Replace the property you're intested in
          borrower[inputName as keyof Borrower] = newPrice;
          // 4. Put it back into our array. N.B. we *are* mutating the array here,
          //    but that's why we made a copy first
          borrowers[index] = borrower;
          return { ...prevState, ["borrowers"]: borrowers };
        });
      }
    } else {
      if (typeof newPrice === "number") {
        setHousingFormState((prevState) => {
          return { ...prevState, [inputName]: newPrice };
        });
      }
    }
  };

  const handleChangePriceIncrementation = (
    inputName: string,
    key: string,
    index?: number
  ) => {
    if (index !== undefined) {
      if (key === "ArrowUp") {
        setHousingFormState((prevState) => {
          // 1. Make a shallow copy of the items
          let borrowers = [...prevState.borrowers];
          // 2. Make a shallow copy of the item you want to mutate
          let borrower = { ...borrowers[index] };
          // 3. Replace the property you're intested in
          borrower[inputName as keyof Borrower] =
            borrower[inputName as keyof Borrower] + 50;
          // 4. Put it back into our array. N.B. we *are* mutating the array here,
          //    but that's why we made a copy first
          borrowers[index] = borrower;
          return { ...prevState, ["borrowers"]: borrowers };
        });
      }
      if (key === "ArrowDown") {
        setHousingFormState((prevState) => {
          // 1. Make a shallow copy of the items
          let borrowers = [...prevState.borrowers];
          // 2. Make a shallow copy of the item you want to mutate
          let borrower = { ...borrowers[index] };
          // 3. Replace the property you're intested in
          borrower[inputName as keyof Borrower] =
            borrower[inputName as keyof Borrower] - 50;
          // 4. Put it back into our array. N.B. we *are* mutating the array here,
          //    but that's why we made a copy first
          borrowers[index] = borrower;
          return { ...prevState, ["borrowers"]: borrowers };
        });
      }
    } else {
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

  const handleChangeNbBorrowers = (action: string) => {
    if (action === "add") {
      setHousingFormState((prevState) => {
        return {
          ...prevState,
          nbBorrowers: 2,
          borrowers: [
            ...prevState.borrowers,
            {
              monthlyIncome: 1000,
              monthlyExpenses: 0,
            },
          ],
        };
      });
    } else {
      setHousingFormState((prevState) => {
        const copyArr = [...prevState.borrowers];
        copyArr.splice(-1);
        return {
          ...prevState,
          nbBorrowers: 1,
          borrowers: [...copyArr],
        };
      });
    }
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
        handleChangeNbBorrowers,
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
