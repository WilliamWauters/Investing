import { TaxationRegime } from "@/contexts/HousingFormContext";

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

const getFees = (price: number, taxationRegime: string) => {
  const registrationFee = getRegistrationFee(price, taxationRegime);
  const notaryFee = getNotaryFee(price);
  const annexesFee = 100;
  const administrativeFee = 750;
  const disbursementsFee = 262;
  const mortgageTranscriptFee = 240;
  const writePermissionFee = 100;
  const TVA = getTVA(price);
  return {
    fees: [
      {
        name: "Registration Fee",
        value: registrationFee,
      },
      {
        name: "Notary Fee",
        value: notaryFee,
      },
      {
        name: "Annexes Fee",
        value: annexesFee,
      },
      {
        name: "Administrative Fee",
        value: administrativeFee,
      },
      {
        name: "Disbursement Fee",
        value: disbursementsFee,
      },
      {
        name: "Mortgage Transcript Fee",
        value: mortgageTranscriptFee,
      },
      {
        name: "Write Permission Fee",
        value: writePermissionFee,
      },
    ],
    registrationFee: registrationFee,
    notaryFee: notaryFee,
    annexesFee: annexesFee,
    administrativeFee: administrativeFee,
    disbursementsFee: disbursementsFee,
    mortgageTranscriptFee: mortgageTranscriptFee,
    writePermissionFee: writePermissionFee,
    TVA: TVA,
    total:
      registrationFee +
      notaryFee +
      annexesFee +
      administrativeFee +
      disbursementsFee +
      mortgageTranscriptFee +
      writePermissionFee,
  };
};

export { getRegistrationFee, getNotaryFee, getTVA, getFees };
