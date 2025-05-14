import type { Validator } from "./types";

export const isNotEmptyValidator: Validator = (value) => {
  if (!value) return "Это обязательное поле";
  return true;
};
