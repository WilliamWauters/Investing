enum Location {
  BXL = "BXL",
  FLA = "FLA",
  WAL = "WAL",
}

var locations = [
  { value: Location.BXL, label: "Brussels" },
  { value: Location.FLA, label: "Flanders" },
  { value: Location.WAL, label: "Wallonia" },
];

function getLabelByLocation(locationValue: Location) {
  const locationObj = locations.find((loc) => loc.value === locationValue);
  return locationObj ? locationObj.label : null;
}

export { Location, locations, getLabelByLocation };
