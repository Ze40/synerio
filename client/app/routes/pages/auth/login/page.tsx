import { Mail } from "lucide-react";
import { useFetcher } from "react-router";
import { css } from "~/styled-system/css";

import { AuthServices } from "@/feat";
import { AuthWrapper, Input, Line } from "@/shared/ui";
import { button } from "@/style/recipes/button";
import { inputIcon } from "@/style/recipes/img";
import { emailValidator, passwordValidator } from "@/utils/validators";

import * as style from "./style";

const LoginPage = () => {
  const { Form } = useFetcher();
  return (
    <AuthWrapper type="login">
      <Form className={style.form()}>
        <Input
          required
          validator={emailValidator}
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
      </Form>
    </AuthWrapper>
  );
};

export default LoginPage;
