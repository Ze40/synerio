import type { ReactElement } from "react";

import { css } from "~/styled-system/css";

interface ContainerProps {
  className?: string;
  children: ReactElement | ReactElement[];
}

const Container = ({ className, children }: ContainerProps) => {
  return (
    <div
      className={`${css({
        width: "100%",
        padding: "0 40px",
        position: "relative",
        margin: "0 auto",
      })} ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
