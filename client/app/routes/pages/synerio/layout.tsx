import { Outlet, useLoaderData } from "react-router";
import { redirect } from "react-router";

import type { IUser } from "@/entities/user/types";
import { userService } from "@/feat/user/services";
import { Container, Header, Navigation } from "@/shared/ui";

import * as style from "./style";

export const clientLoader = async () => {
  try {
    const user = await userService.getProfile();

    if (!user) {
      return redirect("/login");
    }

    return user;
  } catch (error) {
    console.error("Ошибка профиля:", error);
    return redirect("/login");
  }
};

export function meta() {
  return [
    { title: "Synerio" },
    { name: "description", content: "Welcome to scial media service - Synerio" },
  ];
}

const SynerioLayout = () => {
  const user = useLoaderData<IUser>();
  return (
    <div>
      <Header userName={user.displayName} userPictue={user.picture} />
      <Container className={style.container()}>
        <Navigation />
        <Outlet />
      </Container>
    </div>
  );
};

export default SynerioLayout;
