import { useEffect, useState } from "react";

import { Mail } from "lucide-react";
import { useFetcher } from "react-router";
import { css } from "~/styled-system/css";

import { AuthServices, Captcha } from "@/feat";
import { AuthWrapper, Input, Line, Toast } from "@/shared/ui";
import { button } from "@/style/recipes/button";
import { inputIcon } from "@/style/recipes/img";
import { useClient, useTimeout } from "@/utils/hooks";
import {
  emailValidator,
  isMatchValidator,
  isNotEmptyValidator,
  passwordValidator,
} from "@/utils/validators";

import * as style from "./style";

const RegisterPage = () => {
  const fetcher = useFetcher();
  const [isCaptcha, setIsCaptcha] = useState<boolean>(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>("");
  const [error, setError] = useState<string | null>(null);
  const timeout = useTimeout();

  useEffect(() => {
    if (captchaValue) {
      timeout(() => setIsCaptcha(false), 300);
    }
  }, [captchaValue]);

  const [formData, setFormData] = useState<{ [key: string]: string | null }>({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    passwordRepeat: null,
  });

  const handleChange = (value: string | null, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    for (const key in formData) {
      if (formData[key] === null) {
        setError("Все поля должны быть заполнены");
        return;
      }
    }

    setIsCaptcha(true);

    if (!captchaValue) {
      setError("Пожалуйста, подтвердите, что вы не робот");
      return;
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        form.append(key, value);
      }
    });

    if (captchaValue) {
      form.append("captcha", captchaValue);
    }

    fetcher.submit(form, {
      method: "post",
      action: "/login",
    });
  };

  return (
    <AuthWrapper type="register">
      <form className={style.form()} onSubmit={handleSubmit}>
        <Input
          className={style.input({ size: "compact" })}
          containerClassName={style.inputContainer({ pos: "twoOnLine" })}
          name="firstName"
          variant="border"
          placeholder="Ваше имя"
          validator={isNotEmptyValidator}
          onChange={handleChange}
        />
        <Input
          className={style.input({ size: "compact" })}
          containerClassName={style.inputContainer({ pos: "twoOnLine" })}
          name="lastName"
          variant="border"
          placeholder="Ваша фамилия"
          validator={isNotEmptyValidator}
          onChange={handleChange}
        />
        <Input
          required
          validator={emailValidator}
          containerClassName={style.inputContainer()}
          name="email"
          icon={<Mail size={30} className={inputIcon()} />}
          placeholder="Почта"
          variant={"border"}
          className={style.input()}
          onChange={handleChange}
        />
        <Input
          required
          validator={passwordValidator}
          name="password"
          isSecure
          placeholder="Пароль"
          variant={"border"}
          className={style.input({ size: "compact" })}
          containerClassName={style.inputContainer({ pos: "twoOnLine" })}
          onChange={handleChange}
        />
        <Input
          required
          validator={isMatchValidator(formData["password"] || Math.random().toString(), "Пароли")}
          name="passwordRepeat"
          isSecure
          placeholder="Повторите пароль"
          variant={"border"}
          className={style.input({ size: "compact" })}
          containerClassName={style.inputContainer({ pos: "twoOnLine" })}
          onChange={handleChange}
        />
        <button
          type={"submit"}
          className={`${button({ variant: "primary", size: "big" })} ${css({ width: "100%", gridColumn: "1 / 3" })}`}
        >
          Зарегистрироваться
        </button>
        <div className={style.lines()}>
          <Line weigth={2} length={30} color="gray" />
          или
          <Line weigth={2} length={30} color="gray" />
        </div>
        <AuthServices className={css({ gridColumn: "1 / 3" })} />
        <Captcha
          siteKey={import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY as string}
          isOpen={isCaptcha}
          onChange={(token) => setCaptchaValue(token)}
        />
        <Toast
          onClose={() => setError(null)}
          isOpen={error !== null}
          title="Ошибка:"
          massage={error !== null ? error : ""}
        />
      </form>
    </AuthWrapper>
  );
};

export default RegisterPage;
