import { cva } from "~/styled-system/css";

export const nav = cva({
  base: {
    position: "relative",
    width: "350px",
    height: "100%",
    background: "primary",
    borderRadius: "10px",
    gridRow: "2",
    gridColumn: "1",
    padding: "20px 0",
  },
});

export const navList = cva({
  base: {
    display: "flex",
    flexDir: "column",
    gap: "10px",
    alignItems: "start",
    position: "relative",
    width: "100%",
  },
});

export const pageLink = cva({
  base: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    color: "dark",
    transitionDuration: "0.3s",
    gap: "15px",
    fontSize: "xl",
    padding: "10px 15px",
    borderRadius: "5px",

    _hover: {
      transitionDuration: "0.3s",
      background: "gray.200",
    },
  },

  variants: {
    isActive: {
      true: {
        color: "secondary",
        background: "gray.100",
      },
      false: {},
    },
  },
});

export const pageIcon = cva({
  base: {
    aspectRatio: "1 / 1",
  },
});
