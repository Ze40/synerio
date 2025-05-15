import { Outlet } from "react-router";
import { redirect } from "react-router";

import type { Route } from "./+types/layout";

export const loader = async ({ request }: Route.ClientLoaderArgs) => {
  const headers = request.headers;
  const cookieHeader = headers.get("Cookie");

  if (!cookieHeader) {
    return redirect("/login");
  }

  // Parse cookies
  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((cookie) => {
      const [key, value] = cookie.split("=");
      return [key, decodeURIComponent(value)];
    })
  );

  return { cookies };
};

export function meta() {
  return [{ title: "Synerio" }, { name: "description", content: "Welcome to React Router!" }];
}

const SynerioLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default SynerioLayout;
