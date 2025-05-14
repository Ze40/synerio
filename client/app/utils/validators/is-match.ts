import type { Validator } from "./types";

export const isMatchValidator = (match: string, who: string = "Поля") => {
  const validator: Validator = (value) => {
    if (match === value) return true;
    return `${who} не совпадают`;
  };
  return validator;
};
