import { type ReactElement, memo } from "react";

import { Link } from "react-router";

import { logo } from "@/style/recipes/img";
import { grand, normal } from "@/style/recipes/text";

import Attention from "../attention/attention";
import * as style from "./style";

interface AuthWrapperProps {
  children: ReactElement;
  type: "login" | "register";
}

const AuthWrapper = memo(({ children, type }: AuthWrapperProps) => {
  return (
    <div className={style.wrapper()}>
      <div className={style.top()}>
        <img src="/shared/logo.png" alt="logo" className={logo({ size: "large" })} />
        <h6 className={grand()}>{type === "login" ? "Войти" : "Регистрация"}</h6>
        <p className={normal()}>
          Добро пожаловать в <Attention>SYNERIO</Attention>
        </p>
      </div>
      <div>{children}</div>
      <Link to={type === "login" ? "/register" : "/login"} className={style.link()}>
        {type === "login" ? (
          <>
            Нет аккаунта? <Attention>Зарегистрироваться</Attention>
          </>
        ) : (
          <>
            Уже еть аккаунт? <Attention>Войти</Attention>
          </>
        )}
      </Link>
    </div>
  );
});

AuthWrapper.displayName = "AuthWrapper";

export default AuthWrapper;
