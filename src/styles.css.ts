import { style, keyframes, globalKeyframes } from "@vanilla-extract/css";
import { lighten, animation } from "polished";

const rotate = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const className = style({
  display: "flex",
  color: lighten(0.2, "#0b18dc"),
  backgroundColor: "gainsboro",
  ...animation([rotate, "1s", "ease-in-out"], ["colorchange", "2s"]),
});

export const className2 = style({
  display: "flex",
  backgroundColor: "antiquewhite",
});
