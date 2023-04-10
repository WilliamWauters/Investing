enum TaxationRegime {
  BXL_WITHOUT_ABATTEMENT = "BXL_WITHOUT_ABATTEMENT",
  BXL_WITH_ABATTEMENT_200 = "BXL_WITH_ABATTEMENT_200",
}

var taxationRegimes = [
  {
    value: TaxationRegime.BXL_WITH_ABATTEMENT_200,
    label: "With Abbatement 200.000 €",
  },
  {
    value: TaxationRegime.BXL_WITHOUT_ABATTEMENT,
    label: "Without Abbatement",
  },
];

export { TaxationRegime, taxationRegimes };
