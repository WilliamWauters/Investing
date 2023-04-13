import { Location } from "@/utils/enums/Location";

enum TaxationRegime {
  FLA_INCREASED = "FLA_INCREASED",
  FLA_NORMAL = "FLA_NORMAL",
  BXL_WITHOUT_ABATTEMENT = "BXL_WITHOUT_ABATTEMENT",
  BXL_WITH_ABATTEMENT_200 = "BXL_WITH_ABATTEMENT_200",
  WAL_NORMAL = "WAL_NORMAL",
  WAL_NORMAL_ABATTEMENT = "WAL_NORMAL_ABATTEMENT",
  WAL_DECREASED = "WAL_DECREASED",
  WAL_DECREASED_ABATTEMENT = "WAL_DECREASED_ABATTEMENT",
}

var taxationRegimes = [
  {
    value: TaxationRegime.FLA_INCREASED,
    label: "Increased Rate - 12%",
    region: Location.FLA,
  },
  {
    value: TaxationRegime.FLA_NORMAL,
    label: "Normal Rate - 3%",
    region: Location.FLA,
  },
  {
    value: TaxationRegime.BXL_WITH_ABATTEMENT_200,
    label: "Normal Rate - 12% + Abbatement 200.000 €",
    region: Location.BXL,
  },
  {
    value: TaxationRegime.BXL_WITHOUT_ABATTEMENT,
    label: "Normal Rate - 12%",
    region: Location.BXL,
  },
  {
    value: TaxationRegime.WAL_NORMAL,
    label: "Normal Rate - 12,5%",
    region: Location.WAL,
  },
  {
    value: TaxationRegime.WAL_NORMAL_ABATTEMENT,
    label: "Normal Rate - 12,5% + Abbatement",
    region: Location.WAL,
  },
  {
    value: TaxationRegime.WAL_DECREASED,
    label: "Decreased Rate - 6%",
    region: Location.WAL,
  },
  {
    value: TaxationRegime.WAL_DECREASED_ABATTEMENT,
    label: "Decreased Rate - 6% + Abbatement",
    region: Location.WAL,
  },
];

export { TaxationRegime, taxationRegimes };
