import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("./routes/pages/index.page.tsx"),
  layout("./routes/pages/auth/layout.tsx", [
    route("/login", "./routes/pages/auth/login/page.tsx"),
    route("/register", "./routes/pages/auth/register/page.tsx"),
  ]),
] satisfies RouteConfig;
