import { cva } from "~/styled-system/css";

export const overlay = cva({
  base: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});

export const container = cva({
  base: {
    background: "primary",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    maxWidth: "90vw",
    position: "relative",
  },
});

export const header = cva({
  base: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    fontWeight: "500",
    fontSize: "lg",
  },
});

export const content = cva({});
