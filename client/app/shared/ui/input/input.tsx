import {
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";

import { CircleAlert, Eye, type LucideProps } from "lucide-react";

import { useValidator } from "@/utils/hooks";
import type { Validator } from "@/utils/validators";

import * as style from "./style";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  icon?: ReactElement;
  name: string;
  isSecure?: boolean;
  variant: "border";
  validator?: Validator[] | Validator;
  containerClassName?: string;
}

const Input = ({
  className,
  label,
  icon,
  name,
  variant,
  isSecure = false,
  validator = () => true,
  containerClassName,
  ...props
}: InputProps) => {
  const { error, isCorrect, validate } = useValidator(validator);
  const [isVisible, setVisible] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
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
      <div className={`${style.container()} ${containerClassName}`}>
        {label && (
          <label htmlFor={name} className={style.label()}>
            {label}
          </label>
        )}
        <div
          className={`${style.inputBox({ variant, correct: isCorrect, focus: isFocus })} ${className}`}
        >
          <button
            type="button"
            onClick={() => setVisible(!isVisible)}
            className={style.iconContainer({ secure: isVisible })}
          >
            {icon && typeof icon === "string" ? <img src={icon} alt={name} /> : icon}
            {!icon && <Eye />}
          </button>
          <input
            {...props}
            name={name}
            className={style.input()}
            type={isVisible ? props.type : "password"}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={handleChange}
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
    <div className={`${style.container()} ${containerClassName}`}>
      {label && (
        <label htmlFor={name} className={style.label()}>
          {label}
        </label>
      )}
      <div
        className={`${style.inputBox({ variant, correct: isCorrect, focus: isFocus })} ${className}`}
      >
        {icon && (
          <div className={style.iconContainer()}>
            {typeof icon === "string" ? <img src={icon} alt={name} /> : icon}
          </div>
        )}
        <input
          {...props}
          name={name}
          className={style.input()}
          onChange={handleChange}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
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
};

export default Input;
