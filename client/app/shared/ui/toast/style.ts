import { cva } from "~/styled-system/css";

export const overlay = cva({
  base: {
    position: "fixed",
    right: "20px",
    bottom: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10000,
  },
});

export const container = cva({
  base: {
    background: "primary",
    shadow: "around",
    borderRadius: "8px",
    width: "400px",
    maxHeight: "200px",
    position: "relative",
  },
});

export const header = cva({
  base: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    borderBottom: "grayBorder",
    fontWeight: "600",
    color: "secondary",
    fontSize: "lg",
  },
});

export const msg = cva({
  base: {
    display: "inline-block",
    padding: "10px 20px",
    fontWeight: "400",
    fontSize: "md",
    maxWidth: "100%",
    overflowY: "auto",
    scrollbar: "hidden",
  },
});

export const close = cva({
  base: {
    transitionDuration: "0.3s",

    _hover: {
      scale: "1.1",
      transitionDuration: "0.3s",
    },
  },
});
