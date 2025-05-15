import { useEffect, useState } from "react";

import { Mail } from "lucide-react";
import { useFetcher } from "react-router";
import { css } from "~/styled-system/css";

import { Captcha, OAuthServices } from "@/feat";
import { authService } from "@/feat/auth/services";
import { AuthWrapper, Input, Line, Toast } from "@/shared/ui";
import { button } from "@/style/recipes/button";
import { inputIcon } from "@/style/recipes/img";
import { FetchError } from "@/utils/fetch";
import { useTimeout } from "@/utils/hooks";
import {
  emailValidator,
  isMatchValidator,
  isNotEmptyValidator,
  passwordValidator,
} from "@/utils/validators";

import type { Route } from "./+types/page";
import * as style from "./style";

export const clientAction = async ({ request }: Route.ClientActionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const captcha = formData.get("captcha");
  const firstName = formData.get("firstName");
  const passwordRepeat = formData.get("passwordRepeat");
  const lastName = formData.get("lastName");

  if (!email || !password || !firstName || !lastName || !passwordRepeat) {
    console.log(email, password, firstName, lastName, passwordRepeat);
    return { error: "Все поля обязательны!" };
  }

  const name = firstName.toString() + " " + lastName.toString();

  try {
    const user = await authService.register(
      {
        email: email.toString(),
        password: password.toString(),
        name: name,
        passwordRepeat: passwordRepeat.toString(),
      },
      captcha?.toString()
    );

    return user;
  } catch (error) {
    if (error instanceof FetchError) {
      return { error: error.message };
    }
    return { error: "Неизвестная ошибка" };
  }
};

const RegisterPage = () => {
  const fetcher = useFetcher();
  const [isCaptcha, setIsCaptcha] = useState<boolean>(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>("");
  const [error, setError] = useState<string | null>(null);
  const timeout = useTimeout();

  useEffect(() => {
    console.log(fetcher.data);
    if (fetcher.data && "error" in fetcher.data) {
      setError(fetcher.data.error as string);
      return;
    }
  }, [fetcher.data]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    for (const key in formData) {
      if (formData[key] === null) {
        setError("Все поля должны быть заполнены");
        return;
      }
    }
    if (!captchaValue) {
      setError("Пожалуйста, пройдите капчу");
      setIsCaptcha(true);
      return;
    }

    if (captchaValue) {
      formData["captcha"] = captchaValue;
    }

    fetcher.submit(
      { ...formData },
      {
        method: "post",
        action: "/register",
      }
    );
  };

  return (
    <AuthWrapper type="register">
      <form className={style.form()} onSubmit={handleSubmit}>
        <Input
          className={style.input()}
          containerClassName={style.inputContainer({ pos: "twoOnLine" })}
          name="firstName"
          variant="border"
          placeholder="Ваше имя"
          validator={isNotEmptyValidator}
          onChange={handleChange}
        />
        <Input
          className={style.input()}
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
          className={style.input()}
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
          className={style.input()}
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
        <OAuthServices className={css({ gridColumn: "1 / 3" })} />
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
