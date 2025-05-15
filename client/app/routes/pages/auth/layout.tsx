import { useEffect, useState } from "react";

import { Outlet, useLocation } from "react-router";

import { AuthSpace } from "@/shared/ui";

import * as style from "./style";

export function meta() {
  return [
    { title: "Synerio | Welcome" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const AuthLayout = () => {
  const { pathname } = useLocation();
  const [form, setForm] = useState<"login" | "register" | null>(null);

  useEffect(() => {
    if (pathname === "/login") setForm("login");
    else if (pathname === "/register") setForm("register");
  }, [pathname]);

  return (
    <>
      {form !== null && (
        <div className={style.container()}>
          {form === "login" ? (
            <>
              <Outlet />
              <AuthSpace />
            </>
          ) : (
            <>
              <AuthSpace />
              <Outlet />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLayout;
