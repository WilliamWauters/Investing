import {
  NotaryFees,
  getLaonPaymentInfo,
  getMonthlyPaymentCapacity,
  getNotaryFees,
} from "@/utils/calculation";
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

interface RealEstateForm {
  realEstateFormState: RealEstateFormState;
  realEstateFormValidationState: any;
  realEstateFormErrorState: any;
  dispatch: any;
}

interface RealEstateFormState {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  houseLocation: inputState;
  housePrice: inputState;
  taxationRegime: inputState;
  initialContribution: inputState;
  creditInterestRate: inputState;
  creditDuration: inputState;
  touched: any;
  borrowers: Borrower[];
  notaryFees: NotaryFees;
  monthlyIncomeTotal: number;
  monthlyPaymentCapacity: number;
  loan: number;
  loanMonthlyPayment: number;
  loanTotalPayment: number;
}

interface Borrower {
  monthlyIncome: inputState;
  monthlyExpenses: inputState;
}

type RealEstateFormProviderProps = {
  children: any;
};

enum RealEstateFormActionKind {
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
  SET_FORM = "SET_FORM",
}

interface RealEstateFormAction {
  type: RealEstateFormActionKind;
  payload: any;
}

const editSimulation = (state: RealEstateFormState) => {
  // Check if there is already an value created for the list of simualtion
  const realEstateSimulationsJSON = localStorage.getItem(
    "realEstateSimulationsJSON"
  );
  var simulations = realEstateSimulationsJSON
    ? JSON.parse(realEstateSimulationsJSON)
    : null;

  if (simulations) {
    const itemIndex = simulations.findIndex(
      (item: RealEstateFormState) => item.id === state.id
    );
    if (itemIndex !== -1) {
      simulations[itemIndex] = state;
      localStorage.setItem(
        "realEstateSimulationsJSON",
        JSON.stringify(simulations)
      );
    }
  }
};

// Our reducer function that uses a switch statement to handle our actions
function RealEstateFormReducer(
  state: RealEstateFormState,
  action: RealEstateFormAction
) {
  state.notaryFees = getNotaryFees(
    state.housePrice.value,
    state.taxationRegime.value
  );
  state.monthlyPaymentCapacity = getMonthlyPaymentCapacity(
    state.borrowers.reduce(
      (accumulator, currentValue) =>
        accumulator +
        currentValue.monthlyIncome.value -
        currentValue.monthlyExpenses.value,
      0
    )
  );
  state.monthlyIncomeTotal = state.borrowers.reduce(
    (accumulator, currentValue) =>
      accumulator +
      currentValue.monthlyIncome.value -
      currentValue.monthlyExpenses.value,
    0
  );
  const { loan, monthlyPayment, totalPayment } = getLaonPaymentInfo(
    state.housePrice.value,
    state.initialContribution.value,
    state.notaryFees.total,
    state.creditInterestRate.value,
    Number(state.creditDuration.value)
  );
  state.loan = loan;
  state.loanMonthlyPayment = monthlyPayment;
  state.loanTotalPayment = totalPayment;

  const { type, payload } = action;

  switch (type) {
    case RealEstateFormActionKind.SET_FORM:
      return payload;
    case RealEstateFormActionKind.UPDATE_INPUT:
      var taxationRegimState = state["taxationRegime"];
      if (payload.name === "houseLocation") {
        taxationRegimState.touched = false;
        taxationRegimState.value = "";
      }
      editSimulation(state);
      return {
        ...state,
        ["taxationRegime"]: taxationRegimState,
        [payload.name]: {
          ...state[payload.name as keyof RealEstateFormState],
          value: payload.data,
        },
      };
    case RealEstateFormActionKind.UPDATE_MONEY_INCREASE:
      editSimulation(state);
      return {
        ...state,
        [payload.name]: {
          ...state[payload.name as keyof RealEstateFormState],
          value:
            state[payload.name as keyof RealEstateFormState].value +
            payload.step,
        },
      };
    case RealEstateFormActionKind.UPDATE_MONEY_DECREASE:
      editSimulation(state);
      return {
        ...state,
        [payload.name]: {
          ...state[payload.name as keyof RealEstateFormState],
          value:
            state[payload.name as keyof RealEstateFormState].value -
            payload.step,
        },
      };
    case RealEstateFormActionKind.TOCUHED_INPUT:
      editSimulation(state);
      return {
        ...state,
        [payload.name]: {
          ...state[payload.name as keyof RealEstateFormState],
          touched: true,
        },
      };
    case RealEstateFormActionKind.UPD_INPUT:
      editSimulation(state);
      return {
        ...state,
        [payload.name]: payload.data,
      };
    case RealEstateFormActionKind.ADD_BORROWER:
      editSimulation(state);
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
            monthlyExpenses: {
              value: 0,
              touched: false,
              error: "",
            },
          },
        ],
      };
    case RealEstateFormActionKind.DEL_BORROWER:
      const copyArr = [...state.borrowers];
      copyArr.splice(-1);
      editSimulation(state);
      return {
        ...state,
        borrowers: [...copyArr],
      };
    case RealEstateFormActionKind.UPDATE_INPUT_BORROWER:
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
      editSimulation(state);
      return {
        ...state,
        ["borrowers"]: borrowers,
      };
    case RealEstateFormActionKind.UPDATE_MONEY_INCREASE_BORROWER:
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
      editSimulation(state);
      return {
        ...state,
        ["borrowers"]: borrowersInc,
      };
    case RealEstateFormActionKind.UPDATE_MONEY_DECREASE_BORROWER:
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
      editSimulation(state);
      return {
        ...state,
        ["borrowers"]: borrowersDec,
      };
    case RealEstateFormActionKind.TOUCHED_BORROWER:
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
      editSimulation(state);
      return {
        ...state,
        ["borrowers"]: borrowersTouched,
      };
    case RealEstateFormActionKind.TOUCHED_FORM:
      if (payload.data === 0) {
        editSimulation(state);
        return {
          ...state,
          ["houseLocation"]: {
            ...state["houseLocation" as keyof RealEstateFormState],
            touched: true,
          },
          ["housePrice"]: {
            ...state["housePrice" as keyof RealEstateFormState],
            touched: true,
          },
          ["taxationRegime"]: {
            ...state["taxationRegime" as keyof RealEstateFormState],
            touched: state.houseLocation.value ? true : false,
          },
        };
      }
      if (payload.data === 1) {
        // 1. Make a shallow copy of the items
        let borrowersTest = [...state.borrowers];
        borrowersTest.map((borrowerTest) => {
          borrowerTest.monthlyIncome.touched = true;
          borrowerTest.monthlyExpenses.touched = true;
          editSimulation(state);
          return {
            borrowerTest,
          };
        });

        editSimulation(state);
        return {
          ...state,
          ["borrowers"]: borrowersTest,
        };
      }
      if (payload.data === 2) {
        editSimulation(state);
        return {
          ...state,
          ["initialContribution"]: {
            ...state["initialContribution" as keyof RealEstateFormState],
            touched: true,
          },
          ["creditInterestRate"]: {
            ...state["creditInterestRate" as keyof RealEstateFormState],
            touched: true,
          },
          ["creditDuration"]: {
            ...state["creditDuration" as keyof RealEstateFormState],
            touched: true,
          },
        };
      }
    default:
      editSimulation(state);
      return state;
  }
}

