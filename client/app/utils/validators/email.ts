import type { Validator } from "./types";

export const emailValidator: Validator = (value) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!value) return "Это обязательное поле";

  if (pattern.test(value)) {
    return true;
  }

  return "Некоректная почта";
};
