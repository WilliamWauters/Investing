import { TaxationRegime } from "@/contexts/HousingFormContext";

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
  if (
    taxationRegime === TaxationRegime.BXL_WITH_ABATTEMENT_175 ||
    taxationRegime === TaxationRegime.BXL_WITH_ABATTEMENT_200
  ) {
    var abattement = 0;
    if (taxationRegime === TaxationRegime.BXL_WITH_ABATTEMENT_175) {
      abattement = 175000;
    } else if (taxationRegime === TaxationRegime.BXL_WITH_ABATTEMENT_200) {
      abattement = 200000;
    }
    if (priceBase < abattement) {
      priceBase = 0;
    } else {
      priceBase = priceBase - abattement;
    }
  }
  return priceBase * 0.125;
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

export { getNotaryFees };
