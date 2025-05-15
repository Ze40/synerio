import { cva } from "styled-system/css";

export const container = cva({
  base: {
    width: "1000px",
    height: "830px",
    background: "primary",
    shadow: "around",
    display: "flex",
    alignItems: "center",
    position: "relative",
    margin: "20px auto",
    padding: "40px 0",
  },
});
