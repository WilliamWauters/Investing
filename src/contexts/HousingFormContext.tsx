import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

interface inputState {
  value: any;
  touched: boolean;
}

interface HousingForm {
  housingFormState: HousingFormState;
  housingFormValidationState: any;
  housingFormErrorState: any;
  dispatch: any;
}

interface HousingFormState {
  houseLocation: inputState;
  houseType: inputState;
  housePrice: inputState;
  taxationRegime: inputState;
  initialContribution: inputState;
  creditInterestRate: inputState;
  creditDuration: inputState;
  touched: any;
  borrowers: Borrower[];
}

interface Borrower {
  monthlyIncome: inputState;
}

type HousingFormProviderProps = {
  children: any;
};

enum HousingFormActionKind {
  UPDATE_INPUT_ERROR = "UPDATE_INPUT_ERROR",
  UPDATE_INPUT = "UPDATE_INPUT",
  UPDATE_INPUT_BORROWER = "UPDATE_INPUT_BORROWER",
  UPDATE_MONEY_INCREASE = "UPDATE_MONEY_INCREASE",
  UPDATE_MONEY_INCREASE_BORROWER = "UPDATE_MONEY_INCREASE_BORROWER",
  UPDATE_MONEY_DECREASE = "UPDATE_MONEY_DECREASE",
  UPDATE_MONEY_DECREASE_BORROWER = "UPDATE_MONEY_DECREASE_BORROWER",
  TOCUHED_INPUT = "TOCUHED_INPUT",
  UPD_INPUT = "UPD_INPUT",
  UPD_ENUM = "UPD_ENUM",
  ADD_BORROWER = "ADD_BORROWER",
  DEL_BORROWER = "DEL_BORROWER",
  UPD_BORROWER = "UPD_BORROWER",
  TOUCHED_BORROWER = "TOUCHED_BORROWER",
  TOUCHED_FORM = "TOUCHED_FORM",
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
    case HousingFormActionKind.UPDATE_INPUT:
      var taxationRegimState = state["taxationRegime"];
      if (payload.name === "houseLocation") {
        taxationRegimState.touched = false;
        taxationRegimState.value = "";
      }
      return {
        ...state,
        ["taxationRegime"]: taxationRegimState,
        [payload.name]: {
          ...state[payload.name as keyof HousingFormState],
          value: payload.data,
        },
      };
    case HousingFormActionKind.UPDATE_MONEY_INCREASE:
      return {
        ...state,
        [payload.name]: {
          ...state[payload.name as keyof HousingFormState],
          value:
            state[payload.name as keyof HousingFormState].value + payload.step,
        },
      };
    case HousingFormActionKind.UPDATE_MONEY_DECREASE:
      return {
        ...state,
        [payload.name]: {
          ...state[payload.name as keyof HousingFormState],
          value:
            state[payload.name as keyof HousingFormState].value - payload.step,
        },
      };
    case HousingFormActionKind.TOCUHED_INPUT:
      return {
        ...state,
        [payload.name]: {
          ...state[payload.name as keyof HousingFormState],
          touched: true,
        },
      };
    case HousingFormActionKind.UPD_INPUT:
      return {
        ...state,
        [payload.name]: payload.data,
      };
    case HousingFormActionKind.ADD_BORROWER:
      return {
        ...state,
        borrowers: [
          ...state.borrowers,
          {
            monthlyIncome: {
              value: 0,
              touched: false,
              error: "",
            },
          },
        ],
      };
    case HousingFormActionKind.DEL_BORROWER:
      const copyArr = [...state.borrowers];
      copyArr.splice(-1);
      return {
        ...state,
        borrowers: [...copyArr],
      };
    case HousingFormActionKind.UPDATE_INPUT_BORROWER:
      // 1. Make a shallow copy of the items
      let borrowers = [...state.borrowers];
      // 2. Make a shallow copy of the item you want to mutate
      let borrower = { ...borrowers[payload.index] };
      // 3. Make a shallow copy of the prop you want to mutate
      let borrowerPropCopy = {
        ...borrower[payload.name as keyof Borrower],
      };
      // 4. Replace the property you're intested in
      borrowerPropCopy.value = payload.data;
      // 5. Put it back into our object,
      borrower[payload.name as keyof Borrower] = borrowerPropCopy;
      // 6. Put it back into our array. N.B. we *are* mutating the array here,
      borrowers[payload.index] = borrower;
      return {
        ...state,
        ["borrowers"]: borrowers,
      };
    case HousingFormActionKind.UPDATE_MONEY_INCREASE_BORROWER:
      // 1. Make a shallow copy of the items
      let borrowersInc = [...state.borrowers];
      // 2. Make a shallow copy of the item you want to mutate
      let borrowerInc = { ...borrowersInc[payload.index] };
      // 3. Make a shallow copy of the prop you want to mutate
      let borrowerPropCopyInc = {
        ...borrowerInc[payload.name as keyof Borrower],
      };
      // 4. Replace the property you're intested in
      borrowerPropCopyInc.value = borrowerPropCopyInc.value + payload.step;
      // 5. Put it back into our object,
      borrowerInc[payload.name as keyof Borrower] = borrowerPropCopyInc;
      // 6. Put it back into our array. N.B. we *are* mutating the array here,
      borrowersInc[payload.index] = borrowerInc;
      return {
        ...state,
        ["borrowers"]: borrowersInc,
      };
    case HousingFormActionKind.UPDATE_MONEY_DECREASE_BORROWER:
      // 1. Make a shallow copy of the items
      let borrowersDec = [...state.borrowers];
      // 2. Make a shallow copy of the item you want to mutate
      let borrowerDec = { ...borrowersDec[payload.index] };
      // 3. Make a shallow copy of the prop you want to mutate
      let borrowerPropCopyDec = {
        ...borrowerDec[payload.name as keyof Borrower],
      };
      // 4. Replace the property you're intested in
      borrowerPropCopyDec.value = borrowerPropCopyDec.value - payload.step;
      // 5. Put it back into our object,
      borrowerDec[payload.name as keyof Borrower] = borrowerPropCopyDec;
      // 6. Put it back into our array. N.B. we *are* mutating the array here,
      borrowersDec[payload.index] = borrowerDec;
      return {
        ...state,
        ["borrowers"]: borrowersDec,
      };
    case HousingFormActionKind.TOUCHED_BORROWER:
      // 1. Make a shallow copy of the items
      let borrowersTouched = [...state.borrowers];
      // 2. Make a shallow copy of the item you want to mutate
      let borrowerTouched = { ...borrowersTouched[payload.index] };
      // 3. Make a shallow copy of the prop you want to mutate
      let borrowerPropCopyTouched = {
        ...borrowerTouched[payload.name as keyof Borrower],
      };
      // 4. Replace the property you're intested in
      borrowerPropCopyTouched.touched = true;
      // 5. Put it back into our object,
      borrowerTouched[payload.name as keyof Borrower] = borrowerPropCopyTouched;
      // 6. Put it back into our array. N.B. we *are* mutating the array here,
      borrowersTouched[payload.index] = borrowerTouched;
      return {
        ...state,
        ["borrowers"]: borrowersTouched,
      };
    case HousingFormActionKind.TOUCHED_FORM:
      if (payload.data === 0) {
        return {
          ...state,
          ["houseLocation"]: {
            ...state["houseLocation" as keyof HousingFormState],
            touched: true,
          },
          ["houseType"]: {
            ...state["houseType" as keyof HousingFormState],
            touched: true,
          },
          ["housePrice"]: {
            ...state["housePrice" as keyof HousingFormState],
            touched: true,
          },
          ["taxationRegime"]: {
            ...state["taxationRegime" as keyof HousingFormState],
            touched: state.houseLocation.value ? true : false,
          },
        };
      }
      if (payload.data === 1) {
        // 1. Make a shallow copy of the items
        let borrowersTest = [...state.borrowers];
        borrowersTest.map((borrowerTest) => {
          borrowerTest.monthlyIncome.touched = true;
          return {
            borrowerTest,
          };
        });

        return {
          ...state,
          ["borrowers"]: borrowersTest,
        };
      }
      if (payload.data === 2) {
        return {
          ...state,
          ["initialContribution"]: {
            ...state["initialContribution" as keyof HousingFormState],
            touched: true,
          },
          ["creditInterestRate"]: {
            ...state["creditInterestRate" as keyof HousingFormState],
            touched: true,
          },
          ["creditDuration"]: {
            ...state["creditDuration" as keyof HousingFormState],
            touched: true,
          },
        };
      }
    default:
      return state;
  }
}

