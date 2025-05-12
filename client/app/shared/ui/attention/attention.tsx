import { type Styles, css } from "~/styled-system/css";

interface AttentionProps {
  className?: Styles | Styles[];
  children: string;
}

const Attention = ({ className, children }: AttentionProps) => {
  return (
    <strong
      className={css(
        {
          color: "secondary",
          fontWeight: "500",
          fontSize: "inherit",
          fontFamily: "inherit",
        },
        className
      )}
    >
      {children}
    </strong>
  );
};

export default Attention;
