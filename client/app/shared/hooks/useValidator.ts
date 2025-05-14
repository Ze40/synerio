import { useState } from "react";

import type { Validator } from "@/utils/validators";

export const useValidator = (validator: Validator) => {
  const [error, setError] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);

  const validate = (value: string) => {
    const result = validator(value);

    if (result === true) {
      setError("");
      setIsCorrect(true);
    } else {
      setError(result);
      setIsCorrect(false);
    }
  };

  return {
    error,
    isCorrect,
    validate,
  };
};
