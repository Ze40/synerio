import { cva } from "~/styled-system/css";

export const button = cva({
  base: {
    textAlign: "center",
    cursor: "pointer",
    transitionDuration: "0.3s",
    _hover: {
      transitionDuration: "0.3s",
    },
  },
  variants: {
    variant: {
      primary: {
        color: "primary",
        backgroundColor: "secondary",
        borderRadius: "15px",
        fontWeight: "600",
        _hover: {
          outline: "secondaryBorder",
          backgroundColor: "primary",
          color: "secondary",
          scale: "1.01",
        },
      },
    },
    size: {
      big: {
        padding: "15px 30px",
        minWidth: "200px",
        fontSize: "xl",
      },
    },
  },
});
