import { Product } from "./types";

export const currency = (value: number) => {
  const formatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  return formatter.format(value);
};

