import type { Validator } from "./types";

export const passwordValidator: Validator = (value) => {
  const hasLowerAndUpper = /(?=.*[a-z])(?=.*[A-Z])/;
  const hasDigit = /[0-9]/;
  const hasSpecial = /[_\.,!]/;
  console.log(1);
  if (!value) {
    return "Это обязательное поле";
  }
  if (value.length < 8) {
    return "Длина пароля должна быть больше 8 символов";
  }

  if (value.length > 16) {
    return "Длина пароля должна быть меньше 16 символов";
  }

  if (!hasLowerAndUpper.test(value)) {
    return "Пароль должен содержать латинские буквы в верхнем и нижнем регистре";
  }

  if (!hasDigit.test(value)) {
    return "Пароль должен содержать хотя бы одну цифру";
  }

  if (!hasSpecial.test(value)) {
    return "Пароль должен содержать хотя бы один спецсимвол: . , ! _";
  }

  return true;
};
