import { cva } from "~/styled-system/css";

export const msg = cva({
  base: {
    fontSize: "md",
  },
});

export const container = cva({
  base: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
