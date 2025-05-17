import { cva } from "~/styled-system/css";

export const addBtn = cva({
  base: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
    color: "primary",
    borderRadius: "10px",
    width: "100%",
    textAlign: "center",
    fontSize: "xl",
    fontWeight: "600",
    bg: "lighter",
    transitionDuration: "0.3s",
    padding: "20px",
    cursor: "pointer",
    _hover: {
      transitionDuration: "0.3s",
      bg: "secondary",
    },
  },
});
