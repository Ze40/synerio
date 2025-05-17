import { cva } from "~/styled-system/css";

export const page = cva({
  base: {
    height: "100%",
    width: "100%",
    background: "primary",
    gridColumn: 2,
    gridRow: 2,
    borderRadius: "10px",
    padding: "20px 0",
  },
});