const getFormValidationState = (state: any, errorState: any) => {
  return {
    houseSituation: isHouseSituationFormValid(state, errorState),
    personalSituation: isPersonalSituationFormValid(state, errorState),
    financialSituation: isFinancialSituationFormValid(state, errorState),
    housingResults: true,
  };
};

const isHouseSituationFormValid = (state: any, errorState: any) => {
  var isValid = true;
  if (
    state.houseLocation.touched === false ||
    state.houseLocation.value === ""
  ) {
    isValid = false;
  }
  if (state.houseType.touched === false || state.houseType.value === "") {
    isValid = false;
  }
  if (state.housePrice.touched === false || state.housePrice.value === "") {
    isValid = false;
  }
  if (
    state.taxationRegime.touched === false ||
    state.taxationRegime.value === ""
  ) {
    isValid = false;
  }
  if (errorState.houseLocation !== "") {
    isValid = false;
  }
  if (errorState.houseType !== "") {
    isValid = false;
  }
  if (errorState.housePrice !== "") {
    isValid = false;
  }
  if (errorState.taxationRegime !== "") {
    isValid = false;
  }
  return isValid;
};

const isPersonalSituationFormValid = (state: any, errorState: any) => {
  var isValid = true;
  state.borrowers.forEach((element: Borrower, i: number) => {
    if (
      element.monthlyIncome.value === 0 ||
      element.monthlyIncome.value === undefined
    ) {
      isValid = false;
    }
    if (errorState["monthlyIncome_" + (i + 1)] !== "") {
      isValid = false;
    }
  });

  return isValid;
};

