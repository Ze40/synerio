import { cva } from "~/styled-system/css";

export const input = cva({
  base: {
    width: "100%",
    color: "gray",
  },
  variants: {
    size: {
      compact: {
        width: "200px",
      },
    },
  },
});

export const inputContainer = cva({
  base: {
    gridColumn: "1 / 3",
    width: "100%",
  },
  variants: {
    pos: {
      twoOnLine: {
        gridColumn: "auto",
      },
    },
  },
});

export const form = cva({
  base: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    padding: "0 20px",
  },
});

export const lines = cva({
  base: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    gridColumn: "1 / 3",
    justifyContent: "center",
  },
});
