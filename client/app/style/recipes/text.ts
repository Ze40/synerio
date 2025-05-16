import { cva } from "~/styled-system/css";

export const grand = cva({
  base: {
    fontSize: "5xl",
    fontWeight: "600",
    lineHeight: "1",
  },
});

export const big = cva({
  base: {
    fontSize: "3xl",
    fontWeight: "600",
    lineHeight: "1",
  },
});

export const normal = cva({
  base: {
    fontSize: "md",
    fontWeight: 400,
  },
});

export const title = cva({
  base: {
    fontSize: "xl",
    fontWeight: "500",
  },
});
