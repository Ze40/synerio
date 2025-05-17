import { cva } from "~/styled-system/css";

export const layout = cva({
  base: {
    width: "100%",
    position: "relative",
    background: "lighter",
    height: "100dvh",
    padding: "20px",
    display: "grid",
    gridTemplateRows: "min-content auto",
    gridTemplateColumns: "min-content auto",
    gap: "15px",
  },
});
