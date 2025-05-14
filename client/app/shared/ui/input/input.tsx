import {
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactElement,
  useRef,
  useState,
} from "react";

import { CircleAlert, Eye, type LucideProps } from "lucide-react";

import { useValidator } from "@/shared/hooks";
import type { Validator } from "@/utils/validators";

import * as style from "./style";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  icon?: ReactElement;
  name: string;
  isSecure?: boolean;
  variant: "border";
  validator?: Validator;
}

const Input = ({
  className,
  label,
  icon,
  name,
  variant,
  isSecure = false,
  validator = () => true,
  ...props
}: InputProps) => {
  const { error, isCorrect, validate } = useValidator(validator);
  const [isVisible, setVisible] = useState<boolean>(false);
  const timeRef = useRef<number | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
    timeRef.current = window.setTimeout(() => {
      validate(value);
    }, 500);
  };

  if (isSecure) {
    return (
      <div className={style.container()}>
        {label && (
          <label htmlFor={name} className={style.label()}>
            {label}
          </label>
        )}
        <div className={`${style.inputBox({ variant, correct: isCorrect })} ${className}`}>
          <button type="button" onClick={() => setVisible(!isVisible)}>
            {icon && typeof icon === "string" ? <img src={icon} alt={name} /> : icon}
            {!icon && <Eye />}
          </button>
          <input
            {...props}
            name={name}
            className={style.input()}
            type={isVisible ? props.type : "password"}
          />
        </div>
        {!!error && (
          <div className={style.error()}>
            <CircleAlert size={20} />
            {error}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={style.container()}>
      {label && (
        <label htmlFor={name} className={style.label()}>
          {label}
        </label>
      )}
      <div className={`${style.inputBox({ variant, correct: isCorrect })} ${className}`}>
        {icon && typeof icon === "string" ? <img src={icon} alt={name} /> : icon}
        <input {...props} name={name} className={style.input()} onChange={handleChange} />
      </div>
      {!!error && (
        <div className={style.error()}>
          <CircleAlert size={20} />
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;
