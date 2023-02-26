const formatMoney = (value: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(
    value
  );

export default formatMoney;
