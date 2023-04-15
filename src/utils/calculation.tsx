import { TaxationRegime, taxationRegimes } from "./enums/TaxationRegime";

interface NotaryFees {
  fees: Fee[];
  total: number;
}

class Fee {
  name: string;
  value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}

const getRegistrationFee = (price: number, taxationRegime: string) => {
  var priceBase = price;
  if (taxationRegime) {
    var taxationRegimeDetails = taxationRegimes.filter(
      (element) => element["value"] === taxationRegime
    )[0];

    if (priceBase < taxationRegimeDetails.abattement) {
      priceBase = 0;
    } else {
      priceBase = priceBase - taxationRegimeDetails.abattement;
    }
    return priceBase * taxationRegimeDetails.rate;
  } else {
    return 0;
  }
};

const getNotaryFee = (price: number) => {
  var registratierechten = 200000 * 0.125;
  registratierechten -= 21875;

  registratierechten = Math.max(registratierechten, 50.0);

  var notaryFee = (4.56 * Math.min(price, 7500)) / 100;

  if (price > 7500.0) {
    notaryFee = notaryFee + ((Math.min(price, 17500.0) - 7500.0) * 2.85) / 100;
  }
  if (price > 17500.0) {
    notaryFee = notaryFee + ((Math.min(price, 30000.0) - 17500.0) * 2.28) / 100;
  }
  if (price > 30000.0) {
    notaryFee = notaryFee + ((Math.min(price, 45495.0) - 30000.0) * 1.71) / 100;
  }
  if (price > 45495.0) {
    notaryFee = notaryFee + ((Math.min(price, 64095.0) - 45495.0) * 1.14) / 100;
  }
  if (price > 64095.0) {
    notaryFee =
      notaryFee + ((Math.min(price, 250095.0) - 64095.0) * 0.57) / 100;
  }
  if (price > 250095.0) {
    notaryFee = notaryFee + ((price - 250095.0) * 0.057) / 100;
  }

  return (
    parseInt(
      (((notaryFee = Math.max(notaryFee, 8.48)) + 0.005) * 100).toString()
    ) / 100
  );
};

const getTVA = (price: number) => {
  var rateTVA = 0.21;
  var u = 800;
  return Math.round(rateTVA * (getNotaryFee(price) + u) * 100) / 100;
};

const getNotaryFees = (price: number, taxationRegime: string): NotaryFees => {
  var fees = [
    new Fee("Registration Fee", getRegistrationFee(price, taxationRegime)),
    new Fee("Notary Fee", getNotaryFee(price)),
    new Fee("Annexes Fee", 100),
    new Fee("Administrative Fee", 750),
    new Fee("Disbursement Fee", 262),
    new Fee("Mortgage Transcript Fee", 240),
    new Fee("Write Permission", 100),
    new Fee("TVA", getTVA(price)),
  ];
  return {
    fees: fees,
    total: fees.reduce(function (acc, obj) {
      return acc + obj.value;
    }, 0),
  };
};

const getMonthlyPaymentCapacity = (totalNettoSalary: number) => {
  return totalNettoSalary * 0.33;
};

function roundTo(n: number, digits: number) {
  var negative = false;
  if (digits === undefined) {
    digits = 0;
  }
  if (n < 0) {
    negative = true;
    n = n * -1;
  }
  var multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  n = +(Math.round(n) / multiplicator).toFixed(digits);
  if (negative) {
    n = +(n * -1).toFixed(digits);
  }
  return n;
}

const getLoan = (
  housePrice: number,
  initialContribution: number,
  notaryFees: number
) => {
  return housePrice + notaryFees - initialContribution;
};

const getMonthlyLoanPayement = (
  loan: number,
  interest: number,
  duration: number
) => {
  var fractionUp = interest / 100 / 12;
  var fractionUpNext = interest / 100 / 12 + 1;
  var fractionDown = Number(duration) * 12;
  var fractionResult = Math.pow(fractionUpNext, fractionDown);
  var calculationOne = fractionUp * fractionResult;
  var calculationTwo = fractionResult - 1;
  var final = (calculationOne / calculationTwo) * loan;
  return final;
};

const getTotalLoanPayement = (
  monthlyLoandPayment: number,
  duration: number
) => {
  return monthlyLoandPayment * Number(duration) * 12;
};

const getLaonPaymentInfo = (
  housePrice: number,
  initialContribution: number,
  notaryFees: number,
  interest: number,
  duration: number
) => {
  const loan = getLoan(housePrice, initialContribution, notaryFees);

  return {
    loan: loan,
    monthlyPayment: roundTo(
      getMonthlyLoanPayement(loan, interest, duration),
      2
    ),
    totalPayment: getTotalLoanPayement(
      roundTo(getMonthlyLoanPayement(housePrice, interest, duration), 2),
      duration
    ),
  };
};

export { getNotaryFees, getLaonPaymentInfo, getMonthlyPaymentCapacity };
