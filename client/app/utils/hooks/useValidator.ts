import { useState } from "react";

import type { Validator } from "@/utils/validators";

export const useValidator = (validator: Validator | Validator[]) => {
  const [error, setError] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);

  const validate = (value: string) => {
    if (!Array.isArray(validator)) {
      const result = validator(value);
      if (result === true) {
        setError("");
        setIsCorrect(true);
      } else {
        setError(result);
        setIsCorrect(false);
      }
    } else {
      let hasError = false;

      for (const val of validator) {
        const result = val(value);
        if (result !== true) {
          setError(result);
          setIsCorrect(false);
          hasError = true;
          break;
        }
      }

      if (!hasError) {
        setError("");
        setIsCorrect(true);
      }
    }
  };

  return {
    error,
    isCorrect,
    validate,
  };
};
