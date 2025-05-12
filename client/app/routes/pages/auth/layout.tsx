import { useEffect, useState } from "react";

import { Outlet, useLocation } from "react-router";

import { AuthSpace } from "@/shared/ui";

import type { Route } from "./+types/layout";
import * as style from "./style";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Synerio | Welcome" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const AuthLayout = () => {
  const { pathname } = useLocation();
  const [form, setForm] = useState<"login" | "register">("login");

  useEffect(() => {
    if (pathname === "/login") setForm("login");
    else if (pathname === "/register") setForm("register");
  }, [pathname]);

  return (
    <div className={style.container({ form })}>
      <Outlet />
      <AuthSpace />
    </div>
  );
};

export default AuthLayout;
