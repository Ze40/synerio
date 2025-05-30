import {
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";

import { CircleAlert, Eye } from "lucide-react";

import { useTimeout, useValidator } from "@/utils/hooks";
import type { Validator } from "@/utils/validators";

import * as style from "./style";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  className?: string;
  label?: string;
  icon?: ReactElement;
  name: string;
  isSecure?: boolean;
  variant: "border";
  validator?: Validator[] | Validator;
  containerClassName?: string;
  onChange?: (value: string | null, name: string) => void;
  value?: string;
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
  value,
  onChange,
  ...props
}: InputProps) => {
  const { error, isCorrect, validate } = useValidator(validator);
  const [isVisible, setVisible] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [val, setVal] = useState<string | null>(value || null);
  const timeout = useTimeout();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    timeout(() => {
      validate(value);
    }, 300);
    setVal(value || null);
  };

  useEffect(() => {
    if (onChange) {
      if (!isCorrect) {
        onChange(null, name);
      } else {
        onChange(val, name);
      }
    }
  }, [isCorrect, val]);

  if (isSecure) {
    return (
      <div
        className={`${style.container({ isContainerStyle: !!containerClassName })} ${containerClassName}`}
      >
        {label && (
          <label htmlFor={name} className={style.label()}>
            {label}
          </label>
        )}
        <div
          onClick={() => {
            inputRef.current?.focus();
          }}
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
            value={val || ""}
            ref={inputRef}
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
    <div
      className={`${style.container({ isContainerStyle: !!containerClassName })} ${containerClassName}`}
    >
      {label && (
        <label htmlFor={name} className={style.label()}>
          {label}
        </label>
      )}
      <div
        onClick={() => {
          inputRef.current?.focus();
        }}
        className={`${style.inputBox({ variant, correct: isCorrect, focus: isFocus })} ${className}`}
      >
        {icon && (
          <div className={style.iconContainer()}>
            {typeof icon === "string" ? <img src={icon} alt={name} /> : icon}
          </div>
        )}
        <input
          ref={inputRef}
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