const isFinancialSituationFormValid = (state: any, errorState: any) => {
  var isValid = true;
  if (state.housePrice.touched === false || state.housePrice.value === "") {
    isValid = false;
  }
  if (
    state.initialContribution.touched === false ||
    state.initialContribution.value === ""
  ) {
    isValid = false;
  }
  if (
    state.creditInterestRate.touched === false ||
    state.creditInterestRate.value === ""
  ) {
    isValid = false;
  }
  if (
    state.creditDuration.touched === false ||
    state.creditDuration.value === ""
  ) {
    isValid = false;
  }
  if (errorState.housePrice !== "") {
    isValid = false;
  }
  if (errorState.initialContribution !== "") {
    isValid = false;
  }
  if (errorState.creditInterestRate !== "") {
    isValid = false;
  }
  if (errorState.creditDuration !== "") {
    isValid = false;
  }
  return isValid;
};

const getFormErrorState = (state: any) => {
  var errors = {
    houseLocation: "",
    houseType: "",
    housePrice: "",
    taxationRegime: "",
    initialContribution: "",
    monthlyIncome_1: "",
    monthlyIncome_2: "",
    creditInterestRate: "",
    creditDuration: "",
  };
  if (state.houseLocation.touched && state.houseLocation.value === "") {
    errors["houseLocation"] = "This field is required";
  }
  if (state.houseType.touched && state.houseType.value === "") {
    errors["houseType"] = "This field is required";
  }
  if (state.housePrice.touched && state.housePrice.value === 0) {
    errors["housePrice"] = "This field is required";
  }
  if (
    state.houseLocation.value &&
    state.taxationRegime.touched &&
    state.taxationRegime.value === ""
  ) {
    errors["taxationRegime"] = "This field is required";
  }
  if (
    state.houseLocation.value === "Brussels" &&
    state.housePrice.value > 600000 &&
    state.taxationRegime.value === "BXL_WITH_ABATTEMENT_200"
  ) {
    errors["taxationRegime"] =
      "The abbatement is only available for house/appartement under 600.000 €";
  }

  state.borrowers.forEach((borrower: Borrower, i: number) => {
    if (borrower.monthlyIncome.touched && borrower.monthlyIncome.value === 0) {
      errors[("monthlyIncome_" + (i + 1)) as keyof typeof errors] =
        "This field is required";
    }
  });
  if (
    state.initialContribution.touched &&
    state.initialContribution.value === 0
  ) {
    errors["initialContribution"] = "This field is required";
  }
  if (
    state.creditInterestRate.touched &&
    state.creditInterestRate.value === 0
  ) {
    errors["creditInterestRate"] = "This field is required";
  }
  if (state.creditDuration.touched && state.creditDuration.value === "") {
    errors["creditDuration"] = "This field is required";
  }
  return errors;
};

// 1 - CREATING CONTEXT
const HousingFormContext = createContext<HousingForm>({} as HousingForm);

// 2 - CREATING PROVIDER (will be used in the Housing Page)
const HousingFormProvider = ({ children }: HousingFormProviderProps) => {
  const [housingFormState, dispatch] = useReducer(HousingFormReducer, {
    houseLocation: {
      value: "",
      touched: false,
    },
    houseType: {
      value: "",
      touched: false,
    },
    housePrice: {
      value: 0,
      touched: false,
    },
    taxationRegime: {
      value: "",
      touched: false,
    },
    initialContribution: {
      value: 0,
      touched: false,
    },
    creditInterestRate: {
      value: 0,
      touched: false,
    },
    creditDuration: {
      value: "",
      touched: false,
    },
    touched: {},
    borrowers: [
      {
        monthlyIncome: {
          value: 0,
          touched: false,
        },
      },
    ],
  });
  const [housingFormValidationState, setHousingFormValidationState] = useState({
    houseSituation: false,
    personalSituation: false,
    financialSituation: false,
    housingResults: false,
  });
  const [housingFormErrorState, setHousingFormErrorState] = useState({});

  useEffect(() => {
    setHousingFormErrorState(getFormErrorState(housingFormState));
  }, [housingFormState]);

  useEffect(() => {
    setHousingFormValidationState(
      getFormValidationState(housingFormState, housingFormErrorState)
    );
  }, [housingFormState, housingFormErrorState]);

  return (
    <HousingFormContext.Provider
      value={{
        housingFormState,
        housingFormValidationState,
        housingFormErrorState,
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

export { HousingFormProvider, useHousingForm, HousingFormActionKind };
export type { Borrower };
export type { HousingFormState };
