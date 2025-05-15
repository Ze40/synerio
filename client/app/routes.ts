import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("./routes/pages/index.page.tsx"),
  layout("./routes/pages/auth/layout.tsx", [
    route("/login", "./routes/pages/auth/login/page.tsx"),
    route("/register", "./routes/pages/auth/register/page.tsx"),
  ]),
  layout("./routes/pages/synerio/layout.tsx", [
    route("/feat", "./routes/pages/synerio/feat/page.tsx"),
  ]),
] satisfies RouteConfig;
