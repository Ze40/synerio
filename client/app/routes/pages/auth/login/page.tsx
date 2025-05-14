import { Mail } from "lucide-react";
import { useFetcher } from "react-router";

import { AuthWrapper, Input } from "@/shared/ui";
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
      </Form>
    </AuthWrapper>
  );
};

export default LoginPage;
