import { cva } from "~/styled-system/css";

export const logo = cva({
  base: {
    aspectRatio: "1 / 1",
    objectFit: "contain",
    width: "40px",
  },

  variants: {
    size: {
      large: {
        width: "128px",
      },
    },
  },
});

export const inputIcon = cva({
  base: {
    color: "inherit",
    aspectRatio: "1 / 1",
  },
});