const getFormValidationState = (state: any, errorState: any) => {
  return {
    houseSituation: isHouseSituationFormValid(state, errorState),
    personalSituation: isPersonalSituationFormValid(state, errorState),
    financialSituation: isFinancialSituationFormValid(state, errorState),
    realEstateResults: true,
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
    if (errorState["monthlyExpenses_" + (i + 1)] !== "") {
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
    housePrice: "",
    taxationRegime: "",
    initialContribution: "",
    monthlyIncome_1: "",
    monthlyExpenses_1: "",
    monthlyIncome_2: "",
    monthlyExpenses_2: "",
    creditInterestRate: "",
    creditDuration: "",
  };
  if (state.houseLocation.touched && state.houseLocation.value === "") {
    errors["houseLocation"] = "This field is required";
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
const RealEstateFormContext = createContext<RealEstateForm>(
  {} as RealEstateForm
);

// 2 - CREATING PROVIDER (will be used in the RealEstate Page)
const RealEstateFormProvider = ({ children }: RealEstateFormProviderProps) => {
  const [realEstateFormState, dispatch] = useReducer(RealEstateFormReducer, {
    houseLocation: {
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
        monthlyExpenses: {
          value: 0,
          touched: false,
        },
      },
    ],
    notaryFees: 0,
    monthlyIncomeTotal: 0,
    monthlyPaymentCapacity: 0,
    loan: 0,
    loanMonthlyPayment: 0,
    loanTotalPayment: 0,
  });
  const [realEstateFormValidationState, setRealEstateFormValidationState] =
    useState({
      houseSituation: false,
      personalSituation: false,
      financialSituation: false,
      realEstateResults: false,
    });
  const [realEstateFormErrorState, setRealEstateFormErrorState] = useState({});

  useEffect(() => {
    setRealEstateFormErrorState(getFormErrorState(realEstateFormState));
  }, [realEstateFormState]);

  useEffect(() => {
    setRealEstateFormValidationState(
      getFormValidationState(realEstateFormState, realEstateFormErrorState)
    );
  }, [realEstateFormState, realEstateFormErrorState]);

  return (
    <RealEstateFormContext.Provider
      value={{
        realEstateFormState,
        realEstateFormValidationState,
        realEstateFormErrorState,
        dispatch,
      }}
    >
      {children}
    </RealEstateFormContext.Provider>
  );
};

// 3 - EXPOSING CONTEXT THROUGH HOOK
const useRealEstateForm = () => {
  return useContext(RealEstateFormContext);
};

export { RealEstateFormProvider, useRealEstateForm, RealEstateFormActionKind };
export type { Borrower };
export type { RealEstateFormState };
