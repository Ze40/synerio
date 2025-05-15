import { useEffect, useState } from "react";

import { Mail } from "lucide-react";
import { useFetcher } from "react-router";
import { css } from "~/styled-system/css";

import { AuthServices, Captcha } from "@/feat";
import { AuthWrapper, Input, Line, Toast } from "@/shared/ui";
import { button } from "@/style/recipes/button";
import { inputIcon } from "@/style/recipes/img";
import { useTimeout } from "@/utils/hooks";
import { emailValidator, passwordValidator } from "@/utils/validators";

import * as style from "./style";

const LoginPage = () => {
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
    email: null,
    password: null,
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
    <AuthWrapper type="login">
      <form className={style.form()} onSubmit={handleSubmit}>
        <Input
          required
          validator={emailValidator}
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
          onChange={handleChange}
        />
        <button
          type={"submit"}
          className={`${button({ variant: "primary", size: "big" })} ${css({ width: "100%" })}`}
        >
          Войти
        </button>
        <div className={style.lines()}>
          <Line weigth={2} length={30} color="gray" />
          или
          <Line weigth={2} length={30} color="gray" />
        </div>
        <AuthServices />
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

export default LoginPage;
