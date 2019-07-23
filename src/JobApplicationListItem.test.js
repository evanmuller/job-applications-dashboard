import React from "react";
import { colorKeyForLetter } from "./JobApplicationListItem";
import { initialsForName } from "./JobApplicationListItem";

it("to return a color for a letter", () => {
  const colors = ["red", "blue", "gren", "cyan", "magenta", "yellow", "black"];
  expect(colorKeyForLetter(colors, "A")).toBe("red");
  expect(colorKeyForLetter(colors, "I")).toBe("blue");
  expect(colorKeyForLetter(colors, "Z")).toBe("magenta");
});

it("to return initials", () => {
  expect(initialsForName("Evan Kurt McLaughlin Muller")).toBe("EKMM");
  expect(initialsForName("Evan Kurt Muller")).toBe("EKM");
  expect(initialsForName("Evan Muller")).toBe("EM");
  expect(initialsForName("Evan")).toBe("E");
});
