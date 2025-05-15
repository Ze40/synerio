import { useEffect, useState } from "react";

import { Mail } from "lucide-react";
import { useFetcher, useNavigate } from "react-router";
import { css } from "~/styled-system/css";

import { Captcha, OAuthServices } from "@/feat";
import { authService } from "@/feat/auth/services";
import { AuthWrapper, Input, Line, Modal, Toast } from "@/shared/ui";
import { button } from "@/style/recipes/button";
import { inputIcon } from "@/style/recipes/img";
import { FetchError } from "@/utils/fetch";
import { useTimeout } from "@/utils/hooks";
import { emailValidator, passwordValidator } from "@/utils/validators";

import type { Route } from "./+types/page";
import * as style from "./style";

export const clientAction = async ({ request }: Route.ClientActionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const code = formData.get("code");
  const captcha = formData.get("captcha");

  if (!email || !password) {
    return { error: "Все поля обязательны!" };
  }

  if (code) {
    try {
      const user = await authService.login(
        { email: email.toString(), password: password.toString(), code: code.toString() },
        captcha?.toString()
      );

      return user;
    } catch (error) {
      if (error instanceof FetchError) {
        return { error: error.message };
      }
      return { error: "Неизвестная ошибка" };
    }
  }

  try {
    const user = await authService.login(
      { email: email.toString(), password: password.toString() },
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

const LoginPage = () => {
  const fetcher = useFetcher();
  const [isCaptcha, setIsCaptcha] = useState<boolean>(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>("");
  const [error, setError] = useState<string | null>(null);
  const [isTwoFactor, setIsTwoFactor] = useState<boolean>(false);
  const timeout = useTimeout();
  const navigate = useNavigate();

  useEffect(() => {
    if (fetcher.data && "error" in fetcher.data) {
      setError(fetcher.data.error as string);
      return;
    }
    if (fetcher.data && "message" in fetcher.data) {
      setIsTwoFactor(true);
      return;
    }
    if (fetcher.data) {
      navigate("/feat");
    }
  }, [fetcher.data]);

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
        action: "/login",
      }
    );
  };

  return (
    <AuthWrapper type="login">
      <fetcher.Form className={style.form()} method="post">
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
          onClick={handleSubmit}
          className={`${button({ variant: "primary", size: "big" })} ${css({ width: "100%" })}`}
        >
          Войти
        </button>
        <div className={style.lines()}>
          <Line weigth={2} length={30} color="gray" />
          или
          <Line weigth={2} length={30} color="gray" />
        </div>
        <OAuthServices />
        <Captcha
          siteKey={import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY as string}
          isOpen={isCaptcha && !captchaValue}
          onChange={(token) => setCaptchaValue(token)}
        />
        <Toast
          onClose={() => setError(null)}
          isOpen={error !== null}
          title="Ошибка:"
          massage={error !== null ? error : ""}
        />
        <Modal title="Подтверждение" isClosing={false} isOpen={isTwoFactor}>
          <div className={style.code()}>
            <Input
              containerClassName={style.codeInput()}
              name="code"
              variant="border"
              placeholder="Введите код"
              onChange={(value) => setFormData((prev) => ({ ...prev, ["code"]: value }))}
            />
            <button
              type="button"
              className={`${button({ variant: "primary", size: "big" })} ${css({ width: "100%" })}`}
              onClick={handleSubmit}
            >
              Отправить
            </button>
          </div>
        </Modal>
      </fetcher.Form>
    </AuthWrapper>
  );
};

export default LoginPage;
