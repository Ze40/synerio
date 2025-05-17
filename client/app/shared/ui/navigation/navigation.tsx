import { memo } from "react";

import { NavLink } from "react-router";
import { css } from "~/styled-system/css";

import Container from "../container/container";
import { navList } from "./modal/navList";
import * as style from "./style";

const Navigation = memo(() => {
  return (
    <nav className={style.nav()}>
      <Container>
        <ul className={style.navList()}>
          {navList.map((page) => (
            <li key={page.id} className={css({ width: "100%" })}>
              <NavLink to={page.href} className={({ isActive }) => style.pageLink({ isActive })}>
                <page.icon className={style.pageIcon()} size={25} />
                {page.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
});

Navigation.displayName = "Navigation";

export default Navigation;
