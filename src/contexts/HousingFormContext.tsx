import { createContext, useContext, useReducer } from "react";

enum TaxationRegime {
  BXL_WITHOUT_ABATTEMENT = "BXL_WITHOUT_ABATTEMENT",
  BXL_WITH_ABATTEMENT_175 = "BXL_WITH_ABATTEMENT_175",
  BXL_WITH_ABATTEMENT_200 = "BXL_WITH_ABATTEMENT_200",
}

interface HousingForm {
  HousingFormState: HousingFormState;
  dispatch: any;
}

interface HousingFormState {
  location: string;
  type: string;
  housePrice: number;
  taxationRegime: string;
  initialContribution: number;
  nbBorrowers: number;
  borrowers: Borrower[];
  creditInterestRate: number;
  creditDuration: number;
}

interface Borrower {
  monthlyIncome: number;
  monthlyExpenses: number;
}

type HousingFormProviderProps = {
  children: any;
};

enum HousingFormActionKind {
  UPD_INPUT = "UPD_INPUT",
  UPD_ENUM = "UPD_ENUM",
  UPD_PRICE_INCREASE = "UPD_PRICE_INCREASE",
  UPD_PRICE_DECREASE = "UPD_PRICE_DECREASE",
  ADD_BORROWER = "ADD_BORROWER",
  DEL_BORROWER = "DEL_BORROWER",
  UPD_BORROWER = "UPD_BORROWER",
  UPD_BORROWER_INCREASE = "UPD_BORROWER_INCREASE",
  UPD_BORROWER_DECREASE = "UPD_BORROWER_DECREASE",
}

interface HousingFormAction {
  type: HousingFormActionKind;
  payload: any;
}

// Our reducer function that uses a switch statement to handle our actions
function HousingFormReducer(
  state: HousingFormState,
  action: HousingFormAction
) {
  const { type, payload } = action;
  switch (type) {
    case HousingFormActionKind.UPD_INPUT:
      return {
        ...state,
        [payload.name]: payload.data,
      };
    case HousingFormActionKind.UPD_PRICE_INCREASE:
      return {
        ...state,
        [payload.name]:
          +state[payload.name as keyof HousingFormState] + payload.step,
      };
    case HousingFormActionKind.UPD_PRICE_DECREASE:
      return {
        ...state,
        [payload.name]:
          +state[payload.name as keyof HousingFormState] - payload.step,
      };
    case HousingFormActionKind.ADD_BORROWER:
      return {
        ...state,
        nbBorrowers: 2,
        borrowers: [
          ...state.borrowers,
          {
            monthlyIncome: 2000,
            monthlyExpenses: 0,
          },
        ],
      };
    case HousingFormActionKind.DEL_BORROWER:
      const copyArr = [...state.borrowers];
      copyArr.splice(-1);
      return {
        ...state,
        nbBorrowers: 1,
        borrowers: [...copyArr],
      };
    case HousingFormActionKind.UPD_BORROWER:
      // 1. Make a shallow copy of the items
      let borrowers = [...state.borrowers];
      // 2. Make a shallow copy of the item you want to mutate
      let borrower = { ...borrowers[payload.index] };
      // 3. Replace the property you're intested in
      borrower[payload.name as keyof Borrower] = payload.data;
      // 4. Put it back into our array. N.B. we *are* mutating the array here,
      //    but that's why we made a copy first
      borrowers[payload.index] = borrower;
      return { ...state, ["borrowers"]: borrowers };
    case HousingFormActionKind.UPD_BORROWER_INCREASE:
      // 1. Make a shallow copy of the items
      let borrowersInc = [...state.borrowers];
      // 2. Make a shallow copy of the item you want to mutate
      let borrowerInc = { ...borrowersInc[payload.index] };
      // 3. Replace the property you're intested in
      borrowerInc[payload.name as keyof Borrower] =
        borrowerInc[payload.name as keyof Borrower] + payload.step;
      // 4. Put it back into our array. N.B. we *are* mutating the array here,
      //    but that's why we made a copy first
      borrowersInc[payload.index] = borrowerInc;
      return { ...state, ["borrowers"]: borrowersInc };
    case HousingFormActionKind.UPD_BORROWER_DECREASE:
      // 1. Make a shallow copy of the items
      let borrowersDec = [...state.borrowers];
      // 2. Make a shallow copy of the item you want to mutate
      let borrowerDec = { ...borrowersDec[payload.index] };
      // 3. Replace the property you're intested in
      borrowerDec[payload.name as keyof Borrower] =
        borrowerDec[payload.name as keyof Borrower] - payload.step;
      // 4. Put it back into our array. N.B. we *are* mutating the array here,
      //    but that's why we made a copy first
      borrowersDec[payload.index] = borrowerDec;
      return { ...state, ["borrowers"]: borrowersDec };
    default:
      return state;
  }
}

// 1 - CREATING CONTEXT
const HousingFormContext = createContext<HousingForm>({} as HousingForm);

// 2 - CREATING PROVIDER (will be used in the Housing Page)
const HousingFormProvider = ({ children }: HousingFormProviderProps) => {
  const [HousingFormState, dispatch] = useReducer(HousingFormReducer, {
    location: "Brussels",
    type: "House",
    housePrice: 250000,
    taxationRegime: "",
    initialContribution: 25000,
    nbBorrowers: 1,
    borrowers: [{ monthlyIncome: 2000, monthlyExpenses: 0 }],
    creditInterestRate: 3.5,
    creditDuration: 20,
  });

  return (
    <HousingFormContext.Provider
      value={{
        HousingFormState,
        dispatch,
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

export {
  HousingFormProvider,
  useHousingForm,
  HousingFormActionKind,
  TaxationRegime,
};
export type { Borrower };
