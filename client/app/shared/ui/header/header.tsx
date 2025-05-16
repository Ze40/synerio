import { memo, useState } from "react";

import { DoorClosed, DoorOpen, User } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { css } from "~/styled-system/css";

import { authService } from "@/feat/auth/services";
import { logo } from "@/style/recipes/img";
import { big, title } from "@/style/recipes/text";

import Container from "../container/container";
import * as style from "./style";

interface HeaderProps {
  userPictue?: string;
  userName: string;
}

const Header = memo(({ userName, userPictue }: HeaderProps) => {
  const [isExitHover, setIsExitHover] = useState<boolean>(false);
  const navigation = useNavigate();

  const hanleClick = () => {
    authService.logout();
    navigation("/login");
  };

  return (
    <header className={style.header()}>
      <Container className={style.container()}>
        <Link to={"/feat"} className={style.logo()}>
          <img src="/shared/logo.png" alt="logo" className={logo()} />
          <h2 className={big()}>Synerio</h2>
        </Link>
        <div className={style.userBox()}>
          <Link to={"/profile"} className={style.user()}>
            {userPictue ? (
              <img
                src={userPictue}
                alt="user photo"
                className={style.userImg({ isEmpty: false })}
              />
            ) : (
              <div className={style.userImg({ isEmpty: true })}>
                <User />
              </div>
            )}
            <h6 className={title()}>{userName}</h6>
          </Link>
          <button
            type="button"
            className={style.exitBtn()}
            onMouseEnter={() => setIsExitHover(true)}
            onMouseLeave={() => setIsExitHover(false)}
            onClick={hanleClick}
          >
            {isExitHover ? (
              <DoorOpen size={30} className={css({ color: "secondary" })} />
            ) : (
              <DoorClosed size={30} />
            )}
          </button>
        </div>
      </Container>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
