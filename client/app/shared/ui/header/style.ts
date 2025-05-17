import { cva } from "~/styled-system/css";

export const header = cva({
  base: {
    background: "primary",
    gridRow: 1,
    gridColumn: "1 / 3",
    borderRadius: "10px",
    padding: "20px 0",
  },
});

export const container = cva({
  base: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export const userBox = cva({
  base: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
});

export const user = cva({
  base: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transitionDuration: "0.3s",

    _hover: {
      transitionDuration: "0.3s",
      scale: "1.03",
    },
  },
});

export const userImg = cva({
  base: {
    borderRadius: "full",
    aspectRatio: "1 / 1",
    width: "50px",
  },
  variants: {
    isEmpty: {
      true: {
        bg: "secondary",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "primary",
      },
      false: {},
    },
  },
});

export const exitBtn = cva({
  base: {
    cursor: "pointer",
    transitionDuration: "0.3s",
    _hover: {
      transitionDuration: "0.3s",
      scale: "1.1",
    },
  },
});

export const logo = cva({
  base: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transitionDuration: "0.3s",

    _hover: {
      transitionDuration: "0.3s",
      scale: "1.03",
    },
  },
});
