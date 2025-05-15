import { Mail } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { useFetcher } from "react-router";
import { css } from "~/styled-system/css";

import { AuthWrapper, Input } from "@/shared/ui";
import { button } from "@/style/recipes/button";
import { recaptcha } from "@/style/recipes/captcha";
import { inputIcon } from "@/style/recipes/img";
import { useClient } from "@/utils/hooks";
import {
  emailValidator,
  isMatchValidator,
  isNotEmptyValidator,
  passwordValidator,
} from "@/utils/validators";

import * as style from "./style";

const RegisterPage = () => {
  const { Form } = useFetcher();
  const isClient = useClient();
  return (
    <AuthWrapper type="register">
      <Form className={style.form()}>
        <Input
          className={style.input({ size: "compact" })}
          containerClassName={style.inputContainer({ pos: "twoOnLine" })}
          name="first_name"
          variant="border"
          placeholder="Ваше имя"
          validator={isNotEmptyValidator}
        />
        <Input
          className={style.input({ size: "compact" })}
          containerClassName={style.inputContainer({ pos: "twoOnLine" })}
          name="last_name"
          variant="border"
          placeholder="Ваша фамилия"
          validator={isNotEmptyValidator}
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
        />
        <Input
          required
          validator={passwordValidator}
          name="password"
          isSecure
          placeholder="Пароль"
          variant={"border"}
          className={style.input()}
          containerClassName={style.inputContainer()}
        />
        <Input
          required
          validator={isMatchValidator("password", "Пароли")}
          name="passwordRepeat"
          isSecure
          placeholder="Повторите пароль"
          variant={"border"}
          className={style.input()}
          containerClassName={style.inputContainer()}
        />
        {/* {isClient && (
          <div className={recaptcha()}>
            <ReCAPTCHA sitekey={import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY} />
          </div>
        )} */}
        <button
          type={"submit"}
          className={`${button({ variant: "primary", size: "big" })} ${css({ width: "100%", gridColumn: "1 / 3" })}`}
        >
          Зарегистрироваться
        </button>
      </Form>
    </AuthWrapper>
  );
};

export default RegisterPage;
